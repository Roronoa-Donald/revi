/**
 * Module 2 — Protocoles de Signalisation & Médias (SIP, SDP, RTP)
 * Cours « Téléphonie VoIP B3 »
 */
'use strict';

module.exports = {
  n: 2,
  title: 'Protocoles de Signalisation & Médias (SIP, SDP, RTP)',
  short: 'SIP, SDP & RTP',
  toc: 'Architecture et messages du protocole SIP (RFC 3261), entités UAC/UAS, serveurs proxy et registrar, négociation multimédia avec SDP (RFC 4566), transport temps réel avec RTP et RTCP (RFC 3550), horodatage et calcul mathématique de la gigue inter-paquets.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Des anomalies intermittentes surviennent sur le réseau ToIP de l\'entreprise : des utilisateurs signalent des appels qui sonnent dans le vide, ' +
    'des communications silencieuses dans un seul sens (One-Way Audio) et une voix robotique lors des heures de pointe. ' +
    'En tant qu\'ingénieur VoIP, vous êtes chargé d\'analyser les captures réseau Wireshark et sngrep : vous devez inspecter la signalisation SIP (RFC 3261), ' +
    'décortiquer la négociation de médias SDP (RFC 4566) pour identifier les désaccords de codecs et de ports, et analyser les flux RTP/RTCP (RFC 3550) ' +
    'afin de calculer précisément la gigue inter-paquets et éliminer les pertes de trames.',

  objectives: [
    'Maîtriser l\'architecture client-serveur du protocole SIP (RFC 3261), les rôles UAC/UAS, serveurs proxy et registrar, ainsi que les méthodes fondamentales (INVITE, ACK, BYE, CANCEL, REGISTER, OPTIONS).',
    'Interpréter les codes d\'état SIP (classes 1xx, 2xx, 3xx, 4xx, 5xx, 6xx) et diagnostiquer les échecs de signalisation d\'appels.',
    'Analyser la structure des messages SDP (RFC 4566) décrivant les flux médias : adresses IP de connexion (c=), ports UDP et profil de codecs (m=audio, a=rtpmap).',
    'Comprendre le transport temps réel par RTP et RTCP (RFC 3550) : rôle des numéros de séquence, calcul des timestamps et formule de gigue inter-paquets.'
  ],

  sections: [
    {
      title: 'Le Protocole SIP (Session Initiation Protocol, RFC 3261)',
      html: [
        '<p>Normalisé par l\'IETF dans la <strong>RFC 3261</strong>, le protocole <strong>SIP (Session Initiation Protocol)</strong> est le protocole de signalisation universel de la téléphonie sur IP. Inspiré directement d\'HTTP et de SMTP, il s\'agit d\'un protocole en mode texte basé sur une architecture transactionnelle client-serveur.</p>',
        '<p>SIP ne transporte jamais lui-même la voix ni la vidéo : son rôle exclusif consiste à <strong>initialiser</strong>, <strong>modifier</strong> et <strong>terminer</strong> les sessions multimédias bidirectionnelles entre deux ou plusieurs participants.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Entités Fondamentales du Réseau SIP</h4>',
        '    <ul>',
        '      <li><strong>User Agent (UA) :</strong> Terminal terminal d\'extrémité (poste IP ou softphone). Il se compose d\'un <em>UAC (User Agent Client)</em> qui émet les requêtes et d\'un <em>UAS (User Agent Server)</em> qui y répond.</li>',
        '      <li><strong>Serveur Proxy :</strong> Routeur applicatif SIP qui achemine les requêtes d\'appel vers la localisation actuelle du destinataire.</li>',
        '      <li><strong>Serveur Registrar :</strong> Serveur de localisation recevant les requêtes <code>REGISTER</code> des terminaux pour associer leur URI logique (AOR) à leur adresse IP dynamique temporaire.</li>',
        '      <li><strong>Redirect Server :</strong> Serveur informant le client de la nouvelle adresse à joindre sans relayer lui-même la communication.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les Méthodes (Verbes) SIP Fondamentales</h4>',
        '    <ul>',
        '      <li><code>INVITE</code> : Demande d\'établissement de session avec proposition de médias SDP.</li>',
        '      <li><code>ACK</code> : Accusé de réception final confirmant la réponse à un INVITE.</li>',
        '      <li><code>BYE</code> : Raccrochage mettant fin à une session établie.</li>',
        '      <li><code>CANCEL</code> : Annule un appel en cours d\'établissement avant que le correspondant n\'ait décroché.</li>',
        '      <li><code>REGISTER</code> : Enregistre l\'adresse de contact d\'un utilisateur auprès du Registrar.</li>',
        '      <li><code>OPTIONS</code> : Sonde les capacités techniques et la disponibilité d\'un équipement.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<div class="card">',
        '  <h4>Familles de Codes de Réponse SIP</h4>',
        '  <p>Les codes de réponse SIP reprennent la structure d\'HTTP sur trois chiffres décimaux :</p>',
        '  <ul>',
        '    <li><strong>1xx (Provisoire / En cours) :</strong> <code>100 Trying</code> (serveur traite la requête), <code>180 Ringing</code> (le combiné sonne), <code>183 Session Progress</code> (sonnerie précoce ou tonalité réseau).</li>',
        '    <li><strong>2xx (Succès final) :</strong> <code>200 OK</code> (la requête a réussi, le correspondant a décroché ou l\'enregistrement est validé).</li>',
        '    <li><strong>3xx (Redirection) :</strong> <code>301 Moved Permanently</code>, <code>302 Moved Temporarily</code>.</li>',
        '    <li><strong>4xx (Erreur Client) :</strong> <code>401 Unauthorized</code> (mot de passe exigé), <code>403 Forbidden</code>, <code>404 Not Found</code> (numéro inconnu), <code>486 Busy Here</code> (occupé).</li>',
        '    <li><strong>5xx (Erreur Serveur) :</strong> <code>500 Server Internal Error</code>, <code>503 Service Unavailable</code> (IPBX surchargé).</li>',
        '    <li><strong>6xx (Échec Global) :</strong> <code>600 Busy Everywhere</code>, <code>603 Decline</code> (appel explicitement rejeté).</li>',
        '  </ul>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Négociation de Session avec SDP (Session Description Protocol, RFC 4566)',
      html: [
        '<p>Pour que deux téléphones IP puissent communiquer, ils doivent s\'accorder sur les caractéristiques du flux voix : adresse IP de réception, port d\'écoute, codecs acceptés et paramètres temporels. Cette négociation est assurée par le protocole <strong>SDP (RFC 4566)</strong>, transporté dans le corps (body) des messages SIP <code>INVITE</code> et <code>200 OK</code> sous le type MIME <code>application/sdp</code>.</p>',
        '<div class="card">',
        '  <h4>Structure d\'un Message SDP Standard</h4>',
        '  <pre><code>v=0\no=Alice 2890844526 2890844526 IN IP4 192.168.1.50\ns=-\nc=IN IP4 192.168.1.50\nt=0 0\nm=audio 16384 RTP/AVP 8 0 101\na=rtpmap:8 PCMA/8000\na=rtpmap:0 PCMU/8000\na=rtpmap:101 telephone-event/8000\na=sendrecv</code></pre>',
        '  <p>Décryptage ligne par ligne des directives clés :</p>',
        '  <ul>',
        '    <li><code>c=IN IP4 &lt;IP&gt;</code> : Déclare l\'adresse IP de réception du flux média audio (Connection Data).</li>',
        '    <li><code>m=audio &lt;port&gt; RTP/AVP &lt;pt1 pt2...&gt;</code> : Déclare le flux média audio, le port UDP d\'écoute (ex: 16384), le protocole de transport (RTP/AVP) et les types de charges utiles acceptés par ordre de préférence.</li>',
        '    <li><code>a=rtpmap:&lt;pt&gt; &lt;codec&gt;/&lt;rate&gt;</code> : Associe un numéro de charge utile à un algorithme de compression (ex: <code>8 -> PCMA/8000</code> pour G.711 A-law, <code>101 -> telephone-event/8000</code> pour les touches DTMF).</li>',
        '    <li><code>a=sendrecv / sendonly / recvonly / inactive</code> : Définit la directionnalité du flux (bidirectionnel normal, mise en attente musicale ou silence).</li>',
        '  </ul>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Transport Temps Réel avec RTP & RTCP (RFC 3550)',
      html: [
        '<p>Une fois la signalisation SIP et la négociation SDP achevées, le flux audio réel ne passe plus par le serveur SIP (sauf relais NAT ou passerelle). Il circule directement de poste à poste (Peer-to-Peer) en utilisant le protocole <strong>RTP (Real-time Transport Protocol, RFC 3550)</strong> au-dessus d\'UDP.</p>',
        '<div class="card">',
        '  <h4>Structure de l\'En-tête RTP (12 octets fixes)</h4>',
        '  <p>L\'en-tête RTP apporte les métadonnées indispensables pour compenser les aléas du réseau IP :</p>',
        '  <ul>',
        '    <li><strong>Sequence Number (16 bits) :</strong> Compteur incrémenté de 1 à chaque paquet envoyé. Il permet au récepteur de réordonner les paquets arrivés dans le désordre et de détecter les paquets perdus.</li>',
        '    <li><strong>Timestamp (32 bits) :</strong> Horodatage exprimé en ticks d\'horloge d\'échantillonnage (pour du G.711 à 8 kHz, 20 ms de voix correspondent à un incrément exact de <code>8 000 * 0.02 = 160 ticks</code>). Il permet au buffer de gigue (Jitter Buffer) de restituer le signal à un rythme acoustique régulier.</li>',
        '    <li><strong>SSRC (Synchronization Source, 32 bits) :</strong> Identifiant aléatoire unique de la source émettrice pour distinguer plusieurs flux mélangés sur un même port.</li>',
        '  </ul>',
        '</div>',
        '<div class="card">',
        '  <h4>Le Protocole de Supervision RTCP &amp; Calcul de la Gigue (Jitter)</h4>',
        '  <p>Le protocole <strong>RTCP (RTP Control Protocol)</strong> fonctionne en tandem avec RTP (sur le port UDP immédiatement supérieur impair, ex: port 16385 pour RTP 16384). Il échange périodiquement des paquets de diagnostic (Sender Reports / Receiver Reports) informant sur le nombre de paquets perdus, le délai d\'aller-retour (RTT) et la <strong>gigue (Jitter)</strong>.</p>',
        '  <p>Selon l\'algorithme normalisé de la RFC 3550, la gigue inter-paquets <code>J</code> est calculée à partir de la variation de temps de transit relatif <code>D</code> entre deux paquets consécutifs :</p>',
        '  <pre><code>D_i = (R_i - S_i) - (R_{i-1} - S_{i-1})\nJ_i = J_{i-1} + (|D_i| - J_{i-1}) / 16.0</code></pre>',
        '  <p>Ce filtre passe-bas permet d\'adapter dynamiquement la taille du tampon de gigue (Jitter Buffer) du terminal pour éliminer les micro-saccades sans introduire de latence excessive.</p>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie : Diagnostic des Protocoles SIP & Médias',
  method: [
    'Capturer et analyser les trames SIP : utiliser Wireshark / sngrep pour isoler les requêtes INVITE, vérifier la présence des en-têtes obligatoires (Call-ID, CSeq, From, To, Contact).',
    'Auditer le corps SDP : vérifier la concordance de l\'adresse IP déclarée (c=) avec l\'adresse réelle et valider la liste des codecs supportés (m=audio, a=rtpmap).',
    'Contrôler le flux RTP : vérifier la symétrie des ports UDP négociés et surveiller l\'incrémentation continue du Sequence Number et du Timestamp.',
    'Mesurer les métriques RTCP : extraire la gigue inter-paquets et les pertes cumulées pour ajuster les politiques de qualité de service (QoS).'
  ],

  summary: [
    'SIP (RFC 3261) est le protocole de signalisation en mode texte contrôlant l\'établissement, la modification et la rupture des sessions multimédias.',
    'Les terminaux User Agents (UAC/UAS) s\'enregistrent auprès du Registrar (REGISTER) et communiquent via des serveurs Proxies en relayant requêtes et réponses numérotées (1xx à 6xx).',
    'SDP (RFC 4566) décrit les flux médias au sein des corps de messages SIP : adresses IP (c=), ports d\'écoute et codecs acceptés (m=audio, a=rtpmap).',
    'RTP (RFC 3550) transporte la voix numérisée sur UDP de terminal à terminal, avec numéros de séquence pour le réordonnancement et timestamps pour la restitution acoustique.',
    'RTCP surveille la qualité de la liaison sur un port UDP impair associé, fournissant les métriques de RTT, pertes de paquets et gigue RFC 3550.'
  ],

  checklist: [
    'Savez-vous expliquer la différence de rôle entre SIP, SDP et RTP dans une communication ToIP ?',
    'Connaissez-vous les 6 méthodes SIP fondamentales (INVITE, ACK, BYE, CANCEL, REGISTER, OPTIONS) ?',
    'Pouvez-vous citer la signification des codes de réponse SIP 180 Ringing, 200 OK, 401 Unauthorized et 486 Busy ?',
    'Savez-vous décoder une ligne SDP telle que m=audio 16384 RTP/AVP 8 101 ?',
    'Comment l\'en-tête RTP à 12 octets permet-il de détecter les paquets perdus et de compenser la gigue réseau ?'
  ],

  notions: [
    { term: 'SIP (RFC 3261)', def: 'Protocole de signalisation textuel régissant l\'initiation, la modification et la libération des sessions multimédias.' },
    { term: 'SDP (RFC 4566)', def: 'Protocole de description de session négociant les adresses IP, ports RTP et formats de codecs audio.' },
    { term: 'RTP (RFC 3550)', def: 'Protocole de transport temps réel délivrant la voix sur UDP avec horodatage et séquencement.' },
    { term: 'RTCP', def: 'Protocole de contrôle RTP échangeant des statistiques de transmission (pertes, gigue, latence RTT).' },
    { term: 'Gigue (Jitter)', def: 'Variation temporelle indésirable du délai de transmission entre paquets consécutifs d\'un même flux.' },
    { term: 'Jitter Buffer', def: 'Mémoire tampon sur le terminal de réception régularisant le flux audio pour restituer un son continu.' }
  ],

  pitfalls: [
    'Croire que le serveur SIP proxy achemine la voix : le flux voix RTP circule directement de poste à poste sans transiter par le proxy (hors NAT ou serveur d\'enregistrement d\'appels).',
    'Confondre la méthode CANCEL (annule un appel avant décroché) et la méthode BYE (met fin à un appel déjà établi après 200 OK).',
    'Oublier d\'autoriser la plage de ports dynamiques RTP (ex: 10000-20000/UDP) sur les pare-feux, causant des communications silencieuses (One-Way Audio ou Dead Air).',
    'Négliger l\'attribut telephone-event/8000 dans le SDP, provoquant l\'échec de transmission des touches DTMF dans les répondeurs et SVI.'
  ],

  questions: [
    {
      stem: 'Quel protocole est responsable de la description des paramètres multimédias (codecs audio, adresses IP et ports) échangés dans le corps d\'un message SIP INVITE ?',
      opts: ['RTP', 'RTCP', 'SDP', 'DNS'],
      correct: 2,
      exp: 'SDP (Session Description Protocol, RFC 4566) transporte la négociation des capacités médias dans le corps des requêtes et réponses SIP.'
    },
    {
      stem: 'Quelle méthode SIP est utilisée par un terminal pour notifier périodiquement le serveur Registrar de son adresse IP et de son port d\'écoute ?',
      opts: ['INVITE', 'REGISTER', 'SUBSCRIBE', 'NOTIFY'],
      correct: 1,
      exp: 'La méthode REGISTER permet à l\'User Agent d\'enregistrer son adresse de contact dynamique auprès de la table de localisation du Registrar.'
    },
    {
      stem: 'Dans le protocole SIP, à quelle catégorie de réponse appartient le code d\'état 180 Ringing ?',
      opts: ['Réponse définitive de succès', 'Réponse provisoire', 'Erreur client', 'Redirection'],
      correct: 1,
      exp: 'Les codes 1xx sont des réponses informatives provisoires indiquant que le traitement est en cours (ici, le poste distant sonne).'
    },
    {
      stem: 'Quelle information contenue dans l\'en-tête fixe de 12 octets du protocole RTP permet au récepteur de reconstituer l\'ordre exact des paquets audio arrivés désordonnés ?',
      opts: ['Le champ Version', 'Le champ Payload Type', 'Le champ Sequence Number', 'Le champ SSRC'],
      correct: 2,
      exp: 'Le numéro de séquence (Sequence Number sur 16 bits), incrémenté de 1 par paquet, permet au récepteur de réordonner les trames audio et de détecter les pertes.'
    },
    {
      stem: 'Sur quel port UDP le protocole de supervision RTCP émet-il ses rapports de diagnostic si le flux audio RTP utilise le port 10000/UDP ?',
      opts: ['Port 5060', 'Port 10000', 'Port 10001', 'Port 20000'],
      correct: 2,
      exp: 'Par convention RFC 3550, RTP utilise un port UDP pair (ex: 10000), et RTCP utilise le port impair immédiatement consécutif (10001/UDP).'
    },
    {
      stem: 'Dans une négociation SDP, que signifie la directive m=audio 16384 RTP/AVP 8 ?',
      opts: ['L\'audio est diffusé en multicast', 'Le terminal recevra le flux voix sur le port 16384/UDP avec le codec PCMA (G.711 A-law)', 'L\'audio est chiffré avec une clé RSA 16384 bits', 'Le fichier audio pèse 16 384 octets'],
      correct: 1,
      exp: 'La ligne m=audio spécifie le port UDP de réception (16384), le profil de transport RTP/AVP et le type de charge utile 8 (correspondant à PCMA / G.711 A-law).'
    },
    {
      stem: 'Quelle méthode SIP permet à un appelant d\'annuler une tentative d\'appel en cours alors que le destinataire n\'a pas encore décroché (avant l\'émission du 200 OK) ?',
      opts: ['BYE', 'CANCEL', 'HANGUP', 'DISCONNECT'],
      correct: 1,
      exp: 'La méthode CANCEL interrompt un appel en cours d\'établissement. La méthode BYE ne peut être émise que pour terminer une session déjà établie après 200 OK.'
    },
    {
      stem: 'Quelle formule caractérise le calcul de la gigue (Jitter RFC 3550) lissée à partir de la différence de transit relative Di entre deux paquets ?',
      opts: ['Ji = |Di|', 'Ji = Ji-1 + (|Di| - Ji-1) / 16', 'Ji = (Di + Ji-1) / 2', 'Ji = Di * 1000 / 8000'],
      correct: 1,
      exp: 'La RFC 3550 définit un filtre passe-bas du 1er ordre avec coefficient 1/16 : Ji = Ji-1 + (|Di| - Ji-1) / 16.0.'
    }
  ],

  flashcards: [
    {
      q: 'Quel est le rôle du protocole SIP (RFC 3261) ?',
      a: 'Protocole en mode texte gérant l\'établissement, la modification et la clôture des sessions multimédias (sans transporter la voix).'
    },
    {
      q: 'Quelle est la différence entre un UAC et un UAS dans SIP ?',
      a: 'L\'UAC (User Agent Client) émet les requêtes d\'appel, l\'UAS (User Agent Server) les reçoit et y répond.'
    },
    {
      q: 'Qu\'est-ce que le protocole SDP (RFC 4566) ?',
      a: 'Protocole textuel de description de session négociant les adresses IP médias, ports UDP et codecs audio dans le corps des messages SIP.'
    },
    {
      q: 'Quels champs de l\'en-tête RTP sont essentiels pour la voix ?',
      a: 'Le Sequence Number (16 bits) pour l\'ordre et les pertes, et le Timestamp (32 bits) pour le cadencement de restitution acoustique.'
    },
    {
      q: 'Sur quels ports circulent les flux RTP et RTCP ?',
      a: 'RTP utilise un port UDP pair (ex: 10000), RTCP utilise le port impair immédiatement consécutif (ex: 10001).'
    },
    {
      q: 'Quelle est la différence entre la méthode SIP CANCEL et la méthode BYE ?',
      a: 'CANCEL annule un appel en cours avant décroché ; BYE clôture une session déjà établie après décroché (200 OK).'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions de SIP, SDP et RTP confuses. Relisez le diagramme d\'échange d\'appel et refaites le test.' },
    { cls: 'mid', text: 'Score 60-74 % : Méthodes SIP comprises. Entraînez-vous à décoder les lignes SDP (m=, c=, rtpmap).' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise technique. Approfondissez le calcul de gigue RTP RFC 3550 et le rôle de RTCP.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez la signalisation textuelle et l\'encapsulation des flux multimédias.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte réseaux. Prêt pour l\'administration de l\'IPBX Asterisk du Module 3 !' }
  ]
};
