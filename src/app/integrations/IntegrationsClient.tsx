"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection, FadeInView, StaggerContainer, AnimatedCard } from "@/components/ui/animations";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Dynamic Icon Component
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.Settings;
  return <IconComponent className={className} />;
};

// Status Badge Component
const getStatusBadge = (status: string) => {
  return <span className="bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Planned</span>;
};

import {
  FALLBACK_CATEGORIES,
  FALLBACK_INTEGRATIONS,
  FALLBACK_PROTOCOLS,
  FALLBACK_MODELS,
  FALLBACK_SECURITY,
  FALLBACK_NODES,
  FALLBACK_ROADMAP,
  FALLBACK_FAQS
} from "./fallbackData";

export default function IntegrationsClient({ 
  categories: dbCategories, 
  integrations: dbIntegrations, 
  protocols: dbProtocols, 
  deploymentModels: dbModels, 
  roadmap: dbRoadmap, 
  securityFeatures: dbSecurity, 
  nodes: dbNodes, 
  connections: dbConnections, 
  faqs: dbFaqs 
}: any) {
  
  // MERGE DATABASE DATA WITH ENTERPRISE FALLBACK DATA
  const activeCategories = useMemo(() => (dbCategories && dbCategories.length > 0) ? dbCategories : FALLBACK_CATEGORIES, [dbCategories]);
  const activeIntegrations = useMemo(() => (dbIntegrations && dbIntegrations.length > 0) ? dbIntegrations : FALLBACK_INTEGRATIONS, [dbIntegrations]);
  const activeProtocols = useMemo(() => (dbProtocols && dbProtocols.length > 0) ? dbProtocols : FALLBACK_PROTOCOLS, [dbProtocols]);
  const activeModels = useMemo(() => (dbModels && dbModels.length > 0) ? dbModels : FALLBACK_MODELS, [dbModels]);
  const activeSecurity = useMemo(() => (dbSecurity && dbSecurity.length > 0) ? dbSecurity : FALLBACK_SECURITY, [dbSecurity]);
  const activeNodes = useMemo(() => (dbNodes && dbNodes.length > 0) ? dbNodes : FALLBACK_NODES, [dbNodes]);
  const activeRoadmap = useMemo(() => (dbRoadmap && dbRoadmap.length > 0) ? dbRoadmap : FALLBACK_ROADMAP, [dbRoadmap]);
  const activeFaqs = useMemo(() => (dbFaqs && dbFaqs.length > 0) ? dbFaqs : FALLBACK_FAQS, [dbFaqs]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string>("All");

  const filteredIntegrations = useMemo(() => {
    return activeIntegrations.filter((integration: any) => {
      const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (integration.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategoryId === "All" || integration.category_id === activeCategoryId;
      return matchesSearch && matchesCategory;
    });
  }, [activeIntegrations, searchQuery, activeCategoryId]);

  const featuredIntegrations = useMemo(() => activeIntegrations.filter((i: any) => i.is_featured), [activeIntegrations]);

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden pb-24 font-sans text-gray-200">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-24 relative overflow-hidden flex flex-col items-center border-b border-border/20">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                Research & Development Phase
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                Planned Future <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Architecture</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                I am designing the Percepta platform with the goal of eventually integrating with existing cameras and video systems without requiring hardware replacements.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/pilot">
                  <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground text-base font-semibold hover:bg-primary/90">
                    Join Pilot Waitlist
                  </Button>
                </Link>
                <Link href="#architecture">
                  <Button variant="outline" size="lg" className="h-12 px-8 border-border/50 text-white hover:bg-secondary/50">
                    View Proposed Architecture
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Side Visual */}
            <div className="flex-1 w-full relative">
              <div className="bg-[#121214]/80 backdrop-blur-sm border border-border/40 p-8 rounded-3xl relative overflow-hidden shadow-2xl opacity-70">
                <div className="flex flex-col gap-6 relative z-10">
                   <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-border/30">
                      <Icons.Video className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-bold text-white text-sm">Target Camera Input</h4>
                        <p className="text-xs text-muted-foreground">Proposed RTSP</p>
                      </div>
                   </div>
                   <div className="w-0.5 h-6 bg-primary/30 mx-8"></div>
                   <div className="flex items-center gap-4 bg-primary/10 p-4 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                      <Icons.Server className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-bold text-white text-sm">Planned Edge Node</h4>
                        <p className="text-xs text-primary/70">Local AI Processing</p>
                      </div>
                   </div>
                   <div className="w-0.5 h-6 bg-primary/30 mx-8"></div>
                   <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-border/30">
                      <Icons.BellRing className="w-8 h-8 text-white" />
                      <div>
                        <h4 className="font-bold text-white text-sm">Target Output</h4>
                        <p className="text-xs text-muted-foreground">Alert Webhooks</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY */}
      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-7xl border-b border-border/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Architecture Philosophy</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The architecture is being designed around minimizing friction for IT and Operations teams.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl">
            <Icons.Layers className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-bold text-white mb-2">Designed for Existing Infra</h4>
            <p className="text-sm text-muted-foreground">Aiming to sit on top of current networks.</p>
          </div>
          <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl">
            <Icons.VideoOff className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-bold text-white mb-2">No Camera Replacement</h4>
            <p className="text-sm text-muted-foreground">The goal is to analyze existing passive cameras.</p>
          </div>
          <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl">
            <Icons.Settings2 className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-bold text-white mb-2">Planned Deployment Options</h4>
            <p className="text-sm text-muted-foreground">Researching on-premise and hybrid configurations.</p>
          </div>
          <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl">
            <Icons.Rocket className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-bold text-white mb-2">Pilot Testing</h4>
            <p className="text-sm text-muted-foreground">Will be tested in limited facilities first.</p>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. HOW PERCEPTA FITS (ARCHITECTURE) */}
      <AnimatedSection id="architecture" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-7xl border-b border-border/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Proposed Data Flow</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A planned pipeline from passive hardware to actionable intelligence.</p>
        </div>
        
        <div className="relative bg-[#111113] p-12 rounded-3xl border border-border/30 overflow-x-auto opacity-70">
          <div className="flex items-center justify-between min-w-[800px] gap-8 relative z-10">
             {[1, 2, 3, 4, 5].map((tierIndex, i, arr) => {
               const tierNodes = activeNodes.filter((n: any) => n.tier === tierIndex).sort((a: any, b: any) => a.display_order - b.display_order);
               if (tierNodes.length === 0) return null;
               
               return (
                 <div key={`tier-${tierIndex}`} className="flex flex-col items-center gap-6 relative flex-1">
                    {tierNodes.map((node: any) => (
                      <div key={node.id} className="bg-black/60 border border-border/40 rounded-2xl p-6 w-full text-center hover:border-primary/50 transition-colors shadow-lg z-20">
                         <div className="w-12 h-12 mx-auto bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-4">
                            <DynamicIcon name={node.icon || "Server"} className="w-6 h-6 text-primary" />
                         </div>
                         <h4 className="font-bold text-white text-sm">Planned: {node.label}</h4>
                      </div>
                    ))}
                    
                    {i < arr.length - 1 && activeNodes.some((n: any) => n.tier === arr[i+1]) && (
                      <div className="absolute top-1/2 -right-8 w-16 -translate-y-1/2 flex items-center justify-center z-0">
                         <div className="w-full border-t-2 border-dashed border-primary/40"></div>
                         <Icons.ChevronRight className="w-5 h-5 text-primary/60 -ml-3 bg-[#111113]" />
                      </div>
                    )}
                 </div>
               )
             })}
          </div>
        </div>
      </AnimatedSection>

      {/* 5. WHAT STAYS ON-PREMISE? */}
      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-5xl border-b border-border/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Target On-Premise Boundaries</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The goal is to process video locally and only transmit metadata.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 opacity-70">
           <div className="flex-1 bg-[#121214] border border-border/30 rounded-2xl p-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Icons.Building className="w-5 h-5" /> Local Facility (Planned)</h3>
             <ul className="space-y-4">
               <li className="flex items-center gap-3 text-sm text-muted-foreground"><Icons.Circle className="w-4 h-4 text-white" /> Raw Video Feeds</li>
               <li className="flex items-center gap-3 text-sm text-muted-foreground"><Icons.Circle className="w-4 h-4 text-white" /> Percepta Edge Appliance</li>
               <li className="flex items-center gap-3 text-sm text-muted-foreground"><Icons.Circle className="w-4 h-4 text-white" /> AI Inference & Processing</li>
             </ul>
           </div>
           
           <div className="hidden md:flex items-center justify-center">
             <Icons.ArrowRight className="w-8 h-8 text-primary" />
           </div>

           <div className="flex-1 bg-primary/5 border border-primary/20 rounded-2xl p-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Icons.Cloud className="w-5 h-5 text-primary" /> Transmitted to Cloud (Planned)</h3>
             <ul className="space-y-4">
               <li className="flex items-center gap-3 text-sm text-muted-foreground"><Icons.Circle className="w-4 h-4 text-primary" /> Safety Alert Metadata</li>
               <li className="flex items-center gap-3 text-sm text-muted-foreground"><Icons.Circle className="w-4 h-4 text-primary" /> System Health Telemetry</li>
             </ul>
           </div>
        </div>
      </AnimatedSection>

      {/* 9. SUPPORTED INPUTS & PROTOCOLS */}
      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-7xl border-b border-border/10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Target Protocols</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">I am building the platform to eventually support standard protocols for compatibility.</p>
          </div>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeProtocols.map((protocol: any) => (
            <AnimatedCard key={protocol.id} className="bg-[#121214] border border-border/40 p-6 rounded-2xl hover:border-primary/50 transition-colors flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-secondary/30 rounded-lg flex items-center justify-center">
                   <Icons.Network className="w-5 h-5 text-white" />
                </div>
                {getStatusBadge(protocol.status)}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{protocol.name}</h3>
              <p className="text-sm text-muted-foreground flex-1">Planned support for {protocol.name}.</p>
            </AnimatedCard>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* 10. TARGET INTEGRATIONS */}
      <AnimatedSection id="library" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-7xl border-b border-border/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Target Integrations</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Systems I plan to evaluate for future integration capabilities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredIntegrations.map((integration: any) => (
            <div key={integration.id} className="bg-[#111113] border border-border/30 p-5 rounded-xl flex flex-col hover:border-border/60 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 bg-black border border-border/30 rounded-lg flex items-center justify-center shrink-0">
                    {integration.logo_url ? <Image src={integration.logo_url} alt={integration.name} width={24} height={24} className="object-contain" /> : <DynamicIcon name={activeCategories.find((c: any) => c.id === integration.category_id)?.icon || "Box"} className="w-5 h-5 text-muted-foreground" />}
                 </div>
                 <div className="min-w-0">
                   <h4 className="font-bold text-white text-sm truncate">{integration.name}</h4>
                   <p className="text-[10px] text-muted-foreground truncate">{activeCategories.find((c: any) => c.id === integration.category_id)?.name}</p>
                 </div>
              </div>
              <div className="mt-auto flex justify-between items-center">
                 {getStatusBadge(integration.status)}
              </div>
            </div>
          ))}
          {filteredIntegrations.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-[#111113] rounded-2xl border border-dashed border-border/40">
              No target integrations found matching your criteria.
            </div>
          )}
        </div>
      </AnimatedSection>
      
    </div>
  );
}
