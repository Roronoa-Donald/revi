# Fiche de Conception — ro2-c3-e1 : Critère de Dantzig : choix de la variable entrante

- **Identifiant** : `ro2-c3-e1`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 3
- **Source académique exacte** : `RD-RO/ref/Algo simplexe.pdf:4 & Examen Final RO.pdf:2`
- **Type d'exercice** : Application du critère d'entrée de Dantzig
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Itération du Simplexe en maximisation : sélection de la variable hors base qui possède le coût réduit le plus positif pour augmenter au maximum l'objectif.

## 2. Énoncé Complet
Dans un tableau du Simplexe en maximisation, la ligne des coûts réduits (ligne d'évaluation) pour les variables hors base est :
- Δ_x1 = +5
- Δ_x2 = +8
- Δ_x3 = -2
1. Le tableau est-il optimal ?
2. Quelle variable doit entrer dans la base selon la règle de Dantzig ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
NON_OPTIMAL ; VARIABLE_ENTRANTE : x2

[Cas 1 — delta = (+5, +8, -2)]
optimal : NON
entrante : x2

[Cas 2 — delta = (+12, +3, +9)]
optimal : NON
entrante : x1

[Cas 3 — delta = (-4, 0, -1)]
optimal : OUI
entrante : AUCUNE
```

**Étapes de raisonnement & calculs vérifiés :**
1. Il existe des coûts réduits strictement positifs (+5 et +8) : le tableau n'est donc PAS optimal (on peut encore augmenter Z).
2. Selon la règle du plus grand accroissement marginal de Dantzig, la variable entrante est celle du coût le plus élevé : max(+5, +8) = +8, soit x2.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `entrante : x2`
- `x2`
- `VARIABLE_ENTRANTE = x2`
- `NON x2`
- `entrante: x2`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `x1` : x1 a un coût réduit de +5, or Dantzig choisit le coût le plus grand : max(5, 8) = 8, donc x2.
- `x3` : x3 a un coût réduit négatif (-2), la faire entrer ferait baisser la fonction objectif.
- `OUI` : Le tableau n'est pas optimal car il reste des coefficients strictement positifs (+5, +8).
- `OPTIMAL` : Un tableau de maximisation n'est optimal que lorsque TOUS les coûts réduits sont négatifs ou nuls (<= 0).
- `e1` : e1 est une variable d'écart déjà dans la base, on sélectionne une variable HORS base pour entrer.
