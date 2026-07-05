import { z } from "zod";

// ---------------------------------------------------------------------------
// Resource
// ---------------------------------------------------------------------------
export const ResourceSchema = z.object({
  title: z.string().min(1, { error: "Title is required" }),
  description: z.string().optional(),
  category_id: z.string().uuid({ error: "Invalid category ID" }),
  drive_url: z.string().url({ error: "Must be a valid URL" }),
  thumbnail_url: z.string().url({ error: "Must be a valid URL" }).optional().nullable(),
  status: z.enum(["Published", "Upcoming", "Draft"]),
  is_featured: z.boolean(),
  display_order: z.number(),
});

export type ResourceInput = z.infer<typeof ResourceSchema>;

// ---------------------------------------------------------------------------
// Resource Category
// ---------------------------------------------------------------------------
export const CategorySchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  slug: z.string().min(1, { error: "Slug is required" }),
  icon: z.string(),
  presentation_type: z.enum(["video", "document", "presentation", "link", "standard"]),
  display_order: z.number(),
  is_active: z.boolean(),
  show_in_filters: z.boolean(),
  show_in_upcoming: z.boolean(),
  show_in_navigation: z.boolean(),
});

export type CategoryInput = z.infer<typeof CategorySchema>;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const FaqSchema = z.object({
  question: z.string().min(1, { error: "Question is required" }),
  answer: z.string().min(1, { error: "Answer is required" }),
  display_order: z.number(),
});

export type FaqInput = z.infer<typeof FaqSchema>;

// ---------------------------------------------------------------------------
// Roadmap Item
// ---------------------------------------------------------------------------
export const RoadmapItemSchema = z.object({
  title: z.string().min(1, { error: "Title is required" }),
  description: z.string().min(1, { error: "Description is required" }),
  target_date: z.string().optional().nullable(),
  status: z.enum(["Planned", "In Development", "Completed"]),
  display_order: z.number(),
});

export type RoadmapItemInput = z.infer<typeof RoadmapItemSchema>;

// ---------------------------------------------------------------------------
// Integrations & Ecosystem
// ---------------------------------------------------------------------------
export const IntegrationCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional().nullable(),
  display_order: z.number()
});

export const IntegrationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  category_id: z.string().uuid(),
  description: z.string(),
  logo_url: z.string().url().optional().nullable(),
  website_url: z.string().url().optional().nullable(),
  status: z.enum(["Live", "Beta", "Planned"]),
  is_featured: z.boolean(),
  display_order: z.number()
});

export const ProtocolSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  is_industry_standard: z.boolean(),
  display_order: z.number()
});

export const DeploymentModelSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  icon: z.string(),
  is_recommended: z.boolean(),
  display_order: z.number()
});

export const IntegrationRoadmapSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  target_quarter: z.string(),
  status: z.enum(["Researching", "In Development", "Testing"]),
  display_order: z.number()
});

export const SecurityFeatureSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  icon: z.string(),
  display_order: z.number()
});

export const ArchitectureNodeSchema = z.object({
  label: z.string().min(1),
  type: z.enum(["edge", "cloud", "on-premise", "external"]),
  icon: z.string(),
  display_order: z.number()
});

export const ArchitectureConnectionSchema = z.object({
  source_node_id: z.string().uuid(),
  target_node_id: z.string().uuid(),
  label: z.string(),
  is_bidirectional: z.boolean(),
  display_order: z.number()
});

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------
export const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1)
});
