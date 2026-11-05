# Fiche de Conception — pb2-c1-e2 : Rangement dans des tiroirs : p-listes vs arrangements

- **Identifiant** : `pb2-c1-e2`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 1
- **Source académique exacte** : `probabilites/exos/TD_1.pdf:1 (Exercice 2)`
- **Type d'exercice** : Calcul combinatoire avec distinctions fondamentales
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Modélisation de l'affectation de tâches ou de données en mémoire. On distingue une application quelconque (plusieurs objets par case) d'une injection (au plus un objet par case).

## 2. Énoncé Complet
1. On dispose de 3 tiroirs A, B, C dans lesquels on range 7 objets discernables numérotés 1 à 7 (plusieurs objets par tiroir autorisés). Combien de rangements distincts ?
2. On dispose de 3 objets discernables et de 5 tiroirs avec au plus un objet par tiroir. Combien de rangements ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
2187 ; 60

[Cas 1 — 7 objets dans 3 tiroirs]
rangements : 2187

[Cas 2 — 3 objets dans 5 tiroirs au plus 1]
rangements : 60
```

**Étapes de raisonnement & calculs vérifiés :**
1. Chaque objet parmi les 7 a 3 tiroirs possibles : 3 x 3 x ... x 3 = 3^7 = 2187 (p-liste avec n=3, p=7).
2. Ranger 3 objets dans 5 tiroirs sans répétition correspond à un arrangement A(5, 3) = 5 x 4 x 3 = 60.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `rangements : 2187`
- `2187`
- `3^7 = 2187`
- `rangements: 2187`
- `total : 2187`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `7^3` : Attention au piège classique : ce sont les 7 objets qui choisissent parmi 3 tiroirs (3^7), et non l'inverse (7^3 = 343).
- `343` : 343 = 7^3 résulte de l'inversion de n et p. Chaque objet a 3 choix, donc 3^7 = 2187.
- `21` : 21 = 3 x 7 correspond au principe additif répété, or les choix sont indépendants et multiplicatifs.
- `10` : 10 = C(5, 3) ignore l'ordre : comme les 3 objets sont discernables (1, 2, 3), il faut utiliser les arrangements A(5, 3) = 60.
- `125` : 125 = 5^3 autorise plusieurs objets par tiroir, or la consigne impose 'au plus un objet par tiroir'.
