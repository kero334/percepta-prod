import { verifyAdminAccess } from "@/lib/cms/auth";
import { redirect } from "next/navigation";
import ResourceEditorClient from "../ResourceEditorClient";

export const metadata = {
  title: "Create Resource | Percepta CMS",
};

export default async function NewResourcePage() {
  const { authorized } = await verifyAdminAccess();
  if (!authorized) redirect("/admin/login");

  return (
    <div className="p-8">
      <ResourceEditorClient isNew={true} />
    </div>
  );
}
