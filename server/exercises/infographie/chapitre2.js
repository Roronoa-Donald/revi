'use strict';

module.exports = [
  {
    "id": "ig2-c2-e1",
    "chapter": 2,
    "title": "Simulateur de modes de fusion de calques (Multiply, Screen, Overlay)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la valeur de pixel résultante de trois modes de fusion fondamentaux de Photoshop / GIMP.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nLes valeurs A (calque inférieur) et B (calque supérieur) sont des entiers entre 0 et 255.<br>\nFormules mathématiques de fusion :<br>\n- <code>MULTIPLY (Produit - assombrit)</code> :<br>\n  <code>R = (A * B) / 255.0</code><br>\n- <code>SCREEN (Superposition - éclaircit)</code> :<br>\n  <code>R = 255.0 - ((255.0 - A) * (255.0 - B)) / 255.0</code><br>\n- <code>OVERLAY (Incrustation - contraste)</code> :<br>\n  * Si <code>A &lt; 128</code> : <code>R = (2.0 * A * B) / 255.0</code><br>\n  * Sinon : <code>R = 255.0 - (2.0 * (255.0 - A) * (255.0 - B)) / 255.0</code><br>\nAfficher la valeur arrondie à l'entier le plus proche :<br>\n<code>FUSION: &lt;MODE&gt; (A=&lt;A&gt;, B=&lt;B&gt;) -&gt; VALEUR: &lt;round(R)&gt;</code></p>",
    "starter": "# Grille d'analyse (ig2-c2-e1) — Simulateur de modes de fusion de calques (Multiply, Screen, Overlay)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas extrêmes blanc pur et noir pur]\n# Données : MODE=MULTIPLY BASE=255 CALQUE=128\n# Données : MODE=MULTIPLY BASE=0 CALQUE=200\n# Données : MODE=SCREEN BASE=0 CALQUE=128\n# Données : MODE=SCREEN BASE=255 CALQUE=200\nA_COMPLETER\n\n[Cas 2 — Incrustation sur gris moyen 128]\n# Données : MODE=OVERLAY BASE=128 CALQUE=128\n# Données : MODE=OVERLAY BASE=50 CALQUE=50\nA_COMPLETER\n\n[Cas 3 — Combinaison standard de calques]\n# Données : MODE=MULTIPLY BASE=100 CALQUE=150\n# Données : MODE=SCREEN BASE=100 CALQUE=150\n# Données : MODE=OVERLAY BASE=200 CALQUE=100\nA_COMPLETER\n",
    "hints": [
      "Normaliser ou appliquer directement les formules sur l’intervalle [0, 255].",
      "Arrondir avec int(round(R))."
    ],
    "examples": [
      {
        "stdin": "MODE=MULTIPLY BASE=200 CALQUE=150\nMODE=SCREEN BASE=200 CALQUE=150\nMODE=OVERLAY BASE=100 CALQUE=200\nMODE=OVERLAY BASE=180 CALQUE=200",
        "expected": "FUSION: MULTIPLY (A=200, B=150) -> VALEUR: 118\nFUSION: SCREEN (A=200, B=150) -> VALEUR: 232\nFUSION: OVERLAY (A=100, B=200) -> VALEUR: 157\nFUSION: OVERLAY (A=180, B=200) -> VALEUR: 223",
        "note": "Multiply assombrit toujours, Screen éclaircit toujours, Overlay accentue le contraste."
      }
    ],
    "tests": [
      {
        "label": "Cas extrêmes blanc pur et noir pur",
        "stdin": "cas:1",
        "expected": "FUSION: MULTIPLY (A=255, B=128) -> VALEUR: 128\nFUSION: MULTIPLY (A=0, B=200) -> VALEUR: 0\nFUSION: SCREEN (A=0, B=128) -> VALEUR: 128\nFUSION: SCREEN (A=255, B=200) -> VALEUR: 255"
      },
      {
        "label": "Incrustation sur gris moyen 128",
        "stdin": "cas:2",
        "expected": "FUSION: OVERLAY (A=128, B=128) -> VALEUR: 128\nFUSION: OVERLAY (A=50, B=50) -> VALEUR: 20"
      },
      {
        "label": "Combinaison standard de calques",
        "stdin": "cas:3",
        "expected": "FUSION: MULTIPLY (A=100, B=150) -> VALEUR: 59\nFUSION: SCREEN (A=100, B=150) -> VALEUR: 191\nFUSION: OVERLAY (A=200, B=100) -> VALEUR: 157"
      }
    ],
    "solution": "[Exemple]\nFUSION: MULTIPLY (A=200, B=150) -> VALEUR: 118\nFUSION: SCREEN (A=200, B=150) -> VALEUR: 232\nFUSION: OVERLAY (A=100, B=200) -> VALEUR: 157\nFUSION: OVERLAY (A=180, B=200) -> VALEUR: 223\n\n[Cas 1 — Cas extrêmes blanc pur et noir pur]\nFUSION: MULTIPLY (A=255, B=128) -> VALEUR: 128\nFUSION: MULTIPLY (A=0, B=200) -> VALEUR: 0\nFUSION: SCREEN (A=0, B=128) -> VALEUR: 128\nFUSION: SCREEN (A=255, B=200) -> VALEUR: 255\n\n[Cas 2 — Incrustation sur gris moyen 128]\nFUSION: OVERLAY (A=128, B=128) -> VALEUR: 128\nFUSION: OVERLAY (A=50, B=50) -> VALEUR: 20\n\n[Cas 3 — Combinaison standard de calques]\nFUSION: MULTIPLY (A=100, B=150) -> VALEUR: 59\nFUSION: SCREEN (A=100, B=150) -> VALEUR: 191\nFUSION: OVERLAY (A=200, B=100) -> VALEUR: 157"
  },
  {
    "id": "ig2-c2-e2",
    "chapter": 2,
    "title": "Évaluateur de courbe de Bézier cubique 2D",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la position exacte d’un point le long d’une courbe vectorielle de Bézier cubique définie par quatre points de contrôle.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nFormule des polynômes de Bernstein pour une courbe cubique avec paramètre <code>t</code> dans [0, 1] :<br>\n<code>B(t) = (1-t)^3 * P0 + 3 * (1-t)^2 * t * P1 + 3 * (1-t) * t^2 * P2 + t^3 * P3</code>.<br>\nCalculer les coordonnées <code>X(t)</code> et <code>Y(t)</code> et afficher :<br>\n<code>BEZIER: t=&lt;t:.2f&gt; -&gt; POINT: (&lt;X:.2f&gt;, &lt;Y:.2f&gt;)</code></p>",
    "starter": "# Grille d'analyse (ig2-c2-e2) — Évaluateur de courbe de Bézier cubique 2D\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Points de contrôle quart de tour]\n# Données : P0=(0,0) P1=(55.2,0) P2=(100,44.8) P3=(100,100) t=0.5\nA_COMPLETER\n\n[Cas 2 — Progression linéaire intermédiaire]\n# Données : P0=(0,0) P1=(25,50) P2=(75,50) P3=(100,0) t=0.25\nA_COMPLETER\n\n[Cas 3 — Valeur proche de la fin t=0.75]\n# Données : P0=(0,0) P1=(25,50) P2=(75,50) P3=(100,0) t=0.75\nA_COMPLETER\n",
    "hints": [
      "Extraire les coordonnées x et y de chaque point P0, P1, P2, P3.",
      "Appliquer les coefficients (1-t)**3, 3*(1-t)**2*t, 3*(1-t)*t**2, et t**3."
    ],
    "examples": [
      {
        "stdin": "P0=(0,0) P1=(0,100) P2=(100,100) P3=(100,0) t=0.5\nP0=(10,20) P1=(30,40) P2=(50,60) P3=(70,80) t=0.0\nP0=(10,20) P1=(30,40) P2=(50,60) P3=(70,80) t=1.0",
        "expected": "BEZIER: t=0.50 -> POINT: (50.00, 75.00)\nBEZIER: t=0.00 -> POINT: (10.00, 20.00)\nBEZIER: t=1.00 -> POINT: (70.00, 80.00)",
        "note": "À t=0 on est en P0, à t=1 on est en P3, et à t=0.5 on évalue la combinaison des tangentes."
      }
    ],
    "tests": [
      {
        "label": "Points de contrôle quart de tour",
        "stdin": "cas:1",
        "expected": "BEZIER: t=0.50 -> POINT: (70.70, 29.30)"
      },
      {
        "label": "Progression linéaire intermédiaire",
        "stdin": "cas:2",
        "expected": "BEZIER: t=0.25 -> POINT: (22.66, 28.12)"
      },
      {
        "label": "Valeur proche de la fin t=0.75",
        "stdin": "cas:3",
        "expected": "BEZIER: t=0.75 -> POINT: (77.34, 28.12)"
      }
    ],
    "solution": "[Exemple]\nBEZIER: t=0.50 -> POINT: (50.00, 75.00)\nBEZIER: t=0.00 -> POINT: (10.00, 20.00)\nBEZIER: t=1.00 -> POINT: (70.00, 80.00)\n\n[Cas 1 — Points de contrôle quart de tour]\nBEZIER: t=0.50 -> POINT: (70.70, 29.30)\n\n[Cas 2 — Progression linéaire intermédiaire]\nBEZIER: t=0.25 -> POINT: (22.66, 28.12)\n\n[Cas 3 — Valeur proche de la fin t=0.75]\nBEZIER: t=0.75 -> POINT: (77.34, 28.12)"
  },
  {
    "id": "ig2-c2-e3",
    "chapter": 2,
    "title": "Analyseur d’histogramme et correction de tonalité (Levels)",
    "level": "n3",
    "language": "analyse",
    "goal": "Diagnostiquer la distribution tonale d’une image (sous-exposition, surexposition, contraste équilibré).",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nCalculs :<br>\n1. <code>Total = n1 + n2 + n3 + n4 + n5</code>.<br>\n2. Pourcentage dans les noirs bouchés : <code>PctNoirs = (n1 / Total) * 100</code>.<br>\n3. Pourcentage dans les blancs cramés : <code>PctBlancs = (n5 / Total) * 100</code>.<br>\nRègles de diagnostic :<br>\n- Si <code>PctNoirs &gt;= 40.0%</code> :<br>\n  <code>DIAGNOSTIC: SOUS_EXPOSE (Ombres bouchees - remonter le point noir)</code><br>\n- Si <code>PctBlancs &gt;= 40.0%</code> :<br>\n  <code>DIAGNOSTIC: SUR_EXPOSE (Hautes lumieres cramees - descendre le point blanc)</code><br>\n- Sinon :<br>\n  <code>DIAGNOSTIC: EQUILIBRE (Dynamique tonale bien repartie)</code><br>\nAfficher :<br>\n<code>&lt;Nom&gt; [Noirs: &lt;PctNoirs:.1f&gt;% | Blancs: &lt;PctBlancs:.1f&gt;%] -&gt; &lt;DIAGNOSTIC&gt;</code></p>",
    "starter": "# Grille d'analyse (ig2-c2-e3) — Analyseur d’histogramme et correction de tonalité (Levels)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Image très équilibrée]\n# Données : IMAGE=PaysageAutomne NOIRS=150 TONS_SOMBRES=200 TONS_MOYENS=300 TONS_CLAIRS=200 BLANCS=150\nA_COMPLETER\n\n[Cas 2 — Sous-exposition massive 65%]\n# Données : IMAGE=Grotte NOIRS=650 TONS_SOMBRES=200 TONS_MOYENS=100 TONS_CLAIRS=30 BLANCS=20\nA_COMPLETER\n\n[Cas 3 — Bordure exacte de surexposition 40%]\n# Données : IMAGE=SoleilMidi NOIRS=50 TONS_SOMBRES=100 TONS_MOYENS=150 TONS_CLAIRS=300 BLANCS=400\nA_COMPLETER\n",
    "hints": [
      "Calculer la somme des cinq catégories de pixels pour obtenir le total.",
      "Comparer les pourcentages au seuil de 40.0%."
    ],
    "examples": [
      {
        "stdin": "IMAGE=PhotoNuit NOIRS=500 TONS_SOMBRES=200 TONS_MOYENS=150 TONS_CLAIRS=100 BLANCS=50\nIMAGE=PhotoPlage NOIRS=20 TONS_SOMBRES=80 TONS_MOYENS=200 TONS_CLAIRS=300 BLANCS=400\nIMAGE=PortraitStudio NOIRS=100 TONS_SOMBRES=200 TONS_MOYENS=400 TONS_CLAIRS=200 BLANCS=100",
        "expected": "PhotoNuit [Noirs: 50.0% | Blancs: 5.0%] -> DIAGNOSTIC: SOUS_EXPOSE (Ombres bouchees - remonter le point noir)\nPhotoPlage [Noirs: 2.0% | Blancs: 40.0%] -> DIAGNOSTIC: SUR_EXPOSE (Hautes lumieres cramees - descendre le point blanc)\nPortraitStudio [Noirs: 10.0% | Blancs: 10.0%] -> DIAGNOSTIC: EQUILIBRE (Dynamique tonale bien repartie)",
        "note": "Diagnostic photographique standard basé sur l’étalement des niveaux."
      }
    ],
    "tests": [
      {
        "label": "Image très équilibrée",
        "stdin": "cas:1",
        "expected": "PaysageAutomne [Noirs: 15.0% | Blancs: 15.0%] -> DIAGNOSTIC: EQUILIBRE (Dynamique tonale bien repartie)"
      },
      {
        "label": "Sous-exposition massive 65%",
        "stdin": "cas:2",
        "expected": "Grotte [Noirs: 65.0% | Blancs: 2.0%] -> DIAGNOSTIC: SOUS_EXPOSE (Ombres bouchees - remonter le point noir)"
      },
      {
        "label": "Bordure exacte de surexposition 40%",
        "stdin": "cas:3",
        "expected": "SoleilMidi [Noirs: 5.0% | Blancs: 40.0%] -> DIAGNOSTIC: SUR_EXPOSE (Hautes lumieres cramees - descendre le point blanc)"
      }
    ],
    "solution": "[Exemple]\nPhotoNuit [Noirs: 50.0% | Blancs: 5.0%] -> DIAGNOSTIC: SOUS_EXPOSE (Ombres bouchees - remonter le point noir)\nPhotoPlage [Noirs: 2.0% | Blancs: 40.0%] -> DIAGNOSTIC: SUR_EXPOSE (Hautes lumieres cramees - descendre le point blanc)\nPortraitStudio [Noirs: 10.0% | Blancs: 10.0%] -> DIAGNOSTIC: EQUILIBRE (Dynamique tonale bien repartie)\n\n[Cas 1 — Image très équilibrée]\nPaysageAutomne [Noirs: 15.0% | Blancs: 15.0%] -> DIAGNOSTIC: EQUILIBRE (Dynamique tonale bien repartie)\n\n[Cas 2 — Sous-exposition massive 65%]\nGrotte [Noirs: 65.0% | Blancs: 2.0%] -> DIAGNOSTIC: SOUS_EXPOSE (Ombres bouchees - remonter le point noir)\n\n[Cas 3 — Bordure exacte de surexposition 40%]\nSoleilMidi [Noirs: 5.0% | Blancs: 40.0%] -> DIAGNOSTIC: SUR_EXPOSE (Hautes lumieres cramees - descendre le point blanc)"
  }
];
