"use client";

import { motion } from "framer-motion";
import { AlertCircle, Shield, Activity, Users, Clock, Video, TrendingDown, CheckCircle2 } from "lucide-react";

export default function DashboardMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-border/50 bg-[#0A0A0B] shadow-2xl shadow-primary/10">
      {/* Mac Window Header */}
      <div className="bg-[#121214] border-b border-border/50 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto bg-background/50 text-xs font-medium text-muted-foreground px-24 py-1.5 rounded-md border border-border/50">
          percepta-os.platform.io
        </div>
      </div>

      <div className="flex h-[500px]">
        {/* Sidebar */}
        <div className="w-48 bg-[#121214] border-r border-border/50 p-4 flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold text-sm text-white">Percepta</span>
          </div>
          {[
            { icon: Activity, label: "Overview", active: true },
            { icon: Video, label: "Live Feeds", active: false },
            { icon: AlertCircle, label: "Incidents", active: false },
            { icon: Users, label: "Workforce", active: false },
            { icon: Clock, label: "History", active: false },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium cursor-default transition-colors ${
                item.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col gap-6 bg-[#0A0A0B]">
          {/* Top Bar Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#121214] p-4 rounded-lg border border-border/50 flex flex-col justify-between">
              <span className="text-xs font-medium text-muted-foreground">Safety Score</span>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-2xl font-bold text-green-400">98.4</span>
                <span className="text-xs text-green-400/70 mb-1 flex items-center"><TrendingDown className="w-3 h-3 mr-1" /> +2.1</span>
              </div>
            </div>
            <div className="bg-[#121214] p-4 rounded-lg border border-border/50 flex flex-col justify-between">
              <span className="text-xs font-medium text-muted-foreground">Active Alerts</span>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-2xl font-bold text-amber-500">2</span>
                <span className="text-xs text-amber-500/70 mb-1">Needs review</span>
              </div>
            </div>
            <div className="bg-[#121214] p-4 rounded-lg border border-border/50 flex flex-col justify-between">
              <span className="text-xs font-medium text-muted-foreground">Cameras Online</span>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-2xl font-bold text-white">42/42</span>
                <span className="text-xs text-green-400 mb-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> All systems go</span>
              </div>
            </div>
            <div className="bg-[#121214] p-4 rounded-lg border border-border/50 flex flex-col justify-between">
              <span className="text-xs font-medium text-muted-foreground">PPE Compliance</span>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-2xl font-bold text-white">99.1%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
            {/* Live Camera Feed Mockup */}
            <div className="col-span-2 bg-[#121214] border border-border/50 rounded-lg overflow-hidden flex flex-col relative group">
              <div className="px-4 py-3 border-b border-border/50 flex justify-between items-center bg-[#121214] z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-medium text-white">CAM-04 (Assembly Line B)</span>
                </div>
                <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">AI ACTIVE</Badge>
              </div>
              <div className="relative flex-1 bg-[#0A0A0B] overflow-hidden">
                {/* Simulated factory background using CSS gradients and noise */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 opacity-50" />
                
                {/* Animated Bounding Box - Hardhat */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute top-1/4 left-1/3 w-16 h-16 border-2 border-green-500 bg-green-500/10 rounded-sm flex flex-col justify-end"
                >
                  <div className="bg-green-500 text-black text-[8px] font-bold px-1 absolute -top-3 left-[-2px]">
                    HARDHAT 99%
                  </div>
                </motion.div>

                {/* Animated Bounding Box - Missing Vest Violation */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1] }}
                  transition={{ delay: 1.5, duration: 1.2 }}
                  className="absolute top-1/3 right-1/4 w-24 h-32 border-2 border-red-500 bg-red-500/10 rounded-sm flex flex-col justify-end"
                >
                  <div className="bg-red-500 text-white text-[8px] font-bold px-1 absolute -top-3 left-[-2px]">
                    MISSING VEST 94%
                  </div>
                </motion.div>
                
                <div className="absolute bottom-2 left-2 text-[10px] text-white/50 font-mono">
                  14:32:05 UTC | 30 FPS | Latency 12ms
                </div>
              </div>
            </div>

            {/* Event Log */}
            <div className="col-span-1 bg-[#121214] border border-border/50 rounded-lg flex flex-col">
              <div className="px-4 py-3 border-b border-border/50">
                <span className="text-xs font-medium text-white">Event Log</span>
              </div>
              <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
                {[
                  { time: "Just now", type: "alert", text: "Missing safety vest detected", cam: "CAM-04" },
                  { time: "2m ago", type: "info", text: "Shift change complete", cam: "System" },
                  { time: "14m ago", type: "alert", text: "Forklift proximity warning", cam: "CAM-12" },
                  { time: "1h ago", type: "success", text: "Area cleared", cam: "CAM-01" },
                ].map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + (i * 0.2) }}
                    className="flex gap-3 text-xs"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                      log.type === 'alert' ? 'bg-red-500' : 
                      log.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <div className="text-white/90">{log.text}</div>
                      <div className="text-white/40 text-[10px] mt-0.5">{log.time} • {log.cam}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline badge component to avoid importing and breaking things
function Badge({ children, className, variant = "default" }: any) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}
