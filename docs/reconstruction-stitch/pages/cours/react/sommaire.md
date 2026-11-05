# Sommaire du cours

> Fiche extraite du fichier `react/sommaire.html` (122 lignes, 9.7 Ko, sha256 `42c1070440ca`).
> Famille : **cours-react** · sous-type : `sommaire` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/react/sommaire.html` |
| Titre du document | Sommaire — React B2 |
| Description meta | Sommaire du cours de React B2 : 6 chapitres, exercices JavaScript exécutables, flashcards, mémo et examens blancs. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Sommaire du cours |
| 3 | h2 | — | Ressources transverses |

## 3. Hierarchie des titres

- **H1** — Sommaire du cours
  - **H2** — Ressources transverses

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `reactnav` | Portail → `/`<br>React B2 → `index.html`<br>Sommaire → `sommaire.html`<br>Ch. 1 → `chapitres/chapitre1.html`<br>Ch. 2 → `chapitres/chapitre2.html`<br>Ch. 3 → `chapitres/chapitre3.html`<br>Ch. 4 → `chapitres/chapitre4.html`<br>Ch. 5 → `chapitres/chapitre5.html`<br>Ch. 6 → `chapitres/chapitre6.html`<br>Cartes → `chapitres/cartes.html`<br>Mémo → `chapitres/formules.html`<br>Exercices → `exercices/exercices.html`<br>Atelier → `atelier.html`<br>Examen → `chapitres/simulateur-examen.html` |

Liens sortants : **30** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| React B2 | `index.html` | `react/index.html` | interne |
| Sommaire | `sommaire.html` | `react/sommaire.html` | interne |
| Ch. 1 | `chapitres/chapitre1.html` | `react/chapitres/chapitre1.html` | interne |
| Ch. 2 | `chapitres/chapitre2.html` | `react/chapitres/chapitre2.html` | interne |
| Ch. 3 | `chapitres/chapitre3.html` | `react/chapitres/chapitre3.html` | interne |
| Ch. 4 | `chapitres/chapitre4.html` | `react/chapitres/chapitre4.html` | interne |
| Ch. 5 | `chapitres/chapitre5.html` | `react/chapitres/chapitre5.html` | interne |
| Ch. 6 | `chapitres/chapitre6.html` | `react/chapitres/chapitre6.html` | interne |
| Cartes | `chapitres/cartes.html` | `react/chapitres/cartes.html` | interne |
| Mémo | `chapitres/formules.html` | `react/chapitres/formules.html` | interne |
| Exercices | `exercices/exercices.html` | `react/exercices/exercices.html` | interne |
| Atelier | `atelier.html` | `react/atelier.html` | interne |
| Examen | `chapitres/simulateur-examen.html` | `react/chapitres/simulateur-examen.html` | interne |
| atelier de code | `atelier.html` | `react/atelier.html` | interne |
| 1 Penser en composants & l’écosystème JSX / Vite Paradigme déclaratif, modèle mental de React, outillage Vite, syntaxe J | `chapitres/chapitre1.html` | `react/chapitres/chapitre1.html` | interne |
| 2 Composants fonctionnels & transmission de props Fonctions composants, déstructuration, valeurs par défaut, prop childr | `chapitres/chapitre2.html` | `react/chapitres/chapitre2.html` | interne |
| 3 État local (useState) & formulaires contrôlés Hook useState, cycle de ré-exécution, événements synthétiques, inputs co | `chapitres/chapitre3.html` | `react/chapitres/chapitre3.html` | interne |
| 4 Rendu conditionnel, listes & clés dynamiques Opérateurs ternaires, court-circuit logique, map(), prop key, réconciliat | `chapitres/chapitre4.html` | `react/chapitres/chapitre4.html` | interne |
| 5 Effets de bord (useEffect) & requêtes asynchrones Hook useEffect, cycle de vie, tableau de dépendances, cleanup functi | `chapitres/chapitre5.html` | `react/chapitres/chapitre5.html` | interne |
| 6 Navigation avec React Router & architecture globale Single Page Application, BrowserRouter, Routes, Link, useParams, O | `chapitres/chapitre6.html` | `react/chapitres/chapitre6.html` | interne |
| Cartes de révision Toutes les notions clés des 6 chapitres à mémoriser. | `chapitres/cartes.html` | `react/chapitres/cartes.html` | interne |
| Mémo syntaxe React JSX, Hooks, gestion d’état et React Router sur une seule page. | `chapitres/formules.html` | `react/chapitres/formules.html` | interne |
| … | | | 5 lien(s) supplementaire(s) |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Table des matieres : une entree par chapitre, numero accentue, duree, badge « Acces libre » ou verrou.
- Ressources transverses : cartes Flashcards, Memo, Exercices, Atelier, Examens blancs.
- Actions : retour a l'accueil du cours et « Commencer le chapitre 1 ».
- Etat verrouille (chapitres 2+) : icone cadenas et mention « B1 et plus » / « Reserve B3 ».

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 16 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-lock`, `#i-cards`, `#i-file`, `#i-blocks`, `#i-terminal`, `#i-clipboard`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~380 mots · 174 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 26. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 14 |
| `toc__item` | 11 |
| `toc__n` | 11 |
| `toc__t` | 11 |
| `toc__d` | 11 |
| `locknote` | 6 |
| `toc` | 2 |
| `btn` | 2 |
| `skip-nav` | 1 |
| `skip-link` | 1 |
| `reactnav` | 1 |
| `reactnav__in` | 1 |
| `reactnav__home` | 1 |
| `reactnav__sep` | 1 |
| `reactnav__brand` | 1 |
| `reactnav__links` | 1 |
| `is-active` | 1 |
| `reactnav__actions` | 1 |
| `theme-toggle` | 1 |
| `theme-toggle__sun` | 1 |

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
