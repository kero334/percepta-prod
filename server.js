require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Robust fetch polyfill: Use native fetch (Node 18+) or dynamic import for node-fetch (v3 ESM)
const fetch = global.fetch || ((...args) => import('node-fetch').then(({ default: f }) => f(...args)));

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const CONFIG = {
    provider: 'gemini',
    geminiKeyPrimary: process.env.GEMINI_API_KEY_1,
    geminiKeySecondary: process.env.GEMINI_API_KEY_2,
    geminiModel: process.env.GEMINI_REPORT_MODEL || 'gemini-1.5-pro',
    maxTokens: Number(process.env.MAX_TOKENS || 4000),
    maxRetries: 3,
    requestTimeoutMs: 90000,
    maxPayloadSize: '20mb',
    fallbackOnFailure: String(process.env.FALLBACK_ON_FAILURE || '').toLowerCase() === 'true',
};

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json({ limit: CONFIG.maxPayloadSize }));
app.use(express.static(path.join(__dirname, 'public')));

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { error: 'Too many requests. Please wait a moment.' },
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/', apiLimiter);

app.use((req, res, next) => {
    if (req.path.startsWith('/api/') && req.method !== 'GET') {
        console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.path}`);
    }
    next();
});

// ---------------------------------------------------------------------------
// Health Check
// ---------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
    const keysConfigured = (process.env.GEMINI_API_KEY_1 ? 1 : 0) + (process.env.GEMINI_API_KEY_2 ? 1 : 0);
    res.json({
        status: 'ok',
        provider: 'Gemini',
        model: CONFIG.geminiModel,
        keysConfigured,
        port: Number(PORT)
    });
});

// ---------------------------------------------------------------------------
// Analysis Endpoint (Gemini reasoning only)
// ---------------------------------------------------------------------------
app.post('/api/analyze', async (req, res) => {
    const startTime = Date.now();

    try {
        const { detection, analysisMode } = req.body;

        if (!detection || !detection.persons || !detection.machines || !detection.tools || !detection.hazards) {
            return res.status(400).json({ error: 'Missing structured detection data.' });
        }
        if (!CONFIG.geminiKeyPrimary && !CONFIG.geminiKeySecondary) {
            return res.status(500).json({ error: 'Gemini API keys not configured.' });
        }

        console.log(`[Analyze] detections: persons=${(detection.persons || []).length}, machines=${(detection.machines || []).length}`);

        const prompt = buildGeminiReportPrompt(detection, analysisMode);

        const resultText = await callGeminiJSON({
            model: CONFIG.geminiModel,
            prompt,
            primaryKey: CONFIG.geminiKeyPrimary,
            secondaryKey: CONFIG.geminiKeySecondary
        });

        const analysis = parseJsonStrict(resultText);
        const validated = validateAnalysis({
            ...analysis,
            workers_count: Array.isArray(detection.persons) ? detection.persons.length : (analysis.workers_count || 0),
            machinery_count: Array.isArray(detection.machines) ? detection.machines.length : (analysis.machinery_count || 0)
        });

        const elapsed = Date.now() - startTime;
        console.log(`[Analyze] ✓ ${elapsed}ms`);

        res.json({ success: true, analysis: validated });

    } catch (error) {
        const elapsed = Date.now() - startTime;
        console.error(`[FAILED] After ${elapsed}ms: ${error.message}`);
        if (CONFIG.fallbackOnFailure && req.body && req.body.detection) {
            const ctx = {
                humans: Array.isArray(req.body.detection.persons) ? req.body.detection.persons.length : 0,
                machines: Array.isArray(req.body.detection.machines) ? req.body.detection.machines.length : 0,
                proximityHazards: []
            };
            const fallback = buildFallbackAnalysis(ctx);
            return res.json({ success: true, analysis: fallback, fallback: true });
        }
        res.status(error.statusCode || 500).json({
            error: error.userMessage || 'Analysis failed. Please try again.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// ---------------------------------------------------------------------------
// Gemini API Caller (JSON response, dual-key fallback)
// ---------------------------------------------------------------------------
async function callGeminiJSON({ model, prompt, primaryKey, secondaryKey }) {
    let lastError = null;
    const keys = [primaryKey, secondaryKey].filter(Boolean);
    for (let attempt = 0; attempt < Math.max(1, CONFIG.maxRetries); attempt++) {
        const key = keys[attempt % keys.length];
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), CONFIG.requestTimeoutMs);
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
            const body = {
                contents: [{ role: 'user', parts: [{ text: prompt }]}],
                generationConfig: { temperature: 0.2, topP: 0.8, maxOutputTokens: CONFIG.maxTokens, responseMimeType: 'application/json' }
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify(body)
            });
            clearTimeout(timeout);
            if (!response.ok) {
                const text = await response.text();
                if (response.status === 429) {
                    if (keys.length > 1 && attempt < CONFIG.maxRetries - 1) continue;
                    const err = new Error('Rate limit exceeded');
                    err.statusCode = 429;
                    err.userMessage = 'AI provider quota exceeded. Try again later.';
                    throw err;
                }
                if (response.status === 400) {
                    const err = new Error('Bad request');
                    err.statusCode = 400;
                    err.userMessage = 'Invalid request to AI provider.';
                    throw err;
                }
                if (response.status === 401 || response.status === 403) {
                    const err = new Error('Unauthorized');
                    err.statusCode = response.status;
                    err.userMessage = 'Invalid or unauthorized API key.';
                    throw err;
                }
                if (response.status >= 500 && attempt < CONFIG.maxRetries - 1) {
                    lastError = new Error(`Provider error ${response.status}: ${text.substring(0, 200)}`);
                    await new Promise(r => setTimeout(r, 800));
                    continue;
                }
                const err = new Error(`Provider error ${response.status}`);
                err.statusCode = response.status;
                err.userMessage = 'AI provider error.';
                throw err;
            }
            const data = await response.json();
            const candidates = data.candidates || [];
            const parts = candidates[0] && candidates[0].content && candidates[0].content.parts;
            const text = parts && parts[0] && (parts[0].text || parts[0].inline_data || parts[0].function_call);
            if (!text || typeof text !== 'string') {
                const err = new Error('Invalid response format');
                err.statusCode = 502;
                err.userMessage = 'Invalid response from AI provider.';
                throw err;
            }
            return text;
        } catch (error) {
            lastError = error;
            if (error.name === 'AbortError') {
                const err = new Error('Timeout');
                err.statusCode = 504;
                err.userMessage = 'AI call timed out.';
                throw err;
            }
        }
    }
    const err = new Error(lastError && lastError.message ? lastError.message : 'Failed after multiple attempts');
    err.statusCode = lastError && lastError.statusCode ? lastError.statusCode : 500;
    err.userMessage = lastError && lastError.userMessage ? lastError.userMessage : 'AI analysis failed. Please try again.';
    throw err;
}

// ---------------------------------------------------------------------------
// Fallback Analysis
// ---------------------------------------------------------------------------
function buildFallbackAnalysis(context) {
    const humans = context.humans || 0;
    const machines = context.machines || 0;
    const violations = (context.proximityHazards || [])
        .filter(h => h.isDanger)
        .map(h => ({
            type: 'Proximity Hazard',
            severity: 'HIGH',
            description: `Worker near ${h.machineClass} within ${h.threshold}m`,
            description_ar: `عامل قريب من ${h.machineClass} على مسافة أقل من ${h.threshold} متر`,
            recommendation: 'Increase distance and add physical barriers.',
            recommendation_ar: 'زيادة المسافة ووضع حواجز آمنة.',
            regulation: 'ISO 45001'
        }));
    const riskScore = Math.min(100, Math.round(20 + violations.length * 15));
    const intro = `هذا تقرير احتياطي مبني على بيانات الرؤية الأساسية فقط دون استدعاء مزود الذكاء. تم رصد ${humans} عمال و${machines} آلات/معدات.`;
    const elements = `العناصر المكتشفة: عدد العمال: ${humans}. عدد الآلات/المعدات: ${machines}. لا توجد مخالفات حرجة تم رصدها تلقائياً في وضع الاحتياط إن لم تتوفر بيانات المسافات.`;
    const riskDetail = violations.length > 0
        ? `المخاطر: تم رصد ${violations.length} خطر قرب مباشر بين العمال والمعدات.`
        : `المخاطر: لم تُرصد مخاطر قرب حرجة في هذا الوضع الاحتياطي.`;
    const behavior = `تقييم سلوك العاملين: لا يتوفر تحليل سلوكي تفصيلي في وضع الاحتياط. يوصى بمراجعة الالتزام بمعدات الوقاية الشخصية وتنظيم الحركة.`;
    const recommendations = `التوصيات: 
- تنظيم مسارات الحركة ووضع حواجز عند الحاجة 
- التأكد من ارتداء معدات الوقاية الشخصية 
- تحسين ترتيب منطقة العمل وتقليل الازدحام`;
    const finalAssess = `التقييم النهائي: هذا تقييم أولي احتياطي. للحصول على تقرير تفصيلي كامل، يُرجى إعادة المحاولة عند توفر مزود الذكاء.`;
    const detailed_ar = [
        '١) مقدمة عامة', intro,
        '٢) العناصر المكتشفة', elements,
        '٣) تحليل المخاطر التفصيلي', riskDetail,
        '٤) تقييم سلوك العاملين', behavior,
        '٥) التوصيات والإجراءات التصحيحية', recommendations,
        '٦) التقييم النهائي', finalAssess
    ].join('\n\n');
    return {
        risk_score: riskScore,
        risk_level: riskScore >= 80 ? 'CRITICAL' : riskScore >= 60 ? 'HIGH' : riskScore >= 40 ? 'MEDIUM' : 'LOW',
        executive_summary: `Vision-only fallback used. ${humans} workers, ${machines} machines detected.`,
        executive_summary_ar: `تم استخدام وضع احتياطي يعتمد على الرؤية فقط. تم رصد ${humans} عمال و${machines} آلات.`,
        ppe_compliance_rate: 50,
        scene_description_ar: `تحليل مبدئي اعتمادًا على نموذج الرؤية. قد تكون النتائج محدودة بدون استدلال متقدم.`,
        workers_count: humans,
        machinery_count: machines,
        gemini_detections: [],
        violations,
        positive_observations_ar: [],
        immediate_actions_ar: ['إبعاد العمال عن المخاطر المباشرة', 'التأكد من ارتداء معدات الوقاية الشخصية'],
        worker_analysis: [],
        environmental_hazards_ar: [],
        safety_recommendations_ar: [
            { priority: 'متوسطة', title_ar: 'تحسين تنظيم منطقة العمل', details_ar: 'تقليل الازدحام وإعادة ترتيب المعدات.' }
        ],
        overall_assessment_ar: 'التقييم تم بشكل أولي دون استخدام الاستدلال المتقدم.',
        detailed_report_ar: detailed_ar
    };
}
function buildGeminiReportPrompt(detection, analysisMode) {
    const payload = JSON.stringify(detection);
    return [
        'أنت نظام تحليل سلامة صناعي احترافي (OSHA + ISO 45001).',
        'اعتمد حصراً على بيانات JSON التالية للكشف. لا تقم باختراع كيانات إضافية.',
        payload,
        'أنتج تقريراً احترافياً باللغة العربية بالفقرات التالية:',
        '1) مقدمة عامة',
        '2) العناصر المكتشفة',
        '3) تحليل المخاطر التفصيلي',
        '4) تقييم سلوك العاملين',
        '5) التوصيات والإجراءات التصحيحية',
        '6) التقييم النهائي',
        'أخرج "فقط" كائن JSON بالحقول التالية:',
        '{',
        '  "risk_score": <0-100>,',
        '  "risk_level": "<LOW|MEDIUM|HIGH|CRITICAL>",',
        '  "executive_summary_ar": "<Arabic>",',
        '  "ppe_compliance_rate": <0-100>,',
        '  "scene_description_ar": "<Arabic>",',
        '  "workers_count": <int>,',
        '  "machinery_count": <int>,',
        '  "violations": [{"type":"<Category>","severity":"<LOW|MEDIUM|HIGH|CRITICAL>","description":"<English>","description_ar":"<Arabic>","recommendation":"<English>","recommendation_ar":"<Arabic>","regulation":"<Standard>"}],',
        '  "positive_observations_ar": ["<Arabic>"],',
        '  "immediate_actions_ar": ["<Arabic>"],',
        '  "worker_analysis": [{"id":"Worker 1","id_ar":"عامل ١","location_ar":"<Arabic>","activity_ar":"<Arabic>","ppe_items_ar":["<Arabic>"],"missing_ppe_ar":["<Arabic>"],"risk_factors_ar":["<Arabic>"],"safety_status_ar":"<آمن|معرض للخطر|في خطر>"}],',
        '  "environmental_hazards_ar": ["<Arabic>"],',
        '  "safety_recommendations_ar": [{"priority":"<عالية|متوسطة|منخفضة>","title_ar":"<Arabic>","details_ar":"<Arabic>"}],',
        '  "overall_assessment_ar": "<Arabic>",',
        '  "detailed_report_ar": "<Arabic full report with the six sections>"',
        '}',
        'قواعد: استخدم لغة عربية فصحى رسمية، واعتمد فقط على JSON المدخل.'
    ].join('\n');
}

// ---------------------------------------------------------------------------
// Response Parser
// ---------------------------------------------------------------------------
function parseJsonStrict(text) {
    let jsonStr = String(text || '').trim();
    jsonStr = jsonStr.replace(/^```json\s*/i, '').replace(/\s*```$/i, '');
    return JSON.parse(jsonStr);
}

function validateAnalysis(a) {
    // Basic validation / default values
    return {
        ...a,
        risk_score: a.risk_score || 0,
        risk_level: a.risk_level || 'LOW',
        violations: Array.isArray(a.violations) ? a.violations : [],
        worker_analysis: Array.isArray(a.worker_analysis) ? a.worker_analysis : [],
        // Ensure other array fields exist
        gemini_detections: a.gemini_detections || [],
        positive_observations_ar: a.positive_observations_ar || [],
        immediate_actions_ar: a.immediate_actions_ar || [],
        environmental_hazards_ar: a.environmental_hazards_ar || [],
        safety_recommendations_ar: a.safety_recommendations_ar || []
    };
}

// ---------------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------------
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => {
    console.log('╔══════════════════════════════════════════════════╗');
    console.log('║           PERCEPTA AI — Gemini Edition          ║');
    console.log('╚══════════════════════════════════════════════════╝');
    console.log(`  Server:     http://localhost:${PORT}`);
    console.log(`  Model:      ${CONFIG.geminiModel}`);
    console.log(`  Keys:       ${(CONFIG.geminiKeyPrimary ? 1 : 0) + (CONFIG.geminiKeySecondary ? 1 : 0)} configured`);
});
