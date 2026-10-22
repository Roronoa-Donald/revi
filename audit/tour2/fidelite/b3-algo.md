# Fidélité aux Sources (Mission A) — `b3-algo` (Algorithmique · B3)

- **Cours** : `b3-algo` (Algorithmique) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (2 fichiers, 124 pages)** :
- `textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt` (100 pages, statut `ok`)
- `textes/B3/SEMESTRE I/Algorithmique/tablo_proced.txt` (24 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt#PAGE 1` : *Syllabus de formation*
- `textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt#PAGE 17` : *Algorithme Signe Produit*
- `textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt#PAGE 33` : *Cas d’une instruction simple : Les instructions de base (lecture, écriture, affe*
- `textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt#PAGE 49` : *Chapitre 05 : Algorithmique des arbres.*
- `textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt#PAGE 65` : * le Préordre (Préfixe): où on affiche la racine avant ses fils (R, FG, FD)*
- `textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt#PAGE 81` : *une autre structure, appelée liste chaînée, pour stocker des valeurs, cette stru*
- `textes/B3/SEMESTRE I/Algorithmique/tablo_proced.txt#PAGE 1` : * Prof.F.Ayoub*
- `textes/B3/SEMESTRE I/Algorithmique/tablo_proced.txt#PAGE 5` : *Tableaux*
- **Progression des chapitres sur le site** :
- `b3-algo/chapitres/chapitre1.html` : **Chapitre 1 — Analyse de Complexité, Notations Asymptotiques & Récursivité** — 1. Notations Asymptotiques et Mathématiques du Grand O (`L82`), 2. Le Théorème Maître de Division pour Régner (`L103`), 3. Empreinte Spatiale et Gestion de la Pile Récursive (`L123`), 4. Exercices de code (`L138`)
- `b3-algo/chapitres/chapitre2.html` : **Chapitre 2 — Structures Arborescentes & Arbres Binaires de Recherche (ABR)** — 1. Anatomie des Arbres Binaires et Parcours Fondamentaux (`L82`), 2. Propriété Fondamentale des ABR & Recherche (`L102`), 3. Algorithme de Suppression dans un ABR (3 Cas) (`L121`), 4. Exercices de code (`L140`)
- `b3-algo/chapitres/chapitre3.html` : **Chapitre 3 — Files de Priorité, Tas Binaires & Tri par Tas (Heapsort)** — 1. Représentation Tabulaire d’un Tas Binaire (`L82`), 2. Tamisage et Opérations sur File de Priorité (`L103`), 3. Tri par Tas in-place (Heapsort) (`L124`), 4. Exercices de code (`L134`)
- `b3-algo/chapitres/chapitre4.html` : **Chapitre 4 — Algorithmes Gloutons & Théorie des Graphes** — 1. Représentation des Graphes en Mémoire (`L82`), 2. Parcours de Graphes : BFS vs DFS (`L108`), 3. Arbre Couvrant Minimal (MST) et Algorithme de Kruskal (`L122`), 4. Exercices de code (`L137`)
- `b3-algo/chapitres/chapitre5.html` : **Chapitre 5 — Plus Courts Chemins & Algorithme de Dijkstra** — 1. Le Problème SSSP et le Principe de Relâchement (`L82`), 2. L’Algorithme de Dijkstra avec File de Priorité (`L96`), 3. Limites de Dijkstra et Algorithme de Bellman-Ford (`L105`), 4. Exercices de code (`L120`)
- `b3-algo/chapitres/chapitre6.html` : **Chapitre 6 — Programmation Dynamique & Optimisation Sous-Structurelle** — 1. Fondements : Sous-Structure Optimale & Chevauchement (`L82`), 2. Top-Down (Mémoïsation) vs Bottom-Up (Tabulation) (`L96`), 3. Problème du Sac à Dos 0/1 (0/1 Knapsack) (`L120`), 4. Exercices de code (`L134`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 2 document(s) source(s) (124 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Cas 1 ($c &gt; d$)
- **Source PDF** : `textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt#PAGE 6` : « finaux, sont rangés dans des cases mémoires qui correspondent à des variables. Ainsi, une variable (figure suivante) est rangée dans un emplacement mémoire nommé, de taille fixe (ou »
- **Site web** : `b3-algo/chapitres/chapitre1.html:L117` : « **Cas 1 ($c &gt; d$)** : La prolifération des sous-problèmes l’emporte. Le coût est dominé par les feuilles de l’arbre récursif. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Cas 2 ($c = d$)
- **Source PDF** : `textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt#PAGE 6` : « finaux, sont rangés dans des cases mémoires qui correspondent à des variables. Ainsi, une variable (figure suivante) est rangée dans un emplacement mémoire nommé, de taille fixe (ou »
- **Site web** : `b3-algo/chapitres/chapitre1.html:L118` : « **Cas 2 ($c = d$)** : Équilibre parfait entre division et combinaison à tous les niveaux de l’arbre. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Cas 3 ($c &lt; d$)
- **Source PDF** : `textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt#PAGE 6` : « finaux, sont rangés dans des cases mémoires qui correspondent à des variables. Ainsi, une variable (figure suivante) est rangée dans un emplacement mémoire nommé, de taille fixe (ou »
- **Site web** : `b3-algo/chapitres/chapitre1.html:L119` : « **Cas 3 ($c &lt; d$)** : Le travail de découpage/combinaison à la racine domine la charge totale. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `python`.
