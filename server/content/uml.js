/**
 * Contenu du cours « UML B2 » (dossier `uml/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier uml/.
 */
'use strict';

const chapitres = [
  ...require('./uml/chapitres-1-3'),
  ...require('./uml/chapitres-4-6')
];

const pages = require('./uml/pages');

const course = {
  id: 'uml',
  slug: 'uml',
  brand: 'UML B2',
  brandIcon: 'layers',

  // Fuchsia 700 / 800 accessible conforme WCAG AA / AAA (6.8:1 / 8.9:1 sur blanc)
  accent: '#a21caf',
  accentDeep: '#86198f',
  accentSoft: '#fdf4ff',
  accentBorder: '#f0abfc',

  storeKey: 'b2uml:progress',

  title: 'UML B2 — Modélisation Objet, Diagrammes Structurels &amp; Comportementaux',
  description:
    'Cours complet de modélisation orientée objet et de génie logiciel selon la spécification officielle OMG UML 2.5 : ' +
    'métamodèle MOF à 4 couches (M0 à M3), classification formelle des 14 diagrammes, profil d’analyse ECB (Entity, Control, Boundary) et contraintes formelles OCL, ' +
    'diagrammes de cas d’utilisation avec frontières de système, acteurs primaires et secondaires, relations &laquo;include&raquo; et &laquo;extend&raquo; avec points d’extension, ' +
    'diagrammes de classes complets avec visibilités (+, -, #, ~), signatures normalisées, multiplicités, classes d’association et distinction stricte agrégation faible vs composition forte, ' +
    'diagrammes de séquence avec lignes de vie, barres d’activation, typologie des messages synchrones et asynchrones, et fragments combinés (alt, opt, loop, par), ' +
    'diagrammes d’activités avec circulation des jetons, décisions/fusions, barres de synchronisation Fork/Join et couloirs de responsabilités Swimlanes, ' +
    'et modélisation avancée du cycle de vie événementiel par machines à états (Statecharts), diagrammes de composants (Lollipop/Socket) et diagrammes de déploiement physique.',
  lead:
    'Concevez et documentez des architectures logicielles robustes, modulaires et sans ambiguïté selon les standards officiels de l’OMG. ' +
    'Six modules complets combinant théorie formelle, patrons de conception, 18 ateliers de programmation Python et QCM d’évaluation.',

  sources: 'la spécification officielle OMG UML 2.5.1, le standard OCL 2.4, les ouvrages de référence des trois amigos (Booch, Rumbaugh, Jacobson) et les patrons de conception GoF',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
