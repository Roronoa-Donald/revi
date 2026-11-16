-- ============================================================
-- 006 — Progression étudiant, essais exercices, Leitner,
--       sessions d'examen QCM et quotas d'exécution journaliers
-- Idempotent (IF NOT EXISTS partout).
-- ============================================================

-- ---------------- user_chapter_progress ----------------
CREATE TABLE IF NOT EXISTS user_chapter_progress (
  user_id INTEGER,
  course_id TEXT,
  chapter_num INTEGER,
  mastery_checked BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, course_id, chapter_num)
);

CREATE INDEX IF NOT EXISTS idx_user_chapter_progress_user
  ON user_chapter_progress (user_id, course_id);

-- ---------------- user_exercise_attempts ----------------
CREATE TABLE IF NOT EXISTS user_exercise_attempts (
  user_id INTEGER,
  exercise_id TEXT,
  attempts_count INTEGER DEFAULT 0,
  solved BOOLEAN DEFAULT FALSE,
  best_passed INTEGER DEFAULT 0,
  total_tests INTEGER DEFAULT 0,
  last_code TEXT,
  solution_revealed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, exercise_id)
);

CREATE INDEX IF NOT EXISTS idx_user_exercise_attempts_user
  ON user_exercise_attempts (user_id);

-- ---------------- user_flashcard_leitner ----------------
CREATE TABLE IF NOT EXISTS user_flashcard_leitner (
  user_id INTEGER,
  course_id TEXT,
  card_hash TEXT,
  box INTEGER DEFAULT 1,
  next_review_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, course_id, card_hash)
);

CREATE INDEX IF NOT EXISTS idx_user_flashcard_leitner_review
  ON user_flashcard_leitner (user_id, course_id, next_review_at);

-- ---------------- qcm_exam_sessions ----------------
CREATE TABLE IF NOT EXISTS qcm_exam_sessions (
  session_id UUID PRIMARY KEY,
  user_key TEXT NOT NULL,
  user_id INTEGER,
  course_id TEXT NOT NULL,
  chapter INTEGER,
  status TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  payload_json JSONB NOT NULL,
  answers_json JSONB,
  score NUMERIC,
  percentage NUMERIC,
  passed BOOLEAN,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_qcm_exam_sessions_active
  ON qcm_exam_sessions (user_key, course_id, status);

CREATE INDEX IF NOT EXISTS idx_qcm_exam_sessions_user
  ON qcm_exam_sessions (user_id);

-- ---------------- execution_quota_daily ----------------
CREATE TABLE IF NOT EXISTS execution_quota_daily (
  quota_key TEXT,
  day_key DATE,
  used_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (quota_key, day_key)
);

CREATE INDEX IF NOT EXISTS idx_execution_quota_daily_day
  ON execution_quota_daily (day_key);
