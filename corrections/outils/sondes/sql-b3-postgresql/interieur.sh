#!/bin/sh
set -eu
umask 077

fail() {
    printf 'ERREUR : %s\n' "$1" >&2
    exit 1
}

if [ "${HOME+x}" = x ]; then fail 'HOME est défini dans le bac à sable'; fi
if [ -e /home ] || [ -e /root ]; then fail 'Un répertoire personnel est monté'; fi
if [ "$(readlink /proc/self/ns/net)" = "$PARENT_NETNS" ]; then fail 'Le réseau du parent est visible'; fi
if [ "$(id -u)" -eq 0 ]; then fail 'initdb doit être lancé par un utilisateur non root'; fi
printf 'audit:x:%s:%s:Audit:/nonexistent:/bin/sh\n' "$(id -u)" "$(id -g)" > /etc/passwd
printf 'audit:x:%s:\n' "$(id -g)" > /etc/group
printf '%s\n' 'ISOLATION|HOME absent|/home et /root absents|namespace réseau distinct'

"$PYTHON_BIN" -I /outil/extraire.py
mkdir /tmp/cluster /tmp/socket
initdb --no-sync --auth=trust --username=audit --locale=C --encoding=UTF8 -D /tmp/cluster >/tmp/initdb.log
postgres -D /tmp/cluster -c listen_addresses='' -c unix_socket_directories=/tmp/socket \
    -c port=55439 -c shared_buffers=16MB -c max_connections=10 -c fsync=off \
    -c jit=off -c statement_timeout=3000 -c lock_timeout=1000 >/tmp/postgres.log 2>&1 &
server=$!
trap 'kill "$server" 2>/dev/null || true; wait "$server" 2>/dev/null || true' EXIT

ready=0
attempt=0
while [ "$attempt" -lt 100 ]; do
    if pg_isready -q -h /tmp/socket -p 55439 -U audit; then ready=1; break; fi
    attempt=$((attempt + 1))
    sleep 0.1
done
if [ "$ready" -ne 1 ]; then
    sed -n '1,30p' /tmp/postgres.log
    fail 'PostgreSQL temporaire ne démarre pas'
fi

psql_cmd() {
    psql -X -w -q -h /tmp/socket -p 55439 -U audit -d postgres -A -t -v ON_ERROR_STOP=1 "$@"
}

environment=$(psql_cmd -c "SELECT current_setting('server_version'), current_setting('server_version_num'), current_setting('listen_addresses') = '', inet_server_addr() IS NULL, current_setting('unix_socket_directories');")
case "$environment" in
    *'|t|t|/tmp/socket') printf 'POSTGRESQL|%s|sans TCP\n' "$environment" ;;
    *) fail 'Le serveur temporaire n’est pas limité à son socket interne' ;;
esac
version_num=$(psql_cmd -c "SELECT current_setting('server_version_num');")
if [ "$version_num" -lt 140000 ]; then fail 'PostgreSQL 14 ou ultérieur est requis pour NUMERIC Infinity'; fi
psql_cmd -f /outil/sql/schema.sql

printf '%s\n' '=== Contrôles des sources effectives ==='
psql_cmd -f /resultats/extraits/index.sql
printf '%s\n' 'INDEX|CREATE INDEX extrait : accepté'
psql_cmd -f /resultats/extraits/virement.sql
psql_cmd -f /outil/sql/test-virement.sql
psql_cmd -f /resultats/extraits/audit.sql
psql_cmd -f /outil/sql/test-audit.sql
psql_cmd -f /outil/sql/test-rls.sql

cte=$(psql_cmd -f /resultats/extraits/cte-assemblee.sql)
cte_expected=$(printf '1|A|1|{1}\n2|B|2|{1,2}\n3|C|2|{1,3}')
if [ "$cte" != "$cte_expected" ]; then fail 'L’assemblage des fragments CTE ne produit pas les chemins attendus'; fi
printf 'CTE|trois chemins attendus :\n%s\n' "$cte"

psql_cmd -f /resultats/extraits/politique.sql
setting=$(cat /resultats/extraits/contexte.sql)
psql_cmd -c "BEGIN; $setting
    INSERT INTO documents VALUES (1, current_setting('app.current_tenant_id')::uuid);
    INSERT INTO documents VALUES (2,
        CASE WHEN current_setting('app.current_tenant_id')::uuid = '00000000-0000-0000-0000-000000000002'::uuid
             THEN '00000000-0000-0000-0000-000000000003'::uuid
             ELSE '00000000-0000-0000-0000-000000000002'::uuid END);
    COMMIT;"
tenant_initial=$(psql_cmd -c "BEGIN; SET ROLE app_user; $setting SELECT id FROM documents ORDER BY id; ROLLBACK;")
if [ "$tenant_initial" != 1 ]; then fail 'La valeur de contexte réelle ne filtre pas la ligne fictive attendue'; fi
printf '%s\n' 'TENANT|politique et valeur extraites : première ligne visible'
printf '%s\n' 'CONTROLES_CORRECTIONS|OK'

