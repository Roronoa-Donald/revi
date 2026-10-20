'use strict';

module.exports = [
  {
    "id": "fw3-c5-e1",
    "chapter": 5,
    "title": "Filtrage de domaines DNS & inspection du Server Name Indication (SNI TLS)",
    "level": "n1",
    "language": "analyse",
    "goal": "Classer les noms d’hôtes extraits de l’extension SNI TLS selon leur catégorie de réputation et appliquer la politique de sécurité.",
    "brief": "<p>Un pare-feu nouvelle génération (NGFW) inspecte le champ <strong>SNI (Server Name Indication)</strong> du message TLS <em>Client Hello</em> pour identifier le site web visité sans avoir besoin de déchiffrer tout le trafic.<br><br>\nBase de réputation et politique d'entreprise :<br>\n- Domaines contenant <code>phish</code>, <code>malware</code> ou finissant par <code>.evil</code> : catégorie <code>MALWARE</code> -> Action <code>BLOCK</code>.<br>\n- Domaines contenant <code>casino</code>, <code>bet</code> ou finissant par <code>.gamble</code> : catégorie <code>GAMBLING</code> -> Action <code>BLOCK</code>.<br>\n- Domaines contenant <code>facebook</code>, <code>tiktok</code>, <code>instagram</code> : catégorie <code>SOCIAL_MEDIA</code> -> Action <code>BLOCK</code>.<br>\n- Tous les autres domaines : catégorie <code>BUSINESS_TECH</code> -> Action <code>ALLOW</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque ligne, afficher :<br>\n<code>SNI_INSPECT id={id} host={host} category={CAT} action={ALLOW|BLOCK}</code></p>",
    "starter": "# Grille d'analyse (fw3-c5-e1) — Filtrage de domaines DNS & inspection du Server Name Indication (SNI TLS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Blocage des réseaux sociaux et sites de jeux]\n# Données : SNI_EVENT id=E1 client_ip=10.0.0.5 host=www.facebook.com\n# Données : SNI_EVENT id=E2 client_ip=10.0.0.5 host=sports.bet365.com\n# Données : SNI_EVENT id=E3 client_ip=10.0.0.5 host=api.github.com\nA_COMPLETER\n\n[Cas 2 — Détection de malware avec extension spéciale]\n# Données : SNI_EVENT id=M1 client_ip=172.16.1.20 host=trojan-downloader.evil\n# Données : SNI_EVENT id=M2 client_ip=172.16.1.20 host=roulette.online.gamble\nA_COMPLETER\n\n[Cas 3 — Trafic légitime professionnel varié]\n# Données : SNI_EVENT id=B1 client_ip=192.168.1.15 host=pypi.org\n# Données : SNI_EVENT id=B2 client_ip=192.168.1.15 host=stackoverflow.com\nA_COMPLETER\n",
    "hints": [
      "Convertir l’hôte en minuscules avant l’analyse.",
      "Tester dans l’ordre : MALWARE, GAMBLING, SOCIAL_MEDIA, puis défaut BUSINESS_TECH."
    ],
    "examples": [
      {
        "stdin": "SNI_EVENT id=1 client_ip=192.168.1.10 host=login-bank.phishing-portal.com\nSNI_EVENT id=2 client_ip=192.168.1.10 host=docs.python.org",
        "expected": "SNI_INSPECT id=1 host=login-bank.phishing-portal.com category=MALWARE action=BLOCK\nSNI_INSPECT id=2 host=docs.python.org category=BUSINESS_TECH action=ALLOW",
        "note": "Le domaine de phishing est bloqué, la documentation technique est autorisée."
      }
    ],
    "tests": [
      {
        "label": "Blocage des réseaux sociaux et sites de jeux",
        "stdin": "cas:1",
        "expected": "SNI_INSPECT id=E1 host=www.facebook.com category=SOCIAL_MEDIA action=BLOCK\nSNI_INSPECT id=E2 host=sports.bet365.com category=GAMBLING action=BLOCK\nSNI_INSPECT id=E3 host=api.github.com category=BUSINESS_TECH action=ALLOW"
      },
      {
        "label": "Détection de malware avec extension spéciale",
        "stdin": "cas:2",
        "expected": "SNI_INSPECT id=M1 host=trojan-downloader.evil category=MALWARE action=BLOCK\nSNI_INSPECT id=M2 host=roulette.online.gamble category=GAMBLING action=BLOCK"
      },
      {
        "label": "Trafic légitime professionnel varié",
        "stdin": "cas:3",
        "expected": "SNI_INSPECT id=B1 host=pypi.org category=BUSINESS_TECH action=ALLOW\nSNI_INSPECT id=B2 host=stackoverflow.com category=BUSINESS_TECH action=ALLOW"
      }
    ],
    "solution": "[Exemple]\nSNI_INSPECT id=1 host=login-bank.phishing-portal.com category=MALWARE action=BLOCK\nSNI_INSPECT id=2 host=docs.python.org category=BUSINESS_TECH action=ALLOW\n\n[Cas 1 — Blocage des réseaux sociaux et sites de jeux]\nSNI_INSPECT id=E1 host=www.facebook.com category=SOCIAL_MEDIA action=BLOCK\nSNI_INSPECT id=E2 host=sports.bet365.com category=GAMBLING action=BLOCK\nSNI_INSPECT id=E3 host=api.github.com category=BUSINESS_TECH action=ALLOW\n\n[Cas 2 — Détection de malware avec extension spéciale]\nSNI_INSPECT id=M1 host=trojan-downloader.evil category=MALWARE action=BLOCK\nSNI_INSPECT id=M2 host=roulette.online.gamble category=GAMBLING action=BLOCK\n\n[Cas 3 — Trafic légitime professionnel varié]\nSNI_INSPECT id=B1 host=pypi.org category=BUSINESS_TECH action=ALLOW\nSNI_INSPECT id=B2 host=stackoverflow.com category=BUSINESS_TECH action=ALLOW"
  },
  {
    "id": "fw3-c5-e2",
    "chapter": 5,
    "title": "Limiteur de débit et protection anti-DoS par fenêtre glissante",
    "level": "n2",
    "language": "analyse",
    "goal": "Implémenter un limiteur de débit par IP pour contrer les rafales de requêtes et dénis de service.",
    "brief": "<p>Pour protéger les serveurs contre les inondations et attaques par force brute, les modules NGFW/UTM intègrent des mécanismes de <strong>Rate Limiting</strong>.<br><br>\nRègles de filtrage par fenêtre glissante :<br>\n- Taille de la fenêtre : <code>5</code> secondes.<br>\n- Quota maximal : <code>3</code> requêtes autorisées dans l'intervalle <code>[ts - 4, ts]</code> (inclusif).<br>\n- Lorsqu'une requête arrive à l'instant <code>ts</code> pour une adresse <code>ip</code> :<br>\n  On compte combien de requêtes antérieures de cette même IP se situent dans <code>[ts - 4, ts]</code>.<br>\n  Si le compte (requête courante comprise) est <code>&lt;= 3</code> : la requête est admise (<code>PASSED</code>).<br>\n  Si le compte dépasse 3 : la requête est rejetée (<code>DROPPED</code>) et n'est pas comptabilisée dans les requêtes acceptées.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque requête, afficher :<br>\n<code>RATE_LIMIT ip={ip} ts={ts} status={PASSED|DROPPED} active_in_window={count}</code></p>",
    "starter": "# Grille d'analyse (fw3-c5-e2) — Limiteur de débit et protection anti-DoS par fenêtre glissante\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Expiration de fenêtre permettant de nouvelles requêtes]\n# Données : REQ ts=1 ip=10.0.0.1\n# Données : REQ ts=2 ip=10.0.0.1\n# Données : REQ ts=3 ip=10.0.0.1\n# Données : REQ ts=4 ip=10.0.0.1\n# Données : REQ ts=6 ip=10.0.0.1\nA_COMPLETER\n\n[Cas 2 — Deux adresses IP distinctes avec quotas indépendants]\n# Données : REQ ts=10 ip=192.168.1.1\n# Données : REQ ts=10 ip=192.168.1.2\n# Données : REQ ts=11 ip=192.168.1.1\n# Données : REQ ts=11 ip=192.168.1.2\n# Données : REQ ts=12 ip=192.168.1.1\n# Données : REQ ts=12 ip=192.168.1.1\nA_COMPLETER\n\n[Cas 3 — Trafic régulier et espacé sans dépassement]\n# Données : REQ ts=10 ip=10.0.0.8\n# Données : REQ ts=15 ip=10.0.0.8\n# Données : REQ ts=20 ip=10.0.0.8\nA_COMPLETER\n",
    "hints": [
      "Maintenez l’historique horodaté des requêtes acceptées pour chaque adresse IP source.",
      "Rejetez toute requête excédant le seuil de débit maximal autorisé dans la fenêtre glissante d’observation."
    ],
    "examples": [
      {
        "stdin": "REQ ts=10 ip=192.168.1.5\nREQ ts=11 ip=192.168.1.5\nREQ ts=12 ip=192.168.1.5\nREQ ts=13 ip=192.168.1.5",
        "expected": "RATE_LIMIT ip=192.168.1.5 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.5 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.5 ts=12 status=PASSED active_in_window=3\nRATE_LIMIT ip=192.168.1.5 ts=13 status=DROPPED active_in_window=4",
        "note": "La 4e requête à ts=13 dépasse le quota de 3 dans la fenêtre [9, 13]."
      }
    ],
    "tests": [
      {
        "label": "Expiration de fenêtre permettant de nouvelles requêtes",
        "stdin": "cas:1",
        "expected": "RATE_LIMIT ip=10.0.0.1 ts=1 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.1 ts=2 status=PASSED active_in_window=2\nRATE_LIMIT ip=10.0.0.1 ts=3 status=PASSED active_in_window=3\nRATE_LIMIT ip=10.0.0.1 ts=4 status=DROPPED active_in_window=4\nRATE_LIMIT ip=10.0.0.1 ts=6 status=PASSED active_in_window=3"
      },
      {
        "label": "Deux adresses IP distinctes avec quotas indépendants",
        "stdin": "cas:2",
        "expected": "RATE_LIMIT ip=192.168.1.1 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.2 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.1 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.2 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.1 ts=12 status=PASSED active_in_window=3\nRATE_LIMIT ip=192.168.1.1 ts=12 status=DROPPED active_in_window=4"
      },
      {
        "label": "Trafic régulier et espacé sans dépassement",
        "stdin": "cas:3",
        "expected": "RATE_LIMIT ip=10.0.0.8 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.8 ts=15 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.8 ts=20 status=PASSED active_in_window=1"
      }
    ],
    "solution": "[Exemple]\nRATE_LIMIT ip=192.168.1.5 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.5 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.5 ts=12 status=PASSED active_in_window=3\nRATE_LIMIT ip=192.168.1.5 ts=13 status=DROPPED active_in_window=4\n\n[Cas 1 — Expiration de fenêtre permettant de nouvelles requêtes]\nRATE_LIMIT ip=10.0.0.1 ts=1 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.1 ts=2 status=PASSED active_in_window=2\nRATE_LIMIT ip=10.0.0.1 ts=3 status=PASSED active_in_window=3\nRATE_LIMIT ip=10.0.0.1 ts=4 status=DROPPED active_in_window=4\nRATE_LIMIT ip=10.0.0.1 ts=6 status=PASSED active_in_window=3\n\n[Cas 2 — Deux adresses IP distinctes avec quotas indépendants]\nRATE_LIMIT ip=192.168.1.1 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.2 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.1 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.2 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.1 ts=12 status=PASSED active_in_window=3\nRATE_LIMIT ip=192.168.1.1 ts=12 status=DROPPED active_in_window=4\n\n[Cas 3 — Trafic régulier et espacé sans dépassement]\nRATE_LIMIT ip=10.0.0.8 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.8 ts=15 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.8 ts=20 status=PASSED active_in_window=1"
  },
  {
    "id": "fw3-c5-e3",
    "chapter": 5,
    "title": "Moteur Deep Packet Inspection (DPI) et détection de signatures L7",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser le contenu applicatif des requêtes HTTP pour détecter les injections SQL, XSS et traversées de répertoires.",
    "brief": "<p>Le moteur <strong>DPI (Deep Packet Inspection)</strong> examine la charge utile (payload) au-delà des en-têtes réseau et transport pour neutraliser les attaques applicatives.<br><br>\nSignatures d'attaques à détecter (insensible à la casse) :<br>\n1. <strong>SQL Injection</strong> : présence de <code>union select</code>, <code>' or '1'='1</code>, <code>sleep(</code> ou <code>drop table</code>.<br>\n   -> Menace : <code>SQL_INJECTION</code>, Action : <code>BLOCK</code>.<br>\n2. <strong>Cross-Site Scripting (XSS)</strong> : présence de <code>&lt;script&gt;</code>, <code>javascript:</code> ou <code>onerror=</code>.<br>\n   -> Menace : <code>XSS_ATTACK</code>, Action : <code>BLOCK</code>.<br>\n3. <strong>Path Traversal</strong> : présence de <code>../</code>, <code>..\\</code> ou <code>/etc/passwd</code>.<br>\n   -> Menace : <code>PATH_TRAVERSAL</code>, Action : <code>BLOCK</code>.<br>\n4. Sinon : charge utile saine.<br>\n   -> Menace : <code>CLEAN</code>, Action : <code>ALLOW</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque ligne, afficher :<br>\n<code>DPI_ALERT id={id} threat={THREAT} action={BLOCK|ALLOW}</code></p>",
    "starter": "# Grille d'analyse (fw3-c5-e3) — Moteur Deep Packet Inspection (DPI) et détection de signatures L7\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Détection XSS et Path Traversal]\n# Données : PAYLOAD id=X1 payload=name=<script>alert(document.cookie)</script>\n# Données : PAYLOAD id=T1 payload=file=../../etc/passwd\nA_COMPLETER\n\n[Cas 2 — Variantes SQL Injection avec apostrophes et sleep]\n# Données : PAYLOAD id=S1 payload=user=' OR '1'='1\n# Données : PAYLOAD id=S2 payload=benchmark(10000000,MD5(1)) OR SLEEP(5)\nA_COMPLETER\n\n[Cas 3 — Payloads légitimes avec du texte complexe]\n# Données : PAYLOAD id=C1 payload=message=Bonjour, voici mon rapport mensuel.\n# Données : PAYLOAD id=C2 payload=path=/var/www/html/index.php\nA_COMPLETER\n",
    "hints": [
      "Normaliser la charge utile en minuscules.",
      "Tester dans l’ordre de la spécification : SQLi, XSS, Path Traversal, puis CLEAN."
    ],
    "examples": [
      {
        "stdin": "PAYLOAD id=P1 payload=id=1 UNION SELECT username, password FROM users\nPAYLOAD id=P2 payload=q=ordinateur+portable",
        "expected": "DPI_ALERT id=P1 threat=SQL_INJECTION action=BLOCK\nDPI_ALERT id=P2 threat=CLEAN action=ALLOW",
        "note": "P1 contient une signature SQLi évidente, P2 est une recherche utilisateur standard."
      }
    ],
    "tests": [
      {
        "label": "Détection XSS et Path Traversal",
        "stdin": "cas:1",
        "expected": "DPI_ALERT id=X1 threat=XSS_ATTACK action=BLOCK\nDPI_ALERT id=T1 threat=PATH_TRAVERSAL action=BLOCK"
      },
      {
        "label": "Variantes SQL Injection avec apostrophes et sleep",
        "stdin": "cas:2",
        "expected": "DPI_ALERT id=S1 threat=SQL_INJECTION action=BLOCK\nDPI_ALERT id=S2 threat=SQL_INJECTION action=BLOCK"
      },
      {
        "label": "Payloads légitimes avec du texte complexe",
        "stdin": "cas:3",
        "expected": "DPI_ALERT id=C1 threat=CLEAN action=ALLOW\nDPI_ALERT id=C2 threat=CLEAN action=ALLOW"
      }
    ],
    "solution": "[Exemple]\nDPI_ALERT id=P1 threat=SQL_INJECTION action=BLOCK\nDPI_ALERT id=P2 threat=CLEAN action=ALLOW\n\n[Cas 1 — Détection XSS et Path Traversal]\nDPI_ALERT id=X1 threat=XSS_ATTACK action=BLOCK\nDPI_ALERT id=T1 threat=PATH_TRAVERSAL action=BLOCK\n\n[Cas 2 — Variantes SQL Injection avec apostrophes et sleep]\nDPI_ALERT id=S1 threat=SQL_INJECTION action=BLOCK\nDPI_ALERT id=S2 threat=SQL_INJECTION action=BLOCK\n\n[Cas 3 — Payloads légitimes avec du texte complexe]\nDPI_ALERT id=C1 threat=CLEAN action=ALLOW\nDPI_ALERT id=C2 threat=CLEAN action=ALLOW"
  }
];
