/**
 * Pages « examens » (examens blancs corrigés) et « exercices » (catalogue des 18 code labs) du cours « Veille Technologique & Innovation B3 ».
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
    '  <h1>Épreuves d’Examen Blanc — ' + course.brand + '</h1>',
    '  <p class="lead">Deux épreuves professionnelles complètes de niveau Bachelor 3 pour évaluer vos compétences en conception de dispositifs de veille, traitement algorithmique de données, prospective technologique et pilotage de cellules d’intelligence stratégique.</p>',
    '',
    '  <h2>Examen Blanc 1 : Fondements, Protocoles d’Acquisition &amp; Filtrage Algorithmique</h2>',
    box('standard', 'Épreuve Écrite 1 — Durée : 2 h 00 • Coefficient 3 • Calculatrice autorisée', [
      '<p><strong>Mise en situation :</strong> Vous êtes recruté en tant qu’ingénieur veille et innovation au sein d’une ESN de 500 collaborateurs. La direction souhaite structurer une cellule d’intelligence technologique pour anticiper les évolutions du cloud et de l’IA générative tout en filtrant le bruit documentaire massif.</p>',
      '<h4>Partie 1 : Typologie Sectorielle &amp; Norme AFNOR XP X50-053 (5 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément la veille technologique, la veille concurrentielle et la veille juridique. Donnez pour chacune un exemple de signal concret dans le secteur des infrastructures IT. (3 pts)</li>',
      '  <li>Comparez le mode de veille passive (Pull) et active (Push &amp; Alertes). Pourquoi un dispositif basé exclusivement sur la veille passive expose-t-il l’entreprise à un risque critique d’obsolescence ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Sourcing Documentaire &amp; Qualification des Sources (5 points)</h4>',
      '<ol>',
      '  <li>Formulez une requête de recherche booléenne avancée pour identifier des publications scientifiques PDF récentes sur le « post-quantum cryptography » en excluant les articles sur la crypto-monnaie, limitées au domaine <code>arxiv.org</code> ou <code>nist.gov</code>. (2 pts)</li>',
      '  <li>Exposez les cinq critères de la grille d’évaluation de fiabilité d’une source d’information (autorité, neutralité, traçabilité, croisement, fraîcheur). Expliquez pourquoi la traçabilité des sources primaires est prépondérante face aux rumeurs de blogs spécialisés. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Protocoles d’Acquisition &amp; Déduplication (5 points)</h4>',
      '<ol>',
      '  <li>Expliquez la mécanique de syndication d’un flux RSS 2.0 / Atom. Quelles sont les métadonnées techniques indispensables extraites par un collecteur automatisé ? (2 pts)</li>',
      '  <li>Comment l’indice de similarité de Jaccard est-il utilisé pour détecter les doublons de titres reformulés entre plusieurs dépêches d’actualité ? Donnez la formule mathématique. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 4 : Filtrage Algorithmique &amp; Indexation TF-IDF (5 points)</h4>',
      '<ol>',
      '  <li>Détaillez la chaîne de traitement NLP préliminaire avant l’indexation d’un article de veille (tokenisation, suppression des stopwords, normalisation). (2 pts)</li>',
      '  <li>Expliquez le principe de la pondération TF-IDF. Pourquoi le terme Inverse Document Frequency (IDF) permet-il de pénaliser les mots trop fréquents sur l’ensemble du corpus pour faire ressortir les termes discriminants d’une technologie de rupture ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Blanc 1', [
      '<h4>Corrigé Partie 1 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Typologie sectorielle (3 pts) :</strong> ' +
      '  <em>Veille technologique :</em> surveille les innovations logicielles/matérielles, protocoles, vulnérabilités et brevets (ex: sortie d’un nouveau compilateur ou faille zero-day). ' +
      '  <em>Veille concurrentielle :</em> analyse les mouvements stratégiques des rivaux (ex: rachat d’une startup par un concurrent direct, baisse de tarification cloud). ' +
      '  <em>Veille juridique :</em> suit les évolutions réglementaires et jurisprudences (ex: entrée en vigueur du règlement européen AI Act ou sanctions CNIL RGPD).</li>',
      '  <li><strong>Mode passif vs actif (2 pts) :</strong> Le mode passif (Pull) repose sur une démarche manuelle où le veilleur doit initier chaque recherche. Il engendre une charge temporelle élevée et un angle mort permanent. Le mode actif (Push) pousse l’information via des alertes automatisées dès publication, garantissant une détection en temps réel indispensable pour les failles critiques.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Requête booléenne (2 pts) :</strong> <code>"post-quantum cryptography" -crypto -bitcoin -blockchain (site:arxiv.org OR site:nist.gov) filetype:pdf</code>.</li>',
      '  <li><strong>Fiabilité des sources (3 pts) :</strong> Les 5 axes (autorité 30%, neutralité 25%, traçabilité 20%, croisement 15%, fraîcheur 10%) permettent d’obtenir un score sur 100. La traçabilité vérifie l’accès aux données brutes et aux dépôts de code sources, éliminant les réinterprétations erronées des relais secondaires.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Flux RSS (2 pts) :</strong> Le flux RSS est un document XML standardisé publié par un serveur web. Le robot extrait <code>&lt;guid&gt;</code> (unicité), <code>&lt;title&gt;</code>, <code>&lt;link&gt;</code> et <code>&lt;pubDate&gt;</code> pour alimenter la base de connaissances sans aspirer tout le HTML de la page.</li>',
      '  <li><strong>Indice de Jaccard (3 pts) :</strong> $J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|}$. Il compare les ensembles de mots des deux titres nettoyés. Un score $J \\ge 0.60$ signale une reprise directe d’un même communiqué par deux rédactions différentes, permettant d’éliminer le doublon.</li>',
      '</ul>',
      '<h4>Corrigé Partie 4 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Chaîne NLP (2 pts) :</strong> Mise en minuscules, suppression de la ponctuation, découpage en tokens, élimination des stopwords (mots grammaticaux vides) et conservation des lemmes ou radicaux techniques pertinents.</li>',
      '  <li><strong>Formule TF-IDF (3 pts) :</strong> $\\text{TF}(q, d)$ mesure la densité locale dans le document, tandis que $\\text{IDF}(q) = \\ln\\left(\\frac{N + 1}{\\text{DF}(q) + 1}\\right) + 1$ atténue les mots banals présents dans tous les documents. Un terme apparaissant dans un seul document bénéficie d’un IDF maximal, signalant une innovation spécifique.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Examen Blanc 2 : Analyse Prospective, Hype Cycle, TRL &amp; Organisation de Cellule</h2>',
    box('standard', 'Épreuve Écrite 2 — Durée : 2 h 00 • Coefficient 3 • Cas Pratique d\'Entreprise', [
      '<p><strong>Mise en situation :</strong> Le comité de direction d’un groupe bancaire vous mandate pour évaluer l’opportunité d’adopter les technologies d’ordinateurs quantiques et d’agents autonomes d’IA. Vous devez formaliser les matrices d’aide à la décision et concevoir le dispositif collaboratif de l’équipe de veille.</p>',
      '<h4>Partie 1 : Échelle TRL &amp; Maturité Technologique (5 points)</h4>',
      '<ol>',
      '  <li>Définissez les neuf niveaux de l’échelle TRL (Technology Readiness Level). À partir de quel niveau TRL une technologie peut-elle faire l’objet d’un déploiement en production commerciale sans risque industriel majeur ? (3 pts)</li>',
      '  <li>Quelles différences fondamentales séparent un PoC de laboratoire (TRL 3-4) d’un prototype en environnement opérationnel (TRL 7) ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Modèle Gartner Hype Cycle (5 points)</h4>',
      '<ol>',
      '  <li>Décrivez les 5 phases successives de la courbe de maturité Gartner Hype Cycle. Quelles sont les caractéristiques de la phase « Gouffre des désillusions » (Trough of Disillusionment) ? (3 pts)</li>',
      '  <li>Pourquoi le « Pic des attentes exagérées » (Peak of Inflated Expectations) est-il la phase la plus dangereuse pour réaliser des investissements massifs sans expérimentation préalable ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Matrices Croisées SWOT / PESTEL &amp; Détection de Signaux Faibles (5 points)</h4>',
      '<ol>',
      '  <li>Comment croise-t-on les 6 dimensions externes PESTEL avec les opportunités et menaces de la matrice SWOT pour évaluer la résilience d’un choix d’architecture ? (3 pts)</li>',
      '  <li>Qu’est-ce qu’un signal faible au sens d’Igor Ansoff ? Comment le distingue-t-on mathématiquement d’un bruit de fond ou d’une tendance lourde ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 4 : Restitution Stratégique, Tech Radar &amp; Gouvernance Agile (5 points)</h4>',
      '<ol>',
      '  <li>Présentez l’organisation du Tech Radar (ThoughtWorks) : citez les 4 quadrants et les 4 anneaux d’adoption (Adopt, Trial, Assess, Hold). (3 pts)</li>',
      '  <li>Décrivez le fonctionnement d’une cellule de veille organisée selon un workflow Kanban éditorial (Collecte, Évaluation, Validation, Diffusion). Quel indicateur clé mesure l’efficacité opérationnelle de l’équipe ? (2 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Blanc 2', [
      '<h4>Corrigé Partie 1 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Échelle TRL (3 pts) :</strong> TRL 1 (principes), TRL 2 (concept), TRL 3 (PoC analytique), TRL 4 (labo), TRL 5 (représentatif), TRL 6 (prototype représentatif), TRL 7 (prototype opérationnel), TRL 8 (système complet certifié), TRL 9 (système opérationnel éprouvé en conditions réelles). Le déploiement commercial sans risque requiert impérativement un TRL 8 ou 9.</li>',
      '  <li><strong>PoC vs Prototype opérationnel (2 pts) :</strong> Le PoC TRL 3 valide la faisabilité théorique d’une brique isolée sans contraintes de charge ni de sécurité. Le prototype TRL 7 est testé en conditions réelles avec données réelles, contraintes réseau et tolérance aux pannes.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Phases Gartner (3 pts) :</strong> 1. Innovation Trigger, 2. Peak of Inflated Expectations, 3. Trough of Disillusionment, 4. Slope of Enlightenment, 5. Plateau of Productivity. Dans le gouffre des désillusions, l’intérêt médiatique s’effondre car les promesses initiales n’ont pas été tenues, les startups non viables disparaissent et seuls les cas d’usage à réelle valeur ajoutée subsistent.</li>',
      '  <li><strong>Risques du Pic d’attentes (2 pts) :</strong> Au pic d’attentes, le buzz médiatique masque les immatures techniques réelles (coûts cachés, manque de compétences, absence de normes). Investir massivement à ce stade sans PoC expose à des échecs de projets et des surcoûts d’intégration.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (5 points)</h4>',
      '<ul>',
      '  <li><strong>PESTEL croisé SWOT (3 pts) :</strong> Chaque facteur externe (Politique, Économique, Sociétal, Technologique, Environnemental, Légal) est projeté en Opportunité (bénéfice actionnable) ou Menace (risque de conformité ou obsolescence) avec une pondération. La somme nette et le ratio de résilience déterminent la posture : Offensive, Défensive ou Attentiste.</li>',
      '  <li><strong>Signaux faibles (2 pts) :</strong> Un signal faible est une information parcellaire, à très faible volume d’occurrence globale, mais caractérisée par une forte dérivée seconde d’accélération (doublement des mentions de période en période). Contrairement au bruit de fond qui stagne à bas niveau, le signal faible préfigure une rupture future.</li>',
      '</ul>',
      '<h4>Corrigé Partie 4 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Tech Radar (3 pts) :</strong> Quadrants : Techniques, Outils, Plateformes, Langages &amp; Frameworks. Anneaux : Adopt (standard obligatoire), Trial (pilotes réels), Assess (expérimentation labo), Hold (obsolète ou gelé).</li>',
      '  <li><strong>Workflow Kanban éditorial (2 pts) :</strong> Les articles passent par un pipeline de validation par les pairs et le Lead Analyst pour garantir la pertinence avant publication aux décideurs. L’indicateur clé est le Lead Time (temps de cycle moyen de traitement de la collecte à la diffusion) associé au taux d’approbation.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento méthodologique' }, { href: 'exercices.html', label: 'Voir le catalogue des 18 exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Épreuves d’examen blanc corrigées de niveau B3 en intelligence technologique, protocoles de collecte, TF-IDF, TRL, Gartner et Tech Radar.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Index ======================== */

