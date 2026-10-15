/**
 * Chapitre 1 du cours « Windows Server B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Architecture Système, Services d’Infrastructure Réseau &amp; Modèle de Licence par Cœur',
  short: 'Architecture, DHCP, DNS &amp; Licences',
  toc: 'Architecture interne Windows Server (Kernel NT, HAL, mode utilisateur vs mode noyau), Server Core vs Desktop Experience, rôles d’infrastructure réseau fondamentaux (DHCP avec étendues, exclusions et réservations statiques, DNS d’infrastructure avec zones directes, inverses et enregistrements de service SRV pour Active Directory), et modèle officiel Microsoft de licences par cœur physique.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Dans une infrastructure informatique d’entreprise moderne, les serveurs Windows constituent le socle régalien sur lequel reposent l’authentification centralisée, l’adressage IP dynamique et la résolution de noms. Un déploiement anarchique ou mal calibré engendre des pannes en cascade : conflits d’adresses IP paralysant les postes clients, zones DNS désynchronisées empêchant la découverte des contrôleurs de domaine, ou non-conformité contractuelle majeure lors d’un audit de licences Microsoft. Pour un ingénieur système de niveau Bachelor 3, l’administration d’infrastructure commence par la compréhension rigoureuse du noyau Windows (Kernel NT, HAL, séparation stricte des espaces mémoires), le choix raisonné entre l’édition Server Core (sécurisée et allégée) et l’interface graphique, la conception étanche des services DHCP et DNS, et la maîtrise du modèle mathématique de licences par cœur physique.',
  objectives: [
    'maîtriser l’architecture interne du système d’exploitation Windows Server (Kernel NT, HAL, pilotes d’anneau 0 vs sous-systèmes Win32 d’anneau 3) ;',
    'comparer les éditions Windows Server (Standard, Datacenter, Essentials) et justifier le déploiement en Server Core en environnement de production ;',
    'concevoir, dimensionner et sécuriser une étendue DHCP (Scope) avec plages d’exclusion et réservations MAC statiques sans conflit d’adressage ;',
    'administrer une zone DNS d’infrastructure avec synchronisation stricte des enregistrements directs (A/AAAA), inverses (PTR) et de service (SRV) ;',
    'appliquer les règles officielles Microsoft de licences par cœur physique (min 8 par socket, min 16 par hôte, packs de 2 cœurs) et arbitrer le coût de virtualisation ;',
    'implémenter en Python 3 des validateurs d’étendues DHCP, des auditeurs de zones DNS et des calculateurs de licences serveur.'
  ],
  sections: [
    {
      title: 'Architecture Interne du Système d’Exploitation Windows Server',
      html: [
        '<p>L’architecture de Windows Server repose sur une séparation matérielle et logicielle stricte héritée de la lignée Windows NT, garantissant la stabilité et la protection mémoire de l’infrastructure :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Deux Anneaux d’Exécution Privilégiée</h4>',
        '    <ul>',
        '      <li><strong>Mode Noyau (Ring 0 / Kernel Mode) :</strong> accès direct au processeur et aux ressources physiques. Comprend la couche d’abstraction matérielle (HAL - Hardware Abstraction Layer), le micro-noyau NT (Executive Kernel), le gestionnaire de mémoire virtuelle (VMM), le gestionnaire d’I/O et les pilotes de périphériques noyau (.sys). Un crash en Ring 0 déclenche un arrêt d’urgence système (BugCheck / BSoD).</li>',
        '      <li><strong>Mode Utilisateur (Ring 3 / User Mode) :</strong> espace mémoire isolé et protégé. Héberge les sous-systèmes d’environnement (Win32 / Windows Subsystem), les applications d’entreprise et les processus système critiques (<code>lsass.exe</code> pour la sécurité, <code>services.exe</code> pour le gestionnaire de services, <code>smss.exe</code>). Une défaillance en Ring 3 n’entraîne pas le crash du serveur.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Server Core vs Expérience Utilisateur (GUI)</h4>',
        '    <table class="table">',
        '      <thead><tr><th>Critère</th><th>Server Core</th><th>Desktop Experience (GUI)</th></tr></thead>',
        '      <tbody>',
        '        <tr><td><strong>Interface</strong></td><td>Ligne de commande (PowerShell / cmd)</td><td>Bureau complet et consoles MMC</td></tr>',
        '        <tr><td><strong>Surface d’attaque</strong></td><td>Minimale (absence de shell graphique)</td><td>Étendue (navigateurs, DLLs UI)</td></tr>',
        '        <tr><td><strong>Empreinte RAM / Disque</strong></td><td>Faible (~1,5 Go RAM / 10 Go disque)</td><td>Élevée (~3 à 4 Go RAM / 25 Go disque)</td></tr>',
        '        <tr><td><strong>Fréquence de redémarrage</strong></td><td>Réduite de 40 à 60 % (moins de patches)</td><td>Mensuelle (patch tuesday complet)</td></tr>',
        '        <tr><td><strong>Usage recommandé</strong></td><td>Contrôleurs AD DS, DHCP, DNS, Hyper-V</td><td>Serveurs RDS (Remote Desktop Services)</td></tr>',
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Services Réseau Fondamentaux : DHCP & Résolution DNS d’Infrastructure',
      html: [
        '<p>Tout contrôleur de domaine et toute station de travail dépendent d’une configuration IP sans faille et d’une résolution de noms déterministe fournie par les rôles DHCP et DNS :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Architecture et Rôle du Serveur DHCP</h4>',
        '    <p>Le protocole DHCP (Dynamic Host Configuration Protocol) automatise l’attribution des baux IP à travers la transaction DORA (Discover, Offer, Request, Acknowledge) :</p>',
        '    <ul>',
        '      <li><strong>Étendue (Scope) :</strong> plage consécutive d’adresses IPv4 distribuables sur un sous-réseau avec masque, passerelle par défaut (Option 003) et serveurs DNS (Option 006).</li>',
        '      <li><strong>Plages d’exclusion :</strong> sous-ensembles d’adresses réservés aux équipements statiques (serveurs, imprimantes, passerelles) qui ne doivent jamais être alloués dynamiquement.</li>',
        '      <li><strong>Réservations statiques :</strong> baux permanents assignés à une adresse MAC spécifique pour garantir l’attribution immuable de la même IP.</li>',
        '      <li><strong>DHCP Failover :</strong> haute disponibilité entre deux serveurs DHCP en mode Load Balancing (50/50 ou 80/20) ou Hot Standby.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Zones DNS & Enregistrements SRV Active Directory</h4>',
        '    <p>Le DNS Windows Server est intégré à Active Directory (Active Directory-Integrated Zones) et stocke ses données dans la partition d’annuaire :</p>',
        '    <ul>',
        '      <li><strong>Zone Directe (Forward Lookup) :</strong> résout un FQDN en adresse IP (enregistrements <code>A</code> en IPv4 et <code>AAAA</code> en IPv6).</li>',
        '      <li><strong>Zone Inverse (Reverse Lookup) :</strong> résout une IP en FQDN (enregistrements <code>PTR</code> dans le domaine <code>in-addr.arpa</code>). La réciprocité A/PTR est indispensable pour Kerberos et la conformité des audits.</li>',
        '      <li><strong>Enregistrements de service SRV :</strong> permettent aux clients du domaine de localiser les contrôleurs de domaine (DC). Exemple : <code>_ldap._tcp.dc._msdcs.domaine.lan</code> (port 389) et <code>_kerberos._tcp.dc._msdcs.domaine.lan</code> (port 88).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Modèle Officiel Microsoft de Licences par Cœur Physique',
      html: [
        '<p>Depuis Windows Server 2016, Microsoft applique un modèle de licence basé sur le nombre de <strong>cœurs physiques</strong> des processeurs hôtes, avec des règles d’évaluation minimales strictes :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Règles de Calcul par Cœur Physique</h4>',
        '    <ul>',
        '      <li><strong>Règle du Socket :</strong> Chaque processeur physique (socket) doit être licencié pour un minimum de <strong>8 cœurs</strong>. Si un socket n’a que 4 ou 6 cœurs, compter obligatoirement 8.</li>',
        '      <li><strong>Règle du Serveur :</strong> Chaque serveur physique complet doit être licencié pour un minimum de <strong>16 cœurs</strong> au total.</li>',
        '      <li><strong>Conditionnement commercial :</strong> Les licences sont commercialisées sous forme de <strong>packs de 2 cœurs</strong> : $\\text{Packs de base} = \\lceil \\text{Total cœurs} / 2 \\rceil$.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Droits de Virtualisation : Standard vs Datacenter</h4>',
        '    <ul>',
        '      <li><strong>Édition Standard :</strong> Une licence couvrant l’ensemble des cœurs physiques de l’hôte accorde le droit d’exécuter <strong>2 machines virtuelles</strong> (OSEs) Windows Server. Pour chaque palier de 2 VMs supplémentaires, l’intégralité des cœurs physiques de l’hôte doit être relicenciée.</li>',
        '      <li><strong>Édition Datacenter :</strong> Une licence couvrant tous les cœurs physiques accorde le droit d’exécuter un nombre <strong>illimité</strong> de machines virtuelles sur cet hôte physique.</li>',
        '      <li><strong>Seuil d’arbitrage :</strong> En pratique, lorsque la densité de virtualisation dépasse 10 à 12 VMs par hôte, l’édition Datacenter devient financièrement plus avantageuse que le cumul de licences Standard.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Identifier précisément les besoins du serveur pour opter dès l’installation pour Server Core sauf impératif d’interface graphique avéré.',
    'Configurer systématiquement une adresse IP statique et documentée avant toute installation de rôle d’infrastructure réseau (AD DS, DHCP, DNS).',
    'Définir une plage d’exclusion DHCP pour tous les serveurs et équipements de routage avant d’activer une nouvelle étendue dynamique.',
    'Vérifier la création automatique des enregistrements PTR correspondants lors de l’ajout d’enregistrements directs A dans la zone DNS.',
    'Contrôler la présence et la résolubilité des enregistrements SRV (_ldap, _kerberos) sur tous les contrôleurs de domaine promus.',
    'Appliquer les règles de licence Microsoft (min 8 cœurs/socket, min 16 cœurs/serveur) pour calculer le nombre exact de packs de 2 cœurs requis.'
  ],
  summary: [
    'L’architecture Windows Server isole strictement l’espace noyau Ring 0 (HAL, Executive, pilotes) de l’espace utilisateur Ring 3 pour prévenir les pannes matérielles globales.',
    'Server Core offre une surface d’attaque réduite, une consommation mémoire minime et une diminution drastique des redémarrages de maintenance en production.',
    'Le rôle DHCP alloue les baux dynamiques mais exige des plages d’exclusion étanches et des réservations MAC vérifiées pour bannir les conflits IP.',
    'Le DNS Windows Server stocke les zones intégrées à Active Directory et gère la réciprocité A/PTR ainsi que les enregistrements de découverte de service SRV.',
    'Le modèle de licences Microsoft par cœur impose 8 cœurs minimum par socket processeur et 16 cœurs minimum par serveur physique.',
    'L’édition Standard couvre 2 VMs par licence complète d’hôte, tandis que l’édition Datacenter offre des droits de virtualisation illimités.'
  ],
  checklist: [
    'L’hôte physique dispose-t-il d’une configuration réseau statique validée via ipconfig et test de ping local ?',
    'L’étendue DHCP dispose-t-elle de plages d’exclusion excluant les adresses de passerelle et de serveurs critiques ?',
    'Chaque enregistrement direct A possède-t-il un enregistrement inverse PTR synchronisé dans la zone Reverse Lookup ?',
    'Les enregistrements SRV essentiels (_ldap, _kerberos) pointent-ils vers un contrôleur de domaine pleinement opérationnel ?',
    'Le calcul de licence par cœur intègre-t-il bien les planchers de 8 cœurs par socket et 16 cœurs par serveur ?',
    'Le choix entre Standard et Datacenter a-t-il été validé en comparant le coût total selon le nombre de VMs hébergées ?'
  ],
  notions: [
    {
      name: 'Server Core',
      desc: 'Option d’installation minimale de Windows Server sans interface graphique ni explorateur, administrée exclusivement en ligne de commande ou à distance.'
    },
    {
      name: 'Couche HAL (Hardware Abstraction Layer)',
      desc: 'Composant logiciel noyau de bas niveau masquant les spécificités des cartes mères et processeurs pour fournir une interface standardisée au système.'
    },
    {
      name: 'Étendue DHCP (Scope)',
      desc: 'Ensemble configuré d’adresses IP consécutives attribuables dynamiquement aux clients d’un même réseau local avec options de configuration.'
    },
    {
      name: 'Réservation DHCP',
      desc: 'Association statique et permanente entre une adresse physique MAC et une adresse IP au sein d’une étendue dynamique.'
    },
    {
      name: 'Enregistrement SRV (Service Record)',
      desc: 'Enregistrement DNS spécifiant l’emplacement (hôte et port de communication) d’un service réseau, indispensable à Active Directory.'
    },
    {
      name: 'Zone Inverse (Reverse Lookup)',
      desc: 'Zone DNS spécialisée dans la résolution d’adresses IP en noms d’hôtes FQDN via des enregistrements de type PTR.'
    },
    {
      name: 'Pack de Licences 2 Cœurs',
      desc: 'Unité commerciale standard de vente des licences Microsoft Windows Server calculée à partir du nombre total de cœurs physiques du serveur.'
    },
    {
      name: 'Édition Datacenter',
      desc: 'Édition haut de gamme de Windows Server accordant des droits de virtualisation illimités sur l’hôte physique licencié.'
    }
  ],
  pitfalls: [
    {
      title: 'Oubli des planchers de cœurs dans le calcul de licence',
      desc: 'Calculer les licences d’un serveur mono-processeur à 4 cœurs sur la base de 4 cœurs au lieu du minimum obligatoire de 16 cœurs expose l’entreprise à un redressement sévère.'
    },
    {
      title: 'Adresses statiques non exclues de l’étendue DHCP',
      desc: 'Définir une IP fixe sur une imprimante sans exclure cette même adresse dans l’étendue DHCP entraîne un conflit d’adresse dès qu’un poste client reçoit ce bail.'
    },
    {
      title: 'Absence de réciprocité directe / inverse (A et PTR)',
      desc: 'Créer un enregistrement A sans son PTR correspondant perturbe l’authentification Kerberos et fait échouer les audits de sécurité réseau automatisés.'
    },
    {
      title: 'Déploiement systématique de l’interface graphique GUI',
      desc: 'Installer Desktop Experience sur des serveurs d’infrastructure dédiée (DC, DHCP, DNS) dégrade la sécurité globale et multiplie inutilement les fenêtres de maintenance.'
    }
  ],
  questions: [
    {
      stem: 'Dans quelle couche d’exécution le micro-noyau NT et les pilotes matériels opèrent-ils ?',
      opts: [
        'En mode utilisateur Ring 3',
        'En mode noyau Ring 0',
        'Dans le sous-système Win32',
        'Directement dans le navigateur Edge'
      ],
      correct: 1,
      exp: 'Le noyau NT, la HAL et les pilotes .sys s’exécutent en mode noyau (Ring 0) avec accès matériel direct et mémoire protégée.'
    },
    {
      stem: 'Quel est l’avantage premier du déploiement en Server Core pour un contrôleur de domaine ?',
      opts: [
        'Permettre d’exécuter des jeux vidéo en 3D',
        'Réduire la surface d’attaque logicielle et minimiser les vulnérabilités de sécurité',
        'Rendre impossible l’accès via PowerShell',
        'Désactiver totalement la mise en réseau'
      ],
      correct: 1,
      exp: 'L’absence de sous-système graphique réduit massivement le code exécuté, diminuant les failles exploitables et les besoins en redémarrages de patchs.'
    },
    {
      stem: 'Selon les règles officielles Microsoft, quel est le minimum de cœurs à licencier par serveur physique ?',
      opts: [
        '4 cœurs',
        '8 cœurs',
        '16 cœurs',
        '32 cœurs'
      ],
      correct: 2,
      exp: 'Chaque serveur physique doit être licencié pour un minimum absolu de 16 cœurs, même s’il n’en contient que 4 ou 8.'
    },
    {
      stem: 'Combien de machines virtuelles Windows Server une licence complète Standard permet-elle d’exécuter ?',
      opts: [
        '1 seule machine virtuelle',
        '2 machines virtuelles',
        '4 machines virtuelles',
        'Un nombre illimité de machines virtuelles'
      ],
      correct: 1,
      exp: 'L’édition Standard octroie le droit d’exécuter 2 VMs Windows Server par couverture complète des cœurs physiques de l’hôte.'
    },
    {
      stem: 'À quoi sert une plage d’exclusion dans une étendue DHCP ?',
      opts: [
        'À bloquer l’accès à Internet des téléphones portables',
        'À réserver des adresses de la plage pour des serveurs ou équipements statiques sans attribution dynamique',
        'À forcer le chiffrement AES des paquets réseau',
        'À désactiver le serveur DNS de l’entreprise'
      ],
      correct: 1,
      exp: 'L’exclusion protège les adresses IP assignées en fixe aux serveurs et routeurs pour que le DHCP ne les distribue jamais à des postes clients.'
    },
    {
      stem: 'Quel type d’enregistrement DNS permet aux clients Active Directory de localiser les contrôleurs de domaine ?',
      opts: [
        'Enregistrement MX',
        'Enregistrement TXT',
        'Enregistrement SRV',
        'Enregistrement CNAME'
      ],
      correct: 2,
      exp: 'Les enregistrements SRV (Service Records) indiquent le protocole, le port et le FQDN des services vitaux comme LDAP (389) et Kerberos (88).'
    },
    {
      stem: 'Quel est le résultat d’une requête DNS inverse (Reverse Lookup) ?',
      opts: [
        'Résoudre un nom de domaine en adresse IPv4',
        'Résoudre une adresse IP en nom d’hôte complet (FQDN) via un enregistrement PTR',
        'Changer le mot de passe de l’administrateur',
        'Vider la corbeille de Windows'
      ],
      correct: 1,
      exp: 'La résolution inverse interroge la zone in-addr.arpa pour convertir une adresse IP en nom FQDN grâce à l’enregistrement PTR.'
    },
    {
      stem: 'Que se passe-t-il lorsqu’un serveur physique doté de 2 CPU à 4 cœurs chacun est licencié ?',
      opts: [
        'On achète 8 cœurs de licence',
        'On applique la règle de 8 cœurs par socket, soit 16 cœurs au total (8 packs de 2 cœurs)',
        'Microsoft offre gratuitement la licence',
        'Le serveur refuse de démarrer'
      ],
      correct: 1,
      exp: 'Chaque processeur physique requiert un plancher de 8 cœurs : 2 sockets x 8 cœurs = 16 cœurs de base (soit 8 packs de 2 cœurs).'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les deux modes d’exécution de l’architecture Windows NT ?',
      a: 'Le Mode Noyau (Ring 0, accès matériel total, HAL/VMM) et le Mode Utilisateur (Ring 3, mémoire protégée, sous-système Win32).'
    },
    {
      q: 'Pourquoi privilégier Server Core en production ?',
      a: 'Pour sa sécurité maximale (surface d’attaque minimale), sa légèreté en RAM/disque et la réduction des redémarrages de maintenance.'
    },
    {
      q: 'Quelles sont les deux règles de plancher de licence par cœur Microsoft ?',
      a: 'Minimum 8 cœurs physiques par socket CPU, et minimum 16 cœurs physiques par serveur physique au total.'
    },
    {
      q: 'Combien de VMs sont couvertes par l’édition Datacenter ?',
      a: 'Un nombre illimité de machines virtuelles sur l’hôte physique licencié.'
    },
    {
      q: 'À quoi sert un enregistrement DNS de type SRV ?',
      a: 'À spécifier l’emplacement réseau (serveur cible et port) d’un service applicatif, comme LDAP ou Kerberos pour Active Directory.'
    },
    {
      q: 'Qu’est-ce qu’une réservation DHCP ?',
      a: 'L’attribution permanente et déterministe d’une même adresse IP à une machine spécifique identifiée par son adresse MAC.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à distinguer Server Core de Desktop Experience ou confusion sur les règles de calcul des licences par cœur.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension de l’architecture NT, configuration étanche des baux DHCP et des enregistrements DNS directs et inverses.'
    },
    {
      cls: 'high',
      text: 'Excellence en ingénierie système : arbitrage financier Standard/Datacenter, sécurisation DNS/SRV et maîtrise de l’architecture noyau.'
    }
  ]
};
