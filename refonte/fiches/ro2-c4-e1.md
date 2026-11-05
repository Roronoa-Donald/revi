# Fiche de Conception — ro2-c4-e1 : Test d'optimalité et lecture de la solution optimale finale

- **Identifiant** : `ro2-c4-e1`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 4
- **Source académique exacte** : `RD-RO/ref/Algo simplexe.pdf:11 & Examen Final RO.pdf:1`
- **Type d'exercice** : Lecture et validation de dictionnaire optimal
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Lecture directe des résultats d'optimisation dans le dictionnaire final du Simplexe : valeurs des variables de décision, des écarts et profit maximal Z*.

## 2. Énoncé Complet
Dans le tableau final d'un problème de maximisation, la ligne des coûts réduits est Δ = [x1: 0, x2: 0, e1: -1.5, e2: -0.5]. Les variables en base sont x1 = 16 et x2 = 18, et la constante vaut 76 000. Formulez la conclusion : le tableau est-il optimal ? Quelle est la valeur optimale Z* ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
OPTIMAL ; x1=16, x2=18, Z*=76000

[Cas 1 — delta <= 0, x1=16, x2=18, Z=76000]
optimal : OUI
solution : x1=16 x2=18 Z=76000

[Cas 2 — delta contient +2]
optimal : NON
solution : NON_OPTIMAL
```

**Étapes de raisonnement & calculs vérifiés :**
1. Tous les coûts réduits sont négatifs ou nuls (0, 0, -1.5, -0.5 <= 0) : le critère d'optimalité de maximisation est satisfait.
2. La solution optimale unique est x1* = 16, x2* = 18 (e1* = 0, e2* = 0).
3. La valeur optimale du profit est Z* = 76 000.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `x1=16 x2=18 Z=76000`
- `OPTIMAL Z=76000`
- `x1=16, x2=18, Z=76000`
- `76000`
- `Z* = 76000`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `NON_OPTIMAL` : Tous les coûts réduits sont <= 0, le tableau est donc bien à l'optimum absolu.
- `Z=0` : Z* vaut 76000 dans ce tableau final.
- `e1=16` : x1 est dans la base (valeur 16), e1 est hors base donc nulle (e1=0).
- `INADMISSIBLE` : Toutes les variables en base sont positives (16 >= 0, 18 >= 0).
- `-1.5` : -1.5 est le coût réduit de e1, pas la valeur optimale de Z.
