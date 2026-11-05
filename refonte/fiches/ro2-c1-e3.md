# Fiche de Conception — ro2-c1-e3 : Modélisation d'un problème de mélange / régime alimentaire

- **Identifiant** : `ro2-c1-e3`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 1
- **Source académique exacte** : `RD-RO/RO-10-Exercices-Modelisation.pdf:3 (Exercice 2 : Diet problem)`
- **Type d'exercice** : Modélisation de minimisation avec contraintes >= 
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Composition d'un aliment bétail au coût minimum satisfaisant des besoins minimaux en protéines (≥ 800g) et vitamines (≥ 200g) à partir de deux céréales A et B.

## 2. Énoncé Complet
Un éleveur mélange deux céréales A et B coûtant respectivement 5 € et 8 € le kg. Il doit apporter au moins 800g de protéines et 200g de vitamines. Donnez l'objectif et les contraintes sous forme standardisée.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
MIN Z = 5*xA + 8*xB ; CONTRAINTES_VALIDEES

[Cas 1 — Modele standard]
MIN Z = 5*xA + 8*xB

[Cas 2 — Plan xA=100, xB=50]
VALIDE Z=900
```

**Étapes de raisonnement & calculs vérifiés :**
1. Variables : xA = kg de A, xB = kg de B (xA, xB >= 0).
2. Fonction objectif : MIN Z = 5·xA + 8·xB.
3. Contraintes de besoin minimal de type supérieur ou égal (>=).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `MIN Z = 5*xA + 8*xB`
- `MIN Z = 5*x1 + 8*x2`
- `MIN 5*xA + 8*xB`
- `VALIDE Z=900`
- `MIN Z=5xA+8xB`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `MAX Z` : Un coût d'achat doit être MINIMISÉ, pas maximisé.
- `<= 800` : Les besoins nutritionnels sont des exigences MINIMALES, la contrainte doit être >= 800.
- `NON_VALIDE` : Le modèle est parfaitement linéaire et réalisable.
- `Z = 13` : 13 est 5 + 8, or les variables xA et xB sont inconnues à optimiser.
- `xA < 0` : Une quantité physique d'aliment ne peut pas être strictement négative (xA, xB >= 0).
