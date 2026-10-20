/**
 * Pages « examens » et « exercices » du cours « Virtualisation Avancée B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Virtualisation Avancée B3</h1>',
    '  <p class="lead">Deux épreuves académiques complètes d’ingénierie et d’architecture Datacenter conformes au cursus Bachelor 3 (IT / RSI) : hyperviseurs Type-1, surallocation vCPU et NUMA, administration vCenter, stockage clustered VMFS-6 et vSAN SPBM, réseaux virtuels vSwitch/VDS, haute disponibilité HA/DRS, mobilité vMotion, sauvegarde CBT et virtualisation de postes VDI.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Hyperviseurs Bare-Metal, Gestion vCenter &amp; Stockage vSAN', [
      '<h4>Partie 1 : Architectures d\'Hyperviseurs Type-1 &amp; Topologies NUMA (6 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément le fonctionnement d\'un hyperviseur Type-1 bare-metal (tel que VMware ESXi VMkernel ou Citrix XenServer Dom0) d\'un hyperviseur Type-2 hébergé (VirtualBox, VMware Workstation). Pourquoi le Type-1 offre-t-il des garanties de latence et de sécurité nettement supérieures en production ? (3 pts)</li>',
      '  <li>Un serveur physique bi-socket dispose de 2 processeurs Intel Xeon de 16 cœurs chacun (32 pCPUs au total, sans Hyper-Threading) et de 256 Go de RAM répartis uniformément en 2 nœuds NUMA de 128 Go chacun. Vous devez déployer une VM de base de données PostgreSQL dimensionnée à 12 vCPUs et 160 Go de RAM. Expliquez les conséquences de ce dimensionnement sur l\'accès mémoire NUMA (accès local vs accès distant via interconnexion UPI/QPI) et formulez une recommandation d\'optimisation architecturale. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Cycle de Vie de VM &amp; Gestion des Ressources vCenter (7 points)</h4>',
      '<ol>',
      '  <li>Décrivez les rôles respectifs des fichiers suivants sur le datastore : <code>vm.vmx</code>, <code>vm.vmdk</code>, <code>vm-flat.vmdk</code>, <code>vm-000001-delta.vmdk</code> et <code>vm.vswp</code>. À quel moment précis le fichier <code>.vswp</code> est-il créé et quelle est sa taille exacte ? (3 pts)</li>',
      '  <li>Expliquez le mécanisme de fonctionnement des Resource Pools sous VMware vCenter. Comment le VMkernel arbitre-t-il l\'attribution des cycles processeur en période de contention entre deux pools configurés avec des Shares HIGH (8000) et LOW (2000) ? Quel est l\'impact d\'une <code>Reservation</code> par rapport à une <code>Limit</code> ? (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Stockage Virtuel Clustered VMFS &amp; Hyperconvergence vSAN (7 points)</h4>',
      '<ol>',
      '  <li>Comparez le système de fichiers VMFS-6 à un système de fichiers classique comme ext4 ou NTFS. Quel mécanisme matériel (VAAI ATS - Atomic Test and Set) permet à plusieurs hôtes ESXi d\'écrire simultanément sur le même datastore sans corrompre les métadonnées ? (3 pts)</li>',
      '  <li>Un cluster vSAN 4 nœuds dispose d\'une capacité brute totale de 60 To. L\'administrateur applique la politique de stockage par défaut <code>FTT=1_RAID1</code> pour héberger 18 To de données de machines virtuelles. (a) Calculez l\'espace brut consommé sur le cluster. (b) Calculez la limite d\'espace utilisable en respectant la réserve obligatoire de Slack Space (20%). (c) L\'état du cluster est-il nominal, en avertissement ou saturé ? Justifiez par le calcul. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Hyperviseur Type-1 vs Type-2 (3 pts) :</strong> ' +
      '  - Hyperviseur Type-1 (Bare-Metal) : s\'exécute directement sur le matériel physique du serveur, sans système d\'exploitation hôte intermédiaire. Le micro-noyau (ex: VMware VMkernel) contrôle directement l\'ordonnancement des vCPUs, la mémoire physique (SLAT / EPT) et les contrôleurs d\'E/S. Aucun processus tiers ne vient concurrencer l\'hyperviseur. Latence ultra-faible, surface d\'attaque réduite (code base minimaliste &lt; 150 Mo), fiabilité maximale requise en Datacenter. ' +
      '  - Hyperviseur Type-2 (Hébergé) : s\'exécute comme une application au-dessus d\'un OS généraliste (Windows, Linux, macOS). Les accès disques et réseaux passent par les pilotes de l\'OS hôte, multipliant les changements de contexte et les couches d\'abstraction. Non viable pour héberger des centaines de VM en production critique.</li>',
      '  <li><strong>Analyse NUMA et Optimisation (3 pts) :</strong> ' +
      '  - Topologie de l\'hôte : 2 nœuds NUMA. Nœud 0 = 16 cœurs, 128 Go RAM. Nœud 1 = 16 cœurs, 128 Go RAM. ' +
      '  - VM requise : 12 vCPUs et 160 Go de RAM. ' +
      '  - Conséquence : Bien que les 12 vCPUs tiennent sur un seul socket (16 cœurs), les 160 Go de RAM dépassent la capacité locale d\'un seul nœud NUMA (128 Go). La VM devient une <em>Wide VM</em> (multi-nœud NUMA). Le VMkernel alloue 128 Go sur le Nœud 0 (accès local très rapide) et 32 Go sur le Nœud 1 via le bus inter-socket UPI/QPI. Tout accès aux 32 Go distants subira une pénalité de latence mémoire de 30% à 40%, dégradant les requêtes SQL intensives. ' +
      '  - Recommandation : Ajuster la mémoire à &le; 120 Go de RAM pour maintenir la VM dans un seul nœud NUMA (vNUMA local strict), OU distribuer les 12 vCPUs en 2 vNUMA nodes (6 vCPUs + 80 Go par socket) pour équilibrer parfaitement les accès mémoire de l\'instance PostgreSQL.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Fichiers de la VM &amp; Rôle du VSWP (3 pts) :</strong> ' +
      '  - <code>.vmx</code> : Fichier texte de configuration matérielle de la VM (vCPUs, contrôleurs SCSI, adresses MAC, disques attachés). ' +
      '  - <code>.vmdk</code> : Fichier descripteur de texte ASCII définissant la géométrie, la taille et le nom du fichier plat. ' +
      '  - <code>-flat.vmdk</code> : Fichier binaire brut hébergeant les blocs de données réels du disque virtuel. ' +
      '  - <code>-delta.vmdk</code> : Disque différentiel créé lors d\'un snapshot pour stocker les blocs modifiés depuis le cliché. ' +
      '  - <code>.vswp</code> : Fichier de pagination (swap) créé sur le datastore <em>à la mise sous tension de la VM</em>. Sa taille exacte est : <code>Taille = RAM_allouée - Réservation_RAM</code>. Si une VM a 16 Go de RAM avec 16 Go de réservation, son .vswp fait 0 Go ; sans réservation, il fait 16 Go d\'espace disque réservé.</li>',
      '  <li><strong>Resource Pools, Shares &amp; Réservations (4 pts) :</strong> ' +
      '  - Les Resource Pools permettent de partitionner hiérarchiquement les ressources CPU et mémoire d\'un cluster. ' +
      '  - Shares (Parts relatives) : Ne s\'appliquent qu\'en cas de <em>saturation (contention)</em> des ressources de l\'hôte. Si Pool 1 a 8000 shares et Pool 2 a 2000 shares (total 10000), Pool 1 reçoit 80% des cycles disponibles et Pool 2 reçoit 20%. En l\'absence de contention, chaque pool consomme selon ses besoins. ' +
      '  - Reservation : Valeur garantie réservée en amont (l\'hôte refuse de démarrer la VM si la réserve n\'est pas disponible). ' +
      '  - Limit : Plafond strict au-delà duquel le VMkernel n\'accorde plus aucun cycle processeur, même si le cluster a 90% de cycles CPU libres.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Système Clustered VMFS-6 &amp; ATS (3 pts) :</strong> ' +
      '  - Contrairement à NTFS ou ext4 (mono-serveur), VMFS est un système de fichiers de cluster partagé (Shared Clustered File System) : des dizaines d\'hôtes ESXi montent simultanément le même LUN SAN (Fibre Channel / iSCSI). ' +
      '  - VAAI ATS (Atomic Test and Set) : Primitives de déchargement matériel SCSI (opcode 0x89) permettant de verrouiller un bloc ou un secteur précis lors de la mise à jour des métadonnées (création de fichier, expansion de VMDK), plutôt que de poser une réservation SCSI complète sur l\'ensemble du LUN (SCSI Reserve/Release). Empêche les tempêtes de verrouillage et assure un passage à l\'échelle massif.</li>',
      '  <li><strong>Dimensionnement vSAN SPBM (4 pts) :</strong> ' +
      '  - Données VM : 18.0 To. Politique : <code>FTT=1_RAID1</code> (miroir x2.0). ' +
      '  - Espace brut consommé = 18.0 * 2.0 = <strong>36.0 To bruts</strong>. ' +
      '  - Réserve opérationnelle Slack Space (20%) : Limite utile = 60.0 * 0.80 = <strong>48.0 To bruts</strong>. ' +
      '  - Seuil d\'alerte Slack (85% de la limite utile) = 48.0 * 0.85 = 40.8 To bruts. ' +
      '  - Analyse : Consommation (36.0 To) &le; 40.8 To. Espace restant sous la limite de slack = 48.0 - 36.0 = 12.0 To. ' +
      '  - Statut : <strong>NOMINAL (HEALTHY)</strong>. Le cluster héberge sereinement les 18 To de données avec résilience miroir et conserve sa marge de reconstruction automatique en cas de panne d\'un nœud.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l\'Examen Final — Réseaux VDS, Haute Disponibilité HA/DRS, Continuité &amp; VDI', [
      '<h4>Partie 1 : Commutation Virtuelle vSwitch &amp; Distributed Switch VDS (5 points)</h4>',
      '<ol>',
      '  <li>Détaillez les différences architecturales entre un vSwitch Standard (VSS) configuré sur chaque hôte et un vSphere Distributed Switch (VDS) géré centralement par vCenter. Quels bénéfices apporte le VDS pour le suivi des connexions lors des migrations vMotion ? (2.5 pts)</li>',
      '  <li>Dans les politiques de sécurité d\'un Port Group, expliquez les risques de sécurité associés aux trois directives : Mode Promiscuous, Changements d\'adresse MAC (MAC address changes) et Transmissions forgées (Forged transmits). Quelle doit être la configuration recommandée en environnement de production sécurisé ? (2.5 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Clustering vSphere HA, DRS &amp; Mobilité à Chaud vMotion (8 points)</h4>',
      '<ol>',
      '  <li>Expliquez l\'architecture interne de vSphere HA : comment l\'agent FDM (Fault Domain Manager) élit-il un nœud Maître (Master) ? Par quels canaux le maître surveille-t-il la santé des hôtes Esclaves (Slave) pour différencier une panne d\'hôte (Host Failure) d\'un isolement réseau (Host Isolation) ? (4 pts)</li>',
      '  <li>Une machine virtuelle de base de données possède 64 Go de RAM et génère un rythme d\'écriture (Dirty Rate) de 50 Mo/s. L\'administrateur initie une migration vMotion sur un lien réseau dédié de 1 Gbps (débit effectif utilisable de 102.4 Mo/s). (a) Vérifiez si la migration converge. (b) Calculez le volume total de données transférées. (c) Calculez la durée totale de migration. (d) Si le lien réseau est saturé et que le Dirty Rate dépasse le débit réseau disponible, que se passe-t-il et comment vSphere résout-il cette situation ? (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Sauvegarde Dédupliquée CBT &amp; Virtualisation du Poste de Travail VDI (7 points)</h4>',
      '<ol>',
      '  <li>Comment la technologie Changed Block Tracking (CBT) optimise-t-elle les sauvegardes incrémentielles de machines virtuelles ? Décrivez le rôle du fichier <code>-ctk.vmdk</code> et expliquez pourquoi la sauvegarde directe au niveau hyperviseur (VADP) est supérieure à l\'installation d\'un agent de sauvegarde dans chaque OS invité. (3.5 pts)</li>',
      '  <li>Une entreprise déploie une infrastructure de 500 postes virtuels VDI (VMware Horizon ou Citrix Virtual Desktops). Les utilisateurs sont classés en deux profils : 400 utilisateurs bureautiques (15 IOPS moyens) et 100 développeurs (45 IOPS moyens). Pour absorber les démarrages massifs à 8h30 (Boot Storm), une surcapacité de 60% est requise. Calculez le nombre d\'IOPS total que la baie de stockage doit délivrer en heure de pointe. Quelle technologie de stockage (Full Flash NVMe vs disques mécaniques SAS) s\'impose et pourquoi ? (3.5 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Final', [
      '<h4>Corrigé Partie 1 (5 points)</h4>',
      '<ul>',
      '  <li><strong>VSS vs VDS (2.5 pts) :</strong> ' +
      '  - Standard Switch (VSS) : Configuré individuellement sur chaque hôte ESXi. Plan de contrôle (Control Plane) et plan de données (Data Plane) s\'exécutent tous deux sur l\'hôte local. La moindre modification de VLAN ou de Port Group doit être dupliquée manuellement sur chaque serveur ESXi, source d\'erreurs humaines et de divergences. ' +
      '  - Distributed Switch (VDS) : Le plan de contrôle est centralisé sur vCenter Server, tandis que le plan de données est distribué sur les VMkernel de tous les hôtes membres. Les Port Groups distribués (dvPortGroup) maintiennent une configuration unifiée et partagée. ' +
      '  - Bénéfice vMotion : Lors de la migration d\'une VM entre deux hôtes, le VDS conserve l\'état des ports virtuels (statistiques réseau, règles de sécurité, compteurs NetFlow/IPFIX) sans réinitialisation ni rupture de session réseau.</li>',
      '  <li><strong>Sécurité des Port Groups (2.5 pts) :</strong> ' +
      '  - Mode Promiscuous (Accepté par défaut sur VSS) : Permet à une interface virtuelle de capter l\'ensemble du trafic transitant sur le Port Group, même s\'il est destiné à une autre VM. Risque : écoute clandestine (sniffing) du trafic sensible par une VM compromise. ' +
      '  - Changements d\'adresse MAC (Accepté) : Permet au système invité de modifier son adresse MAC pour qu\'elle ne corresponde plus à celle assignée dans le fichier VMX. Risque : usurpation d\'identité réseau. ' +
      '  - Transmissions forgées (Accepté) : Permet à la VM d\'envoyer des paquets avec une adresse MAC source différente de celle de sa carte virtuelle. Risque : attaques de type Man-in-the-Middle et empoisonnement ARP (ARP spoofing). ' +
      '  - Recommandation durcie : Positionner les 3 paramètres impérativement sur <strong>Reject</strong> pour tous les Port Groups de production.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Architecture FDM &amp; Détection d\'Isolement (4 pts) :</strong> ' +
      '  - Élection FDM : L\'agent vSphere HA (FDM) élit un hôte Maître (Master) parmi les hôtes du cluster. L\'hôte ayant accès au plus grand nombre de datastores partagés est privilégié (départage par UUID d\'hôte le plus élevé). Tous les autres hôtes deviennent des Esclaves (Slaves). ' +
      '  - Canaux de surveillance : ' +
      '    1. Heartbeat Réseau : Les esclaves envoient périodiquement des paquets UDP de heartbeat (port 8182) au maître sur le réseau de management. ' +
      '    2. Heartbeat Datastore : Si un maître cesse de recevoir le heartbeat réseau d\'un esclave, il consulte les fichiers de heartbeat sur au moins 2 datastores partagés (fichiers <code>.vSphere-HA</code>). ' +
      '  - Différenciation Panne vs Isolement : ' +
      '    - Panne d\'hôte (Host Failure) : Aucun heartbeat réseau ET aucun heartbeat datastore. L\'hôte est hors tension (crash matériel). Le maître redémarre immédiatement les VM sinistrées sur les autres hôtes sains du cluster selon leur priorité (Restart Priority). ' +
      '    - Isolement réseau (Host Isolation) : Pas de heartbeat réseau, mais l\'esclave met toujours à jour son heartbeat datastore ET ne parvient plus à joindre sa passerelle d\'isolement par défaut. L\'hôte applique sa politique d\'isolement configurée (Power Off ou Shutdown des VM locales) pendant que le maître redémarre les VM ailleurs.</li>',
      '  <li><strong>Calcul vMotion &amp; Convergence (4 pts) :</strong> ' +
      '  - RAM VM = 64 Go = 65 536 Mo. Dirty Rate = 50.0 Mo/s. Débit réseau = 102.4 Mo/s. ' +
      '  - (a) Test de convergence : Dirty Rate (50.0 Mo/s) &lt; Débit réseau (102.4 Mo/s). Le taux d\'écriture est inférieur à la vitesse de transfert réseau, donc la migration <strong>converge</strong>. ' +
      '  - (b) Volume total transféré = 65 536 * (1.0 + 50.0 / 102.4) = 65 536 + 32 000 = <strong>97 536.0 Mo</strong>. ' +
      '  - (c) Durée totale = 97 536.0 / 102.4 = <strong>952.5 secondes (&approx; 15.9 minutes)</strong>. ' +
      '  - (d) En cas de Dirty Rate &ge; Débit réseau : Les itérations de pré-copie ne réduisent jamais le delta mémoire restant. Le temps de bascule sub-seconde ne peut être atteint. vSphere active la fonction <em>vMotion Stun During Page Send (SDPS)</em> : le VMkernel injecte de micro-ralentissements sur les vCPUs de la VM invité pour brider artificiellement son Dirty Rate et forcer la convergence finale.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Changed Block Tracking (CBT) &amp; VADP (3.5 pts) :</strong> ' +
      '  - CBT : Fonctionnalité du VMkernel qui trace au fil de l\'eau tous les blocs disques modifiés depuis le dernier snapshot ou la dernière sauvegarde, et les consigne dans un petit fichier bitmap <code>-ctk.vmdk</code>. ' +
      '  - Optimisation : Le logiciel de sauvegarde (Veeam, Commvault) interroge l\'API vSphere pour récupérer uniquement la liste des blocs modifiés au lieu de relire les centaines de gigaoctets du VMDK. Réduit la fenêtre de sauvegarde de plusieurs heures à quelques minutes et supprime la charge d\'E/S inutile sur le stockage. ' +
      '  - VADP (vStorage APIs for Data Protection) : Sauvegarde sans agent (agentless) directement par snapshot au niveau de la couche hyperviseur. Aucun agent résident dans l\'OS invité (pas de consommation CPU/RAM, pas de maintenance d\'agents, pas de faille de sécurité interne).</li>',
      '  <li><strong>Dimensionnement VDI &amp; Boot Storm (3.5 pts) :</strong> ' +
      '  - Profil Bureautique : 400 utilisateurs * 15 IOPS = 6 000 IOPS nominaux. ' +
      '  - Profil Développeurs : 100 utilisateurs * 45 IOPS = 4 500 IOPS nominaux. ' +
      '  - Total nominal = 6 000 + 4 500 = 10 500 IOPS. ' +
      '  - Pic matinal avec Boot Storm (+60%) : 10 500 * (1.0 + 0.60) = 10 500 * 1.60 = <strong>16 800 IOPS</strong>. ' +
      '  - Choix technologique : Le stockage <strong>Full Flash (SSD NVMe / SAS Flash)</strong> est indispensable. Un disque dur mécanique SAS 15k rpm ne délivre que 180 à 210 IOPS. Pour fournir 16 800 IOPS en disques mécaniques avec pénalité RAID, il faudrait plus de 100 disques physiques bruyants et énergivores. Une baie Full Flash moderne délivre sans difficulté des centaines de milliers d\'IOPS avec des latences inférieures à 1 milliseconde, éliminant tout ralentissement lors des démarrages simultanés.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Mémento technique' }, { href: 'exercices.html', label: 'Ateliers de code pratiques' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examen-blanc.html': {
      title: 'Examens blancs &amp; Épreuves corrigées — ' + course.brand,
      description: 'Contrôle continu et examen final corrigés du cours Virtualisation Avancée B3 : ESXi, vCenter, vSAN, vSwitch, HA, DRS, vMotion, CBT et VDI.',
      active: 'examen-blanc',
      body
    }
  };
}

/* ======================== Exercices & Ateliers ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Ateliers de programmation' }
  ]);

  const modulesHtml = chapterList.map(chapitre => [
    '    <section class="card">',
    '      <div class="card__head">',
    '        <span class="badge">Module ' + chapitre.n + '</span>',
    '        <span class="card__num">3 Ateliers Python 3</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitre' + chapitre.n + '.html#exercices">' + chapitre.title + '</a></h3>',
    '      <p class="card__desc">' + chapitre.toc + '</p>',
    '      <div class="card__foot">',
    '        <a class="btn btn--sm" href="chapitre' + chapitre.n + '.html#exercices">Accéder aux 3 exercices ' + ic('code') + '</a>',
    '      </div>',
    '    </section>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <header class="section-head">',
    '    <h1>Catalogue des 18 Ateliers de Programmation Pratique — ' + course.brand + '</h1>',
    '    <p class="section-head__lead">Chaque module s\'accompagne de 3 exercices interactifs conçus pour automatiser, simuler et valider vos architectures de Datacenter virtuel en Python 3.</p>',
    '  </header>',
    '',
    '  <div class="grid grid-2">' + modulesHtml + '</div>',
    '',
    '  <h2>Répertoire Exhaustif des 18 Défis Techniques</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Module</th><th>Niveau</th><th>Identifiant &amp; Intitulé du Laboratoire</th><th>Objectif Algorithmique</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Module 1</strong></td><td><span class="badge">N1</span></td><td><code>vrt3-c1-e1</code> Calculateur de Ratios de Surallocation vCPU &amp; RAM</td><td>Calculer la charge et valider les seuils critiques de surallocation.</td></tr>',
    '      <tr><td><strong>Module 1</strong></td><td><span class="badge">N2</span></td><td><code>vrt3-c1-e2</code> Optimiseur de Placement NUMA &amp; Détection Cross-Socket</td><td>Détecter le fractionnement mémoire inter-nœuds NUMA.</td></tr>',
    '      <tr><td><strong>Module 1</strong></td><td><span class="badge">N3</span></td><td><code>vrt3-c1-e3</code> Comparateur de Provisioning VMDK (Thin, Zeroed, Eager)</td><td>Calculer la consommation réelle et l\'impact de mise à zéro.</td></tr>',
    '      <tr><td><strong>Module 2</strong></td><td><span class="badge">N1</span></td><td><code>vrt3-c2-e1</code> Parseur &amp; Validateur de Fichiers de Configuration VMX</td><td>Extraire vCPU, RAM, BIOS/UEFI et état Secure Boot d\'une VM.</td></tr>',
    '      <tr><td><strong>Module 2</strong></td><td><span class="badge">N2</span></td><td><code>vrt3-c2-e2</code> Calculateur d\'Espace Disque &amp; Arborescence de Snapshots</td><td>Calculer l\'espace delta cumulé et déclencher l\'alerte de consolidation.</td></tr>',
    '      <tr><td><strong>Module 2</strong></td><td><span class="badge">N3</span></td><td><code>vrt3-c2-e3</code> Ordonnanceur de Pools de Ressources CPU Clustérisés</td><td>Répartir les MHz cluster selon Shares, Réservations et Limites.</td></tr>',
    '      <tr><td><strong>Module 3</strong></td><td><span class="badge">N1</span></td><td><code>vrt3-c3-e1</code> Dimensionneur de Datastores VMFS &amp; Multipathing NMP</td><td>Calculer la capacité utilisable et le débit agrégé Round Robin.</td></tr>',
    '      <tr><td><strong>Module 3</strong></td><td><span class="badge">N2</span></td><td><code>vrt3-c3-e2</code> Calculateur de Capacité Utile vSAN &amp; Politiques SPBM</td><td>Calculer les multiplicateurs FTT RAID-1/5/6 et le slack space 20%.</td></tr>',
    '      <tr><td><strong>Module 3</strong></td><td><span class="badge">N3</span></td><td><code>vrt3-c3-e3</code> Simulateur d\'Alignement iSCSI &amp; Optimisation MTU Jumbo</td><td>Calculer le gain d\'efficacité réseau MTU 9000 vs 1500.</td></tr>',
    '      <tr><td><strong>Module 4</strong></td><td><span class="badge">N1</span></td><td><code>vrt3-c4-e1</code> Calculateur de Port Groups &amp; Modes de Tagging VLAN</td><td>Auditer les modes de tagging VST, EST et VGT sur les vSwitches.</td></tr>',
    '      <tr><td><strong>Module 4</strong></td><td><span class="badge">N2</span></td><td><code>vrt3-c4-e2</code> Audit de Sécurité &amp; Filtrage Réseau Port Group vSwitch</td><td>Calculer le score de durcissement (Promiscuous, MAC changes).</td></tr>',
    '      <tr><td><strong>Module 4</strong></td><td><span class="badge">N3</span></td><td><code>vrt3-c4-e3</code> Calculateur de Régulation de Trafic Réseau (Traffic Shaping)</td><td>Modéliser la rafale Token Bucket et calculer le débit effectif.</td></tr>',
    '      <tr><td><strong>Module 5</strong></td><td><span class="badge">N1</span></td><td><code>vrt3-c5-e1</code> Estimateur de Durée &amp; Débit de Migration vMotion</td><td>Calculer la convergence de pré-copie et la durée de migration.</td></tr>',
    '      <tr><td><strong>Module 5</strong></td><td><span class="badge">N2</span></td><td><code>vrt3-c5-e2</code> Simulateur de Contrôle d\'Admission &amp; Failover vSphere HA</td><td>Vérifier la capacité résiduelle en cas de panne de N hôtes ESXi.</td></tr>',
    '      <tr><td><strong>Module 5</strong></td><td><span class="badge">N3</span></td><td><code>vrt3-c5-e3</code> Moteur d\'Équilibrage de Cluster vSphere DRS &amp; Règles d\'Affinité</td><td>Simuler les recommandations de migrations DRS et contraintes VM.</td></tr>',
    '      <tr><td><strong>Module 6</strong></td><td><span class="badge">N1</span></td><td><code>vrt3-c6-e1</code> Estimateur de Fenêtre de Sauvegarde CBT &amp; Rétention</td><td>Calculer les deltas journaliers et le stockage dédupliqué.</td></tr>',
    '      <tr><td><strong>Module 6</strong></td><td><span class="badge">N2</span></td><td><code>vrt3-c6-e2</code> Calculateur de Dimensionnement IOPS pour Postes VDI</td><td>Estimer la charge I/O disque globale et le pic de Boot Storm.</td></tr>',
    '      <tr><td><strong>Module 6</strong></td><td><span class="badge">N3</span></td><td><code>vrt3-c6-e3</code> Évaluateur de Score de Durcissement Sécurité ESXi</td><td>Auditer SSH, Lockdown mode, TPM 2.0 et certificats TLS.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'examen-blanc.html', label: 'Examens blancs corrigés' }, { href: '../atelier.html', label: 'Ouvrir le bac à sable interactif' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des 18 Ateliers de Programmation — ' + course.brand,
      description: 'Répertoire complet des 18 ateliers Python 3 du cours Virtualisation Avancée B3 : ESXi, vSAN, vSwitch, HA, DRS, vMotion, CBT et VDI.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
