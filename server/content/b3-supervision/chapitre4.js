/**
 * server/content/b3-supervision/chapitre4.js — Chapitre 4
 * Métrologie & Observabilité Moderne avec Prometheus & Grafana
 */
'use strict';

module.exports = {
  n: 4,
  title: 'Métrologie & Observabilité Moderne avec Prometheus & Grafana',
  short: 'Prometheus & Grafana',
  toc: 'Base de séries temporelles (TSDB), format OpenMetrics, métriques Counter/Gauge, requêtage PromQL (rate, sum by), Alertmanager et dashboards Grafana.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Votre entreprise modernise son infrastructure en migrant vers des architectures conteneurisées microservices sous Docker et Kubernetes. ' +
    'Les outils de supervision classiques peinent à suivre le cycle de vie éphémère des conteneurs. ' +
    'Votre mission consiste à déployer une stack d\'observabilité cloud-native basée sur Prometheus et Grafana : ' +
    'structurer l\'exposition des métriques au format OpenMetrics, maîtriser le requêtage multidimensionnel PromQL, ' +
    'configurer Alertmanager avec déduplication, inhibition et mise sous silence, et construire des tableaux de bord Grafana à forte valeur ajoutée.',

  objectives: [
    'Comprendre le modèle de données temporel (TSDB) et l\'architecture Pull de Prometheus (Scraping HTTP, Service Discovery).',
    'Identifier et manipuler les 4 types de métriques standards : Counter, Gauge, Histogram et Summary.',
    'Maîtriser le langage de requêtage PromQL : sélection vectorielle, dérivées temporelles avec rate() et irate(), et agrégations sum by().',
    'Configurer et router les alertes via Alertmanager (Grouping, Inhibit Rules, Silences) et créer des visualisations dynamiques sous Grafana.'
  ],

  sections: [
    {
      title: 'L\'Architecture Prometheus &amp; le Modèle de Données Séries Temporelles (TSDB)',
      html: [
        '<p>Conçu à l\'origine par SoundCloud et hébergé par la Cloud Native Computing Foundation (CNCF), <strong>Prometheus</strong> s\'est imposé comme le standard de facto de la métrologie moderne pour les environnements dynamiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Modèle de Collecte « Pull »</h4>',
        '    <ul>',
        '      <li><strong>Scraping HTTP :</strong> Prometheus interroge périodiquement les cibles sur leur point de terminaison HTTP (généralement <code>/metrics</code>).</li>',
        '      <li><strong>Découverte dynamique (Service Discovery) :</strong> Prometheus dialogue avec les API (Kubernetes, AWS EC2, Consul) pour découvrir automatiquement les nouvelles instances sans reconfiguration manuelle.</li>',
        '      <li><strong>Détection d\'état native :</strong> Si une cible ne répond pas lors du scrap, Prometheus génère immédiatement la métrique <code>up == 0</code>.</li>',
        '      <li><strong>Pushgateway :</strong> Utilisée exceptionnellement pour les scripts batchs ou jobs cron éphémères qui se terminent avant le passage du scraper.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Structure d\'une Série Temporelle</h4>',
        '    <p>Une série temporelle dans Prometheus est une suite de paires <code>(timestamp, valeur_flottante)</code> identifiée par :</p>',
        '    <p><code>nom_metrique{label1="valeur1", label2="valeur2"}</code></p>',
        '    <p>Cette multidimensionnalité permet de filtrer et d\'agréger les métriques selon n\'importe quelle dimension métier (service, environnement, code de statut, région).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les 4 Types de Métriques &amp; le Format d\'Exposition OpenMetrics',
      html: [
        '<p>Chaque métrique exposée par un exportateur (ex: <code>node_exporter</code> sur le port 9100/TCP) appartient à un type précis :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Counter (Compteur Cumulatif)</h4>',
        '    <p>Valeur numérique qui ne peut <strong>que croître ou être remise à zéro</strong> lors d\'un redémarrage du processus. Utilisé pour mesurer un volume d\'événements (ex: nombre total de requêtes HTTP servies, octets transmis).</p>',
        '    <p>On ne lit jamais directement la valeur absolue d\'un compteur : on calcule son taux de variation par seconde via la fonction <code>rate()</code>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Gauge (Jauge Instantanée)</h4>',
        '    <p>Valeur numérique qui peut <strong>augmenter ou diminuer</strong> arbitrairement au cours du temps. Représente l\'état instantané d\'une ressource (ex: mémoire vive libre, température CPU, nombre de goroutines ou threads actifs).</p>',
        '  </div>',
        '</div>',
        '<div class="grid grid-2" style="margin-top: 1rem;">',
        '  <div class="card">',
        '    <h4>3. Histogram</h4>',
        '    <p>Échantillonne des observations (typiquement des durées de requêtes en secondes ou tailles de réponses) et les classe dans des intervalles configurables (<em>buckets</em> délimités par le label <code>le</code> : less than or equal).</p>',
        '    <p>Permet le calcul précis des centiles (ex: p95, p99) via <code>histogram_quantile()</code>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>4. Summary</h4>',
        '    <p>Calcule directement des quantiles configurables côté client (sur l\'application elle-même) ainsi qu\'un compteur et une somme totale. Plus léger pour Prometheus mais impossible à agréger entre plusieurs instances d\'un même service.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'PromQL, Alertmanager &amp; Tableaux de Bord Grafana',
      html: [
        '<p>La puissance de la stack réside dans son langage de requêtage et son découplage d\'alerting :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Langage PromQL</h4>',
        '    <ul>',
        '      <li><strong>Vecteur instantané vs de plage :</strong> <code>http_requests_total</code> (dernière valeur) vs <code>http_requests_total[5m]</code> (série des 5 dernières minutes).</li>',
        '      <li><strong>Calcul de dérivée :</strong> <code>rate(http_requests_total[5m])</code> calcule les requêtes par seconde en gérant automatiquement les resets de compteurs.</li>',
        '      <li><strong>Agrégations groupées :</strong> <code>sum by (status) (rate(http_requests_total[5m]))</code> pour obtenir le débit par code HTTP.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Alertmanager &amp; Grafana</h4>',
        '    <ul>',
        '      <li><strong>Alertmanager (port 9093/TCP) :</strong> Reçoit les alertes de Prometheus, élimine les doublons, applique les règles d\'inhibition (si <code>NodeDown</code>, inhiber <code>HighCPU</code> sur le même hôte) et gère les silences.</li>',
        '      <li><strong>Grafana (port 3000/TCP) :</strong> Portail de visualisation universel connecté à la TSDB Prometheus. Permet de créer des panels riches avec variables dynamiques, alertes visuelles et annotations.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie : Prometheus, PromQL & Grafana',
  method: [
    'Exposer les métriques au format OpenMetrics : instrumenter les applications avec les types Counter, Gauge, Histogram et Summary exposés sur un endpoint HTTP /metrics.',
    'Contrôler la cardinalité des labels : bannir formellement les identifiants uniques à haute cardinalité (user_id, IP, UUID) pour préserver la mémoire de la TSDB.',
    'Construire des requêtes PromQL résilientes : combiner rate(), sum by() et histogram_quantile() pour calculer avec précision débits, taux d\'erreur et centiles de latence.',
    'Ordonnancer l\'alerting avec Alertmanager : configurer le groupement (group_by, group_wait), l\'inhibition et le routage des notifications par sévérité et environnement.'
  ],

  summary: [
    'Prometheus repose sur un modèle de collecte active par tirage (Pull HTTP), enregistrant les métriques dans une base de données temporelle (TSDB).',
    'Les types fondamentaux sont les Counters (monotones croissants), les Gauges (valeurs fluctuantes), les Histograms (répartition en buckets) et les Summaries.',
    'PromQL offre une expressivité algébrique avancée pour filtrer, agréger par étiquettes et dériver des taux de requêtes par seconde via rate().',
    'Grafana constitue la couche universelle de visualisation et de dashboards pour unifier métriques, logs et traces applicatives.',
    'Alertmanager découple la génération des alertes de leur acheminement, gérant le dédoublonnage, le regroupement et l\'atténuation des tempêtes de notifications.'
  ],

  checklist: [
    'Comprenez-vous la différence fondamentale entre les modèles de collecte Pull (Prometheus) et Push ?',
    'Savez-vous choisir judicieusement entre un Counter et une Gauge pour une métrique donnée ?',
    'Pourquoi ne faut-il jamais appliquer rate() sur une Gauge ?',
    'Savez-vous écrire une requête PromQL calculant le taux d\'erreur 5xx par service sur 5 minutes ?',
    'Comment les paramètres group_by, group_wait et repeat_interval d\'Alertmanager préviennent-ils la saturation des canaux d\'astreinte ?'
  ],

  notions: [
    { term: 'Prometheus', def: 'Système open source de métrologie et d\'alerting basé sur une base de données de séries temporelles multidimensionnelle.' },
    { term: 'OpenMetrics', def: 'Format texte universel d\'exposition de métriques adopté par Prometheus et standardisé par l\'IETF.' },
    { term: 'Counter', def: 'Métrique cumulative monotone croissante réinitialisée uniquement lors du redémarrage du composant.' },
    { term: 'Gauge', def: 'Métrique instantanée mesurant une valeur flottante pouvant fluctuer librement à la hausse ou à la baisse.' },
    { term: 'PromQL', def: 'Prometheus Query Language : langage fonctionnel permettant de filtrer, transformer et agréger les séries temporelles.' },
    { term: 'Alertmanager', def: 'Composant dédié au traitement, regroupement, inhibition et routage des alertes générées par Prometheus.' }
  ],

  pitfalls: [
    'Appliquer la fonction rate() sur une Gauge : rate() est mathématiquement réservée aux compteurs monotones Counter.',
    'Utiliser des labels avec une cardinalité non bornée (ex: user_id, email, UUID de requête) : cela fait exploser la mémoire vive de la TSDB (Time-Series Database churn).',
    'Oublier d\'utiliser sum() avant d\'appliquer histogram_quantile() sur plusieurs instances, faussant complètement le calcul des centiles.',
    'Utiliser la Pushgateway pour contourner le modèle Pull sur des applications standards : la Pushgateway transforme Prometheus en goulet d\'étranglement sans détection d\'inactivité.'
  ],

  questions: [
    {
      stem: 'Quel type de métrique Prometheus doit obligatoirement être utilisé pour compter le nombre total de requêtes HTTP traitées par une API web ?',
      opts: ['Gauge', 'Counter', 'Histogram', 'Summary'],
      correct: 1,
      exp: 'Un volume cumulé d\'événements qui ne fait qu\'augmenter au cours du temps doit toujours être modélisé sous la forme d\'un Counter.'
    },
    {
      stem: 'Pourquoi est-il formellement interdit d\'inclure un identifiant d\'utilisateur unique (ex: user_id) dans les labels d\'une métrique Prometheus ?',
      opts: ['Car Prometheus ne supporte que les chiffres', 'Car cela génère une cardinalité explosive créant des millions de séries temporelles distinctes et sature la mémoire (RAM)', 'Car cela empêche les alertes par email', 'Car la loi RGPD interdit les métriques'],
      correct: 1,
      exp: 'Chaque combinaison unique de labels crée une nouvelle série temporelle en mémoire vive. Une cardinalité infinie sature rapidement la base TSDB de Prometheus.'
    },
    {
      stem: 'Quelle fonction PromQL calcule le taux moyen d\'accroissement par seconde d\'un compteur sur une fenêtre de 5 minutes ?',
      opts: ['avg(http_requests_total[5m])', 'rate(http_requests_total[5m])', 'increase(http_requests_total)', 'delta(http_requests_total)'],
      correct: 1,
      exp: 'La fonction rate() calcule la dérivée par seconde d\'un compteur en tenant compte des éventuels redémarrages (resets) du processus.'
    },
    {
      stem: 'Sur quel port TCP standard l\'exportateur système Node Exporter expose-t-il les métriques matérielles d\'une machine Linux ?',
      opts: ['Port 9090', 'Port 9100', 'Port 9093', 'Port 3000'],
      correct: 1,
      exp: 'Node Exporter écoute sur le port 9100/TCP. Le port 9090 est le serveur Prometheus, le 9093 Alertmanager et le 3000 Grafana.'
    },
    {
      stem: 'Dans Alertmanager, quel mécanisme permet de bloquer automatiquement une alerte « HighCpuLoad » lorsqu\'une alerte « HostDown » est déjà active sur le même serveur ?',
      opts: ['Le silence temporaire (Silence)', 'La règle d\'inhibition (Inhibit Rule)', 'Le groupement d\'alertes (Grouping)', 'L\'escalade SMTP'],
      correct: 1,
      exp: 'Les règles d\'inhibition (Inhibit Rules) suppriment les alertes secondaires lorsque l\'alerte racine (ex: panne totale de l\'hôte) est déjà déclenchée sur la même étiquette.'
    },
    {
      stem: 'Pour quel cas d\'usage spécifique l\'outil Prometheus Pushgateway a-t-il été conçu ?',
      opts: ['Pour superviser les bases de données SQL relationnelles', 'Pour collecter les métriques de jobs batchs ou scripts éphémères qui se terminent trop vite pour être scrapés', 'Pour afficher des graphiques dans un navigateur', 'Pour remplacer l\'agent Zabbix'],
      correct: 1,
      exp: 'La Pushgateway reçoit les métriques poussées par des scripts batchs courts (cron jobs) avant leur extinction, et les garde en mémoire pour le scraper Prometheus.'
    },
    {
      stem: 'Quelle fonction PromQL permet de calculer le 95e centile (p95) de la latence d\'une application à partir d\'un Histogramme ?',
      opts: ['p95(http_request_duration_seconds)', 'histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))', 'rate(http_request_duration_seconds[95m])', 'quantile_95(http_request_duration_seconds)'],
      correct: 1,
      exp: 'histogram_quantile() calcule les centiles à partir des compteurs de buckets cumulatifs (identifiés par l\'étiquette le).'
    },
    {
      stem: 'Quel protocole de transport et quel format de sérialisation sont utilisés nativement par Prometheus pour scraper les métriques ?',
      opts: ['SNMP en UDP', 'Requêtes HTTP GET avec données au format texte OpenMetrics', 'Connexion SSH avec commandes bash', 'WebSockets binaires'],
      correct: 1,
      exp: 'Prometheus effectue des requêtes HTTP GET standard vers l\'URL /metrics et parse le flux textuel structuré conforme au format OpenMetrics.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre Counter et Gauge dans Prometheus ?',
      a: 'Un Counter ne fait que croître (sauf reset) ; une Gauge peut monter et descendre librement pour refléter une valeur instantanée.'
    },
    {
      q: 'Que fait la fonction PromQL rate(v[5m]) ?',
      a: 'Elle calcule le taux d\'accroissement moyen par seconde d\'un compteur sur 5 minutes en compensant les réinitialisations.'
    },
    {
      q: 'Sur quels ports écoutent Prometheus, Node Exporter, Alertmanager et Grafana ?',
      a: 'Prometheus : 9090/TCP ; Node Exporter : 9100/TCP ; Alertmanager : 9093/TCP ; Grafana : 3000/TCP.'
    },
    {
      q: 'Pourquoi une trop forte cardinalité de labels est-elle dangereuse pour Prometheus ?',
      a: 'Car chaque combinaison unique de labels crée une nouvelle série temporelle qui consomme de la mémoire vive (RAM).'
    },
    {
      q: 'À quoi servent les règles d\'inhibition dans Alertmanager ?',
      a: 'À masquer les alertes secondaires lorsqu\'une alerte source causale plus grave (ex: NodeDown) est déjà active.'
    },
    {
      q: 'Quelle fonction PromQL permet d\'estimer le p99 d\'une latence ?',
      a: 'histogram_quantile(0.99, sum(rate(metric_bucket[5m])) by (le)).'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions PromQL et types de métriques à revoir. Étudiez la différence entre Counter et Gauge.' },
    { cls: 'mid', text: 'Score 60-74 % : Bases de l\'écosystème Prometheus comprises. Approfondissez les calculs rate() et les règles Alertmanager.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Entraînez-vous à requêter PromQL et manipuler les métriques dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez le modèle TSDB et la conception de dashboards Grafana performants.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte. Prêt pour l\'ingestion et l\'analyse des logs avec la suite ELK du Module 5 !' }
  ]
};
