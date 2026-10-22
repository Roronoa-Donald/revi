/**
 * Chapitre 3 du cours « Document Technique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Architecture &amp; Documentation Système (DAT &amp; DEX)',
  short: 'Architecture DAT &amp; DEX',
  toc: 'Dossier d’Architecture Technique (DAT), Dossier d’Exploitation (DEX / Runbook), ordonnancement de services, métriques de résilience RTO/RPO et procédures PRA.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Lorsqu’un incident majeur survient à 3 heures du matin un jour férié, le technicien d’astreinte ne doit ni improviser ni deviner l’ordre d’extinction d’une base de données ou la procédure de bascule d’un cluster de serveurs. Dans les systèmes d’information d’envergure, deux documents constituent les pierres angulaires de la gouvernance opérationnelle : le Dossier d’Architecture Technique (DAT), qui décrit la topologie complète et statique des infrastructures, et le Dossier d’Exploitation (DEX ou Runbook), qui consigne les modes opératoires précis, les consignes d’ordonnancement, les politiques de sauvegarde et les engagements contractuels de résilience (RTO et RPO). L’ingénieur de Bachelor 3 doit maîtriser la rédaction et l’audit de ces deux documents capitaux.',
  objectives: [
    'concevoir un Dossier d’Architecture Technique (DAT) exhaustif : topologie, dimensionnement, adressage IP et sécurité ;',
    'rédiger un Dossier d’Exploitation (DEX / Runbook) opérationnel et directement actionnable par les équipes d’astreinte ;',
    'formaliser les procédures d’arrêt et de démarrage ordonnancé selon le graphe de dépendances des services ;',
    'auditer la conformité des procédures de sauvegarde et de restauration face aux objectifs RTO et RPO ;',
    'modéliser les étapes chronologiques d’une procédure de bascule de secours dans un Plan de Reprise d’Activité (PRA) ;',
    'analyser et résoudre méthodologiquement des analyseurs d’objectifs RTO/RPO, des ordonnanceurs de runbooks et des simulateurs de bascule PRA.'
  ],
  sections: [
    {
      title: 'Le Dossier d’Architecture Technique (DAT) : La Cartographie Globale',
      html: [
        '<p>Le <strong>Dossier d’Architecture Technique (DAT)</strong> est le document de référence décrivant la constitution matérielle, logicielle et réseau d’un système d’information. Il répond aux besoins des architectes, des équipes d’infrastructure, des auditeurs de conformité et du Responsable de la Sécurité des Systèmes d’Information (RSSI).</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Topologie d’Infrastructure</h4>',
        '    <p>Inventaire des serveurs physiques, machines virtuelles, clusters de conteneurs (Kubernetes), sous-réseaux (VLAN/VPC), répartiteurs de charge (Load Balancers) et passerelles de bordure.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Plan d’Adressage &amp; Flux</h4>',
        '    <p>Cartographie complète de l’adressage IP (plages CIDR), segmentation des zones réseau (DMZ, zone applicative, zone données sécurisée) et flux de communication inter-composants.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Dimensionnement &amp; Redondance</h4>',
        '    <p>Spécifications des ressources CPU, RAM, disques (IOPS, RAID), mécanismes de haute disponibilité active/passive ou active/active et répartition multi-zones de disponibilité (Multi-AZ).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Le Dossier d’Exploitation (DEX / Runbook) : Le Guide Opérationnel',
      html: [
        '<p>Si le DAT décrit l’infrastructure dans son état statique, le <strong>Dossier d’Exploitation (DEX)</strong> consigne son fonctionnement dynamique au quotidien. C’est le document de chevet des équipes d’exploitation, des ingénieurs SRE et des équipes d’astreinte :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Contenu Obligatoire d’un DEX</h4>',
        '    <ul>',
        '      <li><strong>Démarrage et Arrêt ordonnancé :</strong> Procédure séquentielle exacte pour éteindre ou relancer la plateforme sans corrompre les données.</li>',
        '      <li><strong>Politique de Sauvegarde :</strong> Fréquence des snapshots et dumps, rétention (politique GFS : Grandfather-Father-Son) et procédures de test de restauration.</li>',
        '      <li><strong>Surveillance &amp; Métriques :</strong> Seuils d’alertes Prometheus/Zabbix, dashboards Grafana et actions réflexes en cas de dépassement.</li>',
        '      <li><strong>Gestion des Certificats TLS :</strong> Emplacement des magasins de certificats, autorités de certification (AC) et procédure de renouvellement avant expiration.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>L’Ordonnancement des Services</h4>',
        '    <p>L’ordre des étapes est critique :</p>',
        '    <ul>',
        '      <li><strong>Au Démarrage (amont vers aval) :</strong> Stockage &rarr; Bases de données &rarr; Caches (Redis) &rarr; Back-end applicatif &rarr; Passerelle Ingress.</li>',
        '      <li><strong>À l’Arrêt (aval vers amont) :</strong> Couper l’Ingress pour stopper les nouveaux utilisateurs &rarr; Laisser terminer les requêtes en cours &rarr; Éteindre le back-end &rarr; Couper les caches &rarr; Clore proprement les bases de données.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Plans de Continuité et de Reprise : La Métrologie RTO &amp; RPO',
      html: [
        '<p>Tout Dossier d’Exploitation de niveau professionnel doit formaliser les engagements contractuels de résilience face aux désastres majeurs (PCA : Plan de Continuité d’Activité, PRA : Plan de Reprise d’Activité) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>RTO (Recovery Time Objective)</h4>',
        '    <p>Le <strong>Temps Maximal d’Interruption Admissible</strong> : la durée écoulée entre le déclenchement de l’incident et le rétablissement opérationnel du service.</p>',
        '    $$RTO = T_{retablissement} - T_{sinistre}$$',
        '    <p>Si votre contrat impose un RTO de 30 minutes, toute procédure de restauration qui prend 45 minutes constitue une faute contractuelle majeure.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>RPO (Recovery Point Objective)</h4>',
        '    <p>La <strong>Perte Maximale de Données Tolérée</strong> : la durée maximale acceptable de données non sauvegardées détruites par le sinistre.</p>',
        '    $$RPO = T_{sinistre} - T_{derniere\\_sauvegarde}$$',
        '    <p>Une sauvegarde quotidienne effectuée une fois par nuit à 02h00 induit un RPO maximal théorique de 24 heures (toutes les transactions enregistrées depuis 02h01 sont perdues).</p>',
        '  </div>',
        '</div>',
        box('tip', 'Le Déroulement d’une Bascule de Secours (PRA Failover)', [
          '<p>Une procédure de bascule vers le site de secours comprend 4 étapes chronologiques incompressibles : 1. Détection de panne par monitoring (ex. 30s) &rarr; 2. Décision humaine ou arbitrage quorum (ex. 60s) &rarr; 3. Bascule réseau DNS/IP (ex. 120s) &rarr; 4. Vérification d’intégrité et ouverture du service (ex. 30s). La somme de ces temps doit impérativement demeurer inférieure au RTO garanti.</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],
  methodTitle: 'Démarche de Structuration et de Rédaction d’un Dossier d’Exploitation',
  method: [
    'Consigner les métadonnées opérationnelles : contacts d’astreinte, matrice d’escalade et liens vers les dashboards.',
    'Établir l’arbre de dépendance des services pour définir l’ordre strict de démarrage et d’extinction ordonnancée.',
    'Rédiger des fiches de tâches autonomes pour chaque routine : sauvegarde, rotation de logs, purge de base, renouvellement TLS.',
    'Chiffrer et confronter les procédures de restauration aux seuils contractuels de RTO et de RPO.',
    'Détailler le protocole de bascule PRA étape par étape avec les commandes shell exactes et les scripts de retour arrière.',
    'Mettre à l’épreuve le DEX lors d’exercices de crise réels (Game Days) pour corriger les consignes obsolètes.'
  ],
  summary: [
    'Le DAT présente l’architecture statique (serveurs, réseau, briques logicielles) pour les concepteurs et le RSSI.',
    'Le DEX (Runbook) consigne les modes opératoires quotidiens et d’astreinte pour les équipes d’exploitation.',
    'L’ordonnancement d’infrastructure suit l’ordre direct des dépendances au démarrage et l’ordre inverse à l’extinction.',
    'Le RTO mesure le délai maximal pour relancer le service ; le RPO mesure la perte maximale de données tolérée.',
    'Un plan de reprise d’activité (PRA) doit cumuler les temps de détection, décision, bascule et vérification pour valider le RTO.'
  ],
  checklist: [
    'Je sais identifier les sections obligatoires d’un Dossier d’Architecture Technique (DAT).',
    'Je sais rédiger un Runbook d’exploitation clair et directement utilisable par une équipe d’astreinte.',
    'Je maîtrise l’ordre de démarrage et d’arrêt d’une architecture multi-tiers (BDD, Cache, App, Web).',
    'Je sais calculer et interpréter les métriques RTO et RPO.',
    'Je sais estimer le temps d’indisponibilité global d’une procédure de bascule PRA.',
    'Je sais formaliser une procédure de renouvellement de certificats TLS dans un DEX.'
  ],
  notions: [
    'Dossier d’Architecture Technique (DAT)',
    'Dossier d’Exploitation (DEX / Runbook)',
    'Ordonnancement de services en grappe',
    'Recovery Time Objective (RTO)',
    'Recovery Point Objective (RPO)',
    'Plan de Reprise d’Activité (PRA)',
    'Plan de Continuité d’Activité (PCA)',
    'Bascule de secours (Failover Downtime)'
  ],
  pitfalls: [
    'Rédiger un Dossier d’Exploitation sous forme de texte narratif continu sans commandes de terminal copiables.',
    'Éteindre les bases de données avant de couper le trafic réseau des passerelles web lors d’un arrêt d’infrastructure.',
    'Confondre le RTO (délai de remise en route) et le RPO (quantité de données perdues dans le temps).',
    'Présumer qu’une procédure de sauvegarde fonctionne sans jamais avoir testé sa restauration réelle (RPO non prouvé).'
  ],
  questions: [
    {
      stem: 'Quelle métrique quantifie la durée maximale admissible d’interruption de service entre le déclenchement d’un sinistre et sa remise en service opérationnelle ?',
      opts: [
        'Le RPO (Recovery Point Objective)',
        'Le RTO (Recovery Time Objective)',
        'Le CPU Throttle',
        'Le taux de clics (CTR)'
      ],
      correct: 1,
      exp: 'Le RTO (Recovery Time Objective) est la durée maximale tolérée pour restaurer le service après un incident critique.'
    },
    {
      stem: 'Si une entreprise effectue une sauvegarde de base de données complète chaque nuit à minuit et qu’un sinistre détruit les serveurs à 15h00 le lendemain, quelle est la perte maximale de données constatée (RPO effectif) ?',
      opts: [
        '0 minute',
        '15 heures de transactions perdues',
        '24 heures',
        '45 minutes'
      ],
      correct: 1,
      exp: 'Entrez minuit et 15h00, 15 heures de transactions se sont écoulées sans sauvegarde. Le RPO effectif subi par l’entreprise est donc de 15 heures.'
    },
    {
      stem: 'Dans quelle séquence logique doit-on éteindre une architecture web 3-tiers (Base de données, API applicative, Passerelle Web NGINX) lors d’un arrêt planifié de production ?',
      opts: [
        'Base de données -> API applicative -> Passerelle Web',
        'Passerelle Web -> API applicative -> Base de données',
        'API applicative -> Passerelle Web -> Base de données',
        'Les trois composants doivent être éteints de manière simultanée'
      ],
      correct: 1,
      exp: 'À l’extinction, on coupe d’abord les accès extérieurs (Web) pour cesser de recevoir des requêtes, puis l’API pour vider les files, et enfin la BDD pour une clôture saine.'
    },
    {
      stem: 'Quel élément technique indispensable distingue le Dossier d’Exploitation (DEX) du Dossier d’Architecture Technique (DAT) ?',
      opts: [
        'Le DEX est imprimé en couleur tandis que le DAT est en noir et blanc',
        'Le DEX contient les consignes opérationnelles d’action (Runbooks, redémarrages, sauvegardes, astreinte), tandis que le DAT décrit la topologie et le dimensionnement statique du système',
        'Le DEX est réservé aux commerciaux de l’entreprise',
        'Le DAT ne contient aucune information sur les serveurs'
      ],
      correct: 1,
      exp: 'Le DAT cartographie la structure du système, alors que le DEX fournit le mode d’emploi opérationnel au quotidien et les consignes de dépannage pour l’exploitation.'
    },
    {
      stem: 'Dans une procédure de bascule PRA (Plan de Reprise d’Activité), quelles sont les 4 phases chronologiques dont la durée cumulée constitue le temps d’indisponibilité global ?',
      opts: [
        'Pause déjeuner, réunion commerciale, audit fiscal, départ en vacances',
        'Détection de panne, décision/arbitrage, bascule réseau IP/DNS, vérification d’intégrité',
        'Compilation du code, réécriture des tests, formation des stagiaires, livraison client',
        'Achat du matériel, transport routier, déballage, installation physique'
      ],
      correct: 1,
      exp: 'Le temps d’indisponibilité réel d’un failover comprend la détection, la prise de décision, l’application de la bascule technique et la vérification de conformité finale.'
    },
    {
      stem: 'Pourquoi est-il impératif de tester régulièrement la restauration effective des sauvegardes plutôt que de simplement surveiller le succès des sauvegardes dans un DEX ?',
      opts: [
        'Pour occuper les ingénieurs pendant la nuit',
        'Car une sauvegarde peut réussir sur le plan logiciel tout en produisant une archive corrompue, illisible ou incomplète rendant le RTO impossible à tenir lors d’une vraie crise',
        'Pour effacer les données des clients et faire de la place sur le disque',
        'Pour payer moins d’impôts'
      ],
      correct: 1,
      exp: 'Une sauvegarde dont la restauration n’a jamais été testée avec succès n’est pas une sauvegarde : seul le test de restauration prouve que le RTO et le RPO sont atteignables.'
    },
    {
      stem: 'Dans un DAT, que désigne la « DMZ » (Zone Démilitarisée) ?',
      opts: [
        'Une zone où aucun serveur n’est installé',
        'Un sous-réseau isolé intermédiaire séparant le réseau public non fiable (Internet) du réseau privé d’entreprise hautement sécurisé',
        'Le bureau du directeur de la sécurité informatique',
        'La salle de repos des développeurs'
      ],
      correct: 1,
      exp: 'La DMZ héberge les services exposés à Internet (proxy, serveurs web publics) tout en empêchant un attaquant ayant compromis la DMZ d’accéder directement au réseau interne critique.'
    },
    {
      stem: 'Quel est l’impact direct d’un RPO contractuel fixé à zéro (RPO = 0) sur l’architecture technique du DAT ?',
      opts: [
        'Aucune conséquence, une sauvegarde quotidienne suffit',
        'L’obligation d’implémenter une réplication synchrone en temps réel des données sur au moins deux sites géographiquement distincts',
        'L’interdiction d’utiliser des bases de données relationnelles',
        'L’arrêt obligatoire du système tous les soirs à 18h00'
      ],
      correct: 1,
      exp: 'Un RPO = 0 signifie qu’aucune transaction confirmée ne peut être perdue. Cela exige une écriture synchrone confirmée sur deux datacenters avant de valider la requête utilisateur.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la différence entre DAT et DEX ?',
      a: 'Le DAT est le dossier d’architecture technique (vision statique de l’infrastructure). Le DEX est le dossier d’exploitation (consignes dynamiques, procédures et Runbooks).'
    },
    {
      q: 'Que signifient et mesurent les métriques RTO et RPO ?',
      a: 'RTO (Recovery Time Objective) : durée maximale pour relancer le service. RPO (Recovery Point Objective) : perte maximale de données tolérée dans le temps.'
    },
    {
      q: 'Quel est l’ordre logique d’arrêt d’une architecture multi-niveaux ?',
      a: 'Sens inverse des dépendances : couper d’abord le point d’entrée web (Ingress), puis les applications, et enfin les bases de données et stockages.'
    },
    {
      q: 'Quelles sont les étapes d’une bascule de secours (Failover PRA) ?',
      a: '1. Détection de la panne, 2. Décision d’arbitrage, 3. Bascule technique (DNS/IP), 4. Contrôle d’intégrité et validation du service.'
    },
    {
      q: 'Pourquoi la réplication synchrone est-elle indispensable pour un RPO = 0 ?',
      a: 'Car toute réplication asynchrone induit un décalage temporel : en cas de sinistre brutal du site primaire, les données en transit non répliquées sont perdues.'
    },
    {
      q: 'Pourquoi les Runbooks doivent-ils contenir des commandes copiables ?',
      a: 'Pour éliminer les erreurs de frappe et le stress cognitif des techniciens d’astreinte lors d’une intervention d’urgence en pleine nuit.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la distinction DAT/DEX, les définitions de RTO et RPO et l’ordre d’arrêt des services.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez les mécanismes de failover PRA et les contraintes de RPO nul.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez parfaitement la documentation d’architecture système et d’exploitation opérationnelle.'
    }
  ]
};
