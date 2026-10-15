/**
 * Exercices Chapitre 1 — pfSense & Routage B3.
 * Architecture pfSense & Fondements du Pare-feu PF (Packet Filter).
 */
'use strict';

module.exports = [
  {
    id: 'pf3-c1-e1',
    chapter: 1,
    title: 'Validateur d’assignation d’interfaces et calcul de sous-réseau CIDR',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la validité de l’attribution IP d’une interface pfSense et calculer l’adresse réseau et de diffusion (Broadcast).',
    brief: `<p>Dans pfSense, chaque interface physique ou virtuelle (WAN, LAN, OPT) est configurée avec une adresse IPv4 et un masque de sous-réseau au format CIDR.<br><br>
Le script lit sur l'entrée standard des lignes au format :<br>
<code>IFACE_CONFIG iface=&lt;wan|lan|opt1&gt; ip=&lt;ip/prefix&gt;</code>.<br><br>
Règles de calcul (avec le module <code>ipaddress</code>) :<br>
- Extraire l'adresse de réseau (<code>network_address</code>) et l'adresse de broadcast (<code>broadcast_address</code>).<br>
- Calculer le nombre d'adresses d'hôtes utilisables : <code>usable_hosts = net.num_addresses - 2</code> (si prefix &lt; 31, sinon 0).<br><br>
Pour chaque interface, afficher :<br>
<code>IFACE_REPORT iface={iface} ip={ip} net={network_address} bcast={broadcast_address} hosts={usable_hosts}</code></p>`,
    starter: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la configuration CIDR de l'interface
`,
    hints: [
      'Utiliser ipaddress.ip_interface(ip_str) pour manipuler facilement l’adresse et le réseau.',
      'Le réseau parent est accessible via iface_obj.network.'
    ],
    examples: [
      {
        stdin: 'IFACE_CONFIG iface=lan ip=192.168.1.1/24',
        expected: 'IFACE_REPORT iface=lan ip=192.168.1.1 net=192.168.1.0 bcast=192.168.1.255 hosts=254',
        note: 'Réseau 192.168.1.0/24 avec 254 hôtes utilisables.'
      }
    ],
    tests: [
      {
        label: 'Sous-réseau WAN public de classe C restreint /29',
        stdin: 'IFACE_CONFIG iface=wan ip=203.0.113.10/29',
        expected: 'IFACE_REPORT iface=wan ip=203.0.113.10 net=203.0.113.8 bcast=203.0.113.15 hosts=6'
      },
      {
        label: 'Interface DMZ en /28',
        stdin: 'IFACE_CONFIG iface=opt1 ip=10.0.50.1/28',
        expected: 'IFACE_REPORT iface=opt1 ip=10.0.50.1 net=10.0.50.0 bcast=10.0.50.15 hosts=14'
      },
      {
        label: 'Configuration multi-interfaces simultanées',
        stdin: 'IFACE_CONFIG iface=wan ip=198.51.100.2/30\nIFACE_CONFIG iface=lan ip=172.16.0.1/16',
        expected: 'IFACE_REPORT iface=wan ip=198.51.100.2 net=198.51.100.0 bcast=198.51.100.3 hosts=2\nIFACE_REPORT iface=lan ip=172.16.0.1 net=172.16.0.0 bcast=172.16.255.255 hosts=65534'
      }
    ],
    solution: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('IFACE_CONFIG'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    iface = params.get('iface', 'lan')
    ip_raw = params.get('ip', '192.168.1.1/24')
    
    iface_obj = ipaddress.ip_interface(ip_raw)
    net = iface_obj.network
    
    usable = net.num_addresses - 2 if net.prefixlen < 31 else 0
    print(f"IFACE_REPORT iface={iface} ip={iface_obj.ip} net={net.network_address} bcast={net.broadcast_address} hosts={usable}")
`
  },
  {
    id: 'pf3-c1-e2',
    chapter: 1,
    title: 'Convertisseur de règles pfSense WebGUI vers syntaxe native FreeBSD PF (pf.conf)',
    level: 'n2',
    language: 'python',
    goal: 'Traduire une déclaration de règle de pare-feu de l’interface graphique pfSense en directive syntaxique native Packet Filter.',
    brief: `<p>pfSense repose sur le moteur de filtrage de paquets <strong>Packet Filter (PF)</strong> de FreeBSD. Dans pfSense, les règles sont saisies via la WebGUI mais compilées dans le fichier système <code>/tmp/rules.debug</code>.<br><br>
Le script lit sur l'entrée standard des déclarations de règles au format :<br>
<code>GUI_RULE action=&lt;pass|block&gt; iface=&lt;lan|wan|opt1&gt; proto=&lt;tcp|udp|any&gt; src=&lt;ip|any&gt; dst=&lt;ip|any&gt; port=&lt;int|any&gt;</code>.<br><br>
Règles de génération PF :<br>
- Syntax : <code>{action} in on {iface} [proto {proto}] from {src} to {dst} [port {port}]</code>.<br>
- Si <code>proto == 'any'</code>, omettre la clause <code>proto</code>.<br>
- Si <code>port == 'any'</code>, omettre la clause <code>port</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>PF_CONF_RULE {règle_générée}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : convertir la règle WebGUI en syntaxe native pf.conf
`,
    hints: [
      'Gérer conditionnellement l’ajout de "proto <proto>" si proto != "any".',
      'Gérer conditionnellement l’ajout de "port <port>" après la destination si port != "any".'
    ],
    examples: [
      {
        stdin: 'GUI_RULE action=pass iface=lan proto=tcp src=192.168.1.0/24 dst=any port=443',
        expected: 'PF_CONF_RULE pass in on lan proto tcp from 192.168.1.0/24 to any port 443',
        note: 'Règle autorisant le trafic HTTPS sortant du LAN.'
      }
    ],
    tests: [
      {
        label: 'Blocage total de tout trafic sur le WAN',
        stdin: 'GUI_RULE action=block iface=wan proto=any src=any dst=any port=any',
        expected: 'PF_CONF_RULE block in on wan from any to any'
      },
      {
        label: 'Autorisation DNS UDP spécifique',
        stdin: 'GUI_RULE action=pass iface=opt1 proto=udp src=10.0.1.0/24 dst=1.1.1.1 port=53',
        expected: 'PF_CONF_RULE pass in on opt1 proto udp from 10.0.1.0/24 to 1.1.1.1 port 53'
      },
      {
        label: 'Trafic TCP sans restriction de port',
        stdin: 'GUI_RULE action=pass iface=lan proto=tcp src=192.168.1.10 dst=10.0.0.5 port=any',
        expected: 'PF_CONF_RULE pass in on lan proto tcp from 192.168.1.10 to 10.0.0.5'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('GUI_RULE'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    act = params.get('action', 'pass')
    iface = params.get('iface', 'lan')
    proto = params.get('proto', 'any')
    src = params.get('src', 'any')
    dst = params.get('dst', 'any')
    port = params.get('port', 'any')
    
    parts = [act, 'in', 'on', iface]
    if proto != 'any':
        parts.extend(['proto', proto])
    parts.extend(['from', src, 'to', dst])
    if port != 'any':
        parts.extend(['port', port])
        
    rule_str = ' '.join(parts)
    print(f"PF_CONF_RULE {rule_str}")
`
  },
  {
    id: 'pf3-c1-e3',
    chapter: 1,
    title: 'Auditeur de plage DHCP pfSense et détection de conflit de baux statiques',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la validité de la plage DHCP dynamique et détecter les conflits avec les baux statiques (Static Mappings).',
    brief: `<p>Sous pfSense, le démon DHCP (ISC DHCPD ou Kea) distribue les adresses IP dynamiques. Une bonne pratique réseau stricte impose que les réservations statiques (Static Mappings) soient situées <strong>hors de la plage dynamique (pool)</strong> mais au sein du même sous-réseau.<br><br>
Le script lit sur l'entrée standard des vérifications au format :<br>
<code>DHCP_CHECK subnet=&lt;cidr&gt; pool_start=&lt;ip&gt; pool_end=&lt;ip&gt; static_ip=&lt;ip&gt;</code>.<br><br>
Règles :<br>
1. Vérifier si <code>pool_start</code>, <code>pool_end</code> et <code>static_ip</code> appartiennent au sous-réseau <code>subnet</code>.<br>
   Si l'un d'eux est hors du sous-réseau : <code>status=INVALID_SUBNET_OUT_OF_BOUNDS</code>.<br>
2. Si tous sont dans le sous-réseau :<br>
   - Si <code>pool_start &lt;= static_ip &lt;= pool_end</code> :<br>
     <code>status=CONFLICT_STATIC_INSIDE_DYNAMIC_POOL</code>.<br>
   - Sinon :<br>
     <code>status=VALID_SCOPE</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>DHCP_AUDIT subnet={subnet} static_ip={static_ip} status={status}</code></p>`,
    starter: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier le pool DHCP et l'absence de conflit statique
`,
    hints: [
      'Utiliser ipaddress.ip_network(subnet) et ipaddress.ip_address(ip).',
      'Tester l’appartenance avec ip in net.',
      'Comparer les adresses IP avec les opérateurs classiques (start <= static <= end).'
    ],
    examples: [
      {
        stdin: 'DHCP_CHECK subnet=192.168.1.0/24 pool_start=192.168.1.100 pool_end=192.168.1.200 static_ip=192.168.1.50',
        expected: 'DHCP_AUDIT subnet=192.168.1.0/24 static_ip=192.168.1.50 status=VALID_SCOPE',
        note: 'IP statique 192.168.1.50 en dehors de la plage 100-200 : configuration optimale.'
      }
    ],
    tests: [
      {
        label: 'Bail statique en plein milieu de la plage dynamique (conflit)',
        stdin: 'DHCP_CHECK subnet=192.168.1.0/24 pool_start=192.168.1.100 pool_end=192.168.1.200 static_ip=192.168.1.150',
        expected: 'DHCP_AUDIT subnet=192.168.1.0/24 static_ip=192.168.1.150 status=CONFLICT_STATIC_INSIDE_DYNAMIC_POOL'
      },
      {
        label: 'Adresse statique hors du sous-réseau configuré',
        stdin: 'DHCP_CHECK subnet=10.0.0.0/24 pool_start=10.0.0.10 pool_end=10.0.0.50 static_ip=10.0.1.5',
        expected: 'DHCP_AUDIT subnet=10.0.0.0/24 static_ip=10.0.1.5 status=INVALID_SUBNET_OUT_OF_BOUNDS'
      },
      {
        label: 'Plage dynamique hors sous-réseau',
        stdin: 'DHCP_CHECK subnet=172.16.10.0/24 pool_start=172.16.20.10 pool_end=172.16.20.50 static_ip=172.16.10.5',
        expected: 'DHCP_AUDIT subnet=172.16.10.0/24 static_ip=172.16.10.5 status=INVALID_SUBNET_OUT_OF_BOUNDS'
      }
    ],
    solution: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('DHCP_CHECK'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    sub_raw = params.get('subnet', '192.168.1.0/24')
    p_start_raw = params.get('pool_start', '192.168.1.100')
    p_end_raw = params.get('pool_end', '192.168.1.200')
    stat_raw = params.get('static_ip', '192.168.1.50')
    
    net = ipaddress.ip_network(sub_raw)
    p_start = ipaddress.ip_address(p_start_raw)
    p_end = ipaddress.ip_address(p_end_raw)
    stat = ipaddress.ip_address(stat_raw)
    
    if (p_start not in net) or (p_end not in net) or (stat not in net):
        status = 'INVALID_SUBNET_OUT_OF_BOUNDS'
    elif p_start <= stat <= p_end:
        status = 'CONFLICT_STATIC_INSIDE_DYNAMIC_POOL'
    else:
        status = 'VALID_SCOPE'
        
    print(f"DHCP_AUDIT subnet={sub_raw} static_ip={stat_raw} status={status}")
`
  }
];
