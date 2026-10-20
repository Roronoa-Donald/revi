/**
 * Chapitre 5 du cours « Cloud Microsoft Azure B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Stockage Azure (Blob, Files, Disques) et Données Managées',
  short: 'Stockage &amp; Données Managées',
  toc: 'Comptes de stockage Azure (Storage Accounts standard v2), services de stockage de données (Blob Storage non structuré, partages de fichiers SMB/NFS Azure Files, Azure Queues et Tables), gestion automatique du cycle de vie des objets (Lifecycle Management : Hot, Cool, Cold, Archive), politiques de réplication des données (LRS, ZRS, GRS, GZRS), sécurité par signatures d’accès partagé (SAS Tokens) et comparatif des bases de données managées (Azure SQL Database vs Azure Cosmos DB).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans un écosystème d\'entreprise produisant quotidiennement des téraoctets de sauvegardes, de logs applicatifs et de données transactionnelles, conserver indéfiniment toutes les données sur des paliers de stockage à coût élevé entraîne une explosion budgétaire. De même, partager des clés maîtresses de compte de stockage avec des applications clientes crée une faille de sécurité majeure. En tant qu\'architecte de données Cloud B3, vous devez structurer les comptes de stockage Azure, implémenter une politique de cycle de vie (Lifecycle Management) automatisant le passage vers Cool et Archive, sécuriser les accès par jetons SAS délimités dans le temps, et arbitrer entre Azure SQL Database pour le relationnel ACID et Azure Cosmos DB pour le NoSQL distribué à l\'échelle mondiale.',
  objectives: [
    'maîtriser l\'architecture des comptes de stockage Azure Storage (Blob, File, Queue, Table) ;',
    'comparer les mécanismes de réplication des données : LRS, ZRS, GRS et GZRS ;',
    'configurer des règles d\'optimisation du cycle de vie des données (Hot -&gt; Cool -&gt; Cold -&gt; Archive -&gt; Delete) ;',
    'générer et valider des jetons de signature d\'accès partagé (Shared Access Signature - SAS) à privilèges restreints ;',
    'différencier les services de bases de données managées : Azure SQL Database (ACID relationnel) et Azure Cosmos DB (NoSQL distribué mondialement) ;',
    'développer en Python 3 des simulateurs de cycle de vie de stockage, des validateurs de jetons SAS et des sélecteurs d\'architecture de données.'
  ],
  sections: [
    {
      title: 'Comptes de Stockage Azure (Storage Accounts) &amp; Éventail de Services',
      html: [
        '<p>Un Azure Storage Account (Standard general-purpose v2) est le conteneur fondamental de données d\'entreprise sous Azure. Il expose quatre services spécialisés accessibles via des API REST HTTP/HTTPS hautement performantes :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Blob Storage (Objets Non Structurés)</h4>',
        '    <ul>',
        '      <li><strong>Block Blobs :</strong> optimisés pour le streaming de médias, les sauvegardes et les data lakes (fichiers jusqu\'à 190,7 To par blob).</li>',
        '      <li><strong>Append Blobs :</strong> optimisés pour l\'écriture séquentielle de journaux d\'audit et de logs en continu.</li>',
        '      <li><strong>Page Blobs :</strong> blocs de 512 octets à accès aléatoire, servant de support physique aux disques durs virtuels VHD des machines virtuelles.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Azure Files, Queues &amp; Tables</h4>',
        '    <ul>',
        '      <li><strong>Azure Files :</strong> partages de fichiers réseau managés accessibles via les protocoles standard <strong>SMB 3.0</strong> (port 445) et <strong>NFS 4.1</strong>. Montables nativement sur Windows, Linux et macOS.</li>',
        '      <li><strong>Azure Queue Storage :</strong> file d\'attente de messagerie asynchrone pour découpler les composants d\'une architecture logicielle (messages jusqu\'à 64 Ko).</li>',
        '      <li><strong>Azure Table Storage :</strong> magasin de clés-valeurs NoSQL sans schéma pour jeux de données tabulaires simples et économiques.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Paliers d\'Accès (Access Tiers), Cycle de Vie &amp; Réplication des Données',
      html: [
        '<p>Pour concilier performances d\'accès et maîtrise budgétaire FinOps, Azure Blob Storage segmente les données en quatre paliers tarifaires :</p>',
        '<table class="table">',
        '  <thead><tr><th>Palier d\'Accès</th><th>Coût Stockage</th><th>Coût Accès / Lecture</th><th>Durée Minimale</th><th>Latence de Restauration</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Hot (Chaud)</strong></td><td>0.0184 $/Go/mois</td><td>Le plus faible</td><td>Aucune</td><td>Immédiate (millisecondes)</td></tr>',
        '    <tr><td><strong>Cool (Froid)</strong></td><td>0.0100 $/Go/mois (≈ -45%)</td><td>Moyen</td><td>30 jours</td><td>Immédiate (millisecondes)</td></tr>',
        '    <tr><td><strong>Cold (Très froid)</strong></td><td>0.0036 $/Go/mois (≈ -80%)</td><td>Élevé</td><td>90 jours</td><td>Immédiate (millisecondes)</td></tr>',
        '    <tr><td><strong>Archive</strong></td><td>0.00099 $/Go/mois (≈ -94%)</td><td>Très élevé</td><td>180 jours</td><td>Plusieurs heures (réhydratation)</td></tr>',
        '  </tbody>',
        '</table>',
        box('standard', 'Politiques Automatisées de Cycle de Vie (Lifecycle Management)', [
          '<p>Azure applique des règles déclaratives JSON sans aucun code serveur. Les règles évaluent l\'âge du blob depuis sa dernière modification (ou son dernier accès si le suivi d\'accès est activé) :</p>',
          '<ul>',
          '  <li>Transférer vers le palier <code>Cool</code> si le blob n\'a pas été modifié depuis plus de 30 jours.</li>',
          '  <li>Transférer vers le palier <code>Archive</code> si le blob n\'a pas été modifié depuis plus de 90 jours.</li>',
          '  <li>Supprimer définitivement le blob (<code>delete</code>) après 365 ou 1825 jours (conservation légale).</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Sécurité par Jetons SAS &amp; Bases de Données Managées (SQL vs Cosmos DB)',
      html: [
        '<p>L\'exposition sécurisée des données et le choix des moteurs de bases de données constituent deux piliers d\'architecture majeurs :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Signatures d\'Accès Partagé (SAS Tokens)</h4>',
        '    <ul>',
        '      <li><strong>Principe :</strong> URL signée temporaire accordant un accès granulaire sans divulguer la clé maîtresse du compte de stockage.</li>',
        '      <li><strong>Paramètres clés :</strong>',
        '        <br>- <code>sp</code> (Permissions) : <code>r</code> (read), <code>w</code> (write), <code>d</code> (delete), <code>l</code> (list).',
        '        <br>- <code>st</code> / <code>se</code> : date de début et d\'expiration stricte.',
        '        <br>- <code>spr=https</code> : impose le protocole HTTPS sécurisé.',
        '      <li><strong>User Delegation SAS :</strong> signée avec une identité Entra ID pour une traçabilité totale des accès dans les logs d\'audit.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Azure SQL Database vs Cosmos DB</h4>',
        '    <ul>',
        '      <li><strong>Azure SQL Database :</strong> base relationnelle managée (PaaS), compatible T-SQL / SQL Server, transactions ACID complètes, intégrité référentielle et requêtes jointures complexes.</li>',
        '      <li><strong>Azure Cosmos DB :</strong> base NoSQL multi-modèle (document JSON, clé-valeur, graphe Gremlin) avec distribution mondiale à l\'échelle de la planète en un clic, latence garantie inférieure à 10 ms et 5 niveaux de consistance (de Strong à Eventual).</li>',
      '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Choix du service de données selon le modèle applicatif : qualifier le modèle entre relationnel transactionnel (Azure SQL), documents NoSQL ultra-rapides (Cosmos DB), partage réseau (Azure Files) ou stockage objet volumineux (Blob Storage).',
    'Définition de la politique de réplication de résilience : sélectionner ZRS pour les données critiques locales, et GRS/GZRS pour les sauvegardes devant survivre à un sinistre régional continental.',
    'Mise en place de règles de cycle de vie FinOps : automatiser la descente progressive des fichiers vers Cool et Archive pour réduire jusqu\'à 90% des coûts de stockage des données froides.',
    'Verrouillage des accès par jetons SAS et points de terminaison privés : interdire l\'accès public aux comptes de stockage, déployer des Private Endpoints dans le VNet et restreindre les flux clients via des jetons SAS éphémères.'
  ],
  summary: [
    'Les comptes de stockage Azure regroupent 4 services majeurs : Blob (objets), Files (partage SMB/NFS), Queues (messages) et Tables (NoSQL simple).',
    'Les 4 paliers d\'accès Blob (Hot, Cool, Cold, Archive) permettent d\'ajuster les coûts selon la fréquence de consultation des fichiers.',
    'Le Lifecycle Management déplace automatiquement les données froides vers des paliers économiques selon leur ancienneté sans code.',
    'Les signatures d\'accès partagé (SAS Tokens) accordent un accès restreint (droits, durée, HTTPS) sans divulguer la clé secrète du compte.',
    'Azure SQL Database répond aux besoins relationnels ACID structurés, tandis qu\'Azure Cosmos DB gère le NoSQL mondial à latence sub-10ms.'
  ],
  checklist: [
    'Savez-vous dans quels cas utiliser Azure Files (SMB/NFS) plutôt qu\'un conteneur Azure Blob ?',
    'Connaissez-vous les durées minimales de facturation associées aux paliers Cool (30 j), Cold (90 j) et Archive (180 j) ?',
    'Pouvez-vous expliquer le phénomène de réhydratation lors de la lecture d\'un blob archivé ?',
    'Savez-vous composer les paramètres obligatoires d\'un jeton SAS sécurisé (sp=r, spr=https, fenêtre temporelle courte) ?',
    'Quand devez-vous choisir Azure Cosmos DB plutôt qu\'Azure SQL Database ?'
  ],
  notions: [
    { term: 'Block Blob', def: 'Type de blob Azure optimisé pour stocker efficacement d\'immenses volumes de données non structurées (fichiers, images, sauvegardes).' },
    { term: 'Access Tier (Palier d\'accès)', def: 'Niveau de stockage Blob (Hot, Cool, Cold, Archive) associant un coût de rétention par Go et un coût d\'opération de lecture/écriture.' },
    { term: 'Réhydratation de Blob', def: 'Processus asynchrone prenant plusieurs heures pour copier un blob du palier Archive vers un palier en ligne (Hot ou Cool).' },
    { term: 'Shared Access Signature (SAS)', def: 'URI sécurisée intégrant un jeton cryptographique autorisant un accès délégué restreint aux ressources Azure Storage.' },
    { term: 'Azure Cosmos DB', def: 'Base de données NoSQL distribuée mondialement avec latences de lecture et écriture inférieures à 10 millisecondes.' }
  ],
  pitfalls: [
    'Passer un blob en palier Archive puis tenter de le lire immédiatement via une requête HTTP directe : Azure retourne une erreur 409 (l\'objet doit d\'abord être réhydraté).',
    'Supprimer un fichier dans le palier Cool au bout de 5 jours : Azure facture la pénalité des 25 jours restants de la durée minimale de rétention de 30 jours.',
    'Générer un jeton SAS sans date d\'expiration ou avec des droits de suppression complets pour une simple application mobile cliente.',
    'Utiliser Azure Blob Storage pour partager des répertoires de travail réseau d\'entreprise alors qu\'Azure Files est spécialement conçu pour le protocole SMB avec gestion des verrous de fichiers.'
  ],
  questions: [
    {
      stem: 'Quel protocole réseau standard Azure Files supporte-t-il nativement pour permettre le montage de lecteurs réseau partagés sur des postes Windows et serveurs Linux ?',
      opts: ['FTP', 'SMB 3.0 / NFS', 'Telnet', 'TFTP'],
      correct: 1,
      exp: 'Azure Files fournit des partages de fichiers managés dans le Cloud accessibles directement via les protocoles standard SMB 3.0 (port 445) et NFS 4.1.'
    },
    {
      stem: 'Quelle est la durée minimale de facturation d\'un objet stocké dans le palier Cool (Froid) d\'Azure Blob Storage ?',
      opts: ['1 jour', '7 jours', '30 jours', '90 jours'],
      correct: 2,
      exp: 'Le palier Cool impose une durée minimale de rétention de 30 jours. Tout fichier supprimé ou déplacé avant ce terme fait l\'objet d\'une facturation anticipée au prorata des 30 jours.'
    },
    {
      stem: 'Quel palier de stockage offre le coût de stockage par Go le plus bas (moins de 0.001 $/Go/mois) mais nécessite une réhydratation de plusieurs heures pour être lu ?',
      opts: ['Hot', 'Cool', 'Cold', 'Archive'],
      correct: 3,
      exp: 'Le palier Archive stocke les données hors ligne au tarif le plus bas (≈ 0.00099 $/Go/mois), mais nécessite un délai de réhydratation de plusieurs heures pour redevenir lisible.'
    },
    {
      stem: 'Quel paramètre d\'un jeton de signature d\'accès partagé (SAS) permet de forcer l\'utilisation exclusive du protocole chiffré HTTPS ?',
      opts: ['ssl=true', 'spr=https', 'tls=1.3', 'secure=yes'],
      correct: 1,
      exp: 'Le paramètre spr (Signed Protocol) configuré à spr=https contraint le client à utiliser uniquement le protocole HTTPS, rejetant toute requête transmise en HTTP non sécurisé.'
    },
    {
      stem: 'Dans quelles circonstances devez-vous recommander Azure Cosmos DB plutôt qu\'Azure SQL Database ?',
      opts: [
        'Pour héberger une application comptable nécessitant des jointures SQL complexes et des clés étrangères strictes',
        'Pour une application mobile mondiale requérant une latence sub-10ms, un modèle de données semi-structuré JSON et une distribution multi-régions',
        'Pour réduire la taille de la mémoire RAM d\'une VM',
        'Uniquement pour les fichiers PDF archivés'
      ],
      correct: 1,
      exp: 'Azure Cosmos DB est la base NoSQL par excellence pour les applications web et mobiles modernes distribuées mondialement nécessitant une latence ultra-faible garantie et un schéma JSON flexible.'
    },
    {
      stem: 'Quelle est la taille maximale d\'un seul Block Blob dans Azure Blob Storage ?',
      opts: ['5 Go', '100 Go', '5 To', 'Environ 190.7 To'],
      correct: 3,
      exp: 'Un Block Blob standard dans Azure Storage peut atteindre jusqu\'à environ 190.7 To (50 000 blocs de 4 000 Mo chacun).'
    },
    {
      stem: 'Quelle stratégie de réplication garantit la copie synchrone sur 3 zones de disponibilité locales, suivie d\'une réplication asynchrone dans la région jumelée ?',
      opts: ['LRS', 'ZRS', 'GRS', 'GZRS (Geo-Zone-Redundant Storage)'],
      correct: 3,
      exp: 'GZRS (Geo-Zone-Redundant Storage) combine la haute disponibilité locale sur 3 zones (ZRS) avec la résilience géographique dans la région jumelée (GRS).'
    },
    {
      stem: 'Quel service Azure Storage devez-vous utiliser pour créer un système de découplage de tâches et de traitement asynchrone entre microservices ?',
      opts: ['Blob Storage', 'Azure Files', 'Azure Queue Storage', 'Ultra Disk'],
      correct: 2,
      exp: 'Azure Queue Storage permet de stocker d\'immenses volumes de messages (jusqu\'à 64 Ko par message) pour découpler les microservices et absorber les pics de charge applicatifs.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les quatre services inclus dans un compte de stockage Azure Storage standard v2 ?',
      a: 'Azure Blob (objets), Azure Files (fichiers partagés SMB/NFS), Azure Queue (files de messages) et Azure Table (NoSQL simple).'
    },
    {
      q: 'Quels sont les quatre paliers d\'accès d\'Azure Blob Storage et leurs cas d\'usage ?',
      a: 'Hot (accès fréquent), Cool (fichiers stables &gt;30j), Cold (accès rare &gt;90j) et Archive (archivage légal &gt;180j avec réhydratation).'
    },
    {
      q: 'Qu\'est-ce que la réhydratation d\'un blob archivé ?',
      a: 'Le processus asynchrone (pouvant prendre de 1 à 15 heures) permettant de restaurer un blob du palier Archive vers un palier en ligne (Hot ou Cool) afin de pouvoir le lire.'
    },
    {
      q: 'Quels sont les quatre composants essentiels d\'un jeton de sécurité SAS (Shared Access Signature) ?',
      a: '1. Permissions (sp) ; 2. Fenêtre temporelle (st/se) ; 3. Protocole imposé (spr=https) ; 4. Ressource cible autorisée.'
    },
    {
      q: 'Quelle est la différence fondamentale entre Azure SQL Database et Azure Cosmos DB ?',
      a: 'Azure SQL est un moteur relationnel T-SQL transactionnel ACID avec schémas fixes ; Cosmos DB est une base NoSQL multi-modèle distribuée mondialement à latence sub-10ms.'
    },
    {
      q: 'Quelle est la différence entre GRS et GZRS ?',
      a: 'GRS fait du LRS dans la région source puis réplique dans la région jumelée ; GZRS fait du ZRS (3 Availability Zones) dans la région source avant de répliquer dans la région jumelée.'
    }
  ],
  mastery: [
    {
      title: 'Conception de politiques de cycle de vie de stockage d\'entreprise',
      desc: 'Définir des règles déclaratives Azure Blob Lifecycle automatisant la descente en Cool, Cold et Archive pour optimiser le TCO de pétaoctets de logs.'
    },
    {
      title: 'Architecture sécurisée avec Private Endpoints et SAS User Delegation',
      desc: 'Bannir l\'accès public Internet aux comptes de stockage et déléguer des autorisations de téléchargement sécurisées via Entra ID.'
    },
    {
      title: 'Modélisation de données transactionnelles et analytiques multi-moteurs',
      desc: 'Séparer les flux transactionnels structurés vers Azure SQL et les flux de télémétrie semi-structurés vers Cosmos DB.'
    },
    {
      title: 'Plan de reprise d\'activité (PRA) avec réplication GZRS',
      desc: 'Configurer la réplication géo-redondante inter-régions et simuler le basculement d\'un compte de stockage en cas de sinistre continental.'
    },
    {
      title: 'Développement d\'outils d\'analyse de stockage en Python 3',
      desc: 'Concevoir des calculateurs de coûts de transition, des validateurs de syntaxe SAS et des sélecteurs de moteurs de base de données.'
    }
  ]
};
