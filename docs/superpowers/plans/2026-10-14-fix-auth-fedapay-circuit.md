# Plan de Résolution Exhaustif : Circuit d'Authentification, Sessions et Paiement FedaPay

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger l'ensemble des 7 failles critiques identifiées dans le circuit d'authentification, la gestion serverless Vercel, la protection d'accès aux exercices, et le flux de paiement FedaPay (notamment l'élimination du faux positif "Paiement réussi" et la fin des déconnexions intempestives).

**Architecture:** 
1. Fiabiliser le runtime Vercel (`api/index.js`) en attendant la fin de l'émission Fastify dans une Promise (`res.on('finish')`).
2. Corriger le calcul HMAC du webhook FedaPay en capturant le rawBody sans re-sérialisation JSON.
3. Implémenter une vérification réelle de statut FedaPay au retour utilisateur (`GET /api/fedapay/check-status`) et refondre le traitement UI dans `account.html` pour éliminer tout faux positif.
4. Harmoniser la gratuité du Chapitre 1 en permettant l'exécution de code anonyme avec quota par IP sur le premier chapitre.
5. Corriger les redirections relatives dans `login.html` et assouplir la gestion de session multi-onglets.

**Tech Stack:** Node.js, Fastify, PostgreSQL (`pg`), JWT, Vercel Serverless & Edge Middleware, FedaPay REST API.

---

## Global Constraints
- Aucune régression sur le catalogue canonique des 71 cours (24 B1, 24 B2, 23 B3).
- Aucun emoji nulle part dans le produit (iconographie via `/assets/img/ui-icons.svg`).
- Le Chapitre 1 de tous les cours doit rester 100% gratuit et fonctionnel (exercices interactifs inclus).
- La clé secrète FedaPay (`sk_...`) ne doit jamais fuiter côté client.
- Tous les tests doivent passer : `node --test tests/*.test.js` et `npm run build`.

---

## Review Focus
1. **Retour FedaPay non payé** : si l'utilisateur quitte la page FedaPay sans payer et revient sur `/_auth/account.html?payment=return`, l'UI ne doit JAMAIS afficher "Paiement reçu". Elle doit interroger le serveur, constater l'absence d'approbation et afficher un message clair d'interruption.
2. **Exécution du code au Chapitre 1** : un visiteur non connecté sur le Chapitre 1 doit pouvoir exécuter du code et soumettre un exercice sans recevoir d'erreur 401 "Votre session a expiré".
3. **Session Vercel Serverless** : les requêtes API asynchrones ne doivent plus être coupées prématurément par le runtime Vercel (fin des 502 intermittents).
4. **Signature Webhook FedaPay** : le HMAC calculé doit matcher exactement la signature envoyée par FedaPay grâce au rawBody préservé.
5. **Redirection login** : un utilisateur connecté arrivant sur `login.html` doit être redirigé vers `/_auth/account.html` (avec le slash initial) sans erreur 404.

---

### Task 1: Stabiliser le Handler Vercel Serverless (`api/index.js`)

**Files:**
- Modify: `api/index.js`
- Test: `tests/accounts.test.js`

- [x] **Step 1: Inspecter `api/index.js`**
  Identifier l'appel `fastify.server.emit('request', req, res)` non awaité.
- [x] **Step 2: Encapsuler l'émission dans une Promise avec écouteurs `finish`, `close`, `error`**
  ```javascript
  await new Promise((resolve, reject) => {
    res.on('finish', resolve);
    res.on('close', resolve);
    res.on('error', reject);
    fastify.server.emit('request', req, res);
  });
  ```
- [x] **Step 3: Vérifier le démarrage et la compatibilité locale**
  Vérifier que les tests existants s'exécutent sans blocage ni fuite d'écouteur.

---

### Task 2: Capturer le Raw Body pour le Webhook FedaPay (`server/app.js` & `server/routes/fedapay.js`)

**Files:**
- Modify: `server/app.js`
- Modify: `server/routes/fedapay.js`
- Test: `tests/accounts.test.js`

- [x] **Step 1: Ajouter la capture du rawBody dans Fastify pour la route webhook**
  Dans `server/app.js` ou dans `server/routes/fedapay.js`, enregistrer un content parser qui conserve le buffer brut (`request.rawBody`) avant parsing JSON.
- [x] **Step 2: Mettre à jour `verifyWebhookSignature` dans `server/routes/fedapay.js`**
  Utiliser `request.rawBody` ou le buffer exact au lieu de `JSON.stringify(request.body)`.
