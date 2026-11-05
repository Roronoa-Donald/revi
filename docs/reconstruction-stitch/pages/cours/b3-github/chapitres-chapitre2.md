# Chapitre 2 — Stratégies de Fusion Avancées & Rebase Interactif

> Fiche extraite du fichier `b3-github/chapitres/chapitre2.html` (475 lignes, 36.9 Ko, sha256 `2b6474a2608a`).
> Famille : **cours-b3-github** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-github/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Stratégies de Fusion Avancées &amp; Rebase Interactif \| Git & GitHub B3 |
| Description meta | Chapitre 2 du cours Git & GitHub B3 : Fast-Forward vs 3-Way Merge, calcul du Lowest Common Ancestor (LCA), stratégies recursive et ort, rebase interactif, squash et arbitrage formel des conflits. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Stratégies de Fusion Avancées & Rebase Interactif |
| 3 | h2 | — | 1. Topologie des Fusions : Fast-Forward vs 3-Way Merge & Lowest Common Ancestor |
| 4 | h2 | — | 2. Les Moteurs de Fusion Git : De « recursive » à « ORT » |
| 5 | h2 | — | 3. Le Rebase Interactif : Nettoyage d’Historique & la Règle d’Or |
| 6 | h2 | — | 4. Résolution Formelle des Conflits de Fusion Tridirectionnelle |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 2 — Stratégies de Fusion Avancées & Rebase Interactif
  - **H2** — 1. Topologie des Fusions : Fast-Forward vs 3-Way Merge & Lowest Common Ancestor
      - **H4** — 1. La Fusion Linéaire (Fast-Forward)
      - **H4** — 2. La Fusion Tridirectionnelle (3-Way Merge)
  - **H2** — 2. Les Moteurs de Fusion Git : De « recursive » à « ORT »
  - **H2** — 3. Le Rebase Interactif : Nettoyage d’Historique & la Règle d’Or
  - **H2** — 4. Résolution Formelle des Conflits de Fusion Tridirectionnelle
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge
    - **H3** — Exercice 2 — Simulateur de Rebase Interactif (git rebase -i)
    - **H3** — Exercice 3 — Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)
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
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-githubnav` | Portail → `/`<br>Git & GitHub B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Git & GitHub B3 | `../index.html` | `b3-github/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-github/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-github/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-github/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-github/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-github/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-github/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-github/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-github/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-github/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-github/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-github/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-github/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-github/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-github/chapitres/formules.html` | interne |
| Chapitre 3 — Diagnostic, Reflog & Sauvetage de Données | `chapitre3.html` | `b3-github/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Lorsque les deux branches ont créé des commits différents au même moment |  | — | `opt` | — | actif | — |
| Lorsque la branche cible est un ancêtre direct de la branche source sans aucune divergence |  | — | `opt` | — | actif | data-correct=1 |
| Uniquement lorsque tous les fichiers modifiés ont des extensions différentes |  | — | `opt` | — | actif | — |
| Lorsque le dépôt est configuré avec le moteur de fusion ORT en mode multi-parents |  | — | `opt` | — | actif | — |
| Exactement 1 parent |  | — | `opt` | — | actif | — |
| Exactement 2 parents |  | — | `opt` | — | actif | data-correct=1 |
| 3 parents (l’ancêtre commun et les deux têtes) |  | — | `opt` | — | actif | — |
| Aucun parent (c’est un commit racine orphelin) |  | — | `opt` | — | actif | — |
| Il sert de point de référence neutre pour comparer les deltas intervenus sur chacune des d |  | — | `opt` | — | actif | data-correct=1 |
| Il supprime automatiquement tous les conflits de code sans intervention humaine |  | — | `opt` | — | actif | — |
| Il calcule l’empreinte SHA-256 finale du dépôt |  | — | `opt` | — | actif | — |
| Il verrouille la branche distante pendant l’opération |  | — | `opt` | — | actif | — |
| squash |  | — | `opt` | — | actif | — |
| fixup |  | — | `opt` | — | actif | data-correct=1 |
| reword |  | — | `opt` | — | actif | — |
| drop |  | — | `opt` | — | actif | — |
| Parce que le rebase consomme trop de bande passante réseau |  | — | `opt` | — | actif | — |
| Parce que le rebase modifie les hashes SHA de tous les commits rejoués, provoquant une div |  | — | `opt` | — | actif | data-correct=1 |
| Parce que Git bloque automatiquement les commandes rebase sur les serveurs distants |  | — | `opt` | — | actif | — |
| Parce que les fichiers binaires LFS sont supprimés lors du rebase |  | — | `opt` | — | actif | — |
| octopus |  | — | `opt` | — | actif | — |
| resolve |  | — | `opt` | — | actif | — |
| ORT (Ostensibly Recursive’s Twin) |  | — | `opt` | — | actif | data-correct=1 |
| subtree |  | — | `opt` | — | actif | — |
| Le code tel qu’il existait dans l’ancêtre commun LCA |  | — | `opt` | — | actif | — |
| La version présente sur la branche locale courante sur laquelle on se trouve |  | — | `opt` | — | actif | data-correct=1 |
| La version distante provenant de la branche en cours de fusion |  | — | `opt` | — | actif | — |
| Le code suggéré automatiquement par le serveur GitHub |  | — | `opt` | — | actif | — |
| git merge --ff-only |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gh3-c2-e1` | shell | 300 | suspendue | `COMMIT id=C1 parents=NONE COMMIT id=C2 parents=C1 COMMIT id=C3 parents=C2 BRANCH name=main commit=C1 BRANCH name=feature commit=C3 MERGE_REQUEST current=main incoming=feature` | Exercice 1 — Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge |
| `gh3-c2-e2` | shell | 300 | suspendue | `TODO action=pick commit=C1 msg=feat: ajout login TODO action=squash commit=C2 msg=fix: correction typo TODO action=reword commit=C3 msg=feat: ajout logout propre` | Exercice 2 — Simulateur de Rebase Interactif (git rebase -i) |
| `gh3-c2-e3` | shell | 300 | suspendue | `LINE idx=1 base=port = 80 ours=port = 443 theirs=port = 80 LINE idx=2 base=timeout = 30 ours=timeout = 60 theirs=timeout = 120` | Exercice 3 — Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs) |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 8 (`.box`, variantes `box--*`).
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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 7 · elements `code` : 58
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3197 mots · 488 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 20 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |
| `badge` | 3 |

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
