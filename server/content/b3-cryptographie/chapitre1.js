/**
 * Chapitre 1 du cours « Cryptographie & PKI B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  // module.exports = object
];

module.exports = {
  n: 1,
  title: 'Fondements, Principes de Sécurité et Chiffrements Historiques',
  short: 'Fondements &amp; Chiffres Historiques',
  toc: 'Objectifs fondamentaux de la sécurité de l\'information (confidentialité, intégrité, authenticité, non-répudiation), principe de Kerckhoffs, modèle de menace et cryptanalyse, chiffrements historiques par substitution monoalphabétique (César, chiffrement affine), chiffre polyalphabétique de Vigenère, masque jetable de Vernam (One-Time Pad et confidentialité parfaite de Shannon), analyse fréquentielle et indice de coïncidence de Friedman.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Dans un contexte d\'entreprise où les communications et les données sensibles transitent par des réseaux ouverts non sécurisés, la méconnaissance des principes fondamentaux de la cryptographie conduit souvent à des choix catastrophiques tels que l\'illusion de la « sécurité par l\'obscurité », l\'utilisation d\'algorithmes faits maison ou la réutilisation dangereuse de clés de chiffrement. En tant qu\'ingénieur en sécurité des systèmes d\'information B3, vous devez maîtriser les fondations théoriques de la cryptographie, évaluer la robustesse des chiffrements face à la cryptanalyse statistique et fréquentielle, et modéliser les exigences de confidentialité parfaite démontrées par Shannon.',
  objectives: [
    'maîtriser les quatre piliers de la sécurité : Confidentialité, Intégrité, Authenticité et Non-répudiation ;',
    'appliquer le principe de Kerckhoffs et bannir la sécurité par l\'obscurité dans les architectures logicielles ;',
    'analyser le fonctionnement mathématique des chiffrements de César et de substitution affine modulo 26 ;',
    'comprendre le chiffre polyalphabétique de Vigenère et caractériser les conditions de confidentialité parfaite du masque jetable (One-Time Pad) ;',
    'maîtriser la cryptanalyse fréquentielle et le calcul de l\'Indice de Coïncidence (IC) de William Friedman pour identifier la longueur de clé ;',
    'développer en Python 3 des chiffreurs/déchiffreurs de César, de substitution affine, de Vigenère et des analyseurs d\'Indice de Coïncidence.'
  ],
  sections: [
    {
      title: 'Objectifs de la Sécurité, Règle de Kerckhoffs &amp; Types d\'Attaques',
      html: [
        '<p>La cryptographie (du grec <em>kryptos</em>, caché, et <em>graphein</em>, écrire) est la science mathématique permettant de protéger des messages contre l\'interception et la modification frauduleuse. Elle vise quatre objectifs fondamentaux :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Piliers de la Sécurité Informatique</h4>',
        '    <ul>',
        '      <li><strong>Confidentialité :</strong> seules les entités autorisées possédant la clé secrète peuvent lire le texte en clair.</li>',
        '      <li><strong>Intégrité :</strong> garantie que le message n\'a subi aucune modification, altération ou suppression en transit.</li>',
        '      <li><strong>Authenticité :</strong> certitude formelle quant à l\'identité de l\'émetteur du message.</li>',
        '      <li><strong>Non-répudiation :</strong> l\'auteur d\'une action ou d\'un message ne peut nier en être l\'émetteur face à un tiers.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le Principe de Kerckhoffs (1883)</h4>',
        '    <p>Énoncé par Auguste Kerckhoffs dans son traité <em>La cryptographie militaire</em> :</p>',
        '    <blockquote>« Il faut qu\'un système n\'exige pas le secret, et qu\'il puisse sans inconvénient tomber entre les mains de l\'ennemi. La sécurité ne doit reposer que sur la clé secrète. »</blockquote>',
        '    <p>Ce principe condamne formellement la <em>sécurité par l\'obscurité</em>. Les algorithmes industriels (AES, RSA, SHA-256) sont publics et rigoureusement audités par la communauté scientifique mondiale.</p>',
        '  </div>',
        '</div>',
        box('standard', 'Taxonomie des Modèles d\'Attaque Cryptanalytique', [
          '<p>En analyse de sécurité, un attaquant (Eve / Mallory) est modélisé selon son niveau de visibilité sur le système :</p>',
          '<ul>',
          '  <li><strong>Ciphertext-Only Attack (COA) :</strong> l\'attaquant ne dispose que de textes chiffrés interceptés et cherche à retrouver le clair ou la clé.</li>',
          '  <li><strong>Known-Plaintext Attack (KPA) :</strong> l\'attaquant possède plusieurs paires (texte clair, texte chiffré correspondant) et tente d\'en déduire la clé.</li>',
          '  <li><strong>Chosen-Plaintext Attack (CPA) :</strong> l\'attaquant a accès au mécanisme de chiffrement et peut faire chiffrer des textes clairs arbitraires de son choix.</li>',
          '  <li><strong>Chosen-Ciphertext Attack (CCA) :</strong> l\'attaquant peut soumettre des textes chiffrés et obtenir leur déchiffrement (sauf le chiffré cible).</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Chiffrements Historiques : Substitution Monoalphabétique (César &amp; Affine)',
      html: [
        '<p>Dans un chiffrement par substitution monoalphabétique, chaque caractère de l\'alphabet est remplacé de manière déterministe par un autre caractère selon une bijection fixe :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Chiffre de César (Décalage Circulaire)</h4>',
        '    <p>Chaque lettre est décalée de <code>k</code> positions dans l\'alphabet modulo 26 (avec A=0, B=1, ..., Z=25) :</p>',
        '    <pre><code>C = (P + k) mod 26\nP = (C - k) mod 26</code></pre>',
        '    <p>L\'espace des clés est minuscule (25 clés non triviales), permettant une attaque par force brute exhaustive immédiate.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Chiffrement par Substitution Affine</h4>',
        '    <p>Généralise César en combinant une multiplication et une addition modulaire :</p>',
        '    <pre><code>C = (a * P + b) mod 26\nP = (a^(-1) * (C - b)) mod 26</code></pre>',
        '    <p>Pour que la fonction soit bijective et déchiffrable, il est mathématiquement obligatoire que <code>pgcd(a, 26) == 1</code>. Il existe 12 entiers inversibles modulo 26 (1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25), soit un espace de 12 * 26 = 312 clés.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Vigenère, Masque Jetable (OTP) &amp; Analyse Fréquentielle (Friedman)',
      html: [
        '<p>Pour contrer la prévisibilité des substitutions monoalphabétiques, Blaise de Vigenère a popularisé le chiffrement polyalphabétique, où la valeur de décalage varie à chaque position du texte :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Chiffre de Vigenère &amp; Masque Jetable (OTP)</h4>',
        '    <ul>',
        '      <li><strong>Vigenère :</strong> répète une clé alphabétique de longueur <code>m</code>. La i-ème lettre est décalée de <code>K[i mod m]</code>.</li>',
        '      <li><strong>Masque Jetable (Vernam / One-Time Pad) :</strong> si la clé a exactement la longueur du message, est issue d\'une source purement aléatoire et n\'est <em>jamais réutilisée</em>, Claude Shannon a démontré en 1949 que le chiffrement offre une <strong>confidentialité parfaite</strong> : observer le chiffré n\'apporte aucune information statistique sur le texte en clair.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Indice de Coïncidence de Friedman (IC)</h4>',
        '    <p>L\'Indice de Coïncidence quantifie la non-uniformité de la distribution des lettres :</p>',
        '    <pre><code>IC = sum(f_i * (f_i - 1)) / (N * (N - 1))</code></pre>',
        '    <ul>',
        '      <li>Texte clair en français ou chiffrement monoalphabétique : <code>IC ≈ 0.0778</code>.</li>',
        '      <li>Texte aléatoire ou polyalphabétique à clé longue : <code>IC ≈ 0.0385</code> (1/26).</li>',
        '      <li>L\'IC permet de déterminer sans tester les clés si un texte a été chiffré par César ou par Vigenère, et d\'estimer la longueur de la clé.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Caractérisation du modèle de menace et des objectifs de sécurité : classifier le besoin entre confidentialité (chiffrement), intégrité (hachage) et authenticité (signature), et appliquer strictement le principe de Kerckhoffs.',
    'Cryptanalyse statistique par calcul d\'Indice de Coïncidence : analyser le message chiffré intercepté, calculer son Indice de Coïncidence de Friedman et déterminer s\'il s\'agit d\'une substitution monoalphabétique (IC >= 0.065) ou polyalphabétique.',
    'Recherche de période et décomposition en sous-textes (Kasiski) : pour un chiffre polyalphabétique, déterminer la longueur probable de la clé m à partir des répétitions ou du profil d\'IC par tranches entrelacées.',
    'Reconstitution des clés par analyse fréquentielle des lettres : aligner les fréquences observées dans chaque tranche sur les fréquences de la langue naturelle (pic de la lettre E) pour déduire la clé secrète.'
  ],
  summary: [
    'La sécurité de l\'information repose sur quatre piliers : confidentialité, intégrité, authenticité et non-répudiation.',
    'Le principe de Kerckhoffs stipule que la sécurité d\'un cryptosystème repose uniquement sur le secret de sa clé et jamais sur le secret de son algorithme.',
    'Les chiffrements de César et affine sont monoalphabétiques et vulnérables à l\'analyse statistique et à la force brute.',
    'Le masque jetable (One-Time Pad) offre une confidentialité théorique absolue sous réserve que la clé soit purement aléatoire, au moins aussi longue que le texte et à usage unique.',
    'L\'Indice de Coïncidence de Friedman (IC) permet de distinguer instantanément un chiffrement monoalphabétique d\'un chiffrement polyalphabétique aplati.'
  ],
  checklist: [
    'Savez-vous énoncer et justifier le principe de Kerckhoffs face à la sécurité par l\'obscurité ?',
    'Connaissez-vous la condition mathématique nécessaire pour que la clé d\'un chiffrement affine soit valide (pgcd(a, 26) == 1) ?',
    'Pouvez-vous citer les trois conditions indispensables pour que le masque jetable (OTP) garantisse une confidentialité parfaite ?',
    'Savez-vous calculer l\'Indice de Coïncidence (IC) et interpréter les valeurs seuils (0.077 pour le français, 0.038 pour l\'aléatoire) ?',
    'Comprenez-vous la différence entre une attaque à texte chiffré seul (COA) et à texte clair connu (KPA) ?'
  ],
  notions: [
    { term: 'Principe de Kerckhoffs', def: 'Règle cryptographique stipulant que la sécurité d\'un système doit reposer exclusivement sur le secret de la clé et non sur celui de l\'algorithme.' },
    { term: 'Confidentialité Parfaite', def: 'Propriété démontrée par Shannon où la distribution de probabilité du message clair conditionnée par le message chiffré est égale à la distribution a priori (P(M|C) = P(M)).' },
    { term: 'Chiffrement Affine', def: 'Chiffrement monoalphabétique associant à chaque lettre P la lettre C = (a*P + b) mod 26, nécessitant pgcd(a, 26) = 1.' },
    { term: 'Masque Jetable (One-Time Pad)', def: 'Chiffrement où le clair est combiné par XOR avec une clé aléatoire de même longueur, jamais réutilisée.' },
    { term: 'Indice de Coïncidence (IC)', def: 'Mesure probabiliste de Friedman évaluant la chance que deux lettres choisies au hasard dans un texte soient identiques, révélant la structure de la langue.' }
  ],
  pitfalls: [
    'Concevoir son propre algorithme de chiffrement « secret » pour un projet d\'entreprise en croyant qu\'il sera plus sécurisé qu\'AES (violation majeure du principe de Kerckhoffs).',
    'Choisir une clé multiplicative paire ou égale à 13 dans un chiffrement affine mod 26 : pgcd(a, 26) != 1 rend la fonction non injective et le déchiffrement impossible.',
    'Réutiliser la clé d\'un masque jetable (One-Time Pad) pour chiffrer deux messages distincts : l\'opération C1 ^ C2 = P1 ^ P2 permet de casser immédiatement les deux clairs (Two-Time Pad attack).',
    'Croire que Vigenère est incassable parce que la clé est longue : l\'analyse de Kasiski et l\'indice de coïncidence permettent d\'isoler la période et de casser chaque sous-colonne par César.'
  ],
  questions: [
    {
      stem: 'Quel principe fondamental affirme que la sécurité d\'un cryptosystème ne doit dépendre que du secret de la clé et pas de celui de l\'algorithme ?',
      opts: ['Le principe de Kerckhoffs', 'Le rasoir d\'Ockham', 'Le théorème de Shannon', 'La loi de Moore'],
      correct: 0,
      exp: 'Auguste Kerckhoffs a énoncé en 1883 que la sécurité d\'un système cryptographique doit résider entièrement dans la clé, l\'algorithme pouvant être public sans compromettre la sécurité.'
    },
    {
      stem: 'Combien de clés multiplicatives \'a\' sont valides pour un chiffrement affine dans un alphabet de 26 lettres ?',
      opts: ['26', '13', '12', '25'],
      correct: 2,
      exp: 'La clé a doit être première avec 26 (pgcd(a, 26) = 1). Les entiers impairs non multiples de 13 sont 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25, soit exactement 12 valeurs.'
    },
    {
      stem: 'Quelle condition n\'est PAS obligatoire pour garantir la confidentialité parfaite du masque jetable (One-Time Pad) selon Shannon ?',
      opts: ['La clé doit être générée par un processus matériel purement aléatoire', 'La clé doit être au moins aussi longue que le message', 'La clé doit être conservée sur une carte à puce sécurisée', 'La clé ne doit jamais être réutilisée'],
      correct: 2,
      exp: 'La confidentialité parfaite de Shannon exige que la clé soit purement aléatoire, au moins aussi longue que le texte, et à usage unique (One-Time). Le support physique de stockage n\'est pas une condition mathématique.'
    },
    {
      stem: 'Quelle est la valeur approximative de l\'Indice de Coïncidence (IC) pour un texte rédigé en français naturel ?',
      opts: ['0.0385', '0.0500', '0.0778', '0.1250'],
      correct: 2,
      exp: 'En langue française, l\'hétérogénéité des fréquences de lettres (dominance de E, A, S, I) produit un Indice de Coïncidence théorique d\'environ 0.0778 (contre 0.0385 pour un texte uniforme/aléatoire).'
    },
    {
      stem: 'Quel type d\'attaque cryptanalytique désigne le scénario où l\'attaquant ne dispose que d\'interceptions de messages chiffrés ?',
      opts: ['Known-Plaintext Attack (KPA)', 'Ciphertext-Only Attack (COA)', 'Chosen-Plaintext Attack (CPA)', 'Man-in-the-Middle (MITM)'],
      correct: 1,
      exp: 'L\'attaque à texte chiffré seul (Ciphertext-Only Attack - COA) est le modèle d\'attaque le plus contraignant pour l\'attaquant, qui ne possède aucun extrait en clair du message.'
    },
    {
      stem: 'Que se passe-t-il si un attaquant intercepte deux textes C1 et C2 chiffrés avec le même masque jetable K (Two-Time Pad) ?',
      opts: ['L\'attaquant ne peut rien déduire car le masque est aléatoire', 'L\'opération C1 ^ C2 annule le masque et révèle P1 ^ P2', 'La clé K est automatiquement détruite', 'Les textes clairs sont effacés du réseau'],
      correct: 1,
      exp: 'Comme C1 = P1 ^ K et C2 = P2 ^ K, effectuer le XOR des deux chiffrés donne C1 ^ C2 = P1 ^ K ^ P2 ^ K = P1 ^ P2. La clé s\'annule et l\'analyse fréquentielle sur deux textes naturels permet de retrouver P1 et P2.'
    }
  ],
  flashcards: [
    {
      q: 'Qu\'est-ce que le principe de Kerckhoffs ?',
      a: 'Le principe selon lequel la sécurité d\'un système cryptographique doit reposer uniquement sur le secret de la clé et jamais sur le secret de l\'algorithme.'
    },
    {
      q: 'Qu\'est-ce que la sécurité par l\'obscurité et pourquoi est-elle rejetée ?',
      a: 'C\'est le fait de baser la sécurité sur le secret de l\'algorithme ou de l\'implémentation. Elle est rejetée car toute fuite ou rétro-ingénierie détruit irrémédiablement le système.'
    },
    {
      q: 'Quelle est la condition d\'inversibilité de la clé \'a\' dans un chiffrement affine mod 26 ?',
      a: 'La clé a doit être strictement première avec 26 : pgcd(a, 26) = 1 (12 valeurs possibles).'
    },
    {
      q: 'Quelles sont les trois exigences du masque jetable (One-Time Pad) pour garantir une confidentialité parfaite ?',
      a: '1. Clé issue d\'un aléa pur ; 2. Longueur au moins égale au message ; 3. Usage unique absolu (clé jamais réutilisée).'
    },
    {
      q: 'Quelle est la signification d\'un Indice de Coïncidence (IC) de 0.075 sur un texte chiffré inconnu ?',
      a: 'L\'IC élevé indique une distribution non uniforme caractéristique d\'une substitution monoalphabétique (comme César ou affine).'
    },
    {
      q: 'Quelle est la conséquence de la réutilisation de la clé K dans un chiffrement par flot ou masque jetable ?',
      a: 'Le XOR des chiffrés élimine la clé (C1 ^ C2 = P1 ^ P2), permettant de retrouver les clairs via l\'analyse statistique (Two-Time Pad attack).'
    }
  ],
  mastery: [
    {
      title: 'Audit de conformité au principe de Kerckhoffs',
      desc: 'Évaluer les architectures logicielles d\'entreprise pour éradiquer tout mécanisme cryptographique propriétaire non standardisé.'
    },
    {
      title: 'Cryptanalyse de chiffrements monoalphabétiques',
      desc: 'Casser des chiffrements par substitution à l\'aide de dictionnaires statistiques et d\'alignement fréquentiel en Python.'
    },
    {
      title: 'Implémentation de l\'Indice de Coïncidence de Friedman',
      desc: 'Développer des outils d\'analyse statistique capables de détecter automatiquement la nature d\'un cryptosystème.'
    },
    {
      title: 'Gestion rigoureuse du cycle de vie des clés de masque jetable',
      desc: 'Mettre en place des protocoles d\'effacement mémoire sécurisé pour garantir l\'unicité stricte des flux de clés.'
    },
    {
      title: 'Programmation d\'outils d\'analyse cryptographique en Python 3',
      desc: 'Concevoir des scripts robustes de déchiffrement modulaire, d\'analyse polyalphabétique et de détection de motifs répétés.'
    }
  ]
};
