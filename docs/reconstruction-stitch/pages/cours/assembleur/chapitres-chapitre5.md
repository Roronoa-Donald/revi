# Chapitre 5 — Jeu d’Instructions x86/AVR, Transferts & Modes d’Adressage

> Fiche extraite du fichier `assembleur/chapitres/chapitre5.html` (475 lignes, 32.3 Ko, sha256 `89f7320af082`).
> Famille : **cours-assembleur** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/assembleur/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Jeu d’Instructions x86/AVR, Transferts &amp; Modes d’Adressage \| Assembleur B2 |
| Description meta | Chapitre 5 du cours Architecture & Programmation en Assembleur B2 : Règle d’or x86, instruction MOV, calcul d’adresse LEA, arithmétique (ADD, SUB, INC, DEC, NEG, IMUL, IDIV), modes d’adressage indexés et équivalents AVR. Notions fondamentales, ateliers Python interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Jeu d’Instructions x86/AVR, Transferts & Modes d’Adressage |
| 3 | h2 | — | 1. La règle d’or x86 & l’instruction de transfert MOV |
| 4 | h2 | — | 2. Les 5 modes d’adressage x86 (de l’immédiat à l’indexé) |
| 5 | h2 | — | 3. L’instruction LEA : le couteau suisse du calcul d’adresses |
| 6 | h2 | — | 4. Arithmétique x86 & équivalents microcontrôleur AVR |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Jeu d’Instructions x86/AVR, Transferts & Modes d’Adressage
  - **H2** — 1. La règle d’or x86 & l’instruction de transfert MOV
  - **H2** — 2. Les 5 modes d’adressage x86 (de l’immédiat à l’indexé)
  - **H2** — 3. L’instruction LEA : le couteau suisse du calcul d’adresses
  - **H2** — 4. Arithmétique x86 & équivalents microcontrôleur AVR
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Simulateur d’instructions MOV entre registres
    - **H3** — Exercice 2 — Calcul d’adresse effective LEA (Base + Index * Scale + Disp)
    - **H3** — Exercice 3 — Exécuteur d’opérations arithmétiques x86 (ADD, SUB, INC, DEC, NEG, XOR)
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 10 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

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
| Chapitre 6 — Branchements, Pile d’Exécution, Fonctions & Appels Système | `chapitre6.html` | `assembleur/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce que les formes de MOV ne codent pas deux opérandes mémoire explicites |  | — | `opt` | — | actif | data-correct=1 |
| Parce que les registres EAX et EBX sont réservés aux calculs flottants |  | — | `opt` | — | actif | — |
| Parce que les crochets sont interdits en syntaxe Intel |  | — | `opt` | — | actif | — |
| Parce que l’instruction MOV ne supporte que les constantes |  | — | `opt` | — | actif | — |
| MOV lit la valeur stockée en mémoire vive, tandis que LEA charge l’adresse arithmétique sa |  | — | `opt` | — | actif | data-correct=1 |
| MOV est plus rapide que LEA |  | — | `opt` | — | actif | — |
| LEA modifie les drapeaux EFLAGS et pas MOV |  | — | `opt` | — | actif | — |
| MOV est une instruction 64 bits et LEA une instruction 16 bits |  | — | `opt` | — | actif | — |
| Multiplication par 3 (EAX = 3 * EAX) |  | — | `opt` | — | actif | data-correct=1 |
| Multiplication par 2 |  | — | `opt` | — | actif | — |
| Élévation au carré (EAX = EAX²) |  | — | `opt` | — | actif | — |
| Division par 2 |  | — | `opt` | — | actif | — |
| 1, 2, 4 ou 8 uniquement |  | — | `opt` | — | actif | data-correct=1 |
| N’importe quel nombre entier de 1 à 255 |  | — | `opt` | — | actif | — |
| Uniquement les nombres impairs |  | — | `opt` | — | actif | — |
| Toutes les puissances de 10 |  | — | `opt` | — | actif | — |
| LDI R16, 42 |  | — | `opt` | — | actif | data-correct=1 |
| LDS R16, 42 |  | — | `opt` | — | actif | — |
| STS 42, R16 |  | — | `opt` | — | actif | — |
| MOV R16, 42 |  | — | `opt` | — | actif | — |
| Elle remplace le contenu de EAX par son opposé arithmétique en complément à 2 (EAX = -EAX) |  | — | `opt` | — | actif | data-correct=1 |
| Elle force le bit de signe à 1 |  | — | `opt` | — | actif | — |
| Elle annule tous les bits négatifs |  | — | `opt` | — | actif | — |
| Elle teste si EAX est inférieur à zéro |  | — | `opt` | — | actif | — |
| OUT PORTB, R16 |  | — | `opt` | — | actif | data-correct=1 |
| IN R16, PORTB |  | — | `opt` | — | actif | — |
| LDS PORTB, R16 |  | — | `opt` | — | actif | — |
| PUSH PORTB |  | — | `opt` | — | actif | — |
| 0x00401024 |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `asm2-c5-e1` | analyse | 300 | active | `MOV EAX, 42; MOV EBX, EAX` | Exercice 1 — Simulateur d’instructions MOV entre registres |
| `asm2-c5-e2` | analyse | 300 | active | `0x00401000;4;4;0x00000010` | Exercice 2 — Calcul d’adresse effective LEA (Base + Index * Scale + Disp) |
| `asm2-c5-e3` | analyse | 300 | active | `10;ADD 5, SUB 2, INC` | Exercice 3 — Exécuteur d’opérations arithmétiques x86 (ADD, SUB, INC, DEC, NEG, XOR) |

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

- Tableaux : 2 (0 lignes / 3 en-tetes ; 0 lignes / 4 en-tetes)
- Blocs `pre` : 6 · elements `code` : 56
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-warning`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2802 mots · 488 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 64. Les plus frequentes :

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
