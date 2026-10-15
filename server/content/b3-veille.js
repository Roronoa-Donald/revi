/**
 * Contenu du cours « Veille Technologique & Innovation B3 » (dossier `b3-veille/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-veille/.
 */
'use strict';

const chapitres = [
  ...require('./b3-veille/chapitres-1-3'),
  ...require('./b3-veille/chapitres-4-6')
];

const pages = require('./b3-veille/pages');

const course = {
  id: 'b3-veille',
  slug: 'b3-veille',
  brand: 'Veille Technologique & Innovation B3',
  brandIcon: 'search',

  // Sarcelle / Cyan sobre conforme WCAG AA/AAA (4.88:1 / 9.87:1 sur blanc)
  accent: '#0e7490',
  accentDeep: '#164e63',
  accentSoft: '#ecfeff',
  accentBorder: '#a5f3fc',

  storeKey: 'b3veille:progress',

  title: 'Veille Technologique &amp; Innovation B3 — Fondements AFNOR, Sourcing &amp; OSINT, Automatisation RSS/API, Traitement NLP/TF-IDF, Prospective TRL/Gartner, Restitution &amp; Tech Radar',
  description:
    'Formation d’excellence en veille technologique, intelligence économique et prospective d’innovation pour le Bachelor 3 : ' +
    'cadre conceptuel et normatif AFNOR XP Z74-501 (typologie sectorielle concurrentielle, commerciale, juridique, environnementale, postures passive, active et proactive, temporale ponctuelle, périodique et permanente, calcul du ROI informationnel), ' +
    'stratégie de sourcing, opérateurs booléens complexes et techniques OSINT avancées (Google Dorks, GitHub search syntax, dépôts de brevets INPI/Espacenet/Google Patents, qualification de la fiabilité selon les grilles CRAAP et matrices d’évaluation AFNOR, détection des signaux faibles précurseurs), ' +
    'architecture d’automatisation de la collecte de données (parseurs de flux RSS 2.0 et Atom 1.0 en XML, déduplication canonique avec suppression des tags de tracking UTM et distance de similarité textuelle de Jaccard, ordonnancement asynchrone respectueux avec Rate Limiting à seau percé Leaky Bucket et rotation de proxys), ' +
    'traitement automatique du langage naturel (NLP) et filtrage sémantique anti-bruit (pipeline de tokenisation, normalisation casse/ponctuation, suppression de stopwords français/anglais, pondération vectorielle TF-IDF avec score cosinus de pertinence, et classification bayésienne naïve pour isoler les faux positifs), ' +
    'analyse prospective et mesure de la maturité technologique (échelle TRL de 1 à 9 NASA / Commission Européenne Horizon Europe, décryptage des 5 phases de la courbe Gartner Hype Cycle du déclenchement au plateau de productivité, matrice croisée SWOT et macro-facteurs PESTEL pour calculer l’indice de résilience technologique, et anticipation des innovations de rupture de Clayton Christensen), ' +
    'et restitution stratégique à forte valeur ajoutée (typologie des livrables de la flash note d’urgence au curated digest hebdomadaire, cartographie dynamique d’entreprise avec le Tech Radar ThoughtWorks sur 4 quadrants et 4 anneaux Adopt, Trial, Assess, Hold, animation d’une cellule de veille en équipe projet B3 sous workflow Kanban avec optimisation du Lead Time, et conformité éthique rigoureuse sur le droit d’auteur, l’exception de courte citation, le secret des affaires et la directive NIS 2).',
  lead:
    'Pilotez la veille technologique et l’innovation stratégique de l’entreprise : sourcing OSINT, automatisation RSS, filtrage NLP TF-IDF, maturité TRL/Gartner, Tech Radar et gouvernance agile Kanban. ' +
    'Six modules approfondis combinant rigueur méthodologique AFNOR, 18 ateliers de code interactifs en Python 3 et 48 QCM d’évaluation.',

  sources: 'Norme AFNOR XP Z74-501, Documentation W3C RSS/Atom, Framework ThoughtWorks Tech Radar, Référentiel NASA / Horizon Europe TRL, Cours Veille Technologique B3 (Yan Nyaku, Collège de Paris)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
