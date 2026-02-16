const PERCEPTA_API_BASE = '';

const PERCEPTA_CONFIG = {
    DETECTION_DEBUG: false,
    CONFIDENCE_THRESHOLD: 0.4,
    PROXIMITY_THRESHOLD: 3.0,

    MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_IMAGE_DIMENSION: 1560,
    JPEG_QUALITY: 0.85,

    VISION_ENDPOINT: 'https://vision.percepta.sbs/api/detect',
    REASON_ENDPOINT: 'https://analysis.percepta.sbs/api/reason',
    HEALTH_ENDPOINT: 'https://analysis.percepta.sbs/api/health',
    REQUEST_TIMEOUT: 90000, // 90s — two parallel calls may take longer

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
        chair: 'hazard',
        bench: 'hazard',
        'fire hydrant': 'equipment',
        'stop sign': 'equipment',
        'parking meter': 'equipment'
    },

    CATEGORY_COLORS: {
        human: '#3b82f6',
        machinery: '#f59e0b',
        hazard: '#ef4444',
        equipment: '#10b981',
        object: '#3b82f6'
    },

    GEMINI_CATEGORY_COLORS: {
        person: '#3b82f6',
        tool: '#10b981',
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
