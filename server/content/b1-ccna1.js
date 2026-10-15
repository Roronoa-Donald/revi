/**
 * Contenu du cours « CCNA 1 B1 ».
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-ccna1/.
 *
 * Le découpage suit le support « B1-IT : CCNA 1 » (Essowaba AHOULOUMI,
 * Collège de Paris, 142 p.) : généralités et câblage, modèles TCP/IP et OSI,
 * Ethernet LAN, WAN et routage IP, CLI Cisco, configuration du commutateur.
 * Six chapitres qui s'exercent tous en Bash : chaque règle (brochage, couches,
 * routage, modes de la CLI, sécurisation) est simulée par un script qui
 * reproduit l'analyse exacte du support.
 */
'use strict';

const chapitres = [
  ...require('./b1-ccna1/chapitres-1-3'),
  ...require('./b1-ccna1/chapitres-4-6')
];

const pages = require('./b1-ccna1/pages');

const course = {
  id: 'b1-ccna1',
  slug: 'cc',
  brand: 'CCNA 1 B1',
  brandIcon: 'globe',

  // Cyan du registre des cours, assombri pour rester au-dessus de 4,5:1 sur
  // blanc (le cyan-600 #0891b2 reste limite sur les petits textes).
  accent: '#0e7490',
  accentDeep: '#155e75',
  accentSoft: '#ecfeff',
  accentBorder: '#a5f3fc',

  storeKey: 'b1ccna1:progress',

  title: 'CCNA 1 — réseaux, Ethernet, routage et CLI Cisco',
  description:
    'Cours complet CCNA 1 niveau B1 : généralités sur les réseaux et leurs composantes (routeur, ' +
    'commutateurs L2/L3, pare-feu, IDS/IPS), câblage Ethernet (paires torsadées UTP à SSTP, catégories, ' +
    'fibre optique), modèles TCP/IP et OSI, réseaux locaux Ethernet (SOHO, entreprise, brochages droit ' +
    'et croisé, trame 802.3), WAN et routage IP (HDLC, EoMPLS, logique de routage, sous-réseaux), CLI ' +
    'Cisco (console, Telnet, SSH, modes, mémoires, running-config) et configuration de base du ' +
    'commutateur (sécurisation, SSH, IPv4 de gestion). Chaque règle est scriptée en Bash et réellement ' +
    'exécutée dans la page.',
  lead:
    'Le CCNA 1 n\'est pas du vocabulaire à réciter : c\'est une discipline — choisir le bon câble (droit ' +
    'ou croisé), la bonne catégorie (cat 5e, cat 6a), placer la bonne unité dans la bonne couche, dérouler ' +
    'les quatre étapes du routage, escalader les modes de la CLI, sécuriser un commutateur. Six chapitres ' +
    'pour ancrer chaque mécanisme. Chacun est d\'abord programmé et vérifié dans l\'atelier, puis rejoué ' +
    'tel quel sur les exemples du support.',

  sources:
    'le support « B1-IT : CCNA 1 » (Essowaba AHOULOUMI, Collège de Paris, d\'après le programme CCNA 200-301)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
