# Rapport — auditeur-tests
Date : 2026-09-25
Périmètre : exécution de tout ce qui est exécutable sans DB/secrets, audit de couverture
Total : 0 P0, 2 P1, 2 P2, 1 P3

---

## Exécutions réellement effectuées (preuves)

| Commande | Résultat |
|---|---|
| `npm run build` (scripts/build.js) | ✅ exit 0, 0.06s, 781 fichiers, 584 HTML injectés |
| `node scripts/check_qcm.js` | ✅ « Tous les QCM audités sont 100% conformes » (ingenierie-besoin, masterclass-apprendre) |
| `node scripts/check_html_quizzes.js` | ✅ « Tous les Quiz HTML audités sont 100% conformes » |
| `ls dist/epreuves` | ❌ n'existe pas (renvoyé vers COMPLETUDE-001) |
| `npm test` | ❌ « Missing script: "test" » |

---

### [P1] Aucune suite de tests — la seule vérification de non-régression est le build
- **ID** : TESTS-001
- **Type** : Tests
- **Fichier(s)** : package.json
- **Description** : aucun script `test`, aucun framework. Les fonctions critiques sans aucun test : `isProtected()` (24 cours × plusieurs règles), `verifyUserAuth`, activation/révocation de clés, `validateSubmission` (règles de validation Preparation Web), `generateActivationKey`. Chaque refonte est donc vérifiée uniquement « à l'œil ».
- **Reproduction** : `npm test` → missing script.
- **Cause racine** : jamais mis en place.
- **Correctif proposé** : ajouter `node --test tests/` (runner natif Node 18+, zéro dépendance) avec 3 suites : access-control (isProtected/getCourseFromUrl sur les 24 cours), keygen (format + unicité), preparation-validation (validateSubmission sur les 12 projets).
- **Statut** : Ouvert

### [P1] Scripts de vérification de QCM partiellement codés en dur sur 4 cours seulement
- **ID** : TESTS-002
- **Type** : Tests
- **Fichier(s)** : scripts/check_qcm.js, scripts/check_html_quizzes.js
- **Description** : ces scripts n'auditionnent qu'un sous-ensemble de cours (hardcodé : react, erp-si, probabilites, masterclass-apprendre, ingenierie-besoin selon le code) alors que 24 cours existent et que la règle « QCM toujours protégés » s'applique à tous. Les 16 autres cours n'ont aucune vérification de leurs données de quiz.
- **Reproduction** : lecture des listes de cours dans les deux scripts.
- **Cause racine** : scripts écrits à la demande pour des cours spécifiques.
- **Correctif proposé** : dériver la liste des cours de access-control.js (import) au lieu de la coder.
- **Statut** : Ouvert

### [P2] `npm run stop` = `taskkill /F /IM node.exe` — tue TOUS les process Node de la machine
- **ID** : TESTS-003
- **Type** : Tests / DX
- **Fichier(s)** : package.json (script stop)
- **Description** : déjà documenté dans AGENTS.md. Sur une machine de dev qui fait tourner autre chose (VS Code, autres serveurs), l'exécuter est destructeur. Détecté aussi : script Windows alors que l'environnement actuel est Linux.
- **Reproduction** : lecture package.json.
- **Cause racine** : script hérité.
- **Correctif proposé** : remplacer par `kill $(lsof -t -i:3000)` ou supprimer.
- **Statut** : Ouvert

### [P2] Vercel build échouera si DATABASE_URL absente — pas de preview CI sans DB
- **ID** : TESTS-004
- **Type** : Tests / CI
- **Fichier(s)** : scripts/migrate.js (fail-loud par défaut), vercel.json
- **Description** : `vercel-build` = migrate && build ; migrate fail-loud sans DATABASE_URL → build rouge. C'est un choix documenté et défendable (fail-loud), mais tout preview Vercel sans DB liée échoue avant même le build statique. Le mécanisme `MIGRATE_FAIL_OPEN=1` existe et est épinglé dans vercel.json (`"MIGRATE_FAIL_OPEN": "0"`) — cohérent, à connaître.
- **Reproduction** : lecture.
- **Cause racine** : choix de conception.
- **Correctif proposé** : aucun (documenter dans README).
- **Statut** : Ouvert (décision, pas un bug)

### [P3] Couverture : le code client (cours/*) n'a aucun test syntaxique au build
- **ID** : TESTS-005
- **Type** : Tests
- **Fichier(s)** : scripts/build.js
- **Description** : le build copie 584 HTML sans même valider que les fichiers .js copiés parsent (`node --check`). Une erreur de syntaxe dans un asset JS de cours n'est détectée que par l'utilisateur final.
- **Reproduction** : introduire une erreur de syntaxe dans un asset → build vert.
- **Cause racine** : pas de gate.
- **Correctif proposé** : dans build.js, `new Function(fs.readFileSync(p,'utf8'))` en try/catch pour les .js (ou `node --check`) — warning au lieu de fail pour ne pas casser.
- **Statut** : Ouvert
