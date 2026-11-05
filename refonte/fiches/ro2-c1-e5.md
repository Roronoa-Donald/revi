# Fiche de Conception — ro2-c1-e5 : Sélection de projets sous contrainte budgétaire (sac à dos 0-1)

- **Identifiant** : `ro2-c1-e5`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 1
- **Source académique exacte** : `RD-RO/RO-10-Exercices-Modelisation.pdf:12 (Exercice 8 : Knapsack)`
- **Type d'exercice** : Modélisation en variables binaires 0-1
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Arbitrage d'investissements informatiques : choix de projets parmi 4 candidats sous une enveloppe budgétaire globale de 100 k€.

## 2. Énoncé Complet
Quatre projets P1, P2, P3, P4 ont pour coûts respectifs 30, 40, 50, 20 k€ et pour valeurs stratégiques 50, 60, 70, 30. Le budget total est de 100 k€. Soient x_j ∈ {0, 1} les variables de décision.
1. Écrivez la contrainte de budget linéaire.
2. Évaluez la valeur pour le choix {P1, P2, P4}.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
30*x1 + 40*x2 + 50*x3 + 20*x4 <= 100 ; VALIDE VALEUR=140

[Cas 1 — Contrainte budget]
30*x1 + 40*x2 + 50*x3 + 20*x4 <= 100

[Cas 2 — Choix P1, P2, P4]
VALIDE VALEUR=140

[Cas 3 — Choix P1, P2, P3]
IRREALISABLE VIOLATION_BUDGET
```

**Étapes de raisonnement & calculs vérifiés :**
1. Contrainte de budget : 30·x1 + 40·x2 + 50·x3 + 20·x4 <= 100.
2. Pour P1, P2, P4 (x1=1, x2=1, x3=0, x4=1) : Coût = 30 + 40 + 20 = 90 <= 100 (réalisable). Valeur = 50 + 60 + 30 = 140.
3. Pour P1, P2, P3 : Coût = 30 + 40 + 50 = 120 > 100 (dépassement de budget).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `VALIDE VALEUR=140`
- `VALIDE VALEUR = 140`
- `30*x1 + 40*x2 + 50*x3 + 20*x4 <= 100`
- `VALEUR=140`
- `140`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `IRREALISABLE` : Pour P1, P2, P4 le coût total est 30 + 40 + 20 = 90 k€ <= 100 k€, la sélection est réalisable.
- `VALEUR=180` : Pour P1, P2, P3 la valeur est 180 mais le coût est 120 k€ > 100 k€, ce choix dépasse le budget.
- `x1 + x2 + x3 + x4 <= 100` : N'oubliez pas de pondérer chaque projet par son coût financier spécifique (30, 40, 50, 20).
- `VALEUR=110` : 50 + 60 + 30 = 140 et non 110.
- `xj >= 0` : Précisez que les variables sont binaires : x_j in {0, 1}.
