/**
 * Contenu du cours « Windows Server B3 » (dossier `b3-windows-server/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-windows-server/.
 */
'use strict';

const chapitres = [
  ...require('./b3-windows-server/chapitres-1-3'),
  ...require('./b3-windows-server/chapitres-4-6')
];

const pages = require('./b3-windows-server/pages');

const course = {
  id: 'b3-windows-server',
  slug: 'b3-windows-server',
  brand: 'Windows Server B3',
  brandIcon: 'cpu',

  // Indigo Corporate sobre conforme WCAG AA/AAA (10.9:1 / 16.5:1 sur blanc)
  accent: '#3730a3',
  accentDeep: '#1e1b4b',
  accentSoft: '#eef2ff',
  accentBorder: '#c7d2fe',

  storeKey: 'b3winserver:progress',

  title: 'Windows Server B3 — Architecture Système, Active Directory DS, Modèle AGDLP, Stratégies GPO, Permissions NTFS/SMB, Hyper-V &amp; Clustering Haute Disponibilité',
  description:
    'Formation d’excellence en ingénierie des systèmes Windows et infrastructure de serveurs d’entreprise pour le Bachelor 3 : ' +
    'architecture interne du système d’exploitation (Kernel NT, HAL, mode utilisateur Ring 3 vs mode noyau Ring 0, Server Core vs Desktop Experience, rôles réseau DHCP avec étendues et réservations, DNS avec zones directes/inverses et enregistrements SRV, et modèle de licences par cœur physique Microsoft), ' +
    'annuaire d’entreprise Active Directory Domain Services (architecture de forêt, arbres, domaines et Unités Organisationnelles OU, réplication multi-maîtres et gestion des 5 rôles FSMO, gouvernance d’accès selon la méthodologie standard AGDLP / AGUDLP, et audit de sécurité des identités avec Event IDs 4720, 4726 et 4728), ' +
    'stratégies de groupe (GPO) et administration de parc (conteneur GPC dans AD et modèle GPT dans SYSVOL, cycle de traitement et ordre d’application strict LSDOU, arbitrage des exceptions d’héritage avec Enforced et Block Inheritance, filtrage de sécurité par ACL et requêtes dynamiques WMI WQL, et Central Store ADMX/ADML), ' +
    'sécurité des services de fichiers et stockage d’entreprise (systèmes de fichiers NTFS vs ReFS, autorisations de partage SMB vs permissions NTFS effectives selon la règle du plus restrictif, hiérarchie DACL Explicit Deny > Explicit Allow > Inherited Deny > Inherited Allow, déduplication de données, et Espaces de Stockage Storage Spaces en modes Simple, Mirror et Parity), ' +
    'virtualisation d’entreprise avec l’hyperviseur Type 1 Microsoft Hyper-V (Root Partition, Child Partitions, bus VMBus, VMs Génération 1 vs Génération 2 UEFI/Secure Boot, commutation réseau virtuelle External/Internal/Private et option allow_host, allocation de mémoire dynamique avec Memory Buffer, disques VHDX différentiels et points de contrôle de production VSS avec fusion de disques), ' +
    'et administration avancée en ligne de commande (PowerShell Remoting sécurisé sous WinRM ports 5985/5986, exécution distribuée 1:N avec Invoke-Command, architecture de sauvegarde bare-metal VSS avec Requestor/Writer/Provider et outil wbadmin, et clusters de basculement Windows Server Failover Clustering avec calcul mathématique de quorum et prévention absolue du Split-Brain).',
  lead:
    'Maîtrisez l’ingénierie des serveurs d’entreprise : noyau NT, Active Directory AD DS, modèle AGDLP, stratégies de groupe GPO, sécurité NTFS/SMB, virtualisation Hyper-V et clusters WSFC haute disponibilité. ' +
    'Six modules approfondis combinant rigueur d’architecture Microsoft, 18 ateliers de code interactifs en Python 3 et 48 QCM d’évaluation.',

  sources: 'Documentation officielle Microsoft Learn Windows Server 2022/2025, Standards RFC 2131 (DHCP), RFC 2782 (DNS SRV), Guide d’administration L3-IT (Caleb AGOUTOCO-POKO, Collège de Paris)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
