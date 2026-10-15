/**
 * Contenu du cours « Supervision & Observabilité B3 » (dossier `b3-supervision/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-supervision/.
 */
'use strict';

const chapitres = [
  ...require('./b3-supervision/chapitres-1-3'),
  ...require('./b3-supervision/chapitres-4-6')
];

const pages = require('./b3-supervision/pages');

const course = {
  id: 'b3-supervision',
  slug: 'b3-supervision',
  brand: 'Supervision &amp; Observabilité B3',
  brandIcon: 'chart',

  // Palette Teal / Viridian / Deep Emerald conforme WCAG AA/AAA (4.86:1 / 16.4:1 sur fond clair)
  accent: '#0f766e',
  accentDeep: '#042f2e',
  accentSoft: '#f0fdfa',
  accentBorder: '#99f6e4',

  storeKey: 'b3sup:progress',

  title: 'Supervision &amp; Observabilité B3 — Indicateurs de Fiabilité SLA/MTBF/MTTR, Protocoles SNMP &amp; Syslog, Zabbix, Nagios Core, Prometheus, Grafana, Logs ELK &amp; SRE',
  description:
    'Formation d\'excellence en ingénierie de la supervision et de l\'observabilité pour le Bachelor 3 : ' +
    'fondements méthodologiques et distinctions clés (supervision temps réel, monitoring, métrologie de performance, audit ponctuel), cartographie des périmètres (matériel physique IPMI/iDRAC, hyperviseurs, réseau, services protocolaires et applications métiers), indicateurs de fiabilité (MTBF, MTTR, taux de disponibilité contractuelle SLA et modélisation de l\'Error Budget SRE), ' +
    'architectures de supervision centralisées et distribuées (collecteurs, proxies locaux, isolation DMZ), fonctionnement approfondi du protocole SNMP (arborescence MIB-2, identifiants OID, scalaires et tableaux d\'interfaces ifOperStatus/ifInOctets, requêtes synchrones Get/Walk et alertes asynchrones Traps/Informs), sécurité SNMPv3 USM (niveaux noAuthNoPriv, authNoPriv avec hachage SHA, et authPriv avec chiffrement symétrique AES), et normalisation de la journalisation avec Syslog RFC 5424 (calcul de priorité PRI, Facility, Severity et transport sécurisé TLS), ' +
    'supervision des systèmes et réseaux avec Nagios Core et Zabbix Enterprise : développement de sondes et plugins respectant les 4 codes de retour (0 OK, 1 WARNING, 2 CRITICAL, 3 UNKNOWN), format normalisé des données de performance Perfdata pour le traçage graphique, démons NRPE et NSClient++, architecture Zabbix (Server, Database, Frontend Web, Zabbix Proxy, Agent passif port 10050/TCP et Agent actif port 10051/TCP), modélisation par templates réutilisables, déclencheurs intelligents avec fonctions temporelles (avg, last, min, max, nodata) et ordonnancement d\'escalade d\'incidents avec suspension immédiate lors de l\'acquittement (ACK), ' +
    'métrologie moderne et observabilité cloud-native avec Prometheus et Grafana : architecture Pull par scraping HTTP OpenMetrics, découverte dynamique de services (Kubernetes Service Discovery), les 4 types de métriques standards (Counter, Gauge, Histogram, Summary), langage fonctionnel PromQL (dérivées par seconde avec rate et irate, agrégations multidimensionnelles sum by, centiles de latence histogram_quantile), gestion des alertes avec Alertmanager (groupement, règles d\'inhibition causale, mises sous silence) et tableaux de bord interactifs Grafana, ' +
    'centralisation et analyse de journaux à l\'échelle avec la suite Elastic / OpenSearch : agents d\'expédition légers Filebeat avec contrôle de contre-pression (backpressure), pipelines de transformation Logstash avec parsing grok et normalisation ECS (Elastic Common Schema), indexation distribuée dans Elasticsearch (port 9200/TCP) et exploration Kibana (port 5601/TCP), métrologie des flux volumétriques EPS (Events Per Second) pour détecter les inondations (Log Flood) et les pannes silencieuses (Log Drop), et corrélation multi-sources SIEM/SOC pour isoler et mettre en quarantaine les adresses IP suspectes, ' +
    'et enfin stratégies d\'alerting avancées et automatisation SRE : prévention de la fatigue d\'alerte (Alert Fatigue), technique d\'hystérésis des seuils, algorithme mathématique de détection de flapping avec gel temporaire des notifications, Capacity Planning prédictif par régression linéaire pour anticiper la saturation des disques (Go/jour), et auto-remédiation par exécution automatisée de runbooks (redémarrage de services, purge de logs, redimensionnement) avec garde-fous de réessais (max_retries) et escalade vers l\'opérateur humain.',
  lead:
    'Maîtrisez l\'ingénierie de la supervision et de l\'observabilité : métriques de fiabilité SLA/MTBF/MTTR, protocoles SNMPv3 & Syslog RFC 5424, déploiement Zabbix & Nagios, requêtage PromQL, logs ELK et auto-remédiation SRE. ' +
    'Six modules complets, 18 ateliers de programmation interactive en Python 3 et 48 QCM d\'évaluation.',

  sources: 'Supports de cours officiels B3-IT / B3-RSI Supervision Système et Réseaux (Enseignant : Essowaba AHOULOUMI, Ingénieur en Informatique et Réseaux, 2024/2025), Référentiels RFC 1157/1213/3414 (SNMP), RFC 5424 (Syslog), Documentations officielles Prometheus, Grafana, Zabbix et Elastic',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
