# Chapitre 3 — Mémoires, Bus & Architectures (Von Neumann vs Harvard, AVR / x86)

> Fiche extraite du fichier `assembleur/chapitres/chapitre3.html` (481 lignes, 32.4 Ko, sha256 `56d4baa2bf1e`).
> Famille : **cours-assembleur** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/assembleur/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Mémoires, Bus &amp; Architectures (Von Neumann vs Harvard, AVR / x86) \| Assembleur B2 |
| Description meta | Chapitre 3 du cours Architecture & Programmation en Assembleur B2 : Architectures Von Neumann et Harvard, mémoires Flash, SRAM et EEPROM des microcontrôleurs AVR, bus matériels, Little vs Big-Endian, GPIO et mode segmenté x86. Notions fondamentales, ateliers Python interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Mémoires, Bus & Architectures (Von Neumann vs Harvard, AVR / x86) |
| 3 | h2 | — | 1. Von Neumann vs Harvard & le goulot d’étranglement mémoire |
| 4 | h2 | — | 2. Les trois mémoires du microcontrôleur AVR (ATmega328P) |
| 5 | h2 | — | 3. Contrôle des broches matérielles GPIO (DDR, PORT, PIN) |
| 6 | h2 | — | 4. Little-Endian vs Big-Endian & Mode Segmenté x86 |
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

- **H1** — Chapitre 3 — Mémoires, Bus & Architectures (Von Neumann vs Harvard, AVR / x86)
  - **H2** — 1. Von Neumann vs Harvard & le goulot d’étranglement mémoire
  - **H2** — 2. Les trois mémoires du microcontrôleur AVR (ATmega328P)
  - **H2** — 3. Contrôle des broches matérielles GPIO (DDR, PORT, PIN)
  - **H2** — 4. Little-Endian vs Big-Endian & Mode Segmenté x86
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Configuration des broches GPIO AVR (DDRB & PORTB)
    - **H3** — Exercice 2 — Gestion de l’Endianness (Little-Endian vs Big-Endian)
    - **H3** — Exercice 3 — Calcul d’adresse physique en mode réel x86 (Segment:Offset)
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
| Chapitre 4 — Chaîne de Production Logicielle (Assembleur, ELF, Linker & Débogueur) | `chapitre4.html` | `assembleur/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| La mémoire des instructions et la mémoire des données sont physiquement séparées avec des |  | — | `opt` | — | actif | data-correct=1 |
| Elle n’utilise aucun signal d’horloge |  | — | `opt` | — | actif | — |
| Elle ne possède aucun registre général |  | — | `opt` | — | actif | — |
| Elle ne permet pas d’exécuter de boucles |  | — | `opt` | — | actif | — |
| Dans la mémoire Flash (32 Ko non volatile) |  | — | `opt` | — | actif | data-correct=1 |
| Dans la SRAM (2 Ko) |  | — | `opt` | — | actif | — |
| Dans l’accumulateur EAX |  | — | `opt` | — | actif | — |
| Dans le cache L2 |  | — | `opt` | — | actif | — |
| En mettant le bit 5 du registre DDRB à 1 |  | — | `opt` | — | actif | data-correct=1 |
| En mettant le bit 5 du registre DDRB à 0 |  | — | `opt` | — | actif | — |
| En lisant le registre PINB |  | — | `opt` | — | actif | — |
| En désactivant les interruptions globales |  | — | `opt` | — | actif | — |
| À l’adresse mémoire la plus basse |  | — | `opt` | — | actif | data-correct=1 |
| À l’adresse mémoire la plus haute |  | — | `opt` | — | actif | — |
| Toujours dans le registre RIP |  | — | `opt` | — | actif | — |
| Dans la mémoire EEPROM |  | — | `opt` | — | actif | — |
| 0x78 |  | — | `opt` | — | actif | data-correct=1 |
| 0x12 |  | — | `opt` | — | actif | — |
| 0x34 |  | — | `opt` | — | actif | — |
| 0x56 |  | — | `opt` | — | actif | — |
| 0x10250 |  | — | `opt` | — | actif | data-correct=1 |
| 0x12500 |  | — | `opt` | — | actif | — |
| 0x01250 |  | — | `opt` | — | actif | — |
| 0x1000250 |  | — | `opt` | — | actif | — |
| À lire l’état logique présent sur les broches matérielles du port |  | — | `opt` | — | actif | data-correct=1 |
| À changer la fréquence de l’horloge quartz |  | — | `opt` | — | actif | — |
| À configurer le sens d’entrée/sortie |  | — | `opt` | — | actif | — |
| À allouer la pile d’exécution |  | — | `opt` | — | actif | — |
| 1 Mo (1 048 576 octets) |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `asm2-c3-e1` | analyse | 300 | active | `0xFF;0x20;5` | Exercice 1 — Configuration des broches GPIO AVR (DDRB & PORTB) |
| `asm2-c3-e2` | analyse | 300 | active | `0x12345678;LITTLE` | Exercice 2 — Gestion de l’Endianness (Little-Endian vs Big-Endian) |
| `asm2-c3-e3` | analyse | 300 | active | `0x07C0;0x0000` | Exercice 3 — Calcul d’adresse physique en mode réel x86 (Segment:Offset) |

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

- Tableaux : 2 (0 lignes / 3 en-tetes ; 0 lignes / 6 en-tetes)
- Blocs `pre` : 6 · elements `code` : 28
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2786 mots · 458 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 65. Les plus frequentes :

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
