/**
 * server/exercises/b3-voip/chapitre5.js — Exercices du Chapitre 5
 * Téléphonie VoIP B3
 */
'use strict';

module.exports = [
  {
    "id": "vo3-c5-e1",
    "chapter": 5,
    "title": "Calculateur d'Erlang B & Dimensionnement de Trunks Téléphoniques",
    "level": "n1",
    "language": "python",
    "goal": "Calculer la probabilité de blocage GoS par la formule récursive d'Erlang B et dimensionner le nombre de canaux requis.",
    "brief": "<p>La loi d'Erlang B modélise la probabilité de blocage d'appels téléphoniques (Grade of Service, GoS) sur un faisceau (trunk) de <code>N</code> canaux sans mise en attente (appels rejetés si tous les canaux sont occupés).<br>Le trafic offert <code>A</code> (en Erlangs) est calculé par :<br><code>A = (CALLS_PER_HOUR * DURATION_SEC) / 3600.0</code></p>\n<p>La formule récursive d'Erlang B pour calculer la probabilité de blocage <code>B(N, A)</code> est :</p><ul><li><code>B(0, A) = 1.0</code></li><li><code>B(k, A) = (A * B(k-1, A)) / (k + A * B(k-1, A))</code> pour <code>k = 1, 2, ..., N</code>.</li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>CALLS_PER_HOUR=<nb> DURATION_SEC=<duree_moyenne> CHANNELS=<nb_canaux> TARGET_GOS_PCT=<seuil_gos_max_pct></p>\n<p>Règles de calcul :<br>1. Calculer le trafic offert <code>A</code> en Erlangs.<br>2. Calculer la probabilité de blocage réelle <code>B(N, A)</code> en pourcentage (<code>B * 100.0</code>).<br>3. Comparer avec le seuil cible <code>TARGET_GOS_PCT</code> :<br>   - Si <code>blocage_pct <= TARGET_GOS_PCT</code> -> <code>CONFORME:OUI</code><br>   - Sinon -> <code>CONFORME:NON</code><br>4. Déterminer le nombre minimal de canaux <code>N_MIN</code> nécessaires pour que <code>B(N_MIN, A) * 100.0 <= TARGET_GOS_PCT</code>.</p>\n<p>Format de sortie :<br>Pour chaque ligne, afficher :<br>TRAFIC:<A:.2f>E | CANAUX:<N> | BLOCAGE:<blocage_pct:.2f>% | TARGET:<target:.2f>% | CONFORME:<OUI|NON> | CANAUX_REQUIS:<N_MIN></p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : implémenter la formule récursive d'Erlang B et dimensionner le trunk SIP\n",
    "hints": [
      "Appliquez la formule récursive : B(k) = (A * B(k-1)) / (k + A * B(k-1)) avec B(0) = 1.0.",
      "Incrémentez le nombre de canaux k jusqu'à atteindre un blocage inférieur au seuil GoS."
    ],
    "examples": [
      {
        "stdin": "CALLS_PER_HOUR=120 DURATION_SEC=180 CHANNELS=10 TARGET_GOS_PCT=1.0\nCALLS_PER_HOUR=200 DURATION_SEC=120 CHANNELS=8 TARGET_GOS_PCT=2.0",
        "expected": "TRAFIC:6.00E | CANAUX:10 | BLOCAGE:4.31% | TARGET:1.00% | CONFORME:NON | CANAUX_REQUIS:13\nTRAFIC:6.67E | CANAUX:8 | BLOCAGE:15.97% | TARGET:2.00% | CONFORME:NON | CANAUX_REQUIS:13\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "CALLS_PER_HOUR=50 DURATION_SEC=60 CHANNELS=5 TARGET_GOS_PCT=1.0\nCALLS_PER_HOUR=300 DURATION_SEC=180 CHANNELS=25 TARGET_GOS_PCT=1.0",
        "expected": "TRAFIC:0.83E | CANAUX:5 | BLOCAGE:0.15% | TARGET:1.00% | CONFORME:OUI | CANAUX_REQUIS:4\nTRAFIC:15.00E | CANAUX:25 | BLOCAGE:0.50% | TARGET:1.00% | CONFORME:OUI | CANAUX_REQUIS:24\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "CALLS_PER_HOUR=60 DURATION_SEC=120 CHANNELS=4 TARGET_GOS_PCT=5.0\nCALLS_PER_HOUR=10 DURATION_SEC=300 CHANNELS=2 TARGET_GOS_PCT=2.0",
        "expected": "TRAFIC:2.00E | CANAUX:4 | BLOCAGE:9.52% | TARGET:5.00% | CONFORME:NON | CANAUX_REQUIS:5\nTRAFIC:0.83E | CANAUX:2 | BLOCAGE:15.92% | TARGET:2.00% | CONFORME:NON | CANAUX_REQUIS:4\n"
      }
    ],
    "solution": "import sys\n\ndef erlang_b(n, a):\n    b = 1.0\n    for k in range(1, n + 1):\n        b = (a * b) / (k + a * b)\n    return b\n\ndef min_channels_for_gos(a, target_pct):\n    target_ratio = target_pct / 100.0\n    k = 1\n    b = 1.0\n    while True:\n        b = (a * b) / (k + a * b)\n        if b <= target_ratio or k > 200:\n            return k\n        k += 1\n\nfor line in sys.stdin:\n    line = line.strip()\n    if not line:\n        continue\n    parts = dict(p.split(\"=\", 1) for p in line.split())\n    calls = float(parts.get(\"CALLS_PER_HOUR\", 0))\n    dur = float(parts.get(\"DURATION_SEC\", 0))\n    channels = int(parts.get(\"CHANNELS\", 1))\n    target_gos = float(parts.get(\"TARGET_GOS_PCT\", 1.0))\n\n    a = (calls * dur) / 3600.0\n    actual_b = erlang_b(channels, a) * 100.0\n    conforme = \"OUI\" if actual_b <= target_gos else \"NON\"\n    req_channels = min_channels_for_gos(a, target_gos)\n\n    print(f\"TRAFIC:{a:.2f}E | CANAUX:{channels} | BLOCAGE:{actual_b:.2f}% | TARGET:{target_gos:.2f}% | CONFORME:{conforme} | CANAUX_REQUIS:{req_channels}\")\n"
  },
  {
    "id": "vo3-c5-e2",
    "chapter": 5,
    "title": "Validateur de Marquage QoS & Mappage DSCP / CoS 802.1p",
    "level": "n2",
    "language": "python",
    "goal": "Vérifier la conformité du marquage QoS (CoS 5, DSCP EF 46) et la ségrégation en Voice VLAN pour les flux ToIP.",
    "brief": "<p>Dans les réseaux d'entreprise, la qualité de service (QoS) est indispensable pour préserver la voix en temps réel de la gigue et de la congestion. Les standards IETF et IEEE recommandent :   Dans l'en-tête IP (champ ToS / DiffServ), la valeur DSCP est décalée de 2 bits à gauche : <code>ToS = DSCP << 2</code> (ex: 46 << 2 = 184 soit 0xB8).   Le marquage de niveau 2 (802.1p CoS) associé est <code>CoS = 5</code> (Voice).   ToS = 24 << 2 = 96 (0x60) ou 26 << 2 = 104 (0x68).   Le marquage CoS associé est <code>CoS = 3</code> (Call Signaling).</p><ul><li>Médias vocaux RTP : DSCP EF (Expedited Forwarding = valeur décimale 46, binaire 101110)</li><li>Signalisation SIP : DSCP CS3 (valeur 24) ou AF31 (valeur 26)</li><li>Trafic Best-Effort (données web/bureautique) : DSCP CS0 (0, ToS = 0, CoS = 0).</li></ul>\n<p>Format d'entrée :<br>Lignes décrivant des flux réseau observés :<br>FLUX=<RTP_VOICE|SIP_SIGNALING|DATA_DEFAULT> DSCP_DEC=<valeur> COS_OBSERVED=<cos></p>\n<p>Règles de validation :<br>1. Calculer la valeur théorique du champ ToS (hexadécimal 0x..) : <code>tos = dscp << 2</code>.<br>2. Vérifier la conformité du marquage DSCP et CoS selon le type de flux :<br>   - RTP_VOICE : attendu DSCP == 46 et CoS == 5<br>   - SIP_SIGNALING : attendu DSCP in {24, 26} et CoS == 3<br>   - DATA_DEFAULT : attendu DSCP == 0 et CoS == 0<br>3. Si tout correspond -> <code>STATUT:CONFORME</code><br>   Sinon -> <code>STATUT:NON_CONFORME</code> (préciser l'anomalie : DSCP_INCORRECT, COS_INCORRECT ou TOUS_DEUX_INCORRECTS).</p>\n<p>Format de sortie :<br>Pour chaque ligne, afficher :<br>FLUX:<nom> | DSCP:<val> | TOS:0x<hex> | COS:<cos> | STATUT:<statut> | ANOMALIE:<AUCUNE|anomalie></p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : vérifier le marquage DSCP, CoS et calculer le champ ToS\n",
    "hints": [
      "Contrôlez que les flux RTP sont marqués avec DSCP 46 (Expedited Forwarding).",
      "Vérifiez que la signalisation SIP est protégée par un marquage CS3 (24) ou AF31 (26)."
    ],
    "examples": [
      {
        "stdin": "FLUX=RTP_VOICE DSCP_DEC=46 COS_OBSERVED=5\nFLUX=RTP_VOICE DSCP_DEC=0 COS_OBSERVED=0\nFLUX=SIP_SIGNALING DSCP_DEC=26 COS_OBSERVED=3\nFLUX=SIP_SIGNALING DSCP_DEC=24 COS_OBSERVED=5",
        "expected": "FLUX:RTP_VOICE | DSCP:46 | TOS:0xb8 | COS:5 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:RTP_VOICE | DSCP:0 | TOS:0x00 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\nFLUX:SIP_SIGNALING | DSCP:26 | TOS:0x68 | COS:3 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:SIP_SIGNALING | DSCP:24 | TOS:0x60 | COS:5 | STATUT:NON_CONFORME | ANOMALIE:COS_INCORRECT\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "FLUX=DATA_DEFAULT DSCP_DEC=0 COS_OBSERVED=0\nFLUX=DATA_DEFAULT DSCP_DEC=46 COS_OBSERVED=5\nFLUX=RTP_VOICE DSCP_DEC=46 COS_OBSERVED=0",
        "expected": "FLUX:DATA_DEFAULT | DSCP:0 | TOS:0x00 | COS:0 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:DATA_DEFAULT | DSCP:46 | TOS:0xb8 | COS:5 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\nFLUX:RTP_VOICE | DSCP:46 | TOS:0xb8 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:COS_INCORRECT\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "FLUX=SIP_SIGNALING DSCP_DEC=46 COS_OBSERVED=3\nFLUX=SIP_SIGNALING DSCP_DEC=0 COS_OBSERVED=0",
        "expected": "FLUX:SIP_SIGNALING | DSCP:46 | TOS:0xb8 | COS:3 | STATUT:NON_CONFORME | ANOMALIE:DSCP_INCORRECT\nFLUX:SIP_SIGNALING | DSCP:0 | TOS:0x00 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\n"
      }
    ],
    "solution": "import sys\n\nfor line in sys.stdin:\n    line = line.strip()\n    if not line:\n        continue\n    parts = dict(p.split(\"=\", 1) for p in line.split())\n    flux = parts.get(\"FLUX\", \"\")\n    dscp = int(parts.get(\"DSCP_DEC\", 0))\n    cos = int(parts.get(\"COS_OBSERVED\", 0))\n\n    tos = dscp << 2\n    tos_hex = f\"0x{tos:02x}\"\n\n    if flux == \"RTP_VOICE\":\n        dscp_ok = (dscp == 46)\n        cos_ok = (cos == 5)\n    elif flux == \"SIP_SIGNALING\":\n        dscp_ok = (dscp in (24, 26))\n        cos_ok = (cos == 3)\n    else: # DATA_DEFAULT\n        dscp_ok = (dscp == 0)\n        cos_ok = (cos == 0)\n\n    if dscp_ok and cos_ok:\n        statut = \"CONFORME\"\n        ano = \"AUCUNE\"\n    elif not dscp_ok and not cos_ok:\n        statut = \"NON_CONFORME\"\n        ano = \"TOUS_DEUX_INCORRECTS\"\n    elif not dscp_ok:\n        statut = \"NON_CONFORME\"\n        ano = \"DSCP_INCORRECT\"\n    else:\n        statut = \"NON_CONFORME\"\n        ano = \"COS_INCORRECT\"\n\n    print(f\"FLUX:{flux} | DSCP:{dscp} | TOS:{tos_hex} | COS:{cos} | STATUT:{statut} | ANOMALIE:{ano}\")\n"
  },
  {
    "id": "vo3-c5-e3",
    "chapter": 5,
    "title": "Résolveur de Traversée NAT STUN & Détecteur de Topologie ICE",
    "level": "n3",
    "language": "python",
    "goal": "Résoudre les incohérences d'adresses IP privées dans les offres SDP et déterminer la stratégie de traversée NAT (STUN vs TURN).",
    "brief": "<p>Lorsqu'un terminal VoIP est derrière un routeur NAT, ses paquets SIP et RTP comportent des adresses IP privées inaccessibles depuis Internet. Le protocole STUN (RFC 5389) permet au client de découvrir son adresse IP et son port publics (MAPPED-ADDRESS) vus par le serveur externe. En envoyant deux requêtes STUN vers deux adresses de serveurs distinctes (S1 et S2), le client qualifie le comportement de son NAT :   -> <code>NAT_CONE</code> (Full Cone, Restricted Cone ou Port-Restricted Cone) : STUN suffit pour établir les flux directs sans relais.   -> <code>NAT_SYMETRIQUE</code> : les communications directes échouent souvent sans serveur relais TURN.   -> <code>PAS_DE_NAT</code> (IP publique directe).</p><ul><li>Si l'adresse IP et le port mappés sont identiques pour S1 et S2 :</li><li>Si le port externe change entre S1 et S2 pour le même socket local :</li><li>Si l'adresse mappée est égale à l'adresse locale privée :</li></ul>\n<p>Format d'entrée :<br>Lignes au format :<br>CLIENT_LOCAL=<ip_locale:port> STUN1_MAPPED=<ip_pub1:port1> STUN2_MAPPED=<ip_pub2:port2></p>\n<p>Format de sortie : Pour chaque ligne, déterminer :   - PAS_DE_NAT -> <code>ROUTAGE_DIRECT</code>   - NAT_CONE -> <code>STUN_DIRECT</code>   - NAT_SYMETRIQUE -> <code>SERVEUR_RELAIS_TURN</code> LOCAL:<local> | MAPPED_S1:<s1> | MAPPED_S2:<s2> | TOPOLOGIE:<type> | SOLUTION:<solution></p><ul><li>Le type de NAT : <code>PAS_DE_NAT</code>, <code>NAT_CONE</code> ou <code>NAT_SYMETRIQUE</code>.</li><li>La solution recommandée :</li><li>Afficher :</li></ul>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : qualifier le comportement NAT selon les retours STUN\n",
    "hints": [
      "Comparez l'adresse IP annoncée dans c= avec l'adresse source publique du paquet.",
      "Désactivez SIP ALG et orientez vers un serveur TURN en présence d'un NAT symétrique."
    ],
    "examples": [
      {
        "stdin": "CLIENT_LOCAL=192.168.1.15:5060 STUN1_MAPPED=198.51.100.42:10500 STUN2_MAPPED=198.51.100.42:10500\nCLIENT_LOCAL=192.168.1.15:5060 STUN1_MAPPED=198.51.100.42:10500 STUN2_MAPPED=198.51.100.42:10501\nCLIENT_LOCAL=203.0.113.10:5060 STUN1_MAPPED=203.0.113.10:5060 STUN2_MAPPED=203.0.113.10:5060",
        "expected": "LOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10500 | TOPOLOGIE:NAT_CONE | SOLUTION:STUN_DIRECT\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10501 | TOPOLOGIE:NAT_SYMETRIQUE | SOLUTION:SERVEUR_RELAIS_TURN\nLOCAL:203.0.113.10:5060 | MAPPED_S1:203.0.113.10:5060 | MAPPED_S2:203.0.113.10:5060 | TOPOLOGIE:PAS_DE_NAT | SOLUTION:ROUTAGE_DIRECT\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "CLIENT_LOCAL=10.0.0.2:16384 STUN1_MAPPED=82.65.1.20:45000 STUN2_MAPPED=82.65.1.20:45000\nCLIENT_LOCAL=10.0.0.2:16384 STUN1_MAPPED=82.65.1.20:45000 STUN2_MAPPED=82.65.1.20:45002",
        "expected": "LOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45000 | TOPOLOGIE:NAT_CONE | SOLUTION:STUN_DIRECT\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45002 | TOPOLOGIE:NAT_SYMETRIQUE | SOLUTION:SERVEUR_RELAIS_TURN\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "CLIENT_LOCAL=195.154.10.2:5060 STUN1_MAPPED=195.154.10.2:5060 STUN2_MAPPED=195.154.10.2:5060",
        "expected": "LOCAL:195.154.10.2:5060 | MAPPED_S1:195.154.10.2:5060 | MAPPED_S2:195.154.10.2:5060 | TOPOLOGIE:PAS_DE_NAT | SOLUTION:ROUTAGE_DIRECT\n"
      }
    ],
    "solution": "import sys\n\nfor line in sys.stdin:\n    line = line.strip()\n    if not line:\n        continue\n    parts = dict(p.split(\"=\", 1) for p in line.split())\n    loc = parts.get(\"CLIENT_LOCAL\", \"\")\n    s1 = parts.get(\"STUN1_MAPPED\", \"\")\n    s2 = parts.get(\"STUN2_MAPPED\", \"\")\n\n    if loc == s1 and loc == s2:\n        topologie = \"PAS_DE_NAT\"\n        solution = \"ROUTAGE_DIRECT\"\n    elif s1 == s2:\n        topologie = \"NAT_CONE\"\n        solution = \"STUN_DIRECT\"\n    else:\n        topologie = \"NAT_SYMETRIQUE\"\n        solution = \"SERVEUR_RELAIS_TURN\"\n\n    print(f\"LOCAL:{loc} | MAPPED_S1:{s1} | MAPPED_S2:{s2} | TOPOLOGIE:{topologie} | SOLUTION:{solution}\")\n"
  }
];
