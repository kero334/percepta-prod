import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export default function EditableField({ label, value, onChange, type = "text", placeholder, helperText, }) {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-sm font-medium text-foreground", children: label }), type === "textarea" ? (_jsx(Textarea, { value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, rows: 4, className: "w-full" })) : (_jsx(Input, { type: type === "url" ? "url" : "text", value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, className: "w-full" })), helperText && (_jsx("p", { className: "text-xs text-muted-foreground", children: helperText }))] }));
}
