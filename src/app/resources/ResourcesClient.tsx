"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection, FadeInView } from "@/components/ui/animations";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import EvidenceBadge from "@/components/content/EvidenceBadge";
import {
  THEMES,
  CONTENT_TYPES,
  EVIDENCE_LEVEL_DEFINITIONS,
  type Resource,
} from "@/lib/content-types";
import { createClient } from "@/lib/supabase/client";

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("vimeo.com")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }
  if (url.includes("loom.com")) {
    const videoId = url.split("share/")[1]?.split("?")[0];
    return `https://www.loom.com/embed/${videoId}?autoplay=1`;
  }
  return url;
};

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.FileText;
  return <IconComponent className={className} />;
};

// Filter option arrays include "All" sentinel
const THEME_FILTERS = ["All", ...THEMES] as const;
const TYPE_FILTERS = ["All", ...CONTENT_TYPES] as const;

// --- COMPONENT ---

export default function ResourcesClient({ 
  resources,
  faqs,
  roadmapItems
}: { 
  resources: any[] | null;
  faqs: any[] | null;
  roadmapItems: any[] | null;
}) {
  const allResources = resources?.filter(r => r.status !== 'draft') || [];
  
  // Separate published vs archived
  const publishedResources = allResources.filter(r => r.status !== 'archived');
  const archivedResources = allResources.filter(r => r.status === 'archived');
  
  // Categorize for Foundational vs Feed
  const foundationalDocs = publishedResources.filter(r => r.is_featured === true);
  
  // Create Supabase client
  const supabase = createClient();

  // Search Vector State
  const [dbSearchResults, setDbSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Modal State
  const [activeDocument, setActiveDocument] = useState<any>(null);

  // Filtering State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState<string>("All");
  const [activeContentType, setActiveContentType] = useState<string>("All");
  const [showArchived, setShowArchived] = useState(false);
  const [showResearchStandards, setShowResearchStandards] = useState(false);

  // Debounced search vector query
  
  useEffect(() => {
    if (!searchQuery.trim()) {
      setDbSearchResults(null);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const { data } = await supabase
        .from('resources')
        .select('*, category:resource_categories(*)')
        .eq('is_hidden', false)
        .in('status', showArchived ? ['archived'] : ['published'])
        .textSearch('search_vector', searchQuery, { type: 'websearch' });
      
      setDbSearchResults(data);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, showArchived, supabase]);

  const feedResources = dbSearchResults || publishedResources.filter(r => !r.is_featured);
  const currentArchived = dbSearchResults || archivedResources;

  const filteredFeed = useMemo(() => {
    const source = showArchived ? currentArchived : feedResources;
    return source.filter(resource => {
      const matchesTheme = activeTheme === "All" || resource.theme === activeTheme;
      const matchesType = activeContentType === "All" || resource.content_type === activeContentType;
      return matchesTheme && matchesType;
    });
  }, [feedResources, currentArchived, activeTheme, activeContentType, showArchived]);

  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const router = useRouter();

  const handleResourceClick = (resource: any) => {
    if (resource.category?.presentation_type === "video") {
      setActiveDocument(resource);
    } else if (resource.category?.presentation_type === "link") {
      window.open(resource.drive_url || resource.url, "_blank");
    } else {
      router.push(`/${resource.slug}`);
    }
  };

  // Determine which filters are active for contextual empty state messaging
  const activeFilterNames: string[] = [];
  if (activeTheme !== "All") activeFilterNames.push(activeTheme);
  if (activeContentType !== "All") activeFilterNames.push(activeContentType);
  if (showArchived) activeFilterNames.push("Archived");

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveTheme("All");
    setActiveContentType("All");
    setShowArchived(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden pb-24 font-sans text-gray-200">
      
      {/* PRESENTATION / DOCUMENT MODAL */}
      <AnimatePresence>
        {activeDocument && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-6xl h-[85vh] bg-[#121214] rounded-2xl border border-border/50 overflow-hidden flex flex-col shadow-2xl relative"
            >
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-[#121214]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DynamicIcon name={activeDocument.category?.icon || "FileText"} className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-none">{activeDocument.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">{activeDocument.category?.name || "Document"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href={activeDocument.drive_url || activeDocument.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2 border-border/50">
                      Open Externally <Icons.ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                  <Button variant="ghost" size="icon" onClick={() => setActiveDocument(null)} className="rounded-full hover:bg-red-500/10 hover:text-red-500">
                    <Icons.X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 bg-black relative">
                {activeDocument.drive_url || activeDocument.url ? (
                  <iframe 
                    src={activeDocument.category?.presentation_type === "video" ? getEmbedUrl(activeDocument.drive_url || activeDocument.url) : (activeDocument.drive_url || activeDocument.url)}
                    className="w-full h-full border-none"
                    title={activeDocument.title}
                    allow="autoplay; fullscreen; picture-in-picture"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Icons.FileDown className="w-16 h-16 mb-4 opacity-50" />
                    <p>No preview available for this document format.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 relative overflow-hidden flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 border-b border-border/20">
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <FadeInView className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            Startup Data Room & Devlog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Building in <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Public.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Open access to our research notes, foundational architecture documents, and chronological progress logs.
          </p>
          <div className="flex justify-center">
            <Link href="/pilot">
              <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold shadow-lg shadow-primary/20">
                Follow Development Updates
              </Button>
            </Link>
          </div>
        </FadeInView>
      </section>

      {/* 2. RESEARCH STANDARDS */}
      <AnimatedSection className="py-16 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
        <button 
          onClick={() => setShowResearchStandards(!showResearchStandards)}
          className="w-full flex items-center justify-between p-6 bg-[#121214] border border-border/40 rounded-2xl hover:border-primary/30 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Icons.Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Our Research Standards</h2>
              <p className="text-sm text-muted-foreground mt-1">How we classify evidence, maintain content quality, and separate facts from hypotheses.</p>
            </div>
          </div>
          <Icons.ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${showResearchStandards ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {showResearchStandards && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Content Quality Rules */}
                <div className="bg-[#111113] border border-border/30 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Icons.BookCheck className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-white">Content Quality Rules</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">No unverified claims</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">We never state performance metrics, accuracy percentages, or latency numbers unless they are explicitly validated results from our own testing.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">No marketing fluff</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">We avoid adjectives like &ldquo;revolutionary,&rdquo; &ldquo;massive,&rdquo; or &ldquo;game-changing.&rdquo; We rely on nouns and verbs. The engineering speaks for itself.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Explicit separation</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">We always distinguish between known facts, hypotheses we are testing, and future vision. Every claim is labeled accordingly.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">4</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Documentation of tradeoffs</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">We explicitly discuss what did not work, what was sacrificed, and the constraints we faced during research and development.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">5</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Disclosure of uncertainty</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">If a conclusion is not final, we say so. Early results are presented as initial findings, not definitive outcomes.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidence Hierarchy */}
                <div className="bg-[#111113] border border-border/30 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Icons.Layers className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-white">Evidence Hierarchy</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6 leading-relaxed">Every claim in our published content maps to one of the following evidence levels. Each resource is tagged with its highest applicable level.</p>
                  <div className="space-y-4">
                    {EVIDENCE_LEVEL_DEFINITIONS.map((item) => (
                      <div key={item.level} className="flex items-start gap-4">
                        <div className={`shrink-0 mt-0.5 inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${item.color}`}>
                          L{item.ordinal}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{item.level}</p>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                          <p className="text-[10px] text-muted-foreground/70 mt-1 italic">
                            Allowed in: {item.allowedIn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedSection>

      {/* 3. FOUNDATIONAL DOCUMENTS */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
         <div className="flex items-center justify-between mb-10">
            <div>
               <h2 className="text-2xl font-bold text-white mb-2">Foundational Documents</h2>
               <p className="text-muted-foreground text-sm">The core blueprints, architectural specifications, and strategic assets of Percepta.</p>
            </div>
         </div>
         
         {foundationalDocs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {foundationalDocs.map((doc) => (
                  <div 
                     key={doc.id}
                     onClick={() => handleResourceClick(doc)}
                     className="bg-[#121214] border border-border/40 p-6 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer group flex flex-col"
                  >
                     <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                           <DynamicIcon name={doc.category?.icon || "BookOpen"} className="w-6 h-6 text-primary" />
                        </div>
                        <Icons.ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{doc.title}</h3>
                     <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{doc.description}</p>
                  </div>
               ))}
            </div>
         ) : (
            <div className="w-full py-16 bg-[#111113] border border-dashed border-border/40 rounded-2xl flex flex-col items-center justify-center text-center">
               <Icons.Lock className="w-10 h-10 text-muted-foreground mb-4 opacity-50" />
               <h3 className="text-lg font-bold text-white mb-2">Data Room is currently locked</h3>
               <p className="text-sm text-muted-foreground">Foundational documents will be published shortly.</p>
            </div>
         )}
      </AnimatedSection>

      {/* 4. THE RESEARCH LOG (CHRONOLOGICAL FEED) */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">The Research Log</h2>
          <p className="text-muted-foreground text-sm">A chronological feed of model training logs, technical decisions, and company updates.</p>
        </div>

        {/* Filter Bar */}
        <div className="space-y-4 mb-10">
          {/* Row 1: Search + Archive Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111113] border border-border/40 rounded-full pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all border ${
                showArchived 
                  ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" 
                  : "bg-[#111113] text-muted-foreground border-border/40 hover:bg-secondary/50 hover:text-white"
              }`}
            >
              <Icons.Archive className="w-3.5 h-3.5" />
              {showArchived ? "Viewing Archived" : "Show Archived"}
              {archivedResources.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-black/30 rounded text-[10px]">{archivedResources.length}</span>
              )}
            </button>
          </div>

          {/* Row 2: Theme Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-2 shrink-0">Theme:</span>
            {THEME_FILTERS.map(theme => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeTheme === theme 
                    ? "bg-primary/10 text-primary border-primary/30" 
                    : "bg-[#111113] text-muted-foreground border-border/40 hover:bg-secondary/50 hover:text-white"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>

          {/* Row 3: Content Type Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-2 shrink-0">Type:</span>
            {TYPE_FILTERS.map(type => (
              <button
                key={type}
                onClick={() => setActiveContentType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeContentType === type 
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/30" 
                    : "bg-[#111113] text-muted-foreground border-border/40 hover:bg-secondary/50 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredFeed.length > 0 ? (
            <motion.div layout className="relative border-l border-border/30 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
              {filteredFeed.map((resource) => (
                <div key={resource.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] md:-left-[47px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 group-hover:scale-125 transition-transform" />
                  
                  <div 
                     className={`bg-[#111113] border border-border/30 rounded-2xl overflow-hidden hover:border-primary/50 transition-all flex flex-col cursor-pointer ${resource.status === 'archived' ? 'opacity-60 hover:opacity-100' : ''}`}
                     onClick={() => handleResourceClick(resource)}
                  >
                    <div className="p-6 md:p-8 flex flex-col">
                      {/* Top row: badges + date */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Content Type Badge */}
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50 border border-border/30 text-[10px] font-bold uppercase tracking-widest text-white">
                            <DynamicIcon name={resource.category?.icon || "Terminal"} className="w-3 h-3 text-primary" />
                            {resource.content_type || resource.category?.name || "Update"}
                          </div>
                          {/* Evidence Level Badge */}
                          {resource.evidence_level && (
                            <EvidenceBadge level={resource.evidence_level} />
                          )}
                          {/* Archived Badge */}
                          {resource.status === 'archived' && (
                            <div className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-yellow-500/80 bg-yellow-500/10 border border-yellow-500/20">
                              Archived
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground font-mono shrink-0">
                           {resource.created_at ? new Date(resource.created_at).toLocaleDateString() : 'Just now'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {resource.description}
                      </p>

                      {/* Theme tag */}
                      {resource.theme && (
                        <div className="mb-6">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium text-muted-foreground bg-black/20 border border-border/20">
                            <Icons.Tag className="w-3 h-3" /> {resource.theme}
                          </span>
                        </div>
                      )}
                      
                      {/* Optional Thumbnail for visual devlogs */}
                      {resource.thumbnail_url && (
                        <div className="w-full h-48 md:h-64 relative rounded-xl overflow-hidden mb-6 bg-black border border-border/40">
                           <Image src={resource.thumbnail_url} alt={resource.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                           {resource.category?.presentation_type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icons.Play className="w-5 h-5 text-white ml-1" />
                                 </div>
                              </div>
                           )}
                        </div>
                      )}

                      {/* Footer: metadata + CTA */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto pt-4 border-t border-border/20 gap-4">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                           {resource.author && (
                             <span className="flex items-center gap-1.5"><Icons.User className="w-3.5 h-3.5" /> {resource.author}</span>
                           )}
                           {resource.reading_time && (
                             <span className="flex items-center gap-1.5"><Icons.Clock className="w-3.5 h-3.5" /> {resource.reading_time}</span>
                           )}
                        </div>
                        <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          View Details <Icons.ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="w-full py-20 flex flex-col items-center justify-center text-center bg-[#111113] rounded-3xl border border-dashed border-border/40"
            >
              <Icons.Terminal className="w-12 h-12 text-muted-foreground mb-4 opacity-30" />
              {searchQuery ? (
                <>
                  <h3 className="text-lg font-bold text-white mb-2">No results for &ldquo;{searchQuery}&rdquo;</h3>
                  <p className="text-muted-foreground text-sm max-w-md">No resources match your search query. Try different keywords or clear the search.</p>
                </>
              ) : activeFilterNames.length > 0 ? (
                <>
                  <h3 className="text-lg font-bold text-white mb-2">No resources found</h3>
                  <p className="text-muted-foreground text-sm max-w-md">No content matches the active filters: <span className="text-white font-medium">{activeFilterNames.join(", ")}</span>. Try broadening your selection.</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-white mb-2">No logs yet</h3>
                  <p className="text-muted-foreground text-sm max-w-md">Research logs will appear here as content is published.</p>
                </>
              )}
              {isSearching && (
                 <div className="mt-6 flex items-center justify-center">
                    <Icons.Loader2 className="w-6 h-6 text-primary animate-spin" />
                 </div>
              )}
              <Button variant="outline" className="mt-6 border-border/40" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedSection>

      {/* 5. TECHNICAL FAQ */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/3">
            <h2 className="text-3xl font-bold text-white mb-4">Technical FAQ</h2>
            <p className="text-sm text-muted-foreground mb-8">Quick answers to common questions about deployment, technology, and integration.</p>
            <div className="p-6 bg-[#121214] border border-border/40 rounded-2xl">
              <h4 className="font-bold text-white mb-2">Still have questions?</h4>
              <p className="text-xs text-muted-foreground mb-6">Reach out to discuss technical specifications or request architecture docs.</p>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-border/50">
                  Contact Percepta
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            {faqs?.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-[#111113] border border-border/30 rounded-xl overflow-hidden cursor-pointer transition-all hover:border-primary/30"
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              >
                <div className="p-5 flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-white pr-8 flex items-center gap-3">
                    <Icons.Cpu className="w-4 h-4 text-primary shrink-0" /> {faq.question}
                  </h4>
                  <Icons.ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${openFaq === faq.id ? "rotate-180" : ""}`} />
                </div>
                <div 
                  className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === faq.id ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-xs text-gray-400 pl-7 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
