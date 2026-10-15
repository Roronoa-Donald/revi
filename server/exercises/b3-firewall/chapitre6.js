/**
 * Exercices Chapitre 6 — Firewall & Sécurité Réseau B3.
 * Administration, syntaxe iptables/nftables, analyse de logs & SIEM.
 */
'use strict';

module.exports = [
  {
    id: 'fw3-c6-e1',
    chapter: 6,
    title: 'Compilateur de règles vers les syntaxes iptables et nftables',
    level: 'n1',
    language: 'python',
    goal: 'Traduire une politique de sécurité déclarative en commandes concrètes pour les moteurs netfilter iptables et nftables.',
    brief: `<p>L'administration d'un pare-feu Linux repose sur <strong>iptables</strong> (hérité) ou <strong>nftables</strong> (standard moderne).<br><br>
Spécification de conversion d'une règle :<br>
<code>RULE chain=&lt;INPUT|FORWARD|OUTPUT&gt; proto=&lt;tcp|udp|ANY&gt; src=&lt;ip|ANY&gt; dst=&lt;ip|ANY&gt; dport=&lt;p|ANY&gt; target=&lt;ACCEPT|DROP&gt;</code>.<br><br>
Règles de génération :<br>
1. Syntaxe <strong>iptables</strong> :<br>
   <code>iptables -A {chain} [options] -j {target}</code><br>
   - Si <code>proto != 'ANY'</code> : ajouter <code>-p {proto}</code>.<br>
   - Si <code>src != 'ANY'</code> : ajouter <code>-s {src}</code>.<br>
   - Si <code>dst != 'ANY'</code> : ajouter <code>-d {dst}</code>.<br>
   - Si <code>dport != 'ANY'</code> : ajouter <code>--dport {dport}</code> (placé après le protocole si présent).<br>
2. Syntaxe <strong>nftables</strong> :<br>
   <code>nft add rule inet filter {chain_lower} [clauses] counter {target_lower}</code><br>
   - Si <code>src != 'ANY'</code> : ajouter <code>ip saddr {src}</code>.<br>
   - Si <code>dst != 'ANY'</code> : ajouter <code>ip daddr {dst}</code>.<br>
   - Si <code>proto != 'ANY' et dport != 'ANY'</code> : ajouter <code>{proto} dport {dport}</code>.<br>
   - Si <code>proto != 'ANY' et dport == 'ANY'</code> : ajouter <code>ip protocol {proto}</code>.<br><br>
Pour chaque règle en entrée, afficher :<br>
<code>IPTABLES: {commande_iptables}</code><br>
<code>NFTABLES: {commande_nftables}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : compiler les règles en syntaxe iptables et nftables
`,
    hints: [
      'Construire les listes d’arguments dans l’ordre demandé puis joindre par des espaces.',
      'Convertir en minuscules pour nftables (ex: chain.lower(), target.lower()).'
    ],
    examples: [
      {
        stdin: 'RULE chain=INPUT proto=tcp src=ANY dst=10.0.0.1 dport=22 target=ACCEPT',
        expected: 'IPTABLES: iptables -A INPUT -p tcp -d 10.0.0.1 --dport 22 -j ACCEPT\nNFTABLES: nft add rule inet filter input ip daddr 10.0.0.1 tcp dport 22 counter accept',
        note: 'Ouverture du port SSH 22 sur l’interface d’écoute.'
      }
    ],
    tests: [
      {
        label: 'Règle de transfert FORWARD avec blocage complet',
        stdin: 'RULE chain=FORWARD proto=udp src=192.168.1.50 dst=ANY dport=53 target=DROP',
        expected: 'IPTABLES: iptables -A FORWARD -p udp -s 192.168.1.50 --dport 53 -j DROP\nNFTABLES: nft add rule inet filter forward ip saddr 192.168.1.50 udp dport 53 counter drop'
      },
      {
        label: 'Règle simple sans port spécifique',
        stdin: 'RULE chain=OUTPUT proto=tcp src=ANY dst=198.51.100.2 dport=ANY target=ACCEPT',
        expected: 'IPTABLES: iptables -A OUTPUT -p tcp -d 198.51.100.2 -j ACCEPT\nNFTABLES: nft add rule inet filter output ip daddr 198.51.100.2 ip protocol tcp counter accept'
      },
      {
        label: 'Règle globale tout trafic',
        stdin: 'RULE chain=INPUT proto=ANY src=ANY dst=ANY dport=ANY target=DROP',
        expected: 'IPTABLES: iptables -A INPUT -j DROP\nNFTABLES: nft add rule inet filter input counter drop'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'chain=([^\\s]+)\\s+proto=([^\\s]+)\\s+src=([^\\s]+)\\s+dst=([^\\s]+)\\s+dport=([^\\s]+)\\s+target=([^\\s]+)', lig)
    if not m:
        continue
    chain, proto, src, dst, dport, target = m.groups()
    
    # IPTABLES
    ipt_parts = ['iptables', '-A', chain]
    if proto != 'ANY':
        ipt_parts.extend(['-p', proto])
    if src != 'ANY':
        ipt_parts.extend(['-s', src])
    if dst != 'ANY':
        ipt_parts.extend(['-d', dst])
    if dport != 'ANY':
        ipt_parts.extend(['--dport', dport])
    ipt_parts.extend(['-j', target])
    ipt_cmd = ' '.join(ipt_parts)
    
    # NFTABLES
    nft_parts = ['nft', 'add', 'rule', 'inet', 'filter', chain.lower()]
    if src != 'ANY':
        nft_parts.extend(['ip', 'saddr', src])
    if dst != 'ANY':
        nft_parts.extend(['ip', 'daddr', dst])
    if proto != 'ANY' and dport != 'ANY':
        nft_parts.extend([proto, 'dport', dport])
    elif proto != 'ANY' and dport == 'ANY':
        nft_parts.extend(['ip', 'protocol', proto])
    nft_parts.extend(['counter', target.lower()])
    nft_cmd = ' '.join(nft_parts)
    
    print(f"IPTABLES: {ipt_cmd}")
    print(f"NFTABLES: {nft_cmd}")
`
  },
  {
    id: 'fw3-c6-e2',
    chapter: 6,
    title: 'Parseur et agrégateur statistique de journaux de pare-feu (Logs)',
    level: 'n2',
    language: 'python',
    goal: 'Analyser un flux de logs de pare-feu format syslog et extraire les métriques de sécurité essentielles.',
    brief: `<p>L'exploitation des journaux (logs) permet de mesurer l'efficacité du pare-feu et de détecter les tendances d'attaque.<br><br>
Format des lignes de logs lues sur l'entrée standard :<br>
<code>firewall: [ACTION] IN=&lt;if&gt; OUT=&lt;if&gt; SRC=&lt;ip&gt; DST=&lt;ip&gt; PROTO=&lt;proto&gt; SPT=&lt;p&gt; DPT=&lt;p&gt;</code><br>
où <code>ACTION</code> est <code>DROP</code> ou <code>ACCEPT</code>.<br><br>
Métriques à calculer :<br>
- <code>total</code> : nombre total de lignes analysées.<br>
- <code>dropped</code> : nombre de paquets avec <code>[DROP]</code>.<br>
- <code>accepted</code> : nombre de paquets avec <code>[ACCEPT]</code>.<br>
- <code>top_blocked_port</code> : numéro de port destination <code>DPT</code> ayant cumulé le plus grand nombre de <code>DROP</code> (en cas d'égalité, le plus petit numéro de port numérique). Si aucun DROP : <code>NONE</code>.<br>
- <code>top_attacker_ip</code> : adresse IP source <code>SRC</code> ayant généré le plus grand nombre de <code>DROP</code> (en cas d'égalité, la plus petite par ordre alphabétique). Si aucun DROP : <code>NONE</code>.<br><br>
Sortie attendue :<br>
<code>LOG_SUMMARY total={total} dropped={dropped} accepted={accepted} top_blocked_port={p} top_attacker_ip={ip}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les logs et calculer les métriques d'attaque
`,
    hints: [
      'Utiliser des dictionnaires pour compter les occurrences de SRC et DPT pour les lignes DROP.',
      'Trier par fréquence décroissante puis par la clé secondaire pour départager les égalités.'
    ],
    examples: [
      {
        stdin: 'firewall: [DROP] IN=eth0 OUT= SRC=203.0.113.5 DST=10.0.0.1 PROTO=TCP SPT=45000 DPT=22\nfirewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=192.168.1.10 DST=10.0.0.2 PROTO=TCP SPT=50000 DPT=80\nfirewall: [DROP] IN=eth0 OUT= SRC=203.0.113.5 DST=10.0.0.1 PROTO=TCP SPT=45001 DPT=22',
        expected: 'LOG_SUMMARY total=3 dropped=2 accepted=1 top_blocked_port=22 top_attacker_ip=203.0.113.5',
        note: '2 drops sur le port 22 par la même IP 203.0.113.5.'
      }
    ],
    tests: [
      {
        label: 'Scans massifs multi-ports avec une IP dominante',
        stdin: 'firewall: [DROP] IN=eth0 OUT= SRC=198.51.100.88 DST=10.0.0.1 PROTO=TCP SPT=1000 DPT=23\nfirewall: [DROP] IN=eth0 OUT= SRC=198.51.100.88 DST=10.0.0.1 PROTO=TCP SPT=1001 DPT=23\nfirewall: [DROP] IN=eth0 OUT= SRC=198.51.100.99 DST=10.0.0.1 PROTO=TCP SPT=2000 DPT=445\nfirewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=10.0.0.50 DST=8.8.8.8 PROTO=UDP SPT=5300 DPT=53',
        expected: 'LOG_SUMMARY total=4 dropped=3 accepted=1 top_blocked_port=23 top_attacker_ip=198.51.100.88'
      },
      {
        label: 'Trafic 100% accepté sans aucun drop',
        stdin: 'firewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=192.168.1.1 DST=10.0.0.1 PROTO=TCP SPT=3000 DPT=443\nfirewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=192.168.1.2 DST=10.0.0.1 PROTO=TCP SPT=3001 DPT=443',
        expected: 'LOG_SUMMARY total=2 dropped=0 accepted=2 top_blocked_port=NONE top_attacker_ip=NONE'
      },
      {
        label: 'Départage d’égalité entre ports bloqués',
        stdin: 'firewall: [DROP] IN=eth0 OUT= SRC=1.1.1.1 DST=10.0.0.1 PROTO=TCP SPT=10 DPT=80\nfirewall: [DROP] IN=eth0 OUT= SRC=2.2.2.2 DST=10.0.0.1 PROTO=TCP SPT=11 DPT=22',
        expected: 'LOG_SUMMARY total=2 dropped=2 accepted=0 top_blocked_port=22 top_attacker_ip=1.1.1.1'
      }
    ],
    solution: `import sys
import re
from collections import Counter

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

total = 0
dropped = 0
accepted = 0

drop_ports = Counter()
drop_ips = Counter()

for lig in lignes:
    m = re.search(r'\\[(DROP|ACCEPT)\\]\\s+IN=\\S*\\s+OUT=\\S*\\s+SRC=(\\S+)\\s+DST=\\S+\\s+PROTO=\\S+\\s+SPT=\\S+\\s+DPT=(\\S+)', lig)
    if not m:
        continue
    total += 1
    action, src, dpt = m.groups()
    if action == 'DROP':
        dropped += 1
        drop_ports[int(dpt)] += 1
        drop_ips[src] += 1
    elif action == 'ACCEPT':
        accepted += 1

if drop_ports:
    # Trier par count desc, puis port asc
    top_blocked_port = str(sorted(drop_ports.keys(), key=lambda p: (-drop_ports[p], p))[0])
else:
    top_blocked_port = 'NONE'

if drop_ips:
    # Trier par count desc, puis ip asc
    top_attacker_ip = sorted(drop_ips.keys(), key=lambda ip: (-drop_ips[ip], ip))[0]
else:
    top_attacker_ip = 'NONE'

print(f"LOG_SUMMARY total={total} dropped={dropped} accepted={accepted} top_blocked_port={top_blocked_port} top_attacker_ip={top_attacker_ip}")
`
  },
  {
    id: 'fw3-c6-e3',
    chapter: 6,
    title: 'Détecteur de force brute et bannissement dynamique (Fail2ban SIEM)',
    level: 'n3',
    language: 'python',
    goal: 'Surveiller les échecs répétés d’authentification et déclencher le blocage dynamique de l’IP attaquante.',
    brief: `<p>Les outils de sécurité active (comme <strong>Fail2ban</strong> ou les playbooks SOAR/SIEM) observent les journaux de connexion et appliquent un bannissement temporaire ou définitif lorsqu'une IP dépasse un seuil d'échecs.<br><br>
Paramètres de la jail de sécurité :<br>
- <code>findtime</code> : <code>60</code> secondes (fenêtre d'observation glissante <code>[ts - 59, ts]</code>).<br>
- <code>maxretry</code> : <code>3</code> échecs.<br><br>
Comportement :<br>
1. Dès qu'une IP accumule son 3e échec dans la fenêtre de 60s, elle devient immédiatement bannie (<code>BANNED</code>). Une fois bannie, elle reste bannie pour tous les événements suivants.<br>
2. Pour chaque événement <code>AUTH_FAIL ts=&lt;ts&gt; ip=&lt;ip&gt; service=&lt;ssh|rdp&gt;</code> reçu :<br>
   - Si l'IP est déjà bannie :<br>
     <code>BAN_ACTION ip={ip} status=ALREADY_BANNED</code><br>
   - Sinon si le nombre d'échecs dans la fenêtre atteint 3 :<br>
     l'IP passe à l'état bannie et on affiche :<br>
     <code>BAN_ACTION ip={ip} status=TRIGGER_BAN rule="nft add element inet filter blocklist {{ {ip} }}"</code><br>
   - Sinon :<br>
     <code>BAN_ACTION ip={ip} status=MONITORING attempts={nb_dans_fenetre}</code><br><br>
Le script lit les événements ordonnés chronologiquement sur l'entrée standard.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : surveiller les échecs et déclencher le bannissement nftables
`,
    hints: [
      'Garder la trace des IPs déjà bannies dans un ensemble (set).',
      'Pour les IPs non bannies, filtrer les échecs récents où t >= ts - 59.'
    ],
    examples: [
      {
        stdin: 'AUTH_FAIL ts=100 ip=203.0.113.50 service=ssh\nAUTH_FAIL ts=120 ip=203.0.113.50 service=ssh\nAUTH_FAIL ts=140 ip=203.0.113.50 service=ssh',
        expected: 'BAN_ACTION ip=203.0.113.50 status=MONITORING attempts=1\nBAN_ACTION ip=203.0.113.50 status=MONITORING attempts=2\nBAN_ACTION ip=203.0.113.50 status=TRIGGER_BAN rule="nft add element inet filter blocklist { 203.0.113.50 }"',
        note: 'Le 3e échec dans les 60s déclenche le bannissement immédiat.'
      }
    ],
    tests: [
      {
        label: 'Événement ultérieur sur une IP déjà bannie',
        stdin: 'AUTH_FAIL ts=10 ip=198.51.100.1 service=ssh\nAUTH_FAIL ts=20 ip=198.51.100.1 service=ssh\nAUTH_FAIL ts=30 ip=198.51.100.1 service=ssh\nAUTH_FAIL ts=40 ip=198.51.100.1 service=ssh',
        expected: 'BAN_ACTION ip=198.51.100.1 status=MONITORING attempts=1\nBAN_ACTION ip=198.51.100.1 status=MONITORING attempts=2\nBAN_ACTION ip=198.51.100.1 status=TRIGGER_BAN rule="nft add element inet filter blocklist { 198.51.100.1 }"\nBAN_ACTION ip=198.51.100.1 status=ALREADY_BANNED'
      },
      {
        label: 'Échecs espacés de plus de 60 secondes sans bannissement',
        stdin: 'AUTH_FAIL ts=10 ip=10.0.0.5 service=ssh\nAUTH_FAIL ts=80 ip=10.0.0.5 service=ssh\nAUTH_FAIL ts=150 ip=10.0.0.5 service=ssh',
        expected: 'BAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1'
      },
      {
        label: 'Deux adresses IP attaquantes distinctes',
        stdin: 'AUTH_FAIL ts=50 ip=1.1.1.1 service=ssh\nAUTH_FAIL ts=51 ip=2.2.2.2 service=rdp\nAUTH_FAIL ts=52 ip=1.1.1.1 service=ssh\nAUTH_FAIL ts=53 ip=1.1.1.1 service=ssh',
        expected: 'BAN_ACTION ip=1.1.1.1 status=MONITORING attempts=1\nBAN_ACTION ip=2.2.2.2 status=MONITORING attempts=1\nBAN_ACTION ip=1.1.1.1 status=MONITORING attempts=2\nBAN_ACTION ip=1.1.1.1 status=TRIGGER_BAN rule="nft add element inet filter blocklist { 1.1.1.1 }"'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

banned = set()
failures = {} # ip -> list of timestamps

for lig in lignes:
    m = re.search(r'ts=([^\\s]+)\\s+ip=([^\\s]+)\\s+service=([^\\s]+)', lig)
    if not m:
        continue
    ts = int(m.group(1))
    ip = m.group(2)
    service = m.group(3)
    
    if ip in banned:
        print(f"BAN_ACTION ip={ip} status=ALREADY_BANNED")
        continue
        
    recent = [t for t in failures.get(ip, []) if t >= ts - 59]
    recent.append(ts)
    failures[ip] = recent
    
    if len(recent) >= 3:
        banned.add(ip)
        print(f'BAN_ACTION ip={ip} status=TRIGGER_BAN rule="nft add element inet filter blocklist {{ {ip} }}"')
    else:
        print(f"BAN_ACTION ip={ip} status=MONITORING attempts={len(recent)}")
`
  }
];
