# Fiche de Conception — ro2-c5-e3 : Interprétation économique des variables duales (prix d'ombre)

- **Identifiant** : `ro2-c5-e3`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 5
- **Source académique exacte** : `RD-RO/ref/DS-B2A-IT.pdf:1 & Algo simplexe.pdf:13`
- **Type d'exercice** : Interprétation de sensibilité économique
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Aide à la décision d'investissement : la variable duale y_i* représente le gain marginal sur la fonction objectif pour chaque unité additionnelle de la ressource i.

## 2. Énoncé Complet
À l'optimum d'un problème de production, la variable duale associée aux heures de la machine M1 vaut y1* = 25 €/heure.
1. Quel est le gain sur le profit si la capacité de M1 augmente de 4 heures ?
2. Quel montant maximal l'entreprise est-elle prête à payer pour acquérir une heure supplémentaire sur cette machine ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
gain : 100 € ; prix_max : 25 €

[Cas 1 — Gain pour +4 heures a y1=25]
gain : 100

[Cas 2 — Prix marginal maximum]
prix_max : 25
```

**Étapes de raisonnement & calculs vérifiés :**
1. Le prix d'ombre (shadow price) mesure la dérivée partielle dZ/db1 = y1* = 25 €/h.
2. Pour une augmentation de Δb1 = 4h, le gain de profit est 4 x 25 = 100 €.
3. L'entreprise est prête à payer au maximum 25 € pour une heure supplémentaire (au-delà, l'opération deviendrait déficitaire).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `gain : 100`
- `100`
- `100 €`
- `prix_max : 25`
- `25 €`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `25` : 25 est le gain pour UNE heure ; pour 4 heures supplémentaires, le gain est 4 x 25 = 100 €.
- `4` : 4 est le nombre d'heures ajoutées ; multipliez par la valeur unitaire marginale (25 €).
- `0` : La ressource étant saturée (y1* = 25 > 0), une heure de plus apporte un gain réel de 25 €.
- `50` : Le calcul est 4 * 25 = 100.
- `gain = 25` : Le gain total pour 4 heures est 4 x 25 = 100 €.
