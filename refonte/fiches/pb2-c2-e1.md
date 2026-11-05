# Fiche de Conception — pb2-c2-e1 : Coefficients multinomiaux et répartition en groupes

- **Identifiant** : `pb2-c2-e1`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 2
- **Source académique exacte** : `probabilites/exos/TD_1.pdf:1 (Exercice 4)`
- **Type d'exercice** : Calcul de coefficient multinomial
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Affectation de personnel de sécurité : répartition de 8 agents de police en trois groupes distincts : 3 en patrouille, 2 en garde statique et 3 en réserve.

## 2. Énoncé Complet
On doit répartir 8 policiers en trois groupes : 3 en patrouille, 2 en garde et 3 en réserve. De combien de manières différentes peut-on constituer ces trois groupes ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
560

[Cas 1 — Répartition 3, 2, 3 sur 8]
repartitions : 560

[Cas 2 — Répartition 2, 2, 2 sur 6]
repartitions : 90

[Cas 3 — Répartition 4, 2, 1 sur 7]
repartitions : 105
```

**Étapes de raisonnement & calculs vérifiés :**
1. La formule du multinomial est n! / (n1! n2! n3!) avec n1+n2+n3 = n.
2. Ici n=8, n1=3, n2=2, n3=3.
3. Calcul : 8! / (3! x 2! x 3!) = 40320 / (6 x 2 x 6) = 40320 / 72 = 560.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `repartitions : 560`
- `560`
- `repartitions: 560`
- `total : 560`
- `560 manieres`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `40320` : 40320 = 8! est le nombre de permutations sans tenir compte du fait que l'ordre des agents à l'intérieur d'un même groupe est indifférent.
- `72` : 72 est le dénominateur (3! x 2! x 3!). Divisez 8! (40320) par 72 pour trouver 560.
- `1120` : Attention : n'oubliez pas de diviser par le 2! du groupe de garde.
- `56` : 56 = C(8, 3) ne forme que le premier groupe de patrouille ; il reste ensuite à choisir la garde parmi les 5 restants : 56 x C(5, 2) = 560.
- `336` : Vérifiez vos simplifications factorielles : 8 x 7 x 6 x 5 x 4 / (6 x 2) = 560.
