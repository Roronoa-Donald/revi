# Fidélité aux Sources (Mission A) — `RD-RO` (Recherche Opérationnelle · B2)

- **Cours** : `RD-RO` (Recherche Opérationnelle) — Niveau **B2** (6 chapitres)
- **Documents sources rattachés (5 fichiers, 77 pages)** :
- `textes/B2/RD-RO/RO-Cours-Complet-Bases-Detaillees.txt` (19 pages, statut `ok`)
- `textes/B2/RD-RO/RO-10-Exercices-Modelisation.txt` (16 pages, statut `ok`)
- `textes/B2/RD-RO/RO-QCM-100-questions.txt` (3 pages, statut `ok`)
- `textes/B2/RD-RO/ref/Algo simplexe.txt` (14 pages, statut `ok`)
- `textes/B2/RD-RO/ref/RO-slide1.txt` (25 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B2/RD-RO/RO-Cours-Complet-Bases-Detaillees.txt#PAGE 1` : *Cours Complet de Recherche Opérationnelle*
- `textes/B2/RD-RO/RO-Cours-Complet-Bases-Detaillees.txt#PAGE 4` : *f(x) = x² (x est élevé au carré)*
- `textes/B2/RD-RO/RO-Cours-Complet-Bases-Detaillees.txt#PAGE 7` : *Ligne m+2 : Contraintes de non-négativité*
- `textes/B2/RD-RO/RO-Cours-Complet-Bases-Detaillees.txt#PAGE 10` : *Étape 5 : NON-NÉGATIVITÉ*
- `textes/B2/RD-RO/RO-Cours-Complet-Bases-Detaillees.txt#PAGE 13` : *Solution optimale*
- `textes/B2/RD-RO/RO-Cours-Complet-Bases-Detaillees.txt#PAGE 16` : *Ajoutez des variables d'écart s₁ et s₂ :*
- `textes/B2/RD-RO/RO-10-Exercices-Modelisation.txt#PAGE 1` : *10 Exercices de Modélisation en Recherche*
- `textes/B2/RD-RO/RO-10-Exercices-Modelisation.txt#PAGE 3` : *EXERCICE 1 : Production sur deux machines*
- **Progression des chapitres sur le site** :
- `RD-RO/chapitres/chapitre1.html` : **Chapitre 1 — Fondements, Variables & Modélisation Linéaire** — 1. Qu’est-ce que la Recherche Opérationnelle ? (`L81`), 2. Composants fondamentaux d’un Programme Linéaire (PL) (`L94`), 3. Protocole de modélisation pas à pas (Les 4 étapes) (`L141`), 4. Grandes familles de problèmes linéaires (`L166`)
- `RD-RO/chapitres/chapitre2.html` : **Chapitre 2 — Formes Mathématiques & Résolution Graphique** — 1. Forme Canonique vs Forme Standard (`L82`), 2. Géométrie de la Région Réalisable : Le Polyèdre Convexe (`L105`), 3. Calcul analytique des sommets par la règle de Cramer (`L119`), 4. Typologie des Solutions d’un Programme Linéaire (`L134`)
- `RD-RO/chapitres/chapitre3.html` : **Chapitre 3 — Algorithme du Simplexe & Tableaux** — 1. Le principe fondamental : Naviguer de sommet en sommet (`L83`), 2. Base, Hors-Base & Solutions de Base Réalisables (`L106`), 3. Anatomie du Tableau du Simplexe (`L123`), 4. L’Itération du Simplexe en 4 règles précises (`L143`)
- `RD-RO/chapitres/chapitre4.html` : **Chapitre 4 — Méthode des Deux Phases & Dualité Linéaire** — 1. Le problème de l’initialisation : Pourquoi les variables artificielles ? (`L83`), 2. L’Algorithme des Deux Phases (`L92`), 3. Théorie de la Dualité : Le Problème Miroir (`L112`), 4. Théorèmes fondamentaux & Prix d’Ombre (`L131`)
- `RD-RO/chapitres/chapitre5.html` : **Chapitre 5 — Problèmes de Transport & Affectation** — 1. Modélisation du Problème de Transport (`L83`), 2. Méthodes heuristiques de Solution Initiale (`L103`), 3. Optimisation par la Méthode MODI (Potentiels u-v) (`L129`), 4. Le Problème d’Affectation & l’Algorithme Hongrois (`L149`)
- `RD-RO/chapitres/chapitre6.html` : **Chapitre 6 — Ordonnancement PERT / CPM & Flots de Réseaux** — 1. Graphes d’ordonnancement : MPM et PERT / CPM (`L84`), 2. Dates au plus tôt, Dates au plus tard & Marges (`L103`), 3. Le Chemin Critique & le Pilotage des Dérives (`L122`), 4. Flots dans les Réseaux & Algorithme de Ford-Fulkerson (`L134`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 5 document(s) source(s) (77 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Recherche Opérationnelle (RO)
- **Source PDF** : `textes/B2/RD-RO/RO-Cours-Complet-Bases-Detaillees.txt#PAGE 1` : « Cours Complet de Recherche Opérationnelle Des Bases Élémentaires à la Maîtrise Totale TABLE DES MATIÈRES 1. Introduction générale et historique 2. Chapitre 1 : Les fondame »
- **Site web** : `RD-RO/chapitres/chapitre1.html:L83` : « **Recherche Opérationnelle (RO)** : est l’ensemble des méthodes et techniques scientifiques (principalement mathématiques, statistiques et algorithmiques) qui permettent d’optimiser le fonctionnem »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — 1940-1945 — La Seconde Guerre mondiale
- **Source PDF** : `textes/B2/RD-RO/RO-Cours-Complet-Bases-Detaillees.txt#PAGE 2` : « emière application de RO) 1940-1945 : Pendant la Seconde Guerre mondiale, les Britanniques utilisent la RO pour optimiser le positionnement des radars, les convois, etc. 1947 : »
- **Site web** : `RD-RO/chapitres/chapitre1.html:L88` : « **1940-1945 — La Seconde Guerre mondiale** : : des équipes pluridisciplinaires britanniques (Patrick Blackett) et américaines déploient des modèles mathématiques pour optimiser l’implantation des radars, l »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — 1947 — George Dantzig et le Simplexe
- **Source PDF** : `textes/B2/RD-RO/RO-Cours-Complet-Bases-Detaillees.txt#PAGE 2` : « radars, les convois, etc. 1947 : George Dantzig invente l'algorithme du Simplexe, révolution mathématique Aujourd'hui : la RO est utilisée partout (airlines, banques, logistiq »
- **Site web** : `RD-RO/chapitres/chapitre1.html:L89` : « **1947 — George Dantzig et le Simplexe** : : invention de l’algorithme du simplexe aux États-Unis, qui révolutionne la résolution numérique des programmes linéaires et ouvre l’ère de l’optimisation indus »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
