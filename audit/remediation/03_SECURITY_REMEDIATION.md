# RAPPORT TECHNIQUE DE SÉCURITÉ & DURCISSEMENT SYSTÈME
## Plateforme REVI-MU — Interactive Computing Education Engine
**Classification :** Rapport de Remédiation de Sécurité Approfondi  
**Vulnérabilités traitées :** `SEC-001`, `SEC-002`, `SEC-003`, `SEC-004`, `OPS-001`, `AUTH-001`  
**Statut Global de Sécurité :** **DURCI & CONFORME PRODUCTION (RELEASE CANDIDATE)**

---

## 1. `SEC-001` (P0) — ÉVASION DE SANDBOX VM NODE.JS & ISOLATION D'EXÉCUTION DU CODE

### 1.1. Nature et Danger de la Vulnérabilité Initiale
Dans l'architecture initiale, l'évaluation locale du code soumis par les élèves (`server/services/execution/local-runner.js`) exploitait le module standard Node.js `vm` en exécutant le code utilisateur à l'intérieur du même processus que le serveur Fastify hôte.

Comme documenté explicitement dans la spécification officielle de Node.js, le module `vm` n'est pas une barrière de sécurité. En utilisant la chaîne de prototypes :
```javascript
const proc = console.log.constructor('return process')();
console.log('DATABASE_URL:', proc.env.DATABASE_URL);
```
un attaquant ou un étudiant curieux pouvait s'échapper immédiatement du contexte de la machine virtuelle, récupérer une référence directe à l'objet global `process` de Node.js, lire toutes les variables d'environnement secrètes (`DATABASE_URL`, `JWT_SECRET`, `ADMIN_PASSWORD`, `FEDAPAY_SECRET_KEY`) et charger `child_process` pour exécuter des commandes système avec les privilèges du serveur.

### 1.2. Architecture de Remédiation Défensive en Profondeur
Le serveur Fastify principal n'exécute désormais **plus aucun code utilisateur en mémoire interne**.
Une architecture d'exécution étanche à quatre niveaux a été déployée :

```
                                      +---------------------------------------------+
                                      |         Serveur Fastify Principal           |
                                      |  (Détient DATABASE_URL, JWT_SECRET, etc.)   |
                                      +---------------------------------------------+
                                                             |
                                            child_process.spawn(process.execPath)
                                                             |
                                        [Variables d'environnement NON transmises]
                                        [env: { PATH, LANG, HOME: '/tmp' }]
                                        [--max-old-space-size=64]
                                        [--permission --allow-fs-read=...]
                                                             v
+-------------------------------------------------------------------------------------------------------------------+
|                                 Processus Enfant Isolé (isolated-worker.js)                                       |
|                                                                                                                   |
|  1. Suppression immédiate de process.env et Object.freeze(process.env)                                           |
|  2. Neutralisation des globales réseau : globalThis.fetch = undefined, globalThis.WebSocket = undefined            |
|  3. Contexte VM à prototype nul : vm.createContext(Object.create(null), { codeGeneration: { strings/wasm: false }}|
|  4. Pont de communication primitif avec callbacks gelés sans référence à Function.constructor hôte               |
|  5. Buffer de sortie plafonné à 64 Ko (MAX_OUTPUT_BYTES = 65536)                                                  |
|  6. Interruption OS matérielle : process.kill(pid, 'SIGKILL') si exécution > timeoutMs                            |
+-------------------------------------------------------------------------------------------------------------------+
```

### 1.3. Vérification Expérimentale
Dans `tests/security-remediation.test.js` :
- Un secret canari `process.env.TEST_HOST_SECRET = 'CANARY_SECRET_123'` est injecté dans le processus de test.
- L'exécution de `console.log.constructor('return process')()` et de payloads d'évasion prototype renvoie une erreur ou une sortie vide, sans jamais révéler `CANARY_SECRET_123`.
- Les tentatives d'accès à `require`, `fs`, `child_process`, `fetch` ou `WebSocket` sont interceptées et neutralisées.
- Une boucle infinie `while(true) {}` est arrêtée par timeout dur avec émission de statut propre `SIGKILL` sans saturer le serveur.

---

## 2. `SEC-002` (P0) — AUTHENTIFICATION ADMINISTRATEUR FAIL-CLOSED ET TIMING-SAFE

### 2.1. Diagnostic du Problème Initial
Dans `server/routes/admin.js`, la vérification de connexion administrateur reposait sur une égalité simple entre les données reçues et les variables d'environnement :
```javascript
if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD)
```
Si les variables d'environnement `ADMIN_USERNAME` et `ADMIN_PASSWORD` n'étaient pas explicitement configurées sur l'environnement de déploiement, les deux expressions valaient `undefined`.
Une requête POST envoyée avec `{}` fournissait `username === undefined` et `password === undefined`. La condition était donc satisfaite (`undefined === undefined`), générant un jeton JWT d'administration complet.

