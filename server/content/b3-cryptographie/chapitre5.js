/**
 * Chapitre 5 du cours « Cryptographie & PKI B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Signatures Numériques, PKI & Gestion des Certificats X.509',
  short: 'Signatures, PKI &amp; X.509',
  toc: 'Mécanisme formel de la signature numérique (RSA Sign & Verify, RSA-PSS, ECDSA, Ed25519), non-répudiation et authenticité d\'origine, architecture d\'une Infrastructure à Clés Publiques (PKI / IGC), hiérarchie de confiance (Root CA, Sub-CA intermédiaire), norme de certificats X.509 v3 (RFC 5280), extensions critiques (SAN, Key Usage, Basic Constraints), cycle de vie d\'un certificat (CSR), validation de chaîne de certification et mécanismes de révocation (CRL, OCSP et OCSP Stapling).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans un écosystème d\'entreprise interconnecté où les services web, les API bancaires, les signatures de code et les accès VPN reposent tous sur des certificats électroniques, une mauvaise gestion de la PKI conduit inévitablement à des pannes massives (certificats expirés coupant la production) ou à des failles de sécurité critiques (usurpation d\'identité, acceptation de certificats frauduleux ou révoqués). En tant qu\'ingénieur sécurité des systèmes d\'information B3, vous devez être capable de déployer et d\'auditer une hiérarchie PKI à plusieurs niveaux, de valider la conformité des certificats X.509 face aux exigences des navigateurs et des autorités de régulation, d\'implémenter des mécanismes de signature numérique intègres et de configurer des contrôles de révocation stricts via CRL et OCSP.',
  objectives: [
    'maîtriser le fonctionnement mathématique et technique des signatures numériques (RSA, ECDSA, Ed25519) ;',
    'comprendre l\'architecture et les rôles fondamentaux d\'une PKI : Root CA, Sub-CA intermédiaire, Autorité d\'Enregistrement (RA) et magasins de confiance ;',
    'analyser la structure d\'un certificat X.509 v3 (RFC 5280) et ses extensions clés : SAN, Basic Constraints, Key Usage ;',
    'implémenter l\'algorithme de validation de chaîne de certification de l\'entité finale jusqu\'à l\'ancre de confiance racine ;',
    'évaluer et configurer les mécanismes de révocation de certificats : Listes de Révocation (CRL), requêtes OCSP et agrafage OCSP Stapling ;',
    'analyser et résoudre méthodologiquement des vérificateurs de signatures RSA, des valideurs de certificats X.509 et des contrôleurs de chaînes PKI avec support CRL.'
  ],
  sections: [
    {
      title: 'Signatures Numériques : RSA Sign &amp; Verify, ECDSA et Ed25519',
      html: [
        '<p>La signature numérique est l\'équivalent électronique certifié d\'une signature manuscrite notariée. Contrairement au chiffrement (qui assure la confidentialité), la signature apporte trois garanties indispensables : l\'<strong>authenticité de l\'émetteur</strong>, l\'<strong>intégrité du document</strong> et la <strong>non-répudiation</strong>.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Mécanisme de Signature RSA</h4>',
        '    <p>Signer un document volumineux directement par exponentiation modulaire serait trop lent. On signe donc le condensé de hachage $H(M)$ :</p>',
        '    <ol>',
        '      <li><strong>Hachage :</strong> calcul de l\'empreinte $h = H(M)$ (ex: SHA-256).</li>',
        '      <li><strong>Signature (clé privée de l\'émetteur) :</strong><br><code>sig = (h^d) mod n</code></li>',
        '      <li><strong>Vérification (clé publique de l\'émetteur) :</strong><br>Le destinataire calcule $h\' = (sig^e) \\pmod n$ et vérifie si $h\' == H(M)$.</li>',
        '      <li>Si l\'égalité est vérifiée, seul le détenteur de la clé privée $d$ a pu créer cette signature et le message n\'a pas été altéré.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Signatures Modernes : ECDSA vs EdDSA (Ed25519)</h4>',
        '    <ul>',
        '      <li><strong>ECDSA (Elliptic Curve DSA) :</strong> standard ANSI X9.62 utilisé dans Bitcoin et TLS. Vulnérabilité majeure : si le nombre aléatoire $k$ (nonce) est réutilisé ou biaisé, la clé privée est instantanément divulguée (faille de la PlayStation 3 en 2010).</li>',
        '      <li><strong>EdDSA / Ed25519 (RFC 8032) :</strong> signature déterministe basée sur la courbe d\'Edwards Twisted Curve25519. Aucun aléa requis lors de la signature ($k = H(sk \\parallel M)$), immunité totale contre les attaques par canal auxiliaire et performances exceptionnelles. Standard recommandé par l\'ANSSI et OpenSSH.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('standard', 'Schéma de Bourrage RSA-PSS (RFC 8017)', [
          '<p>Tout comme le chiffrement RSA exige le bourrage OAEP, la signature RSA en production doit utiliser <strong>RSA-PSS (Probabilistic Signature Scheme)</strong>. RSA-PSS ajoute un sel aléatoire lors de la signature, offrant une preuve de sécurité formelle dans le modèle du standard aléatoire.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Infrastructure à Clés Publiques (PKI / IGC) &amp; Hiérarchie de Confiance',
      html: [
        '<p>Une signature numérique ou une clé publique ne prouve pas en elle-même à qui elle appartient : Alice pourrait publier une clé publique prétendant être celle de Bob. L\'<strong>Infrastructure à Clés Publiques (PKI ou IGC)</strong> résout ce dilemme en introduisant des tiers de confiance accrédités :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Acteurs d\'une Architecture PKI</h4>',
        '    <ul>',
        '      <li><strong>Autorité de Certification Racine (Root CA) :</strong> sommet de la hiérarchie. Possède un certificat auto-signé hautement sécurisé, conservé hors-ligne (<em>offline Root CA</em>) dans un coffre-fort physique.</li>',
        '      <li><strong>Autorité de Certification Intermédiaire (Sub-CA / Issuing CA) :</strong> signée par la Root CA, elle prend en charge l\'émission quotidienne des certificats finaux des serveurs et utilisateurs.</li>',
        '      <li><strong>Autorité d\'Enregistrement (RA) :</strong> valide l\'identité physique ou administrative des demandeurs avant d\'autoriser l\'émission.</li>',
        '      <li><strong>Magasin de Confiance (Trust Store) :</strong> répertoire de certificats racines préinstallé dans l\'OS ou le navigateur (Mozilla, Windows, Android, Apple).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Pourquoi une Hiérarchie à Plusieurs Niveaux ?</h4>',
        '    <p>Isoler la Root CA est une exigence de sécurité critique : si la clé privée de signature d\'une Sub-CA est compromise par un piratage, seule cette Sub-CA est révoquée. La Root CA reste intacte et émet une nouvelle Sub-CA sans obliger les millions de clients mondiaux à mettre à jour leur magasin de confiance racine.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Format X.509 v3, Encodage ASN.1 &amp; Extensions Critiques',
      html: [
        '<p>Le format X.509 v3 (défini par la RFC 5280) spécifie la structure standard d\'un certificat électronique. Il est encodé en binaire selon la syntaxe ASN.1 / DER (Distinguished Encoding Rules), couramment converti en texte ASCII Base64 encadré de balises <code>-----BEGIN CERTIFICATE-----</code> (format PEM) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Champs Fondamentaux X.509</h4>',
        '    <ul>',
        '      <li><strong>Version :</strong> v3 (valeur binaire 2).</li>',
        '      <li><strong>Serial Number :</strong> identifiant entier unique attribué par la CA.</li>',
        '      <li><strong>Signature Algorithm :</strong> algorithme utilisé par la CA (ex: <code>sha256WithRSAEncryption</code>).</li>',
        '      <li><strong>Issuer :</strong> nom distingué (DN) de l\'autorité émettrice.</li>',
        '      <li><strong>Validity :</strong> période délimitée par <code>notBefore</code> et <code>notAfter</code>.</li>',
        '      <li><strong>Subject :</strong> nom distingué (DN) du propriétaire de la clé.</li>',
        '      <li><strong>Subject Public Key Info :</strong> clé publique et algorithme.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Extensions Standard RFC 5280</h4>',
        '    <ul>',
        '      <li><strong>Subject Alternative Name (SAN) :</strong> obligatoire pour TLS ! Liste les FQDN couverts (ex: <code>api.cloud.corp</code>, wildcards <code>*.cloud.corp</code>). Le champ historique CN (Common Name) est déprécié par les navigateurs modernes.</li>',
        '      <li><strong>Basic Constraints :</strong> <code>CA:TRUE</code> ou <code>CA:FALSE</code>, avec contrainte optionnelle <code>pathlen</code> limitant la profondeur de sous-CA autorisées.</li>',
        '      <li><strong>Key Usage :</strong> restreint l\'usage légitime de la clé (ex: <code>digitalSignature</code>, <code>keyEncipherment</code>, <code>keyCertSign</code>).</li>',
        '      <li><strong>Extended Key Usage (EKU) :</strong> <code>serverAuth</code> (serveur Web TLS), <code>clientAuth</code> (mTLS), <code>codeSigning</code>.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('warning', 'Règles de Correspondance des Noms d\'Hôtes et Wildcards', [
          '<p>Un certificat wildcard <code>*.domaine.corp</code> ne couvre qu\'un seul niveau de sous-domaine : il valide <code>web.domaine.corp</code> ou <code>api.domaine.corp</code>, mais <strong>ne valide jamais</strong> <code>app.preprod.domaine.corp</code> ni le domaine apex <code>domaine.corp</code>.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Cycle de Vie, Algorithme de Validation &amp; Révocation (CRL / OCSP)',
      html: [
        '<p>Le cycle de vie d\'un certificat comprend sa création (génération d\'une clé privée et d\'un CSR - <em>Certificate Signing Request</em> selon PKCS#10), sa signature par la CA, sa surveillance et sa révocation en cas de compromission :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Algorithme de Validation de Chaîne (RFC 5280)</h4>',
        '    <p>Pour qu\'un certificat feuille soit déclaré valide par un client :</p>',
        '    <ol>',
        '      <li>La date courante doit être comprise entre <code>notBefore</code> et <code>notAfter</code>.</li>',
        '      <li>Le FQDN contacté doit correspondre au SAN du certificat.</li>',
        '      <li>La signature de chaque certificat $i$ doit être validée avec la clé publique du certificat émetteur $i+1$.</li>',
        '      <li>Le certificat émetteur doit posséder <code>Basic Constraints: CA:TRUE</code>.</li>',
        '      <li>La chaîne doit remonter jusqu\'à un certificat racine présent dans le magasin de confiance local (Trust Anchor).</li>',
        '      <li>Aucun certificat de la chaîne ne doit figurer comme révoqué.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Mécanismes de Révocation : CRL vs OCSP</h4>',
        '    <ul>',
        '      <li><strong>CRL (Certificate Revocation List) :</strong> fichier signé par la CA listant les numéros de série révoqués avec la date de révocation. Inconvénients : taille volumineuse, latence de téléchargement et risque de contournement en cas de panne réseau (échec silencieux <em>soft-fail</em>).</li>',
        '      <li><strong>OCSP (Online Certificate Status Protocol, RFC 6960) :</strong> requête HTTP interrogeant en temps réel le répondeur de la CA pour un numéro de série précis. Réponse immédiate : <code>good</code>, <code>revoked</code> ou <code>unknown</code>.</li>',
        '      <li><strong>OCSP Stapling (RFC 6066) :</strong> le serveur web interroge périodiquement le répondeur OCSP, met en cache la réponse signée par la CA et l\'« agrafe » directement dans le handshake TLS. Élimine la fuite de métadonnées de navigation vers la CA et accélère la connexion.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Conception et sécurisation de la hiérarchie PKI : déployer une autorité racine (Root CA) hors-ligne et déléguer l\'émission à des autorités intermédiaires (Sub-CA) avec contraintes de chemin pathlen adaptées.',
    'Génération de requêtes CSR et émission conforme X.509 v3 : configurer rigoureusement les extensions Subject Alternative Name (SAN), Key Usage et Extended Key Usage sans s\'appuyer sur le champ déprécié Common Name.',
    'Validation algorithmique de la chaîne de certification : vérifier séquentiellement les périodes de validité, la correspondance du nom d\'hôte FQDN, les signatures croisées et l\'ancre de confiance racine du magasin local.',
    'Gestion proactive du cycle de vie et de la révocation : auditer les expirations de certificats, surveiller les numéros de série révoqués via CRL/OCSP et activer systématiquement l\'agrafage OCSP Stapling sur les serveurs web.'
  ],
  summary: [
    'La signature numérique certifie l\'authenticité, l\'intégrité et la non-répudiation en chiffrant l\'empreinte du message avec la clé privée de l\'émetteur.',
    'Une PKI résout le problème de distribution des clés publiques grâce à une hiérarchie de confiance (Root CA, Sub-CA, certificats finaux).',
    'La norme X.509 v3 (RFC 5280) structure les certificats et impose l\'extension SAN (Subject Alternative Name) pour la validation des noms de domaine.',
    'Un certificat intermédiaire doit obligatoirement porter la contrainte Basic Constraints CA:TRUE pour signer d\'autres certificats.',
    'La révocation de clés compromises s\'effectue via les listes CRL ou en temps réel via OCSP, optimisé par l\'agrafage OCSP Stapling dans TLS.'
  ],
  checklist: [
    'Savez-vous expliquer le fonctionnement d\'une signature RSA (hachage puis exponentiation avec clé privée) et sa vérification avec la clé publique ?',
    'Comprenez-vous pourquoi la Root CA doit être conservée hors-ligne dans une architecture PKI d\'entreprise ?',
    'Pouvez-vous citer les extensions critiques indispensables d\'un certificat X.509 TLS (SAN, Basic Constraints, Key Usage) ?',
    'Savez-vous dérouler les étapes de validation d\'une chaîne de confiance PKI de la feuille jusqu\'à la racine ?',
    'Connaissez-vous les différences et les avantages comparés entre CRL, requête OCSP directe et agrafage OCSP Stapling ?'
  ],
  notions: [
    { term: 'Signature Numérique', def: 'Mécanisme cryptographique assurant l\'intégrité, l\'authenticité et la non-répudiation d\'un document en associant son empreinte à la clé privée du signataire.' },
    { term: 'Infrastructure à Clés Publiques (PKI)', def: 'Ensemble de matériels, logiciels, politiques et procédures nécessaires pour créer, gérer, distribuer et révoquer des certificats numériques.' },
    { term: 'Certificat X.509', def: 'Document numérique standardisé liant l\'identité d\'une entité à sa clé publique, signé par une autorité de certification reconnue.' },
    { term: 'Subject Alternative Name (SAN)', def: 'Extension X.509 spécifiant l\'ensemble des noms de domaine, adresses IP ou URI légitimes couverts par le certificat.' },
    { term: 'OCSP Stapling', def: 'Technique TLS où le serveur web fournit lui-même au client une preuve signée et horodatée de non-révocation émise par la CA.' }
  ],
  pitfalls: [
    'N\'inscrire le nom de domaine que dans le champ historique Common Name (CN) sans renseigner l\'extension SAN : les navigateurs modernes rejettent le certificat.',
    'Omettre le paramètre Basic Constraints CA:TRUE sur une autorité intermédiaire : les clients rejetteront tous les certificats émis par cette autorité.',
    'Utiliser des wildcards à plusieurs niveaux (ex: *.corp.com pour héberger api.prod.corp.com) : les règles RFC 6125 limitent le joker à un seul label DNS.',
    'Négliger la révocation en supposant qu\'un certificat reste sûr jusqu\'à sa date d\'expiration : en cas de fuite de clé privée, l\'attaquant peut usurper l\'identité sans être inquiété si aucune CRL/OCSP n\'est consultée.'
  ],
  questions: [
    {
      stem: 'Dans une signature numérique RSA, quelle clé est utilisée pour créer la signature et quelle clé est utilisée pour la vérifier ?',
      opts: ['Création avec la clé publique, vérification avec la clé privée', 'Création avec la clé privée de l\'émetteur, vérification avec la clé publique de l\'émetteur', 'Création avec la clé symétrique AES, vérification avec le mot de passe', 'Création avec la clé privée du destinataire, vérification avec sa clé publique'],
      correct: 1,
      exp: 'L\'émetteur signe le condensé du message avec sa propre clé privée (que lui seul possède), et tout destinataire peut vérifier la signature en utilisant la clé publique correspondante.'
    },
    {
      stem: 'Quel champ d\'extension X.509 v3 est aujourd\'hui obligatoire pour valider la correspondance d\'un nom d\'hôte dans les navigateurs web ?',
      opts: ['Common Name (CN)', 'Subject Alternative Name (SAN)', 'Organizational Unit (OU)', 'Locality Name (L)'],
      correct: 1,
      exp: 'Le RFC 6125 et les exigences des navigateurs (Chrome, Firefox, Safari) imposent la présence du nom d\'hôte dans l\'extension Subject Alternative Name (SAN), le champ CN n\'étant plus pris en compte.'
    },
    {
      stem: 'Que signifie l\'extension « Basic Constraints: CA:FALSE » dans un certificat X.509 ?',
      opts: ['Le certificat est révoqué immédiatement', 'Le certificat appartient à une entité finale et ne peut en aucun cas signer d\'autres certificats', 'Le certificat est exempté de date d\'expiration', 'Le certificat ne fonctionne que sur le protocole HTTP'],
      correct: 1,
      exp: 'La contrainte CA:FALSE garantit que le certificat est un certificat feuille (serveur web ou utilisateur) et interdit strictement son utilisation pour émettre ou signer d\'autres certificats.'
    },
    {
      stem: 'Quel est l\'avantage majeur de l\'agrafage OCSP (OCSP Stapling) par rapport à une requête OCSP classique ?',
      opts: ['Il rend les certificats gratuits', 'Il évite au client de contacter la CA, préservant la vie privée et réduisant la latence de connexion', 'Il remplace le chiffrement AES par RSA', 'Il supprime le besoin d\'une autorité racine'],
      correct: 1,
      exp: 'Avec l\'OCSP Stapling, le serveur web envoie lui-même la réponse OCSP signée et en cache lors du handshake TLS, ce qui évite au client d\'interroger la CA (zéro fuite d\'historique de navigation et connexion plus rapide).'
    },
    {
      stem: 'Pour un certificat portant le SAN « *.domaine.fr », lequel de ces noms de domaine sera considéré comme INVALIDE ?',
      opts: ['www.domaine.fr', 'api.domaine.fr', 'mail.domaine.fr', 'espace.client.domaine.fr'],
      correct: 3,
      exp: 'Le caractère générique wildcard « * » ne remplace qu\'un seul sous-niveau DNS. Il ne couvre pas « espace.client.domaine.fr » (qui comporte deux sous-niveaux) ni le domaine racine « domaine.fr ».'
    }
  ],
  flashcards: [
    {
      q: 'Qu\'est-ce qui différencie fondamentalement le chiffrement asymétrique de la signature numérique ?',
      a: 'Le chiffrement assure la confidentialité (chiffré avec clé publique, lu avec clé privée). La signature assure l\'authenticité et l\'intégrité (signé avec clé privée, vérifié avec clé publique).'
    },
    {
      q: 'Quel est le rôle d\'une Autorité de Certification racine (Root CA) ?',
      a: 'Être l\'ancre de confiance suprême d\'une PKI en émettant et garantissant les certificats des autorités intermédiaires.'
    },
    {
      q: 'Qu\'est-ce qu\'une demande de signature de certificat (CSR - PKCS#10) ?',
      a: 'Un fichier contenant la clé publique du demandeur et ses informations d\'identité, signé avec sa clé privée, soumis à la CA pour signature.'
    },
    {
      q: 'Quelles sont les informations contenues dans une liste de révocation de certificats (CRL) ?',
      a: 'La liste signée par la CA des numéros de série des certificats révoqués, la date de révocation et la date de prochaine mise à jour de la liste.'
    },
    {
      q: 'Quelle est la limitation stricte d\'un certificat wildcard *.societe.com ?',
      a: 'Il ne couvre qu\'un seul niveau de sous-domaine (ex: test.societe.com) et ne protège ni societe.com ni sub.test.societe.com.'
    },
    {
      q: 'Qu\'est-ce que l\'algorithme de signature Ed25519 apporte par rapport à ECDSA ?',
      a: 'Une signature déterministe sans aléa sensible, immunisée contre les attaques par canal auxiliaire et extrêmement rapide.'
    }
  ],
  mastery: [
    {
      title: 'Implémentation de signatures numériques conformes',
      desc: 'Développer des mécanismes de signature et de vérification d\'empreintes de manière méthodique avec gestion d\'erreurs rigoureuse.'
    },
    {
      title: 'Déploiement et audit d\'architectures PKI multi-niveaux',
      desc: 'Configurer des autorités racines hors-ligne, des sous-CA d\'émission et des magasins de confiance d\'entreprise.'
    },
    {
      title: 'Validation automatisée de certificats X.509 v3',
      desc: 'Programmer des valideurs complets contrôlant dates d\'expiration, correspondances SAN, wildcards et contraintes Basic Constraints.'
    },
    {
      title: 'Vérification de chaîne de certification de bout en bout',
      desc: 'Implémenter l\'algorithme RFC 5280 de validation séquentielle des émetteurs jusqu\'à l\'ancre de confiance racine.'
    },
    {
      title: 'Supervision de la révocation et configuration OCSP Stapling',
      desc: 'Mettre en place la surveillance des listes CRL et activer l\'agrafage OCSP sur les serveurs de production.'
    }
  ]
};
