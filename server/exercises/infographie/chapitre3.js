'use strict';

module.exports = [
  {
    "id": "ig2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Les textures du jeu mobile Champignons",
    "exampleTitle": "Exemple résolu — les textures du jeu Potager",
    "goal": "Vérifier la conformité « puissance de deux » des textures d'un projet et raisonner sur les chaînes de mipmaps.",
    "brief": "<p><strong>Énoncé.</strong> Léa, technical artiste du jeu mobile <strong>Champignons</strong>, vérifie la conformité des textures du projet avant intégration. Le GPU cible exige des dimensions « puissance de deux » (POT : 64, 128, 256, 512, 1024, 2048...) pour générer les chaînes de mipmaps matérielles et autoriser le mode répétition. L'inventaire du projet donne :</p><table><tr><th>Texture</th><th>Dimensions (px)</th></tr><tr><th>Terrain</th><td>512 × 512</td></tr><tr><th>Décor champêtre</th><td>800 × 600</td></tr><tr><th>Ciel</th><td>1024 × 900</td></tr><tr><th>Particules</th><td>256 × 128</td></tr></table><p>Pour la question 5, écrivez les dimensions au format 512 x 512 ; la question 4 demande un nombre de niveaux.</p><ol><li>Combien de textures de l'inventaire respectent la règle POT ?</li><li>Pour la texture Ciel, quelle dimension (largeur ou hauteur) faut-il corriger ?</li><li>Quelle puissance de deux faut-il retenir pour cette dimension fautive, au plus proche de sa valeur actuelle ?</li><li>Combien de niveaux compte la chaîne de mipmaps complète d'une texture 512 × 512, du niveau 0 jusqu'à 1 × 1 ?</li><li>Quelles sont les dimensions du niveau 2 de la chaîne d'une texture 2048 × 2048 (après deux divisions par deux) ?</li></ol>",
    "starter": "# Exercice — Les textures du jeu mobile Champignons\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 5 : dimensions au format 512 x 512. Question 4 : un nombre de niveaux.\n\n[Question 1 — Textures conformes POT]\nA_COMPLETER\n\n[Question 2 — Dimension fautive de la texture Ciel]\nA_COMPLETER\n\n[Question 3 — Puissance de deux à retenir]\nA_COMPLETER\n\n[Question 4 — Niveaux de la chaîne d'une 512 x 512]\nA_COMPLETER\n\n[Question 5 — Dimensions du niveau 2 d'une 2048 x 2048]\nA_COMPLETER\n",
    "hints": [
      "Une dimension est POT si, divisée par deux de façon répétée, elle retombe exactement sur 1 : 512, 256, 128... mais ni 800, ni 600, ni 900.",
      "Une texture carrée de côté 2^n engendre n + 1 niveaux de mipmaps, du niveau 0 jusqu'à 1 × 1.",
      "1. Terrain et particules passent. 2. Sur le ciel, 1024 est conforme, 900 non. 3. 900 est plus proche de 1024 que de 512. 4. 512 = 2^9 : 10 niveaux. 5. 2048 / 4 = 512."
    ],
    "examples": [
      {
        "stdin": "Le jeu Potager livre ses textures : 256 × 256, 500 × 500 et 128 × 64.\n\n1) 256 × 256 et 128 × 64 sont POT : 2 textures conformes.\n2) La chaîne complète d'une 128 × 128 compte 8 niveaux : 128, 64, 32, 16, 8, 4, 2, 1.\n3) Pour la texture 500 × 500, la puissance de deux la plus proche est 512.\n4) Le niveau 2 d'une 1024 × 1024 est 256 × 256.\n5) Une texture NPOT prive le jeu de mipmaps matérielles et du mode répétition.",
        "expected": "2 textures conformes — 8 niveaux pour une 128 × 128 — 512 — niveau 2 d'une 1024 : 256 × 256",
        "note": "Une texture NPOT s'affiche, mais le GPU refuse de générer ses mipmaps matérielles et désactive le mode répétition : d'où l'inventaire POT."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Textures conformes POT",
        "stdin": "q:1",
        "expected": "2||deux||2 textures"
      },
      {
        "label": "Question 2 — Dimension fautive de la texture Ciel",
        "stdin": "q:2",
        "expected": "la hauteur||hauteur"
      },
      {
        "label": "Question 3 — Puissance de deux à retenir",
        "stdin": "q:3",
        "expected": "1024"
      },
      {
        "label": "Question 4 — Niveaux de la chaîne d'une 512 x 512",
        "stdin": "q:4",
        "expected": "10||dix||10 niveaux"
      },
      {
        "label": "Question 5 — Dimensions du niveau 2 d'une 2048 x 2048",
        "stdin": "q:5",
        "expected": "512 x 512||512 × 512||512x512"
      }
    ],
    "solution": "[Question 1 — Textures conformes POT]\n2\n\n[Question 2 — Dimension fautive de la texture Ciel]\nla hauteur\n\n[Question 3 — Puissance de deux à retenir]\n1024\n\n[Question 4 — Niveaux de la chaîne d'une 512 x 512]\n10\n\n[Question 5 — Dimensions du niveau 2 d'une 2048 x 2048]\n512 x 512",
    "takeaway": "1) Terrain 512 × 512 et particules 256 × 128 sont des puissances de deux ; décor champêtre (800 × 600) et ciel (1024 × 900) ne le sont pas : 2 textures conformes.\n2) Pour le ciel, la largeur 1024 est conforme ; c'est la hauteur 900 qui est fautive.\n3) 900 se situe à 388 de 512 et à 124 de 1024 : la puissance de deux la plus proche est 1024.\n4) 512 = 2^9 : la chaîne compte 10 niveaux (512, 256, 128, 64, 32, 16, 8, 4, 2, 1).\n5) 2048 / 2 = 1024 au niveau 1, puis 1024 / 2 = 512 au niveau 2 : le niveau 2 est 512 × 512.\nContrôle : chaque niveau divise la surface par quatre ; le niveau 2 d'une 2048 × 2048 a une surface seize fois plus petite."
  },
  {
    "id": "ig2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "L'atlas de sprites du jeu Escalade",
    "exampleTitle": "Exemple résolu — l'atlas de sprites du jeu Labyrinthe",
    "goal": "Calculer les coordonnées UV normalisées d'une tuile dans un atlas de textures, avec l'axe V inversé.",
    "brief": "<p><strong>Énoncé.</strong> Le studio prépare un atlas de tuiles pour son jeu de plateforme <strong>Escalade</strong>. L'atlas est une image de <strong>512 × 512 pixels</strong> découpée en grille régulière de tuiles de <strong>128 × 128 pixels</strong>. Le moteur lit des coordonnées UV normalisées (entre 0 et 1), avec l'origine en bas à gauche (convention OpenGL) et les lignes numérotées depuis le coin haut gauche :</p><p><code>u_min = c × tuile_w / atlas_W</code> ; <code>u_max = (c + 1) × tuile_w / atlas_W</code> ; <code>v_min = 1 − (r + 1) × tuile_h / atlas_H</code> ; <code>v_max = 1 − r × tuile_h / atlas_H</code></p><p>La tuile du grimpeur occupe la colonne <strong>c = 2</strong> et la ligne <strong>r = 3</strong> (numérotation à partir de 0). Répondez par le nombre seul (notation décimale 0,5 acceptée).</p><ol><li>Combien de tuiles l'atlas contient-il au total ?</li><li>Que vaut u_min pour la tuile du grimpeur ?</li><li>Que vaut u_max ?</li><li>Que vaut v_min ?</li><li>Que vaut v_max ?</li><li>Si l'artiste double l'atlas à 1024 × 1024 avec les mêmes tuiles de 128 × 128, combien de tuiles contiendra-t-il ?</li></ol>",
    "starter": "# Exercice — L'atlas de sprites du jeu Escalade\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses : le nombre seul.\n\n[Question 1 — Nombre total de tuiles]\nA_COMPLETER\n\n[Question 2 — u_min de la tuile]\nA_COMPLETER\n\n[Question 3 — u_max de la tuile]\nA_COMPLETER\n\n[Question 4 — v_min de la tuile]\nA_COMPLETER\n\n[Question 5 — v_max de la tuile]\nA_COMPLETER\n\n[Question 6 — Tuiles d'un atlas doublé à 1024 x 1024]\nA_COMPLETER\n",
    "hints": [
      "Comptez d'abord la grille : nombre de colonnes × nombre de lignes.",
      "L'axe V est inversé : la ligne 0 est en haut de l'atlas, mais v se mesure depuis le bas.",
      "1. 512 / 128 = 4 colonnes et 4 lignes : 16 tuiles. 2. u_min = 2 × 128 / 512 = 0,5. 3. u_max = 3 × 128 / 512 = 0,75. 4. v_min = 1 − 4 × 128 / 512 = 0. 5. v_max = 1 − 3 × 128 / 512 = 0,25. 6. 1024 / 128 = 8, donc 8 × 8 = 64."
    ],
    "examples": [
      {
        "stdin": "Le jeu Labyrinthe utilise un atlas de 1024 × 1024 en tuiles de 256 × 256 ; la tuile « sortie » occupe la colonne 1, ligne 2.\n\n1) Grille de 4 × 4 : 16 tuiles.\n2) u_min = 1 × 256 / 1024 = 0,25.\n3) u_max = 2 × 256 / 1024 = 0,5.\n4) v_min = 1 − 3 × 256 / 1024 = 1 − 0,75 = 0,25.\n5) v_max = 1 − 2 × 256 / 1024 = 0,5.\n6) En doublant l'atlas à 2048 × 2048, la grille passe à 8 × 8 : 64 tuiles.",
        "expected": "16 tuiles — u : de 0,25 à 0,5 — v : de 0,25 à 0,5 — 64 tuiles après doublement",
        "note": "Les coordonnées UV sont normalisées : indépendantes de la résolution de l'atlas, elles survivent à tout remplacement de texture."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre total de tuiles",
        "stdin": "q:1",
        "expected": "16||seize"
      },
      {
        "label": "Question 2 — u_min de la tuile",
        "stdin": "q:2",
        "expected": "0,5||0.5"
      },
      {
        "label": "Question 3 — u_max de la tuile",
        "stdin": "q:3",
        "expected": "0,75||0.75"
      },
      {
        "label": "Question 4 — v_min de la tuile",
        "stdin": "q:4",
        "expected": "0||0,0"
      },
      {
        "label": "Question 5 — v_max de la tuile",
        "stdin": "q:5",
        "expected": "0,25||0.25"
      },
      {
        "label": "Question 6 — Tuiles d'un atlas doublé à 1024 x 1024",
        "stdin": "q:6",
        "expected": "64||soixante-quatre"
      }
    ],
    "solution": "[Question 1 — Nombre total de tuiles]\n16\n\n[Question 2 — u_min de la tuile]\n0,5\n\n[Question 3 — u_max de la tuile]\n0,75\n\n[Question 4 — v_min de la tuile]\n0\n\n[Question 5 — v_max de la tuile]\n0,25\n\n[Question 6 — Tuiles d'un atlas doublé à 1024 x 1024]\n64",
    "takeaway": "1) Grille : 512 / 128 = 4 colonnes et 4 lignes, soit 4 × 4 = 16 tuiles.\n2) u_min = 2 × 128 / 512 = 256 / 512 = 0,5.\n3) u_max = (2 + 1) × 128 / 512 = 384 / 512 = 0,75.\n4) v_min = 1 − (3 + 1) × 128 / 512 = 1 − 512 / 512 = 0.\n5) v_max = 1 − 3 × 128 / 512 = 1 − 0,75 = 0,25.\n6) En 1024 × 1024 : 1024 / 128 = 8 colonnes et 8 lignes, soit 64 tuiles.\nContrôle : la tuile du grimpeur occupe le quart droit de sa rangée (u de 0,5 à 0,75) et la rangée du bas de l'atlas (v de 0 à 0,25)."
  },
  {
    "id": "ig2-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "La normal map du casque de moto",
    "exampleTitle": "Exemple résolu — la normal map du mur de briques",
    "goal": "Décoder un texel RVB d'une normal map en vecteur normal de l'espace tangent et interpréter son orientation.",
    "brief": "<p><strong>Énoncé.</strong> Le studio 3D numérise un casque de moto et simule les micro-reliefs par <strong>normal mapping</strong> en espace tangent. Chaque texel RVB code un vecteur normal (Nx, Ny, Nz) selon :</p><p><code>Nx = R / 255 × 2 − 1</code> ; <code>Ny = G / 255 × 2 − 1</code> ; <code>Nz = B / 255 × 2 − 1</code></p><p>Dans cette convention : +X = vers la droite (axe tangente), +Y = vers le haut (axe bitangente), +Z = perpendiculaire à la surface, vers l'observateur. L'artiste inspecte cinq texels du casque. La question 1 demande le vecteur au format (0, 0, 1) ; la question 5 un nombre arrondi à deux décimales ; les questions 2 à 4 un mot.</p><ol><li>Le texel (128, 128, 255) code quelle normale ?</li><li>Le texel (255, 128, 128) donne Nx = 1 : vers quelle direction la micro-face penche-t-elle ?</li><li>Le texel (0, 128, 128) donne Nx = −1 : vers quelle direction penche-t-elle ?</li><li>Le texel (128, 255, 128) donne Ny = 1 : vers quelle direction penche-t-elle ?</li><li>Le texel (200, 128, 255) : que vaut Nx, arrondi à deux décimales ?</li></ol>",
    "starter": "# Exercice — La normal map du casque de moto\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : vecteur au format (0, 0, 1). Question 5 : décimal à deux chiffres.\n\n[Question 1 — Normale du texel (128, 128, 255)]\nA_COMPLETER\n\n[Question 2 — Direction du texel (255, 128, 128)]\nA_COMPLETER\n\n[Question 3 — Direction du texel (0, 128, 128)]\nA_COMPLETER\n\n[Question 4 — Direction du texel (128, 255, 128)]\nA_COMPLETER\n\n[Question 5 — Nx du texel (200, 128, 255)]\nA_COMPLETER\n",
    "hints": [
      "Le codage mappe l'intervalle [0, 255] sur [−1, 1] : 128 est presque le neutre, 255 donne +1 et 0 donne −1.",
      "Pour un canal, calculez (valeur × 2 − 255) / 255 : c'est la formule du cours en une seule fraction.",
      "1. R et G neutres, B au maximum : (0, 0, 1). 2. et 3. Seul R change : la pente suit l'axe X, à droite ou à gauche. 4. Seul G change : la pente suit l'axe Y. 5. Nx = (200 × 2 − 255) / 255 = 145 / 255 = 0,57."
    ],
    "examples": [
      {
        "stdin": "Un mur de briques est simulé par normal map ; l'artiste décode quatre texels.\n\n1) (128, 128, 255) : Nx et Ny quasi nuls, Nz = 1 : la brique est plate, normale (0, 0, 1).\n2) (192, 128, 255) : Nx = (192 × 2 − 255) / 255 = 129 / 255 = 0,51 : la pente regarde vers la droite.\n3) (64, 128, 255) : Nx = (128 − 255) / 255 = −0,50 : la pente regarde vers la gauche.\n4) (128, 192, 255) : Ny = 0,51 : la pente regarde vers le haut.",
        "expected": "(0, 0, 1) brique plate — 0,51 vers la droite — −0,50 vers la gauche — 0,51 vers le haut",
        "note": "Une normal map n'est pas une couleur mais une direction : son teint bleu dominant trahit des normales qui pointent majoritairement vers l'observateur (Nz proche de 1)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Normale du texel (128, 128, 255)",
        "stdin": "q:1",
        "expected": "(0, 0, 1)||(0,0,1)||(0 ; 0 ; 1)||0 0 1"
      },
      {
        "label": "Question 2 — Direction du texel (255, 128, 128)",
        "stdin": "q:2",
        "expected": "la droite||droite||vers la droite||+X||vers +X"
      },
      {
        "label": "Question 3 — Direction du texel (0, 128, 128)",
        "stdin": "q:3",
        "expected": "la gauche||gauche||vers la gauche||-X||vers -X"
      },
      {
        "label": "Question 4 — Direction du texel (128, 255, 128)",
        "stdin": "q:4",
        "expected": "le haut||haut||vers le haut||+Y||vers +Y"
      },
      {
        "label": "Question 5 — Nx du texel (200, 128, 255)",
        "stdin": "q:5",
        "expected": "0,57||0.57"
      }
    ],
    "solution": "[Question 1 — Normale du texel (128, 128, 255)]\n(0, 0, 1)\n\n[Question 2 — Direction du texel (255, 128, 128)]\nla droite\n\n[Question 3 — Direction du texel (0, 128, 128)]\nla gauche\n\n[Question 4 — Direction du texel (128, 255, 128)]\nle haut\n\n[Question 5 — Nx du texel (200, 128, 255)]\n0,57",
    "takeaway": "1) (128, 128, 255) : Nx = 256/255 − 1, soit environ 0 ; Ny = 0 ; Nz = 510/255 − 1 = 1. La normale (0, 0, 1) est perpendiculaire à la surface : la micro-face est plate.\n2) (255, 128, 128) : Nx = 1, la micro-face penche vers la droite (axe +X, tangente).\n3) (0, 128, 128) : Nx = −1, la micro-face penche vers la gauche (axe −X).\n4) (128, 255, 128) : Ny = 1, la micro-face penche vers le haut (axe +Y, bitangente).\n5) Nx = (200 / 255) × 2 − 1 = (400 − 255) / 255 = 145 / 255 = 0,5686, arrondi à 0,57.\nContrôle : le canal B du texel est à 255, donc Nz = 1 : la normale garde une forte composante vers l'observateur, comme toute normal map réaliste."
  }
];
