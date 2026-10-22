# Rapport d'Audit Pédagogique — `docker` (Docker · B2)

- **Identifiant / Slug** : `docker`
- **Niveau académique** : B2 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : linux (B2), b3-linux (Ch. 4 namespaces/cgroups !), b1-reseaux
- **Diagnostic topologique (Phase 1)** : Utilise dès Ch. 1 les namespaces et cgroups du noyau Linux enseignés seulement en B3 (b3-linux Ch. 4) !
- **Registre de concepts (`audit/registres/docker.csv`)** : 381 termes techniques recensés (94 définis avant/à la 1re occurrence, **11 définis après (`D2`)**, **268 jamais définis (`D1/D4/D6`)**, 8 définis dans un autre cours)
- **Score moyen C1–C14** : **16.8 / 42 (40.0 %)**
- **Verdict global** : **À RÉÉCRIRE (40.0 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
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
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **Total** | **Score sur 42 (et %)** | **16/42** (38.1%) | **17/42** (40.5%) | **17/42** (40.5%) | **17/42** (40.5%) | **17/42** (40.5%) | **17/42** (40.5%) | **16.8/42 (40.0%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `DOCKER-001` — D10 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « Pendant des décennies, le déploiement d’applications en entreprise souffrait du syndrome classique « mais pourtant… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (131 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-002` — D13 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre1.html:L192`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L192 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-003` — D15 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-004` — D15 (Gravité : **S1**)
- **Cours / fichier** : `docker/chapitres/chapitre1.html:L547`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la distinction VM vs Conteneur, les Namespaces et les Cgroups.… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-005` — D8 (Gravité : **S1**)
- **Cours / fichier** : `docker/chapitres/chapitre1.html:L196`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (dk2-c1-e1) — Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-006` — D10 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Une entreprise déploie 80 conteneurs sur un serveur de production dont le disque dur s’est… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (125 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-007` — D13 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre2.html:L171`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L171 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-008` — D15 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-009` — D15 (Gravité : **S1**)
- **Cours / fichier** : `docker/chapitres/chapitre2.html:L522`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la structure des layers, Overlay2 et les risques du tag… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-010` — D8 (Gravité : **S1**)
- **Cours / fichier** : `docker/chapitres/chapitre2.html:L175`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (dk2-c2-e1) — Calculateur de taille d’image et déduplication des Layers (OverlayFS) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-011` — D8 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre2.html:L288`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-012` — D10 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Une équipe de développeurs livre une image Docker pour une application écrite en Go. L’image… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (125 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre3.html:L223`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L223 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-014` — D15 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-015` — D15 (Gravité : **S1**)
- **Cours / fichier** : `docker/chapitres/chapitre3.html:L567`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la forme exec de CMD, l’ordonnancement des couches et le… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-016` — D8 (Gravité : **S1**)
- **Cours / fichier** : `docker/chapitres/chapitre3.html:L227`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (dk2-c3-e1) — Validateur et linter de bonnes pratiques Dockerfile »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-017` — D10 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre4.html:L66`
- **Extrait (≤ 15 mots)** : « Un développeur junior configure une base de données PostgreSQL dans un conteneur pour une application… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (152 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-018` — D13 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre4.html:L145`
- **Extrait (≤ 15 mots)** : « Sur le réseau bridge par défaut historique ( docker0 ), les conteneurs ne peuvent pas… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L145 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-019` — D15 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre4.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-020` — D15 (Gravité : **S1**)
- **Cours / fichier** : `docker/chapitres/chapitre4.html:L538`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la différence SIGTERM/SIGKILL, les volumes nommés et le port mapping.… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-021` — D8 (Gravité : **S1**)
- **Cours / fichier** : `docker/chapitres/chapitre4.html:L198`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (dk2-c4-e1) — Gestionnaire d’états du cycle de vie d’un conteneur »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-022` — D10 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre5.html:L66`
- **Extrait (≤ 15 mots)** : « Dans une start-up en pleine expansion, le déploiement de l’application sur la machine de test… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (140 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-023` — D13 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre5.html:L140`
- **Extrait (≤ 15 mots)** : « Lorsque vous exécutez docker compose up dans un dossier nommé projet , Compose crée automatiquement… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L140 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `DOCKER-024` — D15 (Gravité : **S2**)
- **Cours / fichier** : `docker/chapitres/chapitre5.html:L13`
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

## 6. Verdict Final sur `docker`

**À RÉÉCRIRE (40.0 % — < 70 %)** — Score moyen : **16.8 / 42 (40.0 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
