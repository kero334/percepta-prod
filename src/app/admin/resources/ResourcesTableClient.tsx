"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { saveSearchFilter, deleteSavedFilter } from "@/lib/cms/saved-filters-actions";

export default function ResourcesTableClient({ initialResources, savedFilters, currentQuery, currentFilters }: { initialResources: any[], savedFilters: any[], currentQuery: string, currentFilters: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(currentQuery);
  const [statusFilter, setStatusFilter] = useState(currentFilters.status || "");
  const [typeFilter, setTypeFilter] = useState(currentFilters.content_type || "");
  const [themeFilter, setThemeFilter] = useState(currentFilters.theme || "");

  const [filterName, setFilterName] = useState("");
  const [savingFilter, setSavingFilter] = useState(false);

  // Debounce search input and update URL
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) params.set("q", search);
      else params.delete("q");
      
      if (statusFilter) params.set("status", statusFilter);
      else params.delete("status");

      if (typeFilter) params.set("type", typeFilter);
      else params.delete("type");

      if (themeFilter) params.set("theme", themeFilter);
      else params.delete("theme");

      router.push(`/admin/resources?${params.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [search, statusFilter, typeFilter, themeFilter]);

  const handleSaveFilter = async () => {
    if (!filterName.trim()) return;
    try {
      setSavingFilter(true);
      const payload = { q: search, status: statusFilter, type: typeFilter, theme: themeFilter };
      await saveSearchFilter(filterName, payload);
      setFilterName("");
      alert("Filter saved!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to save filter");
    } finally {
      setSavingFilter(false);
    }
  };

  const handleLoadFilter = (payload: any) => {
    setSearch(payload.q || "");
    setStatusFilter(payload.status || "");
    setTypeFilter(payload.type || "");
    setThemeFilter(payload.theme || "");
  };

  const handleDeleteFilter = async (id: string) => {
    try {
      await deleteSavedFilter(id);
      router.refresh();
    } catch(err) {
      console.error(err);
      alert("Failed to delete filter");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Resources</h1>
          <p className="text-muted-foreground mt-1">Manage all content across the platform. Ordered by search relevance.</p>
        </div>
        <Link href="/admin/resources/new">
          <Button className="bg-primary text-black hover:bg-primary/90">
            <Icons.Plus className="w-4 h-4 mr-2" />
            New Resource
          </Button>
        </Link>
      </div>

      <div className="bg-[#121214] border border-border/20 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <Input 
              placeholder="Search via Advanced Search Vector..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#09090b] border-border/40 text-white"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#09090b] border border-border/40 text-white rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="archived">Archived</option>
          </select>
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#09090b] border border-border/40 text-white rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            <option value="Devlog">Devlog</option>
            <option value="Research Note">Research Note</option>
            <option value="Technical Brief">Technical Brief</option>
          </select>
        </div>

        <div className="flex items-center gap-4 border-t border-border/20 pt-4">
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Filter Name..." 
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="bg-[#09090b] border-border/40 text-white h-8 w-40"
            />
            <Button size="sm" variant="outline" onClick={handleSaveFilter} disabled={savingFilter || !filterName.trim()}>
              Save Current Filter
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 flex-1">
            {savedFilters.map((sf) => (
              <div key={sf.id} className="flex items-center bg-[#18181b] border border-border/40 rounded-md overflow-hidden text-xs text-white">
                <button 
                  className="px-3 py-1.5 hover:bg-white/10"
                  onClick={() => handleLoadFilter(sf.filter_payload_json)}
                >
                  {sf.filter_name}
                </button>
                <button 
                  className="px-2 py-1.5 border-l border-border/40 hover:bg-red-500/20 text-muted-foreground hover:text-red-400"
                  onClick={() => handleDeleteFilter(sf.id)}
                >
                  <Icons.X className="w-3 h-3"/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#121214] border border-border/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#18181b] border-b border-border/20 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Title & Slug</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Author</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10 text-white">
              {initialResources.map((res) => (
                <tr key={res.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium flex items-center gap-2">
                      {res.title}
                      {res.is_hidden && <Icons.EyeOff className="w-3 h-3 text-red-400" />}
                      {res.is_featured && <Icons.Star className="w-3 h-3 text-yellow-400" />}
                    </div>
                    <div className="text-muted-foreground text-xs mt-1">/{res.slug}</div>
                  </td>
                  <td className="px-6 py-4 capitalize">{res.content_type || "Standard"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      res.status === 'published' ? 'bg-green-500/10 text-green-400' :
                      res.status === 'draft' ? 'bg-zinc-500/10 text-zinc-400' :
                      res.status === 'review' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{res.author || "—"}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/resources/${res.id}/edit`}>
                      <Button variant="outline" size="sm" className="border-border/40 hover:bg-primary hover:text-black">
                        Edit
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {initialResources.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No resources found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
