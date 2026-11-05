# Fiche de Conception — pb2-c4-e2 : Dépense client : loi discrète par paliers et espérance de recette

- **Identifiant** : `pb2-c4-e2`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 4
- **Source académique exacte** : `Recueil_Epreuves_2024_2025.pdf:1 (Examen Probabilités B2, Exercice 1)`
- **Type d'exercice** : Distribution discrète appliquée et prévision financière
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Modélisation du panier moyen d'achat dans un supermarché. La dépense X prend les valeurs {0, 10, 20, 50} euros avec probabilités respectives {0.1, 0.4, 0.3, 0.2}.

## 2. Énoncé Complet
Une étude statistique montre que la dépense X (en euros) d'un client suit la loi discrète suivante :
- P(X = 0 €) = 0.1
- P(X = 10 €) = 0.4
- P(X = 20 €) = 0.3
- P(X = 50 €) = 0.2
Calculez la dépense moyenne attendue par client (espérance mathématique E(X)).

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
20

[Cas 1 — Distribution 0, 10, 20, 50]
esperance : 20

[Cas 2 — Distribution 0, 15, 30, 60 avec 0.1, 0.3, 0.4, 0.2]
esperance : 28.5
```

**Étapes de raisonnement & calculs vérifiés :**
1. E(X) = sum(x_i · P(X = x_i)).
2. E(X) = 0·0.1 + 10·0.4 + 20·0.3 + 50·0.2 = 0 + 4 + 6 + 10 = 20 euros.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `esperance : 20`
- `20`
- `20 €`
- `20 euros`
- `E(X) = 20`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `20.0` : 20 est la valeur entière exacte attendue.
- `80` : 80 est la somme des montants sans tenir compte des probabilités ; pondérez chaque montant par sa probabilité.
- `26.67` : 26.67 est la moyenne arithmétique simple des montants (80/4) ; il faut utiliser les probabilités de la loi.
- `10` : 10 n'est que la contribution du palier à 50 € (50 x 0.2) ; ajoutez les contributions des autres paliers (4 + 6).
- `100` : Vérifiez vos calculs : 10*0.4 + 20*0.3 + 50*0.2 = 4 + 6 + 10 = 20.
