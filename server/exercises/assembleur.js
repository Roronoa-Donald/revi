/**
 * Catalogue complet des exercices d'Assembleur B2.
 * 6 chapitres × 3 exercices = 18 exercices pratiques (Python).
 */
'use strict';

const ch1 = require('./assembleur/chapitre1');
const ch2 = require('./assembleur/chapitre2');
const ch3 = require('./assembleur/chapitre3');
const ch4 = require('./assembleur/chapitre4');
const ch5 = require('./assembleur/chapitre5');
const ch6 = require('./assembleur/chapitre6');

module.exports = [
  ...ch1,
  ...ch2,
  ...ch3,
  ...ch4,
  ...ch5,
  ...ch6
];
