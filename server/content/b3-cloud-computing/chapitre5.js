/**
 * Chapitre 5 du cours « Cloud Computing B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Responsabilité Partagée, Sécurité &amp; Conformité Réglementaire',
  short: 'Sécurité &amp; Souveraineté',
  toc: 'Modèle de responsabilité partagée (Sécurité DU vs DANS le Cloud), posture de sécurité stockage objet (CSPM), souveraineté des données, CLOUD Act et qualification SecNumCloud.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans un environnement Cloud, la sécurité ne peut plus être déléguée passivement à un tiers. La grande majorité des violations de données survenues dans le Cloud (ex: fuites massives de buckets S3 ouverts) ne proviennent pas de vulnérabilités dans l’infrastructure des hyperscalers, mais d’erreurs de configuration imputables aux clients. Par ailleurs, la question de la souveraineté numérique et de l’exposition juridique aux lois extraterritoriales (notamment le CLOUD Act américain) est devenue un enjeu stratégique vital pour les entreprises européennes. L’ingénieur Cloud B3 doit maîtriser les frontières juridiques et techniques du modèle de responsabilité partagée, sécuriser les données au repos et en transit, et garantir la conformité RGPD et SecNumCloud.',
  objectives: [
    'délimiter avec précision les frontières du modèle de responsabilité partagée (« Sécurité DU Cloud » vs « Sécurité DANS le Cloud ») ;',
    'auditer et durcir la posture de sécurité d’un stockage d’objets Cloud (chiffrement SSE-KMS, blocage public, versioning) ;',
    'comprendre les mécanismes de gestion des identités et des accès (IAM : principes du moindre privilège et RBAC) ;',
    'analyser les risques juridiques liés aux lois extraterritoriales (CLOUD Act américain face au RGPD européen) ;',
    'connaître les exigences de la qualification souveraine SecNumCloud délivrée par l’ANSSI ;',
    'déployer des outils de surveillance continue de la posture de sécurité (CSPM - Cloud Security Posture Management).'
  ],
  sections: [
    {
      title: 'Le Modèle de Responsabilité Partagée (Shared Responsibility Model)',
      html: [
        '<p>La sécurité dans le Cloud repose sur un contrat de partage des tâches formellement défini entre le fournisseur (CSP) et le client consommateur :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Sécurité DU Cloud (Fournisseur CSP)</h4>',
        '    <p>Le fournisseur protège l’infrastructure globale qui exécute l’ensemble des services offerts dans le Cloud :<br>',
        '    - Sécurité physique des datacenters (gardiennage, biométrie, caméras) ;<br>',
        '    - Maintenance du matériel serveur, du stockage et des routeurs physiques ;<br>',
        '    - Cloisonnement et mise à jour de l’hyperviseur de virtualisation ;<br>',
        '    - Résilience des réseaux mondiaux contre les pannes et attaques DDoS volumétriques.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Sécurité DANS le Cloud (Client Consommateur)</h4>',
        '    <p>Le client est seul responsable de ce qu’il déploie et stocke dans le Cloud :<br>',
        '    - Mise à jour et patchs de sécurité de l’OS invité (en IaaS) ;<br>',
        '    - Configuration des groupes de sécurité et règles de pare-feu réseau ;<br>',
        '    - Gestion des identités, des accès et des mots de passe (IAM) ;<br>',
        '    - Chiffrement, classification et gouvernance des données métier.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Sécurisation du Stockage Objet et Gestion de la Posture (CSPM)',
      html: [
        '<p>Les stockages d’objets (AWS S3, Azure Blob, Google Cloud Storage) constituent le réceptacle privilégié des données d’entreprise. Leur mauvaise configuration est la cause numéro 1 des fuites massives de données :</p>',
        '<ul>',
        '  <li><strong>Blocage strict des accès publics (Block Public Access) :</strong> Verrou global interdisant l’application de politiques de bucket ou d’ACL autorisant la lecture publique anonyme.</li>',
        '  <li><strong>Chiffrement au repos (Encryption at Rest) :</strong><br>',
        '    - <em>SSE-S3 / SSE-Platform :</em> Clés gérées et renouvelées automatiquement par le fournisseur Cloud.<br>',
        '    - <em>SSE-KMS / SSE-Key Vault :</em> Clés gérées par le client (Customer Managed Keys - CMK) avec contrôle strict des droits d’utilisation, rotation programmée et traçabilité absolue des déchiffrements.</li>',
        '  <li><strong>Protection contre l’effacement et la falsification :</strong> Activation obligatoire du <em>versioning</em> (historique des modifications), du verrouillage <em>Object Lock</em> (WORM : Write Once Read Many) et de la suppression protégée par double facteur (MFA Delete).</li>',
        '  <li><strong>Traçabilité et audit d’accès :</strong> Journalisation continue de chaque requête API via des services d’audit (AWS CloudTrail, Azure Monitor, GCP Cloud Audit Logs).</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Souveraineté Numérique, RGPD, CLOUD Act et SecNumCloud',
      html: [
        '<p>L’hébergement de données critiques impose de naviguer entre réglementations européennes protectrices et législations extraterritoriales :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>RGPD (Règlement Général sur la Protection des Données)</h4>',
        '    <p>Impose la localisation des données personnelles de citoyens européens au sein de l’Union européenne ou dans des pays tiers disposant d’une décision d’adéquation stricte, avec sanctions pouvant atteindre 4% du CA mondial.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le CLOUD Act Américain (2018)</h4>',
        '    <p>Loi fédérale autorisant les autorités judiciaires américaines à exiger la saisie de données hébergées par toute entreprise soumise au droit américain, <strong>quelle que soit la localisation physique géographique du datacenter</strong> (ex: datacenter situé à Paris ou Francfort).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>SecNumCloud (ANSSI)</h4>',
        '    <p>Le référentiel d’excellence français le plus exigeant d’Europe. Il garantit la plus haute sécurité technique (ISO 27001 renforcée) et une <strong>immunité juridique totale aux lois extraterritoriales</strong> (actionnariat et capitaux européens, personnel et support situés dans l’UE).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Protocole d’Audit de Posture de Sécurité Cloud (CSPM)',
  method: [
    'Activer le blocage universel des accès publics sur tous les compartiments de stockage d’objets (S3/Blob).',
    'Imposer le chiffrement systématique au repos avec clés managées (SSE-KMS) et en transit (TLS 1.3 obligatoire).',
    'Appliquer le principe du moindre privilège (Least Privilege) sur toutes les politiques de rôles IAM et supprimer les clés d’accès statiques permanentes.',
    'Activer la journalisation d’audit multi-régions inviolable (CloudTrail / Audit Logs) avec rétention vers un compte sécurisé dédié.',
    'Vérifier la localisation géographique effective des données pour respecter la conformité réglementaire RGPD.',
    'Exécuter des scanners automatiques de conformité (CSPM / Prowler / ScoutSuite) pour détecter en continu les dérives de configuration.'
  ],
  summary: [
    'Le modèle de responsabilité partagée distingue la « Sécurité DU Cloud » (assurée par le CSP) de la « Sécurité DANS le Cloud » (à la charge du client).',
    'En IaaS, le patching de l’OS invité et le filtrage des flux réseau relèvent exclusivement de la responsabilité de l’organisation cliente.',
    'La gestion des identités (IAM) et la gouvernance des données restent sous la responsabilité du client dans TOUS les modèles.',
    'Le CLOUD Act américain s’applique à toute filiale d’entreprise américaine même si les données résident physiquement en Europe.',
    'SecNumCloud (ANSSI) apporte la garantie d’une isolation technique et juridique absolue face aux législations extraterritoriales.'
  ],
  checklist: [
    'Je sais délimiter qui est responsable d’un composant donné en IaaS, PaaS et SaaS.',
    'Je connais les 4 configurations indispensables pour sécuriser un compartiment de stockage objet.',
    'Je sais expliquer la portée extraterritoriale du CLOUD Act américain.',
    'Je connais les critères d’attribution de la qualification SecNumCloud de l’ANSSI.',
    'Je sais expliquer la différence entre le chiffrement SSE-S3 et SSE-KMS avec CMK.',
    'Je comprends le principe du moindre privilège appliqué à l’IAM.'
  ],
  notions: [
    'Modèle de responsabilité partagée (Shared Responsibility)',
    'Sécurité DU Cloud vs Sécurité DANS le Cloud',
    'Cloud Security Posture Management (CSPM)',
    'Chiffrement au repos SSE-KMS et Customer Managed Keys (CMK)',
    'Règlement Général sur la Protection des Données (RGPD)',
    'CLOUD Act américain et extraterritorialité',
    'Référentiel de qualification SecNumCloud (ANSSI)',
    'Principe du moindre privilège et contrôle d’accès RBAC'
  ],
  pitfalls: [
    'Croire que signer un contrat avec un hyperscaler décharge l’entreprise de toute responsabilité en cas de fuite de données.',
    'Utiliser des clés d’accès IAM statiques codées en dur dans le code source des applications au lieu de rôles temporaires.',
    'Penser que chiffrer des données avec des clés gérées par un fournisseur américain suffit à immuniser l’entreprise contre le CLOUD Act.',
    'Autoriser la lecture publique temporaire d’un bucket S3 pour tester un fichier et oublier de réactiver le verrou de sécurité.'
  ],
  questions: [
    {
      stem: 'Dans le modèle de responsabilité partagée, laquelle de ces tâches relève TOUJOURS de la responsabilité du client, quel que soit le modèle de service (IaaS, PaaS ou SaaS) ?',
      opts: [
        'La sécurité physique des locaux du centre de données',
        'La protection de l’hyperviseur contre les failles Meltdown/Spectre',
        'La gestion et la classification des données ainsi que le contrôle des identités (IAM)',
        'Le remplacement des disques durs défectueux'
      ],
      correct: 2,
      exp: 'La gestion des données métier et le contrôle des accès utilisateurs (IAM) sont de la responsabilité incessible du client dans l’ensemble des modèles Cloud.'
    },
    {
      stem: 'Quel mécanisme technique empêche l’écrasement ou la suppression définitive d’un fichier déposé dans un bucket de stockage Cloud lors d’une attaque par ransomware ?',
      opts: [
        'L’indexation automatique',
        'Le versioning d’objets combiné au verrouillage WORM (Object Lock)',
        'L’affectation d’une adresse IP statique',
        'Le partitionnement logique du réseau'
      ],
      correct: 1,
      exp: 'Le versioning conserve chaque version successive d’un fichier, et le mode WORM (Object Lock) interdit techniquement toute modification ou suppression pendant une durée définie.'
    },
    {
      stem: 'Quelle loi américaine permet aux tribunaux des États-Unis d’ordonner à un fournisseur américain de fournir des données, y compris si les serveurs sont situés en France ou en Allemagne ?',
      opts: [
        'Le RGPD européen',
        'Le CLOUD Act (Clarifying Lawful Overseas Use of Data Act)',
        'Le Patriot Act historique',
        'La directive NIS 2'
      ],
      correct: 1,
      exp: 'Le CLOUD Act américain (2018) dispose d’une portée extraterritoriale s’appliquant à toute entité commerciale de droit américain, indépendamment de la frontière physique du stockage.'
    },
    {
      stem: 'Quel label de sécurité délivré par l’ANSSI certifie en France qu’un fournisseur Cloud offre les plus hautes garanties techniques et une immunité totale aux lois extraterritoriales ?',
      opts: [
        'ISO 9001',
        'SecNumCloud',
        'PCI-DSS',
        'HIPAA'
      ],
      correct: 1,
      exp: 'SecNumCloud est le visa de sécurité souverain élaboré par l’ANSSI pour qualifier les offres Cloud de confiance répondant aux normes de cybersécurité les plus strictes d’Europe.'
    },
    {
      stem: 'Quelle est la principale différence entre le chiffrement de données SSE-S3 et le chiffrement SSE-KMS avec clé CMK ?',
      opts: [
        'SSE-S3 ne chiffre pas réellement les données',
        'SSE-KMS avec CMK permet au client de contrôler l’accès à la clé de déchiffrement, d’exiger la rotation et d’auditer chaque utilisation',
        'SSE-S3 requiert l’installation d’un logiciel lourd sur le poste client',
        'SSE-KMS ne fonctionne qu’avec des machines virtuelles Linux'
      ],
      correct: 1,
      exp: 'Avec SSE-KMS (Customer Managed Key), le client conserve la pleine gouvernance de la clé de chiffrement, peut révoquer son accès à tout moment et trace chaque déchiffrement dans les journaux d’audit.'
    },
    {
      stem: 'Comment qualifie-t-on la famille d’outils logiciels spécialisés dans l’audit continu et la détection des dérives de configuration sur l’ensemble d’un parc Cloud ?',
      opts: [
        'CSPM (Cloud Security Posture Management)',
        'ERP (Enterprise Resource Planning)',
        'CRM (Customer Relationship Management)',
        'IDE (Integrated Development Environment)'
      ],
      correct: 0,
      exp: 'Les outils CSPM (Cloud Security Posture Management) scannent en permanence les configurations des comptes Cloud pour alerter en cas de non-conformité ou de mauvaise configuration.'
    },
    {
      stem: 'Quel principe de sécurité fondamental stipule qu’un compte utilisateur ou une application ne doit posséder QUE les autorisations strictement requises pour sa mission ?',
      opts: [
        'Le principe de haute disponibilité',
        'Le principe du moindre privilège (Least Privilege)',
        'Le principe de tolérance aux pannes',
        'Le principe de latence minimale'
      ],
      correct: 1,
      exp: 'Le principe du moindre privilège (Least Privilege) garantit qu’une entité ne dispose d’aucun droit superflu, réduisant drastiquement l’impact potentiel d’un piratage de compte.'
    },
    {
      stem: 'Une entreprise basée à Paris héberge des données de santé nominatives de patients français sur un serveur situé aux États-Unis sans garanties juridiques valables. Que risque-t-elle ?',
      opts: [
        'Aucune sanction car les données sont sauvegardées',
        'Une infraction majeure au RGPD pouvant être sanctionnée d’une amende allant jusqu’à 4% de son chiffre d’affaires annuel mondial',
        'Uniquement un avertissement informel de son fournisseur d’accès Internet',
        'L’arrêt obligatoire de sa connexion Internet sous 24 heures'
      ],
      correct: 1,
      exp: 'Le transfert illégal de données sensibles de santé hors de l’UE en violation du RGPD constitue une faute lourde sanctionnée de lourdes amendes par les autorités de protection des données (CNIL).'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que la « Sécurité DU Cloud » ?',
      a: 'L’ensemble des mesures assurées par le fournisseur pour sécuriser les centres de données physiques, les réseaux mondiaux, le matériel et l’hyperviseur.'
    },
    {
      q: 'Qu’est-ce que la « Sécurité DANS le Cloud » ?',
      a: 'L’ensemble des configurations sécuritaires sous la responsabilité du client : gestion des identités (IAM), chiffrement, firewall virtuel et mises à jour de l’OS invité.'
    },
    {
      q: 'Pourquoi le CLOUD Act américain pose-t-il un risque pour les entreprises européennes ?',
      a: 'Parce qu’il autorise la justice américaine à exiger la saisie de données hébergées par des fournisseurs de droit américain, même si les serveurs sont physiquement en Europe.'
    },
    {
      q: 'Quelles sont les 4 règles d’or pour sécuriser un stockage d’objets (bucket) ?',
      a: '1. Bloquer tout accès public, 2. Chiffrer au repos (SSE-KMS), 3. Activer le versioning d’objets, 4. Journaliser les accès API (audit logs).'
    },
    {
      q: 'Quels sont les atouts clés de la qualification SecNumCloud de l’ANSSI ?',
      a: 'Une sécurité technique de niveau militaire et une immunité juridique absolue face aux législations extraterritoriales (fournisseur et capitaux européens).'
    },
    {
      q: 'Que fait un outil de CSPM (Cloud Security Posture Management) ?',
      a: 'Il inspecte en continu les configurations de l’infrastructure Cloud pour identifier les vulnérabilités, les accès publics ouverts et les dérives de conformité.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la répartition du modèle de responsabilité partagée et les risques juridiques du CLOUD Act.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bonnes bases en sécurité, approfondissez les mécanismes de chiffrement SSE-KMS et le référentiel SecNumCloud.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez les enjeux complexes de la cybersécurité Cloud et de la souveraineté numérique.'
    }
  ]
};
