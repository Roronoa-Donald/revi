'use strict';

module.exports = [
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
      "Initialise un dictionnaire reg = {\"EAX\": 0, \"EBX\": 0, \"ECX\": 0, \"EDX\": 0}.",
      "Découpe la ligne par point-virgule (split(\";\")) : pour chaque commande, sépare par espace pour extraire la destination et la source.",
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
    "brief": "<p>L’instruction <code>LEA (Load Effective Address)</code> calcule une adresse mémoire selon le mode d’adressage complet x86 <code>[Base + Index * Scale + Déplacement]</code> sans jamais lire le contenu de la mémoire vive.</p><p>Analysez les paramètres du problème pour chaque cas. <code>0x00401000</code>) ;</li>  <li><code>INDEX_DEC</code> est l’indice dans le tableau (ex. <code>4</code>) ;</li>  <li><code>SCALE_DEC</code> est le facteur d’échelle (1, 2, 4 ou 8 octets) ;</li>  <li><code>DISP_HEX</code> est le déplacement constant (ex. <code>0x00000010</code>).</li></ul><p>Indiquez :<br><code>ADRESSE=0x&lt;8 chiffres HEX majuscules&gt; DEC=&lt;valeur&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c5-e2) — Calcul d’adresse effective LEA (Base + Index * Scale + Disp)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Accès au premier élément sans déplacement (index 0)]\n# Données : 0x00405000;0;8;0x00000000\nA_COMPLETER\n\n[Cas 2 — Tableau d’entiers 64 bits (scale = 8)]\n# Données : 0x00500000;10;8;0x00000020\nA_COMPLETER\n\n[Cas 3 — Tableau de caractères (scale = 1)]\n# Données : 0x00100000;25;1;0x00000005\nA_COMPLETER\n\n[Cas 4 — Index négatif avec déplacement]\n# Données : 0x00402000;2;4;0x00000000\nA_COMPLETER\n",
    "hints": [
      "Convertis BASE_HEX et DISP_HEX avec int(s, 16).",
      "Formule : adresse = base + (index * scale) + disp.",
      "Formate avec f\"ADRESSE=0x{adresse:08X} DEC={adresse}\"."
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
      "À chaque opération, conserve la valeur sur 32 bits : eax = (eax + ...) & 0xFFFFFFFF.",
      "Pour afficher VAL signé : si eax >= 0x80000000, valeur_signee = eax - 0x100000000, sinon eax.",
      "Formate avec f\"VAL={valeur_signee} HEX=0x{eax:08X}\"."
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
  }
];
