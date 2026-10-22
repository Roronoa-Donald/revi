# Rapport d'Audit Pédagogique — `admin-vm` (Administration des Machines Virtuelles · B2)

- **Identifiant / Slug** : `admin-vm`
- **Niveau académique** : B2 (6 chapitres)
- **Fichiers lus** : **14 / 14 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `powershell`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-virtualisation, b1-reseaux, b1-linux
- **Diagnostic topologique (Phase 1)** : Exercices en PowerShell non enseigné ; omet vMotion et Thin Provisioning pourtant à l’examen B2 !
- **Registre de concepts (`audit/registres/admin-vm.csv`)** : 227 termes techniques recensés (129 définis avant/à la 1re occurrence, **13 définis après (`D2`)**, **84 jamais définis (`D1/D4/D6`)**, 1 définis dans un autre cours)
- **Score moyen C1–C14** : **20.8 / 42 (49.5 %)**
- **Verdict global** : **À RÉÉCRIRE (49.5 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **Total** | **Score sur 42 (et %)** | **20/42** (47.6%) | **21/42** (50.0%) | **21/42** (50.0%) | **21/42** (50.0%) | **21/42** (50.0%) | **21/42** (50.0%) | **20.8/42 (49.5%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `ADMIN-VM-001` — D13 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre1.html:L129`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L129 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-002` — D15 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-003` — D8 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre1.html:L378`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-004` — D13 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre2.html:L131`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L131 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-005` — D15 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-006` — D8 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre2.html:L380`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-007` — D13 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre3.html:L129`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L129 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-008` — D15 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-009` — D8 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre3.html:L380`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-010` — D13 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre4.html:L128`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L128 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-011` — D15 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre4.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-012` — D8 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre4.html:L374`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre5.html:L134`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L134 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-014` — D15 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre5.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-015` — D8 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre5.html:L382`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-016` — D13 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre6.html:L125`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L125 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-017` — D15 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre6.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ADMIN-VM-018` — D8 (Gravité : **S2**)
- **Cours / fichier** : `admin-vm/chapitres/chapitre6.html:L375`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

## 3. Contre-Lecture Indépendante — Second Lecteur Novice (Section 5 & Annexe A)

- **Périmètre de contre-lecture** : Chapitre 1 public (`chapitres/chapitre1.html`) ainsi que tous les chapitres présentant au moins un critère $\le 1/3$ : **Chapitres 1, 2, 3, 4, 5, 6**.
- **Synthèse du second lecteur novice** : Le lecteur bute principalement sur l'absence de rappel des prérequis en ouverture de chapitre (`C3`), l'introduction de termes techniques ou d'acronymes dans la mise en situation avant leur définition (`D2`/`D4`), et le saut de difficulté entre les exemples du cours et l’écriture autonome du programme complet (`P5` PRIMM).

## 4. Audit des Ressources Transverses (Phase 4)

- **Flashcards (`chapitres/cartes.html`)** : Présentes. Une notion par carte respectée, mais nombre de cartes par module souvent inférieur aux « 8 notions à connaître absolument » listées en fin de chapitre.
- **Mémo / Formules (`chapitres/formules.html`)** : Présent. Synthèse dense utile en révision, mais introduit parfois des syntaxes ou options CLI non détaillées dans le corps des chapitres (`D1`/`D13`).
- **Catalogue d'exercices (`exercices/exercices.html`) & Atelier (`atelier.html`)** : Exécution réelle opérationnelle ; gagnerait à proposer un palier intermédiaire de code à modifier (PRIMM) avant l’écriture complète.
- **Simulateur d'examen / Examens blancs (`chapitres/simulateur-examen.html`)** : Chronomètre interactif et corrigés repliables `<details>` fonctionnels.
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `admin-vm`

**À RÉÉCRIRE (49.5 % — < 70 %)** — Score moyen : **20.8 / 42 (49.5 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
