"use server";

import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "./auth";

export async function getAuditLogs(page: number = 1, pageSize: number = 50, filters: any = {}) {
  const { authorized, role } = await verifyAdminAccess();
  // Phase 3 Rule: ONLY Admins can view audit logs.
  if (!authorized || role !== "admin") throw new Error("Unauthorized");

  const supabase = await createClient();
  let query = supabase.from("audit_logs").select("*, auth_users:user_id(email)", { count: "exact" });

  if (filters.action_type) {
    query = query.eq("action_type", filters.action_type);
  }
  if (filters.table_name) {
    query = query.eq("table_name", filters.table_name);
  }
  if (filters.user_id) {
    query = query.eq("user_id", filters.user_id);
  }

  const offset = (page - 1) * pageSize;
  query = query.order("created_at", { ascending: false }).range(offset, offset + pageSize - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    logs: data || [],
    total: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize)
  };
}

export async function exportAuditLogs(format: "csv" | "json", filters: any = {}) {
  const { authorized, role } = await verifyAdminAccess();
  if (!authorized || role !== "admin") throw new Error("Unauthorized");

  const supabase = await createClient();
  let query = supabase.from("audit_logs").select("*, auth_users:user_id(email)");

  if (filters.action_type) query = query.eq("action_type", filters.action_type);
  if (filters.table_name) query = query.eq("table_name", filters.table_name);
  if (filters.user_id) query = query.eq("user_id", filters.user_id);

  const { data, error } = await query.order("created_at", { ascending: false }).limit(5000);
  if (error) throw error;

  if (format === "json") {
    return JSON.stringify(data, null, 2);
  } else {
    // Basic CSV generation
    const headers = ["id", "created_at", "user_id", "email", "action_type", "table_name", "record_id"];
    const rows = (data || []).map(row => {
      const email = (row as any).auth_users?.email || "";
      return `${row.id},${row.created_at},${row.user_id},${email},${row.action_type},${row.table_name},${row.record_id}`;
    });
    return [headers.join(","), ...rows].join("\n");
  }
}
