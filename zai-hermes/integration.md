# Rapport — auditeur-integration
Date : 2026-09-26
Périmètre : contrats front/back, env vars, cohérence des listes de cours, migrations SQL, build/déploiement
Mode : lecture exhaustive + exécution réelle (node --check ×18, npm test 13/13, npm run build exit 0)
Rédigé par l'orchestrateur (le sous-agent sa-2 est mort sur timeout API ×3 — endpoint Nvidia coupe les appels longs)
Total : 1 P0, 2 P2, 2 P3

---

### [P0] /api/ai-chat n'applique aucune vérification de session/clé — une clé révoquée garde le chat IA jusqu'à 365 jours
- **ID** : INTEGRATION-001
- **Type** : Intégration (contrat de sécurité désynchronisé)
- **Fichier(s)** : server/routes/ai-chat.js (lignes 22–31) vs server/routes/auth.js /api/verify (lignes 169–220)
- **Description** : ai-chat.js vérifie uniquement la signature JWT du cookie auth_token. Il ne consulte jamais la session (getSessionByJti), ni la clé (getKeyById), ni son expiration, ni sa révocation. Un admin qui révoque une clé (revokeKey → sessions invalidées) ou une clé expirée laisse donc l'accès complet au proxy OpenRouter (facturé côté serveur) pendant toute la durée de vie du JWT (365 jours).
- **Reproduction** : activer une clé → révoquer la clé via /api/admin/keys/:id/revoke → appeler POST /api/ai-chat avec le cookie auth_token existant → 200 OK au lieu de 401 (prouvé par lecture du chemin : jwt.verify passe, aucune autre vérification).
- **Cause racine** : ai-chat.js a été écrit avec sa propre vérification JWT minimale au lieu de réutiliser la logique canonique de /api/verify (session + clé active + expiration + classe).
- **Correctif proposé** : extraire la logique de vérification utilisateur (session valide, clé active, non expirée, classe) dans un helper partagé (ex. server/utils/auth-verify.js) et l'appeler dans ai-chat.js à la place du simple jwt.verify. Les autres routes (preparation.js verifyUser) font déjà session+clé+expiration — aligner ai-chat sur ce modèle.
- **Statut** : Ouvert

### [P2] Throttle last_verified appliqué seulement dans le chemin server.js — /api/verify écrit toujours inconditionnellement
- **ID** : INTEGRATION-002
- **Type** : Intégration (incohérence entre les deux chemins de vérification)
- **Fichier(s)** : server.js (lignes 97–100, throttle 5 min présent) vs server/routes/auth.js (ligne 208, écriture inconditionnelle) et server/routes/preparation.js (ligne 44, écriture inconditionnelle)
- **Description** : la correction LOGIQUE-006 (throttle 1×/5 min) n'a été appliquée que dans verifyUserAuth() de server.js (pages servies en Node). /api/verify — l'endpoint le plus fréquent (appelé par chaque page HTML via auth-check.js ET par le middleware Edge Vercel) — met à jour last_verified à CHAQUE requête.
- **Reproduction** : lecture des trois appelants ; npm test ne couvre pas ce chemin (aucun test sur /api/verify).
- **Cause racine** : correction partielle — un seul des trois sites d'appel a été modifié.
- **Correctif proposé** : reporter le throttle (lecture session.last_verified + garde 5 min) dans /api/verify et preparation.js verifyUser — ou extraire dans le même helper partagé que INTEGRATION-001.
- **Statut** : Ouvert

### [P2] Clé D7FM-WMKV liée au navigateur de test (self-report run précédent — à vérifier en prod)
- **ID** : INTEGRATION-003
- **Type** : Intégration (état opérationnel)
- **Fichier(s)** : audit/corrections.md (section 6)
- **Description** : le run précédent signale que la clé de test D7FM-WMKV reste liée au fingerprint du navigateur de test ; reset admin recommandé avant usage réel. NON vérifiable depuis cet environnement (aucune DB locale joignable) — self-report hérité, non prouvé ici.
- **Reproduction** : nécessite un accès à la DB de prod.
- **Cause racine** : test d'activation effectué pendant les corrections.
- **Correctif proposé** : reset admin de la clé avant la mise en production, puis vérifier que /api/activate répond 403 sur un second fingerprint.
- **Statut** : Ouvert (à vérifier côté prod)

