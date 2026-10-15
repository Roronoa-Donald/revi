/**
 * server/exercises/b3-cloud-aws/chapitre4.js — Exercices du Chapitre 4
 * Chapitre 4 : Réseau Avancé — Amazon VPC, Sous-réseaux, Routage & Pare-feux (SG / NACL)
 */

module.exports = [
  {
    id: 'aws3-c4-e1',
    chapter: 4,
    title: 'Calculateur de Sous-réseaux CIDR & Adresses Réservées AWS',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la plage d\'adresses d\'un sous-réseau VPC, les 5 adresses IP réservées par AWS et le nombre d\'adresses assignables.',
    brief: `<p>Dans tout sous-réseau d'un <strong>Amazon Virtual Private Cloud (VPC)</strong>, AWS réserve obligatoirement 5 adresses IP :<br><br>
1. <code>.0</code> : Adresse réseau.<br>
2. <code>.1</code> : Passerelle du routeur VPC par défaut.<br>
3. <code>.2</code> : Serveur DNS fourni par Amazon (AmazonProvidedDNS / Route 53 Resolver).<br>
4. <code>.3</code> : Réservé par AWS pour extension future.<br>
5. Dernière adresse (ex: <code>.255</code> pour un /24) : Adresse de diffusion (broadcast réseau).<br><br>
Formule :<br>
- Total d'adresses brutes : <code>2 ** (32 - masque)</code>.<br>
- Adresses IP réellement utilisables pour des instances : <code>Total - 5</code>.<br><br>
Entrée STDIN : <code>VPC_SUBNET CIDR=&lt;ip/masque&gt;</code> (ex: <code>10.0.1.0/24</code>).<br>
Sortie : <code>SUBNET_CALC: total_ips=&lt;t&gt; usable_ips=&lt;u&gt; net_ip=&lt;net&gt; router_ip=&lt;r&gt; dns_ip=&lt;d&gt; broadcast_ip=&lt;b&gt;</code>.</p>`,
    starter: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les adresses réseau et les IP réservées AWS
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'VPC_SUBNET CIDR=10.0.1.0/24',
        expected: 'SUBNET_CALC: total_ips=256 usable_ips=251 net_ip=10.0.1.0 router_ip=10.0.1.1 dns_ip=10.0.1.2 broadcast_ip=10.0.1.255',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Sous-réseau /28 (le plus petit autorisé par AWS VPC)',
        stdin: 'VPC_SUBNET CIDR=172.16.0.0/28',
        expected: 'SUBNET_CALC: total_ips=16 usable_ips=11 net_ip=172.16.0.0 router_ip=172.16.0.1 dns_ip=172.16.0.2 broadcast_ip=172.16.0.15\n'
      },
      {
        label: 'Sous-réseau étendu /20 (4096 adresses)',
        stdin: 'VPC_SUBNET CIDR=192.168.16.0/20',
        expected: 'SUBNET_CALC: total_ips=4096 usable_ips=4091 net_ip=192.168.16.0 router_ip=192.168.16.1 dns_ip=192.168.16.2 broadcast_ip=192.168.31.255\n'
      },
      {
        label: 'Sous-réseau moyen /26 (64 adresses)',
        stdin: 'VPC_SUBNET CIDR=10.10.5.128/26',
        expected: 'SUBNET_CALC: total_ips=64 usable_ips=59 net_ip=10.10.5.128 router_ip=10.10.5.129 dns_ip=10.10.5.130 broadcast_ip=10.10.5.191\n'
      }
    ],
    solution: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("VPC_SUBNET "):
        continue
    tokens = ligne.split()
    cidr = ""
    for t in tokens[1:]:
        if t.startswith("CIDR="):
            cidr = t.split("=", 1)[1].strip()

    if not cidr:
        continue

    net = ipaddress.ip_network(cidr, strict=False)
    total_ips = net.num_addresses
    usable_ips = max(0, total_ips - 5)

    net_ip = str(net.network_address)
    router_ip = str(net.network_address + 1)
    dns_ip = str(net.network_address + 2)
    broadcast_ip = str(net.broadcast_address)

    print(f"SUBNET_CALC: total_ips={total_ips} usable_ips={usable_ips} net_ip={net_ip} router_ip={router_ip} dns_ip={dns_ip} broadcast_ip={broadcast_ip}")
`
  },
  {
    id: 'aws3-c4-e2',
    chapter: 4,
    title: 'Auditeur de Tables de Routage VPC (Public vs Privé vs Isolé)',
    level: 'n2',
    language: 'python',
    goal: 'Qualifier un sous-réseau VPC selon la destination de sa route par défaut 0.0.0.0/0.',
    brief: `<p>Dans Amazon VPC, la typologie d'un sous-réseau dépend de sa <strong>Route Table</strong> :<br><br>
