/**
 * Chapitre 2 du cours « Linux Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Initialisation &amp; Gestionnaire de Services Systemd Avancé',
  short: 'Systemd &amp; Journald Avancé',
  toc: 'Séquence d’initialisation (UEFI, GRUB2, initramfs), architecture de Systemd (PID 1), gestion déclarative des unités (.service, .socket, .target), graphes de dépendances et analyse de journaux avec journald.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Le démarrage d’un serveur Linux est un processus complexe orchestrant la détection matérielle, le chargement du noyau et le lancement des services réseau. Historiquement, le système hérité SysVinit reposait sur de lourds scripts bash séquentiels (/etc/init.d/) lents, fragiles et incapables de gérer les dépendances dynamiques. Aujourd’hui, Systemd est le gestionnaire de système et de services standard de toutes les distributions Linux majeures. En tant que premier processus de l’espace utilisateur (PID 1), Systemd gère la parallélisation du boot, la supervision de processus via cgroups, l’activation paresseuse par socket (Socket Activation) et la journalisation binaire structurée avec Journald. Maîtriser Systemd à un niveau avancé est une compétence cardinale pour tout administrateur ou ingénieur DevOps.',
  objectives: [
    'analyser la séquence complète de démarrage Linux : microprogramme UEFI/BIOS, chargeur GRUB2, image initramfs et switch_root ;',
    'comprendre le rôle central de Systemd (PID 1) et sa gestion native des processus via les cgroups ;',
    'concevoir et valider des fichiers d’unités Systemd (.service, .socket, .timer, .target) conformes aux exigences d’entreprise ;',
    'maîtriser le graphe de dépendances (Requires, Wants, After, Before) et prévenir les blocages circulaires (deadlocks) ;',
    'exploiter l’activation par socket (Socket Activation) pour éliminer les dépendances d’ordre et démarrer les démons à la demande ;',
    'développer en Python 3 des validateurs d’unités de service, des détecteurs de cycles de dépendances et des parseurs d’événements Journald.'
  ],
  sections: [
    {
      title: 'La Séquence d’Initialisation Linux : De l’UEFI à Systemd (PID 1)',
      html: [
        '<p>Le démarrage d’une machine Linux traverse quatre phases ordonnées avant de céder la main à l’espace utilisateur :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Matériel &amp; Chargeur d’Amorçage (GRUB2)</h4>',
        '    <ul>',
        '      <li><strong>UEFI / BIOS :</strong> Initialisez le matériel physique (POST) et lit la partition système EFI (ESP) pour charger le gestionnaire d’amorçage.</li>',
        '      <li><strong>GRUB2 (Grand Unified Bootloader) :</strong> Présente le menu de boot, charge l’image compressée du noyau (<code>vmlinuz</code>) et le disque mémoire initial (<code>initramfs</code>) en RAM, puis passe la main au noyau en Ring 0.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Noyau, initramfs &amp; switch_root</h4>',
        '    <ul>',
        '      <li><strong>initramfs (Initial RAM File System) :</strong> Petit environnement root temporaire en mémoire contenant les pilotes nécessaires (contrôleurs RAID, LVM, déchiffrement LUKS, pilotes NVMe) pour monter la vraie partition racine.</li>',
        '      <li><strong>switch_root :</strong> Une fois le vrai système de fichiers racine monté en lecture-écriture, le noyau exécute <code>switch_root</code> et lance le tout premier processus utilisateur : <strong>Systemd avec le PID 1</strong>.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Architecture des Unités Systemd : Types d’Unités &amp; Directives',
      html: [
        '<p>Dans Systemd, toute ressource gérée est une <strong>unité (Unit)</strong> définie dans un fichier texte déclaratif placé dans <code>/etc/systemd/system/</code> (priorité administrateur) ou <code>/lib/systemd/system/</code> (fichiers fournis par les paquets de la distribution) :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Type d’Unité</th><th>Extension</th><th>Rôle Opérationnel &amp; Caractéristiques</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td>Service</td><td><code>.service</code></td><td>Gère un démon ou processus en arrière-plan (démarrage, arrêt, redémarrage automatique).</td></tr>',
        '    <tr><td>Socket</td><td><code>.socket</code></td><td>Encapsule un socket réseau ou IPC pour l’activation à la demande (Socket Activation).</td></tr>',
        '    <tr><td>Timer</td><td><code>.timer</code></td><td>Planification temporelle d’événements (remplaçant moderne et fiable de cron avec logging unifié).</td></tr>',
        '    <tr><td>Target</td><td><code>.target</code></td><td>Point de synchronisation regroupant d’autres unités (ex: <code>multi-user.target</code>, <code>graphical.target</code>).</td></tr>',
        '    <tr><td>Mount</td><td><code>.mount</code></td><td>Gère un point de montage de système de fichiers (alternative déclarative à <code>/etc/fstab</code>).</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Ordonnancement, Graphes de Dépendances &amp; Socket Activation',
      html: [
        '<p>Systemd construit un graphe orienté acyclique pour démarrer un maximum de services <strong>en parallèle</strong> dès la mise sous tension :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Dépendances vs Ordonnancement</h4>',
        '    <p>Il ne faut jamais confondre l’exigence d’activation et l’ordre temporel :</p>',
        '    <ul>',
        '      <li><code>Requires=</code> / <code>Wants=</code> : Déclare qu’un service a besoin d’un autre (dépendance d’état), mais <strong>n’impose aucun ordre</strong> ! Les deux services démarreront en même temps si <code>After=</code> n’est pas ajouté.</li>',
        '      <li><code>After=</code> / <code>Before=</code> : Définit strictement l’ordre chronologique de démarrage, sans créer de dépendance d’activation.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La Révolution de la Socket Activation</h4>',
        '    <p>Pour éliminer le besoin de synchroniser les services au démarrage :</p>',
        '    <p>Systemd ouvre le socket réseau (ex: port 80 ou 3306) au boot. Si le client web tente de se connecter alors que la base de données n’a pas fini de démarrer, la connexion TCP est mise en attente dans le buffer du noyau.</p>',
        '    <p>Dès que le démon démarre, Systemd lui transmet le descripteur de fichier déjà ouvert via <code>sd_listen_fds(3)</code> sans perdre un seul paquet client.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Journalisation Centralisée avec systemd-journald &amp; journalctl',
      html: [
        '<p>Le démon <code>systemd-journald</code> capte automatiquement les flux <code>stdout</code> et <code>stderr</code> de tous les services, les messages du noyau (klog) et les événements syslog dans des fichiers binaires indexés sous <code>/var/log/journal/</code>.</p>',
        box('standard', 'Commandes Essentielles de journalctl en Production', [
          '<pre><code># Suivre en direct les logs d’un service specifique\njournalctl -u nginx.service -f\n\n# Filtrer par niveau de gravite (de 0:emerg a 3:err)\njournalctl -p err -b\n\n# Afficher uniquement les logs du boot courant\njournalctl -b 0\n\n# Afficher la sortie au format JSON structure pour injection SIEM\njournalctl -u api.service -o json-pretty</code></pre>'
        ])
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Création &amp; Durcissement d’une Unité de Service en Production',
  method: [
    'Étape 1 : Rédiger le fichier dans /etc/systemd/system/mon-app.service avec Description explicite.',
    'Étape 2 : Définir un utilisateur non privilégié dédié : User=appuser et Group=appuser.',
    'Étape 3 : Spécifier la commande de lancement avec son chemin absolu complet : ExecStart=/usr/bin/python3 /opt/app/main.py.',
    'Étape 4 : Configurer le redémarrage automatique en cas de plantage : Restart=on-failure et RestartSec=5s.',
    'Étape 5 : Appliquer les directives de bac à sable de sécurité : ProtectSystem=strict, ProtectHome=true, NoNewPrivileges=true.',
    'Étape 6 : Recharger la configuration du gestionnaire : systemctl daemon-reload, puis activer au démarrage avec systemctl enable --now mon-app.'
  ],
  summary: [
    'La séquence de démarrage s’enchaîne : UEFI &rarr; GRUB2 &rarr; Noyau/initramfs &rarr; switch_root &rarr; Systemd (PID 1).',
    'Systemd est le gestionnaire de système universel organisant les ressources en unités (.service, .socket, .timer, .target).',
    'La directive ExecStart d’un service exige obligatoirement un chemin absolu débutant par « / ».',
    'Requires/Wants définit la dépendance d’activation, tandis que After/Before définit l’ordre chronologique de démarrage.',
    'L’activation par socket (Socket Activation) permet de démarrer des démons à la demande et supprime les temps d’attente.',
    'systemd-journald enregistre les logs sous format binaire structuré, consultables et filtrables avec journalctl.'
  ],
  checklist: [
    'Je connais les étapes successives du démarrage d’un système Linux (de l’UEFI à PID 1).',
    'Je sais rédiger une unité Systemd complète avec ses sections [Unit], [Service] et [Install].',
    'Je comprends la différence fondamentale entre Requires= et After=.',
    'Je sais pourquoi l’utilisation de chemins absolus est obligatoire dans ExecStart.',
    'Je comprends le mécanisme et les avantages de la Socket Activation.',
    'Je sais utiliser journalctl avec les options -u, -p, -b et -f pour diagnostiquer un incident.'
  ],
  notions: [
    'Séquence d’amorçage (UEFI, GRUB2, initramfs)',
    'Processus d’initialisation PID 1 (Systemd)',
    'Fichiers d’unités déclaratifs (.service, .socket, .target)',
    'Dépendances d’activation (Requires, Wants)',
    'Ordonnancement temporel (After, Before)',
    'Activation par socket (Socket Activation)',
    'Drapeaux de redémarrage (Restart=on-failure)',
    'Journalisation binaire structurée (systemd-journald)'
  ],
  pitfalls: [
    'Fournir un chemin d’exécutable relatif dans ExecStart= (ex: node server.js provoquera une erreur immédiate au démarrage).',
    'Croire que Requires= suffit pour ordonner le démarrage (sans After=, les deux services démarreront en parallèle au même instant).',
    'Créer des dépendances circulaires où deux unités se requièrent mutuellement (Systemd devra casser le lien et échouer le démarrage).',
    'Oublier d’exécuter systemctl daemon-reload après avoir modifié un fichier de service sous /etc/systemd/system/.'
  ],
  questions: [
    {
      stem: 'Quel est le tout premier processus exécuté dans l’espace utilisateur (User Space) sous un système Linux moderne ?',
      opts: [
        'bash (PID 100)',
        'systemd (PID 1)',
        'grub2 (PID 0)',
        'sshd (PID 2)'
      ],
      correct: 1,
      exp: 'Systemd est lancé par le noyau à l’issue de la phase d’initialisation initramfs via switch_root et reçoit obligatoirement l’identifiant de processus PID 1.'
    },
    {
      stem: 'Pourquoi la directive « ExecStart= » d’un service Systemd refuse-t-elle strictement les chemins relatifs ?',
      opts: [
        'Parce que le système de fichiers ext4 interdit les chemins relatifs',
        'Parce que Systemd s’exécute dans un environnement sans variable $PATH prédéfinie pour garantir un déterminisme et une sécurité absolus',
        'Parce que les chemins relatifs consomment trop de mémoire dans le cache du processeur',
        'Parce que Python refuse de s’exécuter avec des chemins relatifs'
      ],
      correct: 1,
      exp: 'Pour éviter qu’un binaire malveillant placé dans un répertoire temporaire ne soit exécuté à la place du démon officiel, Systemd n’utilise pas de $PATH utilisateur et exige des chemins absolus commençant par /.'
    },
    {
      stem: 'Quelle directive Systemd permet de spécifier que le service A doit attendre que le service B soit prêt avant de démarrer ?',
      opts: [
        'Requires=B.service',
        'After=B.service',
        'Wants=B.service',
        'WantedBy=B.service'
      ],
      correct: 1,
      exp: 'La directive After= gère exclusivement l’ordre chronologique : elle ordonne à Systemd d’attendre la fin de l’initialisation de B.service avant de lancer A.service.'
    },
    {
      stem: 'Dans quelle section d’un fichier d’unité Systemd la directive « WantedBy=multi-user.target » doit-elle être placée ?',
      opts: [
        '[Unit]',
        '[Service]',
        '[Install]',
        '[Target]'
      ],
      correct: 2,
      exp: 'WantedBy fait partie de la section [Install] et indique à quelle cible le service doit être rattaché lorsqu’on exécute la commande systemctl enable.'
    },
    {
      stem: 'Quel est le principe de l’activation par socket (Socket Activation) dans Systemd ?',
      opts: [
        'Forcer tous les services à communiquer obligatoirement par des connexions Wi-Fi',
        'Systemd écoute sur le socket dès le boot et ne démarre le démon en mémoire que lorsqu’un client envoie une première requête',
        'Chiffrer toutes les communications réseau avec une clé asymétrique RSA',
        'Désactiver le pare-feu pendant l’exécution du service'
      ],
      correct: 1,
      exp: 'La Socket Activation permet à Systemd de créer le socket à l’avance. Le démon n’est instancié que lorsqu’une requête arrive, réduisant la consommation de RAM à froid et parallélisant le boot.'
    },
    {
      stem: 'Quelle commande permet de suivre en temps réel les logs d’un service géré par Journald ?',
      opts: [
        'cat /var/log/messages',
        'journalctl -u mon-service.service -f',
        'tail -f /proc/kmsg',
        'dmesg --follow-all'
      ],
      correct: 1,
      exp: 'L’option -u cible l’unité Systemd et -f (follow) permet de suivre en direct l’ajout de nouvelles lignes de journaux dans la console.'
    },
    {
      stem: 'Quelle commande est impérative après avoir modifié un fichier d’unité dans /etc/systemd/system/ pour que Systemd prenne en compte les changements ?',
      opts: [
        'systemctl restart all',
        'systemctl daemon-reload',
        'reboot',
        'update-initramfs -u'
      ],
      correct: 1,
      exp: 'systemctl daemon-reload force Systemd à relire et recompiler en mémoire tous les fichiers de configuration d’unités du système.'
    },
    {
      stem: 'Dans un fichier d’unité, quelle directive garantit que le service redémarrera automatiquement si son processus plante avec une erreur ?',
      opts: [
        'Restart=on-failure',
        'AutoReboot=yes',
        'KeepAlive=true',
        'Retry=forever'
      ],
      correct: 0,
      exp: 'Restart=on-failure ordonne à Systemd de redémarrer le service uniquement si le processus se termine par un signal ou un code de sortie non-zéro.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est le rôle du premier processus utilisateur (PID 1) sous Linux ?',
      a: 'Initialiser le système, superviser les services en arrière-plan, gérer l’adoption des processus orphelins et orchestrer l’arrêt propre de la machine.'
    },
    {
      q: 'Pourquoi l’utilisation d’un chemin absolu est-elle obligatoire dans ExecStart ?',
      a: 'Pour garantir un déterminisme parfait et éviter les failles de sécurité où un binaire relatif imprévu serait exécuté via un $PATH falsifié.'
    },
    {
      q: 'Quelle est la différence fondamentale entre Requires= et After= ?',
      a: 'Requires= crée une dépendance d’activation (si A est lancé, B l’est aussi) ; After= impose un ordre chronologique temporel (A démarre après B).'
    },
    {
      q: 'Comment fonctionne la Socket Activation dans Systemd ?',
      a: 'Systemd écoute sur le socket dès le boot et transmet le descripteur au démon qui n’est démarré qu’à la réception de la première connexion.'
    },
    {
      q: 'Dans quel sous-dossier prioritaire les administrateurs placent-ils les unités Systemd personnalisées ?',
      a: 'Dans /etc/systemd/system/, qui surcharge les unités par défaut fournies par les paquets de la distribution dans /lib/systemd/system/.'
    },
    {
      q: 'Que fait la commande « systemctl daemon-reload » ?',
      a: 'Elle recharge en mémoire vive l’ensemble des fichiers d’unités et reconstruit le graphe de dépendances de Systemd.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à distinguer Requires= et After= ou écriture de chemins relatifs dans les unités de service.'
    },
    {
      cls: 'medium',
      text: 'Bonne rédaction des unités .service et .socket, utilisation fluide de systemctl et investigation efficace avec journalctl.'
    },
    {
      cls: 'high',
      text: 'Conception avancée de graphes de dépendances sans deadlocks, maîtrise complète de la Socket Activation et durcissement des services via cgroups.'
    }
  ]
};
