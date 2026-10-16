'use strict';

module.exports = [
  {
    "id": "ig2-c6-e1",
    "chapter": 6,
    "title": "Calculateur de compression de textures GPU et bande passante",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer l’empreinte mémoire d’une texture compressée sur GPU (BC1, BC3, BC7, ASTC) et le débit bande passante requis à 60 FPS.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nBits par pixel (bpp) selon le format :<br>\n- <code>RGBA8</code> : 32 bpp (4 octets / pixel)<br>\n- <code>BC1</code> : 4 bpp (0.5 octet / pixel)<br>\n- <code>BC3</code> : 8 bpp (1.0 octet / pixel)<br>\n- <code>BC7</code> : 8 bpp (1.0 octet / pixel)<br>\n- <code>ASTC_4x4</code> : 8 bpp (1.0 octet / pixel)<br>\n- <code>ASTC_8x8</code> : 2 bpp (0.25 octet / pixel)<br>\nFormules :<br>\n1. <code>taille_octets = L * H * (bpp / 8)</code><br>\n2. <code>taille_Ko = taille_octets / 1024</code><br>\n3. <code>ratio_compression = 32.0 / bpp</code> (par rapport à RGBA8 non compressé)<br>\n4. <code>debit_Mo_s = (taille_octets * 60) / (1024 * 1024)</code> (à 60 images/seconde).<br>\nAfficher pour chaque ligne :<br>\n<code>TEXTURE: &lt;nom&gt; (&lt;L&gt;x&lt;H&gt;) | FORMAT: &lt;FORMAT&gt; (&lt;bpp&gt; bpp) | TAILLE: &lt;taille_Ko:.1f&gt; Ko | RATIO: &lt;ratio:.1f&gt;x | DEBIT_60FPS: &lt;debit:.2f&gt; Mo/s</code></p>",
    "starter": "# Grille d'analyse (ig2-c6-e1) — Calculateur de compression de textures GPU et bande passante\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Compression agressive ASTC 8x8 pour mobile]\n# Données : TEXTURE nom=decor_arriere L=1024 H=1024 FORMAT=ASTC_8x8\nA_COMPLETER\n\n[Cas 2 — Texture 4K en BC3 avec canal alpha]\n# Données : TEXTURE nom=feuillage_arbres L=4096 H=4096 FORMAT=BC3\nA_COMPLETER\n\n[Cas 3 — ASTC 4x4 standard qualité]\n# Données : TEXTURE nom=personnage_peau L=512 H=512 FORMAT=ASTC_4x4\nA_COMPLETER\n",
    "hints": [
      "ASTC 8x8 offre un ratio de 16.0x (2 bpp) idéal pour les textures diffuses mobiles.",
      "Veiller à arrondir taille_Ko à 1 décimale et debit_Mo_s à 2 décimales."
    ],
    "examples": [
      {
        "stdin": "TEXTURE nom=diffuse_sol L=2048 H=2048 FORMAT=BC1\nTEXTURE nom=normal_mur L=2048 H=2048 FORMAT=BC7\nTEXTURE nom=ui_hud L=1024 H=1024 FORMAT=RGBA8",
        "expected": "TEXTURE: diffuse_sol (2048x2048) | FORMAT: BC1 (4 bpp) | TAILLE: 2048.0 Ko | RATIO: 8.0x | DEBIT_60FPS: 120.00 Mo/s\nTEXTURE: normal_mur (2048x2048) | FORMAT: BC7 (8 bpp) | TAILLE: 4096.0 Ko | RATIO: 4.0x | DEBIT_60FPS: 240.00 Mo/s\nTEXTURE: ui_hud (1024x1024) | FORMAT: RGBA8 (32 bpp) | TAILLE: 4096.0 Ko | RATIO: 1.0x | DEBIT_60FPS: 240.00 Mo/s",
        "note": "Une texture 2K en BC1 pèse 2 Mo au lieu de 16 Mo en RGBA8 non compressé."
      }
    ],
    "tests": [
      {
        "label": "Compression agressive ASTC 8x8 pour mobile",
        "stdin": "cas:1",
        "expected": "TEXTURE: decor_arriere (1024x1024) | FORMAT: ASTC_8x8 (2 bpp) | TAILLE: 256.0 Ko | RATIO: 16.0x | DEBIT_60FPS: 15.00 Mo/s"
      },
      {
        "label": "Texture 4K en BC3 avec canal alpha",
        "stdin": "cas:2",
        "expected": "TEXTURE: feuillage_arbres (4096x4096) | FORMAT: BC3 (8 bpp) | TAILLE: 16384.0 Ko | RATIO: 4.0x | DEBIT_60FPS: 960.00 Mo/s"
      },
      {
        "label": "ASTC 4x4 standard qualité",
        "stdin": "cas:3",
        "expected": "TEXTURE: personnage_peau (512x512) | FORMAT: ASTC_4x4 (8 bpp) | TAILLE: 256.0 Ko | RATIO: 4.0x | DEBIT_60FPS: 15.00 Mo/s"
      }
    ],
    "solution": "[Exemple]\nTEXTURE: diffuse_sol (2048x2048) | FORMAT: BC1 (4 bpp) | TAILLE: 2048.0 Ko | RATIO: 8.0x | DEBIT_60FPS: 120.00 Mo/s\nTEXTURE: normal_mur (2048x2048) | FORMAT: BC7 (8 bpp) | TAILLE: 4096.0 Ko | RATIO: 4.0x | DEBIT_60FPS: 240.00 Mo/s\nTEXTURE: ui_hud (1024x1024) | FORMAT: RGBA8 (32 bpp) | TAILLE: 4096.0 Ko | RATIO: 1.0x | DEBIT_60FPS: 240.00 Mo/s\n\n[Cas 1 — Compression agressive ASTC 8x8 pour mobile]\nTEXTURE: decor_arriere (1024x1024) | FORMAT: ASTC_8x8 (2 bpp) | TAILLE: 256.0 Ko | RATIO: 16.0x | DEBIT_60FPS: 15.00 Mo/s\n\n[Cas 2 — Texture 4K en BC3 avec canal alpha]\nTEXTURE: feuillage_arbres (4096x4096) | FORMAT: BC3 (8 bpp) | TAILLE: 16384.0 Ko | RATIO: 4.0x | DEBIT_60FPS: 960.00 Mo/s\n\n[Cas 3 — ASTC 4x4 standard qualité]\nTEXTURE: personnage_peau (512x512) | FORMAT: ASTC_4x4 (8 bpp) | TAILLE: 256.0 Ko | RATIO: 4.0x | DEBIT_60FPS: 15.00 Mo/s"
  },
  {
    "id": "ig2-c6-e2",
    "chapter": 6,
    "title": "Optimiseur de Draw Calls et Static Batching",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler le regroupement d’objets 3D partageant le même matériau pour réduire les appels de dessin (Draw Calls).",
    "brief": "<p>Chaque changement de matériau impose une rupture de batch et un appel de dessin distinct sur le GPU.<br>\nAnalysez les données fournies pour chaque cas.<br>\nContrainte de batching : un batch supporte au maximum 65535 sommets (indexation 16 bits).<br>\nRègles :<br>\n1. Grouper les objets par matériau <code>mat_id</code> (par ordre alphabétique de <code>mat_id</code>).<br>\n2. Pour chaque matériau :<br>\n   - Calculer le nombre total d'objets <code>nb_obj</code> et le cumul des sommets <code>total_sommets</code>.<br>\n   - Le nombre de Draw Calls nécessaires est <code>ceil(total_sommets / 65535)</code> (ou 1 si total_sommets == 0).<br>\n   - Afficher : <code>MAT: &lt;mat_id&gt; -&gt; &lt;nb_obj&gt; objet(s), &lt;total_sommets&gt; sommets =&gt; &lt;nb_dc&gt; Draw Call(s)</code>.<br>\n3. En conclusion, afficher :<br>\n   - <code>dc_init = nombre total d'objets</code>.<br>\n   - <code>dc_opti = somme des Draw Calls de tous les matériaux</code>.<br>\n   - <code>gain = ((dc_init - dc_opti) / dc_init) * 100</code>.<br>\n   <code>BILAN: INITIAL = &lt;dc_init&gt; DC -&gt; OPTIMISE = &lt;dc_opti&gt; DC | GAIN: &lt;gain:.1f&gt;%</code></p>",
    "starter": "# Grille d'analyse (ig2-c6-e2) — Optimiseur de Draw Calls et Static Batching\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matériau dépassant le tampon 16 bits de 65535 sommets]\n# Données : OBJET id=montagne1 MAT=roche SOMMETS=40000\n# Données : OBJET id=montagne2 MAT=roche SOMMETS=35000\nA_COMPLETER\n\n[Cas 2 — Nombreux petits objets partageant deux matériaux]\n# Données : OBJET id=piece1 MAT=or SOMMETS=100\n# Données : OBJET id=piece2 MAT=or SOMMETS=100\n# Données : OBJET id=piece3 MAT=or SOMMETS=100\n# Données : OBJET id=piece4 MAT=or SOMMETS=100\n# Données : OBJET id=caisse1 MAT=bois SOMMETS=50\n# Données : OBJET id=caisse2 MAT=bois SOMMETS=50\nA_COMPLETER\n\n[Cas 3 — Aucun partage de matériau (gain nul)]\n# Données : OBJET id=obj1 MAT=m1 SOMMETS=10\n# Données : OBJET id=obj2 MAT=m2 SOMMETS=20\nA_COMPLETER\n",
    "hints": [
      "Trier les matériaux par ordre alphabétique croissant.",
      "Utiliser math.ceil pour calculer les lots de 65535 sommets."
    ],
    "examples": [
      {
        "stdin": "OBJET id=arbre_01 MAT=vegetation SOMMETS=1200\nOBJET id=arbre_02 MAT=vegetation SOMMETS=1200\nOBJET id=buisson MAT=vegetation SOMMETS=600\nOBJET id=rocher MAT=roche SOMMETS=3000\nOBJET id=route MAT=asphalte SOMMETS=450",
        "expected": "MAT: asphalte -> 1 objet(s), 450 sommets => 1 Draw Call(s)\nMAT: roche -> 1 objet(s), 3000 sommets => 1 Draw Call(s)\nMAT: vegetation -> 3 objet(s), 3000 sommets => 1 Draw Call(s)\nBILAN: INITIAL = 5 DC -> OPTIMISE = 3 DC | GAIN: 40.0%",
        "note": "Les 3 arbres et buissons ont été fusionnés en un seul Draw Call."
      }
    ],
    "tests": [
      {
        "label": "Matériau dépassant le tampon 16 bits de 65535 sommets",
        "stdin": "cas:1",
        "expected": "MAT: roche -> 2 objet(s), 75000 sommets => 2 Draw Call(s)\nBILAN: INITIAL = 2 DC -> OPTIMISE = 2 DC | GAIN: 0.0%"
      },
      {
        "label": "Nombreux petits objets partageant deux matériaux",
        "stdin": "cas:2",
        "expected": "MAT: bois -> 2 objet(s), 100 sommets => 1 Draw Call(s)\nMAT: or -> 4 objet(s), 400 sommets => 1 Draw Call(s)\nBILAN: INITIAL = 6 DC -> OPTIMISE = 2 DC | GAIN: 66.7%"
      },
      {
        "label": "Aucun partage de matériau (gain nul)",
        "stdin": "cas:3",
        "expected": "MAT: m1 -> 1 objet(s), 10 sommets => 1 Draw Call(s)\nMAT: m2 -> 1 objet(s), 20 sommets => 1 Draw Call(s)\nBILAN: INITIAL = 2 DC -> OPTIMISE = 2 DC | GAIN: 0.0%"
      }
    ],
    "solution": "[Exemple]\nMAT: asphalte -> 1 objet(s), 450 sommets => 1 Draw Call(s)\nMAT: roche -> 1 objet(s), 3000 sommets => 1 Draw Call(s)\nMAT: vegetation -> 3 objet(s), 3000 sommets => 1 Draw Call(s)\nBILAN: INITIAL = 5 DC -> OPTIMISE = 3 DC | GAIN: 40.0%\n\n[Cas 1 — Matériau dépassant le tampon 16 bits de 65535 sommets]\nMAT: roche -> 2 objet(s), 75000 sommets => 2 Draw Call(s)\nBILAN: INITIAL = 2 DC -> OPTIMISE = 2 DC | GAIN: 0.0%\n\n[Cas 2 — Nombreux petits objets partageant deux matériaux]\nMAT: bois -> 2 objet(s), 100 sommets => 1 Draw Call(s)\nMAT: or -> 4 objet(s), 400 sommets => 1 Draw Call(s)\nBILAN: INITIAL = 6 DC -> OPTIMISE = 2 DC | GAIN: 66.7%\n\n[Cas 3 — Aucun partage de matériau (gain nul)]\nMAT: m1 -> 1 objet(s), 10 sommets => 1 Draw Call(s)\nMAT: m2 -> 1 objet(s), 20 sommets => 1 Draw Call(s)\nBILAN: INITIAL = 2 DC -> OPTIMISE = 2 DC | GAIN: 0.0%"
  },
  {
    "id": "ig2-c6-e3",
    "chapter": 6,
    "title": "Audit de chaîne de Mipmaps et surcoût VRAM",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer l’ensemble des niveaux d’une chaîne de mipmaps jusqu’à 1x1 et déterminer la surconsommation mémoire VRAM exacte.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nAlgorithme de génération des niveaux :<br>\n- Niveau 0 : dimensions <code>(L, H)</code>.<br>\n- Niveau suivant <code>k + 1</code> : <code>max(1, L // 2)</code> et <code>max(1, H // 2)</code>.<br>\n- La chaîne s'arrête dès que le niveau atteint <code>(1, 1)</code> inclus.<br>\nPour chaque niveau : <code>octets = w * h * octets_px</code>.<br>\nCalculer :<br>\n1. Le nombre total de niveaux <code>N</code>.<br>\n2. La mémoire VRAM du niveau 0 seul (en Ko).<br>\n3. La mémoire VRAM totale cumulée de tous les niveaux (en Ko).<br>\n4. Le surcoût mémoire en pourcentage : <code>((total - niv0) / niv0) * 100</code>.<br>\nAfficher :<br>\n<code>MIPMAP: &lt;nom&gt; | &lt;N&gt; NIVEAUX (&lt;L&gt;x&lt;H&gt; -&gt; 1x1) | NIV0: &lt;vram_niv0_Ko:.2f&gt; Ko | TOTAL: &lt;vram_total_Ko:.2f&gt; Ko | SURCOUT: +&lt;surcout:.2f&gt;%</code></p>",
    "starter": "# Grille d'analyse (ig2-c6-e3) — Audit de chaîne de Mipmaps et surcoût VRAM\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Grande texture 4K carrée]\n# Données : MIPMAP nom=terrain_4k L=4096 H=4096 OCTETS_PX=4\nA_COMPLETER\n\n[Cas 2 — Texture non carrée allongée 2048x128]\n# Données : MIPMAP nom=skybox_bande L=2048 H=128 OCTETS_PX=4\nA_COMPLETER\n\n[Cas 3 — Petite icône 16x16 1 octet par pixel]\n# Données : MIPMAP nom=icone L=16 H=16 OCTETS_PX=1\nA_COMPLETER\n",
    "hints": [
      "Pour une texture carrée, la somme de la série géométrique 1/4 + 1/16 + ... tend vers 1/3 (soit un surcoût d'environ +33.33%).",
      "Pour une texture 512x512, il y a exactement 10 niveaux (512, 256, 128, 64, 32, 16, 8, 4, 2, 1)."
    ],
    "examples": [
      {
        "stdin": "MIPMAP nom=brique L=512 H=512 OCTETS_PX=4\nMIPMAP nom=ruban L=1024 H=64 OCTETS_PX=4",
        "expected": "MIPMAP: brique | 10 NIVEAUX (512x512 -> 1x1) | NIV0: 1024.00 Ko | TOTAL: 1365.33 Ko | SURCOUT: +33.33%\nMIPMAP: ruban | 11 NIVEAUX (1024x64 -> 1x1) | NIV0: 256.00 Ko | TOTAL: 341.37 Ko | SURCOUT: +33.35%",
        "note": "Le surcoût classique d'une chaîne complète de mipmaps est d'environ 33.3%."
      }
    ],
    "tests": [
      {
        "label": "Grande texture 4K carrée",
        "stdin": "cas:1",
        "expected": "MIPMAP: terrain_4k | 13 NIVEAUX (4096x4096 -> 1x1) | NIV0: 65536.00 Ko | TOTAL: 87381.33 Ko | SURCOUT: +33.33%"
      },
      {
        "label": "Texture non carrée allongée 2048x128",
        "stdin": "cas:2",
        "expected": "MIPMAP: skybox_bande | 12 NIVEAUX (2048x128 -> 1x1) | NIV0: 1024.00 Ko | TOTAL: 1365.37 Ko | SURCOUT: +33.34%"
      },
      {
        "label": "Petite icône 16x16 1 octet par pixel",
        "stdin": "cas:3",
        "expected": "MIPMAP: icone | 5 NIVEAUX (16x16 -> 1x1) | NIV0: 0.25 Ko | TOTAL: 0.33 Ko | SURCOUT: +33.20%"
      }
    ],
    "solution": "[Exemple]\nMIPMAP: brique | 10 NIVEAUX (512x512 -> 1x1) | NIV0: 1024.00 Ko | TOTAL: 1365.33 Ko | SURCOUT: +33.33%\nMIPMAP: ruban | 11 NIVEAUX (1024x64 -> 1x1) | NIV0: 256.00 Ko | TOTAL: 341.37 Ko | SURCOUT: +33.35%\n\n[Cas 1 — Grande texture 4K carrée]\nMIPMAP: terrain_4k | 13 NIVEAUX (4096x4096 -> 1x1) | NIV0: 65536.00 Ko | TOTAL: 87381.33 Ko | SURCOUT: +33.33%\n\n[Cas 2 — Texture non carrée allongée 2048x128]\nMIPMAP: skybox_bande | 12 NIVEAUX (2048x128 -> 1x1) | NIV0: 1024.00 Ko | TOTAL: 1365.37 Ko | SURCOUT: +33.34%\n\n[Cas 3 — Petite icône 16x16 1 octet par pixel]\nMIPMAP: icone | 5 NIVEAUX (16x16 -> 1x1) | NIV0: 0.25 Ko | TOTAL: 0.33 Ko | SURCOUT: +33.20%"
  }
];
