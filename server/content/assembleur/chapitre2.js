/**
 * Chapitre 2 du cours « Assembleur » B2 — Architecture Processeur, Registres & Drapeaux d'état.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Architecture du Processeur, Registres &amp; Drapeaux d’État',
  short: 'CPU, Registres &amp; Drapeaux',
  toc: 'Cycle Fetch-Decode-Execute, hiérarchie des registres généraux x86_64, registres de contrôle (RIP, RSP, RBP) et drapeaux EFLAGS (ZF, CF, SF, OF).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Lorsqu’un programme plante avec une erreur de segmentation ou qu’une boucle conditionnelle tourne à l’infini, ' +
    'un débogueur bas niveau (GDB ou LLDB) fige l’état exact des circuits : ' +
    '<code>RIP=0x00401140 RAX=0x00000000 EFLAGS=[ZF IF]</code>. ' +
    'Comment le processeur sait-il quelle instruction exécuter ensuite ? ' +
    'Pourquoi modifier le registre AL peut-il altérer silencieusement la valeur de RAX ? ' +
    'Et comment l’Unité Arithmétique et Logique (ALU) enregistre-t-elle les retenues et les débordements signés ? ' +
    'Ce module explore l’anatomie interne du CPU et la mécanique des registres.',

  objectives: [
    'décrire avec précision les 4 étapes du cycle machine universel : Fetch, Decode, Execute et Writeback ;',
    'maîtriser la nomenclature et les conventions d’usage des 16 registres généraux x86_64 (RAX à R15) ;',
    'manipuler les sous-registres 32, 16 et 8 bits (EAX, AX, AH, AL) et anticiper les effets de masque ;',
    'expliquer le rôle capital des registres de contrôle : RIP (Instruction Pointer), RSP (Stack Pointer) et RBP (Base Pointer) ;',
    'calculer et justifier l’état des 4 drapeaux fondamentaux du registre EFLAGS : ZF, CF, SF et OF.'
  ],

  sections: [
    {
      title: 'Le modèle de Von Neumann &amp; le cycle machine fondamental',
      html: [
        '<p>Dans l’<strong>architecture de Von Neumann</strong>, les instructions du programme et les données ' +
        'partagent le même espace mémoire et sont acheminées vers le processeur par un bus commun. ' +
        'Le processeur exécute une boucle matérielle infinie cadencée par le signal d’horloge :</p>',

        '<table class="table">',
        '  <thead><tr><th>Étape</th><th>Nom anglais</th><th>Opération matérielle réalisée</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>1. Recherche</strong></td><td>Fetch</td><td>Le processeur lit en mémoire vive (ou cache) l’instruction située à l’adresse pointée par <code>RIP</code>.</td></tr>',
        '    <tr><td><strong>2. Décodage</strong></td><td>Decode</td><td>L’Unité de Contrôle (Control Unit) analyse l’opcode binaire pour déterminer les circuits et registres à activer.</td></tr>',
        '    <tr><td><strong>3. Exécution</strong></td><td>Execute</td><td>L’ALU (Arithmetic Logic Unit) effectue le calcul arithmétique ou logique, ou calcule une adresse mémoire.</td></tr>',
        '    <tr><td><strong>4. Réécriture</strong></td><td>Writeback</td><td>Le résultat final est écrit dans le registre de destination ou envoyé vers la mémoire cache/RAM.</td></tr>',
        '  </tbody>',
        '</table>',

        box('info', 'Le rôle des registres dans la hiérarchie mémoire', [
          '<p>Les <strong>registres</strong> sont des mémoires ultra-rapides intégrées directement au cœur du CPU. ' +
          'Un accès registre prend moins de <strong>1 cycle d’horloge (≈ 0,3 ns)</strong>, contre 3 à 4 cycles pour le cache L1, ' +
          '12 cycles pour le cache L2, 40 cycles pour le cache L3 et plus de <strong>150 à 200 cycles pour la RAM</strong> ! ' +
          'Optimiser en assembleur consiste en priorité à conserver les données de calcul dans les registres.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'La hiérarchie des registres généraux x86_64',
      html: [
        '<p>L’architecture x86_64 propose 16 registres généraux de 64 bits chacun. ' +
        'Par souci de rétrocompatibilité avec les processeurs 8086 (16 bits) et 80386 (32 bits), ' +
        'les 8 registres historiques peuvent être adressés par sous-portions :</p>',

        '<pre><code>// Architecture 64 bits x86_64 : découpage de RAX\n' +
        '63                           31              15       7      0 (bits)\n' +
        '+----------------------------+---------------+--------+------+------+\n' +
        '|                            |               |        |  AH  |  AL  | -> AX (16 bits)\n' +
        '+----------------------------+---------------+--------+------+------+\n' +
        '|                            |               EAX (32 bits)   |\n' +
        '+----------------------------+-------------------------------+\n' +
        '| RAX (64 bits complets)                                     |\n' +
        '+------------------------------------------------------------+</code></pre>',

        box('pitfall', 'La règle du zéro-extension sur les écritures 32 bits (EAX &rarr; RAX)', [
          '<p>Attention à cette spécificité fondamentale de l’architecture x86_64 :</p>' +
          '<ul>' +
          '  <li>Écrire dans un registre 8 bits (<code>AL</code>) ou 16 bits (<code>AX</code>) <strong>laisse intacts les bits supérieurs</strong> de RAX ;</li>' +
          '  <li>Mais écrire dans un registre 32 bits (<code>EAX</code>) <strong>met automatiquement à zéro les 32 bits supérieurs</strong> de RAX (Zero-Extension 64 bits) !</li>' +
          '</ul>' +
          '<p>Exemple : si RAX = <code>0xFFFFFFFFFFFFFFFF</code>, l’instruction <code>MOV EAX, 1</code> transforme RAX en <code>0x0000000000000001</code> !</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Les registres de contrôle &amp; pointeurs (RIP, RSP, RBP)',
      html: [
        '<p>Trois registres jouent un rôle fondamental dans la structure du flux d’exécution et la mémoire d’un processus :</p>',

        '<table class="table">',
        '  <thead><tr><th>Registre</th><th>Nom complet</th><th>Rôle fondamental</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><code>RIP (EIP)</code></td><td>Instruction Pointer</td><td>Contient l’adresse mémoire de la <strong>prochaine instruction à exécuter</strong>. Incrémenté automatiquement après chaque Fetch. Modifié uniquement par les sauts (JMP, Jcc), CALL et RET.</td></tr>',
        '    <tr><td><code>RSP (ESP)</code></td><td>Stack Pointer</td><td>Pointe sur le <strong>sommet actuel de la pile d’exécution</strong>. Décrémenté lors des <code>PUSH</code> et incrémenté lors des <code>POP</code>.</td></tr>',
        '    <tr><td><code>RBP (EBP)</code></td><td>Base / Frame Pointer</td><td>Sert d’<strong>ancre de référence fixe</strong> pour le cadre d’activation d’une fonction, facilitant l’accès aux paramètres reçus et aux variables locales.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Le registre d’état EFLAGS &amp; les drapeaux de condition',
      html: [
        '<p>Le registre <code>EFLAGS / RFLAGS</code> est composé de bits individuels (flags) ' +
        'mis à jour par l’ALU après chaque instruction arithmétique ou logique (ADD, SUB, CMP, AND, TEST) :</p>',

        '<pre><code>// Les 4 drapeaux essentiels pour les branchements conditionnels :\n\n' +
        '1. ZF (Zero Flag) :\n' +
        '   Mis à 1 si le résultat de l’opération vaut 0 (ex. CMP A, B avec A == B &rarr; ZF=1).\n\n' +
        '2. CF (Carry Flag) :\n' +
        '   Mis à 1 s’il y a eu une retenue sortante ou un emprunt lors d’un calcul NON SIGNÉ\n' +
        '   (ex. 255 + 1 sur 8 bits &rarr; CF=1, ou 5 - 10 &rarr; CF=1).\n\n' +
        '3. SF (Sign Flag) :\n' +
        '   Recopie le bit de poids fort (MSB) du résultat. Vaut 1 si le résultat est négatif.\n\n' +
        '4. OF (Overflow Flag) :\n' +
        '   Mis à 1 si un débordement d’entier SIGNÉ s’est produit en complément à 2\n' +
        '   (ex. +100 + +50 = +150 &rarr; dépassement de la plage -128..+127 &rarr; OF=1).\n</code></pre>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Dans quelle phase du cycle machine le processeur analyse-t-il l’opcode binaire pour activer les circuits adaptés ?',
      opts: [
        'Décodage (Decode)',
        'Recherche (Fetch)',
        'Exécution (Execute)',
        'Réécriture (Writeback)'
      ],
      correct: 0,
      exp: 'C’est durant la phase Decode que l’Unité de Contrôle déchiffre l’opcode binaire et prépare les opérandes.'
    },
    {
      stem: 'Quel est le temps d’accès typique aux données stockées dans les registres du processeur ?',
      opts: [
        'Inférieur à 1 cycle d’horloge (< 1 ns)',
        'Environ 100 à 200 cycles d’horloge',
        'Environ 10 millisecondes',
        '1 seconde'
      ],
      correct: 0,
      exp: 'Les registres sont les mémoires les plus rapides de l’ordinateur : ils répondent en une fraction de cycle d’horloge.'
    },
    {
      stem: 'En x86_64, si RAX contient 0xFFFFFFFFFFFFFFFF et qu’on exécute MOV EAX, 1, que devient RAX ?',
      opts: [
        '0x0000000000000001 (les 32 bits supérieurs sont mis à zéro)',
        '0xFFFFFFFF00000001',
        '0xFFFFFFFFFFFFFFFF',
        '0x00000001FFFFFFFF'
      ],
      correct: 0,
      exp: 'En x86_64, toute écriture dans un sous-registre 32 bits effectue une extension par zéro sur les 32 bits de poids fort de RAX.'
    },
    {
      stem: 'Quel registre matériel contient l’adresse mémoire de la prochaine instruction à exécuter ?',
      opts: [
        'RIP (Instruction Pointer)',
        'RSP (Stack Pointer)',
        'RAX (Accumulateur)',
        'RBP (Base Pointer)'
      ],
      correct: 0,
      exp: 'RIP pointe l’instruction courante à charger par le cycle Fetch.'
    },
    {
      stem: 'Quand le drapeau Zero Flag (ZF) passe-t-il à 1 ?',
      opts: [
        'Lorsque le résultat de l’opération arithmétique ou logique est strictement nul (0)',
        'Lorsque le résultat est négatif',
        'Lorsqu’il y a eu une division par zéro',
        'Quand la pile est vide'
      ],
      correct: 0,
      exp: 'ZF = 1 signale que le résultat vaut exactement zéro. C’est le test clé de l’égalité (A - B = 0).'
    },
    {
      stem: 'Quelle est la différence fondamentale entre le Carry Flag (CF) et l’Overflow Flag (OF) ?',
      opts: [
        'CF signale un débordement en calcul non signé, tandis que OF signale un débordement en calcul signé',
        'CF est pour les registres 64 bits, OF pour les registres 32 bits',
        'CF s’applique uniquement à la multiplication, OF à l’addition',
        'Il n’y a aucune différence'
      ],
      correct: 0,
      exp: 'CF (retenue) gère l’arithmétique modulaire non signée, alors que OF (débordement) gère le dépassement en complément à 2 signé.'
    },
    {
      stem: 'Dans une addition 8 bits signée, que vaut le drapeau OF après l’opération 100 + 50 ?',
      opts: [
        'OF = 1 (car 150 dépasse la borne maximale signée +127)',
        'OF = 0',
        'OF = -1',
        'OF est indéfini'
      ],
      correct: 0,
      exp: 'Deux nombres positifs dont la somme théorique (150) dépasse +127 provoquent un débordement signé (OF = 1).'
    },
    {
      stem: 'Quel sous-registre correspond aux 8 bits de poids fort du registre AX ?',
      opts: [
        'AH',
        'AL',
        'EAX',
        'BL'
      ],
      correct: 0,
      exp: 'AX est composé de AH (High, bits 15..8) et de AL (Low, bits 7..0).'
    }
  ],

  pitfalls: [
    'Oublier que les écritures 32 bits (EAX) effacent silencieusement la moitié haute 64 bits (RAX) en mode x86_64.',
    'Confondre le pointeur d’instruction RIP (qui pointe la prochaine instruction) et le pointeur de pile RSP.',
    'Confondre CF (débordement non signé) et OF (débordement signé) lors de l’analyse d’un saut conditionnel.',
    'Modifier manuellement le registre RIP avec une instruction MOV : RIP n’est modifiable que par JMP, CALL et RET.',
    'Considérer que l’instruction CMP modifie les registres opérandes : elle ne fait que mettre à jour les drapeaux EFLAGS.'
  ],

  methodTitle: 'Protocole en 4 étapes pour analyser les drapeaux après une instruction ALU',
  method: [
    'Calculer le résultat mathématique exact sans troncature (ex. $A + B$ ou $A - B$).',
    'Déterminer le résultat tronqué à la taille du registre (8, 16, 32 ou 64 bits). Si le résultat est 0, poser ZF = 1.',
    'Tester le débordement non signé : si le résultat mathématique déborde de $[0 \\ .. \\ 2^n - 1]$ ou $A < B$ en soustraction, poser CF = 1.',
    'Tester le débordement signé : si le calcul en complément à 2 sort de $[-2^{n-1} \\ .. \\ 2^{n-1} - 1]$, poser OF = 1. Si le bit MSB est 1, poser SF = 1.'
  ],

  summary: [
    'Le cycle machine exécute en boucle : Fetch (chargement via RIP), Decode, Execute (ALU) et Writeback.',
    'Les registres généraux x86_64 sont au nombre de 16 (RAX..R15) et offrent les sous-registres EAX, AX, AH et AL.',
    'En x86_64, écrire dans un registre 32 bits (EAX) force les 32 bits supérieurs de RAX à zéro.',
    'RIP pointe la prochaine instruction, RSP pointe le sommet de pile et RBP ancre le cadre d’activation.',
    'EFLAGS contient les indicateurs d’état : ZF (nul), CF (retenue non signée), SF (signe négatif) et OF (débordement signé).'
  ],

  checklist: [
    'Je sais nommer les 4 phases du cycle processeur universel.',
    'Je sais décomposer un registre 64 bits RAX en ses portions EAX, AX, AH et AL.',
    'Je connais la règle du zéro-extension 32 bits en x86_64.',
    'Je comprends le rôle de RIP et RSP dans l’exécution d’un programme.',
    'Je sais prédire l’état exact de ZF, CF, SF et OF après une opération arithmétique.'
  ],

  notions: [
    'Cycle Fetch-Decode-Execute',
    'Unité Arithmétique & Logique (ALU)',
    'Registre 64 bits (RAX..R15)',
    'Sous-registres (EAX, AX, AH, AL)',
    'Zéro-extension 32 bits',
    'Pointeur d’instruction (RIP)',
    'Pointeur de pile (RSP)',
    'Pointeur de base (RBP)',
    'Drapeaux EFLAGS (ZF, CF, SF, OF)',
    'Hiérarchie mémoire (Registres, Cache, RAM)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les phases du cycle machine et le découpage hiérarchique des registres.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi à prédire l’état des drapeaux ZF, CF, SF et OF.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises le fonctionnement du CPU et la mécanique des registres.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux architectures Harvard vs Von Neumann et aux mémoires au chapitre 3.' }
  ],

  flashcards: [
    { q: 'Quelles sont les 4 étapes du cycle machine ?', a: 'Fetch (Recherche), Decode (Décodage), Execute (Exécution) et Writeback (Réécriture).' },
    { q: 'Que contient le registre RIP ?', a: 'L’adresse mémoire de la prochaine instruction à exécuter par le processeur.' },
    { q: 'Qu’arrive-t-il aux 32 bits supérieurs de RAX lors d’un MOV EAX, 42 ?', a: 'Ils sont automatiquement mis à zéro (zéro-extension 64 bits de l’architecture x86_64).' },
    { q: 'Quand le drapeau CF (Carry Flag) est-il activé ?', a: 'Lors d’un dépassement de capacité ou d’un emprunt en arithmétique non signée.' },
    { q: 'Quand le drapeau OF (Overflow Flag) est-il activé ?', a: 'Lors d’un dépassement de capacité dans un calcul sur des entiers signés en complément à 2.' },
    { q: 'Quelle est la différence entre RSP et RBP ?', a: 'RSP pointe le sommet mobile de la pile, tandis que RBP sert de base fixe pour le cadre de la fonction courante.' }
  ]
};
