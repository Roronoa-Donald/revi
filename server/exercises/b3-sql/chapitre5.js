'use strict';

module.exports = [
  {
    "id": "sql3-c5-e1",
    "chapter": 5,
    "title": "Simulateur de déclencheur d’audit d’historisation (Audit Trail Trigger)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le comportement d’un trigger AFTER INSERT/UPDATE/DELETE alimentant une table de journalisation d’audit.",
    "brief": "Dans les systèmes financiers et médicaux, les réglementations (RGPD, PCI-DSS, HDS) imposent une traçabilité immuable de chaque modification.\nUn déclencheur d’audit compare les variables d’état `OLD` et `NEW` :\n- Pour `INSERT` : enregistre `diff=INSERTED`.\n- Pour `DELETE` : enregistre `diff=DELETED`.\n- Pour `UPDATE` : compare les champs clés pour lister précisément les valeurs modifiées sous la forme `champ:old_val->new_val`.\n\nEntrée :\n`OP action=<INSERT|UPDATE|DELETE> table=<name> id=<row_id> user=<username> [old=<k:v,k:v>] [new=<k:v,k:v>]`\n\nSortie :\n- Pour chaque opération :\n  `AUDIT_ENTRY action=<ACT> table=<TBL> row_id=<ID> diff=<DIFF> user=<USR>`\n- Bilan : `AUDIT_SUMMARY total_events=<N> inserts=<N> updates=<N> deletes=<N>`",
    "starter": "# Grille d'analyse (sql3-c5-e1) — Simulateur de déclencheur d’audit d’historisation (Audit Trail Trigger)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mise à jour de multiples champs simultanément]\n# Données : OP action=UPDATE table=produits id=42 user=gest_stock old=nom:Velo,prix:200,stock:10 new=nom:Velo,prix:250,stock:8\nA_COMPLETER\n\n[Cas 2 — Série de plusieurs insertions successives]\n# Données : OP action=INSERT table=logs id=1 user=cron new=lvl:info\n# Données : OP action=INSERT table=logs id=2 user=cron new=lvl:warn\nA_COMPLETER\n\n[Cas 3 — Mise à jour sans changement réel (valeurs identiques)]\n# Données : OP action=UPDATE table=clients id=100 user=app old=statut:actif new=statut:actif\nA_COMPLETER\n",
    "hints": [
      "Parser les champs old et new en dictionnaires pour l’action UPDATE.",
      "Identifier les clés pour lesquelles old[k] != new[k] et formater champ:old->new.",
      "Comptabiliser le nombre d’événements de chaque type."
    ],
    "examples": [
      {
        "stdin": "OP action=INSERT table=users id=10 user=admin new=email:a@b.com,role:user\nOP action=UPDATE table=users id=10 user=sec_admin old=email:a@b.com,role:user new=email:a@b.com,role:admin\nOP action=DELETE table=users id=10 user=admin old=email:a@b.com,role:admin",
        "expected": "AUDIT_ENTRY action=INSERT table=users row_id=10 diff=INSERTED user=admin\nAUDIT_ENTRY action=UPDATE table=users row_id=10 diff=role:user->admin user=sec_admin\nAUDIT_ENTRY action=DELETE table=users row_id=10 diff=DELETED user=admin\nAUDIT_SUMMARY total_events=3 inserts=1 updates=1 deletes=1",
        "note": "Le trigger trace la création, le changement de rôle et la suppression."
      }
    ],
    "tests": [
      {
        "label": "Mise à jour de multiples champs simultanément",
        "stdin": "cas:1",
        "expected": "AUDIT_ENTRY action=UPDATE table=produits row_id=42 diff=prix:200->250,stock:10->8 user=gest_stock\nAUDIT_SUMMARY total_events=1 inserts=0 updates=1 deletes=0"
      },
      {
        "label": "Série de plusieurs insertions successives",
        "stdin": "cas:2",
        "expected": "AUDIT_ENTRY action=INSERT table=logs row_id=1 diff=INSERTED user=cron\nAUDIT_ENTRY action=INSERT table=logs row_id=2 diff=INSERTED user=cron\nAUDIT_SUMMARY total_events=2 inserts=2 updates=0 deletes=0"
      },
      {
        "label": "Mise à jour sans changement réel (valeurs identiques)",
        "stdin": "cas:3",
        "expected": "AUDIT_ENTRY action=UPDATE table=clients row_id=100 diff=NO_CHANGE user=app\nAUDIT_SUMMARY total_events=1 inserts=0 updates=1 deletes=0"
      }
    ],
    "solution": "[Exemple]\nAUDIT_ENTRY action=INSERT table=users row_id=10 diff=INSERTED user=admin\nAUDIT_ENTRY action=UPDATE table=users row_id=10 diff=role:user->admin user=sec_admin\nAUDIT_ENTRY action=DELETE table=users row_id=10 diff=DELETED user=admin\nAUDIT_SUMMARY total_events=3 inserts=1 updates=1 deletes=1\n\n[Cas 1 — Mise à jour de multiples champs simultanément]\nAUDIT_ENTRY action=UPDATE table=produits row_id=42 diff=prix:200->250,stock:10->8 user=gest_stock\nAUDIT_SUMMARY total_events=1 inserts=0 updates=1 deletes=0\n\n[Cas 2 — Série de plusieurs insertions successives]\nAUDIT_ENTRY action=INSERT table=logs row_id=1 diff=INSERTED user=cron\nAUDIT_ENTRY action=INSERT table=logs row_id=2 diff=INSERTED user=cron\nAUDIT_SUMMARY total_events=2 inserts=2 updates=0 deletes=0\n\n[Cas 3 — Mise à jour sans changement réel (valeurs identiques)]\nAUDIT_ENTRY action=UPDATE table=clients row_id=100 diff=NO_CHANGE user=app\nAUDIT_SUMMARY total_events=1 inserts=0 updates=1 deletes=0"
  },
  {
    "id": "sql3-c5-e2",
    "chapter": 5,
    "title": "Moteur d’évaluation de politiques de sécurité au niveau ligne (Row-Level Security RLS)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler le filtrage transparent des lignes en fonction du tenant et du rôle utilisateur via PostgreSQL Row-Level Security (RLS).",
    "brief": "Dans une architecture SaaS multi-locataire (multi-tenant) mutualisée, la sécurité au niveau des lignes (RLS) garantit qu’une session ne peut jamais lire ni modifier les données d’une autre organisation :\n- Chaque session déclare son identité : `SESSION tenant=<tenant_id> role=<admin|member>`.\n- Des documents sont enregistrés : `DOC id=<id> tenant=<tenant_id> title=<title>`.\n- Une politique RLS applique les règles suivantes lors d’une action (`SELECT`, `UPDATE`, `DELETE`) :\n  1. Si `doc.tenant == session.tenant` : l’accès est `ALLOWED`.\n  2. Si `doc.tenant != session.tenant` : l’accès est `DENIED` pour violation de frontière inter-tenant (isolation étanche).\n  3. Pour `DELETE` : nécessite en plus le rôle `admin` dans le tenant ; si le rôle est `member`, l’accès est `DENIED_INSUFFICIENT_ROLE`.\n\nEntrée :\n- `SESSION tenant=<T> role=<R>`\n- `DOC id=<id> tenant=<T> title=<title>`\n- `ACCESS action=<SELECT|UPDATE|DELETE> doc_id=<id>`\n\nSortie :\n- Pour chaque tentative : `RLS_CHECK action=<ACT> doc_id=<ID> status=<ALLOWED|DENIED> reason=<REASON>`\n- Bilan : `RLS_REPORT total_checks=<N> allowed=<N> denied=<N>`",
    "starter": "# Grille d'analyse (sql3-c5-e2) — Moteur d’évaluation de politiques de sécurité au niveau ligne (Row-Level Security RLS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Administrateur de tenant effectuant une suppression légitime]\n# Données : SESSION tenant=corp_X role=admin\n# Données : DOC id=10 tenant=corp_X title=Rapport\n# Données : ACCESS action=DELETE doc_id=10\nA_COMPLETER\n\n[Cas 2 — Accès à un document inexistant]\n# Données : SESSION tenant=org_A role=member\n# Données : ACCESS action=SELECT doc_id=999\nA_COMPLETER\n\n[Cas 3 — Mises à jour autorisées et bloquées]\n# Données : SESSION tenant=alpha role=member\n# Données : DOC id=101 tenant=alpha title=Contrat\n# Données : DOC id=102 tenant=beta title=Contrat\n# Données : ACCESS action=UPDATE doc_id=101\n# Données : ACCESS action=UPDATE doc_id=102\nA_COMPLETER\n",
    "hints": [
      "Stocker les documents dans un dictionnaire documents[doc_id] = {tenant, title}.",
      "Comparer doc[tenant] avec session_tenant pour valider l’isolation multi-tenant.",
      "Vérifier le rôle pour les opérations destructrices comme DELETE."
    ],
    "examples": [
      {
        "stdin": "SESSION tenant=org_A role=member\nDOC id=1 tenant=org_A title=Bilan_A\nDOC id=2 tenant=org_B title=Bilan_B\nACCESS action=SELECT doc_id=1\nACCESS action=SELECT doc_id=2\nACCESS action=DELETE doc_id=1",
        "expected": "RLS_CHECK action=SELECT doc_id=1 status=ALLOWED reason=TENANT_MATCH\nRLS_CHECK action=SELECT doc_id=2 status=DENIED reason=CROSS_TENANT_VIOLATION\nRLS_CHECK action=DELETE doc_id=1 status=DENIED reason=INSUFFICIENT_ROLE\nRLS_REPORT total_checks=3 allowed=1 denied=2",
        "note": "Accès autorisé sur doc 1 pour SELECT, refusé sur doc 2 (cross-tenant), et refusé pour DELETE sans rôle admin."
      }
    ],
    "tests": [
      {
        "label": "Administrateur de tenant effectuant une suppression légitime",
        "stdin": "cas:1",
        "expected": "RLS_CHECK action=DELETE doc_id=10 status=ALLOWED reason=TENANT_MATCH_AND_ADMIN\nRLS_REPORT total_checks=1 allowed=1 denied=0"
      },
      {
        "label": "Accès à un document inexistant",
        "stdin": "cas:2",
        "expected": "RLS_CHECK action=SELECT doc_id=999 status=DENIED reason=DOCUMENT_NOT_FOUND\nRLS_REPORT total_checks=1 allowed=0 denied=1"
      },
      {
        "label": "Mises à jour autorisées et bloquées",
        "stdin": "cas:3",
        "expected": "RLS_CHECK action=UPDATE doc_id=101 status=ALLOWED reason=TENANT_MATCH\nRLS_CHECK action=UPDATE doc_id=102 status=DENIED reason=CROSS_TENANT_VIOLATION\nRLS_REPORT total_checks=2 allowed=1 denied=1"
      }
    ],
    "solution": "[Exemple]\nRLS_CHECK action=SELECT doc_id=1 status=ALLOWED reason=TENANT_MATCH\nRLS_CHECK action=SELECT doc_id=2 status=DENIED reason=CROSS_TENANT_VIOLATION\nRLS_CHECK action=DELETE doc_id=1 status=DENIED reason=INSUFFICIENT_ROLE\nRLS_REPORT total_checks=3 allowed=1 denied=2\n\n[Cas 1 — Administrateur de tenant effectuant une suppression légitime]\nRLS_CHECK action=DELETE doc_id=10 status=ALLOWED reason=TENANT_MATCH_AND_ADMIN\nRLS_REPORT total_checks=1 allowed=1 denied=0\n\n[Cas 2 — Accès à un document inexistant]\nRLS_CHECK action=SELECT doc_id=999 status=DENIED reason=DOCUMENT_NOT_FOUND\nRLS_REPORT total_checks=1 allowed=0 denied=1\n\n[Cas 3 — Mises à jour autorisées et bloquées]\nRLS_CHECK action=UPDATE doc_id=101 status=ALLOWED reason=TENANT_MATCH\nRLS_CHECK action=UPDATE doc_id=102 status=DENIED reason=CROSS_TENANT_VIOLATION\nRLS_REPORT total_checks=2 allowed=1 denied=1"
  },
  {
    "id": "sql3-c5-e3",
    "chapter": 5,
    "title": "Validateur de requêtes dynamiques et détecteur d’injections SQL (SQLi Sanitizer)",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser des paramètres de requêtes SQL dynamiques et neutraliser les vecteurs d’injection SQL classiques.",
    "brief": "Dans le code procédural PL/pgSQL, la concaténation directe de variables utilisateur dans des instructions `EXECUTE` engendre des failles critiques d’injection SQL (SQLi).\nLes signatures d’attaque typiques incluent :\n- Tautologies logiques contournant les filtres : `OR 1=1`, `OR '1'='1'`, `OR true`.\n- Concaténations de requêtes multiples (Piggybacked queries) : `; DROP TABLE`, `; TRUNCATE`, `; DELETE`.\n- Injections par union : `UNION SELECT`, `UNION ALL SELECT`.\n- Troncature de commentaires : `--`, `/*`.\n\nEntrée :\n`CHECK_SQL id=<num> input=\"<chaine_brute>\"`\n\nSortie :\n- Si une signature est détectée : `SQLI_ALERT id=<id> status=VULNERABLE threat=<TAUTOLOGY|PIGGYBACKED_DROP|UNION_INJECTION|COMMENT_BYPASS> action=BLOCK`\n- Si la chaîne est saine : `SQLI_ALERT id=<id> status=SECURE safe_value=<quote_literal_value> action=ALLOW`\n- Bilan : `SECURITY_AUDIT checked=<N> blocked=<N> allowed=<N>`",
    "starter": "# Grille d'analyse (sql3-c5-e3) — Validateur de requêtes dynamiques et détecteur d’injections SQL (SQLi Sanitizer)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Attaque par union pour extraction de schéma]\n# Données : CHECK_SQL id=10 input=\"1 UNION SELECT username, password FROM users\"\nA_COMPLETER\n\n[Cas 2 — Troncature par commentaire SQL double tiret]\n# Données : CHECK_SQL id=20 input=\"admin' -- bypass password check\"\nA_COMPLETER\n\n[Cas 3 — Entrée saine avec espaces et chiffres]\n# Données : CHECK_SQL id=30 input=\"Jean-Luc Dupont 2025\"\nA_COMPLETER\n",
    "hints": [
      "Rechercher les mots-clés dangereux en ignorant la casse (upper/lower).",
      "Identifier \"or 1=1\" ou \"or '1'='1'\" comme TAUTOLOGY.",
      "Identifier \"; drop\" ou \"; truncate\" comme PIGGYBACKED_DROP.",
      "Identifier \"union select\" comme UNION_INJECTION.",
      "Identifier \"--\" ou \"/*\" comme COMMENT_BYPASS."
    ],
    "examples": [
      {
        "stdin": "CHECK_SQL id=1 input=\"alice\"\nCHECK_SQL id=2 input=\"admin' OR '1'='1\"\nCHECK_SQL id=3 input=\"test'; DROP TABLE clients; --\"",
        "expected": "SQLI_ALERT id=1 status=SECURE safe_value='alice' action=ALLOW\nSQLI_ALERT id=2 status=VULNERABLE threat=TAUTOLOGY action=BLOCK\nSQLI_ALERT id=3 status=VULNERABLE threat=PIGGYBACKED_DROP action=BLOCK\nSECURITY_AUDIT checked=3 blocked=2 allowed=1",
        "note": "La saisie légitime est autorisée après échappement ; les deux attaques sont bloquées."
      }
    ],
    "tests": [
      {
        "label": "Attaque par union pour extraction de schéma",
        "stdin": "cas:1",
        "expected": "SQLI_ALERT id=10 status=VULNERABLE threat=UNION_INJECTION action=BLOCK\nSECURITY_AUDIT checked=1 blocked=1 allowed=0"
      },
      {
        "label": "Troncature par commentaire SQL double tiret",
        "stdin": "cas:2",
        "expected": "SQLI_ALERT id=20 status=VULNERABLE threat=COMMENT_BYPASS action=BLOCK\nSECURITY_AUDIT checked=1 blocked=1 allowed=0"
      },
      {
        "label": "Entrée saine avec espaces et chiffres",
        "stdin": "cas:3",
        "expected": "SQLI_ALERT id=30 status=SECURE safe_value='Jean-Luc Dupont 2025' action=ALLOW\nSECURITY_AUDIT checked=1 blocked=0 allowed=1"
      }
    ],
    "solution": "[Exemple]\nSQLI_ALERT id=1 status=SECURE safe_value='alice' action=ALLOW\nSQLI_ALERT id=2 status=VULNERABLE threat=TAUTOLOGY action=BLOCK\nSQLI_ALERT id=3 status=VULNERABLE threat=PIGGYBACKED_DROP action=BLOCK\nSECURITY_AUDIT checked=3 blocked=2 allowed=1\n\n[Cas 1 — Attaque par union pour extraction de schéma]\nSQLI_ALERT id=10 status=VULNERABLE threat=UNION_INJECTION action=BLOCK\nSECURITY_AUDIT checked=1 blocked=1 allowed=0\n\n[Cas 2 — Troncature par commentaire SQL double tiret]\nSQLI_ALERT id=20 status=VULNERABLE threat=COMMENT_BYPASS action=BLOCK\nSECURITY_AUDIT checked=1 blocked=1 allowed=0\n\n[Cas 3 — Entrée saine avec espaces et chiffres]\nSQLI_ALERT id=30 status=SECURE safe_value='Jean-Luc Dupont 2025' action=ALLOW\nSECURITY_AUDIT checked=1 blocked=0 allowed=1"
  }
];
