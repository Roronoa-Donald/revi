/**
 * Chapitre 4 du cours « Docker B2 » — Cycle de Vie des Conteneurs, Réseau &amp; Stockage.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Cycle de Vie des Conteneurs, Réseau &amp; Stockage',
  short: 'Réseau, Stockage &amp; Cycle de Vie',
  toc: 'Machine à états finis des conteneurs, pilotage en ligne de commande (run, exec, stop, rm), redirection de ports (NAT iptables), modes réseau (bridge, host, none, DNS interne à 127.0.0.11), et stratégies de persistance des données (Volumes nommés, Bind Mounts, Tmpfs).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un développeur junior configure une base de données PostgreSQL dans un conteneur pour une application critique. ' +
    'Au bout de trois semaines de saisie de données par les utilisateurs, le serveur hôte redémarre et l’administrateur ' +
    'exécute la commande « docker rm -f postgres » pour mettre à niveau l’image. ' +
    'Catastrophe absolue : la totalité des données clients est anéantie instantanément car les fichiers résidaient ' +
    'dans la couche Writable volatile du conteneur sans aucun montage de volume persistant ! ' +
    'Au même moment, les autres services de l’entreprise ne parviennent plus à communiquer avec l’API ' +
    'car celle-ci a changé d’adresse IP privée lors du redémarrage sur le bridge par défaut non routé. ' +
    'Ce module forme les étudiants à maîtriser rigoureusement le cycle de vie d’un conteneur, ' +
    'à configurer des réseaux virtuels sécurisés avec découverte automatique par nom d’hôte, ' +
    'et à garantir la persistance intégrale des données d’entreprise à travers les volumes managés.',

  objectives: [
    'modéliser la machine à états finis du cycle de vie d’un conteneur (Created, Running, Paused, Stopped, Removed) ;',
    'maîtriser les commandes de pilotage opérationnel (run, exec, stop, kill, restart, logs, inspect, rm) ;',
    'comprendre le fonctionnement de la publication de ports via les tables de translation NAT iptables ;',
    'distinguer les modes réseau Docker (Bridge, Host, None) et exploiter le DNS interne (127.0.0.11) ;',
    'comparer et choisir judicieusement entre Volumes Docker nommés, Bind Mounts et montages Tmpfs ;',
    'sécuriser les montages de fichiers sensibles à l’aide du mode lecture seule (:ro).'
  ],

  sections: [
    {
      title: 'Machine à États Finis et Commandes du Cycle de Vie',
      html: [
        '<p>Un conteneur Docker traverse des états strictement définis au cours de son existence :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>État</th>',
        '      <th>Description système</th>',
        '      <th>Commandes déclenchantes</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Created</strong></td>',
        '      <td>Le conteneur est instancié avec ses couches, son réseau et ses cgroups réservés, mais le processus applicatif n’est pas encore lancé.</td>',
        '      <td><code>docker create</code></td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Running</strong></td>',
        '      <td>Le processus principal (PID 1) s’exécute activement dans ses namespaces.</td>',
        '      <td><code>docker run</code>, <code>docker start</code>, <code>docker unpause</code></td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Paused</strong></td>',
        '      <td>Tous les processus du conteneur sont gelés au niveau du cgroup freezer (consommation CPU = 0).</td>',
        '      <td><code>docker pause</code></td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Stopped (Exited)</strong></td>',
        '      <td>Le processus principal a terminé son exécution ou a été arrêté via un signal. Le système de fichiers est préservé.</td>',
        '      <td><code>docker stop</code>, <code>docker kill</code></td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Dead / Removed</strong></td>',
        '      <td>Le conteneur et sa couche Writable ont été effacés du système de fichiers de l’hôte.</td>',
        '      <td><code>docker rm</code></td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        box(
          'tip',
          'Différence Cruciale entre docker stop et docker kill',
          '<p><code>docker stop</code> envoie d’abord le signal d’arrêt propre <strong>SIGTERM (15)</strong> au processus PID 1, ' +
          'lui laissant un délai de grâce de 10 secondes pour fermer les connexions de base de données et vider ses buffers. ' +
          'Ce n’est qu’après ce délai que Docker envoie <strong>SIGKILL (9)</strong>. ' +
          'À l’inverse, <code>docker kill</code> abat immédiatement le processus par SIGKILL sans aucun préavis, ' +
          'au risque de corrompre des fichiers en cours d’écriture.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Réseaux Docker, Port Mapping et DNS Intégré',
      html: [
        '<p>Par défaut, Docker isole le conteneur dans son propre <em>NET Namespace</em>. Pour communiquer avec ' +
        'le monde extérieur et avec d’autres conteneurs, plusieurs modes existent :</p>',

        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Bridge Network (Par Défaut)</h4>',
        '    <p>Créez une interface pont virtuelle (comme <code>docker0</code>) et attribue une adresse IP privée ' +
        '    (ex: 172.17.0.X) à chaque conteneur. L’accès extérieur s’effectue par translation d’adresses NAT.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Host Network (--network=host)</h4>',
        '    <p>Désactive l’isolation réseau : le conteneur partage directement la pile réseau et les ports de la machine hôte. ' +
        '    Performances maximales mais suppression du cloisonnement de sécurité.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>None Network (--network=none)</h4>',
        '    <p>Isole totalement le conteneur du réseau : seule l’interface de boucle locale <code>lo</code> est disponible. ' +
        '    Idéal pour des calculs ultra-sécurisés ou des traitements batch fermés.</p>',
        '  </div>',
        '</div>',

        box(
          'important',
          'La Règle d’Or du Réseau Bridge Personnalisé',
          '<p>Sur le réseau bridge par défaut historique (<code>docker0</code>), les conteneurs ne peuvent pas se joindre ' +
          'par leur nom d’hôte : il faut obligatoirement connaître leur adresse IP changeante. ' +
          'À l’inverse, dès que vous créez un réseau bridge personnalisé (<code>docker network create mon-reseau</code>), ' +
          'Docker active son <strong>serveur DNS interne intégré (127.0.0.11)</strong> : ' +
          'les conteneurs connectés à ce réseau peuvent alors communiquer simplement en utilisant ' +
          'leur nom de conteneur comme nom d’hôte (ex: <code>curl http://api-service:8080</code>).</p>'
        )
      ].join('\n')
    },
    {
      title: 'Persistance des Données : Volumes Nommés vs Bind Mounts vs Tmpfs',
      html: [
        '<p>Tout fichier créé à l’intérieur d’un conteneur sans configuration de montage ' +
        'est stocké dans la couche Writable volatile et disparaît définitivement lors de la destruction du conteneur. ' +
        'Docker propose trois architectures de persistance :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Type de Montage</th>',
        '      <th>Syntaxe CLI</th>',
        '      <th>Emplacement Physique</th>',
        '      <th>Cas d’Usage Idéal</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Volume Nommé</strong></td>',
        '      <td><code>-v pgdata:/var/lib/postgresql/data</code></td>',
        '      <td>Géré entièrement par le démon Docker dans <code>/var/lib/docker/volumes/</code> sur l’hôte.</td>',
        '      <td><strong>Production &amp; Bases de Données :</strong> Performance optimale, isolation du système hôte, sauvegardes facilitées, survit à la destruction du conteneur.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Bind Mount</strong></td>',
        '      <td><code>-v /home/user/app:/app</code></td>',
        '      <td>Lié directement à un fichier ou répertoire arbitraire existant sur la machine hôte.</td>',
        '      <td><strong>Développement :</strong> Partage du code source hôte pour rechargement à chaud (Hot Reloading) ou injection de fichiers de configuration hôte.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Tmpfs Mount</strong></td>',
        '      <td><code>--tmpfs /tmp</code></td>',
        '      <td>Alloué exclusivement dans la mémoire vive RAM de la machine hôte.</td>',
        '      <td><strong>Sécurité &amp; Données Temporaires :</strong> Fichiers éphémères, jetons secrets qui ne doivent jamais toucher le disque dur physique.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Commandes d’Exécution et Diagnostic en Production',
      html: [
        '<p>Pour diagnostiquer et manipuler les conteneurs actifs :</p>',

        '<ul>',
        '  <li><code>docker exec -it mon_conteneur /bin/bash</code> : entre dans un conteneur en cours d’exécution sans interrompre son service.</li>',
        '  <li><code>docker logs -f --tail 50 mon_conteneur</code> : suit en direct les journaux émis sur les flux stdout et stderr.</li>',
        '  <li><code>docker top mon_conteneur</code> : liste les processus actifs à l’intérieur du conteneur avec leur PID hôte.</li>',
        '  <li><code>docker stats</code> : moniteur de performances en temps réel affichant la consommation CPU, RAM, réseau et E/S de tous les conteneurs.</li>',
        '</ul>'
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole de Déploiement d’un Service avec Réseau et Volume Sécurisé',
  method: [
    'Étape 1 — Créer un réseau bridge dédié : Isoler le trafic en exécutant « docker network create app-network ».',
    'Étape 2 — Créer un volume de stockage persistant : Déclarer un volume managé indépendant avec « docker volume create db-data ».',
    'Étape 3 — Instancier le conteneur de base de données : Lancer le conteneur sur le réseau privé avec « docker run -d --name database --network app-network -v db-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:15-alpine ».',
    'Étape 4 — Instancier l’application cliente : Lancer l’API sur le même réseau « docker run -d --name api --network app-network -p 8080:8080 -e DB_HOST=database mon-api:v1 ».',
    'Étape 5 — Valider la résolution DNS et l’accès réseau : Tester la liaison avec « docker exec -it api ping -c 2 database ».',
    'Étape 6 — Tester la résilience des données : Supprimer puis recréer le conteneur de base de données et constater que l’intégralité des données est intacte grâce au volume db-data.'
  ],

  summary: [
    'Un conteneur transite entre les états Created, Running, Paused, Stopped et Removed.',
    'docker stop envoie un SIGTERM avec 10s de délai de grâce ; docker kill foudroie immédiatement le processus par SIGKILL.',
    'La publication de ports (-p Host:Conteneur) configure les tables NAT iptables de la machine hôte.',
    'Les réseaux bridge personnalisés activent un serveur DNS interne à 127.0.0.11 permettant la résolution automatique par nom.',
    'Les volumes nommés sont gérés par Docker et garantissent la persistance des bases de données lors des mises à niveau.',
    'Les Bind Mounts exposent directement le système de fichiers de l’hôte, idéaux en développement mais risqués en production.'
  ],

  checklist: [
    'Je comprends pourquoi supprimer un conteneur non persistant efface toutes ses données locales.',
    'Je sais expliquer la différence entre SIGTERM (15) et SIGKILL (9).',
    'Je sais comment fonctionne la translation d’adresse NAT lors de l’usage du flag -p.',
    'Je sais pourquoi un réseau bridge personnalisé est indispensable pour que deux conteneurs communiquent par leur nom.',
    'Je sais différencier les 3 solutions de stockage : Volume nommé, Bind Mount et Tmpfs.',
    'Je sais entrer dans un conteneur en cours d’exécution avec docker exec -it.'
  ],

  notions: [
    'Cycle de vie (Created, Running, Paused, Stopped)',
    'Signaux UNIX SIGTERM (15) vs SIGKILL (9)',
    'Publication de ports et redirection NAT iptables',
    'Réseau Bridge par défaut vs personnalisé',
    'Serveur DNS interne Docker (127.0.0.11)',
    'Volumes nommés gérés (/var/lib/docker/volumes)',
    'Bind Mounts et mode lecture seule (:ro)',
    'Stockage éphémère en mémoire vive Tmpfs'
  ],

  pitfalls: [
    'Oublier de créer un volume pour une base de données : toutes les données sont perdues au prochain docker rm.',
    'Utiliser le bridge par défaut et tenter de contacter un conteneur par son nom : la résolution DNS échoue silencieusement.',
    'Utiliser -p 80:80 sur plusieurs conteneurs simultanément, provoquant un conflit de port hôte bloquant.',
    'Donner un accès Bind Mount en lecture-écriture à la racine de l’hôte physique (ex: -v /:/host:rw).',
    'Faire un docker kill systématique au lieu de docker stop, corrompant les transactions de base de données en cours.'
  ],

  questions: [
    {
      stem: 'Quel signal UNIX la commande « docker stop » envoie-t-elle initialement au processus principal du conteneur pour demander un arrêt propre ?',
      opts: [
        'SIGKILL (9)',
        'SIGTERM (15)',
        'SIGHUP (1)',
        'SIGINT (2)'
      ],
      correct: 1,
      exp: 'docker stop envoie SIGTERM (signal 15). Si le conteneur ne s’arrête pas dans le délai de grâce (10 secondes par défaut), Docker émet alors un SIGKILL (signal 9).'
    },
    {
      stem: 'Pourquoi est-il fortement recommandé de créer un réseau bridge personnalisé (docker network create) plutôt que d’utiliser le bridge par défaut « docker0 » ?',
      opts: [
        'Parce que le bridge par défaut désactive la connexion Internet',
        'Parce que les réseaux personnalisés intègrent un serveur DNS interne permettant la résolution automatique des conteneurs par leur nom',
        'Parce que le bridge personnalisé est deux fois plus rapide en calcul mathématique',
        'Parce que le bridge par défaut est payant'
      ],
      correct: 1,
      exp: 'Sur un réseau bridge personnalisé, Docker active un serveur DNS embarqué (127.0.0.11) qui résout automatiquement les noms de conteneurs en adresses IP.'
    },
    {
      stem: 'Où sont physiquement stockées les données d’un Volume Nommé Docker (ex: « docker volume create mon_vol ») sur un système Linux ?',
      opts: [
        'Dans le BIOS de la carte mère',
        'Dans le répertoire interne géré par le démon Docker à l’emplacement « /var/lib/docker/volumes/ »',
        'Dans le dossier Téléchargements de l’utilisateur',
        'Sur une clé USB externe'
      ],
      correct: 1,
      exp: 'Docker isole les volumes nommés sous /var/lib/docker/volumes/&lt;nom_volume&gt;/_data, préservant ainsi les données en toute sécurité même si les conteneurs sont supprimés.'
    },
    {
      stem: 'Quelle option de la commande « docker run » permet de mapper le port 8080 de la machine hôte vers le port 80 à l’intérieur du conteneur ?',
      opts: [
        '-v 8080:80',
        '-p 8080:80',
        '--expose 8080:80',
        '-net 8080:80'
      ],
      correct: 1,
      exp: 'L’option -p 8080:80 (ou --publish) ordonne à Docker de configurer les règles iptables pour transférer les paquets arrivant sur le port 8080 de l’hôte vers le port 80 du conteneur.'
    },
    {
      stem: 'Quelle commande permet d’ouvrir un terminal interactif dans un conteneur déjà en cours d’exécution sans l’arrêter ni le redémarrer ?',
      opts: [
        'docker run -it mon_conteneur',
        'docker exec -it mon_conteneur /bin/sh',
        'docker attach mon_conteneur',
        'docker inspect mon_conteneur'
      ],
      correct: 1,
      exp: 'docker exec lance un nouveau processus fils dans les namespaces du conteneur existant, ce qui est idéal pour inspecter l’environnement en direct.'
    },
    {
      stem: 'Que caractérise un montage de type « Tmpfs » (--tmpfs /tmp) sous Docker ?',
      opts: [
        'Les données sont stockées sur un serveur distant en Chine',
        'Les données sont écrites exclusivement dans la mémoire vive RAM de l’hôte et disparaissent immédiatement à l’arrêt du conteneur',
        'Les données sont compressées au format MP3',
        'Le disque dur est formaté'
      ],
      correct: 1,
      exp: 'Tmpfs crée un point de montage en RAM pure : les écritures sont ultra-rapides et aucune trace n’est conservée sur le disque physique lors de l’extinction du conteneur.'
    },
    {
      stem: 'Comment rendre un point de montage Bind Mount strictement en lecture seule afin que le conteneur ne puisse pas modifier les fichiers hôtes ?',
      opts: [
        'En ajoutant le suffixe « :ro » à la fin de la déclaration (ex: -v /etc/config:/app/config:ro)',
        'En supprimant le fichier après l’avoir monté',
        'En désactivant le pare-feu Linux',
        'En passant le conteneur en mode root'
      ],
      correct: 0,
      exp: 'L’option :ro (read-only) indique au noyau Linux de monter le répertoire avec l’attribut de lecture seule, empêchant tout conteneur compromis d’altérer les fichiers de l’hôte.'
    },
    {
      stem: 'Quelle commande permet de visualiser en direct les flux stdout et stderr émis par une application conteneurisée ?',
      opts: [
        'docker view',
        'docker logs -f mon_conteneur',
        'docker journal',
        'docker echo'
      ],
      correct: 1,
      exp: 'docker logs affiche la journalisation capturée par le driver de logs de Docker, et le drapeau -f (follow) permet de suivre le flux continu en temps réel.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence entre docker stop et docker kill ?',
      a: 'docker stop émet un SIGTERM (15) avec 10s de délai de grâce ; docker kill abat immédiatement par SIGKILL (9).'
    },
    {
      q: 'Pourquoi privilégier les réseaux bridge personnalisés ?',
      a: 'Ils fournissent une résolution DNS automatique (127.0.0.11) permettant aux conteneurs de communiquer par leur nom.'
    },
    {
      q: 'Qu’est-ce qu’un Volume Nommé Docker ?',
      a: 'Un espace de stockage persistant géré par Docker dans /var/lib/docker/volumes qui survit à la destruction des conteneurs.'
    },
    {
      q: 'Qu’est-ce qu’un Bind Mount ?',
      a: 'La liaison directe d’un fichier ou dossier de l’hôte dans le conteneur, très utile pour le développement.'
    },
    {
      q: 'À quoi sert le montage Tmpfs ?',
      a: 'À stocker des données temporaires exclusivement en RAM volatile pour des raisons de vitesse et de sécurité.'
    },
    {
      q: 'Comment exécuter une commande dans un conteneur actif ?',
      a: 'Avec la commande docker exec -it &lt;nom_conteneur&gt; &lt;commande&gt;.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la différence SIGTERM/SIGKILL, les volumes nommés et le port mapping.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes connaissances du réseau et du stockage. Approfondissez le DNS interne et les Bind Mounts.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise opérationnelle du cycle de vie et de la persistance sous Docker.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous gérez réseaux, volumes et conteneurs avec le niveau de rigueur d’un ingénieur DevOps chevronné.' }
  ]
};
