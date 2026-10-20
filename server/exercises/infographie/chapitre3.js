'use strict';

module.exports = [
  {
    "id": "ig2-c3-e1",
    "chapter": 3,
    "title": "Validateur de texture Puissance de Deux (Power of Two - POT)",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la conformité des dimensions d’une texture selon la règle GPU « Power of Two » et proposer l’arrondi optimal pour les Mipmaps.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nRègles matérielles GPU :<br>\n- Une dimension est POT (Power of Two) si elle est une puissance exacte de 2 (ex: 64, 128, 256, 512, 1024, 2048, 4096).<br>\n- Une texture est conforme si sa Largeur ET sa Hauteur sont toutes deux POT.<br>\n- Si une dimension n'est pas POT, la suggestion GPU est la plus petite puissance de 2 supérieure ou égale à la dimension actuelle.<br>\nAfficher :<br>\n- Si conforme :<br>\n  <code>TEXTURE: &lt;L&gt;x&lt;H&gt; -&gt; POT: OUI (Compatible Mipmaps et compression materielle)</code><br>\n- Si non-conforme :<br>\n  <code>TEXTURE: &lt;L&gt;x&lt;H&gt; -&gt; POT: NON | SUGGESTION_GPU: &lt;PotL&gt;x&lt;PotH&gt;</code></p>",
    "starter": "# Grille d'analyse (ig2-c3-e1) — Validateur de texture Puissance de Deux (Power of Two - POT)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Textures carrées et rectangulaires conformes]\n# Données : 256 256\n# Données : 128 64\n# Données : 4096 4096\nA_COMPLETER\n\n[Cas 2 — Résolutions d’écran non-POT courantes]\n# Données : 1920 1080\n# Données : 800 600\nA_COMPLETER\n\n[Cas 3 — Une dimension POT et une non-POT]\n# Données : 1024 700\n# Données : 300 512\nA_COMPLETER\n",
    "hints": [
      "Un entier positif x est une puissance de 2 si (x & (x - 1)) == 0.",
      "Pour trouver la puissance supérieure : 2 ** math.ceil(math.log2(x))."
    ],
    "examples": [
      {
        "stdin": "1024 1024\n500 300\n2048 512",
        "expected": "TEXTURE: 1024x1024 -> POT: OUI (Compatible Mipmaps et compression materielle)\nTEXTURE: 500x300 -> POT: NON | SUGGESTION_GPU: 512x512\nTEXTURE: 2048x512 -> POT: OUI (Compatible Mipmaps et compression materielle)",
        "note": "1024 et 2048x512 sont POT. 500x300 est non-POT et doit être ajusté en 512x512."
      }
    ],
    "tests": [
      {
        "label": "Textures carrées et rectangulaires conformes",
        "stdin": "cas:1",
        "expected": "TEXTURE: 256x256 -> POT: OUI (Compatible Mipmaps et compression materielle)\nTEXTURE: 128x64 -> POT: OUI (Compatible Mipmaps et compression materielle)\nTEXTURE: 4096x4096 -> POT: OUI (Compatible Mipmaps et compression materielle)"
      },
      {
        "label": "Résolutions d’écran non-POT courantes",
        "stdin": "cas:2",
        "expected": "TEXTURE: 1920x1080 -> POT: NON | SUGGESTION_GPU: 2048x2048\nTEXTURE: 800x600 -> POT: NON | SUGGESTION_GPU: 1024x1024"
      },
      {
        "label": "Une dimension POT et une non-POT",
        "stdin": "cas:3",
        "expected": "TEXTURE: 1024x700 -> POT: NON | SUGGESTION_GPU: 1024x1024\nTEXTURE: 300x512 -> POT: NON | SUGGESTION_GPU: 512x512"
      }
    ],
    "solution": "[Exemple]\nTEXTURE: 1024x1024 -> POT: OUI (Compatible Mipmaps et compression materielle)\nTEXTURE: 500x300 -> POT: NON | SUGGESTION_GPU: 512x512\nTEXTURE: 2048x512 -> POT: OUI (Compatible Mipmaps et compression materielle)\n\n[Cas 1 — Textures carrées et rectangulaires conformes]\nTEXTURE: 256x256 -> POT: OUI (Compatible Mipmaps et compression materielle)\nTEXTURE: 128x64 -> POT: OUI (Compatible Mipmaps et compression materielle)\nTEXTURE: 4096x4096 -> POT: OUI (Compatible Mipmaps et compression materielle)\n\n[Cas 2 — Résolutions d’écran non-POT courantes]\nTEXTURE: 1920x1080 -> POT: NON | SUGGESTION_GPU: 2048x2048\nTEXTURE: 800x600 -> POT: NON | SUGGESTION_GPU: 1024x1024\n\n[Cas 3 — Une dimension POT et une non-POT]\nTEXTURE: 1024x700 -> POT: NON | SUGGESTION_GPU: 1024x1024\nTEXTURE: 300x512 -> POT: NON | SUGGESTION_GPU: 512x512"
  },
  {
    "id": "ig2-c3-e2",
    "chapter": 3,
    "title": "Calculateur de coordonnées d’atlas de sprites (Sprite Sheet UV Map)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer les coordonnées de texture UV normalisées [0, 1] d’une sous-image découpée dans un atlas 2D pour moteur de jeu.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nL'atlas fait W par H pixels. Chaque cellule de sprite fait w par h pixels.<br>\nLes indices de grille (COL, ROW) démarrent à 0 (colonne 0 à gauche, ligne 0 en haut).<br>\nFormules dans l'espace UV standard (origine (0, 0) en bas à gauche de la texture) :<br>\n- <code>U_min = (c * w) / float(W)</code><br>\n- <code>U_max = ((c + 1) * w) / float(W)</code><br>\n- <code>V_min = 1.0 - ((r + 1) * h) / float(H)</code><br>\n- <code>V_max = 1.0 - (r * h) / float(H)</code><br>\nAfficher :<br>\n<code>FRAME (&lt;c&gt;, &lt;r&gt;) -&gt; UV: U=[&lt;U_min:.3f&gt;, &lt;U_max:.3f&gt;] | V=[&lt;V_min:.3f&gt;, &lt;V_max:.3f&gt;]</code></p>",
    "starter": "# Grille d'analyse (ig2-c3-e2) — Calculateur de coordonnées d’atlas de sprites (Sprite Sheet UV Map)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Atlas rectangulaire 4x2 cellules]\n# Données : ATLAS=512x256 CELL=128x128 COL=2 ROW=1\nA_COMPLETER\n\n[Cas 2 — Atlas pleine page cellule unique]\n# Données : ATLAS=2048x2048 CELL=2048x2048 COL=0 ROW=0\nA_COMPLETER\n\n[Cas 3 — Petites vignettes 64x64 sur atlas 512x512]\n# Données : ATLAS=512x512 CELL=64x64 COL=3 ROW=2\nA_COMPLETER\n",
    "hints": [
      "L’axe vertical V part de 0 en bas et monte à 1 en haut dans OpenGL/Unity.",
      "Arrondir les coordonnées UV à 3 décimales."
    ],
    "examples": [
      {
        "stdin": "ATLAS=1024x1024 CELL=256x256 COL=0 ROW=0\nATLAS=1024x1024 CELL=256x256 COL=1 ROW=0\nATLAS=1024x1024 CELL=256x256 COL=3 ROW=3",
        "expected": "FRAME (0, 0) -> UV: U=[0.000, 0.250] | V=[0.750, 1.000]\nFRAME (1, 0) -> UV: U=[0.250, 0.500] | V=[0.750, 1.000]\nFRAME (3, 3) -> UV: U=[0.750, 1.000] | V=[0.000, 0.250]",
        "note": "La case en haut à gauche (0,0) a V entre 0.750 et 1.000 ; la case en bas à droite a V entre 0 et 0.250."
      }
    ],
    "tests": [
      {
        "label": "Atlas rectangulaire 4x2 cellules",
        "stdin": "cas:1",
        "expected": "FRAME (2, 1) -> UV: U=[0.500, 0.750] | V=[0.000, 0.500]"
      },
      {
        "label": "Atlas pleine page cellule unique",
        "stdin": "cas:2",
        "expected": "FRAME (0, 0) -> UV: U=[0.000, 1.000] | V=[0.000, 1.000]"
      },
      {
        "label": "Petites vignettes 64x64 sur atlas 512x512",
        "stdin": "cas:3",
        "expected": "FRAME (3, 2) -> UV: U=[0.375, 0.500] | V=[0.625, 0.750]"
      }
    ],
    "solution": "[Exemple]\nFRAME (0, 0) -> UV: U=[0.000, 0.250] | V=[0.750, 1.000]\nFRAME (1, 0) -> UV: U=[0.250, 0.500] | V=[0.750, 1.000]\nFRAME (3, 3) -> UV: U=[0.750, 1.000] | V=[0.000, 0.250]\n\n[Cas 1 — Atlas rectangulaire 4x2 cellules]\nFRAME (2, 1) -> UV: U=[0.500, 0.750] | V=[0.000, 0.500]\n\n[Cas 2 — Atlas pleine page cellule unique]\nFRAME (0, 0) -> UV: U=[0.000, 1.000] | V=[0.000, 1.000]\n\n[Cas 3 — Petites vignettes 64x64 sur atlas 512x512]\nFRAME (3, 2) -> UV: U=[0.375, 0.500] | V=[0.625, 0.750]"
  },
  {
    "id": "ig2-c3-e3",
    "chapter": 3,
    "title": "Décodeur de Normal Map (Espace tangent RVB vers vecteur normal)",
    "level": "n3",
    "language": "analyse",
    "goal": "Convertir les composantes RVB d’une texture de relief Normal Map en vecteur normal unitaire 3D.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nFormules de décodage shader :<br>\n1. Transformation linéaire vers l'intervalle [-1.0, 1.0] :<br>\n   <code>Nx = (R / 255.0) * 2.0 - 1.0</code><br>\n   <code>Ny = (G / 255.0) * 2.0 - 1.0</code><br>\n   <code>Nz = (B / 255.0) * 2.0 - 1.0</code><br>\n2. Normalisation du vecteur unitaire :<br>\n   <code>norme = sqrt(Nx^2 + Ny^2 + Nz^2)</code><br>\n   Si <code>norme &gt; 0</code>, alors <code>(Nx, Ny, Nz) = (Nx/norme, Ny/norme, Nz/norme)</code>.<br>\nAfficher :<br>\n<code>NORMAL_MAP: RVB=(&lt;R&gt;, &lt;G&gt;, &lt;B&gt;) -&gt; VECTEUR_NORMAL: (&lt;Nx:.3f&gt;, &lt;Ny:.3f&gt;, &lt;Nz:.3f&gt;)</code></p>",
    "starter": "# Grille d'analyse (ig2-c3-e3) — Décodeur de Normal Map (Espace tangent RVB vers vecteur normal)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vecteur neutre rigoureux 127 127 255]\n# Données : 127 127 255\nA_COMPLETER\n\n[Cas 2 — Pente oblique inclinée à 45 degrés]\n# Données : 200 128 200\nA_COMPLETER\n\n[Cas 3 — Relief négatif vers le bas gauche]\n# Données : 50 50 220\nA_COMPLETER\n",
    "hints": [
      "Le bleu neutre (128, 128, 255) correspond à une normale pointant tout droit le long de l’axe Z (0, 0, 1).",
      "Normaliser le vecteur pour garantir une longueur de 1.0."
    ],
    "examples": [
      {
        "stdin": "128 128 255\n255 128 128\n128 255 128",
        "expected": "NORMAL_MAP: RVB=(128, 128, 255) -> VECTEUR_NORMAL: (0.004, 0.004, 1.000)\nNORMAL_MAP: RVB=(255, 128, 128) -> VECTEUR_NORMAL: (1.000, 0.004, 0.004)\nNORMAL_MAP: RVB=(128, 255, 128) -> VECTEUR_NORMAL: (0.004, 1.000, 0.004)",
        "note": "La teinte bleu ciel typique d’une normal map pointe vers la caméra (axe Z)."
      }
    ],
    "tests": [
      {
        "label": "Vecteur neutre rigoureux 127 127 255",
        "stdin": "cas:1",
        "expected": "NORMAL_MAP: RVB=(127, 127, 255) -> VECTEUR_NORMAL: (-0.004, -0.004, 1.000)"
      },
      {
        "label": "Pente oblique inclinée à 45 degrés",
        "stdin": "cas:2",
        "expected": "NORMAL_MAP: RVB=(200, 128, 200) -> VECTEUR_NORMAL: (0.707, 0.005, 0.707)"
      },
      {
        "label": "Relief négatif vers le bas gauche",
        "stdin": "cas:3",
        "expected": "NORMAL_MAP: RVB=(50, 50, 220) -> VECTEUR_NORMAL: (-0.540, -0.540, 0.645)"
      }
    ],
    "solution": "[Exemple]\nNORMAL_MAP: RVB=(128, 128, 255) -> VECTEUR_NORMAL: (0.004, 0.004, 1.000)\nNORMAL_MAP: RVB=(255, 128, 128) -> VECTEUR_NORMAL: (1.000, 0.004, 0.004)\nNORMAL_MAP: RVB=(128, 255, 128) -> VECTEUR_NORMAL: (0.004, 1.000, 0.004)\n\n[Cas 1 — Vecteur neutre rigoureux 127 127 255]\nNORMAL_MAP: RVB=(127, 127, 255) -> VECTEUR_NORMAL: (-0.004, -0.004, 1.000)\n\n[Cas 2 — Pente oblique inclinée à 45 degrés]\nNORMAL_MAP: RVB=(200, 128, 200) -> VECTEUR_NORMAL: (0.707, 0.005, 0.707)\n\n[Cas 3 — Relief négatif vers le bas gauche]\nNORMAL_MAP: RVB=(50, 50, 220) -> VECTEUR_NORMAL: (-0.540, -0.540, 0.645)"
  }
];
