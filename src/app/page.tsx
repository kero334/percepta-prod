"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection, FadeInView, StaggerContainer, AnimatedCard } from "@/components/ui/animations";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DashboardMockup from "@/components/shared/DashboardMockup";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden font-sans text-gray-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-70 animate-pulse-slow" />
          <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] opacity-50" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" opacity-20 />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Hero Copy */}
            <div className="flex-1 text-left lg:max-w-2xl">
              <FadeInView>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                  Research & Development Phase
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                  Building the future of <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                    proactive industrial safety.
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                  Percepta is an early-stage startup researching and developing AI models to turn passive environments into active safety intelligence networks.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/pilot">
                    <Button size="lg" className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105">
                      Join the Pilot Waitlist
                    </Button>
                  </Link>
                  <Link href="/manifesto">
                    <Button variant="outline" size="lg" className="h-14 px-8 border-border/50 text-white hover:bg-secondary/50 text-base font-semibold transition-all">
                      Read the Manifesto
                    </Button>
                  </Link>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground opacity-70">
                    Currently in active R&D. Built by Kerollos Karam.
                  </p>
                </div>
              </FadeInView>
            </div>

            {/* Hero Visual */}
            <div className="flex-1 w-full relative lg:h-[600px] flex items-center justify-center">
              <FadeInView delay={0.2} className="relative w-full aspect-square max-w-[600px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-3xl blur-2xl transform rotate-3" />
                <div className="relative w-full h-full rounded-3xl border border-border/50 bg-[#121214]/80 backdrop-blur-sm overflow-hidden shadow-2xl flex flex-col">
                  {/* Generated Industrial Safety Hero Image */}
                  <div className="relative w-full flex-1 bg-black">
                    <Image 
                      src="/images/hero_industrial_safety.png" 
                      alt="Futuristic Industrial Safety Interface" 
                      fill
                      className="object-cover opacity-80 mix-blend-screen"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent" />
                     <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                           <span className="text-xs font-bold text-primary uppercase tracking-wider">AI Vision Layer Active</span>
                        </div>
                        <p className="text-sm text-white font-medium">Detecting leading risk indicators across Sector 4.</p>
                     </div>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM STATEMENT */}
      <AnimatedSection className="py-24 bg-[#111113] border-y border-border/20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Industrial safety is fundamentally <span className="text-red-400">reactive.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, most industrial environments rely on cameras to record accidents and human supervisors to hopefully spot hazards before they cause harm. The result is a cycle where safety teams are always one step behind.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                   <Icons.XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                   <p className="text-white">Cameras only provide historical records of incidents.</p>
                </li>
                <li className="flex items-start gap-3">
                   <Icons.XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                   <p className="text-white">Human monitoring cannot cover thousands of square feet simultaneously.</p>
                </li>
                <li className="flex items-start gap-3">
                   <Icons.XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                   <p className="text-white">Risks are documented only after an injury occurs.</p>
                </li>
              </ul>
            </div>
            
            <div className="flex-1 w-full relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-border/30 bg-black">
              {/* Split Screen Infographic CSS Layout */}
              <div className="absolute inset-0 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-1/2 md:h-full bg-zinc-900 border-b md:border-b-0 md:border-r border-border/50 p-6 md:p-8 flex flex-col justify-between opacity-80">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">The Past</span>
                  <div className="flex-1 flex flex-col items-center justify-center py-4">
                    <Icons.Video className="w-12 h-12 md:w-16 md:h-16 text-zinc-600 mb-4" />
                    <p className="text-zinc-500 font-semibold text-center text-sm md:text-base">Passive Recording</p>
                  </div>
                  <div className="w-full p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center font-mono">
                    INCIDENT_LOGGED :: 14:02:45
                  </div>
                </div>
                <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#121214] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.08)_0%,transparent_70%)] group-hover:bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.15)_0%,transparent_70%)] transition-colors duration-1000" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary relative z-10 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                     The Future
                  </span>
                  <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-4">
                    <Icons.ShieldAlert className="w-12 h-12 md:w-16 md:h-16 text-primary mb-4" />
                    <p className="text-white font-semibold text-center text-sm md:text-base">Proactive Detection</p>
                  </div>
                  <div className="w-full p-3 bg-primary/20 border border-primary/30 rounded-lg text-primary text-xs text-center relative z-10 font-mono shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                    RISK_MITIGATED :: 14:01:12
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. THE VISION (HOW IT WORKS) */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Bridging AI and physical operations.</h2>
          <p className="text-lg text-muted-foreground">
            We are designing a foundational safety intelligence infrastructure. The goal is to ingest video from existing cameras and process it locally to detect leading risk indicators in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-border/10 via-primary/30 to-border/10 -translate-y-1/2 z-0" />
          
          <div className="bg-[#121214] border border-border/40 p-8 rounded-2xl relative z-10 hover:border-primary/50 transition-colors flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-black border border-border/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
               <Icons.Cctv className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1. Existing Infrastructure</h3>
            <p className="text-sm text-muted-foreground">We aim to tap directly into your facility's existing RTSP camera streams, requiring zero new hardware installation.</p>
          </div>

          <div className="bg-[#121214] border border-primary/30 p-8 rounded-2xl relative z-10 hover:border-primary/50 transition-colors flex flex-col items-center text-center group shadow-[0_0_30px_rgba(52,211,153,0.05)]">
            <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(52,211,153,0.2)]">
               <Icons.Cpu className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">2. Planned Edge AI</h3>
            <p className="text-sm text-muted-foreground">Video is processed locally on secure edge nodes. Our models are being designed to detect hazards continuously without cloud dependency.</p>
          </div>

          <div className="bg-[#121214] border border-border/40 p-8 rounded-2xl relative z-10 hover:border-primary/50 transition-colors flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-black border border-border/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
               <Icons.BellRing className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">3. Actionable Alerts</h3>
            <p className="text-sm text-muted-foreground">When a risk condition is detected, an alert payload is dispatched to your safety teams before an incident can occur.</p>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. TARGETED DETECTIONS */}
      <AnimatedSection className="py-24 bg-[#111113] border-y border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Targeted Detections</h2>
              <p className="text-muted-foreground">
                We are actively training computer vision models to identify leading indicators of industrial accidents.
              </p>
            </div>
            <Link href="/use-cases">
              <Button variant="outline" className="border-border/50 text-white group">
                View All Planned Applications <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard className="bg-[#09090b] border border-border/40 rounded-2xl p-8 hover:border-primary/30 transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Icons.HardHat className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">PPE Compliance</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Detecting missing hardhats and high-visibility vests before workers enter active operational zones.
              </p>
              <div className="inline-block px-2 py-1 bg-secondary/50 rounded text-[10px] uppercase font-bold text-muted-foreground">In Development</div>
            </AnimatedCard>

            <AnimatedCard className="bg-[#09090b] border border-border/40 rounded-2xl p-8 hover:border-primary/30 transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Icons.AlertTriangle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Restricted Zones</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Monitoring unauthorized pedestrian entry into high-risk areas such as forklift paths or hazardous chemical storage.
              </p>
              <div className="inline-block px-2 py-1 bg-secondary/50 rounded text-[10px] uppercase font-bold text-muted-foreground">In Development</div>
            </AnimatedCard>

            <AnimatedCard className="bg-[#09090b] border border-border/40 rounded-2xl p-8 hover:border-primary/30 transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Icons.Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Future Signals</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our roadmap extends beyond vision to include environmental sensor ingestion and contextual wearable data.
              </p>
              <div className="inline-block px-2 py-1 bg-secondary/50 rounded text-[10px] uppercase font-bold text-muted-foreground">Roadmap Vision</div>
            </AnimatedCard>
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* 5. DESIGN PHILOSOPHY */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <Icons.ShieldCheck className="w-16 h-16 text-white mx-auto mb-6 opacity-80" />
        <h2 className="text-3xl font-bold text-white mb-6">Privacy as a foundational design philosophy.</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          We believe AI's highest calling is solving physical problems that protect human life, without compromising individual privacy. Percepta explicitly rejects biometric tracking. We design our systems to care about the hazard, not the individual.
        </p>
        <Link href="/security">
          <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10">
            Read our Privacy Principles <Icons.ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </AnimatedSection>

      {/* 6. BOTTOM CTA */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Help shape the future of industrial safety.</h2>
          <p className="text-xl text-muted-foreground mb-10">
            We are looking for forward-thinking design partners to deploy early models in real-world facilities.
          </p>
          <Link href="/pilot">
            <Button size="lg" className="h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20">
              Join the Design Partner Waitlist
            </Button>
          </Link>
        </div>
      </AnimatedSection>
      
    </div>
  );
}
