/**
 * Contenu du cours « Probabilités » B2.
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier probabilites/.
 *
 * Le découpage suit le cours historique de probabilités : fondements du calcul
 * (axiomes, conditionnelle, indépendance), dénombrement, variables aléatoires
 * discrètes, lois discrètes usuelles, variables aléatoires continues, puis
 * convergence et théorèmes limites. Chaque chapitre s'exerce de manière méthodiqueexécuté
 * réellement dans la page, comme calculatrice vérifiable.
 */
'use strict';

const chapitres = [
  ...require('./probabilites/chapitres-1-3'),
  ...require('./probabilites/chapitres-4-6')
];

const pages = require('./probabilites/pages');

const course = {
  id: 'probabilites',
  slug: 'probabilites',
  brand: 'Probabilités B2',
  brandIcon: 'dice',

  // Bleu-cyan de marque, assombri pour garder 4,5:1 sur blanc (texte AA) et un
  // bon contraste du texte blanc sur le bouton principal.
  accent: '#0e7490',
  accentDeep: '#155e75',
  accentSoft: '#e0f2fe',
  accentBorder: '#bae6fd',

  storeKey: 'b2probabilites:progress',

  title: 'Probabilités B2 — variables aléatoires, lois et théorèmes limites',
  description:
    'Cours complet de probabilités niveau B2 : axiomes et probabilité conditionnelle, dénombrement, ' +
    'variables aléatoires discrètes et continues, lois usuelles (Bernoulli, binomiale, Poisson, uniforme, ' +
    'exponentielle, normale), espérance, variance, puis convergence et théorème central limite. Chaque notion ' +
    'est mise en œuvre dans un programme Python exécuté réellement dans la page.',
  lead:
    'Les probabilités transforment l’incertitude en calcul. Six chapitres pour poser un univers et une loi, ' +
    'compter par dénombrement, décrire une variable aléatoire par son espérance et sa variance, reconnaître ' +
    'les lois usuelles, passer du discret au continu, puis comprendre pourquoi la moyenne d’un grand ' +
    'échantillon se met à ressembler à une loi normale — chaque formule étant d’abord calculée et vérifiée ' +
    'dans l’atelier.',

  sources: 'le cours historique de probabilités (fondements, dénombrement, variables aléatoires discrètes et continues)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
