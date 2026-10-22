'use strict';

module.exports = [
  {
    "id": "lan3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de priorité et élection du Root Bridge STP (Bridge ID)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler l'élection du commutateur racine (Root Bridge) dans une instance Spanning Tree 802.1D / PVST+.",
    "brief": "<p>Dans les architectures de commutation Ethernet, le protocole <strong>Spanning Tree (STP)</strong> élimine les boucles de couche 2 en élisant un commutateur racine unique (<strong>Root Bridge</strong>) par domaine de diffusion / VLAN.<br><br>\nChaque commutateur est identifié par son <strong>Bridge ID (BID)</strong> composé de :<br>\n- <strong>Bridge Priority :</strong> valeur de base multiple de 4096 (ex: 32768, 4096, 0).<br>\n- <strong>System ID Extension :</strong> le numéro de VLAN (ex: VLAN 10).<br>\n- <strong>Adresse MAC :</strong> identifiant physique unique du commutateur.<br>\nLa priorité totale est <code>total_priority = priority + vlan</code>.<br><br>\nRègles d'élection du Root Bridge :<br>\n1. Le commutateur ayant la plus petite <code>total_priority</code> est élu Root Bridge.<br>\n2. En cas d'égalité sur la priorité totale, le commutateur ayant la plus petite adresse MAC (ordre lexicographique de l'adresse en minuscules normalisée) l'emporte.<br><br>\nl’étude de cas comporte dans l’énoncé du cas des déclarations de commutateurs pour un VLAN donné :<br>\n<code>BRIDGE name=&lt;nom&gt; vlan=&lt;int&gt; priority=&lt;int&gt; mac=&lt;mac_format_libre&gt;</code><br><br>\nPour chaque commutateur (triés par nom alphabétique), afficher :<br>\n<code>STP_BRIDGE name={name} vlan={vlan} total_prio={total_priority} mac={mac_norm} role={ROOT|NON_ROOT}</code><br>\nPuis sur une ligne finale :<br>\n<code>ROOT_WINNER name={root_name} total_prio={root_prio} mac={root_mac}</code></p>",
    "starter": "# Grille d'analyse (lan3-c1-e1) — Calculateur de priorité et élection du Root Bridge STP (Bridge ID)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Départage sur adresse MAC en cas d'égalité parfaite de priorité]\n# Données : BRIDGE name=SW-A vlan=1 priority=32768 mac=00:50:56:00:00:02\n# Données : BRIDGE name=SW-B vlan=1 priority=32768 mac=00:50:56:00:00:01\nA_COMPLETER\n\n[Cas 2 — Priorité racine explicite configurée à 0]\n# Données : BRIDGE name=CORE_PRIMARY vlan=100 priority=0 mac=02:00:00:aa:bb:cc\n# Données : BRIDGE name=CORE_SECONDARY vlan=100 priority=4096 mac=02:00:00:11:22:33\nA_COMPLETER\n\n[Cas 3 — Formats de MAC avec tirets ou points normalisés]\n# Données : BRIDGE name=SW1 vlan=20 priority=32768 mac=00-1B-44-11-3A-B7\n# Données : BRIDGE name=SW2 vlan=20 priority=32768 mac=001b.4411.3ab6\nA_COMPLETER\n",
    "hints": [
      "Normaliser la MAC en minuscules avec des deux-points (ex: 00:1a:2b:3c:4d:5e) ou format comparable.",
      "Calculer total_prio = priority + vlan.",
      "Comparer le tuple (total_prio, mac_norm)."
    ],
    "examples": [
      {
        "stdin": "BRIDGE name=SW-CORE1 vlan=10 priority=32768 mac=00:11:22:33:44:55\nBRIDGE name=SW-CORE2 vlan=10 priority=4096 mac=00:aa:bb:cc:dd:ee\nBRIDGE name=SW-ACCESS1 vlan=10 priority=32768 mac=00:11:22:11:22:33",
        "expected": "STP_BRIDGE name=SW-ACCESS1 vlan=10 total_prio=32778 mac=00:11:22:11:22:33 role=NON_ROOT\nSTP_BRIDGE name=SW-CORE1 vlan=10 total_prio=32778 mac=00:11:22:33:44:55 role=NON_ROOT\nSTP_BRIDGE name=SW-CORE2 vlan=10 total_prio=4106 mac=00:aa:bb:cc:dd:ee role=ROOT\nROOT_WINNER name=SW-CORE2 total_prio=4106 mac=00:aa:bb:cc:dd:ee",
        "note": "SW-CORE2 a la plus faible priorité (4096 + 10 = 4106) et devient Root Bridge."
      }
    ],
    "tests": [
      {
        "label": "Départage sur adresse MAC en cas d'égalité parfaite de priorité",
        "stdin": "cas:1",
        "expected": "STP_BRIDGE name=SW-A vlan=1 total_prio=32769 mac=00:50:56:00:00:02 role=NON_ROOT\nSTP_BRIDGE name=SW-B vlan=1 total_prio=32769 mac=00:50:56:00:00:01 role=ROOT\nROOT_WINNER name=SW-B total_prio=32769 mac=00:50:56:00:00:01"
      },
      {
        "label": "Priorité racine explicite configurée à 0",
        "stdin": "cas:2",
        "expected": "STP_BRIDGE name=CORE_PRIMARY vlan=100 total_prio=100 mac=02:00:00:aa:bb:cc role=ROOT\nSTP_BRIDGE name=CORE_SECONDARY vlan=100 total_prio=4196 mac=02:00:00:11:22:33 role=NON_ROOT\nROOT_WINNER name=CORE_PRIMARY total_prio=100 mac=02:00:00:aa:bb:cc"
      },
      {
        "label": "Formats de MAC avec tirets ou points normalisés",
        "stdin": "cas:3",
        "expected": "STP_BRIDGE name=SW1 vlan=20 total_prio=32788 mac=00:1b:44:11:3a:b7 role=NON_ROOT\nSTP_BRIDGE name=SW2 vlan=20 total_prio=32788 mac=00:1b:44:11:3a:b6 role=ROOT\nROOT_WINNER name=SW2 total_prio=32788 mac=00:1b:44:11:3a:b6"
      }
    ],
    "solution": "[Exemple]\nSTP_BRIDGE name=SW-ACCESS1 vlan=10 total_prio=32778 mac=00:11:22:11:22:33 role=NON_ROOT\nSTP_BRIDGE name=SW-CORE1 vlan=10 total_prio=32778 mac=00:11:22:33:44:55 role=NON_ROOT\nSTP_BRIDGE name=SW-CORE2 vlan=10 total_prio=4106 mac=00:aa:bb:cc:dd:ee role=ROOT\nROOT_WINNER name=SW-CORE2 total_prio=4106 mac=00:aa:bb:cc:dd:ee\n\n[Cas 1 — Départage sur adresse MAC en cas d'égalité parfaite de priorité]\nSTP_BRIDGE name=SW-A vlan=1 total_prio=32769 mac=00:50:56:00:00:02 role=NON_ROOT\nSTP_BRIDGE name=SW-B vlan=1 total_prio=32769 mac=00:50:56:00:00:01 role=ROOT\nROOT_WINNER name=SW-B total_prio=32769 mac=00:50:56:00:00:01\n\n[Cas 2 — Priorité racine explicite configurée à 0]\nSTP_BRIDGE name=CORE_PRIMARY vlan=100 total_prio=100 mac=02:00:00:aa:bb:cc role=ROOT\nSTP_BRIDGE name=CORE_SECONDARY vlan=100 total_prio=4196 mac=02:00:00:11:22:33 role=NON_ROOT\nROOT_WINNER name=CORE_PRIMARY total_prio=100 mac=02:00:00:aa:bb:cc\n\n[Cas 3 — Formats de MAC avec tirets ou points normalisés]\nSTP_BRIDGE name=SW1 vlan=20 total_prio=32788 mac=00:1b:44:11:3a:b7 role=NON_ROOT\nSTP_BRIDGE name=SW2 vlan=20 total_prio=32788 mac=00:1b:44:11:3a:b6 role=ROOT\nROOT_WINNER name=SW2 total_prio=32788 mac=00:1b:44:11:3a:b6"
  },
  {
    "id": "lan3-c1-e2",
    "chapter": 1,
    "title": "Simulateur de calcul de coût et sélection du Root Port STP",
    "level": "n2",
    "language": "analyse",
    "goal": "Appliquer les règles de départage STP pour élire le port racine (Root Port) sur un commutateur non-racine.",
    "brief": "<p>Sur chaque commutateur non-racine, un seul port est élu <strong>Root Port (RP)</strong> : c'est le port offrant le chemin le plus court vers le Root Bridge.<br><br>\nAnalysez les paramètres du problème pour chaque cas. <strong>Le plus faible coût de chemin (Lowest Path Cost) :</strong> <code>path_cost</code> minimal.<br>\n2. <strong>En cas d'égalité :</strong> Le plus faible Bridge ID du commutateur voisin émetteur (<code>sender_bid_prio</code>).<br>\n3. <strong>En cas d'égalité :</strong> Le plus faible Port ID de l'émetteur (<code>sender_port_id</code>).<br>\n4. <strong>En cas d'égalité :</strong> Le plus petit nom de port local dans l'ordre alphabétique (<code>port</code>).<br><br>\nAfficher d'abord l'évaluation de chaque port (triés par nom de port croissant) :<br>\n<code>PORT_EVAL port={port} cost={path_cost} status={ROOT_PORT|ALTERNATE_PORT}</code><br>\nPuis la ligne de synthèse finale :<br>\n<code>SELECTED_ROOT_PORT port={winner_port} total_cost={winner_cost}</code></p>",
    "starter": "# Grille d'analyse (lan3-c1-e2) — Simulateur de calcul de coût et sélection du Root Port STP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Départage sur le Bridge ID émetteur (sender_bid_prio)]\n# Données : ROOT_PATH port=Fa0/1 path_cost=19 sender_bid_prio=32768 sender_port_id=128.1\n# Données : ROOT_PATH port=Fa0/2 path_cost=19 sender_bid_prio=4096 sender_port_id=128.1\nA_COMPLETER\n\n[Cas 2 — Départage sur le Port ID de l'émetteur distant (sender_port_id)]\n# Données : ROOT_PATH port=Te1/1 path_cost=2 sender_bid_prio=4096 sender_port_id=128.2\n# Données : ROOT_PATH port=Te1/2 path_cost=2 sender_bid_prio=4096 sender_port_id=128.1\nA_COMPLETER\n\n[Cas 3 — Départage final sur le nom du port local]\n# Données : ROOT_PATH port=Eth2 path_cost=10 sender_bid_prio=1000 sender_port_id=1\n# Données : ROOT_PATH port=Eth1 path_cost=10 sender_bid_prio=1000 sender_port_id=1\nA_COMPLETER\n",
    "hints": [
      "Utiliser une clé de tri tuple : (path_cost, sender_bid_prio, sender_port_id, port).",
      "Le premier élément du tri est l'élu Root Port."
    ],
    "examples": [
      {
        "stdin": "ROOT_PATH port=Gi0/1 path_cost=19 sender_bid_prio=32768 sender_port_id=128.1\nROOT_PATH port=Gi0/2 path_cost=4 sender_bid_prio=32768 sender_port_id=128.2\nROOT_PATH port=Gi0/3 path_cost=19 sender_bid_prio=4096 sender_port_id=128.1",
        "expected": "PORT_EVAL port=Gi0/1 cost=19 status=ALTERNATE_PORT\nPORT_EVAL port=Gi0/2 cost=4 status=ROOT_PORT\nPORT_EVAL port=Gi0/3 cost=19 status=ALTERNATE_PORT\nSELECTED_ROOT_PORT port=Gi0/2 total_cost=4",
        "note": "Gi0/2 a le coût de chemin le plus bas (4 vs 19) et est élu Root Port."
      }
    ],
    "tests": [
      {
        "label": "Départage sur le Bridge ID émetteur (sender_bid_prio)",
        "stdin": "cas:1",
        "expected": "PORT_EVAL port=Fa0/1 cost=19 status=ALTERNATE_PORT\nPORT_EVAL port=Fa0/2 cost=19 status=ROOT_PORT\nSELECTED_ROOT_PORT port=Fa0/2 total_cost=19"
      },
      {
        "label": "Départage sur le Port ID de l'émetteur distant (sender_port_id)",
        "stdin": "cas:2",
        "expected": "PORT_EVAL port=Te1/1 cost=2 status=ALTERNATE_PORT\nPORT_EVAL port=Te1/2 cost=2 status=ROOT_PORT\nSELECTED_ROOT_PORT port=Te1/2 total_cost=2"
      },
      {
        "label": "Départage final sur le nom du port local",
        "stdin": "cas:3",
        "expected": "PORT_EVAL port=Eth1 cost=10 status=ROOT_PORT\nPORT_EVAL port=Eth2 cost=10 status=ALTERNATE_PORT\nSELECTED_ROOT_PORT port=Eth1 total_cost=10"
      }
    ],
    "solution": "[Exemple]\nPORT_EVAL port=Gi0/1 cost=19 status=ALTERNATE_PORT\nPORT_EVAL port=Gi0/2 cost=4 status=ROOT_PORT\nPORT_EVAL port=Gi0/3 cost=19 status=ALTERNATE_PORT\nSELECTED_ROOT_PORT port=Gi0/2 total_cost=4\n\n[Cas 1 — Départage sur le Bridge ID émetteur (sender_bid_prio)]\nPORT_EVAL port=Fa0/1 cost=19 status=ALTERNATE_PORT\nPORT_EVAL port=Fa0/2 cost=19 status=ROOT_PORT\nSELECTED_ROOT_PORT port=Fa0/2 total_cost=19\n\n[Cas 2 — Départage sur le Port ID de l'émetteur distant (sender_port_id)]\nPORT_EVAL port=Te1/1 cost=2 status=ALTERNATE_PORT\nPORT_EVAL port=Te1/2 cost=2 status=ROOT_PORT\nSELECTED_ROOT_PORT port=Te1/2 total_cost=2\n\n[Cas 3 — Départage final sur le nom du port local]\nPORT_EVAL port=Eth1 cost=10 status=ROOT_PORT\nPORT_EVAL port=Eth2 cost=10 status=ALTERNATE_PORT\nSELECTED_ROOT_PORT port=Eth1 total_cost=10"
  },
  {
    "id": "lan3-c1-e3",
    "chapter": 1,
    "title": "Auditeur de protection Spanning Tree (BPDU Guard, Root Guard & Loop Guard)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler les réactions des mécanismes de durcissement STP face aux anomalies topologiques.",
    "brief": "<p>Pour protéger la topologie Spanning Tree contre les attaques et les erreurs de câblage, les commutateurs d'entreprise disposent de fonctionnalités de protection avancées :<br>\n- <strong>BPDU Guard :</strong> Si une BPDU arrive sur un port d'accès configuré avec PortFast, le port est immédiatement désactivé par sécurité (<code>ERR_DISABLE</code>).<br>\n- <strong>Root Guard :</strong> Si une BPDU supérieure revendiquant le rôle de racine arrive sur un port désigné, le port passe en état incohérent (<code>ROOT_INCONSISTENT</code>) et bloque le trafic.<br>\n- <strong>Loop Guard :</strong> Si les BPDUs cessent d'arriver sur un port racine ou alternatif sans transition normale, le port passe en <code>LOOP_INCONSISTENT</code> pour éviter une boucle unidirectionnelle.<br><br>\nAnalysez les paramètres du problème pour chaque cas. <strong>Si type == 'BPDU_RECEIVED' :</strong><br>\n   - Si <code>bpdu_guard == 'YES'</code> : <code>status=ERR_DISABLE action=PORT_SHUTDOWN reason=BPDU_GUARD_VIOLATION</code><br>\n   - Sinon : <code>status=FORWARDING action=NORMAL_PROCESSING reason=BPDU_ACCEPTED</code><br>\n2. <strong>Si type == 'SUPERIOR_BPDU' :</strong><br>\n   - Si <code>root_guard == 'YES'</code> : <code>status=ROOT_INCONSISTENT action=BLOCK_TRAFFIC reason=ROOT_GUARD_TRIGGERED</code><br>\n   - Sinon : <code>status=RECONFIGURING action=ELECT_NEW_ROOT reason=ROOT_MIGRATION</code><br>\n3. <strong>Si type == 'BPDU_TIMEOUT' :</strong><br>\n   - Si <code>loop_guard == 'YES'</code> : <code>status=LOOP_INCONSISTENT action=BLOCK_UNIDIRECTIONAL reason=LOOP_GUARD_TRIGGERED</code><br>\n   - Sinon : <code>status=TRANSITION_FORWARDING action=STP_AGED_OUT reason=POTENTIAL_LOOP_RISK</code><br><br>\nPour chaque événement, afficher :<br>\n<code>STP_GUARD_REPORT port={port} event={type} status={status} action={action} reason={reason}</code></p>",
    "starter": "# Grille d'analyse (lan3-c1-e3) — Auditeur de protection Spanning Tree (BPDU Guard, Root Guard & Loop Guard)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Événements sur ports sans protection activée]\n# Données : PORT name=Fa0/10 bpdu_guard=NO root_guard=NO loop_guard=NO\n# Données : EVENT port=Fa0/10 type=BPDU_RECEIVED\n# Données : EVENT port=Fa0/10 type=SUPERIOR_BPDU\n# Données : EVENT port=Fa0/10 type=BPDU_TIMEOUT\nA_COMPLETER\n\n[Cas 2 — Combinaison de protections multiples sur le même équipement]\n# Données : PORT name=Uplink1 bpdu_guard=NO root_guard=YES loop_guard=YES\n# Données : EVENT port=Uplink1 type=SUPERIOR_BPDU\nA_COMPLETER\n\n[Cas 3 — Port utilisateur violant la politique PortFast avec BPDU Guard]\n# Données : PORT name=UserPort1 bpdu_guard=YES root_guard=NO loop_guard=NO\n# Données : EVENT port=UserPort1 type=BPDU_RECEIVED\nA_COMPLETER\n",
    "hints": [
      "Gérer un dictionnaire de configuration indexé par le nom du port.",
      "Tester les cas de BPDU_RECEIVED, SUPERIOR_BPDU et BPDU_TIMEOUT selon les flags."
    ],
    "examples": [
      {
        "stdin": "PORT name=Gi0/1 bpdu_guard=YES root_guard=NO loop_guard=NO\nPORT name=Gi0/2 bpdu_guard=NO root_guard=YES loop_guard=NO\nPORT name=Gi0/3 bpdu_guard=NO root_guard=NO loop_guard=YES\nEVENT port=Gi0/1 type=BPDU_RECEIVED\nEVENT port=Gi0/2 type=SUPERIOR_BPDU\nEVENT port=Gi0/3 type=BPDU_TIMEOUT",
        "expected": "STP_GUARD_REPORT port=Gi0/1 event=BPDU_RECEIVED status=ERR_DISABLE action=PORT_SHUTDOWN reason=BPDU_GUARD_VIOLATION\nSTP_GUARD_REPORT port=Gi0/2 event=SUPERIOR_BPDU status=ROOT_INCONSISTENT action=BLOCK_TRAFFIC reason=ROOT_GUARD_TRIGGERED\nSTP_GUARD_REPORT port=Gi0/3 event=BPDU_TIMEOUT status=LOOP_INCONSISTENT action=BLOCK_UNIDIRECTIONAL reason=LOOP_GUARD_TRIGGERED",
        "note": "Gi0/1 est désactivé par BPDU Guard ; Gi0/2 bloque la tentative d'usurpation du Root ; Gi0/3 prévient une boucle unidirectionnelle."
      }
    ],
    "tests": [
      {
        "label": "Événements sur ports sans protection activée",
        "stdin": "cas:1",
        "expected": "STP_GUARD_REPORT port=Fa0/10 event=BPDU_RECEIVED status=FORWARDING action=NORMAL_PROCESSING reason=BPDU_ACCEPTED\nSTP_GUARD_REPORT port=Fa0/10 event=SUPERIOR_BPDU status=RECONFIGURING action=ELECT_NEW_ROOT reason=ROOT_MIGRATION\nSTP_GUARD_REPORT port=Fa0/10 event=BPDU_TIMEOUT status=TRANSITION_FORWARDING action=STP_AGED_OUT reason=POTENTIAL_LOOP_RISK"
      },
      {
        "label": "Combinaison de protections multiples sur le même équipement",
        "stdin": "cas:2",
        "expected": "STP_GUARD_REPORT port=Uplink1 event=SUPERIOR_BPDU status=ROOT_INCONSISTENT action=BLOCK_TRAFFIC reason=ROOT_GUARD_TRIGGERED"
      },
      {
        "label": "Port utilisateur violant la politique PortFast avec BPDU Guard",
        "stdin": "cas:3",
        "expected": "STP_GUARD_REPORT port=UserPort1 event=BPDU_RECEIVED status=ERR_DISABLE action=PORT_SHUTDOWN reason=BPDU_GUARD_VIOLATION"
      }
    ],
    "solution": "[Exemple]\nSTP_GUARD_REPORT port=Gi0/1 event=BPDU_RECEIVED status=ERR_DISABLE action=PORT_SHUTDOWN reason=BPDU_GUARD_VIOLATION\nSTP_GUARD_REPORT port=Gi0/2 event=SUPERIOR_BPDU status=ROOT_INCONSISTENT action=BLOCK_TRAFFIC reason=ROOT_GUARD_TRIGGERED\nSTP_GUARD_REPORT port=Gi0/3 event=BPDU_TIMEOUT status=LOOP_INCONSISTENT action=BLOCK_UNIDIRECTIONAL reason=LOOP_GUARD_TRIGGERED\n\n[Cas 1 — Événements sur ports sans protection activée]\nSTP_GUARD_REPORT port=Fa0/10 event=BPDU_RECEIVED status=FORWARDING action=NORMAL_PROCESSING reason=BPDU_ACCEPTED\nSTP_GUARD_REPORT port=Fa0/10 event=SUPERIOR_BPDU status=RECONFIGURING action=ELECT_NEW_ROOT reason=ROOT_MIGRATION\nSTP_GUARD_REPORT port=Fa0/10 event=BPDU_TIMEOUT status=TRANSITION_FORWARDING action=STP_AGED_OUT reason=POTENTIAL_LOOP_RISK\n\n[Cas 2 — Combinaison de protections multiples sur le même équipement]\nSTP_GUARD_REPORT port=Uplink1 event=SUPERIOR_BPDU status=ROOT_INCONSISTENT action=BLOCK_TRAFFIC reason=ROOT_GUARD_TRIGGERED\n\n[Cas 3 — Port utilisateur violant la politique PortFast avec BPDU Guard]\nSTP_GUARD_REPORT port=UserPort1 event=BPDU_RECEIVED status=ERR_DISABLE action=PORT_SHUTDOWN reason=BPDU_GUARD_VIOLATION"
  }
];
