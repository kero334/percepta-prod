const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders });
        }
        if (url.pathname === '/api/health' && request.method === 'GET') {
            return json({ status: 'ok' }, 200);
        }
        if (url.pathname === '/api/detect' && request.method === 'POST') {
            return detect(request, env);
        }
        return json({ error: 'Not found' }, 404);
    }
};

async function detect(request, env) {
    let payload;
    try {
        payload = await request.json();
    } catch {
        return json({ success: false, error: 'Invalid JSON body' }, 400);
    }

    const rawImageBase64 = payload && payload.imageBase64;
    if (typeof rawImageBase64 !== 'string') {
        return json({ success: false, error: 'Missing imageBase64' }, 400);
    }

    let imageBase64 = rawImageBase64;
    if (imageBase64.startsWith('data:image')) {
        const commaIndex = imageBase64.indexOf(',');
        imageBase64 = commaIndex === -1 ? '' : imageBase64.slice(commaIndex + 1);
    }

    imageBase64 = imageBase64.trim();
    if (!imageBase64) {
        return json({ success: false, error: 'Missing imageBase64' }, 400);
    }

    const dims = getJpegDimensionsFromBase64(imageBase64);
    const start = Date.now();

    try {
        const predictions = await detectWithRoboflow(imageBase64, env);
        const detections = normalizeRoboflowDetections(predictions, dims);
        const elapsed = Date.now() - start;
        console.info(`[Vision] detections=${detections.length} ms=${elapsed}`);
        return json({ success: true, detections }, 200);
    } catch (err) {
        console.error('Roboflow detection failed:', err);
        return json({ success: false, error: 'Vision detection unavailable' }, 502);
    }
}

async function detectWithRoboflow(imageBase64, env) {
    const apiKey = env.ROBOFLOW_API_KEY;
    if (!apiKey) {
        throw new Error('Roboflow API key not configured');
    }

    const url = `https://serverless.roboflow.com/coco/15?api_key=${encodeURIComponent(apiKey)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: imageBase64,
            signal: controller.signal
        });

        if (!response.ok) {
            const text = await safeText(response);
            throw new Error(`Roboflow error ${response.status}: ${text}`);
        }

        const data = await response.json();
        return Array.isArray(data.predictions) ? data.predictions : [];
    } finally {
        clearTimeout(timeout);
    }
}

function normalizeRoboflowDetections(predictions, dimensions) {
    if (!Array.isArray(predictions)) return [];

    const width = dimensions && dimensions.width ? dimensions.width : 1;
    const height = dimensions && dimensions.height ? dimensions.height : 1;

    return predictions.map((p) => {
        const xCenter = typeof p.x === 'number' ? p.x : 0;
        const yCenter = typeof p.y === 'number' ? p.y : 0;
        const boxWidth = typeof p.width === 'number' ? p.width : 0;
        const boxHeight = typeof p.height === 'number' ? p.height : 0;

        return {
            class: p.class || 'object',
            confidence: typeof p.confidence === 'number' ? p.confidence : 0.5,
            bbox: [
                clamp01(xCenter / width),
                clamp01(yCenter / height),
                clamp01(boxWidth / width),
                clamp01(boxHeight / height)
            ]
        };
    });
}

function clamp01(value) {
    if (!Number.isFinite(value)) return 0;
    if (value < 0) return 0;
    if (value > 1) return 1;
    return value;
}

function getJpegDimensionsFromBase64(base64) {
    try {
        const binary = atob(base64);
        const len = binary.length;
        if (len < 4) return null;

        let offset = 2;
        while (offset + 9 < len) {
            if (binary.charCodeAt(offset) !== 0xff) {
                break;
            }

            const marker = binary.charCodeAt(offset + 1);
            const length = (binary.charCodeAt(offset + 2) << 8) + binary.charCodeAt(offset + 3);

            if (marker === 0xc0 || marker === 0xc2) {
                const height = (binary.charCodeAt(offset + 5) << 8) + binary.charCodeAt(offset + 6);
                const width = (binary.charCodeAt(offset + 7) << 8) + binary.charCodeAt(offset + 8);
                return { width, height };
            }

            offset += 2 + length;
        }
    } catch (err) {
        console.error('Failed to parse JPEG dimensions:', err);
    }
    return null;
}

async function safeText(res) {
    try {
        return await res.text();
    } catch {
        return '';
    }
}

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
}
