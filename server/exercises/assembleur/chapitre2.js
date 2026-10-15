/**
 * Exercices du chapitre 2 — Architecture Processeur, Registres & Drapeaux d'état.
 */
'use strict';

module.exports = [
  {
    id: 'asm2-c2-e1',
    chapter: 2,
    title: 'Décomposition des sous-registres x86_64 (RAX, EAX, AX, AH, AL)',
    level: 'n1',
    language: 'python',
    goal: 'Comprendre l’emboîtement hiérarchique des registres généraux de l’architecture Intel x86.',
    brief:
      '<p>En architecture x86_64, le registre 64 bits <code>RAX</code> englobe plusieurs sous-registres historiques :</p>' +
      '<ul>' +
      '  <li><code>EAX</code> : les 32 bits de poids faible ;</li>' +
      '  <li><code>AX</code> : les 16 bits de poids faible de EAX ;</li>' +
      '  <li><code>AH</code> : les 8 bits de poids fort de AX ;</li>' +
      '  <li><code>AL</code> : les 8 bits de poids faible de AX.</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard une valeur hexadécimale 64 bits (ex. <code>0x1122334455667788</code>). ' +
      'Affiche la décomposition exacte au format :<br>' +
      '<code>RAX=0x... EAX=0x... AX=0x... AH=0x.. AL=0x..</code>.</p>',
    starter: `val_hex = input().strip()

# À compléter : extraire les sous-registres par masquage et décalage
`,
    hints: [
      'Convertis avec int(val_hex, 16) pour obtenir un entier 64 bits.',
      'EAX = val & 0xFFFFFFFF, AX = val & 0xFFFF, AL = val & 0xFF, AH = (val >> 8) & 0xFF.',
      'Formate avec des longueurs fixes : {:016X}, {:08X}, {:04X}, {:02X}.'
    ],
    examples: [
      {
        stdin: '0x1122334455667788',
        expected: 'RAX=0x1122334455667788 EAX=0x55667788 AX=0x7788 AH=0x77 AL=0x88',
        note: 'AX contient 0x7788, découpé en AH=0x77 (haut) et AL=0x88 (bas).'
      }
    ],
    tests: [
      {
        label: 'Sous-registres nuls sur poids fort',
        stdin: '0x00000000AABBCCDD',
        expected: 'RAX=0x00000000AABBCCDD EAX=0xAABBCCDD AX=0xCCDD AH=0xCC AL=0xDD'
      },
      {
        label: 'Valeur maximale F',
        stdin: '0xFFFFFFFFFFFFFFFF',
        expected: 'RAX=0xFFFFFFFFFFFFFFFF EAX=0xFFFFFFFF AX=0xFFFF AH=0xFF AL=0xFF'
      },
      {
        label: 'Seulement AH et AL alimentés',
        stdin: '0x0000000000001234',
        expected: 'RAX=0x0000000000001234 EAX=0x00001234 AX=0x1234 AH=0x12 AL=0x34'
      },
      {
        label: 'Registre AL seul à 1',
        stdin: '0x1234567890ABCDEF',
        expected: 'RAX=0x1234567890ABCDEF EAX=0x90ABCDEF AX=0xCDEF AH=0xCD AL=0xEF'
      }
    ],
    solution: `val_hex = input().strip()
val = int(val_hex, 16) & 0xFFFFFFFFFFFFFFFF

rax = val
eax = val & 0xFFFFFFFF
ax = val & 0xFFFF
ah = (val >> 8) & 0xFF
al = val & 0xFF

print(f"RAX=0x{rax:016X} EAX=0x{eax:08X} AX=0x{ax:04X} AH=0x{ah:02X} AL=0x{al:02X}")
`
  },
  {
    id: 'asm2-c2-e2',
    chapter: 2,
    title: 'Simulateur d’ALU 8 bits & Drapeaux d’état (ZF, CF, SF)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la mise à jour des drapeaux du registre EFLAGS (Z, C, S) après une addition ou soustraction.',
    brief:
      '<p>L’Unité Arithmétique et Logique (ALU) met à jour des indicateurs d’état après chaque calcul :</p>' +
      '<ul>' +
      '  <li><code>ZF (Zero Flag)</code> : mis à 1 si le résultat 8 bits vaut 0, sinon 0 ;</li>' +
      '  <li><code>CF (Carry Flag)</code> : retenue non signée (1 si dépassement &gt; 255 en ADD, ou emprunt A &lt; B en SUB) ;</li>' +
      '  <li><code>SF (Sign Flag)</code> : bit de signe du résultat 8 bits (bit 7 à 1).</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard <code>OP;A;B</code> (avec OP = ADD ou SUB, A et B en décimal 0..255). ' +
      'Affiche :<br>' +
      '<code>RES=0xXX ZF=&lt;0|1&gt; CF=&lt;0|1&gt; SF=&lt;0|1&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : calculer l'opération 8 bits et déterminer ZF, CF et SF
`,
    hints: [
      'Pour ADD : somme = A + B, CF = 1 si somme > 255 sinon 0, res = somme & 0xFF.',
      'Pour SUB : diff = A - B, CF = 1 si A < B sinon 0, res = diff & 0xFF.',
      'ZF = 1 si res == 0 sinon 0, SF = 1 si (res & 0x80) != 0 sinon 0.'
    ],
    examples: [
      {
        stdin: 'ADD;250;10',
        expected: 'RES=0x04 ZF=0 CF=1 SF=0',
        note: '250 + 10 = 260 -> 260 & 0xFF = 4 (0x04) avec dépassement non signé CF=1.'
      }
    ],
    tests: [
      {
        label: 'Soustraction donnant zéro (ZF=1)',
        stdin: 'SUB;42;42',
        expected: 'RES=0x00 ZF=1 CF=0 SF=0'
      },
      {
        label: 'Soustraction avec emprunt et signe négatif (CF=1, SF=1)',
        stdin: 'SUB;5;10',
        expected: 'RES=0xFB ZF=0 CF=1 SF=1'
      },
      {
        label: 'Addition normale sans retenue',
        stdin: 'ADD;20;30',
        expected: 'RES=0x32 ZF=0 CF=0 SF=0'
      },
      {
        label: 'Addition produisant un résultat négatif 8 bits (SF=1)',
        stdin: 'ADD;100;30',
        expected: 'RES=0x82 ZF=0 CF=0 SF=1'
      }
    ],
    solution: `ligne = input().strip()
op, a_s, b_s = ligne.split(';')
a = int(a_s) & 0xFF
b = int(b_s) & 0xFF

if op == 'ADD':
    raw = a + b
    cf = 1 if raw > 255 else 0
    res = raw & 0xFF
elif op == 'SUB':
    cf = 1 if a < b else 0
    res = (a - b) & 0xFF
else:
    cf = 0
    res = 0

zf = 1 if res == 0 else 0
sf = 1 if (res & 0x80) != 0 else 0

print(f"RES=0x{res:02X} ZF={zf} CF={cf} SF={sf}")
`
  },
  {
    id: 'asm2-c2-e3',
    chapter: 2,
    title: 'Détection du débordement signé (Overflow Flag OF)',
    level: 'n2',
    language: 'python',
    goal: 'Identifier quand une opération arithmétique dépasse la plage des entiers signés (-128 à +127).',
    brief:
      '<p>Le drapeau <strong>OF (Overflow Flag)</strong> signale un dépassement de capacité lors de calculs ' +
      'sur des entiers signés en complément à 2 (plage 8 bits : <code>-128 .. +127</code>) :</p>' +
      '<ul>' +
      '  <li>En addition : l’addition de deux nombres positifs donne un négatif, ou l’addition de deux négatifs donne un positif ;</li>' +
      '  <li>En soustraction ($A - B$) : soustraire un négatif à un positif donne un négatif, ou soustraire un positif à un négatif donne un positif.</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard <code>A;B;OP</code> (A et B en entiers signés décimaux, OP = ADD ou SUB). ' +
      'Affiche :<br>' +
      '<code>VAL=&lt;valeur signée 8 bits&gt; OF=&lt;0|1&gt; DIAG=&lt;OVERFLOW|NORMAL&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : exécuter l'opération signée, détecter l'Overflow et afficher le diagnostic
`,
    hints: [
      'Calcule le résultat arithmétique théorique sans troncature : th = A + B (ou A - B).',
      'Un overflow sur 8 bits signé se produit si th < -128 ou th > 127.',
      'La valeur 8 bits résultante correspond à (th & 0xFF), puis convertie en signé si >= 128.'
    ],
    examples: [
      {
        stdin: '100;50;ADD',
        expected: 'VAL=-106 OF=1 DIAG=OVERFLOW',
        note: '100 + 50 = 150 > 127 : débordement signé OF=1. 150 & 0xFF = 150 -> 150 - 256 = -106.'
      }
    ],
    tests: [
      {
        label: 'Addition de négatifs avec dépassement (-70 + -60)',
        stdin: '-70;-60;ADD',
        expected: 'VAL=126 OF=1 DIAG=OVERFLOW'
      },
      {
        label: 'Addition normale sans dépassement',
        stdin: '40;30;ADD',
        expected: 'VAL=70 OF=0 DIAG=NORMAL'
      },
      {
        label: 'Soustraction avec dépassement (100 - -50)',
        stdin: '100;-50;SUB',
        expected: 'VAL=-106 OF=1 DIAG=OVERFLOW'
      },
      {
        label: 'Soustraction normale aux bornes (-100 - 20 = -120)',
        stdin: '-100;20;SUB',
        expected: 'VAL=-120 OF=0 DIAG=NORMAL'
      }
    ],
    solution: `ligne = input().strip()
a_s, b_s, op = ligne.split(';')
a = int(a_s)
b = int(b_s)

if op == 'ADD':
    th = a + b
elif op == 'SUB':
    th = a - b
else:
    th = 0

of = 1 if (th < -128 or th > 127) else 0
val_8 = th & 0xFF
val_signed = val_8 - 256 if val_8 >= 128 else val_8
diag = 'OVERFLOW' if of == 1 else 'NORMAL'

print(f"VAL={val_signed} OF={of} DIAG={diag}")
`
  }
];
