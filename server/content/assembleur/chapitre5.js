/**
 * Chapitre 5 du cours « Assembleur » B2 — Jeu d'Instructions x86/AVR, Transferts & Modes d'Adressage.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Jeu d’Instructions x86/AVR, Transferts &amp; Modes d’Adressage',
  short: 'Instructions &amp; Adressage',
  toc: 'Règle d’or x86, instruction MOV, calcul d’adresse LEA, arithmétique (ADD, SUB, INC, DEC, NEG, IMUL, IDIV), modes d’adressage indexés et équivalents AVR.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un étudiant tente d’écrire l’instruction <code>MOV [ebx], [eax]</code> pour copier le contenu d’une variable ' +
    'dans une autre et se heurte à une erreur de compilation immédiate : <i>invalid combination of opcode and operands</i>. ' +
    'Pourquoi l’architecture x86 interdit-elle formellement tout transfert direct de mémoire à mémoire ? ' +
    'Pourquoi l’instruction <code>MOV eax, [ebx + ecx*4]</code> déclenche-t-elle un accès au bus RAM ' +
    'alors que <code>LEA eax, [ebx + ecx*4]</code> ne touche jamais à la mémoire et sert de calculatrice ultra-rapide ? ' +
    'Ce module détaille la grammaire des instructions et la puissance des modes d’adressage.',

  objectives: [
    'appliquer la règle d’or des processeurs CISC : au maximum un seul opérande mémoire par instruction ;',
    'maîtriser l’ensemble des modes d’adressage x86 : immédiat, registre, direct, indirect et indexé avec facteur d’échelle ;',
    'distinguer rigoureusement le chargement de données (<code>MOV</code>) du calcul d’adresse arithmétique (<code>LEA</code>) ;',
    'utiliser les instructions arithmétiques et logiques fondamentales (ADD, SUB, INC, DEC, NEG, IMUL, IDIV) ;',
    'établir la correspondance avec les instructions AVR équivalentes (LDI, LDS, STS, IN, OUT).'
  ],

  sections: [
    {
      title: 'La règle d’or x86 &amp; l’instruction de transfert MOV',
      html: [
        '<p>L’instruction <code>MOV destination, source</code> est l’instruction la plus fréquente d’un programme. ' +
        'Elle transfère une donnée de la source vers la destination (sans altérer la source ni modifier les drapeaux EFLAGS).</p>',

        box('pitfall', 'La règle matérielle absolue : jamais deux accès mémoire simultanés', [
          '<p>Le bus d’adresses et le bus de données d’un processeur ne peuvent pas effectuer deux transferts RAM ' +
          'dans le même cycle d’horloge élémentaire. Par conséquent :</p>' +
          '<pre><code>MOV [varA], [varB]   ; ERREUR CRITIQUE : interdit par le matériel x86 !\n\n' +
          '// Pour copier d’une case mémoire vers une autre, il FAUT transiter par un registre :\n' +
          'MOV EAX, [varB]      ; 1. Charger la donnée depuis la RAM vers le registre EAX\n' +
          'MOV [varA], EAX      ; 2. Écrire le registre EAX vers la destination en RAM</code></pre>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Les 5 modes d’adressage x86 (de l’immédiat à l’indexé)',
      html: [
        '<p>L’adresse d’un opérande peut être spécifiée de cinq manières différentes en assembleur Intel :</p>',

        '<table class="table">',
        '  <thead><tr><th>Mode d’adressage</th><th>Syntaxe Intel x86</th><th>Description technique</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>1. Immédiat</strong></td><td><code>MOV EAX, 42</code></td><td>La valeur constante fait partie intégrante de l’opcode de l’instruction.</td></tr>',
        '    <tr><td><strong>2. Registre</strong></td><td><code>MOV EAX, EBX</code></td><td>La donnée réside dans un registre du processeur (aucun accès bus).</td></tr>',
        '    <tr><td><strong>3. Direct</strong></td><td><code>MOV EAX, [0x00403000]</code></td><td>L’adresse mémoire est une constante numérique fixe entre crochets.</td></tr>',
        '    <tr><td><strong>4. Indirect simple</strong></td><td><code>MOV EAX, [EBX]</code></td><td>Le registre EBX contient un <strong>pointeur</strong> vers la case mémoire à lire.</td></tr>',
        '    <tr><td><strong>5. Base + Index &times; Échelle + Déplacement</strong></td><td><code>MOV EAX, [EBX + ECX*4 + 16]</code></td><td>Le mode le plus puissant : permet d’accéder à l’élément $i$ d’un tableau de structures en une seule instruction !</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'L’instruction LEA : le couteau suisse du calcul d’adresses',
      html: [
        '<p>L’instruction <code>LEA (Load Effective Address)</code> utilise les circuits d’adressage matériel ' +
        'pour effectuer une opération arithmétique sans jamais toucher à la mémoire vive :</p>',

        '<pre><code>// Différence fondamentale entre MOV et LEA :\n' +
        'MOV EAX, [EBX + ECX*4]   ; Va en RAM à l’adresse (EBX + ECX*4) et charge la VALEUR stockée\n' +
        'LEA EAX, [EBX + ECX*4]   ; Calcule l’ADRESSE (EBX + ECX*4) et la met dans EAX (aucun accès RAM !)</code></pre>',

        box('tip', 'L’astuce d’optimisation des compilateurs avec LEA', [
          '<p>Comme les circuits de LEA réalisent une multiplication par 1, 2, 4 ou 8 suivie de deux additions ' +
          'en <strong>un seul cycle d’horloge</strong> et <strong>sans modifier les drapeaux EFLAGS</strong>, ' +
          'les compilateurs l’utilisent pour faire des mathématiques pures :</p>' +
          '<pre><code>LEA EAX, [EAX + EAX*2]   ; Multiplie EAX par 3 en 1 cycle ! (EAX + 2*EAX = 3*EAX)\n' +
          'LEA EAX, [EAX*8 + EAX]   ; Multiplie EAX par 9 en 1 cycle ! (8*EAX + EAX = 9*EAX)</code></pre>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Arithmétique x86 &amp; équivalents microcontrôleur AVR',
      html: [
        '<p>Sur microcontrôleur AVR (ATmega328P, RISC 8 bits), les instructions de transfert sont plus spécialisées :</p>',

        '<table class="table">',
        '  <thead><tr><th>Instruction AVR</th><th>Mnémonique complet</th><th>Usage matériel</th><th>Équivalent conceptuel x86</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><code>LDI Rd, K</code></td><td>Load Immediate</td><td>Charge une constante dans R16..R31</td><td><code>MOV reg, imm</code></td></tr>',
        '    <tr><td><code>LDS Rd, k</code></td><td>Load Direct from SRAM</td><td>Lit une case de mémoire SRAM</td><td><code>MOV reg, [mem]</code></td></tr>',
        '    <tr><td><code>STS k, Rr</code></td><td>Store Direct to SRAM</td><td>Écrit un registre en mémoire SRAM</td><td><code>MOV [mem], reg</code></td></tr>',
        '    <tr><td><code>IN Rd, A</code></td><td>Input from I/O Location</td><td>Lit un port d’E/S matériel (ex. PINB)</td><td><code>IN al, dx</code></td></tr>',
        '    <tr><td><code>OUT A, Rr</code></td><td>Output to I/O Location</td><td>Écrit sur un port matériel (ex. PORTB)</td><td><code>OUT dx, al</code></td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Pourquoi l’instruction assembleur MOV [eax], [ebx] est-elle rejetée par l’assembleur x86 ?',
      opts: [
        'Parce que le processeur x86 ne permet pas de lire et d’écrire simultanément en mémoire dans une seule instruction',
        'Parce que les registres EAX et EBX sont réservés aux calculs flottants',
        'Parce que les crochets sont interdits en syntaxe Intel',
        'Parce que l’instruction MOV ne supporte que les constantes'
      ],
      correct: 0,
      exp: 'En architecture x86, une instruction peut avoir au plus un seul opérande en mémoire vive.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre MOV EAX, [EBX+4] et LEA EAX, [EBX+4] ?',
      opts: [
        'MOV lit la valeur stockée en mémoire vive, tandis que LEA charge l’adresse arithmétique sans accéder à la RAM',
        'MOV est plus rapide que LEA',
        'LEA modifie les drapeaux EFLAGS et pas MOV',
        'MOV est une instruction 64 bits et LEA une instruction 16 bits'
      ],
      correct: 0,
      exp: 'LEA (Load Effective Address) calcule l’expression d’adresse et l’écrit dans le registre sans générer de cycle de bus mémoire.'
    },
    {
      stem: 'Quel calcul mathématique l’instruction LEA EAX, [EAX + EAX*2] effectue-t-elle en réalité sur EAX ?',
      opts: [
        'Multiplication par 3 (EAX = 3 * EAX)',
        'Multiplication par 2',
        'Élévation au carré (EAX = EAX²)',
        'Division par 2'
      ],
      correct: 0,
      exp: 'EAX + (EAX * 2) = 1*EAX + 2*EAX = 3*EAX, réalisé en un seul cycle d’horloge sans altérer les drapeaux.'
    },
    {
      stem: 'Quelles sont les valeurs autorisées pour le facteur d’échelle (scale) dans l’adressage x86 [Base + Index * Scale] ?',
      opts: [
        '1, 2, 4 ou 8 uniquement',
        'N’importe quel nombre entier de 1 à 255',
        'Uniquement les nombres impairs',
        'Toutes les puissances de 10'
      ],
      correct: 0,
      exp: 'Le facteur d’échelle est codé sur 2 bits dans l’octet SIB : seules les valeurs 1 (octet), 2 (word), 4 (dword) et 8 (qword) sont possibles.'
    },
    {
      stem: 'Sur microcontrôleur AVR, quelle instruction permet de charger une constante immédiate dans le registre R16 ?',
      opts: [
        'LDI R16, 42',
        'LDS R16, 42',
        'STS 42, R16',
        'MOV R16, 42'
      ],
      correct: 0,
      exp: 'LDI (Load Immediate) charge une valeur constante dans les registres hauts R16 à R31.'
    },
    {
      stem: 'Que fait l’instruction NEG EAX ?',
      opts: [
        'Elle remplace le contenu de EAX par son opposé arithmétique en complément à 2 (EAX = -EAX)',
        'Elle force le bit de signe à 1',
        'Elle annule tous les bits négatifs',
        'Elle teste si EAX est inférieur à zéro'
      ],
      correct: 0,
      exp: 'NEG calcule 0 - EAX, inversant le signe du nombre en complément à 2.'
    },
    {
      stem: 'Quelle instruction AVR permet d’envoyer une valeur sur le port de sortie matériel PORTB ?',
      opts: [
        'OUT PORTB, R16',
        'IN R16, PORTB',
        'LDS PORTB, R16',
        'PUSH PORTB'
      ],
      correct: 0,
      exp: 'OUT écrit la valeur d’un registre général vers un registre d’E/S périphérique.'
    },
    {
      stem: 'Si EBX = 0x00401000 et ECX = 5, quelle adresse est calculée par LEA EAX, [EBX + ECX*4 + 0x10] ?',
      opts: [
        '0x00401024',
        '0x00401020',
        '0x00401036',
        '0x00401015'
      ],
      correct: 0,
      exp: '0x00401000 + 5*4 (20 = 0x14) + 0x10 (16) = 0x00401000 + 0x24 = 0x00401024.'
    }
  ],

  pitfalls: [
    'Tenter d’effectuer un transfert direct mémoire-mémoire MOV [dst], [src] sans registre intermédiaire.',
    'Confondre MOV (qui lit la case RAM pointée) et LEA (qui charge l’adresse arithmétique sans lire la RAM).',
    'Utiliser un facteur d’échelle arbitraire comme 3 ou 5 dans un adressage x86 (seuls 1, 2, 4 et 8 sont câblés).',
    'Oublier que les instructions arithmétiques modifient les drapeaux EFLAGS alors que MOV et LEA les préservent.',
    'Utiliser l’instruction AVR LDI sur les registres R0 à R15 : LDI n’accepte que les registres hauts R16 à R31.'
  ],

  methodTitle: 'Protocole en 4 étapes pour traduire une affectation C complexe en x86',
  method: [
    'Décomposer l’opération de haut niveau : isoler la lecture des opérandes sources, le calcul, et l’écriture finale.',
    'Vérifier la règle des opérandes : s’assurer qu’au moins l’un des deux opérandes de chaque instruction est un registre.',
    'Exploiter l’instruction LEA chaque fois qu’un calcul combine une multiplication par 1, 2, 4 ou 8 avec une addition.',
    'Conserver les valeurs temporaires dans les registres non volatils (EBX, ESI, EDI) pour limiter les allers-retours vers la RAM.'
  ],

  summary: [
    'En x86, une instruction ne peut contenir qu’un seul opérande en mémoire vive : le transfert mémoire-mémoire passe par un registre.',
    'Les 5 modes d’adressage couvrent de la constante immédiate jusqu’à l’adressage complet [Base + Index * Scale + Déplacement].',
    'LEA calcule l’adresse sans toucher à la mémoire et sans modifier les drapeaux EFLAGS : arme d’optimisation majeure.',
    'Les instructions arithmétiques (ADD, SUB, INC, DEC, NEG) mettent à jour les indicateurs d’état ZF, CF, SF et OF.',
    'L’AVR distingue LDI (immédiat), LDS/STS (SRAM de données) et IN/OUT (espace des registres d’E/S périphériques).'
  ],

  checklist: [
    'Je ne tente jamais d’écrire une instruction MOV mémoire-mémoire directe.',
    'Je maîtrise la formule complète du mode d’adressage SIB (Base + Index * Scale + Disp).',
    'Je sais expliquer avec précision quand utiliser MOV et quand utiliser LEA.',
    'Je connais les facteurs d’échelle valides en x86 (1, 2, 4, 8).',
    'Je comprends le rôle des instructions spécialisées AVR (LDI, LDS, STS, IN, OUT).'
  ],

  notions: [
    'Règle d’opérande mémoire x86',
    'Instruction MOV',
    'Instruction LEA (Load Effective Address)',
    'Modes d’adressage x86',
    'Octet SIB (Scale-Index-Base)',
    'Facteur d’échelle (1, 2, 4, 8)',
    'Instructions arithmétiques (ADD, SUB, NEG)',
    'Incrémentation / Décrémentation (INC, DEC)',
    'Instruction AVR LDI (R16..R31)',
    'E/S matérielles AVR (IN / OUT)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois la règle d’or des opérandes mémoire et la syntaxe des modes d’adressage.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur la distinction entre MOV et LEA et les facteurs d’échelle SIB.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises le jeu d’instructions x86 et les modes d’adressage matériels.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux branchements, à la pile et aux fonctions au chapitre 6.' }
  ],

  flashcards: [
    { q: 'Pourquoi MOV [eax], [ebx] est-il interdit en x86 ?', a: 'Parce que l’architecture matérielle interdit d’avoir deux opérandes mémoire dans une même instruction.' },
    { q: 'Que fait l’instruction LEA EAX, [EBX + 8] ?', a: 'Elle calcule la valeur EBX + 8 et l’écrit dans EAX sans jamais lire la case mémoire à cette adresse.' },
    { q: 'Quels facteurs d’échelle sont autorisés dans [Base + Index * Scale] ?', a: 'Uniquement 1, 2, 4 ou 8 octets.' },
    { q: 'Quelle est la différence d’impact sur les drapeaux entre ADD et LEA ?', a: 'ADD met à jour ZF, CF, SF et OF, tandis que LEA ne modifie aucun drapeau.' },
    { q: 'Sur AVR, pourquoi l’instruction LDI R5, 10 provoque-t-elle une erreur ?', a: 'Parce que LDI n’accepte que les registres hauts R16 à R31.' },
    { q: 'Que fait l’instruction OUT PORTB, R16 sur microcontrôleur AVR ?', a: 'Elle écrit les 8 bits du registre R16 vers les broches du port matériel B.' }
  ]
};
