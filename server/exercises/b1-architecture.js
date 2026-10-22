/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "ar-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Materiel ou logiciel",
    "goal": "Classer les composantes du système informatique entre hardware et software.",
    "brief": "<p>Analysez chaque ligne proposée « composant categorie » : categorie est un code parmi <code>materiel</code> ou <code>logiciel</code>. Rappel du support : le <strong>hardware</strong> regroupe les parties physiques (clavier, processeur, RAM, disque, écran) et le <strong>software</strong> les programmes (système Linux, traitement de texte Word, navigateur, antivirus). Pour chaque ligne il Indiquez <code>composant : OK</code> quand la catégorie annoncée est juste, sinon <code>composant : ERREUR</code>, puis le bilan <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c1-e1) — Materiel ou logiciel\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les sept composantes]\n# Données : 7\n# Données : clavier materiel\n# Données : processeur materiel\n# Données : ram materiel\n# Données : disque materiel\n# Données : ecran materiel\n# Données : linux logiciel\n# Données : word logiciel\nA_COMPLETER\n\n[Cas 2 — Deux confusions]\n# Données : 4\n# Données : navigateur logiciel\n# Données : disque logiciel\n# Données : antivirus materiel\n# Données : ecran materiel\nA_COMPLETER\n\n[Cas 3 — Parc complet]\n# Données : 5\n# Données : processeur materiel\n# Données : word logiciel\n# Données : ram materiel\n# Données : linux logiciel\n# Données : clavier materiel\nA_COMPLETER\n",
    "hints": [
      "Un case sur le composant donne la catégorie attendue ; compare-la à la catégorie saisie.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nclavier materiel\nlinux logiciel\nram logiciel\n",
        "expected": "clavier : OK\nlinux : OK\nram : ERREUR\ncorrectes : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Les sept composantes",
        "stdin": "cas:1",
        "expected": "clavier : OK\nprocesseur : OK\nram : OK\ndisque : OK\necran : OK\nlinux : OK\nword : OK\ncorrectes : 7/7"
      },
      {
        "label": "Deux confusions",
        "stdin": "cas:2",
        "expected": "navigateur : OK\ndisque : ERREUR\nantivirus : ERREUR\necran : OK\ncorrectes : 2/4"
      },
      {
        "label": "Parc complet",
        "stdin": "cas:3",
        "expected": "processeur : OK\nword : OK\nram : OK\nlinux : OK\nclavier : OK\ncorrectes : 5/5"
      }
    ],
    "solution": "[Exemple]\nclavier : OK\nlinux : OK\nram : ERREUR\ncorrectes : 2/3\n\n[Cas 1 — Les sept composantes]\nclavier : OK\nprocesseur : OK\nram : OK\ndisque : OK\necran : OK\nlinux : OK\nword : OK\ncorrectes : 7/7\n\n[Cas 2 — Deux confusions]\nnavigateur : OK\ndisque : ERREUR\nantivirus : ERREUR\necran : OK\ncorrectes : 2/4\n\n[Cas 3 — Parc complet]\nprocesseur : OK\nword : OK\nram : OK\nlinux : OK\nclavier : OK\ncorrectes : 5/5"
  },
  {
    "id": "ar-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Convertir Ko, Mo et Go",
    "goal": "Appliquer la règle des puissances de 2 : 1 Mo = 1024 Ko et 1 Go = 1024 Mo.",
    "brief": "<p>Analysez chaque ligne proposée « valeur unite » : unite est un code parmi <code>ko</code>, <code>mo</code> ou <code>go</code>. Règle du support : 1 Mo = 1024 Ko et 1 Go = 1024 Mo (puissances de 2, pas 1000). Pour chaque ligne il convertit la taille en Mo et Indiquez <code>valeur unite : X mo</code>, puis le bilan <code>conversions : n</code>. Les valeurs fournies donnent toujours un résultat entier.</p>",
    "starter": "# Grille d'analyse (ar-c1-e2) — Convertir Ko, Mo et Go\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les trois unités melangees]\n# Données : 4\n# Données : 1024 ko\n# Données : 768 mo\n# Données : 1 go\n# Données : 4096 ko\nA_COMPLETER\n\n[Cas 2 — Que des go]\n# Données : 3\n# Données : 3 go\n# Données : 1 go\n# Données : 5 go\nA_COMPLETER\n\n[Cas 3 — Que des ko]\n# Données : 3\n# Données : 512 ko\n# Données : 3072 ko\n# Données : 8192 ko\nA_COMPLETER\n",
    "hints": [
      "Un case sur l'unité : ko divise par 1024, mo garde la valeur, go multiplie par 1024.",
      "La division entière s'écrit $((valeur / 1024))."
    ],
    "examples": [
      {
        "stdin": "3\n2048 ko\n512 mo\n2 go\n",
        "expected": "2048 ko : 2 mo\n512 mo : 512 mo\n2 go : 2048 mo\nconversions : 3"
      }
    ],
    "tests": [
      {
        "label": "Les trois unités melangees",
        "stdin": "cas:1",
        "expected": "1024 ko : 1 mo\n768 mo : 768 mo\n1 go : 1024 mo\n4096 ko : 4 mo\nconversions : 4"
      },
      {
        "label": "Que des go",
        "stdin": "cas:2",
        "expected": "3 go : 3072 mo\n1 go : 1024 mo\n5 go : 5120 mo\nconversions : 3"
      },
      {
        "label": "Que des ko",
        "stdin": "cas:3",
        "expected": "512 ko : 0 mo\n3072 ko : 3 mo\n8192 ko : 8 mo\nconversions : 3"
      }
    ],
    "solution": "[Exemple]\n2048 ko : 2 mo\n512 mo : 512 mo\n2 go : 2048 mo\nconversions : 3\n\n[Cas 1 — Les trois unités melangees]\n1024 ko : 1 mo\n768 mo : 768 mo\n1 go : 1024 mo\n4096 ko : 4 mo\nconversions : 4\n\n[Cas 2 — Que des go]\n3 go : 3072 mo\n1 go : 1024 mo\n5 go : 5120 mo\nconversions : 3\n\n[Cas 3 — Que des ko]\n512 ko : 0 mo\n3072 ko : 3 mo\n8192 ko : 8 mo\nconversions : 3"
  },
  {
    "id": "ar-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Mo/s ou Mbps",
    "goal": "Distinguer débit de stockage (Mo/s) et débit réseau (Mbps) : 1 octet = 8 bits.",
    "brief": "<p>Analysez chaque ligne proposée « valeur unite » : unite est un code parmi <code>mos</code> (Mo/s, débit de stockage) ou <code>mbps</code> (Mbit/s, débit réseau). Règle du support : un octet vaut 8 bits, donc MBps = 8 Mbps. Pour chaque ligne il convertit dans l'autre unité : <code>valeur mos : X mbps</code> (valeur × 8) ou <code>valeur mbps : X mos</code> (valeur ÷ 8), puis le bilan <code>conversions : n</code>. Les valeurs divisées par 8 donnent un résultat entier.</p>",
    "starter": "# Grille d'analyse (ar-c1-e3) — Mo/s ou Mbps\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Aller-retour complet]\n# Données : 4\n# Données : 16 mos\n# Données : 96 mbps\n# Données : 40 mbps\n# Données : 25 mos\nA_COMPLETER\n\n[Cas 2 — Que du reseau]\n# Données : 3\n# Données : 8 mbps\n# Données : 24 mbps\n# Données : 80 mbps\nA_COMPLETER\n\n[Cas 3 — Que du stockage]\n# Données : 3\n# Données : 5 mos\n# Données : 12 mos\n# Données : 100 mos\nA_COMPLETER\n",
    "hints": [
      "Mo/s vers Mbps : multiplier par 8. Mbps vers Mo/s : diviser par 8.",
      "Un case sur l'unité suffit, comme pour les Ko et les Mo."
    ],
    "examples": [
      {
        "stdin": "3\n2 mos\n64 mbps\n10 mos\n",
        "expected": "2 mos : 16 mbps\n64 mbps : 8 mos\n10 mos : 80 mbps\nconversions : 3"
      }
    ],
    "tests": [
      {
        "label": "Aller-retour complet",
        "stdin": "cas:1",
        "expected": "16 mos : 128 mbps\n96 mbps : 12 mos\n40 mbps : 5 mos\n25 mos : 200 mbps\nconversions : 4"
      },
      {
        "label": "Que du reseau",
        "stdin": "cas:2",
        "expected": "8 mbps : 1 mos\n24 mbps : 3 mos\n80 mbps : 10 mos\nconversions : 3"
      },
      {
        "label": "Que du stockage",
        "stdin": "cas:3",
        "expected": "5 mos : 40 mbps\n12 mos : 96 mbps\n100 mos : 800 mbps\nconversions : 3"
      }
    ],
    "solution": "[Exemple]\n2 mos : 16 mbps\n64 mbps : 8 mos\n10 mos : 80 mbps\nconversions : 3\n\n[Cas 1 — Aller-retour complet]\n16 mos : 128 mbps\n96 mbps : 12 mos\n40 mbps : 5 mos\n25 mos : 200 mbps\nconversions : 4\n\n[Cas 2 — Que du reseau]\n8 mbps : 1 mos\n24 mbps : 3 mos\n80 mbps : 10 mos\nconversions : 3\n\n[Cas 3 — Que du stockage]\n5 mos : 40 mbps\n12 mos : 96 mbps\n100 mos : 800 mbps\nconversions : 3"
  },
  {
    "id": "ar-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Du binaire au decimal",
    "goal": "Convertir un nombre binaire en décimal en sommant les poids des bits à 1.",
    "brief": "<p>Analysez chaque ligne proposée contenant chacune un <strong>binaire</strong> (10 bits au plus). Pour chaque ligne il convertit en décimal — le bit de poids le plus fort (MSB) porte le poids 2 puissance 9, le bit de poids le plus faible (LSB) porte 2 puissance 0 — et Indiquez <code>binaire : decimal=X</code>, puis le bilan <code>conversions : n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c2-e1) — Du binaire au decimal\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Du plus petit au plus grand]\n# Données : 5\n# Données : 1\n# Données : 1011\n# Données : 10000\n# Données : 11111\n# Données : 11001100\nA_COMPLETER\n\n[Cas 2 — Trois bits]\n# Données : 4\n# Données : 10\n# Données : 110\n# Données : 111\n# Données : 1001\nA_COMPLETER\n\n[Cas 3 — Mots de huit bits]\n# Données : 3\n# Données : 101010\n# Données : 110000\n# Données : 11111110\nA_COMPLETER\n",
    "hints": [
      "Chaque chiffre binaire (bit) de position k (en partant de 0 à droite) représente une puissance de 2 : 2^k.",
      "Additionnez les puissances de 2 correspondant aux bits valant 1 pour obtenir la valeur décimale."
    ],
    "examples": [
      {
        "stdin": "3\n1010\n11111111\n10000000\n",
        "expected": "1010 : decimal=10\n11111111 : decimal=255\n10000000 : decimal=128\nconversions : 3"
      }
    ],
    "tests": [
      {
        "label": "Du plus petit au plus grand",
        "stdin": "cas:1",
        "expected": "1 : decimal=1\n1011 : decimal=11\n10000 : decimal=16\n11111 : decimal=31\n11001100 : decimal=204\nconversions : 5"
      },
      {
        "label": "Trois bits",
        "stdin": "cas:2",
        "expected": "10 : decimal=2\n110 : decimal=6\n111 : decimal=7\n1001 : decimal=9\nconversions : 4"
      },
      {
        "label": "Mots de huit bits",
        "stdin": "cas:3",
        "expected": "101010 : decimal=42\n110000 : decimal=48\n11111110 : decimal=254\nconversions : 3"
      }
    ],
    "solution": "[Exemple]\n1010 : decimal=10\n11111111 : decimal=255\n10000000 : decimal=128\nconversions : 3\n\n[Cas 1 — Du plus petit au plus grand]\n1 : decimal=1\n1011 : decimal=11\n10000 : decimal=16\n11111 : decimal=31\n11001100 : decimal=204\nconversions : 5\n\n[Cas 2 — Trois bits]\n10 : decimal=2\n110 : decimal=6\n111 : decimal=7\n1001 : decimal=9\nconversions : 4\n\n[Cas 3 — Mots de huit bits]\n101010 : decimal=42\n110000 : decimal=48\n11111110 : decimal=254\nconversions : 3"
  },
  {
    "id": "ar-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Divisions successives",
    "goal": "Convertir un décimal en binaire par divisions successives, du reste au quotient.",
    "brief": "<p>Analysez chaque ligne proposée contenant chacune un <strong>décimal</strong> (0 à 255). Pour chaque ligne il applique la méthode du support : diviser par 2, noter le reste, recommencer jusqu'au quotient nul, puis lire les restes de bas en haut. Il Indiquez <code>decimal : binaire=X</code>, puis le bilan <code>conversions : n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c2-e2) — Divisions successives\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Avec le zero]\n# Données : 4\n# Données : 0\n# Données : 2\n# Données : 9\n# Données : 200\nA_COMPLETER\n\n[Cas 2 — Puissances de deux]\n# Données : 3\n# Données : 1\n# Données : 128\n# Données : 170\nA_COMPLETER\n\n[Cas 3 — Motifs simples]\n# Données : 3\n# Données : 7\n# Données : 64\n# Données : 254\nA_COMPLETER\n",
    "hints": [
      "Le reste vaut $((v % 2)) et le quotient $((v / 2)) ; chaque reste se place devant le résultat.",
      "Traite le cas 0 à part : son binaire est 0."
    ],
    "examples": [
      {
        "stdin": "3\n13\n32\n255\n",
        "expected": "13 : binaire=1101\n32 : binaire=100000\n255 : binaire=11111111\nconversions : 3"
      }
    ],
    "tests": [
      {
        "label": "Avec le zero",
        "stdin": "cas:1",
        "expected": "0 : binaire=0\n2 : binaire=10\n9 : binaire=1001\n200 : binaire=11001000\nconversions : 4"
      },
      {
        "label": "Puissances de deux",
        "stdin": "cas:2",
        "expected": "1 : binaire=1\n128 : binaire=10000000\n170 : binaire=10101010\nconversions : 3"
      },
      {
        "label": "Motifs simples",
        "stdin": "cas:3",
        "expected": "7 : binaire=111\n64 : binaire=1000000\n254 : binaire=11111110\nconversions : 3"
      }
    ],
    "solution": "[Exemple]\n13 : binaire=1101\n32 : binaire=100000\n255 : binaire=11111111\nconversions : 3\n\n[Cas 1 — Avec le zero]\n0 : binaire=0\n2 : binaire=10\n9 : binaire=1001\n200 : binaire=11001000\nconversions : 4\n\n[Cas 2 — Puissances de deux]\n1 : binaire=1\n128 : binaire=10000000\n170 : binaire=10101010\nconversions : 3\n\n[Cas 3 — Motifs simples]\n7 : binaire=111\n64 : binaire=1000000\n254 : binaire=11111110\nconversions : 3"
  },
  {
    "id": "ar-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "De l'hexadecimal a l'octal",
    "goal": "Enchaîner deux conversions : hexadécimal vers décimal puis décimal vers octal.",
    "brief": "<p>Analysez chaque ligne proposée contenant chacune un nombre <strong>hexadécimal</strong> (chiffres 0 à 9 et lettres A à F). Pour chaque ligne il passe par le décimal — comme dans la série d'exercices du support — puis fournit l'octal : <code>hexa : octal=X</code>, suivi du bilan <code>conversions : n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c2-e3) — De l'hexadecimal a l'octal\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Serie de revision]\n# Données : 4\n# Données : A\n# Données : 7F\n# Données : 100\n# Données : C0\nA_COMPLETER\n\n[Cas 2 — Petites valeurs]\n# Données : 3\n# Données : B\n# Données : 20\n# Données : 3E\nA_COMPLETER\n\n[Cas 3 — Autres motifs]\n# Données : 3\n# Données : 1A\n# Données : 55\n# Données : 6C\nA_COMPLETER\n",
    "hints": [
      "Chaque chiffre hexadécimal (0 à F) correspond exactement à un groupe de 4 bits (un quartet).",
      "Un chiffre octal (0 à 7) correspond à un groupe de 3 bits."
    ],
    "examples": [
      {
        "stdin": "3\nF\n10\nFF\n",
        "expected": "F : octal=17\n10 : octal=20\nFF : octal=377\nconversions : 3"
      }
    ],
    "tests": [
      {
        "label": "Serie de revision",
        "stdin": "cas:1",
        "expected": "A : octal=12\n7F : octal=177\n100 : octal=400\nC0 : octal=300\nconversions : 4"
      },
      {
        "label": "Petites valeurs",
        "stdin": "cas:2",
        "expected": "B : octal=13\n20 : octal=40\n3E : octal=76\nconversions : 3"
      },
      {
        "label": "Autres motifs",
        "stdin": "cas:3",
        "expected": "1A : octal=32\n55 : octal=125\n6C : octal=154\nconversions : 3"
      }
    ],
    "solution": "[Exemple]\nF : octal=17\n10 : octal=20\nFF : octal=377\nconversions : 3\n\n[Cas 1 — Serie de revision]\nA : octal=12\n7F : octal=177\n100 : octal=400\nC0 : octal=300\nconversions : 4\n\n[Cas 2 — Petites valeurs]\nB : octal=13\n20 : octal=40\n3E : octal=76\nconversions : 3\n\n[Cas 3 — Autres motifs]\n1A : octal=32\n55 : octal=125\n6C : octal=154\nconversions : 3"
  },
  {
    "id": "ar-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Complement a un",
    "goal": "Inverser tous les bits d'un mot binaire pour obtenir son complément à 1.",
    "brief": "<p>Analysez chaque ligne proposée contenant chacune un <strong>binaire de 4 bits</strong>. Pour chaque ligne il calcule le complément à 1 — chaque bit 0 devient 1 et chaque bit 1 devient 0, première représentation des nombres signés vue en cours — et Indiquez <code>binaire : c1=XXXX</code>, puis le bilan <code>complements : n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c3-e1) — Complement a un\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Inversion double]\n# Données : 4\n# Données : 1111\n# Données : 1001\n# Données : 0011\n# Données : 0101\nA_COMPLETER\n\n[Cas 2 — Bords opposes]\n# Données : 3\n# Données : 0001\n# Données : 1110\n# Données : 0111\nA_COMPLETER\n\n[Cas 3 — Poids fort a un]\n# Données : 2\n# Données : 1000\n# Données : 1101\nA_COMPLETER\n",
    "hints": [
      "La commande tr '01' '10' inverse tous les bits d'un mot.",
      "Passe par une variable : c1=$(printf '%s' \"$binaire\" | tr ...)."
    ],
    "examples": [
      {
        "stdin": "3\n0110\n0000\n1010\n",
        "expected": "0110 : c1=1001\n0000 : c1=1111\n1010 : c1=0101\ncomplements : 3"
      }
    ],
    "tests": [
      {
        "label": "Inversion double",
        "stdin": "cas:1",
        "expected": "1111 : c1=0000\n1001 : c1=0110\n0011 : c1=1100\n0101 : c1=1010\ncomplements : 4"
      },
      {
        "label": "Bords opposes",
        "stdin": "cas:2",
        "expected": "0001 : c1=1110\n1110 : c1=0001\n0111 : c1=1000\ncomplements : 3"
      },
      {
        "label": "Poids fort a un",
        "stdin": "cas:3",
        "expected": "1000 : c1=0111\n1101 : c1=0010\ncomplements : 2"
      }
    ],
    "solution": "[Exemple]\n0110 : c1=1001\n0000 : c1=1111\n1010 : c1=0101\ncomplements : 3\n\n[Cas 1 — Inversion double]\n1111 : c1=0000\n1001 : c1=0110\n0011 : c1=1100\n0101 : c1=1010\ncomplements : 4\n\n[Cas 2 — Bords opposes]\n0001 : c1=1110\n1110 : c1=0001\n0111 : c1=1000\ncomplements : 3\n\n[Cas 3 — Poids fort a un]\n1000 : c1=0111\n1101 : c1=0010\ncomplements : 2"
  },
  {
    "id": "ar-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Complement a deux",
    "goal": "Obtenir la représentation d'un nombre négatif : complément à 1 puis ajout de 1.",
    "brief": "<p>Analysez chaque ligne proposée contenant chacune un <strong>binaire de 4 bits</strong> représentant un nombre positif. Pour chaque ligne il calcule la représentation en complément à 2 de son opposé : on inverse les bits (complément à 1) puis on ajoute 1 — méthode officielle du support. Il Indiquez <code>binaire : c2=XXXX</code>, puis le bilan <code>complements : n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c3-e2) — Complement a deux\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre opposés]\n# Données : 4\n# Données : 0010\n# Données : 0101\n# Données : 1000\n# Données : 0111\nA_COMPLETER\n\n[Cas 2 — Du zero au grand]\n# Données : 3\n# Données : 0000\n# Données : 0011\n# Données : 1100\nA_COMPLETER\n\n[Cas 3 — Verification croisee]\n# Données : 3\n# Données : 1010\n# Données : 1001\n# Données : 1110\nA_COMPLETER\n",
    "hints": [
      "L'opposé d'une valeur v sur 4 bits vaut $(((16 - v) % 16)).",
      "Reconstruis le mot de 4 bits par divisions successives, du reste au quotient."
    ],
    "examples": [
      {
        "stdin": "3\n0001\n0110\n1111\n",
        "expected": "0001 : c2=1111\n0110 : c2=1010\n1111 : c2=0001\ncomplements : 3"
      }
    ],
    "tests": [
      {
        "label": "Quatre opposés",
        "stdin": "cas:1",
        "expected": "0010 : c2=1110\n0101 : c2=1011\n1000 : c2=1000\n0111 : c2=1001\ncomplements : 4"
      },
      {
        "label": "Du zero au grand",
        "stdin": "cas:2",
        "expected": "0000 : c2=0000\n0011 : c2=1101\n1100 : c2=0100\ncomplements : 3"
      },
      {
        "label": "Verification croisee",
        "stdin": "cas:3",
        "expected": "1010 : c2=0110\n1001 : c2=0111\n1110 : c2=0010\ncomplements : 3"
      }
    ],
    "solution": "[Exemple]\n0001 : c2=1111\n0110 : c2=1010\n1111 : c2=0001\ncomplements : 3\n\n[Cas 1 — Quatre opposés]\n0010 : c2=1110\n0101 : c2=1011\n1000 : c2=1000\n0111 : c2=1001\ncomplements : 4\n\n[Cas 2 — Du zero au grand]\n0000 : c2=0000\n0011 : c2=1101\n1100 : c2=0100\ncomplements : 3\n\n[Cas 3 — Verification croisee]\n1010 : c2=0110\n1001 : c2=0111\n1110 : c2=0010\ncomplements : 3"
  },
  {
    "id": "ar-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Addition binaire",
    "goal": "Poser l'addition de deux binaires : retenues de proche en proche, débordement visible.",
    "brief": "<p>Analysez chaque ligne proposée « a b » où a et b sont deux <strong>binaires de 4 bits</strong>. Pour chaque ligne il pose l'addition binaire — 0+0 donne 0, 1+0 donne 1, 1+1 donne 0 avec retenue 1, 1+1+1 donne 1 avec retenue 1 — et Indiquez le total sur 4 ou 5 bits : <code>a + b : somme=X</code>, puis le bilan <code>additions : n</code>. Le résultat dépasse parfois 4 bits : c'est le débordement à observer.</p>",
    "starter": "# Grille d'analyse (ar-c3-e3) — Addition binaire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Avec retenues en chaine]\n# Données : 4\n# Données : 0001 0001\n# Données : 1101 0110\n# Données : 1000 1000\n# Données : 0000 0000\nA_COMPLETER\n\n[Cas 2 — Puissances de deux]\n# Données : 3\n# Données : 0111 0001\n# Données : 1010 1010\n# Données : 0011 0100\nA_COMPLETER\n\n[Cas 3 — Debordements]\n# Données : 3\n# Données : 1110 0010\n# Données : 0101 0110\n# Données : 1001 0111\nA_COMPLETER\n",
    "hints": [
      "L’addition binaire s’effectue de droite à gauche avec propagation de la retenue (1 + 1 = 0 avec retenue 1).",
      "Convertissez les valeurs en décimal pour vérifier la cohérence du résultat final."
    ],
    "examples": [
      {
        "stdin": "3\n1010 0101\n0110 0011\n1111 1111\n",
        "expected": "1010 + 0101 : somme=1111\n0110 + 0011 : somme=1001\n1111 + 1111 : somme=11110\nadditions : 3"
      }
    ],
    "tests": [
      {
        "label": "Avec retenues en chaine",
        "stdin": "cas:1",
        "expected": "0001 + 0001 : somme=10\n1101 + 0110 : somme=10011\n1000 + 1000 : somme=10000\n0000 + 0000 : somme=0\nadditions : 4"
      },
      {
        "label": "Puissances de deux",
        "stdin": "cas:2",
        "expected": "0111 + 0001 : somme=1000\n1010 + 1010 : somme=10100\n0011 + 0100 : somme=111\nadditions : 3"
      },
      {
        "label": "Debordements",
        "stdin": "cas:3",
        "expected": "1110 + 0010 : somme=10000\n0101 + 0110 : somme=1011\n1001 + 0111 : somme=10000\nadditions : 3"
      }
    ],
    "solution": "[Exemple]\n1010 + 0101 : somme=1111\n0110 + 0011 : somme=1001\n1111 + 1111 : somme=11110\nadditions : 3\n\n[Cas 1 — Avec retenues en chaine]\n0001 + 0001 : somme=10\n1101 + 0110 : somme=10011\n1000 + 1000 : somme=10000\n0000 + 0000 : somme=0\nadditions : 4\n\n[Cas 2 — Puissances de deux]\n0111 + 0001 : somme=1000\n1010 + 1010 : somme=10100\n0011 + 0100 : somme=111\nadditions : 3\n\n[Cas 3 — Debordements]\n1110 + 0010 : somme=10000\n0101 + 0110 : somme=1011\n1001 + 0111 : somme=10000\nadditions : 3"
  },
  {
    "id": "ar-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Portes logiques de base",
    "goal": "Retrouver la sortie des huit portes : NOT, AND, NAND, OR, NOR, XOR, NXOR.",
    "brief": "<p>Analysez chaque ligne proposée « a b porte » : a et b valent 0 ou 1 et porte est un code parmi <code>and</code>, <code>or</code>, <code>xor</code>, <code>nand</code>, <code>nor</code> ou <code>xnor</code>. Rappel du support : AND donne 1 si les deux entrées valent 1, OR si au moins une vaut 1, XOR si elles diffèrent ; NAND, NOR et NXOR sont les négations des trois premières. Pour chaque ligne il Indiquez <code>a b : porte=X</code>, puis le bilan <code>bilan : n portes</code>.</p>",
    "starter": "# Grille d'analyse (ar-c4-e1) — Portes logiques de base\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les six portes]\n# Données : 6\n# Données : 1 1 nand\n# Données : 0 0 nor\n# Données : 1 0 nand\n# Données : 0 1 xnor\n# Données : 1 1 nor\n# Données : 0 0 and\nA_COMPLETER\n\n[Cas 2 — Cas extremes]\n# Données : 4\n# Données : 0 0 or\n# Données : 0 1 and\n# Données : 1 0 xnor\n# Données : 1 1 xor\nA_COMPLETER\n\n[Cas 3 — Portes negatrices]\n# Données : 4\n# Données : 1 1 xnor\n# Données : 0 1 nor\n# Données : 0 0 nand\n# Données : 1 0 or\nA_COMPLETER\n",
    "hints": [
      "Un case sur la porte : and donne 1 si a et b valent 1, or si au moins un vaut 1, xor si a diffère de b.",
      "Nand, nor et xnor sont le contraire de and, or et xor."
    ],
    "examples": [
      {
        "stdin": "3\n1 1 and\n1 0 or\n1 0 xor\n",
        "expected": "1 1 : and=1\n1 0 : or=1\n1 0 : xor=1\nbilan : 3 portes"
      }
    ],
    "tests": [
      {
        "label": "Les six portes",
        "stdin": "cas:1",
        "expected": "1 1 : nand=0\n0 0 : nor=1\n1 0 : nand=1\n0 1 : xnor=0\n1 1 : nor=0\n0 0 : and=0\nbilan : 6 portes"
      },
      {
        "label": "Cas extremes",
        "stdin": "cas:2",
        "expected": "0 0 : or=0\n0 1 : and=0\n1 0 : xnor=0\n1 1 : xor=0\nbilan : 4 portes"
      },
      {
        "label": "Portes negatrices",
        "stdin": "cas:3",
        "expected": "1 1 : xnor=1\n0 1 : nor=0\n0 0 : nand=1\n1 0 : or=1\nbilan : 4 portes"
      }
    ],
    "solution": "[Exemple]\n1 1 : and=1\n1 0 : or=1\n1 0 : xor=1\nbilan : 3 portes\n\n[Cas 1 — Les six portes]\n1 1 : nand=0\n0 0 : nor=1\n1 0 : nand=1\n0 1 : xnor=0\n1 1 : nor=0\n0 0 : and=0\nbilan : 6 portes\n\n[Cas 2 — Cas extremes]\n0 0 : or=0\n0 1 : and=0\n1 0 : xnor=0\n1 1 : xor=0\nbilan : 4 portes\n\n[Cas 3 — Portes negatrices]\n1 1 : xnor=1\n0 1 : nor=0\n0 0 : nand=1\n1 0 : or=1\nbilan : 4 portes"
  },
  {
    "id": "ar-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Additionneur complet 1 bit",
    "goal": "Simuler l'additionneur : somme et retenue sortante à partir de a, b et de la retenue entrante.",
    "brief": "<p>Analysez chaque ligne proposée « a b c » où a, b sont les deux bits à additionner et c la <strong>retenue entrante</strong>. Rappel du support : la somme vaut 1 quand le nombre de bits à 1 est impair, la retenue sortante vaut 1 dès que deux entrées au moins valent 1. Pour chaque ligne il Indiquez <code>a + b + c : somme=X retenue=Y</code>, puis le bilan <code>additions : n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c4-e2) — Additionneur complet 1 bit\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les huit combinaisons partielles]\n# Données : 4\n# Données : 0 0 1\n# Données : 0 1 1\n# Données : 1 0 1\n# Données : 1 1 0\nA_COMPLETER\n\n[Cas 2 — Retour au calme]\n# Données : 3\n# Données : 0 1 0\n# Données : 1 0 0\n# Données : 1 1 1\nA_COMPLETER\n\n[Cas 3 — Sortie du zero]\n# Données : 2\n# Données : 0 0 0\n# Données : 1 1 0\nA_COMPLETER\n",
    "hints": [
      "Fais le total $((a + b + c)) : la somme est son reste modulo 2, la retenue son quotient par 2.",
      "Vérifiez avec la table : 1+1+1 donne somme 1 et retenue 1."
    ],
    "examples": [
      {
        "stdin": "3\n0 0 0\n1 0 0\n1 1 1\n",
        "expected": "0 + 0 + 0 : somme=0 retenue=0\n1 + 0 + 0 : somme=1 retenue=0\n1 + 1 + 1 : somme=1 retenue=1\nadditions : 3"
      }
    ],
    "tests": [
      {
        "label": "Les huit combinaisons partielles",
        "stdin": "cas:1",
        "expected": "0 + 0 + 1 : somme=1 retenue=0\n0 + 1 + 1 : somme=0 retenue=1\n1 + 0 + 1 : somme=0 retenue=1\n1 + 1 + 0 : somme=0 retenue=1\nadditions : 4"
      },
      {
        "label": "Retour au calme",
        "stdin": "cas:2",
        "expected": "0 + 1 + 0 : somme=1 retenue=0\n1 + 0 + 0 : somme=1 retenue=0\n1 + 1 + 1 : somme=1 retenue=1\nadditions : 3"
      },
      {
        "label": "Sortie du zero",
        "stdin": "cas:3",
        "expected": "0 + 0 + 0 : somme=0 retenue=0\n1 + 1 + 0 : somme=0 retenue=1\nadditions : 2"
      }
    ],
    "solution": "[Exemple]\n0 + 0 + 0 : somme=0 retenue=0\n1 + 0 + 0 : somme=1 retenue=0\n1 + 1 + 1 : somme=1 retenue=1\nadditions : 3\n\n[Cas 1 — Les huit combinaisons partielles]\n0 + 0 + 1 : somme=1 retenue=0\n0 + 1 + 1 : somme=0 retenue=1\n1 + 0 + 1 : somme=0 retenue=1\n1 + 1 + 0 : somme=0 retenue=1\nadditions : 4\n\n[Cas 2 — Retour au calme]\n0 + 1 + 0 : somme=1 retenue=0\n1 + 0 + 0 : somme=1 retenue=0\n1 + 1 + 1 : somme=1 retenue=1\nadditions : 3\n\n[Cas 3 — Sortie du zero]\n0 + 0 + 0 : somme=0 retenue=0\n1 + 1 + 0 : somme=0 retenue=1\nadditions : 2"
  },
  {
    "id": "ar-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Decodeur 2 vers 4",
    "goal": "Activer une seule sortie parmi quatre selon les deux bits d'entrée.",
    "brief": "<p>Analysez chaque ligne proposée « a b » : a est le bit de poids faible et b le bit de poids fort d'une adresse de 2 bits. Le décodeur du support active une seule sortie : Y0 quand l'adresse vaut 00, Y1 pour 01, Y2 pour 10 et Y3 pour 11 (a et b lus dans cet ordre : a d'abord, b ensuite). Pour chaque ligne il Indiquez <code>a b : Y3Y2Y1Y0 = XXXX</code> où XXXX est le mot de sortie, puis le bilan <code>decodages : n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c4-e3) — Decodeur 2 vers 4\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre adresses]\n# Données : 4\n# Données : 0 1\n# Données : 1 1\n# Données : 0 0\n# Données : 1 0\nA_COMPLETER\n\n[Cas 2 — Alternance]\n# Données : 2\n# Données : 1 0\n# Données : 0 1\nA_COMPLETER\n\n[Cas 3 — Adresse haute]\n# Données : 1\n# Données : 1 1\nA_COMPLETER\n",
    "hints": [
      "L'indice de la sortie active vaut 2 fois b plus a.",
      "Un if imbrique ou un case sur les deux bits donne le mot de 4 caractères."
    ],
    "examples": [
      {
        "stdin": "3\n0 0\n1 0\n1 1\n",
        "expected": "0 0 : Y3Y2Y1Y0 = 0001\n1 0 : Y3Y2Y1Y0 = 0010\n1 1 : Y3Y2Y1Y0 = 1000\ndecodages : 3"
      }
    ],
    "tests": [
      {
        "label": "Les quatre adresses",
        "stdin": "cas:1",
        "expected": "0 1 : Y3Y2Y1Y0 = 0100\n1 1 : Y3Y2Y1Y0 = 1000\n0 0 : Y3Y2Y1Y0 = 0001\n1 0 : Y3Y2Y1Y0 = 0010\ndecodages : 4"
      },
      {
        "label": "Alternance",
        "stdin": "cas:2",
        "expected": "1 0 : Y3Y2Y1Y0 = 0010\n0 1 : Y3Y2Y1Y0 = 0100\ndecodages : 2"
      },
      {
        "label": "Adresse haute",
        "stdin": "cas:3",
        "expected": "1 1 : Y3Y2Y1Y0 = 1000\ndecodages : 1"
      }
    ],
    "solution": "[Exemple]\n0 0 : Y3Y2Y1Y0 = 0001\n1 0 : Y3Y2Y1Y0 = 0010\n1 1 : Y3Y2Y1Y0 = 1000\ndecodages : 3\n\n[Cas 1 — Les quatre adresses]\n0 1 : Y3Y2Y1Y0 = 0100\n1 1 : Y3Y2Y1Y0 = 1000\n0 0 : Y3Y2Y1Y0 = 0001\n1 0 : Y3Y2Y1Y0 = 0010\ndecodages : 4\n\n[Cas 2 — Alternance]\n1 0 : Y3Y2Y1Y0 = 0010\n0 1 : Y3Y2Y1Y0 = 0100\ndecodages : 2\n\n[Cas 3 — Adresse haute]\n1 1 : Y3Y2Y1Y0 = 1000\ndecodages : 1"
  },
  {
    "id": "ar-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Bascule D",
    "goal": "Suivre l'état d'une bascule D : la sortie recopie l'entrée à chaque front d'horloge.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Rappel du support : à chaque front d'horloge, la bascule D recopie son entrée sur sa sortie Q. Pour chaque front il Indiquez <code>front i : Q=X</code>, puis <code>etat final : Q=X</code>.</p>",
    "starter": "# Grille d'analyse (ar-c5-e1) — Bascule D\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq fronts]\n# Données : 5\n# Données : 0\n# Données : 0\n# Données : 1\n# Données : 0\n# Données : 1\nA_COMPLETER\n\n[Cas 2 — Reste a un]\n# Données : 3\n# Données : 1\n# Données : 1\n# Données : 1\nA_COMPLETER\n\n[Cas 3 — Retour a zero]\n# Données : 4\n# Données : 0\n# Données : 1\n# Données : 0\n# Données : 0\nA_COMPLETER\n",
    "hints": [
      "À chaque front, Q prend simplement la valeur de D.",
      "L'état final s'affiche une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "4\n1\n0\n1\n1\n",
        "expected": "front 1 : Q=1\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=1\netat final : Q=1"
      }
    ],
    "tests": [
      {
        "label": "Cinq fronts",
        "stdin": "cas:1",
        "expected": "front 1 : Q=0\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=0\nfront 5 : Q=1\netat final : Q=1"
      },
      {
        "label": "Reste a un",
        "stdin": "cas:2",
        "expected": "front 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=1\netat final : Q=1"
      },
      {
        "label": "Retour a zero",
        "stdin": "cas:3",
        "expected": "front 1 : Q=0\nfront 2 : Q=1\nfront 3 : Q=0\nfront 4 : Q=0\netat final : Q=0"
      }
    ],
    "solution": "[Exemple]\nfront 1 : Q=1\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=1\netat final : Q=1\n\n[Cas 1 — Cinq fronts]\nfront 1 : Q=0\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=0\nfront 5 : Q=1\netat final : Q=1\n\n[Cas 2 — Reste a un]\nfront 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=1\netat final : Q=1\n\n[Cas 3 — Retour a zero]\nfront 1 : Q=0\nfront 2 : Q=1\nfront 3 : Q=0\nfront 4 : Q=0\netat final : Q=0"
  },
  {
    "id": "ar-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Bascule JK",
    "goal": "Appliquer les quatre modes de la bascule JK : mémoriser, mettre à 1, mettre à 0, basculer.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Rappel du support : J=0 et K=0 mémorise l'état, J=1 et K=0 met Q à 1 (set), J=0 et K=1 met Q à 0 (reset), J=1 et K=1 fait <strong>basculer</strong> Q (toggle). Pour chaque front il Indiquez <code>front i : Q=X</code>, puis <code>etat final : Q=X</code>.</p>",
    "starter": "# Grille d'analyse (ar-c5-e2) — Bascule JK\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Basculements en serie]\n# Données : 5\n# Données : 1 1\n# Données : 1 1\n# Données : 1 1\n# Données : 0 0\n# Données : 0 1\nA_COMPLETER\n\n[Cas 2 — Set puis toggle]\n# Données : 3\n# Données : 0 1\n# Données : 1 0\n# Données : 1 1\nA_COMPLETER\n\n[Cas 3 — Memoire puis set]\n# Données : 4\n# Données : 1 1\n# Données : 0 0\n# Données : 0 0\n# Données : 1 0\nA_COMPLETER\n",
    "hints": [
      "Un if imbrique sur j et k : 00 garde, 10 met à 1, 01 met à 0, 11 inverse.",
      "Pour le mode toggle : si Q vaut 0 il devient 1, sinon il devient 0."
    ],
    "examples": [
      {
        "stdin": "4\n1 0\n0 0\n1 1\n0 1\n",
        "expected": "front 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=0\nfront 4 : Q=0\netat final : Q=0"
      }
    ],
    "tests": [
      {
        "label": "Basculements en serie",
        "stdin": "cas:1",
        "expected": "front 1 : Q=1\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=1\nfront 5 : Q=0\netat final : Q=0"
      },
      {
        "label": "Set puis toggle",
        "stdin": "cas:2",
        "expected": "front 1 : Q=0\nfront 2 : Q=1\nfront 3 : Q=0\netat final : Q=0"
      },
      {
        "label": "Memoire puis set",
        "stdin": "cas:3",
        "expected": "front 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=1\nfront 4 : Q=1\netat final : Q=1"
      }
    ],
    "solution": "[Exemple]\nfront 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=0\nfront 4 : Q=0\netat final : Q=0\n\n[Cas 1 — Basculements en serie]\nfront 1 : Q=1\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=1\nfront 5 : Q=0\netat final : Q=0\n\n[Cas 2 — Set puis toggle]\nfront 1 : Q=0\nfront 2 : Q=1\nfront 3 : Q=0\netat final : Q=0\n\n[Cas 3 — Memoire puis set]\nfront 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=1\nfront 4 : Q=1\netat final : Q=1"
  },
  {
    "id": "ar-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Compteur modulo 8",
    "goal": "Simuler un compteur binaire qui revient à zéro après 8 fronts et compter ses retours à zéro.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Le compteur avance de 1 à chaque front et revient à 0 après 7 (comptage modulo 8). Pour chaque front il Indiquez <code>front i : compteur=X</code>, puis <code>retours : k</code> où k est le nombre de fois où le compteur est repassé par 0 pendant la simulation.</p>",
    "starter": "# Grille d'analyse (ar-c5-e3) — Compteur modulo 8\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq fronts depuis trois]\n# Données : 5\n# Données : 3\nA_COMPLETER\n\n[Cas 2 — Sans retour]\n# Données : 4\n# Données : 0\nA_COMPLETER\n\n[Cas 3 — Deux cycles complets]\n# Données : 16\n# Données : 7\nA_COMPLETER\n",
    "hints": [
      "La valeur au front i vaut (depart + i) modulo 8.",
      "Le nombre de retours vaut (depart + n) divisé par 8, en division entière."
    ],
    "examples": [
      {
        "stdin": "10\n6\n",
        "expected": "front 1 : compteur=7\nfront 2 : compteur=0\nfront 3 : compteur=1\nfront 4 : compteur=2\nfront 5 : compteur=3\nfront 6 : compteur=4\nfront 7 : compteur=5\nfront 8 : compteur=6\nfront 9 : compteur=7\nfront 10 : compteur=0\nretours : 2"
      }
    ],
    "tests": [
      {
        "label": "Cinq fronts depuis trois",
        "stdin": "cas:1",
        "expected": "front 1 : compteur=4\nfront 2 : compteur=5\nfront 3 : compteur=6\nfront 4 : compteur=7\nfront 5 : compteur=0\nretours : 1"
      },
      {
        "label": "Sans retour",
        "stdin": "cas:2",
        "expected": "front 1 : compteur=1\nfront 2 : compteur=2\nfront 3 : compteur=3\nfront 4 : compteur=4\nretours : 0"
      },
      {
        "label": "Deux cycles complets",
        "stdin": "cas:3",
        "expected": "front 1 : compteur=0\nfront 2 : compteur=1\nfront 3 : compteur=2\nfront 4 : compteur=3\nfront 5 : compteur=4\nfront 6 : compteur=5\nfront 7 : compteur=6\nfront 8 : compteur=7\nfront 9 : compteur=0\nfront 10 : compteur=1\nfront 11 : compteur=2\nfront 12 : compteur=3\nfront 13 : compteur=4\nfront 14 : compteur=5\nfront 15 : compteur=6\nfront 16 : compteur=7\nretours : 2"
      }
    ],
    "solution": "[Exemple]\nfront 1 : compteur=7\nfront 2 : compteur=0\nfront 3 : compteur=1\nfront 4 : compteur=2\nfront 5 : compteur=3\nfront 6 : compteur=4\nfront 7 : compteur=5\nfront 8 : compteur=6\nfront 9 : compteur=7\nfront 10 : compteur=0\nretours : 2\n\n[Cas 1 — Cinq fronts depuis trois]\nfront 1 : compteur=4\nfront 2 : compteur=5\nfront 3 : compteur=6\nfront 4 : compteur=7\nfront 5 : compteur=0\nretours : 1\n\n[Cas 2 — Sans retour]\nfront 1 : compteur=1\nfront 2 : compteur=2\nfront 3 : compteur=3\nfront 4 : compteur=4\nretours : 0\n\n[Cas 3 — Deux cycles complets]\nfront 1 : compteur=0\nfront 2 : compteur=1\nfront 3 : compteur=2\nfront 4 : compteur=3\nfront 5 : compteur=4\nfront 6 : compteur=5\nfront 7 : compteur=6\nfront 8 : compteur=7\nfront 9 : compteur=0\nfront 10 : compteur=1\nfront 11 : compteur=2\nfront 12 : compteur=3\nfront 13 : compteur=4\nfront 14 : compteur=5\nfront 15 : compteur=6\nfront 16 : compteur=7\nretours : 2"
  },
  {
    "id": "ar-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Peripheriques : entree, sortie ou les deux",
    "goal": "Classer les périphériques entre entrée, sortie et entrée-sortie.",
    "brief": "<p>Analysez chaque ligne proposée « peripherique typeannonce » : typeannonce est un code parmi <code>entree</code>, <code>sortie</code> ou <code>double</code>. Rappel du support : clavier, souris et scanner envoient des données vers l'unité centrale (entrée) ; écran, imprimante et haut-parleur en reçoivent (sortie) ; écran tactile et modem font les deux. Pour chaque ligne il Indiquez <code>peripherique : OK</code> ou <code>peripherique : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c6-e1) — Peripheriques : entree, sortie ou les deux\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les huit peripheriques]\n# Données : 8\n# Données : clavier entree\n# Données : souris entree\n# Données : scanner entree\n# Données : ecran sortie\n# Données : imprimante sortie\n# Données : hautparleur sortie\n# Données : tactile double\n# Données : modem double\nA_COMPLETER\n\n[Cas 2 — Deux confusions]\n# Données : 4\n# Données : souris sortie\n# Données : modem entree\n# Données : scanner entree\n# Données : imprimante sortie\nA_COMPLETER\n\n[Cas 3 — Bureau equipe]\n# Données : 5\n# Données : clavier entree\n# Données : ecran sortie\n# Données : imprimante sortie\n# Données : tactile double\n# Données : souris entree\nA_COMPLETER\n",
    "hints": [
      "Un case sur le périphérique donne le type attendu ; compare-le au type annoncé.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nclavier entree\necran sortie\ntactile sortie\n",
        "expected": "clavier : OK\necran : OK\ntactile : ERREUR\ncorrectes : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Les huit peripheriques",
        "stdin": "cas:1",
        "expected": "clavier : OK\nsouris : OK\nscanner : OK\necran : OK\nimprimante : OK\nhautparleur : OK\ntactile : OK\nmodem : OK\ncorrectes : 8/8"
      },
      {
        "label": "Deux confusions",
        "stdin": "cas:2",
        "expected": "souris : ERREUR\nmodem : ERREUR\nscanner : OK\nimprimante : OK\ncorrectes : 2/4"
      },
      {
        "label": "Bureau equipe",
        "stdin": "cas:3",
        "expected": "clavier : OK\necran : OK\nimprimante : OK\ntactile : OK\nsouris : OK\ncorrectes : 5/5"
      }
    ],
    "solution": "[Exemple]\nclavier : OK\necran : OK\ntactile : ERREUR\ncorrectes : 2/3\n\n[Cas 1 — Les huit peripheriques]\nclavier : OK\nsouris : OK\nscanner : OK\necran : OK\nimprimante : OK\nhautparleur : OK\ntactile : OK\nmodem : OK\ncorrectes : 8/8\n\n[Cas 2 — Deux confusions]\nsouris : ERREUR\nmodem : ERREUR\nscanner : OK\nimprimante : OK\ncorrectes : 2/4\n\n[Cas 3 — Bureau equipe]\nclavier : OK\necran : OK\nimprimante : OK\ntactile : OK\nsouris : OK\ncorrectes : 5/5"
  },
  {
    "id": "ar-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Les blocs de von Neumann",
    "goal": "Ranger chaque composant dans le bloc du modèle de von Neumann : calcul, contrôle, mémoire, E/S.",
    "brief": "<p>Analysez chaque ligne proposée « bloc famille » : famille est un code parmi <code>calcul</code> (UAL), <code>controle</code> (unité de commande), <code>memoire</code> ou <code>es</code> (entrées-sorties). Rappel du support : l'UAL fait les calculs, l'unité de commande orchestre, la mémoire conserve (RAM, ROM, disque) et les E/S communiquent avec l'extérieur (clavier, écran, imprimante). Pour chaque ligne il Indiquez <code>bloc : OK</code> ou <code>bloc : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c6-e2) — Les blocs de von Neumann\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les huit blocs]\n# Données : 8\n# Données : ual calcul\n# Données : ucc controle\n# Données : ram memoire\n# Données : rom memoire\n# Données : disque memoire\n# Données : clavier es\n# Données : ecran es\n# Données : imprimante es\nA_COMPLETER\n\n[Cas 2 — Deux erreurs ciblees]\n# Données : 4\n# Données : disque es\n# Données : ucc memoire\n# Données : rom memoire\n# Données : ual calcul\nA_COMPLETER\n\n[Cas 3 — Machine complete]\n# Données : 6\n# Données : ucc controle\n# Données : ram memoire\n# Données : clavier es\n# Données : ual calcul\n# Données : ecran es\n# Données : disque memoire\nA_COMPLETER\n",
    "hints": [
      "Un case sur le bloc : ual va en calcul, ucc en contrôle, ram et rom et disque en mémoire, clavier et ecran et imprimante en E/S.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nual calcul\nucc calcul\nram memoire\n",
        "expected": "ual : OK\nucc : ERREUR\nram : OK\ncorrects : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Les huit blocs",
        "stdin": "cas:1",
        "expected": "ual : OK\nucc : OK\nram : OK\nrom : OK\ndisque : OK\nclavier : OK\necran : OK\nimprimante : OK\ncorrects : 8/8"
      },
      {
        "label": "Deux erreurs ciblees",
        "stdin": "cas:2",
        "expected": "disque : ERREUR\nucc : ERREUR\nrom : OK\nual : OK\ncorrects : 2/4"
      },
      {
        "label": "Machine complete",
        "stdin": "cas:3",
        "expected": "ucc : OK\nram : OK\nclavier : OK\nual : OK\necran : OK\ndisque : OK\ncorrects : 6/6"
      }
    ],
    "solution": "[Exemple]\nual : OK\nucc : ERREUR\nram : OK\ncorrects : 2/3\n\n[Cas 1 — Les huit blocs]\nual : OK\nucc : OK\nram : OK\nrom : OK\ndisque : OK\nclavier : OK\necran : OK\nimprimante : OK\ncorrects : 8/8\n\n[Cas 2 — Deux erreurs ciblees]\ndisque : ERREUR\nucc : ERREUR\nrom : OK\nual : OK\ncorrects : 2/4\n\n[Cas 3 — Machine complete]\nucc : OK\nram : OK\nclavier : OK\nual : OK\necran : OK\ndisque : OK\ncorrects : 6/6"
  },
  {
    "id": "ar-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Qualifier un poste de travail",
    "goal": "Classer des postes selon la fréquence du processeur et la RAM, critères de choix du support.",
    "brief": "<p>Analysez chaque ligne proposée « frequence memoire » : frequence est la cadence du processeur en MHz et memoire la RAM en Mo. Règle du support adaptée : un poste est <code>multimedia</code> si la fréquence atteint 2000 MHz et la RAM 4096 Mo, <code>bureautique</code> si la fréquence atteint 1000 MHz et la RAM 2048 Mo, sinon <code>basique</code>. Pour chaque ligne il Indiquez <code>frequence memoire : profil</code>, puis le bilan <code>postes : n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c6-e3) — Qualifier un poste de travail\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Aux frontieres des seuils]\n# Données : 4\n# Données : 2200 4096\n# Données : 2000 2048\n# Données : 999 2048\n# Données : 3000 512\nA_COMPLETER\n\n[Cas 2 — Salles machine]\n# Données : 3\n# Données : 1000 2048\n# Données : 2600 16384\n# Données : 500 512\nA_COMPLETER\n\n[Cas 3 — Petit parc]\n# Données : 2\n# Données : 2100 8192\n# Données : 1200 1024\nA_COMPLETER\n",
    "hints": [
      "Testez d'abord le profil le plus exigeant : -ge 2000 et -ge 4096, puis le profil intermédiaire.",
      "Sinon le poste est basique."
    ],
    "examples": [
      {
        "stdin": "3\n2400 8192\n1500 2048\n800 1024\n",
        "expected": "2400 8192 : multimedia\n1500 2048 : bureautique\n800 1024 : basique\npostes : 3"
      }
    ],
    "tests": [
      {
        "label": "Aux frontieres des seuils",
        "stdin": "cas:1",
        "expected": "2200 4096 : multimedia\n2000 2048 : bureautique\n999 2048 : basique\n3000 512 : basique\npostes : 4"
      },
      {
        "label": "Salles machine",
        "stdin": "cas:2",
        "expected": "1000 2048 : bureautique\n2600 16384 : multimedia\n500 512 : basique\npostes : 3"
      },
      {
        "label": "Petit parc",
        "stdin": "cas:3",
        "expected": "2100 8192 : multimedia\n1200 1024 : basique\npostes : 2"
      }
    ],
    "solution": "[Exemple]\n2400 8192 : multimedia\n1500 2048 : bureautique\n800 1024 : basique\npostes : 3\n\n[Cas 1 — Aux frontieres des seuils]\n2200 4096 : multimedia\n2000 2048 : bureautique\n999 2048 : basique\n3000 512 : basique\npostes : 4\n\n[Cas 2 — Salles machine]\n1000 2048 : bureautique\n2600 16384 : multimedia\n500 512 : basique\npostes : 3\n\n[Cas 3 — Petit parc]\n2100 8192 : multimedia\n1200 1024 : basique\npostes : 2"
  }
];
