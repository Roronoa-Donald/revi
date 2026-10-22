# Fidélité aux Sources (Mission A) — `assembleur` (Assembleur · B2)

- **Cours** : `assembleur` (Assembleur) — Niveau **B2** (6 chapitres)
- **Documents sources rattachés (4 fichiers, 278 pages)** :
- `textes/B2/assembleur/Architecture et Programmation en Assembleur.txt` (166 pages, statut `ok`)
- `textes/B2/assembleur/main.txt` (100 pages, statut `ok`)
- `textes/B2/assembleur/CC_2024_2025_CdP_B2A_.txt` (5 pages, statut `ok`)
- `textes/B2/assembleur/EF_Architecture_Programmation_Assembleur_2024_2025_CdP_B2A_B_ (1).txt` (7 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B2/assembleur/Architecture et Programmation en Assembleur.txt#PAGE 1` : *COLLÈGE DE PARIS SUPÉRIEUR                      RÉPUBLIQUE TOGOLAISE*
- `textes/B2/assembleur/Architecture et Programmation en Assembleur.txt#PAGE 28` : *Fondements préliminaires                                                     INF*
- `textes/B2/assembleur/Architecture et Programmation en Assembleur.txt#PAGE 55` : *Fondements préliminaires                                                 INF-ASM*
- `textes/B2/assembleur/Architecture et Programmation en Assembleur.txt#PAGE 82` : *Introduction à l’architecture des microcontrôleurs AVR                         I*
- `textes/B2/assembleur/Architecture et Programmation en Assembleur.txt#PAGE 109` : *Introduction à l’architecture des microcontrôleurs AVR                         I*
- `textes/B2/assembleur/Architecture et Programmation en Assembleur.txt#PAGE 136` : *Fondements du langage assembleur                                      INF-ASM-B2*
- `textes/B2/assembleur/main.txt#PAGE 1` : *COLLÈGE DE PARIS SUPÉRIEUR                      RÉPUBLIQUE TOGOLAISE*
- `textes/B2/assembleur/main.txt#PAGE 17` : *Syllabus du cours                                                               *
- **Progression des chapitres sur le site** :
- `assembleur/chapitres/chapitre1.html` : **Chapitre 1 — Numération, Représentation des Données & Logique Binaire** — 1. Les systèmes de numération (Binaire, Hexadécimal & Décimal) (`L81`), 2. Représentation des entiers relatifs : le Complément à 2 (`L97`), 3. Opérations logiques fondamentales & Masquage de bits (`L126`), 4. Décalages logiques vs Décalages arithmétiques (SHL, SHR, SAR) (`L143`)
- `assembleur/chapitres/chapitre2.html` : **Chapitre 2 — Architecture du Processeur, Registres & Drapeaux d’État** — 1. Le modèle de Von Neumann & le cycle machine fondamental (`L81`), 2. La hiérarchie des registres généraux x86_64 (`L98`), 3. Les registres de contrôle & pointeurs (RIP, RSP, RBP) (`L115`), 4. Le registre d’état EFLAGS & les drapeaux de condition (`L127`)
- `assembleur/chapitres/chapitre3.html` : **Chapitre 3 — Mémoires, Bus & Architectures (Von Neumann vs Harvard, AVR / x86)** — 1. Von Neumann vs Harvard & le goulot d’étranglement mémoire (`L81`), 2. Les trois mémoires du microcontrôleur AVR (ATmega328P) (`L94`), 3. Contrôle des broches matérielles GPIO (DDR, PORT, PIN) (`L106`), 4. Little-Endian vs Big-Endian & Mode Segmenté x86 (`L123`)
- `assembleur/chapitres/chapitre4.html` : **Chapitre 4 — Chaîne de Production Logicielle (Assembleur, ELF, Linker & Débogueur)** — 1. Les 4 étapes de la chaîne de compilation (Toolchain) (`L81`), 2. Anatomie d’un exécutable ELF & ses sections mémoire (`L98`), 3. Directives d’allocation NASM & Table des symboles (`L118`), 4. Alignement mémoire & Directive ALIGN (`L135`)
- `assembleur/chapitres/chapitre5.html` : **Chapitre 5 — Jeu d’Instructions x86/AVR, Transferts & Modes d’Adressage** — 1. La règle d’or x86 & l’instruction de transfert MOV (`L81`), 2. Les 5 modes d’adressage x86 (de l’immédiat à l’indexé) (`L93`), 3. L’instruction LEA : le couteau suisse du calcul d’adresses (`L107`), 4. Arithmétique x86 & équivalents microcontrôleur AVR (`L119`)
- `assembleur/chapitres/chapitre6.html` : **Chapitre 6 — Branchements, Pile d’Exécution, Fonctions & Appels Système** — 1. Contrôle de flux : CMP et sauts conditionnels (Jcc) (`L81`), 2. La pile d’exécution (Stack) et les instructions PUSH / POP (`L106`), 3. Conventions d’appel : cdecl (32 bits) vs System V AMD64 ABI (64 bits) (`L135`), 4. Anatomie du cadre de pile (Stack Frame) (`L150`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 4 document(s) source(s) (278 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Base 2 (Binaire)
- **Source PDF** : `textes/B2/assembleur/Architecture et Programmation en Assembleur.txt#PAGE 6` : « k Prérequis • Bases en algorithmique et programmation • Notions de numération binaire et hexadécimale • Autonomi »
- **Site web** : `assembleur/chapitres/chapitre1.html:L87` : « **Base 2 (Binaire)** : : chiffres $\{0, 1\}$. C’est l’état physique des transistors et des lignes de bus (niveau logique bas $0\text{ V}$ ou haut $5\text{ V} / 3.3\text{ V}$). »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Base 16 (Hexadécimal)
- **Source PDF** : `textes/B2/assembleur/Architecture et Programmation en Assembleur.txt#PAGE 6` : « k Prérequis • Bases en algorithmique et programmation • Notions de numération binaire et hexadécimale • Autonomi »
- **Site web** : `assembleur/chapitres/chapitre1.html:L88` : « **Base 16 (Hexadécimal)** : : chiffres $\{0..9, A..F\}$. Chaque chiffre hexadécimal représente exactement un »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Base 10 (Décimal)
- **Source PDF** : `textes/B2/assembleur/Architecture et Programmation en Assembleur.txt#PAGE 6` : « k Prérequis • Bases en algorithmique et programmation • Notions de numération binaire et hexadécimale • Autonomi »
- **Site web** : `assembleur/chapitres/chapitre1.html:L89` : « **Base 10 (Décimal)** : : chiffres $\{0..9\}$. Utilisée uniquement pour l’affichage humain en fin de chaîne. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
