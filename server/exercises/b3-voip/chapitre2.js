/**
 * server/exercises/b3-voip/chapitre2.js — Exercices du Chapitre 2
 * Téléphonie VoIP B3
 */
'use strict';

module.exports = [
  {
    "id": "vo3-c2-e1",
    "chapter": 2,
    "title": "Parseur d'En-têtes de Messages SIP RFC 3261",
    "level": "n1",
    "language": "python",
    "goal": "Analyser la structure syntaxique d'une trame SIP RFC 3261 et extraire les en-têtes fondamentaux (Call-ID, CSeq, From, To).",
    "brief": "<p>Le protocole SIP (Session Initiation Protocol, RFC 3261) est un protocole textuel de signalisation inspiré d'HTTP. Un message SIP débute par :</p><ul><li>Une ligne de requête (Request-Line) : <code><METHODE> <SIP-URI> SIP/2.0</code> (ex: <code>INVITE sip:bob@biloxi.com SIP/2.0</code>), OU</li><li>Une ligne d'état (Status-Line) : <code>SIP/2.0 <STATUS_CODE> <REASON_PHRASE></code> (ex: <code>SIP/2.0 200 OK</code>).</li></ul>\n<p>Suivent les en-têtes obligatoires :</p><ul><li><code>Call-ID</code>: identifiant unique et aléatoire de l'appel</li><li><code>CSeq</code>: numéro de séquence entier suivi de la méthode (ex: <code>1 INVITE</code>)</li><li><code>From</code>: identité de l'émetteur avec URI et tag optionnel (ex: <code><sip:alice@atlanta.com>;tag=1928301774</code>)</li><li><code>To</code>: identité du destinataire (ex: <code><sip:bob@biloxi.com></code>)</li><li><code>Contact</code>: adresse directe pour acheminer les requêtes ultérieures</li></ul>\n<p>Format d'entrée :<br>Un bloc de message SIP sur STDIN (en-têtes séparés par des retours à la ligne).<br>Le bloc se termine par une ligne vide ou la fin du flux.</p>\n<p>Format de sortie :<br>Extraire et afficher :<br>TYPE:<REQUEST|RESPONSE><br>ACTION_OR_STATUS:<METHODE ou CODE_STATUS><br>CALL_ID:<valeur de Call-ID><br>CSEQ_NUM:<entier><br>CSEQ_METHOD:<nom de méthode><br>FROM_URI:<uri nettoyée sans chevrons ni paramètres><br>TO_URI:<uri nettoyée sans chevrons ni paramètres></p>",
    "starter": "import sys\n\ntexte = sys.stdin.read()\n\n# À compléter : parser le message SIP et extraire les champs normalisés\n",
    "hints": [
      "Distinguez la ligne de requête de la ligne de statut pour qualifier TYPE en REQUEST ou RESPONSE.",
      "Nettoyez les URIs SIP pour retirer les chevrons et les tags."
    ],
    "examples": [
      {
        "stdin": "INVITE sip:bob@biloxi.com SIP/2.0\nVia: SIP/2.0/UDP pc33.atlanta.com;branch=z9hG4bK776asdhds\nMax-Forwards: 70\nTo: Bob <sip:bob@biloxi.com>\nFrom: Alice <sip:alice@atlanta.com>;tag=1928301774\nCall-ID: a84b4c76e66710@pc33.atlanta.com\nCSeq: 314159 INVITE\nContact: <sip:alice@pc33.atlanta.com>\nContent-Type: application/sdp",
        "expected": "TYPE:REQUEST\nACTION_OR_STATUS:INVITE\nCALL_ID:a84b4c76e66710@pc33.atlanta.com\nCSEQ_NUM:314159\nCSEQ_METHOD:INVITE\nFROM_URI:sip:alice@atlanta.com\nTO_URI:sip:bob@biloxi.com\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "SIP/2.0 200 OK\nVia: SIP/2.0/UDP pc33.atlanta.com;branch=z9hG4bK776asdhds\nTo: Bob <sip:bob@biloxi.com>;tag=a6c85cf\nFrom: Alice <sip:alice@atlanta.com>;tag=1928301774\nCall-ID: a84b4c76e66710@pc33.atlanta.com\nCSeq: 314159 INVITE\nContact: <sip:bob@192.0.2.4>",
        "expected": "TYPE:RESPONSE\nACTION_OR_STATUS:200\nCALL_ID:a84b4c76e66710@pc33.atlanta.com\nCSEQ_NUM:314159\nCSEQ_METHOD:INVITE\nFROM_URI:sip:alice@atlanta.com\nTO_URI:sip:bob@biloxi.com\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "BYE sip:alice@pc33.atlanta.com SIP/2.0\nVia: SIP/2.0/UDP 192.0.2.4;branch=z9hG4bKnas77\nMax-Forwards: 70\nFrom: <sip:bob@biloxi.com>;tag=a6c85cf\nTo: <sip:alice@atlanta.com>;tag=1928301774\nCall-ID: 987654321@biloxi.com\nCSeq: 2 BYE",
        "expected": "TYPE:REQUEST\nACTION_OR_STATUS:BYE\nCALL_ID:987654321@biloxi.com\nCSEQ_NUM:2\nCSEQ_METHOD:BYE\nFROM_URI:sip:bob@biloxi.com\nTO_URI:sip:alice@atlanta.com\n"
      }
    ],
    "solution": "import sys, re\n\nraw = sys.stdin.read().splitlines()\nlines = [l.strip() for l in raw if l.strip()]\n\nfirst = lines[0]\nif first.startswith(\"SIP/2.0\"):\n    msg_type = \"RESPONSE\"\n    parts = first.split()\n    status_code = parts[1]\n    act_status = status_code\nelse:\n    msg_type = \"REQUEST\"\n    act_status = first.split()[0]\n\ncall_id = \"\"\ncseq_num = \"\"\ncseq_method = \"\"\nfrom_uri = \"\"\nto_uri = \"\"\n\ndef clean_uri(val):\n    m = re.search(r'<(sip:[^>;?]+)', val)\n    if m:\n        return m.group(1)\n    m2 = re.search(r'(sip:[^>;?]+)', val)\n    if m2:\n        return m2.group(1)\n    return val\n\nfor line in lines[1:]:\n    if \":\" not in line:\n        continue\n    k, v = line.split(\":\", 1)\n    k = k.strip().lower()\n    v = v.strip()\n    if k == \"call-id\" or k == \"i\":\n        call_id = v\n    elif k == \"cseq\":\n        sp = v.split()\n        if len(sp) >= 2:\n            cseq_num = sp[0]\n            cseq_method = sp[1]\n    elif k == \"from\" or k == \"f\":\n        from_uri = clean_uri(v)\n    elif k == \"to\" or k == \"t\":\n        to_uri = clean_uri(v)\n\nprint(f\"TYPE:{msg_type}\")\nprint(f\"ACTION_OR_STATUS:{act_status}\")\nprint(f\"CALL_ID:{call_id}\")\nprint(f\"CSEQ_NUM:{cseq_num}\")\nprint(f\"CSEQ_METHOD:{cseq_method}\")\nprint(f\"FROM_URI:{from_uri}\")\nprint(f\"TO_URI:{to_uri}\")\n"
  },
  {
    "id": "vo3-c2-e2",
    "chapter": 2,
    "title": "Analyseur de Négociation de Session SDP RFC 4566",
    "level": "n2",
    "language": "python",
    "goal": "Décoder un corps de message SDP RFC 4566 pour extraire l'adresse IP média, le port RTP et les codecs audio négociés.",
    "brief": "<p>Le protocole SDP (Session Description Protocol, RFC 4566) transporte la description des flux multimédias négociés lors de l'établissement d'un appel SIP. Un corps SDP typique contient :   - <code>0</code> : PCMU/8000 (G.711 µ-law)   - <code>8</code> : PCMA/8000 (G.711 A-law)   - <code>9</code> : G722/8000   - <code>18</code> : G729/8000   - <code>101</code> : telephone-event/8000 (DTMF RFC 2833 / 4733)</p><ul><li><code>v=0</code> : version SDP</li><li><code>o=<username> <sess-id> <sess-version> IN IP4 <ip></code> : origine</li><li><code>c=IN IP4 <ip_media></code> : adresse IP de réception du média RTP</li><li><code>m=audio <port_rtp> RTP/AVP <payload_types...></code> : description du média (ex: audio sur port 10000 avec codecs 0, 8, 18, 101)</li><li>Lignes d'attributs <code>a=rtpmap:<pt> <encoding_name>/<clock_rate></code> :</li><li>Ligne de direction <code>a=<sendrecv|sendonly|recvonly|inactive></code></li></ul>\n<p>Format d'entrée :<br>Un corps SDP sur STDIN.</p>\n<p>Format de sortie :<br>Extraire et afficher :<br>IP_MEDIA:<adresse_ip_media><br>PORT_RTP:<port_entier><br>DIRECTION:<sendrecv|sendonly|recvonly|inactive><br>CODECS:<liste ordonnée des noms de codecs mappés avec leur payload type, format pt:NOM/RATE séparés par virgule></p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : analyser la description de session SDP et extraire les paramètres médias\n",
    "hints": [
      "Isolez la ligne c= pour l'adresse IP et m=audio pour le port de réception.",
      "Associez les numéros de payload types aux noms de codecs déclarés dans les lignes a=rtpmap."
    ],
    "examples": [
      {
        "stdin": "v=0\no=Alice 2890844526 2890844526 IN IP4 192.168.1.50\ns=-\nc=IN IP4 192.168.1.50\nt=0 0\nm=audio 16384 RTP/AVP 0 8 101\na=rtpmap:0 PCMU/8000\na=rtpmap:8 PCMA/8000\na=rtpmap:101 telephone-event/8000\na=sendrecv",
        "expected": "IP_MEDIA:192.168.1.50\nPORT_RTP:16384\nDIRECTION:sendrecv\nCODECS:0:PCMU/8000,8:PCMA/8000,101:telephone-event/8000\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "v=0\no=asterisk 12345 12345 IN IP4 10.0.0.1\ns=Asterisk PBX\nc=IN IP4 10.0.0.1\nt=0 0\nm=audio 10000 RTP/AVP 8 18\na=rtpmap:8 PCMA/8000\na=rtpmap:18 G729/8000\na=sendonly",
        "expected": "IP_MEDIA:10.0.0.1\nPORT_RTP:10000\nDIRECTION:sendonly\nCODECS:8:PCMA/8000,18:G729/8000\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "v=0\no=gateway 4455 1 IN IP4 172.16.20.10\ns=VoIP Gateway\nc=IN IP4 172.16.20.10\nt=0 0\nm=audio 24000 RTP/AVP 9 0 8\na=rtpmap:9 G722/8000\na=rtpmap:0 PCMU/8000\na=rtpmap:8 PCMA/8000\na=recvonly",
        "expected": "IP_MEDIA:172.16.20.10\nPORT_RTP:24000\nDIRECTION:recvonly\nCODECS:9:G722/8000,0:PCMU/8000,8:PCMA/8000\n"
      }
    ],
    "solution": "import sys\n\nip_media = \"\"\nport_rtp = \"\"\ndirection = \"sendrecv\"\npayload_order = []\nrtpmaps = {}\n\nfor line in sys.stdin:\n    line = line.strip()\n    if not line:\n        continue\n    if line.startswith(\"c=\"):\n        # c=IN IP4 192.168.1.50\n        parts = line[2:].split()\n        if len(parts) >= 3:\n            ip_media = parts[2]\n    elif line.startswith(\"m=audio \"):\n        # m=audio 16384 RTP/AVP 0 8 101\n        parts = line[8:].split()\n        if len(parts) >= 3:\n            port_rtp = parts[0]\n            payload_order = parts[2:]\n    elif line.startswith(\"a=rtpmap:\"):\n        # a=rtpmap:0 PCMU/8000\n        val = line[9:]\n        if \" \" in val:\n            pt, codec = val.split(\" \", 1)\n            rtpmaps[pt] = codec\n    elif line.startswith(\"a=\"):\n        cand = line[2:].strip()\n        if cand in (\"sendrecv\", \"sendonly\", \"recvonly\", \"inactive\"):\n            direction = cand\n\ncodec_strs = []\nfor pt in payload_order:\n    c_name = rtpmaps.get(pt, f\"UNKNOWN/{pt}\")\n    codec_strs.append(f\"{pt}:{c_name}\")\n\nprint(f\"IP_MEDIA:{ip_media}\")\nprint(f\"PORT_RTP:{port_rtp}\")\nprint(f\"DIRECTION:{direction}\")\nprint(f\"CODECS:{','.join(codec_strs)}\")\n"
  },
  {
    "id": "vo3-c2-e3",
    "chapter": 2,
    "title": "Décodeur d'En-tête RTP & Calculateur de Gigue (RFC 3550)",
    "level": "n3",
    "language": "python",
    "goal": "Calculer la gigue inter-paquets lissée selon la RFC 3550 à partir des timestamps de transmission et de réception.",
    "brief": "<p>Le protocole RTP (Real-time Transport Protocol, RFC 3550) transporte les trames audio numérisées. Chaque paquet RTP comporte un en-tête fixe de 12 octets contenant :</p><ul><li>Numéro de séquence (Sequence Number, 16 bits) : incrémenté de 1 à chaque paquet.</li><li>Timestamp (32 bits) : échantillon temporel d'horloge (pour G.711 à 8 kHz et 20 ms, l'incrément théorique est de 160 ticks).</li><li>SSRC (Synchronization Source, 32 bits) : identifiant unique de la source.</li></ul>\n<p>Calcul de la gigue inter-paquets (Jitter <code>J</code> en millisecondes) selon l'algorithme RFC 3550 : Soient :   <code>J_i = J_{i-1} + (|D_i| - J_{i-1}) / 16.0</code> (avec <code>J_0 = 0.0</code>).</p><ul><li><code>S_i</code> : timestamp d'émission du paquet i en ticks d'horloge.</li><li><code>R_i</code> : timestamp d'arrivée du paquet i en ticks d'horloge (exprimé à la même échelle d'échantillonnage, ex: 8 000 ticks/sec).</li><li>Différence relative de transit pour le paquet i : <code>D_i = (R_i - S_i) - (R_{i-1} - S_{i-1})</code></li><li>La gigue estimée <code>J_i</code> est lissée selon un filtre passe-bas :</li><li>Conversion de la gigue en millisecondes (pour horloge 8 kHz) : <code>J_ms = (J_i / 8000.0) * 1000.0</code>.</li></ul>\n<p>Format d'entrée :<br>Première ligne : <code>CLOCK_RATE=<fréquence_en_Hz></code> (ex: 8000)<br>Lignes suivantes : paquets reçus ordonnés sous la forme :<br><code>SEQ=<seq> SEND_TS=<ts_emission> RECV_TS=<ts_reception></code></p>\n<p>Format de sortie :<br>Pour chaque paquet à partir du 2e, afficher :<br><code>SEQ:<seq> | DIFF_TRANSIT:<D_i> | JITTER_TICKS:<J_i:.2f> | JITTER_MS:<J_ms:.2f>ms</code></p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : calculer la différence de transit et la gigue RFC 3550\n",
    "hints": [
      "Calculez l'écart de transit relatif Di = (Ri - Si) - (Ri-1 - Si-1).",
      "Appliquez le filtre passe-bas du 1er ordre : Ji = Ji-1 + (|Di| - Ji-1) / 16.0."
    ],
    "examples": [
      {
        "stdin": "CLOCK_RATE=8000\nSEQ=100 SEND_TS=10000 RECV_TS=10200\nSEQ=101 SEND_TS=10160 RECV_TS=10370\nSEQ=102 SEND_TS=10320 RECV_TS=10510",
        "expected": "SEQ:101 | DIFF_TRANSIT:10 | JITTER_TICKS:0.62 | JITTER_MS:0.08ms\nSEQ:102 | DIFF_TRANSIT:-20 | JITTER_TICKS:1.84 | JITTER_MS:0.23ms\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "CLOCK_RATE=8000\nSEQ=1 SEND_TS=0 RECV_TS=160\nSEQ=2 SEND_TS=160 RECV_TS=380\nSEQ=3 SEND_TS=320 RECV_TS=500\nSEQ=4 SEND_TS=480 RECV_TS=740",
        "expected": "SEQ:2 | DIFF_TRANSIT:60 | JITTER_TICKS:3.75 | JITTER_MS:0.47ms\nSEQ:3 | DIFF_TRANSIT:-40 | JITTER_TICKS:6.02 | JITTER_MS:0.75ms\nSEQ:4 | DIFF_TRANSIT:80 | JITTER_TICKS:10.64 | JITTER_MS:1.33ms\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "CLOCK_RATE=16000\nSEQ=500 SEND_TS=50000 RECV_TS=50500\nSEQ=501 SEND_TS=50320 RECV_TS=50900\nSEQ=502 SEND_TS=50640 RECV_TS=51100",
        "expected": "SEQ:501 | DIFF_TRANSIT:80 | JITTER_TICKS:5.00 | JITTER_MS:0.31ms\nSEQ:502 | DIFF_TRANSIT:-120 | JITTER_TICKS:12.19 | JITTER_MS:0.76ms\n"
      }
    ],
    "solution": "import sys\n\nlines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\nif not lines:\n    sys.exit(0)\n\nclock_rate = 8000.0\nidx = 0\nif lines[0].startswith(\"CLOCK_RATE=\"):\n    clock_rate = float(lines[0].split(\"=\")[1])\n    idx = 1\n\nprev_transit = None\njitter = 0.0\n\nfor line in lines[idx:]:\n    parts = dict(p.split(\"=\", 1) for p in line.split())\n    seq = parts.get(\"SEQ\", \"\")\n    send_ts = int(parts.get(\"SEND_TS\", 0))\n    recv_ts = int(parts.get(\"RECV_TS\", 0))\n    transit = recv_ts - send_ts\n\n    if prev_transit is None:\n        prev_transit = transit\n        continue\n\n    d = transit - prev_transit\n    jitter = jitter + (abs(d) - jitter) / 16.0\n    jitter_ms = (jitter / clock_rate) * 1000.0\n    prev_transit = transit\n\n    print(f\"SEQ:{seq} | DIFF_TRANSIT:{d} | JITTER_TICKS:{jitter:.2f} | JITTER_MS:{jitter_ms:.2f}ms\")\n"
  }
];
