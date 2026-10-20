'use strict';

module.exports = [
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
  }
];
