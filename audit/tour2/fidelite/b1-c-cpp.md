# Fidélité aux Sources (Mission A) — `b1-c-cpp` (Langage C & C++ · B1)

- **Cours** : `b1-c-cpp` (Langage C & C++) — Niveau **B1** (8 chapitres)
- **Documents sources rattachés (3 fichiers, 67 pages)** :
- `textes/B1/Langage C et C+/Cours C.txt` (52 pages, statut `ok`)
- `textes/B1/Langage C et C+/Chap_1_Notions_de_base C++.txt` (13 pages, statut `ok`)
- `textes/B1/Langage C et C+/Exercice2.txt` (2 pages, statut `ok`)
- **Niveau de confiance** : **Élevé (Cours C.txt [52 p.] + Chap_1_Notions_de_base C++.txt [13 p.] + Exercice2.txt [2 p.], statut ok)**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Verdict sur l'ordre** : **Inversion mineure D2 sur scanf(&x) au Ch. 1 avant les pointeurs au Ch. 6 (héritée du langage C mais bien encadrée)**
- **Ordre dans la source (`textes/B1/Langage C et C+/Cours C.txt#PAGE 3-6`)** : Ch. 1 Introduction & compilation (`#PAGE 7-11`) → Ch. 2 Éléments de base : types, variables, opérateurs (`#PAGE 12-16`) → Ch. 3 Entrées/sorties `printf`/`scanf` (`#PAGE 17-19`) → Ch. 4 Structures de contrôle `if/switch/while/do-while/for` (`#PAGE 20-26`) → Ch. 5 Tableaux et chaînes (`#PAGE 27-32`) → Ch. 6 Pointeurs et allocation dynamique (`#PAGE 33-40`) → Ch. 7 Fonctions (`#PAGE 41-46`) → Ch. 8 Structures et fichiers (`#PAGE 47-52`), suivi de `Chap_1_Notions_de_base C++.txt` (`#PAGE 1-13` : `iostream`, `cin`/`cout`, `namespace std`).
- **Comparaison avec le site (`b1-c-cpp/chapitres/chapitre1..8.html`)** : Le site place judicieusement les **Fonctions au Ch. 5** (`chapitre5.html`) AVANT les **Pointeurs au Ch. 6** (`chapitre6.html`), ce qui améliore l'ordre du PDF (`Cours C.txt` plaçait les pointeurs en section 6 avant les fonctions en section 7) car cela permet d'expliquer le passage par valeur (Ch. 5) avant le passage par adresse (Ch. 6).

## 2. Couverture (Lacunes & Ajouts)
- **Lacunes / Ajouts** : Le Ch. 8 du site (`chapitre8.html:L85-L120`) ajoute les **classes C++ (`class`, `public`/`private`) et `std::vector`**, alors que le support source `Chap_1_Notions_de_base C++.txt#PAGE 1-13` s'arrête aux bases procédurales de C++ (`cout`, `cin`, types, `string`). C'est un ajout utile mais dense en un seul chapitre.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Compilation
- **Source PDF** : `textes/B1/Langage C et C+/Cours C.txt#PAGE 8` : « La compilation traduit le fichier source (.c) en fichier objet binaire, puis l'éditeur de liens (linker) génère l'exécutable. »
- **Site web** : `b1-c-cpp/chapitres/chapitre1.html:L60` : « Le compilateur (gcc) traduit le code source .c en langage machine exécutable par le processeur. »
- **Diagnostic** : **Fidèle et adaptée aux débutants**.

### Définition 2 — Pointeur
- **Source PDF** : `textes/B1/Langage C et C+/Cours C.txt#PAGE 33` : « Un pointeur est une variable spéciale dont la valeur est l'adresse mémoire d'une autre variable. »
- **Site web** : `b1-c-cpp/chapitres/chapitre6.html:L61` : « Un pointeur est une variable qui contient l'adresse mémoire d'une autre variable (int *p = &x;). »
- **Diagnostic** : **Identique et rigoureuse**.

### Définition 3 — Chaîne de caractères en C
- **Source PDF** : `textes/B1/Langage C et C+/Cours C.txt#PAGE 30` : « En C, une chaîne de caractères est un tableau de `char` terminé par le caractère nul `\0`. »
- **Site web** : `b1-c-cpp/chapitres/chapitre4.html:L92` : « Une chaîne C est un tableau de caractères terminé obligatoirement par la sentinelle `'\0'`. »
- **Diagnostic** : **Identique et rigoureuse**.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Les exercices des Chapitres 1 à 7 reprennent les exercices classiques de `Cours C.txt` et `Exercice2.txt#PAGE 1-2` (compilation GCC, `printf`/`scanf`, boucles, tableaux, pointeurs, structures). Exécution réelle C/C++ fonctionnelle.
