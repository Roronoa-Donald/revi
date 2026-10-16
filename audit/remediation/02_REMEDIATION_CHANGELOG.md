# JOURNAL DÉTAILLÉ DES MODIFICATIONS (REMEDIATION CHANGELOG)
## Plateforme REVI-MU — Interactive Computing Education Engine
**Date :** 16 octobre 2026  
**Branche de travail :** `main`  
**Périmètre :** Remédiation complète post-audit (`audit/prelaunch/`)

---

## 1. COMPOSANTS SÉCURITÉ & EXÉCUTION (`SEC-001`, `SEC-002`, `SEC-003`, `SEC-004`, `OPS-001`, `AUTH-001`)

### `server/services/execution/isolated-worker.js` (CRÉATION)
- **Rôle :** Processus enfant éphémère d'isolation d'exécution pour JavaScript, Python et Études de cas.
- **Modifications :**
  - Exécution sous Node.js Permission Model (`--permission --allow-fs-read` restreint strictement aux chemins du worker et de Skulpt).
  - Suppression immédiate de `process.env` dans le processus enfant (`process.env = {}`, gel de l'objet).
  - Neutralisation des APIs réseau globales (`globalThis.fetch = undefined`, `globalThis.WebSocket = undefined`).
  - Contexte VM JavaScript à prototype nul (`Object.create(null)`), sans génération de chaînes ou WebAssembly (`codeGeneration: { strings: false, wasm: false }`).
  - Pont de communication primitif sans accès à `Function.constructor` hôte, encapsulation stricte de `console.log`, `readline`, etc.
  - Plafonnement mémoire à 64 Mo (`--max-old-space-size=64`) et tampon de sortie plafonné à 64 Ko (`MAX_OUTPUT_BYTES = 65536`).
  - Interruption forcée par l'OS (`SIGKILL`) en cas de dépassement de temporisation (`timeoutMs`).

### `server/services/execution/local-runner.js` (MODIFICATION)
- **Rôle :** Orchestration de l'exécution locale sécurisée.
- **Modifications :**
  - Remplacement de l'exécution in-process `vm.createContext` par l'invocation asynchrone du worker isolé via `child_process.spawn(process.execPath, [...])`.
  - Transmission d'un environnement système minimaliste et hermétique : `env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8', HOME: '/tmp' }`.
  - Intégration du moteur d'évaluation analytique `runAnalyse(code, stdin)` supportant les sélecteurs de cas `cas:1`, `cas:2`, `cas:3`, `ligne:N`, `lignes:A-B`, `critere:KEY`.

### `server/services/execution/languages.js` (MODIFICATION)
- **Rôle :** Registre des langages supportés.
- **Modifications :**
  - Ajout du langage `analyse` : `{ id: 'analyse', label: 'Étude de cas', oanor: 'analyse', monaco: 'plaintext', ext: 'txt', sample: '# Grille d\'analyse\n' }`.

### `server/services/execution/index.js` (MODIFICATION)
- **Rôle :** Point d'entrée de la passerelle d'exécution de code.
- **Modifications :**
  - Contrôle du repli local conditionné à `process.env.ALLOW_LOCAL_EXECUTION_FALLBACK !== 'false'`.
  - Garantie que tout appel dirigé vers le runner local bénéficie de l'isolation child-process renforcée.

### `server/routes/admin.js` (MODIFICATION)
- **Rôle :** Authentification et administration de la plateforme.
- **Modifications :**
  - Lecture dynamique des variables d'environnement (`JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`) à chaque requête.
  - Vérification *fail-closed* : si l'un des paramètres est manquant ou vide, renvoi d'une réponse HTTP 503 (`Administration désactivée : identifiants non configurés`).
  - Validation stricte des types (`typeof username === 'string'`, `length > 0`).
  - Comparaison en temps constant via `crypto.timingSafeEqual` sur des condensats SHA-256 (`crypto.createHash('sha256').update(val).digest()`) pour neutraliser les attaques par canal auxiliaire temporel.

### `server/routes/ai-chat.js` (MODIFICATION)
- **Rôle :** API d'assistance pédagogique par intelligence artificielle.
- **Modifications :**
  - Définition d'une liste blanche stricte de modèles clients autorisés (`ALLOWED_CLIENT_MODELS`) :
    - `deepseek/deepseek-chat`
    - `deepseek/deepseek-chat-v3-0324:free`
    - `meta-llama/llama-3.3-70b-instruct:free`
    - `google/gemini-2.0-flash-exp:free`
    - `qwen/qwen-2.5-72b-instruct:free`
  - Tout modèle non autorisé envoyé par le client est ignoré et remplacé par le modèle par défaut configuré côté serveur.
  - Vérification de l'état de la session et du compte utilisateur en base de données (`db.getSessionByJti(decoded.jti)` et `db.getUserById(decoded.userId)`). Rejet immédiat HTTP 401 si la session a été révoquée ou le compte désactivé.

### `server/app.js` (MODIFICATION)
- **Rôle :** Configuration du serveur HTTP Fastify et middlewares de sécurité.
- **Modifications :**
  - Durcissement de la politique CORS : restriction stricte à `localhost`, `127.0.0.1`, `https://revi-mu.vercel.app`, aux sous-domaines de preview légitimes du projet (`/^https:\/\/revi-mu(-[a-z0-9-]+)?\.vercel\.app$/`), `https://revi-mu.onrender.com`, et aux origines configurées dans `process.env.ALLOWED_ORIGINS`.
  - Rejet de tout sous-domaine tiers non affilié.
  - Activation d'une politique de sécurité de contenu (CSP) complète et défensive via `@fastify/helmet` :
    - `defaultSrc: ["'self'"]`
    - `scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "blob:"]` (compatibilité Monaco Editor & Skulpt)
    - `workerSrc: ["'self'", "blob:"]`
    - `styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"]`
    - `fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"]`
    - `imgSrc: ["'self'", "data:", "blob:", "https:"]`
    - `connectSrc: ["'self'", "https://revi-mu.vercel.app", "https://revi-mu.onrender.com", "https://fonts.googleapis.com", "https://fonts.gstatic.com"]`
    - `frameAncestors: ["'self'"]`
    - `objectSrc: ["'none'"]`
    - `baseUri: ["'self'"]`

