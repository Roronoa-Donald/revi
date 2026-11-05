# Chapitre 4 — Diagramme de Séquence, Lignes de Vie & Fragments Combinés

> Fiche extraite du fichier `uml/chapitres/chapitre4.html` (537 lignes, 34.9 Ko, sha256 `6e8d55bbad2e`).
> Famille : **cours-uml** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/uml/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Diagramme de Séquence, Lignes de Vie &amp; Fragments Combinés \| UML B2 |
| Description meta | Chapitre 4 du cours UML B2 : Modélisation des interactions temporelles, lignes de vie (lifelines), barres d’activation, typologie des messages (synchrones, asynchrones, retours), création/destruction d’objets, fragments combinés (alt, opt, loop, par) et détection des interblocages. Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Diagramme de Séquence, Lignes de Vie & Fragments Combinés |
| 3 | h2 | — | 1. Lignes de Vie, Barres d’Activation et Chronologie |
| 4 | h2 | — | 2. Typologie des Messages et Conventions Graphiques OMG |
| 5 | h2 | — | 3. Fragments Combinés d’Interaction (Combined Fragments) |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Diagramme de Séquence, Lignes de Vie & Fragments Combinés
  - **H2** — 1. Lignes de Vie, Barres d’Activation et Chronologie
  - **H2** — 2. Typologie des Messages et Conventions Graphiques OMG
  - **H2** — 3. Fragments Combinés d’Interaction (Combined Fragments)
      - **H4** — alt (Alternatives exclusives)
      - **H4** — opt (Comportement optionnel)
      - **H4** — loop (Boucle d’itération)
      - **H4** — par (Exécution parallèle)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur de trace de diagramme de séquence
    - **H3** — Exercice 2 — Évaluateur de fragments combinés (alt, opt, loop)
    - **H3** — Exercice 3 — Analyseur de synchronisme et concurrence de messages
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
| nav | `umlnav` | Portail → `/`<br>UML B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| UML B2 | `../index.html` | `uml/index.html` | interne |
| Sommaire | `../sommaire.html` | `uml/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `uml/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `uml/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `uml/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `uml/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `uml/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `uml/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `uml/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `uml/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `uml/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `uml/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `uml/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `uml/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `uml/chapitres/formules.html` | interne |
| Chapitre 5 — Diagramme d’Activités, Flux de Contrôle, Fork/Join & Swimlanes | `chapitre5.html` | `uml/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Un trait plein avec une tête de flèche triangulaire noire pleine fermée |  | — | `opt` | — | actif | data-correct=1 |
| Un trait tireté avec une flèche ouverte |  | — | `opt` | — | actif | — |
| Une double ligne avec un cercle blanc |  | — | `opt` | — | actif | — |
| Un trait ondulé rouge |  | — | `opt` | — | actif | — |
| Un trait plein avec un triangle blanc creux |  | — | `opt` | — | actif | — |
| Un trait tireté avec une tête de flèche ouverte simple |  | — | `opt` | — | actif | data-correct=1 |
| Un trait plein avec un losange noir |  | — | `opt` | — | actif | — |
| Une flèche pointant vers le haut |  | — | `opt` | — | actif | — |
| opt |  | — | `opt` | — | actif | — |
| loop |  | — | `opt` | — | actif | — |
| alt |  | — | `opt` | — | actif | data-correct=1 |
| par |  | — | `opt` | — | actif | — |
| opt comporte obligatoirement un bloc else, pas alt |  | — | `opt` | — | actif | — |
| alt gère des alternatives mutuellement exclusives (avec éventuellement else), alors que op |  | — | `opt` | — | actif | data-correct=1 |
| opt s’exécute toujours deux fois |  | — | `opt` | — | actif | — |
| alt ne fonctionne qu’en multithreading |  | — | `opt` | — | actif | — |
| Un point noir plein |  | — | `opt` | — | actif | — |
| Une grande croix «X» marquant la fin de la ligne de vie |  | — | `opt` | — | actif | data-correct=1 |
| Un point d’interrogation |  | — | `opt` | — | actif | — |
| La mention «DELETE» en lettres grasses |  | — | `opt` | — | actif | — |
| loop |  | — | `opt` | — | actif | — |
| par |  | — | `opt` | — | actif | data-correct=1 |
| alt |  | — | `opt` | — | actif | — |
| seq |  | — | `opt` | — | actif | — |
| De gauche à droite |  | — | `opt` | — | actif | — |
| De bas en haut |  | — | `opt` | — | actif | — |
| De haut en bas |  | — | `opt` | — | actif | data-correct=1 |
| Dans le sens des aiguilles d’une montre |  | — | `opt` | — | actif | — |
| Une ligne de vie qui n’a pas d’attributs |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `um2-c4-e1` | analyse | 300 | active | `Client -> Serveur : getCatalogue() Serveur -> BDD : queryAll() BDD --> Serveur : [art1, art2] Serveur --> Client : listeArticles` | Exercice 1 — Simulateur de trace de diagramme de séquence |
| `um2-c4-e2` | analyse | 300 | active | `VAR solde=200 ALT [solde >= 100]   Client -> Distributeur : delivrerBillets ELSE   Client -> Distributeur : refuserRetrait END_ALT` | Exercice 2 — Évaluateur de fragments combinés (alt, opt, loop) |
| `um2-c4-e3` | analyse | 300 | active | `SYNC Client ->> Serveur : getData ASYNC Serveur -> Logger : logEvent REPLY Serveur --> Client SYNC Client ->> Autre : check` | Exercice 3 — Analyseur de synchronisme et concurrence de messages |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 6 (`.box`, variantes `box--*`).
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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 3 · elements `code` : 36
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-layers`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3026 mots · 447 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
| `card` | 4 |
| `card-title` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |
| `badge` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
