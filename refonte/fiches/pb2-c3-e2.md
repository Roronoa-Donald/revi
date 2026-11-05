# Fiche de Conception — pb2-c3-e2 : Formule des probabilités totales sur une partition

- **Identifiant** : `pb2-c3-e2`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 3
- **Source académique exacte** : `probabilites/exos/TD_2.pdf:1 (Exercice 2)`
- **Type d'exercice** : Application de la formule des probabilités totales
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Un centre de données reçoit du trafic de trois fournisseurs F1 (50%), F2 (30%) et F3 (20%). Les taux d'erreurs de paquets sont respectivement de 1%, 2% et 5%.

## 2. Énoncé Complet
Trois serveurs F1, F2, F3 traitent respectivement 50%, 30% et 20% des requêtes réseau. Leurs taux de défaillance respectifs sont P(D|F1) = 0.01, P(D|F2) = 0.02 et P(D|F3) = 0.05. Calculez la probabilité globale P(D) qu'une requête choisie au hasard subisse une défaillance.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
0.021

[Cas 1 — 50%, 30%, 20% avec 1%, 2%, 5%]
p_defaillance : 0.021

[Cas 2 — 60%, 40% avec 2%, 4%]
p_defaillance : 0.028
```

**Étapes de raisonnement & calculs vérifiés :**
1. Les serveurs forment un système complet d'événements.
2. P(D) = P(D|F1)P(F1) + P(D|F2)P(F2) + P(D|F3)P(F3).
3. P(D) = 0.01 x 0.50 + 0.02 x 0.30 + 0.05 x 0.20 = 0.005 + 0.006 + 0.010 = 0.021 (soit 2.1%).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `p_defaillance : 0.021`
- `0.021`
- `2.1%`
- `P(D) = 0.021`
- `0,021`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `0.08` : Vous avez simplement additionné les taux 0.01 + 0.02 + 0.05 sans les pondérer par les parts de trafic respectives.
- `0.0267` : 0.0267 est la moyenne arithmétique simple (8% / 3) ; il faut pondérer par 50%, 30% et 20%.
- `0.21` : Attention aux zéros après la virgule : 0.5 x 0.01 = 0.005 et non 0.05.
- `0.01` : 0.01 est le taux minimal de F1, or F2 et F3 ont des taux de panne plus élevés qui augmentent la moyenne à 0.021.
- `0.05` : 0.05 est le taux maximal de F3 qui ne traite que 20% du volume total.
