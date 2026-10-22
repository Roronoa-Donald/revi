# Rapport d'Audit Pédagogique — `b1-virtualisation` (Virtualisation des serveurs · B1)

- **Identifiant / Slug** : `b1-virtualisation`
- **Niveau académique** : B1 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-architecture (CPU, RAM, stockage, IOPS), b1-reseaux (VLAN, SAN/NAS)
- **Diagnostic topologique (Phase 1)** : Parachute IOPS, SAN/NAS, Active Directory, pare-feu dès les Ch. 1–3
- **Registre de concepts (`audit/registres/b1-virtualisation.csv`)** : 206 termes techniques recensés (118 définis avant/à la 1re occurrence, **4 définis après (`D2`)**, **81 jamais définis (`D1/D4/D6`)**, 3 définis dans un autre cours)
- **Score moyen C1–C14** : **21.0 / 42 (50.0 %)**
- **Verdict global** : **À RÉÉCRIRE (50.0 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 1/3 | 2/3 | 2/3 | 2/3 | 2/3 | 1/3 | **1.7/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 2/3 | 2/3 | 1/3 | 2/3 | 2/3 | 2/3 | **1.8/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 1/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **1.8/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 1/3 | 1/3 | 0/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **Total** | **Score sur 42 (et %)** | **19/42** (45.2%) | **22/42** (52.4%) | **20/42** (47.6%) | **22/42** (52.4%) | **22/42** (52.4%) | **21/42** (50.0%) | **21.0/42 (50.0%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `B1-VIRTUALISATION-001` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « Dans l’architecture informatique classique, la règle historique était stricte : « un serveur physique dédié… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (99 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-002` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre1.html:L118`
- **Extrait (≤ 15 mots)** : « Pour valider ce premier chapitre, vous allez coder trois algorithmes d’audit : 1. Classer les… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L118 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-003` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-004` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre1.html:L440`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-005` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre1.html:L127`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (vt-c1-e1) — Le rapport d’inactivité du serveur »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-006` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre2.html:L129`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L66 : objectifs/test de maîtrise) et vouvoiement (L129 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-007` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-008` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre2.html:L453`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-009` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre2.html:L133`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (vt-c2-e1) — Ce que partagent les machines virtuelles »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-010` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre3.html:L124`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L124 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-011` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-012` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre3.html:L449`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-013` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre3.html:L128`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (vt-c3-e1) — Les services de l’histoire »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-014` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre3.html:L248`
- **Extrait (≤ 15 mots)** : « <li>Nouveau service : [ -z "${compte[$service]+x}" ] → ordre[$g]=$service et g=$((g+1)).</li> »
- **Pourquoi un novice bute** : Syntaxe Bash citée dans une activité convertie en étude de cas alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-015` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre4.html:L117`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L117 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-016` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre4.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-017` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre4.html:L448`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-018` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre4.html:L121`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (vt-c4-e1) — De 80 % à 100 % : le taux de… »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-019` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre5.html:L127`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L127 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-020` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre5.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-021` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre5.html:L451`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-022` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre5.html:L131`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (vt-c5-e1) — Les questions techniques de l’histoire »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-023` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre6.html:L66`
- **Extrait (≤ 15 mots)** : « Dernière question de réflexion de l’histoire : « Que feriez-vous si vous deviez convaincre un… »
- **Pourquoi un novice bute** : Mélange tutoiement (L1 : objectifs/test de maîtrise) et vouvoiement (L66 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-VIRTUALISATION-024` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-virtualisation/chapitres/chapitre6.html:L13`
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

## 6. Verdict Final sur `b1-virtualisation`

**À RÉÉCRIRE (50.0 % — < 70 %)** — Score moyen : **21.0 / 42 (50.0 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
