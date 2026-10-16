/**
 * Statistique descriptive B1 — 18 exercices de calcul statistique.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "st-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Effectif, minimum et maximum",
    "goal": "Lire une série et en extraire les trois premiers éléments de description : effectif et valeurs extrêmes.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs de la série (une par ligne, des entiers). Indiquez l’effectif total, la plus petite valeur et la plus grande, séparés par des espaces.</p>",
    "starter": "# Grille de calcul (st-c1-e1) — Effectif, minimum et maximum\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Série constante]\n# Données : 3\n# Données : 5\n# Données : 5\n# Données : 5\nA_COMPLETER\n\n[Cas 2 — Valeurs négatives]\n# Données : 6\n# Données : -4\n# Données : 0\n# Données : 7\n# Données : 7\n# Données : 3\n# Données : -1\nA_COMPLETER\n\n[Cas 3 — Valeur unique]\n# Données : 1\n# Données : 42\nA_COMPLETER\n",
    "hints": [
      "L’effectif total est le nombre de valeurs reçues : c’est n, mais tu peux aussi le compter avec len().",
      "Les valeurs extrêmes s’obtiennent avec min() et max() — la série n’a pas besoin d’être triée pour cela."
    ],
    "examples": [
      {
        "stdin": "5\n12\n8\n15\n8\n12",
        "expected": "5 8 15",
        "note": "Cinq valeurs, la plus petite est 8, la plus grande 15."
      }
    ],
    "tests": [
      {
        "label": "Série constante",
        "stdin": "cas:1",
        "expected": "3 5 5"
      },
      {
        "label": "Valeurs négatives",
        "stdin": "cas:2",
        "expected": "6 -4 7"
      },
      {
        "label": "Valeur unique",
        "stdin": "cas:3",
        "expected": "1 42 42"
      }
    ],
    "solution": "[Exemple]\n5 8 15\n\n[Cas 1 — Série constante]\n3 5 5\n\n[Cas 2 — Valeurs négatives]\n6 -4 7\n\n[Cas 3 — Valeur unique]\n1 42 42\n"
  },
  {
    "id": "st-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Série ordonnée",
    "goal": "Passer de la série brute à la série ordonnée, première étape de toute analyse.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez la <strong>série ordonnée</strong> par valeurs croissantes, sur une seule ligne, séparée par des espaces.</p>",
    "starter": "# Grille de calcul (st-c1-e2) — Série ordonnée\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Série déjà presque ordonnée]\n# Données : 4\n# Données : 5\n# Données : 4\n# Données : 3\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Valeurs négatives et positives]\n# Données : 3\n# Données : 100\n# Données : -100\n# Données : 0\nA_COMPLETER\n\n[Cas 3 — Répétitions]\n# Données : 5\n# Données : 2\n# Données : 2\n# Données : 2\n# Données : 1\n# Données : 1\nA_COMPLETER\n",
    "hints": [
      "Trier une liste en Python se fait en un appel : sorted(serie) renvoie une nouvelle liste ordonnée.",
      "Pour l’affichage, joins les valeurs converties en texte avec le séparateur \" \"."
    ],
    "examples": [
      {
        "stdin": "6\n9\n3\n7\n3\n11\n1",
        "expected": "1 3 3 7 9 11",
        "note": "Les valeurs sont remises dans l’ordre croissant."
      }
    ],
    "tests": [
      {
        "label": "Série déjà presque ordonnée",
        "stdin": "cas:1",
        "expected": "2 3 4 5"
      },
      {
        "label": "Valeurs négatives et positives",
        "stdin": "cas:2",
        "expected": "-100 0 100"
      },
      {
        "label": "Répétitions",
        "stdin": "cas:3",
        "expected": "1 1 2 2 2"
      }
    ],
    "solution": "[Exemple]\n1 3 3 7 9 11\n\n[Cas 1 — Série déjà presque ordonnée]\n2 3 4 5\n\n[Cas 2 — Valeurs négatives et positives]\n-100 0 100\n\n[Cas 3 — Répétitions]\n1 1 2 2 2\n"
  },
  {
    "id": "st-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Nombre de modalités",
    "goal": "Compter les valeurs distinctes d’une série : c’est le nombre de modalités du caractère.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez le nombre de <strong>modalités</strong>, c’est-à-dire de valeurs distinctes.</p>",
    "starter": "# Grille de calcul (st-c1-e3) — Nombre de modalités\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Série constante]\n# Données : 4\n# Données : 1\n# Données : 1\n# Données : 1\n# Données : 1\nA_COMPLETER\n\n[Cas 2 — Toutes distinctes]\n# Données : 5\n# Données : -1\n# Données : 0\n# Données : 1\n# Données : 2\n# Données : 3\nA_COMPLETER\n\n[Cas 3 — Modalités par paires]\n# Données : 6\n# Données : 7\n# Données : 7\n# Données : 8\n# Données : 8\n# Données : 9\n# Données : 9\nA_COMPLETER\n",
    "hints": [
      "Un ensemble (set) en Python ne garde qu’une seule copie de chaque valeur.",
      "La taille de cet ensemble est exactement le nombre de modalités."
    ],
    "examples": [
      {
        "stdin": "7\n3\n5\n5\n8\n3\n5\n9",
        "expected": "4",
        "note": "Valeurs distinctes : 3, 5, 8 et 9."
      }
    ],
    "tests": [
      {
        "label": "Série constante",
        "stdin": "cas:1",
        "expected": "1"
      },
      {
        "label": "Toutes distinctes",
        "stdin": "cas:2",
        "expected": "5"
      },
      {
        "label": "Modalités par paires",
        "stdin": "cas:3",
        "expected": "3"
      }
    ],
    "solution": "[Exemple]\n4\n\n[Cas 1 — Série constante]\n1\n\n[Cas 2 — Toutes distinctes]\n5\n\n[Cas 3 — Modalités par paires]\n3\n"
  },
  {
    "id": "st-c2-e1",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Tableau des effectifs",
    "goal": "Regrouper une série par modalité et compter les effectifs.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez le tableau des effectifs : une ligne par modalité, dans l’ordre croissant, au format <code>valeur effectif</code>.</p>",
    "starter": "# Grille de calcul (st-c2-e1) — Tableau des effectifs\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Petites valeurs]\n# Données : 5\n# Données : 1\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 3\nA_COMPLETER\n\n[Cas 2 — Série constante]\n# Données : 3\n# Données : 5\n# Données : 5\n# Données : 5\nA_COMPLETER\n\n[Cas 3 — Trois modalités]\n# Données : 6\n# Données : 10\n# Données : 20\n# Données : 10\n# Données : 30\n# Données : 20\n# Données : 10\nA_COMPLETER\n",
    "hints": [
      "Parcours les valeurs une seule fois en comptant dans un dictionnaire : c’est plus court que de compter chaque modalité séparément.",
      "Trie ensuite les couples (valeur, effectif) avant de les afficher."
    ],
    "examples": [
      {
        "stdin": "8\n8\n9\n12\n15\n15\n12\n12\n15",
        "expected": "8 1\n9 1\n12 3\n15 3",
        "note": "Deux fois 8 et 9, trois fois 12 et 15."
      }
    ],
    "tests": [
      {
        "label": "Petites valeurs",
        "stdin": "cas:1",
        "expected": "1 2\n2 1\n3 2"
      },
      {
        "label": "Série constante",
        "stdin": "cas:2",
        "expected": "5 3"
      },
      {
        "label": "Trois modalités",
        "stdin": "cas:3",
        "expected": "10 3\n20 2\n30 1"
      }
    ],
    "solution": "[Exemple]\n8 1\n9 1\n12 3\n15 3\n\n[Cas 1 — Petites valeurs]\n1 2\n2 1\n3 2\n\n[Cas 2 — Série constante]\n5 3\n\n[Cas 3 — Trois modalités]\n10 3\n20 2\n30 1\n"
  },
  {
    "id": "st-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Fréquences en pourcentage",
    "goal": "Convertir des effectifs en fréquences exprimées en pourcentage.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez, pour chaque modalité par ordre croissant, son pourcentage <code>100 × n<sub>i</sub> / N</code> arrondi à deux décimales, au format <code>valeur pourcentage</code>.</p>",
    "starter": "# Grille de calcul (st-c2-e2) — Fréquences en pourcentage\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq valeurs, deux modalités]\n# Données : 5\n# Données : 1\n# Données : 2\n# Données : 2\n# Données : 3\n# Données : 3\nA_COMPLETER\n\n[Cas 2 — Une seule modalité]\n# Données : 2\n# Données : 7\n# Données : 7\nA_COMPLETER\n\n[Cas 3 — Quatre modalités équilibrées]\n# Données : 8\n# Données : 1\n# Données : 1\n# Données : 2\n# Données : 2\n# Données : 3\n# Données : 3\n# Données : 4\n# Données : 4\nA_COMPLETER\n",
    "hints": [
      "Le pourcentage est le quotient effectif / effectif total, multiplié par 100.",
      "Pour formater deux décimales : f\"{valeur:.2f}\"."
    ],
    "examples": [
      {
        "stdin": "4\n1\n1\n1\n2",
        "expected": "1 75.00\n2 25.00",
        "note": "Trois valeurs sur quatre, puis une sur quatre."
      }
    ],
    "tests": [
      {
        "label": "Cinq valeurs, deux modalités",
        "stdin": "cas:1",
        "expected": "1 20.00\n2 40.00\n3 40.00"
      },
      {
        "label": "Une seule modalité",
        "stdin": "cas:2",
        "expected": "7 100.00"
      },
      {
        "label": "Quatre modalités équilibrées",
        "stdin": "cas:3",
        "expected": "1 25.00\n2 25.00\n3 25.00\n4 25.00"
      }
    ],
    "solution": "[Exemple]\n1 75.00\n2 25.00\n\n[Cas 1 — Cinq valeurs, deux modalités]\n1 20.00\n2 40.00\n3 40.00\n\n[Cas 2 — Une seule modalité]\n7 100.00\n\n[Cas 3 — Quatre modalités équilibrées]\n1 25.00\n2 25.00\n3 25.00\n4 25.00\n"
  },
  {
    "id": "st-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Effectifs cumulés croissants",
    "goal": "Calculer la colonne des ECC, qui répond aux questions « au plus ».",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez les <strong>effectifs cumulés croissants</strong> : une ligne par modalité dans l’ordre croissant, au format <code>valeur ECC</code>.</p>",
    "starter": "# Grille de calcul (st-c2-e3) — Effectifs cumulés croissants\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Série constante]\n# Données : 4\n# Données : 5\n# Données : 5\n# Données : 5\n# Données : 5\nA_COMPLETER\n\n[Cas 2 — Trois modalités mélangées]\n# Données : 5\n# Données : 3\n# Données : 1\n# Données : 2\n# Données : 1\n# Données : 3\nA_COMPLETER\n\n[Cas 3 — ECC de la dernière modalité égal à N]\n# Données : 7\n# Données : 4\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 2\n# Données : 3\n# Données : 4\nA_COMPLETER\n",
    "hints": [
      "Sur les modalités triées, l’ECC est la somme des effectifs de cette modalité et de toutes les précédentes.",
      "Tu peux cumuler au fur et à mesure dans une variable qui ne repart jamais de zéro."
    ],
    "examples": [
      {
        "stdin": "6\n2\n1\n2\n3\n1\n2",
        "expected": "1 2\n2 5\n3 6",
        "note": "Effectifs 2, 3, 1 → ECC 2, 5, 6."
      }
    ],
    "tests": [
      {
        "label": "Série constante",
        "stdin": "cas:1",
        "expected": "5 4"
      },
      {
        "label": "Trois modalités mélangées",
        "stdin": "cas:2",
        "expected": "1 2\n2 3\n3 5"
      },
      {
        "label": "ECC de la dernière modalité égal à N",
        "stdin": "cas:3",
        "expected": "1 1\n2 3\n3 4\n4 7"
      }
    ],
    "solution": "[Exemple]\n1 2\n2 5\n3 6\n\n[Cas 1 — Série constante]\n5 4\n\n[Cas 2 — Trois modalités mélangées]\n1 2\n2 3\n3 5\n\n[Cas 3 — ECC de la dernière modalité égal à N]\n1 1\n2 3\n3 4\n4 7\n"
  },
  {
    "id": "st-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Moyenne d’une série",
    "goal": "Calculer la moyenne arithmétique d’une série brute.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez la moyenne, arrondie à deux décimales.</p>",
    "starter": "# Grille de calcul (st-c3-e1) — Moyenne d’une série\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq valeurs consécutives]\n# Données : 5\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 5\nA_COMPLETER\n\n[Cas 2 — Série constante]\n# Données : 3\n# Données : 7\n# Données : 7\n# Données : 7\nA_COMPLETER\n\n[Cas 3 — Moyenne non entière]\n# Données : 4\n# Données : 10\n# Données : 11\n# Données : 12\n# Données : 13\nA_COMPLETER\n",
    "hints": [
      "La moyenne est la somme des valeurs divisée par leur nombre.",
      "Attention en Python 3 : la division / donne un flottant, ce qui est exactement ce qu’on veut ici."
    ],
    "examples": [
      {
        "stdin": "4\n12\n8\n15\n9",
        "expected": "11.00",
        "note": "(12 + 8 + 15 + 9)/4 = 44/4 = 11."
      }
    ],
    "tests": [
      {
        "label": "Cinq valeurs consécutives",
        "stdin": "cas:1",
        "expected": "3.00"
      },
      {
        "label": "Série constante",
        "stdin": "cas:2",
        "expected": "7.00"
      },
      {
        "label": "Moyenne non entière",
        "stdin": "cas:3",
        "expected": "11.50"
      }
    ],
    "solution": "[Exemple]\n11.00\n\n[Cas 1 — Cinq valeurs consécutives]\n3.00\n\n[Cas 2 — Série constante]\n7.00\n\n[Cas 3 — Moyenne non entière]\n11.50\n"
  },
  {
    "id": "st-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Moyenne pondérée",
    "goal": "Pondérer chaque modalité par son effectif, comme dans un tableau statistique.",
    "brief": "<p>Dans cette étude, on considère un entier <code>k</code>, puis <code>k</code> lignes de la forme <code>valeur effectif</code>. Affichez la moyenne pondérée, arrondie à deux décimales.</p>",
    "starter": "# Grille de calcul (st-c3-e2) — Moyenne pondérée\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux modalités]\n# Données : 2\n# Données : 10 1\n# Données : 20 3\nA_COMPLETER\n\n[Cas 2 — Effectifs unitaires]\n# Données : 4\n# Données : 0 1\n# Données : 1 1\n# Données : 2 1\n# Données : 3 1\nA_COMPLETER\n\n[Cas 3 — Poids croissants]\n# Données : 3\n# Données : 4 2\n# Données : 5 3\n# Données : 6 5\nA_COMPLETER\n",
    "hints": [
      "La moyenne pondérée est la somme des (valeur × effectif) divisée par la somme des effectifs.",
      "Les valeurs lues sont des chaînes : convertis-les avec int() ou float() avant de calculer."
    ],
    "examples": [
      {
        "stdin": "3\n1 2\n3 3\n5 5",
        "expected": "3.60",
        "note": "(1×2 + 3×3 + 5×5)/10 = 36/10 = 3,60."
      }
    ],
    "tests": [
      {
        "label": "Deux modalités",
        "stdin": "cas:1",
        "expected": "17.50"
      },
      {
        "label": "Effectifs unitaires",
        "stdin": "cas:2",
        "expected": "1.50"
      },
      {
        "label": "Poids croissants",
        "stdin": "cas:3",
        "expected": "5.30"
      }
    ],
    "solution": "[Exemple]\n3.60\n\n[Cas 1 — Deux modalités]\n17.50\n\n[Cas 2 — Effectifs unitaires]\n1.50\n\n[Cas 3 — Poids croissants]\n5.30\n"
  },
  {
    "id": "st-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Médiane",
    "goal": "Appliquer la convention de rang r = (n + 1)/2, avec interpolation si nécessaire.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez la <strong>médiane</strong>, arrondie à deux décimales, avec la convention du cours : le rang de la médiane est <code>(n + 1)/2</code> dans la série ordonnée, avec interpolation linéaire si ce rang n’est pas entier.</p>",
    "starter": "# Grille de calcul (st-c3-e3) — Médiane\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Nombre pair de valeurs]\n# Données : 4\n# Données : 10\n# Données : 2\n# Données : 8\n# Données : 4\nA_COMPLETER\n\n[Cas 2 — Rang non entier]\n# Données : 6\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 5\n# Données : 6\nA_COMPLETER\n\n[Cas 3 — Trois valeurs]\n# Données : 3\n# Données : 5\n# Données : 1\n# Données : 9\nA_COMPLETER\n",
    "hints": [
      "Commence par trier la série : sans cela, le rang n’a aucun sens.",
      "Si le rang r n’est pas entier, la valeur est x(bas) + (r − bas) × (x(bas+1) − x(bas)), où bas est la partie entière de r."
    ],
    "examples": [
      {
        "stdin": "7\n3\n1\n4\n2\n6\n5\n7",
        "expected": "4.00",
        "note": "Sept valeurs triées : le rang 4 donne 4."
      }
    ],
    "tests": [
      {
        "label": "Nombre pair de valeurs",
        "stdin": "cas:1",
        "expected": "6.00"
      },
      {
        "label": "Rang non entier",
        "stdin": "cas:2",
        "expected": "3.50"
      },
      {
        "label": "Trois valeurs",
        "stdin": "cas:3",
        "expected": "5.00"
      }
    ],
    "solution": "[Exemple]\n4.00\n\n[Cas 1 — Nombre pair de valeurs]\n6.00\n\n[Cas 2 — Rang non entier]\n3.50\n\n[Cas 3 — Trois valeurs]\n5.00\n"
  },
  {
    "id": "st-c4-e1",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Variance d’une série",
    "goal": "Calculer une variance de population, en divisant par N.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez la <strong>variance</strong> arrondie à deux décimales, avec une division par N (variance de population).</p>",
    "starter": "# Grille de calcul (st-c4-e1) — Variance d’une série\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre valeurs régulières]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\nA_COMPLETER\n\n[Cas 2 — Série constante]\n# Données : 2\n# Données : 5\n# Données : 5\nA_COMPLETER\n\n[Cas 3 — Cinq valeurs espacées]\n# Données : 5\n# Données : 10\n# Données : 12\n# Données : 14\n# Données : 16\n# Données : 18\nA_COMPLETER\n",
    "hints": [
      "La variance est la moyenne des carrés des écarts à la moyenne.",
      "Calcule d’abord la moyenne, puis la somme des (x − moyenne)², puis divise par N."
    ],
    "examples": [
      {
        "stdin": "3\n2\n4\n6",
        "expected": "2.67",
        "note": "Moyenne 4 ; écarts −2, 0, 2 ; moyenne des carrés 8/3 ≈ 2,67."
      }
    ],
    "tests": [
      {
        "label": "Quatre valeurs régulières",
        "stdin": "cas:1",
        "expected": "1.25"
      },
      {
        "label": "Série constante",
        "stdin": "cas:2",
        "expected": "0.00"
      },
      {
        "label": "Cinq valeurs espacées",
        "stdin": "cas:3",
        "expected": "8.00"
      }
    ],
    "solution": "[Exemple]\n2.67\n\n[Cas 1 — Quatre valeurs régulières]\n1.25\n\n[Cas 2 — Série constante]\n0.00\n\n[Cas 3 — Cinq valeurs espacées]\n8.00\n"
  },
  {
    "id": "st-c4-e2",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Écart-type et coefficient de variation",
    "goal": "Passer de la variance à l’écart-type, puis à un indicateur sans unité.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez l’<strong>écart-type</strong> arrondi à deux décimales, puis le <strong>coefficient de variation</strong> en pourcentage (deux décimales), chacun sur sa ligne. La variance se divise par N.</p>",
    "starter": "# Grille de calcul (st-c4-e2) — Écart-type et coefficient de variation\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre valeurs régulières]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\nA_COMPLETER\n\n[Cas 2 — Série constante]\n# Données : 2\n# Données : 5\n# Données : 5\nA_COMPLETER\n\n[Cas 3 — Série homogène]\n# Données : 5\n# Données : 10\n# Données : 12\n# Données : 14\n# Données : 16\n# Données : 18\nA_COMPLETER\n",
    "hints": [
      "L’écart-type est la racine carrée de la variance : pense à importer math.",
      "Le coefficient de variation vaut σ divisé par la moyenne, multiplié par 100 pour l’exprimer en pourcentage."
    ],
    "examples": [
      {
        "stdin": "3\n2\n4\n6",
        "expected": "1.63\n40.82",
        "note": "σ ≈ 1,633 et CV ≈ 40,82 %."
      }
    ],
    "tests": [
      {
        "label": "Quatre valeurs régulières",
        "stdin": "cas:1",
        "expected": "1.12\n44.72"
      },
      {
        "label": "Série constante",
        "stdin": "cas:2",
        "expected": "0.00\n0.00"
      },
      {
        "label": "Série homogène",
        "stdin": "cas:3",
        "expected": "2.83\n20.20"
      }
    ],
    "solution": "[Exemple]\n1.63\n40.82\n\n[Cas 1 — Quatre valeurs régulières]\n1.12\n44.72\n\n[Cas 2 — Série constante]\n0.00\n0.00\n\n[Cas 3 — Série homogène]\n2.83\n20.20\n"
  },
  {
    "id": "st-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Variance pondérée par la formule de König",
    "goal": "Calculer une variance à partir d’un tableau d’effectifs, en une seule passe.",
    "brief": "<p>Dans cette étude, on considère un entier <code>k</code>, puis <code>k</code> lignes de la forme <code>valeur effectif</code>. Affichez la <strong>variance</strong> arrondie à deux décimales, calculée par la formule de König : <code>V = Σ n<sub>i</sub>x<sub>i</sub>² / N − x̄²</code>.</p>",
    "starter": "# Grille de calcul (st-c4-e3) — Variance pondérée par la formule de König\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux modalités]\n# Données : 2\n# Données : 10 1\n# Données : 20 3\nA_COMPLETER\n\n[Cas 2 — Effectifs unitaires]\n# Données : 4\n# Données : 0 1\n# Données : 1 1\n# Données : 2 1\n# Données : 3 1\nA_COMPLETER\n\n[Cas 3 — Variance faible]\n# Données : 3\n# Données : 4 2\n# Données : 5 3\n# Données : 6 5\nA_COMPLETER\n",
    "hints": [
      "König demande deux quantités : la moyenne des carrés, et le carré de la moyenne.",
      "N est la somme des effectifs ; n’oublie pas de retrancher le carré de la moyenne à la fin."
    ],
    "examples": [
      {
        "stdin": "3\n1 2\n3 3\n5 5",
        "expected": "2.44",
        "note": "Moyenne 3,6 ; moyenne des carrés 15,4 ; 15,4 − 12,96 = 2,44."
      }
    ],
    "tests": [
      {
        "label": "Deux modalités",
        "stdin": "cas:1",
        "expected": "18.75"
      },
      {
        "label": "Effectifs unitaires",
        "stdin": "cas:2",
        "expected": "1.25"
      },
      {
        "label": "Variance faible",
        "stdin": "cas:3",
        "expected": "0.61"
      }
    ],
    "solution": "[Exemple]\n2.44\n\n[Cas 1 — Deux modalités]\n18.75\n\n[Cas 2 — Effectifs unitaires]\n1.25\n\n[Cas 3 — Variance faible]\n0.61\n"
  },
  {
    "id": "st-c5-e1",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Classes de même amplitude",
    "goal": "Découper un intervalle en classes égales pour construire un histogramme.",
    "brief": "<p>Dans cette étude, on considère une ligne <code>min max k</code> : les bornes de la série et le nombre de classes souhaité. Affichez les <code>k</code> classes de même amplitude, une par ligne, au format <code>borne_inférieure borne_supérieure</code> avec deux décimales.</p>",
    "starter": "# Grille de calcul (st-c5-e1) — Classes de même amplitude\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq classes sur [0 ; 10]]\n# Données : 0 10 5\nA_COMPLETER\n\n[Cas 2 — Quatre classes décimales]\n# Données : 0 1 4\nA_COMPLETER\n\n[Cas 3 — Deux classes]\n# Données : 10 20 2\nA_COMPLETER\n",
    "hints": [
      "L’amplitude de chaque classe est (max − min) / k.",
      "La classe numéro i (en partant de 0) va de min + i × amplitude à min + (i + 1) × amplitude."
    ],
    "examples": [
      {
        "stdin": "150 190 4",
        "expected": "150.00 160.00\n160.00 170.00\n170.00 180.00\n180.00 190.00",
        "note": "Amplitude 10 : quatre classes."
      }
    ],
    "tests": [
      {
        "label": "Cinq classes sur [0 ; 10]",
        "stdin": "cas:1",
        "expected": "0.00 2.00\n2.00 4.00\n4.00 6.00\n6.00 8.00\n8.00 10.00"
      },
      {
        "label": "Quatre classes décimales",
        "stdin": "cas:2",
        "expected": "0.00 0.25\n0.25 0.50\n0.50 0.75\n0.75 1.00"
      },
      {
        "label": "Deux classes",
        "stdin": "cas:3",
        "expected": "10.00 15.00\n15.00 20.00"
      }
    ],
    "solution": "[Exemple]\n150.00 160.00\n160.00 170.00\n170.00 180.00\n180.00 190.00\n\n[Cas 1 — Cinq classes sur [0 ; 10]]\n0.00 2.00\n2.00 4.00\n4.00 6.00\n6.00 8.00\n8.00 10.00\n\n[Cas 2 — Quatre classes décimales]\n0.00 0.25\n0.25 0.50\n0.50 0.75\n0.75 1.00\n\n[Cas 3 — Deux classes]\n10.00 15.00\n15.00 20.00\n"
  },
  {
    "id": "st-c5-e2",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Effectifs par classe",
    "goal": "Compter les valeurs de chaque classe d’un histogramme, avec la convention des bornes.",
    "brief": "<p>Dans cette étude, on considère une ligne <code>min max k</code>, puis un entier <code>n</code>, puis les <code>n</code> valeurs de la série (une par ligne). Toutes les valeurs sont dans l’intervalle <code>[min ; max]</code>. Affichez les <code>k</code> effectifs par classe, séparés par des espaces. La borne inférieure est incluse, la borne supérieure exclue.</p>",
    "starter": "# Grille de calcul (st-c5-e2) — Effectifs par classe\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre classes, une valeur chacune]\n# Données : 0 4 4\n# Données : 4\n# Données : 0\n# Données : 1\n# Données : 2\n# Données : 3\nA_COMPLETER\n\n[Cas 2 — Deux classes inégales]\n# Données : 0 10 2\n# Données : 6\n# Données : 0\n# Données : 4\n# Données : 5\n# Données : 9\n# Données : 2\n# Données : 3\nA_COMPLETER\n\n[Cas 3 — Classes de 5]\n# Données : 10 20 2\n# Données : 3\n# Données : 10\n# Données : 19\n# Données : 15\nA_COMPLETER\n",
    "hints": [
      "Pour chaque valeur, calcule l’indice de sa classe puis incrémente le compteur de cette classe.",
      "La convention « borne inférieure incluse, borne supérieure exclue » se traduit par min <= x < max — la dernière classe doit donc rattraper la borne maximale."
    ],
    "examples": [
      {
        "stdin": "150 190 4\n5\n152\n161\n171\n181\n175",
        "expected": "1 1 2 1",
        "note": "171 et 175 tombent dans [170 ; 180[."
      }
    ],
    "tests": [
      {
        "label": "Quatre classes, une valeur chacune",
        "stdin": "cas:1",
        "expected": "1 1 1 1"
      },
      {
        "label": "Deux classes inégales",
        "stdin": "cas:2",
        "expected": "4 2"
      },
      {
        "label": "Classes de 5",
        "stdin": "cas:3",
        "expected": "1 2"
      }
    ],
    "solution": "[Exemple]\n1 1 2 1\n\n[Cas 1 — Quatre classes, une valeur chacune]\n1 1 1 1\n\n[Cas 2 — Deux classes inégales]\n4 2\n\n[Cas 3 — Classes de 5]\n1 2\n"
  },
  {
    "id": "st-c5-e3",
    "chapter": 5,
    "level": "n4",
    "language": "analyse",
    "title": "Les cinq valeurs d’une boîte à moustaches",
    "goal": "Résumer une série par minimum, Q1, médiane, Q3 et maximum.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Indiquez les cinq valeurs de la boîte à moustaches — minimum, Q1, médiane, Q3, maximum — chacune arrondie à deux décimales et séparées par un espace. On utilise la convention de rang <code>r = (n + 1)·p</code> avec interpolation.</p>",
    "starter": "# Grille de calcul (st-c5-e3) — Les cinq valeurs d’une boîte à moustaches\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq valeurs consécutives]\n# Données : 5\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 5\nA_COMPLETER\n\n[Cas 2 — Quatre valeurs]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Série désordonnée]\n# Données : 6\n# Données : 5\n# Données : 3\n# Données : 8\n# Données : 1\n# Données : 9\n# Données : 2\nA_COMPLETER\n",
    "hints": [
      "Écris une seule fonction quantile(valeurs, p) et appelle-la trois fois : p = 0,25 ; 0,5 ; 0,75.",
      "Le minimum et le maximum sont la première et la dernière valeur de la série triée."
    ],
    "examples": [
      {
        "stdin": "10\n2\n4\n4\n5\n7\n8\n9\n11\n12\n15",
        "expected": "2.00 4.00 7.50 11.25 15.00",
        "note": "Médiane 7,5 ; Q1 = 4 ; Q3 = 11,25."
      }
    ],
    "tests": [
      {
        "label": "Cinq valeurs consécutives",
        "stdin": "cas:1",
        "expected": "1.00 1.50 3.00 4.50 5.00"
      },
      {
        "label": "Quatre valeurs",
        "stdin": "cas:2",
        "expected": "1.00 1.25 2.50 3.75 4.00"
      },
      {
        "label": "Série désordonnée",
        "stdin": "cas:3",
        "expected": "1.00 1.75 4.00 8.25 9.00"
      }
    ],
    "solution": "[Exemple]\n2.00 4.00 7.50 11.25 15.00\n\n[Cas 1 — Cinq valeurs consécutives]\n1.00 1.50 3.00 4.50 5.00\n\n[Cas 2 — Quatre valeurs]\n1.00 1.25 2.50 3.75 4.00\n\n[Cas 3 — Série désordonnée]\n1.00 1.75 4.00 8.25 9.00\n"
  },
  {
    "id": "st-c6-e1",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Covariance",
    "goal": "Mesurer si deux caractères varient dans le même sens.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs de <code>x</code> (une par ligne), puis les <code>n</code> valeurs de <code>y</code> (une par ligne). Affichez la <strong>covariance</strong> arrondie à quatre décimales.</p>",
    "starter": "# Grille de calcul (st-c6-e1) — Covariance\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Liaison positive]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 2\n# Données : 4\n# Données : 6\n# Données : 8\nA_COMPLETER\n\n[Cas 2 — Liaison négative]\n# Données : 3\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 6\n# Données : 4\n# Données : 2\nA_COMPLETER\n\n[Cas 3 — Deux points]\n# Données : 2\n# Données : 0\n# Données : 10\n# Données : 0\n# Données : 10\nA_COMPLETER\n",
    "hints": [
      "La formule rapide évite de calculer chaque écart : cov = (1/n) × Σ xᵢyᵢ − x̄·ȳ.",
      "Les deux moyennes se calculent avant la covariance ; n’oublie pas de les retrancher."
    ],
    "examples": [
      {
        "stdin": "3\n1\n2\n3\n2\n4\n6",
        "expected": "1.3333",
        "note": "Moyennes 2 et 4 ; Σxy/n = 9,3333 ; cov = 1,3333."
      }
    ],
    "tests": [
      {
        "label": "Liaison positive",
        "stdin": "cas:1",
        "expected": "2.5000"
      },
      {
        "label": "Liaison négative",
        "stdin": "cas:2",
        "expected": "-1.3333"
      },
      {
        "label": "Deux points",
        "stdin": "cas:3",
        "expected": "25.0000"
      }
    ],
    "solution": "[Exemple]\n1.3333\n\n[Cas 1 — Liaison positive]\n2.5000\n\n[Cas 2 — Liaison négative]\n-1.3333\n\n[Cas 3 — Deux points]\n25.0000\n"
  },
  {
    "id": "st-c6-e2",
    "chapter": 6,
    "level": "n4",
    "language": "analyse",
    "title": "Coefficient de corrélation",
    "goal": "Chiffrer une liaison linéaire par un nombre sans unité, borné par −1 et 1.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs de <code>x</code>, puis les <code>n</code> valeurs de <code>y</code>. Affichez le <strong>coefficient de corrélation linéaire</strong> <code>r = cov(x, y) / (σ<sub>x</sub> · σ<sub>y</sub>)</code> arrondi à quatre décimales. Les écarts-types sont de population (division par n).</p>",
    "starter": "# Grille de calcul (st-c6-e2) — Coefficient de corrélation\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Liaison forte non parfaite]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 2\n# Données : 4\n# Données : 5\n# Données : 8\nA_COMPLETER\n\n[Cas 2 — Liaison négative]\n# Données : 3\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 5\n# Données : 2\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Liaison moyenne]\n# Données : 4\n# Données : 0\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 3\n# Données : 1\n# Données : 0\n# Données : 2\nA_COMPLETER\n",
    "hints": [
      "Calcule la covariance, puis les deux écarts-types avec la même division par n.",
      "r est le quotient de la covariance par le produit des deux écarts-types."
    ],
    "examples": [
      {
        "stdin": "3\n1\n2\n3\n2\n4\n6",
        "expected": "1.0000",
        "note": "Points parfaitement alignés : r = 1."
      }
    ],
    "tests": [
      {
        "label": "Liaison forte non parfaite",
        "stdin": "cas:1",
        "expected": "0.9812"
      },
      {
        "label": "Liaison négative",
        "stdin": "cas:2",
        "expected": "-0.3273"
      },
      {
        "label": "Liaison moyenne",
        "stdin": "cas:3",
        "expected": "-0.4000"
      }
    ],
    "solution": "[Exemple]\n1.0000\n\n[Cas 1 — Liaison forte non parfaite]\n0.9812\n\n[Cas 2 — Liaison négative]\n-0.3273\n\n[Cas 3 — Liaison moyenne]\n-0.4000\n"
  },
  {
    "id": "st-c6-e3",
    "chapter": 6,
    "level": "n4",
    "language": "analyse",
    "title": "Droite des moindres carrés",
    "goal": "Ajuster y = a·x + b et contrôler que la droite passe par le point moyen.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs de <code>x</code>, puis les <code>n</code> valeurs de <code>y</code>. Affichez la pente <code>a</code> puis l’ordonnée à l’origine <code>b</code> de la droite des moindres carrés, chacune sur sa ligne avec quatre décimales. On a <code>a = cov(x, y)/V(x)</code> et <code>b = ȳ − a·x̄</code>, avec des variances de population.</p>",
    "starter": "# Grille de calcul (st-c6-e3) — Droite des moindres carrés\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Droite décalée]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 3\n# Données : 5\n# Données : 6\n# Données : 9\nA_COMPLETER\n\n[Cas 2 — Pente négative]\n# Données : 3\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 5\n# Données : 2\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Deux points]\n# Données : 2\n# Données : 0\n# Données : 10\n# Données : 0\n# Données : 10\nA_COMPLETER\n",
    "hints": [
      "Calcule d’abord la pente, avec la variance de x au dénominateur — jamais l’inverse.",
      "Contrôle final : a × x̄ + b doit redonner ȳ. Si ce n’est pas le cas, il y a une erreur de calcul."
    ],
    "examples": [
      {
        "stdin": "3\n1\n2\n3\n2\n4\n6",
        "expected": "2.0000\n0.0000",
        "note": "Points alignés sur y = 2x."
      }
    ],
    "tests": [
      {
        "label": "Droite décalée",
        "stdin": "cas:1",
        "expected": "1.9000\n1.0000"
      },
      {
        "label": "Pente négative",
        "stdin": "cas:2",
        "expected": "-0.5000\n4.6667"
      },
      {
        "label": "Deux points",
        "stdin": "cas:3",
        "expected": "1.0000\n0.0000"
      }
    ],
    "solution": "[Exemple]\n2.0000\n0.0000\n\n[Cas 1 — Droite décalée]\n1.9000\n1.0000\n\n[Cas 2 — Pente négative]\n-0.5000\n4.6667\n\n[Cas 3 — Deux points]\n1.0000\n0.0000\n"
  }
];
