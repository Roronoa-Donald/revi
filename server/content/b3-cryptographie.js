/**
 * Contenu du cours « Cryptographie & PKI B3 » (dossier `b3-cryptographie/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-cryptographie/.
 */
'use strict';

const chapitres = [
  ...require('./b3-cryptographie/chapitres-1-3'),
  ...require('./b3-cryptographie/chapitres-4-6')
];

const pages = require('./b3-cryptographie/pages');

const course = {
  id: 'b3-cryptographie',
  slug: 'b3-cryptographie',
  brand: 'Cryptographie & PKI B3',
  brandIcon: 'lock',

  // Violet royal conforme WCAG AA/AAA (8.95:1 / 15.6:1 sur fond blanc)
  accent: '#5b21b6',
  accentDeep: '#3b0764',
  accentSoft: '#f5f3ff',
  accentBorder: '#ddd6fe',

  storeKey: 'b3crypto:progress',

  title: 'Cryptographie &amp; PKI B3 — Principes Fondamentaux, Chiffrements Symétriques, Fonctions de Hachage &amp; MAC, Arithmétique Modulaire &amp; RSA/ECC, Infrastructure à Clés Publiques X.509, Protocoles Sécurisés TLS 1.3 &amp; Transition Post-Quantique',
  description:
    'Formation d’excellence en cryptographie appliquée et architectures d’infrastructures de confiance pour le Bachelor 3 : ' +
    'fondements mathématiques de la sécurité (confidentialité, intégrité, authenticité, non-répudiation, principe de Kerckhoffs, cryptanalyse statistique, Indice de Coïncidence de Friedman et confidentialité parfaite de Shannon), ' +
    'cryptographie symétrique moderne (chiffrements de flux LFSR, schémas de Feistel DES/3DES, réseau SPN d\'AES Rijndael, modes opératoires ECB/CBC/CTR/GCM, bourrage PKCS#7 et attaques par oracle de padding), ' +
    'fonctions de hachage et intégrité de données (Merkle-Damgård, construction éponge de SHA-3 Keccak, obsolescence de MD5 et SHA-1, standard HMAC RFC 2104, attaques par extension de longueur et paradoxe des anniversaires), ' +
    'cryptographie asymétrique et arithmétique modulaire (division euclidienne, algorithme d\'Euclide étendu, théorème de Bézout, inverse modulaire, indicatrice d\'Euler, exponentiation modulaire rapide, échange de clés Diffie-Hellman et simulation MITM, moteur complet RSA et cryptographie sur courbes elliptiques ECC), ' +
    'signatures numériques et gestion d\'infrastructure PKI (RSA Sign & Verify, ECDSA, Ed25519, Root CA hors-ligne, autorités d\'enregistrement RA, norme de certificats X.509 v3 RFC 5280, extensions SAN, Basic Constraints, validation de chaîne de certification, listes de révocation CRL et protocole OCSP avec agrafage Stapling), ' +
    'et enfin protocoles sécurisés et transition post-quantique (TLS 1.3 RFC 8446 avec handshake 1-RTT/0-RTT, confidentialité persistante PFS, suites cryptographiques AEAD, durcissement SSHv2 et IPsec ESP/Tunnel, algorithmes quantiques de Shor et Grover, standards post-quantiques NIST FIPS 203 ML-KEM et FIPS 204 ML-DSA, et cryptographie hybride).',
  lead:
    'Maîtrisez la science de la cryptographie et le déploiement d’infrastructures de confiance PKI : Kerckhoffs, AES, HMAC, Euclide étendu, RSA, courbes elliptiques, certificats X.509, TLS 1.3 et standards post-quantiques NIST. ' +
    'Six modules approfondis, 18 exercices interactifs de code de manière méthodique et 48 QCM d’évaluation.',

  sources: 'Supports de cours officiels Cryptographie L3/B3 (Enseignant : M. Djiwa N’tèla OGA, PolyCrypto2010), Standards RFC 5280 (X.509), RFC 8446 (TLS 1.3), RFC 2104 (HMAC), RFC 8017 (PKCS#1 v2.2) et Référentiels NIST Post-Quantum Cryptography (FIPS 203, FIPS 204)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
