/**
 * Chapitres 4 à 6 du cours « Administration Windows » B1, alignés sur les
 * supports B1 du module (Dr Abasse KPEGOUNI, « cours B1 IT / ADMIN_WINDOWS ») :
 * Active Directory AD DS — notions (domaine, arbre, forêt), installation d'un
 * contrôleur de domaine, gestion des objets (unités d'organisation,
 * utilisateurs, groupes).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu, et les trois
 * exercices de code sont injectés avant le QCM par le générateur.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Active Directory : domaine, arbre, forêt',
    short: 'Notions AD DS',
    toc: 'Notion d’AD DS, hiérarchie des domaines, arbres et forêts, sous-domaines des succursales.',
    time: '≈ 2 h de travail',

    situation:
      'L’entreprise grandit : des comptes éparpillés sur chaque machine ne suffisent plus. Il faut un ' +
      'annuaire central qui connaisse utilisateurs, ordinateurs et droits — et qui tienne dans une ' +
      'hiérarchie claire quand il y a plusieurs sites. Ce chapitre construit le vocabulaire exact de cet ' +
      'annuaire : domaine, arbre, forêt, sous-domaine.',

    objectives: [
      'définir Active Directory (AD DS) et son organisation hiérarchique ;',
      'décrire le domaine : entité logique qui héberge objets et stratégies ;',
      'construire un arbre (espace de nom contigu) et une forêt (regroupement d’arbres) ;',
      'nommer des sous-domaines de succursales (domaines enfants).'
    ],

    sections: [
      {
        title: 'La notion d’Active Directory',
        html: [
          '<p>Une infrastructure <strong>Active Directory</strong> fonctionne selon une hiérarchie : ' +
          'cette hiérarchie forme une arborescence composée de <strong>domaines</strong>, d’<strong>arbres</strong> ' +
          'et de <strong>forêt</strong>.</p>',
          '<p>Un <strong>domaine</strong> est une entité logique (administrative) Active Directory au sein ' +
          'de laquelle des fonctionnalités et caractéristiques sont partagées. Un domaine héberge des ' +
          '<strong>utilisateurs</strong>, des <strong>ordinateurs</strong>, dans lequel des paramètres de ' +
          '<strong>stratégies</strong> sont définis.</p>',
          '<p>Au sein du domaine, on retrouve un ensemble d’<strong>unités d’organisation</strong> (UO) ' +
          'remplies d’objets de différentes classes : utilisateurs, ordinateurs, groupes, contrôleurs de ' +
          'domaine…</p>',
          box('intuition', 'L’annuaire de l’entreprise', 'compass',
            '    <p>Active Directory est l’annuaire central : un seul endroit où sont décrits les comptes, ' +
            'les machines et les droits. Un utilisateur change de poste ? Son compte suit, il ne se recrée ' +
            'pas machine par machine.</p>')
        ].join('\n')
      },
      {
        title: 'Succursales et sous-domaines',
        html: [
          '<p>De nombreuses entreprises ont plusieurs succursales — donc plusieurs sites sur différents ' +
          'emplacements géographiques. Selon l’importance de ces sites, on pourra créer un <strong>' +
          'sous-domaine</strong> au domaine principal, voire plusieurs sous-domaines.</p>',
          '<p>Exemple du support : on part du domaine de base <code>cdp.org</code>, auquel on ajoute deux ' +
          'sous-domaines — <code>paris.cdp.org</code> et <code>lome.cdp.org</code> — pour les deux ' +
          'succursales de Paris et de Lomé. Ces domaines sont les <strong>domaines enfants</strong> du ' +
          'domaine racine <code>cdp.org</code>.</p>',
          box('pitfall', 'Piège — renommer un domaine après coup', 'warning',
            '    <p>Le support insiste : le nom du domaine est très important, il faut saisir un nom de ' +
            'domaine réel. Le renommage d’un domaine AD DS est possible, mais l’impact technique est très ' +
            'conséquent — pour les PC, les utilisateurs, les services et les logiciels.</p>')
        ].join('\n')
      },
      {
        title: 'Arbre et forêt',
        html: [
          '<p>Lorsqu’un domaine principal contient plusieurs sous-domaines, on parle d’<strong>arbre</strong> : ' +
          'chaque sous-domaine représente une branche. Un arbre est un regroupement hiérarchique de ' +
          'plusieurs domaines ; les domaines d’un même arbre partagent un <strong>espace de nom contigu</strong> ' +
          'et hiérarchique — comme <code>cdp.org</code>, <code>paris.cdp.org</code>, <code>lome.cdp.org</code>.</p>',
          '<p>Si une forêt est un ensemble d’arbres, alors la forêt est un regroupement d’une ou de ' +
          'plusieurs arborescences de domaine. Ces arborescences sont <strong>indépendantes et distinctes</strong> ' +
          'bien qu’elles soient dans la même forêt.</p>',
          '<p>Le support l’illustre : si l’on rachète « college-paris » et que l’on crée un domaine racine ' +
          '<code>college-paris.local</code> avec ses sous-domaines <code>paris.college-paris.local</code>, ' +
          '<code>cameroun.college-paris.local</code> et <code>dev.cameroun.college-paris.local</code>, on ' +
          'obtient un second arbre — racine <code>college-paris.local</code> — dans la même forêt qui en ' +
          'contenait déjà un (<code>cdp.org</code>).</p>',
          box('mnemo', 'Mnémotechnique — trois mots, trois tailles', 'pin',
            '    <p><strong>Domaine</strong> = l’entité (objets + stratégies). <strong>Arbre</strong> = des ' +
            'domaines à nom contigu (cdp.org et ses enfants). <strong>Forêt</strong> = des arbres ' +
            'indépendants réunis. Du plus petit au plus grand : domaine ⊂ arbre ⊂ forêt.</p>')
        ].join('\n')
      },
      {
        title: 'Ce qu’il faut retenir avant d’installer',
        html: [
          '<p>Ce vocabulaire n’est pas décoratif : chaque choix d’installation du chapitre suivant s’exprime ' +
          'en ses termes. « Ajouter une nouvelle forêt » = créer un domaine racine ; choisir le niveau ' +
          'fonctionnel = les services disponibles pour le domaine ; le nom NetBIOS = le préfixe du domaine ' +
          'saisi.</p>',
          '<table>\n' +
          '    <tr><th>Terme</th><th>Définition</th></tr>\n' +
          '    <tr><td>Domaine</td><td>entité logique (administrative) hébergeant objets et stratégies</td></tr>\n' +
          '    <tr><td>Domaine enfant</td><td>sous-domaine dépendant d’un domaine racine</td></tr>\n' +
          '    <tr><td>Arbre</td><td>domaines partageant un espace de nom contigu et hiérarchique</td></tr>\n' +
          '    <tr><td>Forêt</td><td>regroupement d’un ou plusieurs arbres, indépendants entre eux</td></tr>\n' +
          '  </table>',
          box('tech', 'Vers le chapitre suivant', 'terminal',
            '    <p>Le chapitre 5 installe le rôle AD DS et configure une nouvelle forêt : nom DNS, nom ' +
            'NetBIOS, niveaux fonctionnels, mot de passe de restauration, dossiers NTDS.DIT et SYSVOL.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'AD DS s’organise en…', opts: ['domaines, arbres et forêt', 'postes et serveurs', 'rôles et fonctionnalités'], correct: 0, exp: 'La hiérarchie forme une arborescence composée de domaines, arbres et forêt.' },
      { q: 'Un domaine est…', opts: ['une entité logique (administrative) qui héberge objets et stratégies', 'un disque dur réseau', 'une licence Microsoft'], correct: 0, exp: 'Il héberge utilisateurs, ordinateurs, et des paramètres de stratégies.' },
      { q: 'paris.cdp.org est…', opts: ['un domaine enfant de cdp.org', 'une forêt', 'un groupe de sécurité'], correct: 0, exp: 'C’est un sous-domaine (domaine enfant) du domaine racine cdp.org.' },
      { q: 'Un arbre partage…', opts: ['un espace de nom contigu et hiérarchique', 'le même mot de passe', 'une seule UO'], correct: 0, exp: 'Les domaines d’un même arbre partagent un espace de nom contigu.' },
      { q: 'Une forêt regroupe…', opts: ['un ou plusieurs arbres indépendants', 'tous les domaines du monde', 'un seul domaine obligatoirement'], correct: 0, exp: 'Une forêt est un regroupement d’une ou plusieurs arborescences, indépendantes et distinctes.' },
      { q: 'Les objets du domaine sont rangés dans…', opts: ['des unités d’organisation', 'des fichiers .txt', 'des partitions système'], correct: 0, exp: 'Les UO remplissent le domaine d’objets : utilisateurs, ordinateurs, groupes, contrôleurs.' },
      { q: 'Le renommage d’un domaine AD DS…', opts: ['a un impact technique très conséquent', 'se fait en un clic sans effet', 'est impossible'], correct: 0, exp: 'Possible mais lourd : PC, utilisateurs, services et logiciels sont touchés.' },
      { q: 'Le nom NetBIOS correspond…', opts: ['au préfixe du domaine saisi', 'au nom du serveur', 'à la marque de la carte réseau'], correct: 0, exp: 'Lors de la configuration, le nom NetBIOS est dérivé du nom du domaine.' }
    ],

    pitfalls: [
      'Confondre arbre et forêt : l’arbre exige un nom contigu, la forêt réunit des arbres indépendants.',
      'Choisir un nom de domaine à la légère : son renommage coûte très cher techniquement.',
      'Placer les objets directement à la racine du domaine sans structure d’UO.',
      'Croire qu’une forêt ne peut contenir qu’un arbre : le support montre le cas du rachat avec deux arbres.'
    ],

    methodTitle: 'Dessiner une arborescence AD',
    method: [
      'Partir du métier : un site ou plusieurs ? une filiale rachetée ?',
      'Nommer le domaine racine (nom réel, réfléchi), puis les enfants par succursale.',
      'Vérifier la contiguïté : si les noms sont contigus, c’est un arbre ; sinon, une forêt à plusieurs arbres.'
    ],

    summary: [
      'Active Directory est un annuaire hiérarchique : domaine, arbre, forêt.',
      'Le domaine héberge les objets (utilisateurs, ordinateurs, groupes) et les stratégies.',
      'Les sous-domaines servent les succursales : paris.cdp.org, lome.cdp.org.',
      'Un arbre = noms contigus ; une forêt = arbres indépendants réunis.'
    ],

    checklist: [
      'Je définis domaine, arbre et forêt en une phrase chacun.',
      'Je construis l’arborescence d’une entreprise à deux succursales.',
      'Je sais expliquer le risque du renommage d’un domaine.',
      'Je range les objets par classes dans des unités d’organisation.'
    ],

    notions: [
      'Active Directory (AD DS)',
      'domaine',
      'domaine enfant',
      'arbre',
      'forêt',
      'espace de nom contigu',
      'unité d’organisation (UO)',
      'classes d’objets'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — redessine l’exemple cdp.org du support à la main.' },
      { cls: 'mid', text: '50–69 % — rejoue le classement domaine/arbre/forêt sur des cas nouveaux.' },
      { cls: 'good', text: '70–89 % — solide : construis l’arborescence d’une entreprise fictive.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : passe à l’installation du contrôleur de domaine.' }
    ],

    flashcards: [
      { q: 'Les trois niveaux de la hiérarchie AD ?', a: 'Domaine (entité logique), arbre (noms contigus), forêt (regroupement d’arbres indépendants).' },
      { q: 'Que contient un domaine ?', a: 'Des utilisateurs, des ordinateurs, des groupes, des contrôleurs de domaine — et des stratégies.' },
      { q: 'Domaines enfants de cdp.org dans le support ?', a: 'paris.cdp.org et lome.cdp.org (succursales de Paris et Lomé).' },
      { q: 'Pourquoi le nom du domaine est-il critique ?', a: 'Le renommage est possible mais à très fort impact technique (PC, utilisateurs, services, logiciels).' },
      { q: 'Un même arbre partage…', a: 'Un espace de nom contigu et hiérarchique.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Installer un contrôleur de domaine',
    short: 'Installer AD DS',
    toc: 'Ajout du rôle AD DS, promotion en contrôleur de domaine, nouvelle forêt, niveaux fonctionnels, NTDS et SYSVOL, PowerShell.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le serveur est configuré (chapitre 3) : il ne manque que le cœur du réseau d’entreprise. Installer ' +
      'AD DS se fait en deux temps — le rôle, puis la promotion en contrôleur de domaine — et demande ' +
      'cinq informations exactes. Ce chapitre suit l’assistant pas à pas, puis rejoue l’installation en ' +
      'PowerShell.',

    objectives: [
      'installer le rôle AD DS et ses fonctionnalités associées ;',
      'promouvoir le serveur en contrôleur de domaine (nouvelle forêt) ;',
      'fixer nom DNS, nom NetBIOS, niveaux fonctionnels et mot de passe de restauration ;',
      'situer les dossiers de la base (NTDS.DIT), des journaux et de SYSVOL.'
    ],

    sections: [
      {
        title: 'Installer le rôle AD DS',
        html: [
          '<p>Pour ajouter le rôle : <strong>Gestionnaire de serveur → Gérer → Ajouter des rôles et des ' +
          'fonctionnalités</strong>. On choisit « Installation basée sur un rôle ou une fonctionnalité » ' +
          '(un nouveau rôle, pas une fonctionnalité complémentaire), puis le serveur cible — ici le seul ' +
          'serveur du TP.</p>',
          '<p>Pour un réseau d’entreprise simple, on sélectionne uniquement <strong>Services AD DS</strong> ' +
          '(AD DS). Quand la case est cochée, des fonctionnalités complémentaires sont automatiquement ' +
          'sélectionnées : il est impératif de les avoir toutes pour gérer efficacement le serveur AD.</p>',
          '<p>À la fin de l’installation initiale, les <strong>binaires</strong> AD DS sont installés — mais ' +
          'AD DS n’est <strong>pas encore configuré</strong>. Un message du Gestionnaire de serveur propose ' +
          'le lien « <strong>Promouvoir ce serveur en contrôleur de domaine</strong> » : c’est l’assistant ' +
          'de configuration, passage obligatoire.</p>',
          box('pitfall', 'Piège — s’arrêter après l’installation du rôle', 'warning',
            '    <p>Installer les binaires ne configure rien : sans la promotion, il n’y a ni domaine ni ' +
            'contrôleur. Le bandeau jaune du Gestionnaire de serveur le rappelle tant que la configuration ' +
            'est incomplète.</p>')
        ].join('\n')
      },
      {
        title: 'Les informations à réunir avant la configuration',
        html: [
          '<p>Il existe différents types de configuration selon le besoin de l’entreprise. Avant d’exécuter ' +
          'la configuration de l’AD DS, vous devez disposer de :</p>',
          '<ul>\n' +
          '    <li>le <strong>nom DNS</strong> pour le domaine AD DS ;</li>\n' +
          '    <li>le <strong>nom NetBIOS</strong> ;</li>\n' +
          '    <li>le fait que le contrôleur de domaine doit (ou non) prendre en charge les versions antérieures ;</li>\n' +
          '    <li>le fait que le contrôleur de domaine sera également <strong>DNS</strong> ;</li>\n' +
          '    <li>l’emplacement de la base de données <strong>NTDS.DIT</strong> et de <strong>SYSVOL</strong> ' +
          '(+ le mot de passe de restauration).</li>\n' +
          '  </ul>',
          box('method', 'Cinq questions avant de cliquer', 'compass',
            '    <p>Nom DNS du domaine ? Nom NetBIOS (préfixe du domaine) ? Compatibilité ancienne ? DNS ' +
            'sur le même serveur ? Où stocker la base ? Cinq réponses écrites à l’avance = une installation ' +
            'sans retour en arrière.</p>')
        ].join('\n')
      },
      {
        title: 'Ajouter une nouvelle forêt',
        html: [
          '<p>La procédure actuelle étant la création d’un nouveau domaine, on sélectionne « <strong>Ajouter ' +
          'une nouvelle forêt</strong> » et on entre le nom du domaine — un nom réel et réfléchi (chapitre 4).</p>',
          '<p>Le <strong>niveau fonctionnel</strong> d’un domaine correspond aux services disponibles pour ' +
          'ce domaine : plus il est élevé, plus les fonctionnalités sont nombreuses. Le support conseille ' +
          'd’utiliser le niveau le plus haut — Windows Server 2012 R2.</p>',
          '<p>Seconde étape obligatoire : le <strong>mot de passe de restauration</strong> (DSRM). Il sera ' +
          'utilisé uniquement si l’AD DS se retrouve corrompu et inaccessible : c’est le sésame de la ' +
          'restauration. Il doit donc être solide et… mémorisé.</p>',
          '<p>Un message d’avertissement apparaît ensuite : <strong>le rôle AD DS nécessite le rôle DNS</strong>. ' +
          'Si vous installez le DNS en même temps que l’AD DS (ou sans configuration spécifique), la ' +
          'configuration se fera quasi-automatiquement ; sinon (serveur DNS séparé, par exemple Linux), vous ' +
          'devrez créer les zones DNS vous-même.</p>',
          box('intuition', 'Pourquoi DNS est inseparable d’AD', 'compass',
            '    <p>Les clients localisent le domaine par son nom DNS : sans zone DNS correcte, personne ne ' +
            'trouve le contrôleur de domaine. C’est pourquoi l’assistant propose de l’installer en même ' +
            'temps.</p>')
        ].join('\n')
      },
      {
        title: 'Emplacements des données et vérification',
        html: [
          '<p>L’étape « emplacement des données » propose trois dossiers :</p>',
          '<ul>\n' +
          '    <li><strong>Base de données</strong> : tous les fichiers du fonctionnement interne de ' +
          'l’Active Directory — fichiers temporaires, fichiers d’échanges, la base NTDS.DIT ;</li>\n' +
          '    <li><strong>Fichiers journaux</strong> : les logs, lus par l’Observateur d’événements ;</li>\n' +
          '    <li><strong>SYSVOL</strong> : les scripts de connexion des utilisateurs, les GPO (stratégies ' +
          'de groupe) et les fichiers nécessaires à la réplication AD et aux partages publics.</li>\n' +
          '  </ul>',
          '<p>Par défaut ces dossiers vivent sous <code>C:\\Windows</code> ; on peut les déplacer — simple ' +
          'question d’organisation interne. Un <strong>récapitulatif</strong> complet s’affiche, puis vient ' +
          'la vérification : Windows Server dit si les paramètres sont corrects pour un domaine AD. Quand ' +
          'tous les prérequis sont validés, le serveur doit être <strong>obligatoirement redémarré</strong>.</p>',
          '<p>En PowerShell, le même résultat : récupérer le nom du serveur, installer le rôle ' +
          '(<code>Install-WindowsFeature</code>), puis configurer la nouvelle forêt avec ' +
          '<code>Install-ADDSForest</code> — nom de domaine, niveaux fonctionnels et options incluant la ' +
          'création du DNS.</p>',
          box('tech', 'Trois dossiers à retenir', 'terminal',
            '    <p>NTDS.DIT = la base AD. Journaux = les logs. SYSVOL = scripts de connexion, GPO, ' +
          'réplication. Une question d’examen classique : « où sont stockés les GPO ? » → SYSVOL.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Après l’installation initiale du rôle AD DS…', opts: ['les binaires sont là, la configuration reste à faire', 'le domaine est prêt', 'il faut réinstaller Windows'], correct: 0, exp: 'AD DS n’est pas encore configuré : il faut promouvoir le serveur en contrôleur de domaine.' },
      { q: 'Pour créer un domaine racine, l’assistant propose…', opts: ['Ajouter une nouvelle forêt', 'Ajouter un domaine enfant', 'Joindre un domaine existant'], correct: 0, exp: 'La création d’un nouveau domaine racine passe par « Ajouter une nouvelle forêt ».' },
      { q: 'Le niveau fonctionnel du domaine définit…', opts: ['les services disponibles pour ce domaine', 'le prix de la licence', 'le nom du serveur'], correct: 0, exp: 'Plus le niveau est élevé, plus les fonctionnalités sont nombreuses : viser 2012 R2.' },
      { q: 'Le mot de passe de restauration sert…', opts: ['à restaurer un AD DS corrompu et inaccessible', 'à se connecter en utilisateur', 'à installer le DNS'], correct: 0, exp: 'DSRM : utilisé uniquement si l’AD devient inaccessible — d’où sa solidité.' },
      { q: 'L’avertissement à l’installation d’AD DS concerne…', opts: ['le rôle DNS, nécessaire au domaine', 'l’activation de Windows', 'le pare-feu'], correct: 0, exp: 'AD DS nécessite un serveur DNS ; installé en même temps, il se configure quasi-automatiquement.' },
      { q: 'La base de l’Active Directory s’appelle…', opts: ['NTDS.DIT', 'SYSVOL', 'install.wim'], correct: 0, exp: 'NTDS.DIT dans le dossier « base de données » ; SYSVOL porte scripts et GPO.' },
      { q: 'Le dossier SYSVOL contient…', opts: ['scripts de connexion, GPO et fichiers de réplication', 'les logs système', 'les profils utilisateurs'], correct: 0, exp: 'Les fichiers journaux sont dans le second dossier ; SYSVOL est le dossier des stratégies.' },
      { q: 'Quand la vérification des prérequis est passée…', opts: ['le serveur doit obligatoirement redémarrer', 'rien d’autre à faire', 'le domaine est supprimé'], correct: 0, exp: 'Le redémarrage est obligatoire pour finaliser la promotion.' }
    ],

    pitfalls: [
      'S’arrêter après l’installation du rôle : sans promotion, pas de contrôleur de domaine.',
      'Saisir un nom de domaine irréel : son renommage ultérieur est très coûteux (chapitre 4).',
      'Bâcler le mot de passe de restauration : c’est la seule clé de secours d’un AD inaccessible.',
      'Oublier le redémarrage final : la promotion ne s’achève pas sans lui.'
    ],

    methodTitle: 'Installer AD DS sans faux pas',
    method: [
      'Écrire les cinq informations avant l’assistant : DNS, NetBIOS, anciennes versions, DNS local, emplacements.',
      'Suivre l’ordre : rôle → promotion (nouvelle forêt) → niveaux → DSRM → DNS → dossiers.',
      'Lire le récapitulatif, attendre la vérification des prérequis, redémarrer, puis vérifier le domaine.'
    ],

    summary: [
      'Deux temps : installer le rôle AD DS, puis promouvoir le serveur en contrôleur de domaine.',
      '« Ajouter une nouvelle forêt » crée le domaine racine ; le nom doit être réel et réfléchi.',
      'Niveau fonctionnel le plus haut conseillé (2012 R2) ; mot de passe DSRM solide obligatoire.',
      'AD DS exige le DNS ; la base NTDS.DIT, les journaux et SYSVOL ont chacun leur dossier ; redémarrage final.'
    ],

    checklist: [
      'Je sais dérouler l’assistant de bout en bout dans l’ordre.',
      'Je liste les cinq informations à préparer sans regarder le cours.',
      'Je distingue NTDS.DIT, journaux et SYSVOL.',
      'Je connais l’équivalent PowerShell (Install-WindowsFeature, Install-ADDSForest).'
    ],

    notions: [
      'rôle AD DS',
      'promotion en contrôleur de domaine',
      'nouvelle forêt',
      'niveau fonctionnel',
      'mot de passe DSRM',
      'NTDS.DIT',
      'SYSVOL',
      'Install-ADDSForest'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis la section « nouvelle forêt », c’est le cœur de l’épreuve.' },
      { cls: 'mid', text: '50–69 % — refais l’exercice des informations requises jusqu’au sans-faute.' },
      { cls: 'good', text: '70–89 % — solide : déroule l’installation sur une VM de TP.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : passe à la gestion des objets.' }
    ],

    flashcards: [
      { q: 'Les deux temps d’installation d’un contrôleur ?', a: 'Installer le rôle AD DS (binaires), puis promouvoir le serveur en contrôleur de domaine (assistant).' },
      { q: 'Les cinq informations avant configuration ?', a: 'Nom DNS, nom NetBIOS, compatibilité anciennes versions, DNS sur le contrôleur, emplacements NTDS.DIT/SYSVOL (+ DSRM).' },
      { q: 'À quoi sert le mot de passe DSRM ?', a: 'À restaurer l’AD DS s’il devient corrompu et inaccessible — à choisir solide.' },
      { q: 'Que contient SYSVOL ?', a: 'Scripts de connexion, GPO et fichiers nécessaires à la réplication AD et aux partages publics.' },
      { q: 'Quel message clôt la vérification des prérequis ?', a: 'Tous les paramètres sont corrects → le serveur doit obligatoirement redémarrer.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Gérer les objets AD DS',
    short: 'Objets AD DS',
    toc: 'Console Utilisateurs et ordinateurs, unités d’organisation, utilisateurs (UPN, options), groupes, jointure au domaine.',
    time: '≈ 2 h de travail',

    situation:
      'Le domaine existe : il est vide. Maintenant il faut le peupler — des unités d’organisation pour ' +
      'ranger, des utilisateurs pour se connecter, des groupes pour distribuer les droits. Ce chapitre ' +
      'suit la console « Utilisateurs et ordinateurs Active Directory » du support, avec les exemples ' +
      'réels (unité TRI, utilisateur iziti), jusqu’à la jointure du poste client au domaine.',

    objectives: [
      'peupler l’Active Directory depuis la console Utilisateurs et ordinateurs ;',
      'créer des unités d’organisation et y créer des utilisateurs ;',
      'paramétrer un compte : UPN, changement de mot de passe, horaires, propriétés ;',
      'créer des groupes (sécurité ou distribution) et joindre un poste au domaine.'
    ],

    sections: [
      {
        title: 'La console et les unités d’organisation',
        html: [
          '<p>Pour peupler l’Active Directory, on lance la console <strong>Utilisateurs et ordinateurs ' +
          'Active Directory</strong>. La première brique est l’<strong>unité d’organisation</strong> (UO) : ' +
          'un conteneur qui range les objets par service, par site ou par projet — comme l’unité « TRI » du ' +
          'support, dans laquelle on crée ensuite l’utilisateur.</p>',
          '<p>Créer une UO : clic droit sur le domaine ou sur une UO existante → Nouveau → <strong>Unité ' +
          'd’organisation</strong>. Bien pensée, la structure d’UO rend visibles les règles d’administration : ' +
          'une UO par service, des sous-UO pour les postes, les groupes, les comptes de service.</p>',
          box('pitfall', 'Piège — tout mettre à la racine', 'warning',
            '    <p>Un domaine sans UO devient un tiroir géant : impossible d’appliquer des stratégies fines ' +
            'ni de s’y retrouver. L’UO est le premier geste d’administration, pas une option décorative.</p>')
        ].join('\n')
      },
      {
        title: 'Créer et paramétrer des utilisateurs',
        html: [
          '<p>Pour créer un utilisateur dans l’unité « TRI » : clic droit sur l’unité → Nouveau → ' +
          '<strong>Utilisateur</strong>. On remplit le formulaire (nom, prénom, nom d’ouverture de session), ' +
          'puis le mot de passe et ses options.</p>',
          '<p>Deux moyens d’ouvrir une session (chapitre 2) : le <strong>UPN</strong>, forme d’adresse ' +
          'e-mail — <code>iziti@ntic.ma</code> — et la forme <code>DOMAINE\\login</code>. L’option ' +
          '« <strong>l’utilisateur doit changer le mot de passe à la prochaine ouverture de session</strong> » ' +
          'force ce changement à la première connexion : réflexe de sécurité pour tout compte neuf.</p>',
          '<p>Les <strong>propriétés</strong> de l’utilisateur (clic droit → Propriétés) offrent bien plus : ' +
          'dans l’onglet <strong>Compte</strong> se trouvent la partie liée à l’ouverture de session et les ' +
          '<strong>horaires d’accès</strong> (restriction des horaires de connexion). Le tout existe aussi ' +
          'en <strong>PowerShell</strong> (New-ADUser, Set-ADUser, Get-ADUser) — chaque geste de la console ' +
          'a son équivalent de commande.</p>',
          box('mnemo', 'Le cycle d’un compte neuf', 'pin',
            '    <p>Créer (formulaire) → mot de passe + « doit changer » → propriétés (horaires, compte) → ' +
            'test de connexion. Quatre gestes, dans cet ordre, pour chaque utilisateur.</p>')
        ].join('\n')
      },
      {
        title: 'Les groupes : droits, types et étendues',
        html: [
          '<p>Les <strong>groupes</strong> sont créés pour donner des droits sur des fichiers, imprimantes, ' +
          'bases de données, etc. Il existe deux <strong>types</strong> de groupes : les groupes de ' +
          '<strong>sécurité</strong>, qui reçoivent des droits, et les groupes de <strong>distribution</strong>, ' +
          'utiles seulement à la diffusion (listes de diffusion).</p>',
          '<p>Créer un groupe : sélectionner l’unité, clic droit → Nouveau → <strong>Groupe</strong>, choisir ' +
          'le type et l’<strong>étendue</strong>. Dans le cas d’un groupe d’utilisateurs du support, on ' +
          'choisit l’étendue <strong>Globale</strong> — le choix courant pour regrouper des utilisateurs du ' +
          'même domaine.</p>',
          box('intuition', 'Droits aux groupes, pas aux utilisateurs', 'compass',
            '    <p>On donne le droit au <strong>groupe</strong> et on ajoute l’utilisateur au groupe : c’est ' +
            'la règle d’or. Les comptes restent propres, les droits se retirent en une suppression de ' +
            'membre, et l’audit se lit sur les groupes.</p>')
        ].join('\n')
      },
      {
        title: 'Joindre un poste au domaine et profils itinérants',
        html: [
          '<p>Pour joindre un poste client au domaine, on commence par s’assurer que le client reçoit en ' +
          '<strong>serveur DNS</strong> celui du domaine Active Directory — sans DNS, personne ne trouve le ' +
          'contrôleur. Puis on change l’appartenance de la machine (Système → Modifier les paramètres → ' +
          'Domaine) avec un compte autorisé, et on redémarre : la connexion se fait alors en ' +
          '<code>DOMAINE\\login</code> ou en UPN.</p>',
          '<p>Le support présente enfin les <strong>profils itinérants</strong> : synchroniser le profil d’un ' +
          'utilisateur sur le serveur pour rendre ses données accessibles depuis n’importe quel poste du ' +
          'domaine. Un profil itinérant bien configuré suit l’utilisateur de machine en machine.</p>',
          box('tech', 'Le PowerShell d’AD en un clin d’œil', 'terminal',
            '    <p>Le support illustre chaque geste de la console par sa commande : New-ADUser pour créer, ' +
            'Get-ADUser pour afficher les propriétés, les cmdlets groupes pour l’appartenance. Réfléchir ' +
            'console + PowerShell, toujours.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La console pour peupler l’AD est…', opts: ['Utilisateurs et ordinateurs Active Directory', 'Gestionnaire des tâches', 'Gestion du stockage'], correct: 0, exp: 'C’est la console du support pour créer UO, utilisateurs et groupes.' },
      { q: 'La première brique de rangement est…', opts: ['l’unité d’organisation', 'le groupe de sécurité', 'le profil itinérant'], correct: 0, exp: 'L’UO contient les objets ; on la crée avant les comptes.' },
      { q: 'L’UPN d’un utilisateur ressemble à…', opts: ['iziti@ntic.ma', 'NTIC\\iziti', 'iziti_NTIC'], correct: 0, exp: 'UPN = forme d’adresse e-mail ; l’autre forme est DOMAINE\\login.' },
      { q: 'L’option « doit changer le mot de passe à la prochaine ouverture »…', opts: ['force le changement à la première connexion', 'bloque le compte', 'supprime le mot de passe'], correct: 0, exp: 'Réflexe de sécurité pour tout compte neuf.' },
      { q: 'L’onglet Compte des propriétés permet…', opts: ['les restrictions d’horaires d’accès', 'de changer l’UPN du domaine', 'de créer une UO'], correct: 0, exp: 'Il regroupe l’ouverture de session et les horaires d’accès.' },
      { q: 'Les groupes de distribution servent…', opts: ['à la diffusion (listes)', 'à donner des droits', 'à joindre le domaine'], correct: 0, exp: 'Seuls les groupes de sécurité reçoivent des droits.' },
      { q: 'Avant de joindre un poste au domaine, on vérifie…', opts: ['que le DNS du client pointe vers le domaine', 'que le pare-feu est éteint', 'que l’UO existe'], correct: 0, exp: 'Le client localise le contrôleur par DNS : premier contrôle du support.' },
      { q: 'Un profil itinérant permet…', opts: ['de suivre le profil de l’utilisateur de poste en poste', 'de partager des imprimantes', 'de créer des groupes'], correct: 0, exp: 'Le profil est synchronisé sur le serveur pour être accessible depuis tout poste du domaine.' }
    ],

    pitfalls: [
      'Créer les utilisateurs avant les UO : rien pour les ranger, structure à refaire.',
      'Donner des droits à des utilisateurs isolés : passer par des groupes de sécurité.',
      'Confondre groupe de sécurité (droits) et groupe de distribution (diffusion).',
      'Joindre un poste au domaine sans corriger son DNS : le domaine reste introuvable.'
    ],

    methodTitle: 'Peupler un domaine proprement',
    method: [
      'Dessiner les UO (services, sites), puis créer les groupes de sécurité.',
      'Créer les comptes : UPN propre, « doit changer » activé, horaires si besoin.',
      'Joindre les postes : DNS d’abord, appartenance au domaine ensuite, test de connexion enfin.'
    ],

    summary: [
      'La console Utilisateurs et ordinateurs AD peuple le domaine : UO d’abord.',
      'Utilisateur = formulaire + UPN (iziti@ntic.ma) + « doit changer » + propriétés (horaires).',
      'Groupes de sécurité pour les droits, de distribution pour la diffusion ; étendue Globale courante.',
      'Jointure au domaine : DNS du client vers le domaine, puis changement d’appartenance ; profils itinérants pour suivre les utilisateurs.'
    ],

    checklist: [
      'Je crée UO, utilisateur et groupe dans le bon ordre.',
      'Je distingue les deux formes de session et l’option de premier changement.',
      'Je choisis le type de groupe selon le besoin (droits ou diffusion).',
      'Je connais les prérequis de la jointure au domaine et le rôle des profils itinérants.'
    ],

    notions: [
      'Utilisateurs et ordinateurs AD',
      'unité d’organisation',
      'UPN',
      'changement de mot de passe forcé',
      'horaires d’accès',
      'groupe de sécurité / distribution',
      'étendue Globale',
      'profil itinérant'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — rejoue le cycle d’un compte neuf sur une VM de TP.' },
      { cls: 'mid', text: '50–69 % — refais les exercices UPN/groupes jusqu’au sans-faute.' },
      { cls: 'good', text: '70–89 % — solide : structure un domaine fictif complet (UO, comptes, groupes).' },
      { cls: 'top', text: '≥ 95 % — maîtrise : le cours est acquis, enchaîne les examens blancs.' }
    ],

    flashcards: [
      { q: 'Le cycle d’un compte neuf ?', a: 'Créer → mot de passe + « doit changer » → propriétés (horaires) → test de connexion.' },
      { q: 'Les deux formes de session ?', a: 'UPN (iziti@ntic.ma) et DOMAINE\\login (NTIC\\iziti).' },
      { q: 'Sécurité contre distribution ?', a: 'Sécurité : reçoit des droits. Distribution : diffusion seulement.' },
      { q: 'Étendue choisie pour un groupe d’utilisateurs du support ?', a: 'Globale — le choix courant au sein d’un même domaine.' },
      { q: 'Prérequis de la jointure au domaine ?', a: 'Le client doit recevoir en DNS le serveur DNS du domaine Active Directory.' }
    ]
  }
];
