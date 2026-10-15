# SYNTHÈSE — AUDIT-SANS-PITIE (partielle, 2/5 rapports + observations orchestrateur)
Date : 2026-09-26
Statut : EN ATTENTE des rapports completude.md, logique.md, design-ux.md (sous-agents en cours)
Sortie : triée par sévérité puis effort estimé. Aucune correction avant validation utilisateur.

## État des preuves d'exécution (orchestrateur, toutes réelles)

| Vérification | Résultat |
|---|---|
| npm test (node --test) | 13/13 verts, 0 fail, 0 skipped |
| node --check ×18 fichiers | 18/18 OK |
| node scripts/check_html_quizzes.js | 0 échec (couverture partielle — TESTS-002) |
| node scripts/check_qcm.js | 0 échec (couverture partielle — TESTS-002) |
| npm run build | exit 0, 779 fichiers, 580 HTML injectés, epreuves/robots/sitemap/404 dans dist/ |
| node -e simpleHash (stabilité fingerprint) | identique sur 3 exécutions |

## Contexte chronologique (important pour lire les rapports)

- Le run précédent (audit/ + corrections.md, phases 6-7) a appliqué ses corrections PENDANT le début de cette session (01:16-01:35). Certaines lectures initiales ont capturé un état intermédiaire ; chaque contradiction a été re-vérifiée contre l'état ACTUEL avant d'être portée en synthèse.
- Corrections du run précédent CONFIRMÉES appliquées (vérifiées dans le code actuel) : epreuves dans build.js COURSE_DIRS, roadmap retiré, allowlist racine server.js (ROOT_ALLOWLIST), '/api/' retiré de BLOCKED_PATHS, trustProxy: true, CORS cb(null,false), cookies symétriques + COOKIE_DOMAIN, throttle last_verified dans server.js:97-100, filtre classe 'b0' dans /api/verify, esc() ×9 dashboard + sanitization username admin.js:81, tests/ (13 verts), fix-auto-tracker.js, footer portail noir + grille minmax(min(230px,100%)), 53 redirections meta-refresh, liens chapitres réels (linux 1-4 vérifiés), auth-check synchronisé 24 cours, message ?preparation=locked portail, script stop taskkill supprimé.
- Correction du run précédent NON appliquée (constatée) : throttle last_verified uniquement dans server.js — /api/verify (auth.js:208) et preparation.js (l.44) écrivent toujours inconditionnellement (INTEGRATION-002).

## P0 (bloquant — interdiction de livrer tant que non corrigé)

### INTEGRATION-001 — /api/ai-chat sans vérification de session/clé
- server/routes/ai-chat.js:22-31 : simple jwt.verify, jamais getSessionByJti/getKeyById/expiration/révocation.
- Une clé révoquée ou expirée garde l'accès au proxy OpenRouter (coût serveur) jusqu'à 365 jours (durée du JWT).
- Correctif : extraire la vérification canonique (session + clé active + expiration + classe) en helper partagé, l'appeler dans ai-chat.js (modèle : preparation.js verifyUser).
- Effort : faible (~30 min). Statut : Ouvert. Rapport : integration.md

## P1 (majeur — corrigé avant la fin de la session d'audit)

### TESTS-001 — Zones critiques sans aucun test
- /api/verify (session, expiration, classe), activation (re-activation, révocation sessions), admin (reset/revoke/renew), ai-chat, preparation.js (XP, chronologie, gate solution), serveur statique (injection, allowlist, path-traversal) : 0 test.
- Correctif : tests sur fonctions pures restantes (validateSubmission, computeProjectXp, injectAuth, isRootPathAllowed) + intégration HTTP mockée.
- Effort : moyen. Statut : Ouvert. Rapport : tests.md

### TESTS-002 — check_qcm/check_html_quizzes : fausse assurance de couverture globale
- Cours codés en dur dans les scripts ; message final « 100% conformes » sur un sous-ensemble uniquement.
- Correctif : dériver les cours de COURSES + message « N/N cours audités ».
- Effort : faible. Statut : Ouvert. Rapport : tests.md

- Aucun P1 supplémentaire dans logique.md (le P0 LOGIQUE-001 est un doublon validé de INTEGRATION-001 — même correctif, compté une fois).

## P2 (mineur)

### INTEGRATION-002 — Throttle last_verified incohérent entre les 3 sites d'appel
- server.js:97-100 (throttle OK) vs auth.js:208 et preparation.js:44 (écriture inconditionnelle). /api/verify = endpoint le plus fréquent.
- Correctif : reporter le throttle dans /api/verify + preparation.js (même helper que INTEGRATION-001).
- Effort : faible. Statut : Ouvert. Rapport : integration.md

### INTEGRATION-003 — Clé D7FM-WMKV liée au navigateur de test (self-report, à vérifier en prod)
- Correctif : reset admin avant mise en production. Effort : trivial. Statut : Ouvert (prod). Rapport : integration.md

### TESTS-003 — Pas de coverage outillée
- Correctif : script test:coverage (node --test --experimental-test-coverage). Effort : trivial. Statut : Ouvert. Rapport : tests.md

