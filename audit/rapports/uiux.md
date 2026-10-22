# Rapport d'Audit Pédagogique — `uiux` (UI/UX Design · B2)

- **Identifiant / Slug** : `uiux`
- **Niveau académique** : B2 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-prog-web (Ch. 2–5 HTML/CSS/Responsive)
- **Diagnostic topologique (Phase 1)** : HTML sémantique, CSS Flexbox/Grid, media queries, contraste couleurs
- **Registre de concepts (`audit/registres/uiux.csv`)** : 353 termes techniques recensés (105 définis avant/à la 1re occurrence, **4 définis après (`D2`)**, **243 jamais définis (`D1/D4/D6`)**, 1 définis dans un autre cours)
- **Score moyen C1–C14** : **17.8 / 42 (42.4 %)**
- **Verdict global** : **À RÉÉCRIRE (42.4 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **Total** | **Score sur 42 (et %)** | **17/42** (40.5%) | **18/42** (42.9%) | **18/42** (42.9%) | **18/42** (42.9%) | **18/42** (42.9%) | **18/42** (42.9%) | **17.8/42 (42.4%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `UIUX-001` — D10 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « Une startup FinTech lance sa nouvelle application d’épargne automatisée. Bien que l’interface visuelle soit élégante… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (117 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-002` — D13 (Gravité : **S3**)
- **Cours / fichier** : `uiux/chapitres/chapitre1.html:L105`
- **Extrait (≤ 15 mots)** : « L’analogie de l’iceberg : L’UI représente la partie émergée visible de l’iceberg (formes, polices, couleurs).… »
- **Pourquoi un novice bute** : Style emphatique (« cinématique ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « cinématique » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-003` — D13 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre1.html:L154`
- **Extrait (≤ 15 mots)** : « La Loi de Jakob (Jakob’s Law) : Formulée par Jakob Nielsen, elle énonce que :… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L154 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-004` — D15 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-005` — D15 (Gravité : **S1**)
- **Cours / fichier** : `uiux/chapitres/chapitre1.html:L519`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la distinction UI/UX, les 4 phases du Double Diamant et… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-006` — D8 (Gravité : **S1**)
- **Cours / fichier** : `uiux/chapitres/chapitre1.html:L162`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ux2-c1-e1) — Classificateur de livrables et activités UI vs UX »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-007` — D8 (Gravité : **S1**)
- **Cours / fichier** : `uiux/chapitres/chapitre1.html:L351`
- **Extrait (≤ 15 mots)** : « Pour chaque ligne, afficher :<br> »
- **Pourquoi un novice bute** : Consigne d’entrée/sortie de programme résiduelle dans une grille d’analyse alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-008` — D10 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Une plateforme de réservation de voyages en ligne constate un décalage cuisant : alors que… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (134 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-009` — D13 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre2.html:L155`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L155 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-010` — D15 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-011` — D15 (Gravité : **S1**)
- **Cours / fichier** : `uiux/chapitres/chapitre2.html:L510`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la structure des Personas, l’Empathy Map et les méthodes de… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-012` — D8 (Gravité : **S1**)
- **Cours / fichier** : `uiux/chapitres/chapitre2.html:L159`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ux2-c2-e1) — Générateur et validateur de Persona »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-013` — D10 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Sur le cockpit de commande d’une centrale électrique numérique, les opérateurs commettent des erreurs répétées… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (129 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-014` — D13 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre3.html:L195`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L195 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-015` — D15 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-016` — D15 (Gravité : **S1**)
- **Cours / fichier** : `uiux/chapitres/chapitre3.html:L535`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la loi de Fitts, la loi de Hick et la… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-017` — D8 (Gravité : **S1**)
- **Cours / fichier** : `uiux/chapitres/chapitre3.html:L199`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ux2-c3-e1) — Calculateur d’indice de difficulté (Loi de Fitts) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-018` — D8 (Gravité : **S1**)
- **Cours / fichier** : `uiux/chapitres/chapitre3.html:L237`
- **Extrait (≤ 15 mots)** : « Pour chaque ligne, afficher :<br> »
- **Pourquoi un novice bute** : Consigne d’entrée/sortie de programme résiduelle dans une grille d’analyse alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-019` — D10 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre4.html:L66`
- **Extrait (≤ 15 mots)** : « Une entreprise technologique en forte croissance voit son produit se fragmenter : au fil des… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (125 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-020` — D13 (Gravité : **S3**)
- **Cours / fichier** : `uiux/chapitres/chapitre4.html:L116`
- **Extrait (≤ 15 mots)** : « Simuler l’expérience dynamique et tester la cinématique avec les utilisateurs. »
- **Pourquoi un novice bute** : Style emphatique (« cinématique ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « cinématique » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-021` — D13 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre4.html:L158`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L158 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-022` — D15 (Gravité : **S2**)
- **Cours / fichier** : `uiux/chapitres/chapitre4.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-023` — D15 (Gravité : **S1**)
- **Cours / fichier** : `uiux/chapitres/chapitre4.html:L514`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la grille 8pt, les niveaux de fidélité et la hiérarchie… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UIUX-024` — D8 (Gravité : **S1**)
- **Cours / fichier** : `uiux/chapitres/chapitre4.html:L162`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ux2-c4-e1) — Validateur de dimensions sur Grille 8pt »
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
- **Simulateur d'examen / Examens blancs (`chapitres/simulateur-examen.html`)** : Chronomètre interactif et corrigés repliables `<details>` fonctionnels.
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `uiux`

**À RÉÉCRIRE (42.4 % — < 70 %)** — Score moyen : **17.8 / 42 (42.4 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
