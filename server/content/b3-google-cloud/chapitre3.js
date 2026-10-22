/**
 * Chapitre 3 du cours « Google Cloud Platform B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Calcul & Virtualisation (Compute Engine, GKE, Cloud Run & App Engine)',
  short: 'Calcul, GKE &amp; Cloud Run',
  toc: 'Machines virtuelles Google Compute Engine (séries E2, N2, C2, M2, instances Spot préemptibles, disques persistants et calcul de SLA), groupes d\'instances gérés (MIG avec auto-scaling et auto-healing), conteneurs managés avec Google Kubernetes Engine (GKE Standard vs Autopilot), architectures Serverless modernes avec Cloud Run (concurrence, scale-to-zero, révisions et traffic splitting) et comparaison avec Cloud Functions et App Engine.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Le choix du moteur d\'exécution de calcul dans Google Cloud conditionne directement la vitesse de livraison, l\'efficacité opérationnelle et la facture mensuelle d\'une organisation. Déployer de simples conteneurs web sur des VMs Compute Engine surdimensionnées gérées à la main entraîne des coûts astronomiques et une maintenance lourde (patchs d\'OS). À l\'inverse, tenter d\'exécuter des calculs temps réel à état ou des protocoles personnalisés sur du Serverless pur peut conduire à des blocages techniques majeurs. En tant qu\'architecte Cloud B3, vous devez maîtriser l\'éventail complet des options de calcul GCP, dimensionner rigoureusement vos instances IaaS et orchestrer des déploiements conteneurisés élastiques avec GKE et Cloud Run.',
  objectives: [
    'dimensionner et configurer les instances Google Compute Engine selon les séries de calcul (E2, N2, C2, Spot VMs) ;',
    'comprendre le calcul des SLA de disponibilité mono-zone (99.5%) et multi-zones (99.99%) ;',
    'concevoir des Groupes d\'Instances Gérés (MIG) avec auto-scaling élastique et auto-healing supervisé par Health Checks ;',
    'comparer les modes opérationnels de Google Kubernetes Engine : GKE Standard versus GKE Autopilot managé ;',
    'maîtriser le déploiement Serverless conteneurisé sur Cloud Run : concurrence de requêtes, révisions immuables et Traffic Splitting ;',
    'analyser et résoudre méthodologiquement des dimensionneurs de VM, des moteurs d\'autoscaling MIG et des routeurs de trafic Cloud Run.'
  ],
  sections: [
    {
      title: 'Google Compute Engine (GCE) : Familles de Machines &amp; SLA',
      html: [
        '<p>Google Compute Engine (GCE) est le service IaaS permettant d\'exécuter des machines virtuelles sur l\'infrastructure physique de Google. Les types de machines sont répartis en familles optimisées :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Familles de Machines Virtuelles</h4>',
        '    <ul>',
        '      <li><strong>Série E2 (Économique / Partagée) :</strong> Processeurs x86 dynamiques (Intel/AMD) sans surcoût. Idéale pour les environnements de dev, les serveurs web modestes et les microservices peu consommateurs (ex: <code>e2-micro</code>, <code>e2-medium</code>).</li>',
        '      <li><strong>Série N2 / N2D (Polyvalente) :</strong> Équilibre parfait entre vCPU et RAM (jusqu\'à 128 vCPUs et 864 Go de RAM). Pour bases de données et progiciels métier.</li>',
        '      <li><strong>Série C2 / C3 (Optimisée Calcul) :</strong> Hautes fréquences d\'horloge fixes. Idéale pour le calcul scientifique, l\'encodage vidéo et le gaming.</li>',
        '      <li><strong>Série M2 / M3 (Optimisée Mémoire) :</strong> Jusqu\'à 12 To de RAM pour SAP HANA et bases in-memory massives.</li>',
        '      <li><strong>Instances Spot (ex-Préemptibles) :</strong> Capacité excédentaire vendue avec jusqu\'à 91% de réduction, mais que Google peut interrompre avec un préavis de 30 secondes. Idéale pour les batchs et le rendu.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Engagements de Service (SLA) &amp; Disques Persistants</h4>',
        '    <p>Le taux de disponibilité mensuel contractuel de GCE dépend de l\'architecture déployée :</p>',
        '    <ul>',
        '      <li><strong>VM Mono-zone avec Persistent Disk SSD :</strong> SLA de <strong>99.5%</strong> (temps d\'indisponibilité mensuelle max = 216 minutes).</li>',
        '      <li><strong>Instances réparties Multi-zones (MIG) :</strong> SLA de <strong>99.99%</strong> (temps d\'arrêt mensuel max = 4.32 minutes).</li>',
        '    </ul>',
        '    <p><strong>Stockage bloc attaché :</strong></p>',
        '    <ul>',
        '      <li><em>Standard Persistent Disk (pd-standard) :</em> disques magnétiques économiques pour sauvegardes.</li>',
        '      <li><em>Balanced Persistent Disk (pd-balanced) :</em> compromis SSD performances/prix standard.</li>',
        '      <li><em>SSD Persistent Disk (pd-ssd) :</em> haute performance IOPS pour bases relationnelles.</li>',
        '      <li><em>Local SSD :</em> SSD NVMe physiquement rattachés à l\'hôte (très haute vitesse, non persistant après arrêt de la VM).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Groupes d\'Instances Gérés (MIG) : Auto-scaling &amp; Auto-healing',
      html: [
        '<p>Un groupe d\'instances géré (Managed Instance Group - MIG) permet de piloter un ensemble de VMs identiques comme une seule entité homogène et élastique :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Instance Template &amp; Déploiement</h4>',
        '    <ul>',
        '      <li>Le MIG instancie toutes ses machines à partir d\'un modèle d\'instance (<em>Instance Template</em>) immuable définissant l\'OS, le type de machine, le disque et les scripts de démarrage (<em>startup-script</em>).</li>',
        '      <li><strong>MIG Zonal :</strong> toutes les VMs sont dans la même zone.</li>',
        '      <li><strong>MIG Régional :</strong> les VMs sont automatiquement réparties sur plusieurs zones de la région pour garantir la tolérance aux pannes zonales.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Auto-scaling &amp; Auto-healing</h4>',
        '    <ul>',
        '      <li><strong>Auto-scaling :</strong> adapte dynamiquement le nombre de VMs entre un minimum et un maximum pour maintenir une cible de métrique (ex: <code>Target CPU = 60%</code> ou débit de requêtes HTTP du Load Balancer).</li>',
        '      <li><strong>Auto-healing (Auto-guérison) :</strong> une sonde de santé (Health Check) envoie des requêtes périodiques à l\'application. Si l\'application échoue au test de santé, le MIG recrée automatiquement la VM défaillante à neuf.</li>',
        '      <li><strong>Rolling Updates :</strong> mise à jour progressive du parc de VMs avec contrôle de la surcapacité maximale (<em>maxSurge</em>) et de l\'indisponibilité maximale (<em>maxUnavailable</em>).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Google Kubernetes Engine (GKE) : Standard vs Autopilot',
      html: [
        '<p>Google est le créateur originel de Kubernetes (dérivé de son système interne Borg). GKE est la plateforme Kubernetes managée de référence sur le marché :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>GKE Mode Standard</h4>',
        '    <ul>',
        '      <li>Google gère le plan de contrôle (Control Plane : API Server, etcd) avec SLA 99.95% à 99.99%.</li>',
        '      <li>L\'administrateur configure et paie les nœuds workers (VMs Compute Engine sous-jacentes, pools de nœuds).</li>',
        '      <li>Contrôle total sur les versions de noyau, les démons système et les GPU spécifiques.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>GKE Mode Autopilot (Recommandé)</h4>',
        '    <ul>',
        '      <li>Google prend entièrement en charge la gestion, le dimensionnement, la mise à l\'échelle et le durcissement de sécurité de l\'ensemble de l\'infrastructure des nœuds.</li>',
        '      <li>Facturation uniquement basée sur les <strong>ressources réelles demandées par les Pods</strong> (vCPU, RAM, stockage), et non sur les VMs entières.</li>',
        '      <li>Application native des meilleures pratiques de sécurité CIS Kubernetes et mise à l\'échelle automatique des nœuds intégrée sans configuration.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Serverless Moderne : Cloud Run vs Cloud Functions &amp; App Engine',
      html: [
        '<p>Google Cloud propose trois solutions sans serveur (Serverless) selon le niveau d\'abstraction souhaité :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Cloud Run (PaaS Conteneurisé)</h4>',
        '    <ul>',
        '      <li>Exécutez n\'importe quel conteneur OCI (Docker) répondant sur un port HTTP ou gRPC.</li>',
        '      <li><strong>Scale-to-Zero :</strong> aucun coût lorsqu\'aucune requête n\'est traitée.</li>',
        '      <li><strong>Concurrence :</strong> un seul conteneur peut traiter jusqu\'à 1 000 requêtes simultanées (extrême rentabilité).</li>',
        '      <li><strong>Révisions immuables :</strong> support natif de Canary Release et de Traffic Splitting sans interruption.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cloud Functions v2 (FaaS Événementiel)</h4>',
        '    <ul>',
        '      <li>Exécution de petits extraits de code (fonctions Python, Node.js, Go) sans gérer de conteneur.</li>',
        '      <li>Déclenchée par des événements Cloud Storage, Pub/Sub, Firestore ou Firestore via <strong>Eventarc</strong>.</li>',
        '      <li>Bâtie directement au-dessus de l\'infrastructure Cloud Run en version 2.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>App Engine (Historique)</h4>',
        '    <ul>',
        '      <li>Plateforme PaaS historique de Google lancée en 2008.</li>',
        '      <li>Environnement Standard (runtimes sandboxés très rapides) et Environnement Flexible (conteneurs Docker).</li>',
        '      <li>Aujourd\'hui largement supplantée par la flexibilité et la modernité de <strong>Cloud Run</strong> pour les nouveaux projets.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('tip', 'Canary Deployment sur Cloud Run', [
          '<p>Déployer une nouvelle version applicative sans risque : en déployant la révision <code>v2</code> sans lui attribuer 100% du trafic, on utilise la commande <code>gcloud run services update-traffic [SERVICE] --to-revisions=v1=80,v2=20</code> pour envoyer 20% des requêtes vers <code>v2</code>. En observant les métriques de latence et d\'erreurs, on bascule à 100% ou on annule en une seconde.</p>'
        ])
      ].join('\n')
    }
  ],
  method: [
    'Choix du modèle de calcul approprié : privilégier Cloud Run pour les microservices HTTP sans état, GKE Autopilot pour les architectures microservices complexes, et Compute Engine pour les applications monolithiques ou legacy avec exigences d\'OS spécifiques.',
    'Configuration de la résilience zonale Compute Engine : regrouper les VMs dans un MIG Régional distribué sur 3 zones pour bénéficier du SLA 99.99% et activer les Health Checks d\'auto-guérison.',
    'Optimisation des coûts avec les instances Spot : réserver des pools de nœuds d\'instances Spot pour les traitements par lots asynchrones ou les calculs de staging afin d\'économiser jusqu\'à 90%.',
    'Industrialisation des déploiements sans interruption : configurer le fractionnement de trafic (Traffic Splitting) progressif sur Cloud Run pour valider les nouvelles versions applicatives.'
  ],
  summary: [
    'Google Compute Engine propose des séries adaptées (E2 économique, N2 équilibrée, C2 calcul) avec un SLA atteignant 99.99% en déploiement multi-zones.',
    'Les Groupes d\'Instances Gérés (MIG) garantissent l\'élasticité automatique (Auto-scaling) et la tolérance aux pannes (Auto-healing) via des sondes de santé.',
    'GKE Autopilot décharge l\'équipe de la maintenance des nœuds Kubernetes et facture uniquement les ressources réellement allouées aux Pods.',
    'Cloud Run représente le standard serverless moderne : exécution de conteneurs arbitraires, scale-to-zero, concurrence élevée et basculement de trafic instantané.',
    'Cloud Functions v2 est idéal pour l\'événementiel asynchrone (Eventarc/PubSub), tandis qu\'App Engine est progressivement remplacé par Cloud Run.'
  ],
  checklist: [
    'Savez-vous comparer les séries de machines Compute Engine E2, N2, C2 et les instances Spot ?',
    'Connaissez-vous le calcul du SLA mono-zone (99.5%) vs multi-zones (99.99%) ?',
    'Pouvez-vous expliquer le fonctionnement conjoint de l\'auto-scaling et de l\'auto-healing dans un MIG ?',
    'Savez-vous expliquer pourquoi GKE Autopilot est plus simple et sécurisé que GKE Standard ?',
    'Comprenez-vous le mécanisme de Traffic Splitting sur Cloud Run pour réaliser un déploiement Canary ?'
  ],
  notions: [
    { term: 'Compute Engine (GCE)', def: 'Service IaaS de Google Cloud fournissant des machines virtuelles hautement configurables avec disques persistants.' },
    { term: 'Managed Instance Group (MIG)', def: 'Groupe de machines virtuelles identiques gérées automatiquement avec fonctions d\'auto-scaling, d\'auto-healing et de mises à jour progressives.' },
    { term: 'GKE Autopilot', def: 'Mode opérationnel de Kubernetes managé où Google gère intégralement l\'infrastructure des nœuds et facture uniquement la consommation réelle des Pods.' },
    { term: 'Cloud Run', def: 'Plateforme Serverless exécutant des conteneurs sans état avec passage à l\'échelle automatique jusqu\'à zéro et facturation à la milliseconde.' },
    { term: 'Instances Spot (Préemptibles)', def: 'Instances Compute Engine à prix très réduit que Google peut récupérer avec un préavis de 30 secondes pour d\'autres charges prioritaires.' }
  ],
  pitfalls: [
    'Utiliser des instances Spot pour des bases de données relationnelles principales ou des applications à état sans réplication : la VM peut s\'arrêter à tout moment.',
    'Configurer un Health Check d\'auto-healing sur un point d\'accès dépendant d\'une base de données externe en panne : le MIG redémarrera en boucle toutes les VMs saines sans résoudre le problème.',
    'Déployer des microservices simples sur un cluster GKE Standard sous-utilisé : les nœuds minimaux facturés en permanence coûtent beaucoup plus cher qu\'une exécution serverless sur Cloud Run.',
    'Oublier de configurer le paramètre de concurrence sur Cloud Run (laisser à 1 par défaut pour des applications I/O bound), entraînant un surcoût d\'instances inutiles.'
  ],
  questions: [
    {
      stem: 'Quel est le SLA de disponibilité mensuel garanti par Google pour des instances Compute Engine réparties sur plusieurs zones de disponibilité (MIG Régional) ?',
      opts: ['99.0%', '99.5%', '99.99%', '99.999%'],
      correct: 2,
      exp: 'Google garantit un SLA de 99.99% pour les déploiements multi-zones d\'instances Compute Engine (contre 99.5% pour une VM isolée dans une seule zone).'
    },
    {
      stem: 'Dans un groupe d\'instances géré (MIG), quel mécanisme recrée automatiquement une VM dont l\'application ne répond plus aux requêtes de la sonde de santé ?',
      opts: ['L\'Auto-scaling', 'L\'Auto-healing (Auto-guérison)', 'Le Rolling Update', 'Le Load Balancing'],
      correct: 1,
      exp: 'L\'Auto-healing supervise la santé applicative de chaque VM via un Health Check et déclenche automatiquement la recréation de l\'instance si la sonde échoue.'
    },
    {
      stem: 'Quelle est la principale différence de facturation entre GKE Standard et GKE Autopilot ?',
      opts: ['GKE Autopilot facture au nombre de requêtes HTTP', 'GKE Autopilot facture uniquement les ressources de vCPU/RAM allouées aux Pods et non les VMs sous-jacentes', 'GKE Standard est gratuit', 'GKE Autopilot ne supporte pas Linux'],
      correct: 1,
      exp: 'En mode Autopilot, l\'utilisateur ne paie pas pour la capacité inutilisée des nœuds workers, mais uniquement pour les ressources CPU et mémoire déclarées par ses Pods.'
    },
    {
      stem: 'Quel service Google Cloud permet d\'exécuter n\'importe quel conteneur Docker répondant sur un port HTTP avec passage à l\'échelle à zéro (Scale-to-Zero) sans gérer d\'infrastructure ?',
      opts: ['Google Compute Engine', 'Cloud Run', 'Cloud SQL', 'Cloud Storage'],
      correct: 1,
      exp: 'Cloud Run est la plateforme Serverless conteneurisée de référence de Google, capable de démarrer en quelques millisecondes et de passer à zéro instance en l\'absence de requêtes.'
    },
    {
      stem: 'Quel pourcentage maximal d\'économie les instances Spot de Compute Engine peuvent-elles offrir par rapport au tarif à la demande standard ?',
      opts: ['10%', '30%', 'jusqu\'à 60% à 91%', '5%'],
      correct: 2,
      exp: 'Les instances Spot (qui remplacent les anciennes VMs préemptibles) permettent d\'obtenir jusqu\'à 60% à 91% d\'économie sur les tarifs de calcul Compute Engine.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est le taux de SLA d\'une VM Compute Engine mono-zone vs multi-zones ?',
      a: '99.5% en mono-zone (216 min/mois d\'arrêt max) vs 99.99% en multi-zones (4.32 min/mois d\'arrêt max).'
    },
    {
      q: 'Qu\'est-ce qu\'un groupe d\'instances géré (MIG) régional ?',
      a: 'Un groupe de VMs identiques réparties sur plusieurs zones assurant auto-scaling et auto-healing automatique.'
    },
    {
      q: 'Pourquoi GKE Autopilot est-il privilégié pour la majorité des projets ?',
      a: 'Google gère entièrement les nœuds, applique le durcissement de sécurité et facture uniquement les Pods actifs.'
    },
    {
      q: 'Quelle est la particularité de la concurrence dans Google Cloud Run ?',
      a: 'Une seule instance de conteneur peut traiter jusqu\'à 1 000 requêtes en parallèle, optimisant les coûts d\'exécution.'
    },
    {
      q: 'Pour quel type de charge de travail les instances Spot sont-elles adaptées ?',
      a: 'Les traitements par lots, calculs asynchrones et environnements de test tolérants aux arrêts inopinés.'
    },
    {
      q: 'Qu\'est-ce que le Traffic Splitting sur Cloud Run ?',
      a: 'La capacité de répartir les pourcentages de trafic HTTP entre plusieurs révisions pour tester des versions Canary.'
    }
  ],
  mastery: [
    {
      title: 'Dimensionnement IaaS et calcul de SLA composite',
      desc: 'Sélectionner les familles de VM optimales et concevoir des architectures répondant aux exigences de haute disponibilité.'
    },
    {
      title: 'Configuration d\'auto-scaling et d\'auto-healing sur MIG',
      desc: 'Développer des simulateurs d\'élasticité et programmer des sondes de santé pour sécuriser le parc de serveurs.'
    },
    {
      title: 'Déploiement de microservices conteneurisés sur Cloud Run',
      desc: 'Packager des applications Docker, configurer la concurrence et automatiser les révisions avec bascule de trafic.'
    },
    {
      title: 'Orchestration avec GKE Standard et Autopilot',
      desc: 'Choisir le mode d\'exploitation Kubernetes adapté et configurer les pools de nœuds pour maximiser la rentabilité.'
    },
    {
      title: 'Stratégie de réduction des coûts avec les instances Spot',
      desc: 'Intégrer la tolérance aux préemptions dans les chaînes de traitement pour réduire drastiquement la facture IaaS.'
    }
  ]
};
