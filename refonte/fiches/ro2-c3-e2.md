# Fiche de Conception — ro2-c3-e2 : Règle du ratio minimum : choix de la variable sortante

- **Identifiant** : `ro2-c3-e2`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 3
- **Source académique exacte** : `RD-RO/ref/Algo simplexe.pdf:6 & Examen Final RO.pdf:2`
- **Type d'exercice** : Calcul des ratios b_i / a_ik et choix de la variable sortante
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Détermination de la première contrainte qui devient saturée lorsque la variable entrante x_k augmente, afin de préserver la non-négativité de toutes les variables.

## 2. Énoncé Complet
La variable x2 entre dans la base. Le vecteur des seconds membres est b = [20, 18, 24] et la colonne de la variable entrante x2 est a_2 = [2, 3, 0].
1. Calculez les ratios b_i / a_i2 pour les coefficients strictement positifs.
2. Quelle variable de base sort de la base (parmi e1, e2, e3) selon la règle du ratio minimum ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
ratios : 10, 6 ; sortante : e2

[Cas 1 — b=[20, 18, 24], a2=[2, 3, 0]]
ratio_min : 6
sortante : e2

[Cas 2 — b=[12, 15], a1=[4, 3]]
ratio_min : 3
sortante : e1
```

**Étapes de raisonnement & calculs vérifiés :**
1. Ligne 1 (associée à e1) : a_12 = 2 > 0 => ratio = 20 / 2 = 10.
2. Ligne 2 (associée à e2) : a_22 = 3 > 0 => ratio = 18 / 3 = 6.
3. Ligne 3 (associée à e3) : a_32 = 0 <= 0 => pas de ratio calculé (division par 0 interdite).
4. Règle du ratio minimum : min(10, 6) = 6 sur la ligne 2. La variable sortante est donc e2.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `sortante : e2`
- `e2`
- `VARIABLE_SORTANTE = e2`
- `sortante: e2`
- `ratio 6 e2`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `e1` : Le ratio de la ligne 1 est 20/2 = 10 > 6. La règle du ratio MINIMUM impose de retenir le plus petit quotient (6, ligne 2).
- `e3` : Sur la ligne 3, a_32 = 0 : on ne calcule jamais de ratio lorsque le coefficient est nul ou négatif.
- `10` : 10 n'est pas le ratio minimum (10 > 6) ; la variable sortante est e2 avec le ratio 6.
- `x2` : x2 est la variable ENTRANTE, la variable SORTANTE est choisie parmi les variables actuellement en base (e1, e2, e3).
- `24` : Le coefficient en ligne 3 est 0, on ne divise pas par 0.
