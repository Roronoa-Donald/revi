# Rapport d'Audit Pédagogique — `uml` (UML · B2)

- **Identifiant / Slug** : `uml`
- **Niveau académique** : B2 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-merise (modélisation), rd_java ou php (POO : classes, héritage, interfaces)
- **Diagnostic topologique (Phase 1)** : Requiert la POO (visibilité, héritage, interface, polymorphisme) dès le Ch. 3
- **Registre de concepts (`audit/registres/uml.csv`)** : 372 termes techniques recensés (118 définis avant/à la 1re occurrence, **5 définis après (`D2`)**, **246 jamais définis (`D1/D4/D6`)**, 3 définis dans un autre cours)
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

### `UML-001` — D13 (Gravité : **S3**)
- **Cours / fichier** : `uml/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « Une équipe d’ingénieurs logiciels conçoit la refonte d’une plateforme bancaire distribuée. Faute d’un langage visuel… »
- **Pourquoi un novice bute** : Style emphatique (« cinématique ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « cinématique » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-002` — D13 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre1.html:L140`
- **Extrait (≤ 15 mots)** : « Le modèle de votre application conçu par l’architecte (ex: classe CompteBancaire , classe Client ). »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L140 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-003` — D15 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-004` — D15 (Gravité : **S1**)
- **Cours / fichier** : `uml/chapitres/chapitre1.html:L513`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la liste des 14 diagrammes, leur classification structurel/comportemental et les… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-005` — D8 (Gravité : **S1**)
- **Cours / fichier** : `uml/chapitres/chapitre1.html:L171`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (um2-c1-e1) — Classificateur des 14 diagrammes UML 2.5 »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-006` — D10 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Lors du lancement d’une application de télémédecine, les équipes métier et les développeurs se heurtent… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (106 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-007` — D13 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre2.html:L158`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L158 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-008` — D15 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-009` — D15 (Gravité : **S1**)
- **Cours / fichier** : `uml/chapitres/chapitre2.html:L510`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la distinction include/extend, le rôle des acteurs et le concept… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-010` — D8 (Gravité : **S1**)
- **Cours / fichier** : `uml/chapitres/chapitre2.html:L162`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (um2-c2-e1) — Validateur de relations <<include>> vs <<extend>> »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-011` — D10 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Lors de la conception du cœur transactionnel d’un système d’information bancaire, des failles d’encapsulation et… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (102 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-012` — D13 (Gravité : **S3**)
- **Cours / fichier** : `uml/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Lors de la conception du cœur transactionnel d’un système d’information bancaire, des failles d’encapsulation et… »
- **Pourquoi un novice bute** : Style emphatique (« infaillible ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « infaillible » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre3.html:L182`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L182 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-014` — D15 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-015` — D15 (Gravité : **S1**)
- **Cours / fichier** : `uml/chapitres/chapitre3.html:L528`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez les symboles de visibilité, les multiplicités et la distinction agrégation… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-016` — D8 (Gravité : **S1**)
- **Cours / fichier** : `uml/chapitres/chapitre3.html:L186`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (um2-c3-e1) — Décodeur de signatures UML (attributs et méthodes) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-017` — D10 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre4.html:L66`
- **Extrait (≤ 15 mots)** : « Au sein d’une architecture microservices de paiement instantané, des clients subissent des blocages inexpliqués :… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (107 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-018` — D13 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre4.html:L158`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L158 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-019` — D15 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre4.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-020` — D15 (Gravité : **S1**)
- **Cours / fichier** : `uml/chapitres/chapitre4.html:L498`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la typologie des flèches (synchrone vs asynchrone) et la syntaxe… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-021` — D8 (Gravité : **S1**)
- **Cours / fichier** : `uml/chapitres/chapitre4.html:L162`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (um2-c4-e1) — Simulateur de trace de diagramme de séquence »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-022` — D10 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre5.html:L66`
- **Extrait (≤ 15 mots)** : « Une chaîne logistique e-commerce souffre de ralentissements massifs et de commandes bloquées à l’entrepôt :… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (118 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-023` — D13 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre5.html:L122`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L122 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `UML-024` — D15 (Gravité : **S2**)
- **Cours / fichier** : `uml/chapitres/chapitre5.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
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

## 6. Verdict Final sur `uml`

**À RÉÉCRIRE (42.4 % — < 70 %)** — Score moyen : **17.8 / 42 (42.4 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
