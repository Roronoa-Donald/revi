# PHP — du script au site dynamique

> Fiche extraite du fichier `b1-php/index.html` (96 lignes, 7.3 Ko, sha256 `04f12a888e9a`).
> Famille : **cours-b1-php** · sous-type : `index` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-php/index.html` |
| Titre du document | PHP — Du script au site dynamique (B1) \| Cours Interactif |
| Description meta | Cours complet de PHP niveau B1 : syntaxe, types, conditions, boucles, tableaux, fonctions, formulaires, sessions et accès MySQL avec PDO. Théorie, exercices de code exécutés dans la page, QCM et examens blancs. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | phnav | 9 liens, aria="" |
| 2 | h1 | — | PHP — du script au site dynamique |
| 3 | h2 | — | Programme du cours |

## 3. Hierarchie des titres

- **H1** — PHP — du script au site dynamique
  - **H2** — Programme du cours

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `phnav` | Portail → `/`<br>PHP B1 → `index.html`<br>Sommaire → `sommaire.html`<br>Chapitre 1 → `chapitres/chapitre1.html`<br>Cartes → `chapitres/cartes.html`<br>Mémo → `chapitres/formules.html`<br>Exercices → `exercices/exercices.html`<br>Atelier → `atelier.html`<br>Examen → `chapitres/simulateur-examen.html` |

Liens sortants : **25** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Portail | `/` | `.` | interne |
| PHP B1 | `index.html` | `b1-php/index.html` | interne |
| Sommaire | `sommaire.html` | `b1-php/sommaire.html` | interne |
| Chapitre 1 | `chapitres/chapitre1.html` | `b1-php/chapitres/chapitre1.html` | interne |
| Cartes | `chapitres/cartes.html` | `b1-php/chapitres/cartes.html` | interne |
| Mémo | `chapitres/formules.html` | `b1-php/chapitres/formules.html` | interne |
| Exercices | `exercices/exercices.html` | `b1-php/exercices/exercices.html` | interne |
| Atelier | `atelier.html` | `b1-php/atelier.html` | interne |
| Examen | `chapitres/simulateur-examen.html` | `b1-php/chapitres/simulateur-examen.html` | interne |
| Portail des cours | `/index.html` | `index.html` | interne |
| PHP B1 | `sommaire.html` | `b1-php/sommaire.html` | interne |
| 1 Premiers pas en PHP Écho, variables, lecture d'entrée, premier script complet. | `chapitres/chapitre1.html` | `b1-php/chapitres/chapitre1.html` | interne |
| 2 Types, opérateurs et chaînes Entiers, flottants, casts, fonctions de chaîne, interpollation. | `chapitres/chapitre2.html` | `b1-php/chapitres/chapitre2.html` | interne |
| 3 Conditions if / elseif / else, comparaisons, ET / OU, cascade ordonnée. | `chapitres/chapitre3.html` | `b1-php/chapitres/chapitre3.html` | interne |
| 4 Boucles for, while, pas négatif, accumulateurs, boucles imbriquées. | `chapitres/chapitre4.html` | `b1-php/chapitres/chapitre4.html` | interne |
| 5 Tableaux indexés Création, parcours, recherche, tri sans sort(). | `chapitres/chapitre5.html` | `b1-php/chapitres/chapitre5.html` | interne |
| 6 Fonctions Déclaration, paramètres, return, plusieurs valeurs, réutilisation. | `chapitres/chapitre6.html` | `b1-php/chapitres/chapitre6.html` | interne |
| 7 Tableaux associatifs Clé → valeur, foreach, comptage d'occurrences, inventaires. | `chapitres/chapitre7.html` | `b1-php/chapitres/chapitre7.html` | interne |
| 8 Formulaires, sessions et PDO Validation, session, connexion MySQL, requêtes préparées, CRUD. | `chapitres/chapitre8.html` | `b1-php/chapitres/chapitre8.html` | interne |
| Commencer le chapitre 1 | `chapitres/chapitre1.html` | `b1-php/chapitres/chapitre1.html` | interne |
| Flashcards | `chapitres/cartes.html` | `b1-php/chapitres/cartes.html` | interne |
| Mémo syntaxe | `chapitres/formules.html` | `b1-php/chapitres/formules.html` | interne |
| Atelier de code | `atelier.html` | `b1-php/atelier.html` | interne |
| Exercices & projet | `exercices/exercices.html` | `b1-php/exercices/exercices.html` | interne |
| … | | | 1 lien(s) supplementaire(s) |

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
- SVG inline : 11 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-target`, `#i-compass`, `#i-wrench`, `#i-rocket`, `#i-cards`, `#i-file`, `#i-terminal`, `#i-blocks`, `#i-clipboard`
- Volume de texte : ~352 mots · 133 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `assets/css/cours.css`, `/assets/css/code-lab.css`
- Scripts externes : `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 0

## 10. Classes et attributs data observes

Classes distinctes : 25. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 11 |
| `toc__item` | 8 |
| `toc__n` | 8 |
| `toc__t` | 8 |
| `toc__d` | 8 |
| `btn` | 6 |
| `tag` | 3 |
| `box` | 3 |
| `box__title` | 3 |
| `tag--time` | 2 |
| `phnav` | 1 |
| `phnav__in` | 1 |
| `phnav__home` | 1 |
| `phnav__sep` | 1 |
| `phnav__brand` | 1 |
| `phnav__links` | 1 |
| `phwrap` | 1 |
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
