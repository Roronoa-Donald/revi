\set VERBOSITY sqlstate
BEGIN;
UPDATE employes SET departement = 'INCONNU' WHERE id = 1;
SELECT 'AVANT_COMMIT|' || (SELECT count(*) FROM audit_log) || '|'
       || (SELECT departement FROM employes WHERE id = 1);
COMMIT;
