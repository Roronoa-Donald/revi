# Chapitre 9 — Algorithmes classiques : tris, dichotomie, récursivité

> Fiche extraite du fichier `b1-algo/chapitres/chapitre9.html` (442 lignes, 26.2 Ko, sha256 `b9c343461843`).
> Famille : **cours-b1-algo** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-algo/chapitres/chapitre9.html` |
| Titre du document | Chapitre 9 — Algorithmes classiques \| Algorithmique B1 |
| Description meta | Chapitre 9 du cours d'algorithmique B1 : tri à bulles optimisé, recherche dichotomique et récursivité (cas de base, Euclide). Théorie, exemples, exercices exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 9 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | alnav | 10 liens, aria="" |
| 2 | h1 | — | Chapitre 9 — Algorithmes classiques : tris, dichotomie, récursivité |
| 3 | h2 | — | 1. Le tri à bulles |
| 4 | h2 | — | 2. Table de trace d'un tri |
| 5 | h2 | — | 3. La recherche dichotomique |
| 6 | h2 | — | 4. La récursivité |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 6 question(s) |
| 15 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 9 — Algorithmes classiques : tris, dichotomie, récursivité
  - **H2** — 1. Le tri à bulles
  - **H2** — 2. Table de trace d'un tri
  - **H2** — 3. La recherche dichotomique
  - **H2** — 4. La récursivité
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Tri à bulles
    - **H3** — Exercice 2 — Recherche dichotomique
    - **H3** — Exercice 3 — Récursivité — puissance et PGCD
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `alnav` | Portail → `/`<br>Algo B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 8 → `chapitre8.html`<br>Ch. 9 → `chapitre9.html`<br>Cartes → `cartes.html`<br>Mémo → `formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `simulateur-examen.html` |

Liens sortants : **16** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Portail | `/` | `.` | interne |
| Algo B1 | `../index.html` | `b1-algo/index.html` | interne |
| Sommaire | `../sommaire.html` | `b1-algo/sommaire.html` | interne |
| Ch. 8 | `chapitre8.html` | `b1-algo/chapitres/chapitre8.html` | interne |
| Ch. 9 | `chapitre9.html` | `b1-algo/chapitres/chapitre9.html` | interne |
| Cartes | `cartes.html` | `b1-algo/chapitres/cartes.html` | interne |
| Mémo | `formules.html` | `b1-algo/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `b1-algo/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `b1-algo/atelier.html` | interne |
| Examen | `simulateur-examen.html` | `b1-algo/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b1-algo/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b1-algo/chapitres/formules.html` | interne |
| Chapitre 8 | `chapitre8.html` | `b1-algo/chapitres/chapitre8.html` | interne |
| Chapitre 10 — Du pseudo-code au programme | `chapitre10.html` | `b1-algo/chapitres/chapitre10.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| chaque élément avec le minimum du tableau |  | — | `opt` | — | actif | — |
| les éléments voisins deux à deux |  | — | `opt` | — | actif | data-correct=1 |
| le premier élément avec le dernier |  | — | `opt` | — | actif | — |
| À compter les valeurs triées |  | — | `opt` | — | actif | — |
| À détecter un passage sans échange pour s'arrêter |  | — | `opt` | — | actif | data-correct=1 |
| À éviter les doublons |  | — | `opt` | — | actif | — |
| Le tableau doit contenir des entiers |  | — | `opt` | — | actif | — |
| Le tableau doit être de taille paire |  | — | `opt` | — | actif | — |
| Le tableau doit être trié |  | — | `opt` | — | actif | data-correct=1 |
| fin ← milieu |  | — | `opt` | — | actif | — |
| début ← milieu + 1 |  | — | `opt` | — | actif | data-correct=1 |
| on recherche dans tout le tableau |  | — | `opt` | — | actif | — |
| Une boucle TantQue |  | — | `opt` | — | actif | — |
| Un cas de base qui s'arrête sans rappel |  | — | `opt` | — | actif | data-correct=1 |
| Deux fonctions |  | — | `opt` | — | actif | — |
| Toujours 0 |  | — | `opt` | — | actif | — |
| abs(a) |  | — | `opt` | — | actif | data-correct=1 |
| Toujours a |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `algo-c9-e1` | python | 300 | active | `5 5 2 8 1 9` | Exercice 1 — Tri à bulles |
| `algo-c9-e2` | python | 300 | suspendue | `5 2 5 8 12 20 12` | Exercice 2 — Recherche dichotomique |
| `algo-c9-e3` | python | 300 | active | `2 10 48 36` | Exercice 3 — Récursivité — puissance et PGCD |

- QCM : 1 bloc(s), **6 question(s)**.
- Encadres pedagogiques : 10 (`.box`, variantes `box--*`).
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

- Tableaux : 2 (0 lignes / 4 en-tetes ; 0 lignes / 3 en-tetes)
- Blocs `pre` : 9 · elements `code` : 22
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-wrench`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-terminal`, `#i-lightbulb`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2341 mots · 441 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`
- Scripts externes : `../assets/js/cours.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 3

## 10. Classes et attributs data observes

Classes distinctes : 61. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 22 |
| `opt` | 18 |
| `k` | 16 |
| `box` | 10 |
| `box__title` | 10 |
| `lab__sample-part` | 6 |
| `q` | 6 |
| `q__stem` | 6 |
| `opts` | 6 |
| `q__exp` | 6 |
| `c` | 4 |
| `lab__note` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |

Attributs `data-*` : `data-correct` (6), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-grading-suspended` (1), `data-mark-done` (1)

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
