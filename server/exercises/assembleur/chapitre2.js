'use strict';

module.exports = [
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
      "Convertis avec int(val_hex, 16) pour obtenir un entier 64 bits.",
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
      "Calcule le résultat arithmétique théorique sans troncature : th = A + B (ou A - B).",
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
  }
];
