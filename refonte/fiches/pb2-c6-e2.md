# Fiche de Conception — pb2-c6-e2 : Espérance et variance d'une variable aléatoire continue

- **Identifiant** : `pb2-c6-e2`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 6
- **Source académique exacte** : `probabilites/exos/TD_5.pdf:1 (Exercice 2)`
- **Type d'exercice** : Calcul intégral des moments d'une loi continue
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Calcul des caractéristiques de position et de dispersion pour la densité continue f(x) = 2x sur [0, 1].

## 2. Énoncé Complet
Soit X de densité f(x) = 2x sur [0, 1].
1. Calculez l'espérance mathématique E(X) = ∫ x f(x) dx sous forme de fraction réduite.
2. Calculez le moment d'ordre 2 E(X²) = ∫ x² f(x) dx.
3. Déduisez-en la variance V(X) sous forme de fraction réduite.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
2/3 ; 1/2 ; 1/18

[Cas 1 — f(x) = 2x sur [0, 1]]
esperance : 2/3
moment2 : 1/2
variance : 1/18

[Cas 2 — f(x) = 3x^2 sur [0, 1]]
esperance : 3/4
moment2 : 3/5
variance : 3/80
```

**Étapes de raisonnement & calculs vérifiés :**
1. E(X) = int_0^1 x·(2x) dx = int_0^1 2x^2 dx = [2x^3 / 3]_0^1 = 2/3 ≈ 0.6667.
2. E(X^2) = int_0^1 x^2·(2x) dx = int_0^1 2x^3 dx = [2x^4 / 4]_0^1 = [x^4 / 2]_0^1 = 1/2 = 0.5.
3. Variance par Koenig-Huygens : V(X) = E(X^2) - [E(X)]^2 = 1/2 - (2/3)^2 = 1/2 - 4/9 = (9 - 8) / 18 = 1/18 ≈ 0.0556.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `esperance : 2/3`
- `2/3`
- `1/18`
- `variance : 1/18`
- `0.6667`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `1/2` : 1/2 = 0.5 est le milieu de l'intervalle [0, 1], mais comme la densité est croissante (f(x)=2x), la masse de probabilité est déportée vers la droite : E(X) = 2/3.
- `1/3` : 1/3 est la primitive de x^2 sans le coefficient 2 ; avec f(x)=2x, E(X) = 2/3.
- `1/4` : Vérifiez la formule de Koenig-Huygens : 1/2 - 4/9 = 1/18.
- `0.055` : La valeur exacte attendue en fraction réduite est 1/18 (arrondi : 0.0556).
- `2` : L'espérance d'une variable bornée dans [0, 1] ne peut pas être supérieure à 1 ! E(X) = 2/3.
