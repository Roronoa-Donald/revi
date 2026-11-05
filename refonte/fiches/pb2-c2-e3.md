# Fiche de Conception — pb2-c2-e3 : Mains de cartes avec condition 'au moins un' et probabilité

- **Identifiant** : `pb2-c2-e3`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 2
- **Source académique exacte** : `probabilites/exos/TD_1.pdf:2 (Exercice 5 suite)`
- **Type d'exercice** : Événement complémentaire et probabilité exacte
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Calcul probabiliste sur une donne de Belote : probabilité d'obtenir au moins un Roi dans sa main de 5 cartes.

## 2. Énoncé Complet
Sur une main de 5 cartes distribuée au hasard parmi 32 cartes :
1. Calculez le nombre de mains ne contenant AUCUN Roi : C(28, 5).
2. Déduisez-en le nombre de mains contenant AU MOINS UN Roi : C(32, 5) - C(28, 5).
3. Donnez la probabilité d'avoir au moins un Roi sous forme de fraction réduite.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
98280 ; 103096 ; 12887/25172

[Cas 1 — Mains sans aucun Roi]
sans_roi : 98280

[Cas 2 — Mains avec au moins un Roi]
au_moins_un_roi : 103096

[Cas 3 — Probabilite exacte fraction reduite]
p : 12887/25172
```

**Étapes de raisonnement & calculs vérifiés :**
1. Mains sans Roi : C(28, 5) = (28 x 27 x 26 x 25 x 24) / 120 = 98280.
2. Mains avec au moins un Roi : 201376 - 98280 = 103096.
3. Probabilité P = 103096 / 201376 = 1841 / 3596 (division par PGCD = 56) ≈ 0.51195.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `au_moins_un_roi : 103096`
- `103096`
- `12887/25172`
- `p : 12887/25172`
- `103096/201376`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `98280` : 98280 est le nombre de mains SANS Roi ; pour 'au moins un Roi', faites la soustraction 201376 - 98280 = 103096.
- `0.488` : 0.488 est la probabilité de n'avoir aucun Roi (98280 / 201376) ; la probabilité recherchée est 1 - 0.488 = 0.512.
- `103096/200000` : Le nombre total de mains possibles est C(32,5) = 201376, pas 200000.
- `1/4` : Il y a 4 Rois dans 32 cartes, mais avec 5 cartes en main la probabilité n'est pas 1/4 (la distribution suit une loi hypergéométrique).
- `103000` : Le résultat exact de la soustraction combinatoire est 201376 - 98280 = 103096.
