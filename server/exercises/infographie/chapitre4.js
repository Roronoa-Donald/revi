/**
 * Exercices du chapitre 4 — Infographie B2.
 * Modélisation 3D, Maillages &amp; Transformations.
 */
'use strict';

module.exports = [
  {
    id: 'ig2-c4-e1',
    chapter: 4,
    title: 'Calculateur de normale d’un triangle 3D (Produit vectoriel)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le vecteur normal unitaire perpendiculaire à une face polygonale 3D pour le calcul d’ombrage.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>A=(x1,y1,z1) B=(x2,y2,z2) C=(x3,y3,z3)</code> (un triangle par ligne).<br>\nFormules géométriques :<br>\n1. Vecteur <code>u = B - A = (x2-x1, y2-y1, z2-z1)</code>.<br>\n2. Vecteur <code>v = C - A = (x3-x1, y3-y1, z3-z1)</code>.<br>\n3. Produit vectoriel <code>n = u x v</code> :<br>\n   <code>nx = uy * vz - uz * vy</code><br>\n   <code>ny = uz * vx - ux * vz</code><br>\n   <code>nz = ux * vy - uy * vx</code><br>\n4. Normalisation unitaire : <code>norme = sqrt(nx^2 + ny^2 + nz^2)</code>.<br>\n   <code>(Nx, Ny, Nz) = (nx/norme, ny/norme, nz/norme)</code>.<br>\nAfficher :<br>\n<code>TRIANGLE: -&gt; NORMALE: (&lt;Nx:.3f&gt;, &lt;Ny:.3f&gt;, &lt;Nz:.3f&gt;)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la normale unitaire par produit vectoriel
`,
    hints: [
      'L’ordre des sommets (sens trigonométrique CCW) détermine l’orientation de la normale.',
      'Arrondir à 3 décimales.'
    ],
    examples: [
      {
        stdin: 'A=(0,0,0) B=(1,0,0) C=(0,1,0)\nA=(0,0,0) B=(0,0,1) C=(0,1,0)',
        expected: 'TRIANGLE: -> NORMALE: (0.000, 0.000, 1.000)\nTRIANGLE: -> NORMALE: (-1.000, 0.000, 0.000)',
        note: 'Le triangle dans le plan XY pointe selon l’axe Z positif.'
      }
    ],
    tests: [
      {
        label: 'Triangle incliné dans l’espace',
        stdin: 'A=(1,1,1) B=(2,1,1) C=(1,2,2)',
        expected: 'TRIANGLE: -> NORMALE: (0.000, -0.707, 0.707)'
      },
      {
        label: 'Triangle vertical plan YZ',
        stdin: 'A=(0,0,0) B=(0,1,0) C=(0,0,1)',
        expected: 'TRIANGLE: -> NORMALE: (1.000, 0.000, 0.000)'
      },
      {
        label: 'Triangle oblique 3D quelconque',
        stdin: 'A=(0,0,0) B=(2,0,1) C=(1,2,0)',
        expected: 'TRIANGLE: -> NORMALE: (-0.436, 0.218, 0.873)'
      }
    ],
    solution: `import sys
import math
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def parse_pt3(txt):
    m = re.search(r'\\(([^,]+),([^,]+),([^)]+)\\)', txt)
    if m:
        return float(m.group(1)), float(m.group(2)), float(m.group(3))
    return 0.0, 0.0, 0.0

for l in lignes:
    parties = l.split()
    props = {}
    for p in parties:
        if '=' in p:
            k, v = p.split('=', 1)
            props[k.upper()] = v

    A = parse_pt3(props.get('A', '(0,0,0)'))
    B = parse_pt3(props.get('B', '(0,0,0)'))
    C = parse_pt3(props.get('C', '(0,0,0)'))

    ux = B[0] - A[0]
    uy = B[1] - A[1]
    uz = B[2] - A[2]

    vx = C[0] - A[0]
    vy = C[1] - A[1]
    vz = C[2] - A[2]

    nx = uy * vz - uz * vy
    ny = uz * vx - ux * vz
    nz = ux * vy - uy * vx

    norme = math.sqrt(nx * nx + ny * ny + nz * nz)
    if norme > 1e-9:
        nx /= norme
        ny /= norme
        nz /= norme

    print(f"TRIANGLE: -> NORMALE: ({nx:.3f}, {ny:.3f}, {nz:.3f})")
`
  },
  {
    id: 'ig2-c4-e2',
    chapter: 4,
    title: 'Applicateur de transformations affines 3D (Scale puis Translation)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la position finale d’un sommet 3D après mise à l’échelle (Scale) puis déplacement (Translation).',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>P=(x,y,z) S=(sx,sy,sz) T=(tx,ty,tz)</code> (une par ligne).<br>\nRègles matricielles (Scale puis Translation) :<br>\n- <code>x\' = x * sx + tx</code><br>\n- <code>y\' = y * sy + ty</code><br>\n- <code>z\' = z * sz + tz</code><br>\nAfficher :<br>\n<code>TRANSFORMATION: P=(&lt;x:.2f&gt;, &lt;y:.2f&gt;, &lt;z:.2f&gt;) -&gt; P\'=(&lt;x\':.2f&gt;, &lt;y\':.2f&gt;, &lt;z\':.2f&gt;)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : appliquer l'échelle puis la translation sur le point 3D
`,
    hints: [
      'Multiplier chaque composante par son facteur d’échelle avant d’ajouter le décalage de translation.',
      'Arrondir à 2 décimales.'
    ],
    examples: [
      {
        stdin: 'P=(1,2,3) S=(2,2,2) T=(10,0,-5)\nP=(0,0,0) S=(1,1,1) T=(5,5,5)\nP=(4,-2,8) S=(0.5,3,-1) T=(0,10,2)',
        expected: 'TRANSFORMATION: P=(1.00, 2.00, 3.00) -> P\'=(12.00, 4.00, 1.00)\nTRANSFORMATION: P=(0.00, 0.00, 0.00) -> P\'=(5.00, 5.00, 5.00)\nTRANSFORMATION: P=(4.00, -2.00, 8.00) -> P\'=(2.00, 4.00, -6.00)',
        note: 'Application séquentielle rigoureuse de la mise à l’échelle et de la translation.'
      }
    ],
    tests: [
      {
        label: 'Agrandissement x10 sans déplacement',
        stdin: 'P=(2.5,1.0,-3.2) S=(10,10,10) T=(0,0,0)',
        expected: 'TRANSFORMATION: P=(2.50, 1.00, -3.20) -> P\'=(25.00, 10.00, -32.00)'
      },
      {
        label: 'Échelle nulle ramenant à la translation',
        stdin: 'P=(100,200,300) S=(0,0,0) T=(12,34,56)',
        expected: 'TRANSFORMATION: P=(100.00, 200.00, 300.00) -> P\'=(12.00, 34.00, 56.00)'
      },
      {
        label: 'Facteurs négatifs (inversion d’axe)',
        stdin: 'P=(5,10,15) S=(-1,1,-1) T=(0,0,0)',
        expected: 'TRANSFORMATION: P=(5.00, 10.00, 15.00) -> P\'=(-5.00, 10.00, -15.00)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def parse_pt3(txt):
    m = re.search(r'\\(([^,]+),([^,]+),([^)]+)\\)', txt)
    if m:
        return float(m.group(1)), float(m.group(2)), float(m.group(3))
    return 0.0, 0.0, 0.0

for l in lignes:
    parties = l.split()
    props = {}
    for p in parties:
        if '=' in p:
            k, v = p.split('=', 1)
            props[k.upper()] = v

    P = parse_pt3(props.get('P', '(0,0,0)'))
    S = parse_pt3(props.get('S', '(1,1,1)'))
    T = parse_pt3(props.get('T', '(0,0,0)'))

    nx = P[0] * S[0] + T[0]
    ny = P[1] * S[1] + T[1]
    nz = P[2] * S[2] + T[2]

    print(f"TRANSFORMATION: P=({P[0]:.2f}, {P[1]:.2f}, {P[2]:.2f}) -> P'=({nx:.2f}, {ny:.2f}, {nz:.2f})")
`
  },
  {
    id: 'ig2-c4-e3',
    chapter: 4,
    title: 'Audit de niveau de détail géométrique (LOD) selon la distance',
    level: 'n3',
    language: 'python',
    goal: 'Auditer la charge polygonale d’un objet 3D en temps réel selon sa distance à la caméra et détecter les surcharges de rendu.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>OBJET=&lt;Nom&gt; POLYGONES=&lt;N&gt; DISTANCE=&lt;D&gt;</code> (la distance D est en mètres).<br>\nGrille de tolérance des paliers LOD (Level of Detail) :<br>\n- <code>D &lt; 5.0m</code> : Palier <code>LOD 0 (Gros plan)</code> -&gt; Seuil maximal <code>50000</code> polygones.<br>\n- <code>5.0m &lt;= D &lt; 20.0m</code> : Palier <code>LOD 1 (Plan moyen)</code> -&gt; Seuil maximal <code>15000</code> polygones.<br>\n- <code>20.0m &lt;= D &lt; 50.0m</code> : Palier <code>LOD 2 (Plan lointain)</code> -&gt; Seuil maximal <code>3000</code> polygones.<br>\n- <code>D &gt;= 50.0m</code> : Palier <code>LOD 3 (Arriere-plan)</code> -&gt; Seuil maximal <code>500</code> polygones.<br>\nPour chaque objet :<br>\n- Si <code>N &lt;= Seuil</code> : afficher <code>&lt;Nom&gt; [D=&lt;D&gt;m, &lt;N&gt; poly] -&gt; &lt;Palier&gt;: OPTIMAL</code><br>\n- Si <code>N &gt; Seuil</code> : calculer le surplus <code>surplus = N - Seuil</code> et afficher :<br>\n  <code>&lt;Nom&gt; [D=&lt;D&gt;m, &lt;N&gt; poly] -&gt; &lt;Palier&gt;: SURCHARGE (Depassement de &lt;surplus&gt; polygones)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier le palier LOD et auditer la densité polygonale
`,
    hints: [
      'Tester les 4 paliers de distance : <5, <20, <50, >=50 mètres.',
      'Calculer l’écart exact en cas de dépassement.'
    ],
    examples: [
      {
        stdin: 'OBJET=Personnage POLYGONES=35000 DISTANCE=3.2\nOBJET=ArbreLointain POLYGONES=8000 DISTANCE=25.0\nOBJET=MaisonArrierePlan POLYGONES=400 DISTANCE=60.0',
        expected: 'Personnage [D=3.2m, 35000 poly] -> LOD 0 (Gros plan): OPTIMAL\nArbreLointain [D=25.0m, 8000 poly] -> LOD 2 (Plan lointain): SURCHARGE (Depassement de 5000 polygones)\nMaisonArrierePlan [D=60.0m, 400 poly] -> LOD 3 (Arriere-plan): OPTIMAL',
        note: 'L’arbre à 25m avec 8000 polygones surcharge inutilement le GPU alors que 3000 suffisent.'
      }
    ],
    tests: [
      {
        label: 'Frontières de distance exactes',
        stdin: 'OBJET=ObjetA POLYGONES=15000 DISTANCE=5.0\nOBJET=ObjetB POLYGONES=3000 DISTANCE=20.0\nOBJET=ObjetC POLYGONES=500 DISTANCE=50.0',
        expected: 'ObjetA [D=5.0m, 15000 poly] -> LOD 1 (Plan moyen): OPTIMAL\nObjetB [D=20.0m, 3000 poly] -> LOD 2 (Plan lointain): OPTIMAL\nObjetC [D=50.0m, 500 poly] -> LOD 3 (Arriere-plan): OPTIMAL'
      },
      {
        label: 'Gros dépassement en arrière-plan',
        stdin: 'OBJET=StatueFond POLYGONES=20000 DISTANCE=100.0',
        expected: 'StatueFond [D=100.0m, 20000 poly] -> LOD 3 (Arriere-plan): SURCHARGE (Depassement de 19500 polygones)'
      },
      {
        label: 'Modèle optimal en gros plan',
        stdin: 'OBJET=HeroPrincipal POLYGONES=48000 DISTANCE=1.5',
        expected: 'HeroPrincipal [D=1.5m, 48000 poly] -> LOD 0 (Gros plan): OPTIMAL'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    parties = l.split()
    props = {}
    for p in parties:
        if '=' in p:
            k, v = p.split('=', 1)
            props[k.upper()] = v

    nom = props.get('OBJET', 'SansNom')
    n = int(props.get('POLYGONES', '0'))
    d = float(props.get('DISTANCE', '0'))

    if d < 5.0:
        palier = "LOD 0 (Gros plan)"
        seuil = 50000
    elif d < 20.0:
        palier = "LOD 1 (Plan moyen)"
        seuil = 15000
    elif d < 50.0:
        palier = "LOD 2 (Plan lointain)"
        seuil = 3000
    else:
        palier = "LOD 3 (Arriere-plan)"
        seuil = 500

    if n <= seuil:
        status = "OPTIMAL"
    else:
        surplus = n - seuil
        status = f"SURCHARGE (Depassement de {surplus} polygones)"

    print(f"{nom} [D={d}m, {n} poly] -> {palier}: {status}")
`
  }
];
