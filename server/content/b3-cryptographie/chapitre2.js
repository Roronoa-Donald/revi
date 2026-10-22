/**
 * Chapitre 2 du cours « Cryptographie & PKI B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Cryptographie Symétrique Moderne (Chiffrement par Bloc et par Flux)',
  short: 'Symétrique, Bloc &amp; Flux',
  toc: 'Chiffrements par flux (Stream Ciphers), registres à décalage à rétroaction linéaire (LFSR), chiffrement par bloc (Block Ciphers), réseaux de Feistel (DES, 3DES) et architecture SPN d\'AES (SubBytes, ShiftRows, MixColumns, AddRoundKey), modes opératoires (ECB, CBC, CFB, OFB, CTR, GCM), gestion du bourrage PKCS#7 et attaques par oracle de padding.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans les architectures de communication réseau à haut débit (VPN, tunnels IPsec, liaisons satellite) et de stockage de données au repos (chiffrement de disques LUKS ou BitLocker), le choix de l\'algorithme symétrique et de son mode opératoire détermine directement les performances et l\'immunité face aux cyberattaques. Utiliser un mode non chaîné comme ECB expose les données à des fuites de motifs structurels, tandis qu\'une gestion laxiste du débourrage CBC expose le serveur aux attaques par oracle de padding. En tant qu\'architecte de sécurité B3, vous devez maîtriser le fonctionnement interne d\'AES, implémenter la norme de padding PKCS#7 et configurer des modes opératoires robustes garantissant intégrité et confidentialité.',
  objectives: [
    'comprendre le fonctionnement des générateurs de flux pseudo-aléatoires à registres à décalage (LFSR) ;',
    'différencier les architectures de chiffrement par bloc : schémas de Feistel (DES/3DES) et réseaux de substitution-permutation SPN (AES Rijndael) ;',
    'maîtriser les 4 transformations de chaque ronde d\'AES : SubBytes, ShiftRows, MixColumns et AddRoundKey ;',
    'comparer les modes opératoires de chiffrement par bloc : ECB, CBC, CFB, OFB, CTR et le mode authentifié GCM ;',
    'implémenter rigoureusement la norme de bourrage PKCS#7 (RFC 5652) et comprendre la mécanique de l\'attaque par oracle de padding ;',
    'analyser et résoudre méthodologiquement des chiffreurs de flux LFSR, des applicateurs de padding PKCS#7 et des simulateurs de mode CBC.'
  ],
  sections: [
    {
      title: 'Chiffrement par Flux (Stream Ciphers) &amp; Registres à Décalage LFSR',
      html: [
        '<p>Dans un chiffrement par flux, le chiffrement s\'effectue en temps réel sans attendre l\'accumulation d\'un bloc complet de données. Le système génère une séquence pseudo-aléatoire continue d\'octets ou de bits (le <em>keystream</em>) combinée au texte clair par l\'opérateur XOR bit à bit :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Principe du Chiffrement par Flux</h4>',
        '    <pre><code>C_i = P_i ^ K_i\nP_i = C_i ^ K_i</code></pre>',
        '    <p>Le déchiffrement est strictement identique au chiffrement. La sécurité repose intégralement sur l\'imprévisibilité et la période maximale du générateur pseudo-aléatoire (PRNG).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Registres à Décalage LFSR (Linear Feedback Shift Register)</h4>',
        '    <p>Un LFSR est un circuit séquentiel composé de bascules binaires. À chaque coup d\'horloge :</p>',
        '    <ul>',
        '      <li>Le bit situé à l\'extrémité droite est extrait pour alimenter le flux de clé sortant.</li>',
        '      <li>Le bit réinjecté en position 0 est calculé par la somme modulo 2 (XOR) des bits situés aux positions de prises (<em>taps</em>).</li>',
        '      <li>Un LFSR de longueur L utilisant un polynôme primitif produit une séquence maximale de <code>2^L - 1</code> bits. Utilisé dans A5/1 (GSM) et E0 (Bluetooth).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Chiffrement par Bloc : Feistel (DES) vs Architecture SPN (AES Rijndael)',
      html: [
        '<p>Un chiffrement par bloc découpe le message clair en blocs de taille fixe (64 bits pour DES, 128 bits pour AES) et applique des transformations itératives appelées rondes (ou tours) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Réseaux de Feistel (DES / 3DES)</h4>',
        '    <ul>',
        '      <li>Le bloc est scindé en deux moitiés : <code>L_i = R_{i-1}</code> et <code>R_i = L_{i-1} ^ F(R_{i-1}, K_i)</code>.</li>',
        '      <li>Avantage : la fonction interne <code>F</code> n\'a pas besoin d\'être inversible, le déchiffrement applique simplement les clés de ronde en ordre inverse.</li>',
        '      <li>DES (56 bits de clé) est obsolète (cassé par force brute en 1999). 3DES applique <code>E_{K1}(D_{K2}(E_{K3}(P)))</code> avec une clé effective de 112 à 168 bits.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Architecture SPN d\'AES (FIPS 197)</h4>',
        '    <p>AES (Rijndael) traite des blocs de 128 bits organisés sous forme d\'une matrice d\'état 4x4 d\'octets. Chaque ronde applique 4 opérations mathématiques :</p>',
        '    <ol>',
        '      <li><strong>SubBytes :</strong> substitution non linéaire d\'octets via une S-Box inversible (confusion).</li>',
        '      <li><strong>ShiftRows :</strong> décalage cyclique des lignes de la matrice (diffusion).</li>',
        '      <li><strong>MixColumns :</strong> multiplication matricielle dans le corps de Galois GF(2^8) (diffusion).</li>',
        '      <li><strong>AddRoundKey :</strong> XOR bit à bit avec la sous-clé de ronde dérivée de la clé principale.</li>',
        '    </ol>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Modes Opératoires, Bourrage PKCS#7 &amp; Oracle de Padding',
      html: [
        '<p>Pour chiffrer des données plus volumineuses qu\'un bloc de 16 octets, un mode opératoire définit la méthode de traitement des blocs successifs :</p>',
        '<table class="table">',
        '  <thead><tr><th>Mode</th><th>Mécanisme</th><th>Vecteur IV</th><th>Propriétés &amp; Risques</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>ECB</strong></td><td><code>C_i = E_K(P_i)</code></td><td>Aucun</td><td><span class="badge badge--danger">Proscrit</span> (aucun chaînage, fuite de structure répétée)</td></tr>',
        '    <tr><td><strong>CBC</strong></td><td><code>C_i = E_K(P_i ^ C_{i-1})</code></td><td>IV aléatoire requis</td><td>Chaînage séquentiel (vulnérable aux oracles de padding si sans HMAC)</td></tr>',
        '    <tr><td><strong>CTR</strong></td><td><code>C_i = P_i ^ E_K(Nonce || Counter)</code></td><td>Nonce requis</td><td>Parallélisable, transforme le bloc en chiffrement par flux</td></tr>',
        '    <tr><td><strong>GCM</strong></td><td>Mode CTR + GHASH Galois</td><td>Nonce unique 96 bits</td><td><span class="badge badge--success">AEAD Standard</span> (Confidentialité + Intégrité intégrée)</td></tr>',
        '  </tbody>',
        '</table>',
        box('standard', 'Bourrage PKCS#7 (RFC 5652) &amp; Oracle de Padding', [
          '<p>Lorsque la taille du message n\'est pas un multiple de la taille du bloc <code>B</code> (ex: 16 octets pour AES) :</p>',
          '<ul>',
          '  <li>On ajoute <code>p = B - (len(M) mod B)</code> octets, chacun ayant pour valeur l\'entier <code>p</code>.</li>',
          '  <li>Si le message est déjà un multiple exact de B, on ajoute un bloc entier de 16 octets de valeur <code>0x10</code>.</li>',
          '  <li><strong>Attaque par Oracle de Padding :</strong> si le serveur déchiffreur répond par une erreur explicite lorsque le padding est invalide, un attaquant peut manipuler le bloc chiffré précédent pour retrouver l\'intégralité du texte en clair sans la clé secrète.</li>',
          '</ul>'
        ])
      ].join('\n')
    }
  ],
  method: [
    'Sélection rigoureuse de l\'algorithme et du mode opératoire : bannir systématiquement le mode ECB et privilégier AES-256 en mode authentifié GCM (AEAD) pour garantir simultanément intégrité et confidentialité.',
    'Génération cryptographique des vecteurs d\'initialisation (IV) et nonces : utiliser impérativement un générateur d\'aléa sécurisé (CSPRNG) et s\'assurer qu\'un IV en mode CBC ou un nonce en mode CTR/GCM n\'est jamais réutilisé avec la même clé.',
    'Validation et application conforme du bourrage PKCS#7 : vérifier lors du débourrage que les p octets de padding ont tous une valeur cohérente comprise entre 1 et la taille de bloc B.',
    'Prévention des attaques par oracle de padding : uniformiser les temps de réponse et masquer les codes d\'erreur de déchiffrement à l\'aide d\'une vérification d\'intégrité préalable (Encrypt-then-MAC ou GCM).'
  ],
  summary: [
    'Le chiffrement par flux opère en continu par XOR avec un keystream (LFSR, ChaCha20), tandis que le chiffrement par bloc traite des blocs fixes (AES 128 bits).',
    'AES Rijndael repose sur un réseau de substitution-permutation (SPN) combinant SubBytes, ShiftRows, MixColumns et AddRoundKey.',
    'Le mode ECB est formellement interdit en production car il préserve les motifs des blocs clairs identiques.',
    'Le mode CBC nécessite un vecteur d\'initialisation (IV) aléatoire et un bourrage PKCS#7.',
    'Le mode GCM (Galois/Counter Mode) est le standard moderne d\'AEAD, assurant chiffrement et authentification sans oracle de padding.'
  ],
  checklist: [
    'Comprenez-vous le mécanisme de génération de bits d\'un registre à décalage LFSR ?',
    'Pouvez-vous citer les quatre transformations successives d\'une ronde d\'AES ?',
    'Savez-vous expliquer pourquoi le mode ECB est dangereux pour chiffrer des données ?',
    'Connaissez-vous la règle de calcul du nombre d\'octets de bourrage selon PKCS#7 ?',
    'Savez-vous comment fonctionne une attaque par oracle de padding sur le mode CBC ?'
  ],
  notions: [
    { term: 'LFSR', def: 'Registre à décalage à rétroaction linéaire utilisant des portes XOR pour générer une séquence de bits pseudo-aléatoire périodique.' },
    { term: 'Réseau de Feistel', def: 'Structure de chiffrement par bloc scindant les données en deux moitiés où le déchiffrement utilise la même fonction interne avec les clés inversées (ex: DES).' },
    { term: 'Réseau SPN (AES)', def: 'Substitution-Permutation Network appliquant des couches alternées de confusion (S-Box) et de diffusion linéaire (ShiftRows, MixColumns).' },
    { term: 'Bourrage PKCS#7', def: 'Norme RFC 5652 complétant un message jusqu\'au multiple de taille de bloc par p octets valant tous la valeur p.' },
    { term: 'AEAD (Authenticated Encryption)', def: 'Mode de chiffrement moderne combinant confidentialité du message et authentification d\'intégrité (ex: AES-GCM, ChaCha20-Poly1305).' }
  ],
  pitfalls: [
    'Utiliser le mode ECB pour chiffrer des fichiers ou des bases de données : l\'attaquant peut déduire le contenu à partir des blocs identiques répétés.',
    'Réutiliser le même couple (clé, IV/nonce) en mode CTR ou GCM : la sécurité s\'effondre instantanément et permet de retrouver le clair par XOR des chiffrés.',
    'Renvoyer un message d\'erreur « Invalid Padding » distinct d\'une erreur d\'authentification dans une API, créant un oracle de padding exploitable.',
    'Oublier d\'ajouter un bloc complet de bourrage PKCS#7 lorsque la taille des données est un multiple exact de la taille de bloc, rendant le débourrage ambigu.'
  ],
  questions: [
    {
      stem: 'Pourquoi le mode de chiffrement Electronic Codebook (ECB) est-il formellement proscrit en sécurité d\'entreprise ?',
      opts: [
        'Il nécessite une puissance de calcul trop élevée',
        'Deux blocs clairs identiques produisent exactement le même bloc chiffré',
        'Il ne fonctionne qu\'avec des clés de 56 bits',
        'Il exige un vecteur d\'initialisation IV de 64 octets'
      ],
      correct: 1,
      exp: 'En mode ECB, chaque bloc est chiffré de manière déterministe et isolée sans vecteur d\'initialisation ni chaînage. Deux blocs identiques donnent le même chiffré, révélant la structure des données.'
    },
    {
      stem: 'Combien d\'octets de bourrage PKCS#7 doivent être ajoutés à un message de 16 octets pour un chiffrement de bloc AES (bloc de 16 octets) ?',
      opts: ['0 octet', '1 octet', '8 octets', '16 octets (un bloc complet de valeur 0x10)'],
      correct: 3,
      exp: 'Selon la norme PKCS#7, si la longueur du message est déjà un multiple exact de la taille de bloc B, un bloc complet de B octets de valeur B est obligatoirement ajouté afin d\'éviter toute ambiguïté lors du débourrage.'
    },
    {
      stem: 'Quelle opération dans une ronde d\'AES assure la confusion non linéaire ?',
      opts: ['ShiftRows', 'SubBytes (via la S-Box)', 'MixColumns', 'AddRoundKey'],
      correct: 1,
      exp: 'SubBytes applique une substitution d\'octets non linéaire via une S-Box basée sur l\'inversion dans le corps de Galois GF(2^8), apportant la propriété de confusion de Shannon.'
    },
    {
      stem: 'Quel mode opératoire moderne intègre nativement le chiffrement et le contrôle d\'intégrité/authenticité (AEAD) ?',
      opts: ['ECB', 'CBC', 'GCM (Galois/Counter Mode)', 'CFB'],
      correct: 2,
      exp: 'Le mode GCM (Galois/Counter Mode) est un mode AEAD combinant le mode compteur (CTR) pour le chiffrement et une multiplication polynomiale dans GF(2^128) pour le calcul d\'un tag d\'authentification.'
    },
    {
      stem: 'Quelle est la taille de bloc standard de l\'algorithme AES (Advanced Encryption Standard) ?',
      opts: ['64 bits', '128 bits', '256 bits', '512 bits'],
      correct: 1,
      exp: 'AES traite des blocs d\'une taille unique et invariable de 128 bits (16 octets), quelle que soit la longueur de la clé secrète choisie (128, 192 ou 256 bits).'
    },
    {
      stem: 'Comment une attaque par oracle de padding permet-elle de déchiffrer un message CBC ?',
      opts: [
        'En factorisant le modulus n',
        'En observant les messages d\'erreur de padding renvoyés par le serveur lors de la manipulation du bloc chiffré précédent',
        'En surchargeant le processeur par déni de service',
        'En forçant le générateur de nombres aléatoires à zéro'
      ],
      correct: 1,
      exp: 'L\'attaque par oracle de padding exploite le retour d\'information du serveur sur la validité du bourrage PKCS#7 après modification d\'octets dans le bloc chiffré C_{i-1}, permettant de deviner le clair octet par octet.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la taille de bloc d\'AES et quelles sont les longueurs de clés supportées ?',
      a: 'Taille de bloc : 128 bits (16 octets). Clés supportées : 128, 192 ou 256 bits (avec respectivement 10, 12 ou 14 rondes).'
    },
    {
      q: 'Quelles sont les 4 étapes exécutées dans chaque ronde d\'AES ?',
      a: '1. SubBytes (confusion non linéaire) ; 2. ShiftRows (diffusion) ; 3. MixColumns (diffusion de colonnes) ; 4. AddRoundKey (XOR avec sous-clé).'
    },
    {
      q: 'Pourquoi le mode de chiffrement ECB est-il considéré comme non sécurisé ?',
      a: 'Parce qu\'il chiffre chaque bloc de manière indépendante : deux blocs clairs identiques donnent deux blocs chiffrés identiques, révélant la structure des données.'
    },
    {
      q: 'Comment s\'applique le bourrage PKCS#7 si un message fait 12 octets dans un bloc de 16 ?',
      a: 'On ajoute 4 octets valant chacun 0x04 pour atteindre 16 octets (p = 16 - 12 = 4).'
    },
    {
      q: 'Qu\'est-ce que le chiffrement authentifié AEAD et quel est son représentant majeur ?',
      a: 'Un chiffrement combinant confidentialité et garantie d\'authenticité/intégrité en une seule opération (ex: AES-GCM, ChaCha20-Poly1305).'
    },
    {
      q: 'Qu\'est-ce qu\'une attaque par oracle de padding ?',
      a: 'Une attaque exploitant les messages d\'erreur du serveur sur la validité du bourrage PKCS#7 en mode CBC pour reconstituer le clair octet par octet.'
    }
  ],
  mastery: [
    {
      title: 'Implémentation sécurisée d\'AES et sélection de modes AEAD',
      desc: 'Configurer les bibliothèques cryptographiques pour imposer le mode AES-256-GCM et éliminer les modes vulnérables ECB et CBC sans MAC.'
    },
    {
      title: 'Gestion rigoureuse du bourrage PKCS#7 et protection contre les oracles',
      desc: 'Développer des parseurs de débourrage en temps constant évitant toute fuite d\'information temporelle ou d\'erreur explicite.'
    },
    {
      title: 'Conception de générateurs de flux pseudo-aléatoires LFSR',
      desc: 'Simuler des registres à décalage pour analyser les périodes maximales et les propriétés d\'aléa des chiffrements de flux.'
    },
    {
      title: 'Contrôle d\'unicité des vecteurs d\'initialisation (IV et Nonces)',
      desc: 'Mettre en place des mécanismes garantissant qu\'un nonce ou un IV n\'est jamais réutilisé avec la même clé secrète.'
    },
    {
      title: 'Développement d\'outils de cryptographie symétrique de manière méthodique',
      desc: 'Concevoir des scripts de simulation de modes de bloc CBC, de padding PKCS#7 et d\'analyse de propagation d\'erreurs de bits.'
    }
  ]
};
