# Fiche de Conception — pb2-c5-e1 : Loi hypergéométrique : échantillonnage sans remise

- **Identifiant** : `pb2-c5-e1`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 5
- **Source académique exacte** : `probabilites/exos/TD_4.pdf:1 (Exercice 2)`
- **Type d'exercice** : Probabilités sans remise et loi hypergéométrique
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Contrôle de réception de microprocesseurs : un lot de N = 20 pièces contient D = 4 pièces défectueuses. On prélève sans remise un échantillon de n = 3 pièces.

## 2. Énoncé Complet
Dans un lot de N = 20 composants électroniques, D = 4 sont défectueux. On prélève au hasard et sans remise n = 3 composants. Calculez la probabilité exacte d'obtenir exactement 1 composant défectueux dans l'échantillon sous forme de fraction réduite.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
24/57

[Cas 1 — N=20, D=4, n=3, k=1]
p : 24/57

[Cas 2 — N=10, D=3, n=2, k=1]
p : 7/15
```

**Étapes de raisonnement & calculs vérifiés :**
1. Nombre total d'échantillons possibles : C(20, 3) = (20 x 19 x 18) / 6 = 1140.
2. Nombre d'échantillons favorables avec 1 défectueux et 2 conformes : C(4, 1) x C(16, 2) = 4 x 120 = 480.
3. Probabilité P(X = 1) = 480 / 1140 = 24 / 57 = 8 / 19 ≈ 0.4211.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `p : 8/19`
- `8/19`
- `24/57`
- `480/1140`
- `0.4211`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `4/20` : 4/20 = 0.20 est la proportion globale de défauts, pas la probabilité dans un tirage sans remise de 3 pièces.
- `0.384` : 0.384 correspondrait à un tirage AVEC remise (loi binomiale B(3, 0.2)) ; ici le tirage est SANS remise (loi hypergéométrique).
- `120` : 120 est C(16, 2) ; multipliez par C(4, 1) = 4 pour obtenir les 480 cas favorables, puis divisez par C(20, 3) = 1140.
- `1/3` : La fraction exacte simplifiée est 8/19 (ou 480/1140).
- `480` : 480 est le nombre de cas favorables ; divisez par le nombre total d'issues (1140) pour obtenir la probabilité.
