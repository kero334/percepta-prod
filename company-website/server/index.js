import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { nanoid } from 'nanoid';
import fs from 'fs';
import path from 'path';
import net from 'net';
import Database from 'better-sqlite3';
import argon2 from 'argon2';
import { createSecretKey, randomBytes, createHash } from 'crypto';
import { SignJWT, jwtVerify } from 'jose';
import { z } from 'zod';

const app = new Hono();
app.use('*', logger());
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
app.use('*', cors({ origin: ALLOWED_ORIGIN, allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], allowHeaders: ['Content-Type', 'Authorization'] }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;
function getAdminPassword() {
  const envPwd = process.env.ADMIN_PASSWORD;
  if (envPwd && envPwd.trim().length > 0) return envPwd.trim();
  if (process.env.NODE_ENV !== 'production') {
    const secretPath = path.join(process.cwd(), 'server', '.admin_password');
    try {
      const content = fs.readFileSync(secretPath, 'utf-8').trim();
      if (content) return content;
    } catch {}
  }
  return '';
}
const ADMIN_PASSWORD = getAdminPassword();
if (!ADMIN_PASSWORD) {
  console.warn('Admin password is not configured. Set ADMIN_PASSWORD or server/.admin_password.');
} else {
  console.log('Admin password configured: yes');
}
const ADMIN_PASSWORD_HASH_ENV = process.env.ADMIN_PASSWORD_HASH || '';
let ADMIN_PASSWORD_HASH = ADMIN_PASSWORD_HASH_ENV;
let HASH_READY = !!ADMIN_PASSWORD_HASH_ENV;
const JWT_SECRET = process.env.JWT_SECRET ? createSecretKey(Buffer.from(process.env.JWT_SECRET)) : createSecretKey(randomBytes(32));
const TOKEN_TTL_MS = 1000 * 60 * 60; // 1 hour

const dataDir = path.join(process.cwd(), 'server', 'data');
const dbFile = path.join(dataDir, 'app.db');
const logsDir = path.join(process.cwd(), 'server', 'logs');
const adminLogFile = path.join(logsDir, 'admin.log');

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
}

function logAdminAction(action, details) {
  try {
    const line = `${new Date().toISOString()} ${action} ${JSON.stringify(details)}\n`;
    fs.appendFileSync(adminLogFile, line);
  } catch {}
}

