# Fiche de Conception — ro2-c2-e3 : Détection de dégénérescence dans une solution de base

- **Identifiant** : `ro2-c2-e3`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 2
- **Source académique exacte** : `RD-RO/ref/Algo simplexe.pdf:5`
- **Type d'exercice** : Caractérisation de solution de base dégénérée
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Analyse de convergence : une solution de base est dite dégénérée si au moins une variable dans la base prend la valeur zéro, ce qui peut causer du cyclage dans le Simplexe.

## 2. Énoncé Complet
Une solution de base comprend les variables de base (x1, x2, e1) avec les valeurs respectives x1 = 4, x2 = 0, e1 = 6. Cette solution est-elle admissible ? Est-elle dégénérée ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
ADMISSIBLE DEGENEREE

[Cas 1 — x1=4, x2=0, e1=6]
ADMISSIBLE DEGENEREE

[Cas 2 — x1=5, x2=3, e1=2]
ADMISSIBLE NON_DEGENEREE

[Cas 3 — x1=4, x2=-1, e1=6]
INADMISSIBLE
```

**Étapes de raisonnement & calculs vérifiés :**
1. Admissibilité : toutes les variables sont >= 0 (4 >= 0, 0 >= 0, 6 >= 0) => ADMISSIBLE.
2. Dégénérescence : la variable de base x2 prend la valeur 0 (b2 = 0) => DEGENEREE.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `ADMISSIBLE DEGENEREE`
- `ADMISSIBLE ET DEGENEREE`
- `ADMISSIBLE, DEGENEREE`
- `DEGENEREE`
- `OUI DEGENEREE`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `NON_DEGENEREE` : Comme la variable de base x2 est nulle (x2=0), la solution est formellement dégénérée.
- `INADMISSIBLE` : Toutes les variables sont supérieures ou égales à zéro, la solution respecte donc l'admissibilité.
- `NON_ADMISSIBLE` : Une variable nulle est autorisée par la contrainte de non-négativité (x >= 0).
- `OPTIMALE` : La dégénérescence concerne la nullité d'une variable en base, pas l'optimalité de l'objectif.
- `IRREALISABLE` : La solution est réalisable (admissible).
