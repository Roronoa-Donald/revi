# Fiche de Conception — pb2-c1-e1 : Entretiens de recrutement et principe additif

- **Identifiant** : `pb2-c1-e1`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 1
- **Source académique exacte** : `probabilites/exos/TD_1.pdf:1 (Exercice 1)`
- **Type d'exercice** : Calcul combinatoire avec saisie d'étapes
- **Composant d'interface** : Grille de calcul CodeLab (mode analyse mathématique)

## 1. Contexte Métier & Académique
Un cabinet RH auditionne 4 candidats pour un poste. Le recruteur peut décider de ne retenir personne, ou d'en retenir 1, 2, 3 ou 4. L'étudiant applique le principe d'addition et la somme des coefficients binomiaux.

## 2. Énoncé Complet
Quatre personnes se présentent à un entretien d'embauche. Le recruteur a la possibilité soit de ne choisir personne, soit d'en choisir 1, 2, 3 ou 4. Calculez le nombre de choix possibles pour chaque sous-cas, puis le nombre total de décisions possibles pour le recruteur.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
16

[Cas 1 — 4 candidats]
total : 16

[Cas 2 — 5 candidats]
total : 32

[Cas 3 — 3 candidats]
total : 8
```

**Étapes de raisonnement & calculs vérifiés :**
1. Pour n candidats, le nombre de façons d'en retenir k est C(n, k).
2. La somme totale vaut C(n, 0) + C(n, 1) + ... + C(n, n) = 2^n.
3. Pour n=4 : 1 + 4 + 6 + 4 + 1 = 16.
4. Pour n=5 : 2^5 = 32.
5. Pour n=3 : 2^3 = 8.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `total : 16`
- `16`
- `total: 16`
- `total = 16`
- `somme : 16`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `4` : 4 n'est que le nombre de façons de choisir un seul candidat, vous devez sommer toutes les options de 0 à 4.
- `24` : 24 correspond à 4! (permutations), or l'ordre de choix des candidats n'a pas d'importance ici.
- `15` : Vous avez probablement oublié le cas où le recruteur ne choisit personne (C(4,0) = 1).
- `8` : 8 correspond à 2^3, pour 4 candidats la formule est 2^4 = 16.
- `10` : Attention au calcul des combinaisons : C(4,2) vaut 6 et non 2.
