'use strict';

module.exports = [
  {
    "id": "ig2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le budget VRAM du jeu Ruines",
    "exampleTitle": "Exemple résolu — le budget de la texture du héros",
    "goal": "Calculer l'empreinte mémoire d'une texture en VRAM selon le format de compression GPU (RGBA8, BC1, BC3).",
    "brief": "<p><strong>Énoncé.</strong> Le studio optimise le jeu mobile <strong>Ruines</strong>. La texture principale du décor mesure <strong>2048 × 2048 pixels</strong>. Décompressée en RGBA8, une texture occupe 4 octets par pixel ; les formats de compression GPU restent compressés en VRAM : <strong>BC1 pèse 4 bits par pixel (0,5 octet)</strong>, <strong>BC3 et BC7 pèsent 8 bits par pixel (1 octet)</strong>. Rappel : 1 Mo = 1024 × 1024 octets = 1 048 576 octets.</p><p>Répondez par le nombre seul (les questions 1, 2 et 4 en mégaoctets) ; la question 5 par deux mots.</p><ol><li>Quel est le poids en VRAM de la texture en RGBA8 non compressée, en mégaoctets ?</li><li>Quel est son poids une fois compressée en BC1, en mégaoctets ?</li><li>Quel est le rapport de réduction entre le RGBA8 et le BC1 ?</li><li>Le décor n'utilise pas de transparence, mais la texture du feuillage exigera un canal alpha : quel serait le poids en BC3 d'une texture identique, en mégaoctets ?</li><li>Quel type d'accès mémoire aux texels rend les formats en blocs indispensables en VRAM, là où JPEG et PNG échouent ?</li></ol>",
    "starter": "# Exercice — Le budget VRAM du jeu Ruines\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : nombre seul (Mo pour 1, 2 et 4). Question 5 : deux mots.\n\n[Question 1 — Poids RGBA8 non compressé (en Mo)]\nA_COMPLETER\n\n[Question 2 — Poids en BC1 (en Mo)]\nA_COMPLETER\n\n[Question 3 — Rapport de réduction RGBA8 vers BC1]\nA_COMPLETER\n\n[Question 4 — Poids en BC3 (en Mo)]\nA_COMPLETER\n\n[Question 5 — Type d'accès mémoire exigé par le GPU]\nA_COMPLETER\n",
    "hints": [
      "Le poids VRAM se calcule comme un fichier brut : largeur × hauteur × octets par pixel.",
      "Convertissez les bits par pixel en octets : 4 bits = 0,5 octet, 8 bits = 1 octet, 32 bits = 4 octets.",
      "1. 2048 × 2048 × 4 = 16 Mo. 2. 2048 × 2048 × 0,5 = 2 Mo. 3. 16 / 2 = 8. 4. 2048 × 2048 × 1 = 4 Mo. 5. Le GPU doit lire un texel isolé sans décompresser tout le fichier : accès aléatoire."
    ],
    "examples": [
      {
        "stdin": "La texture du héros du jeu Ruines mesure 1024 × 1024 pixels.\n\n1) RGBA8 : 1024 × 1024 × 4 = 4 194 304 octets, soit 4 Mo.\n2) BC1 : 1024 × 1024 × 0,5 = 524 288 octets, soit 0,5 Mo.\n3) Rapport de réduction : 4 / 0,5 = 8.\n4) BC3 : 1024 × 1024 × 1 = 1 Mo.\n5) Le GPU exige un accès aléatoire à chaque texel.",
        "expected": "4 Mo en RGBA8 — 0,5 Mo en BC1 — rapport 8 — 1 Mo en BC3 — accès aléatoire",
        "note": "Les formats en blocs découpent l'image en blocs de 4 × 4 pixels indépendants : le GPU calcule l'adresse d'un bloc en une addition, sans décompresser le fichier en entier."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Poids RGBA8 non compressé (en Mo)",
        "stdin": "q:1",
        "expected": "16||16 Mo"
      },
      {
        "label": "Question 2 — Poids en BC1 (en Mo)",
        "stdin": "q:2",
        "expected": "2||2 Mo"
      },
      {
        "label": "Question 3 — Rapport de réduction RGBA8 vers BC1",
        "stdin": "q:3",
        "expected": "8||x8||8 fois"
      },
      {
        "label": "Question 4 — Poids en BC3 (en Mo)",
        "stdin": "q:4",
        "expected": "4||4 Mo"
      },
      {
        "label": "Question 5 — Type d'accès mémoire exigé par le GPU",
        "stdin": "q:5",
        "expected": "accès aléatoire||acces aleatoire||l'accès aléatoire"
      }
    ],
    "solution": "[Question 1 — Poids RGBA8 non compressé (en Mo)]\n16\n\n[Question 2 — Poids en BC1 (en Mo)]\n2\n\n[Question 3 — Rapport de réduction RGBA8 vers BC1]\n8\n\n[Question 4 — Poids en BC3 (en Mo)]\n4\n\n[Question 5 — Type d'accès mémoire exigé par le GPU]\naccès aléatoire",
    "takeaway": "1) RGBA8 : 2048 × 2048 = 4 194 304 pixels ; × 4 octets = 16 777 216 octets, soit exactement 16 Mo.\n2) BC1 : 4 194 304 × 0,5 octet = 2 097 152 octets, soit 2 Mo.\n3) Rapport : 16 / 2 = 8. BC1 divise le poids par huit par rapport au RGBA8.\n4) BC3 : 4 194 304 × 1 octet = 4 194 304 octets, soit 4 Mo (l'alpha graduel coûte un octet par pixel).\n5) Le GPU doit lire n'importe quel texel isolé instantanément : il exige un accès aléatoire, impossible avec la décompression séquentielle de JPEG ou PNG.\nContrôle : BC1 = 4 bits, un huitième des 32 bits du RGBA8 : le rapport 8 est structurel, quelle que soit la taille de la texture."
  },
  {
    "id": "ig2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Les draw calls du marché médiéval",
    "exampleTitle": "Exemple résolu — les draw calls du verger",
    "goal": "Simuler le static batching d'une scène par matériau avec un plafond de sommets par tampon, et chiffrer la réduction des draw calls.",
    "brief": "<p><strong>Énoncé.</strong> La scène du marché médiéval du jeu « Fief » affiche <strong>240 objets statiques</strong> (étals, caisses, tonneaux, auvents) répartis en trois matériaux :</p><table><tr><th>Matériau</th><th>Objets</th><th>Sommets au total</th></tr><tr><th>Pierre</th><td>120</td><td>90 000</td></tr><tr><th>Bois</th><td>80</td><td>20 000</td></tr><tr><th>Toile</th><td>40</td><td>12 000</td></tr></table><p>Sans optimisation, chaque objet coûte un draw call. Le static batching fusionne dans un même tampon tous les objets d'un même matériau, dans la limite de <strong>65 535 sommets par tampon</strong> (au-delà, un tampon supplémentaire est créé pour le même matériau). Répondez par le nombre seul ; la question 5 par le nom du goulot d'étranglement.</p><ol><li>Combien de draw calls la scène coûte-t-elle sans batching ?</li><li>Combien de tampons le matériau Pierre remplit-il ?</li><li>Combien de draw calls après static batching complet de la scène ?</li><li>Quel est le pourcentage de réduction des draw calls (arrondi à l'unité) ?</li><li>Le goulot d'étranglement ainsi soulagé est-il de type CPU-bound ou GPU-bound ?</li></ol>",
    "starter": "# Exercice — Les draw calls du marché médiéval\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : nombre seul. Question 5 : le nom du goulot.\n\n[Question 1 — Draw calls sans batching]\nA_COMPLETER\n\n[Question 2 — Tampons pour le matériau Pierre]\nA_COMPLETER\n\n[Question 3 — Draw calls après batching]\nA_COMPLETER\n\n[Question 4 — Pourcentage de réduction]\nA_COMPLETER\n\n[Question 5 — Goulot d'étranglement soulagé]\nA_COMPLETER\n",
    "hints": [
      "Sans optimisation, chaque objet indépendant part dans son propre appel de dessin.",
      "Le nombre de tampons d'un matériau vaut ses sommets divisés par 65 535, arrondis à l'entier supérieur.",
      "1. 240 objets = 240 appels. 2. 90 000 / 65 535 = 1,37, donc 2 tampons. 3. Bois et toile tiennent en un tampon chacun : 2 + 1 + 1 = 4 appels. 4. (240 − 4) / 240 = 98,3 %. 5. Les draw calls saturent le processeur : CPU-bound."
    ],
    "examples": [
      {
        "stdin": "Le verger du jeu affiche 60 objets en trois matériaux : terre (30 000 sommets), feuillage (40 000), troncs (10 000).\n\n1) Sans batching : 60 draw calls.\n2) Chaque matériau tient sous 65 535 sommets : 1 tampon chacun.\n3) Après batching : 3 draw calls.\n4) Réduction : (60 − 3) / 60 = 95 %.\n5) Le goulot soulagé est CPU-bound.",
        "expected": "60 draw calls — 1 tampon par matériau — 3 draw calls — 95 % de réduction — CPU-bound",
        "note": "Chaque draw call coûte du temps processeur au pilote graphique : fusionner les maillages décharge le CPU, le GPU n'y voit aucune différence."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Draw calls sans batching",
        "stdin": "q:1",
        "expected": "240||240 draw calls"
      },
      {
        "label": "Question 2 — Tampons pour le matériau Pierre",
        "stdin": "q:2",
        "expected": "2||deux||2 tampons"
      },
      {
        "label": "Question 3 — Draw calls après batching",
        "stdin": "q:3",
        "expected": "4||quatre||4 draw calls"
      },
      {
        "label": "Question 4 — Pourcentage de réduction",
        "stdin": "q:4",
        "expected": "98||98 %||98%"
      },
      {
        "label": "Question 5 — Goulot d'étranglement soulagé",
        "stdin": "q:5",
        "expected": "CPU-bound||CPU bound||cpu-bound||CPU"
      }
    ],
    "solution": "[Question 1 — Draw calls sans batching]\n240\n\n[Question 2 — Tampons pour le matériau Pierre]\n2\n\n[Question 3 — Draw calls après batching]\n4\n\n[Question 4 — Pourcentage de réduction]\n98\n\n[Question 5 — Goulot d'étranglement soulagé]\nCPU-bound",
    "takeaway": "1) Sans batching, chaque objet coûte un appel : 240 draw calls.\n2) Pierre : 90 000 / 65 535 = 1,37, arrondi à l'entier supérieur : 2 tampons.\n3) Bois (20 000 sommets) et toile (12 000) tiennent chacun en un tampon : 2 + 1 + 1 = 4 draw calls.\n4) Réduction : (240 − 4) / 240 = 236 / 240 = 98,3 %, arrondi à 98 %.\n5) Les draw calls saturent le processeur et le pilote graphique : le goulot soulagé est CPU-bound.\nContrôle : 120 + 80 + 40 = 240 objets, tous fusionnés ; 90 000 + 20 000 + 12 000 = 122 000 sommets répartis en 4 tampons."
  },
  {
    "id": "ig2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La chaîne de mipmaps du terrain",
    "exampleTitle": "Exemple résolu — la chaîne de mipmaps de la texture du ciel",
    "goal": "Dérouler une chaîne de mipmaps jusqu'à 1 × 1 et chiffrer le surcoût mémoire exact grâce à la série géométrique de raison 1/4.",
    "brief": "<p><strong>Énoncé.</strong> La texture du terrain de <strong>Ruines</strong> est une <strong>1024 × 1024</strong> compressée en <strong>BC3</strong> (1 octet par pixel). Le moteur génère la chaîne complète de mipmaps : chaque niveau divise largeur et hauteur par deux, jusqu'à 1 × 1. Rappels du cours : le niveau 0 est la texture elle-même ; le poids total de la chaîne vaut 4/3 du poids du niveau 0 (série géométrique 1 + 1/4 + 1/16 + ...) ; 1 Ko = 1024 octets, 1 Mo = 1024 × 1024 octets.</p><p>Répondez par le nombre seul ; la question 2 au format 256 x 256 ; la question 5 par le nom de l'artefact.</p><ol><li>Combien de niveaux compte la chaîne complète ?</li><li>Quelles sont les dimensions du niveau 2 (après deux divisions) ?</li><li>Quel est le poids du niveau 2, en kilooctets ?</li><li>Quel est le poids total de la chaîne complète, en mégaoctets arrondi à deux décimales ?</li><li>Quel artefact visuel la chaîne de mipmaps élimine-t-elle quand la texture est affichée de loin ?</li></ol>",
    "starter": "# Exercice — La chaîne de mipmaps du terrain\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : dimensions au format 256 x 256. Question 5 : le nom de l'artefact.\n\n[Question 1 — Nombre de niveaux de la chaîne]\nA_COMPLETER\n\n[Question 2 — Dimensions du niveau 2]\nA_COMPLETER\n\n[Question 3 — Poids du niveau 2 (en Ko)]\nA_COMPLETER\n\n[Question 4 — Poids total de la chaîne (en Mo)]\nA_COMPLETER\n\n[Question 5 — Artefact éliminé de loin]\nA_COMPLETER\n",
    "hints": [
      "Une texture carrée de côté 2^n engendre n + 1 niveaux, du niveau 0 jusqu'à 1 × 1.",
      "Diviser les dimensions par deux divise la surface, donc le poids, par quatre.",
      "1. 1024 = 2^10 : 11 niveaux. 2. 1024 / 4 = 256 : 256 × 256. 3. 256 × 256 × 1 octet = 65 536 octets = 64 Ko. 4. Niveau 0 = 1 Mo, chaîne = 1 × 4/3 = 1,33 Mo. 5. Sans mipmaps, les textures lointaines scintillent (aliasing)."
    ],
    "examples": [
      {
        "stdin": "La texture du ciel de Ruines est une 512 × 512 en BC3 (1 octet par pixel).\n\n1) 512 = 2^9 : la chaîne compte 10 niveaux.\n2) Le niveau 2 mesure 128 × 128.\n3) Poids du niveau 2 : 128 × 128 = 16 384 octets, soit 16 Ko.\n4) Niveau 0 : 512 × 512 = 262 144 octets ; chaîne complète : 262 144 × 4/3 = 349 525 octets, soit 0,33 Mo.\n5) Les mipmaps éliminent le scintillement des textures vues de loin.",
        "expected": "10 niveaux — niveau 2 en 128 × 128 et 16 Ko — chaîne totale 0,33 Mo — scintillement éliminé",
        "note": "La série 1 + 1/4 + 1/16 + ... converge vers 4/3 : toute la chaîne de mipmaps ne coûte qu'un tiers de mémoire en plus, en échange de performances et de stabilité visuelle."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de niveaux de la chaîne",
        "stdin": "q:1",
        "expected": "11||onze||11 niveaux"
      },
      {
        "label": "Question 2 — Dimensions du niveau 2",
        "stdin": "q:2",
        "expected": "256 x 256||256 × 256||256x256"
      },
      {
        "label": "Question 3 — Poids du niveau 2 (en Ko)",
        "stdin": "q:3",
        "expected": "64||64 Ko||64 ko"
      },
      {
        "label": "Question 4 — Poids total de la chaîne (en Mo)",
        "stdin": "q:4",
        "expected": "1,33||1.33||1,33 Mo||1.33 Mo"
      },
      {
        "label": "Question 5 — Artefact éliminé de loin",
        "stdin": "q:5",
        "expected": "le scintillement||scintillement||l'aliasing||aliasing||le moiré||moiré"
      }
    ],
    "solution": "[Question 1 — Nombre de niveaux de la chaîne]\n11\n\n[Question 2 — Dimensions du niveau 2]\n256 x 256\n\n[Question 3 — Poids du niveau 2 (en Ko)]\n64\n\n[Question 4 — Poids total de la chaîne (en Mo)]\n1,33\n\n[Question 5 — Artefact éliminé de loin]\nle scintillement",
    "takeaway": "1) 1024 = 2^10 : la chaîne compte 11 niveaux, de 1024 × 1024 jusqu'à 1 × 1.\n2) Niveau 1 : 512 × 512 ; niveau 2 : 256 × 256.\n3) Poids du niveau 2 : 256 × 256 × 1 octet = 65 536 octets = 64 Ko.\n4) Niveau 0 : 1024 × 1024 = 1 048 576 octets = 1 Mo. Chaîne complète : 1 048 576 × 4/3 = 1 398 101 octets, soit 1,33 Mo.\n5) Sans mipmaps, les pixels lointains se disputent les mêmes texels et l'image scintille : la chaîne élimine ce scintillement (aliasing).\nContrôle : le surcoût vaut 1,33 − 1 = 0,33 Mo, soit le tiers du niveau 0, exactement ce qu'annonce la série géométrique."
  }
];
