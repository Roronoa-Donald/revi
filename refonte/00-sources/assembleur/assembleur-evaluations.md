# Fiche Source : Architecture et Programmation en Assembleur B2

- **Fichiers sources** :
  - `assembleur/CC_2024_2025_CdP_B2A_.pdf` (5 pages)
  - `assembleur/CC_2024_2025_CdP_B2B_.pdf` (5 pages)
  - `assembleur/EF_Architecture_Programmation_Assembleur_2024_2025_CdP_B2A_B_ (1).pdf` (7 pages)
  - `assembleur/main.pdf` (100 pages)
- **Établissement** : Collège de Paris Supérieur
- **Niveau / Classe** : Bachelor 2 (B2 IT A & B)
- **Année Académique** : 2024-2025
- **Chapitres couverts** : Registres x86_64, NASM, Opérations arithmétiques, Mémoire, Appels système Linux, Microcontrôleurs AVR

## Liste des Exercices et Notions Testées avec Pages

### Contrôle Continu B2A & B2B (`CC_2024_2025_CdP_B2A_.pdf` & `CC_2024_2025_CdP_B2B_.pdf`)
- **Partie I : Compréhension (10 points, p.1 et corrigé p.3-4)** :
  1. Registres de données généraux x86_64 (RAX, RBX, RCX, RDX, RSI, RDI, RSP, RBP) (p.3).
  2. Rôle du pointeur d'instruction RIP (p.3).
  3. Rôle du pointeur de pile RSP (p.3).
  4. Différence fondamentale entre RAX (64 bits), EAX (32 bits poids faible), AX (16 bits), AL/AH (8 bits) (p.4).
  5. Étapes de compilation : assemblage avec `nasm -f elf64 prog.asm -o prog.o` puis édition de liens avec `gcc prog.o -o prog` ou `ld` (p.5).
- **Partie II : Exercices Pratiques (10 points, p.2 et corrigé p.4-5)** :
  - **Exercice 1 (2 pts, p.2)** : Addition simple (B2A) : charger 5 dans RAX, 3 dans RBX, additionner et stocker dans RCX (`mov rax, 5`, `mov rbx, 3`, `add rax, rbx`, `mov rcx, rax`). Soustraction simple (B2B) (`sub rax, rbx`).
  - **Exercice 2 (2 pts, p.2)** : Utilisation de variables en mémoire (`section .data`, `valeur dq 42`, `mov rax, [valeur]`).
  - **Exercice 3 (2 pts, p.2)** : Structure complète d'un programme NASM (`section .data`, `section .bss`, `section .text`, `global _start` ou `main`).
  - **Exercice 4 (2 pts, p.2)** : Saut conditionnel : comparer deux registres avec `cmp rax, rbx` et sauter avec `je etiquette` ou `jg etiquette`.
  - **Exercice 5 (2 pts, p.2)** : Terminaison propre via appel système Linux (`mov rax, 60`, `xor rdi, rdi`, `syscall`).

### Examen Final 2024-2025 (`EF_Architecture_Programmation_Assembleur_2024_2025_CdP_B2A_B_ (1).pdf`)
- **Partie I : Compréhension (10 pts, p.1 et corrigé p.3-4)** :
  - Définitions : assembleur vs langage machine, langage compilé vs assembleur, segmentation mémoire (.text en lecture/exécution, .data en lecture/écriture initialisée, .bss en non-initialisée).
  - Flags du registre RFLAGS : Zero Flag (ZF), Carry Flag (CF), Sign Flag (SF), Overflow Flag (OF) (p.4).
- **Partie II : Exercices Pratiques (10 pts, p.2 et corrigé p.5-7)** :
  - **Exercice 1 (2 pts, p.2 & p.5)** : Multiplications signées (`imul rax, 3`) et division entière (`idiv rbx`).
  - **Exercice 2 (2 pts, p.2 & p.6)** : Chargement indirect de mémoire et mise à jour de variable.
  - **Exercice 3 (2 pts, p.2 & p.6)** : Boucle de comptage en assembleur : calcul de la somme des entiers de 1 à $N$ avec décrémentation `dec rcx` et `jnz boucle`.
  - **Exercice 4 (2 pts, p.2 & p.6)** : Fonction avec passage d'arguments selon la convention d'appel System V AMD64 ABI (RDI, RSI, RDX, RCX, R8, R9 et valeur de retour dans RAX).
  - **Exercice 5 (2 pts, p.2 & p.7)** : Appel système `sys_write` (RAX=1, RDI=1 pour stdout, RSI=adresse du message, RDX=longueur) et `sys_exit` (RAX=60, RDI=code).
