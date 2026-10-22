/**
 * Chapitre 3 du cours « Windows Server B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Stratégies de Groupe (GPO), Modèle LSDOU &amp; Gouvernance de Parc',
  short: 'Stratégies de Groupe (GPO) &amp; LSDOU',
  toc: 'Architecture des Group Policy Objects (conteneur GPC dans AD et modèle GPT dans SYSVOL), cycle d’évaluation et ordre d’application strict LSDOU (Local, Site, Domaine, Unité Organisationnelle), résolution des conflits et arbitrage d’héritage (Enforced / No Override vs Block Inheritance), filtrage fin de sécurité par ACL et filtres dynamiques WMI (WQL), modèles d’administration ADMX/ADML, Central Store, et durcissement de sécurité du parc de machines clientes.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Les stratégies de groupe (GPO - Group Policy Objects) représentent le levier d’automatisation et de sécurité le plus puissant d’un domaine Windows Server : elles permettent de déployer de manière centralisée des configurations système, des restrictions logicielles et des politiques de durcissement sur des milliers de postes clients et serveurs en quelques secondes. Cependant, une mauvaise maîtrise de la cinématique d’évaluation GPO entraîne des ralentissements majeurs à l’ouverture de session, des conflits de stratégies inexplicables et des failles d’application critiques. Pour un ingénieur système de niveau Bachelor 3, la gouvernance de parc impose une rigueur absolue : comprendre la dissociation physique entre le conteneur logique (GPC) et les fichiers de modèles (GPT dans SYSVOL), appliquer la règle de précédence LSDOU (Local -> Site -> Domain -> OU), maîtriser les mécanismes d’exception (Enforced et Block Inheritance), et exploiter les filtres WMI pour cibler chirurgicalement les déploiements selon le matériel et la version d’OS.',
  objectives: [
    'maîtriser l’architecture interne des GPOs : synchronisation entre le Group Policy Container (GPC) et le Group Policy Template (GPT dans SYSVOL) ;',
    'appliquer l’ordre séquentiel strict de traitement LSDOU (Local, Site, Domaine, OU) et déterminer la stratégie gagnante en cas de conflit ;',
    'résoudre les cas complexes d’héritage de stratégies avec les options Enforced (application forcée) et Block Inheritance (blocage de l’héritage) ;',
    'configurer un filtrage de sécurité (Security Filtering) par groupes d’ordinateurs et restreindre l’application via le droit Apply Group Policy ;',
    'concevoir des filtres dynamiques WMI en langage WQL pour conditionner l’application d’une GPO aux spécifications matérielles et d’OS ;',
    'analyser et résoudre méthodologiquement des calculateurs de précédence LSDOU, des moteurs d’arbitrage Enforced/Block et des évaluateurs de filtres WMI.'
  ],
  sections: [
    {
      title: 'Architecture Interne et Composants d’une GPO (GPC vs GPT)',
      html: [
        '<p>Une stratégie de groupe n’est pas un fichier monolithique : elle est constituée de deux composants distincts physiquement synchronisés par les contrôleurs de domaine :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Conteneur GPC (Group Policy Container)</h4>',
        '    <ul>',
        '      <li><strong>Emplacement :</strong> stocké directement dans la base de données Active Directory (<code>CN=Policies,CN=System,DC=domaine,DC=lan</code>).</li>',
        '      <li><strong>Contenu :</strong> métadonnées de la GPO, identifiant unique GUID (ex. <code>{31B2F340-016D-11D2-945F-00C04FB984F9}</code> pour la Default Domain Policy), numéro de version, statut (activée, désactivée, composants utilisateur/ordinateur désactivés) et listes de contrôle d’accès (ACL).</li>',
        '      <li><strong>Réplication :</strong> répliqué par le moteur standard multi-maîtres d’Active Directory.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le Modèle GPT (Group Policy Template)</h4>',
        '    <ul>',
        '      <li><strong>Emplacement :</strong> stocké dans le système de fichiers partagé sur tous les contrôleurs : <code>\\\\domaine\\SYSVOL\\domaine\\Policies\\{GUID}</code>.</li>',
        '      <li><strong>Contenu :</strong> fichiers de configuration réels, scripts de démarrage/ouverture de session, paramètres de registre (<code>Registry.pol</code>), modèles de sécurité et fichiers <code>gpt.ini</code> contenant le numéro de version.</li>',
        '      <li><strong>Réplication :</strong> répliqué entre contrôleurs de domaine par le service de réplication DFS (DFSR - Distributed File System Replication).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Cycle d’Évaluation et Ordre de Précédence LSDOU',
      html: [
        '<p>Lors du démarrage de l’ordinateur ou de l’ouverture de session d’un utilisateur, le moteur Group Policy traite les stratégies dans une séquence chronologique immuable :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>La Règle Séquentielle L - S - D - O - U</h4>',
        '    <ol>',
        '      <li><strong>1. Local (L) :</strong> Stratégie de sécurité locale définie sur le poste de travail individuel (niveau le plus faible).</li>',
        '      <li><strong>2. Site (S) :</strong> Stratégies liées au site Active Directory auquel appartient le sous-réseau IP de la machine.</li>',
        '      <li><strong>3. Domaine (D) :</strong> Stratégies liées à la racine du domaine (ex. <code>Default Domain Policy</code>).</li>',
        '      <li><strong>4. Unité Organisationnelle (OU) :</strong> Stratégies liées aux OUs parentes puis aux OUs enfants les plus imbriquées.</li>',
        '    </ol>',
        '    <p><strong>Principe du « Dernier Écrivain Gagne » :</strong> Les niveaux s’exécutent dans l’ordre $1 \\to 2 \\to 3 \\to 4$. En cas de conflit sur un même paramètre, la stratégie appliquée en dernier (le niveau le plus profond) écrase les valeurs précédentes.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Ordre de Liaison (Link Order)</h4>',
        '    <p>Lorsque plusieurs GPOs sont liées au même conteneur (ex. sur la même OU) :</p>',
        '    <ul>',
        '      <li>Chaque lien possède un numéro d’ordre : 1, 2, 3...</li>',
        '      <li>Le lien d’ordre le plus élevé est traité en premier, et le <strong>Link Order 1</strong> est exécuté en dernier.</li>',
        '      <li>Par conséquent, la GPO avec <strong>Link Order = 1 a la précédence la plus haute</strong> au sein de ce conteneur.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Arbitrage Avancé : Enforced, Block Inheritance & Filtres WMI',
      html: [
        '<p>Pour adapter le déploiement aux contraintes métier complexes, Windows Server fournit des mécanismes d’exception et de ciblage conditionnel :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Blocage d’Héritage vs Application Forcée (Enforced)</h4>',
        '    <ul>',
        '      <li><strong>Bloquer l’héritage (Block Inheritance) :</strong> option activée au niveau d’une OU. Empêche l’application de toutes les GPOs héritées des niveaux supérieurs (Site, Domaine, OUs parentes). Les stratégies de l’OU s’appliquent seules.</li>',
        '      <li><strong>Appliquée / Forcée (Enforced - ancien No Override) :</strong> option configurée sur un lien de GPO. Une GPO Enforced <strong>traverse obligatoirement tous les blocages d’héritage</strong> et ne peut être écrasée par aucune stratégie fille. C’est l’arme absolue de la sécurité régalienne.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Filtrage de Sécurité & Requêtes WMI</h4>',
        '    <ul>',
        '      <li><strong>Filtrage de Sécurité (Security Filtering) :</strong> retire le groupe par défaut <code>Utilisateurs authentifiés</code> des ACLs de la GPO pour le remplacer par un groupe de sécurité spécifique (ex. <code>GG_Postes_Compta</code>) avec le droit <em>Appliquer la stratégie de groupe</em> (Apply Group Policy).</li>',
        '      <li><strong>Filtres WMI (WQL) :</strong> évaluent dynamiquement les caractéristiques matérielles du poste avant d’exécuter la GPO. Exemple : <code>SELECT * FROM Win32_OperatingSystem WHERE Version LIKE "10.0%" AND ProductType = "1"</code> (cible uniquement les postes clients Windows 10/11 et exclut les serveurs).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Éviter de surcharger la Default Domain Policy : réserver cette GPO uniquement aux paramètres transverses minimaux (politique de compte, mots de passe).',
    'Créer des GPOs modulaires dédiées à une seule fonction (ex. GPO-BitLocker, GPO-PareFeu, GPO-ConfigProxy) pour faciliter le diagnostic.',
    'Utiliser le Magasin Central (Central Store) dans SYSVOL pour centraliser les modèles d’administration ADMX/ADML et éviter les divergences de versions.',
    'Vérifier la cohérence de version entre le conteneur GPC dans AD et le modèle GPT dans SYSVOL à l’aide de l’outil d’analyse de réplication.',
    'Appliquer l’option Enforced avec une extrême parcimonie et uniquement sur des impératifs légaux ou sécuritaires non négociables.',
    'Tester l’application effective des stratégies sur les postes clients via la commande gpresult /h rapport.html.'
  ],
  summary: [
    'Une GPO est composée de métadonnées dans l’annuaire AD (GPC) et de fichiers de configuration dans le partage réseau SYSVOL (GPT).',
    'L’ordre d’application chronologique strict est LSDOU : Local -> Site -> Domaine -> Unité Organisationnelle (le niveau le plus profond gagne).',
    'Au sein d’une même OU, la GPO avec le Link Order 1 possède la précédence la plus élevée face aux ordres supérieurs.',
    'L’option Enforced (application forcée) prévaut absolument sur le blocage d’héritage (Block Inheritance) et interdit tout écrasement descendant.',
    'Le filtrage de sécurité restreint l’exécution d’une GPO aux membres d’un groupe détenant le droit d’accès « Appliquer la stratégie ».',
    'Les filtres WMI permettent d’interroger les propriétés matérielles et l’OS (WQL) pour conditionner dynamiquement le traitement de la stratégie.'
  ],
  checklist: [
    'Le Central Store des fichiers ADMX/ADML est-il déployé dans SYSVOL pour harmoniser les consoles d’administration ?',
    'La Default Domain Policy contient-elle exclusivement les politiques globales de compte et de mot de passe ?',
    'L’ordre de liaison (Link Order) a-t-il été contrôlé sur chaque conteneur regroupant plusieurs GPOs actives ?',
    'L’activation de Block Inheritance sur une OU a-t-elle été validée pour ne pas couper des accès ou des configurations vitales ?',
    'Les requêtes de filtre WMI ont-elles été testées avec wmic ou Get-CimInstance pour éviter les temps d’attente excessifs à l’ouverture de session ?',
    'Un rapport gpresult /h a-t-il été généré sur un poste cible pour vérifier la liste exacte des GPOs gagnantes et rejetées ?'
  ],
  notions: [
    {
      name: 'Modèle LSDOU',
      desc: 'Séquence chronologique officielle d’application des stratégies de groupe : Local, Site, Domaine, Unité Organisationnelle.'
    },
    {
      name: 'Central Store (Magasin Central)',
      desc: 'Répertoire unique situé dans SYSVOL hébergeant les modèles d’administration ADMX/ADML pour tous les contrôleurs de domaine.'
    },
    {
      name: 'Option Enforced (Appliquée)',
      desc: 'Paramètre de liaison de GPO forçant son application prioritaire à travers tous les blocages d’héritage sans possibilité d’écrasement.'
    },
    {
      name: 'Block Inheritance',
      desc: 'Option d’une Unité Organisationnelle empêchant l’héritage des stratégies de groupe configurées sur les conteneurs parents.'
    },
    {
      name: 'Filtrage de Sécurité (Security Filtering)',
      desc: 'Mécanisme d’ACL restreignant l’exécution d’une GPO aux seuls objets ayant le droit « Appliquer la stratégie de groupe ».'
    },
    {
      name: 'Filtrez WMI (WQL)',
      desc: 'Requête d’interrogation de la base de gestion Windows conditionnant l’application d’une GPO aux caractéristiques matérielles du poste.'
    },
    {
      name: 'GPC (Group Policy Container)',
      desc: 'Composant logique d’une GPO stocké dans Active Directory contenant les métadonnées, le GUID, la version et les ACLs.'
    },
    {
      name: 'GPT (Group Policy Template)',
      desc: 'Composant physique d’une GPO stocké dans SYSVOL contenant les fichiers de registre, scripts et modèles de configuration.'
    }
  ],
  pitfalls: [
    {
      title: 'Usage abusif de l’option Enforced',
      desc: 'Forcer de multiples GPOs crée une complexité ingérable et empêche toute adaptation locale légitime pour des besoins spécifiques de filiales.'
    },
    {
      title: 'Filtres WMI trop lourds ou mal optimisés',
      desc: 'Exécuter des requêtes WQL scannant l’intégralité du système de fichiers ou du registre allonge considérablement la durée d’ouverture de session des utilisateurs.'
    },
    {
      title: 'Désynchronisation de version entre GPC et GPT',
      desc: 'Une panne de réplication DFSR sur SYSVOL entraîne une divergence entre la version AD et la version fichier, bloquant l’application de la GPO.'
    },
    {
      title: 'Suppression du droit Read aux Utilisateurs Authentifiés',
      desc: 'Retirer complètement le droit de lecture lors du filtrage de sécurité peut empêcher la machine de lire la GPO même si son groupe y est autorisé.'
    }
  ],
  questions: [
    {
      stem: 'Dans quel ordre séquentiel les stratégies de groupe sont-elles évaluées par le client Windows ?',
      opts: [
        'OU -> Domaine -> Site -> Local',
        'Local -> Site -> Domaine -> Unité Organisationnelle (LSDOU)',
        'Domaine -> Local -> OU -> Site',
        'Par ordre alphabétique du nom des stratégies'
      ],
      correct: 1,
      exp: 'L’ordre officiel est LSDOU : Local, puis Site, puis Domaine, et enfin Unité Organisationnelle (le dernier niveau appliqué l’emporte).'
    },
    {
      stem: 'Où sont physiquement stockés les fichiers de modèles de stratégie GPT (Registry.pol, scripts) ?',
      opts: [
        'Dans le répertoire C:\\Windows\\System32\\config',
        'Directement dans la base de registre locale',
        'Dans le partage réseau SYSVOL répliqué entre contrôleurs de domaine',
        'Sur le site web de support de Microsoft'
      ],
      correct: 2,
      exp: 'Le Group Policy Template (GPT) est stocké dans le partage réseau répliqué \\\\domaine\\SYSVOL\\domaine\\Policies\\{GUID}.'
    },
    {
      stem: 'Si une GPO de niveau Domaine est marquée « Enforced » et qu’une OU enfant active « Bloquer l’héritage », que se passe-t-il ?',
      opts: [
        'La stratégie de domaine est totalement bloquée',
        'La stratégie de domaine s’applique obligatoirement et ne peut pas être écrasée',
        'Le serveur affiche un écran bleu BSoD',
        'L’OU enfant est automatiquement supprimée de l’annuaire'
      ],
      correct: 1,
      exp: 'L’option Enforced surpasse impérativement le blocage d’héritage : la GPO de domaine s’applique sans exception.'
    },
    {
      stem: 'Au sein d’une même Unité Organisationnelle avec trois GPOs liées, laquelle a la priorité la plus élevée ?',
      opts: [
        'Celle dont le Link Order est égal à 1',
        'Celle dont le Link Order est égal à 3',
        'Celle qui contient le plus de paramètres',
        'Celle créée le plus récemment'
      ],
      correct: 0,
      exp: 'Le Link Order 1 est évalué en dernier au sein du conteneur : il écrase donc les ordres supérieurs (2, 3...) et gagne.'
    },
    {
      stem: 'Quel droit d’accès d’ACL est obligatoire pour qu’une GPO soit exécutée sur un groupe de machines ciblées ?',
      opts: [
        'Contrôle total (Full Control)',
        'Appliquer la stratégie de groupe (Apply Group Policy) en plus du droit Lire (Read)',
        'Écriture seule',
        'Supprimer l’objet'
      ],
      correct: 1,
      exp: 'Pour que le moteur GPO applique la stratégie, la cible doit détenir à la fois les droits Read et Apply Group Policy.'
    },
    {
      stem: 'À quoi sert un filtre WMI sur une stratégie de groupe ?',
      opts: [
        'À chiffrer le mot de passe de l’administrateur',
        'À conditionner l’application de la GPO à des critères matériels ou de version d’OS évalués dynamiquement',
        'À supprimer les fichiers temporaires du poste client',
        'À bloquer les ports USB du serveur'
      ],
      correct: 1,
      exp: 'Un filtre WMI (requête WQL) vérifie des propriétés du poste (RAM, processeur, version de build d’OS) avant d’autoriser l’application de la GPO.'
    },
    {
      stem: 'Où est déployé le Central Store permettant de centraliser les modèles de stratégies ADMX ?',
      opts: [
        'Dans C:\\Program Files\\Microsoft GPO',
        'Dans \\\\domaine\\SYSVOL\\domaine\\Policies\\PolicyDefinitions',
        'Sur une clé USB connectée au contrôleur principal',
        'Dans la base de registre HKEY_LOCAL_MACHINE'
      ],
      correct: 1,
      exp: 'Le Central Store se place dans \\\\domaine\\SYSVOL\\domaine\\Policies\\PolicyDefinitions pour être partagé par tous les contrôleurs.'
    },
    {
      stem: 'Quelle commande permet de générer un diagnostic complet en HTML des stratégies appliquées sur un poste ?',
      opts: [
        'ping /all',
        'gpupdate /clean',
        'gpresult /h rapport.html',
        'ipconfig /release'
      ],
      correct: 2,
      exp: 'La commande gpresult /h rapport.html génère un rapport visuel exhaustif détaillant toutes les GPOs appliquées et rejetées.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est l’ordre de traitement officiel du modèle LSDOU ?',
      a: 'Local, Site, Domaine, puis Unité Organisationnelle (LSDOU).'
    },
    {
      q: 'Quelle est la différence entre le GPC et le GPT d’une GPO ?',
      a: 'Le GPC stocke les métadonnées dans Active Directory ; le GPT stocke les fichiers réels de configuration dans le partage SYSVOL.'
    },
    {
      q: 'Que fait l’option Enforced (application forcée) ?',
      a: 'Elle traverse obligatoirement tous les blocages d’héritage et interdit tout écrasement par une GPO descendante.'
    },
    {
      q: 'Que fait l’option Block Inheritance sur une OU ?',
      a: 'Elle bloque l’héritage des GPOs parentes (Site, Domaine), sauf celles qui sont marquées Enforced.'
    },
    {
      q: 'Au sein d’une même OU, quelle GPO gagne en cas de conflit ?',
      a: 'La GPO possédant le Link Order le plus bas (Link Order = 1 a la plus haute priorité).'
    },
    {
      q: 'Comment fonctionne le filtrage de sécurité (Security Filtering) ?',
      a: 'En accordant ou refusant le droit « Appliquer la stratégie de groupe » à des groupes d’ordinateurs ou d’utilisateurs spécifiques.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à ordonner la séquence LSDOU ou confusion entre Enforced et Block Inheritance.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de la précédence GPO, structuration propre des OUs et ciblage précis par filtrage de sécurité.'
    },
    {
      cls: 'high',
      text: 'Excellence en gouvernance de parc : déploiement du Central Store ADMX, requêtes WMI complexes et diagnostic gpresult avancé.'
    }
  ]
};
