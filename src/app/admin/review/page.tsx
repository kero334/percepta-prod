import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "@/lib/cms/auth";
import { redirect } from "next/navigation";
import ReviewClient from "./ReviewClient";

export const metadata = {
  title: "Content Review Center | Admin",
};

export default async function ReviewCenterPage() {
  const { authorized, role, user } = await verifyAdminAccess();
  if (!authorized || role !== "admin") redirect("/admin/dashboard");

  const supabase = await createClient();

  // Fetch resources currently in 'review' status
  const { data: resourcesToReview, error } = await supabase
    .from("resources")
    .select("*")
    .eq("status", "review")
    .order("updated_at", { ascending: false });

  // For each resource, we also need to get the last published snapshot to compare.
  // Wait, we can fetch that inside ReviewClient when a resource is selected.
  // We should also fetch the reviewer's previous review history if they have any, but we can do that on demand.

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Content Review Center</h1>
        <p className="text-muted-foreground">Approve or reject draft content before publication.</p>
      </div>

      <ReviewClient pendingResources={resourcesToReview || []} />
    </div>
  );
}
