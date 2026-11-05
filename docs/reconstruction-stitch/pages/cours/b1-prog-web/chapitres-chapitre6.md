# Chapitre 6 — JavaScript : le DOM et les événements

> Fiche extraite du fichier `b1-prog-web/chapitres/chapitre6.html` (528 lignes, 32.2 Ko, sha256 `ad4dc09eddf6`).
> Famille : **cours-b1-prog-web** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-prog-web/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — JavaScript : le DOM et les événements \| Prog. Web B1 |
| Description meta | Chapitre 6 du cours de programmation web B1 : Chargement du script, variables et fonctions, tableaux, sélection et modification du DOM, événements, sûreté. Théorie, exemples de code, exercices JavaScript exécutables, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — JavaScript : le DOM et les événements |
| 3 | h2 | — | 1. Où et quand un script s’exécute |
| 4 | h2 | — | 2. Variables, types et fonctions |
| 5 | h2 | — | 3. Tableaux : transformer plutôt que boucler |
| 6 | h2 | — | 4. Le DOM : sélectionner et modifier |
| 7 | h2 | — | 5. Les événements |
| 8 | h2 | — | 6. Écrire du JavaScript sûr |
| 9 | h2 | — | 7. Exercices de code |
| 10 | h2 | — | 8. QCM — niveau examen |
| 11 | h2 | — | 9. Erreurs classiques — récapitulatif |
| 12 | h2 | — | 10. Méthodologie de résolution |
| 13 | h2 | — | 11. Révision active |
| 14 | h2 | — | 12. Test de maîtrise |
| 15 | .lab | code lab | 3 bloc(s) |
| 16 | .qcm | QCM | 6 question(s) |
| 17 | table | — | 3 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — JavaScript : le DOM et les événements
  - **H2** — 1. Où et quand un script s’exécute
  - **H2** — 2. Variables, types et fonctions
  - **H2** — 3. Tableaux : transformer plutôt que boucler
  - **H2** — 4. Le DOM : sélectionner et modifier
  - **H2** — 5. Les événements
  - **H2** — 6. Écrire du JavaScript sûr
  - **H2** — 7. Exercices de code
    - **H3** — Exercice 1 — Construire une liste HTML depuis des données
    - **H3** — Exercice 2 — Filtrer et trier un tableau
    - **H3** — Exercice 3 — Simuler un gestionnaire d’événements
  - **H2** — 8. QCM — niveau examen
  - **H2** — 9. Erreurs classiques — récapitulatif
  - **H2** — 10. Méthodologie de résolution
  - **H2** — 11. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 12 notions à connaître absolument
  - **H2** — 12. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `webnav` | Portail → `/`<br>Prog. Web B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Prog. Web B1 | `../index.html` | `b1-prog-web/index.html` | interne |
| Sommaire | `../sommaire.html` | `b1-prog-web/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b1-prog-web/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b1-prog-web/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b1-prog-web/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b1-prog-web/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b1-prog-web/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b1-prog-web/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b1-prog-web/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b1-prog-web/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `b1-prog-web/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `b1-prog-web/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `b1-prog-web/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b1-prog-web/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b1-prog-web/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `b1-prog-web/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| il s’exécute après l’analyse du HTML |  | — | `opt` | — | actif | data-correct=1 |
| il s’exécute plus vite |  | — | `opt` | — | actif | — |
| il ne peut pas échouer |  | — | `opt` | — | actif | — |
| var |  | — | `opt` | — | actif | — |
| let |  | — | `opt` | — | actif | — |
| const |  | — | `opt` | — | actif | data-correct=1 |
| filter |  | — | `opt` | — | actif | — |
| map |  | — | `opt` | — | actif | data-correct=1 |
| sort |  | — | `opt` | — | actif | — |
| undefined |  | — | `opt` | — | actif | — |
| null |  | — | `opt` | — | actif | data-correct=1 |
| un tableau vide |  | — | `opt` | — | actif | — |
| il annule le rechargement de la page |  | — | `opt` | — | actif | data-correct=1 |
| il désactive le formulaire |  | — | `opt` | — | actif | — |
| il valide les champs |  | — | `opt` | — | actif | — |
| innerHTML |  | — | `opt` | — | actif | — |
| textContent |  | — | `opt` | — | actif | data-correct=1 |
| insertAdjacentHTML |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `web-c6-e1` | javascript | 300 | suspendue | `2 Ada 18 Linus 15` | Exercice 1 — Construire une liste HTML depuis des données |
| `web-c6-e2` | javascript | 300 | suspendue | `3 Ada 18 Bob 8 Chloe 15` | Exercice 2 — Filtrer et trier un tableau |
| `web-c6-e3` | javascript | 300 | suspendue | `4 click click reset click` | Exercice 3 — Simuler un gestionnaire d’événements |

- QCM : 1 bloc(s), **6 question(s)**.
- Encadres pedagogiques : 12 (`.box`, variantes `box--*`).
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

- Tableaux : 3 (0 lignes / 3 en-tetes ; 0 lignes / 3 en-tetes ; 0 lignes / 2 en-tetes)
- Blocs `pre` : 12 · elements `code` : 89
- SVG inline : 26 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-globe`, `#i-play`, `#i-target`, `#i-terminal`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-lightbulb`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2560 mots · 529 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 64. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 24 |
| `opt` | 18 |
| `box` | 12 |
| `box__title` | 12 |
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
| `lab__training` | 3 |

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
