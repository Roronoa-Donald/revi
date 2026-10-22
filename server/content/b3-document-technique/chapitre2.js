/**
 * Chapitre 2 du cours « Document Technique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Spécifications Fonctionnelles (SFD) &amp; Techniques (STD)',
  short: 'Spécifications SFD &amp; STD',
  toc: 'Formalisation des cas d’utilisation (Use Cases), règles métier, architecture technique détaillée, modélisation de données et matrice de traçabilité (RTM).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans un projet informatique, l’écart entre ce que le client a exprimé, ce que l’architecte a conçu et ce que le développeur a codé est la source principale des échecs et dépassements budgétaires. Sans spécifications formelles, chaque contributeur interprète les fonctionnalités selon sa propre intuition, aboutissant à des logiciels truffés d’incohérences, à des failles de sécurité dans les flux réseau et à des impasses lors des phases de recette. L’ingénieur de Bachelor 3 doit savoir rédiger avec une rigueur chirurgicale deux documents pivots : les Spécifications Fonctionnelles Détaillées (SFD), décrivant les cas d’utilisation et les règles métier, et les Spécifications Techniques Détaillées (STD), définissant les modèles de données et les matrices de flux, tout en garantissant une traçabilité totale via la matrice RTM.',
  objectives: [
    'traduire les exigences métier en cas d’utilisation (Use Cases) canoniques et scénarios d’exception structurés ;',
    'formaliser les règles de gestion et les parcours utilisateurs dans une Spécification Fonctionnelle Détaillée (SFD) ;',
    'rédiger une Spécification Technique Détaillée (STD) comprenant modèles de données et matrices de flux pare-feu ;',
    'construire et auditer une matrice de traçabilité des exigences (Requirements Traceability Matrix - RTM) ;',
    'identifier et neutraliser les règles de flux permissives dangereuses (ports ouverts, adresses ANY) dans une STD ;',
    'analyser et résoudre méthodologiquement des validateurs de cas d’utilisation, des audits de couverture RTM et des analyseurs de flux réseau.'
  ],
  sections: [
    {
      title: 'Les Spécifications Fonctionnelles Détaillées (SFD) : Exprimer le « Quoi »',
      html: [
        '<p>La <strong>Spécification Fonctionnelle Détaillée (SFD)</strong> traduit les besoins métier exprimés par le client ou le Product Owner en une description exhaustive et non ambiguë du comportement attendu du logiciel. Elle constitue le <strong>contrat fonctionnel de référence</strong> pour les équipes de développement et de recette.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Anatomie d’un Cas d’Utilisation (Use Case)</h4>',
        '    <ul>',
        '      <li><strong>Identifiant &amp; Titre :</strong> Ex. <code>UC-AUTH-01 : Connexion utilisateur</code>.</li>',
        '      <li><strong>Acteur Principal :</strong> Le rôle initiateur (ex. <em>Utilisateur authentifié</em>).</li>',
        '      <li><strong>Déclencheur (Trigger) :</strong> L’action provoquant le lancement (ex. <em>Clic sur le bouton Valider</em>).</li>',
        '      <li><strong>Préconditions :</strong> État préalable requis (ex. <em>Compte actif, non verrouillé</em>).</li>',
        '      <li><strong>Scénario Nominal :</strong> Séquence ordonnée des étapes en situation de succès sans accroc.</li>',
        '      <li><strong>Scénarios Alternatifs &amp; d’Exception :</strong> Gestion explicite des erreurs (ex. <em>Mot de passe erroné, compte suspendu</em>).</li>',
        '      <li><strong>Postconditions :</strong> État du système après exécution (ex. <em>Session créée, jeton JWT délivré</em>).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le Rôle Crucial des Règles de Gestion (RG)</h4>',
        '    <p>Chaque comportement métier doit être isolé sous la forme d’une règle atomique numérotée et vérifiable :</p>',
        '    <ul>',
        '      <li><code>RG-01 :</code> Le mot de passe doit comporter au moins 12 caractères, 1 chiffre et 1 symbole.</li>',
        '      <li><code>RG-02 :</code> Après 3 échecs consécutifs d’authentification, le compte est temporairement gelé pendant 15 minutes.</li>',
        '      <li><code>RG-03 :</code> Toute commande excédant 5 000 € HT requiert la double validation du directeur financier.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les Spécifications Techniques Détaillées (STD) : Définir le « Comment »',
      html: [
        '<p>Si la SFD s’adresse au métier, la <strong>Spécification Technique Détaillée (STD)</strong> est rédigée par et pour les ingénieurs. Elle explicite l’implémentation logicielle, les protocoles et les contraintes d’intégration :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Modélisation des Données</h4>',
        '    <p>Schéma relationnel (MCD/MLD/MPD) ou schéma documentaire NoSQL : typage strict de chaque attribut, clés primaires (PK), clés étrangères (FK), index d’optimisation et contraintes d’intégrité.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Interfaces &amp; Protocoles</h4>',
        '    <p>Définition des flux de communication : API REST/JSON, bus de messages asynchrones (Kafka/RabbitMQ), websockets, files de traitement batch et formats d’échange.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Matrice des Flux Réseau</h4>',
        '    <p>Tableau formel listant chaque ouverture de port pare-feu nécessaire : adresse source (IP/VLAN), destination, port d’écoute et protocole réseau (TCP/UDP).</p>',
        '  </div>',
        '</div>',
        box('warning', 'Règle de Sécurité des Matrices de Flux', [
          '<p>Une STD ne doit <strong>jamais</strong> autoriser de flux universels de type <code>ANY -> ANY</code> ou <code>PORT ALL</code>. Chaque ouverture de flux doit respecter le principe du moindre privilège : adresses IP explicites (ou sous-réseau VLAN strict), port unique dédié et justification technique documentée.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'La Matrice de Traçabilité des Exigences (RTM)',
      html: [
        '<p>La <strong>Requirements Traceability Matrix (RTM)</strong> est une grille de pilotage garantissant la couverture bidirectionnelle complète entre chaque exigence métier, sa conception technique et sa recette qualité :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th style="width:20%">Exigence (REQ)</th>',
        '      <th style="width:25%">Spécification (SFD)</th>',
        '      <th style="width:25%">Conception (STD)</th>',
        '      <th style="width:30%">Cas de Test (TEST)</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><code>REQ-AUTH-01</code> (Authentification double facteur)</td>',
        '      <td><code>SFD-UC-01</code> (Parcours saisie code TOTP)</td>',
        '      <td><code>STD-SRV-AUTH</code> (Service microservice OIDC)</td>',
        '      <td><code>TEST-E2E-TOTP-01</code> (Validation succès et échec code expiré)</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>REQ-PAY-03</code> (Remboursement partiel en 1 clic)</td>',
        '      <td><code>SFD-UC-14</code> (Action admin remboursement)</td>',
        '      <td><code>STD-API-STRIPE</code> (Appel POST webhook Stripe)</td>',
        '      <td><code>TEST-UNIT-REFUND</code> (Vérification des calculs de solde)</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',
        '<p style="margin-top:16px">Si une exigence $REQ$ ne pointe vers aucun cas de test, elle constitue un <strong>risque opérationnel majeur</strong> de non-conformité. Inversement, si une brique technique dans la STD ne correspond à aucune exigence métier, il s’agit de <em>Gold Plating</em> (sur-qualité inutile coûteuse).</p>'
      ].join('\n')
    }
  ],
  methodTitle: 'Protocole de Rédaction et de Validation SFD/STD',
  method: [
    'Extraire et numéroter chaque exigence métier sous un identifiant stable et non ambigu (ex. REQ-xxx).',
    'Rédiger les cas d’utilisation (Use Cases) en détaillant acteurs, préconditions, déclencheurs et scénarios alternatifs.',
    'Formuler des règles de gestion (RG) mesurables et dénuées de toute interprétation subjective.',
    'Traduire les exigences en STD : modèles de données normalisés, architecture logicielle et matrice de flux.',
    'Auditer la sécurité de la matrice de flux : proscrire strictement les wildcards ANY et les ports ouverts universels.',
    'Construire la matrice RTM pour vérifier que 100% des exigences sont couvertes par une spécification et un test.'
  ],
  summary: [
    'La SFD spécifie le comportement fonctionnel du point de vue métier ; la STD spécifie l’architecture d’implémentation technique.',
    'Un cas d’utilisation complet comporte acteur, préconditions, déclencheur, scénario nominal, exceptions et postconditions.',
    'Les règles de gestion (RG) énoncent les invariants d’affaires sous forme de critères atomiques vérifiables.',
    'Les matrices de flux réseau en STD doivent appliquer le moindre privilège et proscrire les règles génériques ANY.',
    'La matrice RTM (Requirements Traceability Matrix) relie chaque besoin métier à ses spécifications et cas de tests.'
  ],
  checklist: [
    'Je sais rédiger un cas d’utilisation SFD complet incluant les scénarios d’exception.',
    'Je sais formuler des règles de gestion (RG) claires et non ambiguës.',
    'Je sais structurer une matrice de flux réseau sécurisée dans une STD.',
    'Je sais expliquer pourquoi les règles ANY ou port ALL sont interdites en STD.',
    'Je sais construire et auditer une matrice de traçabilité des exigences (RTM).',
    'Je sais détecter les exigences orphelines ou les développements non tracés.'
  ],
  notions: [
    'Ingénierie des exigences logicielles',
    'Spécifications Fonctionnelles (SFD)',
    'Cas d’utilisation (Use Cases) canoniques',
    'Scénarios nominaux et d’exception',
    'Spécifications Techniques (STD)',
    'Matrice de flux réseau sécurisée',
    'Matrice de traçabilité des exigences (RTM)',
    'Sur-qualité inutile (Gold Plating)'
  ],
  pitfalls: [
    'Rédiger un cas d’utilisation en oubliant de spécifier les scénarios d’erreur et d’exception.',
    'Mélanger les considérations d’implémentation technique (SQL, Java) dans une SFD destinée au client métier.',
    'Autoriser des flux de pare-feu trop permissifs (ex. ANY -> ANY) dans la STD par paresse de spécification.',
    'Développer des fonctionnalités sans les relier à une exigence métier dans la matrice RTM (Gold Plating).'
  ],
  questions: [
    {
      stem: 'Quel est le rôle fondamental d’un scénario d’exception (ou alternatif) dans un cas d’utilisation de SFD ?',
      opts: [
        'Raconter l’historique des versions du document',
        'Définir le comportement exact du système lorsque des erreurs, timeouts ou saisies invalides surviennent',
        'Permettre au développeur de ne pas écrire de tests unitaires',
        'Remplacer le scénario nominal en cas de grève'
      ],
      correct: 1,
      exp: 'En production, la majorité des comportements anormaux proviennent de cas limites non spécifiés. Le scénario d’exception encadre précisément la réaction du logiciel face aux erreurs.'
    },
    {
      stem: 'Dans une Spécification Technique Détaillée (STD), pourquoi la mention « Port = ALL » sur une règle pare-feu est-elle formellement rejetée lors des audits de sécurité ?',
      opts: [
        'Car cela viole le principe du moindre privilège en exposant l’ensemble des ports réseau du serveur aux attaques',
        'Car le protocole TCP interdit l’utilisation de plus de 10 ports',
        'Car cela augmente la facture d’électricité du serveur',
        'Car cela empêche les sauvegardes quotidiennes'
      ],
      correct: 0,
      exp: 'Ouvrir tous les ports (Port ALL) neutralise la protection du pare-feu et expose des services internes non durcis. Une STD doit spécifier le port exact nécessaire (ex. 443 pour HTTPS).'
    },
    {
      stem: 'Qu’est-ce que la matrice de traçabilité des exigences (Requirements Traceability Matrix - RTM) ?',
      opts: [
        'Un tableau récapitulatif des salaires des développeurs',
        'Une grille reliant chaque exigence métier à ses spécifications détaillées et à ses cas de test de recette correspondants',
        'Un schéma d’implantation physique des câbles réseau dans la salle des serveurs',
        'Une liste de contacts téléphoniques des fournisseurs'
      ],
      correct: 1,
      exp: 'La RTM garantit que chaque besoin exprimé par le commanditaire est effectivement pris en compte dans la conception (SFD/STD) et vérifié par un test de validation.'
    },
    {
      stem: 'Comment qualifie-t-on le développement d’une fonctionnalité sophistiquée qui ne correspond à aucune exigence métier validée dans la RTM ?',
      opts: [
        'Le Trunk-Based Development',
        'La sur-qualité ou « Gold Plating » (développement superflu non requis)',
        'L’intégration continue d’élite',
        'Le test de performance'
      ],
      correct: 1,
      exp: 'Le Gold Plating consiste à rajouter des fonctionnalités techniques complexes que personne n’a demandées, consommant du budget et augmentant inutilement la surface d’attaque.'
    },
    {
      stem: 'Parmi les éléments suivants, lequel doit figurer obligatoirement dans une Spécification Fonctionnelle Détaillée (SFD) et NON dans une STD ?',
      opts: [
        'Le schéma physique des tables PostgreSQL avec types VARCHAR et BIGINT',
        'Les règles de gestion métier et le parcours utilisateur étape par étape',
        'Les adresses IP virtuelles des répartiteurs de charge NGINX',
        'Le diagramme de classes UML avec visibilité private/public'
      ],
      correct: 1,
      exp: 'La SFD décrit les exigences métier et l’expérience utilisateur. Les schémas de base de données physique et l’adressage IP relèvent exclusivement de la STD et du DAT.'
    },
    {
      stem: 'Que désigne une « exigence orpheline » détectée lors d’un audit RTM ?',
      opts: [
        'Une exigence rédigée par un développeur qui a quitté l’entreprise',
        'Une exigence exprimée par le métier qui n’a été couverte par aucune spécification ni aucun cas de test dans le projet',
        'Une exigence traduite dans plus de 3 langues',
        'Une exigence dont le numéro d’identification est impair'
      ],
      correct: 1,
      exp: 'Une exigence orpheline est un angle mort : le besoin métier a été formalisé mais a été oublié lors de la conception ou des phases de test.'
    },
    {
      stem: 'Dans un cas d’utilisation, que spécifie la clause de « Précondition » ?',
      opts: [
        'Le prix de vente du logiciel',
        'L’état obligatoire dans lequel doit se trouver le système avant que l’utilisateur ne puisse déclencher l’action',
        'Le nom de l’ordinateur de l’utilisateur',
        'L’âge minimum requis pour utiliser le clavier'
      ],
      correct: 1,
      exp: 'La précondition garantit les prérequis nécessaires : par exemple, pour « Payer une commande », la précondition stipule qu’un panier doit exister et être validé.'
    },
    {
      stem: 'Pourquoi est-il préconisé d’attribuer un identifiant unique et pérenne (ex. REQ-SEC-012) à chaque exigence dans un document de spécification ?',
      opts: [
        'Pour pouvoir retrouver et tracer précisément l’exigence à travers tous les livrables, tickets de développement et scénarios de test sans ambiguïté',
        'Pour crypter le document contre le vol industriel',
        'Pour réduire le temps d’impression papier',
        'Pour satisfaire à la législation fiscale'
      ],
      correct: 0,
      exp: 'Un identifiant stable permet de faire référence à l’exigence dans les outils de ticketing (Jira), les commits Git, les spécifications et les rapports de recette automatisés.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les composants clés d’un cas d’utilisation (Use Case) en SFD ?',
      a: 'Identifiant, Acteur, Déclencheur (Trigger), Préconditions, Scénario nominal, Scénarios d’exception et Postconditions.'
    },
    {
      q: 'Qu’est-ce qu’une règle de gestion (RG) ?',
      a: 'Une contrainte métier atomique, vérifiable et non ambiguë régissant le comportement du système (ex. conditions de validation de panier ou plafonds de transaction).'
    },
    {
      q: 'Quel est le rôle d’une matrice de flux réseau dans une STD ?',
      a: 'Lister avec précision chaque communication autorisée (IP source, IP destination, port et protocole) en appliquant le principe du moindre privilège.'
    },
    {
      q: 'Pourquoi les règles pare-feu de type « ANY » ou « ALL » sont-elles proscrites ?',
      a: 'Elles créent des failles de sécurité majeures en exposant inutilement des ports et des services à des accès non autorisés.'
    },
    {
      q: 'Quel est l’intérêt d’une matrice RTM (Requirements Traceability Matrix) ?',
      a: 'Garantir qu’aucune exigence métier n’est oubliée en liant chaque besoin à sa spécification détaillée et à son cas de test de validation.'
    },
    {
      q: 'Qu’appelle-t-on le « Gold Plating » en gestion de projet IT ?',
      a: 'Le développement de fonctionnalités ou optimisations superflues non demandées par le métier, source de gaspillage de temps et de dette technique.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la structure d’un Use Case, le rôle de la RTM et les différences entre SFD et STD.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez les règles de sécurité des matrices de flux et la gestion des exceptions.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez la formalisation rigoureuse des spécifications et la traçabilité des exigences.'
    }
  ]
};
