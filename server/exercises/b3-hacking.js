/**
 * server/exercises/b3-hacking.js — Catalogue d'exercices Hacking Éthique & Pentest B3
 * 18 exercices interactifs Python 3 (3 exercices par chapitre, 6 chapitres)
 */

const ch1 = require('./b3-hacking/chapitre1');
const ch2 = require('./b3-hacking/chapitre2');
const ch3 = require('./b3-hacking/chapitre3');
const ch4 = require('./b3-hacking/chapitre4');
const ch5 = require('./b3-hacking/chapitre5');
const ch6 = require('./b3-hacking/chapitre6');

module.exports = [
  ...ch1,
  ...ch2,
  ...ch3,
  ...ch4,
  ...ch5,
  ...ch6
];
