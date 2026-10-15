-- ============================================================
-- 001 — État initial du schéma « Cours Interactifs »
-- Extrait fidèlement de server/db.js initDB() (vague db-migration-build).
-- Idempotent (IF NOT EXISTS partout) — bookkeeping via schema_migrations.
-- ============================================================

-- Bookkeeping des migrations (créé d'abord, par le runner lui-même aussi)
CREATE TABLE IF NOT EXISTS schema_migrations (
  name TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------- activation_keys ----------------
CREATE TABLE IF NOT EXISTS activation_keys (
  id SERIAL PRIMARY KEY,
  key_code VARCHAR(9) UNIQUE NOT NULL,
  scope VARCHAR(255) NOT NULL DEFAULT 'all',
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP,
  machine_fingerprint VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  note VARCHAR(255),
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days'),
  renewed_at TIMESTAMP DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS idx_keys_code ON activation_keys(key_code);
CREATE INDEX IF NOT EXISTS idx_keys_expires ON activation_keys(expires_at);

-- Expiration mensuelle par défaut + backfill ponctuel (historique initDB)
ALTER TABLE activation_keys ALTER COLUMN expires_at SET DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days');
UPDATE activation_keys SET expires_at = created_at + INTERVAL '30 days' WHERE renewed_at IS NULL;

-- ---------------- sessions ----------------
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  key_id INTEGER REFERENCES activation_keys(id) ON DELETE CASCADE,
  jti VARCHAR(255) UNIQUE NOT NULL,
  machine_fingerprint VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_verified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_valid BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_sessions_jti ON sessions(jti);
CREATE INDEX IF NOT EXISTS idx_sessions_key_id ON sessions(key_id);

-- ---------------- activity_logs ----------------
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  key_id INTEGER REFERENCES activation_keys(id) ON DELETE SET NULL,
  session_id INTEGER REFERENCES sessions(id) ON DELETE SET NULL,
  key_code VARCHAR(9),
  scope VARCHAR(255),
  course VARCHAR(100),
  ip_address VARCHAR(50),
  machine_fingerprint VARCHAR(255),
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_logs_event ON activity_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_logs_created ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_logs_key_id ON activity_logs(key_id);

-- ---------------- colonnes migrées (historique) ----------------
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='activation_keys' AND column_name='expires_at') THEN
    ALTER TABLE activation_keys ADD COLUMN expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='activation_keys' AND column_name='renewed_at') THEN
    ALTER TABLE activation_keys ADD COLUMN renewed_at TIMESTAMP DEFAULT NULL;
  END IF;
END $$;

-- Classe de clés (b1/b2)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='activation_keys' AND column_name='class') THEN
    ALTER TABLE activation_keys ADD COLUMN class VARCHAR(10) DEFAULT 'b2';
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_keys_class ON activation_keys(class);
UPDATE activation_keys SET class = 'b2' WHERE class IS NULL;

-- Platform de sessions (sessions parallèles B1/B2)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='sessions' AND column_name='platform') THEN
    ALTER TABLE sessions ADD COLUMN platform VARCHAR(10) DEFAULT 'b2';
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_sessions_platform ON sessions(platform);

-- ---------------- Preparation Web ----------------
CREATE TABLE IF NOT EXISTS preparation_profiles (
  key_id INTEGER PRIMARY KEY REFERENCES activation_keys(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_xp INTEGER DEFAULT 0,
  projects_completed INTEGER DEFAULT 0,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS preparation_progress (
  key_id INTEGER REFERENCES activation_keys(id) ON DELETE CASCADE,
  project_id INTEGER NOT NULL,
  html_code TEXT DEFAULT '',
  js_code TEXT DEFAULT '',
  completed BOOLEAN DEFAULT FALSE,
  project_xp INTEGER DEFAULT 0,
  quiz_xp INTEGER DEFAULT 0,
  quiz_score INTEGER DEFAULT 0,
  quiz_completed BOOLEAN DEFAULT FALSE,
  used_hint BOOLEAN DEFAULT FALSE,
  used_solution BOOLEAN DEFAULT FALSE,
  attempts INTEGER DEFAULT 0,
  curriculum_version INTEGER DEFAULT 2,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (key_id, project_id)
);

CREATE INDEX IF NOT EXISTS idx_preparation_profiles_rank
  ON preparation_profiles(total_xp DESC, projects_completed DESC, last_activity ASC);
CREATE INDEX IF NOT EXISTS idx_preparation_progress_key
  ON preparation_progress(key_id);
CREATE INDEX IF NOT EXISTS idx_preparation_progress_project
  ON preparation_progress(project_id);

ALTER TABLE preparation_progress
  ADD COLUMN IF NOT EXISTS curriculum_version INTEGER DEFAULT 1;

-- ---------------- Triggers d'audit ----------------
CREATE OR REPLACE FUNCTION log_key_changes() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO activity_logs (event_type, key_id, key_code, scope, details)
    VALUES ('key_created', NEW.id, NEW.key_code, NEW.scope, 'Clé créée' || COALESCE(' - ' || NEW.note, ''));
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.is_active = TRUE AND NEW.is_active = FALSE THEN
      INSERT INTO activity_logs (event_type, key_id, key_code, scope, details)
      VALUES ('key_revoked', NEW.id, NEW.key_code, NEW.scope, 'Clé révoquée');
    ELSIF OLD.is_active = FALSE AND NEW.is_active = TRUE THEN
      INSERT INTO activity_logs (event_type, key_id, key_code, scope, details)
      VALUES ('key_reactivated', NEW.id, NEW.key_code, NEW.scope, 'Clé réactivée');
    ELSIF OLD.is_used = FALSE AND NEW.is_used = TRUE THEN
      INSERT INTO activity_logs (event_type, key_id, key_code, scope, details, machine_fingerprint)
      VALUES ('key_activated', NEW.id, NEW.key_code, NEW.scope, 'Clé activée sur une machine', NEW.machine_fingerprint);
    ELSIF OLD.is_used = TRUE AND NEW.is_used = FALSE THEN
      INSERT INTO activity_logs (event_type, key_id, key_code, scope, details)
      VALUES ('key_reset', NEW.id, NEW.key_code, NEW.scope, 'Clé réinitialisée');
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO activity_logs (event_type, key_code, scope, details)
    VALUES ('key_deleted', OLD.key_code, OLD.scope, 'Clé supprimée définitivement');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_key_changes ON activation_keys;
CREATE TRIGGER trg_key_changes
AFTER INSERT OR UPDATE OR DELETE ON activation_keys
FOR EACH ROW EXECUTE FUNCTION log_key_changes();

CREATE OR REPLACE FUNCTION log_session_changes() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO activity_logs (event_type, session_id, key_id, machine_fingerprint, details)
    VALUES ('session_created', NEW.id, NEW.key_id, NEW.machine_fingerprint, 'Nouvelle session');
  ELSIF TG_OP = 'UPDATE' AND OLD.is_valid = TRUE AND NEW.is_valid = FALSE THEN
    INSERT INTO activity_logs (event_type, session_id, key_id, machine_fingerprint, details)
    VALUES ('session_revoked', NEW.id, NEW.key_id, NEW.machine_fingerprint, 'Session révoquée');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_session_changes ON sessions;
CREATE TRIGGER trg_session_changes
AFTER INSERT OR UPDATE ON sessions
FOR EACH ROW EXECUTE FUNCTION log_session_changes();
