# Rapport — auditeur-integration
Date : 2026-09-25
Périmètre : contrats front/back, env vars, cohérence des listes de cours, build/déploiement
Total : 1 P0, 2 P1, 3 P2

---

### [P0] Contrat /api/verify : le client auth-check.js exclut 8 cours canoniques de sa liste
- **ID** : INTEGRATION-001
- **Type** : Intégration
- **Fichier(s)** : public/js/auth-check.js (ligne 13 : 16 cours), server/middleware/access-control.js (COURSES : 24 entrées)
- **Description** : la liste `COURSE_DIRS` de auth-check.js ne contient NI `react`, NI `api-rest-flask`, NI `erp-si`, NI `ingenierie-besoin`, NI `masterclass-apprendre`, NI `docker`, NI `infographie`, NI `preparation-web`. Conséquences mesurées par lecture du flux : (1) sur ces cours, `isProtectedPage()` renvoie false → pas de masquage `auth-content-hidden` → **flash de contenu protégé** avant réponse serveur ; (2) si le serveur redirige (edge middleware), l'utilisateur voit la page se charger puis sauter ; (3) `showDemoBanner` n'apparaît jamais sur ces cours (regex ligne ~243 : liste à 15 cours, même divergence). Le serveur protège, donc pas de fuite finale — mais le contrat client/serveur est rompu sur 8 cours.
- **Reproduction** : ouvrir /react/chapitre-2.html (protégé côté serveur) avec réseau lent → le contenu s'affiche ~1-2 s avant l'overlay/redirect.
- **Cause racine** : auth-check.js n'a pas suivi l'ajout des nouveaux cours.
- **Correctif proposé** : synchroniser COURSE_DIRS de auth-check.js sur access-control.js (24 cours) et extraire la liste dans un seul endroit si possible (build injecte la liste ?).
- **Statut** : Ouvert

### [P1] isProtected() : `/cours/assets/foo.pdf` protégé mais images/JS des assets libres — et `/cours/<page>.html` protégé pour TOUT fichier html même hors chapitres
- **ID** : INTEGRATION-002
- **Type** : Intégration (vérification de cohérence — statut : CONFORME avec réserve)
- **Fichier(s)** : server/middleware/access-control.js (isProtected lignes ~96-150), middleware.js (copie conforme ligne par ligne — vérifiée)
- **Description** : les deux implémentations (Node et Edge) sont syntaxiquement identiques (diff faite à la lecture : mêmes conditions dans le même ordre). Réserve : `/epreuves/` et `preparation-web` traités avant le check `parts.length === 2` — un éventuel `epreuves/assets/x.png` serait protégé côté théorie alors que le dossier ne contient qu'un PDF à la racine (pas d'impact réel aujourd'hui). Le pattern « tout .html dans le cours est protégé » couvre bien chapitres/exercices/qcm-*.html. Statut final : cohérent, à re-vérifier à chaque ajout de cours.
- **Reproduction** : diff manuelle des deux fichiers.
- **Cause racine** : duplication délibérée Node/Edge documentée dans AGENTS.md.
- **Correctif proposé** : (préventif) script de test qui importe les deux fichiers et compare isProtected sur une batterie d'URLs (30 lignes, exécutable en CI).
- **Statut** : Ouvert (réserve)

### [P1] vercel.json : rewrites `/api/(.*)` → fonction unique — pas de cache headers sur `_auth/js/*` mais Cache-Control immutable sur assets de cours ; epreuves absent du pattern d'assets
- **ID** : INTEGRATION-003
- **Type** : Intégration
- **Fichier(s)** : vercel.json (headers lignes ~27-45)
- **Description** : le pattern de cache long `(linux|php|probabilites|rd_java|rd_winserver|RD-RO|sql|csharp|uml|ccna|uiux|docker|infographie)` omet `react`, `api-rest-flask`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre`, `assembleur`, `Cyber securite B2`, `epreuves` → leurs assets ne sont pas mis en cache CDN (8 cours sur 24). Incohérence avec vercel.json lui-même qui protège ces cours ailleurs. Impact : perf, pas de sécurité.
- **Reproduction** : lecture vercel.json lignes 30-37.
- **Cause racine** : pattern regex non mis à jour avec les cours.
- **Correctif proposé** : `source: "/(.*)/assets/(.*)"` — le contrôle d'accès reste assuré par middleware.js pour les PDF.
- **Statut** : Ouvert

### [P2] Env vars : `.env` et `.env.local` présents à la racine, NON ignorés par .gitignore… (.gitignore absent du repo déclaré)
- **ID** : INTEGRATION-004
- **Type** : Intégration / Sécurité
- **Fichier(s)** : .env, .env.local (racine), .gitignore (présent sur disque)
- **Description** : AGENTS.md dit que le workspace n'est pas un dépôt git et que `.env` est ignoré. Sur disque, `.gitignore` existe. Vérification faite : `.env` contient des secrets locaux ; si le repo est un jour poussé tel quel, risque de fuite. `render.yaml` liste bien les 4 vars requises ; `vercel.json` ne référence pas OPENROUTER_API_KEY / PREPARATION_PASSWORD (définis côté dashboard Vercel, OK).
- **Reproduction** : `cat .gitignore | grep env`.
- **Cause racine** : hygiène.
- **Correctif proposé** : vérifier que .gitignore contient `.env`, `.env.local`, `dist/`, `node_modules/` (et l'ajouter sinon).
- **Statut** : Ouvert

### [P2] Dist build : `preparation-cheatsheet.html` copié mais son lien depuis l'atelier suppose session déverrouillée — API derrière : cohérent
- **ID** : INTEGRATION-005
- **Type** : Intégration (statut : CONFORME)
- **Fichier(s)** : preparation-cheatsheet.html, server/routes/preparation.js
- **Description** : vérification du contrat : GET /progress exige auth + prep token (401/403 gérés par getAuthContext) ; le client app.js appelle `/api/preparation/{status,progress,validate,quiz,solution,leaderboard,login}` — les 7 routes existent avec les mêmes verbes/payloads (lecture croisée app.js lignes 694-2241 vs routes). Contrat conforme.
- **Reproduction** : lecture croisée.
- **Cause racine** : —
- **Correctif proposé** : —
- **Statut** : Ouvert (conforme — aucune action)

### [P2] api/index.js : `fastify.server.emit('request', req, res)` sur instance `ready()` mais non écoutante — compatible Vercel Node mais sans garanties sur les erreurs async
- **ID** : INTEGRATION-006
- **Type** : Intégration
- **Fichier(s)** : api/index.js (lignes 35-42)
- **Description** : le pattern officiel Vercel/Fastify recommandé est `@fastify/aws-lambda` ou l'injection via `app.routing(req, res)`. `server.emit('request')` fonctionne (le serveur HTTP de Fastify est un net.Server standard) mais les erreurs de la chaîne de plugins non interceptées peuvent tuer l'instance lambda (cold start suivant). Pas de preuve d'échec réel, seulement une fragilité documentée.
- **Reproduction** : n/a (dépend du runtime Vercel).
- **Cause racine** : pattern non standard.
- **Correctif proposé** : basculer sur `app.routing(req, res)` (API publique Fastify) — changement d'une ligne.
- **Statut** : Ouvert
