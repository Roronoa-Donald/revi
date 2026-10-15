-- ============================================================
-- 002 — Comptes utilisateurs + abonnements + réinitialisation
-- Système de comptes (email + mot de passe) remplaçant les clés.
-- Les tables clés (activation_keys, etc.) restent en base pour
-- l'historique ; plus aucun nouveau flux ne les utilise.
-- Idempotent.
-- ============================================================

-- ---------------- users ----------------
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(120),
  is_active BOOLEAN DEFAULT TRUE,
  subscription_status VARCHAR(20) NOT NULL DEFAULT 'free',   -- free | active
  subscription_expires_at TIMESTAMP,
  subscription_source VARCHAR(30) DEFAULT 'admin',            -- admin | fedapay | manual
  last_fingerprint VARCHAR(255),
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_subscription ON users(subscription_status, subscription_expires_at);

-- ---------------- password_reset_tokens ----------------
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_prt_hash ON password_reset_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_prt_user ON password_reset_tokens(user_id);

-- ---------------- sessions : rattachées à un user ----------------
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

-- ---------------- activity_logs : référence user ----------------
ALTER TABLE activity_logs ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE activity_logs ADD COLUMN IF NOT EXISTS email VARCHAR(255);
CREATE INDEX IF NOT EXISTS idx_logs_user_id ON activity_logs(user_id);

-- ---------------- preparation_profiles / progress : par user ----------------
-- Anciennement keyé uniquement sur key_id (PRIMARY KEY). On rend key_id
-- nullable et on pose des index uniques partiels pour les deux ères.
ALTER TABLE preparation_profiles DROP CONSTRAINT IF EXISTS preparation_profiles_pkey;
ALTER TABLE preparation_progress DROP CONSTRAINT IF EXISTS preparation_progress_pkey;

ALTER TABLE preparation_profiles ALTER COLUMN key_id DROP NOT NULL;
ALTER TABLE preparation_progress ALTER COLUMN key_id DROP NOT NULL;

ALTER TABLE preparation_profiles ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE preparation_progress ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

CREATE UNIQUE INDEX IF NOT EXISTS prep_profiles_key_uidx
  ON preparation_profiles(key_id) WHERE key_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS prep_profiles_user_uidx
  ON preparation_profiles(user_id) WHERE user_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS prep_progress_key_uidx
  ON preparation_progress(key_id, project_id) WHERE key_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS prep_progress_user_uidx
  ON preparation_progress(user_id, project_id) WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_preparation_profiles_user ON preparation_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_preparation_progress_user ON preparation_progress(user_id);

-- ---------------- FedaPay : paiements ----------------
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  fedapay_transaction_id VARCHAR(64),
  fedapay_customer_id VARCHAR(64),
  amount INTEGER NOT NULL,
  currency VARCHAR(8) DEFAULT 'XOF',
  description VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',   -- pending | approved | canceled | failed
  months_granted INTEGER DEFAULT 1,
  period_start TIMESTAMP,
  period_end TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_tx ON payments(fedapay_transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
