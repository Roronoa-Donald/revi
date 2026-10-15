/**
 * Catalogue des 18 exercices Java du cours « Java » B2 (dossier `rd_java/`).
 *
 * Le programme est un `public class Main` autonome lu sur l'entrée standard
 * (Scanner). Le langage `java` figure dans la liste blanche du service
 * d'exécution (`server/services/execution/languages.js`) : l'exécution réelle
 * est déléguée au fournisseur OANOR. La machine de développement locale ne
 * disposant pas de JDK, `tests/exercise-solutions.test.js` ignore ces fiches
 * (comme tout langage dont l'outillage est absent) ; l'intégrité du catalogue
 * reste vérifiée par `tests/exercises.test.js`.
 *
 * Découpage : six modules de trois fiches, chacun dans son fichier. Les
 * identifiants suivent le schéma `java2-cN-eM`.
 */
'use strict';

module.exports = [
  ...require('./rd_java/chapitre1'),
  ...require('./rd_java/chapitre2'),
  ...require('./rd_java/chapitre3'),
  ...require('./rd_java/chapitre4'),
  ...require('./rd_java/chapitre5'),
  ...require('./rd_java/chapitre6')
];
