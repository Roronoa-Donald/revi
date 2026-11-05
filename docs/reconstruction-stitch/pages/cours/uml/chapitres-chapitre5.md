# Chapitre 5 — Diagramme d’Activités, Flux de Contrôle, Fork/Join & Swimlanes

> Fiche extraite du fichier `uml/chapitres/chapitre5.html` (519 lignes, 35.6 Ko, sha256 `a18f2ba6d087`).
> Famille : **cours-uml** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/uml/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Diagramme d’Activités, Flux de Contrôle, Fork/Join &amp; Swimlanes \| UML B2 |
| Description meta | Chapitre 5 du cours UML B2 : Formalisation des processus métier et algorithmes, nœuds d’action, décisions et fusions (losanges), parallélisme par barres Fork / Join, couloirs de responsabilités (swimlanes), flux d’objets et synchronisation des jetons (token semantics). Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Diagramme d’Activités, Flux de Contrôle, Fork/Join & Swimlanes |
| 3 | h2 | — | 1. Nœuds Fondamentaux et Sémantique des Jetons |
| 4 | h2 | — | 2. Décision, Fusion et Parallélisme (Fork / Join) |
| 5 | h2 | — | 3. Couloirs de Responsabilités (Swimlanes) et Flux d’Objets |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Diagramme d’Activités, Flux de Contrôle, Fork/Join & Swimlanes
  - **H2** — 1. Nœuds Fondamentaux et Sémantique des Jetons
  - **H2** — 2. Décision, Fusion et Parallélisme (Fork / Join)
      - **H4** — Décision et Fusion (◊ Losange)
      - **H4** — Bifurcation et Jonction (─ Barre épaisse)
  - **H2** — 3. Couloirs de Responsabilités (Swimlanes) et Flux d’Objets
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur de chemin d'activité (décisions et gardes)
    - **H3** — Exercice 2 — Vérificateur de synchronisation Fork / Join
    - **H3** — Exercice 3 — Partitionneur de responsabilités (Couloirs Swimlanes)
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
| Chapitre 6 — Machines à États, Composants & Déploiement Physique | `chapitre6.html` | `uml/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Un rectangle à coins arrondis |  | — | `opt` | — | actif | — |
| Un losange avec une entrée et plusieurs sorties gardées |  | — | `opt` | — | actif | data-correct=1 |
| Une barre noire épaisse horizontale |  | — | `opt` | — | actif | — |
| Un cercle barré d’une croix |  | — | `opt` | — | actif | — |
| Il laisse passer le premier jeton arrivé et ignore les suivants |  | — | `opt` | — | actif | — |
| Il attend qu’un jeton soit présent sur CHACUNE de ses transitions entrantes avant d’émettr |  | — | `opt` | — | actif | data-correct=1 |
| Il duplique le jeton entrant vers toutes les sorties |  | — | `opt` | — | actif | — |
| Il détruit l’intégralité de l’activité en cours |  | — | `opt` | — | actif | — |
| Le final d’activité détruit la base de données SQL, le final de flux ferme le réseau |  | — | `opt` | — | actif | — |
| Le final d’activité stoppe immédiatement l’intégralité de l’activité et tue tous les jeton |  | — | `opt` | — | actif | data-correct=1 |
| Il n’y a aucune différence, ce sont deux variantes cosmétiques |  | — | `opt` | — | actif | — |
| Le final de flux ne peut être placé que dans une Swimlane administrateur |  | — | `opt` | — | actif | — |
| Les Lifelines |  | — | `opt` | — | actif | — |
| Les Swimlanes (ou partitions) |  | — | `opt` | — | actif | data-correct=1 |
| Les Packages composites |  | — | `opt` | — | actif | — |
| Les Threads pools |  | — | `opt` | — | actif | — |
| Le diagramme s’exécute deux fois plus vite |  | — | `opt` | — | actif | — |
| Le système se bloque définitivement (Deadlock) car la barre Join attend deux jetons, alors |  | — | `opt` | — | actif | data-correct=1 |
| La barre Join se transforme automatiquement en nœud de fusion |  | — | `opt` | — | actif | — |
| C’est la syntaxe recommandée par l’OMG |  | — | `opt` | — | actif | — |
| Un cercle blanc vide |  | — | `opt` | — | actif | — |
| Un disque noir plein |  | — | `opt` | — | actif | data-correct=1 |
| Un losange jaune |  | — | `opt` | — | actif | — |
| Un rectangle avec une flèche |  | — | `opt` | — | actif | — |
| Des parenthèses (condition) |  | — | `opt` | — | actif | — |
| Des crochets [condition] |  | — | `opt` | — | actif | data-correct=1 |
| Des accolades {condition} |  | — | `opt` | — | actif | — |
| Des guillemets "condition" |  | — | `opt` | — | actif | — |
| Par un rectangle classique portant le nom de l’objet et son état entre crochets (ex: Factu |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `um2-c5-e1` | analyse | 300 | active | `VAR stock=10 ACTION INITIAL -> VerifierStock DECISION VerifierStock [stock > 0] -> PreparerColis \| [else] -> Reapprovisionner ACTION PreparerColis -> Expédier ACTION Expédier -> FIN FINAL FIN` | Exercice 1 — Simulateur de chemin d'activité (décisions et gardes) |
| `um2-c5-e2` | analyse | 300 | active | `FORK F1 -> B_Facturation,B_Livraison JOIN J1 <- B_Facturation,B_Livraison COMPLETE B_Facturation COMPLETE B_Livraison` | Exercice 2 — Vérificateur de synchronisation Fork / Join |
| `um2-c5-e3` | analyse | 300 | active | `SWIMLANE Client : SaisirCommande,Payer SWIMLANE Logistique : PreparerColis,Expedier SEQUENCE SaisirCommande -> Payer -> PreparerColis -> Expedier` | Exercice 3 — Partitionneur de responsabilités (Couloirs Swimlanes) |

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

- Tableaux : 0
- Blocs `pre` : 3 · elements `code` : 18
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-layers`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3156 mots · 422 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

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
| `lab__body` | 3 |
| `lab__formative-notice` | 3 |

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
