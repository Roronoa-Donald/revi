'use strict';

module.exports = [
  {
    "id": "vo3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de Débit Voix & Bande Passante Réseau",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer l'overhead des en-têtes réseau ToIP (IP/UDP/RTP) et la bande passante cumulée selon le codec et la durée de paquetisation.",
    "brief": "<p>La transmission de la voix sur IP encapsule les échantillons audio numériques dans des paquets RTP, puis UDP et IP. Chaque paquet comporte une charge utile audio (payload) correspondant à une durée d'échantillonnage de paquetisation (typiquement 20 ms), précédée des en-têtes suivants : Total des en-têtes réseau = 40 octets par paquet.</p><ul><li>En-tête IP : 20 octets</li><li>En-tête UDP : 8 octets</li><li>En-tête RTP : 12 octets</li></ul>\n<p>Les codecs usuels présentent les caractéristiques suivantes pour 20 ms de voix :</p><ul><li>G.711 (PCMA / PCMU) : débit brut 64 kbps -> charge utile = 160 octets</li><li>G.729 : débit brut 8 kbps -> charge utile = 20 octets</li><li>G.722 : débit brut 64 kbps -> charge utile = 160 octets</li><li>OPUS : débit brut configurable (ex: 24 kbps -> charge utile = 60 octets, calculé par: (bitrate_kbps * 1000 * 0.02) / 8 octets)</li></ul>\n<p>Format d'entrée (sur STDIN) :<br>Lignes de la forme :<br>CODEC=<nom> BITRATE_KBPS=<val> PTIME_MS=<ms> CALLS=<nb></p>\n<p>Pour chaque ligne :<br>1. Calculer le nombre de paquets par seconde par appel : <code>pps = 1000 / PTIME_MS</code>.<br>2. Calculer la taille de la charge utile en octets :<br>   <code>payload_bytes = int((BITRATE_KBPS * 1000 * (PTIME_MS / 1000)) / 8)</code><br>3. Calculer la taille totale d'un paquet en octets : <code>packet_bytes = payload_bytes + 40</code>.<br>4. Calculer le débit réseau total par appel en kbps (avec en-têtes) :<br>   <code>bandwidth_per_call_kbps = (packet_bytes * 8 * pps) / 1000</code><br>5. Calculer le débit total cumulé pour l'ensemble des appels simultanés :<br>   <code>total_bandwidth_kbps = bandwidth_per_call_kbps * CALLS</code></p>\n<p>Format de sortie :<br>Pour chaque ligne analysée, afficher :<br>CODEC:<nom> | PAYLOAD:<payload_bytes>B | PACKET:<packet_bytes>B | PER_CALL:<bandwidth_per_call_kbps:.1f>kbps | TOTAL:<total_bandwidth_kbps:.1f>kbps</p>",
    "starter": "# Grille d'analyse (vo3-c1-e1) — Calculateur de Débit Voix & Bande Passante Réseau\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : CODEC=G.722 BITRATE_KBPS=64 PTIME_MS=20 CALLS=5\n# Données : CODEC=OPUS BITRATE_KBPS=24 PTIME_MS=20 CALLS=50\n# Données : CODEC=OPUS BITRATE_KBPS=32 PTIME_MS=10 CALLS=2\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : CODEC=G.711 BITRATE_KBPS=64 PTIME_MS=30 CALLS=1\n# Données : CODEC=G.729 BITRATE_KBPS=8 PTIME_MS=10 CALLS=100\nA_COMPLETER\n",
    "hints": [
      "Ajoutez systématiquement 40 octets d'en-têtes (IP 20B, UDP 8B, RTP 12B) à la charge utile du codec.",
      "Calculez la cadence de paquets par seconde : pps = 1000 / PTIME_MS."
    ],
    "examples": [
      {
        "stdin": "CODEC=G.711 BITRATE_KBPS=64 PTIME_MS=20 CALLS=10\nCODEC=G.729 BITRATE_KBPS=8 PTIME_MS=20 CALLS=25",
        "expected": "CODEC:G.711 | PAYLOAD:160B | PACKET:200B | PER_CALL:80.0kbps | TOTAL:800.0kbps\nCODEC:G.729 | PAYLOAD:20B | PACKET:60B | PER_CALL:24.0kbps | TOTAL:600.0kbps\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "CODEC:G.722 | PAYLOAD:160B | PACKET:200B | PER_CALL:80.0kbps | TOTAL:400.0kbps\nCODEC:OPUS | PAYLOAD:60B | PACKET:100B | PER_CALL:40.0kbps | TOTAL:2000.0kbps\nCODEC:OPUS | PAYLOAD:40B | PACKET:80B | PER_CALL:64.0kbps | TOTAL:128.0kbps\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "CODEC:G.711 | PAYLOAD:240B | PACKET:280B | PER_CALL:74.7kbps | TOTAL:74.7kbps\nCODEC:G.729 | PAYLOAD:10B | PACKET:50B | PER_CALL:40.0kbps | TOTAL:4000.0kbps\n"
      }
    ],
    "solution": "[Exemple]\nCODEC:G.711 | PAYLOAD:160B | PACKET:200B | PER_CALL:80.0kbps | TOTAL:800.0kbps\nCODEC:G.729 | PAYLOAD:20B | PACKET:60B | PER_CALL:24.0kbps | TOTAL:600.0kbps\n\n\n[Cas 1 — Cas de test 1]\nCODEC:G.722 | PAYLOAD:160B | PACKET:200B | PER_CALL:80.0kbps | TOTAL:400.0kbps\nCODEC:OPUS | PAYLOAD:60B | PACKET:100B | PER_CALL:40.0kbps | TOTAL:2000.0kbps\nCODEC:OPUS | PAYLOAD:40B | PACKET:80B | PER_CALL:64.0kbps | TOTAL:128.0kbps\n\n\n[Cas 2 — Cas de test 2]\nCODEC:G.711 | PAYLOAD:240B | PACKET:280B | PER_CALL:74.7kbps | TOTAL:74.7kbps\nCODEC:G.729 | PAYLOAD:10B | PACKET:50B | PER_CALL:40.0kbps | TOTAL:4000.0kbps"
  },
  {
    "id": "vo3-c1-e2",
    "chapter": 1,
    "title": "Estimateur de Qualité Vocale & Modèle E (Score R & MOS)",
    "level": "n2",
    "language": "analyse",
    "goal": "Estimer le facteur de qualité R et le score MOS selon la recommandation ITU-T G.107 en fonction du délai et des pertes.",
    "brief": "<p>Le standard ITU-T G.107 (E-Model) évalue la qualité de transmission vocale à travers un facteur de qualité <code>R</code> (variant typiquement de 0 à 100). Une simplification standardisée pour la ToIP prend en compte :   - Si <code>D <= 100</code> : <code>Id = 0</code>   - Si <code>100 < D <= 177</code> : <code>Id = 0.024 * D</code>   - Si <code>D > 177</code> : <code>Id = 0.024 * D + 0.11 * (D - 177)</code>   - Pour G.711 : <code>Ie = 2.5 * P</code>   - Pour G.729 : <code>Ie = 11.0 + 3.0 * P</code>   - Pour G.722 : <code>Ie = 2.0 * P</code></p><ul><li><code>R0</code> : facteur intrinsèque de base (environ 93.2 pour G.711, 83.0 pour G.729, 94.0 pour G.722).</li><li><code>Id</code> : dégradation liée au délai unidirectionnel <code>D</code> (en millisecondes) :</li><li><code>Ie</code> : dégradation liée aux pertes de paquets <code>P</code> (pourcentage 0..100) :</li><li>Calcul du facteur <code>R</code> : <code>R = max(0.0, min(100.0, R0 - Id - Ie))</code></li></ul>\n<p>Conversion du facteur R en score MOS (Mean Opinion Score entre 1.0 et 4.5) selon la formule ITU-T :   <code>MOS = 1.0 + 0.035 * R + R * (R - 60.0) * (100.0 - R) * 7e-6</code>   (borné entre 1.0 et 4.5)</p><ul><li>Si <code>R < 0</code> : <code>MOS = 1.0</code></li><li>Si <code>0 <= R <= 100</code> :</li><li>Si <code>R > 100</code> : <code>MOS = 4.5</code></li></ul>\n<p>Qualification de la qualité :</p><ul><li>MOS >= 4.03 : EXCELLENT</li><li>3.60 <= MOS < 4.03 : BON</li><li>3.10 <= MOS < 3.60 : MOYEN</li><li>MOS < 3.10 : MAUVAIS</li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>CODEC=<G.711|G.729|G.722> DELAY_MS=<ms> LOSS_PCT=<pct></p>\n<p>Format de sortie :<br>Pour chaque ligne, afficher :<br>CODEC:<nom> | DELAY:<d>ms | LOSS:<p>% | R:<R:.1f> | MOS:<MOS:.2f> | QUALITE:<label></p>",
    "starter": "# Grille d'analyse (vo3-c1-e2) — Estimateur de Qualité Vocale & Modèle E (Score R & MOS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : CODEC=G.722 DELAY_MS=80 LOSS_PCT=1.0\n# Données : CODEC=G.711 DELAY_MS=200 LOSS_PCT=6.0\n# Données : CODEC=G.729 DELAY_MS=120 LOSS_PCT=1.0\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : CODEC=G.711 DELAY_MS=300 LOSS_PCT=15.0\n# Données : CODEC=G.722 DELAY_MS=180 LOSS_PCT=0.5\nA_COMPLETER\n",
    "hints": [
      "Appliquez la formule par morceaux pour Id selon les seuils de 100 ms et 177 ms.",
      "Bornez le score MOS entre 1.0 et 4.5."
    ],
    "examples": [
      {
        "stdin": "CODEC=G.711 DELAY_MS=50 LOSS_PCT=0.0\nCODEC=G.711 DELAY_MS=150 LOSS_PCT=2.0\nCODEC=G.729 DELAY_MS=220 LOSS_PCT=5.0",
        "expected": "CODEC:G.711 | DELAY:50.0ms | LOSS:0.0% | R:93.2 | MOS:4.41 | QUALITE:EXCELLENT\nCODEC:G.711 | DELAY:150.0ms | LOSS:2.0% | R:84.6 | MOS:4.19 | QUALITE:EXCELLENT\nCODEC:G.729 | DELAY:220.0ms | LOSS:5.0% | R:47.0 | MOS:2.42 | QUALITE:MAUVAIS\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "CODEC:G.722 | DELAY:80.0ms | LOSS:1.0% | R:92.0 | MOS:4.38 | QUALITE:EXCELLENT\nCODEC:G.711 | DELAY:200.0ms | LOSS:6.0% | R:70.9 | MOS:3.64 | QUALITE:BON\nCODEC:G.729 | DELAY:120.0ms | LOSS:1.0% | R:66.1 | MOS:3.41 | QUALITE:MOYEN\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "CODEC:G.711 | DELAY:300.0ms | LOSS:15.0% | R:35.0 | MOS:1.83 | QUALITE:MAUVAIS\nCODEC:G.722 | DELAY:180.0ms | LOSS:0.5% | R:88.3 | MOS:4.30 | QUALITE:EXCELLENT\n"
      }
    ],
    "solution": "[Exemple]\nCODEC:G.711 | DELAY:50.0ms | LOSS:0.0% | R:93.2 | MOS:4.41 | QUALITE:EXCELLENT\nCODEC:G.711 | DELAY:150.0ms | LOSS:2.0% | R:84.6 | MOS:4.19 | QUALITE:EXCELLENT\nCODEC:G.729 | DELAY:220.0ms | LOSS:5.0% | R:47.0 | MOS:2.42 | QUALITE:MAUVAIS\n\n\n[Cas 1 — Cas de test 1]\nCODEC:G.722 | DELAY:80.0ms | LOSS:1.0% | R:92.0 | MOS:4.38 | QUALITE:EXCELLENT\nCODEC:G.711 | DELAY:200.0ms | LOSS:6.0% | R:70.9 | MOS:3.64 | QUALITE:BON\nCODEC:G.729 | DELAY:120.0ms | LOSS:1.0% | R:66.1 | MOS:3.41 | QUALITE:MOYEN\n\n\n[Cas 2 — Cas de test 2]\nCODEC:G.711 | DELAY:300.0ms | LOSS:15.0% | R:35.0 | MOS:1.83 | QUALITE:MAUVAIS\nCODEC:G.722 | DELAY:180.0ms | LOSS:0.5% | R:88.3 | MOS:4.30 | QUALITE:EXCELLENT"
  },
  {
    "id": "vo3-c1-e3",
    "chapter": 1,
    "title": "Convertisseur & Échantillonneur PCM / A-law & µ-law",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler la quantification logarithmique ITU-T G.711 A-law et µ-law et extraire les segments et pas de quantification.",
    "brief": "<p>La numérisation vocale standard G.711 échantillonne la voix à une fréquence de 8 000 Hz avec des échantillons linéaires sur 13 bits (A-law en Europe) ou 14 bits (µ-law en Amérique du Nord).<br>Ces échantillons sont compressés sur 8 bits (1 octet), produisant le débit universel de 64 kbps (8 000 éch/s * 8 bits = 64 000 bps).</p>\n<p>Principe de quantification logarithmique A-law (ITU-T G.711) : Chaque échantillon linéaire entier signé <code>S</code> (-4096 <= S <= 4095) est codé en un octet binaire <code>b7 b6 b5 b4 b3 b2 b1 b0</code> :   - Segment 0 : 0 <= M < 32 -> code binaire segment <code>000</code>, pas = 2   - Segment 1 : 32 <= M < 64 -> code <code>001</code>, pas = 2   - Segment 2 : 64 <= M < 128 -> code <code>010</code>, pas = 4   - Segment 3 : 128 <= M < 256 -> code <code>011</code>, pas = 8   - Segment 4 : 256 <= M < 512 -> code <code>100</code>, pas = 16   - Segment 5 : 512 <= M < 1024 -> code <code>101</code>, pas = 32   - Segment 6 : 1024 <= M < 2048 -> code <code>110</code>, pas = 64   - Segment 7 : 2048 <= M <= 4095 -> code <code>111</code>, pas = 128   où <code>nb_bits_lin</code> est le nombre de bits effectifs (segment + 4).</p><ul><li><code>b7</code> (signe) : 1 si S >= 0, 0 si S < 0.</li><li>L'amplitude absolue <code>M = min(abs(S), 4095)</code> détermine le segment (de 0 à 7) :</li><li>Rapport signal sur bruit de quantification approximé : <code>SQNR_dB = 6.02 * nb_bits_lin + 1.76</code></li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>SAMPLE=<entier_signé> REGION=<EUROPE|AMERIQUE></p>\n<p>Règles de sortie : SAMPLE:<val> | NORME:<A-LAW|U-LAW> | SIGNE:<POSITIF|NEGATIF> | SEGMENT:<0..7> | PAS:<pas></p><ul><li>Déterminer la norme : <code>A-LAW</code> si EUROPE, <code>U-LAW</code> si AMERIQUE.</li><li>Extraire le signe : <code>POSITIF</code> si >= 0 sinon <code>NEGATIF</code>.</li><li>Déterminer l'indice du segment (0 à 7).</li><li>Calculer le pas de quantification associé au segment.</li><li>Afficher la ligne :</li></ul>",
    "starter": "# Grille d'analyse (vo3-c1-e3) — Convertisseur & Échantillonneur PCM / A-law & µ-law\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : SAMPLE=0 REGION=EUROPE\n# Données : SAMPLE=3500 REGION=EUROPE\n# Données : SAMPLE=-50 REGION=AMERIQUE\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : SAMPLE=-300 REGION=EUROPE\n# Données : SAMPLE=800 REGION=AMERIQUE\nA_COMPLETER\n",
    "hints": [
      "Vérifiez la région géographique pour associer A-LAW (Europe) ou U-LAW (Amérique).",
      "Identifiez le segment de 0 à 7 selon l'amplitude absolue bornée à 4095."
    ],
    "examples": [
      {
        "stdin": "SAMPLE=150 REGION=EUROPE\nSAMPLE=-1500 REGION=AMERIQUE\nSAMPLE=25 REGION=EUROPE",
        "expected": "SAMPLE:150 | NORME:A-LAW | SIGNE:POSITIF | SEGMENT:3 | PAS:8\nSAMPLE:-1500 | NORME:U-LAW | SIGNE:NEGATIF | SEGMENT:6 | PAS:64\nSAMPLE:25 | NORME:A-LAW | SIGNE:POSITIF | SEGMENT:0 | PAS:2\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "SAMPLE:0 | NORME:A-LAW | SIGNE:POSITIF | SEGMENT:0 | PAS:2\nSAMPLE:3500 | NORME:A-LAW | SIGNE:POSITIF | SEGMENT:7 | PAS:128\nSAMPLE:-50 | NORME:U-LAW | SIGNE:NEGATIF | SEGMENT:1 | PAS:2\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "SAMPLE:-300 | NORME:A-LAW | SIGNE:NEGATIF | SEGMENT:4 | PAS:16\nSAMPLE:800 | NORME:U-LAW | SIGNE:POSITIF | SEGMENT:5 | PAS:32\n"
      }
    ],
    "solution": "[Exemple]\nSAMPLE:150 | NORME:A-LAW | SIGNE:POSITIF | SEGMENT:3 | PAS:8\nSAMPLE:-1500 | NORME:U-LAW | SIGNE:NEGATIF | SEGMENT:6 | PAS:64\nSAMPLE:25 | NORME:A-LAW | SIGNE:POSITIF | SEGMENT:0 | PAS:2\n\n\n[Cas 1 — Cas de test 1]\nSAMPLE:0 | NORME:A-LAW | SIGNE:POSITIF | SEGMENT:0 | PAS:2\nSAMPLE:3500 | NORME:A-LAW | SIGNE:POSITIF | SEGMENT:7 | PAS:128\nSAMPLE:-50 | NORME:U-LAW | SIGNE:NEGATIF | SEGMENT:1 | PAS:2\n\n\n[Cas 2 — Cas de test 2]\nSAMPLE:-300 | NORME:A-LAW | SIGNE:NEGATIF | SEGMENT:4 | PAS:16\nSAMPLE:800 | NORME:U-LAW | SIGNE:POSITIF | SEGMENT:5 | PAS:32"
  },
  {
    "id": "vo3-c2-e1",
    "chapter": 2,
    "title": "Parseur d'En-têtes de Messages SIP RFC 3261",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser la structure syntaxique d'une trame SIP RFC 3261 et extraire les en-têtes fondamentaux (Call-ID, CSeq, From, To).",
    "brief": "<p>Le protocole SIP (Session Initiation Protocol, RFC 3261) est un protocole textuel de signalisation inspiré d'HTTP. Un message SIP débute par :</p><ul><li>Une ligne de requête (Request-Line) : <code><METHODE> <SIP-URI> SIP/2.0</code> (ex: <code>INVITE sip:bob@biloxi.com SIP/2.0</code>), OU</li><li>Une ligne d'état (Status-Line) : <code>SIP/2.0 <STATUS_CODE> <REASON_PHRASE></code> (ex: <code>SIP/2.0 200 OK</code>).</li></ul>\n<p>Suivent les en-têtes obligatoires :</p><ul><li><code>Call-ID</code>: identifiant unique et aléatoire de l'appel</li><li><code>CSeq</code>: numéro de séquence entier suivi de la méthode (ex: <code>1 INVITE</code>)</li><li><code>From</code>: identité de l'émetteur avec URI et tag optionnel (ex: <code><sip:alice@atlanta.com>;tag=1928301774</code>)</li><li><code>To</code>: identité du destinataire (ex: <code><sip:bob@biloxi.com></code>)</li><li><code>Contact</code>: adresse directe pour acheminer les requêtes ultérieures</li></ul>\n<p>Format d'entrée :<br>Un bloc de message SIP sur STDIN (en-têtes séparés par des retours à la ligne).<br>Le bloc se termine par une ligne vide ou la fin du flux.</p>\n<p>Format de sortie :<br>Extraire et afficher :<br>TYPE:<REQUEST|RESPONSE><br>ACTION_OR_STATUS:<METHODE ou CODE_STATUS><br>CALL_ID:<valeur de Call-ID><br>CSEQ_NUM:<entier><br>CSEQ_METHOD:<nom de méthode><br>FROM_URI:<uri nettoyée sans chevrons ni paramètres><br>TO_URI:<uri nettoyée sans chevrons ni paramètres></p>",
    "starter": "# Grille d'analyse (vo3-c2-e1) — Parseur d'En-têtes de Messages SIP RFC 3261\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : SIP/2.0 200 OK\n# Données : Via: SIP/2.0/UDP pc33.atlanta.com;branch=z9hG4bK776asdhds\n# Données : To: Bob <sip:bob@biloxi.com>;tag=a6c85cf\n# Données : From: Alice <sip:alice@atlanta.com>;tag=1928301774\n# Données : Call-ID: a84b4c76e66710@pc33.atlanta.com\n# Données : CSeq: 314159 INVITE\n# Données : Contact: <sip:bob@192.0.2.4>\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : BYE sip:alice@pc33.atlanta.com SIP/2.0\n# Données : Via: SIP/2.0/UDP 192.0.2.4;branch=z9hG4bKnas77\n# Données : Max-Forwards: 70\n# Données : From: <sip:bob@biloxi.com>;tag=a6c85cf\n# Données : To: <sip:alice@atlanta.com>;tag=1928301774\n# Données : Call-ID: 987654321@biloxi.com\n# Données : CSeq: 2 BYE\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "TYPE:RESPONSE\nACTION_OR_STATUS:200\nCALL_ID:a84b4c76e66710@pc33.atlanta.com\nCSEQ_NUM:314159\nCSEQ_METHOD:INVITE\nFROM_URI:sip:alice@atlanta.com\nTO_URI:sip:bob@biloxi.com\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "TYPE:REQUEST\nACTION_OR_STATUS:BYE\nCALL_ID:987654321@biloxi.com\nCSEQ_NUM:2\nCSEQ_METHOD:BYE\nFROM_URI:sip:bob@biloxi.com\nTO_URI:sip:alice@atlanta.com\n"
      }
    ],
    "solution": "[Exemple]\nTYPE:REQUEST\nACTION_OR_STATUS:INVITE\nCALL_ID:a84b4c76e66710@pc33.atlanta.com\nCSEQ_NUM:314159\nCSEQ_METHOD:INVITE\nFROM_URI:sip:alice@atlanta.com\nTO_URI:sip:bob@biloxi.com\n\n\n[Cas 1 — Cas de test 1]\nTYPE:RESPONSE\nACTION_OR_STATUS:200\nCALL_ID:a84b4c76e66710@pc33.atlanta.com\nCSEQ_NUM:314159\nCSEQ_METHOD:INVITE\nFROM_URI:sip:alice@atlanta.com\nTO_URI:sip:bob@biloxi.com\n\n\n[Cas 2 — Cas de test 2]\nTYPE:REQUEST\nACTION_OR_STATUS:BYE\nCALL_ID:987654321@biloxi.com\nCSEQ_NUM:2\nCSEQ_METHOD:BYE\nFROM_URI:sip:bob@biloxi.com\nTO_URI:sip:alice@atlanta.com"
  },
  {
    "id": "vo3-c2-e2",
    "chapter": 2,
    "title": "Analyseur de Négociation de Session SDP RFC 4566",
    "level": "n2",
    "language": "analyse",
    "goal": "Décoder un corps de message SDP RFC 4566 pour extraire l'adresse IP média, le port RTP et les codecs audio négociés.",
    "brief": "<p>Le protocole SDP (Session Description Protocol, RFC 4566) transporte la description des flux multimédias négociés lors de l'établissement d'un appel SIP. Un corps SDP typique contient :   - <code>0</code> : PCMU/8000 (G.711 µ-law)   - <code>8</code> : PCMA/8000 (G.711 A-law)   - <code>9</code> : G722/8000   - <code>18</code> : G729/8000   - <code>101</code> : telephone-event/8000 (DTMF RFC 2833 / 4733)</p><ul><li><code>v=0</code> : version SDP</li><li><code>o=<username> <sess-id> <sess-version> IN IP4 <ip></code> : origine</li><li><code>c=IN IP4 <ip_media></code> : adresse IP de réception du média RTP</li><li><code>m=audio <port_rtp> RTP/AVP <payload_types...></code> : description du média (ex: audio sur port 10000 avec codecs 0, 8, 18, 101)</li><li>Lignes d'attributs <code>a=rtpmap:<pt> <encoding_name>/<clock_rate></code> :</li><li>Ligne de direction <code>a=<sendrecv|sendonly|recvonly|inactive></code></li></ul>\n<p>Format d'entrée :<br>Un corps SDP sur STDIN.</p>\n<p>Format de sortie :<br>Extraire et afficher :<br>IP_MEDIA:<adresse_ip_media><br>PORT_RTP:<port_entier><br>DIRECTION:<sendrecv|sendonly|recvonly|inactive><br>CODECS:<liste ordonnée des noms de codecs mappés avec leur payload type, format pt:NOM/RATE séparés par virgule></p>",
    "starter": "# Grille d'analyse (vo3-c2-e2) — Analyseur de Négociation de Session SDP RFC 4566\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : v=0\n# Données : o=asterisk 12345 12345 IN IP4 10.0.0.1\n# Données : s=Asterisk PBX\n# Données : c=IN IP4 10.0.0.1\n# Données : t=0 0\n# Données : m=audio 10000 RTP/AVP 8 18\n# Données : a=rtpmap:8 PCMA/8000\n# Données : a=rtpmap:18 G729/8000\n# Données : a=sendonly\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : v=0\n# Données : o=gateway 4455 1 IN IP4 172.16.20.10\n# Données : s=VoIP Gateway\n# Données : c=IN IP4 172.16.20.10\n# Données : t=0 0\n# Données : m=audio 24000 RTP/AVP 9 0 8\n# Données : a=rtpmap:9 G722/8000\n# Données : a=rtpmap:0 PCMU/8000\n# Données : a=rtpmap:8 PCMA/8000\n# Données : a=recvonly\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "IP_MEDIA:10.0.0.1\nPORT_RTP:10000\nDIRECTION:sendonly\nCODECS:8:PCMA/8000,18:G729/8000\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "IP_MEDIA:172.16.20.10\nPORT_RTP:24000\nDIRECTION:recvonly\nCODECS:9:G722/8000,0:PCMU/8000,8:PCMA/8000\n"
      }
    ],
    "solution": "[Exemple]\nIP_MEDIA:192.168.1.50\nPORT_RTP:16384\nDIRECTION:sendrecv\nCODECS:0:PCMU/8000,8:PCMA/8000,101:telephone-event/8000\n\n\n[Cas 1 — Cas de test 1]\nIP_MEDIA:10.0.0.1\nPORT_RTP:10000\nDIRECTION:sendonly\nCODECS:8:PCMA/8000,18:G729/8000\n\n\n[Cas 2 — Cas de test 2]\nIP_MEDIA:172.16.20.10\nPORT_RTP:24000\nDIRECTION:recvonly\nCODECS:9:G722/8000,0:PCMU/8000,8:PCMA/8000"
  },
  {
    "id": "vo3-c2-e3",
    "chapter": 2,
    "title": "Décodeur d'En-tête RTP & Calculateur de Gigue (RFC 3550)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la gigue inter-paquets lissée selon la RFC 3550 à partir des timestamps de transmission et de réception.",
    "brief": "<p>Le protocole RTP (Real-time Transport Protocol, RFC 3550) transporte les trames audio numérisées. Chaque paquet RTP comporte un en-tête fixe de 12 octets contenant :</p><ul><li>Numéro de séquence (Sequence Number, 16 bits) : incrémenté de 1 à chaque paquet.</li><li>Timestamp (32 bits) : échantillon temporel d'horloge (pour G.711 à 8 kHz et 20 ms, l'incrément théorique est de 160 ticks).</li><li>SSRC (Synchronization Source, 32 bits) : identifiant unique de la source.</li></ul>\n<p>Calcul de la gigue inter-paquets (Jitter <code>J</code> en millisecondes) selon l'algorithme RFC 3550 : Soient :   <code>J_i = J_{i-1} + (|D_i| - J_{i-1}) / 16.0</code> (avec <code>J_0 = 0.0</code>).</p><ul><li><code>S_i</code> : timestamp d'émission du paquet i en ticks d'horloge.</li><li><code>R_i</code> : timestamp d'arrivée du paquet i en ticks d'horloge (exprimé à la même échelle d'échantillonnage, ex: 8 000 ticks/sec).</li><li>Différence relative de transit pour le paquet i : <code>D_i = (R_i - S_i) - (R_{i-1} - S_{i-1})</code></li><li>La gigue estimée <code>J_i</code> est lissée selon un filtre passe-bas :</li><li>Conversion de la gigue en millisecondes (pour horloge 8 kHz) : <code>J_ms = (J_i / 8000.0) * 1000.0</code>.</li></ul>\n<p>Format d'entrée :<br>Première ligne : <code>CLOCK_RATE=<fréquence_en_Hz></code> (ex: 8000)<br>Lignes suivantes : paquets reçus ordonnés sous la forme :<br><code>SEQ=<seq> SEND_TS=<ts_emission> RECV_TS=<ts_reception></code></p>\n<p>Format de sortie :<br>Pour chaque paquet à partir du 2e, afficher :<br><code>SEQ:<seq> | DIFF_TRANSIT:<D_i> | JITTER_TICKS:<J_i:.2f> | JITTER_MS:<J_ms:.2f>ms</code></p>",
    "starter": "# Grille d'analyse (vo3-c2-e3) — Décodeur d'En-tête RTP & Calculateur de Gigue (RFC 3550)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : CLOCK_RATE=8000\n# Données : SEQ=1 SEND_TS=0 RECV_TS=160\n# Données : SEQ=2 SEND_TS=160 RECV_TS=380\n# Données : SEQ=3 SEND_TS=320 RECV_TS=500\n# Données : SEQ=4 SEND_TS=480 RECV_TS=740\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : CLOCK_RATE=16000\n# Données : SEQ=500 SEND_TS=50000 RECV_TS=50500\n# Données : SEQ=501 SEND_TS=50320 RECV_TS=50900\n# Données : SEQ=502 SEND_TS=50640 RECV_TS=51100\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "SEQ:2 | DIFF_TRANSIT:60 | JITTER_TICKS:3.75 | JITTER_MS:0.47ms\nSEQ:3 | DIFF_TRANSIT:-40 | JITTER_TICKS:6.02 | JITTER_MS:0.75ms\nSEQ:4 | DIFF_TRANSIT:80 | JITTER_TICKS:10.64 | JITTER_MS:1.33ms\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "SEQ:501 | DIFF_TRANSIT:80 | JITTER_TICKS:5.00 | JITTER_MS:0.31ms\nSEQ:502 | DIFF_TRANSIT:-120 | JITTER_TICKS:12.19 | JITTER_MS:0.76ms\n"
      }
    ],
    "solution": "[Exemple]\nSEQ:101 | DIFF_TRANSIT:10 | JITTER_TICKS:0.62 | JITTER_MS:0.08ms\nSEQ:102 | DIFF_TRANSIT:-20 | JITTER_TICKS:1.84 | JITTER_MS:0.23ms\n\n\n[Cas 1 — Cas de test 1]\nSEQ:2 | DIFF_TRANSIT:60 | JITTER_TICKS:3.75 | JITTER_MS:0.47ms\nSEQ:3 | DIFF_TRANSIT:-40 | JITTER_TICKS:6.02 | JITTER_MS:0.75ms\nSEQ:4 | DIFF_TRANSIT:80 | JITTER_TICKS:10.64 | JITTER_MS:1.33ms\n\n\n[Cas 2 — Cas de test 2]\nSEQ:501 | DIFF_TRANSIT:80 | JITTER_TICKS:5.00 | JITTER_MS:0.31ms\nSEQ:502 | DIFF_TRANSIT:-120 | JITTER_TICKS:12.19 | JITTER_MS:0.76ms"
  },
  {
    "id": "vo3-c3-e1",
    "chapter": 3,
    "title": "Validateur & Générateur de Profils SIP Asterisk",
    "level": "n1",
    "language": "analyse",
    "goal": "Valider la conformité d'une déclaration de compte utilisateur Asterisk dans sip.conf et générer la configuration normalisée.",
    "brief": "<p>Dans Asterisk (fichiers sip.conf ou pjsip.conf), chaque utilisateur ou téléphone IP est modélisé par une section déclarative. Pour un compte SIP standard dans sip.conf, les directives clés sont :</p><ul><li><code>[numero_extension]</code> : en-tête identifiant le numéro (ex: [706438029])</li><li><code>type</code> : friend (émet et reçoit), peer (poste appelant ou trunk externe), user (uniquement entrant)</li><li><code>host</code> : dynamic (nécessite un enregistrement SIP REGISTER) ou IP statique</li><li><code>secret</code> : mot de passe d'authentification SIP (doit comporter au moins 6 caractères)</li><li><code>context</code> : contexte du dialplan dans lequel l'utilisateur évolue (ex: work, interne)</li><li><code>dtmfmode</code> : mode de transmission DTMF (rfc2833 obligatoire pour la ToIP moderne)</li><li><code>disallow</code> : all (désactive tous les codecs)</li><li><code>allow</code> : codecs autorisés (ex: ulaw, alaw, g729)</li></ul>\n<p>Format d'entrée :<br>Lignes décrivant un compte SIP sous forme :<br>NUM=<ext> TYPE=<friend|peer|user> HOST=<dynamic|ip> SECRET=<pass> CONTEXT=<nom> CODECS=<c1,c2,...></p>\n<p>Pour chaque compte, vérifier :<br>1. NUM doit être composé de 3 à 10 chiffres.<br>2. TYPE doit appartenir à {friend, peer, user}.<br>3. SECRET doit faire au moins 6 caractères.<br>4. CODECS ne doit pas être vide.<br>Si tout est valide, générer le bloc de configuration compact formaté pour Asterisk. Sinon afficher ERREUR avec le motif du refus.</p>\n<p>Format de sortie :<br>Si valide :<br>[<ext>] | type=<type> | host=<host> | secret=*** | context=<context> | dtmfmode=rfc2833 | disallow=all | allow=<codecs><br>Si invalide :<br>REJET:<ext> | MOTIF:<NUM_INVALIDE|SECRET_TROP_COURT|TYPE_INCONNU|CODECS_VIDES></p>",
    "starter": "# Grille d'analyse (vo3-c3-e1) — Validateur & Générateur de Profils SIP Asterisk\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : NUM=6001 TYPE=peer HOST=192.168.1.100 SECRET=TrunkSecure2026 CONTEXT=incoming CODECS=g729,alaw\n# Données : NUM=8002 TYPE=admin HOST=dynamic SECRET=PassAdmin99 CONTEXT=work CODECS=alaw\n# Données : NUM=9003 TYPE=friend HOST=dynamic SECRET=MySecretPass CONTEXT=interne CODECS=\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : NUM=1001 TYPE=user HOST=dynamic SECRET=Abcdef1 CONTEXT=default CODECS=opus,ulaw\n# Données : NUM=abcdef TYPE=friend HOST=dynamic SECRET=ValidPass123 CONTEXT=work CODECS=alaw\nA_COMPLETER\n",
    "hints": [
      "Vérifiez que toutes les directives obligatoires (type, host, secret, context) sont présentes.",
      "Assurez-vous que disallow=all précède les directives allow autorisant les codecs."
    ],
    "examples": [
      {
        "stdin": "NUM=706438029 TYPE=friend HOST=dynamic SECRET=PassSecret8190 CONTEXT=work CODECS=ulaw,alaw\nNUM=10 TYPE=friend HOST=dynamic SECRET=secret CONTEXT=work CODECS=alaw\nNUM=785446979 TYPE=friend HOST=dynamic SECRET=123 CONTEXT=work CODECS=ulaw",
        "expected": "[706438029] | type=friend | host=dynamic | secret=*** | context=work | dtmfmode=rfc2833 | disallow=all | allow=ulaw,alaw\nREJET:10 | MOTIF:NUM_INVALIDE\nREJET:785446979 | MOTIF:SECRET_TROP_COURT\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "[6001] | type=peer | host=192.168.1.100 | secret=*** | context=incoming | dtmfmode=rfc2833 | disallow=all | allow=g729,alaw\nREJET:8002 | MOTIF:TYPE_INCONNU\nREJET:9003 | MOTIF:CODECS_VIDES\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "[1001] | type=user | host=dynamic | secret=*** | context=default | dtmfmode=rfc2833 | disallow=all | allow=opus,ulaw\nREJET:abcdef | MOTIF:NUM_INVALIDE\n"
      }
    ],
    "solution": "[Exemple]\n[706438029] | type=friend | host=dynamic | secret=*** | context=work | dtmfmode=rfc2833 | disallow=all | allow=ulaw,alaw\nREJET:10 | MOTIF:NUM_INVALIDE\nREJET:785446979 | MOTIF:SECRET_TROP_COURT\n\n\n[Cas 1 — Cas de test 1]\n[6001] | type=peer | host=192.168.1.100 | secret=*** | context=incoming | dtmfmode=rfc2833 | disallow=all | allow=g729,alaw\nREJET:8002 | MOTIF:TYPE_INCONNU\nREJET:9003 | MOTIF:CODECS_VIDES\n\n\n[Cas 2 — Cas de test 2]\n[1001] | type=user | host=dynamic | secret=*** | context=default | dtmfmode=rfc2833 | disallow=all | allow=opus,ulaw\nREJET:abcdef | MOTIF:NUM_INVALIDE"
  },
  {
    "id": "vo3-c3-e2",
    "chapter": 3,
    "title": "Gestionnaire de Boîtes Vocales Asterisk (voicemail.conf)",
    "level": "n2",
    "language": "analyse",
    "goal": "Parser la configuration des boîtes vocales voicemail.conf et calculer l'espace de stockage des messages audio.",
    "brief": "<p>Dans Asterisk, la messagerie vocale est configurée dans le fichier <code>voicemail.conf</code> sous des contextes dédiés.<br>Chaque boîte vocale est déclarée sur une ligne au format :<br><code><mailbox_num> => <pin_code>,<nom_utilisateur>,<email_notification>,<options></code></p>\n<p>Exemple :<br><code>706438029 => 8190,Pape Moussa SONKO,assoum1024@gmail.com,attach=yes</code></p>\n<p>Règles de validation :</p><ul><li><code>mailbox_num</code> : entier de 3 à 10 chiffres</li><li><code>pin_code</code> : code PIN secret à 4 chiffres (ex: 8190)</li><li><code>nom_utilisateur</code> : chaîne non vide</li><li><code>email_notification</code> : doit contenir un '@' et un '.' valide</li><li><code>quota_messages</code> : seuil maximal de messages (défaut 50)</li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>BOX=<num> PIN=<pin> NAME=<nom> EMAIL=<email> MSG_COUNT=<nb_messages_actuels></p>\n<p>Format de sortie :<br>Pour chaque boîte vocale :<br>1. Valider le format (numéro, PIN à 4 chiffres, email).<br>2. Si invalide, afficher : <code>VOICEMAIL_REJET:<num> | MOTIF:<PIN_INVALIDE|EMAIL_INVALIDE|NUM_INVALIDE></code>.<br>3. Si valide :<br>   Calculer le statut :<br>   - Si <code>MSG_COUNT >= 50</code> : <code>STATUT:PLEINE</code><br>   - Si <code>MSG_COUNT >= 40</code> : <code>STATUT:AVERTISSEMENT</code><br>   - Sinon : <code>STATUT:OK</code><br>   Afficher :<br>   <code>VM:<num> | NOM:<nom> | PIN:**** | EMAIL:<email> | STOCKAGE:<msg>/50 | STATUT:<statut></code></p>",
    "starter": "# Grille d'analyse (vo3-c3-e2) — Gestionnaire de Boîtes Vocales Asterisk (voicemail.conf)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : BOX=5001 PIN=9988 NAME=Support Technique EMAIL=support@voip.lan MSG_COUNT=50\n# Données : BOX=5002 PIN=1122 NAME=Direction Générale EMAIL=dir@voip.lan MSG_COUNT=42\n# Données : BOX=abc PIN=1234 NAME=Invalide EMAIL=inv@voip.lan MSG_COUNT=0\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : BOX=600 PIN=0000 NAME=Accueil Standard EMAIL=accueil@corp.com MSG_COUNT=55\n# Données : BOX=700 PIN=12345 NAME=Test EMAIL=test@test.com MSG_COUNT=1\nA_COMPLETER\n",
    "hints": [
      "Découpez chaque ligne de boîte vocale par les séparateurs => et les virgules.",
      "Calculez le volume audio en multipliant la durée par le débit G.711 de 8 000 octets/seconde."
    ],
    "examples": [
      {
        "stdin": "BOX=706438029 PIN=8190 NAME=Pape Moussa SONKO EMAIL=assoum1024@gmail.com MSG_COUNT=12\nBOX=101 PIN=12 EMAIL=test@corp.fr NAME=Alice MSG_COUNT=5\nBOX=2001 PIN=4321 NAME=Bob Smith EMAIL=bob.smith MSG_COUNT=45",
        "expected": "VM:706438029 | NOM:Pape Moussa SONKO | PIN:**** | EMAIL:assoum1024@gmail.com | STOCKAGE:12/50 | STATUT:OK\nVOICEMAIL_REJET:101 | MOTIF:PIN_INVALIDE\nVOICEMAIL_REJET:2001 | MOTIF:EMAIL_INVALIDE\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "VM:5001 | NOM:Support Technique | PIN:**** | EMAIL:support@voip.lan | STOCKAGE:50/50 | STATUT:PLEINE\nVM:5002 | NOM:Direction Générale | PIN:**** | EMAIL:dir@voip.lan | STOCKAGE:42/50 | STATUT:AVERTISSEMENT\nVOICEMAIL_REJET:abc | MOTIF:NUM_INVALIDE\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "VM:600 | NOM:Accueil Standard | PIN:**** | EMAIL:accueil@corp.com | STOCKAGE:55/50 | STATUT:PLEINE\nVOICEMAIL_REJET:700 | MOTIF:PIN_INVALIDE\n"
      }
    ],
    "solution": "[Exemple]\nVM:706438029 | NOM:Pape Moussa SONKO | PIN:**** | EMAIL:assoum1024@gmail.com | STOCKAGE:12/50 | STATUT:OK\nVOICEMAIL_REJET:101 | MOTIF:PIN_INVALIDE\nVOICEMAIL_REJET:2001 | MOTIF:EMAIL_INVALIDE\n\n\n[Cas 1 — Cas de test 1]\nVM:5001 | NOM:Support Technique | PIN:**** | EMAIL:support@voip.lan | STOCKAGE:50/50 | STATUT:PLEINE\nVM:5002 | NOM:Direction Générale | PIN:**** | EMAIL:dir@voip.lan | STOCKAGE:42/50 | STATUT:AVERTISSEMENT\nVOICEMAIL_REJET:abc | MOTIF:NUM_INVALIDE\n\n\n[Cas 2 — Cas de test 2]\nVM:600 | NOM:Accueil Standard | PIN:**** | EMAIL:accueil@corp.com | STOCKAGE:55/50 | STATUT:PLEINE\nVOICEMAIL_REJET:700 | MOTIF:PIN_INVALIDE"
  },
  {
    "id": "vo3-c3-e3",
    "chapter": 3,
    "title": "Analyseur de Télémétrie SIP Registrar & Expiration de Baux",
    "level": "n3",
    "language": "analyse",
    "goal": "Gérer les baux d'enregistrement SIP auprès du Registrar et détecter les expirations de contacts.",
    "brief": "<p>Le serveur SIP Registrar maintient la base des associations entre l'adresse logique (Address of Record, AOR: ex: sip:701@voip.lan) et l'adresse IP de contact réelle.<br>Chaque requête <code>REGISTER</code> comporte un en-tête <code>Expires: <secondes></code> (typiquement 3 600 s) renouvelant le bail de l'équipement.<br>Si aucun REGISTER n'est reçu avant expiration du délai (avec une tolérance de 60 s), le poste bascule en état <code>UNREACHABLE</code> (hors-ligne).<br>De plus, si la latence réseau (RTT en ms mesuré par paquets OPTIONS périodiques) dépasse 150 ms, le poste est qualifié de <code>LAGGED</code> (gigue/délai excessif).</p>\n<p>Format d'entrée :<br>Lignes au format :<br>EXTENSION=<num> IP_CONTACT=<ip:port> LAST_SEEN_SEC=<secondes_depuis_dernier_register> EXPIRES=<duree_bail> RTT_MS=<latence></p>\n<p>Règles de qualification :<br>1. Calculer le temps restant du bail : <code>REMAINING = EXPIRES - LAST_SEEN_SEC</code>.<br>2. Déterminer l'état de joignabilité :<br>   - Si <code>LAST_SEEN_SEC > EXPIRES + 60</code> : <code>STATUT = EXPIRED</code><br>   - Sinon si <code>RTT_MS < 0</code> ou <code>RTT_MS > 300</code> : <code>STATUT = UNREACHABLE</code><br>   - Sinon si <code>RTT_MS > 150</code> : <code>STATUT = LAGGED</code><br>   - Sinon : <code>STATUT = REACHABLE</code></p>\n<p>Format de sortie :<br>Pour chaque ligne, afficher :<br>EXT:<num> | IP:<ip:port> | BAIL_RESTANT:<REMAINING>s | LATENCE:<RTT_MS>ms | STATUT:<statut></p>",
    "starter": "# Grille d'analyse (vo3-c3-e3) — Analyseur de Télémétrie SIP Registrar & Expiration de Baux\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : EXTENSION=100 IP_CONTACT=10.0.4.12:5060 LAST_SEEN_SEC=500 EXPIRES=600 RTT_MS=450\n# Données : EXTENSION=101 IP_CONTACT=10.0.4.13:5060 LAST_SEEN_SEC=50 EXPIRES=3600 RTT_MS=8\n# Données : EXTENSION=102 IP_CONTACT=10.0.4.14:5060 LAST_SEEN_SEC=4000 EXPIRES=3600 RTT_MS=-1\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : EXTENSION=800 IP_CONTACT=172.20.1.1:5060 LAST_SEEN_SEC=1700 EXPIRES=1800 RTT_MS=160\n# Données : EXTENSION=801 IP_CONTACT=172.20.1.2:5060 LAST_SEEN_SEC=1850 EXPIRES=1800 RTT_MS=30\nA_COMPLETER\n",
    "hints": [
      "Comparez le temps écoulé depuis le dernier contact avec le paramètre expires.",
      "Marquez le statut comme ACTIF si le bail est valide, sinon EXPIRE."
    ],
    "examples": [
      {
        "stdin": "EXTENSION=701 IP_CONTACT=192.168.1.50:5060 LAST_SEEN_SEC=120 EXPIRES=3600 RTT_MS=15\nEXTENSION=702 IP_CONTACT=192.168.1.51:5060 LAST_SEEN_SEC=3700 EXPIRES=3600 RTT_MS=20\nEXTENSION=703 IP_CONTACT=192.168.1.52:5060 LAST_SEEN_SEC=200 EXPIRES=1800 RTT_MS=195",
        "expected": "EXT:701 | IP:192.168.1.50:5060 | BAIL_RESTANT:3480s | LATENCE:15ms | STATUT:REACHABLE\nEXT:702 | IP:192.168.1.51:5060 | BAIL_RESTANT:-100s | LATENCE:20ms | STATUT:EXPIRED\nEXT:703 | IP:192.168.1.52:5060 | BAIL_RESTANT:1600s | LATENCE:195ms | STATUT:LAGGED\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "EXT:100 | IP:10.0.4.12:5060 | BAIL_RESTANT:100s | LATENCE:450ms | STATUT:UNREACHABLE\nEXT:101 | IP:10.0.4.13:5060 | BAIL_RESTANT:3550s | LATENCE:8ms | STATUT:REACHABLE\nEXT:102 | IP:10.0.4.14:5060 | BAIL_RESTANT:-400s | LATENCE:-1ms | STATUT:EXPIRED\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "EXT:800 | IP:172.20.1.1:5060 | BAIL_RESTANT:100s | LATENCE:160ms | STATUT:LAGGED\nEXT:801 | IP:172.20.1.2:5060 | BAIL_RESTANT:-50s | LATENCE:30ms | STATUT:REACHABLE\n"
      }
    ],
    "solution": "[Exemple]\nEXT:701 | IP:192.168.1.50:5060 | BAIL_RESTANT:3480s | LATENCE:15ms | STATUT:REACHABLE\nEXT:702 | IP:192.168.1.51:5060 | BAIL_RESTANT:-100s | LATENCE:20ms | STATUT:EXPIRED\nEXT:703 | IP:192.168.1.52:5060 | BAIL_RESTANT:1600s | LATENCE:195ms | STATUT:LAGGED\n\n\n[Cas 1 — Cas de test 1]\nEXT:100 | IP:10.0.4.12:5060 | BAIL_RESTANT:100s | LATENCE:450ms | STATUT:UNREACHABLE\nEXT:101 | IP:10.0.4.13:5060 | BAIL_RESTANT:3550s | LATENCE:8ms | STATUT:REACHABLE\nEXT:102 | IP:10.0.4.14:5060 | BAIL_RESTANT:-400s | LATENCE:-1ms | STATUT:EXPIRED\n\n\n[Cas 2 — Cas de test 2]\nEXT:800 | IP:172.20.1.1:5060 | BAIL_RESTANT:100s | LATENCE:160ms | STATUT:LAGGED\nEXT:801 | IP:172.20.1.2:5060 | BAIL_RESTANT:-50s | LATENCE:30ms | STATUT:REACHABLE"
  },
  {
    "id": "vo3-c4-e1",
    "chapter": 4,
    "title": "Parseur & Routeur de Dialplan Asterisk (extensions.conf)",
    "level": "n1",
    "language": "analyse",
    "goal": "Évaluer la logique séquentielle des règles d'extensions et priorités dans le Dialplan extensions.conf d'Asterisk.",
    "brief": "<p>Dans Asterisk, le plan de numérotation (Dialplan) est décrit dans <code>extensions.conf</code>.<br>Chaque ligne d'instruction suit la syntaxe :<br><code>exten => <extension>,<priorite>,<application>(<arguments>)</code></p>\n<p>Exemples :<br><code>exten => 100,1,Answer()</code><br><code>exten => 100,2,Playback(bienvenue)</code><br><code>exten => 100,3,Dial(SIP/100,20)</code><br><code>exten => 100,4,VoiceMail(100@default,u)</code><br><code>exten => 100,5,Hangup()</code></p>\n<p>Les applications courantes sont :</p><ul><li><code>Answer</code> : décroche l'appel</li><li><code>Playback</code> : joue un fichier son</li><li><code>Dial</code> : tente de joindre une cible (technologie/cible, timeout)</li><li><code>VoiceMail</code> : redirige vers la messagerie</li><li><code>Hangup</code> : raccroche la ligne</li></ul>\n<p>Format d'entrée :<br>Lignes de dialplan d'une extension donnée sur STDIN.</p>\n<p>Format de sortie :<br>Pour chaque ligne :<br>1. Extraire : extension, numéro de priorité (ou 'n'), nom de l'application et arguments.<br>2. Déterminer la catégorie de l'application :<br>   - Answer -> CALL_CONTROL<br>   - Playback, Background -> MEDIA<br>   - Dial -> ROUTING<br>   - VoiceMail -> MESSAGING<br>   - Hangup -> TERMINATION<br>   - Autre -> MISC<br>3. Afficher :<br><code>EXT:<ext> | PRIO:<prio> | APP:<app> | ARGS:<args> | CATEGORIE:<cat></code></p>",
    "starter": "# Grille d'analyse (vo3-c4-e1) — Parseur & Routeur de Dialplan Asterisk (extensions.conf)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : exten => 101,1,Dial(SIP/101,15)\n# Données : exten => 101,2,GotoIf($[\"${DIALSTATUS}\" = \"BUSY\"]?busy:unavail)\n# Données : exten => 101,3,Hangup()\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : exten => s,1,Answer()\n# Données : exten => s,2,Background(menu-acceuil)\n# Données : exten => s,3,WaitExten(5)\n# Données : exten => s,4,Hangup()\nA_COMPLETER\n",
    "hints": [
      "Filtrez les règles appartenant au contexte de l'appelant.",
      "Exécutez séquentiellement les priorités 1, 2, n associées à l'extension composée."
    ],
    "examples": [
      {
        "stdin": "exten => 600,1,Answer()\nexten => 600,2,Playback(vm-intro)\nexten => 600,3,VoiceMailMain(${CALLERID(num)}@work)\nexten => 600,4,Hangup()",
        "expected": "EXT:600 | PRIO:1 | APP:Answer | ARGS: | CATEGORIE:CALL_CONTROL\nEXT:600 | PRIO:2 | APP:Playback | ARGS:vm-intro | CATEGORIE:MEDIA\nEXT:600 | PRIO:3 | APP:VoiceMailMain | ARGS:${CALLERID(num)}@work | CATEGORIE:MESSAGING\nEXT:600 | PRIO:4 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "EXT:101 | PRIO:1 | APP:Dial | ARGS:SIP/101,15 | CATEGORIE:ROUTING\nEXT:101 | PRIO:2 | APP:GotoIf | ARGS:$[\"${DIALSTATUS}\" = \"BUSY\"]?busy:unavail | CATEGORIE:MISC\nEXT:101 | PRIO:3 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "EXT:s | PRIO:1 | APP:Answer | ARGS: | CATEGORIE:CALL_CONTROL\nEXT:s | PRIO:2 | APP:Background | ARGS:menu-acceuil | CATEGORIE:MEDIA\nEXT:s | PRIO:3 | APP:WaitExten | ARGS:5 | CATEGORIE:MISC\nEXT:s | PRIO:4 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n"
      }
    ],
    "solution": "[Exemple]\nEXT:600 | PRIO:1 | APP:Answer | ARGS: | CATEGORIE:CALL_CONTROL\nEXT:600 | PRIO:2 | APP:Playback | ARGS:vm-intro | CATEGORIE:MEDIA\nEXT:600 | PRIO:3 | APP:VoiceMailMain | ARGS:${CALLERID(num)}@work | CATEGORIE:MESSAGING\nEXT:600 | PRIO:4 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n\n\n[Cas 1 — Cas de test 1]\nEXT:101 | PRIO:1 | APP:Dial | ARGS:SIP/101,15 | CATEGORIE:ROUTING\nEXT:101 | PRIO:2 | APP:GotoIf | ARGS:$[\"${DIALSTATUS}\" = \"BUSY\"]?busy:unavail | CATEGORIE:MISC\nEXT:101 | PRIO:3 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n\n\n[Cas 2 — Cas de test 2]\nEXT:s | PRIO:1 | APP:Answer | ARGS: | CATEGORIE:CALL_CONTROL\nEXT:s | PRIO:2 | APP:Background | ARGS:menu-acceuil | CATEGORIE:MEDIA\nEXT:s | PRIO:3 | APP:WaitExten | ARGS:5 | CATEGORIE:MISC\nEXT:s | PRIO:4 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION"
  },
  {
    "id": "vo3-c4-e2",
    "chapter": 4,
    "title": "Matcher de Masques de Numérotation Asterisk (Pattern Matching)",
    "level": "n2",
    "language": "analyse",
    "goal": "Implémenter le moteur de pattern matching d'Asterisk avec masques _X, _Z, _N et extraction de variables ${EXTEN}.",
    "brief": "<p>Dans Asterisk, les extensions peuvent être définies par des motifs (patterns) débutant par un souligné <code>_</code>. La syntaxe standard des motifs de numérotation Asterisk est :</p><ul><li><code>X</code> : correspond à n'importe quel chiffre de 0 à 9</li><li><code>Z</code> : correspond à n'importe quel chiffre de 1 à 9</li><li><code>N</code> : correspond à n'importe quel chiffre de 2 à 9</li><li><code>[1357]</code> : correspond à l'un des chiffres entre crochets</li><li><code>.</code> (point) : joker correspondant à un ou plusieurs caractères quelconques (en fin de motif)</li><li><code>!</code> (point d'exclamation) : joker correspondant à zéro ou plusieurs caractères</li></ul>\n<p>Exemples :</p><ul><li><code>_7XXXXXXXX</code> : correspond aux numéros sénégalais de 9 chiffres débutant par 7 (de 700000000 à 799999999).</li><li><code>_0[1-5]XXXXXXXX</code> : numéros géographiques français fixes (10 chiffres).</li><li><code>_9.</code> : tout appel sortant avec préfixe 9.</li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>PATTERN=<motif_asterisk> NUM=<numero_compose></p>\n<p>Règles :<br>1. Convertir le motif Asterisk en expression régulière équivalente.<br>2. Si le motif ne commence pas par <code>_</code>, il s'agit d'une correspondance littérale exacte.<br>3. Vérifier si NUM correspond au motif.<br>4. Si correspondance : extraire la valeur qui serait affectée à la variable <code>${EXTEN}</code> (soit le numéro entier) et indiquer <code>MATCH:OUI</code>.<br>5. Sinon indiquer <code>MATCH:NON</code>.</p>\n<p>Format de sortie :<br>Pour chaque test :<br>PATTERN:<pattern> | NUM:<num> | REGEX:<regex> | RESULTAT:<MATCH:OUI|MATCH:NON></p>",
    "starter": "# Grille d'analyse (vo3-c4-e2) — Matcher de Masques de Numérotation Asterisk (Pattern Matching)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : PATTERN=_NXX NUM=250\n# Données : PATTERN=_NXX NUM=150\n# Données : PATTERN=_9. NUM=90123456789\n# Données : PATTERN=_9. NUM=9\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : PATTERN=_ZXXX NUM=1000\n# Données : PATTERN=_ZXXX NUM=0500\nA_COMPLETER\n",
    "hints": [
      "Les motifs de numérotation débutent obligatoirement par un caractère souligné _.",
      "Traduisez X en [0-9], Z en [1-9] et N en [2-9] pour tester la correspondance."
    ],
    "examples": [
      {
        "stdin": "PATTERN=_7XXXXXXXX NUM=706438029\nPATTERN=_7XXXXXXXX NUM=806438029\nPATTERN=_0[1-5]XXXXXXXX NUM=0140203040\nPATTERN=600 NUM=600",
        "expected": "PATTERN:_7XXXXXXXX | NUM:706438029 | REGEX:^7[0-9]{8}$ | RESULTAT:MATCH:OUI\nPATTERN:_7XXXXXXXX | NUM:806438029 | REGEX:^7[0-9]{8}$ | RESULTAT:MATCH:NON\nPATTERN:_0[1-5]XXXXXXXX | NUM:0140203040 | REGEX:^0[1-5][0-9]{8}$ | RESULTAT:MATCH:OUI\nPATTERN:600 | NUM:600 | REGEX:^600$ | RESULTAT:MATCH:OUI\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "PATTERN:_NXX | NUM:250 | REGEX:^[2-9][0-9]{2}$ | RESULTAT:MATCH:OUI\nPATTERN:_NXX | NUM:150 | REGEX:^[2-9][0-9]{2}$ | RESULTAT:MATCH:NON\nPATTERN:_9. | NUM:90123456789 | REGEX:^9.+$ | RESULTAT:MATCH:OUI\nPATTERN:_9. | NUM:9 | REGEX:^9.+$ | RESULTAT:MATCH:NON\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "PATTERN:_ZXXX | NUM:1000 | REGEX:^[1-9][0-9]{3}$ | RESULTAT:MATCH:OUI\nPATTERN:_ZXXX | NUM:0500 | REGEX:^[1-9][0-9]{3}$ | RESULTAT:MATCH:NON\n"
      }
    ],
    "solution": "[Exemple]\nPATTERN:_7XXXXXXXX | NUM:706438029 | REGEX:^7[0-9]{8}$ | RESULTAT:MATCH:OUI\nPATTERN:_7XXXXXXXX | NUM:806438029 | REGEX:^7[0-9]{8}$ | RESULTAT:MATCH:NON\nPATTERN:_0[1-5]XXXXXXXX | NUM:0140203040 | REGEX:^0[1-5][0-9]{8}$ | RESULTAT:MATCH:OUI\nPATTERN:600 | NUM:600 | REGEX:^600$ | RESULTAT:MATCH:OUI\n\n\n[Cas 1 — Cas de test 1]\nPATTERN:_NXX | NUM:250 | REGEX:^[2-9][0-9]{2}$ | RESULTAT:MATCH:OUI\nPATTERN:_NXX | NUM:150 | REGEX:^[2-9][0-9]{2}$ | RESULTAT:MATCH:NON\nPATTERN:_9. | NUM:90123456789 | REGEX:^9.+$ | RESULTAT:MATCH:OUI\nPATTERN:_9. | NUM:9 | REGEX:^9.+$ | RESULTAT:MATCH:NON\n\n\n[Cas 2 — Cas de test 2]\nPATTERN:_ZXXX | NUM:1000 | REGEX:^[1-9][0-9]{3}$ | RESULTAT:MATCH:OUI\nPATTERN:_ZXXX | NUM:0500 | REGEX:^[1-9][0-9]{3}$ | RESULTAT:MATCH:NON"
  },
  {
    "id": "vo3-c4-e3",
    "chapter": 4,
    "title": "Simulateur de Serveur Vocal Interactif SVI / IVR",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler la navigation dans un serveur vocal interactif (SVI/IVR) avec gestion des touches DTMF, timeouts (t) et erreurs (i).",
    "brief": "<p>Un Serveur Vocal Interactif (SVI ou IVR) oriente automatiquement les appelants selon les touches DTMF saisies. Dans Asterisk, le menu d'accueil joue un message audio avec l'application <code>Background()</code> puis attend une saisie avec <code>WaitExten()</code>. Si l'appelant appuie sur :</p><ul><li><code>1</code> : Service Commercial (routage vers <code>Queue(commercial)</code>)</li><li><code>2</code> : Support Technique (routage vers <code>Queue(support)</code>)</li><li><code>3</code> : Facturation / Comptabilité (routage vers <code>Dial(SIP/301)</code>)</li><li><code>9</code> : Répéter le menu (redirection vers <code>Goto(menu,s,1)</code>)</li><li><code>t</code> (Timeout, aucune touche après 5 secondes) : rejoue le menu ou raccroche après 2 tentatives.</li><li><code>i</code> (Touche invalide) : joue un message d'erreur <code>Playback(invalid)</code> et réinvite l'utilisateur.</li></ul>\n<p>Format d'entrée :<br>Lignes simulant des sessions d'appelants sous la forme :<br>SESSION=<id> DTMF_INPUT=<touche> ATTEMPTS=<nb_essais_deja_faits></p>\n<p>Règles de décision :   - Si ATTEMPTS >= 2 -> ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT   - Sinon -> ACTION:RELANCER | CIBLE:WaitExten(5) | SUITE:RETRY   - Si ATTEMPTS >= 2 -> ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_INVALID   - Sinon -> ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY</p><ul><li>DTMF '1' -> ACTION:ROUTER | CIBLE:Queue(commercial) | SUITE:SUCCES</li><li>DTMF '2' -> ACTION:ROUTER | CIBLE:Queue(support) | SUITE:SUCCES</li><li>DTMF '3' -> ACTION:ROUTER | CIBLE:Dial(SIP/301) | SUITE:SUCCES</li><li>DTMF '9' -> ACTION:REPETER | CIBLE:Goto(menu,s,1) | SUITE:REJOUER</li><li>DTMF 'TIMEOUT' ou 't' :</li><li>Toute autre touche (invalide) :</li></ul>\n<p>Format de sortie :<br>Pour chaque session :<br>SESSION:<id> | TOUCHE:<dtmf> | ESSAIS:<attempts> | ACTION:<action> | CIBLE:<cible> | SUITE:<suite></p>",
    "starter": "# Grille d'analyse (vo3-c4-e3) — Simulateur de Serveur Vocal Interactif SVI / IVR\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : SESSION=A10 DTMF_INPUT=3 ATTEMPTS=0\n# Données : SESSION=A11 DTMF_INPUT=9 ATTEMPTS=1\n# Données : SESSION=A12 DTMF_INPUT=t ATTEMPTS=3\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : SESSION=B20 DTMF_INPUT=* ATTEMPTS=2\n# Données : SESSION=B21 DTMF_INPUT=# ATTEMPTS=0\nA_COMPLETER\n",
    "hints": [
      "Aiguillez l'appelant vers l'extension correspondant au chiffre DTMF saisi.",
      "Exécutez l'extension t en cas de timeout et l'extension i si la touche est invalide."
    ],
    "examples": [
      {
        "stdin": "SESSION=S001 DTMF_INPUT=1 ATTEMPTS=0\nSESSION=S002 DTMF_INPUT=2 ATTEMPTS=0\nSESSION=S003 DTMF_INPUT=TIMEOUT ATTEMPTS=1\nSESSION=S004 DTMF_INPUT=TIMEOUT ATTEMPTS=2\nSESSION=S005 DTMF_INPUT=7 ATTEMPTS=0",
        "expected": "SESSION:S001 | TOUCHE:1 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Queue(commercial) | SUITE:SUCCES\nSESSION:S002 | TOUCHE:2 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Queue(support) | SUITE:SUCCES\nSESSION:S003 | TOUCHE:TIMEOUT | ESSAIS:1 | ACTION:RELANCER | CIBLE:WaitExten(5) | SUITE:RETRY\nSESSION:S004 | TOUCHE:TIMEOUT | ESSAIS:2 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT\nSESSION:S005 | TOUCHE:7 | ESSAIS:0 | ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "SESSION:A10 | TOUCHE:3 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Dial(SIP/301) | SUITE:SUCCES\nSESSION:A11 | TOUCHE:9 | ESSAIS:1 | ACTION:REPETER | CIBLE:Goto(menu,s,1) | SUITE:REJOUER\nSESSION:A12 | TOUCHE:t | ESSAIS:3 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "SESSION:B20 | TOUCHE:* | ESSAIS:2 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_INVALID\nSESSION:B21 | TOUCHE:# | ESSAIS:0 | ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY\n"
      }
    ],
    "solution": "[Exemple]\nSESSION:S001 | TOUCHE:1 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Queue(commercial) | SUITE:SUCCES\nSESSION:S002 | TOUCHE:2 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Queue(support) | SUITE:SUCCES\nSESSION:S003 | TOUCHE:TIMEOUT | ESSAIS:1 | ACTION:RELANCER | CIBLE:WaitExten(5) | SUITE:RETRY\nSESSION:S004 | TOUCHE:TIMEOUT | ESSAIS:2 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT\nSESSION:S005 | TOUCHE:7 | ESSAIS:0 | ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY\n\n\n[Cas 1 — Cas de test 1]\nSESSION:A10 | TOUCHE:3 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Dial(SIP/301) | SUITE:SUCCES\nSESSION:A11 | TOUCHE:9 | ESSAIS:1 | ACTION:REPETER | CIBLE:Goto(menu,s,1) | SUITE:REJOUER\nSESSION:A12 | TOUCHE:t | ESSAIS:3 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT\n\n\n[Cas 2 — Cas de test 2]\nSESSION:B20 | TOUCHE:* | ESSAIS:2 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_INVALID\nSESSION:B21 | TOUCHE:# | ESSAIS:0 | ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY"
  },
  {
    "id": "vo3-c5-e1",
    "chapter": 5,
    "title": "Calculateur d'Erlang B & Dimensionnement de Trunks Téléphoniques",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la probabilité de blocage GoS par la formule récursive d'Erlang B et dimensionner le nombre de canaux requis.",
    "brief": "<p>La loi d'Erlang B modélise la probabilité de blocage d'appels téléphoniques (Grade of Service, GoS) sur un faisceau (trunk) de <code>N</code> canaux sans mise en attente (appels rejetés si tous les canaux sont occupés).<br>Le trafic offert <code>A</code> (en Erlangs) est calculé par :<br><code>A = (CALLS_PER_HOUR * DURATION_SEC) / 3600.0</code></p>\n<p>La formule récursive d'Erlang B pour calculer la probabilité de blocage <code>B(N, A)</code> est :</p><ul><li><code>B(0, A) = 1.0</code></li><li><code>B(k, A) = (A * B(k-1, A)) / (k + A * B(k-1, A))</code> pour <code>k = 1, 2, ..., N</code>.</li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>CALLS_PER_HOUR=<nb> DURATION_SEC=<duree_moyenne> CHANNELS=<nb_canaux> TARGET_GOS_PCT=<seuil_gos_max_pct></p>\n<p>Règles de calcul :<br>1. Calculer le trafic offert <code>A</code> en Erlangs.<br>2. Calculer la probabilité de blocage réelle <code>B(N, A)</code> en pourcentage (<code>B * 100.0</code>).<br>3. Comparer avec le seuil cible <code>TARGET_GOS_PCT</code> :<br>   - Si <code>blocage_pct <= TARGET_GOS_PCT</code> -> <code>CONFORME:OUI</code><br>   - Sinon -> <code>CONFORME:NON</code><br>4. Déterminer le nombre minimal de canaux <code>N_MIN</code> nécessaires pour que <code>B(N_MIN, A) * 100.0 <= TARGET_GOS_PCT</code>.</p>\n<p>Format de sortie :<br>Pour chaque ligne, afficher :<br>TRAFIC:<A:.2f>E | CANAUX:<N> | BLOCAGE:<blocage_pct:.2f>% | TARGET:<target:.2f>% | CONFORME:<OUI|NON> | CANAUX_REQUIS:<N_MIN></p>",
    "starter": "# Grille d'analyse (vo3-c5-e1) — Calculateur d'Erlang B & Dimensionnement de Trunks Téléphoniques\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : CALLS_PER_HOUR=50 DURATION_SEC=60 CHANNELS=5 TARGET_GOS_PCT=1.0\n# Données : CALLS_PER_HOUR=300 DURATION_SEC=180 CHANNELS=25 TARGET_GOS_PCT=1.0\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : CALLS_PER_HOUR=60 DURATION_SEC=120 CHANNELS=4 TARGET_GOS_PCT=5.0\n# Données : CALLS_PER_HOUR=10 DURATION_SEC=300 CHANNELS=2 TARGET_GOS_PCT=2.0\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "TRAFIC:0.83E | CANAUX:5 | BLOCAGE:0.15% | TARGET:1.00% | CONFORME:OUI | CANAUX_REQUIS:4\nTRAFIC:15.00E | CANAUX:25 | BLOCAGE:0.50% | TARGET:1.00% | CONFORME:OUI | CANAUX_REQUIS:24\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "TRAFIC:2.00E | CANAUX:4 | BLOCAGE:9.52% | TARGET:5.00% | CONFORME:NON | CANAUX_REQUIS:5\nTRAFIC:0.83E | CANAUX:2 | BLOCAGE:15.92% | TARGET:2.00% | CONFORME:NON | CANAUX_REQUIS:4\n"
      }
    ],
    "solution": "[Exemple]\nTRAFIC:6.00E | CANAUX:10 | BLOCAGE:4.31% | TARGET:1.00% | CONFORME:NON | CANAUX_REQUIS:13\nTRAFIC:6.67E | CANAUX:8 | BLOCAGE:15.97% | TARGET:2.00% | CONFORME:NON | CANAUX_REQUIS:13\n\n\n[Cas 1 — Cas de test 1]\nTRAFIC:0.83E | CANAUX:5 | BLOCAGE:0.15% | TARGET:1.00% | CONFORME:OUI | CANAUX_REQUIS:4\nTRAFIC:15.00E | CANAUX:25 | BLOCAGE:0.50% | TARGET:1.00% | CONFORME:OUI | CANAUX_REQUIS:24\n\n\n[Cas 2 — Cas de test 2]\nTRAFIC:2.00E | CANAUX:4 | BLOCAGE:9.52% | TARGET:5.00% | CONFORME:NON | CANAUX_REQUIS:5\nTRAFIC:0.83E | CANAUX:2 | BLOCAGE:15.92% | TARGET:2.00% | CONFORME:NON | CANAUX_REQUIS:4"
  },
  {
    "id": "vo3-c5-e2",
    "chapter": 5,
    "title": "Validateur de Marquage QoS & Mappage DSCP / CoS 802.1p",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier la conformité du marquage QoS (CoS 5, DSCP EF 46) et la ségrégation en Voice VLAN pour les flux ToIP.",
    "brief": "<p>Dans les réseaux d'entreprise, la qualité de service (QoS) est indispensable pour préserver la voix en temps réel de la gigue et de la congestion. Les standards IETF et IEEE recommandent :   Dans l'en-tête IP (champ ToS / DiffServ), la valeur DSCP est décalée de 2 bits à gauche : <code>ToS = DSCP << 2</code> (ex: 46 << 2 = 184 soit 0xB8).   Le marquage de niveau 2 (802.1p CoS) associé est <code>CoS = 5</code> (Voice).   ToS = 24 << 2 = 96 (0x60) ou 26 << 2 = 104 (0x68).   Le marquage CoS associé est <code>CoS = 3</code> (Call Signaling).</p><ul><li>Médias vocaux RTP : DSCP EF (Expedited Forwarding = valeur décimale 46, binaire 101110)</li><li>Signalisation SIP : DSCP CS3 (valeur 24) ou AF31 (valeur 26)</li><li>Trafic Best-Effort (données web/bureautique) : DSCP CS0 (0, ToS = 0, CoS = 0).</li></ul>\n<p>Format d'entrée :<br>Lignes décrivant des flux réseau observés :<br>FLUX=<RTP_VOICE|SIP_SIGNALING|DATA_DEFAULT> DSCP_DEC=<valeur> COS_OBSERVED=<cos></p>\n<p>Règles de validation :<br>1. Calculer la valeur théorique du champ ToS (hexadécimal 0x..) : <code>tos = dscp << 2</code>.<br>2. Vérifier la conformité du marquage DSCP et CoS selon le type de flux :<br>   - RTP_VOICE : attendu DSCP == 46 et CoS == 5<br>   - SIP_SIGNALING : attendu DSCP in {24, 26} et CoS == 3<br>   - DATA_DEFAULT : attendu DSCP == 0 et CoS == 0<br>3. Si tout correspond -> <code>STATUT:CONFORME</code><br>   Sinon -> <code>STATUT:NON_CONFORME</code> (préciser l'anomalie : DSCP_INCORRECT, COS_INCORRECT ou TOUS_DEUX_INCORRECTS).</p>\n<p>Format de sortie :<br>Pour chaque ligne, afficher :<br>FLUX:<nom> | DSCP:<val> | TOS:0x<hex> | COS:<cos> | STATUT:<statut> | ANOMALIE:<AUCUNE|anomalie></p>",
    "starter": "# Grille d'analyse (vo3-c5-e2) — Validateur de Marquage QoS & Mappage DSCP / CoS 802.1p\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : FLUX=DATA_DEFAULT DSCP_DEC=0 COS_OBSERVED=0\n# Données : FLUX=DATA_DEFAULT DSCP_DEC=46 COS_OBSERVED=5\n# Données : FLUX=RTP_VOICE DSCP_DEC=46 COS_OBSERVED=0\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : FLUX=SIP_SIGNALING DSCP_DEC=46 COS_OBSERVED=3\n# Données : FLUX=SIP_SIGNALING DSCP_DEC=0 COS_OBSERVED=0\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "FLUX:DATA_DEFAULT | DSCP:0 | TOS:0x00 | COS:0 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:DATA_DEFAULT | DSCP:46 | TOS:0xb8 | COS:5 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\nFLUX:RTP_VOICE | DSCP:46 | TOS:0xb8 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:COS_INCORRECT\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "FLUX:SIP_SIGNALING | DSCP:46 | TOS:0xb8 | COS:3 | STATUT:NON_CONFORME | ANOMALIE:DSCP_INCORRECT\nFLUX:SIP_SIGNALING | DSCP:0 | TOS:0x00 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\n"
      }
    ],
    "solution": "[Exemple]\nFLUX:RTP_VOICE | DSCP:46 | TOS:0xb8 | COS:5 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:RTP_VOICE | DSCP:0 | TOS:0x00 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\nFLUX:SIP_SIGNALING | DSCP:26 | TOS:0x68 | COS:3 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:SIP_SIGNALING | DSCP:24 | TOS:0x60 | COS:5 | STATUT:NON_CONFORME | ANOMALIE:COS_INCORRECT\n\n\n[Cas 1 — Cas de test 1]\nFLUX:DATA_DEFAULT | DSCP:0 | TOS:0x00 | COS:0 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:DATA_DEFAULT | DSCP:46 | TOS:0xb8 | COS:5 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\nFLUX:RTP_VOICE | DSCP:46 | TOS:0xb8 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:COS_INCORRECT\n\n\n[Cas 2 — Cas de test 2]\nFLUX:SIP_SIGNALING | DSCP:46 | TOS:0xb8 | COS:3 | STATUT:NON_CONFORME | ANOMALIE:DSCP_INCORRECT\nFLUX:SIP_SIGNALING | DSCP:0 | TOS:0x00 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS"
  },
  {
    "id": "vo3-c5-e3",
    "chapter": 5,
    "title": "Résolveur de Traversée NAT STUN & Détecteur de Topologie ICE",
    "level": "n3",
    "language": "analyse",
    "goal": "Résoudre les incohérences d'adresses IP privées dans les offres SDP et déterminer la stratégie de traversée NAT (STUN vs TURN).",
    "brief": "<p>Lorsqu'un terminal VoIP est derrière un routeur NAT, ses paquets SIP et RTP comportent des adresses IP privées inaccessibles depuis Internet. Le protocole STUN (RFC 5389) permet au client de découvrir son adresse IP et son port publics (MAPPED-ADDRESS) vus par le serveur externe. En envoyant deux requêtes STUN vers deux adresses de serveurs distinctes (S1 et S2), le client qualifie le comportement de son NAT :   -> <code>NAT_CONE</code> (Full Cone, Restricted Cone ou Port-Restricted Cone) : STUN suffit pour établir les flux directs sans relais.   -> <code>NAT_SYMETRIQUE</code> : les communications directes échouent souvent sans serveur relais TURN.   -> <code>PAS_DE_NAT</code> (IP publique directe).</p><ul><li>Si l'adresse IP et le port mappés sont identiques pour S1 et S2 :</li><li>Si le port externe change entre S1 et S2 pour le même socket local :</li><li>Si l'adresse mappée est égale à l'adresse locale privée :</li></ul>\n<p>Format d'entrée :<br>Lignes au format :<br>CLIENT_LOCAL=<ip_locale:port> STUN1_MAPPED=<ip_pub1:port1> STUN2_MAPPED=<ip_pub2:port2></p>\n<p>Format de sortie : Pour chaque ligne, déterminer :   - PAS_DE_NAT -> <code>ROUTAGE_DIRECT</code>   - NAT_CONE -> <code>STUN_DIRECT</code>   - NAT_SYMETRIQUE -> <code>SERVEUR_RELAIS_TURN</code> LOCAL:<local> | MAPPED_S1:<s1> | MAPPED_S2:<s2> | TOPOLOGIE:<type> | SOLUTION:<solution></p><ul><li>Le type de NAT : <code>PAS_DE_NAT</code>, <code>NAT_CONE</code> ou <code>NAT_SYMETRIQUE</code>.</li><li>La solution recommandée :</li><li>Afficher :</li></ul>",
    "starter": "# Grille d'analyse (vo3-c5-e3) — Résolveur de Traversée NAT STUN & Détecteur de Topologie ICE\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : CLIENT_LOCAL=10.0.0.2:16384 STUN1_MAPPED=82.65.1.20:45000 STUN2_MAPPED=82.65.1.20:45000\n# Données : CLIENT_LOCAL=10.0.0.2:16384 STUN1_MAPPED=82.65.1.20:45000 STUN2_MAPPED=82.65.1.20:45002\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : CLIENT_LOCAL=195.154.10.2:5060 STUN1_MAPPED=195.154.10.2:5060 STUN2_MAPPED=195.154.10.2:5060\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "LOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45000 | TOPOLOGIE:NAT_CONE | SOLUTION:STUN_DIRECT\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45002 | TOPOLOGIE:NAT_SYMETRIQUE | SOLUTION:SERVEUR_RELAIS_TURN\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "LOCAL:195.154.10.2:5060 | MAPPED_S1:195.154.10.2:5060 | MAPPED_S2:195.154.10.2:5060 | TOPOLOGIE:PAS_DE_NAT | SOLUTION:ROUTAGE_DIRECT\n"
      }
    ],
    "solution": "[Exemple]\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10500 | TOPOLOGIE:NAT_CONE | SOLUTION:STUN_DIRECT\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10501 | TOPOLOGIE:NAT_SYMETRIQUE | SOLUTION:SERVEUR_RELAIS_TURN\nLOCAL:203.0.113.10:5060 | MAPPED_S1:203.0.113.10:5060 | MAPPED_S2:203.0.113.10:5060 | TOPOLOGIE:PAS_DE_NAT | SOLUTION:ROUTAGE_DIRECT\n\n\n[Cas 1 — Cas de test 1]\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45000 | TOPOLOGIE:NAT_CONE | SOLUTION:STUN_DIRECT\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45002 | TOPOLOGIE:NAT_SYMETRIQUE | SOLUTION:SERVEUR_RELAIS_TURN\n\n\n[Cas 2 — Cas de test 2]\nLOCAL:195.154.10.2:5060 | MAPPED_S1:195.154.10.2:5060 | MAPPED_S2:195.154.10.2:5060 | TOPOLOGIE:PAS_DE_NAT | SOLUTION:ROUTAGE_DIRECT"
  },
  {
    "id": "vo3-c6-e1",
    "chapter": 6,
    "title": "Simulateur de File d'Attente ACD Asterisk (Queue Strategies)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler la distribution automatique d'appels ACD selon les stratégies ringall, leastrecent et roundrobin.",
    "brief": "<p>Dans un centre de contacts Asterisk (fichier queues.conf), les appels entrants sont distribués aux agents membres selon une stratégie définie :</p><ul><li><code>ringall</code> : fait sonner simultanément tous les postes des agents disponibles (statut AVAILABLE).</li><li><code>leastrecent</code> : sélectionne l'agent disponible dont le dernier appel terminé remonte au plus longtemps (LAST_CALL_TS le plus ancien/faible).</li><li><code>roundrobin</code> : attribue les appels à tour de rôle parmi les agents disponibles selon un pointeur circulaire.</li></ul>\n<p>Statuts d'un agent :</p><ul><li><code>AVAILABLE</code> : prêt à recevoir un appel.</li><li><code>IN_CALL</code> : en ligne, ne peut recevoir d'appel.</li><li><code>PAUSED</code> : en pause, ne reçoit aucun appel.</li></ul>\n<p>Format d'entrée :<br>Première ligne : <code>STRATEGY=<ringall|leastrecent|roundrobin></code><br>Lignes suivantes décrivant les agents de la file :<br><code>AGENT=<id> STATUS=<AVAILABLE|IN_CALL|PAUSED> LAST_CALL_TS=<timestamp_entier></code></p>\n<p>Règles de sélection :<br>1. Filtrer les agents dont <code>STATUS == \"AVAILABLE\"</code>.<br>2. Si aucun agent disponible -> afficher <code>AUCUN_AGENT_DISPONIBLE | ACTION:ATTENTE</code>.<br>3. Selon la stratégie :<br>   - <code>ringall</code> -> lister tous les IDs des agents disponibles séparés par des virgules (dans l'ordre d'apparition).<br>   - <code>leastrecent</code> -> choisir l'unique agent ayant le <code>LAST_CALL_TS</code> minimal. En cas d'égalité, prendre le premier dans l'ordre d'apparition.<br>   - <code>roundrobin</code> -> choisir le premier agent disponible dans l'ordre d'apparition.</p>\n<p>Format de sortie :<br>STRATEGY:<nom> | AGENTS_DISPOS:<nb> | SELECTION:<id(s)></p>",
    "starter": "# Grille d'analyse (vo3-c6-e1) — Simulateur de File d'Attente ACD Asterisk (Queue Strategies)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : STRATEGY=ringall\n# Données : AGENT=201 STATUS=AVAILABLE LAST_CALL_TS=100\n# Données : AGENT=202 STATUS=AVAILABLE LAST_CALL_TS=200\n# Données : AGENT=203 STATUS=PAUSED LAST_CALL_TS=50\n# Données : AGENT=204 STATUS=AVAILABLE LAST_CALL_TS=300\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : STRATEGY=roundrobin\n# Données : AGENT=301 STATUS=IN_CALL LAST_CALL_TS=10\n# Données : AGENT=302 STATUS=AVAILABLE LAST_CALL_TS=20\n# Données : AGENT=303 STATUS=AVAILABLE LAST_CALL_TS=5\nA_COMPLETER\n\n[Cas 3 — Cas de test 3]\n# Données : STRATEGY=leastrecent\n# Données : AGENT=401 STATUS=IN_CALL LAST_CALL_TS=10\n# Données : AGENT=402 STATUS=PAUSED LAST_CALL_TS=20\nA_COMPLETER\n",
    "hints": [
      "Pour leastrecent, choisissez l'agent dont la dernière fin d'appel est la plus ancienne.",
      "Passez l'agent sélectionné en statut occupé et appliquez le wrapuptime après l'appel."
    ],
    "examples": [
      {
        "stdin": "STRATEGY=leastrecent\nAGENT=101 STATUS=AVAILABLE LAST_CALL_TS=1600000500\nAGENT=102 STATUS=IN_CALL LAST_CALL_TS=1600000100\nAGENT=103 STATUS=AVAILABLE LAST_CALL_TS=1600000200\nAGENT=104 STATUS=PAUSED LAST_CALL_TS=1600000050",
        "expected": "STRATEGY:leastrecent | AGENTS_DISPOS:2 | SELECTION:103\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "STRATEGY:ringall | AGENTS_DISPOS:3 | SELECTION:201,202,204\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "STRATEGY:roundrobin | AGENTS_DISPOS:2 | SELECTION:302\n"
      },
      {
        "label": "Cas de test 3",
        "stdin": "cas:3",
        "expected": "STRATEGY:leastrecent | AGENTS_DISPOS:0 | SELECTION:AUCUN_AGENT_DISPONIBLE\n"
      }
    ],
    "solution": "[Exemple]\nSTRATEGY:leastrecent | AGENTS_DISPOS:2 | SELECTION:103\n\n\n[Cas 1 — Cas de test 1]\nSTRATEGY:ringall | AGENTS_DISPOS:3 | SELECTION:201,202,204\n\n\n[Cas 2 — Cas de test 2]\nSTRATEGY:roundrobin | AGENTS_DISPOS:2 | SELECTION:302\n\n\n[Cas 3 — Cas de test 3]\nSTRATEGY:leastrecent | AGENTS_DISPOS:0 | SELECTION:AUCUN_AGENT_DISPONIBLE"
  },
  {
    "id": "vo3-c6-e2",
    "chapter": 6,
    "title": "Moteur de Routage LCR (Least Cost Routing) Multi-Trunks",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser les préfixes d'appels internationaux et sélectionner l'opérateur télécoms offrant le tarif optimal à la minute.",
    "brief": "<p>Le routage au moindre coût (Least Cost Routing, LCR) permet à un IPBX d'acheminer chaque appel sortant vers le fournisseur SIP proposant le tarif le plus bas pour la destination composée. Chaque règle de tarification opérateur associe :</p><ul><li>Un préfixe de destination (ex: '0033' pour France, '00221' pour Sénégal, '001' pour USA).</li><li>Un coût à la minute en centimes (ex: 1.5 c€/min).</li><li>Un coût d'établissement d'appel (connection fee, ex: 3.0 c€).</li></ul>\n<p>Pour un appel de durée <code>D</code> secondes :<br><code>cout_appel = connection_fee + rate_per_min * (D / 60.0)</code>.</p>\n<p>Format d'entrée :<br>Section 1 : Déclaration des trunks et tarifs sous la forme :<br><code>TRUNK=<nom> PREFIX=<prefixe> RATE_MIN=<tarif_min> CONN_FEE=<frais_connexion></code><br>Ligne de séparation : <code>---</code><br>Section 2 : Appels à router sous la forme :<br><code>CALL_ID=<id> DEST=<numero_compose> DURATION_SEC=<duree></code></p>\n<p>Règles de décision :<br>1. Pour chaque appel, identifier tous les trunks dont le <code>PREFIX</code> correspond au début du numéro <code>DEST</code> (longest prefix match si préfixes de longueurs différentes, ou évaluer tous les trunks matchant).<br>2. Pour chaque trunk éligible, calculer le coût total de l'appel :<br>   <code>cost = conn_fee + rate_min * (duration_sec / 60.0)</code>.<br>3. Sélectionner le trunk offrant le coût minimal. En cas d'égalité parfaite de coût, choisir le premier dans l'ordre alphabétique du nom de trunk.<br>4. Si aucun trunk ne correspond au préfixe, afficher <code>STATUT:ECHEC_ROUTAGE</code>.</p>\n<p>Format de sortie :<br>Pour chaque appel :<br><code>CALL:<id> | DEST:<numero> | DUREE:<d>s | TRUNK_CHOISI:<nom> | COUT:<cout:.2f>c€</code></p>",
    "starter": "# Grille d'analyse (vo3-c6-e2) — Moteur de Routage LCR (Least Cost Routing) Multi-Trunks\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : TRUNK=Op1 PREFIX=001 RATE_MIN=0.8 CONN_FEE=2.0\n# Données : TRUNK=Op2 PREFIX=001 RATE_MIN=1.5 CONN_FEE=0.0\n# Données : ---\n# Données : CALL_ID=US1 DEST=0012125551234 DURATION_SEC=300\n# Données : CALL_ID=US2 DEST=0012125551234 DURATION_SEC=60\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : TRUNK=Alpha PREFIX=0044 RATE_MIN=5.0 CONN_FEE=0.0\n# Données : ---\n# Données : CALL_ID=K1 DEST=00442079460912 DURATION_SEC=60\n# Données : CALL_ID=K2 DEST=0099999999999 DURATION_SEC=60\nA_COMPLETER\n",
    "hints": [
      "Appliquez le principe du plus long préfixe correspondant (longest prefix match).",
      "Retenez le trunk actif proposant le coût à la minute le plus faible."
    ],
    "examples": [
      {
        "stdin": "TRUNK=TrunkA PREFIX=0033 RATE_MIN=2.0 CONN_FEE=0.0\nTRUNK=TrunkB PREFIX=0033 RATE_MIN=1.2 CONN_FEE=5.0\nTRUNK=TrunkC PREFIX=00221 RATE_MIN=18.0 CONN_FEE=0.0\nTRUNK=TrunkD PREFIX=00221 RATE_MIN=15.0 CONN_FEE=10.0\n---\nCALL_ID=C1 DEST=0033140203040 DURATION_SEC=120\nCALL_ID=C2 DEST=0033140203040 DURATION_SEC=30\nCALL_ID=C3 DEST=00221706438029 DURATION_SEC=180",
        "expected": "CALL:C1 | DEST:0033140203040 | DUREE:120s | TRUNK_CHOISI:TrunkA | COUT:4.00c€\nCALL:C2 | DEST:0033140203040 | DUREE:30s | TRUNK_CHOISI:TrunkA | COUT:1.00c€\nCALL:C3 | DEST:00221706438029 | DUREE:180s | TRUNK_CHOISI:TrunkC | COUT:54.00c€\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "CALL:US1 | DEST:0012125551234 | DUREE:300s | TRUNK_CHOISI:Op1 | COUT:6.00c€\nCALL:US2 | DEST:0012125551234 | DUREE:60s | TRUNK_CHOISI:Op2 | COUT:1.50c€\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "CALL:K1 | DEST:00442079460912 | DUREE:60s | TRUNK_CHOISI:Alpha | COUT:5.00c€\nCALL:K2 | DEST:0099999999999 | DUREE:60s | TRUNK_CHOISI:AUCUN | COUT:0.00c€ | STATUT:ECHEC_ROUTAGE\n"
      }
    ],
    "solution": "[Exemple]\nCALL:C1 | DEST:0033140203040 | DUREE:120s | TRUNK_CHOISI:TrunkA | COUT:4.00c€\nCALL:C2 | DEST:0033140203040 | DUREE:30s | TRUNK_CHOISI:TrunkA | COUT:1.00c€\nCALL:C3 | DEST:00221706438029 | DUREE:180s | TRUNK_CHOISI:TrunkC | COUT:54.00c€\n\n\n[Cas 1 — Cas de test 1]\nCALL:US1 | DEST:0012125551234 | DUREE:300s | TRUNK_CHOISI:Op1 | COUT:6.00c€\nCALL:US2 | DEST:0012125551234 | DUREE:60s | TRUNK_CHOISI:Op2 | COUT:1.50c€\n\n\n[Cas 2 — Cas de test 2]\nCALL:K1 | DEST:00442079460912 | DUREE:60s | TRUNK_CHOISI:Alpha | COUT:5.00c€\nCALL:K2 | DEST:0099999999999 | DUREE:60s | TRUNK_CHOISI:AUCUN | COUT:0.00c€ | STATUT:ECHEC_ROUTAGE"
  },
  {
    "id": "vo3-c6-e3",
    "chapter": 6,
    "title": "Détecteur d'Attaques Brute-Force SIP & Générateur Fail2ban",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser les journaux d'authentification Asterisk, détecter les attaques brute-force et générer des règles pare-feu iptables.",
    "brief": "<p>Les serveurs VoIP exposés sur Internet subissent de nombreuses attaques automatisées par scan SIP (outils sipvicious, friendly-scanner) testant des mots de passe en boucle. Lors d'une tentative frauduleuse, Asterisk retourne un code <code>401 Unauthorized</code> ou <code>403 Forbidden</code>. Pour neutraliser ces attaques, un système de défense active (Fail2ban) analyse les journaux de sécurité :</p><ul><li>Si une adresse IP source génère plus de <code>MAX_FAILURES</code> tentatives en échec (codes 401 ou 403) dans une fenêtre temporelle donnée, elle est bannie immédiatement.</li><li>La règle générée applique une commande de blocage : <code>iptables -I INPUT -s <IP> -p udp --dport 5060 -j DROP</code>.</li></ul>\n<p>Format d'entrée :<br>Première ligne : <code>MAX_FAILURES=<seuil></code><br>Lignes suivantes représentant des journaux d'événements de sécurité SIP :<br><code>TIMESTAMP=<sec> IP=<ip_source> EXTENSION=<ext_visée> STATUS_CODE=<code_http_sip></code></p>\n<p>Règles de traitement :<br>1. Compter les échecs (status_code == 401 ou status_code == 403) par adresse IP.<br>2. Lorsqu'une IP atteint ou dépasse le seuil <code>MAX_FAILURES</code>, elle bascule en statut <code>BANNI</code>.<br>3. Pour chaque ligne analysée, afficher l'état de l'IP.<br>4. Dès qu'un bannissement est prononcé pour la première fois pour une IP, afficher la règle firewall correspondante.</p>\n<p>Format de sortie :<br>Pour chaque ligne d'événement :<br>IP:<ip> | CODE:<status_code> | ECHECS:<nb_echecs_cumules> | ETAT:<OK|BANNI><br>(Si nouvellement bannie, afficher sur la ligne suivante :<br>ACTION:BAN | IP:<ip> | REGLE:iptables -I INPUT -s <ip> -p udp --dport 5060 -j DROP)</p>",
    "starter": "# Grille d'analyse (vo3-c6-e3) — Détecteur d'Attaques Brute-Force SIP & Générateur Fail2ban\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : MAX_FAILURES=2\n# Données : TIMESTAMP=1 IP=203.0.113.88 EXTENSION=100 STATUS_CODE=401\n# Données : TIMESTAMP=2 IP=203.0.113.88 EXTENSION=101 STATUS_CODE=401\n# Données : TIMESTAMP=3 IP=10.0.0.1 EXTENSION=500 STATUS_CODE=401\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : MAX_FAILURES=5\n# Données : TIMESTAMP=10 IP=1.2.3.4 EXTENSION=701 STATUS_CODE=200\n# Données : TIMESTAMP=11 IP=1.2.3.4 EXTENSION=701 STATUS_CODE=401\n# Données : TIMESTAMP=12 IP=1.2.3.4 EXTENSION=701 STATUS_CODE=200\nA_COMPLETER\n",
    "hints": [
      "Comptabilisez les échecs d'authentification 401 Unauthorized et 403 Forbidden par adresse IP.",
      "Dès que le seuil maxretry est atteint, émettez une règle de bannissement DROP."
    ],
    "examples": [
      {
        "stdin": "MAX_FAILURES=3\nTIMESTAMP=100 IP=198.51.100.22 EXTENSION=100 STATUS_CODE=401\nTIMESTAMP=102 IP=198.51.100.22 EXTENSION=101 STATUS_CODE=401\nTIMESTAMP=103 IP=192.168.1.50 EXTENSION=200 STATUS_CODE=200\nTIMESTAMP=104 IP=198.51.100.22 EXTENSION=102 STATUS_CODE=403\nTIMESTAMP=105 IP=198.51.100.22 EXTENSION=103 STATUS_CODE=401",
        "expected": "IP:198.51.100.22 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:198.51.100.22 | CODE:401 | ECHECS:2 | ETAT:OK\nIP:192.168.1.50 | CODE:200 | ECHECS:0 | ETAT:OK\nIP:198.51.100.22 | CODE:403 | ECHECS:3 | ETAT:BANNI\nACTION:BAN | IP:198.51.100.22 | REGLE:iptables -I INPUT -s 198.51.100.22 -p udp --dport 5060 -j DROP\nIP:198.51.100.22 | CODE:401 | ECHECS:4 | ETAT:BANNI\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "IP:203.0.113.88 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:203.0.113.88 | CODE:401 | ECHECS:2 | ETAT:BANNI\nACTION:BAN | IP:203.0.113.88 | REGLE:iptables -I INPUT -s 203.0.113.88 -p udp --dport 5060 -j DROP\nIP:10.0.0.1 | CODE:401 | ECHECS:1 | ETAT:OK\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "IP:1.2.3.4 | CODE:200 | ECHECS:0 | ETAT:OK\nIP:1.2.3.4 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:1.2.3.4 | CODE:200 | ECHECS:1 | ETAT:OK\n"
      }
    ],
    "solution": "[Exemple]\nIP:198.51.100.22 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:198.51.100.22 | CODE:401 | ECHECS:2 | ETAT:OK\nIP:192.168.1.50 | CODE:200 | ECHECS:0 | ETAT:OK\nIP:198.51.100.22 | CODE:403 | ECHECS:3 | ETAT:BANNI\nACTION:BAN | IP:198.51.100.22 | REGLE:iptables -I INPUT -s 198.51.100.22 -p udp --dport 5060 -j DROP\nIP:198.51.100.22 | CODE:401 | ECHECS:4 | ETAT:BANNI\n\n\n[Cas 1 — Cas de test 1]\nIP:203.0.113.88 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:203.0.113.88 | CODE:401 | ECHECS:2 | ETAT:BANNI\nACTION:BAN | IP:203.0.113.88 | REGLE:iptables -I INPUT -s 203.0.113.88 -p udp --dport 5060 -j DROP\nIP:10.0.0.1 | CODE:401 | ECHECS:1 | ETAT:OK\n\n\n[Cas 2 — Cas de test 2]\nIP:1.2.3.4 | CODE:200 | ECHECS:0 | ETAT:OK\nIP:1.2.3.4 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:1.2.3.4 | CODE:200 | ECHECS:1 | ETAT:OK"
  }
];
