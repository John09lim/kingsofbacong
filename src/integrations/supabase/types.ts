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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      answer_keys: {
        Row: {
          answers: string[]
          created_at: string
          id: string
          number_of_questions: number
          quiz_title: string
          teacher_id: string
          updated_at: string
        }
        Insert: {
          answers: string[]
          created_at?: string
          id?: string
          number_of_questions: number
          quiz_title: string
          teacher_id: string
          updated_at?: string
        }
        Update: {
          answers?: string[]
          created_at?: string
          id?: string
          number_of_questions?: number
          quiz_title?: string
          teacher_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      attendance_records: {
        Row: {
          class_name: string
          created_at: string
          date: string
          id: string
          notes: string | null
          status: string
          student_id: string
          teacher_id: string
          updated_at: string
        }
        Insert: {
          class_name: string
          created_at?: string
          date: string
          id?: string
          notes?: string | null
          status: string
          student_id: string
          teacher_id: string
          updated_at?: string
        }
        Update: {
          class_name?: string
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          status?: string
          student_id?: string
          teacher_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["message_role"]
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["message_role"]
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["message_role"]
          user_id?: string
        }
        Relationships: []
      }
      gcash_payments: {
        Row: {
          ai_verification_result: Json | null
          created_at: string
          id: string
          payment_date: string | null
          reference_number: string | null
          screenshot_url: string | null
          transaction_id: string | null
          updated_at: string
          user_id: string
          verification_status: string
        }
        Insert: {
          ai_verification_result?: Json | null
          created_at?: string
          id?: string
          payment_date?: string | null
          reference_number?: string | null
          screenshot_url?: string | null
          transaction_id?: string | null
          updated_at?: string
          user_id: string
          verification_status?: string
        }
        Update: {
          ai_verification_result?: Json | null
          created_at?: string
          id?: string
          payment_date?: string | null
          reference_number?: string | null
          screenshot_url?: string | null
          transaction_id?: string | null
          updated_at?: string
          user_id?: string
          verification_status?: string
        }
        Relationships: []
      }
      GUROAI: {
        Row: {
          created_at: string
          id: number
          subscription_expires_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          subscription_expires_at: string
        }
        Update: {
          created_at?: string
          id?: number
          subscription_expires_at?: string
        }
        Relationships: []
      }
      lesson_plan_cache: {
        Row: {
          cache_key: string
          content: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          cache_key: string
          content: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          cache_key?: string
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      lesson_plans: {
        Row: {
          content: string
          created_at: string
          grade_level: string | null
          id: string
          language: string | null
          method: string
          subject: string
          topic: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          grade_level?: string | null
          id?: string
          language?: string | null
          method: string
          subject: string
          topic: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          grade_level?: string | null
          id?: string
          language?: string | null
          method?: string
          subject?: string
          topic?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          last_activity_at: string | null
          total_training_minutes: number | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          last_activity_at?: string | null
          total_training_minutes?: number | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          last_activity_at?: string | null
          total_training_minutes?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      quizzes: {
        Row: {
          created_at: string
          exam_type: string
          grade_level: string
          id: string
          quiz_data: string
          subject: string
          topic: string
          tos_data: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          exam_type: string
          grade_level: string
          id?: string
          quiz_data: string
          subject: string
          topic: string
          tos_data?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          exam_type?: string
          grade_level?: string
          id?: string
          quiz_data?: string
          subject?: string
          topic?: string
          tos_data?: string | null
          user_id?: string
        }
        Relationships: []
      }
      saved_stories: {
        Row: {
          age_group: string
          created_at: string
          id: string
          page_count: number
          story_data: string
          story_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age_group: string
          created_at?: string
          id?: string
          page_count: number
          story_data: string
          story_type: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age_group?: string
          created_at?: string
          id?: string
          page_count?: number
          story_data?: string
          story_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scan_results: {
        Row: {
          answer_key_id: string
          answers: string[]
          created_at: string
          id: string
          incorrect_questions: number[]
          percentage: number
          scan_date: string
          score: number
          student_id: string
          student_name: string
          teacher_id: string
        }
        Insert: {
          answer_key_id: string
          answers: string[]
          created_at?: string
          id?: string
          incorrect_questions: number[]
          percentage: number
          scan_date?: string
          score: number
          student_id: string
          student_name: string
          teacher_id: string
        }
        Update: {
          answer_key_id?: string
          answers?: string[]
          created_at?: string
          id?: string
          incorrect_questions?: number[]
          percentage?: number
          scan_date?: string
          score?: number
          student_id?: string
          student_name?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scan_results_answer_key_id_fkey"
            columns: ["answer_key_id"]
            isOneToOne: false
            referencedRelation: "answer_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_resources: {
        Row: {
          accessed_count: number | null
          created_at: string
          expires_at: string
          id: string
          max_access_count: number | null
          resource_id: string
          resource_type: string
          share_token: string
          teacher_id: string
        }
        Insert: {
          accessed_count?: number | null
          created_at?: string
          expires_at?: string
          id?: string
          max_access_count?: number | null
          resource_id: string
          resource_type: string
          share_token?: string
          teacher_id: string
        }
        Update: {
          accessed_count?: number | null
          created_at?: string
          expires_at?: string
          id?: string
          max_access_count?: number | null
          resource_id?: string
          resource_type?: string
          share_token?: string
          teacher_id?: string
        }
        Relationships: []
      }
      student_scores: {
        Row: {
          activity: string | null
          created_at: string
          date_recorded: string
          id: string
          quarter: string | null
          score: number
          score_type: string
          student_id: string
          subject: string
          teacher_id: string
          total_points: number
        }
        Insert: {
          activity?: string | null
          created_at?: string
          date_recorded: string
          id?: string
          quarter?: string | null
          score: number
          score_type: string
          student_id: string
          subject: string
          teacher_id: string
          total_points: number
        }
        Update: {
          activity?: string | null
          created_at?: string
          date_recorded?: string
          id?: string
          quarter?: string | null
          score?: number
          score_type?: string
          student_id?: string
          subject?: string
          teacher_id?: string
          total_points?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_scores_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          age: number | null
          citizenship: string | null
          created_at: string
          current_residence: string | null
          date_of_birth: string | null
          date_of_first_attendance: string | null
          dialects: string | null
          ethnicities: string | null
          family_name: string
          father_name: string | null
          first_name: string
          gender: string | null
          grade_level: string
          id: string
          lrn: string
          middle_name: string | null
          mother_tongue: string | null
          mothers_maiden_name: string | null
          place_of_birth: string | null
          religion: string | null
          section: string | null
          teacher_id: string
          updated_at: string
        }
        Insert: {
          age?: number | null
          citizenship?: string | null
          created_at?: string
          current_residence?: string | null
          date_of_birth?: string | null
          date_of_first_attendance?: string | null
          dialects?: string | null
          ethnicities?: string | null
          family_name: string
          father_name?: string | null
          first_name: string
          gender?: string | null
          grade_level: string
          id?: string
          lrn: string
          middle_name?: string | null
          mother_tongue?: string | null
          mothers_maiden_name?: string | null
          place_of_birth?: string | null
          religion?: string | null
          section?: string | null
          teacher_id: string
          updated_at?: string
        }
        Update: {
          age?: number | null
          citizenship?: string | null
          created_at?: string
          current_residence?: string | null
          date_of_birth?: string | null
          date_of_first_attendance?: string | null
          dialects?: string | null
          ethnicities?: string | null
          family_name?: string
          father_name?: string | null
          first_name?: string
          gender?: string | null
          grade_level?: string
          id?: string
          lrn?: string
          middle_name?: string | null
          mother_tongue?: string | null
          mothers_maiden_name?: string | null
          place_of_birth?: string | null
          religion?: string | null
          section?: string | null
          teacher_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          start_date: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          activity_type: string
          created_at: string
          duration_minutes: number | null
          id: string
          session_end: string | null
          session_start: string
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          session_end?: string | null
          session_start?: string
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          session_end?: string | null
          session_start?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          created_at: string
          credits: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_devices: {
        Row: {
          created_at: string | null
          device_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      access_shared_resource: {
        Args: { share_token: string }
        Returns: {
          accessed_count: number | null
          created_at: string
          expires_at: string
          id: string
          max_access_count: number | null
          resource_id: string
          resource_type: string
          share_token: string
          teacher_id: string
        }[]
      }
      count_user_devices: {
        Args: Record<PropertyKey, never> | { p_user_id: string }
        Returns: number
      }
    }
    Enums: {
      message_role: "user" | "assistant"
      subscription_status: "active" | "expired" | "canceled"
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
    Enums: {
      message_role: ["user", "assistant"],
      subscription_status: ["active", "expired", "canceled"],
    },
  },
} as const
