/**
 * Chapitre 4 du cours « Windows Server B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Services de Fichiers, Permissions NTFS vs Partage SMB &amp; Espaces de Stockage',
  short: 'Fichiers, Partage SMB, NTFS &amp; Stockage',
  toc: 'Systèmes de fichiers Windows (NTFS vs ReFS, métadonnées, flux alternatifs ADS et résilience), partage de fichiers réseau SMB 3.1.1, calcul mathématique des permissions réseau effectives (règle universelle du plus restrictif entre Partage et NTFS), hiérarchie officielle d’arbitrage des ACEs dans les DACL (Explicit Deny > Explicit Allow > Inherited Deny > Inherited Allow), chiffrement BitLocker et EFS, déduplication de données (Data Deduplication), et technologies d’Espaces de Stockage (Storage Spaces, pools et résilience Simple, Mirror 2/3 voies et Parité).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Le partage de fichiers et la sécurisation des données stockées constituent le premier service historique d’un serveur d’entreprise. Pourtant, la coexistence des permissions de partage réseau (SMB) et des listes de contrôle d’accès du système de fichiers (NTFS) engendre fréquemment des failles de sécurité majeures ou des blocages d’utilisateurs incompréhensibles si la règle du plus restrictif n’est pas rigoureusement assimilée. De surcroît, la gestion moderne du stockage ne se limite plus à formater des disques physiques isolés : elle intègre des technologies avancées de mutualisation et de tolérance aux pannes comme les Espaces de Stockage (Storage Spaces), la déduplication pour réduire les coûts d’infrastructure et les systèmes de fichiers modernes comme ReFS. Pour un ingénieur de niveau Bachelor 3, la gouvernance des données exige une maîtrise mathématique de la combinatoire des droits d’accès et un dimensionnement précis des architectures de stockage résilientes.',
  objectives: [
    'comparer les architectures des systèmes de fichiers d’entreprise Windows Server : NTFS et ReFS (Resilient File System) ;',
    'distinguer les autorisations de partage SMB (Read, Change, Full Control) des permissions granulaires NTFS ;',
    'calculer avec une rigueur mathématique absolue la permission réseau effective résultante selon la règle du plus restrictif ;',
    'appliquer la hiérarchie officielle des ACEs dans la DACL : Explicit Deny > Explicit Allow > Inherited Deny > Inherited Allow ;',
    'dimensionner et configurer des pools de disques avec Storage Spaces (Simple, Two-Way Mirror, Three-Way Mirror, Parity) et mesurer la tolérance aux pannes ;',
    'implémenter en Python 3 des calculateurs de droits effectifs SMB/NTFS, des arbitres de conflits d’héritage et des simulateurs d’espaces de stockage.'
  ],
  sections: [
    {
      title: 'Systèmes de Fichiers d’Entreprise : NTFS vs ReFS',
      html: [
        '<p>Windows Server prend en charge deux systèmes de fichiers majeurs destinés aux environnements de production d’entreprise :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Système de Fichiers NTFS (New Technology File System)</h4>',
        '    <ul>',
        '      <li><strong>Fonctionnalités clés :</strong> listes de contrôle d’accès de sécurité (DACL), journalisation des métadonnées (journal USN), quotas de disques, compression native, chiffrement transparent (EFS) et flux de données alternatifs (ADS - Alternate Data Streams).</li>',
        '      <li><strong>Taille maximale :</strong> jusqu’à 8 Pétaoctets (Po) avec une taille de cluster de 2 Mo.</li>',
        '      <li><strong>Usage cible :</strong> disques système (C:), partages de fichiers bureautiques standards et applications nécessitant des quotas fins.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le Système de Fichiers ReFS (Resilient File System)</h4>',
        '    <ul>',
        '      <li><strong>Fonctionnalités clés :</strong> intégrité des flux de données avec contrôle de cohérence automatique (scrubbing), auto-réparation sans arrêt de service (absence de chkdsk hors ligne), allocations rapides de disques virtuels VHDX (Block Cloning) et résilience maximale aux corruptions de blocs.</li>',
        '      <li><strong>Limitations :</strong> non amorçable (impossible d’installer Windows Server sur un volume ReFS), pas de compression ni de chiffrement EFS natif.</li>',
        '      <li><strong>Usage cible :</strong> volumes de virtualisation Hyper-V et cibles de sauvegardes volumineuses (Veeam, Windows Server Backup).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Sécurité d’Accès Réseau : Règle du Plus Restrictif & Hiérarchie DACL',
      html: [
        '<p>Lorsqu’un utilisateur accède à un dossier à travers le réseau local via le protocole SMB, deux couches de sécurité s’exécutent simultanément :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>La Règle du Plus Restrictif (Share vs NTFS)</h4>',
        '    <p>L’accès réseau effectif est l’intersection la plus restrictive entre les droits de partage SMB et les permissions NTFS :</p>',
        '    <table class="table">',
        '      <thead><tr><th>Partage SMB</th><th>Système NTFS</th><th>Droit Réseau Effectif</th></tr></thead>',
        '      <tbody>',
        '        <tr><td>Read</td><td>Full Control</td><td><strong>Read (Lecture seule)</strong></td></tr>',
        '        <tr><td>Full Control</td><td>Read</td><td><strong>Read (Lecture seule)</strong></td></tr>',
        '        <tr><td>Change</td><td>Modify</td><td><strong>Modify (Lecture/Écriture/Suppression)</strong></td></tr>',
        '        <tr><td>Full Control</td><td>Full Control</td><td><strong>Full Control (Gestion des ACLs)</strong></td></tr>',
        '      </tbody>',
        '    </table>',
        '    <p><strong>Bonne pratique Microsoft :</strong> configurer le partage SMB avec <code>Tout le monde = Change</code> ou <code>Full Control</code>, et verrouiller la granularité fine exclusivement dans les permissions NTFS.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Hiérarchie Officielle des ACEs dans la DACL</h4>',
        '    <p>Pour un même utilisateur appartenant à plusieurs groupes cumulant des droits sur un fichier, les ACEs sont arbitrées selon 4 niveaux stricts :</p>',
        '    <ol>',
        '      <li><strong>1. Explicit Deny (Refus direct) :</strong> priorité absolue. Un refus explicite posé directement sur le fichier l’emporte sur n’importe quelle autorisation.</li>',
        '      <li><strong>2. Explicit Allow (Autorisation directe) :</strong> accorde le droit, surpassant tout refus hérité.</li>',
        '      <li><strong>3. Inherited Deny (Refus hérité) :</strong> refus provenant du dossier parent.</li>',
        '      <li><strong>4. Inherited Allow (Autorisation héritée) :</strong> autorisation transmise par le dossier parent.</li>',
        '    </ol>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Stockage Moderne d’Entreprise : Espaces de Stockage (Storage Spaces)',
      html: [
        '<p>La technologie <strong>Storage Spaces</strong> virtualise les disques durs physiques (SAS, SATA, NVMe) en pools de stockage pour créer des disques virtuels résilients :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Typologie des Disques Virtuels Résilients</h4>',
        '    <ul>',
        '      <li><strong>Simple (Sans résilience) :</strong> écriture par bandes (Striping style RAID-0). 1 disque minimum. Aucune tolérance de panne (0 disque). Capacité utile = 100 % du pool. Performance maximale mais risque de perte totale de données.</li>',
        '      <li><strong>Two-Way Mirror (Miroir double) :</strong> duplication des données en 2 exemplaires (style RAID-1). 2 disques minimum. Tolère la panne de <strong>1 disque</strong>. Capacité utile = 50 %. Idéal pour les VMs et les bases de données.</li>',
        '      <li><strong>Three-Way Mirror (Miroir triple) :</strong> duplication en 3 exemplaires. 5 disques minimum requis. Tolère la panne simultanée de <strong>2 disques</strong>. Capacité utile = 33,3 %.</li>',
        '      <li><strong>Parity (Parité distribuée) :</strong> calcul de parité par bandes (style RAID-5). 3 disques minimum. Tolère la panne de <strong>1 disque</strong>. Capacité utile = $(N - 1) / N$. Idéal pour les archives et le streaming vidéo séquentiel.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Déduplication de Données (Data Deduplication)</h4>',
        '    <p>Fonctionnalité native analysant les volumes NTFS/ReFS pour identifier les blocs de données dupliqués :</p>',
        '    <ul>',
        '      <li>Segmente les fichiers en blocs variables (de 32 à 128 Ko) et calcule leur empreinte de hachage.</li>',
        '      <li>Stocke une seule copie unique du bloc dans le magasin de blocs (Chunk Store) et remplace les doublons par des pointeurs de réanalyse (Reparse Points).</li>',
        '      <li>Permet d’économiser de 50 à 80 % d’espace disque sur les partages bureautiques et les banques de disques virtuels VHDX.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Privilégier le système de fichiers ReFS pour les volumes d’hébergement de machines virtuelles Hyper-V et NTFS pour les partages bureautiques.',
    'Appliquer la recommandation Microsoft : octroyer le droit de partage Change ou Full Control au niveau SMB et gérer l’étanchéité fine dans les ACLs NTFS.',
    'Analyser les droits effectifs résultants en calculant l’intersection minimale entre le niveau Partage et le niveau NTFS.',
    'Vérifier la présence d’Explicit Deny dans la DACL lors du diagnostic d’un utilisateur bloqué malgré son appartenance à un groupe autorisé.',
    'Dimensionner le pool de disques Storage Spaces en vérifiant que le nombre de disques physiques satisfait le prérequis du mode de résilience retenu.',
    'Activer la déduplication de données sur les volumes de partages de fichiers et planifier les tâches d’optimisation en heures creuses.'
  ],
  summary: [
    'NTFS fournit une sécurité granulaire fine (ACL, EFS, quotas), tandis que ReFS excelle en résilience et clonage de blocs pour Hyper-V.',
    'L’accès réseau via SMB applique toujours la règle du plus restrictif : $\\text{Droit effectif} = \\min(\\text{Partage SMB}, \\text{Permissions NTFS})$.',
    'La hiérarchie des ACEs au sein de la DACL suit l’ordre universel : Explicit Deny > Explicit Allow > Inherited Deny > Inherited Allow.',
    'Un refus explicite (Explicit Deny) posé sur un fichier verrouille l’accès quelles que soient les autorisations héritées par les groupes.',
    'Storage Spaces mutualise les disques physiques en pools offrant des modes résilients : Simple (0 panne), Miroir 2 voies (1 panne), Miroir 3 voies (2 pannes) et Parité (1 panne).',
    'La déduplication de données remplace les blocs redondants par des pointeurs dans le Chunk Store, libérant jusqu’à 80 % d’espace disque.'
  ],
  checklist: [
    'Le partage réseau est-il créé avec des autorisations SMB généreuses pour laisser la gouvernance aux permissions NTFS ?',
    'Chaque dossier partagé dispose-t-il d’une structure de permissions NTFS attribuant les accès à des groupes Locaux de Domaine (DL) ?',
    'L’utilisateur dispose-t-il bien des droits d’écriture à la fois dans le partage (Change) et dans le dossier local NTFS (Modify ou Write) ?',
    'Aucun refus explicite accidentel ne neutralise-t-il les droits d’un groupe métier sur l’arborescence des fichiers ?',
    'Le nombre de disques physiques est-il suffisant pour le type de résilience Storage Spaces sélectionné (min 2 en miroir, min 3 en parité) ?',
    'La tâche d’optimisation de la déduplication de données est-elle programmée hors des heures de production pour préserver les performances I/O ?'
  ],
  notions: [
    {
      name: 'Règle du Plus Restrictif',
      desc: 'Principe de sécurité imposant que l’accès réseau effectif soit égal à la restriction maximale entre les droits de partage SMB et les permissions NTFS.'
    },
    {
      name: 'DACL (Discretionary Access Control List)',
      desc: 'Liste ordonnée d’entrées de contrôle d’accès (ACE) définissant les autorisations et refus d’accès accordés aux utilisateurs et groupes sur un objet.'
    },
    {
      name: 'Explicit Deny',
      desc: 'Entrée d’interdiction définie directement sur un objet spécifique, possédant la priorité absolue sur toutes les autres autorisations.'
    },
    {
      name: 'ReFS (Resilient File System)',
      desc: 'Système de fichiers de nouvelle génération de Microsoft conçu pour maximiser la disponibilité des données et la résilience aux corruptions.'
    },
    {
      name: 'Storage Spaces',
      desc: 'Technologie de virtualisation du stockage Windows Server agrégeant des disques physiques hétérogènes en pools résilients.'
    },
    {
      name: 'Two-Way Mirror',
      desc: 'Mode de résilience d’Espaces de Stockage dupliquant chaque bloc de données sur deux disques distincts et tolérant la perte d’un disque physique.'
    },
    {
      name: 'Mode Parity',
      desc: 'Mode de résilience calculant une information de parité distribuée sur un minimum de trois disques physiques pour optimiser la capacité utile.'
    },
    {
      name: 'Déduplication de Données',
      desc: 'Service d’optimisation du stockage identifiant et éliminant les blocs de données redondants sur les volumes pour diviser l’espace occupé.'
    }
  ],
  pitfalls: [
    {
      title: 'Restriction excessive au niveau du partage SMB',
      desc: 'Configurer le partage SMB en Read bloque totalement les écritures des utilisateurs distants, même si leurs permissions NTFS sont en Full Control.'
    },
    {
      title: 'Explicit Deny appliqué sur le groupe « Tout le monde »',
      desc: 'Poser un refus explicite sur le groupe Tout le monde verrouille immédiatement l’accès à tous les comptes, y compris l’administrateur système du serveur.'
    },
    {
      title: 'Disques insuffisants pour un miroir triple',
      desc: 'Tenter de créer un espace de stockage Three-Way Mirror avec seulement 3 ou 4 disques échoue car le système impose un minimum de 5 disques physiques.'
    },
    {
      title: 'Tentative d’installation de l’OS sur volume ReFS',
      desc: 'ReFS n’étant pas un système de fichiers amorçable (non-bootable), le programme d’installation de Windows Server refuse de l’utiliser comme volume système C:.'
    }
  ],
  questions: [
    {
      stem: 'Si un utilisateur dispose de l’autorisation Partage « Change » et de la permission NTFS « Full Control », quel est son droit effectif à distance ?',
      opts: [
        'Full Control',
        'Change (Modify)',
        'Read uniquement',
        'Accès interdit'
      ],
      correct: 1,
      exp: 'En vertu de la règle du plus restrictif, le partage SMB (Change) bride le contrôle total NTFS : l’utilisateur peut modifier mais pas changer les ACLs.'
    },
    {
      stem: 'Quelle entrée de contrôle d’accès possède la plus haute priorité d’évaluation dans une DACL NTFS ?',
      opts: [
        'Inherited Allow',
        'Explicit Allow',
        'Inherited Deny',
        'Explicit Deny'
      ],
      correct: 3,
      exp: 'L’Explicit Deny (refus direct) est évalué en priorité absolue et surpasse immédiatement toutes les autorisations explicites ou héritées.'
    },
    {
      stem: 'Quel est le nombre minimum de disques physiques requis pour créer un espace de stockage en mode Parité (Parity) ?',
      opts: [
        '1 disque',
        '2 disques',
        '3 disques',
        '5 disques'
      ],
      correct: 2,
      exp: 'Le mode Parité nécessite au minimum 3 disques physiques pour répartir les bandes de données et le bloc de parité (style RAID-5).'
    },
    {
      stem: 'Quel système de fichiers Microsoft offre la fonctionnalité de clonage de blocs (Block Cloning) accélérant les disques virtuels Hyper-V ?',
      opts: [
        'FAT32',
        'exFAT',
        'NTFS',
        'ReFS'
      ],
      correct: 3,
      exp: 'ReFS intègre le Block Cloning qui permet de dupliquer les métadonnées de blocs VHDX instantanément sans copier les données réelles sur disque.'
    },
    {
      stem: 'Si un utilisateur reçoit une autorisation directe « Explicit Allow » sur un droit et hérite d’un « Inherited Deny », que se passe-t-il ?',
      opts: [
        'Le droit est refusé car tout Deny l’emporte',
        'Le droit est accordé car l’Explicit Allow l’emporte sur un refus hérité (Inherited Deny)',
        'L’ordinateur redémarre immédiatement',
        'Le fichier est verrouillé par l’administrateur'
      ],
      correct: 1,
      exp: 'Dans l’ordre des ACEs, l’Explicit Allow (priorité 2) est supérieur à l’Inherited Deny (priorité 3) : l’autorisation directe gagne sur le refus parent.'
    },
    {
      stem: 'Quelle est la tolérance aux pannes d’un pool de stockage en mode Two-Way Mirror ?',
      opts: [
        '0 disque en panne',
        '1 disque en panne',
        '2 disques en panne',
        '3 disques en panne'
      ],
      correct: 1,
      exp: 'Le miroir double conserve les données en deux copies distinctes : il tolère la défaillance d’un seul disque physique.'
    },
    {
      stem: 'Comment la déduplication de données Windows Server libère-t-elle de l’espace disque ?',
      opts: [
        'En compressant tous les fichiers au format ZIP',
        'En supprimant les fichiers qui n’ont pas été ouverts depuis 6 mois',
        'En remplaçant les blocs de données dupliqués par des pointeurs vers une copie unique stockée dans le Chunk Store',
        'En transférant automatiquement les fichiers vers le Cloud Azure'
      ],
      correct: 2,
      exp: 'La déduplication découpe les fichiers en blocs, stocke une copie unique dans le Chunk Store et insère des points de réanalyse dans les fichiers.'
    },
    {
      stem: 'Quelle est la bonne pratique recommandée par Microsoft pour la gestion des partages de fichiers SMB ?',
      opts: [
        'Bloquer le partage et ne travailler que localement sur le serveur',
        'Accorder Change ou Full Control au niveau du partage SMB et gérer les droits réels fins dans les permissions NTFS',
        'Attribuer un mot de passe différent par sous-dossier',
        'Désactiver totalement le protocole SMB pour utiliser FTP'
      ],
      correct: 1,
      exp: 'Ouvrir largement le partage SMB (Change/Full Control) permet de centraliser toute la sécurité dans les permissions NTFS sans redondance conflictuelle.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que la règle du plus restrictif ?',
      a: 'Le droit d’accès effectif via le réseau est l’intersection la plus restrictive entre les droits de partage SMB et les permissions NTFS.'
    },
    {
      q: 'Quel est l’ordre de priorité des ACEs dans une DACL NTFS ?',
      a: '1. Explicit Deny, 2. Explicit Allow, 3. Inherited Deny, 4. Inherited Allow.'
    },
    {
      q: 'Pourquoi utiliser ReFS plutôt que NTFS pour les VMs Hyper-V ?',
      a: 'Pour sa résilience contre les corruptions de données et sa fonctionnalité Block Cloning qui accélère la manipulation des disques VHDX.'
    },
    {
      q: 'Combien de disques physiques au minimum requiert le mode Storage Spaces Parity ?',
      a: 'Minimum 3 disques physiques (tolérance de panne de 1 disque).'
    },
    {
      q: 'Quelle est la capacité utile d’un pool Storage Spaces en Two-Way Mirror ?',
      a: '50 % de la capacité brute totale du pool de disques.'
    },
    {
      q: 'Comment fonctionne la déduplication de données ?',
      a: 'En identifiant les blocs dupliqués pour n’en conserver qu’une copie unique dans le Chunk Store avec des pointeurs de réanalyse.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Confusion dans le calcul du droit effectif Partage vs NTFS ou méconnaissance de la hiérarchie des ACEs.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de la combinatoire de sécurité, configuration propre des partages et dimensionnement des pools Storage Spaces.'
    },
    {
      cls: 'high',
      text: 'Excellence en gouvernance du stockage : architecture ReFS optimisée pour Hyper-V, déduplication avancée et résilience matérielle maximale.'
    }
  ]
};
