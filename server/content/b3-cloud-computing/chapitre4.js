/**
 * Chapitre 4 du cours « Cloud Computing B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Green IT, Efficacité Énergétique &amp; Métriques Environnementales',
  short: 'Green IT &amp; Métriques Énergétiques',
  toc: 'Indicateurs d’efficience datacenter PUE et DCiE, techniques de free-cooling et d’éco-conception, modélisation d’empreinte carbone (tCO2e), extinction automatique FinOps.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Le secteur numérique représente aujourd’hui environ 3% à 4% des émissions mondiales de gaz à effet de serre et absorbe près de 1% à 2% de l’électricité mondiale, une part qui croît rapidement avec l’essor de l’intelligence artificielle et du big data. Les centres de données consomment des quantités massives d’énergie, non seulement pour alimenter les processeurs, mais également pour dissiper la chaleur générée (systèmes de climatisation et chillers). L’ingénieur Cloud de niveau B3 doit intégrer les principes du Green IT et de la responsabilité numérique d’entreprise (RSE) : maîtriser les métriques standardisées (PUE, DCiE, CUE), mesurer l’empreinte carbone évitable lors d’une migration et automatiser l’extinction des ressources inactives.',
  objectives: [
    'calculer et interpréter les indicateurs normalisés PUE (Power Usage Effectiveness) et DCiE (Data Center Infrastructure Efficiency) ;',
    'analyser les techniques d’ingénierie thermique en datacenter : confinement d’allées (chaude/froide), free-cooling et refroidissement par immersion ;',
    'modéliser les gains d’émissions de gaz à effet de serre (tCO2e) permis par la mutualisation Cloud et les énergies renouvelables ;',
    'évaluer le cycle de vie complet du matériel informatique (émissions Scope 1, Scope 2 et Scope 3) ;',
    'mettre en place des politiques d’extinction automatique des environnements hors heures ouvrées (Auto-Shutdown FinOps) ;',
    'auditer et comparer l’empreinte carbone d’une charge de travail on-premise face aux régions Cloud des hyperscalers.'
  ],
  sections: [
    {
      title: 'Indicateurs d’Efficacité Énergétique : PUE et DCiE',
      html: [
        '<p>L’indicateur de référence mondial, standardisé par The Green Grid et l’ISO/IEC 30134-2, est le <strong>PUE (Power Usage Effectiveness)</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Formule et Interprétation du PUE</h4>',
        '    <p>$$PUE = \\frac{E_{totale}}{E_{IT}}$$<br>',
        '    - $E_{totale}$ : énergie totale entrant dans le bâtiment (serveurs, climatisation, onduleurs UPS, transformateurs, éclairage).<br>',
        '    - $E_{IT}$ : énergie utile consommée directement par le matériel informatique (serveurs, commutateurs réseau, baies de disques).<br>',
        '    - <em>Idéal théorique :</em> PUE = 1.0 (zéro énergie perdue en climatisation).<br>',
        '    - Salle informatique d’entreprise vieillissante : PUE = 1.8 à 2.5.<br>',
        '    - Hyperscaler moderne (AWS, Google, Microsoft) : PUE = 1.10 à 1.18.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>DCiE (Data Center Infrastructure Efficiency)</h4>',
        '    <p>Le DCiE représente la part directe d’énergie utile dédiée au calcul en pourcentage :<br>',
        '    $$DCiE = \\frac{E_{IT}}{E_{totale}} \\times 100 = \\frac{1}{PUE} \\times 100$$<br>',
        '    - Un PUE de 2.0 donne un DCiE de 50% (la moitié de l’électricité payée sert uniquement à refroidir).<br>',
        '    - Un PUE de 1.15 donne un DCiE de 87% d’énergie directement utile.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Techniques d’Ingénierie Thermique et Éco-Conception de Datacenter',
      html: [
        '<p>Pour abaisser le PUE sous le seuil d’excellence de 1.20, les ingénieurs exploitent des innovations thermiques avancées :</p>',
        '<ul>',
        '  <li><strong>Confinement d’allées chaude / allée froide (Containment) :</strong> Cloisonnement physique des flux d’air pour empêcher le mélange de l’air frais soufflé en façade des serveurs (allée froide à 20-24 °C) et de l’air chaud rejeté à l’arrière (allée chaude à 35-40 °C), augmentant le rendement des climatiseurs.</li>',
        '  <li><strong>Refroidissement naturel (Free-Cooling) :</strong> Utilisation de l’air extérieur frais ou de l’eau de mer/rivière pour refroidir le datacenter sans enclencher de compresseurs frigorifiques énergivores pendant la majeure partie de l’année (très utilisé dans les pays nordiques).</li>',
        '  <li><strong>Refroidissement par immersion liquide (Immersion Cooling) :</strong> Les serveurs sont directement plongés dans un fluide diélectrique non conducteur de chaleur. L’efficacité thermique surpasse l’air et permet d’atteindre des PUE records de 1.05.</li>',
        '  <li><strong>Serveurs personnalisés désossés (Open Compute Project) :</strong> Suppression de tout composant superflu (peintures, façades plastiques, voyants non indispensables) pour maximiser le flux d’air et l’efficience électrique.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Impact Carbone, Scopes 1-2-3 et Économie Circulaire FinOps',
      html: [
        '<p>L’analyse environnementale d’un système d’information évalue les émissions de gaz à effet de serre (GES) selon le protocole GHG (Greenhouse Gas Protocol) :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Scope 1 : Émissions Directes</h4>',
        '    <p>Combustion directe de carburant sur le site du datacenter : groupes électrogènes diesel de secours, fuites de fluides frigorigènes des climatiseurs.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Scope 2 : Émissions Indirectes Énergie</h4>',
        '    <p>Émissions liées à la production de l’électricité consommée par le datacenter (dépend directement du mix énergétique du pays : charbon vs nucléaire/renouvelable).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Scope 3 : Émissions Amont / Aval</h4>',
        '    <p>Extraction des terres rares, fabrication des puces de silicium, transport mondial des serveurs, fin de vie et recyclage des déchets électroniques (DEEE).</p>',
        '  </div>',
        '</div>',
        '<div class="box box--standard" style="margin-top:16px">',
        '  <div class="box__title"><svg class="ic" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Le Levier FinOps d’Extinction Automatique (Auto-Shutdown)</div>',
        '  <p>Dans la plupart des entreprises, les environnements de développement et de recette ne sont utilisés que pendant les heures ouvrées (environ 50 heures par semaine sur 168 heures totales). ' +
        'Leur extinction automatique le soir et le week-end permet d’économiser 118 heures de fonctionnement par semaine, soit <strong>plus de 70% d’énergie et de budget évités</strong> sur ces flottes.</p>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Protocole d’Audit Énergétique et Décarbonation d’un SI',
  method: [
    'Relever les consommations électriques globales et IT pour calculer le PUE réel actuel de l’infrastructure.',
    'Inventorier les serveurs sous-utilisés (taux CPU moyen inférieur à 10%) et les machines fantômes (zombie servers).',
    'Sélectionner des régions Cloud cibles alimentées par une électricité à faible intensité carbone (gCO2e/kWh).',
    'Concevoir des scripts d’extinction programmée (cron, AWS EventBridge, Azure Automation) sur les environnements hors production.',
    'Privilégier les architectures sans serveur (Serverless) où la consommation électrique est strictement corrélée à l’exécution réelle.',
    'Mesurer les gains dans un rapport d’émissions évité (tCO2e) exploitable pour le bilan RSE de l’organisation.'
  ],
  summary: [
    'Le PUE mesure le ratio d’énergie totale sur l’énergie IT utile ; l’objectif d’excellence moderne est inférieur à 1.20.',
    'Le DCiE est l’inverse du PUE en pourcentage, représentant la proportion d’électricité utilement exploitée pour le calcul.',
    'La migration Cloud réduit l’empreinte carbone grâce au haut taux d’occupation des serveurs hyperscale et aux contrats d’énergie renouvelable.',
    'Le Scope 3 (fabrication du matériel) représente une part majeure de l’impact environnemental global du numérique.',
    'L’extinction automatique des environnements de dev/test génère plus de 70% d’économies financières et énergétiques hebdomadaires.'
  ],
  checklist: [
    'Je sais calculer le PUE et le DCiE à partir de compteurs électriques en kWh.',
    'Je connais l’ordre de grandeur du PUE d’un hyperscaler (1.1 à 1.2) vs une salle classique (1.8 à 2.5).',
    'Je sais expliquer le fonctionnement du free-cooling et du confinement d’allées.',
    'Je connais la distinction entre Scopes 1, 2 et 3 du bilan carbone.',
    'Je sais calculer le gain hebdomadaire d’un script d’auto-shutdown sur une flotte de test.',
    'Je sais pourquoi le choix de la région géographique Cloud influe sur les émissions de CO2.'
  ],
  notions: [
    'Power Usage Effectiveness (PUE)',
    'Data Center Infrastructure Efficiency (DCiE)',
    'Confinement d’allée chaude et allée froide',
    'Refroidissement naturel (Free-Cooling)',
    'Émissions Scope 1, Scope 2 et Scope 3 (GHG Protocol)',
    'Intensité carbone du mix électrique (gCO2e/kWh)',
    'Extinction automatique FinOps (Auto-Shutdown)',
    'Serveurs fantômes (Zombie Servers)'
  ],
  pitfalls: [
    'Mesurer le PUE uniquement en plein hiver pour masquer un mauvais rendement estival dû à la climatisation.',
    'Oublier le Scope 3 (fabrication des serveurs) qui représente souvent 50% à 70% de l’empreinte carbone totale d’un composant IT.',
    'Laisser tourner des clusters de test Kubernetes 24h/24 le week-end par simple négligence de configuration.',
    'Penser que le Cloud est immatériel et magiquement neutre en carbone sans éco-conception logicielle.'
  ],
  questions: [
    {
      stem: 'Quelle formule définit rigoureusement le Power Usage Effectiveness (PUE) d’un centre de données ?',
      opts: [
        'Énergie IT / Énergie Totale',
        'Énergie Totale / Énergie IT',
        'Énergie Climatisation / Énergie Serveurs',
        'Nombre de serveurs / Consommation en Watts'
      ],
      correct: 1,
      exp: 'Le PUE est le quotient de l’énergie totale consommée par le bâtiment du datacenter divisée par l’énergie utile consommée par les équipements informatiques (IT).'
    },
    {
      stem: 'Si un centre de données enregistre une consommation totale de 200 000 kWh dont 100 000 kWh dédiés aux serveurs IT, que vaut son DCiE ?',
      opts: [
        '2.00%',
        '50.0%',
        '80.0%',
        '100.0%'
      ],
      correct: 1,
      exp: 'PUE = 200 000 / 100 000 = 2.0. DCiE = (1 / PUE) * 100% = (1 / 2.0) * 100% = 50.0%.'
    },
    {
      stem: 'Quel est l’objectif fondamental du confinement d’allées (hot/cold aisle containment) dans un datacenter ?',
      opts: [
        'Empêcher l’air froid soufflé en façade de se mélanger à l’air chaud rejeté à l’arrière des serveurs',
        'Empêcher les techniciens de pénétrer dans les travées sans badge',
        'Bloquer les ondes électromagnétiques émises par les serveurs',
        'Augmenter la vitesse de rotation des ventilateurs internes'
      ],
      correct: 0,
      exp: 'Le confinement sépare hermétiquement l’air frais et l’air chaud pour maximiser le rendement thermodynamique des systèmes de refroidissement.'
    },
    {
      stem: 'À quelle catégorie d’émissions (selon le protocole GHG) appartient l’électricité achetée sur le réseau public pour faire tourner les serveurs d’un datacenter ?',
      opts: [
        'Scope 1 (Émissions directes)',
        'Scope 2 (Émissions indirectes liées à l’énergie)',
        'Scope 3 (Autres émissions indirectes)',
        'Scope 0 (Émissions négligeables)'
      ],
      correct: 1,
      exp: 'Le Scope 2 englobe toutes les émissions indirectes liées à la production de l’électricité, de la chaleur ou de la vapeur acquise et consommée par l’organisation.'
    },
    {
      stem: 'Combien d’heures de fonctionnement hebdomadaires permet d’économiser l’extinction automatique des environnements de développement le soir et le week-end (base 50h ouvrées par semaine) ?',
      opts: [
        '50 heures',
        '118 heures',
        '168 heures',
        '70 heures'
      ],
      correct: 1,
      exp: 'Une semaine compte 168 heures (7 * 24). Si les instances ne tournent que pendant les 50 heures ouvrées, l’économie est de 168 - 50 = 118 heures par semaine (soit 70.2% d’heures évitées).'
    },
    {
      stem: 'En quoi consiste la technique de refroidissement appelée « Free-Cooling » ?',
      opts: [
        'Utiliser des ventilateurs gratuits fournis par les fabricants',
        'Exploiter l’air frais extérieur ou des cours d’eau naturels sans recourir aux compresseurs frigorifiques énergivores',
        'Couper la climatisation et tolérer une surchauffe des composants',
        'Plonger les serveurs dans de la glace sèche'
      ],
      correct: 1,
      exp: 'Le free-cooling exploite les conditions météorologiques extérieures favorables (air froid ambiant) pour refroidir les salles sans enclencher les groupes de froid frigorifiques.'
    },
    {
      stem: 'Comment qualifie-t-on un serveur en rack qui consomme de l’électricité 24h/24 mais n’héberge plus aucune charge utile ni utilisateur actif ?',
      opts: [
        'Un serveur fantôme (Zombie Server)',
        'Un serveur bare-metal',
        'Un serveur passerelle',
        'Un serveur de staging'
      ],
      correct: 0,
      exp: 'Les « serveurs zombies » ou fantômes continuent de dissiper de l’énergie et de réclamer de la climatisation alors qu’ils ont été abandonnés opérationnellement.'
    },
    {
      stem: 'Pourquoi une charge de travail exécutée dans une région Cloud en Suède ou en Norvège a-t-elle généralement une empreinte carbone opérationnelle bien plus faible qu’en Pologne ?',
      opts: [
        'Les serveurs y sont plus récents et moins chers',
        'Le mix électrique scandinave repose sur l’hydraulique décarboné, tandis que le mix polonais est dominé par le charbon',
        'La bande passante réseau y est plus rapide',
        'Le système d’exploitation Linux y consomme moins d’instructions'
      ],
      correct: 1,
      exp: 'L’intensité carbone de l’électricité (gCO2e/kWh) varie selon les pays : les régions alimentées par des énergies renouvelables émettent infiniment moins de GES que celles tributaires d’énergies fossiles.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la valeur idéale théorique du PUE d’un centre de données ?',
      a: '1.0 (ce qui signifie que 100% de l’énergie électrique est consommée par les équipements informatiques de calcul).'
    },
    {
      q: 'Comment calcule-t-on le DCiE à partir du PUE ?',
      a: 'DCiE = (1 / PUE) * 100%.'
    },
    {
      q: 'Qu’est-ce que le Scope 3 dans le bilan carbone d’un service Cloud ?',
      a: 'Toutes les émissions indirectes amont et aval, incluant l’extraction minière, la fabrication en usine des processeurs et le recyclage du matériel.'
    },
    {
      q: 'Quel est l’impact de la mutualisation Cloud sur le taux d’utilisation des processeurs ?',
      a: 'Sur site, les serveurs tournent souvent à 10-15% de charge moyenne. Dans le Cloud mutualisé, le taux d’occupation s’élève à 50-65%, réduisant le gaspillage de machines sous-utilisées.'
    },
    {
      q: 'Comment l’extinction automatique (Auto-Shutdown) contribue-t-elle au FinOps et au Green IT ?',
      a: 'En réduisant les heures de fonctionnement des environnements non critiques de 168h à 50h par semaine, générant plus de 70% d’économies financières et énergétiques.'
    },
    {
      q: 'Qu’est-ce que le refroidissement par immersion (Immersion Cooling) ?',
      a: 'Technique consistant à immerger les composants électroniques dans un fluide diélectrique thermique non conducteur, éliminant les ventilateurs et abaissant le PUE à ~1.05.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez les définitions de base du PUE, DCiE et la séparation des Scopes 1, 2 et 3.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, perfectionnez l’impact du mix électrique régional et les automatisations FinOps.'
    },
    {
      cls: 'high',
      text: '8/8 : Parfait ! Les enjeux Green IT, l’efficacité énergétique et la responsabilité numérique sont maîtrisés.'
    }
  ]
};
