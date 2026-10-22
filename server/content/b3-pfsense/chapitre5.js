/**
 * Chapitre 5 du cours « pfSense & Routage B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Tunnels VPN Sécurisés : OpenVPN (SSL/TLS) &amp; IPsec Site-à-Site',
  short: 'Tunnels VPN (OpenVPN &amp; IPsec)',
  toc: 'PKI interne pfSense, OpenVPN nomade SSL/TLS, révocation CRL, IPsec IKEv2 site-à-site, conformité cryptographique ANSSI et Split vs Full Tunneling.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Avec la généralisation du télétravail et l’interconnexion de sites géographiquement distants (siège social, filiales, datacenters), le réseau étendu de l’entreprise repose sur des tunnels chiffrés traversant l’Internet non sécurisé. pfSense intègre une infrastructure à clés publiques (PKI X.509) native ainsi que les deux piliers industriels du VPN : OpenVPN (SSL/TLS) pour les accès nomades flexibles et IPsec IKEv2 pour les liaisons site-à-site haute performance. L’ingénieur sécurité doit maîtriser la gestion de la chaîne de confiance et des listes de révocation (CRL), proscrire les suites cryptographiques obsolètes (DES, 3DES, MD5) au profit des recommandations de l’ANSSI (AES-GCM, SHA-384, courbes elliptiques), et arbitrer rigoureusement entre les politiques de Split Tunneling et de Full Tunneling.',
  objectives: [
    'déployer et administrer une Infrastructure à Clés Publiques (PKI X.509) complète dans le Certificate Manager de pfSense ;',
    'gérer le cycle de vie des certificats numériques clients et révoquer les accès compromis via la CRL ;',
    'configurer un serveur OpenVPN nomade sécurisé en mode SSL/TLS + User Auth (double authentification) ;',
    'interconnecter deux infrastructures d’entreprise via un tunnel IPsec IKEv2 site-à-site avec négociation Phase 1 et Phase 2 ;',
    'auditer et conformer les propositions cryptographiques aux directives de sécurité de l’ANSSI et du NIST ;',
    'analyser et résoudre méthodologiquement des validateurs de certificats PKI, des auditeurs de propositions IPsec et des calculateurs de routage VPN.'
  ],
  sections: [
      {
        "title": "Prérequis intégré : Fondements de la PKI X.509 et des phases IPsec IKEv2 (lien avec Cryptographie B3)",
        "html": "<div class=\"box box--intuition\"><div class=\"box__title\">Maîtriser les briques cryptographiques avant de configurer OpenVPN et IPsec (voir aussi le cours Cryptographie &amp; PKI B3)</div><ul><li><strong>PKI X.509 (Infrastructure à Clés Publiques) :</strong> une Autorité de Certification racine (<strong>CA</strong>) signe numériquement le certificat du serveur VPN et les certificats des clients. La <strong>CRL (Certificate Revocation List)</strong> est la liste noire permettant d’invalider immédiatement un certificat volé ou compromis ;</li><li><strong>IPsec IKEv2 en deux phases :</strong> la <strong>Phase 1 (IKE SA)</strong> authentifie les deux pare-feux entre eux et établit un canal de contrôle chiffré grâce à l’échange de clés <em>Diffie-Hellman</em>, au chiffrement symétrique <em>AES-GCM</em> et à l’empreinte <em>SHA-256</em> ; la <strong>Phase 2 (Child SA / ESP)</strong> chiffre et achemine ensuite les paquets de données réels entre les sous-réseaux distants.</li></ul></div>"
      },
    {
      title: 'Infrastructure à Clés Publiques (PKI X.509) Interne sous pfSense',
      html: [
        '<p>Pour authentifier de manière irréfutable les serveurs et les postes clients distants, pfSense intègre un gestionnaire complet de certificats numériques (<em>System &gt; Cert. Manager</em>) permettant d’opérer en tant qu’<strong>Autorité de Certification (CA) racine</strong> d’entreprise.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. La Chaîne de Confiance X.509</h4>',
        '    <p>Le modèle hiérarchique de certification repose sur trois entités fondamentales :</p>',
        '    <ul>',
        '      <li><strong>L’Autorité de Certification (Certificate Authority - CA) :</strong> Clé maîtresse auto-signée (typiquement RSA 4096 bits ou ECDSA P-384) qui signe les certificats dépendants.</li>',
        '      <li><strong>Le Certificat Serveur (Server Certificate) :</strong> Certificat délivré au service OpenVPN de pfSense pour attester de son identité auprès des clients.</li>',
        '      <li><strong>Les Certificats Utilisateurs (User Certificates) :</strong> Certificats individuels émis pour chaque collaborateur ou machine distante.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Révocation et Liste de Révocation (CRL)</h4>',
        '    <p>Lorsqu’un ordinateur portable d’employé est volé ou qu’un contrat prend fin, la clé privée du certificat est considérée comme compromise :</p>',
        '    <ul>',
        '      <li><strong>Certificate Revocation List (CRL) :</strong> Fichier signé par la CA recensant les numéros de série (Serial Numbers) des certificats invalidés avant leur date d’expiration.</li>',
        '      <li>À chaque tentative de négociation VPN, pfSense consulte la CRL : si le certificat présenté y figure, la connexion est immédiatement rejetée.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Passerelle OpenVPN Nomade : SSL/TLS, Client Export &amp; Routage',
      html: [
        '<p>Le protocole <strong>OpenVPN</strong> fonctionne dans l’espace utilisateur en encapsulant les flux chiffrés dans des paquets UDP (port standard 1194) ou TCP au-dessus d’interfaces virtuelles <code>tun</code> (niveau 3 IP) ou <code>tap</code> (niveau 2 Ethernet) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Mode d’Authentification Recommandé</h4>',
        '    <p>Le mode industriel standard est <strong>SSL/TLS + User Auth</strong> (authentification à deux facteurs logique) :</p>',
        '    <ul>',
        '      <li><strong>Facteur 1 (Ce que je possède) :</strong> Certificat X.509 valide signé par la CA interne et clé privée.</li>',
        '      <li><strong>Facteur 2 (Ce que je sais) :</strong> Identifiant et mot de passe utilisateur (validés localement ou relayés vers un annuaire Active Directory LDAP/RADIUS).</li>',
        '      <li><strong>Clé TLS-Auth / TLS-Crypt :</strong> Clé pré-partagée symétrique signant ou chiffrant le canal de contrôle pour éliminer les attaques DoS et l’identification de port par scan.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Arbitrage : Full Tunneling vs Split Tunneling</h4>',
        '    <ul>',
        '      <li><strong>Full Tunneling (Redirect Gateway) :</strong> <em>Tout le trafic</em> du poste client (y compris la navigation Internet personnelle) est forcé à travers le tunnel vers pfSense. Sécurité maximale (filtrage proxy et inspection IDS centralisés), mais forte consommation de bande passante sur le WAN du siège.</li>',
        '      <li><strong>Split Tunneling :</strong> Seuls les sous-réseaux internes déclarés dans <em>IPv4 Local network(s)</em> sont injectés dans la table de routage du client. La navigation Internet courante sort directement par la box de l’employé.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Tunnels IPsec IKEv2 Site-à-Site &amp; Durcissement Cryptographique',
      html: [
        '<p>Pour relier de manière permanente deux sites d’entreprise (Site-to-Site), le protocole <strong>IPsec (Internet Protocol Security)</strong> est la référence absolue grâce à son exécution directe dans le noyau et à l’accélération matérielle AES-NI :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Deux Phases de Négociation IKEv2</h4>',
        '    <ul>',
        '      <li><strong>Phase 1 (IKE SA - Security Association) :</strong> Authentification mutuelle des deux pare-feux (via clé pré-partagée PSK ou certificats RSA/ECDSA) et établissement d’un canal de gestion sécurisé bidirectionnel (échange Diffie-Hellman sur le port UDP 500/4500).</li>',
        '      <li><strong>Phase 2 (Child SA / ESP) :</strong> Négociation des paramètres de chiffrement du flux de données réel (protocole <code>ESP - Encapsulating Security Payload</code>, numéro de protocole IP 50) et définition des sélecteurs de trafic (sous-réseaux locaux et distants).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Exigences Cryptographiques ANSSI</h4>',
        '    <p>Pour être conforme aux référentiels de sécurité actuels :</p>',
        '    <ul>',
        '      <li><strong>Proscrire formellement :</strong> DES, 3DES, Blowfish, MD5, SHA-1 et les groupes DH inférieurs à 14 (DH 1, 2, 5 cassés ou vulnérables).</li>',
        '      <li><strong>Chiffrement recommandé :</strong> AES-GCM (128 ou 256 bits) qui combine chiffrement et authentification en une seule opération (AEAD), ou AES-CBC avec HMAC-SHA256.</li>',
        '      <li><strong>Échange de clés :</strong> Groupe Diffie-Hellman 14 (MODP 2048 bits), Groupe 19 (Courbe elliptique NIST P-256) ou Groupe 20 (P-384).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Créer l’Autorité de Certification racine (CA) interne dans System > Cert. Manager.',
    'Étape 2 : Émettre le certificat du serveur OpenVPN et générer les certificats utilisateurs individuels.',
    'Étape 3 : Créer la liste de révocation (CRL) et l’associer au serveur OpenVPN pour la gestion des départs.',
    'Étape 4 : Déployer le serveur OpenVPN en mode SSL/TLS + User Auth et configurer le réseau de tunnel (IPv4 Tunnel Network).',
    'Étape 5 : Pour les liaisons inter-sites, configurer IPsec IKEv2 Phase 1 (DH 14+, AES-GCM) et Phase 2 (ESP).',
    'Étape 6 : Installer le package OpenVPN Client Export pour distribuer les profils .ovpn pré-configurés aux collaborateurs.'
  ],
  summary: [
    'pfSense gère une PKI X.509 complète comprenant CA racine, certificats serveurs, certificats clients et listes CRL.',
    'La CRL est contrôlée à chaque connexion VPN pour révoquer instantanément les certificats volés ou révoqués.',
    'OpenVPN en mode SSL/TLS + User Auth combine certificat cryptographique et identifiants utilisateur (2FA logique).',
    'Full Tunneling achemine 100% des flux par pfSense ; Split Tunneling cible uniquement les réseaux d’entreprise.',
    'IPsec IKEv2 négocie la gestion en Phase 1 (IKE SA) et le chiffrement des données métiers en Phase 2 (ESP).',
    'L’ANSSI exige l’abandon de DES/3DES/MD5 au profit d’AES-GCM, SHA-256/384 et de groupes DH supérieurs ou égaux à 14.'
  ],
  checklist: [
    'Je sais créer une Autorité de Certification (CA) interne et émettre un certificat utilisateur.',
    'Je comprends le fonctionnement d’une CRL et son rôle lors de la compromission d’un certificat client.',
    'Je sais différencier les impacts techniques et sécuritaires du Split Tunneling et du Full Tunneling.',
    'Je connais la différence entre la Phase 1 (IKE SA) et la Phase 2 (Child SA / ESP) d’un tunnel IPsec.',
    'Je sais identifier les suites cryptographiques interdites (DES, 3DES, MD5, SHA-1, DH < 14).',
    'Je sais pourquoi le protocole ESP (IP 50) est préféré pour le transport sécurisé inter-sites.'
  ],
  notions: [
    'PKI X.509 & Autorité de Certification (CA)',
    'Certificats Serveur & Certificats Clients',
    'Certificate Revocation List (CRL)',
    'OpenVPN (SSL/TLS + User Auth)',
    'Split Tunneling vs Full Tunneling',
    'IPsec IKEv2 Phase 1 & Phase 2',
    'Protocole ESP (IP 50) & Chiffrement AES-GCM',
    'Recommandations Cryptographiques ANSSI/NIST'
  ],
  pitfalls: [
    'Oublier d’associer la liste CRL dans la configuration du serveur OpenVPN, rendant la révocation inefficace.',
    'Utiliser le mode OpenVPN en clé partagée statique (Shared Key) pour des déploiements multi-utilisateurs.',
    'Conserver des groupes Diffie-Hellman obsolètes (DH 2 ou DH 5) par habitude sur des liaisons IPsec.',
    'Configurer le Full Tunneling sans anticiper la saturation de la bande passante descendante du WAN d’entreprise.'
  ],
  questions: [
    {
      stem: 'Où sont centralisées la création d’Autorités de Certification et l’émission de certificats sous pfSense ?',
      opts: [
        'Firewall > Rules',
        'System > Cert. Manager',
        'VPN > OpenVPN > Clients',
        'Status > Services'
      ],
      correct: 1,
      exp: 'Le menu System > Cert. Manager gère les CAs racines, les certificats serveurs/clients et les listes de révocation (CRL).'
    },
    {
      stem: 'Quel est le rôle d’une Certificate Revocation List (CRL) dans une PKI OpenVPN ?',
      opts: [
        'Accélérer la vitesse de téléchargement des fichiers',
        'Lister les numéros de série des certificats révoqués avant terme pour bloquer l’accès des postes compromis',
        'Chiffrer les mots de passe des administrateurs',
        'Générer automatiquement des clés SSH'
      ],
      correct: 1,
      exp: 'La CRL recense les certificats révoqués : pfSense vérifie cette liste pour interdire l’accès aux certificats compromis ou d’anciens collaborateurs.'
    },
    {
      stem: 'Quel port et protocole de transport sont utilisés par défaut pour les tunnels OpenVPN ?',
      opts: [
        'TCP port 80',
        'UDP port 1194',
        'TCP port 443 obligatoire',
        'UDP port 53'
      ],
      correct: 1,
      exp: 'OpenVPN utilise par défaut le port UDP 1194 pour minimiser la latence et éviter l’effet d’avalanche TCP-over-TCP.'
    },
    {
      stem: 'Quelle est la caractéristique principale d’une politique de Split Tunneling pour un client VPN ?',
      opts: [
        'Tout le trafic Internet personnel passe obligatoirement par le pare-feu de l’entreprise',
        'Seuls les flux destinés aux sous-réseaux d’entreprise déclarés transitent par le tunnel VPN',
        'Le client est déconnecté toutes les 15 minutes',
        'Le tunnel chiffre uniquement les requêtes DNS'
      ],
      correct: 1,
      exp: 'En Split Tunneling, seuls les réseaux internes de l’entreprise sont acheminés dans le VPN ; la navigation Web grand public sort localement.'
    },
    {
      stem: 'Dans un tunnel IPsec, quelle phase est responsable de négocier le chiffrement effectif des données (ESP) ?',
      opts: [
        'Phase 1 (IKE SA)',
        'Phase 2 (Child SA / ESP)',
        'Phase 3 (NTP Sync)',
        'Phase 0 (DHCP Discovery)'
      ],
      correct: 1,
      exp: 'La Phase 1 établit le canal sécurisé de gestion administrative ; la Phase 2 négocie le chiffrement ESP des paquets de données métiers.'
    },
    {
      stem: 'Selon les recommandations de durcissement de l’ANSSI, quel algorithme de hachage doit être formellement rejeté ?',
      opts: [
        'SHA-256',
        'SHA-384',
        'MD5',
        'SHA-512'
      ],
      correct: 2,
      exp: 'MD5 (tout comme SHA-1) présente des collisions cryptographiques prouvées et doit impérativement être banni des propositions IPsec et certificats.'
    },
    {
      stem: 'Quel groupe Diffie-Hellman représente la taille minimale requise (MODP 2048 bits) en environnement moderne ?',
      opts: [
        'Groupe 1 (768 bits)',
        'Groupe 2 (1024 bits)',
        'Groupe 14 (2048 bits)',
        'Groupe 5 (1536 bits)'
      ],
      correct: 2,
      exp: 'Le groupe Diffie-Hellman 14 (MODP 2048 bits) est le standard minimal contemporain : les groupes 1, 2 et 5 sont obsolètes et vulnérables.'
    },
    {
      stem: 'Quel est l’avantage majeur du chiffrement AES-GCM par rapport à AES-CBC dans IPsec ?',
      opts: [
        'Il fonctionne sans processeur',
        'Il intègre nativement l’authentification et l’intégrité du message (AEAD) tout en étant très rapide',
        'Il ne nécessite pas de clés secrètes',
        'Il ne fonctionne que sur le port 80'
      ],
      correct: 1,
      exp: 'AES-GCM est un mode AEAD (Authenticated Encryption with Associated Data) combinant confidentialité et intégrité avec une excellente efficacité matérielle.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les trois éléments clés d’une chaîne de confiance PKI ?',
      a: 'L’Autorité de Certification (CA), le Certificat Serveur et les Certificats Clients.'
    },
    {
      q: 'À quoi sert une liste CRL ?',
      a: 'À invalider les certificats révoqués avant leur date d’expiration normale pour bloquer les accès compromis.'
    },
    {
      q: 'Quelle est la différence entre Full Tunneling et Split Tunneling ?',
      a: 'Full Tunneling route 100% du trafic par le VPN ; Split Tunneling route uniquement les réseaux d’entreprise désignés.'
    },
    {
      q: 'Quel est le rôle de la Phase 1 d’un tunnel IPsec IKEv2 ?',
      a: 'Authentifier mutuellement les passerelles et établir le canal de contrôle sécurisé (IKE SA).'
    },
    {
      q: 'Quel est le protocole IPsec assurant le chiffrement et l’intégrité des charges utiles ?',
      a: 'ESP (Encapsulating Security Payload - protocole IP 50).'
    },
    {
      q: 'Pourquoi bannir DES et 3DES des configurations IPsec ?',
      a: 'Leurs tailles de clés et de blocs (64 bits) sont vulnérables aux attaques modernes (Sweet32, cassage par force brute).'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à articuler la chaîne de confiance X.509 ou confusion entre la Phase 1 et la Phase 2 IPsec.'
    },
    {
      cls: 'medium',
      text: 'Déploiement complet d’un serveur OpenVPN nomade avec CRL et configuration d’un tunnel IPsec site-à-site standard.'
    },
    {
      cls: 'high',
      text: 'Conception d’architectures VPN d’entreprise résilientes, durcissement cryptographique de pointe (ANSSI/NIST) et gestion avancée de la PKI.'
    }
  ]
};
