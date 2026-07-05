"use server";

import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "./auth";
import { revalidatePath } from "next/cache";

export async function createRedirect(oldSlug: string, newSlug: string, resourceId: string) {
  const { authorized, role, user } = await verifyAdminAccess();
  if (!authorized || !user) throw new Error("Unauthorized");
  if (role !== "admin") throw new Error("Only admins can create manual redirects");

  const supabase = await createClient();

  // 1. Create redirect
  const { data: newRedirect, error } = await supabase.from("resource_redirects").insert({
    old_slug: oldSlug,
    new_slug: newSlug,
    resource_id: resourceId
  }).select("id").single();

  if (error) throw new Error(`Failed to create redirect: ${error.message}`);

  // 2. Audit log
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action_type: "CREATE_MANUAL_REDIRECT",
    table_name: "resource_redirects",
    record_id: newRedirect.id,
    new_data: { old_slug: oldSlug, new_slug: newSlug, resource_id: resourceId }
  });

  revalidatePath("/admin/redirects");
  return { success: true };
}

export async function deleteRedirect(id: string) {
  const { authorized, role, user } = await verifyAdminAccess();
  if (!authorized || !user) throw new Error("Unauthorized");
  if (role !== "admin") throw new Error("Only admins can delete redirects");

  const supabase = await createClient();

  // Get old data for audit log
  const { data: oldData } = await supabase.from("resource_redirects").select("*").eq("id", id).single();

  const { error } = await supabase.from("resource_redirects").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete redirect: ${error.message}`);

  // Audit log
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action_type: "DELETE_REDIRECT",
    table_name: "resource_redirects",
    record_id: id,
    old_data: oldData || {}
  });

  revalidatePath("/admin/redirects");
  return { success: true };
}
