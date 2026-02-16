import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Send, MessageSquare, Building, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const contactReasons = [
        {
            icon: Building,
            title: "Pilot Partnerships",
            description: "Interested in validating Percepta at your facility with a structured pilot program",
        },
        {
            icon: Users,
            title: "Incubators & Accelerators",
            description: "Looking to evaluate Percepta for your startup program or investment portfolio",
        },
        {
            icon: MessageSquare,
            title: "General Inquiries",
            description: "Questions about our technology, approach, or potential collaboration opportunities",
        },
    ];
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navigation, {}), _jsxs("main", { className: "flex-1 pt-16", children: [_jsx("section", { className: "py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-center", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-6", children: "Get in Touch" }), _jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: "We're currently collaborating with pilot partners and research-driven programs" })] }) }) }), _jsx("section", { className: "py-20 bg-background", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-4", children: "Why Reach Out?" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "We welcome conversations with these audiences" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 mb-16", children: contactReasons.map((reason, index) => {
                                        const Icon = reason.icon;
                                        return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: index * 0.1 }, children: _jsx(Card, { className: "h-full hover:shadow-lg transition-shadow border-border", children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx("div", { className: "text-primary mb-4 inline-flex p-4 rounded-xl bg-primary/5", children: _jsx(Icon, { size: 32 }) }), _jsx("h3", { className: "text-xl font-semibold text-foreground mb-3", children: reason.title }), _jsx("p", { className: "text-muted-foreground leading-relaxed", children: reason.description })] }) }) }, reason.title));
                                    }) })] }) }), _jsx("section", { className: "py-20 bg-muted/30", children: _jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-start", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-3xl font-bold text-foreground mb-6", children: "Contact Information" }), _jsx(Card, { className: "border-border mb-8", children: _jsxs(CardContent, { className: "p-8", children: [_jsxs("div", { className: "flex items-start gap-4 mb-6", children: [_jsx("div", { className: "text-primary p-3 rounded-xl bg-primary/5 flex-shrink-0", children: _jsx(Mail, { size: 24 }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-foreground uppercase tracking-wider mb-2", children: "Email" }), _jsx("a", { href: "mailto:hello@percepta.ai", className: "text-lg text-primary hover:underline", children: "hello@percepta.ai" })] })] }), _jsx("div", { className: "pt-6 border-t border-border", children: _jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "We typically respond within 1-2 business days. For pilot program inquiries, please use our dedicated pilot request form for faster processing." }) })] }) }), _jsx(Card, { className: "bg-gradient-to-br from-secondary/10 to-accent/10 border-border", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("h3", { className: "text-xl font-semibold text-foreground mb-4", children: "Looking for a Pilot Program?" }), _jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: "If you're specifically interested in running a structured pilot at your facility, please use our dedicated pilot request form for a faster, more tailored response." }), _jsx("a", { href: "/pilot", children: _jsx(Button, { variant: "secondary", className: "w-full", children: "Request a Pilot Program" }) })] }) })] }), _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-3xl font-bold text-foreground mb-6", children: "Send a Message" }), _jsx(Card, { className: "border-border shadow-lg", children: _jsx(CardContent, { className: "p-8", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsxs(Label, { htmlFor: "name", children: ["Name ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, { id: "name", name: "name", value: formData.name, onChange: handleChange, required: true, className: "mt-2", placeholder: "Your name" })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "email", children: ["Email ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, required: true, className: "mt-2", placeholder: "your@email.com" })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "message", children: ["Message ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Textarea, { id: "message", name: "message", value: formData.message, onChange: handleChange, required: true, className: "mt-2", rows: 6, placeholder: "Tell us about your inquiry, interest in Percepta, or how we can help..." })] }), _jsxs(Button, { type: "submit", size: "lg", className: "w-full", children: [_jsx(Send, { className: "mr-2 h-4 w-4" }), "Send Message"] })] }) }) })] })] }) }) }), _jsx("section", { className: "py-20 bg-background", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center", children: _jsx(Card, { className: "border-border", children: _jsxs(CardContent, { className: "p-12", children: [_jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-4", children: "Join Our Network" }), _jsx("p", { className: "text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto", children: "We're actively seeking partnerships with forward-thinking organizations committed to industrial safety innovation. If you're an incubator, accelerator, industrial partner, or early advisor, we'd love to connect." }), _jsxs("div", { className: "flex flex-wrap justify-center gap-4 text-sm text-muted-foreground", children: [_jsx("span", { className: "px-4 py-2 bg-muted rounded-full", children: "Startup Competitions" }), _jsx("span", { className: "px-4 py-2 bg-muted rounded-full", children: "Incubators" }), _jsx("span", { className: "px-4 py-2 bg-muted rounded-full", children: "Accelerators" }), _jsx("span", { className: "px-4 py-2 bg-muted rounded-full", children: "Industrial Partners" }), _jsx("span", { className: "px-4 py-2 bg-muted rounded-full", children: "Research Programs" })] })] }) }) }) }) })] }), _jsx(Footer, {})] }));
}
