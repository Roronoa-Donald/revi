BEGIN;
UPDATE employes SET salaire = 101 WHERE id = 1;
COMMIT;
SELECT 'APRES_COMMIT|' || (SELECT count(*) FROM audit_log) || '|'
       || (SELECT salaire FROM employes WHERE id = 1);
