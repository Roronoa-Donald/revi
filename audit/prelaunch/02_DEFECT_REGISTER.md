# REGISTRE GÉNÉRAL DES ANOMALIES & DÉFAUTS (DEFECT REGISTER)
## Plateforme REVI-MU — Interactive Computing Education Engine
**Cadre :** Audit Pré-Lancement Exhaustif Fondé sur des Preuves  
**Classification :** P0 (Critique), P1 (Bloquant Lancement), P2 (Majeur), P3 (Mineur)  

---

## 1. TABLEAU RÉCAPITULATIF DES DÉFAUTS

| ID | Sévérité | Catégorie | Titre de l'Anomalie | Fichier(s) Concerné(s) | Statut |
| :--- | :---: | :--- | :--- | :--- | :---: |
| `SEC-001` | **P0** | Sécurité | Évasion de Sandbox VM Node.js & Prise de Contrôle RCE / Fuite Secrets | `server/services/execution/local-runner.js` | Ouvert |
| `SEC-002` | **P0** | Sécurité | Bypass d'Authentification Administrateur si Variables d'Env Indéfinies | `server/routes/admin.js` | Ouvert |
| `DATA-001` | **P1** | Backend | Crash `ReferenceError` sur Toutes les Requêtes de Sauvegarde Preparation | `server/db.js` | Ouvert |
| `BLD-001` | **P1** | Déploiement | Exclusion Systématique des Fichiers PDF au Build Vercel (Erreurs 404) | `scripts/build.js` | Ouvert |
| `PED-001` | **P1** | Pédagogie | 14 Cours Non Informatiques Dénaturés par du Scripting Bash/Python Forcé | `server/exercises/` (14 fichiers) | Ouvert |
| `PROD-001` | **P1** | Intégrité | Allégation Trompeuse : 71 Cours Annoncés vs 68 Réels (1 Fantôme, 2 Non-Cours) | `index.html`, `server/courses.js` | Ouvert |
| `SEC-003` | **P1** | Sécurité | Injection de Modèle Arbitraire et Déni de Portefeuille sur `/api/ai-chat` | `server/routes/ai-chat.js` | Ouvert |
| `SEC-004` | **P2** | Sécurité | Configuration CORS Trop Permissive Autorisant Tout Sous-Domaine Vercel | `server/app.js` | Ouvert |
| `A11Y-001` | **P2** | Accessibilité | 14 Palettes de Cours en Échec de Contraste Réglementaire WCAG 2.2 AA | `server/courses.js` | Ouvert |
| `OPS-001` | **P2** | Sécurité | Content Security Policy (CSP) Désactivée Globalement | `server/app.js` | Ouvert |
| `AUTH-001` | **P2** | Auth | Absence de Vérification de Révocation de Session sur le Chat IA | `server/routes/ai-chat.js` | Ouvert |
| `BLD-002` | **P2** | Architecture | 4 Cours Fondamentaux B1 Isolés du Moteur de Génération de Cours | `scripts/generate-courses.js` | Ouvert |
| `PED-002` | **P2** | Didactique | Effet Workgroup et Jargon Parachuté dans les Modules Non Remédiés | Cours Réseau / Windows | Ouvert |
| `TYPO-001` | **P3** | Qualité | Sauts de Lignes `\n` et Entités Typographiques Mal Échappés | Contenu HTML / Markdown | Ouvert |
| `SEO-001` | **P3** | Découvrabilité | Métadonnées OpenGraph et Liens Canoniques Incohérents | Fichiers `sommaire.html` | Ouvert |

---

## 2. FICHES DÉTAILLÉES DES DÉFAUTS

### `SEC-001` — Évasion de Sandbox VM Node.js & Prise de Contrôle RCE / Fuite Secrets
- **Sévérité :** **P0 — CRITIQUE**
- **Catégorie :** Sécurité de l'Hôte / Exécution de Code
- **Localisation :** `server/services/execution/local-runner.js`, lignes 143-193.
- **Preuve & Reproduction :**
  Le fichier utilise le module Node.js standard `vm` :
  ```javascript
  const script = new vm.Script(code);
  const context = vm.createContext(sandbox);
  script.runInContext(context, { timeout: timeoutMs });
  ```
  La sandbox expose un objet console dont les fonctions sont issues du contexte hôte.
  Un payload JavaScript contenant :
  ```javascript
  const proc = console.log.constructor('return process')();
  console.log('ENV DATABASE:', proc.env.DATABASE_URL);
  ```
  s'exécute avec succès, brise l'isolation et donne accès direct à l'objet `process` Node.js hôte, permettant la lecture de toutes les variables d'environnement (`DATABASE_URL`, `JWT_SECRET`, `FEDAPAY_SECRET_KEY`) et l'exécution de commandes système via `child_process`.
