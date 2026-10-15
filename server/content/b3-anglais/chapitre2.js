/**
 * Chapitre 2 du cours « Anglais B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Maîtrise de la Documentation Technique &amp; Spécifications d’API',
  short: 'Documentation Technique &amp; APIs',
  toc: 'Anatomie des spécifications d’API REST (OpenAPI, Swagger, endpoints, verbes HTTP, en-têtes et codes de statut 2xx/4xx/5xx), analyse des clauses normatives de la norme RFC 2119 (MUST, MUST NOT, SHOULD, SHOULD NOT, MAY) et conception de documentations de projets structurées (fichiers README.md professionnels).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Lors de l’intégration d’un nouveau service de paiement (Stripe), d’une passerelle SMS (Twilio) ou d’un microservice interne développé par une équipe basée à l’étranger, l’ingénieur doit être capable de lire, comprendre et auditer une documentation technique rédigée intégralement en anglais sans recourir à des outils de traduction approximatifs. Une mécompréhension des verbes normatifs d’une RFC (confondre SHOULD et MUST) ou l’ignorance des codes de statut HTTP expose l’architecture à des failles de sécurité majeures, des pertes de transactions ou des blocages d’intégration.',
  objectives: [
    'décortiquer la structure normalisée d’une documentation d’API REST (endpoints, paramètres d’URI, en-têtes Bearer et payloads JSON) ;',
    'interpréter les codes de statut HTTP standard (200, 201, 204, 400, 401, 403, 404, 500, 502, 503) et leurs implications opérationnelles ;',
    'auditer et classifier les clauses contractuelles d’une spécification technique selon les mots-clés normatifs de la RFC 2119 ;',
    'concevoir un fichier README.md technique conforme aux standards de l’industrie (prérequis, installation, configuration d’environnement et dépannage) ;',
    'développer en Python 3 des linters d’OpenAPI, des analyseurs de conformité RFC 2119 et des générateurs de sommaires Markdown avec ancres.'
  ],
  sections: [
    {
      title: 'Anatomie d’une Spécification d’API REST &amp; Standards OpenAPI',
      html: [
        '<p>Une documentation d’API de niveau industriel (OpenAPI / Swagger) formalise le contrat d’échange entre le fournisseur de service et les développeurs intégrateurs :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Verbes d’Action HTTP &amp; Idempotence</h4>',
        '    <ul>',
        '      <li><strong>GET (Read) :</strong> récupération de ressources sans effet de bord. Sûr et idempotent.</li>',
        '      <li><strong>POST (Create) :</strong> création d’une nouvelle ressource ou déclenchement d’un traitement. Non idempotent (deux appels créent deux ressources distinctes).</li>',
        '      <li><strong>PUT (Replace) :</strong> remplacement intégral d’une ressource existante à l’URI spécifiée. Idempotent.</li>',
        '      <li><strong>PATCH (Update) :</strong> modification partielle des attributs d’une ressource existante. Généralement non idempotent.</li>',
        '      <li><strong>DELETE (Remove) :</strong> suppression définitive de la ressource. Idempotent.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Codes de Statut HTTP et Gestion des Erreurs</h4>',
        '    <ul>',
        '      <li><strong>2xx Success :</strong> <code>200 OK</code> (succès avec contenu), <code>201 Created</code> (ressource créée), <code>204 No Content</code> (succès sans corps renvoyé, typique sur DELETE).</li>',
        '      <li><strong>4xx Client Error :</strong> <code>400 Bad Request</code> (syntaxe JSON invalide), <code>401 Unauthorized</code> (token manquant ou invalide), <code>403 Forbidden</code> (droits insuffisants), <code>404 Not Found</code>.</li>',
        '      <li><strong>5xx Server Error :</strong> <code>500 Internal Server Error</code> (exception non gérée), <code>502 Bad Gateway</code> (serveur amont injoignable), <code>503 Service Unavailable</code> (surcharge temporaire), <code>504 Gateway Timeout</code>.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Norme RFC 2119 : Mots-clés Normatifs d’Exigence Technique',
      html: [
        '<p>Rédigée par Scott Bradner en 1997 pour l’IETF, la norme <b>RFC 2119</b> élimine toute subjectivité dans la rédaction des spécifications logicielles et protocolaires :</p>',
        '<table class="table">',
        '  <thead><tr><th>Mot-clé Normatif</th><th>Degré d’Obligation</th><th>Conséquence pour l’Ingénieur</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>MUST / REQUIRED / SHALL</strong></td><td>Exigence absolue (P1)</td><td>Le système n’est pas interopérable ou non conforme s’il ne respecte pas cette directive. Aucun compromis toléré.</td></tr>',
        '    <tr><td><strong>MUST NOT / SHALL NOT</strong></td><td>Interdiction absolue (P1)</td><td>Comportement formellement prohibé. L’implémentation de ce comportement invalide la certification.</td></tr>',
        '    <tr><td><strong>SHOULD / RECOMMENDED</strong></td><td>Forte recommandation (P2)</td><td>Des raisons valables peuvent exister dans des circonstances particulières pour ne pas l’appliquer, mais le choix doit être motivé et documenté.</td></tr>',
        '    <tr><td><strong>SHOULD NOT / NOT RECOMMENDED</strong></td><td>Pratique déconseillée (P2)</td><td>Comportement indésirable qui doit être évité sauf justification technique explicite.</td></tr>',
        '    <tr><td><strong>MAY / OPTIONAL</strong></td><td>Option purement facultative (P3)</td><td>L’implémenteur peut librement choisir d’inclure ou non l’élément sans compromettre l’interopérabilité générale.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Conception d’un README.md Professionnel : Clarté &amp; Reproductibilité',
      html: [
        '<p>Le fichier <code>README.md</code> constitue la vitrine technique et le premier point de contact avec un référentiel de code. Un bon README permet à un nouvel ingénieur d’exécuter le projet en moins de 5 minutes :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Six Sections Obligatoires d’un README</h4>',
        '    <ol>',
        '      <li><strong>Project Title &amp; One-line Pitch :</strong> intitulé clair et énoncé de valeur immédiat (rôle du composant dans l’architecture).</li>',
        '      <li><strong>Prerequisites &amp; Dependencies :</strong> versions exactes du runtime (Node 20, Python 3.11), outils requis (Docker, Make) et services tiers.</li>',
        '      <li><strong>Quickstart / Installation :</strong> commandes en bloc de code copiables directement (<code>npm install</code>, <code>pip install -r requirements.txt</code>).</li>',
        '      <li><strong>Configuration / Environment Variables :</strong> tableau exhaustif des variables d’environnement avec valeurs par défaut et caractère obligatoire.</li>',
        '      <li><strong>Running Tests :</strong> commande pour exécuter la suite de tests automatisée (<code>npm test</code>, <code>pytest</code>).</li>',
        '      <li><strong>Troubleshooting &amp; FAQ :</strong> recensement des erreurs d’installation courantes et procédures de contournement.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Exemple de Matrice de Variables d’Environnement</h4>',
        '    <table class="table">',
        '      <thead><tr><th>Variable</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>',
        '      <tbody>',
        '        <tr><td><code>PORT</code></td><td>Integer</td><td><code>3000</code></td><td>Port d’écoute du serveur web HTTP.</td></tr>',
        '        <tr><td><code>DATABASE_URL</code></td><td>String</td><td><em>(Required)</em></td><td>Chaîne de connexion PostgreSQL avec schéma SSL.</td></tr>',
        '        <tr><td><code>JWT_SECRET</code></td><td>String</td><td><em>(Required)</em></td><td>Clé cryptographique de signature des tokens de session.</td></tr>',
        '        <tr><td><code>LOG_LEVEL</code></td><td>String</td><td><code>info</code></td><td>Verbosité des journaux (debug, info, warn, error).</td></tr>',
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Vérifier chaque clause de spécification technique en repérant les mots-clés RFC 2119 pour distinguer obligations absolues et recommandations.',
    'Contrôler la présence d’au moins un code 2xx et des codes 401/403 pour tout endpoint protégé dans la documentation OpenAPI.',
    'Structurer tout fichier README selon les 6 sections standard pour garantir une reproduction en moins de cinq minutes.',
    'Documenter systématiquement l’idempotence des méthodes HTTP exposées pour guider les intégrateurs sur la politique de retry.',
    'Générer automatiquement une table des matières Markdown avec slugs valides pour faciliter la navigation dans les longs documents techniques.'
  ],
  summary: [
    'Les spécifications OpenAPI formalisent les contrats d’API : verbes HTTP, URI, en-têtes et statuts 2xx/4xx/5xx.',
    'La norme RFC 2119 élimine l’ambiguïté avec MUST (obligatoire), SHOULD (recommandé) et MAY (optionnel).',
    'La différence entre 401 (non authentifié) et 403 (non autorisé) est cruciale dans la gestion des permissions.',
    'Un README.md professionnel fournit prérequis, installation, variables d’environnement et guide de dépannage.',
    'L’idempotence (GET, PUT, DELETE) permet de répéter une requête en cas d’échec réseau sans effet de bord imprévu.'
  ],
  checklist: [
    'Ai-je audité les clauses MUST vs SHOULD dans mes spécifications d’interface ?',
    'Mes routes d’API protégées documentent-elles les statuts 401 et 403 ?',
    'Mon README contient-il un tableau complet des variables d’environnement avec valeurs par défaut ?',
    'Les commandes d’installation et d’exécution des tests sont-elles directement copiables ?',
    'Les ancres de ma table des matières Markdown renvoient-elles vers des slugs valides ?'
  ],
  notions: [
    'Spécification OpenAPI & Swagger',
    'Verbes HTTP (GET, POST, PUT, DELETE, PATCH)',
    'Codes de statut HTTP (2xx, 4xx, 5xx)',
    'Idempotence des requêtes réseau',
    'Norme RFC 2119 (MUST, SHOULD, MAY)',
    'Structure canonique d’un README.md',
    'Matrice de variables d’environnement',
    'Slugification et ancres Markdown'
  ],
  pitfalls: [
    'Confondre SHOULD (recommandation avec dérogation permise) et MUST (obligation absolue incontournable).',
    'Oublier de documenter les codes d’erreur 401/403 sur un endpoint sécurisé par token Bearer.',
    'Fournir un README sans préciser les versions exactes des runtimes (ex. Node.js ou Python requis).',
    'Utiliser PUT pour une modification partielle d’attributs au lieu de PATCH.'
  ],
  questions: [
    {
      stem: 'Dans la norme RFC 2119, que signifie la directive « The server MUST NOT log bearer tokens » ?',
      opts: [
        'Il est recommandé de ne pas journaliser les tokens sauf en cas de débogage.',
        'La journalisation des tokens est formellement interdite et constitue une non-conformité absolue.',
        'Le serveur peut journaliser les tokens s’il utilise le format JSON.',
        'Cette directive est purement informative et n’a aucune valeur contraignante.'
      ],
      correct: 1,
      exp: '« MUST NOT » désigne une interdiction absolue et impérative dans la norme RFC 2119.'
    },
    {
      stem: 'Quel code de statut HTTP indique que le client est authentifié mais ne possède pas les permissions nécessaires pour accéder à la ressource demandée ?',
      opts: [
        '401 Unauthorized',
        '403 Forbidden',
        '404 Not Found',
        '409 Conflict'
      ],
      correct: 1,
      exp: 'Le code 401 signale une absence d’authentification valide, tandis que 403 Forbidden indique que l’identité est connue mais que les droits sont insuffisants.'
    },
    {
      stem: 'Que garantit la propriété d’idempotence d’une méthode HTTP comme PUT ou DELETE ?',
      opts: [
        'La méthode s’exécute deux fois plus vite qu’une méthode non idempotente.',
        'Exécuter la requête une ou plusieurs fois consécutives produit exactement le même effet sur l’état du serveur.',
        'La méthode ne nécessite aucun token d’authentification.',
        'Le résultat est automatiquement mis en cache par tous les proxys réseau.'
      ],
      correct: 1,
      exp: 'Une opération est dite idempotente si la répéter plusieurs fois avec les mêmes paramètres aboutit au même état final sur le serveur.'
    },
    {
      stem: 'Dans la documentation d’une API REST, quelle est la méthode HTTP recommandée pour créer une nouvelle commande d’achat ?',
      opts: [
        'GET',
        'POST',
        'HEAD',
        'OPTIONS'
      ],
      correct: 1,
      exp: 'POST est la méthode standard pour créer de nouvelles ressources dont l’identifiant n’est pas encore déterminé par le client.'
    },
    {
      stem: 'Quelle est la différence entre les mots-clés RFC 2119 « MUST » et « SHOULD » ?',
      opts: [
        'MUST est une exigence absolue ; SHOULD est une forte recommandation qui peut être contournée si des raisons valables existent.',
        'MUST concerne les clients et SHOULD concerne uniquement les serveurs.',
        'SHOULD est obligatoire tandis que MUST est purement optionnel.',
        'Les deux termes ont exactement la même valeur juridique et technique.'
      ],
      correct: 0,
      exp: 'MUST impose une obligation absolue. SHOULD tolère des exceptions motivées et documentées par les ingénieurs.'
    },
    {
      stem: 'Quel code de retour HTTP est le plus approprié lorsqu’une ressource est supprimée avec succès et qu’aucun corps de réponse n’est renvoyé ?',
      opts: [
        '200 OK',
        '201 Created',
        '204 No Content',
        '304 Not Modified'
      ],
      correct: 2,
      exp: 'Le code HTTP 204 No Content confirme le succès du traitement tout en spécifiant qu’aucun corps de réponse n’est transmis.'
    },
    {
      stem: 'Dans un fichier README.md de qualité professionnelle, quelle section doit obligatoirement détailler les versions de Node.js, Python ou Docker nécessaires ?',
      opts: [
        'License & Copyright',
        'Prerequisites (Prérequis)',
        'Contributing Guide',
        'Changelog'
      ],
      correct: 1,
      exp: 'La section Prerequisites énumère l’ensemble des dépendances matérielles et logicielles requises pour exécuter le projet.'
    },
    {
      stem: 'Que signale un code d’erreur HTTP 502 Bad Gateway reçu par un navigateur ?',
      opts: [
        'Le navigateur a envoyé une URL contenant des caractères interdits.',
        'Un serveur mandataire ou proxy inverse a reçu une réponse invalide d’un serveur en amont (upstream).',
        'La base de données locale du client est corrompue.',
        'Le mot de passe de l’utilisateur a expiré.'
      ],
      correct: 1,
      exp: 'Le code 502 Bad Gateway survient lorsqu’un reverse proxy (ex: Nginx, Traefik) ne parvient pas à obtenir une réponse valide du microservice applicatif amont.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la signification de MUST dans la norme RFC 2119 ?',
      a: 'Une exigence absolue et non négociable. Le non-respect de cette clause invalide la conformité de l’implémentation.'
    },
    {
      q: 'Quelle est la différence entre 401 Unauthorized et 403 Forbidden ?',
      a: '401 indique une absence ou invalidité de credentials d’authentification. 403 indique que le client est authentifié mais n’a pas les droits d’accès sur la ressource.'
    },
    {
      q: 'Pourquoi l’opération HTTP DELETE est-elle dite idempotente ?',
      a: 'Parce que supprimer une ressource une fois ou dix fois consécutives aboutit au même état final sur le serveur (la ressource n’existe plus).'
    },
    {
      q: 'Que signifie SHOULD dans la norme RFC 2119 ?',
      a: 'Une recommandation forte : le comportement doit être adopté sauf justification technique explicite et documentée.'
    },
    {
      q: 'Quel code de statut HTTP correspond à une ressource créée avec succès ?',
      a: '201 Created (accompagné généralement d’un en-tête Location pointant vers la nouvelle ressource).'
    },
    {
      q: 'Quelles sont les sections indispensables d’un README.md professionnel ?',
      a: 'Title & Pitch, Prerequisites, Installation / Quickstart, Configuration (Variables d’environnement), Running Tests, Troubleshooting.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Confusion entre verbes normatifs RFC 2119 ou omission des codes d’erreur dans la documentation d’API.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise d’OpenAPI, distinction claire entre 401 et 403, et structuration correcte d’un fichier README.'
    },
    {
      cls: 'high',
      text: 'Excellence technique : audit rigoureux de spécifications RFC 2119, conception de documentations industrielles et maîtrise complète des statuts HTTP.'
    }
  ]
};
