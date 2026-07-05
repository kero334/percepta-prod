import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "@/lib/cms/auth";
import { redirect } from "next/navigation";
import MediaLibraryClient from "./MediaLibraryClient";

export const metadata = {
  title: "Media Library | Admin",
};

export default async function MediaLibraryPage() {
  const { authorized } = await verifyAdminAccess();
  if (!authorized) redirect("/admin/login");

  const supabase = await createClient();
  const { data: mediaAssets, error } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch media assets:", error);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Media Library</h1>
        <p className="text-muted-foreground">Upload and manage media assets for the public and draft buckets.</p>
      </div>

      <MediaLibraryClient initialAssets={mediaAssets || []} />
    </div>
  );
}
