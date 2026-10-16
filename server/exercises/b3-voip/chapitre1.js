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
  }
];
