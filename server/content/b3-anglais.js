/**
 * Contenu du cours « Anglais B3 » (dossier `b3-anglais/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-anglais/.
 */
'use strict';

const chapitres = [
  ...require('./b3-anglais/chapitres-1-3'),
  ...require('./b3-anglais/chapitres-4-6')
];

const pages = require('./b3-anglais/pages');

const course = {
  id: 'b3-anglais',
  slug: 'b3-anglais',
  brand: 'Anglais B3',
  brandIcon: 'book',

  // Rouge Bordeaux / Crimson sobre conforme WCAG AA/AAA (7.2:1 / 9.95:1 sur blanc)
  accent: '#991b1b',
  accentDeep: '#7f1d1d',
  accentSoft: '#fef2f2',
  accentBorder: '#fecaca',

  storeKey: 'b3anglais:progress',

  title: 'Anglais Professionnel &amp; Technique B3 — Documentation d’API, Norme RFC 2119, Équipe Agile, SLAs, Support Client, Méthode STAR &amp; Présentations Techniques',
  description:
    'Formation d’excellence en anglais professionnel et technique d’ingénierie informatique pour le Bachelor 3 : ' +
    'précision terminologique et distinction rigoureuse entre anomalies (glitch, bug, vulnérabilité, exploit ; latence, bande passante, débit), décodage des acronymes IT normalisés (API, CI/CD, IaaS, PaaS, SaaS, SSH, TLS, DNS, REST, SLA) et cartographie des responsabilités partagées en architecture Cloud, ' +
    'maîtrise intégrale de la documentation technique (spécifications d’API REST/OpenAPI avec méthodes HTTP, en-têtes et codes de retour 2xx/4xx/5xx, audit des clauses normatives de la norme RFC 2119 avec MUST, SHOULD et MAY, et structuration de fichiers README clairs et reproductibles), ' +
    'communication écrite d’ingénierie (diagnostic de la clinique des mauvais emails, rédaction de tickets de bug exploitables et publication de bulletins d’escalade d’incident critique SEV-1 pour la direction), ' +
    'animation et collaboration au sein d’équipes internationales agiles (Daily Standup meetings minutés avec Yesterday/Today/Blockers, interruptions courtoises, calculs mathématiques et contractuels de conformité aux SLAs et animation de rétrospectives d’itération), ' +
    'gestion du support technique et culture post-incident (traduction empathique et sans jargon des erreurs systèmes cryptiques, matrice de sévérité ITIL et rédaction de rapports post-mortem blameless fondés sur la méthode des 5 Pourquoi), ' +
    'et enfin préparation aux soutenances et entretiens de recrutement internationaux (architecture de présentations en 1 minute à 10 minutes avec accroche, développement et balisage verbal signposting, méthode comportementale STAR avec métriques chiffrées et optimisation des CV pour les filtres ATS).',
  lead:
    'Maîtrisez l’anglais technique et professionnel de l’ingénierie IT : spécifications d’API REST, RFC 2119, rituels agiles, calculs de SLA, support client empathique, post-mortems blameless et pitchs techniques percutants. ' +
    'Six modules approfondis combinant rigueur d’expression internationale, 18 ateliers de programmation interactifs en Python 3 et 48 QCM d’évaluation.',

  sources: 'Supports officiels de cours B3 IT (Dorcas Tchogoue, Collège de Paris), Normes RFC 2119 / RFC 2616 (IETF), Spécifications OpenAPI 3.0, Principes Google Site Reliability Engineering (SRE) et Modèle comportemental STAR',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
