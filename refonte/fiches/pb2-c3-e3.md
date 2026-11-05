# Fiche de Conception — pb2-c3-e3 : Formule de Bayes : dépistage médical et faux positifs

- **Identifiant** : `pb2-c3-e3`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 3
- **Source académique exacte** : `probabilites/exos/TD_2.pdf:1 (Exercice 3)`
- **Type d'exercice** : Inversion des probabilités conditionnelles par Bayes
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Étude classique d'épidémiologie : une maladie rare touche 1% de la population. Un test de dépistage a une sensibilité de 95% (détecte la maladie chez un malade) et une spécificité de 98% (test négatif chez un non-malade). Quelle est la probabilité d'être réellement malade si le test est positif ?

## 2. Énoncé Complet
Une maladie affecte 1% d'une population : P(M) = 0.01. Un test biologique présente une sensibilité P(T+|M) = 0.95 et une spécificité P(T-|nonM) = 0.98 (donc taux de faux positifs P(T+|nonM) = 0.02).
1. Calculez la probabilité totale d'un test positif P(T+).
2. Calculez la probabilité P(M|T+) qu'un individu soit réellement malade sachant que son test est positif.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
0.0293 ; 32.42%

[Cas 1 — P(M)=0.01, sens=0.95, spec=0.98]
p_positif : 0.0293
p_malade_sachant_positif : 0.3242

[Cas 2 — P(M)=0.05, sens=0.90, spec=0.95]
p_positif : 0.0925
p_malade_sachant_positif : 0.4865
```

**Étapes de raisonnement & calculs vérifiés :**
1. P(T+) = P(T+|M)P(M) + P(T+|nonM)P(nonM) = 0.95 x 0.01 + 0.02 x 0.99 = 0.0095 + 0.0198 = 0.0293.
2. Par la formule de Bayes : P(M|T+) = P(T+|M)P(M) / P(T+) = 0.0095 / 0.0293 ≈ 0.3242 (soit 32.42%).
3. Note : bien que le test soit fiable à 95%, un test positif ne correspond à une maladie que dans 32.4% des cas en raison de la rareté de la maladie.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `p_malade_sachant_positif : 0.3242`
- `0.3242`
- `32.42%`
- `0.324`
- `32.4%`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `0.95` : Piège classique : 0.95 est P(T+|M) (sensibilité). P(M|T+) est fortement abaissé par le grand nombre de faux positifs dans une population saine à 99%.
- `0.98` : 0.98 est la spécificité du test chez les personnes saines, pas la probabilité d'être malade après un test positif.
- `0.01` : 0.01 est la prévalence initiale dans la population générale, un test positif augmente cette probabilité de 1% à 32.4%.
- `0.50` : Calculez rigoureusement le rapport de Bayes : 0.0095 / (0.0095 + 0.0198) = 0.0095 / 0.0293 ≈ 0.324.
- `0.0293` : 0.0293 est la probabilité totale P(T+) d'avoir un test positif, il faut maintenant diviser 0.0095 par ce nombre.
