/**
 * Chapitre 2 du cours « Droit Informatique » B2 — données personnelles et sensibles.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Données personnelles et données sensibles',
  short: 'Données personnelles',
  toc: 'Donnée personnelle directe ou indirecte, données sensibles, traitement des données et opérations.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Chaque clic, chaque formulaire, chaque achat produit de la donnée. Décider si une information est ' +
    'une donnée personnelle — et si elle est sensible — commande toutes les obligations de l’entreprise.',

  objectives: [
    'distinguer donnée personnelle directe, indirecte et non personnelle ;',
    'identifier les données sensibles ;',
    'définir un traitement de données personnelles ;',
    'citer les opérations qui constituent un traitement.'
  ],

  sections: [
    {
      title: 'Qu’est-ce qu’une donnée personnelle',
      html: [
        '<p>Une <strong>donnée personnelle</strong> est toute information relative à une personne physique ' +
        '<strong>identifiée ou identifiable</strong>. L’identification peut être :</p>',
        '<ul>',
        '  <li><strong>directe</strong> : nom, prénom, empreinte digitale, biométrie ;</li>',
        '  <li><strong>indirecte</strong> : numéro de téléphone, plaque d’immatriculation, adresse ' +
        'postale, courriel ;</li>',
        '  <li>à partir d’<strong>une seule donnée</strong> : ADN, numéro de matricule ;</li>',
        '  <li>par <strong>croisement</strong> de plusieurs données : un homme vivant à telle adresse, ' +
        'né tel jour et membre de telle organisation.</li>',
        '</ul>',
        box('pitfall', 'Les coordonnées d’entreprise', 'warning',
          '    <p>Les coordonnées d’une entreprise (adresse, téléphone, courriel générique de service) ' +
          'ne sont pas, en principe, des données personnelles. Dès qu’elles rattachent une personne ' +
          'physique, elles le redeviennent.</p>')
      ].join('\n')
    },
    {
      title: 'Les données sensibles',
      html: [
        '<p>Les <strong>données sensibles</strong> sont des données à caractère personnel relatives à :</p>',
        '<ul>',
        '  <li>l’origine raciale ou ethnique ;</li>',
        '  <li>les opinions ou activités religieuses, philosophiques, politiques, syndicales ;</li>',
        '  <li>la vie sexuelle, la santé ;</li>',
        '  <li>les mesures d’ordre social ;</li>',
        '  <li>les poursuites, sanctions pénales ou administratives.</li>',
        '</ul>',
        '<p>Leur traitement est soumis à des formalités renforcées : consentement exprès et encadrement ' +
        'strict. Leur violation est plus sévèrement punie (voir le chapitre 6).</p>'
      ].join('\n')
    },
    {
      title: 'Le traitement des données personnelles',
      html: [
        '<p>Un <strong>traitement</strong> est une opération ou une suite d’opérations portant sur des ' +
        'données personnelles. Une entreprise réalise un traitement dès qu’elle effectue des opérations ' +
        'de :</p>',
        '<ul>',
        '  <li><strong>collecte</strong> et <strong>enregistrement</strong> ;</li>',
        '  <li><strong>organisation</strong> et <strong>conservation</strong> ;</li>',
        '  <li><strong>adaptation</strong> et <strong>modification</strong> ;</li>',
        '  <li><strong>utilisation</strong> et <strong>cession</strong> de données.</li>',
        '</ul>',
        box('intuition', 'Le traitement, c’est le cycle de vie de la donnée', 'lightbulb',
          '    <p>Collecter, ranger, garder, transformer, utiliser, transmettre : toute étape du ' +
          'parcours d’une donnée est un traitement. Dès la première opération, le RGPD s’applique.</p>')
      ].join('\n')
    },
    {
      title: 'Pourquoi protéger les données',
      html: [
        '<p>Les données personnelles sont au cœur de l’économie numérique. Elles sont partout, mais à ' +
        'l’origine elles appartiennent à chaque citoyen : une personne qui livre ses données doit ' +
        'pouvoir contrôler leur sort.</p>',
        '<p>La protection est d’autant plus nécessaire que le volume de données — et le nombre de ' +
        'cyberattaques — croît. L’indice mondial de protection des données de Dell EMC relevait une ' +
        'croissance exponentielle des volumes, de l’ordre de +569 %, et +701 % pour la seule France.</p>',
        box('method', 'Le réflexe à acquérir', 'compass',
          '    <p>Avant tout traitement : identifier la donnée (personnelle ? sensible ?), nommer ' +
          'l’opération, vérifier la base légale, et garantir les droits des personnes.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Une donnée personnelle est…', opts: ['Une information sur une personne identifiée ou identifiable', 'Un fichier de musique', 'Un brevet'], correct: 0, exp: 'Directement ou indirectement identifiante.' },
    { stem: 'Un exemple de donnée personnelle directe ?', opts: ['Le nom et le prénom', 'La plaque d’immatriculation', 'Le courriel'], correct: 0, exp: 'Directe : nom, empreinte, biométrie.' },
    { stem: 'Un exemple de donnée indirecte ?', opts: ['Le numéro de téléphone', 'L’empreinte digitale', 'Le nom'], correct: 0, exp: 'Indirecte : téléphone, plaque, adresse.' },
    { stem: 'Une donnée sensible ?', opts: ['L’origine ethnique', 'La taille d’écran', 'Le prénom'], correct: 0, exp: 'Origine, opinions, santé, vie sexuelle, sanctions.' },
    { stem: 'Les coordonnées d’entreprise sont…', opts: ['En principe non personnelles', 'Toujours sensibles', 'Toujours des données de santé'], correct: 0, exp: 'Elles ne visent pas une personne physique en principe.' },
    { stem: 'Un traitement de données, c’est…', opts: ['Une opération ou suite d’opérations sur des données', 'Un logiciel antivirus', 'Un contrat de travail'], correct: 0, exp: 'Collecte, enregistrement, conservation, etc.' },
    { stem: 'La conservation est-elle un traitement ?', opts: ['Oui', 'Non', 'Seulement le week-end'], correct: 0, exp: 'Conserver est une opération de traitement.' },
    { stem: 'La cession de données est…', opts: ['Un traitement', 'Une publicité', 'Un hébergement'], correct: 0, exp: 'Transmettre des données est un traitement.' }
  ],

  pitfalls: [
    'Traiter la donnée personnelle et la donnée sensible comme équivalentes.',
    'Oublier qu’une donnée indirecte peut identifier une personne.',
    'Croire qu’un traitement suppose une action spectaculaire : même la conservation en est un.',
    'Négliger le consentement exprès pour les données sensibles.',
    'Penser qu’un courriel générique d’entreprise est une donnée personnelle.'
  ],

  methodTitle: 'Qualifier une donnée et son traitement',
  method: [
    '<strong>Identifier</strong> la personne visée par l’information.',
    '<strong>Tester</strong> l’identification : directe, indirecte, par croisement ?',
    '<strong>Repérer</strong> un caractère sensible (origine, opinions, santé, sanctions).',
    '<strong>Nommer</strong> l’opération : collecte, conservation, cession…',
    '<strong>En déduire</strong> les obligations : base légale et droits des personnes.'
  ],

  summary: [
    'Donnée personnelle : information sur une personne identifiée ou identifiable.',
    'Identification directe, indirecte, par une seule donnée ou par croisement.',
    'Données sensibles : origine, opinions, santé, vie sexuelle, mesures et sanctions.',
    'Traitement : toute opération sur des données personnelles.',
    'Le RGPD s’applique dès la première opération de traitement.'
  ],

  checklist: [
    'Je classe une donnée en personnelle directe, indirecte ou non.',
    'Je reconnais une donnée sensible.',
    'Je définis un traitement.',
    'Je cite les opérations constitutives d’un traitement.'
  ],

  notions: ['donnée personnelle', 'identifiée', 'identifiable', 'directe', 'indirecte', 'croisement', 'donnée sensible', 'origine', 'opinions', 'santé', 'vie sexuelle', 'traitement', 'collecte', 'enregistrement', 'conservation', 'cession'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez la définition de la donnée personnelle.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les données sensibles.' },
    { cls: 'good', text: '70–94 % — Solide : vous qualifiez données et traitements.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux défis du numérique, chapitre 3.' }
  ],

  flashcards: [
    { q: 'Qu’est-ce qu’une donnée personnelle ?', a: 'Toute information sur une personne physique identifiée ou identifiable.' },
    { q: 'Directe ou indirecte ?', a: 'Directe : nom, empreinte ; indirecte : téléphone, plaque, adresse.' },
    { q: 'Qu’est-ce qu’une donnée sensible ?', a: 'Origine raciale/ethnique, opinions, santé/vie sexuelle, mesures et sanctions.' },
    { q: 'Qu’est-ce qu’un traitement ?', a: 'Toute opération ou suite d’opérations portant sur des données personnelles.' },
    { q: 'Citez cinq opérations de traitement.', a: 'Collecte, enregistrement, organisation, conservation, cession.' },
    { q: 'Les coordonnées d’entreprise ?', a: 'En principe non personnelles.' }
  ]
};
