/**
 * Exercices du chapitre 6 — Cybersécurité B2.
 */
'use strict';

module.exports = [
  {
    "id": "cs2-c6-e1",
    "chapter": 6,
    "title": "Moteur de détection de signature NIDS (Format Snort simplifié)",
    "level": "n1",
    "language": "python",
    "goal": "Moteur de détection de signature NIDS (Format Snort simplifié)",
    "brief": "<p>Un NIDS (Network Intrusion Detection System) comme Snort analyse les paquets réseau en temps réel pour détecter des motifs d’attaque connus dans les en-têtes et la charge utile (payload).\n\nEntrée :\n- Ligne 1 : Règle Snort simplifiée : <code>alert proto any any -> dest_ip dest_port (msg:\"&lt;msg&gt;\"; content:\"&lt;motif&gt;\"; sid:&lt;sid&gt;;)</code>\n- Ligne 2 : Paquet capturé : <code>proto src_ip src_port dest_ip dest_port payload</code>\n\nTraitement :\nVérifier si le paquet correspond au <code>proto</code>, à la <code>dest_ip</code>, au <code>dest_port</code> ET si le <code>content</code> recherché est présent dans le <code>payload</code>.\n\nSortie :\n- Si alerte déclenchée : <code>[ALERT] [sid:&lt;sid&gt;] &lt;msg&gt; (source: &lt;src_ip&gt;:&lt;src_port&gt; -&gt; dest: &lt;dest_ip&gt;:&lt;dest_port&gt;)</code>\n- Sinon : <code>PAQUET NORMAL (aucun match)</code>.</p>",
    "starter": "import sys, re\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\n\n# À compléter : analyser la règle Snort et vérifier la correspondance avec le paquet\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "alert tcp any any -> 192.168.1.10 80 (msg:\"Tentative acces admin\"; content:\"/admin.php\"; sid:10001;)\ntcp 10.0.0.5 45892 192.168.1.10 80 GET /admin.php HTTP/1.1",
        "expected": "[ALERT] [sid:10001] Tentative acces admin (source: 10.0.0.5:45892 -> dest: 192.168.1.10:80)",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "alert tcp any any -> 192.168.1.10 80 (msg:\"Tentative acces admin\"; content:\"/admin.php\"; sid:10001;)\ntcp 10.0.0.5 45892 192.168.1.10 80 GET /index.html HTTP/1.1",
        "expected": "PAQUET NORMAL (aucun match)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "alert tcp any any -> 10.0.0.1 22 (msg:\"Scan SSH brute\"; content:\"SSH-2.0\"; sid:10002;)\ntcp 172.16.0.4 55000 10.0.0.1 22 SSH-2.0-OpenSSH_8.9",
        "expected": "[ALERT] [sid:10002] Scan SSH brute (source: 172.16.0.4:55000 -> dest: 10.0.0.1:22)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "alert udp any any -> 192.168.1.1 53 (msg:\"Attaque DNS malveillante\"; content:\"malware.xyz\"; sid:10003;)\nudp 192.168.1.50 61234 192.168.1.1 53 query malware.xyz A",
        "expected": "[ALERT] [sid:10003] Attaque DNS malveillante (source: 192.168.1.50:61234 -> dest: 192.168.1.1:53)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "alert tcp any any -> 10.0.0.1 80 (msg:\"Injection SQL url\"; content:\"UNION\"; sid:10004;)\nudp 10.0.0.5 12345 10.0.0.1 80 UNION SELECT",
        "expected": "PAQUET NORMAL (aucun match)"
      }
    ],
    "solution": "import sys, re\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\nif len(lignes) >= 2:\n    rule_str = lignes[0]\n    pkt_str = lignes[1]\n    m_header = re.match(r\"^alert\\s+(\\w+)\\s+\\S+\\s+\\S+\\s+->\\s+(\\S+)\\s+(\\S+)\\s*\\((.*)\\)$\", rule_str)\n    if not m_header:\n        print(\"PAQUET NORMAL (aucun match)\")\n        sys.exit(0)\n    r_proto, r_dst_ip, r_dst_port, r_opts = m_header.groups()\n    m_msg = re.search(r'msg:\"([^\"]+)\"', r_opts)\n    m_cnt = re.search(r'content:\"([^\"]+)\"', r_opts)\n    m_sid = re.search(r'sid:(\\d+)', r_opts)\n    msg = m_msg.group(1) if m_msg else \"\"\n    cnt = m_cnt.group(1) if m_cnt else \"\"\n    sid = m_sid.group(1) if m_sid else \"\"\n    pkt_parts = pkt_str.split(maxsplit=5)\n    if len(pkt_parts) < 6:\n        print(\"PAQUET NORMAL (aucun match)\")\n        sys.exit(0)\n    p_proto, p_src_ip, p_src_port, p_dst_ip, p_dst_port, p_payload = pkt_parts\n    match_proto = (r_proto == \"any\" or r_proto.lower() == p_proto.lower())\n    match_ip = (r_dst_ip == \"any\" or r_dst_ip == p_dst_ip)\n    match_port = (r_dst_port == \"any\" or r_dst_port == p_dst_port)\n    match_cnt = (cnt in p_payload)\n    if match_proto and match_ip and match_port and match_cnt:\n        print(f\"[ALERT] [sid:{sid}] {msg} (source: {p_src_ip}:{p_src_port} -> dest: {p_dst_ip}:{p_dst_port})\")\n    else:\n        print(\"PAQUET NORMAL (aucun match)\")\n"
  },
  {
    "id": "cs2-c6-e2",
    "chapter": 6,
    "title": "Détection d’attaque par force brute dans les journaux d’événements",
    "level": "n2",
    "language": "python",
    "goal": "Détection d’attaque par force brute dans les journaux d’événements",
    "brief": "<p>Les outils de corrélation SIEM scrutent les journaux d’authentification pour détecter les attaques par force brute.\n\nEntrée : Liste d’événements séparés par des barres verticales <code>|</code>.\nFormat de chaque événement : <code>timestamp IP STATUT</code> (ex. <code>100 192.168.1.50 FAIL</code>).\n\nRègle de détection :\nSi une même adresse IP accumule <strong>au moins 5 échecs consécutifs (FAIL)</strong> dans une fenêtre temporelle inférieure ou égale à <strong>60 secondes</strong> (c’est-à-dire $timestamp_{5e} - timestamp_{1er} \\le 60$), une alerte est levée.\n\nSortie :\n- Si détecté : <code>ALERTE BRUTE FORCE: IP &lt;IP&gt; (&lt;count&gt; echecs en &lt;delta&gt;s) -&gt; BANNISSEMENT IP</code> (afficher la première IP qui déclenche l’alerte).\n- Sinon : <code>JOURNAUX NORMAUX (&lt;total_fails&gt; echecs disperses)</code>.</p>",
    "starter": "import sys\n\nligne = sys.stdin.read().strip()\n\n# À compléter : analyser les événements chronologiques pour détecter le brute force\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "100 192.168.1.50 FAIL|110 192.168.1.50 FAIL|120 192.168.1.50 FAIL|130 192.168.1.50 FAIL|140 192.168.1.50 FAIL",
        "expected": "ALERTE BRUTE FORCE: IP 192.168.1.50 (5 echecs en 40s) -> BANNISSEMENT IP",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "10 10.0.0.1 FAIL|20 10.0.0.2 FAIL|30 10.0.0.1 SUCCESS|40 10.0.0.1 FAIL",
        "expected": "JOURNAUX NORMAUX (3 echecs disperses)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "10 192.168.1.50 FAIL|80 192.168.1.50 FAIL|150 192.168.1.50 FAIL|220 192.168.1.50 FAIL|290 192.168.1.50 FAIL",
        "expected": "JOURNAUX NORMAUX (5 echecs disperses)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "5 172.16.5.99 FAIL|10 172.16.5.99 FAIL|15 172.16.5.99 FAIL|20 172.16.5.99 FAIL|25 172.16.5.99 FAIL",
        "expected": "ALERTE BRUTE FORCE: IP 172.16.5.99 (5 echecs en 20s) -> BANNISSEMENT IP"
      },
      {
        "label": "Test de validation 4",
        "stdin": "1 1.1.1.1 SUCCESS|2 2.2.2.2 SUCCESS",
        "expected": "JOURNAUX NORMAUX (0 echecs disperses)"
      }
    ],
    "solution": "import sys\n\nligne = sys.stdin.read().strip()\nif ligne:\n    events = [e.strip() for e in ligne.split(\"|\") if e.strip()]\n    ip_fails = {}\n    total_fails = 0\n    alerte = None\n    for ev in events:\n        parts = ev.split()\n        if len(parts) == 3:\n            ts, ip, status = int(parts[0]), parts[1], parts[2]\n            if status == \"FAIL\":\n                total_fails += 1\n                if ip not in ip_fails:\n                    ip_fails[ip] = []\n                ip_fails[ip].append(ts)\n                if len(ip_fails[ip]) >= 5:\n                    # test last 5 fails\n                    delta = ip_fails[ip][-1] - ip_fails[ip][-5]\n                    if delta <= 60 and not alerte:\n                        alerte = (ip, 5, delta)\n            elif status == \"SUCCESS\":\n                # success resets consecutive fail streak for this ip\n                ip_fails[ip] = []\n    if alerte:\n        print(f\"ALERTE BRUTE FORCE: IP {alerte[0]} ({alerte[1]} echecs en {alerte[2]}s) -> BANNISSEMENT IP\")\n    else:\n        print(f\"JOURNAUX NORMAUX ({total_fails} echecs disperses)\")\n"
  },
  {
    "id": "cs2-c6-e3",
    "chapter": 6,
    "title": "Analyseur de compromission et corrélation d’IoC (Hashes malveillants)",
    "level": "n3",
    "language": "python",
    "goal": "Analyseur de compromission et corrélation d’IoC (Hashes malveillants)",
    "brief": "<p>Les Indicateurs de Compromission (IoC) permettent d’identifier la présence de malwares connus sur un système en comparant les empreintes cryptographiques des fichiers exécutables avec une base de données de renseignement sur les menaces.\n\nEntrée :\n- Ligne 1 : Base IoC de signatures malveillantes : <code>hash:nom,hash:nom...</code>\n- Ligne 2 : Fichiers inspectés sur l’hôte : <code>chemin:hash,chemin:hash...</code>\n\nTraitement :\nPour chaque fichier, comparer son hachage (insensible à la casse) avec la base IoC.\nSortie :\n- Pour chaque menace trouvée (dans l’ordre de la ligne 2) : <code>MENACE DETECTEE: &lt;chemin&gt; correspond a &lt;nom_malware&gt;</code>\n- Si aucun fichier suspect : <code>SYSTEME SAIN (aucun IoC detecte)</code>.</p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\n\n# À compléter : croiser les fichiers inspectés avec la base IoC\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855:Trojan.Downloader,ed01ebfbc9eb5bbea545af4d01bf5f1071661840480439c6e5babe8e080e41aa:Ransomware.WannaCry\n/usr/bin/bash:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855,/tmp/updater.exe:ed01ebfbc9eb5bbea545af4d01bf5f1071661840480439c6e5babe8e080e41aa",
        "expected": "MENACE DETECTEE: /usr/bin/bash correspond a Trojan.Downloader\nMENACE DETECTEE: /tmp/updater.exe correspond a Ransomware.WannaCry",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "aaaa:VirusA,bbbb:WormB\n/bin/ls:1111,/bin/cat:2222",
        "expected": "SYSTEME SAIN (aucun IoC detecte)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "deadbeef:Rootkit.Zero,cafebabe:Keylogger.Spy\n/var/tmp/svchost.exe:DEADBEEF",
        "expected": "MENACE DETECTEE: /var/tmp/svchost.exe correspond a Rootkit.Zero"
      },
      {
        "label": "Test de validation 3",
        "stdin": "1234:Backdoor.X\n/etc/init.d/service:9999,/opt/agent:1234",
        "expected": "MENACE DETECTEE: /opt/agent correspond a Backdoor.X"
      },
      {
        "label": "Test de validation 4",
        "stdin": "1111:Threat1\n/tmp/test:2222",
        "expected": "SYSTEME SAIN (aucun IoC detecte)"
      }
    ],
    "solution": "import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\nif len(lignes) >= 2:\n    ioc_raw = lignes[0].split(\",\")\n    files_raw = lignes[1].split(\",\")\n    iocs = {}\n    for item in ioc_raw:\n        if \":\" in item:\n            h, name = item.split(\":\", 1)\n            iocs[h.strip().lower()] = name.strip()\n    trouves = []\n    for f in files_raw:\n        if \":\" in f:\n            path, h = f.split(\":\", 1)\n            h_clean = h.strip().lower()\n            if h_clean in iocs:\n                trouves.append(f\"MENACE DETECTEE: {path.strip()} correspond a {iocs[h_clean]}\")\n    if trouves:\n        print(\"\\n\".join(trouves))\n    else:\n        print(\"SYSTEME SAIN (aucun IoC detecte)\")\n"
  }
];
