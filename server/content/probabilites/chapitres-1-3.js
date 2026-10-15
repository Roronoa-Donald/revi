/**
 * Chapitres 1 à 3 du cours « Probabilités » B2 — fondements, dénombrement et
 * variables aléatoires discrètes.
 *
 * Chaque chapitre vit dans son propre module pour garder un fichier lisible ;
 * l'agrégateur ne fait que les ordonner. La matière est mise en page par
 * `kit.chapter` : aucun titre <h2> ici, la numérotation est ajoutée au rendu, et
 * les trois exercices de code sont injectés avant le QCM par
 * `scripts/generate-code-labs.js`.
 */
'use strict';

module.exports = [
  require('./chapitre1'),
  require('./chapitre2'),
  require('./chapitre3')
];