- **Impact Étudiant & Système :** Compromission totale du serveur hôte, fuite de la base de données PostgreSQL complète et des clés de paiement.
- **Cause Racine :** Utilisation erronée du module `vm` natif de Node.js comme s'il s'agissait d'une barrière de sécurité, en contradiction formelle avec la documentation officielle de Node.js (« *The vm module is not a security mechanism. Do not use it to run untrusted code* »).
- **Recommandation :**
  1. Interdire l'exécution locale in-process de code JavaScript arbitraire non fiabilisé.
  2. Dégager systématiquement l'exécution de code serveur vers le moteur externe Piston conteneurisé.
  3. Pour l'évaluation locale, exiger un moteur WASM isolé (QuickJS WASI) sans aucun pont vers le runtime Node hôte.
- **Critères d'Acceptation :** Toute tentative d'accès à `constructor.constructor` lève une exception et ne peut en aucun cas référencer l'objet `process`.
- **Indice de Confiance :** 100% (Reproduit et vérifié expérimentalement).

---

### `SEC-002` — Bypass d'Authentification Admin si Variables d'Environnement Non Définies
- **Sévérité :** **P0 — CRITIQUE**
- **Catégorie :** Authentification & Contrôle d'Accès
- **Localisation :** `server/routes/admin.js`, lignes 44-50.
- **Preuve & Reproduction :**
  ```javascript
  const { username, password } = request.body || {};
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '8h' });
  ```
  Si `ADMIN_USERNAME` et `ADMIN_PASSWORD` ne sont pas définis dans l'environnement (ex. installation fraîche, staging, variable omise sur un runner), `process.env.ADMIN_USERNAME` vaut `undefined`.
  Une requête POST envoyée avec `{}` fournit `username: undefined` et `password: undefined`.
  La condition `undefined === undefined && undefined === undefined` est évaluée à `true`. Le jeton d'administration est émis sans aucun mot de passe.
- **Impact Étudiant & Système :** Prise de contrôle illégitime du tableau de bord administrateur par n'importe quel visiteur, accès aux comptes utilisateurs et révocation des clés.
- **Cause Racine :** Absence de garde-fou validant la présence de credentials définis et non vides avant comparaison, combinée à une égalité stricte sur des valeurs potentiellement `undefined`.
- **Recommandation :**
  1. Vérifier explicitement `if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) return reply.code(503).send(...)`.
  2. Utiliser `crypto.timingSafeEqual` sur des hashs sécurisés pour prévenir les attaques temporelles.
- **Critères d'Acceptation :** Une requête sans identifiants ou exécutée sans variables d'environnement configurées renvoie immédiatement une erreur 401 ou 503, sans émettre de cookie `admin_token`.
- **Indice de Confiance :** 100%.

---

### `DATA-001` — Crash `ReferenceError` sur les Requêtes de Sauvegarde Preparation Web
- **Sévérité :** **P1 — HAUT / BLOQUANT**
- **Catégorie :** Backend & Persistance Base de Données
- **Localisation :** `server/db.js`, lignes 261, 283, 304, 337, 374.
- **Preuve & Reproduction :**
  Dans `server/db.js` :
  - Ligne 261 : `async function getPreparationProgress(keyId)` appelle `[userId, PREPARATION_CURRICULUM_VERSION]` (ligne 279) -> `userId` n'existe pas dans le scope.
  - Ligne 283 : `async function refreshPreparationTotals(userId)` appelle `[keyId, ...]` (ligne 300) -> `keyId` n'existe pas dans le scope.
  - Ligne 304 : `async function savePreparationProgress(userId, data = {})` injecte `keyId` (ligne 323) -> `keyId` n'existe pas.
  - Ligne 337 : `async function completePreparationProject(userId, data = {})` injecte `keyId` (ligne 359).
  - Ligne 374 : `async function recordPreparationQuiz(userId, data = {})` injecte `keyId` (ligne 391).
  Dès qu'un apprenant authentifié valide une étape de code ou un quiz dans Preparation Web, la route appelle `db.savePreparationProgress` ou `db.completePreparationProject` et déclenche un plantage 500 immédiat : `ReferenceError: keyId is not defined`.
