/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Cybersécurité » B2.
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active</h1>',
    '  <p class="lead">36 fiches synthétiques pour consolider les définitions clés, mécanismes d’attaque et contre-mesures de la cybersécurité B2.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento des formules' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Cybersécurité B2 : notions clés des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento &amp; Formules de Référence en Cybersécurité</h1>',
    '  <p class="lead">Synthèse des formules mathématiques, métriques de risque, normes internationales et règles de configuration matérielles et logicielles.</p>',
    '',
    '  <h2>1. Métriques de Risque &amp; Entropie</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Concept / Formule</th><th>Expression mathématique</th><th>Interprétation &amp; Application</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Score de risque brut (ISO 27005)</strong></td><td><code>Risque = Menace &times; Vulnerabilite &times; Impact</code></td><td>Mesure globale sur une échelle 1..125. Détermine le seuil d’acceptation ou de traitement.</td></tr>',
    '      <tr><td><strong>Entropie d’un mot de passe (Shannon)</strong></td><td><code>E = L &times; log2(N)</code></td><td>L = longueur, N = taille de l’alphabet (ex. 94 caractères ASCII imprimables). Recommandation &ge; 80 bits.</td></tr>',
    '      <tr><td><strong>Score de base CVSS v3.1</strong></td><td><code>Score = f(AV, AC, PR, UI, S, C, I, A)</code></td><td>Évaluation standardisée de sévérité des vulnérabilités de 0.0 (Info) à 10.0 (Critique).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Cryptographie Asymétrique &amp; Signatures (RSA &amp; Diffie-Hellman)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Mécanisme</th><th>Formule mathématique</th><th>Propriété garantie</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Chiffrement RSA</strong></td><td><code>c = m^e (mod n)</code></td><td>Confidentialité avec clé publique (e, n).</td></tr>',
    '      <tr><td><strong>Déchiffrement RSA</strong></td><td><code>m = c^d (mod n)</code></td><td>Confidentialité garantie par la clé privée d.</td></tr>',
    '      <tr><td><strong>Signature numérique RSA</strong></td><td><code>s = H(m)^d (mod n)</code></td><td>Authenticité et non-répudiation de l’émetteur.</td></tr>',
    '      <tr><td><strong>Vérification signature RSA</strong></td><td><code>H(m) == s^e (mod n)</code></td><td>Intégrité et vérification publique sans révéler d.</td></tr>',
    '      <tr><td><strong>Échange Diffie-Hellman</strong></td><td><code>K = B^a (mod p) == A^b (mod p) == g^(ab) (mod p)</code></td><td>Négociation d’un secret partagé sur canal non sécurisé.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Normes, RFC &amp; Standards Majeurs</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Standard / RFC</th><th>Titre officiel</th><th>Rôle fondamental</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>RFC 2104</strong></td><td>HMAC: Keyed-Hashing for Message Authentication</td><td>Empreinte authentifiée associant une clé secrète à un hachage (SHA-256).</td></tr>',
    '      <tr><td><strong>RFC 6238</strong></td><td>TOTP: Time-Based One-Time Password Algorithm</td><td>Double facteur d’authentification (MFA) avec code à 6 chiffres régénéré toutes les 30s.</td></tr>',
    '      <tr><td><strong>RFC 7519</strong></td><td>JSON Web Token (JWT)</td><td>Format compact et autonome de jetons signés numériquement pour les architectures REST.</td></tr>',
    '      <tr><td><strong>RFC 5280</strong></td><td>Internet X.509 Public Key Infrastructure Certificate</td><td>Standard des certificats numériques délivrés par les Autorités de Certification (CA).</td></tr>',
    '      <tr><td><strong>OWASP Top 10</strong></td><td>Top 10 Web Application Security Risks</td><td>Référentiel mondial des dix vulnérabilités applicatives les plus critiques (A01 à A10).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Réviser les flashcards' }, { href: 'examens.html', label: 'Passer aux examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento &amp; Formules — ' + course.brand,
      description: 'Formules et mémos de référence en cybersécurité B2 : RSA, Diffie-Hellman, SHA-256, RFC et scores CVSS.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
