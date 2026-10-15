/**
 * Exercices Chapitre 3 — pfSense & Routage B3.
 * Translation d'Adresses (NAT) & Routage Multi-WAN.
 */
'use strict';

module.exports = [
  {
    id: 'pf3-c3-e1',
    chapter: 3,
    title: 'Simulateur de redirection de ports (Port Forwarding / DNAT)',
    level: 'n1',
    language: 'python',
    goal: 'Appliquer les règles de NAT entrant (Port Forwarding) pour rediriger les flux externes vers les serveurs internes.',
    brief: `<p>Dans pfSense, le <strong>Port Forwarding (DNAT)</strong> permet d'exposer un service interne hébergé sur une IP privée derrière l'adresse IP publique de l'interface WAN.<br><br>
Le script lit sur l'entrée standard d'abord les règles de redirection :<br>
<code>NAT_RULE ext_port=&lt;int&gt; int_ip=&lt;ip&gt; int_port=&lt;int&gt;</code>.<br>
Puis des paquets entrants sur le WAN :<br>
<code>INCOMING_PKT id=&lt;nom&gt; ext_dst_ip=&lt;wan_ip&gt; ext_dst_port=&lt;int&gt;</code>.<br><br>
Règles :<br>
- Si <code>ext_dst_port</code> correspond à une <code>NAT_RULE</code> :<br>
  <code>status=REDIRECTED new_dst={int_ip}:{int_port}</code>.<br>
- Sinon :<br>
  <code>status=DROPPED new_dst=NONE</code>.<br><br>
Pour chaque paquet, afficher :<br>
<code>DNAT_REPORT id={id} ext_port={ext_dst_port} status={status} target={new_dst}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : stocker les règles de NAT et translater les paquets entrants
`,
    hints: [
      'Gérer un dictionnaire associant ext_port à (int_ip, int_port).',
      'Vérifier si ext_dst_port existe dans les règles.'
    ],
    examples: [
      {
        stdin: 'NAT_RULE ext_port=8080 int_ip=192.168.1.50 int_port=80\nINCOMING_PKT id=PKT1 ext_dst_ip=203.0.113.1 ext_dst_port=8080\nINCOMING_PKT id=PKT2 ext_dst_ip=203.0.113.1 ext_dst_port=22',
        expected: 'DNAT_REPORT id=PKT1 ext_port=8080 status=REDIRECTED target=192.168.1.50:80\nDNAT_REPORT id=PKT2 ext_port=22 status=DROPPED target=NONE',
        note: 'Port 8080 redirigé vers 192.168.1.50:80 ; port 22 non mappé rejeté.'
      }
    ],
    tests: [
      {
        label: 'Redirection HTTPS standard 443 vers 443 interne',
        stdin: 'NAT_RULE ext_port=443 int_ip=10.0.0.10 int_port=443\nINCOMING_PKT id=HTTPS_REQ ext_dst_ip=198.51.100.1 ext_dst_port=443',
        expected: 'DNAT_REPORT id=HTTPS_REQ ext_port=443 status=REDIRECTED target=10.0.0.10:443'
      },
      {
        label: 'Plusieurs règles de redirection distinctes',
        stdin: 'NAT_RULE ext_port=80 int_ip=192.168.1.10 int_port=80\nNAT_RULE ext_port=2222 int_ip=192.168.1.20 int_port=22\nINCOMING_PKT id=SSH_TEST ext_dst_ip=203.0.113.5 ext_dst_port=2222\nINCOMING_PKT id=UNKNOWN ext_dst_ip=203.0.113.5 ext_dst_port=3389',
        expected: 'DNAT_REPORT id=SSH_TEST ext_port=2222 status=REDIRECTED target=192.168.1.20:22\nDNAT_REPORT id=UNKNOWN ext_port=3389 status=DROPPED target=NONE'
      },
      {
        label: 'Aucune règle de redirection déclarée',
        stdin: 'INCOMING_PKT id=ALONE ext_dst_ip=203.0.113.1 ext_dst_port=80',
        expected: 'DNAT_REPORT id=ALONE ext_port=80 status=DROPPED target=NONE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

nat_rules = {}

for lig in lignes:
    if lig.startswith('NAT_RULE'):
        tokens = lig.split()
        params = {}
        for tok in tokens[1:]:
            if '=' in tok:
                k, v = tok.split('=', 1)
                params[k] = v
        ep = int(params.get('ext_port', 0))
        nat_rules[ep] = (params.get('int_ip', ''), params.get('int_port', ''))
        continue
        
    if not lig.startswith('INCOMING_PKT'):
        continue
        
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pid = params.get('id', 'PKT')
    dp = int(params.get('ext_dst_port', 0))
    
    if dp in nat_rules:
        tip, tport = nat_rules[dp]
        status = 'REDIRECTED'
        target = f"{tip}:{tport}"
    else:
        status = 'DROPPED'
        target = 'NONE'
        
    print(f"DNAT_REPORT id={pid} ext_port={dp} status={status} target={target}")
`
  },
  {
    id: 'pf3-c3-e2',
    chapter: 3,
    title: 'Moteur d’Outbound NAT (SNAT) : Masquerade vs Adresses Virtuelles (VIP)',
    level: 'n2',
    language: 'python',
    goal: 'Translater les adresses sources privées des paquets sortants vers l’IP WAN principale ou une IP Virtuelle CARP/Statique.',
    brief: `<p>pfSense propose 4 modes d'<strong>Outbound NAT</strong> (Automatique, Hybride, Manuel, Désactivé). Lorsqu'un paquet quitte le WAN, sa source privée est remplacée (SNAT / Masquerade).<br><br>
Le script lit sur l'entrée standard d'abord les règles d'Outbound NAT :<br>
<code>OUTBOUND_DEF src_subnet=&lt;cidr&gt; nat_ip=&lt;WAN_INTERFACE|ip&gt;</code>.<br>
Puis des paquets sortants :<br>
<code>OUT_PKT id=&lt;nom&gt; src_ip=&lt;ip&gt; wan_ip=&lt;ip&gt;</code>.<br><br>
Règles :<br>
- Vérifier si <code>src_ip</code> appartient à un <code>src_subnet</code> déclaré.<br>
- Si oui :<br>
  - Si <code>nat_ip == 'WAN_INTERFACE'</code> : translater vers <code>wan_ip</code>.<br>
  - Sinon : translater vers <code>nat_ip</code>.<br>
  <code>status=SNAT_APPLIED new_src={ip_translatée}</code>.<br>
- Si non :<br>
  <code>status=NO_NAT new_src={src_ip}</code>.<br><br>
Pour chaque paquet, afficher :<br>
<code>SNAT_REPORT id={id} original_src={src_ip} status={status} nat_src={new_src}</code></p>`,
    starter: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : appliquer la translation source Outbound NAT
`,
    hints: [
      'Stocker les réseaux avec ipaddress.ip_network(subnet).',
      'Tester src_ip in net_obj pour appliquer la règle correspondante.'
    ],
    examples: [
      {
        stdin: 'OUTBOUND_DEF src_subnet=192.168.1.0/24 nat_ip=WAN_INTERFACE\nOUT_PKT id=P1 src_ip=192.168.1.15 wan_ip=203.0.113.100\nOUT_PKT id=P2 src_ip=10.0.0.5 wan_ip=203.0.113.100',
        expected: 'SNAT_REPORT id=P1 original_src=192.168.1.15 status=SNAT_APPLIED nat_src=203.0.113.100\nSNAT_REPORT id=P2 original_src=10.0.0.5 status=NO_NAT nat_src=10.0.0.5',
        note: '192.168.1.15 translaté vers l’IP WAN 203.0.113.100 ; 10.0.0.5 non couvert conservé sans NAT.'
      }
    ],
    tests: [
      {
        label: 'Translation vers IP virtuelle dédiée (VIP)',
        stdin: 'OUTBOUND_DEF src_subnet=172.16.0.0/16 nat_ip=198.51.100.50\nOUT_PKT id=P_VIP src_ip=172.16.10.2 wan_ip=198.51.100.1',
        expected: 'SNAT_REPORT id=P_VIP original_src=172.16.10.2 status=SNAT_APPLIED nat_src=198.51.100.50'
      },
      {
        label: 'Plusieurs sous-réseaux internes distincts',
        stdin: 'OUTBOUND_DEF src_subnet=10.0.1.0/24 nat_ip=WAN_INTERFACE\nOUTBOUND_DEF src_subnet=10.0.2.0/24 nat_ip=198.51.100.20\nOUT_PKT id=A src_ip=10.0.1.50 wan_ip=198.51.100.1\nOUT_PKT id=B src_ip=10.0.2.80 wan_ip=198.51.100.1',
        expected: 'SNAT_REPORT id=A original_src=10.0.1.50 status=SNAT_APPLIED nat_src=198.51.100.1\nSNAT_REPORT id=B original_src=10.0.2.80 status=SNAT_APPLIED nat_src=198.51.100.20'
      },
      {
        label: 'Sous-réseau ne correspondant à aucune règle',
        stdin: 'OUTBOUND_DEF src_subnet=192.168.10.0/24 nat_ip=WAN_INTERFACE\nOUT_PKT id=NOP src_ip=192.168.20.5 wan_ip=203.0.113.1',
        expected: 'SNAT_REPORT id=NOP original_src=192.168.20.5 status=NO_NAT nat_src=192.168.20.5'
      }
    ],
    solution: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

nat_rules = []

for lig in lignes:
    if lig.startswith('OUTBOUND_DEF'):
        tokens = lig.split()
        params = {}
        for tok in tokens[1:]:
            if '=' in tok:
                k, v = tok.split('=', 1)
                params[k] = v
        net = ipaddress.ip_network(params.get('src_subnet', '192.168.1.0/24'))
        nat_rules.append((net, params.get('nat_ip', 'WAN_INTERFACE')))
        continue
        
    if not lig.startswith('OUT_PKT'):
        continue
        
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pid = params.get('id', 'P')
    s_ip = ipaddress.ip_address(params.get('src_ip', '127.0.0.1'))
    w_ip = params.get('wan_ip', '0.0.0.0')
    
    matched = False
    new_src = str(s_ip)
    
    for net, target in nat_rules:
        if s_ip in net:
            matched = True
            new_src = w_ip if target == 'WAN_INTERFACE' else target
            break
            
    status = 'SNAT_APPLIED' if matched else 'NO_NAT'
    print(f"SNAT_REPORT id={pid} original_src={s_ip} status={status} nat_src={new_src}")
`
  },
  {
    id: 'pf3-c3-e3',
    chapter: 3,
    title: 'Évaluateur de Gateway Groups Multi-WAN (Load Balancing vs Failover)',
    level: 'n3',
    language: 'python',
    goal: 'Aiguiller les paquets selon l’état de santé des passerelles WAN et la hiérarchie de niveaux (Tiers) dans un groupe pfSense.',
    brief: `<p>pfSense gère les connexions Internet multiples via les <strong>Gateway Groups</strong> :<br>
- Deux passerelles dans le <strong>même Tier</strong> (ex: Tier 1) : <strong>Load Balancing (répartition de charge Round-Robin)</strong>.<br>
- Des passerelles dans des <strong>Tiers différents</strong> : <strong>Failover (basculement)</strong>. Le Tier 1 est utilisé en priorité ; s'il tombe (état <code>DOWN</code>), le Tier 2 prend automatiquement le relais.<br><br>
Le script lit sur l'entrée standard des déclarations de passerelles au format :<br>
<code>GW_STATUS name=&lt;nom&gt; tier=&lt;1..3&gt; state=&lt;ONLINE|DOWN&gt;</code>.<br><br>
Règles d'élection de la passerelle active :<br>
1. Trouver le plus petit niveau <code>tier</code> possédant au moins une passerelle <code>ONLINE</code>.<br>
2. S'il existe plusieurs passerelles <code>ONLINE</code> dans ce meilleur tier, le mode est <code>LOAD_BALANCING</code> et la liste des passerelles actives est affichée triée par ordre alphabétique séparée par une virgule.<br>
3. S'il n'y a qu'une seule passerelle <code>ONLINE</code> dans ce tier :<br>
   - Si tier == 1 : <code>mode=PRIMARY_ACTIVE</code>.<br>
   - Si tier &gt; 1 : <code>mode=FAILOVER_ACTIVE</code>.<br>
4. Si aucune passerelle n'est <code>ONLINE</code> : <code>mode=TOTAL_OUTAGE selected=NONE</code>.<br><br>
Afficher :<br>
<code>MULTIWAN_DECISION tier={meilleur_tier} mode={mode} selected={passerelles}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les tiers et l'état des passerelles Multi-WAN
`,
    hints: [
      'Grouper les passerelles ONLINE par tier.',
      'Prendre le plus petit tier non vide (1, 2, ou 3).',
      'Si plusieurs passerelles dans ce tier, trier leurs noms par ordre alphabétique.'
    ],
    examples: [
      {
        stdin: 'GW_STATUS name=WAN_FIBRE tier=1 state=DOWN\nGW_STATUS name=WAN_4G tier=2 state=ONLINE',
        expected: 'MULTIWAN_DECISION tier=2 mode=FAILOVER_ACTIVE selected=WAN_4G',
        note: 'Tier 1 en panne : basculement automatique vers le Tier 2 (WAN_4G).'
      }
    ],
    tests: [
      {
        label: 'Deux liaisons Tier 1 actives (Load Balancing)',
        stdin: 'GW_STATUS name=WAN_ORANGE tier=1 state=ONLINE\nGW_STATUS name=WAN_FREE tier=1 state=ONLINE\nGW_STATUS name=WAN_BACKUP tier=2 state=ONLINE',
        expected: 'MULTIWAN_DECISION tier=1 mode=LOAD_BALANCING selected=WAN_FREE,WAN_ORANGE'
      },
      {
        label: 'Une seule liaison Tier 1 nominale active',
        stdin: 'GW_STATUS name=WAN_MAIN tier=1 state=ONLINE\nGW_STATUS name=WAN_SEC tier=2 state=ONLINE',
        expected: 'MULTIWAN_DECISION tier=1 mode=PRIMARY_ACTIVE selected=WAN_MAIN'
      },
      {
        label: 'Panne complète de toutes les passerelles',
        stdin: 'GW_STATUS name=WAN1 tier=1 state=DOWN\nGW_STATUS name=WAN2 tier=2 state=DOWN',
        expected: 'MULTIWAN_DECISION tier=NONE mode=TOTAL_OUTAGE selected=NONE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

gw_by_tier = {}

for lig in lignes:
    if not lig.startswith('GW_STATUS'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    name = params.get('name', '')
    tier = int(params.get('tier', 1))
    st = params.get('state', 'DOWN')
    
    if st == 'ONLINE':
        if tier not in gw_by_tier:
            gw_by_tier[tier] = []
        gw_by_tier[tier].append(name)

if not gw_by_tier:
    print("MULTIWAN_DECISION tier=NONE mode=TOTAL_OUTAGE selected=NONE")
else:
    best_tier = min(gw_by_tier.keys())
    gws = sorted(gw_by_tier[best_tier])
    
    if len(gws) > 1:
        mode = 'LOAD_BALANCING'
    elif best_tier == 1:
        mode = 'PRIMARY_ACTIVE'
    else:
        mode = 'FAILOVER_ACTIVE'
        
    print(f"MULTIWAN_DECISION tier={best_tier} mode={mode} selected={','.join(gws)}")
`
  }
];
