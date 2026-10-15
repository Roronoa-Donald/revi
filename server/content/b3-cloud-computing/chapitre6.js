/**
 * Chapitre 6 du cours « Cloud Computing B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Stratégies de Migration 6R, FinOps &amp; Optimisation Économique',
  short: 'Migration 6R &amp; FinOps',
  toc: 'Arbre de décision des 6 R de migration applicative (Gartner/AWS), calcul de TCO comparatif sur 3 ans, culture FinOps et leviers tarifaires On-Demand, Réservé et Spot.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'La décision de migrer vers le Cloud ne répond pas à un effet de mode mais à des impératifs économiques et stratégiques. Cependant, une migration mal préparée — se contentant de reproduire à l’identique dans le Cloud une architecture monolithique surdimensionnée — se solde presque systématiquement par une explosion des coûts et une déception financière amère. Pour réussir la transformation numérique d’une organisation, l’ingénieur Cloud de niveau B3 doit maîtriser le cadre méthodologique des 6 R de la migration applicative, calculer avec rigueur le coût total de possession (TCO sur 3 ans) et piloter la gouvernance financière FinOps en combinant instances On-Demand, Réservées et Spot.',
  objectives: [
    'maîtriser l’arbre de décision méthodologique des 6 R (Rehost, Replatform, Repurchase, Refactor, Retain, Retire) ;',
    'calculer et comparer le TCO (Total Cost of Ownership) sur 3 ans entre infrastructure sur site (CAPEX + OPEX) et Cloud (OPEX) ;',
    'comprendre le cycle de vie de la discipline FinOps : Inform (visibilité), Optimize (réduction), Operate (gouvernance continue) ;',
    'appliquer les leviers tarifaires d’optimisation : Instances Réservées (RI), Savings Plans et Instances Spot ;',
    'concevoir une stratégie de balisage (tagging) pour mettre en œuvre le refacturation interne (Chargeback / Showback) ;',
    'détecter et éradiquer les gaspillages financiers récurrents (volumes EBS orphelins, adresses IP inactives, surdimensionnement).'
  ],
  sections: [
    {
      title: 'L’Arbre de Décision des 6 R de la Migration Applicative',
      html: [
        '<p>Formalisé par Gartner et largement adopté par AWS et les grands cabinets de conseil, le framework des 6 R structure l’arbitrage de chaque composant du portefeuille applicatif d’une entreprise :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Rehost (Lift &amp; Shift)</h4>',
        '    <p>Migration brute des machines virtuelles vers le Cloud sans modification de code ou d’architecture.<br><strong>Avantage :</strong> Vitesse d’exécution maximale, risque technique minimal.<br><strong>Inconvénient :</strong> N’exploite pas les bénéfices natifs du Cloud.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Replatform (Lift, Tinker &amp; Shift)</h4>',
        '    <p>Optimisations ciblées sans changer le cœur du code : bascule de la base de données vers une offre managée (ex: PostgreSQL vers AWS RDS), adoption de conteneurs.<br><strong>Avantage :</strong> Réduit l’infogérance sans réécriture lourde.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Repurchase (Drop &amp; Shop)</h4>',
        '    <p>Abandon de l’application existante au profit d’une solution SaaS prête à l’emploi du marché (ex: remplacer un CRM développé en interne par Salesforce ou un ERP par Workday).<br><strong>Avantage :</strong> Zéro maintenance d’infrastructure.</p>',
        '  </div>',
        '</div>',
        '<div class="grid grid-3" style="margin-top:16px">',
        '  <div class="card">',
        '    <h4>4. Refactor / Re-architect</h4>',
        '    <p>Refonte complète de l’application vers une architecture cloud-native (microservices, serverless, bases NoSQL distribuées).<br><strong>Avantage :</strong> Scalabilité maximale, agilité, coûts optimaux à long terme.<br><strong>Inconvénient :</strong> Investissement initial et compétences élevés.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>5. Retain (Conserver)</h4>',
        '    <p>Maintien de l’application dans le centre de données existant on-premise car sa migration n’est pas rentable, présente des contraintes réglementaires fortes ou dépend de matériel spécifique.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>6. Retire (Décommissionner)</h4>',
        '    <p>Arrêt pur et simple des applications obsolètes, redondantes ou dont l’usage métier est devenu nul, permettant de libérer immédiatement des licences et des ressources.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Modélisation Financière : TCO sur 3 Ans et Transformation CAPEX -> OPEX',
      html: [
        '<p>L’arbitrage économique compare le coût total de possession (Total Cost of Ownership - TCO) sur un horizon d’investissement triennal classique :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Sur Site (Modèle CAPEX + OPEX)</h4>',
        '    <p>$$TCO_{onprem} = CAPEX_{initial} + 3 \\times OPEX_{annuel}$$<br>',
        '    - <strong>CAPEX :</strong> Achat serveurs, baies SAN, switches réseau, licences perpétuelles, travaux d’aménagement salle.<br>',
        '    - <strong>OPEX :</strong> Climatisation, électricité, loyer datacenter, contrats de maintenance matérielle constructeur, salaires des équipes de maintenance physique.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Dans le Cloud (Modèle 100% OPEX)</h4>',
        '    <p>$$TCO_{cloud} = Cout_{migration} + 3 \\times OPEX_{cloud}$$<br>',
        '    - <strong>Coût de migration :</strong> Conseil en architecture, refactoring, formation des équipes, double facturation temporaire.<br>',
        '    - <strong>OPEX Cloud :</strong> Facture mensuelle de consommation réelle mesurée à la seconde.<br>',
        '    - <strong>Économie nette :</strong> $Gain = TCO_{onprem} - TCO_{cloud}$, ROI en % $= (Gain / TCO_{onprem}) \\times 100$.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Culture FinOps et les Leviers Tarifaires Avancés',
      html: [
        '<p>Le FinOps (Financial Operations) est une discipline de gestion financière collaborative alliant ingénieurs, financiers et décideurs pour maximiser la valeur commerciale du Cloud :</p>',
        '<ul>',
        '  <li><strong>Instances À la Demande (On-Demand) :</strong> Facturation à la seconde sans aucun engagement de durée. Idéal pour les charges de travail courtes, les tests ponctuels et les pics de trafic imprévisibles, mais plein tarif catalogue.</li>',
        '  <li><strong>Instances Réservées (RI) &amp; Savings Plans :</strong> Engagement financier sur une durée de 1 an ou 3 ans en échange d’une remise massive de 30% à 72%. Indispensable pour couvrir le socle stable (baseline) des serveurs allumés en permanence 24h/24.</li>',
        '  <li><strong>Instances Spot :</strong> Utilisation des capacités de calcul excédentaires inoccupées des centres de données des hyperscalers, vendues avec des rabais spectaculaires allant jusqu’à 70% à 90%. En contrepartie, le fournisseur peut récupérer l’instance à tout moment avec un préavis de 2 minutes. Réservé aux traitements asynchrones, batchs de calcul et fermes de rendu tolérantes aux pannes.</li>',
        '  <li><strong>Gouvernance par les Tags (Showback / Chargeback) :</strong> Balisage obligatoire de chaque ressource Cloud (ex: <code>Projet=CRM</code>, <code>Environnement=Prod</code>, <code>CentreCout=Finance</code>) pour attribuer précisément la facture à chaque division de l’entreprise.</li>',
        '</ul>'
      ].join('\n')
    }
  ],
  methodTitle: 'Protocole d’Optimisation FinOps en 3 Phases',
  method: [
    'Phase Inform : Inventorier toutes les ressources, appliquer une politique de tags obligatoire et auditer la répartition des coûts.',
    'Éradiquer les ressources orphelines : supprimer les disques EBS non attachés, les snapshots périmés et les adresses IP statiques non utilisées.',
    'Analyser les profils d’utilisation : identifier les serveurs stables tournant 24h/24 et souscrire des Savings Plans / Instances Réservées.',
    'Basculer les traitements batch et pipelines de données asynchrones sur des flottes d’instances Spot.',
    'Phase Optimize : Réajuster la taille des instances (Rightsizing) pour que le taux d’utilisation CPU moyen atteigne 60% à 70%.',
    'Phase Operate : Définir des budgets d’alerte automatiques et instaurer des revues financières mensuelles avec les équipes de développement.'
  ],
  summary: [
    'Les 6 R de la migration applicative guident le choix technique : Rehost (rapide), Replatform (managé), Repurchase (SaaS), Refactor (cloud-native), Retain (sur site) et Retire (suppression).',
    'Le calcul de TCO sur 3 ans confronte les dépenses d’investissement lourdes sur site (CAPEX) aux dépenses de fonctionnement élastiques du Cloud (OPEX).',
    'Le FinOps structure la responsabilité financière partagée entre équipes techniques et directions financières.',
    'L’arbitrage tarifaire optimal combine : Instances Réservées pour le socle permanent, On-Demand pour les pics imprévisibles et Spot pour les calculs par lots interruptibles.'
  ],
  checklist: [
    'Je connais par cœur les 6 R et sais justifier le choix de l’un d’eux pour une application donnée.',
    'Je sais calculer un comparatif de TCO sur 3 ans incluant les coûts de migration.',
    'Je connais la différence tarifaire et opérationnelle entre On-Demand, Instances Réservées et Spot.',
    'Je sais expliquer pourquoi une instance Spot peut être interrompue avec un préavis de 2 minutes.',
    'Je comprends l’importance du balisage (tagging) pour le chargeback et la transparence financière.',
    'Je sais identifier et nettoyer les dépenses inutiles courantes dans un compte Cloud.'
  ],
  notions: [
    'Les 6 R de la migration applicative',
    'Total Cost of Ownership (TCO sur 3 ans)',
    'Transformation de CAPEX en OPEX',
    'Discipline FinOps (Inform, Optimize, Operate)',
    'Instances À la Demande (On-Demand)',
    'Instances Réservées (RI) et Savings Plans',
    'Instances Spot et gestion des interruptions',
    'Balisage des coûts (Tagging et Chargeback)'
  ],
  pitfalls: [
    'Faire un simple Rehost de serveurs surdimensionnés sur site vers le Cloud, provoquant une facture deux fois plus élevée qu’initialement.',
    'Souscrire des Instances Réservées sur 3 ans pour une application vouée à être décommissionnée ou refondue dans les 6 mois.',
    'Déployer une base de données de production critique sur des instances Spot sans réplication.',
    'Omettre d’étiqueter (taguer) les ressources dès leur création, rendant l’analyse de la facture impossible.'
  ],
  questions: [
    {
      stem: 'Dans la méthodologie des 6 R de la migration applicative, quelle stratégie consiste à migrer une machine virtuelle vers le Cloud sans modifier son code ou son architecture (Lift and Shift) ?',
      opts: [
        'Refactor',
        'Rehost',
        'Repurchase',
        'Retire'
      ],
      correct: 1,
      exp: 'Le Rehost (Lift and Shift) est la méthode de migration la plus rapide : elle déplace l’application telle quelle vers une machine virtuelle Cloud sans altération de code.'
    },
    {
      stem: 'Quelle stratégie des 6 R consiste à abandonner une application interne pour souscrire à un service SaaS clé en main du marché (ex: remplacer un webmail maison par Microsoft 365) ?',
      opts: [
        'Replatform',
        'Retain',
        'Repurchase',
        'Refactor'
      ],
      correct: 2,
      exp: 'Le Repurchase (aussi appelé « Drop and Shop ») substitue l’application existante par un logiciel en tant que service (SaaS) géré par un tiers.'
    },
    {
      stem: 'Quel terme financier désigne les dépenses d’investissement initiales en capital physique (achat de serveurs, locaux, switches) par opposition aux dépenses d’exploitation courantes ?',
      opts: [
        'OPEX',
        'CAPEX',
        'EBITDA',
        'ROI'
      ],
      correct: 1,
      exp: 'Le CAPEX (Capital Expenditure) représente les dépenses d’investissement immobilisées, amorties comptablement sur plusieurs années.'
    },
    {
      stem: 'Quel modèle tarifaire Cloud offre les plus fortes réductions (jusqu’à 70% à 90%) en contrepartie du risque que le fournisseur puisse réclamer l’instance avec un préavis de 2 minutes ?',
      opts: [
        'Instances À la Demande (On-Demand)',
        'Instances Réservées (RI) 1 an',
        'Instances Spot',
        'Instances Dédiées'
      ],
      correct: 2,
      exp: 'Les instances Spot commercialisent la capacité excédentaire temporaire des datacenters à prix cassé, mais peuvent être interrompues dès qu’un client à la demande en a besoin.'
    },
    {
      stem: 'Pour un serveur de base de données de production critique qui doit fonctionner en continu 24h/24 pendant les trois prochaines années, quelle option tarifaire offre le meilleur rapport coût/bénéfice ?',
      opts: [
        'Instances Spot',
        'Instances Réservées (RI) ou Savings Plans avec engagement 3 ans',
        'Instances À la Demande On-Demand',
        'Paiement à la transaction'
      ],
      correct: 1,
      exp: 'Les Instances Réservées avec engagement 3 ans réduisent la facture de plus de 50% à 70% pour des charges de base stables et prévisibles.'
    },
    {
      stem: 'Quelle pratique d’organisation FinOps consiste à associer des métadonnées (clés/valeurs) sur chaque ressource Cloud pour imputer les dépenses à un projet ou département précis ?',
      opts: [
        'Le Partitionnement réseau',
        'Le Balisage des coûts (Cost Allocation Tagging)',
        'La Virtualisation imbriquée',
        'L’Auto-scaling horizontal'
      ],
      correct: 1,
      exp: 'Le balisage (tagging) permet d’attribuer chaque dollar dépensé à une équipe, un environnement ou un projet, rendant possible le refacturation interne (Chargeback).'
    },
    {
      stem: 'Parmi les ressources suivantes, laquelle continue souvent d’engendrer des coûts silencieux dans un compte Cloud même après l’extinction de la machine virtuelle associée ?',
      opts: [
        'Le temps CPU de l’instance',
        'Le volume de stockage bloc persistant (ex: disque AWS EBS) attaché et non supprimé',
        'La mémoire vive RAM',
        'La bande passante réseau sortante inactive'
      ],
      correct: 1,
      exp: 'Les volumes de stockage disque persistant (EBS/Managed Disks) continuent d’être facturés pour la capacité allouée en Go/mois même si la VM associée est éteinte.'
    },
    {
      stem: 'Quelle action FinOps de « Rightsizing » consiste à adapter les ressources d’une instance à sa consommation réelle ?',
      opts: [
        'Remplacer une instance surdimensionnée tournant à 5% de CPU par un type d’instance plus petit et deux fois moins cher',
        'Changer la couleur de l’interface de gestion',
        'Migrer le code vers un autre langage de programmation',
        'Augmenter arbitrairement la RAM pour éviter les erreurs'
      ],
      correct: 0,
      exp: 'Le « Rightsizing » analyse la télémétrie réelle pour redimensionner au plus juste les instances surdimensionnées et supprimer le gaspillage financier.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les 6 R de la migration applicative ?',
      a: '1. Rehost, 2. Replatform, 3. Repurchase, 4. Refactor, 5. Retain, 6. Retire.'
    },
    {
      q: 'Quelle est la différence fondamentale entre CAPEX et OPEX ?',
      a: 'Le CAPEX est un investissement initial lourd immobilisé (achat de matériel), tandis que l’OPEX est une dépense opérationnelle récurrente payée au fur et à mesure de l’usage.'
    },
    {
      q: 'Qu’est-ce qu’une instance Spot ?',
      a: 'Une instance exploitant la capacité excédentaire inoccupée du fournisseur Cloud avec une remise allant jusqu’à 90%, mais pouvant être interrompue avec un préavis de 2 minutes.'
    },
    {
      q: 'Pour quel type de charge de travail les Instances Réservées sont-elles conçues ?',
      a: 'Pour le socle permanent prévisible (baseline) de machines tournant 24h/24 en production continue tout au long de l’année.'
    },
    {
      q: 'Quelles sont les 3 phases itératives du cycle FinOps ?',
      a: '1. Inform (visibilité et allocation des coûts), 2. Optimize (réduction du gaspillage et remises), 3. Operate (gouvernance continue et automatisation).'
    },
    {
      q: 'Pourquoi les disques EBS orphelins représentent-ils un piège budgétaire ?',
      a: 'Parce qu’ils continuent d’être facturés au giga-octet alloué chaque mois, même s’ils ont été détachés d’une machine virtuelle supprimée.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la définition des 6 R et la distinction comptable entre CAPEX et OPEX.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bonnes notions financières, consolidez les arbitrages On-Demand/Réservé/Spot et les piliers FinOps.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez les stratégies de migration applicative et l’optimisation financière FinOps.'
    }
  ]
};
