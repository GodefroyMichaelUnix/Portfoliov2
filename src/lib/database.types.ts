export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      certifications: {
        Row: {
          created_at: string
          featured: boolean | null
          id: string
          image: string | null
          issue_date: string
          issuer: string
          logo: string
          skills: Json | null
          summary: string | null
          title: string
          verify_url: string | null
        }
        Insert: {
          created_at?: string
          featured?: boolean | null
          id: string
          image?: string | null
          issue_date: string
          issuer: string
          logo: string
          skills?: Json | null
          summary?: string | null
          title: string
          verify_url?: string | null
        }
        Update: {
          created_at?: string
          featured?: boolean | null
          id?: string
          image?: string | null
          issue_date?: string
          issuer?: string
          logo?: string
          skills?: Json | null
          summary?: string | null
          title?: string
          verify_url?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          delivery_status: string
          email: string
          id: number
          message: string
          name: string
          project_type: string
          request_id: string | null
          resend_message_id: string | null
          source_hash: string | null
        }
        Insert: {
          created_at?: string
          delivery_status?: string
          email: string
          id?: number
          message: string
          name: string
          project_type: string
          request_id?: string | null
          resend_message_id?: string | null
          source_hash?: string | null
        }
        Update: {
          created_at?: string
          delivery_status?: string
          email?: string
          id?: number
          message?: string
          name?: string
          project_type?: string
          request_id?: string | null
          resend_message_id?: string | null
          source_hash?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          created_at?: string
          id: string
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      home_expertise_cards: {
        Row: {
          bg_image: string | null
          category: string
          id: string
          level: number
          sort_order: number
          title: string
        }
        Insert: {
          bg_image?: string | null
          category: string
          id: string
          level: number
          sort_order?: number
          title: string
        }
        Update: {
          bg_image?: string | null
          category?: string
          id?: string
          level?: number
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      home_pillars: {
        Row: {
          description: string
          id: string
          image: string
          sort_order: number
          span: string | null
          tags: Json
          title: string
        }
        Insert: {
          description: string
          id: string
          image: string
          sort_order?: number
          span?: string | null
          tags?: Json
          title: string
        }
        Update: {
          description?: string
          id?: string
          image?: string
          sort_order?: number
          span?: string | null
          tags?: Json
          title?: string
        }
        Relationships: []
      }
      making_of_stack: {
        Row: {
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          id: string
          name: string
          sort_order?: number
        }
        Update: {
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      making_of_steps: {
        Row: {
          description: string
          icon_name: string | null
          id: string
          sort_order: number
          step: string
          title: string
        }
        Insert: {
          description: string
          icon_name?: string | null
          id: string
          sort_order?: number
          step: string
          title: string
        }
        Update: {
          description?: string
          icon_name?: string | null
          id?: string
          sort_order?: number
          step?: string
          title?: string
        }
        Relationships: []
      }
      passions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_path: string | null
          is_visible: boolean
          sort_order: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          is_visible?: boolean
          sort_order?: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_path?: string | null
          is_visible?: boolean
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          created_at: string
          description: string
          icon_name: string
          id: string
          items: Json | null
          label: string
          numeric: string
          prefix: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description: string
          icon_name?: string
          id: string
          items?: Json | null
          label: string
          numeric: string
          prefix?: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string
          icon_name?: string
          id?: string
          items?: Json | null
          label?: string
          numeric?: string
          prefix?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          about_closing: string | null
          about_expertise: Json | null
          about_journey: Json | null
          about_journey_intro_text: string | null
          about_journey_intro_title: string | null
          about_manifesto: string | null
          about_page_accent: string | null
          about_page_description: string | null
          about_page_label: string | null
          about_page_title: string | null
          about_transition_text: string | null
          availability: Json
          avatar_url: string | null
          bio_summary: Json | null
          contact: Json
          hero_photo_url: string | null
          home_about_accent: string | null
          home_about_description: string | null
          home_about_title: string | null
          home_contact_description: string | null
          home_savoir_faire_description: string | null
          id: string
          location: string | null
          methodology: Json | null
          name: string
          presentation_video_poster: string | null
          presentation_video_url: string | null
          role_subtitle: string | null
          stats: Json | null
          title: string
          updated_at: string
          value_proposition: string | null
        }
        Insert: {
          about_closing?: string | null
          about_expertise?: Json | null
          about_journey?: Json | null
          about_journey_intro_text?: string | null
          about_journey_intro_title?: string | null
          about_manifesto?: string | null
          about_page_accent?: string | null
          about_page_description?: string | null
          about_page_label?: string | null
          about_page_title?: string | null
          about_transition_text?: string | null
          availability: Json
          avatar_url?: string | null
          bio_summary?: Json | null
          contact: Json
          hero_photo_url?: string | null
          home_about_accent?: string | null
          home_about_description?: string | null
          home_about_title?: string | null
          home_contact_description?: string | null
          home_savoir_faire_description?: string | null
          id?: string
          location?: string | null
          methodology?: Json | null
          name: string
          presentation_video_poster?: string | null
          presentation_video_url?: string | null
          role_subtitle?: string | null
          stats?: Json | null
          title: string
          updated_at?: string
          value_proposition?: string | null
        }
        Update: {
          about_closing?: string | null
          about_expertise?: Json | null
          about_journey?: Json | null
          about_journey_intro_text?: string | null
          about_journey_intro_title?: string | null
          about_manifesto?: string | null
          about_page_accent?: string | null
          about_page_description?: string | null
          about_page_label?: string | null
          about_page_title?: string | null
          about_transition_text?: string | null
          availability?: Json
          avatar_url?: string | null
          bio_summary?: Json | null
          contact?: Json
          hero_photo_url?: string | null
          home_about_accent?: string | null
          home_about_description?: string | null
          home_about_title?: string | null
          home_contact_description?: string | null
          home_savoir_faire_description?: string | null
          id?: string
          location?: string | null
          methodology?: Json | null
          name?: string
          presentation_video_poster?: string | null
          presentation_video_url?: string | null
          role_subtitle?: string | null
          stats?: Json | null
          title?: string
          updated_at?: string
          value_proposition?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          architecture_summary: Json | null
          category: string
          category_label: string
          context: string | null
          created_at: string
          demo_url: string | null
          featured: boolean | null
          github_url: string | null
          id: string
          measurable_result: string | null
          metrics: Json | null
          mockup_type: string | null
          problem: string | null
          solution: string | null
          subtitle: string | null
          tech_stack: Json | null
          title: string
        }
        Insert: {
          architecture_summary?: Json | null
          category: string
          category_label: string
          context?: string | null
          created_at?: string
          demo_url?: string | null
          featured?: boolean | null
          github_url?: string | null
          id: string
          measurable_result?: string | null
          metrics?: Json | null
          mockup_type?: string | null
          problem?: string | null
          solution?: string | null
          subtitle?: string | null
          tech_stack?: Json | null
          title: string
        }
        Update: {
          architecture_summary?: Json | null
          category?: string
          category_label?: string
          context?: string | null
          created_at?: string
          demo_url?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          measurable_result?: string | null
          metrics?: Json | null
          mockup_type?: string | null
          problem?: string | null
          solution?: string | null
          subtitle?: string | null
          tech_stack?: Json | null
          title?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          after_text: string | null
          before_text: string | null
          category: string
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          is_visible: boolean
          sort_order: number
          title: string
        }
        Insert: {
          after_text?: string | null
          before_text?: string | null
          category: string
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_visible?: boolean
          sort_order?: number
          title: string
        }
        Update: {
          after_text?: string | null
          before_text?: string | null
          category?: string
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_visible?: boolean
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      site_media: {
        Row: {
          alt_text: string
          created_at: string
          id: string
          is_visible: boolean
          media_key: string
          sort_order: number
          storage_bucket: string
          storage_path: string
          updated_at: string
        }
        Insert: {
          alt_text?: string
          created_at?: string
          id?: string
          is_visible?: boolean
          media_key: string
          sort_order?: number
          storage_bucket?: string
          storage_path: string
          updated_at?: string
        }
        Update: {
          alt_text?: string
          created_at?: string
          id?: string
          is_visible?: boolean
          media_key?: string
          sort_order?: number
          storage_bucket?: string
          storage_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          created_at: string
          icon_name: string
          id: string
          skills: Json | null
          sort_order: number | null
          subtitle: string | null
          title: string
        }
        Insert: {
          created_at?: string
          icon_name: string
          id: string
          skills?: Json | null
          sort_order?: number | null
          subtitle?: string | null
          title: string
        }
        Update: {
          created_at?: string
          icon_name?: string
          id?: string
          skills?: Json | null
          sort_order?: number | null
          subtitle?: string | null
          title?: string
        }
        Relationships: []
      }
      tech_stack: {
        Row: {
          active: boolean
          alt_text: string
          created_at: string
          display_scale: number
          fallback_url: string | null
          id: string
          name: string
          sort_order: number
          storage_path: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          alt_text: string
          created_at?: string
          display_scale?: number
          fallback_url?: string | null
          id?: string
          name: string
          sort_order?: number
          storage_path?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          alt_text?: string
          created_at?: string
          display_scale?: number
          fallback_url?: string | null
          id?: string
          name?: string
          sort_order?: number
          storage_path?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          created_at: string
          description: string
          id: string
          kind: string
          name: string
          nodes: Json | null
          sort_order: number | null
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id: string
          kind: string
          name: string
          nodes?: Json | null
          sort_order?: number | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          kind?: string
          name?: string
          nodes?: Json | null
          sort_order?: number | null
          title?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
