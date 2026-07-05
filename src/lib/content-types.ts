// =============================================================================
// PERCEPTA CONTENT DOMAIN MODEL
// =============================================================================
// This is the canonical content model shared across the entire platform.
// All article pages, the resource feed, and the future CMS must conform to
// these types. Do not define content types elsewhere.
// =============================================================================

// --- ENUMS (mirroring PostgreSQL ENUMs) ---

export const CONTENT_TYPES = [
  "Devlog",
  "Research Note",
  "Technical Brief",
  "Roadmap Update",
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const THEMES = [
  "Industrial Safety Intelligence",
  "Edge Computing",
  "Privacy by Design",
  "Computer Vision Reliability",
  "Human Factors & Safety Culture",
  "Sensor Fusion",
] as const;
export type Theme = (typeof THEMES)[number];

export const EVIDENCE_LEVEL_DEFINITIONS = [
  {
    level: "Opinion" as const,
    ordinal: 1,
    color: "text-gray-400 bg-gray-400/10 border-gray-400/20",
    description: "Philosophical stance or market observation.",
    allowedIn: "Manifesto, vision statements, founder quotes.",
  },
  {
    level: "Research" as const,
    ordinal: 2,
    color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    description: "Literature review or theoretical analysis.",
    allowedIn: "Research Notes, Technical Briefs, Roadmap (Next/Later).",
  },
  {
    level: "Experiment" as const,
    ordinal: 3,
    color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    description: "In-progress testing or benchmarking.",
    allowedIn: "Devlogs, Roadmap (Now).",
  },
  {
    level: "Validated Result" as const,
    ordinal: 4,
    color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    description: "Result validated through repeated testing and supporting evidence.",
    allowedIn: "Case Studies. Percepta currently has no validated results.",
  },
] as const;

export type EvidenceLevel = (typeof EVIDENCE_LEVEL_DEFINITIONS)[number]["level"];

export const RESOURCE_STATUSES = ["draft", "published", "archived"] as const;
export type ResourceStatus = (typeof RESOURCE_STATUSES)[number];

// --- CANONICAL RESOURCE INTERFACE ---

/**
 * The single source of truth for a content resource.
 *
 * Maps 1:1 to the `resources` table in Supabase once the CMS is live.
 * Until then, mock data in `resources/page.tsx` must conform to this shape.
 */
export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  reading_time: string;
  content_type: ContentType;
  theme: Theme;
  evidence_level: EvidenceLevel;
  status: ResourceStatus;
  version?: string;             // e.g. "1.0", "1.1" — optional, shown when provided

  // Timestamps
  created_at: string;           // ISO 8601 — treated as publish date
  updated_at: string;           // ISO 8601 — treated as last updated date
  published_at?: string;        // ISO 8601 — explicit publish date if different from created_at

  // Media & linking
  thumbnail_url?: string;
  drive_url?: string;           // Target URL or internal route
  is_gated: boolean;            // Always false at current stage (open access)
  is_featured: boolean;         // Appears in Foundational Documents section

  // Display
  display_order: number;

  // Legacy — will be deprecated during CMS migration
  category_id?: string;
  category?: ResourceCategory;
}

/**
 * @deprecated Will be removed after CMS migration.
 * Functionality is being migrated into `content_type` and `theme` fields.
 * Deprecation path:
 *   1. Keep temporarily for backward compatibility.
 *   2. Migrate filtering/display logic to content_type + theme during CMS implementation.
 *   3. Remove resource_categories table and this interface after migration is verified.
 */
export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  presentation_type?: string;
}

// --- HELPER FUNCTIONS ---

export function getEvidenceLevelDefinition(level: EvidenceLevel | string | undefined) {
  return EVIDENCE_LEVEL_DEFINITIONS.find((e) => e.level === level);
}

export function getEvidenceLevelStyle(level: EvidenceLevel | string | undefined): string {
  return (
    getEvidenceLevelDefinition(level)?.color ||
    "text-gray-500 bg-gray-500/10 border-gray-500/20"
  );
}

// --- SEARCH ARCHITECTURE NOTES ---
// =============================================================================
// FUTURE SEARCH STRATEGY (do not implement until resource count > ~100)
//
// Current: Client-side String.includes() on title, description, author, theme.
// Adequate for < 200 resources rendered on a single page.
//
// Future migration path (server-side full-text search via Supabase):
//
//   1. Add a generated tsvector column to the resources table:
//      ALTER TABLE resources ADD COLUMN search_vector tsvector
//        GENERATED ALWAYS AS (
//          to_tsvector('english',
//            coalesce(title, '') || ' ' ||
//            coalesce(description, '') || ' ' ||
//            coalesce(author, '') || ' ' ||
//            coalesce(theme::text, '') || ' ' ||
//            coalesce(rich_content->>'body', '')
//          )
//        ) STORED;
//
//   2. Create a GIN index:
//      CREATE INDEX idx_resources_search ON resources USING GIN (search_vector);
//
//   3. Query via Supabase RPC:
//      SELECT * FROM resources
//      WHERE search_vector @@ plainto_tsquery('english', $1)
//      ORDER BY ts_rank(search_vector, plainto_tsquery('english', $1)) DESC;
//
// This enables searching across: title, description, body, author, theme.
// =============================================================================
