/**
 * Contenu du cours « Architecture des réseaux B1 ».
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-reseaux/.
 *
 * Le découpage suit les trois présentations « Architecture des réseaux »
 * (Collège de Paris, A. Nadjak Kan'sam) : fondamentaux et topologies, modèles
 * OSI et TCP/IP, adressage et sous-réseautage. Six chapitres qui s'exercent
 * tous en Bash : chaque règle (classement, panne, handshake, masque) est
 * simulée par un script qui reproduit l'analyse exacte du support.
 */
'use strict';

const chapitres = [
  ...require('./b1-reseaux/chapitres-1-3'),
  ...require('./b1-reseaux/chapitres-4-6')
];

const pages = require('./b1-reseaux/pages');

const course = {
  id: 'b1-reseaux',
  slug: 're',
  brand: 'Architecture des réseaux B1',
  brandIcon: 'globe',

  // Cyan du registre des cours, assombri pour rester au-dessus de 4,5:1 sur
  // blanc (le cyan-500 #06b6d4 tombe à 2,4:1 — même traitement que b1-cyber).
  accent: '#0e7490',
  accentDeep: '#155e75',
  accentSoft: '#ecfeff',
  accentBorder: '#a5f3fc',

  storeKey: 'b1reseaux:progress',

  title: 'Architecture des réseaux B1 — OSI, TCP/IP, adressage, sous-réseaux',
  description:
    'Cours complet d\'architecture des réseaux niveau B1 : pourquoi les réseaux (LAN, WAN, workgroup, ' +
    'client-serveur), les topologies et supports (bus, anneau, étoile ; UTP, STP, fibre, Wi-Fi), le modèle ' +
    'OSI en sept couches, le modèle TCP/IP et le three-way handshake, l\'adressage (MAC, IP, ARP, masque, ' +
    'classes) et le sous-réseautage (emprunt de bits, VLSM, CIDR). Chaque règle est scriptée en Bash et ' +
    'réellement exécutée dans la page.',
  lead:
    'L\'architecture des réseaux n\'est pas de la théorie : c\'est une discipline — classer un réseau ' +
    '(LAN, MAN, WAN), prévoir la panne (bus, anneau, étoile), dépanner par couches (OSI), ouvrir une connexion ' +
    '(handshake TCP), découper un plan d\'adresses (masque, VLSM). Six chapitres pour ancrer chaque mécanisme. ' +
    'Chacun est d\'abord programmé et vérifié dans l\'atelier, puis rejoué tel quel sur les exemples des supports.',

  sources:
    'les présentations « Architecture des réseaux » (Collège de Paris, A. Nadjak Kan\'sam, sessions 1 à 3)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
