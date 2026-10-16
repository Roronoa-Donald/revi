# RAPPORT DE QUALITÉ TECHNIQUE, SÉCURITÉ & ARCHITECTURE
## Plateforme REVI-MU — Interactive Computing Education Engine
**Cadre :** Audit Approfondi de la Sécurité Applicative, de l'Infrastructure et du Moteur d'Exécution  
**Composants Audités :** Serveur Fastify (`server/app.js`), Exécution de code (`server/services/execution/`), Authentification & Sessions (`server/routes/auth.js`, `server/routes/admin.js`), Persistance PostgreSQL (`server/db.js`), Middleware Edge (`middleware.js`), Pipeline Vercel (`vercel.json`, `scripts/build.js`).  

---

## 1. ARCHITECTURE GLOBALE & FLUX DE DONNÉES

L'application repose sur une architecture hybride :
1. **Frontend Statique & Assets Servis par CDN Vercel :** Fichiers HTML injectés, CSS, JS dans `dist/`.
2. **Edge Middleware Vercel (`middleware.js`) :** Interception avant accès aux fichiers statiques protégés (chapitres >= 2, PDF, QCM) avec appel sous-jacent à `/api/verify`.
3. **API Backend Serverless Node.js / Fastify (`api/index.js` -> `server/app.js`) :** Gestion des comptes, paiements, requêtes d'exécution de code et tuteur IA.
4. **Base de Données Relationnelle PostgreSQL :** Hébergée sur une instance externe (accessible via `DATABASE_URL`), gérée par pool de connexions `pg` avec migrations SQL versionnées.
5. **Moteur d'Exécution de Code Polyglotte :** Connecteur distant vers Piston conteneurisé (`https://code-executor.rdcorp.app`) avec repli local embarqué (`local-runner.js` via Skulpt Python et Node `vm`).

```
                              ┌───────────────────────────────┐
                              │     Client / Navigateur       │
                              └──────────────┬────────────────┘
                                             │ HTTPS
                                             ▼
                              ┌───────────────────────────────┐
                              │  Vercel Edge (middleware.js)  │
                              └──────────────┬────────────────┘
                                             │
                      ┌──────────────────────┴──────────────────────┐
                      ▼                                             ▼
        ┌───────────────────────────┐                 ┌───────────────────────────┐
        │  Pages Statiques (dist/)  │                 │    API Fastify Serverless │
        └───────────────────────────┘                 └─────────────┬─────────────┘
                                                                    │
                                    ┌───────────────────────────────┼───────────────────────────────┐
                                    ▼                               ▼                               ▼
                      ┌───────────────────────────┐   ┌───────────────────────────┐   ┌───────────────────────────┐
                      │ Base PostgreSQL (pg Pool) │   │ Moteur Distant Piston     │   │ Pool IA (OpenRouter/NIM)  │
                      └───────────────────────────┘   └─────────────┬─────────────┘   └───────────────────────────┘
                                                                    │ Fallback si panne
                                                                    ▼
                                                      ┌───────────────────────────┐
                                                      │  Local Runner (VM / Skulpt│ ⚠️ VULNÉRABILITÉ RCE
                                                      └───────────────────────────┘
```

---

## 2. AUDIT DE SÉCURITÉ DE L'EXÉCUTION DE CODE

### 2.1. L'Évasion de Bac à Sable JavaScript In-Process (`local-runner.js`)
- **Fichier :** `server/services/execution/local-runner.js`, lignes 143-193.
- **Analyse du Mécanisme :**
  Pour exécuter du JavaScript sans coût réseau, le serveur instancie une sandbox via le module standard Node.js `vm` :
  ```javascript
  const sandbox = {
    console: {
      log: (...args) => { stdout += args.map(String).join(' ') + '\n'; },
      error: (...args) => { stderr += args.map(String).join(' ') + '\n'; }
    },
    readline: () => { ... }
  };
  const context = vm.createContext(sandbox);
  script.runInContext(context, { timeout: timeoutMs });
  ```
