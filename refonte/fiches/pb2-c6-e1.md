# Fiche de Conception — pb2-c6-e1 : Densité continue, constante de normalisation et fonction de répartition

- **Identifiant** : `pb2-c6-e1`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 6
- **Source académique exacte** : `probabilites/exos/TD_5.pdf:1 (Exercice 1)`
- **Type d'exercice** : Calcul intégral de densité continue
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Soit la variable aléatoire continue X de densité de probabilité f(x) = k·x pour x ∈ [0, 1] et f(x) = 0 ailleurs.

## 2. Énoncé Complet
Soit X une variable aléatoire continue de fonction de densité f(x) = k·x définie sur l'intervalle [0, 1] (et nulle ailleurs).
1. Déterminez la valeur de la constante k pour que f soit une densité de probabilité.
2. Donnez l'expression de la fonction de répartition F(x) sur [0, 1] et calculez F(0.5).

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
2 ; 0.25

[Cas 1 — f(x) = k*x sur [0, 1]]
k : 2
F_0_5 : 0.25

[Cas 2 — f(x) = k*x^2 sur [0, 1]]
k : 3
F_0_5 : 0.125
```

**Étapes de raisonnement & calculs vérifiés :**
1. Condition de normalisation : intégrale de 0 à 1 de f(x) dx = 1.
2. int_0^1 k·x dx = [k · x^2 / 2]_0^1 = k/2 = 1 => k = 2.
3. Fonction de répartition F(x) = int_0^x 2t dt = [t^2]_0^x = x^2 pour x dans [0, 1].
4. En x = 0.5 : F(0.5) = (0.5)^2 = 0.25 (ou 1/4).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `k : 2`
- `2`
- `0.25`
- `1/4`
- `k = 2`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `1` : Si k=1, l'intégrale de x sur [0, 1] ne vaut que 1/2, ce qui ne satisfait pas l'axiome de probabilité totale (qui doit valoir 1) ; k vaut 2.
- `0.5` : 0.5 est l'intégrale de x sans constante ; k/2 = 1 entraîne k = 2.
- `4` : k=4 donnerait une intégrale égale à 2 au lieu de 1.
- `x` : La primitive de 2x est x^2, donc F(0.5) = (0.5)^2 = 0.25.
- `0.50` : F(0.5) = 0.25 (la probabilité que X <= 0.5 est de 25% car la densité croît vers 1).
