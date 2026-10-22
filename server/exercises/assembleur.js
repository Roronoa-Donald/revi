'use strict';

module.exports = [
  {
    "id": "asm2-c1-e1",
    "chapter": 1,
    "title": "Masquage binaire & opérations logiques (AND, OR, XOR)",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer des masques binaires 8 bits pour isoler, forcer ou inverser des bits.",
    "brief": "<p>En programmation assembleur, les opérations bit à bit (AND, OR, XOR) sont omniprésentes pour manipuler les registres et interagir avec le matériel.</p><p>Pour chaque cas, observez :</p><ul><li><code>VAL1</code> et <code>VAL2</code> : les opérandes 8 bits en hexadécimal ;</li><li><code>OP</code> : l’opération logique parmi <code>AND</code>, <code>OR</code>, <code>XOR</code>.</li></ul><p>Indiquez le résultat sur 8 bits au format :<br><code>HEX=0xXX BIN=bbbbbbbb</code> (où XX est en majuscules sur 2 chiffres et bbbbbbbb sur 8 bits binaires).</p>",
    "starter": "# Grille d'analyse (asm2-c1-e1) — Masquage binaire & opérations logiques (AND, OR, XOR)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Opération OR pour forcer des bits]\n# Données : 0x80;0x01;OR\nA_COMPLETER\n\n[Cas 2 — Opération XOR pour inverser un quartet]\n# Données : 0xAA;0x0F;XOR\nA_COMPLETER\n\n[Cas 3 — Opération AND masque nul]\n# Données : 0xFF;0x00;AND\nA_COMPLETER\n\n[Cas 4 — Opération XOR identité (bascule complète)]\n# Données : 0x55;0xAA;XOR\nA_COMPLETER\n",
    "hints": [
      "Convertissez chaque opérande hexadécimale en séquence binaire sur 8 bits.",
      "Appliquez l'opération bit à bit : AND exige deux 1, OR exige au moins un 1, XOR exige des bits distincts.",
      "Exprimez le résultat final en hexadécimal majuscule préfixé par 0x et en binaire sur 8 positions."
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
    "brief": "<p>Les processeurs représentent les entiers relatifs selon la convention du <strong>complément à 2</strong>. Le bit de poids fort (MSB) détermine le signe (0 = positif, 1 = négatif).</p><p>Pour chaque cas, observez :</p><ul><li><code>VAL_HEX</code> : la valeur hexadécimale brute (ex. <code>0xFF</code> ou <code>0x8000</code>) ;</li><li><code>BITS</code> : la largeur du registre (8 ou 16 bits).</li></ul><p>Indiquez la valeur décimale signée au format :<br><code>DEC=&lt;valeur signée&gt;</code>.</p>",
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
  },
  {
    "id": "asm2-c2-e1",
    "chapter": 2,
    "title": "Décomposition des sous-registres x86_64 (RAX, EAX, AX, AH, AL)",
    "level": "n1",
    "language": "analyse",
    "goal": "Comprendre l’emboîtement hiérarchique des registres généraux de l’architecture Intel x86.",
    "brief": "<p>En architecture x86_64, le registre 64 bits <code>RAX</code> englobe plusieurs sous-registres historiques :</p><ul>  <li><code>EAX</code> : les 32 bits de poids faible ;</li>  <li><code>AX</code> : les 16 bits de poids faible de EAX ;</li>  <li><code>AH</code> : les 8 bits de poids fort de AX ;</li>  <li><code>AL</code> : les 8 bits de poids faible de AX.</li></ul><p>Analysez les paramètres du problème pour chaque cas. <code>0x1122334455667788</code>). Indiquez la décomposition exacte au format :<br><code>RAX=0x... EAX=0x... AX=0x... AH=0x.. AL=0x..</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c2-e1) — Décomposition des sous-registres x86_64 (RAX, EAX, AX, AH, AL)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-registres nuls sur poids fort]\n# Données : 0x00000000AABBCCDD\nA_COMPLETER\n\n[Cas 2 — Valeur maximale F]\n# Données : 0xFFFFFFFFFFFFFFFF\nA_COMPLETER\n\n[Cas 3 — Seulement AH et AL alimentés]\n# Données : 0x0000000000001234\nA_COMPLETER\n\n[Cas 4 — Registre AL seul à 1]\n# Données : 0x1234567890ABCDEF\nA_COMPLETER\n",
    "hints": [
      "Convertissez avec int(val_hex, 16) pour obtenir un entier 64 bits.",
      "EAX = val & 0xFFFFFFFF, AX = val & 0xFFFF, AL = val & 0xFF, AH = (val >> 8) & 0xFF.",
      "Formate avec des longueurs fixes : {:016X}, {:08X}, {:04X}, {:02X}."
    ],
    "examples": [
      {
        "stdin": "0x1122334455667788",
        "expected": "RAX=0x1122334455667788 EAX=0x55667788 AX=0x7788 AH=0x77 AL=0x88",
        "note": "AX contient 0x7788, découpé en AH=0x77 (haut) et AL=0x88 (bas)."
      }
    ],
    "tests": [
      {
        "label": "Sous-registres nuls sur poids fort",
        "stdin": "cas:1",
        "expected": "RAX=0x00000000AABBCCDD EAX=0xAABBCCDD AX=0xCCDD AH=0xCC AL=0xDD"
      },
      {
        "label": "Valeur maximale F",
        "stdin": "cas:2",
        "expected": "RAX=0xFFFFFFFFFFFFFFFF EAX=0xFFFFFFFF AX=0xFFFF AH=0xFF AL=0xFF"
      },
      {
        "label": "Seulement AH et AL alimentés",
        "stdin": "cas:3",
        "expected": "RAX=0x0000000000001234 EAX=0x00001234 AX=0x1234 AH=0x12 AL=0x34"
      },
      {
        "label": "Registre AL seul à 1",
        "stdin": "cas:4",
        "expected": "RAX=0x1234567890ABCDEF EAX=0x90ABCDEF AX=0xCDEF AH=0xCD AL=0xEF"
      }
    ],
    "solution": "[Exemple]\nRAX=0x1122334455667788 EAX=0x55667788 AX=0x7788 AH=0x77 AL=0x88\n\n[Cas 1 — Sous-registres nuls sur poids fort]\nRAX=0x00000000AABBCCDD EAX=0xAABBCCDD AX=0xCCDD AH=0xCC AL=0xDD\n\n[Cas 2 — Valeur maximale F]\nRAX=0xFFFFFFFFFFFFFFFF EAX=0xFFFFFFFF AX=0xFFFF AH=0xFF AL=0xFF\n\n[Cas 3 — Seulement AH et AL alimentés]\nRAX=0x0000000000001234 EAX=0x00001234 AX=0x1234 AH=0x12 AL=0x34\n\n[Cas 4 — Registre AL seul à 1]\nRAX=0x1234567890ABCDEF EAX=0x90ABCDEF AX=0xCDEF AH=0xCD AL=0xEF"
  },
  {
    "id": "asm2-c2-e2",
    "chapter": 2,
    "title": "Simulateur d’ALU 8 bits & Drapeaux d’état (ZF, CF, SF)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la mise à jour des drapeaux du registre EFLAGS (Z, C, S) après une addition ou soustraction.",
    "brief": "<p>L’Unité Arithmétique et Logique (ALU) met à jour des indicateurs d’état après chaque calcul :</p><ul>  <li><code>ZF (Zero Flag)</code> : mis à 1 si le résultat 8 bits vaut 0, sinon 0 ;</li>  <li><code>CF (Carry Flag)</code> : retenue non signée (1 si dépassement &gt; 255 en ADD, ou emprunt A &lt; B en SUB) ;</li>  <li><code>SF (Sign Flag)</code> : bit de signe du résultat 8 bits (bit 7 à 1).</li></ul><p>Analysez les paramètres du problème pour chaque cas..255). Indiquez :<br><code>RES=0xXX ZF=&lt;0|1&gt; CF=&lt;0|1&gt; SF=&lt;0|1&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c2-e2) — Simulateur d’ALU 8 bits & Drapeaux d’état (ZF, CF, SF)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Soustraction donnant zéro (ZF=1)]\n# Données : SUB;42;42\nA_COMPLETER\n\n[Cas 2 — Soustraction avec emprunt et signe négatif (CF=1, SF=1)]\n# Données : SUB;5;10\nA_COMPLETER\n\n[Cas 3 — Addition normale sans retenue]\n# Données : ADD;20;30\nA_COMPLETER\n\n[Cas 4 — Addition produisant un résultat négatif 8 bits (SF=1)]\n# Données : ADD;100;30\nA_COMPLETER\n",
    "hints": [
      "Pour ADD : somme = A + B, CF = 1 si somme > 255 sinon 0, res = somme & 0xFF.",
      "Pour SUB : diff = A - B, CF = 1 si A < B sinon 0, res = diff & 0xFF.",
      "ZF = 1 si res == 0 sinon 0, SF = 1 si (res & 0x80) != 0 sinon 0."
    ],
    "examples": [
      {
        "stdin": "ADD;250;10",
        "expected": "RES=0x04 ZF=0 CF=1 SF=0",
        "note": "250 + 10 = 260 -> 260 & 0xFF = 4 (0x04) avec dépassement non signé CF=1."
      }
    ],
    "tests": [
      {
        "label": "Soustraction donnant zéro (ZF=1)",
        "stdin": "cas:1",
        "expected": "RES=0x00 ZF=1 CF=0 SF=0"
      },
      {
        "label": "Soustraction avec emprunt et signe négatif (CF=1, SF=1)",
        "stdin": "cas:2",
        "expected": "RES=0xFB ZF=0 CF=1 SF=1"
      },
      {
        "label": "Addition normale sans retenue",
        "stdin": "cas:3",
        "expected": "RES=0x32 ZF=0 CF=0 SF=0"
      },
      {
        "label": "Addition produisant un résultat négatif 8 bits (SF=1)",
        "stdin": "cas:4",
        "expected": "RES=0x82 ZF=0 CF=0 SF=1"
      }
    ],
    "solution": "[Exemple]\nRES=0x04 ZF=0 CF=1 SF=0\n\n[Cas 1 — Soustraction donnant zéro (ZF=1)]\nRES=0x00 ZF=1 CF=0 SF=0\n\n[Cas 2 — Soustraction avec emprunt et signe négatif (CF=1, SF=1)]\nRES=0xFB ZF=0 CF=1 SF=1\n\n[Cas 3 — Addition normale sans retenue]\nRES=0x32 ZF=0 CF=0 SF=0\n\n[Cas 4 — Addition produisant un résultat négatif 8 bits (SF=1)]\nRES=0x82 ZF=0 CF=0 SF=1"
  },
  {
    "id": "asm2-c2-e3",
    "chapter": 2,
    "title": "Détection du débordement signé (Overflow Flag OF)",
    "level": "n2",
    "language": "analyse",
    "goal": "Identifier quand une opération arithmétique dépasse la plage des entiers signés (-128 à +127).",
    "brief": "<p>Le drapeau <strong>OF (Overflow Flag)</strong> signale un dépassement de capacité lors de calculs sur des entiers signés en complément à 2 (plage 8 bits : <code>-128 .. +127</code>) :</p><ul>  <li>En addition : l’addition de deux nombres positifs donne un négatif, ou l’addition de deux négatifs donne un positif ;</li>  <li>En soustraction ($A - B$) : soustraire un négatif à un positif donne un négatif, ou soustraire un positif à un négatif donne un positif.</li></ul><p>Analysez les paramètres du problème pour chaque cas. Indiquez :<br><code>VAL=&lt;valeur signée 8 bits&gt; OF=&lt;0|1&gt; DIAG=&lt;OVERFLOW|NORMAL&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c2-e3) — Détection du débordement signé (Overflow Flag OF)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Addition de négatifs avec dépassement (-70 + -60)]\n# Données : -70;-60;ADD\nA_COMPLETER\n\n[Cas 2 — Addition normale sans dépassement]\n# Données : 40;30;ADD\nA_COMPLETER\n\n[Cas 3 — Soustraction avec dépassement (100 - -50)]\n# Données : 100;-50;SUB\nA_COMPLETER\n\n[Cas 4 — Soustraction normale aux bornes (-100 - 20 = -120)]\n# Données : -100;20;SUB\nA_COMPLETER\n",
    "hints": [
      "Calculez le résultat arithmétique théorique sans troncature : th = A + B (ou A - B).",
      "Un overflow sur 8 bits signé se produit si th < -128 ou th > 127.",
      "La valeur 8 bits résultante correspond à (th & 0xFF), puis convertie en signé si >= 128."
    ],
    "examples": [
      {
        "stdin": "100;50;ADD",
        "expected": "VAL=-106 OF=1 DIAG=OVERFLOW",
        "note": "100 + 50 = 150 > 127 : débordement signé OF=1. 150 & 0xFF = 150 -> 150 - 256 = -106."
      }
    ],
    "tests": [
      {
        "label": "Addition de négatifs avec dépassement (-70 + -60)",
        "stdin": "cas:1",
        "expected": "VAL=126 OF=1 DIAG=OVERFLOW"
      },
      {
        "label": "Addition normale sans dépassement",
        "stdin": "cas:2",
        "expected": "VAL=70 OF=0 DIAG=NORMAL"
      },
      {
        "label": "Soustraction avec dépassement (100 - -50)",
        "stdin": "cas:3",
        "expected": "VAL=-106 OF=1 DIAG=OVERFLOW"
      },
      {
        "label": "Soustraction normale aux bornes (-100 - 20 = -120)",
        "stdin": "cas:4",
        "expected": "VAL=-120 OF=0 DIAG=NORMAL"
      }
    ],
    "solution": "[Exemple]\nVAL=-106 OF=1 DIAG=OVERFLOW\n\n[Cas 1 — Addition de négatifs avec dépassement (-70 + -60)]\nVAL=126 OF=1 DIAG=OVERFLOW\n\n[Cas 2 — Addition normale sans dépassement]\nVAL=70 OF=0 DIAG=NORMAL\n\n[Cas 3 — Soustraction avec dépassement (100 - -50)]\nVAL=-106 OF=1 DIAG=OVERFLOW\n\n[Cas 4 — Soustraction normale aux bornes (-100 - 20 = -120)]\nVAL=-120 OF=0 DIAG=NORMAL"
  },
  {
    "id": "asm2-c3-e1",
    "chapter": 3,
    "title": "Configuration des broches GPIO AVR (DDRB & PORTB)",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer l’état électrique d’une broche de microcontrôleur AVR selon les registres DDR et PORT.",
    "brief": "<p>Sur un microcontrôleur d’architecture Harvard tel que l’ATmega328P (Arduino), la configuration d’une broche d’E/S dépend de deux registres 8 bits :</p><ul>  <li><code>DDRx (Data Direction Register)</code> : bit à 1 = broche en SORTIE, bit à 0 = broche en ENTRÉE ;</li>  <li>Si la broche est en <strong>SORTIE</strong> : bit PORTx à 1 = <code>SORTIE_HAUT</code>, bit PORTx à 0 = <code>SORTIE_BAS</code> ;</li>  <li>Si la broche est en <strong>ENTRÉE</strong> : bit PORTx à 1 = <code>ENTREE_PULLUP</code> (résistance de rappel interne active), bit PORTx à 0 = <code>ENTREE_FLOTTANTE</code> (haute impédance).</li></ul><p>Analysez les paramètres du problème pour chaque cas. Indiquez :<br><code>BROCHE=X MODE=&lt;SORTIE_HAUT|SORTIE_BAS|ENTREE_PULLUP|ENTREE_FLOTTANTE&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c3-e1) — Configuration des broches GPIO AVR (DDRB & PORTB)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Broche en entrée avec résistance de pull-up]\n# Données : 0x00;0x04;2\nA_COMPLETER\n\n[Cas 2 — Broche en sortie à l’état bas]\n# Données : 0x0F;0x00;3\nA_COMPLETER\n\n[Cas 3 — Broche en entrée flottante haute impédance]\n# Données : 0x00;0x00;0\nA_COMPLETER\n\n[Cas 4 — Broche 7 en sortie haute]\n# Données : 0x80;0x80;7\nA_COMPLETER\n",
    "hints": [
      "Isole le bit de la broche k avec : bit_ddr = (ddr >> k) & 1, bit_port = (port >> k) & 1.",
      "Si bit_ddr == 1 : SORTIE_HAUT si bit_port == 1 sinon SORTIE_BAS.",
      "Si bit_ddr == 0 : ENTREE_PULLUP si bit_port == 1 sinon ENTREE_FLOTTANTE."
    ],
    "examples": [
      {
        "stdin": "0xFF;0x20;5",
        "expected": "BROCHE=5 MODE=SORTIE_HAUT",
        "note": "DDRB=0xFF (toutes broches en sortie). Sur broche 5, 0x20 a le bit 5 à 1 -> SORTIE_HAUT."
      }
    ],
    "tests": [
      {
        "label": "Broche en entrée avec résistance de pull-up",
        "stdin": "cas:1",
        "expected": "BROCHE=2 MODE=ENTREE_PULLUP"
      },
      {
        "label": "Broche en sortie à l’état bas",
        "stdin": "cas:2",
        "expected": "BROCHE=3 MODE=SORTIE_BAS"
      },
      {
        "label": "Broche en entrée flottante haute impédance",
        "stdin": "cas:3",
        "expected": "BROCHE=0 MODE=ENTREE_FLOTTANTE"
      },
      {
        "label": "Broche 7 en sortie haute",
        "stdin": "cas:4",
        "expected": "BROCHE=7 MODE=SORTIE_HAUT"
      }
    ],
    "solution": "[Exemple]\nBROCHE=5 MODE=SORTIE_HAUT\n\n[Cas 1 — Broche en entrée avec résistance de pull-up]\nBROCHE=2 MODE=ENTREE_PULLUP\n\n[Cas 2 — Broche en sortie à l’état bas]\nBROCHE=3 MODE=SORTIE_BAS\n\n[Cas 3 — Broche en entrée flottante haute impédance]\nBROCHE=0 MODE=ENTREE_FLOTTANTE\n\n[Cas 4 — Broche 7 en sortie haute]\nBROCHE=7 MODE=SORTIE_HAUT"
  },
  {
    "id": "asm2-c3-e2",
    "chapter": 3,
    "title": "Gestion de l’Endianness (Little-Endian vs Big-Endian)",
    "level": "n1",
    "language": "analyse",
    "goal": "Comprendre l’ordonnancement des octets en mémoire vive selon l’architecture matérielle.",
    "brief": "<p>L’architecture <strong>x86</strong> utilise l’ordre <strong>Little-Endian</strong> (l’octet de poids faible est placé à l’adresse la plus basse en mémoire), tandis que les protocoles réseau et certains processeurs RISC utilisent le <strong>Big-Endian</strong>.</p><p>Pour chaque cas, observez :</p><ul><li><code>VAL_HEX</code> : la valeur hexadécimale 32 bits (ex. <code>0x12345678</code>) ;</li><li><code>FORMAT</code> : le format demandé (<code>LITTLE</code> ou <code>BIG</code>).</li></ul><p>Indiquez la séquence des 4 octets en mémoire au format :<br><code>FORMAT=&lt;LITTLE|BIG&gt; OCTETS=&lt;XX XX XX XX&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c3-e2) — Gestion de l’Endianness (Little-Endian vs Big-Endian)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Décomposition Big-Endian standard]\n# Données : 0x12345678;BIG\nA_COMPLETER\n\n[Cas 2 — Mot 32 bits avec octets nuls en Little-Endian]\n# Données : 0x00000001;LITTLE\nA_COMPLETER\n\n[Cas 3 — Mot 32 bits avec octets nuls en Big-Endian]\n# Données : 0x00000001;BIG\nA_COMPLETER\n\n[Cas 4 — Mot hexadécimal symétrique]\n# Données : 0xAABBCCDD;LITTLE\nA_COMPLETER\n",
    "hints": [
      "Un entier 32 bits 0x12345678 contient les octets b0=0x78 (faible), b1=0x56, b2=0x34, b3=0x12 (fort).",
      "En LITTLE-ENDIAN : b0, b1, b2, b3 (78 56 34 12).",
      "En BIG-ENDIAN : b3, b2, b1, b0 (12 34 56 78)."
    ],
    "examples": [
      {
        "stdin": "0x12345678;LITTLE",
        "expected": "FORMAT=LITTLE OCTETS=78 56 34 12",
        "note": "En Little-Endian, l’octet de poids faible 0x78 est stocké en premier."
      }
    ],
    "tests": [
      {
        "label": "Décomposition Big-Endian standard",
        "stdin": "cas:1",
        "expected": "FORMAT=BIG OCTETS=12 34 56 78"
      },
      {
        "label": "Mot 32 bits avec octets nuls en Little-Endian",
        "stdin": "cas:2",
        "expected": "FORMAT=LITTLE OCTETS=01 00 00 00"
      },
      {
        "label": "Mot 32 bits avec octets nuls en Big-Endian",
        "stdin": "cas:3",
        "expected": "FORMAT=BIG OCTETS=00 00 00 01"
      },
      {
        "label": "Mot hexadécimal symétrique",
        "stdin": "cas:4",
        "expected": "FORMAT=LITTLE OCTETS=DD CC BB AA"
      }
    ],
    "solution": "[Exemple]\nFORMAT=LITTLE OCTETS=78 56 34 12\n\n[Cas 1 — Décomposition Big-Endian standard]\nFORMAT=BIG OCTETS=12 34 56 78\n\n[Cas 2 — Mot 32 bits avec octets nuls en Little-Endian]\nFORMAT=LITTLE OCTETS=01 00 00 00\n\n[Cas 3 — Mot 32 bits avec octets nuls en Big-Endian]\nFORMAT=BIG OCTETS=00 00 00 01\n\n[Cas 4 — Mot hexadécimal symétrique]\nFORMAT=LITTLE OCTETS=DD CC BB AA"
  },
  {
    "id": "asm2-c3-e3",
    "chapter": 3,
    "title": "Calcul d’adresse physique en mode réel x86 (Segment:Offset)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer l’adresse physique 20 bits à partir d’une paire Segment:Offset en mode réel x86.",
    "brief": "<p>En mode réel (processeur 8086 et phase d’amorçage du BIOS PC), le processeur accède à 1 Mo de mémoire sur un bus 20 bits en combinant deux registres 16 bits :</p><pre><code>Adresse_Physique = (Segment &lt;&lt; 4) + Offset</code></pre><p>Analysez les paramètres du problème pour chaque cas. <code>0x07C0;0x0000</code>). Indiquez l’adresse physique 20 bits en hexadécimal et en décimal au format :<br><code>PHY=0xXXXXX DEC=&lt;valeur&gt;</code> (où XXXXX est formaté sur 5 chiffres hexadécimaux majuscules).</p>",
    "starter": "# Grille d'analyse (asm2-c3-e3) — Calcul d’adresse physique en mode réel x86 (Segment:Offset)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vecteur d’interruption du BIOS]\n# Données : 0x0000;0x0080\nA_COMPLETER\n\n[Cas 2 — Segment de données avec offset non nul]\n# Données : 0x1000;0x0250\nA_COMPLETER\n\n[Cas 3 — Adresse maximale accessible en mode réel sans A20]\n# Données : 0xFFFF;0x0010\nA_COMPLETER\n\n[Cas 4 — Pointeur de pile initial]\n# Données : 0x9000;0xFFFE\nA_COMPLETER\n",
    "hints": [
      "En mode réel x86, l’adresse physique 20 bits se calcule par la formule : Adresse_Physique = (Segment × 16) + Déplacement.",
      "Multiplier un nombre hexadécimal par 16 équivaut à lui ajouter un zéro à droite (décalage de 4 bits)."
    ],
    "examples": [
      {
        "stdin": "0x07C0;0x0000",
        "expected": "PHY=0x07C00 DEC=31744",
        "note": "0x07C0 * 16 + 0x0000 = 0x07C00 (adresse standard de chargement du secteur d’amorce MBR)."
      }
    ],
    "tests": [
      {
        "label": "Vecteur d’interruption du BIOS",
        "stdin": "cas:1",
        "expected": "PHY=0x00080 DEC=128"
      },
      {
        "label": "Segment de données avec offset non nul",
        "stdin": "cas:2",
        "expected": "PHY=0x10250 DEC=66128"
      },
      {
        "label": "Adresse maximale accessible en mode réel sans A20",
        "stdin": "cas:3",
        "expected": "PHY=0x100000 DEC=1048576"
      },
      {
        "label": "Pointeur de pile initial",
        "stdin": "cas:4",
        "expected": "PHY=0x9FFFE DEC=655358"
      }
    ],
    "solution": "[Exemple]\nPHY=0x07C00 DEC=31744\n\n[Cas 1 — Vecteur d’interruption du BIOS]\nPHY=0x00080 DEC=128\n\n[Cas 2 — Segment de données avec offset non nul]\nPHY=0x10250 DEC=66128\n\n[Cas 3 — Adresse maximale accessible en mode réel sans A20]\nPHY=0x100000 DEC=1048576\n\n[Cas 4 — Pointeur de pile initial]\nPHY=0x9FFFE DEC=655358"
  },
  {
    "id": "asm2-c4-e1",
    "chapter": 4,
    "title": "Décodeur de directives de données NASM (db, dw, dd, dq)",
    "level": "n1",
    "language": "analyse",
    "goal": "Convertir des directives d’allocation mémoire NASM en séquences d’octets bruts Little-Endian.",
    "brief": "<p>Dans la section <code>.data</code> d’un programme NASM, la taille des variables est définie par des directives :</p><ul>  <li><code>db (define byte)</code> : 1 octet (8 bits) ;</li>  <li><code>dw (define word)</code> : 2 octets (16 bits, Little-Endian) ;</li>  <li><code>dd (define double word)</code> : 4 octets (32 bits, Little-Endian) ;</li>  <li><code>dq (define quad word)</code> : 8 octets (64 bits, Little-Endian).</li></ul><p>Analysez les paramètres du problème pour chaque cas. Indiquez la taille totale allouée et la séquence d’octets générée :<br><code>TAILLE=&lt;nb_octets&gt; OCTETS=&lt;XX XX ...&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c4-e1) — Décodeur de directives de données NASM (db, dw, dd, dq)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Directive db pour octets consécutifs]\n# Données : db;65,66,67,0\nA_COMPLETER\n\n[Cas 2 — Directive dd pour entier 32 bits (1000 = 0x3E8)]\n# Données : dd;1000\nA_COMPLETER\n\n[Cas 3 — Directive dq pour entier 64 bits (1)]\n# Données : dq;1\nA_COMPLETER\n\n[Cas 4 — Directive dw avec trois entiers]\n# Données : dw;255,256,1\nA_COMPLETER\n",
    "hints": [
      "db -> 1 octet, dw -> 2 octets, dd -> 4 octets, dq -> 8 octets.",
      "Pour convertir un entier x en n octets Little-Endian : (x >> (8*i)) & 0xFF pour i de 0 à n-1.",
      "Concatène les octets de toutes les valeurs séparés par un espace."
    ],
    "examples": [
      {
        "stdin": "dw;10,20",
        "expected": "TAILLE=4 OCTETS=0A 00 14 00",
        "note": "Deux mots de 16 bits : 10 = 0x000A (0A 00) et 20 = 0x0014 (14 00) -> 4 octets au total."
      }
    ],
    "tests": [
      {
        "label": "Directive db pour octets consécutifs",
        "stdin": "cas:1",
        "expected": "TAILLE=4 OCTETS=41 42 43 00"
      },
      {
        "label": "Directive dd pour entier 32 bits (1000 = 0x3E8)",
        "stdin": "cas:2",
        "expected": "TAILLE=4 OCTETS=E8 03 00 00"
      },
      {
        "label": "Directive dq pour entier 64 bits (1)",
        "stdin": "cas:3",
        "expected": "TAILLE=8 OCTETS=01 00 00 00 00 00 00 00"
      },
      {
        "label": "Directive dw avec trois entiers",
        "stdin": "cas:4",
        "expected": "TAILLE=6 OCTETS=FF 00 00 01 01 00"
      }
    ],
    "solution": "[Exemple]\nTAILLE=4 OCTETS=0A 00 14 00\n\n[Cas 1 — Directive db pour octets consécutifs]\nTAILLE=4 OCTETS=41 42 43 00\n\n[Cas 2 — Directive dd pour entier 32 bits (1000 = 0x3E8)]\nTAILLE=4 OCTETS=E8 03 00 00\n\n[Cas 3 — Directive dq pour entier 64 bits (1)]\nTAILLE=8 OCTETS=01 00 00 00 00 00 00 00\n\n[Cas 4 — Directive dw avec trois entiers]\nTAILLE=6 OCTETS=FF 00 00 01 01 00"
  },
  {
    "id": "asm2-c4-e2",
    "chapter": 4,
    "title": "Résolution d’adresses virtuelles de sections ELF",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer l’adresse virtuelle absolue d’un symbole dans un exécutable ELF.",
    "brief": "<p>Lors de l’étape d’édition de liens (linkage), l’éditeur de liens fusionne les sections des fichiers objets et leur attribue une <strong>adresse virtuelle (Virtual Address, VA)</strong> en mémoire.</p><p>Pour chaque cas, observez :</p><ul><li><code>SECTION</code> : le nom de la section (ex. <code>.text</code>, <code>.data</code>, <code>.rodata</code>) ;</li><li><code>BASE_HEX</code> : l’adresse virtuelle de base de la section (ex. <code>0x00401000</code>) ;</li><li><code>OFFSET_HEX</code> : le déplacement du symbole dans la section (ex. <code>0x00000050</code>).</li></ul><p>Indiquez :<br><code>SECTION=&lt;NOM&gt; VA=0x&lt;8 chiffres HEX majuscules&gt; DEC=&lt;valeur&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c4-e2) — Résolution d’adresses virtuelles de sections ELF\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Section de données initialisées .data]\n# Données : .data;0x00403000;0x00000100\nA_COMPLETER\n\n[Cas 2 — Section en lecture seule .rodata]\n# Données : .rodata;0x00402000;0x00000018\nA_COMPLETER\n\n[Cas 3 — Symbole en tout début de section text (offset 0)]\n# Données : .text;0x00400000;0x00000000\nA_COMPLETER\n\n[Cas 4 — Section .bss des variables globales non initialisées]\n# Données : .bss;0x00404000;0x000002A0\nA_COMPLETER\n",
    "hints": [
      "L’adresse virtuelle (VA) d’un symbole correspond à l’addition de l’adresse de base de la section et de son déplacement relatif.",
      "Vérifiez la concordance entre la valeur décimale et la notation hexadécimale sur 32 bits."
    ],
    "examples": [
      {
        "stdin": ".text;0x00401000;0x00000050",
        "expected": "SECTION=.text VA=0x00401050 DEC=4198480",
        "note": "0x00401000 + 0x50 = 0x00401050 dans l’espace mémoire du processus."
      }
    ],
    "tests": [
      {
        "label": "Section de données initialisées .data",
        "stdin": "cas:1",
        "expected": "SECTION=.data VA=0x00403100 DEC=4206848"
      },
      {
        "label": "Section en lecture seule .rodata",
        "stdin": "cas:2",
        "expected": "SECTION=.rodata VA=0x00402018 DEC=4202520"
      },
      {
        "label": "Symbole en tout début de section text (offset 0)",
        "stdin": "cas:3",
        "expected": "SECTION=.text VA=0x00400000 DEC=4194304"
      },
      {
        "label": "Section .bss des variables globales non initialisées",
        "stdin": "cas:4",
        "expected": "SECTION=.bss VA=0x004042A0 DEC=4211360"
      }
    ],
    "solution": "[Exemple]\nSECTION=.text VA=0x00401050 DEC=4198480\n\n[Cas 1 — Section de données initialisées .data]\nSECTION=.data VA=0x00403100 DEC=4206848\n\n[Cas 2 — Section en lecture seule .rodata]\nSECTION=.rodata VA=0x00402018 DEC=4202520\n\n[Cas 3 — Symbole en tout début de section text (offset 0)]\nSECTION=.text VA=0x00400000 DEC=4194304\n\n[Cas 4 — Section .bss des variables globales non initialisées]\nSECTION=.bss VA=0x004042A0 DEC=4211360"
  },
  {
    "id": "asm2-c4-e3",
    "chapter": 4,
    "title": "Alignement mémoire & calcul de Padding (Directive ALIGN)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer le nombre d’octets de bourrage (padding) nécessaires pour aligner une variable sur une frontière N octets.",
    "brief": "<p>Pour optimiser les accès au bus mémoire et éviter les pénalités de cycle CPU, les processeurs requièrent souvent que les données soient alignées sur des multiples de 2, 4, 8 ou 16 octets.</p><p>Analysez les paramètres du problème pour chaque cas. Indiquez le nombre d’octets de bourrage ajoutés et la nouvelle adresse alignée :<br><code>PADDING=&lt;nb_octets&gt; ALIGNEE=0x&lt;HEX&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c4-e3) — Alignement mémoire & calcul de Padding (Directive ALIGN)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Adresse déjà parfaitement alignée sur 16 octets]\n# Données : 0x2000;16\nA_COMPLETER\n\n[Cas 2 — Alignement de pile sur 16 octets (convention x86_64 ABI)]\n# Données : 0x7FFF1008;16\nA_COMPLETER\n\n[Cas 3 — Alignement mot 32 bits (4 octets)]\n# Données : 0x00401001;4\nA_COMPLETER\n\n[Cas 4 — Alignement 8 octets sur petit offset]\n# Données : 0x1005;8\nA_COMPLETER\n",
    "hints": [
      "Pour aligner une adresse A sur une frontière de N octets, calculez le padding requis : (N - (A mod N)) mod N.",
      "La nouvelle adresse alignée est égale à A + padding et doit être strictement divisible par N."
    ],
    "examples": [
      {
        "stdin": "0x1003;4",
        "expected": "PADDING=1 ALIGNEE=0x1004",
        "note": "0x1003 (4099) modulo 4 donne 3. On ajoute 1 octet pour atteindre 4100 (0x1004)."
      }
    ],
    "tests": [
      {
        "label": "Adresse déjà parfaitement alignée sur 16 octets",
        "stdin": "cas:1",
        "expected": "PADDING=0 ALIGNEE=0x2000"
      },
      {
        "label": "Alignement de pile sur 16 octets (convention x86_64 ABI)",
        "stdin": "cas:2",
        "expected": "PADDING=8 ALIGNEE=0x7FFF1010"
      },
      {
        "label": "Alignement mot 32 bits (4 octets)",
        "stdin": "cas:3",
        "expected": "PADDING=3 ALIGNEE=0x00401004"
      },
      {
        "label": "Alignement 8 octets sur petit offset",
        "stdin": "cas:4",
        "expected": "PADDING=3 ALIGNEE=0x1008"
      }
    ],
    "solution": "[Exemple]\nPADDING=1 ALIGNEE=0x1004\n\n[Cas 1 — Adresse déjà parfaitement alignée sur 16 octets]\nPADDING=0 ALIGNEE=0x2000\n\n[Cas 2 — Alignement de pile sur 16 octets (convention x86_64 ABI)]\nPADDING=8 ALIGNEE=0x7FFF1010\n\n[Cas 3 — Alignement mot 32 bits (4 octets)]\nPADDING=3 ALIGNEE=0x00401004\n\n[Cas 4 — Alignement 8 octets sur petit offset]\nPADDING=3 ALIGNEE=0x1008"
  },
  {
    "id": "asm2-c5-e1",
    "chapter": 5,
    "title": "Simulateur d’instructions MOV entre registres",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le transfert de données immédiates et de registre à registre en x86.",
    "brief": "<p>L’instruction <code>MOV destination, source</code> copie une valeur sans modifier la source. Dans notre processeur simulé, quatre registres 32 bits <code>EAX</code>, <code>EBX</code>, <code>ECX</code> et <code>EDX</code> sont initialement tous fixés à <code>0</code>.</p><p>Analysez les paramètres du problème pour chaque cas. <code>MOV EAX, 42; MOV EBX, EAX</code>). Indiquez l’état final des 4 registres au format :<br><code>EAX=&lt;val&gt; EBX=&lt;val&gt; ECX=&lt;val&gt; EDX=&lt;val&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c5-e1) — Simulateur d’instructions MOV entre registres\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chaîne de transferts entre les 4 registres]\n# Données : MOV EAX, 10; MOV EBX, 20; MOV ECX, EAX; MOV EDX, EBX\nA_COMPLETER\n\n[Cas 2 — Écrasement successif d’un même registre]\n# Données : MOV EAX, 5; MOV EAX, 100; MOV ECX, 50\nA_COMPLETER\n\n[Cas 3 — Copie croisée]\n# Données : MOV EDX, 999; MOV EAX, EDX; MOV EBX, EDX; MOV ECX, EDX\nA_COMPLETER\n\n[Cas 4 — Valeur nulle explicite]\n# Données : MOV EAX, 77; MOV EAX, 0\nA_COMPLETER\n",
    "hints": [
      "Initialisez un dictionnaire reg = {\"EAX\": 0, \"EBX\": 0, \"ECX\": 0, \"EDX\": 0}.",
      "Découpez la ligne par point-virgule (l’extraction des champs) : pour chaque commande, sépare par espace pour extraire la destination et la source.",
      "Si la source est dans reg, utilise sa valeur, sinon convertis-la en entier avec int(source)."
    ],
    "examples": [
      {
        "stdin": "MOV EAX, 42; MOV EBX, EAX",
        "expected": "EAX=42 EBX=42 ECX=0 EDX=0",
        "note": "EAX reçoit 42, puis EBX reçoit la valeur de EAX (42)."
      }
    ],
    "tests": [
      {
        "label": "Chaîne de transferts entre les 4 registres",
        "stdin": "cas:1",
        "expected": "EAX=10 EBX=20 ECX=10 EDX=20"
      },
      {
        "label": "Écrasement successif d’un même registre",
        "stdin": "cas:2",
        "expected": "EAX=100 EBX=0 ECX=50 EDX=0"
      },
      {
        "label": "Copie croisée",
        "stdin": "cas:3",
        "expected": "EAX=999 EBX=999 ECX=999 EDX=999"
      },
      {
        "label": "Valeur nulle explicite",
        "stdin": "cas:4",
        "expected": "EAX=0 EBX=0 ECX=0 EDX=0"
      }
    ],
    "solution": "[Exemple]\nEAX=42 EBX=42 ECX=0 EDX=0\n\n[Cas 1 — Chaîne de transferts entre les 4 registres]\nEAX=10 EBX=20 ECX=10 EDX=20\n\n[Cas 2 — Écrasement successif d’un même registre]\nEAX=100 EBX=0 ECX=50 EDX=0\n\n[Cas 3 — Copie croisée]\nEAX=999 EBX=999 ECX=999 EDX=999\n\n[Cas 4 — Valeur nulle explicite]\nEAX=0 EBX=0 ECX=0 EDX=0"
  },
  {
    "id": "asm2-c5-e2",
    "chapter": 5,
    "title": "Calcul d’adresse effective LEA (Base + Index * Scale + Disp)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer l’adresse mémoire calculée par l’instruction x86 LEA sans accéder à la RAM.",
    "brief": "<p>L’instruction <code>LEA (Load Effective Address)</code> calcule une adresse mémoire selon le mode d’adressage complet x86 <code>[Base + Index * Scale + Déplacement]</code> sans jamais lire le contenu de la mémoire vive.</p><p>Pour chaque cas, observez :</p><ul><li><code>BASE_HEX</code> : l’adresse de base dans le registre (ex. <code>0x00401000</code>) ;</li><li><code>INDEX_DEC</code> : l’indice dans le tableau (ex. <code>4</code>) ;</li><li><code>SCALE_DEC</code> : le facteur d’échelle (1, 2, 4 ou 8 octets) ;</li><li><code>DISP_HEX</code> : le déplacement constant (ex. <code>0x00000010</code>).</li></ul><p>Indiquez :<br><code>ADRESSE=0x&lt;8 chiffres HEX majuscules&gt; DEC=&lt;valeur&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c5-e2) — Calcul d’adresse effective LEA (Base + Index * Scale + Disp)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Accès au premier élément sans déplacement (index 0)]\n# Données : 0x00405000;0;8;0x00000000\nA_COMPLETER\n\n[Cas 2 — Tableau d’entiers 64 bits (scale = 8)]\n# Données : 0x00500000;10;8;0x00000020\nA_COMPLETER\n\n[Cas 3 — Tableau de caractères (scale = 1)]\n# Données : 0x00100000;25;1;0x00000005\nA_COMPLETER\n\n[Cas 4 — Index négatif avec déplacement]\n# Données : 0x00402000;2;4;0x00000000\nA_COMPLETER\n",
    "hints": [
      "L’instruction LEA applique la formule d’adressage x86 : Adresse = Base + (Index × Facteur_Echelle) + Déplacement.",
      "L’instruction LEA calcule uniquement l’adresse arithmétique sans jamais lire le contenu de la mémoire."
    ],
    "examples": [
      {
        "stdin": "0x00401000;4;4;0x00000010",
        "expected": "ADRESSE=0x00401020 DEC=4198432",
        "note": "0x00401000 + 4*4 (16) + 16 (0x10) = 0x00401020."
      }
    ],
    "tests": [
      {
        "label": "Accès au premier élément sans déplacement (index 0)",
        "stdin": "cas:1",
        "expected": "ADRESSE=0x00405000 DEC=4214784"
      },
      {
        "label": "Tableau d’entiers 64 bits (scale = 8)",
        "stdin": "cas:2",
        "expected": "ADRESSE=0x00500070 DEC=5242992"
      },
      {
        "label": "Tableau de caractères (scale = 1)",
        "stdin": "cas:3",
        "expected": "ADRESSE=0x0010001E DEC=1048606"
      },
      {
        "label": "Index négatif avec déplacement",
        "stdin": "cas:4",
        "expected": "ADRESSE=0x00402008 DEC=4202504"
      }
    ],
    "solution": "[Exemple]\nADRESSE=0x00401020 DEC=4198432\n\n[Cas 1 — Accès au premier élément sans déplacement (index 0)]\nADRESSE=0x00405000 DEC=4214784\n\n[Cas 2 — Tableau d’entiers 64 bits (scale = 8)]\nADRESSE=0x00500070 DEC=5242992\n\n[Cas 3 — Tableau de caractères (scale = 1)]\nADRESSE=0x0010001E DEC=1048606\n\n[Cas 4 — Index négatif avec déplacement]\nADRESSE=0x00402008 DEC=4202504"
  },
  {
    "id": "asm2-c5-e3",
    "chapter": 5,
    "title": "Exécuteur d’opérations arithmétiques x86 (ADD, SUB, INC, DEC, NEG, XOR)",
    "level": "n2",
    "language": "analyse",
    "goal": "Exécuter pas à pas une séquence d’instructions arithmétiques sur un accumulateur 32 bits.",
    "brief": "<p>Un registre accumulateur <code>EAX</code> part d’une valeur initiale donnée. On lui applique successivement une suite d’instructions arithmétiques séparées par des virgules :</p><ul>  <li><code>ADD n</code> : ajoute <code>n</code> ;</li>  <li><code>SUB n</code> : soustrait <code>n</code> ;</li>  <li><code>INC</code> : incrémente de 1 ;</li>  <li><code>DEC</code> : décrémente de 1 ;</li>  <li><code>NEG</code> : inverse arithmétiquement le signe ($EAX = -EAX$) ;</li>  <li><code>XOR n</code> : applique un ou exclusif binaire avec <code>n</code>.</li></ul><p>Analysez les paramètres du problème pour chaque cas. Indiquez la valeur finale au format :<br><code>VAL=&lt;entier signé&gt; HEX=0x&lt;8 chiffres HEX majuscules&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c5-e3) — Exécuteur d’opérations arithmétiques x86 (ADD, SUB, INC, DEC, NEG, XOR)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Opération NEG et soustraction]\n# Données : 5;NEG, SUB 3\nA_COMPLETER\n\n[Cas 2 — Remise à zéro classique par XOR sur lui-même]\n# Données : 123;XOR 123\nA_COMPLETER\n\n[Cas 3 — Incrémentations et décrémentations successives]\n# Données : 0;INC, INC, INC, DEC\nA_COMPLETER\n\n[Cas 4 — Séquence complète mixte]\n# Données : 50;ADD 50, XOR 15, NEG\nA_COMPLETER\n",
    "hints": [
      "Sur un registre 32 bits, conservez les calculs modulo 2^32 (plage 0 à 0xFFFFFFFF).",
      "Pour interpréter la valeur signée, si le bit de poids fort vaut 1, appliquez la convention du complément à 2."
    ],
    "examples": [
      {
        "stdin": "10;ADD 5, SUB 2, INC",
        "expected": "VAL=14 HEX=0x0000000E",
        "note": "10 + 5 = 15 -> 15 - 2 = 13 -> 13 + 1 = 14 (0x0E)."
      }
    ],
    "tests": [
      {
        "label": "Opération NEG et soustraction",
        "stdin": "cas:1",
        "expected": "VAL=-8 HEX=0xFFFFFFF8"
      },
      {
        "label": "Remise à zéro classique par XOR sur lui-même",
        "stdin": "cas:2",
        "expected": "VAL=0 HEX=0x00000000"
      },
      {
        "label": "Incrémentations et décrémentations successives",
        "stdin": "cas:3",
        "expected": "VAL=2 HEX=0x00000002"
      },
      {
        "label": "Séquence complète mixte",
        "stdin": "cas:4",
        "expected": "VAL=-107 HEX=0xFFFFFF95"
      }
    ],
    "solution": "[Exemple]\nVAL=14 HEX=0x0000000E\n\n[Cas 1 — Opération NEG et soustraction]\nVAL=-8 HEX=0xFFFFFFF8\n\n[Cas 2 — Remise à zéro classique par XOR sur lui-même]\nVAL=0 HEX=0x00000000\n\n[Cas 3 — Incrémentations et décrémentations successives]\nVAL=2 HEX=0x00000002\n\n[Cas 4 — Séquence complète mixte]\nVAL=-107 HEX=0xFFFFFF95"
  },
  {
    "id": "asm2-c6-e1",
    "chapter": 6,
    "title": "Simulateur de pile x86 (PUSH & POP avec pointeur ESP)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le fonctionnement de la pile d’exécution (LIFO) et le déplacement du pointeur ESP.",
    "brief": "<p>En architecture x86, la pile grandit vers les adresses basses :</p><ul>  <li><code>PUSH valeur</code> : décrémente <code>ESP</code> de 4 octets et écrit la valeur 32 bits au sommet de la pile ;</li>  <li><code>POP</code> : lit la valeur au sommet de la pile et incrémente <code>ESP</code> de 4 octets.</li></ul><p>Le pointeur <code>ESP</code> est initialisé à <code>0x1000</code> avec une pile vide. Analysez les paramètres du problème pour chaque cas. <code>PUSH 10, PUSH 20, POP, PUSH 30</code>). Indiquez l’état final de la pile au format :<br><code>ESP=0x&lt;4 chiffres HEX&gt; SOMMET=&lt;valeur ou VIDE&gt; TAILLE=&lt;nb_elements&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c6-e1) — Simulateur de pile x86 (PUSH & POP avec pointeur ESP)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois empilements successifs]\n# Données : PUSH 100, PUSH 200, PUSH 300\nA_COMPLETER\n\n[Cas 2 — Dépilement complet ramenant la pile à zéro]\n# Données : PUSH 42, POP\nA_COMPLETER\n\n[Cas 3 — Multiples push et pop alternés]\n# Données : PUSH 1, PUSH 2, POP, PUSH 3, PUSH 4, POP\nA_COMPLETER\n\n[Cas 4 — Un seul push]\n# Données : PUSH 999\nA_COMPLETER\n",
    "hints": [
      "La pile x86 grandit vers le bas : chaque PUSH décrémente ESP de 4 octets et écrit au sommet.",
      "Chaque POP lit la valeur au sommet et incrémente ESP de 4 octets."
    ],
    "examples": [
      {
        "stdin": "PUSH 10, PUSH 20, POP, PUSH 30",
        "expected": "ESP=0x0FF8 SOMMET=30 TAILLE=2",
        "note": "Après 2 push, 1 pop et 1 push, il reste 2 éléments (10 et 30). ESP = 0x1000 - 8 = 0x0FF8."
      }
    ],
    "tests": [
      {
        "label": "Trois empilements successifs",
        "stdin": "cas:1",
        "expected": "ESP=0x0FF4 SOMMET=300 TAILLE=3"
      },
      {
        "label": "Dépilement complet ramenant la pile à zéro",
        "stdin": "cas:2",
        "expected": "ESP=0x1000 SOMMET=VIDE TAILLE=0"
      },
      {
        "label": "Multiples push et pop alternés",
        "stdin": "cas:3",
        "expected": "ESP=0x0FF8 SOMMET=3 TAILLE=2"
      },
      {
        "label": "Un seul push",
        "stdin": "cas:4",
        "expected": "ESP=0x0FFC SOMMET=999 TAILLE=1"
      }
    ],
    "solution": "[Exemple]\nESP=0x0FF8 SOMMET=30 TAILLE=2\n\n[Cas 1 — Trois empilements successifs]\nESP=0x0FF4 SOMMET=300 TAILLE=3\n\n[Cas 2 — Dépilement complet ramenant la pile à zéro]\nESP=0x1000 SOMMET=VIDE TAILLE=0\n\n[Cas 3 — Multiples push et pop alternés]\nESP=0x0FF8 SOMMET=3 TAILLE=2\n\n[Cas 4 — Un seul push]\nESP=0x0FFC SOMMET=999 TAILLE=1"
  },
  {
    "id": "asm2-c6-e2",
    "chapter": 6,
    "title": "Évaluateur de sauts conditionnels x86 (CMP & Jcc)",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer si un saut conditionnel x86 est franchi (pris) ou ignoré selon le résultat de CMP.",
    "brief": "<p>L’instruction <code>CMP A, B</code> compare deux opérandes en calculant $A - B$. L’instruction de branchement conditionnel suivante examine l’état des drapeaux :</p><ul>  <li><code>JE / JZ</code> : saute si $A = B$ ;</li>  <li><code>JNE / JNZ</code> : saute si $A ≠ B$ ;</li>  <li><code>JG</code> : saute si $A &gt; B$ (comparaison signée) ;</li>  <li><code>JL</code> : saute si $A &lt; B$ (comparaison signée) ;</li>  <li><code>JGE</code> : saute si $A \\ge B$ ;</li>  <li><code>JLE</code> : saute si $A \\le B$.</li></ul><p>Analysez les paramètres du problème pour chaque cas. Indiquez :<br><code>DECISION=&lt;PRIS|IGNORE&gt; COND=&lt;condition satisfaite ou non&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c6-e2) — Évaluateur de sauts conditionnels x86 (CMP & Jcc)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Saut d’égalité JE avec valeurs égales]\n# Données : 15;15;JE\nA_COMPLETER\n\n[Cas 2 — Saut d’égalité JE avec valeurs distinctes]\n# Données : 15;20;JE\nA_COMPLETER\n\n[Cas 3 — Saut JG avec premier opérande supérieur]\n# Données : 50;30;JG\nA_COMPLETER\n\n[Cas 4 — Saut JL avec premier opérande supérieur (saut non pris)]\n# Données : 50;30;JL\nA_COMPLETER\n",
    "hints": [
      "Comparez A et B avec l’opérateur correspondant : JE (==), JNE (!=), JG (>), JL (<), JGE (>=), JLE (<=).",
      "Si la condition est vraie, DECISION=PRIS, sinon DECISION=IGNORE."
    ],
    "examples": [
      {
        "stdin": "10;20;JL",
        "expected": "DECISION=PRIS COND=10 < 20",
        "note": "10 est strictement inférieur à 20, le saut JL est franchi."
      }
    ],
    "tests": [
      {
        "label": "Saut d’égalité JE avec valeurs égales",
        "stdin": "cas:1",
        "expected": "DECISION=PRIS COND=15 == 15"
      },
      {
        "label": "Saut d’égalité JE avec valeurs distinctes",
        "stdin": "cas:2",
        "expected": "DECISION=IGNORE COND=15 != 20"
      },
      {
        "label": "Saut JG avec premier opérande supérieur",
        "stdin": "cas:3",
        "expected": "DECISION=PRIS COND=50 > 30"
      },
      {
        "label": "Saut JL avec premier opérande supérieur (saut non pris)",
        "stdin": "cas:4",
        "expected": "DECISION=IGNORE COND=50 >= 30"
      }
    ],
    "solution": "[Exemple]\nDECISION=PRIS COND=10 < 20\n\n[Cas 1 — Saut d’égalité JE avec valeurs égales]\nDECISION=PRIS COND=15 == 15\n\n[Cas 2 — Saut d’égalité JE avec valeurs distinctes]\nDECISION=IGNORE COND=15 != 20\n\n[Cas 3 — Saut JG avec premier opérande supérieur]\nDECISION=PRIS COND=50 > 30\n\n[Cas 4 — Saut JL avec premier opérande supérieur (saut non pris)]\nDECISION=IGNORE COND=50 >= 30"
  },
  {
    "id": "asm2-c6-e3",
    "chapter": 6,
    "title": "Modélisateur de cadre de pile (Stack Frame cdecl)",
    "level": "n2",
    "language": "analyse",
    "goal": "Construire les adresses relatives à EBP pour les arguments et variables locales selon la convention cdecl.",
    "brief": "<p>Sous la convention d’appel standard <code>cdecl</code> (32 bits), le prologue d’une fonction réserve de la place sur la pile et utilise <code>EBP</code> comme base fixe du cadre d’activation (Stack Frame) :</p><ul>  <li><code>[ebp+0]</code> : ancien EBP sauvegardé ;</li>  <li><code>[ebp+4]</code> : adresse de retour vers l’appelant ;</li>  <li><code>[ebp+8]</code>, <code>[ebp+12]</code>, etc. : arguments reçus (offset positif) ;</li>  <li><code>[ebp-4]</code>, <code>[ebp-8]</code>, etc. : variables locales allouées (offset négatif).</li></ul><p>Analysez les paramètres du problème pour chaque cas. Indiquez le résumé du cadre d’activation au format :<br><code>FRAME SUB_ESP=&lt;N&gt; ARG1=[ebp+8] ARGN=[ebp+&lt;offset&gt;] LOC1=[ebp-4] LOCN=[ebp-&lt;offset&gt;]</code> (si NB_ARGS ou NB_LOCALES vaut 0, indiquer <code>AUCUN</code> pour les champs correspondants).</p>",
    "starter": "# Grille d'analyse (asm2-c6-e3) — Modélisateur de cadre de pile (Stack Frame cdecl)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fonction avec 1 argument et 1 locale]\n# Données : 1;1\nA_COMPLETER\n\n[Cas 2 — Fonction sans argument (void f(void)) et 2 locales]\n# Données : 0;2\nA_COMPLETER\n\n[Cas 3 — Fonction sans variables locales (purement calculatoire)]\n# Données : 3;0\nA_COMPLETER\n\n[Cas 4 — Quatre arguments et quatre locales]\n# Données : 4;4\nA_COMPLETER\n",
    "hints": [
      "Chaque variable locale occupe 4 octets : sub_esp = nb_locales * 4.",
      "L’argument k est à [ebp+{4 + 4*k}]. Le premier est [ebp+8], le dernier [ebp+{4 + 4*nb_args}].",
      "La variable locale k est à [ebp-{4*k}]. La première est [ebp-4], la dernière [ebp-{4*nb_locales}]."
    ],
    "examples": [
      {
        "stdin": "2;3",
        "expected": "FRAME SUB_ESP=12 ARG1=[ebp+8] ARGN=[ebp+12] LOC1=[ebp-4] LOCN=[ebp-12]",
        "note": "2 arguments à [ebp+8] et [ebp+12], 3 locales occupant 12 octets de [ebp-4] à [ebp-12]."
      }
    ],
    "tests": [
      {
        "label": "Fonction avec 1 argument et 1 locale",
        "stdin": "cas:1",
        "expected": "FRAME SUB_ESP=4 ARG1=[ebp+8] ARGN=[ebp+8] LOC1=[ebp-4] LOCN=[ebp-4]"
      },
      {
        "label": "Fonction sans argument (void f(void)) et 2 locales",
        "stdin": "cas:2",
        "expected": "FRAME SUB_ESP=8 ARG1=AUCUN ARGN=AUCUN LOC1=[ebp-4] LOCN=[ebp-8]"
      },
      {
        "label": "Fonction sans variables locales (purement calculatoire)",
        "stdin": "cas:3",
        "expected": "FRAME SUB_ESP=0 ARG1=[ebp+8] ARGN=[ebp+16] LOC1=AUCUN LOCN=AUCUN"
      },
      {
        "label": "Quatre arguments et quatre locales",
        "stdin": "cas:4",
        "expected": "FRAME SUB_ESP=16 ARG1=[ebp+8] ARGN=[ebp+20] LOC1=[ebp-4] LOCN=[ebp-16]"
      }
    ],
    "solution": "[Exemple]\nFRAME SUB_ESP=12 ARG1=[ebp+8] ARGN=[ebp+12] LOC1=[ebp-4] LOCN=[ebp-12]\n\n[Cas 1 — Fonction avec 1 argument et 1 locale]\nFRAME SUB_ESP=4 ARG1=[ebp+8] ARGN=[ebp+8] LOC1=[ebp-4] LOCN=[ebp-4]\n\n[Cas 2 — Fonction sans argument (void f(void)) et 2 locales]\nFRAME SUB_ESP=8 ARG1=AUCUN ARGN=AUCUN LOC1=[ebp-4] LOCN=[ebp-8]\n\n[Cas 3 — Fonction sans variables locales (purement calculatoire)]\nFRAME SUB_ESP=0 ARG1=[ebp+8] ARGN=[ebp+16] LOC1=AUCUN LOCN=AUCUN\n\n[Cas 4 — Quatre arguments et quatre locales]\nFRAME SUB_ESP=16 ARG1=[ebp+8] ARGN=[ebp+20] LOC1=[ebp-4] LOCN=[ebp-16]"
  }
];
