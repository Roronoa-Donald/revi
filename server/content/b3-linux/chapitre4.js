/**
 * Chapitre 4 du cours « Linux Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Isolation &amp; Conteneurisation Noyau : Namespaces &amp; Cgroups v2',
  short: 'Namespaces &amp; Cgroups v2',
  toc: 'Les 8 namespaces Linux (pid, net, mnt, ipc, uts, user, cgroup, time), contrôle de ressources avec Cgroups v2 (cpu.max, memory.max), mécanique de l’OOM Killer et fondements des conteneurs.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Contrairement à une idée reçue répandue, les conteneurs (Docker, containerd, Kubernetes, Podman) ne sont pas des « machines virtuelles légères ». D’un point de vue noyau, un conteneur n’est rien d’autre qu’un processus Linux standard s’exécutant directement sur le noyau de l’hôte, mais dont la vision du système est cloisonnée par deux briques primitives du noyau : les Namespaces (qui limitent ce que le processus peut voir) et les Cgroups (Control Groups, qui limitent ce que le processus peut consommer). En Bachelor 3, l’ingénieur système et cloud doit maîtriser les rouages internes de ces mécanismes pour sécuriser l’exécution multi-locataire, prévenir les attaques par évasion de conteneur et configurer des quotas stricts pour éviter les crashs en chaîne provoqués par l’OOM Killer.',
  objectives: [
    'analyser le rôle et la granularité d’isolation des huit namespaces Linux (PID, NET, MNT, IPC, UTS, USER, CGROUP, TIME) ;',
    'manipuler les primitives de bas niveau de conteneurisation : clone(2), unshare(1), nsenter(1) et chroot/pivot_root ;',
    'comprendre l’architecture unifiée de Cgroups v2 (/sys/fs/cgroup/) par rapport aux limitations historiques de Cgroups v1 ;',
    'configurer des quotas processeur stricts (cpu.max) et des plafonds de mémoire vive (memory.max) dans Cgroups v2 ;',
    'analyser le fonctionnement interne de l’OOM (Out Of Memory) Killer et maîtriser la pondération via oom_score_adj ;',
    'développer en Python 3 des auditeurs de namespaces, des contrôleurs de quotas cgroups et des calculateurs de sacrifice OOM.'
  ],
  sections: [
    {
      title: 'Les Fondations des Conteneurs : Les Huit Namespaces du Noyau Linux',
      html: [
        '<p>Un <strong>namespace</strong> crée une vue virtualisée d’une ressource globale du système pour un groupe de processus. Chaque processus n’a conscience que des entités appartenant à son propre namespace :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Namespace</th><th>Drapeau clone(2)</th><th>Ressource Cloisonnée</th><th>Effet Concret dans le Conteneur</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>PID</code></td><td><code>CLONE_NEWPID</code></td><td>Arbre des identifiants de processus</td><td>Le processus principal devient <strong>PID 1</strong> dans son namespace et ne voit aucun processus hôte.</td></tr>',
        '    <tr><td><code>NET</code></td><td><code>CLONE_NEWNET</code></td><td>Pile réseau complète</td><td>Interfaces réseau privées (<code>eth0</code>, <code>lo</code>), tables de routage indépendantes, ports TCP/UDP distincts.</td></tr>',
        '    <tr><td><code>MNT</code></td><td><code>CLONE_NEWNS</code></td><td>Points de montage de système de fichiers</td><td>Isolation des montages disques (permet de substituer la racine via <code>pivot_root</code>).</td></tr>',
        '    <tr><td><code>IPC</code></td><td><code>CLONE_NEWIPC</code></td><td>Communication inter-processus</td><td>Isolation de la mémoire partagée POSIX / SysV et des files de messages.</td></tr>',
        '    <tr><td><code>UTS</code></td><td><code>CLONE_NEWUTS</code></td><td>Nom d’hôte et domaine</td><td>Permet au conteneur de posséder son propre nom de machine (<code>hostname</code>) sans affecter l’hôte.</td></tr>',
        '    <tr><td><code>USER</code></td><td><code>CLONE_NEWUSER</code></td><td>Mappage des UID et GID</td><td>L’utilisateur est root (UID 0) dans le conteneur mais un utilisateur non privilégié (ex: 100000) sur l’hôte.</td></tr>',
        '    <tr><td><code>CGROUP</code></td><td><code>CLONE_NEWCGROUP</code></td><td>Vue de la hiérarchie cgroup</td><td>Masque la hiérarchie globale des groupes de contrôle hôte.</td></tr>',
        '    <tr><td><code>TIME</code></td><td><code>CLONE_NEWTIME</code></td><td>Horloges système</td><td>Permet d’ajuster l’horloge de démarrage ou monotone sans modifier l’heure de l’hôte physique.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Manipulation Bas Niveau : unshare, nsenter &amp; clone',
      html: [
        '<p>Il est possible de créer un conteneur complet avec les outils standards Linux sans installer Docker :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Création d’Espaces avec unshare(1)</h4>',
        '    <pre><code># Lancer un shell isole avec ses propres namespaces\nunshare --pid --net --mount --uts --fork /bin/bash</code></pre>',
        '    <p>La commande détache le shell des namespaces de l’hôte : un <code>ps aux</code> ou un <code>ip link</code> n’affiche que les éléments du nouveau conteneur.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Injection dans un Namespace avec nsenter(1)</h4>',
        '    <pre><code># S’injecter dans le namespace reseau d’un conteneur\nnsenter -t &lt;PID&gt; -n ip addr</code></pre>',
        '    <p>Permet à un administrateur d’entrer dans n’importe quel namespace d’un processus actif pour déboguer le réseau ou les montages.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Hiérarchie Unifiée Cgroups v2 : Quotas CPU &amp; Mémoire',
      html: [
        '<p>Alors que les Namespaces contrôlent <em>ce que l’on voit</em>, les <strong>Cgroups (Control Groups)</strong> contrôlent <em>ce que l’on consomme</em>. Depuis le noyau Linux 4.5 et l’adoption généralisée dans les distributions modernes, <strong>Cgroups v2</strong> remplace l’ancienne version avec une hiérarchie unifiée sous <code>/sys/fs/cgroup/</code> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Régulation du Processeur (cpu.max)</h4>',
        '    <p>Format : <code>echo "200000 100000" &gt; /sys/fs/cgroup/app/cpu.max</code>.</p>',
        '    <p>Sur chaque période de 100 000 microsecondes (100 ms), le groupe a droit à 200 000 microsecondes de temps processeur, soit <strong>exactement 2.0 cœurs</strong>.</p>',
        '    <p>Si la charge dépasse le quota, le noyau applique un <strong>étranglement (throttling)</strong> en suspendant temporairement les threads jusqu’à la période suivante.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Plafonnement Mémoire (memory.max)</h4>',
        '    <p>Format : <code>echo "536870912" &gt; /sys/fs/cgroup/app/memory.max</code> (512 Mo).</p>',
        '    <p>Dès que le groupe approche du plafond, le noyau commence par purger agressivement les caches de pages (page cache). Si la mémoire anonyme dépasse le seuil, l’OOM Killer local est déclenché au sein du groupe.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'L’OOM Killer &amp; la Pondération /proc/[pid]/oom_score_adj',
      html: [
        '<p>Lorsque le système ne peut plus allouer de mémoire physique et que le swap est épuisé, l’<strong>OOM (Out Of Memory) Killer</strong> sélectionne le processus ayant le score le plus élevé et lui envoie un signal <code>SIGKILL</code> immédiat.</p>',
        box('danger', 'Immunité &amp; Configuration de l’oom_score_adj', [
          '<p>Le score de base est proportionnel au pourcentage de RAM consommé par le processus. Il est pondéré par la valeur du fichier <code>/proc/[pid]/oom_score_adj</code> comprise entre <code>-1000</code> et <code>+1000</code> :</p>',
          '<ul>',
          '  <li><strong>Valeur -1000 :</strong> Confère une <strong>immunité absolue</strong>. L’OOM Killer ne tuera JAMAIS ce processus. Utilisé impérativement pour le serveur SSH (<code>sshd</code>), l’orchestrateur (<code>systemd</code>) et les bases de données primaires.</li>',
          '  <li><strong>Valeur +1000 :</strong> Désigne le processus comme cible de sacrifice prioritaire dès la première alerte mémoire (ex: workers de calcul non critiques, tâches batch).</li>',
          '</ul>'
        ])
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Isolation &amp; Confinement Strict d’une Application',
  method: [
    'Étape 1 : Créer un sous-répertoire cgroup dédié : mkdir /sys/fs/cgroup/production_app.',
    'Étape 2 : Définir le plafond mémoire strict : echo 512M > /sys/fs/cgroup/production_app/memory.max.',
    'Étape 3 : Définir la limite de cœurs CPU : echo "150000 100000" > /sys/fs/cgroup/production_app/cpu.max (1.5 cœur).',
    'Étape 4 : Isoler le processus dans un espace de namespaces dédié avec unshare --pid --net --mount.',
    'Étape 5 : Attacher le PID du processus au cgroup : echo $PID > /sys/fs/cgroup/production_app/cgroup.procs.',
    'Étape 6 : Protéger le processus contre l’OOM Killer si critique : echo -500 > /proc/$PID/oom_score_adj.'
  ],
  summary: [
    'Un conteneur sous Linux est un simple processus isolé par des Namespaces et restreint par des Cgroups.',
    'Les 8 namespaces isolent PID, NET, MNT, IPC, UTS, USER, CGROUP et TIME.',
    'unshare(1) détache les namespaces d’un processus ; nsenter(1) permet de s’injecter dans les namespaces d’un autre processus.',
    'Cgroups v2 offre une hiérarchie arborescente unifiée dans /sys/fs/cgroup/ régulant CPU, mémoire, I/O et PIDs.',
    'cpu.max contrôle la bande passante processeur en microsecondes (quota / période).',
    'memory.max impose un plafond dur : tout dépassement non compressible déclenche l’OOM Killer.',
    'oom_score_adj permet d’ajuster le risque de sacrifice : la valeur -1000 confère une immunité totale.'
  ],
  checklist: [
    'Je connais les 8 namespaces du noyau Linux et la ressource système associée à chacun.',
    'Je sais expliquer la différence fondamentale entre Namespaces (visibilité) et Cgroups (consommation).',
    'Je sais utiliser unshare pour lancer un processus isolé et nsenter pour inspecter un conteneur.',
    'Je comprends l’architecture unifiée de Cgroups v2 par rapport à Cgroups v1.',
    'Je sais configurer cpu.max et memory.max dans /sys/fs/cgroup/.',
    'Je maîtrise le fonctionnement de l’OOM Killer et l’utilisation de oom_score_adj.'
  ],
  notions: [
    'Les 8 Namespaces Linux',
    'Commandes d’isolation (unshare, nsenter)',
    'Appel système clone(2) & drapeaux CLONE_NEW*',
    'Hiérarchie unifiée Cgroups v2',
    'Contrôleur CPU (cpu.max quota/période)',
    'Plafond mémoire (memory.max)',
    'Out Of Memory Killer (OOM Killer)',
    'Ajustement de sacrifice (oom_score_adj)'
  ],
  pitfalls: [
    'Croire que les conteneurs exécutent un noyau Linux distinct (ils partagent tous le noyau unique de l’hôte).',
    'Laisser un conteneur sans limite memory.max (un memory leak dans le conteneur peut crasher tout le serveur hôte).',
    'Penser que cpu.max tue le processus en cas de dépassement (il subit un étranglement temporaire sans crash).',
    'Affecter oom_score_adj = -1000 à tous les processus (l’OOM Killer sera forcé de paniquer le noyau si la RAM sature).'
  ],
  questions: [
    {
      stem: 'Quelle est la différence fondamentale de rôle entre les Namespaces et les Cgroups dans le noyau Linux ?',
      opts: [
        'Les Namespaces gèrent le réseau et les Cgroups gèrent l’affichage graphique',
        'Les Namespaces cloisonnent la visibilité des ressources (ce que le processus peut voir) tandis que les Cgroups limitent la quantité de ressources consommées',
        'Les Namespaces sont réservés à Windows et les Cgroups à Linux',
        'Les Namespaces augmentent la fréquence du processeur'
      ],
      correct: 1,
      exp: 'Les Namespaces créent des vues isolées (arborescence PID, réseau, montages), tandis que les Cgroups régulent et limitent la consommation physique (temps CPU, mémoire vive, bande passante I/O).'
    },
    {
      stem: 'Quel namespace permet à un utilisateur non privilégié d’apparaître comme l’utilisateur « root » (UID 0) à l’intérieur de son conteneur ?',
      opts: [
        'PID Namespace',
        'USER Namespace (CLONE_NEWUSER)',
        'UTS Namespace',
        'MNT Namespace'
      ],
      correct: 1,
      exp: 'Le User Namespace mappe les identifiants d’utilisateurs : un processus peut être root (UID 0) à l’intérieur du conteneur sans disposer du moindre privilège d’administration sur la machine hôte.'
    },
    {
      stem: 'Quelle commande permet à un administrateur système d’exécuter une commande à l’intérieur du namespace réseau d’un conteneur en cours d’exécution ?',
      opts: [
        'nsenter -t <PID> -n <commande>',
        'chroot /proc/<PID>',
        'systemctl network-enter',
        'unshare --net-only'
      ],
      correct: 0,
      exp: 'nsenter (Namespace Enter) permet de s’attacher aux namespaces d’un processus cible via son PID (-t) pour inspecter son réseau (-n), ses montages (-m), etc.'
    },
    {
      stem: 'Dans Cgroups v2, quelle est la signification de la directive « cpu.max = 150000 100000 » ?',
      opts: [
        'Le processus a le droit de consommer 150 Mo de RAM toutes les 100 secondes',
        'Le groupe de processus peut consommer au maximum 150 ms de temps CPU par période de 100 ms, soit l’équivalent exact de 1.5 cœur',
        'Le processus est limité à 150 threads',
        'La vitesse du processeur est fixée à 1,5 GHz'
      ],
      correct: 1,
      exp: 'cpu.max spécifie le quota et la période en microsecondes. Le ratio 150000 / 100000 = 1.5 correspond à une allocation maximale de 1.5 cœur de calcul.'
    },
    {
      stem: 'Que se passe-t-il lorsqu’un processus dépasse son quota processeur défini dans « cpu.max » ?',
      opts: [
        'Le processus est immédiatement tué par SIGKILL',
        'Le processus subit un étranglement (throttling) temporaire et ses threads sont mis en pause jusqu’à la période suivante',
        'Le noyau déclenche un Kernel Panic',
        'Le serveur redémarre automatiquement'
      ],
      correct: 1,
      exp: 'Le régulateur CPU n’interrompt pas brutalement le processus : il suspend son exécution (throttling) pendant le reste de la période en cours et le réactive dès la période suivante.'
    },
    {
      stem: 'Quelle valeur dans « /proc/[pid]/oom_score_adj » garantit qu’un processus ne sera jamais tué par l’OOM Killer du noyau ?',
      opts: [
        '0',
        '-1000',
        '+1000',
        '9999'
      ],
      correct: 1,
      exp: 'La valeur -1000 désactive complètement le ciblage par l’OOM Killer, conférant une immunité totale indispensable pour les processus d’infrastructure vitaux.'
    },
    {
      stem: 'Dans quel répertoire unifié de système de fichiers les groupes de contrôle Cgroups v2 sont-ils montés sous Linux moderne ?',
      opts: [
        '/sys/fs/cgroup/',
        '/proc/cgroups/',
        '/etc/cgroups.d/',
        '/dev/cgroup/'
      ],
      correct: 0,
      exp: 'Cgroups v2 utilise une arborescence unifiée montée sous /sys/fs/cgroup/, où chaque sous-dossier représente un groupe de contrôle héritant des contrôleurs parents.'
    },
    {
      stem: 'Quel namespace isole le nom d’hôte de la machine (hostname) pour un conteneur ?',
      opts: [
        'IPC Namespace',
        'UTS Namespace (CLONE_NEWUTS)',
        'NET Namespace',
        'TIME Namespace'
      ],
      correct: 1,
      exp: 'L’UTS Namespace (UNIX Timesharing System) isole le nom d’hôte et le nom de domaine NIS, permettant à chaque conteneur de définir son propre hostname indépendant.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’un conteneur Linux au sens strict du noyau ?',
      a: 'Un processus classique partageant le noyau de l’hôte, dont la visibilité est isolée par des Namespaces et la consommation régulée par des Cgroups.'
    },
    {
      q: 'Combien de types de Namespaces existent dans le noyau Linux moderne ?',
      a: 'Huit namespaces : PID, NET, MNT, IPC, UTS, USER, CGROUP et TIME.'
    },
    {
      q: 'Que fait la commande nsenter ?',
      a: 'Elle permet de s’injecter et d’exécuter des commandes dans les namespaces (réseau, montages, PID) d’un processus déjà en cours d’exécution.'
    },
    {
      q: 'Comment s’exprime la limite de cœurs CPU dans Cgroups v2 ?',
      a: 'Via le fichier cpu.max sous la forme <quota> <periode> en microsecondes (ex: 200000 100000 = 2.0 cœurs).'
    },
    {
      q: 'Quel est le rôle de l’OOM (Out Of Memory) Killer ?',
      a: 'Terminer par SIGKILL le processus le plus consommateur lorsque la mémoire physique et le swap sont intégralement saturés pour sauver le noyau.'
    },
    {
      q: 'Que confère la valeur -1000 dans /proc/[pid]/oom_score_adj ?',
      a: 'Une immunité absolue : le processus ne pourra jamais être sélectionné comme cible de sacrifice par l’OOM Killer.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Confusion entre conteneurs et machines virtuelles ou méconnaissance du rôle respectif des Namespaces et des Cgroups.'
    },
    {
      cls: 'medium',
      text: 'Bonne manipulation de unshare et nsenter, configuration correcte de Cgroups v2 et ajustement de l’oom_score_adj.'
    },
    {
      cls: 'high',
      text: 'Conception experte de runtimes de conteneurs bas niveau, maîtrise fine des 8 namespaces et durcissement des cgroups en environnement multi-tenant.'
    }
  ]
};
