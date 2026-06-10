-- user_data: one row per authenticated user, stores all app state
-- Components keep localStorage as the fast read/write cache;
-- this table is the cloud backup and cross-device sync layer.

CREATE TABLE IF NOT EXISTS user_data (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,

  -- Core study state (synced per-field by useCloudSync in App.tsx)
  completed_days   JSONB        DEFAULT '[]',
  notes            JSONB        DEFAULT '{}',
  mcq_scores       JSONB        DEFAULT '{}',
  flagged          JSONB        DEFAULT '[]',
  sr_cards         JSONB        DEFAULT '{}',
  streak           JSONB        DEFAULT '{"count":0,"longest":0,"lastDate":""}',
  exam_date        TEXT,

  -- Subject-based notes with SM-2 spaced repetition cards
  subject_notes    JSONB        DEFAULT '{}',

  -- Daily Plan checklist (unified_todos_v2)
  todos_checked    JSONB        DEFAULT '{}',

  -- Mistake logbook entries
  mistake_logbook  JSONB        DEFAULT '[]',

  -- Flashcard deck with SM-2 scheduling
  flashcards       JSONB        DEFAULT '{}',

  -- Revision schedule (Ebbinghaus intervals)
  revision_schedule JSONB       DEFAULT '[]',

  -- Mock test scores history
  mock_scores      JSONB        DEFAULT '[]',

  -- Wellbeing / stress log
  stress_log       JSONB        DEFAULT '[]',

  -- Buddy match profile preferences
  buddy_profile    JSONB        DEFAULT '{}',

  -- Circadian settings {wake, sleep}
  circadian        JSONB        DEFAULT '{}',

  -- Bookmarked guidelines
  guideline_bookmarks JSONB     DEFAULT '[]',

  -- Known one-liners
  known_oneliners  JSONB        DEFAULT '[]',

  -- Subject drill scores
  drill_scores     JSONB        DEFAULT '{}',

  -- AI quiz attempt log
  ai_quiz_log      JSONB        DEFAULT '[]',

  -- Custom mock test history
  custom_mock_history JSONB     DEFAULT '[]',

  -- MCQ explanation quality ratings
  explanation_ratings JSONB     DEFAULT '{}',

  -- Pomodoro session history
  pomodoro_sessions JSONB       DEFAULT '[]',

  -- PDF learning history (NOT the API key — that stays local)
  pdf_history      JSONB        DEFAULT '[]',
  pdf_sr_cards     JSONB        DEFAULT '{}',

  -- Exam-eve checklist state {checklist, dismissed}
  exam_eve         JSONB        DEFAULT '{}',

  -- Gamification {bonusXP, unlockedIds, drillsCompleted, simCompleted}
  gamification     JSONB        DEFAULT '{"bonusXP":0,"unlockedIds":[],"drillsCompleted":0,"simCompleted":false}',

  -- PYQ attempt tracking
  pyq_attempts     JSONB        DEFAULT '{}',

  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Row-level security: users can only read/write their own row
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own data" ON user_data;
CREATE POLICY "Users read own data"
  ON user_data FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own data" ON user_data;
CREATE POLICY "Users insert own data"
  ON user_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own data" ON user_data;
CREATE POLICY "Users update own data"
  ON user_data FOR UPDATE
  USING (auth.uid() = user_id);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_user_data_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS user_data_updated_at ON user_data;
CREATE TRIGGER user_data_updated_at
  BEFORE UPDATE ON user_data
  FOR EACH ROW EXECUTE FUNCTION update_user_data_timestamp();
