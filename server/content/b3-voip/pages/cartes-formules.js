/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Téléphonie VoIP B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Téléphonie VoIP B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux de la téléphonie sur IP et des IPBX d\'entreprise : Numérisation vocale et codecs (Nyquist, G.711, G.729, calcul de bande passante, modèle E et score MOS), Protocoles de signalisation et médias (SIP RFC 3261, SDP RFC 4566, paquets RTP/RTCP RFC 3550 et gigue), Déploiement d\'Asterisk (sip.conf, users.conf, voicemail.conf, DTMF RFC 2833), Programmation du Dialplan (extensions.conf, pattern matching, SVI/IVR), Qualité de service et ingénierie de trafic (Erlang B, marquage DSCP EF 46 / CoS 5, Voice VLAN, traversée de NAT STUN/ICE), et Fonctions avancées (files d\'attente ACD, routage LCR, trunks inter-sites et sécurité Fail2ban).</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Téléphonie VoIP B3 : Numérisation, SIP, SDP, RTP, Asterisk, Dialplan, QoS, Erlang B et Sécurité.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento Technique &amp; Guide Opérationnel — Téléphonie VoIP B3</h1>',
    '  <p class="lead">Synthèse condensée des formules d\'ingénierie ToIP, ports standards de téléphonie IP, comparatif des codecs audio, méthodes et codes SIP RFC 3261, directives Asterisk et règles de QoS.</p>',
    '',
    '  <h2>1. Formules Mathématiques de Téléphonie &amp; Théorie du Trafic</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Grandeur / Modèle</th><th>Formule Mathématique</th><th>Définition Opérationnelle</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Trafic Offert A (Erlang)</strong></td><td><code>A = (Appels_par_heure * Durée_sec) / 3600</code></td><td>Intensité de trafic téléphonique sur une heure de pointe.</td></tr>',
    '      <tr><td><strong>Loi d\'Erlang B</strong> (Blocage)</td><td><code>B(k, A) = (A * B(k-1, A)) / (k + A * B(k-1, A))</code></td><td>Probabilité de rejet d\'appel sur un trunk de k canaux sans attente.</td></tr>',
    '      <tr><td><strong>Théorème de Nyquist-Shannon</strong></td><td><code>F_echantillonnage &ge; 2 * F_max</code></td><td>Fréquence minimale de numérisation (8 000 Hz pour voix 300-3400 Hz).</td></tr>',
    '      <tr><td><strong>Débit Réseau par Appel</strong></td><td><code>(Payload_B + 40B) * 8 * (1000 / Ptime_ms)</code></td><td>Bande passante totale incluant en-têtes IP (20B), UDP (8B) et RTP (12B).</td></tr>',
    '      <tr><td><strong>Score MOS (ITU-T G.107)</strong></td><td><code>MOS = 1 + 0.035*R + R*(R-60)*(100-R)*7e-6</code></td><td>Note de qualité subjective d\'écoute (1.0 à 4.5) déduite du facteur R.</td></tr>',
    '      <tr><td><strong>Gigue RTP (RFC 3550)</strong></td><td><code>J_i = J_{i-1} + (|D_i| - J_{i-1}) / 16</code></td><td>Estimation lissée de la variation du délai de transit inter-paquets.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Protocoles &amp; Ports Standards de Téléphonie IP</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Protocole / Service</th><th>Port &amp; Transport</th><th>Rôle et Sens de Communication</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>SIP (Signalisation en clair)</strong></td><td><code>5060 / UDP &amp; TCP</code></td><td>Enregistrement (REGISTER), invitations d\'appels (INVITE) et contrôle de session.</td></tr>',
    '      <tr><td><strong>SIP over TLS (SIPS sécurisé)</strong></td><td><code>5061 / TCP</code></td><td>Signalisation chiffrée de bout en bout par certificat X.509.</td></tr>',
    '      <tr><td><strong>RTP / RTCP (Flux médias audio)</strong></td><td><code>10000 - 20000 / UDP</code></td><td>Transport temps réel de la voix (port pair RTP, port impair consécutif RTCP).</td></tr>',
    '      <tr><td><strong>IAX2 (Inter-Asterisk eXchange)</strong></td><td><code>4569 / UDP</code></td><td>Trunk natif Asterisk multiplexant signalisation et voix sur un port unique.</td></tr>',
    '      <tr><td><strong>STUN (Session Traversal Utilities)</strong></td><td><code>3478 / UDP</code></td><td>Découverte de l\'adresse IP et du port publics du client derrière NAT.</td></tr>',
    '      <tr><td><strong>TURN (Traversal Using Relays)</strong></td><td><code>3478 / 5349 UDP/TCP</code></td><td>Relais média pour traverser les routeurs NAT symétriques stricts.</td></tr>',
    '      <tr><td><strong>Asterisk AMI (Manager Interface)</strong></td><td><code>5038 / TCP</code></td><td>Interface de pilotage et supervision programmatique d\'Asterisk.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Comparatif des Codecs Vocaux Standards (ITU-T &amp; IETF)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Codec</th><th>Débit Brut</th><th>Charge 20ms</th><th>Débit Réseau IP</th><th>MOS Typique</th><th>Usage Privilégié</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>G.711 A-law / µ-law</strong></td><td>64 kbps</td><td>160 octets</td><td>80.0 kbps</td><td>4.41</td><td>LAN d\'entreprise, qualité RTC sans compression lourde.</td></tr>',
    '      <tr><td><strong>G.729 (CS-ACELP)</strong></td><td>8 kbps</td><td>20 octets</td><td>24.0 kbps</td><td>3.92</td><td>Liaisons WAN et trunks SIP à faible bande passante.</td></tr>',
    '      <tr><td><strong>G.722 (Large Bande)</strong></td><td>64 kbps</td><td>160 octets</td><td>80.0 kbps</td><td>4.38</td><td>Voix HD d\'entreprise (bande passante audio 50-7000 Hz).</td></tr>',
    '      <tr><td><strong>OPUS (IETF)</strong></td><td>6 à 510 kbps</td><td>Variable</td><td>Adaptatif</td><td>4.45</td><td>WebRTC, visioconférence et réseaux internet instables.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Méthodes &amp; Familles de Codes de Réponse SIP (RFC 3261)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Famille / Méthode</th><th>Nom / Description</th><th>Signification Opérationnelle</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>INVITE</code></td><td>Demande de session</td><td>Initie un appel téléphonique ou une session multimédia.</td></tr>',
    '      <tr><td><code>ACK</code></td><td>Accusé de réception</td><td>Confirme la réception définitive d\'une réponse finale à un INVITE.</td></tr>',
    '      <tr><td><code>BYE</code></td><td>Terminaison d\'appel</td><td>Met fin à une session en cours (raccroché par un interlocuteur).</td></tr>',
    '      <tr><td><code>REGISTER</code></td><td>Enregistrement UA</td><td>Notifie le Registrar de l\'adresse de contact du poste client.</td></tr>',
    '      <tr><td><strong>1xx (100, 180, 183)</strong></td><td>Provisoire</td><td><code>100 Trying</code> (en cours), <code>180 Ringing</code> (sonnerie distante), <code>183 Session Progress</code>.</td></tr>',
    '      <tr><td><strong>2xx (200)</strong></td><td>Succès</td><td><code>200 OK</code> : requête acceptée (décroché du correspondant).</td></tr>',
    '      <tr><td><strong>4xx (401, 403, 404, 486)</strong></td><td>Erreur Client</td><td><code>401 Unauthorized</code>, <code>404 Not Found</code>, <code>486 Busy Here</code>.</td></tr>',
    '      <tr><td><strong>5xx (500, 503)</strong></td><td>Erreur Serveur</td><td><code>500 Server Error</code>, <code>503 Service Unavailable</code> (IPBX surchargé).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Directives Clés de Configuration Asterisk</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Fichier</th><th>Directive Clé</th><th>Valeur Exemple</th><th>Description Technique</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>sip.conf</code></td><td><code>type</code></td><td><code>friend</code></td><td>Autorise à la fois l\'émission et la réception d\'appels pour le poste.</td></tr>',
    '      <tr><td><code>sip.conf</code></td><td><code>host</code></td><td><code>dynamic</code></td><td>Exige un enregistrement SIP préalable via REGISTER.</td></tr>',
    '      <tr><td><code>sip.conf</code></td><td><code>dtmfmode</code></td><td><code>rfc2833</code></td><td>Transport des touches DTMF hors-bande selon RFC 2833 / 4733.</td></tr>',
    '      <tr><td><code>extensions.conf</code></td><td><code>exten => num,prio,App(args)</code></td><td><code>exten => _7XXXX,1,Dial(SIP/\${EXTEN},20)</code></td><td>Règle d\'acheminement d\'appel avec masque de numérotation.</td></tr>',
    '      <tr><td><code>voicemail.conf</code></td><td><code>box => pin,nom,email</code></td><td><code>600 => 1234,Accueil,contact@lan</code></td><td>Déclaration d\'une boîte vocale et notification email associée.</td></tr>',
    '      <tr><td><code>queues.conf</code></td><td><code>strategy</code></td><td><code>ringall | leastrecent</code></td><td>Algorithme de distribution d\'appels aux agents du centre de contacts.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>6. Marquage Réseau &amp; Règles de Qualité de Service (QoS)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Type de Trafic</th><th>Marquage DSCP (Couche 3)</th><th>Marquage 802.1p CoS (Couche 2)</th><th>Priorité Switch / Routeur</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Voix RTP (Médias)</strong></td><td><code>EF (46) - ToS 0xB8</code></td><td><code>CoS 5 (Voice)</code></td><td>File de priorité absolue (Priority Queue / LLQ) sans mise en attente.</td></tr>',
    '      <tr><td><strong>Signalisation SIP</strong></td><td><code>CS3 (24) ou AF31 (26)</code></td><td><code>CoS 3 (Call Signaling)</code></td><td>File garantie pour préserver l\'établissement rapide des appels.</td></tr>',
    '      <tr><td><strong>Données Standard</strong></td><td><code>CS0 (0) - Best Effort</code></td><td><code>CoS 0 (Best Effort)</code></td><td>File générale pouvant subir des ralentissements ou pertes en cas de saturation.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Consulter les cartes flashcards' }, { href: 'examens.html', label: 'Voir les sujets d\'examen' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Formules & mémento — ' + course.brand,
      description: 'Mémento technique du cours Téléphonie VoIP B3 : Erlang B, bande passante codecs, ports ToIP, méthodes SIP, configuration Asterisk et QoS.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
