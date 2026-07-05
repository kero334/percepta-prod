import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "@/lib/cms/auth";
import { redirect } from "next/navigation";
import RedirectsClient from "./RedirectsClient";

export const metadata = {
  title: "Redirect Management | Admin",
};

export default async function RedirectsPage() {
  const { authorized, role } = await verifyAdminAccess();
  if (!authorized) redirect("/admin/login");

  const supabase = await createClient();
  const { data: redirects, error } = await supabase
    .from("resource_redirects")
    .select("*, resources(title, slug)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch redirects:", error);
  }

  // Also fetch all resources for the dropdown if admin
  const { data: allResources } = role === "admin" 
    ? await supabase.from("resources").select("id, title, slug").order("title")
    : { data: [] };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Redirect Management</h1>
        <p className="text-muted-foreground">Manage HTTP 301 Permanent Redirects for content migrations and slug changes.</p>
      </div>

      <RedirectsClient initialRedirects={redirects || []} role={role || ""} allResources={allResources || []} />
    </div>
  );
}
