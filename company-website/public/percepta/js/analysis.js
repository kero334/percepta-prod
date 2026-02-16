/**
 * Percepta AI — Analysis Module
 * Handles communication with the Gemini reasoning backend only.
 * Vision detection runs server-side; the backend returns an Arabic safety report.
 */
const AnalysisEngine = {

    /**
     * Preprocess image: resize if too large, return base64
     */
    preprocessImage(canvas) {
        const maxDim = PERCEPTA_CONFIG.MAX_IMAGE_DIMENSION;
        let targetCanvas = canvas;

        // If image is larger than max dimension, resize for upload
        if (canvas.width > maxDim || canvas.height > maxDim) {
            const ratio = Math.min(maxDim / canvas.width, maxDim / canvas.height);
            const newW = Math.round(canvas.width * ratio);
            const newH = Math.round(canvas.height * ratio);

            targetCanvas = document.createElement('canvas');
            targetCanvas.width = newW;
            targetCanvas.height = newH;
            const tCtx = targetCanvas.getContext('2d');
            tCtx.drawImage(canvas, 0, 0, newW, newH);
        }

        // Convert to base64 JPEG (strip data:image/jpeg;base64, prefix)
        const dataUrl = targetCanvas.toDataURL('image/jpeg', PERCEPTA_CONFIG.JPEG_QUALITY);
        return dataUrl.split(',')[1];
    },

    /**
     * Build detection context for the backend prompt
     */
    buildDetectionContext(detections, proximityHazards) {
        const humans = detections.filter(d => d.category === 'human');
        const machines = detections.filter(d => d.category === 'machinery');

        return {
            humans: humans.length,
            machines: machines.length,
            totalObjects: detections.length,
            detections: detections.map(d => ({
                class: d.class,
                category: d.category,
                score: d.score,
                bbox: d.bbox
            })),
            proximityHazards: (proximityHazards || []).map(h => ({
                machineClass: h.machineClass,
                distance: h.distance,
                threshold: h.threshold,
                isDanger: h.isDanger
            }))
        };
    },

    async analyze(detections, analysisMode) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), PERCEPTA_CONFIG.REQUEST_TIMEOUT);

        try {
            const response = await fetch(PERCEPTA_CONFIG.REASON_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    detections,
                    analysisMode
                })
            });

            clearTimeout(timeout);

            if (response.status === 429) {
                throw new Error('Too many requests. Please wait a moment and try again.');
            }

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || `Server error (${response.status}). Please try again.`);
            }

            const data = await response.json();

            if (!data.success || !data.analysis) {
                throw new Error('Unexpected server response format');
            }

            return data.analysis;
        } catch (error) {
            clearTimeout(timeout);
            if (error.name === 'AbortError') {
                throw new Error('Analysis timed out. The image may be too complex. Try a smaller image.');
            }
            throw error;
        }
    },

    async checkHealth() {
        try {
            const response = await fetch(PERCEPTA_CONFIG.HEALTH_ENDPOINT);
            if (!response.ok) return false;
            const data = await response.json();
            return data.status === 'ok';
        } catch {
            return false;
        }
    }
};
