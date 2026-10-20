/**
 * Chapitre 3 du cours « Assembleur » B2 — Mémoires, Bus & Architectures (Von Neumann vs Harvard, AVR / x86).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Mémoires, Bus &amp; Architectures (Von Neumann vs Harvard, AVR / x86)',
  short: 'Mémoires &amp; Architectures',
  toc: 'Architectures Von Neumann et Harvard, mémoires Flash, SRAM et EEPROM des microcontrôleurs AVR, bus matériels, Little vs Big-Endian, GPIO et mode segmenté x86.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un électronicien conçoit un système embarqué communicant avec un serveur PC. ' +
    'Sur le microcontrôleur AVR (ATmega328P), le programme est figé en mémoire Flash tandis que les variables volatiles ' +
    'résident en SRAM, avec des bus d’adresses totalement séparés (architecture Harvard). ' +
    'Sur le PC x86 hôte, code et données se partagent la même mémoire vive (Von Neumann). ' +
    'Lorsque le serveur transmet l’entier 32 bits 0x12345678 par le port série, pourquoi les octets arrivent-ils inversés ' +
    'si les deux machines n’appliquent pas les mêmes conventions d’endianness ? ' +
    'Ce module détaille l’organisation physique de la mémoire et les interactions avec les bus matériels.',

  objectives: [
    'distinguer avec rigueur l’architecture de Von Neumann (bus partagé) de l’architecture Harvard (bus code/données séparés) ;',
    'comprendre les caractéristiques et les rôles des mémoires Flash (programme), SRAM (variables, pile) et EEPROM (persistance non volatile) ;',
    'configurer sans erreur les registres de ports numériques GPIO sur microcontrôleur : DDRx, PORTx et PINx ;',
    'ordonner et reconstruire les mots multi-octets selon les formats Little-Endian et Big-Endian ;',
    'calculer les adresses physiques réelles en mode segmenté x86 (formule Segment &times; 16 + Offset).'
  ],

  sections: [
    {
      title: 'Von Neumann vs Harvard &amp; le goulot d’étranglement mémoire',
      html: [
        '<p>L’organisation des flux de données et d’instructions divise le monde des processeurs en deux grandes écoles d’architecture :</p>',

        '<table class="table">',
        '  <thead><tr><th>Critère</th><th>Architecture de Von Neumann (PC, Serveurs, x86)</th><th>Architecture Harvard (AVR, Microcontrôleurs, DSP)</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Organisation mémoire</strong></td><td>Espace d’adressage <strong>unifié</strong> : le code et les données se partagent la même RAM.</td><td>Espaces d’adressage <strong>strictement séparés</strong> : une mémoire Flash pour le code, une SRAM pour les données.</td></tr>',
        '    <tr><td><strong>Bus physiques</strong></td><td>Un seul bus d’adresses et un seul bus de données partagés.</td><td>Deux jeux de bus indépendants (bus instruction et bus données).</td></tr>',
        '    <tr><td><strong>Performances</strong></td><td>Sujette au <strong>goulot d’étranglement de Von Neumann</strong> (on ne peut pas lire une donnée et une instruction simultanément).</td><td>Accès simultané en un seul cycle d’horloge à l’instruction suivante et à une variable en SRAM.</td></tr>',
        '    <tr><td><strong>Sécurité matérielle</strong></td><td>Vulnérable aux attaques par injection de code (le processeur peut exécuter des octets situés dans la pile ou le tas).</td><td>Immunité matérielle naturelle contre l’exécution de données (le processeur ne peut pas exécuter la SRAM).</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Les trois mémoires du microcontrôleur AVR (ATmega328P)',
      html: [
        '<p>Un microcontrôleur intègre sur une seule puce de silicium le processeur, les horloges, les périphériques et trois technologies de mémoire distinctes :</p>',

        box('standard', 'Cartographie des mémoires de l’ATmega328P (Arduino Uno)', [
          '<ul>',
          '  <li><strong>Mémoire Flash (32 Ko)</strong> : mémoire <strong>non volatile</strong> où réside le code compilé du programme. Elle est programmée via le bootloader ou un programmateur ISP et ne peut pas être modifiée à la volée comme de la RAM classique.</li>',
          '  <li><strong>SRAM (Static RAM, 2 Ko)</strong> : mémoire <strong>volatile</strong> ultra-rapide hébergeant les 32 registres généraux ($R0..R31$), les registres d’E/S, les variables globales, le tas (heap) et la pile d’exécution (stack). Tout s’efface lors d’une coupure d’alimentation.</li>',
          '  <li><strong>EEPROM (1 Ko)</strong> : mémoire <strong>non volatile modifiable octet par octet</strong>. Idéale pour stocker des paramètres de configuration persistants (identifiants réseau, compteurs d’allumage, seuils de calibration).</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Contrôle des broches matérielles GPIO (DDR, PORT, PIN)',
      html: [
        '<p>Pour interagir avec le monde extérieur (allumer une LED, lire un capteur, commander un relais), ' +
        'le microcontrôleur dispose de ports d’entrées/sorties généralistes (GPIO). Chaque port (ex. Port B) est piloté par 3 registres 8 bits :</p>',

        '<pre><code>// Les 3 registres de pilotage du Port B (broches PB0 à PB7) :\n\n' +
        '1. DDRB (Data Direction Register B) :\n' +
        '   - Bit = 1 &rarr; la broche correspondante est configurée en SORTIE (Output)\n' +
        '   - Bit = 0 &rarr; la broche correspondante est configurée en ENTRÉE (Input)\n\n' +
        '2. PORTB (Data Register B) :\n' +
        '   - Si la broche est en SORTIE : 1 = état HAUT (5V), 0 = état BAS (0V)\n' +
        '   - Si la broche est en ENTRÉE : 1 = active la résistance de rappel (Pull-up interne), 0 = haute impédance\n\n' +
        '3. PINB (Input Pins Address B) :\n' +
        '   - Registre en lecture seule reflétant le niveau logique physique présent sur la broche (0 ou 1)\n' +
        '   - Astuce AVR : écrire un 1 dans PINB bascule (toggle) l’état de la broche de sortie !</code></pre>'
      ].join('\n')
    },
    {
      title: 'Little-Endian vs Big-Endian &amp; Mode Segmenté x86',
      html: [
        '<p>Lorsqu’une donnée s’étend sur plusieurs octets (ex. entier 32 bits <code>0x12345678</code>), ' +
        'l’architecture choisit dans quel ordre placer les octets en mémoire :</p>',

        '<table class="table">',
        '  <thead><tr><th>Format</th><th>Adresse $A$</th><th>Adresse $A+1$</th><th>Adresse $A+2$</th><th>Adresse $A+3$</th><th>Architectures typiques</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Little-Endian</strong> (octet faible d’abord)</td><td><code>0x78</code></td><td><code>0x56</code></td><td><code>0x34</code></td><td><code>0x12</code></td><td>x86, x86_64, ARM (par défaut), AVR</td></tr>',
        '    <tr><td><strong>Big-Endian</strong> (octet fort d’abord)</td><td><code>0x12</code></td><td><code>0x34</code></td><td><code>0x56</code></td><td><code>0x78</code></td><td>Mainframes IBM, SPARC, Protocoles réseau IP</td></tr>',
        '  </tbody>',
        '</table>',

        box('tip', 'Le calcul d’adresse en mode réel x86 (Segment:Offset)', [
          '<p>Le processeur Intel 8086 ne disposait que de registres 16 bits mais d’un bus d’adresses 20 bits ($2^{20} = 1\\text{ Mo}$). ' +
          'Il combine deux registres selon la formule universelle :</p>' +
          '<pre><code>Adresse_Physique = (Segment &times; 16) + Offset = (Segment &lt;&lt; 4) + Offset</code></pre>' +
          '<p>Exemple : pour le segment <code>0x07C0</code> et l’offset <code>0x0000</code>, l’adresse physique vaut :<br>' +
          '$0\\text{x07C0} \\times 16 + 0 = 0\\text{x07C00}$ (l’adresse standard de démarrage du MBR).</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Quelle est la caractéristique fondamentale de l’architecture Harvard par rapport à celle de Von Neumann ?',
      opts: [
        'La mémoire des instructions et la mémoire des données sont physiquement séparées avec des bus distincts',
        'Elle n’utilise aucun signal d’horloge',
        'Elle ne possède aucun registre général',
        'Elle ne permet pas d’exécuter de boucles'
      ],
      correct: 0,
      exp: 'Harvard sépare physiquement le code et les données, permettant un chargement simultané sans goulot d’étranglement.'
    },
    {
      stem: 'Dans un microcontrôleur ATmega328P, où le code exécutable du programme est-il stocké de façon permanente ?',
      opts: [
        'Dans la mémoire Flash (32 Ko non volatile)',
        'Dans la SRAM (2 Ko)',
        'Dans l’accumulateur EAX',
        'Dans le cache L2'
      ],
      correct: 0,
      exp: 'La mémoire Flash est non volatile et conserve le firmware même hors tension.'
    },
    {
      stem: 'Sur microcontrôleur AVR, comment configure-t-on la broche PB5 en SORTIE ?',
      opts: [
        'En mettant le bit 5 du registre DDRB à 1',
        'En mettant le bit 5 du registre DDRB à 0',
        'En lisant le registre PINB',
        'En désactivant les interruptions globales'
      ],
      correct: 0,
      exp: 'DDR (Data Direction Register) : 1 = Sortie, 0 = Entrée.'
    },
    {
      stem: 'Dans une architecture Little-Endian (comme x86), où l’octet de poids faible (LSB) est-il stocké ?',
      opts: [
        'À l’adresse mémoire la plus basse',
        'À l’adresse mémoire la plus haute',
        'Toujours dans le registre RIP',
        'Dans la mémoire EEPROM'
      ],
      correct: 0,
      exp: 'Little-Endian (« petit bout d’abord ») stocke l’octet le moins significatif à la première adresse mémoire.'
    },
    {
      stem: 'Soit la valeur 32 bits 0x12345678 stockée à l’adresse 0x1000 en Little-Endian. Quel octet se trouve à l’adresse 0x1000 ?',
      opts: [
        '0x78',
        '0x12',
        '0x34',
        '0x56'
      ],
      correct: 0,
      exp: 'L’octet de poids faible est 0x78 : en Little-Endian, il est situé à l’adresse de base 0x1000.'
    },
    {
      stem: 'En mode réel x86, quelle est l’adresse physique 20 bits correspondant à Segment = 0x1000 et Offset = 0x0250 ?',
      opts: [
        '0x10250',
        '0x12500',
        '0x01250',
        '0x1000250'
      ],
      correct: 0,
      exp: 'Adresse = (Segment << 4) + Offset = 0x10000 + 0x0250 = 0x10250.'
    },
    {
      stem: 'À quoi sert le registre PINx sur microcontrôleur AVR ?',
      opts: [
        'À lire l’état logique présent sur les broches matérielles du port',
        'À changer la fréquence de l’horloge quartz',
        'À configurer le sens d’entrée/sortie',
        'À allouer la pile d’exécution'
      ],
      correct: 0,
      exp: 'PIN (Port Input Pins) est le registre en lecture seule qui reflète la tension réelle appliquée sur les broches.'
    },
    {
      stem: 'Quelle est la taille maximale de l’espace mémoire adressable directement par un bus d’adresses 20 bits ?',
      opts: [
        '1 Mo (1 048 576 octets)',
        '64 Ko',
        '4 Go',
        '16 Mo'
      ],
      correct: 0,
      exp: '2^20 octets = 1 048 576 octets = exactement 1 Mo.'
    }
  ],

  pitfalls: [
    'Confondre le registre DDR (direction : entrée ou sortie) et le registre PORT (valeur : haut ou bas).',
    'Inverser l’ordre des octets lors de la lecture d’une trame réseau (Big-Endian) sur une machine x86 (Little-Endian).',
    'Croire que la SRAM conserve ses données après une coupure d’alimentation : seule l’EEPROM ou la Flash est non volatile.',
    'Oublier de décaler le segment de 4 bits vers la gauche (multiplier par 16) dans la formule de calcul en mode réel 8086.',
    'Tenter d’écrire dynamiquement dans la mémoire Flash comme si c’était de la RAM pendant l’exécution normale du code.'
  ],

  methodTitle: 'Protocole en 4 étapes pour cartographier un accès mémoire bas niveau',
  method: [
    'Identifier l’architecture du processeur : Von Neumann (espace unique) ou Harvard (code et données séparés).',
    'Déterminer le type de mémoire cible : Flash (statique/lecture), SRAM (volatile/lecture-écriture) ou EEPROM.',
    'Vérifier la convention d’Endianness du système : Little-Endian pour x86/AVR, Big-Endian pour le réseau et certains RISC.',
    'Calculer l’adresse effective : appliquer le décalage de segment (mode réel) ou l’offset de structure avant d’émettre la requête sur le bus.'
  ],

  summary: [
    'Von Neumann partage le bus code et données ; Harvard sépare physiquement la Flash (programme) et la SRAM (données).',
    'L’ATmega328P dispose de 32 Ko de Flash, 2 Ko de SRAM volatile et 1 Ko d’EEPROM non volatile.',
    'Les broches GPIO sont pilotées par DDR (direction 1=sortie, 0=entrée), PORT (état haut/bas/pull-up) et PIN (lecture physique).',
    'Little-Endian stocke l’octet de poids faible à l’adresse basse ; Big-Endian stocke l’octet de poids fort en premier.',
    'En mode réel x86 20 bits : $\\text{Adresse Physique} = (\\text{Segment} \\times 16) + \\text{Offset}$.'
  ],

  checklist: [
    'Je sais expliquer la différence entre Von Neumann et Harvard et nommer leurs avantages respectifs.',
    'Je connais la répartition et le rôle de la Flash, de la SRAM et de l’EEPROM sur microcontrôleur.',
    'Je sais configurer une broche en sortie ou en entrée avec résistance de pull-up via DDR et PORT.',
    'Je sais convertir un entier 32 bits en séquence d’octets Little-Endian et Big-Endian.',
    'Je sais calculer l’adresse physique 20 bits d’une paire Segment:Offset en mode réel x86.'
  ],

  notions: [
    'Architecture de Von Neumann',
    'Architecture Harvard',
    'Mémoire Flash (Firmware)',
    'SRAM (Données volatiles)',
    'EEPROM (Persistance)',
    'Registres GPIO (DDR, PORT, PIN)',
    'Résistance de rappel (Pull-up)',
    'Little-Endian & Big-Endian',
    'Mode réel x86 (8086)',
    'Calcul Segment:Offset'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les différences Von Neumann / Harvard et les trois registres GPIO (DDR, PORT, PIN).' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur l’ordonnancement Little-Endian et le calcul Segment:Offset.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les bus matériels, les mémoires et les broches d’E/S.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la chaîne d’outils logicielle (Assembleur, ELF, Linker) au chapitre 4.' }
  ],

  flashcards: [
    { q: 'Quelle est la différence majeure entre Von Neumann et Harvard ?', a: 'Von Neumann partage un bus unique pour le code et les données, tandis que Harvard utilise des mémoires et des bus séparés.' },
    { q: 'Que contient la mémoire Flash sur un microcontrôleur AVR ?', a: 'Le programme binaire compilé (firmware), conservé de manière non volatile.' },
    { q: 'Que fait un bit à 1 dans le registre DDRB ?', a: 'Il configure la broche correspondante du Port B en mode SORTIE.' },
    { q: 'Comment sont ordonnés les octets en mémoire dans un système Little-Endian ?', a: 'L’octet de poids faible (LSB) est stocké à l’adresse mémoire la plus basse.' },
    { q: 'Quelle est la formule de calcul d’adresse physique en mode réel x86 ?', a: 'Adresse = (Segment * 16) + Offset.' },
    { q: 'À quoi sert la résistance de pull-up activable via PORTx en mode entrée ?', a: 'À fixer un niveau logique haut (5V) stable lorsque le bouton ou capteur externe est ouvert (évite l’état flottant).' }
  ]
};
