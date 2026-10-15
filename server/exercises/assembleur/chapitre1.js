/**
 * Exercices du chapitre 1 — Numération, Représentation des données & Logique binaire.
 */
'use strict';

module.exports = [
  {
    id: 'asm2-c1-e1',
    chapter: 1,
    title: 'Masquage binaire & opérations logiques (AND, OR, XOR)',
    level: 'n1',
    language: 'python',
    goal: 'Appliquer des masques binaires 8 bits pour isoler, forcer ou inverser des bits.',
    brief:
      '<p>En programmation assembleur, les opérations bit à bit (AND, OR, XOR) sont omniprésentes ' +
      'pour manipuler les registres et interagir avec le matériel. ' +
      'Lit sur l’entrée standard une ligne au format <code>VAL;MASQUE;OP</code> où :</p>' +
      '<ul>' +
      '  <li><code>VAL</code> et <code>MASQUE</code> sont des entiers 8 bits au format hexadécimal (ex. <code>0x3F</code>) ;</li>' +
      '  <li><code>OP</code> est l’opération à appliquer parmi <code>AND</code>, <code>OR</code>, <code>XOR</code>.</li>' +
      '</ul>' +
      '<p>Affiche le résultat sur 8 bits au format :<br>' +
      '<code>HEX=0xXX BIN=bbbbbbbb</code> (où XX est en majuscules sur 2 chiffres et bbbbbbbb sur 8 bits binaires).</p>',
    starter: `ligne = input().strip()

# À compléter : analyser la ligne, calculer l'opération bit à bit et afficher HEX et BIN
`,
    hints: [
      'Utilise int(val_str, 16) pour convertir la chaîne hexadécimale en entier.',
      'Les opérateurs bit à bit en Python sont &, | et ^.',
      'Formate avec f"HEX=0x{res:02X} BIN={res:08b}".'
    ],
    examples: [
      {
        stdin: '0x3F;0x0F;AND',
        expected: 'HEX=0x0F BIN=00001111',
        note: '0x3F (00111111) AND 0x0F (00001111) = 0x0F (00001111).'
      }
    ],
    tests: [
      {
        label: 'Opération OR pour forcer des bits',
        stdin: '0x80;0x01;OR',
        expected: 'HEX=0x81 BIN=10000001'
      },
      {
        label: 'Opération XOR pour inverser un quartet',
        stdin: '0xAA;0x0F;XOR',
        expected: 'HEX=0xA5 BIN=10100101'
      },
      {
        label: 'Opération AND masque nul',
        stdin: '0xFF;0x00;AND',
        expected: 'HEX=0x00 BIN=00000000'
      },
      {
        label: 'Opération XOR identité (bascule complète)',
        stdin: '0x55;0xAA;XOR',
        expected: 'HEX=0xFF BIN=11111111'
      }
    ],
    solution: `ligne = input().strip()
val_s, mask_s, op = ligne.split(';')
val = int(val_s, 16) & 0xFF
mask = int(mask_s, 16) & 0xFF

if op == 'AND':
    res = val & mask
elif op == 'OR':
    res = val | mask
elif op == 'XOR':
    res = val ^ mask
else:
    res = 0

print(f"HEX=0x{res:02X} BIN={res:08b}")
`
  },
  {
    id: 'asm2-c1-e2',
    chapter: 1,
    title: 'Décodage du Complément à 2 (8 bits & 16 bits)',
    level: 'n1',
    language: 'python',
    goal: 'Convertir une valeur hexadécimale brute en entier signé selon le complément à 2.',
    brief:
      '<p>Les processeurs représentent les entiers relatifs selon la convention du <strong>complément à 2</strong>. ' +
      'Le bit de poids fort (MSB) détermine le signe (0 = positif, 1 = négatif). ' +
      'Lit sur l’entrée standard une ligne au format <code>HEX;BITS</code> où :</p>' +
      '<ul>' +
      '  <li><code>HEX</code> est la valeur brute hexadécimale (ex. <code>0xFF</code> ou <code>0x8000</code>) ;</li>' +
      '  <li><code>BITS</code> est la largeur du registre (8 ou 16).</li>' +
      '</ul>' +
      '<p>Affiche la valeur décimale signée au format :<br>' +
      '<code>DEC=&lt;valeur signée&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : lire la valeur hexadécimale et calculer sa valeur signée
`,
    hints: [
      'Pour 8 bits, si la valeur >= 128 (0x80), soustrais 256 (2^8).',
      'Pour 16 bits, si la valeur >= 32768 (0x8000), soustrais 65536 (2^16).'
    ],
    examples: [
      {
        stdin: '0xFF;8',
        expected: 'DEC=-1',
        note: '0xFF sur 8 bits correspond à -1 en complément à 2.'
      }
    ],
    tests: [
      {
        label: 'Minimum 8 bits signé (-128)',
        stdin: '0x80;8',
        expected: 'DEC=-128'
      },
      {
        label: 'Maximum 8 bits signé (+127)',
        stdin: '0x7F;8',
        expected: 'DEC=127'
      },
      {
        label: 'Valeur négative 16 bits (-1)',
        stdin: '0xFFFF;16',
        expected: 'DEC=-1'
      },
      {
        label: 'Valeur négative 16 bits (-1000)',
        stdin: '0xFC18;16',
        expected: 'DEC=-1000'
      }
    ],
    solution: `ligne = input().strip()
hex_s, bits_s = ligne.split(';')
bits = int(bits_s)
val = int(hex_s, 16) & ((1 << bits) - 1)

seuil = 1 << (bits - 1)
if val >= seuil:
    val -= (1 << bits)

print(f"DEC={val}")
`
  },
  {
    id: 'asm2-c1-e3',
    chapter: 1,
    title: 'Décalages logiques & arithmétiques (SHL, SHR, SAR)',
    level: 'n2',
    language: 'python',
    goal: 'Distinguer le décalage logique vers la droite (SHR) et le décalage arithmétique avec préservation du signe (SAR).',
    brief:
      '<p>Les instructions de décalage permettent d’effectuer des multiplications et divisions rapides par des puissances de 2. ' +
      'Sur 8 bits :</p>' +
      '<ul>' +
      '  <li><code>SHL</code> : décale les bits à gauche et insère des 0 à droite ;</li>' +
      '  <li><code>SHR</code> : décale à droite et insère des 0 à gauche (pour entiers non signés) ;</li>' +
      '  <li><code>SAR</code> : décale à droite en répliquant le bit de signe (bit 7) à gauche (pour entiers signés).</li>' +
      '</ul>' +
      '<p>Lit sur l’entrée standard <code>VAL_HEX;N;OP</code> et affiche :<br>' +
      '<code>RES=0xXX</code> (sur 2 chiffres hexadécimaux majuscules).</p>',
    starter: `ligne = input().strip()

# À compléter : décoder la valeur, exécuter le type de décalage et afficher le résultat 8 bits
`,
    hints: [
      'Pour SAR, si le bit 7 est à 1 (val >= 128), les bits insérés à gauche lors du shift doivent être des 1.',
      'Une façon simple pour SAR : convertis en entier signé (-128..127), applique >> n, puis prends & 0xFF.'
    ],
    examples: [
      {
        stdin: '0x80;1;SHL',
        expected: 'RES=0x00',
        note: '0x80 (10000000) décalé de 1 à gauche déborde sur 8 bits et devient 0x00.'
      }
    ],
    tests: [
      {
        label: 'SHR logique sur nombre négatif',
        stdin: '0x80;2;SHR',
        expected: 'RES=0x20'
      },
      {
        label: 'SAR arithmétique préservant le bit de signe 1',
        stdin: '0x80;2;SAR',
        expected: 'RES=0xE0'
      },
      {
        label: 'SAR sur -2 (0xFE) décalé de 1',
        stdin: '0xFE;1;SAR',
        expected: 'RES=0xFF'
      },
      {
        label: 'SHL standard sans débordement',
        stdin: '0x0A;3;SHL',
        expected: 'RES=0x50'
      }
    ],
    solution: `ligne = input().strip()
val_s, n_s, op = ligne.split(';')
val = int(val_s, 16) & 0xFF
n = int(n_s)

if op == 'SHL':
    res = (val << n) & 0xFF
elif op == 'SHR':
    res = (val >> n) & 0xFF
elif op == 'SAR':
    signe = val - 256 if val >= 128 else val
    res = (signe >> n) & 0xFF
else:
    res = 0

print(f"RES=0x{res:02X}")
`
  }
];
