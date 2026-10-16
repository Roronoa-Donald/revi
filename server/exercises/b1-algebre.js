/**
 * Algèbre linéaire B1 — 18 exercices de calcul et raisonnement vectoriel/matriciel.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "al-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Somme de deux vecteurs",
    "goal": "Lire deux vecteurs de même taille et calculer leur somme composante par composante.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> composantes du vecteur <code>a</code> (une par ligne), puis les <code>n</code> composantes du vecteur <code>b</code> (une par ligne). Affichez la somme <code>a + b</code> sur une seule ligne, ses composantes séparées par un espace.</p>",
    "starter": "# Grille de calcul (al-c1-e1) — Somme de deux vecteurs\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Composantes négatives]\n# Données : 2\n# Données : 10\n# Données : -5\n# Données : 3\n# Données : 7\nA_COMPLETER\n\n[Cas 2 — Vecteur nul au second membre]\n# Données : 4\n# Données : 0\n# Données : 0\n# Données : 0\n# Données : 0\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Taille un]\n# Données : 1\n# Données : 7\n# Données : 8\nA_COMPLETER\n",
    "hints": [
      "L’addition de deux vecteurs se fait composante par composante : la i-ième composante du résultat vaut a[i] + b[i].",
      "range(n) te donne les indices de 0 à n − 1, exactement ceux des listes Python."
    ],
    "examples": [
      {
        "stdin": "3\n1\n2\n3\n4\n5\n6",
        "expected": "5 7 9",
        "note": "1 + 4 = 5, 2 + 5 = 7, 3 + 6 = 9."
      }
    ],
    "tests": [
      {
        "label": "Composantes négatives",
        "stdin": "cas:1",
        "expected": "13 2"
      },
      {
        "label": "Vecteur nul au second membre",
        "stdin": "cas:2",
        "expected": "1 2 3 4"
      },
      {
        "label": "Taille un",
        "stdin": "cas:3",
        "expected": "15"
      }
    ],
    "solution": "[Exemple]\n5 7 9\n\n[Cas 1 — Composantes négatives]\n13 2\n\n[Cas 2 — Vecteur nul au second membre]\n1 2 3 4\n\n[Cas 3 — Taille un]\n15\n"
  },
  {
    "id": "al-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Multiplication par un scalaire",
    "goal": "Multiplier un vecteur par un réel lu sur l’entrée standard.",
    "brief": "<p>Dans cette étude, on considère un entier <code>k</code> (le scalaire), puis un entier <code>n</code>, puis les <code>n</code> composantes d’un vecteur <code>v</code> (une par ligne). Affichez le vecteur <code>k · v</code> sur une seule ligne, composantes séparées par un espace.</p>",
    "starter": "# Grille de calcul (al-c1-e2) — Multiplication par un scalaire\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Scalaire avec composante négative]\n# Données : 2\n# Données : 2\n# Données : 5\n# Données : -4\nA_COMPLETER\n\n[Cas 2 — Scalaire négatif]\n# Données : -1\n# Données : 3\n# Données : 1\n# Données : 2\n# Données : 3\nA_COMPLETER\n\n[Cas 3 — Scalaire nul]\n# Données : 0\n# Données : 4\n# Données : 7\n# Données : 8\n# Données : 9\n# Données : 10\nA_COMPLETER\n",
    "hints": [
      "Multiplier un vecteur par un scalaire multiplie chacune de ses composantes par ce nombre.",
      "Aucune composante n’est oubliée : la boucle doit passer par tous les indices."
    ],
    "examples": [
      {
        "stdin": "3\n3\n1\n2\n3",
        "expected": "3 6 9",
        "note": "Chaque composante est multipliée par 3."
      }
    ],
    "tests": [
      {
        "label": "Scalaire avec composante négative",
        "stdin": "cas:1",
        "expected": "10 -8"
      },
      {
        "label": "Scalaire négatif",
        "stdin": "cas:2",
        "expected": "-1 -2 -3"
      },
      {
        "label": "Scalaire nul",
        "stdin": "cas:3",
        "expected": "0 0 0 0"
      }
    ],
    "solution": "[Exemple]\n3 6 9\n\n[Cas 1 — Scalaire avec composante négative]\n10 -8\n\n[Cas 2 — Scalaire négatif]\n-1 -2 -3\n\n[Cas 3 — Scalaire nul]\n0 0 0 0\n"
  },
  {
    "id": "al-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Trace d’une matrice carrée",
    "goal": "Lire une matrice carrée et calculer la somme de ses coefficients diagonaux.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis <code>n</code> lignes contenant chacune <code>n</code> entiers séparés par des espaces (la matrice). Affichez la <strong>trace</strong> de la matrice : <code>a₁₁ + a₂₂ + … + aₙₙ</code>.</p>",
    "starter": "# Grille de calcul (al-c1-e3) — Trace d’une matrice carrée\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice 2 × 2]\n# Données : 2\n# Données : 4 1\n# Données : 9 6\nA_COMPLETER\n\n[Cas 2 — Matrice 4 × 4 diagonale]\n# Données : 4\n# Données : 1 0 0 0\n# Données : 0 2 0 0\n# Données : 0 0 3 0\n# Données : 0 0 0 4\nA_COMPLETER\n\n[Cas 3 — Matrice 1 × 1]\n# Données : 1\n# Données : 42\nA_COMPLETER\n",
    "hints": [
      "Les coefficients diagonaux sont matrice[0][0], matrice[1][1], matrice[2][2], … : les deux indices sont égaux.",
      "En Python, les indices commencent à 0 : la diagonale, c’est matrice[i][i] pour i allant de 0 à n − 1."
    ],
    "examples": [
      {
        "stdin": "3\n1 2 3\n4 5 6\n7 8 9",
        "expected": "15",
        "note": "1 + 5 + 9 = 15."
      }
    ],
    "tests": [
      {
        "label": "Matrice 2 × 2",
        "stdin": "cas:1",
        "expected": "10"
      },
      {
        "label": "Matrice 4 × 4 diagonale",
        "stdin": "cas:2",
        "expected": "10"
      },
      {
        "label": "Matrice 1 × 1",
        "stdin": "cas:3",
        "expected": "42"
      }
    ],
    "solution": "[Exemple]\n15\n\n[Cas 1 — Matrice 2 × 2]\n10\n\n[Cas 2 — Matrice 4 × 4 diagonale]\n10\n\n[Cas 3 — Matrice 1 × 1]\n42\n"
  },
  {
    "id": "al-c2-e1",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Produit de deux matrices 2 × 2",
    "goal": "Calculer un produit matriciel et appliquer la formule (A·B)<sub>ij</sub> = Σ a<sub>ik</sub>·b<sub>kj</sub>.",
    "brief": "<p>Dans cette étude, on considère quatre lignes de deux entiers : les deux lignes de <code>A</code>, puis les deux lignes de <code>B</code>. Affichez le produit <code>A · B</code> : deux lignes de deux entiers séparés par un espace.</p>",
    "starter": "# Grille de calcul (al-c2-e1) — Produit de deux matrices 2 × 2\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice diagonale à gauche]\n# Données : 2 0\n# Données : 0 2\n# Données : 1 1\n# Données : 1 1\nA_COMPLETER\n\n[Cas 2 — Produit nul sans facteur nul]\n# Données : 1 1\n# Données : 1 1\n# Données : 1 -1\n# Données : -1 1\nA_COMPLETER\n\n[Cas 3 — Produit par la matrice identité]\n# Données : 3 1\n# Données : 2 4\n# Données : 1 0\n# Données : 0 1\nA_COMPLETER\n",
    "hints": [
      "Le coefficient ligne i, colonne j du produit est la somme des A[i][k] · B[k][j] pour k = 0 et k = 1.",
      "Pense à la taille : (2 × 2) · (2 × 2) = (2 × 2), le résultat a donc autant de lignes et de colonnes que les facteurs."
    ],
    "examples": [
      {
        "stdin": "1 2\n3 4\n5 6\n7 8",
        "expected": "19 22\n43 50",
        "note": "1·5 + 2·7 = 19, 1·6 + 2·8 = 22, etc."
      }
    ],
    "tests": [
      {
        "label": "Matrice diagonale à gauche",
        "stdin": "cas:1",
        "expected": "2 2\n2 2"
      },
      {
        "label": "Produit nul sans facteur nul",
        "stdin": "cas:2",
        "expected": "0 0\n0 0"
      },
      {
        "label": "Produit par la matrice identité",
        "stdin": "cas:3",
        "expected": "3 1\n2 4"
      }
    ],
    "solution": "[Exemple]\n19 22\n43 50\n\n[Cas 1 — Matrice diagonale à gauche]\n2 2\n2 2\n\n[Cas 2 — Produit nul sans facteur nul]\n0 0\n0 0\n\n[Cas 3 — Produit par la matrice identité]\n3 1\n2 4\n"
  },
  {
    "id": "al-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Transposée d’une matrice",
    "goal": "Échanger les lignes et les colonnes d’une matrice rectangulaire.",
    "brief": "<p>Dans cette étude, on considère une ligne <code>m n</code> (dimensions), puis <code>m</code> lignes de <code>n</code> entiers. Affichez la <strong>transposée</strong> : <code>n</code> lignes de <code>m</code> entiers séparés par un espace.</p>",
    "starter": "# Grille de calcul (al-c2-e2) — Transposée d’une matrice\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice 3 × 2 à coefficients 0 et 1]\n# Données : 3 2\n# Données : 1 0\n# Données : 0 1\n# Données : 1 1\nA_COMPLETER\n\n[Cas 2 — Matrice ligne]\n# Données : 1 4\n# Données : 7 8 9 10\nA_COMPLETER\n\n[Cas 3 — Matrice 2 × 2]\n# Données : 2 2\n# Données : 5 6\n# Données : 7 8\nA_COMPLETER\n",
    "hints": [
      "La transposée, c’est matrice[i][j] rangé à la place matrice[j][i] : les deux indices s’inversent.",
      "La boucle extérieure parcourt les colonnes (0 à n − 1), la boucle intérieure les lignes (0 à m − 1)."
    ],
    "examples": [
      {
        "stdin": "2 3\n1 2 3\n4 5 6",
        "expected": "1 4\n2 5\n3 6",
        "note": "La matrice 2 × 3 devient 3 × 2."
      }
    ],
    "tests": [
      {
        "label": "Matrice 3 × 2 à coefficients 0 et 1",
        "stdin": "cas:1",
        "expected": "1 0 1\n0 1 1"
      },
      {
        "label": "Matrice ligne",
        "stdin": "cas:2",
        "expected": "7\n8\n9\n10"
      },
      {
        "label": "Matrice 2 × 2",
        "stdin": "cas:3",
        "expected": "5 7\n6 8"
      }
    ],
    "solution": "[Exemple]\n1 4\n2 5\n3 6\n\n[Cas 1 — Matrice 3 × 2 à coefficients 0 et 1]\n1 0 1\n0 1 1\n\n[Cas 2 — Matrice ligne]\n7\n8\n9\n10\n\n[Cas 3 — Matrice 2 × 2]\n5 7\n6 8\n"
  },
  {
    "id": "al-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "La matrice est-elle symétrique ?",
    "goal": "Tester l’égalité <sup>t</sup>A = A, c’est-à-dire a<sub>ij</sub> = a<sub>ji</sub>.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis <code>n</code> lignes de <code>n</code> entiers. Indiquez <code>symetrique</code> si la matrice est égale à sa transposée, sinon <code>non symetrique</code>.</p>",
    "starter": "# Grille de calcul (al-c2-e3) — La matrice est-elle symétrique ?\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice triangulaire]\n# Données : 2\n# Données : 1 2\n# Données : 3 4\nA_COMPLETER\n\n[Cas 2 — Coefficients hors diagonale égaux]\n# Données : 2\n# Données : 0 7\n# Données : 7 0\nA_COMPLETER\n\n[Cas 3 — Symétrie brisée en bas à droite]\n# Données : 3\n# Données : 1 1 1\n# Données : 0 2 0\n# Données : 0 0 3\nA_COMPLETER\n",
    "hints": [
      "Symétrique signifie a[i][j] == a[j][i] pour tous les indices i et j.",
      "Dès qu’un couple (i, j) viole l’égalité, la réponse est « non symetrique » : inutile de continuer."
    ],
    "examples": [
      {
        "stdin": "3\n1 2 3\n2 5 6\n3 6 9",
        "expected": "symetrique",
        "note": "La partie au-dessus de la diagonale se retrouve dessous."
      }
    ],
    "tests": [
      {
        "label": "Matrice triangulaire",
        "stdin": "cas:1",
        "expected": "non symetrique"
      },
      {
        "label": "Coefficients hors diagonale égaux",
        "stdin": "cas:2",
        "expected": "symetrique"
      },
      {
        "label": "Symétrie brisée en bas à droite",
        "stdin": "cas:3",
        "expected": "non symetrique"
      }
    ],
    "solution": "[Exemple]\nsymetrique\n\n[Cas 1 — Matrice triangulaire]\nnon symetrique\n\n[Cas 2 — Coefficients hors diagonale égaux]\nsymetrique\n\n[Cas 3 — Symétrie brisée en bas à droite]\nnon symetrique\n"
  },
  {
    "id": "al-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Déterminant d’une matrice 2 × 2",
    "goal": "Appliquer la formule ad − bc et en déduire l’inversibilité.",
    "brief": "<p>Dans cette étude, on considère deux lignes de deux entiers (la matrice <code>[[a, b], [c, d]]</code>). Affichez son déterminant, c’est-à-dire <code>a·d − b·c</code>.</p>",
    "starter": "# Grille de calcul (al-c3-e1) — Déterminant d’une matrice 2 × 2\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice diagonale]\n# Données : 2 0\n# Données : 0 3\nA_COMPLETER\n\n[Cas 2 — Deux lignes égales]\n# Données : 1 1\n# Données : 1 1\nA_COMPLETER\n\n[Cas 3 — Coefficients positifs]\n# Données : 5 3\n# Données : 2 4\nA_COMPLETER\n",
    "hints": [
      "Le déterminant d’une matrice 2 × 2 est le produit de la diagonale moins le produit de l’autre diagonale.",
      "Attention à l’ordre : c’est bien a·d − b·c, et non b·c − a·d."
    ],
    "examples": [
      {
        "stdin": "1 2\n3 4",
        "expected": "-2",
        "note": "1·4 − 2·3 = 4 − 6 = −2."
      }
    ],
    "tests": [
      {
        "label": "Matrice diagonale",
        "stdin": "cas:1",
        "expected": "6"
      },
      {
        "label": "Deux lignes égales",
        "stdin": "cas:2",
        "expected": "0"
      },
      {
        "label": "Coefficients positifs",
        "stdin": "cas:3",
        "expected": "14"
      }
    ],
    "solution": "[Exemple]\n-2\n\n[Cas 1 — Matrice diagonale]\n6\n\n[Cas 2 — Deux lignes égales]\n0\n\n[Cas 3 — Coefficients positifs]\n14\n"
  },
  {
    "id": "al-c3-e2",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Inverse d’une matrice 2 × 2",
    "goal": "Diviser l’adjugate par le déterminant, en traitant le cas singulier.",
    "brief": "<p>Dans cette étude, on considère deux lignes de deux entiers. Affichez l’inverse de la matrice : deux lignes de deux coefficients entiers. Si le déterminant est nul, Indiquez <code>singuliere</code>. Les entrées sont choisies pour que l’inverse ait des coefficients entiers.</p>",
    "starter": "# Grille de calcul (al-c3-e2) — Inverse d’une matrice 2 × 2\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — det = 1, coefficients croissants]\n# Données : 1 2\n# Données : 1 3\nA_COMPLETER\n\n[Cas 2 — det = 1, coefficients inversés]\n# Données : 3 1\n# Données : 2 1\nA_COMPLETER\n\n[Cas 3 — det = −1]\n# Données : 0 1\n# Données : 1 0\nA_COMPLETER\n",
    "hints": [
      "L’inverse vaut 1/det · [[d, −b], [−c, a]] : on échange a et d, on change le signe de b et c, puis on divise.",
      "Avant tout calcul, teste le déterminant : s’il est nul, la matrice est singulière et n’a pas d’inverse."
    ],
    "examples": [
      {
        "stdin": "2 1\n1 1",
        "expected": "1 -1\n-1 2",
        "note": "det = 1 : l’inverse est directement l’adjugate."
      }
    ],
    "tests": [
      {
        "label": "det = 1, coefficients croissants",
        "stdin": "cas:1",
        "expected": "3 -2\n-1 1"
      },
      {
        "label": "det = 1, coefficients inversés",
        "stdin": "cas:2",
        "expected": "1 -1\n-2 3"
      },
      {
        "label": "det = −1",
        "stdin": "cas:3",
        "expected": "0 1\n1 0"
      }
    ],
    "solution": "[Exemple]\n1 -1\n-1 2\n\n[Cas 1 — det = 1, coefficients croissants]\n3 -2\n-1 1\n\n[Cas 2 — det = 1, coefficients inversés]\n1 -1\n-2 3\n\n[Cas 3 — det = −1]\n0 1\n1 0\n"
  },
  {
    "id": "al-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Résoudre un système 2 × 2",
    "goal": "Mettre en œuvre l’élimination de Gauss et la remontée sur un système carré.",
    "brief": "<p>Dans cette étude, on considère trois lignes : <code>a b e</code> pour l’équation <code>a·x + b·y = e</code>, puis <code>c d f</code> pour <code>c·x + d·y = f</code>. Le déterminant est non nul. Indiquez <code>x</code> puis <code>y</code>, chacun sur sa ligne, arrondis à deux décimales.</p>",
    "starter": "# Grille de calcul (al-c3-e3) — Résoudre un système 2 × 2\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Determinant négatif]\n# Données : 1 2 5\n# Données : 3 1 5\nA_COMPLETER\n\n[Cas 2 — Coefficients plus grands]\n# Données : 2 3 12\n# Données : 1 -1 1\nA_COMPLETER\n\n[Cas 3 — Second membre pair]\n# Données : 4 2 10\n# Données : 1 1 4\nA_COMPLETER\n",
    "hints": [
      "Élimine x dans la deuxième équation : multiplie la première par c et la seconde par a, puis soustrais.",
      "Tu peux aussi résoudre par les formules de Cramer : x = (e·d − b·f)/det et y = (a·f − e·c)/det."
    ],
    "examples": [
      {
        "stdin": "1 1 3\n1 -1 1",
        "expected": "2.00\n1.00",
        "note": "x = 2 et y = 1 : 2 + 1 = 3 et 2 − 1 = 1."
      }
    ],
    "tests": [
      {
        "label": "Determinant négatif",
        "stdin": "cas:1",
        "expected": "1.00\n2.00"
      },
      {
        "label": "Coefficients plus grands",
        "stdin": "cas:2",
        "expected": "3.00\n2.00"
      },
      {
        "label": "Second membre pair",
        "stdin": "cas:3",
        "expected": "1.00\n3.00"
      }
    ],
    "solution": "[Exemple]\n2.00\n1.00\n\n[Cas 1 — Determinant négatif]\n1.00\n2.00\n\n[Cas 2 — Coefficients plus grands]\n3.00\n2.00\n\n[Cas 3 — Second membre pair]\n1.00\n3.00\n"
  },
  {
    "id": "al-c4-e1",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Combinaison linéaire",
    "goal": "Calculer une combinaison linéaire α·u + β·v, l’opération de base d’un espace vectoriel.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis une ligne <code>alpha beta</code>, puis les <code>n</code> composantes de <code>u</code> (une par ligne), puis celles de <code>v</code>. Indiquez <code>alpha·u + beta·v</code> sur une ligne, composantes séparées par un espace.</p>",
    "starter": "# Grille de calcul (al-c4-e1) — Combinaison linéaire\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Opposé de u]\n# Données : 2\n# Données : 1 -1\n# Données : 5\n# Données : 7\n# Données : 5\n# Données : 7\nA_COMPLETER\n\n[Cas 2 — Alpha nul]\n# Données : 3\n# Données : 0 2\n# Données : 1\n# Données : 1\n# Données : 1\n# Données : 9\n# Données : 8\n# Données : 7\nA_COMPLETER\n\n[Cas 3 — Vecteurs de taille un]\n# Données : 1\n# Données : 4 4\n# Données : 1\n# Données : 1\nA_COMPLETER\n",
    "hints": [
      "Une combinaison linéaire combine deux opérations : multiplier chaque vecteur par son scalaire, puis additionner.",
      "Tu peux écrire les deux étapes séparément, ou les fusionner dans une seule boucle."
    ],
    "examples": [
      {
        "stdin": "3\n2 3\n1\n2\n3\n4\n5\n6",
        "expected": "14 19 24",
        "note": "2·1 + 3·4 = 14, 2·2 + 3·5 = 19, 2·3 + 3·6 = 24."
      }
    ],
    "tests": [
      {
        "label": "Opposé de u",
        "stdin": "cas:1",
        "expected": "0 0"
      },
      {
        "label": "Alpha nul",
        "stdin": "cas:2",
        "expected": "18 16 14"
      },
      {
        "label": "Vecteurs de taille un",
        "stdin": "cas:3",
        "expected": "8"
      }
    ],
    "solution": "[Exemple]\n14 19 24\n\n[Cas 1 — Opposé de u]\n0 0\n\n[Cas 2 — Alpha nul]\n18 16 14\n\n[Cas 3 — Vecteurs de taille un]\n8\n"
  },
  {
    "id": "al-c4-e2",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le vecteur appartient-il au plan engendré ?",
    "goal": "Décider l’appartenance à un sous-espace engendré par deux vecteurs indépendants.",
    "brief": "<p>Dans cette étude, on considère trois lignes de trois entiers : <code>u</code>, <code>v</code> et <code>w</code>. Les vecteurs <code>u</code> et <code>v</code> sont indépendants. Indiquez <code>oui</code> si <code>w</code> appartient au sous-espace engendré par <code>u</code> et <code>v</code>, sinon <code>non</code>.</p>",
    "starter": "# Grille de calcul (al-c4-e2) — Le vecteur appartient-il au plan engendré ?\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vecteur hors du plan]\n# Données : 1 0 0\n# Données : 0 1 0\n# Données : 1 1 1\nA_COMPLETER\n\n[Cas 2 — Vecteur somme des deux autres]\n# Données : 1 2 3\n# Données : 0 1 4\n# Données : 1 3 7\nA_COMPLETER\n\n[Cas 3 — Combinaison quelconque]\n# Données : 2 1 0\n# Données : 1 0 1\n# Données : 1 1 1\nA_COMPLETER\n",
    "hints": [
      "w appartient à Vect(u, v) exactement quand les trois vecteurs sont coplanaires.",
      "Trois vecteurs de ℝ³ sont coplanaires si et seulement si le déterminant de la matrice qu’ils forment est nul."
    ],
    "examples": [
      {
        "stdin": "1 0 0\n0 1 0\n1 1 0",
        "expected": "oui",
        "note": "w = u + v : il est bien dans le plan engendré."
      }
    ],
    "tests": [
      {
        "label": "Vecteur hors du plan",
        "stdin": "cas:1",
        "expected": "non"
      },
      {
        "label": "Vecteur somme des deux autres",
        "stdin": "cas:2",
        "expected": "oui"
      },
      {
        "label": "Combinaison quelconque",
        "stdin": "cas:3",
        "expected": "non"
      }
    ],
    "solution": "[Exemple]\noui\n\n[Cas 1 — Vecteur hors du plan]\nnon\n\n[Cas 2 — Vecteur somme des deux autres]\noui\n\n[Cas 3 — Combinaison quelconque]\nnon\n"
  },
  {
    "id": "al-c4-e3",
    "chapter": 4,
    "level": "n4",
    "language": "analyse",
    "title": "Coordonnées dans une famille",
    "goal": "Trouver les coefficients a et b tels que w = a·u + b·v.",
    "brief": "<p>Dans cette étude, on considère trois lignes de trois entiers : <code>w</code>, <code>u</code> et <code>v</code>. Les vecteurs <code>u</code> et <code>v</code> sont indépendants et <code>w</code> appartient à leur plan. Affichez les coordonnées <code>a b</code> de <code>w</code> dans la famille <code>(u, v)</code>, séparées par un espace.</p>",
    "starter": "# Grille de calcul (al-c4-e3) — Coordonnées dans une famille\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Somme des deux vecteurs]\n# Données : 1 1 0\n# Données : 1 0 0\n# Données : 0 1 0\nA_COMPLETER\n\n[Cas 2 — Coefficient entier en deuxième position]\n# Données : 5 4 0\n# Données : 1 1 0\n# Données : 2 1 0\nA_COMPLETER\n\n[Cas 3 — Famille en dimension trois]\n# Données : 2 0 2\n# Données : 1 0 0\n# Données : 0 0 1\nA_COMPLETER\n",
    "hints": [
      "w = a·u + b·v donne trois équations, dont deux suffisent puisque les vecteurs sont dans un plan.",
      "Choisis deux coordonnées dont le déterminant 2 × 2 est non nul, puis résous ce petit système."
    ],
    "examples": [
      {
        "stdin": "3 3 0\n1 0 0\n0 1 0",
        "expected": "3 3",
        "note": "w = 3·u + 3·v."
      }
    ],
    "tests": [
      {
        "label": "Somme des deux vecteurs",
        "stdin": "cas:1",
        "expected": "1 1"
      },
      {
        "label": "Coefficient entier en deuxième position",
        "stdin": "cas:2",
        "expected": "3 1"
      },
      {
        "label": "Famille en dimension trois",
        "stdin": "cas:3",
        "expected": "2 2"
      }
    ],
    "solution": "[Exemple]\n3 3\n\n[Cas 1 — Somme des deux vecteurs]\n1 1\n\n[Cas 2 — Coefficient entier en deuxième position]\n3 1\n\n[Cas 3 — Famille en dimension trois]\n2 2\n"
  },
  {
    "id": "al-c5-e1",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Rang d’une matrice",
    "goal": "Échelonner une matrice et compter ses pivots.",
    "brief": "<p>Dans cette étude, on considère une ligne <code>m n</code> (dimensions), puis <code>m</code> lignes de <code>n</code> entiers. Affichez le <strong>rang</strong> de la matrice.</p>",
    "starter": "# Grille de calcul (al-c5-e1) — Rang d’une matrice\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice inversible]\n# Données : 2 2\n# Données : 1 2\n# Données : 3 4\nA_COMPLETER\n\n[Cas 2 — Lignes identiques]\n# Données : 3 3\n# Données : 1 1 1\n# Données : 1 1 1\n# Données : 1 1 1\nA_COMPLETER\n\n[Cas 3 — Matrice nulle]\n# Données : 2 3\n# Données : 0 0 0\n# Données : 0 0 0\nA_COMPLETER\n",
    "hints": [
      "Le rang est le nombre de lignes non nulles une fois la matrice échelonnée par la méthode du pivot.",
      "À chaque colonne, cherche un coefficient non nul à partir de la ligne courante : c’est un pivot, et il en « consomme » une."
    ],
    "examples": [
      {
        "stdin": "3 3\n1 2 3\n2 4 6\n1 0 1",
        "expected": "2",
        "note": "La deuxième ligne est le double de la première : il reste 2 pivots."
      }
    ],
    "tests": [
      {
        "label": "Matrice inversible",
        "stdin": "cas:1",
        "expected": "2"
      },
      {
        "label": "Lignes identiques",
        "stdin": "cas:2",
        "expected": "1"
      },
      {
        "label": "Matrice nulle",
        "stdin": "cas:3",
        "expected": "0"
      }
    ],
    "solution": "[Exemple]\n2\n\n[Cas 1 — Matrice inversible]\n2\n\n[Cas 2 — Lignes identiques]\n1\n\n[Cas 3 — Matrice nulle]\n0\n"
  },
  {
    "id": "al-c5-e2",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Famille libre ou liée ?",
    "goal": "Comparer le rang d’une famille au nombre de ses vecteurs.",
    "brief": "<p>Dans cette étude, on considère deux entiers <code>d</code> (dimension) et <code>p</code> (nombre de vecteurs), puis <code>p</code> lignes de <code>d</code> entiers. Indiquez <code>libre</code> si la famille est linéairement indépendante, sinon <code>liee</code>.</p>",
    "starter": "# Grille de calcul (al-c5-e2) — Famille libre ou liée ?\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Troisième vecteur somme des deux premiers]\n# Données : 3 3\n# Données : 1 2 3\n# Données : 0 1 4\n# Données : 1 3 7\nA_COMPLETER\n\n[Cas 2 — Moins de vecteurs que la dimension]\n# Données : 3 2\n# Données : 1 0 0\n# Données : 0 1 0\nA_COMPLETER\n\n[Cas 3 — Vecteurs colinéaires]\n# Données : 2 3\n# Données : 1 2\n# Données : 2 4\n# Données : 3 6\nA_COMPLETER\n",
    "hints": [
      "Une famille de p vecteurs est libre quand le rang de la matrice qu’ils forment vaut exactement p.",
      "Si le rang est strictement inférieur à p, au moins un vecteur est combinaison des autres : la famille est liée."
    ],
    "examples": [
      {
        "stdin": "3 3\n1 0 0\n0 1 0\n0 0 1",
        "expected": "libre",
        "note": "Les trois vecteurs de la base canonique sont indépendants."
      }
    ],
    "tests": [
      {
        "label": "Troisième vecteur somme des deux premiers",
        "stdin": "cas:1",
        "expected": "liee"
      },
      {
        "label": "Moins de vecteurs que la dimension",
        "stdin": "cas:2",
        "expected": "libre"
      },
      {
        "label": "Vecteurs colinéaires",
        "stdin": "cas:3",
        "expected": "liee"
      }
    ],
    "solution": "[Exemple]\nlibre\n\n[Cas 1 — Troisième vecteur somme des deux premiers]\nliee\n\n[Cas 2 — Moins de vecteurs que la dimension]\nlibre\n\n[Cas 3 — Vecteurs colinéaires]\nliee\n"
  },
  {
    "id": "al-c5-e3",
    "chapter": 5,
    "level": "n4",
    "language": "analyse",
    "title": "Est-ce une base de ℝ³ ?",
    "goal": "Utiliser le déterminant pour décider si trois vecteurs forment une base.",
    "brief": "<p>Dans cette étude, on considère trois lignes de trois entiers : trois vecteurs de ℝ³. Indiquez <code>base</code> s’ils forment une base de ℝ³, sinon <code>pas une base</code>.</p>",
    "starter": "# Grille de calcul (al-c5-e3) — Est-ce une base de ℝ³ ?\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Déterminant égal à 1]\n# Données : 1 2 3\n# Données : 0 1 4\n# Données : 5 6 0\nA_COMPLETER\n\n[Cas 2 — Vecteurs coplanaires]\n# Données : 1 2 3\n# Données : 2 4 6\n# Données : 1 0 1\nA_COMPLETER\n\n[Cas 3 — Famille orthogonale]\n# Données : 2 0 0\n# Données : 0 3 0\n# Données : 0 0 5\nA_COMPLETER\n",
    "hints": [
      "Trois vecteurs de ℝ³ forment une base si et seulement s’ils sont libres.",
      "Avec trois vecteurs de ℝ³, liberté et déterminant non nul sont équivalents : c’est le calcul le plus rapide."
    ],
    "examples": [
      {
        "stdin": "1 0 0\n0 1 0\n0 0 1",
        "expected": "base",
        "note": "La base canonique de ℝ³."
      }
    ],
    "tests": [
      {
        "label": "Déterminant égal à 1",
        "stdin": "cas:1",
        "expected": "base"
      },
      {
        "label": "Vecteurs coplanaires",
        "stdin": "cas:2",
        "expected": "pas une base"
      },
      {
        "label": "Famille orthogonale",
        "stdin": "cas:3",
        "expected": "base"
      }
    ],
    "solution": "[Exemple]\nbase\n\n[Cas 1 — Déterminant égal à 1]\nbase\n\n[Cas 2 — Vecteurs coplanaires]\npas une base\n\n[Cas 3 — Famille orthogonale]\nbase\n"
  },
  {
    "id": "al-c6-e1",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Déterminant d’une matrice 3 × 3",
    "goal": "Développer un déterminant par rapport à la première ligne.",
    "brief": "<p>Dans cette étude, on considère trois lignes de trois entiers. Affichez le déterminant de la matrice.</p>",
    "starter": "# Grille de calcul (al-c6-e1) — Déterminant d’une matrice 3 × 3\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Déterminant égal à 1]\n# Données : 1 2 3\n# Données : 0 1 4\n# Données : 5 6 0\nA_COMPLETER\n\n[Cas 2 — Colonne de zéros partielle]\n# Données : 2 0 1\n# Données : 3 0 0\n# Données : 5 1 1\nA_COMPLETER\n\n[Cas 3 — Matrice diagonale]\n# Données : 1 0 0\n# Données : 0 2 0\n# Données : 0 0 3\nA_COMPLETER\n",
    "hints": [
      "Développe selon la première ligne en alternant les signes : a(ei − fh) − b(di − fg) + c(dh − eg).",
      "Alterner les signes revient à multiplier chaque terme par (−1) puissance la position : + − +."
    ],
    "examples": [
      {
        "stdin": "1 2 3\n4 5 6\n7 8 9",
        "expected": "0",
        "note": "La troisième ligne est la deuxième plus (1, 1, 1) doublé… le déterminant s’annule."
      }
    ],
    "tests": [
      {
        "label": "Déterminant égal à 1",
        "stdin": "cas:1",
        "expected": "1"
      },
      {
        "label": "Colonne de zéros partielle",
        "stdin": "cas:2",
        "expected": "3"
      },
      {
        "label": "Matrice diagonale",
        "stdin": "cas:3",
        "expected": "6"
      }
    ],
    "solution": "[Exemple]\n0\n\n[Cas 1 — Déterminant égal à 1]\n1\n\n[Cas 2 — Colonne de zéros partielle]\n3\n\n[Cas 3 — Matrice diagonale]\n6\n"
  },
  {
    "id": "al-c6-e2",
    "chapter": 6,
    "level": "n4",
    "language": "analyse",
    "title": "Valeurs propres d’une matrice 2 × 2",
    "goal": "Résoudre le polynôme caractéristique λ² − s·λ + p = 0.",
    "brief": "<p>Dans cette étude, on considère deux lignes de deux entiers (une matrice 2 × 2). Affichez ses valeurs propres réelles, la plus petite puis la plus grande, chacune arrondie à deux décimales. S’il n’y a pas de valeur propre réelle, Indiquez <code>pas de valeur propre reelle</code>.</p>",
    "starter": "# Grille de calcul (al-c6-e2) — Valeurs propres d’une matrice 2 × 2\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice symétrique]\n# Données : 2 1\n# Données : 1 2\nA_COMPLETER\n\n[Cas 2 — Matrice diagonale]\n# Données : 3 0\n# Données : 0 -1\nA_COMPLETER\n\n[Cas 3 — Rotation : discriminant négatif]\n# Données : 0 1\n# Données : -1 0\nA_COMPLETER\n",
    "hints": [
      "Le polynôme caractéristique s’écrit λ² − s·λ + p = 0, où s est la trace et p le déterminant.",
      "Le discriminant Δ = s² − 4p décide : négatif, pas de racine réelle ; sinon les racines sont (s ± √Δ)/2."
    ],
    "examples": [
      {
        "stdin": "4 1\n2 3",
        "expected": "2.00\n5.00",
        "note": "s = 7, p = 10 : λ² − 7λ + 10 = 0 donne 2 et 5."
      }
    ],
    "tests": [
      {
        "label": "Matrice symétrique",
        "stdin": "cas:1",
        "expected": "1.00\n3.00"
      },
      {
        "label": "Matrice diagonale",
        "stdin": "cas:2",
        "expected": "-1.00\n3.00"
      },
      {
        "label": "Rotation : discriminant négatif",
        "stdin": "cas:3",
        "expected": "pas de valeur propre reelle"
      }
    ],
    "solution": "[Exemple]\n2.00\n5.00\n\n[Cas 1 — Matrice symétrique]\n1.00\n3.00\n\n[Cas 2 — Matrice diagonale]\n-1.00\n3.00\n\n[Cas 3 — Rotation : discriminant négatif]\npas de valeur propre reelle\n"
  },
  {
    "id": "al-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Image d’un vecteur par une application linéaire",
    "goal": "Appliquer la matrice associée à une application linéaire de ℝ³ dans ℝ².",
    "brief": "<p>Dans cette étude, on considère deux lignes de trois entiers (la matrice de l’application <code>f</code>), puis trois lignes donnant les coordonnées d’un vecteur <code>v</code>. Indiquez <code>f(v)</code> : deux entiers séparés par un espace.</p>",
    "starter": "# Grille de calcul (al-c6-e3) — Image d’un vecteur par une application linéaire\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Coefficients négatifs]\n# Données : 2 0 1\n# Données : 0 1 -1\n# Données : 1\n# Données : 1\n# Données : 1\nA_COMPLETER\n\n[Cas 2 — Projection sur les deux premières coordonnées]\n# Données : 1 0 0\n# Données : 0 1 0\n# Données : 5\n# Données : 6\n# Données : 7\nA_COMPLETER\n\n[Cas 3 — Combinaison des trois colonnes]\n# Données : -1 2 0\n# Données : 0 0 3\n# Données : 2\n# Données : 3\n# Données : 4\nA_COMPLETER\n",
    "hints": [
      "Chaque coordonnée de f(v) est le produit scalaire d’une ligne de la matrice avec v.",
      "La matrice est 2 × 3 : la première ligne donne la première coordonnée, la seconde la deuxième."
    ],
    "examples": [
      {
        "stdin": "1 1 0\n0 1 1\n1\n2\n3",
        "expected": "3 5",
        "note": "1 + 2 = 3 et 2 + 3 = 5."
      }
    ],
    "tests": [
      {
        "label": "Coefficients négatifs",
        "stdin": "cas:1",
        "expected": "3 0"
      },
      {
        "label": "Projection sur les deux premières coordonnées",
        "stdin": "cas:2",
        "expected": "5 6"
      },
      {
        "label": "Combinaison des trois colonnes",
        "stdin": "cas:3",
        "expected": "4 12"
      }
    ],
    "solution": "[Exemple]\n3 5\n\n[Cas 1 — Coefficients négatifs]\n3 0\n\n[Cas 2 — Projection sur les deux premières coordonnées]\n5 6\n\n[Cas 3 — Combinaison des trois colonnes]\n4 12\n"
  }
];
