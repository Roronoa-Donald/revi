/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Supervision & Observabilité B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const cardsHtml = chapterList.map(chapitre => [
    '    <article class="card">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '        <span class="card__num">Module ' + chapitre.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '      <p class="card__desc">' + chapitre.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        <span class="card__link">Étudier le module ' + ic('arrow-right') + '</span>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    '  <header class="hero">',
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('chart') + ' Niveau B3 • Supervision Système &amp; Réseau, SNMP, Zabbix, Nagios, Prometheus, Grafana, Logs ELK &amp; SRE</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Supervision &amp; Études de Cas</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules d\'ingénierie</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs d\'architecture</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>La Supervision &amp; l\'Observabilité en Bachelor 3</h2>',
    box('standard', 'De la Détection Proactive des Pannes à l\'Observabilité Moderne et l\'Auto-Remédiation', [
      '<p>En troisième année de Bachelor en Ingénierie des Systèmes et Réseaux, la supervision des infrastructures et des services applicatifs est un pilier de la gouvernance informatique. Dans un écosystème où la haute disponibilité et la qualité de service (SLA) sont des exigences critiques, l\'administrateur système ne peut plus attendre qu\'un utilisateur signale une panne pour intervenir.</p>',
      '<p>Conçu en conformité rigoureuse avec les cours officiels de M. Essowaba AHOULOUMI (Ingénieur en Informatique et Réseaux, Collège de Paris) et les standards industriels ITIL / DevOps / SRE, ce cours couvre l\'intégralité du cycle de surveillance : ' +
      'des principes fondamentaux et de la distinction essentielle entre supervision temps réel, monitoring, métrologie et audit, ' +
      'des protocoles universels de collecte (SNMP v1/v2c/v3 avec MIB et OID, Syslog RFC 5424 et décodage de priorité), ' +
      'des plateformes d\'entreprise Zabbix et Nagios (plugins, perfdata, déclencheurs intelligents et matrices d\'escalade), ' +
      'de la métrologie moderne par séries temporelles avec Prometheus, Alertmanager et tableaux de bord Grafana, ' +
      'de la centralisation et corrélation des journaux avec la suite ELK / OpenSearch (Filebeat, Logstash, détection d\'anomalies EPS et SIEM), ' +
      'et enfin des stratégies avancées d\'alerting (filtrage anti-flapping, capacity planning par régression linéaire et exécution automatisée de runbooks d\'auto-remédiation).'
    ]),
    '',
    '  <h2>Outils et Méthodes Étudiés</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h4>' + ic('server') + ' Zabbix &amp; Nagios Core</h4>',
    '      <p>Agents passifs et actifs, sondes NRPE, parsing de perfdata normalisé, triggers avec fonctions statistiques et gestion des acquittements.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('activity') + ' Prometheus &amp; Grafana</h4>',
    '      <p>Modèle pull OpenMetrics, requêtage vectoriel PromQL (rate, sum by), gestion des règles d\'inhibition Alertmanager et visualisation interactive.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('shield') + ' Logs ELK &amp; SRE</h4>',
    '      <p>Ingestion Filebeat/Logstash, détection de pics/chutes de débit EPS, corrélation multi-sources d\'incidents et budget d\'erreur (Error Budget).</p>',
    '    </div>',
    '  </div>',
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Accueil — ' + course.brand,
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const crumbs = crumb(course, [{ label: 'Accueil', href: 'index.html' }, { label: 'Sommaire général' }]);

  const rows = chapterList.map(chapitre => [
    '    <li class="summary-item">',
    '      <div class="summary-item__num">' + chapitre.n + '</div>',
    '      <div class="summary-item__content">',
    '        <h3 class="summary-item__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p class="summary-item__desc">' + chapitre.toc + '</p>',
    '      </div>',
    '      <div class="summary-item__meta">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3') + '</span>',
    '        <span class="summary-item__time">' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '      </div>',
    '    </li>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <header class="section-head">',
    '    <h1>Sommaire Général du Cours</h1>',
    '    <p class="section-head__lead">Parcours complet d\'ingénierie en 6 modules : des fondations méthodologiques aux architectures de supervision distribuées et cloud-native.</p>',
    '  </header>',
    '',
    '  <ol class="summary-list">' + rows + '</ol>',
    '',
    '  <h2>Ressources et modules transverses</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4><a href="atelier.html">' + ic('terminal') + ' Atelier de Code Interactif</a></h4>',
    '      <p>Atelier d’analyse interactif pour prototyper vos algorithmes de calcul SLA, filtres PromQL, décodeurs SNMP et parseurs de logs.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4><a href="chapitres/cartes.html">' + ic('layers') + ' Cartes Mémoire &amp; Flashcards</a></h4>',
    '      <p>36 flashcards de révision active couvrant protocoles, OIDs MIB-2, codes retour Nagios et syntaxe PromQL.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4><a href="chapitres/formules.html">' + ic('book') + ' Mémento &amp; Fiches Synthèses</a></h4>',
    '      <p>Formules mathématiques de fiabilité (MTBF, MTTR, SLA), ports standards et commandes de référence.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4><a href="chapitres/examens.html">' + ic('award') + ' Examens Blancs &amp; Projets</a></h4>',
    '      <p>Deux sujets d\'examen complets (Contrôle Continu et Examen Final) avec corrigés détaillés et barèmes officiels.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'index.html', label: 'Retour à l\'accueil' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire du cours — ' + course.brand,
      description: 'Table des matières détaillée des 6 modules de supervision système et réseaux.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const crumbs = crumb(course, [{ label: 'Accueil', href: 'index.html' }, { label: 'Sommaire', href: 'sommaire.html' }, { label: 'Atelier d’analyse' }]);

  const defaultCode = `# Grille d’analyse libre — Supervision Réseau & Systèmes
# Métriques SNMP, sondes de disponibilité et seuils d'alerte

[Cas 1 — Surveillance d'infrastructure de production]
METRIQUE_CPU: 88% (SEUIL_ALERTE: 85%)
STATUT_SONDE: WARNING
ACTION_AUTOMATISEE: Déclenchement d'un ticket d'incident et notification astreinte
NOTE: Supervision proactive des équipements critiques opérationnelle.
`;

  const body = [
    crumbs,
    '  <header class="section-head">',
    '    <h1>Atelier de Code Interactif — Supervision &amp; Observabilité</h1>',
    '    <p class="section-head__lead">Expérimentez librement vos algorithmes de calcul SLA/SLO, de décodage SNMP, de requêtage PromQL et de parsing de logs selon les grilles d’analyse.</p>',
    '  </header>',
    '',
    '  <div class="lab"',
    '       data-lab',
    '       data-exercise-id="atelier-sup3"',
    '       data-language="analyse"',
    '       data-height="420"',
    '       data-stdin="CHECK_SERVICE srv-web01:80\nSNMPGET 192.168.1.1 1.3.6.1.2.1.1.3.0\nPROMQL rate(http_requests_total[5m])">',
    '    <script type="text/plain" data-lab-starter># Grille d’analyse libre — b3-supervision\n# Zone d’étude et d’application méthodologique\n\n[Cas 1 — Étude préliminaire]\nANALYSE: CONFORME\nNOTE: Validation des prérequis et des critères méthodologiques.\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulateur de Budget d\'Erreur SRE</h4>',
    '      <p>Modélisez la vitesse de consommation de votre Error Budget sur une fenêtre glissante de 30 jours à 99.9% de SLA.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Parseur de Trames Syslog RFC 5424</h4>',
    '      <p>Décodez automatiquement la priorité PRI en Facility et Severity pour catégoriser les flux d\'alertes réseau.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier d’analyse interactif — ' + course.brand,
      description: 'Console interactive Python 3 pour concevoir et tester des algorithmes de supervision, métrologie et observabilité.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
