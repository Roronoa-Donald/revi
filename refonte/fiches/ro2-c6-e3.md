# Fiche de Conception — ro2-c6-e3 : Modélisation linéaire globale du crashing sous contrainte de budget

- **Identifiant** : `ro2-c6-e3`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 6
- **Source académique exacte** : `RD-RO/ref/EXamen B2-IT.pdf:2 (Question 4 : Surcoût <= 15)`
- **Type d'exercice** : Modélisation linéaire intégrée d'ordonnancement
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Formulation du problème complet d'ordonnancement durée-coût sous forme de programme linéaire continu.

## 2. Énoncé Complet
Soient t_i les dates de début des tâches et r_i les réductions de durée (0 <= r_i <= r_i^max) au coût unitaire c_i. Écrivez la contrainte de budget imposant que le surcoût total d'accélération ne dépasse pas B = 15 €.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
10*rA + 6*rB + 15*rD <= 15

[Cas 1 — Contrainte de budget surcout <= 15]
10*rA + 6*rB + 15*rD <= 15

[Cas 2 — Contrainte de relation de fin de A et debut de B]
tB - tA + rA >= 3
```

**Étapes de raisonnement & calculs vérifiés :**
1. Le surcoût total est la somme des réductions pondérées par leurs coûts unitaires : sum(c_i · r_i).
2. Avec les coûts cA = 10, cB = 6, cD = 15 : 10·rA + 6·rB + 15·rD <= 15.
3. Cette contrainte garantit que le plan d'accélération respecte l'enveloppe budgétaire allouée.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `10*rA + 6*rB + 15*rD <= 15`
- `10*rA + 6*rB + 15*rD <= 15 €`
- `10rA + 6rB + 15rD <= 15`
- `10*r1 + 6*r2 + 15*r3 <= 15`
- `sum(ci*ri) <= 15`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `rA + rB + rD <= 15` : N'oubliez pas de multiplier chaque réduction par son coût marginal (10 pour A, 6 pour B, 15 pour D).
- `>= 15` : Le surcoût ne doit pas DÉPASSER 15 €, la contrainte est donc un plafond (<= 15).
- `tA + tB <= 15` : Les variables de réduction sont r_i, pas les dates de démarrage t_i.
- `MAX 15` : Il s'agit d'une contrainte budgétaire linéaire, pas d'une fonction objectif.
- `rA < 0` : Les réductions de durée sont positives ou nulles (0 <= r_i <= r_i^max).
