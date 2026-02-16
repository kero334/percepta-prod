const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

const geminiEndpoint = (key, model) =>
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders });
        }
        if (url.pathname === '/api/health' && request.method === 'GET') {
            return json({ status: 'ok' }, 200);
        }
        if (url.pathname === '/api/reason' && request.method === 'POST') {
            return analyzeSafety(request, env);
        }
        return json({ error: 'Not found' }, 404);
    }
};

async function analyzeSafety(request, env) {
    let payload;
    try {
        payload = await request.json();
    } catch {
        return json({ success: false, error: 'AI safety analysis unavailable' }, 400);
    }

    const detections = payload && payload.detections;
    const analysisMode = (payload && payload.analysisMode) || 'comprehensive';
    if (!Array.isArray(detections)) {
        return json({ success: false, error: 'AI safety analysis unavailable' }, 400);
    }

    const keys = [env.GEMINI_API_KEY_1, env.GEMINI_API_KEY_2].filter((k) => k && k.trim());
    if (keys.length === 0) {
        return json({ success: false, error: 'AI safety analysis unavailable' }, 500);
    }

    const structuredDetection = buildStructuredDetection(detections);
    const prompt = buildPrompt(structuredDetection, analysisMode);
    const start = Date.now();
    let lastError = null;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        try {
            const response = await fetchWithTimeout(
                geminiEndpoint(key, 'gemini-1.5-flash'),
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ role: 'user', parts: [{ text: prompt }] }]
                    })
                },
                30000
            );

            if (!response.ok) {
                const text = await safeText(response);
                console.error(`[Gemini] key_index=${i} status=${response.status} body=${text}`);
                lastError = new Error(`Gemini error (${response.status})`);
                continue;
            }

            const data = await response.json();
            const rawText = extractGeminiText(data);
            const jsonText = extractJsonBlock(rawText);
            const analysis = JSON.parse(jsonText);
            const elapsed = Date.now() - start;
            console.info(`[Analysis] ms=${elapsed}`);
            return json({ success: true, analysis }, 200);
        } catch (err) {
            console.error(`[Gemini] key_index=${i} exception`, err);
            lastError = err;
        }
    }

    return json({ success: false, error: 'AI safety analysis unavailable' }, 502);
}

function buildStructuredDetection(detections) {
    const persons = [];
    const machines = [];
    const tools = [];
    const hazards = [];
    for (let i = 0; i < detections.length; i++) {
        const det = detections[i] || {};
        const bbox = Array.isArray(det.bbox) ? det.bbox : [0, 0, 0, 0];
        const xCenter = Number(bbox[0] || 0);
        const yCenter = Number(bbox[1] || 0);
        const width = Number(bbox[2] || 0);
        const height = Number(bbox[3] || 0);
        const x = Math.max(0, Math.min(100, Math.round((xCenter - width / 2) * 100)));
        const y = Math.max(0, Math.min(100, Math.round((yCenter - height / 2) * 100)));
        const w = Math.max(0, Math.min(100, Math.round(width * 100)));
        const h = Math.max(0, Math.min(100, Math.round(height * 100)));
        const approx = yCenter < 0.5 ? (xCenter < 0.5 ? 'top-left' : 'top-right') : (xCenter < 0.5 ? 'bottom-left' : 'bottom-right');
        const entry = {
            id: 0,
            class_name: det.class || 'object',
            description: det.class || 'object',
            approximate_location: approx,
            confidence: typeof det.confidence === 'number' ? det.confidence : 0.5,
            bbox_percent: [x, y, w, h]
        };
        if (det.category === 'worker' || det.class === 'person') {
            entry.id = persons.length + 1;
            persons.push(entry);
        } else if (det.category === 'machinery' || det.class === 'machine') {
            entry.id = machines.length + 1;
            machines.push(entry);
        } else if (det.category === 'safety_risk' || det.class === 'hazard') {
            entry.id = hazards.length + 1;
            hazards.push(entry);
        } else {
            entry.id = tools.length + 1;
            tools.push(entry);
        }
    }
    return {
        persons,
        machines,
        tools,
        hazards,
        total_person_count: persons.length
    };
}

