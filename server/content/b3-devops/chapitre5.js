/**
 * Chapitre 5 du cours « DevOps B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Métriques DORA, Fiabilité Opérationnelle &amp; Gestion des Incidents',
  short: 'Métriques DORA &amp; Incidents',
  toc: 'Les cinq métriques DORA actuelles, analyse MTBF/MTTF/MTTR, rayon d’impact et post-mortem sans blâme.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Les recherches DORA étudient la performance de livraison et ses facteurs. Leur modèle a évolué : au 30 octobre 2026, il présente cinq métriques. Elles se lisent dans le contexte de l’équipe et ne constituent ni une note individuelle ni une échelle universelle de maturité. Ce chapitre aborde aussi la fiabilité, le rayon d’impact et la gestion des incidents.',
  objectives: [
    'maîtriser les conclusions scientifiques du programme de recherche DORA et du livre Accelerate ;',
    'décrire les cinq métriques actuelles DORA et les interpréter dans leur contexte ;',
    'établir les équations formelles de fiabilité matérielle et logicielle : MTBF, MTTF, MTTR et disponibilité intrinsèque ;',
    'modéliser le rayon d’impact (Blast Radius) et les dépendances en cascade d’une architecture distribuée ;',
    'structurer un protocole de gestion d’incident critique et rédiger un post-mortem sans blâme (Blameless Post-Mortem) ;',
    'analyser et résoudre méthodologiquement des calculateurs DORA, de disponibilité MTBF/MTTR et d’évaluation du risque de release.'
  ],
  sections: [
    {
      title: 'Le Programme DORA &amp; La Démonstration Scientifique d’Accelerate',
      html: [
        '<p>Le programme <strong>DORA (DevOps Research and Assessment)</strong> étudie les pratiques et la performance de livraison logicielle. Les résultats d’enquête sont à interpréter selon leur période et leur population :</p>',
        box('standard', 'L’Enseignement Majeur de DORA', [
          '<p>Les recherches montrent que rapidité et stabilité peuvent coexister. Une corrélation observée ne garantit pas ce résultat pour toute équipe et ne démontre pas à elle seule une causalité.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Les cinq métriques de performance DORA',
      html: [
        '<p>Le guide DORA consulté le 30 octobre 2026 présente cinq métriques pour observer la livraison dans son contexte :</p>',
        '<ul>',
        '  <li><strong>Deployment frequency :</strong> fréquence des déploiements.</li>',
        '  <li><strong>Change lead time :</strong> délai entre commit et production.</li>',
        '  <li><strong>Failed deployment recovery time :</strong> temps de rétablissement après un déploiement nécessitant une intervention immédiate.</li>',
        '  <li><strong>Change fail rate :</strong> proportion de déploiements nécessitant une intervention immédiate.</li>',
        '  <li><strong>Deployment rework rate :</strong> proportion de déploiements non planifiés à la suite d’un incident.</li>',
        '</ul>',
        '<p>Les profils de recherche et les définitions ont évolué. Ne pas appliquer des seuils fixes à toutes les équipes ; un MTTR général d’incident n’est pas nécessairement le temps de rétablissement d’un déploiement échoué.</p>'
      ].join('\n')
    },
    {
      title: 'Modélisation Mathématique de la Fiabilité : MTBF, MTTF &amp; MTTR',
      html: [
        '<p>Pour quantifier rigoureusement la disponibilité opérationnelle d’une infrastructure ou d’un microservice, l’ingénierie de fiabilité s’appuie sur trois variables temporelles fondamentales :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>MTTF (Mean Time To Failure)</h4>',
        '    <p>Temps moyen écoulé durant lequel le système fonctionne de manière continue et nominale avant qu’une panne ne survienne :</p>',
        '    $$\\text{MTTF} = \\frac{\\text{Durée totale opérationnelle}}{\\text{Nombre de défaillances}}$$',
        '  </div>',
        '  <div class="card">',
        '    <h4>MTTR (Mean Time To Repair)</h4>',
        '    <p>Temps moyen nécessaire à l’équipe pour détecter, diagnostiquer, corriger et rétablir le service après une défaillance :</p>',
        '    $$\\text{MTTR} = \\frac{\\text{Durée totale d’indisponibilité}}{\\text{Nombre de défaillances}}$$',
        '  </div>',
        '  <div class="card">',
        '    <h4>MTBF (Mean Time Between Failures)</h4>',
        '    <p>Temps moyen entre deux défaillances successives sur un système réparable (somme du temps de fonctionnement et de réparation) :</p>',
        '    $$\\text{MTBF} = \\text{MTTF} + \\text{MTTR}$$',
        '  </div>',
        '</div>',
        '<h4 style="margin-top:20px">Calcul de la Disponibilité Opérationnelle ($A$)</h4>',
        '<p>Le ratio de disponibilité intrinsèque du système s’exprime par le rapport entre le temps opérationnel réel et le temps total :</p>',
        '$$A = \\frac{\\text{MTTF}}{\\text{MTTF} + \\text{MTTR}} = \\frac{\\text{MTBF} - \\text{MTTR}}{\\text{MTBF}}$$',
        '<p>Par exemple, si un service fonctionne en moyenne 720 heures entre deux pannes ($MTTF = 720\\,\\text{h}$) et requiert 30 minutes de réparation ($MTTR = 0.5\\,\\text{h}$), sa disponibilité théorique vaut :</p>',
        '$$A = \\frac{720}{720 + 0.5} = \\frac{720}{720.5} \\approx 0.999306\\,\\text{ (soit } 99.93\\,\\%)$$',
        box('tip', 'Le Focus SRE : Réduire le MTTR plutôt que chercher un MTBF infini', [
          '<p>Dans les systèmes distribués complexes, les pannes logicielles, matérielles ou réseau sont inévitables. Chercher un système invulnérable (MTTF infini) coûte des sommes astronomiques pour des gains marginaux. La philosophie DevOps/SRE préconise d’investir prioritairement dans l’<strong>observabilité et la réduction drastique du MTTR</strong> (détection instantanée, bascule automatique, rollbacks en 1 clic).</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Rayon d’Impact (Blast Radius) &amp; Post-Mortem Sans Blâme',
      html: [
        '<p>Le <strong>Rayon d’Impact (Blast Radius)</strong> désigne l’étendue maximale des dommages potentiels (services indisponibles, utilisateurs touchés, perte de données) causés par la défaillance d’un composant donné. Une architecture résiliente s’efforce de compartimenter le système pour limiter ce rayon :</p>',
        '<ul>',
        '  <li><strong>Cloisonnement par Bulkheads (Cloisons étanches) :</strong> pools de connexions et threads séparés pour qu’une défaillance d’un microservice non critique n’asphyxie pas le cœur transactionnel ;</li>',
        '  <li><strong>Disjoncteurs logiques (Circuit Breakers) :</strong> coupure automatique des appels vers un service dégradé pour éviter les pannes en cascade (Cascading Failures) ;</li>',
        '  <li><strong>Déploiements par cellules (Cell-based Architecture) :</strong> partitionnement des utilisateurs par silos indépendants étanches.</li>',
        '</ul>',
        '<h4 style="margin-top:20px">Le Post-Mortem Sans Blâme (Blameless Post-Mortem)</h4>',
        '<p>Après tout incident critique de production, l’équipe organise une rétrospective formalisée respectant des principes stricts :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Ce qu’un Post-Mortem N’EST PAS</h4>',
        '    <p>Une séance de recherche de coupable, une sanction disciplinaire ou un constat fataliste d’« erreur humaine ». L’erreur humaine est le symptôme de défaillances systémiques de conception ou d’outillage, jamais la cause racine.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Ce qu’un Post-Mortem DOIT PRODUIRE</h4>',
        '    <p>Une chronologie factuelle seconde par seconde, la compréhension des signaux d’alerte manqués, l’analyse des facteurs contributifs multiples, et une liste d’actions préventives concrètes (automatisation, alertes, garde-fous).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Protocole d’Évaluation de la Performance DORA &amp; de Gestion de Crise',
  method: [
    'Instrumenter les dépôts Git et les plateformes de production pour collecter les horodatages de livraison et d’incident.',
    'Calculer la fréquence de déploiement (DF) et le Lead Time for Changes (LTTC) pour caractériser le débit.',
    'Définir le périmètre des déploiements et incidents, puis mesurer les taux d’échec et de reprise ainsi que le temps de rétablissement après déploiement échoué.',
    'Interpréter les tendances dans leur contexte, sans attribuer de rang universel ni comparer directement les équipes.',
    'Modéliser les équations de fiabilité du système (MTBF, MTTF, MTTR et disponibilité opérationnelle A).',
    'Conduire un post-mortem sans blâme (Blameless) et cartographier le rayon d’impact (Blast Radius).'
  ],
  summary: [
    'Les recherches DORA étudient les liens entre performance de livraison et conditions de travail ; corrélation ne signifie pas causalité automatique.',
    'Le modèle consulté en octobre 2026 utilise cinq métriques : fréquence, délai de changement, rétablissement après déploiement échoué, taux d’échec et taux de reprise.',
    'Les seuils d’un exercice ou d’une enquête ne sont pas un classement universel.',
    'La disponibilité A vaut MTTF / (MTTF + MTTR) : réduire le MTTR est plus rentable que chercher un MTTF infini.',
    'Le cloisonnement en cloisons étanches (Bulkheads) et disjoncteurs limite le rayon d’impact (Blast Radius).',
    'Le post-mortem sans blâme traite l’erreur humaine comme un symptôme pour corriger les défaillances de conception.'
  ],
  checklist: [
    'Je connais les auteurs et la méthodologie scientifique du programme de recherche DORA.',
    'Je sais décrire les cinq métriques DORA et leur périmètre.',
    'Je sais expliquer pourquoi un seuil générique ne suffit pas à classer une équipe.',
    'Je sais calculer le MTBF, le MTTF, le MTTR et le taux de disponibilité global d’un composant.',
    'Je sais définir et compartimenter le Blast Radius d’un microservice.',
    'Je sais animer un post-mortem sans blâme et formaliser des actions préventives robustes.'
  ],
  notions: [
    'Programme de recherche DORA &amp; Accelerate',
    'Deployment Frequency (DF)',
    'Lead Time for Changes (LTTC)',
    'Change Failure Rate (CFR)',
    'Failed Deployment Recovery Time et Deployment Rework Rate',
    'Équations de fiabilité MTBF, MTTF, MTTR',
    'Rayon d’impact (Blast Radius) &amp; Bulkheads',
    'Post-mortem sans blâme (Blameless)'
  ],
  pitfalls: [
    'Croire que ralentir la cadence de livraison logicielle permet d’augmenter la stabilité des systèmes de production.',
    'Utiliser des indicateurs de livraison comme une note individuelle ou une compétition entre équipes.',
    'Investir des budgets disproportionnés dans un MTTF infini au détriment de l’observabilité et de la réduction drastique du MTTR.',
    'Considérer l’erreur humaine comme la cause racine d’un incident majeur plutôt que comme le symptôme d’un manque de garde-fous systémiques.'
  ],
  questions: [
    {
      stem: 'Quelle conclusion scientifique majeure ressort des recherches DORA (DevOps Research and Assessment) publiées dans Accelerate ?',
      opts: [
        'Pour éviter les pannes, il est scientifiquement prouvé qu’il faut réduire les déploiements à un par trimestre',
        'Rapidité de livraison et stabilité peuvent coexister, sans garantie automatique pour chaque équipe',
        'L’automatisation des tests augmente les coûts de développement sans aucun gain mesurable',
        'Le langage de programmation est le seul facteur expliquant la réussite d’un projet'
      ],
      correct: 1,
      exp: 'Les recherches rapportent que rapidité et stabilité peuvent coexister ; il faut examiner le contexte et éviter de déduire une causalité automatique.'
    },
    {
      stem: 'Selon le guide DORA consulté en octobre 2026, quel ensemble présente les cinq métriques de livraison ?',
      opts: [
        'Nombre de lignes de code, Nombre de bugs, Heures supplémentaires, Coût des serveurs',
        'Deployment Frequency, Change Lead Time, Failed Deployment Recovery Time, Change Fail Rate et Deployment Rework Rate',
        'Vitesse CPU, Bande passante réseau, Taux de mémoire vive, Taille du disque dur',
        'Nombre de réunions, Points de vélocité Scrum, Nombre de commits, Salaire moyen'
      ],
      correct: 1,
      exp: 'Le guide actuel décrit cinq métriques ; un MTTR général ne correspond pas nécessairement au rétablissement après un déploiement échoué.'
    },
    {
      stem: 'Une équipe réalise 200 déploiements en production sur une année. Parmi ceux-ci, 10 déploiements ont provoqué un incident nécessitant un retour arrière immédiat. Quel est le Change Failure Rate (CFR) ?',
      opts: [
        '20%',
        '10%',
        '5%',
        '2%'
      ],
      correct: 2,
      exp: 'CFR = (Nombre de déploiements nécessitant une intervention / Nombre total de déploiements) × 100 = (10 / 200) × 100 = 5 %. Ce chiffre ne classe pas universellement l’équipe.'
    },
    {
      stem: 'Dans la modélisation de fiabilité d’un système réparable, que vaut le MTBF (Mean Time Between Failures) ?',
      opts: [
        'MTBF = MTTF - MTTR',
        'MTBF = MTTF + MTTR',
        'MTBF = MTTF * MTTR',
        'MTBF = MTTR / MTTF'
      ],
      correct: 1,
      exp: 'Le MTBF est le temps moyen entre deux pannes consécutives, soit la somme du temps moyen de fonctionnement nominal (MTTF) et du temps moyen de réparation (MTTR).'
    },
    {
      stem: 'Si un serveur fonctionne en moyenne 990 heures sans défaillance (MTTF) et nécessite 10 heures de maintenance pour redémarrer (MTTR), quelle est sa disponibilité opérationnelle intrinsèque ?',
      opts: [
        '90%',
        '95%',
        '99%',
        '99.9%'
      ],
      correct: 2,
      exp: 'Disponibilité A = MTTF / (MTTF + MTTR) = 990 / (990 + 10) = 990 / 1000 = 0.99, soit exactement 99.0% de disponibilité.'
    },
    {
      stem: 'Qu’appelle-t-on le « Blast Radius » (rayon d’impact) d’une défaillance dans une architecture distribuée ?',
      opts: [
        'La distance physique en mètres entre les serveurs dans la salle informatique',
        'L’étendue maximale des dommages et des services affectés par la panne d’un composant donné',
        'La vitesse de propagation des ondes radio du Wi-Fi',
        'La consommation électrique lors d’un pic de calcul'
      ],
      correct: 1,
      exp: 'Le Blast Radius mesure l’impact collatéral d’une défaillance. Une architecture moderne compartimente ses composants (via cloisons étanches et circuit breakers) pour minimiser ce rayon.'
    },
    {
      stem: 'Quel est le principe directeur fondamental d’un « Blameless Post-Mortem » (post-mortem sans recherche de coupable) ?',
      opts: [
        'Cacher la panne à la direction générale',
        'Considérer que les ingénieurs agissent de bonne foi et auditer les défaillances systémiques de conception pour empêcher qu’une erreur humaine ne suffise à faire tomber le système',
        'Payer une prime financière à la personne qui a provoqué la panne',
        'Remplacer systématiquement tous les membres de l’équipe de développement'
      ],
      correct: 1,
      exp: 'L’erreur humaine est une conséquence des failles d’architecture et de l’absence de garde-fous. Le post-mortem sans blâme s’attaque aux causes profondes organisationnelles et techniques.'
    },
    {
      stem: 'Pourquoi la philosophie SRE préconise-t-elle d’investir prioritairement dans la réduction du MTTR plutôt que dans la recherche d’un MTTF infini ?',
      opts: [
        'Car réparer un incident est toujours gratuit',
        'Car dans les systèmes complexes distribués, les pannes sont inévitables ; la capacité à restaurer le service en quelques minutes confère une résilience supérieure à un coût maîtrisé',
        'Car les exploitants préfèrent être appelés la nuit',
        'Car les disques durs ne tombent jamais en panne'
      ],
      correct: 1,
      exp: 'Tenter de concevoir un système qui ne tombe jamais en panne coûte des sommes exponentielles. Automatiser la détection et la restauration rapide (MTTR très faible) maximise la disponibilité réelle.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que le programme de recherche DORA et que démontre le livre Accelerate ?',
      a: 'Un programme d’études sur les pratiques et la livraison logicielle ; ses résultats montrent que rapidité et stabilité peuvent coexister sans le garantir pour chaque équipe.'
    },
    {
      q: 'Quelles sont les cinq métriques DORA actuelles ?',
      a: 'Deployment Frequency, Change Lead Time, Failed Deployment Recovery Time, Change Fail Rate et Deployment Rework Rate (guide consulté le 30 octobre 2026).'
    },
    {
      q: 'Quelle est la relation mathématique entre MTBF, MTTF et MTTR ?',
      a: 'MTBF (Mean Time Between Failures) = MTTF (Mean Time To Failure) + MTTR (Mean Time To Repair).'
    },
    {
      q: 'Comment calcule-t-on la disponibilité intrinsèque d’un système ?',
      a: 'Disponibilité = MTTF / (MTTF + MTTR) = (MTBF - MTTR) / MTBF.'
    },
    {
      q: 'Qu’appelle-t-on le « Blast Radius » (rayon d’impact) ?',
      a: 'La proportion d’utilisateurs ou de services affectée lorsqu’un composant tombe en panne. L’ingénierie vise à compartimenter le système pour le restreindre au minimum.'
    },
    {
      q: 'Qu’est-ce qu’un Post-Mortem « Sans Blâme » (Blameless) ?',
      a: 'Une analyse d’incident postulant la bonne foi des ingénieurs, axée sur les faiblesses systémiques et les garde-fous manquants plutôt que sur la recherche punitive d’un coupable.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez les cinq métriques DORA et les définitions de base de MTBF, MTTF et MTTR.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, revoyez les formules de disponibilité et la notion de Blast Radius.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez parfaitement les métriques scientifiques DORA et l’ingénierie de résilience.'
    }
  ]
};
