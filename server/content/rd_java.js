/**
 * Contenu du cours « Java » B2 (dossier `rd_java/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier rd_java/.
 *
 * Le découpage condense les 12 modules historiques en six chapitres : bases du
 * langage, conditions et boucles, tableaux/méthodes, classes et encapsulation,
 * collections/héritage, puis exceptions. Chaque chapitre s'exerce en Java
 * (`public class Main`), exécuté en CLI par le service d'exécution.
 */
'use strict';

const chapitres = [
  ...require('./rd_java/chapitres-1-3'),
  ...require('./rd_java/chapitres-4-6')
];

const pages = require('./rd_java/pages');

const course = {
  id: 'rd_java',
  slug: 'rd_java',
  brand: 'Java B2',
  brandIcon: 'code',

  // Rouge de marque, assombri pour garder 4,5:1 sur blanc (texte AA) et un bon
  // contraste du texte blanc sur le bouton principal.
  accent: '#dc2626',
  accentDeep: '#b91c1c',
  accentSoft: '#fef2f2',
  accentBorder: '#fecaca',

  storeKey: 'b2java:progress',

  title: 'Java B2 — du langage aux objets, collections et exceptions',
  description:
    'Cours complet de Java niveau B2 : syntaxe et types, opérateurs, conditions et boucles, tableaux et ' +
    'méthodes, classes et encapsulation, collections, héritage et polymorphisme, enfin exceptions et ' +
    'robustesse. Chaque notion est mise en œuvre dans un programme Java compilé et exécuté réellement.',
  lead:
    'Java est le langage des applications qui doivent durer. Six chapitres pour partir de la syntaxe et des ' +
    'types, maîtriser conditions et boucles, ranger les données dans des tableaux et des collections, ' +
    'modéliser avec des classes et l’encapsulation, factoriser par héritage et polymorphisme, puis rendre un ' +
    'programme robuste grâce aux exceptions — chaque mécanisme étant écrit et exécuté dans l’atelier.',

  sources: 'le cours historique de Java (modules 1 à 12 : syntaxe, contrôle du flux, tableaux, objets, collections, exceptions)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
