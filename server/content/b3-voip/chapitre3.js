/**
 * Module 3 — Architecture & Déploiement d'un IPBX Asterisk
 * Cours « Téléphonie VoIP B3 »
 */
'use strict';

module.exports = {
  n: 3,
  title: 'Architecture & Déploiement d\'un IPBX Asterisk',
  short: 'Asterisk & Comptes SIP',
  toc: 'Histoire et architecture d\'Asterisk (PABX/IPBX open source), modules de canaux chan_sip et chan_pjsip, installation et structure de /etc/asterisk, déclaration des comptes utilisateurs dans sip.conf et users.conf, gestion des boîtes vocales dans voicemail.conf, installation des packs sonores français et paramétrage des softphones clients.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Votre entreprise déploie un serveur IPBX Asterisk sous Linux Debian pour remplacer son ancien autocommutateur propriétaire. ' +
    'Vous avez la responsabilité d\'installer et d\'administrer la plateforme : configurer l\'arborescence /etc/asterisk/, ' +
    'déclarer les comptes utilisateurs et terminaux SIP dans sip.conf avec des règles d\'authentification et de filtrage de codecs rigoureuses, ' +
    'mettre en service le serveur de messagerie vocale voicemail.conf avec notification par email et pièces jointes audio, ' +
    'et provisionner les softphones clients (Linphone, Zoiper, MicroSIP) sur les postes des collaborateurs.',

  objectives: [
    'Comprendre l\'architecture interne modulaire d\'Asterisk : noyau PBX Core, pilotes de canaux (chan_sip, chan_pjsip, chan_dahdi) et traducteurs de codecs.',
    'Structurer l\'arborescence de configuration sous /etc/asterisk/ et maîtriser la console CLI interactive (asterisk -rvvv).',
    'Déclarer et sécuriser des comptes utilisateurs SIP dans sip.conf (types friend/peer/user, host=dynamic, secret, context, allow/disallow).',
    'Configurer le service de messagerie vocale dans voicemail.conf (boîtes vocales, codes PIN, notification email et envoi de pièces jointes WAV).'
  ],

  sections: [
    {
      title: 'Architecture Interne & Installation du Serveur Asterisk',
      html: [
        '<p>Créé en 1999 par <strong>Mark Spencer</strong> (Digium), le projet <strong>Asterisk</strong> est un commutateur téléphonique logiciel (PABX / IPBX) complet, libre et modulaire fonctionnant principalement sous Linux. Capable d\'interfacer la téléphonie analogique, les liaisons numériques RNIS (via cartes matérielles PCIe) et surtout la voix sur IP, Asterisk s\'est imposé comme le cœur logiciel de référence des télécommunications d\'entreprise.</p>',
        '<p>L\'architecture d\'Asterisk repose sur un noyau central (Core) hautement optimisé découplé de ses modules périphériques par des APIs internes :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Modules de Canaux (Channel Drivers)</h4>',
        '    <ul>',
        '      <li><code>chan_sip :</code> Pilote de canal SIP historique d\'Asterisk (fichier de configuration <code>sip.conf</code>).</li>',
        '      <li><code>chan_pjsip :</code> Pile SIP moderne d\'Asterisk basée sur la bibliothèque PJSIP, gérant nativement le multi-endpoint, l\'IPv6 et WebRTC (fichier <code>pjsip.conf</code>).</li>',
        '      <li><code>chan_iax2 :</code> Pilote du protocole propriétaire Inter-Asterisk eXchange pour les liaisons inter-serveurs.</li>',
        '      <li><code>chan_dahdi :</code> Pilote d\'interfaçage matériel pour les cartes téléphoniques analogiques (FXS/FXO) et numériques RNIS (T0/T2 / E1/T1).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Noyau &amp; Sous-Systèmes Clés</h4>',
        '    <ul>',
        '      <li><strong>Moteur de commutation (PBX Core) :</strong> Connecte et achemine les canaux audio entre appelants et appelés.</li>',
        '      <li><strong>Traducteur de codecs (Codec Translators) :</strong> Convertit à la volée les flux audio entre codecs incompatibles (transcodage G.711 &harr; G.729).</li>',
        '      <li><strong>Moteur de Dialplan :</strong> Évalue et exécute séquentiellement les règles d\'acheminement du fichier <code>extensions.conf</code>.</li>',
        '      <li><strong>Console d\'administration :</strong> Interface CLI interactive accessible par <code>asterisk -rvvv</code> pour le débogage temps réel.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<div class="card">',
        '  <h4>Installation &amp; Structure des Fichiers de Configuration</h4>',
        '  <p>Sous Debian / Ubuntu, Asterisk s\'installe via le gestionnaire de paquets ou par compilation des sources officielles. Tous les fichiers de configuration résident dans <code>/etc/asterisk/</code> :</p>',
        '  <ul>',
        '    <li><code>asterisk.conf :</code> Paramètres généraux, répertoires de stockage des sons et des journaux.</li>',
        '    <li><code>sip.conf / pjsip.conf :</code> Définition des comptes d\'utilisateurs, des postes SIP et des trunks opérateurs.</li>',
        '    <li><code>extensions.conf :</code> Plan d\'appel (Dialplan) dictant la logique de routage des communications.</li>',
        '    <li><code>voicemail.conf :</code> Configuration des boîtes vocales et des notifications email.</li>',
        '  </ul>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Configuration des Postes & Comptes SIP (sip.conf & users.conf)',
      html: [
        '<p>Pour qu\'un utilisateur puisse émettre et recevoir des appels, son compte doit être formellement déclaré dans le fichier <code>/etc/asterisk/sip.conf</code> (ou <code>users.conf</code> sous les versions simplifiées). Chaque poste est défini par une section entre crochets correspondant à son identifiant ou numéro de téléphone :</p>',
        '<div class="card">',
        '  <h4>Exemple de Déclaration d\'un Compte Utilisateur SIP Standard</h4>',
        '  <pre><code>[706438029]\ntype=friend\nhost=dynamic\ndtmfmode=rfc2833\ndisallow=all\nallow=ulaw\nallow=alaw\nfullname=Pape Moussa SONKO\nusername=moussa\nsecret=PassSecret8190\ncontext=work</code></pre>',
        '  <p>Explications détaillées des directives :</p>',
        '  <ul>',
        '    <li><code>[706438029] :</code> Nom de la section, faisant office de numéro SIP ou d\'extension de l\'utilisateur.</li>',
        '    <li><code>type=friend :</code> Autorise l\'utilisateur à la fois à émettre (peer) et recevoir (user) des appels téléphoniques.</li>',
        '    <li><code>host=dynamic :</code> Spécifie que le poste n\'a pas d\'adresse IP fixe sur le réseau ; il doit impérativement s\'enregistrer auprès du serveur Asterisk via une requête <code>REGISTER</code>.</li>',
        '    <li><code>secret=... :</code> Mot de passe d\'authentification exigé par Asterisk lors de la réponse au challenge HTTP <code>401 Unauthorized</code>.</li>',
        '    <li><code>context=work :</code> Raccroche l\'utilisateur au contexte d\'acheminement <code>[work]</code> défini dans le Dialplan (extensions.conf), délimitant strictement les numéros que cet utilisateur a le droit de composer.</li>',
        '    <li><code>disallow=all / allow=alaw,ulaw :</code> Désactive tous les codecs par mesure de sécurité, puis active explicitement les codecs autorisés par ordre de préférence.</li>',
        '  </ul>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Messagerie Vocale (voicemail.conf) & Configuration des Softphones Clients',
      html: [
        '<p>La messagerie vocale est l\'un des services à valeur ajoutée fondamentaux d\'un IPBX d\'entreprise. Elle permet à un correspondant de laisser un message audio enregistré en cas d\'absence ou d\'occupation de la ligne.</p>',
        '<div class="card">',
        '  <h4>Déclaration des Boîtes Vocales dans voicemail.conf</h4>',
        '  <p>Les boîtes vocales sont organisées par contextes (ex: <code>[default]</code> ou <code>[work]</code>) avec la syntaxe suivante :</p>',
        '  <pre><code>[work]\n706438029 => 8190,Pape Moussa SONKO,assoum1024@gmail.com,,attach=yes</code></pre>',
        '  <ul>',
        '    <li><code>706438029 :</code> Numéro d\'extension de la boîte vocale.</li>',
        '    <li><code>8190 :</code> Code PIN secret à 4 chiffres exigé lors de la consultation téléphonique via <code>VoiceMailMain()</code>.</li>',
        '    <li><code>Pape Moussa SONKO :</code> Nom du propriétaire de la boîte vocale.</li>',
        '    <li><code>assoum1024@gmail.com :</code> Adresse électronique de notification recevant automatiquement le fichier audio du message enregistré en pièce jointe WAV (si <code>attach=yes</code>).</li>',
        '  </ul>',
        '</div>',
        '<div class="card">',
        '  <h4>Fichiers Sonores &amp; Paramétrage des Softphones Clients (3CXPhone, Linphone, Zoiper)</h4>',
        '  <p>Par défaut, les invites vocales d\'Asterisk sont diffusées en langue anglaise. Pour basculer en français :</p>',
        '  <ul>',
        '    <li>Installer les packs sonores français dans le répertoire <code>/usr/share/asterisk/sounds/fr/</code>.</li>',
        '    <li>Ajouter la directive <code>language=fr</code> dans la section <code>[general]</code> de <code>sip.conf</code>.</li>',
        '    <li>Sur le client softphone (ex: 3CXPhone), configurer : l\'adresse IP du serveur Asterisk (PBX / SIP Server), l\'extension (ex: 706438029), le nom d\'utilisateur (moussa) et le secret. Dès que le statut affiche <strong>On Hook</strong>, le téléphone est enregistré et opérationnel pour émettre et recevoir des appels.</li>',
        '  </ul>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie : Déploiement & Recette d’un Serveur Asterisk',
  method: [
    'Sauvegarder les fichiers originaux : créer systématiquement des copies de sauvegarde (.bkp) des fichiers sip.conf, extensions.conf et voicemail.conf avant modification.',
    'Déclarer les profils utilisateurs : définir les extensions dans sip.conf avec type=friend, host=dynamic, secret robuste et dtmfmode=rfc2833.',
    'Configurer la messagerie vocale : associer une boîte vocale par poste dans voicemail.conf avec code PIN à 4 chiffres et notification email.',
    'Tester l\'enregistrement et l\'état des pairs : vérifier dans la console CLI Asterisk (sip show peers) l\'adresse IP de contact et la latence du terminal.',
    'Valider la communication de bout en bout : émettre un appel entre deux softphones, vérifier la sonnerie, le décroché, la clarté acoustique et la bascule sur messagerie.'
  ],

  summary: [
    'Asterisk est un IPBX logiciel modulaire open source articulé autour d\'un cœur de commutation, de pilotes de canaux (chan_sip, chan_pjsip, chan_iax2) et d\'un dialplan.',
    'Les fichiers de configuration résident dans /etc/asterisk/, notamment sip.conf (postes SIP), extensions.conf (logique d\'appel) et voicemail.conf (boîtes vocales).',
    'La directive type=friend autorise un compte SIP à la fois à émettre et recevoir des communications, tandis que host=dynamic exige une requête REGISTER préalable.',
    'La directive dtmfmode=rfc2833 transporte les touches du clavier téléphonique sous forme d\'événements RTP hors-bande insensibles à la compression audio.',
    'L\'application de messagerie voicemail.conf permet la consultation sécurisée par code PIN (VoiceMailMain) et l\'envoi automatique des enregistrements par email.'
  ],

  checklist: [
    'Savez-vous accéder à la console interactive d\'Asterisk avec la commande asterisk -rvvv ?',
    'Comprenez-vous la différence entre type=friend, type=peer et type=user dans sip.conf ?',
    'Pourquoi la directive host=dynamic est-elle indispensable pour les postes de travail nomades et les softphones ?',
    'Comment configure-t-on une boîte vocale avec notification email dans voicemail.conf ?',
    'Savez-vous diagnostiquer l\'enregistrement d\'un téléphone avec la commande sip show peers dans la console Asterisk ?'
  ],

  notions: [
    { term: 'IPBX', def: 'Private Automatic Branch eXchange IP : commutateur téléphonique privé d\'entreprise routant les appels sur réseau informatique.' },
    { term: 'chan_sip / chan_pjsip', def: 'Modules d\'Asterisk assurant la prise en charge de la pile protocolaire SIP.' },
    { term: 'type=friend', def: 'Type de compte SIP permettant au poste d\'émettre et de recevoir des appels en interne.' },
    { term: 'host=dynamic', def: 'Configuration d\'un compte SIP dont l\'IP est apprise dynamiquement lors de la réception d\'un paquet REGISTER.' },
    { term: 'dtmfmode=rfc2833', def: 'Mode d\'acheminement des touches téléphoniques DTMF dans des paquets RTP distincts pour éviter leur déformation.' },
    { term: 'Softphone', def: 'Logiciel émulant un combiné téléphonique sur un ordinateur ou smartphone (ex: 3CXPhone, Linphone, Zoiper).' }
  ],

  pitfalls: [
    'Utiliser des mots de passe SIP triviaux identiques au numéro de poste (ex: secret=101 pour [101]) : cible n°1 des robots de piratage téléphonique.',
    'Oublier de recharger la configuration dans la console Asterisk (sip reload ou dialplan reload) après avoir édité un fichier de configuration.',
    'Ne pas attribuer les droits de lecture au groupe asterisk sur les fichiers sonores personnalisés dans /usr/share/asterisk/sounds/.',
    'Oublier la directive dtmfmode=rfc2833, provoquant l\'impossibilité pour les utilisateurs d\'interagir avec les menus vocaux et répondeurs.'
  ],

  questions: [
    {
      stem: 'Dans le fichier de configuration /etc/asterisk/sip.conf, quelle valeur de la directive type permet à un poste d\'émettre ET de recevoir des communications téléphoniques ?',
      opts: ['type=peer', 'type=user', 'type=friend', 'type=trunk'],
      correct: 2,
      exp: 'type=friend combine les prérogatives de peer (émission) et user (réception), permettant les communications bidirectionnelles au sein de l\'entreprise.'
    },
    {
      stem: 'Quelle commande CLI permet de se connecter à la console interactive d\'un serveur Asterisk en cours d\'exécution avec un niveau de verbosité élevé ?',
      opts: ['asterisk -start', 'asterisk -rvvv', 'service asterisk debug', 'asterisk --console-only'],
      correct: 1,
      exp: 'La commande asterisk -r (reconnect) associée à -vvv (très verbeux) connecte l\'administrateur au démon Asterisk avec affichage temps réel des événements.'
    },
    {
      stem: 'Que signifie la directive host=dynamic dans la déclaration d\'un compte utilisateur SIP dans Asterisk ?',
      opts: ['L\'adresse IP du poste change toutes les minutes', 'Le poste utilise DHCP sur le LAN', 'L\'adresse IP du poste n\'est pas pré-configurée : Asterisk enregistre l\'adresse IP transmise par le client lors de sa requête REGISTER', 'Le poste est connecté en fibre optique'],
      correct: 2,
      exp: 'host=dynamic indique qu\'Asterisk doit mémoriser l\'adresse IP et le port transmis lors de l\'enregistrement périodique SIP REGISTER du softphone.'
    },
    {
      stem: 'Dans quel répertoire standard du système Linux sont stockés l\'ensemble des fichiers de configuration d\'un serveur Asterisk ?',
      opts: ['/var/lib/asterisk/', '/etc/asterisk/', '/usr/share/asterisk/', '/etc/telephony/'],
      correct: 1,
      exp: 'L\'intégralité des fichiers de configuration (.conf) d\'Asterisk réside sous /etc/asterisk/.'
    },
    {
      stem: 'Pourquoi est-il impératif de configurer la directive dtmfmode=rfc2833 sur les comptes SIP Asterisk ?',
      opts: ['Pour chiffrer les communications en AES-256', 'Pour transmettre les touches DTMF dans des trames RTP distinctes afin qu\'elles ne soient pas altérées par les algorithmes de compression vocale', 'Pour interdire les appels vers les numéros surtaxés', 'Pour activer la vidéo HD'],
      correct: 1,
      exp: 'Les codecs vocaux compressent la voix mais déforment les tonalités acoustiques DTMF. La norme RFC 2833 transmet les touches dans des paquets d\'événements RTP dédiés.'
    },
    {
      stem: 'Dans le fichier voicemail.conf, quelle information précède immédiatement la virgule et le nom de l\'utilisateur sur la ligne de déclaration d\'une boîte vocale ?',
      opts: ['L\'adresse email', 'Le code PIN secret d\'accès', 'Le numéro de fax', 'Le type de combiné'],
      correct: 1,
      exp: 'La syntaxe est : mailbox => pin,nom,email (ex: 706438029 => 8190,Pape Moussa SONKO,assoum1024@gmail.com).'
    },
    {
      stem: 'Quelle commande CLI Asterisk permet d\'afficher en temps réel la liste de tous les postes SIP configurés ainsi que leur état d\'enregistrement et leur adresse IP ?',
      opts: ['sip show peers', 'sip show users', 'asterisk list all', 'show channels'],
      correct: 0,
      exp: 'sip show peers liste l\'ensemble des pairs déclarés, leur adresse IP de contact actuelle, leur statut (OK, UNREACHABLE, LAGGED) et leur latence.'
    },
    {
      stem: 'Quelle pile SIP moderne a été intégrée dans les versions récentes d\'Asterisk pour remplacer le pilote historique chan_sip ?',
      opts: ['chan_h323', 'chan_skinny', 'chan_pjsip', 'chan_mgcp'],
      correct: 2,
      exp: 'chan_pjsip est le pilote moderne d\'Asterisk basé sur la bibliothèque PJSIP, offrant une architecture multi-threads plus modulaire et performante.'
    }
  ],

  flashcards: [
    {
      q: 'Qu\'est-ce qu\'Asterisk ?',
      a: 'Un commutateur téléphonique logiciel (IPBX / PABX) open source sous Linux gérant la voix sur IP, le RTC, les conférences et les répondeurs.'
    },
    {
      q: 'Dans quel dossier résident les fichiers de configuration d\'Asterisk ?',
      a: 'Dans le répertoire /etc/asterisk/ (sip.conf, extensions.conf, voicemail.conf, etc.).'
    },
    {
      q: 'Que fait la directive type=friend dans sip.conf ?',
      a: 'Elle permet au compte utilisateur d\'émettre et de recevoir des appels téléphoniques en interne.'
    },
    {
      q: 'Pourquoi utilise-t-on host=dynamic dans la déclaration d\'un poste SIP ?',
      a: 'Pour permettre aux softphones et téléphones mobiles d\'enregistrer dynamiquement leur adresse IP via des requêtes SIP REGISTER.'
    },
    {
      q: 'À quoi sert la directive dtmfmode=rfc2833 ?',
      a: 'Elle transporte les touches du clavier téléphonique sous forme d\'événements RTP dédiés, évitant leur distorsion par la compression vocale.'
    },
    {
      q: 'Quelle commande CLI Asterisk affiche l\'état des téléphones SIP connectés ?',
      a: 'La commande sip show peers (affiche les adresses IP, ports et statuts de joignabilité).'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Architecture Asterisk et paramètres sip.conf incertains. Relisez les sections et refaites le QCM.' },
    { cls: 'mid', text: 'Score 60-74 % : Notions de base comprises. Entraînez-vous à déclarer des comptes et boîtes vocales dans les ateliers.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise pratique. Approfondissez les commandes CLI de diagnostic et les options de voicemail.conf.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez le déploiement d\'Asterisk et l\'administration des postes SIP.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'administrateur ToIP. Prêt pour la programmation avancée du Dialplan du Module 4 !' }
  ]
};
