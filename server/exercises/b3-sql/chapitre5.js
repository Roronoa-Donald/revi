// server/exercises/b3-sql/chapitre5.js
// Exercices du Module 5 : Procédures Stockées, Déclencheurs (Triggers) & Sécurité RLS (idPrefix: sql3)

module.exports = [
  {
    id: 'sql3-c5-e1',
    chapter: 5,
    title: 'Simulateur de déclencheur d’audit d’historisation (Audit Trail Trigger)',
    level: 'n1',
    language: 'python',
    goal: 'Simuler le comportement d’un trigger AFTER INSERT/UPDATE/DELETE alimentant une table de journalisation d’audit.',
    brief:
      'Dans les systèmes financiers et médicaux, les réglementations (RGPD, PCI-DSS, HDS) imposent une traçabilité immuable de chaque modification.\n' +
      'Un déclencheur d’audit compare les variables d’état `OLD` et `NEW` :\n' +
      '- Pour `INSERT` : enregistre `diff=INSERTED`.\n' +
      '- Pour `DELETE` : enregistre `diff=DELETED`.\n' +
      '- Pour `UPDATE` : compare les champs clés pour lister précisément les valeurs modifiées sous la forme `champ:old_val->new_val`.\n\n' +
      'Entrée :\n' +
      '`OP action=<INSERT|UPDATE|DELETE> table=<name> id=<row_id> user=<username> [old=<k:v,k:v>] [new=<k:v,k:v>]`\n\n' +
      'Sortie :\n' +
      '- Pour chaque opération :\n' +
      '  `AUDIT_ENTRY action=<ACT> table=<TBL> row_id=<ID> diff=<DIFF> user=<USR>`\n' +
      '- Bilan : `AUDIT_SUMMARY total_events=<N> inserts=<N> updates=<N> deletes=<N>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la comparaison OLD vs NEW et générer les entrées d'audit
`,
    hints: [
      'Parser les champs old et new en dictionnaires pour l’action UPDATE.',
      'Identifier les clés pour lesquelles old[k] != new[k] et formater champ:old->new.',
      'Comptabiliser le nombre d’événements de chaque type.'
    ],
    examples: [
      {
        stdin: 'OP action=INSERT table=users id=10 user=admin new=email:a@b.com,role:user\nOP action=UPDATE table=users id=10 user=sec_admin old=email:a@b.com,role:user new=email:a@b.com,role:admin\nOP action=DELETE table=users id=10 user=admin old=email:a@b.com,role:admin',
        expected: 'AUDIT_ENTRY action=INSERT table=users row_id=10 diff=INSERTED user=admin\nAUDIT_ENTRY action=UPDATE table=users row_id=10 diff=role:user->admin user=sec_admin\nAUDIT_ENTRY action=DELETE table=users row_id=10 diff=DELETED user=admin\nAUDIT_SUMMARY total_events=3 inserts=1 updates=1 deletes=1',
        note: 'Le trigger trace la création, le changement de rôle et la suppression.'
      }
    ],
    tests: [
      {
        label: 'Mise à jour de multiples champs simultanément',
        stdin: 'OP action=UPDATE table=produits id=42 user=gest_stock old=nom:Velo,prix:200,stock:10 new=nom:Velo,prix:250,stock:8',
        expected: 'AUDIT_ENTRY action=UPDATE table=produits row_id=42 diff=prix:200->250,stock:10->8 user=gest_stock\nAUDIT_SUMMARY total_events=1 inserts=0 updates=1 deletes=0'
      },
      {
        label: 'Série de plusieurs insertions successives',
        stdin: 'OP action=INSERT table=logs id=1 user=cron new=lvl:info\nOP action=INSERT table=logs id=2 user=cron new=lvl:warn',
        expected: 'AUDIT_ENTRY action=INSERT table=logs row_id=1 diff=INSERTED user=cron\nAUDIT_ENTRY action=INSERT table=logs row_id=2 diff=INSERTED user=cron\nAUDIT_SUMMARY total_events=2 inserts=2 updates=0 deletes=0'
      },
      {
        label: 'Mise à jour sans changement réel (valeurs identiques)',
        stdin: 'OP action=UPDATE table=clients id=100 user=app old=statut:actif new=statut:actif',
        expected: 'AUDIT_ENTRY action=UPDATE table=clients row_id=100 diff=NO_CHANGE user=app\nAUDIT_SUMMARY total_events=1 inserts=0 updates=1 deletes=0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def parse_dict(s):
    res = {}
    if not s:
        return res
    for item in s.split(','):
        if ':' in item:
            k, v = item.split(':', 1)
            res[k] = v
    return res

inserts_cnt = 0
updates_cnt = 0
deletes_cnt = 0

for l in lignes:
    parts = l.split()
    if not parts or parts[0] != 'OP':
        continue
    args = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            args[k] = v

    act = args.get('action', 'INSERT')
    tbl = args.get('table', 'table')
    rid = args.get('id', '0')
    usr = args.get('user', 'system')

    if act == 'INSERT':
        inserts_cnt += 1
        diff = 'INSERTED'
    elif act == 'DELETE':
        deletes_cnt += 1
        diff = 'DELETED'
    else: # UPDATE
        updates_cnt += 1
        old_d = parse_dict(args.get('old', ''))
        new_d = parse_dict(args.get('new', ''))
        diff_list = []
        for k in sorted(new_d.keys()):
            if k in old_d and old_d[k] != new_d[k]:
                diff_list.append(f"{k}:{old_d[k]}->{new_d[k]}")
        if diff_list:
            diff = ','.join(diff_list)
        else:
            diff = 'NO_CHANGE'

    print(f"AUDIT_ENTRY action={act} table={tbl} row_id={rid} diff={diff} user={usr}")

total = inserts_cnt + updates_cnt + deletes_cnt
print(f"AUDIT_SUMMARY total_events={total} inserts={inserts_cnt} updates={updates_cnt} deletes={deletes_cnt}")
`
  },
  {
    id: 'sql3-c5-e2',
    chapter: 5,
    title: 'Moteur d’évaluation de politiques de sécurité au niveau ligne (Row-Level Security RLS)',
    level: 'n2',
    language: 'python',
    goal: 'Simuler le filtrage transparent des lignes en fonction du tenant et du rôle utilisateur via PostgreSQL Row-Level Security (RLS).',
    brief:
      'Dans une architecture SaaS multi-locataire (multi-tenant) mutualisée, la sécurité au niveau des lignes (RLS) garantit qu’une session ne peut jamais lire ni modifier les données d’une autre organisation :\n' +
      '- Chaque session déclare son identité : `SESSION tenant=<tenant_id> role=<admin|member>`.\n' +
      '- Des documents sont enregistrés : `DOC id=<id> tenant=<tenant_id> title=<title>`.\n' +
      '- Une politique RLS applique les règles suivantes lors d’une action (`SELECT`, `UPDATE`, `DELETE`) :\n' +
      '  1. Si `doc.tenant == session.tenant` : l’accès est `ALLOWED`.\n' +
      '  2. Si `doc.tenant != session.tenant` : l’accès est `DENIED` pour violation de frontière inter-tenant (isolation étanche).\n' +
      '  3. Pour `DELETE` : nécessite en plus le rôle `admin` dans le tenant ; si le rôle est `member`, l’accès est `DENIED_INSUFFICIENT_ROLE`.\n\n' +
      'Entrée :\n' +
      '- `SESSION tenant=<T> role=<R>`\n' +
      '- `DOC id=<id> tenant=<T> title=<title>`\n' +
      '- `ACCESS action=<SELECT|UPDATE|DELETE> doc_id=<id>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque tentative : `RLS_CHECK action=<ACT> doc_id=<ID> status=<ALLOWED|DENIED> reason=<REASON>`\n' +
      '- Bilan : `RLS_REPORT total_checks=<N> allowed=<N> denied=<N>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la validation de politique Row-Level Security
`,
    hints: [
      'Stocker les documents dans un dictionnaire documents[doc_id] = {tenant, title}.',
      'Comparer doc[tenant] avec session_tenant pour valider l’isolation multi-tenant.',
      'Vérifier le rôle pour les opérations destructrices comme DELETE.'
    ],
    examples: [
      {
        stdin: 'SESSION tenant=org_A role=member\nDOC id=1 tenant=org_A title=Bilan_A\nDOC id=2 tenant=org_B title=Bilan_B\nACCESS action=SELECT doc_id=1\nACCESS action=SELECT doc_id=2\nACCESS action=DELETE doc_id=1',
        expected: 'RLS_CHECK action=SELECT doc_id=1 status=ALLOWED reason=TENANT_MATCH\nRLS_CHECK action=SELECT doc_id=2 status=DENIED reason=CROSS_TENANT_VIOLATION\nRLS_CHECK action=DELETE doc_id=1 status=DENIED reason=INSUFFICIENT_ROLE\nRLS_REPORT total_checks=3 allowed=1 denied=2',
        note: 'Accès autorisé sur doc 1 pour SELECT, refusé sur doc 2 (cross-tenant), et refusé pour DELETE sans rôle admin.'
      }
    ],
    tests: [
      {
        label: 'Administrateur de tenant effectuant une suppression légitime',
        stdin: 'SESSION tenant=corp_X role=admin\nDOC id=10 tenant=corp_X title=Rapport\nACCESS action=DELETE doc_id=10',
        expected: 'RLS_CHECK action=DELETE doc_id=10 status=ALLOWED reason=TENANT_MATCH_AND_ADMIN\nRLS_REPORT total_checks=1 allowed=1 denied=0'
      },
      {
        label: 'Accès à un document inexistant',
        stdin: 'SESSION tenant=org_A role=member\nACCESS action=SELECT doc_id=999',
        expected: 'RLS_CHECK action=SELECT doc_id=999 status=DENIED reason=DOCUMENT_NOT_FOUND\nRLS_REPORT total_checks=1 allowed=0 denied=1'
      },
      {
        label: 'Mises à jour autorisées et bloquées',
        stdin: 'SESSION tenant=alpha role=member\nDOC id=101 tenant=alpha title=Contrat\nDOC id=102 tenant=beta title=Contrat\nACCESS action=UPDATE doc_id=101\nACCESS action=UPDATE doc_id=102',
        expected: 'RLS_CHECK action=UPDATE doc_id=101 status=ALLOWED reason=TENANT_MATCH\nRLS_CHECK action=UPDATE doc_id=102 status=DENIED reason=CROSS_TENANT_VIOLATION\nRLS_REPORT total_checks=2 allowed=1 denied=1'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

session_tenant = ''
session_role = 'member'
docs = {}

allowed_cnt = 0
denied_cnt = 0
total_cnt = 0

for l in lignes:
    parts = l.split()
    if not parts:
        continue
    cmd = parts[0]
    args = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            args[k] = v

    if cmd == 'SESSION':
        session_tenant = args.get('tenant', '')
        session_role = args.get('role', 'member')
    elif cmd == 'DOC':
        did = int(args.get('id', '0'))
        docs[did] = {
            'tenant': args.get('tenant', ''),
            'title': args.get('title', '')
        }
    elif cmd == 'ACCESS':
        total_cnt += 1
        act = args.get('action', 'SELECT')
        did = int(args.get('doc_id', '0'))

        if did not in docs:
            denied_cnt += 1
            print(f"RLS_CHECK action={act} doc_id={did} status=DENIED reason=DOCUMENT_NOT_FOUND")
            continue

        doc = docs[did]
        if doc['tenant'] != session_tenant:
            denied_cnt += 1
            print(f"RLS_CHECK action={act} doc_id={did} status=DENIED reason=CROSS_TENANT_VIOLATION")
        elif act == 'DELETE' and session_role != 'admin':
            denied_cnt += 1
            print(f"RLS_CHECK action={act} doc_id={did} status=DENIED reason=INSUFFICIENT_ROLE")
        elif act == 'DELETE' and session_role == 'admin':
            allowed_cnt += 1
            print(f"RLS_CHECK action={act} doc_id={did} status=ALLOWED reason=TENANT_MATCH_AND_ADMIN")
        else:
            allowed_cnt += 1
            print(f"RLS_CHECK action={act} doc_id={did} status=ALLOWED reason=TENANT_MATCH")

print(f"RLS_REPORT total_checks={total_cnt} allowed={allowed_cnt} denied={denied_cnt}")
`
  },
  {
    id: 'sql3-c5-e3',
    chapter: 5,
    title: 'Validateur de requêtes dynamiques et détecteur d’injections SQL (SQLi Sanitizer)',
    level: 'n3',
    language: 'python',
    goal: 'Analyser des paramètres de requêtes SQL dynamiques et neutraliser les vecteurs d’injection SQL classiques.',
    brief:
      'Dans le code procédural PL/pgSQL, la concaténation directe de variables utilisateur dans des instructions `EXECUTE` engendre des failles critiques d’injection SQL (SQLi).\n' +
      'Les signatures d’attaque typiques incluent :\n' +
      '- Tautologies logiques contournant les filtres : `OR 1=1`, `OR \'1\'=\'1\'`, `OR true`.\n' +
      '- Concaténations de requêtes multiples (Piggybacked queries) : `; DROP TABLE`, `; TRUNCATE`, `; DELETE`.\n' +
      '- Injections par union : `UNION SELECT`, `UNION ALL SELECT`.\n' +
      '- Troncature de commentaires : `--`, `/*`.\n\n' +
      'Entrée :\n' +
      '`CHECK_SQL id=<num> input="<chaine_brute>"`\n\n' +
      'Sortie :\n' +
      '- Si une signature est détectée : `SQLI_ALERT id=<id> status=VULNERABLE threat=<TAUTOLOGY|PIGGYBACKED_DROP|UNION_INJECTION|COMMENT_BYPASS> action=BLOCK`\n' +
      '- Si la chaîne est saine : `SQLI_ALERT id=<id> status=SECURE safe_value=<quote_literal_value> action=ALLOW`\n' +
      '- Bilan : `SECURITY_AUDIT checked=<N> blocked=<N> allowed=<N>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : détecter les motifs malveillants d'injection SQL ou formater la valeur saine
`,
    hints: [
      'Rechercher les mots-clés dangereux en ignorant la casse (upper/lower).',
      'Identifier "or 1=1" ou "or \'1\'=\'1\'" comme TAUTOLOGY.',
      'Identifier "; drop" ou "; truncate" comme PIGGYBACKED_DROP.',
      'Identifier "union select" comme UNION_INJECTION.',
      'Identifier "--" ou "/*" comme COMMENT_BYPASS.'
    ],
    examples: [
      {
        stdin: 'CHECK_SQL id=1 input="alice"\nCHECK_SQL id=2 input="admin\' OR \'1\'=\'1"\nCHECK_SQL id=3 input="test\'; DROP TABLE clients; --"',
        expected: 'SQLI_ALERT id=1 status=SECURE safe_value=\'alice\' action=ALLOW\nSQLI_ALERT id=2 status=VULNERABLE threat=TAUTOLOGY action=BLOCK\nSQLI_ALERT id=3 status=VULNERABLE threat=PIGGYBACKED_DROP action=BLOCK\nSECURITY_AUDIT checked=3 blocked=2 allowed=1',
        note: 'La saisie légitime est autorisée après échappement ; les deux attaques sont bloquées.'
      }
    ],
    tests: [
      {
        label: 'Attaque par union pour extraction de schéma',
        stdin: 'CHECK_SQL id=10 input="1 UNION SELECT username, password FROM users"',
        expected: 'SQLI_ALERT id=10 status=VULNERABLE threat=UNION_INJECTION action=BLOCK\nSECURITY_AUDIT checked=1 blocked=1 allowed=0'
      },
      {
        label: 'Troncature par commentaire SQL double tiret',
        stdin: 'CHECK_SQL id=20 input="admin\' -- bypass password check"',
        expected: 'SQLI_ALERT id=20 status=VULNERABLE threat=COMMENT_BYPASS action=BLOCK\nSECURITY_AUDIT checked=1 blocked=1 allowed=0'
      },
      {
        label: 'Entrée saine avec espaces et chiffres',
        stdin: 'CHECK_SQL id=30 input="Jean-Luc Dupont 2025"',
        expected: 'SQLI_ALERT id=30 status=SECURE safe_value=\'Jean-Luc Dupont 2025\' action=ALLOW\nSECURITY_AUDIT checked=1 blocked=0 allowed=1'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

checked = 0
blocked = 0
allowed = 0

for l in lignes:
    if not l.startswith('CHECK_SQL'):
        continue
    checked += 1

    # Extract id and input
    id_m = re.search(r'id=([0-9]+)', l)
    input_m = re.search(r'input="([^"]*)"', l)

    qid = id_m.group(1) if id_m else '0'
    raw_input = input_m.group(1) if input_m else ''

    upper_val = raw_input.upper()

    threat = None
    if "OR '1'='1" in upper_val or "OR 1=1" in upper_val or "OR TRUE" in upper_val or "OR '1' = '1" in upper_val:
        threat = 'TAUTOLOGY'
    elif '; DROP' in upper_val or '; TRUNCATE' in upper_val:
        threat = 'PIGGYBACKED_DROP'
    elif 'UNION SELECT' in upper_val or 'UNION ALL SELECT' in upper_val:
        threat = 'UNION_INJECTION'
    elif '--' in raw_input or '/*' in raw_input:
        threat = 'COMMENT_BYPASS'

    if threat:
        blocked += 1
        print(f"SQLI_ALERT id={qid} status=VULNERABLE threat={threat} action=BLOCK")
    else:
        allowed += 1
        safe_val = f"'{raw_input}'"
        print(f"SQLI_ALERT id={qid} status=SECURE safe_value={safe_val} action=ALLOW")

print(f"SECURITY_AUDIT checked={checked} blocked={blocked} allowed={allowed}")
`
  }
];
