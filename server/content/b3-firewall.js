/**
 * Contenu du cours « Firewall & Sécurité Réseau B3 » (dossier `b3-firewall/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-firewall/.
 */
'use strict';

const chapitres = [
  ...require('./b3-firewall/chapitres-1-3'),
  ...require('./b3-firewall/chapitres-4-6')
];

const pages = require('./b3-firewall/pages');

const course = {
  id: 'b3-firewall',
  slug: 'b3-firewall',
  brand: 'Firewall & Sécurité Réseau B3',
  brandIcon: 'shield',

  // Crimson / Rouge sécurité sobre conforme WCAG AA/AAA (5.92:1 / 9.95:1 sur blanc)
  accent: '#b91c1c',
  accentDeep: '#7f1d1d',
  accentSoft: '#fef2f2',
  accentBorder: '#fecaca',

  storeKey: 'b3firewall:progress',

  title: 'Firewall &amp; Sécurité Réseau B3 — Filtrage, Conntrack, DMZ, L7/NGFW &amp; Netfilter',
  description:
    'Formation d’excellence en sécurité périmétrique et technologies de pare-feux pour le Bachelor 3 : ' +
    'fondements de la sécurité réseau et filtrage stateless (zones de confiance, en-têtes L3/L4 IPv4/TCP/UDP, politique Default DROP et vulnérabilités aux paquets ACK forgés), ' +
    'inspection dynamique avec suivi d’état (Stateful Packet Inspection selon la RFC 793, table conntrack netfilter, états NEW/ESTABLISHED/RELATED/INVALID, purge des timeouts et détection des scans furtifs Xmas et Null), ' +
    'politiques de sécurité et ordonnancement d’ACLs (principe First-Match-Wins, détection formelle du Rule Shadowing et des redondances, translation d’adresses SNAT Masquerade, DNAT Port Forwarding et PAT), ' +
    'architectures réseau étanches et zones démilitarisées (règle cardinale DMZ interdisant formellement l’initiation vers le LAN, topologies Dual-Homed, Triple-Homed et Back-to-Back hétérogène, passerelles d’administration par bastion SSH et Jump Hosts MFA), ' +
    'filtrage applicatif L7 et pare-feux nouvelle génération (obsolescence du filtrage de port face au HTTPS, identification applicative App-ID et User-ID, inspection du Server Name Indication SNI TLS, filtrage web catégoriel, protection anti-DoS par Rate Limiting en fenêtre glissante et Deep Packet Inspection DPI neutralisant les injections SQL et failles XSS), ' +
    'et mise en œuvre opérationnelle sous Linux Netfilter (hooks noyau, tables et chaînes, syntaxe comparée iptables vs nftables moderne, analyse statistique des logs Syslog et réponse active automatisée par bannissement dynamique Fail2ban/SIEM).',
  lead:
    'Maîtrisez la défense périmétrique complète, le suivi de sessions conntrack, l’ingénierie DMZ, le filtrage applicatif L7 et le déploiement Linux Netfilter de niveau Bachelor 3. ' +
    'Six modules approfondis combinant formalisme théorique, 18 ateliers de programmation interactive en Python 3 et 48 QCM d’évaluation.',

  sources: 'Supports de cours Module 1 & Module 3 (Enseignant : AGOUTOCO-POKO Caleb Benaja, L3-ASI, 2025/2026), RFC 793 (Transmission Control Protocol), RFC 1918 et documentation officielle Linux Netfilter',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
