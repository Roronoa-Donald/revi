-- ============================================================
-- 004 — Configuration IA & Pool de clés multi-fournisseurs
-- Support multi-providers (OpenRouter, NVIDIA NIM, Ollama Cloud, Custom)
-- et multi-clés par pool pour éviter les rate-limits.
-- Idempotent.
-- ============================================================

CREATE TABLE IF NOT EXISTS ai_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_api_keys (
  id SERIAL PRIMARY KEY,
  provider VARCHAR(50) NOT NULL,
  api_key TEXT NOT NULL,
  label VARCHAR(100),
  base_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  request_count INT NOT NULL DEFAULT 0,
  error_count INT NOT NULL DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_api_keys_provider ON ai_api_keys(provider);
CREATE INDEX IF NOT EXISTS idx_ai_api_keys_active ON ai_api_keys(is_active);

-- Valeurs par défaut idempotentes
INSERT INTO ai_config (key, value) VALUES ('active_provider', 'openrouter') ON CONFLICT (key) DO NOTHING;
INSERT INTO ai_config (key, value) VALUES ('chat_model', 'deepseek/deepseek-chat') ON CONFLICT (key) DO NOTHING;
INSERT INTO ai_config (key, value) VALUES ('code_model', 'deepseek/deepseek-chat') ON CONFLICT (key) DO NOTHING;
INSERT INTO ai_config (key, value) VALUES ('temperature', '0.7') ON CONFLICT (key) DO NOTHING;
INSERT INTO ai_config (key, value) VALUES ('max_tokens', '2048') ON CONFLICT (key) DO NOTHING;
