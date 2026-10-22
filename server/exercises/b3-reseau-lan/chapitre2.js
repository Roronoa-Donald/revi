'use strict';

module.exports = [
  {
    "id": "lan3-c2-e1",
    "chapter": 2,
    "title": "Négociateur d'agrégation EtherChannel (LACP 802.3ad vs PAgP vs ON)",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer si un lien EtherChannel s'établit entre deux commutateurs selon les protocoles et modes configurés.",
    "brief": "<p>L'agrégation de liens (<strong>EtherChannel</strong>) regroupe jusqu'à 8 liaisons Ethernet physiques en un seul lien logique (Port-Channel) pour multiplier la bande passante et assurer la tolérance aux pannes.<br><br>\nLes protocoles de négociation et leurs modes associés :<br>\n- <strong>LACP (IEEE 802.3ad / 802.1AX) :</strong> modes <code>ACTIVE</code> (sollicite activement) et <code>PASSIVE</code> (attend les trames LACP).<br>\n  - <code>ACTIVE + ACTIVE</code> ou <code>ACTIVE + PASSIVE</code> &rarr; <code>CHANNEL_UP (LACP)</code>.<br>\n  - <code>PASSIVE + PASSIVE</code> &rarr; <code>NO_CHANNEL (PASSIVE_MISMATCH)</code>.<br>\n- <strong>PAgP (Cisco propriétaire) :</strong> modes <code>DESIRABLE</code> (sollicite) et <code>AUTO</code> (attend).<br>\n  - <code>DESIRABLE + DESIRABLE</code> ou <code>DESIRABLE + AUTO</code> &rarr; <code>CHANNEL_UP (PAGP)</code>.<br>\n  - <code>AUTO + AUTO</code> &rarr; <code>NO_CHANNEL (AUTO_MISMATCH)</code>.<br>\n- <strong>Statique (Mode ON forcé sans protocole) :</strong> mode <code>ON</code>.<br>\n  - <code>ON + ON</code> &rarr; <code>CHANNEL_UP (STATIC)</code>.<br>\n  - <code>ON + (LACP ou PAgP)</code> &rarr; <code>ERROR_MISMATCH</code>.<br>\n- <strong>Mélange de protocoles incompatibles (ex: LACP + PAgP) :</strong> &rarr; <code>ERROR_PROTOCOL_INCOMPATIBLE</code>.<br><br>\nl’étude de cas comporte dans l’énoncé du cas des scénarios de négociation :<br>\n<code>NEGOTIATION id=&lt;nom&gt; side_a_proto=&lt;LACP|PAGP|STATIC&gt; side_a_mode=&lt;ACTIVE|PASSIVE|DESIRABLE|AUTO|ON&gt; side_b_proto=&lt;LACP|PAGP|STATIC&gt; side_b_mode=&lt;ACTIVE|PASSIVE|DESIRABLE|AUTO|ON&gt;</code><br><br>\nPour chaque négociation, afficher :<br>\n<code>ETHERCHANNEL_EVAL id={id} status={status} proto={matched_proto} detail={detail}</code></p>",
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
  }
];
