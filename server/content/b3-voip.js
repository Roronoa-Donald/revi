/**
 * Contenu du cours « Téléphonie VoIP B3 » (dossier `b3-voip/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-voip/.
 */
'use strict';

const chapitres = [
  ...require('./b3-voip/chapitres-1-3'),
  ...require('./b3-voip/chapitres-4-6')
];

const pages = require('./b3-voip/pages');

const course = {
  id: 'b3-voip',
  slug: 'b3-voip',
  brand: 'Téléphonie VoIP B3',
  brandIcon: 'phone',

  // Palette Deep Cyan / Ocean / Slate conforme WCAG AA/AAA (5.36:1 / 9.11:1 sur fond clair)
  accent: '#0e7490',
  accentDeep: '#164e63',
  accentSoft: '#ecfeff',
  accentBorder: '#a5f3fc',

  storeKey: 'b3voip:progress',

  title: 'Téléphonie VoIP B3 — Voix sur IP &amp; ToIP d\'Entreprise, Asterisk IPBX, Protocoles SIP, SDP, RTP, Codecs, Dialplan, QoS, NAT &amp; Sécurité',
  description:
    'Formation d\'excellence en ingénierie de la voix sur IP et de la téléphonie d\'entreprise pour le Bachelor 3 : ' +
    'principes physiques et mathématiques de la numérisation vocale (théorème d\'échantillonnage de Nyquist-Shannon à 8 kHz, quantification logarithmique A-law et µ-law dans ITU-T G.711), codecs audio standards (G.711, G.729 CS-ACELP, G.722 HD audio, Opus), calcul rigoureux de la bande passante réseau par appel avec en-têtes IP/UDP/RTP de 40 octets, et estimation de la qualité vocale par le modèle E ITU-T G.107 (facteur R et score MOS de 1.0 à 4.5), ' +
    'architecture et fonctionnement des protocoles multimédias temps réel : signalisation textuelle SIP RFC 3261 (rôles UAC, UAS, Proxy, Registrar, méthodes INVITE, ACK, BYE, CANCEL, REGISTER et familles de codes 1xx à 6xx), description de session multimédia avec SDP RFC 4566 (négociation dynamique des flux audio, adresses IP et profils de codecs rtpmap), transport temps réel avec RTP RFC 3550, supervision de session avec RTCP et calcul mathématique de la gigue inter-paquets, ' +
    'déploiement, compilation et administration d\'un IPBX Asterisk open source : fichiers de configuration sip.conf / pjsip.conf, users.conf, modélisation des profils utilisateurs (type friend, peer, user, authentification secrète, dtmfmode rfc2833), messagerie vocale voicemail.conf, installation des fichiers sonores multilingues, et appairage avec softphones (3CX, Linphone, Zoiper) et téléphones IP matériels, ' +
    'programmation avancée du plan de numérotation (Dialplan) dans extensions.conf : contextes d\'appels étanches, priorité des étapes, modélisation par masques et expressions régulières (_X, _Z, _N, _7XXXXXXXX), variables de canaux (${EXTEN}, ${CALLERID}), conception de Serveurs Vocaux Interactifs (SVI / IVR) arborescents avec navigation DTMF et gestion des timeouts, ' +
    'qualité de service (QoS) et théorie du trafic téléphonique : dimensionnement des trunks SIP opérateurs par la formule récursive d\'Erlang B (trafic offert en Erlangs et probabilité de blocage GoS), marquage de paquets de bout en bout (DSCP EF 46 pour RTP, CS3 / AF31 pour SIP, 802.1p CoS 5 sur Voice VLAN 802.1Q), files d\'attente prioritaires LLQ, et résolution des problématiques de traversée de NAT (silence unilatéral One-Way Audio, résolveurs STUN RFC 5389, serveurs relais TURN et désactivation indispensable du SIP ALG), ' +
    'et enfin fonctions d\'entreprise et sécurité des télécommunications unifiées : centres de contacts avec files d\'attente ACD (queues.conf, stratégies de distribution ringall, leastrecent, roundrobin), routage au moindre coût LCR (Least Cost Routing) multi-opérateurs, interconnexion multi-sites par trunks IAX2 et SIP, chiffrement de la signalisation (SIP over TLS sur port 5061/TCP), chiffrement des flux voix (SRTP RFC 3711 avec clés AES), et défense active contre les scans et attaques brute-force avec Fail2ban et filtrage pare-feu dynamique.',
  lead:
    'Maîtrisez l\'ingénierie de la voix sur IP et de la téléphonie d\'entreprise : codecs audio, protocoles SIP/SDP/RTP, administration d\'Asterisk, programmation du dialplan, dimensionnement Erlang B, QoS et sécurité ToIP. ' +
    'Six modules complets, 18 études de cas pratiques et méthodologiques et 48 QCM d\'évaluation.',

  sources: 'Supports de cours officiels B3-IT / B3-RSI Téléphonie Voix sur IP (Auteur : M. Pape Moussa SONKO, Élève Ingénieur en Systèmes et Réseaux), Normes IETF RFC 3261 (SIP), RFC 4566 (SDP), RFC 3550 (RTP), RFC 5389 (STUN), Recommandations ITU-T G.107, G.711, G.729, Documentation officielle Asterisk',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
