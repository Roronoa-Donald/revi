/**
 * Chapitre 6 du cours « Windows Server B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Administration Avancée PowerShell, Sauvegardes VSS &amp; Tolérance aux Pannes',
  short: 'PowerShell, Sauvegardes &amp; Clustering',
  toc: 'Automatisation d’administration système avec PowerShell 5.1/7 et cmdlets d’infrastructure, administration à distance sécurisée PowerShell Remoting (WinRM, sessions interactives et Invoke-Command distribué), stratégie de sauvegardes bare-metal d’entreprise avec Windows Server Backup (wbadmin) et architecture VSS (Requestor, Writer, Provider), clusters de basculement Windows Server Failover Clustering (WSFC), modèle mathématique de calcul du quorum (majorité absolue, témoins Disk, File Share et Cloud Witness) et prévention absolue du Split-Brain.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans une infrastructure d’entreprise mature, l’administration manuelle via des interfaces graphiques est proscrite au profit de l’automatisation par scripts et de la haute disponibilité. Un administrateur système en Bachelor 3 doit être capable de piloter des centaines de serveurs à distance via PowerShell Remoting sans jamais ouvrir de session RDP interactive, de garantir la continuité d’activité grâce à des politiques de sauvegarde bare-metal imperméables aux ransomwares via les clichés instantanés VSS, et d’orchestrer des clusters de basculement (Failover Clustering) garantissant un taux de disponibilité supérieur à 99,99 %. Si la formule de quorum n’est pas maîtrisée, une panne de réseau local peut scinder le cluster et provoquer le phénomène catastrophique de Split-Brain (corruption irrémédiable des données par écritures concurrentes). Ce module final scelle l’expertise opérationnelle de l’ingénieur système sous Windows Server.',
  objectives: [
    'maîtriser le pipeline et les cmdlets avancées des modules ActiveDirectory, Hyper-V et NetTCPIP sous PowerShell 5.1/7 ;',
    'configurer et auditer l’administration à distance via PowerShell Remoting (protocole WS-Management, ports WinRM 5985/5986, Invoke-Command) ;',
    'concevoir une politique de sauvegarde bare-metal d’entreprise avec Windows Server Backup (wbadmin) et dimensionner le stockage de rétention ;',
    'disséquer le fonctionnement tripartite de l’architecture VSS (Volume Shadow Copy Service : Requestor, Writer et Provider) ;',
    'calculer mathématiquement le quorum d’un cluster de basculement (WSFC) et arbitrer le choix du témoin (Disk, File Share, Cloud Witness) ;',
    'implémenter en Python 3 des parseurs de syntaxe PowerShell, des calculateurs de quorum de cluster et des planificateurs de volumétrie de sauvegarde.'
  ],
  sections: [
    {
      title: 'Automatisation Système et Administration à Distance (WinRM)',
      html: [
        '<p>PowerShell est l’outil régalien de l’ingénieur système pour automatiser le cycle de vie de l’infrastructure et administrer le parc à grande échelle :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Architecture de PowerShell Remoting (WinRM)</h4>',
        '    <p>Basé sur le protocole standardisé <strong>WS-Management (WS-Man)</strong> et le service Windows Remote Management (WinRM) :</p>',
        '    <ul>',
        '      <li><strong>Ports d’écoute :</strong> port TCP <code>5985</code> en HTTP chiffré par Kerberos en environnement de domaine, et port TCP <code>5986</code> en HTTPS avec certificat SSL/TLS.</li>',
        '      <li><strong>Session interactive 1:1 :</strong> <code>Enter-PSSession -ComputerName srv01</code> ouvre un shell distant équivalent à SSH.</li>',
        '      <li><strong>Exécution distribuée 1:N :</strong> <code>Invoke-Command -ComputerName (Get-ADComputer -Filter *).Name -ScriptBlock { Get-Service wuauserv }</code> exécute une commande en parallèle sur des centaines de serveurs.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Modules Fondamentaux d’Infrastructure</h4>',
        '    <table class="table">',
        '      <thead><tr><th>Module</th><th>Rôle</th><th>Cmdlets Clés</th></tr></thead>',
        '      <tbody>',
        '        <tr><td><strong>ActiveDirectory</strong></td><td>Objets d’annuaire</td><td><code>New-ADUser</code>, <code>Set-ADUser</code>, <code>Get-ADGroup</code>, <code>Search-ADAccount</code></td></tr>',
        '        <tr><td><strong>Hyper-V</strong></td><td>Machines virtuelles</td><td><code>Get-VM</code>, <code>Set-VMMemory</code>, <code>Checkpoint-VM</code>, <code>Export-VM</code></td></tr>',
        '        <tr><td><strong>NetTCPIP</strong></td><td>Réseau &amp; routage</td><td><code>Get-NetIPAddress</code>, <code>New-NetRoute</code>, <code>Test-NetConnection</code></td></tr>',
        '        <tr><td><strong>ServerManager</strong></td><td>Rôles &amp; fonctionnalités</td><td><code>Install-WindowsFeature</code>, <code>Get-WindowsFeature</code></td></tr>',
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Sauvegardes d’Entreprise et Architecture VSS (Volume Shadow Copy)',
      html: [
        '<p>La protection contre les ransomwares et les pannes matérielles repose sur la coordination du service <strong>Volume Shadow Copy (VSS)</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Modèle Tripartite de VSS</h4>',
        '    <ol>',
        '      <li><strong>VSS Requestor (Le Demandeur) :</strong> logiciel de sauvegarde (ex. <code>wbadmin.exe</code>, Veeam Backup) qui initie la requête de cliché instantané.</li>',
        '      <li><strong>VSS Writer (Le Rédacteur) :</strong> composant intégré à chaque application (Active Directory NTDS Writer, Microsoft Exchange Writer, SQL Server Writer). Il vide les caches mémoire sur disque et gèle temporairement les transactions pendant quelques millisecondes.</li>',
        '      <li><strong>VSS Provider (Le Fournisseur) :</strong> composant de stockage (logiciel dans NTFS ou matériel dans une baie SAN) qui capture le cliché différentiel instantané (Copy-on-Write) sur le volume.</li>',
        '    </ol>',
        '    <p>Ce mécanisme permet de sauvegarder des bases de données en production sans jamais interrompre le travail des utilisateurs ni subir d’incohérence.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Types de Sauvegardes & Stratégie Bare-Metal</h4>',
        '    <ul>',
        '      <li><strong>Sauvegarde de l’état du système (System State) :</strong> sauvegarde la base Active Directory (ntds.dit), le registre, SYSVOL et la base de données COM+.</li>',
        '      <li><strong>Sauvegarde Bare-Metal (BMR) :</strong> inclut l’ensemble des volumes requis pour reconstruire le serveur à partir de zéro sur une machine physique neuve.</li>',
        '      <li><strong>Dimensionnement de rétention :</strong> une politique combinant une sauvegarde complète (Full) hebdomadaire et des sauvegardes incrémentales (Incremental) quotidiennes avec une réserve d’overhead VSS de 15 % garantit un RPO et RTO conformes aux SLAs d’entreprise.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Clustering de Basculement (WSFC) & Formules de Quorum',
      html: [
        '<p>Pour garantir la haute disponibilité sans point unique de défaillance (SPOF), le rôle <strong>Failover Clustering</strong> regroupe plusieurs serveurs physiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Modèle Mathématique du Quorum</h4>',
        '    <p>Le quorum détermine si le cluster détient la légitimité pour rester en ligne en cas de défaillance :</p>',
        '    <ul>',
        '      <li>Chaque nœud actif dispose de <strong>1 voix</strong> ($V_{\\text{node}} = 1$).</li>',
        '      <li>Un témoin de quorum (Witness) apporte <strong>1 voix</strong> de départage ($V_{\\text{witness}} = 1$).</li>',
        '      <li><strong>Nombre total de voix :</strong> $N_{\\text{total}} = \\sum V_{\\text{nodes}} + V_{\\text{witness}}$.</li>',
        '      <li><strong>Majorité absolue requise :</strong> $\\text{Quorum} = \\lfloor N_{\\text{total}} / 2 \\rfloor + 1$.</li>',
        '      <li>Si les voix actives sont $\\ge \\text{Quorum}$, le cluster reste en ligne (<code>QUORUM_OK</code>). Sinon, il s’arrête immédiatement pour protéger les données.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Prévention du Split-Brain & Choix du Témoin</h4>',
        '    <ul>',
        '      <li><strong>Phénomène de Split-Brain :</strong> si le réseau de communication inter-nœuds (Heartbeat) se rompt sans quorum, deux sous-groupes de serveurs croiraient l’autre mort et tenteraient d’écrire simultanément sur le stockage partagé, corrompant irrémédiablement les données.</li>',
        '      <li><strong>Témoin de disque (Disk Witness) :</strong> LUN partagée sur baie SAN/iSCSI réservée au cluster.</li>',
        '      <li><strong>Témoin de partage de fichiers (File Share Witness) :</strong> partage SMB distant sur un serveur tiers.</li>',
        '      <li><strong>Témoin Cloud (Cloud Witness) :</strong> stockage Blob Azure, éliminant tout besoin de troisième site physique.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Activer WinRM sur tous les serveurs et vérifier la connectivité via Test-WSMan avant tout déploiement de scripts distribués.',
    'Utiliser Invoke-Command avec des blocs de scripts (ScriptBlock) pour paralléliser les audits sans saturer les files d’attente séquentielles.',
    'Vérifier l’état de santé des VSS Writers à l’aide de la commande vssadmin list writers avant d’exécuter une tâche de sauvegarde critique.',
    'Configurer un plan de sauvegarde hybride (Full hebdomadaire + Incremental quotidien) et tester périodiquement la procédure de restauration Bare Metal.',
    'Déterminer le nombre total de voix de cluster et choisir le témoin Witness adapté (Cloud Witness pour les clusters multi-sites).',
    'Auditer le calcul du quorum après chaque opération de maintenance ou d’éviction de nœud pour garantir la tolérance aux pannes.'
  ],
  summary: [
    'PowerShell Remoting exploite WinRM (ports 5985/5986) pour administrer les serveurs à grande échelle via Enter-PSSession et Invoke-Command.',
    'L’architecture VSS coordonne le Requestor (wbadmin), les Writers applicatifs (AD, SQL) et le Provider de stockage pour des instantanés cohérents.',
    'Les sauvegardes de l’état du système (System State) et Bare Metal Recovery (BMR) constituent les garanties ultimes contre les ransomwares.',
    'Le Failover Clustering (WSFC) élimine les SPOFs et maintient les services critiques en production (Hyper-V, SQL Server, serveurs de fichiers).',
    'La règle du quorum impose une majorité absolue stricte : $\\lfloor N / 2 \\rfloor + 1$ voix actives pour maintenir le cluster en ligne.',
    'Le mécanisme de quorum empêche le Split-Brain, protégeant le stockage partagé contre toute écriture concurrente destructrice.'
  ],
  checklist: [
    'Le service WinRM est-il démarré et autorisé dans le pare-feu Windows pour autoriser l’administration distante ?',
    'Les commandes PowerShell critiques utilisent-elles des paramètres obligatoires validés sans ambiguïté ?',
    'Tous les VSS Writers affichent-ils un statut stable sans erreur (State: [1] Stable) sous vssadmin list writers ?',
    'L’espace de stockage cible de la sauvegarde intègre-t-il la réserve d’overhead VSS de 15 % recommandée ?',
    'Le cluster de basculement dispose-t-il d’un nombre impair total de voix grâce à un témoin Witness approprié ?',
    'La procédure de reprise après sinistre (Disaster Recovery Plan) a-t-elle été validée par un test réel de basculement de nœud ?'
  ],
  notions: [
    {
      name: 'PowerShell Remoting',
      desc: 'Technologie d’administration à distance s’appuyant sur le protocole WS-Management et WinRM pour exécuter des scripts sur des machines distantes.'
    },
    {
      name: 'WinRM (Windows Remote Management)',
      desc: 'Service Windows implémentant la norme WS-Man sur les ports TCP 5985 (HTTP/Kerberos) et 5986 (HTTPS).'
    },
    {
      name: 'VSS (Volume Shadow Copy Service)',
      desc: 'Cadre architectural de Windows coordonnant la création de clichés instantanés différentiels sans interruption de service applicatif.'
    },
    {
      name: 'VSS Writer',
      desc: 'Composant logiciel applicatif spécialisé (AD, SQL, Exchange) garantissant que les données en mémoire sont gelées proprement lors du cliché.'
    },
    {
      name: 'WSFC (Windows Server Failover Clustering)',
      desc: 'Rôle de haute disponibilité regroupant des serveurs physiques indépendants pour assurer le basculement transparent de charges applicatives.'
    },
    {
      name: 'Quorum de Cluster',
      desc: 'Nombre minimal de voix actives requis pour qu’un cluster de basculement soit autorisé à rester opérationnel et à gérer les ressources.'
    },
    {
      name: 'Split-Brain',
      desc: 'Scénario critique où deux sous-groupes d’un cluster coupé tentent d’accéder simultanément au même stockage, risquant la corruption irréversible.'
    },
    {
      name: 'Cloud Witness (Témoin Cloud)',
      desc: 'Type de témoin de quorum utilisant un compte de stockage Azure Blob comme tiers de confiance arbitre dans un cluster Windows Server.'
    }
  ],
  pitfalls: [
    {
      title: 'Ignorer les erreurs des VSS Writers',
      desc: 'Lancer une sauvegarde alors qu’un VSS Writer est en état Failed produit un cliché corrompu et inexploitable pour une restauration d’urgence.'
    },
    {
      title: 'Cluster à nombre pair de voix sans témoin',
      desc: 'Configurer un cluster de 2 ou 4 nœuds sans témoin expose le système à une perte totale de quorum dès la panne d’un seul nœud physique.'
    },
    {
      title: 'Sessions RDP interactives abusives pour l’administration',
      desc: 'Se connecter en Bureau à distance sur les serveurs au lieu d’utiliser PowerShell Remoting consomme inutilement des ressources et dégrade la traçabilité.'
    },
    {
      title: 'Oubli de la marge de sécurité dans la volumétrie de sauvegarde',
      desc: 'Dimensionner un disque de sauvegarde à la taille exacte des données sans compter l’overhead de 15 % sature le disque dès le premier cycle incrémental.'
    }
  ],
  questions: [
    {
      stem: 'Quel protocole réseau sous-jacent est utilisé par PowerShell Remoting pour la communication distante ?',
      opts: [
        'SSH uniquement',
        'WS-Management (WS-Man) via le service WinRM',
        'Telnet sur le port 23',
        'SNMPv1'
      ],
      correct: 1,
      exp: 'PowerShell Remoting repose sur le protocole standardisé WS-Management implémenté par le service système WinRM.'
    },
    {
      stem: 'Quel est le port TCP d’écoute par défaut de WinRM en environnement de domaine Active Directory (HTTP avec chiffrement Kerberos) ?',
      opts: [
        'Port 80',
        'Port 443',
        'Port 5985',
        'Port 3389'
      ],
      correct: 2,
      exp: 'Le port TCP 5985 est le port standard de WinRM HTTP (le port 5986 étant réservé à HTTPS avec certificat SSL dédié).'
    },
    {
      stem: 'Dans l’architecture VSS, quel rôle remplit le composant « VSS Writer » ?',
      opts: [
        'Il écrit les données sur la bande magnétique',
        'Il suspend brièvement les transactions de l’application et vide les caches pour assurer la cohérence des données',
        'Il facture les licences de sauvegarde à l’entreprise',
        'Il chiffre le disque avec BitLocker'
      ],
      correct: 1,
      exp: 'Le VSS Writer appartient à l’application (AD DS, SQL Server) et prépare celle-ci en figeant temporairement les écritures pendant la création du cliché.'
    },
    {
      stem: 'Dans un cluster à 3 nœuds physiques sans témoin, combien de voix composent le quorum et quelle est la majorité requise ?',
      opts: [
        '3 voix au total, majorité de 2 voix',
        '3 voix au total, majorité de 3 voix',
        '2 voix au total, majorité de 1 voix',
        '4 voix au total, majorité de 3 voix'
      ],
      correct: 0,
      exp: 'Chaque nœud a 1 voix (total = 3). La majorité absolue est égale à $\\lfloor 3 / 2 \\rfloor + 1 = 2$ voix.'
    },
    {
      stem: 'Quel risque critique le mécanisme de quorum empêche-t-il formellement dans un cluster de basculement ?',
      opts: [
        'Le dépassement de la mémoire vive',
        'Le phénomène de Split-Brain et la corruption des données sur le stockage partagé',
        'La surchauffe des ventilateurs du serveur',
        'L’expiration des licences Windows'
      ],
      correct: 1,
      exp: 'Le quorum évite qu’une partition réseau n’entraîne l’exécution concurrente de deux instances du même service écrivant sur le même disque (Split-Brain).'
    },
    {
      stem: 'Quel type de témoin de quorum est recommandé pour un cluster sans baie SAN partagée ou réparti sur plusieurs sites géographiques ?',
      opts: [
        'Témoin disquette 3.5 pouces',
        'Témoin Cloud (Cloud Witness) sur stockage Blob Azure',
        'Témoin imprimante réseau',
        'Témoin câble série RS-232'
      ],
      correct: 1,
      exp: 'Le Cloud Witness exploite un compte Azure Blob léger et économique comme arbitre tiers, idéal pour les clusters multi-sites ou sans SAN.'
    },
    {
      stem: 'Quelle commande PowerShell permet d’exécuter un bloc de script en parallèle sur une liste de serveurs distants ?',
      opts: [
        'Enter-PSSession',
        'Invoke-Command',
        'Start-Process',
        'Set-ExecutionPolicy'
      ],
      correct: 1,
      exp: 'Invoke-Command permet l’exécution distribuée 1:N en envoyant le ScriptBlock à travers des sessions WinRM parallèles.'
    },
    {
      stem: 'Quelle commande en ligne permet de vérifier l’état de santé de tous les VSS Writers sur un serveur Windows ?',
      opts: [
        'wbadmin stop job',
        'vssadmin list writers',
        'netstat -an',
        'dism /online /cleanup-image'
      ],
      correct: 1,
      exp: 'La commande vssadmin list writers affiche l’état de chaque composant de sauvegarde VSS (vérifier que l’état est [1] Stable).'
    }
  ],
  flashcards: [
    {
      q: 'Sur quels ports écoute le service WinRM pour PowerShell Remoting ?',
      a: 'Port TCP 5985 (HTTP sécurisé par Kerberos) et port TCP 5986 (HTTPS avec certificat SSL/TLS).'
    },
    {
      q: 'Quelle est la différence entre Enter-PSSession et Invoke-Command ?',
      a: 'Enter-PSSession ouvre une session interactive unitaire (1:1), tandis qu’Invoke-Command exécute des scripts distribués en parallèle (1:N).'
    },
    {
      q: 'Quels sont les trois composants de l’architecture de sauvegarde VSS ?',
      a: 'Le VSS Requestor (logiciel demandeur), le VSS Writer (application gelée) et le VSS Provider (moteur de cliché).'
    },
    {
      q: 'Comment calcule-t-on la majorité absolue de quorum d’un cluster ?',
      a: 'Majorité requise = (Total des voix // 2) + 1.'
    },
    {
      q: 'Qu’est-ce que le phénomène de Split-Brain dans un cluster ?',
      a: 'La scission d’un cluster en sous-groupes isolés écrivant simultanément sur le même stockage partagé et corrompant les données.'
    },
    {
      q: 'Quels sont les avantages d’un Cloud Witness (témoin Cloud) ?',
      a: 'Il arbitre le quorum via un simple compte Blob Azure, évitant l’achat d’un troisième site physique ou d’une baie SAN dédiée.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés avec la syntaxe PowerShell Remoting ou incompréhension de la formule de quorum.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de l’automatisation WinRM, gestion saine des clichés VSS et configuration de clusters haute disponibilité.'
    },
    {
      cls: 'high',
      text: 'Excellence en ingénierie système Windows : architecture WSFC multi-sites avec Cloud Witness, scripts DevOps durcis et résilience BMR éprouvée.'
    }
  ]
};
