/**
 * Catalogue des 18 exercices du cours « CCNA Réseau B2 » (dossier `ccna/`).
 *
 * 6 chapitres x 3 exercices (n1, n2, n3).
 * Préfixe d'identifiant : `na2`.
 * Mode : Étude de cas (`python`).
 */
'use strict';

module.exports = [
  ...require('./ccna/chapitre1'),
  ...require('./ccna/chapitre2'),
  ...require('./ccna/chapitre3'),
  ...require('./ccna/chapitre4'),
  ...require('./ccna/chapitre5'),
  ...require('./ccna/chapitre6')
];
