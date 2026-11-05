# Fiche de Conception — pb2-c4-e1 : Dé truqué : constante de normalisation, espérance et variance

- **Identifiant** : `pb2-c4-e1`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 4
- **Source académique exacte** : `probabilites/exos/TD_3.pdf:1 (Exercice 1)`
- **Type d'exercice** : Loi discrète, normalisation et moments
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Soit un dé à 6 faces dont la loi de probabilité est proportionnelle au numéro de la face : P(X = k) = k·a pour k ∈ {1, 2, 3, 4, 5, 6}.

## 2. Énoncé Complet
Un dé à 6 faces est truqué de telle sorte que la probabilité d'obtenir la face k (pour k de 1 à 6) est P(X = k) = k·a.
1. Déterminez la constante a pour que X définisse une loi de probabilité.
2. Calculez l'espérance mathématique E(X) en fraction réduite.
3. Calculez la variance V(X) en fraction réduite.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
1/21 ; 13/3 ; 20/9

[Cas 1 — Dé truqué 1 à 6]
a : 1/21
esperance : 13/3
variance : 20/9

[Cas 2 — Dé truqué 1 à 4]
a : 1/10
esperance : 3
variance : 1
```

**Étapes de raisonnement & calculs vérifiés :**
1. Somme des probabilités = 1 : a·(1+2+3+4+5+6) = 21·a = 1 => a = 1/21.
2. Espérance : E(X) = sum(k·P(X=k)) = sum(k·(k·a)) = a·sum(k^2) = (1/21)·(1+4+9+16+25+36) = 91/21 = 13/3 ≈ 4.3333.
3. Moment d'ordre 2 : E(X^2) = a·sum(k^3) = (1/21)·(1+8+27+64+125+216) = 441/21 = 21.
4. Variance : V(X) = E(X^2) - [E(X)]^2 = 21 - (13/3)^2 = 21 - 169/9 = (189 - 169)/9 = 20/9 ≈ 2.2222.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `esperance : 13/3`
- `13/3`
- `4.3333`
- `E(X) = 13/3`
- `esperance: 13/3`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `3.5` : 3.5 est l'espérance d'un dé équilibré parfait ; comme ce dé favorise les grandes faces, l'espérance est supérieure (13/3 ≈ 4.33).
- `1/6` : 1/6 supposerait l'équiprobabilité, or la probabilité est proportionnelle à la face : a = 1/21.
- `91` : 91 est la somme des k^2 ; n'oubliez pas de multiplier par la constante a = 1/21, ce qui donne 91/21 = 13/3.
- `21` : 21 est E(X^2) ; la variance est V(X) = E(X^2) - [E(X)]^2 = 21 - (13/3)^2 = 20/9.
- `7/2` : 7/2 = 3.5 correspond au dé non truqué ; calculez E(X) avec la pondération k^2/21.