function buildPrompt(detection, analysisMode) {
    const detectionJson = JSON.stringify(detection, null, 2);
    const mode = analysisMode || 'comprehensive';
    return (
        'أنت خبير سلامة مهنية صناعية يتحدث العربية بطلاقة.\n' +
        'سيتم تزويدك بنتائج كشف كائنات من صورة موقع عمل (أشخاص، معدات، أدوات، مخاطر).\n\n' +
        'مهمتك:\n' +
        '1. تحليل المخاطر ومستوى السلامة في الموقع.\n' +
        '2. توليد تقرير سلامة مفصل باللغة العربية فقط.\n' +
        '3. إرجاع الناتج في صيغة JSON فقط بدون أي نص آخر خارج JSON.\n\n' +
        'بيانات الكشف (JSON):\n' +
        detectionJson +
        '\n\n' +
        'وضع التحليل: ' +
        mode +
        '\n\n' +
        'يجب أن يكون JSON بالضبط على الشكل التالي (نفس البنية، ليست قيم حقيقية):\n' +
        '{\n' +
        '  "risk_score": 75,\n' +
        '  "risk_level": "HIGH",\n' +
        '  "workers_count": 3,\n' +
        '  "machinery_count": 2,\n' +
        '  "ppe_compliance_rate": 60,\n' +
        '  "violations": [\n' +
        '    {\n' +
        '      "type": "PPE",\n' +
        '      "severity": "HIGH",\n' +
        '      "description": "عامل بدون خوذة في منطقة عمل نشطة",\n' +
        '      "regulation": "OSHA 1926.100",\n' +
        '      "recommendation": "إلزام العامل بارتداء خوذة واقية مطابقة للمواصفات فوراً"\n' +
        '    }\n' +
        '  ],\n' +
        '  "detailed_report": "English markdown summary (optional).",\n' +
        '  "detailed_report_ar": "تقرير كامل باللغة العربية بتنسيق Markdown.",\n' +
        '  "scene_description_ar": "وصف عام لما يظهر في الصورة.",\n' +
        '  "executive_summary_ar": "ملخص تنفيذي لمستوى السلامة بشكل مختصر.",\n' +
        '  "positive_observations_ar": [\n' +
        '    "وجود إشارات تحذيرية واضحة في المنطقة."\n' +
        '  ],\n' +
        '  "environmental_hazards_ar": [\n' +
        '    "أسلاك كهربائية مكشوفة بالقرب من مسار الحركة."\n' +
        '  ],\n' +
        '  "worker_analysis": [\n' +
        '    {\n' +
        '      "id": "Worker 1",\n' +
        '      "id_ar": "العامل ١",\n' +
        '      "safety_status": "AT_RISK",\n' +
        '      "safety_status_ar": "معرض للخطر",\n' +
        '      "location_ar": "الجهة اليسرى من الصورة",\n' +
        '      "activity_ar": "يحمل صندوقاً بالقرب من رافعة متحركة",\n' +
        '      "ppe_items_ar": ["خوذة", "سترة عاكسة"],\n' +
        '      "missing_ppe_ar": ["قفازات واقية"],\n' +
        '      "risk_factors_ar": [\n' +
        '        "قربه من حركة الرافعة بدون فصل واضح للمسارات"\n' +
        '      ]\n' +
        '    }\n' +
        '  ],\n' +
        '  "gemini_detections": [\n' +
        '    {\n' +
        '      "category": "machine",\n' +
        '      "label": "Forklift",\n' +
        '      "label_ar": "رافعة شوكية",\n' +
        '      "severity": "MEDIUM",\n' +
        '      "description_ar": "رافعة تتحرك بالقرب من العمال دون حاجز فصل واضح."\n' +
        '    }\n' +
        '  ]\n' +
        '}\n\n' +
        'القيم يجب أن تعكس تحليل الصورة الفعلي اعتماداً على بيانات الكشف.\n' +
        'لا تخرج أي نص خارج JSON. لا تضع تعليقات داخل JSON.\n' +
        'إذا لم تكن متأكدًا من شيء، ضع قيمة معقولة بدل أن تتركه فارغًا.\n'
    );
}

function extractGeminiText(data) {
    const cand = data && data.candidates && data.candidates[0];
    const parts = cand && cand.content && cand.content.parts;
    if (parts && parts[0] && parts[0].text) return parts[0].text;
    return '';
}

function extractJsonBlock(text) {
    if (!text) return '';
    const match = text.match(/```json([\s\S]*?)```/i);
    if (match && match[1]) return match[1].trim();
    return text.trim();
}

async function fetchWithTimeout(url, options, timeoutMs) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(timeout);
    }
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