### 2.2. Correctif Implémenté
1. **Échec en mode fermé (*Fail-Closed*) :**
   Avant toute évaluation, la route inspecte la présence de `ADMIN_USERNAME`, `ADMIN_PASSWORD` et `JWT_SECRET` dans `process.env` :
   ```javascript
   if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
     return reply.code(503).send({ success: false, message: 'Administration désactivée : identifiants non configurés.' });
   }
   ```
2. **Validation stricte de format :**
   Rejet immédiat avec code HTTP 401 si `username` ou `password` n'est pas une chaîne non vide.
3. **Résistance aux attaques temporelles (*Timing-Safe*) :**
   Calcul des condensats cryptographiques SHA-256 des identifiants saisis et des identifiants attendus, puis comparaison via `crypto.timingSafeEqual` :
   ```javascript
   const uDigestA = crypto.createHash('sha256').update(String(username)).digest();
   const uDigestB = crypto.createHash('sha256').update(String(process.env.ADMIN_USERNAME)).digest();
   const pDigestA = crypto.createHash('sha256').update(String(password)).digest();
   const pDigestB = crypto.createHash('sha256').update(String(process.env.ADMIN_PASSWORD)).digest();
   const uMatch = crypto.timingSafeEqual(uDigestA, uDigestB);
   const pMatch = crypto.timingSafeEqual(pDigestA, pDigestB);
   if (!uMatch || !pMatch) return reply.code(401).send({ ... });
   ```

---

## 3. `SEC-003` & `AUTH-001` — CONTRÔLE DES MODÈLES D'IA ET RÉVOCATION DES SESSIONS

### 3.1. Risque d'Injection de Modèle Arbitraire (`SEC-003`)
L'endpoint `/api/ai-chat` transmettait directement la valeur du paramètre `model` du corps HTTP vers OpenRouter via `aiPool.chatCompletion({ model })`. Un utilisateur malveillant pouvait injecter des modèles commerciaux facturés à plusieurs centimes par requête (`anthropic/claude-3.5-sonnet`, `openai/gpt-4o`) pour épuiser le solde financier de la plateforme.

**Remédiation :**
Mise en place d'une liste blanche immuable de modèles autorisés côté serveur :
```javascript
const ALLOWED_CLIENT_MODELS = new Set([
  'deepseek/deepseek-chat',
  'deepseek/deepseek-chat-v3-0324:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemini-2.0-flash-exp:free',
  'qwen/qwen-2.5-72b-instruct:free'
]);
```
Si le client transmet un modèle ne figurant pas dans cet ensemble, la valeur est invalidée et remplacée par la configuration par défaut du pool IA serveur.

### 3.2. Contrôle de Révocation de Session (`AUTH-001`)
La route `/api/ai-chat` se limitait à la vérification de la signature cryptographique du JWT sans vérifier son statut effectif.
Désormais, dès lors que la base de données est configurée, la route effectue un contrôle d'état dynamique :
- Validation de l'existence de la session via `db.getSessionByJti(decoded.jti)` et de son drapeau `is_valid`.
- Validation de l'utilisateur associé via `db.getUserById(decoded.userId)` et de son statut `is_active`.
- En cas de session révoquée ou de compte suspendu, la requête est rejetée avec un code HTTP 401.

---

## 4. `SEC-004` & `OPS-001` — DURCISSEMENT CORS & CONTENT SECURITY POLICY (CSP)

### 4.1. Restriction Stricte des Origines CORS (`SEC-004`)
L'expression rationnelle antérieure `/\.vercel\.app$/` autorisait indistinctement n'importe quel domaine hébergé sur Vercel (incluant des comptes tiers potentiellement hostiles). Combinée à l'option `credentials: true`, cette configuration permettait des attaques de type Cross-Origin Resource Sharing Abuse.

**Remédiation :**
Remplacement par un validateur d'origine explicite dans `server/app.js` :
- Origines locales : `http://localhost(:port)` et `http://127.0.0.1(:port)`
- Origine officielle de production : `https://revi-mu.vercel.app`
- Sous-domaines de prévisualisation officiels : `/^https:\/\/revi-mu(-[a-z0-9-]+)?\.vercel\.app$/`
- Origine Render officielle : `https://revi-mu.onrender.com` et `/^https:\/\/revi-mu(-[a-z0-9-]+)?\.onrender\.com$/`
- Origines additionnelles déclarées dans `process.env.ALLOWED_ORIGINS`.
- Rejet systématique de toute autre origine tierce.

### 4.2. Mise en Place d'une CSP Complète (`OPS-001`)
L'en-tête de Content Security Policy, initialement désactivé (`contentSecurityPolicy: false`), est configuré via `@fastify/helmet` avec des règles strictes assurant la défense en profondeur contre le cross-site scripting (XSS) et les injections d'iframes malveillantes :
- Interdiction de chargement d'objets (`objectSrc: ["'none'"]`).
- Restriction de l'ancrage de frames (`frameAncestors: ["'self'"]`).
- Restriction des connexions d'API (`connectSrc`) exclusivement à `self`, `revi-mu.vercel.app`, `revi-mu.onrender.com` et aux polices Google Fonts.
- Prise en charge ciblée des workers et scripts de l'éditeur Monaco (`blob:`, `'unsafe-inline'`, `'unsafe-eval'`).
