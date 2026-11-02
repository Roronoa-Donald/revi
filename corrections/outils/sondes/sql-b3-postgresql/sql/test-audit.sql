CREATE TRIGGER sonde_audit AFTER UPDATE OR DELETE ON employes
    FOR EACH ROW EXECUTE FUNCTION audit_employes_trigger();

BEGIN;
UPDATE employes SET salaire = 101 WHERE id = 1;
INSERT INTO employes VALUES (4, 'D', 1, 'IT', 400, '2020-01-01');
DELETE FROM employes WHERE id = 4;
DO $test$
BEGIN
    IF (SELECT count(*) FROM audit_log WHERE op = 'UPDATE' AND row_id = 1) <> 1
       OR (SELECT count(*) FROM audit_log WHERE op = 'DELETE' AND row_id = 4
           AND old_val IS NOT NULL AND new_val IS NULL) <> 1 THEN
        RAISE EXCEPTION 'Les opérations UPDATE et DELETE ne sont pas journalisées comme attendu';
    END IF;
END;
$test$;
ROLLBACK;
\echo 'AUDIT|UPDATE et DELETE journalisés dans la transaction puis annulés'
