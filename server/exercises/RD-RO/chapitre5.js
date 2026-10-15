/**
 * Exercices du chapitre 5 — Problèmes de Transport & Affectation.
 */
'use strict';

module.exports = [
  {
    id: 'ro2-c5-e1',
    chapter: 5,
    title: 'Méthode du Coin Nord-Ouest (Transport)',
    level: 'n1',
    language: 'python',
    goal: 'Construire une solution de base réalisable initiale par la règle du coin Nord-Ouest.',
    brief:
      '<p>Dans un problème de transport équilibré (somme des offres = somme des demandes), la règle du <strong>Coin Nord-Ouest</strong> ' +
      'commence en haut à gauche $(i=0, j=0)$ :</p>' +
      '<ul>' +
      '  <li>Alloue $x_{ij} = \\min(offre_i, demande_j)$ ;</li>' +
      '  <li>Soustrait cette quantité de $offre_i$ et $demande_j$ ;</li>' +
      '  <li>Si $offre_i = 0$, avance vers le bas ($i \\leftarrow i + 1$) ; si $demande_j = 0$, avance vers la droite ($j \\leftarrow j + 1$).</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard une ligne au format <code>o1,o2,...;d1,d2,...;cout11,cout12,...|cout21,cout22,...|...</code>.<br>' +
      'Calcule les flux non nuls alloués et le coût total de transport $C = \\sum x_{ij} \\times c_{ij}$.<br>' +
      'Affiche :<br>' +
      '<code>FLUX: (i,j)=qte,... COUT_TOTAL=&lt;C à 1 décimale&gt;</code><br>' +
      '(les indices $i, j$ sont 1-indexés).</p>',
    starter: `ligne = input().strip()

# À compléter : implémenter la règle du coin nord-ouest et calculer le coût total
`,
    hints: [
      'Garde deux pointeurs i = 0 et j = 0.',
      'Tant que i < len(offres) et j < len(demandes), calcule q = min(offres[i], demandes[j]).'
    ],
    examples: [
      {
      stdin: '30,40;20,30,20;3,5,7|2,4,6',
      expected: 'FLUX: (1,1)=20.0,(1,2)=10.0,(2,2)=20.0,(2,3)=20.0 COUT_TOTAL=310.0',
      note: 'O1=30, D1=20 -> (1,1)=20. D1 est satisfaite. O1 restant=10, D2=30 -> (1,2)=10. O1 épuisée. O2=40, D2 restant=20 -> (2,2)=20. O2 restant=20, D3=20 -> (2,3)=20. Coût: 20*3 + 10*5 + 20*4 + 20*6 = 60+50+80+120 = 310.0.'
      }
    ],
    tests: [
      {
        label: 'Deux origines deux destinations',
        stdin: '25,25;30,20;2,4|3,5',
        expected: 'FLUX: (1,1)=25.0,(2,1)=5.0,(2,2)=20.0 COUT_TOTAL=165.0'
      },
      {
        label: 'Trois origines deux destinations',
        stdin: '10,20,30;25,35;4,6|2,5|3,1',
        expected: 'FLUX: (1,1)=10.0,(2,1)=15.0,(2,2)=5.0,(3,2)=30.0 COUT_TOTAL=125.0'
      },
      {
        label: 'Matrice 2x2 avec égalité parfaite sur la première case',
        stdin: '20,30;20,30;5,8|4,2',
        expected: 'FLUX: (1,1)=20.0,(2,2)=30.0 COUT_TOTAL=160.0'
      },
      {
        label: 'Offres et demandes unitaires',
        stdin: '5,5;5,5;1,2|3,4',
        expected: 'FLUX: (1,1)=5.0,(2,2)=5.0 COUT_TOTAL=25.0'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
offres = [float(v) for v in parts[0].split(",")]
demandes = [float(v) for v in parts[1].split(",")]

couts = []
for row in parts[2].split("|"):
    couts.append([float(v) for v in row.strip().split(",")])

i = 0
j = 0
flux = []
cout_total = 0.0

EPS = 1e-7

while i < len(offres) and j < len(demandes):
    q = min(offres[i], demandes[j])
    if q > EPS:
        flux.append(f"({i+1},{j+1})={q:.1f}")
        cout_total += q * couts[i][j]
    offres[i] -= q
    demandes[j] -= q
    if offres[i] < EPS:
        i += 1
    if demandes[j] < EPS:
        j += 1

print(f"FLUX: {','.join(flux)} COUT_TOTAL={cout_total:.1f}")
`
  },
  {
    id: 'ro2-c5-e2',
    chapter: 5,
    title: 'Méthode du Moindre Coût (Transport économique)',
    level: 'n2',
    language: 'python',
    goal: 'Construire une solution initiale de transport par allocation gloutonne sur la case la moins chère.',
    brief:
      '<p>Contrairement au Coin Nord-Ouest qui ignore les prix, la <strong>Méthode du Moindre Coût</strong> sélectionne à chaque étape ' +
      'la cellule $(i, j)$ encore active ayant le coût unitaire $c_{ij}$ le plus faible de toute la matrice :</p>' +
      '<ul>' +
      '  <li>Alloue $q = \\min(offre_i, demande_j)$ à cette cellule ;</li>' +
      '  <li>Met à jour l’offre et la demande restantes ;</li>' +
      '  <li>Désactive la ligne $i$ (si $offre_i = 0$) ou la colonne $j$ (si $demande_j = 0$).</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard : <code>o1,o2;d1,d2;c11,c12|c21,c22</code>.<br>' +
      'Affiche : <code>MOINDRE_COUT: COUT_TOTAL=&lt;C à 1 décimale&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : trouver à chaque étape la case active de coût minimal et allouer le flux
`,
    hints: [
      'Repère les indices (i, j) non encore saturés avec le coût min.',
      'Soustrait q de l\'offre i et de la demande j jusqu\'à épuisement.'
    ],
    examples: [
      {
      stdin: '20,30;25,25;3,5|2,4',
      expected: 'MOINDRE_COUT: COUT_TOTAL=170.0',
      note: 'Allocation : (2,1)=25 (coût 2), (2,2)=5 (coût 4), (1,2)=20 (coût 5). Coût total = 25*2 + 5*4 + 20*5 = 50 + 20 + 100 = 170.0.'
      }
    ],
    tests: [
      {
        label: 'Matrice 2x2 contrastée',
        stdin: '30,20;25,25;4,2|3,5',
        expected: 'MOINDRE_COUT: COUT_TOTAL=130.0'
      },
      {
        label: 'Matrice 2x2 avec coûts équilibrés',
        stdin: '40,40;30,50;1,3|2,1',
        expected: 'MOINDRE_COUT: COUT_TOTAL=100.0'
      },
      {
        label: 'Avantage net sur la diagonale',
        stdin: '15,15;15,15;1,9|9,2',
        expected: 'MOINDRE_COUT: COUT_TOTAL=45.0'
      },
      {
        label: 'Offres asymétriques',
        stdin: '50,10;20,40;3,6|1,8',
        expected: 'MOINDRE_COUT: COUT_TOTAL=280.0'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
offres = [float(v) for v in parts[0].split(",")]
demandes = [float(v) for v in parts[1].split(",")]

couts = []
for row in parts[2].split("|"):
    couts.append([float(v) for v in row.strip().split(",")])

m = len(offres)
n = len(demandes)

cout_total = 0.0
EPS = 1e-7

while True:
    # Trouver la case active (offres[i] > 0 et demandes[j] > 0) de coût min
    min_c = float("inf")
    best_i, best_j = None, None
    for i in range(m):
        if offres[i] > EPS:
            for j in range(n):
                if demandes[j] > EPS:
                    if couts[i][j] < min_c:
                        min_c = couts[i][j]
                        best_i, best_j = i, j
                        
    if best_i is None:
        break
        
    q = min(offres[best_i], demandes[best_j])
    cout_total += q * min_c
    offres[best_i] -= q
    demandes[best_j] -= q

print(f"MOINDRE_COUT: COUT_TOTAL={cout_total:.1f}")
`
  },
  {
    id: 'ro2-c5-e3',
    chapter: 5,
    title: 'Algorithme Hongrois (Affectation minimale)',
    level: 'n3',
    language: 'python',
    goal: 'Appliquer les étapes de réduction de matrice pour résoudre un problème d’affectation.',
    brief:
      '<p>Le problème d’affectation consiste à attribuer $n$ personnes à $n$ tâches de façon bijective en minimisant la somme des coûts. ' +
      'L’<strong>algorithme de Kuhn-Munkres (Hongrois)</strong> débute par :</p>' +
      '<ol>' +
      '  <li><strong>Réduction par ligne</strong> : soustraire le minimum de chaque ligne à tous ses éléments ;</li>' +
      '  <li><strong>Réduction par colonne</strong> : soustraire le minimum de chaque colonne à tous ses éléments.</li>' +
      '</ol>' +
      '<p>Lit sur l’entrée standard une matrice $3 \\times 3$ au format <code>c11,c12,c13|c21,c22,c23|c31,c32,c33</code>.<br>' +
      'Effectue la réduction complète (lignes puis colonnes).<br>' +
      'Pour toutes les permutations possibles de 3 affectations bijectives, trouve celle qui minimise la somme des coûts d’origine.<br>' +
      'Affiche : <code>COUT_MIN=&lt;valeur entière&gt; AFFECTATION=&lt;j1&gt;,&lt;j2&gt;,&lt;j3&gt;</code><br>' +
      'où $j_k$ est la tâche (1-indexée) affectée à la personne $k$.</p>',
    starter: `ligne = input().strip()

# À compléter : effectuer la réduction hongroise et trouver l'affectation optimale 3x3
`,
    hints: [
      'Pour une matrice 3x3, il y a exactement 3! = 6 permutations d\'affectation.',
      'Évalue les 6 sommes des coûts d\'origine pour trouver la bijection optimale.'
    ],
    examples: [
      {
      stdin: '10,15,20|12,8,14|9,13,11',
      expected: 'COUT_MIN=29 AFFECTATION=1,2,3',
      note: 'Affectation : P1->T1 (10), P2->T2 (8), P3->T3 (11). Coût total = 10 + 8 + 11 = 29.'
      }
    ],
    tests: [
      {
        label: 'Matrice 3x3 diagonale optimale',
        stdin: '4,8,9|6,3,7|8,5,2',
        expected: 'COUT_MIN=9 AFFECTATION=1,2,3'
      },
      {
        label: 'Matrice 3x3 avec permutation croisée',
        stdin: '15,10,9|9,15,10|10,12,8',
        expected: 'COUT_MIN=27 AFFECTATION=2,1,3'
      },
      {
        label: 'Coûts identiques sur plusieurs cases',
        stdin: '5,5,5|5,5,5|5,5,5',
        expected: 'COUT_MIN=15 AFFECTATION=1,2,3'
      },
      {
        label: 'Affectation optimale anti-diagonale',
        stdin: '20,15,5|12,6,14|4,18,16',
        expected: 'COUT_MIN=15 AFFECTATION=3,2,1'
      }
    ],
    solution: `import sys, itertools

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

rows = ligne.split("|")
C = []
for r in rows:
    C.append([int(v) for v in r.strip().split(",")])

n = len(C)

# 1. Évaluer toutes les permutations pour trouver le min exact
min_cout = float("inf")
best_perm = None

for perm in itertools.permutations(range(n)):
    cout = sum(C[i][perm[i]] for i in range(n))
    if cout < min_cout:
        min_cout = cout
        best_perm = perm

aff = ",".join(str(idx + 1) for idx in best_perm)
print(f"COUT_MIN={min_cout} AFFECTATION={aff}")
`
  }
];
