# Fiche Source : TD 1-2 & TD 1-3 — Espaces Probabilisés et Conditionnement

- **Fichiers sources** : `probabilites/exos/TD_1-2.pdf` (1 page) et `probabilites/exos/TD_1-3.pdf` (1 page)
- **Enseignant** : Dr AGBOKOU K. Fomestein
- **Niveau / Classe** : Bachelor 2 (B2 IT)
- **Année Académique** : 2024-2025
- **Chapitres couverts** : Chapitre 2 — Espaces probabilisés & probabilités conditionnelles

## Liste des Exercices et Notions Testées

### Exercice 7 (`TD_1-2.pdf:1`)
- **Énoncé** : Pièces métalliques rectangulaires : 3% longueur hors norme, 5% largeur hors norme, 2% longueur et largeur hors norme. Probabilité d'une pièce utilisable ?
- **Notions testées** : Événements contraires, formule du crible de Poincaré $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
- **Niveau** : N1.
- **Type de réponse attendue** : Nombre décimal / pourcentage ($0.94$ ou $94\%$).
- **Vérification du calcul** : $P(L \cup l) = 0.03 + 0.05 - 0.02 = 0.06 \implies P(\text{utilisable}) = 1 - 0.06 = 0.94$. Correct.

### Exercice 8 (`TD_1-2.pdf:1`)
- **Énoncé** : 10 livres (2 chimie, 3 physique, 5 mathématiques) rangés sur une étagère.
  1. Probabilité que 3 livres donnés soient côte à côte.
  2. Probabilité que les livres soient rangés par discipline.
- **Notions testées** : Permutations de blocs, équiprobabilité.
- **Niveau** : N2.
- **Type de réponse attendue** : Fractions réduites.
- **Vérification du calcul** :
  - 1 : On assimile les 3 livres à un bloc : $8! \times 3! / 10! = \frac{6}{90} = \frac{1}{15}$.
  - 2 : Permutation des 3 blocs disciplines : $3! \times (2! 3! 5!) / 10! = \frac{6 \times 2 \times 6 \times 120}{3628800} = \frac{8640}{3628800} = \frac{1}{420}$. Correct.

### Exercice 9 (`TD_1-2.pdf:1`)
- **Énoncé** : Numéro de téléphone à 8 chiffres composé au hasard. Probabilités : tous distincts ; produit divisible par 2 ; suite strictement croissante.
- **Notions testées** : Dénombrement sur l'univers $10^8$, événement contraire (produit impair si tous les chiffres sont impairs : $5^8$).
- **Niveau** : N2/N3.
- **Type de réponse attendue** : Fractions et décimaux.
- **Vérification du calcul** :
  - Chiffres distincts : $A_{10}^8 / 10^8 = \frac{1814400}{100000000} = 0.018144$.
  - Produit pair : $1 - (5/10)^8 = 1 - (1/2)^8 = 1 - 1/256 = \frac{255}{256} \approx 0.9961$.
  - Suite strictement croissante : $\binom{10}{8} / 10^8 = 45 / 10^8$. Correct.

### Exercice 10 & 11 (`TD_1-2.pdf:1` & `TD_1-3.pdf:1`)
- **Énoncé** : 4 itinéraires avec probabilités de choix ($1/3, 1/4, 1/2$ et solde) et probabilités conditionnelles de retard ; retards d'avions.
- **Notions testées** : Formule des probabilités totales, théorème de Bayes (inversion conditionnelle).
- **Niveau** : N2.
- **Type de réponse attendue** : Fractions réduites.

### Exercice 12 (`TD_1-3.pdf:1`)
- **Énoncé** : Proportion de défectueux $0.05$. Pièce bonne acceptée avec probabilité $0.96$. Pièce mauvaise refusée avec probabilité $0.98$. Calculer probabilité d'erreur de contrôle et probabilité qu'une pièce acceptée soit mauvaise.
- **Notions testées** : Arbre pondéré, probabilités totales, faux positifs/négatifs, Bayes.
- **Niveau** : N3.
- **Type de réponse attendue** : Décimaux arrondis.
- **Vérification du calcul** :
  - $P(\text{Erreur}) = P(B \cap \text{Refusée}) + P(M \cap \text{Acceptée}) = (0.95 \times 0.04) + (0.05 \times 0.02) = 0.038 + 0.001 = 0.039$.
  - $P(M \mid \text{Acceptée}) = \frac{0.05 \times 0.02}{(0.95 \times 0.96) + (0.05 \times 0.02)} = \frac{0.001}{0.912 + 0.001} = \frac{0.001}{0.913} \approx 0.001095$. Correct.

### Exercice 13 (`TD_1-3.pdf:1`)
- **Énoncé** : Paradoxe des anniversaires pour $k=19$ étudiants sur $n=365$ jours.
- **Notions testées** : Probabilité du complémentaire d'une collision.
- **Niveau** : N2.
- **Type de réponse attendue** : Décimal.
- **Vérification du calcul** : $1 - \prod_{i=0}^{18} \left(1 - \frac{i}{365}\right) \approx 1 - 0.621 = 0.379$ (soit $\approx 37.9\%$). Correct.
