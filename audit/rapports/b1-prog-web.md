# Rapport d'Audit Pédagogique — `b1-prog-web` (Programmation Web · B1)

- **Identifiant / Slug** : `b1-prog-web`
- **Niveau académique** : B1 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `javascript`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-algo (Ch. 1–4 pour JS au Ch. 6)
- **Diagnostic topologique (Phase 1)** : Notions réseau client/serveur et algorithmique de base pour le DOM JS
- **Registre de concepts (`audit/registres/b1-prog-web.csv`)** : 420 termes techniques recensés (171 définis avant/à la 1re occurrence, **28 définis après (`D2`)**, **218 jamais définis (`D1/D4/D6`)**, 3 définis dans un autre cours)
- **Score moyen C1–C14** : **21.3 / 42 (50.7 %)**
- **Verdict global** : **À RÉÉCRIRE (50.7 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 0/3 | 0/3 | 1/3 | 0/3 | 1/3 | 1/3 | **0.5/3** |
| **Total** | **Score sur 42 (et %)** | **20/42** (47.6%) | **21/42** (50.0%) | **22/42** (52.4%) | **21/42** (50.0%) | **22/42** (52.4%) | **22/42** (52.4%) | **21.3/42 (50.7%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `B1-PROG-WEB-001` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre1.html:L196`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L66 : objectifs/test de maîtrise) et vouvoiement (L196 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-002` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre1.html:L207`
- **Extrait (≤ 15 mots)** : « const lignes = fs.readFileSync(0, 'utf8').trim().split('\n'); »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-003` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-004` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre1.html:L166`
- **Extrait (≤ 15 mots)** : « <link rel="stylesheet" href="styles.css"> ← CSS »
- **Pourquoi un novice bute** : Lien cassé (404) vers « styles.css » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-005` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre1.html:L445`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-006` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre2.html:L205`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L205 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-007` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre2.html:L216`
- **Extrait (≤ 15 mots)** : « const lignes = fs.readFileSync(0, 'utf8').trim().split('\n'); »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-008` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-009` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre2.html:L152`
- **Extrait (≤ 15 mots)** : « <pre><code><a href="/cours/index.html">Revenir au sommaire du cours</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /cours/index.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-010` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre2.html:L273`
- **Extrait (≤ 15 mots)** : « &lt;a href="/cours.html"&gt;Cours&lt;/a&gt; »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /cours.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-011` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre2.html:L285`
- **Extrait (≤ 15 mots)** : « <li>Le motif doit accepter d’autres attributs avant href : &lt;a[^&gt;]*href="([^"]*)" .</li> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ([^ » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-012` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre2.html:L452`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre3.html:L197`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L197 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-014` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre3.html:L208`
- **Extrait (≤ 15 mots)** : « const lignes = fs.readFileSync(0, 'utf8').trim().split('\n'); »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-015` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-016` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre3.html:L433`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-017` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre4.html:L197`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L66 : objectifs/test de maîtrise) et vouvoiement (L197 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-018` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre4.html:L208`
- **Extrait (≤ 15 mots)** : « const lignes = fs.readFileSync(0, 'utf8').trim().split('\n'); »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-019` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre4.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-020` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre4.html:L93`
- **Extrait (≤ 15 mots)** : « <tr><td>feuille externe</td><td><code>&lt;link rel="stylesheet" href="styles.css"&gt;</code></td><td>presque toujours : mise en cache, réutilisable</td></tr> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « styles.css » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-021` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre4.html:L443`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-022` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre5.html:L211`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L211 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-023` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre5.html:L222`
- **Extrait (≤ 15 mots)** : « const lignes = fs.readFileSync(0, 'utf8').trim().split('\n'); »
- **Pourquoi un novice bute** : Séquence d’échappement littérale « \n » affichée dans le texte ou le bloc de code.
- **Correction minimale proposée** : Remplacer « \\n » par un vrai retour à la ligne ou corriger la commande LaTeX.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-PROG-WEB-024` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-prog-web/chapitres/chapitre5.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

## 3. Contre-Lecture Indépendante — Second Lecteur Novice (Section 5 & Annexe A)

- **Périmètre de contre-lecture** : Chapitre 1 public (`chapitres/chapitre1.html`) ainsi que tous les chapitres présentant au moins un critère $\le 1/3$ : **Chapitres 1, 2, 3, 4, 5, 6**.
- **Synthèse du second lecteur novice** : Le lecteur bute principalement sur l'absence de rappel des prérequis en ouverture de chapitre (`C3`), l'introduction de termes techniques ou d'acronymes dans la mise en situation avant leur définition (`D2`/`D4`), et le saut de difficulté entre les exemples du cours et l’écriture autonome du programme complet (`P5` PRIMM).

## 4. Audit des Ressources Transverses (Phase 4)

- **Flashcards (`chapitres/cartes.html`)** : Présentes. Une notion par carte respectée, mais nombre de cartes par module souvent inférieur aux « 8 notions à connaître absolument » listées en fin de chapitre.
- **Mémo / Formules (`chapitres/formules.html`)** : Présent. Synthèse dense utile en révision, mais introduit parfois des syntaxes ou options CLI non détaillées dans le corps des chapitres (`D1`/`D13`).
- **Catalogue d'exercices (`exercices/exercices.html`) & Atelier (`atelier.html`)** : Exécution réelle opérationnelle ; gagnerait à proposer un palier intermédiaire de code à modifier (PRIMM) avant l’écriture complète.
- **Simulateur d'examen / Examens blancs (`chapitres/simulateur-examen.html`)** : Chronomètre interactif et corrigés repliables `<details>` fonctionnels.
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Double palier « Niveau 1 — Intuition » / « Niveau 2 — Technique »** : Permet d'ancrer l'idée en mots simples avec une analogie concrète avant d'introduire le formalisme technique (conforme à `P3` et `P4`).
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `b1-prog-web`

**À RÉÉCRIRE (50.7 % — < 70 %)** — Score moyen : **21.3 / 42 (50.7 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
