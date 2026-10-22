'use strict';

module.exports = [
  {
    "id": "pf3-c1-e1",
    "chapter": 1,
    "title": "Validateur d’assignation d’interfaces et calcul de sous-réseau CIDR",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la validité de l’attribution IP d’une interface pfSense et calculer l’adresse réseau, la fin de plage/diffusion et le nombre d’hôtes utilisables selon le préfixe CIDR (/24, /30, /31 RFC 3021 et /32).",
    "brief": "<p>Dans pfSense, chaque interface physique ou virtuelle (WAN, LAN, OPT, Loopback) est configurée avec une adresse IPv4 et une longueur de préfixe au format CIDR <code>/n</code>.<br><br>\nAnalysez les paramètres de chaque interface selon les règles normées de la section 4 :<br>\n- <strong>Sous-réseau standard ($n \\le 30$) :</strong> la première adresse est l’adresse réseau (bits d’hôte à 0), la dernière est l’adresse de diffusion (<em>broadcast</em>, bits d’hôte à 1), et le nombre d’hôtes utilisables vaut $2^{32-n} - 2$ (ex. en <code>/24</code> : $254$ hôtes ; en <code>/30</code> : $2$ hôtes).<br>\n- <strong>Lien point-à-point <code>/31</code> (RFC 3021) :</strong> aucune adresse de diffusion n’est soustraite ; les deux adresses consécutives du bloc sont utilisables (<code>hosts=2</code>, de la première à la seconde adresse).<br>\n- <strong>Route d’hôte unique <code>/32</code> :</strong> désigne une seule interface ou VIP Loopback (<code>hosts=1</code>, adresse réseau et fin de plage égales à l’IP).<br><br>\nPour chaque interface analysée, indiquez le bilan au format :<br>\n<code>IFACE_REPORT iface={interface} ip={ip_sans_masque} net={adresse_reseau} bcast={adresse_diffusion_ou_fin} hosts={nb_hotes_utilisables}</code></p>",
    "starter": "# Grille d'analyse (pf3-c1-e1) — Validateur d’assignation d’interfaces et calcul de sous-réseau CIDR\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau LAN standard /24]\n# Données : IFACE_CONFIG iface=lan ip=10.10.20.1/24\nA_COMPLETER\n\n[Cas 2 — Interconnexion WAN en /30]\n# Données : IFACE_CONFIG iface=wan ip=198.51.100.2/30\nA_COMPLETER\n\n[Cas 3 — Lien point-à-point inter-routeurs en /31 (RFC 3021)]\n# Données : IFACE_CONFIG iface=opt1 ip=172.16.0.10/31\nA_COMPLETER\n\n[Cas 4 — Adresse virtuelle Loopback d’hôte unique en /32]\n# Données : IFACE_CONFIG iface=lo0 ip=203.0.113.55/32\nA_COMPLETER\n",
    "hints": [
      "Pour un préfixe /n avec n <= 30, le bloc compte 2^(32-n) adresses totales, dont 2^(32-n) - 2 adresses d’hôtes utilisables entre l’adresse réseau et l’adresse de diffusion.",
      "Appliquez les cas particuliers normés de la section 4 : en /31 (RFC 3021) les 2 adresses sont utilisables (hosts=2), et en /32 l’adresse désigne 1 hôte unique (hosts=1)."
    ],
    "examples": [
      {
        "stdin": "IFACE_CONFIG iface=lan ip=192.168.1.1/24",
        "expected": "IFACE_REPORT iface=lan ip=192.168.1.1 net=192.168.1.0 bcast=192.168.1.255 hosts=254",
        "note": "Réseau 192.168.1.0/24 avec 254 hôtes utilisables (2^8 - 2)."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau LAN standard /24",
        "stdin": "cas:1",
        "expected": "IFACE_REPORT iface=lan ip=10.10.20.1 net=10.10.20.0 bcast=10.10.20.255 hosts=254"
      },
      {
        "label": "Interconnexion WAN en /30",
        "stdin": "cas:2",
        "expected": "IFACE_REPORT iface=wan ip=198.51.100.2 net=198.51.100.0 bcast=198.51.100.3 hosts=2"
      },
      {
        "label": "Lien point-à-point inter-routeurs en /31 (RFC 3021)",
        "stdin": "cas:3",
        "expected": "IFACE_REPORT iface=opt1 ip=172.16.0.10 net=172.16.0.10 bcast=172.16.0.11 hosts=2"
      },
      {
        "label": "Adresse virtuelle Loopback d’hôte unique en /32",
        "stdin": "cas:4",
        "expected": "IFACE_REPORT iface=lo0 ip=203.0.113.55 net=203.0.113.55 bcast=203.0.113.55 hosts=1"
      }
    ],
    "solution": "[Exemple]\nIFACE_REPORT iface=lan ip=192.168.1.1 net=192.168.1.0 bcast=192.168.1.255 hosts=254\n\n[Cas 1 — Sous-réseau LAN standard /24]\nIFACE_REPORT iface=lan ip=10.10.20.1 net=10.10.20.0 bcast=10.10.20.255 hosts=254\n\n[Cas 2 — Interconnexion WAN en /30]\nIFACE_REPORT iface=wan ip=198.51.100.2 net=198.51.100.0 bcast=198.51.100.3 hosts=2\n\n[Cas 3 — Lien point-à-point inter-routeurs en /31 (RFC 3021)]\nIFACE_REPORT iface=opt1 ip=172.16.0.10 net=172.16.0.10 bcast=172.16.0.11 hosts=2\n\n[Cas 4 — Adresse virtuelle Loopback d’hôte unique en /32]\nIFACE_REPORT iface=lo0 ip=203.0.113.55 net=203.0.113.55 bcast=203.0.113.55 hosts=1"
  },
  {
    "id": "pf3-c1-e2",
    "chapter": 1,
    "title": "Convertisseur de règles pfSense WebGUI vers syntaxe native FreeBSD PF (pf.conf)",
    "level": "n2",
    "language": "analyse",
    "goal": "Traduire une déclaration de règle de pare-feu de l’interface graphique pfSense en directive syntaxique native Packet Filter.",
    "brief": "<p>pfSense repose sur le moteur de filtrage de paquets <strong>Packet Filter (PF)</strong> de FreeBSD. Dans pfSense, les règles sont saisies via la WebGUI mais compilées dans le fichier système <code>/tmp/rules.debug</code>.<br><br>\nAnalysez les paramètres de chaque règle de filtrage selon la grammaire de la section 4 :<br>\n- Structure : <code>{action} in on {iface} [proto {proto}] from {src} to {dst} [port {port}]</code>.<br>\n- Lorsque le protocole vaut <code>any</code>, la clause <code>proto</code> est omise.<br>\n- Lorsque le port vaut <code>any</code>, la clause <code>port</code> est omise.<br><br>\nPour chaque cas analysé, indiquez la directive générée sous la forme :<br>\n<code>PF_CONF_RULE {règle_générée}</code></p>",
    "starter": "# Grille d'analyse (pf3-c1-e2) — Convertisseur de règles pfSense WebGUI vers syntaxe native FreeBSD PF (pf.conf)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Blocage total de tout trafic sur le WAN]\n# Données : GUI_RULE action=block iface=wan proto=any src=any dst=any port=any\nA_COMPLETER\n\n[Cas 2 — Autorisation DNS UDP spécifique]\n# Données : GUI_RULE action=pass iface=opt1 proto=udp src=10.0.1.0/24 dst=1.1.1.1 port=53\nA_COMPLETER\n\n[Cas 3 — Trafic TCP sans restriction de port]\n# Données : GUI_RULE action=pass iface=lan proto=tcp src=192.168.1.10 dst=10.0.0.5 port=any\nA_COMPLETER\n",
    "hints": [
      "N’incluez la clause « proto <protocole> » que lorsqu’un protocole spécifique (tcp, udp, icmp) est imposé.",
      "N’incluez la clause « port <port> » après la destination que lorsqu’un numéro de port précis est imposé."
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
    "brief": "<p>Sous pfSense, le démon DHCP (ISC DHCPD ou Kea) distribue les adresses IP dynamiques. Une bonne pratique réseau stricte impose que les réservations statiques (Static Mappings) soient situées <strong>hors de la plage dynamique (pool)</strong> mais au sein du même sous-réseau.<br><br>\nAnalysez la cohérence de chaque configuration DHCP selon les deux critères suivants :<br>\n1. Vérifier que les bornes de la plage dynamique (début et fin du pool) ainsi que l’adresse du bail statique appartiennent bien au sous-réseau CIDR déclaré :<br>\n   - Si l’une des adresses sort du sous-réseau : <code>status=INVALID_SUBNET_OUT_OF_BOUNDS</code>.<br>\n2. Lorsque toutes les adresses appartiennent au sous-réseau :<br>\n   - Si l’adresse du bail statique est comprise entre le début et la fin de la plage dynamique (inclus) : <code>status=CONFLICT_STATIC_INSIDE_DYNAMIC_POOL</code>.<br>\n   - Sinon (bail statique réservé en dehors du pool dynamique) : <code>status=VALID_SCOPE</code>.<br><br>\nPour chaque cas analysé, indiquez le diagnostic sous la forme :<br>\n<code>DHCP_AUDIT subnet={subnet} static_ip={static_ip} status={status}</code></p>",
    "starter": "# Grille d'analyse (pf3-c1-e3) — Auditeur de plage DHCP pfSense et détection de conflit de baux statiques\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Bail statique en plein milieu de la plage dynamique (conflit)]\n# Données : DHCP_CHECK subnet=192.168.1.0/24 pool_start=192.168.1.100 pool_end=192.168.1.200 static_ip=192.168.1.150\nA_COMPLETER\n\n[Cas 2 — Adresse statique hors du sous-réseau configuré]\n# Données : DHCP_CHECK subnet=10.0.0.0/24 pool_start=10.0.0.10 pool_end=10.0.0.50 static_ip=10.0.1.5\nA_COMPLETER\n\n[Cas 3 — Plage dynamique hors sous-réseau]\n# Données : DHCP_CHECK subnet=172.16.10.0/24 pool_start=172.16.20.10 pool_end=172.16.20.50 static_ip=172.16.10.5\nA_COMPLETER\n",
    "hints": [
      "Vérifiez d’abord que les octets réseau des adresses du pool et du bail statique correspondent au préfixe CIDR du sous-réseau.",
      "Comparez ensuite le dernier octet de l’adresse statique aux bornes inférieure et supérieure de la plage dynamique."
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
