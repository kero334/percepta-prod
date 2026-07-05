"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection, FadeInView, StaggerContainer, AnimatedCard } from "@/components/ui/animations";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PlatformPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden font-sans text-gray-200">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-24 relative overflow-hidden flex flex-col items-center border-b border-border/20">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl text-center">
          <FadeInView>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Platform Architecture
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Industrial Safety <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Intelligence Infrastructure</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              We are designing a unified intelligence layer built to sit on top of your existing physical infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pilot">
                <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold shadow-lg shadow-primary/20">
                  Join the Waitlist
                </Button>
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* 1.2 WHY SAFETY INTELLIGENCE MATTERS */}
      <AnimatedSection className="py-24 bg-[#111113] border-b border-border/20">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Safety Intelligence Matters</h2>
               <p className="text-lg text-muted-foreground">
                  Transforming passive monitoring into proactive operational awareness.
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-[#1a1a1c] border border-border/40 p-8 rounded-2xl flex flex-col items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                     <Icons.Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Operational Awareness</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Gain visibility into the hidden safety dynamics of your facility without requiring constant manual supervision of every camera feed.
                  </p>
               </div>
               <div className="bg-[#1a1a1c] border border-border/40 p-8 rounded-2xl flex flex-col items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                     <Icons.AlertTriangle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Hazard Visibility</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Identify systemic risks and leading indicators of accidents, allowing you to address issues before they result in injury or downtime.
                  </p>
               </div>
               <div className="bg-[#1a1a1c] border border-border/40 p-8 rounded-2xl flex flex-col items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                     <Icons.Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Supporting Safety Teams</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Empower EHS teams with automated insights, freeing them from forensic video review to focus on strategic safety culture improvements.
                  </p>
               </div>
            </div>
         </div>
      </AnimatedSection>

      {/* 2. PHASE 1: COMPUTER VISION (CURRENT RESEARCH) */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-secondary/50 border border-border/50 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Phase 1: Current Research
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Unlocking existing cameras.</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Our initial focus is developing edge-based computer vision models that aim to integrate with standard RTSP/ONVIF camera streams, maximizing the value of your existing hardware investments.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white"><strong>No Camera Replacement:</strong> Researching compatibility with standard industrial cameras.</p>
              </li>
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white"><strong>Local Edge Processing:</strong> Designed to keep heavy video workloads on-premise.</p>
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-[#121214] border border-border/40 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Icons.Camera className="w-48 h-48 text-white" />
            </div>
            <div className="relative z-10 flex flex-col gap-6">
               <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-border/30">
                  <Icons.Video className="w-8 h-8 text-white" />
                  <div>
                     <h4 className="font-bold text-white text-sm">Target Camera Input</h4>
                     <p className="text-xs text-muted-foreground">Standard RTSP / ONVIF Streams</p>
                  </div>
               </div>
               <div className="w-0.5 h-6 bg-primary/30 mx-8"></div>
               <div className="flex items-center gap-4 bg-primary/10 p-4 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                  <Icons.Cpu className="w-8 h-8 text-primary" />
                  <div>
                     <h4 className="font-bold text-white text-sm">Target Intelligence Layer</h4>
                     <p className="text-xs text-primary/70">Edge-based AI Analysis</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. TARGET DATA PIPELINE */}
      <AnimatedSection className="py-24 bg-[#111113] border-b border-border/20">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Target Data Pipeline</h2>
               <p className="text-lg text-muted-foreground">
                  Our architecture is intended to keep video local. Only crucial metadata should leave the facility.
               </p>
            </div>
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-border/30 bg-black shadow-2xl">
               <Image 
                  src="/images/platform_architecture_diagram_v3.png"
                  alt="Percepta Platform Architecture Roadmap"
                  fill
                  unoptimized
                  className="object-cover"
               />
            </div>
         </div>
      </AnimatedSection>

      {/* 4. EDGE-FIRST PHILOSOPHY */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
         <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
               <h2 className="text-3xl font-bold text-white mb-6">Edge-First Philosophy</h2>
               <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Industrial environments cannot rely on cloud latency or tolerate massive continuous outbound bandwidth. We are designing our inference models to run locally on industrial-grade edge computing devices.
               </p>
               <p className="text-muted-foreground leading-relaxed">
                  While we have not yet finalized specific hardware partnerships, our target deployment architecture involves localized nodes capable of neural network inference situated securely within your facility's network.
               </p>
            </div>
            <div className="flex-1 w-full flex justify-center">
               <div className="w-64 h-64 relative">
                  <div className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-2xl animate-spin-slow"></div>
                  <div className="absolute inset-4 bg-[#121214] border border-border/40 rounded-2xl flex items-center justify-center">
                     <Icons.Server className="w-16 h-16 text-primary" />
                  </div>
                  <div className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(52,211,153,1)]"></div>
               </div>
            </div>
         </div>
      </AnimatedSection>

      {/* 5. ACTIVE RESEARCH CHALLENGES */}
      <AnimatedSection className="py-24 bg-[#111113] border-b border-border/20">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-white mb-4">Active Research Challenges</h2>
               <p className="text-lg text-muted-foreground">
                  We are building in the open. Here are the core technical hurdles we are currently solving.
               </p>
            </div>
            <div className="space-y-6">
               <div className="bg-[#1a1a1c] border border-border/40 p-6 rounded-2xl flex items-start gap-4">
                  <Icons.Lightbulb className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                  <div>
                     <h4 className="text-lg font-bold text-white mb-2">Dynamic Industrial Lighting</h4>
                     <p className="text-muted-foreground text-sm">Industrial facilities often have harsh shadows, varied lighting conditions, and extreme glares. We are actively refining our models to improve robustness despite poor ambient illumination.</p>
                  </div>
               </div>
               <div className="bg-[#1a1a1c] border border-border/40 p-6 rounded-2xl flex items-start gap-4">
                  <Icons.Zap className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                  <div>
                     <h4 className="text-lg font-bold text-white mb-2">Low-Power Inference Optimization</h4>
                     <p className="text-muted-foreground text-sm">Running complex spatial models locally requires massive computation. We are researching quantization techniques to optimize model weights for reliable execution on standard edge devices.</p>
                  </div>
               </div>
            </div>
         </div>
      </AnimatedSection>

      {/* 6. TARGET INTEGRATIONS */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Target Ecosystem Integration</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We are designing the platform to eventually fit into existing workflows, minimizing disruption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-[#121214] border border-border/40 p-8 rounded-2xl">
             <Icons.Video className="w-10 h-10 text-white mb-6" />
             <h3 className="text-xl font-bold text-white mb-2">VMS Compatibility</h3>
             <p className="text-sm text-muted-foreground">Planned support for standard Video Management Systems to ingest feeds without disruption.</p>
          </div>
          <div className="bg-[#121214] border border-border/40 p-8 rounded-2xl">
             <Icons.Webhook className="w-10 h-10 text-primary mb-6" />
             <h3 className="text-xl font-bold text-white mb-2">Webhook Alerts</h3>
             <p className="text-sm text-muted-foreground">Designing standard JSON payload alerts to integrate easily with your existing incident management tools.</p>
          </div>
        </div>
      </AnimatedSection>

      {/* 7. BOTTOM CTA */}
      <AnimatedSection className="py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Stay informed on our progress.</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join the waitlist to receive development updates and apply for early access pilots.
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
