/**
 * Catalogue des 18 exercices de droit informatique du cours « Droit
 * Informatique » B2 (dossier `droit/`).
 *
 * Chaque fiche est un script Bash lu dans les données du cas : la logique
 * juridique (classification, comptage, verdict, sanctions) est simulée et
 * réellement exécutée, comme pour `b1-droit`.
 *
 * Découpage : six modules de trois fiches (`dr2-cN-eM`).
 */
'use strict';

module.exports = [
  ...require('./droit/chapitre1'),
  ...require('./droit/chapitre2'),
  ...require('./droit/chapitre3'),
  ...require('./droit/chapitre4'),
  ...require('./droit/chapitre5'),
  ...require('./droit/chapitre6')
];
