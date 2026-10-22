# Fidélité aux Sources (Mission A) — `b1-bureautique` (Bureautique · B1)

- **Cours** : `b1-bureautique` (Bureautique) — Niveau **B1** (6 chapitres)
- **Statut des sources PDF** : **Aucun PDF source dans `corpus-cours-revi.zip`**
- **Niveau de confiance (Mission A)** : **Nul (Aucun PDF source dans corpus-cours-revi.zip — Mission A impossible)**
- **Correction d'index (`INDEX.md`)** : `INDEX.md` rattachait `textes/B1/VB Excel/support1.txt` (46 p.) à `b1-bureautique`. Or ce document est un cours de programmation **VBA (`Sub`, `Function`, `MsgBox`, `UserForm`)** destiné à `b1-vb-excel`, tandis que `b1-bureautique` enseigne Word (Ch. 1–2), les formules Excel sans VBA (Ch. 3–5) et PowerPoint (Ch. 6) à partir de fichiers `.docx` non inclus dans l'archive PDF.

## 1. Mission A — Fidélité aux sources
Conformément à la section 2 du prompt, ce cours ne disposant d'aucun support PDF dans l'archive `corpus-cours-revi.zip`, **la comparaison aux sources (Mission A) est impossible**. Seule la cohérence interne des 6 chapitres du site est vérifiée ci-dessous.

## 2. Vérification de la cohérence interne sur le site
- **Progression des 6 chapitres** :
  - `chapitres/chapitre1.html` : **Chapitre 1 — Word : l'interface et la saisie** (1. Le ruban : onglets et groupes, 2. Modes d'affichage et barre d'état, 3. Sélectionner et enregistrer, 4. Études de cas & applications pratiques)
  - `chapitres/chapitre2.html` : **Chapitre 2 — Word : mise en forme et mise en page** (1. La mise en forme des caractères et des paragraphes, 2. Mise en page et impression, 3. Études de cas & applications pratiques, 4. QCM — niveau examen)
  - `chapitres/chapitre3.html` : **Chapitre 3 — Excel : la feuille de calcul** (1. Classeur, feuilles et fenêtre, 2. Saisir, aligner, formater, 3. Études de cas & applications pratiques, 4. QCM — niveau examen)
  - `chapitres/chapitre4.html` : **Chapitre 4 — Excel : formules et fonctions statistiques** (1. La formule et ses opérateurs, 2. Les fonctions statistiques et les textes, 3. Études de cas & applications pratiques, 4. QCM — niveau examen)
  - `chapitres/chapitre5.html` : **Chapitre 5 — Excel : conditionnelles et compteurs conditionnels** (1. SI et SI imbriqué, 2. NB.SI, SOMME.SI, MOYENNE.SI et RANG, 3. Études de cas & applications pratiques, 4. QCM — niveau examen)
  - `chapitres/chapitre6.html` : **Chapitre 6 — PowerPoint : la présentation** (1. L'écran et les modes d'affichage, 2. Créer, thématiser, diffuser, 3. Études de cas & applications pratiques, 4. QCM — niveau examen)
- **Principaux constats de cohérence interne** :
  - Langage des ateliers : `analyse`
  - En-tête de prérequis explicites : absent (`C3`).
  - Cohérence Objectifs / Exercices / QCM : voir `audit/tour2/02-verification-rapport.md` (points B1 à B10) et le plan de corrections par lots `audit/tour2/04-plan-corrections.md`.