### TESTS-004 — Tests d'intégration HTTP impossibles sans DB, aucun mock
- Correctif : DB de test ou mock pg + fastify.inject. Effort : moyen. Statut : Ouvert. Rapport : tests.md

### LOGIQUE-002 — decodeURIComponent non gardé dans le catch-all → 500 sur URL malformée
- server.js:146 : URIError non entouré → 500 générique au lieu de 400. Cas limite, pas de risque sécurité.
- Correctif : try/catch → 400. Effort : trivial. Statut : Ouvert. Rapport : logique.md

### LOGIQUE-003 — /api/admin/keys/:id/* avec id non numérique → 500 au lieu de 404
- admin.js : parseInt('abc') = NaN → pg lève → 500. Cas limite (URL forgée).
- Correctif : valider /^\d+$/ → 404. Effort : trivial. Statut : Ouvert. Rapport : logique.md

- [EN ATTENTE — entrées P2 de completude.md, logique.md, design-ux.md]

## P3 (cosmétique / backlog)

### INTEGRATION-004 — .env.example absent (variables documentées dans AGENTS.md uniquement)
- Effort : trivial. Statut : Ouvert. Rapport : integration.md

### INTEGRATION-005 — api/index.js server.emit('request') non standard (fonctionne en prod, self-report)
- Garder tel quel sauf environnement de preview Vercel. Statut : accepté. Rapport : integration.md

### TESTS-005 — Chaîne vercel-build non exécutable ici (pas de DB)
- Statut : accepté. Rapport : tests.md

### PORTAL-001 (orchestrateur) — Favicon data-URI malformé dans preparation-web/index.html
- preparation-web/index.html:8 : `href="data:;base64,iVBwR0KGgo="` — un vrai PNG base64 commence par `iVBORw0KGgo` ; la chaîne est tronquée/corrompue → favicon cassé silencieux.
- Correctif : remplacer par un favicon SVG emoji valide (modèle : activate.html:11) ou supprimer le link. Effort : trivial. Statut : Ouvert

### PORTAL-002 (orchestrateur) — Portail index.html sans favicon déclaré
- index.html : aucun `<link rel="icon">` → le navigateur demande /favicon.ico (absent) → 404 maison à chaque visite du portail.
- Correctif : ajouter le favicon SVG emoji (🎓/🔑) cohérent avec le reste. Effort : trivial. Statut : Ouvert

### INTEGRATION-006 (orchestrateur) — Divergence client vs Node/Edge sur /preparation-web/index.html
- auth-check.js:43 traite l'index de l'atelier comme page libre ; access-control.js (Node) et middleware.js (Edge) le protègent. Impact nul en pratique (le serveur redirige avant le rendu si non authentifié) — incohérence de contrat documentée seulement.
- Correctif : ajouter le cas preparation-web dans isProtectedPage côté client (alignement sur access-control.js). Effort : faible. Statut : Ouvert

### LOGIQUE-004 (logique.md) — Logout client sans .catch — échec réseau silencieux
- auth-check.js:186-187 : ni reload ni message si le POST échoue. Effort : trivial. Statut : Ouvert

### LOGIQUE-005 (logique.md) — login.html : .catch(() => {}) silencieux sur /api/admin/verify
- login.html:64 : acceptable (formulaire resté utilisable), silence non loggué. Effort : trivial. Statut : accepté

### LOGIQUE-006 (logique.md) — Variable path capturée avant history.replaceState (portail)
- Sans impact (même page servie). Statut : accepté

### LOGIQUE-007 (logique.md) — MIME .py text/plain en local/Render (build Vercel exclut .py)
- Exposition mineure de matériel source en local uniquement. Effort : trivial. Statut : Ouvert

### LOGIQUE-008 (logique.md) — Middleware Edge fail-closed sur échec fetch /api/verify
- Choix de sécurité délibéré ; impact disponibilité pendant une panne API. Statut : accepté

### Note de fausse piste (orchestrateur) — divergence chapitre1 RÉFUTÉE
- verify-logic.js signalait une divergence client sur /probabilites/chapitres/chapitre1.html : RÉFUTÉE — le code client ACTUEL (auth-check.js:46) contient la règle « chapitre1 gratuit » ; la table du script était construite sur une réimplémentation incomplète de isProtectedPage.

## Totaux (provisoires, 4/5 rapports)
P0 : 1 · P1 : 2 · P2 : 6 · P3 : 8 (hors doublons) — design-ux à ajouter.

## Fausses pistes réfutées (pour mémoire — doctrine section 2)
- Hypothèse « dashboard admin crashe en 500 » (fonctions *ByClass manquantes) : RÉFUTÉE — db.js:525-672 définit et exporte les 6 fonctions.
- « placeholder dans sql/modules/ » : le contenu correspondant est un attribut HTML d'input (légitime), pas du contenu stub.
- Lecture partielle = source de faux positifs : toute conclusion de ce dossier est adossée à une lecture complète ou une exécution.
