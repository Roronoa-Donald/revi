/**
 * Exercices du chapitre 1 — Fondements & Modélisation Linéaire.
 */
'use strict';

module.exports = [
  {
    id: 'ro2-c1-e1',
    chapter: 1,
    title: 'Validation de fonction objectif & positivité',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la non-négativité des variables de décision et calculer la fonction objectif.',
    brief:
      '<p>En programmation linéaire, toute variable de décision physique doit être non-négative ($x_j \\ge 0$). ' +
      'Lit sur l’entrée standard une ligne au format <code>SENS;c1,c2;x1,x2</code> où :</p>' +
      '<ul>' +
      '  <li><code>SENS</code> vaut <code>MAX</code> ou <code>MIN</code> ;</li>' +
      '  <li><code>c1,c2</code> sont les coefficients économiques de la fonction objectif $Z = c_1 x_1 + c_2 x_2$ ;</li>' +
      '  <li><code>x1,x2</code> sont les valeurs proposées pour les variables de décision.</li>' +
      '</ul>' +
      '<p>Si l’une des variables est strictement négative ($x_1 < 0$ ou $x_2 < 0$), affiche :<br>' +
      '<code>NON_VALIDE VIOLATION_SIGNE</code>.<br>' +
      'Sinon, calcule $Z$ et affiche :<br>' +
      '<code>VALIDE Z=&lt;valeur arrondie à 1 décimale&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : analyser la ligne, vérifier les variables et calculer Z
`,
    hints: [
      'Découpe la ligne avec split(";") pour isoler le sens, les coefficients et les valeurs de x.',
      'Convertis les coordonnées en float et vérifie x1 >= 0 and x2 >= 0 avant de calculer Z.'
    ],
    examples: [
      {
      stdin: 'MAX;15,20;4,5',
      expected: 'VALIDE Z=160.0',
      note: 'Z = 15*4 + 20*5 = 60 + 100 = 160.0 avec x1=4 >= 0 et x2=5 >= 0.'
      }
    ],
    tests: [
      {
        label: 'Maximisation valide',
        stdin: 'MAX;25,30;2,3',
        expected: 'VALIDE Z=140.0'
      },
      {
        label: 'Minimisation avec zéro',
        stdin: 'MIN;10,8;0,7',
        expected: 'VALIDE Z=56.0'
      },
      {
        label: 'Violation de négativité sur x1',
        stdin: 'MAX;15,20;-2,5',
        expected: 'NON_VALIDE VIOLATION_SIGNE'
      },
      {
        label: 'Violation de négativité sur x2',
        stdin: 'MIN;5,12;10,-1',
        expected: 'NON_VALIDE VIOLATION_SIGNE'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
sens = parts[0].strip()
c1, c2 = [float(v) for v in parts[1].split(",")]
x1, x2 = [float(v) for v in parts[2].split(",")]

if x1 < 0 or x2 < 0:
    print("NON_VALIDE VIOLATION_SIGNE")
else:
    z = c1 * x1 + c2 * x2
    print(f"VALIDE Z={z:.1f}")
`
  },
  {
    id: 'ro2-c1-e2',
    chapter: 1,
    title: 'Faisabilité de contraintes de ressources & écarts',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la faisabilité d’un plan de production et calculer les marges d’inactivité (slacks).',
    brief:
      '<p>Un atelier dispose de deux ressources limitées $R_1$ et $R_2$ définies par des contraintes $\\le$ :<br>' +
      '$$a_{11} x_1 + a_{12} x_2 \\le b_1 \\quad \\text{et} \\quad a_{21} x_1 + a_{22} x_2 \\le b_2$$</p>' +
      '<p>Lit sur l’entrée standard une ligne au format <code>x1,x2;a11,a12,b1;a21,a22,b2</code>.<br>' +
      'Calcule la consommation de chaque ressource et l’écart $s_i = b_i - (a_{i1} x_1 + a_{i2} x_2)$.<br>' +
      'Si $s_1 \\ge 0$ et $s_2 \\ge 0$, le point est réalisable, affiche :<br>' +
      '<code>REALISABLE s1=&lt;s1 à 1 décimale&gt; s2=&lt;s2 à 1 décimale&gt;</code>.<br>' +
      'Sinon, liste la ou les contraintes violées séparées par un espace :<br>' +
      '<code>IRREALISABLE VIOLATION_R1</code> (si seulement $R_1$ est dépassée),<br>' +
      '<code>IRREALISABLE VIOLATION_R2</code> (si seulement $R_2$ est dépassée), ou<br>' +
      '<code>IRREALISABLE VIOLATION_R1 VIOLATION_R2</code> (si les deux sont dépassées).</p>',
    starter: `ligne = input().strip()

# À compléter : calculer les consommations, vérifier les contraintes et afficher le résultat
`,
    hints: [
      'Calcule conso1 = a11 * x1 + a12 * x2 puis s1 = b1 - conso1.',
      'Une contrainte est violée si son écart s est strictement négatif (arrondi à 1e-6 près pour éviter les approximations flottantes).'
    ],
    examples: [
      {
      stdin: '3,2;2,1,10;1,2,8',
      expected: 'REALISABLE s1=2.0 s2=1.0',
      note: 'R1 : 2*3 + 1*2 = 8 <= 10 (s1=2.0). R2 : 1*3 + 2*2 = 7 <= 8 (s2=1.0).'
      }
    ],
    tests: [
      {
        label: 'Plan pleinement réalisable avec marge',
        stdin: '2,2;3,1,12;1,4,14',
        expected: 'REALISABLE s1=4.0 s2=4.0'
      },
      {
        label: 'Saturation exacte sur une contrainte',
        stdin: '4,2;2,1,10;1,2,8',
        expected: 'REALISABLE s1=0.0 s2=0.0'
      },
      {
        label: 'Violation de la ressource R1',
        stdin: '5,2;2,1,10;1,2,12',
        expected: 'IRREALISABLE VIOLATION_R1'
      },
      {
        label: 'Violation simultanée des deux ressources',
        stdin: '6,6;2,1,10;1,2,8',
        expected: 'IRREALISABLE VIOLATION_R1 VIOLATION_R2'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
x1, x2 = [float(v) for v in parts[0].split(",")]
a11, a12, b1 = [float(v) for v in parts[1].split(",")]
a21, a22, b2 = [float(v) for v in parts[2].split(",")]

s1 = b1 - (a11 * x1 + a12 * x2)
s2 = b2 - (a21 * x1 + a22 * x2)

EPS = 1e-7
viol1 = s1 < -EPS
viol2 = s2 < -EPS

if not viol1 and not viol2:
    # Réaliste
    val1 = 0.0 if abs(s1) < EPS else s1
    val2 = 0.0 if abs(s2) < EPS else s2
    print(f"REALISABLE s1={val1:.1f} s2={val2:.1f}")
else:
    errs = []
    if viol1:
        errs.append("VIOLATION_R1")
    if viol2:
        errs.append("VIOLATION_R2")
    print(f"IRREALISABLE {' '.join(errs)}")
`
  },
  {
    id: 'ro2-c1-e3',
    chapter: 1,
    title: 'Arbitrage de mélange de coût minimal (Blending)',
    level: 'n3',
    language: 'python',
    goal: 'Sélectionner le plan de mélange réalisable de coût économique minimal.',
    brief:
      '<p>Un problème de mélange cherche à minimiser le coût d’achat de deux ingrédients $x_1$ et $x_2$ :<br>' +
      '$$MIN \\quad C = c_1 x_1 + c_2 x_2$$' +
      'sous les exigences nutritionnelles minimales :<br>' +
      '$$a_{11} x_1 + a_{12} x_2 \\ge b_1 \\quad \\text{et} \\quad a_{21} x_1 + a_{22} x_2 \\ge b_2$$' +
      'avec $x_1, x_2 \\ge 0$.</p>' +
      '<p>Lit sur l’entrée standard une ligne au format :<br>' +
      '<code>c1,c2;a11,a12,b1;a21,a22,b2;x1A,x2A|x1B,x2B|...</code> contenant plusieurs candidats séparés par <code>|</code>.<br>' +
      'Filtre les candidats qui respectent les deux exigences nutritionnelles.<br>' +
      'Parmi les réalisables, sélectionne celui qui minimise le coût total $C$ et affiche :<br>' +
      '<code>MEILLEUR: x1=&lt;x1&gt; x2=&lt;x2&gt; COUT=&lt;C à 1 décimale&gt;</code>.<br>' +
      'Si aucun candidat n’est réalisable, affiche : <code>AUCUN_REALISABLE</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : tester chaque candidat, filtrer les réalisables et trouver le coût minimal
`,
    hints: [
      'Découpe les candidats avec split("|") puis chaque paire avec split(",").',
      'Vérifie a11*x1 + a12*x2 >= b1 et a21*x1 + a22*x2 >= b2 avec une tolérance epsilon.'
    ],
    examples: [
      {
      stdin: '4,6;0.2,0.5,10;0.4,0.2,12;20,15|25,10|10,20',
      expected: 'MEILLEUR: x1=25.0 x2=10.0 COUT=160.0',
      note: 'Pour (25,10) : 0.2*25+0.5*10=10>=10 et 0.4*25+0.2*10=12>=12. Coût = 4*25 + 6*10 = 160.0 (plus économique que (20,15) à 170.0).'
      }
    ],
    tests: [
      {
        label: 'Trois candidats avec un vainqueur net',
        stdin: '5,8;1,2,20;2,1,15;10,6|8,5|12,4',
        expected: 'MEILLEUR: x1=12.0 x2=4.0 COUT=92.0'
      },
      {
        label: 'Candidats dont certains sont irréalisables',
        stdin: '3,2;2,1,10;1,3,12;2,2|4,3|1,1',
        expected: 'MEILLEUR: x1=4.0 x2=3.0 COUT=18.0'
      },
      {
        label: 'Aucun candidat ne satisfait les deux exigences',
        stdin: '10,15;2,3,50;3,1,40;5,5|10,2|2,8',
        expected: 'AUCUN_REALISABLE'
      },
      {
        label: 'Candidat optimal avec une composante nulle',
        stdin: '6,4;1,1,10;0,2,10;12,0|0,10|2,5',
        expected: 'MEILLEUR: x1=0.0 x2=10.0 COUT=40.0'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
c1, c2 = [float(v) for v in parts[0].split(",")]
a11, a12, b1 = [float(v) for v in parts[1].split(",")]
a21, a22, b2 = [float(v) for v in parts[2].split(",")]
cand_strs = parts[3].split("|")

EPS = 1e-7
meilleur = None
min_cout = float("inf")

for c_str in cand_strs:
    c_str = c_str.strip()
    if not c_str:
        continue
    x1, x2 = [float(v) for v in c_str.split(",")]
    if x1 < -EPS or x2 < -EPS:
        continue
    req1 = a11 * x1 + a12 * x2
    req2 = a21 * x1 + a22 * x2
    if req1 >= b1 - EPS and req2 >= b2 - EPS:
        cout = c1 * x1 + c2 * x2
        if cout < min_cout:
            min_cout = cout
            meilleur = (x1, x2)

if meilleur is None:
    print("AUCUN_REALISABLE")
else:
    print(f"MEILLEUR: x1={meilleur[0]:.1f} x2={meilleur[1]:.1f} COUT={min_cout:.1f}")
`
  }
];
