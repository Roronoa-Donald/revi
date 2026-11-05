# Chapitre 6 — Programmation Dynamique & Optimisation Sous-Structurelle

> Fiche extraite du fichier `b3-algo/chapitres/chapitre6.html` (471 lignes, 33.0 Ko, sha256 `41e37bcceef3`).
> Famille : **cours-b3-algo** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-algo/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Programmation Dynamique &amp; Optimisation Sous-Structurelle \| Algorithmique B3 |
| Description meta | Chapitre 6 du cours Algorithmique B3 : Principe d’optimalité de Bellman, sous-structure optimale, chevauchement de sous-problèmes, mémoïsation descendante (Top-Down) vs tabulation ascendante (Bottom-Up), résolution du problème du sac à dos 0/1 (Knapsack) et plus longue sous-séquence commune (LCS). Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Programmation Dynamique & Optimisation Sous-Structurelle |
| 3 | h2 | — | 1. Fondements : Sous-Structure Optimale & Chevauchement |
| 4 | h2 | — | 2. Top-Down (Mémoïsation) vs Bottom-Up (Tabulation) |
| 5 | h2 | — | 3. Problème du Sac à Dos 0/1 (0/1 Knapsack) |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Programmation Dynamique & Optimisation Sous-Structurelle
  - **H2** — 1. Fondements : Sous-Structure Optimale & Chevauchement
      - **H4** — 1. Sous-Structure Optimale (Optimal Substructure)
      - **H4** — 2. Sous-Problèmes Chevauchants (Overlapping Subproblems)
  - **H2** — 2. Top-Down (Mémoïsation) vs Bottom-Up (Tabulation)
      - **H4** — Mémoïsation Descendante (Top-Down)
      - **H4** — Tabulation Ascendante (Bottom-Up)
  - **H2** — 3. Problème du Sac à Dos 0/1 (0/1 Knapsack)
      - **H4** — Reconstruction de la Solution Optimale
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Mémoïsation et tabulation : le problème de l’escalier
    - **H3** — Exercice 2 — Sac à dos 0/1 (0/1 Knapsack) et reconstruction optimale
    - **H3** — Exercice 3 — Plus Longue Sous-Séquence Commune (LCS)
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
| Atelier de code | `../atelier.html` | `b3-algo/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Sous-structure optimale et sous-problèmes chevauchants |  | — | `opt` | — | actif | data-correct=1 |
| Graphe sans cycle et arêtes positives |  | — | `opt` | — | actif | — |
| Données triées et division binaire |  | — | `opt` | — | actif | — |
| Arbre binaire et fonction de hachage |  | — | `opt` | — | actif | — |
| O(2^n) |  | — | `opt` | — | actif | — |
| O(n + W) |  | — | `opt` | — | actif | — |
| O(n * W) |  | — | `opt` | — | actif | data-correct=1 |
| O(n^2 * W^2) |  | — | `opt` | — | actif | — |
| 4 |  | — | `opt` | — | actif | — |
| 5 |  | — | `opt` | — | actif | data-correct=1 |
| 6 |  | — | `opt` | — | actif | — |
| 8 |  | — | `opt` | — | actif | — |
| Top-Down est itératif et Bottom-Up est récursif |  | — | `opt` | — | actif | — |
| Top-Down est récursif avec cache mémoire, alors que Bottom-Up remplit itérativement une ta |  | — | `opt` | — | actif | data-correct=1 |
| Top-Down ne fonctionne pas en Python |  | — | `opt` | — | actif | — |
| Bottom-Up a une complexité exponentielle |  | — | `opt` | — | actif | — |
| En prenant tous les objets de valeur maximale |  | — | `opt` | — | actif | — |
| En remontant depuis dp[n][W] et en observant si dp[i][w] != dp[i-1][w] pour détecter que l |  | — | `opt` | — | actif | data-correct=1 |
| En effectuant un tri par tas des objets |  | — | `opt` | — | actif | — |
| En appliquant l’algorithme de Dijkstra |  | — | `opt` | — | actif | — |
| 1 |  | — | `opt` | — | actif | — |
| 2 |  | — | `opt` | — | actif | — |
| 3 ("ACD") |  | — | `opt` | — | actif | data-correct=1 |
| 4 |  | — | `opt` | — | actif | — |
| Parce qu’elle est fausse en pratique |  | — | `opt` | — | actif | — |
| Parce qu’elle est polynomiale en la valeur de W, mais exponentielle par rapport au nombre |  | — | `opt` | — | actif | data-correct=1 |
| Parce qu’elle utilise des nombres complexes |  | — | `opt` | — | actif | — |
| Parce qu’elle n’est valable que pour n = 2 |  | — | `opt` | — | actif | — |
| En ne conservant que les deux dernières lignes (ou un seul tableau 1D parcouru de droite à |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `al3-c6-e1` | python | 300 | suspendue | `ESCALIER nom=fib_steps N=4 PAS=1,2 ESCALIER nom=triple_steps N=3 PAS=1,2,3` | Exercice 1 — Mémoïsation et tabulation : le problème de l’escalier |
| `al3-c6-e2` | python | 300 | suspendue | `KNAPSACK nom=randonnee CAPACITE=10 OBJETS=tente:4:20,gourde:2:10,duvet:5:25,lampe:1:8` | Exercice 2 — Sac à dos 0/1 (0/1 Knapsack) et reconstruction optimale |
| `al3-c6-e3` | python | 300 | suspendue | `LCS nom=adn S1=AGGTAB S2=GXTXAYB LCS nom=mots S1=ALGORITHME S2=LOGARITHME` | Exercice 3 — Plus Longue Sous-Séquence Commune (LCS) |

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
- Blocs `pre` : 6 · elements `code` : 9
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2804 mots · 414 noeuds HTML

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
