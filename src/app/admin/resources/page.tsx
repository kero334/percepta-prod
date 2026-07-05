import { verifyAdminAccess } from "@/lib/cms/auth";
import { redirect } from "next/navigation";
import { getResourcesWithAdvancedSearch } from "@/lib/cms/resource-actions";
import { getSavedFilters } from "@/lib/cms/saved-filters-actions";
import ResourcesTableClient from "./ResourcesTableClient";

export const metadata = {
  title: "Manage Resources | Percepta Admin",
};

export default async function AdminResourcesPage({ searchParams }: { searchParams: { q?: string, status?: string, type?: string, theme?: string, evidence?: string } }) {
  const { authorized } = await verifyAdminAccess();
  if (!authorized) redirect("/admin/login");

  const query = searchParams.q || "";
  const filters = {
    status: searchParams.status || "",
    content_type: searchParams.type || "",
    theme: searchParams.theme || "",
    evidence_level: searchParams.evidence || ""
  };

  const resources = await getResourcesWithAdvancedSearch(query, filters);
  const savedFilters = await getSavedFilters();

  return (
    <div className="p-8">
      <ResourcesTableClient 
        initialResources={resources || []} 
        savedFilters={savedFilters || []}
        currentQuery={query}
        currentFilters={filters}
      />
    </div>
  );
}
