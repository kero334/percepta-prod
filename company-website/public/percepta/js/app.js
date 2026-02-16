/**
 * Percepta AI — Main Application Entry Point
 * Orchestrates initialization, event binding, and analysis pipeline.
 */
const App = {
    // Global state
    state: {
        analysisMode: 'comprehensive',
        currentImage: null,
        detections: [],
        proximityHazards: [],
        aiReport: null,
        isAnalyzing: false,
        visionReady: false,
        backendReady: false
    },

    /**
     * Initialize the application
     */
    async init() {
        console.log('[Percepta] Initializing...');
        UI.init();
        this.bindEvents();
        this.renderModeSelector();

        // Load models and check backend in parallel
        const [visionOk, backendOk] = await Promise.allSettled([
            this._initVision(),
            this._initBackend()
        ]);

        this.state.visionReady = visionOk.status === 'fulfilled' && visionOk.value;
        this.state.backendReady = backendOk.status === 'fulfilled' && backendOk.value;
        UI.updateStatus(this.state.visionReady, this.state.backendReady);

        if (!this.state.visionReady) {
            UI.showToast('Vision detection unavailable. Visual detection is disabled.', 'warning');
        }
        if (!this.state.backendReady) {
            UI.showToast('AI safety reasoning is temporarily offline. Visual detection still works.', 'warning');
        }

        if (this.state.visionReady && this.state.backendReady) {
            UI.showToast('Percepta AI ready', 'success');
        }

        console.log('[Percepta] Initialization complete');
    },

    async _initVision() {
        try {
            UI.showToast('Loading AI vision model...', 'warning');
            await DetectionEngine.loadModel();
            return true;
        } catch (e) {
            console.error('[Init] Vision:', e);
            return false;
        }
    },

    async _initBackend() {
        try {
            return await AnalysisEngine.checkHealth();
        } catch (e) {
            console.error('[Init] Backend:', e);
            return false;
        }
    },

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // File upload
        const fileInput = document.getElementById('file-upload');
        if (fileInput) fileInput.addEventListener('change', (e) => this.handleFileUpload(e));

        // Drag and drop
        this.setupDragAndDrop();

        // Mobile results toggle
        const mobileToggle = document.getElementById('mobile-results-toggle');
        if (mobileToggle) mobileToggle.addEventListener('click', () => UI.toggleMobileResults());

        const langBtn = document.getElementById('report-lang-btn');
        if (langBtn) langBtn.addEventListener('click', () => UI.toggleReportLanguage());
    },

    /**
     * Render analysis mode selector cards
     */
    renderModeSelector() {
        const container = document.getElementById('mode-selector');
        if (!container) return;

        const modes = PERCEPTA_CONFIG.ANALYSIS_MODES;
        container.innerHTML = Object.values(modes).map(mode => `
            <div class="mode-card glass ${mode.id === this.state.analysisMode ? 'active' : ''}"
                 data-mode="${mode.id}" onclick="App.setMode('${mode.id}')">
                <div class="mode-card-header">
                    <i class="${mode.icon}" style="color:${mode.iconColor};font-size:1.25rem;"></i>
                    <h4 class="font-bold">${mode.label}</h4>
                </div>
                <p class="text-xs text-gray-400 mt-1">${mode.description}</p>
            </div>
        `).join('');
    },

    setMode(mode) {
        this.state.analysisMode = mode;
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.toggle('active', card.dataset.mode === mode);
        });
    },

    /**
     * Handle file upload
     */
    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            UI.showToast('Please upload a valid image file (JPG, PNG, WebP)', 'error');
            return;
        }

        // Validate file size
        if (file.size > PERCEPTA_CONFIG.MAX_IMAGE_SIZE) {
            UI.showToast('File too large. Maximum size is 10MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onerror = () => UI.showToast('Failed to read file', 'error');
        reader.onload = (e) => {
            const img = UI.elements.analysisImage;
            img.onload = () => {
                this.state.currentImage = img;
                this.runAnalysis();
            };
            img.onerror = () => UI.showToast('Failed to load image. File may be corrupted.', 'error');
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    },

    /**
     * Load demo image for testing
     */
    loadDemoImage() {
        const img = UI.elements.analysisImage;
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            this.state.currentImage = img;
            this.runAnalysis();
        };
        img.onerror = () => UI.showToast('Failed to load demo image. Check your internet connection.', 'error');
        img.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop';
    },

    /**
     * Run the complete analysis pipeline
     */
    async runAnalysis() {
        if (this.state.isAnalyzing) {
            UI.showToast('Analysis already in progress...', 'warning');
            return;
        }

        if (!this.state.currentImage) {
            UI.showToast('No image loaded', 'error');
            return;
        }

        if (!DetectionEngine.isLoaded) {
            UI.showToast('Vision model not loaded. Please wait...', 'warning');
            return;
        }

        this.state.isAnalyzing = true;

        try {
            // Step 1: Show loading
            UI.showLoading();
            UI.updateLoading('Detecting objects...', 15);

            // Step 2: Object Detection
            const imageBase64 = DetectionEngine.imageToBase64(this.state.currentImage);
            const detections = await DetectionEngine.detect(this.state.currentImage, this.state.analysisMode, imageBase64);
            this.state.detections = detections;
            UI.updateLoading(`Found ${detections.length} objects. Rendering...`, 30);

            // Step 3: Calculate initial proximity hazards
            const canvas = UI.elements.canvas;
            const canvasWidth = this.state.currentImage.naturalWidth;
            const canvasHeight = this.state.currentImage.naturalHeight;
            this.state.proximityHazards = DetectionEngine.calculateProximityHazards(detections, canvasWidth);

            // Step 4: Render COCO-SSD detections on canvas
            DetectionEngine.renderOnCanvas(canvas, this.state.currentImage, detections, this.state.proximityHazards);
            UI.showCanvas();
            UI.updateLoading('Running AI deep analysis (detecting all entities)...', 50);

            // Step 5: AI Analysis via backend (Gemini reasoning only, optional)
            this.state.detections = detections;

            if (this.state.backendReady) {
                const analysis = await AnalysisEngine.analyze(
                    this.state.detections, this.state.analysisMode
                );
                this.state.aiReport = analysis;
                UI.updateLoading('Processing AI detections...', 80);

                UI.updateLoading('Generating report...', 90);

                // Step 7: Display results with combined detection data
                try {
                    UI.displayResults(analysis, this.state.detections);
                    console.log('[Analysis] Report rendered successfully');
                } catch (renderErr) {
                    console.error('[Analysis] Report rendering error:', renderErr);
                    UI.showToast('Report rendering failed, but analysis is saved.', 'warning');
                }
                UI.hideLoading();
                UI.showToast(`Analysis complete! ${this.state.detections.length} entities detected.`, 'success');
            } else {
                this.state.aiReport = null;
                UI.updateLoading('AI reasoning offline. Showing visual detections only.', 90);
                UI.hideLoading();
                UI.showToast('Visual detection complete. AI safety report is temporarily unavailable.', 'warning');
            }

        } catch (error) {
            console.error('[Analysis] Failed:', error);
            UI.hideLoading();

            // Show specific error message
            let errorMsg = error.message || 'Analysis failed. Please try again.';
            if (errorMsg.includes('rate limit') || errorMsg.includes('429')) {
                errorMsg = 'API rate limit reached. Please wait 60 seconds and try again.';
            } else if (errorMsg.includes('timed out')) {
                errorMsg = 'Analysis timed out. Try a smaller or simpler image.';
            }
            UI.showToast(errorMsg, 'error');
        } finally {
            this.state.isAnalyzing = false;
        }
    },

    /**
     * Reset to initial state
     */
    resetView() {
        this.state.currentImage = null;
        this.state.detections = [];
        this.state.proximityHazards = [];
        this.state.aiReport = null;
        UI.resetView();
    },

    /**
     * Download analyzed image
     */
    downloadImage() {
        UI.downloadImage(UI.elements.canvas);
    },

    /**
     * Export PDF report
     */
    exportReport() {
        UI.exportPDF(this.state.aiReport);
    },

    /**
     * Setup drag and drop on upload area
     */
    setupDragAndDrop() {
        const dropZone = document.getElementById('drop-zone');
        if (!dropZone) return;

        ['dragenter', 'dragover'].forEach(evt => {
            dropZone.addEventListener(evt, (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(evt => {
            dropZone.addEventListener(evt, (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
            });
        });

        dropZone.addEventListener('drop', (e) => {
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                const input = document.getElementById('file-upload');
                const dt = new DataTransfer();
                dt.items.add(file);
                input.files = dt.files;
                this.handleFileUpload({ target: input });
            }
        });
    }
};

// Helper
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
