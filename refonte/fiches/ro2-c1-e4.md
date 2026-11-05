# Fiche de Conception — ro2-c1-e4 : Modélisation de transport et équilibre offre-demande

- **Identifiant** : `ro2-c1-e4`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 1
- **Source académique exacte** : `RD-RO/RO-10-Exercices-Modelisation.pdf:7 (Exercice 5 : Transport)`
- **Type d'exercice** : Modélisation de réseau de transport
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Réseau logistique : expédition de marchandises depuis 2 entrepôts vers 3 centres commerciaux avec coûts kilométriques unitaires.

## 2. Énoncé Complet
Soient x_ij les quantités expédiées de l'entrepôt i (i ∈ {1, 2}) vers la destination j (j ∈ {1, 2, 3}). Écrivez la contrainte de conservation de flux pour l'entrepôt 1 ayant une capacité totale d'offre S1 = 500 unités.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
x11 + x12 + x13 <= 500

[Cas 1 — Offre Entrepot 1]
x11 + x12 + x13 <= 500

[Cas 2 — Demande Magasin 1 D1=200]
x11 + x21 >= 200
```

**Étapes de raisonnement & calculs vérifiés :**
1. Tout ce qui part de l'entrepôt 1 va vers les destinations 1, 2 ou 3 : x11 + x12 + x13.
2. La somme ne peut excéder l'offre disponible : x11 + x12 + x13 <= 500.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `x11 + x12 + x13 <= 500`
- `x11 + x12 + x13 = 500`
- `x11+x12+x13<=500`
- `sum(x1j) <= 500`
- `x11 + x12 + x13 <= 500`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `x11 + x21 <= 500` : x11 + x21 correspond aux réceptions du magasin 1 depuis les deux entrepôts, pas aux expéditions de l'entrepôt 1.
- `x11 >= 500` : La capacité globale limite la somme des flux sortants, pas un seul flux isolé.
- `<= 200` : 200 est la demande du magasin, l'offre de l'entrepôt 1 est de 500 unités.
- `MIN 500` : Il s'agit d'une contrainte d'inégalité linéaire, pas d'une fonction objectif.
- `x11*x12` : Un problème de transport linéaire ne contient aucun terme non-linéaire (produit de variables).
