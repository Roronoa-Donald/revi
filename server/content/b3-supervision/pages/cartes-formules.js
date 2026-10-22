/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Supervision & Observabilité B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Supervision &amp; Observabilité B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux de la supervision système et réseaux : Fondations et distinctions (supervision, monitoring, métrologie, audit), Protocoles de collecte (SNMP v1/v2c/v3, MIB-2, Syslog RFC 5424), Supervision avec Zabbix et Nagios (plugins, perfdata, déclencheurs et escalades), Métrologie Prometheus et requêtage PromQL (rate, sum by, Alertmanager), Centralisation des logs ELK/EFK (Logstash, détection d\'anomalies EPS, corrélation SIEM), et Stratégies d\'alerting (filtrage anti-flapping, capacity planning par régression linéaire et runbooks d\'auto-remédiation).</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Supervision & Observabilité B3 : Fondements, SNMP, Zabbix, Nagios, Prometheus, Grafana, Logs ELK et SRE.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento Technique &amp; Guide Opérationnel — Supervision &amp; Observabilité B3</h1>',
    '  <p class="lead">Synthèse condensée des formules de fiabilité opérationnelle, ports standards de supervision, OIDs MIB-2 fondamentaux, conventions de sortie Nagios, syntaxe PromQL et calculs Syslog RFC 5424.</p>',
    '',
    '  <h2>1. Formules Mathématiques de Disponibilité &amp; SRE</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Indicateur</th><th>Formule Mathématique</th><th>Définition Opérationnelle</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>MTTR</strong> (Mean Time To Repair)</td><td><code>Indisponibilité_totale / Nb_pannes</code></td><td>Temps moyen nécessaire pour restaurer un service défaillant.</td></tr>',
    '      <tr><td><strong>MTBF</strong> (Mean Time Between Failures)</td><td><code>Temps_fonctionnement / Nb_pannes</code></td><td>Temps moyen de bon fonctionnement continu entre deux pannes.</td></tr>',
    '      <tr><td><strong>Disponibilité A (%)</strong></td><td><code>(Uptime / Total_heures) * 100</code></td><td>Pourcentage effectif de fonctionnement sur la période observée.</td></tr>',
    '      <tr><td><strong>Error Budget (minutes)</strong></td><td><code>Période_minutes * (1 - SLO / 100)</code></td><td>Marge d\'indisponibilité autorisée avant rupture d\'engagement de service.</td></tr>',
    '      <tr><td><strong>Pente Linéaire Capacity</strong></td><td><code>a = Σ(x - x̄)(y - ȳ) / Σ(x - x̄)²</code></td><td>Vitesse journalière d\'accroissement de la ressource (Go/jour).</td></tr>',
    '      <tr><td><strong>Taux d\'Oscillation Flapping</strong></td><td><code>(Transitions / (N - 1)) * 100</code></td><td>Fréquence de basculements d\'état sur une fenêtre glissante.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Protocoles &amp; Ports Standards de Supervision</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Service / Outil</th><th>Port &amp; Protocole</th><th>Rôle et Sens de Communication</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>SNMP (Poll / Get)</strong></td><td><code>161 / UDP</code></td><td>Requêtes du serveur de supervision vers l\'agent (interrogation active).</td></tr>',
    '      <tr><td><strong>SNMP Traps / Informs</strong></td><td><code>162 / UDP</code></td><td>Alertes spontanées émises par l\'équipement vers le serveur collecteur.</td></tr>',
    '      <tr><td><strong>Syslog RFC 5424</strong></td><td><code>514 / UDP (ou TCP/TLS 6514)</code></td><td>Envoi de journaux d\'événements réseau et système vers le collecteur.</td></tr>',
    '      <tr><td><strong>Nagios NRPE</strong></td><td><code>5666 / TCP</code></td><td>Nagios Remote Plugin Executor (exécution de sondes distantes).</td></tr>',
    '      <tr><td><strong>Zabbix Agent</strong></td><td><code>10050 / TCP</code></td><td>Agent passif (écoute les requêtes du Zabbix Server/Proxy).</td></tr>',
    '      <tr><td><strong>Zabbix Server / Trapper</strong></td><td><code>10051 / TCP</code></td><td>Écoute les agents actifs et récepteurs de traps SNMP.</td></tr>',
    '      <tr><td><strong>Prometheus Server</strong></td><td><code>9090 / TCP</code></td><td>Interface web et moteur TSDB de Prometheus.</td></tr>',
    '      <tr><td><strong>Node Exporter</strong></td><td><code>9100 / TCP</code></td><td>Exposition des métriques système Linux au format OpenMetrics (scraping pull).</td></tr>',
    '      <tr><td><strong>Alertmanager</strong></td><td><code>9093 / TCP</code></td><td>Routage, déduplication et notification des alertes Prometheus.</td></tr>',
    '      <tr><td><strong>Grafana</strong></td><td><code>3000 / TCP</code></td><td>Portail web de visualisation et tableaux de bord interactifs.</td></tr>',
    '      <tr><td><strong>Elasticsearch / OpenSearch</strong></td><td><code>9200 / TCP</code></td><td>API REST d\'indexation et de recherche de logs JSON.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Répertoire des OIDs Standards MIB-2 (RFC 1213)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>OID Numérique</th><th>Nom Symbolique</th><th>Type ASN.1</th><th>Description Opérationnelle</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>1.3.6.1.2.1.1.1.0</code></td><td><code>sysDescr</code></td><td>DisplayString</td><td>Description textuelle de l\'équipement (OS, version, matériel).</td></tr>',
    '      <tr><td><code>1.3.6.1.2.1.1.3.0</code></td><td><code>sysUpTime</code></td><td>TimeTicks</td><td>Temps écoulé depuis le dernier démarrage (centièmes de seconde).</td></tr>',
    '      <tr><td><code>1.3.6.1.2.1.1.5.0</code></td><td><code>sysName</code></td><td>DisplayString</td><td>Nom d\'hôte (FQDN) configuré sur l\'équipement réseau.</td></tr>',
    '      <tr><td><code>1.3.6.1.2.1.2.2.1.2.&lt;i&gt;</code></td><td><code>ifDescr</code></td><td>DisplayString</td><td>Nom de l\'interface réseau physique ou virtuelle (ex: eth0, Gi0/1).</td></tr>',
    '      <tr><td><code>1.3.6.1.2.1.2.2.1.8.&lt;i&gt;</code></td><td><code>ifOperStatus</code></td><td>Integer</td><td>État opérationnel de l\'interface : <code>1</code>=up, <code>2</code>=down, <code>3</code>=testing.</td></tr>',
    '      <tr><td><code>1.3.6.1.2.1.2.2.1.10.&lt;i&gt;</code></td><td><code>ifInOctets</code></td><td>Counter32</td><td>Nombre total d\'octets reçus sur l\'interface depuis le boot.</td></tr>',
    '      <tr><td><code>1.3.6.1.2.1.2.2.1.16.&lt;i&gt;</code></td><td><code>ifOutOctets</code></td><td>Counter32</td><td>Nombre total d\'octets émis sur l\'interface depuis le boot.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Codes de Retour &amp; Format Perfdata Nagios</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Code</th><th>Statut</th><th>Couleur Standard</th><th>Signification Opérationnelle</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>0</code></td><td><strong>OK</strong></td><td>Vert</td><td>Le service fonctionne normalement dans les plages nominales.</td></tr>',
    '      <tr><td><code>1</code></td><td><strong>WARNING</strong></td><td>Jaune</td><td>Seuil d\'attention franchi mais le service reste opérationnel.</td></tr>',
    '      <tr><td><code>2</code></td><td><strong>CRITICAL</strong></td><td>Rouge</td><td>Panne avérée ou saturation immédiate nécessitant une intervention.</td></tr>',
    '      <tr><td><code>3</code></td><td><strong>UNKNOWN</strong></td><td>Orange / Gris</td><td>Erreur d\'exécution du plugin, timeout ou sonde inaccessible.</td></tr>',
    '    </tbody>',
    '  </table>',
    '  <p>Format de sortie standard d\'un plugin :</p>',
    '  <pre><code>TEXT OUTPUT DU PLUGIN | \'label\'=valeur[UOM];[warn];[crit];[min];[max]</code></pre>',
    '',
    '  <h2>5. Formules et Fonctions Clés PromQL (Prometheus)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Expression PromQL</th><th>Rôle et Fonctionnement</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>rate(v[5m])</code></td><td>Calculez le taux d\'accroissement moyen par seconde sur 5 minutes (pour les compteurs <code>counter</code>).</td></tr>',
    '      <tr><td><code>irate(v[2m])</code></td><td>Taux instantané par seconde basé sur les deux derniers points de mesure (détection des pics volatils).</td></tr>',
    '      <tr><td><code>sum by (job, status) (rate(http_requests_total[5m]))</code></td><td>Agrège les requêtes par seconde en regroupant par service et code de statut HTTP.</td></tr>',
    '      <tr><td><code>histogram_quantile(0.95, sum(rate(http_latency_bucket[5m])) by (le))</code></td><td>Calculez le 95e centile (p95) du temps de réponse applicatif en secondes.</td></tr>',
    '      <tr><td><code>predict_linear(node_filesystem_free_bytes[4h], 86400 * 30) &lt; 0</code></td><td>Prédit par extrapolation linéaire si l\'espace disque sera épuisé d\'ici 30 jours.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>6. Encodage Syslog RFC 5424</h2>',
    '  <p>La priorité Syslog combine la source (Facility) et le niveau de gravité (Severity) :</p>',
    '  <pre><code>PRI = Facility * 8 + Severity\nFacility = PRI // 8\nSeverity = PRI % 8</code></pre>',
    '  <table class="table">',
    '    <thead><tr><th>Sévérité</th><th>Nom</th><th>Description</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>0</code></td><td>Emergency</td><td>Système complètement inutilisable (panique totale).</td></tr>',
    '      <tr><td><code>1</code></td><td>Alert</td><td>Action corrective immédiate requise.</td></tr>',
    '      <tr><td><code>2</code></td><td>Critical</td><td>Condition critique (panne matérielle imminente).</td></tr>',
    '      <tr><td><code>3</code></td><td>Error</td><td>Condition d\'erreur applicative ou système.</td></tr>',
    '      <tr><td><code>4</code></td><td>Warning</td><td>Avertissement sur un risque potentiel.</td></tr>',
    '      <tr><td><code>5</code></td><td>Notice</td><td>Événement normal mais significatif.</td></tr>',
    '      <tr><td><code>6</code></td><td>Informational</td><td>Message informatif d\'exploitation courante.</td></tr>',
    '      <tr><td><code>7</code></td><td>Debug</td><td>Messages détaillés de débogage pour les développeurs.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Consulter les cartes flashcards' }, { href: 'examens.html', label: 'Voir les sujets d\'examen' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Formules & mémento — ' + course.brand,
      description: 'Mémento technique du cours Supervision & Observabilité B3 : Formules MTTR/MTBF, ports, OIDs MIB-2, Nagios perfdata, PromQL et RFC 5424.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
