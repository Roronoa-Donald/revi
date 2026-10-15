/**
 * Exercices Chapitre 5 — Firewall & Sécurité Réseau B3.
 * Filtrage applicatif L7, UTM & Pare-feux nouvelle génération (NGFW).
 */
'use strict';

module.exports = [
  {
    id: 'fw3-c5-e1',
    chapter: 5,
    title: 'Filtrage de domaines DNS & inspection du Server Name Indication (SNI TLS)',
    level: 'n1',
    language: 'python',
    goal: 'Classer les noms d’hôtes extraits de l’extension SNI TLS selon leur catégorie de réputation et appliquer la politique de sécurité.',
    brief: `<p>Un pare-feu nouvelle génération (NGFW) inspecte le champ <strong>SNI (Server Name Indication)</strong> du message TLS <em>Client Hello</em> pour identifier le site web visité sans avoir besoin de déchiffrer tout le trafic.<br><br>
Base de réputation et politique d'entreprise :<br>
- Domaines contenant <code>phish</code>, <code>malware</code> ou finissant par <code>.evil</code> : catégorie <code>MALWARE</code> -> Action <code>BLOCK</code>.<br>
- Domaines contenant <code>casino</code>, <code>bet</code> ou finissant par <code>.gamble</code> : catégorie <code>GAMBLING</code> -> Action <code>BLOCK</code>.<br>
- Domaines contenant <code>facebook</code>, <code>tiktok</code>, <code>instagram</code> : catégorie <code>SOCIAL_MEDIA</code> -> Action <code>BLOCK</code>.<br>
- Tous les autres domaines : catégorie <code>BUSINESS_TECH</code> -> Action <code>ALLOW</code>.<br><br>
Le script lit sur l'entrée standard des événements d'inspection SNI :<br>
<code>SNI_EVENT id=&lt;id&gt; client_ip=&lt;ip&gt; host=&lt;domaine&gt;</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>SNI_INSPECT id={id} host={host} category={CAT} action={ALLOW|BLOCK}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les domaines SNI et appliquer l'action ALLOW ou BLOCK
`,
    hints: [
      'Convertir l’hôte en minuscules avant l’analyse.',
      'Tester dans l’ordre : MALWARE, GAMBLING, SOCIAL_MEDIA, puis défaut BUSINESS_TECH.'
    ],
    examples: [
      {
        stdin: 'SNI_EVENT id=1 client_ip=192.168.1.10 host=login-bank.phishing-portal.com\nSNI_EVENT id=2 client_ip=192.168.1.10 host=docs.python.org',
        expected: 'SNI_INSPECT id=1 host=login-bank.phishing-portal.com category=MALWARE action=BLOCK\nSNI_INSPECT id=2 host=docs.python.org category=BUSINESS_TECH action=ALLOW',
        note: 'Le domaine de phishing est bloqué, la documentation technique est autorisée.'
      }
    ],
    tests: [
      {
        label: 'Blocage des réseaux sociaux et sites de jeux',
        stdin: 'SNI_EVENT id=E1 client_ip=10.0.0.5 host=www.facebook.com\nSNI_EVENT id=E2 client_ip=10.0.0.5 host=sports.bet365.com\nSNI_EVENT id=E3 client_ip=10.0.0.5 host=api.github.com',
        expected: 'SNI_INSPECT id=E1 host=www.facebook.com category=SOCIAL_MEDIA action=BLOCK\nSNI_INSPECT id=E2 host=sports.bet365.com category=GAMBLING action=BLOCK\nSNI_INSPECT id=E3 host=api.github.com category=BUSINESS_TECH action=ALLOW'
      },
      {
        label: 'Détection de malware avec extension spéciale',
        stdin: 'SNI_EVENT id=M1 client_ip=172.16.1.20 host=trojan-downloader.evil\nSNI_EVENT id=M2 client_ip=172.16.1.20 host=roulette.online.gamble',
        expected: 'SNI_INSPECT id=M1 host=trojan-downloader.evil category=MALWARE action=BLOCK\nSNI_INSPECT id=M2 host=roulette.online.gamble category=GAMBLING action=BLOCK'
      },
      {
        label: 'Trafic légitime professionnel varié',
        stdin: 'SNI_EVENT id=B1 client_ip=192.168.1.15 host=pypi.org\nSNI_EVENT id=B2 client_ip=192.168.1.15 host=stackoverflow.com',
        expected: 'SNI_INSPECT id=B1 host=pypi.org category=BUSINESS_TECH action=ALLOW\nSNI_INSPECT id=B2 host=stackoverflow.com category=BUSINESS_TECH action=ALLOW'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'id=([^\\s]+)\\s+client_ip=([^\\s]+)\\s+host=([^\\s]+)', lig)
    if not m:
        continue
    eid, client, host = m.groups()
    host_lower = host.lower()
    
    if 'phish' in host_lower or 'malware' in host_lower or host_lower.endswith('.evil'):
        category = 'MALWARE'
        action = 'BLOCK'
    elif 'casino' in host_lower or 'bet' in host_lower or host_lower.endswith('.gamble'):
        category = 'GAMBLING'
        action = 'BLOCK'
    elif any(s in host_lower for s in ('facebook', 'tiktok', 'instagram')):
        category = 'SOCIAL_MEDIA'
        action = 'BLOCK'
    else:
        category = 'BUSINESS_TECH'
        action = 'ALLOW'
        
    print(f"SNI_INSPECT id={eid} host={host} category={category} action={action}")
`
  },
  {
    id: 'fw3-c5-e2',
    chapter: 5,
    title: 'Limiteur de débit et protection anti-DoS par fenêtre glissante',
    level: 'n2',
    language: 'python',
    goal: 'Implémenter un limiteur de débit par IP pour contrer les rafales de requêtes et dénis de service.',
    brief: `<p>Pour protéger les serveurs contre les inondations et attaques par force brute, les modules NGFW/UTM intègrent des mécanismes de <strong>Rate Limiting</strong>.<br><br>
Règles de filtrage par fenêtre glissante :<br>
- Taille de la fenêtre : <code>5</code> secondes.<br>
- Quota maximal : <code>3</code> requêtes autorisées dans l'intervalle <code>[ts - 4, ts]</code> (inclusif).<br>
- Lorsqu'une requête arrive à l'instant <code>ts</code> pour une adresse <code>ip</code> :<br>
  On compte combien de requêtes antérieures de cette même IP se situent dans <code>[ts - 4, ts]</code>.<br>
  Si le compte (requête courante comprise) est <code>&lt;= 3</code> : la requête est admise (<code>PASSED</code>).<br>
  Si le compte dépasse 3 : la requête est rejetée (<code>DROPPED</code>) et n'est pas comptabilisée dans les requêtes acceptées.<br><br>
Le script lit sur l'entrée standard des événements ordonnés chronologiquement :<br>
<code>REQ ts=&lt;timestamp_sec&gt; ip=&lt;ip&gt;</code>.<br><br>
Pour chaque requête, afficher :<br>
<code>RATE_LIMIT ip={ip} ts={ts} status={PASSED|DROPPED} active_in_window={count}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : suivre la fenêtre glissante de 5s et appliquer le quota
`,
    hints: [
      'Garder pour chaque IP une liste des timestamps des requêtes acceptées (PASSED).',
      'Nettoyer ou filtrer les timestamps strictement plus petits que ts - 4.',
      'Si len(timestamps_valides) < 3, ajouter ts et afficher PASSED.'
    ],
    examples: [
      {
        stdin: 'REQ ts=10 ip=192.168.1.5\nREQ ts=11 ip=192.168.1.5\nREQ ts=12 ip=192.168.1.5\nREQ ts=13 ip=192.168.1.5',
        expected: 'RATE_LIMIT ip=192.168.1.5 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.5 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.5 ts=12 status=PASSED active_in_window=3\nRATE_LIMIT ip=192.168.1.5 ts=13 status=DROPPED active_in_window=4',
        note: 'La 4e requête à ts=13 dépasse le quota de 3 dans la fenêtre [9, 13].'
      }
    ],
    tests: [
      {
        label: 'Expiration de fenêtre permettant de nouvelles requêtes',
        stdin: 'REQ ts=1 ip=10.0.0.1\nREQ ts=2 ip=10.0.0.1\nREQ ts=3 ip=10.0.0.1\nREQ ts=4 ip=10.0.0.1\nREQ ts=6 ip=10.0.0.1',
        expected: 'RATE_LIMIT ip=10.0.0.1 ts=1 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.1 ts=2 status=PASSED active_in_window=2\nRATE_LIMIT ip=10.0.0.1 ts=3 status=PASSED active_in_window=3\nRATE_LIMIT ip=10.0.0.1 ts=4 status=DROPPED active_in_window=4\nRATE_LIMIT ip=10.0.0.1 ts=6 status=PASSED active_in_window=3'
      },
      {
        label: 'Deux adresses IP distinctes avec quotas indépendants',
        stdin: 'REQ ts=10 ip=192.168.1.1\nREQ ts=10 ip=192.168.1.2\nREQ ts=11 ip=192.168.1.1\nREQ ts=11 ip=192.168.1.2\nREQ ts=12 ip=192.168.1.1\nREQ ts=12 ip=192.168.1.1',
        expected: 'RATE_LIMIT ip=192.168.1.1 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.2 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.1 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.2 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.1 ts=12 status=PASSED active_in_window=3\nRATE_LIMIT ip=192.168.1.1 ts=12 status=DROPPED active_in_window=4'
      },
      {
        label: 'Trafic régulier et espacé sans dépassement',
        stdin: 'REQ ts=10 ip=10.0.0.8\nREQ ts=15 ip=10.0.0.8\nREQ ts=20 ip=10.0.0.8',
        expected: 'RATE_LIMIT ip=10.0.0.8 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.8 ts=15 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.8 ts=20 status=PASSED active_in_window=1'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# ip -> liste de timestamps acceptés
history = {}

for lig in lignes:
    m = re.search(r'ts=([^\\s]+)\\s+ip=([^\\s]+)', lig)
    if not m:
        continue
    ts = int(m.group(1))
    ip = m.group(2)
    
    past = [t for t in history.get(ip, []) if t >= ts - 4]
    
    if len(past) < 3:
        past.append(ts)
        history[ip] = past
        status = 'PASSED'
        count = len(past)
    else:
        status = 'DROPPED'
        count = len(past) + 1
        
    print(f"RATE_LIMIT ip={ip} ts={ts} status={status} active_in_window={count}")
`
  },
  {
    id: 'fw3-c5-e3',
    chapter: 5,
    title: 'Moteur Deep Packet Inspection (DPI) et détection de signatures L7',
    level: 'n3',
    language: 'python',
    goal: 'Analyser le contenu applicatif des requêtes HTTP pour détecter les injections SQL, XSS et traversées de répertoires.',
    brief: `<p>Le moteur <strong>DPI (Deep Packet Inspection)</strong> examine la charge utile (payload) au-delà des en-têtes réseau et transport pour neutraliser les attaques applicatives.<br><br>
Signatures d'attaques à détecter (insensible à la casse) :<br>
1. <strong>SQL Injection</strong> : présence de <code>union select</code>, <code>' or '1'='1</code>, <code>sleep(</code> ou <code>drop table</code>.<br>
   -> Menace : <code>SQL_INJECTION</code>, Action : <code>BLOCK</code>.<br>
2. <strong>Cross-Site Scripting (XSS)</strong> : présence de <code>&lt;script&gt;</code>, <code>javascript:</code> ou <code>onerror=</code>.<br>
   -> Menace : <code>XSS_ATTACK</code>, Action : <code>BLOCK</code>.<br>
3. <strong>Path Traversal</strong> : présence de <code>../</code>, <code>..\\</code> ou <code>/etc/passwd</code>.<br>
   -> Menace : <code>PATH_TRAVERSAL</code>, Action : <code>BLOCK</code>.<br>
4. Sinon : charge utile saine.<br>
   -> Menace : <code>CLEAN</code>, Action : <code>ALLOW</code>.<br><br>
Le script lit sur l'entrée standard des requêtes :<br>
<code>PAYLOAD id=&lt;id&gt; payload=&lt;contenu_du_payload&gt;</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>DPI_ALERT id={id} threat={THREAT} action={BLOCK|ALLOW}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les signatures d'attaque dans les payloads
`,
    hints: [
      'Normaliser la charge utile en minuscules.',
      'Tester dans l’ordre de la spécification : SQLi, XSS, Path Traversal, puis CLEAN.'
    ],
    examples: [
      {
        stdin: 'PAYLOAD id=P1 payload=id=1 UNION SELECT username, password FROM users\nPAYLOAD id=P2 payload=q=ordinateur+portable',
        expected: 'DPI_ALERT id=P1 threat=SQL_INJECTION action=BLOCK\nDPI_ALERT id=P2 threat=CLEAN action=ALLOW',
        note: 'P1 contient une signature SQLi évidente, P2 est une recherche utilisateur standard.'
      }
    ],
    tests: [
      {
        label: 'Détection XSS et Path Traversal',
        stdin: 'PAYLOAD id=X1 payload=name=<script>alert(document.cookie)</script>\nPAYLOAD id=T1 payload=file=../../etc/passwd',
        expected: 'DPI_ALERT id=X1 threat=XSS_ATTACK action=BLOCK\nDPI_ALERT id=T1 threat=PATH_TRAVERSAL action=BLOCK'
      },
      {
        label: 'Variantes SQL Injection avec apostrophes et sleep',
        stdin: "PAYLOAD id=S1 payload=user=' OR '1'='1\nPAYLOAD id=S2 payload=benchmark(10000000,MD5(1)) OR SLEEP(5)",
        expected: 'DPI_ALERT id=S1 threat=SQL_INJECTION action=BLOCK\nDPI_ALERT id=S2 threat=SQL_INJECTION action=BLOCK'
      },
      {
        label: 'Payloads légitimes avec du texte complexe',
        stdin: 'PAYLOAD id=C1 payload=message=Bonjour, voici mon rapport mensuel.\nPAYLOAD id=C2 payload=path=/var/www/html/index.php',
        expected: 'DPI_ALERT id=C1 threat=CLEAN action=ALLOW\nDPI_ALERT id=C2 threat=CLEAN action=ALLOW'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'id=([^\\s]+)\\s+payload=(.*)', lig)
    if not m:
        continue
    pid, payload = m.groups()
    p_lower = payload.lower()
    
    sqli_patterns = ['union select', "' or '1'='1", "sleep(", "drop table"]
    xss_patterns = ['<script>', 'javascript:', 'onerror=']
    path_patterns = ['../', '..\\\\', '/etc/passwd']
    
    if any(pat in p_lower for pat in sqli_patterns):
        threat = 'SQL_INJECTION'
        action = 'BLOCK'
    elif any(pat in p_lower for pat in xss_patterns):
        threat = 'XSS_ATTACK'
        action = 'BLOCK'
    elif any(pat in p_lower for pat in path_patterns):
        threat = 'PATH_TRAVERSAL'
        action = 'BLOCK'
    else:
        threat = 'CLEAN'
        action = 'ALLOW'
        
    print(f"DPI_ALERT id={pid} threat={threat} action={action}")
`
  }
];
