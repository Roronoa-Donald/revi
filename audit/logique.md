# Rapport — chasseur-de-bugs-logiques
Date : 2026-09-25
Périmètre : server.js, server/**, middleware.js, scripts/build.js, public/**
Total : 2 P0, 4 P1, 2 P2, 1 P3

---

### [P0] /api/verify refuse les clés B1 → déconnexion de fait de tous les apprenants B1
- **ID** : LOGIQUE-001
- **Type** : Logique
- **Fichier(s)** : server/routes/auth.js (lignes ~166-170, bloc « Vérifier la classe de clé »)
- **Description** : `/api/verify` renvoie `authenticated: false` si `keyRecord.class !== 'b2'`, alors que l'architecture prévoit explicitement des sessions parallèles B1/B2 (`platform` en base, commentaire auth.js ligne ~112 « invalider les anciennes sessions B2 seulement (pas les B1) », variants ByClass dans db.js, `KEY_CLASS` admin). Un apprenant B1 possédant un JWT valide et une session `is_valid` est traité comme non authentifié partout (edge middleware.js → redirection activation ; server.js verifyUserAuth le laisse passer lui, mais auth-check.js côté client bloque avec overlay).
- **Reproduction** (statique, preuve par lecture complète) : créer une clé class='b1', l'activer (l'activation ne vérifie PAS la classe — elle réussit), puis GET /api/verify → `{authenticated:false}` sans raison. Incohérence interne prouvée : même fichier, deux politiques.
- **Cause racine** : filtre de classe ajouté dans /verify sans cohérence avec le reste du système (server.js, middleware.js, preparation.js n'appliquent pas ce filtre de la même façon).
- **Correctif proposé** : soit supprimer le bloc, soit le conditionner à une liste de classes autorisées configurable (`ALLOWED_KEY_CLASSES`), alignée avec server.js.
- **Statut** : Ouvert

### [P0] Faille XSS stockée admin — notes de clés et détails de logs injectés sans échappement
- **ID** : LOGIQUE-002
- **Type** : Logique / Sécurité
- **Fichier(s)** : public/admin/dashboard.html (loadKeys ligne ~577 : `(k.note||…)` injecté brut ; loadLogs ligne ~692 : `log.details` brut ; line ~553/738 messages), server/routes/admin.js (ligne 81 : `details: 'Tentative de connexion échouée - user: ' + username` — entrée utilisateur stockée en base sans nettoyage)
- **Description** : le champ `note` d'une clé est saisi par l'admin (donc maîtrisé), MAIS `log.details` inclut le `username` soumis au login admin échoué (contrôlé par un attaquant non authentifié) et il est injecté via innerHTML dans le dashboard. Chaîne d'attaque : POST /api/admin/login avec `username: <img src=x onerror=...>` → stocké dans activity_logs → l'admin ouvre le journal → exécution de script dans le contexte admin (cookie admin_token httpOnly, mais actions via l'API admin possibles depuis la session).
- **Reproduction** : `curl -X POST .../api/admin/login -d '{"username":"<img src=x onerror=alert(1)>","password":"x"}'` puis consulter l'onglet Journal.
- **Cause racine** : construction de HTML par concaténation sans fonction d'échappement.
- **Correctif proposé** : ajouter `function esc(s)` (échappement &, <, >, ", ') et l'appliquer à `k.note`, `log.details`, `log.key_code`, `log.scope`, et au username dans admin.js avant stockage.
- **Statut** : Ouvert

### [P1] CORS : `cb(new Error('CORS bloqué'), false)` lève au lieu de répondre proprement
- **ID** : LOGIQUE-003
- **Type** : Logique
- **Fichier(s)** : server/app.js (lignes ~21-24)
- **Description** : `@fastify/cors` attend `cb(null, false)` pour refuser. Passer une `Error` en premier argument rejette avec une exception 500 non formatée et pollue les logs à chaque scan/origine externe (chaque requête cross-origin d'un outil externe → stack trace).
- **Reproduction** : `curl -i -H "Origin: https://evil.example" http://localhost:3000/api/verify` → 500 au lieu d'un refus CORS silencieux.
- **Cause racine** : mauvaise lecture de l'API du plugin.
- **Correctif proposé** : `return cb(null, false)`.
- **Statut** : Ouvert

### [P1] clearCookie sans `domain` : déconnexion cassée si COOKIE_DOMAIN est défini
- **ID** : LOGIQUE-004
- **Type** : Logique
- **Fichier(s)** : server/routes/auth.js (ligne 238), server/routes/admin.js (ligne 99)
- **Description** : les cookies `auth_token`/`admin_token` sont posés avec `domain: process.env.COOKIE_DOMAIN || undefined`, mais `clearCookie` ne passe que `{ path: '/' }`. Si `COOKIE_DOMAIN` est configuré, le navigateur voit deux cookies de même nom (domaine explicite vs domaine implicite) et `clearCookie` ne supprime que celui du domaine implicite → l'utilisateur semble ne jamais pouvoir se déconnecter.
- **Reproduction** : configurer COOKIE_DOMAIN, activer une clé, se déconnecter, recharger → toujours authentifié.
- **Cause racine** : options de suppression non symétriques des options de pose.
- **Correctif proposé** : extraire `cookieBaseOptions()` (avec domain) et l'utiliser dans setCookie ET clearCookie partout.
- **Statut** : Ouvert

### [P1] server.js : `/api/*` bloqué avant le rate-limit spécifique… et CORS 500 masque `/api` en local
- **ID** : LOGIQUE-005
- **Type** : Logique
- **Fichier(s)** : server.js (ligne 26, BLOCKED_PATHS inclut '/api/') + server/app.js
- **Description** : le catch-all `GET /*` de server.js est enregistré après les routes API (donc `/api/*` en GET atteint les vraies routes d'abord) — le blocage ne s'applique qu'aux méthodes non couvertes ; en revanche une requête GET sur `/api/admin/login` (POST-only) tombe dans le catch-all → 403 Forbidden au lieu de 405, et le message d'erreur client diffère selon l'origine de la requête. Mineur mais vérifié par lecture : BLOCKED_PATHS sert ici de filet, la vraie raison de l'ordre est l'enregistrement des routes avant le catch-all.
- **Reproduction** : `curl -i http://localhost:3000/api/admin/login` (GET) → 403 'Forbidden' générique.
- **Cause racine** : double couche de contrôle (routes + catch-all) avec sémantique différente.
- **Correctif proposé** : exclure '/api/' de BLOCKED_PATHS (Fastify répondra 404/405 proprement) ou setNotFoundHandler dédié.
- **Statut** : Ouvert

### [P1] verifyUserAuth met à jour `last_verified` à chaque requête protégée (write amplification)
- **ID** : LOGIQUE-006
- **Type** : Logique / Performance
- **Fichier(s)** : server.js (verifyUserAuth ligne ~57), server/routes/auth.js (/verify), server/routes/preparation.js (verifyUser)
- **Description** : chaque chargement de page protégée = 1 UPDATE sessions + (via verifyUserAuth) 2 SELECT. Sur un chapitre HTML il y a en plus le fetch /api/verify du client (auth-check.js) → 2 UPDATE par page vue, pour toutes les sessions actives, en continu sur une base gratuite Render. Aucun bug d'affichage direct, mais dégradation progressive mesurable du free tier.
- **Reproduction** : lecture du flux : auth-check.js fetch /verify + chargement HTML protégé.
- **Cause racine** : pas de throttle sur updateSessionVerified.
- **Correctif proposé** : ne mettre à jour last_verified que si `last_verified < NOW() - INTERVAL '5 minutes'` (condition SQL retournée, ou RETURNING pour savoir si update fait).
- **Statut** : Ouvert

### [P2] verifyPreparationForPage ignore `decoded.prepWeb` si cookie expiré ≠ expired mais token falsifié rejeté silencieusement
- **ID** : LOGIQUE-007
- **Type** : Logique
- **Fichier(s)** : server.js (verifyPreparationForPage lignes ~74-93)
- **Description** : en cas de JWT `preparation_token` invalide (signature, exp, passwordVersion différent), retour `false` → redirection `/index.html?preparation=locked` sans message distinctif. Le changement de PREPARATION_PASSWORD invalide tous les tokens sans prévenir l'utilisateur (pas d'état « votre session de section a expiré, re-saisissez le mot de passe »). UX dégradée, pas de faille.
- **Reproduction** : changer PREPARATION_PASSWORD en prod, recharger une page preparation-web → redirection muette.
- **Cause racine** : pas de distinction des causes dans la redirection.
- **Correctif proposé** : ajouter un paramètre `?preparation=locked&reason=invalid` côté atelier (affichage message).
- **Statut** : Ouvert

### [P2] generateActivationKey : entropie réduite et biais modulo (2 caractères sur 8 dérivés du timestamp)
- **ID** : LOGIQUE-008
- **Type** : Logique / Sécurité
- **Fichier(s)** : server/utils/keygen.js (lignes 7-34)
- **Description** : positions 1 et 5 dérivées de `Date.now()` (prévisibles) ; `randomByte % chars.length` introduit un biais modulo (32 % 32 = OK, mais chars.length = 32 et randomByte = 0..255 → 8 valeurs de byte par caractère, biais faible mais réel). Entropie effective ≈ 6 positions aléatoires × 5 bits = 30 bits + 2 positions quasi-prévisibles. Format court + rate-limit 5/min rendent l'attaque peu pratique, mais le schéma documenté (« aléatoires + timestamp ») est une faiblesse connue.
- **Reproduction** : lecture ; générer 1000 clés montre la corrélation position 1/5.
- **Cause racine** : conception initiale.
- **Correctif proposé** : `crypto.randomBytes(4).readUInt32BE(0) % 32^4` style, ou garder format mais 8 positions aléatoires via randomInt.
- **Statut** : Ouvert

### [P3] Rate-limit keyGenerator : `req.ip || x-forwarded-for` — ordre inversé derrière proxy
- **ID** : LOGIQUE-009
- **Type** : Logique
- **Fichier(s)** : server/app.js (keyGenerator ligne ~44)
- **Description** : `req.ip` en local vaut 127.0.0.1 pour tout le monde ; derrière proxy Render, req.ip est correct SI trustProxy est activé — or Fastify n'a pas `trustProxy: true` (vérifié : aucune occurrence). Le fallback x-forwarded-for n'est jamais atteint. Conséquence : derrière un proxy sans trustProxy, toutes les requêtes partagent l'IP interne → rate-limit global partagé entre tous les utilisateurs (5 activations/min pour TOUT le site).
- **Reproduction** : déployer derrière un proxy sans trustProxy → débits bloqués injustement.
- **Cause racine** : trustProxy absent de la config Fastify.
- **Correctif proposé** : `fastify({ trustProxy: true })` (Render/Vercel le fournissent) + garder keyGenerator simple.
- **Statut** : Ouvert
