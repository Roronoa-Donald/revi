# Fiche de Conception — ro2-c2-e1 : Mise sous forme standard : variables d'écart et de surplus

- **Identifiant** : `ro2-c2-e1`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 2
- **Source académique exacte** : `RD-RO/ref/Examen Final RO.pdf:1 (Partie A & B)`
- **Type d'exercice** : Forme standard canonique
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Transformation formelle d'un système d'inégalités en un système d'équations linéaires pour initialiser l'algorithme du Simplexe.

## 2. Énoncé Complet
Soient les contraintes :
- C1 (<=) : 2·x1 + 3·x2 <= 12
- C2 (>=) : x1 + x2 >= 4
Mettez ce système sous forme standard en introduisant une variable d'écart e1 >= 0 et une variable de surplus s1 >= 0.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
2*x1 + 3*x2 + e1 = 12 ; x1 + x2 - s1 = 4

[Cas 1 — Contrainte <=]
2*x1 + 3*x2 + e1 = 12

[Cas 2 — Contrainte >=]
x1 + x2 - s1 = 4
```

**Étapes de raisonnement & calculs vérifiés :**
1. Pour une inégalité <=, on AJOUTE une variable d'écart positive : 2·x1 + 3·x2 + e1 = 12 avec e1 >= 0.
2. Pour une inégalité >=, on SOUSTRAIT une variable d'écart (surplus) : x1 + x2 - s1 = 4 avec s1 >= 0.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `2*x1 + 3*x2 + e1 = 12`
- `2x1 + 3x2 + e1 = 12`
- `x1 + x2 - s1 = 4`
- `x1 + x2 - e2 = 4`
- `2*x1 + 3*x2 + s1 = 12`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `2*x1 + 3*x2 - e1 = 12` : Pour une contrainte <=, on AJOUTE la variable d'écart (+ e1), on ne la soustrait pas.
- `x1 + x2 + s1 = 4` : Pour une contrainte >=, on doit SOUSTRAIRE le surplus (- s1) pour obtenir l'égalité.
- `<= 12` : La forme standard exige des ÉGALITÉS (=), éliminez les signes <= et >=.
- `e1 < 0` : Toutes les variables d'écart de la forme standard sont impérativement non négatives (>= 0).
- `2*x1 = 12` : Ne supprimez pas les autres variables du système.
