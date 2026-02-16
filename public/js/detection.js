/**
 * Percepta AI — Detection Engine
 * TensorFlow.js detection and canvas rendering.
 */
const DetectionEngine = {
    model: null,
    yolo: null,
    yoloModel: null,
    isLoaded: false,

    async loadModel() {
        try {
            await tf.setBackend('webgl');
            await tf.ready();
            if (PERCEPTA_CONFIG.YOLO_ENABLED && typeof window !== 'undefined' && window.YOLO) {
                console.log('[Detection] Loading YOLO model...');
                this.yolo = new window.YOLO();
                this.yolo.setup({
                    modelUrl: PERCEPTA_CONFIG.YOLO_MODEL_URL,
                    scoreThreshold: PERCEPTA_CONFIG.CONFIDENCE_THRESHOLD
                });
                this.yoloModel = await this.yolo.loadModel();
                this.model = 'yolo';
                this.isLoaded = true;
                console.log('[Detection] YOLO loaded');
                return true;
            } else {
                console.log('[Detection] Loading COCO-SSD model...');
                this.model = await cocoSsd.load();
                this.isLoaded = true;
                console.log('[Detection] COCO-SSD loaded');
                return true;
            }
        } catch (error) {
            console.error('[Detection] Model loading failed:', error);
            this.isLoaded = false;
            throw new Error('Failed to load object detection model. Check your internet connection.');
        }
    },

    async detect(imageElement) {
        if (!this.isLoaded) throw new Error('Detection model not loaded');
        if (this.model === 'yolo' && this.yolo && this.yoloModel) {
            return new Promise((resolve, reject) => {
                const tmpCanvas = document.createElement('canvas');
                this.yolo.detect(imageElement, this.yoloModel, tmpCanvas, (res) => {
                    try {
                        const detections = this._fromYoloResult(res);
                        console.log(`[Detection] YOLO detections: ${detections.length}`);
                        resolve(detections);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        } else {
            const rawDetections = await this.model.detect(imageElement);
            return this.processDetections(rawDetections);
        }
    },

    processDetections(detections) {
        return detections
            .filter(det => det.score >= PERCEPTA_CONFIG.CONFIDENCE_THRESHOLD)
            .map(det => {
                const [x, y, width, height] = det.bbox;
                const centerX = x + width / 2;
                const centerY = y + height / 2;

                const category = PERCEPTA_CONFIG.CATEGORY_MAP[det.class] || 'object';
                const color = PERCEPTA_CONFIG.CATEGORY_COLORS[category] || PERCEPTA_CONFIG.CATEGORY_COLORS.object;

                return {
                    class: det.class,
                    score: det.score,
                    category,
                    color,
                    centerX,
                    centerY,
                    bbox: [x, y, width, height]
                };
            });
    },

    _fromYoloResult(res) {
        const boxes = res.boxes || [];
        const scores = res.scores || [];
        const labels = res.labels || res.classes || [];
        const xRatio = typeof res.xRatio === 'number' ? res.xRatio : 1;
        const yRatio = typeof res.yRatio === 'number' ? res.yRatio : 1;
        const detections = [];
        for (let i = 0; i < scores.length; i++) {
            const y1 = (boxes[i * 4 + 0] || 0) * yRatio;
            const x1 = (boxes[i * 4 + 1] || 0) * xRatio;
            const y2 = (boxes[i * 4 + 2] || 0) * yRatio;
            const x2 = (boxes[i * 4 + 3] || 0) * xRatio;
            const w = Math.max(0, x2 - x1);
            const h = Math.max(0, y2 - y1);
            const x = Math.max(0, x1);
            const y = Math.max(0, y1);
            const cls = labels[i] || 'object';
            const score = scores[i] ?? 0;
            const category = PERCEPTA_CONFIG.CATEGORY_MAP[cls] || 'object';
            const color = PERCEPTA_CONFIG.CATEGORY_COLORS[category] || PERCEPTA_CONFIG.CATEGORY_COLORS.object;
            detections.push({
                class: cls,
                score,
                category,
                color,
                centerX: x + w / 2,
                centerY: y + h / 2,
                bbox: [x, y, w, h]
            });
        }
        return detections.filter(d => d.score >= PERCEPTA_CONFIG.CONFIDENCE_THRESHOLD);
    },

    /**
     * Calculate proximity hazards between humans and machinery
     */
    calculateProximityHazards(detections, canvasWidth) {
        const humans = detections.filter(d => d.category === 'human');
        const machines = detections.filter(d => d.category === 'machinery');
        const hazards = [];

        const pixelThreshold = (PERCEPTA_CONFIG.PROXIMITY_THRESHOLD / 5) * canvasWidth * 0.2;

        humans.forEach(human => {
            machines.forEach(machine => {
                const distance = Math.hypot(human.centerX - machine.centerX, human.centerY - machine.centerY);
                const isDanger = distance < pixelThreshold;
                hazards.push({
                    human,
                    machine,
                    machineClass: machine.class,
                    distance: Math.round(distance),
                    threshold: Math.round(pixelThreshold),
                    isDanger
                });
            });
        });

        return hazards;
    },

    /**
     * Render visual analysis on canvas with HUD overlay
     */
    renderOnCanvas(canvas, image, detections, proximityHazards) {
        const ctx = canvas.getContext('2d');

        // Set canvas to image's natural size
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        // Clear and draw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Scale factor for labels based on image size
        const scale = Math.max(1, Math.min(canvas.width, canvas.height) / 800);
        const fontSize = Math.round(14 * scale);
        const lineWidth = Math.max(2, Math.round(3 * scale));
        const cornerSize = Math.round(15 * scale);

        // --- Draw proximity hazard lines (behind boxes) ---
        ctx.setLineDash([10 * scale, 8 * scale]);
        ctx.lineWidth = Math.round(3 * scale);

        (proximityHazards || []).forEach(hazard => {
            if (!hazard.isDanger) return;

            // Danger line
            ctx.strokeStyle = '#ef4444';
            ctx.beginPath();
            ctx.moveTo(hazard.human.centerX, hazard.human.centerY);
            ctx.lineTo(hazard.machine.centerX, hazard.machine.centerY);
            ctx.stroke();

            // Danger label at midpoint
            const midX = (hazard.human.centerX + hazard.machine.centerX) / 2;
            const midY = (hazard.human.centerY + hazard.machine.centerY) / 2;
            const labelW = 80 * scale;
            const labelH = 24 * scale;

            ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
            ctx.fillRect(midX - labelW / 2, midY - labelH / 2, labelW, labelH);
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${fontSize}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('⚠ DANGER', midX, midY);
        });

        ctx.setLineDash([]);

        // --- Draw bounding boxes and labels ---
        detections.forEach(det => {
            const [x, y, w, h] = det.bbox;

            // Bounding box
            ctx.strokeStyle = det.color;
            ctx.lineWidth = lineWidth;
            ctx.strokeRect(x, y, w, h);

            // Label
            const label = `${det.class.toUpperCase()} ${Math.round(det.score * 100)}%`;
            ctx.font = `bold ${fontSize}px Inter, sans-serif`;
            const textW = ctx.measureText(label).width + 16 * scale;
            const labelH = 26 * scale;
            const labelY = y > labelH + 5 ? y - labelH - 2 : y + h + 2;

            // Label background
            ctx.fillStyle = det.color;
            ctx.fillRect(x, labelY, textW, labelH);

            // Label text
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x + 8 * scale, labelY + labelH / 2);

            // Corner brackets
            ctx.strokeStyle = det.color;
            ctx.lineWidth = Math.max(2, lineWidth - 1);

            // Top-left
            ctx.beginPath();
            ctx.moveTo(x, y + cornerSize);
            ctx.lineTo(x, y);
            ctx.lineTo(x + cornerSize, y);
            ctx.stroke();
            // Top-right
            ctx.beginPath();
            ctx.moveTo(x + w - cornerSize, y);
            ctx.lineTo(x + w, y);
            ctx.lineTo(x + w, y + cornerSize);
            ctx.stroke();
            // Bottom-left
            ctx.beginPath();
            ctx.moveTo(x, y + h - cornerSize);
            ctx.lineTo(x, y + h);
            ctx.lineTo(x + cornerSize, y + h);
            ctx.stroke();
            // Bottom-right
            ctx.beginPath();
            ctx.moveTo(x + w - cornerSize, y + h);
            ctx.lineTo(x + w, y + h);
            ctx.lineTo(x + w, y + h - cornerSize);
            ctx.stroke();
        });

        // --- HUD Overlay ---
        this._drawHUD(ctx, canvas, detections, proximityHazards, scale);
    },

    /**
     * Draw tactical HUD elements on the canvas
     */
    _drawHUD(ctx, canvas, detections, proximityHazards, scale) {
        const pad = 12 * scale;
        const fontSize = Math.round(11 * scale);
        ctx.font = `600 ${fontSize}px 'JetBrains Mono', monospace`;
        ctx.textBaseline = 'top';

        // Top-left: system status
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(pad, pad, 200 * scale, 28 * scale);
        ctx.fillStyle = '#10b981';
        ctx.textAlign = 'left';
        ctx.fillText('● SYSTEM ARMED', pad + 8 * scale, pad + 8 * scale);

        // Top-right: LIVE indicator
        const liveW = 80 * scale;
        ctx.fillStyle = 'rgba(239,68,68,0.8)';
        ctx.fillRect(canvas.width - pad - liveW, pad, liveW, 28 * scale);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('● LIVE', canvas.width - pad - liveW / 2, pad + 8 * scale);

        // Bottom-left: detection count
        const humans = detections.filter(d => d.category === 'human').length;
        const machines = detections.filter(d => d.category === 'machinery').length;
        const dangerCount = (proximityHazards || []).filter(h => h.isDanger).length;
        const bottomY = canvas.height - pad - 28 * scale;

        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(pad, bottomY, 280 * scale, 28 * scale);
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'left';
        ctx.fillText(`WORKERS: ${humans}  MACHINES: ${machines}  ALERTS: ${dangerCount}`, pad + 8 * scale, bottomY + 8 * scale);
    },

    /**
     * Convert Gemini AI percentage-based detections to pixel coordinates
     * Returns an array in the same format as processDetections output
     */
    convertGeminiDetections(geminiDetections, canvasWidth, canvasHeight) {
        if (!Array.isArray(geminiDetections)) return [];

        return geminiDetections
            .filter(d => d && d.bbox_percent && Array.isArray(d.bbox_percent) && d.bbox_percent.length === 4)
            .map(d => {
                const [xp, yp, wp, hp] = d.bbox_percent;
                const x = (xp / 100) * canvasWidth;
                const y = (yp / 100) * canvasHeight;
                const w = (wp / 100) * canvasWidth;
                const h = (hp / 100) * canvasHeight;
                const withinBounds =
                    x >= 0 && y >= 0 &&
                    x + w <= canvasWidth + 0.5 &&
                    y + h <= canvasHeight + 0.5 &&
                    w >= 0 && h >= 0;
                if (!withinBounds) {
                    console.warn('[Detection] Gemini percent→pixel out of bounds', { x, y, w, h, canvasWidth, canvasHeight });
                }

                // Map Gemini category to internal category
                const categoryMap = {
                    person: 'human',
                    tool: 'hazard',
                    machine: 'machinery',
                    hazard: 'hazard',
                    ppe: 'equipment',
                    environmental: 'hazard'
                };
                const category = categoryMap[d.category] || 'object';
                const color = PERCEPTA_CONFIG.GEMINI_CATEGORY_COLORS[d.category] ||
                    PERCEPTA_CONFIG.CATEGORY_COLORS[category] || '#6366f1';

                return {
                    class: d.label || d.label_ar || 'Unknown',
                    label_ar: d.label_ar || '',
                    score: 1.0, // AI-identified, high confidence
                    category,
                    color,
                    severity: d.severity || 'NONE',
                    description_ar: d.description_ar || '',
                    centerX: x + w / 2,
                    centerY: y + h / 2,
                    bbox: [x, y, w, h],
                    source: 'gemini' // tag for distinct rendering
                };
            });
    },

    /**
     * Render Gemini AI detections on canvas with distinct visual style
     * Uses dashed borders and an "AI" prefix to distinguish from COCO-SSD boxes
     */
    renderGeminiDetections(canvas, geminiDetections) {
        if (!geminiDetections || geminiDetections.length === 0) return;

        const ctx = canvas.getContext('2d');
        const scale = Math.max(1, Math.min(canvas.width, canvas.height) / 800);
        const fontSize = Math.round(13 * scale);
        const lineWidth = Math.max(2, Math.round(2.5 * scale));
        const cornerSize = Math.round(12 * scale);

        geminiDetections.forEach(det => {
            const [x, y, w, h] = det.bbox;

            // Dashed bounding box (distinct from COCO-SSD solid boxes)
            ctx.setLineDash([8 * scale, 4 * scale]);
            ctx.strokeStyle = det.color;
            ctx.lineWidth = lineWidth;
            ctx.strokeRect(x, y, w, h);
            ctx.setLineDash([]);

            // Label with "AI" prefix
            const label = `AI: ${det.class.toUpperCase()}`;
            ctx.font = `bold ${fontSize}px Inter, sans-serif`;
            const textW = ctx.measureText(label).width + 16 * scale;
            const labelH = 24 * scale;
            const labelY = y > labelH + 5 ? y - labelH - 2 : y + h + 2;

            // Label background with rounded corners
            ctx.fillStyle = det.color + 'DD'; // slightly transparent
            ctx.beginPath();
            const r = 4 * scale;
            ctx.moveTo(x + r, labelY);
            ctx.lineTo(x + textW - r, labelY);
            ctx.quadraticCurveTo(x + textW, labelY, x + textW, labelY + r);
            ctx.lineTo(x + textW, labelY + labelH - r);
            ctx.quadraticCurveTo(x + textW, labelY + labelH, x + textW - r, labelY + labelH);
            ctx.lineTo(x + r, labelY + labelH);
            ctx.quadraticCurveTo(x, labelY + labelH, x, labelY + labelH - r);
            ctx.lineTo(x, labelY + r);
            ctx.quadraticCurveTo(x, labelY, x + r, labelY);
            ctx.fill();

            // Label text
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x + 8 * scale, labelY + labelH / 2);

            // Corner brackets (dashed style)
            ctx.strokeStyle = det.color;
            ctx.lineWidth = Math.max(2, lineWidth - 1);
            ctx.setLineDash([]);

            // Top-left
            ctx.beginPath();
            ctx.moveTo(x, y + cornerSize);
            ctx.lineTo(x, y);
            ctx.lineTo(x + cornerSize, y);
            ctx.stroke();
            // Top-right
            ctx.beginPath();
            ctx.moveTo(x + w - cornerSize, y);
            ctx.lineTo(x + w, y);
            ctx.lineTo(x + w, y + cornerSize);
            ctx.stroke();
            // Bottom-left
            ctx.beginPath();
            ctx.moveTo(x, y + h - cornerSize);
            ctx.lineTo(x, y + h);
            ctx.lineTo(x + cornerSize, y + h);
            ctx.stroke();
            // Bottom-right
            ctx.beginPath();
            ctx.moveTo(x + w - cornerSize, y + h);
            ctx.lineTo(x + w, y + h);
            ctx.lineTo(x + w, y + h - cornerSize);
            ctx.stroke();
        });

        // Update HUD with combined counts
        this._drawGeminiHUD(ctx, canvas, geminiDetections, scale);
    },

    /**
     * Draw a small "AI DETECTIONS" badge on the canvas
     */
    _drawGeminiHUD(ctx, canvas, geminiDetections, scale) {
        const pad = 12 * scale;
        const fontSize = Math.round(10 * scale);
        ctx.font = `600 ${fontSize}px 'JetBrains Mono', monospace`;
        ctx.textBaseline = 'top';

        const aiCount = geminiDetections.length;
        const badgeText = `AI DETECTIONS: ${aiCount}`;
        const textWidth = ctx.measureText(badgeText).width + 16 * scale;
        const badgeH = 24 * scale;
        const badgeX = canvas.width - pad - textWidth;
        const badgeY = canvas.height - pad - badgeH;

        ctx.fillStyle = 'rgba(99, 102, 241, 0.8)';
        ctx.fillRect(badgeX, badgeY, textWidth, badgeH);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(badgeText, badgeX + textWidth / 2, badgeY + 7 * scale);
    }
};
