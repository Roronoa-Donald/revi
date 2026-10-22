'use strict';

module.exports = [
  {
    "id": "az3-c4-e1",
    "chapter": 4,
    "title": "Calculateur d'adressage Azure VNet & Adresses IP réservées",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la plage d’adresses IP d’un sous-réseau Azure en déduisant les 5 adresses réservées par le système SDN d’Azure.",
    "brief": "<p>Dans chaque sous-réseau (Subnet) d'un VNet Azure, Microsoft réserve systématiquement <strong>5 adresses IP</strong> qui ne peuvent pas être assignées aux machines virtuelles ou ressources clientes :<br>\n- <code>.0</code> : Adresse réseau (Network ID)<br>\n- <code>.1</code> : Passerelle par défaut Azure (Default Gateway)<br>\n- <code>.2</code> : Résolveur DNS Azure primaire<br>\n- <code>.3</code> : Résolveur DNS Azure secondaire<br>\n- <code>.&lt;dernière&gt;</code> (ex: <code>.255</code> pour un /24) : Adresse de diffusion (Broadcast)<br><br>\nAinsi, la première IP assignable est <code>.4</code> et la dernière est <code>.&lt;dernière - 1&gt;</code>.<br>\nLe nombre d'IPs exploitables est donc <code>Total - 5</code>.<br><br>\nFormat d'entrée :<br>\n<code>SUBNET name=&lt;nom&gt; cidr=&lt;adresse/préfixe&gt;</code><br><br>\nFormat de sortie attendu :<br>\n<code>SUBNET &lt;nom&gt;: TOTAL=&lt;total&gt; USABLE=&lt;usable&gt; RESERVED=5 GATEWAY=&lt;gw_ip&gt; DNS1=&lt;dns1_ip&gt; RANGE=&lt;first_usable&gt;-&lt;last_usable&gt;</code></p>",
    "starter": "# Grille d'analyse (az3-c4-e1) — Calculateur d'adressage Azure VNet & Adresses IP réservées\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau de base de données /24 distinct]\n# Données : SUBNET name=snet-db cidr=10.0.10.0/24\nA_COMPLETER\n\n[Cas 2 — Petit sous-réseau AzureBastionSubnet en /26]\n# Données : SUBNET name=AzureBastionSubnet cidr=10.0.2.0/26\nA_COMPLETER\n\n[Cas 3 — Sous-réseau GatewaySubnet minimal en /27]\n# Données : SUBNET name=GatewaySubnet cidr=192.168.0.0/27\nA_COMPLETER\n",
    "hints": [
      "Utiliser le module Python `la notation CIDR du réseau`.",
      "L’IP de passerelle correspond à l’adresse réseau + 1 (.1), et la première IP assignable aux machines correspond à l’adresse réseau + 4 (.4)."
    ],
    "examples": [
      {
        "stdin": "SUBNET name=snet-web cidr=10.0.1.0/24",
        "expected": "SUBNET snet-web: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.1.1 DNS1=10.0.1.2 RANGE=10.0.1.4-10.0.1.254",
        "note": "Sous-réseau /24 classique avec 251 adresses exploitables."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau de base de données /24 distinct",
        "stdin": "cas:1",
        "expected": "SUBNET snet-db: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.10.1 DNS1=10.0.10.2 RANGE=10.0.10.4-10.0.10.254"
      },
      {
        "label": "Petit sous-réseau AzureBastionSubnet en /26",
        "stdin": "cas:2",
        "expected": "SUBNET AzureBastionSubnet: TOTAL=64 USABLE=59 RESERVED=5 GATEWAY=10.0.2.1 DNS1=10.0.2.2 RANGE=10.0.2.4-10.0.2.62"
      },
      {
        "label": "Sous-réseau GatewaySubnet minimal en /27",
        "stdin": "cas:3",
        "expected": "SUBNET GatewaySubnet: TOTAL=32 USABLE=27 RESERVED=5 GATEWAY=192.168.0.1 DNS1=192.168.0.2 RANGE=192.168.0.4-192.168.0.30"
      }
    ],
    "solution": "[Exemple]\nSUBNET snet-web: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.1.1 DNS1=10.0.1.2 RANGE=10.0.1.4-10.0.1.254\n\n[Cas 1 — Sous-réseau de base de données /24 distinct]\nSUBNET snet-db: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.10.1 DNS1=10.0.10.2 RANGE=10.0.10.4-10.0.10.254\n\n[Cas 2 — Petit sous-réseau AzureBastionSubnet en /26]\nSUBNET AzureBastionSubnet: TOTAL=64 USABLE=59 RESERVED=5 GATEWAY=10.0.2.1 DNS1=10.0.2.2 RANGE=10.0.2.4-10.0.2.62\n\n[Cas 3 — Sous-réseau GatewaySubnet minimal en /27]\nSUBNET GatewaySubnet: TOTAL=32 USABLE=27 RESERVED=5 GATEWAY=192.168.0.1 DNS1=192.168.0.2 RANGE=192.168.0.4-192.168.0.30"
  },
  {
    "id": "az3-c4-e2",
    "chapter": 4,
    "title": "Moteur d'évaluation de règles de sécurité NSG",
    "level": "n2",
    "language": "analyse",
    "goal": "Évaluer le traitement d’un paquet réseau entrant par un groupe de sécurité réseau (NSG) selon l’ordre de priorité des règles et les règles par défaut Azure.",
    "brief": "<p>Un groupe de sécurité réseau (NSG) filtre le trafic entrant et sortant. Les règles sont traitées par ordre croissant de priorité (de 100 à 4096). La première règle correspondant au paquet s'applique immédiatement.<br><br>\nRègles par défaut Azure (INBOUND) automatiques en fin de chaîne :<br>\n- Priorité <code>65000</code> : <code>AllowVNetInBound</code>, source=<code>VirtualNetwork</code>, port=<code>*</code>, proto=<code>ANY</code>, action=<code>ALLOW</code><br>\n- Priorité <code>65001</code> : <code>AllowAzureLoadBalancerInBound</code>, source=<code>AzureLoadBalancer</code>, port=<code>*</code>, proto=<code>ANY</code>, action=<code>ALLOW</code><br>\n- Priorité <code>65500</code> : <code>DenyAllInBound</code>, source=<code>*</code>, port=<code>*</code>, proto=<code>ANY</code>, action=<code>DENY</code><br><br>\nFormat d'entrée :<br>\nDéclaration de règles personnalisées :<br>\n<code>RULE prio=&lt;int&gt; name=&lt;nom&gt; direction=INBOUND source=&lt;SRC&gt; port=&lt;PORT&gt; proto=&lt;TCP|UDP|ANY&gt; action=&lt;ALLOW|DENY&gt;</code><br>\nPuis paquets à évaluer :<br>\n<code>TEST_PACKET source=&lt;SRC&gt; port=&lt;PORT&gt; proto=&lt;TCP|UDP&gt;</code><br><br>\nCritères de correspondance d'un paquet :<br>\n- <code>source</code> : matche si la règle a <code>*</code> ou la même valeur exacte.<br>\n- <code>port</code> : matche si la règle a <code>*</code> ou le même numéro de port.<br>\n- <code>proto</code> : matche si la règle a <code>ANY</code> ou le même protocole exact.<br><br>\nFormat de sortie attendu :<br>\n<code>PACKET: matched_rule=&lt;name&gt; (prio=&lt;prio&gt;) -&gt; RESULT=&lt;ALLOW|DENY&gt;</code></p>",
    "starter": "# Grille d'analyse (az3-c4-e2) — Moteur d'évaluation de règles de sécurité NSG\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Règles personnalisées DNS et Telnet]\n# Données : RULE prio=150 name=Allow-DNS direction=INBOUND source=CorpDNS port=53 proto=UDP action=ALLOW\n# Données : RULE prio=250 name=Deny-Telnet direction=INBOUND source=* port=23 proto=TCP action=DENY\n# Données : TEST_PACKET source=CorpDNS port=53 proto=UDP\n# Données : TEST_PACKET source=AnyHost port=23 proto=TCP\nA_COMPLETER\n\n[Cas 2 — Chute sur les règles par défaut Azure VNet et DenyAll]\n# Données : RULE prio=300 name=Allow-HTTPS direction=INBOUND source=Internet port=443 proto=TCP action=ALLOW\n# Données : TEST_PACKET source=VirtualNetwork port=3389 proto=TCP\n# Données : TEST_PACKET source=ExternalHacker port=4444 proto=UDP\nA_COMPLETER\n\n[Cas 3 — Règle par défaut AzureLoadBalancer]\n# Données : TEST_PACKET source=AzureLoadBalancer port=80 proto=TCP\nA_COMPLETER\n",
    "hints": [
      "Ajouter les 3 règles par défaut Azure dans la liste des règles avec leurs priorités 65000, 65001 et 65500.",
      "Trier l'ensemble des règles par priorité croissante et trouver la première règle correspondante."
    ],
    "examples": [
      {
        "stdin": "RULE prio=100 name=Allow-HTTP direction=INBOUND source=Internet port=80 proto=TCP action=ALLOW\nRULE prio=200 name=Deny-SSH direction=INBOUND source=* port=22 proto=TCP action=DENY\nTEST_PACKET source=Internet port=80 proto=TCP\nTEST_PACKET source=Internet port=22 proto=TCP",
        "expected": "PACKET: matched_rule=Allow-HTTP (prio=100) -> RESULT=ALLOW\nPACKET: matched_rule=Deny-SSH (prio=200) -> RESULT=DENY",
        "note": "Le port 80 est autorisé par la règle 100 et SSH 22 est bloqué par la règle 200."
      }
    ],
    "tests": [
      {
        "label": "Règles personnalisées DNS et Telnet",
        "stdin": "cas:1",
        "expected": "PACKET: matched_rule=Allow-DNS (prio=150) -> RESULT=ALLOW\nPACKET: matched_rule=Deny-Telnet (prio=250) -> RESULT=DENY"
      },
      {
        "label": "Chute sur les règles par défaut Azure VNet et DenyAll",
        "stdin": "cas:2",
        "expected": "PACKET: matched_rule=AllowVNetInBound (prio=65000) -> RESULT=ALLOW\nPACKET: matched_rule=DenyAllInBound (prio=65500) -> RESULT=DENY"
      },
      {
        "label": "Règle par défaut AzureLoadBalancer",
        "stdin": "cas:3",
        "expected": "PACKET: matched_rule=AllowAzureLoadBalancerInBound (prio=65001) -> RESULT=ALLOW"
      }
    ],
    "solution": "[Exemple]\nPACKET: matched_rule=Allow-HTTP (prio=100) -> RESULT=ALLOW\nPACKET: matched_rule=Deny-SSH (prio=200) -> RESULT=DENY\n\n[Cas 1 — Règles personnalisées DNS et Telnet]\nPACKET: matched_rule=Allow-DNS (prio=150) -> RESULT=ALLOW\nPACKET: matched_rule=Deny-Telnet (prio=250) -> RESULT=DENY\n\n[Cas 2 — Chute sur les règles par défaut Azure VNet et DenyAll]\nPACKET: matched_rule=AllowVNetInBound (prio=65000) -> RESULT=ALLOW\nPACKET: matched_rule=DenyAllInBound (prio=65500) -> RESULT=DENY\n\n[Cas 3 — Règle par défaut AzureLoadBalancer]\nPACKET: matched_rule=AllowAzureLoadBalancerInBound (prio=65001) -> RESULT=ALLOW"
  },
  {
    "id": "az3-c4-e3",
    "chapter": 4,
    "title": "Validateur de Peering VNet & Topologie Hub-and-Spoke",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la validité de liens d’interconnexion (VNet Peering) en détectant les chevauchements de plages CIDR et les incohérences de passerelles de transit.",
    "brief": "<p>L'interconnexion de réseaux virtuels par Peering Azure permet une communication privée à haute performance. Toutefois, Azure refuse catégoriquement l'établissement d'un peering si les plages d'adresses IP se chevauchent, ou si la configuration de passerelle est incohérente.<br><br>\nFormat d'entrée :<br>\n1. Déclaration des VNets :<br>\n   <code>VNET id=&lt;nom&gt; cidr=&lt;plage_ip&gt;</code><br>\n2. Demande d'établissement de Peering :<br>\n   <code>PEERING vnet1=&lt;nom1&gt; vnet2=&lt;nom2&gt; allow_gw_transit=&lt;true|false&gt; use_remote_gw=&lt;true|false&gt;</code><br><br>\nRègles de validation :<br>\n- Si l'un des deux VNets n'a pas été déclaré au préalable :<br>\n  <code>PEERING_ERROR: Unknown VNet in peering &lt;nom1&gt; &lt;-&gt; &lt;nom2&gt;</code><br>\n- Si les plages CIDR des deux réseaux se chevauchent :<br>\n  <code>PEERING_FAILED: Overlapping CIDR between &lt;nom1&gt; (&lt;cidr1&gt;) and &lt;nom2&gt; (&lt;cidr2&gt;)</code><br>\n- Si <code>allow_gw_transit=true</code> ET <code>use_remote_gw=true</code> simultanément :<br>\n  <code>PEERING_FAILED: Incompatible gateway flags on peering &lt;nom1&gt; &lt;-&gt; &lt;nom2&gt;</code><br>\n- Si toutes les conditions sont remplies :<br>\n  <code>PEERING_SUCCESS: &lt;nom1&gt; &lt;-&gt; &lt;nom2&gt; status=CONNECTED gateway_transit=&lt;ENABLED|DISABLED&gt;</code><br>\n  (avec <code>ENABLED</code> si au moins l'un des deux flags est à true, sinon <code>DISABLED</code>).</p>",
    "starter": "# Grille d'analyse (az3-c4-e3) — Validateur de Peering VNet & Topologie Hub-and-Spoke\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Peering valide entre VNet Core et VNet App sans transit]\n# Données : VNET id=vnet-core cidr=172.16.0.0/16\n# Données : VNET id=vnet-app cidr=172.17.0.0/16\n# Données : PEERING vnet1=vnet-core vnet2=vnet-app allow_gw_transit=false use_remote_gw=false\nA_COMPLETER\n\n[Cas 2 — Échec dû au chevauchement CIDR]\n# Données : VNET id=vnet-a cidr=10.0.0.0/16\n# Données : VNET id=vnet-b cidr=10.0.1.0/24\n# Données : PEERING vnet1=vnet-a vnet2=vnet-b allow_gw_transit=false use_remote_gw=false\nA_COMPLETER\n\n[Cas 3 — Conflit de flags de passerelle et VNet inconnu]\n# Données : VNET id=vnet-hub cidr=10.0.0.0/16\n# Données : VNET id=vnet-spoke2 cidr=10.2.0.0/16\n# Données : PEERING vnet1=vnet-hub vnet2=vnet-spoke2 allow_gw_transit=true use_remote_gw=true\n# Données : PEERING vnet1=vnet-hub vnet2=vnet-ghost allow_gw_transit=false use_remote_gw=false\nA_COMPLETER\n",
    "hints": [
      "Vérifiez si les deux plages d’adresses CIDR se chevauchent (intersection non vide).",
      "Vérifier que allow_gw_transit et use_remote_gw ne sont pas tous les deux actifs en même temps."
    ],
    "examples": [
      {
        "stdin": "VNET id=vnet-hub cidr=10.0.0.0/16\nVNET id=vnet-spoke1 cidr=10.1.0.0/16\nPEERING vnet1=vnet-hub vnet2=vnet-spoke1 allow_gw_transit=true use_remote_gw=false",
        "expected": "PEERING_SUCCESS: vnet-hub <-> vnet-spoke1 status=CONNECTED gateway_transit=ENABLED",
        "note": "Peering valide sans chevauchement avec passerelle de transit activée sur le Hub."
      }
    ],
    "tests": [
      {
        "label": "Peering valide entre VNet Core et VNet App sans transit",
        "stdin": "cas:1",
        "expected": "PEERING_SUCCESS: vnet-core <-> vnet-app status=CONNECTED gateway_transit=DISABLED"
      },
      {
        "label": "Échec dû au chevauchement CIDR",
        "stdin": "cas:2",
        "expected": "PEERING_FAILED: Overlapping CIDR between vnet-a (10.0.0.0/16) and vnet-b (10.0.1.0/24)"
      },
      {
        "label": "Conflit de flags de passerelle et VNet inconnu",
        "stdin": "cas:3",
        "expected": "PEERING_FAILED: Incompatible gateway flags on peering vnet-hub <-> vnet-spoke2\nPEERING_ERROR: Unknown VNet in peering vnet-hub <-> vnet-ghost"
      }
    ],
    "solution": "[Exemple]\nPEERING_SUCCESS: vnet-hub <-> vnet-spoke1 status=CONNECTED gateway_transit=ENABLED\n\n[Cas 1 — Peering valide entre VNet Core et VNet App sans transit]\nPEERING_SUCCESS: vnet-core <-> vnet-app status=CONNECTED gateway_transit=DISABLED\n\n[Cas 2 — Échec dû au chevauchement CIDR]\nPEERING_FAILED: Overlapping CIDR between vnet-a (10.0.0.0/16) and vnet-b (10.0.1.0/24)\n\n[Cas 3 — Conflit de flags de passerelle et VNet inconnu]\nPEERING_FAILED: Incompatible gateway flags on peering vnet-hub <-> vnet-spoke2\nPEERING_ERROR: Unknown VNet in peering vnet-hub <-> vnet-ghost"
  }
];
