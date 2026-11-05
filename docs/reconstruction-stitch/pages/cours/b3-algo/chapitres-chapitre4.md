# Chapitre 4 — Algorithmes Gloutons & Théorie des Graphes

> Fiche extraite du fichier `b3-algo/chapitres/chapitre4.html` (475 lignes, 32.4 Ko, sha256 `749ff7d644f9`).
> Famille : **cours-b3-algo** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-algo/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Algorithmes Gloutons &amp; Théorie des Graphes \| Algorithmique B3 |
| Description meta | Chapitre 4 du cours Algorithmique B3 : Modélisation des graphes, représentations par listes et matrices d’adjacence, parcours en largeur (BFS) et profondeur (DFS), principe de choix glouton, arbre couvrant minimal (MST) et algorithme de Kruskal avec structure Union-Find. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Algorithmes Gloutons & Théorie des Graphes |
| 3 | h2 | — | 1. Représentation des Graphes en Mémoire |
| 4 | h2 | — | 2. Parcours de Graphes : BFS vs DFS |
| 5 | h2 | — | 3. Arbre Couvrant Minimal (MST) et Algorithme de Kruskal |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Algorithmes Gloutons & Théorie des Graphes
  - **H2** — 1. Représentation des Graphes en Mémoire
      - **H4** — Matrice d’Adjacence
      - **H4** — Liste d’Adjacence
  - **H2** — 2. Parcours de Graphes : BFS vs DFS
      - **H4** — Parcours en Largeur (Breadth-First Search - BFS)
      - **H4** — Parcours en Profondeur (Depth-First Search - DFS)
  - **H2** — 3. Arbre Couvrant Minimal (MST) et Algorithme de Kruskal
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Représentation de graphe et calcul des degrés
    - **H3** — Exercice 2 — Parcours en largeur (BFS) et distance minimale
    - **H3** — Exercice 3 — Arbre couvrant minimal (MST) de Kruskal et Union-Find
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 9. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-algonav` | Portail → `/`<br>Algorithmique B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Algorithmique B3 | `../index.html` | `b3-algo/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-algo/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-algo/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-algo/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-algo/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-algo/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-algo/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-algo/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-algo/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-algo/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-algo/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-algo/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-algo/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-algo/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-algo/chapitres/formules.html` | interne |
| Chapitre 5 — Plus Courts Chemins & Algorithme de Dijkstra | `chapitre5.html` | `b3-algo/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 10 arêtes |  | — | `opt` | — | actif | — |
| 11 arêtes |  | — | `opt` | — | actif | data-correct=1 |
| 12 arêtes |  | — | `opt` | — | actif | — |
| 13 arêtes |  | — | `opt` | — | actif | — |
| O(1) |  | — | `opt` | — | actif | — |
| O(\|V\|) |  | — | `opt` | — | actif | — |
| O(\|V\| + \|E\|) |  | — | `opt` | — | actif | data-correct=1 |
| O(\|V\|^2) |  | — | `opt` | — | actif | — |
| Parcours en profondeur (DFS) |  | — | `opt` | — | actif | — |
| Parcours en largeur (BFS) |  | — | `opt` | — | actif | data-correct=1 |
| Tri topologique |  | — | `opt` | — | actif | — |
| Algorithme de Kruskal |  | — | `opt` | — | actif | — |
| O(\|V\|) |  | — | `opt` | — | actif | — |
| O(\|E\| log \|E\|) |  | — | `opt` | — | actif | data-correct=1 |
| O(\|V\|^3) |  | — | `opt` | — | actif | — |
| O(2^{\|V\|}) |  | — | `opt` | — | actif | — |
| L’algorithme plante avec une erreur de division par zéro |  | — | `opt` | — | actif | — |
| Il génère une forêt couvrante minimale (un arbre couvrant par composante) |  | — | `opt` | — | actif | data-correct=1 |
| Il connecte artificiellement les deux composantes |  | — | `opt` | — | actif | — |
| Il rejette toutes les arêtes |  | — | `opt` | — | actif | — |
| Elle évite d’allouer de la mémoire |  | — | `opt` | — | actif | — |
| Elle aplatit la structure arborescente pour que chaque nœud pointe directement vers la rac |  | — | `opt` | — | actif | data-correct=1 |
| Elle trie les sommets par ordre alphabétique |  | — | `opt` | — | actif | — |
| Elle supprime les cycles du graphe |  | — | `opt` | — | actif | — |
| La matrice d’adjacence |  | — | `opt` | — | actif | data-correct=1 |
| La liste d’adjacence |  | — | `opt` | — | actif | — |
| La pile LIFO |  | — | `opt` | — | actif | — |
| L’arbre binaire de recherche |  | — | `opt` | — | actif | — |
| L’algorithme de Dijkstra |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `al3-c4-e1` | python | 300 | suspendue | `GRAPHE nom=g1 TYPE=NON_ORIENTE SOMMETS=A,B,C,D ARETES=A-B:5,B-C:2,A-C:8,C-D:1` | Exercice 1 — Représentation de graphe et calcul des degrés |
| `al3-c4-e2` | python | 300 | suspendue | `BFS nom=reseau1 SOMMETS=A,B,C,D,E ARETES=A-B,A-C,B-D,C-D,D-E DEPART=A CIBLE=E` | Exercice 2 — Parcours en largeur (BFS) et distance minimale |
| `al3-c4-e3` | python | 300 | suspendue | `KRUSKAL nom=g1 SOMMETS=A,B,C,D ARETES=A-B:4,A-C:2,B-C:1,B-D:5,C-D:8` | Exercice 3 — Arbre couvrant minimal (MST) de Kruskal et Union-Find |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 7 (`.box`, variantes `box--*`).
- Blocs replies : 3 (`<details>`).

Etats et interactions a reconstruire :

- En-tete compact : fil d'Ariane, titre, meta (module, duree, statut gratuit).
- Encadres pedagogiques : mise en situation, objectifs, intuition, piege, methode, technique, revision.
- Tableaux de donnees et blocs pseudo-code defilables horizontalement.
- Exercices de code (`div.lab[data-lab]`) : editeur, entree standard, console a 3 onglets, tuteur IA.
- Correction suspendue si `data-grading-suspended="1"` : bouton « Validation suspendue » desactive et avis visible.
- QCM : options desactivees apres reponse, bonne reponse `is-correct`, mauvaise `is-wrong`, explication `is-shown`.
- Score QCM : `Score : n/N (p %)` + palier de maitrise (4 bandes).
- Checklist de maitrise : case `data-mark-done`, etat persiste en localStorage par chapitre.
- Navigation de bas de page : chapitre precedent / suivant.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 6 · elements `code` : 15
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2696 mots · 433 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 19 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 7 |
| `box__title` | 7 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `card` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 0
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 0 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.
