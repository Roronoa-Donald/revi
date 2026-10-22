'use strict';

module.exports = [
  {
    "id": "gcp3-c4-e1",
    "chapter": 4,
    "title": "Calculateur de Sous-réseaux VPC et Adresses IP Réservées GCP",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le nombre d'adresses IP totales et utilisables dans un sous-réseau VPC Google Cloud en tenant compte des 4 adresses réservées.",
    "brief": "<p>Dans un sous-réseau Google Cloud VPC, 4 adresses IP sont systématiquement réservées par l'infrastructure :<br>\n- <code>première (.0)</code> : Adresse réseau (Network)<br>\n- <code>seconde (.1)</code> : Passerelle par défaut du sous-réseau (Default Gateway)<br>\n- <code>troisième (.2)</code> : Réservée par Google (DNS interne)<br>\n- <code>dernière (.255 pour /24)</code> : Réservée par Google (Diffusion/Broadcast)<br><br>\nAdresses utilisables pour les instances = <code>2^(32 - prefix) - 4</code>.<br><br>\nParamètres soumis à l’analyse :<br>\n<code>SUBNET_CALC cidr=&lt;IP/prefix&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n<code>SUBNET: cidr=&lt;cidr&gt; total_ips=&lt;T&gt; usable_ips=&lt;U&gt; gateway=&lt;gw_ip&gt;</code>.</p>",
    "starter": "# Grille d'analyse (gcp3-c4-e1) — Calculateur de Sous-réseaux VPC et Adresses IP Réservées GCP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau de production plus large /20]\n# Données : SUBNET_CALC cidr=172.16.0.0/20\nA_COMPLETER\n\n[Cas 2 — Sous-réseau compact /28]\n# Données : SUBNET_CALC cidr=192.168.1.32/28\nA_COMPLETER\n",
    "hints": [
      "Utilisez le module standard la notation CIDR du réseau.",
      "Le nombre total d’adresses du bloc CIDR /n vaut 2^(32 - n).",
      "L’adresse de passerelle par défaut (gateway) est la deuxième adresse du sous-réseau (.1)."
    ],
    "examples": [
      {
        "stdin": "SUBNET_CALC cidr=10.10.0.0/24",
        "expected": "SUBNET: cidr=10.10.0.0/24 total_ips=256 usable_ips=252 gateway=10.10.0.1",
        "note": "Sous-réseau /24 standard avec 252 IP assignables à des instances."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau de production plus large /20",
        "stdin": "cas:1",
        "expected": "SUBNET: cidr=172.16.0.0/20 total_ips=4096 usable_ips=4092 gateway=172.16.0.1"
      },
      {
        "label": "Sous-réseau compact /28",
        "stdin": "cas:2",
        "expected": "SUBNET: cidr=192.168.1.32/28 total_ips=16 usable_ips=12 gateway=192.168.1.33"
      }
    ],
    "solution": "[Exemple]\nSUBNET: cidr=10.10.0.0/24 total_ips=256 usable_ips=252 gateway=10.10.0.1\n\n[Cas 1 — Sous-réseau de production plus large /20]\nSUBNET: cidr=172.16.0.0/20 total_ips=4096 usable_ips=4092 gateway=172.16.0.1\n\n[Cas 2 — Sous-réseau compact /28]\nSUBNET: cidr=192.168.1.32/28 total_ips=16 usable_ips=12 gateway=192.168.1.33"
  },
  {
    "id": "gcp3-c4-e2",
    "chapter": 4,
    "title": "Évaluateur et Linter de Règles de Pare-feu VPC (VPC Firewall Rules)",
    "level": "n2",
    "language": "analyse",
    "goal": "Évaluer le filtrage de flux réseau face à une liste ordonnée de règles de pare-feu VPC Google Cloud.",
    "brief": "<p>Les règles de pare-feu VPC appliquent un filtrage avec état (stateful) ordonné par priorité (0 à 65535, la priorité la plus petite s'appliquant en premier) :<br>\nChaque règle est définie par :<br>\n<code>RULE priority=&lt;p&gt; action=&lt;ALLOW|DENY&gt; proto=&lt;tcp|udp|icmp&gt; port=&lt;port&gt;</code>.<br>\n(port peut valoir un entier ou 'all').<br><br>\nCommande de test :<br>\n<code>TEST_PACKET proto=&lt;proto&gt; port=&lt;port&gt;</code>.<br>\nParcourt les règles chargées dans l'ordre de priorité croissante :<br>\n- La première règle correspondante décide : <code>PACKET: proto=&lt;proto&gt; port=&lt;port&gt; action=&lt;ALLOW|DENY&gt; matched_priority=&lt;p&gt;</code>.<br>\n- Si aucune règle ne correspond, la règle implicite s'applique : <code>PACKET: proto=&lt;proto&gt; port=&lt;port&gt; action=DENY matched_priority=65535 (implicit_deny)</code>.</p>",
    "starter": "# Grille d'analyse (gcp3-c4-e2) — Évaluateur et Linter de Règles de Pare-feu VPC (VPC Firewall Rules)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Application de la règle de refus implicite 65535]\n# Données : RULE priority=500 action=ALLOW proto=udp port=53\n# Données : TEST_PACKET proto=tcp port=8080\nA_COMPLETER\n\n[Cas 2 — Règle de blocage prioritaire écrasant une règle permissive de priorité plus basse]\n# Données : RULE priority=100 action=DENY proto=tcp port=22\n# Données : RULE priority=1000 action=ALLOW proto=tcp port=all\n# Données : TEST_PACKET proto=tcp port=22\n# Données : TEST_PACKET proto=tcp port=80\nA_COMPLETER\n",
    "hints": [
      "Stockez les règles et triez-les par priorité croissante.",
      "Une règle correspond si rule_proto == test_proto et (rule_port == \"all\" ou int(rule_port) == int(test_port))."
    ],
    "examples": [
      {
        "stdin": "RULE priority=1000 action=ALLOW proto=tcp port=443\nRULE priority=1000 action=ALLOW proto=tcp port=80\nRULE priority=2000 action=DENY proto=tcp port=all\nTEST_PACKET proto=tcp port=443\nTEST_PACKET proto=tcp port=22",
        "expected": "PACKET: proto=tcp port=443 action=ALLOW matched_priority=1000\nPACKET: proto=tcp port=22 action=DENY matched_priority=2000",
        "note": "Le port 443 est autorisé à priorité 1000, le port 22 est bloqué à priorité 2000."
      }
    ],
    "tests": [
      {
        "label": "Application de la règle de refus implicite 65535",
        "stdin": "cas:1",
        "expected": "PACKET: proto=tcp port=8080 action=DENY matched_priority=65535 (implicit_deny)"
      },
      {
        "label": "Règle de blocage prioritaire écrasant une règle permissive de priorité plus basse",
        "stdin": "cas:2",
        "expected": "PACKET: proto=tcp port=22 action=DENY matched_priority=100\nPACKET: proto=tcp port=80 action=ALLOW matched_priority=1000"
      }
    ],
    "solution": "[Exemple]\nPACKET: proto=tcp port=443 action=ALLOW matched_priority=1000\nPACKET: proto=tcp port=22 action=DENY matched_priority=2000\n\n[Cas 1 — Application de la règle de refus implicite 65535]\nPACKET: proto=tcp port=8080 action=DENY matched_priority=65535 (implicit_deny)\n\n[Cas 2 — Règle de blocage prioritaire écrasant une règle permissive de priorité plus basse]\nPACKET: proto=tcp port=22 action=DENY matched_priority=100\nPACKET: proto=tcp port=80 action=ALLOW matched_priority=1000"
  },
  {
    "id": "gcp3-c4-e3",
    "chapter": 4,
    "title": "Simulateur de Répartiteur de Charge Global HTTP(S) et URL Maps",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le routage de requêtes Anycast d'un Global External HTTP(S) Load Balancer selon les règles d'URL Map.",
    "brief": "<p>Un répartiteur de charge mondial Cloud Load Balancing utilise une URL Map pour acheminer le trafic :<br>\nRègles de routage chargées :<br>\n<code>ROUTE_MAP host=&lt;host&gt; path_prefix=&lt;prefix&gt; backend=&lt;service&gt; protocol=&lt;HTTP|HTTPS&gt;</code>.<br>\n(host peut être un domaine exact ou wildcard <code>*</code>).<br><br>\nCommande de requête :<br>\n<code>DISPATCH_REQUEST host=&lt;host&gt; path=&lt;path&gt;</code>.<br>\nRecherche de la correspondance la plus spécifique (préfixe de chemin le plus long correspondant) :<br>\n- Si trouvé : <code>DISPATCH: host=&lt;host&gt; path=&lt;path&gt; backend=&lt;service&gt; protocol=&lt;proto&gt; status=FORWARDED</code><br>\n- Si aucun backend ne correspond : <code>DISPATCH: host=&lt;host&gt; path=&lt;path&gt; status=404_NOT_FOUND</code></p>",
    "starter": "# Grille d'analyse (gcp3-c4-e3) — Simulateur de Répartiteur de Charge Global HTTP(S) et URL Maps\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Routage générique avec hôte wildcard]\n# Données : ROUTE_MAP host=* path_prefix=/static backend=cdn-static-backend protocol=HTTPS\n# Données : DISPATCH_REQUEST host=web.store.com path=/static/logo.svg\nA_COMPLETER\n\n[Cas 2 — Rejet requête sans backend configuré 404]\n# Données : ROUTE_MAP host=secure.bank.corp path_prefix=/api backend=banking-backend protocol=HTTPS\n# Données : DISPATCH_REQUEST host=other.site.org path=/index.html\nA_COMPLETER\n",
    "hints": [
      "Stockez les règles et filtrez d abord par correspondance d hôte (exact ou \"*\").",
      "Sélectionnez la règle dont path_prefix correspond au début de path avec la longueur maximale."
    ],
    "examples": [
      {
        "stdin": "ROUTE_MAP host=api.cloud.corp path_prefix=/v1/users backend=user-service-backend protocol=HTTPS\nROUTE_MAP host=api.cloud.corp path_prefix=/ backend=default-api-backend protocol=HTTPS\nDISPATCH_REQUEST host=api.cloud.corp path=/v1/users/list\nDISPATCH_REQUEST host=api.cloud.corp path=/health",
        "expected": "DISPATCH: host=api.cloud.corp path=/v1/users/list backend=user-service-backend protocol=HTTPS status=FORWARDED\nDISPATCH: host=api.cloud.corp path=/health backend=default-api-backend protocol=HTTPS status=FORWARDED",
        "note": "Le préfixe le plus spécifique /v1/users l emporte sur la racine /."
      }
    ],
    "tests": [
      {
        "label": "Routage générique avec hôte wildcard",
        "stdin": "cas:1",
        "expected": "DISPATCH: host=web.store.com path=/static/logo.svg backend=cdn-static-backend protocol=HTTPS status=FORWARDED"
      },
      {
        "label": "Rejet requête sans backend configuré 404",
        "stdin": "cas:2",
        "expected": "DISPATCH: host=other.site.org path=/index.html status=404_NOT_FOUND"
      }
    ],
    "solution": "[Exemple]\nDISPATCH: host=api.cloud.corp path=/v1/users/list backend=user-service-backend protocol=HTTPS status=FORWARDED\nDISPATCH: host=api.cloud.corp path=/health backend=default-api-backend protocol=HTTPS status=FORWARDED\n\n[Cas 1 — Routage générique avec hôte wildcard]\nDISPATCH: host=web.store.com path=/static/logo.svg backend=cdn-static-backend protocol=HTTPS status=FORWARDED\n\n[Cas 2 — Rejet requête sans backend configuré 404]\nDISPATCH: host=other.site.org path=/index.html status=404_NOT_FOUND"
  }
];
