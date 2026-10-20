/**
 * Contenu du cours « DevOps B3 » (dossier `b3-devops/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-devops/.
 */
'use strict';

const chapitres = [
  ...require('./b3-devops/chapitres-1-3'),
  ...require('./b3-devops/chapitres-4-6')
];

const pages = require('./b3-devops/pages');

const course = {
  id: 'b3-devops',
  slug: 'b3-devops',
  brand: 'DevOps B3',
  brandIcon: 'layers',

  // Cyan / Deep Teal accessible conforme WCAG AA/AAA (4.88:1 / 7.15:1 sur blanc)
  accent: '#0e7490',
  accentDeep: '#155e75',
  accentSoft: '#ecfeff',
  accentBorder: '#a5f3fc',

  storeKey: 'b3devops:progress',

  title: 'DevOps B3 — Lean, Intégration Continue, Docker, Déploiements, Métriques DORA &amp; SRE',
  description:
    'Formation d’excellence en ingénierie DevOps et automatisation continue pour le Bachelor 3 : ' +
    'rupture du mur de la confusion Dev/Ops, principes du Lean Software Development (Toyota TPS, Kaizen, ' +
    'élimination des gaspillages Muda/Muri/Mura), les 3 Voies de Gene Kim (The Phoenix Project), modèle CALMS ' +
    'et cartographie de chaîne de valeur (VSM, Lead Time vs Process Time, Flow Efficiency), ' +
    'industrialisation de l’Intégration Continue (CI), comparaison critique Trunk-Based Development vs GitFlow, ' +
    'spécification rigoureuse de Semantic Versioning (SemVer 2.0.0), pyramide des tests automatisés et détection ' +
    'des tests instables (Flaky Tests), conteneurisation fine sous Linux (namespaces, cgroups, OverlayFS, CoW), ' +
    'ordonnancement optimal du cache Dockerfile, Multi-Stage Builds, durcissement de sécurité non-root et ' +
    'idempotence d’Infrastructure as Code (IaC, gestion du drift), architectures de déploiement continu ' +
    'sans interruption (Zero-Downtime : Rolling Updates, Blue/Green, Canary Releases avec circuit breaker), ' +
    'découplage Deploy vs Release par Feature Flags, pilotage scientifique de la performance par les 4 métriques DORA ' +
    '(Deployment Frequency, Lead Time for Changes, Change Failure Rate, MTTR) et fiabilité matérielle/logicielle ' +
    '(MTBF, MTTF, MTTR, disponibilité opérationnelle, Blast Radius, post-mortem sans blâme), et doctrine ' +
    'Site Reliability Engineering (SRE) de Google (gestion du Toil, dialèctique SLI/SLO/SLA, gouvernance par Error Budgets, ' +
    'analyse de Burn Rate, les 4 signaux dorés d’observabilité et éradication de l’Alert Flapping Prometheus).',
  lead:
    'Maîtrisez la chaîne complète d’ingénierie DevOps, l’automatisation CI/CD, l’optimisation de conteneurs Docker, ' +
    'le pilotage par les métriques DORA et la fiabilité opérationnelle SRE de niveau Bachelor 3. ' +
    'Six modules approfondis combinant formalisme théorique, 18 ateliers de programmation interactive en Python 3 et 48 QCM d’évaluation.',

  sources: 'le cours CC_Devops.docx, les principes de Continuous Delivery (Jez Humble, David Farley), The Phoenix Project (Gene Kim), les recherches DORA (Accelerate) et les référentiels Site Reliability Engineering de Google',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
