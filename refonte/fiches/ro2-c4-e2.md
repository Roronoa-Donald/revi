# Fiche de Conception — ro2-c4-e2 : Détection d'un problème non borné dans le Simplexe

- **Identifiant** : `ro2-c4-e2`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 4
- **Source académique exacte** : `RD-RO/ref/Algo simplexe.pdf:7`
- **Type d'exercice** : Identification de critère de non-bornitude
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Détection d'anomalie de modélisation : le profit peut croître indéfiniment sans qu'aucune contrainte de ressource ne s'y oppose.

## 2. Énoncé Complet
La variable x1 doit entrer dans la base (Δ_x1 = +4 > 0). Cependant, tous les coefficients de sa colonne dans le tableau sont négatifs ou nuls : a_1 = [-1, 0, -2]. Que concluez-vous sur le problème linéaire ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
PROBLEME NON BORNE (Z -> +infini)

[Cas 1 — a1=[-1, 0, -2], delta1=+4]
statut : NON_BORNE

[Cas 2 — a1=[2, -1, 0], delta1=+4]
statut : BORNE_RATIO_VALIDE
```

**Étapes de raisonnement & calculs vérifiés :**
1. Comme tous les coefficients a_i1 sont <= 0, il n'existe aucun a_i1 > 0 pour calculer un ratio b_i / a_i1.
2. La variable entrante x1 peut donc croître indéfiniment sans violer aucune contrainte.
3. Conclusion : le problème est NON BORNÉ (la fonction objectif Z tend vers +∞).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `NON_BORNE`
- `PROBLEME NON BORNE`
- `Z -> +infini`
- `NON BORNE`
- `INFINI`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `OPTIMAL` : Le problème n'a pas d'optimum fini : la fonction objectif peut croître vers +infini sans borne.
- `IRREALISABLE` : Le problème est réalisable (il existe des solutions), c'est la fonction objectif qui n'est pas majorée.
- `DEGENEREE` : L'absence de coefficient strictement positif caractérise la non-bornitude, pas la dégénérescence.
- `ratio = 0` : On ne calcule aucun ratio quand les coefficients sont négatifs ou nuls.
- `CYCLE` : Le Simplexe s'arrête immédiatement en déclarant le problème non borné.
