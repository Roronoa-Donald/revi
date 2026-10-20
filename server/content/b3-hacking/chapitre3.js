/**
 * Chapitre 3 du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

module.exports = {
  "n": 3,
  "title": "Balayage Réseau, Énumération & Cartographie des Vulnérabilités (Scanning)",
  "short": "Scanning, Énumération &amp; Nmap",
  "toc": "Mécanismes réseau de transport TCP/IP et RFC 793, techniques de scan de ports avancées avec Nmap (TCP Connect, SYN Stealth, UDP, scans furtifs FIN/Null/Xmas, ACK mapping de pare-feu), détection d'OS par fingerprinting TCP et analyse des options de paquets, énumération précise des versions logicielles et bannières, énumération de protocoles d'infrastructure critiques (SMB, NetBIOS, SNMP v1/v2c et communautés MIB, LDAP, SSH), et cartographie des vulnérabilités via Nmap Scripting Engine (NSE) et scanners automatisés.",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "situation": "Une fois la surface d'attaque extérieure identifiée, l'auditeur doit sonder activement chaque service exposé pour déterminer son état exact (ouvert, fermé ou filtré par pare-feu), identifier les versions logicielles précises et détecter les failles connues. Un scan mal paramétré peut faire planter des équipements industriels fragiles ou déclencher les alarmes d'un système IPS/SIEM. En tant qu'expert offensif B3, vous devez maîtriser la mécanique fine des sondes TCP/IP, choisir la technique de balayage la plus adaptée et orchestrer l'énumération des services clés comme SMB et SNMP pour cartographier les vulnérabilités exploitables.",
  "objectives": [
    "maîtriser la RFC 793 et le cycle de vie des paquets TCP (SYN, ACK, RST, FIN, PSH, URG) pour le balayage de ports ;",
    "différencier et exécuter les scans SYN (-sS), TCP Connect (-sT), UDP (-sU), ACK (-sA) et furtifs (-sF, -sN, -sX) ;",
    "analyser les techniques d'OS fingerprinting basées sur le TTL, la taille de fenêtre (Window Size) et les options TCP ;",
    "extraire et corréler les bannières réseau pour identifier les versions logicielles obsolètes et failles CVE associées ;",
    "conduire l'énumération de protocoles d'infrastructure (sessions nulles SMB, communautés SNMP MIB-2, LDAP) ;",
    "automatiser l'audit de sécurité via le Nmap Scripting Engine (NSE) et les scanners de vulnérabilités (OpenVAS/Nessus)."
  ],
  "sections": [
    {
      "title": "Mécanismes Réseau TCP/IP et RFC 793 au Cœur du Balayage",
      "html": "<p>Comprendre le fonctionnement des scanners de ports comme Nmap nécessite de maîtriser la poignée de mains TCP 3-way handshake définie par la RFC 793 :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Connexion TCP Normale (3-Way Handshake)</h4>\n    <ol>\n      <li>Le client émet un paquet avec le drapeau <code>SYN</code> (Synchronize) et un numéro de séquence initial <code>ISN_c</code>.</li>\n      <li>Le serveur récepteur, si le port est à l'écoute (ouvert), répond avec <code>SYN + ACK</code> (Acknowledge) contenant son propre <code>ISN_s</code> et validant <code>ISN_c + 1</code>.</li>\n      <li>Le client finalise la connexion en envoyant un paquet <code>ACK</code>. La session est établie.</li>\n    </ol>\n  </div>\n  <div class=\"card\">\n    <h4>Port Fermé ou Non Écouté</h4>\n    <p>Si aucun processus n'est en écoute sur le port ciblé, la RFC 793 impose à la pile TCP de l'hôte cible de répondre immédiatement par un paquet avec le drapeau <code>RST</code> (Reset) ou <code>RST + ACK</code>.</p>\n    <p>Si un pare-feu intermédiaire bloque ou dépose le paquet silencieusement (Drop/Deny), aucun paquet ne revient : l'état est <code>FILTERED</code> (Timeout).</p>\n  </div>\n</div>"
    },
    {
      "title": "Techniques Avancées de Sondes Nmap &amp; Cartographie de Pare-Feu",
      "html": "<p>Nmap propose un éventail complet de techniques de balayage selon les privilèges de l'auditeur et le comportement des pare-feux :</p>\n<table class=\"table\">\n  <thead><tr><th>Option Nmap</th><th>Nom de la Sonde</th><th>Privilèges Requis</th><th>Comportement Port Ouvert vs Fermé</th></tr></thead>\n  <tbody>\n    <tr><td><code>-sS</code></td><td>SYN Stealth Scan (demi-ouvert)</td><td>Root / Administrateur</td><td>Réponse <code>SYN+ACK</code> -&gt; Port OPEN (Nmap envoie aussitôt un <code>RST</code>). Réponse <code>RST</code> -&gt; CLOSED.</td></tr>\n    <tr><td><code>-sT</code></td><td>TCP Connect Scan</td><td>Utilisateur standard</td><td>Établit la connexion 3-way complète via l'API socket de l'OS. Réponse <code>RST</code> si CLOSED. Plus bruyant dans les logs.</td></tr>\n    <tr><td><code>-sU</code></td><td>UDP Scan</td><td>Root / Administrateur</td><td>Paquet UDP vide. Réponse UDP -&gt; OPEN. Paquet ICMP Port Unreachable (Type 3 Code 3) -&gt; CLOSED. Timeout -&gt; OPEN|FILTERED.</td></tr>\n    <tr><td><code>-sF / -sN / -sX</code></td><td>FIN, Null, Xmas Scans</td><td>Root / Administrateur</td><td>Sonde anormale (Null=aucun flag, Xmas=FIN+PSH+URG). Selon RFC 793 : Port ouvert -&gt; pas de réponse (OPEN|FILTERED). Port fermé -&gt; RST.</td></tr>\n    <tr><td><code>-sA</code></td><td>ACK Scan (Cartographie Pare-feu)</td><td>Root / Administrateur</td><td>Envoie un paquet ACK isolé. Utilisé pour tester les règles de filtrage avec état (RST = UNFILTERED, Timeout = FILTERED).</td></tr>\n  </tbody>\n</table>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Les Limites des Scans Inverses (FIN, Null, Xmas) face à Windows</div>\n<p>Attention en environnement hétérogène : la pile réseau TCP de Microsoft Windows (ainsi que certains équipements Cisco ou BSD anciens) ne respecte pas scrupuleusement la RFC 793 pour les paquets non sollicités. Sous Windows, la machine répond systématiquement par un paquet <code>RST</code> sur TOUS les ports, qu'ils soient ouverts ou fermés. Les scans FIN, Null et Xmas ne fonctionnent donc que face aux systèmes Unix, Linux et conformes RFC.</p>\n  </div>"
    },
    {
      "title": "Empreinte de Système d'Exploitation (OS Fingerprinting) &amp; Détection de Versions",
      "html": "<p>Nmap ne se contente pas de tester l'ouverture d'un port : il identifie le système d'exploitation sous-jacent et les versions logicielles exactes :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>OS Fingerprinting (-O)</h4>\n    <p>Chaque système d'exploitation implémente la pile TCP/IP avec des paramètres par défaut caractéristiques :</p>\n    <ul>\n      <li><strong>TTL initial (Time to Live) :</strong> 64 pour Linux/Unix/Android, 128 pour Windows, 255 pour Cisco/Solaris.</li>\n      <li><strong>TCP Window Size :</strong> taille de la fenêtre de réception lors du SYN/ACK.</li>\n      <li><strong>Options TCP :</strong> ordre et présence des options MSS (Maximum Segment Size), Window Scale, SACK (Selective ACK) et NOP.</li>\n    </ul>\n  </div>\n  <div class=\"card\">\n    <h4>Détection de Version de Service (-sV)</h4>\n    <p>Nmap envoie une série de sondes applicatives ciblées définies dans sa base <code>nmap-service-probes</code> pour forcer le service à répondre avec sa bannière.</p>\n    <p>Exemple : envoi d'une commande <code>GET / HTTP/1.0</code> pour extraire l'en-tête <code>Server: Apache/2.4.49</code> ou capture de la bannière SSH <code>SSH-2.0-OpenSSH_7.2p2</code>.</p>\n  </div>\n</div>"
    },
    {
      "title": "Énumération Approfondie des Protocoles d'Infrastructure : SMB &amp; SNMP",
      "html": "<p>Certains protocoles réseau historiques divulguent des quantités massives de données s'ils sont mal configurés :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Protocole SMB / Samba (Ports 139 / 445)</h4>\n    <p>Partage de fichiers et d'imprimantes sous Windows/Linux. Risques majeurs audités :</p>\n    <ul>\n      <li><strong>Sessions Nulles (Null Sessions) :</strong> connexion anonyme sans identifiants permettant d'énumérer la liste des utilisateurs, des groupes et des partages réseau (via <code>enum4linux</code> ou <code>nmap --script smb-enum-*</code>).</li>\n      <li><strong>Partages IPC$ et C$ accessibles :</strong> fuite de fichiers sensibles ou de scripts de déploiement contenant des mots de passe.</li>\n      <li><strong>Vulnérabilités d'exécution distante :</strong> MS17-010 (EternalBlue) permettant la prise de contrôle root/SYSTEM sans compte.</li>\n    </ul>\n  </div>\n  <div class=\"card\">\n    <h4>Protocole SNMP (Port 161 UDP)</h4>\n    <p>Protocole de gestion et supervision réseau (v1, v2c, v3). Risques majeurs :</p>\n    <ul>\n      <li><strong>Communautés par défaut en clair :</strong> utilisation des chaînes <code>public</code> (Read-Only) et <code>private</code> (Read-Write) en SNMP v1/v2c.</li>\n      <li><strong>Divulgation de MIB-2 :</strong> extraction de la liste des processus en cours, des interfaces réseau, des tables de routage, des comptes utilisateurs locaux et des logiciels installés (via <code>snmpwalk</code>).</li>\n      <li><strong>Prise de contrôle en écriture :</strong> modification de la configuration des routeurs ou commutateurs via communauté RW.</li>\n    </ul>\n  </div>\n</div>"
    },
    {
      "title": "Nmap Scripting Engine (NSE) &amp; Cartographie des Vulnérabilités",
      "html": "<pre><code># Exécution de scripts d'audit de vulnérabilités connues sur un hôte\n$ nmap -sV --script vuln 192.168.1.50\n\n# Audit spécifique SMB et détection EternalBlue\n$ nmap -p 445 --script smb-vuln-ms17-010 192.168.1.50\n\n# Audit des configurations TLS et suites cryptographiques faibles\n$ nmap -p 443 --script ssl-enum-ciphers target.com</code></pre>\n<p>Dans une chaîne d'audit d'entreprise, Nmap est complété par des scanners de vulnérabilités automatisés spécialisés (Nessus, OpenVAS, Qualys) qui maintiennent des bases de données actualisées de signatures de vulnérabilités corrélées aux identifiants CVE et CWE.</p>"
    }
  ],
  "method": [
    "Réaliser une découverte préalable des hôtes actifs (Host Discovery avec ping sweep -sn).",
    "Lancer un balayage TCP rapide des ports les plus fréquents (SYN scan -sS avec temporisation T4).",
    "Effectuer la détection de versions applicatives (-sV) et l'empreinte d'OS (-O) sur les ports découverts ouverts.",
    "Auditer les services d'infrastructure spécifiques : énumération SMB (enum4linux) et SNMP (snmpwalk).",
    "Exécuter des scripts Nmap NSE ciblés (--script vuln) pour valider la présence de failles répertoriées."
  ],
  "summary": [
    "Le balayage de ports s'appuie sur la conformité des réponses à la RFC 793 pour qualifier les états OPEN, CLOSED ou FILTERED.",
    "Le scan SYN Stealth (-sS) nécessite des privilèges root pour forger des paquets réseau bruts et déchirer la session par RST.",
    "L'OS fingerprinting déduit le noyau hôte à partir du TTL initial (64 pour Linux, 128 pour Windows) et des options TCP.",
    "Les sessions nulles SMB et les communautés SNMP par défaut (public/private) constituent des vecteurs d'énumération majeurs.",
    "Nmap Scripting Engine (NSE) permet d'automatiser la détection de vulnérabilités critiques via des scripts Lua modulaires."
  ],
  "checklist": [
    "Je sais interpréter l'état d'un port TCP selon la sonde Nmap envoyée et le paquet de réponse reçu.",
    "Je maîtrise la détection de versions et de systèmes d'exploitation via les options -sV et -O.",
    "Je sais auditer les configurations SMB et SNMP vulnérables.",
    "Je sais écrire des analyseurs en Python 3 simulant le décodage de sondes TCP Nmap."
  ],
  "notions": [
    {
      "term": "Poignée de Mains TCP (3-Way Handshake)",
      "def": "Séquence d'établissement de connexion en 3 étapes : SYN, SYN+ACK, puis ACK selon la RFC 793."
    },
    {
      "term": "SYN Stealth Scan (-sS)",
      "def": "Balayage de ports demi-ouvert envoyant un RST dès réception du SYN+ACK sans finaliser la connexion."
    },
    {
      "term": "OS Fingerprinting (-O)",
      "def": "Technique d'identification du système d'exploitation basée sur l'analyse des caractéristiques fines de la pile TCP/IP (TTL, Window Size)."
    },
    {
      "term": "Session Nulle SMB",
      "def": "Connexion non authentifiée sur le port 445/139 permettant d'énumérer les partages, utilisateurs et groupes d'un système."
    },
    {
      "term": "Communauté SNMP v1/v2c",
      "def": "Mot de passe transmis en clair régissant l'accès en lecture (public) ou écriture (private) à l'arborescence MIB-2 d'un équipement."
    }
  ],
  "pitfalls": [
    "Tenter un scan FIN, Null ou Xmas face à une machine Windows : l'OS renvoie un RST sur tous les ports qu'ils soient ouverts ou fermés.",
    "Confondre le statut CLOSED (réponse RST reçue) et FILTERED (absence de réponse causée par un pare-feu).",
    "Lancer des scans à cadence agressive (-T5) risquant de saturer ou faire planter des équipements industriels ou routeurs anciens.",
    "Négliger le balayage des ports UDP (53, 161, 69) en se limitant uniquement aux 1000 ports TCP les plus fréquents."
  ],
  "questions": [
    {
      "stem": "Pourquoi le scan Nmap SYN (-sS) est-il qualifié de \"Stealth\" ou \"demi-ouvert\" ?",
      "opts": [
        "Parce qu'il envoie un paquet RST immédiatement après avoir reçu le SYN+ACK sans jamais envoyer le ACK final qui finaliserait la connexion",
        "Parce qu'il chiffre l'intégralité des paquets transmis avec une clé AES 256 bits",
        "Parce qu'il masque l'adresse IP de l'auditeur en usurpant automatiquement celle de la passerelle",
        "Parce qu'il utilise exclusivement des ports sources inférieurs à 1024"
      ],
      "correct": 0,
      "exp": "Le scan SYN n'établit jamais la connexion TCP complète : en envoyant un RST dès réception du SYN+ACK, la session n'est pas finalisée et n'était historiquement pas enregistrée par les logs applicatifs."
    },
    {
      "stem": "Quelle réponse renvoie un port fermé sur un système d'exploitation conforme à la RFC 793 lorsqu'il reçoit un paquet TCP SYN ?",
      "opts": [
        "Un paquet TCP avec le drapeau RST (ou RST+ACK)",
        "Un paquet ICMP Echo Reply (Type 0)",
        "Aucune réponse (Timeout silencieux)",
        "Un paquet TCP SYN+ACK"
      ],
      "correct": 0,
      "exp": "Selon la RFC 793, tout paquet arrivant sur un port où aucun processus n'écoute doit déclencher l'émission immédiate d'un paquet RST pour réinitialiser la tentative de connexion."
    },
    {
      "stem": "Quelle est la valeur typique de Time to Live (TTL) initial observée lors d'une capture réseau sur une machine Linux par rapport à Windows ?",
      "opts": [
        "TTL 64 pour Linux contre TTL 128 pour Windows",
        "TTL 255 pour Linux contre TTL 32 pour Windows",
        "TTL 128 pour Linux contre TTL 64 pour Windows",
        "Le TTL est strictement identique sur tous les systèmes d'exploitation"
      ],
      "correct": 0,
      "exp": "Par défaut, la pile réseau du noyau Linux initialise le champ TTL à 64, tandis que la pile réseau de Microsoft Windows l'initialise à 128 (et les équipements réseau Cisco/Solaris à 255)."
    },
    {
      "stem": "Quel est l'objectif principal d'un scan Nmap avec l'option -sA (TCP ACK Scan) ?",
      "opts": [
        "Cartographier les règles de pare-feu et déterminer s'il s'agit d'un pare-feu avec état (Stateful)",
        "Identifier les versions des logiciels serveurs web",
        "Déchiffrer les communications HTTPS en cours",
        "Énumérer les utilisateurs du domaine Active Directory"
      ],
      "correct": 0,
      "exp": "L'ACK scan envoie des paquets ACK hors session pour analyser si le pare-feu filtre les paquets non sollicités (Timeout/Filtered) ou s'il laisse passer les paquets vers l'hôte qui répond RST (Unfiltered)."
    },
    {
      "stem": "Pourquoi les scans furtifs FIN (-sF), Null (-sN) et Xmas (-sX) échouent-ils systématiquement face à des cibles sous Microsoft Windows ?",
      "opts": [
        "Parce que la pile TCP de Windows ne respecte pas la RFC 793 et répond systématiquement par un RST sur tous les ports",
        "Parce que Windows bloque physiquement la carte réseau dès qu'un paquet suspect est détecté",
        "Parce que ces scans exigent le protocole IPv6 qui est désactivé sous Windows",
        "Parce que Nmap refuse d'exécuter ces scans sur des systèmes Windows"
      ],
      "correct": 0,
      "exp": "Windows ne respecte pas la disposition de la RFC 793 stipulant qu'un port ouvert ne doit pas répondre à un paquet invalide : Windows renvoie un RST que le port soit ouvert ou fermé."
    },
    {
      "stem": "Quel risque critique de sécurité présente un service SNMP v1 ou v2c configuré avec la chaîne de communauté par défaut \"public\" ?",
      "opts": [
        "Un attaquant peut interroger la base MIB et extraire la liste complète des processus, interfaces réseau, utilisateurs et logiciels installés",
        "Le serveur est immédiatement formaté et rendu inaccessible",
        "Les clés privées SSH du serveur sont écrites en clair sur le port série",
        "Aucun risque, la communauté public est chiffrée par défaut"
      ],
      "correct": 0,
      "exp": "En SNMP v1/v2c, la communauté \"public\" transmet en clair et accorde un accès en lecture (RO) permettant d'énumérer toute la MIB-2 système (processus, interfaces, tables de routage, utilisateurs)."
    },
    {
      "stem": "Qu'est-ce qu'une \"session nulle\" (Null Session) dans le protocole SMB (port 445/139) ?",
      "opts": [
        "Une connexion établie anonymement sans nom d'utilisateur ni mot de passe permettant d'énumérer les partages et comptes",
        "Une coupure brutale de la connexion réseau par le pare-feu",
        "Une session dont les données ont été corrompues par des zéros binaires",
        "Une commande de redémarrage automatique du contrôleur de domaine"
      ],
      "correct": 0,
      "exp": "Une session nulle SMB permet à un utilisateur anonyme de s'authentifier avec des identifiants vides pour interroger les partages IPC$ et énumérer les comptes d'utilisateurs et de groupes du système."
    },
    {
      "stem": "Quelle catégorie de scripts du Nmap Scripting Engine (NSE) permet d'identifier les vulnérabilités de sécurité connues sur une cible ?",
      "opts": [
        "--script vuln",
        "--script discovery",
        "--script broadcast",
        "--script brute"
      ],
      "correct": 0,
      "exp": "La catégorie \"--script vuln\" regroupe tous les scripts vérifiant la présence de failles de sécurité répertoriées (telles que EternalBlue, Shellshock, Heartbleed, etc.)."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "&lt; 50 % — Reprends les sections théoriques et revois les définitions clés."
    },
    {
      "cls": "mid",
      "text": "50–69 % — Pratique les exercices N1 de l'atelier avant de retenter le test."
    },
    {
      "cls": "good",
      "text": "70–89 % — Bon niveau opérationnel : affine les cas limites et les options d'outils."
    },
    {
      "cls": "top",
      "text": "≥ 95 % — Maîtrise d'ingénierie validée : passe au module suivant."
    }
  ],
  "flashcards": [
    {
      "q": "Quelle est la séquence exacte du 3-way handshake TCP pour établir une connexion ?",
      "a": "1. Le client envoie SYN | 2. Le serveur répond SYN+ACK (port ouvert) | 3. Le client confirme avec ACK."
    },
    {
      "q": "Comment Nmap détermine-t-il qu'un port est CLOSED lors d'un SYN scan (-sS) ?",
      "a": "La cible répond immédiatement par un paquet avec le drapeau RST (Reset) ou RST+ACK conformément à la RFC 793."
    },
    {
      "q": "Quelles sont les valeurs de TTL initial permettant de différencier Linux et Windows ?",
      "a": "Linux / Unix : TTL initial de 64. Microsoft Windows : TTL initial de 128 (équipements Cisco/réseau : 255)."
    },
    {
      "q": "Quels drapeaux TCP sont activés dans une sonde de scan Xmas (-sX) ?",
      "a": "Les drapeaux FIN, PSH (Push) et URG (Urgent) sont allumés simultanément (\"comme un sapin de Noël\")."
    },
    {
      "q": "Quel port et protocole de transport utilise le service de supervision SNMP ?",
      "a": "Le port UDP 161 pour les requêtes agent (et port UDP 162 pour les notifications/traps SNMP)."
    },
    {
      "q": "Qu'indique un statut FILTERED renvoyé par Nmap sur un port TCP ?",
      "a": "Qu'un équipement intermédiaire (pare-feu / sonde IPS) bloque ou dépose les paquets silencieusement (Timeout sans réponse RST)."
    }
  ]
};
