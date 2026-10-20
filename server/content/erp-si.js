/**
 * Contenu du cours « ERP & SI » B2 (dossier `erp-si/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier erp-si/.
 */
'use strict';

const chapitres = [
  ...require('./erp-si/chapitres-1-3'),
  ...require('./erp-si/chapitres-4-6')
];

const pages = require('./erp-si/pages');

const course = {
  id: 'erp-si',
  slug: 'erp-si',
  brand: 'ERP & SI B2',
  brandIcon: 'blocks',

  // Terracotta officiel conforme WCAG AA (5.19:1 sur blanc)
  accent: '#c2410c',
  accentDeep: '#9a3412',
  accentSoft: '#fff7ed',
  accentBorder: '#fed7aa',

  storeKey: 'b2erpsi:progress',

  title: 'ERP &amp; Systèmes d’Information B2 — Architecture SI, Processus Métiers, Intégration et Déploiement',
  description:
    'Cours complet d’ERP et Systèmes d’Information niveau B2 : rôle central de l’ERP, base unique, ' +
    'modélisation de processus avec BPMN 2.0, intégration applicative (ESB, ETL/ELT, formats pivots EDI/XML/JSON), ' +
    'cycles métiers (Procure-to-Pay, Order-to-Cash, Three-Way Matching, calcul MRP I/II), ' +
    'modules fonctionnels (Finance en partie double, valorisation CMUP/FIFO des stocks, CRM, SIRH), ' +
    'conduite de projet, matrice des risques et urbanisation du SI.',
  lead:
    'L’ERP est le système nerveux central de l’entreprise moderne. Six chapitres complets pour comprendre ' +
    'l’alignement stratégique des systèmes d’information, maîtriser la modélisation des processus, orchestrer ' +
    'l’intégration des flux et réussir le déploiement d’un progiciel de gestion intégré.',

  sources: 'le cours officiel ERP &amp; Systèmes d’Information B2, la spécification BPMN 2.0 (OMG), les normes d’intégration EDI/XML/JSON et les référentiels d’urbanisation du SI',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
