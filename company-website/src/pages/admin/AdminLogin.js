import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const API_BASE = "/api";
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`${API_BASE}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        })
            .then(async (res) => {
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Login failed");
            }
            return res.json();
        })
            .then((data) => {
            sessionStorage.setItem("adminAuthenticated", "true");
            sessionStorage.setItem("adminToken", data.token);
            toast.success("Access granted!");
            navigate("/admin/team");
        })
            .catch((err) => {
            toast.error(err.message || "Incorrect password. Please try again.");
            setPassword("");
        })
            .finally(() => setIsLoading(false));
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4", children: _jsx(Lock, { size: 32 }) }), _jsx("h1", { className: "text-3xl font-bold text-foreground mb-2", children: "Admin Access" }), _jsx("p", { className: "text-muted-foreground", children: "Enter password to access the admin panel" })] }), _jsx(Card, { className: "border-border shadow-lg", children: _jsxs(CardContent, { className: "p-8", children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter admin password", disabled: isLoading, autoFocus: true, className: "text-lg" })] }), _jsx(Button, { type: "submit", size: "lg", className: "w-full", disabled: isLoading || !password, children: isLoading ? ("Verifying...") : (_jsxs(_Fragment, { children: ["Access Admin Panel", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })) })] }), _jsx("div", { className: "mt-6 pt-6 border-t border-border text-center", children: _jsx("a", { href: "/", className: "text-sm text-muted-foreground hover:text-foreground transition-colors", children: "\u2190 Back to Website" }) })] }) }), _jsx("div", { className: "mt-8 text-center", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "Admin panel for Percepta website content management" }) })] }) }));
}
