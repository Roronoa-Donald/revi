/**
 * Contenu du cours « Virtualisation des serveurs » B1.
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-virtualisation/.
 *
 * Le découpage suit le support B1 du module (dossier « cours B1 IT /
 * Virtualisation des serveurs ») : l'histoire « Le serveur fainéant et les
 * machines ambitieuses » et ses questions de compréhension, d'analyse technique
 * et de réflexion. Six chapitres qui s'exercent tous en Bash : chaque règle —
 * seuil des 48 minutes, partage mémoire/processeur/disque, allocation sans
 * dépasser la capacité, inventaire et charge des services, plafond de la
 * consolidation, seuil de saturation, symptômes 90/90/500, pitch en quatre
 * étapes et plan de réveil v/e/s — est simulée par un script qui reproduit
 * l'analyse exacte du support.
 */
'use strict';

const chapitres = [
  ...require('./b1-virtualisation/chapitres-1-3'),
  ...require('./b1-virtualisation/chapitres-4-6')
];

const pages = require('./b1-virtualisation/pages');

const course = {
  id: 'b1-virtualisation',
  slug: 'vt',
  brand: 'Virtualisation B1',
  brandIcon: 'vm',
  accent: '#0e7490',
  accentDeep: '#155e75',
  accentSoft: '#ecfeff',
  accentBorder: '#a5f3fc',

  storeKey: 'b1virtualisation:progress',

  title: 'Virtualisation des serveurs : le serveur fainéant et les machines ambitieuses',
  description:
    'Cours complet B1 construit sur l’histoire du support : le serveur fainéant et son constat ' +
    '(80 % d’inactivité, facture d’électricité pour rien), la virtualisation comme partage des ' +
    'ressources (mémoire, processeur, disque — « on ne prendra chacun que ce dont on a besoin »), ' +
    'les services virtualisés (base de données, site web, pare-feu, serveur de test) avec leur ' +
    'inventaire et leur charge, la rentabilisation (de 80 % à 100 %, plafond de la consolidation, ' +
    'plan de placement), les risques de la surcharge (seuil de saturation, symptômes 90/90/500, ' +
    'déplacement de VM) et l’argumentaire final au responsable informatique (pitch en quatre étapes, ' +
    'plan de réveil v/e/s, verdict en trois états). Chaque règle est scriptée en Bash et réellement ' +
    'exécutée dans la page.',

  lead:
    'Il était une fois un serveur très puissant, mais très paresseux : 80 % de son temps à ne rien ' +
    'faire, de l’électricité pour rien. Jusqu’à ce qu’un ingénieur propose la virtualisation et que ' +
    'des machines virtuelles promettent de partager sa mémoire, son processeur et son disque — sans ' +
    'prendre plus que leur besoin. Six chapitres pour rejouer l’histoire jusqu’au plan d’action : ' +
    'chaque règle est d’abord programmée et vérifiée dans l’atelier, puis reliée aux questions de ' +
    'compréhension, d’analyse et de réflexion du support.',

  sources:
    'le support B1 « Le serveur fainéant et les machines ambitieuses — histoire » (dossier « cours ' +
    'B1 IT / Virtualisation des serveurs ») : texte narratif et questions de compréhension, d’analyse ' +
    'technique et de réflexion',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
