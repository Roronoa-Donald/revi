/**
 * Chapitres 1 à 3 du cours de Linux B1.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code (trois
 * exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-linux.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Le système GNU/Linux : histoire, licence, architecture',
    short: 'Le système',
    toc: 'D’UNIX à Linux, les quatre libertés du logiciel libre, distributions, architecture en couches.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'On te confie une machine pour la première fois : avant même d’ouvrir un terminal, il faut savoir ' +
      'ce qu’est un système d’exploitation, d’où vient Linux et pourquoi il est partout — serveurs web, ' +
      'supercalculateurs, box internet, Android. Ce chapitre pose le vocabulaire qui servira dans les ' +
      'cinq suivants : noyau, distribution, licence GPL, architecture logique.',

    objectives: [
      'rappeler les grandes dates d’UNIX et de GNU/Linux, de 1969 à 1991 ;',
      'citer les quatre libertés de la licence GPL et les distinguer d’une licence BSD ;',
      'décrire l’architecture logique d’un système UNIX, du matériel aux applications ;',
      'expliquer ce qu’est une distribution et citer les principales.'
    ],

    sections: [
      {
        "title": "Initiation immédiate : Structure minimale d’un script Bash pour les ateliers",
        "html": "<div class=\"box box--tech\"><div class=\"box__title\">Lire et écrire un court script Bash dès le Chapitre 1 (approfondi au Chapitre 6 §4)</div><p>Dans les ateliers interactifs de ce cours, vos réponses s’exécutent dans un script shell Bash :</p><ul><li><code>#!/bin/bash</code> (le <em>shebang</em> en ligne 1) indique au système d’utiliser l’interpréteur Bash ;</li><li><code>read -r ma_variable</code> lit une ligne de texte sur l’entrée standard et la stocke dans <code>ma_variable</code> ;</li><li><code>echo \"$ma_variable\"</code> affiche le contenu de la variable à l’écran ;</li><li><code>if [ \"$x\" = \"valeur\" ]; then ... else ... fi</code> permet de tester une condition, et <code>case \"$x\" in ... esac</code> de distinguer plusieurs cas.</li></ul></div>"
      },
      {
        title: 'Un système d’exploitation, à quoi ça sert',
        html: [
          '<p>Un <strong>système d’exploitation</strong> (OS, Operating System) est un ensemble de ' +
          'programmes qui gère l’ordinateur et ses périphériques : il sert d’interface entre le matériel ' +
          '(hardware) et les logiciels (software). Windows, macOS et Linux sont trois systèmes ' +
          'd’exploitation concurrents qui remplissent le même rôle.</p>',
          '<table>\n' +
          '    <tr><th>Rôle de l’OS</th><th>Exemple concret</th></tr>\n' +
          '    <tr><td>gestion de la mémoire</td><td>deux programmes tournent en même temps sans s’écraser</td></tr>\n' +
          '    <tr><td>gestion des accès aux périphériques</td><td>l’imprimante, le clavier, le disque sont partagés</td></tr>\n' +
          '    <tr><td>gestion des données sur le disque</td><td>les fichiers ont un nom, un emplacement, des droits</td></tr>\n' +
          '    <tr><td>gestion des programmes</td><td>le processeur est partagé entre les tâches (multitâche)</td></tr>\n' +
          '    <tr><td>gestion de la sécurité</td><td>chaque utilisateur n’accède qu’à ce qui lui est permis</td></tr>\n' +
          '  </table>',
          box('mnemo', 'Mnémotechnique — « le chef d’orchestre »', 'pin',
            '    <p>L’OS ne fait rien d’utile pour l’utilisateur final : il orchestre. Toute action — ouvrir ' +
            'un fichier, imprimer, se connecter — passe par lui. C’est pourquoi l’administrer, comme on ' +
            'va l’apprendre, c’est contrôler toute la machine.</p>')
        ].join('\n')
      },
      {
        title: 'D’UNIX à Linux : les dates à connaître',
        html: [
          '<p>L’histoire commence bien avant Linux :</p>',
          '<pre><code>1969   UNIX naît aux laboratoires Bell (AT&amp;T), écrit en assembleur\n' +
          '       par Ken Thompson et Dennis Ritchie.\n' +
          '1973   UNIX est réécrit en langage C (de Ritchie) : version 4, et devient,\n' +
          '       en principe, portable.\n' +
          '1974   Berkeley (Californie) reçoit la version 4 : naissance de la branche\n' +
          '       BSD, divergente de la branche AT&amp;T.\n' +
          '1980   premières licences de distribution d’UNIX System V aux constructeurs.\n' +
          '1984   Richard M. Stallman lance le projet GNU (« Gnu is not Unix ») :\n' +
          '       un système d’exploitation entièrement libre.\n' +
          '1985   Stallman fonde la FSF (Free Software Foundation) et rédige la GPL.\n' +
          '1991   Linus Torvalds, étudiant finlandais, crée le noyau Linux — contraction\n' +
          '       de « Linus » et « UNIX » — et le place sous licence GPL.</code></pre>',
          '<p>Le noyau de Torvalds comble la pièce manquante du projet GNU : les outils (compilateur ' +
          '<code>gcc</code>, shell <code>bash</code>) existaient déjà. L’ensemble forme un système UNIX ' +
          'complet et libre : <strong>GNU/Linux</strong>.</p>',
          box('tech', 'Deux branches d’UNIX à retenir', 'terminal',
            '    <p><strong>AT&amp;T</strong> (System V) d’un côté, <strong>BSD</strong> (Berkeley Software ' +
            'Distribution) de l’autre : les systèmes UNIX modernes descendent de l’une ou l’autre, ou des ' +
            'deux. Cette double filiation explique les variantes de commandes entre systèmes.</p>')
        ].join('\n')
      },
      {
        title: 'Le logiciel libre et la licence GPL',
        html: [
          '<p>Un <strong>logiciel libre</strong> garantit quatre libertés — numérotées de 0 à 3, comme les ' +
          'indices d’un tableau :</p>',
          '<table>\n' +
          '    <tr><th>Liberté</th><th>Contenu</th></tr>\n' +
          '    <tr><td>0</td><td>utiliser le logiciel quel que soit l’usage</td></tr>\n' +
          '    <tr><td>1</td><td>étudier le fonctionnement du programme et l’adapter à son besoin</td></tr>\n' +
          '    <tr><td>2</td><td>redistribuer des copies pour aider son voisin</td></tr>\n' +
          '    <tr><td>3</td><td>améliorer le programme et diffuser les améliorations à la communauté</td></tr>\n' +
          '  </table>',
          '<p>La <strong>GPL</strong> (General Public License) ajoute le <strong>copyleft</strong> : quiconque ' +
          'redistribue le logiciel — modifié ou non — doit le faire sous les mêmes conditions. Le code source ' +
          'et les libertés sont inséparables. Une licence <strong>BSD</strong>, à l’inverse, autorise la ' +
          'création de versions propriétaires.</p>',
          box('pitfall', 'Piège — libre ne veut pas dire gratuit', 'warning',
            '    <p>« Libre » se définit par les quatre libertés, pas par le prix (free as in freedom, pas ' +
            'free as in beer). En pratique Linux et ses logiciels sont aussi gratuits, mais le contrat de ' +
            'licence porte sur les libertés 0 à 3 — c’est ce que l’examen demande.</p>')
        ].join('\n')
      },
      {
        title: 'Distributions et architecture logique',
        html: [
          '<p>Un <strong>noyau</strong> seul ne suffit pas. Une <strong>distribution</strong> assemble le ' +
          'noyau, les utilitaires, les commandes et les applications pour former un système complet et ' +
          'installable. Les plus utilisées : <strong>Debian</strong> (dont Ubuntu dérive), ' +
          '<strong>RedHat</strong>, <strong>Slackware</strong> (gratuites), SuSE, Mandrake.</p>',
          '<p>L’architecture logique d’un système UNIX s’organise en couches, du bas vers le haut :</p>',
          '<pre><code>applications et commandes de l’utilisateur\n' +
          'shell            interprète les commandes, lance les programmes\n' +
          'bibliothèques    (glibc…) traduisent les appels pour le noyau\n' +
          'noyau (kernel)   gère mémoire, processeur, périphériques, fichiers\n' +
          'matériel         CPU, RAM, disques, cartes réseau</code></pre>',
          '<p>Le <strong>shell</strong> est la couche que l’on manipule en TP : il lit la commande, la ' +
          'comprend et la transmet au système. <code>bash</code> (Bourne Again Shell) est le shell standard ' +
          'de la plupart des distributions — c’est lui que l’on programme dans l’atelier de ce cours.</p>'
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Qui a créé le noyau Linux, et quand ?', opts: ['Ken Thompson, 1969', 'Richard Stallman, 1984', 'Linus Torvalds, 1991'], correct: 2, exp: 'Linus Torvalds, étudiant finlandais, a créé le noyau en 1991 et l’a placé sous licence GPL.' },
      { stem: 'En quel langage UNIX a-t-il été réécrit en 1973 ?', opts: ['En assembleur', 'En langage C', 'En Pascal'], correct: 1, exp: 'Dennis Ritchie a réécrit UNIX en C pour sa version 4, ce qui l’a rendu portable en principe.' },
      { stem: 'Que signifie l’acronyme GNU ?', opts: ['Gnu is not Unix', 'General New Unix', 'GNU Network Utility'], correct: 0, exp: '« Gnu is not Unix » : un acronyme récursif, signature du projet de Stallman (1984).' },
      { stem: 'Combien de libertés la licence GPL garantit-elle ?', opts: ['Trois, numérotées 1 à 3', 'Quatre, numérotées 0 à 3', 'Cinq, numérotées 0 à 4'], correct: 1, exp: 'Libertés 0 (utiliser), 1 (étudier), 2 (redistribuer), 3 (améliorer) — comme les indices d’un tableau.' },
      { stem: 'Quelle différence entre licence GPL et licence BSD ?', opts: ['La GPL est payante', 'La GPL interdit les versions propriétaires (copyleft), la BSD l’autorise', 'Aucune, ce sont les mêmes'], correct: 1, exp: 'Le copyleft de la GPL impose les mêmes conditions à toute redistribution ; la BSD permet des versions propriétaires.' },
      { stem: 'Dans l’architecture logique, que fait le shell ?', opts: ['Il gère la mémoire', 'Il interprète les commandes de l’utilisateur', 'Il remplace le noyau'], correct: 1, exp: 'Le shell lit la commande, l’interprète et transmet les demandes au système via les bibliothèques et le noyau.' },
      { stem: 'Qu’est-ce qu’une distribution Linux ?', opts: ['Une version payante de Linux', 'Un assemblage complet : noyau, utilitaires, commandes, applications', 'Un gestionnaire de téléchargement'], correct: 1, exp: 'Une distribution forme après installation un système complet ; Debian, RedHat et Slackware en sont des exemples.' },
      { stem: 'Quel shell est le standard des distributions actuelles ?', opts: ['csh', 'bash', 'ksh'], correct: 1, exp: 'bash (Bourne Again Shell) est le shell standard, fourni dès l’origine avec les outils GNU.' }
    ],

    pitfalls: [
      '<strong>Confondre Linux et UNIX</strong> : Linux est un noyau né en 1991 ; UNIX date de 1969.',
      '<strong>Attribuer GNU à Torvalds</strong> : le projet GNU est de Stallman (1984) ; le noyau, de Torvalds.',
      '<strong>Décaler les libertés</strong> : elles vont de 0 à 3, pas de 1 à 4.',
      '<strong>Libre = gratuit</strong> : la définition porte sur les libertés, pas sur le prix.',
      '<strong>Oublier le copyleft</strong> : la GPL impose les mêmes conditions à toute redistribution.'
    ],

    methodTitle: 'Réviser l’histoire du système',
    method: [
      '<strong>Reconstruire la frise</strong> 1969, 1973, 1974, 1984, 1985, 1991 avec une phrase par date.',
      '<strong>Associer un nom à chaque étape</strong> : Thompson et Ritchie, Stallman, Torvalds.',
      '<strong>Réciter les quatre libertés</strong> dans l’ordre, avec un exemple chacune.',
      '<strong>Dessiner l’architecture</strong> en couches de mémoire, sans regarder le cours.',
      '<strong>Citer trois distributions</strong> et leur famille (Debian, RedHat, Slackware).'
    ],

    summary: [
      'Un OS gère mémoire, périphériques, données, programmes et sécurité ; il interface matériel et logiciels.',
      'UNIX : 1969 (Bell), réécrit en C en 1973, branche BSD dès 1974, System V licencié en 1980.',
      'GNU (Stallman, 1984) fournit les outils libres ; le noyau Linux (Torvalds, 1991) complète le système.',
      'La GPL garantit les libertés 0 à 3 et impose le copyleft ; la BSD tolère le propriétaire.',
      'Une distribution = noyau + utilitaires + commandes + applications ; bash est le shell standard.'
    ],

    checklist: [
      'Je situe 1969, 1984 et 1991 sur une frise et nomme les acteurs.',
      'Je récite les quatre libertés de la GPL avec leur numéro.',
      'Je dessine l’architecture en couches, du matériel aux applications.',
      'J’explique ce qu’est une distribution avec trois exemples.'
    ],

    notions: ['système d’exploitation', 'UNIX', 'GNU', 'GPL', 'copyleft', 'liberté 0-1-2-3', 'noyau', 'distribution', 'shell'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Réécris la frise historique de mémoire, sans le cours.' },
      { cls: 'mid', text: '50–69 % — Récite les quatre libertés avec un exemple concret chacune.' },
      { cls: 'good', text: '70–94 % — Solide : dessine l’architecture en couches et nomme chaque couche.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 2, l’arborescence du système de fichiers.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « système d’exploitation » ?', a: 'On te confie une machine pour la première fois : avant même d’ouvrir un terminal, il faut savoir ce qu’est un système d’exploitation, d’où vient Linux et pourquoi il est partout — serveurs web, supercalculateurs, box internet, Android. Ce chapitre pose le vocabulaire qui servira ' },
      { q: 'Qu’est-ce que « GNU » ?', a: 'rappeler les grandes dates d’UNIX et de GNU/Linux, de 1969 à 1991 ;' },
      { q: 'Qu’est-ce que « chemin absolu » ?', a: 'Le système de fichiers de Linux est hiérarchique : une arborescence de répertoires et de sous-répertoires qui part d’un élément de base noté / — la racine (root directory). Tout chemin absolu commence par ce slash : /etc/passwd , /home/alice/notes.txt .' },
      { q: 'Qu’est-ce que « inode » ?', a: 'expliquer « tout est fichier » et le rôle des inodes et métadonnées ;' },
      { q: 'Qu’est-ce que « journalisation » ?', a: 'journalisation performante, snapshots, défragmentation en ligne (1993)' },
      { q: 'Qu’est-ce que « montage » ?', a: 'Se représenter le montage : un FS se greffe sur un répertoire, comme un volume sur un point.' },
      { q: 'Qu’est-ce que « répertoire courant » ?', a: 'Options et arguments sont tous deux facultatifs : ls seul liste le répertoire courant. Les commandes utiles pour se repérer : pwd affiche l’emplacement courant, cd change de répertoire courant, ls liste les fichiers.' },
      { q: 'Qu’est-ce que « redirection » ?', a: 'redirection : Linux B1 › Sommaire › Chapitre 3' },
      { q: 'Qu’est-ce que « machine virtuelle » ?', a: 'La théorie est posée : un arbre, des partitions, des montages. Place à la pratique du TP — installer une vraie distribution, Debian 12, sur une machine ou une machine virtuelle. C’est au cours de cette installation que le chapitre 2 devient concret : les partitions que l’on défin' },
      { q: 'Qu’est-ce que « hostname » ?', a: 'Noter hostname, mot de passe root et utilisateur au fil de l’eau.' },
      { q: 'Qu’est-ce que « compte système » ?', a: 'compte système : Un serveur héberge plusieurs personnes et chaque personne n’a pas les mêmes droits. Linux gère cela avec des comptes et des groupes, décrits dans trois fichiers texte lisibles : /etc/passwd, /etc/shadow, /etc/group. Savoir lire ces lignes — et les produire, comme le font les comm' },
      { q: 'Qu’est-ce que « groupe principal » ?', a: 'Créer un groupe : groupadd option groupe — ex. groupadd modem . Le supprimer : groupdel groupe (ou groupdel GID ), avec une contrainte importante : on ne peut pas supprimer un groupe qui est le groupe principal d’un utilisateur.' },
      { q: 'Qu’est-ce que « useradd » ?', a: 'créer, modifier et supprimer comptes et groupes (useradd, usermod, userdel, groupadd, groupdel) ;' },
      { q: 'Qui a créé UNIX, quand et où ?', a: 'Ken Thompson et Dennis Ritchie, en 1969, aux laboratoires Bell (AT&T) ; réécrit en C en 1973.' },
      { q: 'Les quatre libertés du logiciel libre ?', a: '0 : utiliser ; 1 : étudier et adapter ; 2 : redistribuer ; 3 : améliorer et diffuser.' },
      { q: 'Que garantit le copyleft de la GPL ?', a: 'Toute redistribution, modifiée ou non, se fait sous les mêmes conditions ; code source et libertés sont inséparables.' },
      { q: 'Qu’est-ce qu’une distribution Linux ?', a: 'Un assemblage complet (noyau, utilitaires, commandes, applications) qui forme un système installable : Debian, RedHat, Slackware…' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Arborescence et système de fichiers',
    short: 'Arborescence',
    toc: 'La racine et les répertoires standard, tout est fichier, systèmes de fichiers, partitions et montage.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Sous Windows, chaque disque a sa lettre : C:, D:. Sous Linux, il n’y a qu’un seul arbre qui part de ' +
      'une racine unique, et tout — documents, périphériques, processus — y prend place comme fichier. ' +
      'Avant de taper la moindre commande, il faut savoir lire cette carte : où vivent les configurations, ' +
      'les répertoires personnels, les fichiers temporaires, les journaux.',

    objectives: [
      'décrire l’arborescence hiérarchique issue de la racine ;',
      'associer chaque répertoire standard (/etc, /home, /var, /tmp…) à son rôle ;',
      'expliquer « tout est fichier » et le rôle des inodes et métadonnées ;',
      'distinguer partition principale, étendue et logique, et monter un système de fichiers.'
    ],

    sections: [
      {
        title: 'Un arbre unique, une racine',
        html: [
          '<p>Le système de fichiers de Linux est <strong>hiérarchique</strong> : une arborescence de ' +
          'répertoires et de sous-répertoires qui part d’un élément de base noté <code>/</code> — la ' +
          '<strong>racine</strong> (root directory). Tout chemin absolu commence par ce slash : ' +
          '<code>/etc/passwd</code>, <code>/home/alice/notes.txt</code>.</p>',
          '<pre><code>/                      la racine : origine de tout\n' +
          '├── boot               noyau et ressources de démarrage\n' +
          '├── dev                fichiers des périphériques (devices)\n' +
          '├── etc                fichiers de configuration du système et des démons\n' +
          '├── home               répertoires personnels des utilisateurs\n' +
          '├── proc               arborescence virtuelle du noyau (lecture seule, sauf /proc/sys)\n' +
          '├── root               répertoire personnel du super-utilisateur\n' +
          '├── tmp                fichiers temporaires, effacés à chaque redémarrage\n' +
          '├── usr                applications, documentation, manuels, librairies\n' +
          '│   └── local          installation des logiciels supplémentaires\n' +
          '├── var                fichiers variables : journaux des démons, spools (mail, impression, cron)\n' +
          '├── bin   et   sbin    binaires indispensables au démarrage et commandes d’administration\n' +
          '└── lib   et   usr/lib librairies nécessaires à ces commandes</code></pre>',
          box('mnemo', 'Mnémotechnique — « etc = étagère de config »', 'pin',
            '    <p>Retenez par contrastes : <code>/etc</code> est <strong>l’étagère de configuration</strong> ' +
            '(celle qu’on sauvegarde pour restaurer une machine), <code>/home</code> <strong>les maisons</strong> ' +
            'des utilisateurs, <code>/tmp</code> <strong>la table qui se débarrasse</strong> au redémarrage, ' +
            '<code>/var</code> <strong>les journaux qui varient</strong>, <code>/root</code> la maison de ' +
            'root — qui n’est pas dans /home.</p>')
        ].join('\n')
      },
      {
        title: 'Tout est fichier',
        html: [
          '<p>Dans les systèmes Linux, <strong>tout est fichier</strong> : contrairement à Windows, un ' +
          'fichier Linux peut être un fichier de données, un périphérique, une partition, un programme en ' +
          'cours d’exécution ou un répertoire. C’est pourquoi les disques vivent dans <code>/dev</code> ' +
          '(devices) : <code>sda</code> pour un disque SCSI, <code>hda</code> pour un disque IDE.</p>',
          '<p>Un fichier est décrit par des propriétés appelées <strong>métadonnées</strong> : sous Linux, ' +
          'l’<strong>inode</strong>. Les données, elles, sont placées dans d’autres blocs du support de ' +
          'stockage. Nom, droits, propriétaire, taille : tout cela vit dans l’inode, pas dans le contenu.</p>',
          box('pitfall', 'Piège — /root n’est pas /', 'warning',
            '    <p>La racine de l’arbre est <code>/</code> ; <code>/root</code> est le répertoire personnel ' +
            'du super-utilisateur. Les deux se prononcent presque pareil et se confondent en examen : ' +
            'la racine n’a pas de nom, /root a un habitant.</p>')
        ].join('\n')
      },
      {
        title: 'Systèmes de fichiers : ext et compagnie',
        html: [
          '<p>Un <strong>système de fichiers</strong> (File System, FS) définit l’organisation des données ' +
          'sur un support de stockage : comment sont gérés et organisés les fichiers par l’OS. Les ' +
          'principaux sous Linux :</p>',
          '<table>\n' +
          '    <tr><th>FS</th><th>À retenir</th></tr>\n' +
          '    <tr><td><code>ext2</code></td><td>le FS historique de Linux, aux normes Unix, non journalisé</td></tr>\n' +
          '    <tr><td><code>ext3</code></td><td>successeur d’ext2 (1999), journalisé, convertible depuis ext2 en quelques secondes</td></tr>\n' +
          '    <tr><td><code>ext4</code></td><td>évolution d’ext3, optimisations et rétrocompatibilité</td></tr>\n' +
          '    <tr><td><code>reiserfs</code></td><td>premier FS intégré à Linux, indexation des répertoires, petits fichiers</td></tr>\n' +
          '    <tr><td><code>xfs</code></td><td>journalisation performante, snapshots, défragmentation en ligne (1993)</td></tr>\n' +
          '    <tr><td><code>vfat</code></td><td>FAT de Windows avec noms longs (255 caractères) ; clefs USB et supports amovibles</td></tr>\n' +
          '  </table>',
          '<p>La <strong>journalisation</strong> est le critère qui revient toujours : avant d’écrire, le FS ' +
          'note ce qu’il va faire dans un journal ; après une coupure de courant, il reprend proprement. ' +
          'ext2 ne l’a pas, ext3/ext4/xfs l’ont.</p>'
        ].join('\n')
      },
      {
        title: 'Partitions, montage et occupation',
        html: [
          '<p>À l’installation, un disque n’est ni <strong>partitionné</strong> ni <strong>formaté</strong> : ' +
          'partitionner, c’est définir un ou plusieurs espaces sur le disque ; formater, c’est préparer une ' +
          'partition à recevoir des données avec un système de fichiers défini.</p>',
          '<p>Il existe trois sortes de partitions :</p>',
          '<table>\n' +
          '    <tr><th>Type</th><th>Règle</th></tr>\n' +
          '    <tr><td>principale</td><td>au nombre de quatre maximum ; supporte tous types de FS</td></tr>\n' +
          '    <tr><td>étendue</td><td>ne contient que des partitions logiques ; ne reçoit pas de FS ; suppose une principale</td></tr>\n' +
          '    <tr><td>logique</td><td>contenue dans l’étendue ; sans limite en nombre ; tous types de FS</td></tr>\n' +
          '  </table>',
          '<p>La commande <code>fdisk</code> configure une partition (ex. <code>fdisk /dev/hda</code> pour le ' +
          'premier disque IDE). Pour être utilisé, un système de fichiers doit être <strong>monté</strong> sur ' +
          'un point de l’arborescence : <code>mount /dev/sda1 /mnt/flashdisk</code>, démonter avec ' +
          '<code>umount</code>. Enfin <code>df -h</code> affiche l’occupation des partitions montées et ' +
          '<code>du -ks /usr/local</code> l’espace occupé par une arborescence.</p>',
          box('tech', 'Les descripteurs de disques', 'terminal',
            '    <p>Dans <code>/dev</code>, les disques se nomment <code>hdX</code> (IDE) ou <code>sdX</code> ' +
            '(SCSI), X étant une lettre pour le périphérique : hda = maître du contrôleur primaire, hdd = ' +
            'esclave du secondaire. Un chiffre suit pour la partition : sda1 est la première partition de ' +
            'sda.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Comment note-t-on la racine de l’arborescence Linux ?', opts: ['C:\\', '/', '/root'], correct: 1, exp: 'Un seul arbre part de la racine notée / ; C:\\ est la convention Windows.' },
      { stem: 'Quel répertoire contient les fichiers de configuration du système ?', opts: ['/var', '/etc', '/usr'], correct: 1, exp: '/etc concentre les configurations système et des démons : c’est le répertoire à sauvegarder.' },
      { stem: 'Que contient /tmp, et quelle est sa particularité ?', opts: ['Les comptes utilisateurs ; il est chiffré', 'Les fichiers temporaires ; il est effacé au redémarrage', 'Les journaux ; il grandit sans limite'], correct: 1, exp: 'Espace d’échange temporaire, vidé à chaque reboot.' },
      { stem: 'Où se trouve le répertoire personnel de root ?', opts: ['/home/root', '/root', '/'], correct: 1, exp: '/root est la maison du super-utilisateur, hors de /home.' },
      { stem: 'Que signifie « tout est fichier » sous Linux ?', opts: ['Une formule sans portée', 'Périphériques, partitions, processus sont représentés par des fichiers', 'Les dossiers sont des fichiers texte'], correct: 1, exp: 'Fichiers, périphériques, partitions, programmes en cours, répertoires : tout prend la forme d’un fichier.' },
      { stem: 'Quel est le rôle de l’inode ?', opts: ['Stocker les données du fichier', 'Décrire les métadonnées du fichier', 'Journaliser les écritures'], correct: 1, exp: 'L’inode porte les métadonnées (droits, propriétaire, taille…) ; les données vivent dans d’autres blocs.' },
      { stem: 'Quelle est la principale différence entre ext2 et ext3 ?', opts: ['La vitesse', 'La journalisation', 'Le support des clefs USB'], correct: 1, exp: 'ext3 est la version journalisée d’ext2 ; les deux partagent commandes et manipulations.' },
      { stem: 'Combien de partitions principales au maximum ?', opts: ['Deux', 'Quatre', 'Seize'], correct: 1, exp: 'Quatre principales ; au-delà, il faut une partition étendue contenant des logiques.' },
      { stem: 'Que fait mount /dev/sda1 /mnt/flashdisk ?', opts: ['Formate la partition', 'Monte le FS de sda1 sur le point /mnt/flashdisk', 'Copie sda1 dans /mnt'], correct: 1, exp: 'Monter rend le contenu accessible comme un simple répertoire de l’arborescence.' },
      { stem: 'Quelle commande affiche l’espace occupé par une arborescence ?', opts: ['df -h', 'du -ks', 'mount'], correct: 1, exp: 'du (disk usage) avec -k (kilo-octets) et -s (total) ; df liste, elle, les partitions montées.' }
    ],

    pitfalls: [
      '<strong>Confondre / et /root</strong> : la racine n’a pas de nom ; /root est la maison de root.',
      '<strong>Mettre les journaux dans /etc</strong> : les journaux variables vivent dans /var ; /etc est la configuration.',
      '<strong>Oublier que /tmp se vide</strong> : rien de persistant ne doit y dormir.',
      '<strong>Ext2 dit journalisé</strong> : c’est ext3 qui apporte le journal ; ext2 est le FS historique.',
      '<strong>Cinq partitions principales</strong> : le plafond est quatre ; ensuite, étendue et logiques.'
    ],

    methodTitle: 'Lire une arborescence sans se perdre',
    method: [
      '<strong>Partir de la racine</strong> et demander pour chaque répertoire : qui y vit et pourquoi.',
      '<strong>Classer par nature</strong> : config (/etc), personnel (/home), variable (/var), éphémère (/tmp).',
      '<strong>Vérifier un chemin absolu</strong> : il commence toujours par /.',
      '<strong>Associer disque et descripteur</strong> : sdX/hdX pour le disque, chiffre pour la partition.',
      '<strong>Se représenter le montage</strong> : un FS se greffe sur un répertoire, comme un volume sur un point.'
    ],

    summary: [
      'Un seul arbre part de / ; chaque répertoire standard a un rôle précis et opposable en examen.',
      '/etc : configuration (à sauvegarder) ; /home : utilisateurs ; /tmp : temporaire vidé au reboot ; /var : journaux et spools.',
      'Tout est fichier : périphériques et partitions vivent dans /dev sous les noms hdX/sdX.',
      'L’inode porte les métadonnées ; ext2 non journalisé, ext3 journalisé, ext4 optimisé ; vfat pour les clefs USB.',
      'Quatre partitions principales max, étendue + logiques pour aller plus loin ; mount/umount pour greffer un FS, df/du pour l’occupation.'
    ],

    checklist: [
      'Je dessine l’arborescence de mémoire et place boot, dev, etc, home, proc, root, tmp, usr, var, bin, lib.',
      'Je justifie le rôle de chaque répertoire standard en une phrase.',
      'Je distingue ext2, ext3, ext4 et vfat par leurs propriétés.',
      'Je compte les partitions et j’explique montage et démontage avec mount et umount.'
    ],

    notions: ['racine', 'arborescence', 'chemin absolu', 'inode', 'métadonnées', 'journalisation', 'partition', 'montage', 'df', 'du'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Recopie l’arborescence puis reproduis-la de mémoire trois fois.' },
      { cls: 'mid', text: '50–69 % — Refaites le tableau des répertoires standard avec une phrase par rôle.' },
      { cls: 'good', text: '70–94 % — Solide : explique la journalisation et le trio principal/étendue/logique.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 3, l’installation de Debian 12.' }
    ],

    flashcards: [
      { q: 'Rôle de /etc, /home, /tmp, /var, /root ?', a: 'Configuration du système ; répertoires des utilisateurs ; temporaires effacés au reboot ; journaux et spools variables ; maison du super-utilisateur.' },
      { q: 'Que veut dire « tout est fichier » ?', a: 'Données, périphériques, partitions, processus, répertoires : tout est représenté par un fichier dans l’arborescence.' },
      { q: 'Différence ext2 / ext3 / ext4 ?', a: 'ext2 : historique, non journalisé. ext3 : journalisé, convertible depuis ext2. ext4 : évolution optimisée et rétrocompatible d’ext3.' },
      { q: 'Que font mount, umount, df, du ?', a: 'mount greffe un FS sur un point de l’arbre ; umount le détache ; df affiche l’occupation des partitions montées ; du l’espace pris par une arborescence.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Commandes de base : trouver, manipuler, chercher',
    short: 'Commandes',
    toc: 'Syntaxe d’une commande, navigation et manipulation de fichiers, liens symboliques, find et ses filtres.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le terminal est ouvert, l’invite attend. Tout passe par une ligne de commande : se repérer, lister, ' +
      'créer, copier, déplacer, chercher. Ce chapitre installe la boîte à outils du TP — pwd, cd, ls, ' +
      'mkdir, cp, mv, rm, cat, echo, ln, find — et l’habitude de lire une commande comme une phrase : ' +
      'COMMANDE OPTIONS ARGUMENTS.',

    objectives: [
      'écrire une commande avec sa syntaxe COMMANDE OPTIONS ARGUMENTS ;',
      'naviguer et manipuler fichiers et répertoires avec les commandes de base ;',
      'créer et interpréter un lien symbolique avec ln -s ;',
      'filtrer une recherche avec find et ses critères -name, -type, -size, -user.'
    ],

    sections: [
      {
        title: 'La syntaxe d’une commande',
        html: [
          '<p>Chaque utilisateur connecté dirige la machine en exécutant des commandes dans un terminal. ' +
          'La syntaxe est immuable :</p>',
          '<pre><code>COMMANDE OPTIONS ARGUMENTS\n' +
          'ls      -a      /home\n' +
          '│        │        │\n' +
          '│        │        └── objet(s) sur lesquels la commande agit (facultatif)\n' +
          '│        └── modifie le comportement (facultatif) : -a inclut les fichiers cachés\n' +
          '└── la commande elle-même : lister les fichiers</code></pre>',
          '<p>Options et arguments sont tous deux facultatifs : <code>ls</code> seul liste le répertoire ' +
          'courant. Les commandes utiles pour se repérer : <code>pwd</code> affiche l’emplacement courant, ' +
          '<code>cd</code> change de répertoire courant, <code>ls</code> liste les fichiers.</p>',
          box('mnemo', 'Mnémotechnique — « le verbe, le ton, la cible »', 'pin',
            '    <p>Lire une commande comme une phrase : le <strong>verbe</strong> (la commande), le ' +
            '<strong>ton</strong> (les options, avec un tiret), la <strong>cible</strong> (les arguments). ' +
            'pwd = « où suis-je ? », cd = « va à », ls = « montre-moi ».</p>')
        ].join('\n')
      },
      {
        title: 'Créer, copier, déplacer, supprimer',
        html: [
          '<p>La panoplie de manipulation :</p>',
          '<table>\n' +
          '    <tr><th>Commande</th><th>Rôle</th></tr>\n' +
          '    <tr><td><code>mkdir</code></td><td>créer un répertoire</td></tr>\n' +
          '    <tr><td><code>rmdir</code></td><td>supprimer un répertoire</td></tr>\n' +
          '    <tr><td><code>touch</code></td><td>changer la date de modification d’un fichier — et créer un fichier vide</td></tr>\n' +
          '    <tr><td><code>cp</code></td><td>copier un fichier ou un répertoire</td></tr>\n' +
          '    <tr><td><code>mv</code></td><td>renommer ou déplacer un fichier/repertoire en une seule opération</td></tr>\n' +
          '    <tr><td><code>rm</code></td><td>supprimer un fichier ou un répertoire</td></tr>\n' +
          '    <tr><td><code>cat</code></td><td>afficher le contenu d’un fichier</td></tr>\n' +
          '    <tr><td><code>echo</code></td><td>afficher une ligne — et écrire dans un fichier avec &gt; ou &gt;&gt;</td></tr>\n' +
          '  </table>',
          '<p><code>echo "texte" &gt; fichier</code> <strong>écrase</strong> le contenu ; ' +
          '<code>echo "texte" &gt;&gt; fichier</code> <strong>suffixe</strong> (ajoute à la fin). Et un ' +
          'avertissement du cours qui ne se négocie pas : <code>rm</code> avec <code>-f</code> ou ' +
          '<code>-rf</code> peut endommager, voire supprimer tout le système de fichiers, de manière ' +
          '<strong>irréversible</strong>.</p>',
          box('pitfall', 'Piège — le > et le >>', 'warning',
            '    <p>Un seul chevron &gt; écrase tout le fichier ; deux chevrons &gt;&gt; ajoutent à la fin. ' +
            'Confondre les deux, c’est perdre un fichier de configuration en une commande. En cas de doute, ' +
            'relire la ligne avant de valider.</p>'),
          box('tech', 'Lire un gros fichier : man, more, head, tail', 'terminal',
            '    <p><code>man commande</code> affiche le manuel de n’importe quelle commande (essayer ' +
            '<code>man ls</code>). <code>more</code> montre un fichier page à page, <code>head</code> en ' +
            'montre le début (10 premières lignes par défaut), <code>tail</code> la fin (10 dernières ' +
            'lignes par défaut).</p>')
        ].join('\n')
      },
      {
        title: 'Les liens symboliques',
        html: [
          '<p>La commande <code>ln</code> crée un <strong>lien matériel</strong> ou <strong>symbolique</strong> ' +
          '(raccourci) vers un fichier ou un répertoire. L’option <code>-s</code> (voir <code>man ln</code>) ' +
          'crée le lien symbolique :</p>',
          '<pre><code>echo "contenu" &gt; fichiersource\n' +
          'ln -s fichiersource fichiercible\n' +
          'cat fichiercible          → contenu\n' +
          'echo "contenu2" &gt;&gt; fichiersource\n' +
          'cat fichiercible          → contenu\n' +
          '                            contenu2</code></pre>',
          '<p><code>fichiercible</code> n’est <strong>pas un fichier stocké physiquement</strong> sur le ' +
          'disque : c’est juste un lien vers <code>fichiersource</code>. Toute modification de la source se ' +
          'lit à travers la cible — c’est exactement ce que simule l’exercice « liens symboliques » de ' +
          'l’atelier, en suivant la chaîne de liens jusqu’au fichier réel.</p>'
        ].join('\n')
      },
      {
        title: 'find : chercher selon tous les critères',
        html: [
          '<p>La commande <code>find</code> cherche un fichier sous Linux. Sa syntaxe :</p>',
          '<pre><code>find répertoire critères</code></pre>',
          '<p>Le répertoire est le chemin où la recherche s’exécute ; les critères affinent la recherche. ' +
          'Les options les plus utilisées :</p>',
          '<table>\n' +
          '    <tr><th>Critère</th><th>Filtre</th></tr>\n' +
          '    <tr><td><code>-name</code></td><td>par rapport au nom du fichier</td></tr>\n' +
          '    <tr><td><code>-type</code></td><td>par rapport au type du fichier</td></tr>\n' +
          '    <tr><td><code>-size</code></td><td>par rapport à la taille du fichier</td></tr>\n' +
          '    <tr><td><code>-ctime</code> / <code>-atime</code> / <code>-mtime</code></td><td>création / dernier accès / dernière modification</td></tr>\n' +
          '    <tr><td><code>-user</code> / <code>-group</code></td><td>propriétaire / groupe du fichier</td></tr>\n' +
          '    <tr><td><code>-perm</code></td><td>permissions du fichier</td></tr>\n' +
          '  </table>',
          '<p>Les exercices du cours de TP s’y entraînent : créer <code>fichier1</code>, <code>fichier2</code> ' +
          'et <code>testfichier1</code> dans <code>/tmp</code> puis trouver ceux qui commencent par « fich » ' +
          '(<code>find /tmp -name "fich*"</code>), trouver ceux qui commencent par « fich » ou « test », ' +
          'trouver tous les fichiers (<code>find /tmp -type f</code>). À la maison, l’atelier rejoue ces ' +
          'filtres en Bash sur une arborescence simulée.</p>'
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quelle est la syntaxe générale d’une commande ?', opts: ['COMMANDE ARGUMENTS OPTIONS', 'COMMANDE OPTIONS ARGUMENTS', 'OPTIONS COMMANDE ARGUMENTS'], correct: 1, exp: 'La commande, puis les options (facultatives), puis les arguments (facultatifs) : ls -a /home.' },
      { stem: 'Que fait pwd ?', opts: ['Change de répertoire', 'Affichez l’emplacement courant', 'Liste les fichiers'], correct: 1, exp: 'pwd (print working directory) affiche l’emplacement où l’on se situe dans la hiérarchie.' },
      { stem: 'Quelle commande crée un fichier vide ?', opts: ['mkdir', 'touch', 'cat'], correct: 1, exp: 'touch change la date de modification d’un fichier — et le crée vide s’il n’existe pas.' },
      { stem: 'echo "x" > f et echo "x" >> f : quelle différence ?', opts: ['Aucune', '> écrase, >> ajoute à la fin', '> ajoute, >> écrase'], correct: 1, exp: 'Un chevron écrase le contenu, deux chevrons suffisent au fichier.' },
      { stem: 'Que fait mv fichier3 /home/fichier4 ?', opts: ['Copie fichier3', 'Renomme et déplace fichier3 en /home/fichier4 en une seule fois', 'Supprimez fichier3'], correct: 1, exp: 'mv renomme ou déplace : renommer est un déplacement dans le même répertoire.' },
      { stem: 'Pourquoi rm -rf est-elle dangereuse ?', opts: ['Elle est lente', 'Elle peut supprimer tout le système de fichiers, irréversiblement', 'Elle chiffre les fichiers'], correct: 1, exp: 'Le cours l’avertit : avec -f ou -rf, rm peut endommager voire détruire le système de fichiers sans retour.' },
      { stem: 'Quelle option de ln crée un lien symbolique ?', opts: ['-a', '-s', '-l'], correct: 1, exp: 'ln -s crée un lien symbolique (raccourci) au lieu d’un lien physique ; c’est documenté dans man ln.' },
      { stem: 'Après modification de la source, que voit-on via le lien symbolique ?', opts: ['L’ancien contenu', 'Le contenu mis à jour de la source', 'Une erreur'], correct: 1, exp: 'La cible n’est pas un fichier stocké : elle pointe vers la source et reflète son contenu courant.' },
      { stem: 'Que fait find /tmp -type f ?', opts: ['Liste les répertoires de /tmp', 'Trouve tous les fichiers de /tmp', 'Vide /tmp'], correct: 1, exp: '-type f filtre sur les fichiers ordinaires ; sans critère, find listerait tout.' },
      { stem: 'Quel critère de find filtre par propriétaire ?', opts: ['-name', '-user', '-perm'], correct: 1, exp: '-user filtre par propriétaire (-group par groupe, -perm par permissions).' }
    ],

    pitfalls: [
      '<strong>Confondre cd et pwd</strong> : l’un déplace, l’autre affiche.',
      '<strong>Chevron unique par habitude</strong> : > écrase un fichier existant sans avertissement.',
      '<strong>Supprimer avec rm sans réfléchir</strong> : -f / -rf sont irréversibles.',
      '<strong>Ln sans -s attendu symbolique</strong> : sans option, ln crée un lien physique.',
      '<strong>find sans répertoire</strong> : la syntaxe demande le chemin où chercher, puis les critères.'
    ],

    methodTitle: 'Construire une ligne de commande fiable',
    method: [
      '<strong>Nommer l’intention</strong> : chercher, créer, copier, déplacer, supprimer, afficher.',
      '<strong>Choisir le verbe</strong> (la commande) avant les options : find, touch, cp, mv, rm, cat.',
      '<strong>Ajouter les options</strong> qui affinent : -a pour les cachés, -s pour un lien symbolique.',
      '<strong>Cibler précisément</strong> : chemin absolu quand le contexte change, relatif sinon.',
      '<strong>Relire avant de valider</strong> — surtout si la ligne contient rm ou &gt;.'
    ],

    summary: [
      'COMMANDE OPTIONS ARGUMENTS : ls -a /home — verbe, ton, cible.',
      'pwd affiche, cd déplace, ls liste ; mkdir/rmdir et touch gèrent répertoires et fichiers vides.',
      'cp copie, mv renomme/déplace, rm supprime — -f/-rf sont irréversibles.',
      'echo avec &gt; écrase, avec &gt;&gt; il ajoute ; cat, more, head, tail lisent ; man documente tout.',
      'ln -s crée un lien symbolique qui reflète la source ; find répertoire critères cherche par -name, -type, -size, -user, -perm.'
    ],

    checklist: [
      'Je décompose une commande en commande, options, arguments.',
      'Je crée, copie, déplace, supprime sans ambiguïté (touch, cp, mv, rm).',
      'Je crée un lien symbolique et j’explique ce qu’il reflète.',
      'Je construis une recherche find avec les critères -name, -type, -size, -user.'
    ],

    notions: ['commande', 'option', 'argument', 'répertoire courant', 'lien symbolique', 'find', 'critère', 'redirection', 'manuel'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refaites le tableau des commandes avec un exemple par ligne.' },
      { cls: 'mid', text: '50–69 % — Entraînez-vous à écrire les commandes des exercices find du TP.' },
      { cls: 'good', text: '70–94 % — Solide : décris ce que voit cat fichiercible après chaque modification.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 4, la installation de Debian 12.' }
    ],

    flashcards: [
      { q: 'Syntaxe d’une commande Unix ?', a: 'COMMANDE OPTIONS ARGUMENTS — ex. ls -a /home : lister /home en incluant les fichiers cachés.' },
      { q: 'touch, cp, mv, rm : rôles ?', a: 'touch : créer (ou dater) un fichier ; cp : copier ; mv : renommer/déplacer ; rm : supprimer (-rf irréversible).' },
      { q: '> et >> avec echo ?', a: '> écrase le contenu du fichier ; >> ajoute (suffixe) à la fin.' },
      { q: 'Comment fonctionne ln -s ?', a: 'Il crée un lien symbolique, raccourci qui n’est pas stocké physiquement : il reflète toujours le contenu courant de la source.' },
      { q: 'Syntaxe et critères de find ?', a: 'find répertoire critères ; -name, -type, -size, -ctime/-atime/-mtime, -user, -group, -perm.' }
    ]
  }
];