- **Impact Étudiant & Système :** Impossibilité totale de sauvegarder la moindre progression dans le module payant Preparation Web.
- **Cause Racine :** Refactoring incomplet lors de la migration du modèle d'authentification par clés d'activation (`keyId`) vers le modèle de comptes utilisateurs (`userId`).
- **Recommandation :** Remplacer systématiquement les occurrences résiduelles de `keyId` par le paramètre `userId` dans les cinq fonctions identifiées.
- **Critères d'Acceptation :** Des tests d'intégration simulant le parcours complet de sauvegarde et de validation renvoient un code HTTP 200 et mettent à jour les tables `preparation_progress` et `preparation_profiles`.
- **Indice de Confiance :** 100% (Constaté par lecture directe du code source).

---

### `BLD-001` — Exclusion Systématique des Fichiers PDF au Build Vercel (Erreurs 404)
- **Sévérité :** **P1 — HAUT / BLOQUANT**
- **Catégorie :** Pipeline de Déploiement & Disponibilité des Contenus
- **Localisation :** `scripts/build.js`, ligne 67.
- **Preuve & Reproduction :**
  La fonction de copie récursive contient la ligne explicite suivante :
  ```javascript
  if (['.pdf', '.docx', '.doc', '.py'].includes(ext)) continue;
  ```
  Lors de l'exécution de `npm run build`, aucun fichier PDF n'est copié dans le répertoire `dist/`.
  Or, la plateforme vend l'accès aux annales officielles d'examens (`/epreuves/Recueil_Epreuves_2024_2025.pdf`) et le middleware Vercel (`middleware.js`) protège spécifiquement les URL se terminant par `.pdf`.
  Une fois l'étudiant abonné et connecté, la requête traverse le middleware et aboutit à une erreur 404 Not Found sur le CDN Vercel.
- **Impact Étudiant & Système :** Les étudiants ayant souscrit un abonnement pour réviser leurs examens découvrent que les documents annoncés n'existent pas sur le serveur de production.
- **Cause Racine :** Règle d'exclusion globale trop agressive conçue pour filtrer les sources de travail volumineuses, appliquée sans exception aux assets pédagogiques légitimes.
- **Recommandation :** Autoriser la copie des PDF situés dans `epreuves/` et dans les sous-dossiers `assets/docs/`.
- **Critères d'Acceptation :** Après compilation `npm run build`, `dist/epreuves/Recueil_Epreuves_2024_2025.pdf` est présent et accessible avec un code HTTP 200 pour un utilisateur autorisé.
- **Indice de Confiance :** 100% (Vérifié par absence de PDF dans `dist/`).

---

### `PED-001` — 14 Cours Non Informatiques Dénaturés par du Scripting Bash/Python Forcé
- **Sévérité :** **P1 — HAUT / BLOQUANT PÉDAGOGIQUE**
- **Catégorie :** Ingénierie Pédagogique & Alignement Constructif
- **Localisation :** `server/exercises/` (fichiers `b1-droit.js`, `b1-anglais.js`, `b1-fr-pro.js`, `b1-bureautique.js`, `droit.js`, `masterclass-apprendre.js`, `uiux.js`, `ingenierie-besoin.js`, `erp-si.js`, `b3-anglais.js`, `b3-agile.js`, `b3-document-technique.js`, `b3-etude-quantitative.js`, `b3-veille.js`).
- **Preuve & Reproduction :**
  Dans `server/exercises/b1-fr-pro.js` (Français professionnel), l'exercice `fr-c1-e1` ("Les trois canaux de Mehrabian") oblige un étudiant de Licence 1 à rédiger un script Bash avec `read -r n`, `for ((i=0; i<n; i++))` et `case "$canal" in` pour catégoriser des mots.
  Dans `server/exercises/b1-anglais.js`, l'étudiant doit parser des chaînes pour détecter des acronymes.
  Dans `server/exercises/uiux.js`, l'étudiant en design doit calculer des ratios en Python.
