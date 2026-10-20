/**
 * Contenu du cours « React » B2 (dossier `react/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier react/.
 */
'use strict';

const chapitres = [
  ...require('./react/chapitres-1-3'),
  ...require('./react/chapitres-4-6')
];

const pages = require('./react/pages');

const course = {
  id: 'react',
  slug: 'react',
  brand: 'React B2',
  brandIcon: 'code',

  // Bleu cyan officiel React conforme AA (≥ 4.5:1 sur blanc)
  accent: '#087ea4',
  accentDeep: '#0c4a6e',
  accentSoft: '#e0f2fe',
  accentBorder: '#bae6fd',

  storeKey: 'b2react:progress',

  title: 'React B2 — composants, JSX, hooks, state, effets et React Router',
  description:
    'Cours complet de React niveau B2 : pensée en composants, outillage Vite, syntaxe JSX, ' +
    'transmission de props, gestion d’état avec useState, formulaires contrôlés, listes et clés dynamiques, ' +
    'effets de bord avec useEffect et navigation Single Page Application avec React Router v6. ' +
    'Chaque notion est mise en œuvre dans un exercice interactif en JavaScript.',
  lead:
    'React est la bibliothèque incontournable du développement frontend moderne. Six chapitres ' +
    'pour maîtriser le paradigme déclaratif, composer des interfaces réutilisables, manipuler ' +
    'l’état et les effets, et architecturer des applications complètes et performantes.',

  sources: 'le cours officiel React B2, le recueil de questions interactives (scripts/questions-react.js) et la documentation de référence react.dev',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
