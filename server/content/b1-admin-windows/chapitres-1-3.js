/**
 * Chapitres 1 à 3 du cours « Administration Windows » B1, alignés sur les
 * supports B1 du module (Dr Abasse KPEGOUNI, dossier « cours B1 IT /
 * ADMIN_WINDOWS ») : introduction à l'administration Windows, Windows Server
 * 2012 R2 (éditions, installation, SAM), configuration initiale du serveur.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu, et les trois
 * exercices de code sont injectés avant le QCM par le générateur.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'L’administration système et l’administrateur',
    short: 'Administration système',
    toc: 'Définition, tâches de l’administrateur, qualités, types d’administration, outils Windows.',
    time: '≈ 1 h 30 de travail',
    free: true,

    situation:
      'Chaque jour, des millions d’utilisateurs allument leur ordinateur professionnel sans se poser de question : ' +
      'leur mot de passe est reconnu, leurs dossiers partagés sont accessibles et leur imprimante est configurée. ' +
      'Mais en coulisses, qui garantit que ces 50 ou 500 machines fonctionnent sans faille, sans virus et avec les ' +
      'bons droits ? C’est le rôle de l’administrateur système. Sur votre ordinateur personnel, vous êtes votre propre ' +
      'administrateur. En entreprise, cette gestion est professionnalisée et centralisée. Ce premier chapitre pose ' +
      'les fondations du métier : missions réelles, qualités exigées, types d’administration et panorama des outils Windows.',

    objectives: [
      'distinguer l’administration d’un PC individuel et l’administration d’un parc d’entreprise ;',
      'citer les familles de tâches fondamentales : comptes, assistance, logiciels, matériel, sécurité ;',
      'reconnaître les trois qualités professionnelles et les trois types d’administration ;',
      'identifier les consoles graphiques et outils en ligne de commande fondamentaux sous Windows.'
    ],

    sections: [
      {
        title: 'Qu’est-ce que l’administration système ?',
        html: [
          '<p><strong>Définition.</strong> L’<strong>administration système</strong> est l’ensemble des pratiques, ' +
          'outils et procédures permettant de configurer, sécuriser et maintenir opérationnel le parc informatique ' +
          'd’une organisation (serveurs, postes de travail, périphériques et droits d’accès).</p>',
          '<p>Cette mission est assurée par l’<strong>administrateur système</strong>. Alors qu’un utilisateur ' +
          'ordinaire se contente de consommer des applications (navigateur, tableur, messagerie), l’administrateur ' +
          'veille à ce que le socle matériel et logiciel soit disponible, rapide et protégé contre les pannes. ' +
          'Lorsqu’il gère également les commutateurs, routeurs et liaisons télécoms, on parle d’<strong>administrateur ' +
          'système et réseau</strong>.</p>',
          box('situation', 'Du PC personnel au réseau d’entreprise', 'compass',
            '    <p>Sur votre ordinateur personnel à la maison, vous installez ce que vous voulez : vous êtes administrateur local. ' +
            'Dans une banque ou un hôpital de 300 personnes, si chaque employé installait n’importe quel logiciel, le parc ' +
            'serait piraté en quelques heures. L’administration système consiste à instaurer des règles claires et ' +
            'automatisées pour protéger les données collectives.</p>')
        ].join('\n')
      },
      {
        title: 'Les tâches de l’administrateur',
        html: [
          '<p>Les tâches sont multiples, mais le support les résume en grandes familles :</p>',
          '<ul>\n' +
          '    <li><strong>gérer les comptes utilisateurs</strong> — tâche simple et automatisable ;</li>\n' +
          '    <li><strong>assister et éduquer les utilisateurs</strong> : répondre à leurs questions, ' +
          'tenir une documentation à jour pour les outils en place ;</li>\n' +
          '    <li><strong>gérer les logiciels</strong> : installer, configurer, mettre à jour (patcher) ;</li>\n' +
          '    <li><strong>gérer le matériel</strong> : panne, remplacement, ajout ;</li>\n' +
          '    <li><strong>assurer la sécurité</strong> du système et des utilisateurs : sauvegardes ' +
          'fiables et régulières, contrôle d’accès, prévention des usages abusifs de ressources ;</li>\n' +
          '    <li><strong>vérifier l’adéquation du matériel</strong> à son utilisation (identifier les ' +
          'goulots d’étranglement) ;</li>\n' +
          '    <li><strong>assurer la maintenance de premier niveau</strong> : diagnostiquer une panne, ' +
          'appeler la maintenance constructeur si besoin.</li>\n' +
          '  </ul>',
          box('mnemo', 'Mnémotechnique — « CALMS »', 'pin',
            '    <p>Retenir les familles de tâches : <strong>C</strong>omptes, <strong>A</strong>ssistance, ' +
            '<strong>L</strong>ogiciels, <strong>M</strong>atériel, <strong>S</strong>écurité. Une journée ' +
            'd’administrateur se lit dans ces cinq lettres — et un examen oral commence souvent par « citez ' +
            'moi les tâches d’un admin ».</p>')
        ].join('\n')
      },
      {
        title: 'Qualités et types d’administration',
        html: [
          '<p>Trois <strong>qualités</strong> décrivent un bon administrateur système :</p>',
          '<ul>\n' +
          '    <li>la <strong>technicité</strong> : maîtriser les systèmes, les outils, les commandes ;</li>\n' +
          '    <li>la <strong>rigueur</strong> : procédures suivies à la lettre, vérifications systématiques ;</li>\n' +
          '    <li>le <strong>bon sens</strong> : mesurer les risques avant d’agir, ne rien faire d’inutilement risqué.</li>\n' +
          '  </ul>',
          '<p>Et trois <strong>types d’administration</strong> se distinguent :</p>',
          '<table>\n' +
          '    <tr><th>Type</th><th>Périmètre</th></tr>\n' +
          '    <tr><td>Poste (station) de travail</td><td>les PC des utilisateurs : mises à jour, logiciels, pannes</td></tr>\n' +
          '    <tr><td>Serveurs</td><td>les machines qui rendent des services à toute l’entreprise</td></tr>\n' +
          '    <tr><td>Réseau</td><td>les liaisons, les accès distants, les équipements d’interconnexion</td></tr>\n' +
          '  </table>',
          box('pitfall', 'Piège — confondre poste et serveur', 'warning',
            '    <p>Un poste de travail sert <strong>un</strong> utilisateur ; un serveur sert ' +
            '<strong>toute</strong> l’entreprise. Une manipulation sur un serveur mal préparée peut couper ' +
            'des dizaines de personnes en une seconde : la rigueur exigée n’est pas la même.</p>')
        ].join('\n')
      },
      {
        title: 'Les outils d’administration Windows',
        html: [
          '<p>L’écosystème Windows intègre des consoles graphiques (MMC) et des outils en ligne de commande ' +
          'utilisés au quotidien :</p>',
          '<ul>\n' +
          '    <li>le <strong>Gestionnaire des tâches</strong> (<code>taskmgr</code>) : superviser l’activité CPU/RAM et arrêter un processus bloqué ;</li>\n' +
          '    <li>le <strong>Gestionnaire de l’ordinateur</strong> (<code>compmgmt.msc</code>) : regroupe la gestion des ' +
          'utilisateurs et groupes locaux, l’Observateur d’événements, le Gestionnaire de services et le partitionnement des disques ;</li>\n' +
          '    <li>l’<strong>Analyseur de performances</strong> (<code>perfmon</code>) : mesurer la charge réelle et anticiper la saturation ;</li>\n' +
          '    <li>l’<strong>Observateur d’événements</strong> (<code>eventvwr.msc</code>) : journaliser les alertes, erreurs et audits de sécurité ;</li>\n' +
          '    <li><strong>PowerShell</strong> : l’environnement d’automatisation en ligne de commande standard de Microsoft.</li>\n' +
          '  </ul>',
          '<p>Ces consoles sont universelles à travers toutes les versions de Windows. Les travaux pratiques du support ' +
          'utilisent <strong>Windows Server 2012 R2</strong> comme support pédagogique de base.</p>',
          box('tech', 'Perspective technologique — Versions et continuité', 'terminal',
            '    <p>Windows Server 2012 R2 a atteint sa fin de support officiel en octobre 2023. Cependant, ses fondations ' +
            'architecturales — Active Directory, base SAM, services DNS/DHCP, gestion des disques et GPO — sont ' +
            'strictement identiques sur les versions contemporaines (<strong>Windows Server 2022 et 2025</strong>). ' +
            'Ce qui est étudié ici est directement transférable sur les infrastructures en production.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'L’administration système gère…', opts: ['les programmes donnant accès à la machine et à ses périphériques', 'uniquement les mots de passe', 'le courrier de l’entreprise'], correct: 0, exp: 'C’est la définition exacte du support : gérer l’ensemble des programmes permettant d’accéder à une machine et d’utiliser ses périphériques.' },
      { q: 'L’administrateur qui gère aussi le réseau porte…', opts: ['une double casquette : système et réseau', 'un chapeau de sécurité', 'aucun titre particulier'], correct: 0, exp: 'On parle alors d’administrateur système et réseau.' },
      { q: 'Installer, configurer et patcher relève de…', opts: ['la gestion des logiciels', 'la gestion du matériel', 'l’assistance aux utilisateurs'], correct: 0, exp: 'Trois verbes de la famille « logiciels » ; patcher = mettre à jour.' },
      { q: 'Les sauvegardes fiables et le contrôle d’accès relèvent…', opts: ['de la sécurité du système et des utilisateurs', 'de la gestion des comptes', 'du remplacement de matériel'], correct: 0, exp: 'Ce sont deux volets de la famille sécurité.' },
      { q: 'Les trois qualités d’un administrateur sont…', opts: ['technicité, rigueur, bon sens', 'vitesse, silence, discrétion', 'curiosité, mémoire, patience'], correct: 0, exp: 'Le support les liste explicitement dans cet ordre.' },
      { q: 'Administrer les PC des utilisateurs est…', opts: ['l’administration de postes de travail', 'l’administration réseau', 'l’administration de serveurs'], correct: 0, exp: 'Le poste (station) de travail est le premier des trois types.' },
      { q: 'L’Observateur d’événements se trouve…', opts: ['dans le Gestionnaire de l’ordinateur', 'dans le Gestionnaire des tâches', 'dans le BIOS'], correct: 0, exp: 'Le Gestionnaire de l’ordinateur regroupe utilisateurs/groupes, événements, services et stockage.' },
      { q: 'Identifier un goulot d’étranglement consiste à…', opts: ['vérifier l’adéquation du matériel à son utilisation', 'renommer la machine', 'créer une unité d’organisation'], correct: 0, exp: 'C’est une tâche explicite de l’administrateur : le matériel convient-il à ce qu’on lui demande ?' }
    ],

    pitfalls: [
      'Croire que l’administrateur ne fait que « dépanner » : il installe, documente, éduque et prévient.',
      'Confondre gestion des logiciels (installer, patcher) et gestion du matériel (panne, remplacement, ajout).',
      'Oublier que la sécurité inclut aussi la prévention des usages abusifs de ressources.',
      'Travailler sur un serveur avec la légèreté qu’on se permet sur un poste : les impacts ne se comparent pas.'
    ],

    methodTitle: 'Réfléchir comme un administrateur',
    method: [
      'Qualifier la demande : compte, logiciel, matériel, sécurité ou simple assistance ?',
      'Choisir le bon outil Windows avant d’improviser une manipulation.',
      'Mesurer l’impact : un poste, un service, ou toute l’entreprise derrière cette machine ?'
    ],

    summary: [
      'L’administration système gère tout ce qui donne accès à la machine et à ses périphériques.',
      'L’administrateur gère comptes, assistance, logiciels, matériel et sécurité — et la maintenance de premier niveau.',
      'Technicité, rigueur et bon sens en sont les trois qualités.',
      'Poste, serveurs, réseau : trois types d’administration, servis par les outils intégrés de Windows.'
    ],

    checklist: [
      'Je sais définir l’administration système en une phrase.',
      'Je cite les cinq familles de tâches sans hésiter.',
      'Je distingue les trois qualités et les trois types d’administration.',
      'Je situe les quatre outils d’administration de Windows.'
    ],

    notions: [
      'administration système',
      'administrateur système et réseau',
      'comptes utilisateurs',
      'patcher (mettre à jour)',
      'goulot d’étranglement',
      'maintenance de premier niveau',
      'Gestionnaire de l’ordinateur',
      'Observateur d’événements'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les familles de tâches et refais l’exercice de classement.' },
      { cls: 'mid', text: '50–69 % — rejoue le QCM en citant l’exemple concret de chaque tâche.' },
      { cls: 'good', text: '70–94 % — solide : entraînez-vous à requalifier des demandes utilisateurs.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : vous êtes prêt pour la suite du module.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « administrateur système et réseau » ?', a: 'administrateur système et réseau : Cette mission est assurée par l’ administrateur système . Alors qu’un utilisateur ordinaire se contente de consommer des applications (navigateur, tableur, messagerie), l’administrateur veille à ce que le socle matériel et logiciel soit disponible, rapide et protégé contre les pa' },
      { q: 'Qu’est-ce que « comptes utilisateurs » ?', a: 'gérer les comptes utilisateurs — tâche simple et automatisable ;' },
      { q: 'Qu’est-ce que « patcher (mettre à jour) » ?', a: 'patcher (mettre à jour) : Chaque jour, des millions d’utilisateurs allument leur ordinateur professionnel sans se poser de question : leur mot de passe est reconnu, leurs dossiers partagés sont accessibles et leur imprimante est configurée. Mais en coulisses, qui garantit que ces 50 ou 500 machines foncti' },
      { q: 'Qu’est-ce que « goulot d’étranglement » ?', a: 'Identifier un goulot d’étranglement consiste à…' },
      { q: 'Qu’est-ce que « Windows Server 2012 R2 » ?', a: 'Le stage commence : on te confie une machine nue et une image de Windows Server 2012 R2. Avant de cliquer sur « suivant », il faut savoir ce qu’on installe : quelle édition correspond à quel besoin, quelle option d’installation (avec ou sans interface graphique), et si la machine' },
      { q: 'Qu’est-ce que « DISM.EXE » ?', a: 'Depuis Windows Server 2012, les options sont intégrées : un administrateur peut installer ou désinstaller ces fonctionnalités pour basculer entre Core et complet — dans un sens avec PowerShell, dans l’autre avec l’outil DISM.EXE (gestion et maintenance des images de déploiement) ' },
      { q: 'Qu’est-ce que « Gestionnaire de serveur » ?', a: 'se repérer dans le Gestionnaire de serveur (tableau de bord, serveur local, outils, notifications) ;' },
      { q: 'Qu’est-ce que « ifIndex » ?', a: 'Adresse IP statique — graphiquement : serveur local → Ethernet → Propriétés → Protocole internet version 4 → adresse, masque, passerelle, DNS. En PowerShell, on reparte de l’index d’interface ( ifIndex ) obtenu par Get-NetAdapter ou Get-NetIPInterface :' },
      { q: 'Qu’est-ce que « New-NetIPAddress » ?', a: 'Objectif : Contrôler les adresses IPv4 et préfixes avant la commande New-NetIPAddress (PowerShell).' },
      { q: 'Qu’est-ce que « unité d’organisation (UO) » ?', a: 'unité d’organisation (UO)' },
      { q: 'Qu’est-ce que « classes d’objets » ?', a: 'classes d’objets : Au sein du domaine, on retrouve un ensemble d’ unités d’organisation (UO) remplies d’objets de différentes classes : utilisateurs, ordinateurs, groupes, contrôleurs de domaine…' },
      { q: 'Qu’est-ce que « promotion en contrôleur de domaine » ?', a: 'Le serveur est configuré (chapitre 3) : il ne manque que le cœur du réseau d’entreprise. Installer AD DS se fait en deux temps — le rôle, puis la promotion en contrôleur de domaine — et demande cinq informations exactes. Ce chapitre suit l’assistant pas à pas, puis rejoue l’insta' },
      { q: 'Qu’est-ce que « nouvelle forêt » ?', a: 'promouvoir le serveur en contrôleur de domaine (nouvelle forêt) ;' },
      { q: 'Qu’est-ce que « niveau fonctionnel » ?', a: 'Le niveau fonctionnel d’un domaine correspond aux services disponibles pour ce domaine : plus il est élevé, plus les fonctionnalités sont nombreuses. Le support conseille d’utiliser le niveau le plus haut — Windows Server 2012 R2.' },
      { q: 'Qu’est-ce que « Install-ADDSForest » ?', a: 'En PowerShell, le même résultat : récupérer le nom du serveur, installer le rôle ( Install-WindowsFeature ), puis configurer la nouvelle forêt avec Install-ADDSForest — nom de domaine, niveaux fonctionnels et options incluant la création du DNS.' },
      { q: 'Qu’est-ce que « changement de mot de passe forcé » ?', a: 'changement de mot de passe forcé' },
      { q: 'Qu’est-ce que « horaires d’accès » ?', a: 'Les propriétés de l’utilisateur (clic droit → Propriétés) offrent bien plus : dans l’onglet Compte se trouvent la partie liée à l’ouverture de session et les horaires d’accès (restriction des horaires de connexion). Le tout existe aussi en PowerShell (New-ADUser, Set-ADUser, Get-' },
      { q: 'Qu’est-ce que « groupe de sécurité / distribution » ?', a: 'groupe de sécurité / distribution' },
      { q: 'Qu’est-ce que « profil itinérant » ?', a: 'Le support présente enfin les profils itinérants : synchroniser le profil d’un utilisateur sur le serveur pour rendre ses données accessibles depuis n’importe quel poste du domaine. Un profil itinérant bien configuré suit l’utilisateur de machine en machine.' },
      { q: 'Définition de l’administration système ?', a: 'La gestion de l’ensemble des programmes informatiques permettant d’accéder à une machine et d’utiliser ses périphériques dans un parc.' },
      { q: 'Les cinq familles de tâches (CALMS) ?', a: 'Comptes, Assistance, Logiciels, Matériel, Sécurité — plus la maintenance de premier niveau et la gestion quotidienne.' },
      { q: 'Les trois qualités d’un admin ?', a: 'La technicité, la rigueur, le bon sens.' },
      { q: 'Les trois types d’administration ?', a: 'D’un poste de travail, des serveurs, du réseau.' },
      { q: 'Que regroupe le Gestionnaire de l’ordinateur ?', a: 'Utilisateurs et groupes, Observateur d’événements, services, gestion du stockage.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Windows Server 2012 R2 : éditions et installation',
    short: 'Windows Server 2012 R2',
    toc: 'Histoire de Windows Server, quatre éditions, options d’installation, configuration requise, SAM.',
    time: '≈ 2 h de travail',

    situation:
      'Le stage commence : on te confie une machine nue et une image de Windows Server 2012 R2. Avant de ' +
      'cliquer sur « suivant », il faut savoir ce qu’on installe : quelle édition correspond à quel ' +
      'besoin, quelle option d’installation (avec ou sans interface graphique), et si la machine tient ' +
      'la configuration requise. Ce chapitre suit le support pas à pas, jusqu’à la première ouverture ' +
      'de session.',

    objectives: [
      'situer Windows Server dans l’histoire des systèmes Microsoft ;',
      'choisir l’édition adaptée : Foundation, Essential, Standard, Datacenter ;',
      'distinguer l’installation Core de l’installation complète (GUI) ;',
      'vérifier la configuration requise et réussir la première ouverture de session.'
    ],

    sections: [
      {
        "title": "Repère de cycle de vie (EOL Windows Server 2012 R2) & Équivalence Server 2022 / 2025",
        "html": "<div class=\"box box--warning\"><div class=\"box__title\">Cycle de vie officiel Microsoft (EOL) et transférabilité</div><p><strong>Attention :</strong> Windows Server 2012 R2 (étudié dans le support historique du cours) a atteint sa <strong>fin de support étendu (EOL — End of Life) le 10 octobre 2023</strong> et ne doit plus être déployé en production sans souscription ESU. En entreprise, on déploie aujourd’hui <strong>Windows Server 2022</strong> ou <strong>Windows Server 2025</strong>, où seules deux éditions principales subsistent : <strong>Standard</strong> (jusqu’à 2 machines virtuelles ou conteneurs Hyper-V par licence) et <strong>Datacenter</strong> (nombre illimité de machines virtuelles), tandis que les concepts fondamentaux (installation Server Core vs Desktop Experience, base SAM locale et promotion Active Directory AD DS) demeurent strictement identiques.</p></div>"
      },
      {
        title: 'Un peu de contexte : de Windows 1.0 à Windows Server 2022',
        html: [
          '<p><strong>Windows Server</strong> est le système d’exploitation serveur de Microsoft — en ' +
          'quelque sorte une version améliorée du Windows « utilisateur », orientée services : fournir ' +
          'des services à de nombreux autres équipements, pas seulement à l’utilisateur qui est devant ' +
          'l’écran.</p>',
          '<p>Repères du support : en <strong>1985</strong>, Windows 1.0 introduit le système de fenêtres ' +
          'pour simplifier un ordinateur alors piloté par un shell en ligne de commande (chez Microsoft, ' +
          'le <strong>DOS</strong>). Dans les années 1990, pour concurrencer les systèmes serveurs de ' +
          'l’époque, Microsoft conçoit un système orienté services : la lignée <strong>NT</strong>. La ' +
          'popularité de Windows NT en entreprise pousse Microsoft à continuer : en <strong>2003</strong> ' +
          'arrive la première version de Windows Server, massivement adoptée. Se suivent ensuite 2008, ' +
          '2012, 2016, 2019 et 2022.</p>',
          box('mnemo', 'Retenir la chronologie', 'pin',
            '    <p>1985 Windows 1.0 (fenêtres), années 90 lignée NT (orientée services), 2003 premier ' +
            'Windows Server, puis 2008 → 2012 → 2016 → 2019 → 2022. Les TP du module se font sur ' +
            '<strong>2012 R2</strong>.</p>')
        ].join('\n')
      },
      {
        title: 'Les quatre éditions de Windows Server 2012',
        html: [
          '<p>Un même produit, quatre éditions aux cibles différentes :</p>',
          '<table>\n' +
          '    <tr><th>Édition</th><th>Limites</th></tr>\n' +
          '    <tr><td>Foundation</td><td>TPE ; 15 utilisateurs max ; pas de virtualisation ; 1 processeur ; machine physique</td></tr>\n' +
          '    <tr><td>Essential</td><td>25 utilisateurs max ; pas de virtualisation ; 2 processeurs ; physique ou virtuelle</td></tr>\n' +
          '    <tr><td>Standard</td><td>toutes les fonctionnalités ; licence couvrant 2 machines virtuelles ; jusqu’à 64 sockets et 4 To de RAM</td></tr>\n' +
          '    <tr><td>Datacenter</td><td>usage intensif de machines virtuelles ; VM illimitées par licence (2 processeurs)</td></tr>\n' +
          '  </table>',
          '<p>Standard et Datacenter offrent les mêmes fonctionnalités : ils se distinguent par le nombre ' +
          'de machines virtuelles couvertes par la licence — deux pour Standard, illimité pour Datacenter.</p>',
          box('pitfall', 'Piège — Standard contre Datacenter', 'warning',
            '    <p>Les deux éditions supportent 64 sockets et 4 To de RAM. La seule question à se poser : ' +
            'combien de <strong>VM</strong> la licence doit-elle couvrir ? Deux → Standard ; illimité → ' +
            'Datacenter.</p>')
        ].join('\n')
      },
      {
        title: 'Options d’installation : Core ou interface graphique ?',
        html: [
          '<p>Lors de l’installation, deux options :</p>',
          '<ul>\n' +
          '    <li><strong>Installation minimale (Server Core)</strong> : sans interface graphique ; moins ' +
          'd’espace disque, <strong>surface exposée aux attaques réduite</strong>, tâches de maintenance ' +
          'considérablement réduites ;</li>\n' +
          '    <li><strong>Serveur avec interface graphique</strong> (équivalent de l’installation ' +
          'complète de 2008 R2) : confort de la console graphique, pour l’apprentissage et l’administration ' +
          'assistée.</li>\n' +
          '  </ul>',
          '<p>Depuis Windows Server 2012, les options sont intégrées : un administrateur peut installer ou ' +
          'désinstaller ces fonctionnalités pour <strong>basculer</strong> entre Core et complet — dans un ' +
          'sens avec PowerShell, dans l’autre avec l’outil <strong>DISM.EXE</strong> (gestion et maintenance ' +
          'des images de déploiement) après avoir repéré le numéro d’index de l’image dans install.wim.</p>',
          box('intuition', 'Quand choisir Core ?', 'compass',
            '    <p>Core est le choix de la production : moins de composants installés = moins de correctifs ' +
            'à appliquer = moins de portes d’entrée pour un attaquant. L’interface graphique se justifie en ' +
            'formation et pour certains rôles d’administration.</p>')
        ].join('\n')
      },
      {
        title: 'Configuration requise et ouverture de session',
        html: [
          '<p>La configuration requise de Windows Server 2012 R2 :</p>',
          '<table>\n' +
          '    <tr><th>Composant</th><th>Minimum</th></tr>\n' +
          '    <tr><td>Processeur</td><td>3,1 GHz 64 bits recommandé</td></tr>\n' +
          '    <tr><td>Mémoire vive</td><td>2 Go (8 Go recommandés)</td></tr>\n' +
          '    <tr><td>Espace disque</td><td>60 Go</td></tr>\n' +
          '    <tr><td>Carte réseau</td><td>Gigabit Ethernet (10/100/1000base-T)</td></tr>\n' +
          '  </table>',
          '<p>Pour la première connexion, la syntaxe de session dépend du contexte :</p>',
          '<ul>\n' +
          '    <li>base <strong>SAM</strong> locale (Security Account Manager, la base de données des ' +
          'comptes locaux, composant du registre qui contient les mots de passe locaux) : taper ' +
          '<code>nom_machine\\utilisateur</code> ;</li>\n' +
          '    <li>machine membre d’un domaine : <code>Nom_NETBIOS\\login</code> ou ' +
          '<code>login@nom_dns_domaine</code>.</li>\n' +
          '  </ul>',
          box('tech', 'Retenir deux écritures', 'terminal',
            '    <p>Deux formes pour le domaine : l’une avec <strong>antislash</strong> (NETBIOS\\login), ' +
            'l’autre avec <strong>arobase</strong> (login@domaine). La forme locale ne s’applique qu’à la ' +
            'SAM de la machine.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Windows 1.0 sort en…', opts: ['1985', '1995', '2003'], correct: 0, exp: '1985 ; le nom fait référence au système de fenêtres, alors que tout passait par le shell DOS.' },
      { q: 'La première version de Windows Server sort en…', opts: ['2003', '1990', '2012'], correct: 0, exp: 'Windows Server 2003, massivement adopté en entreprise.' },
      { q: 'L’édition limitée à 15 utilisateurs est…', opts: ['Foundation', 'Essential', 'Standard'], correct: 0, exp: 'Foundation : TPE, 15 utilisateurs, pas de virtualisation, 1 processeur, machine physique.' },
      { q: 'L’édition qui couvre 2 VM par licence est…', opts: ['Standard', 'Datacenter', 'Essential'], correct: 0, exp: 'Standard couvre 2 machines virtuelles ; Datacenter les couvre sans limite.' },
      { q: 'L’installation Core présente l’avantage…', opts: ['de réduire la surface exposée aux attaques', 'd’ajouter des jeux Windows', 'de doubler la RAM'], correct: 0, exp: 'Moins d’espace disque, surface d’attaque réduite, maintenance allégée.' },
      { q: 'La RAM minimale de 2012 R2 est…', opts: ['2 Go (8 Go recommandés)', '512 Mo', '32 Go'], correct: 0, exp: '2 Go minimum, 8 Go recommandés ; disque 60 Go ; Gigabit Ethernet.' },
      { q: 'La SAM est…', opts: ['la base de données des comptes locaux de la machine', 'un serveur DNS', 'une licence d’activation'], correct: 0, exp: 'Security Account Manager : composant du registre contenant les comptes et mots de passe locaux.' },
      { q: 'Pour se connecter au domaine, on tape…', opts: ['NETBIOS\\login ou login@domaine', 'domaine/login seulement', 'toujours machine\\utilisateur'], correct: 0, exp: 'Deux formes domaine : antislash avec le nom NETBIOS, ou arobase avec le nom DNS.' }
    ],

    pitfalls: [
      'Choisir Standard ou Datacenter sans se poser la question du nombre de VM couvertes par la licence.',
      'Confondre Essential et Foundation : 25 utilisateurs et 2 processeurs contre 15 utilisateurs et 1 processeur.',
      'Oublier que Foundation impose une machine physique et refuse la virtualisation.',
      'Se connecter au domaine avec la forme machine\\utilisateur : c’est la forme locale (SAM).'
    ],

    methodTitle: 'Bien installer 2012 R2',
    method: [
      'Dimensionner : combien d’utilisateurs ? combien de VM prévues ? → l’édition se déduit.',
      'Décider Core ou GUI : production sécurisée contre confort d’administration.',
      'Vérifier la configuration requise avant l’installation, pas après un échec.'
    ],

    summary: [
      'De Windows 1.0 (1985) à la lignée NT puis Windows Server 2003 : un système devenu orienté services.',
      'Quatre éditions en 2012 : Foundation (15 u), Essential (25 u), Standard (2 VM), Datacenter (VM illimitées).',
      'Core réduit la surface d’attaque et la maintenance ; le basculement Core et interface graphique reste possible.',
      'La SAM gère les comptes locaux ; le domaine s’écrit NETBIOS\\login ou login@domaine.'
    ],

    checklist: [
      'Je place Windows 1.0, NT, 2003 et 2012 R2 sur la frise.',
      'Je fais le lien édition → limite d’utilisateurs ou de VM sans tableau.',
      'Je sais argumenter le choix Core contre interface graphique.',
      'Je formule les trois syntaxes de session (locale, NETBIOS, UPN).'
    ],

    notions: [
      'Windows Server 2012 R2',
      'édition Foundation',
      'édition Essential',
      'édition Standard',
      'édition Datacenter',
      'Server Core',
      'DISM.EXE',
      'SAM (Security Account Manager)'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis le tableau des éditions, c’est le cœur des questions d’examen.' },
      { cls: 'mid', text: '50–69 % — rejoue l’exercice des limites par édition.' },
      { cls: 'good', text: '70–94 % — solide : entraînez-vous à justifier un choix d’édition à l’oral.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : passe à la configuration initiale.' }
    ],

    flashcards: [
      { q: 'Les 4 éditions de 2012 et leurs limites ?', a: 'Foundation : 15 u, sans virtualisation, 1 CPU ; Essential : 25 u, 2 CPU ; Standard : 2 VM ; Datacenter : VM illimitées.' },
      { q: 'Deux avantages de Server Core ?', a: 'Moins d’espace disque et une surface exposée aux attaques réduite (maintenance allégée).' },
      { q: 'Configuration requise de 2012 R2 ?', a: '3,1 GHz 64 bits (recommandé), 2 Go de RAM (8 recommandés), 60 Go de disque, Gigabit Ethernet.' },
      { q: 'C’est quoi la SAM ?', a: 'La base de données des comptes locaux de Windows (composant du registre, mots de passe locaux).' },
      { q: 'Les deux formes de session domaine ?', a: 'NETBIOS\\login et login@nom_dns_domaine.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Configuration initiale du serveur',
    short: 'Configuration initiale',
    toc: 'Gestionnaire de serveur, pare-feu, renommage, adresse IP statique, activation, accès à distance.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le serveur vient d’être installé : il n’a pas encore de nom sérieux, pas d’adresse IP fixe, son ' +
      'pare-feu bloque tout et il n’est pas activé. Un serveur mal configuré à la naissance provoque des ' +
      'pannes incompréhensibles des semaines plus tard. Ce chapitre déroule la liste des réglages de ' +
      'première main, graphiquement et en ligne de commande, comme aux TP.',

    objectives: [
      'se repérer dans le Gestionnaire de serveur (tableau de bord, serveur local, outils, notifications) ;',
      'gérer le pare-feu sur ses trois profils : domaine, privé, public ;',
      'renommer le serveur et configurer une adresse IP statique (GUI et PowerShell) ;',
      'activer Windows et la communication à distance.'
    ],

    sections: [
      {
        title: 'Le Gestionnaire de serveur : point central d’administration',
        html: [
          '<p>Le <strong>Gestionnaire de serveur</strong> est un composant majeur de Windows Server : point ' +
          'central d’administration, il affiche les informations de configuration et de sécurité, permet ' +
          'd’ajouter des rôles et fonctionnalités, de lancer des commandes PowerShell et de créer des ' +
          'tâches de configuration.</p>',
          '<ul>\n' +
          '    <li><strong>Tableau de bord</strong> : ajouter des rôles et fonctionnalités (IIS, DHCP, ' +
          'AD DS, DNS…), ajouter d’autres serveurs à gérer, créer des groupes de serveurs (ex. « Serveur ' +
          'Paris », « Serveur Stockage ») ;</li>\n' +
          '    <li><strong>Serveur local</strong> : propriétés de la machine — nom, domaine ou groupe de ' +
          'travail, pare-feu, bureau à distance, cartes réseau, fuseau horaire ;</li>\n' +
          '    <li>menus <strong>Gérer</strong> (rôles et fonctionnalités, groupes de serveurs) et ' +
          '<strong>Outils</strong> (toutes les consoles d’administration) ;</li>\n' +
          '    <li><strong>Centre de notifications</strong> : erreurs et actions à suivre après ' +
          'l’installation d’un rôle.</li>\n' +
          '  </ul>',
          box('intuition', 'Le réflexe notifications', 'compass',
            '    <p>Après toute installation de rôle, le centre de notifications indique les actions restantes ' +
            '(ex. « promouvoir ce serveur en contrôleur de domaine » au chapitre 5). L’ignorer, c’est laisser ' +
            'un rôle à moitié configuré.</p>')
        ].join('\n')
      },
      {
        title: 'Pare-feu : trois profils à maîtriser',
        html: [
          '<p>Par défaut, le pare-feu est <strong>activé</strong> — et l’on oublie généralement sa présence. ' +
          'Beaucoup de « pannes » de réplication ou de service viennent de lui : le réflexe est de vérifier ' +
          'si le problème ne provient pas du pare-feu avant de chercher plus loin.</p>',
          '<p>Trois profils existent : <strong>domaine, privé et public</strong>. Toute manipulation doit ' +
          'cibler les trois. Trois façons de faire :</p>',
          '<pre><code>Console : Pare-feu Windows avec fonctions avancées\n' +
          '  → Propriétés du pare-feu → État : Désactivé (par profil)\n' +
          'Invite de commande :\n' +
          '  netsh advfirewall set allprofiles state off\n' +
          '  (réactiver : state on)\n' +
          'PowerShell :\n' +
          '  Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False</code></pre>',
          box('pitfall', 'Piège — désactiver un seul profil', 'warning',
            '    <p>Le support est formel : « il faut bien penser à désactiver le pare-feu pour les 3 ' +
            'profils ». Un profil oublié = un service qui tombe selon le réseau de connexion de ' +
            'l’utilisateur. En production, on crée des règles précises plutôt que d’éteindre le pare-feu.</p>')
        ].join('\n')
      },
      {
        title: 'Renommer la machine et fixer l’adresse IP',
        html: [
          '<p><strong>Renommer le serveur</strong> — graphiquement : serveur local → cliquer sur le nom ' +
          'actuel → Modifier → nouveau nom → redémarrer. En ligne de commande :</p>',
          '<pre><code>netdom renamecomputer NOMACTUEL /NewName:NOUVEAUNOM\n' +
          'shutdown /r /t 0 /c "changement de nom"</code></pre>',
          '<p><strong>Adresse IP statique</strong> — graphiquement : serveur local → Ethernet → ' +
          'Propriétés → Protocole internet version 4 → adresse, masque, passerelle, DNS. En PowerShell, on ' +
          'reparte de l’index d’interface (<strong>ifIndex</strong>) obtenu par <code>Get-NetAdapter</code> ' +
          'ou <code>Get-NetIPInterface</code> :</p>',
          '<pre><code>New-NetIPAddress -InterfaceIndex 12 -IPAddress 192.168.1.203 `\n' +
          '  -PrefixLength 24 -DefaultGateway 192.168.1.1\n' +
          'Remove-NetIPAddress -InterfaceIndex 12 -IPAddress 10.10.10.10   # ancienne\n' +
          'Set-DnsClientServerAddress -InterfaceIndex 12 -ServerAddresses 8.8.8.8\n' +
          'ipconfig /all                                                    # vérification</code></pre>',
          '<p>Deux précisions du support : ajouter une adresse sur une carte en DHCP désactive le DHCP ; ' +
          'l’<strong>ActiveStore</strong> applique l’adresse immédiatement, le <strong>PersistentStore</strong> ' +
          'la sauvegarde pour après redémarrage (au démarrage, le contenu du PersistentStore est recopié ' +
          'dans l’ActiveStore).</p>',
          box('tech', 'Modifier le mot de passe administrateur', 'terminal',
            '    <p>En invite de commande : <code>net user administrateur *</code> — saisir puis confirmer le ' +
            'nouveau mot de passe. Réflexe de première configuration.</p>')
        ].join('\n')
      },
      {
        title: 'Activer Windows et la communication à distance',
        html: [
          '<p><strong>Activer Windows</strong> — graphiquement : Panneau de configuration → Système et ' +
          'sécurité → Système → « Modifier la clé de produit » (activation par Internet ; configurer le ' +
          'proxy si besoin). En ligne de commande, deux procédures :</p>',
          '<pre><code>slmgr.vbs /ipk XXXXX-XXXXX-XXXXX-XXXXX-XXXXX   # installer la clé\n' +
          'slmgr.vbs /ato                                 # activer en ligne\n' +
          'sconfig → 11 (Activation) → 2 (Activer Windows) # équivalent sconfig</code></pre>',
          '<p><strong>Communication à distance</strong> — graphiquement : serveur local → Bureau à ' +
          'distance → Activer. En PowerShell, <code>Enable-PSRemoting -Force</code> active l’exécution de ' +
          'commandes PowerShell depuis un autre ordinateur ; l’utilitaire <code>sconfig</code> propose ' +
          'aussi le menu 7 (Bureau à distance : désactivé par défaut → saisir 7, puis A pour activer, puis ' +
          'le niveau de sécurité). Le test se fait depuis une autre machine avec l’outil « Connexion Bureau ' +
          'à distance ».</p>',
          box('method', 'La check-list de première main', 'compass',
            '    <p>Nom net, IP statique vérifiée par ipconfig /all, DNS renseigné, pare-feu maîtrisé sur ' +
            'les trois profils, Windows activé, accès distant testé depuis une autre machine. Six points — ' +
            'aucun serveur ne doit passer en production sans eux.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le point central d’administration de Windows Server est…', opts: ['le Gestionnaire de serveur', 'le Gestionnaire des tâches', 'le Panneau de configuration'], correct: 0, exp: 'Il affiche les informations, permet d’ajouter des rôles, de gérer les serveurs et d’accéder aux outils.' },
      { q: 'Créer un groupe « Serveur Paris » se fait…', opts: ['dans le tableau de bord du Gestionnaire de serveur', 'dans l’Observateur d’événements', 'dans la SAM'], correct: 0, exp: 'Le tableau de bord permet d’ajouter des serveurs et de les regrouper en unités logiques.' },
      { q: 'Les trois profils du pare-feu sont…', opts: ['domaine, privé, public', 'local, distant, hybride', 'inbound, outbound, proxy'], correct: 0, exp: 'Toute manipulation du pare-feu doit couvrir les trois profils.' },
      { q: 'La commande PowerShell qui éteint le pare-feu sur tous les profils…', opts: ['Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False', 'net stop parefeu', 'Disable-Firewall -All'], correct: 0, exp: 'Équivalent netsh : netsh advfirewall set allprofiles state off.' },
      { q: 'Pour renommer le serveur en ligne de commande…', opts: ['netdom renamecomputer NOMACTUEL /NewName:NOUVEAUNOM', 'rename serveur', 'set-hostname only'], correct: 0, exp: 'Puis redémarrer (shutdown /r) pour appliquer.' },
      { q: 'Le numéro d’interface d’une carte s’obtient par…', opts: ['Get-NetAdapter (colonne ifIndex)', 'ipconfig /flushdns', 'net user'], correct: 0, exp: 'Get-NetAdapter ou Get-NetIPInterface ; l’ifIndex sert aux commandes de configuration.' },
      { q: 'L’ActiveStore…', opts: ['applique immédiatement l’adresse IP définie', 'sauvegarde après redémarrage seulement', 'est un magasin d’applications'], correct: 0, exp: 'Le PersistentStore sauvegarde pour le redémarrage ; au boot, PersistentStore recopie dans ActiveStore.' },
      { q: 'L’activation en ligne se lance par…', opts: ['slmgr.vbs /ato', 'net user administrateur *', 'ipconfig /renew'], correct: 0, exp: '/ipk installe la clé, /ato tente l’activation en ligne ; sconfig menu 11 exécute la même commande.' }
    ],

    pitfalls: [
      'Oublier un profil du pare-feu : le service tombe seulement sur ce profil, panne intermittente garantie.',
      'Ajouter une seconde IP sans supprimer l’ancienne : Remove-NetIPAddress est obligatoire pour remplacer.',
      'Confondre ActiveStore et PersistentStore : l’un applique maintenant, l’autre retient après reboot.',
      'Oublier de redémarrer après un changement de nom : le nouveau nom n’est pas encore actif.'
    ],

    methodTitle: 'Configurer un serveur de première main',
    method: [
      'Ouvrir le Gestionnaire de serveur et passer en revue serveur local + notifications.',
      'Traiter pare-feu (3 profils), nom, IP statique, DNS — dans cet ordre, avec vérification ipconfig /all.',
      'Terminer par l’activation et l’accès à distance, testés depuis une autre machine.'
    ],

    summary: [
      'Le Gestionnaire de serveur concentre tableau de bord, serveur local, outils et notifications.',
      'Le pare-feu a trois profils (domaine, privé, public) : netsh, PowerShell ou console pour les traiter.',
      'Nom et IP se changent graphiquement ou en commande (netdom, New-NetIPAddress avec l’ifIndex).',
      'Activation (slmgr, sconfig) et accès à distance (bureau à distance, Enable-PSRemoting) closent la configuration.'
    ],

    checklist: [
      'Je situe chaque action dans le bon onglet du Gestionnaire de serveur.',
      'Je connais trois façons de traiter le pare-feu et ses trois profils.',
      'Je sais fixer une IP statique en PowerShell et la vérifier.',
      'Je distingue slmgr /ipk, slmgr /ato et le menu 11 de sconfig.'
    ],

    notions: [
      'Gestionnaire de serveur',
      'tableau de bord',
      'profils de pare-feu',
      'netdom renamecomputer',
      'ifIndex',
      'New-NetIPAddress',
      'ActiveStore / PersistentStore',
      'slmgr.vbs /ato'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — refais la visite du Gestionnaire de serveur, puis les exercices.' },
      { cls: 'mid', text: '50–69 % — rejoue l’exercice des profils de pare-feu jusqu’au sans-faute.' },
      { cls: 'good', text: '70–94 % — solide : déroule la configuration initiale de tête sur une VM.' },
      { cls: 'top', text: '≥ 95 % — maîtrise : passe à Active Directory.' }
    ],

    flashcards: [
      { q: 'Les trois profils du pare-feu ?', a: 'Domaine, privé, public — à traiter tous les trois, sinon panne selon le réseau de connexion.' },
      { q: 'La commande netsh du pare-feu ?', a: 'netsh advfirewall set allprofiles state off (réactiver : state on).' },
      { q: 'Renommer le serveur en ligne de commande ?', a: 'netdom renamecomputer NOMACTUEL /NewName:NOUVEAUNOM, puis shutdown /r.' },
      { q: 'ActiveStore contre PersistentStore ?', a: 'ActiveStore applique l’adresse immédiatement ; PersistentStore la conserve après redémarrage.' },
      { q: 'Activer Windows en deux commandes ?', a: 'slmgr.vbs /ipk (clé) puis slmgr.vbs /ato (activation en ligne) — ou sconfig menu 11.' }
    ]
  }
];
