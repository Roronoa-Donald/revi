/**
 * Chapitre 5 du cours « Droit Informatique » B2 — le RGPD.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Le RGPD : principes, droits et sanctions',
  short: 'Le RGPD',
  toc: 'But du RGPD, cinq principes, droits des personnes, accountability et sanctions européennes.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une boutique en ligne collecte des adresses, un site installe des cookies, un service RH conserve des ' +
    'dossiers : toutes ces entreprises doivent démontrer qu’elles respectent le règlement sur les données.',

  objectives: [
    'énoncer le but du RGPD et ses dates d’entrée en vigueur ;',
    'citer les principes : consentement, transparence, minimisation, responsabilité, droits des personnes ;',
    'expliquer l’intérêt de la conformité pour l’entreprise (accountability) ;',
    'calculer la sanction européenne : 20 millions d’euros ou 4 % du chiffre d’affaires.'
  ],

  sections: [
    {
      title: 'But et entrée en vigueur',
      html: [
        '<p>Le <strong>RGPD</strong> est le Règlement Général de Protection des Données. Il est entré en ' +
        'vigueur en <strong>mai 2018</strong> dans l’Union européenne et en <strong>octobre 2019</strong> au ' +
        'Togo. Son but : « redonner aux citoyens le contrôle de leurs données personnelles, tout en ' +
        'simplifiant l’environnement réglementaire des entreprises ».</p>',
        '<p>Il repose sur cinq idées : consentement, transparence, minimisation, responsabilité et droit ' +
        'des personnes.</p>',
        box('pitfall', 'Un sigle trompeur', 'warning',
          '    <p>RGPD ne veut pas dire « Régime Général de Protection des Données » : c’est un ' +
          '<strong>règlement</strong>. Et les dates diffèrent : mai 2018 en Europe, octobre 2019 au Togo.</p>')
      ].join('\n')
    },
    {
      title: 'Les principes',
      html: [
        '<ul>',
        '  <li><strong>Le consentement</strong> : l’internaute consent explicitement à la collecte de ses ' +
        'données. Il doit pouvoir refuser, accepter ou choisir les cookies.</li>',
        '  <li><strong>La transparence</strong> : l’objectif de la collecte est clairement défini ; ' +
        'l’entreprise dit ce qu’elle fera des données et en donne l’accès à l’utilisateur.</li>',
        '  <li><strong>La minimisation</strong> : ne collecter que les données nécessaires.</li>',
        '  <li><strong>La responsabilité</strong> : l’entreprise démontre sa conformité, protège les données ' +
        'de ses clients, tient un registre des traitements et avertit en cas de faille de sécurité.</li>',
        '  <li><strong>Le droit des personnes</strong> : droit d’accès, de rectification et de suppression ' +
        'de ses données.</li>',
        '</ul>',
        box('method', 'Les mesures de sécurité citées', 'compass',
          '    <p>Copies de sauvegarde, antivirus, changement fréquent des mots de passe, protection ' +
          'anti-incendie : elles visent à protéger les données, sans suffire à elles seules. Un antivirus ' +
          'ne sécurise pas une plateforme à lui seul.</p>')
      ].join('\n')
    },
    {
      title: 'L’intérêt pour les entreprises',
      html: [
        '<p>L’entreprise doit <strong>démontrer</strong> qu’elle respecte les dispositions du règlement. ' +
        'Elle s’inscrit ainsi dans une logique d’<strong>accountability</strong> : une plus grande ' +
        'responsabilisation.</p>',
        '<p>Cette démarche est un vecteur de <strong>confiance</strong>, au cœur de l’économie numérique : ' +
        'les droits des personnes dont les données sont traitées en sortent renforcés. Mettre en place le ' +
        'RGPD accroît le capital confiance vis-à-vis des partenaires, mais ne protège pas pour toujours ' +
        'des cyberattaques.</p>'
      ].join('\n')
    },
    {
      title: 'Les sanctions en Europe',
      html: [
        '<p>En Europe, une entreprise non conforme risque :</p>',
        '<ul>',
        '  <li>une amende pouvant atteindre <strong>20 millions d’euros</strong> ;</li>',
        '  <li>ou <strong>4 %</strong> du chiffre d’affaires global de la société.</li>',
        '</ul>',
        '<p>La <strong>plus lourde</strong> des deux sanctions est retenue.</p>',
        box('intuition', 'Un exemple chiffré', 'lightbulb',
          '    <p>Pour un chiffre d’affaires de 600 millions d’euros, 4 % valent 24 millions : c’est ' +
          'plus que 20 millions, la sanction retenue est donc de 24 millions. À 100 millions, 4 % ne ' +
          'valent que 4 millions : le plafond de 20 millions s’applique.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Le RGPD signifie…', opts: ['Règlement Général de Protection des Données', 'Régime Général de Protection des Données', 'Registre Général des Personnes'], correct: 0, exp: 'C’est un règlement, pas un régime.' },
    { stem: 'Le RGPD est entré en vigueur dans l’Union européenne en…', opts: ['Mai 2018', 'Mai 2019', 'Octobre 2019'], correct: 0, exp: 'Mai 2018 en Europe, octobre 2019 au Togo.' },
    { stem: 'Le principe de minimisation impose…', opts: ['De ne collecter que les données nécessaires', 'De conserver indéfiniment les données', 'De supprimer tout fichier client'], correct: 0, exp: 'Collecter peu, mais utile.' },
    { stem: 'Le consentement doit être…', opts: ['Explicite', 'Implicite et automatique', 'Facultatif'], correct: 0, exp: 'L’internaute accepte, refuse ou choisit ses cookies.' },
    { stem: 'Un droit des personnes concernées ?', opts: ['Le droit d’accès', 'Le droit de cuissage', 'Le droit de passage'], correct: 0, exp: 'Accès, rectification, suppression.' },
    { stem: 'L’accountability, c’est…', opts: ['Une plus grande responsabilisation de l’entreprise', 'Un impôt sur les données', 'Un antivirus'], correct: 0, exp: 'L’entreprise démontre sa conformité.' },
    { stem: 'Plafond de l’amende européenne :', opts: ['20 M€ ou 4 % du chiffre d’affaires, le plus lourd', '1 M€ fixe', '4 % du bénéfice net'], correct: 0, exp: 'On retient la plus lourde des deux sanctions.' },
    { stem: 'Un antivirus suffit à sécuriser une plateforme.', opts: ['Faux', 'Vrai'], correct: 0, exp: 'La sécurité repose sur un ensemble de mesures, pas sur un seul outil.' }
  ],

  pitfalls: [
    'Traduire RGPD par « Régime » au lieu de « Règlement ».',
    'Confondre mai 2018 (Union européenne) et octobre 2019 (Togo).',
    'Penser qu’un antivirus suffit à être conforme.',
    'Croire que la conformité protège pour toujours des cyberattaques.',
    'Retenir le plus petit des deux plafonds de sanction.'
  ],

  methodTitle: 'Évaluer la conformité d’un traitement',
  method: [
    '<strong>Vérifier</strong> le consentement explicite des personnes.',
    '<strong>Vérifier</strong> que la finalité est définie et communiquée.',
    '<strong>Contrôler</strong> la minimisation : seules les données nécessaires.',
    '<strong>Garantir</strong> les droits d’accès, de rectification et de suppression.',
    '<strong>Conclure</strong> : conforme seulement si tous les principes sont respectés.'
  ],

  summary: [
    'RGPD : mai 2018 dans l’Union européenne, octobre 2019 au Togo.',
    'Cinq principes : consentement, transparence, minimisation, responsabilité, droit des personnes.',
    'Accountability : l’entreprise doit démontrer sa conformité.',
    'Droits des personnes : accès, rectification, suppression.',
    'Sanction européenne : 20 M€ ou 4 % du chiffre d’affaires, la plus lourde.'
  ],

  checklist: [
    'Je cite les cinq principes du RGPD.',
    'Je donne les dates d’entrée en vigueur.',
    'J’explique l’accountability.',
    'Je calcule la sanction la plus lourde.'
  ],

  notions: ['RGPD', 'consentement', 'transparence', 'minimisation', 'responsabilité', 'accountability', 'droit d’accès', 'droit de rectification', 'droit de suppression', 'sanction'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez les cinq principes.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le calcul de la sanction.' },
    { cls: 'good', text: '70–94 % — Solide : vous évaluez une conformité.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe au cadre togolais, chapitre 6.' }
  ],

  flashcards: [
    { q: 'But du RGPD ?', a: 'Redonner aux citoyens le contrôle de leurs données, en simplifiant l’environnement réglementaire des entreprises.' },
    { q: 'Cinq principes du RGPD ?', a: 'Consentement, transparence, minimisation, responsabilité, droit des personnes.' },
    { q: 'Dates d’entrée en vigueur ?', a: 'Mai 2018 dans l’Union européenne, octobre 2019 au Togo.' },
    { q: 'Qu’est-ce que l’accountability ?', a: 'Une plus grande responsabilisation : l’entreprise démontre qu’elle respecte le règlement.' },
    { q: 'Trois droits des personnes ?', a: 'Droit d’accès, de rectification et de suppression.' },
    { q: 'Sanction en Europe ?', a: '20 millions d’euros ou 4 % du chiffre d’affaires global : la plus lourde.' }
  ]
};
