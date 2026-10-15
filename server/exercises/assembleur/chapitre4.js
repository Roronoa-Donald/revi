/**
 * Exercices du chapitre 4 — Chaîne de production logicielle (Assembleur, ELF, Linker & Débogueur).
 */
'use strict';

module.exports = [
  {
    id: 'asm2-c4-e1',
    chapter: 4,
    title: 'Décodeur de directives de données NASM (db, dw, dd, dq)',
    level: 'n1',
    language: 'python',
    goal: 'Convertir des directives d’allocation mémoire NASM en séquences d’octets bruts Little-Endian.',
    brief:
      '<p>Dans la section <code>.data</code> d’un programme NASM, la taille des variables est définie par des directives :</p>' +
      '<ul>' +
      '  <li><code>db (define byte)</code> : 1 octet (8 bits) ;</li>' +
      '  <li><code>dw (define word)</code> : 2 octets (16 bits, Little-Endian) ;</li>' +
      '  <li><code>dd (define double word)</code> : 4 octets (32 bits, Little-Endian) ;</li>' +
      '  <li><code>dq (define quad word)</code> : 8 octets (64 bits, Little-Endian).</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard <code>DIRECTIVE;VALEURS</code> où <code>VALEURS</code> est une liste d’entiers décimaux séparés par des virgules. ' +
      'Affiche la taille totale allouée et la séquence d’octets générée :<br>' +
      '<code>TAILLE=&lt;nb_octets&gt; OCTETS=&lt;XX XX ...&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : analyser la directive, convertir chaque valeur en octets Little-Endian et afficher
`,
    hints: [
      'db -> 1 octet, dw -> 2 octets, dd -> 4 octets, dq -> 8 octets.',
      'Pour convertir un entier x en n octets Little-Endian : (x >> (8*i)) & 0xFF pour i de 0 à n-1.',
      'Concatène les octets de toutes les valeurs séparés par un espace.'
    ],
    examples: [
      {
        stdin: 'dw;10,20',
        expected: 'TAILLE=4 OCTETS=0A 00 14 00',
        note: 'Deux mots de 16 bits : 10 = 0x000A (0A 00) et 20 = 0x0014 (14 00) -> 4 octets au total.'
      }
    ],
    tests: [
      {
        label: 'Directive db pour octets consécutifs',
        stdin: 'db;65,66,67,0',
        expected: 'TAILLE=4 OCTETS=41 42 43 00'
      },
      {
        label: 'Directive dd pour entier 32 bits (1000 = 0x3E8)',
        stdin: 'dd;1000',
        expected: 'TAILLE=4 OCTETS=E8 03 00 00'
      },
      {
        label: 'Directive dq pour entier 64 bits (1)',
        stdin: 'dq;1',
        expected: 'TAILLE=8 OCTETS=01 00 00 00 00 00 00 00'
      },
      {
        label: 'Directive dw avec trois entiers',
        stdin: 'dw;255,256,1',
        expected: 'TAILLE=6 OCTETS=FF 00 00 01 01 00'
      }
    ],
    solution: `ligne = input().strip()
directive, vals_s = ligne.split(';')
vals = [int(x.strip()) for x in vals_s.split(',')]

taille_par_element = {'db': 1, 'dw': 2, 'dd': 4, 'dq': 8}[directive]
total_taille = len(vals) * taille_par_element

octets = []
for v in vals:
    for i in range(taille_par_element):
        octets.append((v >> (8 * i)) & 0xFF)

chaine = " ".join(f"{x:02X}" for x in octets)
print(f"TAILLE={total_taille} OCTETS={chaine}")
`
  },
  {
    id: 'asm2-c4-e2',
    chapter: 4,
    title: 'Résolution d’adresses virtuelles de sections ELF',
    level: 'n1',
    language: 'python',
    goal: 'Calculer l’adresse virtuelle absolue d’un symbole dans un exécutable ELF.',
    brief:
      '<p>Lors de l’étape d’édition de liens (linkage), l’éditeur de liens fusionne les sections ' +
      'des fichiers objets et leur attribue une <strong>adresse virtuelle (Virtual Address, VA)</strong> en mémoire.</p>' +
      '<p>Lit sur l’entrée standard <code>SECTION;BASE_HEX;OFFSET_HEX</code> où :</p>' +
      '<ul>' +
      '  <li><code>SECTION</code> est le nom de la section (ex. <code>.text</code>, <code>.data</code>, <code>.rodata</code>) ;</li>' +
      '  <li><code>BASE_HEX</code> est l’adresse virtuelle de base de la section (ex. <code>0x00401000</code>) ;</li>' +
      '  <li><code>OFFSET_HEX</code> est le déplacement du symbole dans la section (ex. <code>0x00000050</code>).</li>' +
      '</ul>' +
      '<p>Affiche :<br>' +
      '<code>SECTION=&lt;NOM&gt; VA=0x&lt;8 chiffres HEX majuscules&gt; DEC=&lt;valeur&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : calculer l'adresse virtuelle finale du symbole
`,
    hints: [
      'Convertis BASE_HEX et OFFSET_HEX en entiers avec int(s, 16).',
      'L’adresse virtuelle finale vaut base + offset.',
      'Formate avec f"SECTION={sec} VA=0x{va:08X} DEC={va}".'
    ],
    examples: [
      {
        stdin: '.text;0x00401000;0x00000050',
        expected: 'SECTION=.text VA=0x00401050 DEC=4198480',
        note: '0x00401000 + 0x50 = 0x00401050 dans l’espace mémoire du processus.'
      }
    ],
    tests: [
      {
        label: 'Section de données initialisées .data',
        stdin: '.data;0x00403000;0x00000100',
        expected: 'SECTION=.data VA=0x00403100 DEC=4206848'
      },
      {
        label: 'Section en lecture seule .rodata',
        stdin: '.rodata;0x00402000;0x00000018',
        expected: 'SECTION=.rodata VA=0x00402018 DEC=4202520'
      },
      {
        label: 'Symbole en tout début de section text (offset 0)',
        stdin: '.text;0x00400000;0x00000000',
        expected: 'SECTION=.text VA=0x00400000 DEC=4194304'
      },
      {
        label: 'Section .bss des variables globales non initialisées',
        stdin: '.bss;0x00404000;0x000002A0',
        expected: 'SECTION=.bss VA=0x004042A0 DEC=4211360'
      }
    ],
    solution: `ligne = input().strip()
sec, base_s, off_s = ligne.split(';')
base = int(base_s, 16)
off = int(off_s, 16)

va = base + off
print(f"SECTION={sec} VA=0x{va:08X} DEC={va}")
`
  },
  {
    id: 'asm2-c4-e3',
    chapter: 4,
    title: 'Alignement mémoire & calcul de Padding (Directive ALIGN)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer le nombre d’octets de bourrage (padding) nécessaires pour aligner une variable sur une frontière N octets.',
    brief:
      '<p>Pour optimiser les accès au bus mémoire et éviter les pénalités de cycle CPU, ' +
      'les processeurs requièrent souvent que les données soient alignées sur des multiples de 2, 4, 8 ou 16 octets.</p>' +
      '<p>Lit sur l’entrée standard <code>ADRESSE_HEX;N</code> (où N vaut 2, 4, 8 ou 16). ' +
      'Affiche le nombre d’octets de bourrage ajoutés et la nouvelle adresse alignée :<br>' +
      '<code>PADDING=&lt;nb_octets&gt; ALIGNEE=0x&lt;HEX&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : calculer le reste de division par N et déterminer le padding
`,
    hints: [
      'Si adr % n == 0, aucun padding n’est requis (padding = 0).',
      'Sinon, padding = n - (adr % n), et la nouvelle adresse vaut adr + padding.',
      'Formate l’adresse avec au moins 4 chiffres : f"0x{alignee:04X}".'
    ],
    examples: [
      {
        stdin: '0x1003;4',
        expected: 'PADDING=1 ALIGNEE=0x1004',
        note: '0x1003 (4099) modulo 4 donne 3. On ajoute 1 octet pour atteindre 4100 (0x1004).'
      }
    ],
    tests: [
      {
        label: 'Adresse déjà parfaitement alignée sur 16 octets',
        stdin: '0x2000;16',
        expected: 'PADDING=0 ALIGNEE=0x2000'
      },
      {
        label: 'Alignement de pile sur 16 octets (convention x86_64 ABI)',
        stdin: '0x7FFF1008;16',
        expected: 'PADDING=8 ALIGNEE=0x7FFF1010'
      },
      {
        label: 'Alignement mot 32 bits (4 octets)',
        stdin: '0x00401001;4',
        expected: 'PADDING=3 ALIGNEE=0x00401004'
      },
      {
        label: 'Alignement 8 octets sur petit offset',
        stdin: '0x1005;8',
        expected: 'PADDING=3 ALIGNEE=0x1008'
      }
    ],
    solution: `ligne = input().strip()
adr_s, n_s = ligne.split(';')
adr = int(adr_s, 16)
n = int(n_s)

reste = adr % n
if reste == 0:
    pad = 0
else:
    pad = n - reste

alignee = adr + pad
digits = max(4, len(adr_s.strip()) - 2)
print(f"PADDING={pad} ALIGNEE=0x{alignee:0{digits}X}")
`
  }
];
