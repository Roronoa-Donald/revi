/**
 * Chapitre 3 du cours « Droit Informatique » B2 — défis et enjeux du numérique.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Défis et enjeux du droit du numérique',
  short: 'Défis et enjeux',
  toc: 'Cambridge Analytica, haine et désinformation, identification en ligne, addictions, liberté d’expression.',
  time: '≈ 2 h de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Réseaux sociaux, plateformes, algorithmes : le droit doit arbitrer des conflits inédits — réguler ' +
    'la haine sans étouffer la parole, protéger la vie privée sans bloquer l’innovation.',

  objectives: [
    'analyser l’affaire Cambridge Analytica et ses enjeux juridiques ;',
    'situer les défis de régulation des contenus numériques ;',
    'comprendre le problème de l’identification en ligne ;',
    'reconnaître les addictions numériques et leurs conséquences.'
  ],

  sections: [
    {
      title: 'L’affaire Cambridge Analytica',
      html: [
        '<p>Le scandale Cambridge Analytica a révélé l’exploitation massive de données personnelles ' +
        'd’utilisateurs d’un réseau social à des fins de profilage psychologique et d’influence ' +
        'électorale. Trois griefs juridiques se dégagent :</p>',
        '<ul>',
        '  <li>l’<strong>utilisation non autorisée</strong> des données personnelles ;</li>',
        '  <li>la <strong>manipulation électorale</strong> par profilage ;</li>',
        '  <li>le <strong>non-respect de la transparence et du consentement</strong>.</li>',
        '</ul>',
        box('intuition', 'Ce que révèle l’affaire', 'lightbulb',
          '    <p>Une donnée cédée pour un usage devient vite un instrument de pouvoir. Le droit du ' +
          'numérique ne protège pas seulement la vie privée : il protège la vie démocratique.</p>')
      ].join('\n')
    },
    {
      title: 'Réguler les contenus numériques',
      html: [
        '<p>États, entreprises, internautes et tribunaux sont confrontés à des défis juridiques ' +
        'nouveaux :</p>',
        '<ul>',
        '  <li>comment réglementer le <strong>partage de discours de haine</strong> ?</li>',
        '  <li>comment régir la <strong>diffusion de fausses informations</strong> en ligne ?</li>',
        '  <li>comment traiter les <strong>déclarations diffamatoires</strong> venues de comptes ' +
        'anonymes ?</li>',
        '</ul>',
        '<p>Le blocage et le filtrage des contenus, hors des situations réglementaires, sont considérés ' +
        'comme une forme de restriction à la liberté d’expression. Il faut donc lutter contre les ' +
        'contenus de haine sans imposer aux acteurs privés une responsabilité excessive, et protéger le ' +
        'public contre les usages invasifs des données, l’usurpation d’identité et le harcèlement.</p>',
        box('pitfall', 'L’arme à double tranchant', 'warning',
          '    <p>Une législation sur la cybercriminalité trop large peut servir à étouffer la critique. ' +
          'La bonne régulation vise les activités véritablement criminelles, pas l’expression légitime.</p>')
      ].join('\n')
    },
    {
      title: 'Identification et libertés',
      html: [
        '<p>Internet pose des problèmes juridiques particuliers, notamment l’<strong>établissement de la ' +
        'véritable identité</strong> d’un internaute. Faut-il exiger le vrai nom ? Protéger les ' +
        'communications anonymes ? Permettre de rendre compte des comportements illégaux en ligne ?</p>',
        '<p>La liberté d’expression en ligne est puissante du fait de sa nature sans frontières, mais ' +
        'elle crée de nouvelles conséquences juridiques. Il est indispensable, pour tous les acteurs, de ' +
        'relever ces défis et de protéger les droits numériques dans un monde plus que connecté.</p>'
      ].join('\n')
    },
    {
      title: 'Dépendance et addictions',
      html: [
        '<p>Le numérique produit aussi des dépendances :</p>',
        '<ul>',
        '  <li><strong>nomophobie</strong> : peur de se retrouver sans son téléphone ;</li>',
        '  <li><strong>selfitisme</strong> : culte de l’autoportrait, besoin de partager son image ;</li>',
        '  <li><strong>FOMO</strong> (peur de rater une information) ;</li>',
        '  <li><strong>syndrome des vibrations fantômes</strong> : croire que le téléphone vibre.</li>',
        '</ul>',
        '<p>Ces dépendances peuvent conduire à une incapacité à agir en cas de défaillance partielle ' +
        'ou totale des systèmes. La croissance fulgurante de la désinformation est, elle aussi, un défi ' +
        'pour les États, qui tentent d’encadrer les « fausses nouvelles ».</p>',
        box('tech', 'Une évaluation théorique', 'book',
          '    <p>À l’examen, ces enjeux sont souvent demandés sous forme d’analyse de cas : il faut ' +
          'nommer le défi, le droit concerné et la tension en cause.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Cambridge Analytica a détourné…', opts: ['Des données personnelles', 'Des brevets', 'Des logiciels libres'], correct: 0, exp: 'Utilisation non autorisée de données.' },
    { stem: 'Le profilage électoral pose…', opts: ['Un enjeu de manipulation', 'Un problème de stockage', 'Un bug réseau'], correct: 0, exp: 'Manipulation électorale par profilage.' },
    { stem: 'Un contenu à réguler ?', opts: ['Le discours de haine', 'Le code source libre', 'La poésie'], correct: 0, exp: 'Haine, désinformation, diffamation.' },
    { stem: 'Le blocage non réglementaire de contenus peut…', opts: ['Restreindre la liberté d’expression', 'Améliorer la sécurité', 'Réduire la facture'], correct: 0, exp: 'C’est une restriction potentielle.' },
    { stem: 'La nomophobie est…', opts: ['La peur d’être sans téléphone', 'Une marque de téléphone', 'Un type de virus'], correct: 0, exp: 'Une addiction numérique.' },
    { stem: 'Le FOMO désigne…', opts: ['La peur de rater une information', 'Un protocole réseau', 'Un format d’image'], correct: 0, exp: 'Fear of missing out.' },
    { stem: 'Le selfitisme est…', opts: ['Le culte de l’autoportrait', 'Un modèle de caméra', 'Un droit d’auteur'], correct: 0, exp: 'Addiction liée à l’image de soi.' },
    { stem: 'Internet pose un problème de…', opts: ['Véritable identité des utilisateurs', 'Prix du papier', 'Imprimerie'], correct: 0, exp: 'L’identité en ligne est un défi juridique.' }
  ],

  pitfalls: [
    'Confondre régulation légitime et censure.',
    'Croire que la haine en ligne échappe au droit au motif de l’anonymat.',
    'Refuser toute identification sans voir le besoin de rendre compte des abus.',
    'Banaliser les addictions numériques.',
    'Oublier que la désinformation est un enjeu d’État.'
  ],

  methodTitle: 'Analyser un défi du numérique',
  method: [
    '<strong>Décrire</strong> le fait (données détournées, contenu haineux, addiction).',
    '<strong>Nommer</strong> le droit ou l’intérêt menacé.',
    '<strong>Repérer</strong> la tension (liberté contre sécurité).',
    '<strong>Identifier</strong> l’acteur concerné (État, plateforme, personne).',
    '<strong>Conclure</strong> sur la réponse juridique possible.'
  ],

  summary: [
    'Cambridge Analytica : données détournées, manipulation et défaut de consentement.',
    'Réguler haine et désinformation sans censurer la parole légitime.',
    'L’identification en ligne est un défi entre responsabilité et anonymat.',
    'Addictions : nomophobie, selfitisme, FOMO, vibrations fantômes.',
    'La désinformation est un enjeu majeur pour les États.'
  ],

  checklist: [
    'Je résume l’affaire Cambridge Analytica et ses enjeux.',
    'Je cite les contenus à réguler.',
    'J’explique le problème de l’identification.',
    'Je reconnais les addictions numériques.'
  ],

  notions: ['Cambridge Analytica', 'données détournées', 'profilage', 'manipulation électorale', 'discours de haine', 'désinformation', 'diffamation', 'liberté d’expression', 'anonymat', 'identification', 'nomophobie', 'selfitisme', 'FOMO', 'vibrations fantômes'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends l’affaire Cambridge Analytica.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les contenus à réguler.' },
    { cls: 'good', text: '70–89 % — Solide : tu analyses les tensions.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux sources du droit, chapitre 4.' }
  ],

  flashcards: [
    { q: 'Trois enjeux de Cambridge Analytica ?', a: 'Données détournées, manipulation électorale, transparence/consentement.' },
    { q: 'Trois contenus à réguler ?', a: 'Discours de haine, désinformation, diffamation.' },
    { q: 'Pourquoi le blocage est-il délicat ?', a: 'Hors cadre réglementaire, il restreint la liberté d’expression.' },
    { q: 'Quelle difficulté pose l’anonymat ?', a: 'Établir la véritable identité d’un internaute.' },
    { q: 'Quatre addictions numériques ?', a: 'Nomophobie, selfitisme, FOMO, vibrations fantômes.' },
    { q: 'Pourquoi la désinformation est-elle un enjeu d’État ?', a: 'Elle menace le débat public, d’où des tentatives de régulation.' }
  ]
};
