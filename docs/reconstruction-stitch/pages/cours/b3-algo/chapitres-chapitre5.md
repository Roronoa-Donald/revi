# Chapitre 5 — Plus Courts Chemins & Algorithme de Dijkstra

> Fiche extraite du fichier `b3-algo/chapitres/chapitre5.html` (459 lignes, 32.7 Ko, sha256 `1e852a238612`).
> Famille : **cours-b3-algo** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-algo/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Plus Courts Chemins &amp; Algorithme de Dijkstra \| Algorithmique B3 |
| Description meta | Chapitre 5 du cours Algorithmique B3 : Problème des plus courts chemins à source unique (SSSP), opération fondamentale de relâchement d’arc (relaxation), algorithme de Dijkstra avec file de priorité min-heap, limitation stricte aux poids positifs et comparaison avec l’algorithme de Bellman-Ford face aux cycles absorbants. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Plus Courts Chemins & Algorithme de Dijkstra |
| 3 | h2 | — | 1. Le Problème SSSP et le Principe de Relâchement |
| 4 | h2 | — | 2. L’Algorithme de Dijkstra avec File de Priorité |
| 5 | h2 | — | 3. Limites de Dijkstra et Algorithme de Bellman-Ford |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Plus Courts Chemins & Algorithme de Dijkstra
  - **H2** — 1. Le Problème SSSP et le Principe de Relâchement
  - **H2** — 2. L’Algorithme de Dijkstra avec File de Priorité
  - **H2** — 3. Limites de Dijkstra et Algorithme de Bellman-Ford
      - **H4** — Échec de Dijkstra sur Poids Négatifs
      - **H4** — Algorithme de Bellman-Ford
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Relâchement d’arc (Edge Relaxation)
    - **H3** — Exercice 2 — Algorithme complet de Dijkstra avec file de priorité
    - **H3** — Exercice 3 — Détection de poids négatifs et de cycles absorbants
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
| Chapitre 6 — Programmation Dynamique & Optimisation Sous-Structurelle | `chapitre6.html` | `b3-algo/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| O(\|V\|^2) |  | — | `opt` | — | actif | — |
| O((\|V\| + \|E\|) log \|V\|) |  | — | `opt` | — | actif | data-correct=1 |
| O(\|V\| * \|E\|) |  | — | `opt` | — | actif | — |
| O(\|V\|^3) |  | — | `opt` | — | actif | — |
| Pour éviter la division par zéro |  | — | `opt` | — | actif | — |
| Parce qu’il suppose qu’une fois la distance d’un sommet finalisée, elle ne pourra plus jam |  | — | `opt` | — | actif | data-correct=1 |
| Parce que les ordinateurs ne savent pas stocker d’entiers négatifs |  | — | `opt` | — | actif | — |
| Pour limiter le nombre de sommets |  | — | `opt` | — | actif | — |
| La division euclidienne |  | — | `opt` | — | actif | — |
| Le relâchement d’arc (relaxation) |  | — | `opt` | — | actif | data-correct=1 |
| La compression de chemin |  | — | `opt` | — | actif | — |
| La rotation AVL |  | — | `opt` | — | actif | — |
| 1 passe |  | — | `opt` | — | actif | — |
| \|V\| passes |  | — | `opt` | — | actif | — |
| \|V\| - 1 passes |  | — | `opt` | — | actif | data-correct=1 |
| \|E\| passes |  | — | `opt` | — | actif | — |
| Si la file de priorité déborde |  | — | `opt` | — | actif | — |
| Si une \|V\|-ième passe supplémentaire de relaxation parvient encore à réduire la distance d |  | — | `opt` | — | actif | data-correct=1 |
| Si la somme des degrés est impaire |  | — | `opt` | — | actif | — |
| Si le graphe est non orienté |  | — | `opt` | — | actif | — |
| BGP |  | — | `opt` | — | actif | — |
| RIP |  | — | `opt` | — | actif | — |
| OSPF (Open Shortest Path First) |  | — | `opt` | — | actif | data-correct=1 |
| DNS |  | — | `opt` | — | actif | — |
| 0 |  | — | `opt` | — | actif | — |
| -1 |  | — | `opt` | — | actif | — |
| float("inf") |  | — | `opt` | — | actif | data-correct=1 |
| None |  | — | `opt` | — | actif | — |
| En partant de la source et en tirant au sort les voisins |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `al3-c5-e1` | python | 300 | suspendue | `RELAX nom=succes DISTS=A:0,B:10,C:inf ARC=A->B:4 RELAX nom=echec DISTS=A:0,B:3 ARC=A->B:5` | Exercice 1 — Relâchement d’arc (Edge Relaxation) |
| `al3-c5-e2` | python | 300 | suspendue | `DIJKSTRA nom=reseau_optique SOURCE=A SOMMETS=A,B,C,D,E ARCS=A->B:4,A->C:2,C->B:1,B->D:5,C->D:8,C->E:10,D->E:2 CIBLE=E` | Exercice 2 — Algorithme complet de Dijkstra avec file de priorité |
| `al3-c5-e3` | python | 300 | suspendue | `ANALYSE nom=g_positif SOURCE=A SOMMETS=A,B,C ARCS=A->B:5,B->C:2 ANALYSE nom=g_cycle_neg SOURCE=S SOMMETS=S,A,B ARCS=S->A:1,A->B:-3,B->A:-2` | Exercice 3 — Détection de poids négatifs et de cycles absorbants |

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
- Blocs `pre` : 7 · elements `code` : 14
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2746 mots · 413 noeuds HTML

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
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |
| `badge` | 3 |

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
