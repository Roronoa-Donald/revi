/**
 * Module 6 — Fonctions Avancées, Trunks Inter-Sites & Sécurité ToIP
 * Cours « Téléphonie VoIP B3 »
 */
'use strict';

module.exports = {
  n: 6,
  title: 'Fonctions Avancées, Trunks Inter-Sites & Sécurité ToIP',
  short: 'Trunks, ACD & Sécurité',
  toc: 'Gestion des files d\'attente ACD (queues.conf, stratégies ringall, leastrecent, roundrobin), interconnexion d\'IPBX par trunks SIP et IAX2, routage au moindre coût LCR (Least Cost Routing), chiffrement de la signalisation (SIP TLS) et des flux voix (SRTP), détection des attaques brute-force SIP et bannissement dynamique avec Fail2ban.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'L\'entreprise étend ses activités à l\'international, ouvrant un centre de support technique multisite et exposant son infrastructure ToIP sur Internet. ' +
    'Des tentatives répétées d\'intrusion et de piratage téléphonique (Toll Fraud / SIP Vicious) sont détectées sur les ports SIP, ' +
    'tandis que les coûts des communications inter-filiales augmentent fortement. ' +
    'En tant qu\'ingénieur VoIP expert, vous devez relever ces défis stratégiques : configurer des files d\'attente ACD (queues.conf) ' +
    'avec distribution équitable des appels, interconnecter les sites par trunks SIP et IAX2 avec moteur de routage au moindre coût (Least Cost Routing - LCR), ' +
    'chiffrer la signalisation (SIP TLS) et les flux audio (SRTP), et déployer une défense active automatisée avec Fail2ban contre les attaques brute-force.',

  objectives: [
    'Configurer et superviser des files d\'attente ACD dans queues.conf (stratégies ringall, leastrecent, roundrobin, pénalités et timeouts).',
    'Concevoir une architecture multi-sites en interconnectant des IPBX par trunks SIP et IAX2 (évaluation des avantages du protocole IAX2 sur port 4569/UDP).',
    'Mettre en œuvre un moteur de routage au moindre coût LCR (Least Cost Routing) pour optimiser les coûts des communications selon les indicatifs internationaux.',
    'Durcir la sécurité de la plateforme ToIP : chiffrement TLS de la signalisation (port 5061), chiffrement SRTP des médias audio et défense active Fail2ban.'
  ],

  sections: [
    {
      title: 'Centres de Contacts & Files d\'Attente ACD (queues.conf)',
      html: [
        '<p>Pour les services de support technique, les services commerciaux ou les centres de relation client, la simple sonnerie de poste individuel ne suffit pas : les appels entrants doivent être mis en attente avec musique et distribués équitablement aux téléconseillers disponibles via un système <strong>ACD (Automatic Call Distribution)</strong>.</p>',
        '<div class="card">',
        '  <h4>Configuration d\'une File d\'Attente dans /etc/asterisk/queues.conf</h4>',
        '  <pre><code>[support-technique]\nmusicclass=default\nstrategy=leastrecent\ntimeout=15\nretry=2\nwrapuptime=10\nmaxlen=20\nmember => SIP/101\nmember => SIP/102\nmember => SIP/103</code></pre>',
        '  <p>Les stratégies de distribution (<code>strategy</code>) clés sont :</p>',
        '  <ul>',
        '    <li><code>ringall :</code> Fait sonner simultanément tous les postes des agents disponibles jusqu\'à ce que le premier décroche.</li>',
        '    <li><code>leastrecent :</code> Attribue l\'appel à l\'agent disponible dont la dernière communication terminée remonte au plus longtemps, équilibrant parfaitement la charge de travail de l\'équipe.</li>',
        '    <li><code>roundrobin :</code> Distribue les appels à tour de rôle en suivant l\'ordre séquentiel des membres déclarés.</li>',
        '    <li><code>fewestcalls :</code> Sélectionne l\'agent ayant traité le plus petit nombre d\'appels depuis le début de la vacation.</li>',
        '    <li><code>random :</code> Sélectionne un agent au hasard parmi ceux qui sont disponibles.</li>',
        '  </ul>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Interconnexion Multi-Sites : Trunks SIP & IAX2 et Routage LCR',
      html: [
        '<p>Lorsqu\'une entreprise dispose de plusieurs filiales ou sites géographiques distants (ex: Paris, Dakar, New York), les commutateurs IPBX peuvent être interconnectés directement sur le réseau IP sans passer par le réseau téléphonique public commuté, éliminant ainsi les frais de communication inter-sites.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Trunks SIP Inter-Sites</h4>',
        '    <ul>',
        '      <li><strong>Protocole standardisé :</strong> Interopérable avec n\'importe quel équipement tiers ou opérateur télécoms public.</li>',
        '      <li><strong>Deux canaux distincts :</strong> Signalisation sur le port 5060/UDP et flux voix sur une plage de ports UDP dynamiques (10000-20000).</li>',
        '      <li><strong>Complexité pare-feu :</strong> Nécessite l\'ouverture de larges plages de ports et une gestion rigoureuse de la traversée de NAT.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Trunks IAX2 (Inter-Asterisk eXchange)</h4>',
        '    <ul>',
        '      <li><strong>Port unique 4569/UDP :</strong> Multiplexe la signalisation et toutes les communications audio sur un seul port.</li>',
        '      <li><strong>Traversée native du NAT :</strong> Traverse les routeurs et pare-feux sans nécessiter STUN, TURN ou passerelle ALG.</li>',
        '      <li><strong>Agrégation de flux (Trunking) :</strong> Regroupe plusieurs appels dans un seul paquet IP, réduisant drastiquement l\'overhead.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<div class="card">',
        '  <h4>Routage au Moindre Coût (Least Cost Routing - LCR)</h4>',
        '  <p>Le routage <strong>LCR</strong> analyse le préfixe du numéro composé par l\'utilisateur (ex: <code>0033</code> pour la France, <code>00221</code> pour le Sénégal, <code>001</code> pour les USA) et sélectionne dynamiquement parmi plusieurs opérateurs télécoms (Trunks SIP) celui qui propose le tarif à la minute le plus avantageux, réduisant la facture télécoms de l\'entreprise de 30 à 60%.</p>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Sécurité & Durcissement ToIP : TLS, SRTP & Défense Active Fail2ban',
      html: [
        '<p>Un serveur de téléphonie exposé sur Internet ou raccordé au réseau d\'entreprise constitue une cible de choix pour les cybercriminels : piratage de lignes pour émettre des appels frauduleux vers des numéros surtaxés à l\'international (phénomène de <em>Toll Fraud</em>), écoute illégale des conversations et attaques par déni de service.</p>',
        '<div class="card">',
        '  <h4>Chiffrement de Bout en Bout : SIP TLS &amp; SRTP</h4>',
        '  <ul>',
        '    <li><strong>Chiffrement de la signalisation (SIPS / TLS sur port 5061/TCP) :</strong> Sécurise les échanges d\'identifiants, mots de passe et métadonnées d\'appels par certificats X.509, empêchant toute interception par écoute passive (sniffing).</li>',
        '    <li><strong>Chiffrement des flux voix (SRTP - RFC 3711) :</strong> Chiffre la charge utile des paquets audio en temps réel à l\'aide de clés symétriques AES (typiquement AES-128-CM), rendant toute capture Wireshark inaudible.</li>',
        '  </ul>',
        '</div>',
        '<div class="card">',
        '  <h4>Défense Active contre les Attaques Brute-Force avec Fail2ban</h4>',
        '  <p>Les outils automatisés de scan (tels que <em>sipvicious</em> / <em>svwar</em>) bombardent continuellement le port 5060/UDP de requêtes d\'enregistrement pour deviner les mots de passe des comptes SIP. Asterisk consigne ces échecs dans ses journaux avec les codes <code>401 Unauthorized</code> ou <code>403 Forbidden</code>.</p>',
        '  <p>L\'outil de sécurité <strong>Fail2ban</strong> surveille en temps réel le fichier <code>/var/log/asterisk/messages</code> :</p>',
        '  <ul>',
        '    <li>Dès qu\'une adresse IP source cumule un nombre d\'échecs dépassant le seuil (ex: <code>maxretry = 3</code>), Fail2ban génère automatiquement une règle pare-feu <code>iptables</code> bloquant l\'IP attaquante :</li>',
        '  </ul>',
        '  <pre><code>iptables -I INPUT -s &lt;IP_ATTAQUANTE&gt; -p udp --dport 5060 -j DROP</code></pre>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie : Sécurisation & Optimisation ToIP d’Entreprise',
  method: [
    'Dimensionner et ordonnancer les files ACD : choisir la stratégie de distribution (leastrecent pour équité, ringall pour réactivité) avec gestion stricte des wrapuptime et timeouts.',
    'Mettre en œuvre le routage LCR : concevoir les règles de préfixes dans le Dialplan pour aiguiller les appels sortants vers les trunks les plus économiques.',
    'Activer le chiffrement SIPS et SRTP : bannir la signalisation SIP en clair sur Internet, imposer TLS 5061 et activer le chiffrement SRTP des flux audio.',
    'Automatiser le bannissement avec Fail2ban : configurer la prison asterisk dans Fail2ban avec filtres regex sur les rejets 401/403 et seuil de réessais strict.'
  ],

  summary: [
    'Les files d\'attente ACD (queues.conf) distribuent les flux entrants selon des stratégies adaptées : ringall, leastrecent, roundrobin ou fewestcalls.',
    'Les trunks IAX2 multiplexent signalisation et voix sur le port 4569/UDP unique, offrant une traversée de NAT et une économie de bande passante idéales inter-sites.',
    'Le routage au moindre coût (LCR) compare les tarifs à la minute selon le préfixe composé et optimise automatiquement la facture télécoms de l\'entreprise.',
    'La sécurité ToIP repose sur le chiffrement SIPS (TLS 5061) et SRTP (AES-128), interdisant l\'écoute passive des conversations sur le réseau.',
    'La protection active contre les attaques brute-force associe la détection des échecs 401/403 dans les logs Asterisk au bannissement iptables par Fail2ban.'
  ],

  checklist: [
    'Quelle est la différence opérationnelle entre les stratégies de file d\'attente ringall et leastrecent ?',
    'Pourquoi le protocole IAX2 est-il supérieur au protocole SIP pour interconnecter deux serveurs Asterisk distants à travers le NAT ?',
    'Comment fonctionne le moteur de routage LCR et sur quel critère sélectionne-t-il le trunk sortant ?',
    'Quels protocoles assurent respectivement le chiffrement de la signalisation et le chiffrement de la voix en ToIP ?',
    'Comment Fail2ban protège-t-il un IPBX Asterisk contre les attaques de type scan SIP (sipvicious) ?'
  ],

  notions: [
    { term: 'ACD', def: 'Automatic Call Distribution : système de distribution automatique et équitable des appels entrants aux agents disponibles.' },
    { term: 'Trunk IAX2', def: 'Liaison inter-IPBX propriétaire Asterisk multiplexant voix et signalisation sur le port unique 4569/UDP.' },
    { term: 'LCR (Least Cost Routing)', def: 'Algorithme d\'aiguillage dynamique choisissant le trunk opérateur le moins cher selon le préfixe du numéro.' },
    { term: 'SRTP (RFC 3711)', def: 'Secure Real-time Transport Protocol : protocole chiffrant la charge utile des paquets voix avec l\'algorithme AES.' },
    { term: 'Toll Fraud', def: 'Piratage de commutateurs téléphoniques pour émettre massivement des appels frauduleux vers des numéros surtaxés.' },
    { term: 'Fail2ban', def: 'Démon de sécurité analysant les journaux applicatifs pour bannir automatiquement les IPs suspectes via iptables.' }
  ],

  pitfalls: [
    'Laisser le contexte par défaut [default] accessible aux appels anonymes (allowguest=yes), permettant aux pirates d\'utiliser l\'IPBX comme passerelle de piratage international.',
    'Oublier de configurer un mot de passe complexe pour les trunks IAX2 ou SIP inter-sites.',
    'Ne pas activer de délai de repos (wrapuptime) entre deux appels dans les files d\'attente ACD, épuisant les agents du centre d\'appels.',
    'Activer SRTP sans chiffrement préalable de la signalisation (SIP TLS) : les clés de chiffrement circulant en clair dans le SDP, la protection devient totalement caduque.'
  ],

  questions: [
    {
      stem: 'Dans le fichier queues.conf d\'Asterisk, quelle stratégie de distribution attribue chaque nouvel appel à l\'agent dont la dernière communication terminée est la plus ancienne ?',
      opts: ['ringall', 'leastrecent', 'roundrobin', 'fewestcalls'],
      correct: 1,
      exp: 'leastrecent sélectionne l\'agent ayant eu le plus long temps de repos depuis son dernier appel, garantissant un équilibre parfait de la charge.'
    },
    {
      stem: 'Quel est l\'avantage décisif du protocole IAX2 par rapport au protocole SIP pour interconnecter deux serveurs Asterisk distants à travers des routeurs NAT ?',
      opts: ['IAX2 ne supporte que la vidéo', 'IAX2 transporte à la fois la signalisation et tous les flux voix sur un port UDP unique (4569/UDP)', 'IAX2 nécessite une adresse IP publique statique par téléphone', 'IAX2 est un protocole standard de l\'ITU-T'],
      correct: 1,
      exp: 'IAX2 multiplexe l\'ensemble des canaux de signalisation et de voix sur le port 4569/UDP unique, éliminant totalement les problèmes de traversée de pare-feu et de NAT.'
    },
    {
      stem: 'Quel protocole standardisé assure le chiffrement symétrique en temps réel de la charge utile des paquets audio vocaux contre les écoutes illégales ?',
      opts: ['HTTPS', 'SRTP (Secure RTP)', 'SSH', 'IPsec AH'],
      correct: 1,
      exp: 'SRTP (Secure Real-time Transport Protocol, RFC 3711) chiffre les trames audio en utilisant l\'algorithme AES (typiquement AES-128).'
    },
    {
      stem: 'Sur quel port TCP la signalisation SIPS (SIP over TLS) écoute-t-elle par défaut pour garantir la confidentialité des identifiants et des métadonnées d\'appel ?',
      opts: ['Port 5060/TCP', 'Port 5061/TCP', 'Port 443/TCP', 'Port 8443/TCP'],
      correct: 1,
      exp: 'Par convention IETF RFC 3261, SIP en clair utilise le port 5060 (UDP/TCP), et SIPS sécurisé par TLS utilise le port 5061/TCP.'
    },
    {
      stem: 'Comment appelle-t-on le mécanisme économique qui compare automatiquement les tarifs opérateurs selon le préfixe du numéro composé pour acheminer l\'appel sortant au moindre coût ?',
      opts: ['ACD (Automatic Call Distribution)', 'LCR (Least Cost Routing)', 'STUN (Session Traversal)', 'CTI (Computer Telephony Integration)'],
      correct: 1,
      exp: 'Le routage au moindre coût (Least Cost Routing, LCR) sélectionne dynamiquement le trunk le plus avantageux financièrement selon la destination.'
    },
    {
      stem: 'Quel code de réponse SIP indique un échec d\'authentification par mot de passe et est surveillé par Fail2ban pour détecter les attaques par force brute ?',
      opts: ['100 Trying', '180 Ringing', '200 OK', '401 Unauthorized (ou 403 Forbidden)'],
      correct: 3,
      exp: 'Le code 401 Unauthorized (et 403 Forbidden) signale un échec de mot de passe ; leur répétition anormale depuis une même IP caractérise une attaque brute-force.'
    },
    {
      stem: 'Dans une file d\'attente queues.conf, à quoi sert le paramètre wrapuptime (ex: wrapuptime=15) ?',
      opts: ['À limiter la durée maximale de l\'appel à 15 minutes', 'À accorder un temps de repos de 15 secondes à l\'agent après la fin d\'un appel avant de lui renvoyer un nouvel appel', 'À faire sonner le poste pendant 15 secondes', 'À bloquer la file si plus de 15 personnes attendent'],
      correct: 1,
      exp: 'Le wrapuptime est le délai de grâce (en secondes) alloué à l\'opérateur après un appel pour rédiger ses notes de dossier avant d\'être à nouveau sollicité.'
    },
    {
      stem: 'Pourquoi est-il dangereux de configurer le chiffrement audio SRTP sans chiffrer préalablement la signalisation d\'appel avec SIP TLS ?',
      opts: ['Car les téléphones plantent immédiatement', 'Car les clés symétriques de déchiffrement SRTP sont échangées en clair dans le corps SDP des messages SIP', 'Car le codec G.711 refuse le chiffrement', 'Car la loi interdit le chiffrement partiel'],
      correct: 1,
      exp: 'Dans la négociation SDES, les clés secrètes SRTP transitent en clair dans l\'attribut a=crypto du SDP. Sans TLS, un attaquant capture la clé et déchiffre la voix instantanément.'
    }
  ],

  flashcards: [
    {
      q: 'Qu\'est-ce qu\'un système ACD ?',
      a: 'Automatic Call Distribution : système mettant les appels en file d\'attente et les distribuant aux agents disponibles selon une stratégie programmée.'
    },
    {
      q: 'Quelle est la différence entre ringall et leastrecent dans queues.conf ?',
      a: 'ringall fait sonner tous les agents simultanément ; leastrecent sélectionne l\'agent ayant le plus long temps de repos depuis son dernier appel.'
    },
    {
      q: 'Quel est l\'avantage majeur d\'un trunk IAX2 sur un trunk SIP ?',
      a: 'IAX2 regroupe voix et signalisation sur un port UDP unique (4569), traversant nativement le NAT sans serveur relais ni ouverture de multiples ports.'
    },
    {
      q: 'Qu\'est-ce que le routage LCR (Least Cost Routing) ?',
      a: 'Algorithme sélectionnant le trunk opérateur le moins cher selon le préfixe de destination composé par l\'utilisateur.'
    },
    {
      q: 'Sur quels protocoles repose la sécurité ToIP de bout en bout ?',
      a: 'SIP TLS (port 5061/TCP) pour chiffrer la signalisation et les clés, et SRTP (RFC 3711) pour chiffrer la voix avec AES.'
    },
    {
      q: 'Comment Fail2ban protège-t-il Asterisk contre les cyberattaques ?',
      a: 'Il détecte les échecs d\'authentification répétés (codes 401/403) dans les logs et génère une règle iptables bloquant l\'IP attaquante.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions de trunks, ACD et sécurité ToIP à consolider. Relisez attentivement les sections et refaites le test.' },
    { cls: 'mid', text: 'Score 60-74 % : Principes généraux acquis. Entraînez-vous sur les stratégies de files d\'attente et la configuration IAX2.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise pratique. Approfondissez le routage LCR et la mise en œuvre de Fail2ban.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez le durcissement sécuritaire et les fonctions avancées d\'IPBX d\'entreprise.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte ToIP & Communications Unifiées. Félicitations pour l\'accomplissement du cours !' }
  ]
};
