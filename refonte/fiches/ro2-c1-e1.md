# Fiche de Conception — ro2-c1-e1 : Atelier de fabrication P1/P2 : variables et fonction objectif

- **Identifiant** : `ro2-c1-e1`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 1
- **Source académique exacte** : `RD-RO/ref/DS-B2A-IT.pdf:1 & DS-B2B-IT.pdf:1 (Partie B)`
- **Type d'exercice** : Modélisation de fonction objectif et positivité
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Un atelier produit deux types de pièces P1 et P2 générant respectivement des marges de 3 000 FCFA et 2 500 FCFA par unité. On formalise les variables de décision et l'objectif de maximisation.

## 2. Énoncé Complet
Une entreprise fabrique deux pièces P1 et P2 avec des profits unitaires respectifs de 3 000 FCFA et 2 500 FCFA. Soient x1 et x2 les quantités produites.
1. Donnez la fonction objectif Z à maximiser.
2. Évaluez le profit pour un plan de production candidat (x1 = 10, x2 = 8).

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
MAX Z = 3000*x1 + 2500*x2 ; VALIDE Z=50000

[Cas 1 — Plan x1=10, x2=8]
VALIDE Z=50000

[Cas 2 — Plan x1=15, x2=0]
VALIDE Z=45000

[Cas 3 — Plan x1=-2, x2=10]
NON_VALIDE VIOLATION_SIGNE
```

**Étapes de raisonnement & calculs vérifiés :**
1. Variables : x1 >= 0 et x2 >= 0 (contrainte physique de non-négativité).
2. Objectif : MAX Z = 3000·x1 + 2500·x2.
3. Pour x1=10 et x2=8 : Z = 3000(10) + 2500(8) = 30000 + 20000 = 50000 FCFA.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `VALIDE Z=50000`
- `VALIDE Z = 50000`
- `VALIDE Z=50 000`
- `50000`
- `Z = 50000`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `NON_VALIDE` : Pour x1=10 et x2=8, les deux quantités sont strictement positives, le plan est valide.
- `5500` : 5500 est la somme des coefficients (3000 + 2500) ; multipliez par les quantités (10 et 8).
- `VIOLATION_SIGNE` : Aucune variable n'est négative dans ce cas (x1=10 >= 0, x2=8 >= 0).
- `MIN Z` : Le problème d'un fabricant est de MAXIMISER son profit brut, pas de le minimiser.
- `Z=45000` : 3000*10 + 2500*8 = 30000 + 20000 = 50000 (45000 correspond à 15 unités de P1).
