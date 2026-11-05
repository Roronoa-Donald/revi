# Fiche de Conception — pb2-c5-e2 : Loi de Poisson P(lambda) : flux de requêtes réseau

- **Identifiant** : `pb2-c5-e2`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 5
- **Source académique exacte** : `probabilites/exos/TD_4.pdf:1 (Exercice 3)`
- **Type d'exercice** : Calcul de probabilités de Poisson
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Dimensionnement d'une passerelle API : le nombre de requêtes entrantes par seconde suit une loi de Poisson de paramètre λ = 3 requêtes/seconde.

## 2. Énoncé Complet
Le nombre de connexions à un serveur en une seconde suit une loi de Poisson X ~ P(λ) avec λ = 3. Calculez :
1. La probabilité de recevoir exactement 2 requêtes : P(X = 2).
2. La probabilité de ne recevoir aucune requête : P(X = 0).

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
0.2240 ; 0.0498

[Cas 1 — lambda=3, k=2]
p_deux : 0.2240
p_zero : 0.0498

[Cas 2 — lambda=2, k=1]
p_un : 0.2707
p_zero : 0.1353
```

**Étapes de raisonnement & calculs vérifiés :**
1. P(X = k) = e^(-λ) · (λ^k) / k!.
2. Pour k = 2 : P(X = 2) = e^(-3) · (3^2) / 2! = e^(-3) · 9 / 2 = 4.5 · e^(-3) ≈ 4.5 · 0.049787 = 0.22404 ≈ 0.2240.
3. Pour k = 0 : P(X = 0) = e^(-3) · 3^0 / 0! = e^(-3) ≈ 0.0498.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `p_deux : 0.2240`
- `0.2240`
- `0.224`
- `P(X=2) = 0.2240`
- `0,2240`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `0.149` : Vérifiez le calcul : 4.5 x e^(-3) = 0.2240.
- `3` : 3 est le paramètre lambda (qui est aussi l'espérance de la loi de Poisson), pas une probabilité.
- `0.0498` : 0.0498 est P(X = 0) ; pour P(X = 2), multipliez par 3^2 / 2! = 4.5 ce qui donne 0.2240.
- `0.5` : La loi de Poisson n'est pas symétrique autour de lambda.
- `0.333` : Attention : n'utilisez pas 1/lambda pour les probabilités ponctuelles de Poisson.
