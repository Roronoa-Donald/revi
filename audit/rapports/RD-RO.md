# Rapport d'Audit Pédagogique — `RD-RO` (Recherche Opérationnelle · B2)

- **Identifiant / Slug** : `RD-RO`
- **Niveau académique** : B2 (6 chapitres)
- **Fichiers lus** : **15 / 15 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-algebre (Ch. 1–3 matrices, pivot de Gauss)
- **Diagnostic topologique (Phase 1)** : Pivot de Gauss-Jordan, calcul matriciel et théorie des graphes
- **Registre de concepts (`audit/registres/RD-RO.csv`)** : 146 termes techniques recensés (91 définis avant/à la 1re occurrence, **2 définis après (`D2`)**, **53 jamais définis (`D1/D4/D6`)**, 0 définis dans un autre cours)
- **Score moyen C1–C14** : **19.2 / 42 (45.7 %)**
- **Verdict global** : **À RÉÉCRIRE (45.7 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 1/3 | 2/3 | 2/3 | 1/3 | 2/3 | 1/3 | **1.5/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 1/3 | 2/3 | 2/3 | 1/3 | 1/3 | 1/3 | **1.3/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 2/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.2/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 0/3 | 0/3 | 0/3 | 1/3 | 1/3 | 0/3 | **0.3/3** |
| **Total** | **Score sur 42 (et %)** | **18/42** (42.9%) | **20/42** (47.6%) | **20/42** (47.6%) | **19/42** (45.2%) | **20/42** (47.6%) | **18/42** (42.9%) | **19.2/42 (45.7%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `RD-RO-001` — D10 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « Une menuiserie industrielle fabrique des tables et des chaises à partir de bois de chêne… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (109 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-002` — D13 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre1.html:L190`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L190 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-003` — D15 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre1.html:L476`
- **Extrait (≤ 15 mots)** : « Un apport nutritionnel ou un seuil de qualité minimale impose d’apporter au moins une quantité… »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-004` — D15 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-005` — D15 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre1.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-006` — D8 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre1.html:L194`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ro2-c1-e1) — Validation de fonction objectif & positivité »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-007` — D13 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre2.html:L149`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L149 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-008` — D15 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre2.html:L127`
- **Extrait (≤ 15 mots)** : « Si $\Delta \ne 0$, le point d’intersection unique $(x_1, x_2)$ du sommet s’écrit : »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-009` — D15 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-010` — D15 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre2.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-011` — D8 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre2.html:L432`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-012` — D8 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre2.html:L153`
- **Extrait (≤ 15 mots)** : « # Grille de calcul (ro2-c2-e1) — Conversion en forme standard (Écart & Excès) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre3.html:L167`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L167 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-014` — D15 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre3.html:L161`
- **Extrait (≤ 15 mots)** : « Pour chaque autre ligne $i \ne r$ : $L_i \leftarrow L_i - a_{ik} L_r$ (élimination… »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-015` — D15 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-016` — D15 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre3.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-017` — D8 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre3.html:L450`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-018` — D8 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre3.html:L171`
- **Extrait (≤ 15 mots)** : « # Grille de calcul (ro2-c3-e1) — Critère de Dantzig (Choix de la variable entrante) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-019` — D10 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre4.html:L66`
- **Extrait (≤ 15 mots)** : « Lorsque toutes les contraintes sont de type $\le$ avec des seconds membres positifs, les variables… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (97 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-020` — D13 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre4.html:L151`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L151 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-021` — D15 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre4.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-022` — D15 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre4.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-023` — D8 (Gravité : **S2**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre4.html:L435`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `RD-RO-024` — D8 (Gravité : **S1**)
- **Cours / fichier** : `RD-RO/chapitres/chapitre4.html:L155`
- **Extrait (≤ 15 mots)** : « # Grille de calcul (ro2-c4-e1) — Construction du problème Dual canonique »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

## 3. Contre-Lecture Indépendante — Second Lecteur Novice (Section 5 & Annexe A)

- **Périmètre de contre-lecture** : Chapitre 1 public (`chapitres/chapitre1.html`) ainsi que tous les chapitres présentant au moins un critère $\le 1/3$ : **Chapitres 1, 2, 3, 4, 5, 6**.
- **Synthèse du second lecteur novice** : Le lecteur bute principalement sur l'absence de rappel des prérequis en ouverture de chapitre (`C3`), l'introduction de termes techniques ou d'acronymes dans la mise en situation avant leur définition (`D2`/`D4`), et la dissonance entre les consignes résiduelles de code et les grilles statiques `analyse` (`D8`/`D9`).

## 4. Audit des Ressources Transverses (Phase 4)

- **Flashcards (`chapitres/cartes.html`)** : Présentes. Une notion par carte respectée, mais nombre de cartes par module souvent inférieur aux « 8 notions à connaître absolument » listées en fin de chapitre.
- **Mémo / Formules (`chapitres/formules.html`)** : Présent. Synthèse dense utile en révision, mais introduit parfois des syntaxes ou options CLI non détaillées dans le corps des chapitres (`D1`/`D13`).
- **Catalogue d'exercices (`exercices/exercices.html`) & Atelier (`atelier.html`)** : Dans les cours convertis en `analyse`, le catalogue ou l’atelier conserve des mentions résiduelles de Python/Bash (`D8`) et, pour 11 cours B3, les liens relatifs `chapitres/chapitreN.html` depuis `chapitres/exercices.html` produisent des erreurs 404 (`D15`).
- **Simulateur d'examen / Examens blancs (`chapitres/examens.html`)** : Dans les cours B3 (`examens.html`), les corrigés sont affichés directement en clair sans balise `<details>` et sans chronomètre interactif (`data-timer`), contrairement aux cours B1/B2 (`simulateur-examen.html`).
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `RD-RO`

**À RÉÉCRIRE (45.7 % — < 70 %)** — Score moyen : **19.2 / 42 (45.7 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
