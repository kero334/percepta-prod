import { createClient } from "@/lib/supabase/server";
import IntegrationsClient from "./IntegrationsClient";

export const metadata = {
  title: "Integrations & Ecosystem | Percepta",
  description: "Percepta integrates seamlessly into your existing industrial infrastructure.",
};

export default async function IntegrationsPage() {
  const supabase = await createClient();

  // Fetch all 8 datasets concurrently for speed
  const [
    { data: categories },
    { data: integrations },
    { data: protocols },
    { data: deploymentModels },
    { data: roadmap },
    { data: securityFeatures },
    { data: nodes },
    { data: connections },
    { data: faqs }
  ] = await Promise.all([
    supabase.from("integration_categories").select("*").order("display_order", { ascending: true }),
    supabase.from("integrations").select("*, category:integration_categories(*)").order("display_order", { ascending: true }),
    supabase.from("supported_protocols").select("*").order("display_order", { ascending: true }),
    supabase.from("deployment_models").select("*").order("display_order", { ascending: true }),
    supabase.from("integration_roadmap").select("*").order("display_order", { ascending: true }),
    supabase.from("security_features").select("*").order("display_order", { ascending: true }),
    supabase.from("architecture_nodes").select("*").order("display_order", { ascending: true }),
    supabase.from("architecture_connections").select("*").order("display_order", { ascending: true }),
    supabase.from("faqs").select("*").order("display_order", { ascending: true })
  ]);

  return (
    <IntegrationsClient 
      categories={categories}
      integrations={integrations}
      protocols={protocols}
      deploymentModels={deploymentModels}
      roadmap={roadmap}
      securityFeatures={securityFeatures}
      nodes={nodes}
      connections={connections}
      faqs={faqs}
    />
  );
}
