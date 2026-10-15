/**
 * Module 2 — Déploiement vCenter, Cycle de Vie des VM & Gestion des Ressources
 * Cours « Virtualisation Avancée B3 »
 */
'use strict';

module.exports = {
  n: 2,
  title: 'Déploiement vCenter, Cycle de Vie des VM & Gestion des Ressources',
  short: 'vCenter & Ressources',
  toc: 'Architecture VMware vCenter Server (VCSA, inventaire, PSC), anatomie complète des fichiers d\'une VM (.vmx, .vmdk, .nvram, .vswp), arborescence de disques deltas de snapshots et consolidation, ordonnancement fin par Resource Pools (Shares, Reservations, Limits).',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'En tant qu\'administrateur de virtualisation vSphere, vous devez centraliser le pilotage d\'un parc de 40 serveurs hôtes ESXi répartis sur deux sites. ' +
    'Vous déployez l\'appliance vCenter Server (VCSA), structurez l\'inventaire hiérarchique, ' +
    'analysez les fichiers de configuration sous-jacents des machines virtuelles critiques, ' +
    'gérez les risques liés à l\'accumulation de snapshots différentiels et configurez des Resource Pools équitables pour prioriser les charges applicatives de production en période de contention.',

  objectives: [
    'Déployer et administrer VMware vCenter Server Appliance (VCSA) et structurer un inventaire d\'entreprise (Datacenters, Clusters, Dossiers).',
    'Identifier et analyser la fonction de chaque fichier constitutif d\'une VM sur le datastore (.vmx, .vmdk, .nvram, .vswp, .vmsd).',
    'Maîtriser la mécanique des disques deltas de snapshots, modéliser la croissance d\'espace et exécuter la consolidation sans rupture de service.',
    'Configurer les Resource Pools et arbitrer l\'allocation des cycles CPU et de la mémoire vive par les parts (Shares), les réservations et les limites.'
  ],

  sections: [
    {
      title: 'Architecture VMware vCenter Server : Appliance VCSA & Inventaire Datacenter',
      html: [
        '<p>Si un hôte ESXi peut être administré individuellement via son interface web (Host Client), la gestion avancée d\'un centre de données (clustering, mobilité à chaud, haute disponibilité, templates) exige une console de gestion centralisée : <strong>VMware vCenter Server</strong>.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Architecture VCSA (vCenter Server Appliance)</h4>',
        '    <ul>',
        '      <li><strong>Système d\'exploitation durci :</strong> Appliance virtuelle pré-packagée sous VMware Photon OS (Linux minimaliste optimisé).</li>',
        '      <li><strong>Base de données intégrée :</strong> Base relationnelle PostgreSQL embarquée gérant jusqu\'à plusieurs dizaines de milliers de VM sans base Oracle externe.</li>',
        '      <li><strong>Services d\'authentification :</strong> Single Sign-On (SSO) vSphere intégrant Active Directory / LDAP et Platform Services Controller (PSC) unifié.</li>',
        '      <li><strong>Gestion des hôtes :</strong> Déploiement d\'un agent léger <code>vpxa</code> sur chaque ESXi communiquant avec le démon <code>hostd</code> local.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Hiérarchie de l\'Inventaire vSphere</h4>',
        '    <p>L\'inventaire vCenter organise logiquement les ressources du système d\'information selon une arborescence stricte :</p>',
        '    <ol>',
        '      <li><strong>Datacenter logique :</strong> Périmètre géographique ou organisationnel regroupant ressources de calcul, stockage et réseaux.</li>',
        '      <li><strong>Cluster d\'hôtes :</strong> Regroupement de serveurs ESXi partageant le même stockage et mutualisant CPU/RAM (socle de HA et DRS).</li>',
        '      <li><strong>Resource Pools &amp; Dossiers :</strong> Découpage hiérarchique de calcul et regroupement administratif des VM.</li>',
        '    </ol>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Anatomie des Fichiers d\'une Machine Virtuelle sur le Datastore',
      html: [
        '<p>Une machine virtuelle n\'est pas un objet abstrait : elle se matérialise sur le datastore sous la forme d\'un répertoire contenant un ensemble de fichiers aux rôles bien définis :</p>',
        '<table class="table">',
        '  <thead><tr><th>Fichier / Extension</th><th>Format</th><th>Fonction Clé sur le Système de Fichiers VMFS / NFS</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><code>.vmx</code></td><td>Texte brut ASCII (clef = "valeur")</td><td>Fichier de configuration de la VM (nombre de vCPUs, taille RAM, adresses MAC virtuelles, contrôleurs SCSI, version matérielle).</td></tr>',
        '    <tr><td><code>.vmdk</code></td><td>Texte brut ASCII (Descripteur)</td><td>Descripteur du disque dur virtuel pointant vers le fichier de données binaire et décrivant la géométrie (cylindres, têtes, secteurs).</td></tr>',
        '    <tr><td><code>-flat.vmdk</code></td><td>Binaire brut (Data)</td><td>Fichier plat contenant les blocs de données réels du disque dur de la VM.</td></tr>',
        '    <tr><td><code>.nvram</code></td><td>Binaire</td><td>Mémoire non volatile stockant les paramètres BIOS de la VM ou l\'état UEFI / Secure Boot.</td></tr>',
        '    <tr><td><code>.vswp</code></td><td>Binaire (Swap fichier)</td><td>Fichier de pagination créé <em>à l\'allumage de la VM</em>. Sa taille équivaut à <code>RAM_allouée - Réservation_RAM</code>.</td></tr>',
        '    <tr><td><code>.vmsd</code> &amp; <code>.vmsn</code></td><td>Texte / Binaire</td><td>Métadonnées de l\'arborescence de snapshots (.vmsd) et état de la mémoire vive au moment du cliché (.vmsn).</td></tr>',
        '    <tr><td><code>vmware.log</code></td><td>Journal texte</td><td>Historique chronologique des événements, démarrages, avertissements d\'I/O et erreurs du VMkernel.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Disques Deltas, Snapshots & Alerte de Consolidation Disque',
      html: [
        '<p>Un <strong>snapshot (cliché instantané)</strong> capture l\'état exact des disques et optionnellement de la mémoire vive d\'une VM à un instant T. Il est indispensable pour sécuriser une mise à jour d\'application ou un correctif d\'OS :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Mécanisme des Disques Différentiels (Deltas)</h4>',
        '    <ul>',
        '      <li>Dès la création du snapshot, le disque de base <code>-flat.vmdk</code> est verrouillé en lecture seule.</li>',
        '      <li>L\'hyperviseur crée un disque différentiel <code>-000001-delta.vmdk</code> qui intercepte et stocke <strong>toutes les nouvelles écritures</strong>.</li>',
        '      <li>Chaque nouveau snapshot ajoute une couche delta supplémentaire à la chaîne (arborescence de clichés).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Risques &amp; Nécessité de la Consolidation</h4>',
        '    <ul>',
        '      <li><strong>Un snapshot n\'est PAS une sauvegarde :</strong> La suppression accidentelle ou la corruption du disque de base rend le delta totalement inutilisable.</li>',
        '      <li><strong>Dégradation des E/S :</strong> La lecture d\'un bloc impose de parcourir la chaîne de deltas du plus récent au plus ancien, augmentant la latence disque.</li>',
        '      <li><strong>Saturation du datastore :</strong> Les deltas grossissent indéfiniment. Dès que plus de 3 snapshots s\'accumulent ou que le delta dépasse 50% de la base, une <strong>alerte de consolidation</strong> doit être émise.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Gestion des Ressources : Resource Pools, Shares, Reservations & Limits',
      html: [
        '<p>Les <strong>Resource Pools</strong> permettent de partitionner les capacités globales de calcul (CPU en MHz et Mémoire en Mo) d\'un cluster d\'hôtes pour les allouer à des départements ou des catégories d\'applications :</p>',
        '<ul>',
        '  <li><strong>Reservation (Garantie) :</strong> Quantité minimale garantie allouée au pool. L\'hyperviseur refuse le démarrage d\'une VM si la somme des réservations dépasse la capacité physique du cluster (contrôle d\'admission).</li>',
        '  <li><strong>Limit (Plafond strict) :</strong> Quantité maximale de cycles processeur ou de mémoire qu\'un pool ne peut dépasser, même si l\'hôte est totalement inoccupé. Une limite de <code>-1</code> signifie <em>illimitée (Unlimited)</em>.</li>',
        '  <li><strong>Shares (Parts relatives de priorité) :</strong> Facteur de pondération appliqué <strong>exclusivement en situation de contention (saturation des ressources)</strong>. Les valeurs standards sont <code>LOW (2000)</code>, <code>NORMAL (4000)</code> et <code>HIGH (8000)</code> :</li>',
        '</ul>',
        '<pre><code>Part_allouée = Réservation + ((Shares_Pool / Somme_Shares) * Capacité_Non_Réservée)</code></pre>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie d\'Ingénierie : Gestion et Nettoyage d\'un Parc vCenter',
  method: [
    'Inspecter l\'arborescence de l\'inventaire vCenter et valider l\'état opérationnel des agents vpxa sur chaque nœud ESXi.',
    'Analyser les fichiers VMX pour repérer les anomalies de configuration (cartes réseaux obsolètes e1000 au lieu de vmxnet3, options de débogage activées).',
    'Auditer systématiquement les snapshots orphelins ou anciens (> 72 heures) et lancer la consolidation des disques deltas avant saturation des LUNs.',
    'Dimensionner les Resource Pools avec des Shares proportionnées et éviter de poser des Limits rigides qui brident les performances sans gain d\'infrastructure.'
  ],

  summary: [
    'vCenter Server Appliance (VCSA) centralise la gestion de clusters ESXi avec sa base PostgreSQL intégrée et ses services SSO.',
    'Une machine virtuelle est un dossier de fichiers sur datastore : .vmx (configuration), .vmdk (descripteur), -flat.vmdk (données) et .vswp (swap).',
    'Le fichier de swap .vswp est dimensionné à la différence exacte entre la mémoire vive allouée et la mémoire vive réservée.',
    'Les snapshots créent des disques deltas qui grossissent à chaque écriture ; ils ne doivent jamais être conservés plus de quelques jours sous peine de dégrader les I/O.',
    'Les Shares des Resource Pools n\'agissent qu\'en période de contention pour arbitrer équitablement la capacité CPU restante au prorata des parts.'
  ],

  checklist: [
    'L\'appliance VCSA est-elle sauvegardée quotidiennement via le protocole VCSA File-Based Backup (SMB/NFS/SFTP) ?',
    'Toutes les VM de production exploitent-elles le pilote réseau paravirtualisé vmxnet3 dans leur fichier .vmx ?',
    'Une tâche planifiée d\'audit des snapshots identifie-t-elle les clichés de plus de 3 jours ?',
    'Les fichiers .vswp sont-ils placés sur un datastore performant ou réduits par une réservation mémoire appropriée ?',
    'La somme des réservations de tous les Resource Pools reste-t-elle inférieure à la capacité CPU/RAM du cluster ?'
  ],

  notions: [
    { term: 'VCSA (vCenter Server Appliance)', def: 'Appliance virtuelle pré-configurée sous Linux Photon OS hébergeant le service de gestion centralisée vCenter Server.' },
    { term: 'Fichier VMX', def: 'Fichier de configuration en texte ASCII décrivant le matériel virtuel, l\'UUID et l\'état de la machine virtuelle.' },
    { term: 'Disque Delta (-delta.vmdk)', def: 'Disque virtuel différentiel créé lors d\'un snapshot qui intercepte les nouvelles écritures par rapport au disque de base.' },
    { term: 'Consolidation de snapshots', def: 'Opération vSphere qui fusionne les modifications des disques deltas dans le disque parent et supprime les fichiers temporaires.' },
    { term: 'Fichier VSWP', def: 'Fichier d\'échange mémoire créé sur le datastore à la mise sous tension de la VM pour héberger les pages en cas de surallocation extrême.' },
    { term: 'Resource Pool', def: 'Objet logique permettant de partitionner et d\'allouer hiérarchiquement les ressources CPU et mémoire d\'un cluster.' },
    { term: 'Shares (Parts)', def: 'Valeurs relatives (LOW, NORMAL, HIGH) déterminant la part prioritaire de CPU/RAM accordée à un pool en période de saturation.' },
    { term: 'Reservation', def: 'Quantité garantie minimale de MHz ou de Mo réservée en permanence pour une VM ou un Resource Pool.' }
  ],

  pitfalls: [
    {
      mistake: 'Utiliser un snapshot comme une solution de sauvegarde à long terme.',
      why: 'Les fichiers deltas continuent de grossir jusqu\'à saturer le datastore, et si le disque -flat d\'origine est altéré, toutes les données sont perdues.',
      fix: 'Conserver les snapshots un maximum de 24 à 72 heures lors d\'opérations de maintenance, puis lancer la suppression / consolidation.'
    },
    {
      mistake: 'Configurer une Limit CPU ou RAM stricte sur un Resource Pool de production.',
      why: 'La limite plafonne la consommation même si le cluster dispose de 80% de ressources inoccupées, provoquant des lenteurs incompréhensibles pour les utilisateurs.',
      fix: 'Laisser la Limit à Unlimited (-1) et réguler les priorités en jouant sur les Shares et les Reservations.'
    },
    {
      mistake: 'Oublier l\'impact du fichier .vswp lors du dimensionnement de l\'espace disque du datastore.',
      why: 'Si une VM de 64 Go de RAM sans réservation démarre sur un datastore ayant seulement 40 Go libres, l\'allumage échoue par manque d\'espace pour créer le .vswp.',
      fix: 'Conserver une marge d\'espace disque sur le datastore équivalente à la somme des RAM non réservées des VM hébergées.'
    },
    {
      mistake: 'Modifier manuellement le fichier .vmx pendant que la machine virtuelle est en marche.',
      why: 'Le démon hostd maintient le fichier verrouillé ; la modification sera écrasée ou provoquera une corruption de l\'enregistrement de la VM dans vCenter.',
      fix: 'Éteindre proprement la VM ou désenregistrer la VM de l\'inventaire avant toute modification directe du fichier .vmx.'
    }
  ],

  questions: [
    {
      q: 'Quel est le système d\'exploitation sous-jacent de l\'appliance moderne VMware vCenter Server Appliance (VCSA) ?',
      opts: [
        'VMware Photon OS (distribution Linux durcie optimisée).',
        'Microsoft Windows Server 2022 Datacenter Edition.',
        'Red Hat Enterprise Linux 9 avec interface graphique GNOME.',
        'FreeBSD 13 avec noyau personnalisé pour vSphere.'
      ],
      correct: 0,
      exp: 'Depuis vSphere 6.5+, vCenter Server est exclusivement distribué sous la forme d\'une appliance virtuelle (VCSA) autonome s\'exécutant sur VMware Photon OS avec une base PostgreSQL intégrée.'
    },
    {
      q: 'Quel fichier stocké sur le datastore contient la configuration matérielle complète d\'une VM au format texte ASCII ?',
      opts: [
        'Le fichier avec l\'extension .vmx.',
        'Le fichier avec l\'extension -flat.vmdk.',
        'Le fichier avec l\'extension .nvram.',
        'Le fichier avec l\'extension .vmsd.'
      ],
      correct: 0,
      exp: 'Le fichier .vmx est le fichier de configuration principal d\'une VM VMware. Il décrit en texte brut les vCPUs, la mémoire, les disques durs, les adresses MAC et les contrôleurs matériels.'
    },
    {
      q: 'À quel moment précis le fichier de pagination .vswp d\'une machine virtuelle est-il créé sur le datastore ?',
      opts: [
        'Au moment de la mise sous tension (Power On) de la machine virtuelle.',
        'Dès la création de la VM dans l\'assistant de vCenter.',
        'Uniquement lorsque la mémoire physique de l\'hôte atteint 100% d\'utilisation.',
        'Lors de la création du premier snapshot différentiel.'
      ],
      correct: 0,
      exp: 'Le fichier .vswp est alloué sur le datastore dès l\'allumage de la machine virtuelle. Sa taille est égale à la mémoire allouée moins la réservation mémoire garantie.'
    },
    {
      q: 'Que devient le fichier de disque principal `-flat.vmdk` lorsqu\'un administrateur prend un snapshot d\'une VM ?',
      opts: [
        'Il est verrouillé en lecture seule et un nouveau disque différentiel (-delta.vmdk) intercepte les écritures.',
        'Il est immédiatement compressé et déplacé dans la corbeille de vCenter.',
        'Il est cloné intégralement vers le second hôte ESXi du cluster.',
        'Il est converti à chaud au format Thick Eager Zeroed.'
      ],
      correct: 0,
      exp: 'Lors de la création d\'un snapshot, le disque de base est figé en lecture seule pour préserver son état exact, tandis qu\'un fichier delta (.vmdk de cliché) enregistre toutes les modifications ultérieures.'
    },
    {
      q: 'Dans un Resource Pool, quand les parts (Shares) entrent-elles en jeu pour déterminer l\'allocation des ressources ?',
      opts: [
        'Uniquement en situation de contention (saturation des ressources physiques de l\'hôte).',
        'En permanence, même si le serveur physique n\'est utilisé qu\'à 10%.',
        'Uniquement lors des sauvegardes nocturnes déclenchées par l\'API VADP.',
        'Seulement lorsque la machine virtuelle subit un crash système.'
      ],
      correct: 0,
      exp: 'Les Shares (LOW 2000, NORMAL 4000, HIGH 8000) sont des parts relatives de priorité qui ne s\'activent qu\'en cas de conflit ou de saturation (contention) des ressources processeur ou mémoire.'
    },
    {
      q: 'Quelle est la taille d\'un fichier .vswp pour une VM configurée avec 32 Go de RAM et une réservation mémoire de 32 Go ?',
      opts: [
        '0 Go (aucun fichier d\'échange requis car la mémoire est garantie à 100%).',
        '32 Go (la taille de la RAM allouée).',
        '64 Go (le double de la RAM par mesure de sécurité).',
        '16 Go (la moitié de la RAM allouée).'
      ],
      correct: 0,
      exp: 'Taille .vswp = RAM allouée - RAM réservée. Si 32 Go sont alloués et 32 Go sont réservés, la différence est nulle : aucun espace de swap n\'est réservé sur le datastore.'
    },
    {
      q: 'Pourquoi une accumulation excessive de snapshots dégrade-t-elle les performances d\'I/O d\'une VM ?',
      opts: [
        'Les lectures nécessitent de parcourir successivement l\'ensemble des fichiers deltas de la chaîne.',
        'La carte réseau virtuelle passe automatiquement du mode 10G au mode 100M.',
        'Le contrôleur SCSI virtuel bascule en émulation IDE lente.',
        'L\'hyperviseur désactive l\'Hyper-Threading sur tous les cœurs du socket.'
      ],
      correct: 0,
      exp: 'Pour lire un bloc de données, le VMkernel doit d\'abord chercher s\'il a été modifié dans le delta le plus récent, puis remonter la chaîne des deltas jusqu\'au disque plat d\'origine, augmentant la latence d\'accès.'
    },
    {
      q: 'Que se passe-t-il si un Resource Pool possède une Limit CPU fixée à 4000 MHz alors que l\'application en réclame 6000 MHz et que le cluster est inoccupé ?',
      opts: [
        'L\'allocation est strictement bridée à 4000 MHz, créant un goulot d\'étranglement artificiel.',
        'La limite est ignorée dynamiquement et l\'application reçoit ses 6000 MHz.',
        'L\'hyperviseur éteint immédiatement la VM pour non-respect des quotas.',
        'Une alarme sonore retentit sur les haut-parleurs physiques du serveur.'
      ],
      correct: 0,
      exp: 'La directive Limit impose un plafond rigide. Même si le processeur de l\'hôte est libre à 90%, l\'hyperviseur bride l\'exécution à la valeur de la limite configurée.'
    }
  ],

  flashcards: [
    {
      q: 'Quel est le rôle du fichier .vmx d\'une VM ?',
      a: 'Fichier de configuration en texte ASCII décrivant le matériel virtuel, l\'affectation mémoire, les vCPUs et les cartes réseaux.'
    },
    {
      q: 'Quelle est la formule de calcul de la taille du fichier de swap .vswp ?',
      a: 'Taille du fichier .vswp = RAM allouée à la VM - Réservation de RAM garantie.'
    },
    {
      q: 'Comment fonctionne un snapshot de machine virtuelle VMware ?',
      a: 'Le disque de base est figé en lecture seule et un disque différentiel (-delta.vmdk) capture l\'ensemble des écritures ultérieures.'
    },
    {
      q: 'Pourquoi les snapshots ne constituent-ils pas une sauvegarde ?',
      a: 'Parce que les disques deltas dépendent entièrement du disque de base et dégradent les performances d\'I/O s\'ils ne sont pas consolidés.'
    },
    {
      q: 'Quelle est la différence entre Reservation et Limit dans un Resource Pool ?',
      a: 'Reservation garantit une quantité minimale disponible au démarrage ; Limit impose un plafond strict qu\'il est impossible de dépasser.'
    },
    {
      q: 'Quand les Shares (parts de priorité) s\'appliquent-elles ?',
      a: 'Exclusivement lorsque les ressources physiques du serveur ou du cluster sont en situation de contention (saturation).'
    }
  ],

  mastery: [
    'Déployer l\'appliance vCenter Server (VCSA) et structurer un inventaire hiérarchique avec Clusters et Datacenters.',
    'Analyser et éditer de manière sécurisée les directives de configuration du fichier .vmx d\'une machine virtuelle.',
    'Modéliser la croissance des disques deltas de snapshots et planifier les consolidations de disques virtuels.',
    'Calculer la taille précise des fichiers d\'échange .vswp et optimiser l\'espace disque des datastores.',
    'Configurer les Resource Pools avec des Shares, Réservations et Limites équilibrées pour garantir les SLA applicatifs.'
  ]
};
