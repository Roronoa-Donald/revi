# Rapport — auditeur-tests
Date : 2026-09-26
Périmètre : exécution de tout ce qui est exécutable sans DB/secrets, audit de couverture
Mode : exécution réelle (npm test, npm run build, node --check, scripts check_*.js)
Rédigé par l'orchestrateur (le sous-agent sa-3 est mort sur timeout API ×3 — endpoint Nvidia coupe les appels longs)
Total : 0 P0, 2 P1, 2 P2, 1 P3

---

### [P1] Zones critiques sans aucun test : /api/verify, activation (chemins complète), expirations, admin, ai-chat
- **ID** : TESTS-001
- **Type** : Tests (couverture)
- **Fichier(s)** : tests/ (2 fichiers, 13 tests) vs server/routes/auth.js (252 lignes), admin.js (371), ai-chat.js (111), preparation.js (580)
- **Description** : la suite npm test (node --test) couvre uniquement access-control.js (8 tests : listes de cours, protection epreuves/preparation/QCM, Edge sync, build COURSE_DIRS) et keygen.js (5 tests : format, unicité sur 5000 générations). Aucun test sur : la logique d'activation (re-activation même machine, révocation des anciennes sessions), /api/verify (session, expiration, classe b0), les mutations admin (reset/revoke/renew), le proxy ai-chat, preparation.js (XP, chronologie des projets, gate solution), ni sur le serveur statique (injection HTML, allowlist racine, path-traversal).
- **Reproduction** : npm test → 13/13, tous sur access-control ×8 + keygen ×5 (détail exécuté, preuve dans le log).
- **Cause racine** : la suite a été créée pendant les corrections du run précédent, limitée aux fonctions pures testables sans DB.
- **Correctif proposé** : compléter avec des tests sur les fonctions pures restantes (isProtected cas limites déjà couverts ; ajouter validateSubmission/computeProjectXp de preparation.js qui sont purs, injectAuth de build.js/server.js, isRootPathAllowed) et des tests d'intégration HTTP avec un mock pg (ou DB de test) pour /api/activate et /api/verify.
- **Statut** : Ouvert

### [P1] Scripts check_qcm.js et check_html_quizzes.js limités à des cours codés en dur — fausse assurance de couverture globale
- **ID** : TESTS-002
- **Type** : Tests (couverture trompeuse)
- **Fichier(s)** : scripts/check_qcm.js, scripts/check_html_quizzes.js
- **Description** : les deux audits passent à 100% mais ne couvrent que les cours codés en dur dans leurs listes (ex. ingenierie-besoin, masterclass-apprendre visibles dans la sortie exécutée). Les 22 autres cours ne sont jamais audités par ces scripts ; la sortie « Tous les Quiz HTML audités sont 100% conformes ! » laisse croire à une couverture globale.
- **Reproduction** : node scripts/check_html_quizzes.js → liste les cours audités (sous-ensemble uniquement) puis affiche le message de succès global.
- **Cause racine** : listes de cours codées en dur dans les scripts au lieu de dériver des COURSES canoniques.
- **Correctif proposé** : dériver la liste des cours de COURSES (access-control.js) et itérer sur tous les dossiers présents sur disque ; ajuster le message final (« N/N cours audités »).
- **Statut** : Ouvert

### [P2] Aucune mesure de couverture outillée (coverage)
- **ID** : TESTS-003
- **Type** : Tests (outillage)
- **Fichier(s)** : package.json (script test sans --experimental-test-coverage)
- **Description** : node --test supporte --experimental-test-coverage nativement mais le script ne l'active pas ; aucune visibilité sur le % de lignes couvertes.
- **Reproduction** : npm test (sans coverage) — aucune donnée de couverture dans la sortie.
- **Cause racine** : jamais configuré.
- **Correctif proposé** : ajouter un script « test:coverage » : node --test --experimental-test-coverage tests/*.test.js.
- **Statut** : Ouvert

### [P2] Tests d'intégration HTTP impossibles sans DB — aucun substitut mocké
- **ID** : TESTS-004
- **Type** : Tests (environnement)
- **Fichier(s)** : tests/ (absent) ; server/db.js (initDB requiert PostgreSQL réel)
- **Description** : aucune DB locale joignable (ports 3000/5432 libres, vérifié) → impossible de tester /api/activate, /api/verify, /api/admin/* en conditions réelles. Les routes les plus critiques (auth, clés) n'ont donc JAMAIS été exécutées dans cet audit — seules des lectures complètes les couvrent.
- **Reproduction** : ss -tlnp | grep 5432 → libre ; npm run dev nécessiterait DATABASE_URL.
- **Cause racine** : aucun mock pg ni DB de test provisionnée.
- **Correctif proposé** : provisionner une DB de test (postgres local ou container) + script npm test:integration, ou mocker pg (test d'intégration fastify.inject).
- **Statut** : Ouvert

### [P3] npm run vercel-build applique les migrations avant le build statique — comportement voulu mais non testé
- **ID** : TESTS-005
- **Type** : Tests
- **Fichier(s)** : package.json (vercel-build), scripts/migrate.js
- **Description** : la chaîne migrate && build est fail-loud (MIGRATE_FAIL_OPEN=0 côté Vercel) — comportement voulu. Non exécutable ici (pas de DB) ; testé uniquement par lecture de migrate.js (idempotent, transaction par fichier, exit codes corrects).
- **Reproduction** : requiert DATABASE_URL.
- **Cause racine** : contrainte d'environnement.
- **Correctif proposé** : tester la chaîne une fois avec une DB de test.
- **Statut** : Ouvert (accepté)

---

## Exécution réelle effectuée (preuves)

| Commande | Résultat |
|---|---|
| npm test | 13/13 verts, 0 fail, 0 skipped, 0 todo (détail des 13 subtests exécuté et loggé) |
| node --check ×18 fichiers | 18/18 OK syntaxe |
| node scripts/check_html_quizzes.js | 0 échec — 100% conformes (couverture partielle, cf. TESTS-002) |
| node scripts/check_qcm.js | 0 échec — 100% conformes (couverture partielle, cf. TESTS-002) |
| npm run build | exit 0 en 0.06s, 779 fichiers, 580 HTML injectés, epreuves/robots/sitemap/404 présents dans dist/ |

## Tests .skip/.only/désactivés
- grep .only(/.skip( sur tests/, scripts/, server/ → 0 occurrence.
- Tests commentés : aucun détecté.
- Code désactivé volontairement (documenté, non un test) : /api/verify-fingerprint renvoie toujours {valid:true} (désactivation décidée — seule la déconnexion manuelle coupe l'accès) ; fingerprint check côté client désactivé (commentaire auth-check.js:221). Ces deux désactivations sont des décisions produit assumées, signalées pour mémoire.
