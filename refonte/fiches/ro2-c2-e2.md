# Fiche de Conception — ro2-c2-e2 : Solution de base admissible et variables hors base

- **Identifiant** : `ro2-c2-e2`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 2
- **Source académique exacte** : `RD-RO/ref/Examen Final RO.pdf:1 (QCM 3)`
- **Type d'exercice** : Calcul de solution de base
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Définition matricielle : pour un problème à n variables et m contraintes (n > m), une solution de base est obtenue en fixant n - m variables hors base à zéro.

## 2. Énoncé Complet
Soit le système standard à 4 variables (x1, x2, e1, e2) et 2 contraintes :
- 2·x1 + x2 + e1 = 10
- x1 + 2·x2 + e2 = 8
En choisissant (x1, x2) comme variables hors base (fixées à 0), déterminez la solution de base associée et sa valeur Z = 3·x1 + 2·x2.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
e1=10, e2=8, Z=0 ; ADMISSIBLE

[Cas 1 — Base initiale e1, e2]
e1=10 e2=8 Z=0

[Cas 2 — Base x1, e2 avec x2=0, e1=0]
x1=5 e2=3 Z=15
```

**Étapes de raisonnement & calculs vérifiés :**
1. Variables hors base : x1 = 0, x2 = 0.
2. Remplacement dans le système : 0 + 0 + e1 = 10 => e1 = 10 ; 0 + 0 + e2 = 8 => e2 = 8.
3. Toutes les variables de base sont >= 0 (10 >= 0, 8 >= 0) : la solution de base est admissible.
4. Valeur de l'objectif : Z = 3(0) + 2(0) = 0.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `e1=10 e2=8 Z=0`
- `e1=10, e2=8, Z=0`
- `e1=10 e2=8`
- `Z=0`
- `ADMISSIBLE e1=10 e2=8`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `INADMISSIBLE` : e1=10 et e2=8 sont toutes deux positives (>= 0), la base est donc parfaitement admissible.
- `x1=10` : x1 est hors base, elle est donc fixée à 0 ; c'est e1 qui vaut 10.
- `Z=30` : Comme x1=0 et x2=0, la valeur de l'objectif en ce sommet initial est Z = 0.
- `e1=0` : Dans cette base, e1 est variable de base et vaut 10.
- `e2=0` : e2 vaut 8 dans la base initiale (x1=0, x2=0).
