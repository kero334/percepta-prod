"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createRedirect, deleteRedirect } from "@/lib/cms/redirect-actions";
import * as Icons from "lucide-react";

export default function RedirectsClient({ initialRedirects, role, allResources }: { initialRedirects: any[], role: string, allResources: any[] }) {
  const [redirects, setRedirects] = useState(initialRedirects);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAdmin = role === "admin";

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAdmin) return;
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const oldSlug = formData.get("old_slug") as string;
    const newSlug = formData.get("new_slug") as string;
    const resourceId = formData.get("resource_id") as string;

    try {
      await createRedirect(oldSlug, newSlug, resourceId);
      // Let Next.js revalidate or just reload
      window.location.reload();
    } catch (err: any) {
      alert("Failed to create redirect: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (!confirm("Delete this redirect?")) return;
    try {
      await deleteRedirect(id);
      setRedirects(redirects.filter(r => r.id !== id));
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Read-only Table */}
      <div className="lg:col-span-2">
        <div className="bg-[#121214] border border-border/40 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-[#18181b] border-b border-border/40 text-white">
              <tr>
                <th className="px-6 py-4 font-medium">Old Slug</th>
                <th className="px-6 py-4 font-medium">New Slug</th>
                <th className="px-6 py-4 font-medium">Target Resource</th>
                {isAdmin && <th className="px-6 py-4 font-medium text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {redirects.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{r.old_slug}</td>
                  <td className="px-6 py-4 font-mono text-xs">{r.new_slug}</td>
                  <td className="px-6 py-4">
                    {r.resources?.title} <span className="text-xs font-mono ml-2">({r.resources?.slug})</span>
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                        <Icons.Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
              {redirects.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 4 : 3} className="px-6 py-8 text-center text-muted-foreground">
                    No active redirects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Creation Panel */}
      <div>
        <div className="bg-[#121214] border border-border/40 rounded-xl p-6 sticky top-8">
          <h2 className="text-xl font-bold text-white mb-4">Add Manual Redirect</h2>
          {!isAdmin ? (
            <div className="text-sm text-yellow-500/80 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-md">
              <Icons.ShieldAlert className="w-5 h-5 mb-2" />
              Manual redirect creation is restricted to Administrators. Editors have read-only access.
            </div>
          ) : (
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white mb-1 block">Old Slug</label>
                <Input type="text" name="old_slug" required placeholder="e.g. old-article-url" className="bg-[#09090b] text-white border-border/40 font-mono text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-1 block">New Slug</label>
                <Input type="text" name="new_slug" required placeholder="e.g. new-article-url" className="bg-[#09090b] text-white border-border/40 font-mono text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-1 block">Target Resource</label>
                <select name="resource_id" required className="w-full h-10 rounded-md border border-border/40 bg-[#09090b] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select resource...</option>
                  {allResources.map((res: any) => (
                    <option key={res.id} value={res.id}>{res.title} (/{res.slug})</option>
                  ))}
                </select>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-black hover:bg-primary/90 mt-4">
                {isSubmitting ? "Creating..." : "Create 301 Redirect"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
