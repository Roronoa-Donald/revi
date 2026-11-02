CREATE TABLE demo_rls (id integer);
INSERT INTO demo_rls VALUES (1), (2);
ALTER TABLE demo_rls OWNER TO rls_owner;
ALTER TABLE demo_rls ENABLE ROW LEVEL SECURITY;
\i /resultats/extraits/force.sql
CREATE POLICY deny_all ON demo_rls FOR SELECT USING (false);
GRANT SELECT ON demo_rls TO bypass_actor;

DO $test$
BEGIN
    IF (SELECT count(*) FROM demo_rls) <> 2 THEN
        RAISE EXCEPTION 'Le superutilisateur ne contourne pas la politique attendue';
    END IF;
END;
$test$;
SET ROLE rls_owner;
DO $test$
BEGIN
    IF (SELECT count(*) FROM demo_rls) <> 0 THEN
        RAISE EXCEPTION 'Le propriétaire ordinaire n’est pas filtré avec FORCE';
    END IF;
END;
$test$;
SET ROLE bypass_actor;
DO $test$
BEGIN
    IF (SELECT count(*) FROM demo_rls) <> 2 THEN
        RAISE EXCEPTION 'Le rôle BYPASSRLS ne contourne pas la politique attendue';
    END IF;
END;
$test$;
RESET ROLE;
\echo 'RLS_FORCE|propriétaire=0|superutilisateur=2|BYPASSRLS=2'
