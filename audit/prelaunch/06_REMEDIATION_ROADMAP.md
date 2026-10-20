# FEUILLE DE ROUTE DE REMÉDIATION PRIORISÉE (REMEDIATION ROADMAP)
## Plateforme REVI-MU — Interactive Computing Education Engine
**Objectif :** Plan d'Action Structuré pour Atteindre le Statut « GO » de Lancement  
**Méthodologie :** Découpage en 5 Phases Séquentielles avec Critères de Validation Formels  

---

## 1. VUE D'ENSEMBLE DU PLAN DE REMÉDIATION

```
┌────────────────────────────────────────────────────────────────────────┐
│                   PHASE 1 : BLOQUANTS CRITIQUES DE SÉCURITÉ & PERSISTANCE (P0/P1)     │
│                   Délai estimé : 1 jour | Condition sine qua non de publication       │
├────────────────────────────────────────────────────────────────────────┤
│                   PHASE 2 : INTÉGRITÉ DU CATALOGUE & LIVRAISON DU CONTENU (P1)        │
│                   Délai estimé : 2 jours | Rétablissement des annales et vérité offre │
├────────────────────────────────────────────────────────────────────────┤
│                   PHASE 3 : ALIGNEMENT PÉDAGOGIQUE DES 14 COURS DÉNATURÉS (P1/P2)     │
│                   Délai estimé : 3 jours | Suppression code forcé & études de cas     │
├────────────────────────────────────────────────────────────────────────┤
│                   PHASE 4 : ACCESSIBILITÉ WCAG 2.2 AA & SÉCURISATION RÉSEAU (P2)      │
│                   Délai estimé : 2 jours | Contraste thèmes, CSP, CORS, modèle IA     │
├────────────────────────────────────────────────────────────────────────┤
│                   PHASE 5 : POST-LANCEMENT & INDUSTRIALISATION CONTINUE (P3)           │
│                   Délai estimé : Continu | Automatisation tests BD, SEO, monitoring   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## PHASE 1 : BLOQUANTS CRITIQUES DE SÉCURITÉ & PERSISTANCE (P0 / P1)
*Ces correctifs doivent être appliqués et validés avant toute ouverture de trafic public.*

### Tâche 1.1 — Neutraliser la Faille RCE par Évasion de Sandbox Node `vm` (`SEC-001`)
- **Fichiers impactés :** `server/services/execution/local-runner.js`, `server/services/execution/index.js`, `server/routes/exercises.js`.
- **Action corrective :**
  1. Supprimer la fonction d'exécution JavaScript locale in-process `runJavaScript` dans `local-runner.js`.
  2. Router l'ensemble des exécutions JavaScript et langages compilés vers le serveur Piston isolé par conteneur Docker.
  3. Dans `server/services/execution/index.js`, désactiver le repli local automatique sur le JavaScript non audité.
- **Charge estimée :** 2 heures.
- **Critère de validation :** La soumission du payload `console.log.constructor('return process')()` via `/api/execute` ou `/api/exercise/submit` est rejetée ou exécutée dans un conteneur externe sans accès aux variables d'environnement de l'hôte Node.js.

### Tâche 1.2 — Verrouiller l'Authentification Administrateur (`SEC-002`)
- **Fichier impacté :** `server/routes/admin.js`.
- **Action corrective :**
  1. Ajouter un contrôle strict préalable :
     ```javascript
     if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_USERNAME.trim()) {
       return reply.code(503).send({ success: false, message: 'Administration désactivée : variables non configurées.' });
     }
     ```
  2. Comparer les chaînes via hachage sécurisé et `crypto.timingSafeEqual`.
- **Charge estimée :** 1 heure.
- **Critère de validation :** L'envoi d'une requête POST `{}` sur `/api/admin/login` avec ou sans variables d'environnement définies renvoie une erreur 401 ou 503 sans jamais émettre de cookie `admin_token`.

### Tâche 1.3 — Corriger les Variables Non Définies dans `server/db.js` (`DATA-001`)
- **Fichier impacté :** `server/db.js`, lignes 261, 283, 304, 337, 374.
- **Action corrective :**
  Remplacer toutes les références résiduelles à `keyId` par le paramètre officiel `userId` :
  - L. 261 : `async function getPreparationProgress(userId)`
  - L. 300 : `[userId, PREPARATION_CURRICULUM_VERSION]`
  - L. 323 : `[userId, projectId, ...]`
  - L. 359 : `[userId, projectId, ...]`
  - L. 391 : `[userId, projectId, ...]`
- **Charge estimée :** 1 heure.
- **Critère de validation :** Un scénario de test automatisé simule l'authentification d'un utilisateur et exécute avec succès `POST /api/preparation/validate` et `POST /api/preparation/quiz` sans déclencher de `ReferenceError`.

---

## PHASE 2 : INTÉGRITÉ DU CATALOGUE & LIVRAISON DU CONTENU (P1)

### Tâche 2.1 — Rétablir la Livraison des Annales d'Examens PDF (`BLD-001`)
- **Fichier impacté :** `scripts/build.js`, ligne 67.
- **Action corrective :**
  Modifier la condition de filtrage pour autoriser explicitement la copie des fichiers `.pdf` situés dans le répertoire `epreuves/` et dans `assets/docs/`.
- **Charge estimée :** 1 heure.
- **Critère de validation :** Après `npm run build`, `dist/epreuves/Recueil_Epreuves_2024_2025.pdf` est présent dans le dossier de distribution et accessible via requête HTTP.

### Tâche 2.2 — Rectifier les Chiffres Publics du Catalogue (`PROD-001`)
- **Fichiers impactés :** `index.html`, `server/courses.js`, `server/routes/auth.js`.
- **Action corrective :**
  1. Aligner la communication publique sur la réalité constatée : afficher « 68 cours interactifs d'informatique — Licence 1 (23), Licence 2 (22), Licence 3 (23) + Annales d'examens + Atelier Web ».
  2. Documenter expressément le statut de `b1-vb-excel` (marqué comme « En cours de refonte » ou retiré du registre canonique).
- **Charge estimée :** 2 heures.
- **Critère de validation :** Le nombre de cours affiché sur la page d'accueil correspond exactement au nombre de cours interactifs cliquables et fonctionnels.

---

## PHASE 3 : ALIGNEMENT PÉDAGOGIQUE DES 14 COURS DÉNATURÉS (P1 / P2)

### Tâche 3.1 — Supprimer les Ateliers de Code Bash/Python dans les Matières Non Informatiques (`PED-001`)
- **Fichiers impactés :**
  - B1 : `b1-droit.js`, `b1-anglais.js`, `b1-fr-pro.js`, `b1-bureautique.js`
  - B2 : `droit.js`, `masterclass-apprendre.js`, `uiux.js`, `ingenierie-besoin.js`, `erp-si.js`
  - B3 : `b3-anglais.js`, `b3-agile.js`, `b3-document-technique.js`, `b3-etude-quantitative.js`, `b3-veille.js`
  - Configuration : `server/exercises/course-config.js`
  - Tests : `tests/exercises.test.js`
- **Action corrective :**
  1. Retirer ces 14 cours de la liste `server/exercises/course-config.js` (cours avec code lab obligatoire).
  2. Adapter `tests/exercises.test.js` pour n'exiger des code labs que pour les cours de programmation et d'administration système réels.
  3. Mettre à jour les pages HTML de ces cours pour remplacer l'onglet « Atelier de code » par des études de cas guidées, des exercices rédactionnels ou des QCM d'analyse conceptuelle.
- **Charge estimée :** 3 jours.
- **Critère de validation :** Un étudiant apprenant le Français ou le Droit n'est plus confronté à des scripts Bash avec `read -r` et `case "$canal" in` pour valider ses connaissances.

---

## PHASE 4 : ACCESSIBILITÉ WCAG 2.2 AA & SÉCURISATION RÉSEAU (P2)

### Tâche 4.1 — Corriger le Contraste des 14 Palettes de Cours (`A11Y-001`)
- **Fichier impacté :** `server/courses.js`, `scripts/sync-courses.js`.
- **Action corrective :**
  Assombrir les couleurs d'accent utilisées en mode clair pour atteindre un ratio minimal de 4.5:1 sur fond blanc :
  - `admin-vm` : remplacer `#0ea5e9` par `#0284c7` (4.6:1)
  - `b1-robotique` & `b1-linux` : remplacer `#f97316` par `#c2410c` (4.7:1)
  - `epreuves` : remplacer `#f59e0b` par `#b45309` (4.6:1)
  - `rd_java` & `b1-anglais` : remplacer `#ef4444` par `#dc2626` (4.6:1)
  - `b1-cyber` : remplacer `#0d9488` par `#0f766e` (4.8:1)
  - `b1-git` : remplacer `#ea580c` par `#c2410c` (4.7:1)
  - Exécuter `node scripts/sync-courses.js` pour propager dans `middleware.js` et les styles clients.
