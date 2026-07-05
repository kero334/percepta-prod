import { createClient } from "@/lib/supabase/server";

export async function verifyAdminAccess() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { authorized: false, user: null, role: null };
  }

  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (!roleData || (roleData.role !== "Admin" && roleData.role !== "Editor")) {
    return { authorized: false, user, role: roleData?.role || null };
  }

  return { authorized: true, user, role: roleData.role };
}