### [P3] .env.example absent — variables d'environnement documentées seulement dans AGENTS.md
- **ID** : INTEGRATION-004
- **Type** : Intégration (hygiène)
- **Fichier(s)** : racine du repo (fichier absent) ; AGENTS.md section Environment
- **Description** : 9 variables lues dans le code (DATABASE_URL, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD, PORT, NODE_ENV, COOKIE_DOMAIN, KEY_CLASS, OPENROUTER_API_KEY, PREPARATION_PASSWORD, MIGRATE_FAIL_OPEN) n'ont pas de fichier .env.example. AGENTS.md les documente — l'information existe, le support onboarding manque.
- **Reproduction** : ls .env.example → absent.
- **Cause racine** : jamais créé.
- **Correctif proposé** : créer .env.example avec les clés et valeurs factices (jamais de vraies valeurs).
- **Statut** : Ouvert

### [P3] api/index.js utilise server.emit('request') — fonctionne mais non standard
- **ID** : INTEGRATION-005
- **Type** : Intégration
- **Fichier(s)** : api/index.js (ligne 40)
- **Description** : le handler serverless émet la requête Node native vers fastify.server au lieu de passer par un router explicite. Le run précédent le déclare « prouvé en prod » (self-report) ; la migration vers app.routing() serait une refonte risquée sans environnement de test Vercel.
- **Reproduction** : requiert un déploiement Vercel de test.
- **Cause racine** : contrainte du runtime serverless.
- **Correctif proposé** : garder tel quel ; revoir seulement si un environnement de preview Vercel est disponible.
- **Statut** : Ouvert (accepté)

---

## Contrats vérifiés SANS anomalie (preuves)

| Contrat | Côté client | Côté serveur | Preuve |
|---|---|---|---|
| GET /api/verify | auth-check.js:76 fetch credentials:include, lit authenticated/scope/reason | auth.js:169–220 renvoie {authenticated, scope, keyClass, reason} | cohérent |
| POST /api/activate {key, fingerprint} | activate.html:452–456 | auth.js:38–163 ({success, scope, message}) | cohérent |
| POST /api/admin/login {username, password} | login.html:81–86 | admin.js:45–93 | cohérent |
| GET /api/admin/verify | login.html:61–64 | admin.js:106–108 | cohérent |
| GET /api/preparation/status | middleware.js:115 (edge) | preparation.js:310–340 ({enabled, authenticated, unlocked}) | cohérent |
| POST /api/preparation/login/progress/validate/solution/quiz | atelier (rd-ai-chat.config) | preparation.js:365–580 | cohérents |
| Routes enregistrées | app.js:50–53 prefixes /api, /api/admin, /api/ai-chat, /api/preparation | 4 fichiers contrôleur existants | node --check OK ×4 |
| vercel.json ↔ api/index.js | rewrites /api/(.*) + includeFiles server/** + MIGRATE_FAIL_OPEN=0 | migrate.js lit MIGRATE_FAIL_OPEN | cohérent |
| Migrations ↔ db.js | 001_init.sql : activation_keys(class, platform sessions, curriculum_version), preparation_profiles/progress | db.js requêtes platform='b2', class, PREPARATION_CURRICULUM_VERSION=2, GREATEST, ON CONFLICT | cohérent |
| Listes de cours (4 copies) | access-control.js COURSES (24) = middleware.js COURSE_DIRS (24) = build.js COURSE_DIRS (24, epreuves inclus roadmap retiré) = auth-check.js COURSE_DIRS (24) | tests 7 & 8 verts (npm test 13/13) | prouvé par exécution |
| db.js exports ↔ admin.js | admin.js consomme getStatsByClass/getAllKeysByClass/getAllSessionsByClass/getStatsByCourseByClass/getActivityLogsByClass/getActivityLogsCountByClass | db.js:525–672 définit et exporte les 6 | prouvé (hypothèse P0 initiale réfutée) |

## Preuves d'exécution

- node --check : 18/18 fichiers OK (server.js, app.js, routes ×4, db.js, keygen.js, preparation-content.js, middleware.js, rd-ai-chat.js, api/index.js, auth-check.js, fingerprint.js, build.js, check_html_quizzes.js, check_qcm.js, migrate.js).
- npm test : 13/13 verts, 0 skipped.
- npm run build : exit 0, 779 fichiers, 580 HTML injectés, epreuves/robots/sitemap/404 dans dist/.
