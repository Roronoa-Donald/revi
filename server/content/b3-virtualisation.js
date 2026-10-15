/**
 * Contenu du cours « Virtualisation Avancée B3 » (dossier `b3-virtualisation/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-virtualisation/.
 */
'use strict';

const chapitres = [
  ...require('./b3-virtualisation/chapitres-1-3'),
  ...require('./b3-virtualisation/chapitres-4-6')
];

const pages = require('./b3-virtualisation/pages');

const course = {
  id: 'b3-virtualisation',
  slug: 'b3-virtualisation',
  brand: 'Virtualisation Avancée B3',
  brandIcon: 'vm',

  // Palette Sky / Ocean / Navy conforme WCAG AA/AAA (5.93:1 / 9.46:1 sur fond clair)
  accent: '#0369a1',
  accentDeep: '#0c4a6e',
  accentSoft: '#f0f9ff',
  accentBorder: '#bae6fd',

  storeKey: 'b3virt:progress',

  title: 'Virtualisation Avancée B3 — Hyperviseurs Type-1, VMware vSphere 7/8, ESXi, vCenter, Stockage VMFS-6 &amp; vSAN, vSwitch, VDS, Haute Disponibilité HA, DRS, vMotion, Sauvegarde CBT &amp; VDI',
  description:
    'Formation d\'excellence en ingénierie de la virtualisation et des architectures de Datacenter privé pour le Bachelor 3 : ' +
    'architectures d\'hyperviseurs de Type-1 bare-metal (micro-noyaux VMware VMkernel, Citrix XenServer Dom0, KVM), assistance matérielle processeur et mémoire (Intel VT-x, EPT, AMD-V, RVI), calcul rigoureux des ratios de consolidation et surallocation (vCPU:pCPU ratio, RAM overcommit par ballooning et swap), optimisation topologique NUMA/vNUMA et formats de disques virtuels VMDK (Thin, Lazy, Eager Zeroed), ' +
    'déploiement et administration centralisée de VMware vCenter Server Appliance (VCSA sur Photon OS avec PostgreSQL), inventaire logique Datacenter/Cluster, anatomie exhaustive des fichiers constitutifs d\'une VM (.vmx, .vmdk, -flat.vmdk, .nvram, .vswp), mécanique des disques deltas de snapshots et alerte de consolidation d\'espace disque, ordonnancement fin par Resource Pools avec calcul des parts relatives Shares (LOW, NORMAL, HIGH), réservations et limites, ' +
    'architectures de stockage Datacenter partagé (SAN bloc Fibre Channel et iSCSI avec Jumbo Frames MTU 9000, NAS fichier NFS v3/v4.1), système de fichiers clustered VMFS-6 et primitives d\'accélération matérielle VAAI (ATS, XCOPY, UNMAP automatique), multipathing NMP avec règles Round Robin et Fixed, et stockage hyperconvergé VMware vSAN (groupes de disques, cache NVMe 100% écriture, politiques de stockage SPBM FTT-1/FTT-2 RAID-1/5/6 et réserve obligatoire de Slack Space à 20%), ' +
    'commutation réseau virtuelle : commutateurs virtuels standards (VSS) vs commutateurs distribués (vSphere Distributed Switch VDS avec séparation Control Plane / Data Plane), typologie des interfaces VMkernel (Management, vMotion, vSAN, IP Storage), isolation par VLANs 802.1Q (VST, EST, VGT Trunk 4095), durcissement de niveau 2 des Port Groups (Rejet du Promiscuous Mode, des MAC Changes et Forged Transmits) et régulation de bande passante par Traffic Shaping Token Bucket, ' +
    'haute disponibilité et mobilité d\'infrastructure : clustering vSphere HA avec agents FDM, élection maître/esclave, double surveillance par heartbeat réseau (UDP 8182) et heartbeat datastore, contrôle d\'admission de failover par pourcentage réservé, ordonnancement dynamique vSphere DRS avec calcul d\'écart-type et règles d\'affinité et d\'anti-affinité VM-VM et VM-Hôte, et mobilité à chaud vMotion (algorithme itératif de pré-copie mémoire, Dirty Rate, convergence, SDPS et bascule sub-seconde RARP), ' +
    'et enfin continuité d\'activité et postes de travail virtuels : sauvegarde sans agent par Changed Block Tracking (CBT) et APIs VADP avec quiescing applicatif VSS, durcissement sécuritaire des hyperviseurs ESXi (SSH/Shell arrêté, Mode Lockdown Normal/Strict, attestation TPM 2.0 / Secure Boot et chiffrement VM Encryption), architectures VDI (VMware Horizon, Citrix Virtual Apps and Desktops, Blast Extreme, PCoIP, Instant Clones non-persistants) et dimensionnement des IOPS de stockage avec absorption du pic matinal de Boot Storm.',
  lead:
    'Maîtrisez l\'ingénierie de la virtualisation et des infrastructures de Datacenter privé : hyperviseurs Type-1, vSphere 7/8, vCenter, VMFS-6, vSAN, VDS, clustering HA/DRS, vMotion, CBT et VDI. ' +
    'Six modules complets, 18 ateliers de programmation interactive en Python 3 et 48 QCM d\'évaluation.',

  sources: 'Supports officiels B3-ASI / L3-ASI Virtualisation (Auteur : M. Caleb AGOUTOCO-POKO, Enseignant & Spécialiste Systèmes et Réseaux), Documentation technique officielle VMware vSphere 7.0 / 8.0, Documentation Citrix Hypervisor, Guides de durcissement CIS Benchmark VMware ESXi',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
