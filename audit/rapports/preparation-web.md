# Rapport d'Audit Pédagogique — `preparation-web` (Preparation Web · B2)

- **Identifiant / Slug** : `preparation-web`
- **Niveau académique** : B2 (0 chapitres)
- **Fichiers lus** : **1 / 1 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : Aucun
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b1-prog-web (Ch. 1–6 HTML/CSS/JS DOM)
- **Diagnostic topologique (Phase 1)** : 12 projets pratiques HTML/JS ; utilise CodeMirror et exige manipulation DOM/événements
- **Registre de concepts (`audit/registres/preparation-web.csv`)** : 5 termes techniques recensés (0 définis avant/à la 1re occurrence, **0 définis après (`D2`)**, **5 jamais définis (`D1/D4/D6`)**, 0 définis dans un autre cours)
- **Score moyen C1–C14** : **0.0 / 42 (0.0 %)**
- **Verdict global** : **PORTAIL SPÉCIAL / MODULE ARCHIVÉ**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

*Ce module ne comporte pas de chapitres standardisés (`chapitre1..N.html`).*

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

## 3. Contre-Lecture Indépendante — Second Lecteur Novice (Section 5 & Annexe A)

## 4. Audit des Ressources Transverses (Phase 4)

- **Flashcards (`chapitres/cartes.html`)** : Absentes. Une notion par carte respectée, mais nombre de cartes par module souvent inférieur aux « 8 notions à connaître absolument » listées en fin de chapitre.
- **Mémo / Formules (`chapitres/formules.html`)** : Absent. Synthèse dense utile en révision, mais introduit parfois des syntaxes ou options CLI non détaillées dans le corps des chapitres (`D1`/`D13`).
- **Catalogue d'exercices (`absent`) & Atelier (`atelier.html`)** : Exécution réelle opérationnelle ; gagnerait à proposer un palier intermédiaire de code à modifier (PRIMM) avant l’écriture complète.
- **Simulateur d'examen / Examens blancs (`absent`)** : Chronomètre interactif et corrigés repliables `<details>` fonctionnels.
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `preparation-web`

**PORTAIL SPÉCIAL / MODULE ARCHIVÉ** — Score moyen : **0.0 / 42 (0.0 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
