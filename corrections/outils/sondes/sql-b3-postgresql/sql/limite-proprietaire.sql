SET ROLE audit_owner;
DO $sonde$
BEGIN
    IF (SELECT rolsuper OR rolbypassrls FROM pg_roles WHERE rolname = current_user) THEN
        RAISE EXCEPTION 'Le propriétaire de la sonde est privilégié';
    END IF;
    IF (SELECT count(*) FROM audit_log) <> 1 THEN
        RAISE EXCEPTION 'La trace commitée attendue est absente';
    END IF;
    DELETE FROM audit_log;
    IF (SELECT count(*) FROM audit_log) <> 0 THEN
        RAISE EXCEPTION 'La suppression ne se reproduit pas';
    END IF;
END;
$sonde$;
RESET ROLE;
\echo 'AUDIT|Le propriétaire ordinaire peut supprimer le journal fictif'
