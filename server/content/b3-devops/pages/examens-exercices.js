/**
 * Pages « examens » et « exercices » du cours « DevOps B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées de DevOps B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences professionnelles et académiques de niveau Bachelor 3 / Licence 3.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Principes Lean, Pipelines CI, Docker &amp; Déploiements', [
      '<h4>Partie 1 : Principes Fondamentaux &amp; Culture CALMS (6 points)</h4>',
      '<ol>',
      '  <li>Détaillez les conséquences néfastes du « mur de la confusion » historique entre développeurs (Dev) et exploitants (Ops). En quoi le modèle CALMS (Culture, Automation, Lean, Measurement, Sharing) répond-il structurellement à cette scission ? (3 pts)</li>',
      '  <li>Une équipe de développement met en moyenne 14 jours entre la prise en charge d’une fonctionnalité et sa livraison en production (Lead Time = 336 heures). Le temps effectif de programmation et de revue totalise 16 heures 48 minutes (Process Time = 16.8 heures). Calculez l’efficience de flux (Flow Efficiency) de cette équipe et analysez la nature des gaspillages (Muda) mis en évidence. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Intégration Continue, SemVer &amp; Docker (7 points)</h4>',
      '<ol>',
      '  <li>Expliquez la règle de Semantic Versioning (SemVer 2.0.0 : MAJOR.MINOR.PATCH). Une API passe de la version <code>2.4.1</code> à <code>3.0.0</code> puis à <code>3.1.0</code>. Que signalent ces deux incréments pour les consommateurs du service ? (3 pts)</li>',
      '  <li>Voici un Dockerfile non optimisé :<br>',
      '    <pre><code>FROM node:18\nCOPY . .\nRUN npm install\nRUN apt-get update && apt-get install -y curl\nCMD ["node", "app.js"]</code></pre>',
      '    Identifiez les deux erreurs majeures relatives au cache de couches (layer caching) et à la sécurité, puis écrivez le Dockerfile corrigé selon les règles de l’art (ordonnancement optimal et exécution non-root). (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Stratégies de Déploiement Continu (7 points)</h4>',
      '<ol>',
      '  <li>Comparez précisément le déploiement Blue/Green et le déploiement Canary. Dans quel cas une entreprise privilégiera-t-elle le Canary plutôt que le Blue/Green ? (3 pts)</li>',
      '  <li>Décrivez le fonctionnement d’un système de Feature Flags (basculeurs de fonctionnalités) et expliquez comment il permet de découpler techniquement le déploiement de code de la publication métier aux utilisateurs finaux. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Mur de la confusion &amp; CALMS (3 pts) :</strong> Le mur de la confusion découle d’objectifs contradictoires : les Devs sont incités au changement rapide (nouvelles fonctionnalités), tandis que les Ops sont évalués sur la stabilité (zéro incident). Cela crée des transferts manuels chaotiques, de la méfiance et des délais abyssaux. CALMS résout ce conflit en alignant les responsabilités partagées (Culture), en éliminant les tâches manuelles à faible valeur (Automation), en réduisant les files d’attente et la taille des lots (Lean), en pilotant par des métriques objectives communes (Measurement), et en favorisant la transparence et le post-mortem sans blâme (Sharing).</li>',
      '  <li><strong>Calcul d’Efficience de Flux (3 pts) :</strong><br>' +
      '    $$FE = \\frac{Process\\_Time}{Lead\\_Time} \\times 100 = \\frac{16.8}{336} \\times 100 = 5.0\\,\\%$$<br>' +
      '    Seulement 5% du temps total est consacré à la création de valeur active. Les 95% restants (319.2 heures) représentent des temps d’attente improductifs (Muda) : files d’attente de recette QA, validations managériales manuelles, attentes de fenêtres de mise en production et transferts de tickets inter-équipes.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Semantic Versioning (3 pts) :</strong> Le passage à <code>3.0.0</code> indique un changement majeur avec rupture de compatibilité descendante (Breaking Change), exigeant une adaptation du code client. Le passage à <code>3.1.0</code> signale l’ajout d’une nouvelle fonctionnalité rétro-compatible (aucun impact négatif pour les clients existants).</li>',
      '  <li><strong>Optimisation Dockerfile (4 pts) :</strong> Dans la version initiale, <code>COPY . .</code> précède <code>RUN npm install</code>, invalidant tout le cache des dépendances à chaque modification d’un fichier source. De plus, les dépendances système sont installées après le code et le conteneur tourne sous <code>root</code>. Version corrigée :<br>' +
      '    <pre><code>FROM node:18-alpine\nWORKDIR /app\nRUN apk add --no-cache curl\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nUSER node\nCMD ["node", "app.js"]</code></pre></li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Blue/Green vs Canary (3 pts) :</strong> Le Blue/Green maintient deux environnements identiques complets et bascule 100% du trafic d’un coup via le routeur. Le Canary achemine d’abord une faible fraction du trafic réel (ex. 5% puis 25%) vers la nouvelle version pour surveiller les erreurs en direct. On privilégie le Canary lorsque l’impact d’un bogue critique sur 100% des utilisateurs serait catastrophique et pour valider le comportement sous trafic réel sans doubler intégralement l’infrastructure.</li>',
      '  <li><strong>Feature Flags &amp; Découplage (4 pts) :</strong> Le Feature Flag insère une condition logique dans le code (<code>if feature.enabled(user): ...</code>) pilotée par une plateforme de configuration à chaud. Le code est poussé en production en continu (déploiement technique), mais la fonctionnalité reste invisible jusqu’à ce que le chef de produit active le drapeau (publication métier), permettant des tests A/B et un rollback instantané sans re-déploiement.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Métriques DORA, Fiabilité SRE, Error Budgets &amp; Architecture', [
      '<h4>Partie 1 : Métriques DORA &amp; Performance d’Organisation (6 points)</h4>',
      '<p>Une entreprise technologique audite ses performances DevOps sur une période d’un an (365 jours) :</p>',
      '<ul>',
      '  <li>Nombre total de déploiements réussis en production : 365 déploiements (1 par jour) ;</li>',
      '  <li>Nombre d’incidents majeurs post-déploiement ayant nécessité un rollback ou hotfix : 18 incidents ;</li>',
      '  <li>Délai médian entre la soumission d’une pull request et sa mise en production : 14 heures ;</li>',
      '  <li>Temps moyen de résolution des incidents constatés : 1 heure 45 minutes.</li>',
      '</ul>',
      '<ol>',
      '  <li>Calculez le Change Failure Rate (CFR) de cette organisation. (2 pts)</li>',
      '  <li>Évaluez la maturité de cette entreprise au regard du benchmark officiel DORA pour chacune des 4 métriques (Deployment Frequency, Lead Time for Changes, CFR, MTTR). Dans quelle catégorie se classe-t-elle globalement (Low, Medium, High, Elite) ? Justifiez. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : SRE, SLI/SLO &amp; Gestion d’Error Budget (8 points)</h4>',
      '<p>Un service de paiement en ligne applique un Service Level Objective (SLO) stipulant que <strong>99.9%</strong> des requêtes HTTP doivent répondre avec un code statut &lt; 500 sur une fenêtre glissante de 30 jours (considérée à 2 592 000 secondes).</p>',
      '<ol>',
      '  <li>Définissez précisément la différence formelle entre un SLI, un SLO et un SLA. (2 pts)</li>',
      '  <li>Calculez la durée totale de l’Error Budget alloué pour ce service sur une fenêtre de 30 jours. (2 pts)</li>',
      '  <li>Durant les 10 premiers jours du mois, une panne réseau majeure engendre une indisponibilité totale cumulée de 38 minutes 45 secondes (2 325 secondes). Calculez le pourcentage d’Error Budget consommé et la durée résiduelle disponible. (2 pts)</li>',
      '  <li>En tant qu’ingénieur SRE, quelle politique opérationnelle devez-vous appliquer immédiatement concernant les futures mises en production de nouvelles fonctionnalités ? Justifiez. (2 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Détection de Flapping &amp; Conception de Pipeline CI/CD (6 points)</h4>',
      '<ol>',
      '  <li>Dans un système de supervision Prometheus / Alertmanager, qu’appelle-t-on l’« Alert Flapping » ? Quelles en sont les conséquences pour l’équipe d’astreinte et quelle clause de configuration permet de l’éradiquer ? (3 pts)</li>',
      '  <li>Dessinez ou décrivez les 5 étapes successives indispensables d’un pipeline de CI/CD sécurisé respectant les principes du DevSecOps, depuis le commit Git jusqu’à la production. (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Change Failure Rate (2 pts) :</strong><br>' +
      '    $$CFR = \\frac{N_{echecs}}{N_{deploiements}} \\times 100 = \\frac{18}{365} \\times 100 \\approx 4.93\\,\\%$$</li>',
      '  <li><strong>Classification DORA (4 pts) :</strong><br>' +
      '    - <em>Deployment Frequency :</em> 1/jour &rarr; Niveau High (entre 1/jour et 1/semaine).<br>' +
      '    - <em>Lead Time for Changes :</em> 14 heures &rarr; Niveau High (entre 1 jour et 1 semaine / &lt; 1 jour).<br>' +
      '    - <em>Change Failure Rate :</em> 4.93% (&lt; 5%) &rarr; Niveau Elite / High (0-5%).<br>' +
      '    - <em>MTTR :</em> 1 h 45 min &rarr; Niveau High (&lt; 1 jour).<br>' +
      '    <strong>Conclusion :</strong> L’organisation se classe incontestablement au rang <strong>High Performer</strong> (proche de l’Élite sur le CFR).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (8 points)</h4>',
      '<ul>',
      '  <li><strong>SLI vs SLO vs SLA (2 pts) :</strong> Le <em>SLI</em> est la métrique brute mesurée en temps réel. Le <em>SLO</em> est l’objectif de fiabilité interne que l’équipe s’engage à tenir. Le <em>SLA</em> est l’engagement contractuel légal pris envers les clients externes, assorti de pénalités financières s’il est enfreint (généralement plus tolérant que le SLO).</li>',
      '  <li><strong>Budget d’erreur total (2 pts) :</strong><br>' +
      '    $$Budget_{total} = 2\\,592\\,000 \\times (1 - 0.999) = 2\\,592\\,000 \\times 0.001 = 2\\,592\\text{ secondes (soit 43 minutes 12 secondes)}.$$</li>',
      '  <li><strong>Consommation du budget (2 pts) :</strong><br>' +
      '    $$Consommation = \\frac{2\\,325}{2\\,592} \\times 100 \\approx 89.70\\,\\%$$<br>' +
      '    $$Budget_{restant} = 2\\,592 - 2\\,325 = 267\\text{ secondes (soit 4 minutes 27 secondes)}.$$</li>',
      '  <li><strong>Décision SRE (2 pts) :</strong> Ayant consommé près de 90% de son budget d’erreur en un tiers de mois, le service est en situation critique. La politique d’Error Budget impose le gel immédiat des déploiements de fonctionnalités non critiques (Feature Freeze). Tous les efforts d’ingénierie doivent être réorientés vers la fiabilisation de l’infrastructure, la résilience réseau et les tests de non-régression jusqu’au renouvellement de la marge de fiabilité.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Alert Flapping &amp; Clause <code>for</code> (3 pts) :</strong> Le flapping se produit lorsqu’une métrique oscille rapidement autour d’un seuil critique, déclenchant et résolvant l’alerte de manière convulsive. Cela engendre de la fatigue d’alerte (Alert Fatigue) et décrédibilise la supervision. On y remédie en ajoutant une clause <code>for: 5m</code> dans la règle Prometheus, exigeant que la condition soit vérifiée de manière ininterrompue durant une durée minimale avant de déclencher l’alerte.</li>',
      '  <li><strong>Étapes du Pipeline DevSecOps (3 pts) :</strong><br>' +
      '    1. <em>Lint &amp; Analyse Statique (SAST) :</em> vérification syntaxique et détection de failles dans le code source.<br>' +
      '    2. <em>Tests Unitaires &amp; Couverture :</em> exécution des tests et validation du seuil minimal.<br>' +
      '    3. <em>Build &amp; Scan d’Images :</em> construction du conteneur et analyse de vulnérabilités CVE (Trivy).<br>' +
      '    4. <em>Déploiement en Staging &amp; Tests d’Intégration :</em> validation dynamique en environnement miroir.<br>' +
      '    5. <em>Déploiement en Production Canary/Blue-Green :</em> bascule sécurisée avec contrôle d’intégrité automatisé.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento des formules' }, { href: 'exercices.html', label: 'Accéder aux 18 exercices pratiques' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens Blancs &amp; Épreuves Corrigées — ' + course.brand,
      description: 'Épreuves types de contrôle continu et d’examen terminal corrigées pour le cours DevOps B3.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Pratiques ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices pratiques' }
  ]);

  const exercisesByChapter = [
    {
      n: 1,
      title: 'Origines, Culture &amp; Principes Fondamentaux',
      items: [
        { id: 'do3-c1-e1', title: 'Calcul des métriques Lean (Lead Time, Process Time &amp; Efficience)', goal: 'Calculer le Lead Time total, le Process Time et le ratio d’efficience de flux d’une chaîne de valeur logicielle.' },
        { id: 'do3-c1-e2', title: 'Évaluateur de maturité de la culture DevOps (Modèle CALMS)', goal: 'Calculer le score moyen de maturité DevOps selon les 5 piliers CALMS et classifier la posture de l’organisation.' },
        { id: 'do3-c1-e3', title: 'Analyseur des gaspillages Lean (Muda) et flux de valeur', goal: 'Classer les étapes d’une chaîne de livraison logicielle en valeur ajoutée utile vs gaspillage éliminable.' }
      ]
    },
    {
      n: 2,
      title: 'Intégration Continue (CI), Stratégies de Branchement &amp; Automatisation',
      items: [
        { id: 'do3-c2-e1', title: 'Analyseur de pipeline d’Intégration Continue (Lint, Test, Build, Sec)', goal: 'Simuler l’exécution séquentielle d’un pipeline de CI avec arrêt immédiat au premier échec rencontré.' },
        { id: 'do3-c2-e2', title: 'Validateur de conformité Semantic Versioning (SemVer 2.0.0)', goal: 'Comparer deux numéros de versions et classifier le type d’incrément (MAJOR, MINOR, PATCH).' },
        { id: 'do3-c2-e3', title: 'Simulateur de matrice de tests et détection de Flaky Tests', goal: 'Analyser les exécutions répétées d’une suite de tests pour identifier les tests instables.' }
      ]
    },
    {
      n: 3,
      title: 'Conteneurisation Docker, Multi-Stage Builds &amp; Infrastructure as Code',
      items: [
        { id: 'do3-c3-e1', title: 'Optimiseur d’ordonnancement de Dockerfile et exploitation du cache', goal: 'Analyser la séquence d’instructions d’un Dockerfile et alerter sur les invalidations précoces de cache.' },
        { id: 'do3-c3-e2', title: 'Simulateur de Multi-Stage Build Docker et réduction d’empreinte', goal: 'Calculer la réduction drastique de taille d’image et la surface d’attaque éliminée par le build multi-étapes.' },
        { id: 'do3-c3-e3', title: 'Vérificateur d’idempotence et de convergence de configuration IaC', goal: 'Vérifier qu’une seconde exécution d’un script d’infrastructure n’engendre aucune modification non désirée.' }
      ]
    },
    {
      n: 4,
      title: 'Déploiement Continu (CD), Stratégies de Release &amp; Feature Flags',
      items: [
        { id: 'do3-c4-e1', title: 'Simulateur de déploiement Blue/Green avec bascule de routeur', goal: 'Gérer la bascule instantanée du trafic réseau entre environnements miroir avec retour arrière immédiat.' },
        { id: 'do3-c4-e2', title: 'Déploiement Canary progressif avec analyse de taux d’erreur', goal: 'Piloter une montée progressive de trafic et déclencher un coupe-circuit automatique en cas d’erreurs.' },
        { id: 'do3-c4-e3', title: 'Évaluateur de Feature Flags et ciblage d’utilisateurs', goal: 'Évaluer dynamiquement l’activation d’une fonctionnalité en fonction du rôle utilisateur et du pourcentage d’éligibilité.' }
      ]
    },
    {
      n: 5,
      title: 'Métriques DORA, Fiabilité Opérationnelle &amp; Gestion des Incidents',
      items: [
        { id: 'do3-c5-e1', title: 'Calculateur des 4 métriques DORA et classification d’équipe', goal: 'Calculer Deployment Frequency, Lead Time, Change Failure Rate et MTTR pour déterminer le niveau DORA.' },
        { id: 'do3-c5-e2', title: 'Calculateur de disponibilité MTBF, MTTR et taux de défaillance MTTF', goal: 'Calculer le temps moyen entre pannes, la durée moyenne de réparation et le taux de disponibilité global.' },
        { id: 'do3-c5-e3', title: 'Analyseur d’impact de défaillance (Blast Radius) et score de risque', goal: 'Évaluer le rayon d’impact et le score de risque d’une mise en production sur les microservices dépendants.' }
      ]
    },
    {
      n: 6,
      title: 'SRE (Site Reliability Engineering), SLI/SLO, Error Budgets &amp; Observabilité',
      items: [
        { id: 'do3-c6-e1', title: 'Analyseur de conformité SLI/SLO et marge de respect', goal: 'Calculer le taux effectif de conformité d’un service et vérifier le respect formel du SLO cible.' },
        { id: 'do3-c6-e2', title: 'Gestionnaire d’Error Budget et politique de blocage de release', goal: 'Suivre la consommation du budget d’indisponibilité et ordonner le gel des releases si le seuil critique est atteint.' },
        { id: 'do3-c6-e3', title: 'Détecteur d’instabilité et de tempête d’alertes (Alert Flapping)', goal: 'Analyser les oscillations rapides d’une alerte Prometheus et recommander l’ajout d’une clause d’amortissement temporel.' }
      ]
    }
  ];

  const sectionsHtml = exercisesByChapter.map(group => [
    '  <h3>Module ' + group.n + ' — ' + group.title + '</h3>',
    '  <div class="grid grid-3">',
    group.items.map(ex => [
      '    <div class="card">',
      '      <div class="card__head">',
      '        <span class="badge">' + ex.id + '</span>',
      '      </div>',
      '      <h4>' + ex.title + '</h4>',
      '      <p>' + ex.goal + '</p>',
      '      <a class="btn btn--sm" href="chapitre' + group.n + '.html#' + ex.id + '">Pratiquer dans le module ' + ic('arrow-right') + '</a>',
      '    </div>'
    ].join('\n')).join('\n'),
    '  </div>'
  ].join('\n')).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices Pratiques d’Ingénierie DevOps</h1>',
    '  <p class="lead">Tous les ateliers interactifs de manière méthodique intégrés au cours, couvrant l’automatisation CI/CD, l’optimisation de conteneurs, le calcul DORA et la gouvernance SRE.</p>',
    '',
    sectionsHtml,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens blancs' }, { href: '../atelier.html', label: 'Ouvrir l’atelier libre' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Exercices pratiques de code — ' + course.brand,
      description: 'Répertoire complet des 18 exercices de code DevOps B3 avec objectifs et liens directs vers les ateliers.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
