/**
 * server/exercises/b3-supervision/chapitre5.js — Exercices du Chapitre 5
 * Chapitre 5 : Gestion des Journaux & Logs Centralisés (ELK/EFK)
 */

module.exports = [
  {
    id: 'sup3-c5-e1',
    chapter: 5,
    title: 'Parseur et Normalisateur de Logs Web Nginx / Apache',
    level: 'n1',
    language: 'python',
    goal: 'Extraire les champs structurés d\'une ligne de journal HTTP Combined Log et classifier la réponse par catégorie.',
    brief: `<p>Dans une chaîne Logstash / Fluentd, le parsing grok décompose la ligne de log :<br><br>
Format standard Combined Log :<br>
<code>&lt;client_ip&gt; - - [&lt;timestamp&gt;] "&lt;method&gt; &lt;uri&gt; &lt;http_version&gt;" &lt;status_code&gt; &lt;response_bytes&gt; "&lt;referrer&gt;" "&lt;user_agent&gt;"</code><br><br>
Catégories de statut :<br>
- 200..299 : <code>SUCCESS</code><br>
- 400..499 : <code>CLIENT_ERROR</code><br>
- 500..599 : <code>SERVER_ERROR</code><br>
- Autre : <code>OTHER</code><br><br>
Entrée STDIN : <code>LOG_PARSE &lt;combined_log_line&gt;</code>.<br>
Sortie : <code>WEB_LOG: ip=&lt;client_ip&gt; method=&lt;method&gt; uri=&lt;uri&gt; status=&lt;status_code&gt; bytes=&lt;bytes&gt; category=&lt;category&gt;</code>.</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : décomposer la ligne Combined Log et classifier le code HTTP
`,
    hints: [
      "Isolez l'adresse IP, la requête entre guillemets et le code de statut HTTP.",
      "Gérez le cas où les octets sont représentés par un tiret '-' en affectant 0."
    ],
    examples: [
      {
        stdin: 'LOG_PARSE 192.168.1.10 - - [11/Oct/2026:14:32:10 +0000] "GET /api/v1/users HTTP/1.1" 500 2314 "-" "curl/7.88.1"',
        expected: 'WEB_LOG: ip=192.168.1.10 method=GET uri=/api/v1/users status=500 bytes=2314 category=SERVER_ERROR',
        note: "Erreur serveur 500 sur une requête GET."
      }
    ],
    tests: [
      {
        label: 'Requête POST de connexion réussie 200',
        stdin: 'LOG_PARSE 10.0.4.15 - - [11/Oct/2026:15:00:01 +0000] "POST /auth/login HTTP/1.1" 200 450 "https://app.corp.local" "Mozilla/5.0"',
        expected: 'WEB_LOG: ip=10.0.4.15 method=POST uri=/auth/login status=200 bytes=450 category=SUCCESS\n'
      },
      {
        label: 'Erreur client 404 page non trouvée avec octets nuls',
        stdin: 'LOG_PARSE 203.0.113.89 - - [11/Oct/2026:15:05:00 +0000] "GET /admin/setup.php HTTP/1.1" 404 - "-" "scanner-bot"',
        expected: 'WEB_LOG: ip=203.0.113.89 method=GET uri=/admin/setup.php status=404 bytes=0 category=CLIENT_ERROR\n'
      },
      {
        label: 'Redirection HTTP 302 catégorisée OTHER',
        stdin: 'LOG_PARSE 172.16.0.2 - - [11/Oct/2026:15:10:00 +0000] "GET /old-portal HTTP/1.1" 302 120 "-" "curl/8.0"',
        expected: 'WEB_LOG: ip=172.16.0.2 method=GET uri=/old-portal status=302 bytes=120 category=OTHER\n'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("LOG_PARSE "):
        continue
    raw_log = ligne.split("LOG_PARSE ", 1)[1].strip()

    pattern = r'^(\\S+)\\s+\\S+\\s+\\S+\\s+\\[([^\\]]+)\\]\\s+"([A-Z]+)\\s+(\\S+)\\s+([^"]+)"\\s+(\\d{3})\\s+(\\S+)\\s+"([^"]*)"\\s+"([^"]*)"$'
    m = re.match(pattern, raw_log)
    if not m:
        continue

    client_ip = m.group(1)
    method = m.group(3)
    uri = m.group(4)
    status_code = int(m.group(6))
    bytes_str = m.group(7)
    response_bytes = int(bytes_str) if bytes_str.isdigit() else 0

    if 200 <= status_code < 300:
        cat = "SUCCESS"
    elif 400 <= status_code < 500:
        cat = "CLIENT_ERROR"
    elif 500 <= status_code < 600:
        cat = "SERVER_ERROR"
    else:
        cat = "OTHER"

    print(f"WEB_LOG: ip={client_ip} method={method} uri={uri} status={status_code} bytes={response_bytes} category={cat}")
`
  },
  {
    id: 'sup3-c5-e2',
    chapter: 5,
    title: 'Détecteur d’Anomalies de Débit de Logs (Spike & Drop)',
    level: 'n2',
    language: 'python',
    goal: 'Surveiller les variations d\'Events Per Second (EPS) et détecter les pics anormaux (inondation) ou chutes brutales (panne de collecte).',
    brief: `<p>La télémétrie des flux de logs permet de repérer des anomalies opérationnelles majeures :<br><br>
Calcul de déviation sur le dernier échantillon de débit mesuré <code>current</code> :<br>
<code>deviation_pct = ((current - BASELINE) / BASELINE) * 100.0</code>.<br><br>
Règles d'alerte :<br>
- Si <code>deviation_pct &gt;= MAX_SPIKE</code> : <code>alert=LOG_FLOOD action=REQUIRED</code>.<br>
- Sinon si <code>deviation_pct &lt;= -MIN_DROP</code> : <code>alert=LOG_DROP action=REQUIRED</code>.<br>
- Sinon : <code>alert=NORMAL action=NONE</code>.<br><br>
Entrée STDIN : <code>EPS_CHECK BASELINE=&lt;base&gt; MIN_DROP=&lt;drop_pct&gt; MAX_SPIKE=&lt;spike_pct&gt; SAMPLES=&lt;s1,s2,...&gt;</code>.<br>
Sortie : <code>EPS_ALERT: current=&lt;curr:.1f&gt; deviation=&lt;dev_pct:+.1f&gt;% alert=&lt;LOG_FLOOD|LOG_DROP|NORMAL&gt; action=&lt;REQUIRED|NONE&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser le dernier échantillon de débit et identifier l'anomalie
`,
    hints: [
      "Extrayez la dernière valeur de la liste SAMPLES.",
      "Formatez la déviation avec un signe explicite (+ ou -) via :+.1f."
    ],
    examples: [
      {
        stdin: 'EPS_CHECK BASELINE=500.0 MIN_DROP=80.0 MAX_SPIKE=200.0 SAMPLES=480.0,510.0,520.0,1600.0',
        expected: 'EPS_ALERT: current=1600.0 deviation=+220.0% alert=LOG_FLOOD action=REQUIRED',
        note: "Pic de débit de +220% dépassant le seuil de 200% : LOG_FLOOD."
      }
    ],
    tests: [
      {
        label: 'Chute brutale de logs (service écroulé)',
        stdin: 'EPS_CHECK BASELINE=1000.0 MIN_DROP=80.0 MAX_SPIKE=150.0 SAMPLES=980.0,950.0,120.0',
        expected: 'EPS_ALERT: current=120.0 deviation=-88.0% alert=LOG_DROP action=REQUIRED\n'
      },
      {
        label: 'Débit nominal parfaitement stable',
        stdin: 'EPS_CHECK BASELINE=250.0 MIN_DROP=75.0 MAX_SPIKE=150.0 SAMPLES=245.0,260.0,255.0',
        expected: 'EPS_ALERT: current=255.0 deviation=+2.0% alert=NORMAL action=NONE\n'
      },
      {
        label: 'Légère baisse sans dépassement du seuil de drop',
        stdin: 'EPS_CHECK BASELINE=400.0 MIN_DROP=50.0 MAX_SPIKE=100.0 SAMPLES=380.0,300.0',
        expected: 'EPS_ALERT: current=300.0 deviation=-25.0% alert=NORMAL action=NONE\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("EPS_CHECK "):
        continue
    parts = ligne.split("EPS_CHECK ", 1)[1].strip().split()
    params = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            params[k] = v

    baseline = float(params.get("BASELINE", "100.0"))
    min_drop = float(params.get("MIN_DROP", "80.0"))
    max_spike = float(params.get("MAX_SPIKE", "200.0"))
    samples = [float(x.strip()) for x in params.get("SAMPLES", "0").split(",") if x.strip()]

    if not samples:
        continue

    curr = samples[-1]
    dev_pct = ((curr - baseline) / baseline) * 100.0 if baseline > 0 else 0.0

    if dev_pct >= max_spike:
        alert = "LOG_FLOOD"
        action = "REQUIRED"
    elif dev_pct <= -min_drop:
        alert = "LOG_DROP"
        action = "REQUIRED"
    else:
        alert = "NORMAL"
        action = "NONE"

    print(f"EPS_ALERT: current={curr:.1f} deviation={dev_pct:+.1f}% alert={alert} action={action}")
`
  },
  {
    id: 'sup3-c5-e3',
    chapter: 5,
    title: 'Corrélateur Multi-Sources de Logs d’Incidents de Sécurité',
    level: 'n3',
    language: 'python',
    goal: 'Regrouper et corréler les traces d\'une adresse IP suspecte à travers des équipements hétérogènes.',
    brief: `<p>En analyse SOC / SIEM, les traces laissées sur différents serveurs sont corrélées :<br><br>
Critères de décision :<br>
- Un événement est considéré <strong>suspect</strong> si sa sévérité est <code>WARN</code>, <code>ALERT</code> ou <code>DENY</code>.<br>
- La mise en quarantaine (<code>quarantine=YES</code>) est décidée si l'adresse IP cible cumule <code>&gt;= 3</code> événements suspects OU si au moins un événement porte la sévérité bloquante <code>DENY</code>.<br>
- Sinon, <code>quarantine=NO</code>.<br><br>
Entrée STDIN : <code>CORRELATE TARGET_IP=&lt;ip&gt; LOGS=&lt;src1:ip1:act1:sev1|src2:ip2:act2:sev2|...&gt;</code>.<br>
Sortie : <code>CORRELATION: ip=&lt;TARGET_IP&gt; events=&lt;total_matches&gt; suspicious=&lt;n_suspects&gt; quarantine=&lt;YES|NO&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : filtrer par TARGET_IP, compter les alertes suspectes et évaluer la quarantaine
`,
    hints: [
      "Isolez les événements correspondant à TARGET_IP.",
      "Vérifiez si le nombre d'événements suspects est >= 3 ou si la sévérité DENY apparaît."
    ],
    examples: [
      {
        stdin: 'CORRELATE TARGET_IP=198.51.100.42 LOGS=firewall:198.51.100.42:PortScan:WARN|proxy:198.51.100.42:AuthFailed:WARN|proxy:10.0.0.5:HomeView:INFO|auth:198.51.100.42:BruteForce:ALERT',
        expected: 'CORRELATION: ip=198.51.100.42 events=3 suspicious=3 quarantine=YES',
        note: "3 événements suspects cumulés entraînent une mise en quarantaine."
      }
    ],
    tests: [
      {
        label: 'Trafic légitime sans alerte',
        stdin: 'CORRELATE TARGET_IP=192.168.1.50 LOGS=firewall:192.168.1.50:TcpSyn:INFO|proxy:192.168.1.50:PageGet:INFO',
        expected: 'CORRELATION: ip=192.168.1.50 events=2 suspicious=0 quarantine=NO\n'
      },
      {
        label: 'Blocage immédiat sur règle DENY de pare-feu',
        stdin: 'CORRELATE TARGET_IP=10.10.10.10 LOGS=firewall:10.10.10.10:SqlInjection:DENY',
        expected: 'CORRELATION: ip=10.10.10.10 events=1 suspicious=1 quarantine=YES\n'
      },
      {
        label: 'Deux avertissements sous le seuil de 3',
        stdin: 'CORRELATE TARGET_IP=172.20.1.100 LOGS=proxy:172.20.1.100:SlowRequest:WARN|app:172.20.1.100:DeprecationCall:WARN',
        expected: 'CORRELATION: ip=172.20.1.100 events=2 suspicious=2 quarantine=NO\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("CORRELATE "):
        continue
    parts = ligne.split("CORRELATE ", 1)[1].strip().split()
    params = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            params[k] = v

    target_ip = params.get("TARGET_IP", "")
    raw_logs = params.get("LOGS", "")

    matching_count = 0
    suspicious_count = 0
    has_deny = False

    if raw_logs:
        tokens = raw_logs.split("|")
        for tok in tokens:
            t_parts = tok.split(":")
            if len(t_parts) >= 4:
                src, ip, act, sev = t_parts[0], t_parts[1], t_parts[2], t_parts[3]
                if ip == target_ip:
                    matching_count += 1
                    if sev in ("WARN", "ALERT", "DENY"):
                        suspicious_count += 1
                    if sev == "DENY":
                        has_deny = True

    quarantine = "YES" if (suspicious_count >= 3 or has_deny) else "NO"
    print(f"CORRELATION: ip={target_ip} events={matching_count} suspicious={suspicious_count} quarantine={quarantine}")
`
  }
];
