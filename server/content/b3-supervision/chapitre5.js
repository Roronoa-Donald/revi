/**
 * server/content/b3-supervision/chapitre5.js — Chapitre 5
 * Gestion des Journaux & Logs Centralisés, Détection d'Anomalies & SIEM (ELK/EFK)
 */
'use strict';

module.exports = {
  n: 5,
  title: 'Gestion des Journaux & Logs Centralisés, Détection d\'Anomalies & SIEM (ELK/EFK)',
  short: 'Logs Centralisés & SIEM',
  toc: 'Pipeline Filebeat, Logstash, Elasticsearch et Kibana, parsing grok, surveillance de débit EPS (Spike & Drop) et corrélation multi-sources d\'incidents.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'L\'équipe sécurité (SOC) et les exploitants système constatent des difficultés à identifier l\'origine des incidents complexes sur les 50 serveurs de l\'entreprise : ' +
    'les journaux sont dispersés sur chaque machine, formatés de manière hétérogène et écrasés par la rotation locale des fichiers. ' +
    'Vous êtes mandaté pour déployer un pipeline centralisé d\'ingestion et d\'analyse de logs : ' +
    'configurer des agents légers Filebeat, concevoir des filtres Logstash pour normaliser les logs applicatifs et web en JSON structuré, ' +
    'surveiller en temps réel le débit d\'événements (EPS) pour repérer les pannes silencieuses ou les inondations, ' +
    'et corréler les traces multi-équipements pour isoler et mettre en quarantaine les comportements hostiles.',

  objectives: [
    'Concevoir et déployer un pipeline complet de collecte de logs avec la suite Elastic (Filebeat, Logstash, Elasticsearch, Kibana) ou OpenSearch.',
    'Analyser et structurer des journaux texte bruts (Apache, Nginx, Syslog) en documents JSON normalisés via des filtres et motifs grok.',
    'Surveiller la métrologie des flux de logs en calculant le taux d\'événements par seconde (EPS) pour détecter les anomalies de type Spike et Drop.',
    'Corréler des événements multi-sources (pare-feu, reverse proxy, serveur d\'authentification) pour reconstituer la chronologie d\'un incident de sécurité.'
  ],

  sections: [
    {
      title: 'L\'Architecture de Centralisation des Journaux : Filebeat, Logstash &amp; Elasticsearch',
      html: [
        '<p>La centralisation des logs répond à trois impératifs : conformité légale de rétention, audit de sécurité après compromission et diagnostic rapide en production :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Collecte : Filebeat</h4>',
        '    <p>Agent de transport ultra-léger développé en Go, déployé sur chaque nœud pour lire les fichiers journaux locaux sur disque (<code>/var/log/*</code>).</p>',
        '    <p>Filebeat intègre la gestion de contre-pression (<em>backpressure</em>) : si le serveur central est saturé, Filebeat ralentit sa lecture sans saturer la mémoire.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Traitement : Logstash</h4>',
        '    <p>Moteur d\'ingestion et de transformation lourde fonctionnant en pipeline à 3 étapes :</p>',
        '    <ul>',
        '      <li><strong>Inputs :</strong> Écoute Beats (port 5044/TCP), Syslog (514), Kafka.</li>',
        '      <li><strong>Filters :</strong> Découpage grok, parsing JSON, normalisation de dates et enrichissement GeoIP.</li>',
        '      <li><strong>Outputs :</strong> Indexation vers Elasticsearch (port 9200/TCP).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Indexation : Elasticsearch</h4>',
        '    <p>Moteur d\'indexation inversée distribué basé sur Apache Lucene :</p>',
        '    <p>Organise les documents en index découpés en fragments (<em>shards</em>) répliqués sur un cluster pour garantir tolérance aux pannes et recherche textuelle instantanée.</p>',
        '    <p>Visualisation via l\'interface <strong>Kibana</strong> (port 5601/TCP).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Normalisation des Logs &amp; Parsing Grok',
      html: [
        '<p>Un log texte non structuré est inexploitable pour les agrégations statistiques et les requêtes analytiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Du Texte Brut au Document JSON</h4>',
        '    <p>Soit une ligne de log web au format Apache/Nginx Combined :</p>',
        '    <pre><code>192.168.1.10 - - [11/Oct/2026:14:32:10 +0000] "GET /api/v1/users HTTP/1.1" 500 2314 "-" "curl/7.88.1"</code></pre>',
        '    <p>Après application du filtre grok, elle devient un document structuré indexé avec des types de données stricts :</p>',
        '    <ul>',
        '      <li><code>client_ip</code> : type <code>ip</code> pour géolocalisation et filtrage CIDR.</li>',
        '      <li><code>status_code</code> : type <code>integer</code> permettant de calculer le taux d\'erreurs HTTP 4xx et 5xx.</li>',
        '      <li><code>response_bytes</code> : type <code>long</code> pour mesurer la bande passante consommée.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Standardisation ECS (Elastic Common Schema)</h4>',
        '    <p>Pour corréler des logs provenant de serveurs Windows, d\'équipements Cisco et de conteneurs Linux, il est impératif d\'unifier le nommage des champs grâce au schéma standard ECS :</p>',
        '    <ul>',
        '      <li><code>source.ip</code> pour l\'adresse IP cliente.</li>',
        '      <li><code>http.response.status_code</code> pour le code HTTP.</li>',
        '      <li><code>event.dataset</code> pour classifier la source applicative.</li>',
        '      <li><code>@timestamp</code> normalisé en UTC selon la norme ISO 8601.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Métrologie des Flux de Logs (EPS) &amp; Détection d\'Incidents SIEM',
      html: [
        '<p>La télémétrie du volume d\'événements est une sonde de surveillance opérationnelle majeure :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Analyse de Débit EPS (Events Per Second)</h4>',
        '    <p>Surveiller l\'EPS moyen par rapport à une base de référence (<em>Baseline</em>) permet de détecter deux types de crises majeures :</p>',
        '    <ul>',
        '      <li><strong>Log Flood (Spike, &gt; +200%) :</strong> Inondation anormale de journaux provoquée par une attaque par déni de service, une boucle infinie de code générant des exceptions en cascade ou un brute-force massif.</li>',
        '      <li><strong>Log Drop (Chute, &lt; -80%) :</strong> Silence anormal signalant qu\'un équipement critique a crashé, qu\'un agent Filebeat est bloqué ou qu\'un lien réseau est interrompu.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Corrélation Multi-Sources d\'Incidents</h4>',
        '    <p>Un attaquant ou une panne transverse laisse des empreintes dispersées dans plusieurs journaux :</p>',
        '    <ol>',
        '      <li>Le pare-feu enregistre des scans de ports depuis l\'IP suspecte.</li>',
        '      <li>Le reverse proxy Nginx enregistre des dizaines de requêtes 401 Unauthorized sur <code>/auth/login</code>.</li>',
        '      <li>Le démon SSH consigne de multiples échecs de connexion root.</li>',
        '    </ol>',
        '    <p>En corrélant ces événements par adresse IP sur une fenêtre temporelle restreinte, le SIEM isole automatiquement la menace et applique une règle de quarantaine dynamique.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie : Centralisation & Analyse de Logs (ELK)',
  method: [
    'Déployer des expéditeurs légers (Beats) : installer Filebeat sur les serveurs cibles avec contrôle de débit (backpressure) et acheminement chiffré vers Logstash ou Elasticsearch.',
    'Structurer et enrichir les journaux : construire des filtres Logstash ou Ingest Node avec motifs grok, conversions de types, géolocalisation IP et normalisation UTC.',
    'Dimensionner le stockage et l\'indexation Elasticsearch : configurer les Index Lifecycle Management (ILM) avec politiques de rétention, rollovers et tiers chauds/froids.',
    'Implémenter la détection d\'anomalies et la corrélation SIEM : surveiller les débits EPS (spikes et drops) et croiser les sources (Nginx, SSH, pare-feu) pour neutraliser les cyberattaques.'
  ],

  summary: [
    'La stack Elastic (Elasticsearch, Logstash, Kibana, Beats) constitue le standard de l\'industrie pour la centralisation, le parsing et l\'analyse de logs massifs.',
    'Filebeat assure une collecte locale économe en ressources avec maintien d\'un registre d\'offset disque pour garantir l\'absence de perte de données.',
    'Le parsing grok transforme les flux de texte brut (ex: format Combined Nginx/Apache) en documents JSON typés et interrogeables en quasi temps réel.',
    'La volumétrie EPS (Events Per Second) reflète la dynamique opérationnelle : un pic signale une attaque ou une boucle d\'erreurs, une chute indique une panne réseau ou le crash d\'un service.',
    'La corrélation multi-sources est l\'atout maître du SIEM pour regrouper les indices faibles disséminés entre pare-feux, serveurs web et systèmes d\'authentification.'
  ],

  checklist: [
    'Savez-vous justifier le découplage entre l\'agent léger Filebeat et le moteur de transformation Logstash ?',
    'Pouvez-vous écrire une expression régulière grok pour extraire IP, verbe, URL et statut HTTP d\'une ligne de log ?',
    'Comprenez-vous pourquoi une chute brutale du débit EPS (Log Drop) est aussi critique qu\'un pic d\'erreurs ?',
    'Comment fonctionne la corrélation multi-sources par adresse IP ou identifiant de session au sein d\'un SIEM ?',
    'Quelles sont les bonnes pratiques de cycle de vie (ILM) pour éviter la saturation disque d\'un cluster Elasticsearch ?'
  ],

  notions: [
    { term: 'Filebeat', def: 'Agent léger en langage Go dédié à la lecture des fichiers de logs sur disque et à leur transmission sécurisée.' },
    { term: 'Logstash', def: 'Moteur d\'ingestion et de transformation de données exécutant des pipelines de filtrage, parsing grok et enrichissement.' },
    { term: 'Elasticsearch', def: 'Moteur de recherche et d\'indexation distribué de documents JSON structurés basé sur Apache Lucene.' },
    { term: 'Kibana', def: 'Interface utilisateur graphique pour explorer, requêter et visualiser les données stockées dans Elasticsearch.' },
    { term: 'EPS', def: 'Events Per Second : débit volumétrique mesurant le nombre de lignes d\'événements ingérées par seconde.' },
    { term: 'SIEM', def: 'Security Information and Event Management : système de centralisation et corrélation temps réel des événements de sécurité.' }
  ],

  pitfalls: [
    'Déployer Logstash directement sur tous les serveurs clients à la place de Filebeat : Logstash consomme une JVM lourde et monopolise les ressources applicatives.',
    'Ne pas indexer les timestamps dans un format UTC normalisé (ISO 8601), ce qui rend impossible la corrélation chronologique entre serveurs situés sur des fuseaux différents.',
    'Négliger la rotation et la purge des index anciens dans Elasticsearch, conduisant à la saturation complète des disques et au gel du cluster.',
    'Ignorer les chutes brutales d\'EPS (Log Drop) : un silence radio dans les logs est souvent le signe d\'une panne majeure non détectée.'
  ],

  questions: [
    {
      stem: 'Quel est l\'avantage principal de Filebeat par rapport à Logstash pour la collecte de journaux sur les serveurs applicatifs ?',
      opts: ['Filebeat est une application Java lourde', 'Filebeat est un binaire autonome léger écrit en Go qui consomme très peu de CPU et de mémoire RAM', 'Filebeat remplace la base Elasticsearch', 'Filebeat ne fonctionne que sous Windows'],
      correct: 1,
      exp: 'Filebeat a été spécialement conçu pour être un expéditeur ultra-léger (Go) qui n\'impacte pas les performances des serveurs hébergeant les applications métiers.'
    },
    {
      stem: 'Sur quel port TCP par défaut l\'API REST d\'Elasticsearch écoute-t-elle les requêtes d\'indexation et de recherche ?',
      opts: ['Port 5601', 'Port 9200', 'Port 5044', 'Port 9090'],
      correct: 1,
      exp: 'Elasticsearch écoute sur le port 9200/TCP pour son API REST HTTP. Le port 5601 est Kibana, le 5044 le port d\'écoute Beats de Logstash.'
    },
    {
      stem: 'Dans la terminologie Logstash, que désigne un filtre « grok » ?',
      opts: ['Un protocole de routage réseau', 'Une bibliothèque de motifs d\'expressions régulières nommées permettant de découper du texte brut en champs JSON structurés', 'Un algorithme de chiffrement asymétrique', 'Un outil de compression zip'],
      correct: 1,
      exp: 'Grok permet d\'associer des motifs regex réutilisables (ex: %{IP:client_ip}) pour transformer facilement des lignes de logs brutes en documents JSON.'
    },
    {
      stem: 'Si un cluster de logs fonctionnant habituellement à 500 EPS subit une chute brutale à 10 EPS sur un service critique, comment qualifie-t-on cette anomalie ?',
      opts: ['Log Flood', 'Log Drop', 'Normal Drift', 'Capacity Spike'],
      correct: 1,
      exp: 'Une chute massive de débit sous la baseline normale est un Log Drop, indiquant fréquemment un arrêt inopiné du service émetteur ou une rupture de connectivité.'
    },
    {
      stem: 'Quel port TCP Kibana utilise-t-il par défaut pour son interface web d\'administration et de tableaux de bord ?',
      opts: ['Port 9200', 'Port 5601', 'Port 3000', 'Port 8080'],
      correct: 1,
      exp: 'Kibana est accessible sur le port 5601/TCP par défaut.'
    },
    {
      stem: 'Que signifie le concept de « backpressure » implémenté dans Filebeat ?',
      opts: ['L\'arrêt complet du serveur Linux', 'La capacité de l\'agent à ralentir la lecture des logs si le collecteur Logstash ou Elasticsearch est saturé, évitant ainsi tout débordement mémoire', 'Le chiffrement des disques durs', 'L\'inversion des flux réseau'],
      correct: 1,
      exp: 'Le contrôle de contre-pression permet à Filebeat d\'adapter son rythme d\'émission à la capacité d\'ingestion en aval sans perdre d\'événements.'
    },
    {
      stem: 'Pourquoi est-il nécessaire d\'utiliser un schéma commun comme l\'ECS (Elastic Common Schema) lors de l\'ingestion de logs provenant de sources hétérogènes ?',
      opts: ['Pour rendre les logs illisibles aux attaquants', 'Pour standardiser les noms de champs (ex: client_ip vs src_ip) et permettre des corrélations transversales dans le SIEM', 'Pour économiser les adresses IPv4', 'Pour désactiver le pare-feu'],
      correct: 1,
      exp: 'Si chaque équipement nomme différemment l\'adresse IP source (src_ip, client, host_ip, remote_addr), il est impossible d\'exécuter une requête corrélée unique.'
    },
    {
      stem: 'Dans un SIEM, quel critère permet de relier chronologiquement une attaque par injection SQL sur un serveur web à une création suspecte de compte administrateur sur une machine Linux ?',
      opts: ['Le numéro de série de l\'ordinateur', 'L\'adresse IP source commune et l\'horodatage précis sur une fenêtre temporelle courte', 'Le nom du système d\'exploitation', 'La taille du fichier de log'],
      correct: 1,
      exp: 'La corrélation spatio-temporelle repose sur des identifiants partagés (adresse IP, trace_id, identifiant utilisateur) et une synchronisation d\'horloge rigoureuse (NTP).'
    }
  ],

  flashcards: [
    {
      q: 'Quels sont les rôles respectifs de Filebeat, Logstash, Elasticsearch et Kibana ?',
      a: 'Filebeat collecte les fichiers ; Logstash parse et filtre ; Elasticsearch stocke et indexe ; Kibana visualise.'
    },
    {
      q: 'Sur quels ports écoutent Elasticsearch et Kibana ?',
      a: 'Elasticsearch : 9200/TCP (API REST) ; Kibana : 5601/TCP (Interface web).'
    },
    {
      q: 'Qu\'est-ce que le filtre grok dans Logstash ?',
      a: 'Un analyseur syntaxique basé sur des motifs regex prédéfinis pour transformer du texte non structuré en JSON.'
    },
    {
      q: 'Qu\'indique une anomalie de type Log Drop ?',
      a: 'Une chute brutale du volume d\'événements par seconde (EPS), signalant souvent un crash de service ou une coupure réseau.'
    },
    {
      q: 'À quoi sert le contrôle de backpressure dans Filebeat ?',
      a: 'À réguler le débit de collecte selon la charge du serveur récepteur pour éviter de saturer la mémoire.'
    },
    {
      q: 'Pourquoi la synchronisation temporelle NTP est-elle vitale pour la corrélation de logs ?',
      a: 'Pour garantir que l\'ordre chronologique des événements issus de serveurs différents soit parfaitement exact.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Composants ELK et analyse de logs incertains. Révisez le rôle de Filebeat et Logstash.' },
    { cls: 'mid', text: 'Score 60-74 % : Architecture comprise. Approfondissez les expressions grok et la détection d\'anomalies EPS.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Entraînez-vous à parser et corréler des flux de logs dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau opérationnel solide. Vous maîtrisez le pipeline de logs et la corrélation de sécurité SIEM.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte. Prêt pour les stratégies d\'alerting et l\'auto-remédiation du Module 6 !' }
  ]
};
