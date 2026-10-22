# Rapport d'Audit Pédagogique — `b1-python` (Python · B1)

- **Identifiant / Slug** : `b1-python`
- **Niveau académique** : B1 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `python`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : Notions de base d’algorithmique (b1-algo Ch. 1–5)
- **Diagnostic topologique (Phase 1)** : Logique algorithmique (variables, conditions, boucles) supposée acquise → Cycle avec b1-algo
- **Registre de concepts (`audit/registres/b1-python.csv`)** : 472 termes techniques recensés (84 définis avant/à la 1re occurrence, **27 définis après (`D2`)**, **361 jamais définis (`D1/D4/D6`)**, 0 définis dans un autre cours)
- **Score moyen C1–C14** : **22.7 / 42 (54.0 %)**
- **Verdict global** : **À RÉÉCRIRE (54.0 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 2/3 | 2/3 | 2/3 | 2/3 | 1/3 | 2/3 | **1.8/3** |
| **Total** | **Score sur 42 (et %)** | **22/42** (52.4%) | **23/42** (54.8%) | **23/42** (54.8%) | **23/42** (54.8%) | **22/42** (52.4%) | **23/42** (54.8%) | **22.7/42 (54.0%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `B1-PYTHON-001` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre1.html:L188`
- **Extrait (≤ 15 mots)** : « prenom = input("Quel est votre prénom ? ") »
- **Pourquoi un novice bute** : Mélange tutoiement (L44 : objectifs/test de maîtrise) et vouvoiement (L188 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-002` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre1.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-003` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre1.html:L561`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-004` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre2.html:L265`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L47 : objectifs/test de maîtrise) et vouvoiement (L265 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-005` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre2.html:L9`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-006` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre2.html:L527`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-007` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre3.html:L256`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L46 : objectifs/test de maîtrise) et vouvoiement (L256 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-008` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre3.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-009` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre3.html:L547`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-010` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre4.html:L241`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L48 : objectifs/test de maîtrise) et vouvoiement (L241 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-011` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre4.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-012` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre4.html:L504`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre5.html:L262`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L48 : objectifs/test de maîtrise) et vouvoiement (L262 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-014` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-python/chapitres/chapitre5.html:L108`
- **Extrait (≤ 15 mots)** : « print(ligne.strip()) # strip() retire le \n »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-015` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre5.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-016` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre5.html:L539`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-017` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre6.html:L264`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L50 : objectifs/test de maîtrise) et vouvoiement (L264 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-018` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre6.html:L9`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PYTHON-019` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-python/chapitres/chapitre6.html:L543`
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
- **Double palier « Niveau 1 — Intuition » / « Niveau 2 — Technique »** : Permet d'ancrer l'idée en mots simples avec une analogie concrète avant d'introduire le formalisme technique (conforme à `P3` et `P4`).
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `b1-python`

**À RÉÉCRIRE (54.0 % — < 70 %)** — Score moyen : **22.7 / 42 (54.0 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
