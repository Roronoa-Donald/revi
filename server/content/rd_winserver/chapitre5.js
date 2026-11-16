/**
 * Chapitre 5 du cours « Windows Server » B2 — Stratégies de groupe (GPO),
 * Réplication Active Directory multi-sites, Rôles FSMO, Hyper-V et Virtualisation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'GPO avancées, Réplication AD, Rôles FSMO &amp; Virtualisation Hyper-V / VMware',
  short: 'GPO, FSMO &amp; Hyper-V',
  toc: 'Stratégies de groupe avancées (GPO, héritage, application forcée, filtrage de sécurité et filtres WMI), réplication Active Directory multi-sites (KCC, sites, liens), 5 rôles FSMO, gestion Hyper-V sous Windows Server et virtualisation VMware.',
  time: '≈ 2 h 45 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Dans une infrastructure Windows Server B2 multi-sites, l’administrateur système orchestre à la fois ' +
    'la gouvernance Active Directory (stratégies de groupe GPO, réplication inter-sites et rôles maîtres FSMO) ' +
    'et la couche de virtualisation serveur (Hyper-V sous Windows Server et clusters VMware vSphere). ' +
    'Maîtriser l’ordre d’application des GPO, les cinq maîtres d’opérations FSMO et l’allocation des ressources ' +
    'virtuelles évite les dérives de configuration comme les goulets d’étranglement.',

  objectives: [
    'maîtriser les stratégies de groupe avancées (GPO, héritage LSDOU, application forcée Enforced, filtrage de sécurité et filtres WMI) ;',
    'configurer et diagnostiquer la réplication Active Directory multi-sites (KCC, sites, sous-réseaux, liens de sites IP/SMTP) ;',
    'identifier, localiser et transférer les 5 rôles FSMO (Schema Master, Domain Naming Master, RID Master, PDC Emulator, Infrastructure Master) ;',
    'administrer le rôle Hyper-V sous Windows Server (commutateurs virtuels, disques VHDX, PowerShell) et distinguer hyperviseurs de type 1 et 2 ;',
    'interpréter les modes réseau virtuels (NAT, Bridge, Host-Only), les formats d’images disque, vCPU, CPU Ready Time et thin provisioning.'
  ],

  sections: [
    {
      title: 'Stratégies de groupe avancées (GPO : héritage, application forcée, filtrage de sécurité et filtres WMI)',
      html: [
        '<p>Les <strong>stratégies de groupe (GPO — Group Policy Objects)</strong> centralisent la configuration des postes et des serveurs joints au domaine Active Directory. L’évaluation des GPO suit strictement l’ordre hiérarchique <strong>LSDOU</strong> : <em>Local</em> → <em>Site</em> → <em>Domaine</em> → <em>Unité d’Organisation (OU)</em> parente puis enfant (la dernière GPO appliquée l’emporte par défaut).</p>',
        '<table><thead><tr><th>Mécanisme GPO</th><th>Fonctionnement technique</th><th>Cas d’usage B2</th></tr></thead><tbody>',
        '<tr><td><strong>Héritage et Blocage d’héritage</strong> (<em>Block Inheritance</em>)</td><td>Posé sur une OU, le blocage empêche les GPO liées plus haut (Site, Domaine, OU parente) de descendre sur cette OU.</td><td>Isoler une OU <code>Serveurs-Lab</code> des restrictions bureautiques générales.</td></tr>',
        '<tr><td><strong>Application forcée</strong> (<em>Enforced</em> / ex-<em>No Override</em>)</td><td>Posée sur le <em>lien</em> GPO, l’application forcée prime sur tout : elle traverse le blocage d’héritage et ne peut pas être écrasée par une OU enfant.</td><td>Imposer la politique de sécurité SOC (pare-feu, audit, mot de passe, LAPS) sur 100 % du domaine.</td></tr>',
        '<tr><td><strong>Filtrage de sécurité</strong> (<em>Security Filtering</em>)</td><td>Restreint l’application d’une GPO aux seuls groupes ou ordinateurs disposant des permissions NTFS <code>Read</code> et <code>Apply Group Policy</code> (par défaut <code>Authenticated Users</code>).</td><td>Cibler uniquement le groupe <code>GRP-Serveurs-SQL</code> au sein d’une OU mixte.</td></tr>',
        '<tr><td><strong>Filtres WMI</strong> (requêtes <em>WQL</em>)</td><td>Évalue dynamiquement une requête WMI sur la machine cible avant d’appliquer la GPO (système d’exploitation, RAM libre, espace disque).</td><td>Exemple : <code>SELECT * FROM Win32_OperatingSystem WHERE Version LIKE "10.0.2%" AND ProductType="3"</code> (cibler uniquement les serveurs Windows Server 2022/2025).</td></tr>',
        '</tbody></table>',
        box('tech', 'Diagnostic GPO et Loopback Processing en PowerShell', 'terminal',
          '    <p>Sur les serveurs RDS / Citrix ou les salles blanches, le <strong>traitement en boucle (Loopback Processing)</strong> applique à la session utilisateur les paramètres de l’OU de l’<em>ordinateur</em> (en mode <strong>Replace</strong> ou <strong>Merge</strong>). Pour auditer le jeu de stratégies résultant (RSoP), utilisez <code>gpresult /r</code>, <code>gpresult /h rapport-gpo.html</code>, ou les cmdlets <code>Get-GPO -All</code>, <code>New-GPLink -Name "GPO-Durcissement" -Target "OU=Serveurs,DC=corp,DC=lan" -Enforced Yes</code> et <code>Invoke-GPUpdate</code>.</p>')
      ].join('\n')
    },
    {
      title: 'Réplication Active Directory multi-sites et les 5 rôles FSMO',
      html: [
        '<p>Dans un domaine Active Directory comportant plusieurs contrôleurs de domaine (DC) répartis entre un siège et des agences distantes, la <strong>réplication Active Directory multi-sites</strong> distingue deux régimes pilotés par le composant interne <strong>KCC (Knowledge Consistency Checker)</strong> :</p>',
        '<ul>',
        '  <li><strong>Réplication intra-site (LAN haut débit) :</strong> le KCC construit automatiquement une topologie en anneau bidirectionnel avec un maximum de 3 sauts. Les modifications sont notifiées rapidement (15 secondes après changement, 3 secondes entre partenaires) et transmises <strong>sans compression</strong> pour économiser le CPU.</li>',
        '  <li><strong>Réplication inter-sites (liaisons WAN / VPN) :</strong> l’administrateur déclare les <strong>Sites Active Directory</strong>, associe chaque plage IP CIDR à un objet <strong>Subnet (Sous-réseau)</strong> et relie les sites par des <strong>Site Links (Liens de sites)</strong> en protocole <code>IP</code> (RPC sur TCP) ou <code>SMTP</code>. Le trafic inter-sites est <strong>fortement compressé</strong> (au-delà de 32 Ko) et cadencé selon un <em>coût</em>, une <em>fréquence</em> (ex. toutes les 180 minutes, abaissable à 15 min) et une fenêtre horaire via un serveur tête de pont (<strong>Bridgehead Server</strong>).</li>',
        '</ul>',
        '<p>Bien qu’Active Directory fonctionne en réplication multi-maîtres, certaines opérations critiques exigent un garant unique pour éviter tout conflit : ce sont les <strong>5 rôles FSMO (Flexible Single Master Operations)</strong> :</p>',
        '<table><thead><tr><th>Rôle FSMO</th><th>Périmètre</th><th>Responsabilité critique dans Active Directory</th></tr></thead><tbody>',
        '<tr><td><strong>1. Schema Master</strong></td><td>Forêt (unique)</td><td>Détient l’exclusivité des mises à jour du schéma Active Directory (classes et attributs d’objets, ex. préparation <code>adprep /forestprep</code> ou Exchange).</td></tr>',
        '<tr><td><strong>2. Domain Naming Master</strong></td><td>Forêt (unique)</td><td>Contrôle l’ajout ou la suppression de domaines et de partitions d’application au sein de la forêt pour garantir l’unicité des noms.</td></tr>',
        '<tr><td><strong>3. RID Master</strong></td><td>Domaine (1 par domaine)</td><td>Distribue des blocs d’identifiants relatifs (<strong>RID Pools</strong> de 500 RID) à chaque contrôleur de domaine afin qu’aucun SID d’objet créé ne soit dupliqué.</td></tr>',
        '<tr><td><strong>4. PDC Emulator</strong></td><td>Domaine (1 par domaine)</td><td>Source de temps <strong>NTP</strong> faisant autorité dans le domaine, réplication immédiate des changements de mots de passe, gestion centrale du verrouillage des comptes et cible par défaut de l’édition des GPO.</td></tr>',
        '<tr><td><strong>5. Infrastructure Master</strong></td><td>Domaine (1 par domaine)</td><td>Met à jour les références croisées d’objets (DN/SID) entre domaines distincts d’une forêt multi-domaines (à placer hors Catalogue Global sauf si tous les DC sont GC).</td></tr>',
        '</tbody></table>',
        box('tech', 'Audit de réplication et gestion PowerShell des rôles FSMO', 'server',
          '    <p>On vérifie l’état de la réplication avec <code>repadmin /replsummary</code>, <code>repadmin /showrepl *</code> et <code>Get-ADReplicationPartnerMetadata -Target *</code>. Pour localiser les 5 rôles FSMO : <code>netdom query fsmo</code> ou <code>Get-ADForest | Select-Object SchemaMaster, DomainNamingMaster</code> et <code>Get-ADDomain | Select-Object RIDMaster, PDCEmulator, InfrastructureMaster</code>. Un transfert planifié s’effectue avec <code>Move-ADDirectoryServerOperationMasterRole -Identity "DC02" -OperationMasterRole SchemaMaster,DomainNamingMaster,PDCEmulator,RIDMaster,InfrastructureMaster</code> ; la saisie forcée (<code>-Force</code>) est réservée à la perte définitive du DC titulaire.</p>')
      ].join('\n')
    },
    {
      title: 'Gestion Hyper-V sous Windows Server, Hyperviseur de type 1 et de type 2',
      html: [
        '<p>Un <strong>hyperviseur</strong> est un logiciel qui crée et gère des <strong>machines ' +
        'virtuelles</strong> (VM). On en distingue deux familles :</p>',
        '<table><thead><tr><th>Type</th><th>Description</th><th>Exemples</th></tr></thead><tbody>',
        '<tr><td>Type 1 (bare-metal)</td><td>Virtualise directement sur le matériel, sans OS intermédiaire</td><td>Microsoft Hyper-V, VMware ESXi</td></tr>',
        '<tr><td>Type 2 (hébergé)</td><td>S’installe sur un OS existant (Windows, Linux, macOS)</td><td>VMware Workstation, VirtualBox</td></tr>',
        '</tbody></table>',
        '<p>Sous Windows Server, l’activation du rôle <strong>Hyper-V</strong> (<code>Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -Restart</code>) transforme le serveur en hyperviseur de <strong>type 1</strong> : le micro-noyau hyperviseur prend directement le contrôle du matériel et la partition parente Windows Server s’exécute au-dessus. On y administre des machines virtuelles de <strong>Génération 1</strong> (BIOS historique, IDE) ou de <strong>Génération 2</strong> (UEFI, <em>Secure Boot</em>, contrôleur SCSI rapide et démarrage PXE IPv4/IPv6), reliées à trois types de commutateurs virtuels (<strong>vSwitch External</strong> relié à une carte physique, <strong>Internal</strong> entre l’hôte et les VM, <strong>Private</strong> isolé entre VM uniquement) via Hyper-V Manager, Windows Admin Center ou PowerShell (<code>New-VM</code>, <code>New-VHD</code>, <code>New-VMSwitch</code>).</p>',
        '<p>Dans un environnement VMware professionnel : <strong>ESXi</strong> est l’hyperviseur qui ' +
        'héberge les VM, <strong>vCenter</strong> gère centralement plusieurs hôtes et les clusters, ' +
        '<strong>vSphere Client</strong> est l’interface web d’administration.</p>',
        box('tech', 'Un exemple concret', 'server',
          '    <p>Max ouvre vSphere Client, choisit un hôte ESXi, alloue 2 vCPU, 8 Go de RAM et 100 Go ' +
          'de stockage, puis crée une VM Ubuntu Server. Tout le provisionnement passe par l’interface ' +
          'web ; ESXi exécute, vCenter orchestre.</p>')
      ].join('\n')
    },
    {
      title: 'Les réseaux virtuels',
      html: [
        '<p>Une VM se connecte au réseau selon trois modes principaux :</p>',
        '<ul>',
        '  <li><strong>NAT</strong> : la VM sort via l’adresse de l’hôte, qui sert de passerelle. Accès ' +
        'Internet sécurisé, mais la VM n’est pas joignable depuis le réseau local.</li>',
        '  <li><strong>Bridge (pont)</strong> : la VM se comporte comme une machine physique du réseau, ' +
        'avec sa propre adresse obtenue par DHCP. Elle est accessible partout.</li>',
        '  <li><strong>Host-Only</strong> : réseau privé entre l’hôte et les VM, sans Internet par ' +
        'défaut. Idéal pour des environnements de test isolés.</li>',
        '</ul>',
        '<table><thead><tr><th>Mode</th><th>Internet</th><th>Accès depuis le LAN</th></tr></thead><tbody>',
        '<tr><td>NAT</td><td>Oui</td><td>Non</td></tr>',
        '<tr><td>Bridge</td><td>Oui</td><td>Oui</td></tr>',
        '<tr><td>Host-Only</td><td>Non</td><td>Non</td></tr>',
        '</tbody></table>'
      ].join('\n')
    },
    {
      title: 'Images disque',
      html: [
        '<p>Une <strong>image disque</strong> est un fichier qui représente tout le contenu d’un disque ' +
        'dur ou d’un support optique.</p>',
        '<ul>',
        '  <li><strong>ISO</strong> : image d’un disque optique (CD/DVD), copie secteur par secteur. ' +
        'Sert à installer un système dans une VM.</li>',
        '  <li><strong>VMDK</strong> : format principalement utilisé par <strong>VMware</strong> ; peut ' +
        'être <em>thick</em> (espace réservé d’avance) ou <em>thin</em> (alloué dynamiquement).</li>',
        '  <li><strong>VHD / VHDX</strong> : format <strong>Microsoft</strong>, utilisé surtout avec ' +
        'Hyper-V. VHDX est la version améliorée, plus tolérante aux erreurs.</li>',
        '</ul>',
        box('tech', 'Thin provisioning', 'layers',
          '    <p>En <em>thin provisioning</em>, les blocs sont généralement alloués à la demande. ' +
          'La suppression d’un fichier dans la VM ne provoque pas nécessairement la récupération ' +
          'immédiate des blocs sur le stockage. Le <em>thick</em> réserve l’espace du disque virtuel ' +
          'sur la couche concernée, sans garantir la capacité de chaque couche sous-jacente ni les performances. ' +
          'Surveillez l’allocation et la capacité disponible. Source : <a href="https://knowledge.broadcom.com/external/article/450717/deleting-data-from-a-thin-provisioned-di.html">récupération d’espace thin VMware</a>, consultée le 30 octobre 2026.</p>')
      ].join('\n')
    },
    {
      title: 'vCPU, CPU Ready Time et surallocation',
      html: [
        '<p>Un <strong>vCPU</strong> est un processeur virtuel alloué à une VM ; il correspond à un ' +
        'cœur (ou un thread) du processeur de l’hôte. Une VM peut en recevoir plusieurs.</p>',
        '<p>Le <strong>CPU Ready Time</strong> mesure le temps qu’une VM attend pour obtenir du temps ' +
        'processeur : c’est l’indicateur clé de contention CPU dans VMware.</p>',
        '<p>La <strong>surallocation</strong> (overcommit) survient quand le total de vCPU alloués ' +
        'dépasse le nombre de cœurs physiques. Conséquence principale : le CPU Ready Time s’allonge et ' +
        'les performances se dégradent.</p>',
        box('intuition', 'Allouer plus n’est pas mieux', 'lightbulb',
          '    <p>Donner 8 vCPU à une VM qui n’en utilise que 2 ne la rend pas plus rapide : cela crée ' +
          'de l’attente pour tout le monde. On dimensionne les ressources, on ne les empile pas.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Qu’est-ce qu’un hyperviseur ?', opts: ['Un switch réseau', 'Un antivirus', 'Un logiciel qui gère des VM'], correct: 2, exp: 'Il crée et exécute des machines virtuelles.' },
    { stem: 'L’hyperviseur de type 1 s’installe…', opts: ['Dans une VM', 'Sur un OS hôte', 'Directement sur le matériel'], correct: 2, exp: "L’hyperviseur de type 1 s’installe directement sur le matériel, sans OS hôte : c’est le bare-metal. Sur un OS hôte, ce serait un type 2 ; dans une VM, rien du tout." },
    { stem: 'Exemple d’hyperviseur de type 1 ?', opts: ['ESXi', 'VirtualBox', 'Workstation'], correct: 0, exp: 'ESXi s’exécute directement sur le serveur.' },
    { stem: 'Rôle de vCenter ?', opts: ['Créer des images ISO', 'Gestion centralisée des hôtes', 'Sauvegarder les VM'], correct: 1, exp: 'Il administre plusieurs hôtes et les clusters.' },
    { stem: 'En NAT, la VM est-elle accessible depuis le LAN ?', opts: ['Parfois', 'Oui', 'Non'], correct: 2, exp: 'Elle sort via l’hôte mais n’est pas joignable de l’extérieur.' },
    { stem: 'Quel mode met la VM sur le même réseau que l’hôte ?', opts: ['NAT', 'Bridge', 'Host-Only'], correct: 1, exp: 'Le pont intègre la VM au réseau physique.' },
    { stem: 'Quel format pour VMware ?', opts: ['VMDK', 'VHDX', 'ISO'], correct: 0, exp: "VMDK est le format de disque virtuel de VMware ; VHDX appartient à Hyper-V. Quant à ISO, c’est une image optique, pas un disque de VM." },
    { stem: 'Que mesure le CPU Ready Time ?', opts: ['La RAM libre', 'Le temps d’attente CPU d’une VM', 'Le débit réseau'], correct: 1, exp: "Le CPU Ready Time mesure le temps d’attente d’une VM pour obtenir du processeur : il révèle la contention CPU. Ce n’est ni la RAM libre ni le débit réseau." },
    { stem: 'Dans quel ordre hiérarchique les GPO Active Directory sont-elles évaluées ?', opts: ['Local → Site → Domaine → OU (LSDOU)', 'OU → Domaine → Site → Local', 'Domaine → Local → OU → Site'], correct: 0, exp: 'L’évaluation suit toujours l’ordre LSDOU (Local, Site, Domaine, puis Unité d’Organisation de la racine vers la feuille), la dernière GPO appliquée l’emportant sauf en cas d’application forcée (Enforced).' },
    { stem: 'Quel rôle FSMO est responsable de la synchronisation horaire NTP et des verrouillages de comptes dans le domaine ?', opts: ['Schema Master', 'PDC Emulator', 'Infrastructure Master'], correct: 1, exp: 'Le PDC Emulator gère la synchronisation horaire NTP de référence du domaine, le traitement prioritaire des mots de passe, le verrouillage des comptes et l’édition des GPO.' }
  ],

  pitfalls: [
    'Abuser de l’application forcée (Enforced) ou du blocage d’héritage GPO au lieu de structurer proprement les OU et le filtrage de sécurité.',
    'Saisir de force (Seize) le rôle RID Master ou Schema Master puis rallumer l’ancien contrôleur de domaine sur le réseau.',
    'Confondre hyperviseur de type 1 (bare-metal : Hyper-V, ESXi) et de type 2 (hébergé : Workstation, VirtualBox).',
    'Confondre VMDK (VMware) et VHDX (Microsoft Hyper-V).',
    'Surallouer les vCPU et dégrader le CPU Ready Time de tous.'
  ],

  methodTitle: 'Gouverner Active Directory (GPO / FSMO) et provisionner une VM',
  method: [
    '<strong>Structurer</strong> les stratégies de groupe GPO selon l’ordre LSDOU en combinant filtrage de sécurité et filtres WMI ciblés.',
    '<strong>Superviser</strong> la réplication Active Directory multi-sites (KCC, sites, liens IP) avec <code>repadmin /replsummary</code> et vérifier la santé des 5 rôles FSMO.',
    '<strong>Choisir</strong> l’hyperviseur de type 1 en production (Hyper-V sous Windows Server ou VMware ESXi géré par vCenter).',
    '<strong>Connecter</strong> la VM selon le besoin (NAT, Bridge/External ou Host-Only/Private) et sélectionner le format disque (VHDX ou VMDK).',
    '<strong>Dimensionner</strong> les vCPU au juste besoin sans surallocation excessive.'
  ],

  summary: [
    'GPO : ordre d’application LSDOU, blocage d’héritage, application forcée (Enforced), filtrage de sécurité et filtres WMI (WQL).',
    'Réplication AD multi-sites : topologie KCC intra-site non compressée vs réplication inter-sites compressée et planifiée via liens de sites.',
    'Les 5 rôles FSMO : Schema Master et Domain Naming Master (forêt) ; RID Master, PDC Emulator et Infrastructure Master (domaine).',
    'Hyper-V (VHD/VHDX, Gen 1/2, vSwitch) et VMware (ESXi, vCenter, vSphere Client, VMDK) sont des hyperviseurs de type 1.',
    'vCPU, CPU Ready Time et thin provisioning mesurent et maîtrisent la contention des ressources.'
  ],

  checklist: [
    'Je maîtrise l’ordre LSDOU, l’application forcée, le filtrage de sécurité et les filtres WMI des GPO.',
    'Je sais diagnostiquer la réplication AD multi-sites et nommer les 5 rôles FSMO et leur périmètre.',
    'Je distingue les deux types d’hyperviseur et j’administre Hyper-V comme l’écosystème VMware.',
    'Je compare NAT, Bridge et Host-Only et j’explique vCPU, CPU Ready Time et thin provisioning.'
  ],

  notions: ['GPO', 'LSDOU', 'héritage', 'application forcée', 'Enforced', 'filtrage de sécurité', 'filtre WMI', 'réplication Active Directory multi-sites', 'KCC', 'FSMO', 'Schema Master', 'Domain Naming Master', 'RID Master', 'PDC Emulator', 'Infrastructure Master', 'Hyper-V', 'hyperviseur', 'type 1', 'bare-metal', 'type 2', 'VMware ESXi', 'vCenter', 'vSphere Client', 'NAT', 'bridge', 'host-only', 'ISO', 'VMDK', 'VHDX', 'vCPU', 'CPU Ready Time', 'surallocation', 'thin provisioning'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez l’ordre LSDOU des GPO, les 5 rôles FSMO et les deux types d’hyperviseur.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le filtrage GPO, la réplication AD multi-sites et les modes réseau.' },
    { cls: 'good', text: '70–94 % — Solide : vous gouvernez AD DS et dimensionnez des VM Hyper-V/VMware.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : enchaînez sur Windows Server Backup, FSRM, WSUS et snapshots au chapitre 6.' }
  ],

  flashcards: [
    { q: 'Ordre d’évaluation des GPO et effet de Enforced ?', a: 'Ordre LSDOU (Local, Site, Domaine, OU). Enforced (application forcée) prime sur le blocage d’héritage et les OU enfants.' },
    { q: 'Quels sont les 5 rôles FSMO et leur périmètre ?', a: 'Forêt : Schema Master, Domain Naming Master. Domaine : RID Master, PDC Emulator, Infrastructure Master.' },
    { q: 'Type 1 vs type 2 ?', a: 'Type 1 sur le matériel (ESXi, Hyper-V) ; type 2 sur un OS (Workstation, VirtualBox).' },
    { q: 'Rôles ESXi / vCenter / vSphere Client ?', a: 'ESXi héberge, vCenter gère, vSphere Client administre.' },
    { q: 'Trois modes réseau d’une VM ?', a: 'NAT, Bridge, Host-Only.' },
    { q: 'Format de disque VMware ? Microsoft ?', a: 'VMDK pour VMware ; VHD/VHDX pour Microsoft Hyper-V.' },
    { q: 'Que mesure le CPU Ready Time ?', a: 'Le temps d’attente d’une VM pour obtenir du CPU.' },
    { q: 'Qu’est-ce que le thin provisioning ?', a: 'Allouer l’espace disque dynamiquement, selon l’usage réel.' }
  ]
};
