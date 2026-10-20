/**
 * Chapitre 2 du cours « Windows Server B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Annuaire d’Entreprise Active Directory (AD DS), Gouvernance AGDLP &amp; Rôles FSMO',
  short: 'Active Directory, AGDLP &amp; FSMO',
  toc: 'Architecture hiérarchique Active Directory Domain Services (Schéma, Forêt, Arbres, Domaines et Unités Organisationnelles OU), contrôleurs de domaine (DC) et réplication multi-maîtres, les 5 rôles FSMO de forêt et domaine, modèle de gouvernance des accès AGDLP / AGUDLP, gestion fine des comptes de service gérés (gMSA), et audit de sécurité des identités (Event IDs 4720, 4726, 4728).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Active Directory Domain Services (AD DS) constitue la colonne vertébrale de l’identité et de la sécurité dans plus de 90 % des systèmes d’information d’entreprise. Une mauvaise modélisation de l’annuaire — arborescence d’OUs chaotique, attribution directe d’utilisateurs sur des ACLs sans passer par des groupes de sécurité, méconnaissance des rôles FSMO lors d’un crash de contrôleur — conduit inévitablement à des compromissions de privilèges critiques, des failles d’intégrité et des pannes de réplication bloquantes. En troisième année, l’ingénieur système doit maîtriser la hiérarchie complète de la forêt, concevoir une gestion des accès irréprochable basée sur la méthodologie standard Microsoft AGDLP/AGUDLP, assurer la résilience des maîtres d’opérations FSMO, et monitorer en continu les journaux d’audit de sécurité pour détecter toute tentative d’élévation de privilèges frauduleuse.',
  objectives: [
    'assimiler la structure hiérarchique d’Active Directory (Schéma, Forêt, Arbre, Domaine racine, Domaines enfants, Unités Organisationnelles) ;',
    'différencier la réplication multi-maîtres standard des 5 rôles d’opérations à maître unique FSMO (Schema, Domain Naming, PDC, RID, Infrastructure) ;',
    'concevoir une arborescence de groupes conforme à la méthodologie standard Microsoft AGDLP / AGUDLP pour rationaliser l’administration des droits ;',
    'distinguer avec rigueur les portées de groupes (Global, Local de Domaine, Universel) et leurs capacités d’imbrication multi-domaines ;',
    'exploiter les journaux d’audit Windows Security pour tracer le cycle de vie des identités et détecter les modifications de groupes sensibles (4720, 4726, 4728) ;',
    'implémenter en Python 3 des vérificateurs de conformité AGDLP, des routeurs d’opérations FSMO et des parseurs de journaux d’audit de sécurité.'
  ],
  sections: [
    {
      title: 'Architecture Hiérarchique d’Active Directory Domain Services (AD DS)',
      html: [
        '<p>Active Directory structure l’ensemble des identités, machines et ressources réseau dans un annuaire distribué normalisé basé sur les standards X.500 et LDAPv3 :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Éléments Logiques Fondamentaux</h4>',
        '    <ul>',
        '      <li><strong>Schéma Active Directory :</strong> définition formelle de l’annuaire. Contient la liste de toutes les classes d’objets (utilisateur, ordinateur, groupe) et de leurs attributs autorisés (nom, mot de passe, email). Unique à l’échelle de la forêt.</li>',
        '      <li><strong>Forêt (Forest) :</strong> frontière de sécurité ultime de l’annuaire. Regroupe un ou plusieurs arbres partageant le même schéma, la même configuration globale et le même catalogue global (Global Catalog - GC).</li>',
        '      <li><strong>Arbre (Tree) :</strong> ensemble de domaines partageant un espace de noms DNS contigu reliés par des relations d’approbation bidirectionnelles et transitives.</li>',
        '      <li><strong>Domaine (Domain) :</strong> unité administrative de base contenant les objets et appliquant des stratégies de sécurité communes (ex. politique de mot de passe du domaine).</li>',
        '      <li><strong>Unité Organisationnelle (OU) :</strong> conteneur administratif interne au domaine permettant de structurer les objets et d’y lier des stratégies de groupe (GPO) ou d’y déléguer des privilèges.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Partitions d’Annuaire & Réplication</h4>',
        '    <p>La base de données AD (<code>ntds.dit</code>) est segmentée en partitions logiques répliquées entre contrôleurs :</p>',
        '    <ul>',
        '      <li><strong>Partition de Schéma :</strong> répliquée sur tous les contrôleurs de la forêt.</li>',
        '      <li><strong>Partition de Configuration :</strong> topologie physique, sites et services AD répliqués dans toute la forêt.</li>',
        '      <li><strong>Partition de Domaine :</strong> tous les objets utilisateurs, groupes et ordinateurs propres à un domaine spécifique.</li>',
        '      <li><strong>Partition d’Application :</strong> zones DNS intégrées (ForestDNSZones, DomainDNSZones).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les 5 Rôles FSMO (Flexible Single Master Operations)',
      html: [
        '<p>Bien que la majorité des modifications Active Directory fassent l’objet d’une réplication multi-maîtres (chaque DC peut créer ou modifier des objets), cinq fonctions critiques exigent un arbitrage centralisé à maître unique (FSMO) pour éviter les collisions :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Rôles à l’Échelle de la Forêt (Forest-Wide)</h4>',
        '    <ul>',
        '      <li><strong>Schema Master (Maître de Schéma) :</strong> unique contrôleur de la forêt autorisé à modifier ou étendre les classes et attributs du schéma AD (ex. lors de l’installation d’Exchange ou de la mise à niveau fonctionnelle de l’annuaire).</li>',
        '      <li><strong>Domain Naming Master (Maître d’attribution des noms de domaine) :</strong> autorise l’ajout ou la suppression de domaines ou de partitions d’applications au sein de la forêt.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Rôles à l’Échelle du Domaine (Domain-Wide)</h4>',
        '    <ul>',
        '      <li><strong>PDC Emulator (Émulateur PDC) :</strong> rôle le plus sollicité du domaine. Fait office de référence horaire NTP racine, reçoit immédiatement les modifications et échecs de mot de passe, émule les anciens contrôleurs NT4 et sert de cible privilégiée pour l’édition des GPOs.</li>',
        '      <li><strong>RID Master (Maître RID) :</strong> alloue des blocs de 500 identifiants relatifs (RID - Relative Identifiers) à chaque contrôleur de domaine pour composer des identifiants de sécurité uniques (SID).</li>',
        '      <li><strong>Infrastructure Master (Maître d’infrastructure) :</strong> met à jour les références d’objets inter-domaines et synchronise les GUID et SID entre domaines de la forêt.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('Gestion des Pannes FSMO', [
          '<p>En cas de maintenance planifiée d’un contrôleur détenant un rôle FSMO, on procède à un <strong>transfert de rôle</strong> gracieux (Role Transfer via PowerShell : <code>Move-ADDirectoryServerOperationMasterRole</code>). En cas de crash matériel définitif d’un DC, l’administrateur doit effectuer une <strong>saisie forcée de rôle</strong> (Role Seizure). Attention : un serveur dont les rôles Schema, Domain Naming ou RID ont été saisis de force ne doit <strong>JAMAIS</strong> être reconnecté au réseau sous peine de corrompre gravement l’annuaire.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Gouvernance des Identités : Méthodologie Standard AGDLP / AGUDLP',
      html: [
        '<p>Pour administrer les droits d’accès sur les fichiers et applications sans créer de dettes techniques ni de failles de sécurité, Microsoft impose la méthodologie d’imbrication <strong>AGDLP</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Échelons du Modèle AGDLP</h4>',
        '    <ul>',
        '      <li><strong>A (Accounts) :</strong> Comptes utilisateurs individuels (ex. Pierre, Sophie).</li>',
        '      <li><strong>G (Global Groups) :</strong> Groupes globaux représentant un rôle métier ou une appartenance organisationnelle (ex. <code>GG_Comptabilite</code>, <code>GG_RessourcesHumaines</code>).</li>',
        '      <li><strong>DL (Domain Local Groups) :</strong> Groupes locaux de domaine décrivant une permission précise sur une ressource ciblée (ex. <code>DL_Factures_Lecture</code>, <code>DL_DossierPaie_Modif</code>).</li>',
        '      <li><strong>P (Permissions) :</strong> La ressource (partage réseau, ACL NTFS) accorde les droits <em>exclusivement</em> au groupe Local de Domaine (DL).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Extension Multi-Domaines : AGUDLP</h4>',
        '    <p>Dans les environnements multi-domaines complexes, l’échelon <strong>U (Universal Groups)</strong> s’intercale entre les groupes globaux et les groupes locaux de domaine :</p>',
        '    <p><code>Accounts -&gt; Global Groups -&gt; Universal Groups -&gt; Domain Local Groups -&gt; Permissions</code></p>',
        '    <p>Les groupes universels sont indexés dans le Catalogue Global (GC), ce qui permet à des utilisateurs de plusieurs domaines distincts de se regrouper dans un groupe universel sans encombrer le trafic de réplication local.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Concevoir une arborescence d’Unités Organisationnelles (OU) par découpage géographique ou fonctionnel étanche (jamais par type d’objet pur).',
    'Placer systématiquement les utilisateurs dans des groupes globaux métier (GG) décrivant leur fonction professionnelle.',
    'Créer pour chaque ressource partagée des groupes locaux de domaine (DL) reflétant les niveaux de privilèges (Lecture, Modification, Contrôle total).',
    'Imbriquer les groupes globaux (GG) dans les groupes locaux de domaine (DL) appropriés sans jamais affecter directement un compte utilisateur sur une ressource.',
    'Répartir les 5 rôles FSMO stratégiquement sur au moins deux contrôleurs de domaine distincts (isoler le PDC Emulator du Master RID).',
    'Surveiller les événements d’audit de sécurité (Event IDs 4720, 4726, 4728) pour bloquer toute intégration illégitime dans les groupes Domain Admins.'
  ],
  summary: [
    'La forêt est la frontière de sécurité ultime d’Active Directory, unifiée par un schéma commun et une partition de configuration globale.',
    'Cinq rôles FSMO régissent les opérations à maître unique : Schema Master et Domain Naming (forêt), PDC Emulator, RID Master et Infrastructure Master (domaine).',
    'Le PDC Emulator est le rôle de domaine le plus critique : synchronisation horaire NTP, réplication immédiate des mots de passe et gestion des GPOs.',
    'Le standard AGDLP garantit une gestion propre et pérenne : Accounts -> Global Groups -> Domain Local Groups -> Permissions.',
    'Les groupes universels (modèle AGUDLP) permettent d’agréger des groupes globaux de plusieurs domaines au sein du Catalogue Global.',
    'Les Event IDs 4720 (création), 4726 (suppression) et 4728 (adhésion groupe) constituent la base de la surveillance de la compromission d’annuaire.'
  ],
  checklist: [
    'L’arborescence des OUs sépare-t-elle clairement les comptes utilisateurs, les postes clients, les serveurs membres et les comptes d’administration ?',
    'Les 5 rôles FSMO sont-ils localisés et documentés à l’aide de la commande netdom query fsmo ?',
    'Aucun compte utilisateur n’est-il directement assigné dans une ACL NTFS sans passer par un groupe Local de Domaine (DL) ?',
    'Les groupes globaux contiennent-ils exclusivement des comptes du même domaine ?',
    'La procédure de secours en cas de perte définitive d’un contrôleur FSMO (saisie de rôle ntdsutil / PowerShell) est-elle éprouvée ?',
    'L’audit de gestion des comptes et de modification des groupes de sécurité est-il activé dans les stratégies de groupe du domaine ?'
  ],
  notions: [
    {
      name: 'Forêt Active Directory',
      desc: 'Ensemble d’un ou plusieurs arbres de domaines Active Directory partageant le même schéma logique et constituant la limite de sécurité absolue.'
    },
    {
      name: 'Rôles FSMO',
      desc: 'Cinq rôles d’opérations à maître unique attribués à des contrôleurs de domaine spécifiques pour prévenir les conflits de données.'
    },
    {
      name: 'PDC Emulator',
      desc: 'Rôle FSMO de domaine assurant la synchronisation horaire NTP, l’émulation de contrôleur principal et la cohérence immédiate des mots de passe.'
    },
    {
      name: 'RID Master',
      desc: 'Rôle FSMO allouant des pools d’identifiants relatifs (RID) aux contrôleurs de domaine pour la création d’identifiants de sécurité (SID) uniques.'
    },
    {
      name: 'Modèle AGDLP',
      desc: 'Méthodologie officielle Microsoft structurant l’attribution des permissions : Accounts -> Global Groups -> Domain Local Groups -> Permissions.'
    },
    {
      name: 'Groupe Global (GG)',
      desc: 'Portée de groupe Active Directory conçue pour regrouper des comptes d’un même domaine partageant une même fonction métier.'
    },
    {
      name: 'Groupe Local de Domaine (DL)',
      desc: 'Portée de groupe Active Directory destinée à être assignée directement sur les listes de contrôle d’accès (ACLs) d’une ressource.'
    },
    {
      name: 'Event ID 4728',
      desc: 'Événement d’audit Windows Security généré chaque fois qu’un membre est ajouté à un groupe de sécurité Active Directory.'
    }
  ],
  pitfalls: [
    {
      title: 'Attribution directe d’utilisateurs sur les ACLs',
      desc: 'Accorder des permissions NTFS directement à un compte d’utilisateur plutôt qu’à un groupe Domain Local crée un désordre ingérable et interdit tout audit de sécurité.'
    },
    {
      title: 'Reconnexion d’un contrôleur après saisie forcée de rôle FSMO',
      desc: 'Rallumer un ancien contrôleur de domaine dont les rôles Schema ou RID ont été saisis de force entraîne une corruption irrémédiable de l’annuaire par conflit USN.'
    },
    {
      title: 'Désynchronisation horaire du PDC Emulator',
      desc: 'Un décalage horaire supérieur à 5 minutes entre le PDC Emulator et les postes clients casse totalement l’authentification Kerberos dans tout le domaine.'
    },
    {
      title: 'Absence d’audit sur le groupe Domain Admins',
      desc: 'Ne pas surveiller l’Event ID 4728 sur le groupe Domain Admins permet à un attaquant d’élever discrètement ses privilèges sans déclencher d’alerte.'
    }
  ],
  questions: [
    {
      stem: 'Quelle est la frontière ultime de sécurité dans l’architecture logique Microsoft Active Directory ?',
      opts: [
        'L’Unité Organisationnelle (OU)',
        'Le Domaine local',
        'La Forêt Active Directory',
        'Le groupe de travail Workgroup'
      ],
      correct: 2,
      exp: 'La Forêt représente la limite de sécurité absolue : les administrateurs de la racine de la forêt peuvent contrôler l’ensemble des domaines de celle-ci.'
    },
    {
      stem: 'Quel rôle FSMO est chargé de délivrer des blocs d’identifiants pour la création de nouveaux objets ?',
      opts: [
        'Le Schema Master',
        'Le RID Master',
        'Le Domain Naming Master',
        'L’Infrastructure Master'
      ],
      correct: 1,
      exp: 'Le RID Master distribue des blocs de 500 RIDs à chaque DC pour composer les SIDs uniques des nouveaux utilisateurs, groupes et ordinateurs.'
    },
    {
      stem: 'Dans la méthodologie AGDLP, à quel type de groupe accorde-t-on directement les permissions (ACLs) sur les fichiers ?',
      opts: [
        'Aux groupes Globaux (GG)',
        'Aux groupes Universels (UG)',
        'Aux groupes Locaux de Domaine (DL)',
        'Directement aux comptes d’utilisateurs'
      ],
      correct: 2,
      exp: 'Les permissions sont toujours affectées exclusivement aux groupes Locaux de Domaine (DL), qui accueillent ensuite les groupes globaux métier.'
    },
    {
      stem: 'Quel rôle FSMO fait office d’horloge de référence NTP pour tous les ordinateurs et serveurs du domaine ?',
      opts: [
        'L’Infrastructure Master',
        'Le Schema Master',
        'Le PDC Emulator',
        'Le Global Catalog'
      ],
      correct: 2,
      exp: 'Le PDC Emulator est la source de temps faisant autorité dans le domaine pour respecter la tolérance de synchronisation Kerberos (5 min).'
    },
    {
      stem: 'Quel événement du journal de sécurité correspond à l’ajout d’un membre dans un groupe Active Directory ?',
      opts: [
        'Event ID 4624',
        'Event ID 4720',
        'Event ID 4728',
        'Event ID 7036'
      ],
      correct: 2,
      exp: 'L’Event ID 4728 enregistre spécifiquement l’ajout d’un compte dans un groupe de sécurité avec le nom de l’acteur ayant effectué l’action.'
    },
    {
      stem: 'Que doit-on impérativement faire d’un contrôleur dont le rôle FSMO a été saisi de force (seize) après un crash ?',
      opts: [
        'Le redémarrer simplement en mode sans échec',
        'Le formater et ne JAMAIS le reconnecter au réseau Active Directory',
        'Le promouvoir contrôleur secondaire',
        'Changer son adresse IP'
      ],
      correct: 1,
      exp: 'Un contrôleur dont les rôles ont été saisis de force ne doit jamais réapparaître dans l’annuaire car il contiendrait des métadonnées obsolètes créant des conflits USN.'
    },
    {
      stem: 'Dans le modèle AGUDLP multi-domaines, que représente la lettre « U » ?',
      opts: [
        'Unités Organisationnelles',
        'Groupes Universels',
        'Utilisateurs privilégiés',
        'Mises à jour automatiques'
      ],
      correct: 1,
      exp: 'Le U correspond aux Universal Groups (groupes universels), qui permettent de consolider des groupes globaux issus de différents domaines de la forêt.'
    },
    {
      stem: 'Quel événement du journal de sécurité Windows trace la suppression d’un compte utilisateur dans l’annuaire ?',
      opts: [
        'Event ID 4720',
        'Event ID 4726',
        'Event ID 4738',
        'Event ID 4768'
      ],
      correct: 1,
      exp: 'L’Event ID 4726 consigne la suppression définitive d’un objet compte d’utilisateur dans Active Directory.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les 5 rôles FSMO d’Active Directory ?',
      a: 'Schema Master et Domain Naming (forêt) ; PDC Emulator, RID Master et Infrastructure Master (domaine).'
    },
    {
      q: 'Quelle est la signification de l’acronyme AGDLP ?',
      a: 'Accounts (comptes) -> Global Groups (métier) -> Domain Local Groups (ressource) -> Permissions (ACLs).'
    },
    {
      q: 'Pourquoi le rôle PDC Emulator est-il le plus critique du domaine ?',
      a: 'Car il synchronise l’horloge NTP pour Kerberos, traite les échecs et modifications de mots de passe, et sert de cible pour les GPOs.'
    },
    {
      q: 'Quelle est la différence entre un transfert de rôle et une saisie forcée (seize) ?',
      a: 'Le transfert est coopératif et planifié entre deux DCs en ligne ; la saisie est une appropriation d’urgence après le crash définitif d’un DC.'
    },
    {
      q: 'À quoi sert le rôle RID Master ?',
      a: 'À allouer des blocs d’identifiants relatifs (RIDs) à chaque contrôleur pour forger des SIDs uniques lors de la création d’objets.'
    },
    {
      q: 'Quel est l’Event ID signalant l’ajout d’un membre dans un groupe de sécurité ?',
      a: 'L’Event ID 4728 dans le journal de sécurité Windows (Security log).'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Confusion entre rôles de forêt et rôles de domaine, ou non-respect de la chaîne de permissions AGDLP.'
    },
    {
      cls: 'medium',
      text: 'Bonne modélisation d’annuaire, gestion rigoureuse des groupes AGDLP et compréhension des responsabilités de chaque rôle FSMO.'
    },
    {
      cls: 'high',
      text: 'Expertise d’architecte d’annuaire : gouvernance AGUDLP multi-domaines, gestion de crise FSMO et audit temps réel des élévations de privilèges.'
    }
  ]
};
