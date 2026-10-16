'use strict';

module.exports = [
  {
    "id": "ig2-c1-e1",
    "chapter": 1,
    "title": "Convertisseur RVB vers CMJN (Synthèse additive vs soustractive)",
    "level": "n1",
    "language": "analyse",
    "goal": "Convertir un triplet colorimétrique RVB écran en quadrichromie CMJN pour l’impression professionnelle.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nFormules de conversion standardisées :<br>\n1. Normaliser sur [0, 1] : <code>r = R / 255.0</code>, <code>g = G / 255.0</code>, <code>b = B / 255.0</code>.<br>\n2. Noir (Key) : <code>k = 1.0 - max(r, g, b)</code>.<br>\n3. Si <code>k == 1.0</code> (Noir pur) :<br>\n   <code>C = 0.0%</code>, <code>M = 0.0%</code>, <code>Y = 0.0%</code>, <code>K = 100.0%</code>.<br>\n4. Sinon :<br>\n   <code>C = ((1.0 - r - k) / (1.0 - k)) * 100.0</code><br>\n   <code>M = ((1.0 - g - k) / (1.0 - k)) * 100.0</code><br>\n   <code>Y = ((1.0 - b - k) / (1.0 - k)) * 100.0</code><br>\n   <code>K = k * 100.0</code><br>\nAfficher :<br>\n<code>RVB: (R, G, B) -&gt; CMJN: C=&lt;C:.1f&gt;% M=&lt;M:.1f&gt;% J=&lt;Y:.1f&gt;% N=&lt;K:.1f&gt;%</code></p>",
    "starter": "# Grille d'analyse (ig2-c1-e1) — Convertisseur RVB vers CMJN (Synthèse additive vs soustractive)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Couleur primaire bleue et teintes intermédiaires]\n# Données : 0 0 255\n# Données : 128 128 128\nA_COMPLETER\n\n[Cas 2 — Jaune et Cyan purs]\n# Données : 255 255 0\n# Données : 0 255 255\nA_COMPLETER\n\n[Cas 3 — Couleur de marque Teinte Sarcelle]\n# Données : 15 118 110\nA_COMPLETER\n",
    "hints": [
      "Traiter le cas particulier du noir pur R=G=B=0 où k=1.0 pour éviter une division par zéro.",
      "Arrondir chaque pourcentage à une décimale."
    ],
    "examples": [
      {
        "stdin": "255 255 255\n0 0 0\n255 0 0\n0 255 0",
        "expected": "RVB: (255, 255, 255) -> CMJN: C=0.0% M=0.0% J=0.0% N=0.0%\nRVB: (0, 0, 0) -> CMJN: C=0.0% M=0.0% J=0.0% N=100.0%\nRVB: (255, 0, 0) -> CMJN: C=0.0% M=100.0% J=100.0% N=0.0%\nRVB: (0, 255, 0) -> CMJN: C=100.0% M=0.0% J=100.0% N=0.0%",
        "note": "Blanc pur (0% d’encre), noir pur (100% noir), rouge pur (magenta + jaune) et vert pur (cyan + jaune)."
      }
    ],
    "tests": [
      {
        "label": "Couleur primaire bleue et teintes intermédiaires",
        "stdin": "cas:1",
        "expected": "RVB: (0, 0, 255) -> CMJN: C=100.0% M=100.0% J=0.0% N=0.0%\nRVB: (128, 128, 128) -> CMJN: C=0.0% M=0.0% J=0.0% N=49.8%"
      },
      {
        "label": "Jaune et Cyan purs",
        "stdin": "cas:2",
        "expected": "RVB: (255, 255, 0) -> CMJN: C=0.0% M=0.0% J=100.0% N=0.0%\nRVB: (0, 255, 255) -> CMJN: C=100.0% M=0.0% J=0.0% N=0.0%"
      },
      {
        "label": "Couleur de marque Teinte Sarcelle",
        "stdin": "cas:3",
        "expected": "RVB: (15, 118, 110) -> CMJN: C=87.3% M=0.0% J=6.8% N=53.7%"
      }
    ],
    "solution": "[Exemple]\nRVB: (255, 255, 255) -> CMJN: C=0.0% M=0.0% J=0.0% N=0.0%\nRVB: (0, 0, 0) -> CMJN: C=0.0% M=0.0% J=0.0% N=100.0%\nRVB: (255, 0, 0) -> CMJN: C=0.0% M=100.0% J=100.0% N=0.0%\nRVB: (0, 255, 0) -> CMJN: C=100.0% M=0.0% J=100.0% N=0.0%\n\n[Cas 1 — Couleur primaire bleue et teintes intermédiaires]\nRVB: (0, 0, 255) -> CMJN: C=100.0% M=100.0% J=0.0% N=0.0%\nRVB: (128, 128, 128) -> CMJN: C=0.0% M=0.0% J=0.0% N=49.8%\n\n[Cas 2 — Jaune et Cyan purs]\nRVB: (255, 255, 0) -> CMJN: C=0.0% M=0.0% J=100.0% N=0.0%\nRVB: (0, 255, 255) -> CMJN: C=100.0% M=0.0% J=0.0% N=0.0%\n\n[Cas 3 — Couleur de marque Teinte Sarcelle]\nRVB: (15, 118, 110) -> CMJN: C=87.3% M=0.0% J=6.8% N=53.7%"
  },
  {
    "id": "ig2-c1-e2",
    "chapter": 1,
    "title": "Calculateur de résolution d’impression et dimensions physiques (DPI/PPI)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer les dimensions physiques en centimètres d’une image selon sa résolution PPP/DPI et estimer son poids brut non compressé.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nRègles de calcul métrique :<br>\n- 1 pouce = 2.54 cm exactement.<br>\n- Largeur en cm = <code>(LargeurPx / DPI) * 2.54</code>.<br>\n- Hauteur en cm = <code>(HauteurPx / DPI) * 2.54</code>.<br>\n- Poids brut non compressé en 24 bits (3 octets RVB par pixel) :<br>\n  <code>PoidsMo = (LargeurPx * HauteurPx * 3) / (1024 * 1024)</code> (arrondi à 2 décimales).<br>\nAfficher :<br>\n<code>IMAGE: &lt;L&gt;x&lt;H&gt; px @ &lt;DPI&gt; DPI -&gt; DIMENSIONS: &lt;Lcm:.2f&gt; x &lt;Hcm:.2f&gt; cm | POIDS_BRUT: &lt;PoidsMo:.2f&gt; Mo</code></p>",
    "starter": "# Grille d'analyse (ig2-c1-e2) — Calculateur de résolution d’impression et dimensions physiques (DPI/PPI)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Format A4 haute résolution 300 DPI]\n# Données : 2480 3508 300\nA_COMPLETER\n\n[Cas 2 — Affiche publicitaire géante 150 DPI]\n# Données : 6000 4000 150\nA_COMPLETER\n\n[Cas 3 — Miniature web iconographique]\n# Données : 512 512 96\nA_COMPLETER\n",
    "hints": [
      "Un DPI de 300 est la norme de l’imprimerie offset haute qualité.",
      "Un DPI de 72 à 96 correspond aux écrans traditionnels."
    ],
    "examples": [
      {
        "stdin": "3000 2000 300\n1920 1080 72",
        "expected": "IMAGE: 3000x2000 px @ 300 DPI -> DIMENSIONS: 25.40 x 16.93 cm | POIDS_BRUT: 17.17 Mo\nIMAGE: 1920x1080 px @ 72 DPI -> DIMENSIONS: 67.73 x 38.10 cm | POIDS_BRUT: 5.93 Mo",
        "note": "Une photo 3000x2000 à 300 DPI imprime un format 25x17 cm net sans pixellisation."
      }
    ],
    "tests": [
      {
        "label": "Format A4 haute résolution 300 DPI",
        "stdin": "cas:1",
        "expected": "IMAGE: 2480x3508 px @ 300 DPI -> DIMENSIONS: 21.00 x 29.70 cm | POIDS_BRUT: 24.89 Mo"
      },
      {
        "label": "Affiche publicitaire géante 150 DPI",
        "stdin": "cas:2",
        "expected": "IMAGE: 6000x4000 px @ 150 DPI -> DIMENSIONS: 101.60 x 67.73 cm | POIDS_BRUT: 68.66 Mo"
      },
      {
        "label": "Miniature web iconographique",
        "stdin": "cas:3",
        "expected": "IMAGE: 512x512 px @ 96 DPI -> DIMENSIONS: 13.55 x 13.55 cm | POIDS_BRUT: 0.75 Mo"
      }
    ],
    "solution": "[Exemple]\nIMAGE: 3000x2000 px @ 300 DPI -> DIMENSIONS: 25.40 x 16.93 cm | POIDS_BRUT: 17.17 Mo\nIMAGE: 1920x1080 px @ 72 DPI -> DIMENSIONS: 67.73 x 38.10 cm | POIDS_BRUT: 5.93 Mo\n\n[Cas 1 — Format A4 haute résolution 300 DPI]\nIMAGE: 2480x3508 px @ 300 DPI -> DIMENSIONS: 21.00 x 29.70 cm | POIDS_BRUT: 24.89 Mo\n\n[Cas 2 — Affiche publicitaire géante 150 DPI]\nIMAGE: 6000x4000 px @ 150 DPI -> DIMENSIONS: 101.60 x 67.73 cm | POIDS_BRUT: 68.66 Mo\n\n[Cas 3 — Miniature web iconographique]\nIMAGE: 512x512 px @ 96 DPI -> DIMENSIONS: 13.55 x 13.55 cm | POIDS_BRUT: 0.75 Mo"
  },
  {
    "id": "ig2-c1-e3",
    "chapter": 1,
    "title": "Classificateur de formats d’image selon le cas d’usage",
    "level": "n3",
    "language": "analyse",
    "goal": "Sélectionner le format d’image optimal (SVG, PNG, JPEG, WebP) selon les contraintes de transparence, nature graphique et poids.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nRègles de recommandation industrielle :<br>\n- Si <code>NATURE=VECTORIEL</code> ou <code>COMPLEXITE=ICONE</code> : <code>FORMAT: SVG | JUSTIFICATION: Vectoriel resolution-independante et taille plume pour logos et icones</code>.<br>\n- Sinon (Raster) :<br>\n  * Si <code>TRANSPARENCE=OUI</code> et <code>COMPLEXITE=ILLUSTRATION</code> : <code>FORMAT: PNG | JUSTIFICATION: Compression sans perte avec canal alpha transparent</code>.<br>\n  * Si <code>TRANSPARENCE=NON</code> et <code>COMPLEXITE=PHOTO</code> : <code>FORMAT: JPEG | JUSTIFICATION: Compression avec perte optimale pour degrades photographiques</code>.<br>\n  * Pour tout autre cas web moderne : <code>FORMAT: WebP | JUSTIFICATION: Format polyvalent moderne combinant transparence alpha et haute compression</code>.<br>\nAfficher :<br>\n<code>ASSET: &lt;entree&gt; -&gt; &lt;FORMAT&gt; | &lt;JUSTIFICATION&gt;</code></p>",
    "starter": "# Grille d'analyse (ig2-c1-e3) — Classificateur de formats d’image selon le cas d’usage\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Photo avec transparence (fond détouré)]\n# Données : NATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=PHOTO\nA_COMPLETER\n\n[Cas 2 — Logo vectoriel simple sans transparence]\n# Données : NATURE=VECTORIEL TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION\nA_COMPLETER\n\n[Cas 3 — Illustration sans transparence]\n# Données : NATURE=RASTER TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION\nA_COMPLETER\n",
    "hints": [
      "SVG est le standard universel pour les tracés vectoriels et icônes.",
      "PNG préserve la transparence sans artefacts.",
      "JPEG compresse efficacement les photos riches sans canal alpha."
    ],
    "examples": [
      {
        "stdin": "NATURE=VECTORIEL TRANSPARENCE=OUI COMPLEXITE=ICONE\nNATURE=RASTER TRANSPARENCE=NON COMPLEXITE=PHOTO\nNATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=ILLUSTRATION",
        "expected": "ASSET: NATURE=VECTORIEL TRANSPARENCE=OUI COMPLEXITE=ICONE -> FORMAT: SVG | JUSTIFICATION: Vectoriel resolution-independante et taille plume pour logos et icones\nASSET: NATURE=RASTER TRANSPARENCE=NON COMPLEXITE=PHOTO -> FORMAT: JPEG | JUSTIFICATION: Compression avec perte optimale pour degrades photographiques\nASSET: NATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=ILLUSTRATION -> FORMAT: PNG | JUSTIFICATION: Compression sans perte avec canal alpha transparent",
        "note": "Arbitrage standard des formats graphiques web et multimédia."
      }
    ],
    "tests": [
      {
        "label": "Photo avec transparence (fond détouré)",
        "stdin": "cas:1",
        "expected": "ASSET: NATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=PHOTO -> FORMAT: WebP | JUSTIFICATION: Format polyvalent moderne combinant transparence alpha et haute compression"
      },
      {
        "label": "Logo vectoriel simple sans transparence",
        "stdin": "cas:2",
        "expected": "ASSET: NATURE=VECTORIEL TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION -> FORMAT: SVG | JUSTIFICATION: Vectoriel resolution-independante et taille plume pour logos et icones"
      },
      {
        "label": "Illustration sans transparence",
        "stdin": "cas:3",
        "expected": "ASSET: NATURE=RASTER TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION -> FORMAT: WebP | JUSTIFICATION: Format polyvalent moderne combinant transparence alpha et haute compression"
      }
    ],
    "solution": "[Exemple]\nASSET: NATURE=VECTORIEL TRANSPARENCE=OUI COMPLEXITE=ICONE -> FORMAT: SVG | JUSTIFICATION: Vectoriel resolution-independante et taille plume pour logos et icones\nASSET: NATURE=RASTER TRANSPARENCE=NON COMPLEXITE=PHOTO -> FORMAT: JPEG | JUSTIFICATION: Compression avec perte optimale pour degrades photographiques\nASSET: NATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=ILLUSTRATION -> FORMAT: PNG | JUSTIFICATION: Compression sans perte avec canal alpha transparent\n\n[Cas 1 — Photo avec transparence (fond détouré)]\nASSET: NATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=PHOTO -> FORMAT: WebP | JUSTIFICATION: Format polyvalent moderne combinant transparence alpha et haute compression\n\n[Cas 2 — Logo vectoriel simple sans transparence]\nASSET: NATURE=VECTORIEL TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION -> FORMAT: SVG | JUSTIFICATION: Vectoriel resolution-independante et taille plume pour logos et icones\n\n[Cas 3 — Illustration sans transparence]\nASSET: NATURE=RASTER TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION -> FORMAT: WebP | JUSTIFICATION: Format polyvalent moderne combinant transparence alpha et haute compression"
  }
];
