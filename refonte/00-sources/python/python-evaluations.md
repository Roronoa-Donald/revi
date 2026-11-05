# Fiche Source : Introduction à la Programmation Python B1

- **Fichiers sources** :
  - `cours B1 IT/PYTHON/DST_2024_2025_CdP_B1A_.pdf` (5 pages)
  - `cours B1 IT/PYTHON/EF_2024_2025_CdP_B1A_B_.pdf` (6 pages)
  - `cours B1 IT/PYTHON/EF_2024_2025_CdP_B1A_B_C_.pdf` (6 pages, session rattrapage)
  - `cours B1 IT/PYTHON/TP-PYTHON-B1 A IT-AGBENOWOSSI Kofi parfait/QUIZ-AGBENOWOSSI parfait.pdf` (1 page)
- **Établissement** : Collège de Paris Supérieur
- **Niveau / Classe** : Bachelor 1 (B1 IT A, B, C)
- **Année Académique** : 2024-2025
- **Chapitres couverts** : Fondamentaux, Types, Structures de contrôle, Fonctions, Listes, Dictionnaires, Gestion d'erreurs

## Liste des Exercices et Notions Testées avec Pages

### Devoir Surveillé sur Table (DST B1A) (`DST_2024_2025_CdP_B1A_.pdf`)
- **Exercice 1 : Questions théoriques (4 pts, p.1 & corrigé p.3)** :
  - Nature de Python : langage interprété de haut niveau avec typage dynamique.
  - Philosophie "batteries included" : bibliothèque standard complète intégrée.
- **Exercice 2 : Manipulation des variables et types (4 pts, p.1 & corrigé p.3-4)** :
  - Saisie utilisateur avec `input()` qui renvoie systématiquement une chaîne de caractères `str`.
  - Conversion explicite `int(input(...))` ou `float(input(...))` pour les calculs arithmétiques.
- **Exercice 3 : Débogage et correction de code (4 pts, p.2 & corrigé p.4)** :
  - Traque des erreurs d'indentation (`IndentationError`) et de deux-points manquants après `def`, `if`, `for`.
- **Exercice 4 : Structures conditionnelles et boucles (4 pts, p.2 & corrigé p.4)** :
  - Écriture d'une boucle `for` avec `range(1, 11)` et condition `if n % 2 == 0`.
- **Exercice 5 : Dictionnaires et filtres (4 pts, p.2 & corrigé p.5)** :
  - Parcours d'un dictionnaire avec `.items()` pour filtrer les paires dont la valeur est strictement supérieure à 10.

### Examen Final (Session Normale B1A & B) (`EF_2024_2025_CdP_B1A_B_.pdf`)
- **Exercice 1 : Structures de données avancées (6 pts, p.1-2 & corrigé p.4-5)** :
  - Compréhension de liste et d'ensemble : création de l'ensemble des entiers pairs de 1 à 20 : `{x for x in range(1, 21) if x % 2 == 0}` (p.5).
  - Différence immuabilité tuple `(1, 2)` vs liste modifiable `[1, 2]`.
- **Exercice 2 : Fonctions et modularité (6 pts, p.2 & corrigé p.5)** :
  - Fonction prenant une liste de nombres et retournant à la fois le minimum, le maximum et la moyenne sous forme de tuple.
- **Exercice 3 : Gestion robuste des exceptions (4 pts, p.3 & corrigé p.5)** :
  - Bloc `try ... except ZeroDivisionError:` et `except ValueError:` pour sécuriser les saisies de division.
- **Exercice 4 (Bonus) : Défi de débogage (2 pts, p.3 & corrigé p.6)** :
  - Correction d'un algorithme de recherche d'élément avec gestion des cas de bornes (liste vide).

### Examen de Rattrapage (`EF_2024_2025_CdP_B1A_B_C_.pdf`)
- **Exercice 1 (4 pts, p.1 & p.3)** : Correction de fonction calculant un prix TTC.
- **Exercice 2 (4 pts, p.2 & p.4)** : Fonction `moyenne_notes(liste_notes)` avec gestion de division par zéro.
- **Exercice 3 (4 pts, p.2 & p.4)** : Test de parité `pair_ou_impair(n)`.
- **Exercice 4 (4 pts, p.2 & p.5)** : Génération de mot de passe sécurisé aléatoire `mot_de_passe_secure(taille)` utilisant le module `random` et `string`.
- **Exercice 5 (4 pts, p.2 & p.5)** : Rédaction d'une docstring conforme à la PEP 257.
