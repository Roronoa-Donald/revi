/**
 * Chapitre 4 du cours « Droit Informatique » B2 — sources du droit du numérique.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Sources du droit du numérique',
  short: 'Sources du droit',
  toc: 'Sources normatives, nationales et supranationales : loi de 1978, article 9, CEDH, traités OMPI.',
  time: '≈ 2 h de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une victime de diffamation sur un réseau social, un auteur copié en ligne, un citoyen fiché sans le ' +
    'savoir : chacun doit savoir quel texte invoquer. Connaître les sources, c’est savoir où chercher la règle.',

  objectives: [
    'situer les sources normatives et citer la loi du 6 janvier 1978 ;',
    'reconnaître les sources nationales (article 9 du Code civil, loi sur la liberté de la presse) ;',
    'identifier les sources supranationales (CEDH, traités OMPI de 1996) ;',
    'ordonner dans le temps les grands textes du droit du numérique.'
  ],

  sections: [
    {
      title: 'Les sources normatives',
      html: [
        '<p>La législation relative à l’informatique remonte à <strong>1978</strong>. La France adopte alors ' +
        'la <strong>loi n° 78-17</strong> du 6 janvier 1978, dite « Informatique et Libertés », relative à ' +
        'l’informatique, aux fichiers et aux libertés. Son but : protéger les personnes physiques du ' +
        'traitement informatique des données qui les concernent.</p>',
        '<p>Le texte de référence pour la vie privée est antérieur : l’<strong>article 9 du Code civil</strong> ' +
        'protège le respect de la vie privée. Il sert encore de fondement quand une atteinte passe par un ' +
        'outil numérique.</p>',
        box('intuition', 'Un texte de 1978 pour un monde connecté', 'lightbulb',
          '    <p>Le droit du numérique ne commence pas avec Internet. Dès les années 1970, le législateur ' +
          'encadre les fichiers informatiques : les règles actuelles prolongent ce socle.</p>')
      ].join('\n')
    },
    {
      title: 'Les sources nationales',
      html: [
        '<p>Les sources nationales sont les textes internes d’un pays que l’on invoque devant ses ' +
        'juridictions. Deux exemples du cours :</p>',
        '<ul>',
        '  <li>une victime de <strong>diffamation ou d’injure</strong> par un message diffusé sur un réseau ' +
        'social invoquera l’<strong>article 29 de la loi sur la liberté de la presse</strong> ;</li>',
        '  <li>en cas de <strong>diffusion non autorisée</strong> d’une image de la vie privée d’un individu ' +
        'sur Internet, celui-ci pourra <strong>demander réparation</strong> sur le fondement du droit au ' +
        'respect de la vie privée.</li>',
        '</ul>',
        '<p>Une règle pensée pour la presse s’applique donc au numérique : le support change, la règle ' +
        'demeure.</p>'
      ].join('\n')
    },
    {
      title: 'Les sources supranationales',
      html: [
        '<p>Certaines règles viennent d’au-dessus de l’État. Les <strong>sources supranationales</strong> ' +
        'du droit du numérique comprennent :</p>',
        '<ul>',
        '  <li>la <strong>Convention européenne de sauvegarde des droits de l’homme</strong> et des libertés ' +
        'fondamentales, en particulier l’<strong>article 8</strong> (vie privée) et l’<strong>article 10</strong> ' +
        '(liberté d’expression) ;</li>',
        '  <li>les <strong>traités Internet de l’OMPI</strong> (Organisation mondiale de la propriété ' +
        'intellectuelle), adoptés en <strong>1996</strong> : le traité sur le droit d’auteur et le traité sur ' +
        'les interprétations et les phonogrammes.</li>',
        '</ul>',
        box('pitfall', 'Ne pas mélanger les familles', 'warning',
          '    <p>La loi de 1978 et l’article 9 du Code civil sont des sources internes. La CEDH et les ' +
          'traités OMPI sont des instruments internationaux : on ne les range pas dans la même famille.</p>')
      ].join('\n')
    },
    {
      title: 'Repères chronologiques',
      html: [
        '<p>Pour ne pas confondre les textes, retenez cette frise :</p>',
        '<ul>',
        '  <li><strong>1950</strong> : Convention européenne des droits de l’homme ;</li>',
        '  <li><strong>1978</strong> : loi Informatique et Libertés ;</li>',
        '  <li><strong>1996</strong> : traités OMPI ;</li>',
        '  <li><strong>2018</strong> : entrée en vigueur du RGPD dans l’Union européenne (mai) ;</li>',
        '  <li><strong>2019</strong> : RGPD au Togo (octobre) et loi n° 2019-014 relative à la protection des ' +
        'données à caractère personnel.</li>',
        '</ul>',
        box('tech', 'Pas de Code du numérique', 'book',
          '    <p>Il n’existe pas de « Code du numérique » qui rassemblerait toutes les règles : elles sont ' +
          'dispersées entre lois, conventions et traités. D’où l’intérêt de classer chaque source.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'La loi n° 78-17 du 6 janvier 1978 est…', opts: ['La loi Informatique et Libertés', 'Le RGPD', 'Un traité OMPI'], correct: 0, exp: 'Elle protège les personnes face au traitement informatique de leurs données.' },
    { stem: 'Quel article du Code civil protège la vie privée ?', opts: ['L’article 9', 'L’article 29', 'L’article 55'], correct: 0, exp: 'L’article 9 du Code civil : respect de la vie privée.' },
    { stem: 'Une victime de diffamation sur un réseau social invoque…', opts: ['L’article 29 de la loi sur la liberté de la presse', 'Le traité OMPI de 1996', 'L’article 86 de la loi togolaise'], correct: 0, exp: 'Diffamation et injure relèvent de la loi sur la presse.' },
    { stem: 'Les articles 8 et 10 de la CEDH protègent…', opts: ['La vie privée et la liberté d’expression', 'Le droit d’auteur', 'Les contrats informatiques'], correct: 0, exp: 'Article 8 : vie privée ; article 10 : liberté d’expression.' },
    { stem: 'Les traités Internet de l’OMPI datent de…', opts: ['1996', '1950', '2019'], correct: 0, exp: 'Droit d’auteur et interprétations/phonogrammes, adoptés en 1996.' },
    { stem: 'La CEDH est une source…', opts: ['Supranationale', 'Nationale', 'Purement contractuelle'], correct: 0, exp: 'Instrument international, au-dessus du droit interne.' },
    { stem: 'L’article 29 de la loi sur la presse est une source…', opts: ['Nationale', 'Supranationale', 'Normative internationale'], correct: 0, exp: 'Texte interne invoqué devant les juridictions nationales.' },
    { stem: 'Les règles du droit informatique sont réunies dans…', opts: ['Aucun code unique', 'Le Code du numérique', 'Le Code de commerce'], correct: 0, exp: 'Elles sont dispersées entre plusieurs textes : il n’existe pas de code unique.' }
  ],

  pitfalls: [
    'Ranger la CEDH ou les traités OMPI parmi les sources nationales.',
    'Croire qu’un « Code du numérique » rassemble toutes les règles.',
    'Confondre la loi de 1978 (France) et la loi togolaise de 2019.',
    'Oublier que l’article 29 de la loi sur la presse s’applique aussi aux messages en ligne.',
    'Dater le RGPD togolais de 2018 : il date d’octobre 2019.'
  ],

  methodTitle: 'Trouver la source applicable à une situation',
  method: [
    '<strong>Qualifier</strong> la situation (vie privée, expression, création, données).',
    '<strong>Chercher</strong> d’abord la source nationale qui s’y applique.',
    '<strong>Vérifier</strong> si un instrument supranational complète ou renforce la règle.',
    '<strong>Dater</strong> le texte pour savoir s’il est en vigueur.',
    '<strong>Citer</strong> l’article précis plutôt que le texte entier.'
  ],

  summary: [
    'Le droit du numérique remonte à la loi Informatique et Libertés de 1978.',
    'Sources nationales : article 9 du Code civil, article 29 de la loi sur la presse.',
    'Sources supranationales : CEDH (articles 8 et 10), traités OMPI de 1996.',
    'Frise : 1950, 1978, 1996, 2018 (RGPD UE), 2019 (RGPD Togo, loi 2019-014).',
    'Aucun code unique ne regroupe les règles du numérique.'
  ],

  checklist: [
    'Je cite la loi de 1978 et l’article 9 du Code civil.',
    'Je distingue sources nationales et supranationales.',
    'Je situe la CEDH et les traités OMPI.',
    'Je replace les textes sur la frise 1950 à 2019.'
  ],

  notions: ['loi Informatique et Libertés', 'article 9 du Code civil', 'article 29', 'CEDH', 'article 8', 'article 10', 'OMPI', 'source nationale', 'source supranationale'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends les trois familles de sources.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur la frise chronologique.' },
    { cls: 'good', text: '70–89 % — Solide : tu classes chaque source sans hésiter.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe au RGPD, chapitre 5.' }
  ],

  flashcards: [
    { q: 'Que protège la loi du 6 janvier 1978 ?', a: 'Les personnes physiques face au traitement informatique de leurs données (Informatique et Libertés).' },
    { q: 'Quel article du Code civil protège la vie privée ?', a: 'L’article 9.' },
    { q: 'Quel texte invoquer pour une diffamation sur un réseau social ?', a: 'L’article 29 de la loi sur la liberté de la presse.' },
    { q: 'Que protègent les articles 8 et 10 de la CEDH ?', a: 'La vie privée (article 8) et la liberté d’expression (article 10).' },
    { q: 'Quels sont les traités Internet de l’OMPI ?', a: 'Le traité sur le droit d’auteur et celui sur les interprétations et phonogrammes, adoptés en 1996.' },
    { q: 'Source nationale ou supranationale : la CEDH ?', a: 'Supranationale.' }
  ]
};
