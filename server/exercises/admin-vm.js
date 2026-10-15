/**
 * Catalogue des 18 exercices d'administration de machines virtuelles du cours
 * « Admin VM » B2 (dossier `admin-vm/`).
 *
 * Chaque fiche est un script PowerShell lu sur l'entrée standard. Le langage
 * `powershell` n'étant pas exécutable localement (ni dans la liste blanche),
 * `tests/exercise-solutions.test.js` ignore ces fiches et l'intégrité du
 * catalogue est vérifiée structurellement, comme pour `rd_winserver`.
 *
 * Découpage : six modules de trois fiches (`vm2-cN-eM`).
 */
'use strict';

module.exports = [
  ...require('./admin-vm/chapitre1'),
  ...require('./admin-vm/chapitre2'),
  ...require('./admin-vm/chapitre3'),
  ...require('./admin-vm/chapitre4'),
  ...require('./admin-vm/chapitre5'),
  ...require('./admin-vm/chapitre6')
];
