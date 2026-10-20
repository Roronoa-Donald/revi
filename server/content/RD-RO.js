/**
 * Contenu du cours « Recherche Opérationnelle » B2 (dossier `RD-RO/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier RD-RO/.
 */
'use strict';

const chapitres = [
  ...require('./RD-RO/chapitres-1-3'),
  ...require('./RD-RO/chapitres-4-6')
];

const pages = require('./RD-RO/pages');

const course = {
  id: 'RD-RO',
  slug: 'RD-RO',
  brand: 'Recherche Opérationnelle B2',
  brandIcon: 'chart',

  // Sarcelle / Teal accessible conforme WCAG AA (5.56:1 sur blanc)
  accent: '#0f766e',
  accentDeep: '#115e59',
  accentSoft: '#f0fdfa',
  accentBorder: '#99f6e4',

  storeKey: 'b2ro:progress',

  title: 'Recherche Opérationnelle B2 — Programmation Linéaire, Simplexe, Dualité & Réseaux',
  description:
    'Cours complet de Recherche Opérationnelle niveau B2 : modélisation de programmes linéaires (production, mélange, affectation), ' +
    'formes canonique et standard, variables d’écart et d’excès, résolution graphique dans le plan R², règle de Cramer, ' +
    'algorithme du simplexe de George Dantzig, critères de pivotage, règle de Bland anti-cyclage, méthode des deux phases, ' +
    'théorie de la dualité, théorèmes faible et fort, conditions d’écarts complémentaires de Karush-Kuhn-Tucker, ' +
    'prix d’ombre (shadow prices), problème de transport, méthodes du coin Nord-Ouest et du moindre coût, ' +
    'optimisation MODI, algorithme Hongrois, ordonnancement PERT/CPM, chemin critique et flots de Ford-Fulkerson.',
  lead:
    'L’art mathématique de prendre les meilleures décisions face à des ressources rares. ' +
    'Six chapitres exhaustifs pour maîtriser la programmation linéaire, dompter le simplexe, ' +
    'interpréter la dualité et optimiser les réseaux logistiques et temporels.',

  sources: 'le cours de Recherche Opérationnelle B2, les publications historiques de George Dantzig (1947), Ford & Fulkerson (1956) et les manuels de référence en optimisation linéaire',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
