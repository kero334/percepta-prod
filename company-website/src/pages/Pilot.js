import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, ClipboardCheck, Settings, BarChart, FileCheck, CheckCircle, Send, } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
export default function Pilot() {
    const [formData, setFormData] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        facilityType: "",
        message: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Pilot request submitted! We'll be in touch soon.");
        setFormData({
            companyName: "",
            contactPerson: "",
            email: "",
            phone: "",
            facilityType: "",
            message: "",
        });
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const pilotIncludes = [
        {
            icon: ClipboardCheck,
            title: "Site Survey",
            description: "Comprehensive assessment of your facility to identify optimal deployment zones",
        },
        {
            icon: Settings,
            title: "One Hazard Zone Configuration",
            description: "Custom setup for your highest-priority safety concern area",
        },
        {
            icon: Settings,
            title: "AI Model Calibration",
            description: "Fine-tuning the system to your specific equipment and environment",
        },
        {
            icon: BarChart,
            title: "Supervisor Dashboard",
            description: "Real-time monitoring interface for alerts and safety insights",
        },
        {
            icon: FileCheck,
            title: "Pilot Report with KPIs",
            description: "Detailed analysis of system performance and safety impact",
        },
    ];
    const kpis = [
        {
            title: "Precision",
            description: "Percentage of accurate hazard detections",
            icon: CheckCircle,
        },
        {
            title: "Confirmation Rate",
            description: "Ratio of alerts confirmed by human supervisors",
            icon: CheckCircle,
        },
        {
            title: "Mean Time to Alert (MTTA)",
            description: "Average time from detection to supervisor notification",
            icon: CheckCircle,
        },
    ];
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navigation, {}), _jsxs("main", { className: "flex-1 pt-16", children: [_jsx("section", { className: "py-20 bg-gradient-to-br from-background via-accent/5 to-secondary/10", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-center", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-6", children: "Validate Percepta in Your Facility" }), _jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: "Structured 6\u201312 week pilot program to prove effectiveness in your industrial environment" })] }) }) }), _jsx("section", { className: "py-20 bg-background", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-4", children: "Example Timeline (6\u201312 Weeks)" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Clear phases from kickoff to results" })] }), _jsx("div", { className: "grid md:grid-cols-4 gap-6", children: [
                                        { title: "Week 1", desc: "Site survey & zone selection" },
                                        { title: "Weeks 2–3", desc: "Configuration & calibration" },
                                        { title: "Weeks 4–8", desc: "Live trial & tuning" },
                                        { title: "Weeks 9–12", desc: "Report & next steps" },
                                    ].map((stage, i) => (_jsx(Card, { className: "border-border", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("h3", { className: "font-semibold text-foreground", children: stage.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: stage.desc })] }) }, i))) })] }) }), _jsx("section", { className: "py-20 bg-background", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-12", children: [_jsxs("div", { className: "inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6", children: [_jsx(Calendar, { size: 16 }), _jsx("span", { children: "6\u201312 Week Duration" })] }), _jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-4", children: "What's Included in the Pilot" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Comprehensive setup, calibration, and evaluation" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12", children: pilotIncludes.map((item, index) => {
                                        const Icon = item.icon;
                                        return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: index * 0.1 }, children: _jsx(Card, { className: "h-full hover:shadow-lg transition-shadow border-border", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "text-primary mb-4 inline-flex p-3 rounded-xl bg-primary/5", children: _jsx(Icon, { size: 28 }) }), _jsx("h3", { className: "text-lg font-semibold text-foreground mb-3", children: item.title }), _jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.description })] }) }) }, item.title));
                                    }) })] }) }), _jsx("section", { className: "py-20 bg-muted/30", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-4", children: "Key Performance Indicators" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Metrics we'll track to measure pilot success" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: kpis.map((kpi, index) => {
                                        const Icon = kpi.icon;
                                        return (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: index * 0.1 }, children: _jsx(Card, { className: "h-full text-center border-border hover:border-secondary/50 transition-colors", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "text-secondary mb-4 inline-flex p-3 rounded-xl bg-secondary/10", children: _jsx(Icon, { size: 28 }) }), _jsx("h3", { className: "text-xl font-semibold text-foreground mb-3", children: kpi.title }), _jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: kpi.description })] }) }) }, kpi.title));
                                    }) })] }) }), _jsx("section", { className: "py-20 bg-background", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-4", children: "Request a Pilot Program" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Fill out the form below and we'll get in touch to discuss your facility's needs" })] }), _jsx(Card, { className: "border-border shadow-lg", children: _jsx(CardContent, { className: "p-8", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs(Label, { htmlFor: "companyName", children: ["Company Name ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, { id: "companyName", name: "companyName", value: formData.companyName, onChange: handleChange, required: true, className: "mt-2", placeholder: "Acme Manufacturing" })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "contactPerson", children: ["Contact Person ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, { id: "contactPerson", name: "contactPerson", value: formData.contactPerson, onChange: handleChange, required: true, className: "mt-2", placeholder: "John Smith" })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs(Label, { htmlFor: "email", children: ["Email ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, required: true, className: "mt-2", placeholder: "john@acme.com" })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "phone", children: ["Phone ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, { id: "phone", name: "phone", type: "tel", value: formData.phone, onChange: handleChange, required: true, className: "mt-2", placeholder: "+1 (555) 123-4567" })] })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "facilityType", children: ["Facility Type ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, { id: "facilityType", name: "facilityType", value: formData.facilityType, onChange: handleChange, required: true, className: "mt-2", placeholder: "e.g., Manufacturing plant, Warehouse, Distribution center" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "message", children: "Message" }), _jsx(Textarea, { id: "message", name: "message", value: formData.message, onChange: handleChange, className: "mt-2", rows: 5, placeholder: "Tell us about your facility, safety concerns, and what you hope to achieve with the pilot..." })] }), _jsxs(Button, { type: "submit", size: "lg", className: "w-full", children: [_jsx(Send, { className: "mr-2 h-4 w-4" }), "Submit Pilot Request"] })] }) }) }), _jsx(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.3 }, className: "mt-8 text-center text-sm text-muted-foreground", children: _jsx("p", { children: "We typically respond within 2 business days. All pilot programs are subject to availability and facility requirements assessment." }) })] }) }) })] }), _jsx(Footer, {})] }));
}
