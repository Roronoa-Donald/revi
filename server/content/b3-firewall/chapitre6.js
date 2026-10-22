/**
 * Chapitre 6 du cours « Firewall & Sécurité Réseau B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Déploiement Linux Netfilter (iptables / nftables), Logs &amp; Intégration SIEM',
  short: 'iptables, nftables &amp; SIEM',
  toc: 'Architecture du sous-système netfilter du noyau Linux, comparaison syntaxique iptables vs nftables, analyse statistique des logs pare-feu, détection de force brute et bannissement dynamique avec Fail2ban/SIEM.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Sur les serveurs et appliances de sécurité d’entreprise (passerelles Debian, Red Hat, pare-feux logiciels pfSense ou VyOS), la mise en œuvre pratique du filtrage repose sur le sous-système netfilter intégré au noyau Linux. Longtemps administré via l’outil historique iptables, le standard moderne est aujourd’hui nftables, offrant une syntaxe unifiée, des performances accrues et un moteur de traitement en bytecode dans le noyau. Mais configurer un pare-feu ne suffit pas : sans exploitation continue des journaux d’événements (logs), l’administrateur reste aveugle aux tentatives de compromission. L’ingénieur réseau et sécurité de niveau Bachelor 3 doit savoir traduire des politiques théoriques en scripts netfilter robustes, analyser les journaux de trafic pour en extraire des métriques d’attaque (top ports ciblés, adresses IP assaillantes) et automatiser la réaction défensive en intégrant des outils de bannissement dynamique (Fail2ban) et un système de gestion des informations et des événements de sécurité (SIEM).',
  objectives: [
    'maîtriser l’architecture interne du sous-système Linux netfilter (tables, chaînes et hooks noyau) ;',
    'comparer et traduire avec rigueur des jeux de règles entre la syntaxe iptables et la syntaxe moderne nftables ;',
    'écrire des scripts de filtrage étanches appliquant la politique Default DROP, l’état conntrack et les règles de NAT ;',
    'parser et agréger les journaux de pare-feu (logs syslog) pour extraire des indicateurs de menace pertinents ;',
    'concevoir une chaîne de réponse active automatisée par bannissement dynamique d’IP (Fail2ban et sets nftables) ;',
    'analyser et résoudre méthodologiquement des compilateurs de règles netfilter, des analyseurs de journaux et des moteurs de bannissement SIEM.'
  ],
  sections: [
    {
      title: 'L’Architecture Netfilter du Noyau Linux : Tables, Chaînes &amp; Hooks',
      html: [
        '<p><strong>Netfilter</strong> est le framework intégré directement dans le noyau Linux permettant d’intercepter, manipuler et filtrer les paquets réseau à différents points stratégiques (hooks) de la pile TCP/IP :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Cinq Chaînes Standards (Hooks)</h4>',
        '    <ul>',
        '      <li><code>PREROUTING :</code> Traite les paquets dès leur entrée sur la carte réseau avant toute décision de routage (idéal pour le DNAT).</li>',
        '      <li><code>INPUT :</code> Filtre les paquets destinés à la machine locale elle-même (ex: service SSH ou web local).</li>',
        '      <li><code>FORWARD :</code> Filtre les paquets qui traversent la machine pour aller vers un autre sous-réseau (mode routeur / passerelle).</li>',
        '      <li><code>OUTPUT :</code> Filtre les paquets générés localement par des processus de la machine elle-même.</li>',
        '      <li><code>POSTROUTING :</code> Traite les paquets juste avant leur émission sur le câble réseau (idéal pour le SNAT / Masquerade).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Les Tables Fonctionnelles</h4>',
        '    <ul>',
        '      <li><code>filter :</code> Table par défaut pour le filtrage pur (décisions ACCEPT, DROP, REJECT). Chaînes : INPUT, FORWARD, OUTPUT.</li>',
        '      <li><code>nat :</code> Table pour la translation d’adresses (SNAT, DNAT, MASQUERADE). Chaînes : PREROUTING, POSTROUTING, OUTPUT.</li>',
        '      <li><code>mangle :</code> Altération spécifique des en-têtes (TOS, TTL, marquage de paquets QoS).</li>',
        '      <li><code>raw :</code> Traitement haute performance avant l’allocation conntrack (bypass de session via NOTRACK).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Comparaison Pratique : iptables (Hérité) vs nftables (Moderne)',
      html: [
        '<p>Bien qu’iptables reste omniprésent dans les infrastructures historiques, <strong>nftables</strong> le remplace avantageusement sur toutes les distributions modernes :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Critère Technique</th><th>iptables (Hérité)</th><th>nftables (Moderne)</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td>Outils CLI</td><td>Outils éclatés : <code>iptables</code>, <code>ip6tables</code>, <code>arptables</code>, <code>ebtables</code></td><td>Un seul outil unifié : <code>nft</code> pour IPv4, IPv6, ARP et ponts Ethernet.</td></tr>',
        '    <tr><td>Performance noyau</td><td>Évaluation linéaire en C dans le noyau</td><td>Machine virtuelle à bytecode optimisée avec jeux de données (Sets) natifs.</td></tr>',
        '    <tr><td>Atomicité des règles</td><td>Mises à jour non atomiques pouvant créer des incohérences transitoires</td><td>Rechargement de configuration 100% atomique sans perte de trafic.</td></tr>',
        '    <tr><td>Syntaxe d’autorisation SSH</td><td><code>iptables -A INPUT -p tcp --dport 22 -j ACCEPT</code></td><td><code>nft add rule inet filter input tcp dport 22 accept</code></td></tr>',
        '    <tr><td>Filtrage de liste d’IPs</td><td>Nécessite l’extension externe <code>ipset</code></td><td>Ensembles dynamiques intégrés nativement : <code>ip saddr { 1.1.1.1, 2.2.2.2 } drop</code></td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Analyse des Journaux (Syslog) &amp; Réponse Active SIEM / Fail2ban',
      html: [
        '<p>Un système de filtrage efficace s’intègre dans la boucle d’observabilité et de cyberdéfense globale de l’entreprise :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Exploitation des Logs de Pare-feu</h4>',
        '    <p>Le noyau Linux journalise les paquets rejetés au format Syslog :<br>' +
        '    <code>firewall: [DROP] IN=eth0 OUT= SRC=203.0.113.5 DST=10.0.0.1 PROTO=TCP SPT=45000 DPT=22</code></p>',
        '    <p>L’analyse statistique permet d’extraire les métriques clés : taux de paquets bloqués vs acceptés, ports destination les plus souvent ciblés (ex: scan du port 22 ou 3389) et adresses IP assaillantes prépondérantes.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Bannissement Dynamique &amp; SIEM / Fail2ban</h4>',
        '    <p>Lorsqu’un outil comme <strong>Fail2ban</strong> ou un collecteur <strong>SIEM / SOAR</strong> détecte des tentatives répétées d’intrusion (ex: plus de 3 échecs d’authentification SSH en moins de 60 secondes), il ne se contente pas d’une alerte passive :</p>',
        '    <p>Il injecte immédiatement une directive dynamique dans le pare-feu (ex: ajout de l’IP dans un ensemble <code>blacklist</code> nftables) pour couper court à l’attaque avant toute compromission.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Guide Opérationnel de Déploiement d’un Script Netfilter Robuste',
  method: [
    '1. Réinitialiser proprement les règles et tables existantes pour repartir d’un état vierge.',
    '2. Définir impérativement la politique par défaut à DROP sur les chaînes INPUT et FORWARD.',
    '3. Autoriser l’interface de bouclage local (loopback lo) pour le fonctionnement des services internes du système.',
    '4. Activer en toute première règle le passage des paquets des sessions établies (ctstate established,related).',
    '5. Rejeter et journaliser immédiatement tout paquet identifié à l’état ctstate invalid.',
    '6. Déclarer les autorisations de services spécifiques (ports SSH d’administration restreints, services web autorisés).',
    '7. Mettre en œuvre le bannissement dynamique automatisé relié aux journaux d’authentification via Fail2ban ou playbooks SOAR.'
  ],
  summary: [
    'Netfilter est le cœur du filtrage réseau sous Linux, articulé autour de 5 chaînes clés (PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING).',
    'nftables remplace iptables en unifiant IPv4/IPv6 avec de meilleures performances et des rechargements atomiques.',
    'Un script pare-feu robuste commence par Default DROP, autorise la boucle locale et traite les paquets ESTABLISHED en priorité.',
    'Les journaux Syslog permettent d’identifier les tendances d’attaques et d’agréger les métriques de sécurité.',
    'L’intégration avec Fail2ban et les systèmes SIEM permet d’appliquer un bannissement dynamique automatisé des adresses malveillantes.'
  ],
  checklist: [
    'Les 5 chaînes netfilter et leur rôle dans le cheminement d’un paquet sont maîtrisés.',
    'La syntaxe comparative iptables et nftables est comprise.',
    'La structure d’un script pare-feu complet en politique Default DROP est assimilée.',
    'Le format des lignes de logs netfilter et leur parsing statistique sont compris.',
    'Le principe du bannissement dynamique d’IP via des sets nftables / Fail2ban est assimilé.',
    'Les 3 études de cas pratiques et méthodologiques (fw3-c6-e1 à fw3-c6-e3) sont validés.'
  ],
  notions: [
    'Framework Linux Netfilter',
    'Chaînes INPUT, FORWARD & OUTPUT',
    'Chaînes PREROUTING & POSTROUTING',
    'Syntaxe iptables vs nftables',
    'Ensembles (Sets) nftables',
    'Journaux Syslog de pare-feu',
    'Métriques d’analyse d’attaque',
    'Bannissement dynamique (Fail2ban/SIEM)'
  ],
  pitfalls: [
    'Appliquer une politique Default DROP sur la chaîne INPUT via SSH sans avoir préalablement autorisé sa session courante, coupant instantanément son propre accès distant.',
    'Oublier d’autoriser l’interface de bouclage locale (lo), ce qui fait planter les communications inter-processus et bases de données locales.',
    'Mélanger des règles iptables et nftables sur un même serveur, créant des conflits d’interception difficiles à déboguer.',
    'Régler un délai de bannissement Fail2ban infini sans purge périodique, entraînant une surcharge mémoire de la liste noire sur le long terme.'
  ],
  questions: [
    {
      stem: 'Quelle chaîne netfilter intercepte les paquets qui traversent la machine pare-feu pour aller d’un réseau vers un autre ?',
      opts: [
        'La chaîne FORWARD',
        'La chaîne INPUT',
        'La chaîne OUTPUT',
        'La chaîne PREROUTING'
      ],
      correct: 0,
      exp: 'La chaîne FORWARD est dédiée au filtrage des paquets en transit traversant l’équipement lorsque celui-ci agit comme passerelle ou routeur.'
    },
    {
      stem: 'Quel est le principal avantage de nftables par rapport à iptables ?',
      opts: [
        'Une syntaxe unifiée pour IPv4/IPv6, des opérations atomiques et une exécution par bytecode optimisé avec ensembles natifs',
        'Il supprime totalement le besoin de configurer des adresses IP',
        'Il remplace le protocole TCP par un protocole plus rapide',
        'Il fonctionne uniquement sans connexion réseau'
      ],
      correct: 0,
      exp: 'nftables unifie la gestion de tous les protocoles, offre des performances nettement supérieures et permet des rechargements de configuration atomiques.'
    },
    {
      stem: 'Pourquoi est-il impératif d’autoriser l’interface "lo" (Loopback) dans les règles d’un pare-feu Linux ?',
      opts: [
        'Parce que de nombreux démons locaux (ex: communication serveur web vers BDD locale) utilisent cette interface pour fonctionner',
        'Pour permettre aux utilisateurs extérieurs de télécharger les logs',
        'Pour éviter que la carte réseau physique ne chauffe trop',
        'Pour activer automatiquement le mode Wi-Fi'
      ],
      correct: 0,
      exp: 'Si le trafic local (127.0.0.1 / lo) est bloqué, les composants internes du système d’exploitation ne peuvent plus communiquer entre eux.'
    },
    {
      stem: 'Quelle chaîne netfilter est utilisée pour appliquer la translation d’adresses source (SNAT / Masquerade) lors de l’émission du paquet ?',
      opts: [
        'POSTROUTING',
        'PREROUTING',
        'INPUT',
        'FORWARD'
      ],
      correct: 0,
      exp: 'Le SNAT doit s’appliquer en POSTROUTING, c’est-à-dire après que la décision de routage a sélectionné l’interface réseau de sortie.'
    },
    {
      stem: 'Comment l’outil Fail2ban neutralise-t-il les attaques par force brute sur un serveur SSH ?',
      opts: [
        'Il surveille les logs d’authentification et ajoute dynamiquement l’adresse IP de l’attaquant dans une règle de blocage du pare-feu après un seuil d’échecs',
        'Il change automatiquement le mot de passe de l’administrateur à chaque attaque',
        'Il redémarre le serveur Linux à chaque tentative de connexion échouée',
        'Il envoie un message texte d’avertissement au pirate'
      ],
      correct: 0,
      exp: 'Fail2ban analyse les journaux en continu et ordonne à netfilter (iptables ou nftables) de DROP les paquets de l’IP assaillante pendant une durée déterminée.'
    },
    {
      stem: 'Dans quelle table netfilter applique-t-on les décisions classiques d’autorisation ou de rejet (ACCEPT / DROP) de paquets ?',
      opts: [
        'La table filter',
        'La table nat',
        'La table mangle',
        'La table raw'
      ],
      correct: 0,
      exp: 'La table filter est spécifiquement dédiée aux politiques d’acceptation ou de rejet de paquets.'
    },
    {
      stem: 'Quelle commande nftables permet d’ajouter une adresse IP à une liste noire (blacklist) dynamique de manière instantanée ?',
      opts: [
        'nft add element inet filter blacklist { IP }',
        'nft remove table inet filter',
        'nft delete rule all',
        'nft shutdown network'
      ],
      correct: 0,
      exp: 'La gestion native des éléments d’ensembles (Sets) permet d’ajouter ou de retirer des IPs de listes de blocage de façon atomique et instantanée.'
    },
    {
      stem: 'Pourquoi est-il dangereux d’exécuter "iptables -P INPUT DROP" sans avoir au préalable inséré de règle autorisant la connexion SSH courante ?',
      opts: [
        'La session SSH de l’administrateur est immédiatement coupée et il perd l’accès à distance au serveur',
        'Le serveur formate automatiquement ses disques durs',
        'La carte mère subit une surtension électrique',
        'Le processeur refuse de traiter les paquets pendant 24 heures'
      ],
      correct: 0,
      exp: 'Si la politique par défaut devient DROP sans règle autorisant la connexion active (ou le port 22), l’administrateur se verrouille lui-même hors du système.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que Netfilter ?',
      a: 'Le sous-système du noyau Linux permettant d’intercepter et de filtrer les paquets réseau via des hooks prédéfinis.'
    },
    {
      q: 'Quelles sont les 5 chaînes de netfilter ?',
      a: 'PREROUTING (avant routage), INPUT (machine locale), FORWARD (transit), OUTPUT (émis localement), POSTROUTING (après routage).'
    },
    {
      q: 'Pourquoi privilégier nftables à iptables aujourd’hui ?',
      a: 'Pour sa syntaxe unifiée IPv4/IPv6, ses performances par bytecode, ses rechargements atomiques et ses sets dynamiques natifs.'
    },
    {
      q: 'Quel est le rôle de la table nat ?',
      a: 'Effectuer la translation d’adresses réseau : SNAT (POSTROUTING) et DNAT (PREROUTING).'
    },
    {
      q: 'Comment fonctionne Fail2ban ?',
      a: 'Il analyse les logs d’authentification et déclenche le bannissement dynamique des IPs qui dépassent un seuil d’échecs.'
    },
    {
      q: 'Pourquoi autoriser l’interface de bouclage lo ?',
      a: 'Pour garantir le bon fonctionnement des communications locales inter-processus indispensables aux services du système.'
    }
  ],
  mastery: [
    { cls: 'low', text: 'Niveau initial : vous confondez les chaînes INPUT et FORWARD ou vous risquez de vous couper l’accès SSH à distance.' },
    { cls: 'medium', text: 'Niveau opérationnel : vous écrivez des scripts de filtrage iptables et nftables propres en Default DROP avec gestion de la boucle locale.' },
    { cls: 'high', text: 'Maîtrise B3 : vous orchestrez des pare-feux Linux durcis avec sets nftables dynamiques, corrélation SIEM et bannissement automatique Fail2ban.' }
  ]
};
