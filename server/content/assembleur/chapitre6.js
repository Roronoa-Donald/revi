/**
 * Chapitre 6 du cours « Assembleur » B2 — Branchements, Pile d’Exécution, Fonctions & Appels Système.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Branchements, Pile d’Exécution, Fonctions &amp; Appels Système',
  short: 'Pile, Fonctions &amp; Syscalls',
  toc: 'Drapeaux et sauts conditionnels (Jcc), fonctionnement de la pile (PUSH/POP), conventions d’appel (cdecl et System V AMD64 ABI), cadre de pile et appels système (syscall / int 0x80).',
  time: '≈ 3 h 00 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Lors d’une analyse de binaire avec un désassembleur, vous observez la séquence rituelle ' +
    '<code>push ebp ; mov ebp, esp ; sub esp, 16</code> au tout début d’une fonction, et <code>leave ; ret</code> à la fin. ' +
    'Pourquoi la pile x86 grandit-elle vers les adresses basses ? Pourquoi le premier argument d’une fonction ' +
    'en 32 bits se trouve-t-il à <code>[ebp + 8]</code> et non à <code>[ebp + 0]</code> ? ' +
    'Comment le processeur fait-il le saut vers le noyau Linux pour afficher une chaîne de caractères via <code>syscall</code> ? ' +
    'Ce module explore l’anatomie de l’exécution, le contrôle de flux et les interfaces système.',

  objectives: [
    'maîtriser les sauts conditionnels et la distinction fondamentale entre comparaisons signées (JG, JL) et non-signées (JA, JB) ;',
    'comprendre la structure et le mécanisme LIFO de la pile matérielle x86 (décrémentation de ESP/RSP) ;',
    'construire et démonter un cadre de pile (Stack Frame) avec prologue et épilogue conformes aux conventions d’appel ;',
    'comparer la convention 32 bits cdecl et la convention 64 bits System V AMD64 ABI ;',
    'effectuer des appels système (syscalls) sous Linux en 32 bits (int 0x80) et en 64 bits (instruction syscall).'
  ],

  sections: [
    {
      title: 'Contrôle de flux : CMP et sauts conditionnels (Jcc)',
      html: [
        '<p>L’instruction <code>CMP opérande1, opérande2</code> effectue une soustraction interne ' +
        '<code>opérande1 - opérande2</code> sans modifier la valeur de destination, mais en actualisant ' +
        'rigoureusement les indicateurs du registre d’état (EFLAGS : ZF, SF, CF, OF).</p>',

        '<p>Selon les drapeaux levés, une instruction de saut conditionnel décide ou non de modifier le pointeur d’instruction (EIP/RIP) :</p>',

        '<table class="table">',
        '  <thead><tr><th>Instruction</th><th>Condition logique</th><th>Drapeaux testés</th><th>Usage type</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><code>JMP etiquette</code></td><td>Inconditionnel</td><td>Aucun</td><td>Boucle infinie, sortie de bloc.</td></tr>',
        '    <tr><td><code>JE / JZ</code></td><td>Égal / Zéro</td><td>ZF = 1</td><td>Test d’égalité (signé ou non).</td></tr>',
        '    <tr><td><code>JNE / JNZ</code></td><td>Différent / Non nul</td><td>ZF = 0</td><td>Test d’inégalité.</td></tr>',
        '    <tr><td><code>JA / JAE</code></td><td>Au-dessus / Sup. ou égal (non-signé)</td><td>CF = 0 (et ZF = 0 pour JA)</td><td>Comparaison d’entiers non-signés (unsigned).</td></tr>',
        '    <tr><td><code>JB / JBE</code></td><td>En-dessous / Inf. ou égal (non-signé)</td><td>CF = 1 (ou ZF = 1)</td><td>Comparaison d’entiers non-signés.</td></tr>',
        '    <tr><td><code>JG / JGE</code></td><td>Plus grand / Sup. ou égal (signé)</td><td>ZF = 0 et SF = OF</td><td>Comparaison d’entiers signés (signed int).</td></tr>',
        '    <tr><td><code>JL / JLE</code></td><td>Plus petit / Inf. ou égal (signé)</td><td>SF &ne; OF (ou ZF = 1)</td><td>Comparaison d’entiers signés.</td></tr>',
        '  </tbody>',
        '</table>',

        box('warning', 'Piège critique : confusion entre comparaison signée et non-signée', [
          '<p>Utiliser <code>JA</code> (Jump if Above) au lieu de <code>JG</code> (Jump if Greater) ' +
          'lorsqu’on compare des entiers signés produit des failles logiques majeures. Par exemple, si EAX vaut <code>-1</code> ' +
          '(0xFFFFFFFF en hexadécimal) et EBX vaut <code>5</code> :</p>',
          '<ul>',
          '  <li><code>CMP EAX, EBX</code> puis <code>JG</code> : ne saute pas, car -1 &lt; 5 (analyse signée correcte).</li>',
          '  <li><code>CMP EAX, EBX</code> puis <code>JA</code> : SAUTE, car 0xFFFFFFFF (4 294 967 295) &gt; 5 (analyse non-signée) !</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'La pile d’exécution (Stack) et les instructions PUSH / POP',
      html: [
        '<p>La pile est une zone de mémoire vive organisée en structure LIFO (<i>Last In, First Out</i>). ' +
        'Sur l’architecture x86/x86_64, la pile <strong>croît vers les adresses basses</strong>.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Instruction PUSH opérande</h4>',
        '    <ol>',
        '      <li>Décrémente le pointeur de pile : <code>ESP &larr; ESP - 4</code> (ou <code>RSP &larr; RSP - 8</code> en 64 bits).</li>',
        '      <li>Écrit la valeur de l’opérande à la nouvelle adresse pointée : <code>[ESP] &larr; valeur</code>.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Instruction POP destination</h4>',
        '    <ol>',
        '      <li>Lit la valeur située au sommet de pile : <code>destination &larr; [ESP]</code>.</li>',
        '      <li>Incrémente le pointeur de pile : <code>ESP &larr; ESP + 4</code> (ou <code>RSP &larr; RSP + 8</code> en 64 bits).</li>',
        '    </ol>',
        '  </div>',
        '</div>',

        box('info', 'L’instruction CALL et la sauvegarde de l’adresse de retour', [
          '<p>Lorsque le processeur rencontre <code>CALL ma_fonction</code>, il effectue automatiquement deux actions atomiques :</p>',
          '<ol>',
          '  <li>Empilement de l’adresse de retour : <code>PUSH EIP_suivant</code> (l’adresse de l’instruction qui suit immédiatement le CALL).</li>',
          '  <li>Saut à la fonction : <code>EIP &larr; adresse_de(ma_fonction)</code>.</li>',
          '</ol>',
          '<p>À la fin de la fonction, l’instruction <code>RET</code> dépile l’adresse de retour : <code>POP EIP</code>, reprenant l’exécution chez l’appelant.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Conventions d’appel : cdecl (32 bits) vs System V AMD64 ABI (64 bits)',
      html: [
        '<p>Pour que des fonctions écrites par différents compilateurs ou assembleurs puissent communiquer ' +
        'sans corrompre l’état de la machine, une convention d’appel (<i>calling convention</i>) formalise le passage des paramètres, ' +
        'la récupération du résultat et la préservation des registres.</p>',

        '<table class="table">',
        '  <thead><tr><th>Caractéristique</th><th>cdecl (x86 32 bits)</th><th>System V AMD64 ABI (Linux x86_64)</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Passage des arguments</strong></td><td>Sur la pile, de droite à gauche (PUSH argN .. PUSH arg1).</td><td>Dans 6 registres : <code>RDI, RSI, RDX, RCX, R8, R9</code>, puis le reste sur la pile.</td></tr>',
        '    <tr><td><strong>Valeur de retour</strong></td><td>Dans <code>EAX</code> (entiers/pointeurs) ou <code>EDX:EAX</code> (64 bits).</td><td>Dans <code>RAX</code> (entiers/pointeurs) ou <code>RDX:RAX</code> (128 bits).</td></tr>',
        '    <tr><td><strong>Nettoyage de la pile</strong></td><td>Par l’appelant (<i>caller clean-up</i>) via <code>ADD ESP, N</code>.</td><td>Par l’appelant pour les arguments débordant sur la pile.</td></tr>',
        '    <tr><td><strong>Alignement de pile</strong></td><td>Historiquement 4 octets (16 octets sous Linux moderne).</td><td>Strictement alignée sur 16 octets avant tout <code>CALL</code>.</td></tr>',
        '    <tr><td><strong>Registres préservés (callee-saved)</strong></td><td><code>EBX, ESI, EDI, EBP, ESP</code>.</td><td><code>RBX, RSP, RBP, R12, R13, R14, R15</code>.</td></tr>',
        '    <tr><td><strong>Registres modifiables (caller-saved)</strong></td><td><code>EAX, ECX, EDX</code>.</td><td><code>RAX, RCX, RDX, RSI, RDI, R8, R9, R10, R11</code>.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Anatomie du cadre de pile (Stack Frame)',
      html: [
        '<p>Le cadre de pile regroupe l’environnement complet d’une instance de fonction : adresse de retour, ' +
        'ancien pointeur de base, arguments reçus et variables locales.</p>',

        '<pre><code>; --- PROLOGUE STANDARD D’UNE FONCTION (x86 32 bits) ---' + '\n' +
        'push ebp              ; Sauvegarde l’ancien base pointer de l’appelant' + '\n' +
        'mov  ebp, esp         ; Établit le nouveau point de repère fixe' + '\n' +
        'sub  esp, 8           ; Réserve 8 octets pour 2 variables locales (2 * 4 octets)' + '\n\n' +
        '; --- CORPS DE LA FONCTION ---' + '\n' +
        '; [ebp + 0]  &rarr; Ancien EBP sauvegardé' + '\n' +
        '; [ebp + 4]  &rarr; Adresse de retour (empilée par CALL)' + '\n' +
        '; [ebp + 8]  &rarr; 1er argument passé à la fonction' + '\n' +
        '; [ebp + 12] &rarr; 2e argument passé à la fonction' + '\n' +
        '; [ebp - 4]  &rarr; 1re variable locale' + '\n' +
        '; [ebp - 8]  &rarr; 2e variable locale' + '\n\n' +
        '; --- ÉPILOGUE STANDARD ---' + '\n' +
        'mov  esp, ebp         ; Libère toutes les variables locales' + '\n' +
        'pop  ebp              ; Restaure l’ancien base pointer' + '\n' +
        '; (Note : l’instruction LEAVE résume exactement ces deux lignes)' + '\n' +
        'ret                   ; Dépile l’adresse de retour et saute chez l’appelant</code></pre>'
      ].join('\n')
    },
    {
      title: 'Appels système sous Linux (Syscalls) : 32 bits vs 64 bits',
      html: [
        '<p>Un programme utilisateur en espace non-privilégié (Ring 3) ne peut pas écrire directement sur la console ' +
        'ou manipuler le disque dur. Il doit solliciter le noyau Linux (Ring 0) au moyen d’un appel système.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Linux x86 (32 bits) : interruption logicielle int 0x80</h4>',
        '    <p>Numéro de syscall dans <code>EAX</code> :</p>',
        '    <ul>',
        '      <li>1 = <code>sys_exit</code> (EBX = code de retour)</li>',
        '      <li>4 = <code>sys_write</code> (EBX = fd, ECX = buffer, EDX = taille)</li>',
        '    </ul>',
        '    <pre><code>mov eax, 4      ; sys_write\nmov ebx, 1      ; stdout\nmov ecx, msg    ; pointeur message\nmov edx, 13     ; longueur\nint 0x80</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Linux x86_64 (64 bits) : instruction native SYSCALL</h4>',
        '    <p>Numéro de syscall dans <code>RAX</code> :</p>',
        '    <ul>',
        '      <li>1 = <code>sys_write</code> (RDI = fd, RSI = buffer, RDX = taille)</li>',
        '      <li>60 = <code>sys_exit</code> (RDI = code de retour)</li>',
        '    </ul>',
        '    <pre><code>mov rax, 1      ; sys_write\nmov rdi, 1      ; stdout\nmov rsi, msg    ; pointeur message\nmov rdx, 13     ; longueur\nsyscall</code></pre>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Dans la convention 32 bits cdecl, à quel offset par rapport à EBP se situe le tout premier argument de la fonction ?',
      opts: [
        '[ebp + 0]',
        '[ebp + 4]',
        '[ebp + 8]',
        '[ebp - 4]'
      ],
      correct: 2,
      exp:
        'À [ebp + 0] se trouve l’ancien EBP sauvegardé par le prologue. À [ebp + 4] se trouve l’adresse de retour ' +
        'empilée par le CALL. Le premier argument se situe donc immédiatement au-dessus, à [ebp + 8].'
    },
    {
      stem: 'Pourquoi l’instruction PUSH décrémente-t-elle le registre ESP au lieu de l’incrémenter ?',
      opts: [
        'Parce que sur l’architecture x86, la pile croît vers les adresses mémoire décroissantes (basses).',
        'Parce que le registre ESP contient la taille totale allouée et non une adresse.',
        'Parce que les microprocesseurs CISC travaillent exclusivement en nombres négatifs.',
        'Pour éviter les conflits d’alignement avec le registre de base EBP.'
      ],
      correct: 0,
      exp:
        'Sur x86, le sommet de la pile est placé en haut de la mémoire virtuelle et grandit en descendant vers les adresses basses. ' +
        'Chaque empilement (PUSH) décrémente donc le pointeur ESP.'
    },
    {
      stem: 'En assembleur 64 bits sous Linux (System V ABI), dans quel registre est transmis le premier argument entier d’une fonction ?',
      opts: [
        'RAX',
        'RDI',
        'RSI',
        'Sur le sommet de la pile [RSP]'
      ],
      correct: 1,
      exp:
        'La convention System V AMD64 ABI utilise dans l’ordre les registres RDI, RSI, RDX, RCX, R8 et R9 pour passer ' +
        'les six premiers arguments entiers ou pointeurs.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre les instructions de saut JL et JB ?',
      opts: [
        'JL traite des entiers signés (SF &ne; OF) tandis que JB traite des entiers non-signés (CF = 1).',
        'JL saute vers une adresse relative courte alors que JB permet un saut vers un segment distant.',
        'JB fonctionne uniquement sur microcontrôleur AVR alors que JL est propre à l’Intel x86.',
        'Il n’y a aucune différence, ce sont deux alias stricts du même opcode binaire.'
      ],
      correct: 0,
      exp:
        'JL (Jump if Less) teste les drapeaux de dépassement signé (SF &ne; OF), tandis que JB (Jump if Below) ' +
        'teste le drapeau de retenue CF (dépassement non-signé).'
    }
  ],

  pitfalls: [
    'Confondre JG/JL (comparaison signée) et JA/JB (comparaison non-signée) après une instruction CMP.',
    'Oublier de libérer les variables locales de la pile avant d’exécuter RET, ce qui fait sauter le processeur vers une adresse erronée.',
    'Penser que le premier argument en cdecl est à [ebp + 4] en oubliant les 4 octets de l’adresse de retour.',
    'Modifier les registres réservés (EBX, ESI, EDI, EBP) sans les sauvegarder au préalable avec PUSH.',
    'Utiliser l’interruption int 0x80 dans un binaire x86_64 pur au lieu de l’instruction native syscall.'
  ],

  methodTitle: 'Protocole en 4 étapes pour implémenter une fonction robuste en assembleur',
  method: [
    'Concevoir le prologue : sauvegarder EBP/RBP, initialiser la nouvelle base et allouer l’espace des variables locales.',
    'Identifier les registres callee-saved : sauvegarder sur la pile tous les registres non-volatils utilisés dans le corps.',
    'Calculer rigoureusement les offsets : utiliser [EBP + 8 + 4*i] pour les arguments et [EBP - 4 - 4*i] pour les locales.',
    'Soigner l’épilogue : placer la valeur de retour dans EAX/RAX, restaurer les registres callee-saved, exécuter LEAVE (ou MOV ESP, EBP; POP EBP) et conclure par RET.'
  ],

  summary: [
    'Les sauts conditionnels reposent sur CMP : JL/JG pour les nombres signés, JB/JA pour les grandeurs non-signées.',
    'La pile x86 croît vers le bas : PUSH décrémente ESP puis écrit, POP lit puis incrémente ESP.',
    'CALL empile l’adresse de retour (EIP) et saute ; RET dépile cette adresse dans le pointeur d’instruction.',
    'En cdecl 32 bits, arguments sur la pile ([ebp+8], [ebp+12]), retour dans EAX et nettoyage par l’appelant.',
    'En Linux x86_64, les 6 premiers arguments passent par registres (RDI, RSI, RDX, RCX, R8, R9) et les syscalls s’exécutent via l’instruction SYSCALL.'
  ],

  checklist: [
    'Je choisis toujours le saut conditionnel approprié selon le type signé ou non-signé de mes données.',
    'Je comprends parfaitement le mouvement d’ESP lors d’un PUSH (décrémentation) et d’un POP (incrémentation).',
    'Je sais dessiner la disposition exacte d’un cadre de pile (ancien EBP, adresse de retour, arguments, variables locales).',
    'Je connais par cœur les registres d’arguments de l’ABI 64 bits System V (RDI, RSI, RDX, RCX, R8, R9).',
    'Je sais exécuter un appel système Linux avec le numéro d’action dans RAX/EAX.'
  ],

  notions: [
    'Instruction CMP et registre EFLAGS',
    'Sauts conditionnels signés (JL, JG, JLE, JGE)',
    'Sauts conditionnels non-signés (JB, JA, JBE, JAE)',
    'Pile d’exécution LIFO (croissance vers le bas)',
    'Instructions PUSH et POP',
    'Instructions CALL et RET',
    'Convention d’appel cdecl (32 bits)',
    'Cadre de pile (Stack Frame / EBP)',
    'Convention System V AMD64 ABI (64 bits)',
    'Appels système Linux (syscall et int 0x80)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois le fonctionnement de la pile et la différence entre JL et JB.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le schéma du cadre de pile et les offsets [EBP + 8] / [EBP - 4].' },
    { cls: 'good', text: '70–94 % — Très bon niveau : vous maîtrisez les conventions d’appel et les appels système Linux.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : vous avez acquis l’ensemble du programme d’Architecture &amp; Assembleur B2 !' }
  ],

  flashcards: [
    { q: 'Que fait l’instruction CMP EAX, EBX sur le plan matériel ?', a: 'Elle calcule EAX - EBX, met à jour les drapeaux EFLAGS (ZF, SF, CF, OF) mais ne modifie ni EAX ni EBX.' },
    { q: 'Pourquoi la pile x86 décrémente-t-elle ESP lors d’un PUSH ?', a: 'Parce que sur x86, la pile grandit vers les adresses mémoires basses (décroissantes).' },
    { q: 'Que contient l’adresse pointée par [EBP + 4] dans une fonction standard ?', a: 'L’adresse de retour vers l’appelant, empilée automatiquement par l’instruction CALL.' },
    { q: 'Que fait l’instruction LEAVE en une seule opération ?', a: 'Elle restaure le sommet de pile (MOV ESP, EBP) puis dépile l’ancien base pointer (POP EBP).' },
    { q: 'Quels sont les registres utilisés pour passer les 3 premiers arguments en 64 bits sous Linux ?', a: 'RDI pour le 1er argument, RSI pour le 2e, et RDX pour le 3e.' },
    { q: 'Comment déclenche-t-on un appel système en x86_64 sous Linux ?', a: 'On place le numéro de syscall dans RAX, les arguments dans RDI/RSI/RDX, et on exécute l’instruction SYSCALL.' }
  ]
};
