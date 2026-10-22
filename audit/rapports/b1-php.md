# Rapport d'Audit Pédagogique — `b1-php` (PHP · B1)

- **Identifiant / Slug** : `b1-php`
- **Niveau académique** : B1 (8 chapitres)
- **Fichiers lus** : **15 / 15 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `php`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-algo (Ch. 1–6), b1-prog-web (Ch. 1–3 HTTP/HTML), b1-sql (Ch. 1–3 pour Ch. 8 PDO)
- **Diagnostic topologique (Phase 1)** : HTML/formulaires HTTP (utilisés aux Ch. 7–8) et SQL/MySQL (Ch. 8)
- **Registre de concepts (`audit/registres/b1-php.csv`)** : 330 termes techniques recensés (126 définis avant/à la 1re occurrence, **12 définis après (`D2`)**, **190 jamais définis (`D1/D4/D6`)**, 2 définis dans un autre cours)
- **Score moyen C1–C14** : **21.9 / 42 (52.1 %)**
- **Verdict global** : **À RÉÉCRIRE (52.1 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Ch.7 | Ch.8 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.9/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **Total** | **Score sur 42 (et %)** | **21/42** (50.0%) | **22/42** (52.4%) | **22/42** (52.4%) | **22/42** (52.4%) | **22/42** (52.4%) | **22/42** (52.4%) | **22/42** (52.4%) | **22/42** (52.4%) | **21.9/42 (52.1%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `B1-PHP-001` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre1.html:L150`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L52 : objectifs/test de maîtrise) et vouvoiement (L150 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-002` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-php/chapitres/chapitre1.html:L88`
- **Extrait (≤ 15 mots)** : « echo "Premier script\n"; »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-003` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre1.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-004` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre1.html:L380`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-005` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre2.html:L141`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L52 : objectifs/test de maîtrise) et vouvoiement (L141 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-006` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-php/chapitres/chapitre2.html:L110`
- **Extrait (≤ 15 mots)** : « echo number_format($moyenne, 2, '.', '') . "\n"; // 13.67 »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-007` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre2.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-008` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre2.html:L374`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-009` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre3.html:L151`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L54 : objectifs/test de maîtrise) et vouvoiement (L151 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-010` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-php/chapitres/chapitre3.html:L68`
- **Extrait (≤ 15 mots)** : « echo "Admis\n"; »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-011` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre3.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-012` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre3.html:L377`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre4.html:L150`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L55 : objectifs/test de maîtrise) et vouvoiement (L150 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-014` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-php/chapitres/chapitre4.html:L69`
- **Extrait (≤ 15 mots)** : « echo $i . "\n"; »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-015` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre4.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-016` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre4.html:L381`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-017` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre5.html:L158`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L55 : objectifs/test de maîtrise) et vouvoiement (L158 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-018` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-php/chapitres/chapitre5.html:L73`
- **Extrait (≤ 15 mots)** : « echo $notes[1] . "\n"; // 15 »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-019` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre5.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-020` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre5.html:L412`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-021` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre6.html:L167`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L57 : objectifs/test de maîtrise) et vouvoiement (L167 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-022` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-php/chapitres/chapitre6.html:L76`
- **Extrait (≤ 15 mots)** : « echo carte("Alice") . "\n"; // Bienvenue Alice »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-023` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre6.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PHP-024` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-php/chapitres/chapitre6.html:L419`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

## 3. Contre-Lecture Indépendante — Second Lecteur Novice (Section 5 & Annexe A)

- **Périmètre de contre-lecture** : Chapitre 1 public (`chapitres/chapitre1.html`) ainsi que tous les chapitres présentant au moins un critère $\le 1/3$ : **Chapitres 1, 2, 3, 4, 5, 6, 7, 8**.
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

## 6. Verdict Final sur `b1-php`

**À RÉÉCRIRE (52.1 % — < 70 %)** — Score moyen : **21.9 / 42 (52.1 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
