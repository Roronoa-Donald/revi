/**
 * Contenu du cours « Cloud Computing B3 » (dossier `b3-cloud-computing/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-cloud-computing/.
 */
'use strict';

const chapitres = [
  ...require('./b3-cloud-computing/chapitres-1-3'),
  ...require('./b3-cloud-computing/chapitres-4-6')
];

const pages = require('./b3-cloud-computing/pages');

const course = {
  id: 'b3-cloud-computing',
  slug: 'b3-cloud-computing',
  brand: 'Cloud Computing B3',
  brandIcon: 'cloud',

  // Bleu Ciel / Océan accessible conforme WCAG AA/AAA (5.93:1 / 7.8:1 sur blanc)
  accent: '#0369a1',
  accentDeep: '#075985',
  accentSoft: '#f0f9ff',
  accentBorder: '#bae6fd',

  storeKey: 'b3cloud:progress',

  title: 'Cloud Computing B3 — Modèles NIST, Hyperscalers, Virtualisation, Green IT, Souveraineté &amp; FinOps',
  description:
    'Formation d’excellence en architecture Cloud et infrastructures scalables pour le Bachelor 3 : ' +
    'définition canonique du NIST (SP 800-145) et matrice de responsabilité IaaS, PaaS et SaaS, ' +
    'cartographie comparative des hyperscalers mondiaux (AWS, Azure, GCP), topologie en Régions, ' +
    'Zones de Disponibilité (AZ) et Edge Locations, modélisation probabiliste et calcul de SLA composé ' +
    '(série, parallèle, budget d’erreur annuel), ingénierie de la virtualisation système ' +
    '(hyperviseurs Type 1 Bare-Metal vs Type 2 Hosted, extensions HVM, paravirtualisation, ratios de sur-allocation ' +
    'vCPU/pCPU et mémoire, dimensionnement transactionnel en pic de trafic), indicateurs d’efficience ' +
    'environnementale Green IT (calcul du PUE, DCiE, confinement d’allées, free-cooling, modélisation d’émissions tCO2e ' +
    'et automatisation FinOps d’extinction), modèle de responsabilité partagée, durcissement et audit ' +
    'de sécurité du stockage objet (CSPM, chiffrement SSE-KMS, Object Lock, IAM moindre privilège), ' +
    'analyse juridique de souveraineté des données (RGPD européen face à l’extraterritorialité du CLOUD Act américain, ' +
    'qualification SecNumCloud de l’ANSSI), et cadre méthodologique de migration d’entreprise ' +
    '(arbre de décision des 6 R de Gartner/AWS, calcul de TCO comparatif sur 3 ans CAPEX vs OPEX, ' +
    'gouvernance FinOps et arbitrage tarifaire On-Demand, Instances Réservées et Spot).',
  lead:
    'Maîtrisez les architectures d’infrastructure, la haute disponibilité, l’efficience énergétique et la gouvernance financière du Cloud Computing de niveau Bachelor 3. ' +
    'Six modules approfondis combinant formalisme technique, 18 études de cas pratiques et méthodologiques et 48 QCM d’évaluation.',

  sources: 'le cours magistral COURS CLOUD COMPUTING CDPS ITB3, les publications spéciales du NIST (SP 800-145), les standards The Green Grid / ISO 30134 et les référentiels professionnels AWS, Azure et ANSSI SecNumCloud',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
