-- ============================================================
-- 008 — Durcissement idempotent du schéma d'authentification
-- Garantit qu'une base héritée avant 001/002 accepte les
-- inscriptions et connexions sans contrainte bloquante.
-- ============================================================

-- Autoriser les sessions utilisateurs sans key_id historique
ALTER TABLE sessions ALTER COLUMN key_id DROP NOT NULL;

ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS platform VARCHAR(10) DEFAULT 'b2';
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS machine_fingerprint VARCHAR(255) DEFAULT 'no-fingerprint';

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

-- Colonnes et contraintes de la table users
ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name VARCHAR(120);
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(20) NOT NULL DEFAULT 'free';
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_source VARCHAR(30) DEFAULT 'admin';
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_fingerprint VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS level VARCHAR(2) NOT NULL DEFAULT 'b2';

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_level ON users(level);
