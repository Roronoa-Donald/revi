/**
 * Exercices Chapitre 1 — Réseau LAN Avancé B3.
 * Architecture de Commutation LAN & Protocoles Spanning Tree (STP/RSTP/MSTP).
 */
'use strict';

module.exports = [
  {
    id: 'lan3-c1-e1',
    chapter: 1,
    title: 'Calculateur de priorité et élection du Root Bridge STP (Bridge ID)',
    level: 'n1',
    language: 'python',
    goal: 'Simuler l\'élection du commutateur racine (Root Bridge) dans une instance Spanning Tree 802.1D / PVST+.',
    brief: `<p>Dans les architectures de commutation Ethernet, le protocole <strong>Spanning Tree (STP)</strong> élimine les boucles de couche 2 en élisant un commutateur racine unique (<strong>Root Bridge</strong>) par domaine de diffusion / VLAN.<br><br>
Chaque commutateur est identifié par son <strong>Bridge ID (BID)</strong> composé de :<br>
- <strong>Bridge Priority :</strong> valeur de base multiple de 4096 (ex: 32768, 4096, 0).<br>
- <strong>System ID Extension :</strong> le numéro de VLAN (ex: VLAN 10).<br>
- <strong>Adresse MAC :</strong> identifiant physique unique du commutateur.<br>
La priorité totale est <code>total_priority = priority + vlan</code>.<br><br>
Règles d'élection du Root Bridge :<br>
1. Le commutateur ayant la plus petite <code>total_priority</code> est élu Root Bridge.<br>
2. En cas d'égalité sur la priorité totale, le commutateur ayant la plus petite adresse MAC (ordre lexicographique de l'adresse en minuscules normalisée) l'emporte.<br><br>
Le script lit sur l'entrée standard des déclarations de commutateurs pour un VLAN donné :<br>
<code>BRIDGE name=&lt;nom&gt; vlan=&lt;int&gt; priority=&lt;int&gt; mac=&lt;mac_format_libre&gt;</code><br><br>
Pour chaque commutateur (triés par nom alphabétique), afficher :<br>
<code>STP_BRIDGE name={name} vlan={vlan} total_prio={total_priority} mac={mac_norm} role={ROOT|NON_ROOT}</code><br>
Puis sur une ligne finale :<br>
<code>ROOT_WINNER name={root_name} total_prio={root_prio} mac={root_mac}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la priorité totale, normaliser la MAC et élire le Root Bridge
`,
    hints: [
      'Normaliser la MAC en minuscules avec des deux-points (ex: 00:1a:2b:3c:4d:5e) ou format comparable.',
      'Calculer total_prio = priority + vlan.',
      'Comparer le tuple (total_prio, mac_norm).'
    ],
    examples: [
      {
        stdin: 'BRIDGE name=SW-CORE1 vlan=10 priority=32768 mac=00:11:22:33:44:55\nBRIDGE name=SW-CORE2 vlan=10 priority=4096 mac=00:aa:bb:cc:dd:ee\nBRIDGE name=SW-ACCESS1 vlan=10 priority=32768 mac=00:11:22:11:22:33',
        expected: 'STP_BRIDGE name=SW-ACCESS1 vlan=10 total_prio=32778 mac=00:11:22:11:22:33 role=NON_ROOT\nSTP_BRIDGE name=SW-CORE1 vlan=10 total_prio=32778 mac=00:11:22:33:44:55 role=NON_ROOT\nSTP_BRIDGE name=SW-CORE2 vlan=10 total_prio=4106 mac=00:aa:bb:cc:dd:ee role=ROOT\nROOT_WINNER name=SW-CORE2 total_prio=4106 mac=00:aa:bb:cc:dd:ee',
        note: 'SW-CORE2 a la plus faible priorité (4096 + 10 = 4106) et devient Root Bridge.'
      }
    ],
    tests: [
      {
        label: 'Départage sur adresse MAC en cas d\'égalité parfaite de priorité',
        stdin: 'BRIDGE name=SW-A vlan=1 priority=32768 mac=00:50:56:00:00:02\nBRIDGE name=SW-B vlan=1 priority=32768 mac=00:50:56:00:00:01',
        expected: 'STP_BRIDGE name=SW-A vlan=1 total_prio=32769 mac=00:50:56:00:00:02 role=NON_ROOT\nSTP_BRIDGE name=SW-B vlan=1 total_prio=32769 mac=00:50:56:00:00:01 role=ROOT\nROOT_WINNER name=SW-B total_prio=32769 mac=00:50:56:00:00:01'
      },
      {
        label: 'Priorité racine explicite configurée à 0',
        stdin: 'BRIDGE name=CORE_PRIMARY vlan=100 priority=0 mac=02:00:00:aa:bb:cc\nBRIDGE name=CORE_SECONDARY vlan=100 priority=4096 mac=02:00:00:11:22:33',
        expected: 'STP_BRIDGE name=CORE_PRIMARY vlan=100 total_prio=100 mac=02:00:00:aa:bb:cc role=ROOT\nSTP_BRIDGE name=CORE_SECONDARY vlan=100 total_prio=4196 mac=02:00:00:11:22:33 role=NON_ROOT\nROOT_WINNER name=CORE_PRIMARY total_prio=100 mac=02:00:00:aa:bb:cc'
      },
      {
        label: 'Formats de MAC avec tirets ou points normalisés',
        stdin: 'BRIDGE name=SW1 vlan=20 priority=32768 mac=00-1B-44-11-3A-B7\nBRIDGE name=SW2 vlan=20 priority=32768 mac=001b.4411.3ab6',
        expected: 'STP_BRIDGE name=SW1 vlan=20 total_prio=32788 mac=00:1b:44:11:3a:b7 role=NON_ROOT\nSTP_BRIDGE name=SW2 vlan=20 total_prio=32788 mac=00:1b:44:11:3a:b6 role=ROOT\nROOT_WINNER name=SW2 total_prio=32788 mac=00:1b:44:11:3a:b6'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def norm_mac(raw):
    # Retirer tous les séparateurs (: - .)
    clean = re.sub(r'[^0-9a-fA-F]', '', raw).lower()
    clean = clean.zfill(12)
    return ':'.join(clean[i:i+2] for i in range(0, 12, 2))

bridges = []

for ligne in lignes:
    if not ligne.startswith("BRIDGE "):
        continue
    parts = ligne.split()
    name = None
    vlan = 1
    priority = 32768
    mac_raw = ""
    for p in parts[1:]:
        if p.startswith("name="):
            name = p.split("=", 1)[1]
        elif p.startswith("vlan="):
            vlan = int(p.split("=", 1)[1])
        elif p.startswith("priority="):
            priority = int(p.split("=", 1)[1])
        elif p.startswith("mac="):
            mac_raw = p.split("=", 1)[1]

    mac_n = norm_mac(mac_raw)
    tot_prio = priority + vlan
    bridges.append({
        "name": name,
        "vlan": vlan,
        "tot_prio": tot_prio,
        "mac": mac_n
    })

# Déterminer le Root Bridge
best = sorted(bridges, key=lambda b: (b["tot_prio"], b["mac"]))[0]

for b in sorted(bridges, key=lambda x: x["name"]):
    role = "ROOT" if b["name"] == best["name"] else "NON_ROOT"
    print(f"STP_BRIDGE name={b['name']} vlan={b['vlan']} total_prio={b['tot_prio']} mac={b['mac']} role={role}")

print(f"ROOT_WINNER name={best['name']} total_prio={best['tot_prio']} mac={best['mac']}")
`
  },
  {
    id: 'lan3-c1-e2',
    chapter: 1,
    title: 'Simulateur de calcul de coût et sélection du Root Port STP',
    level: 'n2',
    language: 'python',
    goal: 'Appliquer les règles de départage STP pour élire le port racine (Root Port) sur un commutateur non-racine.',
    brief: `<p>Sur chaque commutateur non-racine, un seul port est élu <strong>Root Port (RP)</strong> : c'est le port offrant le chemin le plus court vers le Root Bridge.<br><br>
Le script lit sur l'entrée standard les candidats de ports recevant des BPDUs racines :<br>
<code>ROOT_PATH port=&lt;nom&gt; path_cost=&lt;int&gt; sender_bid_prio=&lt;int&gt; sender_port_id=&lt;int&gt;</code><br><br>
Règles strictes de départage (dans l'ordre séquentiel officiel IEEE) :<br>
1. <strong>Le plus faible coût de chemin (Lowest Path Cost) :</strong> <code>path_cost</code> minimal.<br>
2. <strong>En cas d'égalité :</strong> Le plus faible Bridge ID du commutateur voisin émetteur (<code>sender_bid_prio</code>).<br>
3. <strong>En cas d'égalité :</strong> Le plus faible Port ID de l'émetteur (<code>sender_port_id</code>).<br>
4. <strong>En cas d'égalité :</strong> Le plus petit nom de port local dans l'ordre alphabétique (<code>port</code>).<br><br>
Afficher d'abord l'évaluation de chaque port (triés par nom de port croissant) :<br>
<code>PORT_EVAL port={port} cost={path_cost} status={ROOT_PORT|ALTERNATE_PORT}</code><br>
Puis la ligne de synthèse finale :<br>
<code>SELECTED_ROOT_PORT port={winner_port} total_cost={winner_cost}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : trier les candidats selon les 4 critères STP et élire le Root Port
`,
    hints: [
      'Utiliser une clé de tri tuple : (path_cost, sender_bid_prio, sender_port_id, port).',
      'Le premier élément du tri est l\'élu Root Port.'
    ],
    examples: [
      {
        stdin: 'ROOT_PATH port=Gi0/1 path_cost=19 sender_bid_prio=32768 sender_port_id=128.1\nROOT_PATH port=Gi0/2 path_cost=4 sender_bid_prio=32768 sender_port_id=128.2\nROOT_PATH port=Gi0/3 path_cost=19 sender_bid_prio=4096 sender_port_id=128.1',
        expected: 'PORT_EVAL port=Gi0/1 cost=19 status=ALTERNATE_PORT\nPORT_EVAL port=Gi0/2 cost=4 status=ROOT_PORT\nPORT_EVAL port=Gi0/3 cost=19 status=ALTERNATE_PORT\nSELECTED_ROOT_PORT port=Gi0/2 total_cost=4',
        note: 'Gi0/2 a le coût de chemin le plus bas (4 vs 19) et est élu Root Port.'
      }
    ],
    tests: [
      {
        label: 'Départage sur le Bridge ID émetteur (sender_bid_prio)',
        stdin: 'ROOT_PATH port=Fa0/1 path_cost=19 sender_bid_prio=32768 sender_port_id=128.1\nROOT_PATH port=Fa0/2 path_cost=19 sender_bid_prio=4096 sender_port_id=128.1',
        expected: 'PORT_EVAL port=Fa0/1 cost=19 status=ALTERNATE_PORT\nPORT_EVAL port=Fa0/2 cost=19 status=ROOT_PORT\nSELECTED_ROOT_PORT port=Fa0/2 total_cost=19'
      },
      {
        label: 'Départage sur le Port ID de l\'émetteur distant (sender_port_id)',
        stdin: 'ROOT_PATH port=Te1/1 path_cost=2 sender_bid_prio=4096 sender_port_id=128.2\nROOT_PATH port=Te1/2 path_cost=2 sender_bid_prio=4096 sender_port_id=128.1',
        expected: 'PORT_EVAL port=Te1/1 cost=2 status=ALTERNATE_PORT\nPORT_EVAL port=Te1/2 cost=2 status=ROOT_PORT\nSELECTED_ROOT_PORT port=Te1/2 total_cost=2'
      },
      {
        label: 'Départage final sur le nom du port local',
        stdin: 'ROOT_PATH port=Eth2 path_cost=10 sender_bid_prio=1000 sender_port_id=1\nROOT_PATH port=Eth1 path_cost=10 sender_bid_prio=1000 sender_port_id=1',
        expected: 'PORT_EVAL port=Eth1 cost=10 status=ROOT_PORT\nPORT_EVAL port=Eth2 cost=10 status=ALTERNATE_PORT\nSELECTED_ROOT_PORT port=Eth1 total_cost=10'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def parse_port_id(pid_str):
    # Supporte les formats "128.1" ou "1"
    try:
        if "." in pid_str:
            a, b = pid_str.split(".", 1)
            return (int(a), int(b))
        return (int(pid_str), 0)
    except Exception:
        return (999, 999)

candidates = []

for ligne in lignes:
    if not ligne.startswith("ROOT_PATH "):
        continue
    parts = ligne.split()
    port = None
    cost = 0
    sender_bid = 0
    sender_pid_raw = "0"
    for p in parts[1:]:
        if p.startswith("port="):
            port = p.split("=", 1)[1]
        elif p.startswith("path_cost="):
            cost = int(p.split("=", 1)[1])
        elif p.startswith("sender_bid_prio="):
            sender_bid = int(p.split("=", 1)[1])
        elif p.startswith("sender_port_id="):
            sender_pid_raw = p.split("=", 1)[1]

    sender_pid = parse_port_id(sender_pid_raw)
    candidates.append({
        "port": port,
        "cost": cost,
        "sender_bid": sender_bid,
        "sender_pid": sender_pid,
        "sender_pid_raw": sender_pid_raw
    })

# Élection
winner = sorted(candidates, key=lambda c: (c["cost"], c["sender_bid"], c["sender_pid"], c["port"]))[0]

for c in sorted(candidates, key=lambda x: x["port"]):
    status = "ROOT_PORT" if c["port"] == winner["port"] else "ALTERNATE_PORT"
    print(f"PORT_EVAL port={c['port']} cost={c['cost']} status={status}")

print(f"SELECTED_ROOT_PORT port={winner['port']} total_cost={winner['cost']}")
`
  },
  {
    id: 'lan3-c1-e3',
    chapter: 1,
    title: 'Auditeur de protection Spanning Tree (BPDU Guard, Root Guard & Loop Guard)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler les réactions des mécanismes de durcissement STP face aux anomalies topologiques.',
    brief: `<p>Pour protéger la topologie Spanning Tree contre les attaques et les erreurs de câblage, les commutateurs d'entreprise disposent de fonctionnalités de protection avancées :<br>
- <strong>BPDU Guard :</strong> Si une BPDU arrive sur un port d'accès configuré avec PortFast, le port est immédiatement désactivé par sécurité (<code>ERR_DISABLE</code>).<br>
- <strong>Root Guard :</strong> Si une BPDU supérieure revendiquant le rôle de racine arrive sur un port désigné, le port passe en état incohérent (<code>ROOT_INCONSISTENT</code>) et bloque le trafic.<br>
- <strong>Loop Guard :</strong> Si les BPDUs cessent d'arriver sur un port racine ou alternatif sans transition normale, le port passe en <code>LOOP_INCONSISTENT</code> pour éviter une boucle unidirectionnelle.<br><br>
Le script lit sur l'entrée standard d'abord la configuration des ports :<br>
<code>PORT name=&lt;nom&gt; bpdu_guard=&lt;YES|NO&gt; root_guard=&lt;YES|NO&gt; loop_guard=&lt;YES|NO&gt;</code><br>
Puis des événements réseau survenus sur ces ports :<br>
<code>EVENT port=&lt;nom&gt; type=&lt;BPDU_RECEIVED|SUPERIOR_BPDU|BPDU_TIMEOUT&gt;</code><br><br>
Règles de réaction du commutateur :<br>
1. <strong>Si type == 'BPDU_RECEIVED' :</strong><br>
   - Si <code>bpdu_guard == 'YES'</code> : <code>status=ERR_DISABLE action=PORT_SHUTDOWN reason=BPDU_GUARD_VIOLATION</code><br>
   - Sinon : <code>status=FORWARDING action=NORMAL_PROCESSING reason=BPDU_ACCEPTED</code><br>
2. <strong>Si type == 'SUPERIOR_BPDU' :</strong><br>
   - Si <code>root_guard == 'YES'</code> : <code>status=ROOT_INCONSISTENT action=BLOCK_TRAFFIC reason=ROOT_GUARD_TRIGGERED</code><br>
   - Sinon : <code>status=RECONFIGURING action=ELECT_NEW_ROOT reason=ROOT_MIGRATION</code><br>
3. <strong>Si type == 'BPDU_TIMEOUT' :</strong><br>
   - Si <code>loop_guard == 'YES'</code> : <code>status=LOOP_INCONSISTENT action=BLOCK_UNIDIRECTIONAL reason=LOOP_GUARD_TRIGGERED</code><br>
   - Sinon : <code>status=TRANSITION_FORWARDING action=STP_AGED_OUT reason=POTENTIAL_LOOP_RISK</code><br><br>
Pour chaque événement, afficher :<br>
<code>STP_GUARD_REPORT port={port} event={type} status={status} action={action} reason={reason}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : charger les politiques de ports et évaluer les événements de sécurité STP
`,
    hints: [
      'Gérer un dictionnaire de configuration indexé par le nom du port.',
      'Tester les cas de BPDU_RECEIVED, SUPERIOR_BPDU et BPDU_TIMEOUT selon les flags.'
    ],
    examples: [
      {
        stdin: 'PORT name=Gi0/1 bpdu_guard=YES root_guard=NO loop_guard=NO\nPORT name=Gi0/2 bpdu_guard=NO root_guard=YES loop_guard=NO\nPORT name=Gi0/3 bpdu_guard=NO root_guard=NO loop_guard=YES\nEVENT port=Gi0/1 type=BPDU_RECEIVED\nEVENT port=Gi0/2 type=SUPERIOR_BPDU\nEVENT port=Gi0/3 type=BPDU_TIMEOUT',
        expected: 'STP_GUARD_REPORT port=Gi0/1 event=BPDU_RECEIVED status=ERR_DISABLE action=PORT_SHUTDOWN reason=BPDU_GUARD_VIOLATION\nSTP_GUARD_REPORT port=Gi0/2 event=SUPERIOR_BPDU status=ROOT_INCONSISTENT action=BLOCK_TRAFFIC reason=ROOT_GUARD_TRIGGERED\nSTP_GUARD_REPORT port=Gi0/3 event=BPDU_TIMEOUT status=LOOP_INCONSISTENT action=BLOCK_UNIDIRECTIONAL reason=LOOP_GUARD_TRIGGERED',
        note: 'Gi0/1 est désactivé par BPDU Guard ; Gi0/2 bloque la tentative d\'usurpation du Root ; Gi0/3 prévient une boucle unidirectionnelle.'
      }
    ],
    tests: [
      {
        label: 'Événements sur ports sans protection activée',
        stdin: 'PORT name=Fa0/10 bpdu_guard=NO root_guard=NO loop_guard=NO\nEVENT port=Fa0/10 type=BPDU_RECEIVED\nEVENT port=Fa0/10 type=SUPERIOR_BPDU\nEVENT port=Fa0/10 type=BPDU_TIMEOUT',
        expected: 'STP_GUARD_REPORT port=Fa0/10 event=BPDU_RECEIVED status=FORWARDING action=NORMAL_PROCESSING reason=BPDU_ACCEPTED\nSTP_GUARD_REPORT port=Fa0/10 event=SUPERIOR_BPDU status=RECONFIGURING action=ELECT_NEW_ROOT reason=ROOT_MIGRATION\nSTP_GUARD_REPORT port=Fa0/10 event=BPDU_TIMEOUT status=TRANSITION_FORWARDING action=STP_AGED_OUT reason=POTENTIAL_LOOP_RISK'
      },
      {
        label: 'Combinaison de protections multiples sur le même équipement',
        stdin: 'PORT name=Uplink1 bpdu_guard=NO root_guard=YES loop_guard=YES\nEVENT port=Uplink1 type=SUPERIOR_BPDU',
        expected: 'STP_GUARD_REPORT port=Uplink1 event=SUPERIOR_BPDU status=ROOT_INCONSISTENT action=BLOCK_TRAFFIC reason=ROOT_GUARD_TRIGGERED'
      },
      {
        label: 'Port utilisateur violant la politique PortFast avec BPDU Guard',
        stdin: 'PORT name=UserPort1 bpdu_guard=YES root_guard=NO loop_guard=NO\nEVENT port=UserPort1 type=BPDU_RECEIVED',
        expected: 'STP_GUARD_REPORT port=UserPort1 event=BPDU_RECEIVED status=ERR_DISABLE action=PORT_SHUTDOWN reason=BPDU_GUARD_VIOLATION'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

ports = {}

for ligne in lignes:
    if ligne.startswith("PORT "):
        parts = ligne.split()
        name = None
        bg = "NO"
        rg = "NO"
        lg = "NO"
        for p in parts[1:]:
            if p.startswith("name="):
                name = p.split("=", 1)[1]
            elif p.startswith("bpdu_guard="):
                bg = p.split("=", 1)[1]
            elif p.startswith("root_guard="):
                rg = p.split("=", 1)[1]
            elif p.startswith("loop_guard="):
                lg = p.split("=", 1)[1]
        ports[name] = {"bg": bg, "rg": rg, "lg": lg}

    elif ligne.startswith("EVENT "):
        parts = ligne.split()
        pname = None
        etype = None
        for p in parts[1:]:
            if p.startswith("port="):
                pname = p.split("=", 1)[1]
            elif p.startswith("type="):
                etype = p.split("=", 1)[1]

        cfg = ports.get(pname, {"bg": "NO", "rg": "NO", "lg": "NO"})

        if etype == "BPDU_RECEIVED":
            if cfg["bg"] == "YES":
                status = "ERR_DISABLE"
                action = "PORT_SHUTDOWN"
                reason = "BPDU_GUARD_VIOLATION"
            else:
                status = "FORWARDING"
                action = "NORMAL_PROCESSING"
                reason = "BPDU_ACCEPTED"
        elif etype == "SUPERIOR_BPDU":
            if cfg["rg"] == "YES":
                status = "ROOT_INCONSISTENT"
                action = "BLOCK_TRAFFIC"
                reason = "ROOT_GUARD_TRIGGERED"
            else:
                status = "RECONFIGURING"
                action = "ELECT_NEW_ROOT"
                reason = "ROOT_MIGRATION"
        else: # BPDU_TIMEOUT
            if cfg["lg"] == "YES":
                status = "LOOP_INCONSISTENT"
                action = "BLOCK_UNIDIRECTIONAL"
                reason = "LOOP_GUARD_TRIGGERED"
            else:
                status = "TRANSITION_FORWARDING"
                action = "STP_AGED_OUT"
                reason = "POTENTIAL_LOOP_RISK"

        print(f"STP_GUARD_REPORT port={pname} event={etype} status={status} action={action} reason={reason}")
`
  }
];