printf '%s\n' '=== Limites observées séparément ==='
psql_cmd -c 'ANALYZE commandes;'
default_plan=$(psql_cmd -c 'EXPLAIN (COSTS OFF) SELECT client_id, total_ttc, date_cmd FROM commandes WHERE client_id=1;')
forced_plan=$(psql_cmd -c 'SET enable_seqscan=off; SET enable_bitmapscan=off; EXPLAIN (ANALYZE, BUFFERS, COSTS OFF, TIMING OFF) SELECT client_id, total_ttc, date_cmd FROM commandes WHERE client_id=1;')
printf '%s\n' "$default_plan" > /resultats/plan-non-force.txt
printf '%s\n' "$forced_plan" > /resultats/plan-force.txt
printf 'PLAN_SANS_FORCAGE|%s\n' "$(printf '%s\n' "$default_plan" | sed -n '1p')"
if printf '%s\n' "$forced_plan" | grep -Fq 'Index Only Scan' && printf '%s\n' "$forced_plan" | grep -Eq 'Heap Fetches: [1-9][0-9]*'; then
    printf 'PLAN_FORCE|Index Only Scan|%s\n' "$(printf '%s\n' "$forced_plan" | sed -n 's/^[[:space:]]*Heap Fetches: /Heap Fetches: /p')"
else
    printf '%s\n' 'PLAN_FORCE|contre-exemple heap non reproduit sur ce moteur et ce plan ; voir plan-force.txt'
fi

psql_cmd -f /outil/sql/limites-numeriques.sql > /resultats/limites-numeriques.txt
cat /resultats/limites-numeriques.txt
accepted=$(sed -n 's/^NON_FINIS_ACCEPTES|//p' /resultats/limites-numeriques.txt)
case "$accepted" in ''|*[!0-9]*) fail 'Résultat des cas numériques non lisible' ;; esac
psql_cmd -f /outil/sql/limite-numeric-precision.sql > /resultats/limite-numeric-precision.txt
cat /resultats/limite-numeric-precision.txt
accepted_precision=$(sed -n 's/^TYP12_NON_FINIS_ACCEPTES|//p' /resultats/limite-numeric-precision.txt)
case "$accepted_precision" in ''|*[!0-9]*) fail 'Résultat des cas numeric(12,2) non lisible' ;; esac
if [ "$accepted" -gt 0 ] || [ "$accepted_precision" -gt 0 ]; then
    printf 'ALERTE_NUMERIQUE|%s/10 cas non finis et %s/3 cas NaN avec numeric(12,2) acceptés\n' "$accepted" "$accepted_precision"
    result=2
else
    printf '%s\n' 'NUMERIQUE|aucun cas non fini de cette matrice accepté'
    result=0
fi

rollback=$(psql_cmd -f /outil/sql/limite-rollback.sql)
expected_rollback=$(printf 'AVANT_ROLLBACK|1|101\nAPRES_ROLLBACK|0|100')
if [ "$rollback" != "$expected_rollback" ]; then fail 'Démonstration AFTER/ROLLBACK inattendue'; fi
printf '%s\n' "$rollback" > /resultats/after-rollback.txt
printf '%s\n' "$rollback"

if psql_cmd -f /outil/sql/limite-contrainte-differee.sql > /resultats/after-contrainte-differee.txt 2>&1; then
    fail 'Le COMMIT avec clé étrangère différée invalide aurait dû échouer'
fi
grep -Fq 'AVANT_COMMIT|1|INCONNU' /resultats/after-contrainte-differee.txt || fail 'La trace AFTER avant COMMIT est absente'
grep -Fq '23503' /resultats/after-contrainte-differee.txt || fail 'Le COMMIT n’a pas échoué avec une violation de clé étrangère'
after_failed_commit=$(psql_cmd -c "SELECT 'APRES_COMMIT_ECHOUE|' || (SELECT count(*) FROM audit_log) || '|' || (SELECT departement FROM employes WHERE id = 1);")
if [ "$after_failed_commit" != 'APRES_COMMIT_ECHOUE|0|IT' ]; then fail 'Le COMMIT échoué n’a pas restauré données et audit'; fi
printf '%s\n' "$after_failed_commit" >> /resultats/after-contrainte-differee.txt
printf '%s\n' 'AFTER_DIFFERE|trace présente avant COMMIT|COMMIT échoué : SQLSTATE 23503'
printf '%s\n' "$after_failed_commit"
committed=$(psql_cmd -f /outil/sql/limite-commit.sql)
if [ "$committed" != 'APRES_COMMIT|1|101' ]; then fail 'Le témoin COMMIT réussi ne persiste pas'; fi
printf '%s\n' "$committed" > /resultats/after-commit.txt
printf '%s\n' "$committed"
psql_cmd -f /outil/sql/limite-proprietaire.sql > /resultats/limite-proprietaire-audit.txt
cat /resultats/limite-proprietaire-audit.txt

second_tenant=$(psql_cmd -c 'SELECT tenant_id FROM documents WHERE id = 2;')
tenant_switched=$(psql_cmd -c "BEGIN; SET ROLE app_user; $setting
    SELECT 'TENANT_INITIAL|' || id FROM documents ORDER BY id;
    SET LOCAL app.current_tenant_id = '$second_tenant';
    SELECT 'TENANT_AUTRE|' || id FROM documents ORDER BY id;
    ROLLBACK;")
tenant_expected=$(printf 'TENANT_INITIAL|1\nTENANT_AUTRE|2')
if [ "$tenant_switched" != "$tenant_expected" ]; then fail 'Changement de contexte tenant non reproduit'; fi
printf '%s\n' "$tenant_switched" > /resultats/limite-tenant.txt
printf '%s\n' "$tenant_switched"
printf '%s\n' 'TENANT|risque conditionnel si le rôle peut exécuter du SQL arbitraire'

printf 'FIN|contrôles de base OK|code %s (2 = valeurs non finies acceptées)\n' "$result"
exit "$result"
