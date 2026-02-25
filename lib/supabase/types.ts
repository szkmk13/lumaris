export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Realizacja = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  images: string[] | null;
  videos: string[] | null;
  created_at: string;
  published: boolean;
  order_index: number;
};

export type RealizacjaInsert = Omit<Realizacja, "id" | "created_at">;
export type RealizacjaUpdate = Partial<RealizacjaInsert>;

export interface Database {
  public: {
    Tables: {
      realizacje: {
        Row: Realizacja;
        Insert: RealizacjaInsert;
        Update: RealizacjaUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
