/**
 * Contenu du cours « Projet tutoré : application de gestion de stock » B1.
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-projet/.
 *
 * Le découpage suit le support « Tutoriel Projet Tutoré — Application de
 * Gestion de Stock » (Python, Tkinter & PostgreSQL, LAWSON Latevi Sena,
 * Collège de Paris - Campus de Lomé, janvier 2026) : cadrage, base de
 * données, interface, cycle de vie d'un produit, logique métier, livraison.
 * Six chapitres qui s'exercent tous en Bash : chaque règle — prérequis,
 * schéma de table, requêtes CRUD, validation, seuils, export — est simulée
 * par un script qui reproduit l'analyse exacte du support.
 */
'use strict';

const chapitres = [
  ...require('./b1-projet/chapitres-1-3'),
  ...require('./b1-projet/chapitres-4-6')
];

const pages = require('./b1-projet/pages');

const course = {
  id: 'b1-projet',
  slug: 'pr',
  brand: 'Projet tutoré B1',
  brandIcon: 'folder',
  accent: '#64748b',
  accentDeep: '#475569',
  accentSoft: '#f8fafc',
  accentBorder: '#e2e8f0',

  storeKey: 'b1projet:progress',

  title: 'Projet tutoré : application de gestion de stock',
  description:
    'Cours complet B1 : cadrage du projet (objectifs, prérequis Python 3.7+, environnement, structure ' +
    'des fichiers), la base de données (table produits, classe Database, connexion psycopg2, requêtes ' +
    'CRUD paramétrées, commit), l\'interface Tkinter (deux écrans, widgets, Treeview, boîtes de ' +
    'dialogue, validation des champs), le cycle de vie d\'un produit (ajout, modification, suppression ' +
    'confirmée, mouvements de stock), la logique métier (alertes de seuil, valeur du stock, recherche ' +
    'par catégorie, boucle de maximum) et la livraison (dépannage, export CSV, améliorations, tableau ' +
    'de bord de soutenance). Chaque règle est scriptée en Bash et réellement exécutée dans la page.',

  lead:
    'Un projet tutoré réussi n\'est pas du code écrit vite : c\'est une discipline — cadrer (objectifs, ' +
    'prérequis, structure), connecter (table produits, requêtes paramétrées, commit), afficher (deux ' +
    'écrans Tkinter, validation avant la base), faire vivre le stock (ajout, modification, suppression ' +
    'confirmée), le faire parler (seuils, valeur totale, maximum), puis livrer (dépannage, export CSV, ' +
    'tableau de bord). Six chapitres pour ancrer chaque règle. Chacune est d\'abord programmée et ' +
    'vérifiée dans l\'atelier, puis rejouée telle quelle sur les cas du tutoriel.',

  sources:
    'le support « Tutoriel Projet Tutoré — Application de Gestion de Stock » (Python, Tkinter & ' +
    'PostgreSQL, LAWSON Latevi Sena, Collège de Paris - Campus de Lomé, janvier 2026)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
