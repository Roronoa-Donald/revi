# Chapitre 1 — Analyse de Complexité, Notations Asymptotiques & Récursivité

> Fiche extraite du fichier `b3-algo/chapitres/chapitre1.html` (490 lignes, 34.5 Ko, sha256 `c19a8503fd81`).
> Famille : **cours-b3-algo** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-algo/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Analyse de Complexité, Notations Asymptotiques &amp; Récursivité \| Algorithmique B3 |
| Description meta | Chapitre 1 du cours Algorithmique B3 : Notations asymptotiques O, Omega, Theta, calcul des opérations élémentaires, théorème maître de division pour régner, analyse spatiale de la pile d’appels récursive et détection de stack overflow. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Analyse de Complexité, Notations Asymptotiques & Récursivité |
| 3 | h2 | — | 1. Notations Asymptotiques et Mathématiques du Grand O |
| 4 | h2 | — | 2. Le Théorème Maître de Division pour Régner |
| 5 | h2 | — | 3. Empreinte Spatiale et Gestion de la Pile Récursive |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Analyse de Complexité, Notations Asymptotiques & Récursivité
  - **H2** — 1. Notations Asymptotiques et Mathématiques du Grand O
      - **H4** — Grand O : Majoration Asymptotique
      - **H4** — Grand $\Omega$ : Minoration Asymptotique
      - **H4** — Grand $\Theta$ : Encadrement Strict
      - **H4** — Hiérarchie des classes de complexité fondamentales
  - **H2** — 2. Le Théorème Maître de Division pour Régner
  - **H2** — 3. Empreinte Spatiale et Gestion de la Pile Récursive
      - **H4** — Récursion Linéaire
      - **H4** — Récursion Arborescente
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Calculateur d’ordres de grandeur et notations asymptotiques (Grand O)
    - **H3** — Exercice 2 — Résolveur du Théorème Maître (Master Theorem)
    - **H3** — Exercice 3 — Traceur de pile récursive et détection de Stack Overflow
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
| Chapitre 2 — Structures Arborescentes & Arbres Binaires de Recherche (ABR) | `chapitre2.html` | `b3-algo/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| O(n) |  | — | `opt` | — | actif | — |
| O(n log n) |  | — | `opt` | — | actif | data-correct=1 |
| O(n^2) |  | — | `opt` | — | actif | — |
| O(log n) |  | — | `opt` | — | actif | — |
| Cas 1 car log2(3) ≈ 1.58 > 1, donnant Theta(n^1.58) |  | — | `opt` | — | actif | data-correct=1 |
| Cas 2 car le découpage est en 2 |  | — | `opt` | — | actif | — |
| Cas 3 car n domine |  | — | `opt` | — | actif | — |
| Le théorème maître ne s’applique pas ici |  | — | `opt` | — | actif | — |
| Theta(n) |  | — | `opt` | — | actif | — |
| Theta(n^2) |  | — | `opt` | — | actif | data-correct=1 |
| Theta(n^3) |  | — | `opt` | — | actif | — |
| Theta(100n) |  | — | `opt` | — | actif | — |
| O(1) |  | — | `opt` | — | actif | — |
| O(log n) |  | — | `opt` | — | actif | — |
| O(n) |  | — | `opt` | — | actif | data-correct=1 |
| O(2^n) |  | — | `opt` | — | actif | — |
| f(n) est majorée par g(n) |  | — | `opt` | — | actif | — |
| f(n) est minorée par c*g(n) pour n assez grand |  | — | `opt` | — | actif | data-correct=1 |
| f(n) et g(n) sont strictement égales |  | — | `opt` | — | actif | — |
| f(n) tend vers 0 plus vite que g(n) |  | — | `opt` | — | actif | — |
| Theta(1) |  | — | `opt` | — | actif | — |
| Theta(log n) |  | — | `opt` | — | actif | data-correct=1 |
| Theta(n) |  | — | `opt` | — | actif | — |
| Theta(n log n) |  | — | `opt` | — | actif | — |
| Quand elle s’exécute trop vite |  | — | `opt` | — | actif | — |
| Quand la profondeur d’appels dépasse la limite allouée à la pile d’exécution (ex: n = 100 |  | — | `opt` | — | actif | data-correct=1 |
| Quand elle utilise des variables globales |  | — | `opt` | — | actif | — |
| Quand elle renvoie un entier négatif |  | — | `opt` | — | actif | — |
| O(n^2) |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `al3-c1-e1` | python | 300 | suspendue | `ALGO nom=recherche_dicho CLASSE=O(log_n) N=1024 ALGO nom=tri_fusion CLASSE=O(n_log_n) N=16 ALGO nom=tri_bulles CLASSE=O(n2) N=100` | Exercice 1 — Calculateur d’ordres de grandeur et notations asymptotiques (Grand O) |
| `al3-c1-e2` | python | 300 | suspendue | `RECURRENCE nom=tri_fusion a=2 b=2 d=1 RECURRENCE nom=karatsuba a=3 b=2 d=1 RECURRENCE nom=dicho a=1 b=2 d=0` | Exercice 2 — Résolveur du Théorème Maître (Master Theorem) |
| `al3-c1-e3` | python | 300 | suspendue | `RECURSION nom=somme_lin TYPE=LINEAIRE N=5 MAX_DEPTH=10 RECURSION nom=fibo_arbre TYPE=ARBORESCENTE N=5 MAX_DEPTH=10 RECURSION nom=overflow_test TYPE=LINEAIRE N=15 MAX_DEPTH=10` | Exercice 3 — Traceur de pile récursive et détection de Stack Overflow |

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
- Blocs `pre` : 6 · elements `code` : 23
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3003 mots · 459 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

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
| `card` | 5 |
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
