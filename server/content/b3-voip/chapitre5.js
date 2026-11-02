/**
 * Module 5 — Qualité de Service (QoS), Dimensionnement & Réseau
 * Cours « Téléphonie VoIP B3 »
 */
'use strict';

module.exports = {
  n: 5,
  title: 'Qualité de Service (QoS), Dimensionnement & Réseau',
  short: 'QoS & Dimensionnement',
  toc: 'Théorie du trafic téléphonique et formule récursive d\'Erlang B (Grade of Service GoS), dimensionnement des liaisons trunks SIP, mécanismes de QoS réseau (marquage DSCP EF 46 / CoS 5, Voice VLAN 802.1Q, files d\'attente LLQ) et résolution de la traversée de pare-feu et NAT (STUN, TURN, ICE et désactivation de SIP ALG).',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Lors de pics d\'activité commerciale, plusieurs clients se plaignent d\'obtenir des tonalités d\'occupation intempestives, ' +
    'tandis que les télétravailleurs branchés derrière des routeurs domestiques souffrent de communications unidirectionnelles silencieuses. ' +
    'En tant qu\'ingénieur VoIP, vous devez résoudre ces incidents critiques : appliquer la théorie du trafic téléphonique et la formule récursive d\'Erlang B ' +
    'pour dimensionner précisément le nombre de canaux du trunk SIP de l\'entreprise avec un Grade of Service (GoS) < 1%, ' +
    'déployer la Qualité de Service (QoS) avec Voice VLAN 802.1Q (CoS 5) et marquage DiffServ DSCP EF (46) pour prioriser la voix sur le réseau, ' +
    'et diagnostiquer les blocages NAT en configurant STUN/TURN/ICE et en neutralisant les modules SIP ALG défaillants.',

  objectives: [
    'Calculer le trafic offert en Erlangs et déterminer le nombre de canaux simultanés nécessaires via la formule récursive d\'Erlang B (GoS <= 1%).',
    'Identifier les contraintes de qualité vocale de la norme ITU-T G.114 (latence <= 150 ms, gigue <= 30 ms, perte de paquets <= 1.0%).',
    'Mettre en œuvre les mécanismes de QoS Couche 2 (Voice VLAN 802.1Q, balisage CoS 5, LLDP-MED) et Couche 3 (DiffServ DSCP EF 46 / Low Latency Queueing).',
    'Diagnostiquer la traversée de NAT et de pare-feu : rôle de STUN (RFC 8489), TURN (RFC 8656), ICE (RFC 8445) et limites possibles d\'un SIP ALG.'
  ],

  sections: [
    {
      title: 'Dimensionnement des Trunks Téléphoniques & Loi d\'Erlang B',
      html: [
        '<p>L\'un des défis majeurs de l\'ingénieur télécoms consiste à dimensionner le nombre exact de canaux téléphoniques simultanés (sur un trunk SIP ou une liaison RNIS) nécessaires pour écouler le trafic d\'une entreprise sans surcoût financier ni refus d\'appels excessif.</p>',
        '<p>Le trafic téléphonique s\'exprime en <strong>Erlangs (E)</strong>, unité adimensionnelle mesurant l\'intensité d\'occupation continue d\'un canal :</p>',
        '<pre><code>A = (Nombre d\'appels à l\'heure de pointe * Durée moyenne en secondes) / 3600</code></pre>',
        '<p>Un trafic de <code>1 Erlang</code> équivaut à un canal téléphonique occupé à 100% pendant une heure entière (ou deux canaux occupés pendant 30 minutes chacun).</p>',
        '<div class="card">',
        '  <h4>La Formule Récursive d\'Erlang B (ITU-T E.500)</h4>',
        '  <p>La <strong>loi d\'Erlang B</strong> s\'applique aux systèmes d\'appels sans file d\'attente où tout appel arrivant lorsque les <code>N</code> canaux sont occupés est immédiatement rejeté (busy tone / échec). Elle calcule la <strong>probabilité de blocage</strong> (aussi appelée <em>Grade of Service</em>, GoS) :</p>',
        '  <pre><code>B(0, A) = 1.0\nB(k, A) = (A * B(k-1, A)) / (k + A * B(k-1, A))    pour k = 1, 2, ..., N</code></pre>',
        '  <p>En pratique, les entreprises tolèrent généralement un taux de blocage GoS maximal de <strong>1.0% (0.01)</strong> ou <strong>2.0% (0.02)</strong> à l\'heure de pointe. La formule récursive permet de déterminer par itération le nombre minimal de canaux <code>N</code> à souscrire auprès de l\'opérateur SIP.</p>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Mécanismes de Qualité de Service (QoS) & Ségrégation Réseau',
      html: [
        '<p>Contrairement aux flux web ou de transfert de fichiers (HTTP, FTP) régulés par TCP qui tolèrent les variations de débit, la voix sur IP est une application <strong>temps réel hautement intolérante au délai et à la gigue</strong>. Selon la recommandation <strong>ITU-T G.114</strong>, les seuils maximaux admissibles pour une communication fluide sont :</p>',
        '<ul>',
        '  <li><strong>Délai unidirectionnel (One-Way Latency) :</strong> &le; <code>150 ms</code> (au-delà, les interlocuteurs se coupent mutuellement la parole).</li>',
        '  <li><strong>Gigue (Jitter) :</strong> &le; <code>30 ms</code> (au-delà, le buffer de gigue sature ou se vide, provoquant des blancs audibles).</li>',
        '  <li><strong>Taux de pertes de paquets :</strong> &le; <code>1.0%</code> (au-delà, les mots sont hachés et la compréhension se dégrade fortement).</li>',
        '</ul>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Qualité de Service Couche 2 (Réseau Local)</h4>',
        '    <ul>',
        '      <li><strong>Voice VLAN (IEEE 802.1Q) :</strong> Isole logiquement les flux voix des tempêtes de broadcast, du trafic broadcast PC et des malwares sur un VLAN dédié (ex: VLAN 20).</li>',
        '      <li><strong>Balisage IEEE 802.1p CoS :</strong> Attribue la valeur <code>CoS = 5 (Voice)</code> dans le champ d\'en-tête Ethernet 802.1Q pour accorder une priorité absolue sur les ports des commutateurs.</li>',
        '      <li><strong>LLDP-MED / CDP :</strong> Découverte automatique des téléphones IP par les switches pour configurer le Voice VLAN et le PoE sans intervention manuelle.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Qualité de Service Couche 3 (Routage IP)</h4>',
        '    <ul>',
        '      <li><strong>DiffServ (RFC 2474) :</strong> Utilisation du champ ToS (Type of Service) de 8 bits de l\'en-tête IPv4, réinterprété en champ DS (Differentiated Services).</li>',
        '      <li><strong>Marquage RTP :</strong> <code>DSCP EF (Expedited Forwarding = 46 décimal / 0xB8 ToS)</code>, garantissant un traitement en file de priorité stricte (LLQ - Low Latency Queueing).</li>',
        '      <li><strong>Marquage SIP :</strong> <code>DSCP CS3 (24)</code> ou <code>AF31 (26)</code> pour protéger la signalisation d\'appel.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Problématique du NAT & Mécanismes de Traversée (STUN, TURN, ICE)',
      html: [
        '<p>La translation d\'adresses réseau (NAT / Network Address Translation) brise le modèle de connectivité de bout en bout d\'Internet et constitue la cause principale des pannes en téléphonie sur IP (notamment le syndrome redouté du <strong>One-Way Audio</strong>, où un seul des correspondants entend la voix de l\'autre).</p>',
        '<div class="card">',
        '  <h4>Pourquoi le NAT perturbe-t-il la ToIP ?</h4>',
        '  <p>Les protocoles SIP et SDP transportent des adresses IP et des ports directement <em>à l\'intérieur</em> de la charge utile de leurs messages (ex: <code>Contact: &lt;sip:101@192.168.1.50&gt;</code> et <code>c=IN IP4 192.168.1.50</code>). Le routeur NAT classique traduit l\'en-tête IP externe du paquet, mais ne modifie pas les adresses privées insérées dans le texte SIP/SDP. L\'interlocuteur distant tente alors d\'émettre ses flux audio RTP vers une adresse IP privée <code>192.168.1.50</code> non routable sur Internet, ce qui conduit à la perte intégrale du média.</p>',
        '</div>',
        '<div class="card">',
        '  <h4>Technologies de Traversée de NAT (STUN, TURN, ICE)</h4>',
        '  <ul>',
        '    <li><strong>STUN (RFC 8489) :</strong> Un serveur renseigne le client sur l\'adresse et le port observés pour une requête. Cette observation ne garantit pas la communication directe avec un pair : le filtrage et la topologie comptent également.</li>',
        '    <li><strong>TURN (RFC 8656) :</strong> Un relais peut transporter le média lorsqu\'un chemin direct utilisable n\'est pas disponible ; son utilisation dépend des candidats et des règles du réseau, pas uniquement d\'une étiquette de NAT.</li>',
        '    <li><strong>ICE (RFC 8445) :</strong> Les pairs échangent des candidats, notamment locaux, réflexifs et éventuellement relayés, puis effectuent des vérifications de connectivité avant de sélectionner une paire utilisable.</li>',
        '    <li><strong>SIP ALG (Application Layer Gateway) :</strong> Un module de réécriture SIP peut être utile ou perturber certains déploiements. Vérifier sa compatibilité et tester la configuration avant de le désactiver si nécessaire.</li>',
        '  </ul>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie : QoS Réseau & Résolution des Pannes NAT',
  method: [
    'Dimensionner les capacités de trunks : calculer le trafic offert en Erlangs à l\'heure de pointe et utiliser la loi d\'Erlang B pour provisionner les canaux avec un GoS <= 1%.',
    'Déployer la ségrégation Voice VLAN : configurer le balisage 802.1Q et CoS 5 sur les commutateurs avec détection automatique LLDP-MED des téléphones IP.',
    'Activer le marquage DiffServ / LLQ : configurer les règles de marquage DSCP EF (46) pour les médias RTP et allouer une bande passante prioritaire stricte sur les routeurs WAN.',
    'Diagnostiquer les règles de filtrage et les candidats ICE ; vérifier si le SIP ALG ou un contrôleur de session SBC convient au déploiement.'
  ],

  summary: [
    'L\'intensité de trafic s\'exprime en Erlangs (A = Appels * Durée / 3600) ; la loi d\'Erlang B calcule la probabilité de blocage sur N canaux sans attente.',
    'Les exigences ITU-T G.114 pour la voix imposent une latence <= 150 ms, une gigue <= 30 ms et des pertes de paquets <= 1.0%.',
    'La QoS combine Voice VLAN (802.1Q) et CoS 5 en couche 2, et marquage DSCP EF (46) avec file d\'attente LLQ en couche 3.',
    'Le NAT classique provoque le phénomène de One-Way Audio en laissant des adresses IP privées dans les en-têtes Contact SIP et les offres médias SDP.',
    'STUN fournit une adresse observée, ICE vérifie des paires de candidats et TURN peut fournir un relais si le chemin direct ne convient pas.'
  ],

  checklist: [
    'Savez-vous calculer le trafic en Erlangs pour un volume d\'appels et une durée moyenne donnés ?',
    'Comprenez-vous la formule récursive d\'Erlang B et l\'impact du Grade of Service (GoS) sur le dimensionnement ?',
    'Connaissez-vous les valeurs de marquage recommandées pour la voix : DSCP EF 46 (ToS 0xB8) et 802.1p CoS 5 ?',
    'Pourquoi le passage à travers un routeur NAT provoque-t-il fréquemment des communications en One-Way Audio ?',
    'Quelle est la différence fondamentale de fonctionnement entre un serveur STUN et un serveur TURN ?'
  ],

  notions: [
    { term: 'Erlang (Unité)', def: 'Mesure de l\'intensité du trafic téléphonique correspondant à l\'occupation continue d\'un canal pendant une heure.' },
    { term: 'Loi d\'Erlang B', def: 'Modèle mathématique récursif calculant la probabilité de rejet d\'appels sur un faisceau de N canaux sans file d\'attente.' },
    { term: 'Voice VLAN', def: 'Réseau local virtuel 802.1Q dédié isolant le trafic téléphonique du trafic de données bureautique.' },
    { term: 'DSCP EF (46)', def: 'Expedited Forwarding : classe de service DiffServ prioritaire garantissant un transit immédiat sans mise en attente.' },
    { term: 'One-Way Audio', def: 'Anomalie ToIP où l\'audio ne circule que dans un seul sens, causée par la présence d\'une IP privée non routable dans le SDP.' },
    { term: 'STUN / TURN', def: 'Protocoles standards de découverte d\'adresse réflexive (STUN) et de relais de flux médias (TURN) pour traverser le NAT.' }
  ],

  pitfalls: [
    'Supposer qu\'un SIP ALG est toujours adapté ou toujours nuisible sans vérifier son comportement dans le déploiement.',
    'Négliger la réservation de bande passante prioritaire (LLQ) sur le routeur WAN, provoquant une dégradation immédiate de la voix dès qu\'un utilisateur télécharge un fichier volumineux.',
    'Dimensionner un trunk téléphonique sur la moyenne de la journée au lieu de l\'heure de pointe (Busy Hour), provoquant des saturations quotidiennes.',
    'Confondre découverte de mappage et preuve de connectivité directe : vérifier les paires ICE et prévoir un relais selon les résultats.'
  ],

  questions: [
    {
      stem: 'Une entreprise enregistre 120 appels d\'une durée moyenne de 180 secondes pendant l\'heure de pointe. Quel est le trafic téléphonique offert A exprimé en Erlangs ?',
      opts: ['3.00 Erlangs', '6.00 Erlangs', '10.00 Erlangs', '21.60 Erlangs'],
      correct: 1,
      exp: 'A = (Nb_appels * Duree_sec) / 3600 = (120 * 180) / 3600 = 21 600 / 3600 = 6.00 Erlangs.'
    },
    {
      stem: 'Quelle valeur décimale de marquage DSCP (Differentiated Services Code Point) est standardisée par l\'IETF pour les flux voix temps réel RTP (classe Expedited Forwarding EF) ?',
      opts: ['0 (CS0)', '24 (CS3)', '34 (AF41)', '46 (EF)'],
      correct: 3,
      exp: 'La classe Expedited Forwarding (EF) correspond à la valeur décimale 46 (binaire 101110), décalée de 2 bits dans le champ ToS (valeur 184 soit 0xB8).'
    },
    {
      stem: 'Quel marquage de priorité de niveau 2 (IEEE 802.1p CoS) est universellement attribué aux trames Ethernet circulant sur un Voice VLAN pour les flux voix ?',
      opts: ['CoS 0', 'CoS 3', 'CoS 5', 'CoS 7'],
      correct: 2,
      exp: 'La valeur 802.1p CoS 5 est standardisée pour la voix (Voice), CoS 3 étant réservée à la signalisation d\'appel (Call Signaling).'
    },
    {
      stem: 'Quel est le seuil maximal de délai de transmission unidirectionnel (One-Way Latency) recommandé par l\'ITU-T G.114 pour préserver une conversation téléphonique naturelle ?',
      opts: ['50 ms', '150 ms', '300 ms', '500 ms'],
      correct: 1,
      exp: 'L\'ITU-T G.114 recommande un délai unidirectionnel inférieur ou égal à 150 ms pour que la communication reste interactive sans que les locuteurs ne se coupent la parole.'
    },
    {
      stem: 'Quelle anomalie typique de téléphonie IP se produit lorsqu\'un routeur NAT ne traduit pas l\'adresse IP privée insérée dans le corps SDP d\'une réponse 200 OK ?',
      opts: ['Le téléphone refuse de sonner', 'L\'appel est redirigé vers la police', 'Le phénomène de One-Way Audio (audio unidirectionnel)', 'Le combiné redémarre en boucle'],
      correct: 2,
      exp: 'L\'émetteur externe tente d\'envoyer son flux RTP vers l\'IP privée non routable du récepteur, causant une absence totale de son dans un sens (One-Way Audio).'
    },
    {
      stem: 'Deux serveurs STUN observent le même mappage pour un client. Que peut-on en conclure pour la communication avec un pair ?',
      opts: ['Le pair est nécessairement joignable directement', 'Les mappages observés sont identiques, mais la connectivité doit être vérifiée', 'Aucun pare-feu ne filtre le trafic', 'Le client ne traverse aucun NAT'],
      correct: 1,
      exp: 'La comparaison de ces deux observations ne prouve ni le filtrage ni la joignabilité du pair ; ICE vérifie des paires de candidats et TURN peut fournir un relais.'
    },
    {
      stem: 'Quelle action d\'administration réseau est fortement recommandée sur les passerelles Internet pour éviter que les messages SIP ne soient altérés ou corrompus ?',
      opts: ['Activer le proxy transparent', 'Désactiver le module SIP ALG (Application Layer Gateway)', 'Bloquer les paquets UDP', 'Réduire la MTU à 500 octets'],
      correct: 1,
      exp: 'Les implémentations de SIP ALG sur les routeurs sont fréquemment boguées et altèrent les paquets SIP. Il est recommandé de désactiver SIP ALG.'
    },
    {
      stem: 'Quel protocole réseau permet à un commutateur Ethernet d\'informer automatiquement un téléphone IP du numéro de Voice VLAN et des paramètres PoE à utiliser dès son raccordement ?',
      opts: ['SNMP', 'LLDP-MED (ou CDP)', 'BGP', 'OSPF'],
      correct: 1,
      exp: 'LLDP-MED (Link Layer Discovery Protocol - Media Endpoint Discovery) et CDP (Cisco) configurent automatiquement le Voice VLAN et l\'alimentation PoE du combiné.'
    }
  ],

  flashcards: [
    {
      q: 'Qu\'est-ce que l\'Erlang en téléphonie ?',
      a: 'L\'unité d\'intensité de trafic correspondant à l\'occupation continue d\'un canal téléphonique pendant une heure (A = Appels * Durée / 3600).'
    },
    {
      q: 'À quoi sert la formule d\'Erlang B ?',
      a: 'À calculer la probabilité de blocage (GoS) sur un trunk de N canaux téléphoniques sans file d\'attente.'
    },
    {
      q: 'Quels sont les seuils maximaux recommandés pour la voix (latence, gigue, perte) ?',
      a: 'Délai unidirectionnel <= 150 ms, gigue <= 30 ms, perte de paquets <= 1.0% (ITU-T G.114).'
    },
    {
      q: 'Quels marquages QoS sont appliqués à la voix RTP ?',
      a: 'DSCP EF (46 en couche 3, ToS 0xB8) et IEEE 802.1p CoS 5 (en couche 2 sur le Voice VLAN).'
    },
    {
      q: 'Qu\'est-ce que le phénomène de One-Way Audio ?',
      a: 'Une absence de son dans un sens due à la présence d\'une adresse IP privée locale non routable dans l\'en-tête SDP à travers un NAT.'
    },
    {
      q: 'Quelle est la différence entre STUN et TURN ?',
      a: 'STUN renseigne une adresse observée mais ne garantit pas une liaison directe ; TURN peut fournir un relais, utilisé selon les vérifications de connectivité.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions d\'Erlang B, QoS et NAT mal comprises. Relisez les sections et refaites le test.' },
    { cls: 'mid', text: 'Score 60-74 % : Principes généraux acquis. Entraînez-vous au calcul du trafic en Erlangs et aux règles de marquage DSCP.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise technique. Approfondissez les rôles respectifs de STUN, TURN et des vérifications ICE.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez le dimensionnement télécoms et la garantie de qualité de service ToIP.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'ingénieur télécoms. Prêt pour les fonctionnalités avancées et la sécurité du Module 6 !' }
  ]
};
