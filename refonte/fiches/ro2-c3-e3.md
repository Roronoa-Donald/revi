# Fiche de Conception — ro2-c3-e3 : Pivotage de Gauss et mise à jour du tableau

- **Identifiant** : `ro2-c3-e3`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 3
- **Source académique exacte** : `RD-RO/ref/Algo simplexe.pdf:8-10`
- **Type d'exercice** : Calcul de pivot de Gauss matriciel
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Opérations élémentaires sur les lignes : normalisation de la ligne du pivot et élimination de la variable entrante sur toutes les autres lignes.

## 2. Énoncé Complet
Le pivot est situé à l'intersection de la ligne 2 et de la colonne x2, avec une valeur de pivot P = 2. La ligne de pivot initiale est : L2 = [x1: 4, x2: 2, e1: 0, e2: 1 | b: 8].
1. Donnez la nouvelle ligne de pivot L2' normalisée (divisée par P).
2. Sachant que L1 = [x1: 3, x2: 1, e1: 1, e2: 0 | b: 10], calculez la nouvelle ligne L1' = L1 - 1·L2'.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
L2' = [2, 1, 0, 0.5 | 4] ; L1' = [1, 0, 1, -0.5 | 6]

[Cas 1 — Pivot P=2, L2=[4, 2, 0, 1 | 8]]
L2_prime : 2 1 0 0.5 4
L1_prime : 1 0 1 -0.5 6

[Cas 2 — Pivot P=3, L2=[3, 3, 0, 1 | 9]]
L2_prime : 1 1 0 0.3333 3
```

**Étapes de raisonnement & calculs vérifiés :**
1. Normalisation : L2' = L2 / 2 = [4/2, 2/2, 0/2, 1/2 | 8/2] = [2, 1, 0, 0.5 | 4].
2. Élimination sur L1 : le coefficient sur la colonne pivot est 1, donc L1' = L1 - 1·L2' = [3-2, 1-1, 1-0, 0-0.5 | 10-4] = [1, 0, 1, -0.5 | 6].

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `L2_prime : 2 1 0 0.5 4`
- `2 1 0 0.5 4`
- `L1_prime : 1 0 1 -0.5 6`
- `1 0 1 -0.5 6`
- `L2' = [2, 1, 0, 0.5 | 4]`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `4 2 0 1 8` : Vous n'avez pas divisé par la valeur du pivot P = 2.
- `L1' = L1` : Il faut appliquer l'opération élémentaire L1 - a_1k·L2' pour annuler le coefficient de la colonne pivot.
- `b=8` : Le second membre de L2' est divisé par 2, il devient 4.
- `0.5` : Spécifiez tous les coefficients de la ligne recalculée.
- `P=1` : Le pivot initial est 2, après division il devient 1.