- [x] **Step 3: Ajouter un test unitaire prouvant la vérification avec signature HMAC exacte**
  Vérifier dans `tests/accounts.test.js` que la signature FedaPay est validée avec le rawBody.

---

### Task 3: Créer l'API de Vérification au Retour & Sécuriser l'UI (`server/routes/fedapay.js` & `public/account.html`)

**Files:**
- Modify: `server/routes/fedapay.js`
- Modify: `public/account.html`
- Test: `tests/accounts.test.js`

- [x] **Step 1: Créer l'endpoint `GET /api/fedapay/check-status`**
  - Récupère le dernier paiement de l'utilisateur ou la transaction demandée (`txId`).
  - Si le statut local est `pending` et qu'un `txId` existe, interroge l'API FedaPay `GET /v1/transactions/{id}` pour vérifier si la transaction a été approuvée entre-temps.
  - Si approuvée côté FedaPay : active l'abonnement en base immédiatement via `db.extendSubscription` et renvoie `{ status: 'approved', subscribed: true }`.
  - Si non approuvée (annulée, échouée, en attente) : renvoie `{ status: tx.status || 'pending', subscribed: false }`.
- [x] **Step 2: Refondre la gestion de `payment=return` dans `public/account.html`**
  - Supprimer le message aveugle `showMsg('Paiement reçu !...')`.
  - Afficher un état de vérification dynamique : *« Vérification du paiement auprès de l'opérateur... »*.
  - Appeler `/api/fedapay/check-status`.
  - Si `approved` : afficher le message de félicitations et recharger les informations de compte avec le badge "Actif".
  - Si `canceled` / `declined` / `pending` : afficher un message approprié (ex. *« La transaction n'a pas abouti ou a été annulée. Aucun prélèvement n'a été effectué. »*) sans faux espoir.
- [x] **Step 3: Nettoyer l'URL via `history.replaceState` pour éviter que le rafraîchissement ne redéclenche le paramètre**

---

### Task 4: Autoriser l'Exécution Gratuite au Chapitre 1 (`server/routes/execute.js` & `server/routes/exercises.js`)

**Files:**
- Modify: `server/routes/execute.js`
- Modify: `server/routes/exercises.js`
- Test: `tests/exercises.test.js`

- [x] **Step 1: Assouplir `requireUser` pour les exercices du Chapitre 1**
  Dans `server/routes/exercises.js`, vérifier si l'exercice soumis (`body.exerciseId`) appartient au Chapitre 1 (ex. `*-ch1-*` ou préfixe de chapitre 1) :
  - Si oui : autoriser l'exécution anonyme en utilisant l'adresse IP (`ip:${request.ip}`) comme clé de quota dans `budget.js`.
  - Si l'utilisateur est connecté : continuer à enregistrer sa session et son compte normalement.
- [x] **Step 2: Assouplir `/api/execute` pour les exécutions en direct**
  Permettre aux visiteurs d'exécuter du code avec quota IP sans exiger d'être connecté au préalable.
- [x] **Step 3: Vérifier que les chapitres 2+ restent protégés et payants**

---

### Task 5: Corriger le Bug de Redirection dans `public/login.html`

**Files:**
- Modify: `public/login.html`

- [x] **Step 1: Corriger la ligne 236 de `public/login.html`**
  Remplacer `_auth/account.html` par `/_auth/account.html` avec slash absolu pour éviter l'erreur 404 (`/_auth/_auth/account.html`).
- [x] **Step 2: Vérifier le comportement en local et tester la redirection**

---

### Task 6: Assouplir la Gestion de Session (Éviter les Déconnexions Multi-Onglets)

**Files:**
- Modify: `server/routes/auth.js`
- Test: `tests/accounts.test.js`

- [x] **Step 1: Analyser la révocation de session dans `establishSession`**
  Dans `server/routes/auth.js`, ne révoquer les sessions précédentes que si le fingerprint machine est différent (changement réel d'appareil) ou maintenir jusqu'à 3 sessions actives simultanées par compte au lieu de 1 seule rigide.
- [x] **Step 2: Mettre à jour `tests/accounts.test.js` si nécessaire**

---

### Task 7: Tests, Synchronisation, Build & Déploiement

**Files:**
- Run: `node --test tests/*.test.js`
- Run: `node scripts/sync-courses.js`
- Run: `npm run build`
- Deploy: `npx vercel --prod --yes`

- [x] **Step 1: Exécuter la suite de tests complète**
- [x] **Step 2: Reconstruire `dist/` avec `npm run build`**
- [x] **Step 3: Déployer sur Vercel production**
- [x] **Step 4: Smoke test en conditions réelles avec `curl`**
