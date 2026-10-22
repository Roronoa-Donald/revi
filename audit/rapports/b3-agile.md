# Rapport d'Audit Pédagogique — `b3-agile` (Méthodes agiles · B3)

- **Identifiant / Slug** : `b3-agile`
- **Niveau académique** : B3 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-projet, ingenierie-besoin (B2)
- **Diagnostic topologique (Phase 1)** : Cycle de vie logiciel, gestion des exigences
- **Registre de concepts (`audit/registres/b3-agile.csv`)** : 295 termes techniques recensés (122 définis avant/à la 1re occurrence, **9 définis après (`D2`)**, **163 jamais définis (`D1/D4/D6`)**, 1 définis dans un autre cours)
- **Score moyen C1–C14** : **15.8 / 42 (37.6 %)**
- **Verdict global** : **À RÉÉCRIRE (37.6 % — < 70 %)**

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
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **Total** | **Score sur 42 (et %)** | **15/42** (35.7%) | **16/42** (38.1%) | **16/42** (38.1%) | **16/42** (38.1%) | **16/42** (38.1%) | **16/42** (38.1%) | **15.8/42 (37.6%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `B3-AGILE-001` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « Durant les premières décennies de l’ingénierie logicielle, les organisations ont calqué leurs méthodes de gestion… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (155 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-002` — D13 (Gravité : **S3**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre1.html:L471`
- **Extrait (≤ 15 mots)** : « Une approche Hybride est souvent optimale pour concilier la gouvernance globale d’entreprise avec la vélocité… »
- **Pourquoi un novice bute** : Style emphatique (« vélocité ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « vélocité » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-003` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre1.html:L169`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L169 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-004` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-005` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre1.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-006` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre1.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-007` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre1.html:L496`
- **Extrait (≤ 15 mots)** : « Incompréhension des différences entre modèles prédictifs et agiles ou méconnaissance du Manifeste Agile de 2001.… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-008` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre1.html:L218`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-009` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre1.html:L173`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ag3-c1-e1) — Calculateur d’écart du Triangle de Fer (Périmètre, Coût, Délais) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-010` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre1.html:L333`
- **Extrait (≤ 15 mots)** : « Pour chaque ligne, afficher :<br> »
- **Pourquoi un novice bute** : Consigne d’entrée/sortie de programme résiduelle dans une grille d’analyse alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-011` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Scrum est aujourd’hui le cadre agile le plus déployé dans l’industrie du logiciel. Décrit dans… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (146 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-012` — D13 (Gravité : **S3**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre2.html:L366`
- **Extrait (≤ 15 mots)** : « Ne pas le présenter en Review, ne pas le compter dans la vélocité et le… »
- **Pourquoi un novice bute** : Style emphatique (« vélocité ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « vélocité » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre2.html:L156`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L156 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-014` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-015` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre2.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-016` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre2.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-017` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre2.html:L474`
- **Extrait (≤ 15 mots)** : « Confusion entre les rôles Scrum ou assimilation du Daily Scrum à une réunion de reporting… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-018` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre2.html:L201`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-019` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre2.html:L160`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ag3-c2-e1) — Validateur d’incrément de produit et Definition of Done (DoD) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-020` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre2.html:L193`
- **Extrait (≤ 15 mots)** : « Pour chaque ligne, afficher :<br> »
- **Pourquoi un novice bute** : Consigne d’entrée/sortie de programme résiduelle dans une grille d’analyse alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-021` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Issu du système de production Toyota (TPS) développé par Taiichi Ohno et adapté à l’ingénierie… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (143 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-022` — D13 (Gravité : **S3**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre3.html:L469`
- **Extrait (≤ 15 mots)** : « Je comprends l’intérêt des limites WIP pour la concentration et la vélocité d’équipe. »
- **Pourquoi un novice bute** : Style emphatique (« vélocité ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « vélocité » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-023` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre3.html:L89`
- **Extrait (≤ 15 mots)** : « Commencer par ce que vous faites maintenant (respecter les rôles et processus existants). »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L89 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-AGILE-024` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-agile/chapitres/chapitre3.html:L13`
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
- **Catalogue d'exercices (`chapitres/exercices.html`) & Atelier (`atelier.html`)** : Dans les cours convertis en `analyse`, le catalogue ou l’atelier conserve des mentions résiduelles de Python/Bash (`D8`) et, pour 11 cours B3, les liens relatifs `chapitres/chapitreN.html` depuis `chapitres/exercices.html` produisent des erreurs 404 (`D15`).
- **Simulateur d'examen / Examens blancs (`chapitres/examens.html`)** : Dans les cours B3 (`examens.html`), les corrigés sont affichés directement en clair sans balise `<details>` et sans chronomètre interactif (`data-timer`), contrairement aux cours B1/B2 (`simulateur-examen.html`).
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `b3-agile`

**À RÉÉCRIRE (37.6 % — < 70 %)** — Score moyen : **15.8 / 42 (37.6 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
