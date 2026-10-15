/**
 * Catalogue des 18 exercices d'administration Windows Server du cours
 * « RD WinServer » B2 (dossier `rd_winserver/`).
 *
 * Chaque fiche est un script PowerShell autonome lu sur l'entrée standard
 * (`[Console]::In.ReadLine()`) et rendu sur la sortie standard. Le langage
 * `powershell` n'est pas exécutable par la machine de développement (aucun
 * interpréteur, et pas dans la liste blanche du service d'exécution distant) :
 * `tests/exercise-solutions.test.js` ignore donc ces fiches, et l'intégrité du
 * catalogue est vérifiée structurellement, comme pour le cours de Java.
 *
 * Découpage : six modules de trois fiches, chacun dans son fichier. Les
 * identifiants suivent le schéma `ws2-cN-eM`.
 */
'use strict';

module.exports = [
  ...require('./rd_winserver/chapitre1'),
  ...require('./rd_winserver/chapitre2'),
  ...require('./rd_winserver/chapitre3'),
  ...require('./rd_winserver/chapitre4'),
  ...require('./rd_winserver/chapitre5'),
  ...require('./rd_winserver/chapitre6')
];
