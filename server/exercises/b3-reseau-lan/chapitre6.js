'use strict';

module.exports = [
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
