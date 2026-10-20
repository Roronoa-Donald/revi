'use strict';

module.exports = [
  {
    "id": "fw3-c6-e1",
    "chapter": 6,
    "title": "Compilateur de règles vers les syntaxes iptables et nftables",
    "level": "n1",
    "language": "analyse",
    "goal": "Traduire une politique de sécurité déclarative en commandes concrètes pour les moteurs netfilter iptables et nftables.",
    "brief": "<p>L'administration d'un pare-feu Linux repose sur <strong>iptables</strong> (hérité) ou <strong>nftables</strong> (standard moderne).<br><br>\nSpécification de conversion d'une règle :<br>\n<code>RULE chain=&lt;INPUT|FORWARD|OUTPUT&gt; proto=&lt;tcp|udp|ANY&gt; src=&lt;ip|ANY&gt; dst=&lt;ip|ANY&gt; dport=&lt;p|ANY&gt; target=&lt;ACCEPT|DROP&gt;</code>.<br><br>\nRègles de génération :<br>\n1. Syntaxe <strong>iptables</strong> :<br>\n   <code>iptables -A {chain} [options] -j {target}</code><br>\n   - Si <code>proto != 'ANY'</code> : ajouter <code>-p {proto}</code>.<br>\n   - Si <code>src != 'ANY'</code> : ajouter <code>-s {src}</code>.<br>\n   - Si <code>dst != 'ANY'</code> : ajouter <code>-d {dst}</code>.<br>\n   - Si <code>dport != 'ANY'</code> : ajouter <code>--dport {dport}</code> (placé après le protocole si présent).<br>\n2. Syntaxe <strong>nftables</strong> :<br>\n   <code>nft add rule inet filter {chain_lower} [clauses] counter {target_lower}</code><br>\n   - Si <code>src != 'ANY'</code> : ajouter <code>ip saddr {src}</code>.<br>\n   - Si <code>dst != 'ANY'</code> : ajouter <code>ip daddr {dst}</code>.<br>\n   - Si <code>proto != 'ANY' et dport != 'ANY'</code> : ajouter <code>{proto} dport {dport}</code>.<br>\n   - Si <code>proto != 'ANY' et dport == 'ANY'</code> : ajouter <code>ip protocol {proto}</code>.<br><br>\nPour chaque règle en entrée, afficher :<br>\n<code>IPTABLES: {commande_iptables}</code><br>\n<code>NFTABLES: {commande_nftables}</code></p>",
    "starter": "# Grille d'analyse (fw3-c6-e1) — Compilateur de règles vers les syntaxes iptables et nftables\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Règle de transfert FORWARD avec blocage complet]\n# Données : RULE chain=FORWARD proto=udp src=192.168.1.50 dst=ANY dport=53 target=DROP\nA_COMPLETER\n\n[Cas 2 — Règle simple sans port spécifique]\n# Données : RULE chain=OUTPUT proto=tcp src=ANY dst=198.51.100.2 dport=ANY target=ACCEPT\nA_COMPLETER\n\n[Cas 3 — Règle globale tout trafic]\n# Données : RULE chain=INPUT proto=ANY src=ANY dst=ANY dport=ANY target=DROP\nA_COMPLETER\n",
    "hints": [
      "Construire les listes d’arguments dans l’ordre demandé puis joindre par des espaces.",
      "Convertir en minuscules pour nftables (ex: chain.lower(), target.lower())."
    ],
    "examples": [
      {
        "stdin": "RULE chain=INPUT proto=tcp src=ANY dst=10.0.0.1 dport=22 target=ACCEPT",
        "expected": "IPTABLES: iptables -A INPUT -p tcp -d 10.0.0.1 --dport 22 -j ACCEPT\nNFTABLES: nft add rule inet filter input ip daddr 10.0.0.1 tcp dport 22 counter accept",
        "note": "Ouverture du port SSH 22 sur l’interface d’écoute."
      }
    ],
    "tests": [
      {
        "label": "Règle de transfert FORWARD avec blocage complet",
        "stdin": "cas:1",
        "expected": "IPTABLES: iptables -A FORWARD -p udp -s 192.168.1.50 --dport 53 -j DROP\nNFTABLES: nft add rule inet filter forward ip saddr 192.168.1.50 udp dport 53 counter drop"
      },
      {
        "label": "Règle simple sans port spécifique",
        "stdin": "cas:2",
        "expected": "IPTABLES: iptables -A OUTPUT -p tcp -d 198.51.100.2 -j ACCEPT\nNFTABLES: nft add rule inet filter output ip daddr 198.51.100.2 ip protocol tcp counter accept"
      },
      {
        "label": "Règle globale tout trafic",
        "stdin": "cas:3",
        "expected": "IPTABLES: iptables -A INPUT -j DROP\nNFTABLES: nft add rule inet filter input counter drop"
      }
    ],
    "solution": "[Exemple]\nIPTABLES: iptables -A INPUT -p tcp -d 10.0.0.1 --dport 22 -j ACCEPT\nNFTABLES: nft add rule inet filter input ip daddr 10.0.0.1 tcp dport 22 counter accept\n\n[Cas 1 — Règle de transfert FORWARD avec blocage complet]\nIPTABLES: iptables -A FORWARD -p udp -s 192.168.1.50 --dport 53 -j DROP\nNFTABLES: nft add rule inet filter forward ip saddr 192.168.1.50 udp dport 53 counter drop\n\n[Cas 2 — Règle simple sans port spécifique]\nIPTABLES: iptables -A OUTPUT -p tcp -d 198.51.100.2 -j ACCEPT\nNFTABLES: nft add rule inet filter output ip daddr 198.51.100.2 ip protocol tcp counter accept\n\n[Cas 3 — Règle globale tout trafic]\nIPTABLES: iptables -A INPUT -j DROP\nNFTABLES: nft add rule inet filter input counter drop"
  },
  {
    "id": "fw3-c6-e2",
    "chapter": 6,
    "title": "Parseur et agrégateur statistique de journaux de pare-feu (Logs)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser un flux de logs de pare-feu format syslog et extraire les métriques de sécurité essentielles.",
    "brief": "<p>L'exploitation des journaux (logs) permet de mesurer l'efficacité du pare-feu et de détecter les tendances d'attaque.<br><br>\nFormat des lignes de logs lues dans l’énoncé du cas :<br>\n<code>firewall: [ACTION] IN=&lt;if&gt; OUT=&lt;if&gt; SRC=&lt;ip&gt; DST=&lt;ip&gt; PROTO=&lt;proto&gt; SPT=&lt;p&gt; DPT=&lt;p&gt;</code><br>\noù <code>ACTION</code> est <code>DROP</code> ou <code>ACCEPT</code>.<br><br>\nMétriques à calculer :<br>\n- <code>total</code> : nombre total de lignes analysées.<br>\n- <code>dropped</code> : nombre de paquets avec <code>[DROP]</code>.<br>\n- <code>accepted</code> : nombre de paquets avec <code>[ACCEPT]</code>.<br>\n- <code>top_blocked_port</code> : numéro de port destination <code>DPT</code> ayant cumulé le plus grand nombre de <code>DROP</code> (en cas d'égalité, le plus petit numéro de port numérique). Si aucun DROP : <code>NONE</code>.<br>\n- <code>top_attacker_ip</code> : adresse IP source <code>SRC</code> ayant généré le plus grand nombre de <code>DROP</code> (en cas d'égalité, la plus petite par ordre alphabétique). Si aucun DROP : <code>NONE</code>.<br><br>\nSortie attendue :<br>\n<code>LOG_SUMMARY total={total} dropped={dropped} accepted={accepted} top_blocked_port={p} top_attacker_ip={ip}</code></p>",
    "starter": "# Grille d'analyse (fw3-c6-e2) — Parseur et agrégateur statistique de journaux de pare-feu (Logs)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Scans massifs multi-ports avec une IP dominante]\n# Données : firewall: [DROP] IN=eth0 OUT= SRC=198.51.100.88 DST=10.0.0.1 PROTO=TCP SPT=1000 DPT=23\n# Données : firewall: [DROP] IN=eth0 OUT= SRC=198.51.100.88 DST=10.0.0.1 PROTO=TCP SPT=1001 DPT=23\n# Données : firewall: [DROP] IN=eth0 OUT= SRC=198.51.100.99 DST=10.0.0.1 PROTO=TCP SPT=2000 DPT=445\n# Données : firewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=10.0.0.50 DST=8.8.8.8 PROTO=UDP SPT=5300 DPT=53\nA_COMPLETER\n\n[Cas 2 — Trafic 100% accepté sans aucun drop]\n# Données : firewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=192.168.1.1 DST=10.0.0.1 PROTO=TCP SPT=3000 DPT=443\n# Données : firewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=192.168.1.2 DST=10.0.0.1 PROTO=TCP SPT=3001 DPT=443\nA_COMPLETER\n\n[Cas 3 — Départage d’égalité entre ports bloqués]\n# Données : firewall: [DROP] IN=eth0 OUT= SRC=1.1.1.1 DST=10.0.0.1 PROTO=TCP SPT=10 DPT=80\n# Données : firewall: [DROP] IN=eth0 OUT= SRC=2.2.2.2 DST=10.0.0.1 PROTO=TCP SPT=11 DPT=22\nA_COMPLETER\n",
    "hints": [
      "Utiliser des dictionnaires pour compter les occurrences de SRC et DPT pour les lignes DROP.",
      "Trier par fréquence décroissante puis par la clé secondaire pour départager les égalités."
    ],
    "examples": [
      {
        "stdin": "firewall: [DROP] IN=eth0 OUT= SRC=203.0.113.5 DST=10.0.0.1 PROTO=TCP SPT=45000 DPT=22\nfirewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=192.168.1.10 DST=10.0.0.2 PROTO=TCP SPT=50000 DPT=80\nfirewall: [DROP] IN=eth0 OUT= SRC=203.0.113.5 DST=10.0.0.1 PROTO=TCP SPT=45001 DPT=22",
        "expected": "LOG_SUMMARY total=3 dropped=2 accepted=1 top_blocked_port=22 top_attacker_ip=203.0.113.5",
        "note": "2 drops sur le port 22 par la même IP 203.0.113.5."
      }
    ],
    "tests": [
      {
        "label": "Scans massifs multi-ports avec une IP dominante",
        "stdin": "cas:1",
        "expected": "LOG_SUMMARY total=4 dropped=3 accepted=1 top_blocked_port=23 top_attacker_ip=198.51.100.88"
      },
      {
        "label": "Trafic 100% accepté sans aucun drop",
        "stdin": "cas:2",
        "expected": "LOG_SUMMARY total=2 dropped=0 accepted=2 top_blocked_port=NONE top_attacker_ip=NONE"
      },
      {
        "label": "Départage d’égalité entre ports bloqués",
        "stdin": "cas:3",
        "expected": "LOG_SUMMARY total=2 dropped=2 accepted=0 top_blocked_port=22 top_attacker_ip=1.1.1.1"
      }
    ],
    "solution": "[Exemple]\nLOG_SUMMARY total=3 dropped=2 accepted=1 top_blocked_port=22 top_attacker_ip=203.0.113.5\n\n[Cas 1 — Scans massifs multi-ports avec une IP dominante]\nLOG_SUMMARY total=4 dropped=3 accepted=1 top_blocked_port=23 top_attacker_ip=198.51.100.88\n\n[Cas 2 — Trafic 100% accepté sans aucun drop]\nLOG_SUMMARY total=2 dropped=0 accepted=2 top_blocked_port=NONE top_attacker_ip=NONE\n\n[Cas 3 — Départage d’égalité entre ports bloqués]\nLOG_SUMMARY total=2 dropped=2 accepted=0 top_blocked_port=22 top_attacker_ip=1.1.1.1"
  },
  {
    "id": "fw3-c6-e3",
    "chapter": 6,
    "title": "Détecteur de force brute et bannissement dynamique (Fail2ban SIEM)",
    "level": "n3",
    "language": "analyse",
    "goal": "Surveiller les échecs répétés d’authentification et déclencher le blocage dynamique de l’IP attaquante.",
    "brief": "<p>Les outils de sécurité active (comme <strong>Fail2ban</strong> ou les playbooks SOAR/SIEM) observent les journaux de connexion et appliquent un bannissement temporaire ou définitif lorsqu'une IP dépasse un seuil d'échecs.<br><br>\nParamètres de la jail de sécurité :<br>\n- <code>findtime</code> : <code>60</code> secondes (fenêtre d'observation glissante <code>[ts - 59, ts]</code>).<br>\n- <code>maxretry</code> : <code>3</code> échecs.<br><br>\nComportement :<br>\n1. Dès qu'une IP accumule son 3e échec dans la fenêtre de 60s, elle devient immédiatement bannie (<code>BANNED</code>). Une fois bannie, elle reste bannie pour tous les événements suivants.<br>\n2. Pour chaque événement <code>AUTH_FAIL ts=&lt;ts&gt; ip=&lt;ip&gt; service=&lt;ssh|rdp&gt;</code> reçu :<br>\n   - Si l'IP est déjà bannie :<br>\n     <code>BAN_ACTION ip={ip} status=ALREADY_BANNED</code><br>\n   - Sinon si le nombre d'échecs dans la fenêtre atteint 3 :<br>\n     l'IP passe à l'état bannie et on Indiquez :<br>\n     <code>BAN_ACTION ip={ip} status=TRIGGER_BAN rule=\"nft add element inet filter blocklist {{ {ip} }}\"</code><br>\n   - Sinon :<br>\n     <code>BAN_ACTION ip={ip} status=MONITORING attempts={nb_dans_fenetre}</code><br><br>\nAnalysez les données fournies pour chaque cas.</p>",
    "starter": "# Grille d'analyse (fw3-c6-e3) — Détecteur de force brute et bannissement dynamique (Fail2ban SIEM)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Événement ultérieur sur une IP déjà bannie]\n# Données : AUTH_FAIL ts=10 ip=198.51.100.1 service=ssh\n# Données : AUTH_FAIL ts=20 ip=198.51.100.1 service=ssh\n# Données : AUTH_FAIL ts=30 ip=198.51.100.1 service=ssh\n# Données : AUTH_FAIL ts=40 ip=198.51.100.1 service=ssh\nA_COMPLETER\n\n[Cas 2 — Échecs espacés de plus de 60 secondes sans bannissement]\n# Données : AUTH_FAIL ts=10 ip=10.0.0.5 service=ssh\n# Données : AUTH_FAIL ts=80 ip=10.0.0.5 service=ssh\n# Données : AUTH_FAIL ts=150 ip=10.0.0.5 service=ssh\nA_COMPLETER\n\n[Cas 3 — Deux adresses IP attaquantes distinctes]\n# Données : AUTH_FAIL ts=50 ip=1.1.1.1 service=ssh\n# Données : AUTH_FAIL ts=51 ip=2.2.2.2 service=rdp\n# Données : AUTH_FAIL ts=52 ip=1.1.1.1 service=ssh\n# Données : AUTH_FAIL ts=53 ip=1.1.1.1 service=ssh\nA_COMPLETER\n",
    "hints": [
      "Garder la trace des IPs déjà bannies dans un ensemble (set).",
      "Pour les IPs non bannies, filtrer les échecs récents où t >= ts - 59."
    ],
    "examples": [
      {
        "stdin": "AUTH_FAIL ts=100 ip=203.0.113.50 service=ssh\nAUTH_FAIL ts=120 ip=203.0.113.50 service=ssh\nAUTH_FAIL ts=140 ip=203.0.113.50 service=ssh",
        "expected": "BAN_ACTION ip=203.0.113.50 status=MONITORING attempts=1\nBAN_ACTION ip=203.0.113.50 status=MONITORING attempts=2\nBAN_ACTION ip=203.0.113.50 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 203.0.113.50 }\"",
        "note": "Le 3e échec dans les 60s déclenche le bannissement immédiat."
      }
    ],
    "tests": [
      {
        "label": "Événement ultérieur sur une IP déjà bannie",
        "stdin": "cas:1",
        "expected": "BAN_ACTION ip=198.51.100.1 status=MONITORING attempts=1\nBAN_ACTION ip=198.51.100.1 status=MONITORING attempts=2\nBAN_ACTION ip=198.51.100.1 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 198.51.100.1 }\"\nBAN_ACTION ip=198.51.100.1 status=ALREADY_BANNED"
      },
      {
        "label": "Échecs espacés de plus de 60 secondes sans bannissement",
        "stdin": "cas:2",
        "expected": "BAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1"
      },
      {
        "label": "Deux adresses IP attaquantes distinctes",
        "stdin": "cas:3",
        "expected": "BAN_ACTION ip=1.1.1.1 status=MONITORING attempts=1\nBAN_ACTION ip=2.2.2.2 status=MONITORING attempts=1\nBAN_ACTION ip=1.1.1.1 status=MONITORING attempts=2\nBAN_ACTION ip=1.1.1.1 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 1.1.1.1 }\""
      }
    ],
    "solution": "[Exemple]\nBAN_ACTION ip=203.0.113.50 status=MONITORING attempts=1\nBAN_ACTION ip=203.0.113.50 status=MONITORING attempts=2\nBAN_ACTION ip=203.0.113.50 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 203.0.113.50 }\"\n\n[Cas 1 — Événement ultérieur sur une IP déjà bannie]\nBAN_ACTION ip=198.51.100.1 status=MONITORING attempts=1\nBAN_ACTION ip=198.51.100.1 status=MONITORING attempts=2\nBAN_ACTION ip=198.51.100.1 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 198.51.100.1 }\"\nBAN_ACTION ip=198.51.100.1 status=ALREADY_BANNED\n\n[Cas 2 — Échecs espacés de plus de 60 secondes sans bannissement]\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\n\n[Cas 3 — Deux adresses IP attaquantes distinctes]\nBAN_ACTION ip=1.1.1.1 status=MONITORING attempts=1\nBAN_ACTION ip=2.2.2.2 status=MONITORING attempts=1\nBAN_ACTION ip=1.1.1.1 status=MONITORING attempts=2\nBAN_ACTION ip=1.1.1.1 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 1.1.1.1 }\""
  }
];
