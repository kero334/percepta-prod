"use server";

import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "./auth";

export async function submitReviewDecision(resourceId: string, decision: "approved" | "rejected", reviewNotes?: string) {
  const { authorized, role, user } = await verifyAdminAccess();
  if (!authorized || role !== "admin") throw new Error("Only admins can submit review decisions");

  const supabase = await createClient();

  // 1. Insert review record
  const { error: reviewError } = await supabase
    .from("resource_reviews")
    .insert({
      resource_id: resourceId,
      reviewer_id: user.id,
      decision: decision,
      review_notes: reviewNotes || null
    });

  if (reviewError) throw reviewError;

  // 2. Update resource status
  const newStatus = decision === "approved" ? "published" : "draft";
  const updatePayload: any = {
    status: newStatus,
    last_reviewed_at: new Date().toISOString(),
    reviewed_by: user.id
  };
  
  if (decision === "approved") {
    updatePayload.published_at = new Date().toISOString();
  }

  const { error: updateError } = await supabase
    .from("resources")
    .update(updatePayload)
    .eq("id", resourceId);

  if (updateError) throw updateError;

  return { success: true };
}

export async function getResourceReviews(resourceId: string) {
  const supabase = await createClient();
  
  // Need to get user emails/names for reviewers if possible, 
  // but we can only access auth.users indirectly or just return IDs.
  // Assuming basic ID returning for now. In a real app we'd join a public.users profile table.
  const { data, error } = await supabase
    .from("resource_reviews")
    .select("*")
    .eq("resource_id", resourceId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}
