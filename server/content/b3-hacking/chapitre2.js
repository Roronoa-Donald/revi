/**
 * Chapitre 2 du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

module.exports = {
  "n": 2,
  "title": "Reconnaissance Passive & Active (OSINT, Cartographie & DNS)",
  "short": "OSINT, Reconnaissance &amp; DNS",
  "toc": "Principes de la reconnaissance passive et de l'Open Source Intelligence (OSINT), techniques de Google Dorking et moteurs spécialisés (Shodan, Censys), interrogation Whois et registres RIR, cartographie DNS et portée du transfert de zone (AXFR), protocoles de sécurité de messagerie (SPF, DKIM, DMARC), énumération de sous-domaines et journaux de transparence de certificats, et interprétation des réponses DNS wildcard.",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "situation": "Dans le périmètre autorisé, un auditeur peut recueillir des informations de sources ouvertes avant des sondes directes. Un transfert AXFR mal restreint peut révéler les données de la zone concernée ; des politiques de messagerie faibles ou des services indexés fournissent d'autres indices à vérifier. En tant que pentesteur B3, confrontez les observations DNS et les sources disponibles sans exclure un nom sur la seule adresse IP d'un wildcard.",
  "objectives": [
    "maîtriser la méthodologie d'Open Source Intelligence (OSINT) pour cartographier une cible sans contact direct ;",
    "exploiter les opérateurs avancés de Google Dorking et les moteurs spécialisés (Shodan, Censys) ;",
    "analyser les protocoles de messagerie SPF, DKIM et DMARC et détecter les faiblesses exploitables en spoofing ;",
    "détecter et exploiter les failles de transfert de zone DNS (AXFR) révélant l'arborescence réseau interne ;",
    "automatiser l'énumération de sous-domaines par dictionnaire et via les Certificate Transparency logs (crt.sh) ;",
    "analyser et résoudre méthodologiquement des filtres de détection de faux positifs provoqués par les résolutions DNS wildcard."
  ],
  "sections": [
    {
      "title": "Principes de l'OSINT et Collecte Passive d'Informations",
      "html": "<p>La reconnaissance passive consiste à recueillir des renseignements sur la cible sans qu'aucun paquet réseau ne soit émis directement vers ses serveurs (ou en utilisant exclusivement des services tiers intermédiaires) :</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>Registres Whois &amp; RIR</h4>\n    <p>Interrogation des registres régionaux d'adresses IP (RIPE NCC en Europe, ARIN en Amérique) et de noms de domaine.</p>\n    <p>Permet d'identifier les plages IP publiques autonomes (ASN - Autonomous System Number), les serveurs de noms faisant autorité et les contacts techniques.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Archives &amp; Historique Web</h4>\n    <p>Exploitation de la <em>Wayback Machine</em> (Internet Archive) pour retrouver d'anciennes versions de sites.</p>\n    <p>Révèle d'anciennes URL oubliées, des fichiers de configuration dépréciés ou des noms d'anciens sous-traitants.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Collecte de Contacts (theHarvester)</h4>\n    <p>Extraction automatisée d'adresses emails, de noms d'employés et de technologies depuis les moteurs de recherche et LinkedIn.</p>\n    <p>Alimente la phase d'ingénierie sociale ciblée (Spear-Phishing) et la constitution de listes d'utilisateurs.</p>\n  </div>\n</div>"
    },
    {
      "title": "Recherche Ciblée : Google Dorking, Shodan &amp; Censys",
      "html": "<p>Les moteurs de recherche indexent des volumes considérables d'informations sensibles exposées par inadvertance :</p>\n<div class=\"card\">\n  <h4>Opérateurs Avancés de Google Dorking</h4>\n  <ul>\n    <li><code>site:target.com filetype:pdf confidential</code> : recherche de documents PDF confidentiels indexés publiquement.</li>\n    <li><code>site:target.com inurl:admin | inurl:login</code> : découverte d'interfaces de connexion d'administration non référencées.</li>\n    <li><code>site:target.com intitle:\"index of /\"</code> : repérage de répertoires web avec listage automatique activé (Directory Listing).</li>\n    <li><code>site:target.com ext:env | ext:sql | ext:log</code> : recherche de fichiers de variables d'environnement (.env) ou de dumps SQL exposés.</li>\n  </ul>\n</div>\n<div class=\"grid grid-2\" style=\"margin-top:1rem;\">\n  <div class=\"card\">\n    <h4>Shodan (Moteur des Objets Connectés)</h4>\n    <p>Shodan scanne en continu l'ensemble de l'espace d'adressage IPv4 mondial et indexe les bannières de réponse (HTTP, SSH, RDP, SCADA).</p>\n    <p>Requêtes types : <code>net:192.0.2.0/24</code>, <code>port:3389 \"remote desktop\"</code>, <code>org:\"Target Corp\" vuln:cve-2021-44228</code>.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Censys &amp; Certificats</h4>\n    <p>Censys surveille les ports et analyse en profondeur les certificats X.509 exposés.</p>\n    <p>Permet de relier une adresse IP discrète à un nom de domaine via le champ Subject Alternative Name (SAN) du certificat TLS.</p>\n  </div>\n</div>"
    },
    {
      "title": "Cartographie DNS Approfondie et Faille de Transfert de Zone (AXFR)",
      "html": "<p>Le DNS (Domain Name System) associe notamment des noms à des adresses IP. Ses enregistrements fournissent des indices sur des services, sans constituer une cartographie exhaustive :</p>\n<table class=\"table\">\n  <thead><tr><th>Type</th><th>Rôle technique</th><th>Intérêt pour l'auditeur</th></tr></thead>\n  <tbody>\n    <tr><td><code>A / AAAA</code></td><td>Adresses IPv4 / IPv6</td><td>Adresses associées à un nom</td></tr>\n    <tr><td><code>MX</code></td><td>Serveurs de messagerie et préférences</td><td>Indices sur la réception des courriels</td></tr>\n    <tr><td><code>NS</code></td><td>Serveurs de noms faisant autorité</td><td>Serveurs à examiner dans le périmètre autorisé</td></tr>\n    <tr><td><code>TXT</code></td><td>Enregistrements textuels</td><td>SPF, DMARC et vérifications de domaine</td></tr>\n    <tr><td><code>CNAME</code></td><td>Alias vers un autre nom</td><td>Identifier les dépendances à vérifier</td></tr>\n  </tbody>\n</table>\n<div class=\"box box--standard\">\n  <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Transfert complet de zone AXFR</div>\n  <p>AXFR transfère une zone DNS sur TCP. Une autorisation trop large peut révéler les enregistrements de la zone transférée ; les zones enfants déléguées ne sont pas nécessairement incluses. Testez uniquement avec autorisation.</p>\n  <pre><code>$ dig @ns1.example.test example.test AXFR</code></pre>\n  <p>Référence : <a href=\"https://www.rfc-editor.org/rfc/rfc5936.html\">RFC 5936</a>.</p>\n</div>"
    },
    {
      "title": "Sécurité de Messagerie : SPF, DKIM et DMARC contre l'Usurpation",
      "html": "<p>SPF, DKIM et DMARC apportent des indices et des contrôles complémentaires pour l'authentification des courriels :</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>SPF (Sender Policy Framework)</h4>\n    <p>Un enregistrement TXT décrit les hôtes autorisés pour l'identité de domaine évaluée par SPF.</p>\n    <p><code>-all</code> indique un échec, <code>~all</code> un échec souple, <code>+all</code> une correspondance pour tout hôte et <code>?all</code> un résultat neutre. Le traitement final dépend du récepteur et des autres contrôles.</p>\n  </div>\n  <div class=\"card\">\n    <h4>DKIM (DomainKeys Identified Mail)</h4>\n    <p>Une signature <code>DKIM-Signature</code> permet de vérifier le corps et les champs d'en-tête couverts par la signature, selon la canonicalisation utilisée ; elle ne chiffre pas le message.</p>\n  </div>\n  <div class=\"card\">\n    <h4>DMARC (Reporting &amp; Conformance)</h4>\n    <p>DMARC réussit si SPF ou DKIM réussit avec l'alignement requis sur le domaine de l'en-tête From. Si aucun ne réussit avec cet alignement, la politique indique le traitement demandé.</p>\n    <p><code>p=reject</code> demande le rejet, <code>p=quarantine</code> une mise en quarantaine et <code>p=none</code> aucune action particulière. Le récepteur décide du traitement effectif.</p>\n    <p>Référence : <a href=\"https://www.rfc-editor.org/rfc/rfc9989.html\">RFC 9989, mai 2026</a>.</p>\n  </div>\n</div>"
    },
    {
      "title": "Énumération de Sous-Domaines & Gestion des Faux Positifs Wildcard",
      "html": "<p>La découverte de sous-domaines révèle les applications méconnues de la cible (portails d'administration, APIs de préproduction, gitlab interne) :</p>\n<ul>\n  <li><strong>Certificate Transparency Logs (crt.sh) :</strong> les journaux publics recensent des certificats ou précertificats soumis et leurs noms ; ceux-ci constituent des indices à vérifier, pas un inventaire exhaustif des sous-domaines.</li>\n  <li><strong>Fuzzing par dictionnaire (Brute-forcing) :</strong> injection d'une liste de mots-clés courants (dev, stage, api, vpn, test) pour résoudre <code>word.target.com</code>.</li>\n  <li><strong>Le piège du DNS Wildcard (Faux Positifs) :</strong> une réponse à un nom aléatoire peut indiquer une synthèse wildcard, mais un nom réel peut partager la même adresse IP. Comparer les réponses et recouper les observations avant toute conclusion, dans le périmètre autorisé.</li>\n</ul>"
    }
  ],
  "method": [
    "Interroger les registres RIR (RIPE/ARIN) et Whois pour identifier les blocs IP publics et serveurs de noms.",
    "Collecter les informations passives via Google Dorking, theHarvester, Wayback Machine et Shodan.",
    "Auditer la zone DNS : tester le transfert de zone AXFR sur chaque serveur de noms faisant autorité.",
    "Analyser les enregistrements de messagerie SPF, DKIM et DMARC pour évaluer la vulnérabilité au spoofing.",
    "Comparer les réponses DNS à un motif wildcard et vérifier les noms sans les exclure automatiquement sur leur seule adresse IP."
  ],
  "summary": [
    "L'OSINT permet de cartographier la surface d'attaque d'une entreprise sans émettre un seul paquet suspect vers ses infrastructures.",
    "Shodan et Censys indexent les bannières de millions d'équipements exposés sur Internet (RDP, caméras, bases de données, WAF).",
    "Un transfert AXFR non autorisé peut divulguer les enregistrements de la zone transférée, sans nécessairement inclure ceux des zones enfants déléguées.",
    "SPF, DKIM et DMARC contribuent à l'authentification des courriels selon leur configuration et les décisions des récepteurs, sans éliminer toute usurpation.",
    "L'énumération de sous-domaines par dictionnaire exige un filtrage rigoureux des faux positifs DNS wildcard."
  ],
  "checklist": [
    "Je sais concevoir des requêtes Google Dorks complexes pour trouver des fichiers de configuration exposés.",
    "Je sais tester et interpréter un transfert de zone DNS AXFR avec dig.",
    "Je maîtrise l'analyse des syntaxes SPF, DKIM et DMARC et leurs impacts en ingénierie sociale.",
    "Je sais comparer des réponses DNS au motif wildcard sans conclure sur la seule adresse IP."
  ],
  "notions": [
    {
      "term": "OSINT (Open Source Intelligence)",
      "def": "Méthodologie de renseignement exploitant des sources d'information ouvertes, accessibles légalement et publiquement sans contact direct avec la cible."
    },
    {
      "term": "Google Dorking",
      "def": "Utilisation d'opérateurs de recherche avancés (site:, filetype:, inurl:, intitle:) pour découvrir des données sensibles indexées par mégarde."
    },
    {
      "term": "Transfert de Zone AXFR",
      "def": "Transfert complet d'une zone DNS sur TCP ; la zone transférée ne comprend pas nécessairement les enregistrements des zones enfants déléguées."
    },
    {
      "term": "SPF (Sender Policy Framework)",
      "def": "Enregistrement DNS TXT spécifiant la liste blanche des serveurs autorisés à envoyer des courriels pour un domaine."
    },
    {
      "term": "DMARC",
      "def": "Politique de conformité et de reporting DNS ordonnant l'action (none, quarantine, reject) lors de l'échec des vérifications SPF/DKIM."
    }
  ],
  "pitfalls": [
    "Confondre reconnaissance passive (sans paquet envoyé à la cible) et active (sondes DNS directes ou requêtes web).",
    "Ignorer le risque d'enregistrements SPF finissant par +all autorisant n'importe quel attaquant à usurper le domaine.",
    "Tomber dans le piège des résolutions DNS wildcard (*.domaine.com) et consigner des centaines de faux sous-domaines inexistants.",
    "Oublier les journaux Certificate Transparency, qui peuvent fournir des noms à vérifier sans lister tous les sous-domaines ni prouver qu'un service est actif."
  ],
  "questions": [
    {
      "stem": "Qu'est-ce qui distingue fondamentalement la reconnaissance passive de la reconnaissance active ?",
      "opts": [
        "La reconnaissance passive n'émet aucun paquet réseau directement vers les serveurs de la cible et interroge des sources tierces (OSINT)",
        "La reconnaissance passive nécessite des privilèges d'administrateur sur le pare-feu de la cible",
        "La reconnaissance passive utilise exclusivement le protocole ICMP alors que la reconnaissance active utilise TCP",
        "La reconnaissance passive est formellement interdite par la loi alors que la reconnaissance active est autorisée"
      ],
      "correct": 0,
      "exp": "La reconnaissance passive utilise des sources tierces publiques (Whois, Shodan, crt.sh) pour collecter des renseignements sans contacter directement les serveurs de la cible."
    },
    {
      "stem": "Quel opérateur Google Dorking permet de cibler spécifiquement les fichiers de configuration de type \".env\" exposés sur un domaine ?",
      "opts": [
        "filetype:env ou ext:env",
        "inurl:database_password",
        "intitle:configuration_secret",
        "site:apache_directory"
      ],
      "correct": 0,
      "exp": "Les opérateurs filetype:env ou ext:env restreignent la recherche aux fichiers portant cette extension, fréquemment riche en secrets d'API et identifiants de bases de données."
    },
    {
      "stem": "Sur quel port et protocole de transport s'effectue traditionnellement une requête de transfert de zone DNS complet (AXFR) ?",
      "opts": [
        "Port TCP 53",
        "Port UDP 53",
        "Port TCP 443",
        "Port UDP 161"
      ],
      "correct": 0,
      "exp": "Alors que les résolutions DNS classiques transitent sur UDP 53, les transferts de zone (AXFR) utilisent TCP 53 pour garantir la fiabilité du transfert volumineux de la base."
    },
    {
      "stem": "Quelle est la conséquence immédiate d'un enregistrement SPF se terminant par la directive \"+all\" ?",
      "opts": [
        "Tout hôte correspond au mécanisme SPF all : cet enregistrement ne limite plus les expéditeurs selon leur adresse IP",
        "Tous les emails émis sont automatiquement rejetés par les serveurs destinataires",
        "Les emails sont systématiquement chiffrés avec la clé publique du domaine",
        "Seuls les serveurs MX déclarés ont le droit d'expédier des courriels"
      ],
      "correct": 0,
      "exp": "La directive \"+all\" fait correspondre tout hôte dans l'évaluation SPF. Les autres contrôles et la décision du récepteur restent à examiner."
    },
    {
      "stem": "Quelle politique DMARC demande au récepteur de rejeter un message lorsque l'évaluation DMARC échoue ?",
      "opts": [
        "p=reject",
        "p=none",
        "p=quarantine",
        "p=monitor"
      ],
      "correct": 0,
      "exp": "DMARC réussit si SPF ou DKIM réussit avec l'alignement requis ; l'échec d'un seul mécanisme ne suffit pas. En cas d'échec DMARC, p=reject demande le rejet, mais le récepteur décide du traitement."
    },
    {
      "stem": "Pourquoi les registres Certificate Transparency (CT logs) sont-ils une source majeure d'OSINT pour les pentesteurs ?",
      "opts": [
        "Car des certificats ou précertificats soumis peuvent révéler des noms à vérifier",
        "Car ils contiennent en clair les mots de passe administrateurs des serveurs web",
        "Car ils permettent de décrypter le trafic HTTPS enregistré à la volée",
        "Car ils contournent les pare-feux applicatifs WAF"
      ],
      "correct": 0,
      "exp": "Les journaux recensent les certificats ou précertificats soumis et leurs noms. Un certificat wildcard ne liste pas tous les sous-domaines, et un nom observé ne prouve pas qu'un service est actif."
    },
    {
      "stem": "Lors d'un brute-force de sous-domaines, que provoque la présence d'un enregistrement DNS \"wildcard\" (*.target.com) ?",
      "opts": [
        "Certains noms inexistants peuvent recevoir une réponse synthétisée, sans que tous les noms soient nécessairement concernés",
        "Le serveur DNS refuse immédiatement toute nouvelle requête en bloquant l'IP de l'auditeur",
        "Les requêtes sont automatiquement redirigées vers le serveur DNS racine mondial",
        "La zone DNS entière est effacée du serveur de noms"
      ],
      "correct": 0,
      "exp": "Un wildcard peut synthétiser certaines réponses pour des noms inexistants. Un nom légitime peut partager la même adresse IP : cet indice seul ne suffit pas pour l'exclure."
    },
    {
      "stem": "Quel en-tête HTTP de sécurité empêche qu'un site web soit encapsulé dans un iframe et protège contre les attaques de Clickjacking ?",
      "opts": [
        "X-Frame-Options (avec DENY ou SAMEORIGIN)",
        "Strict-Transport-Security (HSTS)",
        "X-Content-Type-Options: nosniff",
        "Access-Control-Allow-Origin: *"
      ],
      "correct": 0,
      "exp": "L'en-tête X-Frame-Options (ou la directive frame-ancestors de CSP) interdit l'affichage du site dans une balise iframe, neutralisant les attaques par détournement de clic (Clickjacking)."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "&lt; 50 % — Reprenez les sections théoriques et revois les définitions clés."
    },
    {
      "cls": "mid",
      "text": "50–69 % — Pratique les exercices N1 de l'atelier avant de retenter le test."
    },
    {
      "cls": "good",
      "text": "70–94 % — Bon niveau opérationnel : affine les cas limites et les options d'outils."
    },
    {
      "cls": "top",
      "text": "≥ 95 % — Maîtrise d'ingénierie validée : passe au module suivant."
    }
  ],
  "flashcards": [
    { "q": "Comment l'OSINT peut-il cartographier une surface d'attaque sans sonder directement la cible ?", "a": "En exploitant des sources ouvertes tierces, comme des registres publics et des moteurs d'indexation." },
    { "q": "À quoi servent Shodan et Censys lors d'une reconnaissance externe ?", "a": "Ils indexent des millions de services exposés et leurs bannières : RDP, caméras, bases de données ou indices de WAF, par exemple." },
    { "q": "Que révèle un transfert DNS AXFR autorisé à tort ?", "a": "Les enregistrements de la zone transférée, notamment des noms de sous-domaines, mais pas nécessairement ceux des zones enfants déléguées." },
    {
      "q": "Quelle est la différence fondamentale entre reconnaissance passive et active ?",
      "a": "La reconnaissance passive utilise des sources tierces sans interroger directement la cible. Une requête DNS directe vers ses serveurs relève d'une reconnaissance active, comme les scans et les requêtes web directes."
    },
    {
      "q": "Que recherche un opérateur Google Dorking de type « site:cible.com ext:sql confidential » ?",
      "a": "Des sauvegardes ou dumps de bases de données SQL contenant le mot \"confidential\" indexés par inadvertance sur le site."
    },
    {
      "q": "Que révèle une requête « dig @ns1.example.test example.test AXFR » autorisée à tort ?",
      "a": "Elle peut révéler les enregistrements de la zone transférée ; elle ne comprend pas nécessairement ceux des zones enfants déléguées."
    },
    {
      "q": "Que signifient les terminaisons SPF « -all », « ~all » et « +all » ?",
      "a": "Pour l'évaluation SPF : -all donne un échec, ~all un échec souple et +all correspond à tout hôte. Le récepteur et les autres mécanismes déterminent ensuite le traitement."
    },
    {
      "q": "Quelles sont les 3 politiques possibles pour la directive « p= » d'un enregistrement DMARC ?",
      "a": "En cas d'échec DMARC, p=none ne demande aucune action particulière, p=quarantine demande une quarantaine et p=reject demande le rejet ; le récepteur décide de l'application."
    },
    {
      "q": "Comment interpréter une réponse DNS qui partage l’adresse IP d’un wildcard ?",
      "a": "Un nom légitime peut partager la même IP qu’un wildcard. Comparer plusieurs réponses et recouper avec d’autres observations avant de conclure ; l’IP seule ne suffit pas."
    }
  ]
};
