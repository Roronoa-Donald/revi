# Introduction à la Programmation en Langage Python

> Fiche extraite du fichier `b1-python/index.html` (98 lignes, 7.7 Ko, sha256 `8595c5494e4a`).
> Famille : **cours-b1-python** · sous-type : `index` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-python/index.html` |
| Titre du document | Python — Introduction à la programmation (B1) \| Cours Interactif |
| Description meta | Cours complet de Python niveau B1 : environnement, variables, conditions, boucles, fonctions, structures de données, fichiers, débogage. Théorie, exercices progressifs, QCM, examens blancs. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | pynav | 9 liens, aria="" |
| 2 | h1 | — | Introduction à la Programmation en Langage Python |
| 3 | h2 | — | Programme du cours |
| 4 | h2 | — | Comment utiliser ce cours |

## 3. Hierarchie des titres

- **H1** — Introduction à la Programmation en Langage Python
  - **H2** — Programme du cours
  - **H2** — Comment utiliser ce cours

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `pynav` | Portail → `/`<br>Python B1 → `index.html`<br>Sommaire → `sommaire.html`<br>Chapitre 1 → `chapitres/chapitre1.html`<br>Cartes → `chapitres/cartes.html`<br>Mémo → `chapitres/formules.html`<br>Exercices → `exercices/exercices.html`<br>Atelier → `atelier.html`<br>Examen → `chapitres/simulateur-examen.html` |

Liens sortants : **24** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Portail | `/` | `.` | interne |
| Python B1 | `index.html` | `b1-python/index.html` | interne |
| Sommaire | `sommaire.html` | `b1-python/sommaire.html` | interne |
| Chapitre 1 | `chapitres/chapitre1.html` | `b1-python/chapitres/chapitre1.html` | interne |
| Cartes | `chapitres/cartes.html` | `b1-python/chapitres/cartes.html` | interne |
| Mémo | `chapitres/formules.html` | `b1-python/chapitres/formules.html` | interne |
| Exercices | `exercices/exercices.html` | `b1-python/exercices/exercices.html` | interne |
| Atelier | `atelier.html` | `b1-python/atelier.html` | interne |
| Examen | `chapitres/simulateur-examen.html` | `b1-python/chapitres/simulateur-examen.html` | interne |
| Portail des cours | `/index.html` | `index.html` | interne |
| Python B1 | `sommaire.html` | `b1-python/sommaire.html` | interne |
| 1 Environnement, variables et types REPL, installation, types de base, opérateurs, entrées/sorties. | `chapitres/chapitre1.html` | `b1-python/chapitres/chapitre1.html` | interne |
| 2 Structures de contrôle Booléens, if/elif/else, boucles for et while, break/continue. | `chapitres/chapitre2.html` | `b1-python/chapitres/chapitre2.html` | interne |
| 3 Fonctions def, return, paramètres, portée, modules, docstrings. | `chapitres/chapitre3.html` | `b1-python/chapitres/chapitre3.html` | interne |
| 4 Structures de données Listes, dictionnaires, tuples, ensembles ; modélisation. | `chapitres/chapitre4.html` | `b1-python/chapitres/chapitre4.html` | interne |
| 5 Manipulation des fichiers open/with, lecture, écriture, erreurs, CSV. | `chapitres/chapitre5.html` | `b1-python/chapitres/chapitre5.html` | interne |
| 6 Débogage et bonnes pratiques Types d'erreurs, try/except, raise, PEP 8. | `chapitres/chapitre6.html` | `b1-python/chapitres/chapitre6.html` | interne |
| atelier | `atelier.html` | `b1-python/atelier.html` | interne |
| Commencer le chapitre 1 | `chapitres/chapitre1.html` | `b1-python/chapitres/chapitre1.html` | interne |
| Flashcards | `chapitres/cartes.html` | `b1-python/chapitres/cartes.html` | interne |
| Mémo syntaxe | `chapitres/formules.html` | `b1-python/chapitres/formules.html` | interne |
| Atelier de code | `atelier.html` | `b1-python/atelier.html` | interne |
| Exercices & projet | `exercices/exercices.html` | `b1-python/exercices/exercices.html` | interne |
| Examens blancs | `chapitres/simulateur-examen.html` | `b1-python/chapitres/simulateur-examen.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

Aucun `<button>` dans le document (les actions peuvent etre des liens stylises).

## 7. Composants pedagogiques et etats observes

- Encadres pedagogiques : 3 (`.box`, variantes `box--*`).

Etats et interactions a reconstruire :

- En-tête : marque + 3 liens (Epreuves, Atelier, Mon compte) + bouton profil + bascule de thème.
- Etat `prepLockedMsg` : bandeau « L'atelier est protege » si `?preparation=locked`, refermable.
- Filtre de niveau : 4 onglets (B1/B2/B3/Tous), onglet actif noir, persistance `portal_selected_level`.
- Recherche : champ `#courseSearch`, filtrage en direct sur `data-title` ; compteur `#activeFilterCount`.
- Etat vide : `#portalEmptyState` (bloc pointille) avec bouton de reinitialisation des filtres.
- Carte « Reprendre » : masquee par defaut (`hidden`), visible si progression locale > 0.
- Utilisateur connecte : bouton profil marque `is-authenticated`, nom en title/aria-label.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 16 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-target`, `#i-compass`, `#i-arrow-right`, `#i-wrench`, `#i-rocket`, `#i-cards`, `#i-file`, `#i-terminal`, `#i-blocks`, `#i-clipboard`
- Volume de texte : ~360 mots · 135 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `assets/css/cours.css`, `/assets/css/code-lab.css`
- Scripts externes : `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 0

## 10. Classes et attributs data observes

Classes distinctes : 25. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 16 |
| `toc__item` | 6 |
| `toc__n` | 6 |
| `toc__t` | 6 |
| `toc__d` | 6 |
| `btn` | 6 |
| `tag` | 3 |
| `box` | 3 |
| `box__title` | 3 |
| `tag--time` | 2 |
| `pynav` | 1 |
| `pynav__in` | 1 |
| `pynav__home` | 1 |
| `pynav__sep` | 1 |
| `pynav__brand` | 1 |
| `pynav__links` | 1 |
| `pywrap` | 1 |
| `crumb` | 1 |
| `chapmeta` | 1 |
| `lead` | 1 |

Aucun attribut `data-*`.

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
