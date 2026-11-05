# Fiche Source : TD 1-4, TD 1-5 & TD 1-6 — Variables Aléatoires Discrètes et Continues

- **Fichiers sources** : `probabilites/exos/TD_1-4.pdf` (1 page), `TD_1-5.pdf` (1 page), `TD_1-6.pdf` (1 page)
- **Enseignant** : Dr AGBOKOU K. Fomestein
- **Niveau / Classe** : Bachelor 2 (B2 IT)
- **Année Académique** : 2024-2025
- **Chapitres couverts** : Chapitre 3 — Variables aléatoires discrètes et continues

## Liste des Exercices et Notions Testées

### Exercice 15 (`TD_1-4.pdf:1`)
- **Énoncé** : $X$ v.a. discrète uniforme prenant les valeurs $\{-4, -2, 0, 2, 4\}$. Déterminer la loi de $|X|$ et de $X^2$, espérance, variance et écart-type.
- **Notions testées** : Loi d'une variable transformée, linéarité de l'espérance, théorème de Koenig-Huygens.
- **Niveau** : N1.
- **Type de réponse attendue** : Tableaux de lois et scalaires numériques.
- **Vérification du calcul** :
  - $P(X = k) = 1/5$ pour chaque valeur. $E(X) = 0$.
  - $V(X) = E(X^2) = \frac{(-4)^2 + (-2)^2 + 0 + 2^2 + 4^2}{5} = \frac{16+4+0+4+16}{5} = \frac{40}{5} = 8$. Écart-type $\sigma = \sqrt{8} = 2\sqrt{2} \approx 2.828$.
  - $|X| \in \{0, 2, 4\}$ avec $P(|X|=0) = 1/5$, $P(|X|=2) = 2/5$, $P(|X|=4) = 2/5$. $E(|X|) = 0 + 4/5 + 8/5 = 12/5 = 2.4$. Correct.

### Exercice 16 (`TD_1-4.pdf:1`)
- **Énoncé** : Dé truqué à 6 faces avec $P(X=k) = ka$. Déterminer $a$, la loi, $E(X)$ et $P(X \text{ impair})$.
- **Notions testées** : Condition de normalisation $\sum p_k = 1$, espérance.
- **Niveau** : N1.
- **Type de réponse attendue** : Fractions réduites.
- **Vérification du calcul** :
  - $\sum_{k=1}^6 k a = 21 a = 1 \implies a = 1/21$.
  - $E(X) = \sum k \cdot (k/21) = \frac{1+4+9+16+25+36}{21} = \frac{91}{21} = \frac{13}{3} \approx 4.333$.
  - Impair : $P(X \in \{1, 3, 5\}) = \frac{1+3+5}{21} = \frac{9}{21} = \frac{3}{7} \approx 0.4286$. Correct.

### Exercice 17 (`TD_1-4.pdf:1`)
- **Énoncé** : Urne avec 3 jetons blancs (1 carré, 2 ronds) et 4 noirs (3 carrés, 1 rond). Tirage simultané de 3 jetons. Variable $X$ = nombre de jetons blancs. Événements $A$ (même forme) et $B$ (même couleur). Indépendance.
- **Notions testées** : Loi hypergéométrique, formule de combinaison, événements indépendants $P(A \cap B) = P(A)P(B)$.
- **Niveau** : N2.
- **Type de réponse attendue** : Lois et probabilités en fractions.
- **Vérification du calcul** : Total tirages $\binom{7}{3} = 35$.
  - $X \in \{0, 1, 2, 3\}$. $P(X=0) = \binom{4}{3}/35 = 4/35$. $P(X=1) = \binom{3}{1}\binom{4}{2}/35 = 18/35$. $P(X=2) = \binom{3}{2}\binom{4}{1}/35 = 12/35$. $P(X=3) = \binom{3}{3}/35 = 1/35$.
  - Forme : Carrés = 4 (1 blanc, 3 noirs), Ronds = 3 (2 blancs, 1 noir). $P(A) = \frac{\binom{4}{3} + \binom{3}{3}}{35} = \frac{4+1}{35} = \frac{5}{35} = \frac{1}{7}$.
  - Couleur : $P(B) = \frac{\binom{3}{3} + \binom{4}{3}}{35} = \frac{1+4}{35} = \frac{5}{35} = \frac{1}{7}$.
  - $A \cap B$ : 3 de même forme ET même couleur $\implies$ 3 carrés noirs ($\binom{3}{3} = 1$). $P(A \cap B) = 1/35$. Or $P(A)P(B) = 1/49 \ne 1/35 \implies$ non indépendants. Correct.

### Exercice 20 (`TD_1-5.pdf:1`)
- **Énoncé** : Achat produit A (10 000 F, proba 0.3), produit B (4 000 F, proba 0.8 si A acheté, 0.1 sinon). Variable $X$ = dépense client. Déterminer la loi de $X$ et $E(X)$.
- **Notions testées** : Probabilités composées, loi d'une variable économique discrète.
- **Niveau** : N2.
- **Type de réponse attendue** : Tableau de loi et espérance en FCFA.
- **Vérification du calcul** :
  - $P(X=14000) = 0.3 \times 0.8 = 0.24$.
  - $P(X=10000) = 0.3 \times 0.2 = 0.06$.
  - $P(X=4000) = 0.7 \times 0.1 = 0.07$.
  - $P(X=0) = 0.7 \times 0.9 = 0.63$.
  - $E(X) = 3360 + 600 + 280 + 0 = 4240$ FCFA. Correct.

### Exercice 21 (`TD_1-5.pdf:1`)
- **Énoncé** : Pannes indépendantes téléviseur : transistor $X \sim \mathcal{P}(2)$, condensateur $Y \sim \mathcal{P}(1)$. Calculer probabilités et loi de la somme $Z = X+Y$.
- **Notions testées** : Loi de Poisson, convolution de lois de Poisson indépendantes.
- **Niveau** : N2.
- **Type de réponse attendue** : Formules et décimaux.
- **Vérification du calcul** : $Z \sim \mathcal{P}(3)$. $P(\text{au moins une panne}) = 1 - e^{-3} \approx 0.9502$. Correct.

### Exercice 24 (`TD_1-6.pdf:1`)
- **Énoncé** : Densité continue $f(x) = kx$ sur $[0, 1]$ et $0$ ailleurs.
  1. Déterminer $k$.
  2. Calculer $E(X)$ et $V(X)$.
  3. Déterminer la fonction de répartition $F(x)$.
  4. Calculer $P(X \le 1/2)$, $P(1/2 \le X \le 3)$ et $P(X < 1/2 \mid X > 1/4)$.
- **Notions testées** : Intégrale de normalisation, moments d'ordre 1 et 2, fonction de répartition, probabilité conditionnelle continue.
- **Niveau** : N2/N3.
- **Type de réponse attendue** : Scalaires exacts (fractions).
- **Vérification du calcul** :
  - $k = 2$.
  - $E(X) = 2/3$.
  - $V(X) = 1/18$.
  - $F(x) = x^2$ sur $[0, 1]$.
  - $P(X \le 1/2) = 1/4$.
  - $P(1/2 \le X \le 3) = 3/4$.
  - $P(X < 1/2 \mid X > 1/4) = 1/5 = 0.2$. Correct.
