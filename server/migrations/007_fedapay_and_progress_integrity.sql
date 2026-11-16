-- ============================================================
-- 007 — Intégrité FedaPay (anti-rejeu atomique) et
--       contraintes d'intégrité progression / examens locaux
-- ============================================================

-- 1. Registre atomique anti-rejeu des transactions FedaPay créditées
CREATE TABLE IF NOT EXISTS fedapay_credited_transactions (
  transaction_id TEXT PRIMARY KEY,
  payment_id INTEGER REFERENCES payments(id) ON DELETE SET NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'callback',
  credited_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fedapay_credited_tx_user
  ON fedapay_credited_transactions (user_id);

-- Garantir au plus un paiement approuvé par transaction FedaPay
CREATE UNIQUE INDEX IF NOT EXISTS payments_fedapay_tx_approved_uidx
  ON payments (fedapay_transaction_id)
  WHERE fedapay_transaction_id IS NOT NULL AND status = 'approved';

-- 2. Nettoyage défensif d'éventuels enregistrements orphelins avant FK
DELETE FROM user_chapter_progress p
  WHERE NOT EXISTS (SELECT 1 FROM users u WHERE u.id = p.user_id);

DELETE FROM user_exercise_attempts a
  WHERE NOT EXISTS (SELECT 1 FROM users u WHERE u.id = a.user_id);

DELETE FROM user_flashcard_leitner l
  WHERE NOT EXISTS (SELECT 1 FROM users u WHERE u.id = l.user_id);

-- 3. Contraintes de clé étrangère vers users(id) ON DELETE CASCADE (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_chapter_progress_user') THEN
    ALTER TABLE user_chapter_progress
      ADD CONSTRAINT fk_user_chapter_progress_user
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_exercise_attempts_user') THEN
    ALTER TABLE user_exercise_attempts
      ADD CONSTRAINT fk_user_exercise_attempts_user
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_flashcard_leitner_user') THEN
    ALTER TABLE user_flashcard_leitner
      ADD CONSTRAINT fk_user_flashcard_leitner_user
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_qcm_exam_sessions_user') THEN
    UPDATE qcm_exam_sessions s
      SET user_id = NULL
      WHERE user_id IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM users u WHERE u.id = s.user_id);
    ALTER TABLE qcm_exam_sessions
      ADD CONSTRAINT fk_qcm_exam_sessions_user
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- 4. Historique distinct des examens blancs synchronisés côté client (ne pollue pas qcm_exam_sessions)
CREATE TABLE IF NOT EXISTS user_practice_exams (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  client_exam_key TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  passed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, course_id, client_exam_key)
);

CREATE INDEX IF NOT EXISTS idx_user_practice_exams_user
  ON user_practice_exams (user_id, course_id);
