/**
 * Chapitre 2 du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

module.exports = {
  "n": 2,
  "title": "Reconnaissance Passive & Active (OSINT, Cartographie & DNS)",
  "short": "OSINT, Reconnaissance &amp; DNS",
  "toc": "Principes de la reconnaissance passive et de l'Open Source Intelligence (OSINT), techniques de Google Dorking et moteurs spécialisés (Shodan, Censys), interrogation Whois et registres RIR, cartographie DNS exhaustive et analyse de transfert de zone (AXFR), protocoles de sécurité de messagerie (SPF, DKIM, DMARC), énumération de sous-domaines par fuzzing et logs de transparence de certificats (CT Logs), et filtrage des faux positifs DNS wildcard.",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "situation": "Avant d'envoyer le moindre paquet agressif vers une infrastructure cible, un auditeur professionnel doit collecter un maximum d'informations sans se faire repérer. Les serveurs de noms mal configurés révélant l'intégralité des sous-domaines via AXFR, les enregistrements SPF trop permissifs autorisant le spoofing d'adresses email, ou les services d'administration oubliés indexés sur Shodan représentent les portes d'entrée les plus exploitées. En tant que pentesteur B3, vous devez maîtriser l'art de l'OSINT, automatiser la cartographie DNS et identifier la surface d'attaque externe d'une organisation en éliminant les faux positifs causés par les DNS wildcards.",
  "objectives": [
    "maîtriser la méthodologie d'Open Source Intelligence (OSINT) pour cartographier une cible sans contact direct ;",
    "exploiter les opérateurs avancés de Google Dorking et les moteurs spécialisés (Shodan, Censys) ;",
    "analyser les protocoles de messagerie SPF, DKIM et DMARC et détecter les faiblesses exploitables en spoofing ;",
    "détecter et exploiter les failles de transfert de zone DNS (AXFR) révélant l'arborescence réseau interne ;",
    "automatiser l'énumération de sous-domaines par dictionnaire et via les Certificate Transparency logs (crt.sh) ;",
    "implémenter en Python 3 des filtres de détection de faux positifs provoqués par les résolutions DNS wildcard."
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
      "html": "<p>Le protocole DNS (Domain Name System) traduit les noms de domaine en adresses IP. Ses enregistrements fournissent une cartographie complète des services d'une entreprise :</p>\n<table class=\"table\">\n  <thead><tr><th>Type</th><th>Rôle Technique</th><th>Intérêt pour l'Auditeur</th></tr></thead>\n  <tbody>\n    <tr><td><code>A / AAAA</code></td><td>Résolution IPv4 (32 bits) / IPv6 (128 bits)</td><td>Adresses IP directes des serveurs hôtes</td></tr>\n    <tr><td><code>MX</code></td><td>Serveurs de messagerie électronique prioritaires</td><td>Identification de la solution email (Google Workspace, Office 365, Postfix)</td></tr>\n    <tr><td><code>NS</code></td><td>Serveurs de noms faisant autorité (Authoritative Name Servers)</td><td>Cibles pour les tests de transfert de zone AXFR</td></tr>\n    <tr><td><code>TXT</code></td><td>Enregistrements textuels arbitraires</td><td>Vérification de domaine, clés SPF, politiques DMARC, tokens tiers</td></tr>\n    <tr><td><code>CNAME</code></td><td>Alias canonique vers un autre nom de domaine</td><td>Détection de vulnérabilités de sous-domaine orphelin (Subdomain Takeover)</td></tr>\n  </tbody>\n</table>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> La Faille Critique de Transfert de Zone DNS (AXFR)</div>\n<p>Le mécanisme AXFR (Asynchronous Full Transfer Zone, port TCP 53) permet la synchronisation de la base DNS entre le serveur maître et les serveurs secondaires. Si ce transfert n'est pas restreint aux seules adresses IP des serveurs secondaires, n'importe quel attaquant peut télécharger l'intégralité des enregistrements de la zone :</p>,<pre><code>$ dig axfr @ns1.target.com target.com</code></pre>,<p>Impact : divulgation immédiate de l'ensemble de l'arborescence des sous-domaines (serveurs internes, environnements de test, bases de données privées, VPN).</p>\n  </div>"
    },
    {
      "title": "Sécurité de Messagerie : SPF, DKIM et DMARC contre l'Usurpation",
      "html": "<p>Les mécanismes de protection de messagerie sont systématiquement audités pour évaluer la vulnérabilité au spoofing d'emails :</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>SPF (Sender Policy Framework)</h4>\n    <p>Enregistrement TXT définissant les adresses IP autorisées à expédier des emails au nom du domaine.</p>\n    <p>Indicateurs finaux : <code>-all</code> (Hardfail strict, sécurisé), <code>~all</code> (Softfail permissif), <code>+all</code> / <code>?all</code> (Vulnérable à l'usurpation totale).</p>\n  </div>\n  <div class=\"card\">\n    <h4>DKIM (DomainKeys Identified Mail)</h4>\n    <p>Signature cryptographique asymétrique insérée dans les en-têtes du message (en-tête <code>DKIM-Signature</code>).</p>\n    <p>Garantit que le corps et les en-têtes du courriel n'ont pas été altérés en transit.</p>\n  </div>\n  <div class=\"card\">\n    <h4>DMARC (Reporting &amp; Conformance)</h4>\n    <p>Politique indiquant l'action à entreprendre si SPF ou DKIM échoue.</p>\n    <p>Politiques : <code>p=reject</code> (rejet strict du message), <code>p=quarantine</code> (placement en spam), <code>p=none</code> (simple surveillance, aucune protection contre le spoofing).</p>\n  </div>\n</div>"
    },
    {
      "title": "Énumération de Sous-Domaines & Gestion des Faux Positifs Wildcard",
      "html": "<p>La découverte de sous-domaines révèle les applications méconnues de la cible (portails d'administration, APIs de préproduction, gitlab interne) :</p>\n<ul>\n  <li><strong>Certificate Transparency Logs (crt.sh) :</strong> tous les certificats TLS émis publiquement sont enregistrés dans des registres immuables consultables par simple requête.</li>\n  <li><strong>Fuzzing par dictionnaire (Brute-forcing) :</strong> injection d'une liste de mots-clés courants (dev, stage, api, vpn, test) pour résoudre <code>word.target.com</code>.</li>\n  <li><strong>Le piège du DNS Wildcard (Faux Positifs) :</strong> si le serveur DNS est configuré avec <code>*.target.com IN A 192.168.1.100</code>, toute requête sur un sous-domaine aléatoire (ex: <code>kjashd8213.target.com</code>) répondra positivement par cette IP par défaut. L'auditeur doit envoyer une sonde aléatoire au préalable et filtrer systématiquement toute réponse retournant l'IP wildcard.</li>\n</ul>"
    }
  ],
  "method": [
    "Interroger les registres RIR (RIPE/ARIN) et Whois pour identifier les blocs IP publics et serveurs de noms.",
    "Collecter les informations passives via Google Dorking, theHarvester, Wayback Machine et Shodan.",
    "Auditer la zone DNS : tester le transfert de zone AXFR sur chaque serveur de noms faisant autorité.",
    "Analyser les enregistrements de messagerie SPF, DKIM et DMARC pour évaluer la vulnérabilité au spoofing.",
    "Énumérer les sous-domaines par dictionnaire en filtrant systématiquement l'IP wildcard de référence."
  ],
  "summary": [
    "L'OSINT permet de cartographier la surface d'attaque d'une entreprise sans émettre un seul paquet suspect vers ses infrastructures.",
    "Shodan et Censys indexent les bannières de millions d'équipements exposés sur Internet (RDP, caméras, bases de données, WAF).",
    "Une faille de transfert de zone DNS AXFR permet de télécharger instantanément la cartographie complète des sous-domaines.",
    "Les enregistrements SPF stricts (-all) combinés à DMARC (p=reject) sont impératifs pour neutraliser l'usurpation d'email.",
    "L'énumération de sous-domaines par dictionnaire exige un filtrage rigoureux des faux positifs DNS wildcard."
  ],
  "checklist": [
    "Je sais concevoir des requêtes Google Dorks complexes pour trouver des fichiers de configuration exposés.",
    "Je sais tester et interpréter un transfert de zone DNS AXFR avec dig.",
    "Je maîtrise l'analyse des syntaxes SPF, DKIM et DMARC et leurs impacts en ingénierie sociale.",
    "Je sais implémenter un algorithme de détection et d'élimination des faux positifs DNS wildcard en Python 3."
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
      "def": "Protocole de réplication complète d'une zone DNS (TCP 53) divulguant l'arborescence intégrale des sous-domaines si mal configuré."
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
    "Oublier d'interroger les registres Certificate Transparency (crt.sh) qui listent tous les sous-domaines dotés d'un certificat TLS."
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
        "N'importe quelle adresse IP sur Internet est autorisée à émettre des emails au nom du domaine (usurpation totale possible)",
        "Tous les emails émis sont automatiquement rejetés par les serveurs destinataires",
        "Les emails sont systématiquement chiffrés avec la clé publique du domaine",
        "Seuls les serveurs MX déclarés ont le droit d'expédier des courriels"
      ],
      "correct": 0,
      "exp": "La directive \"+all\" indique que tout hôte (IP) est un expéditeur valide, ce qui anéantit l'intérêt du SPF et autorise n'importe qui à usurper l'identité du domaine."
    },
    {
      "stem": "Quelle politique DMARC offre la protection la plus stricte en bloquant immédiatement la réception des emails suspects par les serveurs destinataires ?",
      "opts": [
        "p=reject",
        "p=none",
        "p=quarantine",
        "p=monitor"
      ],
      "correct": 0,
      "exp": "La politique \"p=reject\" ordonne aux serveurs de messagerie récepteurs de rejeter catégoriquement tout email dont l'authentification SPF ou DKIM échoue."
    },
    {
      "stem": "Pourquoi les registres Certificate Transparency (CT logs) sont-ils une source majeure d'OSINT pour les pentesteurs ?",
      "opts": [
        "Car chaque certificat TLS émis pour un nouveau sous-domaine y est consigné publiquement et de manière immuable dès sa création",
        "Car ils contiennent en clair les mots de passe administrateurs des serveurs web",
        "Car ils permettent de décrypter le trafic HTTPS enregistré à la volée",
        "Car ils contournent les pare-feux applicatifs WAF"
      ],
      "correct": 0,
      "exp": "Dès qu'un certificat TLS est généré (ex: Let's Encrypt), le nom de domaine et tous ses sous-domaines sont inscrits dans les journaux CT logs publics, révélant les nouvelles applications."
    },
    {
      "stem": "Lors d'un brute-force de sous-domaines, que provoque la présence d'un enregistrement DNS \"wildcard\" (*.target.com) ?",
      "opts": [
        "Toutes les requêtes de test répondent positivement avec la même adresse IP, générant des milliers de faux positifs",
        "Le serveur DNS refuse immédiatement toute nouvelle requête en bloquant l'IP de l'auditeur",
        "Les requêtes sont automatiquement redirigées vers le serveur DNS racine mondial",
        "La zone DNS entière est effacée du serveur de noms"
      ],
      "correct": 0,
      "exp": "Un enregistrement DNS wildcard fait correspondre n'importe quelle chaîne inexistante à une IP par défaut, faisant croire à tort à l'auditeur que tous les sous-domaines testés existent réellement."
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
      "q": "Quelle est la différence fondamentale entre reconnaissance passive et active ?",
      "a": "La reconnaissance passive n'interagit jamais directement avec la cible (OSINT, Shodan, DNS). La reconnaissance active envoie des sondes directes (pings, scans de ports, requêtes web)."
    },
    {
      "q": "Que recherche un opérateur Google Dorking de type « site:cible.com ext:sql confidential » ?",
      "a": "Des sauvegardes ou dumps de bases de données SQL contenant le mot \"confidential\" indexés par inadvertance sur le site."
    },
    {
      "q": "Quelle vulnérabilité critique est exploitée lors d'une requête « dig axfr @ns1.target.com » réussie ?",
      "a": "La faille de transfert de zone DNS non restreint, permettant de télécharger l'intégralité des enregistrements DNS de la cible."
    },
    {
      "q": "Que signifient les terminaisons SPF « -all », « ~all » et « +all » ?",
      "a": "-all : Hardfail strict (sécurisé) | ~all : Softfail (marquage suspect) | +all : Tout le monde est autorisé (vulnérable au spoofing)."
    },
    {
      "q": "Quelles sont les 3 politiques possibles pour la directive « p= » d'un enregistrement DMARC ?",
      "a": "p=none (simple surveillance, vulnérable), p=quarantine (envoi en spam), p=reject (rejet pur et simple, hautement sécurisé)."
    },
    {
      "q": "Comment un auditeur élimine-t-il les faux positifs causés par un DNS wildcard (*.domaine.com) ?",
      "a": "En envoyant une sonde vers un sous-domaine aléatoire inexistant, puis en ignorant tout résultat retournant cette même adresse IP wildcard."
    }
  ]
};
