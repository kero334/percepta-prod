import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { FileText, PlayCircle, Presentation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EmbedViewer from "@/components/EmbedViewer";
export default function Materials() {
    const materials = [
        {
            _id: "mat-1",
            title: "Percepta Overview (PDF)",
            description: "High-level overview of Percepta AI, two-stage detection→reasoning architecture, and safety goals.",
            contentType: "pdf",
            url: "https://drive.google.com/file/d/1SQq5-M9ufFvzePnhnxJOIWLkKC2e_yxF/view?usp=sharing",
        },
        {
            _id: "mat-2",
            title: "Percepta AI Demo Presentation",
            description: "A guided walkthrough of the analyzer UI, image upload, detections, and Arabic report generation.",
            contentType: "video",
            url: "https://drive.google.com/file/d/1XwmvXzNDj-MSSLH8J30zWZNZeTnQcDcq/view?usp=sharing",
        },
        {
            _id: "mat-3",
            title: "Technical Deck (Presentation)",
            description: "Slides covering detection calibration, proximity modeling, percent→pixel conversion validation, and UX constraints.",
            contentType: "presentation",
            url: "https://docs.google.com/presentation/d/e/2PACX-1vSmo0YvOf5KGXlrt76IH2b2tG8XnlAkswExsSWAWaJZ-5ajE3twIaHfFGDOjHEB0Q/pub?start=true&loop=true&delayms=3000",
        },
    ];
    const getIcon = (type) => {
        switch (type) {
            case "video":
                return PlayCircle;
            case "presentation":
                return Presentation;
            case "pdf":
                return FileText;
            default:
                return FileText;
        }
    };
    const getIconColor = (index) => {
        const colors = ["text-primary", "text-secondary", "text-accent"];
        return colors[index % colors.length];
    };
    const getBgColor = (index) => {
        const colors = ["bg-primary/5", "bg-secondary/5", "bg-accent/5"];
        return colors[index % colors.length];
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col overflow-x-hidden", children: [_jsx(Navigation, {}), _jsxs("main", { className: "flex-1 pt-16 overflow-x-hidden", children: [_jsx("section", { className: "py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-center", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-6", children: "Supporting Materials" }), _jsx("p", { className: "text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto", children: "The following materials provide deeper insight into Percepta's concept, technical thinking, and intended real-world application." })] }) }) }), _jsx("section", { className: "py-20 bg-background", children: _jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: materials && materials.length > 0 ? (_jsx("div", { className: "space-y-12", children: materials.map((material, index) => {
                                    const Icon = getIcon(material.contentType);
                                    const iconColor = getIconColor(index);
                                    const bgColor = getBgColor(index);
                                    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: index * 0.1 }, children: _jsx(Card, { className: "border-border hover:shadow-lg transition-shadow", children: _jsx(CardContent, { className: "p-8 md:p-10", children: _jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row gap-6 items-start", children: [_jsx("div", { className: `${iconColor} ${bgColor} p-4 rounded-xl flex-shrink-0`, children: _jsx(Icon, { size: 40, strokeWidth: 1.5 }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-4", children: [material.title, _jsx("span", { className: "ml-3 inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-medium uppercase text-muted-foreground align-middle", children: material.contentType === "pdf"
                                                                                        ? "PDF"
                                                                                        : material.contentType === "video"
                                                                                            ? "Video"
                                                                                            : "Deck" })] }), _jsx("p", { className: "text-muted-foreground leading-relaxed", children: material.description }), _jsx("p", { className: "text-sm text-muted-foreground mt-3", children: _jsxs("a", { href: material.url, target: "_blank", rel: "noopener noreferrer", className: "underline underline-offset-4", children: ["Open", " ", material.contentType === "pdf"
                                                                                        ? "PDF"
                                                                                        : material.contentType === "video"
                                                                                            ? "video"
                                                                                            : "deck", " ", "in new tab"] }) })] })] }), _jsx("div", { className: "w-full", children: _jsx(EmbedViewer, { url: material.url, contentType: material.contentType, title: material.title }) })] }) }) }) }, material._id));
                                }) })) : (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-muted-foreground text-lg", children: "No materials available at this time." }) })) }) }), _jsx("section", { className: "py-20 bg-muted/30", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: _jsx(Card, { className: "border-border", children: _jsxs(CardContent, { className: "p-8 md:p-10 text-center", children: [_jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-4", children: "Questions About These Materials?" }), _jsx("p", { className: "text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto", children: "These resources are prepared for judges, incubators, accelerators, and industrial partners evaluating Percepta. If you have questions or need clarification, we're here to help." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx("a", { href: "/contact", children: _jsx(Button, { size: "lg", children: "Get in Touch" }) }), _jsx("a", { href: "/pilot", children: _jsx(Button, { size: "lg", variant: "outline", children: "Request a Pilot" }) })] })] }) }) }) }) })] }), _jsx(Footer, {})] }));
}
