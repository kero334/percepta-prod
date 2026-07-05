"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection, FadeInView } from "@/components/ui/animations";
import * as Icons from "lucide-react";

export default function PilotPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden font-sans text-gray-200">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl text-center">
          <FadeInView>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Early Access
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Join the Percepta <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Design Partner Program.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              We are actively looking for forward-thinking industrial leaders in Egypt, KSA, and the UAE to test our early models and shape the future of safety intelligence.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION */}
      <AnimatedSection className="py-12 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl text-center">
               <Icons.MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
               <h3 className="font-bold text-white mb-2">Localized Focus</h3>
               <p className="text-sm text-muted-foreground">Our initial rollout targets the specific operational challenges of the MENA industrial sector.</p>
            </div>
            <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl text-center">
               <Icons.Compass className="w-8 h-8 text-primary mx-auto mb-4" />
               <h3 className="font-bold text-white mb-2">Influence the Roadmap</h3>
               <p className="text-sm text-muted-foreground">Work directly with the founder to prioritize the hazard detection models that matter most to your facility.</p>
            </div>
            <div className="bg-[#121214] border border-border/40 p-6 rounded-2xl text-center">
               <Icons.Zap className="w-8 h-8 text-primary mx-auto mb-4" />
               <h3 className="font-bold text-white mb-2">Early Access</h3>
               <p className="text-sm text-muted-foreground">Be the first to integrate proactive safety intelligence into your operations ahead of general availability.</p>
            </div>
         </div>
      </AnimatedSection>

      {/* 3. APPLICATION FORM */}
      <AnimatedSection className="pb-32 container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-[#111113] border border-border/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-emerald-400 to-blue-500" />
          
          <h2 className="text-2xl font-bold text-white mb-2">Design Partner Application</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Please provide your details below. We are currently evaluating facilities for Phase 1 deployments in Egypt.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">First Name</label>
                <input type="text" className="w-full bg-[#1a1a1c] border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Last Name</label>
                <input type="text" className="w-full bg-[#1a1a1c] border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Work Email</label>
              <input type="email" className="w-full bg-[#1a1a1c] border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="john@company.com" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-medium text-white">Company / Facility Name</label>
                 <input type="text" className="w-full bg-[#1a1a1c] border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Acme Manufacturing" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-white">Location</label>
                 <select className="w-full bg-[#1a1a1c] border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                   <option>Egypt</option>
                   <option>Saudi Arabia</option>
                   <option>United Arab Emirates</option>
                   <option>Other</option>
                 </select>
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Estimated Camera Count</label>
              <select className="w-full bg-[#1a1a1c] border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                <option>Less than 50</option>
                <option>50 - 200</option>
                <option>200 - 500</option>
                <option>500+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Primary Safety Challenge (Optional)</label>
              <textarea 
                className="w-full bg-[#1a1a1c] border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors min-h-[100px]" 
                placeholder="Briefly describe the main safety issue you are trying to solve..."
              />
            </div>

            <Button type="button" className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold mt-4 shadow-lg shadow-primary/20">
              Submit Application
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              By submitting, you agree to be contacted regarding the Percepta Design Partner Program.
            </p>
          </form>
        </div>
      </AnimatedSection>

    </div>
  );
}
