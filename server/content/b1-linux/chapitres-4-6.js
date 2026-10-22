/**
 * Chapitres 4 à 6 du cours de Linux B1.
 *
 * Chapitre 4 : Debian 12 (installation, partitionnement, sources.list).
 * Chapitre 5 : utilisateurs, groupes, /etc/passwd et /etc/shadow.
 * Chapitre 6 : droits d'accès et scripts shell (TP2 du support).
 *
 * Les ateliers de code (trois exercices Bash par chapitre) sont injectés avant
 * le QCM par `scripts/generate-code-labs.js` à partir de
 * `server/exercises/b1-linux.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Installer Debian 12',
    short: 'Debian 12',
    toc: 'Choisir une image et un support d’installation, partitionner le disque, configurer les dépôts et le réseau.',
    time: '≈ 2 h de travail',

    situation:
      'La théorie est posée : un arbre, des partitions, des montages. Place à la pratique du TP — ' +
      'installer une vraie distribution, Debian 12, sur une machine ou une machine virtuelle. C’est au ' +
      'cours de cette installation que le chapitre 2 devient concret : les partitions que l’on définit ' +
      'deviennent les points de montage de l’arborescence.',

    objectives: [
      'préparer le support d’installation : image ISO, clé USB amorçable, machine virtuelle ;',
      'dérouler l’installateur Debian : langue, réseau, comptes, partitionnement ;',
      'justifier un schéma de partitionnement avec ses points de montage ;',
      'configurer les dépôts via /etc/apt/sources.list et mettre le système à jour.'
    ],

    sections: [
      {
        title: 'Préparer le support d’installation',
        html: [
          '<p>Debian 12 (nom de code <em>Bookworm</em>) se distribue sous forme d’<strong>image ISO</strong> ' +
          'à télécharger depuis le site officiel. Trois terrains de jeu possibles :</p>',
          '<table>\n' +
          '    <tr><th>Support</th><th>Quand le choisir</th></tr>\n' +
          '    <tr><td>clé USB amorçable</td><td>installation réelle sur un ordinateur dédié</td></tr>\n' +
          '    <tr><td>machine virtuelle</td><td>TP en salle : sans risque pour la machine hôte</td></tr>\n' +
          '    <tr><td>graveur de DVD</td><td>matériel ancien sans amorçage USB</td></tr>\n' +
          '  </table>',
          '<p>L’image <em>netinst</em> est la plus légère : elle installe un système de base puis va chercher ' +
          'les paquets restants sur les <strong>dépôts</strong> en ligne. Une clé USB s’amorce après copie de ' +
          'l’ISO avec un outil dédié ; en VM, il suffit de monter l’ISO dans le lecteur virtuel et de démarrer.</p>',
          box('mnemo', 'Mnémotechnique — « netinst = système minimum + réseau »', 'pin',
            '    <p>netinst installe le <strong>net</strong> minimum et tire le reste du <strong>réseau</strong>. ' +
            'D’où l’importance de la configuration réseau pendant l’installation : sans elle, pas de paquets.</p>')
        ].join('\n')
      },
      {
        title: 'Dérouler l’installateur',
        html: [
          '<p>L’installateur Debian pose les mêmes questions, dans le même ordre :</p>',
          '<pre><code>1. langue, pays, clavier\n' +
          '2. nom de machine (hostname) et domaine\n' +
          '3. comptes : mot de passe root, puis un utilisateur ordinaire\n' +
          '4. horloge et fuseau horaire\n' +
          '5. partitionnement du disque\n' +
          '6. sélection des logiciels (tasksel) et environnement de bureau\n' +
          '7. installateur d’amorçage GRUB\n' +
          '8. redémarrage sur le nouveau système</code></pre>',
          '<p>Deux comptes se créent à cette étape et ils n’ont pas le même rôle : <strong>root</strong>, le ' +
          'super-utilisateur qui a tous les droits (sa maison est <code>/root</code>), et un ' +
          '<strong>utilisateur ordinaire</strong> pour le travail quotidien (sa maison est ' +
          '<code>/home/login</code>). Travailler en root en permanence est une faute d’administration : ' +
          'chaque faute de frappe devient une faute système.</p>',
          box('pitfall', 'Piège — mot de passe root et utilisateur', 'warning',
            '    <p>Retenir lequel des deux mots de passe sert à <code>su</code> (devenir root) et lequel ' +
            'sert à la connexion graphique. Les confondre est la première panne de TP ; l’exercice ' +
            '« audit des comptes » de l’atelier reproduit exactement ce genre de diagnostic.</p>')
        ].join('\n')
      },
      {
        title: 'Partitionner pour Debian',
        html: [
          '<p>Le partitionnement est l’étape où le chapitre 2 s’applique. L’installateur propose : disque ' +
          'entier, disque entier avec LVM, ou manuel. Un schéma pédagogique courant pour un TP :</p>',
          '<pre><code>partition   taille        point de montage\n' +
          '/dev/sda1   ~30 Go        /          (racine, ext4)\n' +
          '/dev/sda2   ~2× la RAM    swap       (échange mémoire)\n' +
          '/dev/sda3   le reste      /home      (données personnelles)</code></pre>',
          '<p>Chaque partition reçoit un <strong>système de fichiers</strong> (ext4 en pratique : journalisé ' +
          'et optimisé) et un <strong>point de montage</strong>. Séparer <code>/home</code> permet de ' +
          'réinstaller le système sans perdre les données personnelles ; le <strong>swap</strong> (échange) ' +
          'est l’espace disque où le noyau déborde quand la mémoire vive sature.</p>',
          box('tech', 'Après l’installation : vérifier le montage', 'terminal',
            '    <p><code>df -h</code> liste les partitions montées et leur occupation ; ' +
            '<code>lsblk</code> montre l’arbre des disques et partitions. Si une partition attendue n’y ' +
            'figure pas, c’est qu’elle n’est pas montée — revérifier <code>/etc/fstab</code>.</p>')
        ].join('\n')
      },
      {
        title: 'Dépôts, sources.list et mise à jour',
        html: [
          '<p>Les paquets viennent de <strong>dépôts</strong> (repositories) décrits dans ' +
          '<code>/etc/apt/sources.list</code> — encore lui, le répertoire de configuration. Une ligne de ' +
          'sources liste une adresse de dépôt, la version (bookworm) et les composantes (main, contrib, ' +
          'non-free) ; il peut être utile de la modifier pour qu’elle pointe vers le dépôt backports ou un ' +
          'miroir proche.</p>',
          '<pre><code>apt update      rafraîchit la liste des paquets disponibles\n' +
          'apt upgrade     installe les mises à jour des paquets installés\n' +
          'apt install X   installe le paquet X et ses dépendances</code></pre>',
          '<p>Après installation, le rituel est immuable : <code>apt update</code> puis ' +
          '<code>apt upgrade</code>. C’est aussi le moment d’installer les outils du cours (vim, git, ' +
          'curl…). La gestion des <strong>utilisateurs et des groupes</strong> — le sujet du chapitre ' +
          'suivant — se fait alors sur un système à jour, en root ou avec <code>sudo</code>.</p>'
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Qu’est-ce que l’image netinst ?', opts: ['Une image complète hors ligne', 'Une image légère qui complète l’installation depuis les dépôts réseau', 'Un outil de gravure'], correct: 1, exp: 'netinst installe un système de base puis télécharge le reste depuis les dépôts.' },
      { stem: 'Quel répertoire décrit les dépôts de paquets ?', opts: ['/etc/apt/sources.list', '/var/apt', '/home/sources'], correct: 0, exp: '/etc/apt/sources.list liste les dépôts : adresse, version, composantes.' },
      { stem: 'Quels comptes crée l’installateur ?', opts: ['Root seulement', 'Un utilisateur ordinaire seulement', 'Root et un utilisateur ordinaire'], correct: 2, exp: 'Root pour l’administration (maison /root) et un utilisateur ordinaire pour le quotidien (/home/login).' },
      { stem: 'Où place-t-on traditionnellement la partition /home ?', opts: ['Sur la même partition que /', 'Sur une partition séparée pour survivre à une réinstallation', 'Dans /tmp'], correct: 1, exp: 'Séparer /home permet de réinstaller le système sans toucher aux données personnelles.' },
      { stem: 'À quoi sert le swap ?', opts: ['À stocker les journaux', 'D’espace d’échange disque quand la RAM sature', 'À accélérer le réseau'], correct: 1, exp: 'Le swap (typiquement deux fois la RAM) est l’espace où le noyau déborde de la mémoire vive.' },
      { stem: 'Que fait apt update ?', opts: ['Il installe les mises à jour', 'Il rafraîchit la liste des paquets disponibles', 'Il nettoie le cache'], correct: 1, exp: 'update actualise la liste ; upgrade applique les mises à jour des paquets installés.' },
      { stem: 'Que signifie le nom de code Bookworm ?', opts: ['La version stable de Debian 12', 'Un outil de partitionnement', 'Le noyau Linux de Debian'], correct: 0, exp: 'Chaque version stable de Debian porte un nom de code ; Debian 12 est Bookworm.' },
      { stem: 'Pourquoi ne faut-il pas travailler en root en permanence ?', opts: ['C’est plus lent', 'Chaque erreur de frappe devient une faute système aux droits complets', 'Le réseau est désactivé'], correct: 1, exp: 'Root a tous les droits : la moindre commande mal ciblée est irréversible ; on travaille en utilisateur ordinaire et on passe root ponctuellement.' }
    ],

    pitfalls: [
      '<strong>Choisir un ISO complet hors ligne sans le comprendre</strong> : netinst tire du réseau — sans réseau, pas de paquets.',
      '<strong>Confondre les deux mots de passe</strong> : celui de root sert à su, celui de l’utilisateur à la connexion.',
      '<strong>Swap oublié</strong> : sans espace d’échange, la saturation mémoire gèle la machine.',
      '<strong>Points de montage non vérifiés</strong> : df -h après installation est un réflexe, pas une option.',
      '<strong>apt upgrade sans apt update</strong> : la liste des paquets périmée, les mises à jour passent à côté.'
    ],

    methodTitle: 'Installer Debian sans mauvaise surprise',
    method: [
      '<strong>Préparer</strong> : ISO vérifiée, support amorçable ou VM configurée, sauvegarde faite.',
      '<strong>Lire chaque écran</strong> avant de valider — surtout le partitionnement.',
      '<strong>Noter hostname, mot de passe root et utilisateur</strong> au fil de l’eau.',
      '<strong>Justifier le schéma de partitions</strong> : /, swap, /home avec les tailles.',
      '<strong>Terminer par le rituel</strong> : apt update, apt upgrade, vérification df -h.'
    ],

    summary: [
      'Debian 12 « Bookworm » s’installe depuis une ISO netinst, sur clé USB ou en machine virtuelle.',
      'L’installateur crée root (maison /root) et un utilisateur ordinaire (maison /home/login).',
      'Le partitionnement associe à chaque partition un FS (ext4) et un point de montage : /, swap, /home.',
      'Séparer /home survit à une réinstallation ; le swap est l’échange mémoire-disque.',
      'Les dépôts se déclarent dans /etc/apt/sources.list ; le rituel est apt update puis apt upgrade.'
    ],

    checklist: [
      'Je déroule l’installateur en citant chaque étape dans l’ordre.',
      'Je justifie un schéma de partitionnement complet avec tailles et points de montage.',
      'Je distingue les comptes root et utilisateur ordinaire et leurs maisons.',
      'J’explique sources.list et le couple apt update / apt upgrade.'
    ],

    notions: ['ISO', 'netinst', 'machine virtuelle', 'hostname', 'root', 'swap', 'point de montage', 'dépôt', 'sources.list', 'apt'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Redéroule l’installation en machine virtuelle en prenant des notes.' },
      { cls: 'mid', text: '50–69 % — Refaites le schéma de partitionnement avec les tailles justifiées.' },
      { cls: 'good', text: '70–94 % — Solide : explique sources.list ligne par ligne et le couple update/upgrade.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 5, les utilisateurs et les groupes.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que netinst ?', a: 'Une image légère de Debian : système de base installé localement, paquets restants téléchargés depuis les dépôts réseau.' },
      { q: 'Schéma de partitionnement typique d’un TP Debian ?', a: '/ (racine, ext4), swap (≈ deux fois la RAM), /home séparé pour survivre à une réinstallation.' },
      { q: 'Où déclare-t-on les dépôts ?', a: 'Dans /etc/apt/sources.list : adresse du dépôt, version (bookworm), composantes (main, contrib, non-free).' },
      { q: 'apt update vs apt upgrade ?', a: 'update rafraîchit la liste des paquets disponibles ; upgrade applique les mises à jour des paquets déjà installés.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Utilisateurs, groupes et fichiers de comptes',
    short: 'Comptes',
    toc: 'Le format /etc/passwd, /etc/shadow et /etc/group, créer et modifier des comptes, groupes et appartenances.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Un serveur héberge plusieurs personnes et chaque personne n’a pas les mêmes droits. Linux gère cela ' +
      'avec des comptes et des groupes, décrits dans trois fichiers texte lisibles : /etc/passwd, ' +
      '/etc/shadow, /etc/group. Savoir lire ces lignes — et les produire, comme le font les commandes ' +
      'd’administration — est le cœur de ce chapitre.',

    objectives: [
      'décomposer une ligne de /etc/passwd champ par champ et interpréter le champ mot-de-passe ;',
      'expliquer le rôle de /etc/shadow et /etc/group avec leurs formats ;',
      'créer, modifier et supprimer comptes et groupes (useradd, usermod, userdel, groupadd, groupdel) ;',
      'gérer les mots de passe avec passwd et distinguer UID système et UID humain.'
    ],

    sections: [
      {
        title: 'Le fichier /etc/passwd',
        html: [
          '<p>Le fichier <code>/etc/passwd</code> contient les informations relatives à tous les ' +
          'utilisateurs du système : chaque ligne concerne un utilisateur, les champs sont séparés par le ' +
          'signe deux-points :</p>',
          '<pre><code>login:mot-de-passe:UID:GID:info-utilisateur:répertoire-principal:shell\n' +
          '\n' +
          'alice:x:1000:1000:Alice Diallo:/home/alice:/bin/bash\n' +
          '  │    │    │    │        │                  │           │\n' +
          '  │    │    │    │        │                  │           └ interpréteur lancé après connexion\n' +
          '  │    │    │    │        │                  └ maison de l’utilisateur (généralement /home/toto)\n' +
          '  │    │    │    │        └ nom complet, numéro de poste… (séparés par des virgules)\n' +
          '  │    │    │    └ GID : identifiant du groupe principal\n' +
          '  │    │    └ UID : identifiant numérique unique ; root = 0\n' +
          '  │    └ mot de passe (voir ci-dessous)\n' +
          '  └ identifiant de connexion</code></pre>',
          '<p>Le champ <strong>mot-de-passe</strong> prend plusieurs significations :</p>',
          '<table>\n' +
          '    <tr><th>Valeur</th><th>Signification</th></tr>\n' +
          '    <tr><td><code>*</code></td><td>impossible de s’authentifier avec ce compte</td></tr>\n' +
          '    <tr><td><code>!!</code></td><td>compte désactivé</td></tr>\n' +
          '    <tr><td><code>x</code> ou <code>!</code></td><td>le mot de passe est dans /etc/shadow</td></tr>\n' +
          '    <tr><td>champ vide</td><td>pas de mot de passe pour ce compte</td></tr>\n' +
          '  </table>',
          '<p>Les <strong>UID inférieurs à 1000</strong> sont réservés aux comptes système ; root possède ' +
          'l’UID 0. C’est exactement le seuil que l’exercice « squelette de /etc/passwd » de l’atelier fait ' +
          'manier : compter, filtrer, lister selon l’UID.</p>',
          box('pitfall', 'Piège — pourquoi passwd est lisible par tous', 'warning',
            '    <p><code>/etc/passwd</code> est accessible à tout le monde car certaines commandes ont besoin ' +
            'de la liste des utilisateurs ou de la correspondance login/UID. Les mots de passe chiffrés, ' +
            'eux, ont déménagé dans /etc/shadow — c’est le <code>x</code> du champ.</p>')
        ].join('\n')
      },
      {
        title: '/etc/shadow et /etc/group',
        html: [
          '<p>Le fichier <code>/etc/shadow</code> stocke les mots de passe chiffrés ; il ne peut être lu que ' +
          'par l’administrateur. Cette séparation permet à <code>/etc/passwd</code> de rester lisible tout ' +
          'en protégeant les empreintes.</p>',
          '<p>Le fichier <code>/etc/group</code> décrit les groupes. La syntaxe d’une ligne :</p>',
          '<pre><code>groupe:*:GID:utilisateurs\n' +
          '\n' +
          'dev:*:1010:alice,bob\n' +
          '  │  │   │      │\n' +
          '  │  │   │      └ liste des membres, séparés par des virgules\n' +
          '  │  │   └ identifiant numérique unique du groupe\n' +
          '  │  └ champ historique, vide ou * ou x\n' +
          '  └ nom du groupe</code></pre>',
          box('mnemo', 'Mnémotechnique — « passwd décrit, shadow protège, group regroupe »', 'pin',
            '    <p>Trois fichiers, trois verbes : <strong>décrit</strong> (passwd, lisible par tous), ' +
            '<strong>protège</strong> (shadow, réservé à l’administrateur), <strong>regroupe</strong> ' +
            '(group, la liste des membres par groupe).</p>')
        ].join('\n')
      },
      {
        title: 'Créer, modifier, supprimer des comptes',
        html: [
          '<p>Les commandes d’administration (en root) :</p>',
          '<table>\n' +
          '    <tr><th>Action</th><th>Commande</th><th>Détail</th></tr>\n' +
          '    <tr><td>ajouter un utilisateur</td><td><code>useradd options login</code></td><td>ex. <code>useradd toto</code> crée toto</td></tr>\n' +
          '    <tr><td>supprimer un utilisateur</td><td><code>userdel options login</code></td><td>le répertoire n’est pas supprimé ; ajouter <code>-r</code> pour tout retirer</td></tr>\n' +
          '    <tr><td>modifier un compte</td><td><code>usermod options login</code></td><td>mêmes options que useradd</td></tr>\n' +
          '    <tr><td>changer un mot de passe</td><td><code>passwd options login</code></td><td>ex. <code>passwd toto</code> ; sans login, c’est l’utilisateur courant</td></tr>\n' +
          '  </table>',
          '<p>Exemples de <code>usermod</code> du cours : <code>usermod -d /home/toto -m tutu</code> change ' +
          'le répertoire personnel de tutu en /home/toto en recopiant le contenu de l’ancien dossier et en ' +
          'ajustant les droits ; <code>usermod -l toto tutu</code> renomme l’utilisateur tutu en toto — ce ' +
          'qui suppose que tutu n’est pas connecté au moment de la commande. Pour être effectives, les ' +
          'modifications imposent à l’utilisateur de se déloguer puis reloguer.</p>',
          '<p>Côté consultation : <code>whoami</code> affiche l’identité de l’utilisateur courant ; ' +
          '<code>who</code>, <code>users</code> et <code>w</code> listent les utilisateurs connectés sur la ' +
          'machine. L’administrateur peut changer n’importe quel mot de passe ; un utilisateur normal ne ' +
          'peut changer que le sien (l’ancien lui est alors demandé).</p>'
        ].join('\n')
      },
      {
        title: 'Créer et gérer des groupes',
        html: [
          '<p>Créer un groupe : <code>groupadd option groupe</code> — ex. <code>groupadd modem</code>. Le ' +
          'supprimer : <code>groupdel groupe</code> (ou <code>groupdel GID</code>), avec une contrainte ' +
          'importante : <strong>on ne peut pas supprimer un groupe qui est le groupe principal</strong> d’un ' +
          'utilisateur.</p>',
          '<p>Rattacher un utilisateur à un groupe passe par <code>usermod</code>, et le fichier ' +
          '<code>/etc/group</code> montre alors le login dans la liste des membres. L’atelier simule toute ' +
          'cette chaîne : créer des groupes, y rattacher des utilisateurs, répondre aux requêtes ' +
          'd’appartenance dans l’ordre de création des groupes — le même travail que les commandes réelles, ' +
          'sur une arborescence de texte.</p>',
          box('tech', 'Le cycle complet en une séance', 'terminal',
            '    <p><code>useradd tpsysteme</code> puis <code>useradd userVoisin</code>, vérifier dans ' +
            '<code>/etc/passwd</code>, créer le groupe de projet avec <code>groupadd</code>, y rattacher ' +
            'les deux comptes avec <code>usermod</code>, contrôler dans <code>/etc/group</code>. Ce cycle ' +
            'est exactement celui du TP noté.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Combien de champs dans une ligne /etc/passwd ?', opts: ['5', '7', '9'], correct: 1, exp: 'Sept champs : login, mot-de-passe, UID, GID, info, répertoire principal, shell.' },
      { stem: 'Que signifie le champ x dans /etc/passwd ?', opts: ['Compte désactivé', 'Le mot de passe chiffré est dans /etc/shadow', 'Pas de mot de passe'], correct: 1, exp: 'x ou ! renvoient à /etc/shadow ; !! signifie compte désactivé, * interdit l’authentification.' },
      { stem: 'Quel UID possède root ?', opts: ['1', '0', '1000'], correct: 1, exp: 'root = UID 0 ; les UID inférieurs à 1000 sont réservés aux comptes système.' },
      { stem: 'Quel fichier stocke les mots de passe chiffrés ?', opts: ['/etc/passwd', '/etc/shadow', '/etc/group'], correct: 1, exp: '/etc/shadow, lisible uniquement par l’administrateur.' },
      { stem: 'Que fait usermod -d /home/toto -m tutu ?', opts: ['Renomme tutu en toto', 'Change la maison de tutu en /home/toto en recopiant le contenu', 'Supprimez tutu'], correct: 1, exp: '-d fixe la nouvelle maison et -m y recopie le contenu de l’ancienne en ajustant les droits.' },
      { stem: 'Que fait userdel toto, et que faut-il pour supprimer sa maison ?', opts: ['Tout est supprimé', 'Le compte est supprimé ; ajouter -r pour retirer aussi le répertoire', 'Rien, il faut usermod'], correct: 1, exp: 'userdel ne supprime pas le répertoire personnel ; l’option -r l’ajoute à la suppression.' },
      { stem: 'Quelle commande crée un groupe ?', opts: ['groupadd', 'usermod', 'passwd'], correct: 0, exp: 'groupadd groupe (ex. groupadd modem) ; suppression avec groupdel.' },
      { stem: 'Quand groupdel échoue-t-il ?', opts: ['Si le groupe contient des fichiers', 'Si le groupe est le groupe principal d’un utilisateur', 'Jamais'], correct: 1, exp: 'On ne peut pas supprimer un groupe qui sert de groupe principal à un utilisateur.' },
      { stem: 'Quelle commande affiche l’utilisateur courant ?', opts: ['whoami', 'w', 'users'], correct: 0, exp: 'whoami affiche l’identité de l’utilisateur courant ; who, users et w listent les connectés.' },
      { stem: 'Format d’une ligne /etc/group ?', opts: ['groupe:*:GID:utilisateurs', 'groupe:GID:utilisateurs:*', 'GID:groupe:*:utilisateurs'], correct: 0, exp: 'Nom, champ historique, GID numérique, liste des membres séparés par des virgules.' }
    ],

    pitfalls: [
      '<strong>Sept champs pas huit</strong> : recompter sur une vraie ligne passwd — login, mdp, UID, GID, info, maison, shell.',
      '<strong>UID 1000 dit système</strong> : c’est la frontière ; les comptes système sont en dessous (root = 0).',
      '<strong>userdel -r oublié</strong> : sans -r, la maison reste sur le disque.',
      '<strong>Renommer un utilisateur connecté</strong> : usermod -l exige qu’il soit délogué.',
      '<strong>Confondre whoami et who</strong> : l’un dit qui je suis, l’autre qui est connecté.'
    ],

    methodTitle: 'Lire et manipuler un compte',
    method: [
      '<strong>Découper la ligne passwd</strong> par les deux-points et nommer les sept champs.',
      '<strong>Interpréter le champ mot-de-passe</strong> : *, !!, x/!, vide.',
      '<strong>Classer par UID</strong> : système si &lt; 1000, humain sinon, root = 0.',
      '<strong>Choisir la commande d’administration</strong> : useradd, usermod, userdel, passwd, groupadd, groupdel.',
      '<strong>Vérifier dans les fichiers</strong> : passwd, shadow, group — après chaque opération.'
    ],

    summary: [
      '/etc/passwd : login:mot-de-passe:UID:GID:info:maison:shell — lisible par tous, car les commandes en ont besoin.',
      'Champ mot-de-passe : * (authentification impossible), !! (désactivé), x/! (dans shadow), vide (sans mot de passe).',
      'UID &lt; 1000 = comptes système, root = 0 ; /etc/shadow garde les empreintes, /etc/group les membres.',
      'useradd/userdel -r/usermod/passwd gèrent les comptes ; les modifications imposent déloguer-reloguer.',
      'groupadd/groupdel créent et suppriment ; impossible de supprimer un groupe principal d’un utilisateur.'
    ],

    checklist: [
      'Je décompose une ligne /etc/passwd et je nomme les sept champs.',
      'J’interprète les quatre états du champ mot-de-passe.',
      'Je choisis la bonne commande pour créer, modifier, supprimer un compte ou un groupe.',
      'Je vérifie le résultat dans /etc/passwd, /etc/shadow et /etc/group.'
    ],

    notions: ['compte', 'UID', 'GID', 'compte système', 'shadow', 'groupe principal', 'useradd', 'usermod', 'userdel', 'passwd', 'groupadd'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Recopiez une ligne passwd et nommez chaque champ à voix haute.' },
      { cls: 'mid', text: '50–69 % — Refaites le tableau des états du champ mot-de-passe.' },
      { cls: 'good', text: '70–94 % — Solide : déroulez le cycle useradd, groupadd, usermod, userdel de mémoire.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 6, les droits d’accès et les scripts.' }
    ],

    flashcards: [
      { q: 'Les sept champs de /etc/passwd ?', a: 'login : mot-de-passe : UID : GID : info-utilisateur : répertoire-principal : shell.' },
      { q: 'États du champ mot-de-passe ?', a: '* : authentification impossible ; !! : compte désactivé ; x ou ! : mot de passe dans /etc/shadow ; vide : pas de mot de passe.' },
      { q: 'Où sont les mots de passe chiffrés ?', a: 'Dans /etc/shadow, lisible uniquement par l’administrateur ; /etc/passwd reste lisible pour la correspondance login/UID.' },
      { q: 'usermod -d /home/toto -m tutu fait quoi ?', a: 'Change la maison de tutu en /home/toto, en recopiant l’ancien contenu et en ajustant les droits.' },
      { q: 'Rôle de whoami, who, users, w ?', a: 'whoami : identité courante ; who, users, w : la liste des utilisateurs connectés.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Droits d’accès et scripts shell (TP)',
    short: 'Droits et scripts',
    toc: 'Lire rwxr-xr-x, calculer et modifier les droits (chmod, chown, chgrp), écrire ses premiers scripts Bash.',
    time: '≈ 3 h de travail',

    situation:
      'Dernière ligne droite du TP : comprendre qui peut lire, écrire, exécuter — et pourquoi. Les droits ' +
      'd’accès se lisent sur la sortie de ls -l, se calculent en octal, se modifient avec chmod, chown et ' +
      'chgrp. Puis on assemble tout le semestre dans un script shell : shebang, lecture, boucle, rapport.',

    objectives: [
      'lire une chaîne de droits -rwxr-x--- classe par classe (propriétaire, groupe, autres) ;',
      'convertir entre notation symbolique et octale et inversement ;',
      'modifier droits et propriétés avec chmod (symbolique et octal), chown et chgrp ;',
      'écrire un script shell : shebang, lecture d’entrée, boucle et rapport conditionnel.'
    ],

    sections: [
      {
        title: 'Lire les droits : trois triplets rwx',
        html: [
          '<p>Sur la sortie de <code>ls -l</code>, chaque ligne commence par dix caractères : le type, puis ' +
          'neuf droits en trois triplets — <strong>propriétaire (u)</strong>, <strong>groupe (g)</strong>, ' +
          '<strong>autres (o)</strong> :</p>',
          '<pre><code>- r w x r - x r - -\n' +
          '│  │  │  └── autres (o)      : lecture et… rien, pas d’exécution\n' +
          '│  │  └── groupe (g)         : r-x, lire et exécuter\n' +
          '│  └── propriétaire (u)      : rwx, tout\n' +
          '└── type : - fichier, d répertoire</code></pre>',
          '<p>Chaque position vaut une lettre ou un tiret : <strong>r</strong> (read, 4), ' +
          '<strong>w</strong> (write, 2), <strong>x</strong> (execute, 1). La conversion octale additionne ' +
          'par triplet : <code>rwx</code> = 4+2+1 = 7, <code>r-x</code> = 5, <code>---</code> = 0. Ainsi ' +
          '<code>rwxr-x---</code> se note <code>750</code>.</p>',
          box('mnemo', 'Mnémotechnique — « u go, o stop »', 'pin',
            '    <p>Trois classes dans l’ordre <strong>u, g, o</strong> — le propriétaire, son groupe, puis ' +
            'le reste du monde. Lire de gauche à droite, toujours trois caractères par classe, jamais un ' +
            'de plus. Le tiret à la place d’une lettre = droit absent.</p>')
        ].join('\n')
      },
      {
        title: 'chmod : symbolique et octal',
        html: [
          '<p><code>chmod</code> modifie les droits, dans les deux notations du TP :</p>',
          '<table>\n' +
          '    <tr><th>Notation</th><th>Exemple</th><th>Effet</th></tr>\n' +
          '    <tr><td>symbolique</td><td><code>chmod o-r toto</code></td><td>retire la lecture aux autres</td></tr>\n' +
          '    <tr><td>symbolique</td><td><code>chmod ug=rwx dossier</code></td><td>fixe exactement rwx pour u et g</td></tr>\n' +
          '    <tr><td>octale</td><td><code>chmod 770 toto</code></td><td>rwxrwx--- : tout pour u et g, rien aux autres</td></tr>\n' +
          '  </table>',
          '<p>La forme symbolique combine <strong>classe</strong> (u, g, o, a = toutes), ' +
          '<strong>action</strong> (+ ajouter, - retirer, = fixer exactement) et <strong>lettres</strong> ' +
          '(r, w, x). Les classes se cumulent : <code>ug+x</code> touche le propriétaire et le groupe, ' +
          '<code>go+w</code> le groupe et les autres. L’option <code>-R</code> rend l’opération ' +
          '<strong>récursive</strong> : <code>chmod -R ug=rwx dossier</code> applique les mêmes droits au ' +
          'dossier et à tout son contenu.</p>',
          box('pitfall', 'Piège — = n’ajoute pas', 'warning',
            '    <p>+ ajoute un droit, - en retire un, mais <strong>= fixe la classe exactement</strong> : ' +
            'tout droit non mentionné disparaît. <code>ug=rwx</code> et <code>ug+wx</code> ne donnent pas ' +
            'le même résultat si le groupe avait déjà r. Les exercices de l’atelier testent les deux.</p>')
        ].join('\n')
      },
      {
        title: 'chown et chgrp : changer de propriétaire',
        html: [
          '<p>Chaque fichier a un <strong>propriétaire</strong> et un <strong>groupe propriétaire</strong>, ' +
          'visibles dans <code>ls -l</code>. Le TP les fait manipuler :</p>',
          '<pre><code>chown tpsysteme toto           transfère toto à l’utilisateur tpsysteme\n' +
          'chown -R tpsysteme dossier     récursif : dossier et tout son contenu\n' +
          'chown tpsysteme:root dossier   propriétaire ET groupe en une commande\n' +
          'chgrp tpsysteme toto           change seulement le groupe propriétaire\n' +
          'chgrp -R tpsysteme dossier     récursif, groupe seulement</code></pre>',
          '<p>Après chaque série, le TP fait revérifier avec <code>ls -l</code> et <code>ls -Rl</code> : la ' +
          'preuve se lit sur la sortie, pas dans la tête. Un fichier créé par root appartient à root — tant ' +
          'que chown ne dit pas le contraire, les droits restent ceux de la création.</p>',
          box('tech', 'Le fil du TP2 en résumé', 'terminal',
            '    <p>Créer deux utilisateurs, créer <code>toto</code>, lire ses propriétaires avec ' +
            '<code>ls -l</code>, transférer avec <code>chown</code>, jouer <code>chgrp</code> et ' +
            '<code>chown -R</code> sur un dossier complet, puis <code>chmod o-r</code>, ' +
            '<code>chmod 770</code>, <code>chmod -R ug=rwx</code>. Toute la matière du chapitre en une ' +
            'séance de TP.</p>')
        ].join('\n')
      },
      {
        title: 'Écrire ses premiers scripts Bash',
        html: [
          '<p>Un <strong>script shell</strong> est un fichier texte contenant des commandes. Sa première ' +
          'ligne est le <strong>shebang</strong> : <code>#!/bin/bash</code> — elle indique quel interpréteur ' +
          'exécuter le fichier. S’ajoutent ensuite les lectures d’entrée (<code>read</code>), les variables, ' +
          'les tests (<code>if</code>, <code>case</code>), les boucles (<code>for</code>, ' +
          '<code>while read</code>).</p>',
          '<pre><code>#!/bin/bash\n' +
          'read -r n\n' +
          'ok=0\n' +
          'for ((i=0; i&lt;n; i++)); do\n' +
          '  read -r niveau\n' +
          '  if [ "$niveau" = "OK" ]; then ok=$((ok + 1)); fi\n' +
          'done\n' +
          'echo "ok : $ok"\n' +
          '[ "$ok" -ge 1 ] &amp;&amp; echo "surveillance" || echo "nominal"</code></pre>',
          '<p>Les mêmes réflexes qu’en Python dans ce cours : lire les entrées <strong>dans l’ordre de ' +
          'l’énoncé</strong>, initialiser les compteurs <strong>avant</strong> la boucle, afficher le bilan ' +
          '<strong>après</strong>. Les tests comparent la sortie exactement : un espace de trop dans ' +
          '<code>echo "ok : $ok"</code> est une faute.</p>',
          box('objectifs', 'Ce que l’atelier fait tourner réellement', 'target',
            '    <p>Chaque chapitre de ce cours se termine par trois exercices Bash exécutés dans la page : ' +
            'chemins et arborescence (chapitre 1 et 2), recherche et liens (chapitre 3), comptes simulés ' +
            '(chapitre 5), droits et rapports (chapitre 6). Le même bash que celui de la salle TP — seule ' +
            'la machine change.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Dans -rwxr-x---, que peut faire le groupe ?', opts: ['Tout', 'Lire et exécuter', 'Rien'], correct: 1, exp: 'Le triplet du groupe est r-x : lecture et exécution, pas d’écriture.' },
      { stem: 'Que vaut rwxr-x--- en octal ?', opts: ['754', '750', '740'], correct: 1, exp: 'rwx=7, r-x=5, ---=0 : 750.' },
      { stem: 'Que fait chmod o-r toto ?', opts: ['Ajoutez la lecture aux autres', 'Retire la lecture aux autres', 'Retire la lecture au propriétaire'], correct: 1, exp: 'o = autres (others), - = retirer, r = lecture.' },
      { stem: 'Que fixe chmod 770 toto ?', opts: ['rwxrwx---', 'rwx------', 'rwxr-xr-x'], correct: 0, exp: '7=rwx pour u, 7=rwx pour g, 0=--- pour o.' },
      { stem: 'Quelle différence entre ug=rwx et ug+x ?', opts: ['Aucune', '= fixe exactement (retire le reste), + ajoute seulement', '+ fixe, = ajoute'], correct: 1, exp: 'Avec =, tout droit non listé disparaît ; + ne fait qu’ajouter au droit existant.' },
      { stem: 'Que fait chown tpsysteme:root dossier ?', opts: ['Change le propriétaire seulement', 'Change propriétaire et groupe en une commande', 'C’est une erreur'], correct: 1, exp: 'La syntaxe utilisateur:groupe change les deux à la fois.' },
      { stem: 'À quoi sert l’option -R de chmod ou chown ?', opts: ['À rendre le fichier exécutable', 'À appliquer récursivement au dossier et à son contenu', 'À rien ici'], correct: 1, exp: '-R descend dans l’arborescence : dossier, sous-dossiers, fichiers.' },
      { stem: 'Que fait chgrp tpsysteme toto ?', opts: ['Change le propriétaire de toto', 'Change le groupe propriétaire de toto', 'Créez le groupe tpsysteme'], correct: 1, exp: 'chgrp (change group) ne touche que le groupe ; chown change le propriétaire.' },
      { stem: 'À quoi sert la ligne #!/bin/bash ?', opts: ['À commenter le script', 'À indiquer l’interpréteur qui exécute le script', 'À définir une variable'], correct: 1, exp: 'Le shebang désigne l’interpréteur : bash ici.' },
      { stem: 'Où initialiser un compteur utilisé dans une boucle Bash ?', opts: ['Dans la boucle', 'Avant la boucle', 'Après la boucle'], correct: 1, exp: 'Avant, sinon il repart à zéro à chaque tour ; le bilan s’affiche après la boucle.' }
    ],

    pitfalls: [
      '<strong>Lire quatre caractères pour un triplet</strong> : trois par classe, toujours.',
      '<strong>Additionner 7+5+0</strong> : l’octal se calcule par triplet, pas en additionnant les classes.',
      '<strong>Confondre + et =</strong> : = remplace toute la classe, + ajoute un droit.',
      '<strong>chown et chgrp intervertis</strong> : chown change le propriétaire, chgrp le groupe.',
      '<strong>Bilan affiché dans la boucle</strong> : le rapport s’écrit après, avec les compteurs finaux.'
    ],

    methodTitle: 'Résoudre un exercice de droits',
    method: [
      '<strong>Séparer les dix caractères</strong> : type puis trois triplets u, g, o.',
      '<strong>Convertir triplet par triplet</strong> : r=4, w=2, x=1, tiret=0.',
      '<strong>Traduire l’opération</strong> : + ajoute, - retire, = fixe exactement ; -R pour la récursion.',
      '<strong>Choisir la commande</strong> : chmod pour les droits, chown le propriétaire, chgrp le groupe.',
      '<strong>Vérifier sur ls -l</strong> : la preuve est dans la sortie, jamais dans l’intuition.'
    ],

    summary: [
      'Dix caractères : un type (- ou d) puis neuf droits en triplets u, g, o.',
      'r=4, w=2, x=1 : rwx=7, r-x=5, rw-=6, ---=0 ; rwxr-x--- = 750.',
      'chmod symbolique (u/g/o/a + ou - ou =, lettres rwx) ou octal (770) ; -R rend l’opération récursive.',
      'chown change le propriétaire (utilisateur:groupe en une fois), chgrp le groupe ; ls -l et ls -Rl vérifient.',
      'Un script Bash commence par #!/bin/bash : read, boucles, tests, puis le bilan après la boucle.'
    ],

    checklist: [
      'Je lis une chaîne de droits et je décris ce que chaque classe peut faire.',
      'Je convertis symbolique → octal et octal → symbolique sans erreur.',
      'J’applique chmod, chown, chgrp avec récursion quand il faut.',
      'J’écris un script avec shebang, lectures ordonnées, boucle et bilan final.'
    ],

    notions: ['droits', 'triplet', 'propriétaire', 'groupe', 'octal', 'chmod', 'chown', 'chgrp', 'récursif', 'shebang', 'script'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refaites le tableau r=4, w=2, x=1 et convertissez dix chaînes.' },
      { cls: 'mid', text: '50–69 % — Refaites les exercices du TP2 avec ls -l à chaque étape.' },
      { cls: 'good', text: '70–94 % — Solide : écrivez le script de surveillance de l’atelier de mémoire.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : le cours est terminé, passez aux examens blancs et au projet.' }
    ],

    flashcards: [
      { q: 'Que signifient les dix caractères de ls -l ?', a: 'Le type (- fichier, d répertoire) puis trois triplets rwx : propriétaire (u), groupe (g), autres (o).' },
      { q: 'Conversion octal : rwx, r-x, rw-, --- ?', a: 'r=4, w=2, x=1 par triplet : 7, 5, 6, 0 — rwxr-x--- vaut donc 750.' },
      { q: 'chmod ug=rwx vs chmod ug+x ?', a: '= fixe exactement la classe (le reste disparaît) ; + ajoute un droit sans toucher aux autres.' },
      { q: 'Rôles de chown et chgrp ?', a: 'chown change le propriétaire (et le groupe avec utilisateur:groupe) ; chgrp change seulement le groupe ; -R rend les deux récursifs.' },
      { q: 'Première ligne obligatoire d’un script Bash ?', a: '#!/bin/bash : le shebang, qui désigne l’interpréteur.' }
    ]
  }
];
