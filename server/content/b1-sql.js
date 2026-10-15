/**
 * Contenu du cours « Bases de données & SQL » (B1).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-sql/.
 *
 * Cours à atelier de code exécutable : chaque chapitre se termine par trois
 * exercices Bash corrigés automatiquement (catalogue `server/exercises/b1-sql.js`,
 * préfixe `sq`). L'atelier de la page atelier.html complète le **simulateur SQL**
 * embarqué (SQLite en WebAssembly, jeu de données « parc_auto » du support) : la
 * logique des requêtes se vérifie en Bash, les requêtes s'essaient en réel dans
 * le simulateur.
 */
'use strict';

const chapitres = [
  ...require('./b1-sql/chapitres-1-3'),
  ...require('./b1-sql/chapitres-4-6')
];

const pages = require('./b1-sql/pages');

const course = {
  id: 'b1-sql',
  slug: 'sql',
  brand: 'SQL B1',
  brandIcon: 'database',

  // Bleu assombri : 5,2:1 sur blanc, donc conforme en texte comme en fond du
  // bouton principal (texte blanc sur accent).
  accent: '#2563eb',
  accentDeep: '#1e40af',
  accentSoft: '#e7f0fe',
  accentBorder: '#c3daf8',

  storeKey: 'b1sql:progress',

  title: 'Bases de données & SQL — interroger une base',
  description:
    'Cours complet de bases de données et SQL niveau B1 : vocabulaire des bases de données et des SGBD, ' +
    'modèle relationnel, types de données, création de tables, insertion, requêtes SELECT avec WHERE, ' +
    'ORDER BY, DISTINCT et LIMIT, jointures, fonctions d’agrégation, GROUP BY et HAVING, mises à jour, ' +
    'utilisateurs et privilèges. Théorie, ateliers de code corrigés, simulateur SQL intégré, QCM et ' +
    'examens blancs.',
  lead:
    'Une base de données ne répond qu’à une seule chose : une question bien écrite. Six chapitres pour ' +
    'apprendre à décrire une base, la remplir, la questionner, relier ses tables, regrouper ses lignes ' +
    'et protéger ses données — chaque chapitre se termine par trois exercices de code corrigés, et ' +
    'chaque requête s’essaie en réel dans le simulateur SQL intégré au cours, sans rien installer.',

  sources: 'le support B1 « Base de données & SQL » (IT-B1) et le jeu de données parc_auto du support (Marque, Voiture)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