ensureDataFile();
const db = new Database(dbFile);
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT DEFAULT '',
  description TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  linkedin_url TEXT DEFAULT '',
  website_url TEXT DEFAULT '',
  expertise TEXT DEFAULT '[]',
  note TEXT DEFAULT '',
  created_at TEXT NOT NULL
);
`);

async function readTeam() {
  const rows = db.prepare('SELECT * FROM team_members ORDER BY datetime(created_at) DESC').all();
  return rows.map((r) => ({ ...r, expertise: JSON.parse(r.expertise || '[]') }));
}

function insertMember(member) {
  db.prepare(`
    INSERT INTO team_members (id, name, title, description, image_url, linkedin_url, website_url, expertise, note, created_at)
    VALUES (@id, @name, @title, @description, @image_url, @linkedin_url, @website_url, @expertise, @note, @created_at)
  `).run({
    ...member,
    expertise: JSON.stringify(member.expertise || []),
  });
}

function updateMember(id, patch) {
  const current = db.prepare('SELECT * FROM team_members WHERE id = ?').get(id);
  if (!current) return null;
  const next = {
    ...current,
    ...patch,
    id,
    created_at: current.created_at,
  };
  db.prepare(`
    UPDATE team_members
    SET name=@name, title=@title, description=@description, image_url=@image_url, linkedin_url=@linkedin_url,
        website_url=@website_url, expertise=@expertise, note=@note
    WHERE id=@id
  `).run({
    ...next,
    expertise: JSON.stringify(Array.isArray(next.expertise) ? next.expertise : JSON.parse(next.expertise || '[]')),
  });
  return { ...next, expertise: JSON.parse(db.prepare('SELECT expertise FROM team_members WHERE id=?').get(id).expertise || '[]') };
}

function deleteMember(id) {
  const info = db.prepare('DELETE FROM team_members WHERE id = ?').run(id);
  return info.changes > 0;
}

async function seedTeamIfEmpty() {
  const list = await readTeam();
  if (list.length > 0) return;
  const seed = {
    id: nanoid(12),
    name: "Kerollos Karam",
    title: "Founder & CEO",
    description:
      "Founder of Percepta, focused on building practical AI systems that prevent real-world harm. I work across product, business, and technical direction, with a strong interest in safety, applied AI, and system design. I value clarity, ethics, and learning by building.",
    image_url:
      "https://lh3.googleusercontent.com/pw/AP1GczN0Ous8RZGiuVkzBA9GEYsira6Jy6xlwlC_JtIXfDOrnmBcOuSnik4zC_zIftHGTLCof98qUJhvy5xMs1QBIzh69n6Go2Uea3A5YG_nf3GIu_nh11N29BJe3B7dHSrlzRrmCG0ef8MS6tE6f-ynUWOI=w712-h814-s-no-gm?authuser=0",
    linkedin_url: "https://www.linkedin.com/in/kerollos-karam",
    website_url: "https://keroinfo.vly.site/",
    expertise: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Python Programming",
      "Business & Startup Fundamentals",
      "Data Analysis",
    ],
    note: "",
    created_at: new Date().toISOString(),
  };
  insertMember(seed);
}
async function requireAuth(c) {
  const auth = c.req.header('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return c.json({ error: 'Unauthorized' }, 401);
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload || !payload.sub) return c.json({ error: 'Unauthorized' }, 401);
    return null;
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
}

const RATE_LIMIT = { windowMs: 60_000, max: 60 };
const buckets = new Map();
function rateLimit(c) {
  const ip = c.req.header('x-forwarded-for') || 'local';
  const now = Date.now();
  const b = buckets.get(ip) || { count: 0, reset: now + RATE_LIMIT.windowMs };
  if (now > b.reset) {
    b.count = 0;
    b.reset = now + RATE_LIMIT.windowMs;
  }
  b.count++;
  buckets.set(ip, b);
  if (b.count > RATE_LIMIT.max) {
    return c.json({ error: 'Too many requests' }, 429);
  }
  return null;
}

// Public team listing endpoint
app.get('/api/team', async (c) => {
  const list = await readTeam();
  const body = JSON.stringify(list);
  const etag = createHash('sha1').update(body).digest('hex');
  const inm = c.req.header('if-none-match');
  if (inm && inm === etag) {
    return new Response(null, { status: 304 });
  }
  return new Response(body, {
    headers: {
      'content-type': 'application/json',
      'etag': etag,
      'cache-control': 'public, max-age=60',
    },
  });
});

function isPrivateHost(host) {
  if (!host) return true;
  const lower = host.toLowerCase();
  if (lower === 'localhost' || lower === '::1') return true;
  if (net.isIP(lower)) {
    if (lower.startsWith('127.') || lower.startsWith('10.') || lower.startsWith('192.168.')) return true;
    const m = lower.match(/^172\.(\d{1,3})\./);
    if (m) {
      const oct = Number(m[1]);
      if (oct >= 16 && oct <= 31) return true;
    }
  }
  return false;
}

app.get('/api/image-proxy', async (c) => {
  const url = c.req.query('url');
  if (!url) return c.json({ error: 'Missing url' }, 400);
  let target;
  try {
    target = new URL(url);
  } catch {
    return c.json({ error: 'Invalid URL' }, 400);
  }
  if (!['http:', 'https:'].includes(target.protocol)) {
    return c.json({ error: 'Unsupported protocol' }, 400);
  }
  if (isPrivateHost(target.hostname)) {
    return c.json({ error: 'Blocked host' }, 400);
  }
  try {
    const resp = await fetch(target.toString(), { redirect: 'follow' });
    if (!resp.ok) {
      return c.json({ error: `Upstream ${resp.status} ${resp.statusText}` }, 502);
    }
    const ct = resp.headers.get('content-type') || 'image/jpeg';
    const buf = await resp.arrayBuffer();
    return new Response(buf, {
      headers: {
        'content-type': ct.startsWith('image/') ? ct : 'image/jpeg',
        'cache-control': 'public, max-age=604800',
      },
    });
  } catch (e) {
    return c.json({ error: 'Fetch failed' }, 502);
  }
});

app.post('/api/admin/login', async (c) => {
  const rl = rateLimit(c); if (rl) return rl;
  const body = await c.req.json().catch(() => ({}));
  const { password } = body;
  if (!ADMIN_PASSWORD) {
    return c.json({ error: 'Server not configured: ADMIN_PASSWORD missing' }, 500);
  }
  try {
    if (!HASH_READY) {
      ADMIN_PASSWORD_HASH = await argon2.hash(ADMIN_PASSWORD, { type: argon2.argon2id });
      HASH_READY = true;
    }
    const ok = await argon2.verify(ADMIN_PASSWORD_HASH, password || '');
    if (!ok) {
      logAdminAction('login_failed', { reason: 'invalid_credentials' });
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('admin')
      .setIssuedAt()
      .setExpirationTime(`${Math.floor(TOKEN_TTL_MS / 1000)}s`)
      .sign(JWT_SECRET);
    logAdminAction('login_success', {});
    return c.json({ token, expires_in: TOKEN_TTL_MS / 1000 });
  } catch (e) {
    return c.json({ error: 'Auth error' }, 500);
  }
});

app.get('/api/admin/team', async (c) => {
  const rl = rateLimit(c); if (rl) return rl;
  const unauth = await requireAuth(c);
  if (unauth) return unauth;
  const list = await readTeam();
  return c.json(list);
});

const MemberSchema = z.object({
  name: z.string().min(1),
  title: z.string().optional(),
  description: z.string().min(1),
  image_url: z.string().url().optional().or(z.string().length(0)),
  linkedin_url: z.string().url().optional().or(z.string().length(0)),
  website_url: z.string().url().optional().or(z.string().length(0)),
  expertise: z.array(z.string()).optional(),
  note: z.string().optional(),
});

app.post('/api/admin/team', async (c) => {
  const rl = rateLimit(c); if (rl) return rl;
  const unauth = await requireAuth(c);
  if (unauth) return unauth;
  const body = await c.req.json().catch(() => ({}));
  const parsed = MemberSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid payload', details: parsed.error.flatten() }, 400);
  }
  const { name, title, description, image_url, linkedin_url, website_url, expertise, note } = parsed.data;
  const member = {
    id: nanoid(12),
    name,
    title: title || "",
    description,
    image_url: image_url || '',
    linkedin_url: linkedin_url || '',
    website_url: website_url || '',
    expertise: Array.isArray(expertise) ? expertise : [],
    note: note || '',
    created_at: new Date().toISOString(),
  };
  insertMember(member);
  logAdminAction('member_add', { id: member.id, name: member.name });
  return c.json(member, 201);
});

app.put('/api/admin/team/:id', async (c) => {
  const rl = rateLimit(c); if (rl) return rl;
  const unauth = await requireAuth(c);
  if (unauth) return unauth;
  const id = c.req.param('id');
  const body = await c.req.json().catch(() => ({}));
  const updated = updateMember(id, body);
  if (!updated) return c.json({ error: 'Not found' }, 404);
  logAdminAction('member_update', { id });
  return c.json(updated);
});

app.delete('/api/admin/team/:id', async (c) => {
  const rl = rateLimit(c); if (rl) return rl;
  const unauth = await requireAuth(c);
  if (unauth) return unauth;
  const id = c.req.param('id');
  const ok = deleteMember(id);
  if (!ok) return c.json({ error: 'Not found' }, 404);
  logAdminAction('member_delete', { id });
  return c.json({ ok: true });
});

app.get('/api/health', async () => {
  try {
    db.prepare('SELECT 1').get();
    return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
});

app.post('/api/analytics', async (c) => {
  const rl = rateLimit(c); if (rl) return rl;
  const body = await c.req.json().catch(() => ({}));
  logAdminAction('analytics_event', body || {});
  return c.json({ ok: true });
});

seedTeamIfEmpty().then(() => {
  serve({ fetch: app.fetch, port: PORT }, (info) => {
    console.log(`Admin API running at http://localhost:${info.port}`);
  });
});