- **Impact Étudiant & Système :** Décrochage massif des étudiants non programmeurs, sentiment d'incompétence immérité, rupture de l'alignement pédagogique (évaluation d'un savoir-faire étranger à la matière enseignée).
- **Cause Racine :** Monoculture architecturale imposée par un test unitaire rigide (`tests/exercises.test.js` exigeant au moins 3 exercices de code par chapitre pour tous les cours sans distinction disciplinaire).
- **Recommandation :**
  1. Désactiver les modules de code lab pour ces 14 cours non informatiques.
  2. Adapter la suite de tests pour accepter des typologies d'évaluation diversifiées (études de cas, QCM argumentés, analyse textuelle).
- **Critères d'Acceptation :** Les cours de Français, Droit, Anglais et Management n'exigent plus de code Bash ou Python pour valider l'acquisition des compétences.
- **Indice de Confiance :** 100%.

---

### `PROD-001` — Allégation Trompeuse : 71 Cours Annoncés vs 68 Réels
- **Sévérité :** **P1 — HAUT / INTÉGRITÉ PRODUIT**
- **Catégorie :** Conformité Catalogue & Transparence
- **Localisation :** `index.html` (titre, filtres de niveau), `server/courses.js`.
- **Preuve & Reproduction :**
  La page d'accueil affiche publiquement : « 71 cours interactifs d'informatique — Licence 1 (24), Licence 2 (24), Licence 3 (23) ».
  L'inventaire rigoureux révèle :
  1. En Licence 1 : `b1-vb-excel` est un dossier vide ne contenant qu'une page `index.html` statique de 5 Ko, sans aucun chapitre, sans exercices et sans carte sur la page d'accueil.
  2. En Licence 2 : `epreuves` est un dossier d'archives PDF et `preparation-web` est un outil d'entraînement autonome.
  Il n'y a donc que 23 cours en L1, 22 cours en L2, et 23 cours en L3, soit **68 cours interactifs réels**.
- **Impact Étudiant & Système :** Tromperie sur l'offre commerciale et déception des utilisateurs cherchant le cours de Visual Basic / Excel annoncé dans la documentation.
- **Cause Racine :** Gonflement artificiel des compteurs dans les métadonnées pour atteindre le chiffre rond de 71 cours sans avoir implémenté le contenu de `b1-vb-excel`.
- **Recommandation :**
  - Option A : Rédiger et intégrer les 6 chapitres complets du cours `b1-vb-excel`.
  - Option B : Corriger la communication publique : « 68 cours interactifs + Recueil d'épreuves + Atelier de préparation web ».
- **Critères d'Acceptation :** Correspondance exacte (1:1) entre les chiffres annoncés sur la page d'accueil et le nombre de cours interactifs effectivement jouables.
- **Indice de Confiance :** 100%.

---

### `SEC-003` — Injection de Modèle Arbitraire et Risque Financier sur `/api/ai-chat`
- **Sévérité :** **P1 — HAUT / SÉCURITÉ FINANCIÈRE**
- **Catégorie :** Protection des Ressources & API Abus
- **Localisation :** `server/routes/ai-chat.js`, ligne 47 ; `server/services/ai-pool/index.js`, ligne 470.
- **Preuve & Reproduction :**
  L'endpoint `/api/ai-chat` accepte un champ `model` directement transmis par le client dans le corps JSON :
  ```javascript
  const { messages, model, max_tokens, temperature, stream } = request.body || {};
  ...
  aiPool.chatCompletion({ messages: safeMessages, model, ... });
  ```
  Le service `aiPool` transmet ce modèle tel quel au fournisseur amont (OpenRouter) :
  `let model = options.model || defaultModelForTask;`
  Un utilisateur connecté peut spécifier des modèles ultra-onéreux (ex. `anthropic/claude-3.5-sonnet`, `openai/o3-mini`, `openai/gpt-4o`) et consommer l'intégralité des crédits OpenRouter de la plateforme en quelques requêtes automatisées.
- **Impact Étudiant & Système :** Épuisement des crédits API de production, coupure du service d'assistance IA pour tous les étudiants réguliers.
- **Cause Racine :** Absence de liste blanche stricte (allowlist) validant les identifiants de modèles acceptés côté serveur.
- **Recommandation :** Valider le modèle contre une constante immuable autorisée (ex. uniquement `deepseek/deepseek-chat`) ou forcer le modèle défini par la configuration administrateur en ignorant le champ client.
- **Critères d'Acceptation :** Toute valeur de `model` non autorisée est rejetée ou écrasée par le modèle système par défaut.
- **Indice de Confiance :** 100%.

---

### `SEC-004` — Politique CORS Trop Permissive Autorisant Tout Sous-Domaine Vercel
- **Sévérité :** **P2 — MOYEN**
- **Catégorie :** Sécurité Web & Cloisonnement
- **Localisation :** `server/app.js`, lignes 27-32.
- **Preuve :**
  ```javascript
  const allowed = [
    /^https?:\/\/localhost(:\d+)?$/,
    /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
    /\.vercel\.app$/,
    /\.onrender\.com$/
  ];
  ```
  L'expression rationnelle `/\.vercel\.app$/` valide n'importe quel domaine se terminant par `.vercel.app`.
  Étant donné que `credentials: true` est activé, n'importe quel tiers déployant un site malveillant sur Vercel (ex. `attacker-site.vercel.app`) peut exécuter des requêtes cross-origin authentifiées vers l'API de Revi-Mu avec les cookies de l'utilisateur.
- **Recommandation :** Restreindre strictement le CORS à `https://revi-mu.vercel.app` et aux sous-domaines de prévisualisation officiels du projet.
- **Indice de Confiance :** 100%.

---

### `A11Y-001` — 14 Palettes de Cours en Échec de Contraste Réglementaire WCAG 2.2 AA
- **Sévérité :** **P2 — MOYEN / ACCESSIBILITÉ**
- **Catégorie :** Accessibilité & Design Inclusif
- **Localisation :** `server/courses.js`, objets de configuration de cours.
- **Preuve :**
  L'analyse colorimétrique formelle des couleurs d'accent utilisées en mode clair sur fond blanc (`#ffffff`) révèle 14 échecs sous le seuil minimal de 4.5:1 pour le texte normal :
  - `admin-vm` : `#0ea5e9` -> Ratio 2.77:1 (Échec critique)
  - `b1-robotique` & `b1-linux` : `#f97316` -> Ratio 2.80:1 (Échec critique)
  - `epreuves` : `#f59e0b` -> Ratio 2.15:1 (Échec critique)
  - `rd_java` & `b1-anglais` : `#ef4444` -> Ratio 3.76:1
  - `b1-cyber` : `#0d9488` -> Ratio 3.74:1
  - `b1-git` : `#ea580c` -> Ratio 3.56:1
  - `b1-stats` : `#059669` -> Ratio 3.77:1
  - `b1-prog-web` & `b3-cloud-computing` : `#0284c7` -> Ratio 4.10:1
- **Recommandation :** Assombrir systématiquement les teintes d'accentuation en mode clair pour garantir un ratio supérieur ou égal à 4.6:1 (ex. remplacer `#0ea5e9` par `#0284c7` ou `#0369a1`).
- **Indice de Confiance :** 100%.

---

### `OPS-001` — Content Security Policy (CSP) Désactivée Globalement
- **Sévérité :** **P2 — MOYEN / SÉCURITÉ**
- **Catégorie :** En-têtes HTTP & Durcissement
- **Localisation :** `server/app.js`, lignes 37-39.
- **Preuve :**
  ```javascript
  fastify.register(require('@fastify/helmet'), {
    contentSecurityPolicy: false
  });
  ```
  La désactivation intégrale de la politique de sécurité de contenu prive les navigateurs de toute protection contre les injections de scripts tiers (XSS) ou le chargement de ressources malveillantes.
- **Recommandation :** Mettre en place une CSP stricte autorisant les scripts locaux avec hachages ou nonces et restreignant les connexions d'API.
- **Indice de Confiance :** 100%.

---

### `AUTH-001` — Absence de Vérification de Révocation de Session sur le Chat IA
- **Sévérité :** **P2 — MOYEN**
- **Catégorie :** Gestion des Sessions
- **Localisation :** `server/routes/ai-chat.js`, lignes 21-30.
- **Preuve :**
  La route vérifie uniquement la validité cryptographique du JWT via `jwt.verify(token, JWT_SECRET)` sans interroger la base de données.
  Si un administrateur révoque une session utilisateur ou désactive un compte fraudeur, le jeton JWT reste utilisable sur `/api/ai-chat` jusqu'à son expiration (jusqu'à 30 jours).
- **Recommandation :** Aligner la vérification sur `resolveUser(request)` qui valide `session.is_valid` et `user.is_active` en base de données.
- **Indice de Confiance :** 100%.

---

### `BLD-002` — 4 Cours Fondamentaux B1 Isolés du Moteur de Génération de Cours
- **Sévérité :** **P2 — MOYEN / DETTE TECHNIQUE**
- **Catégorie :** Cohérence Architecturale
- **Localisation :** `server/content/`, `scripts/generate-courses.js`.
- **Preuve :**
  Les cours `b1-algo`, `b1-c-cpp`, `b1-php` et `b1-python` ne possèdent aucun fichier source dans `server/content/*.js`.
  Ils sont maintenus sous forme de fichiers HTML statiques bruts dans leurs répertoires respectifs.
  Par conséquent, toute mise à jour du kit de composants, du système d'aide ou du design system opérée par `generate-courses.js` ignore silencieusement ces quatre cours clés de première année.
- **Recommandation :** Modéliser et intégrer ces 4 cours dans `server/content/` pour unifier l'ensemble du catalogue sous un moteur de rendu unique.
- **Indice de Confiance :** 100%.
