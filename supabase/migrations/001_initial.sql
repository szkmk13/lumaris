-- Create realizacje table
CREATE TABLE IF NOT EXISTS realizacje (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  slug        text UNIQUE NOT NULL,
  description text,
  content     text,
  images      text[],
  created_at  timestamptz DEFAULT now(),
  published   boolean DEFAULT false,
  order_index integer DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE realizacje ENABLE ROW LEVEL SECURITY;

-- Public can read published realizacje
CREATE POLICY "Public read published realizacje"
  ON realizacje FOR SELECT
  USING (published = true);

-- Service role (backend) can do everything
CREATE POLICY "Service role full access"
  ON realizacje FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for images
-- Run this in Supabase Dashboard > Storage, or via CLI:
-- supabase storage create realizacje-images --public
  -- Pozwól anonimowym na pełny zapis do tabeli realizacje                                                                                                
  CREATE POLICY "Anon full write"
    ON realizacje FOR ALL
    USING (true)
    WITH CHECK (true);
  CREATE POLICY "Anon upload images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'realizacje-images');

  CREATE POLICY "Anon delete images"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'realizacje-images');