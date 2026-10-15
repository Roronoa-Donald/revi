/**
 * Chapitre 6 du cours « Veille Technologique & Innovation B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Restitution Stratégique, Tech Radar ThoughtWorks &amp; Workflow Kanban',
  short: 'Restitution, Radar &amp; Kanban',
  toc: 'Typologie des livrables de veille (bulletins flash, livret de synthèse, tableaux de bord interactifs), cartographie dynamique avec le Tech Radar ThoughtWorks (quadrants et anneaux Adopt, Trial, Assess, Hold), gouvernance d’une cellule de veille en équipe projet B3, organisation agile en workflow Kanban, mesure du Lead Time, et éthique juridique (droit d’auteur, secret des affaires et RGPD).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Une démarche de veille technologique ne crée de valeur économique et opérationnelle que si l’information qualifiée est restituée au bon moment, sous le format adéquat et au destinataire approprié. Une veille qui dort dans un répertoire de stockage sans diffusion ciblée est une charge morte pour l’organisation. De plus, la surabondance de données impose une sélection rigoureuse : les décideurs (DSI, CTO, architectes, chefs de projet, comités de direction) n’ont pas le temps de parcourir des flux bruts. Pour un ingénieur de niveau Bachelor 3, la restitution s’articule autour de trois piliers majeurs : adapter la typologie des livrables selon la temporalité et l’audience (du bulletin flash d’urgence cybersécurité au livret d’orientation stratégique trimestriel), projeter les arbitrages technologiques sur un Tech Radar standardisé (modèle ThoughtWorks à 4 quadrants et 4 anneaux d’adoption), et animer la cellule de veille en équipe projet à travers un workflow agile Kanban garantissant un Lead Time maîtrisé et le strict respect du cadre légal (propriété intellectuelle, secret des affaires et déontologie).',
  objectives: [
    'concevoir une typologie de livrables adaptée aux différentes parties prenantes (bulletin flash, curated digest, livret trimestriel, dashboard) ;',
    'structurer et animer un Tech Radar d’entreprise selon le standard ThoughtWorks (quadrants et anneaux Adopt, Trial, Assess, Hold) ;',
    'mettre en place un workflow agile Kanban pour piloter la production d’une cellule de veille collaborative en équipe projet B3 ;',
    'mesurer et optimiser le temps de cycle (Lead Time) entre la détection d’un signal et sa diffusion aux équipes techniques ;',
    'maîtriser le cadre légal et déontologique de la veille : droit d’auteur, exception de courte citation, secret des affaires et directive NIS 2 ;',
    'implémenter en Python 3 des générateurs de bulletins hiérarchisés, des calculateurs de Tech Radar et des simulateurs de workflow Kanban.'
  ],
  sections: [
    {
      title: 'Typologie et Conception des Livrables de Veille Stratégique',
      html: [
        '<p>La forme d’un livrable de veille conditionne directement son impact opérationnel. Un bon livrable applique le principe de l’<strong>entonnoir informationnel</strong> : synthétiser l’essentiel en tête de document (Executive Summary) puis détailler l’analyse technique et les sources vérifiées pour les spécialistes :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Formats Clés de Restitution</h4>',
        '    <ul>',
        '      <li><strong>Bulletin d’alerte Flash (Flash Note) :</strong> 1 page maximum, rédigé en urgence lors d’un événement critique (ex. vulnérabilité zero-day active, arrêt brutal d’un service cloud majeur, changement réglementaire bloquant). Diffusion multicanale immédiate (Slack, Teams, e-mail prioritaire).</li>',
        '      <li><strong>Curated Digest hebdomadaire :</strong> sélection de 3 à 5 faits marquants analysés, contextualisés et priorisés par criticité (Critique, Moyenne, Faible) avec impact projet explicite.</li>',
        '      <li><strong>Livret thématique de synthèse (Livre blanc) :</strong> document de fond semestriel ou trimestriel (10 à 30 pages) analysant en profondeur une brique technologique émergente (ex. passage aux architectures zero-trust, conteneurisation WASM).</li>',
        '      <li><strong>Tableau de bord dynamique (Dashboard) :</strong> portail web interactif (ex. Grafana, Notion, Metabase) présentant les indicateurs clés, métriques de veille et liens vers les sources qualifiées.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Matrice des Destinataires et Styles de Communication</h4>',
        '    <table class="table">',
        '      <thead><tr><th>Public Cible</th><th>Livrable Recommandé</th><th>Niveau de Détail</th><th>Fréquence</th></tr></thead>',
        '      <tbody>',
        '        <tr><td><strong>Comité de Direction / DSI</strong></td><td>Executive Summary, Impact ROI &amp; Risques</td><td>Haut niveau (stratégie, coûts, conformité)</td><td>Trimestrielle / Mensuelle</td></tr>',
        '        <tr><td><strong>Architectes Logiciels</strong></td><td>Tech Radar, Benchmarks techniques</td><td>Intermédiaire (patrons, interopérabilité)</td><td>Bimensuelle</td></tr>',
        '        <tr><td><strong>Équipes Développeurs &amp; DevOps</strong></td><td>Curated Digest, POCs, Flash Notes</td><td>Opérationnel (code, API, failles, releases)</td><td>Hebdomadaire / Événementielle</td></tr>',
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</div>',
        box('Règle d’Or de la Restitution', [
          '<p>Une note de veille ne doit jamais se limiter à résumer un article externe : elle doit obligatoirement expliciter <strong>l’impact direct pour l’organisation</strong> et formuler une <strong>recommandation d’action claire</strong> (ex. « Mettre à jour le cluster Kubernetes vers la v1.31 avant le 15 novembre », « Tester la bibliothèque Rust alternative en environnement bac à sable », « Geler toute commande sur ce matériel »).</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Cartographie et Arbitrage : Le Tech Radar ThoughtWorks',
      html: [
        '<p>Créé par le cabinet d’ingénierie logicielle ThoughtWorks et formalisé par Martin Fowler, le <strong>Tech Radar</strong> est un outil visuel de référence mondiale permettant d’harmoniser et de piloter les choix technologiques d’une entreprise sur un disque cartographique interactif :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 4 Quadrants Thématiques</h4>',
        '    <ul>',
        '      <li><strong>Techniques :</strong> méthodologies, patrons d’architecture, pratiques d’ingénierie (ex. Infrastructure as Code, Clean Architecture, Shift-Left Security, eBPF).</li>',
        '      <li><strong>Outils :</strong> logiciels, utilitaires de développement, outils CI/CD et surveillance (ex. Terraform, Docker, Grafana, SonarQube, GitHub Actions).</li>',
        '      <li><strong>Plateformes :</strong> socles d’infrastructure, clouds, orchestrateurs et systèmes d’exploitation (ex. Kubernetes, AWS ECS, AlmaLinux, Cloudflare Workers).</li>',
        '      <li><strong>Langages &amp; Frameworks :</strong> langages de programmation, runtimes, bibliothèques logicielles (ex. Python, TypeScript, Rust, FastAPI, React).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les 4 Anneaux Concentriques d’Action</h4>',
        '    <ul>',
        '      <li><strong>Adopt (score: 100) :</strong> technologie standard recommandée sans réserve pour tous les nouveaux projets de production.</li>',
        '      <li><strong>Trial (score: 75) :</strong> technologie prête pour des projets pilotes réels avec une équipe capable de maîtriser les risques opérationnels.</li>',
        '      <li><strong>Assess (score: 50) :</strong> technologie émergente prometteuse à explorer, prototyper en laboratoire et surveiller de près.</li>',
        '      <li><strong>Hold (score: 25) :</strong> technologie obsolète, dépréciée ou risquée ; ne pas démarrer de nouveaux projets avec cette brique et planifier sa migration.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<div class="card mt-2">',
        '  <h4>Gouvernance du Tech Radar en Entreprise</h4>',
        '  <p>Le Tech Radar n’est pas un document figé rédigé par un gourou isolé : il est le produit d’un <strong>comité d’architecture collégial</strong> réuni périodiquement (souvent chaque semestre). Chaque membre de la cellule de veille propose des mouvements (ex. faire passer une technologie de <em>Assess</em> à <em>Trial</em> sur la base d’un PoC concluant, ou rétrograder une brique vers <em>Hold</em> en raison d’un changement de licence contraignant ou de failles récurrentes).</p>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Organisation Agile d’une Cellule de Veille & Cadre Éthico-Juridique',
      html: [
        '<p>Pour qu’une équipe d’ingénieurs en Bachelor 3 conduise une veille pérenne tout au long d’une année projet, elle doit adopter une organisation collaborative outillée et respecter scrupuleusement la déontologie professionnelle et le cadre légal :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Workflow Kanban de Veille</h4>',
        '    <p>Le processus de traitement de l’information est découpé en colonnes avec limite stricte du travail en cours (WIP - Work In Progress) :</p>',
        '    <ol>',
        '      <li><strong>Backlog / Collecte (T1) :</strong> signaux bruts captés automatiquement (flux RSS, newsletters, alertes CVE).</li>',
        '      <li><strong>Évaluation &amp; Qualification (T2) :</strong> analyse de fiabilité, attribution de la criticité, élimination du bruit. Si non pertinent, la carte est marquée <em>Rejetée</em>.</li>',
        '      <li><strong>Validation Éditoriale (T3) :</strong> relecture croisée par le Lead Analyst, vérification des sources primaires et synthèse d’impact.</li>',
        '      <li><strong>Diffusion (T4) :</strong> mise en forme dans le livret, publication sur le canal d’équipe et mise à jour du Tech Radar.</li>',
        '    </ol>',
        '    <p>Le <strong>Lead Time</strong> ($T_4 - T_1$) mesure la réactivité de l’équipe : plus il est court, plus la veille apporte un avantage compétitif.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cadre Légal et Déontologie Professionnelle</h4>',
        '    <ul>',
        '      <li><strong>Propriété Intellectuelle (Code de la propriété intellectuelle) :</strong> interdiction formelle de copier-coller intégralement des articles payants ou protégés. Seule l’<strong>exception de courte citation</strong> (art. L122-5) est admise, avec citation obligatoire de l’auteur, du titre et de la source primaire.</li>',
        '      <li><strong>Secret des affaires (Loi n° 2018-670 / Directive UE 2016/943) :</strong> distinction fondamentale entre veille licite (sources ouvertes, reverse engineering public) et espionnage industriel répréhensible (accès frauduleux, vol d’identifiants, violation de NDA).</li>',
        '      <li><strong>Règlement RGPD :</strong> interdiction de stocker ou profiler des données personnelles issues de sources ouvertes sans base légale et sécurisation des données collectées.</li>',
        '      <li><strong>Directive NIS 2 &amp; Cyber-résilience :</strong> obligation de tracer et remonter sans délai toute vulnérabilité critique affectant les systèmes d’information de l’entreprise.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Établir une matrice des parties prenantes (RACI) pour définir précisément qui doit recevoir quel type de livrable et à quelle échéance.',
    'Formuler systématiquement un Executive Summary en tête de chaque bulletin synthétique pour capter immédiatement l’attention des décideurs.',
    'Associer obligatoirement à chaque signal restitué une recommandation d’impact concrète pour l’infrastructure ou les projets en cours.',
    'Projeter périodiquement les technologies émergentes sur le Tech Radar ThoughtWorks en qualifiant leur quadrant et leur anneau d’adoption (Adopt, Trial, Assess, Hold).',
    'Mesurer le temps de cycle (Lead Time) dans le tableau Kanban de l’équipe pour détecter les goulots d’étranglement dans l’évaluation éditoriale.',
    'Appliquer rigoureusement l’exception de courte citation et citer systématiquement les sources primaires horodatées pour garantir la conformité légale.'
  ],
  summary: [
    'Un livrable de veille doit être calibré selon son audience : Flash d’urgence (1 page) pour incidents critiques, Curated Digest hebdomadaire pour les développeurs, Livret de synthèse pour la direction.',
    'Chaque note d’analyse doit dépasser la simple paraphrase pour expliciter les risques opérationnels, les opportunités business et les actions préconisées.',
    'Le Tech Radar ThoughtWorks organise les technologies en 4 quadrants (Techniques, Outils, Plateformes, Langages) et 4 anneaux (Adopt, Trial, Assess, Hold).',
    'L’anneau Adopt correspond aux briques éprouvées et recommandées en production (score 100), tandis que l’anneau Hold signale les technologies à déprécier (score 25).',
    'Le workflow Kanban structure la cellule de veille en 4 étapes clés : Collecte, Évaluation, Validation éditoriale et Diffusion, avec limitation du WIP.',
    'La veille légale s’effectue exclusivement sur sources ouvertes (OSINT) dans le respect strict du droit d’auteur et de la législation sur le secret des affaires.'
  ],
  checklist: [
    'Le format du livrable (flash, digest, rapport complet) a-t-il été choisi en adéquation avec le profil du destinataire ?',
    'Le document comporte-t-il un résumé exécutif limpide permettant une prise de décision en moins de deux minutes ?',
    'Les technologies évaluées sont-elles positionnées sans ambiguïté dans l’un des 4 anneaux du Tech Radar ?',
    'Le temps de cycle moyen (Lead Time) entre la collecte et la diffusion est-il mesuré et maîtrisé ?',
    'Toutes les citations respectent-elles le cadre légal de la courte citation avec mention explicite des sources primaires ?',
    'Aucune source issue d’intrusion illégale ou de violation de clause de confidentialité (NDA) n’est-elle exploitée ?'
  ],
  notions: [
    {
      name: 'Curated Digest',
      desc: 'Bulletin de veille périodique compilant une sélection rigoureusement qualifiée d’articles et signaux faibles hiérarchisés par criticité.'
    },
    {
      name: 'Tech Radar ThoughtWorks',
      desc: 'Outil de cartographie technologique à 4 quadrants et 4 anneaux (Adopt, Trial, Assess, Hold) formalisé pour piloter les choix techniques en entreprise.'
    },
    {
      name: 'Anneau Adopt',
      desc: 'Statut du Tech Radar désignant une technologie mature, rentable et éprouvée, constituant le standard officiel de production pour l’organisation.'
    },
    {
      name: 'Anneau Hold',
      desc: 'Statut du Tech Radar signalant une technologie obsolète ou trop risquée pour laquelle aucun nouveau projet ne doit être démarré.'
    },
    {
      name: 'Lead Time de Veille',
      desc: 'Temps total écoulé entre le repérage initial d’un signal brut (T1) et sa diffusion qualifiée aux équipes concernées (T4).'
    },
    {
      name: 'Workflow Kanban',
      desc: 'Méthode agile de gestion des flux visuels permettant de réguler le passage des signaux à travers les étapes de qualification et de validation.'
    },
    {
      name: 'Exception de Courte Citation',
      desc: 'Dérogation au droit d’auteur autorisant la reproduction d’extraits brefs d’une œuvre sous réserve de mentionner clairement l’auteur et la source.'
    },
    {
      name: 'Secret des Affaires',
      desc: 'Cadre juridique protégeant les informations stratégiques d’une entreprise contre l’obtention, l’utilisation et la divulgation illicites.'
    }
  ],
  pitfalls: [
    {
      title: 'Infobésité et diffusion de flux bruts non filtrés',
      desc: 'Transmettre aux collaborateurs des flux RSS bruts ou des listes d’articles sans résumé ni hiérarchisation engendre la saturation immédiate et le rejet total de la veille.'
    },
    {
      title: 'Absence de recommandation d’action concrète',
      desc: 'Rédiger une fiche de veille purement descriptive sans préciser l’impact pour les projets internes ni proposer d’action (tester, migrer, geler) rend le livrable inutile.'
    },
    {
      title: 'Tech Radar figé ou dicté par une seule personne',
      desc: 'Établir un Tech Radar sans concertation collégiale avec les équipes techniques conduit à son rejet sur le terrain et à la prolifération du Shadow IT.'
    },
    {
      title: 'Copier-coller illégal d’articles protégés',
      desc: 'Diffuser l’intégralité d’un article payant ou sous licence fermée dans un intranet d’entreprise expose l’organisation à des poursuites lourdes pour contrefaçon.'
    }
  ],
  questions: [
    {
      stem: 'Quel est l’objectif principal d’un Bulletin Flash de veille (Flash Note) ?',
      opts: [
        'Détailler l’historique sur dix ans d’une technologie',
        'Alerter en urgence sur un événement critique (vulnérabilité active, rupture légale) en moins d’une page',
        'Remplacer le contrat de travail des développeurs',
        'Présenter un bilan comptable trimestriel'
      ],
      correct: 1,
      exp: 'Le bulletin flash se concentre sur l’urgence opérationnelle (1 page max) pour déclencher une réaction immédiate face à un risque majeur.'
    },
    {
      stem: 'Dans le modèle Tech Radar de ThoughtWorks, que signifie l’anneau « Trial » ?',
      opts: [
        'La technologie est totalement abandonnée et bannie',
        'La technologie est prête pour des projets pilotes réels avec une maîtrise des risques',
        'La technologie est imposée sans aucune discussion à tous les projets',
        'La technologie ne fonctionne que sous MS-DOS'
      ],
      correct: 1,
      exp: 'L’anneau Trial signifie que la technologie a passé l’étape d’évaluation initiale et mérite d’être mise à l’épreuve sur un projet réel maîtrisé.'
    },
    {
      stem: 'Quels sont les quatre quadrants thématiques officiels d’un Tech Radar ?',
      opts: [
        'Marketing, Finance, Juridique, RH',
        'Techniques, Outils, Plateformes, Langages & Frameworks',
        'Frontend, Backend, Base de données, Réseau',
        'CPU, RAM, Disque, Carte graphique'
      ],
      correct: 1,
      exp: 'Le standard ThoughtWorks structure la cartographie en 4 quadrants : Techniques, Outils, Plateformes, et Langages & Frameworks.'
    },
    {
      stem: 'Comment calcule-t-on le Lead Time d’une carte d’information dans un workflow Kanban de veille ?',
      opts: [
        'En divisant le nombre de mots par la taille du fichier',
        'Par la différence de temps entre la collecte initiale (T1) et la diffusion finale (T4)',
        'En multipliant le nombre de veilleurs par la durée de la réunion',
        'En soustrayant le prix de l’abonnement au budget global'
      ],
      correct: 1,
      exp: 'Le Lead Time correspond au temps de traversée complet du flux, mesuré entre la captation initiale (T1) et la livraison finale (T4).'
    },
    {
      stem: 'Quel score de maturité conventionnel est attribué à l’anneau « Adopt » dans le calculateur de Tech Radar ?',
      opts: [
        '25 points',
        '50 points',
        '75 points',
        '100 points'
      ],
      correct: 3,
      exp: 'Dans la grille d’évaluation conventionnelle, Adopt correspond à la note maximale de 100 points (standard mature et éprouvé).'
    },
    {
      stem: 'Quelle condition est obligatoire pour bénéficier de l’exception de courte citation selon le Code de la propriété intellectuelle ?',
      opts: [
        'Traduire le texte en espéranto',
        'Mentionner obligatoirement le nom de l’auteur et la source d’origine du texte cité',
        'Payer une taxe forfaitaire à l’administration fiscale',
        'Ne citer que des auteurs décédés depuis plus d’un siècle'
      ],
      correct: 1,
      exp: 'L’article L122-5 du CPI impose que les courtes citations soient justifiées par le caractère critique ou pédagogique et mentionnent clairement l’auteur et la source.'
    },
    {
      stem: 'Dans un tableau Kanban de veille, à quoi sert la limitation du travail en cours (WIP) ?',
      opts: [
        'À empêcher les veilleurs de travailler le vendredi',
        'À éviter l’engorgement des colonnes d’évaluation et raccourcir le Lead Time de traitement',
        'À supprimer les flux RSS non anglophones',
        'À limiter le nombre de caractères autorisés dans un e-mail'
      ],
      correct: 1,
      exp: 'Limiter le WIP évite l’accumulation d’articles en attente de qualification, réduisant ainsi les goulets d’étranglement et le temps de cycle.'
    },
    {
      stem: 'Quelle attitude distingue la veille technologique légale de l’espionnage industriel ?',
      opts: [
        'La veille utilise des techniques de piratage informatique indétectables',
        'La veille s’appuie exclusivement sur des sources ouvertes et des méthodes licites sans accès frauduleux',
        'La veille est toujours effectuée de nuit',
        'L’espionnage industriel est réservé aux entreprises du CAC 40'
      ],
      correct: 1,
      exp: 'La veille technologique repose strictement sur l’OSINT (sources ouvertes accessibles légalement) et prohibe toute intrusion ou violation du secret des affaires.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les quatre anneaux d’action du Tech Radar ThoughtWorks ?',
      a: 'Adopt (standard recommandé), Trial (projet pilote réel), Assess (évaluation et PoC), Hold (technologie à déprécier ou éviter).'
    },
    {
      q: 'Quels sont les quatre quadrants du Tech Radar ?',
      a: 'Techniques, Outils, Plateformes, Langages & Frameworks.'
    },
    {
      q: 'Qu’est-ce qu’un Bulletin Flash de veille ?',
      a: 'Un document d’urgence synthétique d’une page alertant immédiatement sur une menace ou une rupture technologique critique.'
    },
    {
      q: 'Comment définit-on le Lead Time d’un article dans un workflow de veille ?',
      a: 'Le temps total écoulé entre le repérage initial du signal brut (T1) et sa diffusion validée auprès des équipes (T4).'
    },
    {
      q: 'Que permet l’exception de courte citation en droit d’auteur ?',
      a: 'La reproduction d’extraits brefs à but d’analyse ou d’information, à condition d’indiquer clairement la source et l’auteur.'
    },
    {
      q: 'Pourquoi une note de veille doit-elle toujours comporter des recommandations d’action ?',
      a: 'Pour transformer une information théorique en décision opérationnelle concrète pour l’entreprise et ses projets.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à hiérarchiser les livrables selon les cibles ou mauvaise interprétation des anneaux du Tech Radar.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise des formats de restitution, structuration du Tech Radar et organisation agile du flux Kanban.'
    },
    {
      cls: 'high',
      text: 'Excellence en gouvernance de veille : animation de comités d’architecture, optimisation continue du Lead Time et rigueur déontologique exemplaire.'
    }
  ]
};
