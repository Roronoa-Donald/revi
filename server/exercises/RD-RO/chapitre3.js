/**
 * Exercices du chapitre 3 — Algorithme du Simplexe & Tableaux.
 */
'use strict';

module.exports = [
  {
    id: 'ro2-c3-e1',
    chapter: 3,
    title: 'Critère de Dantzig (Choix de la variable entrante)',
    level: 'n1',
    language: 'python',
    goal: 'Identifier la variable hors-base entrante selon la règle du plus grand coût réduit.',
    brief:
      '<p>Dans un problème de maximisation, la ligne d’indicateurs (coûts réduits $\\bar{c}_j$) ' +
      'du tableau du simplexe guide l’amélioration de la solution :</p>' +
      '<ul>' +
      '  <li>Si tous les $\\bar{c}_j \\le 0$, la solution de base courante est <strong>optimale</strong> ;</li>' +
      '  <li>Sinon, la variable entrante est celle qui possède le coût réduit le plus strictement positif $\\max \\bar{c}_j$ (règle de Dantzig). ' +
      'En cas d’égalité, on choisit l’indice le plus petit (règle de Bland pour éviter le cyclage).</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard une ligne au format <code>var1:val1,var2:val2,...</code>.<br>' +
      'Si toutes les valeurs sont $\\le 0$, affiche : <code>OPTIMALITE_ATTEINTE</code>.<br>' +
      'Sinon, affiche : <code>ENTRANTE: &lt;nom_variable&gt; COUT_REDUIT=&lt;valeur à 2 décimales&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : lire les coûts réduits et identifier la variable entrante
`,
    hints: [
      'Découpe par virgule puis chaque couple par deux-points.',
      'Cherche le maximum strictement positif. S’il n’y en a aucun, c’est optimal.'
    ],
    examples: [
      {
      stdin: 'x1:4.0,x2:6.0,s1:0.0,s2:0.0',
      expected: 'ENTRANTE: x2 COUT_REDUIT=6.00',
      note: 'x2 a le plus fort coût réduit positif (+6.0).'
      }
    ],
    tests: [
      {
        label: 'Deux variables candidates positives',
        stdin: 'x1:3.5,x2:2.0,x3:5.8,s1:0.0',
        expected: 'ENTRANTE: x3 COUT_REDUIT=5.80'
      },
      {
        label: 'Solution optimale (tous négatifs ou nuls)',
        stdin: 'x1:0.0,x2:-2.5,s1:-1.2,s2:0.0',
        expected: 'OPTIMALITE_ATTEINTE'
      },
      {
        label: 'Égalité de coût réduit (règle de Bland du plus petit indice)',
        stdin: 'x1:4.0,x2:4.0,s1:0.0',
        expected: 'ENTRANTE: x1 COUT_REDUIT=4.00'
      },
      {
        label: 'Tous strictement négatifs',
        stdin: 'x1:-0.5,x2:-4.2,s1:-3.0',
        expected: 'OPTIMALITE_ATTEINTE'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

pairs = [p.strip() for p in ligne.split(",") if p.strip()]

max_val = 0.0
nom_choisi = None

for pair in pairs:
    nom, val_str = pair.split(":")
    val = float(val_str)
    if val > max_val:
        max_val = val
        nom_choisi = nom

if nom_choisi is None or max_val <= 1e-7:
    print("OPTIMALITE_ATTEINTE")
else:
    print(f"ENTRANTE: {nom_choisi} COUT_REDUIT={max_val:.2f}")
`
  },
  {
    id: 'ro2-c3-e2',
    chapter: 3,
    title: 'Règle du ratio minimum & variable sortante',
    level: 'n2',
    language: 'python',
    goal: 'Déterminer la variable de base sortante par le test du ratio minimum de Dantzig.',
    brief:
      '<p>Une fois la colonne pivot $k$ choisie, la ligne sortante $r$ est déterminée par la règle du plus petit ratio ' +
      'strictement positif entre le second membre $b_i$ et l’élément de la colonne pivot $a_{ik}$ :<br>' +
      '$$\\theta = \\min_{i \\mid a_{ik} > 0} \\left( \\frac{b_i}{a_{ik}} \\right)$$</p>' +
      '<p>Si aucun élément $a_{ik}$ n’est strictement positif ($a_{ik} \\le 0$ pour toute la colonne), la solution est <strong>non bornée</strong>.</p>' +
      '<p>Lit sur l’entrée standard une ligne au format <code>b1,b2,...;a1k,a2k,...</code>.<br>' +
      'Si aucun $a_{ik} > 0$, affiche : <code>PROBLEME_NON_BORNE</code>.<br>' +
      'Sinon, affiche : <code>SORTANTE: LIGNE_&lt;numéro 1-indexé&gt; MIN_RATIO=&lt;theta à 2 décimales&gt;</code>.<br>' +
      '(En cas d’égalité de ratio, choisis la ligne de plus petit indice pour briser l’équi-départ).</p>',
    starter: `ligne = input().strip()

# À compléter : calculer les ratios pour aik > 0 et trouver la ligne sortante
`,
    hints: [
      'Ignore les lignes où aik <= 0.',
      'Parcours les ratios et retiens le minimum strictement positif.'
    ],
    examples: [
      {
      stdin: '18,42,24;2,3,4',
      expected: 'SORTANTE: LIGNE_3 MIN_RATIO=6.00',
      note: 'Ratios : L1=18/2=9.0, L2=42/3=14.0, L3=24/4=6.0. Le minimum est en Ligne 3.'
      }
    ],
    tests: [
      {
        label: 'Minimum en première ligne',
        stdin: '10,20,30;5,2,1',
        expected: 'SORTANTE: LIGNE_1 MIN_RATIO=2.00'
      },
      {
        label: 'Colonne pivot avec coefficients négatifs ou nuls',
        stdin: '15,25;0,-2',
        expected: 'PROBLEME_NON_BORNE'
      },
      {
        label: 'Un seul coefficient strictement positif',
        stdin: '12,8,20;-3,4,-1',
        expected: 'SORTANTE: LIGNE_2 MIN_RATIO=2.00'
      },
      {
        label: 'Égalité de ratios (brisure par indice le plus faible)',
        stdin: '10,20,50;2,4,10',
        expected: 'SORTANTE: LIGNE_1 MIN_RATIO=5.00'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
b_vals = [float(v) for v in parts[0].split(",")]
a_vals = [float(v) for v in parts[1].split(",")]

min_theta = float("inf")
best_ligne = None

EPS = 1e-7

for idx, (b, a) in enumerate(zip(b_vals, a_vals), start=1):
    if a > EPS:
        theta = b / a
        if theta < min_theta - EPS:
            min_theta = theta
            best_ligne = idx

if best_ligne is None:
    print("PROBLEME_NON_BORNE")
else:
    print(f"SORTANTE: LIGNE_{best_ligne} MIN_RATIO={min_theta:.2f}")
`
  },
  {
    id: 'ro2-c3-e3',
    chapter: 3,
    title: 'Opération de pivotage de Gauss-Jordan',
    level: 'n3',
    language: 'python',
    goal: 'Effectuer un pivot complet de Gauss-Jordan sur une matrice de simplexe.',
    brief:
      '<p>Le pivot de Gauss-Jordan sur l’élément de pivot $(r, c)$ d’une matrice $M$ s’effectue en deux étapes :</p>' +
      '<ol>' +
      '  <li>Normaliser la ligne de pivot $r$ en divisant chaque coefficient par le pivot $p = M[r][c]$ ;</li>' +
      '  <li>Pour chaque autre ligne $i \\neq r$, éliminer le coefficient de la colonne $c$ en effectuant :<br>' +
      '  $M[i][j] \\leftarrow M[i][j] - M[i][c] \\times M[r][j]$.</li>' +
      '</ol>' +
      '<p>Lit sur l’entrée standard une ligne au format <code>r,c;L1_coeff1,L1_coeff2,...|L2_coeff1,L2_coeff2,...|...</code><br>' +
      'où $r, c$ sont les indices 1-indexés du pivot (ligne $r$, colonne $c$).<br>' +
      'Affiche chaque ligne de la matrice résultante séparée par <code> | </code> avec les coefficients arrondis à 2 décimales séparés par des virgules :<br>' +
      '<code>&lt;val11&gt;,&lt;val12&gt;,... | &lt;val21&gt;,&lt;val22&gt;,...</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : charger la matrice, normaliser la ligne pivot et éliminer la colonne pivot
`,
    hints: [
      'Convertis r et c en indices 0-indexés (r-1, c-1).',
      'Sauvegarde bien la ligne pivot normalisée avant de modifier les autres lignes.'
    ],
    examples: [
      {
      stdin: '1,1;2,4,10|1,1,4',
      expected: '1.00,2.00,5.00 | 0.00,-1.00,-1.00',
      note: 'Pivot à la ligne 1, colonne 1 (valeur 2). L1 devient L1/2 = [1, 2, 5]. L2 devient L2 - 1*L1 = [0, -1, -1].'
      }
    ],
    tests: [
      {
        label: 'Matrice 2x3 avec pivot à 3.0',
        stdin: '1,2;1,3,9|2,1,8',
        expected: '0.33,1.00,3.00 | 1.67,0.00,5.00'
      },
      {
        label: 'Pivot en deuxième ligne',
        stdin: '2,1;3,2,12|2,4,16',
        expected: '0.00,-4.00,-12.00 | 1.00,2.00,8.00'
      },
      {
        label: 'Matrice 3x3 avec ligne identité',
        stdin: '2,2;1,2,5|0,4,8|2,1,6',
        expected: '1.00,0.00,1.00 | 0.00,1.00,2.00 | 2.00,0.00,4.00'
      },
      {
        label: 'Pivot déjà unitaire (1.0)',
        stdin: '1,1;1,2,6|2,3,10',
        expected: '1.00,2.00,6.00 | 0.00,-1.00,-2.00'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
r_str, c_str = parts[0].split(",")
r = int(r_str) - 1
c = int(c_str) - 1

rows_str = parts[1].split("|")
M = []
for row in rows_str:
    M.append([float(v) for v in row.strip().split(",")])

pivot = M[r][c]

# 1. Normaliser la ligne pivot
M[r] = [val / pivot for val in M[r]]

# 2. Éliminer les autres lignes
for i in range(len(M)):
    if i != r:
        facteur = M[i][c]
        M[i] = [M[i][j] - facteur * M[r][j] for j in range(len(M[r]))]

# 3. Formatage de sortie
out_rows = []
for row in M:
    formatted_vals = []
    for val in row:
        if abs(val) < 1e-9:
            val = 0.0
        formatted_vals.append(f"{val:.2f}")
    out_rows.append(",".join(formatted_vals))

print(" | ".join(out_rows))
`
  }
];
