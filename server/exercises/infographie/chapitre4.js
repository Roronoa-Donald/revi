'use strict';

module.exports = [
  {
    "id": "ig2-c4-e1",
    "chapter": 4,
    "title": "Calculateur de normale d’un triangle 3D (Produit vectoriel)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le vecteur normal unitaire perpendiculaire à une face polygonale 3D pour le calcul d’ombrage.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Les trois sommets sont supposés non alignés : si la norme du produit vectoriel est nulle, la normale unitaire est indéfinie et le cas est hors du modèle de cette grille.<br>\nFormules géométriques :<br>\n1. Vecteur <code>u = B - A = (x2-x1, y2-y1, z2-z1)</code>.<br>\n2. Vecteur <code>v = C - A = (x3-x1, y3-y1, z3-z1)</code>.<br>\n3. Produit vectoriel <code>n = u x v</code> :<br>\n   <code>nx = uy * vz - uz * vy</code><br>\n   <code>ny = uz * vx - ux * vz</code><br>\n   <code>nz = ux * vy - uy * vx</code><br>\n4. Normalisation unitaire : <code>norme = sqrt(nx^2 + ny^2 + nz^2)</code>.<br>\n   <code>(Nx, Ny, Nz) = (nx/norme, ny/norme, nz/norme)</code>.<br>\nAfficher :<br>\n<code>TRIANGLE: -&gt; NORMALE: (&lt;Nx:.3f&gt;, &lt;Ny:.3f&gt;, &lt;Nz:.3f&gt;)</code></p>",
    "starter": "# Grille d'analyse (ig2-c4-e1) — Calculateur de normale d’un triangle 3D (Produit vectoriel)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Triangle incliné dans l’espace]\n# Données : A=(1,1,1) B=(2,1,1) C=(1,2,2)\nA_COMPLETER\n\n[Cas 2 — Triangle vertical plan YZ]\n# Données : A=(0,0,0) B=(0,1,0) C=(0,0,1)\nA_COMPLETER\n\n[Cas 3 — Triangle oblique 3D quelconque]\n# Données : A=(0,0,0) B=(2,0,1) C=(1,2,0)\nA_COMPLETER\n",
    "hints": [
      "L’ordre des sommets (sens trigonométrique CCW) détermine l’orientation de la normale.",
      "Arrondir à 3 décimales.",
      "Calculez les vecteurs AB = B - A et AC = C - A, prenez le produit vectoriel AB x AC puis divisez chaque composante par sa norme euclidienne (3 décimales)."
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
    "solution": "[Exemple]\nTRIANGLE: -> NORMALE: (0.000, 0.000, 1.000)\nTRIANGLE: -> NORMALE: (-1.000, 0.000, 0.000)\n\n[Cas 1 — Triangle incliné dans l’espace]\nTRIANGLE: -> NORMALE: (0.000, -0.707, 0.707)\n\n[Cas 2 — Triangle vertical plan YZ]\nTRIANGLE: -> NORMALE: (1.000, 0.000, 0.000)\n\n[Cas 3 — Triangle oblique 3D quelconque]\nTRIANGLE: -> NORMALE: (-0.436, 0.218, 0.873)",
    "takeaway": "À retenir : Calculer le vecteur normal unitaire perpendiculaire à une face polygonale 3D pour le calcul d’ombrage.\nRepère : Le triangle dans le plan XY pointe selon l’axe Z positif."
  },
  {
    "id": "ig2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le lampadaire du quartier virtuel",
    "exampleTitle": "Exemple résolu — le banc public du parc",
    "goal": "Composer les transformations affines d'un objet 3D dans l'ordre canonique et mesurer l'effet d'un ordre erroné.",
    "brief": "<p><strong>Énoncé.</strong> Tom habille une maquette 3D de quartier. Le lampadaire est modélisé autour de son origine locale ; le sommet du luminaire a pour coordonnées locales <strong>P = (2, 3, −1)</strong> (en mètres). Tom applique l'ordre canonique du cours : une mise à l'échelle uniforme de facteur <strong>3</strong> (Scale), aucune rotation, puis une translation de vecteur <strong>(10, 0, 5)</strong> pour poser le lampadaire au bord du trottoir. La formule du pipeline est <code>P' = T · R · S · P</code>.</p><p>Répondez aux questions 1 à 3 par le vecteur au format (6, 9, -3) ; les questions 4 et 5 appellent quelques mots.</p><ol><li>Quelles sont les coordonnées de P après la mise à l'échelle seule ?</li><li>Quelles sont les coordonnées finales de P avec l'ordre canonique ?</li><li>Quelles seraient les coordonnées finales si Tom appliquait la translation AVANT la mise à l'échelle ?</li><li>Dans l'ordre canonique, autour de quel point l'objet pivote-t-il lors d'une rotation ?</li><li>Citez les trois transformations dans l'ordre où le pipeline les applique aux sommets (format : Scale, Rotation, Translation).</li></ol>",
    "starter": "# Exercice — Le lampadaire du quartier virtuel\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : vecteur au format (6, 9, -3). Questions 4 et 5 : quelques mots.\n\n[Question 1 — Coordonnées après le Scale]\nA_COMPLETER\n\n[Question 2 — Coordonnées finales (ordre canonique)]\nA_COMPLETER\n\n[Question 3 — Coordonnées finales (translation avant échelle)]\nA_COMPLETER\n\n[Question 4 — Point de pivot de la rotation]\nA_COMPLETER\n\n[Question 5 — Ordre du pipeline]\nA_COMPLETER\n",
    "hints": [
      "L'ordre P' = T · R · S · P signifie que le Scale touche le point en premier, la Translation en dernier.",
      "L'échelle est relative à l'origine locale : appliquée après la translation, elle éloigne l'objet du centre du monde.",
      "1. P × 3 = (6, 9, −3). 2. Puis (6 + 10, 9 + 0, −3 + 5) = (16, 9, 2). 3. Dans l'autre sens : (2 + 10, 3 + 0, −1 + 5) = (12, 3, 4), puis × 3 = (36, 9, 12). 4. La rotation se fait autour de l'origine locale. 5. Scale, Rotation, Translation."
    ],
    "examples": [
      {
        "stdin": "Le parc place un banc de sommet local P = (1, 2, 4), mis à l'échelle × 2 puis translaté de (4, 1, 1).\n\n1) Après le Scale : (2, 4, 8).\n2) Ordre canonique : (2 + 4, 4 + 1, 8 + 1) = (6, 5, 9).\n3) Translation d'abord : (1 + 4, 2 + 1, 4 + 1) = (5, 3, 5), puis × 2 = (10, 6, 10).\n4) La rotation pivote l'objet autour de son origine locale.\n5) Ordre du pipeline : Scale, Rotation, Translation.",
        "expected": "(2, 4, 8) — (6, 5, 9) — (10, 6, 10) dans le mauvais ordre — rotation autour de l'origine locale — Scale, Rotation, Translation",
        "note": "L'échelle multiplie aussi la position : appliquée en dernier, elle projette l'objet loin de sa place. Le pipeline impose donc Scale, puis Rotation, puis Translation."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Coordonnées après le Scale",
        "stdin": "q:1",
        "expected": "(6, 9, -3)||(6,9,-3)||(6, 9, −3)||(6 ; 9 ; -3)||6 9 -3"
      },
      {
        "label": "Question 2 — Coordonnées finales (ordre canonique)",
        "stdin": "q:2",
        "expected": "(16, 9, 2)||(16,9,2)||(16 ; 9 ; 2)||16 9 2"
      },
      {
        "label": "Question 3 — Coordonnées finales (translation avant échelle)",
        "stdin": "q:3",
        "expected": "(36, 9, 12)||(36,9,12)||(36 ; 9 ; 12)||36 9 12"
      },
      {
        "label": "Question 4 — Point de pivot de la rotation",
        "stdin": "q:4",
        "expected": "son origine locale||l'origine locale||origine locale||lui-même"
      },
      {
        "label": "Question 5 — Ordre du pipeline",
        "stdin": "q:5",
        "expected": "Scale, Rotation, Translation||SRT||Scale puis Rotation puis Translation||scale, rotation, translation"
      }
    ],
    "solution": "[Question 1 — Coordonnées après le Scale]\n(6, 9, -3)\n\n[Question 2 — Coordonnées finales (ordre canonique)]\n(16, 9, 2)\n\n[Question 3 — Coordonnées finales (translation avant échelle)]\n(36, 9, 12)\n\n[Question 4 — Point de pivot de la rotation]\nson origine locale\n\n[Question 5 — Ordre du pipeline]\nScale, Rotation, Translation",
    "takeaway": "1) Scale seul : chaque coordonnée × 3, donc (2 × 3, 3 × 3, −1 × 3) = (6, 9, −3).\n2) Ordre canonique : après le Scale vient la Translation, donc (6 + 10, 9 + 0, −3 + 5) = (16, 9, 2).\n3) Translation d'abord : (2 + 10, 3 + 0, −1 + 5) = (12, 3, 4), puis échelle × 3 : (36, 9, 12). L'objet se retrouve repoussé bien plus loin.\n4) En ordre canonique, la rotation s'applique avant la translation : l'objet pivote sur lui-même, autour de son origine locale.\n5) Le pipeline applique Scale, puis Rotation, puis Translation (P' = T · R · S · P).\nContrôle : dans le mauvais ordre, le x final vaut 36 au lieu de 16 : l'échelle a multiplié une position déjà translatée."
  },
  {
    "id": "ig2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Les LOD du château médiéval",
    "exampleTitle": "Exemple résolu — les LOD de la forêt de pins",
    "goal": "Auditer la charge polygonale d'une scène selon les distances d'activation des niveaux de détail et chiffrer l'économie obtenue.",
    "brief": "<p><strong>Énoncé.</strong> Le jeu d'aventure « Fief » affiche <strong>8 exemplaires</strong> du même château médiéval dans sa scène d'ouverture. Le moteur active quatre niveaux de détail (LOD) selon la distance à la caméra :</p><table><tr><th>LOD</th><th>Triangles</th><th>Distance d'utilisation</th></tr><tr><th>LOD0</th><td>50 000</td><td>moins de 20 m</td></tr><tr><th>LOD1</th><td>12 000</td><td>de 20 m à 60 m</td></tr><tr><th>LOD2</th><td>3 000</td><td>de 60 m à 150 m</td></tr><tr><th>LOD3</th><td>400</td><td>au-delà de 150 m</td></tr></table><p>Les 8 châteaux se répartissent ainsi : 2 à 12 m, 3 à 35 m, 2 à 80 m et 1 à 200 m. Répondez par le nombre seul ; la question 5 par le code du LOD.</p><ol><li>Combien de châteaux sont rendus en LOD1 ?</li><li>Combien de triangles la scène rend-elle au total avec les LOD actifs ?</li><li>Combien de triangles faudrait-il si les 8 châteaux restaient en LOD0 ?</li><li>Quel pourcentage de triangles les LOD font-ils économiser (arrondi à l'unité) ?</li><li>Quel LOD est actif pour le château placé à 80 m ?</li></ol>",
    "starter": "# Exercice — Les LOD du château médiéval\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : nombre seul. Question 5 : code du LOD.\n\n[Question 1 — Châteaux rendus en LOD1]\nA_COMPLETER\n\n[Question 2 — Total de triangles avec les LOD]\nA_COMPLETER\n\n[Question 3 — Total sans LOD (tout en LOD0)]\nA_COMPLETER\n\n[Question 4 — Pourcentage de triangles économisés]\nA_COMPLETER\n\n[Question 5 — LOD actif à 80 m]\nA_COMPLETER\n",
    "hints": [
      "Rangez chaque château dans sa tranche de distance avant tout calcul.",
      "Le total multiplie le nombre de châteaux de chaque tranche par les triangles du LOD correspondant, puis additionne.",
      "1. À 35 m, on est entre 20 et 60 m. 2. 2 × 50 000 + 3 × 12 000 + 2 × 3 000 + 1 × 400 = 142 400. 3. 8 × 50 000 = 400 000. 4. (400 000 − 142 400) / 400 000 = 64,4 %. 5. 80 m tombe entre 60 et 150 m."
    ],
    "examples": [
      {
        "stdin": "Une forêt de pins utilise 3 LOD : LOD0 8 000 triangles (moins de 15 m), LOD1 2 000 (15 à 50 m), LOD2 500 (au-delà).\n17 arbres : 2 à 10 m, 5 à 30 m, 10 à 70 m.\n\n1) Les 5 arbres à 30 m passent en LOD1.\n2) Total : 2 × 8 000 + 5 × 2 000 + 10 × 500 = 31 000 triangles.\n3) Sans LOD : 17 × 8 000 = 136 000 triangles.\n4) Économie : (136 000 − 31 000) / 136 000 = 77 %.\n5) Les arbres à 70 m utilisent le LOD2.",
        "expected": "5 arbres en LOD1 — 31 000 triangles — 136 000 sans LOD — 77 % d'économie — LOD2 à 70 m",
        "note": "Un objet éloigné ne couvre que quelques dizaines de pixels à l'écran : lui donner des dizaines de milliers de triangles est un gaspillage que le LOD supprime."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Châteaux rendus en LOD1",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Total de triangles avec les LOD",
        "stdin": "q:2",
        "expected": "142400||142 400"
      },
      {
        "label": "Question 3 — Total sans LOD (tout en LOD0)",
        "stdin": "q:3",
        "expected": "400000||400 000"
      },
      {
        "label": "Question 4 — Pourcentage de triangles économisés",
        "stdin": "q:4",
        "expected": "64||64 %||64%"
      },
      {
        "label": "Question 5 — LOD actif à 80 m",
        "stdin": "q:5",
        "expected": "LOD2||lod2||LOD 2"
      }
    ],
    "solution": "[Question 1 — Châteaux rendus en LOD1]\n3\n\n[Question 2 — Total de triangles avec les LOD]\n142400\n\n[Question 3 — Total sans LOD (tout en LOD0)]\n400000\n\n[Question 4 — Pourcentage de triangles économisés]\n64\n\n[Question 5 — LOD actif à 80 m]\nLOD2",
    "takeaway": "1) Les châteaux à 35 m (3 exemplaires) tombent dans la tranche 20–60 m : 3 châteaux en LOD1.\n2) Total : 2 × 50 000 (LOD0) + 3 × 12 000 (LOD1) + 2 × 3 000 (LOD2) + 1 × 400 (LOD3) = 100 000 + 36 000 + 6 000 + 400 = 142 400 triangles.\n3) Sans LOD : 8 × 50 000 = 400 000 triangles.\n4) Économie : (400 000 − 142 400) / 400 000 = 257 600 / 400 000 = 64,4 %, arrondi à 64 %.\n5) 80 m se situe entre 60 et 150 m : c'est le LOD2 (3 000 triangles) qui est actif.\nContrôle : 2 + 3 + 2 + 1 = 8 châteaux, toutes les tranches sont couvertes."
  }
];
