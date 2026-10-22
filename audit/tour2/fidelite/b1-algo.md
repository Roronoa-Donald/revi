# Fidélité aux Sources (Mission A) — `b1-algo` (Algorithmique · B1)

- **Cours** : `b1-algo` (Algorithmique) — Niveau **B1** (10 chapitres)
- **Documents sources rattachés (10 fichiers, 95 pages)** :
- `textes/B1/Algorithmique/Introduction à L’Algorithmique.txt` (14 pages, statut `ok`)
- `textes/B1/Algorithmique/2- Introduction au Langage Pascal.txt` (12 pages, statut `ok`)
- `textes/B1/Algorithmique/0003- Corps dun Algorithme-Programme (instructions).txt` (7 pages, statut `ok`)
- `textes/B1/Algorithmique/0004- Lecture, Ecriture et Affectation.txt` (19 pages, statut `ok`)
- `textes/B1/Algorithmique/0005- Linstruction de Test Alternatif Simple et Double.txt` (10 pages, statut `ok`)
- `textes/B1/Algorithmique/0006- Les instructions Itératives (Boucles) - Pour - Tantque - Répéter.txt` (15 pages, statut `ok`)
- `textes/B1/Algorithmique/SUITE DE TD ALGO.txt` (3 pages, statut `ok`)
- `textes/B1/Algorithmique/TAS NIV II.txt` (5 pages, statut `ok`)
- `textes/B1/Algorithmique/SUITE DE TD POUR.txt` (8 pages, statut `ok`)
- `textes/B1/Algorithmique/Exercices sur les instructions itératives.txt` (2 pages, statut `ok`)
- **Niveau de confiance** : **Élevé (10 documents sources propres en extraction directe pdftotext, 95 pages)**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Verdict sur l'ordre** : **D2 / D1 confirmés au Chapitre 1 (condensation prématurée)**
- **Ordre exact dans les PDF sources** : (1) `textes/B1/Algorithmique/Introduction à L’Algorithmique.txt` définit un algorithme (`#PAGE 2-3`), la démarche d'analyse d'un problème (`#PAGE 4`), les **données : variables et constantes** (`#PAGE 5`), les **identificateurs** et leurs règles (`#PAGE 6-7`), la distinction **entrées / sorties** (`#PAGE 8-9`), la structure `Entête / Déclarations / Corps` (`#PAGE 10-11`), et les **5 types de base (`Entier, Réel, Caractère, Chaîne de caractères, Booléen`)** (`#PAGE 12`), en laissant volontairement le corps de l'exemple avec `// A compléter plus tard` (`#PAGE 13`) ; (2) `textes/B1/Algorithmique/2- Introduction au Langage Pascal.txt` présente la notion de programme (`#PAGE 2`), le langage Pascal (`#PAGE 3`), les mots réservés `program, const, var, begin, end` (`#PAGE 4-5`), les types Pascal (`#PAGE 8`) et la déclaration des constantes/variables (`#PAGE 9-11`) ; (3) `textes/B1/Algorithmique/0003- Corps dun Algorithme-Programme (instructions).txt` introduit la notion d'instruction (`#PAGE 2`) et distingue les instructions séquentielles (lecture, écriture, affectation) des non-séquentielles (tests, boucles) (`#PAGE 4-6`) ; (4) `textes/B1/Algorithmique/0004- Lecture, Ecriture et Affectation.txt` enseigne la syntaxe/sémantique de `Lire` / `read` (`#PAGE 2-4`), d'`Ecrire` / `write` (`#PAGE 5-9`) puis de l'**affectation `←` / `:=`** (`#PAGE 13-18`) ; (5) `textes/B1/Algorithmique/0005- Linstruction de Test Alternatif Simple et Double.txt` enseigne `Si...Alors...Sinon...FinSi` (`#PAGE 2-9`) ; (6) `textes/B1/Algorithmique/0006- Les instructions Itératives (Boucles) - Pour - Tantque - Répéter.txt` enseigne la boucle `Pour` (`#PAGE 3-6`), `Tant-que` (`#PAGE 7-10`) et `Répéter...Jusqu'à` (`#PAGE 11-14`).
- **Inversions et parachutages sur le site (`D2 / D6`)** : Le site reporte l'étude des variables, types et de l'affectation au **Chapitre 2** (`b1-algo/chapitres/chapitre2.html:L61-L86`), mais dès le **Chapitre 1** (`b1-algo/chapitres/chapitre1.html:L101-L108`), il utilise `Variable longueur, largeur, aire : Entier`, `Lire longueur`, `Écrire` et `←` (qui appartiennent à `Introduction à L’Algorithmique.txt#PAGE 5-12` et `0004- Lecture, Ecriture et Affectation.txt#PAGE 2-18`). Pire, à `b1-algo/chapitres/chapitre1.html:L112-L121`, il affiche un programme complet en **Pascal** (`program AireRectangle; var ... readln(longueur); writeln(...)`) sans avoir introduit les mots-clés ni la structure de `2- Introduction au Langage Pascal.txt#PAGE 4-9`. Enfin, à `b1-algo/chapitres/chapitre1.html:L129`, il illustre la table de trace avec `Pour i de 1 à 3 Faire S ← S + i FinPour`, alors que la boucle `Pour` n'est introduite dans la source qu'au support `0006#PAGE 3-6` et sur le site qu'au **Chapitre 4** (`b1-algo/chapitres/chapitre4.html:L61`).

