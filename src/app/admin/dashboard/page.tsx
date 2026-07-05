import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "@/lib/cms/auth";
import { redirect } from "next/navigation";
import * as Icons from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Dashboard | Percepta Admin",
};

export default async function AdminDashboard() {
  const { authorized, role } = await verifyAdminAccess();
  if (!authorized) redirect("/admin/login");

  const supabase = await createClient();

  // Aggregate counts
  const { count: totalResources } = await supabase.from("resources").select("*", { count: "exact", head: true });
  const { count: draftCount } = await supabase.from("resources").select("*", { count: "exact", head: true }).eq("status", "draft");
  const { count: reviewCount } = await supabase.from("resources").select("*", { count: "exact", head: true }).eq("status", "review");
  const { count: publishedCount } = await supabase.from("resources").select("*", { count: "exact", head: true }).eq("status", "published");
  const { count: archivedCount } = await supabase.from("resources").select("*", { count: "exact", head: true }).eq("status", "archived");

  // Feeds
  const { data: recentlyPublished } = await supabase.from("resources")
    .select("id, title, slug, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(5);

  const { data: recentlyUpdated } = await supabase.from("resources")
    .select("id, title, slug, updated_at")
    .order("updated_at", { ascending: false })
    .limit(5);

  // Phase 3 Governance Metrics: Review Queue Analysis
  const { data: reviewItems } = await supabase.from("resources")
    .select("id, title, updated_at")
    .eq("status", "review");

  let totalDaysInReview = 0;
  let staleReviewCount = 0;
  const now = new Date();

  reviewItems?.forEach(item => {
    const days = (now.getTime() - new Date(item.updated_at).getTime()) / (1000 * 3600 * 24);
    totalDaysInReview += days;
    if (days > 14) {
      staleReviewCount++;
    }
  });

  const averageReviewAge = reviewItems && reviewItems.length > 0 
    ? Math.round(totalDaysInReview / reviewItems.length) 
    : 0;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {role}.</p>
        </div>
        <Link href="/admin/resources/new">
          <Button className="bg-primary text-black hover:bg-primary/90">
            <Icons.Plus className="w-4 h-4 mr-2" />
            New Resource
          </Button>
        </Link>
      </div>

      {/* Aggregate Counts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Resources", value: totalResources || 0, icon: Icons.Files },
          { label: "Drafts", value: draftCount || 0, icon: Icons.FileEdit },
          { label: "In Review", value: reviewCount || 0, icon: Icons.Eye },
          { label: "Published", value: publishedCount || 0, icon: Icons.Globe },
          { label: "Archived", value: archivedCount || 0, icon: Icons.Archive },
        ].map((stat, i) => (
          <div key={i} className="bg-[#121214] border border-border/20 p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Governance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-[#121214] border border-border/20 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Icons.Clock className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-medium">Review Queue Age</h3>
          </div>
          <p className="text-3xl font-bold text-white">{averageReviewAge} <span className="text-sm font-normal text-muted-foreground">days avg</span></p>
        </div>
        
        <div className="bg-[#121214] border border-border/20 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Icons.AlertTriangle className={`w-5 h-5 ${staleReviewCount > 0 ? "text-yellow-500" : "text-green-500"}`} />
            <h3 className="text-white font-medium">Stale Reviews (&gt;14d)</h3>
          </div>
          <p className={`text-3xl font-bold ${staleReviewCount > 0 ? "text-yellow-500" : "text-green-500"}`}>
            {staleReviewCount} <span className="text-sm font-normal text-muted-foreground">items</span>
          </p>
        </div>

        <div className="bg-[#121214] border border-border/20 p-6 rounded-xl flex flex-col justify-center">
          <Link href="/admin/review">
            <Button className="w-full bg-primary text-black hover:bg-primary/90">
              Go to Review Center
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recently Published */}
        <div className="bg-[#121214] border border-border/20 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/20 bg-[#18181b]">
            <h2 className="font-semibold text-white">Recently Published</h2>
          </div>
          <div className="divide-y divide-border/10">
            {recentlyPublished?.map((res) => (
              <div key={res.id} className="p-4 px-6 flex justify-between items-center">
                <div>
                  <Link href={`/admin/resources/${res.id}/edit`} className="text-white hover:text-primary transition-colors font-medium">
                    {res.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">/{res.slug}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(res.published_at || "").toLocaleDateString()}
                </div>
              </div>
            ))}
            {(!recentlyPublished || recentlyPublished.length === 0) && (
              <div className="p-8 text-center text-muted-foreground text-sm">No published resources yet.</div>
            )}
          </div>
        </div>

        {/* Recently Updated */}
        <div className="bg-[#121214] border border-border/20 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/20 bg-[#18181b]">
            <h2 className="font-semibold text-white">Recently Updated</h2>
          </div>
          <div className="divide-y divide-border/10">
            {recentlyUpdated?.map((res) => (
              <div key={res.id} className="p-4 px-6 flex justify-between items-center">
                <div>
                  <Link href={`/admin/resources/${res.id}/edit`} className="text-white hover:text-primary transition-colors font-medium">
                    {res.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">/{res.slug}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(res.updated_at || "").toLocaleDateString()}
                </div>
              </div>
            ))}
             {(!recentlyUpdated || recentlyUpdated.length === 0) && (
              <div className="p-8 text-center text-muted-foreground text-sm">No resources found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
