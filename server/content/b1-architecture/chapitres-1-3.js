/**
 * Chapitres 1 à 3 du cours « Circuit logique & architecture des ordinateurs » B1.
 *
 * Chapitre 1 : généralités (ordinateur, histoire, système informatique, OS,
 *               unités de mesure).
 * Chapitre 2 : systèmes de numération (bits, bases 2/8/10/16, conversions).
 * Chapitre 3 : nombres signés (signe + valeur absolue, compléments à 1 et à 2,
 *               arithmétique binaire).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code
 * (trois exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-architecture.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Généralités : ordinateur, système informatique et unités',
    short: 'Généralités',
    toc: 'Définitions (ordinateur, informatique, électronique, calculateur) ; histoire de la Pascaline au cloud ; les cinq générations ; le système informatique (hardware, software, données, utilisateurs) ; types d\'OS ; unités de mesure.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Avant de câbler un circuit ou de qualifier un poste, il faut nommer les objets et les mesures : ' +
      'qu\'est-ce qu\'un ordinateur, que contient un système informatique, combien d\'octets dans un kilooctet, ' +
      'quelle différence entre Mo/s et Mbps ? Ce vocabulaire est le socle de tout le reste du cours.',

    objectives: [
      'définir ordinateur, informatique, électronique et calculateur ;',
      'situer les grandes étapes : Pascaline, cinq générations, jusqu\'au cloud ;',
      'décomposer le système informatique : hardware, software, données, utilisateurs ;',
      'classer les systèmes d\'exploitation selon le nombre d\'utilisateurs et de tâches ;',
      'convertir Ko, Mo, Go et distinguer MBps (octets) et Mbps (bits).'
    ],

    sections: [
      {
        title: 'Définitions et histoire',
        html: [
          '<p>L\'<strong>ordinateur</strong> est une machine électronique programmable capable de traiter ' +
          'automatiquement des informations : elle lit des données, applique un programme et produit des ' +
          'résultats. L\'<strong>informatique</strong> (« information » + « automatique ») est la science du ' +
          'traitement automatique de l\'information. L\'<strong>électronique</strong> est la science des ' +
          'signaux électriques faibles : elle fournit les composants (transistors, circuits intégrés) sur ' +
          'lesquels repose l\'ordinateur. Un <strong>calculateur</strong> est une machine dédiée au calcul — ' +
          'l\'ordinateur en est la forme généralisée et programmable.</p>',
          '<p>L\'histoire s\'enchaîne : la <strong>Pascaline</strong> de Blaise Pascal (1642), première ' +
          'machine à calculer mécanique ; les machines à cartes perforées du XIX<sup>e</sup> siècle ; ' +
          'l\'ENIAC (1946), premier calculateur électronique ; puis cinq <strong>générations</strong> : ' +
          'lampe (années 1940-1950), transistor (1955-1965), circuit intégré (1965-1975), microprocesseur ' +
          '(1975-1990) et — d\'après le support — la génération actuelle du réseau et du <strong>cloud</strong>, ' +
          'où le calcul se distribue sur des centres de données distants.</p>',
          box('mnemo', 'Mnémotechnique — « une machine, une science, un socle »', 'pin',
            '    <p>Le calculateur calcule, l\'ordinateur généralise et programme, l\'électronique fournit ' +
            'les composants, l\'informatique traite l\'information automatiquement.</p>')
        ].join('\n')
      },
      {
        title: 'Le système informatique',
        html: [
          '<p>Un <strong>système informatique</strong> réunit quatre familles : le <strong>hardware</strong> ' +
          '(matériel : processeur, RAM, disque, clavier, écran), le <strong>software</strong> (logiciels : ' +
          'système d\'exploitation, traitement de texte, navigateur, antivirus), les <strong>données</strong> ' +
          '(la matière première traitée : textes, nombres, images, sons) et les <strong>utilisateurs</strong> ' +
          '(humains ou machines qui pilotent et consomment les traitements).</p>',
          '<p>Le <strong>système d\'exploitation</strong> (OS) est le chef d\'orchestre du software : il gère ' +
          'le matériel, les fichiers et les programmes. Le support les classe par capacités : ' +
          '<strong>mono-utilisateur mono-tâche</strong> (un utilisateur, un programme à la fois, ex. MS-DOS), ' +
          '<strong>mono-utilisateur multi-tâche</strong> (un utilisateur, plusieurs programmes, ex. Windows ' +
          'bureau), <strong>multi-utilisateurs</strong> (plusieurs comptes simultanés, ex. Linux serveur, ' +
          'UNIX). S\'y ajoutent les OS temps réel (systèmes embarqués) et les OS de réseau.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Word, Linux ou un navigateur sont du <strong>software</strong> ; clavier, RAM ou écran du hardware.</li>\n' +
            '      <li>Un OS multi-utilisateurs ≠ multi-tâche : les deux axes sont indépendants.</li>\n' +
            '      <li>La Pascaline est mécanique, pas électronique : l\'ENIAC est le premier calculateur électronique.</li>\n' +
            '      <li>Les données sont une famille à part entière du système, pas un composant physique.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Les unités de mesure',
        html: [
          '<p>Les capacités suivent les <strong>puissances de 2</strong> : 1 octet = 8 bits, ' +
          '<strong>1 Ko = 1024 octets</strong>, 1 Mo = 1024 Ko, 1 Go = 1024 Mo, 1 To = 1024 Go. Le ' +
          '<strong>quartet</strong> (4 bits) suffit à coder un chiffre hexadécimal.</p>',
          '<p>Les <strong>débits</strong> piègent : Mo/s (octets par seconde, stockage) et Mbps (bits par ' +
          'seconde, réseau) diffèrent d\'un facteur 8 — <strong>1 Mo/s = 8 Mbps</strong>. La ' +
          '<strong>fréquence</strong> du processeur se mesure en Hz (gigahertz : milliards de cycles par ' +
          'seconde) ; la puissance électrique en watts ; la <strong>latence</strong> d\'un accès (mémoire, ' +
          'disque, réseau) en millisecondes ou nanosecondes : plus elle est faible, mieux c\'est.</p>',
          box('tech', 'Repères de grandeur', 'terminal',
            '    <ul>\n' +
            '      <li>Une RAM de 8 Go = 8 × 1024 = 8192 Mo.</li>\n' +
            '      <li>Un lien « 100 Mbps » transfert au mieux 100 ÷ 8 = 12,5 Mo/s.</li>\n' +
            '      <li>Un CPU à 2 GHz exécute 2 milliards de cycles d\'horloge par seconde.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'L\'informatique est la science…', opts: ['des circuits intégrés', 'du traitement automatique de l\'information', 'de l\'électricité'], correct: 1, exp: 'Information + automatique : traiter l\'information sans intervention humaine.' },
      { q: 'La Pascaline (1642) fonctionne à…', opts: ['vapeur', 'électricité', 'mécanique'], correct: 2, exp: 'Roues dentées : c\'est une machine mécanique.' },
      { q: 'La génération du microprocesseur est la…', opts: ['3e', '4e', '5e'], correct: 1, exp: 'Lampe 1, transistor 2, circuit intégré 3, microprocesseur 4, réseau et cloud 5.' },
      { q: 'La RAM et le disque dur appartiennent au…', opts: ['software', 'hardware', 'kernel'], correct: 1, exp: 'Parties physiques : matériel.' },
      { q: 'MS-DOS est un OS…', opts: ['mono-utilisateur mono-tâche', 'multi-utilisateurs', 'temps réel'], correct: 0, exp: 'Un utilisateur, un programme à la fois.' },
      { q: '1 Mo vaut…', opts: ['1000 Ko', '1024 Ko', '1024 octets'], correct: 1, exp: 'Puissances de 2 : 1 Mo = 1024 Ko = 1024 × 1024 octets.' },
      { q: 'Un lien de 80 Mbps transfert au plus…', opts: ['10 Mo/s', '80 Mo/s', '8 Mo/s'], correct: 0, exp: '1 Mo/s = 8 Mbps : 80 ÷ 8 = 10 Mo/s.' },
      { q: 'La latence mesure…', opts: ['la capacité', 'un délai', 'une puissance'], correct: 1, exp: 'Délai d\'accès — plus elle est faible, mieux c\'est.' }
    ],

    pitfalls: [
      'Croire que 1 Ko = 1000 octets : en informatique c\'est 1024 (puissances de 2).',
      'Confondre Mbps (bits) et Mo/s (octets) : facteur 8.',
      'Classer un antivirus ou Word dans le matériel : ce sont des logiciels.',
      'Placer la Pascaline dans la génération électronique : elle est mécanique.'
    ],

    methodTitle: 'Méthode — qualifier un élément du système en trois gestes',
    method: [
      'Se demander si l\'élément se touche (hardware) ou s\'exécute (software).',
      'Pour un OS : compter les utilisateurs ET les tâches simultanées.',
      'Pour une mesure : repérer octets ou bits, capacité ou débit, puis convertir par 1024 ou par 8.'
    ],

    summary: [
      'Ordinateur : machine électronique programmable de traitement de l\'information.',
      'Système informatique : hardware + software + données + utilisateurs.',
      'OS classés par utilisateurs et tâches : mono/multi, MS-DOS à Linux.',
      '1 Ko = 1024 octets ; 1 Mo/s = 8 Mbps ; fréquence en Hz, latence en ms.'
    ],

    checklist: [
      'Je sais définir ordinateur, informatique, électronique, calculateur.',
      'Je sais dérouler l\'histoire et les cinq générations.',
      'Je sais classer un OS par utilisateurs et tâches.',
      'Je convertis Ko, Mo, Go et MBps/Mbps sans erreur.'
    ],

    notions: [
      '<strong>Ordinateur</strong> : machine électronique programmable de traitement automatique de l\'information.',
      '<strong>Informatique</strong> : science du traitement automatique de l\'information.',
      '<strong>Système informatique</strong> : hardware, software, données, utilisateurs.',
      '<strong>OS</strong> : logiciel qui gère le matériel et les programmes (mono/multi-utilisateurs, tâches).',
      '<strong>Générations</strong> : lampe, transistor, circuit intégré, microprocesseur, réseau et cloud.',
      '<strong>Octet</strong> : 8 bits ; 1 Ko = 1024 octets, 1 Mo = 1024 Ko.',
      '<strong>MBps / Mbps</strong> : octets par seconde / bits par seconde — facteur 8.',
      '<strong>Latence</strong> : délai d\'accès, en ms ou ns, à minimiser.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les définitions et le tableau des unités.' },
      { cls: 'mid', text: '50–69 % — refais les conversions Ko/Mo/Go et Mo/s/Mbps.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les types d\'OS et l\'histoire.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Définition d\'un ordinateur ?', a: 'Machine électronique programmable qui traite automatiquement des informations.' },
      { q: 'Les quatre familles du système informatique ?', a: 'Hardware (matériel), software (logiciels), données, utilisateurs.' },
      { q: 'Les cinq générations d\'ordinateurs ?', a: 'Lampe, transistor, circuit intégré, microprocesseur, réseau et cloud.' },
      { q: '1 Mo, 1 Go, 1 To en unités inférieures ?', a: '1 Mo = 1024 Ko ; 1 Go = 1024 Mo ; 1 To = 1024 Go (puissances de 2).' },
      { q: 'Différence entre Mo/s et Mbps ?', a: 'Mo/s : octets par seconde (stockage). Mbps : bits par seconde (réseau). 1 Mo/s = 8 Mbps.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Systèmes de numération et conversions',
    short: 'Numération',
    toc: 'Bit, quartet, octet, MSB/LSB ; bases 2, 8, 10 et 16 ; conversions par divisions successives, soustraction et poids ; partie fractionnaire ; codes BCD et ASCII.',
    time: '≈ 2 h 30 de travail',

    situation:
      'La machine ne connaît que deux états : 0 et 1. Tout nombre, tout texte, toute adresse finit en binaire. ' +
      'Savoir convertir dans les quatre sens — binaire, octal, décimal, hexadécimal — est le geste quotidien ' +
      'de l\'architecte : ce chapitre l\'automatise, y compris en Bash.',

    objectives: [
      'nommer bit, quartet, octet, MSB et LSB ;',
      'convertir décimal vers binaire par divisions successives et par soustraction des poids ;',
      'convertir binaire vers décimal, octal et hexadécimal (et retour) ;',
      'convertir la partie fractionnaire d\'un nombre ;',
      'expliquer les codes BCD et ASCII.'
    ],

    sections: [
      {
        title: 'Bit, quartet, octet et bases',
        html: [
          'Le <strong>bit</strong> (binary digit) vaut 0 ou 1 : l\'unité élémentaire. Quatre bits font un ' +
          '<strong>quartet</strong>, huit bits font un <strong>octet</strong> (byte). Dans un mot binaire, le ' +
          '<strong>MSB</strong> (Most Significant Bit) est le bit de poids fort — à gauche — et le ' +
          '<strong>LSB</strong> (Least Significant Bit) le bit de poids faible — à droite.</p>',
          '<p>Une base b impose b symboles : <strong>base 2</strong> (0, 1), <strong>base 8</strong> ou octal ' +
          '(0 à 7), <strong>base 10</strong> (0 à 9), <strong>base 16</strong> ou hexadécimal (0 à 9 puis A à ' +
          'F). Un quartet code exactement un chiffre hexadécimal, un groupe de 3 bits un chiffre octal : c\'est ' +
          'la clé des conversions indirectes.</p>',
          box('mnemo', 'Mnémotechnique — « 3 bits font l\'octal, 4 bits font l\'hexa »', 'pin',
            '    <p>2^3 = 8 et 2^4 = 16 : les bases 8 et 16 sont des raccourcis d\'écriture du binaire.</p>')
        ].join('\n')
      },
      {
        title: 'Conversions',
        html: [
          '<p><strong>Décimal vers binaire</strong> : deux méthodes du support. Par <em>divisions ' +
          'successives</em> : diviser par 2, noter les restes, lire de bas en haut (13 → 1101). Par ' +
          '<em>soustraction</em> : retrancher la plus grande puissance de 2 possible (13 = 8 + 4 + 1 → 1101). ' +
          'Le sens inverse somme les poids : 1011 = 8 + 0 + 2 + 1 = 11.</p>',
          '<p><strong>Vers octal et hexa</strong> : passer par le binaire et grouper par 3 bits (octal) ou ' +
          '4 bits (hexa) depuis la droite — complétée à gauche par des zéros. La série de révision du support ' +
          'enchaîne : 1100101011100101011000001<sub>2</sub> se lit par groupes de 4 pour donner l\'hexa, et ' +
          '456A9F<sub>16</sub> se déplie bit à bit avant regroupement par 3 pour donner l\'octal.</p>',
          '<p><strong>Partie fractionnaire</strong> : à droite de la virgule, les poids deviennent ' +
          '2<sup>-1</sup>, 2<sup>-2</sup>, 2<sup>-3</sup>… Pour convertir un décimal fractionnaire, on ' +
          '<em>multiplie par 2</em> et on note les parties entières successives (0,625 → 0,101).</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Grouper les bits depuis la DROITE, en complétant par des zéros à gauche.</li>\n' +
            '      <li>16 chiffres hexa : A=10, B=11, C=12, D=13, E=14, F=15.</li>\n' +
            '      <li>Divisions successives : lire les restes de bas en haut, jamais de haut en bas.</li>\n' +
            '      <li>MSB à gauche, LSB à droite : ne pas inverser les poids.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Codes : BCD et ASCII',
        html: [
          'Le <strong>BCD</strong> (Binary Coded Decimal) code chaque chiffre décimal sur son quartet : ' +
          '259 → 0010 0101 1001. Simple à lire, il gaspille des combinaisons (un quartet de 4 bits offre 16 ' +
          'valeurs pour 10 chiffres) et sert surtout aux afficheurs. Le <strong>code ASCII</strong> code les ' +
          'caractères sur 7 bits (128 valeurs) : « A » = 65 = 1000001, « a » = 97, « 0 » = 48 — c\'est la ' +
          'passerelle entre texte et binaire, étendue aujourd\'hui par l\'UTF-8.'
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Un octet contient…', opts: ['4 bits', '8 bits', '16 bits'], correct: 1, exp: 'Huit bits ; le quartet en vaut quatre.' },
      { q: 'Le bit de poids fort s\'appelle…', opts: ['LSB', 'MSB', 'MBR'], correct: 1, exp: 'Most Significant Bit, à gauche du mot.' },
      { q: '13 en binaire vaut…', opts: ['1011', '1101', '1110'], correct: 1, exp: '13 = 8 + 4 + 1 = 1101.' },
      { q: '101011 en décimal vaut…', opts: ['41', '43', '45'], correct: 1, exp: '32 + 8 + 2 + 1 = 43.' },
      { q: 'Pour lire l\'hexa, on groupe le binaire par…', opts: ['3 bits', '4 bits', '8 bits'], correct: 1, exp: '2^4 = 16 : un quartet par chiffre hexa.' },
      { q: 'F en hexadécimal vaut…', opts: ['14', '15', '16'], correct: 1, exp: 'A=10 … F=15.' },
      { q: '0,101 en binaire vaut…', opts: ['0,625', '0,5', '0,75'], correct: 0, exp: '0,5 + 0 + 0,125 = 0,625.' },
      { q: 'En BCD, le nombre 259 s\'écrit…', opts: ['un octet unique', 'trois quartets 0010 0101 1001', '100000011'], correct: 1, exp: 'Chaque chiffre décimal a son quartet.' }
    ],

    pitfalls: [
      'Lire les restes des divisions successives de haut en bas : c\'est de bas en haut.',
      'Grouper depuis la gauche pour l\'octal ou l\'hexa : on groupe depuis la droite.',
      'Oublier que 1 Mo = 1024 Ko quand on mélange bases et capacités.',
      'Confondre BCD (quartet par chiffre décimal) et binaire pur (259 = 100000011).'
    ],

    methodTitle: 'Méthode — convertir sans se tromper',
    method: [
      'Décimal vers base b : divisions successives par b, restes lus de bas en haut.',
      'Base b vers décimal : somme des chiffres multipliés par leur poids.',
      'Binaire vers octal/hexa (et retour) : groupement par 3 ou 4 bits depuis la droite.'
    ],

    summary: [
      'Bit, quartet (4 bits), octet (8 bits) ; MSB à gauche, LSB à droite.',
      'Divisions successives pour décimal → binaire ; somme des poids pour l\'inverse.',
      'Octal et hexa : groupements de 3 et 4 bits depuis la droite.',
      'BCD code chaque chiffre décimal en quartet ; ASCII code les caractères sur 7 bits.'
    ],

    checklist: [
      'Je convertis dans les deux sens entre décimal et binaire.',
      'Je convertis binaire vers octal et hexadécimal (et retour) par groupements.',
      'Je convertis une partie fractionnaire.',
      'Je distingue BCD et binaire pur.'
    ],

    notions: [
      '<strong>Bit</strong> : chiffre binaire, 0 ou 1.',
      '<strong>Quartet</strong> : 4 bits, un chiffre hexadécimal.',
      '<strong>Octet</strong> : 8 bits.',
      '<strong>MSB / LSB</strong> : bit de poids fort / poids faible.',
      '<strong>Divisions successives</strong> : méthode décimal vers base b.',
      '<strong>Groupement par 3 ou 4 bits</strong> : binaire vers octal ou hexa.',
      '<strong>BCD</strong> : chaque chiffre décimal codé sur un quartet.',
      '<strong>ASCII</strong> : code des caractères sur 7 bits (A = 65).'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — refais les divisions successives pas à pas.' },
      { cls: 'mid', text: '50–69 % — entraîne-toi aux groupements 3 et 4 bits.' },
      { cls: 'good', text: '70–89 % — cible les fractions et les allers-retours rapides.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Le poids du MSB d\'un octet ?', a: '2^7 = 128 ; le LSB porte 2^0 = 1.' },
      { q: 'Méthode décimal vers binaire ?', a: 'Divisions successives par 2, restes lus de bas en haut (13 → 1101).' },
      { q: 'Méthode binaire vers hexa ?', a: 'Grouper par 4 bits depuis la droite, chaque groupe devient un chiffre 0-F.' },
      { q: 'Valeurs hexadécimales de A à F ?', a: 'A=10, B=11, C=12, D=13, E=14, F=15.' },
      { q: 'Principe du code BCD ?', a: 'Chaque chiffre décimal est codé sur son quartet : 259 → 0010 0101 1001.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Nombres signés et arithmétique binaire',
    short: 'Nombres signés',
    toc: 'Signe + valeur absolue ; complément à 1 ; complément à 2 ; addition, soustraction, multiplication et division binaires ; débordement.',
    time: '≈ 2 h de travail',

    situation:
      'Un bit ne porte pas de signe moins : il faut une convention pour représenter -5 sur des fils qui ne ' +
      'connaissent que 0 et 1. Le support en donne trois, et le complément à 2 s\'impose partout — processeurs ' +
      'compris — parce qu\'il transforme la soustraction en addition.',

    objectives: [
      'représenter un négatif par signe + valeur absolue et repérer ses deux zéros ;',
      'calculer le complément à 1 (inversion des bits) ;',
      'calculer le complément à 2 et expliquer pourquoi il domine ;',
      'poser addition, soustraction, multiplication et division binaires ;',
      'reconnaître un débordement (carry sortant du mot).'
    ],

    sections: [
      {
        title: 'Signe + valeur absolue',
        html: [
          'Première convention : le <strong>bit de poids fort</strong> devient le bit de signe (0 = positif, ' +
          '1 = négatif), les autres bits gardent la valeur absolue. Sur 4 bits : +5 = 0101, -5 = 1101. Le ' +
          'défaut est immédiat : deux écritures de zéro (0000 et 1000) et une arithmétique non naturelle — ' +
          'l\'addition directe de 0101 et 1101 ne donne pas 0.'
        ].join('\n')
      },
      {
        title: 'Compléments à 1 et à 2',
        html: [
          '<p>Le <strong>complément à 1</strong> inverse tous les bits : le complément à 1 de 0101 est 1010. ' +
          'Il garde encore deux zéros (0000 et 1111) mais prépare la vraie solution.</p>',
          '<p>Le <strong>complément à 2</strong> ajoute 1 au complément à 1 : -5 sur 4 bits = C1(0101) + 1 = ' +
          '1010 + 1 = <strong>1011</strong>. Méthode directe du support : partir de la droite, recopier les ' +
          'bits jusqu\'au premier 1 compris, puis inverser tout ce qui suit. Avantages décisifs : un seul ' +
          'zéro, et la soustraction devient une addition de complément — le processeur n\'a qu\'un additionneur.</p>',
          box('mnemo', 'Mnémotechnique — « on copie, on inverse »', 'pin',
            '    <p>De la droite : tout jusqu\'au premier 1 se recopie, tout après s\'inverse. 0110 → 1010 : ' +
            'le 0 final et son 1 se recopient, le reste bascule.</p>'),
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Complément à 1 : inverser TOUS les bits. À 2 : inverser puis ajouter 1.</li>\n' +
            '      <li>Le bit de poids fort à 1 en complément à 2 annonce un nombre négatif.</li>\n' +
            '      <li>Sur 4 bits, le complément à 2 de 1000 est 1000 : -8 n\'a pas d\'opposé représentable.</li>\n' +
            '      <li>Deux zéros en signe+valeur absolue et complément à 1, un seul en complément à 2.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Opérations arithmétiques',
        html: [
          '<p><strong>Addition</strong> : 0+0=0, 0+1=1, 1+1=0 retenue 1, 1+1+1=1 retenue 1 — les retenues ' +
          'se propagent de droite à gauche. <strong>Soustraction</strong> : additionner le complément à 2 du ' +
          'second opérande ; une retenue finale sortant du mot signe un résultat positif, son absence un ' +
          'résultat négatif déjà en complément à 2.</p>',
          '<p><strong>Multiplication</strong> : comme en décimal, décalages et additions — multiplier par 2^k ' +
          'revient à décaler de k bits vers la gauche. <strong>Division</strong> : soustractions successives ' +
          'et décalages vers la droite. Un <strong>débordement</strong> survient quand le résultat dépasse la ' +
          'capacité du mot : sur 4 bits non signés, 1111 + 0001 donne 10000 — le 1 qui sort est le carry.</p>',
          box('tech', 'Vérifier en Bash', 'terminal',
            '    <ul>\n' +
            '      <li>L\'additionneur de l\'atelier pose 1+1 : observe la retenue se propager.</li>\n' +
            '      <li>Le complément à 2 d\'une valeur v sur 4 bits : ((16 - v) mod 16), reconstruit bit à bit.</li>\n' +
            '      <li>Le carry sortant = total divisé par 16 sur un mot de 4 bits.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'En signe + valeur absolue, le zéro a…', opts: ['une écriture', 'deux écritures', 'trois écritures'], correct: 1, exp: '0000 et 1000 représentent +0 et -0.' },
      { q: 'Le complément à 1 de 0110 vaut…', opts: ['1001', '1010', '0110'], correct: 0, exp: 'On inverse tous les bits.' },
      { q: 'Le complément à 2 de 0110 vaut…', opts: ['1009 impossible', '1010', '1001'], correct: 1, exp: 'C1 = 1001, puis +1 → 1010.' },
      { q: 'En complément à 2, -5 sur 4 bits vaut…', opts: ['1101', '1011', '1010'], correct: 1, exp: 'C1(0101)=1010, +1 → 1011.' },
      { q: '1 + 1 en binaire donne…', opts: ['1', '10', '11'], correct: 1, exp: 'Somme 0, retenue 1 : on écrit 10.' },
      { q: '1111 + 0001 sur 4 bits non signés provoque…', opts: ['rien', 'un débordement', 'une division'], correct: 1, exp: '10000 : le bit qui sort du mot est le carry.' },
      { q: 'Multiplier par 4 revient à…', opts: ['décaler de 2 bits à gauche', 'décaler de 2 bits à droite', 'inverser les bits'], correct: 0, exp: 'Décalage gauche de k bits = multiplication par 2^k.' },
      { q: 'Soustraire revient à…', opts: ['ajouter le complément à 2', 'inverser le signe du mot', 'diviser'], correct: 0, exp: 'Le processeur additionne le complément à 2 : un seul additionneur.' }
    ],

    pitfalls: [
      'Oublier le +1 du complément à 2 : c\'est C1 puis addition de 1.',
      'Inverser avant le premier 1 dans la méthode directe : on recopie jusqu\'à lui compris.',
      'Ignorer une retenue sortante : c\'est un débordement à signaler.',
      'Croire que la soustraction utilise un soustracteur dédié : elle additionne le complément à 2.'
    ],

    methodTitle: 'Méthode — représenter un négatif en trois gestes',
    method: [
      'Écrire la valeur absolue en binaire sur le mot donné.',
      'Inverser tous les bits (complément à 1).',
      'Ajouter 1 (complément à 2) — ou recopier jusqu\'au premier 1 puis inverser.'
    ],

    summary: [
      'Signe + valeur absolue : MSB = signe, deux zéros, arithmétique non naturelle.',
      'Complément à 1 : inversion de tous les bits.',
      'Complément à 2 : C1 + 1 ; un seul zéro ; soustraction = addition du complément.',
      'Retenues de droite à gauche ; décalages pour ×2^k et ÷2^k ; attention au débordement.'
    ],

    checklist: [
      'Je calcule C1 et C2 d\'un mot binaire sans erreur.',
      'J\'explique pourquoi le complément à 2 a gagné.',
      'Je pose une addition binaire avec retenues.',
      'Je repère un débordement et je connais les décalages.'
    ],

    notions: [
      '<strong>Bit de signe</strong> : MSB valant 0 (positif) ou 1 (négatif).',
      '<strong>Complément à 1</strong> : inversion de tous les bits.',
      '<strong>Complément à 2</strong> : complément à 1 + 1 — représentation standard.',
      '<strong>Retenue</strong> : carry propagé lors des additions.',
      '<strong>Débordement</strong> : résultat sortant de la capacité du mot.',
      '<strong>Décalage gauche</strong> : multiplication par 2^k.',
      '<strong>Décalage droite</strong> : division entière par 2^k.',
      '<strong>Un seul zéro</strong> : propriété du complément à 2.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — refais C1 et C2 sur des mots de 4 bits.' },
      { cls: 'mid', text: '50–69 % — entraîne-toi aux additions avec retenues.' },
      { cls: 'good', text: '70–89 % — cible la méthode directe et les débordements.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Complément à 1 d\'un mot ?', a: 'Inverser chaque bit : 0101 devient 1010.' },
      { q: 'Complément à 2 d\'un mot ?', a: 'Inverser tous les bits puis ajouter 1 — ou recopier jusqu\'au premier 1 puis inverser le reste.' },
      { q: 'Pourquoi le complément à 2 ?', a: 'Un seul zéro et la soustraction devient une addition : le processeur n\'a qu\'un additionneur.' },
      { q: 'La table de l\'addition binaire ?', a: '0+0=0 ; 0+1=1 ; 1+1=10 (0, retenue 1) ; 1+1+1=11 (1, retenue 1).' },
      { q: 'Décalage de k bits à gauche ?', a: 'Multiplication par 2^k ; à droite, division entière par 2^k.' }
    ]
  }
];
