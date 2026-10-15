/**
 * Exercices du chapitre 2 — Formes Mathématiques & Résolution Graphique.
 */
'use strict';

module.exports = [
  {
    id: 'ro2-c2-e1',
    chapter: 2,
    title: 'Conversion en forme standard (Écart & Excès)',
    level: 'n1',
    language: 'python',
    goal: 'Transformer une inégalité de contrainte en équation standard par ajout de variable d’écart ou d’excès.',
    brief:
      '<p>Pour préparer un programme linéaire à l’algorithme du simplexe, chaque contrainte d’inégalité doit être transformée en égalité avec second membre positif :</p>' +
      '<ul>' +
      '  <li>Une contrainte $\\le$ reçoit une variable d’écart positive : $a_1 x_1 + a_2 x_2 + s_k = b$ ;</li>' +
      '  <li>Une contrainte $\\ge$ reçoit une variable d’excès soustraite : $a_1 x_1 + a_2 x_2 - e_k = b$.</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard une ligne au format <code>NUM_CONTRAINTE;a1,a2;SENS;b</code> où :<br>' +
      '- <code>NUM_CONTRAINTE</code> est l’indice de la variable (ex. <code>1</code>, <code>2</code>) ;<br>' +
      '- <code>a1,a2</code> sont les coefficients de $x_1$ et $x_2$ ;<br>' +
      '- <code>SENS</code> vaut <code>LE</code> (pour $\\le$) ou <code>GE</code> (pour $\\ge$) ;<br>' +
      '- <code>b</code> est le second membre.</p>' +
      '<p>Affiche l’équation résultante sous la forme canonique :<br>' +
      'Pour <code>LE</code> : <code>&lt;a1&gt;*x1 + &lt;a2&gt;*x2 + s&lt;num&gt; = &lt;b&gt;</code>.<br>' +
      'Pour <code>GE</code> : <code>&lt;a1&gt;*x1 + &lt;a2&gt;*x2 - e&lt;num&gt; = &lt;b&gt;</code>.<br>' +
      '(Les nombres entiers ou flottants conservent leur écriture naturelle).</p>',
    starter: `ligne = input().strip()

# À compléter : analyser la contrainte et générer l'équation standard correspondante
`,
    hints: [
      'Découpe la ligne par ";".',
      'Selon que SENS == "LE" ou "GE", choisis "+ s{num}" ou "- e{num}".'
    ],
    examples: [
      {
      stdin: '1;3,4;LE;24',
      expected: '3*x1 + 4*x2 + s1 = 24',
      note: 'Contrainte <= transformée avec la variable d’écart s1.'
      }
    ],
    tests: [
      {
        label: 'Contrainte <= standard',
        stdin: '2;2,5;LE;30',
        expected: '2*x1 + 5*x2 + s2 = 30'
      },
      {
        label: 'Contrainte >= avec variable d excès',
        stdin: '1;1,3;GE;15',
        expected: '1*x1 + 3*x2 - e1 = 15'
      },
      {
        label: 'Coefficients décimaux',
        stdin: '3;0.5,1.5;LE;12',
        expected: '0.5*x1 + 1.5*x2 + s3 = 12'
      },
      {
        label: 'Excès avec numérotation 4',
        stdin: '4;4,2;GE;20',
        expected: '4*x1 + 2*x2 - e4 = 20'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
num = parts[0].strip()
a1, a2 = parts[1].strip().split(",")
sens = parts[2].strip().upper()
b = parts[3].strip()

if sens == "LE":
    print(f"{a1}*x1 + {a2}*x2 + s{num} = {b}")
elif sens == "GE":
    print(f"{a1}*x1 + {a2}*x2 - e{num} = {b}")
`
  },
  {
    id: 'ro2-c2-e2',
    chapter: 2,
    title: 'Intersection de deux droites par la règle de Cramer',
    level: 'n2',
    language: 'python',
    goal: 'Calculer le point d’intersection de deux droites de frontière dans le plan.',
    brief:
      '<p>Deux droites de contrainte du plan $(x_1, x_2)$ sont données sous forme d’équations :<br>' +
      '$$a_1 x_1 + b_1 x_2 = c_1 \\quad \\text{et} \\quad a_2 x_1 + b_2 x_2 = c_2$$</p>' +
      '<p>Lit sur l’entrée standard une ligne au format <code>a1,b1,c1;a2,b2,c2</code>.<br>' +
      'Calcule le déterminant du système $\\Delta = a_1 b_2 - a_2 b_1$.<br>' +
      'Si $|\\Delta| < 10^{-6}$, les droites sont parallèles ou confondues, affiche :<br>' +
      '<code>PARALLELES DELTA=0.0</code>.<br>' +
      'Sinon, applique la règle de Cramer :<br>' +
      '$$x_1 = \\frac{c_1 b_2 - c_2 b_1}{\\Delta}, \\quad x_2 = \\frac{a_1 c_2 - a_2 c_1}{\\Delta}$$<br>' +
      'Affiche : <code>INTERSECTION x1=&lt;x1 à 2 décimales&gt; x2=&lt;x2 à 2 décimales&gt; DELTA=&lt;Delta à 2 décimales&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : calculer le déterminant Delta et les coordonnées du point d'intersection
`,
    hints: [
      'Calcule delta = a1 * b2 - a2 * b1.',
      'Si abs(delta) < 1e-6, affiche le cas des droites parallèles.'
    ],
    examples: [
      {
      stdin: '2,1,10;1,2,8',
      expected: 'INTERSECTION x1=4.00 x2=2.00 DELTA=3.00',
      note: 'Delta = 2*2 - 1*1 = 3. x1 = (10*2 - 8*1)/3 = 4. x2 = (2*8 - 1*10)/3 = 2.'
      }
    ],
    tests: [
      {
        label: 'Intersection nette à coordonnées entières',
        stdin: '3,1,15;1,2,10',
        expected: 'INTERSECTION x1=4.00 x2=3.00 DELTA=5.00'
      },
      {
        label: 'Droites parallèles (pentes identiques)',
        stdin: '2,4,12;1,2,9',
        expected: 'PARALLELES DELTA=0.0'
      },
      {
        label: 'Intersection avec coordonnées décimales',
        stdin: '2,3,13;4,1,11',
        expected: 'INTERSECTION x1=2.00 x2=3.00 DELTA=-10.00'
      },
      {
        label: 'Intersection sur un axe',
        stdin: '1,1,6;2,1,12',
        expected: 'INTERSECTION x1=6.00 x2=0.00 DELTA=-1.00'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
a1, b1, c1 = [float(v) for v in parts[0].split(",")]
a2, b2, c2 = [float(v) for v in parts[1].split(",")]

delta = a1 * b2 - a2 * b1

if abs(delta) < 1e-6:
    print("PARALLELES DELTA=0.0")
else:
    x1 = (c1 * b2 - c2 * b1) / delta
    x2 = (a1 * c2 - a2 * c1) / delta
    if abs(x1) < 1e-9:
        x1 = 0.0
    if abs(x2) < 1e-9:
        x2 = 0.0
    if abs(delta) < 1e-9:
        delta = 0.0
    print(f"INTERSECTION x1={x1:.2f} x2={x2:.2f} DELTA={delta:.2f}")
`
  },
  {
    id: 'ro2-c2-e3',
    chapter: 2,
    title: 'Résolution graphique par évaluation des sommets',
    level: 'n3',
    language: 'python',
    goal: 'Identifier le sommet optimal maximisant la fonction objectif dans la région réalisable.',
    brief:
      '<p>D’après le théorème fondamental de la programmation linéaire, si un programme linéaire admet une solution optimale ' +
      'finie, au moins un des <strong>sommets du polyèdre réalisable</strong> est optimal.</p>' +
      '<p>Lit sur l’entrée standard une ligne au format :<br>' +
      '<code>c1,c2;a11,a12,b1|a21,a22,b2;x1,x2|x1,x2|...</code> contenant :</p>' +
      '<ul>' +
      '  <li>Les coefficients de la fonction objectif MAX $Z = c_1 x_1 + c_2 x_2$ ;</li>' +
      '  <li>Les contraintes $a_{i1} x_1 + a_{i2} x_2 \\le b_i$ séparées par <code>|</code> ;</li>' +
      '  <li>Une liste de sommets candidats $(x_1, x_2)$ séparés par <code>|</code>.</li>' +
      '</ul>' +
      '<p>Filtre les sommets réalisables (vérifiant $x_1 \\ge 0$, $x_2 \\ge 0$ et toutes les contraintes $\\le$).<br>' +
      'Sélectionne le sommet réalisable qui maximise $Z$ et affiche :<br>' +
      '<code>OPTIMUM: (x1=&lt;x1&gt;, x2=&lt;x2&gt;) Z=&lt;Z max à 1 décimale&gt;</code>.<br>' +
      'Si aucun sommet n’est réalisable, affiche : <code>REGION_VIDE</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : filtrer les sommets réalisables, calculer Z et trouver le maximum
`,
    hints: [
      'Parse les contraintes dans une liste de tuples (a1, a2, b).',
      'Pour chaque sommet, vérifie qu\'il satisfait chaque contrainte (avec marge EPS) et compare Z.'
    ],
    examples: [
      {
      stdin: '3,5;2,1,16|1,2,11;0,0|8,0|0,5.5|7,2|9,1',
      expected: 'OPTIMUM: (x1=7.0, x2=2.0) Z=31.0',
      note: 'Sommets réalisables : (0,0)->Z=0, (8,0)->Z=24, (0,5.5)->Z=27.5, (7,2)->Z=31.0. Le point (9,1) viole la contrainte 1 (2*9+1=19 > 16).'
      }
    ],
    tests: [
      {
        label: 'Quatre sommets avec optimum intérieur',
        stdin: '4,3;1,1,8|2,1,12;0,0|6,0|0,8|4,4',
        expected: 'OPTIMUM: (x1=4.0, x2=4.0) Z=28.0'
      },
      {
        label: 'Optimum situé sur un axe',
        stdin: '10,2;1,1,5|3,1,9;0,0|3,0|0,5|2,3',
        expected: 'OPTIMUM: (x1=3.0, x2=0.0) Z=30.0'
      },
      {
        label: 'Tous les sommets proposés sont hors de la région réalisable',
        stdin: '5,5;1,1,4|2,1,6;10,10|5,5|0,8',
        expected: 'REGION_VIDE'
      },
      {
        label: 'Problème avec objectif plat (égalité de valeur)',
        stdin: '2,2;1,1,10;0,0|10,0|0,10|5,5',
        expected: 'OPTIMUM: (x1=10.0, x2=0.0) Z=20.0'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
c1, c2 = [float(v) for v in parts[0].split(",")]

# Contraintes
contraintes = []
for c_str in parts[1].split("|"):
    c_str = c_str.strip()
    if c_str:
        a1, a2, b = [float(v) for v in c_str.split(",")]
        contraintes.append((a1, a2, b))

# Sommets
sommets_str = parts[2].split("|")

EPS = 1e-7
meilleur_pt = None
max_z = -float("inf")

for s_str in sommets_str:
    s_str = s_str.strip()
    if not s_str:
        continue
    x1, x2 = [float(v) for v in s_str.split(",")]
    if x1 < -EPS or x2 < -EPS:
        continue
    
    # Tester toutes les contraintes
    realisable = True
    for a1, a2, b in contraintes:
        if (a1 * x1 + a2 * x2) > b + EPS:
            realisable = False
            break
            
    if realisable:
        z = c1 * x1 + c2 * x2
        if z > max_z:
            max_z = z
            meilleur_pt = (x1, x2)

if meilleur_pt is None:
    print("REGION_VIDE")
else:
    print(f"OPTIMUM: (x1={meilleur_pt[0]:.1f}, x2={meilleur_pt[1]:.1f}) Z={max_z:.1f}")
`
  }
];
