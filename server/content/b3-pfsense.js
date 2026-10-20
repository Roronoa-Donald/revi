/**
 * Contenu du cours « pfSense & Routage B3 » (dossier `b3-pfsense/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-pfsense/.
 */
'use strict';

const chapitres = [
  ...require('./b3-pfsense/chapitres-1-3'),
  ...require('./b3-pfsense/chapitres-4-6')
];

const pages = require('./b3-pfsense/pages');

const course = {
  id: 'b3-pfsense',
  slug: 'b3-pfsense',
  brand: 'pfSense & Routage B3',
  brandIcon: 'shield',

  // Teal sobre conforme WCAG AA/AAA (5.61:1 / 10.36:1 sur blanc)
  accent: '#0f766e',
  accentDeep: '#134e4a',
  accentSoft: '#f0fdfa',
  accentBorder: '#ccfbf1',

  storeKey: 'b3pfsense:progress',

  title: 'pfSense &amp; Routage B3 — Pare-Feu Stateful pf, NAT, Multi-WAN, VLANs 802.1Q, VPNs &amp; Haute Disponibilité CARP',
  description:
    'Formation d’excellence en ingénierie de la sécurité périmétrique et du routage avancé pour le Bachelor 3 : ' +
    'architecture interne du pare-feu pfSense et cinématique du moteur FreeBSD Packet Filter pf (interfaces physiques WAN/LAN/Opt, adressage CIDR, passerelles par défaut, services DHCP et DNS Resolver Unbound avec DNSSEC), ' +
    'filtrage stateful et orchestration des règles (évaluation séquentielle First-Match Wins via mot-clé quick implicite, table d’états pfctl, gestion modulaire des Aliases Host/Network/Port, et limitation de bande passante Dummynet), ' +
    'translation d’adresses NAT et routage Multi-WAN (Port Forwarding DNAT avec règles associées, 1:1 NAT, Outbound NAT en mode automatique et hybride avec adresses IP virtuelles VIPs, et Gateway Groups pour Load Balancing et Failover automatique), ' +
    'segmentation réseau et isolation zéro confiance (trunk 802.1Q, sous-interfaces logiques FreeBSD, isolation inter-VLANs, sécurisation étanche d’une DMZ publique et remédiation aux vulnérabilités de VLAN Hopping / Double Tagging), ' +
    'tunnels VPN chiffrés d’entreprise (OpenVPN SSL/TLS avec infrastructure à clés publiques PKI X.509 et CRL, IPsec IKEv2 site-à-site avec conformité aux recommandations cryptographiques ANSSI/NIST, et politiques de Split Tunneling vs Full Tunneling), ' +
    'et haute disponibilité et détection d’intrusion (clustering actif/passif avec IP virtuelles CARP, calcul des intervalles advskew, réplication en temps réel de la table d’états via pfsync, synchronisation XMLRPC de configuration et blocage automatique Snort/Suricata via la table snort2c).',
  lead:
    'Maîtrisez le moteur de filtrage Packet Filter (pf), le routage Multi-WAN résilient, la segmentation par VLANs 802.1Q, les passerelles VPN d’entreprise et le clustering haute disponibilité CARP/pfsync. ' +
    'Six modules approfondis combinant rigueur d’ingénierie sécurité, 18 ateliers de code interactifs en Python 3 et 48 QCM d’évaluation.',

  sources: 'Documentation officielle Netgate pfSense, Architecture FreeBSD Packet Filter (pf), RFC 5798 (CARP/VRRP), RFC 7296 (IKEv2) et Guides de durcissement ANSSI',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
