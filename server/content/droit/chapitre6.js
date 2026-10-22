/**
 * Chapitre 6 du cours « Droit Informatique » B2 — cadre institutionnel togolais.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Cadre institutionnel et sanctions au Togo',
  short: 'Cadre institutionnel',
  toc: 'IPDCP (articles 55 et 68), dispositions pénales (articles 79, 86, 87, 93) et thèmes de TPE.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une entreprise de Lomé constitue un fichier sans déclaration préalable, puis refuse de communiquer ses ' +
    'documents au contrôleur. Quelle autorité intervient, et quelles peines encourt-elle ?',

  objectives: [
    'décrire la création et la mission de l’IPDCP (articles 55 et 68) ;',
    'calculer les peines des articles 79, 86, 87 et 93 de la loi togolaise ;',
    'distinguer infraction intentionnelle et infraction par négligence ;',
    'choisir et cadrer un thème de TPE parmi les huit proposés.'
  ],

  sections: [
    {
      title: 'L’autorité de contrôle : l’IPDCP',
      html: [
        '<p>L’<strong>article 55</strong> crée une autorité nationale chargée de la protection des données à ' +
        'caractère personnel : l’<strong>Instance de Protection des Données à Caractère Personnel</strong>, ' +
        'en abrégé <strong>IPDCP</strong>. C’est une autorité administrative indépendante. Elle veille à ce ' +
        'que les traitements respectent la loi et à ce que les technologies de l’information ne menacent ni ' +
        'les libertés publiques ni la vie privée.</p>',
        '<p>L’<strong>article 68</strong> précise sa mission de contrôle : les membres du comité de ' +
        'direction ont des pouvoirs de contrôle. Ils peuvent demander communication de tous les documents ' +
        'nécessaires, accéder aux programmes informatiques et aux données, et demander la transcription de ' +
        'tout traitement dans des documents directement utilisables pour le contrôle.</p>',
        box('intuition', 'Un contrôleur qui voit tout', 'lightbulb',
          '    <p>L’Instance n’est pas un simple conseil : elle peut exiger les documents et entrer dans ' +
          'les programmes. C’est ce pouvoir que protège l’article 93.</p>')
      ].join('\n')
    },
    {
      title: 'Les dispositions pénales (articles 79 et 86)',
      html: [
        '<p><strong>Article 79.</strong> Quiconque procède ou fait procéder à des traitements sans avoir ' +
        'respecté les formalités préalables est puni d’un à cinq ans d’emprisonnement et d’une amende de ' +
        '1 000 000 à 10 000 000 de francs CFA, ou de l’une de ces deux peines.</p>',
        '<p>Si l’auteur agit par <strong>négligence</strong>, défaut d’adresse ou de précaution, la peine est ' +
        'd’un à trois ans d’emprisonnement et de 500 000 à 5 000 000 de francs CFA, ou de l’une de ces deux ' +
        'peines.</p>',
        '<p><strong>Article 86.</strong> Mettre ou conserver sur support informatique, sans consentement ' +
        'exprès, des données qui font apparaître l’origine raciale ou ethnique, les opinions politiques, ' +
        'philosophiques ou religieuses, les appartenances syndicales, ou qui sont relatives à la santé ou à ' +
        'la vie sexuelle, est puni d’un à cinq ans d’emprisonnement et de 1 000 000 à 10 000 000 de francs ' +
        'CFA.</p>',
        box('pitfall', 'Intention ou négligence', 'warning',
          '    <p>Le même fait est puni moins sévèrement s’il résulte d’une négligence : un à trois ans ' +
          'et 500 000 à 5 000 000 de francs CFA, contre un à cinq ans et 1 000 000 à 10 000 000.</p>')
      ].join('\n')
    },
    {
      title: 'Les dispositions pénales (articles 87 et 93)',
      html: [
        '<p><strong>Article 87.</strong> Mettre ou conserver des données relatives à des infractions, ' +
        'condamnations ou mesures de sûreté, hors des cas prévus par la loi, est puni d’un à cinq ans ' +
        'd’emprisonnement et de 1 000 000 à 10 000 000 de francs CFA, ou de l’une de ces deux peines.</p>',
        '<p><strong>Article 93.</strong> Quiconque <strong>entrave l’action de l’Instance</strong> chargée du ' +
        'contrôle est puni de six mois à deux ans d’emprisonnement et de 1 000 000 à 10 000 000 de francs ' +
        'CFA, ou de l’une de ces deux peines.</p>',
        '<table>',
        '  <thead><tr><th>Article</th><th>Objet</th><th>Emprisonnement</th></tr></thead>',
        '  <tbody>',
        '    <tr><td>79</td><td>Traitement sans formalités</td><td>1 à 5 ans (1 à 3 ans par négligence)</td></tr>',
        '    <tr><td>86</td><td>Données sensibles sans consentement</td><td>1 à 5 ans</td></tr>',
        '    <tr><td>87</td><td>Condamnations, mesures de sûreté</td><td>1 à 5 ans</td></tr>',
        '    <tr><td>93</td><td>Entrave au contrôle</td><td>6 mois à 2 ans</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Préparer le TPE',
      html: [
        '<p>Le TPE est un exposé de groupe de dix diapositives au maximum. Huit thèmes sont proposés :</p>',
        '<ol>',
        '  <li>l’affaire Cambridge Analytica : enjeux juridiques et éthiques ;</li>',
        '  <li>la responsabilité des hébergeurs et des fournisseurs d’accès ;</li>',
        '  <li>les contrats informatiques et les licences logicielles ;</li>',
        '  <li>le droit à l’oubli numérique et ses limites ;</li>',
        '  <li>les enjeux juridiques et éthiques de l’IA ;</li>',
        '  <li>la protection des créations numériques ;</li>',
        '  <li>la régulation des contenus en ligne ;</li>',
        '  <li>la preuve électronique en droit.</li>',
        '</ol>',
        box('method', 'Comment cadrer un exposé', 'compass',
          '    <p>Un problème juridique, la règle applicable (article et source), un cas concret, puis une ' +
          'conclusion. Appuyez chaque affirmation sur un texte étudié dans ce cours.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'L’IPDCP est…', opts: ['Une autorité administrative indépendante', 'Un tribunal pénal', 'Une entreprise privée'], correct: 0, exp: 'Créée par l’article 55 pour protéger les données personnelles.' },
    { stem: 'Quel article crée l’IPDCP ?', opts: ['L’article 55', 'L’article 68', 'L’article 93'], correct: 0, exp: 'Article 55 : création de l’Instance.' },
    { stem: 'L’article 68 traite…', opts: ['Des pouvoirs de contrôle de l’Instance', 'Des sanctions du RGPD européen', 'Du droit d’auteur'], correct: 0, exp: 'Accès aux documents, programmes et données.' },
    { stem: 'Peine de l’article 79 pour une infraction intentionnelle :', opts: ['1 à 5 ans et 1 à 10 millions de F CFA', '6 mois à 2 ans', '1 à 3 ans et 500 000 à 5 millions'], correct: 0, exp: 'La négligence abaisse la peine à 1 à 3 ans et 500 000 à 5 millions.' },
    { stem: 'Peine de l’article 79 pour négligence :', opts: ['1 à 3 ans et 500 000 à 5 millions de F CFA', '1 à 5 ans et 1 à 10 millions', '6 mois à 2 ans'], correct: 0, exp: 'Défaut d’adresse ou de précaution : peine réduite.' },
    { stem: 'L’article 86 réprime…', opts: ['Les données sensibles conservées sans consentement', 'L’entrave au contrôle', 'Les contrats de licence'], correct: 0, exp: 'Origine, opinions, santé, vie sexuelle sans consentement exprès.' },
    { stem: 'L’article 93 réprime…', opts: ['L’entrave à l’action de l’Instance', 'Les données de santé', 'La diffamation'], correct: 0, exp: 'Six mois à deux ans et 1 à 10 millions de F CFA.' },
    { stem: 'Combien de diapositives au maximum pour le TPE ?', opts: ['Dix', 'Vingt', 'Cinq'], correct: 0, exp: 'Dix diapositives au maximum.' }
  ],

  pitfalls: [
    'Confondre la peine de l’article 79 intentionnel et celle par négligence.',
    'Appliquer la fourchette de l’article 93 (6 mois à 2 ans) aux articles 86 et 87.',
    'Oublier que l’IPDCP est une autorité indépendante et non une juridiction.',
    'Mélanger l’amende européenne en euros et l’amende togolaise en francs CFA.',
    'Citer un TPE sans appui sur un texte du cours.'
  ],

  methodTitle: 'Qualifier une infraction à la loi togolaise',
  method: [
    '<strong>Identifier</strong> le fait : traitement, données sensibles, condamnations ou entrave.',
    '<strong>Rattacher</strong> le fait à l’article (79, 86, 87 ou 93).',
    '<strong>Distinguer</strong> l’intention de la négligence pour l’article 79.',
    '<strong>Lire</strong> la fourchette d’emprisonnement et d’amende.',
    '<strong>Rédiger</strong> la conclusion en citant l’article.'
  ],

  summary: [
    'L’IPDCP est créée par l’article 55 ; l’article 68 fixe ses pouvoirs de contrôle.',
    'Article 79 : 1 à 5 ans et 1 à 10 millions de F CFA ; par négligence : 1 à 3 ans et 500 000 à 5 millions.',
    'Articles 86 et 87 : 1 à 5 ans et 1 à 10 millions de F CFA.',
    'Article 93, entrave au contrôle : 6 mois à 2 ans et 1 à 10 millions de F CFA.',
    'Le TPE : dix diapositives au maximum, huit thèmes au choix.'
  ],

  checklist: [
    'Je décris la mission de l’IPDCP.',
    'Je cite les peines des articles 79, 86, 87 et 93.',
    'Je distingue intention et négligence.',
    'Je choisis un thème de TPE et je le cadre.'
  ],

  notions: ['IPDCP', 'article 55', 'article 68', 'article 79', 'article 86', 'article 87', 'article 93', 'négligence', 'franc CFA', 'TPE'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez les articles un par un.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les fourchettes de peines.' },
    { cls: 'good', text: '70–94 % — Solide : vous qualifiez chaque infraction.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux examens blancs.' }
  ],

  flashcards: [
    { q: 'Que crée l’article 55 ?', a: 'L’Instance de Protection des Données à Caractère Personnel (IPDCP).' },
    { q: 'Que prévoit l’article 68 ?', a: 'Les pouvoirs de contrôle : communication des documents, accès aux programmes et aux données.' },
    { q: 'Peine de l’article 79 ?', a: '1 à 5 ans et 1 à 10 millions de F CFA ; par négligence : 1 à 3 ans et 500 000 à 5 millions.' },
    { q: 'Que réprime l’article 86 ?', a: 'Les données sensibles mises ou conservées sans consentement exprès.' },
    { q: 'Que réprime l’article 87 ?', a: 'Les données sur infractions, condamnations ou mesures de sûreté, hors cas prévus par la loi.' },
    { q: 'Peine de l’article 93 ?', a: 'Entrave à l’Instance : 6 mois à 2 ans et 1 à 10 millions de F CFA.' }
  ]
};
