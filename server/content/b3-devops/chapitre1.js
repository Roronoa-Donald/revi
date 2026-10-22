/**
 * Chapitre 1 du cours « DevOps B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Origines, Culture &amp; Principes Fondamentaux (Lean, Silos Dev/Ops &amp; CALMS)',
  short: 'Culture &amp; Principes Lean',
  toc: 'Rupture du mur de la confusion Dev/Ops, principes du Lean Manufacturing, les 3 Voies de Gene Kim, modèle CAMS/CALMS et cartographie de la chaîne de valeur (VSM).',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Dans les organisations informatiques traditionnelles, les équipes de développement (Dev) et les équipes d’exploitation (Ops) opèrent dans des silos étanches et poursuivent des incitations diamétralement opposées : les premières sont récompensées pour la vitesse de livraison de nouvelles fonctionnalités, tandis que les secondes sont évaluées sur la stabilité et la disponibilité de l’infrastructure de production. Cette scission historique crée ce que l’industrie qualifie de « mur de la confusion » : déploiements nocturnes manuels chaotiques, retards abyssaux, conflits interpersonnels et réactivité médiocre face aux pannes. Pour réussir la transformation DevOps d’une entreprise, l’ingénieur de Bachelor 3 doit comprendre les fondements théoriques issus du Lean Manufacturing (Toyota Production System), assimiler les 3 Voies de Gene Kim popularisées par The Phoenix Project, et appliquer rigoureusement le modèle CALMS pour éliminer les gaspillages organisationnels.',
  objectives: [
    'analyser les causes et conséquences systémiques du mur de la confusion entre développeurs et exploitants ;',
    'comprendre l’héritage du Lean Manufacturing (Kaizen, élimination des 3M : Muda, Muri, Mura) appliqué au logiciel ;',
    'maîtriser les 3 Voies de Gene Kim (The Phoenix Project) : optimisation du flux, boucles de rétroaction rapides et culture d’expérimentation ;',
    'évaluer et mesurer la maturité d’une organisation selon les 5 piliers du modèle CALMS (Culture, Automation, Lean, Measurement, Sharing) ;',
    'construire une cartographie de chaîne de valeur (Value Stream Mapping) et calculer l’efficience de flux (Flow Efficiency) ;',
    'automatiser de manière méthodique l’analyse des gaspillages de flux et le calcul d’indicateurs d’alignement opérationnel.'
  ],
  sections: [
    {
      title: 'Le Mur de la Confusion : Anatomie d’une Crise Organisationnelle',
      html: [
        '<p>L’avènement du mouvement DevOps (initié en 2009 par Patrick Debois lors des premiers DevOpsDays de Gand) répond à une crise systémique au sein des départements informatiques. Traditionnellement, le cycle de vie logiciel est scindé en deux entités mutuellement méfiantes :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Équipes de Développement (Dev)</h4>',
        '    <p>Leur mission est d’innover rapidement en réponse aux demandes des utilisateurs métier. Évaluées sur le volume et la vélocité de code produit, elles ont intérêt à pousser de nouvelles versions le plus fréquemment possible, parfois au détriment des contraintes de sécurité et d’exploitation.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les Équipes d’Exploitation (Ops)</h4>',
        '    <p>Leur responsabilité contractuelle est de garantir la disponibilité (SLA 99.9%), la performance et la sécurité des serveurs. Toute modification introduisant un risque potentiel de panne, les exploitants développent un réflexe conservateur de blocage, imposant des comités de validation (CAB) lourds et des fenêtres de gel de production.</p>',
        '  </div>',
        '</div>',
        '<p style="margin-top:16px">Entre les deux s’élève le <strong>Mur de la Confusion</strong> : le code compilé est « jeté par-dessus le mur » sous la forme d’archives avec des documentations d’installation approximatives. En cas de dysfonctionnement en production, la recherche de coupables (blame game) remplace l’analyse factuelle, augmentant le temps moyen de réparation (MTTR) et creusant la dette technique.</p>'
      ].join('\n')
    },
    {
      title: 'L’Héritage du Lean Software Development &amp; La Chasse aux Gaspillages (Muda)',
      html: [
        '<p>Le socle conceptuel de DevOps provient directement du <strong>Système de Production Toyota (TPS)</strong> et des principes du <em>Lean Manufacturing</em> théorisés par Taiichi Ohno et adaptés à l’ingénierie logicielle par Mary et Tom Poppendieck. Le Lean postule que toute activité qui n’apporte pas de valeur directe perçue par le client final constitue un gaspillage (<strong>Muda</strong>) qui doit être impérativement éliminé.</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Muda (Gaspillage)</h4>',
        '    <p>Les 7 gaspillages logiciels : fonctionnalités inutilisées (over-processing), travail en cours excessif (WIP), transferts manuels inter-équipes, attentes de validation, changements de contexte (multi-tâches), défauts/bogues et processus bureaucratiques superflus.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Muri (Surcharge)</h4>',
        '    <p>La surcharge excessive imposée aux équipes ou aux serveurs. Un système exploité à 100% de sa capacité voit son temps d’attente tendre vers l’infini selon la théorie des files d’attente (loi de Kingman).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Mura (Irrégularité)</h4>',
        '    <p>L’irrégularité et la variabilité du flux de travail : alternance de périodes d’inactivité et de livraisons massives créant des goulets d’étranglement critiques lors des mises en production.</p>',
        '  </div>',
        '</div>',
        box('tip', 'La Loi de Little appliquée au Logiciel', [
          '<p>Formulée par John Little en 1961 : <code>WIP = Throughput × Lead Time</code> (le volume de travail en cours est proportionnel au débit et au temps de traversée). Pour réduire drastiquement le délai de livraison (Lead Time), il ne faut pas travailler plus vite sous stress, mais <strong>réduire drastiquement la taille des lots et le nombre de tâches en cours simultanées (limiter le WIP)</strong>.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Les Trois Voies de Gene Kim (The Phoenix Project)',
      html: [
        '<p>Dans l’ouvrage de référence <em>The Phoenix Project</em> (Gene Kim, Kevin Behr, George Spafford), la philosophie DevOps est articulée autour de <strong>Trois Voies (The Three Ways)</strong> décrivant les dynamiques fondamentales du changement :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. La Première Voie : Le Flux (Flow)</h4>',
        '    <p>Accélérer la circulation fluide de la valeur depuis le développement (Left) jusqu’aux opérations et aux clients (Right). Cela implique de rendre le travail visible (tableaux Kanban), réduire la taille des lots (small batches), éliminer les goulots d’étranglement et automatiser la chaîne de construction.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. La Deuxième Voie : Les Boucles de Rétroaction (Feedback)</h4>',
        '    <p>Créer des boucles de rétroaction ultra-courtes de la droite vers la gauche (des opérations vers le développement). Tout problème détecté en aval (incident, dégradation de latence) doit immédiatement alerter les développeurs et interrompre la chaîne de production (principe de l’Andon Cord de Toyota) pour corriger à la source.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. La Troisième Voie : L’Expérimentation &amp; l’Apprentissage</h4>',
        '    <p>Instaurer une culture organisationnelle fondée sur l’expérimentation continue, la prise de risques mesurée, la tolérance à l’erreur et l’apprentissage perpétuel. La répétition et l’entraînement quotidien (Game Days, Chaos Engineering) transforment la maîtrise en compétence réflexe.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Le Modèle CALMS &amp; La Cartographie de la Chaîne de Valeur (VSM)',
      html: [
        '<p>Formulé par Damon Edwards et John Willis (avec l’ajout du Lean par Jez Humble), l’acronyme <strong>CALMS</strong> sert de grille d’audit d’excellence pour piloter la transformation DevOps :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th style="width:20%">Pilier CALMS</th>',
        '      <th style="width:40%">Principe directeur</th>',
        '      <th style="width:40%">Pratiques concrètes</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>C — Culture</strong></td>',
        '      <td>Responsabilité partagée, empathie inter-équipes et post-mortem sans blâme (blameless).</td>',
        '      <td>Équipes pluridisciplinaires feature-teams, rotation d’astreinte partagée entre Dev et Ops.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>A — Automation</strong></td>',
        '      <td>Remplacement des tâches répétitives et manuelles sujettes à l’erreur humaine par du code.</td>',
        '      <td>Pipelines CI/CD, Infrastructure as Code, tests unitaires et d’intégration automatisés.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>L — Lean</strong></td>',
        '      <td>Élimination des gaspillages, réduction du WIP et flux continu par petits incréments.</td>',
        '      <td>Value Stream Mapping, limitation stricte du WIP sur les boards Kanban, commits fréquents.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>M — Measurement</strong></td>',
        '      <td>Pilotage par des métriques factuelles objectives, techniques et métier.</td>',
        '      <td>Supervision Prometheus/Grafana, suivi des métriques DORA et indicateurs de conversion métier.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>S — Sharing</strong></td>',
        '      <td>Transparence totale, capitalisation des connaissances et documentation vivante.</td>',
        '      <td>Rétrospectives ouvertes, wikis internes vivants, partage de composants open source internes.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',
        '<h4 style="margin-top:20px">La Cartographie de la Chaîne de Valeur (Value Stream Mapping)</h4>',
        '<p>Le <strong>Value Stream Mapping (VSM)</strong> analyse chronologiquement chaque étape requise pour convertir une exigence métier en fonctionnalité opérationnelle. Deux grandeurs temporelles fondamentales s’en dégagent :</p>',
        '<ul>',
        '  <li><strong>Lead Time ($LT$) :</strong> Temps total calendaire écoulé entre l’émission du besoin et son déploiement effectif en production.</li>',
        '  <li><strong>Process Time ($PT$) :</strong> Temps réel durant lequel un contributeur crée activement de la valeur (conception, codage, tests actifs).</li>',
        '</ul>',
        '<p>L’<strong>Efficience de Flux (Flow Efficiency)</strong> se définit par :</p>',
        '$$\\text{Flow Efficiency (\\%)} = \\frac{\\text{Process Time}}{\\text{Lead Time}} \\times 100$$',
        '<p>Dans une DSI traditionnelle, le Flow Efficiency est couramment inférieur à <strong>5%</strong> : 95% du temps est perdu dans des files d’attente inactives. L’objectif DevOps est de hisser ce ratio au-delà de 25% à 40% en éliminant les temps de latence intermédiaires.</p>'
      ].join('\n')
    }
  ],
  methodTitle: 'Démarche d’Audit &amp; de Transformation Culturelle DevOps',
  method: [
    'Cartographier la chaîne de valeur (Value Stream Mapping) de bout en bout, de l’idée au déploiement en production.',
    'Mesurer les temps réels : Lead Time calendaire total et Process Time de création active de valeur.',
    'Calculer l’efficience de flux (Flow Efficiency) et quantifier la part des temps d’attente improductifs (Muda).',
    'Identifier et limiter drastiquement le travail en cours (WIP) sur les tableaux de bord visuels Kanban.',
    'Évaluer la maturité organisationnelle selon les 5 piliers CALMS (Culture, Automation, Lean, Measurement, Sharing).',
    'Instaurer des rituels de post-mortem sans blâme (Blameless) pour convertir les incidents en améliorations d’ingénierie.'
  ],
  summary: [
    'Le mur de la confusion naît des incitations divergentes : vélocité pour les Devs contre stabilité pour les Ops.',
    'DevOps hérite du Lean Manufacturing : éliminer les 7 gaspillages (Muda) et réguler le flux continu (loi de Little).',
    'Les 3 Voies de Gene Kim structurent le progrès : fluidifier le flux gauche-droite, raccourcir les feedbacks droite-gauche, et pratiquer l’expérimentation continue.',
    'L’acronyme CALMS (Culture, Automation, Lean, Measurement, Sharing) sert de cadre de référence d’évaluation.',
    'L’efficience de flux compare le temps de travail effectif au délai total traversé (souvent < 5% en silo traditionnel).'
  ],
  checklist: [
    'Je sais expliquer les causes structurelles du mur de la confusion entre Dev et Ops.',
    'Je connais les 3M du Lean : Muda (gaspillage), Muri (surcharge) et Mura (variabilité).',
    'Je sais énoncer et illustrer les Trois Voies de The Phoenix Project.',
    'Je maîtrise les 5 piliers du modèle d’audit CALMS.',
    'Je sais calculer le Lead Time, le Process Time et le Flow Efficiency d’une chaîne de valeur.',
    'Je sais animer un post-mortem sans recherche de coupable (blameless).'
  ],
  notions: [
    'Mur de la confusion Dev/Ops',
    'Lean Manufacturing &amp; TPS',
    'Élimination des Mudas (Gaspillages)',
    'Loi de Little &amp; Limite du WIP',
    'Les 3 Voies de Gene Kim',
    'Modèle d’évaluation CALMS',
    'Value Stream Mapping (VSM)',
    'Efficience de flux (Flow Efficiency)'
  ],
  pitfalls: [
    'Réduire DevOps à une boîte à outils logiciels (CI/CD, Docker) en ignorant la refonte culturelle et organisationnelle.',
    'Conserver des comités de validation des changements (CAB) manuels et bureaucratiques qui recréent les silos et annihilent le Lead Time.',
    'Chercher à travailler plus vite sous stress sans limiter le travail en cours (WIP) ni s’attaquer aux causes profondes des temps d’attente.',
    'Organiser des séances de post-mortem orientées vers la punition individuelle plutôt que vers l’analyse systémique sans blâme.'
  ],
  questions: [
    {
      stem: 'Quelle contradiction structurelle est à l’origine du « mur de la confusion » entre développeurs et exploitants ?',
      opts: [
        'Les développeurs utilisent Linux tandis que les exploitants utilisent Windows',
        'Les développeurs sont évalués sur le changement rapide tandis que les exploitants sont évalués sur la stabilité et la disponibilité',
        'Les exploitants n’ont pas d’accès réseau aux dépôts Git',
        'Les développeurs refusent d’écrire des tests unitaires'
      ],
      correct: 1,
      exp: 'Le mur de la confusion provient d’incitations divergentes : les Devs sont poussés à livrer du changement continu, tandis que les Ops sont pénalisés à chaque interruption de service et recherchent l’immobilité.'
    },
    {
      stem: 'Selon les principes du Lean Software Development, que représente un « Muda » ?',
      opts: [
        'Une optimisation du compilateur',
        'Une activité ou une attente qui consomme des ressources sans apporter de valeur directe pour le client',
        'Une méthode de chiffrement asymétrique',
        'Un indicateur de satisfaction des développeurs'
      ],
      correct: 1,
      exp: 'Le terme japonais Muda désigne tout gaspillage (attentes, sur-qualité inutile, transferts manuels, reprise d’erreurs) ne générant aucune valeur perçue par l’utilisateur final.'
    },
    {
      stem: 'D’après la Première Voie de Gene Kim (Flow), quelle action prioritaire permet d’accélérer le flux de valeur ?',
      opts: [
        'Augmenter la taille des lots de déploiement pour rentabiliser la recette',
        'Rendre le travail visible, réduire la taille des lots et limiter le travail en cours (WIP)',
        'Supprimer la totalité des revues de code',
        'Imposer un travail en heures supplémentaires le week-end'
      ],
      correct: 1,
      exp: 'La Première Voie préconise la réduction de la taille des lots (small batches), la limitation du WIP et l’élimination des files d’attente pour créer un flux continu et rapide vers la production.'
    },
    {
      stem: 'Dans le modèle CALMS, que désigne le pilier « M » (Measurement) ?',
      opts: [
        'Le pilotage de la performance par des métriques objectives techniques et métier',
        'Le calcul du salaire moyen des équipes informatiques',
        'La mesure de la consommation électrique des moniteurs des postes de travail',
        'L’évaluation de la taille en mégaoctets des commits Git'
      ],
      correct: 0,
      exp: 'Le M de CALMS (Measurement) consiste à instrumenter le cycle de vie logiciel avec des indicateurs objectifs (métriques DORA, latence, SLA, conversion) pour guider les décisions par la preuve factuelle.'
    },
    {
      stem: 'Si une fonctionnalité requiert 20 heures de codage effectif (Process Time) mais met 200 heures calendaires à être livrée en production (Lead Time), quelle est l’efficience de flux ?',
      opts: [
        '10%',
        '20%',
        '90%',
        '5%'
      ],
      correct: 0,
      exp: 'Flow Efficiency = (Process Time / Lead Time) * 100 = (20 / 200) * 100 = 10%. Les 90% restants (180 heures) représentent du gaspillage sous forme de temps d’attente.'
    },
    {
      stem: 'Quel est l’objectif principal d’un post-mortem « sans blâme » (blameless post-mortem) selon la culture DevOps ?',
      opts: [
        'Identifier le responsable individuel de la faute pour le sanctionner discrètement',
        'Comprendre les défaillances systémiques de l’environnement et des processus pour immuniser l’organisation contre leur répétition',
        'Supprimer les sauvegardes de logs pour éviter les audits juridiques',
        'Transférer la responsabilité de l’incident à un prestataire externe'
      ],
      correct: 1,
      exp: 'Le post-mortem blameless postule que les ingénieurs agissent avec de bonnes intentions : pour progresser, il faut auditer les défaillances de conception et d’outillage sans chercher de bouc émissaire.'
    },
    {
      stem: 'Que stipule la Loi de Little appliquée aux chaînes de livraison logicielle ?',
      opts: [
        'Le temps de compilation double à chaque nouvelle ligne de code',
        'Le volume de travail en cours (WIP) est égal au débit multiplié par le temps de traversée (Lead Time)',
        'Le nombre de bogues est inversement proportionnel au nombre de tests',
        'Une équipe ne peut jamais compter plus de 7 personnes'
      ],
      correct: 1,
      exp: 'Loi de Little : WIP = Throughput * Lead Time. Réduire le travail en cours (WIP) pour un débit donné est la méthode mathématique la plus directe pour faire chuter le Lead Time.'
    },
    {
      stem: 'À quelle Voie de The Phoenix Project se rattache la pratique du « Chaos Engineering » et des « Game Days » ?',
      opts: [
        'La Première Voie (Le Flux)',
        'La Deuxième Voie (Les Boucles de Rétroaction)',
        'La Troisième Voie (L’Expérimentation &amp; l’Apprentissage Continu)',
        'À aucune, il s’agit d’une pratique de sécurité pure'
      ],
      correct: 2,
      exp: 'La Troisième Voie encourage la résilience par l’entraînement proactif, l’expérimentation contrôlée de pannes (Chaos Monkey) et l’apprentissage organisationnel permanent.'
    }
  ],
  flashcards: [
      { q: 'Qu’est-ce que « Mur de la confusion Dev/Ops » ?', a: 'Mur de la confusion Dev/Ops' },
      { q: 'Qu’est-ce que « Lean Manufacturing & TPS » ?', a: 'Lean Manufacturing & TPS : Dans les organisations informatiques traditionnelles, les équipes de développement (Dev) et les équipes d’exploitation (Ops) opèrent dans des silos étanches et poursuivent des incitations diamétralement opposées : les premières sont récompensées pour la vitesse de livraison de no' },
      { q: 'Qu’est-ce que « Élimination des Mudas (Gaspillages) » ?', a: 'Élimination des Mudas (Gaspillages)' },
      { q: 'Qu’est-ce que « Loi de Little & Limite du WIP » ?', a: 'Loi de Little & Limite du WIP' },
      { q: 'Qu’est-ce que « Modèle d’évaluation CALMS » ?', a: 'Modèle d’évaluation CALMS' },
      { q: 'Qu’est-ce que « Value Stream Mapping (VSM) » ?', a: 'Le Value Stream Mapping (VSM) analyse chronologiquement chaque étape requise pour convertir une exigence métier en fonctionnalité opérationnelle. Deux grandeurs temporelles fondamentales s’en dégagent :' },
      { q: 'Qu’est-ce que « Principes de l’Intégration Continue (CI) » ?', a: 'Principes de l’Intégration Continue (CI)' },
      { q: 'Qu’est-ce que « Semantic Versioning (SemVer 2.0.0) » ?', a: 'appliquer rigoureusement la norme Semantic Versioning (SemVer 2.0.0) et analyser l’impact des ruptures d’API ;' },
      { q: 'Qu’est-ce que « Breaking Changes & Rétrocompatibilité » ?', a: 'Breaking Changes & Rétrocompatibilité' },
      { q: 'Qu’est-ce que « Tests Unitaires, Intégration, E2E » ?', a: 'Tests Unitaires, Intégration, E2E' },
      { q: 'Qu’est-ce que « Tests instables (Flaky Tests) » ?', a: 'Tests instables (Flaky Tests) : Dans un projet d’envergure réunissant des dizaines de développeurs, l’intégration tardive des fonctionnalités développées en parallèle provoque systématiquement « l’enfer des fusions » (Merge Hell) : branches Git divergentes pendant plusieurs semaines, conflits insolubles, régres' },
      { q: 'Qu’est-ce que « Mise en quarantaine & Règle du Tronc Vert » ?', a: 'Mise en quarantaine & Règle du Tronc Vert' },
      { q: 'Qu’est-ce que « Namespaces Linux (pid, net, mnt, uts) » ?', a: 'Namespaces Linux (pid, net, mnt, uts)' },
      { q: 'Qu’est-ce que « Control Groups - cgroups (CPU, RAM) » ?', a: 'Control Groups - cgroups (CPU, RAM)' },
      { q: 'Qu’est-ce que « Layer Caching & Ordonnancement » ?', a: 'Layer Caching & Ordonnancement' },
      { q: 'Qu’est-ce que « Multi-Stage Builds Docker » ?', a: 'Multi-Stage Builds Docker' },
      { q: 'Qu’est-ce que « Durcissement de conteneur & Non-root » ?', a: 'Durcissement de conteneur & Non-root' },
      { q: 'Qu’est-ce que « Idempotence & Dérive en IaC (Drift) » ?', a: 'Idempotence & Dérive en IaC (Drift)' },
      { q: 'Qu’est-ce que « Rolling Updates (maxSurge, maxUnavailable) » ?', a: 'Rolling Updates (maxSurge, maxUnavailable)' },
      { q: 'Qu’est-ce que « Blue/Green Deployment & Bascule » ?', a: 'Blue/Green Deployment & Bascule' },
      { q: 'Qu’est-ce que « Canary Releases & Détection d’erreurs » ?', a: 'Canary Releases & Détection d’erreurs' },
      { q: 'Qu’est-ce que « Patron Expand and Contract pour BDD » ?', a: 'Patron Expand and Contract pour BDD' },
      { q: 'Qu’est-ce que « Découplage Deploy vs Release » ?', a: 'Découplage Deploy vs Release' },
      { q: 'Qu’est-ce que « Feature Flags & Kill Switches » ?', a: 'Feature Flags & Kill Switches' },
      { q: 'Qu’est-ce que « Équations de fiabilité MTBF, MTTF, MTTR » ?', a: 'Équations de fiabilité MTBF, MTTF, MTTR' },
      { q: 'Qu’est-ce que « Rayon d’impact (Blast Radius) & Bulkheads » ?', a: 'Rayon d’impact (Blast Radius) & Bulkheads' },
      { q: 'Qu’est-ce que « Site Reliability Engineering (SRE) » ?', a: 'Site Reliability Engineering (SRE) : Fixer un objectif de disponibilité de 100% est une illusion ruineuse : non seulement atteindre 100% d’uptime est physiquement impossible dans des systèmes distribués, mais cela paralyserait totalement l’innovation en interdisant toute modification logicielle. Fondée par Benjamin ' },
      { q: 'Qu’est-ce que « Élimination du Toil (< 50% du temps) » ?', a: 'Élimination du Toil (< 50% du temps)' },
      { q: 'Qu’est-ce que « Indicateurs SLI vs Objectifs SLO » ?', a: 'Indicateurs SLI vs Objectifs SLO' },
      { q: 'Qu’est-ce que « Accords SLA & Pénalités contractuelles » ?', a: 'Accords SLA & Pénalités contractuelles' },
      { q: 'Qu’est-ce que « Error Budgets & Politiques de gel de release » ?', a: 'Error Budgets & Politiques de gel de release' },
      { q: 'Qu’est-ce que « Burn Rate & Vitesse de consommation » ?', a: 'Burn Rate & Vitesse de consommation' },
      { q: 'Qu’est-ce que « Alert Flapping & Temporisation Prometheus » ?', a: 'Alert Flapping & Temporisation Prometheus' },
    {
      q: 'Qu’appelle-t-on le « mur de la confusion » en informatique d’entreprise ?',
      a: 'La barrière organisationnelle et culturelle opposant les Développeurs (incités au changement rapide) et les Exploitants (incités à la stabilité et au gel de l’infrastructure).'
    },
    {
      q: 'Que signifient les acronymes des 3M du Lean Manufacturing ?',
      a: 'Muda (gaspillage sans valeur ajoutée), Muri (surcharge excessive des ressources ou humains) et Mura (irrégularité et variabilité du flux).'
    },
    {
      q: 'Quelles sont les Trois Voies de Gene Kim (The Phoenix Project) ?',
      a: '1. Le Flux continu (gauche vers droite), 2. Les Boucles de rétroaction rapides (droite vers gauche), 3. L’Expérimentation et l’apprentissage continu.'
    },
    {
      q: 'Que désignent les lettres de l’acronyme CALMS ?',
      a: 'C pour Culture, A pour Automation, L pour Lean, M pour Measurement, S pour Sharing.'
    },
    {
      q: 'Comment calcule-t-on l’efficience de flux (Flow Efficiency) ?',
      a: 'Flow Efficiency (%) = (Process Time / Lead Time) × 100, où Process Time est le temps actif de création de valeur et Lead Time le délai total écoulé.'
    },
    {
      q: 'Pourquoi la limitation du travail en cours (WIP Limit) est-elle essentielle ?',
      a: 'En vertu de la loi de Little, plafonner le travail en cours réduit mécaniquement le temps de cycle global (Lead Time) et prévient l’engorgement des équipes.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez le mur de la confusion, les 3M du Lean et les 5 piliers du modèle CALMS.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bonnes bases théoriques, approfondissez la loi de Little et les 3 Voies de Gene Kim.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez parfaitement les origines philosophiques et culturelles du mouvement DevOps.'
    }
  ]
};
