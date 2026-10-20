/**
 * Chapitre 1 du cours « Anglais B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Terminologie IT Avancée, Acronymes &amp; Modèles d’Architecture Cloud',
  short: 'Terminologie, Acronymes &amp; Cloud',
  toc: 'Précision terminologique en ingénierie logicielle et systèmes (glitch, bug, vulnérabilité et exploit ; latence vs bande passante vs débit), décodage rigoureux des acronymes internationaux (API, CI/CD, IaaS, PaaS, SaaS, SSH, TLS, DNS, REST, CLI, GUI, SLA) et analyse du modèle de responsabilité partagée en architecture Cloud.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Dans une entreprise technologique multinationale ou une scale-up internationale, les ingénieurs réseau, DevOps et développeurs échangent quotidiennement en anglais à travers des pull requests, des spécifications d’architecture et des canaux Slack/Teams. L’emploi de formulations vagues ou familières (« the system is broken », « it is very slow », « we fixed the bad stuff ») génère des ambiguïtés critiques et ralentit le diagnostic d’incident. À ce niveau académique, l’ingénieur doit maîtriser la distinction rigoureuse entre anomalies transitoires, failles de sécurité et dysfonctionnements logiques, expliciter instantanément les acronymes fondamentaux de l’écosystème IT et délimiter avec clarté le modèle de responsabilité partagée Cloud (IaaS vs PaaS vs SaaS).',
  objectives: [
    'distinguer avec rigueur en anglais technique un glitch, un bug, une vulnérabilité de sécurité et un exploit ;',
    'différencier la latence (latency), la bande passante (bandwidth) et le débit utile (throughput) dans les diagnostics réseau ;',
    'décoder et expliciter la forme développée ainsi que le domaine technologique des acronymes IT normalisés (API, CI/CD, SSH, TLS, SLA) ;',
    'analyser le modèle de responsabilité partagée Cloud (Shared Responsibility Model) et cartographier les rôles entre client et fournisseur (IaaS, PaaS, SaaS) ;',
    'implémenter en Python 3 des expanseurs d’acronymes, des linters de précision terminologique et des classificateurs de modèles Cloud.'
  ],
  sections: [
    {
      title: 'Précision Terminologique en Ingénierie : Du Langage Familier au Vocabulaire Précis',
      html: [
        '<p>En communication technique internationale, le vocabulaire est la première interface de programmation (API) de l’ingénieur. Une terminologie imprécise induit en erreur les équipes distantes et retarde la résolution des crises :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Quatre Niveaux d’Anomalie Informatique</h4>',
        '    <ul>',
        '      <li><strong>Glitch :</strong> dysfonctionnement mineur et transitoire, souvent non reproductible, n’affectant pas durablement la cohérence des données (ex. un artefact visuel d’interface ou un saut de trame vidéo).</li>',
        '      <li><strong>Bug :</strong> défaut de conception ou erreur logique dans le code source conduisant de manière reproductible à un comportement erroné ou un crash (ex. une exception de pointeur nul).</li>',
        '      <li><strong>Vulnerability :</strong> faille de sécurité ou faiblesse structurelle dans le code, l’architecture ou la configuration permettant de contourner une politique d’accès (ex. injection SQL, faille XSS).</li>',
        '      <li><strong>Exploit :</strong> morceau de code, script ou séquence d’attaque tirant activement parti d’une vulnérabilité identifiée pour exécuter du code arbitraire ou exfiltrer des données.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Métriques Réseau : Latence, Bande Passante &amp; Débit</h4>',
        '    <ul>',
        '      <li><strong>Latency (Latence) :</strong> temps aller-retour nécessaire à un paquet pour transiter de la source à la destination, mesuré en millisecondes (ms). Une latence élevée induit un délai perceptible.</li>',
        '      <li><strong>Bandwidth (Bande passante) :</strong> capacité théorique maximale du canal de transmission, exprimée en mégabits ou gigabits par seconde (Mbps/Gbps). C’est la largeur du tuyau.</li>',
        '      <li><strong>Throughput (Débit utile / Goodput) :</strong> volume réel de données utiles transférées avec succès par unité de temps, après déduction de l’encapsulation protocolaire et des retransmissions TCP.</li>',
        '      <li><em>Diagnostic concret :</em> Si un flux vidéo en continu saccade au démarrage, il s’agit souvent d’un pic de latence (handshake initial long) ; s’il se dégrade en basse résolution constante, la bande passante est insuffisante.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les Acronymes Régalienne de l’Industrie IT : Expansion &amp; Domaines',
      html: [
        '<p>L’anglais de l’ingénierie repose sur un écosystème d’acronymes standardisés qu’il est impératif de savoir développer et catégoriser instantanément :</p>',
        '<table class="table">',
        '  <thead><tr><th>Acronyme</th><th>Forme Développée (Full Form)</th><th>Domaine Technologique</th><th>Rôle &amp; Contexte d’Utilisation</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>API</strong></td><td>Application Programming Interface</td><td>Software Engineering</td><td>Contrat d’échange standardisé entre deux composants logiciels indépendants.</td></tr>',
        '    <tr><td><strong>CI/CD</strong></td><td>Continuous Integration / Continuous Delivery</td><td>DevOps &amp; Automation</td><td>Automatisation des tests, de la compilation et du déploiement continu d’applications.</td></tr>',
        '    <tr><td><strong>SSH</strong></td><td>Secure Shell</td><td>Networking &amp; Security</td><td>Protocole cryptographique d’administration à distance sécurisée en ligne de commande (port 22).</td></tr>',
        '    <tr><td><strong>TLS</strong></td><td>Transport Layer Security</td><td>Cryptographie Réseau</td><td>Protocole garantissant la confidentialité, l’intégrité et l’authenticité des flux TCP (successeur de SSL).</td></tr>',
        '    <tr><td><strong>DNS</strong></td><td>Domain Name System</td><td>Infrastructure Réseau</td><td>Annuaire hiérarchique distribué résolvant les FQDN en adresses IP routables.</td></tr>',
        '    <tr><td><strong>REST</strong></td><td>Representational State Transfer</td><td>Architecture Web</td><td>Style architectural sans état (stateless) exploitant les verbes et codes HTTP standards.</td></tr>',
        '    <tr><td><strong>CLI / GUI</strong></td><td>Command-Line Interface / Graphical User Interface</td><td>Système d’Exploitation</td><td>Modalités d’interaction textuelle (scriptable) ou visuelle (interactive).</td></tr>',
        '    <tr><td><strong>SLA</strong></td><td>Service Level Agreement</td><td>Gouvernance &amp; Contrats</td><td>Engagement contractuel fixant les niveaux de service, de disponibilité et de pénalités.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Modèle de Responsabilité Partagée Cloud (Shared Responsibility Model)',
      html: [
        '<p>Dans une infrastructure Cloud moderne, comprendre la ligne de partage des responsabilités entre le fournisseur (AWS, Azure, GCP) et le client est capital pour la sécurité et la conformité :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>IaaS vs PaaS vs SaaS : Périmètres de Gestion</h4>',
        '    <ul>',
        '      <li><strong>IaaS (Infrastructure as a Service) :</strong> Le fournisseur gère les centres de données, le matériel, le réseau physique et la virtualisation. Le client gère l’OS (mises à jour, correctifs de sécurité), les middlewares, les runtimes, l’application et les données.</li>',
        '      <li><strong>PaaS (Platform as a Service) :</strong> Le fournisseur gère en plus le système d’exploitation, le patch management et le runtime d’exécution. Le client se concentre uniquement sur le code applicatif et les schémas de données.</li>',
        '      <li><strong>SaaS (Software as a Service) :</strong> Le fournisseur opère la totalité de la pile logicielle et d’infrastructure. Le client gère exclusivement la configuration des accès, les politiques d’utilisateurs et la gouvernance des données.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Vocabulaire d’Évolutivité : Scale Up vs Scale Out</h4>',
        '    <ul>',
        '      <li><strong>Vertical Scaling (Scale Up) :</strong> Ajout de ressources CPU, RAM ou stockage à une machine ou instance existante. Présente une limite matérielle et nécessite souvent un redémarrage (downtime).</li>',
        '      <li><strong>Horizontal Scaling (Scale Out) :</strong> Multiplication du nombre d’instances ou de nœuds en parallèle derrière un répartiteur de charge (Load Balancer). Offre une haute disponibilité et une élasticité quasi illimitée.</li>',
        '      <li><strong>High Availability (HA) :</strong> Capacité d’un système à rester opérationnel sans interruption de service même en cas de défaillance d’un composant physique ou d’une zone de disponibilité (Availability Zone).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Remplacer systématiquement les termes familiers (« broken », « slow ») par la terminologie précise (« service outage », « high latency ») dans tous les écrits techniques.',
    'Distinguer immédiatement un bug reproductible d’un glitch transitoire ou d’une vulnérabilité de sécurité avant d’ouvrir un ticket d’incident.',
    'Développer et expliciter les acronymes clés (API, CI/CD, TLS, SLA) dès la première occurrence dans une documentation formelle.',
    'Vérifier le modèle de responsabilité partagée (IaaS, PaaS, SaaS) avant d’attribuer les tâches de patch management et de sauvegarde.',
    'Analyser les problèmes de performance en distinguant la composante latence (délai RTT) de la composante bande passante (débit utile).'
  ],
  summary: [
    'En ingénierie informatique anglophone, la précision du vocabulaire est essentielle pour éviter les confusions critiques en production.',
    'Un glitch est transitoire, un bug est reproductible, une vulnérabilité est une faille exploitable, et un exploit est l’attaque concrète.',
    'La latence mesure le temps de trajet des paquets (ms), tandis que la bande passante mesure la capacité maximale du canal (Mbps).',
    'Les acronymes fondamentaux (API, CI/CD, SSH, TLS, DNS, REST, CLI, SLA) doivent être maîtrisés sous leur forme développée et dans leur domaine.',
    'Le modèle de responsabilité partagée Cloud délimite précisément ce qui incombe au fournisseur et au client en IaaS, PaaS et SaaS.'
  ],
  checklist: [
    'Ai-je banni l’emploi de « broken » au profit de « experiencing an outage » dans mes rapports d’incident ?',
    'Suis-je capable de développer sans hésiter API, CI/CD, IaaS, PaaS, SaaS, TLS et SLA ?',
    'Ai-je identifié si un ralentissement réseau relève de la latence ou d’un manque de bande passante ?',
    'Sais-je qui est responsable du patch management de l’OS entre le client et le fournisseur en IaaS vs PaaS ?',
    'Fais-je la différence entre Scale Up (vertical) et Scale Out (horizontal) ?'
  ],
  notions: [
    'Glitch vs Bug vs Vulnerability vs Exploit',
    'Latency vs Bandwidth vs Throughput',
    'Acronymes IT (API, CI/CD, SSH, TLS, SLA)',
    'Modèle de responsabilité partagée Cloud',
    'IaaS (Infrastructure as a Service)',
    'PaaS (Platform as a Service)',
    'SaaS (Software as a Service)',
    'Vertical Scaling vs Horizontal Scaling'
  ],
  pitfalls: [
    'Qualifier une faille critique de simple « bug » ou « glitch » au lieu d’alerter sur une « security vulnerability ».',
    'Confondre latence élevée (délai de réponse en ms) et saturation de bande passante (volume par seconde).',
    'Croire qu’en environnement IaaS le fournisseur Cloud gère les correctifs de sécurité du système d’exploitation.',
    'Utiliser des acronymes techniques sans s’assurer qu’ils sont partagés par l’ensemble des parties prenantes.'
  ],
  questions: [
    {
      stem: 'Quelle est la différence fondamentale en anglais technique entre un bug et une vulnérabilité (vulnerability) ?',
      opts: [
        'Un bug est une erreur intentionnelle alors qu’une vulnérabilité est un accident matériel.',
        'Un bug est un comportement anormal reproductible dans le code, tandis qu’une vulnérabilité est une faille permettant de compromettre la sécurité du système.',
        'Un bug ne concerne que le matériel, alors qu’une vulnérabilité ne concerne que les bases de données.',
        'Ces deux termes sont rigoureusement synonymes et interchangeables sans nuance.'
      ],
      correct: 1,
      exp: 'Un bug est une erreur de programmation provoquant un comportement erroné. Une vulnérabilité est une faiblesse exploitable pour enfreindre la sécurité ou l’intégrité du système.'
    },
    {
      stem: 'Dans le cadre d’une connexion réseau, que désigne exactement la métrique de latence (latency) ?',
      opts: [
        'Le volume total de données transférées sur un mois complet en gigaoctets.',
        'Le temps aller-retour nécessaire à un paquet pour transiter entre la source et la destination.',
        'Le nombre maximum d’utilisateurs connectés simultanément sur un commutateur.',
        'La bande passante maximale théorique du câble optique.'
      ],
      correct: 1,
      exp: 'La latence (RTT - Round Trip Time) mesure le délai d’acheminement des paquets à travers le réseau, typiquement en millisecondes.'
    },
    {
      stem: 'Que signifie l’acronyme CI/CD dans une démarche DevOps moderne ?',
      opts: [
        'Central Infrastructure / Controlled Data',
        'Continuous Integration / Continuous Delivery (or Deployment)',
        'Cloud Interface / Container Daemon',
        'Cryptographic Identity / Certificate Distribution'
      ],
      correct: 1,
      exp: 'CI/CD désigne l’intégration continue (tests et builds automatiques) et la livraison/déploiement continu vers les environnements cibles.'
    },
    {
      stem: 'Selon le modèle de responsabilité partagée en Cloud Computing, quelle couche est gérée par le client en PaaS mais par le fournisseur en SaaS ?',
      opts: [
        'La virtualisation matérielle des hyperviseurs.',
        'L’application et son code source.',
        'Le refroidissement physique du datacenter.',
        'Le système d’exploitation de base.'
      ],
      correct: 1,
      exp: 'En PaaS (ex. Elastic Beanstalk, Heroku), le client est responsable du code de l’application. En SaaS (ex. Salesforce, Microsoft 365), le fournisseur gère l’application complète.'
    },
    {
      stem: 'Quelle formulation est la plus professionnelle pour remplacer la phrase familière « The website is broken » ?',
      opts: [
        'The website is super dead.',
        'The web service is currently experiencing an outage.',
        'The portal is completely smashed down.',
        'We have bad code in the web stuff.'
      ],
      correct: 1,
      exp: '« The service is experiencing an outage » est la formulation technique standard pour désigner une interruption de service.'
    },
    {
      stem: 'Que décrit le terme d’architecture « Horizontal Scaling » (Scale Out) ?',
      opts: [
        'Remplacer le processeur d’un serveur physique unique par un processeur plus rapide.',
        'Ajouter de multiples nœuds ou instances en parallèle pour répartir la charge applicative.',
        'Réduire la fréquence d’horloge des cartes mères pour économiser l’énergie.',
        'Convertir une base de données relationnelle en fichier texte plat.'
      ],
      correct: 1,
      exp: 'Le Scale Out (mise à l’échelle horizontale) consiste à ajouter des instances de serveurs en parallèle pour absorber la montée en charge.'
    },
    {
      stem: 'Que représente un « Exploit » en cybersécurité internationale ?',
      opts: [
        'Un rapport d’évaluation rédigé par un auditeur interne.',
        'Un script ou payload conçu spécifiquement pour tirer parti d’une vulnérabilité identifiée.',
        'Une mise à jour logicielle corrigeant une faille de sécurité.',
        'Un certificat numérique délivré par une autorité de certification.'
      ],
      correct: 1,
      exp: 'Un exploit est le vecteur d’attaque ou l’outil logiciel exploitant une vulnérabilité logicielle pour porter atteinte au système.'
    },
    {
      stem: 'Quelle est la signification exacte de l’acronyme SLA dans les contrats de services informatiques ?',
      opts: [
        'Software Licensing Authorization',
        'Service Level Agreement',
        'Secure Link Algorithm',
        'Storage Layer Architecture'
      ],
      correct: 1,
      exp: 'Un SLA (Service Level Agreement) formalise les garanties de niveau de service et de disponibilité convenues entre un fournisseur et son client.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la différence entre un bug et une vulnérabilité (vulnerability) ?',
      a: 'Un bug est une erreur de programmation entraînant un comportement anormal reproductible. Une vulnérabilité est une faille de sécurité exploitable pour compromettre le système.'
    },
    {
      q: 'Quelle est la distinction entre Latence (Latency) et Bande passante (Bandwidth) ?',
      a: 'La latence est le délai d’acheminement des paquets (en ms). La bande passante est la capacité maximale théorique de transmission du canal (en Mbps ou Gbps).'
    },
    {
      q: 'Que désigne l’acronyme CI/CD en ingénierie logicielle ?',
      a: 'Continuous Integration / Continuous Delivery (ou Deployment) : automatisation continue des tests, de la compilation et du déploiement applicatif.'
    },
    {
      q: 'Dans le modèle Cloud IaaS, quelles couches incombent directement au client ?',
      a: 'Le système d’exploitation (OS, patches, sécurité), les runtimes, les middlewares, l’application et la gouvernance des données.'
    },
    {
      q: 'Quelle est la différence entre Scale Up (vertical) et Scale Out (horizontal) ?',
      a: 'Scale Up augmente les ressources d’un nœud unique (CPU/RAM). Scale Out multiplie le nombre d’instances en parallèle derrière un répartiteur de charge.'
    },
    {
      q: 'Que signifie l’acronyme SLA et quel est son rôle ?',
      a: 'Service Level Agreement : contrat de niveau de service stipulant les engagements de disponibilité (ex: 99.9% uptime) et les pénalités applicables en cas de rupture.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à développer les acronymes fondamentaux ou confusion entre latence et bande passante.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de la terminologie technique rigoureuse et compréhension claire du modèle IaaS/PaaS/SaaS.'
    },
    {
      cls: 'high',
      text: 'Excellence linguistique et technique : formulations d’ingénierie impeccables, maîtrise totale des acronymes et des modèles d’architecture.'
    }
  ]
};
