# Fidélité aux Sources (Mission A) — `b1-python` (Python · B1)

- **Cours** : `b1-python` (Python) — Niveau **B1** (6 chapitres)
- **Documents sources rattachés (6 fichiers, 333 pages)** :
- `textes/B1/PYTHON/Fondamentaux_Python.txt` (224 pages, statut `ok`)
- `textes/B1/PYTHON/INITIATION-PYTHON.txt` (91 pages, statut `ok`)
- `textes/B1/PYTHON/DST_2024_2025_CdP_B1A_.txt` (5 pages, statut `ok`)
- `textes/B1/PYTHON/EF_2024_2025_CdP_B1A_B_.txt` (6 pages, statut `ok`)
- `textes/B1/PYTHON/EF_2024_2025_CdP_B1A_B_C_.txt` (6 pages, statut `ok`)
- `textes/B1/PYTHON/QUIZ-AGBENOWOSSI parfait.txt` (1 pages, statut `ok`)
- **Niveau de confiance** : **Élevé (2 manuels complets : Fondamentaux_Python.txt [224 p.] et INITIATION-PYTHON.txt [91 p.] + 3 sujets d'examen DST/EF, statut ok ; seul TP 1 partieA est une page blanche)**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Verdict sur l'ordre** : **Ordre des 6 chapitres strictement fidèle à la table des matières de Fondamentaux_Python.txt**
- **Ordre dans la source (`textes/B1/PYTHON/Fondamentaux_Python.txt#PAGE 2-4` et `INITIATION-PYTHON.txt#PAGE 2-3`)** : Chapitre 1 : Introduction, environnement, variables, types (`int, float, str, bool`), opérateurs, `input()`/`print()` (`Fondamentaux_Python.txt#PAGE 7-42`) → Chapitre 2 : Structures de contrôle (`if/elif/else`, `for`, `while`, `break/continue/pass`) (`#PAGE 43-82`) → Chapitre 3 : Fonctions (`def`, `return` vs `print`, paramètres, portée locale/globale, `lambda`, docstrings) (`#PAGE 83-112`) → Chapitre 4 : Structures de données (`list`, `dict`, `tuple`, `set`) (`#PAGE 113-154`) → Chapitre 5 : Manipulation des fichiers (`open`, `with`, modes `r/w/a`, CSV) (`#PAGE 155-184`) → Chapitre 6 : Débogage, exceptions (`try/except`) et bonnes pratiques PEP 8 (`#PAGE 185-215`).
- **Comparaison avec le site (`b1-python/chapitres/chapitre1..6.html`)** : L'ordre des 6 chapitres et de leurs sous-sections `<h2>` sur le site calque exactement les 6 chapitres de `Fondamentaux_Python.txt`.

## 2. Couverture (Lacunes & Ajouts)
- **Couverture** : Excellente couverture des 6 chapitres du manuel source `Fondamentaux_Python.txt`.
- **Lacunes / Ajouts (important pour l'aval)** : Le manuel source `Fondamentaux_Python.txt` s'arrête volontairement aux fichiers et à `try/except` (`#PAGE 185-215`) et **ne couvre ni la Programmation Orientée Objet (`class`, `self`, `__init__`) ni `tkinter`**, ce qui confirme que `b1-projet` (qui exige POO et Tkinter dès ses Ch. 1–3) réclame deux compétences absentes du cours source `b1-python`.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Langage interprété
- **Source PDF** : `textes/B1/PYTHON/Fondamentaux_Python.txt#PAGE 10` : « Python est un langage interprété : le code source est exécuté ligne par ligne par un interpréteur (via une compilation intermédiaire en bytecode), sans étape de compilation manuelle préalable en binaire machine. »
- **Site web** : `b1-python/chapitres/chapitre1.html:L64-L72` : « Python transforme ton fichier en bytecode (.pyc), exécuté par la machine virtuelle Python (PVM) ligne par ligne, sans étape de compilation manuelle. »
- **Diagnostic** : **Fidèle et rigoureuse**.

### Définition 2 — Portée locale vs globale
- **Source PDF** : `textes/B1/PYTHON/Fondamentaux_Python.txt#PAGE 94` : « Une variable créée à l'intérieur d'une fonction est locale : elle n'existe que pendant l'exécution de cette fonction et est invisible à l'extérieur. »
- **Site web** : `b1-python/chapitres/chapitre3.html:L98` : « Une variable définie dans une fonction est locale à cette fonction ; elle naît à l'appel et disparaît au return. »
- **Diagnostic** : **Fidèle et limpide**.

### Définition 3 — Context manager (`with open(...)`)
- **Source PDF** : `textes/B1/PYTHON/Fondamentaux_Python.txt#PAGE 162` : « Le bloc `with open(...) as f:` garantit la fermeture automatique du fichier à la sortie du bloc, même si une exception survient. »
- **Site web** : `b1-python/chapitres/chapitre5.html:L74` : « Le mot-clé `with` garantit que le fichier est fermé automatiquement dès qu'on sort du bloc, même en cas d'erreur. »
- **Diagnostic** : **Exactement alignée**.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Les exercices des Chapitres 1 à 4 et le simulateur d'examen (`b1-python/chapitres/simulateur-examen.html`) sont directement dérivés des travaux pratiques de `Fondamentaux_Python.txt` (`#PAGE 38, 76, 108, 148`) et des épreuves officielles `DST_2024_2025_CdP_B1A_.txt#PAGE 1-5` et `EF_2024_2025_CdP_B1A_B_.txt#PAGE 1-6`. La compétence exigée est toujours enseignée avant dans le chapitre.
