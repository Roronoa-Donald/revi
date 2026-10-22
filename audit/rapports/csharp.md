# Rapport d'Audit Pédagogique — `csharp` (C# · B2)

- **Identifiant / Slug** : `csharp`
- **Niveau académique** : B2 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-algo, b1-c-cpp ou rd_java (POO)
- **Diagnostic topologique (Phase 1)** : POO, génériques, lambdas ; exercices convertis en grilles statiques au lieu de code C# compilé !
- **Registre de concepts (`audit/registres/csharp.csv`)** : 321 termes techniques recensés (87 définis avant/à la 1re occurrence, **5 définis après (`D2`)**, **226 jamais définis (`D1/D4/D6`)**, 3 définis dans un autre cours)
- **Score moyen C1–C14** : **16.8 / 42 (40.0 %)**
- **Verdict global** : **À RÉÉCRIRE (40.0 % — < 70 %)**

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
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **Total** | **Score sur 42 (et %)** | **16/42** (38.1%) | **17/42** (40.5%) | **17/42** (40.5%) | **17/42** (40.5%) | **17/42** (40.5%) | **17/42** (40.5%) | **16.8/42 (40.0%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `CSHARP-001` — D10 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « Une équipe de développement refond le moteur d’un système bancaire haute fréquence sous .NET 8.… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (98 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-002` — D13 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre1.html:L124`
- **Extrait (≤ 15 mots)** : « Type Valeur (sur la Pile) : comme un message écrit sur un Post-it . Quand… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L124 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-003` — D15 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-004` — D15 (Gravité : **S1**)
- **Cours / fichier** : `csharp/chapitres/chapitre1.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-005` — D8 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre1.html:L474`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-006` — D8 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre1.html:L231`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-007` — D8 (Gravité : **S1**)
- **Cours / fichier** : `csharp/chapitres/chapitre1.html:L189`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (csb2-c1-e1) — Détecteur de Boxing/Unboxing et allocation Stack vs Heap »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-008` — D10 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Une plateforme de commerce électronique souffre d’incohérences de données critiques en production : des soldes… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (100 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-009` — D13 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre2.html:L164`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L164 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-010` — D15 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-011` — D15 (Gravité : **S1**)
- **Cours / fichier** : `csharp/chapitres/chapitre2.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-012` — D8 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre2.html:L447`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-013` — D8 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre2.html:L215`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-014` — D8 (Gravité : **S1**)
- **Cours / fichier** : `csharp/chapitres/chapitre2.html:L168`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (csb2-c2-e1) — Propriétés auto-implémentées et validation get / set »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-015` — D10 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Une suite logicielle d’édition graphique souffre de régressions majeures lors de l’ajout de nouveaux formats… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (107 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-016` — D13 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre3.html:L164`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L164 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-017` — D15 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-018` — D15 (Gravité : **S1**)
- **Cours / fichier** : `csharp/chapitres/chapitre3.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-019` — D8 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre3.html:L442`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-020` — D8 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre3.html:L213`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-021` — D8 (Gravité : **S1**)
- **Cours / fichier** : `csharp/chapitres/chapitre3.html:L168`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (csb2-c3-e1) — Polymorphisme dynamique (virtual/override) vs masquage (new) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-022` — D10 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre4.html:L66`
- **Extrait (≤ 15 mots)** : « Un service de microservices bancaires rencontre de multiples incidents d’interruption de service en production :… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (124 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-023` — D13 (Gravité : **S3**)
- **Cours / fichier** : `csharp/chapitres/chapitre4.html:L66`
- **Extrait (≤ 15 mots)** : « Un service de microservices bancaires rencontre de multiples incidents d’interruption de service en production :… »
- **Pourquoi un novice bute** : Style emphatique (« infaillible ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « infaillible » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `CSHARP-024` — D13 (Gravité : **S2**)
- **Cours / fichier** : `csharp/chapitres/chapitre4.html:L137`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L137 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

## 3. Contre-Lecture Indépendante — Second Lecteur Novice (Section 5 & Annexe A)

- **Périmètre de contre-lecture** : Chapitre 1 public (`chapitres/chapitre1.html`) ainsi que tous les chapitres présentant au moins un critère $\le 1/3$ : **Chapitres 1, 2, 3, 4, 5, 6**.
- **Synthèse du second lecteur novice** : Le lecteur bute principalement sur l'absence de rappel des prérequis en ouverture de chapitre (`C3`), l'introduction de termes techniques ou d'acronymes dans la mise en situation avant leur définition (`D2`/`D4`), et la dissonance entre les consignes résiduelles de code et les grilles statiques `analyse` (`D8`/`D9`).

## 4. Audit des Ressources Transverses (Phase 4)

- **Flashcards (`chapitres/cartes.html`)** : Présentes. Une notion par carte respectée, mais nombre de cartes par module souvent inférieur aux « 8 notions à connaître absolument » listées en fin de chapitre.
- **Mémo / Formules (`chapitres/formules.html`)** : Présent. Synthèse dense utile en révision, mais introduit parfois des syntaxes ou options CLI non détaillées dans le corps des chapitres (`D1`/`D13`).
- **Catalogue d'exercices (`chapitres/exercices.html`) & Atelier (`atelier.html`)** : Dans les cours convertis en `analyse`, le catalogue ou l’atelier conserve des mentions résiduelles de Python/Bash (`D8`) et, pour 11 cours B3, les liens relatifs `chapitres/chapitreN.html` depuis `chapitres/exercices.html` produisent des erreurs 404 (`D15`).
- **Simulateur d'examen / Examens blancs (`chapitres/simulateur-examen.html`)** : Chronomètre interactif et corrigés repliables `<details>` fonctionnels.
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `csharp`

**À RÉÉCRIRE (40.0 % — < 70 %)** — Score moyen : **16.8 / 42 (40.0 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
