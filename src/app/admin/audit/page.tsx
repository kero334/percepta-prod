import { verifyAdminAccess } from "@/lib/cms/auth";
import { redirect } from "next/navigation";
import { getAuditLogs } from "@/lib/cms/audit-actions";
import AuditClient from "./AuditClient";

export const metadata = {
  title: "Audit Logs | Admin",
};

export default async function AuditPage({ searchParams }: { searchParams: { page?: string, action_type?: string } }) {
  const { authorized, role } = await verifyAdminAccess();
  if (!authorized || role !== "admin") redirect("/admin/dashboard");

  const page = parseInt(searchParams.page || "1", 10);
  const actionType = searchParams.action_type || "";

  const initialData = await getAuditLogs(page, 50, actionType ? { action_type: actionType } : {});

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Audit Logs</h1>
        <p className="text-muted-foreground">Review system modifications. Logs are retained for 90 days before archiving.</p>
      </div>

      <AuditClient initialData={initialData} currentFilters={{ action_type: actionType }} />
    </div>
  );
}
