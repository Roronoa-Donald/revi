/**
 * Pages « examens » et « exercices » du cours « Méthodes Agiles B3 ».
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
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Méthodes Agiles B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux standards académiques et professionnels de niveau Bachelor 3 en gestion de projet agile, cadre Scrum, flux Kanban et scaling.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Du Cycle Traditionnel au Cadre Scrum &amp; Kanban', [
      '<h4>Partie 1 : Du Cycle Prédictif au Manifeste Agile (6 points)</h4>',
      '<ol>',
      '  <li>Expliquez pourquoi le Triangle de Fer classique (Périmètre, Coût, Délais) conduit souvent à l’échec dans les projets logiciels complexes à forte incertitude. Comment l’approche Agile inverse-t-elle ce triangle ? (3 pts)</li>',
      '  <li>Dans le réseau PERT d’un projet, qu’appelle-t-on le « chemin critique » ? Pourquoi toute tâche située sur le chemin critique présente-t-elle une marge totale nulle ? Quelle en est la conséquence en cas de retard ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Le Cadre Scrum en Pratique (7 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément les responsabilités du Product Owner (PO) et du Scrum Master (SM). Pourquoi le Scrum Guide interdit-il strictement qu’une même personne cumule ces deux rôles ? (3 pts)</li>',
      '  <li>Définissez la Definition of Done (DoD). En quoi se distingue-t-elle des critères d’acceptation d’une User Story spécifique ? Pourquoi un incrément non conforme à la DoD ne peut-il jamais être présenté en Sprint Review ? (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Flux Tiré Kanban &amp; Métriques (7 points)</h4>',
      '<ol>',
      '  <li>Énoncez la Loi de Little ($TH = WIP / CT$). Si une équipe observe que son Cycle Time augmente sans discontinuer, quelle action immédiate sur les limites WIP doit-elle entreprendre selon le principe Lean ? (3 pts)</li>',
      '  <li>Distinguez le Lead Time du Cycle Time. Dans quel cas concret une équipe peut-elle afficher un excellent Cycle Time de 2 jours tout en ayant un Lead Time désastreux de 45 jours ? (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Inversion du Triangle de Fer (3 pts) :</strong> Dans les projets traditionnels en cascade, le périmètre (scope) est fixé contractuellement à 100 % au départ, ce qui transforme le coût et les délais en variables d’ajustement qui dérivent inévitablement. L’approche Agile inverse le triangle : les délais (sprints fixes de 2 à 4 semaines) et les coûts (taille d’équipe stable) sont fixes et maîtrisés, tandis que le périmètre devient la variable d’ajustement priorisée selon la valeur métier délivrée.</li>',
      '  <li><strong>Chemin critique PERT (3 pts) :</strong> Le chemin critique est la séquence continue de tâches dépendantes dont la somme des durées représente le temps minimum incompressible pour achever le projet. Sa marge libre et sa marge totale sont strictement nulles : tout retard d’un seul jour sur n’importe quelle tâche du chemin critique décale directement et mécaniquement la date de livraison finale du projet d’un jour.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Séparation des rôles PO / SM (3 pts) :</strong> Le Product Owner est le garant du « QUOI » et du « POURQUOI » (vision produit, ROI, priorisation de la valeur dans le backlog). Le Scrum Master est le garant du « COMMENT » et du cadre (facilitation, élimination des obstacles, respect de l’agilité, protection de l’équipe). Cumuler les deux rôles engendre un conflit d’intérêts majeur : le PO serait tenté d’imposer une surcharge de travail à l’équipe au détriment de la qualité et de la soutenabilité du rythme de développement.</li>',
      '  <li><strong>Definition of Done vs Critères d’Acceptation (4 pts) :</strong> Les critères d’acceptation sont fonctionnels et spécifiques à une seule User Story (ex: « le bouton de paiement renvoie un reçu PDF »). La Definition of Done (DoD) est une checklist de qualité transverse commune à TOUTES les stories du produit (ex: tests unitaires &gt; 80%, revue de code validée par un pair, documentation API Swagger à jour, déploiement automatisé sur l’environnement de staging validé). Un incrément ne respectant pas la DoD réintroduit de la dette technique et des régressions potentielles : il ne peut ni être comptabilisé dans la vélocité, ni être démontré en Sprint Review.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Loi de Little et action WIP (3 pts) :</strong> La Loi de Little établit que $Throughput = WIP / Cycle\\_Time$, soit $Cycle\\_Time = WIP / Throughput$. À capacité d’équipe (débit) constante, le temps de cycle est directement proportionnel au travail en cours (WIP). Si le Cycle Time explose, l’équipe doit immédiatement abaisser ses limites WIP dans les colonnes du tableau pour forcer l’entraide sur les tâches bloquées avant d’en entamer de nouvelles (<em>« Arrêter de commencer, commencer à finir »</em>).</li>',
      '  <li><strong>Lead Time vs Cycle Time (4 pts) :</strong> Le Cycle Time mesure uniquement le temps passé entre la prise en charge active par un développeur et la mise en production. Le Lead Time mesure l’intégralité du temps écoulé depuis la soumission de l’idée par le client jusqu’à sa livraison. Un écart extrême (CT = 2j, LT = 45j) signifie que l’équipe de développement est très efficace techniquement, mais que le système d’amont est paralysé par un goulot organisationnel (backlog surchargé non raffiné, validation hiérarchique lente ou priorisation absente).</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Final — Estimation, Pilotage de Release &amp; Agilité à l’Échelle', [
      '<h4>Partie 1 : Spécification INVEST &amp; Planning Poker (6 points)</h4>',
      '<ol>',
      '  <li>Détaillez les 6 principes de l’acronyme INVEST pour les User Stories. Pourquoi le critère « Small » est-il indispensable pour garantir la fiabilité des prévisions de vélocité ? (3 pts)</li>',
      '  <li>Lors d’un vote de Planning Poker sur une story, trois développeurs votent 3 points et un développeur vote 20 points. Quelle doit être la réaction immédiate du Scrum Master ? Pourquoi ne doit-on jamais faire la moyenne arithmétique mathématique dans ce cas ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Vélocité, Burn-down &amp; Pilotage de Release (7 points)</h4>',
      '<ol>',
      '  <li>Sur un Sprint Burn-down chart, la courbe réelle monte soudainement de 15 points au jour 4. Quel phénomène cela traduit-il ? Quelles en sont les causes typiques et comment l’équipe doit-elle réagir ? (3 pts)</li>',
      '  <li>Une équipe affiche une vélocité historique moyenne de 25 Story Points par sprint (avec des variations observées entre 18 et 32 points). Le Product Backlog restant compte 120 points. Calculez les bornes du cône d’incertitude (scénario optimiste, attendu, pessimiste) en nombre de sprints. Expliquez pourquoi s’engager sur une date ferme unique est une faute de gouvernance. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Agilité à l’Échelle : SAFe &amp; Modèle Spotify (7 points)</h4>',
      '<ol>',
      '  <li>Dans le modèle Spotify, distinguez le rôle d’une Squad, d’une Tribe, d’un Chapter et d’une Guild. Qui est le responsable hiérarchique (manager) d’un développeur au sein de cette organisation matricielle ? (3 pts)</li>',
      '  <li>Dans le framework SAFe, expliquez le rôle du PI Planning (Program Increment Planning) et l’usage du Program Board. Comment les dépendances inter-équipes critiques y sont-elles visualisées et arbitrées ? (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Final', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Critères INVEST (3 pts) :</strong> Independent (pas de couplage fort), Negotiable (ouverte à la discussion), Valuable (valeur client directe), Estimable (compréhensible par les développeurs), Small (développable dans un sprint), Testable (critères d’acceptation validables). Le critère Small est critique car une story trop grosse (Epic déguisé) masque des incertitudes techniques majeures, bloque le flux et augmente la variance de la vélocité.</li>',
      '  <li><strong>Écart en Planning Poker (3 pts) :</strong> Le rôle du Scrum Master n’est pas de forcer le consensus ni de calculer une moyenne (qui donnerait ~7.25 sans sens métier). Il doit donner la parole aux deux extrêmes : demander au développeur ayant voté 20 points quels risques cachés ou complexités d’architecture il a identifiés, puis au développeur ayant voté 3 points comment il envisage une implémentation simple. Après cet échange d’information précieux, l’équipe vote à nouveau pour converger.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Remontée du Burn-down (Scope Creep) (3 pts) :</strong> Une remontée de la courbe traduit soit l’ajout de nouvelles stories dans le Sprint en cours par le PO (Scope Creep), soit la découverte d’une sous-estimation massive imposant de re-découper des tâches techniques. L’équipe et le Scrum Master doivent rappeler la règle d’or : le périmètre du sprint engagé est verrouillé pour protéger l’objectif (Sprint Goal). Si une tâche critique doit absolument entrer, une story d’effort équivalent doit sortir du Sprint Backlog en accord avec le PO.</li>',
      '  <li><strong>Cône d’incertitude de Release (4 pts) :</strong><br>' +
      '    - Optimiste ($V_{max} = 32$) : $\\lceil 120 / 32 \\rceil = 4$ sprints.<br>' +
      '    - Attendu ($V_{med} = 25$) : $\\lceil 120 / 25 \\rceil = 5$ sprints.<br>' +
      '    - Pessimiste ($V_{min} = 18$) : $\\lceil 120 / 18 \\rceil = 7$ sprints.<br>' +
      '    S’engager sur une date ferme unique nie la nature empirique du développement logiciel. En agile, la communication auprès des directions doit toujours présenter un cône de probabilité (ex: « livraison prévue entre le sprint 4 et le sprint 7, avec cible nominale au sprint 5 »).</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Modèle Spotify &amp; Hiérarchie (3 pts) :</strong> La Squad est l’unité autonome de livraison multidisciplinaire (PO, Dev, QA). La Tribe regroupe les Squads d’un domaine. Le Chapter est la ligne de métier technique (ex: Chapter Lead Backend). La Guild est une communauté informelle d’intérêt. Dans cette organisation matricielle, le PO priorise les tâches au quotidien, mais le responsable hiérarchique (Line Manager) est le Chapter Lead, garant de la montée en compétences et des carrières techniques.</li>',
      '  <li><strong>PI Planning SAFe &amp; Program Board (4 pts) :</strong> Le PI Planning est un grand rituel de 2 jours alignant toutes les équipes d’un Agile Release Train (ART) sur un incrément de 5 sprints (environ 10 semaines). Sur le Program Board visuel physique ou digital, chaque équipe positionne ses fonctionnalités et relie par des fils rouges les dépendances techniques requises par d’autres équipes. Si l’équipe A a besoin d’une API de l’équipe B au sprint 2 mais que l’équipe B ne planifie cette API qu’au sprint 4, l’inversion critique est immédiatement identifiée et renégociée avant de lancer le PI.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento' }, { href: 'exercices.html', label: 'Accéder aux 18 exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs &amp; Épreuves corrigées — ' + course.brand,
      description: 'Sujets complets d’examen blanc et corrigés détaillés du cours Méthodes Agiles B3 : Scrum, Kanban, User Stories et Scaling.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Index ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices de programmation' }
  ]);

  const exercises = [
    { id: 'ag3-c1-e1', ch: 1, title: 'Calculateur d’écart du Triangle de Fer (Périmètre, Coût, Délais)', level: 'n1', lang: 'Étude de cas', desc: 'Évaluer la dérive budgétaire et calendaire d’un projet traditionnel par rapport aux prévisions initiales.' },
    { id: 'ag3-c1-e2', ch: 1, title: 'Calculateur de dates au plus tôt et durée totale d’un graphe PERT', level: 'n2', lang: 'Étude de cas', desc: 'Calculer la date de début au plus tôt (ES) et la fin au plus tôt (EF) de tâches ordonnancées dans un graphe PERT.' },
    { id: 'ag3-c1-e3', ch: 1, title: 'Classificateur d’adéquation méthodologique (Waterfall vs Agile vs Hybride)', level: 'n3', lang: 'Étude de cas', desc: 'Orienter un projet vers le bon modèle d’organisation selon le niveau d’incertitude et les contraintes réglementaires.' },

    { id: 'ag3-c2-e1', ch: 2, title: 'Validateur d’incrément de produit et Definition of Done (DoD)', level: 'n1', lang: 'Étude de cas', desc: 'Vérifier la conformité d’une User Story aux critères stricts de la Definition of Done avant livraison.' },
    { id: 'ag3-c2-e2', ch: 2, title: 'Ordonnanceur de Product Backlog par ROI et Réduction de Risque', level: 'n2', lang: 'Étude de cas', desc: 'Classer les éléments du Product Backlog selon un ratio pondéré Valeur Métier / Effort de développement.' },
    { id: 'ag3-c2-e3', ch: 2, title: 'Contrôleur de Timeboxing des événements Scrum selon le Scrum Guide', level: 'n3', lang: 'Étude de cas', desc: 'Vérifier la stricte conformité de la durée des réunions Scrum par rapport aux limites temporelles maximales officielles.' },

    { id: 'ag3-c3-e1', ch: 3, title: 'Contrôleur de limites de travail en cours (WIP Limits)', level: 'n1', lang: 'Étude de cas', desc: 'Vérifier la stricte conformité des colonnes d’un tableau Kanban aux limites WIP pour éviter la surcharge cognitive.' },
    { id: 'ag3-c3-e2', ch: 3, title: 'Calculateur de Lead Time, Cycle Time et Débit Moyen (Throughput)', level: 'n2', lang: 'Étude de cas', desc: 'Mesurer la performance d’écoulement d’un flux Kanban à travers le temps de traversée total et le temps de traitement actif.' },
    { id: 'ag3-c3-e3', ch: 3, title: 'Simulateur de Loi de Little et Détection de Goulots d’Étranglement', level: 'n3', lang: 'Étude de cas', desc: 'Appliquer la Loi de Little (TH = WIP / CT) pour calculer le débit de chaque étape et identifier le goulot d’étranglement.' },

    { id: 'ag3-c4-e1', ch: 4, title: 'Validateur syntaxique de User Story et conformité INVEST', level: 'n1', lang: 'Étude de cas', desc: 'Vérifier la structure narrative formelle d’une User Story (En tant que, Je veux, Afin de) et la présence de critères d’acceptation.' },
    { id: 'ag3-c4-e2', ch: 4, title: 'Consensus de Planning Poker et Suite de Fibonacci Modifiée', level: 'n2', lang: 'Étude de cas', desc: 'Analyser un tour de vote de Planning Poker, détecter la divergence et projeter l’estimation sur la suite de Fibonacci.' },
    { id: 'ag3-c4-e3', ch: 4, title: 'Parseur de Scénarios Gherkin / BDD (Given - When - Then)', level: 'n3', lang: 'Étude de cas', desc: 'Valider la structure séquentielle d’un scénario de comportement Gherkin (Étant donné, Quand, Alors).' },

    { id: 'ag3-c5-e1', ch: 5, title: 'Calculateur de Vélocité moyenne et estimation d’atterrissage de Release', level: 'n1', lang: 'Étude de cas', desc: 'Calculer la vélocité moyenne d’une équipe sur les derniers sprints et estimer le nombre de sprints nécessaires pour terminer le backlog.' },
    { id: 'ag3-c5-e2', ch: 5, title: 'Traceur de Sprint Burn-down et détection de Dérive de Périmètre (Scope Creep)', level: 'n2', lang: 'Étude de cas', desc: 'Analyser le reste à faire quotidien d’un Sprint, identifier le Scope Creep et évaluer l’avance ou le retard sur la trajectoire idéale.' },
    { id: 'ag3-c5-e3', ch: 5, title: 'Simulateur de Prévision Probabiliste de Release (Pessimiste, Médian, Optimiste)', level: 'n3', lang: 'Étude de cas', desc: 'Calculer la fourchette d’atterrissage d’une Release en intégrant les trois scénarios de vélocité de l’équipe.' },

    { id: 'ag3-c6-e1', ch: 6, title: 'Matrice de Dépendances Inter-équipes en Program Increment (PI Planning)', level: 'n1', lang: 'Étude de cas', desc: 'Détecter les inversions et blocages de dépendances temporelles entre équipes lors d’un PI Planning SAFe.' },
    { id: 'ag3-c6-e2', ch: 6, title: 'Validateur d’Organisation Matricielle Spotify (Squads, Tribes, Chapters)', level: 'n2', lang: 'Étude de cas', desc: 'Contrôler la cohérence de l’affectation des ingénieurs au sein du modèle agile d’entreprise (Spotify Model).' },
    { id: 'ag3-c6-e3', ch: 6, title: 'Radar de Maturité d’Équipe et Détecteur de Dette Méthodologique', level: 'n3', lang: 'Étude de cas', desc: 'Calculer l’indice global de maturité agile d’une équipe sur 5 dimensions clés et alerter sur les faiblesses critiques.' }
  ];

  const cardsHtml = exercises.map(ex => [
    '    <article class="card card--exercise">',
    '      <div class="card__head">',
    '        <span class="badge badge--' + ex.level + '">' + (ex.level === 'n1' ? 'Fondamental' : ex.level === 'n2' ? 'Intermédiaire' : 'Avancé') + '</span>',
    '        <span class="card__num">Module ' + ex.ch + ' • ' + ex.id + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">' + ex.title + '</a></h3>',
    '      <p class="card__desc">' + ex.desc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('terminal') + ' Langage : ' + ex.lang + '</span>',
    '        <a class="btn btn--sm" href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">Résoudre dans le module ' + ic('arrow-right') + '</a>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers Pratiques de Code Lab — Méthodes Agiles B3</h1>',
    '  <p class="lead">18 études de cas pratiques et méthodologiques intégrés directement dans les modules de cours, corrigés avec tests d’évaluation automatisés.</p>',
    '',
    '  <div class="grid grid--2">' + cardsHtml + '</div>',
    '',
    chnav({ href: 'examens.html', label: 'Revenir aux épreuves d’examen' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Répertoire complet des 18 exercices de programmation de manière méthodique du cours Méthodes Agiles B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