---

## 2. COMPOSANTS PERSISTANCE & BASE DE DONNÉES (`DATA-001`)

### `server/db.js` (MODIFICATION)
- **Rôle :** Couche d'accès aux données PostgreSQL.
- **Modifications :**
  - Correction des 5 anomalies de portée de variables dans le module de préparation :
    - `getPreparationProgress` : correction du binding paramétrique `[userId, PREPARATION_CURRICULUM_VERSION]`.
    - `refreshPreparationTotals` : passage de `userId` comme premier paramètre SQL `$1`.
    - `savePreparationProgress` : remplacement de la référence résiduelle `keyId` par `userId`.
    - `completePreparationProject` : remplacement de `keyId` par `userId`.
    - `recordPreparationQuiz` : remplacement de `keyId` par `userId`.
  - Ajout de gardes-fous explicites de validation : levée d'erreur immédiate si `userId` ou `projectId` est manquant ou invalide.
  - Correction de l'insertion dans `preparation_profiles` pour garantir le respect de la contrainte `NOT NULL` sur `display_name`.

### `server/routes/preparation.js` (MODIFICATION)
- **Rôle :** Routes d'interaction avec l'atelier de préparation web.
- **Modifications :**
  - Validation renforcée des entrées sur `/api/preparation/progress`, `/api/preparation/validate`, et `/api/preparation/quiz`.
  - Gestion gracieuse des erreurs de persistance avec codes HTTP sémantiques.

---

## 3. COMPOSANTS PIPELINE DE BUILD & INTÉGRITÉ CATALOGUE (`BLD-001`, `BLD-002`, `PROD-001`, `SEO-001`)

### `scripts/build.js` (MODIFICATION)
- **Rôle :** Compilation et préparation du livrable de production `dist/`.
- **Modifications :**
  - Modification du filtre d'exclusion d'extensions : préservation explicite des documents PDF légitimes publiés (`epreuves/Recueil_Epreuves_2024_2025.pdf` et `assets/docs/*.pdf`) qui sont désormais fidèlement copiés vers `dist/`.
  - Maintien de l'exclusion stricte pour les fichiers sources internes de travail (`.docx`, `.doc`, `.py`, et PDF bruts hors dossiers de publication).
  - Ajout des répertoires internes `.taskstate`, `audit`, `tests`, `tools` dans `SKIP_DIRS`.

### `scripts/check-courses-sync.js` (CRÉATION)
- **Rôle :** Outil de contrôle automatisé de la cohérence du catalogue.
- **Modifications :**
  - Vérification de l'intégrité des 4 cours B1 autonomes (`b1-algo`, `b1-c-cpp`, `b1-php`, `b1-python`).
  - Validation du décompte exact des cours interactifs (68 cours complets + 2 modules d'entraînement et d'examen).

### `server/courses.js` (MODIFICATION)
- **Rôle :** Registre central des métadonnées de cours.
- **Modifications :**
  - Marquage de `b1-vb-excel` avec l'attribut `archived: true` pour refléter son statut de module de référence de programme en cours de refonte.
  - Ajustement des 14 couleurs d'accentuation en mode clair pour garantir un ratio de contraste WCAG 2.2 AA ≥ 4.5:1 sur `#ffffff` (ratios réels portés entre 4.83:1 et 6.29:1).

### `index.html` (MODIFICATION)
- **Rôle :** Portail d'accueil et catalogue principal.
- **Modifications :**
  - Retrait de la carte interactive incomplète `b1-vb-excel` de la grille active.
  - Fermeture de la balise orpheline `</a>` sur la carte 71 (`b3-virtualisation`).
  - Rectification de la bannière et des métadonnées descriptives : annonce de « 68 cours interactifs (+ Atelier Web & Annales) » au lieu de 71 cours trompeurs.
  - Synchronisation exacte des compteurs de filtres : Tous (70), B1 (23), B2 (24 dont annales et atelier web), B3 (23).
  - Remplacement du badge de `epreuves/index.html` (« Ch. 1 gratuit » → « Examens »).
  - Mise à jour des variables CSS d'accentuation pour garantir le contraste de toutes les cartes.

