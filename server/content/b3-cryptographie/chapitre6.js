/**
 * Chapitre 6 du cours « Cryptographie & PKI B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Protocoles Cryptographiques Sécurisés (TLS, SSH, IPsec) & Post-Quantique',
  short: 'Protocoles Sécurisés &amp; Post-Quantique',
  toc: 'Protocole TLS 1.3 (RFC 8446) et refonte architecturale par rapport à TLS 1.2, optimisation du handshake (1-RTT et 0-RTT Early Data), confidentialité persistante (Perfect Forward Secrecy - PFS), anatomie et audit des suites cryptographiques (Cipher Suites), protocoles d\'infrastructure SSHv2 et IPsec (AH/ESP, IKEv2, modes Transport et Tunnel), impact de l\'ordinateur quantique (algorithmes de Shor et Grover), et standards post-quantiques du NIST (FIPS 203 ML-KEM, FIPS 204 ML-DSA, cryptographie hybride).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans un contexte géopolitique où les cyberattaques étatiques et les interceptions massives de flux de données s\'intensifient (« Store Now, Decrypt Later »), la sécurité des communications réseau ne peut plus reposer sur des protocoles vieillissants ou des configurations laxistes autorisant des suites cryptographiques dépréciées. De surcroît, l\'avènement imminent des ordinateurs quantiques cryptographiquement pertinents menace de réduire à néant l\'ensemble des algorithmes asymétriques actuels (RSA, Diffie-Hellman, courbes elliptiques). En tant qu\'architecte en cybersécurité B3, vous devez maîtriser le durcissement des protocoles TLS 1.3, SSH et IPsec, auditer les suites cryptographiques d\'infrastructure et orchestrer la transition vers les nouveaux standards post-quantiques du NIST.',
  objectives: [
    'analyser les avancées de TLS 1.3 par rapport à TLS 1.2 : élimination des algorithmes vulnérables, poignée de mains 1-RTT et mode 0-RTT ;',
    'comprendre le principe fondamental de la Confidentialité Persistante (PFS - Perfect Forward Secrecy) avec échanges éphémères (ECDHE) ;',
    'décortiquer la structure des suites cryptographiques et classifier leur niveau de conformité selon les recommandations ANSSI/NIST ;',
    'maîtriser le fonctionnement de SSHv2 (clés ed25519, known_hosts) et d\'IPsec (protocoles AH/ESP, modes Transport et Tunnel, négociations IKEv2) ;',
    'évaluer l\'impact des algorithmes de Shor et de Grover sur la cryptographie moderne et comprendre les nouveaux standards post-quantiques (FIPS 203, FIPS 204) ;',
    'développer en Python 3 des analyseurs de suites TLS, des simulateurs de négociation TLS 1.3 et des auditeurs de conformité post-quantique.'
  ],
  sections: [
    {
      title: 'Protocole TLS 1.3 (RFC 8446) &amp; Confidentialité Persistante (PFS)',
      html: [
        '<p>Le protocole TLS (Transport Layer Security) sécurise l\'écrasante majorité du trafic Internet moderne (HTTPS, SMTPS, DNS-over-TLS). Publié en août 2018 (RFC 8446), TLS 1.3 représente la plus importante refonte de sécurité et de performance de l\'histoire du protocole :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Ruptures Fondamentales de TLS 1.3</h4>',
        '    <ul>',
        '      <li><strong>Suppression radicale de l\'obsolescence :</strong> exclusion totale de RSA pour l\'échange de clés, des modes CBC (vulnérables aux attaques par oracle), de RC4, de 3DES, de MD5 et de SHA-1.</li>',
        '      <li><strong>Chiffrement AEAD exclusif :</strong> seuls les chiffrements authentifiés (AES-GCM, AES-CCM, ChaCha20-Poly1305) sont autorisés.</li>',
        '      <li><strong>PFS obligatoire (Perfect Forward Secrecy) :</strong> l\'échange de clés doit impérativement utiliser Diffie-Hellman éphémère (DHE ou ECDHE). Même si la clé privée du serveur est volée plus tard, les sessions passées interceptées restent indéchiffrables.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Optimisation de la Poignée de Mains (Handshake)</h4>',
        '    <ul>',
        '      <li><strong>TLS 1.2 (2-RTT) :</strong> nécessitait 2 allers-retours réseau complets avant que les données applicatives ne puissent transiter en sécurité.</li>',
        '      <li><strong>TLS 1.3 (1-RTT) :</strong> le client envoie dès son <code>ClientHello</code> ses propositions de groupes de clés éphémères (<em>key shares</em>). La connexion sécurisée est établie en un seul aller-retour.</li>',
        '      <li><strong>Mode 0-RTT (Early Data) :</strong> lors d\'une reconnexion avec un serveur déjà visité (PSK), le client peut envoyer des données applicatives chiffrées dès le tout premier paquet (attention au risque de rejeu).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Analyse et Durcissement des Suites Cryptographiques (Cipher Suites)',
      html: [
        '<p>Une suite cryptographique définit la combinaison précise d\'algorithmes négociée entre le client et le serveur. L\'architecture de nommage a été profondément simplifiée entre TLS 1.2 et TLS 1.3 :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Syntaxe TLS 1.2 (Complexe)</h4>',
        '    <pre><code>TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256</code></pre>',
        '    <ul>',
        '      <li><strong>Échange de clés :</strong> <code>ECDHE</code> (éphémère sur courbe elliptique, garantit le PFS).</li>',
        '      <li><strong>Authentification :</strong> <code>RSA</code> (signature du certificat serveur).</li>',
        '      <li><strong>Chiffrement symétrique :</strong> <code>AES_128_GCM</code> (bloc 128 bits, mode AEAD).</li>',
        '      <li><strong>Fonction de hachage :</strong> <code>SHA256</code> (PRF et dérivation des clés).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Syntaxe TLS 1.3 (Compacte &amp; Sécurisée)</h4>',
        '    <pre><code>TLS_AES_256_GCM_SHA384</code></pre>',
        '    <ul>',
        '      <li>TLS 1.3 dissocie totalement l\'échange de clés et les certificats de la suite cryptographique.</li>',
        '      <li>La suite ne spécifie que le chiffrement symétrique et la fonction de hachage de dérivation.</li>',
        '      <li>Seulement 5 suites standardisées : <code>TLS_AES_128_GCM_SHA256</code>, <code>TLS_AES_256_GCM_SHA384</code>, <code>TLS_CHACHA20_POLY1305_SHA256</code>, <code>TLS_AES_128_CCM_SHA256</code>, <code>TLS_AES_128_CCM_8_SHA256</code>.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('warning', 'Règles de Durcissement ANSSI pour Serveurs HTTPS', [
          '<p>Dans une configuration sécurisée conforme au référentiel ANSSI :</p>',
          '<ul>',
          '  <li>Désactiver absolument les protocoles SSL 2.0, SSL 3.0, TLS 1.0 et TLS 1.1.</li>',
          '  <li>N\'autoriser que TLS 1.2 (avec suites ECDHE uniquement) et TLS 1.3.</li>',
          '  <li>Bannir les suites sans Forward Secrecy débutant par <code>TLS_RSA_WITH_...</code>.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Protocoles d\'Infrastructure Sécurisés : SSHv2 &amp; IPsec',
      html: [
        '<p>Au-delà du Web, la sécurité des couches d\'infrastructure d\'entreprise repose sur SSH pour l\'administration système et IPsec pour les réseaux privés virtuels (VPN) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>SSHv2 (Secure Shell v2 - RFC 4253)</h4>',
        '    <ul>',
        '      <li>Opère au-dessus de TCP (port 22). Négocie une session chiffrée via Diffie-Hellman ou Curve25519.</li>',
        '      <li><strong>Authentification de l\'hôte :</strong> vérification de l\'empreinte de clé publique du serveur stockée dans <code>~/.ssh/known_hosts</code> (détection d\'usurpation).</li>',
        '      <li><strong>Authentification de l\'utilisateur :</strong> clés asymétriques stockées dans <code>~/.ssh/authorized_keys</code> (standard moderne : clé Ed25519 générée par <code>ssh-keygen -t ed25519</code>).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>IPsec (Internet Protocol Security - RFC 4301)</h4>',
        '    <ul>',
        '      <li>Opère au niveau de la couche réseau IP (couche 3 du modèle OSI), rendant le chiffrement transparent pour les applications.</li>',
        '      <li><strong>AH (Authentication Header - protocole IP 51) :</strong> garantit l\'intégrité et l\'authentification de l\'en-tête IP et des données, mais <em>sans aucun chiffrement</em> (obsolète en pratique).</li>',
        '      <li><strong>ESP (Encapsulating Security Payload - protocole IP 50) :</strong> fournit confidentialité, intégrité et authentification des données.</li>',
        '      <li><strong>Mode Transport :</strong> ne chiffre que la charge utile (payload) IP (communication hôte à hôte).</li>',
        '      <li><strong>Mode Tunnel :</strong> encapsule le paquet IP d\'origine entier dans un nouvel en-tête IP externe (interconnexion de réseaux VPN passerelle à passerelle).</li>',
        '      <li><strong>IKEv2 (Internet Key Exchange v2) :</strong> négocie automatiquement les associations de sécurité (SA) et les clés.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Menace Quantique &amp; la Cryptographie Post-Quantique (NIST PQC)',
      html: [
        '<p>L\'ordinateur quantique n\'est pas un ordinateur classique plus rapide, mais une machine exploitant les lois de la mécanique quantique (superposition et intrication d\'états). Il remet en cause les fondements de la cryptographie moderne :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Deux Grands Algorithmes Quantiques</h4>',
        '    <ul>',
        '      <li><strong>Algorithme de Peter Shor (1994) :</strong> résout la factorisation des entiers et le logarithme discret en temps <em>polynomial</em> $O((\\log N)^3)$.<br><span style="color:#b91c1c;font-weight:700;">Conséquence dramatique :</span> rupture totale et instantanée de RSA, Diffie-Hellman, DSA, ECDH et ECDSA dès l\'apparition d\'un processeur quantique à tolérance de fautes.</li>',
        '      <li><strong>Algorithme de Lov Grover (1996) :</strong> accélère la recherche dans un espace non structuré en temps $O(\\sqrt{N})$.<br><span style="color:#b45309;font-weight:700;">Conséquence :</span> divise par deux la taille effective des clés symétriques. AES-128 ne procure plus que 64 bits de sécurité (insuffisant), tandis qu\'AES-256 conserve 128 bits de sécurité (parfaitement robuste).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Standards Post-Quantiques du NIST (Août 2024)</h4>',
        '    <p>Le NIST a publié les premiers standards cryptographiques officiels conçus pour résister aux attaques quantiques :</p>',
        '    <ul>',
        '      <li><strong>FIPS 203 (ML-KEM / Kyber) :</strong> mécanisme d\'encapsulation de clé (KEM) basé sur les réseaux euclidiens (Module Learning With Errors - MLWE) pour remplacer RSA et ECDH.</li>',
        '      <li><strong>FIPS 204 (ML-DSA / Dilithium) :</strong> signature numérique basée sur les réseaux euclidiens pour remplacer RSA et ECDSA.</li>',
        '      <li><strong>FIPS 205 (SLH-DSA / SPHINCS+) :</strong> signature sans état basée sur les fonctions de hachage (sécurité éprouvée sans hypothèse sur les réseaux).</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('tip', 'Stratégie de Transition : Cryptographie Hybride', [
          '<p>La recommandation officielle de l\'ANSSI, du BSI allemand et du NIST consiste à déployer une <strong>cryptographie hybride</strong> : combiner un algorithme classique éprouvé (comme X25519) et un algorithme post-quantique (comme ML-KEM-768). Si l\'une des primitives révélait une faiblesse mathématique imprévue, la seconde garantirait la sécurité globale.</p>'
        ])
      ].join('\n')
    }
  ],
  method: [
    'Audit de configuration des protocoles réseau : vérifier l\'exclusion définitive de SSL v3, TLS 1.0 et TLS 1.1 sur les répartiteurs de charge et serveurs web, et imposer TLS 1.3 comme protocole privilégié.',
    'Analyse rigoureuse des suites cryptographiques : inspecter les paramètres d\'échange de clés, vérifier la garantie de confidentialité persistante (PFS avec ECDHE) et valider l\'utilisation de chiffrements AEAD (AES-GCM ou ChaCha20-Poly1305).',
    'Sécurisation des accès d\'infrastructure SSH et VPN IPsec : configurer des clés d\'hôtes et d\'utilisateurs Ed25519 pour SSH, et déployer des tunnels IPsec ESP en mode Tunnel avec IKEv2 et groupes Diffie-Hellman modernes.',
    'Planification de la feuille de route post-quantique : inventorier les actifs cryptographiques asymétriques, migrer les clés symétriques vers AES-256 pour contrer Grover, et tester les suites hybrides (X25519 + ML-KEM-768).'
  ],
  summary: [
    'TLS 1.3 (RFC 8446) accélère le handshake à 1-RTT (voire 0-RTT), supprime les algorithmes vulnérables et rend la confidentialité persistante (PFS) obligatoire.',
    'Les suites TLS 1.3 se limitent à la définition de l\'AEAD et de la fonction de hachage, isolant l\'échange de clés et les certificats.',
    'SSHv2 sécurise l\'administration système via des clés publiques (Ed25519 recommandée), tandis qu\'IPsec ESP chiffre la couche réseau en mode Transport ou Tunnel.',
    'L\'algorithme de Shor brise théoriquement tous les cryptosystèmes asymétriques actuels (RSA, ECC), tandis que Grover exige le passage à AES-256.',
    'Le NIST a standardisé en août 2024 les premiers algorithmes post-quantiques (FIPS 203 ML-KEM et FIPS 204 ML-DSA), préconisés en mode hybride.'
  ],
  checklist: [
    'Savez-vous expliquer pourquoi TLS 1.3 impose la confidentialité persistante (PFS) et interdit les échanges de clés RSA statiques ?',
    'Comprenez-vous la différence de durée de handshake entre TLS 1.2 (2-RTT) et TLS 1.3 (1-RTT) ?',
    'Pouvez-vous décortiquer une suite cryptographique TLS 1.2 et déterminer si elle procure ou non le PFS ?',
    'Connaissez-vous la différence entre les protocoles AH et ESP d\'IPsec et entre le mode Transport et le mode Tunnel ?',
    'Savez-vous citer les impacts respectifs de l\'algorithme de Shor (ruine d\'asymétrique) et de Grover (racine carrée sur le symétrique) ?'
  ],
  notions: [
    { term: 'Confidentialité Persistante (PFS)', def: 'Propriété d\'un protocole garantissant que la compromission ultérieure de la clé privée à long terme du serveur ne permettra pas de déchiffrer les sessions passées.' },
    { term: 'Chiffrement Authentifié (AEAD)', def: 'Mode de chiffrement symétrique (ex: GCM) fournissant simultanément la confidentialité des données et la preuve formelle de leur intégrité.' },
    { term: 'IPsec ESP (Encapsulating Security Payload)', def: 'Protocole IPsec fournissant l\'authentification, l\'intégrité et le chiffrement des paquets réseau en mode Transport ou Tunnel.' },
    { term: 'Algorithme de Shor', def: 'Algorithme quantique résolvant la factorisation et le logarithme discret en temps polynomial, cassant RSA et les courbes elliptiques.' },
    { term: 'ML-KEM (FIPS 203)', def: 'Standard post-quantique du NIST pour l\'encapsulation de clés basé sur les réseaux euclidiens (anciennement Crystals-Kyber).' }
  ],
  pitfalls: [
    'Conserver des suites cryptographiques TLS sans Forward Secrecy (comme TLS_RSA_WITH_AES_256_CBC_SHA) : l\'interception du trafic permet son déchiffrement rétroactif si la clé privée fuite.',
    'Activer le mode 0-RTT dans TLS 1.3 pour des requêtes HTTP non idempotentes (ex: POST de virement bancaire) : un attaquant peut rejouer la requête à volonté.',
    'Utiliser le protocole IPsec AH en croyant chiffrer le trafic : AH n\'assure que l\'intégrité et laisse l\'intégralité des données en clair sur le réseau.',
    'Croire que doubler la taille d\'une clé RSA (passer de 2048 à 4096 bits) suffira face à l\'ordinateur quantique : Shor casse RSA en temps polynomial quelle que soit sa taille.'
  ],
  questions: [
    {
      stem: 'Pourquoi le protocole TLS 1.3 a-t-il totalement interdit l\'échange de clés basé sur le chiffrement RSA statique ?',
      opts: ['Parce que RSA ne fonctionne pas avec le protocole TCP', 'Parce que RSA statique ne fournit pas la confidentialité persistante (PFS)', 'Parce que RSA consomme trop d\'électricité', 'Parce que RSA a été racheté par une entreprise privée'],
      correct: 1,
      exp: 'Avec RSA statique, le client chiffre le secret pré-maître avec la clé publique du serveur. Si la clé privée du serveur est volée des années plus tard, tous les enregistrements passés peuvent être déchiffrés. TLS 1.3 impose le PFS avec ECDHE/DHE éphémère.'
    },
    {
      stem: 'Combien d\'allers-retours réseau (RTT) sont nécessaires pour établir une connexion complète et sécurisée en TLS 1.3 lors d\'une première visite ?',
      opts: ['0-RTT', '1-RTT', '2-RTT', '3-RTT'],
      correct: 1,
      exp: 'En TLS 1.3, le client envoie ses parts de clés éphémères dès le premier paquet ClientHello, permettant au serveur de répondre et de finaliser la clé en 1-RTT (contre 2-RTT en TLS 1.2).'
    },
    {
      stem: 'Dans le protocole IPsec, quel mode d\'encapsulation permet de créer un tunnel VPN reliant deux réseaux distants en encapsulant le paquet IP complet ?',
      opts: ['Mode Transport avec AH', 'Mode Tunnel avec ESP', 'Mode Loopback avec ICMP', 'Mode Broadcast avec ARP'],
      correct: 1,
      exp: 'Le mode Tunnel encapsule l\'intégralité du paquet IP d\'origine (en-tête IP d\'origine + données) dans un nouvel en-tête IP routable entre les deux passerelles VPN, et le protocole ESP assure le chiffrement et l\'intégrité.'
    },
    {
      stem: 'Quel algorithme quantique constitue une menace existentielle pour RSA et les courbes elliptiques (ECC) en résolvant la factorisation et le logarithme discret en temps polynomial ?',
      opts: ['L\'algorithme de Grover', 'L\'algorithme de Shor', 'L\'algorithme de Dijkstra', 'L\'algorithme A*'],
      correct: 1,
      exp: 'Publié en 1994 par Peter Shor, cet algorithme quantique factorise les entiers et calcule les logarithmes discrets en temps polynomial, réduisant à néant la sécurité de RSA et d\'ECC.'
    },
    {
      stem: 'Quelle norme NIST publiée en août 2024 définit le standard de mécanisme d\'encapsulation de clés (KEM) post-quantique basé sur les réseaux euclidiens ?',
      opts: ['FIPS 140-3', 'FIPS 197', 'FIPS 203 (ML-KEM / Kyber)', 'RFC 2104'],
      correct: 2,
      exp: 'FIPS 203 officialise le standard ML-KEM (Module Lattice-based Key Encapsulation Mechanism, dérivé de Crystals-Kyber) comme référence post-quantique pour le remplacement de Diffie-Hellman et RSA.'
    }
  ],
  flashcards: [
    {
      q: 'Qu\'est-ce que la confidentialité persistante (Perfect Forward Secrecy - PFS) ?',
      a: 'Une propriété garantissant que la compromission ultérieure de la clé privée d\'un serveur ne permettra jamais de déchiffrer les sessions de communication passées enregistrées.'
    },
    {
      q: 'Combien d\'allers-retours réseau (RTT) sont nécessaires pour le handshake en TLS 1.3 ?',
      a: '1-RTT pour une nouvelle connexion, et 0-RTT pour une reprise de session (Early Data).'
    },
    {
      q: 'Quelle est la différence fondamentale entre les protocoles IPsec AH et ESP ?',
      a: 'AH assure l\'intégrité et l\'authentification sans aucun chiffrement. ESP assure l\'intégrité, l\'authentification ET le chiffrement des données.'
    },
    {
      q: 'Pourquoi l\'algorithme de Grover oblige-t-il à passer à AES-256 pour la sécurité post-quantique ?',
      a: 'Grover accélère la recherche exhaustive en racine carrée (O(sqrt(N))), ce qui réduit la force effective d\'AES-128 à 64 bits (insuffisant) et celle d\'AES-256 à 128 bits (sécurisé).'
    },
    {
      q: 'Quel est l\'algorithme post-quantique standardisé par le NIST (FIPS 204) pour les signatures numériques ?',
      a: 'ML-DSA (Module Lattice-based Digital Signature Algorithm, dérivé de Crystals-Dilithium).'
    },
    {
      q: 'En quoi consiste une approche de transition cryptographique « hybride » ?',
      a: 'Elle combine un algorithme classique éprouvé (ex: X25519) et un algorithme post-quantique (ex: ML-KEM-768) au sein du même échange de clés pour garantir une double sécurité.'
    }
  ],
  mastery: [
    {
      title: 'Audit et analyse automatique de suites TLS en Python 3',
      desc: 'Développer des parsers inspectant les versions TLS, les algorithmes de chiffrement et la présence du Forward Secrecy.'
    },
    {
      title: 'Configuration et durcissement de serveurs TLS 1.3',
      desc: 'Mettre en œuvre les recommandations ANSSI/NIST sur les passerelles web et les répartiteurs de charge en production.'
    },
    {
      title: 'Déploiement d\'infrastructures sécurisées SSH et IPsec',
      desc: 'Configurer des clés Ed25519 pour SSH et des tunnels VPN IPsec ESP sécurisés avec négociation IKEv2.'
    },
    {
      title: 'Évaluation des vulnérabilités face à l\'ordinateur quantique',
      desc: 'Classifier l\'exposition des parcs applicatifs aux algorithmes de Shor et de Grover et planifier la migration symétrique.'
    },
    {
      title: 'Mise en œuvre des standards post-quantiques NIST PQC',
      desc: 'Intégrer les mécanismes ML-KEM et ML-DSA en mode hybride pour immuniser les communications à long terme.'
    }
  ]
};
