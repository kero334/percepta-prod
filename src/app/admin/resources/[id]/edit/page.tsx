import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "@/lib/cms/auth";
import { redirect, notFound } from "next/navigation";
import ResourceEditorClient from "../../ResourceEditorClient";

export const metadata = {
  title: "Edit Resource | Percepta CMS",
};

export default async function EditResourcePage({ params }: { params: { id: string } }) {
  const { authorized } = await verifyAdminAccess();
  if (!authorized) redirect("/admin/login");

  const supabase = await createClient();
  const { data: resource } = await supabase
    .from("resources")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!resource) notFound();

  const { data: revisions } = await supabase
    .from("resource_revisions")
    .select("*")
    .eq("resource_id", params.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <ResourceEditorClient initialData={resource} revisions={revisions || []} isNew={false} />
    </div>
  );
}
