'use strict';

module.exports = [
  {
    "id": "aws3-c4-e1",
    "chapter": 4,
    "title": "Calculateur de Sous-réseaux CIDR & Adresses Réservées AWS",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la plage d'adresses d'un sous-réseau VPC, les 5 adresses IP réservées par AWS et le nombre d'adresses assignables.",
    "brief": "<p>Dans tout sous-réseau d'un <strong>Amazon Virtual Private Cloud (VPC)</strong>, AWS réserve obligatoirement 5 adresses IP :<br><br>\n1. <code>.0</code> : Adresse réseau.<br>\n2. <code>.1</code> : Passerelle du routeur VPC par défaut.<br>\n3. <code>.2</code> : Serveur DNS fourni par Amazon (AmazonProvidedDNS / Route 53 Resolver).<br>\n4. <code>.3</code> : Réservé par AWS pour extension future.<br>\n5. Dernière adresse (ex: <code>.255</code> pour un /24) : Adresse de diffusion (broadcast réseau).<br><br>\nFormule :<br>\n- Total d'adresses brutes : <code>2 ** (32 - masque)</code>.<br>\n- Adresses IP réellement utilisables pour des instances : <code>Total - 5</code>.<br><br>\nEntrée STDIN : <code>VPC_SUBNET CIDR=&lt;ip/masque&gt;</code> (ex: <code>10.0.1.0/24</code>).<br>\nSortie : <code>SUBNET_CALC: total_ips=&lt;t&gt; usable_ips=&lt;u&gt; net_ip=&lt;net&gt; router_ip=&lt;r&gt; dns_ip=&lt;d&gt; broadcast_ip=&lt;b&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c4-e1) — Calculateur de Sous-réseaux CIDR & Adresses Réservées AWS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau /28 (le plus petit autorisé par AWS VPC)]\n# Données : VPC_SUBNET CIDR=172.16.0.0/28\nA_COMPLETER\n\n[Cas 2 — Sous-réseau étendu /20 (4096 adresses)]\n# Données : VPC_SUBNET CIDR=192.168.16.0/20\nA_COMPLETER\n\n[Cas 3 — Sous-réseau moyen /26 (64 adresses)]\n# Données : VPC_SUBNET CIDR=10.10.5.128/26\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "VPC_SUBNET CIDR=10.0.1.0/24",
        "expected": "SUBNET_CALC: total_ips=256 usable_ips=251 net_ip=10.0.1.0 router_ip=10.0.1.1 dns_ip=10.0.1.2 broadcast_ip=10.0.1.255",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau /28 (le plus petit autorisé par AWS VPC)",
        "stdin": "cas:1",
        "expected": "SUBNET_CALC: total_ips=16 usable_ips=11 net_ip=172.16.0.0 router_ip=172.16.0.1 dns_ip=172.16.0.2 broadcast_ip=172.16.0.15\n"
      },
      {
        "label": "Sous-réseau étendu /20 (4096 adresses)",
        "stdin": "cas:2",
        "expected": "SUBNET_CALC: total_ips=4096 usable_ips=4091 net_ip=192.168.16.0 router_ip=192.168.16.1 dns_ip=192.168.16.2 broadcast_ip=192.168.31.255\n"
      },
      {
        "label": "Sous-réseau moyen /26 (64 adresses)",
        "stdin": "cas:3",
        "expected": "SUBNET_CALC: total_ips=64 usable_ips=59 net_ip=10.10.5.128 router_ip=10.10.5.129 dns_ip=10.10.5.130 broadcast_ip=10.10.5.191\n"
      }
    ],
    "solution": "[Exemple]\nSUBNET_CALC: total_ips=256 usable_ips=251 net_ip=10.0.1.0 router_ip=10.0.1.1 dns_ip=10.0.1.2 broadcast_ip=10.0.1.255\n\n[Cas 1 — Sous-réseau /28 (le plus petit autorisé par AWS VPC)]\nSUBNET_CALC: total_ips=16 usable_ips=11 net_ip=172.16.0.0 router_ip=172.16.0.1 dns_ip=172.16.0.2 broadcast_ip=172.16.0.15\n\n\n[Cas 2 — Sous-réseau étendu /20 (4096 adresses)]\nSUBNET_CALC: total_ips=4096 usable_ips=4091 net_ip=192.168.16.0 router_ip=192.168.16.1 dns_ip=192.168.16.2 broadcast_ip=192.168.31.255\n\n\n[Cas 3 — Sous-réseau moyen /26 (64 adresses)]\nSUBNET_CALC: total_ips=64 usable_ips=59 net_ip=10.10.5.128 router_ip=10.10.5.129 dns_ip=10.10.5.130 broadcast_ip=10.10.5.191"
  },
  {
    "id": "aws3-c4-e2",
    "chapter": 4,
    "title": "Auditeur de Tables de Routage VPC (Public vs Privé vs Isolé)",
    "level": "n2",
    "language": "analyse",
    "goal": "Qualifier un sous-réseau VPC selon la destination de sa route par défaut 0.0.0.0/0.",
    "brief": "<p>Dans Amazon VPC, la typologie d'un sous-réseau dépend de sa <strong>Route Table</strong> :<br><br>\n1. <strong>PUBLIC</strong> :<br>\nComporte une route par défaut <code>0.0.0.0/0</code> pointant directement vers une passerelle Internet <code>igw-&lt;id&gt;</code>.<br>\nLes instances avec IP publique peuvent communiquer directement avec Internet.<br><br>\n2. <strong>PRIVATE</strong> :<br>\nComporte une route par défaut <code>0.0.0.0/0</code> pointant vers une passerelle NAT managée <code>nat-&lt;id&gt;</code> ou une instance NAT.<br>\nLes instances peuvent initier des connexions sortantes (ex: téléchargement de patchs) mais sont inaccessibles depuis l'extérieur.<br><br>\n3. <strong>ISOLATED</strong> :<br>\nAucune route vers <code>0.0.0.0/0</code>. Le trafic est strictement confiné au VPC local ou à des passerelles d'extrémités privées (VPC Endpoints <code>vpce-&lt;id&gt;</code> ou Peering <code>pcx-&lt;id&gt;</code>).<br><br>\nEntrée STDIN :<br>\n<code>ROUTE_AUDIT SUBNET=&lt;id&gt; ROUTES=&lt;dest1-&gt;target1;dest2-&gt;target2;...&gt;</code>.<br><br>\nSortie : <code>ROUTE_VERDICT: subnet=&lt;id&gt; type=&lt;PUBLIC|PRIVATE|ISOLATED&gt; default_target=&lt;target|NONE&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c4-e2) — Auditeur de Tables de Routage VPC (Public vs Privé vs Isolé)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau privé avec NAT Gateway]\n# Données : ROUTE_AUDIT SUBNET=subnet-priv-01 ROUTES=10.0.0.0/16->local;0.0.0.0/0->nat-99887766\nA_COMPLETER\n\n[Cas 2 — Sous-réseau base de données isolé (aucune route 0.0.0.0/0)]\n# Données : ROUTE_AUDIT SUBNET=subnet-db-01 ROUTES=10.0.0.0/16->local;10.20.0.0/16->pcx-12345\nA_COMPLETER\n\n[Cas 3 — Sous-réseau isolé avec Endpoint S3 Gateway]\n# Données : ROUTE_AUDIT SUBNET=subnet-s3-only ROUTES=10.0.0.0/16->local;pl-63a5400a->vpce-55667788\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "ROUTE_AUDIT SUBNET=subnet-0a1b2c3d ROUTES=10.0.0.0/16->local;0.0.0.0/0->igw-11223344",
        "expected": "ROUTE_VERDICT: subnet=subnet-0a1b2c3d type=PUBLIC default_target=igw-11223344",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau privé avec NAT Gateway",
        "stdin": "cas:1",
        "expected": "ROUTE_VERDICT: subnet=subnet-priv-01 type=PRIVATE default_target=nat-99887766\n"
      },
      {
        "label": "Sous-réseau base de données isolé (aucune route 0.0.0.0/0)",
        "stdin": "cas:2",
        "expected": "ROUTE_VERDICT: subnet=subnet-db-01 type=ISOLATED default_target=NONE\n"
      },
      {
        "label": "Sous-réseau isolé avec Endpoint S3 Gateway",
        "stdin": "cas:3",
        "expected": "ROUTE_VERDICT: subnet=subnet-s3-only type=ISOLATED default_target=NONE\n"
      }
    ],
    "solution": "[Exemple]\nROUTE_VERDICT: subnet=subnet-0a1b2c3d type=PUBLIC default_target=igw-11223344\n\n[Cas 1 — Sous-réseau privé avec NAT Gateway]\nROUTE_VERDICT: subnet=subnet-priv-01 type=PRIVATE default_target=nat-99887766\n\n\n[Cas 2 — Sous-réseau base de données isolé (aucune route 0.0.0.0/0)]\nROUTE_VERDICT: subnet=subnet-db-01 type=ISOLATED default_target=NONE\n\n\n[Cas 3 — Sous-réseau isolé avec Endpoint S3 Gateway]\nROUTE_VERDICT: subnet=subnet-s3-only type=ISOLATED default_target=NONE"
  },
  {
    "id": "aws3-c4-e3",
    "chapter": 4,
    "title": "Simulateur de Pare-feu : Security Group (Stateful) vs Network ACL (Stateless)",
    "level": "n3",
    "language": "analyse",
    "goal": "Évaluer le filtrage d'un flux entrant ou d'un retour sortant en combinant Security Groups et Network ACLs.",
    "brief": "<p>La sécurité réseau AWS repose sur deux couches complémentaires :<br><br>\n1. <strong>Security Group (Avec état / Stateful)</strong> :<br>\n- S'applique au niveau de l'interface réseau élastique (ENI) de l'instance.<br>\n- Tout trafic retour d'un flux entrant autorisé est <strong>automatiquement accepté</strong>, quelles que soient les règles sortantes.<br>\n- Par défaut en entrée : <code>DENY</code>.<br><br>\n2. <strong>Network ACL (Sans état / Stateless)</strong> :<br>\n- S'applique au niveau du sous-réseau.<br>\n- Règles numérotées (1..32766) évaluées par ordre croissant : la première règle correspondante s'applique (ALLOW ou DENY).<br>\n- Règle par défaut <code>*</code> (fin de liste) : <code>DENY</code>.<br>\n- <strong>Sans état</strong> : Pour qu'un paquet retour d'une connexion TCP puisse sortir, la NACL doit comporter une règle sortante autorisant les ports éphémères (ex: <code>1024-65535</code>).<br><br>\nEntrée STDIN :<br>\n<code>FLOW_CHECK DIRECTION=&lt;INBOUND|RETURN_OUTBOUND&gt; PORT=&lt;n&gt; SG_IN=&lt;ports_allow&gt; NACL_RULES=&lt;num:Effect:port_or_range;...&gt;</code>.<br><br>\nSortie : <code>FLOW_VERDICT: dir=&lt;d&gt; port=&lt;p&gt; sg=&lt;ALLOW|DENY&gt; nacl=&lt;ALLOW|DENY&gt; final=&lt;ALLOW|DENY&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c4-e3) — Simulateur de Pare-feu : Security Group (Stateful) vs Network ACL (Stateless)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Retour sortant stateful bloqué par NACL stateless (ports éphémères)]\n# Données : FLOW_CHECK DIRECTION=RETURN_OUTBOUND PORT=54321 SG_IN=443 NACL_RULES=100:Deny:54321;*:Deny:All\nA_COMPLETER\n\n[Cas 2 — Retour sortant autorisé à la fois par SG stateful et NACL ports éphémères]\n# Données : FLOW_CHECK DIRECTION=RETURN_OUTBOUND PORT=49152 SG_IN=80 NACL_RULES=100:Allow:1024-65535;*:Deny:All\nA_COMPLETER\n\n[Cas 3 — Flux entrant bloqué par le Security Group (port non listé)]\n# Données : FLOW_CHECK DIRECTION=INBOUND PORT=22 SG_IN=80,443 NACL_RULES=100:Allow:All;*:Deny:All\nA_COMPLETER\n\n[Cas 4 — Flux entrant avec règle NACL prioritaire Deny]\n# Données : FLOW_CHECK DIRECTION=INBOUND PORT=80 SG_IN=80 NACL_RULES=50:Deny:80;100:Allow:80;*:Deny:All\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "FLOW_CHECK DIRECTION=INBOUND PORT=443 SG_IN=80,443 NACL_RULES=100:Allow:443;200:Deny:All;*:Deny:All",
        "expected": "FLOW_VERDICT: dir=INBOUND port=443 sg=ALLOW nacl=ALLOW final=ALLOW",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Retour sortant stateful bloqué par NACL stateless (ports éphémères)",
        "stdin": "cas:1",
        "expected": "FLOW_VERDICT: dir=RETURN_OUTBOUND port=54321 sg=ALLOW nacl=DENY final=DENY\n"
      },
      {
        "label": "Retour sortant autorisé à la fois par SG stateful et NACL ports éphémères",
        "stdin": "cas:2",
        "expected": "FLOW_VERDICT: dir=RETURN_OUTBOUND port=49152 sg=ALLOW nacl=ALLOW final=ALLOW\n"
      },
      {
        "label": "Flux entrant bloqué par le Security Group (port non listé)",
        "stdin": "cas:3",
        "expected": "FLOW_VERDICT: dir=INBOUND port=22 sg=DENY nacl=ALLOW final=DENY\n"
      },
      {
        "label": "Flux entrant avec règle NACL prioritaire Deny",
        "stdin": "cas:4",
        "expected": "FLOW_VERDICT: dir=INBOUND port=80 sg=ALLOW nacl=DENY final=DENY\n"
      }
    ],
    "solution": "[Exemple]\nFLOW_VERDICT: dir=INBOUND port=443 sg=ALLOW nacl=ALLOW final=ALLOW\n\n[Cas 1 — Retour sortant stateful bloqué par NACL stateless (ports éphémères)]\nFLOW_VERDICT: dir=RETURN_OUTBOUND port=54321 sg=ALLOW nacl=DENY final=DENY\n\n\n[Cas 2 — Retour sortant autorisé à la fois par SG stateful et NACL ports éphémères]\nFLOW_VERDICT: dir=RETURN_OUTBOUND port=49152 sg=ALLOW nacl=ALLOW final=ALLOW\n\n\n[Cas 3 — Flux entrant bloqué par le Security Group (port non listé)]\nFLOW_VERDICT: dir=INBOUND port=22 sg=DENY nacl=ALLOW final=DENY\n\n\n[Cas 4 — Flux entrant avec règle NACL prioritaire Deny]\nFLOW_VERDICT: dir=INBOUND port=80 sg=ALLOW nacl=DENY final=DENY"
  }
];
