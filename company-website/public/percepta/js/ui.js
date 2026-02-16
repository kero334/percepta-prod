/**
 * Percepta AI — UI Module
 * DOM manipulation, loading states, toasts, results rendering, PDF export.
 */
const UI = {
    // Cache DOM references
    elements: {},

    init() {
        this.elements = {
            emptyState: document.getElementById('empty-state'),
            canvasSection: document.getElementById('canvas-section'),
            canvas: document.getElementById('analysis-canvas'),
            analysisImage: document.getElementById('analysis-image'),
            fileUpload: document.getElementById('file-upload'),
            scanLine: document.getElementById('scan-line'),
            // Loading
            loadingState: document.getElementById('loading-state'),
            loadingStatus: document.getElementById('loading-status'),
            loadingProgress: document.getElementById('loading-progress'),
            // Results
            resultsContent: document.getElementById('results-content'),
            idleState: document.getElementById('idle-state'),
            riskScore: document.getElementById('risk-score'),
            riskLevel: document.getElementById('risk-level'),
            riskBar: document.getElementById('risk-bar'),
            statHumans: document.getElementById('stat-humans'),
            statMachines: document.getElementById('stat-machines'),
            statHazards: document.getElementById('stat-hazards'),
            statPpe: document.getElementById('stat-ppe'),
            summaryWorkers: document.getElementById('summary-workers'),
            summaryMachinery: document.getElementById('summary-machinery'),
            summaryHazards: document.getElementById('summary-hazards'),
            summaryRisk: document.getElementById('summary-risk'),
            summaryEngineRow: document.getElementById('summary-engine-row'),
            summaryEngine: document.getElementById('summary-engine'),
            summaryLoadRow: document.getElementById('summary-load-row'),
            summaryLoad: document.getElementById('summary-load'),
            summaryInferRow: document.getElementById('summary-infer-row'),
            summaryInfer: document.getElementById('summary-infer'),
            aiReport: document.getElementById('ai-report'),
            incidentList: document.getElementById('incident-list'),
            fullReportSection: document.getElementById('full-report-section'),
            // Status
            statusVision: document.getElementById('status-vision'),
            statusReasoning: document.getElementById('status-reasoning'),
            // Mobile
            mobileResultsToggle: document.getElementById('mobile-results-toggle'),
            resultsPanel: document.getElementById('results-panel-wrapper'),
            toast: document.getElementById('toast'),
            reportLangBtn: document.getElementById('report-lang-btn'),
        };
    },

    // -----------------------------------------------------------------------
    // Status Indicators
    // -----------------------------------------------------------------------
    updateStatus(visionReady, backendReady) {
        if (this.elements.statusVision) {
            this.elements.statusVision.className = `status-dot ${visionReady ? 'bg-green-500' : 'bg-red-500'}`;
        }
        if (this.elements.statusReasoning) {
            this.elements.statusReasoning.className = `status-dot ${backendReady ? 'bg-green-500' : 'bg-red-500'}`;
        }
    },

    // -----------------------------------------------------------------------
    // Loading States
    // -----------------------------------------------------------------------
    showLoading() {
        this._hide(this.elements.idleState);
        this._hide(this.elements.resultsContent);
        this._show(this.elements.loadingState);
        // On mobile, show the results panel
        this._showMobileResults();
    },

    hideLoading() {
        this._hide(this.elements.loadingState);
    },

    updateLoading(status, progress) {
        if (this.elements.loadingStatus) this.elements.loadingStatus.textContent = status;
        if (this.elements.loadingProgress) this.elements.loadingProgress.style.width = progress + '%';
    },

    // -----------------------------------------------------------------------
    // Canvas / Image Display
    // -----------------------------------------------------------------------
    showCanvas() {
        this._hide(this.elements.emptyState);
        this._show(this.elements.canvasSection);

        // Trigger scan animation
        if (this.elements.scanLine) {
            this.elements.scanLine.style.display = 'block';
            setTimeout(() => { this.elements.scanLine.style.display = 'none'; }, 3000);
        }
    },

    resetView() {
        this._show(this.elements.emptyState);
        this._hide(this.elements.canvasSection);
        this._hide(this.elements.resultsContent);
        this._hide(this.elements.fullReportSection);
        this._show(this.elements.idleState);
        if (this.elements.fileUpload) this.elements.fileUpload.value = '';
    },

    // -----------------------------------------------------------------------
    // Results Display
    // -----------------------------------------------------------------------
    displayResults(analysis, detections) {
        this._hide(this.elements.idleState);
        this._hide(this.elements.loadingState);
        this._show(this.elements.resultsContent);
        this._show(this.elements.fullReportSection);
        this._showMobileResults();

        // Risk score
        if (this.elements.riskScore) this.elements.riskScore.textContent = analysis.risk_score;

        // Risk level badge
        if (this.elements.riskLevel) {
            this.elements.riskLevel.textContent = analysis.risk_level;
            const style = PERCEPTA_CONFIG.RISK_STYLES[analysis.risk_level] || PERCEPTA_CONFIG.RISK_STYLES.MEDIUM;
            this.elements.riskLevel.style.background = style.bg;
            this.elements.riskLevel.style.color = style.color;
            this.elements.riskLevel.style.border = `1px solid ${style.border}`;
        }

        // Risk bar
        if (this.elements.riskBar) {
            this.elements.riskBar.style.width = analysis.risk_score + '%';
            const style = PERCEPTA_CONFIG.RISK_STYLES[analysis.risk_level] || PERCEPTA_CONFIG.RISK_STYLES.MEDIUM;
            this.elements.riskBar.style.background = style.gradient;
        }

        // Stats — use AI-returned counts if available, fallback to detection counts
        const humans = analysis.workers_count || detections.filter(d => d.category === 'human').length;
        const machines = analysis.machinery_count || detections.filter(d => d.category === 'machinery').length;
        const hazards = (analysis.violations || []).filter(v => v.severity === 'HIGH' || v.severity === 'CRITICAL').length;

        if (this.elements.statHumans) this.elements.statHumans.textContent = humans;
        if (this.elements.statMachines) this.elements.statMachines.textContent = machines;
        if (this.elements.statHazards) this.elements.statHazards.textContent = hazards;
        if (this.elements.statPpe) this.elements.statPpe.textContent = Math.round(analysis.ppe_compliance_rate) + '%';
        if (this.elements.summaryWorkers) this.elements.summaryWorkers.textContent = humans;
        if (this.elements.summaryMachinery) this.elements.summaryMachinery.textContent = machines;
        if (this.elements.summaryHazards) this.elements.summaryHazards.textContent = hazards;
        if (this.elements.summaryRisk) this.elements.summaryRisk.textContent = analysis.risk_level || '--';
        if (this.elements.summaryEngineRow && this.elements.summaryEngine) {
            if (PERCEPTA_CONFIG.DETECTION_DEBUG && DetectionEngine && DetectionEngine.activeModelName) {
                this.elements.summaryEngineRow.style.display = 'flex';
                this.elements.summaryEngine.textContent = DetectionEngine.activeModelName;
                if (this.elements.summaryLoadRow && this.elements.summaryLoad) {
                    this.elements.summaryLoadRow.style.display = 'flex';
                    this.elements.summaryLoad.textContent = DetectionEngine.lastLoadMs ? `${DetectionEngine.lastLoadMs} ms` : '--';
                }
                if (this.elements.summaryInferRow && this.elements.summaryInfer) {
                    this.elements.summaryInferRow.style.display = 'flex';
                    this.elements.summaryInfer.textContent = DetectionEngine.lastInferMs ? `${DetectionEngine.lastInferMs} ms` : '--';
                }
            } else {
                this.elements.summaryEngineRow.style.display = 'none';
                if (this.elements.summaryLoadRow) this.elements.summaryLoadRow.style.display = 'none';
                if (this.elements.summaryInferRow) this.elements.summaryInferRow.style.display = 'none';
            }
        }

        // Store for language toggle
        this._currentReport = analysis;
        this._reportLang = 'en';
        this._renderReport(analysis);

        // Incident list (brief)
        this._renderIncidents(analysis.violations || []);

        // Full Arabic Report
        this._renderFullArabicReport(analysis);
    },

    _renderReport(analysis) {
        const reportText = this._reportLang === 'ar' && analysis.detailed_report_ar
            ? analysis.detailed_report_ar
            : analysis.detailed_report;

        if (this.elements.aiReport) {
            this.elements.aiReport.innerHTML = marked.parse(reportText || 'No report generated.');
            this.elements.aiReport.dir = this._reportLang === 'ar' ? 'rtl' : 'ltr';
        }

        if (this.elements.reportLangBtn) {
            this.elements.reportLangBtn.textContent = this._reportLang === 'ar' ? 'English' : 'العربية';
        }
    },

    toggleReportLanguage() {
        if (!this._currentReport) return;
        this._reportLang = this._reportLang === 'en' ? 'ar' : 'en';
        this._renderReport(this._currentReport);
    },

    _renderIncidents(violations) {
        if (!this.elements.incidentList) return;

        if (violations.length === 0) {
            this.elements.incidentList.innerHTML = '<p class="text-gray-400 text-sm">No critical incidents detected</p>';
            return;
        }

        this.elements.incidentList.innerHTML = violations.map(v => {
            const borderColor = {
                LOW: 'border-green-500', MEDIUM: 'border-yellow-500',
                HIGH: 'border-orange-500', CRITICAL: 'border-red-500'
            }[v.severity] || 'border-gray-500';

            const style = PERCEPTA_CONFIG.RISK_STYLES[v.severity] || PERCEPTA_CONFIG.RISK_STYLES.MEDIUM;

            return `
                <div class="glass incident-card p-3 rounded-lg border-l-4 ${borderColor}">
                    <div class="incident-header">
                        <span class="font-semibold text-sm">${v.type}</span>
                        <span class="risk-badge" style="background:${style.bg};color:${style.color};border:1px solid ${style.border}">${v.severity}</span>
                    </div>
                    <p class="text-xs text-gray-400 mt-1 mb-2">${v.description}</p>
                    ${v.regulation ? `<p class="text-xs text-gray-500 mb-1"><i class="fas fa-gavel mr-1"></i>${v.regulation}</p>` : ''}
                    <p class="text-xs text-blue-400"><i class="fas fa-lightbulb mr-1"></i>${v.recommendation}</p>
                </div>
            `;
        }).join('');
    },

    // =======================================================================
    // Full Arabic Report — 5 Structured Sections, Color-coded, RTL
    // =======================================================================
    _renderFullArabicReport(analysis) {
        const container = document.getElementById('full-arabic-report');
        if (!container) {
            console.error('[UI] full-arabic-report container NOT FOUND in DOM');
            return;
        }

        // Ensure container is visible
        container.parentElement.classList.remove('hidden');

        if (!analysis) {
            console.error('[UI] Analysis data missing for report');
            container.innerHTML = '<div class="p-4 text-center text-red-400">No analysis data available</div>';
            return;
        }

        try {
            this._buildArabicReportHTML(analysis, container);
            console.log('[UI] Arabic report rendered successfully');
        } catch (err) {
            console.error('[UI] Arabic report rendering error:', err);
            container.innerHTML = `
                <div style="text-align:center;padding:30px;color:#f59e0b;">
                    <i class="fas fa-exclamation-triangle" style="font-size:2rem;margin-bottom:12px;"></i>
                    <p style="font-size:0.9rem;">حدث خطأ أثناء إنشاء التقرير. يرجى المحاولة مرة أخرى.</p>
                    <p style="font-size:0.75rem;color:#94a3b8;margin-top:8px;">Error: ${err.message}</p>
                </div>`;
        }
    },

    _buildArabicReportHTML(analysis, container) {
        // --- Helpers ---
        const sevColor = (lvl) => ({
            CRITICAL: '#ef4444', HIGH: '#f97316', MEDIUM: '#f59e0b', LOW: '#10b981',
            'حرج': '#ef4444', 'حرجة': '#ef4444', 'مرتفع': '#f97316', 'مرتفعة': '#f97316',
            'عالية': '#ef4444', 'متوسط': '#f59e0b', 'متوسطة': '#f59e0b',
            'منخفض': '#10b981', 'منخفضة': '#10b981'
        }[lvl] || '#94a3b8');

        const sevBg = (lvl) => ({
            CRITICAL: 'rgba(239,68,68,0.1)', HIGH: 'rgba(249,115,22,0.1)',
            MEDIUM: 'rgba(245,158,11,0.1)', LOW: 'rgba(16,185,129,0.1)',
            'عالية': 'rgba(239,68,68,0.1)', 'متوسطة': 'rgba(245,158,11,0.1)',
            'منخفضة': 'rgba(16,185,129,0.1)'
        }[lvl] || 'rgba(148,163,184,0.1)');

        const statusColor = (s) => ({
            'SAFE': '#10b981', 'AT_RISK': '#f59e0b', 'IN_DANGER': '#ef4444',
            'آمن': '#10b981', 'معرض للخطر': '#f59e0b', 'في خطر': '#ef4444'
        }[s] || '#94a3b8');

        const statusIcon = (s) => ({
            'SAFE': 'fa-shield-alt', 'AT_RISK': 'fa-exclamation-triangle', 'IN_DANGER': 'fa-skull-crossbones',
            'آمن': 'fa-shield-alt', 'معرض للخطر': 'fa-exclamation-triangle', 'في خطر': 'fa-skull-crossbones'
        }[s] || 'fa-question-circle');

        const riskColor = sevColor(analysis.risk_level);
        const riskLabel = { LOW: 'منخفض', MEDIUM: 'متوسط', HIGH: 'مرتفع', CRITICAL: 'حرج' }[analysis.risk_level] || 'متوسط';
        const sevAr = (sev) => ({ LOW: 'منخفضة', MEDIUM: 'متوسطة', HIGH: 'مرتفعة', CRITICAL: 'حرجة' }[sev] || sev);
        const hazardTypeAr = (type) => {
            const t = (type || '').toLowerCase();
            if (t.includes('ppe') || t.includes('human') || t.includes('worker') || t.includes('person')) return 'بشري';
            if (t.includes('equip') || t.includes('machine') || t.includes('tool')) return 'معدات';
            if (t.includes('envir') || t.includes('electrical') || t.includes('fall')) return 'بيئي';
            if (t.includes('behavior') || t.includes('practice') || t.includes('procedur')) return 'سلوكي';
            return 'عام';
        };

        let html = '';

        // ═══════════════════════════════════════════════════════════════
        //  ١. مقدمة عامة
        // ═══════════════════════════════════════════════════════════════
        html += `
        <div class="report-section" style="border-right:4px solid ${riskColor}; padding-right:16px;">
            <h3 class="report-section-title" style="font-size:1.2rem;">
                <i class="fas fa-clipboard-list" style="color:${riskColor}"></i>
                <span class="section-number">١</span>
                مقدمة عامة
            </h3>

            <div style="background:${sevBg(analysis.risk_level)}; border:1px solid ${riskColor}33; border-radius:14px; padding:24px; margin-bottom:18px; text-align:center;">
                <div style="font-size:3.2rem; font-weight:900; color:${riskColor}; letter-spacing:-1px;">${analysis.risk_score}<span style="font-size:1.2rem; color:var(--text-secondary);">/100</span></div>
                <div style="font-size:1.1rem; font-weight:700; color:${riskColor}; margin-top:6px;">مستوى الخطورة: ${riskLabel}</div>
                <div style="width:100%; height:8px; background:rgba(148,163,184,0.15); border-radius:99px; margin-top:14px; overflow:hidden;">
                    <div style="height:100%; width:${analysis.risk_score}%; border-radius:99px; background:${riskColor}; transition:width 1.2s ease;"></div>
                </div>
            </div>

            ${analysis.scene_description_ar ? `
            <div style="margin-bottom:16px;">
                <h4 class="report-sub-heading"><i class="fas fa-image" style="color:#3b82f6;"></i> وصف عام لحالة الصورة</h4>
                <p style="line-height:2.1; font-size:0.95rem; color:#e2e8f0; background:rgba(255,255,255,0.03); padding:16px; border-radius:12px; border:1px solid rgba(148,163,184,0.08);">${analysis.scene_description_ar}</p>
            </div>` : ''}

            ${analysis.executive_summary_ar ? `
            <div>
                <h4 class="report-sub-heading"><i class="fas fa-shield-alt" style="color:#10b981;"></i> ملخص سريع عن مستوى الأمان العام</h4>
                <p style="line-height:2.1; font-size:0.95rem; color:#e2e8f0;">${analysis.executive_summary_ar}</p>
            </div>` : ''}

            <div style="display:flex; gap:10px; margin-top:16px; flex-wrap:wrap;">
                <div class="report-stat-chip"><i class="fas fa-hard-hat" style="color:#ef4444"></i><span>${analysis.workers_count || 0} عمال</span></div>
                <div class="report-stat-chip"><i class="fas fa-cog" style="color:#f59e0b"></i><span>${analysis.machinery_count || 0} آلات/أدوات</span></div>
                <div class="report-stat-chip"><i class="fas fa-vest" style="color:#10b981"></i><span>${Math.round(analysis.ppe_compliance_rate || 0)}% التزام</span></div>
                <div class="report-stat-chip"><i class="fas fa-exclamation-triangle" style="color:#ef4444"></i><span>${(analysis.violations || []).length} مخالفات</span></div>
            </div>
        </div>`;

        // ═══════════════════════════════════════════════════════════════
        //  ٢. العناصر المكتشفة
        // ═══════════════════════════════════════════════════════════════
        html += `
        <div class="report-section" style="border-right:4px solid #8b5cf6; padding-right:16px;">
            <h3 class="report-section-title" style="font-size:1.2rem;">
                <i class="fas fa-search-plus" style="color:#8b5cf6"></i>
                <span class="section-number">٢</span>
                العناصر المكتشفة
            </h3>`;

        // 2A ── الأشخاص
        if (analysis.worker_analysis && analysis.worker_analysis.length > 0) {
            html += `
            <div style="margin-bottom:24px;">
                <h4 class="report-sub-heading">
                    <i class="fas fa-users" style="color:#8b5cf6;"></i>
                    جميع الأشخاص الموجودين في الصورة (${analysis.worker_analysis.length})
                </h4>
                <div class="workers-grid">`;

            analysis.worker_analysis.forEach(w => {
                const sc = statusColor(w.safety_status || w.safety_status_ar);
                const si = statusIcon(w.safety_status || w.safety_status_ar);
                const sl = w.safety_status_ar || w.safety_status || '';

                html += `
                <div class="worker-card glass" style="border-top:3px solid ${sc};">
                    <div class="worker-card-header">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <i class="fas fa-user-hard-hat" style="color:${sc};font-size:1.1rem;"></i>
                            <strong style="font-size:0.95rem;">${w.id_ar || w.id}</strong>
                        </div>
                        <span class="worker-status-badge" style="background:${sc}22;color:${sc};border:1px solid ${sc}44;">
                            <i class="fas ${si}"></i> ${sl}
                        </span>
                    </div>
                    ${w.location_ar ? `<p class="text-xs" style="color:#94a3b8;margin:8px 0 4px;"><i class="fas fa-map-marker-alt" style="margin-left:4px;color:#3b82f6;"></i>${w.location_ar}</p>` : ''}
                    ${w.activity_ar ? `<p class="text-xs" style="color:#cbd5e1;margin-bottom:10px;"><i class="fas fa-running" style="margin-left:4px;color:#8b5cf6;"></i>${w.activity_ar}</p>` : ''}
                    ${(w.ppe_items_ar && w.ppe_items_ar.length > 0) ? `
                    <div style="margin-bottom:8px;">
                        <span class="text-xs font-semibold" style="color:#10b981;"><i class="fas fa-check-circle" style="margin-left:4px;"></i>معدات الوقاية:</span>
                        <div class="ppe-tags">${w.ppe_items_ar.map(p => `<span class="ppe-tag ppe-tag-ok">${p}</span>`).join('')}</div>
                    </div>` : ''}
                    ${(w.missing_ppe_ar && w.missing_ppe_ar.length > 0) ? `
                    <div style="margin-bottom:8px;">
                        <span class="text-xs font-semibold" style="color:#ef4444;"><i class="fas fa-times-circle" style="margin-left:4px;"></i>معدات مفقودة:</span>
                        <div class="ppe-tags">${w.missing_ppe_ar.map(p => `<span class="ppe-tag ppe-tag-missing">${p}</span>`).join('')}</div>
                    </div>` : ''}
                    ${(w.risk_factors_ar && w.risk_factors_ar.length > 0) ? `
                    <div>
                        <span class="text-xs font-semibold" style="color:#f59e0b;"><i class="fas fa-exclamation-triangle" style="margin-left:4px;"></i>عوامل الخطر:</span>
                        <ul class="risk-list">${w.risk_factors_ar.map(r => `<li>${r}</li>`).join('')}</ul>
                    </div>` : ''}
                </div>`;
            });

            html += '</div></div>';
        }

        // 2B ── الأدوات والآلات (from gemini_detections)
        const gemDets = analysis.gemini_detections || [];
        const toolMachineDets = gemDets.filter(d => d.category === 'tool' || d.category === 'machine');
        if (toolMachineDets.length > 0) {
            html += `
            <div style="margin-bottom:24px;">
                <h4 class="report-sub-heading">
                    <i class="fas fa-tools" style="color:#f59e0b;"></i>
                    جميع الأدوات والآلات (${toolMachineDets.length})
                </h4>
                <div class="detected-items-grid">`;

            toolMachineDets.forEach(d => {
                const dc = sevColor(d.severity);
                html += `
                <div class="detected-item-card" style="border-right:3px solid ${dc};">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                        <i class="fas ${d.category === 'machine' ? 'fa-cog' : 'fa-wrench'}" style="color:#f59e0b;"></i>
                        <strong style="color:#e2e8f0;font-size:0.88rem;">${d.label_ar || d.label}</strong>
                        ${d.severity && d.severity !== 'NONE' ? `<span class="sev-badge" style="background:${dc}22;color:${dc};">${sevAr(d.severity)}</span>` : ''}
                    </div>
                    ${d.description_ar ? `<p style="color:#94a3b8;font-size:0.8rem;line-height:1.7;">${d.description_ar}</p>` : ''}
                </div>`;
            });

            html += '</div></div>';
        }

        // 2C ── البيئة المحيطة
        const envDets = gemDets.filter(d => d.category === 'hazard' || d.category === 'environmental');
        const envHazards = analysis.environmental_hazards_ar || [];
        if (envDets.length > 0 || envHazards.length > 0) {
            html += `
            <div style="margin-bottom:24px;">
                <h4 class="report-sub-heading">
                    <i class="fas fa-globe-americas" style="color:#a855f7;"></i>
                    البيئة المحيطة
                </h4>
                <ul class="env-hazards-list">`;

            envHazards.forEach(h => {
                html += `<li><i class="fas fa-chevron-left" style="color:#a855f7;margin-left:6px;font-size:0.6rem;"></i>${h}</li>`;
            });
            envDets.forEach(d => {
                html += `<li><i class="fas fa-exclamation-circle" style="color:#f97316;margin-left:6px;font-size:0.6rem;"></i><strong>${d.label_ar || d.label}:</strong> ${d.description_ar || ''}</li>`;
            });

            html += '</ul></div>';
        }

        // 2D ── الملاحظات الإيجابية
        if (analysis.positive_observations_ar && analysis.positive_observations_ar.length > 0) {
            html += `
            <div>
                <h4 class="report-sub-heading">
                    <i class="fas fa-thumbs-up" style="color:#10b981;"></i>
                    الملاحظات الإيجابية
                </h4>
                <ul class="positive-list">
                    ${analysis.positive_observations_ar.map(o => `<li><i class="fas fa-check" style="color:#10b981;margin-left:6px;"></i>${o}</li>`).join('')}
                </ul>
            </div>`;
        }

        html += '</div>';

        // ═══════════════════════════════════════════════════════════════
        //  ٣. تحليل المخاطر
        // ═══════════════════════════════════════════════════════════════
        if (analysis.violations && analysis.violations.length > 0) {
            html += `
            <div class="report-section" style="border-right:4px solid #ef4444; padding-right:16px;">
                <h3 class="report-section-title" style="font-size:1.2rem;">
                    <i class="fas fa-exclamation-circle" style="color:#ef4444"></i>
                    <span class="section-number">٣</span>
                    تحليل المخاطر (${analysis.violations.length} مخاطر مكتشفة)
                </h3>`;

            analysis.violations.forEach((v, idx) => {
                const vc = sevColor(v.severity);
                const vb = sevBg(v.severity);
                const typeAr = hazardTypeAr(v.type);

                html += `
                <div class="violation-card" style="background:${vb};border-right:4px solid ${vc};padding:18px;border-radius:14px;margin-bottom:14px;">
                    <!-- Header -->
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
                        <span style="color:${vc};font-weight:800;font-size:1rem;">
                            <i class="fas fa-hashtag" style="margin-left:4px;font-size:0.75rem;"></i>خطر ${idx + 1}: ${v.type}
                        </span>
                        <span class="sev-badge" style="background:${vc}22;color:${vc};font-size:0.78rem;padding:4px 14px;">
                            ${sevAr(v.severity)}
                        </span>
                    </div>

                    <!-- Meta: type + severity -->
                    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
                        <span class="hazard-type-badge"><i class="fas fa-tag" style="margin-left:4px;"></i>نوع الخطر: ${typeAr}</span>
                        <span class="hazard-type-badge" style="background:${vc}15;color:${vc};border-color:${vc}30;">مستوى الخطورة: ${sevAr(v.severity)}</span>
                    </div>

                    <!-- Detailed reason -->
                    <div style="margin-bottom:14px;">
                        <p class="violation-label"><i class="fas fa-info-circle"></i> السبب التفصيلي لاعتباره خطراً:</p>
                        <p style="color:#e2e8f0;font-size:0.9rem;line-height:2;">${v.description_ar || v.description}</p>
                    </div>

                    <!-- Consequences -->
                    ${v.consequences_ar ? `
                    <div style="margin-bottom:14px;background:rgba(239,68,68,0.06);padding:12px;border-radius:10px;border:1px solid rgba(239,68,68,0.12);">
                        <p class="violation-label" style="color:#fca5a5;"><i class="fas fa-skull-crossbones"></i> العواقب المحتملة:</p>
                        <p style="color:#fca5a5;font-size:0.88rem;line-height:1.9;">${v.consequences_ar}</p>
                    </div>` : ''}

                    <!-- Affected parties -->
                    <div style="margin-bottom:10px;">
                        <p class="violation-label" style="color:#a78bfa;"><i class="fas fa-users"></i> المتأثرون بهذا الخطر:</p>
                        <p style="color:#cbd5e1;font-size:0.85rem;line-height:1.8;">جميع العمال القريبين من مصدر الخطر${analysis.worker_analysis && analysis.worker_analysis.length > 0 ? ` (${analysis.worker_analysis.length} أشخاص في الموقع)` : ''}</p>
                    </div>

                    <!-- Regulation -->
                    ${v.regulation ? `
                    <div style="padding-top:8px;border-top:1px solid rgba(148,163,184,0.1);">
                        <p style="color:#818cf8;font-size:0.78rem;">
                            <i class="fas fa-gavel" style="margin-left:4px;"></i>المعيار المرجعي: ${v.regulation}
                        </p>
                    </div>` : ''}
                </div>`;
            });

            html += '</div>';
        }

        // ═══════════════════════════════════════════════════════════════
        //  ٤. الحلول والتوصيات
        // ═══════════════════════════════════════════════════════════════
        const hasActions = analysis.immediate_actions_ar && analysis.immediate_actions_ar.length > 0;
        const hasRecs = analysis.safety_recommendations_ar && analysis.safety_recommendations_ar.length > 0;
        const hasViolationRecs = analysis.violations && analysis.violations.some(v => v.recommendation_ar || v.recommendation);

        if (hasActions || hasRecs || hasViolationRecs) {
            html += `
            <div class="report-section" style="border-right:4px solid #3b82f6; padding-right:16px;">
                <h3 class="report-section-title" style="font-size:1.2rem;">
                    <i class="fas fa-clipboard-check" style="color:#3b82f6"></i>
                    <span class="section-number">٤</span>
                    الحلول والتوصيات
                </h3>`;

            // 4A ── الإجراءات الفورية
            if (hasActions) {
                html += `
                <div style="margin-bottom:24px;background:rgba(239,68,68,0.05);border-radius:14px;padding:18px;border:1px solid rgba(239,68,68,0.15);">
                    <h4 class="report-sub-heading" style="color:#fca5a5;">
                        <i class="fas fa-bolt" style="color:#ef4444;"></i>
                        الإجراءات الوقائية الفورية المطلوبة
                    </h4>
                    <ol class="immediate-actions-list">
                        ${analysis.immediate_actions_ar.map(a => `<li>${a}</li>`).join('')}
                    </ol>
                </div>`;
            }

            // 4B ── معدات السلامة والإجراءات التصحيحية لكل مخالفة
            if (hasViolationRecs) {
                html += `
                <div style="margin-bottom:24px;">
                    <h4 class="report-sub-heading">
                        <i class="fas fa-hard-hat" style="color:#f59e0b;"></i>
                        معدات السلامة المطلوبة والإجراءات التصحيحية
                    </h4>`;

                analysis.violations.forEach(v => {
                    if (!v.recommendation_ar && !v.recommendation) return;
                    html += `
                    <div class="rec-card">
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                            <i class="fas fa-wrench" style="color:#f59e0b;font-size:0.8rem;"></i>
                            <span style="color:#f59e0b;font-size:0.82rem;font-weight:600;">بخصوص: ${v.type}</span>
                        </div>
                        <p style="color:#10b981;font-size:0.88rem;line-height:1.9;">
                            <i class="fas fa-lightbulb" style="margin-left:4px;"></i>${v.recommendation_ar || v.recommendation}
                        </p>
                    </div>`;
                });

                html += '</div>';
            }

            // 4C ── التوصيات طويلة المدى والتنظيمية
            if (hasRecs) {
                html += `
                <div>
                    <h4 class="report-sub-heading">
                        <i class="fas fa-chess" style="color:#3b82f6;"></i>
                        تحسينات بيئية وتنظيمية وتوصيات طويلة المدى
                    </h4>`;

                analysis.safety_recommendations_ar.forEach(rec => {
                    const pc = sevColor(rec.priority);
                    html += `
                    <div class="rec-card">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
                            <strong style="color:#e2e8f0;font-size:0.9rem;">${rec.title_ar}</strong>
                            <span class="sev-badge" style="background:${pc}22;color:${pc};font-size:0.7rem;">أولوية ${rec.priority}</span>
                        </div>
                        <p style="color:#cbd5e1;font-size:0.88rem;line-height:1.9;">${rec.details_ar}</p>
                    </div>`;
                });

                html += '</div>';
            }

            html += '</div>';
        }

        // ═══════════════════════════════════════════════════════════════
        //  ٥. تقييم عام نهائي
        // ═══════════════════════════════════════════════════════════════
        const safetyPercent = Math.max(0, 100 - (analysis.risk_score || 0));
        const safetyColor = safetyPercent >= 70 ? '#10b981' : safetyPercent >= 40 ? '#f59e0b' : '#ef4444';

        html += `
        <div class="report-section" style="border-right:4px solid #6366f1; padding-right:16px;">
            <h3 class="report-section-title" style="font-size:1.2rem;">
                <i class="fas fa-file-medical-alt" style="color:#6366f1"></i>
                <span class="section-number">٥</span>
                تقييم عام نهائي
            </h3>

            <!-- Safety percentage gauge -->
            <div style="text-align:center;margin-bottom:24px;background:rgba(99,102,241,0.05);border-radius:14px;padding:24px;border:1px solid rgba(99,102,241,0.15);">
                <p style="color:#94a3b8;font-size:0.82rem;margin-bottom:8px;">نسبة تقديرية لمستوى الأمان</p>
                <div style="font-size:3rem;font-weight:900;color:${safetyColor};letter-spacing:-1px;">${safetyPercent}%</div>
                <div style="width:100%;height:10px;background:rgba(148,163,184,0.15);border-radius:99px;margin-top:12px;overflow:hidden;">
                    <div style="height:100%;width:${safetyPercent}%;border-radius:99px;background:${safetyColor};transition:width 1.2s ease;"></div>
                </div>
                <p style="color:#94a3b8;font-size:0.72rem;margin-top:8px;">نسبة الالتزام بمعدات الوقاية: ${Math.round(analysis.ppe_compliance_rate || 0)}%</p>
            </div>

            <!-- Overall assessment text -->
            ${analysis.overall_assessment_ar ? `
            <div style="margin-bottom:20px;">
                <h4 class="report-sub-heading"><i class="fas fa-file-alt" style="color:#6366f1;"></i> تقييم شامل لحالة السلامة</h4>
                <p style="line-height:2.2;font-size:0.95rem;color:#e2e8f0;background:rgba(99,102,241,0.05);padding:18px;border-radius:12px;border:1px solid rgba(99,102,241,0.1);">${analysis.overall_assessment_ar}</p>
            </div>` : ''}

            <!-- Closing recommendation -->
            <div style="background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.08));border-radius:14px;padding:20px;border:1px solid rgba(99,102,241,0.15);margin-bottom:16px;">
                <h4 style="color:#a78bfa;font-size:0.88rem;font-weight:700;margin-bottom:10px;">
                    <i class="fas fa-comment-dots" style="margin-left:4px;"></i>
                    التوصية الختامية
                </h4>
                <p style="color:#e2e8f0;font-size:0.9rem;line-height:2;">
                    ${analysis.risk_score >= 70
                ? 'يجب إيقاف العمل فوراً ومعالجة جميع المخالفات الحرجة قبل استئناف أي نشاط. السلامة هي الأولوية القصوى.'
                : analysis.risk_score >= 40
                    ? 'يجب معالجة المخالفات المكتشفة في أقرب وقت ممكن مع تعزيز إجراءات السلامة الحالية. المتابعة الدورية مطلوبة.'
                    : 'مستوى السلامة مقبول بشكل عام. يُنصح بالاستمرار في المراقبة الدورية وتحسين الإجراءات الوقائية بشكل مستمر.'}
                </p>
            </div>

            <!-- Report footer -->
            <div style="text-align:center;padding:16px;border-top:1px solid rgba(148,163,184,0.1);">
                <p style="color:#64748b;font-size:0.72rem;">
                    <i class="fas fa-robot" style="margin-left:4px;"></i>
                    تم إعداد هذا التقرير تلقائياً بواسطة نظام Percepta AI للسلامة الصناعية
                </p>
                <p style="color:#6366f1;font-size:0.68rem;margin-top:4px;">
                    ${new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>`;

        container.innerHTML = html;
    },

    // -----------------------------------------------------------------------
    // Mobile panel toggle
    // -----------------------------------------------------------------------
    _showMobileResults() {
        if (this.elements.resultsPanel && window.innerWidth < 1024) {
            this.elements.resultsPanel.classList.add('mobile-visible');
        }
    },

    toggleMobileResults() {
        if (this.elements.resultsPanel) {
            this.elements.resultsPanel.classList.toggle('mobile-visible');
        }
    },

    // -----------------------------------------------------------------------
    // Toast Notifications
    // -----------------------------------------------------------------------
    showToast(message, type = 'success') {
        if (!this.elements.toast) return;
        this.elements.toast.textContent = message;
        this.elements.toast.className = `toast toast-${type} show`;
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => {
            this.elements.toast.classList.remove('show');
        }, 4000);
    },

    // -----------------------------------------------------------------------
    // Download / Export
    // -----------------------------------------------------------------------
    downloadImage(canvas) {
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `percepta-analysis-${Date.now()}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
    },

    exportPDF(analysis) {
        if (!analysis) return;

        const riskColor = analysis.risk_score > 70 ? '#ef4444' : analysis.risk_score > 30 ? '#f59e0b' : '#10b981';

        const el = document.createElement('div');
        el.style.cssText = 'padding:40px;font-family:Inter,sans-serif;color:#000;';
        el.innerHTML = `
            <h1 style="color:#3b82f6;margin-bottom:20px;">Percepta AI — Safety Report</h1>
            <p style="color:#666;margin-bottom:30px;">${new Date().toLocaleString()}</p>

            <div style="background:#f3f4f6;padding:20px;border-radius:8px;margin-bottom:30px;">
                <h2 style="color:#1f2937;margin-bottom:10px;">Risk Assessment</h2>
                <p style="font-size:24px;font-weight:bold;color:${riskColor}">
                    ${analysis.risk_score}/100 — ${analysis.risk_level}
                </p>
            </div>

            <div style="margin-bottom:30px;">
                <h2 style="color:#1f2937;margin-bottom:10px;">Executive Summary</h2>
                <p style="color:#4b5563;">${analysis.executive_summary}</p>
                ${analysis.executive_summary_ar ? `<p style="color:#4b5563;direction:rtl;margin-top:8px;">${analysis.executive_summary_ar}</p>` : ''}
            </div>

            <div style="margin-bottom:30px;">
                <h2 style="color:#1f2937;margin-bottom:10px;">Detailed Analysis</h2>
                <div style="color:#4b5563;">${marked.parse(analysis.detailed_report || '')}</div>
            </div>

            ${analysis.detailed_report_ar ? `
            <div style="margin-bottom:30px;direction:rtl;">
                <h2 style="color:#1f2937;margin-bottom:10px;">التقرير التفصيلي</h2>
                <div style="color:#4b5563;">${marked.parse(analysis.detailed_report_ar)}</div>
            </div>` : ''}

            <div>
                <h2 style="color:#1f2937;margin-bottom:10px;">Violations (${analysis.violations.length})</h2>
                ${analysis.violations.map(v => `
                    <div style="border-left:4px solid ${v.severity === 'CRITICAL' ? '#ef4444' : v.severity === 'HIGH' ? '#f59e0b' : '#10b981'};padding-left:15px;margin-bottom:15px;">
                        <h3 style="color:#1f2937;font-size:16px;margin-bottom:5px;">${v.type} <small style="color:#999">[${v.severity}]</small></h3>
                        <p style="color:#6b7280;font-size:14px;margin-bottom:5px;">${v.description}</p>
                        ${v.regulation ? `<p style="color:#9ca3af;font-size:12px;margin-bottom:4px;">📋 ${v.regulation}</p>` : ''}
                        <p style="color:#3b82f6;font-size:13px;"><strong>Action:</strong> ${v.recommendation}</p>
                    </div>
                `).join('')}
            </div>

            ${analysis.immediate_actions && analysis.immediate_actions.length > 0 ? `
            <div style="margin-top:30px;background:#fef3c7;padding:20px;border-radius:8px;">
                <h2 style="color:#92400e;margin-bottom:10px;">⚠ Immediate Actions Required</h2>
                <ul style="color:#78350f;padding-left:20px;">
                    ${analysis.immediate_actions.map(a => `<li style="margin-bottom:6px;">${a}</li>`).join('')}
                </ul>
            </div>` : ''}
        `;

        html2pdf()
            .from(el)
            .set({
                margin: 0.75,
                filename: `percepta-report-${Date.now()}.pdf`,
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            })
            .save();
    },

    // -----------------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------------
    _show(el) { if (el) el.classList.remove('hidden'); },
    _hide(el) { if (el) el.classList.add('hidden'); },
};
