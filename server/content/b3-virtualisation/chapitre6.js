/**
 * Module 6 — Sauvegarde Avancée (CBT), Sécurité & Virtualisation du Poste de Travail (VDI)
 * Cours « Virtualisation Avancée B3 »
 */
'use strict';

module.exports = {
  n: 6,
  title: 'Sauvegarde Avancée (CBT), Sécurité & Virtualisation du Poste de Travail (VDI)',
  short: 'Sauvegarde CBT, Sécurité & VDI',
  toc: 'Sauvegarde moderne sans agent par Changed Block Tracking (CBT) et APIs VADP, quiescing VSS, durcissement de sécurité ESXi (Lockdown mode, vTPM, chiffrement VM Encryption), architectures de virtualisation de postes VDI (VMware Horizon, Citrix HDX, Instant Clones) et dimensionnement IOPS Boot Storm.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Vous devez finaliser le schéma directeur de virtualisation d\'une organisation de 1 000 collaborateurs en sécurisant les hyperviseurs et les données d\'entreprise. ' +
    'Vous concevez la stratégie de sauvegarde incrémentielle basée sur le Changed Block Tracking (CBT) pour respecter une fenêtre de sauvegarde nocturne de 4 heures, ' +
    'appliquez le durcissement de sécurité de l\'hyperviseur ESXi (Lockdown mode strict, attestation TPM 2.0 et chiffrement de machines virtuelles), ' +
    'et dimensionnez l\'infrastructure de postes virtuels VDI (VMware Horizon et Citrix Desktops) pour garantir une expérience utilisateur fluide tout en absorbant les pics d\'I/O du Boot Storm matinal.',

  objectives: [
    'Maîtriser le fonctionnement de Changed Block Tracking (CBT) et des APIs VADP pour orchestrer des sauvegardes incrémentielles sans agent à haute performance.',
    'Intégrer le quiescing applicatif via Microsoft VSS pour garantir la cohérence transactionnelle des bases de données lors des clichés de sauvegarde.',
    'Appliquer la matrice de durcissement sécuritaire des serveurs ESXi (désactivation SSH, Lockdown mode, puce TPM 2.0 et VM Encryption).',
    'Concevoir et dimensionner une infrastructure de postes virtuels VDI (pools persistants vs instant clones non-persistants, protocoles Blast/PCoIP/HDX et calcul d\'IOPS Boot Storm).'
  ],

  sections: [
    {
      title: 'Sauvegarde d\'Infrastructure Moderne : Changed Block Tracking (CBT) & APIs VADP',
      html: [
        '<p>Dans les centres de données virtualisés, l\'ancienne méthode consistant à installer un agent de sauvegarde dans chaque système d\'exploitation invité est abandonnée au profit de sauvegardes <strong>centralisées au niveau hyperviseur (Agentless)</strong> via les APIs <strong>VADP (vStorage APIs for Data Protection)</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Mécanisme du Changed Block Tracking (CBT)</h4>',
        '    <ul>',
        '      <li><strong>Suivi des blocs modifiés :</strong> Le VMkernel enregistre en continu dans un fichier bitmap compact (<code>-ctk.vmdk</code>) la liste des blocs disques qui ont subi une écriture depuis le dernier snapshot.</li>',
        '      <li><strong>Sauvegarde incrémentielle ultra-rapide :</strong> Le serveur de sauvegarde (Veeam, Commvault) interroge l\'API vSphere pour obtenir uniquement l\'index des blocs modifiés, sans jamais relire le disque complet.</li>',
        '      <li><strong>Réduction d\'E/S :</strong> Une VM de 500 Go n\'ayant modifié que 5 Go de données est sauvegardée en quelques minutes au lieu de plusieurs heures.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cohérence Applicative &amp; Quiescing VSS</h4>',
        '    <ul>',
        '      <li><strong>Crash-Consistent :</strong> Le snapshot capture le disque tel quel, équivalent à une coupure de courant. Les bases de données doivent rejouer leurs journaux au redémarrage.</li>',
        '      <li><strong>Application-Consistent (VSS) :</strong> L\'hyperviseur interagit avec le service Microsoft VSS (Volume Shadow Copy Service) via les VMware Tools pour forcer les bases de données (SQL Server, Exchange) à vider leurs caches en mémoire sur disque avant de figer le cliché.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Sécurité & Durcissement des Hyperviseurs : Lockdown Mode, TPM 2.0 & VM Encryption',
      html: [
        '<p>L\'hyperviseur est le point névralgique de l\'infrastructure : sa compromission livre l\'accès immédiat à l\'ensemble des machines virtuelles et des données hébergées. Les guides de durcissement (CIS Benchmarks, VMware Hardening Guides) imposent des contrôles stricts :</p>',
        '<table class="table">',
        '  <thead><tr><th>Mesure de Durcissement</th><th>Mécanisme Technique</th><th>Objectif de Sécurité / Conformité</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Désactivation Shell / SSH</strong></td><td>Services <code>ESXi Shell</code> et <code>SSH</code> arrêtés par défaut sur le démon hostd.</td><td>Supprimez les risques d\'attaques par force brute sur le compte root local via le réseau.</td></tr>',
        '    <tr><td><strong>Mode Lockdown (Normal)</strong></td><td>L\'hôte ESXi ne peut être administré que via vCenter Server ; la console locale DCUI reste accessible aux administrateurs autorisés.</td><td>Empêche toute modification de configuration hors du contrôle d\'audit centralisé de vCenter.</td></tr>',
        '    <tr><td><strong>Mode Lockdown (Strict)</strong></td><td>La console locale DCUI est elle-même désactivée. L\'hôte est 100% dépendant de vCenter Server.</td><td>Sécurisation maximale des serveurs situés dans des datacenters distants ou des colocalisations non surveillées.</td></tr>',
        '    <tr><td><strong>Puce TPM 2.0 &amp; Secure Boot</strong></td><td>Validation cryptographique de l\'intégrité des composants de boot du VMkernel au démarrage de l\'hôte.</td><td>Garantit qu\'aucun rootkit ou chargeur de démarrage modifié n\'a infecté le serveur (Host Attestation).</td></tr>',
        '    <tr><td><strong>Chiffrement VM (VM Encryption)</strong></td><td>Chiffrement XTS-AES-256 des fichiers VMDK et VMX opéré par le VMkernel et géré par un serveur de clés KMS.</td><td>Rend les disques virtuels illisibles s\'ils sont dérobés ou copiés hors du stockage sécurisé.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Virtualisation du Poste de Travail (VDI) : Architectures & Protocoles d\'Affichage',
      html: [
        '<p>Le <strong>VDI (Virtual Desktop Infrastructure)</strong> héberge les environnements de travail des utilisateurs (Windows 10/11 ou Linux) sous forme de machines virtuelles exécutées dans le Datacenter et accessibles à distance :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Pools de Postes Virtuels</h4>',
        '    <ul>',
        '      <li><strong>Pools Persistants (Dedicated) :</strong> Chaque utilisateur possède sa propre VM dédiée. Ses personnalisations et applications installées sont conservées d\'une session à l\'autre. Coût de stockage élevé.</li>',
        '      <li><strong>Pools Non-Persistants (Floating / Instant Clones) :</strong> Les VM sont créées instantanément à partir d\'une image maîtresse (Golden Master) par clonage mémoire direct. À la déconnexion, la VM est détruite et recréée propre. Les profils utilisateurs sont déportés (FSLogix, DEM).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Protocoles d\'Affichage Haute Performance</h4>',
        '    <ul>',
        '      <li><strong>VMware Blast Extreme :</strong> Protocole optimisé pour le Cloud utilisant les codecs vidéo H.264/H.265 avec transport adaptatif UDP/TCP (port 8443/22443).</li>',
        '      <li><strong>Teradici PCoIP :</strong> Protocole historique propriétaire basé sur UDP (port 4172), compressant l\'image par encodage sans perte de texte.</li>',
        '      <li><strong>Citrix HDX / ICA :</strong> Suite de technologies d\'accélération multimédia et de redirection de périphériques USB (port 1494/2598).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Dimensionnement du Stockage VDI & Absorption du Boot Storm',
      html: [
        '<p>Contrairement aux serveurs classiques qui ont une consommation d\'E/S prévisible, les infrastructures VDI sont soumises au phénomène critique du <strong>Boot Storm (tempête de démarrages)</strong> et du <strong>Logon Storm</strong> le matin lors de l\'arrivée massive des collaborateurs :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Profils d\'Utilisateurs &amp; Besoins en IOPS</h4>',
        '    <ul>',
        '      <li><strong>Profil Bureautique (Task Worker) :</strong> 10 à 15 IOPS par utilisateur en vitesse de croisière (navigation, messagerie, saisie).</li>',
        '      <li><strong>Profil Connaissances (Knowledge Worker) :</strong> 25 à 35 IOPS par utilisateur (tableurs lourds, ERP, visioconférence).</li>',
        '      <li><strong>Profil Développeur / Power User :</strong> 40 à 60 IOPS par utilisateur (compilations, conteneurs, IDEs multiples).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Prise en Compte du Boot Storm</h4>',
        '    <p>Lors d\'un démarrage simultané de 500 ou 1 000 postes entre 8h15 et 8h45, la demande d\'IOPS en lecture explose de <strong>50% à 100% au-dessus de la consommation nominale</strong> :</p>',
        '    <pre><code>IOPS_Pic = Somme(Utilisateurs * IOPS_Profil) * (1.0 + Marge_Boot_Storm)</code></pre>',
        '    <p>Pour absorber ce pic sans figer les sessions, l\'utilisation de <strong>stockage Full Flash NVMe</strong> et de technologies de clonage mémoire instantané (vSphere Instant Clones) est indispensable.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie d\'Ingénierie : Audit de Sauvegarde, Durcissement & Dimensionnement VDI',
  method: [
    'Activer Changed Block Tracking (CBT) sur les machines virtuelles et programmer des fenêtres de sauvegarde incrémentielle compatibles avec les débits de stockage.',
    'Intégrer le quiescing VSS pour toutes les VM hébergeant des bases de données relationnelles ou des annuaires d\'entreprise.',
    'Auditer le durcissement des hôtes ESXi : désactiver les services SSH/Shell, basculer en Lockdown Mode et activer Secure Boot avec puce TPM 2.0.',
    'Calculer la volumétrie et la puissance d\'IOPS globale d\'un parc VDI en incluant une surcapacité de 50% à 80% pour encaisser le pic matinal de Boot Storm.'
  ],

  summary: [
    'Changed Block Tracking (CBT) optimise radicalement les sauvegardes en ne lisant que les blocs disques modifiés consignés dans le fichier -ctk.vmdk.',
    'Le quiescing VSS garantit la cohérence transactionnelle des bases de données en vidant leurs tampons avant la prise du cliché de sauvegarde.',
    'Le durcissement de l\'hyperviseur ESXi repose sur le Lockdown Mode, la désactivation des accès directs SSH et l\'attestation cryptographique TPM 2.0.',
    'Les architectures VDI à Instant Clones créent des postes de travail non-persistants à la volée avec une empreinte disque et mémoire ultra-réduite.',
    'Le dimensionnement du stockage VDI impose de surdimensionner les IOPS de 50% à 80% pour absorber l\'avalanche de lectures du Boot Storm matinal.'
  ],

  checklist: [
    'Le paramètre `ctkEnabled = TRUE` est-il configuré dans le fichier .vmx de chaque VM pour activer le Changed Block Tracking ?',
    'Les sauvegardes nocturnes utilisent-elles l\'API vSphere VADP sans nécessiter d\'agents résidents dans les systèmes invités ?',
    'Le service SSH est-il arrêté sur tous les hyperviseurs ESXi de production et le mode Lockdown est-il activé ?',
    'La baie de stockage VDI est-elle dimensionnée pour supporter le pic d\'IOPS du Boot Storm calculé avec sa marge de sécurité ?',
    'Les profils utilisateurs des postes VDI non-persistants sont-ils déportés et synchronisés via des conteneurs de profil (FSLogix) ?'
  ],

  notions: [
    { term: 'Changed Block Tracking (CBT)', def: 'Fonctionnalité VMware retraçant les blocs disques modifiés pour n\'exporter que les deltas lors des sauvegardes incrémentielles.' },
    { term: 'VADP (vStorage APIs for Data Protection)', def: 'Ensemble d\'APIs permettant aux logiciels tiers d\'effectuer des sauvegardes sans agent au niveau de l\'hyperviseur.' },
    { term: 'Quiescing VSS', def: 'Synchronisation avec le service Microsoft Volume Shadow Copy pour geler temporairement les écritures applicatives et garantir la cohérence des données.' },
    { term: 'Lockdown Mode', def: 'Mode de sécurité vSphere interdisant la connexion directe aux hyperviseurs ESXi pour imposer une administration exclusive via vCenter.' },
    { term: 'TPM 2.0 & Secure Boot', def: 'Composant matériel cryptographique validant l\'intégrité des modules du VMkernel lors du démarrage de l\'hôte physique.' },
    { term: 'VDI (Virtual Desktop Infrastructure)', def: 'Architecture hébergeant des environnements de travail utilisateurs sous forme de machines virtuelles dans le Datacenter.' },
    { term: 'Instant Clone', def: 'Technologie VMware créant un poste virtuel en quelques secondes par duplication de la mémoire vive d\'une VM parent en cours d\'exécution.' },
    { term: 'Boot Storm', def: 'Phénomène de surcharge massive des entrées/sorties disque lors du démarrage simultané de centaines de postes de travail virtuels en début de journée.' }
  ],

  pitfalls: [
    {
      mistake: 'Désactiver le Changed Block Tracking (CBT) pour économiser quelques mégaoctets de disque.',
      why: 'Sans CBT, le logiciel de sauvegarde doit relire 100% des blocs du disque virtuel pour détecter les modifications, multipliant la fenêtre de sauvegarde par 20.',
      fix: 'Toujours laisser le CBT activé pour toutes les machines virtuelles de production.'
    },
    {
      mistake: 'Activer le mode Lockdown Strict sur un hôte ESXi dont vCenter Server est indisponible.',
      why: 'Le mode strict désactive également l\'interface locale DCUI : si vCenter tombe en panne, il devient impossible de gérer ou déverrouiller l\'hôte localement.',
      fix: 'Préférer le mode Lockdown Normal pour conserver un accès physique de secours à la console DCUI pour les administrateurs habilités.'
    },
    {
      mistake: 'Dimensionner le stockage d\'une infrastructure VDI uniquement sur la base des IOPS moyens de la journée.',
      why: 'Dès que les utilisateurs se connectent en même temps à 8h30, le Boot Storm sature la baie de stockage, provoquant des écrans noirs et des sessions bloquées pendant plus d\'une heure.',
      fix: 'Intégrer impérativement une surcapacité de 50% à 80% d\'IOPS pour absorber le pic de Boot Storm et privilégier le stockage Flash.'
    },
    {
      mistake: 'Déployer des pools de postes VDI non-persistants sans solution de redirection de profils utilisateurs.',
      why: 'À chaque déconnexion, la VM est détruite : les utilisateurs perdent définitivement leurs documents, favoris, réglages et personnalisations.',
      fix: 'Déployer Microsoft FSLogix Profile Containers ou VMware Dynamic Environment Manager pour détacher les données utilisateur de la VM.'
    }
  ],

  questions: [
    {
      q: 'Quel fichier stocké sur le datastore contient la carte bitmap des blocs modifiés exploitée par le Changed Block Tracking (CBT) ?',
      opts: [
        'Le fichier se terminant par -ctk.vmdk.',
        'Le fichier se terminant par -flat.vmdk.',
        'Le fichier se terminant par .nvram.',
        'Le fichier se terminant par .vswp.'
      ],
      correct: 0,
      exp: 'Lorsqu\'une VM active le CBT, le VMkernel crée un fichier compagnon `-ctk.vmdk` qui maintient la cartographie bitmap des blocs ayant fait l\'objet d\'écritures depuis le dernier point de référence.'
    },
    {
      q: 'Pourquoi une sauvegarde au niveau hyperviseur avec quiescing VSS est-elle supérieure à une simple sauvegarde crash-consistent ?',
      opts: [
        'Elle garantit que les bases de données (SQL, Exchange) ont vidé leurs caches en mémoire sur le disque avant le cliché.',
        'Elle compresse les fichiers vidéo avec le codec MP4 haute définition.',
        'Elle augmente la vitesse d\'affichage des cartes graphiques virtuelles.',
        'Elle permet de supprimer le mot de passe administrateur de la machine virtuelle.'
      ],
      correct: 0,
      exp: 'Le quiescing applicatif coordonné par Microsoft VSS force les applications et bases de données transactionnelles à finaliser leurs écritures en attente avant la prise du snapshot, garantissant une restauration sans corruption.'
    },
    {
      q: 'Que bloque le mode de sécurité vSphere Lockdown Mode en configuration "Normal" ?',
      opts: [
        'Toute connexion administrative directe à l\'hôte ESXi (web client, API), n\'autorisant la gestion que via vCenter et la console physique DCUI.',
        'Tous les accès aux disques durs de l\'hyperviseur pendant 24 heures.',
        'L\'accès à Internet pour l\'ensemble des machines virtuelles du cluster.',
        'Le démarrage des processeurs Intel si la température dépasse 30 degrés.'
      ],
      correct: 0,
      exp: 'Le mode Lockdown Normal empêche toute connexion directe par navigateur ou API à l\'adresse IP de l\'hôte ESXi pour centraliser toutes les actions dans les journaux d\'audit de vCenter, tout en conservant l\'accès d\'urgence DCUI physique.'
    },
    {
      q: 'Quel composant matériel permet de valider l\'intégrité cryptographique du chargeur et des binaires du noyau VMkernel lors du démarrage (Host Attestation) ?',
      opts: [
        'La puce de sécurité TPM 2.0 (Trusted Platform Module) associée à Secure Boot.',
        'Le contrôleur RAID matériel de la baie de disques.',
        'La carte réseau Gigabit Ethernet intégrée à la carte mère.',
        'La batterie de secours du contrôleur de cache de stockage.'
      ],
      correct: 0,
      exp: 'La puce TPM 2.0 enregistre et valide cryptographiquement les empreintes de hachage de chaque composant du chargeur de démarrage UEFI et du noyau VMkernel, attestant qu\'aucun code malveillant n\'a altéré l\'hyperviseur.'
    },
    {
      q: 'Quelle est la particularité d\'un pool de postes virtuels VDI non-persistants (Floating / Instant Clones) ?',
      opts: [
        'Les VM sont détruites à la déconnexion et recréées à l\'identique depuis une image de référence pour garantir un OS toujours propre.',
        'Chaque utilisateur a un disque dur fixe qui ne peut jamais être effacé ni mis à jour.',
        'Les postes virtuels ne peuvent fonctionner que pendant 15 minutes par jour.',
        'Le système d\'exploitation doit impérativement être installé sur une clé USB.'
      ],
      correct: 0,
      exp: 'Dans un pool non-persistant, les postes sont éphémères : chaque utilisateur reçoit une machine vierge dérivée de l\'image de référence (Golden Master). À la fermeture de session, la machine est détruite et reconstruite instantanément.'
    },
    {
      q: 'Quel protocole d\'affichage distant propriétaire VMware s\'appuie sur les codecs vidéo H.264/H.265 avec transport réseau adaptatif UDP/TCP ?',
      opts: [
        'VMware Blast Extreme.',
        'Microsoft Remote Desktop Protocol (RDP) classique.',
        'Protocole de terminal Telnet sur port 23.',
        'File Transfer Protocol (FTP) en mode passif.'
      ],
      correct: 0,
      exp: 'VMware Blast Extreme est le protocole d\'affichage moderne de VMware Horizon utilisant l\'accélération matérielle H.264/H.265 et un transport UDP/TCP adaptatif optimisé pour les réseaux WAN et Internet.'
    },
    {
      q: 'Qu\'appelle-t-on le phénomène de "Boot Storm" dans une infrastructure de postes de travail virtuels VDI ?',
      opts: [
        'L\'avalanche d\'E/S disques simultanées lors du démarrage matinal massif de centaines de postes virtuels.',
        'Un orage électrique provoquant une coupure de courant dans le centre de données.',
        'La propagation fulgurante d\'un ver informatique entre machines virtuelles.',
        'L\'inondation des ventilateurs de serveurs par de la poussière.'
      ],
      correct: 0,
      exp: 'Le Boot Storm désigne le pic massif d\'entrées/sorties de lecture disque produit lorsque des centaines d\'utilisateurs allument et initialisent leurs sessions Windows simultanément à leur arrivée au travail le matin.'
    },
    {
      q: 'Pour un parc de 200 postes VDI générant 20 IOPS moyens par utilisateur et une marge de sécurité de 50% pour absorber le Boot Storm, combien d\'IOPS globaux la baie doit-elle délivrer ?',
      opts: [
        '6 000 IOPS.',
        '4 000 IOPS.',
        '2 000 IOPS.',
        '8 000 IOPS.'
      ],
      correct: 0,
      exp: 'IOPS nominaux = 200 * 20 = 4 000 IOPS. Avec la surcapacité de 50% pour le Boot Storm : 4 000 * 1.50 = 6 000 IOPS requis au minimum en heure de pointe.'
    }
  ],

  flashcards: [
    {
      q: 'Qu\'est-ce que le Changed Block Tracking (CBT) ?',
      a: 'Mécanisme hyperviseur enregistrant les blocs disques modifiés dans un fichier -ctk.vmdk pour n\'exporter que les deltas lors des sauvegardes incrémentielles.'
    },
    {
      q: 'Quel est l\'intérêt du quiescing VSS lors d\'une sauvegarde de machine virtuelle ?',
      a: 'Forcer les applications (SQL, Exchange) à vider leurs écritures mémoire sur disque pour garantir une sauvegarde transactionnellement cohérente.'
    },
    {
      q: 'Quelle est la fonction du Lockdown Mode sous VMware vSphere ?',
      a: 'Interdire toute connexion directe non tracée à l\'hyperviseur ESXi pour centraliser l\'administration et les audits dans vCenter Server.'
    },
    {
      q: 'Comment fonctionne un pool de postes VDI Instant Clones ?',
      a: 'Les postes sont créés en quelques secondes par duplication de la mémoire vive d\'une VM maître et sont régénérés à neuf à chaque déconnexion.'
    },
    {
      q: 'Qu\'est-ce que le Boot Storm en environnement VDI ?',
      a: 'Une tempête d\'I/O disque en lecture provoquée par le démarrage simultané de centaines de machines virtuelles de postes de travail le matin.'
    },
    {
      q: 'Quel est le rôle du protocole VMware Blast Extreme ?',
      a: 'Transporter l\'affichage graphique, le son et les entrées clavier/souris des postes VDI avec compression vidéo H.264/H.265 et débit adaptatif.'
    }
  ],

  mastery: [
    'Activer et vérifier le Changed Block Tracking (CBT) pour concevoir des plans de sauvegarde incrémentielle efficaces.',
    'Orchestrer le quiescing applicatif Microsoft VSS pour garantir l\'intégrité des bases de données lors des clichés.',
    'Appliquer les règles de durcissement sécuritaire des hyperviseurs ESXi (SSH arrêté, Lockdown Mode et puce TPM 2.0).',
    'Concevoir des architectures de postes virtuels VDI persistants ou non-persistants (Instant Clones).',
    'Calculer le profil d\'IOPS global d\'un parc VDI et intégrer la surcapacité requise pour absorber le pic de Boot Storm matinal.'
  ]
};
