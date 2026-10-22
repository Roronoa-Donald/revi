# Rapport d'Audit Pédagogique — `b3-github` (Git & GitHub · B3)

- **Identifiant / Slug** : `b3-github`
- **Niveau académique** : B3 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-git (Ch. 1–6), linux (B2)
- **Diagnostic topologique (Phase 1)** : Commandes Git de base, hachage SHA-1, SSH, YAML/Docker pour GitHub Actions (Ch. 5)
- **Registre de concepts (`audit/registres/b3-github.csv`)** : 413 termes techniques recensés (115 définis avant/à la 1re occurrence, **12 définis après (`D2`)**, **286 jamais définis (`D1/D4/D6`)**, 0 définis dans un autre cours)
- **Score moyen C1–C14** : **14.8 / 42 (35.2 %)**
- **Verdict global** : **À RÉÉCRIRE (35.2 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 0/3 | 0/3 | 0/3 | 0/3 | 0/3 | 0/3 | **0.0/3** |
| **Total** | **Score sur 42 (et %)** | **14/42** (33.3%) | **15/42** (35.7%) | **15/42** (35.7%) | **15/42** (35.7%) | **15/42** (35.7%) | **15/42** (35.7%) | **14.8/42 (35.2%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `B3-GITHUB-001` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « Pour la majorité des utilisateurs débutants, Git apparaît comme une boîte noire mystérieuse où s’enchaînent… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (124 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-002` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L188`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L188 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-003` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L143`
- **Extrait (≤ 15 mots)** : « <p>Le hash affiché par Git n’est pas le simple hash du fichier : Git injecte… »
- **Pourquoi un novice bute** : Virgules parasites visibles dans le rendu HTML, causées par un tableau JS concaténé via toString() dans kit.box().
- **Correction minimale proposée** : Joindre les lignes du tableau avec .join("\n") dans server/content et scripts/course-kit.js.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-004` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L203`
- **Extrait (≤ 15 mots)** : « # Données : OBJECT type=commit content=tree a1b2c3d4e5\nauthor Alice\n\nInitial commit »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-005` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-006` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-007` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-008` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L519`
- **Extrait (≤ 15 mots)** : « Difficultés à distinguer blobs et trees ou méconnaissance de la structure interne du répertoire .git.… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-009` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L192`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (gh3-c1-e1) — Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-010` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L225`
- **Extrait (≤ 15 mots)** : « Pour chaque ligne, afficher :<br> »
- **Pourquoi un novice bute** : Consigne d’entrée/sortie de programme résiduelle dans une grille d’analyse alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-011` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b3-github/chapitres/chapitre1.html:L300`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-012` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-github/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Lorsqu’une équipe d’ingénieurs collabore sur un projet d’envergure, la convergence des branches de travail devient… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (105 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-github/chapitres/chapitre2.html:L147`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L147 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-014` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre2.html:L110`
- **Extrait (≤ 15 mots)** : « <p>Depuis Git 2.33, le moteur par défaut est <strong>ORT (Ostensibly Recursive’s Twin)</strong> :</p>,<ul>, <li><strong>Performances décuplées… »
- **Pourquoi un novice bute** : Virgules parasites visibles dans le rendu HTML, causées par un tableau JS concaténé via toString() dans kit.box().
- **Correction minimale proposée** : Joindre les lignes du tableau avec .join("\n") dans server/content et scripts/course-kit.js.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-015` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-github/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-016` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre2.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-017` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre2.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-018` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre2.html:L501`
- **Extrait (≤ 15 mots)** : « Difficultés à identifier les conditions d’un Fast-Forward ou hésitations lors de la résolution de conflits… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-019` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b3-github/chapitres/chapitre2.html:L218`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-020` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre2.html:L151`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (gh3-c2-e1) — Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-021` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-github/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Dans le cycle de vie d’un projet logiciel, l’erreur humaine est inévitable : une commande… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (135 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-022` — D13 (Gravité : **S3**)
- **Cours / fichier** : `b3-github/chapitres/chapitre3.html:L89`
- **Extrait (≤ 15 mots)** : « La syntaxe de navigation temporelle est redoutable : »
- **Pourquoi un novice bute** : Style emphatique (« redoutable ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « redoutable » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-023` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-github/chapitres/chapitre3.html:L157`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L157 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-GITHUB-024` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-github/chapitres/chapitre3.html:L113`
- **Extrait (≤ 15 mots)** : « <p>Git conserve les objets orphelins par défaut pendant un délai de grâce configurable :</p>,<ul>, <li>Les… »
- **Pourquoi un novice bute** : Virgules parasites visibles dans le rendu HTML, causées par un tableau JS concaténé via toString() dans kit.box().
- **Correction minimale proposée** : Joindre les lignes du tableau avec .join("\n") dans server/content et scripts/course-kit.js.
- **Effort** : `XS` | **Dépendances** : `aucune`

## 3. Contre-Lecture Indépendante — Second Lecteur Novice (Section 5 & Annexe A)

- **Périmètre de contre-lecture** : Chapitre 1 public (`chapitres/chapitre1.html`) ainsi que tous les chapitres présentant au moins un critère $\le 1/3$ : **Chapitres 1, 2, 3, 4, 5, 6**.
- **Synthèse du second lecteur novice** : Le lecteur bute principalement sur l'absence de rappel des prérequis en ouverture de chapitre (`C3`), l'introduction de termes techniques ou d'acronymes dans la mise en situation avant leur définition (`D2`/`D4`), et la dissonance entre les consignes résiduelles de code et les grilles statiques `analyse` (`D8`/`D9`).

## 4. Audit des Ressources Transverses (Phase 4)

- **Flashcards (`chapitres/cartes.html`)** : Présentes. Une notion par carte respectée, mais nombre de cartes par module souvent inférieur aux « 8 notions à connaître absolument » listées en fin de chapitre.
- **Mémo / Formules (`chapitres/formules.html`)** : Présent. Synthèse dense utile en révision, mais introduit parfois des syntaxes ou options CLI non détaillées dans le corps des chapitres (`D1`/`D13`).
- **Catalogue d'exercices (`chapitres/exercices.html`) & Atelier (`atelier.html`)** : Dans les cours convertis en `analyse`, le catalogue ou l’atelier conserve des mentions résiduelles de Python/Bash (`D8`) et, pour 11 cours B3, les liens relatifs `chapitres/chapitreN.html` depuis `chapitres/exercices.html` produisent des erreurs 404 (`D15`).
- **Simulateur d'examen / Examens blancs (`chapitres/examens.html`)** : Dans les cours B3 (`examens.html`), les corrigés sont affichés directement en clair sans balise `<details>` et sans chronomètre interactif (`data-timer`), contrairement aux cours B1/B2 (`simulateur-examen.html`).
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `b3-github`

**À RÉÉCRIRE (35.2 % — < 70 %)** — Score moyen : **14.8 / 42 (35.2 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
