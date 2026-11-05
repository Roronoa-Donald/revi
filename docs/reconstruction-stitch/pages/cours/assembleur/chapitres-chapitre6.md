# Chapitre 6 — Branchements, Pile d’Exécution, Fonctions & Appels Système

> Fiche extraite du fichier `assembleur/chapitres/chapitre6.html` (506 lignes, 33.8 Ko, sha256 `9be5c9290c3e`).
> Famille : **cours-assembleur** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/assembleur/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Branchements, Pile d’Exécution, Fonctions &amp; Appels Système \| Assembleur B2 |
| Description meta | Chapitre 6 du cours Architecture & Programmation en Assembleur B2 : Drapeaux et sauts conditionnels (Jcc), fonctionnement de la pile (PUSH/POP), conventions d’appel (cdecl et System V AMD64 ABI), cadre de pile et appels système (syscall / int 0x80). Notions fondamentales, ateliers Python interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Branchements, Pile d’Exécution, Fonctions & Appels Système |
| 3 | h2 | — | 1. Contrôle de flux : CMP et sauts conditionnels (Jcc) |
| 4 | h2 | — | 2. La pile d’exécution (Stack) et les instructions PUSH / POP |
| 5 | h2 | — | 3. Conventions d’appel : cdecl (32 bits) vs System V AMD64 ABI (64 bits) |
| 6 | h2 | — | 4. Anatomie du cadre de pile (Stack Frame) |
| 7 | h2 | — | 5. Appels système sous Linux (Syscalls) : 32 bits vs 64 bits |
| 8 | h2 | — | 6. Études de cas & applications pratiques |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 4 question(s) |
| 16 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Branchements, Pile d’Exécution, Fonctions & Appels Système
  - **H2** — 1. Contrôle de flux : CMP et sauts conditionnels (Jcc)
  - **H2** — 2. La pile d’exécution (Stack) et les instructions PUSH / POP
      - **H4** — Instruction PUSH opérande
      - **H4** — Instruction POP destination
  - **H2** — 3. Conventions d’appel : cdecl (32 bits) vs System V AMD64 ABI (64 bits)
  - **H2** — 4. Anatomie du cadre de pile (Stack Frame)
  - **H2** — 5. Appels système sous Linux (Syscalls) : 32 bits vs 64 bits
      - **H4** — Linux x86 (32 bits) : interruption logicielle int 0x80
      - **H4** — Linux x86_64 (64 bits) : instruction native SYSCALL
  - **H2** — 6. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur de pile x86 (PUSH & POP avec pointeur ESP)
    - **H3** — Exercice 2 — Évaluateur de sauts conditionnels x86 (CMP & Jcc)
    - **H3** — Exercice 3 — Modélisateur de cadre de pile (Stack Frame cdecl)
  - **H2** — 7. QCM — niveau examen
  - **H2** — 8. Erreurs classiques — récapitulatif
  - **H2** — 9. Méthodologie de résolution
  - **H2** — 10. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 10 notions à connaître absolument
  - **H2** — 11. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `assembleurnav` | Portail → `/`<br>Assembleur B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Assembleur B2 | `../index.html` | `assembleur/index.html` | interne |
| Sommaire | `../sommaire.html` | `assembleur/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `assembleur/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `assembleur/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `assembleur/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `assembleur/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `assembleur/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `assembleur/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `assembleur/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `assembleur/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `assembleur/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `assembleur/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `assembleur/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `assembleur/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `assembleur/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `assembleur/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| [ebp + 0] |  | — | `opt` | — | actif | — |
| [ebp + 4] |  | — | `opt` | — | actif | — |
| [ebp + 8] |  | — | `opt` | — | actif | data-correct=1 |
| [ebp - 4] |  | — | `opt` | — | actif | — |
| Parce que sur l’architecture x86, la pile croît vers les adresses mémoire décroissantes (b |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le registre ESP contient la taille totale allouée et non une adresse. |  | — | `opt` | — | actif | — |
| Parce que les microprocesseurs CISC travaillent exclusivement en nombres négatifs. |  | — | `opt` | — | actif | — |
| Pour éviter les conflits d’alignement avec le registre de base EBP. |  | — | `opt` | — | actif | — |
| RAX |  | — | `opt` | — | actif | — |
| RDI |  | — | `opt` | — | actif | data-correct=1 |
| RSI |  | — | `opt` | — | actif | — |
| Sur le sommet de la pile [RSP] |  | — | `opt` | — | actif | — |
| JL traite des entiers signés (SF ≠ OF) tandis que JB traite des entiers non-signés (CF = 1 |  | — | `opt` | — | actif | data-correct=1 |
| JL saute vers une adresse relative courte alors que JB permet un saut vers un segment dist |  | — | `opt` | — | actif | — |
| JB fonctionne uniquement sur microcontrôleur AVR alors que JL est propre à l’Intel x86. |  | — | `opt` | — | actif | — |
| Il n’y a aucune différence, ce sont deux alias stricts du même opcode binaire. |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `asm2-c6-e1` | analyse | 300 | active | `PUSH 10, PUSH 20, POP, PUSH 30` | Exercice 1 — Simulateur de pile x86 (PUSH & POP avec pointeur ESP) |
| `asm2-c6-e2` | analyse | 300 | active | `10;20;JL` | Exercice 2 — Évaluateur de sauts conditionnels x86 (CMP & Jcc) |
| `asm2-c6-e3` | analyse | 300 | active | `2;3` | Exercice 3 — Modélisateur de cadre de pile (Stack Frame cdecl) |

- QCM : 1 bloc(s), **4 question(s)**.
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

- Tableaux : 2 (0 lignes / 4 en-tetes ; 0 lignes / 3 en-tetes)
- Blocs `pre` : 6 · elements `code` : 79
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-warning`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3165 mots · 529 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `opt` | 16 |
| `box` | 8 |
| `box__title` | 8 |
| `card` | 4 |
| `card-title` | 4 |
| `q` | 4 |
| `q__stem` | 4 |
| `opts` | 4 |
| `q__exp` | 4 |
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

Attributs `data-*` : `data-correct` (4), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
