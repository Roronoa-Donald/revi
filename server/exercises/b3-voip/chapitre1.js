'use strict';

module.exports = [
  {
    "id": "vo3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de Débit Voix & Bande Passante Réseau",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer l'overhead des en-têtes réseau ToIP (IP/UDP/RTP) et la bande passante cumulée selon le codec et la durée de paquetisation.",
    "brief": "<p>Dans ce modèle, la voix est encapsulée dans RTP, UDP et IPv4 sans options : 20 + 8 + 12 = 40 octets d'en-têtes, avec RTP minimal. Le débit calculé est celui d'un sens au niveau IP, sans couche liaison, options ni protection supplémentaire. Avec IPv6 de base, ces en-têtes vaudraient 60 octets.</p>\n<p>Pour les calculs, supposez un débit de charge utile constant égal à <code>BITRATE_KBPS</code> ; notamment, cette hypothèse simplifie le cas d'Opus dont le débit réel peut varier.</p>\n<p>Chaque ligne contient <code>CODEC=&lt;nom&gt; BITRATE_KBPS=&lt;val&gt; PTIME_MS=&lt;ms&gt; CALLS=&lt;nb&gt;</code>.</p>\n<p>Calculez <code>pps = 1000 / PTIME_MS</code>, puis <code>payload_bytes = int(BITRATE_KBPS * 1000 * PTIME_MS / 1000 / 8)</code>, <code>packet_bytes = payload_bytes + 40</code>, <code>bandwidth_per_call_kbps = packet_bytes * 8 * pps / 1000</code> et <code>total_bandwidth_kbps = bandwidth_per_call_kbps * CALLS</code>.</p>\n<p>Pour chaque ligne, affichez <code>CODEC:&lt;nom&gt; | PAYLOAD:&lt;payload_bytes&gt;B | PACKET:&lt;packet_bytes&gt;B | PER_CALL:&lt;debit à une décimale&gt;kbps | TOTAL:&lt;total à une décimale&gt;kbps</code>.</p>",
    "starter": "# Grille d'analyse (vo3-c1-e1) — Calculateur de Débit Voix & Bande Passante Réseau\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : CODEC=G.722 BITRATE_KBPS=64 PTIME_MS=20 CALLS=5\n# Données : CODEC=OPUS BITRATE_KBPS=24 PTIME_MS=20 CALLS=50\n# Données : CODEC=OPUS BITRATE_KBPS=32 PTIME_MS=10 CALLS=2\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : CODEC=G.711 BITRATE_KBPS=64 PTIME_MS=30 CALLS=1\n# Données : CODEC=G.729 BITRATE_KBPS=8 PTIME_MS=10 CALLS=100\nA_COMPLETER\n",
    "hints": [
      "Dans le modèle IPv4 sans options et RTP minimal, ajoutez 40 octets à la charge utile.",
      "Calculez la cadence de paquets par seconde : pps = 1000 / PTIME_MS.",
      "Calculez la taille de trame RTP = payload + 40 octets (IP+UDP+RTP), le nombre de paquets par seconde (1000 / ptime_ms), puis le débit unitaire et total."
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
    "solution": "[Exemple]\nCODEC:G.711 | PAYLOAD:160B | PACKET:200B | PER_CALL:80.0kbps | TOTAL:800.0kbps\nCODEC:G.729 | PAYLOAD:20B | PACKET:60B | PER_CALL:24.0kbps | TOTAL:600.0kbps\n\n\n[Cas 1 — Cas de test 1]\nCODEC:G.722 | PAYLOAD:160B | PACKET:200B | PER_CALL:80.0kbps | TOTAL:400.0kbps\nCODEC:OPUS | PAYLOAD:60B | PACKET:100B | PER_CALL:40.0kbps | TOTAL:2000.0kbps\nCODEC:OPUS | PAYLOAD:40B | PACKET:80B | PER_CALL:64.0kbps | TOTAL:128.0kbps\n\n\n[Cas 2 — Cas de test 2]\nCODEC:G.711 | PAYLOAD:240B | PACKET:280B | PER_CALL:74.7kbps | TOTAL:74.7kbps\nCODEC:G.729 | PAYLOAD:10B | PACKET:50B | PER_CALL:40.0kbps | TOTAL:4000.0kbps",
    "takeaway": "À retenir : Calculer l'overhead des en-têtes réseau ToIP (IP/UDP/RTP) et la bande passante cumulée selon le codec et la durée de paquetisation.\nRepère : Cas d'usage nominal."
  },
  {
    "id": "vo3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le diagnostic qualité des liaisons ToIP de Norvia Logistique",
    "exampleTitle": "Exemple résolu — les liaisons du lycée Vercors",
    "goal": "Confronter des mesures de délai, gigue, pertes et MOS aux seuils de l'ITU-T G.114 et qualifier la qualité perçue.",
    "brief": "<p><strong>Énoncé.</strong> Norvia Logistique, transporteur régional, a déployé la ToIP entre ses trois agences. Le responsable télécoms relève, pour chaque liaison, le délai unidirectionnel, la gigue, le taux de pertes de paquets et le score MOS mesuré par sondage :</p><table><tr><th>Liaison</th><th>Délai (ms)</th><th>Gigue (ms)</th><th>Pertes (%)</th><th>MOS</th></tr><tr><th>Nantes → Lyon</th><td>45</td><td>8</td><td>0,1</td><td>4,2</td></tr><tr><th>Lyon → Berlin</th><td>165</td><td>22</td><td>0,4</td><td>3,5</td></tr><tr><th>Nantes → Dakar</th><td>220</td><td>35</td><td>2,5</td><td>2,7</td></tr></table><p>Seuils de la recommandation ITU-T G.114 vus en cours : délai unidirectionnel ≤ 150 ms, gigue ≤ 30 ms, pertes ≤ 1 %. Échelle du MOS : 4,03 ou plus = excellente ; de 3,60 à 4,02 = bonne ; de 3,10 à 3,59 = moyenne ; en dessous de 3,10 = mauvaise.</p><ol><li>Combien de liaisons respectent le seuil de délai de 150 ms ?</li><li>Quelle liaison respecte à la fois les trois seuils (délai, gigue et pertes) ?</li><li>Quel indicateur, et lui seul, la liaison Lyon–Berlin dépasse-t-elle ?</li><li>Comment l'échelle du cours qualifie-t-elle la communication sur la liaison Lyon–Berlin (MOS 3,5) ?</li><li>Comment l'échelle du cours qualifie-t-elle la communication sur la liaison Nantes–Dakar (MOS 2,7) ?</li></ol><p>Pour les questions 4 et 5, répondez par un seul mot.</p>",
    "starter": "# Exercice — Le diagnostic qualité des liaisons ToIP de Norvia Logistique\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 4 et 5 : un seul mot (excellente, bonne, moyenne ou mauvaise).\n\n[Question 1 — Nombre de liaisons respectant le seuil de délai]\nA_COMPLETER\n\n[Question 2 — Liaison respectant les trois seuils]\nA_COMPLETER\n\n[Question 3 — Indicateur dépassé par la liaison Lyon-Berlin]\nA_COMPLETER\n\n[Question 4 — Qualification du MOS 3,5 (Lyon-Berlin)]\nA_COMPLETER\n\n[Question 5 — Qualification du MOS 2,7 (Nantes-Dakar)]\nA_COMPLETER\n",
    "hints": [
      "Comparez chaque colonne du tableau aux seuils de la G.114 : 150 ms de délai unidirectionnel, 30 ms de gigue, 1 % de pertes.",
      "Pour la question 3, éliminez un à un les indicateurs de Lyon–Berlin : la gigue (22 ms) et les pertes (0,4 %) sont-elles sous les seuils ?",
      "Pour qualifier un MOS : 4,03 ou plus = excellente ; de 3,60 à 4,02 = bonne ; de 3,10 à 3,59 = moyenne ; en dessous de 3,10 = mauvaise."
    ],
    "examples": [
      {
        "stdin": "Le lycée Vercors relie ses trois sites par ToIP. Mesures :\nBastia → Ajaccio : 95 ms, gigue 12 ms, 0,2 %, MOS 4,1.\nBastia → Paris : 190 ms, gigue 26 ms, 0,8 %, MOS 3,2.\nAjaccio → Paris : 140 ms, gigue 40 ms, 1,5 %, MOS 3,0.\n\n1) Délai ≤ 150 ms : Bastia-Ajaccio (95) et Ajaccio-Paris (140) : 2 liaisons.\n2) Les trois seuils respectés : Bastia-Ajaccio (95, 12 et 0,2).\n3) Bastia-Paris dépasse seulement le délai (190) ; gigue 26 et pertes 0,8 sont conformes.\n4) MOS 3,2 : communication moyenne.\n5) MOS 3,0 : communication mauvaise.",
        "expected": "2 liaisons respectent le délai — Bastia-Ajaccio respecte tout — Bastia-Paris dépasse seulement le délai — MOS 3,2 : moyenne — MOS 3,0 : mauvaise",
        "note": "Le MOS résume l'ensemble : dès que délai, gigue ou pertes dépassent les seuils de la G.114, le score chute nettement."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de liaisons respectant le seuil de délai",
        "stdin": "q:1",
        "expected": "1||une"
      },
      {
        "label": "Question 2 — Liaison respectant les trois seuils",
        "stdin": "q:2",
        "expected": "nantes-lyon||nantes lyon||la liaison nantes-lyon||nantes → lyon"
      },
      {
        "label": "Question 3 — Indicateur dépassé par la liaison Lyon-Berlin",
        "stdin": "q:3",
        "expected": "le délai||délai||la latence||le delai"
      },
      {
        "label": "Question 4 — Qualification du MOS 3,5 (Lyon-Berlin)",
        "stdin": "q:4",
        "expected": "moyenne||moyen"
      },
      {
        "label": "Question 5 — Qualification du MOS 2,7 (Nantes-Dakar)",
        "stdin": "q:5",
        "expected": "mauvaise||mauvais"
      }
    ],
    "solution": "[Question 1 — Nombre de liaisons respectant le seuil de délai]\n1\n\n[Question 2 — Liaison respectant les trois seuils]\nnantes-lyon\n\n[Question 3 — Indicateur dépassé par la liaison Lyon-Berlin]\nle délai\n\n[Question 4 — Qualification du MOS 3,5 (Lyon-Berlin)]\nmoyenne\n\n[Question 5 — Qualification du MOS 2,7 (Nantes-Dakar)]\nmauvaise",
    "takeaway": "1) Seule Nantes–Lyon (45 ms) est sous 150 ms ; Lyon–Berlin (165 ms) et Nantes–Dakar (220 ms) dépassent le seuil : 1 liaison.\n2) Nantes–Lyon respecte tout : 45 ms, 8 ms de gigue, 0,1 % de pertes.\n3) Lyon–Berlin dépasse le délai (165 > 150) mais respecte la gigue (22 ≤ 30) et les pertes (0,4 ≤ 1) : seul le délai est en cause.\n4) MOS 3,5 : entre 3,10 et 3,59, la communication est moyenne.\n5) MOS 2,7 : en dessous de 3,10, la communication est mauvaise.\nContrôle : la liaison Nantes–Dakar cumule les trois dépassements (220 ms, 35 ms, 2,5 %), ce qui explique son MOS effondré à 2,7."
  },
  {
    "id": "vo3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "La numérisation vocale du standard de l'opérateur TéléSud",
    "exampleTitle": "Exemple résolu — la webradio du studio VoixLibres",
    "goal": "Appliquer le théorème de Nyquist, la quantification G.711 et les débits qui en découlent à une chaîne de numérisation réelle.",
    "brief": "<p><strong>Énoncé.</strong> L'opérateur régional TéléSud modernise le standard téléphonique de son centre d'appels. L'ingénieur audio rappelle les données du cours : la bande vocale téléphonique s'étend de <strong>300 Hz à 3 400 Hz</strong> ; la recommandation G.711 échantillonne à 8 000 Hz et compresse chaque échantillon sur <strong>8 bits</strong> (loi A en Europe, loi µ en Amérique du Nord) ; en A-law, l'échantillon linéaire d'origine porte sur 13 bits avant compression.</p><p>Rappel : théorème de Nyquist-Shannon, Fe ≥ 2 × Fmax ; intervalle entre deux échantillons = 1 / Fe ; débit = Fe × nombre de bits par échantillon.</p><p>Répondez par le nombre seul, sans unité, sauf pour la question 6 (un mot).</p><ol><li>Quelle est la fréquence d'échantillonnage minimale théorique, en Hz, pour une bande vocale limitée à 3 400 Hz ?</li><li>Quelle fréquence d'échantillonnage, en Hz, l'UIT-T a-t-elle normalisée pour la téléphonie ?</li><li>Quel intervalle, en microsecondes, sépare deux échantillons consécutifs à 8 000 Hz ?</li><li>Quel est le débit du codec G.711, en kbps ?</li><li>Quel serait, en kbps, le débit d'une numérisation linéaire à 13 bits par échantillon, sans compression ?</li><li>Quel codec du cours, débitant lui aussi 64 kbps, élargit la bande audio de 50 Hz à 7 kHz pour la téléphonie HD ?</li></ol>",
    "starter": "# Exercice — La numérisation vocale du standard de l'opérateur TéléSud\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : le nombre seul. Question 6 : le nom du codec.\n\n[Question 1 — Fréquence d'échantillonnage minimale théorique (en Hz)]\nA_COMPLETER\n\n[Question 2 — Fréquence d'échantillonnage normalisée (en Hz)]\nA_COMPLETER\n\n[Question 3 — Intervalle entre deux échantillons (en µs)]\nA_COMPLETER\n\n[Question 4 — Débit du codec G.711 (en kbps)]\nA_COMPLETER\n\n[Question 5 — Débit d'une numérisation linéaire à 13 bits (en kbps)]\nA_COMPLETER\n\n[Question 6 — Codec large bande de la téléphonie HD]\nA_COMPLETER\n",
    "hints": [
      "Le théorème de Nyquist-Shannon impose Fe ≥ 2 × Fmax : appliquez-le à la fréquence maximale de la bande vocale.",
      "L'intervalle entre deux échantillons est l'inverse de la fréquence d'échantillonnage ; le débit est le produit de la fréquence par le nombre de bits par échantillon.",
      "1. Fe minimale = 2 × 3 400. 2. La fréquence normalisée du RTC est 8 000 Hz. 3. 1/8 000 s = 125 µs. 4. 8 000 × 8 bits = 64 000 bps. 5. 8 000 × 13 bits = 104 000 bps. 6. Relisez le tableau des codecs : lequel offre la large bande à 64 kbps ?"
    ],
    "examples": [
      {
        "stdin": "Le studio VoixLibres numérise une webradio dont la bande utile monte à 8 000 Hz.\n\n1) Fréquence d'échantillonnage minimale : 2 × 8 000 = 16 000 Hz.\n2) Le studio retient Fe = 16 000 Hz ; intervalle : 1/16 000 = 62,5 µs.\n3) Quantification sur 16 bits : débit = 16 000 × 16 = 256 000 bps = 256 kbps.\n4) Quantification sur 8 bits : 16 000 × 8 = 128 kbps.",
        "expected": "16 000 Hz — 62,5 µs — 256 kbps en 16 bits — 128 kbps en 8 bits",
        "note": "Doubler la fréquence maximale double la fréquence d'échantillonnage minimale : le théorème de Nyquist s'applique à toute bande, musicale ou vocale."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Fréquence d'échantillonnage minimale théorique (en Hz)",
        "stdin": "q:1",
        "expected": "6800||6 800"
      },
      {
        "label": "Question 2 — Fréquence d'échantillonnage normalisée (en Hz)",
        "stdin": "q:2",
        "expected": "8000||8 000"
      },
      {
        "label": "Question 3 — Intervalle entre deux échantillons (en µs)",
        "stdin": "q:3",
        "expected": "125||125 µs"
      },
      {
        "label": "Question 4 — Débit du codec G.711 (en kbps)",
        "stdin": "q:4",
        "expected": "64||64 kbps"
      },
      {
        "label": "Question 5 — Débit d'une numérisation linéaire à 13 bits (en kbps)",
        "stdin": "q:5",
        "expected": "104||104 kbps"
      },
      {
        "label": "Question 6 — Codec large bande de la téléphonie HD",
        "stdin": "q:6",
        "expected": "G.722||g.722||le G.722"
      }
    ],
    "solution": "[Question 1 — Fréquence d'échantillonnage minimale théorique (en Hz)]\n6800\n\n[Question 2 — Fréquence d'échantillonnage normalisée (en Hz)]\n8000\n\n[Question 3 — Intervalle entre deux échantillons (en µs)]\n125\n\n[Question 4 — Débit du codec G.711 (en kbps)]\n64\n\n[Question 5 — Débit d'une numérisation linéaire à 13 bits (en kbps)]\n104\n\n[Question 6 — Codec large bande de la téléphonie HD]\nG.722",
    "takeaway": "1) Fe minimale : 2 × 3 400 = 6 800 Hz.\n2) L'UIT-T a normalisé 8 000 Hz (le double théorique plus une marge pour les filtres anti-repliement).\n3) Intervalle : 1 / 8 000 = 0,000125 s = 125 µs.\n4) G.711 : 8 000 échantillons/s × 8 bits = 64 000 bps = 64 kbps.\n5) Numérisation linéaire 13 bits : 8 000 × 13 = 104 000 bps = 104 kbps.\n6) Le G.722 (SB-ADPCM) débite aussi 64 kbps mais couvre 50 Hz à 7 kHz : c'est le codec de la téléphonie HD.\nContrôle : la compression logarithmique fait passer le débit de 104 kbps (13 bits linéaires) à 64 kbps (8 bits), soit 40 kbps économisés par canal, environ 38 % du débit linéaire."
  }
];
