import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Eye, Brain, Shield, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
export default function Home() {
    const [language, setLanguage] = useState("en");
    const [activeIndex, setActiveIndex] = useState(0);
    const valueBlocks = [
        {
            icon: Eye,
            title: "Perceive",
            description: "Detect hazardous proximity between workers and industrial equipment using advanced computer vision",
            color: "text-primary",
        },
        {
            icon: Brain,
            title: "Understand",
            description: "Reason about risk and context, not just objects. Our AI understands dangerous situations before they escalate",
            color: "text-secondary",
        },
        {
            icon: Shield,
            title: "Prevent",
            description: "Recommend immediate corrective actions in real-time to prevent accidents and protect workers",
            color: "text-accent",
        },
    ];
    const steps = [
        {
            number: "01",
            title: "Analyze Industrial Environments",
            description: "Our system continuously monitors factory floors, warehouses, and production areas",
        },
        {
            number: "02",
            title: "Understand Risk Context",
            description: "AI processes spatial relationships and identifies potential hazards with explainable reasoning",
        },
        {
            number: "03",
            title: "Alert and Recommend Actions",
            description: "Provide actionable guidance to supervisors and workers to prevent near-miss situations",
        },
    ];
    const qaItems = [
        {
            id: "what-is-percepta",
            questionEn: "What is Percepta?",
            answerEn: "Percepta is an AI-based industrial safety system designed to prevent workplace accidents before they occur. It analyzes visual data from existing surveillance cameras to identify unsafe interactions inside industrial environments.",
            questionAr: "ما هي Percepta؟",
            answerAr: "‏Percepta هي نظام أمان صناعي قائم على الذكاء الاصطناعي، مصمم لمنع حوادث العمل قبل وقوعها. يقوم بتحليل البيانات البصرية من كاميرات المراقبة الموجودة مسبقًا لاكتشاف التفاعلات غير الآمنة داخل البيئات الصناعية.",
        },
        {
            id: "problem-solved",
            questionEn: "What problem does Percepta solve?",
            answerEn: "Most safety systems are reactive and focus on reporting violations after incidents happen. Percepta shifts safety from documentation to prevention by detecting high-risk situations early.",
            questionAr: "ما المشكلة التي تحلها Percepta؟",
            answerAr: "معظم أنظمة السلامة تقليدية وتفاعلية، وتركّز على توثيق المخالفات بعد وقوع الحوادث. تنقل Percepta مفهوم السلامة من التوثيق إلى الوقاية من خلال اكتشاف المواقف عالية الخطورة مبكرًا.",
        },
        {
            id: "who-for",
            questionEn: "Who is Percepta built for?",
            answerEn: "Percepta is designed for medium-sized industrial facilities, including manufacturing plants, warehouses, and logistics centers where human-machine interaction creates operational risk.",
            questionAr: "لمن تم تصميم Percepta؟",
            answerAr: "تم تصميم Percepta للمنشآت الصناعية متوسطة الحجم، بما في ذلك المصانع والمستودعات ومراكز الخدمات اللوجستية، حيث يشكل التفاعل بين الإنسان والآلة مخاطر تشغيلية.",
        },
        {
            id: "how-it-works",
            questionEn: "How does Percepta work?",
            answerEn: "Percepta uses artificial intelligence to analyze relationships between workers, equipment, and restricted zones. When unsafe proximity or risky behavior is detected, the system generates structured alerts.",
            questionAr: "كيف تعمل Percepta؟",
            answerAr: "تستخدم Percepta الذكاء الاصطناعي لتحليل العلاقات بين العمال والمعدات والمناطق المحظورة. عند اكتشاف اقتراب غير آمن أو سلوك محفوف بالمخاطر، يقوم النظام بإصدار تنبيهات منظمة.",
        },
        {
            id: "hardware",
            questionEn: "Does Percepta require new hardware?",
            answerEn: "No. Percepta is designed to operate using existing surveillance camera infrastructure, reducing additional capital costs and simplifying integration.",
            questionAr: "هل تتطلب Percepta أجهزة جديدة؟",
            answerAr: "لا. تم تصميم Percepta للعمل باستخدام البنية التحتية الحالية لكاميرات المراقبة، مما يقلل التكاليف الرأسمالية الإضافية ويسهّل عملية الدمج.",
        },
        {
            id: "vs-cctv",
            questionEn: "How is Percepta different from traditional CCTV?",
            answerEn: "Traditional CCTV records footage for later review. Percepta actively analyzes video feeds in order to detect risk patterns before incidents occur.",
            questionAr: "ما الفرق بين Percepta وأنظمة CCTV التقليدية؟",
            answerAr: "أنظمة CCTV التقليدية تقوم بتسجيل اللقطات للمراجعة لاحقًا. أما Percepta فتقوم بتحليل البث المرئي بشكل نشط لاكتشاف أنماط المخاطر قبل وقوع الحوادث.",
        },
        {
            id: "vs-basic-cv",
            questionEn: "How is Percepta different from basic computer vision systems?",
            answerEn: "Basic systems often detect objects or PPE compliance only. Percepta evaluates contextual relationships between people, machines, and operational zones to identify behavioral risk scenarios.",
            questionAr: "ما الفرق بين Percepta وأنظمة الرؤية الحاسوبية الأساسية؟",
            answerAr: "الأنظمة الأساسية غالبًا ما تكتفي باكتشاف الأجسام أو التحقق من الالتزام بمعدات الحماية الشخصية فقط. أما Percepta فتقيّم العلاقات السياقية بين الأشخاص والآلات والمناطق التشغيلية لاكتشاف سيناريوهات المخاطر السلوكية.",
        },
        {
            id: "safety-managers",
            questionEn: "Does Percepta replace safety managers?",
            answerEn: "No. Percepta functions as a decision-support tool. It assists supervisors by providing alerts and structured insights while keeping human oversight central.",
            questionAr: "هل تستبدل Percepta مسؤولي السلامة؟",
            answerAr: "لا. تعمل Percepta كأداة دعم لاتخاذ القرار، حيث تساعد المشرفين من خلال تقديم تنبيهات ورؤى منظمة مع الحفاظ على الدور المركزي للرقابة البشرية.",
        },
        {
            id: "stage",
            questionEn: "What stage is Percepta currently in?",
            answerEn: "Percepta is currently in the prototype stage. The system operates on controlled static image testing while progressing toward real-time implementation.",
            questionAr: "في أي مرحلة توجد Percepta حاليًا؟",
            answerAr: "Percepta حاليًا في مرحلة النموذج الأولي. يعمل النظام على اختبار صور ثابتة في بيئة مُحكمة، مع التقدم نحو التطبيق في الوقت الفعلي.",
        },
        {
            id: "commercial",
            questionEn: "Is Percepta commercially deployed?",
            answerEn: "Not yet. The focus remains on technical validation and controlled testing before structured market entry.",
            questionAr: "هل تم نشر Percepta تجاريًا؟",
            answerAr: "ليس بعد. يظل التركيز حاليًا على التحقق التقني والاختبارات المُحكمة قبل الدخول المنظم إلى السوق.",
        },
        {
            id: "business-value",
            questionEn: "What value does Percepta provide to businesses?",
            answerEn: "Percepta helps reduce injuries, prevent downtime, and strengthen operational continuity. It transforms passive surveillance into proactive safety intelligence.",
            questionAr: "ما القيمة التي تقدمها Percepta للشركات؟",
            answerAr: "تساعد Percepta في تقليل الإصابات، ومنع التوقف التشغيلي، وتعزيز استمرارية العمليات. فهي تحوّل المراقبة السلبية إلى ذكاء سلامة استباقي.",
        },
        {
            id: "social-impact",
            questionEn: "How does Percepta create social impact?",
            answerEn: "Workplace accidents affect workers, families, and communities. By preventing incidents, Percepta contributes to workforce stability and human protection.",
            questionAr: "كيف تساهم Percepta في تحقيق أثر اجتماعي؟",
            answerAr: "تؤثر حوادث العمل على العمال وعائلاتهم والمجتمع ككل. من خلال منع الحوادث، تساهم Percepta في استقرار القوى العاملة وحماية الإنسان.",
        },
        {
            id: "focus-region",
            questionEn: "Where is Percepta currently focused?",
            answerEn: "Percepta initially focuses on industrial facilities in Egypt, with future expansion dependent on validation and scalability readiness.",
            questionAr: "أين يتركز عمل Percepta حاليًا؟",
            answerAr: "تركز Percepta في مرحلتها الأولى على المنشآت الصناعية في مصر، مع إمكانية التوسع مستقبلًا بناءً على التحقق من الجاهزية وقابلية التوسع.",
        },
        {
            id: "vision",
            questionEn: "What is Percepta’s long-term vision?",
            answerEn: "Percepta aims to improve industrial safety standards through proactive risk intelligence, guided by the principle that human life cannot be replaced.",
            questionAr: "ما الرؤية طويلة المدى لـ Percepta؟",
            answerAr: "تهدف Percepta إلى تحسين معايير السلامة الصناعية من خلال ذكاء استباقي لإدارة المخاطر، انطلاقًا من مبدأ أن حياة الإنسان لا يمكن تعويضها.",
        },
    ];
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navigation, {}), _jsxs("main", { className: "flex-1 pt-16", children: [_jsx("section", { className: "relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 py-20 md:py-32", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight", children: "Cognitive AI that prevents industrial accidents" }), _jsx("p", { className: "text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed", children: "We build an AI intelligence layer that detects hazardous proximity between workers and industrial equipment and recommends preventive actions in real time." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Link, { to: "/pilot", children: _jsxs(Button, { size: "lg", className: "w-full sm:w-auto", children: ["Request a Pilot", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] }) }), _jsxs(Button, { size: "lg", variant: "outline", className: "w-full sm:w-auto", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Download One-Pager"] })] })] }), _jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, delay: 0.2 }, className: "relative", children: _jsxs("div", { className: "relative aspect-square bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border border-border", children: [_jsx("div", { className: "absolute inset-0 bg-grid-pattern opacity-10" }), _jsx("div", { className: "relative h-full flex items-center justify-center", children: _jsx("div", { className: "w-full max-w-sm", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" }), _jsxs("div", { className: "relative bg-card border-2 border-primary/40 rounded-2xl p-6 shadow-xl", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "h-3 w-3 rounded-full bg-destructive animate-pulse" }), _jsx("span", { className: "text-sm font-semibold text-foreground", children: "Hazard Detected" })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Worker approaching active forklift zone" }), _jsx("div", { className: "bg-accent/10 border border-accent/30 rounded-lg p-3", children: _jsx("p", { className: "text-xs font-medium text-accent-foreground", children: "Recommended Action: Immediate zone clearance" }) })] })] }) }) })] }) })] }) }) }), _jsx("section", { className: "py-20 bg-background", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-4", children: "How Percepta Works" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Three-step intelligent safety system" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: valueBlocks.map((block, index) => {
                                        const Icon = block.icon;
                                        return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: index * 0.1 }, children: _jsx(Card, { className: "h-full hover:shadow-lg transition-shadow border-border", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: `${block.color} mb-6 inline-flex p-3 rounded-xl bg-primary/5`, children: _jsx(Icon, { size: 32 }) }), _jsx("h3", { className: "text-xl font-semibold text-foreground mb-3", children: block.title }), _jsx("p", { className: "text-muted-foreground leading-relaxed", children: block.description })] }) }) }, block.title));
                                    }) })] }) }), _jsx("section", { className: "py-16 bg-background", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold text-foreground mb-4", children: "Trusted Foundations" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Built with privacy-by-design and safety-first principles. Designed for industrial reliability." }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsx("div", { className: "h-10 bg-muted rounded-md" }), _jsx("div", { className: "h-10 bg-muted rounded-md" }), _jsx("div", { className: "h-10 bg-muted rounded-md" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { className: "text-center p-4 border border-border rounded-lg", children: [_jsxs("div", { className: "text-3xl font-bold text-primary", children: [_jsx("span", { "aria-hidden": true, children: "\u2193" }), " Near-Miss"] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Reduce near-misses with proactive alerts" })] }), _jsxs("div", { className: "text-center p-4 border border-border rounded-lg", children: [_jsx("div", { className: "text-3xl font-bold text-secondary", children: "ms" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Low-latency guidance for real-time response" })] }), _jsxs("div", { className: "text-center p-4 border border-border rounded-lg", children: [_jsx("div", { className: "text-3xl font-bold text-accent", children: "24/7" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Continuous monitoring readiness" })] }), _jsxs("div", { className: "text-center p-4 border border-border rounded-lg", children: [_jsx("div", { className: "text-3xl font-bold", children: "Edge" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Edge-ready architecture options" })] })] })] }), _jsx("div", { className: "mt-8 text-sm text-muted-foreground", children: _jsx("span", { children: "Privacy & Safety" }) })] }) }), _jsx("section", { className: "py-20 bg-muted/30", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-4", children: "Simple, Effective Process" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "From detection to prevention in milliseconds" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 md:gap-12", children: steps.map((step, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: index * 0.1 }, className: "relative", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold", children: step.number }) }), _jsxs("div", { className: "pt-2", children: [_jsx("h3", { className: "text-xl font-semibold text-foreground mb-3", children: step.title }), _jsx("p", { className: "text-muted-foreground leading-relaxed", children: step.description })] })] }), index < steps.length - 1 && (_jsx("div", { className: "hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" }))] }, step.number))) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.4 }, className: "text-center mt-12", children: _jsx(Link, { to: "/how-it-works", children: _jsxs(Button, { variant: "outline", size: "lg", children: ["Learn More About Our Technology", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] }) }) })] }) }), _jsx("section", { className: "py-20 bg-background", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-3", children: "Company Q&A Assistant" }), _jsx("p", { className: "text-muted-foreground max-w-2xl", children: "Official answers about Percepta for investors and industrial decision-makers. All responses are manually authored and kept consistent with our company narrative." })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Language" }), _jsxs("div", { className: "inline-flex rounded-full border border-border p-1 bg-muted", children: [_jsx("button", { type: "button", onClick: () => setLanguage("en"), className: `px-3 py-1 text-sm rounded-full transition-colors ${language === "en" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`, children: "EN" }), _jsx("button", { type: "button", onClick: () => setLanguage("ar"), className: `px-3 py-1 text-sm rounded-full transition-colors ${language === "ar" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`, children: "AR" })] })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [_jsx(motion.div, { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, dir: language === "ar" ? "rtl" : "ltr", className: `space-y-3 ${language === "ar" ? "font-arabic" : ""}`, children: qaItems.map((item, index) => {
                                                const isActive = index === activeIndex;
                                                const question = language === "en" ? item.questionEn : item.questionAr;
                                                return (_jsx("button", { type: "button", onClick: () => setActiveIndex(index), className: `w-full text-left border rounded-lg px-4 py-3 text-sm md:text-base transition-colors ${isActive
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-card text-foreground border-border hover:bg-muted"} ${language === "ar" ? "text-right" : ""}`, children: question }, item.id));
                                            }) }), _jsx(motion.div, { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.1 }, children: _jsx(Card, { className: "h-full border-border", children: _jsxs(CardContent, { className: "p-6 md:p-8", children: [_jsxs("div", { dir: language === "ar" ? "rtl" : "ltr", className: language === "ar"
                                                                ? "text-right font-arabic leading-relaxed md:leading-loose"
                                                                : "leading-relaxed", children: [_jsx("h3", { className: "text-xl font-semibold text-foreground mb-4", children: language === "en"
                                                                        ? qaItems[activeIndex].questionEn
                                                                        : qaItems[activeIndex].questionAr }), _jsx("p", { className: "text-muted-foreground text-sm md:text-base", children: language === "en"
                                                                        ? qaItems[activeIndex].answerEn
                                                                        : qaItems[activeIndex].answerAr })] }), _jsx("p", { className: "mt-6 text-xs text-muted-foreground", children: "These answers are curated and non-generative to ensure consistency with Percepta's official positioning." })] }) }) })] })] }) }), _jsx("section", { className: "py-20 bg-primary text-primary-foreground", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Ready to make your facility safer?" }), _jsx("p", { className: "text-lg mb-8 opacity-90", children: "Join our pilot program and validate Percepta's effectiveness in your industrial environment" }), _jsx(Link, { to: "/pilot", children: _jsxs(Button, { size: "lg", variant: "secondary", className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90", children: ["Request a Pilot Program", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] }) })] }) }) })] }), _jsx(Footer, {})] }));
}