- **Vulnérabilité Établie (P0) :**
  En JavaScript Node.js, les fonctions déclarées dans le contexte hôte (`console.log`) conservent leur chaîne de prototypes reliée au `Function` constructor du processus Node hôte.
  Un étudiant ou attaquant soumettant le code suivant :
  ```javascript
  const hostFunction = console.log.constructor;
  const hostProcess = hostFunction('return process')();
  console.log('FUITE SECRETS:', hostProcess.env.DATABASE_URL);
  ```
  obtient un accès complet et sans restriction à l'objet `process` du conteneur/serveur Fastify.
- **Impact Opérationnel :**
  - **Exécution de commandes arbitraires (RCE) :** `hostProcess.mainModule.require('child_process').execSync('...')`.
  - **Exfiltration totale des secrets :** Vol de la chaîne de connexion PostgreSQL, de la clé secrète JWT (`JWT_SECRET`) et de la clé secrète de webhook FedaPay (`FEDAPAY_SECRET_KEY`).
- **Comportement du Fallback :**
  Dans `server/services/execution/index.js`, si Piston renvoie une erreur ou est temporairement saturé, le système bascule **automatiquement et silencieusement** sur `localRunner.run(payload)`. De plus, dans `server/routes/exercises.js` (ligne 74), `allowLocal: true` est activé en permanence. La vulnérabilité est donc directement exploitable en production.

### 2.2. Analyse du Moteur Python Skulpt
- **Fichier :** `server/services/execution/local-runner.js`, lignes 59-141.
- Skulpt compile le code Python en JavaScript dans un contexte `vm` isolé. Bien que Skulpt ne donne pas un accès direct aux bibliothèques d'OS (`import os` échoue), son exécution dans le thread principal de Node.js présente un risque de **Déni de Service (DoS)** par boucle infinie CPU si le délai `execLimit` n'interrompt pas proprement l'exécution asynchrone avant saturation des ressources serverless de Vercel.

---

## 3. AUDIT DU CONTRÔLE D'ACCÈS & DE L'AUTHENTIFICATION

### 3.1. Contournement d'Authentification Administrateur (`server/routes/admin.js`)
- **Fichier :** `server/routes/admin.js`, lignes 44-50.
- **Code Vulnérable :**
  ```javascript
  const { username, password } = request.body || {};
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '8h' });
  ```
- **Faiblesse de Conception :**
  1. Si les variables `ADMIN_USERNAME` et `ADMIN_PASSWORD` ne sont pas injectées dans l'environnement du runtime (cas fréquent lors d'un oubli de variable sur Vercel ou dans un environnement de test), les deux variables valent `undefined`.
  2. Une requête POST envoyée avec un corps `{}` entraîne `username = undefined` et `password = undefined`.
  3. L'égalité `undefined === undefined` est vraie : l'attaquant reçoit immédiatement un cookie `admin_token` valide avec les privilèges d'administration globaux.
  4. La comparaison utilise l'opérateur d'égalité stricte `===` sans protection contre les attaques temporelles (timing attacks).

### 3.2. Gestion des Sessions JWT vs Révocation en Base de Données
- **Analyse :**
  - Dans `server/routes/auth.js` (`resolveUser`), l'implémentation est robuste : le JWT est validé puis la session est recherchée dans la table `sessions` (`session.is_valid === true`), et le compte utilisateur est vérifié (`user.is_active === true`). La déconnexion ou la connexion depuis un autre appareil révoque bien la session en base.
  - **Faille dans `server/routes/ai-chat.js` (AUTH-001) :** La route `/api/ai-chat` se contente d'exécuter `jwt.verify(token, JWT_SECRET)` sans interroger la table `sessions`. Un utilisateur banni ou une session révoquée peut donc continuer à consommer des requêtes IA gratuites pendant 30 jours (durée de validité du JWT).

### 3.3. Réinitialisation de Mot de Passe & Fuite en Développement
- **Fichier :** `server/routes/auth.js`, lignes 350-377.
- Le token de réinitialisation est généré avec une entropie de 32 octets aléatoires et stocké haché en SHA-256 (`token_hash`) dans la table `password_reset_tokens` avec une validité de 30 minutes, ce qui constitue une excellente pratique.
- **Attention au paramètre `devResetUrl` :** La condition ligne 372 :
  ```javascript
  const isDev = !process.env.VERCEL_ENV && (process.env.NODE_ENV === 'development' || process.env.SHOW_DEV_RESET_URL === '1');
  ```
  protège la production Vercel. Cependant, si le projet est déployé sur un serveur VPS classique ou Render sans définir expressément `NODE_ENV=production`, l'URL de reset est divulguée en clair dans la réponse JSON, permettant le piratage immédiat de tout compte utilisateur.

