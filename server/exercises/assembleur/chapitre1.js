'use strict';

module.exports = [
  {
    "id": "asm2-c1-e1",
    "chapter": 1,
    "title": "Masquage binaire & opérations logiques (AND, OR, XOR)",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer des masques binaires 8 bits pour isoler, forcer ou inverser des bits.",
    "brief": "<p>En programmation assembleur, les opérations bit à bit (AND, OR, XOR) sont omniprésentes pour manipuler les registres et interagir avec le matériel. Analysez les paramètres du problème pour chaque cas. <code>0x3F</code>) ;</li>  <li><code>OP</code> est l’opération à appliquer parmi <code>AND</code>, <code>OR</code>, <code>XOR</code>.</li></ul><p>Indiquez le résultat sur 8 bits au format :<br><code>HEX=0xXX BIN=bbbbbbbb</code> (où XX est en majuscules sur 2 chiffres et bbbbbbbb sur 8 bits binaires).</p>",
    "starter": "# Grille d'analyse (asm2-c1-e1) — Masquage binaire & opérations logiques (AND, OR, XOR)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Opération OR pour forcer des bits]\n# Données : 0x80;0x01;OR\nA_COMPLETER\n\n[Cas 2 — Opération XOR pour inverser un quartet]\n# Données : 0xAA;0x0F;XOR\nA_COMPLETER\n\n[Cas 3 — Opération AND masque nul]\n# Données : 0xFF;0x00;AND\nA_COMPLETER\n\n[Cas 4 — Opération XOR identité (bascule complète)]\n# Données : 0x55;0xAA;XOR\nA_COMPLETER\n",
    "hints": [
      "Utilise int(val_str, 16) pour convertir la chaîne hexadécimale en entier.",
      "Les opérateurs bit à bit en Python sont &, | et ^.",
      "Formate avec f\"HEX=0x{res:02X} BIN={res:08b}\"."
    ],
    "examples": [
      {
        "stdin": "0x3F;0x0F;AND",
        "expected": "HEX=0x0F BIN=00001111",
        "note": "0x3F (00111111) AND 0x0F (00001111) = 0x0F (00001111)."
      }
    ],
    "tests": [
      {
        "label": "Opération OR pour forcer des bits",
        "stdin": "cas:1",
        "expected": "HEX=0x81 BIN=10000001"
      },
      {
        "label": "Opération XOR pour inverser un quartet",
        "stdin": "cas:2",
        "expected": "HEX=0xA5 BIN=10100101"
      },
      {
        "label": "Opération AND masque nul",
        "stdin": "cas:3",
        "expected": "HEX=0x00 BIN=00000000"
      },
      {
        "label": "Opération XOR identité (bascule complète)",
        "stdin": "cas:4",
        "expected": "HEX=0xFF BIN=11111111"
      }
    ],
    "solution": "[Exemple]\nHEX=0x0F BIN=00001111\n\n[Cas 1 — Opération OR pour forcer des bits]\nHEX=0x81 BIN=10000001\n\n[Cas 2 — Opération XOR pour inverser un quartet]\nHEX=0xA5 BIN=10100101\n\n[Cas 3 — Opération AND masque nul]\nHEX=0x00 BIN=00000000\n\n[Cas 4 — Opération XOR identité (bascule complète)]\nHEX=0xFF BIN=11111111"
  },
  {
    "id": "asm2-c1-e2",
    "chapter": 1,
    "title": "Décodage du Complément à 2 (8 bits & 16 bits)",
    "level": "n1",
    "language": "analyse",
    "goal": "Convertir une valeur hexadécimale brute en entier signé selon le complément à 2.",
    "brief": "<p>Les processeurs représentent les entiers relatifs selon la convention du <strong>complément à 2</strong>. Le bit de poids fort (MSB) détermine le signe (0 = positif, 1 = négatif). Analysez les paramètres du problème pour chaque cas. <code>0xFF</code> ou <code>0x8000</code>) ;</li>  <li><code>BITS</code> est la largeur du registre (8 ou 16).</li></ul><p>Indiquez la valeur décimale signée au format :<br><code>DEC=&lt;valeur signée&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c1-e2) — Décodage du Complément à 2 (8 bits & 16 bits)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Minimum 8 bits signé (-128)]\n# Données : 0x80;8\nA_COMPLETER\n\n[Cas 2 — Maximum 8 bits signé (+127)]\n# Données : 0x7F;8\nA_COMPLETER\n\n[Cas 3 — Valeur négative 16 bits (-1)]\n# Données : 0xFFFF;16\nA_COMPLETER\n\n[Cas 4 — Valeur négative 16 bits (-1000)]\n# Données : 0xFC18;16\nA_COMPLETER\n",
    "hints": [
      "Pour 8 bits, si la valeur >= 128 (0x80), soustrais 256 (2^8).",
      "Pour 16 bits, si la valeur >= 32768 (0x8000), soustrais 65536 (2^16)."
    ],
    "examples": [
      {
        "stdin": "0xFF;8",
        "expected": "DEC=-1",
        "note": "0xFF sur 8 bits correspond à -1 en complément à 2."
      }
    ],
    "tests": [
      {
        "label": "Minimum 8 bits signé (-128)",
        "stdin": "cas:1",
        "expected": "DEC=-128"
      },
      {
        "label": "Maximum 8 bits signé (+127)",
        "stdin": "cas:2",
        "expected": "DEC=127"
      },
      {
        "label": "Valeur négative 16 bits (-1)",
        "stdin": "cas:3",
        "expected": "DEC=-1"
      },
      {
        "label": "Valeur négative 16 bits (-1000)",
        "stdin": "cas:4",
        "expected": "DEC=-1000"
      }
    ],
    "solution": "[Exemple]\nDEC=-1\n\n[Cas 1 — Minimum 8 bits signé (-128)]\nDEC=-128\n\n[Cas 2 — Maximum 8 bits signé (+127)]\nDEC=127\n\n[Cas 3 — Valeur négative 16 bits (-1)]\nDEC=-1\n\n[Cas 4 — Valeur négative 16 bits (-1000)]\nDEC=-1000"
  },
  {
    "id": "asm2-c1-e3",
    "chapter": 1,
    "title": "Décalages logiques & arithmétiques (SHL, SHR, SAR)",
    "level": "n2",
    "language": "analyse",
    "goal": "Distinguer le décalage logique vers la droite (SHR) et le décalage arithmétique avec préservation du signe (SAR).",
    "brief": "<p>Les instructions de décalage permettent d’effectuer des multiplications et divisions rapides par des puissances de 2. Sur 8 bits :</p><ul>  <li><code>SHL</code> : décale les bits à gauche et insère des 0 à droite ;</li>  <li><code>SHR</code> : décale à droite et insère des 0 à gauche (pour entiers non signés) ;</li>  <li><code>SAR</code> : décale à droite en répliquant le bit de signe (bit 7) à gauche (pour entiers signés).</li></ul><p>Analysez les paramètres du problème pour chaque cas.</p>",
    "starter": "# Grille d'analyse (asm2-c1-e3) — Décalages logiques & arithmétiques (SHL, SHR, SAR)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — SHR logique sur nombre négatif]\n# Données : 0x80;2;SHR\nA_COMPLETER\n\n[Cas 2 — SAR arithmétique préservant le bit de signe 1]\n# Données : 0x80;2;SAR\nA_COMPLETER\n\n[Cas 3 — SAR sur -2 (0xFE) décalé de 1]\n# Données : 0xFE;1;SAR\nA_COMPLETER\n\n[Cas 4 — SHL standard sans débordement]\n# Données : 0x0A;3;SHL\nA_COMPLETER\n",
    "hints": [
      "Pour SAR, si le bit 7 est à 1 (val >= 128), les bits insérés à gauche lors du shift doivent être des 1.",
      "Une façon simple pour SAR : convertis en entier signé (-128..127), applique >> n, puis prends & 0xFF."
    ],
    "examples": [
      {
        "stdin": "0x80;1;SHL",
        "expected": "RES=0x00",
        "note": "0x80 (10000000) décalé de 1 à gauche déborde sur 8 bits et devient 0x00."
      }
    ],
    "tests": [
      {
        "label": "SHR logique sur nombre négatif",
        "stdin": "cas:1",
        "expected": "RES=0x20"
      },
      {
        "label": "SAR arithmétique préservant le bit de signe 1",
        "stdin": "cas:2",
        "expected": "RES=0xE0"
      },
      {
        "label": "SAR sur -2 (0xFE) décalé de 1",
        "stdin": "cas:3",
        "expected": "RES=0xFF"
      },
      {
        "label": "SHL standard sans débordement",
        "stdin": "cas:4",
        "expected": "RES=0x50"
      }
    ],
    "solution": "[Exemple]\nRES=0x00\n\n[Cas 1 — SHR logique sur nombre négatif]\nRES=0x20\n\n[Cas 2 — SAR arithmétique préservant le bit de signe 1]\nRES=0xE0\n\n[Cas 3 — SAR sur -2 (0xFE) décalé de 1]\nRES=0xFF\n\n[Cas 4 — SHL standard sans débordement]\nRES=0x50"
  }
];
