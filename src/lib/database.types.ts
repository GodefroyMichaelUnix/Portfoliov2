export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          email: string
          id: number
          message: string
          name: string
          project_type: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          message: string
          name: string
          project_type: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          message?: string
          name?: string
          project_type?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
