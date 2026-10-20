/**
 * Contenu du cours « Méthodes Agiles B3 » (dossier `b3-agile/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-agile/.
 */
'use strict';

const chapitres = [
  ...require('./b3-agile/chapitres-1-3'),
  ...require('./b3-agile/chapitres-4-6')
];

const pages = require('./b3-agile/pages');

const course = {
  id: 'b3-agile',
  slug: 'b3-agile',
  brand: 'Méthodes Agiles B3',
  brandIcon: 'layers',

  // Violet sobre conforme WCAG AA/AAA (6.94:1 / 12.18:1 sur blanc)
  accent: '#6d28d9',
  accentDeep: '#4c1d95',
  accentSoft: '#f5f3ff',
  accentBorder: '#ddd6fe',

  storeKey: 'b3agile:progress',

  title: 'Méthodes Agiles B3 — Scrum, Kanban, User Stories INVEST, Vélocité &amp; Agilité à l’Échelle',
  description:
    'Formation d’excellence en gestion de projet agile et ingénierie logicielle pour le Bachelor 3 : ' +
    'fondements de la gestion de projet et rupture empirique (Triangle de Fer périmètre/coût/délais, cycles traditionnels Cascade et Cycle en V, ordonnancement PERT et calcul du chemin critique, émergence du Manifeste Agile de 2001 et les 3 piliers Transparence, Inspection, Adaptation), ' +
    'cadre Scrum officiel selon le Scrum Guide (responsabilités Product Owner, Scrum Master, Developers, les 3 artefacts Product Backlog, Sprint Backlog, Incrément avec leurs engagements respectifs Product Goal, Sprint Goal, Definition of Done, et respect du timeboxing sur les 5 événements), ' +
    'maîtrise des flux avec Kanban et le Lean Management (gestion du flux tiré vs poussé, limitation stricte du travail en cours WIP Limits, axiome Stop starting start finishing, métriques Lead Time, Cycle Time, Wait Time, Throughput, diagramme de flux cumulé CFD et modélisation mathématique par la Loi de Little), ' +
    'ingénierie des exigences agiles et estimation relative (modèle des 3C de Ron Jeffries Card/Conversation/Confirmation, canevas narratif de Mike Cohn, qualification INVEST de Bill Wake, critères d’acceptation BDD/Gherkin Given-When-Then, Planning Poker et suite de Fibonacci modifiée sans biais d’ancrage), ' +
    'pilotage de release et planification prévisionnelle (mesure empirique de la vélocité moyenne, loi de Goodhart contre l’inflation de points, calcul de capacité nette avec Focus Factor, Sprint Burn-down chart et détection de Scope Creep, Release Burn-up chart et cône d’incertitude probabiliste), ' +
    'et passage à l’échelle et gouvernance d’entreprise (défis multi-équipes, Scrum of Scrums, frameworks à l’échelle SAFe avec PI Planning et LeSS, organisation matricielle du modèle Spotify avec Squads, Tribes, Chapters, Guilds, modèles hybrides Water-Scrum-Fall et radars de maturité agile).',
  lead:
    'Maîtrisez le cadre Scrum officiel, le flux tiré Kanban, la modélisation mathématique par la Loi de Little, les User Stories INVEST, la planification prévisionnelle et l’agilité à l’échelle. ' +
    'Six modules approfondis combinant formalisme méthodologique, 18 ateliers de programmation interactive en Python 3 et 48 QCM d’évaluation.',

  sources: 'Guide officiel Scrum (Ken Schwaber & Jeff Sutherland), Manifeste Agile (2001), Kanban Guide (David J. Anderson), User Stories Applied (Mike Cohn) et Scaled Agile Framework (SAFe)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
