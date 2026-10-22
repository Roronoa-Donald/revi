# Rapport d'Audit Pédagogique — `b1-algo` (Algorithmique · B1)

- **Identifiant / Slug** : `b1-algo`
- **Niveau académique** : B1 (10 chapitres)
- **Fichiers lus** : **17 / 17 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `python`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : Aucun (fondamental B1)
- **Diagnostic topologique (Phase 1)** : Python 3 (input, int, print, //, %, range, def, listes) exigé dès le Ch. 1 dans les exercices → Cycle avec b1-python
- **Registre de concepts (`audit/registres/b1-algo.csv`)** : 263 termes techniques recensés (129 définis avant/à la 1re occurrence, **18 définis après (`D2`)**, **112 jamais définis (`D1/D4/D6`)**, 4 définis dans un autre cours)
- **Score moyen C1–C14** : **21.0 / 42 (50.0 %)**
- **Verdict global** : **À RÉÉCRIRE (50.0 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Ch.7 | Ch.8 | Ch.9 | Ch.10 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 1/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **1.9/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C3** | Prérequis explicites et réellement acquis | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 2/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.1/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 2/3 | **1.0/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 3/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.1/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 1/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **1.9/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **Total** | **Score sur 42 (et %)** | **20/42** (47.6%) | **21/42** (50.0%) | **21/42** (50.0%) | **21/42** (50.0%) | **21/42** (50.0%) | **21/42** (50.0%) | **21/42** (50.0%) | **21/42** (50.0%) | **21/42** (50.0%) | **22/42** (52.4%) | **21.0/42 (50.0%)** |

### Justification explicite des notes 3/3 (« Exemplaire »)

- **Chapitre 1 — C12** : Aucune erreur factuelle ou technique : les quatre propriétés d'un algorithme, la sémantique de `:=` vs `=` en Pascal et le déroulement pas à pas de la table de trace ($S = 0 \to 1 \to 3 \to 6$) sont mathématiquement et techniquement exacts.

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `ALGO-B1-CH1-001` — D8 / D11 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre1.html:L44`
- **Extrait (≤ 15 mots)** : « expliquer à quelqu'un qui n'a jamais fait de thé comment préparer un plat »
- **Pourquoi un novice bute** : Rupture logique dans l’analogie d’accroche : la prémisse porte sur une personne qui n’a jamais fait de thé, mais l’action demandée est de préparer « un plat ».
- **Preuve** : Observation directe dans `.box--situation` (ch.1 L44).
- **Correction minimale proposée** : Remplacer « comment préparer un plat » par « comment préparer une tasse de thé » (ou « qui n’a jamais cuisiné comment préparer un plat »).
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ALGO-B1-CH1-002` — D2 (Gravité : **S1**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre1.html:L101`
- **Extrait (≤ 15 mots)** : « Variable longueur, largeur, aire : Entier »
- **Pourquoi un novice bute** : Les notions de variable, de déclaration, de typage (`Entier` / `integer`), d’affectation (`←`) et d’entrées/sorties (`Lire`/`Écrire` aux L103-108) sont mobilisées dans le premier exemple de pseudo-code alors qu’elles ne sont enseignées qu’au Chapitre 2 (« Variables, types et affectation »).
- **Preuve** : Première utilisation ch.1 L90/L97/L101 ; définition formelle dans `chapitres/chapitre2.html:L61-86`.
- **Correction minimale proposée** : Ajouter avant le premier pseudo-code un encadré « À retenir pour l’instant » définissant brièvement en 3 lignes ce qu’est une boîte nommée (variable), `Lire` (recevoir une donnée) et `Écrire` (afficher un résultat), avec renvoi explicite au chapitre 2.
- **Effort** : `S` | **Dépendances** : `aucune`

### `ALGO-B1-CH1-003` — D2 (Gravité : **S1**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre1.html:L129`
- **Extrait (≤ 15 mots)** : « Pour i de 1 à 3 Faire S ← S + i FinPour »
- **Pourquoi un novice bute** : La boucle `Pour` (avec compteur `i` et accumulateur `S ← S + i`) sert de support à la toute première table de trace au Chapitre 1, alors que la boucle `Pour` et la notion d’accumulateur ne sont enseignées qu’au Chapitre 4 (`chapitres/chapitre4.html:L61,L103`).
- **Preuve** : Première occurrence ch.1 L129 ; enseignement au ch.4 §1 et §2 (`chapitres/chapitre4.html:L60-115`).
- **Correction minimale proposée** : Remplacer l’exemple de la section 4 par une séquence purement linéaire sans boucle (ex. 3 affectations successives calculant aire et périmètre, ou un échange de valeurs) ou ajouter une note explicative immédiate sur le rôle de répétition de `Pour i de 1 à 3`.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ALGO-B1-CH1-004` — D6 (Gravité : **S0**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre1.html:L148-252`
- **Extrait (≤ 15 mots)** : « data-language="python" … longueur = int(input()) »
- **Pourquoi un novice bute** : Le chapitre enseigne uniquement le pseudo-code et le Pascal (`program AireRectangle;`), mais les 3 exercices exigés pour valider le chapitre sont en Python (`int(input())`, `print()`), sans qu’aucune ligne du cours ne présente Python, ni `input()`, ni `int()`, ni `print()`. De plus, l’exercice 2 (L215) et l’exercice 3 (L238, L248) exigent la division entière (`//`) et le reste (`%`), qui ne sont enseignés qu’au Chapitre 2 (`chapitre2.html:L89`).
- **Preuve** : Exercices ch.1 L148-252 en Python ; opérateurs `div`/`mod` (`//`/`%`) enseignés seulement dans `chapitres/chapitre2.html:L89-115`.
- **Correction minimale proposée** : Soit basculer les exercices d’Algorithmique B1 sur le moteur de pseudo-code français déjà présent dans la plateforme (`assets/js/engines/pseudo-code-engine.js`, `data-language="algo"`), soit introduire explicitement la correspondance Pseudo-code ↔ Python dès la section 3 et déplacer l’exercice de division euclidienne (`H h M min S s`) au Chapitre 2.
- **Effort** : `M` | **Dépendances** : `ALGO-B1-CH1-007`

### `ALGO-B1-CH1-005` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre1.html:L368-371`
- **Extrait (≤ 15 mots)** : « 70–89 % — Base correcte … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Les paliers affichés dans le bandeau d’auto-évaluation couvrent `< 50 %`, `50–69 %`, `70–89 %`, puis `≥ 95 %` : l’intervalle `90–94 %` est absent (alors même que `assets/js/cours.js:L18` définit `90–94 % — Très bonne maîtrise`). Ce défaut se répète dans les 10 chapitres du cours.
- **Preuve** : Bandeau `.bands` L368-371 dans `chapitre1.html` (et identique dans `chapitre2.html` à `chapitre10.html`).
- **Correction minimale proposée** : Ajouter la ligne `<div class="bandrow bandrow--good">90–94 % — Très bonne maîtrise : consolide les cas limites.</div>` ou étendre le palier précédent à `70–94 %`.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `ALGO-B1-CH1-006` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre1.html:L51,L141,L165`
- **Extrait (≤ 15 mots)** : « tu seras capable de » vs « exécute votre code … Calculez l’aire »
- **Pourquoi un novice bute** : Rupture de registre d’adresse au sein de la même page : la mise en situation (L44), les objectifs (L51) et le test de maîtrise (L365) tutoient l’étudiant (`tu`, `ton`), tandis que l’introduction des exercices et les trois énoncés/indices (L141-249) le vouvoient (`votre code`, `vous ne voyez pas`, `Calculez`, `Affichez`).
- **Preuve** : Tutoiement L44, L51, L365, L371, L382 ; vouvoiement L141-145, L165, L203, L214, L239 (injecté par `scripts/generate-code-labs.js`).
- **Correction minimale proposée** : Harmoniser le générateur `scripts/generate-code-labs.js` et le catalogue `server/exercises/b1-algo.js` au tutoiement (ou harmoniser tout le cours au vouvoiement).
- **Effort** : `S` | **Dépendances** : `aucune`

### `ALGO-B1-CH1-007` — D6 (Gravité : **S1**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre1.html:L55,L112-123`
- **Extrait (≤ 15 mots)** : « program AireRectangle; var longueur, largeur, aire: integer; begin »
- **Pourquoi un novice bute** : Le langage Pascal est imposé dès l’objectif 3 (L55), le bloc de code (L112-121) et le QCM (L276) sans jamais avoir été présenté comme langage historique du support INF-1002, sans explication des mots-clés anglais (`program`, `var`, `integer`, `begin`, `end.`, `write`, `readln`, `writeln`) ni du rôle des points-virgules, tandis que les exercices pratiques basculent sans prévenir en Python.
- **Preuve** : Apparition abrupte du bloc Pascal L112-121 sans introduction syntaxique ; bascule vers Python à L148.
- **Correction minimale proposée** : Expliquer en amont pourquoi le cours présente côte à côte le pseudo-code, le Pascal (utilisé dans les sujets d’examen écrits INF-1002) et le Python (utilisé dans l’atelier interactif), et commenter ligne par ligne la structure minimale d’un programme Pascal (`program`, `var`, `begin ... end.`).
- **Effort** : `S` | **Dépendances** : `aucune`

### `ALGO-B1-TRANS-008` — D8 / D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/cartes.html:L42-48`
- **Extrait (≤ 15 mots)** : « Module 1 — Introduction » (4 cartes seulement sur 8 notions)
- **Pourquoi un novice bute** : Chaque chapitre se conclut par « Les 8 notions à connaître absolument » (ex. ch.1 L354-358), mais `cartes.html` ne contient que 4 flashcards par module (40 cartes au total au lieu de 80) : des notions clés comme la table de trace, la non-ambiguïté ou `:=` vs `=` n’ont aucune flashcard.
- **Preuve** : Comparaison entre `chapitre1.html:L354-358` (8 notions) et `cartes.html:L42-48` (4 cartes).
- **Correction minimale proposée** : Compléter `cartes.html` à 8 cartes par chapitre afin d’aligner exactement les flashcards sur les « 8 notions à connaître absolument ».
- **Effort** : `S` | **Dépendances** : `aucune`

### `ALGO-B1-TRANS-009` — D6 / D9 (Gravité : **S1**)
- **Cours / fichier** : `b1-algo/chapitres/simulateur-examen.html:L90-91`
- **Extrait (≤ 15 mots)** : « t = [int(input()) for i in range(n)] »
- **Pourquoi un novice bute** : Dans le simulateur d’examen blanc n°1, l’Exercice 2 est corrigé en pseudo-code et Pascal, mais les Exercices 3, 4 et 5 sont corrigés exclusivement en Python (sans pseudo-code ni Pascal), et le corrigé de l’Exercice 3 utilise une compréhension de liste (`[int(input()) for i in range(n)]`) jamais enseignée dans les 10 chapitres.
- **Preuve** : Corrigé de l’Exercice 3 dans `simulateur-examen.html:L90-91` vs enseignement du remplissage de tableau par boucle dans `chapitre6.html:L95-115`.
- **Correction minimale proposée** : Fournir systématiquement le corrigé en pseudo-code (et Pascal/Python avec une boucle `for` standard enseignée au chapitre 6, sans compréhension de liste).
- **Effort** : `S` | **Dépendances** : `aucune`

### `B1-ALGO-001` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre2.html:L142`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L52 : objectifs/test de maîtrise) et vouvoiement (L142 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-002` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre2.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-003` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre2.html:L368`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-004` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre3.html:L132`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L52 : objectifs/test de maîtrise) et vouvoiement (L132 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-005` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre3.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-006` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre3.html:L358`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-007` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre4.html:L121`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L51 : objectifs/test de maîtrise) et vouvoiement (L121 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-008` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre4.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-009` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre4.html:L353`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-010` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre5.html:L140`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L52 : objectifs/test de maîtrise) et vouvoiement (L140 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-011` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre5.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-012` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre5.html:L363`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-013` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre6.html:L131`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L52 : objectifs/test de maîtrise) et vouvoiement (L131 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-014` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre6.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-015` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre6.html:L380`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-016` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre7.html:L138`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L52 : objectifs/test de maîtrise) et vouvoiement (L138 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-017` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre7.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-018` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre7.html:L387`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-019` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre8.html:L151`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L46 : objectifs/test de maîtrise) et vouvoiement (L151 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-020` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre8.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-021` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre8.html:L387`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-022` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre9.html:L152`
- **Extrait (≤ 15 mots)** : « Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code »
- **Pourquoi un novice bute** : Mélange tutoiement (L52 : objectifs/test de maîtrise) et vouvoiement (L152 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-023` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre9.html:L8`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B1-ALGO-024` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b1-algo/chapitres/chapitre9.html:L410`
- **Extrait (≤ 15 mots)** : « 70–89 % — … ≥ 95 % — Maîtrise »
- **Pourquoi un novice bute** : Trou logique dans les seuils du test de maîtrise : la plage 90–94 % n’existe pas.
- **Correction minimale proposée** : Ajouter la ligne « 90–94 % — Très bonne maîtrise ».
- **Effort** : `XS` | **Dépendances** : `aucune`

## 3. Contre-Lecture Indépendante — Second Lecteur Novice (Section 5 & Annexe A)

- **Périmètre de contre-lecture** : Chapitre 1 public (`chapitres/chapitre1.html`) ainsi que tous les chapitres présentant au moins un critère $\le 1/3$ : **Chapitres 1, 2, 3, 4, 5, 6, 7, 8, 9, 10**.
- **Journal linéaire du second lecteur novice sur `b1-algo/chapitres/chapitre1.html`** :
  1. **L44 (Mise en situation)** : *« Je lis qu'une personne n'a jamais fait de thé et qu'on lui explique comment préparer un plat : l'analogie change de sujet au milieu de la phrase. »*
  2. **L55 (Objectifs)** : *« On m'annonce que je vais traduire en Pascal : je ne sais pas ce qu'est Pascal ni pourquoi ce langage est choisi. »*
  3. **L101–108 (Premier pseudo-code)** : *« Je vois `Variable longueur, largeur, aire : Entier`, `Lire longueur`, `aire ← longueur × largeur`. Le texte au-dessus m'a juste dit que `←` affecte et `Lire/Écrire` font les entrées/sorties, mais je n'ai pas encore vu comment fonctionne une variable ni ce que signifie `: Entier` (qui est le sujet du Chapitre 2). »*
  4. **L112–121 (Bloc Pascal)** : *« Je découvre `program`, `var`, `integer`, `begin`, `write`, `readln`, `writeln`, `end.` sans traduction mot à mot. »*
  5. **L129 (Table de trace)** : *« Pour m'expliquer la table de trace, on utilise `Pour i de 1 à 3 Faire S ← S + i FinPour`. Je ne sais pas comment `i` augmente tout seul ni pourquoi `S ← S + i` additionne : les boucles `Pour` sont au Chapitre 4 ! »*
  6. **L151–252 (Exercices 1, 2, 3)** : *« Brutalement, l'éditeur est en Python (`longueur = int(input())`). On ne m'a jamais parlé de `int(input())` ni de `print()` ! Pire, à l'exercice 2 (L215) et à l'exercice 3 (L238), on me demande une division entière et un reste pour découper 3723 secondes en heures/minutes/secondes : je ne connais ni l'opérateur de division entière ni le modulo en Python (ils sont au Chapitre 2 !). »*

## 4. Audit des Ressources Transverses (Phase 4)

- **Flashcards (`chapitres/cartes.html`)** : Présentes. Une notion par carte respectée, mais nombre de cartes par module souvent inférieur aux « 8 notions à connaître absolument » listées en fin de chapitre.
- **Mémo / Formules (`chapitres/formules.html`)** : Présent. Synthèse dense utile en révision, mais introduit parfois des syntaxes ou options CLI non détaillées dans le corps des chapitres (`D1`/`D13`).
- **Catalogue d'exercices (`exercices/exercices.html`) & Atelier (`atelier.html`)** : Exécution réelle opérationnelle ; gagnerait à proposer un palier intermédiaire de code à modifier (PRIMM) avant l’écriture complète.
- **Simulateur d'examen / Examens blancs (`chapitres/simulateur-examen.html`)** : Chronomètre interactif et corrigés repliables `<details>` fonctionnels.
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Double palier « Niveau 1 — Intuition » / « Niveau 2 — Technique »** : Permet d'ancrer l'idée en mots simples avec une analogie concrète avant d'introduire le formalisme technique (conforme à `P3` et `P4`).
- **Pratique explicite de la table de trace** : Faire dérouler les variables ligne par ligne dans un tableau dédié est un levier pédagogique majeur de compréhension algorithmique (`P5`).
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `b1-algo`

**À RÉÉCRIRE (50.0 % — < 70 %)** — Score moyen : **21.0 / 42 (50.0 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
