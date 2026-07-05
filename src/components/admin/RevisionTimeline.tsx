"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { RevisionDiff } from "./RevisionDiff";

export function RevisionTimeline({ revisions, currentData }: { revisions: any[], currentData: any }) {
  const [selectedRevision, setSelectedRevision] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      {selectedRevision ? (
        <div className="bg-[#121214] border border-border/20 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-[#18181b] border-b border-border/40 p-4 flex justify-between items-center">
            <h3 className="text-white font-medium">Comparing: Current Draft vs Revision</h3>
            <button type="button" onClick={() => setSelectedRevision(null)} className="text-muted-foreground hover:text-white text-sm flex items-center">
              <Icons.ArrowLeft className="w-4 h-4 mr-1" /> Back to Timeline
            </button>
          </div>
          <RevisionDiff 
            currentData={currentData} 
            revisionData={selectedRevision.snapshot} 
          />
        </div>
      ) : (
        <div className="bg-[#121214] border border-border/20 p-6 rounded-xl space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-border/20 pb-2">Revision Timeline</h2>
          {revisions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No revisions found.</p>
          ) : (
            <div className="relative border-l border-border/40 ml-3 space-y-6">
              {revisions.map((rev, i) => (
                <div key={rev.id} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5" />
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-white">Revision #{revisions.length - i}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(rev.created_at).toLocaleString()} by {rev.user_id}
                      </div>
                      {rev.commit_message && (
                        <div className="text-sm text-zinc-400 mt-2 italic">"{rev.commit_message}"</div>
                      )}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setSelectedRevision(rev)}
                      className="text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-md border border-white/10"
                    >
                      Compare
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
