# Rapport d'Audit Pédagogique — `masterclass-apprendre` (Masterclass Apprendre a apprendre · B2)

- **Identifiant / Slug** : `masterclass-apprendre`
- **Niveau académique** : B2 (6 chapitres)
- **Fichiers lus** : **14 / 14 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : Aucun
- **Diagnostic topologique (Phase 1)** : Emploie du jargon neurobiologique (LTP, myélinisation, hippocampe) dès le Ch. 1
- **Registre de concepts (`audit/registres/masterclass-apprendre.csv`)** : 265 termes techniques recensés (162 définis avant/à la 1re occurrence, **0 définis après (`D2`)**, **99 jamais définis (`D1/D4/D6`)**, 4 définis dans un autre cours)
- **Score moyen C1–C14** : **17.8 / 42 (42.4 %)**
- **Verdict global** : **À RÉÉCRIRE (42.4 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 2/3 | 2/3 | 1/3 | 1/3 | 2/3 | 2/3 | **1.7/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 1/3 | 1/3 | 1/3 | 1/3 | 2/3 | 1/3 | **1.2/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 0/3 | 0/3 | 0/3 | 0/3 | 1/3 | 0/3 | **0.2/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **Total** | **Score sur 42 (et %)** | **17/42** (40.5%) | **18/42** (42.9%) | **17/42** (40.5%) | **17/42** (40.5%) | **20/42** (47.6%) | **18/42** (42.9%) | **17.8/42 (42.4%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `MASTERCLASS-APPRENDRE-001` — D13 (Gravité : **S2**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre1.html:L125`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L125 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-002` — D15 (Gravité : **S2**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-003` — D15 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre1.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-004` — D15 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre1.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-005` — D8 (Gravité : **S2**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre1.html:L400`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-006` — D8 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre1.html:L129`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (mc2-c1-e1) — Typologie des mémoires »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-007` — D8 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre1.html:L210`
- **Extrait (≤ 15 mots)** : « <li>Découpe avec split(";") et convertis les trois valeurs en entiers.</li> »
- **Pourquoi un novice bute** : Syntaxe Python exigée ou citée dans une étude de cas sans exécution Python alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-008` — D13 (Gravité : **S3**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre2.html:L114`
- **Extrait (≤ 15 mots)** : « Fermez votre cahier ou votre éditeur de code. Prenez une feuille totalement vierge et tentez… »
- **Pourquoi un novice bute** : Style emphatique (« chirurgical ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « chirurgical » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-009` — D13 (Gravité : **S3**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre2.html:L114`
- **Extrait (≤ 15 mots)** : « Fermez votre cahier ou votre éditeur de code. Prenez une feuille totalement vierge et tentez… »
- **Pourquoi un novice bute** : Style emphatique (« chirurgicale ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « chirurgicale » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-010` — D13 (Gravité : **S2**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre2.html:L114`
- **Extrait (≤ 15 mots)** : « Fermez votre cahier ou votre éditeur de code. Prenez une feuille totalement vierge et tentez… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L114 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-011` — D15 (Gravité : **S2**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-012` — D15 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre2.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-013` — D15 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre2.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-014` — D8 (Gravité : **S2**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre2.html:L395`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-015` — D8 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre2.html:L123`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (mc2-c2-e1) — Rappel actif vs Révision passive »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-016` — D8 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre2.html:L204`
- **Extrait (≤ 15 mots)** : « <li>Convertis les deux notes en float ou int avec split(";").</li> »
- **Pourquoi un novice bute** : Syntaxe Python exigée ou citée dans une étude de cas sans exécution Python alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-017` — D13 (Gravité : **S3**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Le bachotage intensif la veille d’un examen permet parfois de sauver les meubles le lendemain… »
- **Pourquoi un novice bute** : Style emphatique (« impitoyable ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « impitoyable » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-018` — D13 (Gravité : **S2**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre3.html:L134`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L134 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-019` — D15 (Gravité : **S2**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-020` — D15 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre3.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-021` — D15 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre3.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-022` — D8 (Gravité : **S2**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre3.html:L411`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-023` — D8 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre3.html:L138`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (mc2-c3-e1) — Courbe de l’oubli d’Ebbinghaus »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `MASTERCLASS-APPRENDRE-024` — D8 (Gravité : **S1**)
- **Cours / fichier** : `masterclass-apprendre/chapitres/chapitre3.html:L220`
- **Extrait (≤ 15 mots)** : « <li>Parse avec split(";"). Convertis boite_actuelle en int.</li> »
- **Pourquoi un novice bute** : Syntaxe Python exigée ou citée dans une étude de cas sans exécution Python alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
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

## 6. Verdict Final sur `masterclass-apprendre`

**À RÉÉCRIRE (42.4 % — < 70 %)** — Score moyen : **17.8 / 42 (42.4 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