1. <strong>PUBLIC</strong> :<br>
Comporte une route par défaut <code>0.0.0.0/0</code> pointant directement vers une passerelle Internet <code>igw-&lt;id&gt;</code>.<br>
Les instances avec IP publique peuvent communiquer directement avec Internet.<br><br>
2. <strong>PRIVATE</strong> :<br>
Comporte une route par défaut <code>0.0.0.0/0</code> pointant vers une passerelle NAT managée <code>nat-&lt;id&gt;</code> ou une instance NAT.<br>
Les instances peuvent initier des connexions sortantes (ex: téléchargement de patchs) mais sont inaccessibles depuis l'extérieur.<br><br>
3. <strong>ISOLATED</strong> :<br>
Aucune route vers <code>0.0.0.0/0</code>. Le trafic est strictement confiné au VPC local ou à des passerelles d'extrémités privées (VPC Endpoints <code>vpce-&lt;id&gt;</code> ou Peering <code>pcx-&lt;id&gt;</code>).<br><br>
Entrée STDIN :<br>
<code>ROUTE_AUDIT SUBNET=&lt;id&gt; ROUTES=&lt;dest1-&gt;target1;dest2-&gt;target2;...&gt;</code>.<br><br>
Sortie : <code>ROUTE_VERDICT: subnet=&lt;id&gt; type=&lt;PUBLIC|PRIVATE|ISOLATED&gt; default_target=&lt;target|NONE&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les sous-réseaux selon leurs routes de sortie
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'ROUTE_AUDIT SUBNET=subnet-0a1b2c3d ROUTES=10.0.0.0/16->local;0.0.0.0/0->igw-11223344',
        expected: 'ROUTE_VERDICT: subnet=subnet-0a1b2c3d type=PUBLIC default_target=igw-11223344',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Sous-réseau privé avec NAT Gateway',
        stdin: 'ROUTE_AUDIT SUBNET=subnet-priv-01 ROUTES=10.0.0.0/16->local;0.0.0.0/0->nat-99887766',
        expected: 'ROUTE_VERDICT: subnet=subnet-priv-01 type=PRIVATE default_target=nat-99887766\n'
      },
      {
        label: 'Sous-réseau base de données isolé (aucune route 0.0.0.0/0)',
        stdin: 'ROUTE_AUDIT SUBNET=subnet-db-01 ROUTES=10.0.0.0/16->local;10.20.0.0/16->pcx-12345',
        expected: 'ROUTE_VERDICT: subnet=subnet-db-01 type=ISOLATED default_target=NONE\n'
      },
      {
        label: 'Sous-réseau isolé avec Endpoint S3 Gateway',
        stdin: 'ROUTE_AUDIT SUBNET=subnet-s3-only ROUTES=10.0.0.0/16->local;pl-63a5400a->vpce-55667788',
        expected: 'ROUTE_VERDICT: subnet=subnet-s3-only type=ISOLATED default_target=NONE\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("ROUTE_AUDIT "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    subnet_id = params.get("SUBNET", "")
    raw_routes = params.get("ROUTES", "").split(";")

    default_target = "NONE"
    for r in raw_routes:
        if "->" in r:
            dest, target = r.split("->", 1)
            if dest.strip() == "0.0.0.0/0":
                default_target = target.strip()
                break

    if default_target.startswith("igw-"):
        stype = "PUBLIC"
    elif default_target.startswith("nat-"):
        stype = "PRIVATE"
    else:
        stype = "ISOLATED"

    print(f"ROUTE_VERDICT: subnet={subnet_id} type={stype} default_target={default_target}")
`
  },
  {
    id: 'aws3-c4-e3',
    chapter: 4,
    title: 'Simulateur de Pare-feu : Security Group (Stateful) vs Network ACL (Stateless)',
    level: 'n3',
    language: 'python',
    goal: 'Évaluer le filtrage d\'un flux entrant ou d\'un retour sortant en combinant Security Groups et Network ACLs.',
    brief: `<p>La sécurité réseau AWS repose sur deux couches complémentaires :<br><br>
1. <strong>Security Group (Avec état / Stateful)</strong> :<br>
- S'applique au niveau de l'interface réseau élastique (ENI) de l'instance.<br>
- Tout trafic retour d'un flux entrant autorisé est <strong>automatiquement accepté</strong>, quelles que soient les règles sortantes.<br>
- Par défaut en entrée : <code>DENY</code>.<br><br>
2. <strong>Network ACL (Sans état / Stateless)</strong> :<br>
- S'applique au niveau du sous-réseau.<br>
- Règles numérotées (1..32766) évaluées par ordre croissant : la première règle correspondante s'applique (ALLOW ou DENY).<br>
- Règle par défaut <code>*</code> (fin de liste) : <code>DENY</code>.<br>
- <strong>Sans état</strong> : Pour qu'un paquet retour d'une connexion TCP puisse sortir, la NACL doit comporter une règle sortante autorisant les ports éphémères (ex: <code>1024-65535</code>).<br><br>
Entrée STDIN :<br>
<code>FLOW_CHECK DIRECTION=&lt;INBOUND|RETURN_OUTBOUND&gt; PORT=&lt;n&gt; SG_IN=&lt;ports_allow&gt; NACL_RULES=&lt;num:Effect:port_or_range;...&gt;</code>.<br><br>
Sortie : <code>FLOW_VERDICT: dir=&lt;d&gt; port=&lt;p&gt; sg=&lt;ALLOW|DENY&gt; nacl=&lt;ALLOW|DENY&gt; final=&lt;ALLOW|DENY&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer le comportement Stateful vs Stateless
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'FLOW_CHECK DIRECTION=INBOUND PORT=443 SG_IN=80,443 NACL_RULES=100:Allow:443;200:Deny:All;*:Deny:All',
        expected: 'FLOW_VERDICT: dir=INBOUND port=443 sg=ALLOW nacl=ALLOW final=ALLOW',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Retour sortant stateful bloqué par NACL stateless (ports éphémères)',
        stdin: 'FLOW_CHECK DIRECTION=RETURN_OUTBOUND PORT=54321 SG_IN=443 NACL_RULES=100:Deny:54321;*:Deny:All',
        expected: 'FLOW_VERDICT: dir=RETURN_OUTBOUND port=54321 sg=ALLOW nacl=DENY final=DENY\n'
      },
      {
        label: 'Retour sortant autorisé à la fois par SG stateful et NACL ports éphémères',
        stdin: 'FLOW_CHECK DIRECTION=RETURN_OUTBOUND PORT=49152 SG_IN=80 NACL_RULES=100:Allow:1024-65535;*:Deny:All',
        expected: 'FLOW_VERDICT: dir=RETURN_OUTBOUND port=49152 sg=ALLOW nacl=ALLOW final=ALLOW\n'
      },
      {
        label: 'Flux entrant bloqué par le Security Group (port non listé)',
        stdin: 'FLOW_CHECK DIRECTION=INBOUND PORT=22 SG_IN=80,443 NACL_RULES=100:Allow:All;*:Deny:All',
        expected: 'FLOW_VERDICT: dir=INBOUND port=22 sg=DENY nacl=ALLOW final=DENY\n'
      },
      {
        label: 'Flux entrant avec règle NACL prioritaire Deny',
        stdin: 'FLOW_CHECK DIRECTION=INBOUND PORT=80 SG_IN=80 NACL_RULES=50:Deny:80;100:Allow:80;*:Deny:All',
        expected: 'FLOW_VERDICT: dir=INBOUND port=80 sg=ALLOW nacl=DENY final=DENY\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def match_nacl_port(port, port_spec):
    if port_spec.lower() in ("all", "*"):
        return True
    if "-" in port_spec:
        p_min, p_max = [int(x) for x in port_spec.split("-")]
        return p_min <= port <= p_max
    return port == int(port_spec)

for ligne in lignes:
    if not ligne.startswith("FLOW_CHECK "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    direction = params.get("DIRECTION", "INBOUND").upper()
    port = int(params.get("PORT", "0"))
    sg_in_ports = [int(x) for x in params.get("SG_IN", "").split(",") if x.isdigit()]
    raw_nacl = params.get("NACL_RULES", "").split(";")

    # 1. Évaluation Security Group
    if direction == "RETURN_OUTBOUND":
        # Stateful : le retour sortant d'une connexion établie est TOUJOURS autorisé par le SG
        sg_decision = "ALLOW"
    else:  # INBOUND
        sg_decision = "ALLOW" if port in sg_in_ports else "DENY"

    # 2. Évaluation Network ACL (Stateless)
    nacl_decision = "DENY"
    rules = []
    for r in raw_nacl:
        if ":" not in r:
            continue
        num_str, effect, p_spec = r.split(":", 2)
        num = 99999 if num_str.strip() == "*" else int(num_str.strip())
        rules.append((num, effect.strip().title(), p_spec.strip()))

    # Tri par numéro de règle croissant
    rules.sort(key=lambda x: x[0])

    for num, effect, p_spec in rules:
        if match_nacl_port(port, p_spec):
            nacl_decision = "ALLOW" if effect == "Allow" else "DENY"
            break

    final_action = "ALLOW" if (sg_decision == "ALLOW" and nacl_decision == "ALLOW") else "DENY"

    print(f"FLOW_VERDICT: dir={direction} port={port} sg={sg_decision} nacl={nacl_decision} final={final_action}")
`
  }
];
