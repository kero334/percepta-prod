export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type GenericTable = {
  Row: Record<string, any>
  Insert: Record<string, any>
  Update: Record<string, any>
  Relationships: any[]
}

export interface Database {
  public: {
    Tables: {
      resources: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          rich_content: Json | null
          category_id: string | null
          content_type: 'Devlog' | 'Research Note' | 'Technical Brief' | 'Roadmap Update' | null
          theme: 'Industrial Safety Intelligence' | 'Edge Computing' | 'Privacy by Design' | 'Computer Vision Reliability' | 'Human Factors & Safety Culture' | 'Sensor Fusion' | null
          evidence_level: 'Opinion' | 'Research' | 'Experiment' | 'Validated Result' | null
          author: string
          reading_time: string | null
          version: string
          drive_url: string | null
          thumbnail_url: string | null
          tags: string[] | null
          status: 'published' | 'draft' | 'review' | 'archived'
          is_featured: boolean
          is_hidden: boolean
          display_order: number
          seo_title: string | null
          seo_description: string | null
          published_at: string | null
          last_reviewed_at: string | null
          reviewed_by: string | null
          search_vector: unknown | null
          created_by: string | null
          updated_by: string | null
          created_at: string
          updated_at: string
          version_hash: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          rich_content?: Json | null
          category_id?: string | null
          content_type?: 'Devlog' | 'Research Note' | 'Technical Brief' | 'Roadmap Update' | null
          theme?: 'Industrial Safety Intelligence' | 'Edge Computing' | 'Privacy by Design' | 'Computer Vision Reliability' | 'Human Factors & Safety Culture' | 'Sensor Fusion' | null
          evidence_level?: 'Opinion' | 'Research' | 'Experiment' | 'Validated Result' | null
          author?: string
          reading_time?: string | null
          version?: string
          drive_url?: string | null
          thumbnail_url?: string | null
          tags?: string[] | null
          status?: 'published' | 'draft' | 'review' | 'archived'
          is_featured?: boolean
          is_hidden?: boolean
          display_order?: number
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string | null
          last_reviewed_at?: string | null
          reviewed_by?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
          version_hash?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          rich_content?: Json | null
          category_id?: string | null
          content_type?: 'Devlog' | 'Research Note' | 'Technical Brief' | 'Roadmap Update' | null
          theme?: 'Industrial Safety Intelligence' | 'Edge Computing' | 'Privacy by Design' | 'Computer Vision Reliability' | 'Human Factors & Safety Culture' | 'Sensor Fusion' | null
          evidence_level?: 'Opinion' | 'Research' | 'Experiment' | 'Validated Result' | null
          author?: string
          reading_time?: string | null
          version?: string
          drive_url?: string | null
          thumbnail_url?: string | null
          tags?: string[] | null
          status?: 'published' | 'draft' | 'review' | 'archived'
          is_featured?: boolean
          is_hidden?: boolean
          display_order?: number
          seo_title?: string | null
          seo_description?: string | null
          published_at?: string | null
          last_reviewed_at?: string | null
          reviewed_by?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
          version_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_category_id_fkey",
            columns: ["category_id"],
            isOneToOne: false,
            referencedRelation: "resource_categories",
            referencedColumns: ["id"]
          }
        ]
      }
      resource_redirects: {
        Row: {
          id: string
          resource_id: string
          old_slug: string
          new_slug: string
          created_at: string
        }
        Insert: {
          id?: string
          resource_id: string
          old_slug: string
          new_slug: string
          created_at?: string
        }
        Update: {
          id?: string
          resource_id?: string
          old_slug?: string
          new_slug?: string
          created_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          user_id: string
          role: string
          created_at?: string
        }
        Update: {
          user_id?: string
          role?: string
          created_at?: string
        }
        Relationships: []
      }
      resource_categories: GenericTable
      integrations: GenericTable
      integration_categories: GenericTable
      supported_protocols: GenericTable
      deployment_models: GenericTable
      integration_roadmap: GenericTable
      security_features: GenericTable
      architecture_nodes: GenericTable
      architecture_connections: GenericTable
      contacts: GenericTable
      demo_requests: GenericTable
      waitlist: GenericTable
      faqs: GenericTable
      roadmap_items: GenericTable
      resource_revisions: GenericTable
      contact_submissions: GenericTable
      pilot_requests: GenericTable
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action_type: string
          table_name: string
          record_id: string
          old_data: Json | null
          new_data: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action_type: string
          table_name: string
          record_id: string
          old_data?: Json | null
          new_data?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action_type?: string
          table_name?: string
          record_id?: string
          old_data?: Json | null
          new_data?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          id: string
          file_name: string
          storage_path: string
          mime_type: string | null
          size_bytes: number | null
          alt_text: string | null
          title: string | null
          caption: string | null
          dimensions: string | null
          uploaded_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          file_name: string
          storage_path: string
          mime_type?: string | null
          size_bytes?: number | null
          alt_text?: string | null
          title?: string | null
          caption?: string | null
          dimensions?: string | null
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          file_name?: string
          storage_path?: string
          mime_type?: string | null
          size_bytes?: number | null
          alt_text?: string | null
          title?: string | null
          caption?: string | null
          dimensions?: string | null
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_saved_filters: {
        Row: {
          id: string
          user_id: string
          filter_name: string
          filter_payload_json: Json
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          filter_name: string
          filter_payload_json: Json
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          filter_name?: string
          filter_payload_json?: Json
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Relationships: []
      }
      resource_reviews: {
        Row: {
          id: string
          resource_id: string
          reviewer_id: string
          decision: string | null
          review_notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          resource_id: string
          reviewer_id: string
          decision?: string | null
          review_notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          resource_id?: string
          reviewer_id?: string
          decision?: string | null
          review_notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_type: 'Devlog' | 'Research Note' | 'Technical Brief' | 'Roadmap Update'
      content_theme: 'Industrial Safety Intelligence' | 'Edge Computing' | 'Privacy by Design' | 'Computer Vision Reliability' | 'Human Factors & Safety Culture' | 'Sensor Fusion'
      evidence_level: 'Opinion' | 'Research' | 'Experiment' | 'Validated Result'
      revision_change_type: 'major' | 'minor' | 'rollback'
    }
  }
}
