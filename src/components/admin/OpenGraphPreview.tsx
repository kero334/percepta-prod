"use client";

import { useState } from "react";
import * as Icons from "lucide-react";

export function OpenGraphPreview({ title, description, imageUrl, fallbackTitle, fallbackDesc }: { title: string, description: string, imageUrl?: string, fallbackTitle: string, fallbackDesc: string }) {
  const [platform, setPlatform] = useState<"twitter" | "linkedin" | "facebook">("twitter");

  const displayTitle = title || fallbackTitle || "Percepta Resource";
  const displayDesc = description || fallbackDesc || "Read more about this topic on Percepta.";
  const displayImage = imageUrl || "https://percepta.example.com/default-og.jpg"; // Placeholder or actual fallback

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => setPlatform("twitter")} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${platform === "twitter" ? "bg-[#1DA1F2] text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>X / Twitter</button>
        <button type="button" onClick={() => setPlatform("linkedin")} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${platform === "linkedin" ? "bg-[#0A66C2] text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>LinkedIn</button>
        <button type="button" onClick={() => setPlatform("facebook")} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${platform === "facebook" ? "bg-[#1877F2] text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>Facebook</button>
      </div>

      <div className="mt-4 bg-[#09090b] border border-border/40 rounded-xl overflow-hidden max-w-[500px]">
        {/* Common Image Area */}
        <div className="aspect-[1.91/1] w-full bg-zinc-800 border-b border-border/40 relative overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt="OG Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <Icons.Image className="w-8 h-8 mb-2" />
              <span className="text-xs">No Thumbnail Selected</span>
            </div>
          )}
        </div>

        {/* Platform Specific Footer */}
        {platform === "twitter" && (
          <div className="p-3 bg-black">
            <div className="text-[15px] text-white truncate">{displayTitle}</div>
            <div className="text-[13px] text-zinc-500 line-clamp-2 mt-0.5">{displayDesc}</div>
            <div className="text-[13px] text-zinc-500 mt-1 flex items-center"><Icons.Link className="w-3 h-3 mr-1"/> percepta.ai</div>
          </div>
        )}

        {platform === "linkedin" && (
          <div className="p-3 bg-[#EEF3F8]">
            <div className="text-[14px] font-semibold text-black truncate">{displayTitle}</div>
            <div className="text-[12px] text-zinc-600 mt-0.5">percepta.ai</div>
          </div>
        )}

        {platform === "facebook" && (
          <div className="p-3 bg-[#F0F2F5]">
            <div className="text-[12px] text-zinc-500 uppercase">percepta.ai</div>
            <div className="text-[16px] font-semibold text-black truncate leading-tight mt-1">{displayTitle}</div>
            <div className="text-[14px] text-zinc-600 line-clamp-1 mt-0.5">{displayDesc}</div>
          </div>
        )}
      </div>
    </div>
  );
}