---

## 4. DÉFENSE EN PROFONDEUR, EN-TÊTES & RÉSEAU

### 4.1. Désactivation de la Content Security Policy (CSP)
- **Fichier :** `server/app.js`, lignes 37-39.
  ```javascript
  fastify.register(require('@fastify/helmet'), {
    contentSecurityPolicy: false
  });
  ```
- **Impact :** La désactivation de la CSP supprime le dernier rempart contre les attaques XSS. Tout script injecté ou asset externe non sollicité peut être exécuté par le navigateur de l'élève.

### 4.2. Configuration CORS Trop Laxiste
- **Fichier :** `server/app.js`, lignes 24-33.
  ```javascript
  const allowed = [
    /^https?:\/\/localhost(:\d+)?$/,
    /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
    /\.vercel\.app$/,
    /\.onrender\.com$/
  ];
  ```
- **Vulnérabilité (SEC-004) :**
  L'expression rationnelle `/\.vercel\.app$/` valide n'importe quel sous-domaine de `vercel.app`.
  Comme l'option `credentials: true` est activée, un site tiers `scam-project.vercel.app` peut exécuter des requêtes cross-site authentifiées vers l'API de Revi-Mu et récupérer des informations confidentielles de l'utilisateur connecté via `/api/me`.

---

## 5. ANALYSE CRITIQUE DE LA SUITE DE TESTS AUTOMATISÉS

La suite de tests actuelle affiche un résultat flatteur :
- **46 / 46 tests unitaires et d'audit réussis**
- **7 325 / 7 325 tests d'exercices réussis**

### Le Paradoxe de la Fausse Confiance
Pourquoi une suite de tests à 100% de succès n'a-t-elle pas empêché la présence de trois failles critiques P0/P1 ?
1. **Tests Tautologiques sur les Exercices :**
   Les 7 325 tests vérifient uniquement que les solutions de code fournies dans les fichiers d'exercices produisent la sortie attendue. Ils ne testent pas la pertinence pédagogique. Le fait qu'un script Bash de l'exercice de Français `fr-c1-e1` produise `para-verbal : 1/3` est validé à 100%, alors même que l'exercice lui-même est une aberration didactique.
2. **Absence de Tests d'Intégration Base de Données Réelle :**
   Les tests (`accounts.test.js`, `access-control.test.js`) simulent ou mockent la logique sans jamais exécuter les requêtes de `server/db.js` contre une instance PostgreSQL active. Les `ReferenceError` sur `keyId`/`userId` dans `preparation_progress` sont ainsi passées totalement inaperçues.
3. **Absence de Tests Négatifs de Sécurité :**
   Aucun test d'intrusion automatisé ne tentait d'échapper à la sandbox VM de `local-runner.js`, ni de poster un corps vide sur `/api/admin/login` avec des variables d'environnement non initialisées.

---

## 6. RECOMMANDATIONS TECHNIQUES PRIORITAIRES

1. **Élimination de la Sandbox In-Process :** Supprimer `runJavaScript` de `local-runner.js` et confier l'exécution JavaScript exclusivement au moteur conteneurisé Piston.
2. **Durcissement de l'Authentification Admin :** Exiger que `ADMIN_USERNAME` et `ADMIN_PASSWORD` soient définis et non vides, et employer `crypto.timingSafeEqual`.
3. **Correction Immédiate de `server/db.js` :** Aligner tous les paramètres sur `userId`.
4. **Correction du Build PDF :** Retirer `.pdf` de la liste d'exclusion dans `scripts/build.js`.
5. **Restriction CORS :** Verrouiller sur `https://revi-mu.vercel.app` uniquement.
6. **Contrôle Strict du Modèle IA :** Rejeter tout paramètre `model` arbitraire sur `/api/ai-chat`.
