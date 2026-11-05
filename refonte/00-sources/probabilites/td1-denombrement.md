# Fiche Source : TD 1 & TD 1-1 — Dénombrement

- **Fichiers sources** : `probabilites/exos/TD_1.pdf` (1 page) et `probabilites/exos/TD_1-1.pdf` (1 page)
- **Enseignant** : Dr AGBOKOU K. Fomestein
- **Niveau / Classe** : Bachelor 2 (B2 IT)
- **Année Académique** : 2024-2025
- **Chapitres couverts** : Chapitre 1 — Dénombrement

## Liste des Exercices et Notions Testées

### Exercice 1 (`TD_1.pdf:1`)
- **Énoncé** : Quatre personnes se présentent à un entretien après lequel le recruteur a la possibilité soit de ne choisir personne, soit d'en choisir une, deux, trois ou quatre. Quel est le nombre total de possibilités ?
- **Notions testées** : Principe additif, combinaisons, somme des coefficients binomiaux $\sum_{k=0}^4 \binom{4}{k} = 2^4$.
- **Niveau** : N1 (Application directe du principe fondamental du dénombrement).
- **Type de réponse attendue** : Nombre entier ($16$).
- **Vérification du calcul** : $\binom{4}{0} + \binom{4}{1} + \binom{4}{2} + \binom{4}{3} + \binom{4}{4} = 1 + 4 + 6 + 4 + 1 = 16$. Correct.

### Exercice 2 (`TD_1.pdf:1`)
- **Énoncé** :
  1. On dispose de trois tiroirs notés A, B, C dans lesquels on doit ranger 7 objets discernables numérotés 1 à 7. Combien de rangements ?
  2. On dispose de 3 objets discernables (1, 2, 3) et de 5 tiroirs (A, B, C, D, E), au plus un objet par tiroir. Combien de rangements ?
- **Notions testées** : p-listes avec répétition ($n^p$ vs $p^n$), arrangements sans répétition ($A_n^p$).
- **Niveau** : N2 (Distinction entre injection et application quelconque).
- **Type de réponse attendue** : Nombres entiers ($3^7 = 2187$ et $A_5^3 = 60$).
- **Vérification du calcul** : $3^7 = 2187$ ; $A_5^3 = 5 \times 4 \times 3 = 60$. Correct.

### Exercice 3 (`TD_1.pdf:1`)
- **Énoncé** : Mots de 3 lettres avec l'alphabet (26 lettres, 6 voyelles, 20 consonnes).
  1. $N_1$ : mots quelconques.
  2. $N_2$ : trois lettres distinctes.
  3. $N_3$ : commençant et finissant par une consonne.
  4. $N_4$ : au moins une voyelle.
  5. $N_5$ : exactement deux consonnes et une voyelle.
- **Notions testées** : Arrangements, complémentaire (« au moins un »), placement de motifs.
- **Niveau** : N2/N3.
- **Type de réponse attendue** : Nombres entiers.
- **Vérification du calcul** :
  - $N_1 = 26^3 = 17576$.
  - $N_2 = A_{26}^3 = 26 \times 25 \times 24 = 15600$.
  - $N_3 = 20 \times 26 \times 20 = 10400$.
  - $N_4 = 26^3 - 20^3 = 17576 - 8000 = 9576$.
  - $N_5 = \binom{3}{1} \times 20^2 \times 6 = 3 \times 400 \times 6 = 7200$. Correct.

### Exercice 4 (`TD_1.pdf:1`)
- **Énoncé** :
  1. Montrer que répartir $n$ personnes en trois groupes de tailles $n_1, n_2, n_3$ ($n_1+n_2+n_3=n$) vaut $\frac{n!}{n_1! n_2! n_3!}$.
  2. Répartition de 8 policiers : 3 patrouille, 2 garde, 3 réserve.
- **Notions testées** : Coefficients multinomiaux, partitions d'ensembles ordonnés.
- **Niveau** : N3 (Démonstration théorique et application numérique).
- **Type de réponse attendue** : Démonstration algébrique puis nombre entier ($\frac{8!}{3! 2! 3!} = 560$).
- **Vérification du calcul** : $\frac{40320}{6 \times 2 \times 6} = \frac{40320}{72} = 560$. Correct.

### Exercice 5 (`TD_1.pdf:1-2` & `TD_1-1.pdf:1`)
- **Énoncé** : Mains de 5 cartes dans un jeu de Belote (32 cartes).
  1. Nombre total de mains.
  2. Mains contenant le valet de trèfle.
  3. Mains contenant exactement un As.
  4. Mains contenant au moins un Roi.
- **Notions testées** : Combinaisons p parmi n, complémentaire.
- **Niveau** : N2.
- **Type de réponse attendue** : Nombres entiers.
- **Vérification du calcul** :
  - Total : $\binom{32}{5} = \frac{32 \times 31 \times 30 \times 29 \times 28}{120} = 201376$.
  - Valet de trèfle : $\binom{31}{4} = 31465$.
  - Exactement un As : $\binom{4}{1} \times \binom{28}{4} = 4 \times 20475 = 81900$.
  - Au moins un Roi : $\binom{32}{5} - \binom{28}{5} = 201376 - 98280 = 103096$. Correct.

### Exercice 6 (`TD_1-1.pdf:1`)
- **Énoncé** : Numéros de téléphone à 7 chiffres avec diverses contraintes d'occurrences.
  1. Deux 1, deux 3 et trois 7.
  2. Deux chiffres distincts et deux seulement.
  3. Trois 1 et trois seulement.
  4. Somme des chiffres égale à 10.
- **Notions testées** : Anagrammes avec répétitions, partitions d'entiers.
- **Niveau** : N3.
- **Type de réponse attendue** : Nombres entiers.
- **Vérification du calcul** : Question 1 : $\frac{7!}{2! 2! 3!} = \frac{5040}{2 \times 2 \times 6} = 210$. Correct.
