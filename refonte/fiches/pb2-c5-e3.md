# Fiche de Conception — pb2-c5-e3 : Somme de variables de Poisson indépendantes

- **Identifiant** : `pb2-c5-e3`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 5
- **Source académique exacte** : `probabilites/exos/TD_4.pdf:2 (Exercice 4)`
- **Type d'exercice** : Propriété d'addition de lois de Poisson
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Agrégation de deux flux d'incidents indépendants arrivant sur un centre de support : flux matériel X1 ~ P(1.5) et flux logiciel X2 ~ P(2.5).

## 2. Énoncé Complet
Deux sources indépendantes d'incidents informatiques suivent des lois de Poisson : X1 ~ P(1.5) et X2 ~ P(2.5).
1. Quelle est la loi de la somme Y = X1 + X2 ? Précisez son paramètre λ_total.
2. Calculez la probabilité de n'avoir aucun incident au total en une heure : P(Y = 0).

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
4 ; 0.0183

[Cas 1 — lambda1=1.5, lambda2=2.5]
lambda_total : 4
p_zero : 0.0183

[Cas 2 — lambda1=1, lambda2=2]
lambda_total : 3
p_zero : 0.0498
```

**Étapes de raisonnement & calculs vérifiés :**
1. Théorème : la somme de deux variables indépendantes de Poisson X1 ~ P(λ1) et X2 ~ P(λ2) suit la loi de Poisson P(λ1 + λ2).
2. Ici λ_total = 1.5 + 2.5 = 4.
3. P(Y = 0) = e^(-4) · 4^0 / 0! = e^(-4) ≈ 0.018315 ≈ 0.0183 (soit 1.83%).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `lambda_total : 4`
- `4`
- `0.0183`
- `p_zero : 0.0183`
- `P(Y=0) = 0.0183`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `3.75` : Les paramètres s'additionnent (1.5 + 2.5 = 4), ils ne se multiplient pas (1.5 x 2.5 = 3.75).
- `2` : 2 est la moyenne des deux lambdas ; pour la somme totale, additionnez les débits : 1.5 + 2.5 = 4.
- `0.05` : e^(-4) vaut 0.0183 et non 0.05 (qui est e^(-3)).
- `0` : Bien que faible, la probabilité n'est pas nulle : P(Y = 0) = e^(-4) ≈ 0.0183.
- `1` : lambda_total = 4, il ne vaut pas 1.
