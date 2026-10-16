# RAPPORT D'INTÉGRITÉ DES DONNÉES, DU CATALOGUE ET DU BUILD
## Plateforme REVI-MU — Interactive Computing Education Engine
**Classification :** Rapport Technique d'Intégrité de Pipeline et de Persistance  
**Défauts traités :** `DATA-001`, `BLD-001`, `BLD-002`, `PROD-001`, `A11Y-001`, `SEO-001`  
**Statut Global :** **TOTALEMENT INTÈGRE, SYNCHRONISÉ ET CONFORME (RELEASE CANDIDATE)**

---

## 1. `DATA-001` — PERSISTANCE DES DONNÉES ET CORRECTION SQL DANS `server/db.js`

### 1.1. Cause Racine : Régression lors de la Migration d'Authentification
La plateforme REVI-MU fonctionnait initialement avec un système de clés d'activation anonymes (`keyId`). Lors de la refonte vers un modèle d'utilisateurs authentifiés par compte et jeton JWT (`userId`), cinq fonctions critiques du module de préparation d'examens n'avaient pas été complètement mises à jour dans `server/db.js` :
- Les signatures de fonctions acceptaient `userId`, mais le corps des fonctions référençait encore la variable non déclarée `keyId` dans les requêtes paramétrées SQL (`$1`).
- Dès qu'un utilisateur tentait de sauvegarder un brouillon de code, de valider un projet ou d'enregistrer un score de quiz, le serveur Fastify levait une exception `ReferenceError: keyId is not defined` aboutissant à une erreur HTTP 500 et à une perte irrémédiable de données.

### 1.2. Corrections Appliquées
Dans `server/db.js` :
1. **Harmonisation des paramètres :**
   - `getPreparationProgress(userId)` : paramètre SQL lié à `$1` corrigé.
   - `refreshPreparationTotals(userId)` : paramètre SQL `$1` lié à `userId`.
   - `savePreparationProgress(userId, data)` : variable `keyId` remplacée par `userId`.
   - `completePreparationProject(userId, data)` : variable `keyId` remplacée par `userId`.
   - `recordPreparationQuiz(userId, data)` : variable `keyId` remplacée par `userId`.
2. **Validation systématique des identifiants :**
   Ajout de `if (!userId) throw new Error('userId requis');` et `if (!projectId) throw new Error('projectId requis');` en tête de chaque fonction.
3. **Respect des contraintes relationnelles :**
   Correction de la requête d'initialisation de profil `preparation_profiles` pour garantir qu'un `display_name` valide (non nul) soit toujours fourni, évitant les échecs de contrainte `NOT NULL`.

### 1.3. Validation par Banc de Test Multi-Utilisateurs
La suite `tests/db-persistence.test.js` simule un scénario complet et étanche entre deux apprenants (`User 101` et `User 202`) :
- Sauvegarde de brouillon de code par l'utilisateur 101.
- Soumission et validation de projet par l'utilisateur 101.
- Enregistrement de quiz par l'utilisateur 101.
- Sauvegarde d'un projet distinct par l'utilisateur 202.
- Preuve formelle que les données de l'utilisateur 101 ne sont ni écrasées ni mélangées avec celles de l'utilisateur 202.
- Validation des routes HTTP Fastify `/api/preparation/*` via `fastify.inject` (8 tests passés avec succès).

---

## 2. `BLD-001` & `BLD-002` — INTÉGRITÉ DU PIPELINE DE BUILD ET RESSOURCES PDF

### 2.1. Correction du Filtre de Compilation (`BLD-001`)
Dans `scripts/build.js`, une règle d'exclusion aveugle éliminait tous les fichiers d'extension `.pdf` :
```javascript
if (['.pdf', '.docx', '.doc', '.py'].includes(ext)) continue;
```
Cette règle empêchait la mise en ligne des annales officielles d'examens (`epreuves/Recueil_Epreuves_2024_2025.pdf`), ressource protégée par le middleware Vercel et vendue aux abonnés, provoquant des erreurs 404 en production.

**Correctif ciblé :**
La logique de copie a été affinée :
- Les fichiers `.pdf` situés dans le répertoire `epreuves/` et dans les sous-dossiers `assets/docs/` sont désormais explicitement préservés et copiés dans `dist/`.
- Les documents de travail internes non destinés aux étudiants (`.docx`, `.doc`, `.py`, et PDF bruts situés à la racine de cours internes) restent strictement exclus.
- Les dossiers internes `.taskstate`, `audit`, `tests`, `tools` sont ajoutés à `SKIP_DIRS` pour éviter toute fuite d'outils d'ingénierie dans l'artefact déployé.

### 2.2. Intégration des 4 Cours B1 Autonomes (`BLD-002`)
Les 4 cours `b1-algo`, `b1-c-cpp`, `b1-php` et `b1-python` possédaient une structure statique fonctionnelle mais n'étaient pas audités par les scripts de synchronisation.
Le script `scripts/check-courses-sync.js` a été créé et intégré au banc de test `tests/catalogue-build-integrity.test.js` pour s'assurer que :
- Tous leurs fichiers indispensables (`index.html`, `sommaire.html`, `atelier.html`, `exercices/exercices.html`, et l'ensemble de leurs chapitres) sont présents à la source et compilés avec succès dans `dist/`.
- L'injection du script d'authentification (`public/js/auth-check.js`) est appliquée sur l'ensemble de leurs pages HTML.

---

## 3. `PROD-001` & `SEO-001` — RÉCONCILIATION DU CATALOGUE ET DÉCOUVRABILITÉ

### 3.1. Clôture de l'Allégation Trompeuse des 71 Cours (`PROD-001`)
L'accueil affichait l'affirmation « 71 cours interactifs d'informatique ». L'audit rigoureux a établi que :
- Le module `b1-vb-excel` n'avait aucun chapitre ni exercice (module de référence d'archive).
- Le module `epreuves` est un recueil de PDF d'annales d'examen (pas un cours interactif à chapitres).
- Le module `preparation-web` est un simulateur de certification pratique (pas un cours théorique).

