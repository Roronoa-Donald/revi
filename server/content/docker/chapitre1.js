/**
 * Chapitre 1 du cours « Docker B2 » — Fondements des Conteneurs, Isolation Linux &amp; Architecture Docker.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondements des Conteneurs, Isolation Linux &amp; Architecture Docker',
  short: 'Fondements &amp; Architecture',
  toc: 'Origine de la conteneurisation, comparaison rigoureuse VM vs Conteneur, primitives du noyau Linux (Namespaces, Cgroups, chroot/pivot_root), composants du moteur Docker (CLI, dockerd, containerd, containerd-shim, runc) et standards OCI.',
  time: '≈ 2 h 45 de travail',
  free: true,

  situation:
    'Pendant des décennies, le déploiement d’applications en entreprise souffrait du syndrome classique ' +
    '« mais pourtant ça marchait sur ma machine ! ». Deux approches coexistaient : le déploiement direct ' +
    'sur serveur physique (générant des conflits inextricables de versions de bibliothèques et de dépendances) ' +
    'ou la virtualisation lourde par hyperviseur (VMware, VirtualBox), où chaque instance duplique un système ' +
    'd’exploitation complet de plusieurs gigaoctets avec son propre noyau et des minutes de temps de démarrage. ' +
    'L’avènement de Docker en 2013 a révolutionné cette industrie en démocratisant les fonctionnalités d’isolation ' +
    'natives du noyau Linux. Ce premier module pose les fondations théoriques et architecturales indispensables : ' +
    'comprendre comment le système d’exploitation isole les processus sans hyperviseur et comment s’articulent ' +
    'les briques internes de la pile Docker moderne conforme aux standards ouverts OCI.',

  objectives: [
    'comprendre l’évolution historique de l’hébergement applicatif (bare-metal, VM, conteneurs) ;',
    'comparer avec précision les architectures et coûts de ressources entre machine virtuelle et conteneur ;',
    'maîtriser le fonctionnement des 6 Namespaces fondamentaux du noyau Linux (PID, NET, MNT, IPC, UTS, USER) ;',
    'comprendre le rôle des Control Groups (cgroups v1 et v2) dans la régulation CPU, mémoire et E/S ;',
    'décortiquer l’architecture modulaire de Docker : du client CLI jusqu’au runtime OCI runc via containerd ;',
    'exécuter et inspecter ses premiers conteneurs en ligne de commande de manière méthodique.'
  ],

  sections: [
    {
      title: 'De la Machine Virtuelle au Conteneur Léger',
      html: [
        '<p>Pour comprendre la valeur ajoutée de Docker, il est essentiel d’opposer la virtualisation système ' +
        'à la virtualisation au niveau du système d’exploitation :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Machine Virtuelle (Virtualisation Lourde)</h4>',
        '    <ul>',
        '      <li><strong>Hyperviseur :</strong> Type 1 (KVM, ESXi) ou Type 2 (VirtualBox) qui émule du matériel virtuel (CPU, RAM, contrôleurs disques).</li>',
        '      <li><strong>Guest OS complet :</strong> Chaque VM embarque son propre noyau Linux ou Windows, ses démons systèmes (systemd, udev), et ses pilotes.</li>',
        '      <li><strong>Empreinte :</strong> Plusieurs gigaoctets par instance, démarrage en plusieurs dizaines de secondes, overhead CPU/RAM de 10 à 25 %.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Conteneur Docker (Isolation Noyau Légère)</h4>',
        '    <ul>',
        '      <li><strong>Moteur de conteneurisation :</strong> Pas d’émulation matérielle ni d’hyperviseur.</li>',
        '      <li><strong>Partage du noyau :</strong> Tous les conteneurs s’exécutent directement sur le noyau de la machine hôte.</li>',
        '      <li><strong>Empreinte :</strong> Quelques mégaoctets, démarrage quasi instantané en quelques millisecondes, performances quasi natives (overhead &lt; 1 %).</li>',
        '    </ul>',
        '  </div>',
        '</div>',

        box(
          'tip',
          'Un conteneur est un processus Linux isolé',
          '<p>Contrairement à une idée reçue tenace, un conteneur n’est pas une « petite machine virtuelle ». ' +
          'Sur le serveur hôte, un conteneur n’est rien d’autre qu’un <strong>processus Linux standard</strong> ' +
          'auquel le noyau a appliqué des filtres de visibilité (Namespaces) et des plafonds de ressources (Cgroups).</p>'
        )
      ].join('\n')
    },
    {
      title: 'Les Primitives du Noyau Linux : Namespaces &amp; Cgroups',
      html: [
        '<p>Docker ne réinvente pas l’isolation : il orchestre avec élégance des fonctionnalités ' +
        'intégrées au noyau Linux depuis les années 2000 :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Primitive Noyau</th>',
        '      <th>Type</th>',
        '      <th>Fonction &amp; Espace Isolé</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>PID Namespace</strong></td>',
        '      <td>Isolation</td>',
        '      <td>Isole l’arborescence des processus. Le processus principal du conteneur se voit comme PID 1 (processus initial), alors qu’il possède un PID standard (ex: 28412) sur l’hôte.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>NET Namespace</strong></td>',
        '      <td>Isolation</td>',
        '      <td>Fournit au conteneur sa propre pile réseau : interface de boucle locale <code>lo</code>, interface virtuelle <code>eth0</code>, table de routage et ports TCP/UDP dédiés.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>MNT Namespace</strong></td>',
        '      <td>Isolation</td>',
        '      <td>Isole les points de montage du système de fichiers. Combiné à <code>pivot_root</code>, le conteneur ne voit que son propre système de fichiers racine sans accéder à l’arborescence de l’hôte.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>IPC Namespace</strong></td>',
        '      <td>Isolation</td>',
        '      <td>Isole les mécanismes de communication inter-processus (mémoire partagée POSIX, sémaphores, files de messages).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>UTS Namespace</strong></td>',
        '      <td>Isolation</td>',
        '      <td>Permet au conteneur de définir son propre nom d’hôte (hostname) et nom de domaine indépendant de la machine physique.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>USER Namespace</strong></td>',
        '      <td>Isolation</td>',
        '      <td>Mappe les UID/GID : permet d’être root (UID 0) à l’intérieur du conteneur tout en étant un simple utilisateur non-privilégié (ex: UID 100000) sur la machine hôte.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Cgroups (Control Groups)</strong></td>',
        '      <td>Régulation</td>',
        '      <td>Contrôle et plafonne l’utilisation des ressources matérielles : limitation de mémoire vive (RAM), quotas de temps processeur (CPU) et débits disques (I/O).</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Architecture Interne du Moteur Docker et Standards OCI',
      html: [
        '<p>À l’origine, Docker était un démon monolithique écrit en Go. Pour favoriser la standardisation industrielle, ' +
        'l’architecture a été scindée en briques modulaires sous l’égide de l’<strong>Open Container Initiative (OCI)</strong> :</p>',

        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Client CLI &amp; Docker Daemon</h4>',
        '    <p>Le client <code>docker</code> transmet les ordres utilisateur via l’API REST (par défaut via la socket UNIX <code>/var/run/docker.sock</code>). ' +
        '    Le démon <code>dockerd</code> gère les images, les volumes de stockage, les réseaux virtuels et l’authentification.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. containerd &amp; containerd-shim</h4>',
        '    <p><code>containerd</code> est le superviseur industriel de conteneurs. Il gère le cycle de vie et le téléchargement des images. ' +
        '    Pour chaque conteneur actif, un processus léger <code>containerd-shim</code> reste actif pour gérer les entrées/sorties et préserver ' +
        '    le conteneur si le démon Docker doit redémarrer (Live Restore).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. runc (OCI Runtime)</h4>',
        '    <p><code>runc</code> est l’implémentation de référence universelle du standard OCI. Écrit en Go, il dialogue directement ' +
        '    avec les appels système du noyau Linux pour configurer les namespaces, appliquer les cgroups et exécuter le binaire de l’application.</p>',
        '  </div>',
        '</div>',

        box(
          'important',
          'La Socket Docker et Risque de Sécurité',
          '<p>Le fichier <code>/var/run/docker.sock</code> est le point d’accès direct à l’API Docker. ' +
          'Tout utilisateur ayant un accès en écriture sur cette socket (ou membre du groupe système <code>docker</code>) ' +
          'peut instantanément s’octroyer les privilèges superutilisateur root sur l’hôte physique en lançant un conteneur privilégié ' +
          'qui monte la racine du système (<code>-v /:/host</code>). Ne montez JAMAIS la socket Docker dans des conteneurs non fiables.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Premières Manipulations et Commandes de Base',
      html: [
        '<p>Pour démarrer avec le client Docker, quatre commandes fondamentales constituent le socle du quotidien :</p>',

        '<ul>',
        '  <li><code>docker run --rm hello-world</code> : télécharge une image minimale, crée le conteneur, l’exécute et le détruit automatiquement après affichage.</li>',
        '  <li><code>docker ps -a</code> : liste l’intégralité des conteneurs (actifs et arrêtés) avec leur identifiant (CONTAINER ID), leur statut et leurs ports.</li>',
        '  <li><code>docker images</code> : affiche les images locales stockées dans le cache du démon avec leurs tags et leur taille.</li>',
        '  <li><code>docker inspect &lt;id_conteneur&gt;</code> : inspecte l’objet conteneur et renvoie l’intégralité de sa configuration bas niveau au format JSON.</li>',
        '</ul>'
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole de Démarrage et d’Inspection d’un Conteneur Docker',
  method: [
    'Étape 1 — Vérifier le statut du service Docker : S’assurer que le démon dockerd est actif avec la commande « systemctl status docker » ou « docker info ».',
    'Étape 2 — Télécharger une image officielle : Rapatrier l’image minimale Alpine Linux avec « docker pull alpine:3.18 ».',
    'Étape 3 — Lancer un conteneur interactif : Exécuter « docker run -it --name mon_test alpine:3.18 /bin/sh » pour obtenir une invite de commande isolée.',
    'Étape 4 — Observer l’isolation des processus : Taper « ps aux » à l’intérieur du conteneur et constater que seul le shell /bin/sh s’exécute avec le PID 1.',
    'Étape 5 — Observer l’isolation depuis l’hôte : Ouvrir un second terminal sur la machine hôte et chercher le processus avec « pgrep -a sh » pour voir son vrai PID système.',
    'Étape 6 — Nettoyer les ressources : Quitter le conteneur avec « exit » et détruire le conteneur arrêté avec « docker rm mon_test ».'
  ],

  summary: [
    'Un conteneur Docker est un processus Linux isolé partageant le noyau hôte, sans couche d’émulation matérielle ni Guest OS.',
    'Les Namespaces créent des cloisons virtuelles d’espace de noms (PID, NET, MNT, IPC, UTS, USER).',
    'Les Cgroups (Control Groups) plafonnent et mesurent la consommation matérielle (CPU, RAM, débits E/S).',
    'L’architecture moderne découple le client CLI, le démon dockerd, le superviseur containerd et le runtime OCI runc.',
    'Le composant containerd-shim permet aux conteneurs de continuer à tourner sans interruption même si le démon Docker redémarre.',
    'L’accès en écriture à /var/run/docker.sock équivaut à un accès root complet sur le système hôte.'
  ],

  checklist: [
    'Je sais expliquer pourquoi un conteneur démarre en quelques millisecondes comparé à une machine virtuelle.',
    'Je connais la liste et le rôle précis des 6 Namespaces fondamentaux du noyau Linux.',
    'Je comprends la différence fonctionnelle entre un Namespace (visibilité) et un Cgroup (allocation quantitative).',
    'Je sais décrire le parcours d’une commande depuis docker CLI jusqu’à runc.',
    'Je comprends le rôle de containerd-shim dans la résilience des conteneurs.',
    'Je sais utiliser docker run, docker ps, docker images et docker inspect.'
  ],

  notions: [
    'Virtualisation lourde vs Conteneurs',
    'Partage du noyau Linux (Host Kernel)',
    'Namespaces Linux (PID, NET, MNT, IPC, UTS, USER)',
    'Control Groups (Cgroups v1 et v2)',
    'Architecture modulaire Docker Engine',
    'Superviseur containerd &amp; containerd-shim',
    'Runtime bas niveau OCI runc',
    'Socket UNIX /var/run/docker.sock'
  ],

  pitfalls: [
    'Penser qu’un conteneur est une VM : un conteneur ne peut pas faire tourner un noyau différent de l’hôte (ex: pas de noyau Windows natif sur hôte Linux).',
    'Oublier le flag --rm lors de tests rapides en ligne de commande, ce qui accumule des conteneurs arrêtés inutiles sur le disque.',
    'Donner les droits sudo ou l’accès au groupe docker à des utilisateurs non sécurisés sans mesurer l’impact d’élévation de privilèges.',
    'Confondre le rôle de dockerd (orchestrateur haut niveau) et runc (exécuteur bas niveau de conteneurs).'
  ],

  questions: [
    {
      stem: 'Quelle est la différence architecturale majeure entre une Machine Virtuelle et un Conteneur Docker ?',
      opts: [
        'La VM n’a pas besoin de processeur physique',
        'La VM virtualise le matériel et embarque son propre système d’exploitation invité complet, tandis que le conteneur partage le noyau de l’hôte',
        'Le conteneur est codé en Java alors que la VM est codée en assembleur',
        'Il n’y a aucune différence, ce sont deux dénominations commerciales identiques'
      ],
      correct: 1,
      exp: 'Une VM duplique un OS invité complet avec son propre noyau au-dessus d’un hyperviseur. Le conteneur s’exécute directement sur l’OS hôte et partage son noyau.'
    },
    {
      stem: 'Quel mécanisme du noyau Linux permet d’attribuer au processus principal d’un conteneur l’identifiant PID 1 tout en conservant son vrai PID sur la machine hôte ?',
      opts: [
        'Le PID Namespace',
        'Le contrôleur Cgroups de mémoire',
        'Le pilote Wi-Fi du noyau',
        'L’hyperviseur KVM'
      ],
      correct: 0,
      exp: 'Le PID Namespace crée une arborescence de processus cloisonnée et indépendante où le premier processus lancé reçoit le PID 1 à l’intérieur du conteneur.'
    },
    {
      stem: 'À quoi servent les Control Groups (Cgroups) dans l’infrastructure de conteneurs Linux ?',
      opts: [
        'À chiffrer les disques durs avec une clé AES-256',
        'À limiter, contrôler et comptabiliser la quantité de ressources matérielles (CPU, mémoire RAM, E/S disques) allouée aux processus',
        'À traduire les noms de domaine en adresses IP publiques',
        'À compiler le code source des applications automatiquement'
      ],
      correct: 1,
      exp: 'Alors que les namespaces isolent la visibilité des ressources, les cgroups régulent quantitativement l’allocation des ressources physiques (plafond de RAM, part de CPU).'
    },
    {
      stem: 'Quel composant logiciel bas niveau conforme aux spécifications de l’OCI (Open Container Initiative) est responsable de la création effective des namespaces et du démarrage du processus conteneurisé ?',
      opts: [
        'docker-compose',
        'runc',
        'VirtualBox',
        'kubelet'
      ],
      correct: 1,
      exp: 'runc est le runtime OCI de référence : il interagit directement avec les primitives du noyau Linux pour instancier le conteneur selon la spécification OCI.'
    },
    {
      stem: 'Pourquoi le processus « containerd-shim » reste-t-il actif pour chaque conteneur en cours d’exécution ?',
      opts: [
        'Pour miner des cryptomonnaies en arrière-plan',
        'Pour maintenir ouverts les flux stdin/stdout/stderr et l’état du conteneur sans dépendre du démon Docker, permettant de redémarrer le démon sans couper les conteneurs',
        'Pour vérifier la validité de la licence commerciale Docker Desktop',
        'Pour émuler une carte graphique 3D virtuelle'
      ],
      correct: 1,
      exp: 'containerd-shim découple le conteneur du démon dockerd : si dockerd plante ou est mis à jour, les conteneurs continuent de tourner sans interruption.'
    },
    {
      stem: 'Que se passe-t-il si un utilisateur non-root a un accès complet en écriture au fichier socket « /var/run/docker.sock » ?',
      opts: [
        'Il peut uniquement afficher la version de Docker',
        'Il dispose virtuellement d’un accès superutilisateur root complet sur l’ensemble de la machine hôte physique',
        'Le système Linux refuse d’exécuter la moindre commande',
        'La vitesse du processeur est réduite de moitié'
      ],
      correct: 1,
      exp: 'Contrôler la socket Docker permet de lancer un conteneur privilégié montant le disque hôte (-v /:/host) et modifiant le fichier /etc/shadow pour prendre le contrôle total de l’hôte.'
    },
    {
      stem: 'Quel Namespace Linux permet au conteneur de disposer de sa propre table de routage et de ses propres ports TCP/UDP indépendants ?',
      opts: [
        'UTS Namespace',
        'NET Namespace',
        'IPC Namespace',
        'MNT Namespace'
      ],
      correct: 1,
      exp: 'Le NET Namespace fournit une pile réseau complètement étanche, incluant ses propres interfaces réseau, règles de filtrage et ports d’écoute.'
    },
    {
      stem: 'Quelle commande CLI Docker permet d’afficher la configuration bas niveau d’un conteneur au format JSON (adresses IP, points de montage, statut) ?',
      opts: [
        'docker log',
        'docker inspect',
        'docker top',
        'docker status'
      ],
      correct: 1,
      exp: 'docker inspect retourne l’état complet, la configuration réseau, les montages et les limites de ressources du conteneur au format JSON structuré.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre une VM et un conteneur ?',
      a: 'La VM virtualise le matériel et embarque un OS complet avec son propre noyau ; le conteneur partage le noyau Linux de l’hôte.'
    },
    {
      q: 'Quel est le rôle des Namespaces Linux ?',
      a: 'Isoler la vue des ressources système (processus, réseau, système de fichiers, IPC, nom d’hôte, utilisateurs).'
    },
    {
      q: 'Quel est le rôle des Cgroups (Control Groups) ?',
      a: 'Plafonner et surveiller l’utilisation des ressources physiques (mémoire RAM, temps processeur CPU, E/S disques).'
    },
    {
      q: 'Qu’est-ce que runc ?',
      a: 'Le runtime de conteneurs OCI bas niveau qui interagit avec le noyau Linux pour instancier les conteneurs.'
    },
    {
      q: 'À quoi sert containerd-shim ?',
      a: 'À superviser le conteneur indépendamment du démon Docker, permettant de redémarrer le démon sans couper les conteneurs.'
    },
    {
      q: 'Pourquoi /var/run/docker.sock est-il sensible ?',
      a: 'Accéder en écriture à cette socket permet d’obtenir les privilèges root complets sur la machine hôte.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la distinction VM vs Conteneur, les Namespaces et les Cgroups.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon socle acquis. Approfondissez l’architecture modulaire de Docker et le rôle de runc.' },
    { cls: 'good', text: '7/8 : Excellente compréhension des mécanismes du noyau Linux et de la pile Docker.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous maîtrisez les fondements de la conteneurisation au niveau des experts système.' }
  ]
};
