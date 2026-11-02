/**
 * Chapitre 5 du cours « pfSense & Routage B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Tunnels VPN Sécurisés : OpenVPN (SSL/TLS) &amp; IPsec Site-à-Site',
  short: 'Tunnels VPN (OpenVPN &amp; IPsec)',
  toc: 'PKI interne pfSense, OpenVPN nomade SSL/TLS, révocation CRL, IPsec IKEv2 site-à-site, choix cryptographiques et Split vs Full Tunneling.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Avec la généralisation du télétravail et l’interconnexion de sites géographiquement distants (siège social, filiales, datacenters), le réseau étendu de l’entreprise repose sur des tunnels chiffrés traversant l’Internet non sécurisé. pfSense intègre une infrastructure à clés publiques (PKI X.509) native ainsi que les deux piliers industriels du VPN : OpenVPN (SSL/TLS) pour les accès nomades flexibles et IPsec IKEv2 pour les liaisons site-à-site haute performance. L’ingénieur sécurité doit maîtriser la chaîne de confiance et les listes de révocation (CRL), choisir les paramètres cryptographiques selon une politique datée et la compatibilité des pairs, et arbitrer entre Split Tunneling et Full Tunneling.',
  objectives: [
    'déployer et administrer une Infrastructure à Clés Publiques (PKI X.509) complète dans le Certificate Manager de pfSense ;',
    'gérer le cycle de vie des certificats numériques clients et révoquer les accès compromis via la CRL ;',
    'configurer un serveur OpenVPN nomade sécurisé en mode SSL/TLS + User Auth (double authentification) ;',
    'interconnecter deux infrastructures d’entreprise via un tunnel IPsec IKEv2 site-à-site avec négociation Phase 1 et Phase 2 ;',
    'évaluer les propositions cryptographiques selon une politique datée et les capacités des deux pairs ;',
    'analyser des grilles pédagogiques de certificats PKI, de propositions IPsec et de routage VPN.'
  ],
  sections: [
      {
        "title": "Prérequis intégré : Fondements de la PKI X.509 et des phases IPsec IKEv2 (lien avec Cryptographie B3)",
        "html": "<div class=\"box box--intuition\"><div class=\"box__title\">Maîtriser les briques cryptographiques avant de configurer OpenVPN et IPsec (voir aussi le cours Cryptographie &amp; PKI B3)</div><ul><li><strong>PKI X.509 (Infrastructure à Clés Publiques) :</strong> une Autorité de Certification racine (<strong>CA</strong>) signe numériquement le certificat du serveur VPN et les certificats des clients. La <strong>CRL (Certificate Revocation List)</strong> signale les certificats révoqués ; son effet dépend de sa publication, de sa mise à jour et de son contrôle effectif par le service ;</li><li><strong>IPsec IKEv2 en deux phases :</strong> la <strong>Phase 1 (IKE SA)</strong> authentifie les deux pare-feux entre eux et établit un canal de contrôle chiffré grâce à l’échange de clés <em>Diffie-Hellman</em>, au chiffrement symétrique <em>AES-GCM</em> et à l’empreinte <em>SHA-256</em> ; la <strong>Phase 2 (Child SA / ESP)</strong> chiffre et achemine ensuite les paquets de données réels entre les sous-réseaux distants.</li></ul></div>"
      },
    {
      title: 'Infrastructure à Clés Publiques (PKI X.509) Interne sous pfSense',
      html: [
        '<p>Pour authentifier les serveurs et les postes clients distants, pfSense intègre un gestionnaire de certificats numériques (<em>System &gt; Certificates</em>, appelé <em>Cert. Manager</em> selon la version) permettant d’opérer en tant qu’<strong>Autorité de Certification (CA) racine</strong> d’entreprise.</p>',
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
        '      <li><strong>Certificate Revocation List (CRL) :</strong> liste signée recensant les numéros de série des certificats révoqués avant expiration. La révocation doit être publiée puis la CRL distribuée et actualisée sur le serveur : un délai peut donc subsister entre le signalement et sa prise en compte.</li>',
        '      <li>Dans <em>VPN &gt; OpenVPN &gt; Servers</em>, modifier les paramètres cryptographiques du serveur : <strong>Peer Certificate Revocation List</strong> est facultatif et doit être réglé sur la CRL pertinente. Lorsqu’une CRL appropriée, valide et à jour est effectivement lue et contient le numéro du certificat, une nouvelle connexion utilisant ce certificat est refusée. Les libellés peuvent varier selon la version.</li>',
        '      <li>Une CRL importée depuis une CA externe doit être mise à jour dans pfSense ; vérifier son émetteur, sa signature, ses dates <code>thisUpdate</code> et <code>nextUpdate</code>, ainsi que le numéro de série. Une liste encore valide peut ne pas contenir une révocation pas encore publiée.</li>',
        '      <li>La documentation OpenVPN 2.6 indique qu’une CRL pertinente manquante peut produire un avertissement tout en laissant la connexion se poursuivre. Ne pas présumer d’un refus automatique : contrôler la configuration et les journaux, puis effectuer, dans un environnement autorisé, une tentative avec un certificat de test révoqué et une autre avec un certificat non révoqué.</li>',
        '      <li>La mise à jour de la CRL ne garantit pas la coupure d’une session déjà établie : déconnecter séparément la session compromise et vérifier qu’une reconnexion est refusée.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<p><small>Sources consultées le 30 octobre 2026 : <a href="https://www.rfc-editor.org/rfc/rfc5280.html#section-3.3">RFC 5280, § 3.3 et 5.1.2.5 (mai 2008)</a> ; <a href="https://docs.netgate.com/pfsense/en/latest/vpn/openvpn/configure-server-crypto.html">Netgate, paramètres cryptographiques OpenVPN (23 décembre 2025)</a> ; <a href="https://docs.netgate.com/pfsense/en/latest/certificates/crl.html">Netgate, gestion des CRL (15 décembre 2025)</a> ; <a href="https://openvpn.net/community-docs/community-articles/openvpn-2-6-manual/">manuel OpenVPN 2.6, option crl-verify</a>.</small></p>'
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
        '    <h4>2. Choix cryptographiques et compatibilité IKEv2</h4>',
        '    <p>Ces exemples ne suffisent pas à établir une conformité ANSSI ou NIST : appliquer la politique datée de l’organisation et vérifier les paramètres disponibles et communs aux deux pairs.</p>',
        '    <ul>',
        '      <li><strong>À écarter :</strong> DES, 3DES, Blowfish, MD5, SHA-1 et les groupes DH 1, 2, 5, 22, 23 et 24 selon la politique retenue. En particulier, le groupe 22 est un groupe MODP 1024 bits déprécié, et non une courbe P-256.</li>',
        '      <li><strong>Chiffrement recommandé :</strong> AES-GCM (128 ou 256 bits) qui combine chiffrement et authentification en une seule opération (AEAD), ou AES-CBC avec HMAC-SHA256.</li>',
        '      <li><strong>Exemples d’échange de clés :</strong> groupe 14 (MODP 2048 bits), groupe 19 (ECP P-256) ou groupe 20 (ECP P-384), si autorisés et compatibles. Les identifiants IANA ne sont pas ordonnés par force : un groupe non cité, comme 31 (Curve25519), ne doit être ni approuvé ni qualifié de faible sur son seul numéro.</li>',
        '      <li><strong>Phase 2 et PFS :</strong> une phase 2 peut être configurée sans échange DH supplémentaire. Pour IKEv2, le premier Child SA utilise le groupe de la phase 1 ; le réglage PFS de phase 2 intervient pour les Child SA suivants et les renouvellements. Vérifier les propositions et la prise en charge des deux côtés.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<p><small>Sources consultées le 30 octobre 2026 : <a href="https://www.iana.org/assignments/ikev2-parameters/ikev2-parameters.xhtml">registre IANA IKEv2, type 4 (mis à jour le 28 octobre 2026)</a> ; <a href="https://www.rfc-editor.org/rfc/rfc8247.html#section-2.4">RFC 8247, § 2.4 (septembre 2017)</a>, mise à jour par la <a href="https://www.rfc-editor.org/rfc/rfc9395.html">RFC 9395 (avril 2023)</a> ; <a href="https://docs.netgate.com/pfsense/en/latest/vpn/ipsec/configure-p1.html">Netgate, phase 1 IPsec (23 décembre 2025)</a>.</small></p>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Créer l’Autorité de Certification racine (CA) interne dans System > Certificates (Cert. Manager selon la version).',
    'Étape 2 : Émettre le certificat du serveur OpenVPN et générer les certificats utilisateurs individuels.',
    'Étape 3 : Publier la CRL, la sélectionner sur le serveur OpenVPN, la maintenir à jour et vérifier le refus d’un certificat de test révoqué ; déconnecter séparément les sessions compromises.',
    'Étape 4 : Déployer le serveur OpenVPN en mode SSL/TLS + User Auth et configurer le réseau de tunnel (IPv4 Tunnel Network).',
    'Étape 5 : Pour les liaisons inter-sites, choisir des groupes IKEv2 explicitement autorisés et compatibles avec les deux pairs, puis configurer ESP et, si requis, PFS en phase 2.',
    'Étape 6 : Installer le package OpenVPN Client Export pour distribuer les profils .ovpn pré-configurés aux collaborateurs.'
  ],
  summary: [
    'pfSense gère une PKI X.509 complète comprenant CA racine, certificats serveurs, certificats clients et listes CRL.',
    'Une CRL sélectionnée, à jour et effectivement contrôlée bloque les nouvelles connexions dont le certificat y figure ; sa publication et sa mise à jour peuvent prendre du temps.',
    'OpenVPN en mode SSL/TLS + User Auth combine certificat cryptographique et identifiants utilisateur (2FA logique).',
    'Full Tunneling achemine 100% des flux par pfSense ; Split Tunneling cible uniquement les réseaux d’entreprise.',
    'IPsec IKEv2 négocie la gestion en Phase 1 (IKE SA) et le chiffrement des données métiers en Phase 2 (ESP).',
    'Les groupes IKEv2 sont identifiés par une liste explicite, non par un seuil numérique : 22 est un groupe MODP 1024 bits déprécié malgré son numéro supérieur à 19.'
  ],
  checklist: [
    'Je sais créer une Autorité de Certification (CA) interne et émettre un certificat utilisateur.',
    'Je sais sélectionner et actualiser une CRL, vérifier son application et traiter une session déjà établie.',
    'Je sais différencier les impacts techniques et sécuritaires du Split Tunneling et du Full Tunneling.',
    'Je connais la différence entre la Phase 1 (IKE SA) et la Phase 2 (Child SA / ESP) d’un tunnel IPsec.',
    'Je sais reconnaître les groupes 14, 19, 20 et 22 sans classer leur sécurité par numéro, et vérifier les capacités des pairs.',
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
    'Politique cryptographique datée et compatibilité des pairs'
  ],
  pitfalls: [
    'Oublier de sélectionner ou d’actualiser la CRL du serveur OpenVPN, ou supposer qu’une session active est automatiquement coupée.',
    'Utiliser le mode OpenVPN en clé partagée statique (Shared Key) pour des déploiements multi-utilisateurs.',
    'Classer les groupes Diffie-Hellman par numéro et accepter à tort le groupe 22 déprécié.',
    'Configurer le Full Tunneling sans anticiper la saturation de la bande passante descendante du WAN d’entreprise.'
  ],
  questions: [
    {
      stem: 'Où sont centralisées la création d’Autorités de Certification et l’émission de certificats sous pfSense ?',
      opts: [
        'Firewall > Rules',
        'System > Certificates (Cert. Manager selon la version)',
        'VPN > OpenVPN > Clients',
        'Status > Services'
      ],
      correct: 1,
      exp: 'Le menu System > Certificates (Cert. Manager selon la version) gère les CAs, les certificats serveurs/clients et les listes de révocation (CRL).'
    },
    {
      stem: 'Quand une CRL peut-elle bloquer une nouvelle connexion OpenVPN avec un certificat révoqué ?',
      opts: [
        'Dès le signalement, même si la CRL n’est pas publiée ou sélectionnée',
        'Lorsque la CRL pertinente, à jour et sélectionnée est effectivement lue et contient le numéro du certificat',
        'Toujours immédiatement, y compris pour toutes les sessions déjà établies',
        'Uniquement lorsque la CRL est absente du serveur'
      ],
      correct: 1,
      exp: 'La sélection de la CRL est facultative et sa publication peut prendre du temps. Vérifier la liste appliquée et la reconnexion ; une session existante peut nécessiter une déconnexion séparée.'
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
      stem: 'Quelle association d’identifiants IKEv2 et de groupes est correcte ?',
      opts: [
        'Le groupe 22 est une courbe P-384 et tous les numéros supérieurs à 19 sont plus forts',
        'Le groupe 14 est P-256 et le groupe 19 est MODP 1024 bits',
        'Le groupe 14 est MODP 2048 bits, le 19 est P-256 et le 22 est MODP 1024 bits déprécié',
        'Tout groupe portant un numéro supérieur à 14 est automatiquement autorisé'
      ],
      correct: 2,
      exp: 'Le registre IANA attribue ces identifiants sans classement par force. Le choix dépend de la politique datée et de la compatibilité des deux pairs.'
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
      a: 'À signaler les certificats révoqués : elle doit être publiée, actualisée et sélectionnée pour contrôler les nouvelles connexions ; une session active peut subsister.'
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