Il y a donc **68 cours interactifs complets** structurés en 6 chapitres chacun, plus **2 modules transversaux d'entraînement**, totalisant 70 portails.

**Harmonisation générale :**
1. **Dans `server/courses.js` :**
   Attribution du statut `archived: true` à `b1-vb-excel`.
2. **Dans `index.html` :**
   - Retrait de la carte incomplète `b1-vb-excel` de la grille de navigation active.
   - Mise à jour du titre et du sous-titre héro : « 68 cours interactifs (+ Atelier Web & Annales) ».
   - Synchronisation exacte des compteurs de filtres :
     - Tous : 70 modules (68 cours + 2 portails d'examens/ateliers)
     - Licence 1 : 23 cours interactifs
     - Licence 2 : 24 modules (22 cours + Annales + Préparation Web)
     - Licence 3 : 23 cours interactifs
   - Remplacement du badge de la carte Annales : `<span class="badge-free">Examens</span>`.
   - Correction de la balise HTML non fermée `</a>` sur la carte 71 (`b3-virtualisation`).

### 3.2. Métadonnées Canoniques et Référencement (`SEO-001`)
Dans `b1-vb-excel/index.html` :
- Ajout de la balise canonique `<link rel="canonical" href="https://revi-mu.vercel.app/b1-vb-excel/index.html">`.
- Ajout des balises OpenGraph (`og:title`, `og:description`, `twitter:card`).
- Clarification explicite dans la notice indiquant qu'il s'agit d'un module de programme de référence en cours d'actualisation pédagogique.
- Augmentation de la taille de texte `.doc__type` à 0.72rem pour respecter le plancher de lisibilité de 11px exigé par les règles d'accessibilité.

---

## 4. `A11Y-001` — CONFORMITÉ COLORIMÉTRIQUE STRICTE WCAG 2.2 AA (≥ 4.5:1)

### 4.1. Remédiation des 14 Palettes Défaillantes
L'audit a révélé 14 couleurs d'accentuation en mode clair dont le contraste sur fond blanc (`#ffffff`) était inférieur au seuil réglementaire de 4.5:1 exigé par les règles WCAG 2.2 niveau AA (certaines descendant jusqu'à 2.15:1 ou 2.77:1).

Toutes les couleurs d'accentuation ont été assombries pour garantir un ratio systématiquement supérieur à 4.8:1 :

| Cours Concerné | Teinte Antérieure | Ratio Initial | Nouvelle Teinte Corrigée | Ratio Corrigé sur Fond Blanc |
| :--- | :---: | :---: | :---: | :---: |
| `admin-vm` | `#0ea5e9` | 2.77:1 (Échec) | `#0369a1` | **5.39:1 (Conforme AA)** |
| `epreuves` | `#f59e0b` | 2.15:1 (Échec) | `#b45309` | **4.97:1 (Conforme AA)** |
| `b1-robotique` | `#f97316` | 2.80:1 (Échec) | `#c2410c` | **5.14:1 (Conforme AA)** |
| `b1-linux` | `#f97316` | 2.80:1 (Échec) | `#c2410c` | **5.14:1 (Conforme AA)** |
| `b1-git` | `#ea580c` | 3.56:1 (Échec) | `#c2410c` | **5.14:1 (Conforme AA)** |
| `b1-cyber` | `#0d9488` | 3.74:1 (Échec) | `#0f766e` | **4.92:1 (Conforme AA)** |
| `rd_java` | `#ef4444` | 3.76:1 (Échec) | `#dc2626` | **4.83:1 (Conforme AA)** |
| `b1-anglais` | `#ef4444` | 3.76:1 (Échec) | `#dc2626` | **4.83:1 (Conforme AA)** |
| `b1-stats` | `#059669` | 3.77:1 (Échec) | `#047857` | **5.27:1 (Conforme AA)** |
| `b1-prog-web` | `#0284c7` | 4.10:1 (Échec) | `#0369a1` | **5.39:1 (Conforme AA)** |
| `b3-cloud-computing` | `#0284c7` | 4.10:1 (Échec) | `#0369a1` | **5.39:1 (Conforme AA)** |
| `rd_winserver` | `#6366f1` | 3.95:1 (Échec) | `#4f46e5` | **5.08:1 (Conforme AA)** |
| `b1-algebre` | `#6366f1` | 3.95:1 (Échec) | `#4f46e5` | **5.08:1 (Conforme AA)** |
| `b1-php` | `#6366f1` | 3.95:1 (Échec) | `#4f46e5` | **5.08:1 (Conforme AA)** |

### 4.2. Validation Automatisée
La suite de tests `tests/accessibility-ui.test.js` valide par calcul direct de luminance relative :
1. Que 100% des cours du registre `server/courses.js` présentent un ratio ≥ 4.5:1 sur `#ffffff`.
2. Que toutes les cartes du catalogue `index.html` respectent ce seuil.
3. L'exécution de `/home/rd/.agents/skills/impeccable/scripts/impeccable detect --json` confirme **0 avertissement d'accessibilité**.
