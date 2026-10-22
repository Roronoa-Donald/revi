/**
 * server/content/b3-supervision/chapitre1.js — Chapitre 1
 * Fondements de la Supervision, Périmètres & Indicateurs de Fiabilité (SLA, MTBF, MTTR)
 */
'use strict';

module.exports = {
  n: 1,
  title: 'Fondements de la Supervision, Périmètres & Indicateurs de Fiabilité (SLA, MTBF, MTTR)',
  short: 'Fondements & Métriques de Fiabilité',
  toc: 'Distinctions supervision, monitoring, métrologie et audit, périmètres d\'infrastructure, calculs MTBF/MTTR, engagements SLA et Error Budget SRE.',
  time: '≈ 2 h 45',
  free: true,

  situation:
    'Vous intégrez le centre d\'exploitation réseau et système (NOC) d\'une entreprise de services numériques opérant des infrastructures critiques pour le secteur bancaire et hospitalier. ' +
    'Votre première mission consiste à poser le cadre méthodologique de la surveillance : clarifier les rôles entre supervision temps réel, métrologie et audit, ' +
    'cartographier les périmètres matériels et logiciels à surveiller, et mettre en place les tableaux de bord des indicateurs contractuels de fiabilité (MTBF, MTTR, taux de disponibilité et consommation du budget d\'erreur).',

  objectives: [
    'Distinguer avec rigueur les concepts de supervision, monitoring, métrologie et audit informatique.',
    'Délimiter le périmètre de supervision sur les quatre couches : serveurs physiques/virtuels, équipements réseaux, services protocolaires et applications métiers.',
    'Calculer et interpréter les indicateurs de fiabilité et de maintenabilité opérationnelle : MTBF, MTTR et taux de disponibilité globale.',
    'Implémenter le concept moderne de budget d\'erreur (Error Budget) issu des pratiques SRE pour piloter la conformité aux engagements de niveau de service (SLO/SLA).'
  ],

  sections: [
    {
      title: 'Définitions & Distinctions : Supervision, Monitoring, Métrologie & Audit',
      html: [
        '<p>Dans un environnement informatique d\'entreprise, la disponibilité, la performance et la sécurité des infrastructures sont des exigences absolues. Pour piloter efficacement les systèmes, il est fondamental de ne pas confondre les démarches opérationnelles :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Supervision vs Monitoring</h4>',
        '    <ul>',
        '      <li><strong>Supervision (Temps Réel) :</strong> Surveillance continue et proactive de l\'état de santé global du système d\'information dans le but de détecter immédiatement les défaillances, d\'alerter les exploitants et de rétablir le service au plus vite (vision macroscopique et opérationnelle).</li>',
        '      <li><strong>Monitoring (Observation Ciblée) :</strong> Terme général désignant la collecte continue de données sur des composants précis (processus, états de ports, mémoire, temps de réponse) pour suivre leur comportement sans nécessairement générer d\'alerte immédiate.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Métrologie vs Audit</h4>',
        '    <ul>',
        '      <li><strong>Métrologie (Mesure &amp; Tendance) :</strong> Collecte, historisation et analyse statistique de métriques quantitatives (charge CPU, occupation disque, débit réseau en octets/s). Son objectif est la modélisation des tendances et la planification de capacité (<em>Capacity Planning</em>).</li>',
        '      <li><strong>Audit (Évaluation Ponctuelle) :</strong> Examen rétrospectif et méthodique, souvent manuel ou semi-automatisé, visant à vérifier la conformité d\'une architecture aux normes de sécurité (ISO 27001), aux règles de durcissement ou aux critères contractuels à un instant T.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Périmètre Global de la Supervision en Entreprise',
      html: [
        '<p>La supervision moderne couvre l\'ensemble des couches techniques du système d\'information pour garantir une observabilité de bout en bout :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Supervision des Serveurs &amp; Matériels</h4>',
        '    <ul>',
        '      <li><strong>Serveurs physiques :</strong> Température des châssis, état des blocs d\'alimentation redondants, vitesse des ventilateurs, santé des contrôleurs RAID et disques durs via IPMI / iLO / iDRAC.</li>',
        '      <li><strong>Hyperviseurs &amp; VMs :</strong> Charge des hôtes ESXi / Proxmox, état des machines virtuelles, allocations dynamiques vCPU / vRAM et congestion de stockage (I/O wait).</li>',
        '      <li><strong>Systèmes d\'exploitation :</strong> Utilisation CPU, charge moyenne (Load Average 1m/5m/15m), occupation RAM et swap, remplissage des volumes disques et seuils d\'inodes.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Supervision Réseau &amp; Périphériques</h4>',
        '    <ul>',
        '      <li><strong>Équipements actifs :</strong> Routeurs, commutateurs de cœur et de distribution, pare-feux, répartiteurs de charge (load balancers).</li>',
        '      <li><strong>Métriques réseau :</strong> État opérationnel des ports (up/down), débit entrant/sortant (ifInOctets, ifOutOctets), paquets rejetés (discards) et erreurs CRC sur les trames.</li>',
        '      <li><strong>Infrastructures sans fil :</strong> Contrôleurs Wi-Fi, bornes d\'accès (AP), densité de clients associés et interférences radio.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<div class="grid grid-2" style="margin-top: 1rem;">',
        '  <div class="card">',
        '    <h4>3. Supervision des Services Protocolaires</h4>',
        '    <ul>',
        '      <li><strong>Services d\'infrastructure :</strong> Disponibilité et temps de résolution DNS, baux DHCP, synchronisation temporelle NTP, services d\'annuaire LDAP / Active Directory.</li>',
        '      <li><strong>Services de communication :</strong> Serveurs de messagerie (SMTP, IMAP, POP3), passerelles VoIP / SIP, transferts de fichiers (SFTP, FTPS).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>4. Supervision Applicative &amp; Métier</h4>',
        '    <ul>',
        '      <li><strong>Serveurs Web &amp; APIs :</strong> Codes de retour HTTP (taux de 5xx), latence de réponse moyenne et p99, connexions actives (Keep-Alive).</li>',
        '      <li><strong>Bases de données :</strong> Nombre de connexions au pool, requêtes lentes (slow queries), taux de cache hit mémoire et verrous bloquants (locks).</li>',
        '      <li><strong>Parcours utilisateur :</strong> Sondes synthétiques simulant un achat, une authentification ou un virement bancaire pour mesurer la qualité d\'expérience réelle.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Indicateurs de Fiabilité Opérationnelle : SLA, MTBF, MTTR &amp; Error Budget',
      html: [
        '<p>Le pilotage d\'un centre d\'exploitation repose sur des indicateurs mathématiques normalisés :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>MTTR (Maintenabilité)</h4>',
        '    <p><em>Mean Time To Repair</em> : Durée moyenne nécessaire pour diagnostiquer, réparer et restaurer un composant après défaillance :</p>',
        '    <p><code>MTTR = Indisponibilité_totale / Nombre_pannes</code></p>',
        '    <p>Un MTTR faible témoigne d\'une excellente automatisation, d\'outils d\'alerte réactifs et de runbooks efficaces.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>MTBF (Fiabilité)</h4>',
        '    <p><em>Mean Time Between Failures</em> : Temps moyen écoulé entre deux pannes consécutives pendant lequel le système fonctionne normalement :</p>',
        '    <p><code>MTBF = Temps_fonctionnement / Nombre_pannes</code></p>',
        '    <p>Un MTBF élevé reflète la robustesse matérielle et la qualité du dimensionnement de l\'infrastructure.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Disponibilité Globale</h4>',
        '    <p>Taux contractuel de disponibilité opérationnelle rapporté à la période totale d\'observation (ex: 720h sur un mois) :</p>',
        '    <p><code>A = (Uptime / Total_heures) * 100</code></p>',
        '    <p>99.9% ("trois neufs") équivaut à 43.2 minutes d\'indisponibilité max par mois ; 99.99% ("quatre neufs") à seulement 4.32 minutes.</p>',
        '  </div>',
        '</div>',
        '<p style="margin-top: 1rem;">Dans les démarches SRE (*Site Reliability Engineering*), le <strong>Budget d\'Erreur (Error Budget)</strong> formalise l\'indisponibilité tolérée : <code>Budget = Période_minutes * (1 - SLO / 100)</code>. Si le budget est consommé prématurément, les déploiements de nouvelles fonctionnalités sont gelés au profit de la stabilisation de l\'infrastructure.</p>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie & Cadrage de la Supervision',
  method: [
    'Cartographier l\'inventaire des actifs : recenser les équipements physiques, hyperviseurs, conteneurs, services protocolaires et applications métiers.',
    'Qualifier les exigences de disponibilité (SLA) : définir les objectifs SLO par composant et calculer les budgets d\'indisponibilité mensuels (Error Budget).',
    'Déterminer la criticité et l\'impact utilisateur : catégoriser chaque service (P1 à P4) pour adapter les canaux d\'alerte et éviter la submersion du NOC.',
    'Automatiser le suivi des KPI de fiabilité : instrumenter le calcul continu du MTBF et du MTTR pour mesurer l\'efficacité opérationnelle des interventions.'
  ],

  summary: [
    'La supervision assure la surveillance proactive temps réel du SI, tandis que la métrologie historise les tendances quantitatives pour le Capacity Planning.',
    'Le périmètre couvre 4 couches complémentaires : matériel/serveurs, équipements réseaux, services d\'infrastructure et applications métiers.',
    'Le MTTR (Mean Time To Repair) mesure la maintenabilité et la rapidité de rétablissement (Indisponibilité totale / Nombre de pannes).',
    'Le MTBF (Mean Time Between Failures) mesure la fiabilité et le temps moyen de bon fonctionnement continu entre deux pannes (Uptime / Nombre de pannes).',
    'L\'Error Budget quantifie la marge d\'indisponibilité permise par le SLO, servant de régulateur entre rythme de livraison logicielle et stabilité opérationnelle.'
  ],

  checklist: [
    'Savez-vous distinguer avec rigueur supervision, monitoring, métrologie et audit informatique ?',
    'Pouvez-vous calculer le MTTR et le MTBF à partir d\'un journal d\'incidents mensuel ?',
    'Savez-vous convertir un engagement SLA de 99.9% en budget d\'indisponibilité maximal (Error Budget) sur 30 jours ?',
    'Savez-vous prioriser un incident selon la couche technique, la redondance et le nombre d\'utilisateurs impactés ?',
    'Comprenez-vous la règle SRE de gel des déploiements lors de l\'épuisement de l\'Error Budget ?'
  ],

  notions: [
    { term: 'Supervision', def: 'Surveillance proactive en temps réel de l\'état de santé global du SI avec déclenchement d\'alertes immédiates.' },
    { term: 'Métrologie', def: 'Mesure, historisation et analyse quantitative des métriques de performance sur le moyen et long terme.' },
    { term: 'MTTR', def: 'Mean Time To Repair : temps moyen nécessaire pour réparer et remettre en service un composant défaillant.' },
    { term: 'MTBF', def: 'Mean Time Between Failures : temps moyen de fonctionnement effectif entre deux pannes consécutives.' },
    { term: 'SLA', def: 'Service Level Agreement : engagement contractuel définissant le niveau minimal de disponibilité garanti au client.' },
    { term: 'Error Budget', def: 'Marge d\'indisponibilité acceptable allouée par le SLO pour concilier vélocité de déploiement et stabilité.' }
  ],

  pitfalls: [
    'Confondre supervision temps réel et métrologie : la supervision exige une alerte immédiate lors d\'une panne, la métrologie analyse l\'évolution des tendances sur plusieurs semaines.',
    'Calculer le MTBF en divisant par le temps total incluant les pannes au lieu de diviser par le temps effectif de bon fonctionnement (uptime).',
    'Définir des seuils d\'alerte trop bas entraînant des vagues de faux positifs et provoquant une fatigue d\'alerte mortifère pour les équipes d\'astreinte.',
    'Oublier de modéliser les fenêtres de maintenance planifiée dans le calcul contractuel du SLA et du budget d\'erreur.'
  ],

  questions: [
    {
      stem: 'Quelle démarche informatique a pour objet principal la mesure et l\'historisation de données quantitatives en vue du Capacity Planning ?',
      opts: ['L\'audit de conformité', 'La métrologie', 'La supervision réactive', 'Le pentest offensif'],
      correct: 1,
      exp: 'La métrologie collecte et conserve les séries temporelles de performance (CPU, disque, trafic) pour analyser les tendances et dimensionner les évolutions matérielles.'
    },
    {
      stem: 'Sur un mois de 720 heures, un serveur subit 2 pannes de 30 minutes chacune. Quel est son MTTR (Mean Time To Repair) ?',
      opts: ['1.0 heure', '0.5 heure', '359.5 heures', '719.0 heures'],
      correct: 1,
      exp: 'La durée totale d\'indisponibilité est de 60 minutes (1.0 heure). Le MTTR est l\'indisponibilité divisée par le nombre de pannes : 1.0 h / 2 = 0.5 heure (soit 30 minutes).'
    },
    {
      stem: 'Dans le scénario précédent (720 heures totales, 2 pannes totalisant 1 heure), quel est le MTBF (Mean Time Between Failures) ?',
      opts: ['0.5 heure', '359.5 heures', '719.0 heures', '720.0 heures'],
      correct: 1,
      exp: 'Le temps de fonctionnement effectif (uptime) est 720 - 1 = 719 heures. Le MTBF est le temps d\'uptime divisé par le nombre de pannes : 719 / 2 = 359.5 heures.'
    },
    {
      stem: 'Pour une période de 30 jours (43 200 minutes) et un engagement SLA de 99.9%, quel est le budget d\'indisponibilité maximal autorisé (Error Budget) ?',
      opts: ['4.32 minutes', '43.2 minutes', '432 minutes', '14.4 minutes'],
      correct: 1,
      exp: 'Error Budget = 43 200 * (1 - 0.999) = 43 200 * 0.001 = 43.2 minutes sur le mois.'
    },
    {
      stem: 'Parmi les composants suivants, lequel relève typiquement de la supervision des équipements réseaux ?',
      opts: ['Taux d\'inodes occupés sur /var', 'Erreurs de trames CRC et ifOperStatus sur un commutateur', 'Latence de requête SQL sur MySQL', 'Nombre de baux DHCP expirés'],
      correct: 1,
      exp: 'L\'état opérationnel des interfaces (ifOperStatus) et les erreurs CRC sur les paquets sont des métriques fondamentales de la couche réseau.'
    },
    {
      stem: 'Dans la terminologie SRE, quelle action est recommandée lorsque le budget d\'erreur (Error Budget) d\'un service est entièrement consommé avant la fin du mois ?',
      opts: ['Augmenter immédiatement le prix du contrat client', 'Geler temporairement les déploiements de nouvelles fonctionnalités au profit de la fiabilisation', 'Arrêter définitivement le serveur de production', 'Supprimer les sondes de supervision pour masquer les pannes'],
      correct: 1,
      exp: 'Lorsque le budget d\'erreur est épuisé, les équipes gèlent les livraisons applicatives à risque pour concentrer leurs efforts sur la résilience et la correction des bugs d\'infrastructure.'
    },
    {
      stem: 'Que mesure l\'indicateur IPMI / iLO / iDRAC sur un serveur physique ?',
      opts: ['Les requêtes HTTP entrantes', 'L\'état matériel hors-bande (température, alimentations, ventilateurs, disques)', 'Le temps de parsing des requêtes DNS', 'Le nombre de lignes de logs générées par minute'],
      correct: 1,
      exp: 'Ces interfaces d\'administration hors-bande (out-of-band) surveillent directement les composants physiques du serveur, même lorsque le système d\'exploitation est éteint ou planté.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre un audit et une opération de supervision ?',
      opts: ['L\'audit est permanent alors que la supervision est annuelle', 'La supervision est continue en temps réel pour détecter les pannes, alors que l\'audit est ponctuel pour évaluer la conformité', 'La supervision ne concerne que les logiciels libres', 'L\'audit ne s\'applique qu\'au matériel réseau'],
      correct: 1,
      exp: 'La supervision opère en continu 24/7 pour réagir immédiatement aux incidents, tandis que l\'audit est une évaluation planifiée et ponctuelle de conformité.'
    }
  ],

  flashcards: [
      { q: 'Qu’est-ce que « La supervision assure la surveillance proactive temps réel du SI, tandis que la métrologie historise les tendances quantitatives pour le Capacity Planning. » ?', a: 'La supervision assure la surveillance proactive temps réel du SI, tandis que la métrologie historise les tendances quantitatives pour le Capacity Planning.' },
      { q: 'Qu’est-ce que « Le périmètre couvre 4 couches complémentaires » ?', a: "Le périmètre couvre 4 couches complémentaires : matériel/serveurs, équipements réseaux, services d'infrastructure et applications métiers." },
      { q: 'Qu’est-ce que « MIB » ?', a: 'MIB : Management Information Base : base de données arborescente décrivant les variables gérées par un agent SNMP.' },
      { q: 'Qu’est-ce que « Syslog RFC 5424 » ?', a: 'Syslog RFC 5424 : Norme universelle de journalisation horodatée encodant la source (Facility) et la gravité (Severity) dans un en-tête PRI.' },
      { q: "Qu’est-ce que « SNMP (Simple Network Management Protocol) standardise la scrutation périodique (UDP 161) et la réception asynchrone d'alertes traps (UDP 162). » ?", a: "SNMP (Simple Network Management Protocol) standardise la scrutation périodique (UDP 161) et la réception asynchrone d'alertes traps (UDP 162)." },
      { q: "Qu’est-ce que « L'arbre MIB (Management Information Base) et les OID hiérarchiques structurent l'ensemble des métriques d'un composant système ou réseau. » ?", a: "L'arbre MIB (Management Information Base) et les OID hiérarchiques structurent l'ensemble des métriques d'un composant système ou réseau." },
      { q: 'Qu’est-ce que « Nagios Core » ?', a: "Nagios Core : Moteur de supervision modulaire exécutant des plugins autonomes vérifiant l'état des services et des hôtes." },
      { q: 'Qu’est-ce que « Trigger Zabbix » ?', a: "Trigger Zabbix : Expression logique booléenne calculée à partir de fonctions temporelles pour qualifier l'état d'un service." },
      { q: "Qu’est-ce que « L'écosystème Nagios repose sur une architecture modulaire de plugins vérifiant ponctuellement l'état des services et machines. » ?", a: "L'écosystème Nagios repose sur une architecture modulaire de plugins vérifiant ponctuellement l'état des services et machines." },
      { q: 'Qu’est-ce que « OpenMetrics » ?', a: "OpenMetrics : Format texte universel d'exposition de métriques adopté par Prometheus et standardisé par l'IETF." },
      { q: 'Qu’est-ce que « Prometheus repose sur un modèle de collecte active par tirage (Pull HTTP), enregistrant les métriques dans une base de données temporelle (TSDB). » ?', a: 'Prometheus repose sur un modèle de collecte active par tirage (Pull HTTP), enregistrant les métriques dans une base de données temporelle (TSDB).' },
      { q: 'Qu’est-ce que « Les types fondamentaux sont les Counters (monotones croissants), les Gauges (valeurs fluctuantes), les Histograms (répartition en buckets) et les Summaries. » ?', a: 'Les types fondamentaux sont les Counters (monotones croissants), les Gauges (valeurs fluctuantes), les Histograms (répartition en buckets) et les Summaries.' },
      { q: 'Qu’est-ce que « SIEM » ?', a: 'SIEM : Security Information and Event Management : système de centralisation et corrélation temps réel des événements de sécurité.' },
      { q: "Qu’est-ce que « La stack Elastic (Elasticsearch, Logstash, Kibana, Beats) constitue le standard de l'industrie pour la centralisation, le parsing et l'analyse de logs massifs. » ?", a: "La stack Elastic (Elasticsearch, Logstash, Kibana, Beats) constitue le standard de l'industrie pour la centralisation, le parsing et l'analyse de logs massifs." },
      { q: "Qu’est-ce que « Filebeat assure une collecte locale économe en ressources avec maintien d'un registre d'offset disque pour garantir l'absence de perte de données. » ?", a: "Filebeat assure une collecte locale économe en ressources avec maintien d'un registre d'offset disque pour garantir l'absence de perte de données." },
      { q: "Qu’est-ce que « La fatigue d'alerte est l'ennemi n°1 de l'astreinte » ?", a: "La fatigue d'alerte est l'ennemi n°1 de l'astreinte : un flot excessif d'alertes non actionnables conduit inévitablement à ignorer les incidents critiques réels." },
      { q: "Qu’est-ce que « L'hystérésis et la détection d'état battant (flapping) suppriment les notifications en rafale issues d'oscillations légères autour des seuils. » ?", a: "L'hystérésis et la détection d'état battant (flapping) suppriment les notifications en rafale issues d'oscillations légères autour des seuils." },
    {
      q: 'Quelle est la définition de la supervision informatique ?',
      a: 'Surveillance proactive en temps réel du bon fonctionnement du SI pour détecter et alerter immédiatement en cas de panne.'
    },
    {
      q: 'Qu\'est-ce que le MTTR et comment se calcule-t-il ?',
      a: 'Mean Time To Repair : temps moyen de réparation = Indisponibilité totale / Nombre de pannes.'
    },
    {
      q: 'Qu\'est-ce que le MTBF et comment se calcule-t-il ?',
      a: 'Mean Time Between Failures : temps moyen entre pannes = Temps de fonctionnement effectif / Nombre de pannes.'
    },
    {
      q: 'À quoi correspond un SLA à 99.9% sur un mois de 30 jours ?',
      a: 'À une indisponibilité maximale autorisée de 43.2 minutes (Error Budget).'
    },
    {
      q: 'Quelle est la différence entre monitoring et métrologie ?',
      a: 'Le monitoring surveille l\'état ponctuel des composants, la métrologie mesure et historise les données pour analyser les tendances à long terme.'
    },
    {
      q: 'Que représente le budget d\'erreur (Error Budget) en SRE ?',
      a: 'La marge d\'indisponibilité permise par le SLO, servant de régulateur entre rythme de déploiement et stabilité opérationnelle.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions de MTBF/MTTR et distinctions de base incertaines. Relisez les définitions et refaites le QCM.' },
    { cls: 'mid', text: 'Score 60-74 % : Principes assimilés. Approfondissez les calculs d\'Error Budget et les périmètres d\'infrastructure.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Entraînez-vous à calculer MTTR et MTBF dans les ateliers de code.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez les KPI de disponibilité et les règles de qualification d\'incidents.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte. Prêt pour l\'étude des protocoles SNMP et Syslog du Module 2 !' }
  ]
};
