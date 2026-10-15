/**
 * server/content/b3-cloud-aws/chapitre6.js — Chapitre 6
 * Serverless, Observabilité, Supervision & Automatisation (Lambda, CloudWatch, SQS, SNS)
 */
'use strict';

module.exports = {
  n: 6,
  title: 'Serverless, Observabilité, Supervision & Automatisation (Lambda, CloudWatch, SQS, SNS)',
  short: 'Serverless, Observabilité & IaC',
  toc: 'AWS Lambda, files SQS et Dead-Letter Queue, modèle Pub/Sub SNS, métriques & alarmes CloudWatch, audit CloudTrail et IaC CloudFormation.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Pour achever la modernisation du système d\'information de votre entreprise, vous devez concevoir une architecture pilotée par les événements (Event-Driven) ' +
    'hautement scalable et découplée. Vous allez orchestrer des fonctions serverless AWS Lambda connectées à des files d\'attente Amazon SQS protégées par Dead-Letter Queue, ' +
    'diffuser des notifications multi-abonnés via Amazon SNS, centraliser les métriques et alertes critiques sous Amazon CloudWatch, et auditer l\'activité avec AWS CloudTrail.',

  objectives: [
    'Maîtriser le fonctionnement et la tarification à l\'usage d\'AWS Lambda (exécution pilotée par événements, mémoire, durée max de 15 min, cold start).',
    'Concevoir des architectures asynchrones découplées et tolérantes aux pannes avec Amazon SQS (Standard, FIFO, Dead-Letter Queue) et Amazon SNS (Pub/Sub fan-out).',
    'Superviser les charges de travail avec Amazon CloudWatch (métriques, logs, alarmes composites) et tracer l\'activité API avec AWS CloudTrail.',
    'Automatiser le déploiement d\'infrastructures cloud via l\'Infrastructure as Code (IaC) avec AWS CloudFormation et le Cloud Development Kit (CDK).'
  ],

  sections: [
    {
      title: 'AWS Lambda &amp; l\'Architecture Serverless Événementielle',
      html: [
        '<p>AWS Lambda est le service de calcul serverless phare d\'AWS permettant d\'exécuter du code sans provisionner ni administrer de serveurs :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Principes de Fonctionnement</h4>',
        '    <ul>',
        '      <li><strong>Piloté par les événements (Event-driven) :</strong> déclenché automatiquement par des sources d\'événements (dépose de fichier dans S3, requête HTTP via API Gateway, message SQS, modification de table DynamoDB).</li>',
        '      <li><strong>Scalabilité instantanée :</strong> passe automatiquement de 0 à des milliers d\'exécutions concurrentes en quelques fractions de seconde.</li>',
        '      <li><strong>Durée maximale d\'exécution :</strong> <strong>15 minutes (900 secondes)</strong> au maximum par invocation.</li>',
        '      <li><strong>Allocation proportionnelle :</strong> la puissance CPU et la bande passante réseau sont allouées proportionnellement à la quantité de mémoire RAM configurée (de 128 MB à 10 240 MB).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cold Start &amp; Provisioned Concurrency</h4>',
        '    <ul>',
        '      <li><strong>Cold Start (Démarrage à froid) :</strong> latence initiale lors de la création d\'un nouvel environnement d\'exécution (initialisation du runtime Python/Node/Java et chargement du code).</li>',
        '      <li><strong>Provisioned Concurrency :</strong> préchauffe un nombre défini d\'environnements d\'exécution pour garantir une latence de démarrage à deux chiffres en millisecondes pour les APIs critiques.</li>',
        '      <li><strong>Facturation à la milliseconde :</strong> coût basé uniquement sur le nombre d\'invocations et la consommation de calcul en Go-secondes (GB-seconds).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Découplage Asynchrone : Amazon SQS &amp; Amazon SNS',
      html: [
        '<p>Pour éviter les pannes en cascade et absorber les pics de charge, les composants applicatifs doivent être découplés de manière asynchrone :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Amazon SQS (Simple Queue Service) — Modèle Pull</h4>',
        '    <ul>',
        '      <li>File d\'attente de messages distribuée hautement disponible. Les consommateurs interrogent la file (Pull).</li>',
        '      <li><strong>Files Standard :</strong> débit quasi illimité, garantie de distribution au moins une fois (at-least-once), ordre des messages non garanti.</li>',
        '      <li><strong>Files FIFO (First-In-First-Out) :</strong> ordre de distribution strictement préservé, traitement unique sans doublon (exactly-once), débit limité à 300 msg/s (ou 3 000 avec batching).</li>',
        '      <li><strong>Dead-Letter Queue (DLQ) :</strong> file de rebut isolant automatiquement les messages toxiques ayant échoué après un nombre maximal de tentatives (MaxReceiveCount) pour analyse ultérieure.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Amazon SNS (Simple Notification Service) — Modèle Push</h4>',
        '    <ul>',
        '      <li>Service de messagerie Pub/Sub (Publication / Abonnement) basé sur des sujets (Topics).</li>',
        '      <li>Lorsqu\'un message est publié sur un Topic, SNS le pousse (Push) instantanément à tous les abonnés enregistrés.</li>',
        '      <li>Abonnés hétérogènes : files SQS, fonctions Lambda, adresses e-mail, numéros SMS, webhooks HTTP/S.</li>',
        '      <li><strong>Fan-out Pattern :</strong> un événement unique publié dans SNS est dupliqué vers plusieurs files SQS distinctes pour être traité en parallèle par différents services métiers.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Observabilité &amp; Surveillance : Amazon CloudWatch',
      html: [
        '<p>Amazon CloudWatch est la suite centralisée de supervision des ressources et applications hébergées sur AWS et sur site :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>CloudWatch Metrics</h4>',
        '    <p>Collecte des séries temporelles de performances générées automatiquement par tous les services AWS (CPUUtilization, NetworkIn, DiskReadBytes, Invocations Lambda, SQS ApproximateNumberOfMessagesVisible).</p>',
        '    <p>Résolution standard de 1 minute ou détaillée de 1 seconde.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>CloudWatch Logs</h4>',
        '    <p>Centralisation, indexation et analyse en temps réel des journaux applicatifs et système (fichiers logs d\'OS via CloudWatch Agent, sorties stdout/stderr des Lambdas, logs d\'accès VPC Flow Logs).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>CloudWatch Alarms</h4>',
        '    <p>Déclenche automatiquement des actions lorsque des seuils définis sont dépassés sur N périodes consécutives.</p>',
        '    <p>Actions possibles : envoi d\'une notification SNS, déclenchement d\'une politique d\'auto-scaling EC2, ou redémarrage/arrêt automatique d\'une VM défaillante.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Traçabilité &amp; Audit des Accès : AWS CloudTrail',
      html: [
        '<p>Alors que CloudWatch surveille <em>les performances et l\'état</em> des ressources, <strong>AWS CloudTrail surveille les actions et les personnes</strong> :</p>',
        '<ul>',
        '  <li><strong>Historique complet des appels API :</strong> enregistre chaque interaction avec la plateforme AWS (actions émises via la Console, l\'AWS CLI, les SDKs ou les services automatisés).</li>',
        '  <li><strong>Métadonnées d\'audit détaillées :</strong> consigne QUI a fait la demande (utilisateur IAM, rôle STS), QUAND (horodatage précis UTC), DEPUIS OÙ (adresse IP source), QUEL SERVICE a été appelé et QUELLE A ÉTÉ la réponse (succès ou code d\'erreur AccessDenied).</li>',
        '  <li><strong>Intégrité et sécurité :</strong> activation recommandée sur toutes les régions (multi-region trail), chiffrement des journaux avec AWS KMS et validation d\'intégrité cryptographique des fichiers de log (Digest files) pour empêcher toute altération malveillante.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Infrastructure as Code (IaC) : CloudFormation &amp; AWS CDK',
      html: [
        '<p>L\'automatisation déclarative d\'infrastructures élimine les erreurs humaines et garantit la reproductibilité des environnements :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>AWS CloudFormation</h4>',
        '    <ul>',
        '      <li>Définit l\'infrastructure sous forme de templates déclaratifs au format JSON ou YAML.</li>',
        '      <li>Regroupe les ressources dans une <strong>pile (Stack)</strong> gérée comme une unité atomique (création, mise à jour, suppression ordonnée).</li>',
        '      <li>Détection des dérives (Drift Detection) pour identifier les modifications manuelles effectuées hors template.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>AWS Cloud Development Kit (CDK)</h4>',
        '    <ul>',
        '      <li>Framework de développement logiciel permettant de modéliser l\'infrastructure avec des langages de programmation modernes (Python, TypeScript, Java, C#).</li>',
        '      <li>Compile le code impératif en templates CloudFormation déclaratifs tout en fournissant des composants de haut niveau (Constructs) intégrant les meilleures pratiques de sécurité.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie Serverless & Observabilité',
  method: [
    'Conception découplée Event-Driven : utiliser Amazon SNS pour diffuser les événements métiers à plusieurs consommateurs, et intercaler des files Amazon SQS devant chaque worker pour amortir la charge.',
    'Sécurisation des files avec Dead-Letter Queue : fixer un MaxReceiveCount (ex: 3 tentatives) pour isoler les messages malformés et éviter les boucles d\'échec infinies.',
    'Optimisation des coûts et de la latence Lambda : dimensionner la mémoire RAM pour trouver le compromis optimal durée/coût, et réserver de la Provisioned Concurrency uniquement sur les chemins critiques utilisateurs.',
    'Surveillance proactive et audit d\'infrastructure : configurer des alarmes CloudWatch sur les taux d\'erreur HTTP 5xx et la taille des files SQS, et activer un trail CloudTrail global consigné dans un bucket S3 verrouillé.'
  ],

  summary: [
    'AWS Lambda exécute du code piloté par événements avec montée en charge instantanée, sans gestion de serveurs, avec une durée maximale de 15 minutes et facturation aux Go-secondes.',
    'Amazon SQS offre des files d\'attente fiables (Standard ou FIFO) avec isolation des messages toxiques via Dead-Letter Queue (DLQ).',
    'Amazon SNS permet de diffuser des notifications en temps réel selon le patron Pub/Sub et d\'alimenter plusieurs files SQS en parallèle (Fan-out).',
    'Amazon CloudWatch centralise les métriques de performances, les logs applicatifs et déclenche des alarmes sur franchissement de seuils.',
    'AWS CloudTrail audite l\'intégralité des appels d\'API (qui, quand, où, quelle action), et AWS CloudFormation automatise le déploiement de piles déclaratives complètes.'
  ],

  checklist: [
    'Connaissez-vous la durée maximale d\'exécution autorisée pour une fonction AWS Lambda (15 minutes) ?',
    'Savez-vous comment fonctionne une Dead-Letter Queue (DLQ) dans Amazon SQS et quel paramètre déclenche le transfert ?',
    'Distinguez-vous parfaitement le rôle d\'Amazon CloudWatch (métriques et performances) de celui d\'AWS CloudTrail (audit des appels d\'API) ?',
    'Pouvez-vous expliquer le patron d\'architecture Fan-out combinant Amazon SNS et plusieurs files Amazon SQS ?',
    'Comprenez-vous le fonctionnement des piles (Stacks) et la détection de dérive dans AWS CloudFormation ?'
  ],

  notions: [
    { term: 'AWS Lambda', def: 'Service de calcul serverless exécutant du code en réponse à des événements avec facturation à la milliseconde.' },
    { term: 'Cold Start', def: 'Temps d\'initialisation du conteneur et du runtime lors de la première invocation d\'une fonction serverless.' },
    { term: 'Amazon SQS', def: 'Simple Queue Service : files d\'attente managées de messages permettant de découpler des architectures distribuées.' },
    { term: 'Dead-Letter Queue (DLQ)', def: 'File de rebut SQS recevant les messages ayant dépassé le nombre maximal de tentatives de traitement infructueuses.' },
    { term: 'Amazon SNS', def: 'Simple Notification Service : service de messagerie Pub/Sub envoyant des notifications en mode push à de multiples abonnés.' },
    { term: 'Fan-out Pattern', def: 'Patron d\'architecture publiant un message dans un topic SNS qui le duplique vers plusieurs files SQS en parallèle.' },
    { term: 'Amazon CloudWatch', def: 'Plateforme centralisée de surveillance collectant métriques, logs et pilotant des alarmes opérationnelles.' },
    { term: 'AWS CloudTrail', def: 'Service d\'audit et de traçabilité consignant l\'historique complet de tous les appels API émis sur un compte AWS.' }
  ],

  pitfalls: [
    'Tenter d\'exécuter des traitements batch continus dépassant 15 minutes dans AWS Lambda au lieu d\'utiliser AWS Batch ou des instances EC2.',
    'Oublier de configurer une Dead-Letter Queue sur une file SQS, provoquant le blocage de consommateurs par des messages corrompus réexécutés indéfiniment.',
    'Confondre CloudWatch (monitoring des performances et métriques) avec CloudTrail (journalisation d\'audit des appels API de sécurité).',
    'Modifier manuellement des ressources déployées par CloudFormation dans la console, ce qui crée des dérives d\'état (Stack Drift).'
  ],

  questions: [
    {
      stem: 'Quelle est la durée maximale d\'exécution (timeout limite) autorisée pour une fonction AWS Lambda avant interruption forcée ?',
      opts: ['5 minutes', '15 minutes', '1 heure', 'Illimitée'],
      correct: 1,
      exp: 'Une fonction AWS Lambda peut s\'exécuter pendant une durée maximale de 15 minutes (900 secondes). Au-delà, l\'exécution est interrompue et il convient d\'employer AWS Batch, ECS ou EC2.'
    },
    {
      stem: 'Dans Amazon SQS, quel mécanisme permet d\'isoler automatiquement les messages ayant échoué à être traités après N tentatives infructueuses ?',
      opts: ['Auto-scaling Queue', 'Dead-Letter Queue (DLQ)', 'Visibility Timeout infini', 'S3 Glacier Archive'],
      correct: 1,
      exp: 'Une Dead-Letter Queue (DLQ) reçoit automatiquement les messages dont le compteur ReceiveCount atteint ou dépasse le seuil MaxReceiveCount configuré, isolant ainsi les messages toxiques.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre Amazon CloudWatch et AWS CloudTrail ?',
      opts: ['CloudWatch est payant alors que CloudTrail est gratuit', 'CloudWatch surveille les métriques de performance et les logs ; CloudTrail enregistre l\'historique d\'audit de tous les appels API (qui a fait quoi)', 'CloudTrail ne fonctionne qu\'avec S3', 'Il n\'y a aucune différence'],
      correct: 1,
      exp: 'CloudWatch monitore l\'état opérationnel et les métriques des ressources (CPU, mémoire, requêtes). CloudTrail est un outil d\'audit de gouvernance qui trace l\'identité de l\'appelant et chaque requête API.'
    },
    {
      stem: 'Quel patron d\'architecture permet de dupliquer un message unique vers plusieurs files d\'attente SQS traitées en parallèle par différents services ?',
      opts: ['Le patron Scatter-Gather', 'Le patron Fan-out (Amazon SNS vers plusieurs Amazon SQS)', 'Le patron Single Point of Failure', 'Le patron Round-Robin DNS'],
      correct: 1,
      exp: 'Le pattern Fan-out consiste à publier un message sur un topic Amazon SNS, auquel sont abonnées plusieurs files SQS distinctes. SNS duplique et pousse le message vers chaque file en parallèle.'
    },
    {
      stem: 'Comment la puissance de calcul CPU et la bande passante réseau sont-elles allouées à une fonction AWS Lambda ?',
      opts: ['Elles doivent être achetées sur une console dédiée', 'Elles sont allouées proportionnellement à la quantité de mémoire RAM configurée pour la fonction', 'Elles sont toujours plafonnées à 1 vCPU', 'Elles dépendent de la région uniquement'],
      correct: 1,
      exp: 'Dans AWS Lambda, l\'unique curseur de performance est la mémoire RAM (128 MB à 10 GB). AWS alloue automatiquement la puissance CPU et le réseau de façon strictement proportionnelle à la RAM allouée.'
    },
    {
      stem: 'Quelle caractéristique technique distingue formellement une file Amazon SQS FIFO d\'une file SQS Standard ?',
      opts: ['Les files FIFO ne supportent pas le format JSON', 'Les files FIFO garantissent un ordre de traitement strict (premier entré, premier sorti) et une livraison exactement une fois sans doublon', 'Les files FIFO sont gratuites sans limite', 'Les files FIFO ne peuvent contenir que 10 messages'],
      correct: 1,
      exp: 'Les files SQS FIFO (First-In-First-Out) garantissent que les messages sont remis strictement dans l\'ordre de leur émission et éliminent les doublons (exactly-once processing).'
    },
    {
      stem: 'Dans AWS CloudFormation, quel mécanisme permet d\'inspecter les modifications qui seront apportées à l\'infrastructure avant de les appliquer réellement ?',
      opts: ['Change Sets (Jeux de modifications)', 'Stack Drift', 'Rollback manuel', 'CloudTrail Digest'],
      correct: 0,
      exp: 'Les Change Sets permettent de prévisualiser l\'impact d\'une mise à jour de template CloudFormation (ressources créées, modifiées ou supprimées avec ou sans interruption) avant validation.'
    },
    {
      stem: 'Quel paramètre d\'une file Amazon SQS définit la durée pendant laquelle un message retiré par un consommateur reste invisible pour les autres consommateurs ?',
      opts: ['MessageRetentionPeriod', 'VisibilityTimeout', 'DelaySeconds', 'WaitTimeSeconds'],
      correct: 1,
      exp: 'Le VisibilityTimeout définit la fenêtre de temps pendant laquelle un message en cours de traitement est masqué pour éviter que d\'autres consommateurs ne le traitent en parallèle.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la durée maximale d\'exécution d\'une fonction AWS Lambda ?',
      a: '15 minutes (900 secondes) par invocation au maximum.'
    },
    {
      q: 'À quoi sert une Dead-Letter Queue (DLQ) dans Amazon SQS ?',
      a: 'À isoler automatiquement les messages ayant échoué après un nombre maximal de tentatives (MaxReceiveCount) pour analyse.'
    },
    {
      q: 'Quelle est la différence clé entre Amazon SQS et Amazon SNS ?',
      a: 'SQS fonctionne en mode pull (file d\'attente consommée par des workers) ; SNS fonctionne en mode push (diffusion Pub/Sub multi-abonnés).'
    },
    {
      q: 'Quelle est la différence fondamentale entre CloudWatch et CloudTrail ?',
      a: 'CloudWatch surveille les métriques et les performances des ressources ; CloudTrail audite les appels d\'API (qui a fait quoi).'
    },
    {
      q: 'Qu\'est-ce que le patron d\'architecture Fan-out ?',
      a: 'La publication d\'un événement dans un topic SNS qui le duplique automatiquement vers plusieurs files SQS abonnées en parallèle.'
    },
    {
      q: 'Comment fonctionne la tarification d\'AWS Lambda ?',
      a: 'Facturation à l\'usage combinant le nombre de requêtes (0.20 $/million) et le temps de calcul en Go-secondes.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Concepts serverless et messagerie fragiles. Révisez les limites Lambda et le fonctionnement des files SQS.' },
    { cls: 'mid', text: 'Score 60-74 % : Connaissances de base acquises. Approfondissez la différence entre CloudWatch et CloudTrail.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Entraînez-vous à simuler le routage vers une DLQ dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez le patron Fan-out et les automatisations CloudFormation.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte serverless AWS. Félicitations pour l\'achèvement du cursus Cloud AWS B3 !' }
  ]
};
