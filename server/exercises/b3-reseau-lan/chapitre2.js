/**
 * Exercices Chapitre 2 — Réseau LAN Avancé B3.
 * Agrégation de Liens & Redondance de Niveau 2 (EtherChannel, LACP & PAgP).
 */
'use strict';

module.exports = [
  {
    id: 'lan3-c2-e1',
    chapter: 2,
    title: 'Négociateur d\'agrégation EtherChannel (LACP 802.3ad vs PAgP vs ON)',
    level: 'n1',
    language: 'python',
    goal: 'Déterminer si un lien EtherChannel s\'établit entre deux commutateurs selon les protocoles et modes configurés.',
    brief: `<p>L'agrégation de liens (<strong>EtherChannel</strong>) regroupe jusqu'à 8 liaisons Ethernet physiques en un seul lien logique (Port-Channel) pour multiplier la bande passante et assurer la tolérance aux pannes.<br><br>
Les protocoles de négociation et leurs modes associés :<br>
- <strong>LACP (IEEE 802.3ad / 802.1AX) :</strong> modes <code>ACTIVE</code> (sollicite activement) et <code>PASSIVE</code> (attend les trames LACP).<br>
  - <code>ACTIVE + ACTIVE</code> ou <code>ACTIVE + PASSIVE</code> &rarr; <code>CHANNEL_UP (LACP)</code>.<br>
  - <code>PASSIVE + PASSIVE</code> &rarr; <code>NO_CHANNEL (PASSIVE_MISMATCH)</code>.<br>
- <strong>PAgP (Cisco propriétaire) :</strong> modes <code>DESIRABLE</code> (sollicite) et <code>AUTO</code> (attend).<br>
  - <code>DESIRABLE + DESIRABLE</code> ou <code>DESIRABLE + AUTO</code> &rarr; <code>CHANNEL_UP (PAGP)</code>.<br>
  - <code>AUTO + AUTO</code> &rarr; <code>NO_CHANNEL (AUTO_MISMATCH)</code>.<br>
- <strong>Statique (Mode ON forcé sans protocole) :</strong> mode <code>ON</code>.<br>
  - <code>ON + ON</code> &rarr; <code>CHANNEL_UP (STATIC)</code>.<br>
  - <code>ON + (LACP ou PAgP)</code> &rarr; <code>ERROR_MISMATCH</code>.<br>
- <strong>Mélange de protocoles incompatibles (ex: LACP + PAgP) :</strong> &rarr; <code>ERROR_PROTOCOL_INCOMPATIBLE</code>.<br><br>
Le script lit sur l'entrée standard des scénarios de négociation :<br>
<code>NEGOTIATION id=&lt;nom&gt; side_a_proto=&lt;LACP|PAGP|STATIC&gt; side_a_mode=&lt;ACTIVE|PASSIVE|DESIRABLE|AUTO|ON&gt; side_b_proto=&lt;LACP|PAGP|STATIC&gt; side_b_mode=&lt;ACTIVE|PASSIVE|DESIRABLE|AUTO|ON&gt;</code><br><br>
Pour chaque négociation, afficher :<br>
<code>ETHERCHANNEL_EVAL id={id} status={status} proto={matched_proto} detail={detail}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la compatibilité des protocoles et modes EtherChannel
`,
    hints: [
      'Vérifier d\'abord si side_a_proto == side_b_proto.',
      'Si LACP : formé sauf si les deux côtés sont PASSIVE.',
      'Si PAGP : formé sauf si les deux côtés sont AUTO.',
      'Si STATIC : formé uniquement si les deux côtés sont ON.'
    ],
    examples: [
      {
        stdin: 'NEGOTIATION id=LINK1 side_a_proto=LACP side_a_mode=ACTIVE side_b_proto=LACP side_b_mode=PASSIVE\nNEGOTIATION id=LINK2 side_a_proto=LACP side_a_mode=PASSIVE side_b_proto=LACP side_b_mode=PASSIVE\nNEGOTIATION id=LINK3 side_a_proto=PAGP side_a_mode=DESIRABLE side_b_proto=PAGP side_b_mode=AUTO\nNEGOTIATION id=LINK4 side_a_proto=LACP side_a_mode=ACTIVE side_b_proto=PAGP side_b_mode=DESIRABLE',
        expected: 'ETHERCHANNEL_EVAL id=LINK1 status=CHANNEL_UP proto=LACP detail=ACTIVE_PASSIVE_MATCH\nETHERCHANNEL_EVAL id=LINK2 status=NO_CHANNEL proto=LACP detail=PASSIVE_MISMATCH\nETHERCHANNEL_EVAL id=LINK3 status=CHANNEL_UP proto=PAGP detail=DESIRABLE_AUTO_MATCH\nETHERCHANNEL_EVAL id=LINK4 status=ERROR proto=NONE detail=PROTOCOL_INCOMPATIBLE',
        note: 'LINK1 forme un bundle LACP ; LINK2 reste inactif car les deux sont passifs ; LINK4 tente de mélanger deux protocoles incompatibles.'
      }
    ],
    tests: [
      {
        label: 'Mode statique ON parfait vs décalage de mode',
        stdin: 'NEGOTIATION id=ST1 side_a_proto=STATIC side_a_mode=ON side_b_proto=STATIC side_b_mode=ON\nNEGOTIATION id=ST2 side_a_proto=STATIC side_a_mode=ON side_b_proto=LACP side_b_mode=ACTIVE',
        expected: 'ETHERCHANNEL_EVAL id=ST1 status=CHANNEL_UP proto=STATIC detail=STATIC_ON_MATCH\nETHERCHANNEL_EVAL id=ST2 status=ERROR proto=NONE detail=PROTOCOL_INCOMPATIBLE'
      },
      {
        label: 'PAgP symétrique et asymétrique',
        stdin: 'NEGOTIATION id=PG1 side_a_proto=PAGP side_a_mode=DESIRABLE side_b_proto=PAGP side_b_mode=DESIRABLE\nNEGOTIATION id=PG2 side_a_proto=PAGP side_a_mode=AUTO side_b_proto=PAGP side_b_mode=AUTO',
        expected: 'ETHERCHANNEL_EVAL id=PG1 status=CHANNEL_UP proto=PAGP detail=DESIRABLE_MATCH\nETHERCHANNEL_EVAL id=PG2 status=NO_CHANNEL proto=PAGP detail=AUTO_MISMATCH'
      },
      {
        label: 'LACP symétrique ACTIVE des deux côtés',
        stdin: 'NEGOTIATION id=LAC1 side_a_proto=LACP side_a_mode=ACTIVE side_b_proto=LACP side_b_mode=ACTIVE',
        expected: 'ETHERCHANNEL_EVAL id=LAC1 status=CHANNEL_UP proto=LACP detail=ACTIVE_MATCH'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("NEGOTIATION "):
        continue
    parts = ligne.split()
    nid = None
    proto_a = None
    mode_a = None
    proto_b = None
    mode_b = None
    for p in parts[1:]:
        if p.startswith("id="):
            nid = p.split("=", 1)[1]
        elif p.startswith("side_a_proto="):
            proto_a = p.split("=", 1)[1]
        elif p.startswith("side_a_mode="):
            mode_a = p.split("=", 1)[1]
        elif p.startswith("side_b_proto="):
            proto_b = p.split("=", 1)[1]
        elif p.startswith("side_b_mode="):
            mode_b = p.split("=", 1)[1]

    if proto_a != proto_b:
        status = "ERROR"
        matched_proto = "NONE"
        detail = "PROTOCOL_INCOMPATIBLE"
    elif proto_a == "LACP":
        matched_proto = "LACP"
        if mode_a == "ACTIVE" and mode_b == "ACTIVE":
            status = "CHANNEL_UP"
            detail = "ACTIVE_MATCH"
        elif (mode_a == "ACTIVE" and mode_b == "PASSIVE") or (mode_a == "PASSIVE" and mode_b == "ACTIVE"):
            status = "CHANNEL_UP"
            detail = "ACTIVE_PASSIVE_MATCH"
        elif mode_a == "PASSIVE" and mode_b == "PASSIVE":
            status = "NO_CHANNEL"
            detail = "PASSIVE_MISMATCH"
        else:
            status = "ERROR"
            detail = "INVALID_MODE"
    elif proto_a == "PAGP":
        matched_proto = "PAGP"
        if mode_a == "DESIRABLE" and mode_b == "DESIRABLE":
            status = "CHANNEL_UP"
            detail = "DESIRABLE_MATCH"
        elif (mode_a == "DESIRABLE" and mode_b == "AUTO") or (mode_a == "AUTO" and mode_b == "DESIRABLE"):
            status = "CHANNEL_UP"
            detail = "DESIRABLE_AUTO_MATCH"
        elif mode_a == "AUTO" and mode_b == "AUTO":
            status = "NO_CHANNEL"
            detail = "AUTO_MISMATCH"
        else:
            status = "ERROR"
            detail = "INVALID_MODE"
    elif proto_a == "STATIC":
        matched_proto = "STATIC"
        if mode_a == "ON" and mode_b == "ON":
            status = "CHANNEL_UP"
            detail = "STATIC_ON_MATCH"
        else:
            status = "ERROR"
            detail = "STATIC_MISMATCH"
    else:
        status = "ERROR"
        matched_proto = "NONE"
        detail = "UNKNOWN_PROTOCOL"

    print(f"ETHERCHANNEL_EVAL id={nid} status={status} proto={matched_proto} detail={detail}")
`
  },
  {
    id: 'lan3-c2-e2',
    chapter: 2,
    title: 'Simulateur de répartition de charge EtherChannel (Algorithme de Hachage)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer le port physique d\'émission sélectionné par la fonction de hachage du commutateur.',
    brief: `<p>Un commutateur ne distribue pas les paquets en Round-Robin simple sur un EtherChannel car cela provoquerait des réordonnancements de paquets TCP néfastes. Il applique une fonction mathématique de <strong>hachage (Load Balancing Hash)</strong> basée sur les en-têtes réseau.<br><br>
Le script lit sur l'entrée standard d'abord la définition du Port-Channel :<br>
<code>BUNDLE name=&lt;nom&gt; ports=&lt;p1,p2,...&gt; method=&lt;src-mac|dst-mac|src-dst-mac|src-dst-ip|src-dst-port&gt;</code><br>
Puis des paquets en transit :<br>
<code>PACKET id=&lt;nom&gt; src_mac=&lt;mac&gt; dst_mac=&lt;mac&gt; src_ip=&lt;ip&gt; dst_ip=&lt;ip&gt; src_port=&lt;int&gt; dst_port=&lt;int&gt;</code><br><br>
Algorithme de calcul de l'index de port (<code>k = len(ports)</code>) :<br>
- <strong>src-mac :</strong> <code>hash_val = dernier_octet_hexa(src_mac)</code> &rarr; <code>idx = hash_val % k</code>.<br>
- <strong>dst-mac :</strong> <code>hash_val = dernier_octet_hexa(dst_mac)</code> &rarr; <code>idx = hash_val % k</code>.<br>
- <strong>src-dst-mac :</strong> <code>hash_val = dernier_octet_hexa(src_mac) ^ dernier_octet_hexa(dst_mac)</code> &rarr; <code>idx = hash_val % k</code>.<br>
- <strong>src-dst-ip :</strong> <code>hash_val = dernier_octet_dec(src_ip) ^ dernier_octet_dec(dst_ip)</code> &rarr; <code>idx = hash_val % k</code>.<br>
- <strong>src-dst-port :</strong> <code>hash_val = src_port ^ dst_port</code> &rarr; <code>idx = hash_val % k</code>.<br><br>
Pour chaque paquet, afficher :<br>
<code>LB_REPORT id={id} bundle={name} hash_idx={idx} port={ports[idx]}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : parser la méthode de hachage et calculer le port de sortie
`,
    hints: [
      'Extraire le dernier octet d\'une MAC (ex: "00:11:22:33:44:5a" -> 0x5a = 90).',
      'Extraire le dernier octet d\'une IP (ex: "192.168.1.15" -> 15).',
      'Appliquer l\'opérateur XOR (^) puis le modulo len(ports).'
    ],
    examples: [
      {
        stdin: 'BUNDLE name=Po1 ports=Gi0/1,Gi0/2,Gi0/3,Gi0/4 method=src-dst-ip\nPACKET id=PKT1 src_mac=00:11:22:33:44:01 dst_mac=00:11:22:33:44:02 src_ip=192.168.1.10 dst_ip=10.0.0.12 src_port=50000 dst_port=80\nPACKET id=PKT2 src_mac=00:11:22:33:44:01 dst_mac=00:11:22:33:44:02 src_ip=192.168.1.15 dst_ip=10.0.0.15 src_port=50001 dst_port=443',
        expected: 'LB_REPORT id=PKT1 bundle=Po1 hash_idx=2 port=Gi0/3\nLB_REPORT id=PKT2 bundle=Po1 hash_idx=0 port=Gi0/1',
        note: 'PKT1: 10 ^ 12 = 6, 6 % 4 = 2 -> Gi0/3. PKT2: 15 ^ 15 = 0, 0 % 4 = 0 -> Gi0/1.'
      }
    ],
    tests: [
      {
        label: 'Hachage par src-dst-port avec 2 ports membres',
        stdin: 'BUNDLE name=Po2 ports=Te1/1,Te1/2 method=src-dst-port\nPACKET id=TCP_FLOW src_mac=00:00:00:00:00:01 dst_mac=00:00:00:00:00:02 src_ip=1.1.1.1 dst_ip=2.2.2.2 src_port=40001 dst_port=443',
        expected: 'LB_REPORT id=TCP_FLOW bundle=Po2 hash_idx=0 port=Te1/1'
      },
      {
        label: 'Hachage par src-dst-mac avec conversion hexadécimale',
        stdin: 'BUNDLE name=Po10 ports=Eth1,Eth2,Eth3 method=src-dst-mac\nPACKET id=MCAST src_mac=00:11:22:33:44:0a dst_mac=00:11:22:33:44:0f src_ip=10.0.0.1 dst_ip=10.0.0.2 src_port=123 dst_port=123',
        expected: 'LB_REPORT id=MCAST bundle=Po10 hash_idx=2 port=Eth3'
      },
      {
        label: 'Hachage par dst-mac unique',
        stdin: 'BUNDLE name=PoSingle ports=Fa0/1,Fa0/2,Fa0/3,Fa0/4 method=dst-mac\nPACKET id=P1 src_mac=00:00:00:00:00:00 dst_mac=00:00:00:00:00:07 src_ip=0.0.0.0 dst_ip=0.0.0.0 src_port=0 dst_port=0',
        expected: 'LB_REPORT id=P1 bundle=PoSingle hash_idx=3 port=Fa0/4'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def last_byte_mac(mac_str):
    clean = re.sub(r'[^0-9a-fA-F]', '', mac_str)
    return int(clean[-2:], 16)

def last_byte_ip(ip_str):
    return int(ip_str.split(".")[-1])

bundle_name = ""
ports = []
method = ""

for ligne in lignes:
    if ligne.startswith("BUNDLE "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("name="):
                bundle_name = p.split("=", 1)[1]
            elif p.startswith("ports="):
                ports = p.split("=", 1)[1].split(",")
            elif p.startswith("method="):
                method = p.split("=", 1)[1]

    elif ligne.startswith("PACKET "):
        parts = ligne.split()
        pid = None
        src_mac = ""
        dst_mac = ""
        src_ip = ""
        dst_ip = ""
        src_port = 0
        dst_port = 0
        for p in parts[1:]:
            if p.startswith("id="):
                pid = p.split("=", 1)[1]
            elif p.startswith("src_mac="):
                src_mac = p.split("=", 1)[1]
            elif p.startswith("dst_mac="):
                dst_mac = p.split("=", 1)[1]
            elif p.startswith("src_ip="):
                src_ip = p.split("=", 1)[1]
            elif p.startswith("dst_ip="):
                dst_ip = p.split("=", 1)[1]
            elif p.startswith("src_port="):
                src_port = int(p.split("=", 1)[1])
            elif p.startswith("dst_port="):
                dst_port = int(p.split("=", 1)[1])

        k = len(ports)
        if method == "src-mac":
            val = last_byte_mac(src_mac)
        elif method == "dst-mac":
            val = last_byte_mac(dst_mac)
        elif method == "src-dst-mac":
            val = last_byte_mac(src_mac) ^ last_byte_mac(dst_mac)
        elif method == "src-dst-ip":
            val = last_byte_ip(src_ip) ^ last_byte_ip(dst_ip)
        elif method == "src-dst-port":
            val = src_port ^ dst_port
        else:
            val = 0

        idx = val % k
        selected_port = ports[idx]
        print(f"LB_REPORT id={pid} bundle={bundle_name} hash_idx={idx} port={selected_port}")
`
  },
  {
    id: 'lan3-c2-e3',
    chapter: 2,
    title: 'Contrôleur de cohérence des interfaces membres EtherChannel',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la parfaite homogénéité des paramètres de configuration des ports d\'un Port-Channel.',
    brief: `<p>Pour qu'un groupe EtherChannel puisse s'activer (état <code>UP</code>), tous les ports membres physiques doivent présenter des paramètres strictement identiques.<br><br>
Paramètres obligatoirement homogènes :<br>
- <code>speed</code> (vitesse en Mbps, ex: 1000)<br>
- <code>duplex</code> (ex: full)<br>
- <code>mode</code> (<code>access</code> ou <code>trunk</code>)<br>
- Si <code>mode == 'access'</code> : même <code>vlan</code> d'accès.<br>
- Si <code>mode == 'trunk'</code> : même <code>native_vlan</code> ET même ensemble de <code>allowed_vlans</code>.<br><br>
Le script lit sur l'entrée standard les déclarations de ports membres d'un groupe :<br>
<code>MEMBER group=&lt;nom&gt; port=&lt;nom&gt; speed=&lt;int&gt; duplex=&lt;full|half&gt; mode=&lt;access|trunk&gt; vlan=&lt;int&gt; native=&lt;int&gt; allowed=&lt;vlan_list&gt;</code><br><br>
Règles d'audit :<br>
Le premier port déclaré définit le profil de référence du groupe.<br>
Pour chaque port membre (triés par nom de port) :<br>
- Si tous les paramètres concordent avec la référence :<br>
  <code>status=COMPLIANT reason=NONE</code>.<br>
- En cas de discordance :<br>
  <code>status=INCOMPLIANT reason=&lt;première_discordance_parmi: SPEED_MISMATCH, DUPLEX_MISMATCH, MODE_MISMATCH, ACCESS_VLAN_MISMATCH, NATIVE_VLAN_MISMATCH, ALLOWED_VLANS_MISMATCH&gt;</code>.<br><br>
Afficher pour chaque port :<br>
<code>MEMBER_AUDIT group={group} port={port} status={status} reason={reason}</code><br>
Et la synthèse finale du groupe :<br>
<code>BUNDLE_STATUS group={group} state={UP si 100% compliant sinon SUSPENDED} compliant_count={c}/{total}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la cohérence de chaque port par rapport à la référence
`,
    hints: [
      'Prendre le premier port comme modèle.',
      'Comparer les champs dans l\'ordre : speed, duplex, mode, vlan (si access), native/allowed (si trunk).',
      'Normaliser allowed_vlans sous forme d\'un set d\'entiers.'
    ],
    examples: [
      {
        stdin: 'MEMBER group=Po1 port=Gi0/1 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,20,30\nMEMBER group=Po1 port=Gi0/2 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,20,30\nMEMBER group=Po1 port=Gi0/3 speed=100 duplex=full mode=trunk vlan=1 native=10 allowed=10,20,30',
        expected: 'MEMBER_AUDIT group=Po1 port=Gi0/1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po1 port=Gi0/2 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po1 port=Gi0/3 status=INCOMPLIANT reason=SPEED_MISMATCH\nBUNDLE_STATUS group=Po1 state=SUSPENDED compliant_count=2/3',
        note: 'Gi0/3 tourne à 100 Mbps au lieu de 1000 Mbps, ce qui suspend l\'agrégation.'
      }
    ],
    tests: [
      {
        label: 'Tous les membres conformes sur trunk',
        stdin: 'MEMBER group=Po5 port=Te1/1 speed=10000 duplex=full mode=trunk vlan=1 native=99 allowed=10,20\nMEMBER group=Po5 port=Te1/2 speed=10000 duplex=full mode=trunk vlan=1 native=99 allowed=20,10',
        expected: 'MEMBER_AUDIT group=Po5 port=Te1/1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po5 port=Te1/2 status=COMPLIANT reason=NONE\nBUNDLE_STATUS group=Po5 state=UP compliant_count=2/2'
      },
      {
        label: 'Discordance de VLAN natif et allowed sur trunk',
        stdin: 'MEMBER group=Po2 port=Gi1 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,20\nMEMBER group=Po2 port=Gi2 speed=1000 duplex=full mode=trunk vlan=1 native=20 allowed=10,20\nMEMBER group=Po2 port=Gi3 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,30',
        expected: 'MEMBER_AUDIT group=Po2 port=Gi1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po2 port=Gi2 status=INCOMPLIANT reason=NATIVE_VLAN_MISMATCH\nMEMBER_AUDIT group=Po2 port=Gi3 status=INCOMPLIANT reason=ALLOWED_VLANS_MISMATCH\nBUNDLE_STATUS group=Po2 state=SUSPENDED compliant_count=1/3'
      },
      {
        label: 'Discordance de mode access vs trunk',
        stdin: 'MEMBER group=Po3 port=Fa0/1 speed=100 duplex=full mode=access vlan=10 native=1 allowed=ALL\nMEMBER group=Po3 port=Fa0/2 speed=100 duplex=full mode=trunk vlan=10 native=1 allowed=ALL',
        expected: 'MEMBER_AUDIT group=Po3 port=Fa0/1 status=COMPLIANT reason=NONE\nMEMBER_AUDIT group=Po3 port=Fa0/2 status=INCOMPLIANT reason=MODE_MISMATCH\nBUNDLE_STATUS group=Po3 state=SUSPENDED compliant_count=1/2'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

members_order = []

for ligne in lignes:
    if not ligne.startswith("MEMBER "):
        continue
    parts = ligne.split()
    group = None
    port = None
    speed = 0
    duplex = ""
    mode = ""
    vlan = 1
    native = 1
    allowed = ""
    for p in parts[1:]:
        if p.startswith("group="):
            group = p.split("=", 1)[1]
        elif p.startswith("port="):
            port = p.split("=", 1)[1]
        elif p.startswith("speed="):
            speed = int(p.split("=", 1)[1])
        elif p.startswith("duplex="):
            duplex = p.split("=", 1)[1]
        elif p.startswith("mode="):
            mode = p.split("=", 1)[1]
        elif p.startswith("vlan="):
            vlan = int(p.split("=", 1)[1])
        elif p.startswith("native="):
            native = int(p.split("=", 1)[1])
        elif p.startswith("allowed="):
            allowed = p.split("=", 1)[1]

    allowed_set = {x.strip() for x in allowed.split(",") if x.strip()}
    members_order.append({
        "group": group,
        "port": port,
        "speed": speed,
        "duplex": duplex,
        "mode": mode,
        "vlan": vlan,
        "native": native,
        "allowed_set": allowed_set
    })

if members_order:
    ref = members_order[0]
    grp = ref["group"]
    results = []
    compliant_cnt = 0

    for m in sorted(members_order, key=lambda x: x["port"]):
        if m["speed"] != ref["speed"]:
            st = "INCOMPLIANT"
            rs = "SPEED_MISMATCH"
        elif m["duplex"] != ref["duplex"]:
            st = "INCOMPLIANT"
            rs = "DUPLEX_MISMATCH"
        elif m["mode"] != ref["mode"]:
            st = "INCOMPLIANT"
            rs = "MODE_MISMATCH"
        elif m["mode"] == "access" and m["vlan"] != ref["vlan"]:
            st = "INCOMPLIANT"
            rs = "ACCESS_VLAN_MISMATCH"
        elif m["mode"] == "trunk" and m["native"] != ref["native"]:
            st = "INCOMPLIANT"
            rs = "NATIVE_VLAN_MISMATCH"
        elif m["mode"] == "trunk" and m["allowed_set"] != ref["allowed_set"]:
            st = "INCOMPLIANT"
            rs = "ALLOWED_VLANS_MISMATCH"
        else:
            st = "COMPLIANT"
            rs = "NONE"
            compliant_cnt += 1

        results.append(f"MEMBER_AUDIT group={grp} port={m['port']} status={st} reason={rs}")

    for r in results:
        print(r)

    total = len(members_order)
    b_state = "UP" if compliant_cnt == total else "SUSPENDED"
    print(f"BUNDLE_STATUS group={grp} state={b_state} compliant_count={compliant_cnt}/{total}")
`
  }
];
