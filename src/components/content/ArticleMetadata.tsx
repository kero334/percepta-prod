"use client";

import * as Icons from "lucide-react";
import EvidenceBadge from "./EvidenceBadge";
import type { ContentType, Theme, EvidenceLevel } from "@/lib/content-types";

export interface ArticleMetadataProps {
  author: string;
  publishDate: string;
  lastUpdated?: string;
  readingTime: string;
  contentType: ContentType;
  theme: Theme;
  evidenceLevel: EvidenceLevel;
  version?: string;
}

/**
 * Reusable metadata bar for all article pages.
 *
 * Renders author, dates, reading time, content type, evidence level,
 * theme tag, and optional version. Shared by /manifesto, /devlog-*,
 * and all future article routes.
 */
export default function ArticleMetadata({
  author,
  publishDate,
  lastUpdated,
  readingTime,
  contentType,
  theme,
  evidenceLevel,
  version,
}: ArticleMetadataProps) {
  const showUpdated = lastUpdated && lastUpdated !== publishDate;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-4 border-t border-border/20">
      {/* Author */}
      <span className="flex items-center gap-1.5">
        <Icons.User className="w-3.5 h-3.5 shrink-0" /> {author}
      </span>

      {/* Publish Date */}
      <span className="flex items-center gap-1.5">
        <Icons.Calendar className="w-3.5 h-3.5 shrink-0" /> {publishDate}
      </span>

      {/* Last Updated (only if different from publish date) */}
      {showUpdated && (
        <span className="flex items-center gap-1.5">
          <Icons.RefreshCw className="w-3.5 h-3.5 shrink-0" /> Updated {lastUpdated}
        </span>
      )}

      {/* Reading Time */}
      <span className="flex items-center gap-1.5">
        <Icons.Clock className="w-3.5 h-3.5 shrink-0" /> {readingTime}
      </span>

      {/* Content Type */}
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white bg-secondary/50 border border-border/30">
        {contentType}
      </span>

      {/* Evidence Level */}
      <EvidenceBadge level={evidenceLevel} />

      {/* Theme */}
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium text-muted-foreground bg-black/20 border border-border/20">
        <Icons.Tag className="w-3 h-3 shrink-0" /> {theme}
      </span>

      {/* Version */}
      {version && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-muted-foreground bg-black/20 border border-border/20">
          v{version}
        </span>
      )}
    </div>
  );
}
