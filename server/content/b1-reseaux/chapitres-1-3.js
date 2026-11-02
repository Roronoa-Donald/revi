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
      'distinguer le modèle d\'égal à égal (poste-à-poste) et les rôles client et serveur ;',
      'distinguer un réseau local (LAN) et un réseau étendu longue distance (WAN) ;',
      'distinguer les portées PAN, LAN, MAN et WAN, et reconnaître un WLAN comme LAN sans fil.'
    ],

    sections: [
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
          '<p>Dans une architecture <strong>poste-à-poste</strong> (<em>peer-to-peer</em> ou P2P), les ' +
          'machines peuvent demander et fournir des ressources entre elles. Un groupe de travail Windows est ' +
          'un contexte possible de partage sans domaine, mais ne définit pas à lui seul tous les réseaux P2P. ' +
          'Des postes peuvent partager des fichiers sans serveur dédié ; il reste des coûts de matériel et ' +
          'd\'administration. La gestion des accès et des sauvegardes peut devenir plus difficile quand le nombre ' +
          'de machines augmente, sans seuil universel ni impossibilité automatique de sécurisation.</p>',
          '<p>Dans l\'architecture <strong>client-serveur</strong>, les rôles sont clairement distincts et ' +
          'spécialisés :</p>',
          '<ul>',
          '  <li>Les <strong>clients</strong> sont les postes de travail des utilisateurs (ordinateurs portables, ' +
          'smartphones, tablettes) qui émettent des requêtes pour demander un service (consulter une page web, ' +
          'ouvrir un document partagé, envoyer un courriel).</li>',
          '  <li>Le <strong>serveur</strong> est un programme ou un équipement qui fournit un service : par ' +
          'exemple des fichiers, un annuaire de comptes, une base de données ou un site web. Plusieurs services ' +
          'peuvent être répartis sur des machines différentes.</li>',
          '</ul>',
          '<p>Par exemple, un annuaire peut centraliser les comptes et faciliter leur administration. Ce ' +
          'n\'est pas automatique pour chaque service client-serveur : les droits, les sauvegardes et la sécurité ' +
          'doivent être configurés. Un serveur unique peut être un point de panne ; une architecture redondante ' +
          'peut réduire cette dépendance sans garantir l\'absence d\'interruption.</p>',
          '<div class="box box--intuition"><div class="box__title">Pour aller plus loin — services d’entreprise que vous rencontrerez</div><p>Dans un réseau professionnel client/serveur, plusieurs services spécialisés sont régulièrement mentionnés :</p><ul><li><strong>Active Directory (AD) &amp; LDAP :</strong> annuaire centralisé de Microsoft (interrogé via le protocole standard <em>LDAP</em>) qui vérifie l’identité et les droits des utilisateurs sur tout le domaine ;</li><li><strong>NAS (Network Attached Storage) :</strong> serveur de fichiers autonome branché sur le réseau local pour partager des dossiers ;</li><li><strong>SAN (Storage Area Network) &amp; iSCSI :</strong> réseau de stockage haute performance mettant des disques distants à disposition des serveurs via le protocole <em>iSCSI</em> (transport de commandes disque sur IP) ou la fibre optique (<em>Fibre Channel</em>).</li></ul></div>'
        ].join('\n')
      },
      {
        title: 'Familles de réseaux : portée et technologie',
        html: [
          '<p>Les noms suivants décrivent surtout une échelle ; WLAN précise en plus une technologie sans fil. ' +
          'Ces catégories ne sont donc pas toutes exclusives : un WLAN est aussi un LAN, et un PAN peut être sans fil.</p>',
          '<ul>',
          '  <li><strong>PAN (Personal Area Network)</strong> : réseau personnel à l\'échelle d\'une personne ' +
          '(courte portée). Exemple : un smartphone synchronisé en Bluetooth avec une montre ' +
          'connectée ou des écouteurs sans fil.</li>',
          '  <li><strong>LAN (Local Area Network)</strong> : réseau local à l\'intérieur d\'un bâtiment ou d\'un ' +
          'campus (salle de classe, maison, immeuble d\'entreprise). Les équipements peuvent être reliés par ' +
          'câble ou par radio.</li>',
          '  <li><strong>WLAN (Wireless Local Area Network)</strong> : la déclinaison sans fil du LAN, reposant ' +
          'sur les ondes radio haute fréquence de la norme IEEE 802.11, dont le <strong>Wi-Fi</strong> est la ' +
          'technologie courante. Le WLAN reste un réseau local ; ses liaisons d\'accès utilisent la radio.</li>',
          '  <li><strong>MAN (Metropolitan Area Network)</strong> : réseau métropolitain étendu à l\'échelle ' +
          'd\'une ville ou d\'une agglomération (quelques dizaines de kilomètres), reliant plusieurs sites sur une ' +
          'dorsale fibre optique (ex. interconnexion des campus universitaires ou des hôpitaux d\'une métropole).</li>',
          '  <li><strong>WAN (Wide Area Network)</strong> : réseau étendu reliant des réseaux locaux de sites ' +
          'distants, par exemple entre villes, régions ou pays. Il n\'existe pas de <strong>distance fixe</strong> ' +
          'qui définisse tous les WAN. La location de liaisons auprès d\'un opérateur est possible, mais n\'est ' +
          'pas obligatoire : une organisation peut aussi utiliser des infrastructures dont elle dispose.</li>',
          '</ul>',
          '<p>Le support distingue également deux réseaux spécialisés : le <strong>CAN</strong> (Campus Area ' +
          'Network, reliant les facultés d\'un campus étendu) et le <strong>SAN</strong> (Storage Area Network, ' +
          'réseau à très haut débit dédié au transfert de données en mode bloc entre serveurs et baies de disques dur).</p>',
          '<p>Référence : <a href="https://www.cisco.com/site/us/en/learn/topics/networking/what-is-a-wan-wide-area-network.html">Cisco, Wide-Area Networks</a>, consultée le 30 octobre 2026.</p>',
          box('pitfall', 'Confusions d\'examen à éviter', 'warning', [
            '    <ul>',
            '      <li><strong>WLAN ≠ WAN</strong> : un WLAN est un réseau local sans fil ; un WAN relie des réseaux de sites distants.</li>',
            '      <li><strong>MAN et WAN</strong> : leurs usages et échelles peuvent se recouper ; ne retenez pas une distance obligatoire.</li>',
            '      <li><strong>Poste-à-poste vs client-serveur</strong> : distinguez les rôles de communication ; la gestion des comptes dépend de la configuration.</li>',
            '      <li><strong>Le SAN n\'est pas un réseau d\'utilisateurs</strong> : C\'est une autoroute privée réservée aux disques de stockage de données.</li>',
            '    </ul>'
          ].join('\n'))
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Un réseau informatique limité à l\'intérieur d\'un immeuble est…', opts: ['un WAN', 'un LAN', 'un MAN'], correct: 1, exp: 'LAN (Local Area Network) : salle, classe, immeuble, campus privé.' },
      { q: 'Les réseaux WAN relient typiquement…', opts: ['des périphériques à l\'intérieur d\'une seule pièce', 'uniquement les ordinateurs d\'une salle', 'des réseaux locaux de sites distants'], correct: 2, exp: 'Un WAN interconnecte des réseaux de sites distants ; il ne dépend ni d\'un seuil fixe ni obligatoirement de liaisons louées.' },
      { q: 'Dans un réseau d\'égal à égal (poste-à-poste), chaque ordinateur…', opts: ['ne peut que recevoir des données', 'est obligatoirement un serveur dédié', 'peut agir à la fois comme client et fournisseur de ressources'], correct: 2, exp: 'Postes égaux : ressources partagées sans serveur centralisé.' },
      { q: 'Quel rôle joue un serveur dans une architecture client-serveur ?', opts: ['remplacer tous les ordinateurs des utilisateurs', 'fournir un service demandé par des clients', 'supprimer le besoin d\'un mot de passe'], correct: 1, exp: 'Un serveur fournit un service aux clients ; il ne remplace pas leurs appareils et ne supprime pas nécessairement les mots de passe.' },
      { q: 'Un smartphone synchronisé en Bluetooth avec des écouteurs forme…', opts: ['un PAN', 'un MAN', 'un SAN'], correct: 0, exp: 'PAN : Personal Area Network (réseau personnel de proximité immédiate).' },
      { q: 'Le Wi-Fi est la technologie la plus répandue pour…', opts: ['les liaisons intercontinentales WAN', 'les réseaux locaux sans fil (WLAN)', 'les réseaux de stockage de masse SAN'], correct: 1, exp: 'WLAN : Wireless Local Area Network, normes IEEE 802.11.' },
      { q: 'L\'interconnexion des hôpitaux d\'une même ville sur une dorsale fibre est…', opts: ['un MAN', 'un PAN', 'un SAN'], correct: 0, exp: 'MAN : Metropolitan Area Network (échelle d\'une agglomération).' },
      { q: 'Un SAN (Storage Area Network) a pour rôle principal de…', opts: ['relier des baies de stockage de données en mode bloc', 'permettre la navigation web grand public', 'synchroniser un smartphone avec une imprimante'], correct: 0, exp: 'SAN : réseau spécialisé pour le stockage de niveau bloc.' }
    ],

    pitfalls: [
      'Appeler WAN un Wi-Fi de campus : le WLAN reste un réseau local sans fil.',
      'Supposer que les accès d\'un réseau poste-à-poste sont simples à gérer quelle que soit sa taille.',
      'Supposer que le modèle client-serveur garantit à lui seul la sécurité ou la disponibilité.',
      'Confondre CAN (campus étendu) et SAN (réseau dédié au stockage en mode bloc).'
    ],

    methodTitle: 'Méthode — classer un réseau en trois gestes',
    method: [
      'Observer l\'échelle et l\'usage : personne (PAN), site local (LAN), agglomération (MAN), sites distants (WAN).',
      'Vérifier le support physique : câble cuivre/fibre (LAN filaire) ou ondes radio (WLAN sans fil).',
      'Observer l\'organisation : postes autonomes égaux (poste-à-poste) ou serveur centralisateur (client-serveur).'
    ],

    summary: [
      'Trois besoins fondateurs : échanger des données, partager des ressources matérielles et administrer les accès.',
      'LAN : réseau local, par exemple dans un campus ; WAN : interconnexion de réseaux de sites distants, sans distance minimale ni location imposée.',
      'Poste-à-poste (P2P) : les machines peuvent partager des ressources entre elles ; la gestion dépend du contexte.',
      'Client-serveur : un serveur fournit un service demandé par les clients ; comptes et disponibilité dépendent de la configuration.',
      'PAN, LAN, MAN et WAN décrivent des portées ; WLAN désigne un LAN sans fil, et SAN un réseau de stockage.'
    ],

    checklist: [
      'Je sais énoncer les trois besoins fondateurs à l\'origine des réseaux.',
      'Je sais distinguer un LAN d\'un WAN sur un cas d\'usage concret.',
      'Je sais comparer le modèle poste-à-poste et l\'architecture client-serveur (avantages, limites, gestion des comptes).',
      'Je sais classer un réseau dans les cinq familles (PAN, LAN, WLAN, MAN, WAN).'
    ],

    notions: [
      '<strong>LAN</strong> : Local Area Network — réseau local (salle, bâtiment, campus).',
      '<strong>WAN</strong> : Wide Area Network — réseau étendu interconnectant des sites distants.',
      '<strong>Poste-à-poste (P2P)</strong> : machines égales, chaque poste partage ses ressources, gestion décentralisée.',
      '<strong>Client-serveur</strong> : architecture dans laquelle un serveur fournit un service demandé par des clients.',
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
      { q: 'Les trois questions fondatrices des réseaux ?', a: 'Comment communiquer efficacement ? Comment éviter la duplication des équipements ? Comment administrer et sécuriser l\'ensemble ?' },
      { q: 'LAN contre WAN ?', a: 'LAN : réseau local, par exemple un campus ; WAN : interconnexion de sites distants, sans seuil de distance ni location obligatoire.' },
      { q: 'Une limite possible du poste-à-poste ?', a: 'La gestion des accès et des sauvegardes sur plusieurs machines peut devenir plus complexe.' },
      { q: 'Quel est le rôle d\'un serveur ?', a: 'Fournir un service à des clients ; la centralisation des comptes dépend de la configuration.' },
      { q: 'Que distinguent PAN, LAN, WLAN, MAN et WAN ?', a: 'PAN, LAN, MAN et WAN indiquent une portée ; WLAN désigne un LAN sans fil.' },
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
      'Un câble se coupe : dans un réseau en bus, tout s\'arrête ; un double anneau redondant compatible peut ' +
      'se reconfigurer ; dans une étoile, un seul poste s\'isole. Le support justifie chaque topologie par ce ' +
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
          'Un anneau simple ne possède pas nécessairement de chemin de secours. Dans un <strong>double anneau</strong> ' +
          'redondant compatible, une coupure unique peut être contournée par reconfiguration des portions intactes, ' +
          'avec l\'anneau secondaire : ce comportement dépend des équipements et de la panne.</p>',
          '<p>La <a href="https://www.rfc-editor.org/rfc/rfc1512">RFC 1512</a> décrit notamment des états de ' +
          'reconfiguration de stations FDDI ; référence consultée le 30 octobre 2026.</p>',
          '<p>La <strong>topologie en étoile</strong> relie chaque équipement individuellement à un nœud ' +
          'central (liaison point à point, paires torsadées ou fibre). Si un câble est interrompu, le reste ' +
          'du réseau n\'est pas perturbé — et les connexions centralisées se modifient facilement. ' +
          'L\'inconvénient : la <strong>quantité de câbles</strong> nécessaire.</p>',
          box('mnemo', 'Mnémotechnique — « bus fragile, double anneau redondant, étoile câblée »', 'pin',
            '    <p>Le bus casse tout, un double anneau compatible peut se reconfigurer, l\'étoile isole. Retenez le comportement en panne : ' +
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
          '<p>La <strong>paire torsadée blindée STP</strong> (Shielded Twisted Pair) ajoute une protection ' +
          'contre les interférences si le système est adapté et correctement installé. Le blindage ne garantit ' +
          'pas à lui seul une portée ou un débit supérieurs : la catégorie du câble, la norme Ethernet, les ' +
          'connecteurs, l\'installation et l\'environnement déterminent les performances. Pour un ' +
          '<a href="https://www.cisco.com/c/en/us/products/interfaces-modules/catalyst-6500-16-port-10-gigabit-ethernet-copper-module/index.html">module 10GBASE-T Cisco</a>, ' +
          'des câbles conformes catégorie 6 blindée ou 6A UTP sont tous deux indiqués jusqu\'à 100 m : ' +
          'cet exemple concerne ce matériel et ces conditions (source consultée le 30 octobre 2026).</p>',
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
      { q: 'Une seule coupure survient dans un double anneau redondant compatible :', opts: ['tout tombe nécessairement', 'les portions intactes peuvent être reconfigurées avec le secondaire', 'un seul poste s\'isole nécessairement'], correct: 1, exp: 'La redondance permet une reconfiguration si les équipements et la panne le permettent ; ce n\'est pas une garantie pour tous les anneaux.' },
      { q: 'Dans une étoile, une coupure isole…', opts: ['tout le réseau', 'le nœud central', 'un seul poste'], correct: 2, exp: 'Liaisons point à point : le reste du réseau continue.' },
      { q: 'La longueur maximale d\'un segment UTP est…', opts: ['10 m', '100 m', '1000 m'], correct: 1, exp: '100 mètres ; 5e catégorie pour 1000 Mbit/s.' },
      { q: 'Quel câble à paires torsadées comporte un blindage contre les interférences ?', opts: ['l\'UTP non blindé', 'le STP blindé', 'le CPL'], correct: 1, exp: 'STP comporte un blindage ; les performances dépendent aussi de la catégorie, de la norme et de l\'installation.' },
      { q: 'Le CPL réutilise…', opts: ['les lignes électriques', 'la fibre', 'les ondes radio'], correct: 0, exp: 'Courants Porteurs en Ligne : réservé au domestique.' }
    ],

    pitfalls: [
      'Promettre la continuité de service en bus : une coupure arrête tout.',
      'Attribuer systématiquement un chemin de secours à tout anneau : il faut une redondance et des équipements compatibles.',
      'Tirer de l\'UTP au-delà de 100 m : hors norme.',
      'Confondre STP (blindage) et UTP (économique mais sensible).'
    ],

    methodTitle: 'Méthode — choisir la topologie et le support en trois gestes',
    method: [
      'Évaluer la résilience voulue : bus économique, double anneau redondant compatible, étoile isolante.',
      'Mesurer distance et environnement : UTP 100 m, STP perturbé, fibre longue distance, Wi-Fi mobilité.',
      'Vérifier le débit visé : catégorie du câble (5 : 100 Mbit/s, 5e : 1 Gbit/s).'
    ],

    summary: [
      'Bus : simple, fragile — tout le réseau tombe sur une coupure.',
      'Anneau : jeton sans collisions ; seul un double anneau compatible peut offrir une reconfiguration de secours.',
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
      '<strong>Double anneau</strong> : anneau secondaire pouvant contribuer à une reconfiguration en cas de coupure.',
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
      { q: 'Double anneau ?', a: 'Selon les équipements, une coupure unique peut déclencher la reconfiguration des portions intactes avec l\'anneau secondaire.' },
      { q: 'UTP : distance et catégorie 5e ?', a: '100 m maximum ; catégorie 5e : 1000 Mbit/s (gigabit).' },
      { q: 'STP contre UTP ?', a: 'Le blindage STP aide contre les interférences ; il ne garantit pas seul plus de débit ou de portée que l\'UTP.' }
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
          '<p>Le chiffrement n’est pas limité à la présentation : par exemple, <strong>IPsec</strong> peut protéger les paquets au niveau IP, c’est-à-dire à la couche réseau. Les protocoles réels ne se réduisent pas toujours à une seule couche OSI. Source : <a href="https://www.rfc-editor.org/rfc/rfc4301">RFC 4301</a>, consultée le 30 octobre 2026.</p>',
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
            '      <li>Le chiffrement peut apparaître à différentes couches : IPsec protège au niveau IP.</li>\n' +
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
      { q: 'Quel exemple montre que le chiffrement n’est pas limité à la présentation ?', opts: ['IPsec au niveau IP, couche réseau', 'Un câble RJ45 sans protocole', 'Un numéro de port seul'], correct: 0, exp: 'La présentation peut chiffrer dans le modèle OSI ; IPsec protège aussi au niveau IP.' },
      { q: 'La couche session assure…', opts: ['le routage', 'la synchronisation du dialogue', 'l\'encodage'], correct: 1, exp: 'Ouverture, coordination, terminaison des sessions.' },
      { q: 'Premier réflexe de dépannage :', opts: ['réinstaller l\'application', 'vérifier la couche physique', 'changer le routeur'], correct: 1, exp: 'Câbles et alimentation d\'abord — couche 1.' },
      { q: 'La couche physique décrit…', opts: ['les protocoles de messagerie', 'câbles, broches, tensions, radio', 'les tables de routage'], correct: 1, exp: 'Caractéristiques électriques, logiques et physiques.' }
    ],

    pitfalls: [
      'Placer le routeur en couche 2 ou le commutateur en couche 3 : la confusion classique.',
      'Croire que tout chiffrement se limite à la couche 6 : IPsec protège au niveau IP.',
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
      'La présentation peut chiffrer ou compresser ; IPsec protège au niveau réseau.',
      'Le dépannage remonte les couches depuis la physique.'
    ],

    checklist: [
      'Je sais réciter les sept couches dans l\'ordre.',
      'Je sais associer rôle, équipement et couche.',
      'Je sais situer IP (3), les ports (4) et donner des exemples de chiffrement à différentes couches.',
      'Je sais appliquer la méthode de dépannage par couches.'
    ],

    notions: [
      '<strong>OSI</strong> : modèle générique ISO de sept couches.',
      '<strong>Couche 1</strong> : physique — câbles, broches, tensions, radio.',
      '<strong>Couche 2</strong> : liaison de données — MAC et LLC, commutateurs.',
      '<strong>Couche 3</strong> : réseau — routage, adresses IP, routeurs.',
      '<strong>Couche 4</strong> : transport — TCP/UDP, ports, rythme et destination.',
      '<strong>Couche 5</strong> : session — ouverture, coordination, terminaison.',
      '<strong>Couche 6</strong> : présentation — format et fonctions possibles de chiffrement ou de compression.',
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
      { q: 'Que fait la couche 6 ?', a: 'Présentation : formatage, éventuellement chiffrement ou compression ; IPsec protège aussi au niveau réseau.' },
      { q: 'Le premier réflexe de dépannage ?', a: 'Vérifier la couche physique : câbles branchés, alimentation présente.' }
    ]
  }
];
