/**
 * Chapitre 4 du cours « Assembleur » B2 — Chaîne de Production Logicielle (Assembleur, ELF, Linker & Débogueur).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Chaîne de Production Logicielle (Assembleur, ELF, Linker &amp; Débogueur)',
  short: 'Chaîne de Production Logicielle',
  toc: 'Compilation croisée, étapes de la toolchain (source &rarr; préprocesseur &rarr; assembleur &rarr; linker), sections ELF (.text, .data, .rodata, .bss), directives NASM (db..dq) et alignement.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un développeur tape la commande <code>gcc -O2 main.c -o programme</code> dans son terminal. ' +
    'En quelques millisecondes, le compilateur a prétraité les macros, généré du code assembleur intermédiaire, ' +
    'assemblé les mnémoniques en opcodes machine binaires dans un fichier objet <code>main.o</code>, ' +
    'puis l’éditeur de liens (<code>ld</code>) a résolu les symboles externes pour produire un exécutable binaire ELF. ' +
    'Que contiennent les sections <code>.text</code>, <code>.data</code> et <code>.bss</code> ? ' +
    'Pourquoi l’éditeur de liens émet-il l’erreur redoutée <code>undefined reference</code> ? ' +
    'Et pourquoi l’alignement mémoire sur 16 octets est-il obligatoire avant tout appel de fonction en x86_64 ?',

  objectives: [
    'décrire avec exactitude les 4 étapes séquentielles de la chaîne de compilation logicielle ;',
    'expliquer le concept et l’utilité de la compilation croisée (cross-compilation) pour les cibles embarquées ;',
    'détailler la structure interne et le rôle de chaque section d’un binaire ELF (.text, .rodata, .data, .bss) ;',
    'déclarer des données brutes en assembleur NASM avec les directives de taille adaptées (db, dw, dd, dq) ;',
    'calculer les contraintes d’alignement mémoire et le nombre d’octets de padding imposés par la directive ALIGN.'
  ],

  sections: [
    {
      title: 'Les 4 étapes de la chaîne de compilation (Toolchain)',
      html: [
        '<p>La transformation d’un code source de haut niveau en un programme binaire exécutable ' +
        'fait intervenir quatre outils logiciels spécialisés travaillant en pipeline :</p>',

        '<table class="table">',
        '  <thead><tr><th>Étape</th><th>Outil GNU</th><th>Entrée &rarr; Sortie</th><th>Rôle technique exact</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>1. Préprocesseur</strong></td><td><code>cpp</code></td><td><code>.c / .h &rarr; .i</code></td><td>Supprimez les commentaires, remplace les macros (<code>#define</code>) et inclut textuellement les fichiers d’en-tête (<code>#include</code>).</td></tr>',
        '    <tr><td><strong>2. Compilateur</strong></td><td><code>gcc (cc1)</code></td><td><code>.i &rarr; .s</code></td><td>Analyse syntaxique, optimisation et traduction du code en instructions assembleur textuelles propres à la cible.</td></tr>',
        '    <tr><td><strong>3. Assembleur</strong></td><td><code>as / nasm</code></td><td><code>.s &rarr; .o</code></td><td>Traduit les mnémoniques textuels (MOV, ADD) en <strong>opcodes binaires machine</strong> et génère un fichier objet relocalisable.</td></tr>',
        '    <tr><td><strong>4. Éditeur de liens</strong></td><td><code>ld</code></td><td><code>.o + .a &rarr; ELF / EXE</code></td><td>Fusionne les sections des fichiers objets, résout les adresses des symboles externes et intègre les bibliothèques système.</td></tr>',
        '  </tbody>',
        '</table>',

        box('info', 'Qu’est-ce que la compilation croisée (Cross-Compilation) ?', [
          '<p>La <strong>compilation croisée</strong> consiste à compiler un programme sur une machine hôte puissante ' +
          '(ex. un PC de développement x86_64 sous Linux) pour produire un fichier binaire destiné à être exécuté ' +
          'sur une machine cible d’architecture matérielle totalement différente (ex. une puce ARM Cortex, ou un microcontrôleur AVR ATmega328P). ' +
          'La toolchain utilise alors des outils préfixés : <code>avr-gcc</code>, <code>avr-as</code>, <code>avr-ld</code> et <code>avr-objcopy</code>.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Anatomie d’un exécutable ELF &amp; ses sections mémoire',
      html: [
        '<p>Sous Linux et les systèmes UNIX, le format binaire standard est <strong>ELF (Executable and Linkable Format)</strong>. ' +
        'Le programme est découpé en plusieurs sections indépendantes ayant des droits d’accès matériels distincts (rwx) :</p>',

        '<pre><code>// Structure des 4 sections fondamentales d’un binaire ELF :\n\n' +
        '1. Section .text (Code exécutable, Droits: r-x) :\n' +
        '   - Contient la séquence des instructions machine lues par le processeur.\n' +
        '   - Mémoire en lecture seule et exécution (protégée contre l’écriture pour interdire l’auto-modification).\n\n' +
        '2. Section .rodata (Read-Only Data, Droits: r--) :\n' +
        '   - Constantes littérales du programme (chaînes de caractères de printf, tables de sinus, masques constants).\n\n' +
        '3. Section .data (Initialized Data, Droits: rw-) :\n' +
        '   - Variables globales et statiques explicitement initialisées à une valeur non nulle.\n' +
        '   - Présente physiquement dans le fichier binaire sur le disque.\n\n' +
        '4. Section .bss (Block Started by Symbol, Droits: rw-) :\n' +
        '   - Variables globales non initialisées (ou initialisées à 0).\n' +
        '   - N’occupe aucun octet sur le disque ! Le noyau Linux se contente d’allouer des pages de zéros en mémoire vive au démarrage.</code></pre>'
      ].join('\n')
    },
    {
      title: 'Directives d’allocation NASM &amp; Table des symboles',
      html: [
        '<p>En assembleur NASM, la section <code>.data</code> alloue et initialise la mémoire ' +
        'à l’aide de directives explicites de largeur binaire :</p>',

        '<table class="table">',
        '  <thead><tr><th>Directive</th><th>Nom complet</th><th>Taille en octets</th><th>Exemple d’utilisation</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><code>db</code></td><td>Define Byte</td><td>1 octet (8 bits)</td><td><code>msg db "Hello", 0</code> (chaîne terminée par zéro)</td></tr>',
        '    <tr><td><code>dw</code></td><td>Define Word</td><td>2 octets (16 bits)</td><td><code>compteur dw 1000</code></td></tr>',
        '    <tr><td><code>dd</code></td><td>Define Double Word</td><td>4 octets (32 bits)</td><td><code>valeur dd 0x12345678</code></td></tr>',
        '    <tr><td><code>dq</code></td><td>Define Quad Word</td><td>8 octets (64 bits)</td><td><code>grand_nombre dq 1000000000</code></td></tr>',
        '  </tbody>',
        '</table>',

        box('standard', 'Le rôle de la table des symboles', [
          '<p>Chaque étiquette (label) déclarée dans le code (ex. <code>main:</code> ou <code>msg:</code>) est enregistrée ' +
          'dans la <strong>table des symboles</strong> du fichier objet avec son nom, sa section d’appartenance, ' +
          'sa portée (locale ou <code>global</code>) et son offset relatif au début de la section.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Alignement mémoire &amp; Directive ALIGN',
      html: [
        '<p>Pour que le bus mémoire puisse lire une donnée en un seul cycle d’horloge, ' +
        'l’adresse de départ de la donnée doit idéalement être un multiple de sa taille :</p>',

        '<pre><code>// Directive ALIGN en assembleur NASM :\n' +
        'ALIGN 4    ; Insère des octets de bourrage (padding) jusqu’au prochain multiple de 4\n' +
        'ALIGN 16   ; Obligatoire en x86_64 ABI pour aligner la pile avant un CALL externe\n\n' +
        '// Formule du padding nécessaire pour aligner l’adresse A sur N octets :\n' +
        'reste = A % N\n' +
        'padding = (N - reste) % N\n' +
        'nouvelle_adresse = A + padding</code></pre>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Quel outil de la chaîne de compilation transforme le code assembleur textuel (.s) en fichier objet binaire (.o) ?',
      opts: [
        'L’assembleur (as ou nasm)',
        'Le préprocesseur (cpp)',
        'Le compilateur C (cc1)',
        'L’éditeur de liens (ld)'
      ],
      correct: 0,
      exp: 'L’assembleur traduit les mnémoniques (comme MOV, ADD) en opcodes binaires machine.'
    },
    {
      stem: 'Pourquoi la section .bss d’un fichier ELF n’occupe-t-elle presque aucun espace sur le disque ?',
      opts: [
        'Parce qu’elle ne contient que des variables non initialisées ou nulles, le noyau se chargeant de réserver des zéros en RAM au lancement',
        'Parce qu’elle est compressée avec l’algorithme gzip',
        'Parce qu’elle est stockée dans la mémoire Flash du processeur',
        'Parce qu’elle est supprimée lors de l’édition de liens'
      ],
      correct: 0,
      exp: 'La section .bss n’enregistre que la taille totale à allouer : les pages de zéros sont fournies à la volée par le système d’exploitation.'
    },
    {
      stem: 'Quelle directive NASM permet de réserver et d’initialiser un entier de 64 bits (8 octets) ?',
      opts: [
        'dq (define quad word)',
        'dd (define double word)',
        'dw (define word)',
        'db (define byte)'
      ],
      correct: 0,
      exp: 'dq = Define Quad Word = 64 bits = 8 octets.'
    },
    {
      stem: 'Quelle section d’un binaire ELF contient le code exécutable du programme protégé en lecture et exécution (r-x) ?',
      opts: [
        '.text',
        '.data',
        '.rodata',
        '.bss'
      ],
      correct: 0,
      exp: 'La section .text héberge le code machine exécuté par le processeur.'
    },
    {
      stem: 'Qu’est-ce qu’une erreur d’édition de liens « undefined reference to main » signifie exactement ?',
      opts: [
        'L’éditeur de liens ld n’a trouvé aucun symbole global nommé main dans les fichiers objets fournis',
        'Le code assembleur contient une division par zéro',
        'Le processeur ne supporte pas le jeu d’instructions 64 bits',
        'Le fichier source C est trop volumineux'
      ],
      correct: 0,
      exp: 'Cette erreur survient lors de la phase de linkage : le symbole du point d’entrée principal n’a pas été résolu.'
    },
    {
      stem: 'À quelle adresse se retrouve une variable située à l’adresse 0x1003 si l’on applique la directive ALIGN 4 ?',
      opts: [
        '0x1004 (1 octet de padding ajouté)',
        '0x1008',
        '0x1000',
        '0x1007'
      ],
      correct: 0,
      exp: '0x1003 = 4099. Le multiple de 4 supérieur le plus proche est 4100 = 0x1004 (padding de 1 octet).'
    },
    {
      stem: 'Dans quelle section mémoire résident les chaînes de caractères littérales passées à printf("Hello\n") ?',
      opts: [
        '.rodata (données en lecture seule)',
        '.bss',
        '.text',
        'Dans la pile RSP'
      ],
      correct: 0,
      exp: 'Les constantes non modifiables sont logées dans la section .rodata (Read-Only Data).'
    },
    {
      stem: 'Quel outil de la toolchain AVR permet d’extraire le code machine binaire d’un fichier ELF pour en faire un fichier .hex flashable ?',
      opts: [
        'avr-objcopy',
        'avrdude',
        'avr-gdb',
        'avr-cpp'
      ],
      correct: 0,
      exp: 'avr-objcopy extrait les sections exécutables de l’ELF pour produire le format Intel HEX accepté par les programmateurs de Flash.'
    }
  ],

  pitfalls: [
    'Confondre la section .data (variables initialisées occupant de la place sur disque) et .bss (variables nulles allouées en RAM).',
    'Oublier le mot-clé global devant une étiquette en NASM, rendant le symbole invisible pour l’éditeur de liens externe.',
    'Mélanger les directives de taille : déclarer dw pour un entier 32 bits, ce qui tronque la valeur à 16 bits.',
    'Négliger l’alignement de la pile sur 16 octets avant un appel de fonction système en x86_64, provoquant un crash direct.',
    'Confondre avr-gcc (le compilateur croisé) et avrdude (l’outil de flashage qui communique physiquement avec la puce via USB).'
  ],

  methodTitle: 'Protocole en 4 étapes pour assembler et lier un programme NASM',
  method: [
    'Écrire le code source assembleur en déclarant explicitement la section <code>.data</code>, la section <code>.text</code> et <code>global _start</code>.',
    'Assembler le code avec NASM en spécifiant le format cible : <code>nasm -f elf64 prog.asm -o prog.o</code>.',
    'Lier les fichiers objets avec ld pour résoudre les adresses virtuelles : <code>ld prog.o -o prog</code>.',
    'Inspecter les sections du binaire généré à l’aide des commandes GNU <code>size prog</code> et <code>objdump -d prog</code>.'
  ],

  summary: [
    'La toolchain transforme le code en 4 étapes : préprocesseur (.i), compilateur (.s), assembleur (.o) et linker (ELF).',
    'La cross-compilation produit du binaire pour une cible d’architecture différente de la machine hôte.',
    'Un binaire ELF isole .text (instructions r-x), .rodata (constantes r--), .data (initialisé rw-) et .bss (non initialisé rw-).',
    'Les directives NASM définissent la taille mémoire : db (1o), dw (2o), dd (4o) et dq (8o).',
    'La directive ALIGN insère du bourrage pour aligner les données et structures sur des frontières de bus optimales.'
  ],

  checklist: [
    'Je sais nommer les 4 outils de la toolchain et leurs fichiers intermédiaires respectifs.',
    'Je sais expliquer ce qu’est la compilation croisée et pourquoi elle est indispensable en embarqué.',
    'Je connais le rôle et les droits d’accès des 4 sections ELF (.text, .rodata, .data, .bss).',
    'Je sais choisir la bonne directive NASM (db, dw, dd, dq) selon le type de variable.',
    'Je sais calculer le padding nécessaire pour aligner une adresse mémoire sur N octets.'
  ],

  notions: [
    'Chaîne de compilation (Toolchain)',
    'Compilation croisée (Cross-compilation)',
    'Assembleur (NASM / GAS)',
    'Éditeur de liens (Linker ld)',
    'Format binaire ELF',
    'Section .text, .rodata, .data, .bss',
    'Directives db, dw, dd, dq',
    'Table des symboles (global)',
    'Alignement mémoire & Padding',
    'Format Intel HEX (.hex)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les 4 étapes de la toolchain et le rôle des sections .text et .data.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les directives d’allocation (db..dq) et le calcul d’alignement ALIGN.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez la production logicielle binaire et la structure ELF.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux instructions de transfert et aux modes d’adressage au chapitre 5.' }
  ],

  flashcards: [
    { q: 'Quel outil transforme le fichier objet .o en exécutable final ELF ?', a: 'L’éditeur de liens (Linker, ld).' },
    { q: 'Quelle est la différence majeure entre la section .data et la section .bss ?', a: '.data contient des variables initialisées stockées sur disque, tandis que .bss contient des variables nulles qui n’occupent aucun espace disque.' },
    { q: 'Que fait la directive ALIGN 16 en assembleur ?', a: 'Elle insère des octets de padding pour que l’adresse suivante soit un multiple exact de 16 octets.' },
    { q: 'Quelle directive NASM permet de définir une chaîne de caractères 8 bits terminée par un zéro ?', a: 'db (Define Byte), par exemple : msg db "Bonjour", 0.' },
    { q: 'Pourquoi déclare-t-on "global main" ou "global _start" en NASM ?', a: 'Pour exporter le symbole dans la table des symboles afin qu’il soit visible par l’éditeur de liens externe.' },
    { q: 'À quoi sert avr-objcopy dans la chaîne de compilation croisée ?', a: 'À convertir le binaire ELF en fichier image .hex prêt à être flashé dans la mémoire Flash du microcontrôleur.' }
  ]
};
