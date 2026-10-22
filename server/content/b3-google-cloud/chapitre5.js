/**
 * Chapitre 5 du cours « Google Cloud Platform B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Stockage Distribué, Bases de Données & Pipeline Big Data',
  short: 'Stockage, Bases de Données &amp; Pub/Sub',
  toc: 'Google Cloud Storage (GCS, durabilité 11 9s, classes Standard, Nearline, Coldline, Archive et règles de cycle de vie), bases relationnelles managées (Cloud SQL avec réplication HA vs Cloud Spanner NewSQL mondial à cohérence stricte et horloges TrueTime), bases NoSQL managées (Firestore orienté document vs Cloud Bigtable large-colonne sub-milliseconde) et ingestion de flux asynchrone avec Cloud Pub/Sub.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans les applications d\'entreprise modernes générant des téraoctets de données hétérogènes (fichiers multimédias, transactions bancaires, télémétrie IoT, analytics décisionnels), choisir le mauvais moteur de persistance conduit à des goulets d\'étranglement catastrophiques ou à des factures de stockage disproportionnées. Utiliser Cloud SQL pour de l\'analytique de masse sature rapidement la base, tandis que stocker des archives sur Cloud Storage Standard sans politique de cycle de vie génère des surcoûts considérables. En tant qu\'architecte de données Cloud B3, vous devez maîtriser la matrice de sélection des bases Google Cloud, automatiser le cycle de vie des objets GCS et orchestrer des pipelines d\'ingestion résilients avec Pub/Sub.',
  objectives: [
    'maîtriser Google Cloud Storage (GCS) : nommage mondial unique, niveaux de redondance et 11 9s de durabilité ;',
    'configurer des règles d\'Object Lifecycle Management pour migrer automatiquement les données vers Nearline, Coldline et Archive ;',
    'comparer Cloud SQL (MySQL, PostgreSQL, SQL Server) et Cloud Spanner (NewSQL mondial avec SLA 99.999% et horloges TrueTime) ;',
    'différencier les moteurs NoSQL managés : Firestore (documents temps réel) versus Cloud Bigtable (large-colonne sub-milliseconde) ;',
    'concevoir une architecture d\'ingestion asynchrone découplée avec Cloud Pub/Sub (Topics, Subscriptions Pull/Push et Ack Deadlines) ;',
    'analyser et résoudre méthodologiquement des moteurs de cycle de vie GCS, des matrices de sélection de bases de données et des simulateurs Pub/Sub.'
  ],
  sections: [
    {
      title: 'Google Cloud Storage (GCS) : Classes d\'Objets &amp; Cycle de Vie',
      html: [
        '<p>Google Cloud Storage (GCS) est le service de stockage d\'objets non structurés (blobs) hautement résilient, offrant une durabilité annuelle de 99.999999999% (11 9s). Les fichiers sont organisés dans des conteneurs appelés <strong>Buckets</strong> dont le nom doit être <strong>unique au monde</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 4 Classes de Stockage</h4>',
        '    <ul>',
        '      <li><strong>Standard Storage :</strong> Données actives fréquemment consultées (sites web, vidéos en streaming, données courantes). Pas de durée minimale de conservation.</li>',
        '      <li><strong>Nearline Storage :</strong> Données consultées au maximum une fois par mois (sauvegardes mensuelles, rapports périodiques). Durée minimale de facturation : <strong>30 jours</strong>.</li>',
        '      <li><strong>Coldline Storage :</strong> Données consultées au plus une fois par trimestre (archivage intermédiaire, plans de reprise d\'activité DRP). Durée minimale : <strong>90 jours</strong>.</li>',
        '      <li><strong>Archive Storage :</strong> Données froides rarement accédées (&lt; 1 fois par an, conformité fiscale ou juridique). Coût au Go le plus bas du marché. Durée minimale : <strong>365 jours</strong>.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Gestion Automatisée du Cycle de Vie (Lifecycle Rules)</h4>',
        '    <p>Une politique de cycle de vie applique automatiquement des actions selon des conditions d\'âge :</p>',
        '    <pre><code>{\n  "action": {"type": "SetStorageClass", "storageClass": "NEARLINE"},\n  "condition": {"age": 30}\n},\n{\n  "action": {"type": "SetStorageClass", "storageClass": "ARCHIVE"},\n  "condition": {"age": 365}\n}</code></pre>',
        '    <p>Cette automatisation réduit la facture de stockage de plus de 80% sans modifier le moindre code applicatif.</p>',
        '  </div>',
        '</div>',
        box('standard', 'Contrôle d\'Accès : Uniform Bucket-Level Access vs Signed URLs', [
          '<p>Par défaut, Google Cloud préconise <strong>Uniform Bucket-Level Access</strong> qui unifie le contrôle d\'accès uniquement au niveau IAM (éliminant les ACLs complexes objet par objet). Pour permettre à un utilisateur externe de téléverser ou télécharger un fichier temporairement sans compte Google, on génère une <strong>URL signée (Signed URL)</strong> avec une durée de validité limitée (ex: 15 minutes).</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Bases Relationnelles : Cloud SQL vs Cloud Spanner',
      html: [
        '<p>Google Cloud propose deux approches relationnelles selon l\'échelle et les contraintes géographiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Cloud SQL (Régional Managé)</h4>',
        '    <ul>',
        '      <li>Moteurs compatibles standards : MySQL, PostgreSQL et SQL Server.</li>',
        '      <li>Gestion automatique des sauvegardes, correctifs d\'OS et réplicas de lecture (Read Replicas).</li>',
        '      <li><strong>Haute Disponibilité (HA) :</strong> basculement automatique vers une instance standby synchrone dans une zone secondaire en cas de sinistre zonal (SLA 99.95%).</li>',
        '      <li>Limite : stockage plafonné à 64 To et montée en charge verticale (scale-up).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cloud Spanner (NewSQL Mondial Distribué)</h4>',
        '    <ul>',
        '      <li>Base de données relationnelle distribuée à l\'échelle de la planète avec montée en charge horizontale illimitée (scale-out).</li>',
        '      <li><strong>Cohérence stricte ACID mondiale</strong> garantie par la technologie d\'horloges matérielles synchronisées <strong>Google TrueTime</strong> (combinaison d\'horloges atomiques et de récepteurs GPS dans chaque datacenter).</li>',
        '      <li>Disponibilité record de <strong>99.999%</strong> (moins de 5 minutes d\'indisponibilité par an). Moteur officiel de Google Play, Google Ads et des plus grandes banques mondiales.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Bases NoSQL : Firestore vs Cloud Bigtable',
      html: [
        '<p>Pour les modèles de données non structurés ou semi-structurés ne nécessitant pas de schéma rigide :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Firestore (NoSQL Document Temps Réel)</h4>',
        '    <ul>',
        '      <li>Base de données NoSQL orientée documents (organisée en collections et documents JSON).</li>',
        '      <li>Synchronisation bidirectionnelle en temps réel des données avec les clients web et mobiles via SDK.</li>',
        '      <li>Support natif du mode hors-connexion (offline data persistence).</li>',
        '      <li>Idéale pour les applications mobiles, catalogues de produits, profils utilisateurs et jeux en ligne.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cloud Bigtable (NoSQL Large-Colonne Analytique)</h4>',
        '    <ul>',
        '      <li>Le moteur originel créé par Google en 2006 pour indexer le Web et animer Google Maps.</li>',
        '      <li>Base NoSQL large-colonne (Wide-column / clé-valeur massivement distribuée) compatible API Apache HBase.</li>',
        '      <li>Latence de lecture et d\'écriture <strong>sub-milliseconde</strong> sur des pétaoctets de données.</li>',
        '      <li>Idéale pour la télémétrie IoT, les séries temporelles financières, les logs publicitaires et l\'entraînement de modèles IA.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Ingestion de Données Asynchrone : Cloud Pub/Sub &amp; Écosystème Big Data',
      html: [
        '<p>Dans une architecture distribuée, les composants ne doivent jamais communiquer par appels directs bloquants. Cloud Pub/Sub assure le découplage asynchrone mondial :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Fonctionnement de Cloud Pub/Sub</h4>',
        '    <ul>',
        '      <li><strong>Topic (Sujet) :</strong> flux nommé où les producteurs (Publishers) envoient des messages sans connaître les destinataires.</li>',
        '      <li><strong>Subscription (Abonnement) :</strong> file de réception dédiée rattachée à un topic. Chaque abonnement reçoit une copie de tous les messages publiés.</li>',
        '      <li><strong>Mode Pull :</strong> le consommateur interroge activement Pub/Sub pour récupérer des lots de messages.</li>',
        '      <li><strong>Mode Push :</strong> Pub/Sub envoie immédiatement une requête HTTP POST webhook à un endpoint (ex: service Cloud Run).</li>',
        '      <li><strong>Ack Deadline :</strong> délai maximal accordé au consommateur pour acquitter le traitement (défaut 10s). Si le délai expire sans accusé de réception, Pub/Sub renvoie le message.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La Suite Analytique Google Cloud</h4>',
        '    <ul>',
        '      <li><strong>BigQuery :</strong> entrepôt de données (Data Warehouse) Serverless permettant d\'analyser des pétaoctets de données en SQL avec temps de réponse en secondes.</li>',
        '      <li><strong>Cloud Dataflow :</strong> moteur de traitement distribué stream/batch unifié basé sur Apache Beam.</li>',
        '      <li><strong>Cloud Dataproc :</strong> clusters managés pour exécuter des écosystèmes open-source Hadoop et Apache Spark.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Élaboration de la stratégie de stockage Cloud Storage : choisir l\'emplacement (Multi-Region vs Region) et paramétrer les règles de cycle de vie pour basculer automatiquement les données vers les classes économiques.',
    'Sélection du moteur relationnel selon le SLA : déployer Cloud SQL pour les applications standards et migrer vers Cloud Spanner dès que les exigences de scalabilité horizontale et de cohérence mondiale stricte s\'imposent.',
    'Dimensionnement des moteurs NoSQL : arbitrer entre Firestore pour les applications applicatives réactives et Cloud Bigtable pour l\'ingestion massive de télémétrie en temps réel.',
    'Architecture de découplage avec Pub/Sub : dimensionner les délais d\'acquittement (Ack Deadline) et implémenter des files de lettres mortes (Dead Letter Topics) pour traiter les messages en échec.'
  ],
  summary: [
    'Cloud Storage offre 11 9s de durabilité avec 4 classes de stockage optimisées pour le coût (Standard, Nearline, Coldline, Archive).',
    'L\'Object Lifecycle Management migre automatiquement les objets sans intervention humaine selon des règles d\'âge.',
    'Cloud SQL gère MySQL, PostgreSQL et SQL Server en régional avec HA, tandis que Cloud Spanner fournit du NewSQL mondial à cohérence stricte avec 99.999% de SLA.',
    'Firestore est optimisé pour les documents temps réel et mobiles, alors que Cloud Bigtable traite des téraoctets de données large-colonne avec latence sub-milliseconde.',
    'Cloud Pub/Sub fournit une messagerie asynchrone mondiale scalable reliant les producteurs et les consommateurs en mode Pull ou Push.'
  ],
  checklist: [
    'Connaissez-vous les durées minimales de facturation des classes GCS (30j Nearline, 90j Coldline, 365j Archive) ?',
    'Savez-vous expliquer la différence entre Cloud SQL et Cloud Spanner (horloges TrueTime et NewSQL mondial) ?',
    'Comprenez-vous pourquoi Cloud Bigtable est privilégié pour l\'IoT et les séries temporelles face à Firestore ?',
    'Pouvez-vous expliquer le fonctionnement des modes Pull et Push dans Cloud Pub/Sub ?',
    'Savez-vous ce qu\'est une Ack Deadline dans Pub/Sub et ce qui se produit si elle est dépassée ?'
  ],
  notions: [
    { term: 'Cloud Storage (GCS)', def: 'Service de stockage d\'objets non structurés mondialement résilient offrant 11 9s de durabilité et des classes tarifaires adaptées au cycle de vie.' },
    { term: 'Cloud Spanner', def: 'Base de données relationnelle NewSQL distribuée mondialement combinant transactions ACID strictes, horloges TrueTime et SLA 99.999%.' },
    { term: 'Cloud Bigtable', def: 'Base de données NoSQL large-colonne massivement distribuée fournissant une latence sub-milliseconde pour les très grands volumes de données.' },
    { term: 'Firestore', def: 'Base de données NoSQL orientée documents offrant une synchronisation en temps réel et un support hors-ligne pour applications web et mobiles.' },
    { term: 'Cloud Pub/Sub', def: 'Service de messagerie asynchrone mondial hautement scalable permettant le découplage fiable entre producteurs et consommateurs d\'événements.' }
  ],
  pitfalls: [
    'Supprimer des objets dans Nearline ou Coldline avant leur durée minimale de conservation (30 ou 90 jours), déclenchant des frais de suppression anticipée (Early Deletion Fees).',
    'Rendre un bucket public via allUsers pour distribuer un fichier temporaire au lieu de générer une URL signée (Signed URL) avec expiration courte.',
    'Utiliser Cloud Spanner pour un petit projet d\'application interne : le coût de démarrage d\'un nœud Spanner est disproportionné face à une petite instance Cloud SQL.',
    'Oublier d\'acquitter un message Pub/Sub dans l\'Ack Deadline impartie, provoquant des réexpéditions infinies et des doublons de traitement applicatif.'
  ],
  questions: [
    {
      stem: 'Quelle est la durée minimale de conservation et de facturation associée à la classe de stockage Cloud Storage Nearline ?',
      opts: ['0 jour', '30 jours', '90 jours', '365 jours'],
      correct: 1,
      exp: 'Cloud Storage Nearline impose une durée minimale de facturation de 30 jours (Coldline impose 90 jours et Archive 365 jours).'
    },
    {
      stem: 'Quelle technologie matérielle brevetée par Google permet à Cloud Spanner de garantir une cohérence transactionnelle stricte ACID à travers le monde entier ?',
      opts: ['Le protocole Raft', 'Google TrueTime (horloges atomiques et récepteurs GPS)', 'La technologie Quantum Sync', 'Les disques NVMe'],
      correct: 1,
      exp: 'Google TrueTime synchronise les horloges de tous les datacenters de Google via des récepteurs GPS et des horloges atomiques, fournissant une incertitude temporelle bornée pour ordonner les transactions mondiales.'
    },
    {
      stem: 'Quel service de base de données NoSQL Google Cloud est recommandé pour stocker des flux de télémétrie IoT massifs avec des latences de lecture/écriture inférieures à la milliseconde ?',
      opts: ['Firestore', 'Cloud Bigtable', 'Cloud SQL', 'Firebase Realtime Database'],
      correct: 1,
      exp: 'Cloud Bigtable est le moteur NoSQL large-colonne conçu pour absorber des débits colossaux d\'écriture et de lecture avec des temps de réponse sub-millisecondes constants.'
    },
    {
      stem: 'Dans Cloud Pub/Sub, que se passe-t-il si un consommateur met 25 secondes à traiter un message alors que l\'Ack Deadline est configurée à 10 secondes ?',
      opts: ['Le message est détruit définitivement', 'Pub/Sub considère le consommateur en panne et réexpédie le message à un autre consommateur', 'La base de données est verrouillée', 'Le consommateur reçoit une amende financière'],
      correct: 1,
      exp: 'Dès que l\'Ack Deadline expire sans accusé de réception formel (ack), Pub/Sub remet immédiatement le message dans la file de distribution pour qu\'il soit retraité.'
    },
    {
      stem: 'Quelle méthode de contrôle d\'accès Cloud Storage permet de donner à un utilisateur externe un accès temporaire en écriture ou lecture à un objet précis sans qu\'il ne possède de compte Google ?',
      opts: ['Les autorisations IAM au niveau du projet', 'Les règles de pare-feu VPC', 'Les URL signées (Signed URLs)', 'Le partage de clés de compte de service'],
      correct: 2,
      exp: 'Une URL signée (Signed URL) fournit un lien sécurisé temporaire avec signature cryptographique permettant d\'effectuer une opération HTTP (GET, PUT) pendant une durée définie sans authentification GCP.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la durabilité annuelle garantie par Google Cloud Storage (GCS) ?',
      a: '99.999999999% (11 9s de durabilité annuelle).'
    },
    {
      q: 'Quelles sont les durées minimales des classes Nearline, Coldline et Archive ?',
      a: 'Nearline = 30 jours, Coldline = 90 jours, Archive = 365 jours.'
    },
    {
      q: 'Quel est l\'avantage exclusif de Cloud Spanner sur Cloud SQL ?',
      a: 'Une base relationnelle NewSQL mondiale à montée en charge horizontale, cohérence stricte ACID et SLA 99.999%.'
    },
    {
      q: 'Quel cas d\'usage correspond le mieux à Cloud Bigtable ?',
      a: 'La télémétrie IoT, les séries temporelles et l\'analytique à latence sub-milliseconde sur de grands volumes.'
    },
    {
      q: 'Quelle est la différence entre les modes Pull et Push dans Cloud Pub/Sub ?',
      a: 'Pull : le consommateur interroge Pub/Sub ; Push : Pub/Sub déclenche un webhook HTTPS vers le consommateur.'
    },
    {
      q: 'Qu\'est-ce qu\'une URL signée (Signed URL) dans Cloud Storage ?',
      a: 'Une URL temporaire cryptographiquement signée autorisant l\'accès à un objet sans identifiant Google Cloud.'
    }
  ],
  mastery: [
    {
      title: 'Automatisation du cycle de vie des objets Cloud Storage',
      desc: 'Définir des politiques de cycle de vie en JSON pour optimiser automatiquement les coûts d\'archivage.'
    },
    {
      title: 'Sélection et dimensionnement de bases de données GCP',
      desc: 'Arbitrer entre Cloud SQL, Spanner, Firestore et Bigtable selon les exigences de cohérence et de latence.'
    },
    {
      title: 'Conception d\'architectures asynchrones avec Cloud Pub/Sub',
      desc: 'Configurer des topics, des abonnements et des délais d\'acquittement pour découpler les flux de production.'
    },
    {
      title: 'Sécurisation des accès aux données avec Signed URLs',
      desc: 'Générer des URLs temporaires signées pour autoriser les téléversements directs sécurisés vers GCS.'
    },
    {
      title: 'Mise en œuvre de la haute disponibilité sur Cloud SQL',
      desc: 'Déployer des instances avec réplication zonale synchrone et tester les basculements automatiques sans perte de données.'
    }
  ]
};
