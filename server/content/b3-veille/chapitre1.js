/**
 * Chapitre 1 du cours « Veille Technologique & Innovation B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Introduction, Définitions &amp; Typologie de la Veille Stratégique',
  short: 'Fondements &amp; Typologie',
  toc: 'Définition et finalités de la veille en entreprise, typologie sectorielle (technologique, concurrentielle, juridique/réglementaire, commerciale, sociétale), dimensions temporelles (ponctuelle, périodique, permanente), postures opérationnelles (passive vs active, réactive vs proactive) et calcul du retour sur investissement (ROI).',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Dans un secteur numérique en mutation perpétuelle, marqué par l’irruption des modèles d’IA générative, l’évolution effrénée des architectures cloud et le renforcement des réglementations européennes (RGPD, NIS 2, DORA, AI Act), ignorer son environnement technique expose directement l’organisation à la dette technologique, aux failles de sécurité zero-day et à la perte d’avantage concurrentiel. Pour un ingénieur de niveau Bachelor 3, la veille ne se résume pas à une navigation passive sur des forums ou des réseaux sociaux : elle constitue un processus systématique, structuré et outillé de collecte, de traitement et d’exploitation de l’information stratégique. L’étudiant doit savoir qualifier les différentes dimensions sectorielles de la veille, évaluer la posture d’anticipation requise et justifier économiquement la valeur ajoutée du dispositif.',
  objectives: [
    'assimiler la définition, les enjeux et les finalités stratégiques de la veille technologique en entreprise ;',
    'différencier avec rigueur les cinq grands types de veille sectorielle (technologique, concurrentielle, juridique, commerciale, sociétale) ;',
    'analyser les fréquences temporelles de veille : ponctuelle (état des lieux), périodique (bilan) et permanente (temps réel) ;',
    'distinguer les postures opérationnelles : veille passive (Pull) vs active (Push &amp; alertes), réactive vs proactive ;',
    'modéliser le calcul du retour sur investissement (ROI) et du Benefit-Cost Ratio (BCR) pour justifier les investissements d’ingénierie ;',
    'analyser et résoudre méthodologiquement des classificateurs automatiques de signaux sectoriels et des évaluateurs d’efficacité opérationnelle.'
  ],
  sections: [
    {
      title: 'Qu’est-ce que la Veille ? Définitions, Objectifs & Enjeux Stratégiques',
      html: [
        '<p>Étymologiquement issue de l’idée de « garde de nuit », de surveillance et d’attention vigilante, la <strong>veille en entreprise</strong> est l’ensemble des activités méthodiques de collecte, de traitement et de diffusion de l’information utile à la prise de décision stratégique :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Cinq Objectifs Majeurs de la Veille</h4>',
        '    <ol>',
        '      <li><strong>Anticiper les ruptures :</strong> Détecter les signaux faibles et les ruptures technologiques avant les concurrents pour réagir avec agilité.</li>',
        '      <li><strong>Réduire l’incertitude décisionnelle :</strong> Fournir aux décideurs et équipes d’architecture des données objectives pour valider les choix d’infrastructure.</li>',
        '      <li><strong>Innover et s’inspirer :</strong> Observer l’état de l’art mondial pour concevoir de nouveaux produits et accélérer la R&amp;D.</li>',
        '      <li><strong>Sécuriser la conformité :</strong> Suivre les obligations légales, les normes industrielles (ISO/CEI) et les référentiels de cybersécurité.</li>',
        '      <li><strong>Maîtriser les risques concurrentiels :</strong> Surveiller les politiques tarifaires, les dépôts de brevets et les mouvements stratégiques rivaux.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les Acteurs de la Veille Technologique</h4>',
        '    <p>La veille mobilise un écosystème d’acteurs interconnectés :</p>',
        '    <ul>',
        '      <li><strong>Les entreprises et DSI :</strong> Pour piloter leur feuille de route technique (Tech Roadmap) et préserver leur compétitivité.</li>',
        '      <li><strong>Les cellules de veille et documentalistes :</strong> Professionnels de l’information qualifiant les sources et alimentant les bases de connaissances.</li>',
        '      <li><strong>Les chercheurs et centres de R&amp;D :</strong> Qui publient les avancées scientifiques et déposent les brevets industriels.</li>',
        '      <li><strong>Les régulateurs et institutions publiques :</strong> (ANSSI, CNIL, NIST, ENISA) publiant avis de sécurité et cadres réglementaires.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Typologie Sectorielle de la Veille Stratégique',
      html: [
        '<p>Pour couvrir l’ensemble de l’environnement d’une organisation, la veille globale d’entreprise se décompose en cinq domaines sectoriels complémentaires :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Veille Technologique</h4>',
        '    <p>Observation systématique de l’information scientifique, logicielle et matérielle : nouveaux frameworks, langages, brevets d’ingénierie, protocoles réseau, algorithmes d’IA et vulnérabilités de sécurité (CVE).</p>',
        '    <p><em>Exemple :</em> Suivi de la sortie de la spécification HTTP/3 (QUIC) et de son adoption par les serveurs web.</p>',
        '    <h4>2. Veille Concurrentielle</h4>',
        '    <p>Surveillance des mouvements des entreprises rivales : campagnes de recrutement de talents, rachats de startups, fusions, levées de fonds, grilles tarifaires et catalogues de services.</p>',
        '    <p><em>Exemple :</em> Détection d’une baisse tarifaire de 20 % d’un fournisseur cloud concurrent sur le stockage objet.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Veille Juridique &amp; Réglementaire</h4>',
        '    <p>Suivi de l’évolution des textes de lois, décrets d’application, directives européennes, normes ISO et décisions de justice.</p>',
        '    <p><em>Exemple :</em> Analyse des exigences d’audit de résilience opérationnelle numérique imposées par le règlement DORA.</p>',
        '    <h4>4. Veille Commerciale &amp; Fournisseurs</h4>',
        '    <p>Observation des marchés, des comportements d’achat des clients, des appels d’offres publics et de la solvabilité des sous-traitants.</p>',
        '    <h4>5. Veille Sociétale &amp; Environnementale (RSE)</h4>',
        '    <p>Surveillance des tendances de fond socioculturelles, de l’éthique numérique, de l’impact carbone des datacenters et du Green IT.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Fréquences Temporelles & Postures Opérationnelles de Veille',
      html: [
        '<p>L’efficacité d’un dispositif de veille repose sur le croisement entre sa fréquence temporelle et la posture active ou passive des équipes :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Trois Fréquences Temporelles</h4>',
        '    <ul>',
        '      <li><strong>Veille ponctuelle :</strong> État des lieux réalisé à un instant $T$ précis dans un contexte donné (ex: benchmark pour le choix d’un SGBD avant de démarrer un projet).</li>',
        '      <li><strong>Veille périodique :</strong> Surveillance à intervalles réguliers (hebdomadaire, mensuelle) alimentée par des revues de presse, bilans et newsletters thématiques.</li>',
        '      <li><strong>Veille permanente :</strong> Surveillance continue en temps réel permettant de capter les signaux faibles et les alertes de sécurité critiques (CERT-FR, failles zero-day).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Posture Passive (Pull) vs Active (Push) &amp; Réactivité</h4>',
        '    <ul>',
        '      <li><strong>Mode Passif (Pull) :</strong> Le veilleur est demandeur de l’information. Il consulte manuellement les sites sans système d’alerte. Risque élevé de retard et perte de temps.</li>',
        '      <li><strong>Mode Actif (Push) :</strong> L’information qualifiée est poussée automatiquement vers le veilleur via des alertes, flux RSS ou webhooks. Gain d’efficacité maximal.</li>',
        '      <li><strong>Réactive vs Proactive :</strong> La veille réactive constate les événements a posteriori pour s’adapter dans l’urgence ; la veille proactive anticipe les tendances pour prendre l’initiative.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('tip', '<strong>Justification économique du dispositif de veille :</strong> Le calcul du ROI de la veille se formalise par : $\\text{ROI} = \\frac{(\\text{Pertes évitées} + \\text{Opportunités captées}) - \\text{Coût de veille}}{\\text{Coût de veille}} \\times 100$. Un litige réglementaire évité ou une faille critique anticipée rentabilise instantanément le coût annuel d’une cellule de veille.')
      ].join('\n')
    }
  ],
  method: [
    '1. Identifier les objectifs stratégiques prioritaires de l’organisation (innovation, cybersécurité, conformité, concurrence).',
    '2. Cartographier les cinq domaines de veille sectorielle requis pour le périmètre du projet.',
    '3. Définir la périodicité de surveillance adaptée à chaque type de donnée (permanente pour les CVE, mensuelle pour la prospective).',
    '4. Mettre en place des mécanismes Push automatisés pour minimiser le coût temporel du mode Pull manuel.',
    '5. Mesurer et formaliser les bénéfices financiers tangibles (incidents évités, opportunités saisies) face au budget engagé.',
    '6. Développer des scripts Python d’évaluation et de classification pour automatiser le tri des signaux entrants.'
  ],
  summary: [
    'La veille technologique est une démarche systématique de collecte et de traitement de l’information stratégique.',
    'Les cinq domaines sectoriels majeurs sont la veille technologique, concurrentielle, juridique, commerciale et sociétale.',
    'La temporalité se décline en veille ponctuelle (état des lieux), périodique (bilan récurrent) et permanente (temps réel).',
    'La technique Pull exige que l’utilisateur cherche l’information ; la technique Push pousse l’information vers le veilleur via des alertes.',
    'Une posture proactive anticipe les ruptures futures au lieu de subir les évolutions en mode réactif.',
    'La rentabilité de la veille se démontre par le chiffrage des pertes évitées et des gains d’opportunités captés (ROI).'
  ],
  checklist: [
    'Ai-je bien distingué la veille technologique pure de la veille concurrentielle et juridique ?',
    'Le dispositif combine-t-il une veille permanente pour la sécurité et périodique pour les tendances de fond ?',
    'Des alertes automatisées en mode Push sont-elles configurées pour éviter le piège du mode Pull exclusif ?',
    'La cellule de veille adopte-t-elle une posture proactive d’anticipation plutôt que réactive ?',
    'Les bénéfices économiques de la veille (pertes prévenues, opportunités) sont-ils documentés pour la direction ?',
    'Les signaux entrants sont-ils classifiés selon une nomenclature sectorielle partagée ?'
  ],
  notions: [
    'Intelligence technologique & stratégique',
    'Veille sectorielle (Technologique, Concurrentielle, Juridique, Commerciale, Sociétale)',
    'Fréquence temporelle (Ponctuelle, Périodique, Permanente)',
    'Techniques Pull vs Push',
    'Posture Réactive vs Proactive',
    'Norme AFNOR XP X50-053',
    'Retour sur investissement (ROI) de la veille',
    'Benefit-Cost Ratio (BCR) & Coût d’inaction'
  ],
  pitfalls: [
    'Confondre veille technologique et simple navigation récréative sur les réseaux sociaux sans objectif d’actionnabilité.',
    'S’appuyer uniquement sur le mode Pull manuel et passer à côté d’alertes de vulnérabilité critiques publiées en temps réel.',
    'Négliger la veille juridique et réglementaire, risquant de lourdes sanctions financières de conformité (RGPD, NIS 2).',
    'Accumuler des données brutes en masse sans synthèse ni restitution adaptée aux décideurs (infobésité toxique).'
  ],
  questions: [
    {
      stem: 'Quelle typologie de veille surveille spécifiquement les dépôts de brevets, les nouveaux frameworks et les vulnérabilités CVE ?',
      opts: [
        'Veille sociétale',
        'Veille technologique',
        'Veille commerciale',
        'Veille concurrentielle'
      ],
      correct: 1,
      exp: 'La veille technologique observe l’information scientifique, technique, les protocoles, brevets et failles de sécurité.'
    },
    {
      stem: 'Quelle est la caractéristique fondamentale de la méthode Push en veille d’information ?',
      opts: [
        'Le veilleur doit naviguer manuellement sur chaque site chaque matin',
        'L’information est poussée automatiquement vers le veilleur selon des critères préétablis (alertes, flux RSS)',
        'L’information est conservée secrète sur disque sans être lue',
        'Elle ne fonctionne qu’avec des courriers postaux papier'
      ],
      correct: 1,
      exp: 'En mode Push, des systèmes d’alertes automatisés signalent immédiatement au veilleur la parution de nouveaux contenus.'
    },
    {
      stem: 'Une entreprise qui découvre la sortie d’un produit concurrent six mois après son lancement et tente d’adapter ses tarifs en catastrophe adopte une posture :',
      opts: [
        'Proactive',
        'Réactive',
        'Prospective',
        'Prédictive'
      ],
      correct: 1,
      exp: 'La posture réactive subit les évolutions de l’environnement a posteriori et s’adapte sous la contrainte dans l’urgence.'
    },
    {
      stem: 'Quel type de fréquence de veille permet d’intercepter en continu les alertes zero-day et les signaux faibles ?',
      opts: [
        'Veille ponctuelle',
        'Veille annuelle',
        'Veille permanente',
        'Veille rétrospective'
      ],
      correct: 2,
      exp: 'La veille permanente opère en continu et en temps réel pour capter immédiatement les événements critiques.'
    },
    {
      stem: 'Quelle norme française de référence encadre les prestations et le système de management de veille ?',
      opts: [
        'ISO 9001',
        'AFNOR XP X50-053',
        'RFC 793',
        'IEEE 802.3'
      ],
      correct: 1,
      exp: 'La norme AFNOR XP X50-053 définit les prestations et exigences méthodologiques pour la gestion de la veille en entreprise.'
    },
    {
      stem: 'Que désigne le « coût d’inaction » dans l’analyse économique de la veille stratégique ?',
      opts: [
        'Le coût des abonnements aux revues',
        'Les pertes financières subies ou les litiges encourus faute d’avoir anticipé une information clé',
        'Le salaire de l’ingénieur veilleur',
        'Le coût de l’électricité consommée par les serveurs'
      ],
      correct: 1,
      exp: 'Le coût d’inaction mesure les pertes matérielles, amendes ou déclassements subis par l’entreprise par manque d’anticipation.'
    },
    {
      stem: 'Quel type de veille analyse les sanctions prononcées par la CNIL et les décrets d’application du RGPD ?',
      opts: [
        'Veille technologique',
        'Veille sociétale',
        'Veille juridique & réglementaire',
        'Veille commerciale'
      ],
      correct: 2,
      exp: 'La veille juridique et réglementaire assure le suivi de la législation, des décrets, des normes et des jurisprudences.'
    },
    {
      stem: 'Comment qualifie-t-on une veille réalisée à un instant T précis pour réaliser un état des lieux avant de lancer un projet ?',
      opts: [
        'Veille ponctuelle',
        'Veille permanente',
        'Veille perpétuelle',
        'Veille récursive'
      ],
      correct: 0,
      exp: 'La veille ponctuelle est déclenchée pour répondre à une question spécifique ou réaliser un état de l’art à un moment précis.'
    }
  ],
  flashcards: [
      { q: 'Qu’est-ce que « Intelligence technologique & stratégique » ?', a: 'Intelligence technologique & stratégique' },
      { q: 'Qu’est-ce que « Fréquence temporelle (Ponctuelle, Périodique, Permanente) » ?', a: 'Fréquence temporelle (Ponctuelle, Périodique, Permanente)' },
      { q: 'Qu’est-ce que « Techniques Pull vs Push » ?', a: 'Techniques Pull vs Push : distinguer les postures opérationnelles : veille passive (Pull) vs active (Push & alertes), réactive vs proactive ;' },
      { q: 'Qu’est-ce que « Norme AFNOR XP X50-053 » ?', a: 'Norme AFNOR XP X50-053 : Sécuriser la conformité : Suivre les obligations légales, les normes industrielles (ISO/CEI) et les référentiels de cybersécurité.' },
      { q: 'Qu’est-ce que « Benefit-Cost Ratio (BCR) & Coût d’inaction » ?', a: 'Benefit-Cost Ratio (BCR) & Coût d’inaction' },
      { q: 'Qu’est-ce que « Cycle du renseignement (Intelligence Cycle) » ?', a: 'Cycle du renseignement (Intelligence Cycle)' },
      { q: 'Qu’est-ce que « Sources primaires, secondaires et tertiaires » ?', a: 'Sources primaires, secondaires et tertiaires' },
      { q: 'Qu’est-ce que « Équations booléennes (AND, OR, NOT) » ?', a: 'Équations booléennes (AND, OR, NOT)' },
      { q: 'Qu’est-ce que « Google Dorks (site » ?', a: 'Google Dorks (site:, filetype:, inurl:, intitle:)' },
      { q: 'Qu’est-ce que « Grille d’évaluation multicritère de crédibilité » ?', a: 'Grille d’évaluation multicritère de crédibilité' },
      { q: 'Qu’est-ce que « Biais de confirmation & esprit critique » ?', a: 'Biais de confirmation & esprit critique' },
      { q: 'Qu’est-ce que « Signaux faibles (Théorie d’Igor Ansoff) » ?', a: 'Signaux faibles (Théorie d’Igor Ansoff)' },
      { q: 'Qu’est-ce que « Dérivée d’accélération lexicale & détection de ruptures » ?', a: 'Dérivée d’accélération lexicale & détection de ruptures' },
      { q: 'Qu’est-ce que « Protocoles Push vs Pull » ?', a: 'Protocoles Push vs Pull : Automatiser la collecte de données sur le web est une compétence clé de l’ingénieur système et data. Cependant, agréger des dizaines de flux d’actualités expose à deux écueils majeurs : l’aspiration de contenus redondants sous des URLs de tracking différentes et le blocage d’adre' },
      { q: 'Qu’est-ce que « Syndication RSS 2.0 & Atom XML » ?', a: 'Syndication RSS 2.0 & Atom XML' },
      { q: 'Qu’est-ce que « Balises XML &lt;item&gt;, &lt;guid&gt;, &lt;title&gt;, &lt;link&gt;, &lt;pubDate&gt; » ?', a: 'Les balises structurées essentielles d’un item RSS/Atom (titre, URL, identifiant permanent, date). Ne pas les parser avec des regex rigides.' },
      { q: 'Qu’est-ce que « Paramètres d’URL de tracking (UTM parameters) » ?', a: 'Paramètres d’URL de tracking (UTM parameters)' },
      { q: 'Qu’est-ce que « Similarité lexicale de Jaccard (Jaccard Index) » ?', a: 'Similarité lexicale de Jaccard (Jaccard Index)' },
      { q: 'Qu’est-ce que « Déduplication stricte vs quasi-déduplication » ?', a: 'Déduplication stricte vs quasi-déduplication' },
      { q: 'Qu’est-ce que « Rate Limiting & Algorithme Token Bucket » ?', a: 'Rate Limiting & Algorithme Token Bucket' },
      { q: 'Qu’est-ce que « Codes HTTP 429 (Too Many Requests) & robots.txt » ?', a: 'Codes HTTP 429 (Too Many Requests) & robots.txt' },
      { q: 'Qu’est-ce que « Traitement automatique du langage naturel (NLP) » ?', a: 'Traitement automatique du langage naturel (NLP) : Après la phase de collecte, une cellule de veille fait face à des flux textuels massifs contenant des milliers d’articles hétérogènes. Si l’on se contente d’une recherche par mots-clés basique, les ingénieurs sont submergés par des faux positifs et des communications promotionnel' },
      { q: 'Qu’est-ce que « Tokenisation & Normalisation » ?', a: 'Tokenisation & Normalisation' },
      { q: 'Qu’est-ce que « Mots vides (Stopwords) » ?', a: 'comprendre et appliquer le filtrage des mots vides (stopwords) et la tokenisation normalisée ;' },
      { q: 'Qu’est-ce que « Score de pertinence vectoriel TF-IDF » ?', a: 'Score de pertinence vectoriel TF-IDF' },
      { q: 'Qu’est-ce que « Classificateur bayésien naïf (Naive Bayes) » ?', a: 'implémenter un classificateur bayésien naïf (Naive Bayes) pour discriminer alertes critiques et bruits de fond ;' },
      { q: 'Qu’est-ce que « Log-vraisemblance & Log-cotes (Log-odds) » ?', a: 'Log-vraisemblance & Log-cotes (Log-odds)' },
      { q: 'Qu’est-ce que « Technology Readiness Level (TRL 1 à 9) » ?', a: 'Technology Readiness Level (TRL 1 à 9)' },
      { q: 'Qu’est-ce que « Macro-phases Recherche, Développement, Industrialisation » ?', a: 'Macro-phases Recherche, Développement, Industrialisation' },
      { q: 'Qu’est-ce que « Innovation Trigger & Peak of Inflated Expectations » ?', a: 'Innovation Trigger & Peak of Inflated Expectations' },
      { q: 'Qu’est-ce que « Analyse PESTEL (6 dimensions) » ?', a: 'Analyse PESTEL (6 dimensions)' },
      { q: 'Qu’est-ce que « Matrice SWOT croisée & Indice de résilience » ?', a: 'Matrice SWOT croisée & Indice de résilience' },
      { q: 'Qu’est-ce que « Innovations de rupture (Disruptive Innovations de Christensen) » ?', a: 'Innovations de rupture (Disruptive Innovations de Christensen)' },
      { q: 'Qu’est-ce que « : Bulletin de veille périodique compilant une sélection rigoureusement qualifiée d’articles et signaux faibles hiérarchisés par criticité. » ?', a: ': Bulletin de veille périodique compilant une sélection rigoureusement qualifiée d’articles et signaux faibles hiérarchisés par criticité.' },
      { q: 'Qu’est-ce que « : Outil de cartographie technologique à 4 quadrants et 4 anneaux (Adopt, Trial, Assess, Hold) formalisé pour piloter les choix techniques en entreprise. » ?', a: ': Outil de cartographie technologique à 4 quadrants et 4 anneaux (Adopt, Trial, Assess, Hold) formalisé pour piloter les choix techniques en entreprise.' },
      { q: 'Qu’est-ce que « : Statut du Tech Radar désignant une technologie mature, rentable et éprouvée, constituant le standard officiel de production pour l’organisation. » ?', a: ': Statut du Tech Radar désignant une technologie mature, rentable et éprouvée, constituant le standard officiel de production pour l’organisation.' },
      { q: 'Qu’est-ce que « : Statut du Tech Radar signalant une technologie obsolète ou trop risquée pour laquelle aucun nouveau projet ne doit être démarré. » ?', a: ': Statut du Tech Radar signalant une technologie obsolète ou trop risquée pour laquelle aucun nouveau projet ne doit être démarré.' },
      { q: 'Qu’est-ce que « : Temps total écoulé entre le repérage initial d’un signal brut (T1) et sa diffusion qualifiée aux équipes concernées (T4). » ?', a: ': Temps total écoulé entre le repérage initial d’un signal brut (T1) et sa diffusion qualifiée aux équipes concernées (T4).' },
      { q: 'Qu’est-ce que « : Méthode agile de gestion des flux visuels permettant de réguler le passage des signaux à travers les étapes de qualification et de validation. » ?', a: ': Méthode agile de gestion des flux visuels permettant de réguler le passage des signaux à travers les étapes de qualification et de validation.' },
      { q: 'Qu’est-ce que « : Dérogation au droit d’auteur autorisant la reproduction d’extraits brefs d’une œuvre sous réserve de mentionner clairement l’auteur et la source. » ?', a: ': Dérogation au droit d’auteur autorisant la reproduction d’extraits brefs d’une œuvre sous réserve de mentionner clairement l’auteur et la source.' },
      { q: 'Qu’est-ce que « : Cadre juridique protégeant les informations stratégiques d’une entreprise contre l’obtention, l’utilisation et la divulgation illicites. » ?', a: ': Cadre juridique protégeant les informations stratégiques d’une entreprise contre l’obtention, l’utilisation et la divulgation illicites.' },
    {
      q: 'Qu’est-ce que la veille technologique ?',
      a: 'L’ensemble des activités organisées de collecte, traitement et diffusion d’informations scientifiques et techniques utiles à l’organisation.'
    },
    {
      q: 'Quels sont les cinq domaines de la veille sectorielle ?',
      a: 'Veille technologique, concurrentielle, juridique/réglementaire, commerciale et sociétale.'
    },
    {
      q: 'Quelle est la différence entre la méthode Pull et Push ?',
      a: 'Pull : le veilleur va chercher l’information manuellement ; Push : l’information est envoyée automatiquement au veilleur via des alertes.'
    },
    {
      q: 'Quelles sont les trois temporalités de la veille ?',
      a: 'Ponctuelle (état des lieux à un moment T), périodique (bilan à intervalles réguliers) et permanente (temps réel continu).'
    },
    {
      q: 'Quelle est la formule du retour sur investissement (ROI) de la veille ?',
      a: 'ROI = [(Pertes évitées + Gains opportunités) - Coût de veille] / Coût de veille × 100.'
    },
    {
      q: 'Pourquoi la veille proactive est-elle supérieure à la veille réactive ?',
      a: 'Car elle permet d’anticiper les ruptures et de se positionner en avance plutôt que de subir et s’adapter dans l’urgence.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à identifier les domaines sectoriels de veille ou confusion entre les modes Pull et Push.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension de la typologie AFNOR, mise en place d’alertes Push et classification des signaux.'
    },
    {
      cls: 'high',
      text: 'Conception stratégique complète : modélisation de dispositifs proactifs, quantification du ROI d’inaction et pilotage d’intelligence technologique.'
    }
  ]
};
