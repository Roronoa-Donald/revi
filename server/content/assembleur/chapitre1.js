/**
 * Chapitre 1 du cours « Assembleur » B2 — Numération, Représentation des données & Logique binaire.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Numération, Représentation des Données &amp; Logique Binaire',
  short: 'Numération &amp; Logique Binaire',
  toc: 'Bases binaire, décimale et hexadécimale, entiers signés en complément à 2, masques binaires et décalages arithmétiques.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Un ingénieur en rétro-ingénierie examine une trame réseau brute interceptée : l’octet 0xC6. ' +
    'S’agit-il de la valeur décimale 198 (nombre de paquets non signés) ou d’une coordonnée relative négative de -58 (entier signé) ? ' +
    'Et pourquoi un décalage de 1 bit à droite transforme-t-il parfois une valeur négative en un nombre positif aberrant ' +
    'si le développeur utilise un décalage logique plutôt qu’un décalage arithmétique ? ' +
    'Au niveau matériel, le processeur ne manipule que des suites de bits : c’est l’analyste qui donne un sens mathématique aux registres.',

  objectives: [
    'convertir rapidement et sans calculatrice entre les bases binaire (base 2), décimale (base 10) et hexadécimale (base 16) ;',
    'comprendre et calculer le complément à 2 pour coder et décoder des entiers signés sur 8, 16, 32 et 64 bits ;',
    'concevoir des masques binaires avec les opérateurs logiques fondamentaux (AND, OR, XOR, NOT) ;',
    'distinguer rigoureusement le décalage logique (SHL, SHR) du décalage arithmétique (SAR) préservant le bit de signe ;',
    'identifier les bornes numériques minimales et maximales d’un registre selon son interprétation signée ou non signée.'
  ],

  sections: [
    {
      title: 'Les systèmes de numération (Binaire, Hexadécimal &amp; Décimal)',
      html: [
        '<p>Un système de numération positionnelle en base $B$ exprime tout nombre entier sous la forme ' +
        'd’une somme pondérée de puissances de sa base : $N = \\sum_{k=0}^{n-1} d_k \\cdot B^k$.</p>',

        box('info', 'Les trois bases reines de l’architecture des ordinateurs', [
          '<ul>',
          '  <li><strong>Base 2 (Binaire)</strong> : chiffres $\\{0, 1\\}$. C’est l’état physique des transistors et des lignes de bus (niveau logique bas $0\\text{ V}$ ou haut $5\\text{ V} / 3.3\\text{ V}$).</li>',
          '  <li><strong>Base 16 (Hexadécimal)</strong> : chiffres $\\{0..9, A..F\\}$. Chaque chiffre hexadécimal représente exactement un <strong>quartet (nibble, 4 bits)</strong>. Deux chiffres forment un octet (8 bits).</li>',
          '  <li><strong>Base 10 (Décimal)</strong> : chiffres $\\{0..9\\}$. Utilisée uniquement pour l’affichage humain en fin de chaîne.</li>',
          '</ul>'
        ].join('\n')),

        '<p>La conversion binaire &harr; hexadécimal est directe et immédiate par regroupement de 4 bits en partant de la droite :</p>',
        '<pre><code>// Exemple : 11010110b en hexadécimal\n' +
        '1. Découpage en quartets :  1101 | 0110\n' +
        '2. Conversion directe    :   D   |  6    &rarr; 0xD6 (soit 13*16 + 6 = 214 en décimal)</code></pre>'
      ].join('\n')
    },
    {
      title: 'Représentation des entiers relatifs : le Complément à 2',
      html: [
        '<p>Pour que l’Unité Arithmétique et Logique (ALU) puisse utiliser <strong>le même circuit électronique d’addition</strong> ' +
        'pour additionner ou soustraire des nombres, les ordinateurs modernes utilisent quasi universellement le <strong>complément à 2</strong>.</p>',

        box('situation', 'L’analogie du compteur kilométrique de voiture', [
          '<p>Pour comprendre intuitivement pourquoi le complément à 2 fonctionne sans magie noire, imaginez le compteur kilométrique d’une voiture affichant 6 chiffres : de <code>000 000</code> à <code>999 999</code>.</p>',
          '<ul>',
          '  <li>Si la voiture est neuve à <code>000 000</code> km et que vous la faites reculer d’un kilomètre ($-1$), le rouleau mécanique recule et affiche <code>999 999</code>.</li>',
          '  <li>Sur ce compteur à 6 chiffres, reculer de 1 équivaut exactement à avancer de $10^6 - 1 = 999 999$.</li>',
          '</ul>',
          '<p>Dans un registre processeur sur 8 bits (valeurs de <code>0000 0000b</code> à <code>1111 1111b</code>, soit 0 à 255), si vous partez de 0 et reculez de 1 ($-1$), le registre bascule à <code>1111 1111b</code> (qui vaut 255 en non signé, mais <strong>-1 en signé</strong>). Le complément à 2 exploite simplement cette arithmétique modulaire circulaire !</p>'
        ].join('\n')),

        box('standard', 'Algorithme du Complément à 2 sur n bits', [
          '<ol>',
          '  <li>Écrire la valeur absolue du nombre en binaire sur $n$ bits.</li>',
          '  <li>Inverser tous les bits ($0 \\to 1$ et $1 \\to 0$, complément à 1 ou NOT).</li>',
          '  <li>Ajouter $1$ au résultat binaire (en ignorant tout débordement au-delà du $n$-ième bit).</li>',
          '</ol>',
          '<p><strong>Plage de valeurs sur n bits :</strong><br>' +
          '- Entier non signé (unsigned) : $[0 \\ .. \\ 2^n - 1]$ (ex. 8 bits : $0 \\ .. \\ 255$)<br>' +
          '- Entier signé (signed) : $[-2^{n-1} \\ .. \\ +2^{n-1} - 1]$ (ex. 8 bits : $-128 \\ .. \\ +127$)</p>'
        ].join('\n')),

        box('tip', 'Exemple détaillé : coder -13 sur 8 bits', [
          '<pre><code>1. Valeur absolue +13 en 8 bits : 0000 1101b\n' +
          '2. Inversion (complément à 1)  : 1111 0010b\n' +
          '3. Ajout de 1                  : 1111 0011b (soit 0xF3 en hexadécimal)</code></pre>',
          '<p>Le bit 7 (Most Significant Bit, MSB) vaut 1, ce qui confirme que le nombre est négatif.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Opérations logiques fondamentales &amp; Masquage de bits',
      html: [
        '<p>Les instructions logiques permettent de contrôler individuellement chaque bit d’un registre matériel :</p>',

        '<table class="table">',
        '  <thead><tr><th>Instruction</th><th>Rôle en français</th><th>Usage matériel typique</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><code>AND dest, mask</code></td><td>Conserve les bits là où le masque vaut 1, force à 0 ailleurs</td><td><strong>Isoler</strong> un bit ou forcer un état bas ($x \\ \\&amp; \\ 0\\text{x0F}$)</td></tr>',
        '    <tr><td><code>OR dest, mask</code></td><td>Force les bits à 1 là où le masque vaut 1, laisse inchangé ailleurs</td><td><strong>Activer</strong> un drapeau ou une broche de sortie</td></tr>',
        '    <tr><td><code>XOR dest, mask</code></td><td>Inverse (bascule) les bits là où le masque vaut 1</td><td><strong>Inverser</strong> l’état d’une LED, ou remettre un registre à 0 (<code>XOR EAX, EAX</code>)</td></tr>',
        '    <tr><td><code>NOT dest</code></td><td>Inverse tous les bits ($0 \\leftrightarrow 1$)</td><td>Calcul du complément à 1</td></tr>',
        '  </tbody>',
        '</table>',

        box('pitfall', 'L’astuce classique : XOR EAX, EAX', [
          '<p>Dans tous les compilateurs C/C++ générant du code x86, on observe l’instruction <code>XOR EAX, EAX</code> ' +
          'plutôt que <code>MOV EAX, 0</code>. Pourquoi ?</p>' +
          '<ul>' +
          '  <li>L’instruction <code>XOR EAX, EAX</code> n’occupe que <strong>2 octets</strong> d’opcode (<code>31 C0</code>), alors que <code>MOV EAX, 0</code> en occupe <strong>5 octets</strong> (<code>B8 00 00 00 00</code>) ;</li>' +
          '  <li>Les décodeurs CPU modernes reconnaissent <code>XOR reg, reg</code> comme une réinitialisation sans dépendance de données, rompant les aléas de pipeline.</li>' +
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Décalages logiques vs Décalages arithmétiques (SHL, SHR, SAR)',
      html: [
        '<p>Décaler les bits d’un registre vers la gauche ou vers la droite équivaut à multiplier ou diviser par des puissances de 2 :</p>',

        '<pre><code>// 1. Décalage logique gauche (SHL - Shift Left)\n' +
        'SHL AL, 1    ; Multiplie par 2. Les bits se déplacent à gauche, un 0 entre à droite.\n' +
        '            ; Le bit éjecté à gauche entre dans le drapeau Carry (CF).\n\n' +
        '// 2. Décalage logique droite (SHR - Shift Right)\n' +
        'SHR AL, 1    ; Divise par 2 pour ENTIERS NON SIGNÉS. Un 0 entre à gauche.\n' +
        '            ; Exemple : 1000 0000b (128) &rarr; 0100 0000b (64). Correct !\n\n' +
        '// 3. Décalage arithmétique droite (SAR - Shift Arithmetic Right)\n' +
        'SAR AL, 1    ; Divise par 2 pour ENTIERS SIGNÉS. Le bit de signe (bit 7) est répliqué !\n' +
        '            ; Exemple : 1000 0000b (-128) &rarr; 1100 0000b (-64). Le signe est conservé !</code></pre>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Quel est l’équivalent hexadécimal de l’octet binaire 11010110b ?',
      opts: [
        '0xD6',
        '0xC6',
        '0xD3',
        '0xE6'
      ],
      correct: 0,
      exp: 'En regroupant par 4 bits : 1101 = 13 = D, et 0110 = 6. L’octet vaut donc 0xD6.'
    },
    {
      stem: 'Quelle est la plage de valeurs d’un entier signé codé en complément à 2 sur 8 bits ?',
      opts: [
        '-128 à +127',
        '0 à 255',
        '-127 à +128',
        '-256 à +255'
      ],
      correct: 0,
      exp: 'Sur 8 bits signés : de -2^7 (-128) à +2^7 - 1 (+127).'
    },
    {
      stem: 'Comment s’écrit l’entier négatif -1 en complément à 2 sur 8 bits ?',
      opts: [
        '0xFF (11111111b)',
        '0x80 (10000000b)',
        '0x01 (00000001b)',
        '0xFE (11111110b)'
      ],
      correct: 0,
      exp: '+1 = 00000001b. Inversion : 11111110b. Ajout de 1 : 11111111b = 0xFF.'
    },
    {
      stem: 'Quelle opération logique permet de forcer un bit particulier à 1 sans modifier les autres bits du registre ?',
      opts: [
        'OR avec un masque ayant 1 sur le bit ciblé',
        'AND avec un masque ayant 1 sur le bit ciblé',
        'XOR avec un masque de 0',
        'NOT appliqué au registre'
      ],
      correct: 0,
      exp: 'Dans la table de vérité de l’opérateur OR : 0 OR 1 = 1, et 1 OR 1 = 1. Le bit est forcé à 1.'
    },
    {
      stem: 'Pourquoi l’instruction XOR EAX, EAX est-elle préférée à MOV EAX, 0 par les compilateurs ?',
      opts: [
        'Elle est plus compacte (2 octets contre 5) et rompt les dépendances de registre dans le CPU',
        'Elle active automatiquement l’unité arithmétique flottante FPU',
        'Elle permet d’écrire dans la mémoire cache L1',
        'Elle désactive les interruptions matérielles'
      ],
      correct: 0,
      exp: 'XOR reg, reg n’occupe que 2 octets et est optimisé par les processeurs modernes pour réinitialiser le registre à coût nul.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre SHR (Shift Right) et SAR (Shift Arithmetic Right) ?',
      opts: [
        'SAR réplique le bit de signe (bit 7) à gauche pour préserver la valeur signée, tandis que SHR insère des 0',
        'SHR fonctionne uniquement sur 16 bits',
        'SAR inverse l’ordre des octets en mémoire',
        'Il n’y a aucune différence, ce sont deux synonymes'
      ],
      correct: 0,
      exp: 'SAR (Shift Arithmetic Right) préserve le signe des entiers négatifs en dupliquant le bit de poids fort.'
    },
    {
      stem: 'Si un registre 8 bits contient 0x80 (-128) et que l’on exécute SAR AL, 1, quel est le résultat ?',
      opts: [
        '0xC0 (-64)',
        '0x40 (+64)',
        '0x00 (0)',
        '0xFF (-1)'
      ],
      correct: 0,
      exp: '0x80 = 1000 0000b. Avec SAR, le bit 1 est répliqué à gauche : 1100 0000b = 0xC0 (-64 décimal).'
    },
    {
      stem: 'Combien d’octets contient un mot double (Double Word / DWORD) en architecture Intel x86 ?',
      opts: [
        '4 octets (32 bits)',
        '2 octets (16 bits)',
        '8 octets (64 bits)',
        '1 octet (8 bits)'
      ],
      correct: 0,
      exp: 'Historiquement chez Intel, un WORD fait 16 bits (2 octets). Un DWORD fait donc 32 bits (4 octets) et un QWORD fait 64 bits (8 octets).'
    }
  ],

  pitfalls: [
    'Confondre le décalage logique SHR (qui insère des 0) et le décalage arithmétique SAR (qui préserve le signe).',
    'Oublier d’ajouter 1 lors du calcul manuel d’un complément à 2 (s’arrêter au complément à 1).',
    'Supposer qu’un octet 0xFF vaut toujours 255 : dans un contexte signé, il vaut -1.',
    'Utiliser l’opérateur OR au lieu de AND pour tester la présence d’un bit dans un registre.',
    'Mélanger les largeurs de registres : affecter un mot 32 bits dans un registre 16 bits sans instruction de troncature.'
  ],

  methodTitle: 'Protocole en 4 étapes pour décoder toute valeur binaire brute',
  method: [
    'Identifier la taille exacte du conteneur en bits (8 bits byte, 16 bits word, 32 bits dword, 64 bits qword).',
    'Identifier l’interprétation sémantique : entier non signé (unsigned) ou entier signé (signed, complément à 2).',
    'Pour un nombre signé négatif (bit MSB à 1) : inverser les bits, ajouter 1 pour trouver la valeur absolue, et ajouter le signe moins.',
    'Pour appliquer un masque : écrire le masque en binaire aligné sous la valeur, appliquer la table de vérité bit à bit, puis convertir en hexadécimal.'
  ],

  summary: [
    'Un quartet (4 bits) correspond exactement à un chiffre hexadécimal (0 à F). Deux chiffres hexadécimaux forment un octet.',
    'Le complément à 2 s’obtient par inversion de tous les bits (NOT) puis ajout de 1 : $[-2^{n-1} \\ .. \\ +2^{n-1} - 1]$.',
    'Les masques binaires utilisent AND (isoler/mettre à 0), OR (forcer à 1) et XOR (inverser).',
    'L’instruction XOR reg, reg est le moyen le plus rapide et compact pour remettre un registre à zéro.',
    'Les décalages gauche (SHL) multiplient par 2. SAR divise par 2 les entiers signés en répliquant le bit de signe.'
  ],

  checklist: [
    'Je sais convertir instantanément un octet hexadécimal en binaire sans poser de division.',
    'Je sais calculer le complément à 2 d’un entier négatif sur 8 bits et 16 bits.',
    'Je sais quel masque et quelle opération logique utiliser pour manipuler un bit précis.',
    'Je comprends pourquoi XOR EAX, EAX est universellement utilisé à la place de MOV EAX, 0.',
    'Je sais distinguer l’effet de SHR et de SAR sur un nombre binaire ayant son bit de signe à 1.'
  ],

  notions: [
    'Système binaire (Base 2)',
    'Système hexadécimal (Base 16)',
    'Complément à 2',
    'Bit de poids fort (MSB)',
    'Masquage bit à bit',
    'Opérateur AND / OR / XOR',
    'XOR EAX, EAX',
    'Décalage logique (SHL / SHR)',
    'Décalage arithmétique (SAR)',
    'Entier signé vs non signé'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les conversions binaire/hexa et la méthode du complément à 2.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur le masquage logique et la différence entre SHR et SAR.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises la numération binaire et les opérations logiques machine.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à l’architecture interne du processeur et aux registres au chapitre 2.' }
  ],

  flashcards: [
    { q: 'Que vaut l’octet hexadécimal 0xFF en entier signé 8 bits ?', a: '-1 en décimal (complément à 2).' },
    { q: 'Quelle est la plage de valeurs d’un registre 16 bits non signé ?', a: 'De 0 à 65 535 (2^16 - 1).' },
    { q: 'Comment calcule-t-on le complément à 2 d’un nombre ?', a: 'On inverse tous ses bits (NOT) puis on ajoute 1.' },
    { q: 'À quoi sert l’instruction XOR reg, reg ?', a: 'À réinitialiser le registre à zéro de façon compacte (2 octets) et performante.' },
    { q: 'Quelle instruction de décalage permet de diviser un nombre négatif par 2 ?', a: 'SAR (Shift Arithmetic Right), car elle réplique le bit de signe à gauche.' },
    { q: 'Combien de bits compte un QWORD (Quad Word) en assembleur x86 ?', a: '64 bits (8 octets).' }
  ]
};
