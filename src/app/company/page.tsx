"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection, FadeInView, StaggerContainer, AnimatedCard } from "@/components/ui/animations";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CompanyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden font-sans text-gray-200">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-24 relative overflow-hidden flex flex-col items-center border-b border-border/20">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl text-center">
          <FadeInView>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Our Mission
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              AI should solve <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">physical problems.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              We are an early-stage research company bridging the gap between advanced artificial intelligence and physical operations, creating accessible technologies to detect risks before they cause harm.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* 2. THE GENESIS & THE FOUNDER */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">The genesis of Percepta.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The idea for Percepta was born from a simple frustration: seeing the extraordinary capabilities of modern AI being directed primarily at digital workflows, while the physical operations that keep our world running remained stuck in the past.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Factories and construction sites are unforgiving, yet their primary method of safety monitoring—manual walkthroughs and passive CCTV recording—has barely evolved in decades. Percepta was founded to redirect the power of edge computing and computer vision to build an intelligence layer that actually protects human life.
            </p>
            <div className="pt-6 border-t border-border/30">
               <h4 className="text-white font-bold mb-2">Kerollos Karam</h4>
               <p className="text-sm text-muted-foreground">Founder & Lead Researcher</p>
            </div>
          </div>
          <div className="flex-1 w-full bg-[#121214] border border-border/40 p-8 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col justify-center">
             <h3 className="text-xl font-bold text-white mb-6 text-center">The Journey to Percepta</h3>
             <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-[4/3]">
                <Image 
                  src="/images/founder_timeline_infographic.png"
                  alt="Percepta Founder Timeline"
                  fill
                  unoptimized
                  className="object-contain"
                />
             </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. THE FOUNDER-LED RESEARCH ADVANTAGE */}
      <AnimatedSection className="py-24 bg-[#111113] border-b border-border/20">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Founder-Led Research Advantage</h2>
               <p className="text-lg text-muted-foreground">
                  Percepta operates as a highly focused, independent research lab. This structure provides a structural advantage for our early partners.
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-[#1a1a1c] border border-border/40 p-8 rounded-2xl flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                     <Icons.Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Zero Bureaucracy</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     We operate with high velocity. Without corporate bloat, our research and deployment cycles are unencumbered, allowing us to test hypotheses rapidly.
                  </p>
               </div>
               <div className="bg-[#1a1a1c] border border-border/40 p-8 rounded-2xl flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                     <Icons.PhoneCall className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Direct Access</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Early pilot partners do not talk to account managers or support agents. You work directly with the founder and lead researcher architecting the system.
                  </p>
               </div>
               <div className="bg-[#1a1a1c] border border-border/40 p-8 rounded-2xl flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                     <Icons.Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Extreme Focus</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     We are not distracted by scaling sales teams or chasing vanity metrics. 100% of our focus is on solving the core technical challenges of industrial edge vision.
                  </p>
               </div>
            </div>
         </div>
      </AnimatedSection>

      {/* 4. LONG-TERM VISION */}
      <AnimatedSection className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border-b border-border/20">
         <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 w-full order-2 md:order-1">
               <div className="relative w-full aspect-square md:aspect-auto md:h-[400px] rounded-3xl overflow-hidden border border-border/40 bg-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/5"></div>
                  <Icons.Network className="w-32 h-32 text-primary opacity-20 absolute" />
                  <div className="relative z-10 flex gap-4">
                     <div className="w-16 h-16 bg-[#121214] border border-primary/40 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                        <Icons.Camera className="w-8 h-8 text-white" />
                     </div>
                     <div className="w-16 h-16 bg-[#121214] border border-blue-500/40 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)] mt-8">
                        <Icons.Thermometer className="w-8 h-8 text-white" />
                     </div>
                     <div className="w-16 h-16 bg-[#121214] border border-purple-500/40 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <Icons.Watch className="w-8 h-8 text-white" />
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex-1 order-1 md:order-2">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Long-Term Vision</h2>
               <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  While our current research is hyper-focused on edge-based computer vision, cameras are only the first sense. They have blind spots and cannot see heat, gas, or internal physiological stress.
               </p>
               <p className="text-lg text-muted-foreground leading-relaxed">
                  Over the next 5 to 10 years, Percepta aims to evolve into a unified industrial sensor intelligence platform. We envision a future where computer vision, IoT environmental sensors, and industrial wearables seamlessly communicate through a single local edge infrastructure, providing comprehensive operational context and identifying risk patterns proactively.
               </p>
            </div>
         </div>
      </AnimatedSection>

      {/* 5. OPERATING PRINCIPLES */}
      <AnimatedSection className="py-24 bg-[#111113] border-b border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Operating Principles</h2>
            <p className="text-lg text-muted-foreground">
              These principles guide our research, our product decisions, and how we interact with our future partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#121214] border border-border/40 p-8 rounded-2xl hover:border-primary/30 transition-colors">
              <Icons.Shield className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Protect People First</h3>
              <p className="text-sm text-muted-foreground">Every line of code and architectural decision must ultimately serve the safety of the frontline worker.</p>
            </div>
            <div className="bg-[#121214] border border-border/40 p-8 rounded-2xl hover:border-primary/30 transition-colors">
              <Icons.Factory className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Embrace the Real World</h3>
              <p className="text-sm text-muted-foreground">We design for messy, unpredictable industrial environments, not perfect laboratory conditions.</p>
            </div>
            <div className="bg-[#121214] border border-border/40 p-8 rounded-2xl hover:border-primary/30 transition-colors">
              <Icons.EyeOff className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Privacy by Design</h3>
              <p className="text-sm text-muted-foreground">We engineer systems that focus on contextual hazards while fundamentally rejecting individual identity tracking.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 6. CONTACT CTA */}
      <AnimatedSection className="py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get in touch.</h2>
          <p className="text-lg text-muted-foreground mb-10">
            For investment inquiries, potential partnerships, or to discuss the future of industrial safety, reach out directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/contact">
               <Button size="lg" className="h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20">
                 Contact Percepta
               </Button>
             </Link>
             <Link href="/pilot">
               <Button variant="outline" size="lg" className="h-14 px-10 border-border/50 text-white hover:bg-secondary/50 text-lg font-bold">
                 Join the Waitlist
               </Button>
             </Link>
          </div>
        </div>
      </AnimatedSection>

    </div>
  );
}
