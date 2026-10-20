'use strict';

module.exports = [
  {
    "id": "sup3-c5-e1",
    "chapter": 5,
    "title": "Parseur et Normalisateur de Logs Web Nginx / Apache",
    "level": "n1",
    "language": "analyse",
    "goal": "Extraire les champs structurés d'une ligne de journal HTTP Combined Log et classifier la réponse par catégorie.",
    "brief": "<p>Dans une chaîne Logstash / Fluentd, le parsing grok décompose la ligne de log :<br><br>\nFormat standard Combined Log :<br>\n<code>&lt;client_ip&gt; - - [&lt;timestamp&gt;] \"&lt;method&gt; &lt;uri&gt; &lt;http_version&gt;\" &lt;status_code&gt; &lt;response_bytes&gt; \"&lt;referrer&gt;\" \"&lt;user_agent&gt;\"</code><br><br>\nCatégories de statut :<br>\n- 200..299 : <code>SUCCESS</code><br>\n- 400..499 : <code>CLIENT_ERROR</code><br>\n- 500..599 : <code>SERVER_ERROR</code><br>\n- Autre : <code>OTHER</code><br><br>\nEntrée STDIN : <code>LOG_PARSE &lt;combined_log_line&gt;</code>.<br>\nSortie : <code>WEB_LOG: ip=&lt;client_ip&gt; method=&lt;method&gt; uri=&lt;uri&gt; status=&lt;status_code&gt; bytes=&lt;bytes&gt; category=&lt;category&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c5-e1) — Parseur et Normalisateur de Logs Web Nginx / Apache\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Requête POST de connexion réussie 200]\n# Données : LOG_PARSE 10.0.4.15 - - [11/Oct/2026:15:00:01 +0000] \"POST /auth/login HTTP/1.1\" 200 450 \"https://app.corp.local\" \"Mozilla/5.0\"\nA_COMPLETER\n\n[Cas 2 — Erreur client 404 page non trouvée avec octets nuls]\n# Données : LOG_PARSE 203.0.113.89 - - [11/Oct/2026:15:05:00 +0000] \"GET /admin/setup.php HTTP/1.1\" 404 - \"-\" \"scanner-bot\"\nA_COMPLETER\n\n[Cas 3 — Redirection HTTP 302 catégorisée OTHER]\n# Données : LOG_PARSE 172.16.0.2 - - [11/Oct/2026:15:10:00 +0000] \"GET /old-portal HTTP/1.1\" 302 120 \"-\" \"curl/8.0\"\nA_COMPLETER\n",
    "hints": [
      "Isolez l'adresse IP, la requête entre guillemets et le code de statut HTTP.",
      "Gérez le cas où les octets sont représentés par un tiret '-' en affectant 0."
    ],
    "examples": [
      {
        "stdin": "LOG_PARSE 192.168.1.10 - - [11/Oct/2026:14:32:10 +0000] \"GET /api/v1/users HTTP/1.1\" 500 2314 \"-\" \"curl/7.88.1\"",
        "expected": "WEB_LOG: ip=192.168.1.10 method=GET uri=/api/v1/users status=500 bytes=2314 category=SERVER_ERROR",
        "note": "Erreur serveur 500 sur une requête GET."
      }
    ],
    "tests": [
      {
        "label": "Requête POST de connexion réussie 200",
        "stdin": "cas:1",
        "expected": "WEB_LOG: ip=10.0.4.15 method=POST uri=/auth/login status=200 bytes=450 category=SUCCESS\n"
      },
      {
        "label": "Erreur client 404 page non trouvée avec octets nuls",
        "stdin": "cas:2",
        "expected": "WEB_LOG: ip=203.0.113.89 method=GET uri=/admin/setup.php status=404 bytes=0 category=CLIENT_ERROR\n"
      },
      {
        "label": "Redirection HTTP 302 catégorisée OTHER",
        "stdin": "cas:3",
        "expected": "WEB_LOG: ip=172.16.0.2 method=GET uri=/old-portal status=302 bytes=120 category=OTHER\n"
      }
    ],
    "solution": "[Exemple]\nWEB_LOG: ip=192.168.1.10 method=GET uri=/api/v1/users status=500 bytes=2314 category=SERVER_ERROR\n\n[Cas 1 — Requête POST de connexion réussie 200]\nWEB_LOG: ip=10.0.4.15 method=POST uri=/auth/login status=200 bytes=450 category=SUCCESS\n\n\n[Cas 2 — Erreur client 404 page non trouvée avec octets nuls]\nWEB_LOG: ip=203.0.113.89 method=GET uri=/admin/setup.php status=404 bytes=0 category=CLIENT_ERROR\n\n\n[Cas 3 — Redirection HTTP 302 catégorisée OTHER]\nWEB_LOG: ip=172.16.0.2 method=GET uri=/old-portal status=302 bytes=120 category=OTHER"
  },
  {
    "id": "sup3-c5-e2",
    "chapter": 5,
    "title": "Détecteur d’Anomalies de Débit de Logs (Spike & Drop)",
    "level": "n2",
    "language": "analyse",
    "goal": "Surveiller les variations d'Events Per Second (EPS) et détecter les pics anormaux (inondation) ou chutes brutales (panne de collecte).",
    "brief": "<p>La télémétrie des flux de logs permet de repérer des anomalies opérationnelles majeures :<br><br>\nCalcul de déviation sur le dernier échantillon de débit mesuré <code>current</code> :<br>\n<code>deviation_pct = ((current - BASELINE) / BASELINE) * 100.0</code>.<br><br>\nRègles d'alerte :<br>\n- Si <code>deviation_pct &gt;= MAX_SPIKE</code> : <code>alert=LOG_FLOOD action=REQUIRED</code>.<br>\n- Sinon si <code>deviation_pct &lt;= -MIN_DROP</code> : <code>alert=LOG_DROP action=REQUIRED</code>.<br>\n- Sinon : <code>alert=NORMAL action=NONE</code>.<br><br>\nEntrée STDIN : <code>EPS_CHECK BASELINE=&lt;base&gt; MIN_DROP=&lt;drop_pct&gt; MAX_SPIKE=&lt;spike_pct&gt; SAMPLES=&lt;s1,s2,...&gt;</code>.<br>\nSortie : <code>EPS_ALERT: current=&lt;curr:.1f&gt; deviation=&lt;dev_pct:+.1f&gt;% alert=&lt;LOG_FLOOD|LOG_DROP|NORMAL&gt; action=&lt;REQUIRED|NONE&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c5-e2) — Détecteur d’Anomalies de Débit de Logs (Spike & Drop)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chute brutale de logs (service écroulé)]\n# Données : EPS_CHECK BASELINE=1000.0 MIN_DROP=80.0 MAX_SPIKE=150.0 SAMPLES=980.0,950.0,120.0\nA_COMPLETER\n\n[Cas 2 — Débit nominal parfaitement stable]\n# Données : EPS_CHECK BASELINE=250.0 MIN_DROP=75.0 MAX_SPIKE=150.0 SAMPLES=245.0,260.0,255.0\nA_COMPLETER\n\n[Cas 3 — Légère baisse sans dépassement du seuil de drop]\n# Données : EPS_CHECK BASELINE=400.0 MIN_DROP=50.0 MAX_SPIKE=100.0 SAMPLES=380.0,300.0\nA_COMPLETER\n",
    "hints": [
      "Extrayez la dernière valeur de la liste SAMPLES.",
      "Formatez la déviation avec un signe explicite (+ ou -) via :+.1f."
    ],
    "examples": [
      {
        "stdin": "EPS_CHECK BASELINE=500.0 MIN_DROP=80.0 MAX_SPIKE=200.0 SAMPLES=480.0,510.0,520.0,1600.0",
        "expected": "EPS_ALERT: current=1600.0 deviation=+220.0% alert=LOG_FLOOD action=REQUIRED",
        "note": "Pic de débit de +220% dépassant le seuil de 200% : LOG_FLOOD."
      }
    ],
    "tests": [
      {
        "label": "Chute brutale de logs (service écroulé)",
        "stdin": "cas:1",
        "expected": "EPS_ALERT: current=120.0 deviation=-88.0% alert=LOG_DROP action=REQUIRED\n"
      },
      {
        "label": "Débit nominal parfaitement stable",
        "stdin": "cas:2",
        "expected": "EPS_ALERT: current=255.0 deviation=+2.0% alert=NORMAL action=NONE\n"
      },
      {
        "label": "Légère baisse sans dépassement du seuil de drop",
        "stdin": "cas:3",
        "expected": "EPS_ALERT: current=300.0 deviation=-25.0% alert=NORMAL action=NONE\n"
      }
    ],
    "solution": "[Exemple]\nEPS_ALERT: current=1600.0 deviation=+220.0% alert=LOG_FLOOD action=REQUIRED\n\n[Cas 1 — Chute brutale de logs (service écroulé)]\nEPS_ALERT: current=120.0 deviation=-88.0% alert=LOG_DROP action=REQUIRED\n\n\n[Cas 2 — Débit nominal parfaitement stable]\nEPS_ALERT: current=255.0 deviation=+2.0% alert=NORMAL action=NONE\n\n\n[Cas 3 — Légère baisse sans dépassement du seuil de drop]\nEPS_ALERT: current=300.0 deviation=-25.0% alert=NORMAL action=NONE"
  },
  {
    "id": "sup3-c5-e3",
    "chapter": 5,
    "title": "Corrélateur Multi-Sources de Logs d’Incidents de Sécurité",
    "level": "n3",
    "language": "analyse",
    "goal": "Regrouper et corréler les traces d'une adresse IP suspecte à travers des équipements hétérogènes.",
    "brief": "<p>En analyse SOC / SIEM, les traces laissées sur différents serveurs sont corrélées :<br><br>\nCritères de décision :<br>\n- Un événement est considéré <strong>suspect</strong> si sa sévérité est <code>WARN</code>, <code>ALERT</code> ou <code>DENY</code>.<br>\n- La mise en quarantaine (<code>quarantine=YES</code>) est décidée si l'adresse IP cible cumule <code>&gt;= 3</code> événements suspects OU si au moins un événement porte la sévérité bloquante <code>DENY</code>.<br>\n- Sinon, <code>quarantine=NO</code>.<br><br>\nEntrée STDIN : <code>CORRELATE TARGET_IP=&lt;ip&gt; LOGS=&lt;src1:ip1:act1:sev1|src2:ip2:act2:sev2|...&gt;</code>.<br>\nSortie : <code>CORRELATION: ip=&lt;TARGET_IP&gt; events=&lt;total_matches&gt; suspicious=&lt;n_suspects&gt; quarantine=&lt;YES|NO&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c5-e3) — Corrélateur Multi-Sources de Logs d’Incidents de Sécurité\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trafic légitime sans alerte]\n# Données : CORRELATE TARGET_IP=192.168.1.50 LOGS=firewall:192.168.1.50:TcpSyn:INFO|proxy:192.168.1.50:PageGet:INFO\nA_COMPLETER\n\n[Cas 2 — Blocage immédiat sur règle DENY de pare-feu]\n# Données : CORRELATE TARGET_IP=10.10.10.10 LOGS=firewall:10.10.10.10:SqlInjection:DENY\nA_COMPLETER\n\n[Cas 3 — Deux avertissements sous le seuil de 3]\n# Données : CORRELATE TARGET_IP=172.20.1.100 LOGS=proxy:172.20.1.100:SlowRequest:WARN|app:172.20.1.100:DeprecationCall:WARN\nA_COMPLETER\n",
    "hints": [
      "Isolez les événements correspondant à TARGET_IP.",
      "Vérifiez si le nombre d'événements suspects est >= 3 ou si la sévérité DENY apparaît."
    ],
    "examples": [
      {
        "stdin": "CORRELATE TARGET_IP=198.51.100.42 LOGS=firewall:198.51.100.42:PortScan:WARN|proxy:198.51.100.42:AuthFailed:WARN|proxy:10.0.0.5:HomeView:INFO|auth:198.51.100.42:BruteForce:ALERT",
        "expected": "CORRELATION: ip=198.51.100.42 events=3 suspicious=3 quarantine=YES",
        "note": "3 événements suspects cumulés entraînent une mise en quarantaine."
      }
    ],
    "tests": [
      {
        "label": "Trafic légitime sans alerte",
        "stdin": "cas:1",
        "expected": "CORRELATION: ip=192.168.1.50 events=2 suspicious=0 quarantine=NO\n"
      },
      {
        "label": "Blocage immédiat sur règle DENY de pare-feu",
        "stdin": "cas:2",
        "expected": "CORRELATION: ip=10.10.10.10 events=1 suspicious=1 quarantine=YES\n"
      },
      {
        "label": "Deux avertissements sous le seuil de 3",
        "stdin": "cas:3",
        "expected": "CORRELATION: ip=172.20.1.100 events=2 suspicious=2 quarantine=NO\n"
      }
    ],
    "solution": "[Exemple]\nCORRELATION: ip=198.51.100.42 events=3 suspicious=3 quarantine=YES\n\n[Cas 1 — Trafic légitime sans alerte]\nCORRELATION: ip=192.168.1.50 events=2 suspicious=0 quarantine=NO\n\n\n[Cas 2 — Blocage immédiat sur règle DENY de pare-feu]\nCORRELATION: ip=10.10.10.10 events=1 suspicious=1 quarantine=YES\n\n\n[Cas 3 — Deux avertissements sous le seuil de 3]\nCORRELATION: ip=172.20.1.100 events=2 suspicious=2 quarantine=NO"
  }
];
