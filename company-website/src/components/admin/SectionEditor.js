import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
export default function SectionEditor({ title, children, defaultExpanded = false, }) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    return (_jsx(Card, { className: "border-border", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("button", { onClick: () => setIsExpanded(!isExpanded), className: "w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors", children: [_jsx("h3", { className: "text-lg font-semibold text-foreground", children: title }), isExpanded ? (_jsx(ChevronUp, { size: 20, className: "text-muted-foreground" })) : (_jsx(ChevronDown, { size: 20, className: "text-muted-foreground" }))] }), isExpanded && (_jsx("div", { className: "px-6 pb-6 space-y-4 border-t border-border pt-6", children: children }))] }) }));
}
