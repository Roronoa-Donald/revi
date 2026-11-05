# Fiche de Conception — pb2-c2-e2 : Mains de cartes à la Belote : combinaisons simples

- **Identifiant** : `pb2-c2-e2`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 2
- **Source académique exacte** : `probabilites/exos/TD_1.pdf:1 (Exercice 5)`
- **Type d'exercice** : Calcul de combinaisons et fractions
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Dans un jeu de 32 cartes (Belote), chaque joueur reçoit une main de 5 cartes. Les cartes sont distribuées simultanément (l'ordre dans la main n'importe pas).

## 2. Énoncé Complet
Dans un jeu de 32 cartes, on distribue une main de 5 cartes. Calculez :
1. Le nombre total de mains de 5 cartes possibles : C(32, 5).
2. Le nombre de mains contenant le Valet de trèfle : C(31, 4).
3. Le nombre de mains contenant exactement un As : C(4, 1) x C(28, 4).

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
201376 ; 31465 ; 81840

[Cas 1 — Total de mains possibles]
total : 201376

[Cas 2 — Mains avec le Valet de trefle]
valet_trefle : 31465

[Cas 3 — Mains avec exactement un As]
exactement_un_as : 81840
```

**Étapes de raisonnement & calculs vérifiés :**
1. Total = C(32, 5) = (32 x 31 x 30 x 29 x 28) / (5 x 4 x 3 x 2 x 1) = 24165120 / 120 = 201376.
2. Valet de trèfle fixé : il reste à choisir 4 cartes parmi les 31 restantes : C(31, 4) = (31 x 30 x 29 x 28) / 24 = 31465.
3. Exactement 1 As : on choisit 1 As parmi 4 (C(4,1)=4) et 4 non-As parmi 28 (C(28,4)=20460) : 4 x 20460 = 81840.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `total : 201376`
- `201376`
- `C(32,5) = 201376`
- `total: 201376`
- `201 376`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `24165120` : 24165120 = A(32, 5) prend en compte l'ordre des cartes distribuées ; or une main de cartes est une combinaison non ordonnée, divisez par 5! (120).
- `35960` : C(31, 4) vaut 31465 ; vérifiez le produit (31 x 30 x 29 x 28) / 24.
- `20460` : 20460 est C(28, 4) (le choix des 4 cartes sans As) ; multipliez par C(4, 1) = 4 pour tenir compte du choix de l'As (4 x 20460 = 81840).
- `4` : 4 n'est que le nombre d'As possibles dans le jeu ; il faut aussi choisir les 4 autres cartes parmi les 28 non-As.
- `65780` : Erreur de simplification : C(32, 5) = 201376.
