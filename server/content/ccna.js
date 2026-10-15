/**
 * Contenu du cours « CCNA Réseau » B2 (dossier `ccna/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier ccna/.
 */
'use strict';

const chapitres = [
  ...require('./ccna/chapitres-1-3'),
  ...require('./ccna/chapitres-4-6')
];

const pages = require('./ccna/pages');

const course = {
  id: 'ccna',
  slug: 'ccna',
  brand: 'CCNA Réseau B2',
  brandIcon: 'globe',

  // Bleu Océan 700 / 800 accessible conforme WCAG AA / AAA (6.27:1 / 7.92:1 sur blanc)
  accent: '#0369a1',
  accentDeep: '#075985',
  accentSoft: '#f0f9ff',
  accentBorder: '#bae6fd',

  storeKey: 'b2ccna:progress',

  title: 'CCNA Réseau B2 — Architecture, Adressage IPv4, Commutation &amp; Routage',
  description:
    'Cours complet d’ingénierie réseau et préparation à la certification Cisco CCNA niveau B2 : ' +
    'modèles de référence OSI et TCP/IP, encapsulation et PDU, structure de la trame Ethernet II, adresses MAC et protocole ARP, ' +
    'adressage IPv4 de 32 bits, masques de sous-réseau, notation CIDR, wildcards et découpage hiérarchique VLSM sans gaspillage, ' +
    'commutation Ethernet de niveau 2, apprentissage en table CAM, décisions forwarding vs flooding et protocole Spanning Tree (STP 802.1D / RSTP 802.1w), ' +
    'navigation dans la CLI Cisco IOS, gestion de la mémoire vive RAM vs NVRAM et les 5 règles d’or du durcissement de sécurité (enable secret, SSH v2), ' +
    'routage IPv4, table de routage Cisco (show ip route), algorithme Longest Prefix Match (LPM), distances administratives et routes statiques flottantes, ' +
    'et segmentation par VLANs (IEEE 802.1Q), liens trunk, VLAN natif et routage inter-VLAN Router-on-a-Stick (ROAS).',
  lead:
    'Maîtrisez l’architecture, la commutation et le routage des réseaux d’entreprise selon les standards de l’industrie et de Cisco. ' +
    'Six chapitres d’ingénierie réseau approfondie pour concevoir des plans d’adressage irréprochables, configurer et sécuriser des équipements Cisco ' +
    'et diagnostiquer les pannes de couches 1 à 4 avec rigueur.',

  sources: 'les guides officiels Cisco Press CCNA 200-301 (Wendell Odom), les RFC de l’IETF (RFC 791, RFC 1918, RFC 3021) et les standards IEEE 802.1D, 802.1w et 802.1Q',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
