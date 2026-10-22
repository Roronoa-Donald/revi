# Rapport d'Audit Pédagogique — `infographie` (Infographie · B2)

- **Identifiant / Slug** : `infographie`
- **Niveau académique** : B2 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-algebre (Ch. 1–2 vecteurs et matrices 4x4 pour Ch. 4 3D)
- **Diagnostic topologique (Phase 1)** : Algèbre matricielle (transformations affines 3D TRS), binaire/octets
- **Registre de concepts (`audit/registres/infographie.csv`)** : 310 termes techniques recensés (72 définis avant/à la 1re occurrence, **5 définis après (`D2`)**, **232 jamais définis (`D1/D4/D6`)**, 1 définis dans un autre cours)
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

### `INFOGRAPHIE-001` — D10 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « L’image numérique ne se résume pas à un simple tableau de pixels colorés. Concevoir des… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (113 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-002` — D13 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre1.html:L124`
- **Extrait (≤ 15 mots)** : « Si vous additionnez deux sources de lumière ou calculez un produit scalaire de Lambert directement… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L124 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-003` — D15 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-004` — D15 (Gravité : **S1**)
- **Cours / fichier** : `infographie/chapitres/chapitre1.html:L480`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez la différence RVB vs CMJN, le rôle du gamma sRVB… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-005` — D8 (Gravité : **S1**)
- **Cours / fichier** : `infographie/chapitres/chapitre1.html:L158`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ig2-c1-e1) — Convertisseur RVB vers CMJN (Synthèse additive vs soustractive) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-006` — D8 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre1.html:L324`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-007` — D10 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Que ce soit dans les logiciels de création graphique professionnels (Photoshop, Illustrator, GIMP, Figma) ou… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (124 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-008` — D13 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Que ce soit dans les logiciels de création graphique professionnels (Photoshop, Illustrator, GIMP, Figma) ou… »
- **Pourquoi un novice bute** : Mélange tutoiement (L1 : objectifs/test de maîtrise) et vouvoiement (L66 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-009` — D15 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-010` — D15 (Gravité : **S1**)
- **Cours / fichier** : `infographie/chapitres/chapitre2.html:L469`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez les équations de Multiply, Screen et la géométrie des courbes… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-011` — D8 (Gravité : **S1**)
- **Cours / fichier** : `infographie/chapitres/chapitre2.html:L144`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ig2-c2-e1) — Simulateur de modes de fusion de calques (Multiply, Screen, Overlay) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-012` — D10 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Un maillage 3D nu n’est qu’une carcasse de polygones grisâtres. Pour lui donner vie et… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (135 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre3.html:L151`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L151 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-014` — D15 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-015` — D15 (Gravité : **S1**)
- **Cours / fichier** : `infographie/chapitres/chapitre3.html:L476`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez les coordonnées UV normalisées, les contraintes POT et la signification… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-016` — D8 (Gravité : **S1**)
- **Cours / fichier** : `infographie/chapitres/chapitre3.html:L155`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ig2-c3-e1) — Validateur de texture Puissance de Deux (Power of Two -… »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-017` — D10 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre4.html:L66`
- **Extrait (≤ 15 mots)** : « Dans l’univers de la 3D numérique, tout objet complexe — du personnage articulé au décor… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (130 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-018` — D13 (Gravité : **S3**)
- **Cours / fichier** : `infographie/chapitres/chapitre4.html:L147`
- **Extrait (≤ 15 mots)** : « LOD 0 Proche (< 15 m) 100 % (maillage complet haute fidélité) Vue subjective, gros… »
- **Pourquoi un novice bute** : Style emphatique (« cinématique ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « cinématique » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-019` — D13 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre4.html:L155`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L155 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-020` — D15 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre4.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-021` — D15 (Gravité : **S1**)
- **Cours / fichier** : `infographie/chapitres/chapitre4.html:L474`
- **Extrait (≤ 15 mots)** : « Moins de 4/8 : Révisez le rôle du triangle, le Back-Face Culling et le calcul… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-022` — D8 (Gravité : **S1**)
- **Cours / fichier** : `infographie/chapitres/chapitre4.html:L159`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (ig2-c4-e1) — Calculateur de normale d’un triangle 3D (Produit vectoriel) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-023` — D10 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre5.html:L66`
- **Extrait (≤ 15 mots)** : « À l’ère du pipeline fixe OpenGL 1.x, l’éclairage 3D se résumait à une formule approximative… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (127 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `INFOGRAPHIE-024` — D13 (Gravité : **S2**)
- **Cours / fichier** : `infographie/chapitres/chapitre5.html:L139`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L139 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
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

## 6. Verdict Final sur `infographie`

**À RÉÉCRIRE (42.4 % — < 70 %)** — Score moyen : **17.8 / 42 (42.4 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
