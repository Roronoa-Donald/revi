/**
 * Contenu du cours « Cybersécurité » B2 (dossier `Cyber securite B2/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier Cyber securite B2/.
 */
'use strict';

const chapitres = [
  ...require('./cyber-securite-b2/chapitres-1-3'),
  ...require('./cyber-securite-b2/chapitres-4-6')
];

const pages = require('./cyber-securite-b2/pages');

const course = {
  id: 'Cyber securite B2',
  slug: 'Cyber securite B2',
  brand: 'Cybersécurité B2',
  brandIcon: 'shield',

  // Cyan 700 / Cyan 800 accessible conforme WCAG AA (5.36:1 / 7.27:1 sur blanc)
  accent: '#0e7490',
  accentDeep: '#155e75',
  accentSoft: '#ecfeff',
  accentBorder: '#a5f3fc',

  storeKey: 'b2cs:progress',

  title: 'Cybersécurité B2 — Défense en Profondeur, Cryptographie &amp; Réponse aux Incidents',
  description:
    'Cours complet de Cybersécurité niveau B2 : ' +
    'fondements de la sécurité des SI (triade CIA, analyse de risques ISO 27005, hygiène numérique et règles ANSSI), ' +
    'cryptographie appliquée (hachage SHA-256, chiffrement symétrique AES-GCM, asymétrique RSA, certificats X.509 et TLS 1.3), ' +
    'sécurité des réseaux et architectures défensives (segmentation DMZ, filtrage pare-feu stateless/stateful, audit Nmap et attaques ARP spoofing), ' +
    'sécurité applicative et Top 10 OWASP (injections SQL, failles XSS, CSRF, contrôles d’accès défaillants IDOR), ' +
    'authentification, gestion des identités et contrôle d’accès (salage d’empreintes Argon2id, MFA/TOTP, jetons JWT et modèles RBAC/ABAC) et ' +
    'surveillance opérationnelle (sondes NIDS Snort, corrélation SIEM, atténuation DDoS, ransomwares et réponse à incident NIST SP 800-61).',
  lead:
    'Passez de la théorie à la défense opérationnelle. ' +
    'Six chapitres d’ingénierie défensive pour sécuriser vos réseaux, durcir vos applications web ' +
    'et réagir avec méthode face aux attaques et incidents majeurs.',

  sources: 'le cours de Cybersécurité B2, les guides de l’ANSSI, les référentiels du NIST (SP 800-61), de l’OWASP et les documentations Snort et Nmap',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
