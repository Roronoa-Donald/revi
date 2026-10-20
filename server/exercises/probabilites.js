/**
 * Catalogue des 18 exercices Python du cours « Probabilités » B2.
 *
 * Le cours enseigne les probabilités en notation mathématique ; Python y joue
 * le rôle de calculatrice vérifiable. Chaque exercice lit ses données sur
 * l'entrée standard (une valeur ou un couple par ligne) et sa sortie est
 * comparée après normalisation des fins de ligne.
 *
 * Découpage : six modules de trois fiches, chacun dans son fichier pour rester
 * lisible. Les identifiants suivent le schéma `pb2-cN-eM`.
 *
 * Conventions rappelées dans les énoncés :
 *   - les probabilités sont affichées arrondies à 4 décimales ;
 *   - les factorielles et coefficients binomiaux sont exacts (entiers) ;
 *   - la loi normale est évaluée par la fonction d'erreur `erf`.
 */
'use strict';

module.exports = [
  ...require('./probabilites/chapitre1'),
  ...require('./probabilites/chapitre2'),
  ...require('./probabilites/chapitre3'),
  ...require('./probabilites/chapitre4'),
  ...require('./probabilites/chapitre5'),
  ...require('./probabilites/chapitre6')
];
