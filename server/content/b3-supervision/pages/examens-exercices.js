/**
 * Pages « examens » et « exercices » du cours « Supervision & Observabilité B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Supervision &amp; Observabilité B3</h1>',
    '  <p class="lead">Deux épreuves académiques complètes d’ingénierie et d’exploitation des systèmes de supervision conformes au cursus Bachelor 3 (IT / RSI) : indicateurs de disponibilité SLA/MTTR/MTBF, architecture SNMP/Syslog, déploiement Zabbix et Nagios, observabilité moderne Prometheus/Grafana, ingestion de logs ELK et automatisation SRE.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Fondements, Protocoles &amp; Supervision Systèmes', [
      '<h4>Partie 1 : Fondements, KPI de Disponibilité &amp; Périmètres (6 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément les concepts de <em>supervision</em>, <em>monitoring</em>, <em>métrologie</em> et <em>audit</em>. Donnez un exemple opérationnel pour chacun. (3 pts)</li>',
      '  <li>Un serveur de base de données fonctionne 720 heures sur un mois. Il subit 3 pannes imprévues d\'une durée respective de 30 minutes, 45 minutes et 15 minutes. Calculez : (a) le MTTR en heures, (b) le MTBF en heures, (c) le taux de disponibilité global en pourcentage. Ce serveur respecte-t-il un SLA contractuel de 99.5% ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Architecture Protocoles SNMP &amp; Syslog (7 points)</h4>',
      '<ol>',
      '  <li>Décrivez le fonctionnement du protocole SNMP. Quelle est la différence fondamentale entre une requête de scrutation (Poller / SNMP Get) et une alerte asynchrone (SNMP Trap / Inform) ? Quels ports UDP sont utilisés ? (3 pts)</li>',
      '  <li>Comparez les niveaux de sécurité entre SNMPv2c et les trois modèles de sécurité de SNMPv3 USM (noAuthNoPriv, authNoPriv, authPriv). Pourquoi SNMPv2c est-il formellement interdit sur un réseau non de confiance ? (2 pts)</li>',
      '  <li>Une sonde de sécurité reçoit un message Syslog RFC 5424 débutant par <code>&lt;134&gt;1</code>. Calculez la valeur numérique de la Facility et de la Severity. À quelle catégorie d\'application et quel niveau de criticité cela correspond-il ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Supervision Systèmes avec Zabbix &amp; Nagios (7 points)</h4>',
      '<ol>',
      '  <li>Expliquez la convention des 4 codes de retour d\'un plugin Nagios standard (0, 1, 2, 3) et décrivez la syntaxe normalisée des données de performance (Perfdata) situées après le caractère <code>|</code>. (3 pts)</li>',
      '  <li>Dans Zabbix, qu\'est-ce qui différencie un <em>Item</em>, un <em>Trigger</em> et une <em>Action</em> ? Rédigez l\'expression d\'un trigger déclenchant une alerte si la charge processeur moyenne sur 5 minutes dépasse 85% et que la dernière valeur mesurée est supérieure à 90%. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Distinctions terminologiques (3 pts) :</strong> ' +
      '  - <em>Supervision :</em> Vue d\'ensemble en temps réel de l\'état de santé du système d\'information avec détection et notification immédiate des pannes (ex: alerte SMS quand un routeur est DOWN). ' +
      '  - <em>Monitoring :</em> Surveillance continue de l\'état de composants spécifiques (processus, ports ouverts, espace disque). ' +
      '  - <em>Métrologie :</em> Collecte, historisation et analyse de métriques quantitatives sur la durée pour le capacity planning (ex: courbes d\'évolution du trafic réseau sur 6 mois). ' +
      '  - <em>Audit :</em> Évaluation ponctuelle de la conformité, de la sécurité ou des configurations à un instant T (ex: audit de conformité PCI-DSS ou scan de vulnérabilités annuel).</li>',
      '  <li><strong>Calculs de disponibilité SLA (3 pts) :</strong> ' +
      '  - Durée totale de panne = 30 + 45 + 15 = 90 minutes = 1.5 heure. ' +
      '  - Temps de fonctionnement effectif (Uptime) = 720 - 1.5 = 718.5 heures. ' +
      '  - (a) <strong>MTTR</strong> = 1.5 h / 3 pannes = <strong>0.5 heure</strong> (30 minutes). ' +
      '  - (b) <strong>MTBF</strong> = 718.5 h / 3 pannes = <strong>239.5 heures</strong>. ' +
      '  - (c) <strong>Disponibilité</strong> = (718.5 / 720) * 100 = <strong>99.7917%</strong>. ' +
      '  - Conclusion : 99.79% &gt;= 99.5%, le SLA contractuel est donc <strong>respecté</strong>.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Fonctionnement SNMP (3 pts) :</strong> ' +
      '  - Le Polling (SNMP Get / GetNext / Walk) est initié par le serveur de supervision vers le port 161/UDP de l\'agent (interrogation synchrone cyclique). ' +
      '  - Le Trap (162/UDP) est une notification asynchrone poussée par l\'équipement sans sollicitation préalable lors d\'un événement critique (ex: lien coupé). L\'Inform (SNMPv2c/v3) exige un accusé de réception applicatif, contrairement au Trap UDP simple.</li>',
      '  <li><strong>Sécurité SNMPv2c vs SNMPv3 (2 pts) :</strong> ' +
      '  - SNMPv2c utilise une chaîne de communauté transmise en clair dans les paquets IP, interceptable par simple écoute passive (sniffing). ' +
      '  - SNMPv3 introduit le modèle USM avec : <code>noAuthNoPriv</code> (pas d\'auth ni chiffrement), <code>authNoPriv</code> (authentification par hachage cryptographique HMAC-SHA/MD5), et <code>authPriv</code> (authentification SHA et chiffrement symétrique AES/DES des charges utiles).</li>',
      '  <li><strong>Décodage Syslog RFC 5424 (2 pts) :</strong> ' +
      '  - PRI = 134. ' +
      '  - Facility = 134 // 8 = <strong>16</strong> (soit <code>local0</code>). ' +
      '  - Severity = 134 % 8 = <strong>6</strong> (soit <code>Informational</code>). ' +
      '  - Message d\'information courante provenant d\'une application locale (ex: serveur web ou reverse proxy).</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Conventions Nagios (3 pts) :</strong> ' +
      '  - Codes retour : <code>0</code> = OK (nominal), <code>1</code> = WARNING (seuil d\'alerte préventif), <code>2</code> = CRITICAL (panne ou seuil d\'arrêt), <code>3</code> = UNKNOWN (erreur de sonde). ' +
      '  - Perfdata : chaîne placée après le séparateur <code>|</code> au format <code>label=valeur[uom];[warn];[crit];[min];[max]</code> (ex: <code>cpu_util=85%;70;90;0;100</code>).</li>',
      '  <li><strong>Architecture Zabbix &amp; Trigger (4 pts) :</strong> ' +
      '  - <em>Item :</em> métrique brute collectée à intervalle régulier. ' +
      '  - <em>Trigger :</em> expression logique booléenne évaluant l\'historique d\'un ou plusieurs items pour déterminer un état (OK vs PROBLEM). ' +
      '  - <em>Action :</em> opération déclenchée lors du changement d\'état du trigger (envoi email, script de remédiation). ' +
      '  - Expression du trigger : <code>avg(/host/system.cpu.load,5m) &gt; 85 and last(/host/system.cpu.load) &gt; 90</code>.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l\'Examen Final — Architecture d\'Observabilité d\'Entreprise &amp; SRE', [
      '<h4>Mise en Situation Opérationnelle</h4>',
      '<p>Une entreprise fintech déploie une infrastructure hybride comprenant 50 serveurs Linux, 12 commutateurs et routeurs, et un cluster Kubernetes hébergeant une plateforme de paiement traitant 500 requêtes par seconde. Vous êtes mandaté comme Ingénieur Supervision &amp; Observabilité pour concevoir et implémenter la nouvelle architecture de surveillance.</p>',
      '<h4>Dossier 1 : Métrologie Prometheus, PromQL &amp; Tableaux de Bord Grafana (6 points)</h4>',
      '<ol>',
      '  <li>Décrivez le modèle de collecte de Prometheus (Pull vs Push). Pourquoi le modèle Pull est-il particulièrement adapté à la scalabilité d\'un cluster Kubernetes ? Dans quelle situation exceptionnelle l\'usage d\'une Pushgateway est-il obligatoire ? (3 pts)</li>',
      '  <li>Écrivez la requête PromQL permettant de calculer le taux d\'erreur HTTP 5xx en pourcentage par rapport au volume total de requêtes sur une fenêtre de 5 minutes, groupé par service applicatif. (3 pts)</li>',
      '</ol>',
      '<h4>Dossier 2 : Centralisation des Logs ELK &amp; Analyse de Débit EPS (7 points)</h4>',
      '<ol>',
      '  <li>Schématisez la chaîne de traitement complète de la suite Elastic (Filebeat, Logstash, Elasticsearch, Kibana). Quel est le rôle précis de Filebeat par rapport à Logstash en termes de consommation mémoire et de filtrage ? (3 pts)</li>',
      '  <li>La plateforme enregistre en régime nominal un débit de 400 événements par seconde (EPS). Lors d\'un incident, le débit chute brutalement à 25 EPS sur les serveurs frontaux. Quelle anomalie (Spike ou Drop) cela caractérise-t-il, et quelles hypothèses techniques formulez-vous ? (4 pts)</li>',
      '</ol>',
      '<h4>Dossier 3 : Stratégies d\'Alerting, Anti-Flapping &amp; Auto-Remédiation SRE (7 points)</h4>',
      '<ol>',
      '  <li>Expliquez le phénomène de *Flapping* d\'un service supervisé. Décrivez l\'algorithme de détection de flapping et la politique de suspension des notifications qu\'il déclenche pour protéger les équipes d\'astreinte. (3 pts)</li>',
      '  <li>Définissez le concept d\'auto-remédiation (*Event-Driven Automation*). Pourquoi est-il impératif d\'intégrer un quota maximal de réessais (max_retries) et un mécanisme d\'escalade humaine dans un moteur d\'exécution automatique de runbooks ? (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Final', [
      '<h4>Corrigé Dossier 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Modèle Prometheus (3 pts) :</strong> ' +
      '  - <em>Modèle Pull :</em> Le serveur Prometheus interroge périodiquement les endpoints HTTP <code>/metrics</code> des cibles découvertes dynamiquement (via Service Discovery Kubernetes). Avantages : détection immédiate si une cible ne répond plus (la sonde sait ce qui devrait être en vie), pas de saturation du collecteur par des agents zélés. ' +
      '  - <em>Pushgateway :</em> Requise exclusivement pour les tâches éphémères (Batch jobs, scripts cron courts) qui s\'exécutent et meurent avant que le cycle de scrap régulier de Prometheus ne puisse les interroger.</li>',
      '  <li><strong>Requête PromQL (3 pts) :</strong> ' +
      '  - <code>sum by (service) (rate(http_requests_total{status=~"5.."}[5m])) / sum by (service) (rate(http_requests_total[5m])) * 100</code>.</li>',
      '</ul>',
      '<h4>Corrigé Dossier 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Chaîne de traitement ELK (3 pts) :</strong> ' +
      '  - <em>Filebeat :</em> Agent ultra-léger (écrit en Go) déployé directement sur chaque machine/conteneur pour collecter les logs sur disque et les transmettre de manière fiable avec contrôle de flux (backpressure). ' +
      '  - <em>Logstash :</em> Moteur centralisé de transformation lourde (parsing grok, enrichissement GeoIP, normalisation). ' +
      '  - <em>Elasticsearch :</em> Moteur de stockage distribué, d\'indexation inversée et de recherche full-text. ' +
      '  - <em>Kibana :</em> Interface de recherche et tableaux de bord d\'exploration visuelle.</li>',
      '  <li><strong>Analyse de débit EPS (4 pts) :</strong> ' +
      '  - Débit nominal = 400 EPS, débit constaté = 25 EPS. ' +
      '  - Déviation = ((25 - 400) / 400) * 100 = <strong>-93.75%</strong>. ' +
      '  - Il s\'agit d\'une anomalie critique de type <strong>LOG_DROP</strong> (chute massive &gt; 80%). ' +
      '  - Hypothèses : écroulement du répartiteur de charge en amont (panne HAProxy/ALB qui ne transmet plus de trafic aux frontaux), coupure réseau du lien d\'accès internet, ou blocage complet des démons Filebeat suite à un disque saturé.</li>',
      '</ul>',
      '<h4>Corrigé Dossier 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Flapping &amp; Anti-Fatigue (3 pts) :</strong> ' +
      '  - Le flapping correspond à l\'oscillation rapide et répétée d\'un service entre OK et CRITICAL. ' +
      '  - Algorithme : calcul du ratio de changements d\'état par rapport au nombre maximal de transitions sur une fenêtre temporelle glissante (ex: &gt; 25%). ' +
      '  - Action : le système bascule le service en état <code>FLAPPING</code> et gèle l\'envoi des alertes individuelles pour n\'émettre qu\'un statut d\'état condensé, évitant la fatigue d\'alerte.</li>',
      '  <li><strong>Auto-Remédiation &amp; Gardez-Fous (4 pts) :</strong> ' +
      '  - L\'auto-remédiation déclenche automatiquement un runbook correctif (ex: redémarrage d\'un démon figé ou purge de cache). ' +
      '  - Le plafonnement des réessais (<code>max_retries</code>, ex: 3 tentatives) est un garde-fou vital : si un service crash en boucle en raison d\'un binaire corrompu ou d\'une base saturée, redémarrer en continu aggrave la panne et consomme les ressources sans résoudre la cause racine. ' +
      '  - Passé le seuil maximal, l\'automatisation doit céder la main et déclencher une alerte prioritaire vers l\'ingénieur d\'astreinte humain.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento technique' }, { href: 'exercices.html', label: 'Consulter les ateliers de code' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs & épreuves corrigées — ' + course.brand,
      description: 'Sujets officiels d\'examens CC et EF avec corrigés types détaillés et barèmes pour le cours Supervision & Observabilité B3.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Ateliers de code' }
  ]);

  const listHtml = chapterList.map(chapitre => [
    '  <h2>Module ' + chapitre.n + ' — ' + chapitre.title + '</h2>',
    '  <p class="lead">' + chapitre.toc + '</p>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <span class="badge">Atelier 1</span>',
    '      <h4>Exercice ' + chapitre.n + '.1</h4>',
    '      <p>Prise en main progressive des notions fondamentales avec entrées/sorties standard et validation unitaire.</p>',
    '      <p><a class="btn" href="chapitre' + chapitre.n + '.html">Ouvrir dans le Chapitre ' + chapitre.n + '</a></p>',
    '    </div>',
    '    <div class="card">',
    '      <span class="badge">Atelier 2</span>',
    '      <h4>Exercice ' + chapitre.n + '.2</h4>',
    '      <p>Mise en pratique approfondie sur un cas d\'ingénierie représentatif d\'un déploiement de production.</p>',
    '      <p><a class="btn" href="chapitre' + chapitre.n + '.html">Ouvrir dans le Chapitre ' + chapitre.n + '</a></p>',
    '    </div>',
    '    <div class="card">',
    '      <span class="badge">Atelier 3</span>',
    '      <h4>Exercice ' + chapitre.n + '.3</h4>',
    '      <p>Défi avancé de niveau examen simulant un scénario complexe d\'automatisation ou d\'analyse de télémétrie.</p>',
    '      <p><a class="btn" href="chapitre' + chapitre.n + '.html">Ouvrir dans le Chapitre ' + chapitre.n + '</a></p>',
    '    </div>',
    '  </div>'
  ].join('\n')).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers de Code Interactifs — Supervision &amp; Observabilité B3</h1>',
    '  <p class="lead">L\'ensemble des 18 ateliers de programmation pratique de manière méthodique intégrés au cours, avec éditeur Monaco, tests automatisés cachés, correction instantanée et aide intelligente du tuteur pédagogique.</p>',
    '',
    listHtml,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens blancs' }, { href: '../atelier.html', label: 'Ouvrir le bac à sable libre' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Inventaire des 18 ateliers de code interactifs Python 3 du cours Supervision & Observabilité B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
