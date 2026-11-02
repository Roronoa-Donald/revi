/**
 * Chapitre 2 du cours « Cybersécurité » B2 — Cryptographie Appliquée, Hachage & Signatures Numériques.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Cryptographie Appliquée, Hachage &amp; Signatures Numériques',
  short: 'Cryptographie &amp; Signatures',
  toc: 'Chiffrement symétrique (AES, CBC/GCM, masque jetable Vernam), chiffrement asymétrique (RSA, Diffie-Hellman), hachage cryptographique (SHA-256, HMAC), signatures numériques et certificats X.509.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Deux serveurs distants doivent échanger des transactions financières hautement confidentielles à travers l’Internet public. ' +
    'Si un attaquant écoute la ligne, il ne doit rien pouvoir déchiffrer ; s’il modifie un seul octet du flux, ' +
    'le récepteur doit immédiatement rejeter le paquet ; et si l’émetteur nie avoir envoyé l’ordre de virement, ' +
    'une preuve mathématique irréfutable doit le confondre. ' +
    'Comment combiner chiffrement symétrique rapide, échange asymétrique de clés et signatures numériques ' +
    'pour garantir simultanément confidentialité, intégrité et non-répudiation ? ' +
    'Ce module dévoile les mécanismes de la cryptographie moderne.',

  objectives: [
    'comprendre les fondements du chiffrement symétrique et le fonctionnement du masque jetable (One-Time Pad de Vernam) ;',
    'comparer les modes opératoires de chiffrement par blocs (l’écueil d’ECB face à CBC et GCM authentifié) ;',
    'maîtriser le principe asymétrique RSA et l’échange de clés sécurisé de Diffie-Hellman ;',
    'exploiter les propriétés fondamentales des fonctions de hachage (effet avalanche, résistance aux collisions) et les codes HMAC ;',
    'analyser le cycle complet d’une signature numérique et la chaîne de confiance des certificats X.509.'
  ],

  sections: [
    {
      title: 'Chiffrement symétrique : Masque jetable de Vernam &amp; Standard AES',
      html: [
        '<p>Dans le chiffrement symétrique (à clé secrète partagée), la même clé sert à chiffrer et à déchiffrer. ' +
        'Le modèle théorique absolu est le masque jetable de Vernam, basé sur l’opération logique XOR (ou exclusif) :</p>',

        '<pre><code>// Propriétés mathématiques du XOR :\n' +
        'A ^ B = C     (chiffrement du bit A avec la clé B)\n' +
        'C ^ B = A     (déchiffrement immédiat du cryptogramme C avec la même clé B)\n' +
        'A ^ A = 0     et     A ^ 0 = A</code></pre>',

        '<p>Le théorème de Shannon prouve que si la clé est parfaitement aléatoire, aussi longue que le texte et utilisée une seule fois, ' +
        'le cryptogramme ne contient aucune information sur le clair (sécurité inconditionnelle). ' +
        'En pratique, l’industrie utilise l’<strong>AES</strong> (Advanced Encryption Standard, algorithme Rijndael), ' +
        'un chiffrement par blocs de 128 bits avec des clés de 128, 192 ou 256 bits.</p>',

        box('warning', 'L’écueil fatal du mode ECB (Electronic Codebook)', [
          '<p>En mode <strong>ECB</strong>, chaque bloc de 16 octets est chiffré indépendamment avec la même clé. ' +
          'Deux blocs de clair identiques produisent exactement le même bloc chiffré ! ' +
          'Sur une image ou une base de données, la structure des données reste entièrement visible (le célèbre manchot Tux d’ECB). ' +
          'Il faut impérativement bannir ECB au profit de modes chaînés avec vecteur d’initialisation aléatoire (<strong>CBC</strong>) ' +
          'ou de modes avec authentification intégrée (<strong>GCM</strong> : Galois/Counter Mode).</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Chiffrement asymétrique : Paires de clés RSA &amp; Diffie-Hellman',
      html: [
        '<p>Pour résoudre le casse-tête de la distribution préalable des clés secrètes, la cryptographie asymétrique ' +
        'introduit une paire de clés complémentaires pour chaque participant :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Algorithme RSA (Rivest, Shamir, Adleman)</h4>',
        '    <p>Repose sur la difficulté calculatoire de factoriser le produit <i>n = p &times; q</i> de deux très grands nombres premiers :</p>',
        '    <ul>',
        '      <li>Clé publique : couple <code>(e, n)</code></li>',
        '      <li>Clé privée : entier secret <code>d</code> tel que <code>e * d &equiv; 1 (mod &phi;(n))</code></li>',
        '      <li>Chiffrement : <code>c = m^e (mod n)</code></li>',
        '      <li>Déchiffrement : <code>m = c^d (mod n)</code></li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Échange de clés Diffie-Hellman (DH)</h4>',
        '    <p>Permet à deux inconnus de convenir d’une clé symétrique secrète sur un canal public non sécurisé :</p>',
        '    <ul>',
        '      <li>Paramètres publics : un grand nombre premier <i>p</i> et un générateur <i>g</i>.</li>',
        '      <li>Secrets privés : Alice choisit <i>a</i>, Bob choisit <i>b</i>.</li>',
        '      <li>Échanges publics : Alice envoie <i>A = g^a (mod p)</i>, Bob envoie <i>B = g^b (mod p)</i>.</li>',
        '      <li>Secret commun calculé : <code>K = B^a &equiv; A^b &equiv; g^(ab) (mod p)</code>.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Hachage cryptographique &amp; Code d’authentification HMAC',
      html: [
        '<p>Une fonction de hachage transforme un message de taille quelconque en une empreinte de taille fixe ' +
        '(ex. 256 bits pour <strong>SHA-256</strong>). Une fonction cryptographique robuste vise trois propriétés de résistance calculatoire, et non des impossibilités absolues :</p>',

        '<ol>',
        '  <li><strong>Résistance à la préimage (sens unique) :</strong> Étant donné une empreinte <i>H</i>, trouver un message <i>m</i> tel que <i>hash(m) = H</i> est pratiquement infaisable.</li>',
        '  <li><strong>Résistance à la seconde préimage :</strong> Étant donné <i>m1</i>, il est pratiquement infaisable de trouver <i>m2 &ne; m1</i> tel que <i>hash(m1) = hash(m2)</i>.</li>',
        '  <li><strong>Résistance aux collisions :</strong> Trouver deux messages distincts quelconques produisant la même empreinte est pratiquement infaisable. ' +
        '  (C’est l’écroulement de cette résistance qui a rendu MD5 et SHA-1 totalement obsolètes).</li>',
        '</ol>',

        box('info', 'Code d’authentification de message : HMAC (RFC 2104)', [
          '<p>Comparer <code>hash(message)</code> à une empreinte de référence fiable permet de détecter une différence, ' +
          'avec un risque résiduel de collision. Un adversaire qui modifie le message et remplace aussi l’empreinte peut recalculer un hachage cohérent : la comparaison seule ne l’authentifie pas.</p>' +
          '<p>Protéger la référence, par exemple en l’obtenant par un canal authentifié. Sinon, utiliser un <strong>HMAC</strong> avec une clé secrète partagée ou une signature numérique vérifiée avec la clé publique authentifiée de l’émetteur. ' +
          'Le HMAC (Hash-based Message Authentication Code) combine le message avec une clé secrète <i>K</i>, normalisée en <i>K0</i> à la taille du bloc de hachage :</p>' +
          '<pre><code>HMAC(K, m) = hash((K0 XOR opad) || hash((K0 XOR ipad) || m))</code></pre>' +
          '<p>Si la clé reste secrète et la mise en œuvre est sûre, un tiers ne peut pas fabriquer un HMAC valide en pratique. Le MAC authentifie le message entre les détenteurs de la clé, sans distinguer lequel l’a créé.</p>'
        ].join('\n')),
        '<p>Sources : <a href="https://csrc.nist.gov/pubs/fips/180-4/upd1/final">NIST FIPS 180-4 : hachage</a>, ' +
        '<a href="https://csrc.nist.gov/pubs/fips/198-1/final">NIST FIPS 198-1 : HMAC</a> (retrait proposé, remplacement en projet par ' +
        '<a href="https://csrc.nist.gov/pubs/sp/800/224/ipd">NIST SP 800-224</a>) et ' +
        '<a href="https://csrc.nist.gov/pubs/fips/186-5/final">NIST FIPS 186-5 : signature numérique</a> (consultés le 30/10/2026).</p>'
      ].join('\n')
    },
    {
      title: 'Signature numérique &amp; Infrastructure à clés publiques (PKI)',
      html: [
        '<p>Une signature numérique permet de vérifier l’intégrité d’un document et de le relier à la clé du signataire. ' +
        'Pour attribuer la signature à une personne ou une organisation, il faut authentifier sa clé publique et protéger sa clé privée ; la vérification n’est pas une preuve absolue en cas de compromission.</p>',
        '<p>Le calcul RSA ci-dessous est un modèle arithmétique simplifié, non sûr contre les falsifications. ' +
        'En pratique, utiliser un schéma de signature normalisé tel que RSA-PSS et une clé publique authentifiée.</p>',

        '<table class="table">',
        '  <thead><tr><th>Étape</th><th>Acteur</th><th>Opération mathématique</th><th>Objectif</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>1. Condensation</strong></td><td>Émetteur (Alice)</td><td><code>h = SHA-256(document) mod n</code></td><td>Construire un entier pour ce modèle.</td></tr>',
        '    <tr><td><strong>2. Signature</strong></td><td>Émetteur (Alice)</td><td><code>s = h^d (mod n)</code> avec sa <strong>clé privée</strong></td><td>Illustrer l’opération RSA brute, sans protection pratique.</td></tr>',
        '    <tr><td><strong>3. Transmission</strong></td><td>Réseau public</td><td>Envoi du document en clair + de la signature <code>s</code></td><td>Transport sans secret nécessaire.</td></tr>',
        '    <tr><td><strong>4. Vérification</strong></td><td>Récepteur (Bob)</td><td><code>h_verif = s^e (mod n)</code> avec la <strong>clé publique</strong> d’Alice</td><td>Comparer <code>h_verif</code> à <code>SHA-256(document) mod n</code>, sans en déduire une sécurité réelle.</td></tr>',
        '  </tbody>',
        '</table>',

        '<p>Pour s’assurer que la clé publique appartient réellement à Alice et non à un usurpateur (attaque Man-in-the-Middle), ' +
        'une Autorité de Certification (CA) peut signer un <strong>certificat numérique X.509</strong> liant l’identité d’Alice à sa clé publique. ' +
        'Le récepteur doit notamment vérifier la chaîne de confiance, l’identité et la validité du certificat.</p>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Pourquoi le mode de chiffrement par blocs ECB (Electronic Codebook) est-il formellement interdit en production ?',
      opts: [
        'Parce que deux blocs de texte en clair identiques produisent toujours le même bloc chiffré, révélant la structure des données',
        'Parce qu’il ne supporte que des clés de 64 bits maximum',
        'Parce qu’il consomme dix fois plus de bande passante que le mode CBC',
        'Parce qu’il nécessite obligatoirement une connexion Internet active pour fonctionner'
      ],
      correct: 0,
      exp: 'En mode ECB, l’absence de chaînage et de vecteur d’initialisation fait que des motifs identiques en clair produisent des blocs chiffrés identiques, ce qui permet à un attaquant de déduire la structure du message.'
    },
    {
      stem: 'Dans le système cryptographique RSA, avec quelle clé l’émetteur fabrique-t-il la signature numérique d’un document ?',
      opts: [
        'Avec sa propre clé privée',
        'Avec la clé publique du récepteur',
        'Avec sa propre clé publique',
        'Avec une clé symétrique temporaire négociée par Diffie-Hellman'
      ],
      correct: 0,
      exp: 'La signature est générée avec la clé privée de l’émetteur. La vérification utilise sa clé publique, dont l’appartenance au signataire doit être authentifiée ; la clé privée doit rester protégée.'
    },
    {
      stem: 'Quelle propriété d’une fonction de hachage cryptographique rend pratiquement infaisable la recherche de deux fichiers différents de même empreinte SHA-256 ?',
      opts: [
        'La résistance aux collisions',
        'La résistance à la première préimage',
        'L’effet miroir',
        'La réversibilité polynomiale'
      ],
      correct: 0,
      exp: 'La résistance aux collisions rend pratiquement infaisable la recherche de deux entrées x et y distinctes telles que H(x) = H(y) ; elle ne rend pas les collisions mathématiquement impossibles.'
    },
    {
      stem: 'Une empreinte accompagne un fichier et un attaquant peut modifier les deux. Comment détecter une modification malveillante ?',
      opts: [
        'Vérifier un HMAC avec la clé secrète partagée ou une signature avec une clé publique authentifiée',
        'Recalculer le hachage du fichier et le comparer à l’empreinte fournie par le même attaquant',
        'Vérifier uniquement que l’empreinte contient 64 caractères hexadécimaux',
        'Compresser le fichier avant de calculer son hachage'
      ],
      correct: 0,
      exp: 'Une comparaison avec une empreinte de référence fiable peut détecter une différence ; si l’attaquant modifie aussi cette référence, un MAC ou une signature avec clés protégées permet d’authentifier le message.'
    },
    {
      stem: 'Dans un échange de clés Diffie-Hellman, que représente le secret final K calculé par Alice et Bob ?',
      opts: [
        'Une valeur identique partagée g^(ab) mod p qui servira de clé symétrique de session',
        'La clé privée de l’autorité de certification X.509',
        'Le certificat SSL du serveur web',
        'Le mot de passe administrateur en clair'
      ],
      correct: 0,
      exp: 'Diffie-Hellman permet à Alice et Bob d’obtenir le même secret K = g^(ab) mod p sans jamais transmettre a, b ou K sur le réseau.'
    }
  ],

  pitfalls: [
    'Utiliser le mode AES-ECB pour chiffrer des données volumineuses ou structurées.',
    'Réutiliser le même vecteur d’initialisation (IV) ou le même masque de Vernam avec la même clé.',
    'Confondre chiffrement asymétrique (clé publique du destinataire pour chiffrer) et signature numérique (clé privée de l’émetteur pour signer).',
    'Considérer un hachage simple (SHA-256) comme suffisant pour authentifier un message sans référence fiable, MAC ou signature.',
    'Faire confiance à une clé publique sans vérifier la chaîne de certification X.509 remontant à une autorité racine (Root CA).'
  ],

  methodTitle: 'Protocole en 4 étapes pour concevoir un canal d’échange hautement sécurisé',
  method: [
    'Négocier la session avec de la cryptographie asymétrique (Diffie-Hellman éphémère ECDHE) pour assurer la confidentialité persistante (PFS).',
    'Authentifier les parties au moyen de certificats numériques X.509 signés par une autorité reconnue.',
    'Chiffrer le flux de données en masse avec un algorithme symétrique rapide en mode authentifié (AES-GCM ou ChaCha20-Poly1305).',
    'Détruire immédiatement les clés éphémères en mémoire à la clôture de la session pour empêcher toute compromission rétrospective.'
  ],

  summary: [
    'Le chiffrement symétrique (AES) assure le débit et la confidentialité en masse ; le mode GCM apporte en plus l’authenticité.',
    'Le masque jetable de Vernam est théoriquement inviolable si la clé est aléatoire, unique et de même taille que le clair.',
    'La cryptographie asymétrique (RSA, Diffie-Hellman) résout la distribution des clés sans canal sécurisé préalable.',
    'Une empreinte SHA-256 se compare à une référence fiable ; un HMAC ou une signature protège l’intégrité contre une modification adversariale si les clés sont protégées.',
    'Une signature vérifiée avec une clé publique authentifiée relie le message à la clé du signataire ; son attribution dépend notamment de la protection de la clé privée.'
  ],

  checklist: [
    'Je connais la table de vérité et les propriétés fondamentales de l’opérateur XOR.',
    'Je sais expliquer pourquoi le mode ECB est vulnérable et pourquoi privilégier CBC ou GCM.',
    'Je maîtrise le mécanisme mathématique de base de RSA et de Diffie-Hellman.',
    'Je fais la différence entre un hachage simple (SHA-256) et un hachage avec clé secrète (HMAC).',
    'Je sais décrire le processus en 4 étapes de génération et vérification d’une signature numérique.'
  ],

  notions: [
    'Chiffrement symétrique vs asymétrique',
    'Masque jetable de Vernam (XOR)',
    'Standard AES (Rijndael)',
    'Modes de bloc : ECB, CBC, GCM',
    'Vecteur d’initialisation (IV)',
    'Algorithme RSA (factorisation)',
    'Échange de clés Diffie-Hellman',
    'Hachage cryptographique (SHA-256)',
    'Code HMAC (RFC 2104)',
    'Signatures numériques et certificats X.509'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les propriétés du XOR et la distinction entre clé publique et clé privée.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les modes opératoires (ECB vs GCM) et le mécanisme de signature.' },
    { cls: 'good', text: '70–94 % — Très bon niveau : vous maîtrisez l’ensemble des briques cryptographiques modernes.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe à la sécurité des réseaux et au filtrage périmétrique au module 3.' }
  ],

  flashcards: [
    { "q": 'Qu’est-ce que « Chiffrement symétrique vs asymétrique » ?', "a": 'Le chiffrement symétrique utilise la même clé secrète pour chiffrer et déchiffrer ; le chiffrement asymétrique utilise une paire de clés publique et privée.' },
    { "q": 'Qu’est-ce que « Standard AES (Rijndael) » ?', "a": 'AES est un chiffrement symétrique par blocs de 128 bits, issu de Rijndael, avec des clés de 128, 192 ou 256 bits.' },
    { "q": 'Qu’est-ce que « Modes de bloc » ?', "a": 'ECB chiffre chaque bloc séparément et révèle les motifs ; CBC chaîne les blocs ; GCM fournit chiffrement et authentification.' },
    { "q": 'Qu’est-ce que « Vecteur d’initialisation (IV) » ?', "a": 'Valeur d’initialisation généralement publique : elle doit être imprévisible en CBC et unique pour chaque chiffrement avec une même clé en GCM.' },
    { "q": 'Qu’est-ce que « Algorithme RSA (factorisation) » ?', "a": 'RSA utilise une paire de clés pour chiffrer ou signer ; sa sécurité dépend notamment de la difficulté de factoriser n = p × q.' },
    { "q": 'Qu’est-ce que « Échange de clés Diffie-Hellman » ?', "a": 'Protocole permettant à deux parties de calculer un secret partagé (K = g^(ab) mod p) via un canal public sans transmettre leurs secrets privés ; sans authentification préalable (signatures ou certificats), l’échange est vulnérable à une attaque de l’homme du milieu (MitM) (RFC 2631).' },
    { "q": 'Qu’est-ce que « Hachage cryptographique (SHA-256) » ?', "a": 'SHA-256 produit une empreinte de 256 bits ; la comparaison à une empreinte de confiance détecte une différence. Un HMAC ou une signature protège contre une modification adversariale, sous réserve de clés fiables.' },
    { q: 'Pourquoi le masque jetable de Vernam est-il inviolable ?', a: 'Parce que si la clé est parfaitement aléatoire, utilisée une seule fois et aussi longue que le texte, le cryptogramme ne fournit aucune information mathématique sur le clair.' },
    { q: 'Que signifie l’acronyme AES ?', a: 'Advanced Encryption Standard (standard de chiffrement symétrique par blocs de 128 bits).' },
    { q: 'Quelle est la vulnérabilité majeure du mode de chiffrement ECB ?', a: 'Des blocs de clair identiques produisent des blocs chiffrés identiques, révélant la structure des données.' },
    { q: 'Sur quelle difficulté mathématique repose la sécurité de RSA ?', a: 'Sur la difficulté de factoriser en nombres premiers un très grand entier n = p * q.' },
    { q: 'Quelle est la différence entre SHA-256 et HMAC-SHA256 ?', a: 'SHA-256 est une empreinte sans clé ; HMAC-SHA256 utilise une clé secrète partagée pour authentifier le message entre les détenteurs de cette clé, sans identifier lequel l’a créé.' },
    { q: 'À quoi sert un certificat numérique X.509 ?', a: 'À lier une identité à une clé publique par une signature ; il faut vérifier notamment la chaîne de confiance, l’identité et la validité, sans supposer la clé privée à l’abri d’une compromission.' }
  ]
};