- **Charge estimée :** 3 heures.
- **Critère de validation :** Le script d'audit colorimétrique ne renvoie aucun échec sous le ratio 4.5:1.

### Tâche 4.2 — Verrouiller le CORS et le Contrôle de Modèle IA (`SEC-003`, `SEC-004`)
- **Fichiers impactés :** `server/app.js`, `server/routes/ai-chat.js`.
- **Action corrective :**
  1. Remplacer `/\.vercel\.app$/` par une vérification stricte du domaine de production `https://revi-mu.vercel.app` et des origines autorisées du projet.
  2. Dans `server/routes/ai-chat.js`, ignorer le paramètre `model` transmis par le client et forcer le modèle par défaut configuré par l'administrateur.
  3. Ajouter la vérification `session.is_valid` et `user.is_active` sur la route du chat IA.
- **Charge estimée :** 3 heures.
- **Critère de validation :** Une requête cross-origin depuis un domaine Vercel arbitraire est rejetée par les en-têtes CORS.

---

## PHASE 5 : POST-LANCEMENT & INDUSTRIALISATION CONTINUE (P3)

### Tâche 5.1 — Rapatrier les 4 Cours B1 Dissidents sous `server/content/` (`BLD-002`)
- Modéliser `b1-algo`, `b1-c-cpp`, `b1-php` et `b1-python` dans `server/content/` pour que les 68 cours interactifs soient compilés par le même générateur standardisé.

### Tâche 5.2 — Tests d'Intégration Conteneurisés
- Mettre en place un conteneur PostgreSQL éphémère dans la suite CI GitHub Actions / local pour exécuter systématiquement toutes les requêtes SQL de `server/db.js` avant tout commit.

### Tâche 5.3 — Surveillance Opérationnelle & Télémétrie
- Configurer une alerte automatique en cas d'erreurs HTTP 5xx répétées et surveiller la consommation des quotas OpenRouter et Piston en temps réel.
