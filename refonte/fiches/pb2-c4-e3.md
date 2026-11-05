# Fiche de Conception — pb2-c4-e3 : Schéma de Bernoulli et loi binomiale B(n, p)

- **Identifiant** : `pb2-c4-e3`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 4
- **Source académique exacte** : `probabilites/exos/TD_4.pdf:1 (Exercice 1)`
- **Type d'exercice** : Calcul de probabilités binomiales
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Transmission de trames réseau sur un canal bruité : chaque trame a une probabilité indépendante p = 0.1 d'être corrompue. On transmet un bloc de n = 5 trames.

## 2. Énoncé Complet
On transmet n = 5 trames indépendantes. La probabilité d'erreur par trame est p = 0.1. Soit X le nombre de trames erronées (X ~ B(5, 0.1)).
1. Calculez la probabilité de n'avoir AUCUNE erreur P(X = 0).
2. Calculez la probabilité d'avoir EXACTEMENT une erreur P(X = 1).
3. Calculez l'espérance E(X).

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
0.5905 ; 0.3281 ; 0.5

[Cas 1 — n=5, p=0.1]
p_zero : 0.5905
p_un : 0.3281
esperance : 0.5

[Cas 2 — n=10, p=0.05]
p_zero : 0.5987
p_un : 0.3151
esperance : 0.5
```

**Étapes de raisonnement & calculs vérifiés :**
1. P(X = 0) = C(5, 0) · (0.1)^0 · (0.9)^5 = 1 · 1 · 0.59049 ≈ 0.5905.
2. P(X = 1) = C(5, 1) · (0.1)^1 · (0.9)^4 = 5 · 0.1 · 0.6561 = 0.32805 ≈ 0.3281.
3. E(X) = n · p = 5 · 0.1 = 0.5.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `p_zero : 0.5905`
- `0.5905`
- `0.59049`
- `P(X=0) = 0.5905`
- `0,5905`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `0.9` : 0.9 est la probabilité d'une seule trame sans erreur ; pour 5 trames indépendantes, il faut calculer (0.9)^5 = 0.5905.
- `0.5` : 0.5 est l'espérance E(X) = n·p, pas la probabilité P(X = 0).
- `0.0656` : 0.0656 = (0.1) x (0.9)^4 oublie le coefficient binomial C(5, 1) = 5 (l'erreur peut survenir sur n'importe laquelle des 5 trames).
- `0.1` : 0.1 est le paramètre p de la loi, pas la probabilité sur le bloc entier.
- `0.328` : Pour P(X=0), la réponse est 0.5905 (0.3281 est P(X=1)).