## 2. Couverture (Lacunes & Ajouts)
- **Notions des sources présentes sur le site** : Les 6 supports de base (algorithme, Pascal, corps/instructions, lecture/écriture/affectation, tests simple/double, boucles `Pour`/`TantQue`/`Répéter`) ainsi que les fiches de TD de niveau B1 présentes dans le corpus (`tablo_proced.txt`, `proc_funct.txt`, `exo_FUN_proc.txt`) sont bien couverts aux Chapitres 1 à 8.
- **Lacunes (dans la source mais absentes ou sous-traitées au Ch. 1 du site)** : Les règles formelles de validité d'un **identificateur** (pas d'espace, pas de tiret `-`, ne commence pas par un chiffre, pas un mot réservé) détaillées sur 2 pages dans `textes/B1/Algorithmique/Introduction à L’Algorithmique.txt#PAGE 6-7` et l'exercice d'identification associé (`1_abonné`, `Nom-Prenom`, `Debut`) sont absents du Chapitre 1 et condensés en une phrase au Chapitre 2 (`chapitre2.html:L63`).
- **Ajouts du site absents des PDF de `B1/Algorithmique/`** : (1) Le **Chapitre 9** (`b1-algo/chapitres/chapitre9.html:L60-L130` : *Tri à bulles, recherche dichotomique, récursivité*) dépasse le corpus `B1/Algorithmique/` et anticipe en réalité le support de B3 (`textes/B3/SEMESTRE I/Algorithmique/ALGO_B3.txt#PAGE 18-45`) ; (2) Le langage **Python 3** imposé dans les 30 exercices (`chapitre1.html:L148` à `chapitre10.html`) et au Chapitre 10 est totalement absent des 10 PDF de `B1/Algorithmique/` (qui utilisent exclusivement le pseudo-code français et le Pascal).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Algorithme
- **Source PDF** : `textes/B1/Algorithmique/Introduction à L’Algorithmique.txt#PAGE 2-3` : « Un algorithme représente une séquence d'instructions (Actions) ordonnées logiquement qui servent à résoudre un problème donné... l'ensemble des étapes qui permettent d'avoir des résultats (Sorties / Outputs) à partir des données en entrée (Inputs). »
- **Site web** : `b1-algo/chapitres/chapitre1.html:L61` : « Un algorithme est une suite finie et ordonnée d'instructions non ambiguës qui, appliquée à des données d'entrée, produit un résultat en un temps fini. »
- **Diagnostic** : **Plus rigoureuse sur le site** (ajoute explicitement la finitude et la non-ambiguïté aux côtés de l'ordre et des entrées/sorties).

### Définition 2 — Variable
- **Source PDF** : `textes/B1/Algorithmique/Introduction à L’Algorithmique.txt#PAGE 5` : « Une donnée est dite Variable si sa valeur est susceptible de changer plusieurs fois durant le déroulement de l'algorithme. »
- **Site web** : `b1-algo/chapitres/chapitre2.html:L61` : « Une variable est un espace de mémoire nommé et typé dont la valeur peut évoluer au cours de l'exécution de l'algorithme. »
- **Diagnostic** : **Équivalente et légèrement plus précise sur le site** (relie la variation de valeur au nom, au type et à la case mémoire), mais placée trop tard (Ch. 2 au lieu du Ch. 1).

### Définition 3 — Affectation (`←` / `:=`)
- **Source PDF** : `textes/B1/Algorithmique/0004- Lecture, Ecriture et Affectation.txt#PAGE 13-14` : « L'instruction d'Affectation permet d'assigner une valeur à une variable : `<id_variable> <- <Expression>` (Algo) / `<id_variable> := <Expression>;` (Pascal). Évaluer l'expression à droite puis mettre le résultat dans la variable à gauche (en écrasant son ancienne valeur). »
- **Site web** : `b1-algo/chapitres/chapitre2.html:L75-L78` : « L'affectation `x ← expression` évalue d'abord l'expression de droite, puis range le résultat dans la variable de gauche en écrasant son ancienne valeur. »
- **Diagnostic** : **Fidèle et rigoureuse**, mais utilisée dès `chapitre1.html:L97,L105` avant cette définition du Chapitre 2.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Les exercices des Chapitres 3, 4 et 5 reprennent les thèmes des TD sources (`SUITE DE TD ALGO.txt#PAGE 1-3` : parité, tarifs selon l'âge, triangle ; `TAS NIV II.txt#PAGE 1-5` : réductions avec ET/OU ; `SUITE DE TD POUR.txt#PAGE 2` : factorielle, somme, table de multiplication ; `Exercices sur les instructions itératives.txt#PAGE 1-2` : moyenne de notes avec arrêt sur `-1`), MAIS les sources demandent d'écrire des algorithmes en **pseudo-code et en Pascal**, tandis que le site exige dès le Chapitre 1 (`chapitre1.html:L148-L252`) d'écrire du **Python (`int(input())`, `//`, `%`)** non enseigné dans la source, et place dès le Ch. 1 (Ex. 2 et 3, `L215, L238`) la division entière et le modulo qui relèvent du Ch. 2.
