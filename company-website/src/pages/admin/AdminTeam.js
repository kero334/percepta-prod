import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
const API_BASE = "/api";
function ImagePreview({ url }) {
    const [ok, setOk] = useState(null);
    const proxied = url ? `${API_BASE}/image-proxy?url=${encodeURIComponent(url)}` : "";
    useEffect(() => {
        if (!url) {
            setOk(null);
            return;
        }
        const img = new Image();
        img.onload = () => setOk(true);
        img.onerror = () => setOk(false);
        img.src = proxied;
    }, [url]);
    if (!url)
        return null;
    return (_jsx("div", { className: "mt-2", children: ok && (_jsx("img", { src: proxied, alt: "Preview", className: "w-24 h-24 object-cover rounded-md border border-border" })) }));
}
export default function AdminTeam() {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("adminToken") : null;
    const authHeader = useMemo(() => {
        const h = new Headers();
        if (token)
            h.set("Authorization", `Bearer ${token}`);
        return h;
    }, [token]);
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        title: "",
        description: "",
        image_url: "",
        linkedin_url: "",
        website_url: "",
        expertise: [],
        note: "",
    });
    const [newSkill, setNewSkill] = useState("");
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        fetch(`${API_BASE}/admin/team`, { headers: authHeader })
            .then(async (res) => {
            if (!res.ok)
                throw new Error("Unauthorized");
            return res.json();
        })
            .then((data) => setMembers(data))
            .catch(() => toast.error("Please login as admin to access team manager"));
    }, [authHeader]);
    const addSkillToForm = () => {
        const s = newSkill.trim();
        if (!s)
            return;
        setForm((f) => ({ ...f, expertise: [...(f.expertise || []), s] }));
        setNewSkill("");
    };
    const handleAdd = () => {
        const missingName = !form.name || !form.name.trim();
        const missingDescription = !form.description || !form.description.trim();
        if (missingName || missingDescription) {
            const parts = [];
            if (missingName)
                parts.push("Name");
            if (missingDescription)
                parts.push("Description");
            toast.error(`Missing required field(s): ${parts.join(", ")}`);
            return;
        }
        if (!token) {
            toast.error("Not authenticated. Please login to continue.");
            return;
        }
        setSaving(true);
        const jsonHeaders = new Headers(authHeader);
        jsonHeaders.set("Content-Type", "application/json");
        fetch(`${API_BASE}/admin/team`, {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify({
                name: form.name,
                title: form.title,
                description: form.description,
                image_url: form.image_url,
                linkedin_url: form.linkedin_url,
                website_url: form.website_url,
                expertise: form.expertise || [],
                note: form.note,
            }),
        })
            .then(async (res) => {
            let data = null;
            try {
                data = await res.json();
            }
            catch { }
            if (!res.ok) {
                const msg = (data && (data.error || data.message)) || `${res.status} ${res.statusText}`;
                throw new Error(msg);
            }
            return data;
        })
            .then((created) => {
            setMembers((m) => [created, ...m]);
            setForm({ name: "", title: "", description: "", image_url: "", linkedin_url: "", website_url: "", expertise: [], note: "" });
            toast.success("Member added");
        })
            .catch((err) => {
            toast.error(`Add failed: ${err.message}`);
        })
            .finally(() => setSaving(false));
    };
    const handleUpdate = (id, patch) => {
        if (!token) {
            toast.error("Not authenticated. Please login to continue.");
            return;
        }
        const jsonHeaders = new Headers(authHeader);
        jsonHeaders.set("Content-Type", "application/json");
        fetch(`${API_BASE}/admin/team/${id}`, {
            method: "PUT",
            headers: jsonHeaders,
            body: JSON.stringify(patch),
        })
            .then(async (res) => {
            let data = null;
            try {
                data = await res.json();
            }
            catch { }
            if (!res.ok) {
                const msg = (data && (data.error || data.message)) || `${res.status} ${res.statusText}`;
                throw new Error(msg);
            }
            return data;
        })
            .then((updated) => {
            setMembers((list) => list.map((m) => m.id === id ? updated : m));
            toast.success("Member updated");
        })
            .catch((err) => toast.error(`Update failed: ${err.message}`));
    };
    const handleDelete = (id) => {
        if (!confirm("Delete this member?"))
            return;
        if (!token) {
            toast.error("Not authenticated. Please login to continue.");
            return;
        }
        fetch(`${API_BASE}/admin/team/${id}`, {
            method: "DELETE",
            headers: authHeader,
        })
            .then(async (res) => {
            let data = null;
            try {
                data = await res.json();
            }
            catch { }
            if (!res.ok) {
                const msg = (data && (data.error || data.message)) || `${res.status} ${res.statusText}`;
                throw new Error(msg);
            }
            return data;
        })
            .then(() => {
            setMembers((list) => list.filter((m) => m.id !== id));
            toast.success("Member deleted");
        })
            .catch((err) => toast.error(`Delete failed: ${err.message}`));
    };
    return (_jsx(ProtectedRoute, { children: _jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-6 md:p-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "max-w-6xl mx-auto", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold text-foreground mb-6", children: "Team Members Manager" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Add, edit, and delete team members. Paste direct image URLs (googleusercontent.com preferred)." }), _jsx(Card, { className: "border-border mb-10", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { children: "Name" }), _jsx(Input, { value: form.name || "", onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { children: "Title / Role" }), _jsx(Input, { value: form.title || "", onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { children: "Image URL" }), _jsx(Input, { value: form.image_url || "", onChange: (e) => setForm((f) => ({ ...f, image_url: e.target.value })), placeholder: "https://..." }), _jsx(ImagePreview, { url: form.image_url || "" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { children: "LinkedIn URL" }), _jsx(Input, { value: form.linkedin_url || "", onChange: (e) => setForm((f) => ({ ...f, linkedin_url: e.target.value })), placeholder: "https://www.linkedin.com/in/..." })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { children: "Website URL" }), _jsx(Input, { value: form.website_url || "", onChange: (e) => setForm((f) => ({ ...f, website_url: e.target.value })), placeholder: "https://..." })] }), _jsxs("div", { className: "space-y-3 md:col-span-2", children: [_jsx(Label, { children: "Description" }), _jsx(Textarea, { value: form.description || "", onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })), rows: 3 })] }), _jsxs("div", { className: "space-y-3 md:col-span-2", children: [_jsx(Label, { children: "Notes (optional)" }), _jsx(Textarea, { value: form.note || "", onChange: (e) => setForm((f) => ({ ...f, note: e.target.value })), rows: 2 })] }), _jsxs("div", { className: "space-y-3 md:col-span-2", children: [_jsx(Label, { children: "Areas of Expertise" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { value: newSkill, onChange: (e) => setNewSkill(e.target.value), placeholder: "Add a skill then press Add" }), _jsx(Button, { type: "button", onClick: addSkillToForm, children: "Add" })] }), _jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: (form.expertise || []).map((skill, idx) => (_jsxs("span", { className: "text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full flex items-center gap-2", children: [skill, _jsx("button", { type: "button", className: "text-destructive", onClick: () => setForm((f) => ({ ...f, expertise: (f.expertise || []).filter((s) => s !== skill) })), children: "\u00D7" })] }, idx))) })] })] }), _jsx("div", { className: "mt-6", children: _jsx(Button, { onClick: handleAdd, disabled: saving, children: saving ? "Saving..." : "Add Member" }) })] }) }), _jsx("div", { className: "grid md:grid-cols-2 gap-6", children: members.map((m) => (_jsx(Card, { className: "border-border", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start gap-4", children: [m.image_url ? (_jsx("img", { src: `/api/image-proxy?url=${encodeURIComponent(m.image_url)}`, alt: m.name, className: "w-16 h-16 rounded-md object-cover border border-border", loading: "lazy" })) : (_jsx("div", { className: "w-16 h-16 rounded-md bg-muted" })), _jsxs("div", { className: "flex-1", children: [_jsx(Input, { value: m.name, onChange: (e) => setMembers((list) => list.map((x) => x.id === m.id ? { ...x, name: e.target.value } : x)), className: "mb-2" }), _jsx(Input, { value: m.title || "", onChange: (e) => setMembers((list) => list.map((x) => x.id === m.id ? { ...x, title: e.target.value } : x)), className: "mb-2", placeholder: "Title / Role" }), _jsx(Textarea, { value: m.description, onChange: (e) => setMembers((list) => list.map((x) => x.id === m.id ? { ...x, description: e.target.value } : x)), rows: 2, className: "mb-2" }), _jsx(Input, { value: m.image_url, onChange: (e) => setMembers((list) => list.map((x) => x.id === m.id ? { ...x, image_url: e.target.value } : x)), className: "mb-2" }), _jsx(Input, { value: m.linkedin_url || "", onChange: (e) => setMembers((list) => list.map((x) => x.id === m.id ? { ...x, linkedin_url: e.target.value } : x)), className: "mb-2", placeholder: "LinkedIn URL" }), _jsx(Input, { value: m.website_url || "", onChange: (e) => setMembers((list) => list.map((x) => x.id === m.id ? { ...x, website_url: e.target.value } : x)), className: "mb-2", placeholder: "Website URL" }), _jsx(Textarea, { value: (m.expertise || []).join(", "), onChange: (e) => setMembers((list) => list.map((x) => x.id === m.id ? { ...x, expertise: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } : x)), rows: 2, className: "mb-2", placeholder: "Comma-separated skills" }), _jsx(Textarea, { value: m.note, onChange: (e) => setMembers((list) => list.map((x) => x.id === m.id ? { ...x, note: e.target.value } : x)), rows: 2, className: "mb-2" }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { variant: "outline", onClick: () => handleUpdate(m.id, m), children: "Save" }), _jsx(Button, { variant: "destructive", onClick: () => handleDelete(m.id), children: "Delete" })] })] })] }) }) }, m.id))) })] }) }) }));
}
