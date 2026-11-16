/**
 * Exercices mis à jour — remédiation pédagogique
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
      "L’addition de deux vecteurs s’effectue composante par composante : pour u = (u_1, ..., u_n) et v = (v_1, ..., v_n), la somme vaut (u_1+v_1, ..., u_n+v_n).",
      "Les deux vecteurs doivent impérativement appartenir au même espace vectoriel (même dimension n).",
      "Additionnez chaque composante au même indice séparément puis affichez les valeurs séparées par un espace sans parenthèses."
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
    "solution": "[Exemple]\n5 7 9\n\n[Cas 1 — Composantes négatives]\n13 2\n\n[Cas 2 — Vecteur nul au second membre]\n1 2 3 4\n\n[Cas 3 — Taille un]\n15\n",
    "takeaway": "À retenir : Lire deux vecteurs de même taille et calculer leur somme composante par composante.\nRepère : 1 + 4 = 5, 2 + 5 = 7, 3 + 6 = 9."
  },
  {
    "id": "al-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Les prévisions de la boulangerie",
    "exampleTitle": "Exemple résolu — la buvette du stade",
    "goal": "Multiplier un vecteur par un scalaire et combiner somme et produit scalaire dans une prévision.",
    "brief": "<p><strong>Énoncé.</strong> La boulangerie d'Amélie note ses ventes d'un samedi ordinaire :</p><p><code>v = (14, 6, 22)</code> — une composante par produit, dans cet ordre : 14 baguettes, 6 pains spéciaux, 22 viennoiseries.</p><p>Pour planifier ses fournées, elle prévoit ses ventes sous forme de vecteurs de ℝ³ : une multiplication par un scalaire quand l'affluence change globalement, une addition pour ajouter une commande fixe.</p><ol><li>Le samedi du marché, l'affluence triple : quelle est la prévision <code>3·v</code> ?</li><li>Le mardi creux, elle ne vend que la moitié d'un samedi : quelle est la prévision <code>0,5·v</code> ?</li><li>Le lundi de fermeture, tout est à zéro : que vaut <code>0·v</code> ?</li><li>Le samedi du marché, une entreprise commande en plus un plateau fixe <code>r = (2, 1, 3)</code> (2 baguettes, 1 pain spécial, 3 viennoiseries). Quelle est la prévision totale <code>3·v + r</code> ?</li><li>Amélie annonce à voix haute le samedi type « (22, 6, 14) ». Est-ce le vecteur <code>v</code> ?</li></ol><p>Format : chaque vecteur se donne par ses trois composantes séparées par des espaces, sans unité ; répondez à la question fermée par oui ou non.</p>",
    "starter": "# Exercice — Les prévisions de la boulangerie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Un vecteur de R3 s'écrit : trois composantes séparées par des espaces.\n\n[Question 1 — Prévision du samedi du marché]\nA_COMPLETER\n\n[Question 2 — Prévision du mardi creux]\nA_COMPLETER\n\n[Question 3 — Prévision du lundi de fermeture]\nA_COMPLETER\n\n[Question 4 — Prévision du samedi du marché avec plateau]\nA_COMPLETER\n\n[Question 5 — (22, 6, 14) est-il le vecteur v ?]\nA_COMPLETER\n",
    "hints": [
      "La multiplication par un scalaire k multiplie chaque composante : k·(a, b, c) = (ka, kb, kc), même si k est décimal ou nul.",
      "Pour 3·v + r, calculez d'abord 3·v, puis additionnez r composante par composante. La moitié de v s'obtient avec k = 0,5.",
      "Un vecteur de ℝ³ est une liste ordonnée : permuter deux composantes donne un autre vecteur. Contrôle : les composantes de la prévision du marché doivent chacune être le triple de celles de v."
    ],
    "examples": [
      {
        "stdin": "Une buvette note ses ventes d'un match ordinaire :\nw = (8, 5, 20) — sandwichs, boissons chaudes, boissons fraîches.\nLe jour d'un match de coupe, l'affluence double ; un jour sans match, elle est divisée par deux.\n\n1) Jour de coupe : 2·w = (16, 10, 40).\n2) Jour sans match : 0,5·w = (4, 2, 10).\n3) Jour de coupe avec commande fixe r = (1, 1, 2) : 2·w + r = (17, 11, 42).",
        "expected": "2w : 16 10 40 — 0,5w : 4 2 10 — 2w + r : 17 11 42",
        "note": "Le scalaire s'applique à toutes les composantes d'un coup : on ne choisit jamais une seule composante à multiplier."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Prévision du samedi du marché",
        "stdin": "q:1",
        "expected": "42 18 66"
      },
      {
        "label": "Question 2 — Prévision du mardi creux",
        "stdin": "q:2",
        "expected": "7 3 11"
      },
      {
        "label": "Question 3 — Prévision du lundi de fermeture",
        "stdin": "q:3",
        "expected": "0 0 0"
      },
      {
        "label": "Question 4 — Prévision du samedi du marché avec plateau",
        "stdin": "q:4",
        "expected": "44 19 69"
      },
      {
        "label": "Question 5 — (22, 6, 14) est-il le vecteur v ?",
        "stdin": "q:5",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Prévision du samedi du marché]\n42 18 66\n\n[Question 2 — Prévision du mardi creux]\n7 3 11\n\n[Question 3 — Prévision du lundi de fermeture]\n0 0 0\n\n[Question 4 — Prévision du samedi du marché avec plateau]\n44 19 69\n\n[Question 5 — (22, 6, 14) est-il le vecteur v ?]\nnon",
    "takeaway": "1) 3·v = (3 × 14, 3 × 6, 3 × 22) = (42, 18, 66).\n2) 0,5·v = (14/2, 6/2, 22/2) = (7, 3, 11).\n3) 0·v = (0, 0, 0) : le vecteur nul de ℝ³ — quel que soit v, multiplier par zéro donne le vecteur nul.\n4) 3·v + r = (42, 18, 66) + (2, 1, 3) = (44, 19, 69).\n5) Non : v = (14, 6, 22). Le vecteur (22, 6, 14) place la viennoiserie en tête et la baguette en dernier : c'est un autre vecteur de ℝ³, l'ordre des composantes est fixé par l'ordre des produits.\nContrôle : 44 = 42 + 2, 19 = 18 + 1, 69 = 66 + 3 — l'addition s'est bien faite composante par composante."
  },
  {
    "id": "al-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "La matrice de supervision du réseau local",
    "exampleTitle": "Exemple résolu — la matrice du proxy et du cache",
    "goal": "Lire une matrice carrée (dimensions, coefficients, somme d'une ligne) et calculer sa trace.",
    "brief": "<p><strong>Énoncé.</strong> Trois serveurs d'un réseau local se surveillent en s'envoyant des paquets de test. Le superviseur note la matrice <code>M</code> du réseau : à la ligne i et à la colonne j, le coefficient <code>m<sub>ij</sub></code> vaut 1 si le serveur i envoie ses paquets au serveur j, et 0 sinon.</p><table><tr><th></th><th>S1</th><th>S2</th><th>S3</th></tr><tr><th>S1</th><td>0</td><td>1</td><td>1</td></tr><tr><th>S2</th><td>1</td><td>0</td><td>0</td></tr><tr><th>S3</th><td>1</td><td>1</td><td>1</td></tr></table><p>Un coefficient diagonal non nul signifie qu'un serveur s'envoie des paquets à lui-même (une boucle locale).</p><ol><li>Quelles sont les dimensions de M ? Donnez deux nombres séparés par un espace : le nombre de lignes, puis le nombre de colonnes.</li><li>Que vaut le coefficient <code>m<sub>32</sub></code> (ligne 3, colonne 2) ?</li><li>Combien de serveurs le serveur S3 alimente-t-il en paquets, lui compris ? (additionnez la ligne 3)</li><li>Quelle est la trace de M ?</li><li>La matrice M est-elle symétrique ?</li></ol><p>Format : répondez par des nombres seuls, sans unité ; la question fermée se répond par oui ou non.</p>",
    "starter": "# Exercice — La matrice de supervision du réseau local\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 4 : nombres seuls. Question 5 : oui ou non.\n\n[Question 1 — Dimensions de M (lignes puis colonnes)]\nA_COMPLETER\n\n[Question 2 — Coefficient m32]\nA_COMPLETER\n\n[Question 3 — Serveurs alimentés par S3]\nA_COMPLETER\n\n[Question 4 — Trace de M]\nA_COMPLETER\n\n[Question 5 — M est-elle symétrique ?]\nA_COMPLETER\n",
    "hints": [
      "La taille d'une matrice s'écrit toujours lignes × colonnes, et le coefficient m_ij se lit à la ligne i, colonne j (« Ligne Avant Colonne »).",
      "La trace somme les coefficients diagonaux m_ii, où l'indice de ligne égale l'indice de colonne ; le nombre de serveurs alimentés par S3 est la somme de la ligne 3.",
      "Une matrice est symétrique si m_ij = m_ji pour tous i, j : comparez les coefficients de part et d'autre de la diagonale, en particulier ceux qui ne sont pas sur la diagonale."
    ],
    "examples": [
      {
        "stdin": "Deux serveurs d'un petit réseau : un proxy P et un cache Q.\nLa matrice N est :\nP vers P : 1 ; P vers Q : 1 ;\nQ vers P : 0 ; Q vers Q : 1.\n\n1) N est 2 × 2 (2 lignes, 2 colonnes).\n2) n21 (ligne 2, colonne 1) = 0 : Q n'envoie rien à P.\n3) P alimente 1 + 1 = 2 serveurs.\n4) tr(N) = 1 + 1 = 2 : deux boucles locales.\n5) n12 = 1 mais n21 = 0 : N n'est pas symétrique.",
        "expected": "dimensions : 2 2 — n21 : 0 — destinations de P : 2 — trace : 2 — symétrique : non",
        "note": "Carrée n'est pas symétrique : il faut encore vérifier m_ij = m_ji de part et d'autre de la diagonale."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Dimensions de M (lignes puis colonnes)",
        "stdin": "q:1",
        "expected": "3 3||3 × 3||3x3||3 x 3||3×3"
      },
      {
        "label": "Question 2 — Coefficient m32",
        "stdin": "q:2",
        "expected": "1"
      },
      {
        "label": "Question 3 — Serveurs alimentés par S3",
        "stdin": "q:3",
        "expected": "3"
      },
      {
        "label": "Question 4 — Trace de M",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — M est-elle symétrique ?",
        "stdin": "q:5",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Dimensions de M (lignes puis colonnes)]\n3 3\n\n[Question 2 — Coefficient m32]\n1\n\n[Question 3 — Serveurs alimentés par S3]\n3\n\n[Question 4 — Trace de M]\n1\n\n[Question 5 — M est-elle symétrique ?]\nnon",
    "takeaway": "1) M a 3 lignes et 3 colonnes : c'est une matrice carrée 3 × 3.\n2) m32 se lit ligne 3, colonne 2 : S3 envoie des paquets à S2, donc m32 = 1.\n3) La ligne 3 est (1, 1, 1) : S3 alimente S1, S2 et lui-même, soit 1 + 1 + 1 = 3 serveurs.\n4) tr(M) = m11 + m22 + m33 = 0 + 0 + 1 = 1. Seul S3 s'envoie des paquets à lui-même : la trace compte les boucles locales.\n5) Non : m23 = 0 (S2 n'envoie rien à S3) alors que m32 = 1 (S3 envoie à S2). Il suffit d'un seul couple (i, j) avec m_ij ≠ m_ji pour que la matrice ne soit pas symétrique — être carrée ne suffit pas.\nContrôle : la somme de la ligne 3 (3) et la trace (1) sont bien distinctes : l'une additionne toute une ligne, l'autre seulement la diagonale."
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
      "Pensez à la taille : (2 × 2) · (2 × 2) = (2 × 2), le résultat a donc autant de lignes et de colonnes que les facteurs.",
      "Pour la ligne 1 colonne 1, multipliez la ligne 1 de A par la colonne 1 de B ; vérifiez ensuite la matrice 2x2 obtenue ligne par ligne."
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
    "solution": "[Exemple]\n19 22\n43 50\n\n[Cas 1 — Matrice diagonale à gauche]\n2 2\n2 2\n\n[Cas 2 — Produit nul sans facteur nul]\n0 0\n0 0\n\n[Cas 3 — Produit par la matrice identité]\n3 1\n2 4\n",
    "takeaway": "À retenir : Calculer un produit matriciel et appliquer la formule (A·B)<sub>ij</sub> = Σ a<sub>ik</sub>·b<sub>kj</sub>.\nRepère : 1·5 + 2·7 = 19, 1·6 + 2·8 = 22, etc."
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
      "La transposée d’une matrice M de dimension m × n est la matrice M^T de dimension n × m obtenue en échangeant les lignes et les colonnes.",
      "Le coefficient situé à la ligne i et colonne j de M devient le coefficient ligne j et colonne i de M^T.",
      "Une matrice m x n devient n x m : la i-ème ligne de départ forme exactement la i-ème colonne du résultat."
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
    "solution": "[Exemple]\n1 4\n2 5\n3 6\n\n[Cas 1 — Matrice 3 × 2 à coefficients 0 et 1]\n1 0 1\n0 1 1\n\n[Cas 2 — Matrice ligne]\n7\n8\n9\n10\n\n[Cas 3 — Matrice 2 × 2]\n5 7\n6 8\n",
    "takeaway": "À retenir : Échanger les lignes et les colonnes d’une matrice rectangulaire.\nRepère : La matrice 2 × 3 devient 3 × 2."
  },
  {
    "id": "al-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Les deux filtres du logiciel de retouche",
    "exampleTitle": "Exemple résolu — deux transformations d'un plan de jeu",
    "goal": "Calculer deux produits de matrices 2 × 2, constater la non-commutativité et l'égalité des traces.",
    "brief": "<p><strong>Énoncé.</strong> Un logiciel de retouche applique des transformations aux coordonnées de chaque point d'une image. Deux filtres sont disponibles :</p><table><tr><th></th><th>colonne 1</th><th>colonne 2</th></tr><tr><th>H, ligne 1 (cisaillement horizontal)</th><td>1</td><td>1</td></tr><tr><th>H, ligne 2</th><td>0</td><td>1</td></tr><tr><th>V, ligne 1 (cisaillement vertical)</th><td>1</td><td>0</td></tr><tr><th>V, ligne 2</th><td>1</td><td>1</td></tr></table><p>Autrement dit <code>H = [[1, 1], [0, 1]]</code> et <code>V = [[1, 0], [1, 1]]</code> : H transforme (x, y) en (x + y, y) et V en (x, x + y).</p><p>Appliquer le filtre H à toute l'image revient à multiplier par H à gauche. Appliquer H <em>puis</em> V revient à multiplier par <code>V·H</code> : le dernier filtre appliqué s'écrit le plus à gauche. Pour comparer les deux ordres d'application, on calcule <code>H·V</code> et <code>V·H</code>.</p><ol><li>Calculez la matrice <code>H·V</code> (4 coefficients ligne par ligne, séparés par des espaces).</li><li>Calculez la matrice <code>V·H</code> (4 coefficients ligne par ligne).</li><li>A-t-on <code>H·V = V·H</code> ?</li><li>Que vaut la trace <code>tr(H·V)</code> ?</li><li>Que vaut la trace <code>tr(V·H)</code> ?</li></ol><p>Format : matrices en 4 coefficients ligne par ligne séparés par des espaces (exemple : 3 5 1 2) ; la question fermée se répond par oui ou non.</p>",
    "starter": "# Exercice — Les deux filtres du logiciel de retouche\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Matrices 2x2 : 4 coefficients ligne par ligne, séparés par des espaces.\n\n[Question 1 — Matrice H·V]\nA_COMPLETER\n\n[Question 2 — Matrice V·H]\nA_COMPLETER\n\n[Question 3 — H·V = V·H ?]\nA_COMPLETER\n\n[Question 4 — Trace de H·V]\nA_COMPLETER\n\n[Question 5 — Trace de V·H]\nA_COMPLETER\n",
    "hints": [
      "Le coefficient (i, j) d'un produit est le produit de la ligne i de la première matrice par la colonne j de la seconde, terme à terme, puis la somme.",
      "Calculez les deux produits séparément, case par case : chaque matrice est 2 × 2, quatre coefficients chacune. Écrivez les tailles : (2 × 2)·(2 × 2) = (2 × 2).",
      "La trace somme les coefficients diagonaux. Une fois les deux matrices calculées, comparez leurs coefficients un à un, puis leurs traces."
    ],
    "examples": [
      {
        "stdin": "Deux transformations d'un plan de jeu : A = [[1, 2], [0, 1]] et B = [[3, 0], [1, 2]].\n\n1) A·B = [[1×3+2×1, 1×0+2×2], [0×3+1×1, 0×0+1×2]] = [[5, 4], [1, 2]].\n2) B·A = [[3×1+0×0, 3×2+0×1], [1×1+2×0, 1×2+2×1]] = [[3, 6], [1, 4]].\n3) A·B ≠ B·A : les coefficients (1, 1) valent 5 et 3.\n4) tr(A·B) = 5 + 2 = 7.\n5) tr(B·A) = 3 + 4 = 7 : étonnamment égale.",
        "expected": "AB : 5 4 1 2 — BA : 3 6 1 4 — egaux : non — tr(AB) : 7 — tr(BA) : 7",
        "note": "Le produit n'est pas commutatif, mais la trace du produit, elle, est invariante par échange des facteurs."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Matrice H·V",
        "stdin": "q:1",
        "expected": "2 1 1 1"
      },
      {
        "label": "Question 2 — Matrice V·H",
        "stdin": "q:2",
        "expected": "1 1 1 2"
      },
      {
        "label": "Question 3 — H·V = V·H ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Trace de H·V",
        "stdin": "q:4",
        "expected": "3"
      },
      {
        "label": "Question 5 — Trace de V·H",
        "stdin": "q:5",
        "expected": "3"
      }
    ],
    "solution": "[Question 1 — Matrice H·V]\n2 1 1 1\n\n[Question 2 — Matrice V·H]\n1 1 1 2\n\n[Question 3 — H·V = V·H ?]\nnon\n\n[Question 4 — Trace de H·V]\n3\n\n[Question 5 — Trace de V·H]\n3",
    "takeaway": "1) H·V : coefficient (1, 1) = 1×1 + 1×1 = 2 ; (1, 2) = 1×0 + 1×1 = 1 ; (2, 1) = 0×1 + 1×1 = 1 ; (2, 2) = 0×0 + 1×1 = 1. Donc H·V = [[2, 1], [1, 1]].\n2) V·H : coefficient (1, 1) = 1×1 + 0×0 = 1 ; (1, 2) = 1×1 + 0×1 = 1 ; (2, 1) = 1×1 + 1×0 = 1 ; (2, 2) = 1×1 + 1×1 = 2. Donc V·H = [[1, 1], [1, 2]].\n3) Non : H·V = [[2, 1], [1, 1]] et V·H = [[1, 1], [1, 2]] diffèrent dès le coefficient (1, 1) (2 contre 1). Appliquer H puis V ne donne pas le même résultat que V puis H : le produit matriciel n'est pas commutatif.\n4) tr(H·V) = 2 + 1 = 3.\n5) tr(V·H) = 1 + 2 = 3.\nConclusion : bien que H·V ≠ V·H, les deux traces sont égales — c'est la propriété du cours : tr(A·B) = tr(B·A). L'ordre d'application change l'image, mais pas la trace de la matrice composée.\nContrôle : la trace de H vaut 2 et celle de V vaut 2 ; on vérifie aussi que les sommes des coefficients de H·V (5) et de V·H (5) coïncident."
  },
  {
    "id": "al-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "La clé de chiffrement du club de cryptographie",
    "exampleTitle": "Exemple résolu — la clé du mois précédent",
    "goal": "Calculer un déterminant 2 × 2, l'inverse d'une matrice et chiffrer-déchiffrer un couple de nombres.",
    "brief": "<p><strong>Énoncé.</strong> Le club de cryptographie du lycée utilise le chiffre de Hill : chaque message est un couple de nombres <code>(x, y)</code>, et la clé du mois est la matrice <code>K</code>. Chiffrer le message, c'est calculer <code>K·(x, y)</code> ; déchiffrer, c'est appliquer la matrice inverse <code>K<sup>-1</sup></code>. Ce mois-ci :</p><table><tr><th>K</th><th>col. 1</th><th>col. 2</th></tr><tr><th>ligne 1</th><td>3</td><td>1</td></tr><tr><th>ligne 2</th><td>2</td><td>1</td></tr></table><p>c'est-à-dire <code>K = [[3, 1], [2, 1]]</code>. Pour que le club puisse toujours déchiffrer, la clé doit être inversible.</p><ol><li>Calculez <code>det(K)</code>.</li><li>La matrice K est-elle inversible ?</li><li>Calculez <code>K<sup>-1</sup></code> (4 coefficients ligne par ligne, séparés par des espaces).</li><li>Chiffrez le message (5, 7) : quel couple obtient-on ?</li><li>Le club reçoit le couple chiffré (22, 17) : quel couple obtient-on en le déchiffrant ?</li></ol><p>Format : matrices en 4 coefficients ligne par ligne séparés par des espaces ; couples en deux nombres séparés par un espace ; la question fermée se répond par oui ou non.</p>",
    "starter": "# Exercice — La clé de chiffrement du club de cryptographie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Matrices 2x2 : 4 coefficients ligne par ligne. Couples : deux nombres séparés par un espace.\n\n[Question 1 — det(K)]\nA_COMPLETER\n\n[Question 2 — K est-elle inversible ?]\nA_COMPLETER\n\n[Question 3 — Matrice K^-1]\nA_COMPLETER\n\n[Question 4 — Chiffrement de (5, 7)]\nA_COMPLETER\n\n[Question 5 — Déchiffrement de (22, 17)]\nA_COMPLETER\n",
    "hints": [
      "det [[a, b], [c, d]] = ad - bc. L'inverse d'une matrice 2 × 2 s'obtient en échangeant les coefficients de la diagonale, en changeant le signe des deux autres, puis en divisant le tout par le déterminant.",
      "Chiffrer un couple, c'est multiplier la clé par le vecteur colonne ; déchiffrer, c'est multiplier par l'inverse, car K^-1·(K·message) = message.",
      "Contrôle final : la clé appliquée au couple déchiffré doit redonner le couple chiffré, et K·K^-1 doit valoir la matrice identité."
    ],
    "examples": [
      {
        "stdin": "La clé du mois précédent était C = [[2, 1], [3, 2]].\n\n1) det(C) = 2×2 - 1×3 = 1.\n2) det(C) ≠ 0 : C est inversible.\n3) C^-1 = 1/1 × [[2, -1], [-3, 2]] = [[2, -1], [-3, 2]].\n4) Chiffrement de (2, 1) : C·(2, 1) = (2×2+1×1, 3×2+2×1) = (5, 8).\n5) Déchiffrement de (5, 8) : C^-1·(5, 8) = (2×5-1×8, -3×5+2×8) = (2, 1).",
        "expected": "det : 1 — C^-1 : 2 -1 -3 2 — chiffre : 5 8 — dechiffre : 2 1",
        "note": "Sans la division par le déterminant, K^-1 est fausse : la matrice [[d, -b], [-c, a]] seule n'est pas l'inverse."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — det(K)",
        "stdin": "q:1",
        "expected": "1"
      },
      {
        "label": "Question 2 — K est-elle inversible ?",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — Matrice K^-1",
        "stdin": "q:3",
        "expected": "1 -1 -2 3"
      },
      {
        "label": "Question 4 — Chiffrement de (5, 7)",
        "stdin": "q:4",
        "expected": "22 17"
      },
      {
        "label": "Question 5 — Déchiffrement de (22, 17)",
        "stdin": "q:5",
        "expected": "5 7"
      }
    ],
    "solution": "[Question 1 — det(K)]\n1\n\n[Question 2 — K est-elle inversible ?]\noui\n\n[Question 3 — Matrice K^-1]\n1 -1 -2 3\n\n[Question 4 — Chiffrement de (5, 7)]\n22 17\n\n[Question 5 — Déchiffrement de (22, 17)]\n5 7",
    "takeaway": "1) det(K) = 3×1 - 1×2 = 3 - 2 = 1.\n2) Oui : det(K) = 1 ≠ 0, la clé est inversible — indispensable pour déchiffrer (« det zéro, zéro inverse »).\n3) Formule du cours : K^-1 = 1/det(K) × [[d, -b], [-c, a]] = 1/1 × [[1, -1], [-2, 3]] = [[1, -1], [-2, 3]].\n4) K·(5, 7) = (3×5 + 1×7, 2×5 + 1×7) = (15 + 7, 10 + 7) = (22, 17).\n5) K^-1·(22, 17) = (1×22 + (-1)×17, (-2)×22 + 3×17) = (22 - 17, -44 + 51) = (5, 7).\nContrôles : K·K^-1 = [[3×1+1×(-2), 3×(-1)+1×3], [2×1+1×(-2), 2×(-1)+1×3]] = [[1, 0], [0, 1]] = I2 ; et en rechiffrant (5, 7) on retrouve bien (22, 17)."
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
      "Avant tout calcul, teste le déterminant : s’il est nul, la matrice est singulière et n’a pas d’inverse.",
      "Calculez d abord det = a*d - b*c : s il vaut 0, indiquez une matrice singulière ; sinon divisez chaque coefficient de l adjugate par det."
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
    "solution": "[Exemple]\n1 -1\n-1 2\n\n[Cas 1 — det = 1, coefficients croissants]\n3 -2\n-1 1\n\n[Cas 2 — det = 1, coefficients inversés]\n1 -1\n-2 3\n\n[Cas 3 — det = −1]\n0 1\n1 0\n",
    "takeaway": "À retenir : Diviser l’adjugate par le déterminant, en traitant le cas singulier.\nRepère : det = 1 : l’inverse est directement l’adjugate."
  },
  {
    "id": "al-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Résoudre un système 2 × 2",
    "goal": "Mettre en œuvre l’élimination de Gauss et la remontée sur un système carré.",
    "brief": "<p>Dans cette étude, on considère deux lignes : <code>a b e</code> pour l’équation <code>a·x + b·y = e</code>, puis <code>c d f</code> pour <code>c·x + d·y = f</code>. Le déterminant est non nul. Indiquez <code>x</code> puis <code>y</code>, chacun sur sa ligne, arrondis à deux décimales.</p>",
    "starter": "# Grille de calcul (al-c3-e3) — Résoudre un système 2 × 2\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Determinant négatif]\n# Données : 1 2 5\n# Données : 3 1 5\nA_COMPLETER\n\n[Cas 2 — Coefficients plus grands]\n# Données : 2 3 12\n# Données : 1 -1 1\nA_COMPLETER\n\n[Cas 3 — Second membre pair]\n# Données : 4 2 10\n# Données : 1 1 4\nA_COMPLETER\n",
    "hints": [
      "Éliminez x dans la deuxième équation : multipliez la première par c et la seconde par a, puis soustrayez.",
      "Vous pouvez aussi résoudre par les formules de Cramer : x = (e·d − b·f)/det et y = (a·f − e·c)/det.",
      "Une fois y isolé par combinaison des deux lignes, remplacez-le dans la première équation pour retrouver x et vérifiez les deux égalités à deux décimales."
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
    "solution": "[Exemple]\n2.00\n1.00\n\n[Cas 1 — Determinant négatif]\n1.00\n2.00\n\n[Cas 2 — Coefficients plus grands]\n3.00\n2.00\n\n[Cas 3 — Second membre pair]\n1.00\n3.00\n",
    "takeaway": "À retenir : Mettre en œuvre l’élimination de Gauss et la remontée sur un système carré.\nRepère : x = 2 et y = 1 : 2 + 1 = 3 et 2 − 1 = 1."
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
      "Vous pouvez écrire les deux étapes séparément, ou les fusionner dans une seule boucle.",
      "Multipliez d abord toutes les composantes de u par alpha et celles de v par beta, puis additionnez indice par indice."
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
    "solution": "[Exemple]\n14 19 24\n\n[Cas 1 — Opposé de u]\n0 0\n\n[Cas 2 — Alpha nul]\n18 16 14\n\n[Cas 3 — Vecteurs de taille un]\n8\n",
    "takeaway": "À retenir : Calculer une combinaison linéaire α·u + β·v, l’opération de base d’un espace vectoriel.\nRepère : 2·1 + 3·4 = 14, 2·2 + 3·5 = 19, 2·3 + 3·6 = 24."
  },
  {
    "id": "al-c4-e2",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan de vol du drone de livraison",
    "exampleTitle": "Exemple résolu — le plan de vol du secours en montagne",
    "goal": "Décider si un vecteur appartient à un sous-espace engendré et donner ses coordonnées dans la famille.",
    "brief": "<p><strong>Énoncé.</strong> Un centre de livraison programme un drone avec deux routes types au départ de la base (coordonnées en km : est, nord, altitude) :</p><p><code>r<sub>1</sub> = (1, 1, 0)</code> — cap nord-est à altitude constante ;</p><p><code>r<sub>2</sub> = (0, 1, 2)</code> — cap plein nord en prenant de l'altitude.</p><p>Le drone combine les routes : toute position atteignable est une combinaison <code>a·r<sub>1</sub> + b·r<sub>2</sub></code>. L'ensemble des positions atteignables est le plan engendré <code>Vect(r<sub>1</sub>, r<sub>2</sub>)</code>.</p><ol><li>La livraison A = (3, 5, 4) est-elle une position atteignable ?</li><li>Quelles sont les coordonnées (a, b) de A dans la famille (r<sub>1</sub>, r<sub>2</sub>) ? (deux nombres séparés par un espace)</li><li>La livraison B = (3, 4, 6) est-elle une position atteignable ?</li><li>Pour B, la composante 1 impose a = 3 et la composante 3 impose b = 3. Que vaut alors la composante 2 du vecteur a·r<sub>1</sub> + b·r<sub>2</sub> ?</li><li>La base elle-même, position (0, 0, 0), est-elle une position atteignable ?</li><li>On ajoute au plan de vol la route r<sub>3</sub> = r<sub>1</sub> + r<sub>2</sub>. Le plan engendré Vect(r<sub>1</sub>, r<sub>2</sub>, r<sub>3</sub>) est-il strictement plus grand que Vect(r<sub>1</sub>, r<sub>2</sub>) ?</li></ol><p>Format : coordonnées et composantes en nombres séparés par des espaces ; les questions fermées se répondent par oui ou non.</p>",
    "starter": "# Exercice — Le plan de vol du drone de livraison\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Coordonnées : deux nombres séparés par un espace. Questions fermées : oui ou non.\n\n[Question 1 — A = (3, 5, 4) est-elle atteignable ?]\nA_COMPLETER\n\n[Question 2 — Coordonnées de A dans (r1, r2)]\nA_COMPLETER\n\n[Question 3 — B = (3, 4, 6) est-elle atteignable ?]\nA_COMPLETER\n\n[Question 4 — Composante 2 du candidat pour B]\nA_COMPLETER\n\n[Question 5 — La base (0, 0, 0) est-elle atteignable ?]\nA_COMPLETER\n\n[Question 6 — Vect(r1, r2, r3) est-il strictement plus grand ?]\nA_COMPLETER\n",
    "hints": [
      "Traduisez l'appartenance en équations : a·r1 + b·r2 = (a, a + b, 2b). Chaque composante de la cible donne une équation en a et b.",
      "Les composantes 1 et 3 fixent a et b ; vérifiez ensuite la composante 2. Si les trois équations sont compatibles, le point est atteignable et (a, b) en sont les coordonnées.",
      "Le vecteur nul s'obtient avec tous les coefficients nuls ; un vecteur qui est déjà combinaison des autres n'agrandit pas le sous-espace engendré."
    ],
    "examples": [
      {
        "stdin": "Un secours en montagne programme un drone avec deux routes :\ns1 = (2, 0, 1) et s2 = (0, 2, 1).\nPosition atteignable : a·s1 + b·s2 = (2a, 2b, a + b).\n\n1) P = (2, 2, 2) : la composante 1 donne a = 1, la composante 2 donne b = 1 ; on vérifie a + b = 2 : oui, P est atteignable, de coordonnées (1, 1).\n2) Q = (4, 4, 6) : composante 1 : a = 2 ; composante 2 : b = 2 ; mais a + b = 4 alors que Q exige 6 : non, Q n'est pas atteignable.\n3) La base (0, 0, 0) est atteignable avec a = b = 0.",
        "expected": "P : oui, coordonnees (1, 1) — Q : non, le candidat vaut (4, 4, 4) — base : oui",
        "note": "Appartient ou n'appartient pas : il suffit d'une composante qui contredit les autres pour exclure le point du plan engendré."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — A = (3, 5, 4) est-elle atteignable ?",
        "stdin": "q:1",
        "expected": "oui"
      },
      {
        "label": "Question 2 — Coordonnées de A dans (r1, r2)",
        "stdin": "q:2",
        "expected": "3 2"
      },
      {
        "label": "Question 3 — B = (3, 4, 6) est-elle atteignable ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Composante 2 du candidat pour B",
        "stdin": "q:4",
        "expected": "6"
      },
      {
        "label": "Question 5 — La base (0, 0, 0) est-elle atteignable ?",
        "stdin": "q:5",
        "expected": "oui"
      },
      {
        "label": "Question 6 — Vect(r1, r2, r3) est-il strictement plus grand ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — A = (3, 5, 4) est-elle atteignable ?]\noui\n\n[Question 2 — Coordonnées de A dans (r1, r2)]\n3 2\n\n[Question 3 — B = (3, 4, 6) est-elle atteignable ?]\nnon\n\n[Question 4 — Composante 2 du candidat pour B]\n6\n\n[Question 5 — La base (0, 0, 0) est-elle atteignable ?]\noui\n\n[Question 6 — Vect(r1, r2, r3) est-il strictement plus grand ?]\nnon",
    "takeaway": "1) Oui. On cherche a, b avec a·r1 + b·r2 = (a, a + b, 2b) = (3, 5, 4).\n2) Composante 1 : a = 3 ; composante 3 : 2b = 4 donc b = 2 ; composante 2 : a + b = 3 + 2 = 5, qui est exactement la composante 2 de A. Les trois équations sont compatibles : A est atteignable, de coordonnées (3, 2).\n3) Non. Pour B = (3, 4, 6) : composante 1 : a = 3 ; composante 3 : 2b = 6 donc b = 3.\n4) Avec a = 3 et b = 3, la composante 2 du candidat vaut a + b = 6. Or la composante 2 de B est 4 : la contradiction 6 ≠ 4 exclut B du plan. Le candidat a·r1 + b·r2 vaut (3, 6, 6), différent de B.\n5) Oui : avec a = 0 et b = 0, on obtient le vecteur nul. Le vecteur nul appartient à tout sous-espace engendré — tout comme l'éclairement nul de la question précédente.\n6) Non : r3 = r1 + r2 = (1, 2, 2) est déjà combinaison linéaire de r1 et r2. Chaque combinaison de (r1, r2, r3) se réécrit comme combinaison de (r1, r2) seule : ajouter un vecteur du plan n'agrandit pas le sous-espace engendré.\nContrôle : pour A, on vérifie 3·r1 + 2·r2 = (3, 3, 0) + (0, 2, 4) = (3, 5, 4) — c'est exactement A."
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
      "Choisissez deux coordonnées dont le déterminant 2 × 2 est non nul, puis résous ce petit système.",
      "Résolvez le système 2x2 issu des deux premières coordonnées pour trouver a et b, puis contrôlez impérativement la troisième coordonnée."
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
    "solution": "[Exemple]\n3 3\n\n[Cas 1 — Somme des deux vecteurs]\n1 1\n\n[Cas 2 — Coefficient entier en deuxième position]\n3 1\n\n[Cas 3 — Famille en dimension trois]\n2 2\n",
    "takeaway": "À retenir : Trouver les coefficients a et b tels que w = a·u + b·v.\nRepère : w = 3·u + 3·v."
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
      "À chaque colonne, cherche un coefficient non nul à partir de la ligne courante : c’est un pivot, et il en « consomme » une.",
      "Après pivot de Gauss complet, ne comptez que les lignes contenant au moins un coefficient non nul : c est le rang exact."
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
    "solution": "[Exemple]\n2\n\n[Cas 1 — Matrice inversible]\n2\n\n[Cas 2 — Lignes identiques]\n1\n\n[Cas 3 — Matrice nulle]\n0\n",
    "takeaway": "À retenir : Échelonner une matrice et compter ses pivots.\nRepère : La deuxième ligne est le double de la première : il reste 2 pivots."
  },
  {
    "id": "al-c5-e2",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Le rang des flux de données du réseau",
    "exampleTitle": "Exemple résolu — le rang des flux d'un second réseau",
    "goal": "Échelonner une matrice 3 × 3 par opérations élémentaires, compter les pivots et en déduire rang et déterminant.",
    "brief": "<p><strong>Énoncé.</strong> L'ingénieure réseau note le tableau des flux de données entre trois serveurs (<code>m<sub>ij</sub></code> = volume en Go échangé du serveur i vers le serveur j sur une journée) :</p><table><tr><th></th><th>S1</th><th>S2</th><th>S3</th></tr><tr><th>S1</th><td>1</td><td>2</td><td>0</td></tr><tr><th>S2</th><td>2</td><td>4</td><td>1</td></tr><tr><th>S3</th><td>3</td><td>6</td><td>1</td></tr></table><p>c'est-à-dire <code>M = [[1, 2, 0], [2, 4, 1], [3, 6, 1]]</code>. Pour dimensionner la sauvegarde, elle cherche le rang : le nombre de flux réellement indépendants. Elle échelonne la matrice par opérations élémentaires, en commençant par <code>L2 ← L2 - 2·L1</code>. Puis elle traite la ligne 3 : <code>L3 ← L3 - 3·L1</code>, et enfin <code>L3 ← L3 - L2</code>.</p><ol><li>Après l'opération <code>L2 ← L2 - 2·L1</code>, que devient la ligne 2 ? (trois nombres séparés par des espaces)</li><li>Sur la matrice de départ, l'opération <code>L3 ← L3 - 3·L1</code> donne la ligne (0, 0, 1) ; on applique alors <code>L3 ← L3 - L2</code>. Que devient la ligne 3 ?</li><li>Combien de pivots (lignes non nulles) reste-t-il dans la forme échelonnée ?</li><li>Quel est le rang de M ?</li><li>Que vaut det(M) ? (vérifiez aussi par la formule de développement)</li><li>Quelle est la dimension du sous-espace de ℝ³ engendré par les colonnes de M ?</li></ol><p>Format : lignes en trois nombres séparés par des espaces ; nombres seuls sinon.</p>",
    "starter": "# Exercice — Le rang des flux de données du réseau\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Lignes de matrice : trois nombres séparés par des espaces.\n\n[Question 1 — Ligne 2 après L2 <- L2 - 2·L1]\nA_COMPLETER\n\n[Question 2 — Ligne 3 après L3 <- L3 - 3·L1 puis L3 <- L3 - L2]\nA_COMPLETER\n\n[Question 3 — Nombre de pivots]\nA_COMPLETER\n\n[Question 4 — Rang de M]\nA_COMPLETER\n\n[Question 5 — det(M)]\nA_COMPLETER\n\n[Question 6 — Dimension du sous-espace engendré par les colonnes]\nA_COMPLETER\n",
    "hints": [
      "L'échelonnement se fait par opérations élémentaires : L_i ← L_i + k·L_j ne change ni le rang ni le déterminant ; on annule les coefficients sous le pivot, colonne par colonne.",
      "Après élimination, le rang est le nombre de pivots (lignes non nulles de la forme échelonnée) ; le déterminant se lit alors sur la forme échelonnée : une ligne nulle donne un déterminant nul.",
      "Le rang des colonnes égale toujours le rang des lignes : la dimension du sous-espace engendré par les colonnes est donc la même. Contrôlez le déterminant par la formule de développement selon la première ligne."
    ],
    "examples": [
      {
        "stdin": "Un second réseau a pour matrice de flux N = [[1, 1, 2], [2, 2, 5], [1, 1, 1]].\nÉchelonnement : L2 ← L2 - 2·L1 donne (0, 0, 1) ;\nL3 ← L3 - L1 donne (0, 0, -1) ; puis L3 ← L3 + L2 donne (0, 0, 0).\n\n1) Forme échelonnée : [[1, 1, 2], [0, 0, 1], [0, 0, 0]].\n2) Pivots : 2, donc rang(N) = 2.\n3) det(N) = 0 (une ligne nulle dans la forme échelonnée ; direct : 1×(2-5) - 1×(2-5) + 2×(2-2) = -3 + 3 + 0 = 0).\n4) Les colonnes n'engendrent qu'un plan : dimension 2.",
        "expected": "pivots : 2 — rang : 2 — det : 0 — colonnes : dimension 2",
        "note": "rang = nombre de pivots après échelonnement = dimension du sous-espace engendré, que l'on regarde les lignes ou les colonnes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ligne 2 après L2 <- L2 - 2·L1",
        "stdin": "q:1",
        "expected": "0 0 1"
      },
      {
        "label": "Question 2 — Ligne 3 après L3 <- L3 - 3·L1 puis L3 <- L3 - L2",
        "stdin": "q:2",
        "expected": "0 0 0"
      },
      {
        "label": "Question 3 — Nombre de pivots",
        "stdin": "q:3",
        "expected": "2"
      },
      {
        "label": "Question 4 — Rang de M",
        "stdin": "q:4",
        "expected": "2"
      },
      {
        "label": "Question 5 — det(M)",
        "stdin": "q:5",
        "expected": "0"
      },
      {
        "label": "Question 6 — Dimension du sous-espace engendré par les colonnes",
        "stdin": "q:6",
        "expected": "2"
      }
    ],
    "solution": "[Question 1 — Ligne 2 après L2 <- L2 - 2·L1]\n0 0 1\n\n[Question 2 — Ligne 3 après L3 <- L3 - 3·L1 puis L3 <- L3 - L2]\n0 0 0\n\n[Question 3 — Nombre de pivots]\n2\n\n[Question 4 — Rang de M]\n2\n\n[Question 5 — det(M)]\n0\n\n[Question 6 — Dimension du sous-espace engendré par les colonnes]\n2",
    "takeaway": "1) L2 ← L2 - 2·L1 : (2, 4, 1) - 2×(1, 2, 0) = (2 - 2, 4 - 4, 1 - 0) = (0, 0, 1).\n2) L3 ← L3 - 3·L1 : (3, 6, 1) - 3×(1, 2, 0) = (0, 0, 1) ; puis L3 ← L3 - L2 : (0, 0, 1) - (0, 0, 1) = (0, 0, 0).\n3) La forme échelonnée est [[1, 2, 0], [0, 0, 1], [0, 0, 0]] : deux lignes non nulles, donc 2 pivots.\n4) rang(M) = 2 : sur trois flux, deux seulement sont réellement indépendants — le troisième n'apporte rien (L3 = L1 + L2 après élimination : la ligne 3 du départ vérifiait L3 = 3×L1 + (0, 0, 1), c'est-à-dire exactement L2 + L1).\n5) det(M) = 0. Par les opérations élémentaires (qui ne changent pas le déterminant), la forme échelonnée possède une ligne nulle, donc det = 0. Vérification par le développement selon la première ligne : det = 1×(4×1 - 1×6) - 2×(2×1 - 1×3) + 0×(2×6 - 4×3) = (4 - 6) - 2×(2 - 3) + 0 = -2 + 2 = 0. M n'est pas inversible.\n6) Le rang des colonnes égale le rang des lignes : les colonnes n'engendrent qu'un plan, de dimension 2.\nContrôle : rang 2 < 3 équivaut à det(M) = 0 équivaut à M non inversible — les trois lectures du cours coïncident."
  },
  {
    "id": "al-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Le repère du moteur 3D du jeu vidéo",
    "exampleTitle": "Exemple résolu — le repère d'un second objet",
    "goal": "Décider si une famille de trois vecteurs de ℝ³ est une base, par le déterminant et par une relation de dépendance.",
    "brief": "<p><strong>Énoncé.</strong> Dans un jeu vidéo, le repère local d'un objet est défini par une famille de vecteurs de ℝ³. Le moteur exige une <strong>base</strong> : une famille libre et génératrice. Deux familles sont testées, une ligne par vecteur dans la matrice :</p><p><strong>Famille B</strong> : b<sub>1</sub> = (1, 1, 0), b<sub>2</sub> = (0, 1, 1), b<sub>3</sub> = (1, 0, 1) ;</p><p><strong>Famille C</strong> : c<sub>1</sub> = (1, 1, 0), c<sub>2</sub> = (0, 1, 1), c<sub>3</sub> = (1, 2, 1).</p><ol><li>Calculez le déterminant de la matrice de la famille B (vecteurs rangés en lignes).</li><li>La famille B est-elle une base de ℝ³ ?</li><li>Calculez le déterminant de la matrice de la famille C.</li><li>La famille C est-elle une base de ℝ³ ?</li><li>Quels coefficients (a, b) vérifient <code>c<sub>3</sub> = a·c<sub>1</sub> + b·c<sub>2</sub></code> ? (deux nombres séparés par un espace)</li><li>Quel est le rang de la famille C ?</li></ol><p>Format : déterminants en nombres seuls (avec le signe) ; les questions fermées se répondent par oui ou non.</p>",
    "starter": "# Exercice — Le repère du moteur 3D du jeu vidéo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions fermées : oui ou non. Determinants : nombre seul, avec le signe.\n\n[Question 1 — det de la matrice de B]\nA_COMPLETER\n\n[Question 2 — B est-elle une base de R3 ?]\nA_COMPLETER\n\n[Question 3 — det de la matrice de C]\nA_COMPLETER\n\n[Question 4 — C est-elle une base de R3 ?]\nA_COMPLETER\n\n[Question 5 — Coefficients (a, b) de c3 = a·c1 + b·c2]\nA_COMPLETER\n\n[Question 6 — Rang de la famille C]\nA_COMPLETER\n",
    "hints": [
      "Rangez la famille en matrice, une ligne par vecteur. det ≠ 0 équivaut à : famille libre, rang 3, donc base de ℝ³ (trois vecteurs libres de ℝ³ engendrent tout l'espace).",
      "Pour C, cherchez une relation simple entre les vecteurs : si l'un s'écrit comme combinaison des deux autres, le déterminant est nul et la famille n'est pas une base.",
      "Le rang d'une famille liée de trois vecteurs dont deux sont indépendants vaut 2 : le sous-espace engendré est alors un plan, pas ℝ³."
    ],
    "examples": [
      {
        "stdin": "Le repère d'un second objet est testé avec la famille :\nd1 = (1, 0, 1), d2 = (0, 2, 1), d3 = (1, 2, 2).\nMatrice (une ligne par vecteur) : [[1, 0, 1], [0, 2, 1], [1, 2, 2]].\n\n1) det = 1×(2×2 - 1×2) - 0 + 1×(0×2 - 2×1) = 2 + (-2) = 0.\n2) det = 0 : la famille n'est pas une base de R3.\n3) En fait d3 = d1 + d2 : (1, 0, 1) + (0, 2, 1) = (1, 2, 2).\n4) Rang de la famille : 2 (un plan).",
        "expected": "det : 0 — base : non — d3 = d1 + d2 — rang : 2",
        "note": "det nul, rang inférieur à 3, famille liée : trois façons de dire la même chose pour une famille de trois vecteurs de R3."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — det de la matrice de B",
        "stdin": "q:1",
        "expected": "2"
      },
      {
        "label": "Question 2 — B est-elle une base de R3 ?",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — det de la matrice de C",
        "stdin": "q:3",
        "expected": "0"
      },
      {
        "label": "Question 4 — C est-elle une base de R3 ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Coefficients (a, b) de c3 = a·c1 + b·c2",
        "stdin": "q:5",
        "expected": "1 1"
      },
      {
        "label": "Question 6 — Rang de la famille C",
        "stdin": "q:6",
        "expected": "2"
      }
    ],
    "solution": "[Question 1 — det de la matrice de B]\n2\n\n[Question 2 — B est-elle une base de R3 ?]\noui\n\n[Question 3 — det de la matrice de C]\n0\n\n[Question 4 — C est-elle une base de R3 ?]\nnon\n\n[Question 5 — Coefficients (a, b) de c3 = a·c1 + b·c2]\n1 1\n\n[Question 6 — Rang de la famille C]\n2",
    "takeaway": "1) Matrice de B (une ligne par vecteur) : [[1, 1, 0], [0, 1, 1], [1, 0, 1]]. Développement selon la première ligne : det = 1×(1×1 - 1×0) - 1×(0×1 - 1×1) + 0×(0×0 - 1×1) = 1 - (-1) + 0 = 2.\n2) Oui : det = 2 ≠ 0, la famille est libre ; trois vecteurs libres de ℝ³ (dimension 3) engendrent tout ℝ³ : B est une base. Le moteur peut l'utiliser comme repère local.\n3) Matrice de C : [[1, 1, 0], [0, 1, 1], [1, 2, 1]]. det = 1×(1×1 - 1×2) - 1×(0×1 - 1×1) + 0×(0×2 - 1×1) = (1 - 2) - (0 - 1) + 0 = -1 + 1 = 0.\n4) Non : det = 0, la famille C est liée — elle n'est pas une base.\n5) On cherche a et b avec a·(1, 1, 0) + b·(0, 1, 1) = (1, 2, 1). Composante 1 : a = 1 ; composante 3 : b = 1 ; composante 2 : a + b = 2 (OK). Donc c3 = 1·c1 + 1·c2, coefficients (1, 1) : le troisième vecteur est la somme des deux premiers.\n6) rang(C) = 2 : la famille est liée mais c1 et c2 sont indépendants (non colinéaires). Elle n'engendre qu'un plan de ℝ³.\nContrôles : c1 + c2 = (1, 1, 0) + (0, 1, 1) = (1, 2, 1) = c3, exactement ; et pour B, det = 2 ≠ 0, cohérent avec une famille dont aucun vecteur n'est combinaison des autres."
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
      "Alterner les signes revient à multiplier chaque terme par (−1) puissance la position : + − +.",
      "Alternez bien les signes (+, -, +) le long de la première ligne et contrôlez chacun des trois mineurs 2x2."
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
    "solution": "[Exemple]\n0\n\n[Cas 1 — Déterminant égal à 1]\n1\n\n[Cas 2 — Colonne de zéros partielle]\n3\n\n[Cas 3 — Matrice diagonale]\n6\n",
    "takeaway": "À retenir : Développer un déterminant par rapport à la première ligne.\nRepère : La troisième ligne est la deuxième plus (1, 1, 1) doublé… le déterminant s’annule."
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
      "Le discriminant Δ = s² − 4p décide : négatif, pas de racine réelle ; sinon les racines sont (s ± √Δ)/2.",
      "Vérifiez vos racines lambda1 et lambda2 avec s = trace(A) = lambda1 + lambda2 et p = det(A) = lambda1 * lambda2, ordonnées à deux décimales."
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
    "solution": "[Exemple]\n2.00\n5.00\n\n[Cas 1 — Matrice symétrique]\n1.00\n3.00\n\n[Cas 2 — Matrice diagonale]\n-1.00\n3.00\n\n[Cas 3 — Rotation : discriminant négatif]\npas de valeur propre reelle\n",
    "takeaway": "À retenir : Résoudre le polynôme caractéristique λ² − s·λ + p = 0.\nRepère : s = 7, p = 10 : λ² − 7λ + 10 = 0 donne 2 et 5."
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
      "La matrice est 2 × 3 : la première ligne donne la première coordonnée, la seconde la deuxième.",
      "Chaque coordonnée de sortie est le produit scalaire d une ligne de la matrice (longueur 3) par le vecteur d entrée de R^3."
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
    "solution": "[Exemple]\n3 5\n\n[Cas 1 — Coefficients négatifs]\n3 0\n\n[Cas 2 — Projection sur les deux premières coordonnées]\n5 6\n\n[Cas 3 — Combinaison des trois colonnes]\n4 12\n",
    "takeaway": "À retenir : Appliquer la matrice associée à une application linéaire de ℝ³ dans ℝ².\nRepère : 1 + 2 = 3 et 2 + 3 = 5."
  }
];
