import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { AnimatedSection, FadeInView } from "@/components/ui/animations";
import * as Icons from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArticleMetadata from "@/components/content/ArticleMetadata";

export const revalidate = 60; // ISR validation

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { slug } = params;

  const { data: resource } = await supabase
    .from("resources")
    .select("title,description,seo_title,seo_description,is_hidden,status")
    .eq("slug", slug)
    .single();

  if (!resource || resource.is_hidden || resource.status === "draft") {
    return { title: "Not Found | Percepta" };
  }

  return {
    title: resource.seo_title || `${resource.title} | Percepta`,
    description: resource.seo_description || resource.description,
  };
}

export default async function DynamicArticlePage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { slug } = params;

  // 1. Fetch exact slug match
  const { data: resource, error: fetchError } = await supabase
    .from("resources")
    .select("*,category:resource_categories(*)")
    .eq("slug", slug)
    .single();

  // 2. If not found, check resource_redirects
  if (!resource || fetchError) {
    const { data: redirectRecord } = await supabase
      .from("resource_redirects")
      .select("new_slug")
      .eq("old_slug", slug)
      .single();

    if (redirectRecord?.new_slug) {
      redirect(`/${redirectRecord.new_slug}`);
    } else {
      notFound();
    }
  }

  // 3. Prevent access to drafts or hidden content in production
  if (resource.is_hidden || resource.status === "draft") {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden font-sans text-gray-200">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 relative overflow-hidden flex flex-col items-center border-b border-border/20">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-2xl">
          <FadeInView>
            <Link href="/resources" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <Icons.ArrowLeft className="w-4 h-4 mr-2" /> Back to Resources
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              {resource.content_type || resource.category?.name || "Article"}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.15]">
              {resource.title}
            </h1>
            <ArticleMetadata
              author={resource.author}
              publishDate={resource.published_at || resource.created_at}
              readingTime={resource.reading_time || "5 min read"}
              contentType={resource.content_type || "Devlog"}
              theme={resource.theme || "Industrial Safety Intelligence"}
              evidenceLevel={resource.evidence_level || "Opinion"}
            />
          </FadeInView>
        </div>
      </section>

      {/* 2. DOCUMENT CONTENT */}
      <AnimatedSection className="py-12 md:py-16 container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <article className="article-prose">
          {/* Real JSON mapping would happen here. For now, fallback to description/rich_content string if it's text. */}
          {resource.rich_content ? (
             <div dangerouslySetInnerHTML={{ __html: typeof resource.rich_content === 'string' ? resource.rich_content : JSON.stringify(resource.rich_content, null, 2) }} />
          ) : (
             <p className="text-lg leading-relaxed text-gray-300">
               {resource.description}
             </p>
          )}
        </article>

        {/* Author footer */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-[#121214] border border-border/40 rounded-full flex items-center justify-center">
                <Icons.User className="w-6 h-6 text-muted-foreground" />
             </div>
             <div>
                <h4 className="font-bold text-white">{resource.author}</h4>
                <p className="text-sm text-muted-foreground">Author</p>
             </div>
          </div>
          <Link href="/pilot">
            <Button variant="outline" className="border-border/50 text-white hover:bg-secondary/50">Discuss this on our waitlist</Button>
          </Link>
        </div>
      </AnimatedSection>
      
    </div>
  );
}
