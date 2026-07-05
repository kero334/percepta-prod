"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection, FadeInView, StaggerContainer, AnimatedCard } from "@/components/ui/animations";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function UseCasesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden font-sans text-gray-200">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-24 relative overflow-hidden flex flex-col items-center border-b border-border/20">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl text-center">
          <FadeInView>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Potential Applications
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Translating intelligence into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">operational safety.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              We are actively training our computer vision models to identify the leading indicators of industrial accidents, delivering continuous operational visibility.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pilot">
                <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold shadow-lg shadow-primary/20">
                  Request Pilot Access
                </Button>
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* 2. USE CASE 1: RESTRICTED ZONES */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden border border-border/30 bg-black shadow-2xl">
             <Image 
                src="/images/use_case_restricted_zone.png"
                alt="Restricted Zone Monitoring"
                fill
                className="object-cover"
             />
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Restricted Zone Monitoring</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Industrial facilities contain highly hazardous areas—from chemical storage to heavy machinery paths. We are designing models to monitor these invisible boundaries and instantly detect unauthorized pedestrian access.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white"><strong>Dynamic Boundaries:</strong> The ability to map digital safety perimeters over existing video feeds.</p>
              </li>
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white"><strong>Real-Time Alerts:</strong> Generating instant notifications when a person crosses a hazard threshold.</p>
              </li>
            </ul>
            <div className="mt-8 inline-block px-3 py-1.5 bg-secondary/50 rounded-lg text-xs uppercase font-bold text-muted-foreground border border-border/50">
              Status: Model In Development
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. USE CASE 2: PPE COMPLIANCE */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20 bg-[#111113]">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">PPE Compliance Monitoring</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Personal Protective Equipment is the last line of defense. Our models are being trained to automatically identify missing hardhats and high-visibility vests before workers enter active operational zones.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white"><strong>Automated Spot Checks:</strong> Continuous monitoring at entry points and high-risk zones.</p>
              </li>
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white"><strong>Privacy-First Detection:</strong> Identifying the presence or absence of equipment, not the identity of the worker.</p>
              </li>
            </ul>
            <div className="mt-8 inline-block px-3 py-1.5 bg-secondary/50 rounded-lg text-xs uppercase font-bold text-muted-foreground border border-border/50">
              Status: Model In Development
            </div>
          </div>
          <div className="flex-1 w-full relative aspect-[4/3] rounded-3xl overflow-hidden border border-border/30 bg-black shadow-2xl">
             <Image 
                src="/images/use_case_ppe.png"
                alt="PPE Compliance Detection"
                fill
                className="object-cover"
             />
          </div>
        </div>
      </AnimatedSection>

      {/* 4. USE CASE 3: WORKER-MACHINERY PROXIMITY */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden border border-border/30 bg-black shadow-2xl">
             <Image 
                src="/images/use_case_proximity.png"
                alt="Worker-Machinery Proximity Detection"
                fill
                className="object-cover"
             />
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Worker-Machinery Proximity</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Forklift and heavy machinery collisions are among the most severe industrial accidents. We are researching spatial intelligence capabilities to calculate dangerous proximity between pedestrians and moving vehicles.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white"><strong>Safety Radius Monitoring:</strong> Defining acceptable distances between workers and active machinery.</p>
              </li>
              <li className="flex items-start gap-3">
                <Icons.CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p className="text-white"><strong>Near-Miss Logging:</strong> Documenting proximity events that don't result in an injury to identify systemic layout risks.</p>
              </li>
            </ul>
            <div className="mt-8 inline-block px-3 py-1.5 bg-secondary/50 rounded-lg text-xs uppercase font-bold text-muted-foreground border border-border/50">
              Status: Research Phase
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. FUTURE VISION: ENVIRONMENTAL & BEHAVIORAL */}
      <AnimatedSection className="py-24 bg-[#111113] border-b border-border/20 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <Icons.Radio className="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold text-white mb-6">Expanding the Ecosystem</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Vision is only the first step. Our long-term roadmap includes integrating environmental sensors and industrial wearables to detect contextual hazards—from atmospheric changes and chemical spills to localized temperature anomalies.
          </p>
        </div>
      </AnimatedSection>

      {/* 6. BOTTOM CTA */}
      <AnimatedSection className="py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Deploy these models in your facility.</h2>
          <p className="text-lg text-muted-foreground mb-10">
            We are actively looking for design partners to test these capabilities in real-world environments.
          </p>
          <Link href="/pilot">
            <Button size="lg" className="h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20">
              Request Pilot Access
            </Button>
          </Link>
        </div>
      </AnimatedSection>

    </div>
  );
}
