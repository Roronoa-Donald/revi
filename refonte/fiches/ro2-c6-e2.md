# Fiche de Conception — ro2-c6-e2 : Réduction de durée de projet (crashing) au moindre coût

- **Identifiant** : `ro2-c6-e2`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 6
- **Source académique exacte** : `RD-RO/ref/EXamen B2-IT.pdf:1-2 (Questions 2 et 3)`
- **Type d'exercice** : Optimisation du compromis durée-coût
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Le client exige de réduire la durée du projet de 12 jours à 10 jours (gain de 2 jours). L'arbitrage consiste à accélérer en priorité les tâches critiques dont le coût marginal par jour gagné est le plus faible.

## 2. Énoncé Complet
Le chemin critique est A-B-D (durée totale 12 jours). Pour gagner 2 jours et terminer en 10 jours, on peut réduire :
- Tâche A : max 1 jour réductible pour un surcoût de 10 €/jour
- Tâche B : max 2 jours réductibles pour un surcoût de 6 €/jour
- Tâche D : max 2 jours réductibles pour un surcoût de 15 €/jour
Quelle combinaison de réduction offre le surcoût total minimal pour gagner exactement 2 jours ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
reduire B de 2 jours ; surcout = 12 €

[Cas 1 — Gagner 2 jours au moindre cout]
tache : B
jours_reduits : 2
surcout_total : 12

[Cas 2 — Gagner 3 jours au moindre cout]
surcout_total : 22
```

**Étapes de raisonnement & calculs vérifiés :**
1. Coûts marginaux d'accélération : B coûte 6 €/j, A coûte 10 €/j, D coûte 15 €/j.
2. La tâche la plus économique est B (6 €/j).
3. B peut être réduite de 2 jours (maximum autorisé).
4. Surcoût minimal = 2 jours x 6 €/jour = 12 € (bien plus avantageux que A à 10€ ou D à 15€).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `surcout_total : 12`
- `12`
- `12 €`
- `B: 2 jours (12 €)`
- `surcout : 12`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `20` : 20 € correspondrait à réduire A (10€) et une autre tâche, alors que B seule permet de gagner 2 jours pour seulement 12 €.
- `30` : 30 € correspondrait à accélérer la tâche D (15 x 2), qui est la plus chère !
- `16` : 16 € = 10 (A) + 6 (B), or il est moins cher de réduire B de 2 jours (2 x 6 = 12 €).
- `6` : 6 € ne permet de gagner qu'UN seul jour ; pour 2 jours le surcoût est 2 x 6 = 12 €.
- `2` : 2 est le nombre de jours gagnés, pas le surcoût financier.
