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
      'Trois questions fondaient les réseaux d\'entreprise : comment communiquer efficacement, comment éviter ' +
      'la duplication des équipements et des ressources, comment mettre en place et gérer l\'ensemble ? Le ' +
      'support répond par un vocabulaire précis — LAN, WAN, workgroup, client-serveur — que le chapitre rend ' +
      'immédiatement opératoire.',

    objectives: [
      'expliquer les trois besoins à l\'origine des réseaux d\'entreprise ;',
      'distinguer LAN (immeuble, campus) et WAN (villes, pays) ;',
      'opposer groupe de travail (poste à poste) et architecture client-serveur ;',
      'ranger un réseau dans les cinq familles : PAN, LAN, WLAN, MAN, WAN.'
    ],

    sections: [
      {
        title: 'Pourquoi des réseaux ?',
        html: [
          '<p>Les entreprises cherchaient une solution à trois questions : <strong>comment communiquer ' +
          'efficacement ?</strong>, <strong>comment éviter la duplication des équipements et des ' +
          'ressources ?</strong>, <strong>comment mettre en place et gérer un réseau ?</strong>. La réponse ' +
          'structure tout le cours : partager, centraliser, administrer.</p>',
          '<p>La plupart des réseaux de données se classent en <strong>réseaux locaux LAN</strong> — situés ' +
          'à l\'intérieur d\'un immeuble (salle, classe) ou d\'un complexe (campus, PMI) — et en <strong>' +
          'réseaux WAN</strong> — de vastes superficies (plus de 100 km) reliant des villes et des pays.</p>',
          box('mnemo', 'Mnémotechnique — « local = murs, étendu = autoroutes »', 'pin',
            '    <p>Si le réseau tient dans des murs, c\'est un LAN ; s\'il emprunte des liaisons louées à un ' +
            'opérateur pour relier des sites lointains, c\'est un WAN.</p>')
        ].join('\\n')
      },
      {
        title: 'Workgroup contre client-serveur',
        html: [
          '<p>Dans l\'architecture en <strong>groupe de travail</strong> (workgroup), les machines sont a ' +
          'priori toutes identiques en puissance et en accès réseau ; chaque poste fait office de serveur et ' +
          'est à la fois <strong>client et serveur</strong>. Les données ne sont pas centralisées : si 4 ' +
          'postes servent 10 utilisateurs, chaque poste doit contenir les 10 mots de passe — et avec 60 ' +
          'postes et 300 utilisateurs, la gestion devient périlleuse. Avantage : le faible coût en matériel. ' +
          'Limite : impossible à gérer au-delà d\'une dizaine de postes.</p>',
          '<p>Dans l\'architecture <strong>client-serveur</strong>, des machines clientes contactent un ' +
          'serveur — une machine puissante, dédiée à des tâches précises, qui fournit des services : l\'heure, ' +
          'des fichiers, une connexion, l\'accès à une base de données. Le serveur <strong>centralise</strong> ' +
          'les données du réseau : les mots de passe ne se trouvent plus qu\'à un seul endroit, faciles à ' +
          'modifier pour l\'administrateur. Avantage : la gestion de nombreux postes. Inconvénient : le coût ' +
          'du serveur et de sa carte réseau de qualité.</p>'
        ].join('\\n')
      },
      {
        title: 'Les cinq types de réseaux',
        html: [
          '<p>Le support liste cinq familles : le <strong>PAN</strong> (Personal Area Network) dessert une ' +
          'personne — un iPhone et un Mac synchronisés forment un PAN ; le <strong>LAN</strong> relie des ' +
          'périphériques via un routeur ou une box, accessibles depuis tout le réseau ; le <strong>WLAN</strong> ' +
          'est le LAN sans fil, sur ondes radio haute fréquence, dont le Wi-Fi (norme IEEE 802.11) est la ' +
          'marque la plus connue ; le <strong>MAN</strong> (Metropolitan Area Network) est un LAN étendu à ' +
          'quelques kilomètres — une ville, un grand campus — qui interconnecte plusieurs LAN sur une dorsale ' +
          'fibre ; le <strong>WAN</strong> couvre une région, un pays, un continent, sur des liaisons que ' +
          'l\'utilisateur ne possède pas : un fournisseur de télécommunications les exploite.</p>',
          '<p>Le support cite aussi deux réseaux spécialisés : le <strong>CAN</strong> (Campus Area Network, ' +
          'plus grand qu\'un LAN, plus petit qu\'un WAN) et le <strong>SAN</strong> (Storage Area Network, ' +
          'accès au stockage de niveau bloc qui se comporte comme un disque local).</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\\n' +
            '      <li>WLAN ≠ WAN : le WLAN reste un réseau local, simplement sans fil.</li>\\n' +
            '      <li>MAN ≠ WAN : le MAN tient dans une ville ; le WAN traverse les régions et les pays.</li>\\n' +
            '      <li>En workgroup chaque poste est client ET serveur ; en client-serveur, seul le serveur détient les comptes.</li>\\n' +
            '      <li>Le SAN n\'est pas un réseau d\'utilisateurs : il transporte du stockage en mode bloc.</li>\\n' +
            '    </ul>')
        ].join('\\n')
      }
    ],

    questions: [
      { q: 'Un réseau limité à un immeuble est…', opts: ['un WAN', 'un LAN', 'un MAN'], correct: 1, exp: 'LAN : salle, classe, campus, PMI — à l\'intérieur des murs.' },
      { q: 'Les WAN couvrent…', opts: ['une salle', 'une ville', 'plus de 100 km, villes et pays'], correct: 2, exp: 'Vastes superficies, liaisons d\'opérateur.' },
      { q: 'Dans un workgroup, chaque poste est…', opts: ['client seulement', 'serveur seulement', 'client et serveur'], correct: 2, exp: 'Les postes partagent leurs ressources ; données non centralisées.' },
      { q: 'L\'avantage du client-serveur est…', opts: ['le coût du matériel', 'la gestion de nombreux postes', 'l\'absence d\'administration'], correct: 1, exp: 'Le serveur centralise les comptes ; l\'inconvénient est le coût.' },
      { q: 'Un iPhone et un Mac synchronisés forment…', opts: ['un PAN', 'un MAN', 'un SAN'], correct: 0, exp: 'Le PAN dessert une personne.' },
      { q: 'Le Wi-Fi est la marque la plus connue…', opts: ['du WAN', 'du WLAN', 'du CAN'], correct: 1, exp: 'WLAN : ondes radio, normes IEEE 802.11.' },
      { q: 'Un grand campus interconnecté en fibre est…', opts: ['un MAN', 'un PAN', 'un workgroup'], correct: 0, exp: 'MAN : LAN étendu à quelques kilomètres, dorsale fibre.' },
      { q: 'Le stockage en mode bloc se transporte sur…', opts: ['un SAN', 'un LAN', 'un VPN'], correct: 0, exp: 'SAN : réseau spécialisé, disque « localement connecté ».' }
    ],

    pitfalls: [
      'Appeler WAN un Wi-Fi de campus : le WLAN reste un réseau local.',
      'Imaginer un workgroup de 300 utilisateurs : au-delà de dix postes, l\'administration explose.',
      'Oublier que le client-serveur coûte cher : serveur puissant et carte réseau de qualité.',
      'Confondre CAN (campus) et SAN (stockage en mode bloc).'
    ],

    methodTitle: 'Méthode — classer un réseau en trois gestes',
    method: [
      'Mesurer la portée : une personne (PAN), des murs (LAN), une ville (MAN), un pays (WAN).',
      'Vérifier le média : filaire (LAN) ou radio (WLAN).',
      'Observer la gestion : postes égaux (workgroup) ou serveur centralisateur (client-serveur).'
    ],

    summary: [
      'Trois besoins fondateurs : communiquer, ne pas dupliquer, administrer.',
      'LAN : immeuble ou campus ; WAN : plus de 100 km, liaisons d\'opérateur.',
      'Workgroup : chacun client et serveur, gratuit mais ingérable ; client-serveur : centralisation, coût.',
      'Cinq familles : PAN, LAN, WLAN, MAN, WAN — plus CAN (campus) et SAN (stockage).'
    ],

    checklist: [
      'Je sais énoncer les trois questions à l\'origine des réseaux.',
      'Je sais trancher entre LAN et WAN sur un cas concret.',
      'Je sais comparer workgroup et client-serveur (coût, gestion, comptes).',
      'Je sais placer cinq réseaux dans les cinq familles.'
    ],

    notions: [
      '<strong>LAN</strong> : Local Area Network — immeuble, campus.',
      '<strong>WAN</strong> : Wide Area Network — villes et pays, plus de 100 km.',
      '<strong>Workgroup</strong> : chaque poste client et serveur, données dispersées.',
      '<strong>Client-serveur</strong> : serveur centralisateur de comptes et de services.',
      '<strong>PAN</strong> : réseau personnel (iPhone + Mac).',
      '<strong>WLAN</strong> : LAN sans fil, normes IEEE 802.11 (Wi-Fi).',
      '<strong>MAN</strong> : réseau métropolitain, dorsale fibre.',
      '<strong>SAN</strong> : stockage de niveau bloc en réseau.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les définitions LAN/WAN et les deux architectures.' },
      { cls: 'mid', text: '50–69 % — refais le classement des cinq familles du support.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les cas limites (campus, mairie).' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les trois questions fondatrices ?', a: 'Comment communiquer efficacement ? Éviter la duplication des équipements ? Mettre en place et gérer le réseau ?' },
      { q: 'LAN contre WAN ?', a: 'LAN : à l\'intérieur d\'un immeuble ou d\'un campus. WAN : plus de 100 km, villes et pays, liaisons d\'opérateur.' },
      { q: 'Workgroup : la limite ?', a: 'Chaque poste doit connaître tous les mots de passe : au-delà d\'une dizaine de postes, la gestion devient périlleuse.' },
      { q: 'Les cinq types de réseaux ?', a: 'PAN (une personne), LAN (local), WLAN (local sans fil), MAN (ville), WAN (pays, continent).' },
      { q: 'À quoi sert un SAN ?', a: 'Fournir un accès au stockage de niveau bloc qui ressemble à un disque localement connecté.' }
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
        ].join('\\n')
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
            '    <ul>\\n' +
            '      <li>Le bus ne survit pas à une coupure : tout le réseau est affecté.</li>\\n' +
            '      <li>Le jeton évite les collisions — c\'est sa raison d\'être, pas un détail historique.</li>\\n' +
            '      <li>UTP : 100 m maximum par segment, catégorie 5e pour le gigabit.</li>\\n' +
            '      <li>L\'étoile consomme beaucoup de câble : c\'est son seul défaut majeur.</li>\\n' +
            '    </ul>')
        ].join('\\n')
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
      { cls: 'good', text: '70–89 % — bon niveau, entraîne-toi à conseiller un support.' },
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
        ].join('\\n')
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
            '    <ul>\\n' +
            '      <li>Le commutateur est de couche 2, le routeur de couche 3 : l\'inverse est le piège classique.</li>\\n' +
            '      <li>Les adresses IP vivent en couche 3, les ports TCP/UDP en couche 4.</li>\\n' +
            '      <li>Le chiffrement est de la couche 6 (présentation), pas de la couche 7.</li>\\n' +
            '      <li>La couche session synchronise le dialogue : ouverture, coordination, terminaison.</li>\\n' +
            '    </ul>')
        ].join('\\n')
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
      { cls: 'good', text: '70–89 % — bon niveau, entraîne-toi aux scénarios de dépannage.' },
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
