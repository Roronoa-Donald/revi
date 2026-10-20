/**
 * Catalogue des 18 exercices de React du cours « React » B2 (dossier `react/`).
 *
 * Chaque fiche est un script JavaScript exécuté avec Node.js : la logique
 * de composants, de props, d'état, de listes, d'effets et de routage est
 * testée de manière déterministe via stdin -> stdout.
 *
 * Découpage : six modules de trois fiches (`rx2-cN-eM`).
 */
'use strict';

module.exports = [
  ...require('./react/chapitre1'),
  ...require('./react/chapitre2'),
  ...require('./react/chapitre3'),
  ...require('./react/chapitre4'),
  ...require('./react/chapitre5'),
  ...require('./react/chapitre6')
];
