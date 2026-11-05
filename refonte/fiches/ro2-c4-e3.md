# Fiche de Conception — ro2-c4-e3 : Détection d'optima multiples et arêtes optimales

- **Identifiant** : `ro2-c4-e3`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 4
- **Source académique exacte** : `RD-RO/ref/Algo simplexe.pdf:12`
- **Type d'exercice** : Détection d'optima alternatifs
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Cas de flexibilité managériale : plusieurs combinaisons de production permettent d'obtenir exactement le même profit maximal.

## 2. Énoncé Complet
Un tableau optimal présente un coût réduit nul (Δ_x3 = 0) sur la variable x3 qui est HORS base (tous les autres coûts réduits étant négatifs). Que signifie cette propriété pour le décideur ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
OPTIMA MULTIPLES (INFINITE DE SOLUTIONS OPTIMALES)

[Cas 1 — delta hors base = 0 a l'optimum]
statut : OPTIMA_MULTIPLES

[Cas 2 — tous deltas hors base < 0]
statut : OPTIMUM_UNIQUE
```

**Étapes de raisonnement & calculs vérifiés :**
1. Le tableau est optimal car aucun coût réduit n'est strictement positif.
2. La présence d'un coût réduit nul sur une variable hors base indique qu'on peut faire entrer cette variable dans la base sans modifier la valeur de Z*.
3. Conclusion : il existe une infinité de solutions optimales (optima multiples situés sur le segment reliant les deux sommets optimaux).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `OPTIMA_MULTIPLES`
- `OPTIMA MULTIPLES`
- `INFINITE DE SOLUTIONS OPTIMALES`
- `SOLUTIONS MULTIPLES`
- `NON UNIQUE`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `OPTIMUM_UNIQUE` : L'optimum ne serait unique que si tous les coûts réduits hors base étaient STRICTEMENT négatifs (< 0).
- `NON_OPTIMAL` : Le tableau est parfaitement optimal puisque aucun coefficient n'est strictement positif.
- `NON_BORNE` : La valeur optimale est finie et bien définie, ce sont les plans réalisant cet optimum qui ne sont pas uniques.
- `DEGENEREE` : Un coût réduit nul hors base indique des optima multiples, pas une solution de base dégénérée.
- `Z = 0` : C'est le coût réduit Δ qui est nul, pas la valeur de la fonction objectif Z.
