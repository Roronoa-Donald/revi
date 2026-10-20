/**
 * Chapitre 1 du cours « Droit Informatique » B2 — notions générales.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Notions générales du droit de l’informatique',
  short: 'Notions générales',
  toc: 'Définitions du droit et de l’informatique, droit du numérique, fondements, objectifs et droits numériques.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Le numérique a envahi la vie privée comme la vie professionnelle. Un juriste doit dire quelles règles ' +
    's’appliquent à un logiciel, à une donnée ou à un message : c’est tout l’objet du droit de l’informatique.',

  objectives: [
    'définir le droit et l’informatique séparément puis ensemble ;',
    'situer le droit du numérique et ses angles d’approche ;',
    'nommer les quatre fondements du droit de l’informatique ;',
    'reconnaître les droits numériques : expression, vie privée, accès à l’information.'
  ],

  sections: [
    {
      title: 'Le droit et l’informatique',
      html: [
        '<p>Le <strong>droit</strong> est l’ensemble des règles qui régissent les rapports des membres ' +
        'd’une même société. Historiquement, il n’avait qu’un seul interlocuteur : l’humain — les ' +
        'machines n’étant que des biens au service des hommes.</p>',
        '<p>L’<strong>informatique</strong> est la science du traitement automatique et rationnel de ' +
        'l’information (les données) au moyen de systèmes électroniques. Elle combine aspects théoriques ' +
        '(algorithmes, modèles) et pratiques (matériels, logiciels) pour automatiser, communiquer, ' +
        'stocker et manipuler l’information.</p>',
        box('intuition', 'Deux disciplines, un même objet', 'lightbulb',
          '    <p>Le droit fixe les règles ; l’informatique automatise le traitement des données. Le ' +
          'droit de l’informatique naît de leur rencontre : il encadre une technique qui, sans lui, ' +
          'ignorerait les droits des personnes.</p>')
      ].join('\n')
    },
    {
      title: 'Le droit de l’informatique ou droit du numérique',
      html: [
        '<p>Le <strong>droit de l’informatique</strong> est l’ensemble des dispositions législatives et ' +
        'réglementaires applicables à l’informatique. C’est un domaine juridique émergent, développé ' +
        'pour répondre aux enjeux des technologies numériques, dans la vie privée comme ' +
        'professionnelle, à l’ère de l’intelligence artificielle.</p>',
        '<p>Les spécialistes l’abordent sous plusieurs angles : droit des données personnelles, droit ' +
        'du commerce électronique, droit d’auteur et de la propriété intellectuelle, droit de la ' +
        'communication numérique, droit de l’Internet.</p>',
        box('tech', 'Une évaluation théorique', 'book',
          '    <p>L’évaluation de ce module est <strong>100 % théorique</strong> : on attend des ' +
          'définitions claires, des distinctions justes et la capacité à relier les notions.</p>')
      ].join('\n')
    },
    {
      title: 'Les fondements du droit de l’informatique',
      html: [
        '<ul>',
        '  <li><strong>Protection des données personnelles</strong> : le droit fondamental à la vie ' +
        'privée, encadré notamment par la loi n° 78-17 du 6 janvier 1978 « Informatique et Libertés ».</li>',
        '  <li><strong>Droit d’auteur et propriété intellectuelle</strong> : droits d’utilisation d’une ' +
        'création intellectuelle — œuvre, marque, logiciel, circuit intégré.</li>',
        '  <li><strong>Contrats informatiques</strong> : cadre des licences de logiciels, services ' +
        'cloud et accords de maintenance.</li>',
        '  <li><strong>Responsabilité civile</strong> : détermination du responsable en cas de dommage ' +
        'causé par un système défaillant ou une faille de sécurité.</li>',
        '</ul>',
        '<p>Ces fondements répondent à trois objectifs : protéger la vie privée des personnes et des ' +
        'entités, protéger la propriété intellectuelle contre la copie illégale, et protéger les ' +
        'données sensibles des individus, des entreprises et des États.</p>'
      ].join('\n')
    },
    {
      title: 'Les droits numériques',
      html: [
        '<p>Les droits du numérique comprennent :</p>',
        '<ul>',
        '  <li>le <strong>droit à la liberté d’expression</strong> ;</li>',
        '  <li>le <strong>droit à la vie privée</strong> ;</li>',
        '  <li>le <strong>droit d’accès à l’information</strong>.</li>',
        '</ul>',
        '<p>Ce sont les mêmes droits fondamentaux de l’homme que ceux dont on jouit hors ligne, mais ' +
        'adaptés à l’ère des technologies de l’information et de la communication. Protéger ces droits ' +
        'est indispensable : très peu de vies sont aujourd’hui à l’abri des TIC et de l’Internet, qui ' +
        'ont restructuré la façon dont les humains communiquent et se comportent.</p>',
        '<p>Le <strong>RGPD</strong> le rappelle dès son article 1 : « la protection des personnes ' +
        'physiques à l’égard du traitement des données à caractère personnel est un droit ' +
        'fondamental ». La Charte des droits fondamentaux de l’Union européenne consacre le même ' +
        'principe (art. 8, § 1).</p>',
        box('pitfall', 'Le piège du « ce n’est que numérique »', 'warning',
          '    <p>Un droit n’est pas diminué parce qu’il s’exerce en ligne. La liberté d’expression, la ' +
          'vie privée et l’accès à l’information valent en ligne comme hors ligne — c’est précisément ' +
          'ce que le droit du numérique protège.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Le droit est…', opts: ['L’ensemble des règles régissant une société', 'Une science du calcul', 'Un logiciel'], correct: 0, exp: 'Définition classique du droit (Larousse).' },
    { stem: 'L’informatique traite…', opts: ['L’information de façon automatique', 'Les conflits sociaux', 'Les traités internationaux'], correct: 0, exp: 'Traitement automatique et rationnel des données.' },
    { stem: 'Le droit de l’informatique est…', opts: ['Un domaine juridique émergent', 'Une technique de codage', 'Un impôt'], correct: 0, exp: 'Il s’est développé avec les technologies numériques.' },
    { stem: 'Un fondement du droit de l’informatique ?', opts: ['La protection des données personnelles', 'La comptabilité analytique', 'La menuiserie'], correct: 0, exp: 'Avec la PI, les contrats et la responsabilité civile.' },
    { stem: 'Le droit d’auteur protège…', opts: ['Une création intellectuelle', 'Un véhicule', 'Un local commercial'], correct: 0, exp: 'Œuvres, logiciels, marques, circuits intégrés.' },
    { stem: 'La responsabilité civile vise…', opts: ['Le responsable d’un dommage causé par un système', 'Le prix du matériel', 'La vitesse du réseau'], correct: 0, exp: 'Qui répond d’un dommage ou d’une faille ?' },
    { stem: 'Un droit numérique du cours ?', opts: ['Le droit à la vie privée', 'Le droit de cuissage', 'Le droit de chasse'], correct: 0, exp: 'Avec l’expression et l’accès à l’information.' },
    { stem: 'Les droits numériques sont…', opts: ['Les mêmes droits fondamentaux adaptés au numérique', 'Des droits nouveaux sans rapport', 'Des privilèges réservés aux internautes'], correct: 0, exp: 'Ils prolongent les droits de l’homme hors ligne.' }
  ],

  pitfalls: [
    'Croire que le numérique crée des droits sans rapport avec les droits de l’homme.',
    'Réduire le droit de l’informatique à la seule protection des données.',
    'Confondre protection des données et propriété intellectuelle.',
    'Oublier la responsabilité civile en cas de faille de sécurité.',
    'Penser que les coordonnées d’entreprise sont toujours des données personnelles.'
  ],

  methodTitle: 'Analyser une situation au regard du droit du numérique',
  method: [
    '<strong>Identifier</strong> la notion en jeu (droit, informatique, donnée, création).',
    '<strong>Rattacher</strong> le cas à un fondement (données, PI, contrats, responsabilité).',
    '<strong>Vérifier</strong> si un droit numérique est concerné.',
    '<strong>Nommer</strong> le texte applicable (loi, RGPD, convention).',
    '<strong>Conclure</strong> : droit protégé ou usage fautif.'
  ],

  summary: [
    'Le droit règlemente les rapports sociaux ; l’informatique automatise le traitement des données.',
    'Le droit de l’informatique encadre les usages, la création et la gestion des technologies.',
    'Quatre fondements : données personnelles, propriété intellectuelle, contrats, responsabilité civile.',
    'Trois droits numériques : expression, vie privée, accès à l’information.',
    'Ces droits prolongent les droits fondamentaux de l’homme en ligne.'
  ],

  checklist: [
    'Je définis le droit et l’informatique.',
    'Je situe le droit de l’informatique et ses angles.',
    'Je cite les quatre fondements.',
    'Je reconnais les trois droits numériques.'
  ],

  notions: ['droit', 'informatique', 'droit du numérique', 'données personnelles', 'propriété intellectuelle', 'contrats informatiques', 'responsabilité civile', 'liberté d’expression', 'vie privée', 'accès à l’information', 'RGPD'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends les définitions du droit et de l’informatique.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les quatre fondements.' },
    { cls: 'good', text: '70–89 % — Solide : tu distingues notions et droits numériques.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux données personnelles, chapitre 2.' }
  ],

  flashcards: [
    { q: 'Que définissent le droit et l’informatique ?', a: 'Le droit : les règles d’une société ; l’informatique : le traitement automatique de l’information.' },
    { q: 'Qu’est-ce que le droit du numérique ?', a: 'L’ensemble des règles juridiques applicables à l’environnement et à la technologie numériques.' },
    { q: 'Quatre fondements ?', a: 'Données personnelles, propriété intellectuelle, contrats informatiques, responsabilité civile.' },
    { q: 'Trois objectifs du droit du numérique ?', a: 'Protéger la vie privée, la propriété intellectuelle, les données sensibles.' },
    { q: 'Trois droits numériques ?', a: 'Liberté d’expression, vie privée, accès à l’information.' },
    { q: 'Que dit l’article 1 du RGPD ?', a: 'La protection des données à caractère personnel est un droit fondamental.' }
  ]
};
