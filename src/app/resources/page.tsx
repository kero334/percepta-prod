import { createClient } from "@/lib/supabase/server";
import ResourcesClient from "./ResourcesClient";

export const revalidate = 60; // Revalidate cache every 60 seconds

export const metadata = {
  title: "Knowledge Hub | Percepta",
  description: "Explore industrial safety insights, computer vision research, and operational guides from Percepta.",
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  
  const { data: categories } = await supabase
    .from("resource_categories")
    .select("*")
    .order("display_order", { ascending: true });

  const { data: resources } = await supabase
    .from("resources")
    .select("*, category:resource_categories(*)")
    .eq("is_hidden", false)
    .in("status", ["published", "archived"])
    .order("display_order", { ascending: true })
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  const { data: faqs } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });

  const { data: roadmapItems } = await supabase
    .from("roadmap_items")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <ResourcesClient 
      resources={resources || []} 
      faqs={faqs || []} 
      roadmapItems={roadmapItems || []} 
    />
  );
}
