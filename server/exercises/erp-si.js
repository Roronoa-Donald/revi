/**
 * Catalogue des 18 exercices Python du cours « ERP & SI » B2.
 *
 * Découpage : six modules de trois fiches (n1, n2, n3).
 * Identifiants : `erp2-cN-eM`.
 * Langage : `python`.
 */
'use strict';

module.exports = [
  ...require('./erp-si/chapitre1'),
  ...require('./erp-si/chapitre2'),
  ...require('./erp-si/chapitre3'),
  ...require('./erp-si/chapitre4'),
  ...require('./erp-si/chapitre5'),
  ...require('./erp-si/chapitre6')
];
