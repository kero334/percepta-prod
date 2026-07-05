"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportAuditLogs } from "@/lib/cms/audit-actions";

export default function AuditClient({ initialData, currentFilters }: { initialData: any, currentFilters: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [exporting, setExporting] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const handleExport = async (format: "csv" | "json") => {
    try {
      setExporting(true);
      const data = await exportAuditLogs(format, currentFilters);
      
      const blob = new Blob([data], { type: format === "csv" ? "text/csv" : "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit_export_${new Date().toISOString().split("T")[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Export failed");
    } finally {
      setExporting(false);
    }
  };

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/audit?${params.toString()}`);
  };

  const getSeverity = (actionType: string) => {
    if (actionType.includes("DELETE") || actionType.includes("DROP")) return "critical";
    if (actionType.includes("UPDATE") || actionType.includes("EDIT")) return "warning";
    return "info";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[#121214] border border-border/20 p-4 rounded-xl">
        <div className="flex gap-4">
           {/* Simple filter dropdowns could go here */}
           <div className="text-sm text-muted-foreground flex items-center">
             Total Logs: {initialData.total}
           </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport("csv")} disabled={exporting}>
            <Icons.Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("json")} disabled={exporting}>
            <Icons.Download className="w-4 h-4 mr-2" /> Export JSON
          </Button>
        </div>
      </div>

      <div className="bg-[#121214] border border-border/20 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#18181b] border-b border-border/40 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">Timestamp</th>
              <th className="px-6 py-4 font-medium">Severity</th>
              <th className="px-6 py-4 font-medium">Action</th>
              <th className="px-6 py-4 font-medium">Actor</th>
              <th className="px-6 py-4 font-medium">Target</th>
              <th className="px-6 py-4 font-medium text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {initialData.logs.map((log: any) => {
              const severity = getSeverity(log.action_type);
              return (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-zinc-400">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {severity === "critical" && <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs font-medium">CRITICAL</span>}
                    {severity === "warning" && <span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs font-medium">WARNING</span>}
                    {severity === "info" && <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs font-medium">INFO</span>}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{log.action_type}</td>
                  <td className="px-6 py-4 text-zinc-400">
                    {log.auth_users?.email || log.user_id || "System"}
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    <span className="font-mono text-xs">{log.table_name}</span>
                    <br/>
                    <span className="text-xs opacity-50">{log.record_id}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                      View JSON
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {initialData.logs.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">No audit logs found.</div>
        )}

        <div className="p-4 border-t border-border/20 flex justify-between items-center bg-[#18181b]">
          <span className="text-sm text-muted-foreground">Page {initialData.page} of {initialData.totalPages || 1}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => updatePage(initialData.page - 1)} disabled={initialData.page <= 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => updatePage(initialData.page + 1)} disabled={initialData.page >= initialData.totalPages}>
              Next
            </Button>
          </div>
        </div>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-border/40 rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-border/40 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Log Details</h3>
              <button onClick={() => setSelectedLog(null)} className="text-muted-foreground hover:text-white"><Icons.X className="w-5 h-5"/></button>
            </div>
            <div className="p-4 overflow-y-auto font-mono text-xs space-y-4">
              <div>
                <div className="text-zinc-500 mb-1">Old Data</div>
                <pre className="bg-[#09090b] p-4 rounded-md text-red-300 border border-red-500/10 overflow-x-auto">
                  {selectedLog.old_data ? JSON.stringify(selectedLog.old_data, null, 2) : "null"}
                </pre>
              </div>
              <div>
                <div className="text-zinc-500 mb-1">New Data</div>
                <pre className="bg-[#09090b] p-4 rounded-md text-green-300 border border-green-500/10 overflow-x-auto">
                  {selectedLog.new_data ? JSON.stringify(selectedLog.new_data, null, 2) : "null"}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
