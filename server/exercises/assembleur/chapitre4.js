'use strict';

module.exports = [
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
    "brief": "<p>Lors de l’étape d’édition de liens (linkage), l’éditeur de liens fusionne les sections des fichiers objets et leur attribue une <strong>adresse virtuelle (Virtual Address, VA)</strong> en mémoire.</p><p>Analysez les paramètres du problème pour chaque cas. <code>.text</code>, <code>.data</code>, <code>.rodata</code>) ;</li>  <li><code>BASE_HEX</code> est l’adresse virtuelle de base de la section (ex. <code>0x00401000</code>) ;</li>  <li><code>OFFSET_HEX</code> est le déplacement du symbole dans la section (ex. <code>0x00000050</code>).</li></ul><p>Indiquez :<br><code>SECTION=&lt;NOM&gt; VA=0x&lt;8 chiffres HEX majuscules&gt; DEC=&lt;valeur&gt;</code>.</p>",
    "starter": "# Grille d'analyse (asm2-c4-e2) — Résolution d’adresses virtuelles de sections ELF\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Section de données initialisées .data]\n# Données : .data;0x00403000;0x00000100\nA_COMPLETER\n\n[Cas 2 — Section en lecture seule .rodata]\n# Données : .rodata;0x00402000;0x00000018\nA_COMPLETER\n\n[Cas 3 — Symbole en tout début de section text (offset 0)]\n# Données : .text;0x00400000;0x00000000\nA_COMPLETER\n\n[Cas 4 — Section .bss des variables globales non initialisées]\n# Données : .bss;0x00404000;0x000002A0\nA_COMPLETER\n",
    "hints": [
      "Convertis BASE_HEX et OFFSET_HEX en entiers avec int(s, 16).",
      "L’adresse virtuelle finale vaut base + offset.",
      "Formate avec f\"SECTION={sec} VA=0x{va:08X} DEC={va}\"."
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
      "Si adr % n == 0, aucun padding n’est requis (padding = 0).",
      "Sinon, padding = n - (adr % n), et la nouvelle adresse vaut adr + padding.",
      "Formate l’adresse avec au moins 4 chiffres : f\"0x{alignee:04X}\"."
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
  }
];
