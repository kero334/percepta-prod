import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Camera, Cpu, AlertCircle, CheckCircle, Cloud, HardDrive, FileText, ArrowRight, } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
export default function HowItWorks() {
    const pipeline = [
        {
            icon: Camera,
            title: "Camera Input",
            description: "High-resolution video feeds from facility cameras",
            color: "text-primary",
        },
        {
            icon: Cpu,
            title: "AI Perception",
            description: "Computer vision identifies people and equipment",
            color: "text-secondary",
        },
        {
            icon: AlertCircle,
            title: "Proximity Analysis",
            description: "Calculate spatial relationships and distances",
            color: "text-accent",
        },
        {
            icon: Cpu,
            title: "Risk Reasoning",
            description: "Contextual AI assesses danger and urgency",
            color: "text-primary",
        },
        {
            icon: AlertCircle,
            title: "Alert & Recommendation",
            description: "Generate specific, actionable guidance",
            color: "text-destructive",
        },
        {
            icon: CheckCircle,
            title: "Human Confirmation",
            description: "Supervisor reviews and responds to alerts",
            color: "text-secondary",
        },
    ];
    const deploymentOptions = [
        {
            icon: Cloud,
            title: "Cloud Processing",
            description: "Centralized processing with high computational resources for complex analysis",
            benefits: [
                "Scalable compute power",
                "Centralized model updates",
                "Multi-site coordination",
            ],
        },
        {
            icon: HardDrive,
            title: "Edge Processing",
            description: "On-premises processing for low-latency responses and enhanced data security",
            benefits: [
                "Sub-second response times",
                "Enhanced privacy",
                "Reduced bandwidth needs",
            ],
        },
    ];
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navigation, {}), _jsxs("main", { className: "flex-1 pt-16", children: [_jsx("section", { className: "py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-center", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-6", children: "How It Works" }), _jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: "From camera input to actionable safety recommendations in milliseconds" })] }) }) }), _jsx("section", { className: "py-20 bg-background", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-4", children: "Processing Pipeline" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Six-stage intelligent safety system" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: pipeline.map((stage, index) => {
                                        const Icon = stage.icon;
                                        return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: index * 0.1 }, children: _jsx(Card, { className: "h-full hover:shadow-lg transition-all border-border hover:border-primary/50 relative", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "absolute -top-3 -left-3 w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center text-sm font-bold text-foreground", children: index + 1 }), _jsx("div", { className: `${stage.color} mb-4 inline-flex p-3 rounded-xl bg-primary/5`, children: _jsx(Icon, { size: 28 }) }), _jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: stage.title }), _jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: stage.description })] }) }) }, stage.title));
                                    }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.6 }, className: "mt-16 max-w-4xl mx-auto", children: _jsx(Card, { className: "bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-border", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("h3", { className: "text-2xl font-semibold text-foreground mb-4 text-center", children: "End-to-End Process Flow" }), _jsxs("div", { className: "flex items-center justify-center flex-wrap gap-3 text-sm text-muted-foreground", children: [_jsx("span", { className: "font-medium", children: "Camera" }), _jsx(ArrowRight, { size: 16, className: "text-primary" }), _jsx("span", { className: "font-medium", children: "AI Perception" }), _jsx(ArrowRight, { size: 16, className: "text-primary" }), _jsx("span", { className: "font-medium", children: "Proximity Analysis" }), _jsx(ArrowRight, { size: 16, className: "text-primary" }), _jsx("span", { className: "font-medium", children: "Risk Reasoning" }), _jsx(ArrowRight, { size: 16, className: "text-primary" }), _jsx("span", { className: "font-medium", children: "Alert" }), _jsx(ArrowRight, { size: 16, className: "text-primary" }), _jsx("span", { className: "font-medium", children: "Human Confirmation" })] })] }) }) })] }) }), _jsx("section", { className: "py-20 bg-muted/30", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-4", children: "Deployment Options" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Flexible architecture for your security and performance needs" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: deploymentOptions.map((option, index) => {
                                        const Icon = option.icon;
                                        return (_jsx(motion.div, { initial: { opacity: 0, x: index === 0 ? -20 : 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: _jsx(Card, { className: "h-full border-border hover:shadow-lg transition-shadow", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "text-primary mb-4 inline-flex p-4 rounded-xl bg-primary/5", children: _jsx(Icon, { size: 32 }) }), _jsx("h3", { className: "text-2xl font-semibold text-foreground mb-4", children: option.title }), _jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: option.description }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm font-semibold text-foreground uppercase tracking-wider", children: "Key Benefits" }), option.benefits.map((benefit) => (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(CheckCircle, { size: 18, className: "text-secondary mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-sm text-muted-foreground", children: benefit })] }, benefit)))] })] }) }) }, option.title));
                                    }) })] }) }), _jsx("section", { className: "py-20 bg-background", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-8 text-center", children: "Why Explainability Matters" }), _jsx(Card, { className: "border-border mb-8", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("p", { className: "text-lg text-foreground leading-relaxed mb-6", children: "Unlike black-box AI systems, Percepta provides clear reasoning for every alert. Supervisors understand not just what the system detected, but why it's dangerous and what action to take." }), _jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-muted/50 rounded-lg p-4", children: [_jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Traditional Alert" }), _jsx("p", { className: "text-sm text-muted-foreground italic", children: "\"Proximity warning: Zone B\"" })] }), _jsxs("div", { className: "bg-secondary/10 border border-secondary/30 rounded-lg p-4", children: [_jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "Percepta Alert" }), _jsx("p", { className: "text-sm text-foreground", children: "\"Worker approaching active forklift path. Recommend immediate zone clearance.\"" })] })] })] }) }), _jsx(Card, { className: "border-border", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("h3", { className: "text-2xl font-semibold text-foreground mb-6 text-center", children: "Why Humans Remain in Control" }), _jsx("p", { className: "text-muted-foreground leading-relaxed mb-6", children: "Percepta is designed as an intelligent assistant, not an autonomous system. Every alert requires human confirmation, ensuring that experienced supervisors make final safety decisions while benefiting from AI-powered insights." }), _jsxs("div", { className: "flex items-center justify-center gap-2 text-sm text-muted-foreground", children: [_jsx(CheckCircle, { size: 18, className: "text-secondary" }), _jsx("span", { children: "Human judgment preserved" }), _jsx("span", { className: "text-border", children: "|" }), _jsx(CheckCircle, { size: 18, className: "text-secondary" }), _jsx("span", { children: "AI augmentation, not replacement" })] })] }) })] }) }) }), _jsx("section", { className: "py-20 bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx(FileText, { size: 48, className: "mx-auto mb-6 opacity-90" }), _jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Technical Dossier" }), _jsx("p", { className: "text-lg mb-8 opacity-90", children: "Dive deeper into our architecture, model design, and validation methodology" }), _jsxs(Button, { size: "lg", variant: "secondary", className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90", children: ["Download Technical Dossier (PDF)", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] }) }) })] }), _jsx(Footer, {})] }));
}
