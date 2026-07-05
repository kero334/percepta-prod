"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection, FadeInView, StaggerContainer, AnimatedCard } from "@/components/ui/animations";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden font-sans text-gray-200">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-24 relative overflow-hidden flex flex-col items-center border-b border-border/20">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl text-center">
          <FadeInView>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Core Principles
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Privacy by Design. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Security by Architecture.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              We care about the hazard, not the individual. Privacy is not a feature we plan to add later; it is engineered into the foundation of our research.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold shadow-lg shadow-primary/20">
                  Contact the Founder
                </Button>
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* 2. CORE PRINCIPLE: NO SURVEILLANCE */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Intelligence, not surveillance.</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Our philosophy explicitly rejects biometric tracking and employee micromanagement. We are training our computer vision models to track the *risk condition*—such as a missing hardhat or proximity to a dangerous machine—without needing to know the identity of the worker.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white"><strong>No Facial Recognition:</strong> Our models are not trained to identify individuals.</p>
              </li>
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white"><strong>Event-Based Focus:</strong> We log the hazard event, not continuous behavioral surveillance.</p>
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-[#121214] border border-border/40 p-8 rounded-3xl relative overflow-hidden text-center flex flex-col items-center justify-center shadow-2xl min-h-[400px]">
             <Icons.UserX className="w-24 h-24 text-red-400 mb-6 opacity-80" />
             <h3 className="text-2xl font-bold text-white mb-4">Biometrics Rejected</h3>
             <p className="text-sm text-muted-foreground max-w-xs">We do not develop or deploy facial recognition technology in our safety platform.</p>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. EDGE PROCESSING VISION (DIAGRAM) */}
      <AnimatedSection className="py-24 bg-[#111113] border-b border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Local Processing Vision</h2>
            <p className="text-lg text-muted-foreground">
              Our goal is to process video locally so raw footage never hits the cloud. By the time data leaves your facility, it is purely metadata.
            </p>
          </div>

          <div className="w-full relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-border/30 bg-black shadow-2xl">
             {/* Generated Privacy By Design Diagram */}
             <Image 
                src="/images/privacy_by_design_diagram_v4.png"
                alt="Privacy by Design Data Flow"
                fill
                unoptimized
                className="object-cover"
             />
          </div>
        </div>
      </AnimatedSection>

      {/* 4. DATA LIFECYCLE PHILOSOPHY */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <Icons.Database className="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
        <h2 className="text-3xl font-bold text-white mb-6">Data Lifecycle Philosophy</h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
          As we build the Percepta infrastructure, our approach to data is fundamentally minimalist. We believe that storing vast amounts of raw video is a security liability. Our architecture is being designed around the concept of immediate inference and ephemeral raw data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
           <div className="bg-[#121214] border border-border/40 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                 <Icons.ShieldAlert className="w-5 h-5 text-primary" /> Risk Events (Metadata)
              </h3>
              <p className="text-sm text-muted-foreground">Alert payloads containing timestamps, location IDs, and the hazard type (e.g., "PPE Violation") are intended to be securely stored for analytics and compliance reporting.</p>
           </div>
           <div className="bg-[#121214] border border-border/40 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                 <Icons.VideoOff className="w-5 h-5 text-red-400" /> Raw Video Data
              </h3>
              <p className="text-sm text-muted-foreground">Frames analyzed by the edge nodes are designed to be discarded immediately after inference unless explicitly configured otherwise by the facility's localized policies.</p>
           </div>
        </div>
      </AnimatedSection>

    </div>
  );
}
