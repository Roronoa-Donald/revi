/**
 * Contenu du cours « Réseau LAN Avancé B3 » (dossier `b3-reseau-lan/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-reseau-lan/.
 */
'use strict';

const chapitres = [
  ...require('./b3-reseau-lan/chapitres-1-3'),
  ...require('./b3-reseau-lan/chapitres-4-6')
];

const pages = require('./b3-reseau-lan/pages');

const course = {
  id: 'b3-reseau-lan',
  slug: 'b3-reseau-lan',
  brand: 'Réseau LAN Avancé B3',
  brandIcon: 'network',

  // Indigo sobre conforme WCAG AA/AAA (7.52:1 / 12.83:1 sur blanc)
  accent: '#4338ca',
  accentDeep: '#312e81',
  accentSoft: '#eef2ff',
  accentBorder: '#c7d2fe',

  storeKey: 'b3reseaulan:progress',

  title: 'Réseau LAN Avancé B3 — Commutation de Campus, STP/RSTP/MSTP, EtherChannel LACP, Redondance FHRP, OSPFv2, Sécurité de Couche 2 &amp; QoS',
  description:
    'Formation d’excellence en ingénierie de commutation d’entreprise, routage de campus et résilience de niveau 2/3 pour le Bachelor 3 : ' +
    'topologies sans boucle et protocoles de l’arbre couvrant (élection déterministe du Root Bridge, sélection du Root Port et Designated Port, poignée de main active Proposal / Agreement sous RSTP 802.1w, instances régionales MSTP 802.1s et durcissement via BPDU Guard, Root Guard et Loop Guard), ' +
    'agrégation de liaisons EtherChannel et bundles logiques Port-Channel (négociation standardisée LACP IEEE 802.3ad/802.1AX vs Cisco PAgP, contraintes strictes de cohérence de configuration des membres et fonctions de hachage mathématiques de flux), ' +
    'protocoles de redondance de premier saut FHRP éliminant le SPOF de passerelle par défaut (comparatif approfondi Cisco HSRP v1/v2 vs standard ouvert VRRP v2/v3 RFC 5798, préemption, suivi d’objets Object Tracking IP SLA et équilibrage multi-actif GLBP), ' +
    'routage intra-domaine à état de liens OSPFv2 RFC 2328 (calcul du plus court chemin par l’algorithme SPF de Dijkstra, bande passante de référence auto-cost, cycle d’adjacence et rôles DR/BDR, typologie complète des paquets LSA 1 à 7 et optimisation par aires spéciales Stub, Totally Stubby et NSSA), ' +
    'sécurité de la couche d’accès et durcissement des commutateurs (mitigation du MAC Flooding via Port Security en modes protect/restrict/shutdown avec apprentissage Sticky MAC, neutralisation des serveurs DHCP pirates par DHCP Snooping et protection anti-spoofing par Dynamic ARP Inspection DAI et IP Source Guard), ' +
    'et qualité de service LAN et protocoles de découverte (gestion des métriques de délai/gigue/perte, marquage 802.1p CoS vers DiffServ DSCP, frontière de confiance Trust Boundary, ordonnanceurs Strict Priority vs Weighted Round Robin WRR, prévention de congestion WRED et découverte de voisins via IEEE 802.1AB LLDP et Cisco CDP).',
  lead:
    'Maîtrisez la commutation avancée de campus, les topologies sans boucle STP/RSTP/MSTP durcies, l’agrégation LACP, la redondance de passerelle FHRP, le routage OSPFv2, la sécurité d’accès et la QoS LAN. ' +
    'Six modules approfondis combinant rigueur d’ingénierie réseaux et télécoms, 18 ateliers de code interactifs de manière méthodique et 48 QCM d’évaluation.',

  sources: 'Standards IEEE 802.1D, 802.1w, 802.1s, 802.3ad, 802.1AX, 802.1AB, RFC 2328 (OSPFv2), RFC 5798 (VRRPv3) et Guides de conception Cisco Campus LAN & ANSSI',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
