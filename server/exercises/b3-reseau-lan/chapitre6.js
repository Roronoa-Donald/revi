/**
 * Exercices Chapitre 6 — Réseau LAN Avancé B3.
 * Qualité de Service (QoS LAN : 802.1p CoS, DiffServ DSCP) & Supervision (LLDP).
 */
'use strict';

module.exports = [
  {
    id: 'lan3-c6-e1',
    chapter: 6,
    title: 'Convertisseur et mappeur de marquage QoS (CoS 802.1p vers DSCP DiffServ)',
    level: 'n1',
    language: 'python',
    goal: 'Mettre en correspondance le marquage de couche 2 (CoS 802.1p) avec les classes DiffServ DSCP de couche 3.',
    brief: `<p>Dans un réseau de campus convergé transportant simultanément de la voix, de la vidéo et des données critiques, la <strong>Qualité de Service (QoS)</strong> garantit le traitement prioritaire des flux sensibles à la gigue et à la latence.<br><br>
Le champ PCP (Priority Code Point / CoS) de l'en-tête 802.1Q code 8 niveaux de priorité (0 à 7). Au niveau IP (couche 3), le champ DS (Differentiated Services / RFC 2474) utilise les 6 bits supérieurs de l'octet ToS (DSCP, valeurs de 0 à 63).<br><br>
Table de correspondance standard IETF / Cisco :<br>
- <strong>CoS 0 (Best Effort) :</strong> DSCP 0 (décimal) &rarr; <code>PHB=BE</code> (Best Effort).<br>
- <strong>CoS 1 (Background) :</strong> DSCP 8 &rarr; <code>PHB=CS1</code> (Class Selector 1).<br>
- <strong>CoS 2 (Standard Data) :</strong> DSCP 16 &rarr; <code>PHB=CS2</code>.<br>
- <strong>CoS 3 (Critical Data) :</strong> DSCP 24 &rarr; <code>PHB=CS3</code>.<br>
- <strong>CoS 4 (Streaming Video) :</strong> DSCP 34 &rarr; <code>PHB=AF41</code> (Assured Forwarding 41).<br>
- <strong>CoS 5 (Voice / VoIP) :</strong> DSCP 46 &rarr; <code>PHB=EF</code> (Expedited Forwarding).<br>
- <strong>CoS 6 (Internetwork Control) :</strong> DSCP 48 &rarr; <code>PHB=CS6</code>.<br>
- <strong>CoS 7 (Network Control) :</strong> DSCP 56 &rarr; <code>PHB=CS7</code>.<br><br>
Le script lit sur l'entrée standard des paquets entrants :<br>
<code>FRAME_QOS id=&lt;nom&gt; cos=&lt;0..7&gt; traffic=&lt;nom_flux&gt;</code><br><br>
Pour chaque paquet, convertir la CoS en valeur DSCP décimale, en binaire sur 6 bits et en classe PHB :<br>
<code>QOS_MAP id={id} cos={cos} dscp_dec={dscp_dec} dscp_bin={dscp_6bits} phb={phb} traffic={traffic}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : mapper chaque niveau CoS 802.1p vers son équivalent DSCP DiffServ
`,
    hints: [
      'Gérer un dictionnaire indexé par la valeur de cos (0 à 7).',
      'Formater dscp_bin sur 6 bits avec f"{dscp_dec:06b}".'
    ],
    examples: [
      {
        stdin: 'FRAME_QOS id=P1 cos=5 traffic=VoIP_RTP\nFRAME_QOS id=P2 cos=4 traffic=Video_Conf\nFRAME_QOS id=P3 cos=0 traffic=Web_HTTP',
        expected: 'QOS_MAP id=P1 cos=5 dscp_dec=46 dscp_bin=101110 phb=EF traffic=VoIP_RTP\nQOS_MAP id=P2 cos=4 dscp_dec=34 dscp_bin=100010 phb=AF41 traffic=Video_Conf\nQOS_MAP id=P3 cos=0 dscp_dec=0 dscp_bin=000000 phb=BE traffic=Web_HTTP',
        note: 'CoS 5 est mappé vers Expedited Forwarding (DSCP 46 / 101110b) ; CoS 4 vers AF41 ; CoS 0 vers Best Effort.'
      }
    ],
    tests: [
      {
        label: 'Trafic de contrôle réseau et données critiques (CoS 6 et CoS 3)',
        stdin: 'FRAME_QOS id=BGP_SYNC cos=6 traffic=Routing_BGP\nFRAME_QOS id=DB_QUERY cos=3 traffic=Oracle_ERP',
        expected: 'QOS_MAP id=BGP_SYNC cos=6 dscp_dec=48 dscp_bin=110000 phb=CS6 traffic=Routing_BGP\nQOS_MAP id=DB_QUERY cos=3 dscp_dec=24 dscp_bin=011000 phb=CS3 traffic=Oracle_ERP'
      },
      {
        label: 'Trafic de fond Background (CoS 1)',
        stdin: 'FRAME_QOS id=BK1 cos=1 traffic=Torrent_Peer',
        expected: 'QOS_MAP id=BK1 cos=1 dscp_dec=8 dscp_bin=001000 phb=CS1 traffic=Torrent_Peer'
      },
      {
        label: 'Contrôle critique CoS 7',
        stdin: 'FRAME_QOS id=STP_CTRL cos=7 traffic=BPDU_Frame',
        expected: 'QOS_MAP id=STP_CTRL cos=7 dscp_dec=56 dscp_bin=111000 phb=CS7 traffic=BPDU_Frame'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

MAPPING = {
    0: (0, "BE"),
    1: (8, "CS1"),
    2: (16, "CS2"),
    3: (24, "CS3"),
    4: (34, "AF41"),
    5: (46, "EF"),
    6: (48, "CS6"),
    7: (56, "CS7")
}

for ligne in lignes:
    if not ligne.startswith("FRAME_QOS "):
        continue
    parts = ligne.split()
    fid = None
    cos = 0
    traffic = ""
    for p in parts[1:]:
        if p.startswith("id="):
            fid = p.split("=", 1)[1]
        elif p.startswith("cos="):
            cos = int(p.split("=", 1)[1])
        elif p.startswith("traffic="):
            traffic = p.split("=", 1)[1]

    dscp_dec, phb = MAPPING.get(cos, (0, "BE"))
    dscp_bin = f"{dscp_dec:06b}"
    print(f"QOS_MAP id={fid} cos={cos} dscp_dec={dscp_dec} dscp_bin={dscp_bin} phb={phb} traffic={traffic}")
`
  },
  {
    id: 'lan3-c6-e2',
    chapter: 6,
    title: 'Simulateur d\'ordonnancement de files d\'attente (Strict Priority vs WRR)',
    level: 'n2',
    language: 'python',
    goal: 'Simuler le traitement des paquets en sortie selon les algorithmes d\'ordonnancement Strict Priority et Weighted Round-Robin.',
    brief: `<p>À la sortie des ports de commutateurs de campus, les paquets sont dirigés vers différentes files d'attente (Queues : Q1 Priorité Haute / Voix, Q2 Vidéo, Q3 Données Best-Effort) :<br><br>
Algorithmes d'ordonnancement :<br>
- <strong>STRICT_PRIORITY :</strong> Tant que Q1 contient des paquets, elle est dépilée prioritairement. Si Q1 est vide, Q2 est traitée. Si Q1 et Q2 sont vides, Q3 est traitée.<br>
- <strong>WEIGHTED_ROUND_ROBIN (WRR) :</strong> Chaque tour de service dépile jusqu'à <code>W1</code> paquets de Q1, puis <code>W2</code> paquets de Q2, puis <code>W3</code> paquets de Q3. Si une file est vide avant d'avoir atteint son quota, l'ordonnanceur passe à la file suivante.<br><br>
Le script lit sur l'entrée standard :<br>
- La configuration de l'ordonnanceur :<br>
  <code>SCHEDULER mode=&lt;STRICT_PRIORITY|WEIGHTED_ROUND_ROBIN&gt; weights=&lt;w1,w2,w3&gt; max_dequeues=&lt;int&gt;</code><br>
  (weights est ignoré en mode STRICT_PRIORITY).<br>
- Les paquets en attente dans les files :<br>
  <code>ENQUEUE queue=&lt;Q1|Q2|Q3&gt; pkt_id=&lt;nom&gt;</code><br><br>
Exécuter jusqu'à <code>max_dequeues</code> dépilements (ou jusqu'à ce que toutes les files soient vides) et afficher :<br>
<code>DEQUEUE_EVENT step={step} queue={queue} pkt_id={pkt_id} mode={mode}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : gérer les files Q1, Q2, Q3 et implémenter STRICT_PRIORITY et WRR
`,
    hints: [
      'Gérer 3 listes FIFO pour Q1, Q2 et Q3.',
      'En STRICT_PRIORITY : dépiler Q1 si non vide, sinon Q2, sinon Q3.',
      'En WRR : boucler sur les tours (take up to W1 from Q1, up to W2 from Q2, up to W3 from Q3).'
    ],
    examples: [
      {
        stdin: 'SCHEDULER mode=STRICT_PRIORITY weights=1,1,1 max_dequeues=4\nENQUEUE queue=Q1 pkt_id=VOIP1\nENQUEUE queue=Q3 pkt_id=DATA1\nENQUEUE queue=Q1 pkt_id=VOIP2\nENQUEUE queue=Q2 pkt_id=VID1',
        expected: 'DEQUEUE_EVENT step=1 queue=Q1 pkt_id=VOIP1 mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=2 queue=Q1 pkt_id=VOIP2 mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=3 queue=Q2 pkt_id=VID1 mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=4 queue=Q3 pkt_id=DATA1 mode=STRICT_PRIORITY',
        note: 'Strict Priority dépile intégralement Q1 (VOIP1, VOIP2) avant de toucher à Q2 (VID1) puis Q3 (DATA1).'
      }
    ],
    tests: [
      {
        label: 'Mode WRR avec poids 2, 1, 1',
        stdin: 'SCHEDULER mode=WEIGHTED_ROUND_ROBIN weights=2,1,1 max_dequeues=5\nENQUEUE queue=Q1 pkt_id=V1\nENQUEUE queue=Q1 pkt_id=V2\nENQUEUE queue=Q1 pkt_id=V3\nENQUEUE queue=Q2 pkt_id=M1\nENQUEUE queue=Q3 pkt_id=D1',
        expected: 'DEQUEUE_EVENT step=1 queue=Q1 pkt_id=V1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=2 queue=Q1 pkt_id=V2 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=3 queue=Q2 pkt_id=M1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=4 queue=Q3 pkt_id=D1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=5 queue=Q1 pkt_id=V3 mode=WEIGHTED_ROUND_ROBIN'
      },
      {
        label: 'File prioritaire vide permettant le passage immédiat aux files inférieures',
        stdin: 'SCHEDULER mode=STRICT_PRIORITY weights=1,1,1 max_dequeues=2\nENQUEUE queue=Q2 pkt_id=VID_SOLO\nENQUEUE queue=Q3 pkt_id=DATA_SOLO',
        expected: 'DEQUEUE_EVENT step=1 queue=Q2 pkt_id=VID_SOLO mode=STRICT_PRIORITY\nDEQUEUE_EVENT step=2 queue=Q3 pkt_id=DATA_SOLO mode=STRICT_PRIORITY'
      },
      {
        label: 'Arrêt anticipé quand toutes les files sont vides avant max_dequeues',
        stdin: 'SCHEDULER mode=WEIGHTED_ROUND_ROBIN weights=1,1,1 max_dequeues=10\nENQUEUE queue=Q1 pkt_id=P1\nENQUEUE queue=Q2 pkt_id=P2',
        expected: 'DEQUEUE_EVENT step=1 queue=Q1 pkt_id=P1 mode=WEIGHTED_ROUND_ROBIN\nDEQUEUE_EVENT step=2 queue=Q2 pkt_id=P2 mode=WEIGHTED_ROUND_ROBIN'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

mode = "STRICT_PRIORITY"
weights = [1, 1, 1]
max_dequeues = 10

q1 = []
q2 = []
q3 = []

for ligne in lignes:
    if ligne.startswith("SCHEDULER "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("mode="):
                mode = p.split("=", 1)[1]
            elif p.startswith("weights="):
                weights = [int(x.strip()) for x in p.split("=", 1)[1].split(",") if x.strip()]
            elif p.startswith("max_dequeues="):
                max_dequeues = int(p.split("=", 1)[1])

    elif ligne.startswith("ENQUEUE "):
        parts = ligne.split()
        queue = ""
        pid = ""
        for p in parts[1:]:
            if p.startswith("queue="):
                queue = p.split("=", 1)[1]
            elif p.startswith("pkt_id="):
                pid = p.split("=", 1)[1]
        if queue == "Q1":
            q1.append(pid)
        elif queue == "Q2":
            q2.append(pid)
        elif queue == "Q3":
            q3.append(pid)

events = []
step = 0

if mode == "STRICT_PRIORITY":
    while step < max_dequeues and (q1 or q2 or q3):
        step += 1
        if q1:
            pkt = q1.pop(0)
            events.append((step, "Q1", pkt))
        elif q2:
            pkt = q2.pop(0)
            events.append((step, "Q2", pkt))
        else:
            pkt = q3.pop(0)
            events.append((step, "Q3", pkt))
else: # WEIGHTED_ROUND_ROBIN
    w1, w2, w3 = weights
    while step < max_dequeues and (q1 or q2 or q3):
        # Tour Q1
        cnt = 0
        while cnt < w1 and q1 and step < max_dequeues:
            cnt += 1
            step += 1
            events.append((step, "Q1", q1.pop(0)))

        # Tour Q2
        cnt = 0
        while cnt < w2 and q2 and step < max_dequeues:
            cnt += 1
            step += 1
            events.append((step, "Q2", q2.pop(0)))

        # Tour Q3
        cnt = 0
        while cnt < w3 and q3 and step < max_dequeues:
            cnt += 1
            step += 1
            events.append((step, "Q3", q3.pop(0)))

for s, q, pid in events:
    print(f"DEQUEUE_EVENT step={s} queue={q} pkt_id={pid} mode={mode}")
`
  },
  {
    id: 'lan3-c6-e3',
    chapter: 6,
    title: 'Parseur de trames de découverte de voisins LLDP (IEEE 802.1AB)',
    level: 'n3',
    language: 'python',
    goal: 'Extraire et structurer les attributs TLV d\'une trame de découverte de réseau LLDP.',
    brief: `<p>Le protocole standard <strong>LLDP (Link Layer Discovery Protocol - IEEE 802.1AB)</strong> permet aux commutateurs, routeurs et téléphones IP de s'annoncer mutuellement sur un réseau local hétérogène (alternative ouverte à CDP).<br><br>
Chaque trame LLDP contient une suite de champs <strong>TLV (Type - Length - Value)</strong> :<br>
- <strong>Chassis ID (Type 1) :</strong> Identifiant physique du châssis (adresse MAC ou nom).<br>
- <strong>Port ID (Type 2) :</strong> Nom ou numéro de port émetteur.<br>
- <strong>Time To Live (Type 3) :</strong> Durée de rétention en secondes (TTL).<br>
- <strong>System Name (Type 5) :</strong> Nom d'hôte du commutateur émetteur.<br>
- <strong>System Capabilities (Type 7) :</strong> Capacités actives (ex: <code>Bridge</code>, <code>Router</code>, <code>Telephone</code>).<br>
- <strong>Management Address (Type 8) :</strong> Adresse IP d'administration.<br><br>
Le script lit sur l'entrée standard les blocs de découverte par port local :<br>
<code>NEIGHBOR_DISCOVERY local_port=&lt;nom&gt;</code><br>
Suivi de lignes TLV :<br>
<code>TLV type=&lt;int&gt; value=&lt;string&gt;</code><br>
Et cloturé par :<br>
<code>END_DISCOVERY</code><br><br>
Pour chaque voisin découvert, afficher la synthèse topologique :<br>
<code>LLDP_NEIGHBOR local_port={local_port} remote_sys={sys_name} remote_port={port_id} chassis={chassis_id} mgmt_ip={mgmt_ip} caps={caps} ttl={ttl}s</code><br>
(si un champ facultatif n'est pas fourni, afficher <code>NONE</code>).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les blocs TLV et formater l'inventaire LLDP
`,
    hints: [
      'Regrouper les lignes entre NEIGHBOR_DISCOVERY et END_DISCOVERY.',
      'Associer type 1=chassis, 2=port_id, 3=ttl, 5=sys_name, 7=caps, 8=mgmt_ip.'
    ],
    examples: [
      {
        stdin: 'NEIGHBOR_DISCOVERY local_port=Gi0/1\nTLV type=1 value=00:11:22:33:44:aa\nTLV type=2 value=GigabitEthernet1/0/24\nTLV type=3 value=120\nTLV type=5 value=SW-DISTRIBUTION-01\nTLV type=7 value=Bridge,Router\nTLV type=8 value=10.0.0.254\nEND_DISCOVERY',
        expected: 'LLDP_NEIGHBOR local_port=Gi0/1 remote_sys=SW-DISTRIBUTION-01 remote_port=GigabitEthernet1/0/24 chassis=00:11:22:33:44:aa mgmt_ip=10.0.0.254 caps=Bridge,Router ttl=120s',
        note: 'Extraction complète des 6 TLVs standards d\'un voisin de distribution.'
      }
    ],
    tests: [
      {
        label: 'Voisin téléphone IP avec champs optionnels partiels',
        stdin: 'NEIGHBOR_DISCOVERY local_port=Fa0/8\nTLV type=1 value=00:50:60:aa:bb:cc\nTLV type=2 value=Port1\nTLV type=3 value=180\nTLV type=5 value=VOIP-PHONE-402\nTLV type=7 value=Telephone\nEND_DISCOVERY',
        expected: 'LLDP_NEIGHBOR local_port=Fa0/8 remote_sys=VOIP-PHONE-402 remote_port=Port1 chassis=00:50:60:aa:bb:cc mgmt_ip=NONE caps=Telephone ttl=180s'
      },
      {
        label: 'Plusieurs voisins découverts sur des ports distincts',
        stdin: 'NEIGHBOR_DISCOVERY local_port=Te1/1\nTLV type=1 value=00:aa:00:00:00:01\nTLV type=2 value=TenGig0/1\nTLV type=3 value=120\nTLV type=5 value=CORE-A\nTLV type=8 value=192.168.0.1\nEND_DISCOVERY\nNEIGHBOR_DISCOVERY local_port=Te1/2\nTLV type=1 value=00:aa:00:00:00:02\nTLV type=2 value=TenGig0/1\nTLV type=3 value=120\nTLV type=5 value=CORE-B\nTLV type=8 value=192.168.0.2\nEND_DISCOVERY',
        expected: 'LLDP_NEIGHBOR local_port=Te1/1 remote_sys=CORE-A remote_port=TenGig0/1 chassis=00:aa:00:00:00:01 mgmt_ip=192.168.0.1 caps=NONE ttl=120s\nLLDP_NEIGHBOR local_port=Te1/2 remote_sys=CORE-B remote_port=TenGig0/1 chassis=00:aa:00:00:00:02 mgmt_ip=192.168.0.2 caps=NONE ttl=120s'
      },
      {
        label: 'Trame minimale avec Chassis, Port et TTL uniquement',
        stdin: 'NEIGHBOR_DISCOVERY local_port=Gi0/10\nTLV type=1 value=02:00:00:11:22:33\nTLV type=2 value=eth0\nTLV type=3 value=60\nEND_DISCOVERY',
        expected: 'LLDP_NEIGHBOR local_port=Gi0/10 remote_sys=NONE remote_port=eth0 chassis=02:00:00:11:22:33 mgmt_ip=NONE caps=NONE ttl=60s'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

current_port = None
current_tlvs = {}

for ligne in lignes:
    if ligne.startswith("NEIGHBOR_DISCOVERY "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("local_port="):
                current_port = p.split("=", 1)[1]
        current_tlvs = {}

    elif ligne.startswith("TLV "):
        parts = ligne.split()
        ttype = 0
        val = ""
        for p in parts[1:]:
            if p.startswith("type="):
                ttype = int(p.split("=", 1)[1])
            elif p.startswith("value="):
                val = p.split("=", 1)[1]
        current_tlvs[ttype] = val

    elif ligne == "END_DISCOVERY":
        chassis = current_tlvs.get(1, "NONE")
        port_id = current_tlvs.get(2, "NONE")
        ttl = current_tlvs.get(3, "0")
        sys_name = current_tlvs.get(5, "NONE")
        caps = current_tlvs.get(7, "NONE")
        mgmt_ip = current_tlvs.get(8, "NONE")

        print(f"LLDP_NEIGHBOR local_port={current_port} remote_sys={sys_name} remote_port={port_id} chassis={chassis} mgmt_ip={mgmt_ip} caps={caps} ttl={ttl}s")
        current_port = None
        current_tlvs = {}
`
  }
];
