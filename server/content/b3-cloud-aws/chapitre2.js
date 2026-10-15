/**
 * server/content/b3-cloud-aws/chapitre2.js — Chapitre 2
 * Sécurité des Identités IAM, Politiques JSON & Gouvernance Multi-Comptes
 */
'use strict';

module.exports = {
  n: 2,
  title: 'Sécurité des Identités IAM, Politiques JSON & Gouvernance Multi-Comptes',
  short: 'Sécurité IAM & Gouvernance',
  toc: 'Identités IAM, rôles temporaires, politiques JSON, moteur d\'évaluation, rotation des clés et Service Control Policies (SCPs).',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'À la suite d\'un audit de cybersécurité interne, votre direction vous confie le durcissement intégral de la gestion des identités et des accès sur le tenant AWS de l\'entreprise. ' +
    'Vous devez éradiquer les clés d\'accès statiques en déployant des rôles IAM temporaires, modéliser des politiques d\'autorisation JSON respectant le principe du moindre privilège, ' +
    'et instaurer une gouvernance multi-comptes centralisée avec AWS Organizations et des Service Control Policies (SCPs) infranchissables.',

  objectives: [
    'Maîtriser les entités IAM : Utilisateurs, Groupes, Rôles temporaires (Instance Profiles, STS AssumeRole) et politiques basées sur l\'identité vs sur la ressource.',
    'Rédiger et auditer des politiques d\'autorisation IAM JSON (Version, Statement, Effect, Action, Resource, Condition).',
    'Comprendre et appliquer l\'algorithme d\'évaluation strict d\'AWS (Default Deny, Explicit Allow, primauté absolue de l\'Explicit Deny).',
    'Mettre en œuvre la gouvernance multi-comptes avec AWS Organizations et les Service Control Policies (SCPs) pour imposer des garde-fous organisationnels.'
  ],

  sections: [
    {
      title: 'Les Fondements d\'AWS IAM : Utilisateurs, Groupes &amp; Rôles',
      html: [
        '<p>AWS Identity and Access Management (IAM) est le service mondial gratuit permettant de contrôler de manière sécurisée les accès aux ressources AWS :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Utilisateurs IAM (Users)</h4>',
        '    <p>Identité persistante attribuée à une personne ou un système spécifique nécessitant un accès console (mot de passe + MFA) ou programmatique (Access Key ID et Secret Access Key).</p>',
        '    <p>Bonne pratique : ne jamais créer d\'utilisateurs IAM avec des accès administrateurs pour des services automatisés.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Groupes IAM (Groups)</h4>',
        '    <p>Regroupement logique d\'utilisateurs (ex: <code>Developpeurs</code>, <code>Auditeurs-Securite</code>) simplifiant l\'application collective de politiques d\'autorisation.</p>',
        '    <p>Un groupe ne peut pas contenir d\'autres groupes et ne possède pas d\'identifiants propres.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Rôles IAM (Roles)</h4>',
        '    <p>Identité sans identifiant permanent, endossable temporairement par des entités de confiance (instances EC2 via Instance Profile, fonctions Lambda, utilisateurs fédérés).</p>',
        '    <p>Génère des jetons éphémères via <strong>AWS Security Token Service (STS)</strong> valides de 15 minutes à 12 heures, éliminant les fuites de clés statiques.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Structure &amp; Syntaxe des Politiques d\'Autorisation JSON',
      html: [
        '<p>Toute autorisation dans AWS est déclarée sous forme d\'un document JSON normalisé :</p>',
        '<pre><code>{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Sid": "AllowS3ReadOnlyProduction",\n      "Effect": "Allow",\n      "Action": [\n        "s3:GetObject",\n        "s3:ListBucket"\n      ],\n      "Resource": [\n        "arn:aws:s3:::data-prod-2026",\n        "arn:aws:s3:::data-prod-2026/*"\n      ],\n      "Condition": {\n        "Bool": { "aws:MultiFactorAuthPresent": "true" }\n      }\n    }\n  ]\n}</code></pre>',
        '<ul>',
        '  <li><strong>Version :</strong> toujours spécifier <code>"2012-10-17"</code> (la version moderne supportant les variables de stratégie et conditions).</li>',
        '  <li><strong>Effect :</strong> obligatoirement <code>Allow</code> ou <code>Deny</code>.</li>',
        '  <li><strong>Action :</strong> liste des opérations API ciblées (supporte les caractères génériques ex: <code>ec2:Describe*</code>).</li>',
        '  <li><strong>Resource :</strong> liste des ARN sur lesquels s\'appliquent les actions.</li>',
        '  <li><strong>Condition :</strong> bloc facultatif restreignant l\'autorisation (ex: présence du MFA, plage d\'adresses IP source <code>aws:SourceIp</code>, date/heure).</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Moteur d\'Évaluation des Politiques : La Règle d\'Or d\'AWS',
      html: [
        '<p>Lorsqu\'un utilisateur ou un service émet un appel d\'API, le moteur IAM évalue l\'ensemble des politiques selon un ordre invariable :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Logique de Décision IAM</h4>',
        '    <ol>',
        '      <li><strong>1. Refus par défaut (Default Deny) :</strong> toute action est interdite a priori.</li>',
        '      <li><strong>2. Recherche d\'un Explicit Deny :</strong> si n\'importe quelle politique applicable (politique d\'identité, SCP, politique de ressource) stipule <code>Deny</code> sur l\'action, la décision est <strong>immédiatement et irrévocablement DENY</strong>.</li>',
        '      <li><strong>3. Recherche d\'un Explicit Allow :</strong> si aucun Deny n\'est trouvé et qu\'au moins une politique stipule <code>Allow</code>, la décision devient <strong>ALLOW</strong>.</li>',
        '      <li><strong>4. Refus implicite :</strong> en l\'absence de déclaration Allow applicable, la décision finale reste <strong>DENY</strong>.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Politiques d\'Identité vs Politiques de Ressource</h4>',
        '    <ul>',
        '      <li><strong>Identity-based policies :</strong> attachées aux utilisateurs, groupes ou rôles (gérées par AWS ou par le client).</li>',
        '      <li><strong>Resource-based policies :</strong> attachées directement aux ressources (ex: Bucket Policy S3, politique de clé KMS, politique de file SQS). Elles comportent un champ obligatoire <code>Principal</code> définissant QUI a le droit d\'agir.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Cycle de Vie des Clés d\'Accès &amp; Sécurité des Identifiants',
      html: [
        '<p>Les clés d\'accès permanentes (Access Key ID / Secret Access Key) constituent le vecteur d\'attaque le plus fréquemment ciblé par les cybercriminels :</p>',
        '<ul>',
        '  <li><strong>Format officiel :</strong> les clés IAM permanentes débutent par <code>AKIA</code> et comportent 20 caractères alphanumériques majuscules. Les clés temporaires STS commencent par <code>ASIA</code>.</li>',
        '  <li><strong>Seuil de rotation maximal :</strong> les standards industriels (CIS AWS Foundations Benchmark) exigent une <strong>rotation tous les 90 jours</strong> au maximum.</li>',
        '  <li><strong>Privilégier les Instance Profiles :</strong> une instance EC2 ou un conteneur ECS ne doit JAMAIS contenir de clés d\'accès écrites sur disque. Le rattachement d\'un rôle IAM fournit automatiquement des identifiants temporaires renouvelés via le service de métadonnées d\'instance (IMDSv2).</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Gouvernance Multi-Comptes : AWS Organizations &amp; SCPs',
      html: [
        '<p>Dans les architectures d\'entreprise, l\'isolation des charges de travail impose une stratégie multi-comptes (comptes distincts pour la Sécurité, le Réseau, la Préproduction et la Production) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>AWS Organizations</h4>',
        '    <p>Permet de consolider la facturation (Consolidated Billing) et de structurer les comptes membres en une arborescence d\'Unités Organisationnelles (OUs - Organizational Units).</p>',
        '    <p>Le compte de gestion (Management Account) administre la hiérarchie et applique les stratégies globales.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Service Control Policies (SCPs)</h4>',
        '    <p>Les SCPs définissent les permissions maximales autorisées (garde-fous) pour les comptes d\'une OU ou d\'un compte individuel :</p>',
        '    <ul>',
        '      <li>Une SCP <strong>ne confère jamais de droit</strong>, elle limite la portée des autorisations que les administrateurs locaux peuvent accorder.</li>',
        '      <li>Pour qu\'une action soit possible dans un compte membre, elle doit être explicitement autorisée à CHAQUE niveau de l\'arbre hiérarchique, et interdite à AUCUN niveau.</li>',
        '      <li>Exemple : interdire la désactivation du chiffrement ou l\'utilisation d\'une région non approuvée (ex: interdire les régions hors Europe).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Cadrage des Droits & IAM Hardening',
  method: [
    'Inventaire des besoins et application stricte du principe du moindre privilège (PoLP) : spécifier des actions API et des ARN de ressources granulaires sans jamais utiliser d\'étoile générique (*:*).',
    'Déploiement systématique de rôles IAM temporaires pour les charges de calcul : bannir les Access Keys sur les VMs EC2, les conteneurs et les lambdas au profit d\'Instance Profiles.',
    'Activation obligatoire du Multi-Factor Authentication (MFA) : exiger un token TOTP ou une clé FIDO2 matérielle pour tout utilisateur console et protéger les actions sensibles via des conditions JSON (aws:MultiFactorAuthPresent).',
    'Mise en place de garde-fous centralisés avec les SCPs : bloquer l\'accès aux régions non utilisées, interdire la suppression des logs CloudTrail et verrouiller les buckets de sauvegarde.'
  ],

  summary: [
    'AWS IAM gère les identités (Utilisateurs, Groupes, Rôles temporaires STS) et les politiques d\'autorisation JSON à l\'échelle mondiale sans frais supplémentaires.',
    'Les rôles IAM éliminent les risques de fuite de clés statiques en fournissant des identifiants éphémères renouvelés automatiquement.',
    'Le moteur d\'évaluation IAM applique le Default Deny, donne une priorité absolue et immuable à tout Explicit Deny, puis vérifie la présence d\'un Explicit Allow.',
    'Les clés d\'accès statiques AKIA doivent faire l\'objet d\'une rotation obligatoire tous les 90 jours maximum selon le CIS Benchmark.',
    'AWS Organizations et les Service Control Policies (SCPs) imposent des limites supérieures de permissions infranchissables sur l\'ensemble des comptes d\'entreprise.'
  ],

  checklist: [
    'Savez-vous expliquer la différence entre un utilisateur IAM et un rôle IAM temporaire ?',
    'Connaissez-vous les 5 blocs fondamentaux d\'une déclaration de politique JSON (Version, Statement, Effect, Action, Resource, Condition) ?',
    'Pouvez-vous prédire sans erreur l\'issue d\'une requête en présence de politiques contradictoires Allow et Deny ?',
    'Savez-vous pourquoi les SCPs dans AWS Organizations ne confèrent aucun droit direct mais définissent des garde-fous ?',
    'Avez-vous compris le mécanisme de jetons STS et l\'intérêt d\'un Instance Profile sur une instance EC2 ?'
  ],

  notions: [
    { term: 'Rôle IAM', def: 'Identité sans mot de passe permanent, endossable temporairement par des services ou utilisateurs via AWS STS.' },
    { term: 'Instance Profile', def: 'Conteneur permettant de transmettre un rôle IAM à une machine virtuelle Amazon EC2 sans identifiants écrits sur disque.' },
    { term: 'AWS STS', def: 'Security Token Service : service générant des jetons d\'accès temporaires signés d\'une durée de vie limitée.' },
    { term: 'Explicit Deny', def: 'Déclaration Effect: Deny l\'emportant de façon irrévocable sur toute autre autorisation dans le moteur IAM.' },
    { term: 'Service Control Policy (SCP)', def: 'Politique d\'AWS Organizations définissant les limites maximales de permissions pour une organisation ou une OU.' },
    { term: 'Moindre Privilège', def: 'Principe de sécurité consistant à n\'accorder que les permissions strictement nécessaires à l\'accomplissement d\'une tâche.' },
    { term: 'IMDSv2', def: 'Instance Metadata Service version 2 : API locale (169.254.169.254) sécurisée par jeton de session contre les failles SSRF.' },
    { term: 'Credential Report', def: 'Rapport téléchargeable d\'audit listant l\'état, l\'âge et l\'utilisation des identifiants et clés de tous les utilisateurs du compte.' }
  ],

  pitfalls: [
    'Créer des clés d\'accès AccessKeyId permanentes pour des applications s\'exécutant sur des instances EC2 au lieu d\'utiliser un Instance Profile.',
    'Supposer qu\'une SCP avec Effect: Allow confère des droits directs à un utilisateur : la SCP n\'est qu\'un filtre supérieur, il faut aussi une politique IAM d\'identité.',
    'Oublier de spécifier l\'ARN de la ressource dans une politique IAM en utilisant Resource: "*", ce qui expose inutilement toutes les ressources du compte.',
    'Négliger la politique de confiance (Trust Policy) d\'un rôle IAM, sans laquelle aucune entité ne peut endosser le rôle.'
  ],

  questions: [
    {
      stem: 'Que se passe-t-il si un utilisateur IAM fait l\'objet d\'une politique avec « Effect: Allow » sur s3:* et d\'une autre politique avec « Effect: Deny » sur s3:DeleteBucket ?',
      opts: ['L\'utilisateur peut supprimer les buckets car Allow est évalué en premier', 'La suppression de bucket est strictement refusée, mais les autres opérations S3 sont autorisées', 'Toutes les opérations S3 sont bloquées', 'Une erreur de conflit de politique est levée dans la console'],
      correct: 1,
      exp: 'L\'Explicit Deny est prioritaire absolu sur tout Allow. L\'utilisateur conserve le droit d\'exécuter toutes les actions S3 (GetObject, PutObject...) SAUF DeleteBucket qui est refusée.'
    },
    {
      stem: 'Quel mécanisme AWS permet à une application exécutée sur une instance EC2 d\'accéder à S3 sans stocker de clés d\'accès en dur sur le serveur ?',
      opts: ['Un fichier texte ~/.aws/credentials contenant les clés root', 'Un Instance Profile associant un rôle IAM à l\'instance EC2', 'Une variable d\'environnement globale dans /etc/profile', 'Un tunnel VPN IPsec dédié'],
      correct: 1,
      exp: 'L\'Instance Profile transmet un rôle IAM à la VM EC2. Le SDK Boto3/AWS CLI interroge alors automatiquement le service de métadonnées (IMDS) pour obtenir des clés temporaires renouvelées en continu.'
    },
    {
      stem: 'Quel préfixe identifie de manière univoque une clé d\'accès IAM permanente dans AWS ?',
      opts: ['ASIA', 'AKIA', 'AROA', 'AIDA'],
      correct: 1,
      exp: 'AKIA désigne une clé d\'accès permanente pour utilisateur IAM. Les clés temporaires fournies par STS commencent par ASIA, les rôles par AROA et les utilisateurs par AIDA.'
    },
    {
      stem: 'Selon les recommandations officielles d\'AWS et le benchmark CIS, quelle est la fréquence maximale de rotation des clés d\'accès ?',
      opts: ['Tous les 7 jours', 'Tous les 30 jours', 'Tous les 90 jours', 'Tous les 365 jours'],
      correct: 2,
      exp: 'Le benchmark CIS AWS Foundations exige une rotation d\'au moins tous les 90 jours pour toute clé d\'accès IAM permanente afin de minimiser le risque de compromission.'
    },
    {
      stem: 'Quel est le rôle exact d\'une Service Control Policy (SCP) dans AWS Organizations ?',
      opts: ['Accorder des droits administratifs aux utilisateurs d\'un compte', 'Définir une limite supérieure (garde-fou) des permissions autorisées sur les comptes membres d\'une OU', 'Chiffrer automatiquement tous les disques EBS d\'une région', 'Générer la facture consolidée mensuelle'],
      correct: 1,
      exp: 'Une SCP ne donne aucun droit direct. Elle agit comme un filtre supérieur interdisant formellement certaines actions ou limitant le périmètre d\'action possible des administrateurs du compte.'
    },
    {
      stem: 'Quelle version de document de stratégie doit être impérativement déclarée dans le champ « Version » d\'une politique JSON moderne ?',
      opts: ['2008-10-17', '2012-10-17', '2024-01-01', 'latest'],
      correct: 1,
      exp: 'La valeur officielle standard est strictement « 2012-10-17 ». L\'ancienne version « 2008-10-17 » ne supporte pas les conditions avancées ni les variables de stratégie.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre une Identity-based policy et une Resource-based policy ?',
      opts: ['Les Resource-based policies sont payantes', 'Une Resource-based policy est attachée directement à la ressource (ex: bucket S3) et contient un élément « Principal » obligatoire', 'Les Identity-based policies ne peuvent pas comporter de Condition', 'Il n\'y a aucune différence'],
      correct: 1,
      exp: 'Une Resource-based policy (comme une Bucket Policy S3) est attachée à la ressource elle-même et doit impérativement spécifier « Principal » pour désigner QUI a le droit d\'y accéder.'
    },
    {
      stem: 'Si aucune politique applicable ne mentionne une action donnée, quelle décision est prise par le moteur IAM ?',
      opts: ['ALLOW (car rien n\'interdit l\'action)', 'DENY (en vertu du refus par défaut / Default Deny)', 'ASK_USER (une alerte est envoyée par e-mail)', 'LOG_ONLY (l\'action est permise mais consignée)'],
      correct: 1,
      exp: 'Dans AWS IAM, la sécurité repose sur le modèle de fermeture par défaut : toute action qui n\'est pas explicitement autorisée est systématiquement refusée (Default Deny).'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence entre un utilisateur IAM et un rôle IAM ?',
      a: 'L\'utilisateur a des identifiants permanents (mot de passe/clés) ; le rôle utilise des jetons temporaires STS sans mot de passe persistant.'
    },
    {
      q: 'Quel est l\'ordre d\'évaluation du moteur d\'autorisation IAM ?',
      a: '1. Default Deny ; 2. Explicit Deny (priorité absolue) ; 3. Explicit Allow ; 4. Default Deny final si aucun Allow.'
    },
    {
      q: 'Quels sont les composants clés d\'une politique IAM JSON ?',
      a: 'Version, Statement : [ { Effect (Allow/Deny), Action, Resource, Condition } ].'
    },
    {
      q: 'À quoi sert une Service Control Policy (SCP) ?',
      a: 'À définir les permissions maximales autorisées (garde-fous) sur les comptes d\'une organisation AWS sans accorder de droits directs.'
    },
    {
      q: 'Qu\'est-ce qu\'un Instance Profile dans EC2 ?',
      a: 'Un conteneur transmettant un rôle IAM temporaire à une instance EC2 pour éviter de stocker des clés d\'accès en dur sur la machine.'
    },
    {
      q: 'Quelle est la fréquence de rotation recommandée pour les clés IAM ?',
      a: '90 jours au maximum pour les clés statiques selon le CIS AWS Benchmark (ou privilégier les rôles sans clé).'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions IAM et ordre d\'évaluation mal assimilés. Révisez le Default Deny et les rôles STS.' },
    { cls: 'mid', text: 'Score 60-74 % : Connaissances de base acquises. Entraînez-vous à décrypter des politiques JSON complexes.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise. Pratiquez l\'évaluation de politiques et la détection de clés obsolètes dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau avancé. Vous maîtrisez les SCPs multi-comptes et les bonnes pratiques de moindre privilège.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'expert sécurité AWS. Prêt pour les services de calcul EC2, EBS et Auto Scaling du Module 3 !' }
  ]
};
