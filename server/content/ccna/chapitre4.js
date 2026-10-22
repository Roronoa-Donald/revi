/**
 * Chapitre 4 du cours « CCNA Réseau » B2 — Configuration des Équipements sous Cisco IOS et Sécurisation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Configuration des Équipements sous Cisco IOS &amp; Sécurisation',
  short: 'Cisco IOS &amp; Sécurisation',
  toc: 'Navigation dans l’interface CLI Cisco IOS (modes User, Privilégié, Configuration globale, Interface), configuration de base (hostname, bannières, mots de passe), durcissement de sécurité (enable secret, service password-encryption, SSH v2, login local) et diagnostic d’état des interfaces.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un audit de cybersécurité externe classe au niveau « Critique » le parc de commutateurs et routeurs d’une banque régionale. ' +
    'Des mots de passe circulent en clair sur le réseau via Telnet, les bannières d’avertissement légales sont absentes ' +
    'et les accès d’administration par console ne sont pas verrouillés. ' +
    'Les ingénieurs réseau doivent reprendre le contrôle de la flotte d’équipements sous Cisco IOS, ' +
    'maîtriser la hiérarchie des modes d’accès de la CLI, appliquer les 5 règles d’or du durcissement Cisco ' +
    '(chiffrement des mots de passe locaux, secret privilégié haché, SSH version 2 exclusif sur les lignes VTY) ' +
    'et interpréter instantanément les sorties de commandes show pour diagnostiquer les incidents matériels et logiques. ' +
    'Ce quatrième module forme à la pratique opérationnelle quotidienne de l’administration réseau Cisco.',

  objectives: [
    'naviguer avec aisance entre les différents modes d’exécution de la CLI Cisco IOS (User EXEC, Privileged EXEC, Global Config, Interface Config) ;',
    'appliquer la configuration de base d’un équipement (hostname, description d’interfaces, bannières MOTD) ;',
    'distinguer et manipuler la mémoire vive running-config (RAM) et la mémoire non volatile startup-config (NVRAM) ;',
    'sécuriser l’accès privilégié avec enable secret (hachage MD5/SHA-256) et chiffrer les mots de passe locaux avec service password-encryption ;',
    'configurer l’accès à distance sécurisé SSH v2 (nom de domaine, clés RSA 2048 bits, désactivation de Telnet sur les lignes VTY) ;',
    'analyser la commande de diagnostic clé « show ip interface brief » pour distinguer les pannes L1 des erreurs d’encapsulation L2.'
  ],

  sections: [
    {
      title: 'Hiérarchie des Modes d’Exécution Cisco IOS',
      html: [
        '<p>L’interface en ligne de commande (CLI) des routeurs et commutateurs Cisco IOS est structurée selon une arborescence ' +
        'stricte de modes de commande, chacun reconnaissable à son invite (prompt) spécifique :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Mode d’Exécution</th><th>Invite (Prompt)</th><th>Commande de Transition</th><th>Privilèges &amp; Usages</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Mode Utilisateur (User EXEC)</strong></td>',
        '      <td><code>Router&gt;</code> ou <code>Switch&gt;</code></td>',
        '      <td>Connexion initiale</td>',
        '      <td>Consultation basique (ping, traceroute simple). Aucune modification de configuration permise.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Mode Privilégié (Privileged EXEC)</strong></td>',
        '      <td><code>Router#</code> ou <code>Switch#</code></td>',
        '      <td><code>enable</code></td>',
        '      <td>Toutes les commandes de supervision approfondie (<code>show</code>, <code>debug</code>, sauvegarde, redémarrage).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Mode Configuration Globale</strong></td>',
        '      <td><code>Router(config)#</code></td>',
        '      <td><code>configure terminal</code> (depuis Privilégié)</td>',
        '      <td>Paramètres affectant l’équipement dans son ensemble (hostname, bannières, services globaux, routage).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Sous-mode Interface / Ligne</strong></td>',
        '      <td><code>Router(config-if)#</code> ou <code>(config-line)#</code></td>',
        '      <td><code>interface g0/0</code> ou <code>line vty 0 4</code></td>',
        '      <td>Paramétrage spécifique à un port physique, une sous-interface ou une ligne de console/terminal virtuel.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        '<p><strong>Commandes de navigation :</strong></p>',
        '<ul>',
        '  <li><code>exit</code> : remonte d’un cran dans l’arborescence (ex: de <code>(config-if)#</code> vers <code>(config)#</code>).</li>',
        '  <li><code>end</code> ou <code>Ctrl + Z</code> : quitte immédiatement tous les sous-modes pour revenir directement au mode Privilégié <code>Router#</code>.</li>',
        '  <li><code>disable</code> : repasse du mode Privilégié au mode Utilisateur <code>Router&gt;</code>.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Gestion des Fichiers de Configuration : RAM vs NVRAM',
      html: [
        '<p>Un équipement Cisco gère deux fichiers de configuration distincts :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">1. running-config (Mémoire RAM)</h4>',
        '    <p>La configuration actuellement en cours d’exécution par le système. ' +
        'Toute commande tapée dans la CLI s’applique <strong>instantanément</strong> dans la running-config. ' +
        'En contrepartie, la RAM étant volatile, toute modification non sauvegardée est définitivement perdue en cas de coupure de courant ou de redémarrage.</p>',
        '    <p>Commande : <code>show running-config</code></p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. startup-config (Mémoire NVRAM)</h4>',
        '    <p>Le fichier de configuration de démarrage, stocké en mémoire non volatile (NVRAM). ' +
        'Il est chargé en RAM lors du boot de l’équipement. Il conserve les réglages de manière permanente.</p>',
        '    <p>Sauvegarde : <code>copy running-config startup-config</code> (ou <code>write memory</code>).</p>',
        '    <p>Suppression : <code>erase startup-config</code>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les 5 Règles d’Or du Durcissement de Sécurité Cisco IOS',
      html: [
        '<p>Tout équipement déployé en production doit impérativement respecter les règles de durcissement recommandées par Cisco et l’ANSSI :</p>',

        '<ol>',
        '  <li><strong>Chiffrement des mots de passe en mémoire :</strong><br>',
        '    <code>Router(config)# service password-encryption</code><br>',
        '    Chiffre automatiquement les mots de passe affichés en clair dans la configuration (algorithme type 7).</li>',
        '  <li><strong>Protection du mode Privilégié avec enable secret :</strong><br>',
        '    <code>Router(config)# enable secret &lt;MotDePasseRobuste&gt;</code><br>',
        '    Utilisez un hachage cryptographique fort (MD5 type 5 ou SHA-256 type 8/9). La commande obsolète <code>enable password</code> (en clair) ne doit jamais être utilisée.</li>',
        '  <li><strong>Configuration d’une bannière légale d’avertissement :</strong><br>',
        '    <code>Router(config)# banner motd #ACCES INTERDIT AU PERSONNEL NON AUTORISE#</code><br>',
        '    Exigence légale pour établir l’accès non autorisé lors de poursuites judiciaires. Ne jamais afficher de message de bienvenue du type « Bienvenue sur notre routeur » !</li>',
        '  <li><strong>Authentification locale sur console physique :</strong><br>',
        '    <code>Router(config)# line console 0<br>',
        '    Router(config-line)# login local<br>',
        '    Router(config-line)# logging synchronous</code> (évite que les messages système ne tronquent la ligne de commande).</li>',
        '  <li><strong>Accès distant sécurisé SSH v2 exclusif :</strong><br>',
        '    Telnet transmet les identifiants et commandes en clair sur le réseau. Il doit être banni au profit de SSH version 2 chiffré.</li>',
        '</ol>',

        box('standard', 'Procédure complète de déploiement de SSH v2 sur Cisco IOS', [
          '<pre><code>Router(config)# hostname R1\n' +
          'R1(config)# ip domain-name entreprise.local\n' +
          'R1(config)# crypto key generate rsa modulus 2048\n' +
          'R1(config)# ip ssh version 2\n' +
          'R1(config)# username admin privilege 15 secret AdminPass2026!\n' +
          'R1(config)# line vty 0 4\n' +
          'R1(config-line)# transport input ssh\n' +
          'R1(config-line)# login local\n' +
          'R1(config-line)# exit</code></pre>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Diagnostic d’État des Interfaces (show ip interface brief)',
      html: [
        '<p>La commande <code>show ip interface brief</code> est l’outil de diagnostic le plus puissant de la CLI Cisco. ' +
        'Elle affiche une ligne synthétique par interface avec deux colonnes d’état capitales : <strong>Status</strong> (couche 1) et <strong>Protocol</strong> (couche 2) :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Status (L1)</th><th>Protocol (L2)</th><th>Diagnostic Opérationnel</th><th>Action Corrective</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><span class="badge" style="background:#16a34a;color:#fff">up</span></td>',
        '      <td><span class="badge" style="background:#16a34a;color:#fff">up</span></td>',
        '      <td><strong>Opérationnel</strong> : signal physique présent et protocole de liaison synchronisé.</td>',
        '      <td>Interface fonctionnelle pour le trafic IP.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><span class="badge" style="background:#dc2626;color:#fff">administratively down</span></td>',
        '      <td><span class="badge" style="background:#dc2626;color:#fff">down</span></td>',
        '      <td><strong>Désactivée administrativement</strong> : l’interface est verrouillée par commande.</td>',
        '      <td>Taper <code>no shutdown</code> dans le sous-mode <code>interface</code>.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><span class="badge" style="background:#dc2626;color:#fff">down</span></td>',
        '      <td><span class="badge" style="background:#dc2626;color:#fff">down</span></td>',
        '      <td><strong>Panne physique (L1)</strong> : aucun signal détecté. Câble débranché ou équipement distant éteint.</td>',
        '      <td>Contrôler le cordon RJ45/SFP, vérifier que l’équipement en vis-à-vis est allumé.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><span class="badge" style="background:#16a34a;color:#fff">up</span></td>',
        '      <td><span class="badge" style="background:#dc2626;color:#fff">down</span></td>',
        '      <td><strong>Panne de liaison (L2)</strong> : câble branché mais problème d’encapsulation ou d’horloge.</td>',
        '      <td>Vérifier l’encapsulation (ex: mismatch HDLC/PPP) ou l’attribution de la vitesse/duplex.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Configuration &amp; Recette d’un Équipement Cisco',
  method: [
    'Étape 1 — Nommage &amp; Accès : Se connecter sur console, attribuer un hostname explicite et configurer logging synchronous.',
    'Étape 2 — Sécurisation : Déclarer service password-encryption, enable secret et banner motd.',
    'Étape 3 — Accès distant : Déclarer le nom de domaine, générer la clé RSA 2048 bits, créer un utilisateur local et forcer transport input ssh sur VTY.',
    'Étape 4 — Adressage d’interfaces : Configurer l’IP et le masque sur les ports requis, ajouter une description explicite et activer avec no shutdown.',
    'Étape 5 — Recette : Exécuter show ip interface brief et sauvegarder la configuration avec copy running-config startup-config.'
  ],

  summary: [
    'La CLI Cisco IOS s’organise en 4 modes principaux : User EXEC (>), Privileged EXEC (#), Global Config (config)# et Interface (config-if)#.',
    'La running-config vit en mémoire vive RAM (volatile) ; la startup-config est sauvegardée en NVRAM permanente.',
    'La commande copy running-config startup-config sauvegarde les modifications de manière persistante.',
    'Le durcissement exige enable secret (hachage fort), service password-encryption, banner motd et SSH v2 sur les lignes VTY.',
    'Telnet transmettant les données en clair, il doit être formellement banni en production via transport input ssh.',
    'show ip interface brief permet de diagnostiquer en un coup d’œil l’état physique L1 (Status) et protocolaire L2 (Protocol) de chaque port.'
  ],

  checklist: [
    'Je connais la syntaxe de transition entre les 4 modes de la CLI Cisco IOS.',
    'Je comprends la différence fondamentale entre la running-config et la startup-config.',
    'Je sais appliquer les 5 commandes de durcissement de sécurité recommandées par Cisco.',
    'Je maîtrise l’ensemble de la procédure pour activer SSH v2 sur les lignes VTY.',
    'Je sais interpréter un statut « administratively down », « down/down » ou « up/down » dans show ip interface brief.'
  ],

  notions: [
    'Modes d’exécution CLI Cisco IOS',
    'Mémoire RAM (running-config) vs NVRAM (startup-config)',
    'Sauvegarde (copy running-config startup-config)',
    'Chiffrement (service password-encryption)',
    'Mot de passe privilégié (enable secret)',
    'Bannière d’avertissement (banner motd)',
    'Configuration SSH v2 et clés RSA 2048 bits',
    'Diagnostic L1/L2 avec show ip interface brief'
  ],

  pitfalls: [
    'Oublier de taper « no shutdown » sur une interface de routeur Cisco (les ports de routeur sont désactivés par défaut).',
    'Redémarrer un équipement sans avoir exécuté « copy running-config startup-config », perdant ainsi tout le travail effectué.',
    'Utiliser la commande obsolète « enable password » à la place de « enable secret » (vulnérabilité critique).',
    'Oublier de configurer « ip domain-name » avant de lancer « crypto key generate rsa », ce qui provoque une erreur de commande.',
    'Laisser Telnet activé sur les lignes VTY (« transport input all » ou « transport input telnet »), exposant les mots de passe sur le réseau.'
  ],

  questions: [
    {
      stem: 'Quelle commande permet de passer du mode Utilisateur (Router>) au mode Privilégié (Router#) ?',
      opts: ['configure terminal', 'enable', 'login', 'super-user'],
      correct: 1,
      exp: 'La commande enable permet d’accéder au mode Privilégié (Privileged EXEC mode). Elle est généralement protégée par le mot de passe configuré via enable secret.'
    },
    {
      stem: 'Dans quelle mémoire réside le fichier de configuration actuellement actif et en cours d’exécution par le processeur ?',
      opts: ['La mémoire NVRAM', 'La mémoire flash', 'La mémoire vive (RAM)', 'La mémoire morte (ROM)'],
      correct: 2,
      exp: 'La running-config est chargée et exécutée en mémoire vive (RAM). Elle est volatile et sera effacée en cas de coupure de courant si elle n’est pas copiée en NVRAM (startup-config).'
    },
    {
      stem: 'Quelle commande Cisco IOS enregistre de manière permanente les modifications de configuration pour le prochain démarrage ?',
      opts: [
        'save running-config',
        'copy running-config startup-config',
        'commit configuration',
        'write startup-config'
      ],
      correct: 1,
      exp: 'La commande officielle est « copy running-config startup-config » (ou la commande historique équivalente « write memory »).'
    },
    {
      stem: 'Pourquoi est-il impératif d’utiliser « enable secret » plutôt que « enable password » ?',
      opts: [
        'enable secret utilise un hachage cryptographique fort à sens unique (MD5/SHA), tandis qu’enable password stocke le mot de passe en clair ou faiblement réversible',
        'enable secret est la seule commande compatible avec IPv6',
        'enable secret permet de définir plusieurs mots de passe simultanément',
        'enable password est réservé aux commutateurs de niveau 3'
      ],
      correct: 0,
      exp: 'enable secret chiffre le mot de passe avec un algorithme de hachage fort (type 5 ou 8/9). enable password le stocke en clair ou avec un chiffrement trivial type 7 facilement cassé en quelques secondes.'
    },
    {
      stem: 'Quelle instruction interdit formellement les connexions Telnet non chiffrées sur les terminaux virtuels (lignes VTY) ?',
      opts: [
        'no telnet server',
        'transport input ssh',
        'access-class ssh only',
        'crypto line vty force'
      ],
      correct: 1,
      exp: 'Dans le sous-mode line vty 0 4, la commande « transport input ssh » n’autorise que les sessions SSH chiffrées et rejette automatiquement toutes les tentatives de connexion Telnet en clair.'
    },
    {
      stem: 'Quelle taille de clé minimale est préconisée par Cisco pour la génération des clés RSA destinées à SSH version 2 ?',
      opts: ['512 bits', '1024 bits', '2048 bits', '4096 bits obligatoire'],
      correct: 2,
      exp: 'Une clé RSA de 2048 bits est le standard recommandé moderne. Une clé inférieure à 768 bits interdit le passage en SSH v2 sous Cisco IOS.'
    },
    {
      stem: 'Dans la sortie de « show ip interface brief », que signifie l’état « Status: administratively down / Protocol: down » ?',
      opts: [
        'Le câble réseau est débranché ou coupé',
        'L’interface a été désactivée manuellement par un administrateur et nécessite la commande no shutdown',
        'L’adresse IP configurée est en conflit avec une autre machine',
        'L’horloge de synchronisation série est mal réglée'
      ],
      correct: 1,
      exp: 'Status « administratively down » indique que la commande shutdown est active sur l’interface. Pour la rendre opérationnelle, l’administrateur doit entrer dans l’interface et taper « no shutdown ».'
    },
    {
      stem: 'Que réalise la commande globale « service password-encryption » ?',
      opts: [
        'Elle chiffre les mots de passe visibles en clair dans le fichier de configuration pour masquer leur lecture à l’écran',
        'Elle active le protocole IPsec sur toutes les interfaces',
        'Elle génère les clés SSH publiques et privées',
        'Elle empêche toute modification de configuration par console'
      ],
      correct: 0,
      exp: 'Elle applique un chiffrement réversible (type 7) sur les mots de passe affichés en clair dans la configuration (mots de passe de console, vty, etc.) pour éviter qu’une personne regardant par-dessus l’épaule de l’administrateur ne les lise.'
    }
  ],

  flashcards: [
    {
      q: 'Quels sont les 4 modes principaux de la CLI Cisco IOS et leurs invites ?',
      a: 'User EXEC (Router>), Privileged EXEC (Router#), Global Config (Router(config)#) et Interface (Router(config-if)#).'
    },
    {
      q: 'Quelle est la différence entre running-config et startup-config ?',
      a: 'running-config est en mémoire RAM volatile (actuellement active). startup-config est en mémoire NVRAM permanente (chargée au démarrage).'
    },
    {
      q: 'Comment sauvegarder définitivement la configuration en mémoire NVRAM ?',
      a: 'Avec la commande : copy running-config startup-config (ou write memory).'
    },
    {
      q: 'Pourquoi bannir « enable password » au profit de « enable secret » ?',
      a: 'Parce qu’enable secret applique un hachage cryptographique fort à sens unique (MD5/SHA), tandis qu’enable password est stocké en clair ou en chiffrement trivial.'
    },
    {
      q: 'Quelles commandes sont nécessaires pour activer SSH v2 sur Cisco IOS ?',
      a: 'hostname, ip domain-name, crypto key generate rsa modulus 2048, ip ssh version 2, username ... secret ..., et sur line vty : transport input ssh + login local.'
    },
    {
      q: 'Que signifie un statut « up / down » dans show ip interface brief ?',
      a: 'La couche physique L1 est active (signal détecté), mais la couche liaison L2 est inactive (mismatch d’encapsulation, problème de protocole ou d’horloge).'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la hiérarchie des modes d’invite Cisco et la différence entre RAM et NVRAM.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes connaissances de base. Approfondissez la configuration de SSH v2 et l’analyse des interfaces.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise des commandes Cisco IOS et des principes de durcissement opérationnel.' },
    { cls: 'top', text: '8/8 : Administrateur Cisco chevronné ! Vous êtes fin prêt pour le routage IPv4 et les tables de routage.' }
  ]
};
