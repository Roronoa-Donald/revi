/**
 * Chapitre 4 du cours « Document Technique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Documentation d’API &amp; Référence Technique (OpenAPI / Swagger)',
  short: 'Documentation d’API &amp; OpenAPI',
  toc: 'Spécification OpenAPI 3.0, contrats d’interface REST, sémantique des codes HTTP, schémas JSON, docstrings et portails interactifs Swagger UI.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans les architectures modernes orientées microservices et les écosystèmes d’intégration partenaires, l’API est le produit. Une API dépourvue de documentation claire, rigoureusement typée et à jour est vouée à l’abandon : les développeurs tiers perdent des journées entières à deviner la structure des payloads JSON, se heurtent à des erreurs HTTP 500 inexpliquées et multiplient les tickets de support technique. L’approche « API-First » impose de concevoir et valider la spécification OpenAPI 3.0 (Swagger) du contrat d’interface avant même d’écrire la moindre ligne de code back-end. L’ingénieur de Bachelor 3 doit maîtriser la syntaxe OpenAPI 3.0, respecter les conventions REST canoniques, documenter les docstrings de code et déployer des portails interactifs de référence.',
  objectives: [
    'maîtriser la philosophie « API-First » et les avantages contractuels de la spécification d’interface en amont ;',
    'rédiger des spécifications OpenAPI 3.0 complètes : endpoints, méthodes HTTP, paramètres, corps de requêtes et schémas JSON ;',
    'appliquer la sémantique stricte des codes de statut HTTP REST (2xx succès, 4xx erreurs client, 5xx erreurs serveur) ;',
    'documenter le code source via des docstrings normalisées (formats Google, Sphinx, TypeDoc) ;',
    'générer des portails interactifs développeurs exploitant Swagger UI, Redoc et des serveurs de mocks (Prism) ;',
    'analyser et résoudre méthodologiquement des validateurs de routes OpenAPI, des auditeurs de docstrings et des vérificateurs de schémas JSON.'
  ],
  sections: [
    {
      title: 'L’Approche « API-First » &amp; Le Contrat d’Interface Immuable',
      html: [
        '<p>Historiquement, les développeurs programmaient les routes du serveur puis rédigeaient (ou omettaient de rédiger) la documentation a posteriori (« Code-First »). Cette méthode engendre des dérives majeures : documentation perpétuellement en retard sur le code et travail en silo séquentiel.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>La Philosophie API-First</h4>',
        '    <p>L’API est traitée comme un <strong>contrat officiel opposable</strong> conclu entre l’équipe fournisseuse et les consommateurs du service. La spécification OpenAPI (format YAML ou JSON) est rédigée, revue et validée collégialement <em>avant toute écriture de code d’implémentation</em>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Bénéfices Opérationnels Majeurs</h4>',
        '    <ul>',
        '      <li><strong>Développement Parallèle :</strong> Le front-end et le back-end avancent simultanément grâce à des serveurs de simulation (mocks) générés à partir du contrat.</li>',
        '      <li><strong>Génération de Code &amp; SDK :</strong> Les stubs de serveurs et les clients typés (TypeScript, Python, Java) sont générés automatiquement via OpenAPI Generator.</li>',
        '      <li><strong>Zéro Dérive :</strong> Le contrat sert de suite de tests de conformité automatisée en intégration continue.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Spécification OpenAPI 3.0 : Anatomie &amp; Conventions REST',
      html: [
        '<p>La norme <strong>OpenAPI 3.0</strong> (maintenue par l’OpenAPI Initiative sous l’égide de la Linux Foundation) formalise la description des APIs REST. Elle s’articule autour de sections fondamentales :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. En-tête : info &amp; servers</h4>',
        '    <p>Titre de l’API, version sémantique (ex. <code>version: 1.2.0</code>), description, conditions d’utilisation, contact technique et URLs des environnements cibles (dev, staging, prod).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Les Routes : paths</h4>',
        '    <p>Déclaration des endpoints hiérarchisés au pluriel (ex. <code>/api/v1/clients/{id}</code>), verbes HTTP associés, résumés, tags de regroupement et identifiants uniques <code>operationId</code>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Les Schémas : components</h4>',
        '    <p>Dictionnaire centralisé des modèles de données réutilisables (<code>$ref: "#/components/schemas/User"</code>), prévenant la duplication et garantissant la cohérence du typage.</p>',
        '  </div>',
        '</div>',
        '<h4 style="margin-top:20px">Sémantique Canonique des Réponses HTTP</h4>',
        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th style="width:20%">Code HTTP</th>',
        '      <th style="width:25%">Intitulé officiel</th>',
        '      <th style="width:55%">Condition exacte d’émission en API REST</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><code>200 OK</code></td>',
        '      <td>Succès nominal</td>',
        '      <td>Requête <code>GET</code>, <code>PUT</code> ou <code>PATCH</code> traitée avec succès ; retourne la ressource demandée.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>201 Created</code></td>',
        '      <td>Création effectuée</td>',
        '      <td>Requête <code>POST</code> ayant créé une ressource nouvelle ; inclut l’en-tête <code>Location: /api/v1/items/42</code>.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>204 No Content</code></td>',
        '      <td>Succès sans contenu</td>',
        '      <td>Requête <code>DELETE</code> ou <code>PUT</code> exécutée sans corps de réponse retourné au client.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>400 Bad Request</code></td>',
        '      <td>Erreur de validation</td>',
        '      <td>Corps de requête JSON syntaxiquement invalide ou violation de contraintes métier (champs obligatoires omis).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>401 Unauthorized</code></td>',
        '      <td>Non authentifié</td>',
        '      <td>Absence ou expiration du jeton porteur d’authentification (Token JWT / clé d’API invalide).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>403 Forbidden</code></td>',
        '      <td>Droits insuffisants</td>',
        '      <td>Client authentifié avec succès mais ne disposant pas du rôle requis (RBAC) pour cette ressource.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>404 Not Found</code></td>',
        '      <td>Ressource introuvable</td>',
        '      <td>L’identifiant ciblé dans l’URI n’existe pas dans la base de données.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>500 Server Error</code></td>',
        '      <td>Panne interne</td>',
        '      <td>Exception non interceptée côté serveur (crash base de données, bug inattendu) ; ne doit jamais fuiter la stack trace.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Documentation du Code Source &amp; Docstrings Normalisées',
      html: [
        "<pre><code>openapi: 3.0.0\ninfo:\n  title: API Calcul de Remise Commerciale\n  version: 1.0.0\npaths:\n  /remise:\n    post:\n      summary: Calcule le montant net apres application d'un code promotionnel\n      parameters:\n        - name: montant_ht\n          in: query\n          required: true\n          schema:\n            type: number\n        - name: code_promo\n          in: query\n          required: true\n          schema:\n            type: string\n      responses:\n        '200':\n          description: Montant net calcule avec succes</code></pre>",
        box('tip', 'Portails Développeurs Interactifs', [
          '<p>Une spécification OpenAPI 3.0 bien rédigée permet d’instancier immédiatement des portails visuels de référence : <strong>Swagger UI</strong> (offrant un bouton interactif <em>« Try it out »</em> pour tester l’API en direct dans le navigateur) ou <strong>Redoc</strong> (interface responsive épurée à trois colonnes adoptée par Stripe et Docker). Les développeurs disposent d’une documentation vivante, auto-générée et interactive.</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],
  methodTitle: 'Protocole de Conception et de Validation d’une API OpenAPI 3.0',
  method: [
    'Concevoir le contrat d’interface en amont sur un modèle API-First avec les équipes consommatrices.',
    'Structurer l’arborescence des chemins selon la convention REST plurielle (ex. /api/v1/ressources).',
    'Définir rigoureusement les verbes HTTP appropriés et l’idempotence associée (GET, POST, PUT, DELETE).',
    'Documenter systématiquement les codes de retour nominaux (200, 201) et les codes d’erreur (400, 401, 403, 404, 500).',
    'Factoriser tous les modèles de données dans la section components/schemas pour éliminer la duplication.',
    'Intégrer un linter OpenAPI (Spectral) dans le pipeline CI pour bloquer toute route non documentée.'
  ],
  summary: [
    'L’approche API-First garantit que la spécification contractuelle OpenAPI est approuvée avant le codage.',
    'La norme OpenAPI 3.0 décrit de façon standardisée les routes, paramètres, requêtes et schémas JSON réutilisables.',
    'La sémantique REST impose le respect strict des codes HTTP : 200/201 pour le succès, 400/401/403/404 pour les fautes client.',
    'Les docstrings de code (format Google/Sphinx) documentent les arguments, le type de retour et les exceptions levées.',
    'Swagger UI et Redoc transforment le contrat OpenAPI en portails de documentation interactive testables en direct.'
  ],
  checklist: [
    'Je sais expliquer la valeur de l’approche API-First face au Code-First.',
    'Je maîtrise la structure globale d’un fichier de spécification OpenAPI 3.0.',
    'Je connais la signification et l’usage canonique de chaque code HTTP (200, 201, 204, 400, 401, 403, 404, 500).',
    'Je sais rédiger une docstring normalisée au format Google.',
    'Je sais factoriser des schémas JSON avec la directive $ref dans components.',
    'Je sais déployer Swagger UI pour offrir un bac à sable interactif de test.'
  ],
  notions: [
    'Philosophie de conception API-First',
    'Spécification OpenAPI 3.0 &amp; Swagger',
    'Conventions de nommage RESTful',
    'Sémantique des codes de statut HTTP',
    'Schémas de données JSON réutilisables',
    'Docstrings normalisées (format Google)',
    'Portails interactifs Swagger UI &amp; Redoc',
    'Serveurs de mocks et génération de SDK'
  ],
  pitfalls: [
    'Renvoyer un code HTTP 200 OK avec un corps JSON contenant `{"error": "User not found"}`, violant la norme REST.',
    'Nommer les routes avec des verbes d’action (ex. `/api/getUser/10`) plutôt que des noms pluriels (`/api/users/10`).',
    'Omettre de documenter les schémas d’erreur 400 et 404, laissant les développeurs dans l’ignorance des formats de rejet.',
    'Laisser la documentation d’API dériver du code de production sans contrôle automatisé en intégration continue.'
  ],
  questions: [
    {
      stem: 'Quel est le bénéfice principal de l’approche « API-First » dans un projet logiciel moderne ?',
      opts: [
        'Elle permet de supprimer totalement l’équipe de test',
        'Le contrat d’interface OpenAPI est validé avant le codage, permettant le développement parallèle du front-end et du back-end via des serveurs de mocks',
        'Elle rend le serveur dix fois plus rapide lors des requêtes SQL',
        'Elle interdit l’utilisation du format JSON'
      ],
      correct: 1,
      exp: 'API-First contractualise les interfaces en amont : les intégrateurs n’attendent plus la fin du back-end pour commencer à développer leurs applications clientes.'
    },
    {
      stem: 'Quel code de statut HTTP une API REST conforme doit-elle retourner lors de la création réussie d’un nouvel utilisateur via une méthode POST ?',
      opts: [
        '200 OK',
        '201 Created (avec l’en-tête Location désignant la nouvelle ressource)',
        '204 No Content',
        '302 Found'
      ],
      correct: 1,
      exp: 'Le code 201 Created est le code standard désignant la création effective d’une ressource nouvelle, idéalement accompagné de l’en-tête Location précisant son URI.'
    },
    {
      stem: 'Quelle convention de nommage d’URI respecte les bonnes pratiques de conception d’une API RESTful ?',
      opts: [
        '/api/getUserById?id=12',
        '/api/v1/deleteUser/12',
        '/api/v1/users/12 (avec la méthode HTTP appropriée GET ou DELETE)',
        '/api/user_action.php?action=view&uid=12'
      ],
      correct: 2,
      exp: 'En REST, les URIs désignent des ressources (noms au pluriel), et les verbes HTTP (GET, POST, PUT, DELETE) portent l’action à effectuer.'
    },
    {
      stem: 'Dans la spécification OpenAPI 3.0, à quoi sert la section « components/schemas » ?',
      opts: [
        'À lister les noms des employés de l’entreprise',
        'À centraliser les définitions réutilisables des modèles de données JSON via des références $ref pour éviter la duplication',
        'À enregistrer les adresses IP physiques des commutateurs réseau',
        'À stocker le code source en langage binaire'
      ],
      correct: 1,
      exp: 'La section components/schemas est le dictionnaire des types de données : un même schéma (ex. User ou ErrorPayload) est référencé partout via `$ref`.'
    },
    {
      stem: 'Quelle différence formelle sépare le code d’erreur HTTP 401 Unauthorized du code 403 Forbidden ?',
      opts: [
        'Il n’y a aucune différence, ils sont strictement interchangeables',
        'Le code 401 signale l’absence ou l’invalidité d’authentification (identité non prouvée), tandis que le code 403 indique que l’identité est connue mais que les droits d’accès sont insuffisants',
        'Le code 401 concerne les bases de données et le 403 les serveurs DNS',
        'Le code 403 n’existe pas dans les standards du W3C'
      ],
      correct: 1,
      exp: '401 est un problème d’authentification (« Qui êtes-vous ? »). 403 est un problème d’autorisation (« Je sais qui vous êtes, mais vous n’avez pas le droit »).'
    },
    {
      stem: 'Pourquoi est-il considéré comme une faute majeure de renvoyer un code 200 OK pour une requête ayant échoué (ex: `{"status": 200, "error": "Compte introuvable"}`) ?',
      opts: [
        'Car cela brise la couche protocolaire HTTP, empêchant les passerelles, proxys, équilibreurs de charge et bibliothèques clientes de détecter l’erreur',
        'Car le navigateur web s’arrête immédiatement de fonctionner',
        'Car cela supprime la base de données',
        'Car cela consomme le double de mémoire vive'
      ],
      correct: 0,
      exp: 'Les couches intermédiaires (API Gateways, clients HTTP) inspectent le code statut : masquer une erreur sous un 200 OK oblige à parser chaque corps JSON et neutralise la supervision.'
    },
    {
      stem: 'Dans une docstring Python au format standard Google, quelles sont les trois sections fondamentales couramment attendues ?',
      opts: [
        'Introduction, Conclusion, Remerciements',
        'Args (arguments d’entrée), Returns (valeur de retour) et Raises (exceptions levées)',
        'Budget, Facturation, Bénéfices',
        'Hardware, Software, Firmware'
      ],
      correct: 1,
      exp: 'Le format Google structure l’explication technique en documentant les arguments (Args), la valeur produite (Returns) et les erreurs potentielles (Raises).'
    },
    {
      stem: 'Quel outil permet de transformer une spécification OpenAPI 3.0 en une interface web interactive avec formulaire de test « Try it out » ?',
      opts: [
        'Microsoft Excel',
        'Swagger UI',
        'Vim en ligne de commande',
        'Le compilateur GCC'
      ],
      correct: 1,
      exp: 'Swagger UI analyse le fichier OpenAPI YAML/JSON et génère dynamiquement une page web ergonomique permettant aux développeurs de tester les requêtes en temps réel.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que l’approche « API-First » ?',
      a: 'La pratique consistant à concevoir, spécifier et faire valider le contrat d’interface OpenAPI avant toute écriture de code d’implémentation.'
    },
    {
      q: 'Quelle est la différence entre les codes HTTP 200 et 201 ?',
      a: '200 OK indique un succès nominal sans création. 201 Created indique qu’une nouvelle ressource a été créée avec succès en base de données.'
    },
    {
      q: 'Quelle est la différence entre les erreurs HTTP 401 et 403 ?',
      a: '401 Unauthorized : absence ou invalidité de credentials d’authentification. 403 Forbidden : identité authentifiée mais droits/rôles insuffisants.'
    },
    {
      q: 'Pourquoi les URIs REST doivent-elles être composées de noms au pluriel ?',
      a: 'Car les URIs désignent des collections de ressources (ex. `/api/v1/orders`), les actions étant portées par les verbes HTTP (GET, POST, DELETE).'
    },
    {
      q: 'Quelles sont les sections majeures d’une spécification OpenAPI 3.0 ?',
      a: '`openapi`, `info` (métadonnées), `paths` (endpoints et méthodes), `components/schemas` (modèles de données réutilisables).'
    },
    {
      q: 'Quel est l’intérêt de documenter les docstrings de code au format Google ?',
      a: 'Faciliter la relecture humaine immédiate dans l’IDE et permettre la génération automatique de documentation HTML via des outils comme Sphinx.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la sémantique des codes HTTP (200, 201, 400, 401, 403), la philosophie API-First et OpenAPI.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez les composants réutilisables d’OpenAPI et le formatage des docstrings.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez la conception et la documentation de contrats d’API professionnelles de niveau expert.'
    }
  ]
};
