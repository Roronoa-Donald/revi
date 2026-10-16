'use strict';

module.exports = [
  {
    "id": "ig2-c4-e1",
    "chapter": 4,
    "title": "Calculateur de normale d’un triangle 3D (Produit vectoriel)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le vecteur normal unitaire perpendiculaire à une face polygonale 3D pour le calcul d’ombrage.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nFormules géométriques :<br>\n1. Vecteur <code>u = B - A = (x2-x1, y2-y1, z2-z1)</code>.<br>\n2. Vecteur <code>v = C - A = (x3-x1, y3-y1, z3-z1)</code>.<br>\n3. Produit vectoriel <code>n = u x v</code> :<br>\n   <code>nx = uy * vz - uz * vy</code><br>\n   <code>ny = uz * vx - ux * vz</code><br>\n   <code>nz = ux * vy - uy * vx</code><br>\n4. Normalisation unitaire : <code>norme = sqrt(nx^2 + ny^2 + nz^2)</code>.<br>\n   <code>(Nx, Ny, Nz) = (nx/norme, ny/norme, nz/norme)</code>.<br>\nAfficher :<br>\n<code>TRIANGLE: -&gt; NORMALE: (&lt;Nx:.3f&gt;, &lt;Ny:.3f&gt;, &lt;Nz:.3f&gt;)</code></p>",
    "starter": "# Grille d'analyse (ig2-c4-e1) — Calculateur de normale d’un triangle 3D (Produit vectoriel)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Triangle incliné dans l’espace]\n# Données : A=(1,1,1) B=(2,1,1) C=(1,2,2)\nA_COMPLETER\n\n[Cas 2 — Triangle vertical plan YZ]\n# Données : A=(0,0,0) B=(0,1,0) C=(0,0,1)\nA_COMPLETER\n\n[Cas 3 — Triangle oblique 3D quelconque]\n# Données : A=(0,0,0) B=(2,0,1) C=(1,2,0)\nA_COMPLETER\n",
    "hints": [
      "L’ordre des sommets (sens trigonométrique CCW) détermine l’orientation de la normale.",
      "Arrondir à 3 décimales."
    ],
    "examples": [
      {
        "stdin": "A=(0,0,0) B=(1,0,0) C=(0,1,0)\nA=(0,0,0) B=(0,0,1) C=(0,1,0)",
        "expected": "TRIANGLE: -> NORMALE: (0.000, 0.000, 1.000)\nTRIANGLE: -> NORMALE: (-1.000, 0.000, 0.000)",
        "note": "Le triangle dans le plan XY pointe selon l’axe Z positif."
      }
    ],
    "tests": [
      {
        "label": "Triangle incliné dans l’espace",
        "stdin": "cas:1",
        "expected": "TRIANGLE: -> NORMALE: (0.000, -0.707, 0.707)"
      },
      {
        "label": "Triangle vertical plan YZ",
        "stdin": "cas:2",
        "expected": "TRIANGLE: -> NORMALE: (1.000, 0.000, 0.000)"
      },
      {
        "label": "Triangle oblique 3D quelconque",
        "stdin": "cas:3",
        "expected": "TRIANGLE: -> NORMALE: (-0.436, 0.218, 0.873)"
      }
    ],
    "solution": "[Exemple]\nTRIANGLE: -> NORMALE: (0.000, 0.000, 1.000)\nTRIANGLE: -> NORMALE: (-1.000, 0.000, 0.000)\n\n[Cas 1 — Triangle incliné dans l’espace]\nTRIANGLE: -> NORMALE: (0.000, -0.707, 0.707)\n\n[Cas 2 — Triangle vertical plan YZ]\nTRIANGLE: -> NORMALE: (1.000, 0.000, 0.000)\n\n[Cas 3 — Triangle oblique 3D quelconque]\nTRIANGLE: -> NORMALE: (-0.436, 0.218, 0.873)"
  },
  {
    "id": "ig2-c4-e2",
    "chapter": 4,
    "title": "Applicateur de transformations affines 3D (Scale puis Translation)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la position finale d’un sommet 3D après mise à l’échelle (Scale) puis déplacement (Translation).",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nRègles matricielles (Scale puis Translation) :<br>\n- <code>x' = x * sx + tx</code><br>\n- <code>y' = y * sy + ty</code><br>\n- <code>z' = z * sz + tz</code><br>\nAfficher :<br>\n<code>TRANSFORMATION: P=(&lt;x:.2f&gt;, &lt;y:.2f&gt;, &lt;z:.2f&gt;) -&gt; P'=(&lt;x':.2f&gt;, &lt;y':.2f&gt;, &lt;z':.2f&gt;)</code></p>",
    "starter": "# Grille d'analyse (ig2-c4-e2) — Applicateur de transformations affines 3D (Scale puis Translation)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Agrandissement x10 sans déplacement]\n# Données : P=(2.5,1.0,-3.2) S=(10,10,10) T=(0,0,0)\nA_COMPLETER\n\n[Cas 2 — Échelle nulle ramenant à la translation]\n# Données : P=(100,200,300) S=(0,0,0) T=(12,34,56)\nA_COMPLETER\n\n[Cas 3 — Facteurs négatifs (inversion d’axe)]\n# Données : P=(5,10,15) S=(-1,1,-1) T=(0,0,0)\nA_COMPLETER\n",
    "hints": [
      "Multiplier chaque composante par son facteur d’échelle avant d’ajouter le décalage de translation.",
      "Arrondir à 2 décimales."
    ],
    "examples": [
      {
        "stdin": "P=(1,2,3) S=(2,2,2) T=(10,0,-5)\nP=(0,0,0) S=(1,1,1) T=(5,5,5)\nP=(4,-2,8) S=(0.5,3,-1) T=(0,10,2)",
        "expected": "TRANSFORMATION: P=(1.00, 2.00, 3.00) -> P'=(12.00, 4.00, 1.00)\nTRANSFORMATION: P=(0.00, 0.00, 0.00) -> P'=(5.00, 5.00, 5.00)\nTRANSFORMATION: P=(4.00, -2.00, 8.00) -> P'=(2.00, 4.00, -6.00)",
        "note": "Application séquentielle rigoureuse de la mise à l’échelle et de la translation."
      }
    ],
    "tests": [
      {
        "label": "Agrandissement x10 sans déplacement",
        "stdin": "cas:1",
        "expected": "TRANSFORMATION: P=(2.50, 1.00, -3.20) -> P'=(25.00, 10.00, -32.00)"
      },
      {
        "label": "Échelle nulle ramenant à la translation",
        "stdin": "cas:2",
        "expected": "TRANSFORMATION: P=(100.00, 200.00, 300.00) -> P'=(12.00, 34.00, 56.00)"
      },
      {
        "label": "Facteurs négatifs (inversion d’axe)",
        "stdin": "cas:3",
        "expected": "TRANSFORMATION: P=(5.00, 10.00, 15.00) -> P'=(-5.00, 10.00, -15.00)"
      }
    ],
    "solution": "[Exemple]\nTRANSFORMATION: P=(1.00, 2.00, 3.00) -> P'=(12.00, 4.00, 1.00)\nTRANSFORMATION: P=(0.00, 0.00, 0.00) -> P'=(5.00, 5.00, 5.00)\nTRANSFORMATION: P=(4.00, -2.00, 8.00) -> P'=(2.00, 4.00, -6.00)\n\n[Cas 1 — Agrandissement x10 sans déplacement]\nTRANSFORMATION: P=(2.50, 1.00, -3.20) -> P'=(25.00, 10.00, -32.00)\n\n[Cas 2 — Échelle nulle ramenant à la translation]\nTRANSFORMATION: P=(100.00, 200.00, 300.00) -> P'=(12.00, 34.00, 56.00)\n\n[Cas 3 — Facteurs négatifs (inversion d’axe)]\nTRANSFORMATION: P=(5.00, 10.00, 15.00) -> P'=(-5.00, 10.00, -15.00)"
  },
  {
    "id": "ig2-c4-e3",
    "chapter": 4,
    "title": "Audit de niveau de détail géométrique (LOD) selon la distance",
    "level": "n3",
    "language": "analyse",
    "goal": "Auditer la charge polygonale d’un objet 3D en temps réel selon sa distance à la caméra et détecter les surcharges de rendu.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nGrille de tolérance des paliers LOD (Level of Detail) :<br>\n- <code>D &lt; 5.0m</code> : Palier <code>LOD 0 (Gros plan)</code> -&gt; Seuil maximal <code>50000</code> polygones.<br>\n- <code>5.0m &lt;= D &lt; 20.0m</code> : Palier <code>LOD 1 (Plan moyen)</code> -&gt; Seuil maximal <code>15000</code> polygones.<br>\n- <code>20.0m &lt;= D &lt; 50.0m</code> : Palier <code>LOD 2 (Plan lointain)</code> -&gt; Seuil maximal <code>3000</code> polygones.<br>\n- <code>D &gt;= 50.0m</code> : Palier <code>LOD 3 (Arriere-plan)</code> -&gt; Seuil maximal <code>500</code> polygones.<br>\nPour chaque objet :<br>\n- Si <code>N &lt;= Seuil</code> : afficher <code>&lt;Nom&gt; [D=&lt;D&gt;m, &lt;N&gt; poly] -&gt; &lt;Palier&gt;: OPTIMAL</code><br>\n- Si <code>N &gt; Seuil</code> : calculer le surplus <code>surplus = N - Seuil</code> et afficher :<br>\n  <code>&lt;Nom&gt; [D=&lt;D&gt;m, &lt;N&gt; poly] -&gt; &lt;Palier&gt;: SURCHARGE (Depassement de &lt;surplus&gt; polygones)</code></p>",
    "starter": "# Grille d'analyse (ig2-c4-e3) — Audit de niveau de détail géométrique (LOD) selon la distance\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Frontières de distance exactes]\n# Données : OBJET=ObjetA POLYGONES=15000 DISTANCE=5.0\n# Données : OBJET=ObjetB POLYGONES=3000 DISTANCE=20.0\n# Données : OBJET=ObjetC POLYGONES=500 DISTANCE=50.0\nA_COMPLETER\n\n[Cas 2 — Gros dépassement en arrière-plan]\n# Données : OBJET=StatueFond POLYGONES=20000 DISTANCE=100.0\nA_COMPLETER\n\n[Cas 3 — Modèle optimal en gros plan]\n# Données : OBJET=HeroPrincipal POLYGONES=48000 DISTANCE=1.5\nA_COMPLETER\n",
    "hints": [
      "Tester les 4 paliers de distance : <5, <20, <50, >=50 mètres.",
      "Calculer l’écart exact en cas de dépassement."
    ],
    "examples": [
      {
        "stdin": "OBJET=Personnage POLYGONES=35000 DISTANCE=3.2\nOBJET=ArbreLointain POLYGONES=8000 DISTANCE=25.0\nOBJET=MaisonArrierePlan POLYGONES=400 DISTANCE=60.0",
        "expected": "Personnage [D=3.2m, 35000 poly] -> LOD 0 (Gros plan): OPTIMAL\nArbreLointain [D=25.0m, 8000 poly] -> LOD 2 (Plan lointain): SURCHARGE (Depassement de 5000 polygones)\nMaisonArrierePlan [D=60.0m, 400 poly] -> LOD 3 (Arriere-plan): OPTIMAL",
        "note": "L’arbre à 25m avec 8000 polygones surcharge inutilement le GPU alors que 3000 suffisent."
      }
    ],
    "tests": [
      {
        "label": "Frontières de distance exactes",
        "stdin": "cas:1",
        "expected": "ObjetA [D=5.0m, 15000 poly] -> LOD 1 (Plan moyen): OPTIMAL\nObjetB [D=20.0m, 3000 poly] -> LOD 2 (Plan lointain): OPTIMAL\nObjetC [D=50.0m, 500 poly] -> LOD 3 (Arriere-plan): OPTIMAL"
      },
      {
        "label": "Gros dépassement en arrière-plan",
        "stdin": "cas:2",
        "expected": "StatueFond [D=100.0m, 20000 poly] -> LOD 3 (Arriere-plan): SURCHARGE (Depassement de 19500 polygones)"
      },
      {
        "label": "Modèle optimal en gros plan",
        "stdin": "cas:3",
        "expected": "HeroPrincipal [D=1.5m, 48000 poly] -> LOD 0 (Gros plan): OPTIMAL"
      }
    ],
    "solution": "[Exemple]\nPersonnage [D=3.2m, 35000 poly] -> LOD 0 (Gros plan): OPTIMAL\nArbreLointain [D=25.0m, 8000 poly] -> LOD 2 (Plan lointain): SURCHARGE (Depassement de 5000 polygones)\nMaisonArrierePlan [D=60.0m, 400 poly] -> LOD 3 (Arriere-plan): OPTIMAL\n\n[Cas 1 — Frontières de distance exactes]\nObjetA [D=5.0m, 15000 poly] -> LOD 1 (Plan moyen): OPTIMAL\nObjetB [D=20.0m, 3000 poly] -> LOD 2 (Plan lointain): OPTIMAL\nObjetC [D=50.0m, 500 poly] -> LOD 3 (Arriere-plan): OPTIMAL\n\n[Cas 2 — Gros dépassement en arrière-plan]\nStatueFond [D=100.0m, 20000 poly] -> LOD 3 (Arriere-plan): SURCHARGE (Depassement de 19500 polygones)\n\n[Cas 3 — Modèle optimal en gros plan]\nHeroPrincipal [D=1.5m, 48000 poly] -> LOD 0 (Gros plan): OPTIMAL"
  }
];
