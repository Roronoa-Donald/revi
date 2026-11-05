# Fiche de Conception — ro2-c6-e1 : Ordonnancement de projet et identification du chemin critique

- **Identifiant** : `ro2-c6-e1`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 6
- **Source académique exacte** : `RD-RO/ref/EXamen B2-IT.pdf:1 (Problème 9 tâches A à I)`
- **Type d'exercice** : Calcul de chemin critique et dates au plus tôt
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Planification d'un projet de migration informatique comportant 9 tâches interdépendantes. Calcul des dates au plus tôt (early start) et identification des tâches à marge totale nulle.

## 2. Énoncé Complet
Un projet informatique est composé de 4 tâches en séquence : A (durée 3j), B (durée 4j, précédée par A), C (durée 2j, précédée par A) et D (durée 5j, précédée par B et C).
1. Calculez la durée minimale de réalisation du projet (date de fin au plus tôt).
2. Donnez le chemin critique composé des tâches sans aucune marge.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
duree_minimale : 12j ; chemin_critique : A-B-D

[Cas 1 — Sequence A(3), B(4), C(2), D(5)]
duree : 12
chemin : A-B-D

[Cas 2 — Sequence A(2), B(3), C(5), D(4)]
duree : 11
chemin : A-C-D
```

**Étapes de raisonnement & calculs vérifiés :**
1. Date fin de A = 3j.
2. Date fin de B = 3 + 4 = 7j.
3. Date fin de C = 3 + 2 = 5j.
4. La tâche D attend la fin de B et C : date début = max(7, 5) = 7j. Date fin de D = 7 + 5 = 12j.
5. Tâches critiques à marge nulle : A -> B -> D (la tâche C a une marge libre de 2j).

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `duree : 12`
- `12`
- `12j`
- `chemin : A-B-D`
- `A-B-D`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `14` : 14j correspond à l'addition de toutes les durées (3+4+2+5) en ignorant que les tâches B et C s'exécutent en parallèle !
- `10` : 10j = 3 + 2 + 5 emprunte le chemin C (le plus court), or le projet ne peut se terminer avant que la tâche B la plus longue ne soit finie (12j).
- `A-C-D` : C a une durée de 2j < 4j de B, C possède une marge de 2 jours et n'est donc pas critique.
- `7` : 7j est la date de début de D, ajoutez la durée de D (5j) pour obtenir 12j.
- `5` : 5 est la durée de D seule.
