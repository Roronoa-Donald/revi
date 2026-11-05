# Fiche de Conception — pb2-c1-e3 : Mots de 3 lettres : arrangements et événement complémentaire

- **Identifiant** : `pb2-c1-e3`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 1
- **Source académique exacte** : `probabilites/exos/TD_1.pdf:1 (Exercice 3)`
- **Type d'exercice** : Calcul combinatoire et dénombrement d'événements
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Génération de codes ou mots de passe sur un alphabet de 26 lettres (6 voyelles, 20 consonnes). Décompte direct et passage par le complémentaire pour la condition 'au moins une voyelle'.

## 2. Énoncé Complet
Avec les 26 lettres de l'alphabet (6 voyelles, 20 consonnes), on forme des mots de 3 lettres. Calculez :
1. Le nombre total de mots possibles (N1).
2. Le nombre de mots ayant 3 lettres distinctes (N2).
3. Le nombre de mots contenant au moins une voyelle (N4).

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
17576 ; 15600 ; 9576

[Cas 1 — Total de mots N1]
N1 : 17576

[Cas 2 — Lettres distinctes N2]
N2 : 15600

[Cas 3 — Au moins une voyelle N4]
N4 : 9576
```

**Étapes de raisonnement & calculs vérifiés :**
1. N1 = 26^3 = 17576.
2. N2 = A(26, 3) = 26 x 25 x 24 = 15600.
3. Pour N4, le complémentaire est 'aucun voyelle' (que des consonnes) = 20^3 = 8000. D'où N4 = 26^3 - 20^3 = 17576 - 8000 = 9576.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `N1 : 17576`
- `17576`
- `total : 17576`
- `N1 = 17576`
- `N1: 17576`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `2600` : 26 x 25 x 4 n'est pas le calcul complet : pour 3 lettres distinctes, calculez A(26, 3) = 26 x 25 x 24 = 15600.
- `8000` : 8000 est le nombre de mots formés UNIQUEMENT de consonnes ; pour 'au moins une voyelle', soustrayez ce résultat du total : 17576 - 8000 = 9576.
- `216` : 216 = 6^3 ne compte que les mots formés exclusivement de voyelles.
- `7200` : 7200 compte les mots avec exactement 2 consonnes et 1 voyelle, pas 'au moins une voyelle'.
- `1560` : Vérifiez vos multiplications : 26 x 25 x 24 = 15600 (ne pas oublier le zéro des dizaines).
