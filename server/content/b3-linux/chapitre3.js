/**
 * Chapitre 3 du cours « Linux Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Gestion Avancée du Stockage : LVM, RAID Logiciel &amp; Inodes',
  short: 'LVM, RAID mdadm &amp; Inodes',
  toc: 'Architecture LVM (Physical Extents, VG, LV, snapshots COW), tolérance aux pannes RAID mdadm (RAID 1, 5, 6), table d’inodes et diagnostic de saturation sous ext4/XFS.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans les environnements d’entreprise virtualisés ou cloud, le stockage de données ne peut pas reposer sur de simples partitions disques rigides et statiques (sda1, sda2). Une saturation d’espace imprévue sur /var ou /home exigerait un arrêt de service inacceptable pour redimensionner manuellement les partitions. L’ingénieur de niveau Bachelor 3 doit maîtriser les technologies d’abstraction de stockage sous Linux : LVM (Logical Volume Manager) pour agréger des disques physiques en pools extensibles, provisionner des volumes logiques à la demande et capturer des instantanés cohérents (snapshots COW) ; le sous-système RAID logiciel mdadm pour garantir la continuité d’activité face aux pannes matérielles de disques ; et la gestion interne des systèmes de fichiers modernes (ext4, XFS) pour diagnostiquer les incidents complexes d’épuisement de table d’inodes.',
  objectives: [
    'maîtriser l’architecture en trois couches de LVM : Physical Volumes (PV), Volume Groups (VG) et Logical Volumes (LV) ;',
    'comprendre le mécanisme d’allocation des Physical Extents (PE) et le calcul précis de capacité de stockage ;',
    'exploiter les snapshots LVM Copy-on-Write (COW) pour effectuer des sauvegardes de bases de données à chaud sans indisponibilité ;',
    'concevoir et administrer des grappes RAID logicielles avec mdadm (RAID 1, RAID 5, RAID 6) et gérer les disques de rechange (spares) ;',
    'analyser la structure interne des systèmes de fichiers journalisés (superblocs, groupes de blocs, tables d’inodes) ;',
    'développer en Python 3 des calculateurs d’allocation LVM, des simulateurs de résilience RAID et des détecteurs de saturation d’inodes.'
  ],
  sections: [
    {
      title: 'Architecture LVM : Des Disques Physiques aux Physical Extents',
      html: [
        '<p>LVM (Logical Volume Manager) intercale une couche d’abstraction matérielle entre les disques physiques et les systèmes de fichiers :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Trois Piliers de LVM</h4>',
        '    <ul>',
        '      <li><strong>PV (Physical Volume) :</strong> Disque brut (<code>/dev/nvme0n1</code>) ou partition RAID (<code>/dev/md0</code>) initialisé via <code>pvcreate</code>.</li>',
        '      <li><strong>VG (Volume Group) :</strong> Pool de stockage agrégé unifiant plusieurs PV via <code>vgcreate</code>. Le VG est découpé en blocs élémentaires de taille fixe appelés <strong>Physical Extents (PE)</strong> (généralement 4 Mo par défaut).</li>',
        '      <li><strong>LV (Logical Volume) :</strong> Partition virtuelle découpée dans le VG via <code>lvcreate</code>, allouant un certain nombre de PE. Un LV apparaît comme un périphérique bloc standard (<code>/dev/mapper/vg_data-lv_app</code>) formatable avec n’importe quel système de fichiers.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La Mécanique des Physical Extents (PE)</h4>',
        '    <p>La capacité totale d’un Volume Group est déterminée par :</p>',
        '    <p style="text-align:center;font-weight:bold;">$\\text{Total PE} = \\frac{\\sum \\text{Taille PV}}{\\text{Taille PE}}$</p>',
        '    <p>Lorsqu’un volume logique de 20 Go est créé avec des PE de 4 Mo :</p>',
        '    <p>$\\text{Nombre de PE} = \\frac{20 \\times 1024 \\text{ Mo}}{4 \\text{ Mo}} = 5\\,120 \\text{ PE}$.</p>',
        '    <p>Ce découpage par blocs permet d’agrandir un volume à chaud (<code>lvextend</code>) en lui rattachant simplement de nouveaux PE disponibles.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Snapshots LVM Copy-on-Write (COW) &amp; Sauvegardes à Chaud',
      html: [
        '<p>Un <strong>snapshot LVM</strong> fige l’état instantané d’un volume logique à un instant $T_0$ sans dupliquer les données immédiatement :</p>',
        box('standard', 'Mécanisme du Copy-on-Write (COW)', [
          '<ul>',
          '  <li>À la création du snapshot (<code>lvcreate -s -n lv_snap -L 5G /dev/vg0/lv_db</code>), aucun bloc n’est recopié. Le snapshot est instantané et consomme 0 Mo d’espace réel.</li>',
          '  <li>Tant que les blocs du volume d’origine ne changent pas, le snapshot lit les blocs directement sur le volume parent.</li>',
          '  <li>Dès qu’une application (ex: PostgreSQL) modifie un bloc sur le volume d’origine, le pilote LVM <strong>copie d’abord l’ancien bloc intact</strong> dans l’espace réservé du snapshot avant d’autoriser l’écriture du nouveau bloc.</li>',
          '  <li>L’outil de sauvegarde lit le snapshot pour archiver une image figée et cohérente de la base de données, tandis que la production continue d’écrire sans aucune pause.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'RAID Logiciel sous Linux avec mdadm : Niveaux 1, 5, 6 &amp; Résilience',
      html: [
        '<p>Le pilote noyau <code>md</code> (Multiple Device) et l’utilitaire <code>mdadm</code> fournissent une redondance matérielle sans nécessiter de contrôleur RAID physique propriétaire onéreux :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Niveau RAID</th><th>Disques Min.</th><th>Tolérance aux Pannes</th><th>Capacité Utile</th><th>Comportement &amp; Risque</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><code>RAID 1</code></td>',
        '      <td>2</td>',
        '      <td>$N - 1$ disques</td>',
        '      <td>1 disque ($C$)</td>',
        '      <td>Miroir complet. Excellente vitesse en lecture, mais 50% de perte de capacité brute.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>RAID 5</code></td>',
        '      <td>3</td>',
        '      <td><strong>1 seul disque</strong></td>',
        '      <td>$(N - 1) \\times C$</td>',
        '      <td>Parité distribuée. Risque critique : si un second disque tombe en panne pendant la reconstruction, <strong>100% des données sont perdues</strong>.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>RAID 6</code></td>',
        '      <td>4</td>',
        '      <td><strong>2 disques simultanés</strong></td>',
        '      <td>$(N - 2) \\times C$</td>',
        '      <td>Double parité Reed-Solomon. Recommandé en entreprise pour les gros volumes disques (&gt; 4 To).</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Systèmes de Fichiers : Tables d’Inodes &amp; Diagnostic de Saturation',
      html: [
        '<p>Dans un système de fichiers Unix (ext4, XFS), les données et les métadonnées sont rigoureusement séparées :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure d’un Inode (Index Node)</h4>',
        '    <p>Chaque fichier ou répertoire est représenté par un numéro d’inode contenant :</p>',
        '    <ul>',
        '      <li>Le type de fichier et les permissions Unix (rwxr-xr-x)</li>',
        '      <li>L’UID propriétaire et le GID de groupe</li>',
        '      <li>Les horodatages (atime, mtime, ctime)</li>',
        '      <li>Les pointeurs vers les blocs de données physiques du disque</li>',
        '      <li><strong>Le nom du fichier n’est pas dans l’inode</strong> : il est stocké dans le répertoire parent !</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le Piège Classique de la Saturation d’Inodes</h4>',
        '    <p>Une commande <code>df -h</code> peut afficher <strong>80 Go d’espace libre</strong>, alors que le serveur refuse d’écrire le moindre fichier avec l’erreur <code>No space left on device</code> !</p>',
        '    <p>La commande <code>df -i</code> révèle l’origine :</p>',
        '    <p>Si des millions de micro-fichiers de sessions ou de spools ont été générés, la <strong>table d’inodes est saturée à 100%</strong>, empêchant toute création de nouveau fichier.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Agrandissement à Chaud d’un Système de Fichiers LVM',
  method: [
    'Étape 1 : Vérifier l’espace disponible dans le Volume Group avec vgdisplay ou vgs.',
    'Étape 2 : Si le VG est saturé, initialiser un nouveau disque physique (pvcreate /dev/sdb) et l’ajouter au groupe (vgextend vg_data /dev/sdb).',
    'Étape 3 : Augmenter la taille du volume logique : lvextend -L +50G /dev/vg_data/lv_app.',
    'Étape 4 : Redimensionner le système de fichiers en ligne à chaud sans interruption de service :',
    '  - Pour ext4 : resize2fs /dev/vg_data/lv_app',
    '  - Pour XFS : xfs_growfs /point/de/montage',
    'Étape 5 : Vérifier avec df -h et df -i que l’espace bloc et les inodes utilisables ont bien augmenté.'
  ],
  summary: [
    'LVM sépare le stockage en trois couches : Physical Volumes (PV), Volume Groups (VG) et Logical Volumes (LV).',
    'Le VG est découpé en blocs élémentaires de taille fixe appelés Physical Extents (PE, typiquement 4 Mo).',
    'Les snapshots LVM Copy-on-Write (COW) permettent des sauvegardes de bases de données cohérentes sans arrêt de service.',
    'RAID 1 tolère N-1 pannes ; RAID 5 tolère 1 panne ; RAID 6 tolère 2 pannes simultanées avec double parité.',
    'Sur un RAID 5, la perte d’un deuxième disque pendant la reconstruction entraîne la perte totale et irréversible des données.',
    'Un inode stocke les métadonnées et pointeurs de blocs d’un fichier ; son nom réside dans le répertoire parent.',
    'Un système peut refuser d’écrire par saturation d’espace bloc (df -h) OU par épuisement de la table d’inodes (df -i).'
  ],
  checklist: [
    'Je sais expliquer la hiérarchie LVM complète (PV, VG, LV) et le rôle des Physical Extents (PE).',
    'Je comprends la mécanique d’un snapshot LVM Copy-on-Write et ses cas d’usage en sauvegarde.',
    'Je connais la tolérance aux pannes exacte des architectures RAID 1, RAID 5 et RAID 6.',
    'Je comprends le risque critique lié à la reconstruction d’une grappe RAID 5.',
    'Je sais quelles métadonnées sont stockées dans un inode et où se trouve le nom du fichier.',
    'Je sais diagnostiquer un blocage d’écriture dû à l’épuisement des inodes via la commande df -i.'
  ],
  notions: [
    'Architecture LVM (PV, VG, LV)',
    'Physical Extents (PE) & Logical Extents (LE)',
    'Snapshots Copy-on-Write (COW)',
    'Redimensionnement à chaud (lvextend, resize2fs, xfs_growfs)',
    'RAID logiciel Linux (mdadm)',
    'Disques de réserve (Hot Spares & Rebuild)',
    'Structure interne des Inodes',
    'Saturation asymétrique Inodes vs Blocs (df -i)'
  ],
  pitfalls: [
    'Oublier de redimensionner le système de fichiers après un lvextend (la partition grandit mais l’espace reste invisible).',
    'Laisser un snapshot LVM se remplir à 100% (le snapshot devient invalide et est immédiatement désactivé par LVM).',
    'Utiliser du RAID 5 sur des disques modernes de très grande capacité (le risque d’erreur URE pendant la reconstruction est critique).',
    'Rechercher le nom d’un fichier à l’intérieur de son inode (le nom n’existe que dans le bloc de données du dossier parent).'
  ],
  questions: [
    {
      stem: 'Dans l’architecture LVM, qu’est-ce qu’un « Physical Extent » (PE) ?',
      opts: [
        'Un câble SATA reliant le disque à la carte mère',
        'Le bloc élémentaire de taille fixe (généralement 4 Mo) qui compose la granularité d’allocation d’un Volume Group',
        'Une partition de boot réservée à GRUB2',
        'Un protocole réseau pour monter des disques iSCSI'
      ],
      correct: 1,
      exp: 'LVM découpe l’espace des disques physiques en petits blocs de taille fixe appelés Physical Extents (PE). Toute allocation de volume logique se fait par multiples entiers de PE.'
    },
    {
      stem: 'Comment fonctionne un snapshot LVM Copy-on-Write (COW) lors de la modification d’une donnée sur le volume parent ?',
      opts: [
        'Il duplique l’intégralité du disque à chaque écriture',
        'Il copie l’ancien bloc intact dans l’espace réservé du snapshot avant d’autoriser l’écriture du nouveau bloc sur le volume d’origine',
        'Il compresse le disque avec l’algorithme gzip',
        'Il bloque toutes les écritures sur le serveur jusqu’à la fin de la sauvegarde'
      ],
      correct: 1,
      exp: 'Le principe Copy-on-Write ne copie que les blocs modifiés : l’ancien bloc inchangé est d’abord sauvegardé dans la réserve du snapshot, permettant de reconstituer l’état historique figé.'
    },
    {
      stem: 'Combien de pannes simultanées de disques une grappe en RAID 6 avec 6 disques physiques peut-elle supporter sans perte de données ?',
      opts: [
        '1 panne',
        '2 pannes',
        '3 pannes',
        '5 pannes'
      ],
      correct: 1,
      exp: 'Le RAID 6 utilise deux blocs de parité distincts (double parité) et tolère de manière garantie la défaillance simultanée de jusqu’à 2 disques quel que soit le nombre total de disques.'
    },
    {
      stem: 'Où le nom d’un fichier sous Linux est-il physiquement stocké ?',
      opts: [
        'Dans son inode directement',
        'Dans le bloc de données de son répertoire parent, associé à son numéro d’inode',
        'Dans le secteur d’amorçage MBR',
        'Dans le fichier /etc/fstab'
      ],
      correct: 1,
      exp: 'L’inode ne contient ni le nom ni le chemin du fichier. Les répertoires sous Unix sont de simples tables associant des noms de fichiers à des numéros d’inodes.'
    },
    {
      stem: 'Que signifie un système qui refuse de créer un nouveau fichier avec « No space left on device » alors que « df -h » indique 50 Go d’espace libre ?',
      opts: [
        'Le processeur est en surchauffe',
        'La table d’inodes du système de fichiers est saturée à 100% (constatable avec df -i)',
        'Le câble réseau est débranché',
        'La mémoire swap est désactivée'
      ],
      correct: 1,
      exp: 'Si un grand nombre de petits fichiers a consommé tous les inodes alloués lors du formatage, aucun nouveau fichier ne peut être créé même s’il reste des gigaoctets de blocs disques libres.'
    },
    {
      stem: 'Quelle commande permet d’étendre à chaud un système de fichiers ext4 après avoir agrandi son volume logique LVM ?',
      opts: [
        'xfs_growfs',
        'resize2fs',
        'fdisk -l',
        'mkfs.ext4'
      ],
      correct: 1,
      exp: 'resize2fs permet d’agrandir à chaud en ligne un système de fichiers ext4 sans démonter la partition.'
    },
    {
      stem: 'Que se passe-t-il si un second disque tombe en panne sur une grappe RAID 5 alors qu’un premier disque est déjà défaillant et en cours de reconstruction ?',
      opts: [
        'Le système passe en mode lecture seule sans aucune perte',
        'La grappe RAID bascule en échec complet (FAILED) et l’intégralité des données est définitivement perdue',
        'Le noyau reconstruit les données à partir de la mémoire vive',
        'Le système de fichiers ignore l’erreur automatiquement'
      ],
      correct: 1,
      exp: 'Le RAID 5 ne dispose que d’un seul niveau de parité : la perte d’un second disque avant la fin de la reconstruction rend la reconstitution mathématique impossible, provoquant la perte irrémédiable des données.'
    },
    {
      stem: 'Quelle commande LVM permet d’ajouter un nouveau disque physique dans un Volume Group existant ?',
      opts: [
        'pvcreate',
        'vgextend',
        'lvextend',
        'vgchange'
      ],
      correct: 1,
      exp: 'vgextend intègre un ou plusieurs nouveaux Physical Volumes (PV) au pool de stockage d’un Volume Group (VG) existant.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’un Volume Group (VG) dans LVM ?',
      a: 'Un pool de stockage global formé par l’agrégation d’un ou plusieurs disques physiques (PV), découpé en extents de taille fixe (PE).'
    },
    {
      q: 'Quel est le principe d’un snapshot LVM Copy-on-Write (COW) ?',
      a: 'Il capture l’état instantané d’un volume en ne copiant vers l’espace du snapshot que les blocs originaux qui subissent une nouvelle écriture.'
    },
    {
      q: 'Combien de pannes de disques un RAID 5 peut-il tolérer ?',
      a: 'Exactement 1 seule panne de disque. Toute seconde défaillance avant reconstruction complète détruit l’intégralité des données.'
    },
    {
      q: 'Quelle est la différence fondamentale entre RAID 5 et RAID 6 ?',
      a: 'RAID 5 possède une parité simple (tolère 1 panne) ; RAID 6 intègre une double parité Reed-Solomon (tolère 2 pannes simultanées).'
    },
    {
      q: 'Quelles informations essentielles sont stockées dans un inode Linux ?',
      a: 'Permissions, UID/GID, horodatages, taille, pointeurs de blocs de données physiques (mais jamais le nom du fichier).'
    },
    {
      q: 'Quelle commande permet de vérifier le taux d’utilisation des inodes d’un système de fichiers ?',
      a: 'df -i, indispensable pour détecter l’épuisement des inodes indépendamment de l’espace disque exprimé en gigaoctets.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à articuler PV, VG et LV ou confusion entre espace bloc (Go) et table d’inodes.'
    },
    {
      cls: 'medium',
      text: 'Bonne manipulation des commandes LVM et mdadm, compréhension des niveaux RAID et surveillance conjointe de df -h et df -i.'
    },
    {
      cls: 'high',
      text: 'Conception avancée d’architectures de stockage résilientes, dimensionnement précis des PE, gestion experte des snapshots COW et reconstructions RAID sécurisées.'
    }
  ]
};
