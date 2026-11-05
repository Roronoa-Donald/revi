# Atelier d’études de cas

> Fiche extraite du fichier `droit/atelier.html` (165 lignes, 10.1 Ko, sha256 `c252f4ba48a0`).
> Famille : **cours-droit** · sous-type : `atelier` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/droit/atelier.html` |
| Titre du document | Atelier d’études de cas : simuler le droit \| Droit Informatique B2 |
| Description meta | Atelier d’études de cas du cours de Droit informatique B2 : éditeur dans le navigateur, exécution réelle du grille d’analyse, entrée standard, console de sortie et tuteur qui explique les erreurs. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Atelier d’études de cas |
| 3 | h2 | — | Zone libre |
| 4 | h2 | — | De la page au vrai dossier |
| 5 | h2 | — | Ensuite |
| 6 | .lab | code lab | 1 bloc(s) |

## 3. Hierarchie des titres

- **H1** — Atelier d’études de cas
  - **H2** — Zone libre
    - **H3** — Zone libre : sanction maximale du RGPD
  - **H2** — De la page au vrai dossier
  - **H2** — Ensuite

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `droitnav` | Portail → `/`<br>Droit Informatique B2 → `index.html`<br>Sommaire → `sommaire.html`<br>Ch. 1 → `chapitres/chapitre1.html`<br>Ch. 2 → `chapitres/chapitre2.html`<br>Ch. 3 → `chapitres/chapitre3.html`<br>Ch. 4 → `chapitres/chapitre4.html`<br>Ch. 5 → `chapitres/chapitre5.html`<br>Ch. 6 → `chapitres/chapitre6.html`<br>Cartes → `chapitres/cartes.html`<br>Mémo → `chapitres/formules.html`<br>Exercices → `exercices/exercices.html`<br>Atelier → `atelier.html`<br>Examen → `chapitres/simulateur-examen.html` |

Liens sortants : **19** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Droit Informatique B2 | `index.html` | `droit/index.html` | interne |
| Sommaire | `sommaire.html` | `droit/sommaire.html` | interne |
| Ch. 1 | `chapitres/chapitre1.html` | `droit/chapitres/chapitre1.html` | interne |
| Ch. 2 | `chapitres/chapitre2.html` | `droit/chapitres/chapitre2.html` | interne |
| Ch. 3 | `chapitres/chapitre3.html` | `droit/chapitres/chapitre3.html` | interne |
| Ch. 4 | `chapitres/chapitre4.html` | `droit/chapitres/chapitre4.html` | interne |
| Ch. 5 | `chapitres/chapitre5.html` | `droit/chapitres/chapitre5.html` | interne |
| Ch. 6 | `chapitres/chapitre6.html` | `droit/chapitres/chapitre6.html` | interne |
| Cartes | `chapitres/cartes.html` | `droit/chapitres/cartes.html` | interne |
| Mémo | `chapitres/formules.html` | `droit/chapitres/formules.html` | interne |
| Exercices | `exercices/exercices.html` | `droit/exercices/exercices.html` | interne |
| Atelier | `atelier.html` | `droit/atelier.html` | interne |
| Examen | `chapitres/simulateur-examen.html` | `droit/chapitres/simulateur-examen.html` | interne |
| Chapitre 1 : Notions générales | `chapitres/chapitre1.html` | `droit/chapitres/chapitre1.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `(zone libre)` | analyse | 360 | active | `600000000` | Zone libre : sanction maximale du RGPD |

- Encadres pedagogiques : 3 (`.box`, variantes `box--*`).

Etats et interactions a reconstruire :

- Zone libre `data-lab` avec code de depart, entree standard pre-remplie, console, tuteur IA.
- Execution uniquement au clic (ou Ctrl+Entree) ; bouton Stop pendant l'execution.
- Etats de statut : pret, execution, succes, erreur, delai depasse, quota, service indisponible.
- Encadres explicatifs et trois erreurs classiques.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 2 · elements `code` : 5
- SVG inline : 10 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-scale`, `#i-target`, `#i-book`, `#i-warning`, `#i-terminal`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~648 mots · 138 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 2

## 10. Classes et attributs data observes

Classes distinctes : 37. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 8 |
| `box` | 3 |
| `box__title` | 3 |
| `lab__sample-part` | 2 |
| `btn` | 2 |
| `skip-nav` | 1 |
| `skip-link` | 1 |
| `droitnav` | 1 |
| `droitnav__in` | 1 |
| `droitnav__home` | 1 |
| `droitnav__sep` | 1 |
| `droitnav__brand` | 1 |
| `droitnav__links` | 1 |
| `is-active` | 1 |
| `droitnav__actions` | 1 |
| `theme-toggle` | 1 |
| `theme-toggle__sun` | 1 |
| `theme-toggle__moon` | 1 |
| `droitwrap` | 1 |
| `crumb` | 1 |

Attributs `data-*` : `data-lab` (1), `data-language` (1), `data-height` (1), `data-languages` (1), `data-stdin` (1), `data-lab-starter` (1)

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
