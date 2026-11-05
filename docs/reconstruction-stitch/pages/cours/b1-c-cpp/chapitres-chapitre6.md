# Chapitre 6 — Pointeurs et mémoire

> Fiche extraite du fichier `b1-c-cpp/chapitres/chapitre6.html` (446 lignes, 22.8 Ko, sha256 `0725da5a398e`).
> Famille : **cours-b1-c-cpp** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-c-cpp/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Pointeurs et mémoire \| Langage C & C++ B1 |
| Description meta | Chapitre 6 du cours Langage C & C++ B1 : adresses, opérateurs & et *, passage par adresse, arithmétique des pointeurs, pointeurs et tableaux. Théorie, exemples, exercices exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | cnav | 10 liens, aria="" |
| 2 | h1 | — | Chapitre 6 — Pointeurs et mémoire |
| 3 | h2 | — | 1. Adresse et pointeur |
| 4 | h2 | — | 2. Passage par adresse |
| 5 | h2 | — | 3. Pointeurs et tableaux |
| 6 | h2 | — | 4. Paramètres de sortie |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 6 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Pointeurs et mémoire
  - **H2** — 1. Adresse et pointeur
  - **H2** — 2. Passage par adresse
  - **H2** — 3. Pointeurs et tableaux
  - **H2** — 4. Paramètres de sortie
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Échanger deux valeurs par pointeurs
    - **H3** — Exercice 2 — Deux résultats par paramètres de sortie
    - **H3** — Exercice 3 — Parcourir un tableau par pointeur
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
| nav | `cnav` | Portail → `/`<br>C & C++ B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 5 → `chapitre5.html`<br>Ch. 6 → `chapitre6.html`<br>Cartes → `cartes.html`<br>Mémo → `formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `simulateur-examen.html` |

Liens sortants : **16** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Portail | `/` | `.` | interne |
| C & C++ B1 | `../index.html` | `b1-c-cpp/index.html` | interne |
| Sommaire | `../sommaire.html` | `b1-c-cpp/sommaire.html` | interne |
| Ch. 5 | `chapitre5.html` | `b1-c-cpp/chapitres/chapitre5.html` | interne |
| Ch. 6 | `chapitre6.html` | `b1-c-cpp/chapitres/chapitre6.html` | interne |
| Cartes | `cartes.html` | `b1-c-cpp/chapitres/cartes.html` | interne |
| Mémo | `formules.html` | `b1-c-cpp/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `b1-c-cpp/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `b1-c-cpp/atelier.html` | interne |
| Examen | `simulateur-examen.html` | `b1-c-cpp/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b1-c-cpp/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b1-c-cpp/chapitres/formules.html` | interne |
| Chapitre 5 | `chapitre5.html` | `b1-c-cpp/chapitres/chapitre5.html` | interne |
| Chapitre 7 — Structures et fichiers | `chapitre7.html` | `b1-c-cpp/chapitres/chapitre7.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| Une valeur entière |  | — | `opt` | — | actif | — |
| Une adresse mémoire |  | — | `opt` | — | actif | data-correct=1 |
| Une chaîne de caractères |  | — | `opt` | — | actif | — |
| Il multiplie |  | — | `opt` | — | actif | — |
| Il donne l'adresse de x |  | — | `opt` | — | actif | data-correct=1 |
| Il copie x |  | — | `opt` | — | actif | — |
| Il change l'adresse de p |  | — | `opt` | — | actif | — |
| Il écrit 10 à l'adresse pointée |  | — | `opt` | — | actif | data-correct=1 |
| Il compare p à 10 |  | — | `opt` | — | actif | — |
| 4 |  | — | `opt` | — | actif | — |
| 4.5 |  | — | `opt` | — | actif | data-correct=1 |
| 9 |  | — | `opt` | — | actif | — |
| La première valeur |  | — | `opt` | — | actif | — |
| L'adresse de la première case |  | — | `opt` | — | actif | data-correct=1 |
| La taille du tableau |  | — | `opt` | — | actif | — |
| D'un octet |  | — | `opt` | — | actif | — |
| D'une case (la taille d'un int) |  | — | `opt` | — | actif | data-correct=1 |
| D'une valeur |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `c-c6-e1` | c | 300 | suspendue | `10 20` | Exercice 1 — Échanger deux valeurs par pointeurs |
| `c-c6-e2` | c | 300 | suspendue | `2 9` | Exercice 2 — Deux résultats par paramètres de sortie |
| `c-c6-e3` | c | 300 | suspendue | `5 1 1 1 1 1` | Exercice 3 — Parcourir un tableau par pointeur |

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

- Tableaux : 1 (0 lignes / 2 en-tetes)
- Blocs `pre` : 10 · elements `code` : 64
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-lightbulb`, `#i-wrench`, `#i-warning`, `#i-terminal`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~1783 mots · 419 noeuds HTML

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
| `c` | 12 |
| `box` | 10 |
| `box__title` | 10 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `q` | 6 |
| `q__stem` | 6 |
| `opts` | 6 |
| `q__exp` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `box--tech` | 3 |
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
