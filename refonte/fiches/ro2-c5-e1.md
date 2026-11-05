# Fiche de Conception — ro2-c5-e1 : Construction systématique du problème dual

- **Identifiant** : `ro2-c5-e1`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 5
- **Source académique exacte** : `RD-RO/ref/Examen Final RO.pdf:2 (Partie C : Dualité)`
- **Type d'exercice** : Transformation Primal -> Dual
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Théorie de la dualité de Von Neumann : passage formel du primal (maximisation sous contraintes <=) au dual (minimisation sous contraintes >=).

## 2. Énoncé Complet
Soit le problème primal :
MAX Z = 30·x1 + 20·x2
sous :
- 2·x1 + x2 <= 100
- x1 + x2 <= 80
avec x1, x2 >= 0.
Écrivez la fonction objectif duale W à minimiser et les contraintes associées aux variables duales y1, y2 >= 0.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
MIN W = 100*y1 + 80*y2 ; 2*y1 + y2 >= 30 ; y1 + y2 >= 20

[Cas 1 — Objectif dual]
MIN W = 100*y1 + 80*y2

[Cas 2 — Contrainte duale 1]
2*y1 + y2 >= 30

[Cas 3 — Contrainte duale 2]
y1 + y2 >= 20
```

**Étapes de raisonnement & calculs vérifiés :**
1. Les seconds membres du primal (100, 80) deviennent les coefficients de l'objectif dual : MIN W = 100·y1 + 80·y2.
2. La matrice des contraintes est transposée :
   - Colonne x1 [2, 1]^T devient la contrainte 1 : 2·y1 + y2 >= 30 (profit unitaire de x1).
   - Colonne x2 [1, 1]^T devient la contrainte 2 : y1 + y2 >= 20 (profit unitaire de x2).
3. Variables duales non négatives : y1, y2 >= 0.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `MIN W = 100*y1 + 80*y2`
- `MIN W = 100y1 + 80y2`
- `MIN 100*y1 + 80*y2`
- `2*y1 + y2 >= 30`
- `y1 + y2 >= 20`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `MAX W` : Le dual d'un problème de maximisation est un problème de MINIMISATION.
- `<= 30` : Dans le dual d'un problème standard de maximisation, les contraintes sont de type SUPÉRIEUR OU ÉGAL (>=).
- `30*y1 + 20*y2` : 30 et 20 sont les seconds membres du dual (coefficients de la fonction objectif primale), pas les coefficients de W.
- `x1 + x2` : Le dual s'exprime avec les variables duales y1 et y2, pas avec les variables primales x1, x2.
- `W = Z` : Donnez la forme algébrique développée en fonction de y1 et y2.
