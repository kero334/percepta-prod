import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when user scrolls down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            }
            else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (_jsx(AnimatePresence, { children: isVisible && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { duration: 0.3 }, className: "fixed bottom-8 right-8 z-40", children: _jsx(Button, { onClick: scrollToTop, size: "icon", className: "h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow", title: "Scroll to top", children: _jsx(ArrowUp, { size: 20 }) }) })) }));
}
