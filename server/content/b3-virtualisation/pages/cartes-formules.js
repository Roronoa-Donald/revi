/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Virtualisation Avancée B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Virtualisation Avancée B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux de la virtualisation avancée et des architectures de Datacenter privé : Hyperviseurs Type-1 et surallocation (VMkernel, NUMA, VMDK), Déploiement vCenter et gestion des ressources (VCSA, VMX, snapshots, Resource Pools), Stockage virtuel et vSAN (VMFS-6, ATS, SPBM, NMP), Commutation virtuelle et VDS (VLAN 802.1Q, durcissement Port Groups, Traffic Shaping), Haute disponibilité et mobilité (vSphere HA, DRS, vMotion), et Sauvegarde moderne CBT et postes VDI (VADP, Horizon, Citrix).</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Virtualisation Avancée B3 : ESXi, vCenter, VMFS, vSAN, vSwitch, VDS, HA, DRS, vMotion, CBT et VDI.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento Technique &amp; Guide Opérationnel — Virtualisation Avancée B3</h1>',
    '  <p class="lead">Synthèse condensée des formules d\'ingénierie Datacenter, ports réseaux standards VMware/Citrix, anatomie des fichiers de machines virtuelles, politiques SPBM vSAN et matrices de sécurité des commutateurs virtuels.</p>',
    '',
    '  <h2>1. Formules Mathématiques &amp; Ratios de Dimensionnement Datacenter</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Grandeur / Règle</th><th>Formule Mathématique</th><th>Définition Opérationnelle</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Ratio Surallocation vCPU:pCPU</strong></td><td><code>Ratio = Somme(vCPUs) / Total(PCPUs_physiques)</code></td><td>Consolidation CPU (Recommandé : 1:1 à 3:1 critique, 4:1 à 6:1 bureautique/général).</td></tr>',
    '      <tr><td><strong>Taux de Surallocation RAM</strong></td><td><code>Ratio_RAM = Somme(RAM_allouée_VM) / RAM_physique_hôte</code></td><td>Surallocation mémoire garantie par ballooning, compression et swap vswp.</td></tr>',
    '      <tr><td><strong>Capacité Utilisable vSAN</strong></td><td><code>Utile = (Capacité_Brute * 0.80) / Multiplicateur_SPBM</code></td><td>Capacité nette déduite du Slack Space opérationnel de 20% (rebuild interne).</td></tr>',
    '      <tr><td><strong>Volume Transféré vMotion</strong></td><td><code>V_total = RAM_Mo * (1 + Dirty_Rate / Debit_Reseau)</code></td><td>Volume total mémoire migré incluant les phases itératives de pré-copie.</td></tr>',
    '      <tr><td><strong>Durée de Migration vMotion</strong></td><td><code>Duree_s = V_total / Debit_Reseau_Mo_s</code></td><td>Temps global de migration à chaud (nécessite Dirty Rate &lt; Débit réseau).</td></tr>',
    '      <tr><td><strong>Volume Journalier Incrémental CBT</strong></td><td><code>Delta_Go = Volume_Provisionne_Go * Taux_Changement_Journalier</code></td><td>Volume sauvegardé chaque nuit grâce au Changed Block Tracking.</td></tr>',
    '      <tr><td><strong>Dimensionnement IOPS VDI</strong></td><td><code>IOPS_Total = N_utilisateurs * IOPS_Profil * (1 + Marge_Boot_Storm)</code></td><td>Pic d\'I/O disque requis pour encaisser les connexions simultanées matinales.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Protocoles &amp; Ports Standards de Virtualisation Datacenter</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Protocole / Service</th><th>Port &amp; Transport</th><th>Rôle et Composants Impliqués</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>vSphere Client / API HTTPS</strong></td><td><code>443 / TCP</code></td><td>Accès d\'administration vCenter Server et agents ESXi hostd.</td></tr>',
    '      <tr><td><strong>Administration SSH ESXi</strong></td><td><code>22 / TCP</code></td><td>Shell sécurisé ESXi (désactivé par défaut, réservé au dépannage).</td></tr>',
    '      <tr><td><strong>Migration à chaud vMotion</strong></td><td><code>8000 / TCP</code></td><td>Transfert des pages mémoires entre noyaux VMkernel hôtes.</td></tr>',
    '      <tr><td><strong>Tolérance aux Pannes (FT)</strong></td><td><code>10000 / TCP &amp; UDP</code></td><td>Synchronisation Lockstep de la machine virtuelle miroir (vSphere FT).</td></tr>',
    '      <tr><td><strong>Clustering vSAN</strong></td><td><code>12321, 2233 / UDP &amp; TCP</code></td><td>Communication nœuds vSAN et synchronisation des métadonnées d\'objets.</td></tr>',
    '      <tr><td><strong>Stockage SAN iSCSI</strong></td><td><code>3260 / TCP</code></td><td>Connexion des initiateurs logiciels VMkernel aux cibles de baies iSCSI.</td></tr>',
    '      <tr><td><strong>Stockage NAS NFS</strong></td><td><code>2049 / TCP</code></td><td>Montage des partages réseau NFS v3 et NFS v4.1 pour datastores.</td></tr>',
    '      <tr><td><strong>Postes VDI (Blast Extreme / PCoIP)</strong></td><td><code>8443, 22443, 4172 / TCP &amp; UDP</code></td><td>Transport vidéo/audio/clavier des sessions utilisateurs distants VDI.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Fichiers Constitutifs d\'une Machine Virtuelle VMware vSphere</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Extension Fichier</th><th>Désignation &amp; Format</th><th>Rôle Technique sur le Datastore</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>.vmx</code></td><td>Fichier texte de configuration</td><td>Décrit le matériel virtuel : CPU, RAM, disques, cartes réseaux, UUID.</td></tr>',
    '      <tr><td><code>.vmdk</code></td><td>Descripteur de disque virtuel</td><td>Petit fichier texte décrivant la géométrie et pointant vers le fichier de données.</td></tr>',
    '      <tr><td><code>-flat.vmdk</code></td><td>Données brutes du disque virtuel</td><td>Contient les blocs de données du disque de la machine virtuelle.</td></tr>',
    '      <tr><td><code>-delta.vmdk</code></td><td>Disque différentiel de snapshot</td><td>Contient les blocs modifiés depuis la prise d\'un cliché instantané (snapshot).</td></tr>',
    '      <tr><td><code>.nvram</code></td><td>Mémoire non volatile BIOS / UEFI</td><td>Enregistre la configuration matérielle du BIOS virtuel ou des clés Secure Boot.</td></tr>',
    '      <tr><td><code>.vswp</code></td><td>Fichier de swap mémoire VM</td><td>Créé à la mise sous tension de la VM (taille = RAM_allouée - Réservation_RAM).</td></tr>',
    '      <tr><td><code>.vmsd</code> / <code>.vmsn</code></td><td>Métadonnées et état de snapshots</td><td>Stocke l\'arborescence des clichés et l\'état de la RAM active lors du snapshot.</td></tr>',
    '      <tr><td><code>vmware.log</code></td><td>Journal des événements de la VM</td><td>Enregistre tous les événements d\'exécution, erreurs d\'E/S et migrations.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Politiques de Stockage SPBM vSAN (Storage Policy-Based Management)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Politique SPBM</th><th>Multiplicateur Brute/Utile</th><th>Hôtes ESXi Minimum</th><th>Cas d\'Usage Recommandé</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>FTT=1_RAID1 (Miroir)</code></td><td><code>2.00x</code></td><td>3 hôtes (2 data + 1 témoin)</td><td>Performances I/O optimales (bases de données SQL critiques, logs).</td></tr>',
    '      <tr><td><code>FTT=1_RAID5 (Erasure Coding 3+1)</code></td><td><code>1.33x</code></td><td>4 hôtes</td><td>Compromis résilience/espace disque pour serveurs applicatifs standards.</td></tr>',
    '      <tr><td><code>FTT=2_RAID1 (Triple Miroir)</code></td><td><code>3.00x</code></td><td>5 hôtes</td><td>Très haute résilience pour environnements à tolérance de panne maximale.</td></tr>',
    '      <tr><td><code>FTT=2_RAID6 (Erasure Coding 4+2)</code></td><td><code>1.50x</code></td><td>6 hôtes</td><td>Archivage et serveurs volumineux avec économie d\'espace disque garantie.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Règles de Sécurité des Port Groups &amp; Commutateurs Virtuels (vSwitch)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Paramètre de Sécurité</th><th>Valeur par Défaut</th><th>Valeur Durcie (Recommandée)</th><th>Risque Sécurité si Non Conforme</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Mode Promiscuous</strong></td><td>Reject</td><td><strong>Reject</strong></td><td>Une VM compromise pourrait capturer le trafic réseau des autres VM.</td></tr>',
    '      <tr><td><strong>Changements d\'adresse MAC</strong></td><td>Accept</td><td><strong>Reject</strong></td><td>Permet à un attaquant d\'usurper l\'adresse MAC matérielle du système invité.</td></tr>',
    '      <tr><td><strong>Transmissions Forgées</strong></td><td>Accept</td><td><strong>Reject</strong></td><td>Permet l\'injection de paquets avec fausse adresse source MAC (MAC Spoofing).</td></tr>',
    '      <tr><td><strong>Mode de Tagging VLAN</strong></td><td>VST (Virtual Switch Tagging)</td><td><strong>VST (par Port Group)</strong></td><td>Empêche les VM d\'accéder aux autres VLANs non attribués (isolation stricte).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'examen-blanc.html', label: 'Épreuves d\'examen blanc' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento technique &amp; Formules — ' + course.brand,
      description: 'Mémento technique du cours Virtualisation Avancée B3 : Ratios de surallocation, ports vSphere, formats VMDK/VMX, politiques SPBM vSAN et sécurité vSwitch.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
