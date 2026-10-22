/**
 * Chapitre 5 du cours « Cybersécurité » B2 — Authentification, Gestion des Identités & Contrôle d'Accès.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Authentification, Gestion des Identités &amp; Contrôle d’Accès',
  short: 'Identités &amp; Contrôle d’Accès',
  toc: 'Stockage sécurisé de mots de passe (Argon2id, bcrypt, salage et étirement), MFA/TOTP (RFC 6238), architecture des jetons JWT (RFC 7519) et modèles d’autorisation DAC, MAC, RBAC et ABAC.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une base de données d’utilisateurs contenant 500 000 comptes est dérobée lors d’une brèche de sécurité. ' +
    'Si les mots de passe y sont stockés en clair ou avec un simple SHA-256 non salé, les pirates casseront 90 % d’entre eux ' +
    'en quelques heures à l’aide de tables arc-en-ciel (rainbow tables) et de plateformes de calcul GPU. ' +
    'Comment stocker les empreintes de manière indéchiffrable grâce au salage et aux algorithmes à mémoire dure comme Argon2id ? ' +
    'Comment sécuriser les APIs REST sans état avec des jetons JWT signés sans tomber dans le piège de la faille alg=none ? ' +
    'Comment orchestrer les autorisations des utilisateurs avec des matrices de rôles (RBAC) ? ' +
    'Ce module détaille la gestion de l’identité et de l’accès (IAM).',

  objectives: [
    'comprendre le rôle indispensable du salage cryptographique unique contre les attaques par dictionnaire et tables précalculées ;',
    'comparer les algorithmes de dérivation de clé modernes résistants au matériel dédié (Argon2id, bcrypt, PBKDF2) ;',
    'expliquer le fonctionnement d’un second facteur d’authentification par code temporaire TOTP (RFC 6238) ;',
    'décortiquer la structure interne d’un jeton JWT (Header, Payload, Signature) et contrer la vulnérabilité alg=none ;',
    'distinguer et implémenter les modèles de contrôle d’accès discrétionnaire (DAC), obligatoire (MAC) et basé sur les rôles (RBAC).'
  ],

  sections: [
    {
      title: 'Stockage des mots de passe : Salage, Épreuvage &amp; Fonctions de dérivation (KDF)',
      html: [
        '<p>Stocker un mot de passe avec une fonction de hachage rapide standard (MD5, SHA-1, ou même SHA-256 pur) est une grave erreur : ' +
        'des grappes de processeurs graphiques (GPU) modernes testent des dizaines de milliards de combinaisons par seconde.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">1. Le Salage cryptographique (Salt)</h4>',
        '    <p>Une chaîne aléatoire unique d’au moins 16 octets générée pour chaque utilisateur et concaténée au mot de passe avant hachage :</p>',
        '    <p><code>hash = KDF(mot_de_passe + sel_unique)</code></p>',
        '    <p>Le sel est stocké en clair avec l’empreinte. Il rend caduques toutes les tables arc-en-ciel précalculées ' +
        '    et garantit que deux utilisateurs ayant le même mot de passe auront deux empreintes radicalement différentes.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. L’Épreuvage &amp; Résistance mémoire (Argon2id)</h4>',
        '    <p>Pour contrer les fermes de calcul GPU et ASIC, les fonctions modernes imposent un coût calculatoire et mémoire configurable :</p>',
        '    <ul>',
        '      <li><strong>Argon2id :</strong> Standard recommandé mondialement (vainqueur du Password Hashing Competition), combinant résistance aux attaques par canal auxiliaire et aux ASICs.</li>',
        '      <li><strong>bcrypt :</strong> Standard historique robuste basé sur Blowfish avec coût temporel exponentiel.</li>',
        '      <li><strong>PBKDF2 :</strong> Recommandé par le NIST (avec &ge; 600 000 itérations de SHA-256).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Authentification multifacteur (MFA) &amp; Algorithme TOTP (RFC 6238)',
      html: [
        '<p>L’authentification robuste combine au moins deux facteurs indépendants issus de catégories distinctes :</p>',

        '<ul>',
        '  <li><strong>Facteur de connaissance :</strong> Ce que je sais (mot de passe, code secret).</li>',
        '  <li><strong>Facteur de possession :</strong> Ce que j’ai (smartphone, clé matérielle FIDO2 / YubiKey, carte à puce).</li>',
        '  <li><strong>Facteur d’inhérence :</strong> Ce que je suis (empreinte digitale, scan rétinien, reconnaissance faciale).</li>',
        '</ul>',

        box('info', 'Fonctionnement mathématique du TOTP (Time-Based One-Time Password)', [
          '<p>Le protocole <strong>TOTP</strong> (RFC 6238) utilisé par Google Authenticator ou FreeOTP calcule un code à 6 chiffres ' +
          'à partir d’un secret partagé <i>K</i> et du temps Unix courant <i>T</i> (par pas de 30 secondes) :</p>' +
          '<pre><code>// 1. Calcul du compteur de pas de temps de 30 secondes :\n' +
          'C = floor(timestamp_actuel / 30)\n\n' +
          '// 2. Calcul du HMAC-SHA1 de ce compteur avec la clé secrète partagée :\n' +
          'HMAC_res = HMAC_SHA1(K, C)\n\n' +
          '// 3. Tronquage dynamique pour extraire un code numérique à 6 chiffres</code></pre>' +
          '<p>Puisque le secret <i>K</i> n’est jamais retransmis sur le réseau après l’enrôlement initial (QR code), ' +
          'l’interception d’un code unique ne permet pas à un attaquant de prédire les codes futurs.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Architecture des jetons JWT (RFC 7519) &amp; Pièges de sécurité',
      html: [
        '<p>Les architectures d’API microservices et applications mobiles utilisent des jetons <strong>JWT</strong> ' +
        '(JSON Web Token) pour transmettre des informations d’identité de façon compacte et autonome (stateless).</p>',

        '<p>Un JWT est composé de trois blocs distincts séparés par des points et encodés en Base64URL :</p>',
        '<pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJ1c2VyIjoiYWxpY2UiLCJleHAiOjE3MDAwMDAwMDB9.s1gn4tur3...</code></pre>',

        '<table class="table">',
        '  <thead><tr><th>Partie</th><th>Nom</th><th>Contenu typique</th><th>Objectif</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Partie 1</strong></td><td>En-tête (Header)</td><td><code>{"alg": "HS256", "typ": "JWT"}</code></td><td>Indique l’algorithme cryptographique de signature utilisé.</td></tr>',
        '    <tr><td><strong>Partie 2</strong></td><td>Charge utile (Payload)</td><td><code>{"sub": "alice", "role": "admin", "exp": 1750000000}</code></td><td>Revendications (claims) : identifiant utilisateur, rôles, date d’expiration.</td></tr>',
        '    <tr><td><strong>Partie 3</strong></td><td>Signature (Signature)</td><td><code>HMACSHA256(base64Url(Header) + "." + base64Url(Payload), secret)</code></td><td>Garantit que le payload n’a pas été falsifié par le client.</td></tr>',
        '  </tbody>',
        '</table>',

        box('warning', 'La faille critique de l’algorithme « alg=none »', [
          '<p>La spécification JWT autorise un mode non signé où <code>"alg": "none"</code>. ' +
          'Si la bibliothèque backend accepte ce paramètre sans vérification stricte, un attaquant peut modifier son rôle ' +
          'en <code>"role": "admin"</code>, supprimer la signature, et obtenir tous les privilèges ! ' +
          'Un validateur de sécurité doit <strong>formellement rejeter</strong> tout jeton déclarant <code>alg: none</code>.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Modèles de contrôle d’accès : DAC, MAC, RBAC &amp; ABAC',
      html: [
        '<p>Une fois l’identité prouvée, le système applique un modèle formel d’autorisation pour décider de l’accès aux objets :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">DAC (Discretionary Access Control)</h4>',
        '    <p>Le propriétaire d’une ressource décide souverainement de qui a accès et avec quels droits (ex. permissions de fichiers UNIX <code>chmod 755</code>). Simple, mais propice aux erreurs de configuration humaine.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">MAC (Mandatory Access Control)</h4>',
        '    <p>L’autorité centrale du système impose des règles strictes basées sur des niveaux de classification (ex. Public, Secret Défense). Ni le créateur ni l’utilisateur ne peuvent modifier les droits (ex. SELinux, AppArmor).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">RBAC (Role-Based Access Control)</h4>',
        '    <p>Les permissions sont associées à des rôles (ex. <i>Lecteur, Gestionnaire, Administrateur</i>), et les utilisateurs sont rattachés à des rôles. Modèle de référence dans 95 % des applications d’entreprise.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">ABAC (Attribute-Based Access Control)</h4>',
        '    <p>Évalue dynamiquement un ensemble d’attributs contextuels : utilisateur (département), ressource (sensibilité), action (export), environnement (heure, adresse IP, localisation géographique).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Quel est le rôle fondamental du sel cryptographique (Salt) lors du stockage des mots de passe ?',
      opts: [
        'Rendre inopérantes les tables arc-en-ciel (rainbow tables) précalculées et garantir que deux mots de passe identiques produisent des empreintes distinctes',
        'Chiffrer le mot de passe pour qu’il puisse être relu en clair par l’administrateur',
        'Réduire la taille de l’empreinte stockée sur le disque dur',
        'Permettre la réinitialisation automatique du mot de passe par SMS'
      ],
      correct: 0,
      exp: 'Le sel est une valeur aléatoire unique par compte qui modifie l’entrée de la fonction de hachage. Les dictionnaires et tables de correspondance précalculées deviennent inutilisables car chaque utilisateur nécessite son propre calcul dédié.'
    },
    {
      stem: 'Pourquoi l’algorithme de hachage de mot de passe Argon2id est-il aujourd’hui recommandé plutôt qu’un simple SHA-256 ?',
      opts: [
        'Parce qu’il est intentionnellement lent et consomme une quantité importante de mémoire vive (mémoire dure), paralysant les attaques par GPU et circuits ASIC',
        'Parce que le SHA-256 a été mathématiquement cassé et ne produit plus d’empreintes',
        'Parce qu’Argon2id fonctionne sans aucun processeur physique',
        'Parce qu’il permet de se connecter sans avoir besoin de taper de mot de passe'
      ],
      correct: 0,
      exp: 'SHA-256 est optimisé pour être extrêmement rapide (idéal pour vérifier l’intégrité d’un gros fichier). À l’inverse, une fonction KDF de mot de passe comme Argon2id doit être coûteuse en temps et en RAM pour rendre la force brute économiquement prohibitive.'
    },
    {
      stem: 'Dans un jeton JWT valide, que garantit la troisième partie (la signature cryptographique) ?',
      opts: [
        'Que le contenu du payload n’a pas été falsifié ni altéré depuis son émission par le serveur',
        'Que les données du payload sont chiffrées et illisibles par le client',
        'Que le jeton sera éternellement valide sans jamais expirer',
        'Que la connexion réseau est protégée par un pare-feu matériel'
      ],
      correct: 0,
      exp: 'Un JWT standard n’est pas chiffré (le payload en Base64URL est lisible en clair). En revanche, la signature prouve l’intégrité et l’authenticité : toute altération d’un claim (comme le rôle) invalidera la signature.'
    },
    {
      stem: 'Quel modèle de contrôle d’accès permet d’autoriser un accès en évaluant des règles dynamiques telles que « autoriser si heure entre 8h et 18h ET connexion depuis la France » ?',
      opts: [
        'ABAC (Attribute-Based Access Control)',
        'DAC (Discretionary Access Control)',
        'RBAC (Role-Based Access Control)',
        'MAC (Mandatory Access Control)'
      ],
      correct: 0,
      exp: 'Le modèle ABAC évalue les attributs contextuels du sujet, de la ressource, de l’action et de l’environnement pour autoriser ou refuser dynamiquement l’accès.'
    }
  ],

  pitfalls: [
    'Utiliser le même sel global (pepper) pour tous les comptes au lieu de générer un sel aléatoire distinct par utilisateur.',
    'Faire confiance aux données contenues dans un JWT sans vérifier la signature avec la clé secrète ou la clé publique du serveur.',
    'Accepter un jeton JWT avec le champ d’en-tête "alg": "none" sous prétexte qu’aucun algorithme n’est spécifié.',
    'Négliger la révocation des jetons JWT : comme ils sont sans état, un JWT volé reste utilisable jusqu’à son expiration si aucune liste noire n’existe.',
    'Confondre un jeton JWT signé (JWS, lisible en clair) avec un jeton chiffré (JWE, dont le payload est opaque).'
  ],

  methodTitle: 'Protocole en 4 étapes pour sécuriser l’authentification et l’accès d’une API REST',
  method: [
    'Hacher et saler les identifiants avec Argon2id ou bcrypt en calibrant le coût calculatoire sur le serveur (au moins 300 ms par hachage).',
    'Activer le MFA obligatoire pour les comptes à privilèges avec validation de codes TOTP (RFC 6238).',
    'Émettre des jetons JWT à durée de vie courte (ex. 15 minutes) signés avec une clé asymétrique robuste (RS256 ou Ed25519) et forcer la vérification de la date d’expiration.',
    'Structurer les autorisations avec le modèle RBAC au niveau des routes et des contrôleurs d’accès aux entités métiers.'
  ],

  summary: [
    'Le salage aléatoire individuel neutralise définitivement les tables arc-en-ciel lors d’une fuite de base de données.',
    'Argon2id est le standard de référence mondial pour le hachage de mots de passe grâce à sa mémoire dure résistante aux attaques matérielles.',
    'Le MFA s’appuie sur au moins deux facteurs distincts (connaissance, possession, inhérence) et le protocole TOTP sur des pas de 30 secondes.',
    'Un jeton JWT comprend Header, Payload et Signature ; la signature doit être rigoureusement vérifiée et l’algorithme "none" formellement banni.',
    'Le contrôle d’accès d’entreprise repose majoritairement sur le modèle RBAC (rôles et permissions) complété par l’ABAC pour les règles contextuelles.'
  ],

  checklist: [
    'Je comprends l’effet mathématique du salage unique sur les attaques par force brute.',
    'Je sais expliquer pourquoi SHA-256 pur ne convient pas pour stocker des mots de passe.',
    'Je maîtrise le calcul du compteur de temps d’un code TOTP sur des tranches de 30 secondes.',
    'Je connais la structure des trois parties d’un JWT et les vulnérabilités classiques associées (alg=none).',
    'Je sais concevoir une matrice de droits RBAC associant utilisateurs, rôles et permissions.'
  ],

  notions: [
    'Salage cryptographique (Salt)',
    'Fonctions de dérivation de clé (KDF)',
    'Algorithmes Argon2id, bcrypt, PBKDF2',
    'Authentification multi-facteurs (MFA / 2FA)',
    'Algorithme TOTP (RFC 6238)',
    'Structure du JSON Web Token (JWT)',
    'Attaque JWT alg=none',
    'Contrôle d’accès discrétionnaire (DAC)',
    'Contrôle d’accès obligatoire (MAC)',
    'Contrôle d’accès basé sur les rôles (RBAC)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois le rôle du salage et la structure des trois parties d’un JWT.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le mécanisme de dérivation de clé et la matrice des rôles RBAC.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les principes de gestion des identités et du contrôle d’accès.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe à la détection d’intrusions, au SIEM et à la réponse à incident au module 6.' }
  ],

  flashcards: [
    { "q": 'Qu’est-ce que « Salage cryptographique (Salt) » ?', "a": 'Salage cryptographique (Salt)' },
    { "q": 'Qu’est-ce que « Fonctions de dérivation de clé (KDF) » ?', "a": 'Fonctions de dérivation de clé (KDF)' },
    { "q": 'Qu’est-ce que « Algorithmes Argon2id, bcrypt, PBKDF2 » ?', "a": 'Algorithmes Argon2id, bcrypt, PBKDF2' },
    { "q": 'Qu’est-ce que « Authentification multi-facteurs (MFA / 2FA) » ?', "a": 'Authentification multi-facteurs (MFA / 2FA)' },
    { "q": 'Qu’est-ce que « Algorithme TOTP (RFC 6238) » ?', "a": 'Algorithme TOTP (RFC 6238)' },
    { "q": 'Qu’est-ce que « Structure du JSON Web Token (JWT) » ?', "a": 'Structure du JSON Web Token (JWT)' },
    { "q": 'Qu’est-ce que « Attaque JWT alg=none » ?', "a": 'Attaque JWT alg=none : Une base de données d’utilisateurs contenant 500 000 comptes est dérobée lors d’une brèche de sécurité. Si les mots de passe y sont stockés en clair ou avec un simple SHA-256 non salé, les pirates casseront 90 % d’entre eux en quelques heures à l’aide de tables arc-en-ciel (rainb' },
    { "q": 'Qu’est-ce que « Contrôle d’accès discrétionnaire (DAC) » ?', "a": 'distinguer et implémenter les modèles de contrôle d’accès discrétionnaire (DAC), obligatoire (MAC) et basé sur les rôles (RBAC).' },
    { q: 'Pourquoi le salage aléatoire unique par compte empêche-t-il les attaques par tables arc-en-ciel ?', a: 'Parce que les empreintes précalculées deviennent inutilisables : chaque mot de passe salé nécessiterait de recalculer une table complète pour ce sel précis.' },
    { q: 'Quelle est la particularité d’Argon2id par rapport aux algorithmes classiques ?', a: 'Il est « à mémoire dure » (memory-hard), ce qui sature la mémoire vive et paralyse les puces d’attaque massivement parallèles (GPU, ASIC).' },
    { q: 'Quels sont les trois types de facteurs d’authentification existants ?', a: 'Ce que je sais (connaissance), ce que j’ai (possession) et ce que je suis (inhérence/biométrie).' },
    { q: 'Quelles sont les trois composantes séparées par des points d’un jeton JWT ?', a: 'Header (en-tête), Payload (charge utile de données) et Signature cryptographique.' },
    { q: 'En quoi consiste la faille JWT « alg=none » ?', a: 'À envoyer un jeton sans signature en précisant alg: none dans l’en-tête, incitant un serveur mal configuré à accepter des privilèges falsifiés.' },
    { q: 'Quelle est la différence fondamentale entre les modèles RBAC et ABAC ?', a: 'Le RBAC attribue des droits fixes selon le rôle de l’utilisateur, tandis que l’ABAC évalue dynamiquement des attributs contextuels (heure, IP, sensibilité de la donnée).' }
  ]
};
