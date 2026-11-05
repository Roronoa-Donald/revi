# Chapitre 5 — Fonctions

> Fiche extraite du fichier `b1-c-cpp/chapitres/chapitre5.html` (444 lignes, 22.4 Ko, sha256 `227ae48fb1d4`).
> Famille : **cours-b1-c-cpp** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-c-cpp/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Fonctions \| Langage C & C++ B1 |
| Description meta | Chapitre 5 du cours Langage C & C++ B1 : prototypes, définition, passage par valeur, valeur de retour, portée des variables. Théorie, exemples, exercices exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | cnav | 10 liens, aria="" |
| 2 | h1 | — | Chapitre 5 — Fonctions |
| 3 | h2 | — | 1. Définir et appeler une fonction |
| 4 | h2 | — | 2. Le passage par valeur |
| 5 | h2 | — | 3. Plusieurs valeurs en retour |
| 6 | h2 | — | 4. Portée des variables |
| 7 | h2 | — | 5. Décomposer un problème |
| 8 | h2 | — | 6. Exercices de code |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 6 question(s) |
| 16 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Fonctions
  - **H2** — 1. Définir et appeler une fonction
  - **H2** — 2. Le passage par valeur
  - **H2** — 3. Plusieurs valeurs en retour
  - **H2** — 4. Portée des variables
  - **H2** — 5. Décomposer un problème
  - **H2** — 6. Exercices de code
    - **H3** — Exercice 1 — Une fonction qui renvoie une valeur
    - **H3** — Exercice 2 — Fonction de test booléenne
    - **H3** — Exercice 3 — Factorielle d’un entier
  - **H2** — 7. QCM — niveau examen
  - **H2** — 8. Erreurs classiques — récapitulatif
  - **H2** — 9. Méthodologie de résolution
  - **H2** — 10. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 11. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `cnav` | Portail → `/`<br>C & C++ B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 4 → `chapitre4.html`<br>Ch. 5 → `chapitre5.html`<br>Cartes → `cartes.html`<br>Mémo → `formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `simulateur-examen.html` |

Liens sortants : **16** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Portail | `/` | `.` | interne |
| C & C++ B1 | `../index.html` | `b1-c-cpp/index.html` | interne |
| Sommaire | `../sommaire.html` | `b1-c-cpp/sommaire.html` | interne |
| Ch. 4 | `chapitre4.html` | `b1-c-cpp/chapitres/chapitre4.html` | interne |
| Ch. 5 | `chapitre5.html` | `b1-c-cpp/chapitres/chapitre5.html` | interne |
| Cartes | `cartes.html` | `b1-c-cpp/chapitres/cartes.html` | interne |
| Mémo | `formules.html` | `b1-c-cpp/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `b1-c-cpp/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `b1-c-cpp/atelier.html` | interne |
| Examen | `simulateur-examen.html` | `b1-c-cpp/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b1-c-cpp/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b1-c-cpp/chapitres/formules.html` | interne |
| Chapitre 4 | `chapitre4.html` | `b1-c-cpp/chapitres/chapitre4.html` | interne |
| Chapitre 6 — Pointeurs et mémoire | `chapitre6.html` | `b1-c-cpp/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| Il affiche la valeur |  | — | `opt` | — | actif | — |
| Il renvoie la valeur à l'appelant et termine la fonction |  | — | `opt` | — | actif | data-correct=1 |
| Il déclare une variable |  | — | `opt` | — | actif | — |
| 0 |  | — | `opt` | — | actif | — |
| Rien |  | — | `opt` | — | actif | data-correct=1 |
| NULL |  | — | `opt` | — | actif | — |
| Elle double x dans main |  | — | `opt` | — | actif | — |
| Elle ne change pas x : le paramètre est une copie |  | — | `opt` | — | actif | data-correct=1 |
| Elle provoque une erreur |  | — | `opt` | — | actif | — |
| À exécuter la fonction |  | — | `opt` | — | actif | — |
| À annoncer sa signature avant son usage |  | — | `opt` | — | actif | data-correct=1 |
| À déclarer une variable globale |  | — | `opt` | — | actif | — |
| Dans tout le programme |  | — | `opt` | — | actif | — |
| Seulement dans le bloc où elle est déclarée |  | — | `opt` | — | actif | data-correct=1 |
| Dans toutes les fonctions |  | — | `opt` | — | actif | — |
| Autant que voulu |  | — | `opt` | — | actif | — |
| Une seule |  | — | `opt` | — | actif | data-correct=1 |
| Deux au maximum |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `c-c5-e1` | c | 300 | suspendue | `7` | Exercice 1 — Une fonction qui renvoie une valeur |
| `c-c5-e2` | c | 300 | suspendue | `10` | Exercice 2 — Fonction de test booléenne |
| `c-c5-e3` | c | 300 | suspendue | `5` | Exercice 3 — Factorielle d’un entier |

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

- Tableaux : 2 (0 lignes / 2 en-tetes ; 0 lignes / 2 en-tetes)
- Blocs `pre` : 10 · elements `code` : 32
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-lightbulb`, `#i-wrench`, `#i-warning`, `#i-terminal`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1715 mots · 403 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`
- Scripts externes : `../assets/js/cours.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 3

## 10. Classes et attributs data observes

Classes distinctes : 58. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 22 |
| `opt` | 18 |
| `box` | 10 |
| `box__title` | 10 |
| `c` | 6 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `q` | 6 |
| `q__stem` | 6 |
| `opts` | 6 |
| `q__exp` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `box--pitfall` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |

Attributs `data-*` : `data-correct` (6), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
