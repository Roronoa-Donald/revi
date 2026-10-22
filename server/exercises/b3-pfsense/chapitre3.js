'use strict';

module.exports = [
  {
    "id": "pf3-c3-e1",
    "chapter": 3,
    "title": "Simulateur de redirection de ports (Port Forwarding / DNAT)",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer les règles de NAT entrant (Port Forwarding) pour rediriger les flux externes vers les serveurs internes.",
    "brief": "<p>Dans pfSense, le <strong>Port Forwarding (DNAT)</strong> permet d'exposer un service interne hébergé sur une IP privée derrière l'adresse IP publique de l'interface WAN.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br>\nPuis des paquets entrants sur le WAN :<br>\n<code>INCOMING_PKT id=&lt;nom&gt; ext_dst_ip=&lt;wan_ip&gt; ext_dst_port=&lt;int&gt;</code>.<br><br>\nRègles :<br>\n- Si <code>ext_dst_port</code> correspond à une <code>NAT_RULE</code> :<br>\n  <code>status=REDIRECTED new_dst={int_ip}:{int_port}</code>.<br>\n- Sinon :<br>\n  <code>status=DROPPED new_dst=NONE</code>.<br><br>\nPour chaque paquet, afficher :<br>\n<code>DNAT_REPORT id={id} ext_port={ext_dst_port} status={status} target={new_dst}</code></p>",
    "starter": "# Grille d'analyse (pf3-c3-e1) — Simulateur de redirection de ports (Port Forwarding / DNAT)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Redirection HTTPS standard 443 vers 443 interne]\n# Données : NAT_RULE ext_port=443 int_ip=10.0.0.10 int_port=443\n# Données : INCOMING_PKT id=HTTPS_REQ ext_dst_ip=198.51.100.1 ext_dst_port=443\nA_COMPLETER\n\n[Cas 2 — Plusieurs règles de redirection distinctes]\n# Données : NAT_RULE ext_port=80 int_ip=192.168.1.10 int_port=80\n# Données : NAT_RULE ext_port=2222 int_ip=192.168.1.20 int_port=22\n# Données : INCOMING_PKT id=SSH_TEST ext_dst_ip=203.0.113.5 ext_dst_port=2222\n# Données : INCOMING_PKT id=UNKNOWN ext_dst_ip=203.0.113.5 ext_dst_port=3389\nA_COMPLETER\n\n[Cas 3 — Aucune règle de redirection déclarée]\n# Données : INCOMING_PKT id=ALONE ext_dst_ip=203.0.113.1 ext_dst_port=80\nA_COMPLETER\n",
    "hints": [
      "Gérer un dictionnaire associant ext_port à (int_ip, int_port).",
      "Vérifier si ext_dst_port existe dans les règles."
    ],
    "examples": [
      {
        "stdin": "NAT_RULE ext_port=8080 int_ip=192.168.1.50 int_port=80\nINCOMING_PKT id=PKT1 ext_dst_ip=203.0.113.1 ext_dst_port=8080\nINCOMING_PKT id=PKT2 ext_dst_ip=203.0.113.1 ext_dst_port=22",
        "expected": "DNAT_REPORT id=PKT1 ext_port=8080 status=REDIRECTED target=192.168.1.50:80\nDNAT_REPORT id=PKT2 ext_port=22 status=DROPPED target=NONE",
        "note": "Port 8080 redirigé vers 192.168.1.50:80 ; port 22 non mappé rejeté."
      }
    ],
    "tests": [
      {
        "label": "Redirection HTTPS standard 443 vers 443 interne",
        "stdin": "cas:1",
        "expected": "DNAT_REPORT id=HTTPS_REQ ext_port=443 status=REDIRECTED target=10.0.0.10:443"
      },
      {
        "label": "Plusieurs règles de redirection distinctes",
        "stdin": "cas:2",
        "expected": "DNAT_REPORT id=SSH_TEST ext_port=2222 status=REDIRECTED target=192.168.1.20:22\nDNAT_REPORT id=UNKNOWN ext_port=3389 status=DROPPED target=NONE"
      },
      {
        "label": "Aucune règle de redirection déclarée",
        "stdin": "cas:3",
        "expected": "DNAT_REPORT id=ALONE ext_port=80 status=DROPPED target=NONE"
      }
    ],
    "solution": "[Exemple]\nDNAT_REPORT id=PKT1 ext_port=8080 status=REDIRECTED target=192.168.1.50:80\nDNAT_REPORT id=PKT2 ext_port=22 status=DROPPED target=NONE\n\n[Cas 1 — Redirection HTTPS standard 443 vers 443 interne]\nDNAT_REPORT id=HTTPS_REQ ext_port=443 status=REDIRECTED target=10.0.0.10:443\n\n[Cas 2 — Plusieurs règles de redirection distinctes]\nDNAT_REPORT id=SSH_TEST ext_port=2222 status=REDIRECTED target=192.168.1.20:22\nDNAT_REPORT id=UNKNOWN ext_port=3389 status=DROPPED target=NONE\n\n[Cas 3 — Aucune règle de redirection déclarée]\nDNAT_REPORT id=ALONE ext_port=80 status=DROPPED target=NONE"
  },
  {
    "id": "pf3-c3-e2",
    "chapter": 3,
    "title": "Moteur d’Outbound NAT (SNAT) : Masquerade vs Adresses Virtuelles (VIP)",
    "level": "n2",
    "language": "analyse",
    "goal": "Translater les adresses sources privées des paquets sortants vers l’IP WAN principale ou une IP Virtuelle CARP/Statique.",
    "brief": "<p>pfSense propose 4 modes d'<strong>Outbound NAT</strong> (Automatique, Hybride, Manuel, Désactivé). Lorsqu'un paquet quitte le WAN, sa source privée est remplacée (SNAT / Masquerade).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br>\nPuis des paquets sortants :<br>\n<code>OUT_PKT id=&lt;nom&gt; src_ip=&lt;ip&gt; wan_ip=&lt;ip&gt;</code>.<br><br>\nRègles :<br>\n- Vérifier si <code>src_ip</code> appartient à un <code>src_subnet</code> déclaré.<br>\n- Si oui :<br>\n  - Si <code>nat_ip == 'WAN_INTERFACE'</code> : translater vers <code>wan_ip</code>.<br>\n  - Sinon : translater vers <code>nat_ip</code>.<br>\n  <code>status=SNAT_APPLIED new_src={ip_translatée}</code>.<br>\n- Si non :<br>\n  <code>status=NO_NAT new_src={src_ip}</code>.<br><br>\nPour chaque paquet, afficher :<br>\n<code>SNAT_REPORT id={id} original_src={src_ip} status={status} nat_src={new_src}</code></p>",
    "starter": "# Grille d'analyse (pf3-c3-e2) — Moteur d’Outbound NAT (SNAT) : Masquerade vs Adresses Virtuelles (VIP)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Translation vers IP virtuelle dédiée (VIP)]\n# Données : OUTBOUND_DEF src_subnet=172.16.0.0/16 nat_ip=198.51.100.50\n# Données : OUT_PKT id=P_VIP src_ip=172.16.10.2 wan_ip=198.51.100.1\nA_COMPLETER\n\n[Cas 2 — Plusieurs sous-réseaux internes distincts]\n# Données : OUTBOUND_DEF src_subnet=10.0.1.0/24 nat_ip=WAN_INTERFACE\n# Données : OUTBOUND_DEF src_subnet=10.0.2.0/24 nat_ip=198.51.100.20\n# Données : OUT_PKT id=A src_ip=10.0.1.50 wan_ip=198.51.100.1\n# Données : OUT_PKT id=B src_ip=10.0.2.80 wan_ip=198.51.100.1\nA_COMPLETER\n\n[Cas 3 — Sous-réseau ne correspondant à aucune règle]\n# Données : OUTBOUND_DEF src_subnet=192.168.10.0/24 nat_ip=WAN_INTERFACE\n# Données : OUT_PKT id=NOP src_ip=192.168.20.5 wan_ip=203.0.113.1\nA_COMPLETER\n",
    "hints": [
      "Stocker les réseaux avec la notation CIDR du réseau.",
      "Tester src_ip in net_obj pour appliquer la règle correspondante."
    ],
    "examples": [
      {
        "stdin": "OUTBOUND_DEF src_subnet=192.168.1.0/24 nat_ip=WAN_INTERFACE\nOUT_PKT id=P1 src_ip=192.168.1.15 wan_ip=203.0.113.100\nOUT_PKT id=P2 src_ip=10.0.0.5 wan_ip=203.0.113.100",
        "expected": "SNAT_REPORT id=P1 original_src=192.168.1.15 status=SNAT_APPLIED nat_src=203.0.113.100\nSNAT_REPORT id=P2 original_src=10.0.0.5 status=NO_NAT nat_src=10.0.0.5",
        "note": "192.168.1.15 translaté vers l’IP WAN 203.0.113.100 ; 10.0.0.5 non couvert conservé sans NAT."
      }
    ],
    "tests": [
      {
        "label": "Translation vers IP virtuelle dédiée (VIP)",
        "stdin": "cas:1",
        "expected": "SNAT_REPORT id=P_VIP original_src=172.16.10.2 status=SNAT_APPLIED nat_src=198.51.100.50"
      },
      {
        "label": "Plusieurs sous-réseaux internes distincts",
        "stdin": "cas:2",
        "expected": "SNAT_REPORT id=A original_src=10.0.1.50 status=SNAT_APPLIED nat_src=198.51.100.1\nSNAT_REPORT id=B original_src=10.0.2.80 status=SNAT_APPLIED nat_src=198.51.100.20"
      },
      {
        "label": "Sous-réseau ne correspondant à aucune règle",
        "stdin": "cas:3",
        "expected": "SNAT_REPORT id=NOP original_src=192.168.20.5 status=NO_NAT nat_src=192.168.20.5"
      }
    ],
    "solution": "[Exemple]\nSNAT_REPORT id=P1 original_src=192.168.1.15 status=SNAT_APPLIED nat_src=203.0.113.100\nSNAT_REPORT id=P2 original_src=10.0.0.5 status=NO_NAT nat_src=10.0.0.5\n\n[Cas 1 — Translation vers IP virtuelle dédiée (VIP)]\nSNAT_REPORT id=P_VIP original_src=172.16.10.2 status=SNAT_APPLIED nat_src=198.51.100.50\n\n[Cas 2 — Plusieurs sous-réseaux internes distincts]\nSNAT_REPORT id=A original_src=10.0.1.50 status=SNAT_APPLIED nat_src=198.51.100.1\nSNAT_REPORT id=B original_src=10.0.2.80 status=SNAT_APPLIED nat_src=198.51.100.20\n\n[Cas 3 — Sous-réseau ne correspondant à aucune règle]\nSNAT_REPORT id=NOP original_src=192.168.20.5 status=NO_NAT nat_src=192.168.20.5"
  },
  {
    "id": "pf3-c3-e3",
    "chapter": 3,
    "title": "Évaluateur de Gateway Groups Multi-WAN (Load Balancing vs Failover)",
    "level": "n3",
    "language": "analyse",
    "goal": "Aiguiller les paquets selon l’état de santé des passerelles WAN et la hiérarchie de niveaux (Tiers) dans un groupe pfSense.",
    "brief": "<p>pfSense gère les connexions Internet multiples via les <strong>Gateway Groups</strong> :<br>\n- Deux passerelles dans le <strong>même Tier</strong> (ex: Tier 1) : <strong>Load Balancing (répartition de charge Round-Robin)</strong>.<br>\n- Des passerelles dans des <strong>Tiers différents</strong> : <strong>Failover (basculement)</strong>. Le Tier 1 est utilisé en priorité ; s'il tombe (état <code>DOWN</code>), le Tier 2 prend automatiquement le relais.<br><br>\nAnalysez les paramètres du problème pour chaque cas..3&gt; state=&lt;ONLINE|DOWN&gt;</code>.<br><br>\nRègles d'élection de la passerelle active :<br>\n1. Trouver le plus petit niveau <code>tier</code> possédant au moins une passerelle <code>ONLINE</code>.<br>\n2. S'il existe plusieurs passerelles <code>ONLINE</code> dans ce meilleur tier, le mode est <code>LOAD_BALANCING</code> et la liste des passerelles actives est affichée triée par ordre alphabétique séparée par une virgule.<br>\n3. S'il n'y a qu'une seule passerelle <code>ONLINE</code> dans ce tier :<br>\n   - Si tier == 1 : <code>mode=PRIMARY_ACTIVE</code>.<br>\n   - Si tier &gt; 1 : <code>mode=FAILOVER_ACTIVE</code>.<br>\n4. Si aucune passerelle n'est <code>ONLINE</code> : <code>mode=TOTAL_OUTAGE selected=NONE</code>.<br><br>\nAfficher :<br>\n<code>MULTIWAN_DECISION tier={meilleur_tier} mode={mode} selected={passerelles}</code></p>",
    "starter": "# Grille d'analyse (pf3-c3-e3) — Évaluateur de Gateway Groups Multi-WAN (Load Balancing vs Failover)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux liaisons Tier 1 actives (Load Balancing)]\n# Données : GW_STATUS name=WAN_ORANGE tier=1 state=ONLINE\n# Données : GW_STATUS name=WAN_FREE tier=1 state=ONLINE\n# Données : GW_STATUS name=WAN_BACKUP tier=2 state=ONLINE\nA_COMPLETER\n\n[Cas 2 — Une seule liaison Tier 1 nominale active]\n# Données : GW_STATUS name=WAN_MAIN tier=1 state=ONLINE\n# Données : GW_STATUS name=WAN_SEC tier=2 state=ONLINE\nA_COMPLETER\n\n[Cas 3 — Panne complète de toutes les passerelles]\n# Données : GW_STATUS name=WAN1 tier=1 state=DOWN\n# Données : GW_STATUS name=WAN2 tier=2 state=DOWN\nA_COMPLETER\n",
    "hints": [
      "Grouper les passerelles ONLINE par tier.",
      "Prendre le plus petit tier non vide (1, 2, ou 3).",
      "Si plusieurs passerelles dans ce tier, trier leurs noms par ordre alphabétique."
    ],
    "examples": [
      {
        "stdin": "GW_STATUS name=WAN_FIBRE tier=1 state=DOWN\nGW_STATUS name=WAN_4G tier=2 state=ONLINE",
        "expected": "MULTIWAN_DECISION tier=2 mode=FAILOVER_ACTIVE selected=WAN_4G",
        "note": "Tier 1 en panne : basculement automatique vers le Tier 2 (WAN_4G)."
      }
    ],
    "tests": [
      {
        "label": "Deux liaisons Tier 1 actives (Load Balancing)",
        "stdin": "cas:1",
        "expected": "MULTIWAN_DECISION tier=1 mode=LOAD_BALANCING selected=WAN_FREE,WAN_ORANGE"
      },
      {
        "label": "Une seule liaison Tier 1 nominale active",
        "stdin": "cas:2",
        "expected": "MULTIWAN_DECISION tier=1 mode=PRIMARY_ACTIVE selected=WAN_MAIN"
      },
      {
        "label": "Panne complète de toutes les passerelles",
        "stdin": "cas:3",
        "expected": "MULTIWAN_DECISION tier=NONE mode=TOTAL_OUTAGE selected=NONE"
      }
    ],
    "solution": "[Exemple]\nMULTIWAN_DECISION tier=2 mode=FAILOVER_ACTIVE selected=WAN_4G\n\n[Cas 1 — Deux liaisons Tier 1 actives (Load Balancing)]\nMULTIWAN_DECISION tier=1 mode=LOAD_BALANCING selected=WAN_FREE,WAN_ORANGE\n\n[Cas 2 — Une seule liaison Tier 1 nominale active]\nMULTIWAN_DECISION tier=1 mode=PRIMARY_ACTIVE selected=WAN_MAIN\n\n[Cas 3 — Panne complète de toutes les passerelles]\nMULTIWAN_DECISION tier=NONE mode=TOTAL_OUTAGE selected=NONE"
  }
];