function exercices(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Catalogue des exercices' }
  ]);

  const exercises = [
    { id: 'vt3-c1-e1', ch: 1, title: 'Classificateur de veille sectorielle et analyse de réactivité', level: 'n1', lang: 'Étude de cas', desc: 'Classifier des signaux selon la typologie de veille (technologique, concurrentielle, juridique, etc.) et leur posture proactive/réactive.' },
    { id: 'vt3-c1-e2', ch: 1, title: 'Évaluateur de posture et temporalité de veille (Matrice AFNOR)', level: 'n2', lang: 'Étude de cas', desc: 'Calculer le score d’efficacité d’un dispositif de veille selon son mode de collecte et sa fréquence temporelle.' },
    { id: 'vt3-c1-e3', ch: 1, title: 'Calculateur de retour sur investissement (ROI) de la veille stratégique', level: 'n3', lang: 'Étude de cas', desc: 'Mesurer la rentabilité économique de la cellule de veille en chiffrant les risques prévenus et les gains captés.' },

    { id: 'vt3-c2-e1', ch: 2, title: 'Générateur et normalisateur de requêtes booléennes avancées', level: 'n1', lang: 'Étude de cas', desc: 'Construire une requête booléenne de recherche d’ingénierie conforme aux standards de dorking et de documentation.' },
    { id: 'vt3-c2-e2', ch: 2, title: 'Auditeur de fiabilité des sources d’information (Score pondéré)', level: 'n2', lang: 'Étude de cas', desc: 'Évaluer la crédibilité d’une source d’information sur cinq axes méthodologiques pondérés.' },
    { id: 'vt3-c2-e3', ch: 2, title: 'Détecteur de signaux faibles par accélération d’émergence lexicale', level: 'n3', lang: 'Étude de cas', desc: 'Analyser une série temporelle d’occurrences pour distinguer les signaux faibles émergents du bruit de fond.' },

    { id: 'vt3-c3-e1', ch: 3, title: 'Parseur de flux de syndication RSS 2.0 / Atom', level: 'n1', lang: 'Étude de cas', desc: 'Extraire et structurer les métadonnées techniques (titre, lien, date, identifiant GUID) d’un flux XML de veille.' },
    { id: 'vt3-c3-e2', ch: 3, title: 'Moteur de déduplication multi-sources et nettoyage de liens UTM', level: 'n2', lang: 'Étude de cas', desc: 'Éliminer les doublons stricts et quasi-doublons de flux via normalisation d’URL et similarité lexicale de Jaccard.' },
    { id: 'vt3-c3-e3', ch: 3, title: 'Simulateur d’ordonnanceur de collecte hybride Push/Pull avec Rate Limiter', level: 'n3', lang: 'Étude de cas', desc: 'Simuler la charge de collecte sur un parc hétérogène de sources en appliquant les quotas de limitation de requêtes.' },

    { id: 'vt3-c4-e1', ch: 4, title: 'Tokeniseur et filtre de mots vides (Stopwords & Normalisation)', level: 'n1', lang: 'Étude de cas', desc: 'Nettoyer un corpus textuel de veille, supprimer la ponctuation, éliminer les stopwords et extraire le vocabulaire saillant.' },
    { id: 'vt3-c4-e2', ch: 4, title: 'Calculateur de score de pertinence TF-IDF sur un corpus de veille', level: 'n2', lang: 'Étude de cas', desc: 'Classer un corpus de documents selon leur score de pertinence TF-IDF pour une requête de veille ciblée.' },
    { id: 'vt3-c4-e3', ch: 4, title: 'Classificateur bayésien naïf d’alertes de veille (Pertinent vs Bruit)', level: 'n3', lang: 'Étude de cas', desc: 'Appliquer le modèle probabiliste de Naive Bayes pour filtrer automatiquement les alertes en éliminant le bruit.' },

    { id: 'vt3-c5-e1', ch: 5, title: 'Évaluateur d’échelle TRL (Technology Readiness Level de 1 à 9)', level: 'n1', lang: 'Étude de cas', desc: 'Qualifier le niveau de maturité technologique d’une innovation selon la grille standardisée TRL.' },
    { id: 'vt3-c5-e2', ch: 5, title: 'Positionneur de phase Gartner Hype Cycle et conseil d’investissement', level: 'n2', lang: 'Étude de cas', desc: 'Positionner une technologie émergente sur la courbe du Hype Cycle de Gartner et émettre une recommandation d’action.' },
    { id: 'vt3-c5-e3', ch: 5, title: 'Analyseur d’impact technologique croisé SWOT / PESTEL', level: 'n3', lang: 'Étude de cas', desc: 'Agréger les facteurs externes PESTEL en opportunités et menaces pour calculer l’indice de résilience stratégique.' },

    { id: 'vt3-c6-e1', ch: 6, title: 'Générateur de bulletin d’alerte de veille synthétique (Curated Digest)', level: 'n1', lang: 'Étude de cas', desc: 'Mettre en forme et prioriser un flux d’articles pour produire un bulletin de veille exécutif hiérarchisé.' },
    { id: 'vt3-c6-e2', ch: 6, title: 'Calculateur de radar technologique (Tech Radar ThoughtWorks)', level: 'n2', lang: 'Étude de cas', desc: 'Classer les technologies selon les quatre quadrants et les quatre anneaux d’adoption du Tech Radar.' },
    { id: 'vt3-c6-e3', ch: 6, title: 'Simulateur de gouvernance d’équipe et workflow Kanban de veille', level: 'n3', lang: 'Étude de cas', desc: 'Mesurer la performance d’une cellule de veille en calculant le temps de cycle (Lead Time) et le taux d’approbation.' }
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
    '  <h1>Catalogue des 18 Ateliers Pratiques de Code Lab — Veille Technologique B3</h1>',
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
      description: 'Répertoire complet des 18 exercices de programmation de manière méthodique du cours Veille Technologique B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
