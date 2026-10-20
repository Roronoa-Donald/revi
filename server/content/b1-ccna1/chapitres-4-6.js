/**
 * Chapitres 4 à 6 du cours de CCNA 1 B1.
 *
 * Chapitre 4 : fondamentaux des WAN et du routage IP (lignes louées HDLC,
 *               Ethernet WAN/EoMPLS, logique de routage, adressage, protocoles).
 * Chapitre 5 : l'interface en ligne de commande (accès console/Telnet/SSH,
 *               modes user et enable, sous-modes de configuration, mémoires,
 *               running-config et startup-config).
 * Chapitre 6 : configuration de base du commutateur (mots de passe, utilisateurs
 *               locaux, SSH, IPv4 de gestion, commandes de confort).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code
 * (trois exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-ccna1.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Fondamentaux des WAN et du routage IP',
    short: 'WAN et routage',
    toc: 'WAN de lignes louées (HDLC) et Ethernet WAN (EoMPLS) ; la logique de routage en quatre étapes ; règles des sous-réseaux ; l\'en-tête IP ; comment les protocoles de routage apprennent les routes.',
    time: '≈ 2 h de travail',

    situation:
      'Le <strong>WAN</strong> est l\'interconnexion de plusieurs LAN — par ligne louée (HDLC, PPP) ou par ' +
      'Ethernet WAN (EoMPLS). Le routage IP y achemine les paquets de bout en bout : chaque routeur ' +
      'désencapsule, consulte sa table, réencapsule — tandis que l\'en-tête IP reste inchangé.',

    objectives: [
      'décrire le WAN de lignes louées et le WAN Ethernet (EoMPLS) ;',
      'dérouler les quatre étapes du routage interne d\'un routeur ;',
      'appliquer les deux règles d\'or des sous-réseaux (routeur entre les adresses ou non) ;',
      'expliquer l\'en-tête IPv4 de 20 octets (adresses source et destination 32 bits) ;',
      'décrire l\'apprentissage des routes par protocole de routage (connectées, annonces, métrique).'
    ],

    sections: [
      {
        title: 'Les WAN : lignes louées et Ethernet',
        html: [
          '<p>Le <strong>WAN de lignes louées</strong> : une liaison permanente louée à un opérateur, dont ' +
          'les détails de liaison de données utilisent <strong>HDLC</strong> (ou PPP). Le routeur y ' +
          'encapsule le paquet IP dans une trame HDLC. L\'<strong>Ethernet WAN</strong> (EoMPLS — Ethernet ' +
          'over MPLS) est « plus d\'actualité » : le WAN se comporte comme un gigantesque switch Ethernet ' +
          'entre les sites.</p>',
          '<p>La logique de routage interne, pour chaque trame qui arrive sur une interface : ' +
          '<strong>1.</strong> vérifier le FCS de la trame (erreur → jeter) ; <strong>2.</strong> supprimer ' +
          'l\'ancien en-tête et la fin de liaison de données, laissant le paquet IP ; <strong>3.</strong> ' +
          'comparer l\'IP de destination à la table de routage (meilleure route → interface sortante et ' +
          'saut suivant) ; <strong>4.</strong> encapsuler le paquet dans un nouvel en-tête approprié à ' +
          'l\'interface sortante et transmettre.</p>',
          box('mnemo', 'Mnémotechnique — « l\'en-tête IP voyage intact, l\'en-tête de liaison change à chaque saut »', 'pin',
            '    <p>Les MAC et en-têtes de trame se renouvellent à chaque routeur ; les adresses IP de ' +
            'bout en bout restent les mêmes.</p>')
        ].join('\n')
      },
      {
        title: 'Sous-réseaux, en-tête IP et protocoles de routage',
        html: [
          '<p>Les <strong>règles d\'or</strong> des groupes d\'adresses : deux adresses <em>non séparées</em> ' +
          'par un routeur appartiennent au <strong>même groupe</strong> (sous-réseau) ; deux adresses ' +
          '<em>séparées</em> par au moins un routeur appartiennent à des <strong>groupes différents</strong>. ' +
          'L\'analogie du support : le sous-réseau est le code postal des adresses IP. L\'<strong>en-tête ' +
          'IPv4</strong> fait 20 octets, avec les adresses source et destination de 32 bits — inchangées ' +
          'par le routage.</p>',
          '<p>Les <strong>protocoles de routage</strong> apprennent les routes en trois étapes : chaque ' +
          'routeur ajoute d\'abord ses routes <em>connectées</em> ; chaque protocole annonce les routes de ' +
          'sa table à ses voisins (mises à jour de routage) ; après apprentissage, la meilleure route — ' +
          'selon une <strong>métrique</strong> — entre dans la table. Les hôtes, eux, connaissent leur ' +
          '<strong>routeur par défaut</strong> : destination de tout paquet hors du sous-réseau local. ARP ' +
          'apprend dynamiquement la MAC de liaison de données d\'un hôte IP du LAN.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Le FCS est vérifié AVANT la désencapsulation : trame fautive = trame jetée.</li>\n' +
            '      <li>Adresses séparées par un routeur = sous-réseaux différents : la règle inverse piège.</li>\n' +
            '      <li>L\'en-tête IP reste inchangé de bout en bout : ce sont les en-têtes de liaison qui changent.</li>\n' +
            '      <li>EoMPLS est un WAN Ethernet : plus d\'actualité que HDLC.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le WAN de lignes louées utilise comme protocole de liaison…', opts: ['HDLC', 'EoMPLS', 'ARP'], correct: 0, exp: 'HDLC (ou PPP) ; EoMPLS est le WAN Ethernet, plus récent.' },
      { q: 'Première étape du routage interne :', opts: ['chercher la route', 'vérifier le FCS', 'encapsuler'], correct: 1, exp: 'FCS d\'abord : trame erronée jetée.' },
      { q: 'Deux adresses non séparées par un routeur appartiennent…', opts: ['au même sous-réseau', 'à des sous-réseaux différents', 'à des VLAN différents'], correct: 0, exp: 'Première règle d\'or du sous-réseautage.' },
      { q: 'L\'en-tête IPv4 fait…', opts: ['20 octets', '32 octets', '64 octets'], correct: 0, exp: 'Avec des adresses source et destination de 32 bits chacune.' },
      { q: 'Pendant le routage, l\'en-tête IP…', opts: ['est réécrit à chaque saut', 'reste inchangé', 'est jeté'], correct: 1, exp: 'Seuls les en-têtes de liaison de données se renouvellent.' },
      { q: 'La « meilleure route » est choisie selon…', opts: ['une métrique', 'un hasard', 'l\'alphabet'], correct: 0, exp: 'Métrique : le critère de choix entre plusieurs routes.' },
      { q: 'Un hôte envoie les paquets distants à…', opts: ['son routeur par défaut', 'son switch', 'le serveur DNS'], correct: 0, exp: 'Logique de transfert de l\'hôte : envoyer au routeur par défaut.' },
      { q: 'ARP sert à…', opts: ['apprendre la MAC d\'un hôte IP du LAN', 'router entre sous-réseaux', 'chiffrer SSH'], correct: 0, exp: 'Résolution d\'adresse : IP → MAC sur le segment local.' }
    ],

    pitfalls: [
      'Chercher la route avant de vérifier le FCS.',
      'Encapsuler sans désencapsuler : le vieux cabeau de liaison doit partir.',
      'Placer deux adresses séparées par un routeur dans le même sous-réseau.',
      'Confondre route connectée (apprentissage automatique) et route apprise (annonce).'
    ],

    methodTitle: 'Méthode — suivre un paquet en trois gestes',
    method: [
      'Repérer le sous-réseau de destination : même groupe ou saut vers le routeur par défaut.',
      'À chaque routeur : FCS, désencapsulation, table, réencapsulation.',
      'Vérifier au bout : les adresses IP sont intactes, les en-têtes de liaison ont changé à chaque saut.'
    ],

    summary: [
      'WAN : lignes louées (HDLC, PPP) ou Ethernet WAN (EoMPLS).',
      'Routage interne : FCS → désencapsulation → table → réencapsulation.',
      'Sous-réseaux : routeur entre les adresses = groupes différents.',
      'Protocoles de routage : routes connectées, annonces aux voisins, métrique.'
    ],

    checklist: [
      'Je sais dérouler les quatre étapes du routage dans l\'ordre.',
      'Je sais appliquer les deux règles des sous-réseaux.',
      'Je sais expliquer l\'en-tête IPv4 et sa stabilité.',
      'Je sais décrire l\'apprentissage d\'une route par protocole de routage.'
    ],

    notions: [
      '<strong>HDLC</strong> : protocole de liaison des lignes louées.',
      '<strong>EoMPLS</strong> : Ethernet WAN, le plus d\'actualité.',
      '<strong>Table de routage</strong> : sous-réseau → interface sortante + saut suivant.',
      '<strong>Métrique</strong> : critère de choix de la meilleure route.',
      '<strong>Route connectée</strong> : ajoutée sans protocole de routage.',
      '<strong>En-tête IPv4</strong> : 20 octets, adresses 32 bits inchangées.',
      '<strong>Routeur par défaut</strong> : destination des paquets hors du sous-réseau.',
      '<strong>ARP</strong> : apprend la MAC d\'un hôte IP du LAN.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les quatre étapes et les règles de sous-réseaux.' },
      { cls: 'mid', text: '50–69 % — refais le classement des WAN et des protocoles.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible la propagation des annonces.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les deux façons de bâtir un WAN ?', a: 'Lignes louées (HDLC/PPP) ou Ethernet WAN (EoMPLS), plus d\'actualité.' },
      { q: 'Les 4 étapes du routage interne ?', a: '1 FCS (jeter si erreur), 2 désencapsulation, 3 meilleure route dans la table, 4 réencapsulation et transmission.' },
      { q: 'Les deux règles des sous-réseaux ?', a: 'Pas de routeur entre deux adresses → même groupe ; au moins un routeur → groupes différents.' },
      { q: 'Qu\'est-ce qui change à chaque saut ?', a: 'Les en-têtes de liaison de données (MAC, HDLC) — l\'en-tête IP de 20 octets reste inchangé.' },
      { q: 'Comment un protocole de routage apprend-il ?', a: 'Routes connectées d\'abord, puis annonces aux voisins, et la meilleure route (métrique) entre dans la table.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'L\'interface en ligne de commande',
    short: 'CLI Cisco',
    toc: 'Trois accès : console, Telnet, SSH ; modes user et enable ; mode de configuration et sous-modes ; les quatre mémoires ; running-config et startup-config, copie et effacement.',
    time: '≈ 2 h de travail',

    situation:
      'Sur un commutateur Cisco Catalyst, tout passe par la <strong>CLI</strong> (interface en ligne de ' +
      'commande) d\'IOS : on tape une commande, on appuie sur Entrée, le commutateur fait et parfois ' +
      'répond. Trois accès, trois modes, quatre mémoires, deux fichiers de configuration — la grammaire ' +
      'complète du réseau Cisco.',

    objectives: [
      'accéder à la CLI : câble console (physique), Telnet (clair), SSH (chiffré) ;',
      'escalader les modes : user EXEC, enable (privilégié), configuration globale et sous-modes ;',
      'placer les fichiers : running-config (RAM), startup-config (NVRAM), IOS (flash), bootstrap (ROM) ;',
      'sauvegarder avec copy running-config startup-config et effacer avec erase startup-config.'
    ],

    sections: [
      {
        title: 'Accès et modes',
        html: [
          '<p>Trois méthodes d\'accès : la <strong>console</strong> — port physique dédié (RJ-45 ou USB ' +
          'mini-B), exigeant une connexion physique et un émulateur de terminal (Putty) ; <strong>Telnet</strong> ' +
          'et <strong>SSH</strong> — clients qui traversent le réseau IP existant. Telnet transmet <strong>en ' +
          'clair</strong> (mots de passe compris) : bien en laboratoire, dangereux en production. <strong>SSH ' +
          'chiffre tout</strong>, y compris les mots de passe : l\'option sérieuse.</p>',
          '<p>Les modes s\'escaladent : <strong>user EXEC</strong> (regarder sans rien casser — mais la ' +
          'commande <em>reload</em> y est refusée), <strong>enable</strong> ou mode privilégié (commandes ' +
          'puissantes comme reload, accessibles après la commande <em>enable</em>), puis <strong>mode de ' +
          'configuration</strong> (<em>configure terminal</em>) — le seul qui modifie le commutateur, avec ' +
          'application immédiate à chaque Entrée. Les <strong>sous-modes</strong> s\'ouvrent par commandes ' +
          'de contexte : <em>line console 0</em>, <em>interface FastEthernet 0/1</em>… et <em>exit</em> ' +
          'redescend d\'un cran.</p>',
          box('mnemo', 'Mnémotechnique — « user regarde, enable ose, configure change »', 'pin',
            '    <p>Trois degrés d\'audace : consulter, exécuter des commandes puissantes, modifier la ' +
            'configuration — et exit pour redescendre.</p>')
        ].join('\n')
      },
      {
        title: 'Mémoires et fichiers de configuration',
        html: [
          '<p>Quatre mémoires : la <strong>RAM</strong> (DRAM) — stockage de travail, perd son contenu à ' +
          'l\'extinction ; la <strong>flash</strong> — stocke les images IOS, emplacement par défaut du ' +
          'démarrage ; la <strong>ROM</strong> — programme d\'amorçage (bootstrap) qui trouve et charge ' +
          'IOS ; la <strong>NVRAM</strong> — RAM non volatile qui conserve la configuration de démarrage.</p>',
          '<p>Deux fichiers de configuration : <strong>running-config</strong> (active, en RAM, modifiée ' +
          'dynamiquement en mode configuration) et <strong>startup-config</strong> (initiale, en NVRAM, ' +
          'utilisée à chaque recharge). Le réflexe : <strong>copy running-config startup-config</strong> ' +
          'sauvegarde la configuration — sinon une coupure d\'alimentation la perd. Pour repartir de zéro en ' +
          'laboratoire : <strong>erase startup-config</strong> (ou write erase, ou erase nvram:), puis ' +
          'recharger. IOS n\'a pas de commande qui efface la running-config : on efface la startup puis on ' +
          'recharge.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>SSH chiffre ; Telnet transmet en clair : la question tombe à chaque examen.</li>\n' +
            '      <li>reload est refusée en mode user : le support le démontre explicitement.</li>\n' +
            '      <li>startup-config vit en NVRAM, pas en flash (qui stocke IOS).</li>\n' +
            '      <li>Une commande de configuration s\'applique immédiatement à l\'Entrée : prudence.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'L\'accès CLI qui exige une connexion physique :', opts: ['SSH', 'console', 'Telnet'], correct: 1, exp: 'Câble console vers le port dédié (RJ-45 ou USB mini-B).' },
      { q: 'Telnet transmet les données…', opts: ['chiffrées', 'en clair', 'compressées'], correct: 1, exp: 'Mots de passe compris : dangereux en production.' },
      { q: 'La commande qui fait passer du mode user au mode enable :', opts: ['configure', 'enable', 'login'], correct: 1, exp: 'enable ; configure terminal monte ensuite vers la configuration.' },
      { q: 'La commande reload en mode user est…', opts: ['acceptée', 'refusée', 'masquée'], correct: 1, exp: 'Reload est puissante : réservée au mode enable.' },
      { q: 'La running-config est stockée en…', opts: ['RAM', 'NVRAM', 'flash'], correct: 0, exp: 'RAM : active, dynamique, volatile.' },
      { q: 'La startup-config est stockée en…', opts: ['NVRAM', 'RAM', 'ROM'], correct: 0, exp: 'NVRAM : configuration initiale, utilisée à la recharge.' },
      { q: 'IOS est chargé depuis…', opts: ['la flash', 'la ROM', 'la RAM'], correct: 0, exp: 'La flash stocke les images IOS ; la ROM n\'a que le bootstrap.' },
      { q: 'Pour tout effacer et repartir de zéro :', opts: ['erase startup-config puis reload', 'clear running-config', 'write ram'], correct: 0, exp: 'Trois commandes possibles (write erase, erase startup-config, erase nvram:), puis recharge.' }
    ],

    pitfalls: [
      'Utiliser Telnet en production : texte clair, mots de passe capturables.',
      'Modifier la configuration sans copier : perdu à la prochaine coupure.',
      'Placer la startup-config en flash : c\'est la NVRAM.',
      'Chercher une commande qui vide la running-config : elle n\'existe pas.'
    ],

    methodTitle: 'Méthode — prendre la main sur un commutateur en trois gestes',
    method: [
      'Se connecter : console (physique) ou SSH (chiffré) — jamais Telnet en production.',
      'Escalader : user → enable → configure terminal → sous-mode (line, interface).',
      'Conclure par copy running-config startup-config avant de quitter.'
    ],

    summary: [
      'Trois accès : console (physique), Telnet (clair), SSH (chiffré).',
      'Modes : user EXEC → enable (privilégié) → configuration → sous-modes ; exit redescend.',
      'RAM : running-config ; NVRAM : startup-config ; flash : IOS ; ROM : bootstrap.',
      'copy running-config startup-config sauvegarde ; erase startup-config repart de zéro.'
    ],

    checklist: [
      'Je sais choisir l\'accès adapté et justifier.',
      'Je sais dérouler l\'escalade des modes.',
      'Je sais placer les quatre mémoires et les deux fichiers.',
      'Je sais sauvegarder et effacer proprement.'
    ],

    notions: [
      '<strong>CLI</strong> : interface textuelle d\'IOS — commande + Entrée.',
      '<strong>Console</strong> : accès physique dédié (RJ-45 bleu ou USB mini-B).',
      '<strong>SSH</strong> : accès distant chiffré, l\'option de production.',
      '<strong>Mode enable</strong> : mode privilégié — reload y est acceptée.',
      '<strong>configure terminal</strong> : passage au mode de configuration.',
      '<strong>running-config</strong> : configuration active, en RAM.',
      '<strong>startup-config</strong> : configuration initiale, en NVRAM.',
      '<strong>Bootstrap</strong> : programme d\'amorçage en ROM.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les trois accès et les quatre mémoires.' },
      { cls: 'mid', text: '50–69 % — refais l\'escalade des modes et le placement des fichiers.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible copy et erase.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les trois accès à la CLI ?', a: 'Console (câble physique), Telnet (réseau, en clair), SSH (réseau, chiffré).' },
      { q: 'Les trois modes principaux ?', a: 'User EXEC (consulter), enable/privilégié (commandes puissantes), configuration (modifier — entrée immédiate).' },
      { q: 'Les quatre mémoires ?', a: 'RAM (travail, running-config), flash (IOS), ROM (bootstrap), NVRAM (startup-config).' },
      { q: 'Sauvegarder la configuration ?', a: 'copy running-config startup-config — sinon la configuration est perdue à la coupure.' },
      { q: 'Repartir de zéro ?', a: 'erase startup-config (ou write erase), puis reload : la running-config se videra au démarrage.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Configuration de base du commutateur',
    short: 'Configurer le switch',
    toc: 'Mots de passe console et vty, enable secret, utilisateurs locaux, SSH (hostname, ip domain-name, crypto key) ; IPv4 de gestion (SVI, ip address, no shutdown, ip default-gateway) ; commandes de confort.',
    time: '≈ 2 h de travail',

    situation:
      'Par défaut, un commutateur Catalyst n\'exige aucun mot de passe sur la console et n\'accepte aucun ' +
      'accès distant. Pour gérer un réseau, il faut sécuriser (console, enable, SSH) et donner une ' +
      '<strong>adresse IP de gestion</strong> au commutateur — via son interface virtuelle VLAN (SVI).',

    objectives: [
      'sécuriser la console et les lignes vty : password + login, ou login local ;',
      'protéger le mode enable avec enable secret ;',
      'déployer SSH : hostname, ip domain-name, crypto key generate rsa, transport input ssh ;',
      'configurer l\'IPv4 de gestion : interface vlan 1, ip address, no shutdown, ip default-gateway ;',
      'conforter la console : logging synchronous, exec-timeout, no ip domain-lookup.'
    ],

    sections: [
      {
        title: 'Sécuriser la CLI',
        html: [
          '<p>Les <strong>mots de passe simples</strong> : en mode de ligne, <em>password</em> + ' +
          '<em>login</em> — pour la console (<em>line con 0</em>) et pour Telnet (<em>line vty 0 15</em>, ' +
          'le mot de passe vty). Le <strong>mode enable</strong> se protège par la commande de configuration ' +
          'globale <em>enable secret</em> — obligatoire dès qu\'on gère à distance, car depuis le mode ' +
          'enable un attaquant rechargerait le commutateur ou modifierait la configuration.</p>',
          '<p>Les <strong>utilisateurs locaux</strong> : créer les couples avec <em>username nom secret ' +
          'motdepasse</em>, puis activer avec <em>login local</em> (et nettoyer avec <em>no password</em>). ' +
          'Pour <strong>SSH</strong> — le seul accès chiffré, qui exige un couple utilisateur/mot de passe : ' +
          'hostname + <em>ip domain-name</em> (le FQDN sert à générer la clé), puis <em>crypto key generate ' +
          'rsa</em> (au moins 768 bits pour SSHv2), <em>ip ssh version 2</em>, et <em>transport input ' +
          'ssh</em> en vty pour interdire Telnet.</p>',
          box('mnemo', 'Mnémotechnique — « secret pour enable, local pour user, crypto pour SSH »', 'pin',
            '    <p>Trois protections, trois commandes-clés : enable secret, login local, crypto key ' +
            'generate rsa.</p>')
        ].join('\n')
      },
      {
        title: 'IPv4 de gestion et confort de console',
        html: [
          '<p>L\'adresse IP du commutateur ne concerne pas la commutation des trames — elle sert au ' +
          '<strong>trafic de gestion</strong> (Telnet, SSH, SNMP). Elle se pose sur l\'<strong>interface ' +
          'virtuelle (SVI)</strong> : <em>interface vlan 1</em> (tous les ports y sont par défaut), ' +
          '<em>ip address adresse masque</em>, <em>no shutdown</em>, puis <em>ip default-gateway</em> en ' +
          'configuration globale — indispensable pour parler hors du sous-réseau, comme pour un hôte. ' +
          'Alternative : <em>ip address dhcp</em> pour apprendre les paramètres dynamiquement.</p>',
          '<p>Trois commandes de <strong>confort</strong> : <em>logging synchronous</em> — les messages ' +
          'syslog attendent la fin de la commande en cours au lieu de s\'inviter en pleine saisie ; ' +
          '<em>exec-timeout minutes secondes</em> — délai de déconnexion d\'inactivité (5 min par défaut, ' +
          '0 0 = jamais, pour le laboratoire) ; <em>no ip domain-lookup</em> — plus d\'attente d\'une ' +
          'minute après une commande mal tapée qu\'IOS essaie de résoudre en nom d\'hôte.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>SSH ne fonctionne pas avec un simple mot de passe : il exige un couple utilisateur/mot de passe.</li>\n' +
            '      <li>Le crypto key a besoin du FQDN : hostname + ip domain-name avant.</li>\n' +
            '      <li>Sans ip default-gateway, le commutateur ne parle pas hors de son sous-réseau.</li>\n' +
            '      <li>exec-timeout 0 0 = jamais déconnecté : pour le labo, pas la production.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Par défaut, un commutateur Catalyst…', opts: ['exige un mot de passe console', 'n\'exige aucun mot de passe console et refuse le distant', 'accepte Telnet librement'], correct: 1, exp: 'Console libre, Telnet/SSH fermés : tout reste à sécuriser.' },
      { q: 'Le mot de passe du mode enable se pose par…', opts: ['enable secret', 'line password', 'login local'], correct: 0, exp: 'Commande de configuration globale : enable secret.' },
      { q: 'Les lignes vty portent…', opts: ['le mot de passe console', 'le mot de passe Telnet', 'le mot de passe enable'], correct: 1, exp: 'line vty 0 15 : le mot de passe vty (Telnet).' },
      { q: 'login local signifie…', opts: ['utiliser la liste locale des noms d\'utilisateurs', 'un mot de passe simple', 'une authentification externe'], correct: 0, exp: 'Couple nom/mot de passe par utilisateur, créé par username nom secret motdepasse.' },
      { q: 'La clé SSH se génère par…', opts: ['crypto key generate rsa', 'ssh keygen', 'ip ssh key'], correct: 0, exp: 'Avec au moins 768 bits pour SSHv2 ; le FQDN (hostname + ip domain-name) sert d\'entrée.' },
      { q: 'L\'adresse IP de gestion se pose sur…', opts: ['un port physique', 'l\'interface VLAN (SVI)', 'la console'], correct: 1, exp: 'interface vlan 1 par défaut — carte réseau virtuelle du commutateur.' },
      { q: 'Sans ip default-gateway, le commutateur…', opts: ['ne commmute pas', 'ne parle pas hors de son sous-réseau', 'perd sa MAC'], correct: 1, exp: 'La commutation continue ; seul le trafic de gestion distant échoue.' },
      { q: 'logging synchronous sert à…', opts: ['chiffrer la console', 'synchroniser l\'affichage des messages syslog', 'déconnecter'], correct: 1, exp: 'Les syslog attendent la fin de la sortie en cours.' }
    ],

    pitfalls: [
      'Activer SSH sans crypto key generate rsa : pas de clés, pas de SSH.',
      'Oublier ip default-gateway après l\'ip address : gestion locale seulement.',
      'Laisser transport input all en production : Telnet en clair reste ouvert.',
      'Mettre exec-timeout 0 0 en production : sessions jamais expirées.'
    ],

    methodTitle: 'Méthode — sécuriser et connecter un switch en trois gestes',
    method: [
      'Sécuriser : enable secret, puis console/vty (password + login ou login local).',
      'Ouvrir SSH : hostname, ip domain-name, crypto key generate rsa, transport input ssh.',
      'Donner une IP de gestion : interface vlan 1, ip address, no shutdown, ip default-gateway.'
    ],

    summary: [
      'Défaut : console libre, distant fermé — tout se configure.',
      'enable secret protège le mode enable ; login local remplace les mots de passe simples.',
      'SSH : hostname + ip domain-name + crypto key generate rsa + transport input ssh.',
      'IP de gestion sur la SVI : ip address, no shutdown, ip default-gateway.'
    ],

    checklist: [
      'Je sais poser les trois types de protections.',
      'Je sais dérouler la configuration SSH complète.',
      'Je sais configurer l\'IPv4 de gestion en cinq étapes.',
      'Je sais rendre la console confortable en laboratoire.'
    ],

    notions: [
      '<strong>line con 0</strong> : contexte de configuration de la console.',
      '<strong>line vty 0 15</strong> : contexte des lignes distantes (Telnet/SSH).',
      '<strong>enable secret</strong> : mot de passe du mode enable, en global.',
      '<strong>username nom secret motdepasse</strong> : création d\'un utilisateur local.',
      '<strong>crypto key generate rsa</strong> : génération des clés SSH.',
      '<strong>transport input ssh</strong> : SSH seul sur les lignes vty.',
      '<strong>SVI / interface vlan 1</strong> : interface virtuelle de gestion.',
      '<strong>exec-timeout 0 0</strong> : jamais déconnecté (laboratoire).'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis la sécurisation et les cinq étapes IPv4.' },
      { cls: 'mid', text: '50–69 % — refais la configuration SSH étape par étape.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible SVI et default-gateway.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Sécuriser console et vty avec un mot de passe simple ?', a: 'En mode de ligne : password + login — line con 0 pour la console, line vty 0 15 pour Telnet.' },
      { q: 'La checklist SSH ?', a: 'hostname, ip domain-name, crypto key generate rsa (≥ 768 bits pour SSHv2), ip ssh version 2, transport input ssh, login local.' },
      { q: 'Les cinq étapes IPv4 du commutateur ?', a: 'interface vlan 1 → ip address → no shutdown → ip default-gateway → (facultatif) ip name-server.' },
      { q: 'Pourquoi une SVI ?', a: 'L\'interface VLAN est la carte réseau virtuelle du commutateur : elle porte l\'IP de gestion, sans lien avec la commutation.' },
      { q: 'Les trois commandes de confort ?', a: 'logging synchronous (syslog), exec-timeout minutes seconds (déconnexion), no ip domain-lookup (pas d\'attente DNS).' }
    ]
  }
];
