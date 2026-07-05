"use server";

import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "./auth";

export async function saveSearchFilter(filterName: string, filterPayload: any) {
  const { authorized, user } = await verifyAdminAccess();
  // Both admins and editors can save their own filters, so we just check auth
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("user_saved_filters")
    .insert({
      user_id: session.user.id,
      filter_name: filterName,
      filter_payload_json: filterPayload
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getSavedFilters() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) return [];

  const { data, error } = await supabase
    .from("user_saved_filters")
    .select("*")
    .eq("user_id", session.user.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function deleteSavedFilter(filterId: string) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) throw new Error("Unauthorized");

  // Soft delete
  const { error } = await supabase
    .from("user_saved_filters")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", filterId)
    .eq("user_id", session.user.id);

  if (error) throw error;
  return true;
}
