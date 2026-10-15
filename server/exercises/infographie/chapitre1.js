/**
 * Exercices du chapitre 1 — Infographie B2.
 * Images Numériques, Colorimétrie &amp; Formats.
 */
'use strict';

module.exports = [
  {
    id: 'ig2-c1-e1',
    chapter: 1,
    title: 'Convertisseur RVB vers CMJN (Synthèse additive vs soustractive)',
    level: 'n1',
    language: 'python',
    goal: 'Convertir un triplet colorimétrique RVB écran en quadrichromie CMJN pour l’impression professionnelle.',
    brief: '<p>Le script lit sur l\'entrée standard des triplets entiers <code>R G B</code> compris entre 0 et 255 (un par ligne).<br>\nFormules de conversion standardisées :<br>\n1. Normaliser sur [0, 1] : <code>r = R / 255.0</code>, <code>g = G / 255.0</code>, <code>b = B / 255.0</code>.<br>\n2. Noir (Key) : <code>k = 1.0 - max(r, g, b)</code>.<br>\n3. Si <code>k == 1.0</code> (Noir pur) :<br>\n   <code>C = 0.0%</code>, <code>M = 0.0%</code>, <code>Y = 0.0%</code>, <code>K = 100.0%</code>.<br>\n4. Sinon :<br>\n   <code>C = ((1.0 - r - k) / (1.0 - k)) * 100.0</code><br>\n   <code>M = ((1.0 - g - k) / (1.0 - k)) * 100.0</code><br>\n   <code>Y = ((1.0 - b - k) / (1.0 - k)) * 100.0</code><br>\n   <code>K = k * 100.0</code><br>\nAfficher :<br>\n<code>RVB: (R, G, B) -&gt; CMJN: C=&lt;C:.1f&gt;% M=&lt;M:.1f&gt;% J=&lt;Y:.1f&gt;% N=&lt;K:.1f&gt;%</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : convertir chaque triplet RVB en quadrichromie CMJN
`,
    hints: [
      'Traiter le cas particulier du noir pur R=G=B=0 où k=1.0 pour éviter une division par zéro.',
      'Arrondir chaque pourcentage à une décimale.'
    ],
    examples: [
      {
        stdin: '255 255 255\n0 0 0\n255 0 0\n0 255 0',
        expected: 'RVB: (255, 255, 255) -> CMJN: C=0.0% M=0.0% J=0.0% N=0.0%\nRVB: (0, 0, 0) -> CMJN: C=0.0% M=0.0% J=0.0% N=100.0%\nRVB: (255, 0, 0) -> CMJN: C=0.0% M=100.0% J=100.0% N=0.0%\nRVB: (0, 255, 0) -> CMJN: C=100.0% M=0.0% J=100.0% N=0.0%',
        note: 'Blanc pur (0% d’encre), noir pur (100% noir), rouge pur (magenta + jaune) et vert pur (cyan + jaune).'
      }
    ],
    tests: [
      {
        label: 'Couleur primaire bleue et teintes intermédiaires',
        stdin: '0 0 255\n128 128 128',
        expected: 'RVB: (0, 0, 255) -> CMJN: C=100.0% M=100.0% J=0.0% N=0.0%\nRVB: (128, 128, 128) -> CMJN: C=0.0% M=0.0% J=0.0% N=49.8%'
      },
      {
        label: 'Jaune et Cyan purs',
        stdin: '255 255 0\n0 255 255',
        expected: 'RVB: (255, 255, 0) -> CMJN: C=0.0% M=0.0% J=100.0% N=0.0%\nRVB: (0, 255, 255) -> CMJN: C=100.0% M=0.0% J=0.0% N=0.0%'
      },
      {
        label: 'Couleur de marque Teinte Sarcelle',
        stdin: '15 118 110',
        expected: 'RVB: (15, 118, 110) -> CMJN: C=87.3% M=0.0% J=6.8% N=53.7%'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    parties = l.split()
    if len(parties) != 3:
        continue
    R, G, B = map(int, parties)

    r = R / 255.0
    g = G / 255.0
    b = B / 255.0

    k = 1.0 - max(r, g, b)

    if abs(k - 1.0) < 1e-6:
        c_pct = 0.0
        m_pct = 0.0
        y_pct = 0.0
        k_pct = 100.0
    else:
        c_pct = ((1.0 - r - k) / (1.0 - k)) * 100.0
        m_pct = ((1.0 - g - k) / (1.0 - k)) * 100.0
        y_pct = ((1.0 - b - k) / (1.0 - k)) * 100.0
        k_pct = k * 100.0

    print(f"RVB: ({R}, {G}, {B}) -> CMJN: C={c_pct:.1f}% M={m_pct:.1f}% J={y_pct:.1f}% N={k_pct:.1f}%")
`
  },
  {
    id: 'ig2-c1-e2',
    chapter: 1,
    title: 'Calculateur de résolution d’impression et dimensions physiques (DPI/PPI)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer les dimensions physiques en centimètres d’une image selon sa résolution PPP/DPI et estimer son poids brut non compressé.',
    brief: '<p>Le script lit sur l\'entrée standard des triplets <code>&lt;LargeurPx&gt; &lt;HauteurPx&gt; &lt;DPI&gt;</code> (un par ligne).<br>\nRègles de calcul métrique :<br>\n- 1 pouce = 2.54 cm exactement.<br>\n- Largeur en cm = <code>(LargeurPx / DPI) * 2.54</code>.<br>\n- Hauteur en cm = <code>(HauteurPx / DPI) * 2.54</code>.<br>\n- Poids brut non compressé en 24 bits (3 octets RVB par pixel) :<br>\n  <code>PoidsMo = (LargeurPx * HauteurPx * 3) / (1024 * 1024)</code> (arrondi à 2 décimales).<br>\nAfficher :<br>\n<code>IMAGE: &lt;L&gt;x&lt;H&gt; px @ &lt;DPI&gt; DPI -&gt; DIMENSIONS: &lt;Lcm:.2f&gt; x &lt;Hcm:.2f&gt; cm | POIDS_BRUT: &lt;PoidsMo:.2f&gt; Mo</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les dimensions physiques en cm et le poids en Mo
`,
    hints: [
      'Un DPI de 300 est la norme de l’imprimerie offset haute qualité.',
      'Un DPI de 72 à 96 correspond aux écrans traditionnels.'
    ],
    examples: [
      {
        stdin: '3000 2000 300\n1920 1080 72',
        expected: 'IMAGE: 3000x2000 px @ 300 DPI -> DIMENSIONS: 25.40 x 16.93 cm | POIDS_BRUT: 17.17 Mo\nIMAGE: 1920x1080 px @ 72 DPI -> DIMENSIONS: 67.73 x 38.10 cm | POIDS_BRUT: 5.93 Mo',
        note: 'Une photo 3000x2000 à 300 DPI imprime un format 25x17 cm net sans pixellisation.'
      }
    ],
    tests: [
      {
        label: 'Format A4 haute résolution 300 DPI',
        stdin: '2480 3508 300',
        expected: 'IMAGE: 2480x3508 px @ 300 DPI -> DIMENSIONS: 21.00 x 29.70 cm | POIDS_BRUT: 24.89 Mo'
      },
      {
        label: 'Affiche publicitaire géante 150 DPI',
        stdin: '6000 4000 150',
        expected: 'IMAGE: 6000x4000 px @ 150 DPI -> DIMENSIONS: 101.60 x 67.73 cm | POIDS_BRUT: 68.66 Mo'
      },
      {
        label: 'Miniature web iconographique',
        stdin: '512 512 96',
        expected: 'IMAGE: 512x512 px @ 96 DPI -> DIMENSIONS: 13.55 x 13.55 cm | POIDS_BRUT: 0.75 Mo'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    parties = l.split()
    if len(parties) != 3:
        continue
    w, h, dpi = map(int, parties)

    w_cm = (w / dpi) * 2.54
    h_cm = (h / dpi) * 2.54

    poids_mo = (w * h * 3) / (1024 * 1024)

    print(f"IMAGE: {w}x{h} px @ {dpi} DPI -> DIMENSIONS: {w_cm:.2f} x {h_cm:.2f} cm | POIDS_BRUT: {poids_mo:.2f} Mo")
`
  },
  {
    id: 'ig2-c1-e3',
    chapter: 1,
    title: 'Classificateur de formats d’image selon le cas d’usage',
    level: 'n3',
    language: 'python',
    goal: 'Sélectionner le format d’image optimal (SVG, PNG, JPEG, WebP) selon les contraintes de transparence, nature graphique et poids.',
    brief: '<p>Le script lit sur l\'entrée standard des descriptions d\'assets graphiques au format <code>NATURE=&lt;VECTORIEL|RASTER&gt; TRANSPARENCE=&lt;OUI|NON&gt; COMPLEXITE=&lt;PHOTO|ILLUSTRATION|ICONE&gt;</code>.<br>\nRègles de recommandation industrielle :<br>\n- Si <code>NATURE=VECTORIEL</code> ou <code>COMPLEXITE=ICONE</code> : <code>FORMAT: SVG | JUSTIFICATION: Vectoriel resolution-independante et taille plume pour logos et icones</code>.<br>\n- Sinon (Raster) :<br>\n  * Si <code>TRANSPARENCE=OUI</code> et <code>COMPLEXITE=ILLUSTRATION</code> : <code>FORMAT: PNG | JUSTIFICATION: Compression sans perte avec canal alpha transparent</code>.<br>\n  * Si <code>TRANSPARENCE=NON</code> et <code>COMPLEXITE=PHOTO</code> : <code>FORMAT: JPEG | JUSTIFICATION: Compression avec perte optimale pour degrades photographiques</code>.<br>\n  * Pour tout autre cas web moderne : <code>FORMAT: WebP | JUSTIFICATION: Format polyvalent moderne combinant transparence alpha et haute compression</code>.<br>\nAfficher :<br>\n<code>ASSET: &lt;entree&gt; -&gt; &lt;FORMAT&gt; | &lt;JUSTIFICATION&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : sélectionner le format d'image optimal
`,
    hints: [
      'SVG est le standard universel pour les tracés vectoriels et icônes.',
      'PNG préserve la transparence sans artefacts.',
      'JPEG compresse efficacement les photos riches sans canal alpha.'
    ],
    examples: [
      {
        stdin: 'NATURE=VECTORIEL TRANSPARENCE=OUI COMPLEXITE=ICONE\nNATURE=RASTER TRANSPARENCE=NON COMPLEXITE=PHOTO\nNATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=ILLUSTRATION',
        expected: 'ASSET: NATURE=VECTORIEL TRANSPARENCE=OUI COMPLEXITE=ICONE -> FORMAT: SVG | JUSTIFICATION: Vectoriel resolution-independante et taille plume pour logos et icones\nASSET: NATURE=RASTER TRANSPARENCE=NON COMPLEXITE=PHOTO -> FORMAT: JPEG | JUSTIFICATION: Compression avec perte optimale pour degrades photographiques\nASSET: NATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=ILLUSTRATION -> FORMAT: PNG | JUSTIFICATION: Compression sans perte avec canal alpha transparent',
        note: 'Arbitrage standard des formats graphiques web et multimédia.'
      }
    ],
    tests: [
      {
        label: 'Photo avec transparence (fond détouré)',
        stdin: 'NATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=PHOTO',
        expected: 'ASSET: NATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=PHOTO -> FORMAT: WebP | JUSTIFICATION: Format polyvalent moderne combinant transparence alpha et haute compression'
      },
      {
        label: 'Logo vectoriel simple sans transparence',
        stdin: 'NATURE=VECTORIEL TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION',
        expected: 'ASSET: NATURE=VECTORIEL TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION -> FORMAT: SVG | JUSTIFICATION: Vectoriel resolution-independante et taille plume pour logos et icones'
      },
      {
        label: 'Illustration sans transparence',
        stdin: 'NATURE=RASTER TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION',
        expected: 'ASSET: NATURE=RASTER TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION -> FORMAT: WebP | JUSTIFICATION: Format polyvalent moderne combinant transparence alpha et haute compression'
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
            props[k.upper()] = v.upper()

    nat = props.get('NATURE', 'RASTER')
    tr = props.get('TRANSPARENCE', 'NON')
    cx = props.get('COMPLEXITE', 'PHOTO')

    if nat == 'VECTORIEL' or cx == 'ICONE':
        fmt = "FORMAT: SVG"
        just = "JUSTIFICATION: Vectoriel resolution-independante et taille plume pour logos et icones"
    elif tr == 'OUI' and cx == 'ILLUSTRATION':
        fmt = "FORMAT: PNG"
        just = "JUSTIFICATION: Compression sans perte avec canal alpha transparent"
    elif tr == 'NON' and cx == 'PHOTO':
        fmt = "FORMAT: JPEG"
        just = "JUSTIFICATION: Compression avec perte optimale pour degrades photographiques"
    else:
        fmt = "FORMAT: WebP"
        just = "JUSTIFICATION: Format polyvalent moderne combinant transparence alpha et haute compression"

    print(f"ASSET: {l} -> {fmt} | {just}")
`
  }
];
