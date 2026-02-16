const PERCEPTA_API_BASE = (function () {
    const override = (window && window.PERCEPTA_API_BASE) ? String(window.PERCEPTA_API_BASE).trim() : '';
    if (override) return override;
    const loc = (window && window.location) ? window.location : null;
    const host = loc ? loc.hostname : '';
    const origin = loc && loc.origin ? loc.origin : '';
    const isLocal = host === 'localhost' || host === '127.0.0.1';
    return isLocal ? origin : 'https://your-production-backend-url.com';
})();

const PERCEPTA_CONFIG = {
    YOLO_ENABLED: true,
    YOLO_MODEL_URL: 'https://raw.githubusercontent.com/Hyuto/yolov8-tfjs/master/public/yolov8n_web_model/model.json',
    // Detection thresholds — lowered to catch more entities
    CONFIDENCE_THRESHOLD: 0.15,
    PROXIMITY_THRESHOLD: 3.0,

    // Image constraints — improved for better detection accuracy
    MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_IMAGE_DIMENSION: 1560,
    JPEG_QUALITY: 0.85,

    API_ENDPOINT: PERCEPTA_API_BASE + '/api/analyze',
    HEALTH_ENDPOINT: PERCEPTA_API_BASE + '/api/health',
    REQUEST_TIMEOUT: 90000, // 90s — two parallel calls may take longer

    // Analysis modes (internal — not user-toggled)
    ANALYSIS_MODES: {
        comprehensive: {
            id: 'comprehensive',
            label: 'Comprehensive',
            icon: 'fas fa-shield-alt',
            iconColor: '#3b82f6',
            description: 'Full safety analysis with PPE, proximity, and risk assessment'
        },
        ppe: {
            id: 'ppe',
            label: 'PPE Focus',
            icon: 'fas fa-hard-hat',
            iconColor: '#f59e0b',
            description: 'Specialized PPE compliance checking'
        },
        proximity: {
            id: 'proximity',
            label: 'Proximity Alert',
            icon: 'fas fa-exclamation-triangle',
            iconColor: '#ef4444',
            description: 'Focus on human-machinery distance hazards'
        }
    },

    // COCO-SSD class → industrial category mapping (expanded)
    CATEGORY_MAP: {
        person: 'human',
        // Vehicles / machinery
        car: 'machinery',
        truck: 'machinery',
        bus: 'machinery',
        motorcycle: 'machinery',
        bicycle: 'machinery',
        train: 'machinery',
        boat: 'machinery',
        // Objects that could be hazards
        knife: 'hazard',
        scissors: 'hazard',
        bottle: 'hazard',
        // PPE-related / equipment
        backpack: 'equipment',
        handbag: 'equipment',
        umbrella: 'equipment',
        suitcase: 'equipment',
        'cell phone': 'equipment',
        laptop: 'equipment',
        // Other construction-related
        chair: 'object',
        bench: 'object',
        'fire hydrant': 'equipment',
        'stop sign': 'equipment',
        'parking meter': 'equipment'
    },

    // Colors for COCO-SSD detection categories
    CATEGORY_COLORS: {
        human: '#ef4444',
        machinery: '#f59e0b',
        hazard: '#ff6b35',
        equipment: '#10b981',
        object: '#3b82f6'
    },

    // Colors for Gemini AI detections (entities not detectable by COCO-SSD)
    GEMINI_CATEGORY_COLORS: {
        person: '#ef4444',
        tool: '#ff6b35',
        machine: '#f59e0b',
        hazard: '#dc2626',
        ppe: '#10b981',
        environmental: '#a855f7',
        object: '#6366f1'
    },

    // Risk level styling
    RISK_STYLES: {
        LOW: { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: 'rgba(16, 185, 129, 0.3)', gradient: 'linear-gradient(90deg, #10b981, #059669)' },
        MEDIUM: { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)', gradient: 'linear-gradient(90deg, #f59e0b, #d97706)' },
        HIGH: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)', gradient: 'linear-gradient(90deg, #ef4444, #dc2626)' },
        CRITICAL: { bg: 'rgba(239, 68, 68, 0.3)', color: '#ff0000', border: 'rgba(255, 0, 0, 0.5)', gradient: 'linear-gradient(90deg, #dc2626, #991b1b)' }
    }
};
