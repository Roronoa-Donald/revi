'use strict';

module.exports = [
  {
    "id": "lan3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de priorité et élection du Root Bridge STP (Bridge ID)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler l'élection du commutateur racine (Root Bridge) dans une instance Spanning Tree 802.1D / PVST+.",
    "brief": "<p>Dans les architectures de commutation Ethernet, le protocole <strong>Spanning Tree (STP)</strong> élimine les boucles de couche 2 en élisant un commutateur racine unique (<strong>Root Bridge</strong>) par domaine de diffusion / VLAN.<br><br>\nChaque commutateur est identifié par son <strong>Bridge ID (BID)</strong> composé de :<br>\n- <strong>Bridge Priority :</strong> valeur de base multiple de 4096 (ex: 32768, 4096, 0).<br>\n- <strong>System ID Extension :</strong> le numéro de VLAN (ex: VLAN 10).<br>\n- <strong>Adresse MAC :</strong> identifiant physique unique du commutateur.<br>\nLa priorité totale est <code>total_priority = priority + vlan</code>.<br><br>\nRègles d'élection du Root Bridge :<br>\n1. Le commutateur ayant la plus petite <code>total_priority</code> est élu Root Bridge.<br>\n2. En cas d'égalité sur la priorité totale, le commutateur ayant la plus petite adresse MAC (ordre lexicographique de l'adresse en minuscules normalisée) l'emporte.<br><br>\nLe script lit dans l’énoncé du cas des déclarations de commutateurs pour un VLAN donné :<br>\n<code>BRIDGE name=&lt;nom&gt; vlan=&lt;int&gt; priority=&lt;int&gt; mac=&lt;mac_format_libre&gt;</code><br><br>\nPour chaque commutateur (triés par nom alphabétique), afficher :<br>\n<code>STP_BRIDGE name={name} vlan={vlan} total_prio={total_priority} mac={mac_norm} role={ROOT|NON_ROOT}</code><br>\nPuis sur une ligne finale :<br>\n<code>ROOT_WINNER name={root_name} total_prio={root_prio} mac={root_mac}</code></p>",
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
  },
  {
    "id": "lan3-c2-e1",
    "chapter": 2,
    "title": "Négociateur d'agrégation EtherChannel (LACP 802.3ad vs PAgP vs ON)",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer si un lien EtherChannel s'établit entre deux commutateurs selon les protocoles et modes configurés.",
    "brief": "<p>L'agrégation de liens (<strong>EtherChannel</strong>) regroupe jusqu'à 8 liaisons Ethernet physiques en un seul lien logique (Port-Channel) pour multiplier la bande passante et assurer la tolérance aux pannes.<br><br>\nLes protocoles de négociation et leurs modes associés :<br>\n- <strong>LACP (IEEE 802.3ad / 802.1AX) :</strong> modes <code>ACTIVE</code> (sollicite activement) et <code>PASSIVE</code> (attend les trames LACP).<br>\n  - <code>ACTIVE + ACTIVE</code> ou <code>ACTIVE + PASSIVE</code> &rarr; <code>CHANNEL_UP (LACP)</code>.<br>\n  - <code>PASSIVE + PASSIVE</code> &rarr; <code>NO_CHANNEL (PASSIVE_MISMATCH)</code>.<br>\n- <strong>PAgP (Cisco propriétaire) :</strong> modes <code>DESIRABLE</code> (sollicite) et <code>AUTO</code> (attend).<br>\n  - <code>DESIRABLE + DESIRABLE</code> ou <code>DESIRABLE + AUTO</code> &rarr; <code>CHANNEL_UP (PAGP)</code>.<br>\n  - <code>AUTO + AUTO</code> &rarr; <code>NO_CHANNEL (AUTO_MISMATCH)</code>.<br>\n- <strong>Statique (Mode ON forcé sans protocole) :</strong> mode <code>ON</code>.<br>\n  - <code>ON + ON</code> &rarr; <code>CHANNEL_UP (STATIC)</code>.<br>\n  - <code>ON + (LACP ou PAgP)</code> &rarr; <code>ERROR_MISMATCH</code>.<br>\n- <strong>Mélange de protocoles incompatibles (ex: LACP + PAgP) :</strong> &rarr; <code>ERROR_PROTOCOL_INCOMPATIBLE</code>.<br><br>\nLe script lit dans l’énoncé du cas des scénarios de négociation :<br>\n<code>NEGOTIATION id=&lt;nom&gt; side_a_proto=&lt;LACP|PAGP|STATIC&gt; side_a_mode=&lt;ACTIVE|PASSIVE|DESIRABLE|AUTO|ON&gt; side_b_proto=&lt;LACP|PAGP|STATIC&gt; side_b_mode=&lt;ACTIVE|PASSIVE|DESIRABLE|AUTO|ON&gt;</code><br><br>\nPour chaque négociation, afficher :<br>\n<code>ETHERCHANNEL_EVAL id={id} status={status} proto={matched_proto} detail={detail}</code></p>",
    "starter": "# Grille d'analyse (lan3-c2-e1) — Négociateur d'agrégation EtherChannel (LACP 802.3ad vs PAgP vs ON)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode statique ON parfait vs décalage de mode]\n# Données : NEGOTIATION id=ST1 side_a_proto=STATIC side_a_mode=ON side_b_proto=STATIC side_b_mode=ON\n# Données : NEGOTIATION id=ST2 side_a_proto=STATIC side_a_mode=ON side_b_proto=LACP side_b_mode=ACTIVE\nA_COMPLETER\n\n[Cas 2 — PAgP symétrique et asymétrique]\n# Données : NEGOTIATION id=PG1 side_a_proto=PAGP side_a_mode=DESIRABLE side_b_proto=PAGP side_b_mode=DESIRABLE\n# Données : NEGOTIATION id=PG2 side_a_proto=PAGP side_a_mode=AUTO side_b_proto=PAGP side_b_mode=AUTO\nA_COMPLETER\n\n[Cas 3 — LACP symétrique ACTIVE des deux côtés]\n# Données : NEGOTIATION id=LAC1 side_a_proto=LACP side_a_mode=ACTIVE side_b_proto=LACP side_b_mode=ACTIVE\nA_COMPLETER\n",
    "hints": [
      "Vérifier d'abord si side_a_proto == side_b_proto.",
      "Si LACP : formé sauf si les deux côtés sont PASSIVE.",
      "Si PAGP : formé sauf si les deux côtés sont AUTO.",
      "Si STATIC : formé uniquement si les deux côtés sont ON."
    ],
    "examples": [
      {
        "stdin": "NEGOTIATION id=LINK1 side_a_proto=LACP side_a_mode=ACTIVE side_b_proto=LACP side_b_mode=PASSIVE\nNEGOTIATION id=LINK2 side_a_proto=LACP side_a_mode=PASSIVE side_b_proto=LACP side_b_mode=PASSIVE\nNEGOTIATION id=LINK3 side_a_proto=PAGP side_a_mode=DESIRABLE side_b_proto=PAGP side_b_mode=AUTO\nNEGOTIATION id=LINK4 side_a_proto=LACP side_a_mode=ACTIVE side_b_proto=PAGP side_b_mode=DESIRABLE",
        "expected": "ETHERCHANNEL_EVAL id=LINK1 status=CHANNEL_UP proto=LACP detail=ACTIVE_PASSIVE_MATCH\nETHERCHANNEL_EVAL id=LINK2 status=NO_CHANNEL proto=LACP detail=PASSIVE_MISMATCH\nETHERCHANNEL_EVAL id=LINK3 status=CHANNEL_UP proto=PAGP detail=DESIRABLE_AUTO_MATCH\nETHERCHANNEL_EVAL id=LINK4 status=ERROR proto=NONE detail=PROTOCOL_INCOMPATIBLE",
        "note": "LINK1 forme un bundle LACP ; LINK2 reste inactif car les deux sont passifs ; LINK4 tente de mélanger deux protocoles incompatibles."
      }
    ],
    "tests": [
      {
        "label": "Mode statique ON parfait vs décalage de mode",
        "stdin": "cas:1",
        "expected": "ETHERCHANNEL_EVAL id=ST1 status=CHANNEL_UP proto=STATIC detail=STATIC_ON_MATCH\nETHERCHANNEL_EVAL id=ST2 status=ERROR proto=NONE detail=PROTOCOL_INCOMPATIBLE"
      },
      {
        "label": "PAgP symétrique et asymétrique",
        "stdin": "cas:2",
        "expected": "ETHERCHANNEL_EVAL id=PG1 status=CHANNEL_UP proto=PAGP detail=DESIRABLE_MATCH\nETHERCHANNEL_EVAL id=PG2 status=NO_CHANNEL proto=PAGP detail=AUTO_MISMATCH"
      },
      {
        "label": "LACP symétrique ACTIVE des deux côtés",
        "stdin": "cas:3",
        "expected": "ETHERCHANNEL_EVAL id=LAC1 status=CHANNEL_UP proto=LACP detail=ACTIVE_MATCH"
      }
    ],
    "solution": "[Exemple]\nETHERCHANNEL_EVAL id=LINK1 status=CHANNEL_UP proto=LACP detail=ACTIVE_PASSIVE_MATCH\nETHERCHANNEL_EVAL id=LINK2 status=NO_CHANNEL proto=LACP detail=PASSIVE_MISMATCH\nETHERCHANNEL_EVAL id=LINK3 status=CHANNEL_UP proto=PAGP detail=DESIRABLE_AUTO_MATCH\nETHERCHANNEL_EVAL id=LINK4 status=ERROR proto=NONE detail=PROTOCOL_INCOMPATIBLE\n\n[Cas 1 — Mode statique ON parfait vs décalage de mode]\nETHERCHANNEL_EVAL id=ST1 status=CHANNEL_UP proto=STATIC detail=STATIC_ON_MATCH\nETHERCHANNEL_EVAL id=ST2 status=ERROR proto=NONE detail=PROTOCOL_INCOMPATIBLE\n\n[Cas 2 — PAgP symétrique et asymétrique]\nETHERCHANNEL_EVAL id=PG1 status=CHANNEL_UP proto=PAGP detail=DESIRABLE_MATCH\nETHERCHANNEL_EVAL id=PG2 status=NO_CHANNEL proto=PAGP detail=AUTO_MISMATCH\n\n[Cas 3 — LACP symétrique ACTIVE des deux côtés]\nETHERCHANNEL_EVAL id=LAC1 status=CHANNEL_UP proto=LACP detail=ACTIVE_MATCH"
  },
  {
    "id": "lan3-c2-e2",
    "chapter": 2,
    "title": "Simulateur de répartition de charge EtherChannel (Algorithme de Hachage)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer le port physique d'émission sélectionné par la fonction de hachage du commutateur.",
    "brief": "<p>Un commutateur ne distribue pas les paquets en Round-Robin simple sur un EtherChannel car cela provoquerait des réordonnancements de paquets TCP néfastes. Il applique une fonction mathématique de <strong>hachage (Load Balancing Hash)</strong> basée sur les en-têtes réseau.<br><br>\nAnalysez les paramètres du problème pour chaque cas...&gt; method=&lt;src-mac|dst-mac|src-dst-mac|src-dst-ip|src-dst-port&gt;</code><br>\nPuis des paquets en transit :<br>\n<code>PACKET id=&lt;nom&gt; src_mac=&lt;mac&gt; dst_mac=&lt;mac&gt; src_ip=&lt;ip&gt; dst_ip=&lt;ip&gt; src_port=&lt;int&gt; dst_port=&lt;int&gt;</code><br><br>\nAlgorithme de calcul de l'index de port (<code>k = len(ports)</code>) :<br>\n- <strong>src-mac :</strong> <code>hash_val = dernier_octet_hexa(src_mac)</code> &rarr; <code>idx = hash_val % k</code>.<br>\n- <strong>dst-mac :</strong> <code>hash_val = dernier_octet_hexa(dst_mac)</code> &rarr; <code>idx = hash_val % k</code>.<br>\n- <strong>src-dst-mac :</strong> <code>hash_val = dernier_octet_hexa(src_mac) ^ dernier_octet_hexa(dst_mac)</code> &rarr; <code>idx = hash_val % k</code>.<br>\n- <strong>src-dst-ip :</strong> <code>hash_val = dernier_octet_dec(src_ip) ^ dernier_octet_dec(dst_ip)</code> &rarr; <code>idx = hash_val % k</code>.<br>\n- <strong>src-dst-port :</strong> <code>hash_val = src_port ^ dst_port</code> &rarr; <code>idx = hash_val % k</code>.<br><br>\nPour chaque paquet, afficher :<br>\n<code>LB_REPORT id={id} bundle={name} hash_idx={idx} port={ports[idx]}</code></p>",
    "starter": "# Grille d'analyse (lan3-c2-e2) — Simulateur de répartition de charge EtherChannel (Algorithme de Hachage)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Hachage par src-dst-port avec 2 ports membres]\n# Données : BUNDLE name=Po2 ports=Te1/1,Te1/2 method=src-dst-port\n# Données : PACKET id=TCP_FLOW src_mac=00:00:00:00:00:01 dst_mac=00:00:00:00:00:02 src_ip=1.1.1.1 dst_ip=2.2.2.2 src_port=40001 dst_port=443\nA_COMPLETER\n\n[Cas 2 — Hachage par src-dst-mac avec conversion hexadécimale]\n# Données : BUNDLE name=Po10 ports=Eth1,Eth2,Eth3 method=src-dst-mac\n# Données : PACKET id=MCAST src_mac=00:11:22:33:44:0a dst_mac=00:11:22:33:44:0f src_ip=10.0.0.1 dst_ip=10.0.0.2 src_port=123 dst_port=123\nA_COMPLETER\n\n[Cas 3 — Hachage par dst-mac unique]\n# Données : BUNDLE name=PoSingle ports=Fa0/1,Fa0/2,Fa0/3,Fa0/4 method=dst-mac\n# Données : PACKET id=P1 src_mac=00:00:00:00:00:00 dst_mac=00:00:00:00:00:07 src_ip=0.0.0.0 dst_ip=0.0.0.0 src_port=0 dst_port=0\nA_COMPLETER\n",
    "hints": [
      "Dans une agrégation de liens (LACP / EtherChannel), la distribution de charge s’appuie sur une fonction de hachage des adresses MAC ou IP.",
      "Appliquez l’opération de hachage pour déterminer sur quel port physique de l’équipe de cartes la trame est transmise."
    ],
    "examples": [
      {
        "stdin": "BUNDLE name=Po1 ports=Gi0/1,Gi0/2,Gi0/3,Gi0/4 method=src-dst-ip\nPACKET id=PKT1 src_mac=00:11:22:33:44:01 dst_mac=00:11:22:33:44:02 src_ip=192.168.1.10 dst_ip=10.0.0.12 src_port=50000 dst_port=80\nPACKET id=PKT2 src_mac=00:11:22:33:44:01 dst_mac=00:11:22:33:44:02 src_ip=192.168.1.15 dst_ip=10.0.0.15 src_port=50001 dst_port=443",
        "expected": "LB_REPORT id=PKT1 bundle=Po1 hash_idx=2 port=Gi0/3\nLB_REPORT id=PKT2 bundle=Po1 hash_idx=0 port=Gi0/1",
        "note": "PKT1: 10 ^ 12 = 6, 6 % 4 = 2 -> Gi0/3. PKT2: 15 ^ 15 = 0, 0 % 4 = 0 -> Gi0/1."
      }
    ],
    "tests": [
      {
        "label": "Hachage par src-dst-port avec 2 ports membres",
        "stdin": "cas:1",
        "expected": "LB_REPORT id=TCP_FLOW bundle=Po2 hash_idx=0 port=Te1/1"
      },
      {
        "label": "Hachage par src-dst-mac avec conversion hexadécimale",
        "stdin": "cas:2",
        "expected": "LB_REPORT id=MCAST bundle=Po10 hash_idx=2 port=Eth3"
      },
      {
        "label": "Hachage par dst-mac unique",
        "stdin": "cas:3",
        "expected": "LB_REPORT id=P1 bundle=PoSingle hash_idx=3 port=Fa0/4"
      }
    ],
    "solution": "[Exemple]\nLB_REPORT id=PKT1 bundle=Po1 hash_idx=2 port=Gi0/3\nLB_REPORT id=PKT2 bundle=Po1 hash_idx=0 port=Gi0/1\n\n[Cas 1 — Hachage par src-dst-port avec 2 ports membres]\nLB_REPORT id=TCP_FLOW bundle=Po2 hash_idx=0 port=Te1/1\n\n[Cas 2 — Hachage par src-dst-mac avec conversion hexadécimale]\nLB_REPORT id=MCAST bundle=Po10 hash_idx=2 port=Eth3\n\n[Cas 3 — Hachage par dst-mac unique]\nLB_REPORT id=P1 bundle=PoSingle hash_idx=3 port=Fa0/4"
  },
  {
    "id": "lan3-c2-e3",
    "chapter": 2,
    "title": "Contrôleur de cohérence des interfaces membres EtherChannel",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la parfaite homogénéité des paramètres de configuration des ports d'un Port-Channel.",
    "brief": "<p>Pour qu'un groupe EtherChannel puisse s'activer (état <code>UP</code>), tous les ports membres physiques doivent présenter des paramètres strictement identiques.<br><br>\nParamètres obligatoirement homogènes :<br>\n- <code>speed</code> (vitesse en Mbps, ex: 1000)<br>\n- <code>duplex</code> (ex: full)<br>\n- <code>mode</code> (<code>access</code> ou <code>trunk</code>)<br>\n- Si <code>mode == 'access'</code> : même <code>vlan</code> d'accès.<br>\n- Si <code>mode == 'trunk'</code> : même <code>native_vlan</code> ET même ensemble de <code>allowed_vlans</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br>\nPour chaque port membre (triés par nom de port) :<br>\n- Si tous les paramètres concordent avec la référence :<br>\n  <code>status=COMPLIANT reason=NONE</code>.<br>\n- En cas de discordance :<br>\n  <code>status=INCOMPLIANT reason=&lt;première_discordance_parmi: SPEED_MISMATCH, DUPLEX_MISMATCH, MODE_MISMATCH, ACCESS_VLAN_MISMATCH, NATIVE_VLAN_MISMATCH, ALLOWED_VLANS_MISMATCH&gt;</code>.<br><br>\nAfficher pour chaque port :<br>\n<code>MEMBER_AUDIT group={group} port={port} status={status} reason={reason}</code><br>\nEt la synthèse finale du groupe :<br>\n<code>BUNDLE_STATUS group={group} state={UP si 100% compliant sinon SUSPENDED} compliant_count={c}/{total}</code></p>",
    "starter": "# Grille d'analyse (lan3-c2-e3) — Contrôleur de cohérence des interfaces membres EtherChannel\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tous les membres conformes sur trunk]\n# Données : MEMBER group=Po5 port=Te1/1 speed=10000 duplex=full mode=trunk vlan=1 native=99 allowed=10,20\n# Données : MEMBER group=Po5 port=Te1/2 speed=10000 duplex=full mode=trunk vlan=1 native=99 allowed=20,10\nA_COMPLETER\n\n[Cas 2 — Discordance de VLAN natif et allowed sur trunk]\n# Données : MEMBER group=Po2 port=Gi1 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,20\n# Données : MEMBER group=Po2 port=Gi2 speed=1000 duplex=full mode=trunk vlan=1 native=20 allowed=10,20\n# Données : MEMBER group=Po2 port=Gi3 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,30\nA_COMPLETER\n\n[Cas 3 — Discordance de mode access vs trunk]\n# Données : MEMBER group=Po3 port=Fa0/1 speed=100 duplex=full mode=access vlan=10 native=1 allowed=ALL\n# Données : MEMBER group=Po3 port=Fa0/2 speed=100 duplex=full mode=trunk vlan=10 native=1 allowed=ALL\nA_COMPLETER\n",
    "hints": [
      "Prendre le premier port comme modèle.",
      "Comparer les champs dans l'ordre : speed, duplex, mode, vlan (si access), native/allowed (si trunk).",
      "Normaliser allowed_vlans sous forme d'un set d'entiers."
    ],
    "examples": [
      {
        "stdin": "MEMBER group=Po1 port=Gi0/1 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,20,30\nMEMBER group=Po1 port=Gi0/2 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,20,30\nMEMBER group=Po1 port=Gi0/3 speed=100 duplex=full mode=trunk vlan=1 native=10 allowed=10,20,30",
        "expected": "MEMBER_AUDIT group=Po1 port=Gi0/1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po1 port=Gi0/2 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po1 port=Gi0/3 status=INCOMPLIANT reason=SPEED_MISMATCH\nBUNDLE_STATUS group=Po1 state=SUSPENDED compliant_count=2/3",
        "note": "Gi0/3 tourne à 100 Mbps au lieu de 1000 Mbps, ce qui suspend l'agrégation."
      }
    ],
    "tests": [
      {
        "label": "Tous les membres conformes sur trunk",
        "stdin": "cas:1",
        "expected": "MEMBER_AUDIT group=Po5 port=Te1/1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po5 port=Te1/2 status=COMPLIANT reason=NONE\nBUNDLE_STATUS group=Po5 state=UP compliant_count=2/2"
      },
      {
        "label": "Discordance de VLAN natif et allowed sur trunk",
        "stdin": "cas:2",
        "expected": "MEMBER_AUDIT group=Po2 port=Gi1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po2 port=Gi2 status=INCOMPLIANT reason=NATIVE_VLAN_MISMATCH\nMEMBER_AUDIT group=Po2 port=Gi3 status=INCOMPLIANT reason=ALLOWED_VLANS_MISMATCH\nBUNDLE_STATUS group=Po2 state=SUSPENDED compliant_count=1/3"
      },
      {
        "label": "Discordance de mode access vs trunk",
        "stdin": "cas:3",
        "expected": "MEMBER_AUDIT group=Po3 port=Fa0/1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po3 port=Fa0/2 status=INCOMPLIANT reason=MODE_MISMATCH\nBUNDLE_STATUS group=Po3 state=SUSPENDED compliant_count=1/2"
      }
    ],
    "solution": "[Exemple]\nMEMBER_AUDIT group=Po1 port=Gi0/1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po1 port=Gi0/2 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po1 port=Gi0/3 status=INCOMPLIANT reason=SPEED_MISMATCH\nBUNDLE_STATUS group=Po1 state=SUSPENDED compliant_count=2/3\n\n[Cas 1 — Tous les membres conformes sur trunk]\nMEMBER_AUDIT group=Po5 port=Te1/1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po5 port=Te1/2 status=COMPLIANT reason=NONE\nBUNDLE_STATUS group=Po5 state=UP compliant_count=2/2\n\n[Cas 2 — Discordance de VLAN natif et allowed sur trunk]\nMEMBER_AUDIT group=Po2 port=Gi1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po2 port=Gi2 status=INCOMPLIANT reason=NATIVE_VLAN_MISMATCH\nMEMBER_AUDIT group=Po2 port=Gi3 status=INCOMPLIANT reason=ALLOWED_VLANS_MISMATCH\nBUNDLE_STATUS group=Po2 state=SUSPENDED compliant_count=1/3\n\n[Cas 3 — Discordance de mode access vs trunk]\nMEMBER_AUDIT group=Po3 port=Fa0/1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po3 port=Fa0/2 status=INCOMPLIANT reason=MODE_MISMATCH\nBUNDLE_STATUS group=Po3 state=SUSPENDED compliant_count=1/2"
  },
  {
    "id": "lan3-c3-e1",
    "chapter": 3,
    "title": "Simulateur d'élection de routeur maître VRRP v2/v3 (RFC 5798)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler l'élection du routeur MASTER dans un groupe de redondance VRRP.",
    "brief": "<p>Le protocole <strong>VRRP (Virtual Router Redundancy Protocol - RFC 5798)</strong> permet à plusieurs routeurs ou commutateurs de niveau 3 de partager une passerelle virtuelle (VIP) pour éliminer le point unique de défaillance (SPOF).<br><br>\nRègles d'élection VRRP par groupe VRID :<br>\n- Si <code>alive == 'NO'</code> : le routeur est hors service &rarr; <code>role=INIT</code>.<br>\n- Parmi les routeurs actifs (<code>alive == 'YES'</code>) :<br>\n  1. Le routeur ayant la plus forte priorité (<code>prio</code>, valeur de 1 à 254) est élu <strong>MASTER</strong>.<br>\n  2. En cas d'égalité sur la priorité, le routeur ayant la plus grande adresse IP physique (comparaison numérique IPv4) devient <strong>MASTER</strong>.<br>\n  3. Tous les autres routeurs actifs prennent le rôle <strong>BACKUP</strong>.<br><br>\nLe script lit dans l’énoncé du cas des déclarations de routeurs VRRP :<br>\n<code>VRRP_ROUTER name=&lt;nom&gt; vrid=&lt;int&gt; prio=&lt;int&gt; ip=&lt;ip&gt; alive=&lt;YES|NO&gt;</code><br><br>\nPour chaque routeur (triés par VRID puis par nom alphabétique), afficher :<br>\n<code>VRRP_STATUS vrid={vrid} router={name} role={role} prio={prio} ip={ip}</code><br>\nEt pour chaque groupe VRID, la ligne de synthèse :<br>\n<code>VRRP_MASTER vrid={vrid} router={master_name} ip={master_ip}</code></p>",
    "starter": "# Grille d'analyse (lan3-c3-e1) — Simulateur d'élection de routeur maître VRRP v2/v3 (RFC 5798)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Départage par adresse IP la plus élevée en cas d'égalité de priorité]\n# Données : VRRP_ROUTER name=GW-A vrid=1 prio=100 ip=10.0.0.1 alive=YES\n# Données : VRRP_ROUTER name=GW-B vrid=1 prio=100 ip=10.0.0.2 alive=YES\nA_COMPLETER\n\n[Cas 2 — Plusieurs groupes VRID indépendants]\n# Données : VRRP_ROUTER name=R1_LAN vrid=1 prio=200 ip=192.168.1.1 alive=YES\n# Données : VRRP_ROUTER name=R2_LAN vrid=1 prio=100 ip=192.168.1.2 alive=YES\n# Données : VRRP_ROUTER name=R1_DMZ vrid=2 prio=100 ip=172.16.1.1 alive=YES\n# Données : VRRP_ROUTER name=R2_DMZ vrid=2 prio=250 ip=172.16.1.2 alive=YES\nA_COMPLETER\n\n[Cas 3 — Tous les membres d'un VRID sont hors service]\n# Données : VRRP_ROUTER name=DOWN1 vrid=5 prio=100 ip=1.1.1.1 alive=NO\n# Données : VRRP_ROUTER name=DOWN2 vrid=5 prio=120 ip=1.1.1.2 alive=NO\nA_COMPLETER\n",
    "hints": [
      "Regrouper les routeurs par VRID dans un dictionnaire.",
      "Comparer les routeurs actifs avec la clé : (prio, ipaddress.ip_address(ip)).",
      "Le maximum de cette clé est le MASTER."
    ],
    "examples": [
      {
        "stdin": "VRRP_ROUTER name=R1 vrid=10 prio=150 ip=192.168.10.2 alive=YES\nVRRP_ROUTER name=R2 vrid=10 prio=100 ip=192.168.10.3 alive=YES\nVRRP_ROUTER name=R3 vrid=10 prio=200 ip=192.168.10.4 alive=NO",
        "expected": "VRRP_STATUS vrid=10 router=R1 role=MASTER prio=150 ip=192.168.10.2\nVRRP_STATUS vrid=10 router=R2 role=BACKUP prio=100 ip=192.168.10.3\nVRRP_STATUS vrid=10 router=R3 role=INIT prio=200 ip=192.168.10.4\nVRRP_MASTER vrid=10 router=R1 ip=192.168.10.2",
        "note": "R3 est tombé (alive=NO). R1 a la plus forte priorité parmi les vivants (150 vs 100) et devient MASTER."
      }
    ],
    "tests": [
      {
        "label": "Départage par adresse IP la plus élevée en cas d'égalité de priorité",
        "stdin": "cas:1",
        "expected": "VRRP_STATUS vrid=1 router=GW-A role=BACKUP prio=100 ip=10.0.0.1\nVRRP_STATUS vrid=1 router=GW-B role=MASTER prio=100 ip=10.0.0.2\nVRRP_MASTER vrid=1 router=GW-B ip=10.0.0.2"
      },
      {
        "label": "Plusieurs groupes VRID indépendants",
        "stdin": "cas:2",
        "expected": "VRRP_STATUS vrid=1 router=R1_LAN role=MASTER prio=200 ip=192.168.1.1\nVRRP_STATUS vrid=1 router=R2_LAN role=BACKUP prio=100 ip=192.168.1.2\nVRRP_MASTER vrid=1 router=R1_LAN ip=192.168.1.1\nVRRP_STATUS vrid=2 router=R1_DMZ role=BACKUP prio=100 ip=172.16.1.1\nVRRP_STATUS vrid=2 router=R2_DMZ role=MASTER prio=250 ip=172.16.1.2\nVRRP_MASTER vrid=2 router=R2_DMZ ip=172.16.1.2"
      },
      {
        "label": "Tous les membres d'un VRID sont hors service",
        "stdin": "cas:3",
        "expected": "VRRP_STATUS vrid=5 router=DOWN1 role=INIT prio=100 ip=1.1.1.1\nVRRP_STATUS vrid=5 router=DOWN2 role=INIT prio=120 ip=1.1.1.2\nVRRP_MASTER vrid=5 router=NONE ip=NONE"
      }
    ],
    "solution": "[Exemple]\nVRRP_STATUS vrid=10 router=R1 role=MASTER prio=150 ip=192.168.10.2\nVRRP_STATUS vrid=10 router=R2 role=BACKUP prio=100 ip=192.168.10.3\nVRRP_STATUS vrid=10 router=R3 role=INIT prio=200 ip=192.168.10.4\nVRRP_MASTER vrid=10 router=R1 ip=192.168.10.2\n\n[Cas 1 — Départage par adresse IP la plus élevée en cas d'égalité de priorité]\nVRRP_STATUS vrid=1 router=GW-A role=BACKUP prio=100 ip=10.0.0.1\nVRRP_STATUS vrid=1 router=GW-B role=MASTER prio=100 ip=10.0.0.2\nVRRP_MASTER vrid=1 router=GW-B ip=10.0.0.2\n\n[Cas 2 — Plusieurs groupes VRID indépendants]\nVRRP_STATUS vrid=1 router=R1_LAN role=MASTER prio=200 ip=192.168.1.1\nVRRP_STATUS vrid=1 router=R2_LAN role=BACKUP prio=100 ip=192.168.1.2\nVRRP_MASTER vrid=1 router=R1_LAN ip=192.168.1.1\nVRRP_STATUS vrid=2 router=R1_DMZ role=BACKUP prio=100 ip=172.16.1.1\nVRRP_STATUS vrid=2 router=R2_DMZ role=MASTER prio=250 ip=172.16.1.2\nVRRP_MASTER vrid=2 router=R2_DMZ ip=172.16.1.2\n\n[Cas 3 — Tous les membres d'un VRID sont hors service]\nVRRP_STATUS vrid=5 router=DOWN1 role=INIT prio=100 ip=1.1.1.1\nVRRP_STATUS vrid=5 router=DOWN2 role=INIT prio=120 ip=1.1.1.2\nVRRP_MASTER vrid=5 router=NONE ip=NONE"
  },
  {
    "id": "lan3-c3-e2",
    "chapter": 3,
    "title": "Détecteur de basculement FHRP par suivi d'interface (Object Tracking)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la priorité effective d'un routeur HSRP/VRRP en cas de panne de lien montant et déterminer le basculement.",
    "brief": "<p>Le mécanisme d'<strong>Object Tracking</strong> permet à un routeur FHRP actif de surveiller l'état de son interface WAN vers le FAI. Si cette liaison tombe, sa priorité est décrémentée (<code>effective_prio = base_prio - decrement</code>). Si sa priorité devient inférieure à celle du routeur Standby et que la préemption (preempt) est activée, le Standby prend le relais immédiatement.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Calcul de la priorité effective pour chaque routeur :<br>\n   - Si <code>if_state == 'DOWN'</code> : <code>eff_prio = base_prio - decrement</code>.<br>\n   - Si <code>if_state == 'UP'</code> : <code>eff_prio = base_prio</code>.<br>\n2. Évaluation de la préemption :<br>\n   - Le routeur initialement <code>STANDBY</code> devient <code>ACTIVE</code> (Failover) SI et SEULEMENT SI :<br>\n     <code>standby.eff_prio &gt; active.eff_prio</code> ET <code>standby.preempt == 'YES'</code>.<br>\n   - Dans ce cas, l'ancien actif devient <code>STANDBY</code>.<br>\n   - Sinon, les rôles initiaux sont conservés.<br><br>\nPour chaque routeur (triés par nom alphabétique), afficher :<br>\n<code>TRACK_REPORT router={name} track_if={track_if} if_state={if_state} eff_prio={eff_prio} final_role={final_role} failover={YES|NO}</code></p>",
    "starter": "# Grille d'analyse (lan3-c3-e2) — Détecteur de basculement FHRP par suivi d'interface (Object Tracking)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Préemption désactivée sur le standby empêchant le basculement]\n# Données : TRACKED_ROUTER name=R_ACT init_role=ACTIVE base_prio=120 preempt=YES track_if=WAN1 decrement=50 if_state=DOWN\n# Données : TRACKED_ROUTER name=R_STBY init_role=STANDBY base_prio=100 preempt=NO track_if=WAN2 decrement=10 if_state=UP\nA_COMPLETER\n\n[Cas 2 — Décrément insuffisant pour passer sous le standby]\n# Données : TRACKED_ROUTER name=CORE1 init_role=ACTIVE base_prio=150 preempt=YES track_if=Serial0 decrement=10 if_state=DOWN\n# Données : TRACKED_ROUTER name=CORE2 init_role=STANDBY base_prio=100 preempt=YES track_if=Serial0 decrement=10 if_state=UP\nA_COMPLETER\n\n[Cas 3 — Liaison nominale UP conservant les priorités de base]\n# Données : TRACKED_ROUTER name=R_A init_role=ACTIVE base_prio=110 preempt=YES track_if=Eth1 decrement=30 if_state=UP\n# Données : TRACKED_ROUTER name=R_B init_role=STANDBY base_prio=100 preempt=YES track_if=Eth1 decrement=30 if_state=UP\nA_COMPLETER\n",
    "hints": [
      "Calculer eff_prio pour les deux routeurs.",
      "Vérifier si le Standby surpasse l'Actif et possède preempt == \"YES\"."
    ],
    "examples": [
      {
        "stdin": "TRACKED_ROUTER name=R1 init_role=ACTIVE base_prio=110 preempt=YES track_if=Gi0/0 decrement=20 if_state=DOWN\nTRACKED_ROUTER name=R2 init_role=STANDBY base_prio=100 preempt=YES track_if=Gi0/0 decrement=20 if_state=UP",
        "expected": "TRACK_REPORT router=R1 track_if=Gi0/0 if_state=DOWN eff_prio=90 final_role=STANDBY failover=YES\nTRACK_REPORT router=R2 track_if=Gi0/0 if_state=UP eff_prio=100 final_role=ACTIVE failover=YES",
        "note": "La panne WAN fait chuter la priorité de R1 à 90 (110 - 20). R2 (priorité 100 avec preempt=YES) prend le rôle ACTIVE."
      }
    ],
    "tests": [
      {
        "label": "Préemption désactivée sur le standby empêchant le basculement",
        "stdin": "cas:1",
        "expected": "TRACK_REPORT router=R_ACT track_if=WAN1 if_state=DOWN eff_prio=70 final_role=ACTIVE failover=NO\nTRACK_REPORT router=R_STBY track_if=WAN2 if_state=UP eff_prio=100 final_role=STANDBY failover=NO"
      },
      {
        "label": "Décrément insuffisant pour passer sous le standby",
        "stdin": "cas:2",
        "expected": "TRACK_REPORT router=CORE1 track_if=Serial0 if_state=DOWN eff_prio=140 final_role=ACTIVE failover=NO\nTRACK_REPORT router=CORE2 track_if=Serial0 if_state=UP eff_prio=100 final_role=STANDBY failover=NO"
      },
      {
        "label": "Liaison nominale UP conservant les priorités de base",
        "stdin": "cas:3",
        "expected": "TRACK_REPORT router=R_A track_if=Eth1 if_state=UP eff_prio=110 final_role=ACTIVE failover=NO\nTRACK_REPORT router=R_B track_if=Eth1 if_state=UP eff_prio=100 final_role=STANDBY failover=NO"
      }
    ],
    "solution": "[Exemple]\nTRACK_REPORT router=R1 track_if=Gi0/0 if_state=DOWN eff_prio=90 final_role=STANDBY failover=YES\nTRACK_REPORT router=R2 track_if=Gi0/0 if_state=UP eff_prio=100 final_role=ACTIVE failover=YES\n\n[Cas 1 — Préemption désactivée sur le standby empêchant le basculement]\nTRACK_REPORT router=R_ACT track_if=WAN1 if_state=DOWN eff_prio=70 final_role=ACTIVE failover=NO\nTRACK_REPORT router=R_STBY track_if=WAN2 if_state=UP eff_prio=100 final_role=STANDBY failover=NO\n\n[Cas 2 — Décrément insuffisant pour passer sous le standby]\nTRACK_REPORT router=CORE1 track_if=Serial0 if_state=DOWN eff_prio=140 final_role=ACTIVE failover=NO\nTRACK_REPORT router=CORE2 track_if=Serial0 if_state=UP eff_prio=100 final_role=STANDBY failover=NO\n\n[Cas 3 — Liaison nominale UP conservant les priorités de base]\nTRACK_REPORT router=R_A track_if=Eth1 if_state=UP eff_prio=110 final_role=ACTIVE failover=NO\nTRACK_REPORT router=R_B track_if=Eth1 if_state=UP eff_prio=100 final_role=STANDBY failover=NO"
  },
  {
    "id": "lan3-c3-e3",
    "chapter": 3,
    "title": "Répartiteur de charge GLBP (Gateway Load Balancing Protocol)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler l'assignation dynamique des adresses MAC virtuelles (AVF) par l'AVG selon les algorithmes GLBP.",
    "brief": "<p>Contrairement à HSRP/VRRP où un seul équipement route le trafic pendant que les autres dorment, le protocole <strong>GLBP (Gateway Load Balancing Protocol)</strong> permet à tous les routeurs membres de router le trafic simultanément.<br>\nL'<strong>AVG (Active Virtual Gateway)</strong> répond aux requêtes ARP des clients en distribuant différentes adresses MAC virtuelles associées aux <strong>AVF (Active Virtual Forwarders)</strong>.<br><br>\nAnalysez les paramètres du problème pour chaque cas. <strong>round-robin :</strong> Les AVFs sont assignés cycliquement selon leur <code>id</code> croissant (requête 0 &rarr; 1er AVF, requête 1 &rarr; 2e AVF, etc.).<br>\n2. <strong>host-dependent :</strong> L'AVF est sélectionné selon le hachage de l'adresse MAC du client (dernier octet décimal de client_mac modulo le nombre d'AVFs). Un client reçoit toujours la même MAC.<br>\n3. <strong>weighted :</strong> Chaque AVF est répété proportionnellement à son <code>weight</code> (ex: AVF1 weight=2, AVF2 weight=1 donne la séquence <code>[AVF1, AVF1, AVF2]</code> déroulée cycliquement au fil des requêtes).<br><br>\nPour chaque requête ARP client, afficher :<br>\n<code>GLBP_REPLY client={client_id} assigned_avf={avf_name} vmac={avf_vmac} mode={mode}</code></p>",
    "starter": "# Grille d'analyse (lan3-c3-e3) — Répartiteur de charge GLBP (Gateway Load Balancing Protocol)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode host-dependent liant un client à une même MAC virtuelle]\n# Données : GLBP_CONFIG group=2 mode=host-dependent\n# Données : AVF id=1 name=GW1 vmac=00:07:b4:00:02:01 weight=10\n# Données : AVF id=2 name=GW2 vmac=00:07:b4:00:02:02 weight=10\n# Données : ARP_REQ client_id=HOST_A client_mac=00:00:00:00:00:00\n# Données : ARP_REQ client_id=HOST_B client_mac=00:00:00:00:00:01\n# Données : ARP_REQ client_id=HOST_A client_mac=00:00:00:00:00:00\nA_COMPLETER\n\n[Cas 2 — Mode weighted avec poids inégaux (2 pour 1)]\n# Données : GLBP_CONFIG group=3 mode=weighted\n# Données : AVF id=1 name=CORE_STRONG vmac=00:07:b4:00:03:01 weight=2\n# Données : AVF id=2 name=CORE_WEAK vmac=00:07:b4:00:03:02 weight=1\n# Données : ARP_REQ client_id=C1 client_mac=00:aa:bb:cc:dd:01\n# Données : ARP_REQ client_id=C2 client_mac=00:aa:bb:cc:dd:02\n# Données : ARP_REQ client_id=C3 client_mac=00:aa:bb:cc:dd:03\n# Données : ARP_REQ client_id=C4 client_mac=00:aa:bb:cc:dd:04\nA_COMPLETER\n\n[Cas 3 — Groupe à 3 forwarders en round-robin]\n# Données : GLBP_CONFIG group=4 mode=round-robin\n# Données : AVF id=1 name=F1 vmac=00:07:b4:00:04:01 weight=1\n# Données : AVF id=2 name=F2 vmac=00:07:b4:00:04:02 weight=1\n# Données : AVF id=3 name=F3 vmac=00:07:b4:00:04:03 weight=1\n# Données : ARP_REQ client_id=X client_mac=00:11:22:33:44:55\n# Données : ARP_REQ client_id=Y client_mac=00:11:22:33:44:56\n# Données : ARP_REQ client_id=Z client_mac=00:11:22:33:44:57\nA_COMPLETER\n",
    "hints": [
      "Trier les AVFs par ID croissant.",
      "Pour round-robin : compteur global modulo nombre d'AVFs.",
      "Pour host-dependent : dernier octet de client_mac modulo nombre d'AVFs.",
      "Pour weighted : construire la liste pondérée et la dérouler cycliquement."
    ],
    "examples": [
      {
        "stdin": "GLBP_CONFIG group=1 mode=round-robin\nAVF id=1 name=AVF1 vmac=00:07:b4:00:01:01 weight=100\nAVF id=2 name=AVF2 vmac=00:07:b4:00:01:02 weight=100\nARP_REQ client_id=PC1 client_mac=00:11:22:33:44:01\nARP_REQ client_id=PC2 client_mac=00:11:22:33:44:02\nARP_REQ client_id=PC3 client_mac=00:11:22:33:44:03",
        "expected": "GLBP_REPLY client=PC1 assigned_avf=AVF1 vmac=00:07:b4:00:01:01 mode=round-robin\nGLBP_REPLY client=PC2 assigned_avf=AVF2 vmac=00:07:b4:00:01:02 mode=round-robin\nGLBP_REPLY client=PC3 assigned_avf=AVF1 vmac=00:07:b4:00:01:01 mode=round-robin",
        "note": "Distribution cyclique en Round-Robin : AVF1, AVF2, puis AVF1."
      }
    ],
    "tests": [
      {
        "label": "Mode host-dependent liant un client à une même MAC virtuelle",
        "stdin": "cas:1",
        "expected": "GLBP_REPLY client=HOST_A assigned_avf=GW1 vmac=00:07:b4:00:02:01 mode=host-dependent\nGLBP_REPLY client=HOST_B assigned_avf=GW2 vmac=00:07:b4:00:02:02 mode=host-dependent\nGLBP_REPLY client=HOST_A assigned_avf=GW1 vmac=00:07:b4:00:02:01 mode=host-dependent"
      },
      {
        "label": "Mode weighted avec poids inégaux (2 pour 1)",
        "stdin": "cas:2",
        "expected": "GLBP_REPLY client=C1 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted\nGLBP_REPLY client=C2 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted\nGLBP_REPLY client=C3 assigned_avf=CORE_WEAK vmac=00:07:b4:00:03:02 mode=weighted\nGLBP_REPLY client=C4 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted"
      },
      {
        "label": "Groupe à 3 forwarders en round-robin",
        "stdin": "cas:3",
        "expected": "GLBP_REPLY client=X assigned_avf=F1 vmac=00:07:b4:00:04:01 mode=round-robin\nGLBP_REPLY client=Y assigned_avf=F2 vmac=00:07:b4:00:04:02 mode=round-robin\nGLBP_REPLY client=Z assigned_avf=F3 vmac=00:07:b4:00:04:03 mode=round-robin"
      }
    ],
    "solution": "[Exemple]\nGLBP_REPLY client=PC1 assigned_avf=AVF1 vmac=00:07:b4:00:01:01 mode=round-robin\nGLBP_REPLY client=PC2 assigned_avf=AVF2 vmac=00:07:b4:00:01:02 mode=round-robin\nGLBP_REPLY client=PC3 assigned_avf=AVF1 vmac=00:07:b4:00:01:01 mode=round-robin\n\n[Cas 1 — Mode host-dependent liant un client à une même MAC virtuelle]\nGLBP_REPLY client=HOST_A assigned_avf=GW1 vmac=00:07:b4:00:02:01 mode=host-dependent\nGLBP_REPLY client=HOST_B assigned_avf=GW2 vmac=00:07:b4:00:02:02 mode=host-dependent\nGLBP_REPLY client=HOST_A assigned_avf=GW1 vmac=00:07:b4:00:02:01 mode=host-dependent\n\n[Cas 2 — Mode weighted avec poids inégaux (2 pour 1)]\nGLBP_REPLY client=C1 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted\nGLBP_REPLY client=C2 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted\nGLBP_REPLY client=C3 assigned_avf=CORE_WEAK vmac=00:07:b4:00:03:02 mode=weighted\nGLBP_REPLY client=C4 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted\n\n[Cas 3 — Groupe à 3 forwarders en round-robin]\nGLBP_REPLY client=X assigned_avf=F1 vmac=00:07:b4:00:04:01 mode=round-robin\nGLBP_REPLY client=Y assigned_avf=F2 vmac=00:07:b4:00:04:02 mode=round-robin\nGLBP_REPLY client=Z assigned_avf=F3 vmac=00:07:b4:00:04:03 mode=round-robin"
  },
  {
    "id": "lan3-c4-e1",
    "chapter": 4,
    "title": "Calculateur de métrique de coût OSPF et sélection du meilleur chemin",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le coût OSPF cumulé de chemins concurrents à partir de la bande passante de référence.",
    "brief": "<p>Le protocole <strong>OSPFv2 (Open Shortest Path First - RFC 2328)</strong> calcule le coût d'une interface selon la formule standard :<br>\n<code>coût = max(1, ref_bandwidth // interface_bandwidth)</code> (en Mbps).<br>\nPar défaut, la bande passante de référence historique est 100 Mbps (ce qui donne un coût de 1 pour FastEthernet, Gigabit et 10G sans différenciation). En réseau de campus moderne, on configure <code>auto-cost reference-bandwidth</code> à 10000 (10 Gbps) ou 100000 (100 Gbps).<br><br>\nLe coût total d'un chemin vers une destination est la somme des coûts de chaque tronçon (interface de sortie le long du chemin). Le chemin au coût total le plus bas est injecté dans la table de routage (Best Path).<br><br>\nAnalysez les paramètres du problème pour chaque cas...&gt;</code> (vitesses des interfaces en Mbps).<br><br>\nPour chaque chemin (triés par id alphabétique), afficher :<br>\n<code>OSPF_PATH id={id} total_cost={total_cost} hops_count={len(hops)} status={BEST_PATH|BACKUP_PATH}</code><br>\nEt la ligne finale élisant le meilleur chemin :<br>\n<code>OSPF_ROUTE best_path={winner_id} metric={winner_cost}</code></p>",
    "starter": "# Grille d'analyse (lan3-c4-e1) — Calculateur de métrique de coût OSPF et sélection du meilleur chemin\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Bande passante de référence par défaut 100 Mbps sans différenciation au-delà]\n# Données : OSPF_CONFIG ref_bw=100\n# Données : PATH id=P1 hops=100,100\n# Données : PATH id=P2 hops=1000,1000\nA_COMPLETER\n\n[Cas 2 — Chemin à saut unique très rapide surpassant un chemin multi-sauts]\n# Données : OSPF_CONFIG ref_bw=100000\n# Données : PATH id=FIBRE hops=100000\n# Données : PATH id=CUIVRE hops=10000,10000\nA_COMPLETER\n\n[Cas 3 — Liaisons lentes pénalisées (T1/E1)]\n# Données : OSPF_CONFIG ref_bw=1000\n# Données : PATH id=DIRECT_SLOW hops=2\n# Données : PATH id=DETOUR_FAST hops=100,100\nA_COMPLETER\n",
    "hints": [
      "Calculer pour chaque saut : max(1, ref_bw // bw).",
      "Sommer les coûts pour obtenir total_cost.",
      "Le chemin minimal (départage par id alphabétique) est BEST_PATH."
    ],
    "examples": [
      {
        "stdin": "OSPF_CONFIG ref_bw=10000\nPATH id=PATH_A hops=1000,1000,1000\nPATH id=PATH_B hops=10000,100\nPATH id=PATH_C hops=10000,10000",
        "expected": "OSPF_PATH id=PATH_A total_cost=30 hops_count=3 status=BACKUP_PATH\nOSPF_PATH id=PATH_B total_cost=101 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=PATH_C total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_ROUTE best_path=PATH_C metric=2",
        "note": "PATH_C traverse deux liens 10G (coût 1 + 1 = 2) et bat PATH_A (coût 10+10+10 = 30)."
      }
    ],
    "tests": [
      {
        "label": "Bande passante de référence par défaut 100 Mbps sans différenciation au-delà",
        "stdin": "cas:1",
        "expected": "OSPF_PATH id=P1 total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_PATH id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH\nOSPF_ROUTE best_path=P1 metric=2"
      },
      {
        "label": "Chemin à saut unique très rapide surpassant un chemin multi-sauts",
        "stdin": "cas:2",
        "expected": "OSPF_PATH id=CUIVRE total_cost=20 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=FIBRE total_cost=1 hops_count=1 status=BEST_PATH\nOSPF_ROUTE best_path=FIBRE metric=1"
      },
      {
        "label": "Liaisons lentes pénalisées (T1/E1)",
        "stdin": "cas:3",
        "expected": "OSPF_PATH id=DETOUR_FAST total_cost=20 hops_count=2 status=BEST_PATH\nOSPF_PATH id=DIRECT_SLOW total_cost=500 hops_count=1 status=BACKUP_PATH\nOSPF_ROUTE best_path=DETOUR_FAST metric=20"
      }
    ],
    "solution": "[Exemple]\nOSPF_PATH id=PATH_A total_cost=30 hops_count=3 status=BACKUP_PATH\nOSPF_PATH id=PATH_B total_cost=101 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=PATH_C total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_ROUTE best_path=PATH_C metric=2\n\n[Cas 1 — Bande passante de référence par défaut 100 Mbps sans différenciation au-delà]\nOSPF_PATH id=P1 total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_PATH id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH\nOSPF_ROUTE best_path=P1 metric=2\n\n[Cas 2 — Chemin à saut unique très rapide surpassant un chemin multi-sauts]\nOSPF_PATH id=CUIVRE total_cost=20 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=FIBRE total_cost=1 hops_count=1 status=BEST_PATH\nOSPF_ROUTE best_path=FIBRE metric=1\n\n[Cas 3 — Liaisons lentes pénalisées (T1/E1)]\nOSPF_PATH id=DETOUR_FAST total_cost=20 hops_count=2 status=BEST_PATH\nOSPF_PATH id=DIRECT_SLOW total_cost=500 hops_count=1 status=BACKUP_PATH\nOSPF_ROUTE best_path=DETOUR_FAST metric=20"
  },
  {
    "id": "lan3-c4-e2",
    "chapter": 4,
    "title": "Parseur et classificateur de paquets LSA OSPF (Types 1 à 7)",
    "level": "n2",
    "language": "analyse",
    "goal": "Classer les annonces d'état de liens (LSA) selon leur type, leur portée de diffusion et leur rôle émetteur.",
    "brief": "<p>Dans une architecture OSPF multi-aires, différents types de <strong>Link-State Advertisements (LSA)</strong> circulent pour construire la base de données topologique (LSDB) :<br><br>\nClassification officielle des LSAs :<br>\n- <strong>Type 1 (Router LSA) :</strong> Émis par <em>chaque routeur interne</em>, portée <code>INTRA_AREA</code>.<br>\n- <strong>Type 2 (Network LSA) :</strong> Émis par le <em>Designated Router (DR)</em> sur réseau multi-accès broadcast, portée <code>INTRA_AREA</code>.<br>\n- <strong>Type 3 (Summary LSA) :</strong> Émis par un <em>ABR (Area Border Router)</em> pour annoncer des réseaux d'autres aires, portée <code>INTER_AREA</code>.<br>\n- <strong>Type 4 (ASBR Summary LSA) :</strong> Émis par un <em>ABR</em> pour indiquer la route vers un ASBR, portée <code>INTER_AREA</code>.<br>\n- <strong>Type 5 (AS External LSA) :</strong> Émis par un <em>ASBR (Autonomous System Boundary Router)</em> pour injecter des routes redistribuées (BGP, RIP, statique), portée <code>EXTERNAL_AS</code>.<br>\n- <strong>Type 7 (NSSA External LSA) :</strong> Émis par un <em>ASBR</em> dans une aire NSSA, portée <code>NSSA_LOCAL</code>.<br><br>\nLe script lit dans l’énoncé du cas des annonces LSA capturées :<br>\n<code>LSA id=&lt;nom&gt; type=&lt;1|2|3|4|5|7&gt; adv_router=&lt;ip&gt; area=&lt;int&gt;</code><br><br>\nPour chaque LSA, afficher :<br>\n<code>LSA_REPORT id={id} type={type} name={lsa_name} emitter={emitter_role} scope={scope}</code></p>",
    "starter": "# Grille d'analyse (lan3-c4-e2) — Parseur et classificateur de paquets LSA OSPF (Types 1 à 7)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Annonces de Type 4 et Type 7 NSSA]\n# Données : LSA id=L_ASBR type=4 adv_router=10.0.0.254 area=2\n# Données : LSA id=L_NSSA type=7 adv_router=172.16.50.1 area=10\nA_COMPLETER\n\n[Cas 2 — Plusieurs LSAs Type 1 dans différentes aires]\n# Données : LSA id=R_BB type=1 adv_router=1.1.1.1 area=0\n# Données : LSA id=R_A1 type=1 adv_router=2.2.2.2 area=1\nA_COMPLETER\n\n[Cas 3 — LSA Type 5 traversant le backbone]\n# Données : LSA id=EXT_ROUTE type=5 adv_router=198.51.100.1 area=0\nA_COMPLETER\n",
    "hints": [
      "Gérer un dictionnaire de mapping pour les types 1, 2, 3, 4, 5, 7.",
      "Exemple: 1 -> (\"Router LSA\", \"INTERNAL_ROUTER\", \"INTRA_AREA\")."
    ],
    "examples": [
      {
        "stdin": "LSA id=L1 type=1 adv_router=1.1.1.1 area=0\nLSA id=L2 type=2 adv_router=2.2.2.2 area=0\nLSA id=L3 type=3 adv_router=10.0.0.1 area=1\nLSA id=L4 type=5 adv_router=192.168.1.1 area=0",
        "expected": "LSA_REPORT id=L1 type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\nLSA_REPORT id=L2 type=2 name=Network_LSA emitter=DR scope=INTRA_AREA\nLSA_REPORT id=L3 type=3 name=Summary_LSA emitter=ABR scope=INTER_AREA\nLSA_REPORT id=L4 type=5 name=AS_External_LSA emitter=ASBR scope=EXTERNAL_AS",
        "note": "L1 est un LSA Type 1 intra-zone ; L3 est un Type 3 inter-zone émis par un ABR ; L4 est un Type 5 externe."
      }
    ],
    "tests": [
      {
        "label": "Annonces de Type 4 et Type 7 NSSA",
        "stdin": "cas:1",
        "expected": "LSA_REPORT id=L_ASBR type=4 name=ASBR_Summary_LSA emitter=ABR scope=INTER_AREA\nLSA_REPORT id=L_NSSA type=7 name=NSSA_External_LSA emitter=ASBR scope=NSSA_LOCAL"
      },
      {
        "label": "Plusieurs LSAs Type 1 dans différentes aires",
        "stdin": "cas:2",
        "expected": "LSA_REPORT id=R_BB type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\nLSA_REPORT id=R_A1 type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA"
      },
      {
        "label": "LSA Type 5 traversant le backbone",
        "stdin": "cas:3",
        "expected": "LSA_REPORT id=EXT_ROUTE type=5 name=AS_External_LSA emitter=ASBR scope=EXTERNAL_AS"
      }
    ],
    "solution": "[Exemple]\nLSA_REPORT id=L1 type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\nLSA_REPORT id=L2 type=2 name=Network_LSA emitter=DR scope=INTRA_AREA\nLSA_REPORT id=L3 type=3 name=Summary_LSA emitter=ABR scope=INTER_AREA\nLSA_REPORT id=L4 type=5 name=AS_External_LSA emitter=ASBR scope=EXTERNAL_AS\n\n[Cas 1 — Annonces de Type 4 et Type 7 NSSA]\nLSA_REPORT id=L_ASBR type=4 name=ASBR_Summary_LSA emitter=ABR scope=INTER_AREA\nLSA_REPORT id=L_NSSA type=7 name=NSSA_External_LSA emitter=ASBR scope=NSSA_LOCAL\n\n[Cas 2 — Plusieurs LSAs Type 1 dans différentes aires]\nLSA_REPORT id=R_BB type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\nLSA_REPORT id=R_A1 type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\n\n[Cas 3 — LSA Type 5 traversant le backbone]\nLSA_REPORT id=EXT_ROUTE type=5 name=AS_External_LSA emitter=ASBR scope=EXTERNAL_AS"
  },
  {
    "id": "lan3-c4-e3",
    "chapter": 4,
    "title": "Filtre d'injection de routes dans une aire OSPF Stub, Totally Stubby & NSSA",
    "level": "n3",
    "language": "analyse",
    "goal": "Auditer l'acceptation ou le filtrage des LSAs selon la politique de zone OSPF configurée sur l'ABR.",
    "brief": "<p>Pour alléger la table de routage et préserver la mémoire des routeurs de succursales, OSPF définit des types de zones spéciales :<br><br>\nRègles de filtrage des LSAs selon le type de zone :<br>\n- <strong>STANDARD (Zone normale) :</strong> Accepte tous les types de LSA (1, 2, 3, 4, 5).<br>\n- <strong>STUB :</strong> Bloque les routes externes (Type 4 et 5 rejetés) ; accepte Type 1, 2, 3.<br>\n- <strong>TOTALLY_STUBBY (Spécifique Cisco) :</strong> Bloque les routes externes (Type 4 et 5) ET les routes inter-zones (Type 3 rejetés) ; n'accepte que Type 1 et 2.<br>\n- <strong>NSSA (Not-So-Stubby Area) :</strong> Bloque les routes externes Type 4 et 5 classiques, mais accepte les Type 7 générés localement ; accepte Type 1, 2, 3, 7.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br>\n- Si bloqué : <code>action=DROP result=BLOCKED_BY_AREA_POLICY</code>.<br><br>\nAfficher :<br>\n<code>OSPF_FILTER id={id} area={area_id} lsa_type={lsa_type} action={action} result={result}</code></p>",
    "starter": "# Grille d'analyse (lan3-c4-e3) — Filtre d'injection de routes dans une aire OSPF Stub, Totally Stubby & NSSA\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Zone Totally Stubby bloquant même les Summary Type 3]\n# Données : AREA_CONFIG area_id=20 type=TOTALLY_STUBBY\n# Données : INCOMING_LSA id=T1 lsa_type=1 prefix=10.20.0.0/16\n# Données : INCOMING_LSA id=T3 lsa_type=3 prefix=172.16.0.0/16\n# Données : INCOMING_LSA id=T5 lsa_type=5 prefix=8.8.8.8/32\nA_COMPLETER\n\n[Cas 2 — Zone NSSA autorisant le Type 7 et bloquant le Type 5]\n# Données : AREA_CONFIG area_id=30 type=NSSA\n# Données : INCOMING_LSA id=N7 lsa_type=7 prefix=198.51.100.0/24\n# Données : INCOMING_LSA id=N5 lsa_type=5 prefix=203.0.113.0/24\nA_COMPLETER\n\n[Cas 3 — Zone standard acceptant tout]\n# Données : AREA_CONFIG area_id=0 type=STANDARD\n# Données : INCOMING_LSA id=S3 lsa_type=3 prefix=10.0.0.0/8\n# Données : INCOMING_LSA id=S4 lsa_type=4 prefix=1.1.1.1/32\n# Données : INCOMING_LSA id=S5 lsa_type=5 prefix=100.64.0.0/10\nA_COMPLETER\n",
    "hints": [
      "Créer un set de types LSA autorisés selon le type d'aire.",
      "STANDARD: {1, 2, 3, 4, 5}.",
      "STUB: {1, 2, 3}.",
      "TOTALLY_STUBBY: {1, 2}.",
      "NSSA: {1, 2, 3, 7}."
    ],
    "examples": [
      {
        "stdin": "AREA_CONFIG area_id=10 type=STUB\nINCOMING_LSA id=L1 lsa_type=1 prefix=10.10.0.0/16\nINCOMING_LSA id=L2 lsa_type=3 prefix=192.168.0.0/24\nINCOMING_LSA id=L3 lsa_type=5 prefix=0.0.0.0/0",
        "expected": "OSPF_FILTER id=L1 area=10 lsa_type=1 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=L2 area=10 lsa_type=3 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=L3 area=10 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY",
        "note": "L1 (Type 1) et L2 (Type 3) entrent dans la zone Stub ; L3 (Type 5 externe) est bloqué."
      }
    ],
    "tests": [
      {
        "label": "Zone Totally Stubby bloquant même les Summary Type 3",
        "stdin": "cas:1",
        "expected": "OSPF_FILTER id=T1 area=20 lsa_type=1 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=T3 area=20 lsa_type=3 action=DROP result=BLOCKED_BY_AREA_POLICY\nOSPF_FILTER id=T5 area=20 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY"
      },
      {
        "label": "Zone NSSA autorisant le Type 7 et bloquant le Type 5",
        "stdin": "cas:2",
        "expected": "OSPF_FILTER id=N7 area=30 lsa_type=7 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=N5 area=30 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY"
      },
      {
        "label": "Zone standard acceptant tout",
        "stdin": "cas:3",
        "expected": "OSPF_FILTER id=S3 area=0 lsa_type=3 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=S4 area=0 lsa_type=4 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=S5 area=0 lsa_type=5 action=PERMIT result=INJECTED_INTO_AREA"
      }
    ],
    "solution": "[Exemple]\nOSPF_FILTER id=L1 area=10 lsa_type=1 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=L2 area=10 lsa_type=3 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=L3 area=10 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY\n\n[Cas 1 — Zone Totally Stubby bloquant même les Summary Type 3]\nOSPF_FILTER id=T1 area=20 lsa_type=1 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=T3 area=20 lsa_type=3 action=DROP result=BLOCKED_BY_AREA_POLICY\nOSPF_FILTER id=T5 area=20 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY\n\n[Cas 2 — Zone NSSA autorisant le Type 7 et bloquant le Type 5]\nOSPF_FILTER id=N7 area=30 lsa_type=7 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=N5 area=30 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY\n\n[Cas 3 — Zone standard acceptant tout]\nOSPF_FILTER id=S3 area=0 lsa_type=3 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=S4 area=0 lsa_type=4 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=S5 area=0 lsa_type=5 action=PERMIT result=INJECTED_INTO_AREA"
  },
  {
    "id": "lan3-c5-e1",
    "chapter": 5,
    "title": "Contrôleur de Port Security et détection de violation (Protect, Restrict, Shutdown)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le mécanisme Cisco Port Security et les modes de réaction face aux adresses MAC non autorisées.",
    "brief": "<p>La fonctionnalité <strong>Port Security</strong> sur les commutateurs de niveau 2 restreint l'accès d'un port aux seules adresses MAC approuvées (statiques ou apprises dynamiquement jusqu'à un quota <code>max_mac</code>).<br><br>\nModes de violation lorsqu'une adresse MAC non autorisée émet une trame :<br>\n- <strong>protect :</strong> Détruit silencieusement la trame sans générer de log ni incrémenter de compteur ; le port reste opérationnel pour les MACs légitimes (&rarr; <code>action=DROP_SILENT state=UP</code>).<br>\n- <strong>restrict :</strong> Détruit la trame, incrémente le compteur de violations et émet un piège SNMP / log syslog ; le port reste UP (&rarr; <code>action=DROP_ALERT state=UP</code>).<br>\n- <strong>shutdown :</strong> Désactive immédiatement le port physique qui passe en état d'erreur irrécupérable <code>ERR_DISABLE</code> (&rarr; <code>action=PORT_SHUTDOWN state=ERR_DISABLE</code>). Toutes les trames suivantes reçues sur ce port sont rejetées (&rarr; <code>action=DROP state=ERR_DISABLE</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas...|NONE&gt;</code><br>\n- Les trames arrivant sur le port :<br>\n  <code>FRAME id=&lt;nom&gt; src_mac=&lt;mac&gt;</code><br><br>\nPour chaque trame, afficher :<br>\n<code>PORT_SEC_REPORT id={id} port={port} mac={src_mac} status={PERMIT|VIOLATION|PORT_DOWN} action={action} state={state}</code></p>",
    "starter": "# Grille d'analyse (lan3-c5-e1) — Contrôleur de Port Security et détection de violation (Protect, Restrict, Shutdown)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode restrict conservant le port UP avec drop et alerte]\n# Données : PORT_SEC port=Gi0/1 max_mac=1 mode=restrict sticky_macs=00:00:00:00:00:01\n# Données : FRAME id=R1 src_mac=00:00:00:00:00:01\n# Données : FRAME id=R2 src_mac=00:00:00:00:00:99\n# Données : FRAME id=R3 src_mac=00:00:00:00:00:01\nA_COMPLETER\n\n[Cas 2 — Mode protect silencieux]\n# Données : PORT_SEC port=Fa0/5 max_mac=1 mode=protect sticky_macs=NONE\n# Données : FRAME id=P1 src_mac=00:50:56:00:00:01\n# Données : FRAME id=P2 src_mac=00:50:56:00:00:02\nA_COMPLETER\n\n[Cas 3 — Apprentissage dynamique jusqu'à max_mac=2]\n# Données : PORT_SEC port=Eth1 max_mac=2 mode=shutdown sticky_macs=NONE\n# Données : FRAME id=D1 src_mac=00:01:02:03:04:01\n# Données : FRAME id=D2 src_mac=00:01:02:03:04:02\n# Données : FRAME id=D3 src_mac=00:01:02:03:04:03\nA_COMPLETER\n",
    "hints": [
      "Le mécanisme de sécurité Port Security surveille le nombre d’adresses MAC distinctes autorisées sur un port de commutateur.",
      "Si une trame avec une adresse MAC inconnue arrive alors que le seuil maximal est atteint, le port bascule en violation (err-disable)."
    ],
    "examples": [
      {
        "stdin": "PORT_SEC port=Fa0/1 max_mac=1 mode=shutdown sticky_macs=00:11:22:33:44:01\nFRAME id=F1 src_mac=00:11:22:33:44:01\nFRAME id=F2 src_mac=00:aa:bb:cc:dd:02\nFRAME id=F3 src_mac=00:11:22:33:44:01",
        "expected": "PORT_SEC_REPORT id=F1 port=Fa0/1 mac=00:11:22:33:44:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=F2 port=Fa0/1 mac=00:aa:bb:cc:dd:02 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE\nPORT_SEC_REPORT id=F3 port=Fa0/1 mac=00:11:22:33:44:01 status=PORT_DOWN action=DROP state=ERR_DISABLE",
        "note": "F1 est autorisée ; F2 déclenche le shutdown du port ; F3 arrive sur un port désactivé."
      }
    ],
    "tests": [
      {
        "label": "Mode restrict conservant le port UP avec drop et alerte",
        "stdin": "cas:1",
        "expected": "PORT_SEC_REPORT id=R1 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=R2 port=Gi0/1 mac=00:00:00:00:00:99 status=VIOLATION action=DROP_ALERT state=UP\nPORT_SEC_REPORT id=R3 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP"
      },
      {
        "label": "Mode protect silencieux",
        "stdin": "cas:2",
        "expected": "PORT_SEC_REPORT id=P1 port=Fa0/5 mac=00:50:56:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=P2 port=Fa0/5 mac=00:50:56:00:00:02 status=VIOLATION action=DROP_SILENT state=UP"
      },
      {
        "label": "Apprentissage dynamique jusqu'à max_mac=2",
        "stdin": "cas:3",
        "expected": "PORT_SEC_REPORT id=D1 port=Eth1 mac=00:01:02:03:04:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D2 port=Eth1 mac=00:01:02:03:04:02 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D3 port=Eth1 mac=00:01:02:03:04:03 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE"
      }
    ],
    "solution": "[Exemple]\nPORT_SEC_REPORT id=F1 port=Fa0/1 mac=00:11:22:33:44:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=F2 port=Fa0/1 mac=00:aa:bb:cc:dd:02 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE\nPORT_SEC_REPORT id=F3 port=Fa0/1 mac=00:11:22:33:44:01 status=PORT_DOWN action=DROP state=ERR_DISABLE\n\n[Cas 1 — Mode restrict conservant le port UP avec drop et alerte]\nPORT_SEC_REPORT id=R1 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=R2 port=Gi0/1 mac=00:00:00:00:00:99 status=VIOLATION action=DROP_ALERT state=UP\nPORT_SEC_REPORT id=R3 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\n\n[Cas 2 — Mode protect silencieux]\nPORT_SEC_REPORT id=P1 port=Fa0/5 mac=00:50:56:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=P2 port=Fa0/5 mac=00:50:56:00:00:02 status=VIOLATION action=DROP_SILENT state=UP\n\n[Cas 3 — Apprentissage dynamique jusqu'à max_mac=2]\nPORT_SEC_REPORT id=D1 port=Eth1 mac=00:01:02:03:04:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D2 port=Eth1 mac=00:01:02:03:04:02 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D3 port=Eth1 mac=00:01:02:03:04:03 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE"
  },
  {
    "id": "lan3-c5-e2",
    "chapter": 5,
    "title": "Validateur de base de données de liaison DHCP Snooping",
    "level": "n2",
    "language": "analyse",
    "goal": "Filtrer les messages DHCP selon le statut de confiance des ports et alimenter la base de liaison (Binding DB).",
    "brief": "<p>L'attaque par serveur DHCP pirate (Rogue DHCP Server) permet à un attaquant de distribuer de fausses passerelles et de faux serveurs DNS aux postes du réseau. La parade <strong>DHCP Snooping</strong> classe les ports du commutateur en deux catégories :<br>\n- <strong>Ports de confiance (TRUSTED) :</strong> Reliés aux serveurs DHCP légitimes ou aux uplinks de distribution. Tous les messages DHCP y sont autorisés.<br>\n- <strong>Ports non fiables (UNTRUSTED) :</strong> Reliés aux utilisateurs finals. Seules les requêtes clients (<code>DISCOVER</code>, <code>REQUEST</code>) y sont autorisées. Si une réponse serveur (<code>OFFER</code> ou <code>ACK</code>) y est détectée, elle est immédiatement détruite et signalée comme attaque Rogue DHCP.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Si <code>port.trust == 'UNTRUSTED'</code> et <code>type in ['OFFER', 'ACK']</code> :<br>\n   <code>status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER</code>.<br>\n2. Si <code>port.trust == 'UNTRUSTED'</code> et <code>type in ['DISCOVER', 'REQUEST']</code> :<br>\n   <code>status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST</code>.<br>\n3. Si <code>port.trust == 'TRUSTED'</code> :<br>\n   <code>status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC</code>.<br>\n   (Si de plus <code>type == 'ACK'</code> et <code>assigned_ip != '0.0.0.0'</code>, la liaison est insérée dans la base de données Snooping).<br><br>\nPour chaque message, afficher :<br>\n<code>DHCP_SNOOP_REPORT id={id} port={port} type={type} status={status} action={action} reason={reason}</code></p>",
    "starter": "# Grille d'analyse (lan3-c5-e2) — Validateur de base de données de liaison DHCP Snooping\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tentative d'émission de DHCP ACK frauduleux sur port utilisateur]\n# Données : PORT_TRUST name=Fa0/12 trust=UNTRUSTED\n# Données : DHCP_MSG id=ROGUE_ACK port=Fa0/12 type=ACK client_mac=00:aa:bb:cc:dd:ee assigned_ip=10.0.0.99 vlan=1\nA_COMPLETER\n\n[Cas 2 — Requête REQUEST valide émise sur port untrusted]\n# Données : PORT_TRUST name=Gi0/2 trust=UNTRUSTED\n# Données : DHCP_MSG id=REQ1 port=Gi0/2 type=REQUEST client_mac=00:50:56:11:22:33 assigned_ip=172.16.1.100 vlan=20\nA_COMPLETER\n\n[Cas 3 — Uplink de distribution de confiance acheminant Discover et Offer]\n# Données : PORT_TRUST name=Trunk1 trust=TRUSTED\n# Données : DHCP_MSG id=UPL1 port=Trunk1 type=DISCOVER client_mac=00:00:00:00:00:01 assigned_ip=0.0.0.0 vlan=100\n# Données : DHCP_MSG id=UPL2 port=Trunk1 type=OFFER client_mac=00:00:00:00:00:01 assigned_ip=10.100.0.5 vlan=100\nA_COMPLETER\n",
    "hints": [
      "Mémoriser le statut de chaque port (TRUSTED ou UNTRUSTED).",
      "Identifier les réponses serveur OFFER et ACK arrivant sur port UNTRUSTED."
    ],
    "examples": [
      {
        "stdin": "PORT_TRUST name=Gi0/1 trust=UNTRUSTED\nPORT_TRUST name=Gi0/24 trust=TRUSTED\nDHCP_MSG id=M1 port=Gi0/1 type=DISCOVER client_mac=00:11:22:33:44:01 assigned_ip=0.0.0.0 vlan=10\nDHCP_MSG id=M2 port=Gi0/1 type=OFFER client_mac=00:11:22:33:44:01 assigned_ip=192.168.10.50 vlan=10\nDHCP_MSG id=M3 port=Gi0/24 type=ACK client_mac=00:11:22:33:44:01 assigned_ip=192.168.10.50 vlan=10",
        "expected": "DHCP_SNOOP_REPORT id=M1 port=Gi0/1 type=DISCOVER status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST\nDHCP_SNOOP_REPORT id=M2 port=Gi0/1 type=OFFER status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER\nDHCP_SNOOP_REPORT id=M3 port=Gi0/24 type=ACK status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC",
        "note": "M1 est un Discover client normal ; M2 est une tentative d'usurpation DHCP serveur sur port non fiable ; M3 est la réponse légitime du serveur."
      }
    ],
    "tests": [
      {
        "label": "Tentative d'émission de DHCP ACK frauduleux sur port utilisateur",
        "stdin": "cas:1",
        "expected": "DHCP_SNOOP_REPORT id=ROGUE_ACK port=Fa0/12 type=ACK status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER"
      },
      {
        "label": "Requête REQUEST valide émise sur port untrusted",
        "stdin": "cas:2",
        "expected": "DHCP_SNOOP_REPORT id=REQ1 port=Gi0/2 type=REQUEST status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST"
      },
      {
        "label": "Uplink de distribution de confiance acheminant Discover et Offer",
        "stdin": "cas:3",
        "expected": "DHCP_SNOOP_REPORT id=UPL1 port=Trunk1 type=DISCOVER status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC\nDHCP_SNOOP_REPORT id=UPL2 port=Trunk1 type=OFFER status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC"
      }
    ],
    "solution": "[Exemple]\nDHCP_SNOOP_REPORT id=M1 port=Gi0/1 type=DISCOVER status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST\nDHCP_SNOOP_REPORT id=M2 port=Gi0/1 type=OFFER status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER\nDHCP_SNOOP_REPORT id=M3 port=Gi0/24 type=ACK status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC\n\n[Cas 1 — Tentative d'émission de DHCP ACK frauduleux sur port utilisateur]\nDHCP_SNOOP_REPORT id=ROGUE_ACK port=Fa0/12 type=ACK status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER\n\n[Cas 2 — Requête REQUEST valide émise sur port untrusted]\nDHCP_SNOOP_REPORT id=REQ1 port=Gi0/2 type=REQUEST status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST\n\n[Cas 3 — Uplink de distribution de confiance acheminant Discover et Offer]\nDHCP_SNOOP_REPORT id=UPL1 port=Trunk1 type=DISCOVER status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC\nDHCP_SNOOP_REPORT id=UPL2 port=Trunk1 type=OFFER status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC"
  },
  {
    "id": "lan3-c5-e3",
    "chapter": 5,
    "title": "Filtre anti-usurpation Dynamic ARP Inspection (DAI)",
    "level": "n3",
    "language": "analyse",
    "goal": "Valider les trames ARP en croisant les couples (IP, MAC) avec la base de données DHCP Snooping.",
    "brief": "<p>L'attaque par <strong>empoisonnement de cache ARP (ARP Poisoning / ARP Spoofing)</strong> permet à un pirate d'intercepter tout le trafic d'un sous-réseau en s'interposant entre les postes et la passerelle (Man-in-the-Middle).<br>\nLe mécanisme <strong>Dynamic ARP Inspection (DAI)</strong> intercepte toutes les requêtes et réponses ARP sur les ports non fiables et valide la cohérence du couple <code>(sender_ip, sender_mac)</code> par rapport à la base de liaison <strong>DHCP Snooping Binding Database</strong>.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Si le couple <code>(sender_mac, sender_ip, vlan)</code> correspond exactement à une entrée de la base BINDING :<br>\n   <code>status=PERMIT action=FORWARD reason=BINDING_MATCH</code>.<br>\n2. Si <code>sender_ip</code> existe dans la base pour ce <code>vlan</code> mais avec une <code>mac</code> différente (usurpation d'IP avérée) :<br>\n   <code>status=DENY action=DROP_ALERT reason=ARP_SPOOFING_DETECTED</code>.<br>\n3. Si <code>sender_ip</code> n'existe pas du tout dans la base de données :<br>\n   <code>status=DENY action=DROP reason=UNKNOWN_HOST_BINDING</code>.<br><br>\nPour chaque paquet ARP, afficher :<br>\n<code>DAI_AUDIT id={id} vlan={vlan} sender_ip={sender_ip} sender_mac={sender_mac} status={status} action={action} reason={reason}</code></p>",
    "starter": "# Grille d'analyse (lan3-c5-e3) — Filtre anti-usurpation Dynamic ARP Inspection (DAI)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VLANs multiples avec la même IP privée dans des domaines isolés]\n# Données : BINDING mac=00:00:00:00:00:01 ip=10.0.0.1 vlan=10\n# Données : BINDING mac=00:00:00:00:00:02 ip=10.0.0.1 vlan=20\n# Données : ARP_FRAME id=A1 vlan=10 sender_mac=00:00:00:00:00:01 sender_ip=10.0.0.1 target_ip=10.0.0.254\n# Données : ARP_FRAME id=A2 vlan=20 sender_mac=00:00:00:00:00:01 sender_ip=10.0.0.1 target_ip=10.0.0.254\nA_COMPLETER\n\n[Cas 2 — Toutes requêtes ARP légitimes]\n# Données : BINDING mac=00:22:33:44:55:66 ip=172.16.10.5 vlan=5\n# Données : ARP_FRAME id=OK vlan=5 sender_mac=00:22:33:44:55:66 sender_ip=172.16.10.5 target_ip=172.16.10.1\nA_COMPLETER\n\n[Cas 3 — Hôte inconnu non attribué par DHCP]\n# Données : BINDING mac=00:11:11:11:11:11 ip=192.168.1.5 vlan=1\n# Données : ARP_FRAME id=ROGUE vlan=1 sender_mac=00:99:99:99:99:99 sender_ip=192.168.1.200 target_ip=192.168.1.1\nA_COMPLETER\n",
    "hints": [
      "Normaliser les adresses MAC en minuscules.",
      "Gérer un dictionnaire indexé par (vlan, sender_ip) renvoyant la MAC légitime."
    ],
    "examples": [
      {
        "stdin": "BINDING mac=00:11:22:33:44:01 ip=192.168.1.10 vlan=10\nBINDING mac=00:11:22:33:44:02 ip=192.168.1.20 vlan=10\nARP_FRAME id=ARP1 vlan=10 sender_mac=00:11:22:33:44:01 sender_ip=192.168.1.10 target_ip=192.168.1.1\nARP_FRAME id=ARP2 vlan=10 sender_mac=00:aa:bb:cc:dd:ee sender_ip=192.168.1.10 target_ip=192.168.1.20\nARP_FRAME id=ARP3 vlan=10 sender_mac=00:11:22:33:44:99 sender_ip=192.168.1.99 target_ip=192.168.1.1",
        "expected": "DAI_AUDIT id=ARP1 vlan=10 sender_ip=192.168.1.10 sender_mac=00:11:22:33:44:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=ARP2 vlan=10 sender_ip=192.168.1.10 sender_mac=00:aa:bb:cc:dd:ee status=DENY action=DROP_ALERT reason=ARP_SPOOFING_DETECTED\nDAI_AUDIT id=ARP3 vlan=10 sender_ip=192.168.1.99 sender_mac=00:11:22:33:44:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING",
        "note": "ARP1 est légitime ; ARP2 usurpe l'IP 192.168.1.10 avec une fausse MAC ; ARP3 est inconnu dans le bail DHCP."
      }
    ],
    "tests": [
      {
        "label": "VLANs multiples avec la même IP privée dans des domaines isolés",
        "stdin": "cas:1",
        "expected": "DAI_AUDIT id=A1 vlan=10 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=A2 vlan=20 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=DENY action=DROP_ALERT reason=ARP_SPOOFING_DETECTED"
      },
      {
        "label": "Toutes requêtes ARP légitimes",
        "stdin": "cas:2",
        "expected": "DAI_AUDIT id=OK vlan=5 sender_ip=172.16.10.5 sender_mac=00:22:33:44:55:66 status=PERMIT action=FORWARD reason=BINDING_MATCH"
      },
      {
        "label": "Hôte inconnu non attribué par DHCP",
        "stdin": "cas:3",
        "expected": "DAI_AUDIT id=ROGUE vlan=1 sender_ip=192.168.1.200 sender_mac=00:99:99:99:99:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING"
      }
    ],
    "solution": "[Exemple]\nDAI_AUDIT id=ARP1 vlan=10 sender_ip=192.168.1.10 sender_mac=00:11:22:33:44:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=ARP2 vlan=10 sender_ip=192.168.1.10 sender_mac=00:aa:bb:cc:dd:ee status=DENY action=DROP_ALERT reason=ARP_SPOOFING_DETECTED\nDAI_AUDIT id=ARP3 vlan=10 sender_ip=192.168.1.99 sender_mac=00:11:22:33:44:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING\n\n[Cas 1 — VLANs multiples avec la même IP privée dans des domaines isolés]\nDAI_AUDIT id=A1 vlan=10 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=A2 vlan=20 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=DENY action=DROP_ALERT reason=ARP_SPOOFING_DETECTED\n\n[Cas 2 — Toutes requêtes ARP légitimes]\nDAI_AUDIT id=OK vlan=5 sender_ip=172.16.10.5 sender_mac=00:22:33:44:55:66 status=PERMIT action=FORWARD reason=BINDING_MATCH\n\n[Cas 3 — Hôte inconnu non attribué par DHCP]\nDAI_AUDIT id=ROGUE vlan=1 sender_ip=192.168.1.200 sender_mac=00:99:99:99:99:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING"
  },
  {
    "id": "lan3-c6-e1",
    "chapter": 6,
    "title": "Convertisseur et mappeur de marquage QoS (CoS 802.1p vers DSCP DiffServ)",
    "level": "n1",
    "language": "analyse",
    "goal": "Mettre en correspondance le marquage de couche 2 (CoS 802.1p) avec les classes DiffServ DSCP de couche 3.",
    "brief": "<p>Dans un réseau de campus convergé transportant simultanément de la voix, de la vidéo et des données critiques, la <strong>Qualité de Service (QoS)</strong> garantit le traitement prioritaire des flux sensibles à la gigue et à la latence.<br><br>\nLe champ PCP (Priority Code Point / CoS) de l'en-tête 802.1Q code 8 niveaux de priorité (0 à 7). Au niveau IP (couche 3), le champ DS (Differentiated Services / RFC 2474) utilise les 6 bits supérieurs de l'octet ToS (DSCP, valeurs de 0 à 63).<br><br>\nTable de correspondance standard IETF / Cisco :<br>\n- <strong>CoS 0 (Best Effort) :</strong> DSCP 0 (décimal) &rarr; <code>PHB=BE</code> (Best Effort).<br>\n- <strong>CoS 1 (Background) :</strong> DSCP 8 &rarr; <code>PHB=CS1</code> (Class Selector 1).<br>\n- <strong>CoS 2 (Standard Data) :</strong> DSCP 16 &rarr; <code>PHB=CS2</code>.<br>\n- <strong>CoS 3 (Critical Data) :</strong> DSCP 24 &rarr; <code>PHB=CS3</code>.<br>\n- <strong>CoS 4 (Streaming Video) :</strong> DSCP 34 &rarr; <code>PHB=AF41</code> (Assured Forwarding 41).<br>\n- <strong>CoS 5 (Voice / VoIP) :</strong> DSCP 46 &rarr; <code>PHB=EF</code> (Expedited Forwarding).<br>\n- <strong>CoS 6 (Internetwork Control) :</strong> DSCP 48 &rarr; <code>PHB=CS6</code>.<br>\n- <strong>CoS 7 (Network Control) :</strong> DSCP 56 &rarr; <code>PHB=CS7</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas..7&gt; traffic=&lt;nom_flux&gt;</code><br><br>\nPour chaque paquet, convertir la CoS en valeur DSCP décimale, en binaire sur 6 bits et en classe PHB :<br>\n<code>QOS_MAP id={id} cos={cos} dscp_dec={dscp_dec} dscp_bin={dscp_6bits} phb={phb} traffic={traffic}</code></p>",
    "starter": "# Grille d'analyse (lan3-c6-e1) — Convertisseur et mappeur de marquage QoS (CoS 802.1p vers DSCP DiffServ)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trafic de contrôle réseau et données critiques (CoS 6 et CoS 3)]\n# Données : FRAME_QOS id=BGP_SYNC cos=6 traffic=Routing_BGP\n# Données : FRAME_QOS id=DB_QUERY cos=3 traffic=Oracle_ERP\nA_COMPLETER\n\n[Cas 2 — Trafic de fond Background (CoS 1)]\n# Données : FRAME_QOS id=BK1 cos=1 traffic=Torrent_Peer\nA_COMPLETER\n\n[Cas 3 — Contrôle critique CoS 7]\n# Données : FRAME_QOS id=STP_CTRL cos=7 traffic=BPDU_Frame\nA_COMPLETER\n",
    "hints": [
      "Gérer un dictionnaire indexé par la valeur de cos (0 à 7).",
      "Formater dscp_bin sur 6 bits avec f\"{dscp_dec:06b}\"."
    ],
    "examples": [
      {
        "stdin": "FRAME_QOS id=P1 cos=5 traffic=VoIP_RTP\nFRAME_QOS id=P2 cos=4 traffic=Video_Conf\nFRAME_QOS id=P3 cos=0 traffic=Web_HTTP",
        "expected": "QOS_MAP id=P1 cos=5 dscp_dec=46 dscp_bin=101110 phb=EF traffic=VoIP_RTP\nQOS_MAP id=P2 cos=4 dscp_dec=34 dscp_bin=100010 phb=AF41 traffic=Video_Conf\nQOS_MAP id=P3 cos=0 dscp_dec=0 dscp_bin=000000 phb=BE traffic=Web_HTTP",
        "note": "CoS 5 est mappé vers Expedited Forwarding (DSCP 46 / 101110b) ; CoS 4 vers AF41 ; CoS 0 vers Best Effort."
      }
    ],
    "tests": [
      {
        "label": "Trafic de contrôle réseau et données critiques (CoS 6 et CoS 3)",
        "stdin": "cas:1",
        "expected": "QOS_MAP id=BGP_SYNC cos=6 dscp_dec=48 dscp_bin=110000 phb=CS6 traffic=Routing_BGP\nQOS_MAP id=DB_QUERY cos=3 dscp_dec=24 dscp_bin=011000 phb=CS3 traffic=Oracle_ERP"
      },
      {
        "label": "Trafic de fond Background (CoS 1)",
        "stdin": "cas:2",
        "expected": "QOS_MAP id=BK1 cos=1 dscp_dec=8 dscp_bin=001000 phb=CS1 traffic=Torrent_Peer"
      },
      {
        "label": "Contrôle critique CoS 7",
        "stdin": "cas:3",
        "expected": "QOS_MAP id=STP_CTRL cos=7 dscp_dec=56 dscp_bin=111000 phb=CS7 traffic=BPDU_Frame"
      }
    ],
    "solution": "[Exemple]\nQOS_MAP id=P1 cos=5 dscp_dec=46 dscp_bin=101110 phb=EF traffic=VoIP_RTP\nQOS_MAP id=P2 cos=4 dscp_dec=34 dscp_bin=100010 phb=AF41 traffic=Video_Conf\nQOS_MAP id=P3 cos=0 dscp_dec=0 dscp_bin=000000 phb=BE traffic=Web_HTTP\n\n[Cas 1 — Trafic de contrôle réseau et données critiques (CoS 6 et CoS 3)]\nQOS_MAP id=BGP_SYNC cos=6 dscp_dec=48 dscp_bin=110000 phb=CS6 traffic=Routing_BGP\nQOS_MAP id=DB_QUERY cos=3 dscp_dec=24 dscp_bin=011000 phb=CS3 traffic=Oracle_ERP\n\n[Cas 2 — Trafic de fond Background (CoS 1)]\nQOS_MAP id=BK1 cos=1 dscp_dec=8 dscp_bin=001000 phb=CS1 traffic=Torrent_Peer\n\n[Cas 3 — Contrôle critique CoS 7]\nQOS_MAP id=STP_CTRL cos=7 dscp_dec=56 dscp_bin=111000 phb=CS7 traffic=BPDU_Frame"
  },
  {
    "id": "lan3-c6-e2",
    "chapter": 6,
    "title": "Simulateur d'ordonnancement de files d'attente (Strict Priority vs WRR)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler le traitement des paquets en sortie selon les algorithmes d'ordonnancement Strict Priority et Weighted Round-Robin.",
    "brief": "<p>À la sortie des ports de commutateurs de campus, les paquets sont dirigés vers différentes files d'attente (Queues : Q1 Priorité Haute / Voix, Q2 Vidéo, Q3 Données Best-Effort) :<br><br>\nAlgorithmes d'ordonnancement :<br>\n- <strong>STRICT_PRIORITY :</strong> Tant que Q1 contient des paquets, elle est dépilée prioritairement. Si Q1 est vide, Q2 est traitée. Si Q1 et Q2 sont vides, Q3 est traitée.<br>\n- <strong>WEIGHTED_ROUND_ROBIN (WRR) :</strong> Chaque tour de service dépile jusqu'à <code>W1</code> paquets de Q1, puis <code>W2</code> paquets de Q2, puis <code>W3</code> paquets de Q3. Si une file est vide avant d'avoir atteint son quota, l'ordonnanceur passe à la file suivante.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br>\n- Les paquets en attente dans les files :<br>\n  <code>ENQUEUE queue=&lt;Q1|Q2|Q3&gt; pkt_id=&lt;nom&gt;</code><br><br>\nExécuter jusqu'à <code>max_dequeues</code> dépilements (ou jusqu'à ce que toutes les files soient vides) et afficher :<br>\n<code>DEQUEUE_EVENT step={step} queue={queue} pkt_id={pkt_id} mode={mode}</code></p>",
    "starter": "# Grille d'analyse (lan3-c6-e2) — Simulateur d'ordonnancement de files d'attente (Strict Priority vs WRR)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode WRR avec poids 2, 1, 1]\n# Données : SCHEDULER mode=WEIGHTED_ROUND_ROBIN weights=2,1,1 max_dequeues=5\n# Données : ENQUEUE queue=Q1 pkt_id=V1\n# Données : ENQUEUE queue=Q1 pkt_id=V2\n# Données : ENQUEUE queue=Q1 pkt_id=V3\n# Données : ENQUEUE queue=Q2 pkt_id=M1\n# Données : ENQUEUE queue=Q3 pkt_id=D1\nA_COMPLETER\n\n[Cas 2 — File prioritaire vide permettant le passage immédiat aux files inférieures]\n# Données : SCHEDULER mode=STRICT_PRIORITY weights=1,1,1 max_dequeues=2\n# Données : ENQUEUE queue=Q2 pkt_id=VID_SOLO\n# Données : ENQUEUE queue=Q3 pkt_id=DATA_SOLO\nA_COMPLETER\n\n[Cas 3 — Arrêt anticipé quand toutes les files sont vides avant max_dequeues]\n# Données : SCHEDULER mode=WEIGHTED_ROUND_ROBIN weights=1,1,1 max_dequeues=10\n# Données : ENQUEUE queue=Q1 pkt_id=P1\n# Données : ENQUEUE queue=Q2 pkt_id=P2\nA_COMPLETER\n",
    "hints": [
      "Gérer 3 listes FIFO pour Q1, Q2 et Q3.",
      "En STRICT_PRIORITY : dépiler Q1 si non vide, sinon Q2, sinon Q3.",
      "En WRR : boucler sur les tours (take up to W1 from Q1, up to W2 from Q2, up to W3 from Q3)."
    ],
    "examples": [
      {
        "stdin": "SCHEDULER mode=STRICT_PRIORITY weights=1,1,1 max_dequeues=4\nENQUEUE queue=Q1 pkt_id=VOIP1\nENQUEUE queue=Q3 pkt_id=DATA1\nENQUEUE queue=Q1 pkt_id=VOIP2\nENQUEUE queue=Q2 pkt_id=VID1",
        "expected": "DEQUEUE_EVENT step=1 queue=Q1 pkt_id=VOIP1 mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=2 queue=Q1 pkt_id=VOIP2 mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=3 queue=Q2 pkt_id=VID1 mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=4 queue=Q3 pkt_id=DATA1 mode=STRICT_PRIORITY",
        "note": "Strict Priority dépile intégralement Q1 (VOIP1, VOIP2) avant de toucher à Q2 (VID1) puis Q3 (DATA1)."
      }
    ],
    "tests": [
      {
        "label": "Mode WRR avec poids 2, 1, 1",
        "stdin": "cas:1",
        "expected": "DEQUEUE_EVENT step=1 queue=Q1 pkt_id=V1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=2 queue=Q1 pkt_id=V2 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=3 queue=Q2 pkt_id=M1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=4 queue=Q3 pkt_id=D1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=5 queue=Q1 pkt_id=V3 mode=WEIGHTED_ROUND_ROBIN"
      },
      {
        "label": "File prioritaire vide permettant le passage immédiat aux files inférieures",
        "stdin": "cas:2",
        "expected": "DEQUEUE_EVENT step=1 queue=Q2 pkt_id=VID_SOLO mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=2 queue=Q3 pkt_id=DATA_SOLO mode=STRICT_PRIORITY"
      },
      {
        "label": "Arrêt anticipé quand toutes les files sont vides avant max_dequeues",
        "stdin": "cas:3",
        "expected": "DEQUEUE_EVENT step=1 queue=Q1 pkt_id=P1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=2 queue=Q2 pkt_id=P2 mode=WEIGHTED_ROUND_ROBIN"
      }
    ],
    "solution": "[Exemple]\nDEQUEUE_EVENT step=1 queue=Q1 pkt_id=VOIP1 mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=2 queue=Q1 pkt_id=VOIP2 mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=3 queue=Q2 pkt_id=VID1 mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=4 queue=Q3 pkt_id=DATA1 mode=STRICT_PRIORITY\n\n[Cas 1 — Mode WRR avec poids 2, 1, 1]\nDEQUEUE_EVENT step=1 queue=Q1 pkt_id=V1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=2 queue=Q1 pkt_id=V2 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=3 queue=Q2 pkt_id=M1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=4 queue=Q3 pkt_id=D1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=5 queue=Q1 pkt_id=V3 mode=WEIGHTED_ROUND_ROBIN\n\n[Cas 2 — File prioritaire vide permettant le passage immédiat aux files inférieures]\nDEQUEUE_EVENT step=1 queue=Q2 pkt_id=VID_SOLO mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=2 queue=Q3 pkt_id=DATA_SOLO mode=STRICT_PRIORITY\n\n[Cas 3 — Arrêt anticipé quand toutes les files sont vides avant max_dequeues]\nDEQUEUE_EVENT step=1 queue=Q1 pkt_id=P1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=2 queue=Q2 pkt_id=P2 mode=WEIGHTED_ROUND_ROBIN"
  },
  {
    "id": "lan3-c6-e3",
    "chapter": 6,
    "title": "Parseur de trames de découverte de voisins LLDP (IEEE 802.1AB)",
    "level": "n3",
    "language": "analyse",
    "goal": "Extraire et structurer les attributs TLV d'une trame de découverte de réseau LLDP.",
    "brief": "<p>Le protocole standard <strong>LLDP (Link Layer Discovery Protocol - IEEE 802.1AB)</strong> permet aux commutateurs, routeurs et téléphones IP de s'annoncer mutuellement sur un réseau local hétérogène (alternative ouverte à CDP).<br><br>\nChaque trame LLDP contient une suite de champs <strong>TLV (Type - Length - Value)</strong> :<br>\n- <strong>Chassis ID (Type 1) :</strong> Identifiant physique du châssis (adresse MAC ou nom).<br>\n- <strong>Port ID (Type 2) :</strong> Nom ou numéro de port émetteur.<br>\n- <strong>Time To Live (Type 3) :</strong> Durée de rétention en secondes (TTL).<br>\n- <strong>System Name (Type 5) :</strong> Nom d'hôte du commutateur émetteur.<br>\n- <strong>System Capabilities (Type 7) :</strong> Capacités actives (ex: <code>Bridge</code>, <code>Router</code>, <code>Telephone</code>).<br>\n- <strong>Management Address (Type 8) :</strong> Adresse IP d'administration.<br><br>\nAnalysez les paramètres du problème pour chaque cas.</p>",
    "starter": "# Grille d'analyse (lan3-c6-e3) — Parseur de trames de découverte de voisins LLDP (IEEE 802.1AB)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Voisin téléphone IP avec champs optionnels partiels]\n# Données : NEIGHBOR_DISCOVERY local_port=Fa0/8\n# Données : TLV type=1 value=00:50:60:aa:bb:cc\n# Données : TLV type=2 value=Port1\n# Données : TLV type=3 value=180\n# Données : TLV type=5 value=VOIP-PHONE-402\n# Données : TLV type=7 value=Telephone\n# Données : END_DISCOVERY\nA_COMPLETER\n\n[Cas 2 — Plusieurs voisins découverts sur des ports distincts]\n# Données : NEIGHBOR_DISCOVERY local_port=Te1/1\n# Données : TLV type=1 value=00:aa:00:00:00:01\n# Données : TLV type=2 value=TenGig0/1\n# Données : TLV type=3 value=120\n# Données : TLV type=5 value=CORE-A\n# Données : TLV type=8 value=192.168.0.1\n# Données : END_DISCOVERY\n# Données : NEIGHBOR_DISCOVERY local_port=Te1/2\n# Données : TLV type=1 value=00:aa:00:00:00:02\n# Données : TLV type=2 value=TenGig0/1\n# Données : TLV type=3 value=120\n# Données : TLV type=5 value=CORE-B\n# Données : TLV type=8 value=192.168.0.2\n# Données : END_DISCOVERY\nA_COMPLETER\n\n[Cas 3 — Trame minimale avec Chassis, Port et TTL uniquement]\n# Données : NEIGHBOR_DISCOVERY local_port=Gi0/10\n# Données : TLV type=1 value=02:00:00:11:22:33\n# Données : TLV type=2 value=eth0\n# Données : TLV type=3 value=60\n# Données : END_DISCOVERY\nA_COMPLETER\n",
    "hints": [
      "Regrouper les lignes entre NEIGHBOR_DISCOVERY et END_DISCOVERY.",
      "Associer type 1=chassis, 2=port_id, 3=ttl, 5=sys_name, 7=caps, 8=mgmt_ip."
    ],
    "examples": [
      {
        "stdin": "NEIGHBOR_DISCOVERY local_port=Gi0/1\nTLV type=1 value=00:11:22:33:44:aa\nTLV type=2 value=GigabitEthernet1/0/24\nTLV type=3 value=120\nTLV type=5 value=SW-DISTRIBUTION-01\nTLV type=7 value=Bridge,Router\nTLV type=8 value=10.0.0.254\nEND_DISCOVERY",
        "expected": "LLDP_NEIGHBOR local_port=Gi0/1 remote_sys=SW-DISTRIBUTION-01 remote_port=GigabitEthernet1/0/24 chassis=00:11:22:33:44:aa mgmt_ip=10.0.0.254 caps=Bridge,Router ttl=120s",
        "note": "Extraction complète des 6 TLVs standards d'un voisin de distribution."
      }
    ],
    "tests": [
      {
        "label": "Voisin téléphone IP avec champs optionnels partiels",
        "stdin": "cas:1",
        "expected": "LLDP_NEIGHBOR local_port=Fa0/8 remote_sys=VOIP-PHONE-402 remote_port=Port1 chassis=00:50:60:aa:bb:cc mgmt_ip=NONE caps=Telephone ttl=180s"
      },
      {
        "label": "Plusieurs voisins découverts sur des ports distincts",
        "stdin": "cas:2",
        "expected": "LLDP_NEIGHBOR local_port=Te1/1 remote_sys=CORE-A remote_port=TenGig0/1 chassis=00:aa:00:00:00:01 mgmt_ip=192.168.0.1 caps=NONE ttl=120s\nLLDP_NEIGHBOR local_port=Te1/2 remote_sys=CORE-B remote_port=TenGig0/1 chassis=00:aa:00:00:00:02 mgmt_ip=192.168.0.2 caps=NONE ttl=120s"
      },
      {
        "label": "Trame minimale avec Chassis, Port et TTL uniquement",
        "stdin": "cas:3",
        "expected": "LLDP_NEIGHBOR local_port=Gi0/10 remote_sys=NONE remote_port=eth0 chassis=02:00:00:11:22:33 mgmt_ip=NONE caps=NONE ttl=60s"
      }
    ],
    "solution": "[Exemple]\nLLDP_NEIGHBOR local_port=Gi0/1 remote_sys=SW-DISTRIBUTION-01 remote_port=GigabitEthernet1/0/24 chassis=00:11:22:33:44:aa mgmt_ip=10.0.0.254 caps=Bridge,Router ttl=120s\n\n[Cas 1 — Voisin téléphone IP avec champs optionnels partiels]\nLLDP_NEIGHBOR local_port=Fa0/8 remote_sys=VOIP-PHONE-402 remote_port=Port1 chassis=00:50:60:aa:bb:cc mgmt_ip=NONE caps=Telephone ttl=180s\n\n[Cas 2 — Plusieurs voisins découverts sur des ports distincts]\nLLDP_NEIGHBOR local_port=Te1/1 remote_sys=CORE-A remote_port=TenGig0/1 chassis=00:aa:00:00:00:01 mgmt_ip=192.168.0.1 caps=NONE ttl=120s\nLLDP_NEIGHBOR local_port=Te1/2 remote_sys=CORE-B remote_port=TenGig0/1 chassis=00:aa:00:00:00:02 mgmt_ip=192.168.0.2 caps=NONE ttl=120s\n\n[Cas 3 — Trame minimale avec Chassis, Port et TTL uniquement]\nLLDP_NEIGHBOR local_port=Gi0/10 remote_sys=NONE remote_port=eth0 chassis=02:00:00:11:22:33 mgmt_ip=NONE caps=NONE ttl=60s"
  }
];