### `b1-vb-excel/index.html` (MODIFICATION)
- **Rôle :** Page du module de référence VB Excel.
- **Modifications :**
  - Ajout de la balise canonique `<link rel="canonical" href="https://revi-mu.vercel.app/b1-vb-excel/index.html">`.
  - Ajout des métadonnées OpenGraph (`og:title`, `og:description`, `twitter:card`).
  - Clarification de la notice d'archive et ajustement de la taille de texte typographique pour respecter le plancher de lisibilité de 11px.

---

## 4. COMPOSANTS PÉDAGOGIQUES & ÉVALUATION (`PED-001`, `PED-002`, `TYPO-001`)

### `server/exercises/` (14 COURS CONVERTIS EN MODE ÉTUDE DE CAS)
- **Cours concernés (252 exercices au total) :**
  `b1-droit.js`, `b1-anglais.js`, `b1-fr-pro.js`, `b1-bureautique.js`, `droit/` (6 chapitres), `masterclass-apprendre/` (6 chapitres), `uiux/` (6 chapitres), `ingenierie-besoin/` (6 chapitres), `erp-si/` (6 chapitres), `b3-anglais/` (6 chapitres), `b3-agile/` (6 chapitres), `b3-document-technique/` (6 chapitres), `b3-etude-quantitative/` (6 chapitres), `b3-veille/` (6 chapitres).
- **Modifications :**
  - Remplacement de `language: 'shell'` et `language: 'python'` par `language: 'analyse'`.
  - Élimination intégrale du code Bash (`read -r`, `for ((`, `case "$canal"`, `printf`) et Python (`sys.stdin`, `import sys`).
  - Transformation des consignes (`brief`) en questions d'analyse conceptuelle et juridique appliquées.
  - Structuration des énoncés en grilles d'analyse (`[Cas 1 — ...]`, `[Cas 2 — ...]`, `[Cas 3 — ...]`).
  - Remplacement des solutions de programmation par les synthèses méthodologiques et analytiques exactes.
  - Configuration des tests de correction avec les sélecteurs sémantiques `cas:1`, `cas:2`, `cas:3`.

### `scripts/generate-code-labs.js` & `assets/js/code-lab.js` (MODIFICATION)
- **Rôle :** Génération et moteur interactif des laboratoires d'exercices.
- **Modifications :**
  - Affichage des intitulés disciplinaires « Cas d'exemple » et « Résolution attendue » lorsque `language === 'analyse'` (au lieu des termes informatiques « Entrée du programme » et « Sortie attendue »).
  - Remplacement de l'icône de terminal par l'icône d'étude de cas (`icon('book')`).
  - Titrage de section « 0. Études de cas & applications pratiques » pour les chapitres d'analyse.
  - Intégration du mode éditeur texte clair sans avertissements ni chargement inutile de compilateurs distants.

### `server/content/` (NETTOYAGE PROSE ET DIDACTIQUE)
- **Modifications :**
  - Remplacement des blocs de code Bash dans les espaces ateliers libres des 14 cours non informatiques par des canevas de synthèse analytique.
  - Décompression systématique du jargon non contextualisé (acronymes réseau PAN, LAN, WLAN, MAN, WAN, SAN ; modèle Poste-à-poste vs Client-serveur ; explication de l'historique et des limites des Workgroups Windows).
  - Élimination des fuites de séquences d'échappement `\n` littérales dans la prose HTML.
  - Régénération complète des cours via `node scripts/generate-courses.js` et `node scripts/generate-code-labs.js`.

---

## 5. NOUVELLES SUITES DE TESTS DE NON-RÉGRESSION

1. `tests/security-remediation.test.js` : 11 tests couvrant l'isolation RCE, la sandbox sans secrets, le fail-closed admin, la liste blanche des modèles IA, la révocation de session, le filtrage CORS et la CSP.
2. `tests/db-persistence.test.js` : 8 tests couvrant les bindings SQL, la persistance Preparation Web, l'isolation multi-utilisateurs et la gestion des erreurs.
3. `tests/catalogue-build-integrity.test.js` : 5 tests vérifiant la copie du PDF des annales, l'exclusion des documents sources bruts, l'intégrité des 4 cours B1, et la validité de tous les liens de cartes du portail.
4. `tests/accessibility-ui.test.js` : 5 tests vérifiant la conformité du ratio de contraste WCAG 2.2 AA ≥ 4.5:1 sur l'ensemble du registre et des cartes de cours, la structure du DOM et les métadonnées.
5. `tests/pedagogical-alignment.test.js` : 2 tests garantissant qu'aucun cours non informatique n'exige de Bash ou Python et qu'aucune fuite de code de script n'existe dans les pages servies.
6. `tests/audit-verification.test.js` : 15 tests validant l'absence de QCM undefined, l'absence de fuites `\n`, le rendu Docker multiligne, et les ancrages Ausubéliens didactiques.
