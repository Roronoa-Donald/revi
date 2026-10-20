/**
 * Contenu du cours « PHP POO » B2.
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier php/.
 *
 * Le découpage suit le cours historique de PHP objet (classes, encapsulation,
 * héritage, traits et namespaces, erreurs, PDO et architecture) : six chapitres
 * qui s'exercent tous en PHP 8 exécuté réellement dans la page, en CLI.
 */
'use strict';

const chapitres = [
  ...require('./php/chapitres-1-3'),
  ...require('./php/chapitres-4-6')
];

const pages = require('./php/pages');

const course = {
  id: 'php',
  slug: 'php',
  brand: 'PHP POO B2',
  brandIcon: 'code',

  // Violet de marque, assombri pour garder 4,5:1 sur blanc (texte AA) et un bon
  // contraste du texte blanc sur le bouton principal.
  accent: '#6d28d9',
  accentDeep: '#5b21b6',
  accentSoft: '#f2ecff',
  accentBorder: '#d9ccff',

  storeKey: 'b2php:progress',

  title: 'PHP POO B2 — objets, architecture et base de données',
  description:
    'Cours complet de programmation orientée objet en PHP 8 niveau B2 : classes et objets, encapsulation, ' +
    'héritage, classes abstraites et interfaces, traits et namespaces, gestion des erreurs par exceptions, ' +
    'puis accès aux données avec PDO et architecture en couches. Chaque notion est mise en œuvre dans un ' +
    'programme PHP exécuté réellement dans la page.',
  lead:
    'Passer du PHP procédural au PHP objet, c’est apprendre à modéliser. Six chapitres pour créer des ' +
    'classes, protéger l’état avec l’encapsulation, factoriser par héritage et interfaces, organiser le code ' +
    'avec traits et namespaces, traiter les erreurs par exceptions, puis dialoguer avec une base via PDO — ' +
    'chaque mécanisme étant d’abord écrit et vérifié dans l’atelier, comme dans une vraie application.',

  sources: 'le cours historique de PHP objet (classes, héritage, namespaces, PDO, projet ToDo List)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
