'use strict';

module.exports = [
  {
    "id": "pf3-c1-e1",
    "chapter": 1,
    "title": "Validateur d’assignation d’interfaces et calcul de sous-réseau CIDR",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la validité de l’attribution IP d’une interface pfSense et calculer l’adresse réseau et de diffusion (Broadcast).",
    "brief": "<p>Dans pfSense, chaque interface physique ou virtuelle (WAN, LAN, OPT) est configurée avec une adresse IPv4 et un masque de sous-réseau au format CIDR.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles de calcul (avec le module <code>ipaddress</code>) :<br>\n- Extraire l'adresse de réseau (<code>network_address</code>) et l'adresse de broadcast (<code>broadcast_address</code>).<br>\n- Calculer le nombre d'adresses d'hôtes utilisables : <code>usable_hosts = net.num_addresses - 2</code> (si prefix &lt; 31, sinon 0).<br><br>\nPour chaque interface, afficher :<br>\n<code>IFACE_REPORT iface={iface} ip={ip} net={network_address} bcast={broadcast_address} hosts={usable_hosts}</code></p>",
    "starter": "# Grille d'analyse (pf3-c1-e1) — Validateur d’assignation d’interfaces et calcul de sous-réseau CIDR\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau WAN public de classe C restreint /29]\n# Données : IFACE_CONFIG iface=wan ip=203.0.113.10/29\nA_COMPLETER\n\n[Cas 2 — Interface DMZ en /28]\n# Données : IFACE_CONFIG iface=opt1 ip=10.0.50.1/28\nA_COMPLETER\n\n[Cas 3 — Configuration multi-interfaces simultanées]\n# Données : IFACE_CONFIG iface=wan ip=198.51.100.2/30\n# Données : IFACE_CONFIG iface=lan ip=172.16.0.1/16\nA_COMPLETER\n",
    "hints": [
      "Utiliser ipaddress.ip_interface(ip_str) pour manipuler facilement l’adresse et le réseau.",
      "Le réseau parent est accessible via iface_obj.network."
    ],
    "examples": [
      {
        "stdin": "IFACE_CONFIG iface=lan ip=192.168.1.1/24",
        "expected": "IFACE_REPORT iface=lan ip=192.168.1.1 net=192.168.1.0 bcast=192.168.1.255 hosts=254",
        "note": "Réseau 192.168.1.0/24 avec 254 hôtes utilisables."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau WAN public de classe C restreint /29",
        "stdin": "cas:1",
        "expected": "IFACE_REPORT iface=wan ip=203.0.113.10 net=203.0.113.8 bcast=203.0.113.15 hosts=6"
      },
      {
        "label": "Interface DMZ en /28",
        "stdin": "cas:2",
        "expected": "IFACE_REPORT iface=opt1 ip=10.0.50.1 net=10.0.50.0 bcast=10.0.50.15 hosts=14"
      },
      {
        "label": "Configuration multi-interfaces simultanées",
        "stdin": "cas:3",
        "expected": "IFACE_REPORT iface=wan ip=198.51.100.2 net=198.51.100.0 bcast=198.51.100.3 hosts=2\nIFACE_REPORT iface=lan ip=172.16.0.1 net=172.16.0.0 bcast=172.16.255.255 hosts=65534"
      }
    ],
    "solution": "[Exemple]\nIFACE_REPORT iface=lan ip=192.168.1.1 net=192.168.1.0 bcast=192.168.1.255 hosts=254\n\n[Cas 1 — Sous-réseau WAN public de classe C restreint /29]\nIFACE_REPORT iface=wan ip=203.0.113.10 net=203.0.113.8 bcast=203.0.113.15 hosts=6\n\n[Cas 2 — Interface DMZ en /28]\nIFACE_REPORT iface=opt1 ip=10.0.50.1 net=10.0.50.0 bcast=10.0.50.15 hosts=14\n\n[Cas 3 — Configuration multi-interfaces simultanées]\nIFACE_REPORT iface=wan ip=198.51.100.2 net=198.51.100.0 bcast=198.51.100.3 hosts=2\nIFACE_REPORT iface=lan ip=172.16.0.1 net=172.16.0.0 bcast=172.16.255.255 hosts=65534"
  },
  {
    "id": "pf3-c1-e2",
    "chapter": 1,
    "title": "Convertisseur de règles pfSense WebGUI vers syntaxe native FreeBSD PF (pf.conf)",
    "level": "n2",
    "language": "analyse",
    "goal": "Traduire une déclaration de règle de pare-feu de l’interface graphique pfSense en directive syntaxique native Packet Filter.",
    "brief": "<p>pfSense repose sur le moteur de filtrage de paquets <strong>Packet Filter (PF)</strong> de FreeBSD. Dans pfSense, les règles sont saisies via la WebGUI mais compilées dans le fichier système <code>/tmp/rules.debug</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles de génération PF :<br>\n- Syntax : <code>{action} in on {iface} [proto {proto}] from {src} to {dst} [port {port}]</code>.<br>\n- Si <code>proto == 'any'</code>, omettre la clause <code>proto</code>.<br>\n- Si <code>port == 'any'</code>, omettre la clause <code>port</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>PF_CONF_RULE {règle_générée}</code></p>",
    "starter": "# Grille d'analyse (pf3-c1-e2) — Convertisseur de règles pfSense WebGUI vers syntaxe native FreeBSD PF (pf.conf)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Blocage total de tout trafic sur le WAN]\n# Données : GUI_RULE action=block iface=wan proto=any src=any dst=any port=any\nA_COMPLETER\n\n[Cas 2 — Autorisation DNS UDP spécifique]\n# Données : GUI_RULE action=pass iface=opt1 proto=udp src=10.0.1.0/24 dst=1.1.1.1 port=53\nA_COMPLETER\n\n[Cas 3 — Trafic TCP sans restriction de port]\n# Données : GUI_RULE action=pass iface=lan proto=tcp src=192.168.1.10 dst=10.0.0.5 port=any\nA_COMPLETER\n",
    "hints": [
      "Gérer conditionnellement l’ajout de \"proto <proto>\" si proto != \"any\".",
      "Gérer conditionnellement l’ajout de \"port <port>\" après la destination si port != \"any\"."
    ],
    "examples": [
      {
        "stdin": "GUI_RULE action=pass iface=lan proto=tcp src=192.168.1.0/24 dst=any port=443",
        "expected": "PF_CONF_RULE pass in on lan proto tcp from 192.168.1.0/24 to any port 443",
        "note": "Règle autorisant le trafic HTTPS sortant du LAN."
      }
    ],
    "tests": [
      {
        "label": "Blocage total de tout trafic sur le WAN",
        "stdin": "cas:1",
        "expected": "PF_CONF_RULE block in on wan from any to any"
      },
      {
        "label": "Autorisation DNS UDP spécifique",
        "stdin": "cas:2",
        "expected": "PF_CONF_RULE pass in on opt1 proto udp from 10.0.1.0/24 to 1.1.1.1 port 53"
      },
      {
        "label": "Trafic TCP sans restriction de port",
        "stdin": "cas:3",
        "expected": "PF_CONF_RULE pass in on lan proto tcp from 192.168.1.10 to 10.0.0.5"
      }
    ],
    "solution": "[Exemple]\nPF_CONF_RULE pass in on lan proto tcp from 192.168.1.0/24 to any port 443\n\n[Cas 1 — Blocage total de tout trafic sur le WAN]\nPF_CONF_RULE block in on wan from any to any\n\n[Cas 2 — Autorisation DNS UDP spécifique]\nPF_CONF_RULE pass in on opt1 proto udp from 10.0.1.0/24 to 1.1.1.1 port 53\n\n[Cas 3 — Trafic TCP sans restriction de port]\nPF_CONF_RULE pass in on lan proto tcp from 192.168.1.10 to 10.0.0.5"
  },
  {
    "id": "pf3-c1-e3",
    "chapter": 1,
    "title": "Auditeur de plage DHCP pfSense et détection de conflit de baux statiques",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la validité de la plage DHCP dynamique et détecter les conflits avec les baux statiques (Static Mappings).",
    "brief": "<p>Sous pfSense, le démon DHCP (ISC DHCPD ou Kea) distribue les adresses IP dynamiques. Une bonne pratique réseau stricte impose que les réservations statiques (Static Mappings) soient situées <strong>hors de la plage dynamique (pool)</strong> mais au sein du même sous-réseau.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles :<br>\n1. Vérifier si <code>pool_start</code>, <code>pool_end</code> et <code>static_ip</code> appartiennent au sous-réseau <code>subnet</code>.<br>\n   Si l'un d'eux est hors du sous-réseau : <code>status=INVALID_SUBNET_OUT_OF_BOUNDS</code>.<br>\n2. Si tous sont dans le sous-réseau :<br>\n   - Si <code>pool_start &lt;= static_ip &lt;= pool_end</code> :<br>\n     <code>status=CONFLICT_STATIC_INSIDE_DYNAMIC_POOL</code>.<br>\n   - Sinon :<br>\n     <code>status=VALID_SCOPE</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>DHCP_AUDIT subnet={subnet} static_ip={static_ip} status={status}</code></p>",
    "starter": "# Grille d'analyse (pf3-c1-e3) — Auditeur de plage DHCP pfSense et détection de conflit de baux statiques\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Bail statique en plein milieu de la plage dynamique (conflit)]\n# Données : DHCP_CHECK subnet=192.168.1.0/24 pool_start=192.168.1.100 pool_end=192.168.1.200 static_ip=192.168.1.150\nA_COMPLETER\n\n[Cas 2 — Adresse statique hors du sous-réseau configuré]\n# Données : DHCP_CHECK subnet=10.0.0.0/24 pool_start=10.0.0.10 pool_end=10.0.0.50 static_ip=10.0.1.5\nA_COMPLETER\n\n[Cas 3 — Plage dynamique hors sous-réseau]\n# Données : DHCP_CHECK subnet=172.16.10.0/24 pool_start=172.16.20.10 pool_end=172.16.20.50 static_ip=172.16.10.5\nA_COMPLETER\n",
    "hints": [
      "Utiliser ipaddress.ip_network(subnet) et ipaddress.ip_address(ip).",
      "Tester l’appartenance avec ip in net.",
      "Comparer les adresses IP avec les opérateurs classiques (start <= static <= end)."
    ],
    "examples": [
      {
        "stdin": "DHCP_CHECK subnet=192.168.1.0/24 pool_start=192.168.1.100 pool_end=192.168.1.200 static_ip=192.168.1.50",
        "expected": "DHCP_AUDIT subnet=192.168.1.0/24 static_ip=192.168.1.50 status=VALID_SCOPE",
        "note": "IP statique 192.168.1.50 en dehors de la plage 100-200 : configuration optimale."
      }
    ],
    "tests": [
      {
        "label": "Bail statique en plein milieu de la plage dynamique (conflit)",
        "stdin": "cas:1",
        "expected": "DHCP_AUDIT subnet=192.168.1.0/24 static_ip=192.168.1.150 status=CONFLICT_STATIC_INSIDE_DYNAMIC_POOL"
      },
      {
        "label": "Adresse statique hors du sous-réseau configuré",
        "stdin": "cas:2",
        "expected": "DHCP_AUDIT subnet=10.0.0.0/24 static_ip=10.0.1.5 status=INVALID_SUBNET_OUT_OF_BOUNDS"
      },
      {
        "label": "Plage dynamique hors sous-réseau",
        "stdin": "cas:3",
        "expected": "DHCP_AUDIT subnet=172.16.10.0/24 static_ip=172.16.10.5 status=INVALID_SUBNET_OUT_OF_BOUNDS"
      }
    ],
    "solution": "[Exemple]\nDHCP_AUDIT subnet=192.168.1.0/24 static_ip=192.168.1.50 status=VALID_SCOPE\n\n[Cas 1 — Bail statique en plein milieu de la plage dynamique (conflit)]\nDHCP_AUDIT subnet=192.168.1.0/24 static_ip=192.168.1.150 status=CONFLICT_STATIC_INSIDE_DYNAMIC_POOL\n\n[Cas 2 — Adresse statique hors du sous-réseau configuré]\nDHCP_AUDIT subnet=10.0.0.0/24 static_ip=10.0.1.5 status=INVALID_SUBNET_OUT_OF_BOUNDS\n\n[Cas 3 — Plage dynamique hors sous-réseau]\nDHCP_AUDIT subnet=172.16.10.0/24 static_ip=172.16.10.5 status=INVALID_SUBNET_OUT_OF_BOUNDS"
  }
];
