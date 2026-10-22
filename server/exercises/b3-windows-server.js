/**
 * Catalogue des 18 exercices d'ingénierie et d'administration du cours
 * « Windows Server B3 » (dossier `b3-windows-server/`).
 *
 * Découpage : six modules de trois exercices de manière méthodique, chacun dans son fichier.
 * Les identifiants suivent le schéma `ws3-cN-eM`.
 */
'use strict';

module.exports = [
  ...require('./b3-windows-server/chapitre1'),
  ...require('./b3-windows-server/chapitre2'),
  ...require('./b3-windows-server/chapitre3'),
  ...require('./b3-windows-server/chapitre4'),
  ...require('./b3-windows-server/chapitre5'),
  ...require('./b3-windows-server/chapitre6')
];
