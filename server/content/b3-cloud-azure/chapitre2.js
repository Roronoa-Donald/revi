/**
 * Chapitre 2 du cours « Cloud Microsoft Azure B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Identité Microsoft Entra ID (Azure AD), RBAC &amp; Gouvernance',
  short: 'Entra ID, RBAC &amp; Gouvernance',
  toc: 'Gestion centralisée des identités avec Microsoft Entra ID (utilisateurs, groupes, Managed Identities pour ressources Azure), contrôle d’accès basé sur les rôles (Azure RBAC, Actions / NotActions, wildcards, rôles intégrés Owner/Contributor/Reader et rôles personnalisés), gouvernance déclarative par Azure Policy, verrous de ressources (Resource Locks) et sécurisation des secrets via Azure Key Vault.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans un environnement d\'entreprise hébergeant des données financières et des infrastructures critiques, accorder des droits trop larges (ex: rôle Owner ou Contributor généralisé) expose l\'organisation à des destructions accidentelles et des compromissions massives. En tant qu\'administrateur Cloud Azure, vous devez appliquer le principe du moindre privilège (Least Privilege) via Azure RBAC, automatiser l\'authentification applicative sans mot de passe avec les Managed Identities, imposer des garde-fous de conformité avec Azure Policy et protéger les secrets et certificats dans un Azure Key Vault sécurisé par Soft-Delete et Purge Protection.',
  objectives: [
    'maîtriser le modèle d\'identité Microsoft Entra ID (ex-Azure Active Directory) et les Managed Identities ;',
    'concevoir et évaluer des attributions de rôles Azure RBAC selon le principe du moindre privilège ;',
    'comprendre la structure JSON d\'un rôle RBAC (Actions, NotActions, DataActions, NotDataActions et AssignableScopes) ;',
    'définir et assigner des règles de gouvernance Azure Policy avec effets Audit et Deny ;',
    'sécuriser les secrets, clés et certificats d\'entreprise dans Azure Key Vault avec Soft-Delete et Purge Protection ;',
    'analyser et résoudre méthodologiquement des évaluateurs de permissions RBAC, des moteurs de conformité Policy et des auditeurs de secrets Key Vault.'
  ],
  sections: [
    {
      title: 'Identité Moderne avec Microsoft Entra ID &amp; Managed Identities',
      html: [
        '<p>Microsoft Entra ID (anciennement Azure Active Directory) est le service d\'annuaire et de gestion des identités dans le Cloud. Contrairement à Active Directory Domain Services (AD DS) traditionnel basé sur Kerberos et NTLM, Entra ID repose sur des protocoles modernes web et Cloud (OAuth 2.0, OpenID Connect, SAML 2.0) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Objets d\'Identité Fondamentaux</h4>',
        '    <ul>',
        '      <li><strong>Utilisateurs &amp; Groupes :</strong> comptes membres du tenant ou invités externes (B2B) regroupés de manière statique ou dynamique (par attributs de département ou titre).</li>',
        '      <li><strong>Service Principals (Principaux de service) :</strong> identité attribuée à une application tierce ou un pipeline CI/CD (GitHub Actions, Azure DevOps) pour interagir de façon autonome avec l\'API Azure.</li>',
        '      <li><strong>Rôle de sécurité :</strong> l\'authentification multifacteur (MFA) et les stratégies d\'accès conditionnel (Conditional Access) protègent les accès à risque selon la localisation, l\'état de conformité du terminal et le risque utilisateur.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Managed Identities (Identités Managées)</h4>',
        '    <ul>',
        '      <li><strong>Zéro secret dans le code :</strong> élimine le besoin pour les développeurs d\'écrire des identifiants ou mots de passe dans les fichiers de configuration de leurs VMs ou Web Apps.</li>',
        '      <li><strong>System-Assigned :</strong> identité liée au cycle de vie de la ressource Azure. Si la VM est supprimée, son identité dans Entra ID est automatiquement révoquée.</li>',
        '      <li><strong>User-Assigned :</strong> ressource Azure indépendante pouvant être partagée entre plusieurs machines ou conteneurs pour mutualiser des permissions identiques.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Contrôle d\'Accès Granulaire Azure RBAC (Role-Based Access Control)',
      html: [
        '<p>Azure RBAC détermine les autorisations accordées à une identité (Security Principal) sur un périmètre donné (Scope). Une attribution de rôle combine obligatoirement trois éléments : <strong>Qui</strong> (Principal), <strong>Quoi</strong> (Role Definition) et <strong>Où</strong> (Scope) :</p>',
        '<table class="table">',
        '  <thead><tr><th>Composant du Rôle RBAC</th><th>Rôle et Syntaxe</th><th>Exemple Concret</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Actions (Plan de contrôle)</strong></td><td>Liste des opérations administratives autorisées via ARM (création, modification, lecture, redémarrage).</td><td><code>Microsoft.Compute/virtualMachines/restart/action</code></td></tr>',
        '    <tr><td><strong>NotActions</strong></td><td>Opérations expressément exclues de la liste précédente (effet de soustraction de droits).</td><td><code>Microsoft.Compute/virtualMachines/delete</code></td></tr>',
        '    <tr><td><strong>DataActions (Plan de données)</strong></td><td>Opérations sur les données applicatives internes de la ressource (lecture de blobs, requêtes Cosmos DB).</td><td><code>Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read</code></td></tr>',
        '    <tr><td><strong>NotDataActions</strong></td><td>Exclusions appliquées aux opérations de données internes.</td><td><code>Microsoft.Storage/storageAccounts/blobServices/containers/blobs/delete</code></td></tr>',
        '    <tr><td><strong>AssignableScopes</strong></td><td>Périmètres où le rôle peut être attribué (abonnements, groupes de gestion).</td><td><code>/subscriptions/1111-2222-3333</code></td></tr>',
        '  </tbody>',
        '</table>',
        '<p><strong>Règle d\'or de l\'évaluation Azure :</strong> Une opération est autorisée si et seulement si elle correspond à au moins un pattern dans <code>Actions</code> ET ne correspond à AUCUN pattern dans <code>NotActions</code>.</p>'
      ].join('\n')
    },
    {
      title: 'Gouvernance avec Azure Policy, Resource Locks &amp; Azure Key Vault',
      html: [
        '<p>Au-delà des droits utilisateurs individuels, l\'organisation d\'entreprise doit garantir la conformité globale et la protection de ses actifs cryptographiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Azure Policy &amp; Resource Locks</h4>',
        '    <ul>',
        '      <li><strong>Azure Policy :</strong> moteur de règles déclaratives évaluant les propriétés des ressources créées. Effet <code>Deny</code> pour bloquer une création non conforme (ex: région interdite) ou <code>Audit</code> pour signaler les écarts dans un tableau de bord.</li>',
        '      <li><strong>Resource Locks (Verrous) :</strong>',
        '        <br>- <code>CanNotDelete</code> : lecture et modification autorisées, mais suppression interdite.',
        '        <br>- <code>ReadOnly</code> : consultation uniquement, toute modification ou suppression est rejetée (même par le propriétaire Owner).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Sécurité Azure Key Vault</h4>',
        '    <ul>',
        '      <li><strong>Gestion centralisée :</strong> stockage hermétique des clés de chiffrement (HSM FIPS 140-2), mots de passe applicatifs (Secrets) et certificats TLS/SSL.</li>',
        '      <li><strong>Soft-Delete (Suppression réversible) :</strong> les secrets supprimés sont conservés dans une corbeille protégée pendant 7 à 90 jours au lieu d\'être détruits immédiatement.</li>',
        '      <li><strong>Purge Protection :</strong> empêche même l\'administrateur de forcer la purge définitive avant l\'expiration de la période de rétention (défense absolue contre les rançongiciels).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Remplacement des comptes nominatifs par des Managed Identities : activer une Managed Identity System-Assigned sur chaque serveur ou conteneur pour éliminer définitivement les clés d\'accès en dur dans le code.',
    'Définition des attributions RBAC au périmètre le plus restreint : n\'assigner jamais de droits au niveau de l\'abonnement quand un groupe de ressources suffit, et préférer des rôles d\'exploitation dédiés (ex. Virtual Machine User Login).',
    'Déploiement d\'Azure Policy pour la gouvernance territoriale et les tags : créer une initiative de politiques imposant la localisation westeurope/francecentral et la présence obligatoire des tags CostCenter et Environment.',
    'Chiffrement et verrouillage des ressources de production : placer un verrou CanNotDelete sur les passerelles réseau et bases de données, et centraliser tous les mots de passe de production dans un Key Vault avec Purge Protection activée.'
  ],
  summary: [
    'Microsoft Entra ID centralise les identités Cloud et offre les Managed Identities pour une authentification automatique sans mot de passe.',
    'Azure RBAC applique le contrôle d\'accès granulaire combinant un Principal, une Définition de rôle et un Périmètre (Scope).',
    'La structure d\'un rôle RBAC repose sur Actions (autorisations) et NotActions (exclusions soustractives), évaluées avec wildcards.',
    'Azure Policy impose des contraintes de conformité aux ressources (ex: restriction géographique, tags obligatoires) avec les effets Deny et Audit.',
    'Azure Key Vault protège les secrets contre les rançongiciels grâce aux mécanismes combinés de Soft-Delete et Purge Protection.'
  ],
  checklist: [
    'Savez-vous différencier une Managed Identity System-Assigned d\'une identité User-Assigned ?',
    'Pouvez-vous expliquer pourquoi une action présente dans NotActions est systématiquement refusée même si Actions contient * ?',
    'Connaissez-vous la différence entre un verrou CanNotDelete et un verrou ReadOnly ?',
    'Savez-vous rédiger une condition Azure Policy pour bloquer la création de machines hors des régions autorisées ?',
    'Comprenez-vous le rôle de la Purge Protection face aux scénarios d\'attaque par rançongiciel ?'
  ],
  notions: [
    { term: 'Managed Identity', def: 'Identité gérée automatiquement par Azure dans Entra ID pour une ressource Cloud, permettant de s\'authentifier auprès d\'autres services sans stocker de secret.' },
    { term: 'RBAC (Role-Based Access Control)', def: 'Modèle d\'autorisation fondé sur des rôles découpés en Actions et NotActions assignés à un niveau de scope précis.' },
    { term: 'Scope (Périmètre)', def: 'Niveau hiérarchique auquel s\'applique une attribution de rôle (Management Group, Subscription, Resource Group ou Ressource individuelle).' },
    { term: 'Azure Policy', def: 'Service de gouvernance évaluant la conformité des propriétés des ressources par rapport à des règles d\'entreprise déclaratives.' },
    { term: 'Purge Protection', def: 'Fonctionnalité de sécurité imposant la rétention incompressible des objets supprimés dans Key Vault, interdisant toute destruction définitive prématurée.' }
  ],
  pitfalls: [
    'Attribuer le rôle Contributor à une équipe de développement au niveau de l\'abonnement complet au lieu de restreindre les droits à leur Resource Group de dev/test.',
    'Confondre Azure RBAC (qui gère l\'autorisation des utilisateurs sur ARM) et Azure Policy (qui contrôle la configuration et les propriétés des ressources).',
    'Oublier qu\'un verrou de ressource ReadOnly empêche également le démarrage et l\'arrêt d\'une machine virtuelle car cette action met à jour le statut dans ARM.',
    'Désactiver la Purge Protection sur un Azure Key Vault de production : un compte administrateur compromis pourrait détruire irréversiblement les clés de chiffrement de l\'entreprise.'
  ],
  questions: [
    {
      stem: 'Quel est l\'avantage principal d\'utiliser une Managed Identity (Identité Managée) pour une machine virtuelle Azure accédant à une base de données ?',
      opts: [
        'Accélération de la vitesse de la carte réseau virtuelle',
        'Suppression totale des identifiants et mots de passe stockés en clair dans le code de l\'application',
        'Gratuité des requêtes SQL exécutées',
        'Chiffrement automatique des disques physiques du datacenter'
      ],
      correct: 1,
      exp: 'Une Managed Identity permet à la VM de demander un jeton d\'accès Entra ID directement à la plateforme Azure locale sans qu\'aucun secret ni mot de passe ne soit inscrit dans le code applicatif.'
    },
    {
      stem: 'Dans une définition de rôle Azure RBAC, comment s\'articulent les directives Actions et NotActions ?',
      opts: [
        'NotActions s\'applique uniquement si la ressource est située hors d\'Europe',
        'Une action est autorisée si elle est présente dans Actions ET absente de NotActions',
        'NotActions remplace Actions et autorise toutes les opérations inverses',
        'Actions est réservé aux administrateurs, NotActions aux utilisateurs réguliers'
      ],
      correct: 1,
      exp: 'Dans Azure RBAC, une opération est validée si elle correspond à au moins un élément d\'Actions et ne correspond à AUCUN élément de NotActions (soustraction stricte de privilèges).'
    },
    {
      stem: 'Quel rôle prédéfini (Built-in Role) permet de créer et modifier toutes les ressources Azure sans pouvoir gérer les attributions de droits RBAC à d\'autres utilisateurs ?',
      opts: ['Owner', 'Contributor', 'Reader', 'User Access Administrator'],
      correct: 1,
      exp: 'Le rôle Contributor possède Actions: ["*"] avec NotActions excluant les modifications d\'autorisations RBAC (Microsoft.Authorization/*).'
    },
    {
      stem: 'Quel effet Azure Policy devez-vous employer pour empêcher immédiatement le déploiement d\'une machine virtuelle si sa localisation n\'est pas dans la liste autorisée ?',
      opts: ['Audit', 'Deny', 'Append', 'Disabled'],
      correct: 1,
      exp: 'L\'effet Deny bloque la requête de déploiement au niveau d\'ARM et retourne un message d\'erreur explicite à l\'utilisateur avant même que la ressource ne soit créée.'
    },
    {
      stem: 'Quel verrou de ressource (Resource Lock) permet aux utilisateurs de lire et modifier les données d\'une ressource mais interdit rigoureusement sa suppression ?',
      opts: ['ReadOnly', 'CanNotDelete', 'NoModification', 'WriteOnly'],
      correct: 1,
      exp: 'Le verrou CanNotDelete protège la ressource contre toute suppression accidentelle tout en autorisant les modifications de configuration et les mises à jour.'
    },
    {
      stem: 'Que se passe-t-il si un utilisateur tente de modifier la configuration d\'une ressource protégée par un verrou ReadOnly ?',
      opts: [
        'La modification est acceptée mais signalée par email',
        'La modification est rejetée avec une erreur d\'autorisation, car ReadOnly bloque toute écriture et suppression',
        'La modification est placée dans une file d\'attente d\'approbation',
        'Le verrou bascule automatiquement en mode CanNotDelete'
      ],
      correct: 1,
      exp: 'Un verrou ReadOnly équivaut à restreindre l\'accès à des droits de pure lecture (Reader) pour tous les utilisateurs, interdisant toute modification ou suppression.'
    },
    {
      stem: 'Dans Azure Key Vault, quel est le rôle de la fonctionnalité Soft-Delete ?',
      opts: [
        'Supprimer immédiatement les données sans laisser de trace',
        'Conserver les secrets et clés supprimés dans un état récupérable pendant une période paramétrable de 7 à 90 jours',
        'Diviser par deux le coût de stockage des secrets',
        'Chiffrer les secrets avec un algorithme plus léger'
      ],
      correct: 1,
      exp: 'Soft-Delete empêche la perte définitive immédiate en plaçant les objets supprimés dans une corbeille protégée pendant une durée de 7 à 90 jours (par défaut 90 jours).'
    },
    {
      stem: 'Quelle mesure de sécurité Key Vault empêche un attaquant disposant des droits administrateurs de purger immédiatement un secret placé en Soft-Delete ?',
      opts: ['Firewall IP', 'Purge Protection', 'Private Endpoint', 'Azure Bastion'],
      correct: 1,
      exp: 'Purge Protection verrouille l\'objet en corbeille jusqu\'à la fin de la période de rétention Soft-Delete, empêchant toute destruction prématurée même par un compte administrateur.'
    }
  ],
  flashcards: [
    {
      q: 'Qu\'est-ce qu\'une Managed Identity Azure et quel problème de sécurité résout-elle ?',
      a: 'Une identité gérée automatiquement dans Entra ID pour une ressource Azure. Elle supprime le besoin d\'enregistrer des clés ou mots de passe en clair dans le code applicatif.'
    },
    {
      q: 'Quelle est la formule d\'évaluation d\'une autorisation Azure RBAC ?',
      a: 'L\'action doit correspondre à une règle dans Actions (avec wildcards) et ne correspondre à AUCUNE règle dans NotActions.'
    },
    {
      q: 'Quelle est la différence fondamentale entre le rôle Owner et le rôle Contributor ?',
      a: 'Owner peut déléguer des droits et assigner des rôles RBAC à d\'autres identités (Microsoft.Authorization/*), tandis que Contributor en est expressément exclu.'
    },
    {
      q: 'Quelle est la distinction clé entre Azure RBAC et Azure Policy ?',
      a: 'RBAC gère QUI (les identités autorisées à agir), tandis qu\'Azure Policy gère QUOI (les règles de configuration imposées aux ressources déployées).'
    },
    {
      q: 'Quelles sont les différences entre les verrous CanNotDelete et ReadOnly ?',
      a: 'CanNotDelete autorise les modifications mais bloque la suppression ; ReadOnly interdit à la fois toute modification et toute suppression.'
    },
    {
      q: 'Comment s\'articulent Soft-Delete et Purge Protection dans Azure Key Vault ?',
      a: 'Soft-Delete place les secrets supprimés en corbeille temporaire (7 à 90 jours) ; Purge Protection interdit à quiconque de vider cette corbeille avant le terme légal.'
    }
  ],
  mastery: [
    {
      title: 'Implémentation d\'une architecture Zero Trust avec Managed Identities',
      desc: 'Configurer des identités managées User-Assigned pour des microservices et interconnecter les flux sans aucun secret partagé.'
    },
    {
      title: 'Création de rôles RBAC sur-mesure (Custom Roles)',
      desc: 'Rédiger des gabarits JSON de rôles personnalisés avec exclusions chirurgicales pour déléguer l\'administration sans risque d\'élévation.'
    },
    {
      title: 'Gouvernance multi-abonnements par Azure Policy Initiatives',
      desc: 'Créer une initiative regroupant les exigences de souveraineté géographique européenne et les règles d\'étiquetage fiscal FinOps.'
    },
    {
      title: 'Sécurisation de secrets d\'entreprise dans Azure Key Vault',
      desc: 'Automatiser la rotation des secrets, auditer les dates d\'expiration et verrouiller la purge protection contre les menaces de ransomware.'
    },
    {
      title: 'Conception d\'outils d\'audit de sécurité de manière méthodique',
      desc: 'Développer des scripts évaluant automatiquement la conformité des assignations RBAC et des configurations de coffres-forts.'
    }
  ]
};
