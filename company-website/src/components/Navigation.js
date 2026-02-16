import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    // Scroll to top and close menu when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsOpen(false);
    }, [location.pathname]);
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/what-we-do", label: "What We Do" },
        { to: "/use-case", label: "Use Case" },
        { to: "/how-it-works", label: "How It Works" },
        { to: "/demo", label: "Live Demo" },
        { to: "/pilot", label: "Pilot Program" },
        { to: "/team", label: "Team" },
        { to: "/materials", label: "Materials" },
        { to: "/contact", label: "Contact" },
    ];
    const isActive = (path) => location.pathname === path;
    return (_jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border", children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-3 group", children: [_jsx("img", { src: "/percepta-logo.png", alt: "Percepta", className: "h-10 w-auto transition-transform group-hover:scale-105" }), _jsx("span", { className: "text-xl font-semibold text-foreground", children: "Percepta" })] }), _jsxs("div", { className: "hidden lg:flex items-center gap-1", children: [navLinks.map((link) => (_jsx(Link, { to: link.to, className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive(link.to)
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"}`, children: link.label }, link.to))), _jsx(Link, { to: "/pilot", children: _jsx(Button, { size: "sm", className: "ml-4", children: "Request a Pilot" }) })] }), _jsx("button", { onClick: () => setIsOpen(!isOpen), className: "lg:hidden p-2 rounded-md hover:bg-muted", "aria-label": "Toggle menu", children: isOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) })] }) }), isOpen && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "lg:hidden border-t border-border bg-background", children: _jsxs("div", { className: "px-4 py-4 space-y-1", children: [navLinks.map((link) => (_jsx(Link, { to: link.to, onClick: () => setIsOpen(false), className: `block px-4 py-3 text-base font-medium rounded-md transition-colors ${isActive(link.to)
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"}`, children: link.label }, link.to))), _jsx(Link, { to: "/pilot", onClick: () => setIsOpen(false), children: _jsx(Button, { className: "w-full mt-4", children: "Request a Pilot" }) })] }) }))] }));
}
