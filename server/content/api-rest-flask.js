/**
 * Contenu du cours « API REST avec Flask » B2 (dossier `api-rest-flask/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier api-rest-flask/.
 */
'use strict';

const chapitres = [
  ...require('./api-rest-flask/chapitres-1-3'),
  ...require('./api-rest-flask/chapitres-4-6')
];

const pages = require('./api-rest-flask/pages');

const course = {
  id: 'api-rest-flask',
  slug: 'api-rest-flask',
  brand: 'API REST avec Flask B2',
  brandIcon: 'code',

  // Vert émeraude officiel conforme WCAG AA (5.48:1 sur blanc)
  accent: '#047857',
  accentDeep: '#065f46',
  accentSoft: '#ecfdf5',
  accentBorder: '#a7f3d0',

  storeKey: 'b2flask:progress',

  title: 'API REST avec Flask B2 — Architecture REST, Routage, Statuts HTTP, Validation et CRUD',
  description:
    'Cours complet d’API REST avec Python & Flask niveau B2 : principes REST de Roy Fielding, ' +
    'conception d’URI canoniques, micro-framework Flask, convertisseurs de route, codes d’état HTTP, ' +
    'formatage JSON avec jsonify, validation défensive, gestion d’erreurs avec @app.errorhandler, ' +
    'et persistance CRUD modulaire avec Blueprints. Chaque notion est mise en œuvre dans un exercice interactif en Python.',
  lead:
    'Les API REST constituent la colonne vertébrale des communications applicatives modernes. Six chapitres ' +
    'pour maîtriser le protocole HTTP, concevoir des ressources RESTful élégantes, exploiter la puissance ' +
    'de Flask et bâtir des API backend robustes, sécurisées et prêtes pour la production.',

  sources: 'le cours officiel API REST B2, la spécification RFC 9110 (HTTP Semantics), la documentation officielle Flask (palletsprojects.com) et le recueil de questions interactives',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
