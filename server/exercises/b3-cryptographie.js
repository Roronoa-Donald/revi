/**
 * Catalogue complet des 18 exercices du cours « Cryptographie & PKI B3 ».
 * Module : Cryptographie & PKI B3 (idPrefix: cr3).
 */
'use strict';

const ch1 = require('./b3-cryptographie/chapitre1');
const ch2 = require('./b3-cryptographie/chapitre2');
const ch3 = require('./b3-cryptographie/chapitre3');
const ch4 = require('./b3-cryptographie/chapitre4');
const ch5 = require('./b3-cryptographie/chapitre5');
const ch6 = require('./b3-cryptographie/chapitre6');

module.exports = [
  ...ch1,
  ...ch2,
  ...ch3,
  ...ch4,
  ...ch5,
  ...ch6
];
