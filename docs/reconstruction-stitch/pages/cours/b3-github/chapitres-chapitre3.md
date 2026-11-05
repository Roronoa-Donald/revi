# Chapitre 3 — Diagnostic, Reflog & Sauvetage de Données

> Fiche extraite du fichier `b3-github/chapitres/chapitre3.html` (480 lignes, 35.8 Ko, sha256 `d13d698ec60e`).
> Famille : **cours-b3-github** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-github/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Diagnostic, Reflog &amp; Sauvetage de Données \| Git & GitHub B3 |
| Description meta | Chapitre 3 du cours Git & GitHub B3 : Journal de références git reflog, sauvetage de commits orphelins (dangling), recherche dichotomique de régressions avec git bisect, gestion de la pile LIFO git stash et intégrité avec git fsck. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Diagnostic, Reflog & Sauvetage de Données |
| 3 | h2 | — | 1. Le Journal de Références : git reflog & le Filet de Sécurité Ultime |
| 4 | h2 | — | 2. Objets Orphelins (Dangling) & Nettoyage Garbaged avec git fsck |
| 5 | h2 | — | 3. Isolation Dichotomique de Régressions : La Puissance de git bisect |
| 6 | h2 | — | 4. Gestion Avancée de la Pile de Remisage : L’Anatomie de git stash |
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

- **H1** — Chapitre 3 — Diagnostic, Reflog & Sauvetage de Données
  - **H2** — 1. Le Journal de Références : git reflog & le Filet de Sécurité Ultime
      - **H4** — Fonctionnement & Localisation
      - **H4** — Procédure de Sauvetage après « reset --hard »
  - **H2** — 2. Objets Orphelins (Dangling) & Nettoyage Garbaged avec git fsck
  - **H2** — 3. Isolation Dichotomique de Régressions : La Puissance de git bisect
      - **H4** — Complexité Algorithmique
      - **H4** — Workflow Interactif & Automatisé
  - **H2** — 4. Gestion Avancée de la Pile de Remisage : L’Anatomie de git stash
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)
    - **H3** — Exercice 2 — Détecteur de régression dichotomique automatique (git bisect)
    - **H3** — Exercice 3 — Gestionnaire de pile de remisage (git stash LIFO stack)
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
| Chapitre 4 — Workflows d’Équipe, Gouvernance & Protection de Branches | `chapitre4.html` | `b3-github/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Les mots de passe saisis lors du push distant |  | — | `opt` | — | actif | — |
| L’historique chronologique local de tous les mouvements du pointeur HEAD, y compris les co |  | — | `opt` | — | actif | data-correct=1 |
| Les adresses IP des serveurs distants connectés |  | — | `opt` | — | actif | — |
| Les signatures cryptographiques GPG des tags annotés |  | — | `opt` | — | actif | — |
| Dans le fichier .git/logs/HEAD |  | — | `opt` | — | actif | data-correct=1 |
| Dans .git/objects/reflog.db |  | — | `opt` | — | actif | — |
| Sur le serveur distant GitHub dans l’API GraphQL |  | — | `opt` | — | actif | — |
| Dans le fichier binaire .git/index |  | — | `opt` | — | actif | — |
| 500 étapes |  | — | `opt` | — | actif | — |
| 250 étapes |  | — | `opt` | — | actif | — |
| 9 étapes |  | — | `opt` | — | actif | data-correct=1 |
| 50 étapes |  | — | `opt` | — | actif | — |
| Le code 0 |  | — | `opt` | — | actif | data-correct=1 |
| Le code 1 |  | — | `opt` | — | actif | — |
| Le code 128 |  | — | `opt` | — | actif | — |
| Le code -1 |  | — | `opt` | — | actif | — |
| 24 heures |  | — | `opt` | — | actif | — |
| 30 jours |  | — | `opt` | — | actif | data-correct=1 |
| 1 an |  | — | `opt` | — | actif | — |
| Ils ne sont jamais purgés |  | — | `opt` | — | actif | — |
| git stash apply |  | — | `opt` | — | actif | — |
| git stash pop |  | — | `opt` | — | actif | data-correct=1 |
| git stash restore |  | — | `opt` | — | actif | — |
| git stash pull |  | — | `opt` | — | actif | — |
| À supprimer tous les fichiers non suivis de la copie de travail |  | — | `opt` | — | actif | — |
| À vérifier l’intégrité de la base d’objets et copier les commits orphelins dans .git/lost- |  | — | `opt` | — | actif | data-correct=1 |
| À réparer les dépendances corrompues dans package.json |  | — | `opt` | — | actif | — |
| À synchroniser les commits orphelins avec le miroir GitHub |  | — | `opt` | — | actif | — |
| git reset --hard HEAD@{1} |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gh3-c3-e1` | shell | 300 | suspendue | `ACTIVE_BRANCH name=main tip=C1 ancestors=NONE REFLOG_ENTRY id=HEAD@{0} commit=C1 action=reset desc=moving to C1 REFLOG_ENTRY id=HEAD@{1} commit=C3 action=commit desc=Feature perdue` | Exercice 1 — Explorateur de Reflog et récupération de commits orphelins (Dangling Commits) |
| `gh3-c3-e2` | shell | 300 | suspendue | `HISTORY commits=C1,C2,C3,C4,C5 STATUSES C1=GOOD C2=GOOD C3=BAD C4=BAD C5=BAD` | Exercice 2 — Détecteur de régression dichotomique automatique (git bisect) |
| `gh3-c3-e3` | shell | 300 | suspendue | `STASH_CMD action=push arg=WIP sur formulaire STASH_CMD action=pop` | Exercice 3 — Gestionnaire de pile de remisage (git stash LIFO stack) |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 7 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 7 · elements `code` : 69
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3064 mots · 492 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 19 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 7 |
| `box__title` | 7 |
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
