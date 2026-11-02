BEGIN;
UPDATE employes SET salaire = 101 WHERE id = 1;
SELECT 'AVANT_ROLLBACK|' || (SELECT count(*) FROM audit_log) || '|'
       || (SELECT salaire FROM employes WHERE id = 1);
ROLLBACK;
SELECT 'APRES_ROLLBACK|' || (SELECT count(*) FROM audit_log) || '|'
       || (SELECT salaire FROM employes WHERE id = 1);
