# Fiche de Conception — pb2-c3-e1 : Formule du crible de Poincaré et indépendance

- **Identifiant** : `pb2-c3-e1`
- **Matière** : Probabilités B2 (`probabilites`)
- **Chapitre** : 3
- **Source académique exacte** : `probabilites/exos/TD_2.pdf:1 (Exercice 1)`
- **Type d'exercice** : Calcul de probabilité et test d'indépendance
- **Composant d'interface** : Grille de calcul CodeLab

## 1. Contexte Métier & Académique
Contrôle qualité sur deux défauts de fabrication A et B sur des serveurs informatiques. Vérification de la compatibilité et de l'indépendance statistique des pannes.

## 2. Énoncé Complet
Soient deux événements A et B d'un univers tels que P(A) = 0.4, P(B) = 0.5 et P(A ∩ B) = 0.2.
1. Calculez la probabilité de la réunion P(A ∪ B).
2. Les événements A et B sont-ils indépendants ? Justifiez en comparant P(A ∩ B) et P(A) x P(B).

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
0.7 ; INDEPENDANTS

[Cas 1 — P(A)=0.4, P(B)=0.5, P(AnB)=0.2]
reunion : 0.7
independance : INDEPENDANTS

[Cas 2 — P(A)=0.3, P(B)=0.4, P(AnB)=0.1]
reunion : 0.6
independance : DEPENDANTS
```

**Étapes de raisonnement & calculs vérifiés :**
1. P(A U B) = P(A) + P(B) - P(A n B) = 0.4 + 0.5 - 0.2 = 0.7.
2. P(A) x P(B) = 0.4 x 0.5 = 0.20.
3. Comme P(A n B) = 0.2 = P(A) x P(B), les événements A et B sont strictement indépendants.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `reunion : 0.7`
- `0.7`
- `0.70`
- `P(AUB) = 0.7`
- `reunion: 0.7`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `0.9` : 0.9 = 0.4 + 0.5 oublie de soustraire l'intersection P(A n B) = 0.2 ; la formule est P(AUB) = P(A) + P(B) - P(AnB).
- `0.1` : 0.1 résulte d'une soustraction erronée : 0.4 + 0.5 - 0.2 = 0.7.
- `DEPENDANTS` : P(A) x P(B) = 0.4 x 0.5 = 0.20, ce qui est exactement égal à P(A n B) : ils sont donc indépendants !
- `INCOMPATIBLES` : P(A n B) = 0.2 ≠ 0, les événements peuvent donc se produire simultanément : ils ne sont pas incompatibles.
- `0.8` : Vérifiez l'addition : 0.9 - 0.2 = 0.7.
