/**
 * Chapitres 1 à 3 du cours d'Architecture des réseaux B1.
 *
 * Chapitre 1 : fondamentaux et architectures (pourquoi les réseaux, LAN/WAN,
 *               workgroup vs client-serveur, PAN/LAN/WLAN/MAN/WAN).
 * Chapitre 2 : topologies et supports (bus, anneau, étoile ; UTP, STP, fibre, Wi-Fi).
 * Chapitre 3 : le modèle OSI (les sept couches, les équipements par couche, le dépannage).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code (trois
 * exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-reseaux.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Fondamentaux et architectures',
    short: 'Fondamentaux',
    toc: 'Pourquoi les réseaux ? LAN contre WAN ; groupe de travail contre client-serveur ; les cinq types de réseaux (PAN, LAN, WLAN, MAN, WAN).',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Trois questions fondent les réseaux : comment faire communiquer deux machines efficacement ? ' +
      'Comment partager les équipements et les fichiers sans duplication coûteuse ? Comment administrer et ' +
      'sécuriser l\'ensemble ? Le cours y répond par une progression logique : du simple partage poste-à-poste ' +
      'jusqu\'à l\'architecture client-serveur et la portée géographique des réseaux (PAN, LAN, WLAN, MAN, WAN).',

    objectives: [
      'expliquer les trois besoins fondamentaux à l\'origine des réseaux informatiques ;',
      'distinguer le modèle d\'égal à égal (poste-à-poste) et l\'architecture centralisée (client-serveur) ;',
      'distinguer un réseau local (LAN) et un réseau étendu longue distance (WAN) ;',
      'classer un réseau selon sa portée géographique : PAN, LAN, WLAN, MAN, WAN.'
    ],

    sections: [
      {
        "title": "Glossaire des services d’entreprise cités en ouverture (Active Directory, LDAP, NAS, SAN/iSCSI)",
        "html": "<div class=\"box box--intuition\"><div class=\"box__title\">Définitions immédiates des termes d’infrastructure</div><p>Dans un réseau professionnel client/serveur, plusieurs services spécialisés sont régulièrement mentionnés :</p><ul><li><strong>Active Directory (AD) &amp; LDAP :</strong> annuaire centralisé de Microsoft (interrogé via le protocole standard <em>LDAP</em>) qui vérifie l’identité et les droits des utilisateurs sur tout le domaine ;</li><li><strong>NAS (Network Attached Storage) :</strong> serveur de fichiers autonome branché sur le réseau local pour partager des dossiers ;</li><li><strong>SAN (Storage Area Network) &amp; iSCSI :</strong> réseau de stockage haute performance mettant des disques distants à disposition des serveurs via le protocole <em>iSCSI</em> (transport de commandes disque sur IP) ou la fibre optique (<em>Fibre Channel</em>).</li></ul></div>"
      },
      {
        title: 'Pourquoi des réseaux ?',
        html: [
          '<p>À l\'origine de l\'informatique, chaque ordinateur fonctionnait de manière isolée. Pour transmettre ' +
          'un fichier à un collègue, il fallait le copier sur un support amovible (disquette, puis clé USB) et ' +
          'se déplacer physiquement jusqu\'à son bureau. Ce transfert manuel met en évidence les trois limites ' +
          'fondamentales que les réseaux ont résolues : <strong>comment communiquer rapidement ?</strong>, ' +
          '<strong>comment partager des ressources coûteuses</strong> (imprimantes, espace de stockage, connexion ' +
          'Internet) sans devoir les acheter en double pour chaque machine ?, et <strong>comment administrer et ' +
          'sécuriser les données</strong> de manière centralisée ?</p>',
          '<p>Un <strong>réseau informatique</strong> est l\'interconnexion de plusieurs équipements ' +
          '(ordinateurs, serveurs, téléphones, imprimantes) au moyen de câbles physiques ou d\'ondes radio, ' +
          'capables d\'échanger des informations selon des règles de communication standardisées (les protocoles).</p>',
          box('mnemo', 'Mnémotechnique — « Échanger, Partager, Administrer »', 'pin',
            '    <p>Un réseau remplace le déplacement physique par un signal électrique ou radio : il permet ' +
            'd\'échanger des messages, de partager des ressources et d\'administrer les accès en toute sécurité.</p>')
        ].join('\n')
      },
      {
        title: 'Poste-à-poste contre client-serveur',
        html: [
          '<p>Pour organiser le dialogue et le partage entre ordinateurs, deux grands modèles d\'architecture ' +
          's\'opposent :</p>',
          '<p>Dans l\'architecture <strong>poste-à-poste</strong> (en anglais <em>peer-to-peer</em> ou P2P, ' +
          'historiquement appelée <em>groupe de travail / workgroup</em> sous Windows), tous les ordinateurs ' +
          'connectés sont sur un pied d\'égalité. Aucun poste ne domine les autres : chaque machine est autonome, ' +
          'fournit ses propres ressources et peut à la fois demander un fichier et en partager un. C\'est le mode ' +
          'de fonctionnement spontané d\'un petit groupe d\'étudiants partageant des documents dans une même pièce, ' +
          'ou d\'une maison avec deux ordinateurs. <strong>Avantage</strong> : coût matériel nul, aucune machine ' +
          'dédiée à financer. <strong>Limite</strong> : la dispersion des données et des comptes. Si 10 utilisateurs ' +
          'travaillent sur 4 postes, chaque poste doit contenir localement les 10 comptes et mots de passe. ' +
          'Au-delà d\'une dizaine de postes, la gestion devient chaotique, chronophage et impossible à sécuriser.</p>',
          '<p>Dans l\'architecture <strong>client-serveur</strong>, les rôles sont clairement distincts et ' +
          'spécialisés :</p>',
          '<ul>',
          '  <li>Les <strong>clients</strong> sont les postes de travail des utilisateurs (ordinateurs portables, ' +
          'smartphones, tablettes) qui émettent des requêtes pour demander un service (consulter une page web, ' +
          'ouvrir un document partagé, envoyer un courriel).</li>',
          '  <li>Le <strong>serveur</strong> est une machine plus puissante, fiable et allumée en permanence, ' +
          'qui fournit des services partagés : stockage centralisé de fichiers, annuaire de comptes, base de ' +
          'données, serveur web.</li>',
          '</ul>',
          '<p>Le serveur <strong>centralise</strong> les données et les identités : l\'administrateur crée ' +
          'le compte d\'un employé une seule fois sur le serveur, et cet employé peut se connecter en toute ' +
          'sécurité depuis n\'importe quel poste client du réseau. <strong>Avantage</strong> : gestion simplifiée ' +
          'de centaines ou de milliers d\'utilisateurs, sauvegardes fiables et centralisées. <strong>Inconvénient</strong> : ' +
          'coût d\'achat du serveur et de ses composants réseau, et dépendance (si le serveur tombe en panne, le ' +
          'service s\'arrête pour tout le monde).</p>'
        ].join('\n')
      },
      {
        title: 'Les cinq familles de réseaux par portée géographique',
        html: [
          '<p>On classe les réseaux selon leur échelle physique et leur distance de couverture :</p>',
          '<ul>',
          '  <li><strong>PAN (Personal Area Network)</strong> : réseau personnel à l\'échelle d\'une personne ' +
          '(portée inférieure à 10 mètres). Exemple : un smartphone synchronisé en Bluetooth avec une montre ' +
          'connectée ou des écouteurs sans fil.</li>',
          '  <li><strong>LAN (Local Area Network)</strong> : réseau local à l\'intérieur d\'un bâtiment ou d\'un ' +
          'campus (salle de classe, maison, immeuble d\'entreprise). Les équipements sont reliés à une box ou un ' +
          'commutateur et appartiennent à la même organisation.</li>',
          '  <li><strong>WLAN (Wireless Local Area Network)</strong> : la déclinaison sans fil du LAN, reposant ' +
          'sur les ondes radio haute fréquence de la norme IEEE 802.11, dont le <strong>Wi-Fi</strong> est la ' +
          'technologie universelle. Le WLAN reste un réseau local, simplement sans câble physique.</li>',
          '  <li><strong>MAN (Metropolitan Area Network)</strong> : réseau métropolitain étendu à l\'échelle ' +
          'd\'une ville ou d\'une agglomération (quelques dizaines de kilomètres), reliant plusieurs sites sur une ' +
          'dorsale fibre optique (ex. interconnexion des campus universitaires ou des hôpitaux d\'une métropole).</li>',
          '  <li><strong>WAN (Wide Area Network)</strong> : réseau étendu couvrant des régions, des pays ou des ' +
          'continents (plus de 100 km). L\'entreprise ne possède pas les lignes : elle loue des liaisons à un ' +
          'opérateur télécom. <strong>Internet</strong> est le plus grand WAN mondial.</li>',
          '</ul>',
          '<p>Le support distingue également deux réseaux spécialisés : le <strong>CAN</strong> (Campus Area ' +
          'Network, reliant les facultés d\'un campus étendu) et le <strong>SAN</strong> (Storage Area Network, ' +
          'réseau à très haut débit dédié au transfert de données en mode bloc entre serveurs et baies de disques dur).</p>',
          box('pitfall', 'Confusions d\'examen à éviter', 'warning', [
            '    <ul>',
            '      <li><strong>WLAN ≠ WAN</strong> : Le WLAN reste un réseau local (Wi-Fi, portée de dizaines de mètres). Le WAN traverse les pays et les continents.</li>',
            '      <li><strong>MAN ≠ WAN</strong> : Le MAN tient dans le périmètre d\'une agglomération ; le WAN relie des villes distantes de centaines de kilomètres.</li>',
            '      <li><strong>Poste-à-poste vs Client-serveur</strong> : En poste-à-poste, chaque machine gère ses propres accès. En client-serveur, seul le serveur centralise les comptes.</li>',
            '      <li><strong>Le SAN n\'est pas un réseau d\'utilisateurs</strong> : C\'est une autoroute privée réservée aux disques de stockage de données.</li>',
            '    </ul>'
          ].join('\n'))
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Un réseau informatique limité à l\'intérieur d\'un immeuble est…', opts: ['un WAN', 'un LAN', 'un MAN'], correct: 1, exp: 'LAN (Local Area Network) : salle, classe, immeuble, campus privé.' },
      { q: 'Les réseaux WAN couvrent typiquement…', opts: ['une salle de réunion', 'une seule pièce', 'des pays ou continents (plus de 100 km)'], correct: 2, exp: 'WAN (Wide Area Network) : liaisons d\'opérateurs sur de très longues distances.' },
      { q: 'Dans un réseau d\'égal à égal (poste-à-poste), chaque ordinateur…', opts: ['ne peut que recevoir des données', 'est obligatoirement un serveur dédié', 'peut agir à la fois comme client et fournisseur de ressources'], correct: 2, exp: 'Postes égaux : ressources partagées sans serveur centralisé.' },
      { q: 'Le rôle principal du serveur dans l\'architecture client-serveur est de…', opts: ['remplacer tous les ordinateurs des utilisateurs', 'centraliser les comptes, les services et les données', 'supprimer le besoin d\'un mot de passe'], correct: 1, exp: 'Le serveur centralise les identités et fournit les ressources partagées.' },
      { q: 'Un smartphone synchronisé en Bluetooth avec des écouteurs forme…', opts: ['un PAN', 'un MAN', 'un SAN'], correct: 0, exp: 'PAN : Personal Area Network (réseau personnel de proximité immédiate).' },
      { q: 'Le Wi-Fi est la technologie la plus répandue pour…', opts: ['les liaisons intercontinentales WAN', 'les réseaux locaux sans fil (WLAN)', 'les réseaux de stockage de masse SAN'], correct: 1, exp: 'WLAN : Wireless Local Area Network, normes IEEE 802.11.' },
      { q: 'L\'interconnexion des hôpitaux d\'une même ville sur une dorsale fibre est…', opts: ['un MAN', 'un PAN', 'un SAN'], correct: 0, exp: 'MAN : Metropolitan Area Network (échelle d\'une agglomération).' },
      { q: 'Un SAN (Storage Area Network) a pour rôle principal de…', opts: ['relier des baies de stockage de données en mode bloc', 'permettre la navigation web grand public', 'synchroniser un smartphone avec une imprimante'], correct: 0, exp: 'SAN : réseau spécialisé pour le stockage de niveau bloc.' }
    ],

    pitfalls: [
      'Appeler WAN un Wi-Fi de campus : le WLAN reste un réseau local sans fil.',
      'Imaginer un réseau poste-à-poste de 300 utilisateurs : au-delà d\'une dizaine de postes, la gestion décentralisée explose.',
      'Oublier que le client-serveur nécessite un investissement : serveur robuste et carte réseau fiable.',
      'Confondre CAN (campus étendu) et SAN (réseau dédié au stockage en mode bloc).'
    ],

    methodTitle: 'Méthode — classer un réseau en trois gestes',
    method: [
      'Mesurer la portée géographique : une personne (PAN), des murs (LAN), une ville (MAN), un pays ou la planète (WAN).',
      'Vérifier le support physique : câble cuivre/fibre (LAN filaire) ou ondes radio (WLAN sans fil).',
      'Observer l\'organisation : postes autonomes égaux (poste-à-poste) ou serveur centralisateur (client-serveur).'
    ],

    summary: [
      'Trois besoins fondateurs : échanger des données, partager des ressources matérielles et administrer les accès.',
      'LAN : réseau local à l\'intérieur d\'un bâtiment ; WAN : réseau longue distance (plus de 100 km) via des liaisons d\'opérateur.',
      'Poste-à-poste (P2P) : machines égales sans serveur dédié, gratuit mais ingérable à grande échelle.',
      'Client-serveur : serveur centralisant les comptes et services pour de multiples clients, robuste et évolutif.',
      'Cinq familles par portée : PAN (personne), LAN (bâtiment), WLAN (sans fil), MAN (ville), WAN (pays/monde), plus SAN (stockage).'
    ],

    checklist: [
      'Je sais énoncer les trois besoins fondateurs à l\'origine des réseaux.',
      'Je sais distinguer un LAN d\'un WAN sur un cas d\'usage concret.',
      'Je sais comparer le modèle poste-à-poste et l\'architecture client-serveur (avantages, limites, gestion des comptes).',
      'Je sais classer un réseau dans les cinq familles (PAN, LAN, WLAN, MAN, WAN).'
    ],

    notions: [
      '<strong>LAN</strong> : Local Area Network — réseau local (salle, bâtiment, campus).',
      '<strong>WAN</strong> : Wide Area Network — réseau étendu à l\'échelle de pays ou du monde (plus de 100 km).',
      '<strong>Poste-à-poste (P2P)</strong> : machines égales, chaque poste partage ses ressources, gestion décentralisée.',
      '<strong>Client-serveur</strong> : architecture où un serveur centralise les identités, fichiers et services pour des postes clients.',
      '<strong>PAN</strong> : Personal Area Network — réseau personnel à courte portée (Bluetooth, smartphone).',
      '<strong>WLAN</strong> : Wireless Local Area Network — réseau local sans fil par ondes radio (Wi-Fi, IEEE 802.11).',
      '<strong>MAN</strong> : Metropolitan Area Network — réseau reliant plusieurs sites à l\'échelle d\'une agglomération.',
      '<strong>SAN</strong> : Storage Area Network — réseau spécialisé à très haut débit pour le stockage de données en mode bloc.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les définitions LAN/WAN et la distinction poste-à-poste / client-serveur.' },
      { cls: 'mid', text: '50–69 % — refais le classement des cinq familles par échelle géographique.' },
      { cls: 'good', text: '70–94 % — bon niveau de maîtrise, révise les cas spécialisés (MAN, SAN).' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise d\'examen atteint.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « Étoile » ?', a: 'Étoile : nœud central, liaisons point à point, câblage abondant.' },
      { q: 'Qu’est-ce que « CPL » ?', a: 'CPL : transmission sur lignes électriques, usage domestique.' },
      { q: 'Qu’est-ce que « IPv4 » ?', a: 'IPv4 : 32 bits, quatre octets décimaux, réseau + hôte.' },
      { q: 'Qu’est-ce que « IPv6 » ?', a: 'IPv6 : 128 bits, huit groupes hexadécimaux.' },
      { q: 'Qu’est-ce que « Sous-réseautage » ?', a: "Sous-réseautage : diviser un réseau en empruntant des bits d'hôte." },
      { q: 'Les trois questions fondatrices des réseaux ?', a: 'Comment communiquer efficacement ? Comment éviter la duplication des équipements ? Comment administrer et sécuriser l\'ensemble ?' },
      { q: 'LAN contre WAN ?', a: 'LAN : à l\'intérieur d\'un bâtiment ou campus (privé). WAN : plus de 100 km, villes, pays et continents (liaisons d\'opérateur).' },
      { q: 'La limite du réseau poste-à-poste ?', a: 'Chaque poste doit gérer localement tous les comptes : au-delà d\'une dizaine d\'utilisateurs, la gestion devient ingérable.' },
      { q: 'L\'avantage majeur du modèle client-serveur ?', a: 'La centralisation : les comptes et les données sont administrés en un seul endroit sécurisé.' },
      { q: 'Les cinq familles de réseaux par portée ?', a: 'PAN (personne), LAN (local), WLAN (sans fil), MAN (ville), WAN (pays/monde).' },
      { q: 'À quoi sert un SAN ?', a: 'Fournir aux serveurs un accès ultra-rapide à des baies de stockage de disques en mode bloc.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Topologies et supports',
    short: 'Topologies',
    toc: 'Les trois topologies (bus, anneau, étoile) et leur comportement en panne ; les supports de transmission (UTP, STP, fibre, Wi-Fi, CPL).',
    time: '≈ 2 h de travail',

    situation:
      'Un câble se coupe : dans un réseau en bus, tout s\'arrête ; dans un double anneau, les données basculent ' +
      'sur le secondaire ; dans une étoile, un seul poste s\'isole. Le support justifie chaque topologie par ce ' +
      'comportement — puis choisit le support de transmission selon la distance, la vitesse et l\'environnement.',

    objectives: [
      'décrire les topologies bus, anneau et étoile avec leurs avantages et inconvénients ;',
      'expliquer le jeton du Token Ring et le double anneau de secours ;',
      'choisir un support : UTP (100 m), STP blindé, fibre longue distance, Wi-Fi, CPL ;',
      'prévoir l\'effet d\'une coupure de câble selon la topologie.'
    ],

    sections: [
      {
        title: 'Bus, anneau, étoile',
        html: [
          '<p>La <strong>topologie en bus</strong> relie toutes les machines sur un seul câble — cas des ' +
          'Ethernet 10Base2 (« thinnet ») au câble coaxial fin raccordé en T. Un seul ordinateur émet à la ' +
          'fois. Simple et peu coûteuse, cette liaison est <strong>fragile</strong> : tout le réseau tombe ' +
          'dès qu\'une connexion est défectueuse.</p>',
          '<p>La <strong>topologie en anneau</strong> forme une boucle fermée où circule un <strong>jeton</strong> ' +
          '(token ring, créé par IBM) qui désigne l\'ordinateur autorisé à émettre — ce qui évite les ' +
          'collisions, jusqu\'à 16 Mbit/s. Chaque station reçoit le message, seule la destinataire le traite. ' +
          'L\'anneau offre <strong>deux chemins</strong> d\'un point à l\'autre ; un <strong>double anneau</strong> ' +
          'permet aux données de passer sur l\'anneau secondaire si le premier est interrompu.</p>',
          '<p>La <strong>topologie en étoile</strong> relie chaque équipement individuellement à un nœud ' +
          'central (liaison point à point, paires torsadées ou fibre). Si un câble est interrompu, le reste ' +
          'du réseau n\'est pas perturbé — et les connexions centralisées se modifient facilement. ' +
          'L\'inconvénient : la <strong>quantité de câbles</strong> nécessaire.</p>',
          box('mnemo', 'Mnémotechnique — « bus fragile, anneau débrouillard, étoile solide mais câblée »', 'pin',
            '    <p>Le bus casse tout, l\'anneau rebondit, l\'étoile isole. Retenez le comportement en panne : ' +
            'c\'est lui que l\'examen teste.</p>')
        ].join('\n')
      },
      {
        title: 'Les supports de transmission',
        html: [
          '<p>La <strong>paire torsadée non blindée UTP</strong> (Unshielded Twisted Pair) est la plus ' +
          'utilisée en réseau local : 2 fils de cuivre isolés, segment de <strong>100 mètres</strong> maximum. ' +
          'Catégorie 1 : téléphone (voix, pas de données) ; catégorie 4 : 16 Mbit/s ; catégorie 5 : 100 Mbit/s ; ' +
          'catégorie 5e : 1000 Mbit/s. Faiblesse : la sensibilité aux <strong>interférences</strong>.</p>',
          '<p>La <strong>paire torsadée blindée STP</strong> (Shielded Twisted Pair) ajoute une enveloppe de ' +
          'protection entre et autour des paires : excellent blindage, transmission plus rapide et sur plus ' +
          'longue distance — le choix des environnements perturbés.</p>',
          '<p>Les autres liaisons : la <strong>fibre optique</strong> pour la dorsale et les grandes ' +
          'distances ; les <strong>ondes radio</strong> — Wi-Fi (normes IEEE 802.11) et Bluetooth (service ' +
          'RFCOMM) — pour le sans-fil ; le <strong>CPL</strong> (Courants Porteurs en Ligne) qui réutilise les ' +
          'lignes électriques, réservé au domestique. Quoi qu\'il en soit, le principe reste le même : les ' +
          'données partent en série, bit après bit, encapsulées comme une lettre dans une enveloppe timbrée.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Le bus ne survit pas à une coupure : tout le réseau est affecté.</li>\n' +
            '      <li>Le jeton évite les collisions — c\'est sa raison d\'être, pas un détail historique.</li>\n' +
            '      <li>UTP : 100 m maximum par segment, catégorie 5e pour le gigabit.</li>\n' +
            '      <li>L\'étoile consomme beaucoup de câble : c\'est son seul défaut majeur.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La topologie 10Base2 (« thinnet ») est…', opts: ['un anneau', 'un bus', 'une étoile'], correct: 1, exp: 'Câble coaxial fin, raccord en T, un seul lien partagé.' },
      { q: 'Le défaut majeur du bus est…', opts: ['le coût des équipements', 'la fragilité : tout tombe', 'la lenteur du jeton'], correct: 1, exp: 'Une connexion défectueuse affecte tout le réseau.' },
      { q: 'Le jeton du Token Ring sert à…', opts: ['accélérer la fibre', 'désigner qui peut émettre, sans collisions', 'chiffrer les données'], correct: 1, exp: 'Un seul ordinateur émet à la fois : jusqu\'à 16 Mbit/s.' },
      { q: 'Un câble se coupe dans un double anneau :', opts: ['tout tombe', 'bascule sur l\'anneau secondaire', 'un poste s\'isole'], correct: 1, exp: 'L\'anneau offre deux chemins ; le secondaire prend le relais.' },
      { q: 'Dans une étoile, une coupure isole…', opts: ['tout le réseau', 'le nœud central', 'un seul poste'], correct: 2, exp: 'Liaisons point à point : le reste du réseau continue.' },
      { q: 'La longueur maximale d\'un segment UTP est…', opts: ['10 m', '100 m', '1000 m'], correct: 1, exp: '100 mètres ; 5e catégorie pour 1000 Mbit/s.' },
      { q: 'Face aux interférences, on choisit…', opts: ['l\'UTP', 'le STP blindé', 'le CPL'], correct: 1, exp: 'STP : enveloppe de protection, meilleure distance et vitesse.' },
      { q: 'Le CPL réutilise…', opts: ['les lignes électriques', 'la fibre', 'les ondes radio'], correct: 0, exp: 'Courants Porteurs en Ligne : réservé au domestique.' }
    ],

    pitfalls: [
      'Promettre la continuité de service en bus : une coupure arrête tout.',
      'Oublier le double anneau dans les questions de résilience Token Ring.',
      'Tirer de l\'UTP au-delà de 100 m : hors norme.',
      'Confondre STP (blindage) et UTP (économique mais sensible).'
    ],

    methodTitle: 'Méthode — choisir la topologie et le support en trois gestes',
    method: [
      'Évaluer la résilience voulue : bus économique, anneau redondant, étoile isolante.',
      'Mesurer distance et environnement : UTP 100 m, STP perturbé, fibre longue distance, Wi-Fi mobilité.',
      'Vérifier le débit visé : catégorie du câble (5 : 100 Mbit/s, 5e : 1 Gbit/s).'
    ],

    summary: [
      'Bus : simple, fragile — tout le réseau tombe sur une coupure.',
      'Anneau : jeton sans collisions, deux chemins, double anneau de secours.',
      'Étoile : point central, coupure = un poste isolé, beaucoup de câbles.',
      'Supports : UTP 100 m, STP blindé, fibre longue distance, Wi-Fi 802.11, CPL domestique.'
    ],

    checklist: [
      'Je sais décrire les trois topologies et leur réaction à une panne.',
      'Je sais expliquer le rôle du jeton et du double anneau.',
      'Je sais choisir entre UTP, STP, fibre et Wi-Fi sur un cahier des charges.',
      'Je sais citer les catégories de câbles et leurs débits.'
    ],

    notions: [
      '<strong>Bus</strong> : un seul câble partagé, 10Base2, fragile.',
      '<strong>Anneau</strong> : boucle à jeton (Token Ring, IBM), 16 Mbit/s.',
      '<strong>Double anneau</strong> : anneau secondaire en cas de coupure.',
      '<strong>Étoile</strong> : nœud central, liaisons point à point, câblage abondant.',
      '<strong>UTP</strong> : paire torsadée non blindée, 100 m, catégories 1 à 5e.',
      '<strong>STP</strong> : blindage entre et autour des paires.',
      '<strong>Wi-Fi</strong> : WLAN régi par IEEE 802.11 ; Bluetooth par RFCOMM.',
      '<strong>CPL</strong> : transmission sur lignes électriques, usage domestique.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les trois topologies et le tableau des supports.' },
      { cls: 'mid', text: '50–69 % — refais les questions de panne par topologie.' },
      { cls: 'good', text: '70–94 % — bon niveau, entraînez-vous à conseiller un support.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Panne de câble en bus ?', a: 'Tout le réseau est affecté : la topologie est fragile.' },
      { q: 'Le jeton Token Ring ?', a: 'Un information qui circule dans l\'anneau et désigne l\'ordinateur autorisé à émettre : zéro collision, 16 Mbit/s.' },
      { q: 'Double anneau ?', a: 'Si le premier anneau est interrompu, les données passent sur le secondaire le temps de la réparation.' },
      { q: 'UTP : distance et catégorie 5e ?', a: '100 m maximum ; catégorie 5e : 1000 Mbit/s (gigabit).' },
      { q: 'STP contre UTP ?', a: 'STP : enveloppe blindée entre et autour des paires — protection contre les interférences, plus rapide, plus longue portée.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Le modèle OSI',
    short: 'OSI',
    toc: 'Les sept couches du modèle OSI, de la physique à l\'application ; les équipements par couche ; la méthode de dépannage par couches.',
    time: '≈ 2 h de travail',

    situation:
      '« Il est difficile de comprendre la technologie des réseaux sans faire référence au modèle OSI » : ' +
      'l\'ISO a bâti un modèle générique de sept couches qui ne décrit aucun produit mais cadre toutes les ' +
      'discussions — et le professionnel commence toujours un dépannage par la couche 1.',

    objectives: [
      'nommer les sept couches OSI dans l\'ordre, de la physique à l\'application ;',
      'associer chaque couche à son rôle (encapsulation, routage, session, format) ;',
      'placer les équipements : câble (1), commutateur (2), routeur (3) ;',
      'appliquer la méthode de dépannage : remonter depuis la couche physique.'
    ],

    sections: [
      {
        title: 'Les sept couches',
        html: [
          '<p>L\'ISO a élaboré le modèle <strong>OSI</strong> (Open System Interconnection) : sept couches qui ' +
          'couvrent tous les aspects de la communication entre machines en réseau. Il ne décrit aucun produit, ' +
          'mais sert de référentiel pour corréler les modèles réels et garantir l\'interopérabilité.</p>',
          '<p>De bas en haut : <strong>1-Physique</strong> (câbles, broches, tensions, radiofréquences) ; ' +
          '<strong>2-Liaison de données</strong> (transfert de nœud à nœud, correction d\'erreurs, sous-couches ' +
          'MAC et LLC — la plupart des commutateurs vivent ici) ; <strong>3-Réseau</strong> (transmission des ' +
          'paquets et routage entre routeurs, les adresses IP) ; <strong>4-Transport</strong> (coordination du ' +
          'transfert, TCP et UDP, les numéros de port) ; <strong>5-Session</strong> (ouverture, coordination et ' +
          'terminaison des sessions, synchronisation du dialogue) ; <strong>6-Présentation</strong> (formatage, ' +
          'chiffrement/déchiffrement, compression) ; <strong>7-Application</strong> (la couche la plus proche ' +
          'de l\'utilisateur : navigateur, messagerie, FTP, Skype, Outlook).</p>',
          box('mnemo', 'Mnémotechnique — « Physique-Liaison-Réseau-Transport-Session-Présentation-Application »', 'pin',
            '    <p>De la prise électrique au clic de souris : 1 câble, 2 trame, 3 route, 4 port, 5 dialogue, ' +
            '6 format, 7 logiciel. En cas de panne, on remonte dans cet ordre.</p>')
        ].join('\n')
      },
      {
        title: 'Les équipements et le dépannage',
        html: [
          '<p>Chaque couche héberge ses équipements : le <strong>câble</strong> et le connecteur en couche 1, ' +
          'le <strong>commutateur</strong> (switch) en couche 2, le <strong>routeur</strong> en couche 3 — « la ' +
          'couche très surveillée par les professionnels », celle des millions de chemins possibles entre ' +
          'Boston et la Californie. Les adresses IP travaillent en couche 3, les ports TCP/UDP en couche 4.</p>',
          '<p>Le dépannage suit le modèle : « en cas de problème de réseau, les professionnels commencent ' +
          'souvent par vérifier la couche physique » — câbles branchés, alimentation branchée — avant de ' +
          'soupçonner la carte réseau (2), le routage (3) ou l\'application (7).</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Le commutateur est de couche 2, le routeur de couche 3 : l\'inverse est le piège classique.</li>\n' +
            '      <li>Les adresses IP vivent en couche 3, les ports TCP/UDP en couche 4.</li>\n' +
            '      <li>Le chiffrement est de la couche 6 (présentation), pas de la couche 7.</li>\n' +
            '      <li>La couche session synchronise le dialogue : ouverture, coordination, terminaison.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La couche la plus proche de l\'utilisateur est…', opts: ['la couche 6', 'la couche 7 application', 'la couche 5 session'], correct: 1, exp: 'Navigateur, messagerie, FTP : couche 7.' },
      { q: 'Le routage des paquets se fait en couche…', opts: ['2', '3', '4'], correct: 1, exp: 'Couche réseau : routeurs et adresses IP.' },
      { q: 'Les commutateurs travaillent surtout en couche…', opts: ['1', '2', '3'], correct: 1, exp: 'Liaison de données, sous-couches MAC et LLC.' },
      { q: 'Les ports TCP et UDP fonctionnent en couche…', opts: ['3', '4', '7'], correct: 1, exp: 'Transport ; les adresses IP, elles, sont en couche 3.' },
      { q: 'Le chiffrement et la compression appartiennent à…', opts: ['la couche 5', 'la couche 6 présentation', 'la couche 7'], correct: 1, exp: 'Présentation : formater, chiffrer, compresser.' },
      { q: 'La couche session assure…', opts: ['le routage', 'la synchronisation du dialogue', 'l\'encodage'], correct: 1, exp: 'Ouverture, coordination, terminaison des sessions.' },
      { q: 'Premier réflexe de dépannage :', opts: ['réinstaller l\'application', 'vérifier la couche physique', 'changer le routeur'], correct: 1, exp: 'Câbles et alimentation d\'abord — couche 1.' },
      { q: 'La couche physique décrit…', opts: ['les protocoles de messagerie', 'câbles, broches, tensions, radio', 'les tables de routage'], correct: 1, exp: 'Caractéristiques électriques, logiques et physiques.' }
    ],

    pitfalls: [
      'Placer le routeur en couche 2 ou le commutateur en couche 3 : la confusion classique.',
      'Chercher le chiffrement en couche 7 : il se fait en couche 6.',
      'Oublier les sous-couches MAC et LLC de la couche 2.',
      'Commencer le dépannage par les logiciels : la couche 1 d\'abord.'
    ],

    methodTitle: 'Méthode — dépanner par couches en trois gestes',
    method: [
      'Vérifier la couche 1 : câbles, connecteurs, alimentation.',
      'Monter d\'un cran : carte et commutateur (2), routage et adresses (3).',
      'Terminer par les couches hautes : session (5), format (6), application (7).'
    ],

    summary: [
      'Sept couches : physique, liaison, réseau, transport, session, présentation, application.',
      'Câble en 1, commutateur en 2, routeur en 3 ; IP en 3, ports en 4.',
      'Chiffrement et compression : couche 6 ; sessions : couche 5.',
      'Le dépannage remonte les couches depuis la physique.'
    ],

    checklist: [
      'Je sais réciter les sept couches dans l\'ordre.',
      'Je sais associer rôle, équipement et couche.',
      'Je sais placer IP (3), ports (4), chiffrement (6).',
      'Je sais appliquer la méthode de dépannage par couches.'
    ],

    notions: [
      '<strong>OSI</strong> : modèle générique ISO de sept couches.',
      '<strong>Couche 1</strong> : physique — câbles, broches, tensions, radio.',
      '<strong>Couche 2</strong> : liaison de données — MAC et LLC, commutateurs.',
      '<strong>Couche 3</strong> : réseau — routage, adresses IP, routeurs.',
      '<strong>Couche 4</strong> : transport — TCP/UDP, ports, rythme et destination.',
      '<strong>Couche 5</strong> : session — ouverture, coordination, terminaison.',
      '<strong>Couche 6</strong> : présentation — format, chiffrement, compression.',
      '<strong>Couche 7</strong> : application — navigateur, messagerie, FTP.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis la définition des sept couches du support.' },
      { cls: 'mid', text: '50–69 % — refais le classement équipements/objets par couche.' },
      { cls: 'good', text: '70–94 % — bon niveau, entraînez-vous aux scénarios de dépannage.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les sept couches OSI ?', a: 'Physique, liaison de données, réseau, transport, session, présentation, application (1 à 7).' },
      { q: 'Commutateur ou routeur : quelle couche ?', a: 'Commutateur : couche 2. Routeur : couche 3.' },
      { q: 'IP et ports : quelles couches ?', a: 'Adresses IP : couche 3 (réseau). Ports TCP/UDP : couche 4 (transport).' },
      { q: 'Que fait la couche 6 ?', a: 'Présentation : formatage des données, chiffrement/déchiffrement, compression.' },
      { q: 'Le premier réflexe de dépannage ?', a: 'Vérifier la couche physique : câbles branchés, alimentation présente.' }
    ]
  }
];
