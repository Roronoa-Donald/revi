/**
 * Exercices du chapitre 3 — Mémoires, Bus & Architectures (Von Neumann vs Harvard, AVR / x86).
 */
'use strict';

module.exports = [
  {
    id: 'asm2-c3-e1',
    chapter: 3,
    title: 'Configuration des broches GPIO AVR (DDRB & PORTB)',
    level: 'n1',
    language: 'python',
    goal: 'Déterminer l’état électrique d’une broche de microcontrôleur AVR selon les registres DDR et PORT.',
    brief:
      '<p>Sur un microcontrôleur d’architecture Harvard tel que l’ATmega328P (Arduino), ' +
      'la configuration d’une broche d’E/S dépend de deux registres 8 bits :</p>' +
      '<ul>' +
      '  <li><code>DDRx (Data Direction Register)</code> : bit à 1 = broche en SORTIE, bit à 0 = broche en ENTRÉE ;</li>' +
      '  <li>Si la broche est en <strong>SORTIE</strong> : bit PORTx à 1 = <code>SORTIE_HAUT</code>, bit PORTx à 0 = <code>SORTIE_BAS</code> ;</li>' +
      '  <li>Si la broche est en <strong>ENTRÉE</strong> : bit PORTx à 1 = <code>ENTREE_PULLUP</code> (résistance de rappel interne active), bit PORTx à 0 = <code>ENTREE_FLOTTANTE</code> (haute impédance).</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard <code>DDRB_HEX;PORTB_HEX;BROCHE</code> (broche de 0 à 7). ' +
      'Affiche :<br>' +
      '<code>BROCHE=X MODE=&lt;SORTIE_HAUT|SORTIE_BAS|ENTREE_PULLUP|ENTREE_FLOTTANTE&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : extraire les bits correspondants dans DDRB et PORTB et déterminer le mode
`,
    hints: [
      'Isole le bit de la broche k avec : bit_ddr = (ddr >> k) & 1, bit_port = (port >> k) & 1.',
      'Si bit_ddr == 1 : SORTIE_HAUT si bit_port == 1 sinon SORTIE_BAS.',
      'Si bit_ddr == 0 : ENTREE_PULLUP si bit_port == 1 sinon ENTREE_FLOTTANTE.'
    ],
    examples: [
      {
        stdin: '0xFF;0x20;5',
        expected: 'BROCHE=5 MODE=SORTIE_HAUT',
        note: 'DDRB=0xFF (toutes broches en sortie). Sur broche 5, 0x20 a le bit 5 à 1 -> SORTIE_HAUT.'
      }
    ],
    tests: [
      {
        label: 'Broche en entrée avec résistance de pull-up',
        stdin: '0x00;0x04;2',
        expected: 'BROCHE=2 MODE=ENTREE_PULLUP'
      },
      {
        label: 'Broche en sortie à l’état bas',
        stdin: '0x0F;0x00;3',
        expected: 'BROCHE=3 MODE=SORTIE_BAS'
      },
      {
        label: 'Broche en entrée flottante haute impédance',
        stdin: '0x00;0x00;0',
        expected: 'BROCHE=0 MODE=ENTREE_FLOTTANTE'
      },
      {
        label: 'Broche 7 en sortie haute',
        stdin: '0x80;0x80;7',
        expected: 'BROCHE=7 MODE=SORTIE_HAUT'
      }
    ],
    solution: `ligne = input().strip()
ddr_s, port_s, b_s = ligne.split(';')
ddr = int(ddr_s, 16) & 0xFF
port = int(port_s, 16) & 0xFF
b = int(b_s)

bit_ddr = (ddr >> b) & 1
bit_port = (port >> b) & 1

if bit_ddr == 1:
    mode = 'SORTIE_HAUT' if bit_port == 1 else 'SORTIE_BAS'
else:
    mode = 'ENTREE_PULLUP' if bit_port == 1 else 'ENTREE_FLOTTANTE'

print(f"BROCHE={b} MODE={mode}")
`
  },
  {
    id: 'asm2-c3-e2',
    chapter: 3,
    title: 'Gestion de l’Endianness (Little-Endian vs Big-Endian)',
    level: 'n1',
    language: 'python',
    goal: 'Comprendre l’ordonnancement des octets en mémoire vive selon l’architecture matérielle.',
    brief:
      '<p>L’architecture <strong>x86</strong> utilise l’ordre <strong>Little-Endian</strong> (l’octet de poids faible est placé à l’adresse la plus basse en mémoire), ' +
      'tandis que les protocoles réseau et certains processeurs RISC utilisent le <strong>Big-Endian</strong>.</p>' +
      '<p>Lit sur l’entrée standard une valeur 32 bits et le format demandé : <code>VAL_HEX32;FORMAT</code> où :</p>' +
      '<ul>' +
      '  <li><code>VAL_HEX32</code> est une valeur 32 bits (ex. <code>0x12345678</code>) ;</li>' +
      '  <li><code>FORMAT</code> est <code>LITTLE</code> ou <code>BIG</code>.</li>' +
      '</ul>' +
      '<p>Affiche la séquence des 4 octets en mémoire au format :<br>' +
      '<code>FORMAT=&lt;LITTLE|BIG&gt; OCTETS=&lt;XX XX XX XX&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : décomposer l'entier 32 bits en 4 octets et ordonner selon l'endianness
`,
    hints: [
      'Un entier 32 bits 0x12345678 contient les octets b0=0x78 (faible), b1=0x56, b2=0x34, b3=0x12 (fort).',
      'En LITTLE-ENDIAN : b0, b1, b2, b3 (78 56 34 12).',
      'En BIG-ENDIAN : b3, b2, b1, b0 (12 34 56 78).'
    ],
    examples: [
      {
        stdin: '0x12345678;LITTLE',
        expected: 'FORMAT=LITTLE OCTETS=78 56 34 12',
        note: 'En Little-Endian, l’octet de poids faible 0x78 est stocké en premier.'
      }
    ],
    tests: [
      {
        label: 'Décomposition Big-Endian standard',
        stdin: '0x12345678;BIG',
        expected: 'FORMAT=BIG OCTETS=12 34 56 78'
      },
      {
        label: 'Mot 32 bits avec octets nuls en Little-Endian',
        stdin: '0x00000001;LITTLE',
        expected: 'FORMAT=LITTLE OCTETS=01 00 00 00'
      },
      {
        label: 'Mot 32 bits avec octets nuls en Big-Endian',
        stdin: '0x00000001;BIG',
        expected: 'FORMAT=BIG OCTETS=00 00 00 01'
      },
      {
        label: 'Mot hexadécimal symétrique',
        stdin: '0xAABBCCDD;LITTLE',
        expected: 'FORMAT=LITTLE OCTETS=DD CC BB AA'
      }
    ],
    solution: `ligne = input().strip()
val_s, fmt = ligne.split(';')
val = int(val_s, 16) & 0xFFFFFFFF

b0 = val & 0xFF
b1 = (val >> 8) & 0xFF
b2 = (val >> 16) & 0xFF
b3 = (val >> 24) & 0xFF

if fmt == 'LITTLE':
    octets = [b0, b1, b2, b3]
else:
    octets = [b3, b2, b1, b0]

chaine = " ".join(f"{x:02X}" for x in octets)
print(f"FORMAT={fmt} OCTETS={chaine}")
`
  },
  {
    id: 'asm2-c3-e3',
    chapter: 3,
    title: 'Calcul d’adresse physique en mode réel x86 (Segment:Offset)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer l’adresse physique 20 bits à partir d’une paire Segment:Offset en mode réel x86.',
    brief:
      '<p>En mode réel (processeur 8086 et phase d’amorçage du BIOS PC), le processeur accède à 1 Mo de mémoire ' +
      'sur un bus 20 bits en combinant deux registres 16 bits :</p>' +
      '<pre><code>Adresse_Physique = (Segment &lt;&lt; 4) + Offset</code></pre>' +
      '<p>Lit sur l’entrée standard <code>SEGMENT;OFFSET</code> (en hexadécimal 16 bits, ex. <code>0x07C0;0x0000</code>). ' +
      'Affiche l’adresse physique 20 bits en hexadécimal et en décimal au format :<br>' +
      '<code>PHY=0xXXXXX DEC=&lt;valeur&gt;</code> (où XXXXX est formaté sur 5 chiffres hexadécimaux majuscules).</p>',
    starter: `ligne = input().strip()

# À compléter : appliquer la formule de translation d'adresse physique x86 20 bits
`,
    hints: [
      'Multiplie le segment par 16 (équivalent à segment << 4), puis ajoute l’offset.',
      'Formate avec f"PHY=0x{phy:05X} DEC={phy}".'
    ],
    examples: [
      {
        stdin: '0x07C0;0x0000',
        expected: 'PHY=0x07C00 DEC=31744',
        note: '0x07C0 * 16 + 0x0000 = 0x07C00 (adresse standard de chargement du secteur d’amorce MBR).'
      }
    ],
    tests: [
      {
        label: 'Vecteur d’interruption du BIOS',
        stdin: '0x0000;0x0080',
        expected: 'PHY=0x00080 DEC=128'
      },
      {
        label: 'Segment de données avec offset non nul',
        stdin: '0x1000;0x0250',
        expected: 'PHY=0x10250 DEC=66128'
      },
      {
        label: 'Adresse maximale accessible en mode réel sans A20',
        stdin: '0xFFFF;0x0010',
        expected: 'PHY=0x100000 DEC=1048576'
      },
      {
        label: 'Pointeur de pile initial',
        stdin: '0x9000;0xFFFE',
        expected: 'PHY=0x9FFFE DEC=655358'
      }
    ],
    solution: `ligne = input().strip()
seg_s, off_s = ligne.split(';')
seg = int(seg_s, 16)
off = int(off_s, 16)

phy = (seg << 4) + off

print(f"PHY=0x{phy:05X} DEC={phy}")
`
  }
];
