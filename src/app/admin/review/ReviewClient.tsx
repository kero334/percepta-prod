"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { RevisionDiff } from "@/components/admin/RevisionDiff";
import { submitReviewDecision } from "@/lib/cms/review-actions";

export default function ReviewClient({ pendingResources }: { pendingResources: any[] }) {
  const router = useRouter();
  const [selectedResource, setSelectedResource] = useState<any | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleDecision = async (decision: "approved" | "rejected") => {
    if (decision === "rejected" && !notes.trim()) {
      alert("Rejection comments are required.");
      return;
    }
    
    try {
      setSubmitting(true);
      await submitReviewDecision(selectedResource.id, decision, notes);
      alert(`Resource successfully ${decision}.`);
      router.refresh();
      setSelectedResource(null);
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (selectedResource) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" onClick={() => setSelectedResource(null)}>
            <Icons.ArrowLeft className="w-4 h-4 mr-2" /> Back to Queue
          </Button>
          <h2 className="text-xl font-semibold text-white">Reviewing: {selectedResource.title}</h2>
        </div>

        <div className="bg-[#121214] border border-border/20 rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-2">Review Content</h3>
            {/* Ideally we fetch the previous published snapshot here, but since we don't have it loaded, we'll just show the current content in a diff view against an empty obj for simplicity in this MVP. */}
            <RevisionDiff revisionData={{}} currentData={selectedResource} />
          </div>

          <div className="border-t border-border/20 pt-6">
            <h3 className="text-lg font-medium text-white mb-2">Review Decision</h3>
            <textarea
              className="w-full bg-[#09090b] border border-border/40 rounded-lg p-3 text-sm text-white mb-4 min-h-[100px]"
              placeholder="Add review notes or rejection comments (required for rejection)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex gap-4">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white" 
                onClick={() => handleDecision("approved")}
                disabled={submitting}
              >
                Approve & Publish
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleDecision("rejected")}
                disabled={submitting || !notes.trim()}
              >
                Reject to Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121214] border border-border/20 rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#18181b] border-b border-border/40 text-muted-foreground">
          <tr>
            <th className="px-6 py-4 font-medium">Title</th>
            <th className="px-6 py-4 font-medium">Type</th>
            <th className="px-6 py-4 font-medium">Submitted</th>
            <th className="px-6 py-4 font-medium">Author</th>
            <th className="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/20">
          {pendingResources.map((res: any) => (
            <tr key={res.id} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 text-white font-medium">{res.title}</td>
              <td className="px-6 py-4 text-zinc-400">{res.content_type || "N/A"}</td>
              <td className="px-6 py-4 text-zinc-400">{new Date(res.updated_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-zinc-400">{res.author || "Unknown"}</td>
              <td className="px-6 py-4 text-right">
                <Button variant="default" size="sm" onClick={() => setSelectedResource(res)}>
                  Review
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pendingResources.length === 0 && (
        <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
          <Icons.CheckCircle2 className="w-12 h-12 text-green-500/50 mb-4" />
          <p>Review queue is empty. You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
