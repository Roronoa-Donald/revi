# Rapport — chasseur-de-bugs-logiques
Date : 2026-09-26
Périmètre : server.js, server/**, middleware.js, scripts/build.js, public/js/*, rd-ai-chat.js, pages auth/admin/portail
Mode : lecture exhaustive + exécution réelle (verify-pure.js : XP, chronologie, solutions ; verify-logic.js : synchro listes ; node -e : stabilité fingerprint ; npm test 13/13)
Rédigé par l'orchestrateur (le sous-agent sa-1 est mort sur timeout API ×3 — endpoint Nvidia coupe les appels longs)
Total : 1 P0, 0 P1, 2 P2, 5 P3

---

### [P0] /api/ai-chat : vérification JWT sans session ni clé — accès au chat après révocation/expiration
- **ID** : LOGIQUE-001 (doublon validé de INTEGRATION-001 — même correctif)
- **Type** : Logique (chemin d'exécution incomplet) / Intégration
- **Fichier(s)** : server/routes/ai-chat.js (lignes 22–31)
- **Description** : le chemin d'exécution de /api/ai-chat s'arrête à jwt.verify(token, JWT_SECRET). Les vérifications session.is_valid (getSessionByJti), clé active (getKeyById), expiration (expires_at) et classe présentes dans /api/verify (auth.js:169–220) et preparation.js verifyUser (l.26–55) sont absentes.
- **Reproduction** : chemin concret — clé activée → jwt signé 365d posé en cookie → admin révoque la clé (sessions invalidées en base) → POST /api/ai-chat avec le cookie → jwt.verify passe (signature valide, pas expirée) → proxy OpenRouter appelé → 200. Aucune autre barrière.
- **Cause racine** : vérification minimale locale au lieu du modèle canonique partagé.
- **Correctif proposé** : helper partagé de vérification (session + clé active + expiration + classe), appelé par ai-chat.js ; en profiter pour reporter le throttle last_verified (INTEGRATION-002).
- **Statut** : Ouvert

### [P2] decodeURIComponent lève URIError sur URL malformée → 500 au lieu de 400
- **ID** : LOGIQUE-002
- **Type** : Logique (cas limite mal géré)
- **Fichier(s)** : server.js (ligne ~146 : `decodeURIComponent(request.url.split('?')[0])` dans le catch-all)
- **Description** : decodeURIComponent('％ZZ' ou '/%ZZ') lève URIError ; le catch-all n'a pas de try autour du décodage → Fastify renvoie 500 générique au lieu d'un 400 propre sur une URL malformée (ex. lien brisé avec % orphelin). Aucun impact sécurité ni fonctionnel nominal.
- **Reproduction** : curl 'http://host/%ZZ' → 500 (prouvé par la sémantique de decodeURIComponent ; le handler n'entoure pas l'appel).
- **Cause racine** : décodage non gardé.
- **Correctif proposé** : try/catch autour du décodage → 400 en cas d'URIError.
- **Statut** : Ouvert

### [P2] /api/admin/keys/:id/* avec id non numérique → 500 au lieu de 404
- **ID** : LOGIQUE-003
- **Type** : Logique (cas limite mal géré)
- **Fichier(s)** : server/routes/admin.js (parseInt(id) aux routes reset/revoke/reactivate/renew/delete, lignes 185, 210, 235, 260, 293)
- **Description** : parseInt('abc') = NaN → la requête SQL reçoit NaN → pg lève → 500 « Erreur serveur » au lieu d'un 404 « Clé introuvable ». Cas limite (URL forgée ou lien obsolète) ; aucune conséquence sur les données.
- **Reproduction** : POST /api/admin/keys/abc/revoke avec cookie admin → 500.
- **Cause racine** : pas de validation du paramètre avant parseInt.
- **Correctif proposé** : valider /^\d+$/ sur id → 400/404 si non numérique.
- **Statut** : Ouvert

### [P3] Logout client sans .catch — échec réseau silencieux
- **ID** : LOGIQUE-004
- **Type** : Logique (silence suspect)
- **Fichier(s)** : public/js/auth-check.js (lignes 186–187)
- **Description** : fetch('/api/logout') n'a pas de .catch : si le POST échoue (réseau), ni reload ni message — le clic semble sans effet. Cas rare (serveur injoignable) ; le confirm précède.
- **Correctif proposé** : .catch(() => window.location.reload()) ou message d'erreur.
- **Statut** : Ouvert

### [P3] login.html : .catch(() => {}) silencieux sur le check /api/admin/verify
- **ID** : LOGIQUE-005
- **Type** : Logique (silence suspect)
- **Fichier(s)** : public/admin/login.html (ligne 64)
- **Description** : si le check de session admin échoue (réseau), aucun message — l'utilisateur reste sur le formulaire (comportement acceptable : le formulaire reste utilisable). Silence documenté mais non loggué.
- **Correctif proposé** : acceptable tel quel ; logguer côté serveur si besoin.
- **Statut** : Ouvert (accepté)

### [P3] Variable path capturée avant history.replaceState (portail)
- **ID** : LOGIQUE-006
- **Type** : Logique (données obsolètes)
- **Fichier(s)** : public/js/auth-check.js (ligne 14) vs index.html (ligne 370)
- **Description** : auth-check capture path au chargement ; le portail remplace l'URL (?preparation=locked → /index.html) après. Les paramètres redirect du banner démo utilisent la valeur d'origine ('/') — les deux servent la même page. Sans impact.
- **Correctif proposé** : aucun nécessaire.
- **Statut** : Ouvert (accepté)

### [P3] MIME .py en text/plain — fichiers .py de cours servables en mode local/Render
- **ID** : LOGIQUE-007
- **Type** : Logique (incohérence Node vs build)
- **Fichier(s)** : server.js (MIME_TYPES .py) vs scripts/build.js (exclusion .py)
- **Description** : le build Vercel exclut les .py des cours, mais en mode local/Render le serveur les sert (un .py dans un dossier de cours n'est ni .html ni .pdf → libre). Exposition mineure de matériel source en local uniquement.
- **Correctif proposé** : ajouter '.py' aux chemins refusés côté serveur si l'exposition est indésirable.
- **Statut** : Ouvert

### [P3] Middleware Edge fail-closed sur échec fetch /api/verify
- **ID** : LOGIQUE-008
- **Type** : Logique (choix assumé, signalé)
- **Fichier(s)** : middleware.js (lignes 92–105)
- **Description** : si le fetch interne vers /api/verify échoue, data=null → redirection vers activation même si l'utilisateur est authentifié. Choix de sécurité fail-closed délibéré ; impact disponibilité uniquement pendant une panne de l'API.
- **Correctif proposé** : aucun (choix assumé) ; retry court optionnel.
- **Statut** : Ouvert (accepté)

---

## Chemins vérifiés SANS bug (preuves)

| Chemin / calcul | Vérification | Résultat |
|---|---|---|
| computeProjectXp (9 cas : hint/solution/attempts 0→99) | exécution verify-pure.js | cohérent (70/70/65/63/55/51/45/35/20, plancher 20 respecté) |
| isProjectUnlocked liste vide (première utilisation) | exécution | projet 1 true, projet 2 false — chronologie correcte |
| Solutions officielles vs règles (12 projets) | exécution | 12/12 auto-validées |
| Synchro listes de cours (canonique/Edge/build/client) | exécution verify-logic.js | 24/24/24/24, sets identiques, diff vide |
| Stabilité fingerprint (3 exécutions) | node -e | hash identique — re-activation même machine fiable |
| Activation même machine (re-activation) | lecture auth.js:94–109 | invalide les anciennes sessions B2 seulement, crée la nouvelle — cohérent |
| Double clic activation | lecture activate.html:449 | btn.disabled immédiat — pas de double soumission |
| Logout serveur (token invalide) | lecture auth.js:239–243 | catch documenté, cookie supprimé quand même — assumé |
| CORS origine externe | lecture app.js:31 | cb(null,false) propre, pas d'exception 500 |
| Cookies pose/suppression symétriques | lecture auth.js/admin.js/preparation.js | cookieBaseOptions + COOKIE_DOMAIN partout |
| Rate-limit par IP réelle | lecture app.js:13 (trustProxy) | fiable derrière proxy |
| Throttle last_verified (chemin server.js) | lecture server.js:97–100 | garde 5 min présente |
| Gate preparation (solution après 2 échecs, quiz après validation) | lecture preparation.js:510, 549 | cohérent |
| Leaderboard rank global avec LIMIT | lecture db.js:404–417 | RANK() sur l'ensemble, LIMIT après — cohérent |
| npm test | exécution | 13/13 verts (inclut Edge sync + build COURSE_DIRS) |
