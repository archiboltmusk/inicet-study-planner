-- Dedicated per-row mistake logbook table for premium users.
-- Free users use localStorage only; premium users get realtime sync here.

CREATE TABLE IF NOT EXISTS mistake_logbook (
  id             TEXT PRIMARY KEY,
  user_id        UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  subject        TEXT NOT NULL DEFAULT '',
  topic          TEXT NOT NULL DEFAULT '',
  question       TEXT NOT NULL DEFAULT '',
  correct_answer TEXT NOT NULL DEFAULT '',
  my_answer      TEXT NOT NULL DEFAULT '',
  why_wrong      TEXT NOT NULL DEFAULT '',
  reviewed       BOOLEAN NOT NULL DEFAULT false,
  source         TEXT CHECK (source IN ('auto', 'manual')) DEFAULT 'manual'
);

-- Full replica identity so DELETE events carry the old row (needed for realtime)
ALTER TABLE mistake_logbook REPLICA IDENTITY FULL;

-- Row-level security: each user owns their own rows
ALTER TABLE mistake_logbook ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own mistake rows" ON mistake_logbook;
CREATE POLICY "Users manage own mistake rows"
  ON mistake_logbook FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS mistake_logbook_user_created
  ON mistake_logbook (user_id, created_at DESC);

-- Enable realtime for this table (skip if already a member)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'mistake_logbook'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE mistake_logbook;
  END IF;
END $$;
