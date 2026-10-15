/**
 * Exercices du Chapitre 4 : Réseau Virtuel Azure (Azure Virtual Network - VNet & Sécurité).
 * Préfixe : az3-c4-e
 */
'use strict';

module.exports = [
  {
    id: 'az3-c4-e1',
    chapter: 4,
    title: 'Calculateur d\'adressage Azure VNet & Adresses IP réservées',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la plage d’adresses IP d’un sous-réseau Azure en déduisant les 5 adresses réservées par le système SDN d’Azure.',
    brief: `<p>Dans chaque sous-réseau (Subnet) d'un VNet Azure, Microsoft réserve systématiquement <strong>5 adresses IP</strong> qui ne peuvent pas être assignées aux machines virtuelles ou ressources clientes :<br>
- <code>.0</code> : Adresse réseau (Network ID)<br>
- <code>.1</code> : Passerelle par défaut Azure (Default Gateway)<br>
- <code>.2</code> : Résolveur DNS Azure primaire<br>
- <code>.3</code> : Résolveur DNS Azure secondaire<br>
- <code>.&lt;dernière&gt;</code> (ex: <code>.255</code> pour un /24) : Adresse de diffusion (Broadcast)<br><br>
Ainsi, la première IP assignable est <code>.4</code> et la dernière est <code>.&lt;dernière - 1&gt;</code>.<br>
Le nombre d'IPs exploitables est donc <code>Total - 5</code>.<br><br>
Format d'entrée :<br>
<code>SUBNET name=&lt;nom&gt; cidr=&lt;adresse/préfixe&gt;</code><br><br>
Format de sortie attendu :<br>
<code>SUBNET &lt;nom&gt;: TOTAL=&lt;total&gt; USABLE=&lt;usable&gt; RESERVED=5 GATEWAY=&lt;gw_ip&gt; DNS1=&lt;dns1_ip&gt; RANGE=&lt;first_usable&gt;-&lt;last_usable&gt;</code></p>`,
    starter: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : déduire les adresses réservées Azure et calculer la plage exploitable
`,
    hints: [
      'Utiliser le module Python `ipaddress.ip_network(cidr, strict=False)`.',
      'L\'IP de passerelle est net.network_address + 1, et la première IP assignable est net.network_address + 4.'
    ],
    examples: [
      {
        stdin: 'SUBNET name=snet-web cidr=10.0.1.0/24',
        expected: 'SUBNET snet-web: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.1.1 DNS1=10.0.1.2 RANGE=10.0.1.4-10.0.1.254',
        note: 'Sous-réseau /24 classique avec 251 adresses exploitables.'
      }
    ],
    tests: [
      {
        label: 'Sous-réseau de base de données /24 distinct',
        stdin: 'SUBNET name=snet-db cidr=10.0.10.0/24',
        expected: 'SUBNET snet-db: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.10.1 DNS1=10.0.10.2 RANGE=10.0.10.4-10.0.10.254'
      },
      {
        label: 'Petit sous-réseau AzureBastionSubnet en /26',
        stdin: 'SUBNET name=AzureBastionSubnet cidr=10.0.2.0/26',
        expected: 'SUBNET AzureBastionSubnet: TOTAL=64 USABLE=59 RESERVED=5 GATEWAY=10.0.2.1 DNS1=10.0.2.2 RANGE=10.0.2.4-10.0.2.62'
      },
      {
        label: 'Sous-réseau GatewaySubnet minimal en /27',
        stdin: 'SUBNET name=GatewaySubnet cidr=192.168.0.0/27',
        expected: 'SUBNET GatewaySubnet: TOTAL=32 USABLE=27 RESERVED=5 GATEWAY=192.168.0.1 DNS1=192.168.0.2 RANGE=192.168.0.4-192.168.0.30'
      }
    ],
    solution: `import sys
import ipaddress

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line or not line.startswith("SUBNET "):
        continue
    props = {}
    for part in line[len("SUBNET "):].split():
        if "=" in part:
            k, v = part.split("=", 1)
            props[k] = v
            
    name = props.get("name", "unknown")
    cidr = props.get("cidr", "")
    
    net = ipaddress.ip_network(cidr, strict=False)
    net_ip = net.network_address
    broad_ip = net.broadcast_address
    
    total = net.num_addresses
    usable = max(0, total - 5)
    
    gw = net_ip + 1
    dns1 = net_ip + 2
    first_usable = net_ip + 4
    last_usable = broad_ip - 1
    
    print(f"SUBNET {name}: TOTAL={total} USABLE={usable} RESERVED=5 GATEWAY={gw} DNS1={dns1} RANGE={first_usable}-{last_usable}")
`
  },
  {
    id: 'az3-c4-e2',
    chapter: 4,
    title: 'Moteur d\'évaluation de règles de sécurité NSG',
    level: 'n2',
    language: 'python',
    goal: 'Évaluer le traitement d’un paquet réseau entrant par un groupe de sécurité réseau (NSG) selon l’ordre de priorité des règles et les règles par défaut Azure.',
    brief: `<p>Un groupe de sécurité réseau (NSG) filtre le trafic entrant et sortant. Les règles sont traitées par ordre croissant de priorité (de 100 à 4096). La première règle correspondant au paquet s'applique immédiatement.<br><br>
Règles par défaut Azure (INBOUND) automatiques en fin de chaîne :<br>
- Priorité <code>65000</code> : <code>AllowVNetInBound</code>, source=<code>VirtualNetwork</code>, port=<code>*</code>, proto=<code>ANY</code>, action=<code>ALLOW</code><br>
- Priorité <code>65001</code> : <code>AllowAzureLoadBalancerInBound</code>, source=<code>AzureLoadBalancer</code>, port=<code>*</code>, proto=<code>ANY</code>, action=<code>ALLOW</code><br>
- Priorité <code>65500</code> : <code>DenyAllInBound</code>, source=<code>*</code>, port=<code>*</code>, proto=<code>ANY</code>, action=<code>DENY</code><br><br>
Format d'entrée :<br>
Déclaration de règles personnalisées :<br>
<code>RULE prio=&lt;int&gt; name=&lt;nom&gt; direction=INBOUND source=&lt;SRC&gt; port=&lt;PORT&gt; proto=&lt;TCP|UDP|ANY&gt; action=&lt;ALLOW|DENY&gt;</code><br>
Puis paquets à évaluer :<br>
<code>TEST_PACKET source=&lt;SRC&gt; port=&lt;PORT&gt; proto=&lt;TCP|UDP&gt;</code><br><br>
Critères de correspondance d'un paquet :<br>
- <code>source</code> : matche si la règle a <code>*</code> ou la même valeur exacte.<br>
- <code>port</code> : matche si la règle a <code>*</code> ou le même numéro de port.<br>
- <code>proto</code> : matche si la règle a <code>ANY</code> ou le même protocole exact.<br><br>
Format de sortie attendu :<br>
<code>PACKET: matched_rule=&lt;name&gt; (prio=&lt;prio&gt;) -&gt; RESULT=&lt;ALLOW|DENY&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : trier les règles par priorité et évaluer les paquets
`,
    hints: [
      'Ajouter les 3 règles par défaut Azure dans la liste des règles avec leurs priorités 65000, 65001 et 65500.',
      'Trier l\'ensemble des règles par priorité croissante et trouver la première règle correspondante.'
    ],
    examples: [
      {
        stdin: 'RULE prio=100 name=Allow-HTTP direction=INBOUND source=Internet port=80 proto=TCP action=ALLOW\nRULE prio=200 name=Deny-SSH direction=INBOUND source=* port=22 proto=TCP action=DENY\nTEST_PACKET source=Internet port=80 proto=TCP\nTEST_PACKET source=Internet port=22 proto=TCP',
        expected: 'PACKET: matched_rule=Allow-HTTP (prio=100) -> RESULT=ALLOW\nPACKET: matched_rule=Deny-SSH (prio=200) -> RESULT=DENY',
        note: 'Le port 80 est autorisé par la règle 100 et SSH 22 est bloqué par la règle 200.'
      }
    ],
    tests: [
      {
        label: 'Règles personnalisées DNS et Telnet',
        stdin: 'RULE prio=150 name=Allow-DNS direction=INBOUND source=CorpDNS port=53 proto=UDP action=ALLOW\nRULE prio=250 name=Deny-Telnet direction=INBOUND source=* port=23 proto=TCP action=DENY\nTEST_PACKET source=CorpDNS port=53 proto=UDP\nTEST_PACKET source=AnyHost port=23 proto=TCP',
        expected: 'PACKET: matched_rule=Allow-DNS (prio=150) -> RESULT=ALLOW\nPACKET: matched_rule=Deny-Telnet (prio=250) -> RESULT=DENY'
      },
      {
        label: 'Chute sur les règles par défaut Azure VNet et DenyAll',
        stdin: 'RULE prio=300 name=Allow-HTTPS direction=INBOUND source=Internet port=443 proto=TCP action=ALLOW\nTEST_PACKET source=VirtualNetwork port=3389 proto=TCP\nTEST_PACKET source=ExternalHacker port=4444 proto=UDP',
        expected: 'PACKET: matched_rule=AllowVNetInBound (prio=65000) -> RESULT=ALLOW\nPACKET: matched_rule=DenyAllInBound (prio=65500) -> RESULT=DENY'
      },
      {
        label: 'Règle par défaut AzureLoadBalancer',
        stdin: 'TEST_PACKET source=AzureLoadBalancer port=80 proto=TCP',
        expected: 'PACKET: matched_rule=AllowAzureLoadBalancerInBound (prio=65001) -> RESULT=ALLOW'
      }
    ],
    solution: `import sys

rules = [
    {"prio": 65000, "name": "AllowVNetInBound", "source": "VirtualNetwork", "port": "*", "proto": "ANY", "action": "ALLOW"},
    {"prio": 65001, "name": "AllowAzureLoadBalancerInBound", "source": "AzureLoadBalancer", "port": "*", "proto": "ANY", "action": "ALLOW"},
    {"prio": 65500, "name": "DenyAllInBound", "source": "*", "port": "*", "proto": "ANY", "action": "DENY"}
]

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line:
        continue
    if line.startswith("RULE "):
        props = {}
        for part in line[len("RULE "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        rules.append({
            "prio": int(props.get("prio", 1000)),
            "name": props.get("name", "rule"),
            "source": props.get("source", "*"),
            "port": props.get("port", "*"),
            "proto": props.get("proto", "ANY"),
            "action": props.get("action", "DENY")
        })
    elif line.startswith("TEST_PACKET "):
        props = {}
        for part in line[len("TEST_PACKET "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        src = props.get("source", "")
        port = props.get("port", "")
        proto = props.get("proto", "")
        
        # Tri des règles par priorité
        sorted_rules = sorted(rules, key=lambda r: r["prio"])
        matched = None
        for r in sorted_rules:
            # Source
            if r["source"] != "*" and r["source"] != src:
                continue
            # Port
            if r["port"] != "*" and r["port"] != port:
                continue
            # Proto
            if r["proto"] != "ANY" and r["proto"] != proto:
                continue
            matched = r
            break
            
        if matched:
            print(f"PACKET: matched_rule={matched['name']} (prio={matched['prio']}) -> RESULT={matched['action']}")
`
  },
  {
    id: 'az3-c4-e3',
    chapter: 4,
    title: 'Validateur de Peering VNet & Topologie Hub-and-Spoke',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la validité de liens d’interconnexion (VNet Peering) en détectant les chevauchements de plages CIDR et les incohérences de passerelles de transit.',
    brief: `<p>L'interconnexion de réseaux virtuels par Peering Azure permet une communication privée à haute performance. Toutefois, Azure refuse catégoriquement l'établissement d'un peering si les plages d'adresses IP se chevauchent, ou si la configuration de passerelle est incohérente.<br><br>
Format d'entrée :<br>
1. Déclaration des VNets :<br>
   <code>VNET id=&lt;nom&gt; cidr=&lt;plage_ip&gt;</code><br>
2. Demande d'établissement de Peering :<br>
   <code>PEERING vnet1=&lt;nom1&gt; vnet2=&lt;nom2&gt; allow_gw_transit=&lt;true|false&gt; use_remote_gw=&lt;true|false&gt;</code><br><br>
Règles de validation :<br>
- Si l'un des deux VNets n'a pas été déclaré au préalable :<br>
  <code>PEERING_ERROR: Unknown VNet in peering &lt;nom1&gt; &lt;-&gt; &lt;nom2&gt;</code><br>
- Si les plages CIDR des deux réseaux se chevauchent :<br>
  <code>PEERING_FAILED: Overlapping CIDR between &lt;nom1&gt; (&lt;cidr1&gt;) and &lt;nom2&gt; (&lt;cidr2&gt;)</code><br>
- Si <code>allow_gw_transit=true</code> ET <code>use_remote_gw=true</code> simultanément :<br>
  <code>PEERING_FAILED: Incompatible gateway flags on peering &lt;nom1&gt; &lt;-&gt; &lt;nom2&gt;</code><br>
- Si toutes les conditions sont remplies :<br>
  <code>PEERING_SUCCESS: &lt;nom1&gt; &lt;-&gt; &lt;nom2&gt; status=CONNECTED gateway_transit=&lt;ENABLED|DISABLED&gt;</code><br>
  (avec <code>ENABLED</code> si au moins l'un des deux flags est à true, sinon <code>DISABLED</code>).</p>`,
    starter: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier le non-chevauchement des réseaux et la cohérence du peering
`,
    hints: [
      'Utiliser la méthode net1.overlaps(net2) du module `ipaddress`.',
      'Vérifier que allow_gw_transit et use_remote_gw ne sont pas tous les deux actifs en même temps.'
    ],
    examples: [
      {
        stdin: 'VNET id=vnet-hub cidr=10.0.0.0/16\nVNET id=vnet-spoke1 cidr=10.1.0.0/16\nPEERING vnet1=vnet-hub vnet2=vnet-spoke1 allow_gw_transit=true use_remote_gw=false',
        expected: 'PEERING_SUCCESS: vnet-hub <-> vnet-spoke1 status=CONNECTED gateway_transit=ENABLED',
        note: 'Peering valide sans chevauchement avec passerelle de transit activée sur le Hub.'
      }
    ],
    tests: [
      {
        label: 'Peering valide entre VNet Core et VNet App sans transit',
        stdin: 'VNET id=vnet-core cidr=172.16.0.0/16\nVNET id=vnet-app cidr=172.17.0.0/16\nPEERING vnet1=vnet-core vnet2=vnet-app allow_gw_transit=false use_remote_gw=false',
        expected: 'PEERING_SUCCESS: vnet-core <-> vnet-app status=CONNECTED gateway_transit=DISABLED'
      },
      {
        label: 'Échec dû au chevauchement CIDR',
        stdin: 'VNET id=vnet-a cidr=10.0.0.0/16\nVNET id=vnet-b cidr=10.0.1.0/24\nPEERING vnet1=vnet-a vnet2=vnet-b allow_gw_transit=false use_remote_gw=false',
        expected: 'PEERING_FAILED: Overlapping CIDR between vnet-a (10.0.0.0/16) and vnet-b (10.0.1.0/24)'
      },
      {
        label: 'Conflit de flags de passerelle et VNet inconnu',
        stdin: 'VNET id=vnet-hub cidr=10.0.0.0/16\nVNET id=vnet-spoke2 cidr=10.2.0.0/16\nPEERING vnet1=vnet-hub vnet2=vnet-spoke2 allow_gw_transit=true use_remote_gw=true\nPEERING vnet1=vnet-hub vnet2=vnet-ghost allow_gw_transit=false use_remote_gw=false',
        expected: 'PEERING_FAILED: Incompatible gateway flags on peering vnet-hub <-> vnet-spoke2\nPEERING_ERROR: Unknown VNet in peering vnet-hub <-> vnet-ghost'
      }
    ],
    solution: `import sys
import ipaddress

vnets = {}

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line:
        continue
    if line.startswith("VNET "):
        props = {}
        for part in line[len("VNET "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        vid = props.get("id")
        cidr = props.get("cidr")
        if vid and cidr:
            vnets[vid] = (cidr, ipaddress.ip_network(cidr, strict=False))
            
    elif line.startswith("PEERING "):
        props = {}
        for part in line[len("PEERING "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        v1 = props.get("vnet1")
        v2 = props.get("vnet2")
        agw = props.get("allow_gw_transit", "false").lower() == "true"
        urg = props.get("use_remote_gw", "false").lower() == "true"
        
        if v1 not in vnets or v2 not in vnets:
            print(f"PEERING_ERROR: Unknown VNet in peering {v1} <-> {v2}")
            continue
            
        cidr1, net1 = vnets[v1]
        cidr2, net2 = vnets[v2]
        
        if net1.overlaps(net2):
            print(f"PEERING_FAILED: Overlapping CIDR between {v1} ({cidr1}) and {v2} ({cidr2})")
            continue
            
        if agw and urg:
            print(f"PEERING_FAILED: Incompatible gateway flags on peering {v1} <-> {v2}")
            continue
            
        transit_str = "ENABLED" if (agw or urg) else "DISABLED"
        print(f"PEERING_SUCCESS: {v1} <-> {v2} status=CONNECTED gateway_transit={transit_str}")
`
  }
];
