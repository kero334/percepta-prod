"use client";

import { getEvidenceLevelDefinition, type EvidenceLevel } from "@/lib/content-types";

interface EvidenceBadgeProps {
  level: EvidenceLevel | string;
  showTooltip?: boolean;
}

/**
 * Accessible evidence level badge.
 *
 * Renders a colored badge with level number prefix (L1–L4) so meaning
 * is communicated independent of color. On hover/focus, a tooltip
 * displays the plain-language description.
 */
export default function EvidenceBadge({ level, showTooltip = true }: EvidenceBadgeProps) {
  const definition = getEvidenceLevelDefinition(level);
  if (!definition) return null;

  return (
    <span
      className={`evidence-badge inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${definition.color}`}
      title={showTooltip ? definition.description : undefined}
      aria-label={`Evidence level: ${definition.level}. ${definition.description}`}
      role="note"
    >
      <span className="opacity-60">L{definition.ordinal}</span>
      <span className="mx-0.5 opacity-30">·</span>
      {definition.level}
    </span>
  );
}
