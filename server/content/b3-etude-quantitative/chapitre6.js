/**
 * Chapitre 6 du cours « Étude Quantitative & Qualitative B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Analyse Qualitative de Contenu, Synthèse &amp; Rédaction du Mémoire Professionnel',
  short: 'Analyse de Contenu &amp; Mémoire',
  toc: 'Analyse de contenu de Laurence Bardin, grilles de codage thématique, analyse de co-occurrences de Jaccard, structure académique du mémoire CDP Sup et articulation Résultats / Discussion.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Après avoir mené ses entretiens semi-directifs et administré son questionnaire d’enquête, l’étudiant de Bachelor 3 fait face à l’étape ultime de son cursus : transformer ce matériau empirique foisonnant en une démonstration académique et professionnelle irréprochable. L’analyse qualitative ne consiste pas à saupoudrer son mémoire de quelques citations choisies au hasard : elle exige une méthode scientifique de codage thématique (école de Laurence Bardin), le repérage des fréquences et des co-occurrences de sens, et une restitution articulée selon les standards du guide de rédaction de mémoire officiel CDP Sup. Savoir séparer l’exposé objectif des résultats de leur interprétation critique dans la discussion, formuler des recommandations managériales réalistes et expliciter les limites méthodologiques est ce qui distingue un mémoire d’excellence d’un simple rapport de stage descriptif.',
  objectives: [
    'appliquer la méthodologie d’analyse de contenu thématique selon Laurence Bardin (pré-analyse, exploitation du matériau, traitement des résultats) ;',
    'construire une grille de codage thématique (unités d’enregistrement, catégories inductives vs déductives, règles de codage univoques) ;',
    'mesurer les co-occurrences de concepts et calculer l’indice de similarité thématique de Jaccard au sein d’un corpus de verbatim ;',
    'structurer un mémoire professionnel de fin d’études selon les 6 piliers canoniques du guide officiel CDP Sup (40 à 100 pages) ;',
    'distinguer avec rigueur scientifique la présentation des résultats factuels, la discussion critique confrontée à la littérature et les préconisations managériales ;',
    'développer en Python 3 des analyseurs de fréquences de codes, des matrices de co-occurrence de Jaccard et des auditeurs de conformité académique de mémoire.'
  ],
  sections: [
    {
      title: 'L’Analyse de Contenu Thématique (Laurence Bardin)',
      html: [
        '<p>L’<strong>analyse de contenu</strong> (formalisée par Laurence Bardin en 1977) est l’ensemble des techniques de description objective, systématique et quantitative ou qualitative du contenu manifeste ou latent des communications :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. La Pré-Analyse</h4>',
        '    <p>Phase d’organisation : lecture flottante initiale du corpus d’entretiens, constitution du corpus définitif (exhaustivité, représentativité, homogénéité), formulation des orientations et découpage en unités d’analyse.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. L’Exploitation du Matériau</h4>',
        '    <p>Opérations de <strong>codage</strong> : découpage du texte en <em>unités d’enregistrement</em> (phrases, paragraphes, idées clés) et attribution d’un code thématique selon la grille d’analyse établie.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Traitement &amp; Inférence</h4>',
        '    <p>Calcul des fréquences d’apparition, hiérarchisation des thèmes dominants, mise en relation des catégories et interprétation du sens profond à la lumière de la théorie.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Construction de la Grille de Codage &amp; Démarche Inductive / Déductive',
      html: [
        '<p>L’élaboration des catégories thématiques peut suivre deux voies complémentaires :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Grille Fermée / Déductive (A priori)</h4>',
        '    <p>Les catégories sont définies avant l’analyse, directement issues des modèles théoriques de la revue de littérature (ex. les 5 dimensions du modèle de maturité CMMI ou les piliers DORA). L’analyste classe chaque segment de texte dans l’une des cases préétablies.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Grille Ouverte / Inductive (In vivo / Émergente)</h4>',
        '    <p>Les catégories émergent directement des mots prononcés par les acteurs du terrain (approche de la Grounded Theory / Théorie Ancrée). Indispensable lorsque l’objet de recherche est novateur ou peu documenté dans la littérature académique.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Co-Occurrences Thématiques &amp; Indice de Proximité de Jaccard',
      html: [
        '<p>Au-delà du simple comptage des occurrences d’un thème, l’analyse qualitative cherche à révéler les associations mentales et causales exprimées par les interviewés :</p>',
        '<p>Lorsque deux thèmes $A$ et $B$ apparaissent fréquemment au sein du même segment d’entretien (ex. <em>« Pression temporelle »</em> et <em>« Contournement de la sécurité »</em>), on mesure leur intensité de couplage via l’<strong>indice de Jaccard</strong> :</p>',
        '<p>$$J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|} = \\frac{N_{AB}}{N_A + N_B - N_{AB}}$$</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Interprétation de l’Indice J</h4>',
        '    <ul>',
        '      <li><strong>$J \\ge 0.60$ : Forte synergie.</strong> Les deux concepts sont indissociables dans l’expérience vécue des acteurs (relation perçue comme directe).</li>',
        '      <li><strong>$0.30 \\le J < 0.60$ : Connexion modérée.</strong> Lien notable intervenant dans des contextes spécifiques.</li>',
        '      <li><strong>$J < 0.30$ : Indépendance.</strong> Les deux thèmes coexistent sans association causale privilégiée.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cartographie Conceptuelle</h4>',
        '    <p>Le calcul des coefficients de Jaccard entre tous les couples de codes permet de bâtir une matrice de proximité et de tracer des cartes sémantiques montrant les nœuds de tension névralgiques du système étudié.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'L’Armature Canonique du Mémoire Professionnel CDP Sup',
      html: [
        '<p>Le guide de rédaction officiel du mémoire professionnel (Bachelor 3 / CDP Sup) impose une structure académique rigoureuse articulée autour de 6 piliers obligatoires :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Problématique &amp; Contexte (10-15%)</h4>',
        '    <p>Contexte organisationnel de l’entreprise d’accueil, identification du problème technique ou stratégique concret, justification de l’intérêt pour l’ingénierie et formulation de la question centrale de recherche.</p>',
        '    <h4>2. Revue de Littérature / État de l’Art (20-25%)</h4>',
        '    <p>Exploration des concepts théoriques, normes industrielles (ISO 27001, ITIL, RFC) et recherches académiques existantes. Synthèse des modèles permettant de cadrer l’étude.</p>',
        '    <h4>3. Cadre Méthodologique (15-20%)</h4>',
        '    <p>Justification du paradigme, description de la population et de l’échantillon, présentation des instruments de collecte (guide d’entretien, questionnaire) et protocoles de validation.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>4. Résultats Empiriques (20-25%)</h4>',
        '    <p>Exposé strictement objectif des données recueillies : tableaux statistiques, résultats des tests Chi-deux/Pearson, fréquences de codage et verbatim représentatifs.</p>',
        '    <h4>5. Discussion &amp; Limites (10-15%)</h4>',
        '    <p>Le cœur réflexif du mémoire : confrontation des résultats de terrain aux théories de la revue de littérature. Explication des écarts et présentation honnête des limites méthodologiques.</p>',
        '    <h4>6. Préconisations Managériales &amp; Techniques (10-15%)</h4>',
        '    <p>Recommandations d’action concrètes, plan de déploiement opérationnel, budget prévisionnel et indicateurs de suivi (KPIs), découlant directement des résultats.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie de Rédaction &amp; de Soutenance du Mémoire de Fin d’Études',
  method: [
    '1. Établir le corpus d’analyse qualitatif : Retranscrire intégralement les entretiens et anonymiser rigoureusement les noms d’entreprises et d’individus.',
    '2. Procéder au double codage thématique : Coder indépendamment le texte à l’aide de la grille thématique et mesurer l’accord inter-codeurs pour éliminer les ambiguïtés.',
    '3. Articuler rigoureusement Résultats et Discussion : Ne jamais mélanger le constat des faits bruts (section Résultats) avec leur interprétation théorique (section Discussion).',
    '4. Ancrer les recommandations dans la preuve : Vérifier que chaque préconisation managériale s’appuie explicitement sur un résultat empirique démontré dans le corps du travail.',
    '5. Expliciter avec humilité les limites scientifiques : Détailler la taille de l’échantillon, les biais potentiels et les conditions de transférabilité des conclusions.',
    '6. Soigner la forme et la volumétrie : Respecter le calibrage officiel (40 à 100 pages), appliquer les normes bibliographiques (APA/IEEE) et bannir toute faute typographique.'
  ],
  summary: [
    'L’analyse de contenu thématique (Bardin) transforme un corpus textuel qualitatif en données scientifiques structurées, objectives et vérifiables.',
    'Le codage peut être déductif (catégories issues de la théorie) ou inductif (émergence des concepts à partir du discours brut des acteurs).',
    'L’indice de Jaccard quantifie la force de liaison et de co-occurrence entre deux thèmes au sein des mêmes segments d’entretiens.',
    'Le mémoire professionnel de Bachelor 3 repose sur 6 sections canoniques : Problématique, Revue de littérature, Méthodologie, Résultats, Discussion, Recommandations.',
    'La section Discussion confronte les données du terrain aux modèles théoriques de l’état de l’art pour expliquer les convergences et anomalies.',
    'Toutes les préconisations managériales et techniques doivent impérativement découler des preuves empiriques établies dans la recherche.'
  ],
  checklist: [
    'La retranscription des entretiens est-elle intégrale et anonymisée conformément au RGPD ?',
    'La grille de codage thématique est-elle clairement explicitée avec ses unités d’enregistrement et d’analyse ?',
    'Les 6 piliers académiques canoniques du guide CDP Sup sont-ils tous formellement présents dans la structure du mémoire ?',
    'La pagination totale se situe-t-elle strictement entre 40 et 100 pages hors annexes ?',
    'La section Discussion confronte-t-elle directement les résultats empiriques aux auteurs cités dans la revue de littérature ?',
    'Toutes les recommandations opérationnelles sont-elles fondées sur les preuves apportées par l’enquête ?'
  ],
  notions: [
    'Analyse de contenu thématique de Laurence Bardin',
    'Unités d’enregistrement et grilles de codage',
    'Codage déductif versus codage inductif',
    'Co-occurrences de verbatims et cartographie sémantique',
    'Indice de similarité thématique de Jaccard',
    'Structure en 6 piliers du mémoire CDP Sup',
    'Dialectique Résultats versus Discussion',
    'Formulation des limites méthodologiques'
  ],
  pitfalls: [
    'Se contenter de citer quelques phrases d’entretiens « au feeling » sans aucune grille de codage systématique ni comptage de fréquences.',
    'Mélanger dans le même chapitre les chiffres bruts des résultats et son interprétation personnelle subjective.',
    'Proposer des recommandations managériales déconnectées des données sous prétexte d’intuition professionnelle.',
    'Omettre totalement la section des limites méthodologiques, donnant une fausse impression d’infaillibilité scientifique.'
  ],
  questions: [
    {
      stem: 'Selon la méthodologie d’analyse de contenu de Laurence Bardin, quelles sont les trois phases canoniques successives du traitement qualitatif ?',
      opts: [
        'L’achat du logiciel, l’impression papier, le recyclage',
        'La pré-analyse, l’exploitation du matériau (codage) et le traitement des résultats (inférence et interprétation)',
        'L’envoi de courriels, la suppression des fichiers, la réunion d’équipe',
        'La traduction, la mise en page, la vente du rapport'
      ],
      correct: 1,
      exp: 'Bardin structure l’analyse de contenu en 3 étapes rigoureuses : la pré-analyse (organisation), l’exploitation du matériau (codage) et le traitement des résultats/inférence.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre une grille de codage déductive et une grille de codage inductive ?',
      opts: [
        'La grille déductive est payante et l’inductive gratuite',
        'La grille déductive utilise des catégories prédéfinies issues de la théorie préalable, tandis que la grille inductive fait émerger les catégories directement du texte analysé',
        'La grille inductive ne s’applique qu’aux nombres pairs',
        'Il n’y a aucune différence'
      ],
      correct: 1,
      exp: 'Le codage déductif applique des concepts préexistants (A priori), tandis que le codage inductif découvre les thèmes dans le discours vivant (In vivo).'
    },
    {
      stem: 'Que mesure précisément l’indice de Jaccard J(A, B) = NAB / (NA + NB - NAB) entre deux codes thématiques qualitatifs ?',
      opts: [
        'Le temps moyen de parole du modérateur de focus group',
        'Le degré de proximité et de co-occurrence de deux concepts apparaissant conjointement dans les mêmes segments de discours',
        'Le nombre de pages du mémoire professionnel',
        'La vitesse de connexion internet'
      ],
      correct: 1,
      exp: 'L’indice de Jaccard mesure le rapport entre l’intersection et l’union de deux ensembles, quantifiant la force de co-occurrence de deux thèmes.'
    },
    {
      stem: 'Dans le mémoire professionnel (guide CDP Sup), quel est le rôle épistémologique exclusif de la section « Discussion » ?',
      opts: [
        'Raconter l’ambiance de la pause café en entreprise',
        'Confronter les résultats empiriques observés sur le terrain aux concepts et modèles théoriques de la revue de littérature, tout en explicitant les limites méthodologiques',
        'Donner la liste des mots de passe des serveurs',
        'Copier-coller le code source de l’application'
      ],
      correct: 1,
      exp: 'La Discussion est le lieu de la mise en perspective intellectuelle : elle explique le « pourquoi » des convergences et divergences entre théorie et terrain.'
    },
    {
      stem: 'Quelle est la fourchette de pagination standard recommandée pour un mémoire professionnel de fin d’études de niveau Bachelor 3 ?',
      opts: [
        '5 à 10 pages',
        '40 à 100 pages hors annexes',
        '500 à 1 000 pages',
        'Exactement 1 page'
      ],
      correct: 1,
      exp: 'Le guide académique fixe une volumétrie équilibrée de 40 à 100 pages pour approfondir le sujet sans tomber dans le verbiage dilatoire.'
    },
    {
      stem: 'Pourquoi est-il méthodologiquement indispensable d’inclure une sous-section consacrée aux « Limites de l’Étude » dans un mémoire ?',
      opts: [
        'Pour s’excuser auprès du jury et demander l’indulgence',
        'Pour faire preuve d’honnêteté et de rigueur scientifique en délimitant précisément la portée, le cadre de validité et la transférabilité des conclusions',
        'Parce que le logiciel de traitement de texte l’exige',
        'Pour remplir artificiellement les pages manquantes'
      ],
      correct: 1,
      exp: 'Toute recherche scientifique a des limites (taille d’échantillon, biais géographiques, temporalité). Les nommer atteste de la maturité critique de l’ingénieur.'
    },
    {
      stem: 'Que désigne une « unité d’enregistrement » dans le protocole de codage thématique d’un verbatim ?',
      opts: [
        'Le disque dur de l’ordinateur',
        'Le segment de texte unitaire (mot, proposition, phrase ou paragraphe) auquel est attribué un code thématique déterminé',
        'Le magnétophone utilisé lors de l’entretien',
        'L’heure précise à laquelle l’entretien a commencé'
      ],
      correct: 1,
      exp: 'L’unité d’enregistrement est la portion textuelle de référence que l’analyste découpe pour lui assigner une étiquette thématique de sens.'
    },
    {
      stem: 'Quelle règle déontologique et scientifique lie les « Recommandations » aux « Résultats » d’une recherche appliquée ?',
      opts: [
        'Les recommandations doivent être inventées sans aucun lien avec l’enquête',
        'Chaque recommandation opérationnelle doit découler directement et logiquement des preuves empiriques démontrées dans les résultats',
        'Les recommandations ne doivent concerner que le service des achats',
        'Les recommandations doivent être rédigées par une personne extérieure'
      ],
      correct: 1,
      exp: 'Dans une démarche d’ingénieur, des recommandations non étayées par les résultats empiriques relèvent de l’opinion non fondée et décrédibilisent le mémoire.'
    }
  ],
  flashcards: [
    {
      q: 'Quelles sont les 3 étapes de l’analyse de contenu selon Bardin ?',
      a: '1. Pré-analyse (lecture flottante et cadrage), 2. Exploitation du matériau (codage thématique), 3. Traitement des résultats (inférence et interprétation).'
    },
    {
      q: 'Quelle est la différence entre codage inductif et déductif ?',
      a: 'Le codage déductif applique des catégories théoriques préétablies (Top-Down), le codage inductif fait émerger les thèmes du terrain (Bottom-Up).'
    },
    {
      q: 'Que mesure l’indice de similarité de Jaccard en analyse qualitative ?',
      a: 'La force de co-occurrence de deux concepts au sein des mêmes segments de discours : J = NAB / (NA + NB - NAB).'
    },
    {
      q: 'Quels sont les 6 piliers canoniques du mémoire CDP Sup ?',
      a: '1. Problématique, 2. Revue de littérature, 3. Méthodologie, 4. Résultats empiriques, 5. Discussion et limites, 6. Recommandations managériales.'
    },
    {
      q: 'Quel est le rôle de la section Discussion dans un mémoire ?',
      a: 'Confronter les résultats de terrain aux modèles théoriques de l’état de l’art pour expliquer les concordances, paradoxes et limites de l’étude.'
    },
    {
      q: 'Quelle est la volumétrie cible d’un mémoire de Bachelor 3 ?',
      a: 'Entre 40 et 100 pages hors annexes, garantissant profondeur d’analyse et esprit de synthèse.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez les 3 phases de Bardin, le codage inductif vs déductif et les 6 piliers du mémoire CDP Sup.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez l’indice de Jaccard, la dialectique Résultats/Discussion et la formulation des limites.'
    },
    {
      cls: 'high',
      text: '8/8 : Remarquable ! Vous maîtrisez l’analyse qualitative de contenu et la rédaction scientifique d’un mémoire d’ingénieur d’excellence.'
    }
  ]
};
