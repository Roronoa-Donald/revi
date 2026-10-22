/**
 * Contenu du cours « Club de Robotique » (B1).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-robotique/.
 *
 * Le découpage suit le support du club (seance_tp_club_robotique_v2.pdf) : les
 * trois terrains de jeu du TP — programmation (C/C++/MicroPython), circuits
 * logiques (CircuitVerse) et prototypage Arduino (Tinkercad) — réorganisés en
 * six chapitres qui se simulent tous de manière méthodique, langage de MicroPython.
 */
'use strict';

const chapitres = [
  ...require('./b1-robotique/chapitres-1-3'),
  ...require('./b1-robotique/chapitres-4-6')
];

const pages = require('./b1-robotique/pages');

const course = {
  id: 'b1-robotique',
  slug: 'rb',
  brand: 'Robotique B1',
  brandIcon: 'blocks',

  // Orange assombri : 5,2:1 sur blanc, donc conforme en texte comme en fond du
  // bouton principal (texte blanc sur accent).
  accent: '#c2410c',
  accentDeep: '#9a3412',
  accentSoft: '#fff1e7',
  accentBorder: '#f6d4bb',

  storeKey: 'b1rb:progress',

  title: 'Club de Robotique — programmer, simuler, contrôler',
  description:
    'Cours complet du club de robotique niveau B1 : structure d’un programme, boucles et temporisations, ' +
    'conditions et fonctions, tableaux et algorithmes de tri et de recherche, portes logiques et ' +
    'chiffrement, capteurs, seuils et régulation. Chaque mécanisme du robot est simulé de manière méthodiqueet ' +
    'réellement exécuté dans la page.',
  lead:
    'Une carte Arduino, un capteur de distance, une LED : le robot n’est qu’un programme qui lit des ' +
    'entrées, prend des décisions et agit dans une boucle sans fin. Six chapitres pour écrire ces ' +
    'programmes — d’abord simulés de manière méthodiquedans la page, puis rejouables tels quels sur la vraie carte, ' +
    'car la logique ne change pas quand on change de machine.',

  sources: 'le support du club « Séance TP — Club Robotique & Électronique » (programmation, CircuitVerse, Tinkercad) et le cours de logique fourni',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
