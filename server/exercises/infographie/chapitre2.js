/**
 * Exercices du chapitre 2 — Infographie B2.
 * Traitement d’Image, Calques &amp; Tracés Vectoriels.
 */
'use strict';

module.exports = [
  {
    id: 'ig2-c2-e1',
    chapter: 2,
    title: 'Simulateur de modes de fusion de calques (Multiply, Screen, Overlay)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la valeur de pixel résultante de trois modes de fusion fondamentaux de Photoshop / GIMP.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format <code>MODE=&lt;MULTIPLY|SCREEN|OVERLAY&gt; BASE=&lt;A&gt; CALQUE=&lt;B&gt;</code>.<br>\nLes valeurs A (calque inférieur) et B (calque supérieur) sont des entiers entre 0 et 255.<br>\nFormules mathématiques de fusion :<br>\n- <code>MULTIPLY (Produit - assombrit)</code> :<br>\n  <code>R = (A * B) / 255.0</code><br>\n- <code>SCREEN (Superposition - éclaircit)</code> :<br>\n  <code>R = 255.0 - ((255.0 - A) * (255.0 - B)) / 255.0</code><br>\n- <code>OVERLAY (Incrustation - contraste)</code> :<br>\n  * Si <code>A &lt; 128</code> : <code>R = (2.0 * A * B) / 255.0</code><br>\n  * Sinon : <code>R = 255.0 - (2.0 * (255.0 - A) * (255.0 - B)) / 255.0</code><br>\nAfficher la valeur arrondie à l\'entier le plus proche :<br>\n<code>FUSION: &lt;MODE&gt; (A=&lt;A&gt;, B=&lt;B&gt;) -&gt; VALEUR: &lt;round(R)&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler les modes de fusion Multiply, Screen et Overlay
`,
    hints: [
      'Normaliser ou appliquer directement les formules sur l’intervalle [0, 255].',
      'Arrondir avec int(round(R)).'
    ],
    examples: [
      {
        stdin: 'MODE=MULTIPLY BASE=200 CALQUE=150\nMODE=SCREEN BASE=200 CALQUE=150\nMODE=OVERLAY BASE=100 CALQUE=200\nMODE=OVERLAY BASE=180 CALQUE=200',
        expected: 'FUSION: MULTIPLY (A=200, B=150) -> VALEUR: 118\nFUSION: SCREEN (A=200, B=150) -> VALEUR: 232\nFUSION: OVERLAY (A=100, B=200) -> VALEUR: 157\nFUSION: OVERLAY (A=180, B=200) -> VALEUR: 223',
        note: 'Multiply assombrit toujours, Screen éclaircit toujours, Overlay accentue le contraste.'
      }
    ],
    tests: [
      {
        label: 'Cas extrêmes blanc pur et noir pur',
        stdin: 'MODE=MULTIPLY BASE=255 CALQUE=128\nMODE=MULTIPLY BASE=0 CALQUE=200\nMODE=SCREEN BASE=0 CALQUE=128\nMODE=SCREEN BASE=255 CALQUE=200',
        expected: 'FUSION: MULTIPLY (A=255, B=128) -> VALEUR: 128\nFUSION: MULTIPLY (A=0, B=200) -> VALEUR: 0\nFUSION: SCREEN (A=0, B=128) -> VALEUR: 128\nFUSION: SCREEN (A=255, B=200) -> VALEUR: 255'
      },
      {
        label: 'Incrustation sur gris moyen 128',
        stdin: 'MODE=OVERLAY BASE=128 CALQUE=128\nMODE=OVERLAY BASE=50 CALQUE=50',
        expected: 'FUSION: OVERLAY (A=128, B=128) -> VALEUR: 128\nFUSION: OVERLAY (A=50, B=50) -> VALEUR: 20'
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

    mode = props.get('MODE', 'MULTIPLY').upper()
    A = float(props.get('BASE', '0'))
    B = float(props.get('CALQUE', '0'))

    if mode == 'MULTIPLY':
        res = (A * B) / 255.0
    elif mode == 'SCREEN':
        res = 255.0 - ((255.0 - A) * (255.0 - B)) / 255.0
    elif mode == 'OVERLAY':
        if A < 128.0:
            res = (2.0 * A * B) / 255.0
        else:
            res = 255.0 - (2.0 * (255.0 - A) * (255.0 - B)) / 255.0
    else:
        res = 0.0

    val = int(round(res))
    print(f"FUSION: {mode} (A={int(A)}, B={int(B)}) -> VALEUR: {val}")
`
  },
  {
    id: 'ig2-c2-e2',
    chapter: 2,
    title: 'Évaluateur de courbe de Bézier cubique 2D',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la position exacte d’un point le long d’une courbe vectorielle de Bézier cubique définie par quatre points de contrôle.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>P0=(x0,y0) P1=(x1,y1) P2=(x2,y2) P3=(x3,y3) t=&lt;valeur&gt;</code>.<br>\nFormule des polynômes de Bernstein pour une courbe cubique avec paramètre <code>t</code> dans [0, 1] :<br>\n<code>B(t) = (1-t)^3 * P0 + 3 * (1-t)^2 * t * P1 + 3 * (1-t) * t^2 * P2 + t^3 * P3</code>.<br>\nCalculer les coordonnées <code>X(t)</code> et <code>Y(t)</code> et afficher :<br>\n<code>BEZIER: t=&lt;t:.2f&gt; -&gt; POINT: (&lt;X:.2f&gt;, &lt;Y:.2f&gt;)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le point de la courbe de Bézier cubique
`,
    hints: [
      'Extraire les coordonnées x et y de chaque point P0, P1, P2, P3.',
      'Appliquer les coefficients (1-t)**3, 3*(1-t)**2*t, 3*(1-t)*t**2, et t**3.'
    ],
    examples: [
      {
        stdin: 'P0=(0,0) P1=(0,100) P2=(100,100) P3=(100,0) t=0.5\nP0=(10,20) P1=(30,40) P2=(50,60) P3=(70,80) t=0.0\nP0=(10,20) P1=(30,40) P2=(50,60) P3=(70,80) t=1.0',
        expected: 'BEZIER: t=0.50 -> POINT: (50.00, 75.00)\nBEZIER: t=0.00 -> POINT: (10.00, 20.00)\nBEZIER: t=1.00 -> POINT: (70.00, 80.00)',
        note: 'À t=0 on est en P0, à t=1 on est en P3, et à t=0.5 on évalue la combinaison des tangentes.'
      }
    ],
    tests: [
      {
        label: 'Points de contrôle quart de tour',
        stdin: 'P0=(0,0) P1=(55.2,0) P2=(100,44.8) P3=(100,100) t=0.5',
        expected: 'BEZIER: t=0.50 -> POINT: (70.70, 29.30)'
      },
      {
        label: 'Progression linéaire intermédiaire',
        stdin: 'P0=(0,0) P1=(25,50) P2=(75,50) P3=(100,0) t=0.25',
        expected: 'BEZIER: t=0.25 -> POINT: (22.66, 28.12)'
      },
      {
        label: 'Valeur proche de la fin t=0.75',
        stdin: 'P0=(0,0) P1=(25,50) P2=(75,50) P3=(100,0) t=0.75',
        expected: 'BEZIER: t=0.75 -> POINT: (77.34, 28.12)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def parse_pt(texte):
    m = re.search(r'\\(([^,]+),([^)]+)\\)', texte)
    if m:
        return float(m.group(1)), float(m.group(2))
    return 0.0, 0.0

for l in lignes:
    parties = l.split()
    props = {}
    for p in parties:
        if '=' in p:
            k, v = p.split('=', 1)
            props[k.upper()] = v

    p0 = parse_pt(props.get('P0', '(0,0)'))
    p1 = parse_pt(props.get('P1', '(0,0)'))
    p2 = parse_pt(props.get('P2', '(0,0)'))
    p3 = parse_pt(props.get('P3', '(0,0)'))
    t = float(props.get('T', '0'))

    u = 1.0 - t
    w0 = u ** 3
    w1 = 3.0 * (u ** 2) * t
    w2 = 3.0 * u * (t ** 2)
    w3 = t ** 3

    x = w0 * p0[0] + w1 * p1[0] + w2 * p2[0] + w3 * p3[0]
    y = w0 * p0[1] + w1 * p1[1] + w2 * p2[1] + w3 * p3[1]

    print(f"BEZIER: t={t:.2f} -> POINT: ({x:.2f}, {y:.2f})")
`
  },
  {
    id: 'ig2-c2-e3',
    chapter: 2,
    title: 'Analyseur d’histogramme et correction de tonalité (Levels)',
    level: 'n3',
    language: 'python',
    goal: 'Diagnostiquer la distribution tonale d’une image (sous-exposition, surexposition, contraste équilibré).',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations de répartition de pixels par quintile au format :<br>\n<code>IMAGE=&lt;Nom&gt; NOIRS=&lt;n1&gt; TONS_SOMBRES=&lt;n2&gt; TONS_MOYENS=&lt;n3&gt; TONS_CLAIRS=&lt;n4&gt; BLANCS=&lt;n5&gt;</code>.<br>\nCalculs :<br>\n1. <code>Total = n1 + n2 + n3 + n4 + n5</code>.<br>\n2. Pourcentage dans les noirs bouchés : <code>PctNoirs = (n1 / Total) * 100</code>.<br>\n3. Pourcentage dans les blancs cramés : <code>PctBlancs = (n5 / Total) * 100</code>.<br>\nRègles de diagnostic :<br>\n- Si <code>PctNoirs &gt;= 40.0%</code> :<br>\n  <code>DIAGNOSTIC: SOUS_EXPOSE (Ombres bouchees - remonter le point noir)</code><br>\n- Si <code>PctBlancs &gt;= 40.0%</code> :<br>\n  <code>DIAGNOSTIC: SUR_EXPOSE (Hautes lumieres cramees - descendre le point blanc)</code><br>\n- Sinon :<br>\n  <code>DIAGNOSTIC: EQUILIBRE (Dynamique tonale bien repartie)</code><br>\nAfficher :<br>\n<code>&lt;Nom&gt; [Noirs: &lt;PctNoirs:.1f&gt;% | Blancs: &lt;PctBlancs:.1f&gt;%] -&gt; &lt;DIAGNOSTIC&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser l'histogramme tonal et diagnostiquer l'image
`,
    hints: [
      'Calculer la somme des cinq catégories de pixels pour obtenir le total.',
      'Comparer les pourcentages au seuil de 40.0%.'
    ],
    examples: [
      {
        stdin: 'IMAGE=PhotoNuit NOIRS=500 TONS_SOMBRES=200 TONS_MOYENS=150 TONS_CLAIRS=100 BLANCS=50\nIMAGE=PhotoPlage NOIRS=20 TONS_SOMBRES=80 TONS_MOYENS=200 TONS_CLAIRS=300 BLANCS=400\nIMAGE=PortraitStudio NOIRS=100 TONS_SOMBRES=200 TONS_MOYENS=400 TONS_CLAIRS=200 BLANCS=100',
        expected: 'PhotoNuit [Noirs: 50.0% | Blancs: 5.0%] -> DIAGNOSTIC: SOUS_EXPOSE (Ombres bouchees - remonter le point noir)\nPhotoPlage [Noirs: 2.0% | Blancs: 40.0%] -> DIAGNOSTIC: SUR_EXPOSE (Hautes lumieres cramees - descendre le point blanc)\nPortraitStudio [Noirs: 10.0% | Blancs: 10.0%] -> DIAGNOSTIC: EQUILIBRE (Dynamique tonale bien repartie)',
        note: 'Diagnostic photographique standard basé sur l’étalement des niveaux.'
      }
    ],
    tests: [
      {
        label: 'Image très équilibrée',
        stdin: 'IMAGE=PaysageAutomne NOIRS=150 TONS_SOMBRES=200 TONS_MOYENS=300 TONS_CLAIRS=200 BLANCS=150',
        expected: 'PaysageAutomne [Noirs: 15.0% | Blancs: 15.0%] -> DIAGNOSTIC: EQUILIBRE (Dynamique tonale bien repartie)'
      },
      {
        label: 'Sous-exposition massive 65%',
        stdin: 'IMAGE=Grotte NOIRS=650 TONS_SOMBRES=200 TONS_MOYENS=100 TONS_CLAIRS=30 BLANCS=20',
        expected: 'Grotte [Noirs: 65.0% | Blancs: 2.0%] -> DIAGNOSTIC: SOUS_EXPOSE (Ombres bouchees - remonter le point noir)'
      },
      {
        label: 'Bordure exacte de surexposition 40%',
        stdin: 'IMAGE=SoleilMidi NOIRS=50 TONS_SOMBRES=100 TONS_MOYENS=150 TONS_CLAIRS=300 BLANCS=400',
        expected: 'SoleilMidi [Noirs: 5.0% | Blancs: 40.0%] -> DIAGNOSTIC: SUR_EXPOSE (Hautes lumieres cramees - descendre le point blanc)'
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

    nom = props.get('IMAGE', 'SansNom')
    n1 = float(props.get('NOIRS', '0'))
    n2 = float(props.get('TONS_SOMBRES', '0'))
    n3 = float(props.get('TONS_MOYENS', '0'))
    n4 = float(props.get('TONS_CLAIRS', '0'))
    n5 = float(props.get('BLANCS', '0'))

    total = n1 + n2 + n3 + n4 + n5
    if total == 0:
        continue

    pct_noirs = (n1 / total) * 100.0
    pct_blancs = (n5 / total) * 100.0

    if pct_noirs >= 40.0:
        diag = "DIAGNOSTIC: SOUS_EXPOSE (Ombres bouchees - remonter le point noir)"
    elif pct_blancs >= 40.0:
        diag = "DIAGNOSTIC: SUR_EXPOSE (Hautes lumieres cramees - descendre le point blanc)"
    else:
        diag = "DIAGNOSTIC: EQUILIBRE (Dynamique tonale bien repartie)"

    print(f"{nom} [Noirs: {pct_noirs:.1f}% | Blancs: {pct_blancs:.1f}%] -> {diag}")
`
  }
];
