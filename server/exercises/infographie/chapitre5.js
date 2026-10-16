'use strict';

module.exports = [
  {
    "id": "ig2-c5-e1",
    "chapter": 5,
    "title": "Calculateur d’illumination diffuse de Lambert",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la contribution de lumière diffuse reçue par une surface 3D selon la loi du cosinus de Lambert.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nLoi de Lambert :<br>\n1. Produit scalaire : <code>dot = nx * lx + ny * ly + nz * lz</code>.<br>\n2. Intensité diffuse : <code>Id = max(0.0, dot)</code>.<br>\nAfficher :<br>\n<code>LAMBERT: N=(&lt;nx:.2f&gt;,&lt;ny:.2f&gt;,&lt;nz:.2f&gt;) L=(&lt;lx:.2f&gt;,&lt;ly:.2f&gt;,&lt;lz:.2f&gt;) -&gt; INTENSITE: &lt;Id:.3f&gt;</code></p>",
    "starter": "# Grille d'analyse (ig2-c5-e1) — Calculateur d’illumination diffuse de Lambert\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Incidence rasante 90 degrés perpendiculaire]\n# Données : N=(1,0,0) L=(0,1,0)\nA_COMPLETER\n\n[Cas 2 — Vecteurs obliques 3D]\n# Données : N=(0.577,0.577,0.577) L=(0.577,0.577,0.577)\nA_COMPLETER\n\n[Cas 3 — Lumière rasante faible]\n# Données : N=(0,0,1) L=(0.968,0,0.25)\nA_COMPLETER\n",
    "hints": [
      "Si le produit scalaire est négatif, la surface est orientée à l’opposé de la source lumineuse (intensité 0.000).",
      "Arrondir à 3 décimales."
    ],
    "examples": [
      {
        "stdin": "N=(0,1,0) L=(0,1,0)\nN=(0,1,0) L=(0,-1,0)\nN=(0,1,0) L=(0.707,0.707,0)",
        "expected": "LAMBERT: N=(0.00,1.00,0.00) L=(0.00,1.00,0.00) -> INTENSITE: 1.000\nLAMBERT: N=(0.00,1.00,0.00) L=(0.00,-1.00,0.00) -> INTENSITE: 0.000\nLAMBERT: N=(0.00,1.00,0.00) L=(0.71,0.71,0.00) -> INTENSITE: 0.707",
        "note": "Face à face = 1.0, dos à la lumière = 0.0, inclinaison 45 degrés = 0.707."
      }
    ],
    "tests": [
      {
        "label": "Incidence rasante 90 degrés perpendiculaire",
        "stdin": "cas:1",
        "expected": "LAMBERT: N=(1.00,0.00,0.00) L=(0.00,1.00,0.00) -> INTENSITE: 0.000"
      },
      {
        "label": "Vecteurs obliques 3D",
        "stdin": "cas:2",
        "expected": "LAMBERT: N=(0.58,0.58,0.58) L=(0.58,0.58,0.58) -> INTENSITE: 0.999"
      },
      {
        "label": "Lumière rasante faible",
        "stdin": "cas:3",
        "expected": "LAMBERT: N=(0.00,0.00,1.00) L=(0.97,0.00,0.25) -> INTENSITE: 0.250"
      }
    ],
    "solution": "[Exemple]\nLAMBERT: N=(0.00,1.00,0.00) L=(0.00,1.00,0.00) -> INTENSITE: 1.000\nLAMBERT: N=(0.00,1.00,0.00) L=(0.00,-1.00,0.00) -> INTENSITE: 0.000\nLAMBERT: N=(0.00,1.00,0.00) L=(0.71,0.71,0.00) -> INTENSITE: 0.707\n\n[Cas 1 — Incidence rasante 90 degrés perpendiculaire]\nLAMBERT: N=(1.00,0.00,0.00) L=(0.00,1.00,0.00) -> INTENSITE: 0.000\n\n[Cas 2 — Vecteurs obliques 3D]\nLAMBERT: N=(0.58,0.58,0.58) L=(0.58,0.58,0.58) -> INTENSITE: 0.999\n\n[Cas 3 — Lumière rasante faible]\nLAMBERT: N=(0.00,0.00,1.00) L=(0.97,0.00,0.25) -> INTENSITE: 0.250"
  },
  {
    "id": "ig2-c5-e2",
    "chapter": 5,
    "title": "Calculateur de reflet spéculaire de Phong",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la tâche de brillance spéculaire selon le modèle de Phong à partir du vecteur reflet, du vecteur observateur et du coefficient de rugosité.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nModèle spéculaire de Phong :<br>\n1. Produit scalaire entre le rayon réfléchi R et la direction de vue V : <code>dot = rx*vx + ry*vy + rz*vz</code>.<br>\n2. Si <code>dot &lt;= 0.0</code> : <code>Is = 0.000</code>.<br>\n3. Sinon : <code>Is = (dot) ** ALPHA</code>.<br>\nAfficher :<br>\n<code>PHONG: ALPHA=&lt;ALPHA&gt; -&gt; INTENSITE_SPECULAIRE: &lt;Is:.3f&gt;</code></p>",
    "starter": "# Grille d'analyse (ig2-c5-e2) — Calculateur de reflet spéculaire de Phong\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matériau semi-brillant alpha 8 à 30 degrés]\n# Données : R=(0.5,0,0.866) V=(0,0,1) ALPHA=8\nA_COMPLETER\n\n[Cas 2 — Matériau ultra-brillant chrome alpha 128]\n# Données : R=(0.1,0,0.995) V=(0,0,1) ALPHA=128\nA_COMPLETER\n\n[Cas 3 — Reflet dans le dos de l’observateur]\n# Données : R=(-0.5,-0.5,-0.707) V=(0,0,1) ALPHA=64\nA_COMPLETER\n",
    "hints": [
      "Un exposant alpha élevé (ex: 64 ou 128) crée un reflet métallique concentré très net.",
      "Un faible alpha (ex: 4 ou 8) diffuse une tâche mate étalée."
    ],
    "examples": [
      {
        "stdin": "R=(0,0,1) V=(0,0,1) ALPHA=32\nR=(0,0,1) V=(0,0,-1) ALPHA=32\nR=(0.707,0,0.707) V=(0,0,1) ALPHA=16",
        "expected": "PHONG: ALPHA=32 -> INTENSITE_SPECULAIRE: 1.000\nPHONG: ALPHA=32 -> INTENSITE_SPECULAIRE: 0.000\nPHONG: ALPHA=16 -> INTENSITE_SPECULAIRE: 0.004",
        "note": "Alignement parfait = 1.0, reflet opposé = 0.0, désalignement modéré avec alpha 16 = quasi nul."
      }
    ],
    "tests": [
      {
        "label": "Matériau semi-brillant alpha 8 à 30 degrés",
        "stdin": "cas:1",
        "expected": "PHONG: ALPHA=8 -> INTENSITE_SPECULAIRE: 0.316"
      },
      {
        "label": "Matériau ultra-brillant chrome alpha 128",
        "stdin": "cas:2",
        "expected": "PHONG: ALPHA=128 -> INTENSITE_SPECULAIRE: 0.526"
      },
      {
        "label": "Reflet dans le dos de l’observateur",
        "stdin": "cas:3",
        "expected": "PHONG: ALPHA=64 -> INTENSITE_SPECULAIRE: 0.000"
      }
    ],
    "solution": "[Exemple]\nPHONG: ALPHA=32 -> INTENSITE_SPECULAIRE: 1.000\nPHONG: ALPHA=32 -> INTENSITE_SPECULAIRE: 0.000\nPHONG: ALPHA=16 -> INTENSITE_SPECULAIRE: 0.004\n\n[Cas 1 — Matériau semi-brillant alpha 8 à 30 degrés]\nPHONG: ALPHA=8 -> INTENSITE_SPECULAIRE: 0.316\n\n[Cas 2 — Matériau ultra-brillant chrome alpha 128]\nPHONG: ALPHA=128 -> INTENSITE_SPECULAIRE: 0.526\n\n[Cas 3 — Reflet dans le dos de l’observateur]\nPHONG: ALPHA=64 -> INTENSITE_SPECULAIRE: 0.000"
  },
  {
    "id": "ig2-c5-e3",
    "chapter": 5,
    "title": "Vérificateur de conservation d’énergie PBR (Roughness & Metallic)",
    "level": "n3",
    "language": "analyse",
    "goal": "Valider la cohérence physique des composantes de réflexion selon les lois de l’optique du rendu basé sur la physique (PBR).",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nRègles physiques PBR :<br>\n1. <strong>Loi de conservation d'énergie</strong> : la somme de la lumière réfléchie (diffuse + spéculaire) ne peut jamais dépasser la lumière incidente :<br>\n   <code>Total = Diffuse + Speculaire</code>.<br>\n   Si <code>Total &gt; 1.0001</code> : <code>DIAGNOSTIC: VIOLATION_ENERGIE (Creation spontanee de lumiere: &lt;Total:.3f&gt; &gt; 1.0)</code>.<br>\n2. <strong>Règle des métaux (Conducteurs vs Diélectriques)</strong> :<br>\n   Dans la physique des métaux réels (<code>METALLIC=1</code>), la quasi-totalité des électrons libres absorbe la réfraction interne : il n'y a AUCUNE réflexion diffuse sous-surfacique (<code>DIFFUSE == 0.0</code>).<br>\n   Si <code>METALLIC=1</code> et <code>DIFFUSE &gt; 0.0</code> : <code>DIAGNOSTIC: VIOLATION_METALLIC (Un metal pur ne possede aucune reflexion diffuse)</code>.<br>\n3. Si toutes les conditions sont respectées :<br>\n   <code>DIAGNOSTIC: CONFORME_PBR (Bilan d'energie &lt;Total:.3f&gt; &lt;= 1.0)</code>.<br>\nAfficher :<br>\n<code>&lt;Nom&gt; -&gt; &lt;DIAGNOSTIC&gt;</code></p>",
    "starter": "# Grille d'analyse (ig2-c5-e3) — Vérificateur de conservation d’énergie PBR (Roughness & Metallic)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matériau absorbant noir mat]\n# Données : MATERIEL=Charbon METALLIC=0 DIFFUSE=0.050 SPECULAIRE=0.040\nA_COMPLETER\n\n[Cas 2 — Miroir parfait 100% spéculaire]\n# Données : MATERIEL=Miroir METALLIC=1 DIFFUSE=0.000 SPECULAIRE=1.000\nA_COMPLETER\n\n[Cas 3 — Légère violation d’énergie 1.05]\n# Données : MATERIEL=SurfLumineuse METALLIC=0 DIFFUSE=0.700 SPECULAIRE=0.350\nA_COMPLETER\n",
    "hints": [
      "Tester d’abord la conservation d’énergie globale.",
      "Tester ensuite la règle d’absence de composante diffuse pour les métaux purs."
    ],
    "examples": [
      {
        "stdin": "MATERIEL=PlastiqueBleu METALLIC=0 DIFFUSE=0.600 SPECULAIRE=0.300\nMATERIEL=ChromePur METALLIC=1 DIFFUSE=0.000 SPECULAIRE=0.950\nMATERIEL=MateriauMagique METALLIC=0 DIFFUSE=0.800 SPECULAIRE=0.400\nMATERIEL=FauxMetal METALLIC=1 DIFFUSE=0.200 SPECULAIRE=0.800",
        "expected": "PlastiqueBleu -> DIAGNOSTIC: CONFORME_PBR (Bilan d'energie 0.900 <= 1.0)\nChromePur -> DIAGNOSTIC: CONFORME_PBR (Bilan d'energie 0.950 <= 1.0)\nMateriauMagique -> DIAGNOSTIC: VIOLATION_ENERGIE (Creation spontanee de lumiere: 1.200 > 1.0)\nFauxMetal -> DIAGNOSTIC: VIOLATION_METALLIC (Un metal pur ne possede aucune reflexion diffuse)",
        "note": "Validation stricte des lois physiques régissant les shaders PBR modernes."
      }
    ],
    "tests": [
      {
        "label": "Matériau absorbant noir mat",
        "stdin": "cas:1",
        "expected": "Charbon -> DIAGNOSTIC: CONFORME_PBR (Bilan d'energie 0.090 <= 1.0)"
      },
      {
        "label": "Miroir parfait 100% spéculaire",
        "stdin": "cas:2",
        "expected": "Miroir -> DIAGNOSTIC: CONFORME_PBR (Bilan d'energie 1.000 <= 1.0)"
      },
      {
        "label": "Légère violation d’énergie 1.05",
        "stdin": "cas:3",
        "expected": "SurfLumineuse -> DIAGNOSTIC: VIOLATION_ENERGIE (Creation spontanee de lumiere: 1.050 > 1.0)"
      }
    ],
    "solution": "[Exemple]\nPlastiqueBleu -> DIAGNOSTIC: CONFORME_PBR (Bilan d'energie 0.900 <= 1.0)\nChromePur -> DIAGNOSTIC: CONFORME_PBR (Bilan d'energie 0.950 <= 1.0)\nMateriauMagique -> DIAGNOSTIC: VIOLATION_ENERGIE (Creation spontanee de lumiere: 1.200 > 1.0)\nFauxMetal -> DIAGNOSTIC: VIOLATION_METALLIC (Un metal pur ne possede aucune reflexion diffuse)\n\n[Cas 1 — Matériau absorbant noir mat]\nCharbon -> DIAGNOSTIC: CONFORME_PBR (Bilan d'energie 0.090 <= 1.0)\n\n[Cas 2 — Miroir parfait 100% spéculaire]\nMiroir -> DIAGNOSTIC: CONFORME_PBR (Bilan d'energie 1.000 <= 1.0)\n\n[Cas 3 — Légère violation d’énergie 1.05]\nSurfLumineuse -> DIAGNOSTIC: VIOLATION_ENERGIE (Creation spontanee de lumiere: 1.050 > 1.0)"
  }
];
