-- ============================================================
-- 003 — Niveau du compte (B1 / B2 / B3)
-- Le niveau est choisi à l'inscription. Règle d'accès hiérarchique :
--   B1 ne voit que le contenu B1 ; B2 voit B1+B2 ; B3 voit tout.
-- Défaut 'b2' : préserve l'accès des comptes existants (tous les cours
-- historiques sont de niveau B2).
-- Idempotent.
-- ============================================================

ALTER TABLE users ADD COLUMN IF NOT EXISTS level VARCHAR(2) NOT NULL DEFAULT 'b2';

-- Contrainte de domaine (idempotente : on retire puis on recrée).
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_level_check;
ALTER TABLE users ADD CONSTRAINT users_level_check CHECK (level IN ('b1', 'b2', 'b3'));

CREATE INDEX IF NOT EXISTS idx_users_level ON users(level);
