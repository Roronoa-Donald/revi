# Chapitre 5 — Automatisation & CI/CD avec GitHub Actions

> Fiche extraite du fichier `b3-github/chapitres/chapitre5.html` (492 lignes, 38.0 Ko, sha256 `8a84e0171dbd`).
> Famille : **cours-b3-github** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-github/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Automatisation &amp; CI/CD avec GitHub Actions \| Git & GitHub B3 |
| Description meta | Chapitre 5 du cours Git & GitHub B3 : Syntaxe déclarative YAML, événements déclencheurs, runners, stratégie matricielle multi-plateforme (strategy.matrix), gestion des secrets et durcissement contre les injections de commandes. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Automatisation & CI/CD avec GitHub Actions |
| 3 | h2 | — | 1. Anatomie d’un Pipeline CI/CD : Workflows, Événements, Jobs & Runners |
| 4 | h2 | — | 2. Stratégie Matricielle (strategy.matrix) : Parallélisation Multi-Axes |
| 5 | h2 | — | 3. Sécurité des Workflows : Faille Critique d’Injection de Commande Shell |
| 6 | h2 | — | 4. Secrets de Dépôt, Principe du Moindre Privilège & GITHUB_TOKEN |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Automatisation & CI/CD avec GitHub Actions
  - **H2** — 1. Anatomie d’un Pipeline CI/CD : Workflows, Événements, Jobs & Runners
      - **H4** — Structure Hiérarchique
      - **H4** — Étapes & Actions Réutilisables
  - **H2** — 2. Stratégie Matricielle (strategy.matrix) : Parallélisation Multi-Axes
  - **H2** — 3. Sécurité des Workflows : Faille Critique d’Injection de Commande Shell
  - **H2** — 4. Secrets de Dépôt, Principe du Moindre Privilège & GITHUB_TOKEN
      - **H4** — 1. Les Secrets GitHub (Encrypted Secrets)
      - **H4** — 2. Le Token Automatique GITHUB_TOKEN
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Validateur de structure de workflow GitHub Actions
    - **H3** — Exercice 2 — Générateur et évaluateur de matrice de build (strategy: matrix)
    - **H3** — Exercice 3 — Détecteur d’injections de commandes et fuites de secrets dans les Actions
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
| Chapitre 6 — Administration Avancée, LFS, Hooks & Purge d’Historique | `chapitre6.html` | `b3-github/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| .github/actions/ |  | — | `opt` | — | actif | — |
| .github/workflows/ |  | — | `opt` | — | actif | data-correct=1 |
| .git/workflows/ |  | — | `opt` | — | actif | — |
| ci/pipelines/ |  | — | `opt` | — | actif | — |
| Ils s’exécutent en série l’un après l’autre dans l’ordre du fichier |  | — | `opt` | — | actif | — |
| Ils s’exécutent en parallèle simultanément sur des runners indépendants |  | — | `opt` | — | actif | data-correct=1 |
| Le premier bloque l’exécution du second jusqu’à approbation manuelle |  | — | `opt` | — | actif | — |
| Le second écrase automatiquement les résultats du premier |  | — | `opt` | — | actif | — |
| Parce que GitHub Actions ne supporte pas la commande echo sous Linux |  | — | `opt` | — | actif | — |
| Parce qu’un attaquant peut nommer sa branche avec des métacaractères shell pour exécuter d |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le nom de branche est effacé par le runner avant l’exécution |  | — | `opt` | — | actif | — |
| Parce que cette syntaxe consomme deux fois plus de crédits de calcul |  | — | `opt` | — | actif | — |
| L’encoder en base64 dans le message de commit |  | — | `opt` | — | actif | — |
| Le transmettre via « env: », citer l’expansion et valider la valeur selon son usage |  | — | `opt` | — | actif | data-correct=1 |
| Désactiver l’interpréteur bash au profit de sh standard |  | — | `opt` | — | actif | — |
| Exécuter le workflow uniquement sur des machines Windows |  | — | `opt` | — | actif | — |
| Exactement 2 jobs (ubuntu avec 18, et windows avec 20) |  | — | `opt` | — | actif | — |
| Exactement 4 jobs correspondant au produit cartésien de tous les axes |  | — | `opt` | — | actif | data-correct=1 |
| 1 seul job qui alterne les systèmes d’exploitation |  | — | `opt` | — | actif | — |
| Une erreur de syntaxe si le mot-clé axes: n’est pas spécifié |  | — | `opt` | — | actif | — |
| Le workflow s’arrête immédiatement dès qu’un job réussit |  | — | `opt` | — | actif | — |
| Tous les autres jobs de la matrice continuent de s’exécuter même si l’un d’eux échoue |  | — | `opt` | — | actif | data-correct=1 |
| Les erreurs de tests sont ignorées et le statut final est toujours vert |  | — | `opt` | — | actif | — |
| La matrice est exécutée séquentiellement pour économiser de la mémoire |  | — | `opt` | — | actif | — |
| permissions: { contents: read } |  | — | `opt` | — | actif | data-correct=1 |
| security: { read-only: true } |  | — | `opt` | — | actif | — |
| auth: { level: minimal } |  | — | `opt` | — | actif | — |
| token: { write: false } |  | — | `opt` | — | actif | — |
| Pour accélérer le téléchargement depuis le cache local |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gh3-c5-e1` | shell | 300 | suspendue | `NAME=CI-Pipeline TRIGGERS=push,pull_request JOB id=build runs_on=ubuntu-latest steps_count=3` | Exercice 1 — Validateur de structure de workflow GitHub Actions |
| `gh3-c5-e2` | shell | 300 | suspendue | `MATRIX_DEF os=ubuntu,macos version=3.11,3.12 EXCLUDE os=macos version=3.11` | Exercice 2 — Générateur et évaluateur de matrice de build (strategy: matrix) |
| `gh3-c5-e3` | shell | 300 | suspendue | `STEP_INSPECT id=1 cmd=echo "Le titre est ${{ github.event.issue.title }}" STEP_INSPECT id=2 cmd=echo ${{ secrets.AWS_KEY }}` | Exercice 3 — Détecteur d’injections de commandes et fuites de secrets dans les Actions |

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

- Tableaux : 0
- Blocs `pre` : 11 · elements `code` : 57
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3199 mots · 466 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

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
| `card` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |

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
