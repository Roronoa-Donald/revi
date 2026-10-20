/**
 * Pages « cartes de révision » et « mémo » du cours « Droit Informatique » B2.
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav } = require('./helpers');

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Clique une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans ' +
    'les deux sens. Reviens à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo droit' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Droit informatique B2 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo droit</h1>',
    '  <p class="lead">Les règles du cours sur une page, dans l’ordre d’un raisonnement. À garder ouvert ' +
    'pendant les exercices et l’atelier.</p>',

    bloc('Notions et droits numériques', [
      '<pre><code>droit              l’ensemble des regles d’une societe',
      'informatique       traitement automatique de l’information',
      'droit du numerique les regles applicables a la technologie numerique',
      '',
      'fondements : donnees personnelles / propriete intellectuelle',
      '             contrats informatiques / responsabilite civile',
      'droits     : liberte d’expression / vie privee / acces a l’information</code></pre>',
      '<p>Les droits numériques sont les droits fondamentaux de l’homme, adaptés au numérique.</p>'
    ].join('\n')),

    bloc('Données et traitement', [
      '<pre><code>donnee personnelle : personne identifiee ou identifiable',
      '  directement  (nom, empreinte)   indirectement (telephone, plaque, courriel)',
      '  une seule donnee (ADN)          croisement de donnees',
      '',
      'donnee sensible : origine, opinions, sante, vie sexuelle, poursuites...',
      '',
      'traitement : collecte, enregistrement, organisation, conservation,',
      '             adaptation, modification, utilisation, cession</code></pre>',
      '<p>Les coordonnées d’entreprise ne sont pas, en principe, des données personnelles.</p>'
    ].join('\n')),

    bloc('Sources du droit du numérique', [
      '<pre><code>normative       : loi n° 78-17 du 6 janvier 1978 (Informatique et Libertés)',
      'nationale       : article 9 du Code civil, article 29 loi sur la presse',
      'supranationale  : CEDH (articles 8 et 10), traités OMPI de 1996',
      '',
      'frise : 1950 CEDH | 1978 loi | 1996 OMPI | 2018 RGPD UE | 2019 RGPD Togo</code></pre>',
      '<p>Aucun code unique ne regroupe toutes les règles du droit informatique.</p>'
    ].join('\n')),

    bloc('RGPD : principes et sanction', [
      '<pre><code>principes : consentement, transparence, minimisation,',
      '            responsabilite, droit des personnes',
      'droits    : acces, rectification, suppression',
      '',
      'sanction Europe = max(20 000 000 EUR ; 4 % du chiffre d’affaires)',
      '',
      'vigueur : mai 2018 (UE) | octobre 2019 (Togo)</code></pre>',
      '<p>La plus lourde des deux sanctions est retenue. L’entreprise doit démontrer sa conformité (accountability).</p>'
    ].join('\n')),

    bloc('Cadre togolais et peines', [
      '<pre><code>art. 55 : creation de l’IPDCP (autorite administrative independante)',
      'art. 68 : pouvoirs de controle (documents, programmes, donnees)',
      '',
      'art. 79 : traitement sans formalites  1 a 5 ans, 1 a 10 M FCFA',
      '          par negligence              1 a 3 ans, 500 000 a 5 M FCFA',
      'art. 86 : donnees sensibles sans consentement  1 a 5 ans, 1 a 10 M FCFA',
      'art. 87 : condamnations, mesures de surete     1 a 5 ans, 1 a 10 M FCFA',
      'art. 93 : entrave a l’Instance   6 mois a 2 ans, 1 a 10 M FCFA</code></pre>',
      '<p>Chaque peine est « l’une de ces deux peines » : emprisonnement ou amende, ou les deux.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Traduire RGPD par « Régime » : c’est un règlement.</li>',
      '    <li>Confondre mai 2018 (Union européenne) et octobre 2019 (Togo).</li>',
      '    <li>Ranger la CEDH ou les traités OMPI parmi les sources nationales.</li>',
      '    <li>Penser que les coordonnées d’entreprise sont toujours des données personnelles.</li>',
      '    <li>Retenir le plus petit des deux plafonds de sanction européens.</li>',
      '    <li>Appliquer la peine de l’article 93 aux articles 86 et 87.</li>',
      '    <li>Croire qu’un antivirus suffit à sécuriser une plateforme.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo droit — ' + course.brand,
      description: 'Mémo du cours de Droit informatique B2 : notions, données, sources, RGPD, ' +
        'cadre institutionnel et peines togolaises sur une page.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
