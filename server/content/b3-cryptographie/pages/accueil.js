/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Cryptographie & PKI B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const cardsHtml = chapterList.map(chapitre => [
    '    <article class="card">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '        <span class="card__num">Module ' + chapitre.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '      <p class="card__desc">' + chapitre.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        <span class="card__link">Étudier le module ' + ic('arrow-right') + '</span>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    '  <header class="hero">',
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('lock') + ' Niveau B3 • Cryptographie Symétrique, Asymétrique, Hachage, PKI X.509, TLS &amp; Post-Quantique</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable OpenSSL &amp; Études de Cas</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules d\'ingénierie</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs d\'architecture</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>La Cryptographie et les Infrastructures PKI en Bachelor 3</h2>',
    box('standard', 'Des Fondements Mathématiques à l\'Ingénierie des Protocoles Sécurisés', [
      '<p>En troisième année de Bachelor en Ingénierie Réseaux et Systèmes d’Information, la cryptographie constitue la pierre angulaire de toute politique de cyberdéfense et de protection des données d\'entreprise. Elle garantit les quatre propriétés cardinales de la sécurité de l\'information : la confidentialité, l\'intégrité, l\'authenticité et la non-répudiation.</p>',
      '<p>Conçu selon le référentiel académique officiel de M. Djiwa N’tèla OGA et les normes internationales (NIST, RFC IETF, ANSSI), ce cours forme des experts capables de concevoir, déployer et auditer des systèmes cryptographiques d\'entreprise : ' +
      'des principes de sécurité fondamentaux (règle de Kerckhoffs, entropie de Shannon, confidentialité parfaite du masque jetable Vernam, chiffrements historiques par substitution et transposition, cryptanalyse fréquentielle et indice de coïncidence de Friedman), ' +
      'de la cryptographie symétrique moderne (chiffrement par flux à registre à décalage LFSR, architecture de Feistel et SPN d\'AES Rijndael, modes opératoires ECB, CBC, CFB, OFB, CTR et gestion stricte du bourrage PKCS#7), ' +
      'des fonctions de hachage et codes d\'authentification (comparatif de sécurité MD5, SHA-1 et SHA-256, paradoxe des anniversaires et calcul de probabilité de collision, construction HMAC RFC 2104 protégeant contre les attaques par extension de longueur), ' +
      'de la cryptographie asymétrique et arithmétique modulaire (algorithme d\'Euclide étendu, théorème de Bézout, inverse modulaire, échange de clés Diffie-Hellman et vecteur d\'attaque Man-in-the-Middle, cryptosystème RSA avec primalité et indicatrice d\'Euler, et introduction aux courbes elliptiques ECC), ' +
      'des signatures numériques et infrastructures à clés publiques (mécanisme de signature numérique, autorité de certification racine et intermédiaire PKI, anatomie des certificats X.509v3, extensions SAN avec wildcards, validation de chaîne de certification et mécanismes de révocation CRL et OCSP), ' +
      'et enfin des protocoles sécurisés de niveau réseau et application (évolution de TLS 1.2 vers TLS 1.3 avec poignée de mains 1-RTT et 0-RTT, garantie de confidentialité persistante PFS via ECDHE, protocoles SSH et IPsec, et feuille de route vers la cryptographie post-quantique PQC avec les standards FIPS 203/204 ML-KEM et ML-DSA face à la menace des algorithmes de Shor et Grover).</p>'
    ]),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Accueil — ' + course.brand,
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const itemsHtml = chapterList.map(chapitre => [
    '    <li class="summary-item">',
    '      <div class="summary-item__num">' + chapitre.n + '</div>',
    '      <div class="summary-item__content">',
    '        <h3 class="summary-item__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p class="summary-item__desc">' + chapitre.toc + '</p>',
    '        <div class="summary-item__meta">' +
             '<span>' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>' +
             '<span>' + ic('code') + ' 3 exercices de code lab</span>' +
             '<span>' + ic('check') + ' QCM &amp; Cartes mémo</span>' +
             '</div>',
    '      </div>',
    '    </li>'
  ].join('\n')).join('\n');

  const body = [
    '  <h1>Sommaire Général — ' + course.brand + '</h1>',
    '  <p class="lead">Programme complet en 6 modules : des chiffrements historiques et arithmétique modulaire aux architectures PKI X.509, protocoles TLS 1.3 et résistance post-quantique.</p>',
    '',
    '  <ol class="summary-list">' + itemsHtml + '</ol>',
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan d\'études complet des 6 modules de Cryptographie & PKI en Bachelor 3.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier Bac à Sable ======================== */

function atelier(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Sommaire', href: 'sommaire.html' },
    { label: 'Bac à sable Cryptographie' }
  ]);

  const body = [
    crumbs,
    '  <h1>Laboratoire Interactif &amp; Bac à Sable Cryptographie &amp; PKI selon les grilles d’analyse</h1>',
    '  <p class="lead">Expérimentez et validez vos algorithmes cryptographiques selon les grilles d’analyse : substitution et décalage, chiffrement par flux LFSR, validation de padding PKCS#7, calculs d\'empreintes SHA-256 et vérification de chaînes PKI X.509.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="analyse"',
    '       data-height="420"',
    '       data-stdin="openssl dgst -sha256 message.txt\nopenssl rsa -in key.pem -pubout\nopenssl x509 -in cert.crt -text">',
    '    <script type="text/plain" data-lab-starter># Zone libre : rédigez vos grilles d\'analyse et cas d\'application.\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Moteur de Chiffrement de Bloc CBC &amp; Bit Flipping</h4>',
    '      <p>Testez l\'effet d\'une modification d\'un octet dans le ciphertext sur le bloc courant et le bloc suivant lors du déchiffrement CBC.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Analyseur d\'Indice de Coïncidence de Friedman</h4>',
    '      <p>Passez des textes chiffrés par César ou Vigenère au crible de l\'indice de coïncidence pour estimer la longueur de la clé secrète.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Bac à sable Cryptographie & PKI — ' + course.brand,
      description: 'Bac à sable interactif par cas d’application pour tester vos implémentations de cryptographie symétrique, asymétrique et PKI.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
