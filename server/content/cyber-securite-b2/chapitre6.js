/**
 * Chapitre 6 du cours « Cybersécurité » B2 — Détection d'Intrusions (NIDS/SIEM), Analyse de Traces & Réponse aux Incidents.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Détection d’Intrusions (NIDS/SIEM), Analyse de Traces &amp; Réponse aux Incidents',
  short: 'Détection &amp; Incidents',
  toc: 'Systèmes de détection d’intrusions NIDS/HIDS (moteur de signatures Snort/Suricata), centralisation et corrélation de journaux SIEM, typologie des dénis de service (SYN Flood, amplification UDP), ransomwares et méthodologie de réponse à incident NIST SP 800-61.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'À 3 h 12 du matin, le centre de surveillance opérationnelle (SOC) reçoit une cascade d’alertes critiques : ' +
    'un volume anormal de requêtes sortantes vers des adresses IP suspectes et des extensions de fichiers renommées en masse ' +
    'avec le suffixe .locked sur le serveur de stockage principal. Un rançongiciel est en train de chiffrer les données de l’entreprise. ' +
    'Comment les sondes NIDS et les règles de signatures détectent-elles les flux malveillants ? ' +
    'Comment le SIEM corrèle-t-il les événements provenant des pare-feux, serveurs web et contrôleurs de domaine ? ' +
    'Quelles mesures immédiates de confinement et d’éradication l’équipe CSIRT/CERT doit-elle appliquer pour endiguer l’attaque sans détruire les preuves numériques ? ' +
    'Ce module étudie la veille défensive, l’analyse des traces et la gestion méthodique des crises cybernétiques.',

  objectives: [
    'analyser la structure d’une règle de détection NIDS Snort (en-tête, options content, sid, rev, threshold) ;',
    'comprendre l’architecture d’un SIEM (collecte d’événements Syslog/EventLog, normalisation, indexation et règles de corrélation) ;',
    'expliquer les mécanismes d’attaques DDoS (SYN Flood, amplification DNS/NTP) et les stratégies de mitigation (SYN Cookies, scrubbing) ;',
    'décortiquer la chaîne d’infection d’un ransomware moderne (accès initial, mouvement latéral, exfiltration, chiffrement, double extorsion) ;',
    'appliquer les 6 étapes de la méthodologie de gestion d’incidents de sécurité selon le standard NIST SP 800-61.'
  ],

  sections: [
    {
      title: 'Systèmes de détection d’intrusions (IDS) &amp; Moteur de règles Snort',
      html: [
        '<p>Un système de détection d’intrusions surveille les activités suspectes et génère des alertes sans modifier le trafic en transit (mode passif sur port miroir SPAN ou TAP réseau). ' +
        'À l’inverse, un IPS (Intrusion Prevention System) est placé en coupure (in-line) et bloque activement les paquets malveillants.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">NIDS vs HIDS</h4>',
        '    <ul>',
        '      <li><strong>NIDS (Network IDS - Snort, Suricata, Zeek) :</strong> Analyse le flux réseau brut circulant sur les segments, inspecte les en-têtes TCP/IP et les charges utiles applicatives. Limite : aveugle face aux trafics chiffrés (TLS) sans déchiffrement intermédiaire.</li>',
        '      <li><strong>HIDS / EDR (Host IDS / Endpoint Detection &amp; Response - Wazuh, OSSEC) :</strong> Installé directement sur les hôtes, surveille les fichiers journaux, l’intégrité des fichiers système (FIM), les appels noyau et les créations suspectes de processus.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Approches de détection</h4>',
        '    <ul>',
        '      <li><strong>Détection par signatures :</strong> Compare le trafic à une base de motifs connus (chaînes d’octets, hash, regex). Très rapide et faible taux de faux positifs, mais incapable de bloquer une vulnérabilité 0-day inconnue.</li>',
        '      <li><strong>Détection comportementale / par anomalies :</strong> Établit une référence du trafic normal et alerte en cas d’écart statistique notable (débit inhabituel, volume de requêtes). Détecte les menaces émergentes mais génère davantage de faux positifs.</li>',
        '    </ul>',
        '  </div>',
        '</div>',

        '<h4>Syntaxe d’une règle Snort</h4>',
        '<p>Une règle Snort se divise en deux parties distinctes : l’en-tête (Header) et les options de la règle (Rule Options).</p>',

        '<div class="code-block">' +
        'alert tcp $EXTERNAL_NET any -&gt; $HOME_NET 80 (msg:"ATTACK-RESPONSES /etc/passwd disclosure"; content:"root:x:0:0:"; nocase; sid:1000001; rev:1;)' +
        '</div>',

        '<table class="table-compact">',
        '  <thead>',
        '    <tr><th>Composant</th><th>Exemple</th><th>Rôle</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>Action</strong></td><td><code>alert</code>, <code>drop</code>, <code>pass</code></td><td>Action déclenchée lorsque le paquet correspond aux critères.</td></tr>',
        '    <tr><td><strong>Protocole</strong></td><td><code>tcp</code>, <code>udp</code>, <code>icmp</code>, <code>ip</code></td><td>Protocole de la couche réseau ou transport ciblé.</td></tr>',
        '    <tr><td><strong>Source / Destination</strong></td><td><code>$EXTERNAL_NET any -&gt; $HOME_NET 80</code></td><td>IP et ports source vers IP et ports destination.</td></tr>',
        '    <tr><td><strong>msg</strong></td><td><code>"Web Shell Detected"</code></td><td>Description textuelle de l’alerte transmise au SOC.</td></tr>',
        '    <tr><td><strong>content</strong></td><td><code>"cmd.exe"</code></td><td>Motif textuel ou binaire recherché dans la charge utile.</td></tr>',
        '    <tr><td><strong>sid</strong></td><td><code>sid:1000001</code></td><td>Identifiant unique de la règle (1 à 999999 réservés Snort, &ge; 1000000 pour les règles locales).</td></tr>',
        '    <tr><td><strong>rev</strong></td><td><code>rev:2</code></td><td>Numéro de révision de la règle lors des mises à jour.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Centralisation des journaux, SIEM &amp; Détection d’attaques DDoS',
      html: [
        '<p>Dans une infrastructure d’entreprise, des milliers d’équipements génèrent quotidiennement des millions de lignes de logs (pare-feux, serveurs web, annuaires Active Directory, bases de données). ' +
        'Sans outil unifié, la détection précoce d’une intrusion transverse est matériellement impossible.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Architecture d’un SIEM (Security Information and Event Management)</h4>',
        '    <ul>',
        '      <li><strong>Collecte &amp; Réception :</strong> Agents locaux ou flux Syslog (UDP/TCP 514, TLS 6514) et Event Forwarding (WEC).</li>',
        '      <li><strong>Normalisation :</strong> Traduction de formats hétérogènes vers un schéma commun (ex. Elastic Common Schema - ECS).</li>',
        '      <li><strong>Indexation &amp; Stockage :</strong> Base temporelle rapide (OpenSearch, Splunk, Graylog) pour les recherches à grande échelle.</li>',
        '      <li><strong>Moteur de corrélation :</strong> Détection de scénarios complexes reliant plusieurs événements (ex. 5 échecs de connexion SSH sur 1 minute suivis d’une réussite, puis ajout d’une clé sudoer).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Attaques par déni de service distribué (DDoS)</h4>',
        '    <ul>',
        '      <li><strong>SYN Flood (Épuisement des ressources TCP) :</strong> L’attaquant envoie une masse de paquets TCP SYN avec des IP sources usurpées (spoofées), sans jamais répondre aux SYN-ACK du serveur. La table des demi-connexions de l’OS se sature. Mitigation : <em>SYN Cookies</em>.</li>',
        '      <li><strong>Amplification UDP (DNS / NTP / Memcached) :</strong> L’attaquant envoie de courtes requêtes UDP vers des résolveurs ouverts avec l’IP source de la victime. Les réponses renvoyées sont 50 à 500 fois plus volumineuses que la requête, saturant la bande passante de la cible.</li>',
        '      <li><strong>Inondation applicative HTTP (Slowloris / HTTP Flood) :</strong> Maintien de milliers de requêtes HTTP incomplètes pour saturer les threads du serveur web.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Ransomwares, Chaîne d’Infection &amp; Gestion des Incidents (NIST SP 800-61)',
      html: [
        '<p>Le rançongiciel (ransomware) est l’une des cybermenaces les plus dévastatrices pour les organisations. ' +
        'Les groupes criminels modernes pratiquent la <em>double extorsion</em> : exfiltration préalable des données confidentielles sous menace de publication, ' +
        'suivie du chiffrement intégral des disques et sauvegardes en ligne.</p>',

        '<div class="card">',
        '  <h4 class="card-title">Les 6 phases de gestion d’un incident de sécurité (NIST SP 800-61 Rev. 2)</h4>',
        '  <ol>',
        '    <li><strong>1. Préparation (Preparation) :</strong> Mise en place des outils de surveillance, politiques de sécurité, procédures de crise, sauvegardes immuables hors-ligne (règle 3-2-1) et formation des équipes de réponse (CSIRT).</li>',
        '    <li><strong>2. Détection &amp; Analyse (Detection &amp; Analysis) :</strong> Réception des alertes SIEM/EDR, triage, vérification des indicateurs de compromission (IoC : adresses IP, hash de fichiers, domaines C2) et qualification de la gravité.</li>',
        '    <li><strong>3. Confinement (Containment) :</strong> Stopper la propagation de l’attaque sans détruire les traces volatiles (isolation réseau de la machine, blocage des ports aux pare-feux, suspension temporaire de comptes compromis).</li>',
        '    <li><strong>4. Éradication (Eradication) :</strong> Nettoyage complet des systèmes infectés (suppression des malwares, fermeture des failles de sécurité exploitées, rotation de tous les mots de passe et clés compromises).</li>',
        '    <li><strong>5. Recouvrement (Recovery) :</strong> Restauration progressive des services à partir de sauvegardes certifiées saines, tests d’intégrité et surveillance renforcée du trafic post-redémarrage.</li>',
        '    <li><strong>6. Leçons apprises / Post-Mortem (Post-Incident Activity) :</strong> Rapport d’incident détaillant la chronologie, analyse des causes racines, évaluation de l’efficacité des réponses et mise à jour du plan de défense.</li>',
        '  </ol>',
        '</div>',

        box(
          'Préserver les preuves numériques (Forensics)',
          'Lors d’un incident grave, n’éteignez jamais brusquement une machine infectée en coupant l’alimentation secteur ! ' +
          'La mémoire vive (RAM) contient des données volatiles capitales (processus injectés, clés de déchiffrement résiduelles, ' +
          'sockets réseau actives et mots de passe en mémoire). Isolez la machine du réseau (débranchez le câble Ethernet ou désactivez le Wi-Fi) ' +
          'et effectuez une capture de mémoire vive (dump RAM avec LiME ou FTK Imager) avant toute investigation.'
        )
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Dans une règle de détection Snort, quel paramètre sert à définir l’identifiant numérique unique de la règle ?',
      opts: [
        'sid (Snort ID)',
        'rev (Revision ID)',
        'gid (Generator ID)',
        'classtype'
      ],
      correct: 0,
      exp: 'L’option sid (Snort ID) définit l’identifiant unique de la règle. Les numéros &ge; 1 000 000 sont réservés pour les règles locales définies par l’administrateur.'
    },
    {
      stem: 'Quelle est la principale différence opérationnelle entre un NIDS (ex. Snort en écoute passive) et un NIPS ?',
      opts: [
        'Le NIDS analyse les flux en copie sans bloquer le trafic, alors que le NIPS est placé en coupure (in-line) et peut rejeter les paquets malveillants',
        'Le NIDS déchiffre automatiquement le trafic HTTPS, contrairement au NIPS',
        'Le NIDS ne fonctionne que sur le réseau local, alors que le NIPS ne protège que le cloud',
        'Le NIDS remplace un pare-feu matériel, alors que le NIPS ne surveille que les emails'
      ],
      correct: 0,
      exp: 'Le NIDS écoute passivement le trafic (via un port miroir SPAN ou un TAP) pour alerter sans impacter la latence réseau, tandis que le NIPS intercepte le trafic en coupure directe et neutralise les attaques en temps réel.'
    },
    {
      stem: 'Comment la contre-mesure « SYN Cookies » protège-t-elle un serveur contre une attaque DDoS par SYN Flood ?',
      opts: [
        'En encodant les informations de connexion dans le numéro de séquence initial TCP (ISN) sans allouer de mémoire noyau tant que le ACK final n’est pas reçu',
        'En bloquant automatiquement toutes les adresses IP d’origine asiatique ou américaine',
        'En forçant le client à utiliser un cookie HTTP avant d’autoriser la négociation TCP',
        'En augmentant la taille de la mémoire vive allouée au pare-feu d’entreprise'
      ],
      correct: 0,
      exp: 'Les SYN Cookies évitent la saturation de la table des demi-connexions : le serveur calcule un ISN cryptographique contenant les paramètres de la connexion. La structure mémoire n’est allouée que si le client renvoie un paquet ACK valide contenant ce cookie.'
    },
    {
      stem: 'Dans le cycle de gestion des incidents NIST SP 800-61, quelle est la priorité immédiate lors de la phase de « Confinement » (Containment) ?',
      opts: [
        'Limiter la propagation de l’attaque à d’autres machines du système d’information sans altérer les preuves numériques volatiles',
        'Réinstaller immédiatement le système d’exploitation de la machine infectée à neuf',
        'Rédiger le rapport de leçons apprises pour la direction générale',
        'Contacter les attaquants pour négocier le montant de la rançon'
      ],
      correct: 0,
      exp: 'Le confinement vise à circonscrire l’incident (ex. isolement réseau d’une machine ou coupure d’un VLAN) pour empêcher la contamination latérale, tout en préservant l’état mémoire pour l’analyse médico-légale.'
    },
    {
      stem: 'Quelle caractéristique distingue une attaque DDoS par amplification DNS d’une inondation classique ?',
      opts: [
        'L’attaquant usurpe l’adresse IP de la victime dans des requêtes UDP vers des serveurs récursifs ouverts qui renvoient des réponses beaucoup plus massives à la cible',
        'L’attaquant prend le contrôle physique du routeur frontière de la victime',
        'Le trafic est entièrement encapsulé dans un tunnel SSH sécurisé',
        'L’attaque s’arrête automatiquement dès que la victime redémarre son serveur DNS'
      ],
      correct: 0,
      exp: 'L’amplification UDP tire parti de l’absence de connexion en UDP : en forgeant l’IP source (spoofing) et en envoyant des requêtes provoquant de très grosses réponses DNS, le volume de trafic reçu par la victime est multiplié par un facteur de 50 à 70.'
    }
  ],

  pitfalls: [
    'Éteindre ou débrancher électriquement un serveur infecté au lieu de l’isoler logiquement du réseau, ce qui détruit irrémédiablement la mémoire vive (RAM) et les preuves d’injection de code.',
    'Penser qu’un NIDS sans déchiffrement SSL/TLS peut inspecter le contenu des charges utiles applicatives chiffrées en HTTPS.',
    'Créer des règles de détection Snort trop permissives (ex. content:"GET") qui inondent la console SOC de faux positifs inexploitables.',
    'Restaurez des sauvegardes après une attaque de ransomware sans avoir identifié et colmaté au préalable la faille d’accès initial.',
    'Négliger la phase post-mortem (leçons apprises), garantissant que la même faille sera exploitée à nouveau quelques semaines plus tard.'
  ],

  methodTitle: 'Protocole opérationnel en 4 étapes de gestion d’un incident de sécurité critique',
  method: [
    'Qualifier et catégoriser l’alerte : corréler les logs SIEM, valider les IoC (adresses IP d’attaquants, hash de malwares, signatures Snort) et mesurer le niveau de sévérité.',
    'Isoler immédiatement les hôtes compromis : déconnexion physique ou logique du réseau (isolement EDR) pour stopper la dissémination latérale sans couper le système.',
    'Acquérir les artefacts médico-légaux (forensics) : dump de la mémoire RAM volatile, capture des journaux de connexion et création d’une image disque bit-à-bit.',
    'Éradiquer la menace et restaurer les services : fermeture des vecteurs d’intrusion, réinitialisation de tous les secrets d’authentification et remise en production progressive.'
  ],

  summary: [
    'Les NIDS (Snort, Suricata) analysent passivement le trafic réseau par signatures d’octets et règles d’en-tête (action, protocoles, content, sid).',
    'Un SIEM agrège et normalise les logs d’équipements variés pour corréler des scénarios d’attaques avancés.',
    'Les attaques DDoS exploitent l’épuisement des états (SYN flood contré par SYN Cookies) ou l’asymétrie de protocoles sans état (amplification UDP).',
    'La chaîne d’attaque par ransomware associe intrusion initiale, élévation de privilèges, propagation latérale, double extorsion et chiffrement destructeur.',
    'Le référentiel NIST SP 800-61 structure la réponse à incident en 6 phases : Préparation, Détection, Confinement, Éradication, Recouvrement et Leçons apprises.'
  ],

  checklist: [
    'Je connais la syntaxe et les champs obligatoires d’une règle de détection Snort (action, protocole, en-tête, options, sid).',
    'Je sais distinguer le rôle d’un NIDS passif de celui d’un NIPS actif.',
    'Je comprends l’intérêt des SYN Cookies face à une attaque par déni de service SYN Flood.',
    'Je sais expliquer le principe d’une attaque DDoS par réflexion et amplification UDP.',
    'Je maîtrise l’ordre des 6 phases du cycle de réponse à incident NIST SP 800-61.',
    'Je sais pourquoi il ne faut jamais éteindre un serveur compromis avant d’avoir extrait la RAM.'
  ],

  notions: [
    'NIDS (Network Intrusion Detection System)',
    'Règles et signatures Snort (sid, rev, content)',
    'SIEM et corrélation de journaux de sécurité',
    'Attaques DDoS SYN Flood et SYN Cookies',
    'Amplification et réflexion UDP (DNS, NTP)',
    'Ransomwares et modèle de double extorsion',
    'Méthodologie NIST SP 800-61',
    'Forensics numérique et acquisition de mémoire RAM'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les bases des signatures NIDS Snort et les étapes du cycle NIST.' },
    { cls: 'mid', text: '50–69 % — Consolide tes acquis sur la corrélation SIEM et les techniques de mitigation DDoS.' },
    { cls: 'good', text: '70–89 % — Très bon niveau : tu maîtrises les principes de détection et la réaction aux incidents cyber.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise d’expert : tu es prêt pour auditer et défendre des architectures complexes en B2 !' }
  ],

  flashcards: [
    { q: 'Quelle est la fonction du paramètre sid dans une règle Snort ?', a: 'Il attribue un identifiant unique (Snort ID) à la règle pour faciliter son traçage et sa gestion dans les alertes du SOC.' },
    { q: 'Pourquoi un NIDS passif est-il incapable d’interrompre directement une connexion malveillante ?', a: 'Parce qu’il écoute une copie du flux sur un port miroir et n’est pas positionné en coupure directe (in-line) sur le flux réseau.' },
    { q: 'Comment les SYN Cookies protègent-ils un serveur contre un SYN Flood ?', a: 'Ils encodent l’état de la connexion dans le numéro de séquence TCP initial (ISN), évitant d’allouer de la mémoire tant que le ACK final du client n’est pas reçu.' },
    { q: 'Quel est l’objectif de l’amplification UDP dans une attaque DDoS ?', a: 'Envoyer de petites requêtes forgées à des serveurs tiers pour qu’ils inondent la cible de réponses jusqu’à 50 à 100 fois plus volumineuses.' },
    { q: 'Quelles sont les 6 phases de la réponse à incident selon le NIST SP 800-61 ?', a: '1. Préparation, 2. Détection & Analyse, 3. Confinement, 4. Éradication, 5. Recouvrement, 6. Activités post-incident (Leçons apprises).' },
    { q: 'Pourquoi ne faut-il pas couper l’alimentation d’un serveur victime d’un ransomware ?', a: 'Pour ne pas perdre la mémoire vive (RAM) qui contient les clés de chiffrement éphémères, les processus malveillants et les connexions réseau actives.' }
  ]
};
