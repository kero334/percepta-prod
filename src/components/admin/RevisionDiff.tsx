"use client";

import { useState } from "react";

export function RevisionDiff({ currentData, revisionData }: { currentData: any, revisionData: any }) {
  const [viewMode, setViewMode] = useState<"content" | "json">("content");

  const diffField = (label: string, current: string, old: string) => {
    const isDifferent = current !== old;
    if (!isDifferent) return null;
    return (
      <div className="mb-4">
        <div className="text-sm font-medium text-white mb-2">{label}</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded p-2 text-sm text-red-200">
            <span className="block text-xs text-red-500/50 mb-1">Old</span>
            {old || <span className="italic opacity-50">Empty</span>}
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded p-2 text-sm text-green-200">
             <span className="block text-xs text-green-500/50 mb-1">New</span>
            {current || <span className="italic opacity-50">Empty</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="p-2 border-b border-border/40 flex gap-2 bg-[#09090b]">
        <button 
          type="button" 
          onClick={() => setViewMode("content")} 
          className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${viewMode === "content" ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5"}`}
        >
          Content Diff
        </button>
        <button 
          type="button" 
          onClick={() => setViewMode("json")} 
          className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${viewMode === "json" ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5"}`}
        >
          Raw JSON Diff
        </button>
      </div>
      
      <div className="p-6 overflow-y-auto flex-1">
        {viewMode === "content" ? (
          <div>
            {diffField("Title", currentData.title, revisionData.title)}
            {diffField("Slug", currentData.slug, revisionData.slug)}
            {diffField("Description", currentData.description, revisionData.description)}
            {diffField("Status", currentData.status, revisionData.status)}
            {diffField("Content Type", currentData.content_type, revisionData.content_type)}
            {diffField("Theme", currentData.theme, revisionData.theme)}
            {diffField("Evidence Level", currentData.evidence_level, revisionData.evidence_level)}
            {diffField("Author", currentData.author, revisionData.author)}
            {/* Simple length diff for rich content since diffing JSON blocks visually is complex */}
            {JSON.stringify(currentData.rich_content) !== JSON.stringify(revisionData.rich_content) && (
              <div className="mb-4">
                <div className="text-sm font-medium text-white mb-2">Rich Content (JSON size)</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-2 text-sm text-red-200">
                    {JSON.stringify(revisionData.rich_content || {}).length} bytes
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-2 text-sm text-green-200">
                    {JSON.stringify(currentData.rich_content || {}).length} bytes
                  </div>
                </div>
              </div>
            )}
            
            {JSON.stringify(currentData) === JSON.stringify(revisionData) && (
              <div className="text-center py-8 text-muted-foreground">No differences found.</div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 h-full">
             <div className="flex flex-col h-full">
                <div className="text-xs text-red-400 mb-2 font-mono">Revision Snapshot</div>
                <textarea 
                  readOnly 
                  value={JSON.stringify(revisionData, null, 2)} 
                  className="flex-1 w-full bg-[#09090b] border border-red-500/20 rounded-md p-3 text-red-200 font-mono text-xs focus:outline-none"
                />
             </div>
             <div className="flex flex-col h-full">
                <div className="text-xs text-green-400 mb-2 font-mono">Current Draft</div>
                <textarea 
                  readOnly 
                  value={JSON.stringify(currentData, null, 2)} 
                  className="flex-1 w-full bg-[#09090b] border border-green-500/20 rounded-md p-3 text-green-200 font-mono text-xs focus:outline-none"
                />
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
