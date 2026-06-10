-- Daily AI-generated question bank for INI-CET / NEET PG preparation
CREATE TABLE IF NOT EXISTS pyq_questions (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  subject       text        NOT NULL,
  topic         text        NOT NULL,
  question      text        NOT NULL,
  options       jsonb       NOT NULL,   -- ["A text", "B text", "C text", "D text"]
  correct_answer integer    NOT NULL CHECK (correct_answer BETWEEN 0 AND 3),
  explanation   text        NOT NULL,
  mnemonic      text,
  key_concept   text,
  difficulty    text        CHECK (difficulty IN ('easy','medium','hard')) DEFAULT 'medium',
  exam_hint     text,                   -- e.g. "INI-CET Nov 2023"
  batch_date    date        NOT NULL DEFAULT CURRENT_DATE,
  created_at    timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pyq_subject    ON pyq_questions (subject);
CREATE INDEX IF NOT EXISTS idx_pyq_batch_date ON pyq_questions (batch_date DESC);
CREATE INDEX IF NOT EXISTS idx_pyq_difficulty ON pyq_questions (difficulty);

-- Public read-only via anon key
-- (DROP IF EXISTS first: the remote DB may have been provisioned before the
-- CLI migration history existed, so every migration must be re-runnable)
ALTER TABLE pyq_questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read" ON pyq_questions;
CREATE POLICY "public_read" ON pyq_questions FOR SELECT USING (true);
