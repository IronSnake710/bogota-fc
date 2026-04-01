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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      competitions: {
        Row: {
          competition_type: string
          country: string | null
          created_at: string
          id: string
          logo_url: string | null
          name: string
          season_id: string | null
          short_name: string | null
          slug: string
          status: string
          team_id: string | null
          updated_at: string
        }
        Insert: {
          competition_type?: string
          country?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          season_id?: string | null
          short_name?: string | null
          slug: string
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          competition_type?: string
          country?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          season_id?: string | null
          short_name?: string | null
          slug?: string
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_at: string | null
          event_type: string
          id: string
          location_text: string | null
          slug: string
          start_at: string
          status: string
          team_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_at?: string | null
          event_type?: string
          id?: string
          location_text?: string | null
          slug: string
          start_at: string
          status?: string
          team_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_at?: string | null
          event_type?: string
          id?: string
          location_text?: string | null
          slug?: string
          start_at?: string
          status?: string
          team_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          away_score: number | null
          away_team_id: string
          broadcast_channel: string | null
          competition_id: string
          created_at: string
          home_score: number | null
          home_team_id: string
          id: string
          is_home: boolean
          kickoff_at: string
          matchday: number | null
          notes: string | null
          season_id: string
          stadium_id: string | null
          status: string
          team_id: string | null
          updated_at: string
        }
        Insert: {
          away_score?: number | null
          away_team_id: string
          broadcast_channel?: string | null
          competition_id: string
          created_at?: string
          home_score?: number | null
          home_team_id: string
          id?: string
          is_home?: boolean
          kickoff_at: string
          matchday?: number | null
          notes?: string | null
          season_id: string
          stadium_id?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          away_score?: number | null
          away_team_id?: string
          broadcast_channel?: string | null
          competition_id?: string
          created_at?: string
          home_score?: number | null
          home_team_id?: string
          id?: string
          is_home?: boolean
          kickoff_at?: string
          matchday?: number | null
          notes?: string | null
          season_id?: string
          stadium_id?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      media_refs: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          kind: string
          sort_order: number
          source: string
          source_id: string
          team_id: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          kind: string
          sort_order?: number
          source: string
          source_id: string
          team_id?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          kind?: string
          sort_order?: number
          source?: string
          source_id?: string
          team_id?: string | null
          url?: string
        }
        Relationships: []
      }
      memberships: {
        Row: {
          billing_interval: string
          created_at: string
          currency: string
          description: string | null
          id: string
          name: string
          price_amount: number
          slug: string
          status: string
          team_id: string | null
          updated_at: string
        }
        Insert: {
          billing_interval?: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          name: string
          price_amount?: number
          slug: string
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          billing_interval?: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          name?: string
          price_amount?: number
          slug?: string
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          created_at: string
          external_url: string | null
          id: string
          label: string
          link_type: string
          parent_id: string | null
          slug: string | null
          sort_order: number
          status: string
          target_news_slug: string | null
          target_page_slug: string | null
          team_id: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          external_url?: string | null
          id?: string
          label: string
          link_type?: string
          parent_id?: string | null
          slug?: string | null
          sort_order?: number
          status?: string
          target_news_slug?: string | null
          target_page_slug?: string | null
          team_id?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          external_url?: string | null
          id?: string
          label?: string
          link_type?: string
          parent_id?: string | null
          slug?: string | null
          sort_order?: number
          status?: string
          target_news_slug?: string | null
          target_page_slug?: string | null
          team_id?: string | null
          url?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          body: string | null
          content_type: string
          cover_image_url: string | null
          created_at: string
          id: string
          published_at: string | null
          slug: string
          status: string
          summary: string | null
          team_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          content_type?: string
          cover_image_url?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          summary?: string | null
          team_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          content_type?: string
          cover_image_url?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          summary?: string | null
          team_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          body: string | null
          created_at: string
          hero_image_url: string | null
          id: string
          slug: string
          status: string
          team_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          hero_image_url?: string | null
          id?: string
          slug: string
          status?: string
          team_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          hero_image_url?: string | null
          id?: string
          slug?: string
          status?: string
          team_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      players: {
        Row: {
          bio: string | null
          contract_until: string | null
          created_at: string
          date_of_birth: string | null
          display_name: string | null
          first_name: string
          height_cm: number | null
          jersey_number: number | null
          joined_at: string | null
          last_name: string
          nationality: string | null
          photo_url: string | null
          position: string | null
          slug: string
          status: string
          team_id: string | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          bio?: string | null
          contract_until?: string | null
          created_at?: string
          date_of_birth?: string | null
          display_name?: string | null
          first_name: string
          height_cm?: number | null
          jersey_number?: number | null
          joined_at?: string | null
          last_name: string
          nationality?: string | null
          photo_url?: string | null
          position?: string | null
          slug: string
          status?: string
          team_id?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          bio?: string | null
          contract_until?: string | null
          created_at?: string
          date_of_birth?: string | null
          display_name?: string | null
          first_name?: string
          height_cm?: number | null
          jersey_number?: number | null
          joined_at?: string | null
          last_name?: string
          nationality?: string | null
          photo_url?: string | null
          position?: string | null
          slug?: string
          status?: string
          team_id?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      seasons: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          name: string
          slug: string
          start_date: string | null
          status: string
          team_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          name: string
          slug: string
          start_date?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          name?: string
          slug?: string
          start_date?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          slug: string
          status: string
          team_id: string | null
          tier: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          slug: string
          status?: string
          team_id?: string | null
          tier?: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
          status?: string
          team_id?: string | null
          tier?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          bio: string | null
          contract_until: string | null
          created_at: string
          date_of_birth: string | null
          display_name: string | null
          first_name: string
          joined_at: string | null
          last_name: string
          nationality: string | null
          photo_url: string | null
          role: string
          slug: string
          status: string
          team_id: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          contract_until?: string | null
          created_at?: string
          date_of_birth?: string | null
          display_name?: string | null
          first_name: string
          joined_at?: string | null
          last_name: string
          nationality?: string | null
          photo_url?: string | null
          role: string
          slug: string
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          contract_until?: string | null
          created_at?: string
          date_of_birth?: string | null
          display_name?: string | null
          first_name?: string
          joined_at?: string | null
          last_name?: string
          nationality?: string | null
          photo_url?: string | null
          role?: string
          slug?: string
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      stadiums: {
        Row: {
          capacity: number | null
          city: string | null
          country: string | null
          created_at: string
          id: string
          map_embed_url: string | null
          name: string
          slug: string
          status: string
          team_id: string | null
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          map_embed_url?: string | null
          name: string
          slug: string
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          map_embed_url?: string | null
          name?: string
          slug?: string
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      standings: {
        Row: {
          competition_id: string
          drawn: number | null
          form: string | null
          goal_difference: number | null
          goals_against: number | null
          goals_for: number | null
          id: string
          lost: number | null
          played: number | null
          points: number | null
          position: number | null
          season_id: string
          team_id: string | null
          team_ref_id: string
          updated_at: string
          won: number | null
        }
        Insert: {
          competition_id: string
          drawn?: number | null
          form?: string | null
          goal_difference?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: string
          lost?: number | null
          played?: number | null
          points?: number | null
          position?: number | null
          season_id: string
          team_id?: string | null
          team_ref_id: string
          updated_at?: string
          won?: number | null
        }
        Update: {
          competition_id?: string
          drawn?: number | null
          form?: string | null
          goal_difference?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: string
          lost?: number | null
          played?: number | null
          points?: number | null
          position?: number | null
          season_id?: string
          team_id?: string | null
          team_ref_id?: string
          updated_at?: string
          won?: number | null
        }
        Relationships: []
      }
      stats: {
        Row: {
          assists: number | null
          created_at: string
          goals: number | null
          id: string
          interceptions: number | null
          match_id: string
          minutes_played: number | null
          passes: number | null
          passes_completed: number | null
          player_id: string
          rating: number | null
          red_cards: number | null
          saves: number | null
          shots: number | null
          shots_on_target: number | null
          tackles: number | null
          team_id: string | null
          updated_at: string
          yellow_cards: number | null
        }
        Insert: {
          assists?: number | null
          created_at?: string
          goals?: number | null
          id?: string
          interceptions?: number | null
          match_id: string
          minutes_played?: number | null
          passes?: number | null
          passes_completed?: number | null
          player_id: string
          rating?: number | null
          red_cards?: number | null
          saves?: number | null
          shots?: number | null
          shots_on_target?: number | null
          tackles?: number | null
          team_id?: string | null
          updated_at?: string
          yellow_cards?: number | null
        }
        Update: {
          assists?: number | null
          created_at?: string
          goals?: number | null
          id?: string
          interceptions?: number | null
          match_id?: string
          minutes_played?: number | null
          passes?: number | null
          passes_completed?: number | null
          player_id?: string
          rating?: number | null
          red_cards?: number | null
          saves?: number | null
          shots?: number | null
          shots_on_target?: number | null
          tackles?: number | null
          team_id?: string | null
          updated_at?: string
          yellow_cards?: number | null
        }
        Relationships: []
      }
      store_products: {
        Row: {
          created_at: string
          currency: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price_amount: number
          slug: string
          status: string
          stock_quantity: number
          team_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price_amount?: number
          slug: string
          status?: string
          stock_quantity?: number
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price_amount?: number
          slug?: string
          status?: string
          stock_quantity?: number
          team_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          founded_year: number | null
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          short_name: string | null
          slug: string
          stadium_id: string | null
          status: string
          team_id: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          founded_year?: number | null
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          short_name?: string | null
          slug: string
          stadium_id?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          founded_year?: number | null
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          short_name?: string | null
          slug?: string
          stadium_id?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          created_at: string
          currency: string
          event_id: string | null
          id: string
          name: string
          price_amount: number
          sales_end_at: string | null
          sales_start_at: string | null
          slug: string
          status: string
          team_id: string | null
          total_quantity: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          event_id?: string | null
          id?: string
          name: string
          price_amount?: number
          sales_end_at?: string | null
          sales_start_at?: string | null
          slug: string
          status?: string
          team_id?: string | null
          total_quantity?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          event_id?: string | null
          id?: string
          name?: string
          price_amount?: number
          sales_end_at?: string | null
          sales_start_at?: string | null
          slug?: string
          status?: string
          team_id?: string | null
          total_quantity?: number
          updated_at?: string
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
