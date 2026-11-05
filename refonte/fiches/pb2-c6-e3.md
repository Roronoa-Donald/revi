# Fiche de Conception — pb2-c6-e3 : Loi normale N(mu, sigma^2) : standardisation et lecture de table

- **Identifiant** : `pb2-c6-e3`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 6
- **Source académique exacte** : `probabilites/exos/TD_6.pdf:1 (Exercice 1 & 2)`
- **Type d'exercice** : Standardisation et calcul de loi normale
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Temps de réponse d'un serveur d'application : la latence X suit une loi normale de moyenne μ = 100 ms et d'écart-type σ = 15 ms. Calcul de la probabilité que la latence dépasse 130 ms.

## 2. Énoncé Complet
La latence X d'un service web suit une loi normale X ~ N(μ = 100, σ² = 15²) (en ms).
1. Calculez la variable centrée réduite Z = (X - 100) / 15 pour x = 130 ms.
2. Sachant que la fonction de répartition de la loi normale centrée réduite vaut Φ(2.0) = 0.9772, calculez la probabilité que la latence dépasse 130 ms : P(X > 130).

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
2 ; 0.0228

[Cas 1 — X ~ N(100, 15^2), x = 130]
z : 2.0
p_depassement : 0.0228

[Cas 2 — X ~ N(100, 15^2), x = 115]
z : 1.0
p_depassement : 0.1587
```

**Étapes de raisonnement & calculs vérifiés :**
1. Standardisation : z = (130 - 100) / 15 = 30 / 15 = 2.0.
2. Par symétrie et complémentaire : P(X > 130) = P(Z > 2.0) = 1 - Φ(2.0).
3. P(X > 130) = 1 - 0.9772 = 0.0228 (soit 2.28% de requêtes au-delà du seuil critique).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `p_depassement : 0.0228`
- `0.0228`
- `2.28%`
- `0.023`
- `1 - 0.9772`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `0.9772` : 0.9772 est P(X <= 130) ; la consigne demande la probabilité que la latence DÉPASSE 130 ms : 1 - 0.9772 = 0.0228.
- `2` : 2.0 est la valeur de la variable centrée réduite Z, pas la probabilité demandée.
- `30` : 30 est l'écart brut (130 - 100) ; divisez par l'écart-type 15 pour obtenir z = 2.0.
- `0.05` : Calculez exactement 1 - 0.9772 = 0.0228.
- `0.5` : Pour x = 130 > mu = 100, la probabilité de dépassement est nettement inférieure à 0.5 (elle vaut 2.28%).
