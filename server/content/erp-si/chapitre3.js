/**
 * Chapitre 3 du cours « ERP & SI » B2 — Intégration du SI & Architectures.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Intégration du SI & Architectures',
  short: 'Intégration du SI',
  toc: 'Modèles d’interconnexion (Point-à-Point vs Hub EAI vs ESB), middleware d’entreprise, formats pivot (EDI, XML, JSON) et pipelines ETL.',
  time: '≈ 3 h 00 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'L’ERP ne vit jamais seul : il doit dialoguer avec les banques, les sites e-commerce, les applications ' +
    'logistiques des transporteurs et les logiciels RH. Concevoir ces passerelles de façon anarchique ' +
    'mène à une « architecture spaghetti » indémêlable. Les architectures EAI et ESB structurent cette intégration.',

  objectives: [
    'comparer les topologies d’intégration (Point-à-Point, Hub & Spoke, ESB, iPaaS) ;',
    'comprendre le rôle et les fonctions d’un Enterprise Service Bus (ESB) ;',
    'maîtriser le concept de format pivot pour la transformation des messages (EDI, XML, JSON) ;',
    'différencier les processus d’intégration par lots (ETL/ELT) des flux temps réel ;',
    'garantir la qualité et la déduplication des données dans le Master Data Management (MDM).'
  ],

  sections: [
    {
      title: 'Topologies d’intégration : Du Spaghetti au Bus de services',
      html: [
        '<p>Lorsque le Système d’Information comporte plusieurs dizaines d’applications, la méthode retenue ' +
        'pour les interconnecter conditionne la maintenabilité globale :</p>',
        '<ul>\n' +
        '  <li><strong>Intégration Point-à-Point (« Architecture Spaghetti »)</strong> : chaque application développe une interface sur mesure vers chaque partenaire. Pour <code>N</code> applications, cela engendre jusqu’à <code>N * (N - 1) / 2</code> connecteurs. Toute mise à jour d’une application casse potentiellement toutes ses interfaces.</li>\n' +
        '  <li><strong>Modèle Hub &amp; Spoke (EAI classique)</strong> : un serveur centralisateur (Hub) reçoit tous les flux et les redistribue. Le nombre d’interfaces passe à <code>N</code>, mais le Hub devient un goulet d’étranglement et un point unique de défaillance (SPOF).</li>\n' +
        '  <li><strong>Bus de services d’entreprise (ESB)</strong> : architecture distribuée orientée services (SOA) où chaque application se connecte à une dorsale commune via des adaptateurs normalisés.</li>\n' +
        '  <li><strong>iPaaS (Integration Platform as a Service)</strong> : version cloud moderne de l’ESB (ex. MuleSoft, Boomi, Workato) facilitant la connexion entre progiciels SaaS et SI interne.</li>\n' +
        '</ul>',
        box('intuition', 'La métaphore de la prise électrique universelle', 'lightbulb',
          '    <p>L’ESB agit comme le réseau électrique domestique : chaque appareil (application) dispose ' +
          'd’une prise standard sans avoir besoin de tirer un câble spécifique vers chaque centrale électrique.</p>')
      ].join('\n')
    },
    {
      title: 'Fonctions clés de l’ESB et du Middleware',
      html: [
        '<p>Un <strong>middleware d’intégration</strong> (ESB) assure quatre missions fondamentales lors du transit d’un message :</p>',
        '<ol>\n' +
        '  <li><strong>Routage</strong> : déterminer le ou les destinataires du message en fonction de son contenu ou de règles déclaratives (<em>Content-Based Routing</em>).</li>\n' +
        '  <li><strong>Transformation</strong> : convertir les données du format propriétaire émetteur vers le format attendu par le destinataire (ex. JSON vers XML ou EDIFACT).</li>\n' +
        '  <li><strong>Médiation de protocoles</strong> : faire dialoguer un système émettant en SFTP avec un ERP recevant en Web Service REST HTTPS.</li>\n' +
        '  <li><strong>Garantie de livraison et file d’attente</strong> : stocker temporairement les messages (via des brokers comme RabbitMQ ou Kafka) si l’application cible est momentanément indisponible.</li>\n' +
        '</ol>',
        box('tech', 'Le modèle du Format Pivot (Canonical Data Model)', 'code',
          '    <p>Plutôt que d’écrire une transformation pour chaque couple d’applications, l’entreprise ' +
          'définit un <strong>format pivot unique</strong> (modèle de données canonique). Chaque système ne ' +
          'traduit son format que vers et depuis ce pivot, réduisant drastiquement les coûts de maintenance.</p>')
      ].join('\n')
    },
    {
      title: 'Formats d’échange : EDI, XML et JSON',
      html: [
        '<p>Les données transitent à travers le SI sous différents standards selon les partenaires :</p>',
        '<table class="data-table">\n' +
        '  <thead>\n' +
        '    <tr><th>Format</th><th>Contexte d’utilisation type</th><th>Avantages &amp; Limites</th></tr>\n' +
        '  </thead>\n' +
        '  <tbody>\n' +
        '    <tr><td><strong>EDI (EDIFACT / ANSI X12)</strong></td><td>Grande distribution, automobile, logistique internationale.</td><td>Très compact, normé par l’ONU, mais rigide et coûteux à mettre en œuvre.</td></tr>\n' +
        '    <tr><td><strong>XML</strong></td><td>Échanges bancaires (SEPA), facturation électronique obligatoire, SOAP.</td><td>Structure arborescente rigoureuse validée par schéma (XSD), mais verbeux.</td></tr>\n' +
        '    <tr><td><strong>JSON</strong></td><td>API REST modernes, intégrations SaaS Cloud, applications web/mobiles.</td><td>Léger, rapide à parser nativement dans tous les langages modernes.</td></tr>\n' +
        '  </tbody>\n' +
        '</table>'
      ].join('\n')
    },
    {
      title: 'Pipelines de données : ETL vs ELT',
      html: [
        '<p>Pour alimenter l’ERP ou consolider les données vers un entrepôt décisionnel (Data Warehouse), ' +
        'on utilise des pipelines de traitement par lots :</p>',
        '<ul>\n' +
        '  <li><strong>ETL (Extract - Transform - Load)</strong> : les données brutes sont extraites des bases sources, transformées et nettoyées sur un serveur dédié, puis chargées dans la cible. Idéal lorsque la qualité de données exige un assainissement préalable rigoureux.</li>\n' +
        '  <li><strong>ELT (Extract - Load - Transform)</strong> : les données sont chargées directement dans l’entrepôt cible moderne (BigQuery, Snowflake), qui utilise sa puissance de calcul parallèle pour exécuter les transformations.</li>\n' +
        '</ul>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Pourquoi l’architecture d’intégration « Point-à-Point » devient-elle ingérable ?', opts: ['Car le nombre d’interfaces explose en N*(N-1)/2 avec le nombre d’applications', 'Car elle interdit d’utiliser des bases SQL', 'Car elle exige une connexion fibre optique exclusive'], correct: 0, exp: 'Chaque nouvelle application impose de recoder des connecteurs vers toutes les autres.' },
    { stem: 'Que signifie l’acronyme ESB dans une architecture de SI ?', opts: ['Enterprise Service Bus', 'External Secure Bridge', 'Electronic Storage Backup'], correct: 0, exp: 'L’Enterprise Service Bus est la dorsale de communication commune du SI.' },
    { stem: 'À quoi sert le concept de « Format Pivot » (Canonical Data Model) ?', opts: ['À factoriser les règles de transformation en traduisant chaque format uniquement vers un standard commun', 'À compresser les disques durs', 'À supprimer le protocole TCP/IP'], correct: 0, exp: 'Le format pivot évite la multiplication exponentielle des convertisseurs spécifiques.' },
    { stem: 'Quel format d’échange est historiquement incontournable dans la grande distribution et l’automobile ?', opts: ['L’EDI (Electronic Data Interchange / EDIFACT)', 'Le format MP3', 'Le markdown'], correct: 0, exp: 'L’EDI régit les échanges automatisés inter-entreprises (commandes, expéditions, factures).' },
    { stem: 'Quelle fonction d’un middleware garantit que les messages ne sont pas perdus si l’ERP est temporairement indisponible ?', opts: ['La file d’attente asynchrone (Queue / Broker)', 'La mise en veille de l’écran', 'Le hachage MD5'], correct: 0, exp: 'Les files de messages temporisent les requêtes jusqu’au rétablissement de la cible.' },
    { stem: 'Que signifie iPaaS ?', opts: ['Integration Platform as a Service', 'Internet Protocol Application Security', 'Internal Package Authentication Server'], correct: 0, exp: 'L’iPaaS désigne une plateforme d’intégration hébergée dans le Cloud (ex. MuleSoft, Boomi).' },
    { stem: 'Quelle est la différence fondamentale entre ETL et ELT ?', opts: ['Dans l’ETL la transformation a lieu avant le chargement cible, dans l’ELT elle a lieu directement dans la cible', 'L’ETL est réservé aux fichiers Word', 'L’ELT n’extrait aucune donnée'], correct: 0, exp: 'L’ELT tire parti de la puissance de calcul des entrepôts de données cloud pour transformer sur place.' },
    { stem: 'Que permet le routage basé sur le contenu (Content-Based Routing) dans un ESB ?', opts: ['Aiguiller un message vers un destinataire spécifique selon la valeur d’un champ (ex. pays du client)', 'Bloquer tous les messages contenant des images', 'Vérifier la vitesse du disque dur'], correct: 0, exp: 'L’ESB lit le message et décide de la destination selon les règles métiers configurées.' }
  ],

  pitfalls: [
    'Créer des flux point-à-point directs en pensant gagner du temps à court terme.',
    'Négliger la normalisation d’un format pivot, obligeant à maintenir des dizaines de scripts de conversion ad hoc.',
    'Confondre un bus de messages asynchrone (Kafka/RabbitMQ) avec une base de données de stockage permanent.',
    'Oublier de monitorer les rejets d’intégration (messages non délivrés en file morte / Dead Letter Queue).',
    'Transférer des données en production sans valider leur conformité avec un schéma de contrat (XSD ou JSON Schema).'
  ],

  methodTitle: 'Concevoir l’intégration d’une nouvelle application au SI',
  method: [
    '<strong>Identifier les besoins d’échange</strong> : recenser les données à synchroniser, les fréquences et la tolérance à la latence.',
    '<strong>Définir le contrat d’interface</strong> : choisir le format (JSON / XML) et le protocole (REST, SFTP, Webhook).',
    '<strong>Raccorder au bus ESB ou iPaaS</strong> : configurer l’adaptateur sans contact direct point-à-point.',
    '<strong>Mapper vers le format pivot</strong> : implémenter la transformation aller-retour vers le modèle d’entreprise.',
    '<strong>Mettre en place la surveillance</strong> : superviser les files d’attente, les alertes et la Dead Letter Queue.'
  ],

  summary: [
    'L’intégration point-à-point engendre une dette technique massive en architecture spaghetti.',
    'L’ESB (Enterprise Service Bus) normalise le routage, la médiation et la transformation des flux.',
    'Le format pivot évite la démultiplication des connecteurs en instaurant un standard commun.',
    'L’EDI, le XML et le JSON répondent à des contextes d’intégration inter et intra-entreprises variés.',
    'Les plateformes iPaaS permettent d’interconnecter de façon agile l’ERP interne aux applications SaaS Cloud.'
  ],

  checklist: [
    'Je comprends pourquoi l’intégration point-à-point est instable à grande échelle.',
    'Je sais expliquer le rôle et les 4 fonctions clés d’un ESB.',
    'Je maîtrise l’intérêt d’un format de données canonique (pivot).',
    'Je connais les caractéristiques de l’EDI, du XML et du JSON.',
    'Je fais la différence entre une approche ETL et une approche ELT.'
  ],

  notions: ['EAI', 'ESB', 'iPaaS', 'Point-à-Point', 'Architecture Spaghetti', 'Format Pivot', 'EDI', 'XML', 'ETL', 'Dead Letter Queue'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les topologies d’intégration et le rôle d’un bus ESB.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les formats pivots et les fonctions du middleware.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les architectures d’intégration du SI.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux processus métiers et aux grands cycles au chapitre 4.' }
  ],

  flashcards: [
    { q: 'Pourquoi l’architecture spaghetti est-elle dangereuse ?', a: 'Parce que les interfaces point-à-point croisées créent une dépendance forte où toute modification brise les connexions.' },
    { q: 'Qu’est-ce qu’un ESB ?', a: 'Enterprise Service Bus : une dorsale logicielle normalisée qui assure le transport, le routage et la transformation des flux du SI.' },
    { q: 'Quel est le bénéfice d’un modèle de données canonique (Format Pivot) ?', a: 'Il réduit le nombre de transformations nécessaires : chaque application ne traduit son flux que vers le pivot unique.' },
    { q: 'Qu’est-ce qu’une Dead Letter Queue (file de rebut) ?', a: 'Une file d’attente réservée aux messages qui n’ont pas pu être traités ou livrés après plusieurs tentatives.' },
    { q: 'Dans quel secteur l’EDIFACT est-il massivement utilisé ?', a: 'Dans la grande distribution, l’industrie automobile et la logistique internationale.' },
    { q: 'Quelle est la différence d’ordre entre ETL et ELT ?', a: 'ETL transforme les données avant de les charger ; ELT charge les données brutes dans la base cible et les transforme sur place.' }
  ],

  next: {
    href: 'chapitre4.html',
    label: 'Chapitre 4 : Processus métiers & Cycles ERP'
  }
};
