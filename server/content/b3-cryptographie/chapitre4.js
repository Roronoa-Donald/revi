/**
 * Chapitre 4 du cours « Cryptographie & PKI B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Cryptographie Asymétrique & Arithmétique Modulaire',
  short: 'Asymétrique &amp; Arithmétique',
  toc: 'Arithmétique modulaire, division euclidienne et algorithme d\'Euclide étendu, théorème de Bézout et calcul de l\'inverse modulaire, indicatrice d\'Euler et exponentiation modulaire rapide, protocole d\'échange de clés de Diffie-Hellman (DH/ECDH) et attaque de l\'homme du milieu (MITM), cryptosystème asymétrique RSA (génération de clés, chiffrement, déchiffrement, bourrage OAEP), et principes de la cryptographie sur les courbes elliptiques (ECC).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Le problème fondamental de la cryptographie symétrique réside dans la distribution sécurisée de la clé secrète partagée : comment deux interlocuteurs n\'ayant jamais communiqué auparavant peuvent-ils convenir d\'un secret commun sans qu\'un espion sur la ligne ne puisse le deviner ? L\'invention de la cryptographie à clé publique par Diffie, Hellman, Merkle, Rivest, Shamir et Adleman a révolutionné la sécurité informatique en fondant la confidentialité sur des problèmes mathématiques difficiles (logarithme discret, factorisation d\'entiers). En tant qu\'ingénieur sécurité B3, vous devez maîtriser les fondements d\'arithmétique modulaire, comprendre le fonctionnement intime de Diffie-Hellman et de RSA, implémenter les algorithmes d\'Euclide étendu et d\'inversion, et identifier les conditions indispensables pour contrer les attaques Man-in-the-Middle.',
  objectives: [
    'maîtriser l\'arithmétique modulaire : congruences, algorithme d\'Euclide étendu, identité de Bézout et inverse modulaire ;',
    'appliquer les théorèmes arithmétiques fondamentaux : petit théorème de Fermat, indicatrice d\'Euler phi(n) et théorème d\'Euler ;',
    'analyser le protocole d\'échange de clés de Diffie-Hellman (DH) et démontrer sa vulnérabilité à l\'attaque de l\'homme du milieu (MITM) sans authentification ;',
    'comprendre le cryptosystème RSA de bout en bout : choix des nombres premiers, calcul des clés publique et privée, chiffrement et déchiffrement ;',
    'comparer les performances et les tailles de clés entre RSA (2048/4096 bits) et la cryptographie sur les courbes elliptiques ECC (256/384 bits) ;',
    'développer en Python 3 l\'algorithme d\'Euclide étendu, le calcul d\'inverses modulaires, des simulateurs Diffie-Hellman/MITM et un moteur RSA complet.'
  ],
  sections: [
    {
      title: 'Arithmétique Modulaire : Euclide Étendu, Bézout &amp; Inverse Modulaire',
      html: [
        '<p>La cryptographie asymétrique repose sur des opérations dans des anneaux finis $\\mathbb{Z}/n\\mathbb{Z}$. Deux entiers $a$ et $b$ sont dits congrus modulo $n$, noté $a \\equiv b \\pmod n$, si leur différence $(a - b)$ est un multiple entier de $n$.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Algorithme d\'Euclide Étendu &amp; Théorème de Bézout</h4>',
        '    <p>Pour deux entiers $a$ et $b$, le théorème de Bézout affirme qu\'il existe deux entiers relatifs $u$ et $v$ tels que :</p>',
        '    <pre><code>a * u + b * v = pgcd(a, b)</code></pre>',
        '    <p>L\'algorithme d\'Euclide étendu calcule simultanément le plus grand commun diviseur $\\text{pgcd}(a, b)$ et les coefficients de Bézout $(u, v)$ en temps logarithmique $O(\\log(\\min(a, b)))$.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Inverse Modulaire</h4>',
        '    <p>L\'inverse modulaire d\'un entier $a$ modulo $m$ est l\'entier $x$ tel que :</p>',
        '    <pre><code>(a * x) mod m = 1   (noté x = a^(-1) mod m)</code></pre>',
        '    <p><strong>Condition nécessaire et suffisante :</strong> l\'inverse existe si et seulement si $a$ et $m$ sont premiers entre eux, c\'est-à-dire $\\text{pgcd}(a, m) = 1$.</p>',
        '    <p>Selon Bézout : $a \\cdot u + m \\cdot v = 1 \\implies a \\cdot u \\equiv 1 \\pmod m$, donc $x = u \\bmod m$.</p>',
        '  </div>',
        '</div>',
        box('standard', 'Exponentiation Modulaire Rapide (Square-and-Multiply)', [
          '<p>Calculer $a^b \\pmod m$ pour des entiers de plusieurs milliers de bits ne peut pas se faire en calculant d\'abord $a^b$ (qui contiendrait des millions de chiffres). L\'algorithme d\'<strong>exponentiation modulaire rapide</strong> effectue des carrés successifs combinés à des réductions modulaires à chaque étape, ramenant la complexité de $O(b)$ à $O(\\log_2 b)$ multiplications modulaires.</p>',
          '<pre><code>def mod_exp(base, exp, mod):\n    res = 1\n    base = base % mod\n    while exp > 0:\n        if exp % 2 == 1:\n            res = (res * base) % mod\n        base = (base * base) % mod\n        exp //= 2\n    return res</code></pre>'
        ])
      ].join('\n')
    },
    {
      title: 'Échange de Clés de Diffie-Hellman (DH) &amp; Attaque de l\'Homme du Milieu',
      html: [
        '<p>Proposé en 1976 par Whitfield Diffie et Martin Hellman, ce protocole permet à deux entités (Alice et Bob) de convenir d\'un secret partagé sans transmettre ce secret sur le réseau :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Protocole d\'Échange Diffie-Hellman</h4>',
        '    <ul>',
        '      <li><strong>Paramètres publics :</strong> un grand nombre premier $p$ et un générateur $g$ du groupe multiplicatif $\\mathbb{Z}/p\\mathbb{Z}^*$.</li>',
        '      <li>Alice choisit un secret privé $a$, calcule sa clé publique $A = g^a \\pmod p$, et l\'envoie à Bob.</li>',
        '      <li>Bob choisit un secret privé $b$, calcule sa clé publique $B = g^b \\pmod p$, et l\'envoie à Alice.</li>',
        '      <li><strong>Calcul du secret commun :</strong>',
        '        <ul>',
        '          <li>Alice calcule : $S = B^a \\pmod p = (g^b)^a \\pmod p = g^{ab} \\pmod p$.</li>',
        '          <li>Bob calcule : $S = A^b \\pmod p = (g^a)^b \\pmod p = g^{ab} \\pmod p$.</li>',
        '        </ul>',
        '      </li>',
        '      <li>La sécurité repose sur la difficulté du <em>problème du logarithme discret (DLP)</em> : retrouver $a$ connaissant $g, p$ et $g^a \\pmod p$.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Vulnérabilité Majeure : L\'Attaque MITM</h4>',
        '    <p>Le protocole Diffie-Hellman original ne comporte <strong>aucun mécanisme d\'authentification</strong> des clés publiques échangées.</p>',
        '    <ul>',
        '      <li>Un attaquant actif (Mallory) placé entre Alice et Bob intercepte $A$ et $B$.</li>',
        '      <li>Mallory génère ses propres secrets $m_a$ et $m_b$, et envoie $M_A = g^{m_a} \\pmod p$ à Alice et $M_B = g^{m_b} \\pmod p$ à Bob.</li>',
        '      <li>Alice négocie un secret avec Mallory ($S_{AM} = g^{a \\cdot m_a}$), Bob négocie un secret avec Mallory ($S_{BM} = g^{b \\cdot m_b}$).</li>',
        '      <li>Mallory déchiffre, lit, modifie et rechiffre l\'intégralité du trafic en temps réel de manière totalement transparente !</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('warning', 'La Nécessité des Certificats et des Signatures', [
          '<p>Pour empêcher définitivement l\'attaque de l\'homme du milieu sur Diffie-Hellman, les clés publiques échangées doivent impérativement être <strong>signées numériquement</strong> par une autorité de certification de confiance ou liées à un certificat X.509 (mécanisme mis en œuvre dans TLS avec ECDHE et validation de certificat).</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Le Cryptosystème RSA (Rivest-Shamir-Adleman)',
      html: [
        '<p>Conçu en 1977 au MIT, RSA est le cryptosystème asymétrique le plus déployé au monde pour le chiffrement et la signature numérique. Sa sécurité repose sur la difficulté de la factorisation d\'un grand entier semi-premier :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Génération des Clés RSA</h4>',
        '    <ol>',
        '      <li>Choisir deux très grands nombres premiers distincts $p$ et $q$.</li>',
        '      <li>Calculer le module RSA : $n = p \\cdot q$.</li>',
        '      <li>Calculer l\'indicatrice d\'Euler : $\\varphi(n) = (p - 1)(q - 1)$.</li>',
        '      <li>Choisir un exposant public $e$ premier avec $\\varphi(n)$ (généralement $e = 65537 = 2^{16} + 1$).</li>',
        '      <li>Calculer l\'exposant privé $d$ comme l\'inverse modulaire de $e$ modulo $\\varphi(n)$ : $d = e^{-1} \\pmod{\\varphi(n)}$, soit $e \\cdot d \\equiv 1 \\pmod{\\varphi(n)}$.</li>',
        '      <li><strong>Clé publique :</strong> $(e, n)$ | <strong>Clé privée :</strong> $(d, n)$ (les facteurs $p, q, \\varphi(n)$ doivent être détruits en mémoire).</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Chiffrement et Déchiffrement</h4>',
        '    <p>Soit un message clair représenté par un entier $M$ tel que $0 \\le M < n$ :</p>',
        '    <ul>',
        '      <li><strong>Chiffrement (avec la clé publique de Bob) :</strong><br><code>C = (M^e) mod n</code></li>',
        '      <li><strong>Déchiffrement (avec la clé privée de Bob) :</strong><br><code>M = (C^d) mod n</code></li>',
        '    </ul>',
        '    <p><strong>Justification mathématique :</strong> par le théorème d\'Euler, comme $e \\cdot d = 1 + k \\cdot \\varphi(n)$, on a :<br>$C^d = (M^e)^d = M^{ed} = M^{1 + k \\cdot \\varphi(n)} \\equiv M \\pmod n$.</p>',
        '  </div>',
        '</div>',
        box('tip', 'Vulnérabilités de « Textbook RSA » et Bourrage OAEP', [
          '<p>Le RSA élémentaire (sans bourrage, dit <em>Textbook RSA</em>) est déterministe et malléable : chiffrer deux fois le même message produit le même chiffré, et $C_1 \\cdot C_2 \\equiv (M_1 \\cdot M_2)^e \\pmod n$. En production, RSA doit impérativement être combiné à un schéma de bourrage probabiliste standardisé : <strong>RSA-OAEP (Optimal Asymmetric Encryption Padding)</strong> défini dans la RFC 8017 (PKCS#1 v2.2).</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Cryptographie sur les Courbes Elliptiques (ECC)',
      html: [
        '<p>La cryptographie sur les courbes elliptiques (ECC - <em>Elliptic Curve Cryptography</em>) offre une alternative moderne à RSA en fondant sa sécurité sur le problème du logarithme discret sur des groupes de points de courbes algébriques (ECDLP) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Équation de Weierstrass et Addition de Points</h4>',
        '    <p>Sur un corps fini $\\mathbb{F}_p$, une courbe elliptique vérifie :</p>',
        '    <pre><code>y^2 = x^3 + a*x + b   (mod p)   avec 4*a^3 + 27*b^2 != 0</code></pre>',
        '    <p>L\'ensemble des points de la courbe, muni d\'un point à l\'infini $\\mathcal{O}$, forme un groupe abélien. La multiplication scalaire $Q = d \\cdot P$ (additionner un point $P$ sur lui-même $d$ fois) est facile à calculer, mais retrouver le scalaire $d$ connaissant $P$ et $Q$ est d\'une complexité exponentielle.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Comparaison des Tailles de Clés RSA vs ECC</h4>',
        '    <p>ECC offre le même niveau de sécurité que RSA avec des clés infiniment plus compactes, réduisant drastiquement la consommation CPU et la bande passante réseau :</p>',
        '    <table class="table-sm">',
        '      <thead><tr><th>Sécurité équivalente</th><th>Taille clé RSA</th><th>Taille clé ECC</th></tr></thead>',
        '      <tbody>',
        '        <tr><td>80 bits (obsolète)</td><td>1024 bits</td><td>160 bits</td></tr>',
        '        <tr><td>112 bits</td><td>2048 bits</td><td>224 bits</td></tr>',
        '        <tr><td><strong>128 bits (standard)</strong></td><td><strong>3072 bits</strong></td><td><strong>256 bits (P-256 / Ed25519)</strong></td></tr>',
        '        <tr><td>256 bits (haute sécurité)</td><td>15360 bits</td><td>512 bits (P-521)</td></tr>',
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Évaluation des exigences cryptographiques : identifier si le besoin implique un échange de clés éphémère (Diffie-Hellman / ECDHE) ou un chiffrement de secret asymétrique (RSA-OAEP).',
    'Application de l\'algorithme d\'Euclide étendu : exécuter la division euclidienne récursive ou itérative pour obtenir le pgcd et les coefficients de Bézout $(u, v)$ et vérifier l\'inversibilité modulo $m$.',
    'Conception et dimensionnement des paramètres RSA : sélectionner des nombres premiers $p$ et $q$ de taille conforme (au minimum 2048 bits, idéalement 3072 ou 4096 bits), imposer l\'exposant de Fermat $e = 65537$ et calculer $d = e^{-1} \\pmod{\\varphi(n)}$.',
    'Neutralisation des attaques de l\'homme du milieu : combiner systématiquement l\'échange Diffie-Hellman avec une authentification d\'identité par signature numérique et certificat X.509.'
  ],
  summary: [
    'L\'algorithme d\'Euclide étendu calcule les coefficients de Bézout $a \\cdot u + b \\cdot v = \\text{pgcd}(a, b)$ et permet de déterminer l\'inverse modulaire si $\\text{pgcd}(a, m) = 1$.',
    'L\'échange de clés Diffie-Hellman permet à deux pairs de construire un secret commun sur un canal public grâce à la difficulté du logarithme discret.',
    'Diffie-Hellman pur est vulnérable à l\'attaque de l\'homme du milieu (MITM) et nécessite impérativement une authentification des clés par signature ou certificat.',
    'RSA repose sur la difficulté de la factorisation d\'un grand entier $n = p \\cdot q$ ; son chiffrement s\'écrit $C = M^e \\bmod n$ et son déchiffrement $M = C^d \\bmod n$.',
    'La cryptographie sur courbes elliptiques (ECC) atteint un niveau de sécurité identique à RSA avec des clés beaucoup plus courtes (256 bits ECC équivalent à 3072 bits RSA).'
  ],
  checklist: [
    'Savez-vous dérouler l\'algorithme d\'Euclide étendu pour trouver l\'inverse modulaire d\'un entier ?',
    'Comprenez-vous pourquoi l\'inverse modulaire n\'existe pas lorsque pgcd(a, m) != 1 ?',
    'Pouvez-vous expliquer le déroulement de Diffie-Hellman et décrire précisément l\'interception menée lors d\'une attaque MITM ?',
    'Savez-vous calculer les clés publiques et privées RSA à partir de deux nombres premiers p et q ?',
    'Savez-vous comparer les tailles de clés et les performances entre RSA-2048 et la courbe elliptique P-256 / Curve25519 ?'
  ],
  notions: [
    { term: 'Algorithme d\'Euclide Étendu', def: 'Algorithme arithmétique déterminant le plus grand commun diviseur de deux entiers et les coefficients de l\'identité de Bézout au + bv = pgcd(a, b).' },
    { term: 'Inverse Modulaire', def: 'Entier x tel que (a * x) mod m = 1, existant si et seulement si pgcd(a, m) = 1.' },
    { term: 'Problème du Logarithme Discret (DLP)', def: 'Difficulté calculatoire consistant à retrouver x connaissant g, p et g^x mod p dans un groupe fini cyclique.' },
    { term: 'Cryptosystème RSA', def: 'Algorithme asymétrique basé sur la difficulté de factoriser n = p * q, utilisant une paire de clés publique (e, n) et privée (d, n).' },
    { term: 'Cryptographie sur Courbes Elliptiques (ECC)', def: 'Cryptographie à clé publique exploitant la loi de groupe des points d\'une courbe elliptique sur corps fini, offrant des clés très courtes.' }
  ],
  pitfalls: [
    'Tenter d\'inverser un entier a modulo m sans vérifier que pgcd(a, m) == 1, provoquant une division par zéro ou un comportement imprévisible.',
    'Déployer un échange de clés Diffie-Hellman sans certificat ni signature, permettant à un pirate de réaliser une attaque Man-in-the-Middle complète.',
    'Utiliser le chiffrement RSA élémentaire (« Textbook RSA ») sans schéma de bourrage aléatoire OAEP en production, exposant le clair à des attaques algébriques.',
    'Choisir des nombres premiers p et q trop proches dans RSA : la méthode de factorisation de Fermat permet alors de casser la clé en quelques secondes.'
  ],
  questions: [
    {
      stem: 'Sous quelle condition mathématique l\'inverse modulaire d\'un entier \'a\' modulo \'m\' existe-t-il ?',
      opts: ['a doit être strictement supérieur à m', 'a et m doivent être tous les deux pairs', 'pgcd(a, m) doit être égal à 1 (a et m premiers entre eux)', 'm doit être un nombre premier'],
      correct: 2,
      exp: 'D\'après le théorème de Bézout, a admet un inverse modulaire modulo m si et seulement si pgcd(a, m) = 1, ce qui assure l\'existence de coefficients vérifiant a*u + m*v = 1.'
    },
    {
      stem: 'Quel problème mathématique assure la sécurité du protocole d\'échange de clés de Diffie-Hellman ?',
      opts: ['La factorisation de grands entiers', 'Le problème du sac à dos', 'Le problème du logarithme discret (DLP)', 'La recherche de collision MD5'],
      correct: 2,
      exp: 'Diffie-Hellman repose sur la difficulté calculatoire du problème du logarithme discret : étant donnés g, p et g^x mod p, il est extrêmement difficile de retrouver x.'
    },
    {
      stem: 'Dans l\'algorithme RSA, comment calcule-t-on l\'exposant privé \'d\' connaissant \'e\', \'p\' et \'q\' ?',
      opts: ['d = (p * q) mod e', 'd est l\'inverse modulaire de e modulo phi(n) = (p - 1)(q - 1)', 'd = e^(p - 1) mod q', 'd = pgcd(e, p - 1)'],
      correct: 1,
      exp: 'Par définition de RSA, d est l\'inverse de l\'exposant public e modulo l\'indicatrice d\'Euler phi(n) = (p - 1)(q - 1), vérifiant e * d = 1 mod phi(n).'
    },
    {
      stem: 'Quelle taille de clé pour une courbe elliptique (ECC) offre un niveau de sécurité équivalent à une clé RSA de 3072 bits ?',
      opts: ['128 bits', '256 bits (ex: secp256k1 ou Curve25519)', '1024 bits', '2048 bits'],
      correct: 1,
      exp: 'Une clé ECC de 256 bits procure un niveau de sécurité d\'environ 128 bits symétriques, équivalent à une clé RSA de 3072 bits.'
    },
    {
      stem: 'Pourquoi l\'utilisation de Textbook RSA (RSA sans bourrage) est-elle proscrite en production ?',
      opts: ['Elle ne fonctionne pas avec Python', 'Elle est déterministe et malléable, nécessitant un padding probabiliste comme OAEP', 'Elle ne permet pas de chiffrer des entiers supérieurs à 10', 'Elle ralentit les cartes réseau'],
      correct: 1,
      exp: 'Textbook RSA est strictement déterministe (un même clair donne toujours le même chiffré) et homomorphe multiplicatif, ce qui permet à un attaquant de manipuler le message sans le déchiffrer. Le standard RSA-OAEP élimine ces failles.'
    }
  ],
  flashcards: [
    {
      q: 'Qu\'énonce le théorème de Bézout pour deux entiers a et b ?',
      a: 'Il existe deux entiers relatifs u et v tels que a*u + b*v = pgcd(a, b).'
    },
    {
      q: 'Comment s\'exprime l\'indicatrice d\'Euler phi(n) pour n = p * q avec p et q premiers ?',
      a: 'phi(n) = (p - 1) * (q - 1).'
    },
    {
      q: 'Quel est l\'exposant public \'e\' le plus couramment utilisé dans les implémentations RSA industrielles et pourquoi ?',
      a: 'e = 65537 (2^16 + 1). C\'est un nombre premier de Fermat avec seulement deux bits à 1, optimisant l\'exponentiation rapide tout en évitant les attaques sur les petits exposants.'
    },
    {
      q: 'Comment fonctionne l\'attaque Man-in-the-Middle sur le protocole Diffie-Hellman non authentifié ?',
      a: 'L\'attaquant intercepte les clés publiques des deux pairs et leur substitue les siennes, négociant deux secrets distincts avec chacun sans qu\'ils ne s\'en aperçoivent.'
    },
    {
      q: 'Qu\'est-ce que le problème du logarithme discret (DLP) ?',
      a: 'La difficulté de retrouver le secret x à partir de y = g^x mod p dans un corps fini.'
    },
    {
      q: 'Pourquoi les courbes elliptiques (ECC) sont-elles préférées à RSA sur les appareils mobiles et embarqués ?',
      a: 'Elles offrent une sécurité équivalente avec des clés 10 fois plus courtes (256 bits vs 3072 bits), consommant beaucoup moins d\'énergie et de mémoire.'
    }
  ],
  mastery: [
    {
      title: 'Implémentation de primitives modulaires avancées',
      desc: 'Coder des fonctions robustes d\'Euclide étendu, de calcul d\'inverse et d\'exponentiation rapide en Python 3.'
    },
    {
      title: 'Simulation et sécurisation d\'échanges Diffie-Hellman',
      desc: 'Maîtriser les scénarios de négociation de clés éphémères et mettre en œuvre les signatures numériques anti-MITM.'
    },
    {
      title: 'Conception d\'un moteur de chiffrement RSA conforme',
      desc: 'Programmer la chaîne complète de génération de bi-clé, de chiffrement et de déchiffrement asymétrique.'
    },
    {
      title: 'Sélection et dimensionnement des paramètres asymétriques',
      desc: 'Choisir judicieusement entre RSA et courbes elliptiques (ECC) selon les contraintes de performance et de sécurité.'
    },
    {
      title: 'Analyse des vulnérabilités de Textbook RSA',
      desc: 'Identifier les risques de malléabilité et intégrer les schémas de bourrage probabiliste OAEP (PKCS#1 v2.2).'
    }
  ]
};
