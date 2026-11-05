# Chapitre 1 — Modèle Objet Git & Arborescence Interne

> Fiche extraite du fichier `b3-github/chapitres/chapitre1.html` (513 lignes, 37.5 Ko, sha256 `9920abbd8bff`).
> Famille : **cours-b3-github** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-github/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Modèle Objet Git &amp; Arborescence Interne \| Git & GitHub B3 |
| Description meta | Chapitre 1 du cours Git & GitHub B3 : Anatomie du dossier .git, modèle objet immuable (blobs, trees, commits, tags), hachage SHA-1/SHA-256, adressage par contenu et commandes de plomberie. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Modèle Objet Git & Arborescence Interne |
| 3 | h2 | — | 1. Anatomie Interne du Dossier .git & Système Adressable par Contenu |
| 4 | h2 | — | 2. Les Quatre Types Fondamentaux d’Objets Git |
| 5 | h2 | — | 3. Cryptographie du Graphe : Hachage SHA, Immuabilité & Arbre de Merkle |
| 6 | h2 | — | 4. Commandes de Plomberie vs Porcelaine : Contrôle de Bas Niveau |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Modèle Objet Git & Arborescence Interne
  - **H2** — 1. Anatomie Interne du Dossier .git & Système Adressable par Contenu
      - **H4** — Architecture du Dossier .git/
      - **H4** — Principe de l’Adressage par Contenu
  - **H2** — 2. Les Quatre Types Fondamentaux d’Objets Git
  - **H2** — 3. Cryptographie du Graphe : Hachage SHA, Immuabilité & Arbre de Merkle
  - **H2** — 4. Commandes de Plomberie vs Porcelaine : Contrôle de Bas Niveau
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)
    - **H3** — Exercice 2 — Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)
    - **H3** — Exercice 3 — Résolveur de références symboliques & pointeur HEAD (git rev-parse)
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
| Chapitre 2 — Stratégies de Fusion Avancées & Rebase Interactif | `chapitre2.html` | `b3-github/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le nom du fichier, ses permissions Unix et son contenu brut |  | — | `opt` | — | actif | — |
| Uniquement le contenu brut du fichier, sans nom ni droits d’accès |  | — | `opt` | — | actif | data-correct=1 |
| Le chemin d’accès relatif, la date de modification et le hash SHA-1 |  | — | `opt` | — | actif | — |
| L’historique des deltas et modifications ligne par ligne du fichier |  | — | `opt` | — | actif | — |
| sha1("blob 10:" + contenu) |  | — | `opt` | — | actif | — |
| sha1("blob 10\0" + contenu) |  | — | `opt` | — | actif | data-correct=1 |
| sha1(contenu + "\0blob 10") |  | — | `opt` | — | actif | — |
| sha1("file 10 " + contenu) |  | — | `opt` | — | actif | — |
| Dans le fichier .git/config du dépôt local |  | — | `opt` | — | actif | — |
| Dans l’en-tête de l’objet blob lui-même |  | — | `opt` | — | actif | — |
| Dans les entrées de l’objet tree parent |  | — | `opt` | — | actif | data-correct=1 |
| Dans les métadonnées de l’objet commit |  | — | `opt` | — | actif | — |
| À afficher le type de l’objet Git (blob, tree, commit ou tag) |  | — | `opt` | — | actif | data-correct=1 |
| À imprimer le contenu formatté du fichier |  | — | `opt` | — | actif | — |
| À tester si le hash correspond à une branche distante |  | — | `opt` | — | actif | — |
| À transformer un objet SHA-1 en objet SHA-256 |  | — | `opt` | — | actif | — |
| Le hash SHA-1 direct du dernier commit de la branche |  | — | `opt` | — | actif | — |
| La chaîne « ref: refs/heads/main » |  | — | `opt` | — | actif | data-correct=1 |
| L’arbre racine (root tree) de la copie de travail |  | — | `opt` | — | actif | — |
| La liste de tous les commits créés au cours de la session courante |  | — | `opt` | — | actif | — |
| Seul le hash du blob est modifié, le reste du dépôt conserve les mêmes hashes |  | — | `opt` | — | actif | — |
| Le hash du blob, du tree parent et de tous les commits ancêtres subséquents sont recalculé |  | — | `opt` | — | actif | data-correct=1 |
| Le fichier .git/index est corrompu et doit être réinitialisé via git init |  | — | `opt` | — | actif | — |
| Git stocke un patch de différence sans toucher à la chaîne des objets SHA |  | — | `opt` | — | actif | — |
| git commit-tree |  | — | `opt` | — | actif | — |
| git write-tree |  | — | `opt` | — | actif | — |
| git hash-object -w |  | — | `opt` | — | actif | data-correct=1 |
| git update-ref |  | — | `opt` | — | actif | — |
| Aucun parent (0 parent) |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gh3-c1-e1` | shell | 300 | suspendue | `OBJECT type=blob content=hello world` | Exercice 1 — Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object) |
| `gh3-c1-e2` | shell | 300 | suspendue | `ENTRY mode=100644 type=blob sha1=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2 name=README.md ENTRY mode=040000 type=tree sha1=b1c2d3e4f5a6b1c2d3e4f5a6b1c2d3e4f5a6b1c2 name=src` | Exercice 2 — Parseur d’arbre Git et inspection de hiérarchie (git ls-tree) |
| `gh3-c1-e3` | shell | 300 | suspendue | `REF name=refs/heads/main target=c0ffee1234567890abcdef1234567890abcdef12 REF name=HEAD target=ref: refs/heads/main RESOLVE name=HEAD` | Exercice 3 — Résolveur de références symboliques & pointeur HEAD (git rev-parse) |

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

- Tableaux : 2 (0 lignes / 4 en-tetes ; 0 lignes / 3 en-tetes)
- Blocs `pre` : 7 · elements `code` : 70
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-code`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3229 mots · 509 noeuds HTML

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
