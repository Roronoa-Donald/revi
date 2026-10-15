/**
 * Exercices de code — Algèbre linéaire (B1), 3 par module, écrits en Python.
 *
 * Le cours enseigne l'algèbre linéaire en notation mathématique ; Python y joue
 * le rôle de calculatrice vérifiable. Chaque exercice lit ses données sur
 * l'entrée standard — une valeur par ligne, ou une ligne par ligne de matrice —
 * et sa sortie est comparée après normalisation des fins de ligne.
 *
 * Même contrat que les autres catalogues :
 *   - `brief`    : l'énoncé affiché à l'élève ;
 *   - `starter`  : le code de départ déposé dans Monaco (incomplet) ;
 *   - `examples` : un exemple VISIBLE (entrée, sortie attendue, commentaire) ;
 *   - `tests`    : les tests de correction, CACHÉS (jamais envoyés au navigateur) ;
 *   - `hints`    : des indices rédigés en mots, jamais en code ;
 *   - `solution` : le corrigé, réservé au serveur (contrôle d'intégrité).
 *
 * Les entrées de test d'un même module sont toutes distinctes, et distinctes
 * des entrées d'exemple : c'est ce qui empêche le navigateur d'apprendre par
 * recoupement autre chose que l'énoncé.
 */

const RANG = `from fractions import Fraction

def rang(m):
    m = [[Fraction(x) for x in ligne] for ligne in m]
    lignes, cols, r = len(m), len(m[0]), 0
    for c in range(cols):
        pivot = next((i for i in range(r, lignes) if m[i][c] != 0), None)
        if pivot is None:
            continue
        m[r], m[pivot] = m[pivot], m[r]
        for i in range(r + 1, lignes):
            f = m[i][c] / m[r][c]
            m[i] = [m[i][j] - f * m[r][j] for j in range(cols)]
        r += 1
    return r
`;

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Module 1 — Vecteurs et matrices
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'al-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Somme de deux vecteurs',
    goal: 'Lire deux vecteurs de même taille et calculer leur somme composante par composante.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> composantes du vecteur ' +
      '<code>a</code> (une par ligne), puis les <code>n</code> composantes du vecteur <code>b</code> ' +
      '(une par ligne). Affichez la somme <code>a + b</code> sur une seule ligne, ses composantes séparées ' +
      'par un espace.</p>',
    starter: `n = int(input())
a = [int(input()) for _ in range(n)]
b = [int(input()) for _ in range(n)]

# À compléter : afficher la somme a + b sur une ligne, composantes séparées par un espace.
`,
    hints: [
      'L’addition de deux vecteurs se fait composante par composante : la i-ième composante du résultat vaut a[i] + b[i].',
      'range(n) te donne les indices de 0 à n − 1, exactement ceux des listes Python.'
    ],
    examples: [
      { stdin: '3\n1\n2\n3\n4\n5\n6', expected: '5 7 9', note: '1 + 4 = 5, 2 + 5 = 7, 3 + 6 = 9.' }
    ],
    tests: [
      { label: 'Composantes négatives', stdin: '2\n10\n-5\n3\n7', expected: '13 2' },
      { label: 'Vecteur nul au second membre', stdin: '4\n0\n0\n0\n0\n1\n2\n3\n4', expected: '1 2 3 4' },
      { label: 'Taille un', stdin: '1\n7\n8', expected: '15' }
    ],
    solution: `n = int(input())
a = [int(input()) for _ in range(n)]
b = [int(input()) for _ in range(n)]

print(" ".join(str(a[i] + b[i]) for i in range(n)))
`
  },
  {
    id: 'al-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Multiplication par un scalaire',
    goal: 'Multiplier un vecteur par un réel lu sur l’entrée standard.',
    brief: '<p>Le programme reçoit un entier <code>k</code> (le scalaire), puis un entier <code>n</code>, ' +
      'puis les <code>n</code> composantes d’un vecteur <code>v</code> (une par ligne). Affichez le vecteur ' +
      '<code>k · v</code> sur une seule ligne, composantes séparées par un espace.</p>',
    starter: `k = int(input())
n = int(input())
v = [int(input()) for _ in range(n)]

# À compléter : afficher k fois le vecteur v.
`,
    hints: [
      'Multiplier un vecteur par un scalaire multiplie chacune de ses composantes par ce nombre.',
      'Aucune composante n’est oubliée : la boucle doit passer par tous les indices.'
    ],
    examples: [
      { stdin: '3\n3\n1\n2\n3', expected: '3 6 9', note: 'Chaque composante est multipliée par 3.' }
    ],
    tests: [
      { label: 'Scalaire avec composante négative', stdin: '2\n2\n5\n-4', expected: '10 -8' },
      { label: 'Scalaire négatif', stdin: '-1\n3\n1\n2\n3', expected: '-1 -2 -3' },
      { label: 'Scalaire nul', stdin: '0\n4\n7\n8\n9\n10', expected: '0 0 0 0' }
    ],
    solution: `k = int(input())
n = int(input())
v = [int(input()) for _ in range(n)]

print(" ".join(str(k * v[i]) for i in range(n)))
`
  },
  {
    id: 'al-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'python',
    title: 'Trace d’une matrice carrée',
    goal: 'Lire une matrice carrée et calculer la somme de ses coefficients diagonaux.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> lignes contenant chacune ' +
      '<code>n</code> entiers séparés par des espaces (la matrice). Affichez la <strong>trace</strong> de la ' +
      'matrice : <code>a₁₁ + a₂₂ + … + aₙₙ</code>.</p>',
    starter: `n = int(input())
matrice = [[int(x) for x in input().split()] for _ in range(n)]

# À compléter : afficher la trace, c’est-à-dire la somme des coefficients de la diagonale.
`,
    hints: [
      'Les coefficients diagonaux sont matrice[0][0], matrice[1][1], matrice[2][2], … : les deux indices sont égaux.',
      'En Python, les indices commencent à 0 : la diagonale, c’est matrice[i][i] pour i allant de 0 à n − 1.'
    ],
    examples: [
      { stdin: '3\n1 2 3\n4 5 6\n7 8 9', expected: '15', note: '1 + 5 + 9 = 15.' }
    ],
    tests: [
      { label: 'Matrice 2 × 2', stdin: '2\n4 1\n9 6', expected: '10' },
      { label: 'Matrice 4 × 4 diagonale', stdin: '4\n1 0 0 0\n0 2 0 0\n0 0 3 0\n0 0 0 4', expected: '10' },
      { label: 'Matrice 1 × 1', stdin: '1\n42', expected: '42' }
    ],
    solution: `n = int(input())
matrice = [[int(x) for x in input().split()] for _ in range(n)]

print(sum(matrice[i][i] for i in range(n)))
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 2 — Produit, transposée et trace
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'al-c2-e1',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Produit de deux matrices 2 × 2',
    goal: 'Calculer un produit matriciel et appliquer la formule (A·B)<sub>ij</sub> = Σ a<sub>ik</sub>·b<sub>kj</sub>.',
    brief: '<p>Le programme reçoit quatre lignes de deux entiers : les deux lignes de <code>A</code>, puis ' +
      'les deux lignes de <code>B</code>. Affichez le produit <code>A · B</code> : deux lignes de deux ' +
      'entiers séparés par un espace.</p>',
    starter: `A = [[int(x) for x in input().split()] for _ in range(2)]
B = [[int(x) for x in input().split()] for _ in range(2)]

# À compléter : afficher le produit A · B (deux lignes de deux entiers).
`,
    hints: [
      'Le coefficient ligne i, colonne j du produit est la somme des A[i][k] · B[k][j] pour k = 0 et k = 1.',
      'Pense à la taille : (2 × 2) · (2 × 2) = (2 × 2), le résultat a donc autant de lignes et de colonnes que les facteurs.'
    ],
    examples: [
      { stdin: '1 2\n3 4\n5 6\n7 8', expected: '19 22\n43 50', note: '1·5 + 2·7 = 19, 1·6 + 2·8 = 22, etc.' }
    ],
    tests: [
      { label: 'Matrice diagonale à gauche', stdin: '2 0\n0 2\n1 1\n1 1', expected: '2 2\n2 2' },
      { label: 'Produit nul sans facteur nul', stdin: '1 1\n1 1\n1 -1\n-1 1', expected: '0 0\n0 0' },
      { label: 'Produit par la matrice identité', stdin: '3 1\n2 4\n1 0\n0 1', expected: '3 1\n2 4' }
    ],
    solution: `A = [[int(x) for x in input().split()] for _ in range(2)]
B = [[int(x) for x in input().split()] for _ in range(2)]

produit = [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
for ligne in produit:
    print(" ".join(str(x) for x in ligne))
`
  },
  {
    id: 'al-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Transposée d’une matrice',
    goal: 'Échanger les lignes et les colonnes d’une matrice rectangulaire.',
    brief: '<p>Le programme reçoit une ligne <code>m n</code> (dimensions), puis <code>m</code> lignes de ' +
      '<code>n</code> entiers. Affichez la <strong>transposée</strong> : <code>n</code> lignes de ' +
      '<code>m</code> entiers séparés par un espace.</p>',
    starter: `m, n = (int(x) for x in input().split())
matrice = [[int(x) for x in input().split()] for _ in range(m)]

# À compléter : afficher la transposée, lignes et colonnes échangées.
`,
    hints: [
      'La transposée, c’est matrice[i][j] rangé à la place matrice[j][i] : les deux indices s’inversent.',
      'La boucle extérieure parcourt les colonnes (0 à n − 1), la boucle intérieure les lignes (0 à m − 1).'
    ],
    examples: [
      { stdin: '2 3\n1 2 3\n4 5 6', expected: '1 4\n2 5\n3 6', note: 'La matrice 2 × 3 devient 3 × 2.' }
    ],
    tests: [
      { label: 'Matrice 3 × 2 à coefficients 0 et 1', stdin: '3 2\n1 0\n0 1\n1 1', expected: '1 0 1\n0 1 1' },
      { label: 'Matrice ligne', stdin: '1 4\n7 8 9 10', expected: '7\n8\n9\n10' },
      { label: 'Matrice 2 × 2', stdin: '2 2\n5 6\n7 8', expected: '5 7\n6 8' }
    ],
    solution: `m, n = (int(x) for x in input().split())
matrice = [[int(x) for x in input().split()] for _ in range(m)]

for j in range(n):
    print(" ".join(str(matrice[i][j]) for i in range(m)))
`
  },
  {
    id: 'al-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'python',
    title: 'La matrice est-elle symétrique ?',
    goal: 'Tester l’égalité <sup>t</sup>A = A, c’est-à-dire a<sub>ij</sub> = a<sub>ji</sub>.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> lignes de <code>n</code> ' +
      'entiers. Affichez <code>symetrique</code> si la matrice est égale à sa transposée, sinon ' +
      '<code>non symetrique</code>.</p>',
    starter: `n = int(input())
matrice = [[int(x) for x in input().split()] for _ in range(n)]

# À compléter : afficher "symetrique" ou "non symetrique".
`,
    hints: [
      'Symétrique signifie a[i][j] == a[j][i] pour tous les indices i et j.',
      'Dès qu’un couple (i, j) viole l’égalité, la réponse est « non symetrique » : inutile de continuer.'
    ],
    examples: [
      { stdin: '3\n1 2 3\n2 5 6\n3 6 9', expected: 'symetrique', note: 'La partie au-dessus de la diagonale se retrouve dessous.' }
    ],
    tests: [
      { label: 'Matrice triangulaire', stdin: '2\n1 2\n3 4', expected: 'non symetrique' },
      { label: 'Coefficients hors diagonale égaux', stdin: '2\n0 7\n7 0', expected: 'symetrique' },
      { label: 'Symétrie brisée en bas à droite', stdin: '3\n1 1 1\n0 2 0\n0 0 3', expected: 'non symetrique' }
    ],
    solution: `n = int(input())
matrice = [[int(x) for x in input().split()] for _ in range(n)]

symetrique = all(matrice[i][j] == matrice[j][i] for i in range(n) for j in range(n))
print("symetrique" if symetrique else "non symetrique")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 3 — Inverse et méthode de Gauss
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'al-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'python',
    title: 'Déterminant d’une matrice 2 × 2',
    goal: 'Appliquer la formule ad − bc et en déduire l’inversibilité.',
    brief: '<p>Le programme reçoit deux lignes de deux entiers (la matrice <code>[[a, b], [c, d]]</code>). ' +
      'Affichez son déterminant, c’est-à-dire <code>a·d − b·c</code>.</p>',
    starter: `a, b = (int(x) for x in input().split())
c, d = (int(x) for x in input().split())

# À compléter : afficher le déterminant a·d − b·c.
`,
    hints: [
      'Le déterminant d’une matrice 2 × 2 est le produit de la diagonale moins le produit de l’autre diagonale.',
      'Attention à l’ordre : c’est bien a·d − b·c, et non b·c − a·d.'
    ],
    examples: [
      { stdin: '1 2\n3 4', expected: '-2', note: '1·4 − 2·3 = 4 − 6 = −2.' }
    ],
    tests: [
      { label: 'Matrice diagonale', stdin: '2 0\n0 3', expected: '6' },
      { label: 'Deux lignes égales', stdin: '1 1\n1 1', expected: '0' },
      { label: 'Coefficients positifs', stdin: '5 3\n2 4', expected: '14' }
    ],
    solution: `a, b = (int(x) for x in input().split())
c, d = (int(x) for x in input().split())

print(a * d - b * c)
`
  },
  {
    id: 'al-c3-e2',
    chapter: 3,
    level: 'n3',
    language: 'python',
    title: 'Inverse d’une matrice 2 × 2',
    goal: 'Diviser l’adjugate par le déterminant, en traitant le cas singulier.',
    brief: '<p>Le programme reçoit deux lignes de deux entiers. Affichez l’inverse de la matrice : ' +
      'deux lignes de deux coefficients entiers. Si le déterminant est nul, affichez ' +
      '<code>singuliere</code>. Les entrées sont choisies pour que l’inverse ait des coefficients entiers.</p>',
    starter: `a, b = (int(x) for x in input().split())
c, d = (int(x) for x in input().split())

# À compléter : afficher l’inverse (deux lignes de deux entiers) ou "singuliere".
`,
    hints: [
      'L’inverse vaut 1/det · [[d, −b], [−c, a]] : on échange a et d, on change le signe de b et c, puis on divise.',
      'Avant tout calcul, teste le déterminant : s’il est nul, la matrice est singulière et n’a pas d’inverse.'
    ],
    examples: [
      { stdin: '2 1\n1 1', expected: '1 -1\n-1 2', note: 'det = 1 : l’inverse est directement l’adjugate.' }
    ],
    tests: [
      { label: 'det = 1, coefficients croissants', stdin: '1 2\n1 3', expected: '3 -2\n-1 1' },
      { label: 'det = 1, coefficients inversés', stdin: '3 1\n2 1', expected: '1 -1\n-2 3' },
      { label: 'det = −1', stdin: '0 1\n1 0', expected: '0 1\n1 0' },
      { label: 'Matrice singulière', stdin: '1 2\n2 4', expected: 'singuliere' }
    ],
    solution: `a, b = (int(x) for x in input().split())
c, d = (int(x) for x in input().split())

det = a * d - b * c
if det == 0:
    print("singuliere")
else:
    print(d // det, -b // det)
    print(-c // det, a // det)
`
  },
  {
    id: 'al-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'python',
    title: 'Résoudre un système 2 × 2',
    goal: 'Mettre en œuvre l’élimination de Gauss et la remontée sur un système carré.',
    brief: '<p>Le programme reçoit trois lignes : <code>a b e</code> pour l’équation <code>a·x + b·y = e</code>, ' +
      'puis <code>c d f</code> pour <code>c·x + d·y = f</code>. Le déterminant est non nul. Affichez ' +
      '<code>x</code> puis <code>y</code>, chacun sur sa ligne, arrondis à deux décimales.</p>',
    starter: `a, b, e = (int(x) for x in input().split())
c, d, f = (int(x) for x in input().split())

# À compléter : résoudre le système et afficher x puis y, deux décimales chacune.
`,
    hints: [
      'Élimine x dans la deuxième équation : multiplie la première par c et la seconde par a, puis soustrais.',
      'Tu peux aussi résoudre par les formules de Cramer : x = (e·d − b·f)/det et y = (a·f − e·c)/det.'
    ],
    examples: [
      { stdin: '1 1 3\n1 -1 1', expected: '2.00\n1.00', note: 'x = 2 et y = 1 : 2 + 1 = 3 et 2 − 1 = 1.' }
    ],
    tests: [
      { label: 'Determinant négatif', stdin: '1 2 5\n3 1 5', expected: '1.00\n2.00' },
      { label: 'Coefficients plus grands', stdin: '2 3 12\n1 -1 1', expected: '3.00\n2.00' },
      { label: 'Second membre pair', stdin: '4 2 10\n1 1 4', expected: '1.00\n3.00' }
    ],
    solution: `a, b, e = (int(x) for x in input().split())
c, d, f = (int(x) for x in input().split())

det = a * d - b * c
x = (e * d - b * f) / det
y = (a * f - e * c) / det

print(f"{x:.2f}")
print(f"{y:.2f}")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — Espaces vectoriels
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'al-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'python',
    title: 'Combinaison linéaire',
    goal: 'Calculer une combinaison linéaire α·u + β·v, l’opération de base d’un espace vectoriel.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis une ligne <code>alpha beta</code>, puis ' +
      'les <code>n</code> composantes de <code>u</code> (une par ligne), puis celles de <code>v</code>. ' +
      'Affichez <code>alpha·u + beta·v</code> sur une ligne, composantes séparées par un espace.</p>',
    starter: `n = int(input())
alpha, beta = (int(x) for x in input().split())
u = [int(input()) for _ in range(n)]
v = [int(input()) for _ in range(n)]

# À compléter : afficher la combinaison linéaire alpha·u + beta·v.
`,
    hints: [
      'Une combinaison linéaire combine deux opérations : multiplier chaque vecteur par son scalaire, puis additionner.',
      'Tu peux écrire les deux étapes séparément, ou les fusionner dans une seule boucle.'
    ],
    examples: [
      { stdin: '3\n2 3\n1\n2\n3\n4\n5\n6', expected: '14 19 24', note: '2·1 + 3·4 = 14, 2·2 + 3·5 = 19, 2·3 + 3·6 = 24.' }
    ],
    tests: [
      { label: 'Opposé de u', stdin: '2\n1 -1\n5\n7\n5\n7', expected: '0 0' },
      { label: 'Alpha nul', stdin: '3\n0 2\n1\n1\n1\n9\n8\n7', expected: '18 16 14' },
      { label: 'Vecteurs de taille un', stdin: '1\n4 4\n1\n1', expected: '8' }
    ],
    solution: `n = int(input())
alpha, beta = (int(x) for x in input().split())
u = [int(input()) for _ in range(n)]
v = [int(input()) for _ in range(n)]

print(" ".join(str(alpha * u[i] + beta * v[i]) for i in range(n)))
`
  },
  {
    id: 'al-c4-e2',
    chapter: 4,
    level: 'n3',
    language: 'python',
    title: 'Le vecteur appartient-il au plan engendré ?',
    goal: 'Décider l’appartenance à un sous-espace engendré par deux vecteurs indépendants.',
    brief: '<p>Le programme reçoit trois lignes de trois entiers : <code>u</code>, <code>v</code> et ' +
      '<code>w</code>. Les vecteurs <code>u</code> et <code>v</code> sont indépendants. Affichez ' +
      '<code>oui</code> si <code>w</code> appartient au sous-espace engendré par <code>u</code> et ' +
      '<code>v</code>, sinon <code>non</code>.</p>',
    starter: `u = [int(x) for x in input().split()]
v = [int(x) for x in input().split()]
w = [int(x) for x in input().split()]

# À compléter : afficher "oui" si w ∈ Vect(u, v), sinon "non".
`,
    hints: [
      'w appartient à Vect(u, v) exactement quand les trois vecteurs sont coplanaires.',
      'Trois vecteurs de ℝ³ sont coplanaires si et seulement si le déterminant de la matrice qu’ils forment est nul.'
    ],
    examples: [
      { stdin: '1 0 0\n0 1 0\n1 1 0', expected: 'oui', note: 'w = u + v : il est bien dans le plan engendré.' }
    ],
    tests: [
      { label: 'Vecteur hors du plan', stdin: '1 0 0\n0 1 0\n1 1 1', expected: 'non' },
      { label: 'Vecteur somme des deux autres', stdin: '1 2 3\n0 1 4\n1 3 7', expected: 'oui' },
      { label: 'Combinaison quelconque', stdin: '2 1 0\n1 0 1\n1 1 1', expected: 'non' }
    ],
    solution: `u = [int(x) for x in input().split()]
v = [int(x) for x in input().split()]
w = [int(x) for x in input().split()]

det = (u[0] * (v[1] * w[2] - v[2] * w[1])
       - u[1] * (v[0] * w[2] - v[2] * w[0])
       + u[2] * (v[0] * w[1] - v[1] * w[0]))

print("oui" if det == 0 else "non")
`
  },
  {
    id: 'al-c4-e3',
    chapter: 4,
    level: 'n4',
    language: 'python',
    title: 'Coordonnées dans une famille',
    goal: 'Trouver les coefficients a et b tels que w = a·u + b·v.',
    brief: '<p>Le programme reçoit trois lignes de trois entiers : <code>w</code>, <code>u</code> et ' +
      '<code>v</code>. Les vecteurs <code>u</code> et <code>v</code> sont indépendants et <code>w</code> ' +
      'appartient à leur plan. Affichez les coordonnées <code>a b</code> de <code>w</code> dans la famille ' +
      '<code>(u, v)</code>, séparées par un espace.</p>',
    starter: `w = [int(x) for x in input().split()]
u = [int(x) for x in input().split()]
v = [int(x) for x in input().split()]

# À compléter : afficher les coordonnées a et b de w = a·u + b·v.
`,
    hints: [
      'w = a·u + b·v donne trois équations, dont deux suffisent puisque les vecteurs sont dans un plan.',
      'Choisis deux coordonnées dont le déterminant 2 × 2 est non nul, puis résous ce petit système.'
    ],
    examples: [
      { stdin: '3 3 0\n1 0 0\n0 1 0', expected: '3 3', note: 'w = 3·u + 3·v.' }
    ],
    tests: [
      { label: 'Somme des deux vecteurs', stdin: '1 1 0\n1 0 0\n0 1 0', expected: '1 1' },
      { label: 'Coefficient entier en deuxième position', stdin: '5 4 0\n1 1 0\n2 1 0', expected: '3 1' },
      { label: 'Famille en dimension trois', stdin: '2 0 2\n1 0 0\n0 0 1', expected: '2 2' }
    ],
    solution: `w = [int(x) for x in input().split()]
u = [int(x) for x in input().split()]
v = [int(x) for x in input().split()]

for i, j in ((0, 1), (0, 2), (1, 2)):
    det = u[i] * v[j] - u[j] * v[i]
    if det != 0:
        a = (w[i] * v[j] - w[j] * v[i]) / det
        b = (u[i] * w[j] - u[j] * w[i]) / det
        print(round(a), round(b))
        break
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — Familles, bases et rang
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'al-c5-e1',
    chapter: 5,
    level: 'n3',
    language: 'python',
    title: 'Rang d’une matrice',
    goal: 'Échelonner une matrice et compter ses pivots.',
    brief: '<p>Le programme reçoit une ligne <code>m n</code> (dimensions), puis <code>m</code> lignes de ' +
      '<code>n</code> entiers. Affichez le <strong>rang</strong> de la matrice.</p>',
    starter: `m, n = (int(x) for x in input().split())
matrice = [[int(x) for x in input().split()] for _ in range(m)]

# À compléter : afficher le rang (nombre de pivots après échelonnement).
`,
    hints: [
      'Le rang est le nombre de lignes non nulles une fois la matrice échelonnée par la méthode du pivot.',
      'À chaque colonne, cherche un coefficient non nul à partir de la ligne courante : c’est un pivot, et il en « consomme » une.'
    ],
    examples: [
      { stdin: '3 3\n1 2 3\n2 4 6\n1 0 1', expected: '2', note: 'La deuxième ligne est le double de la première : il reste 2 pivots.' }
    ],
    tests: [
      { label: 'Matrice inversible', stdin: '2 2\n1 2\n3 4', expected: '2' },
      { label: 'Lignes identiques', stdin: '3 3\n1 1 1\n1 1 1\n1 1 1', expected: '1' },
      { label: 'Matrice nulle', stdin: '2 3\n0 0 0\n0 0 0', expected: '0' }
    ],
    solution: RANG + `
m, n = (int(x) for x in input().split())
matrice = [[int(x) for x in input().split()] for _ in range(m)]

print(rang(matrice))
`
  },
  {
    id: 'al-c5-e2',
    chapter: 5,
    level: 'n3',
    language: 'python',
    title: 'Famille libre ou liée ?',
    goal: 'Comparer le rang d’une famille au nombre de ses vecteurs.',
    brief: '<p>Le programme reçoit deux entiers <code>d</code> (dimension) et <code>p</code> (nombre de ' +
      'vecteurs), puis <code>p</code> lignes de <code>d</code> entiers. Affichez <code>libre</code> si la ' +
      'famille est linéairement indépendante, sinon <code>liee</code>.</p>',
    starter: `d, p = (int(x) for x in input().split())
vecteurs = [[int(x) for x in input().split()] for _ in range(p)]

# À compléter : afficher "libre" ou "liee".
`,
    hints: [
      'Une famille de p vecteurs est libre quand le rang de la matrice qu’ils forment vaut exactement p.',
      'Si le rang est strictement inférieur à p, au moins un vecteur est combinaison des autres : la famille est liée.'
    ],
    examples: [
      { stdin: '3 3\n1 0 0\n0 1 0\n0 0 1', expected: 'libre', note: 'Les trois vecteurs de la base canonique sont indépendants.' }
    ],
    tests: [
      { label: 'Troisième vecteur somme des deux premiers', stdin: '3 3\n1 2 3\n0 1 4\n1 3 7', expected: 'liee' },
      { label: 'Moins de vecteurs que la dimension', stdin: '3 2\n1 0 0\n0 1 0', expected: 'libre' },
      { label: 'Vecteurs colinéaires', stdin: '2 3\n1 2\n2 4\n3 6', expected: 'liee' }
    ],
    solution: RANG + `
d, p = (int(x) for x in input().split())
vecteurs = [[int(x) for x in input().split()] for _ in range(p)]

print("libre" if rang(vecteurs) == p else "liee")
`
  },
  {
    id: 'al-c5-e3',
    chapter: 5,
    level: 'n4',
    language: 'python',
    title: 'Est-ce une base de ℝ³ ?',
    goal: 'Utiliser le déterminant pour décider si trois vecteurs forment une base.',
    brief: '<p>Le programme reçoit trois lignes de trois entiers : trois vecteurs de ℝ³. Affichez ' +
      '<code>base</code> s’ils forment une base de ℝ³, sinon <code>pas une base</code>.</p>',
    starter: `v1 = [int(x) for x in input().split()]
v2 = [int(x) for x in input().split()]
v3 = [int(x) for x in input().split()]

# À compléter : afficher "base" ou "pas une base".
`,
    hints: [
      'Trois vecteurs de ℝ³ forment une base si et seulement s’ils sont libres.',
      'Avec trois vecteurs de ℝ³, liberté et déterminant non nul sont équivalents : c’est le calcul le plus rapide.'
    ],
    examples: [
      { stdin: '1 0 0\n0 1 0\n0 0 1', expected: 'base', note: 'La base canonique de ℝ³.' }
    ],
    tests: [
      { label: 'Déterminant égal à 1', stdin: '1 2 3\n0 1 4\n5 6 0', expected: 'base' },
      { label: 'Vecteurs coplanaires', stdin: '1 2 3\n2 4 6\n1 0 1', expected: 'pas une base' },
      { label: 'Famille orthogonale', stdin: '2 0 0\n0 3 0\n0 0 5', expected: 'base' }
    ],
    solution: `v1 = [int(x) for x in input().split()]
v2 = [int(x) for x in input().split()]
v3 = [int(x) for x in input().split()]

det = (v1[0] * (v2[1] * v3[2] - v2[2] * v3[1])
       - v1[1] * (v2[0] * v3[2] - v2[2] * v3[0])
       + v1[2] * (v2[0] * v3[1] - v2[1] * v3[0]))

print("base" if det != 0 else "pas une base")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 6 — Déterminants, applications linéaires, valeurs propres
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'al-c6-e1',
    chapter: 6,
    level: 'n2',
    language: 'python',
    title: 'Déterminant d’une matrice 3 × 3',
    goal: 'Développer un déterminant par rapport à la première ligne.',
    brief: '<p>Le programme reçoit trois lignes de trois entiers. Affichez le déterminant de la matrice.</p>',
    starter: `a, b, c = (int(x) for x in input().split())
d, e, f = (int(x) for x in input().split())
g, h, i = (int(x) for x in input().split())

# À compléter : afficher le déterminant (développement selon la première ligne).
`,
    hints: [
      'Développe selon la première ligne en alternant les signes : a(ei − fh) − b(di − fg) + c(dh − eg).',
      'Alterner les signes revient à multiplier chaque terme par (−1) puissance la position : + − +.'
    ],
    examples: [
      { stdin: '1 2 3\n4 5 6\n7 8 9', expected: '0', note: 'La troisième ligne est la deuxième plus (1, 1, 1) doublé… le déterminant s’annule.' }
    ],
    tests: [
      { label: 'Déterminant égal à 1', stdin: '1 2 3\n0 1 4\n5 6 0', expected: '1' },
      { label: 'Colonne de zéros partielle', stdin: '2 0 1\n3 0 0\n5 1 1', expected: '3' },
      { label: 'Matrice diagonale', stdin: '1 0 0\n0 2 0\n0 0 3', expected: '6' }
    ],
    solution: `a, b, c = (int(x) for x in input().split())
d, e, f = (int(x) for x in input().split())
g, h, i = (int(x) for x in input().split())

det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g)
print(det)
`
  },
  {
    id: 'al-c6-e2',
    chapter: 6,
    level: 'n4',
    language: 'python',
    title: 'Valeurs propres d’une matrice 2 × 2',
    goal: 'Résoudre le polynôme caractéristique λ² − s·λ + p = 0.',
    brief: '<p>Le programme reçoit deux lignes de deux entiers (une matrice 2 × 2). Affichez ses valeurs ' +
      'propres réelles, la plus petite puis la plus grande, chacune arrondie à deux décimales. S’il n’y a ' +
      'pas de valeur propre réelle, affichez <code>pas de valeur propre reelle</code>.</p>',
    starter: `a, b = (int(x) for x in input().split())
c, d = (int(x) for x in input().split())

# À compléter : afficher les valeurs propres, ou "pas de valeur propre reelle".
`,
    hints: [
      'Le polynôme caractéristique s’écrit λ² − s·λ + p = 0, où s est la trace et p le déterminant.',
      'Le discriminant Δ = s² − 4p décide : négatif, pas de racine réelle ; sinon les racines sont (s ± √Δ)/2.'
    ],
    examples: [
      { stdin: '4 1\n2 3', expected: '2.00\n5.00', note: 's = 7, p = 10 : λ² − 7λ + 10 = 0 donne 2 et 5.' }
    ],
    tests: [
      { label: 'Matrice symétrique', stdin: '2 1\n1 2', expected: '1.00\n3.00' },
      { label: 'Matrice diagonale', stdin: '3 0\n0 -1', expected: '-1.00\n3.00' },
      { label: 'Rotation : discriminant négatif', stdin: '0 1\n-1 0', expected: 'pas de valeur propre reelle' }
    ],
    solution: `a, b = (int(x) for x in input().split())
c, d = (int(x) for x in input().split())

s = a + d
p = a * d - b * c
delta = s * s - 4 * p

if delta < 0:
    print("pas de valeur propre reelle")
else:
    l1 = (s - delta ** 0.5) / 2
    l2 = (s + delta ** 0.5) / 2
    print(f"{l1:.2f}")
    print(f"{l2:.2f}")
`
  },
  {
    id: 'al-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'python',
    title: 'Image d’un vecteur par une application linéaire',
    goal: 'Appliquer la matrice associée à une application linéaire de ℝ³ dans ℝ².',
    brief: '<p>Le programme reçoit deux lignes de trois entiers (la matrice de l’application <code>f</code>), ' +
      'puis trois lignes donnant les coordonnées d’un vecteur <code>v</code>. Affichez <code>f(v)</code> : ' +
      'deux entiers séparés par un espace.</p>',
    starter: `ligne1 = [int(x) for x in input().split()]
ligne2 = [int(x) for x in input().split()]
v = [int(input()) for _ in range(3)]

# À compléter : afficher l’image f(v), deux entiers séparés par un espace.
`,
    hints: [
      'Chaque coordonnée de f(v) est le produit scalaire d’une ligne de la matrice avec v.',
      'La matrice est 2 × 3 : la première ligne donne la première coordonnée, la seconde la deuxième.'
    ],
    examples: [
      { stdin: '1 1 0\n0 1 1\n1\n2\n3', expected: '3 5', note: '1 + 2 = 3 et 2 + 3 = 5.' }
    ],
    tests: [
      { label: 'Coefficients négatifs', stdin: '2 0 1\n0 1 -1\n1\n1\n1', expected: '3 0' },
      { label: 'Projection sur les deux premières coordonnées', stdin: '1 0 0\n0 1 0\n5\n6\n7', expected: '5 6' },
      { label: 'Combinaison des trois colonnes', stdin: '-1 2 0\n0 0 3\n2\n3\n4', expected: '4 12' }
    ],
    solution: `ligne1 = [int(x) for x in input().split()]
ligne2 = [int(x) for x in input().split()]
v = [int(input()) for _ in range(3)]

y1 = sum(ligne1[k] * v[k] for k in range(3))
y2 = sum(ligne2[k] * v[k] for k in range(3))

print(y1, y2)
`
  }
];
