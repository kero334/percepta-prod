"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection, FadeInView, StaggerContainer, AnimatedCard } from "@/components/ui/animations";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function RoadmapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden font-sans text-gray-200">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 relative overflow-hidden flex flex-col items-center border-b border-border/20">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl text-center">
          <FadeInView>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Building in the Open
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Our Research Trajectory <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">and Product Roadmap</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
              We believe in extreme transparency. Here is exactly what we are actively researching, what we plan to integrate next, and our long-term foundational vision.
            </p>
            <div className="flex flex-col items-center gap-6 mt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121214] border border-border/40 shadow-sm">
                <Icons.Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Last Updated: <strong className="text-white">July 2026</strong>
                </span>
              </div>
              
              <div className="w-full max-w-2xl bg-[#121214] border border-border/30 rounded-xl p-6 text-left">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/20">
                  <Icons.History className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-white">Roadmap Changelog</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="min-w-[100px] text-sm text-muted-foreground font-mono mt-0.5">July 2026</div>
                    <div className="text-sm text-gray-300">Initial public roadmap published. Focused on edge hardware benchmarking and dynamic lighting research.</div>
                  </div>
                  {/* Future updates added here */}
                </div>
              </div>
              
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl max-w-3xl mx-auto text-left flex items-start gap-3 mt-4">
                 <Icons.Info className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                 <p className="text-xs text-yellow-500/80 leading-relaxed">
                    <strong>Disclaimer:</strong> This roadmap represents our active research priorities and long-term vision. It is a living document. Timelines and feature targets are subject to change based on design partner feedback, hardware evaluations, and ongoing R&D discoveries.
                 </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* 2. KANBAN ROADMAP */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* NOW COLUMN */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-primary/30">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <h2 className="text-xl font-bold text-white tracking-tight">NOW</h2>
               </div>
               <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">Active R&D</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">The technical hurdles we are currently writing code for and testing.</p>
            
            <div className="bg-[#121214] border border-primary/30 p-6 rounded-2xl shadow-[0_0_15px_rgba(52,211,153,0.05)]">
               <Icons.Network className="w-6 h-6 text-primary mb-4" />
               <h3 className="text-base font-bold text-white mb-2">RTSP/ONVIF Pipeline Architecture</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">Building the ingestion engine to pull streams from standard IP cameras without dropping frames.</p>
            </div>

            <div className="bg-[#121214] border border-primary/30 p-6 rounded-2xl shadow-[0_0_15px_rgba(52,211,153,0.05)]">
               <Icons.Sun className="w-6 h-6 text-primary mb-4" />
               <h3 className="text-base font-bold text-white mb-2">Model Robustness (Dynamic Lighting)</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">Tuning detection models to maintain confidence scores despite harsh industrial glares and shadows.</p>
            </div>

            <div className="bg-[#121214] border border-primary/30 p-6 rounded-2xl shadow-[0_0_15px_rgba(52,211,153,0.05)]">
               <Icons.Cpu className="w-6 h-6 text-primary mb-4" />
               <h3 className="text-base font-bold text-white mb-2">Edge Hardware Benchmarking</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">Evaluating inference speeds, thermal throttling, and power draw on industrial-grade edge inference hardware.</p>
            </div>
          </div>

          {/* NEXT COLUMN */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-blue-500/30">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <h2 className="text-xl font-bold text-white tracking-tight">NEXT</h2>
               </div>
               <span className="text-xs font-semibold text-blue-500/80 uppercase tracking-wider">Planned</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Features architected but awaiting core model stabilization.</p>
            
            <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl">
               <Icons.Webhook className="w-6 h-6 text-blue-500 mb-4" />
               <h3 className="text-base font-bold text-white mb-2">JSON Webhook Architecture</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">Developing standardized egress payloads so Percepta can securely fire alerts into third-party incident management systems.</p>
            </div>

            <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl">
               <Icons.Video className="w-6 h-6 text-blue-500 mb-4" />
               <h3 className="text-base font-bold text-white mb-2">VMS Passive Integration Testing</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">Ensuring our edge nodes can pull streams alongside massive Video Management Systems without causing network degradation.</p>
            </div>

            <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl">
               <Icons.Users className="w-6 h-6 text-blue-500 mb-4" />
               <h3 className="text-base font-bold text-white mb-2">Design Partner Discovery</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">Moving from controlled dataset testing to live, sandboxed feasibility studies with early partners in the MENA region.</p>
            </div>
          </div>

          {/* LATER COLUMN */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/30">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <h2 className="text-xl font-bold text-white tracking-tight">LATER</h2>
               </div>
               <span className="text-xs font-semibold text-purple-500/80 uppercase tracking-wider">Horizon</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">The foundational technologies for a unified intelligence platform.</p>
            
            <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl opacity-80">
               <Icons.Thermometer className="w-6 h-6 text-purple-500 mb-4" />
               <h3 className="text-base font-bold text-white mb-2">Environmental Sensor Fusion</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">Architecting the local network infrastructure to ingest API data from IoT gas monitors and temperature sensors.</p>
            </div>

            <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl opacity-80">
               <Icons.Watch className="w-6 h-6 text-purple-500 mb-4" />
               <h3 className="text-base font-bold text-white mb-2">Wearable Proximity Logic</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">Researching protocols to combine visual bounding-box data with UWB (Ultra-Wideband) wearable beacons for multi-layered hazard warnings.</p>
            </div>
          </div>

        </div>
      </AnimatedSection>

      {/* 3. CTA */}
      <AnimatedSection className="py-24 relative overflow-hidden text-center border-t border-border/20">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-6">Want to influence this roadmap?</h2>
          <p className="text-lg text-muted-foreground mb-10">
            We are actively talking to safety leaders and operations managers. Join the waitlist to get involved.
          </p>
          <Link href="/pilot">
            <Button size="lg" className="h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20">
              Join the Waitlist
            </Button>
          </Link>
        </div>
      </AnimatedSection>

    </div>
  );
}
