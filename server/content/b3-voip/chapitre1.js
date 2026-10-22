/**
 * Module 1 — Fondamentaux de la ToIP & Numérisation Vocale
 * Cours « Téléphonie VoIP B3 »
 */
'use strict';

module.exports = {
  n: 1,
  title: 'Fondamentaux de la ToIP & Numérisation Vocale',
  short: 'Numérisation & Codecs',
  toc: 'Histoire et principes de la convergence voix-données, théorème d\'échantillonnage de Nyquist-Shannon (8 kHz), quantification logarithmique A-law et µ-law (G.711), codecs audio standards (G.729, G.722, Opus), calcul rigoureux de bande passante avec en-têtes IP/UDP/RTP et modèle E (score R & MOS).',
  time: '≈ 2 h 45',
  free: true,

  situation:
    'Vous êtes recruté comme ingénieur réseaux et télécoms pour piloter la migration intégrale de la flotte téléphonique d\'une entreprise multisite (300 collaborateurs) du vieux standard RTC/RNIS vers une infrastructure moderne de Voix sur IP. ' +
    'Votre première mission consiste à poser les bases d\'ingénierie acoustique et réseau : comprendre la numérisation du signal vocal, maîtriser le théorème de Nyquist-Shannon et la quantification G.711, ' +
    'sélectionner les codecs audio adaptés aux liaisons inter-sites et calculer rigoureusement la bande passante nécessaire en incluant les en-têtes réseau IP/UDP/RTP pour garantir un score MOS d\'excellence.',

  objectives: [
    'Comprendre la rupture technologique entre la commutation de circuits (RTC/RNIS) et la commutation de paquets (ToIP/VoIP).',
    'Maîtriser les principes physiques et mathématiques de la numérisation vocale : théorème de Nyquist-Shannon (8 kHz) et quantification logarithmique A-law / µ-law (G.711).',
    'Calculer la bande passante réelle d\'un flux ToIP en intégrant la charge utile du codec et les en-têtes de paquetisation (IP 20B, UDP 8B, RTP 12B).',
    'Évaluer et prédire la qualité perçue de la communication à l\'aide du modèle E (facteur R) et du score MOS (Mean Opinion Score).'
  ],

  sections: [
    {
      title: 'De la Téléphonie Traditionnelle (RTC/RNIS) à la Téléphonie sur IP (ToIP)',
      html: [
        '<p>Pendant plus d\'un siècle, la communication vocale à distance a reposé sur le <strong>Réseau Téléphonique Commuté (RTC / PSTN)</strong>, fondé sur la commutation de circuits physiques ou temporels dédiés (lignes analogiques cuivre et liaisons numériques RNIS T0/T2 à 64 kbps). Dans cette approche historique, un canal complet de 64 kbps restait monopolisé en continu pendant toute la durée de l\'appel, même lors des silences, engendrant des coûts d\'infrastructure et d\'abonnement élevés.</p>',
        '<p>La <strong>Téléphonie sur IP (ToIP)</strong> et la <strong>Voix sur IP (VoIP)</strong> matérialisent la convergence numérique : le signal vocal n\'est plus véhiculé sur une boucle locale dédiée mais découpé en paquets de données numériques routés sur les réseaux IP (Ethernet, WAN, Internet) aux côtés du trafic bureautique et web standard.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Réseau Téléphonique Commuté (RTC / RNIS)</h4>',
        '    <ul>',
        '      <li><strong>Commutation de circuits :</strong> Allocation exclusive d\'un circuit physique ou temporel (Time Slot de 64 kbps) de bout en bout.</li>',
        '      <li><strong>Facturation à la durée et à la distance :</strong> Coûts télécoms élevés pour les communications longue distance et internationales.</li>',
        '      <li><strong>Infrastructure cloisonnée :</strong> Câblage téléphonique cuivre (RJ11/PABX analogique) séparé du réseau informatique (RJ45).</li>',
        '      <li><strong>Obsolescence programmée :</strong> Arrêt progressif du réseau cuivre et fin de commercialisation du RTC par les opérateurs mondiaux.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Téléphonie sur IP (ToIP / VoIP)</h4>',
        '    <ul>',
        '      <li><strong>Commutation de paquets :</strong> Échantillonnage, compression et encapsulation de la voix dans des paquets IP/UDP/RTP.</li>',
        '      <li><strong>Mutualisation d\'infrastructure :</strong> Câblage unique RJ45 catégorie 6+, switches PoE et VLANs logiques partagés.</li>',
        '      <li><strong>Communications unifiées :</strong> Intégration naturelle de la messagerie vocale vers email, de la vidéo, du partage d\'écran et du CTI.</li>',
        '      <li><strong>Flexibilité et réduction des coûts :</strong> Trunks SIP dématérialisés, forfaits illimités et nomadisme intégral (softphones).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Numérisation Vocale : Échantillonnage de Nyquist & Quantification G.711',
      html: [
        '<p>La voix humaine émise lors d\'une conversation produit des ondes acoustiques analogiques continues. Pour transmettre cette parole sur un réseau informatique binaire, elle doit subir une chaîne de transformation en trois étapes : <strong>l\'échantillonnage</strong>, <strong>la quantification</strong> et <strong>le codage</strong> (PCM - Pulse Code Modulation).</p>',
        '<p>Le <strong>théorème d\'échantillonnage de Nyquist-Shannon</strong> énonce que pour restituer intégralement et fidèlement un signal analogique continu de bande passante <code>B</code> sans distorsion de repliement de spectre (aliasing), la fréquence d\'échantillonnage <code>Fe</code> doit être strictement supérieure ou égale au double de la fréquence maximale contenue dans le signal :</p>',
        '<pre><code>Fe &ge; 2 * Fmax</code></pre>',
        '<p>La parole humaine intelligible en téléphonie classique couvre la bande spectrale de <strong>300 Hz à 3 400 Hz</strong> (largeur de bande téléphonique normalisée). La fréquence maximale est donc <code>Fmax = 3 400 Hz</code>. Le double théorique est 6 800 Hz. Afin de ménager une marge technique indispensable pour concevoir des filtres analogiques passe-bas anti-repliement réalisables, les instances internationales (UIT-T) ont fixé la fréquence d\'échantillonnage universelle à <strong>8 000 Hz</strong> (soit 8 000 mesures par seconde, ou une mesure toutes les 125 microsecondes).</p>',
        '<div class="card">',
        '  <h4>Lois de Quantification Logarithmique ITU-T G.711 (A-law &amp; µ-law)</h4>',
        '  <p>Une quantification linéaire uniforme de la voix exigerait 12 à 14 bits par échantillon pour offrir une dynamique convenable sans bruit de fond sur les voix faibles, ce qui exigerait un débit de plus de 100 kbps. Pour optimiser ce volume, la recommandation <strong>ITU-T G.711</strong> applique une compression logarithmique instantanée réduisant chaque échantillon sur <strong>8 bits</strong> (1 octet) :</p>',
        '  <ul>',
        '    <li><strong>Loi A (A-law) :</strong> Déployée en Europe, en Afrique et dans la majorité du monde. Elle découpe la plage d\'amplitude en 13 segments linéaires approximant une courbe logarithmique. Les signaux de faible niveau bénéficient de pas de quantification très serrés (pas = 2), garantissant un excellent rapport signal/bruit (SQNR).</li>',
        '    <li><strong>Loi µ (µ-law / PCMU) :</strong> Déployée en Amérique du Nord (USA, Canada) et au Japon. Elle utilise 15 segments avec un biais accentué sur les très faibles amplitudes.</li>',
        '    <li><strong>Débit binaire standard :</strong> <code>8 000 échantillons/s * 8 bits/échantillon = 64 000 bps = 64 kbps</code>. C\'est le débit de référence d\'un canal voix numérique non compressé (canal B en RNIS).</li>',
        '  </ul>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Codecs Vocaux, Calcul de Bande Passante Réseau & Modèle E (Score R & MOS)',
      html: [
        '<p>Si le codec G.711 fournit une fidélité acoustique irréprochable sur un réseau local d\'entreprise, le transport de dizaines d\'appels simultanés sur une liaison WAN ou internet exige souvent l\'usage d\'algorithmes de compression vocale (codecs avec perte) pour économiser la ressource spectrale.</p>',
        '<table class="table">',
        '  <thead><tr><th>Codec</th><th>Standard</th><th>Débit Brut</th><th>Algorithme de Compression</th><th>Complexité DSP</th><th>Usage Typique</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>G.711 (PCMA / PCMU)</strong></td><td>ITU-T</td><td>64 kbps</td><td>Modulation PCM logarithmique sans prédiction</td><td>Nulle (0.1 MIPS)</td><td>LAN local, qualité cristal, aucun lag de compression.</td></tr>',
        '    <tr><td><strong>G.729 (G.729a)</strong></td><td>ITU-T</td><td>8 kbps</td><td>CS-ACELP (synthèse vocale par prédiction linéaire)</td><td>Élevée (20-30 MIPS)</td><td>Liens WAN contraints, économie de 70% de bande passante.</td></tr>',
        '    <tr><td><strong>G.722</strong></td><td>ITU-T</td><td>64 kbps</td><td>SB-ADPCM (Large bande 50 Hz - 7 kHz)</td><td>Modérée (5 MIPS)</td><td>Téléphonie HD d\'entreprise, conférences audiophiles.</td></tr>',
        '    <tr><td><strong>OPUS</strong></td><td>IETF RFC 6716</td><td>6 à 510 kbps</td><td>Hybride SILK (voix) + CELT (musique), adaptatif</td><td>Modérée à forte</td><td>WebRTC, visioconférence et réseaux internet grand public.</td></tr>',
        '  </tbody>',
        '</table>',
        '<div class="card">',
        '  <h4>Calcul Rigoureux de la Bande Passante Réseau (Overhead En-Têtes)</h4>',
        '  <p>Une erreur fréquente consiste à dimensionner un lien WAN en additionnant uniquement les débits bruts des codecs. En ToIP, chaque échantillon audio de 20 ms est encapsulé dans trois en-têtes réseau superposés :</p>',
        '  <pre><code>[ En-tête IP : 20 octets ] + [ En-tête UDP : 8 octets ] + [ En-tête RTP : 12 octets ] = 40 octets d\'en-têtes</code></pre>',
        '  <p>Pour un paquetage standard de <code>PTIME = 20 ms</code> (soit <code>50 paquets par seconde</code>) :</p>',
        '  <ul>',
        '    <li><strong>G.711 (64 kbps) :</strong> Charge utile = 160 octets. Paquet total = 160 + 40 = 200 octets. Débit réel par appel = <code>200 octets * 8 bits * 50 pps = 80.0 kbps</code>.</li>',
        '    <li><strong>G.729 (8 kbps) :</strong> Charge utile = 20 octets. Paquet total = 20 + 40 = 60 octets. Débit réel par appel = <code>60 octets * 8 bits * 50 pps = 24.0 kbps</code>.</li>',
        '  </ul>',
        '</div>',
        '<div class="card">',
        '  <h4>Évaluation de la Qualité Vocale : Modèle E &amp; Score MOS (ITU-T G.107)</h4>',
        '  <p>Le <strong>Mean Opinion Score (MOS)</strong> est une échelle normalisée de 1.0 (incompréhensible) à 5.0 (parfait, qualité studio) mesurant la qualité ressentie d\'une conversation téléphonique. Le <strong>modèle E (G.107)</strong> permet d\'estimer ce score par calcul à partir d\'un facteur de transmission <code>R</code> (0 à 100) :</p>',
        '  <pre><code>R = R0 - Id(Délai) - Ie(Pertes &amp; Codec)</code></pre>',
        '  <p>La valeur de R est ensuite traduite en MOS : un score MOS &ge; 4.03 qualifie une communication d\'<strong>Excellente</strong>, entre 3.60 et 4.02 de <strong>Bonne</strong>, entre 3.10 et 3.59 de <strong>Moyenne</strong>, et en dessous de 3.10 de <strong>Mauvaise</strong>.</p>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie : Numérisation & Dimensionnement de la Voix',
  method: [
    'Caractériser les flux acoustiques : vérifier la conformité d\'échantillonnage au théorème de Nyquist (8 kHz pour bande étroite, 16 kHz pour large bande HD).',
    'Sélectionner les codecs audio selon les contraintes de liaison : imposer G.711 sur le LAN local et G.729 ou Opus sur les liaisons WAN ou internet contraintes.',
    'Calculer la surcharge réseau (Overhead) : intégrer systématiquement les 40 octets d\'en-têtes IP/UDP/RTP dans le calcul du débit par canal à 20 ms de PTIME.',
    'Évaluer la qualité prévisionnelle avec le Modèle E : projeter les scores R et MOS selon la latence mesurée et le taux de pertes de paquets sur le lien.'
  ],

  summary: [
    'La ToIP remplace la commutation de circuits du RTC par la commutation de paquets numériques IP/UDP/RTP mutualisée sur le réseau informatique.',
    'Le théorème de Nyquist-Shannon impose Fe &ge; 2 * Fmax ; la téléphonie numérise la bande 300-3400 Hz à 8 000 échantillons par seconde.',
    'La recommandation ITU-T G.711 compresse les échantillons linéaires sur 8 bits via la loi A (Europe) ou la loi µ (USA), produisant le débit universel de 64 kbps.',
    'Les en-têtes réseau IP (20B), UDP (8B) et RTP (12B) ajoutent 40 octets par paquet, élevant le débit réel de G.711 à 80 kbps et de G.729 à 24 kbps par appel à 20 ms.',
    'Le modèle E (ITU-T G.107) calcule le facteur R et le score MOS (1.0 à 4.5) pour qualifier objectivement l\'expérience utilisateur face au délai et aux pertes.'
  ],

  checklist: [
    'Savez-vous énoncer le théorème de Nyquist-Shannon et expliquer pourquoi la fréquence Fe a été fixée à 8 000 Hz en téléphonie ?',
    'Pouvez-vous expliquer le principe de la quantification logarithmique non uniforme A-law et µ-law ?',
    'Savez-vous calculer la taille du payload et le débit réseau total avec en-têtes pour G.711 et G.729 à 20 ms de PTIME ?',
    'Comprenez-vous pourquoi un codec G.729 consomme 24 kbps sur le réseau alors que son débit brut de compression est de 8 kbps ?',
    'Savez-vous interpréter le score MOS et qualifier la qualité d\'une communication téléphonique ?'
  ],

  notions: [
    { term: 'ToIP / VoIP', def: 'Téléphonie sur IP : transport de la voix numérisée sous forme de paquets IP/UDP/RTP sur un réseau informatique.' },
    { term: 'Théorème de Nyquist', def: 'Règle physique imposant une fréquence d\'échantillonnage au moins double de la fréquence maximale du signal analogique.' },
    { term: 'G.711 (PCM)', def: 'Norme internationale de numérisation vocale non compressée à 64 kbps utilisant la loi A (Europe) ou la loi µ (USA).' },
    { term: 'G.729 (CS-ACELP)', def: 'Codec de compression vocale haute efficacité réduisant le débit audio brut à 8 kbps par modélisation prédictive.' },
    { term: 'Overhead IP/UDP/RTP', def: 'Surcharge protocolaire de 40 octets ajoutée à chaque paquet voix (IP 20B + UDP 8B + RTP 12B).' },
    { term: 'Score MOS (Mean Opinion Score)', def: 'Échelle de notation standardisée (1.0 à 4.5) mesurant la qualité perçue d\'une transmission vocale.' }
  ],

  pitfalls: [
    'Dimensionner un lien WAN en prenant uniquement le débit brut du codec (8 kbps pour G.729 au lieu des 24 kbps réels avec en-têtes IP/UDP/RTP).',
    'Confondre la fréquence d\'échantillonnage (8 000 Hz = 8 000 mesures/s) et le débit binaire résultant (64 000 bps = 64 kbps).',
    'Oublier que les paquets voix perdus ne sont jamais retransmis en UDP/RTP sous peine d\'introduire un écho et un décalage temporel inaudible.',
    'Utiliser le codec G.711 sur des liaisons satellite ou 4G à fort taux de pertes sans mécanisme de dissimulation de paquets (PLC).'
  ],

  questions: [
    {
      stem: 'Selon le théorème d\'échantillonnage de Nyquist-Shannon, quelle fréquence minimale d\'échantillonnage doit être appliquée pour numériser un signal audio dont la fréquence maximale est de 3 400 Hz ?',
      opts: ['3 400 Hz', '6 800 Hz', '8 000 Hz', '16 000 Hz'],
      correct: 1,
      exp: 'Le théorème impose Fe >= 2 * Fmax = 2 * 3 400 = 6 800 Hz. (La norme internationale a fixé 8 000 Hz pour ménager une marge technique de filtrage anti-repliement).'
    },
    {
      stem: 'Quel est le débit binaire brut d\'un canal voix standard numérisé selon la norme ITU-T G.711 (loi A ou loi µ) ?',
      opts: ['8 kbps', '16 kbps', '64 kbps', '128 kbps'],
      correct: 2,
      exp: 'G.711 échantillonne à 8 000 Hz avec 8 bits par échantillon : 8 000 * 8 = 64 000 bits/s = 64 kbps.'
    },
    {
      stem: 'Quelle taille totale d\'en-têtes réseau (IP + UDP + RTP) est ajoutée à chaque paquet voix lors de la transmission ToIP standard sur réseau IPv4 ?',
      opts: ['14 octets', '28 octets', '40 octets', '64 octets'],
      correct: 2,
      exp: 'En-tête IP (20 octets) + En-tête UDP (8 octets) + En-tête RTP (12 octets) = 40 octets de surcharge par paquet.'
    },
    {
      stem: 'Pour une communication utilisant le codec G.711 (64 kbps) avec une durée de paquetisation standard de 20 ms (50 paquets/s), quel est le débit réseau total consommé par appel avec les en-têtes IP/UDP/RTP ?',
      opts: ['64.0 kbps', '74.7 kbps', '80.0 kbps', '96.0 kbps'],
      correct: 2,
      exp: 'Payload 20ms = (64 000 * 0.02) / 8 = 160 octets. Paquet total = 160 + 40 = 200 octets. Débit = 200 * 8 * 50 = 80 000 bps = 80.0 kbps.'
    },
    {
      stem: 'Quel codec audio utilise l\'algorithme CS-ACELP pour compresser la parole humaine à un débit brut de seulement 8 kbps ?',
      opts: ['G.711', 'G.722', 'G.729', 'Opus'],
      correct: 2,
      exp: 'G.729 compresse la voix à 8 kbps grâce à la modélisation mathématique du conduit vocal par prédiction linéaire (CS-ACELP).'
    },
    {
      stem: 'Dans quelle région géographique la loi de compression logarithmique G.711 A-law est-elle obligatoirement déployée sur les réseaux téléphoniques ?',
      opts: ['États-Unis et Canada', 'Europe et Afrique', 'Japon uniquement', 'Australie uniquement'],
      correct: 1,
      exp: 'L\'Europe, l\'Afrique et la majorité des pays du monde utilisent la norme A-law (PCMA), tandis que l\'Amérique du Nord et le Japon utilisent la loi µ (PCMU).'
    },
    {
      stem: 'Dans le modèle E (ITU-T G.107), quel score MOS (Mean Opinion Score) correspond au seuil à partir duquel la qualité de communication est qualifiée d\'Excellente ?',
      opts: ['MOS >= 3.10', 'MOS >= 3.60', 'MOS >= 4.03', 'MOS = 5.00'],
      correct: 2,
      exp: 'Selon la classification ITU-T, un score MOS >= 4.03 qualifie une communication d\'Excellente (qualité studio/réseau local optimal).'
    },
    {
      stem: 'Pourquoi est-il impossible d\'utiliser le protocole de transport TCP pour acheminer les flux audio RTP en téléphonie temps réel ?',
      opts: ['Car TCP ne supporte pas les adresses IP', 'Car le mécanisme de retransmission (ACK/retransmission) et le contrôle de congestion de TCP introduiraient un retard et une gigue inacceptables pour la conversation', 'Car TCP est limité à 10 kbps', 'Car les pare-feux bloquent tous les flux TCP'],
      correct: 1,
      exp: 'La retransmission TCP en cas de paquet perdu arriverait trop tard pour être jouée dans l\'oreille humaine. On privilégie UDP qui délivre les paquets sans délai ni retransmission.'
    }
  ],

  flashcards: [
      { q: 'Qu’est-ce que « ToIP / VoIP » ?', a: 'ToIP / VoIP : Téléphonie sur IP : transport de la voix numérisée sous forme de paquets IP/UDP/RTP sur un réseau informatique.' },
      { q: 'Qu’est-ce que « G.729 (CS-ACELP) » ?', a: 'G.729 (CS-ACELP) : Codec de compression vocale haute efficacité réduisant le débit audio brut à 8 kbps par modélisation prédictive.' },
      { q: 'Qu’est-ce que « Overhead IP/UDP/RTP » ?', a: 'Overhead IP/UDP/RTP : Surcharge protocolaire de 40 octets ajoutée à chaque paquet voix (IP 20B + UDP 8B + RTP 12B).' },
      { q: 'Qu’est-ce que « La ToIP remplace la commutation de circuits du RTC par la commutation de paquets numériques IP/UDP/RTP mutualisée sur le réseau informatique. » ?', a: 'La ToIP remplace la commutation de circuits du RTC par la commutation de paquets numériques IP/UDP/RTP mutualisée sur le réseau informatique.' },
      { q: 'Qu’est-ce que « Le théorème de Nyquist-Shannon impose Fe ≥ 2 * Fmax ; la téléphonie numérise la bande 300-3400 Hz à 8 000 échantillons par seconde. » ?', a: 'Le théorème de Nyquist-Shannon impose Fe ≥ 2 * Fmax ; la téléphonie numérise la bande 300-3400 Hz à 8 000 échantillons par seconde.' },
      { q: 'Qu’est-ce que « Jitter Buffer » ?', a: 'Jitter Buffer : Mémoire tampon sur le terminal de réception régularisant le flux audio pour restituer un son continu.' },
      { q: "Qu’est-ce que « SIP (RFC 3261) est le protocole de signalisation en mode texte contrôlant l'établissement, la modification et la rupture des sessions multimédias. » ?", a: "SIP (RFC 3261) est le protocole de signalisation en mode texte contrôlant l'établissement, la modification et la rupture des sessions multimédias." },
      { q: "Qu’est-ce que « Les terminaux User Agents (UAC/UAS) s'enregistrent auprès du Registrar (REGISTER) et communiquent via des serveurs Proxies en relayant requêtes et réponses numérotées (1xx à 6xx). » ?", a: "Les terminaux User Agents (UAC/UAS) s'enregistrent auprès du Registrar (REGISTER) et communiquent via des serveurs Proxies en relayant requêtes et réponses numérotées (1xx à 6xx)." },
      { q: 'Qu’est-ce que « chan_sip / chan_pjsip » ?', a: "chan_sip / chan_pjsip : Modules d'Asterisk assurant la prise en charge de la pile protocolaire SIP." },
      { q: "Qu’est-ce que « Asterisk est un IPBX logiciel modulaire open source articulé autour d'un cœur de commutation, de pilotes de canaux (chan_sip, chan_pjsip, chan_iax2) et d'un dialplan. » ?", a: "Asterisk est un IPBX logiciel modulaire open source articulé autour d'un cœur de commutation, de pilotes de canaux (chan_sip, chan_pjsip, chan_iax2) et d'un dialplan." },
      { q: "Qu’est-ce que « Les fichiers de configuration résident dans /etc/asterisk/, notamment sip.conf (postes SIP), extensions.conf (logique d'appel) et voicemail.conf (boîtes vocales). » ?", a: "Les fichiers de configuration résident dans /etc/asterisk/, notamment sip.conf (postes SIP), extensions.conf (logique d'appel) et voicemail.conf (boîtes vocales)." },
      { q: 'Qu’est-ce que « Contexte » ?', a: "Contexte : Conteneur étanche regroupant un jeu d'extensions spécifiques pour segmenter les droits des utilisateurs." },
      { q: 'Qu’est-ce que « Pattern Matching » ?', a: "Pattern Matching : Filtrage d'extensions par motifs réguliers (_X, _Z, _N) pour factoriser les règles d'appel." },
      { q: 'Qu’est-ce que « SVI / IVR » ?', a: 'SVI / IVR : Serveur Vocal Interactif guidant les appelants par messages vocaux et saisies de touches DTMF.' },
      { q: "Qu’est-ce que « Le Dialplan dans extensions.conf définit l'ensemble des règles de routage et des logiques d'appels du système téléphonique. » ?", a: "Le Dialplan dans extensions.conf définit l'ensemble des règles de routage et des logiques d'appels du système téléphonique." },
      { q: 'Qu’est-ce que « Une instruction de dialplan associe une extension, une priorité séquentielle (1, 2... ou n) et une application système (Answer, Playback, Dial, VoiceMail, Hangup). » ?', a: 'Une instruction de dialplan associe une extension, une priorité séquentielle (1, 2... ou n) et une application système (Answer, Playback, Dial, VoiceMail, Hangup).' },
      { q: "Qu’est-ce que « Loi d'Erlang B » ?", a: "Loi d'Erlang B : Modèle mathématique récursif calculant la probabilité de rejet d'appels sur un faisceau de N canaux sans file d'attente." },
      { q: "Qu’est-ce que « L'intensité de trafic s'exprime en Erlangs (A = Appels * Durée / 3600) ; la loi d'Erlang B calcule la probabilité de blocage sur N canaux sans attente. » ?", a: "L'intensité de trafic s'exprime en Erlangs (A = Appels * Durée / 3600) ; la loi d'Erlang B calcule la probabilité de blocage sur N canaux sans attente." },
      { q: 'Qu’est-ce que « Les exigences ITU-T G.114 pour la voix imposent une latence <= 150 ms, une gigue <= 30 ms et des pertes de paquets <= 1.0%. » ?', a: 'Les exigences ITU-T G.114 pour la voix imposent une latence <= 150 ms, une gigue <= 30 ms et des pertes de paquets <= 1.0%.' },
      { q: 'Qu’est-ce que « Toll Fraud » ?', a: 'Toll Fraud : Piratage de commutateurs téléphoniques pour émettre massivement des appels frauduleux vers des numéros surtaxés.' },
      { q: "Qu’est-ce que « Les files d'attente ACD (queues.conf) distribuent les flux entrants selon des stratégies adaptées » ?", a: "Les files d'attente ACD (queues.conf) distribuent les flux entrants selon des stratégies adaptées : ringall, leastrecent, roundrobin ou fewestcalls." },
      { q: 'Qu’est-ce que « Les trunks IAX2 multiplexent signalisation et voix sur le port 4569/UDP unique, offrant une traversée de NAT et une économie de bande passante idéales inter-sites. » ?', a: 'Les trunks IAX2 multiplexent signalisation et voix sur le port 4569/UDP unique, offrant une traversée de NAT et une économie de bande passante idéales inter-sites.' },
    {
      q: 'Qu\'est-ce que le théorème de Nyquist-Shannon et quelle est sa formule ?',
      a: 'Pour numériser fidèlement un signal analogique continu sans repliement de spectre, Fe >= 2 * Fmax.'
    },
    {
      q: 'Pourquoi la fréquence d\'échantillonnage de la voix est-elle fixée à 8 000 Hz ?',
      a: 'La voix téléphonique couvrant 300 à 3 400 Hz (Fmax = 3 400 Hz), 8 000 Hz dépasse le seuil minimal de 6 800 Hz et offre une marge pour les filtres anti-repliement.'
    },
    {
      q: 'Quel est le débit binaire brut du codec standard G.711 ?',
      a: '64 kbps (8 000 échantillons par seconde * 8 bits par échantillon).'
    },
    {
      q: 'Quelle est la taille des en-têtes réseau IP, UDP et RTP ajoutés à chaque paquet voix ?',
      a: '40 octets au total : IP (20 octets) + UDP (8 octets) + RTP (12 octets).'
    },
    {
      q: 'Quel débit réseau global consomme un appel téléphonique G.711 à 20 ms de PTIME ?',
      a: '80.0 kbps (160 octets de payload + 40 octets d\'en-têtes = 200 octets * 8 bits * 50 paquets/s).'
    },
    {
      q: 'Qu\'est-ce que le score MOS et quelle est son échelle ?',
      a: 'Le Mean Opinion Score (1.0 à 4.5) mesure la qualité perçue de la voix par les utilisateurs (>= 4.03 : Excellent).'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions de Nyquist et débits codecs mal assimilés. Relisez le cours et refaites le QCM.' },
    { cls: 'mid', text: 'Score 60-74 % : Principes généraux compris. Entraînez-vous sur le calcul de bande passante avec en-têtes IP/UDP/RTP.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Approfondissez le modèle E et la quantification A-law / µ-law.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez le dimensionnement réseau et les caractéristiques des codecs ToIP.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'ingénieur ToIP. Prêt pour les protocoles de signalisation SIP et SDP du Module 2 !' }
  ]
};
