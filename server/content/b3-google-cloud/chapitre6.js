/**
 * Chapitre 6 du cours « Google Cloud Platform B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Observabilité (Operations Suite), FinOps & Infrastructure as Code (Terraform)',
  short: 'Observabilité, FinOps &amp; Terraform',
  toc: 'Google Cloud Operations Suite (Cloud Monitoring, métriques, alertes, Cloud Logging, filtres et Log Sinks vers BigQuery), diagnostics avancés (Error Reporting, Cloud Trace, Cloud Profiler), gouvernance financière FinOps (budgets, alertes de seuil, remises SUD automatiques et engagements CUD 1 an/3 ans), et automatisation déclarative avec Terraform (provider Google, state backend GCS et conformité HCL).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Déployer des services dans le Cloud sans observabilité en temps réel ni gouvernance financière rigoureuse conduit inexorablement à deux désastres : l\'incapacité à diagnostiquer les pannes de production (lenteurs invisibles, incidents non détectés) et l\'explosion non maîtrisée des factures mensuelles (« bill shock »). De plus, gérer l\'infrastructure manuellement via la console graphique empêche toute reproductibilité et multiplie les erreurs de configuration humaines. En tant qu\'ingénieur DevOps & SRE B3, vous devez superviser la santé de vos systèmes avec Cloud Operations, optimiser les coûts avec les pratiques FinOps et automatiser l\'intégralité des déploiements déclaratifs via Terraform.',
  objectives: [
    'maîtriser la suite Google Cloud Operations : métriques, tableaux de bord et canaux d\'alerte Cloud Monitoring ;',
    'exploiter Cloud Logging : syntaxe de filtrage des événements, journaux d\'audit et export continu via Log Sinks ;',
    'diagnostiquer les goulets d\'étranglement applicatifs avec Error Reporting, Cloud Trace et Cloud Profiler ;',
    'piloter la rentabilité financière FinOps : calcul des remises d\'utilisation continue (SUD) et des engagements CUD (1 an et 3 ans) ;',
    'automatiser l\'infrastructure avec Terraform : provider Google, gestion de l\'état distant sécurisé sur GCS et bonnes pratiques HCL ;',
    'analyser et résoudre méthodologiquement des parseurs de filtres de logs, des calculateurs de remises FinOps et des linters de manifestes Terraform.'
  ],
  sections: [
    {
      title: 'Google Cloud Operations Suite : Monitoring, Alertes &amp; Métriques',
      html: [
        '<p>Google Cloud Operations Suite (anciennement Stackdriver) est la solution intégrée de supervision, de journalisation et d\'analyse de performance de Google Cloud :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Cloud Monitoring</h4>',
        '    <ul>',
        '      <li>Collecte automatiquement les métriques d\'infrastructure (CPU, mémoire, réseau, disque, requêtes HTTP, latence).</li>',
        '      <li>Support des métriques personnalisées via l\'API ou l\'agent OpenTelemetry.</li>',
        '      <li><strong>Tableaux de bord (Dashboards) :</strong> visualisations graphiques en temps réel avec corrélation multi-projets.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Politiques d\'Alerte (Alerting Policies)</h4>',
        '    <ul>',
        '      <li>Déclenchées lorsqu\'une métrique franchit un seuil pendant une durée paramétrable (ex: CPU &gt; 85% pendant plus de 5 minutes).</li>',
        '      <li><strong>Canaux de notification :</strong> Email, Slack, Webhook, SMS, PagerDuty ou Pub/Sub.</li>',
        '      <li>Gestion des incidents avec accusé de réception et fermeture automatique lors du retour à la normale.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Cloud Logging &amp; Export de Données (Log Sinks)',
      html: [
        '<p>Cloud Logging centralise des pétaoctets d\'événements générés par les services GCP, les VM et les applications :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Types de Journaux &amp; Niveaux de Gravité</h4>',
        '    <ul>',
        '      <li><strong>Admin Activity Audit Logs :</strong> tracent qui a créé, modifié ou supprimé une ressource (conservés gratuitement 400 jours).</li>',
        '      <li><strong>Data Access Audit Logs :</strong> tracent les lectures et écritures de données sensibles (BigQuery, Cloud Storage).</li>',
        '      <li><strong>System Event Logs :</strong> événements de maintenance ou d\'auto-scaling de l\'infrastructure Google.</li>',
        '      <li>Sévérités : <code>DEBUG &lt; INFO &lt; NOTICE &lt; WARNING &lt; ERROR &lt; CRITICAL</code>.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Récepteurs de Journaux (Log Sinks)</h4>',
        '    <p>Par défaut, les logs applicatifs sont conservés 30 jours. Pour un archivage pérenne ou une analyse analytique, on configure un <strong>Log Sink</strong> avec un filtre de sélection vers :</p>',
        '    <ul>',
        '      <li><strong>BigQuery :</strong> pour l\'analyse SQL temps réel et les requêtes de conformité.</li>',
        '      <li><strong>Cloud Storage :</strong> pour l\'archivage à long terme à coût minimal (Archive class).</li>',
        '      <li><strong>Cloud Pub/Sub :</strong> pour router les logs vers un SIEM externe (Splunk, Datadog).</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('standard', 'Diagnostics de Performance : Trace, Profiler &amp; Error Reporting', [
          '<p>Au-delà des métriques et des logs, Google Cloud intègre des outils d\'observabilité avancés :</p>',
          '<ul>',
          '  <li><strong>Cloud Trace :</strong> système de traçabilité distribuée (Distributed Tracing) mesurant la latence de chaque appel RPC entre microservices pour identifier les requêtes lentes.</li>',
          '  <li><strong>Cloud Profiler :</strong> analyse en continu l\'utilisation CPU et la consommation de mémoire heap de chaque fonction dans le code source en production sans dégradation de performance (&lt; 5% overhead).</li>',
          '  <li><strong>Error Reporting :</strong> regroupe automatiquement les traces de pile (stack traces) non interceptées de vos applications par motif d\'erreur et alerte immédiatement les développeurs.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Gouvernance Financière FinOps : Budgets, CUD &amp; SUD',
      html: [
        '<p>Le mouvement FinOps (Financial Operations) allie ingénierie et finance pour maximiser la valeur métier de chaque euro investi dans le Cloud :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Budgets &amp; Alertes de Facturation</h4>',
        '    <ul>',
        '      <li>Définition d\'un montant de budget mensuel cible par projet ou compte de facturation.</li>',
        '      <li>Alertes automatiques par seuil de consommation : <strong>50%</strong>, <strong>90%</strong> et <strong>100%</strong> des dépenses prévisionnelles ou réelles.</li>',
        '      <li>Automatisation : publication des alertes vers un topic Pub/Sub déclenchant une Cloud Function pour désactiver temporairement les environnements de test hors-production.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Remises Tarifaires : SUD vs CUD</h4>',
        '    <ul>',
        '      <li><strong>Sustained Use Discounts (SUD) :</strong> réduction automatique appliquée par Google sans aucun engagement si une instance Compute Engine tourne plus de 25% du mois (jusqu\'à <strong>20% à 30%</strong> de remise).</li>',
        '      <li><strong>Committed Use Discounts (CUD) :</strong> engagement contractuel sur une capacité minimale de vCPU/RAM ou sur une dépense monétaire horaire (Flexible CUD) :<br>- Engagement 1 an : environ <strong>37%</strong> de remise.<br>- Engagement 3 ans : environ <strong>55%</strong> de remise.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Infrastructure as Code (IaC) avec Terraform sur GCP',
      html: [
        '<p>Pour garantir la reproductibilité, l\'auditabilité et le déploiement automatisé en CI/CD, l\'infrastructure Google Cloud est déclarée sous forme de code avec HashiCorp Terraform :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Provider Google pour Terraform</h4>',
        '    <pre><code>terraform {\n  required_providers {\n    google = {\n      source  = "hashicorp/google"\n      version = "~> 5.0"\n    }\n  }\n  backend "gcs" {\n    bucket = "mon-tfstate-prod"\n    prefix = "terraform/state"\n  }\n}\n\nprovider "google" {\n  project = "fintech-prod-2026"\n  region  = "europe-west9"\n}</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Bonnes Pratiques de Sécurité HCL</h4>',
        '    <ul>',
        '      <li><strong>Backend distant sur GCS :</strong> stocker le fichier d\'état (<code>terraform.tfstate</code>) dans un bucket Cloud Storage sécurisé avec contrôle de version et verrouillage d\'état automatique (State Locking).</li>',
        '      <li><strong>Zéro secret en dur :</strong> ne jamais utiliser <code>credentials = file(...)</code> dans le code ! Terraform doit utiliser automatiquement <em>Application Default Credentials (ADC)</em> en local ou <em>Workload Identity</em> en CI/CD.</li>',
        '      <li><strong>Audit de pare-feu :</strong> bannir les règles de pare-feu autorisant <code>0.0.0.0/0</code> sur les ports d\'administration (SSH 22, RDP 3389).</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('tip', 'Workflow de Déploiement Terraform', [
          '<p>Le cycle de vie standard Terraform comprend 4 étapes : <code>terraform init</code> (téléchargement du provider et initialisation du backend GCS), <code>terraform fmt -check</code> (validation de la mise en forme), <code>terraform plan</code> (calcul différentiel sans modification de l\'infrastructure) et <code>terraform apply</code> (application idempotente des changements sur Google Cloud).</p>'
        ])
      ].join('\n')
    }
  ],
  method: [
    'Mise en place de l\'observabilité dès l\'initialisation : configurer un espace de travail Cloud Monitoring, créer des tableaux de bord pour les métriques de saturation (Golden Signals) et définir des alertes à notification multi-canal.',
    'Exportation et rétention des journaux d\'audit : créer un Log Sink filtrant les événements de sécurité critiques et les acheminer vers un dataset BigQuery partitionné pour les contrôles réglementaires.',
    'Optimisation proactive FinOps : analyser les recommandations de dimensionnement (Recommender API), activer les alertes de budget à 50%, 90% et 100%, et souscrire des engagements CUD sur la capacité de base stable.',
    'Automatisation déclarative avec Terraform : modulariser les déploiements GCP (modules VPC, GKE, Cloud Run), sécuriser le backend d\'état sur un bucket Cloud Storage et intégrer un linter de conformité dans la pipeline CI/CD.'
  ],
  summary: [
    'Cloud Monitoring supervise les métriques système et déclenche des alertes configurées vers Slack, PagerDuty ou Email.',
    'Cloud Logging centralise tous les événements d\'infrastructure et permet l\'archivage à long terme via des Log Sinks vers BigQuery ou Cloud Storage.',
    'Cloud Trace et Cloud Profiler identifient avec précision les goulots d\'étranglement de latence et de mémoire dans le code applicatif.',
    'Le FinOps optimise les dépenses via les remises automatiques d\'usage continu (SUD) et les remises sur engagement d\'utilisation (CUD 1 an et 3 ans).',
    'Terraform automatise l\'infrastructure déclarative avec le provider Google, un backend d\'état distant GCS et une stricte interdiction de secrets en dur.'
  ],
  checklist: [
    'Savez-vous configurer une alerte Cloud Monitoring avec seuil métrique et canal de notification ?',
    'Comprenez-vous le rôle d\'un Log Sink pour exporter des journaux d\'audit vers BigQuery ?',
    'Pouvez-vous expliquer la différence entre Cloud Trace (latence de requêtes) et Cloud Profiler (CPU/mémoire du code) ?',
    'Connaissez-vous les pourcentages de remise des engagements CUD 1 an (~37%) et 3 ans (~55%) ?',
    'Savez-vous configurer un backend GCS distant pour stocker l\'état Terraform de façon collaborative et sécurisée ?'
  ],
  notions: [
    { term: 'Cloud Operations Suite', def: 'Ensemble unifié d\'outils d\'observabilité Google Cloud regroupant Monitoring, Logging, Trace, Profiler et Error Reporting.' },
    { term: 'Log Sink', def: 'Mécanisme de routage dans Cloud Logging qui filtre et exporte en continu des journaux d\'événements vers BigQuery, Storage ou Pub/Sub.' },
    { term: 'Committed Use Discount (CUD)', def: 'Remise contractuelle substantielle accordée par Google en échange d\'un engagement d\'utilisation continue de ressources sur 1 ou 3 ans.' },
    { term: 'Sustained Use Discount (SUD)', def: 'Remise automatique sans engagement appliquée sur les VMs Compute Engine tournant une part significative du mois civil.' },
    { term: 'Backend Terraform GCS', def: 'Configuration stockant le fichier d\'état terraform.tfstate dans un bucket Google Cloud Storage avec gestion des versions et verrouillage automatique.' }
  ],
  pitfalls: [
    'Laisser les logs applicatifs verbeux s\'accumuler dans Cloud Logging sans filtre d\'exclusion, générant une facture de stockage de logs imprévue.',
    'Ne pas configurer d\'alertes budgétaires lors du lancement d\'un projet, découvrant les dérives de coûts uniquement lors de la réception de la facture mensuelle.',
    'Stocker le fichier d\'état Terraform (terraform.tfstate) sur un poste local au lieu d\'un bucket GCS partagé, provoquant des conflits d\'état et des désynchronisations d\'infrastructure.',
    'Inscrire des clés privées de service account en dur dans les fichiers Terraform (credentials = file(...)) au lieu d\'utiliser Application Default Credentials.'
  ],
  questions: [
    {
      stem: 'Quel composant de Cloud Logging permet de router et d\'exporter automatiquement les journaux d\'événements vers BigQuery pour analyse SQL à long terme ?',
      opts: ['Un Log Router (Log Sink)', 'Un Cloud Router', 'Une URL Map', 'Une règle de pare-feu'],
      correct: 0,
      exp: 'Un récepteur de journaux (Log Sink) configure un filtre logique et achemine en streaming continu les événements sélectionnés vers une destination comme BigQuery ou Cloud Storage.'
    },
    {
      stem: 'Quel niveau de réduction approximatif un engagement d\'utilisation continue (CUD) de 3 ans sur Compute Engine procure-t-il par rapport au tarif standard à la demande ?',
      opts: ['Environ 10%', 'Environ 20%', 'Environ 55%', 'Environ 95%'],
      correct: 2,
      exp: 'Un engagement CUD de 3 ans permet d\'obtenir environ 55% de réduction sur les ressources de calcul engagées (contre environ 37% pour 1 an).'
    },
    {
      stem: 'Quel outil de la suite Google Cloud Operations permet de mesurer la latence de chaque appel RPC et requête réseau à travers une chaîne complexe de microservices ?',
      opts: ['Cloud Monitoring', 'Cloud Profiler', 'Cloud Trace', 'Error Reporting'],
      correct: 2,
      exp: 'Cloud Trace est le système de traçabilité distribuée (Distributed Tracing) qui chronomètre la traversée des requêtes à travers l\'ensemble des microservices.'
    },
    {
      stem: 'Où le fichier d\'état d\'infrastructure Terraform (terraform.tfstate) doit-il être stocké en production pour garantir le travail collaboratif et le verrouillage d\'état ?',
      opts: ['Dans le dépôt Git public du projet', 'Dans un bucket Cloud Storage configuré en backend distant (backend "gcs")', 'Sur le bureau de l\'administrateur', 'Dans un fichier ZIP sur une clé USB'],
      correct: 1,
      exp: 'Terraform recommande d\'utiliser le backend « gcs » pour stocker son fichier d\'état dans un bucket Google Cloud Storage sécurisé avec verrouillage automatique pour éviter les écritures concurrentes.'
    },
    {
      stem: 'Quelle pratique de sécurité relative aux identifiants est formellement requise lors de l\'écriture de code Terraform pour Google Cloud ?',
      opts: ['Écrire le mot de passe root en commentaire', 'Inscrire le chemin d\'une clé JSON de compte de service dans le bloc provider', 'Utiliser Application Default Credentials (ADC) ou Workload Identity sans clé en dur', 'Désactiver le contrôle SSL'],
      correct: 2,
      exp: 'Le code Terraform ne doit jamais contenir de fichier de clé de compte de service en dur ; il doit s\'appuyer sur Application Default Credentials (ADC) en local ou Workload Identity Federation dans la CI/CD.'
    }
  ],
  flashcards: [
    {
      q: 'Qu\'est-ce que Cloud Monitoring dans Google Cloud ?',
      a: 'Le service de collecte de métriques d\'infrastructure et applicatives, de tableaux de bord et de gestion d\'alertes.'
    },
    {
      q: 'Quel est le rôle d\'un Log Sink dans Cloud Logging ?',
      a: 'Filtrer et exporter des flux de journaux en continu vers BigQuery, Cloud Storage ou Pub/Sub.'
    },
    {
      q: 'Quelle est la différence entre Cloud Trace et Cloud Profiler ?',
      a: 'Trace mesure la latence des requêtes entre microservices ; Profiler analyse la consommation CPU et mémoire du code.'
    },
    {
      q: 'Qu\'est-ce qu\'une remise Sustained Use Discount (SUD) ?',
      a: 'Une remise automatique appliquée par Google sur les VMs qui s\'exécutent pendant une large portion du mois civil.'
    },
    {
      q: 'Quel est le gain moyen d\'un engagement CUD de 1 an vs 3 ans ?',
      a: 'Environ 37% de remise pour 1 an d\'engagement, et environ 55% de remise pour 3 ans.'
    },
    {
      q: 'Pourquoi stocker l\'état Terraform sur Google Cloud Storage (GCS) ?',
      a: 'Pour centraliser l\'état, permettre la collaboration d\'équipe et assurer le verrouillage d\'état automatique (State Locking).'
    }
  ],
  mastery: [
    {
      title: 'Configuration d\'observabilité avancée avec Cloud Operations',
      desc: 'Créer des dashboards personnalisés et paramétrer des alertes multi-canaux pour superviser les Golden Signals.'
    },
    {
      title: 'Export et conformité des logs d\'audit avec Log Sinks',
      desc: 'Déployer des récepteurs de journaux acheminant les événements de sécurité vers BigQuery pour analyse SQL.'
    },
    {
      title: 'Diagnostic de performance avec Trace et Profiler',
      desc: 'Identifier les requêtes lentes et optimiser l\'utilisation CPU/RAM dans les applications de production.'
    },
    {
      title: 'Pilotage de la gouvernance financière FinOps',
      desc: 'Modéliser les budgets avec alertes de seuil et planifier les engagements CUD pour réduire la facture d\'infrastructure.'
    },
    {
      title: 'Automatisation déclarative avec Terraform pour GCP',
      desc: 'Concevoir des manifestes HCL conformes aux meilleures pratiques avec backend d\'état GCS et zéro secret en dur.'
    }
  ]
};
