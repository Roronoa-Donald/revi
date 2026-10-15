/**
 * Exercices du chapitre 5 — Jeu d'instructions x86/AVR, Transferts & Modes d'adressage.
 */
'use strict';

module.exports = [
  {
    id: 'asm2-c5-e1',
    chapter: 5,
    title: 'Simulateur d’instructions MOV entre registres',
    level: 'n1',
    language: 'python',
    goal: 'Simuler le transfert de données immédiates et de registre à registre en x86.',
    brief:
      '<p>L’instruction <code>MOV destination, source</code> copie une valeur sans modifier la source. ' +
      'Dans notre processeur simulé, quatre registres 32 bits <code>EAX</code>, <code>EBX</code>, <code>ECX</code> et <code>EDX</code> ' +
      'sont initialement tous fixés à <code>0</code>.</p>' +
      '<p>Lit sur l’entrée standard une séquence d’instructions <code>MOV</code> séparées par des points-virgules (ex. <code>MOV EAX, 42; MOV EBX, EAX</code>). ' +
      'Affiche l’état final des 4 registres au format :<br>' +
      '<code>EAX=&lt;val&gt; EBX=&lt;val&gt; ECX=&lt;val&gt; EDX=&lt;val&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : initialiser les 4 registres, exécuter chaque instruction MOV et afficher le bilan
`,
    hints: [
      'Initialise un dictionnaire reg = {"EAX": 0, "EBX": 0, "ECX": 0, "EDX": 0}.',
      'Découpe la ligne par point-virgule (split(";")) : pour chaque commande, sépare par espace pour extraire la destination et la source.',
      'Si la source est dans reg, utilise sa valeur, sinon convertis-la en entier avec int(source).'
    ],
    examples: [
      {
        stdin: 'MOV EAX, 42; MOV EBX, EAX',
        expected: 'EAX=42 EBX=42 ECX=0 EDX=0',
        note: 'EAX reçoit 42, puis EBX reçoit la valeur de EAX (42).'
      }
    ],
    tests: [
      {
        label: 'Chaîne de transferts entre les 4 registres',
        stdin: 'MOV EAX, 10; MOV EBX, 20; MOV ECX, EAX; MOV EDX, EBX',
        expected: 'EAX=10 EBX=20 ECX=10 EDX=20'
      },
      {
        label: 'Écrasement successif d’un même registre',
        stdin: 'MOV EAX, 5; MOV EAX, 100; MOV ECX, 50',
        expected: 'EAX=100 EBX=0 ECX=50 EDX=0'
      },
      {
        label: 'Copie croisée',
        stdin: 'MOV EDX, 999; MOV EAX, EDX; MOV EBX, EDX; MOV ECX, EDX',
        expected: 'EAX=999 EBX=999 ECX=999 EDX=999'
      },
      {
        label: 'Valeur nulle explicite',
        stdin: 'MOV EAX, 77; MOV EAX, 0',
        expected: 'EAX=0 EBX=0 ECX=0 EDX=0'
      }
    ],
    solution: `ligne = input().strip()
regs = {'EAX': 0, 'EBX': 0, 'ECX': 0, 'EDX': 0}

instructions = [cmd.strip() for cmd in ligne.split(';')]
for instr in instructions:
    if not instr:
        continue
    tokens = instr.replace(',', ' ').split()
    if len(tokens) >= 3 and tokens[0].upper() == 'MOV':
        dest = tokens[1].upper()
        src = tokens[2].upper()
        if src in regs:
            val = regs[src]
        else:
            val = int(src)
        if dest in regs:
            regs[dest] = val

print(f"EAX={regs['EAX']} EBX={regs['EBX']} ECX={regs['ECX']} EDX={regs['EDX']}")
`
  },
  {
    id: 'asm2-c5-e2',
    chapter: 5,
    title: 'Calcul d’adresse effective LEA (Base + Index * Scale + Disp)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer l’adresse mémoire calculée par l’instruction x86 LEA sans accéder à la RAM.',
    brief:
      '<p>L’instruction <code>LEA (Load Effective Address)</code> calcule une adresse mémoire ' +
      'selon le mode d’adressage complet x86 <code>[Base + Index * Scale + Déplacement]</code> sans jamais lire le contenu de la mémoire vive.</p>' +
      '<p>Lit sur l’entrée standard <code>BASE_HEX;INDEX_DEC;SCALE_DEC;DISP_HEX</code> où :</p>' +
      '<ul>' +
      '  <li><code>BASE_HEX</code> est l’adresse de base (ex. <code>0x00401000</code>) ;</li>' +
      '  <li><code>INDEX_DEC</code> est l’indice dans le tableau (ex. <code>4</code>) ;</li>' +
      '  <li><code>SCALE_DEC</code> est le facteur d’échelle (1, 2, 4 ou 8 octets) ;</li>' +
      '  <li><code>DISP_HEX</code> est le déplacement constant (ex. <code>0x00000010</code>).</li>' +
      '</ul>' +
      '<p>Affiche :<br>' +
      '<code>ADRESSE=0x&lt;8 chiffres HEX majuscules&gt; DEC=&lt;valeur&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : calculer l'adresse effective Base + Index * Scale + Disp
`,
    hints: [
      'Convertis BASE_HEX et DISP_HEX avec int(s, 16).',
      'Formule : adresse = base + (index * scale) + disp.',
      'Formate avec f"ADRESSE=0x{adresse:08X} DEC={adresse}".'
    ],
    examples: [
      {
        stdin: '0x00401000;4;4;0x00000010',
        expected: 'ADRESSE=0x00401020 DEC=4198432',
        note: '0x00401000 + 4*4 (16) + 16 (0x10) = 0x00401020.'
      }
    ],
    tests: [
      {
        label: 'Accès au premier élément sans déplacement (index 0)',
        stdin: '0x00405000;0;8;0x00000000',
        expected: 'ADRESSE=0x00405000 DEC=4214784'
      },
      {
        label: 'Tableau d’entiers 64 bits (scale = 8)',
        stdin: '0x00500000;10;8;0x00000020',
        expected: 'ADRESSE=0x00500070 DEC=5242992'
      },
      {
        label: 'Tableau de caractères (scale = 1)',
        stdin: '0x00100000;25;1;0x00000005',
        expected: 'ADRESSE=0x0010001E DEC=1048606'
      },
      {
        label: 'Index négatif avec déplacement',
        stdin: '0x00402000;2;4;0x00000000',
        expected: 'ADRESSE=0x00402008 DEC=4202504'
      }
    ],
    solution: `ligne = input().strip()
base_s, idx_s, sc_s, disp_s = ligne.split(';')
base = int(base_s, 16)
idx = int(idx_s)
scale = int(sc_s)
disp = int(disp_s, 16)

adresse = base + (idx * scale) + disp
print(f"ADRESSE=0x{adresse:08X} DEC={adresse}")
`
  },
  {
    id: 'asm2-c5-e3',
    chapter: 5,
    title: 'Exécuteur d’opérations arithmétiques x86 (ADD, SUB, INC, DEC, NEG, XOR)',
    level: 'n2',
    language: 'python',
    goal: 'Exécuter pas à pas une séquence d’instructions arithmétiques sur un accumulateur 32 bits.',
    brief:
      '<p>Un registre accumulateur <code>EAX</code> part d’une valeur initiale donnée. ' +
      'On lui applique successivement une suite d’instructions arithmétiques séparées par des virgules :</p>' +
      '<ul>' +
      '  <li><code>ADD n</code> : ajoute <code>n</code> ;</li>' +
      '  <li><code>SUB n</code> : soustrait <code>n</code> ;</li>' +
      '  <li><code>INC</code> : incrémente de 1 ;</li>' +
      '  <li><code>DEC</code> : décrémente de 1 ;</li>' +
      '  <li><code>NEG</code> : inverse arithmétiquement le signe ($EAX = -EAX$) ;</li>' +
      '  <li><code>XOR n</code> : applique un ou exclusif binaire avec <code>n</code>.</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard <code>VAL_INIT;OPERATIONS</code>. Affiche la valeur finale au format :<br>' +
      '<code>VAL=&lt;entier signé&gt; HEX=0x&lt;8 chiffres HEX majuscules&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : parser les opérations et mettre à jour la valeur du registre EAX
`,
    hints: [
      'À chaque opération, conserve la valeur sur 32 bits : eax = (eax + ...) & 0xFFFFFFFF.',
      'Pour afficher VAL signé : si eax >= 0x80000000, valeur_signee = eax - 0x100000000, sinon eax.',
      'Formate avec f"VAL={valeur_signee} HEX=0x{eax:08X}".'
    ],
    examples: [
      {
        stdin: '10;ADD 5, SUB 2, INC',
        expected: 'VAL=14 HEX=0x0000000E',
        note: '10 + 5 = 15 -> 15 - 2 = 13 -> 13 + 1 = 14 (0x0E).'
      }
    ],
    tests: [
      {
        label: 'Opération NEG et soustraction',
        stdin: '5;NEG, SUB 3',
        expected: 'VAL=-8 HEX=0xFFFFFFF8'
      },
      {
        label: 'Remise à zéro classique par XOR sur lui-même',
        stdin: '123;XOR 123',
        expected: 'VAL=0 HEX=0x00000000'
      },
      {
        label: 'Incrémentations et décrémentations successives',
        stdin: '0;INC, INC, INC, DEC',
        expected: 'VAL=2 HEX=0x00000002'
      },
      {
        label: 'Séquence complète mixte',
        stdin: '50;ADD 50, XOR 15, NEG',
        expected: 'VAL=-107 HEX=0xFFFFFF95'
      }
    ],
    solution: `ligne = input().strip()
init_s, ops_s = ligne.split(';')
eax = int(init_s) & 0xFFFFFFFF

ops = [op.strip() for op in ops_s.split(',')]
for op in ops:
    if not op:
        continue
    tokens = op.split()
    cmd = tokens[0].upper()
    if cmd == 'ADD':
        eax = (eax + int(tokens[1])) & 0xFFFFFFFF
    elif cmd == 'SUB':
        eax = (eax - int(tokens[1])) & 0xFFFFFFFF
    elif cmd == 'INC':
        eax = (eax + 1) & 0xFFFFFFFF
    elif cmd == 'DEC':
        eax = (eax - 1) & 0xFFFFFFFF
    elif cmd == 'NEG':
        eax = (-eax) & 0xFFFFFFFF
    elif cmd == 'XOR':
        eax = (eax ^ int(tokens[1])) & 0xFFFFFFFF

val_signe = eax - 0x100000000 if eax >= 0x80000000 else eax
print(f"VAL={val_signe} HEX=0x{eax:08X}")
`
  }
];
