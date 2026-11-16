-- ============================================================
-- 009 — Tolérer d'éventuelles colonnes héritées (connect-pg-simple)
-- sur la table sessions (sid, sess, expire) en levant NOT NULL
-- si ces colonnes existent en production.
-- ============================================================

DO $$
DECLARE
  col TEXT;
BEGIN
  FOREACH col IN ARRAY ARRAY['sid', 'sess', 'expire']
  LOOP
    IF EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = current_schema()
        AND table_name = 'sessions'
        AND column_name = col
        AND is_nullable = 'NO'
    ) THEN
      EXECUTE format('ALTER TABLE sessions ALTER COLUMN %I DROP NOT NULL', col);
    END IF;
  END LOOP;
END $$;
