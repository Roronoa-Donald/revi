# Rapport d'Audit Pédagogique — `b3-cloud-computing` (Cloud Computing · B3)

- **Identifiant / Slug** : `b3-cloud-computing`
- **Niveau académique** : B3 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-virtualisation, admin-vm, docker, b1-reseaux
- **Diagnostic topologique (Phase 1)** : Virtualisation, conteneurs, réseaux IP/VLAN, stockage bloc/objet
- **Registre de concepts (`audit/registres/b3-cloud-computing.csv`)** : 371 termes techniques recensés (85 définis avant/à la 1re occurrence, **6 définis après (`D2`)**, **275 jamais définis (`D1/D4/D6`)**, 5 définis dans un autre cours)
- **Score moyen C1–C14** : **16.8 / 42 (40.0 %)**
- **Verdict global** : **À RÉÉCRIRE (40.0 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
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
| **Total** | **Score sur 42 (et %)** | **16/42** (38.1%) | **17/42** (40.5%) | **17/42** (40.5%) | **17/42** (40.5%) | **17/42** (40.5%) | **17/42** (40.5%) | **16.8/42 (40.0%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `B3-CLOUD-COMPUTING-001` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « Le Cloud Computing a révolutionné l’industrie informatique en substituant à l’acquisition de matériel physique coûteux… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (101 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-002` — D13 (Gravité : **S3**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre1.html:L422`
- **Extrait (≤ 15 mots)** : « Identifier formellement le niveau d’abstraction requis (IaaS pour le contrôle du système, PaaS pour la… »
- **Pourquoi un novice bute** : Style emphatique (« vélocité ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « vélocité » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-003` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre1.html:L140`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L140 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-004` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-005` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre1.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-006` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre1.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-007` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre1.html:L464`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la définition officielle NIST SP 800-145 et la matrice de… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-008` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre1.html:L188`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-009` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre1.html:L144`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (cc3-c1-e1) — Classificateur de modèles de service (IaaS, PaaS, SaaS) et responsabilités »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-010` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Le marché mondial du Cloud est dominé par trois géants hyperscalers : Amazon Web Services… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (98 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-011` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre2.html:L149`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L149 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-012` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-013` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre2.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-014` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre2.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-015` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre2.html:L480`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la topologie des régions/AZ et les formules mathématiques de SLA… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-016` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre2.html:L153`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (cc3-c2-e1) — Cartographe d’équivalences de services CSP (AWS, Azure, GCP) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-017` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « La virtualisation constitue le socle technologique fondamental sans lequel le Cloud Computing ne pourrait exister.… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (106 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-018` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre3.html:L133`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L133 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-019` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-020` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre3.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-021` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre3.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-022` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre3.html:L466`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la différence Type 1 vs Type 2 et les calculs… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-023` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre3.html:L137`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (cc3-c3-e1) — Classificateur d’hyperviseurs (Bare-Metal vs Hosted, HVM vs PV) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-COMPUTING-024` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-computing/chapitres/chapitre4.html:L66`
- **Extrait (≤ 15 mots)** : « Le secteur numérique représente aujourd’hui environ 3% à 4% des émissions mondiales de gaz à… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (112 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
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

## 6. Verdict Final sur `b3-cloud-computing`

**À RÉÉCRIRE (40.0 % — < 70 %)** — Score moyen : **16.8 / 42 (40.0 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
