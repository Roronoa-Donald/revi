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
  },
  {
    "id": "vo3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le premier appel SIP de l'entreprise Alpacom",
    "exampleTitle": "Exemple résolu — l'appel du support de Pharmavie",
    "goal": "Lire une trace d'appel SIP et identifier méthodes, codes de réponse et chronologie d'une session.",
    "brief": "<p><strong>Énoncé.</strong> L'entreprise Alpacom vient d'installer son IPBX Asterisk. Pour vérifier la chaîne de signalisation, la technicienne capture le premier appel interne : Mme Diallo (poste 201) appelle M. Weber (poste 215). La trace des messages SIP est la suivante :</p><table><tr><th>Horodatage</th><th>Émetteur</th><th>Message SIP</th></tr><tr><th>09:14:02</th><td>poste 201</td><td>INVITE sip:215@alpacom.fr</td></tr><tr><th>09:14:02</th><td>proxy</td><td>100 Trying</td></tr><tr><th>09:14:03</th><td>proxy</td><td>180 Ringing</td></tr><tr><th>09:14:11</th><td>proxy</td><td>200 OK</td></tr><tr><th>09:14:11</th><td>poste 201</td><td>ACK</td></tr><tr><th>09:15:40</th><td>poste 201</td><td>BYE</td></tr><tr><th>09:15:40</th><td>proxy</td><td>200 OK</td></tr></table><p>La conversation téléphonique a bien eu lieu entre le moment où M. Weber a décroché et le moment où Mme Diallo a raccroché.</p><ol><li>Quelle méthode SIP ouvre la session d'appel ?</li><li>Que signale le code 180 reçu à 09:14:03 ?</li><li>À quel horodatage M. Weber décroche-t-il ?</li><li>Combien de secondes la sonnerie a-t-elle duré ?</li><li>Quelle méthode SIP met fin à la conversation ?</li><li>À quelle famille de codes (1xx, 2xx, … 6xx) appartient le 100 Trying, réponse provisoire ?</li></ol><p>Répondez de façon courte : un mot pour les questions 1, 2, 5 et 6, l'horodatage exact pour la question 3, le nombre seul pour la question 4.</p>",
    "starter": "# Exercice — Le premier appel SIP de l'entreprise Alpacom\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2, 5 et 6 : un mot ou un code. Question 3 : hh:mm:ss. Question 4 : le nombre seul.\n\n[Question 1 — Méthode qui ouvre la session]\nA_COMPLETER\n\n[Question 2 — Signification du code 180]\nA_COMPLETER\n\n[Question 3 — Horodatage du décrochage]\nA_COMPLETER\n\n[Question 4 — Durée de la sonnerie (en secondes)]\nA_COMPLETER\n\n[Question 5 — Méthode qui termine la conversation]\nA_COMPLETER\n\n[Question 6 — Famille du code 100 Trying]\nA_COMPLETER\n",
    "hints": [
      "Parcourez la trace dans l'ordre : INVITE ouvre, les codes à trois chiffres répondent, ACK confirme, BYE clôt.",
      "Le code 180 appartient à la famille 1xx : il décrit un état provisoire de l'appel avant le décrochage.",
      "1. La session s'ouvre par INVITE. 2. 180 Ringing : le poste appelé sonne. 3. Le décrochage correspond au 200 OK de 09:14:11. 4. Sonnerie : de 09:14:03 à 09:14:11. 5. BYE raccroche. 6. 100 est un code provisoire : famille 1xx."
    ],
    "examples": [
      {
        "stdin": "Le support de Pharmavie teste son IPBX. Trace de l'appel du poste 104 vers le poste 117 :\n10:02:15  INVITE — 10:02:16  180 Ringing — 10:02:31  200 OK — 10:02:31  ACK — 10:05:00  BYE — 10:05:00  200 OK.\n\n1) La session s'ouvre par INVITE.\n2) 180 Ringing : le poste appelé sonne.\n3) Décrochage : 10:02:31 (200 OK).\n4) Sonnerie : de 10:02:16 à 10:02:31, soit 15 secondes.\n5) BYE met fin à la conversation.",
        "expected": "INVITE — le poste appelé sonne — décrochage à 10:02:31 — 15 secondes de sonnerie — BYE",
        "note": "Les codes 1xx (100, 180) sont provisoires : seuls le 200 OK final et l'ACK établissent réellement la session."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Méthode qui ouvre la session",
        "stdin": "q:1",
        "expected": "INVITE||invite||la méthode INVITE"
      },
      {
        "label": "Question 2 — Signification du code 180",
        "stdin": "q:2",
        "expected": "le poste appelé sonne||le poste sonne||le téléphone sonne||la sonnerie||sonnerie||ringing||le correspondant sonne"
      },
      {
        "label": "Question 3 — Horodatage du décrochage",
        "stdin": "q:3",
        "expected": "09:14:11||9:14:11"
      },
      {
        "label": "Question 4 — Durée de la sonnerie (en secondes)",
        "stdin": "q:4",
        "expected": "8||8 secondes||8 s"
      },
      {
        "label": "Question 5 — Méthode qui termine la conversation",
        "stdin": "q:5",
        "expected": "BYE||bye||la méthode BYE"
      },
      {
        "label": "Question 6 — Famille du code 100 Trying",
        "stdin": "q:6",
        "expected": "1xx||les 1xx||la famille 1xx"
      }
    ],
    "solution": "[Question 1 — Méthode qui ouvre la session]\nINVITE\n\n[Question 2 — Signification du code 180]\nle poste appelé sonne\n\n[Question 3 — Horodatage du décrochage]\n09:14:11\n\n[Question 4 — Durée de la sonnerie (en secondes)]\n8\n\n[Question 5 — Méthode qui termine la conversation]\nBYE\n\n[Question 6 — Famille du code 100 Trying]\n1xx",
    "takeaway": "1) La session est ouverte par la requête INVITE envoyée par le poste 201 à 09:14:02.\n2) Le code 180 Ringing signale que le poste de M. Weber sonne : c'est une réponse provisoire.\n3) M. Weber décroche à 09:14:11, matérialisé par le 200 OK suivi de l'ACK.\n4) La sonnerie a duré de 09:14:03 à 09:14:11, soit 8 secondes.\n5) La conversation se termine par le BYE envoyé par Mme Diallo à 09:15:40, acquitté par un 200 OK.\n6) Le 100 Trying appartient à la famille 1xx des réponses provisoires (100 Trying, 180 Ringing, 183 Session Progress).\nContrôle : la conversation a duré de 09:14:11 à 09:15:40, soit 89 secondes, cohérent avec un test de vérification."
  },
  {
    "id": "vo3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "La négociation SDP de la visioconférence BioMédia",
    "exampleTitle": "Exemple résolu — la session du pair à pair de l'INC",
    "goal": "Décoder une offre et une réponse SDP pour déterminer codecs, ports UDP et champ déclaratif du flux média.",
    "brief": "<p><strong>Énoncé.</strong> L'agence BioMédia organise une conférence de presse à distance entre deux postes ToIP. Camille (poste 310) appelle Jules (poste 322). L'offre SDP est transportée dans le corps de l'INVITE, la réponse dans le 200 OK :</p><p>Offre de Camille (INVITE) :</p><pre>v=0\no=Camille 2890844526 2890844526 IN IP4 10.20.5.31\ns=-\nc=IN IP4 10.20.5.31\nt=0 0\nm=audio 16384 RTP/AVP 8 0 101\na=rtpmap:8 PCMA/8000\na=rtpmap:0 PCMU/8000\na=rtpmap:101 telephone-event/8000\na=sendrecv</pre><p>Réponse de Jules (200 OK) :</p><pre>v=0\no=Jules 2890842807 2890842807 IN IP4 10.20.5.44\ns=-\nc=IN IP4 10.20.5.44\nt=0 0\nm=audio 20000 RTP/AVP 0 101\na=rtpmap:0 PCMU/8000\na=rtpmap:101 telephone-event/8000\na=sendrecv</pre><p>Rappel du cours : la ligne m=audio liste les types de charges utiles acceptés par ordre de préférence ; a=rtpmap associe chaque numéro à un codec ; c= déclare l'adresse IP de réception du flux.</p><ol><li>Quel codec l'offre place-t-elle en tête, c'est-à-dire celui que Camille préfère ?</li><li>Sur quel port UDP Camille propose-t-elle de recevoir le flux RTP ?</li><li>Quel codec commun est finalement retenu par la réponse de Jules ?</li><li>Que désigne le type de charge utile 101 ?</li><li>Sur quel port UDP Jules demande-t-il de recevoir le flux RTP ?</li><li>Quelle ligne SDP déclare l'adresse IP de réception du flux média ?</li></ol><p>Répondez de façon courte (un codec, un port, une lettre de champ).</p>",
    "starter": "# Exercice — La négociation SDP de la visioconférence BioMédia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez de façon courte : un codec, un port ou un champ SDP.\n\n[Question 1 — Codec préféré de Camille dans l'offre]\nA_COMPLETER\n\n[Question 2 — Port RTP proposé par l'offre]\nA_COMPLETER\n\n[Question 3 — Codec finalement retenu]\nA_COMPLETER\n\n[Question 4 — Signification de la charge utile 101]\nA_COMPLETER\n\n[Question 5 — Port RTP demandé par la réponse]\nA_COMPLETER\n\n[Question 6 — Ligne SDP déclarant l'adresse IP de réception]\nA_COMPLETER\n",
    "hints": [
      "Dans la ligne m=audio, les numéros de charges utiles sont classés par ordre de préférence : le premier est le codec préféré de l'émetteur.",
      "La réponse ne conserve que les charges utiles qu'elle accepte : le premier numéro commun aux deux lignes m=audio devient le codec de la session.",
      "1. Traduisez le premier numéro de l'offre avec son a=rtpmap. 2. Le port suit le mot audio dans m=. 3. Comparez les deux lignes m=audio. 4. Cherchez la ligne a=rtpmap:101. 5. Lisez le m= de la réponse. 6. La connexion (adresse IP) est déclarée par la ligne c=."
    ],
    "examples": [
      {
        "stdin": "Deux postes de l'INC négocient une session audio.\nOffre : m=audio 49170 RTP/AVP 9 0 101 — a=rtpmap:9 G.722/8000 — a=rtpmap:0 PCMU/8000 — a=rtpmap:101 telephone-event/8000.\nRéponse : m=audio 49252 RTP/AVP 9 101 — a=rtpmap:9 G.722/8000 — a=rtpmap:101 telephone-event/8000.\n\n1) Codec préféré de l'offre : G.722 (charge utile 9, en tête).\n2) Port proposé par l'appelant : 49170.\n3) Codec retenu : G.722, premier numéro commun.\n4) La charge utile 101 désigne telephone-event, les touches DTMF.\n5) Port demandé par l'appelé : 49252.\n6) L'adresse IP de réception est déclarée par la ligne c=.",
        "expected": "G.722 préféré — port 49170 — G.722 retenu — 101 : telephone-event (DTMF) — port 49252 — ligne c=",
        "note": "La réponse ne garde que les codecs qu'elle accepte : le premier de la liste commune devient le codec de la session."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Codec préféré de Camille dans l'offre",
        "stdin": "q:1",
        "expected": "PCMA||pcma||g.711 a-law||g.711 alaw||le pcma"
      },
      {
        "label": "Question 2 — Port RTP proposé par l'offre",
        "stdin": "q:2",
        "expected": "16384||le port 16384"
      },
      {
        "label": "Question 3 — Codec finalement retenu",
        "stdin": "q:3",
        "expected": "PCMU||pcmu||g.711 µ-law||g.711 mu-law||g.711 u-law||le pcmu"
      },
      {
        "label": "Question 4 — Signification de la charge utile 101",
        "stdin": "q:4",
        "expected": "telephone-event||telephone-event/8000||les touches dtmf||dtmf||les tonalités dtmf"
      },
      {
        "label": "Question 5 — Port RTP demandé par la réponse",
        "stdin": "q:5",
        "expected": "20000||le port 20000"
      },
      {
        "label": "Question 6 — Ligne SDP déclarant l'adresse IP de réception",
        "stdin": "q:6",
        "expected": "c=||la ligne c=||c=in ip4||le champ c="
      }
    ],
    "solution": "[Question 1 — Codec préféré de Camille dans l'offre]\nPCMA\n\n[Question 2 — Port RTP proposé par l'offre]\n16384\n\n[Question 3 — Codec finalement retenu]\nPCMU\n\n[Question 4 — Signification de la charge utile 101]\ntelephone-event\n\n[Question 5 — Port RTP demandé par la réponse]\n20000\n\n[Question 6 — Ligne SDP déclarant l'adresse IP de réception]\nc=",
    "takeaway": "1) L'offre liste 8 0 101 : la charge utile 8, soit PCMA (G.711 A-law), est le codec préféré de Camille.\n2) La ligne m=audio 16384 indique que Camille reçoit le flux RTP sur le port UDP 16384.\n3) La réponse de Jules ne garde que 0 et 101 : le premier commun est 0, soit PCMU (G.711 µ-law). La session se fera en PCMU.\n4) La charge utile 101 correspond à telephone-event/8000 : le transport des touches DTMF.\n5) Jules demande le flux sur le port UDP 20000 (m=audio 20000).\n6) C'est la ligne c= (Connection Data, ex. c=IN IP4 10.20.5.44) qui déclare l'adresse IP de réception du média.\nContrôle : chaque numéro cité dans une ligne m=audio possède sa ligne a=rtpmap correspondante ; les deux postes partagent finalement PCMU et telephone-event, les deux seules charges utiles communes."
  },
  {
    "id": "vo3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "La capture RTP du webinaire du Cnam Pays de la Loire",
    "exampleTitle": "Exemple résolu — la retransmission du club des Dogues",
    "goal": "Analyser une capture RTP : numéros de séquence, horodatage, détection de perte et rôle de RTCP.",
    "brief": "<p><strong>Énoncé.</strong> Le Cnam Pays de la Loire diffuse un webinaire audio depuis son studio. Le flux part en G.711, paquets de 20 ms, horloge d'horodatage à 8 000 Hz. Sur le poste d'un auditeur, l'analyste réseau relève les paquets RTP reçus :</p><table><tr><th>Ordre de réception</th><th>Numéro de séquence</th><th>Horodatage (ticks)</th></tr><tr><th>1er</th><td>1000</td><td>16000</td></tr><tr><th>2e</th><td>1001</td><td>16160</td></tr><tr><th>3e</th><td>1003</td><td>16480</td></tr><tr><th>4e</th><td>1004</td><td>16640</td></tr></table><p>L'auditeur signale par ailleurs un léger crochet audible au début de la diffusion. Rappels du cours : l'en-tête RTP fixe mesure 12 octets ; le numéro de séquence s'incrémente de 1 par paquet émis ; RTCP accompagne RTP sur le port UDP immédiatement supérieur (impair).</p><ol><li>De combien de ticks l'horodatage progresse-t-il entre deux paquets consécutifs de 20 ms ?</li><li>Quel numéro de séquence a été perdu en route ?</li><li>Quel champ de l'en-tête RTP a permis de détecter cette perte ?</li><li>Quelle est la taille, en octets, de l'en-tête RTP fixe ?</li><li>Le flux RTP occupe le port UDP 16384 : sur quel port le protocole compagnon RTCP échange-t-il ses rapports ?</li><li>Sur quel protocole de transport, TCP ou UDP, le flux RTP est-il véhiculé ?</li></ol><p>Répondez par le nombre ou le mot attendu.</p>",
    "starter": "# Exercice — La capture RTP du webinaire du Cnam Pays de la Loire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre ou le mot attendu.\n\n[Question 1 — Progression de l'horodatage entre deux paquets (en ticks)]\nA_COMPLETER\n\n[Question 2 — Numéro de séquence perdu]\nA_COMPLETER\n\n[Question 3 — Champ RTP qui révèle la perte]\nA_COMPLETER\n\n[Question 4 — Taille de l'en-tête RTP fixe (en octets)]\nA_COMPLETER\n\n[Question 5 — Port RTCP associé au port RTP 16384]\nA_COMPLETER\n\n[Question 6 — Protocole de transport de RTP]\nA_COMPLETER\n",
    "hints": [
      "L'horodatage avance au rythme de l'horloge d'échantillonnage : 20 ms de voix à 8 000 Hz valent 8 000 × 0,02 ticks.",
      "Comparez les numéros de séquence reçus à la suite attendue 1000, 1001, 1002, 1003… pour repérer le trou.",
      "1. Incrément d'horodatage : 8 000 × 0,02 = 160 ticks. 2. Le trou est entre 1001 et 1003. 3. C'est le compteur de paquets qui révèle les manques. 4. L'en-tête RTP fixe est annoncé dans le cours. 5. RTCP utilise le port RTP + 1. 6. RTP circule au-dessus du protocole sans connexion."
    ],
    "examples": [
      {
        "stdin": "La retransmission du club des Dogues part en G.711 avec des paquets de 15 ms.\nReçus : numéros de séquence 5240, 5241, 5242, 5244, 5245.\n\n1) Incrément d'horodatage pour 15 ms : 8 000 × 0,015 = 120 ticks.\n2) Le numéro 5243 manque entre 5242 et 5244 : paquet perdu.\n3) La perte est révélée par les numéros de séquence.\n4) Si le RTP occupe le port 20002, RTCP échange sur 20003.",
        "expected": "120 ticks — paquet 5243 perdu — détection par le numéro de séquence — RTCP sur 20003",
        "note": "L'horodatage dépend de la charge utile (15 ms valent 120 ticks, 20 ms en valent 160) ; le numéro de séquence, lui, ne dépend que de l'ordre d'émission."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Progression de l'horodatage entre deux paquets (en ticks)",
        "stdin": "q:1",
        "expected": "160||160 ticks"
      },
      {
        "label": "Question 2 — Numéro de séquence perdu",
        "stdin": "q:2",
        "expected": "1002||le 1002"
      },
      {
        "label": "Question 3 — Champ RTP qui révèle la perte",
        "stdin": "q:3",
        "expected": "le numéro de séquence||numéro de séquence||le numero de sequence||sequence number||le champ numéro de séquence"
      },
      {
        "label": "Question 4 — Taille de l'en-tête RTP fixe (en octets)",
        "stdin": "q:4",
        "expected": "12||12 octets"
      },
      {
        "label": "Question 5 — Port RTCP associé au port RTP 16384",
        "stdin": "q:5",
        "expected": "16385||le port 16385"
      },
      {
        "label": "Question 6 — Protocole de transport de RTP",
        "stdin": "q:6",
        "expected": "UDP||udp||l'udp"
      }
    ],
    "solution": "[Question 1 — Progression de l'horodatage entre deux paquets (en ticks)]\n160\n\n[Question 2 — Numéro de séquence perdu]\n1002\n\n[Question 3 — Champ RTP qui révèle la perte]\nle numéro de séquence\n\n[Question 4 — Taille de l'en-tête RTP fixe (en octets)]\n12\n\n[Question 5 — Port RTCP associé au port RTP 16384]\n16385\n\n[Question 6 — Protocole de transport de RTP]\nUDP",
    "takeaway": "1) 20 ms de voix à 8 000 Hz : 8 000 × 0,02 = 160 ticks entre deux paquets consécutifs (16000 → 16160 → …).\n2) La suite reçue saute de 1001 à 1003 : le paquet 1002 a été perdu en route.\n3) C'est le numéro de séquence, incrémenté de 1 à chaque paquet émis, qui révèle le trou (il sert aussi à réordonner les paquets délivrés dans le désordre).\n4) L'en-tête RTP fixe occupe 12 octets (numéro de séquence, horodatage, SSRC…).\n5) RTCP accompagne RTP sur le port immédiatement supérieur : 16384 + 1 = 16385.\n6) RTP est véhiculé sur UDP : la retransmission de TCP serait inadaptée au temps réel.\nContrôle : l'horodatage du paquet perdu (1002) aurait dû valoir 16320, soit 16160 + 160 ; les timestamps observés (16480 pour 1003) confirment que seuls deux paquets manquent à l'appel dans la chronologie."
  },
  {
    "id": "vo3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Les postes du cabinet Vergnet & Associés",
    "exampleTitle": "Exemple résolu — l'étude notariale Beau-Séjour",
    "goal": "Dresser la liste des comptes SIP d'une PME et citer les directives de sip.conf qui les définissent.",
    "brief": "<p><strong>Énoncé.</strong> Le cabinet d'expertise comptable Vergnet & Associés, quatre collaborateurs, remplace son standard analogique par un IPBX Asterisk. La responsable informatique dresse la table d'extensions suivante :</p><table><tr><th>Extension</th><th>Collaborateur</th><th>Service</th><th>Contexte</th><th>Matériel</th></tr><tr><th>201</th><td>Aïcha Ndiaye</td><td>Accueil</td><td>work</td><td>Poste IP PoE</td></tr><tr><th>202</th><td>Marc Leroux</td><td>Comptabilité</td><td>work</td><td>Softphone sur portable</td></tr><tr><th>203</th><td>Sofia Pereira</td><td>Comptabilité</td><td>work</td><td>Poste IP PoE</td></tr><tr><th>204</th><td>Yanis Amrani</td><td>Direction</td><td>direction</td><td>Softphone nomade</td></tr></table><p>Le cabinet ajoute une boîte vocale générale, la numéro 250, qui accueille les appelants en dehors des horaires d'ouverture. Cette boîte n'est rattachée à aucun poste physique.</p><p>Rappel du cours : chaque poste est déclaré dans sip.conf par une section [numéro] avec les directives type, host, secret et context.</p><ol><li>Combien de comptes SIP faut-il déclarer dans sip.conf ?</li><li>Quelle directive indique qu'un poste sans adresse IP fixe doit s'enregistrer auprès du serveur ?</li><li>Quelle directive rattache chaque poste à son contexte d'acheminement du Dialplan ?</li><li>Quelle valeur du paramètre type autorise un poste à la fois à émettre et à recevoir des appels ?</li><li>Dans quel fichier les boîtes vocales, comme la 250, sont-elles déclarées ?</li></ol><p>Répondez de façon courte (un nombre, une directive, un mot).</p>",
    "starter": "# Exercice — Les postes du cabinet Vergnet & Associés\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez de façon courte : un nombre, une directive ou un mot.\n\n[Question 1 — Nombre de comptes SIP à déclarer]\nA_COMPLETER\n\n[Question 2 — Directive d'enregistrement pour un poste sans IP fixe]\nA_COMPLETER\n\n[Question 3 — Directive de rattachement au contexte]\nA_COMPLETER\n\n[Question 4 — Valeur de type pour émettre et recevoir]\nA_COMPLETER\n\n[Question 5 — Fichier des boîtes vocales]\nA_COMPLETER\n",
    "hints": [
      "Seuls les postes qui émettent et reçoivent des appels ont besoin d'un compte SIP : la boîte vocale générale n'en est pas un.",
      "Relisez la fiche type du cours : [706438029] avec type=friend, host=dynamic, secret=… et context=work.",
      "1. Comptez les postes de la table, pas les boîtes vocales. 2. host=dynamic impose l'enregistrement REGISTER. 3. La directive context fixe le contexte du Dialplan. 4. type=friend combine peer et user. 5. Les boîtes vocales se déclarent dans voicemail.conf."
    ],
    "examples": [
      {
        "stdin": "L'étude notariale Beau-Séjour installe un IPBX Asterisk : extensions 101 à 105 (cinq collaborateurs,\npostes IP et softphones) et une boîte vocale générale 199.\n\n1) Il faut déclarer 5 comptes SIP (101 à 105) : la boîte 199 n'est pas un poste.\n2) Les softphones sans IP fixe utilisent host=dynamic.\n3) Chaque poste est rattaché à son contexte par la directive context.\n4) type=friend autorise l'émission et la réception.\n5) La boîte 199 se déclare dans voicemail.conf.",
        "expected": "5 comptes — host=dynamic — context — friend — voicemail.conf",
        "note": "Une boîte vocale n'est pas un compte SIP : elle vit dans voicemail.conf, pas dans sip.conf."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de comptes SIP à déclarer",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Directive d'enregistrement pour un poste sans IP fixe",
        "stdin": "q:2",
        "expected": "host=dynamic||dynamic||la directive host=dynamic"
      },
      {
        "label": "Question 3 — Directive de rattachement au contexte",
        "stdin": "q:3",
        "expected": "context||la directive context||context=work"
      },
      {
        "label": "Question 4 — Valeur de type pour émettre et recevoir",
        "stdin": "q:4",
        "expected": "friend||type=friend"
      },
      {
        "label": "Question 5 — Fichier des boîtes vocales",
        "stdin": "q:5",
        "expected": "voicemail.conf||le fichier voicemail.conf"
      }
    ],
    "solution": "[Question 1 — Nombre de comptes SIP à déclarer]\n4\n\n[Question 2 — Directive d'enregistrement pour un poste sans IP fixe]\nhost=dynamic\n\n[Question 3 — Directive de rattachement au contexte]\ncontext\n\n[Question 4 — Valeur de type pour émettre et recevoir]\nfriend\n\n[Question 5 — Fichier des boîtes vocales]\nvoicemail.conf",
    "takeaway": "1) Il faut 4 comptes SIP : les extensions 201, 202, 203 et 204. La boîte vocale 250 n'est pas un poste : aucun compte SIP pour elle.\n2) host=dynamic : le poste n'a pas d'adresse IP fixe, il doit s'enregistrer par une requête REGISTER.\n3) C'est la directive context (ex. context=work pour l'accueil et la comptabilité, context=direction pour la direction) qui rattache le poste à son contexte du Dialplan.\n4) type=friend : le poste est à la fois client (peer, il émet) et serveur (user, il reçoit).\n5) Les boîtes vocales se déclarent dans /etc/asterisk/voicemail.conf, par contexte ([work], [direction]).\nContrôle : la table compte 4 lignes de postes pour 5 numéros annoncés (201 à 204 plus la boîte 250) : la différence est précisément la boîte vocale, sans compte SIP."
  },
  {
    "id": "vo3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "La messagerie vocale du cabinet Vergnet",
    "exampleTitle": "Exemple résolu — le standard du musée du Bord de Mer",
    "goal": "Lire une configuration voicemail.conf et chiffrer le stockage des messages vocaux en G.711.",
    "brief": "<p><strong>Énoncé.</strong> Le cabinet Vergnet & Associés active la messagerie vocale de son IPBX Asterisk. L'extrait de /etc/asterisk/voicemail.conf est le suivant :</p><pre>[work]\n201 => 4102,Aïcha Ndiaye,accueil@vergnet-associes.fr,,attach=yes\n202 => 8831,Marc Leroux,comptabilite@vergnet-associes.fr,,attach=no\n203 => 5150,Sofia Pereira,comptabilite@vergnet-associes.fr,,attach=no</pre><p>Le message d'accueil du cabinet invite les clients à « laisser un message de deux minutes maximum ». Les messages sont enregistrés en G.711, soit un débit de 64 kbps.</p><p>Rappel du cours : la consultation d'une boîte passe par l'application VoiceMailMain() ; le code PIN (4 chiffres) est le premier champ de la ligne de la boîte.</p><ol><li>Quel code PIN Marc Leroux compose-t-il pour consulter sa boîte vocale ?</li><li>Quelle application du Dialplan permet à un salarié de consulter sa boîte vocale ?</li><li>Pour quelle boîte le message audio est-il envoyé par courriel en pièce jointe ?</li><li>Combien d'octets par seconde occupe un message enregistré en G.711 (64 kbps) ?</li><li>Quelle taille, en octets, occupe au maximum un message de deux minutes ?</li></ol><p>Répondez par le nombre, le code ou le nom attendus.</p>",
    "starter": "# Exercice — La messagerie vocale du cabinet Vergnet\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre, le code ou le nom attendus.\n\n[Question 1 — Code PIN de la boîte de Marc Leroux]\nA_COMPLETER\n\n[Question 2 — Application de consultation de la boîte vocale]\nA_COMPLETER\n\n[Question 3 — Boîte qui reçoit le message par courriel]\nA_COMPLETER\n\n[Question 4 — Octets par seconde d'un message G.711]\nA_COMPLETER\n\n[Question 5 — Taille maximale d'un message de deux minutes (en octets)]\nA_COMPLETER\n",
    "hints": [
      "Le code PIN est le premier champ après le numéro de boîte, avant le nom du propriétaire.",
      "Un débit de 64 kbps équivaut à 64 000 bits par seconde, donc 8 000 octets par seconde.",
      "1. PIN de 202 : lisez la deuxième ligne. 2. La consultation passe par VoiceMailMain(). 3. attach=yes n'apparaît que sur une ligne. 4. 64 000 / 8 = 8 000 octets/s. 5. Deux minutes = 120 secondes : multipliez."
    ],
    "examples": [
      {
        "stdin": "Le musée du Bord de Mer configure sa messagerie : [accueil]\n300 => 2178,Perpetue Mendy,accueil@musee-bm.fr,,attach=yes\nLes messages sont limités à 90 secondes, enregistrés en G.711 (64 kbps).\n\n1) Code PIN : 2178.\n2) Consultation : VoiceMailMain().\n3) La pièce jointe part pour la boîte 300 (attach=yes).\n4) 64 000 / 8 = 8 000 octets par seconde.\n5) 90 secondes : 8 000 × 90 = 720 000 octets.",
        "expected": "PIN 2178 — VoiceMailMain() — pièce jointe pour la boîte 300 — 8 000 octets/s — 720 000 octets",
        "note": "attach=yes transmet le fichier WAV par courriel ; la boîte conserve néanmoins sa copie sur le serveur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Code PIN de la boîte de Marc Leroux",
        "stdin": "q:1",
        "expected": "8831||le code 8831"
      },
      {
        "label": "Question 2 — Application de consultation de la boîte vocale",
        "stdin": "q:2",
        "expected": "VoiceMailMain()||VoiceMailMain||voicemailmain()||voicemailmain"
      },
      {
        "label": "Question 3 — Boîte qui reçoit le message par courriel",
        "stdin": "q:3",
        "expected": "201||la boîte 201||la boite 201"
      },
      {
        "label": "Question 4 — Octets par seconde d'un message G.711",
        "stdin": "q:4",
        "expected": "8000||8 000||8000 octets"
      },
      {
        "label": "Question 5 — Taille maximale d'un message de deux minutes (en octets)",
        "stdin": "q:5",
        "expected": "960000||960 000||960000 octets"
      }
    ],
    "solution": "[Question 1 — Code PIN de la boîte de Marc Leroux]\n8831\n\n[Question 2 — Application de consultation de la boîte vocale]\nVoiceMailMain()\n\n[Question 3 — Boîte qui reçoit le message par courriel]\n201\n\n[Question 4 — Octets par seconde d'un message G.711]\n8000\n\n[Question 5 — Taille maximale d'un message de deux minutes (en octets)]\n960000",
    "takeaway": "1) Le code PIN de la boîte 202 (Marc Leroux) est 8831.\n2) La consultation passe par l'application VoiceMailMain() du Dialplan.\n3) attach=yes n'apparaît que sur la ligne de la boîte 201 : seul le message d'Aïcha Ndiaye part en pièce jointe vers accueil@vergnet-associes.fr.\n4) 64 kbps = 64 000 bits/s = 64 000 / 8 = 8 000 octets par seconde.\n5) Deux minutes = 120 secondes : 8 000 × 120 = 960 000 octets, soit environ 0,96 Mo par message.\nContrôle : une heure de messages en G.711 occuperait 8 000 × 3 600 = 28,8 Mo : la limite de deux minutes tient chaque boîte sous le méga-octet par message."
  },
  {
    "id": "vo3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Les enregistrements SIP du serveur de Vergnet & Associés",
    "exampleTitle": "Exemple résolu — les baux de l'agence immobilière Horizon",
    "goal": "Suivre les baux d'enregistrement REGISTER d'un IPBX et détecter les postes injoignables.",
    "brief": "<p><strong>Énoncé.</strong> Les postes du cabinet Vergnet & Associés sont déclarés avec host=dynamic : chacun s'enregistre périodiquement auprès du Registrar d'Asterisk. À <strong>08:45:00</strong>, la console du serveur affiche l'état des enregistrements :</p><table><tr><th>Poste</th><th>Dernier REGISTER reçu</th><th>Durée du bail (expires)</th></tr><tr><th>201</th><td>08:00:00</td><td>3600 s</td></tr><tr><th>202</th><td>08:20:00</td><td>1800 s</td></tr><tr><th>204</th><td>07:00:00</td><td>3600 s</td></tr></table><p>Rappel du cours : le bail expire à l'heure du dernier REGISTER + expires ; un poste non réenregistré devient injoignable en appel entrant ; l'enregistrement s'effectue par une requête REGISTER acquittée par un 200 OK.</p><ol><li>À 08:45:00, combien de minutes restent-ils avant l'expiration du bail du poste 201 ?</li><li>Combien de minutes restent-ils avant l'expiration du bail du poste 202 ?</li><li>Le poste 204 est-il encore enregistré à 08:45:00 (oui ou non) ?</li><li>Quelle méthode SIP un poste envoie-t-il pour renouveler son bail ?</li><li>Quel code de réponse finale confirme un enregistrement réussi ?</li><li>À quelle heure exacte le bail du poste 202 expire-t-il (format hh:mm) ?</li></ol><p>Répondez par le nombre, oui/non, la méthode ou le code attendus.</p>",
    "starter": "# Exercice — Les enregistrements SIP du serveur de Vergnet & Associés\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre, oui/non, la méthode ou le code attendus.\n\n[Question 1 — Minutes restantes au bail du poste 201]\nA_COMPLETER\n\n[Question 2 — Minutes restantes au bail du poste 202]\nA_COMPLETER\n\n[Question 3 — Le poste 204 est-il encore enregistré]\nA_COMPLETER\n\n[Question 4 — Méthode SIP de renouvellement du bail]\nA_COMPLETER\n\n[Question 5 — Code de réponse confirmant l'enregistrement]\nA_COMPLETER\n\n[Question 6 — Heure d'expiration du bail du poste 202 (hh:mm)]\nA_COMPLETER\n",
    "hints": [
      "Convertissez la durée du bail en minutes : 3600 s = 60 min, 1800 s = 30 min, puis ajoutez-la à l'heure du dernier REGISTER.",
      "Un bail déjà expiré à l'heure d'observation signifie que le poste n'a pas renouvelé son enregistrement.",
      "1. Poste 201 : dernier REGISTER 08:00 + 60 min = expiration 09:00 ; il reste 15 min à 08:45. 2. Poste 202 : 08:20 + 30 min = expiration 08:50. 3. Poste 204 : 07:00 + 60 min = 08:00, donc expiré depuis 08:45. 4. Le renouvellement passe par REGISTER. 5. La réponse finale de succès est le 200 OK."
    ],
    "examples": [
      {
        "stdin": "L'agence immobilière Horizon observe ses postes à 09:15:00 :\n101 : REGISTER à 09:00:00, expires 1200 s (20 min) ;\n102 : REGISTER à 08:30:00, expires 3600 s (60 min) ;\n103 : REGISTER à 08:00:00, expires 1800 s (30 min).\n\n1) Poste 101 : expiration à 09:20:00, il reste 5 minutes.\n2) Poste 102 : expiration à 09:30:00, il reste 15 minutes.\n3) Poste 103 : bail expiré depuis 08:30:00 : poste non enregistré.\n4) Le renouvellement se fait par REGISTER, acquitté 200 OK.",
        "expected": "101 : 5 minutes restantes — 102 : 15 minutes — 103 : expiré — REGISTER — 200 OK",
        "note": "Un bail expiré rend le poste injoignable : sans réenregistrement, l'IPBX ne sait plus où acheminer les appels entrants."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Minutes restantes au bail du poste 201",
        "stdin": "q:1",
        "expected": "15||15 minutes||15 min"
      },
      {
        "label": "Question 2 — Minutes restantes au bail du poste 202",
        "stdin": "q:2",
        "expected": "5||5 minutes||5 min"
      },
      {
        "label": "Question 3 — Le poste 204 est-il encore enregistré",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Méthode SIP de renouvellement du bail",
        "stdin": "q:4",
        "expected": "REGISTER||register||la méthode REGISTER"
      },
      {
        "label": "Question 5 — Code de réponse confirmant l'enregistrement",
        "stdin": "q:5",
        "expected": "200 OK||200 ok||le 200 OK||200"
      },
      {
        "label": "Question 6 — Heure d'expiration du bail du poste 202 (hh:mm)",
        "stdin": "q:6",
        "expected": "08:50||8:50||08h50"
      }
    ],
    "solution": "[Question 1 — Minutes restantes au bail du poste 201]\n15\n\n[Question 2 — Minutes restantes au bail du poste 202]\n5\n\n[Question 3 — Le poste 204 est-il encore enregistré]\nnon\n\n[Question 4 — Méthode SIP de renouvellement du bail]\nREGISTER\n\n[Question 5 — Code de réponse confirmant l'enregistrement]\n200 OK\n\n[Question 6 — Heure d'expiration du bail du poste 202 (hh:mm)]\n08:50",
    "takeaway": "1) Poste 201 : dernier REGISTER à 08:00:00 + 3600 s = expiration à 09:00:00 ; à 08:45:00, il reste 15 minutes.\n2) Poste 202 : 08:20:00 + 1800 s = expiration à 08:50:00 ; il reste 5 minutes.\n3) Poste 204 : 07:00:00 + 3600 s = expiration à 08:00:00 ; à 08:45:00 le bail est expiré depuis 45 minutes : le poste n'est plus enregistré (il n'a pas renouvelé son bail).\n4) Le poste renouvelle son bail par une requête REGISTER envoyée au Registrar.\n5) L'enregistrement réussi est confirmé par une réponse finale 200 OK.\n6) Le bail du poste 202 expire à 08:50.\nContrôle : le poste 203, lui, n'apparaît pas dans la console : il ne s'est jamais enregistré depuis le redémarrage du serveur, situation à distinguer d'un bail expiré."
  },
  {
    "id": "vo3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le menu vocal du standard d'UrgenceFuite",
    "exampleTitle": "Exemple résolu — la hotline du loueur Vél'Océan",
    "goal": "Lire un Dialplan Asterisk simple : extensions spéciales, applications Answer, Background, WaitExten et renvoi vers la boîte vocale.",
    "brief": "<p><strong>Énoncé.</strong> La société de dépannage UrgenceFuite publie un numéro unique pour ses clients. Son IPBX Asterisk exécute le Dialplan suivant :</p><pre>[accueil]\nexten => s,1,Answer()\nexten => s,n,Background(bienvenue-urgencefuite)\nexten => s,n,WaitExten(6)\nexten => 1,1,Dial(SIP/301,15)\nexten => 1,n,VoiceMail(301@urgence)\nexten => 2,1,Queue(astreinte)\nexten => 2,n,Hangup()\nexten => t,1,Playback(merci-au-revoir)\nexten => t,n,Hangup()</pre><p>Rappel du cours : l'extension s (start) accueille un appel sans numéro composé ; l'extension t (timeout) est déclenchée quand aucune touche n'est pressée dans le délai imparti.</p><ol><li>Quelle extension spéciale sert de point d'entrée à l'appel entrant ?</li><li>Que fait l'application Answer() exécutée en priorité 1 ?</li><li>Quelle application diffuse le message d'accueil tout en restant à l'écoute des touches DTMF ?</li><li>Quelle extension spéciale est déclenchée si l'appelant ne presse aucune touche pendant les 6 secondes ?</li><li>Un client presse la touche 1 mais personne ne décroche au poste 301 pendant les 15 secondes : que devient l'appel ?</li></ol><p>Répondez de façon courte (une lettre, une application, une phrase brève pour la question 5).</p>",
    "starter": "# Exercice — Le menu vocal du standard d'UrgenceFuite\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez de façon courte : une lettre, une application ou une phrase brève.\n\n[Question 1 — Extension spéciale de point d'entrée]\nA_COMPLETER\n\n[Question 2 — Rôle de l'application Answer()]\nA_COMPLETER\n\n[Question 3 — Application qui joue le menu en écoutant les touches]\nA_COMPLETER\n\n[Question 4 — Extension spéciale déclenchée sans aucune touche]\nA_COMPLETER\n\n[Question 5 — Devenir de l'appel si le poste 301 ne répond pas]\nA_COMPLETER\n",
    "hints": [
      "Suivez l'exécution dans l'ordre des priorités : 1, puis n (next) : Answer, Background, WaitExten.",
      "Deux applications jouent des sons : Background écoute les touches pendant la diffusion, Playback ne les écoute pas.",
      "1. Un appel entrant sans numéro composé démarre sur l'extension s. 2. Answer() décroche la ligne. 3. Le menu est diffusé par Background(). 4. Sans touche pendant 6 s, l'extension t prend le relais. 5. Après Dial(SIP/301,15) sans réponse, la priorité suivante VoiceMail(301@urgence) prend l'appel."
    ],
    "examples": [
      {
        "stdin": "Le loueur Vél'Océan diffuse ce menu : [accueil]\nexten => s,1,Answer()\nexten => s,n,Background(bienvenue-velocean)\nexten => s,n,WaitExten(4)\nexten => 1,1,Dial(SIP/101,10)\nexten => 1,n,VoiceMail(101@velocean)\nexten => t,1,Playback(au-revoir)\nexten => t,n,Hangup()\n\n1) L'appel entre par l'extension s.\n2) Answer() décroche la ligne.\n3) Background(bienvenue-velocean) joue le menu en écoutant les touches.\n4) Sans touche pendant 4 s : extension t (Playback au-revoir puis Hangup).\n5) Poste 101 sans réponse pendant 10 s : l'appel part sur la boîte vocale 101.",
        "expected": "entrée par s — Answer() décroche — Background écoute les touches — t après 4 s — boîte vocale 101",
        "note": "Playback, lui, joue un son sans écouter les touches : on le réserve aux annonces finales."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Extension spéciale de point d'entrée",
        "stdin": "q:1",
        "expected": "s||l'extension s"
      },
      {
        "label": "Question 2 — Rôle de l'application Answer()",
        "stdin": "q:2",
        "expected": "elle décroche la ligne||elle décroche||décrocher la ligne||elle décroche l'appel||elle décroche le canal"
      },
      {
        "label": "Question 3 — Application qui joue le menu en écoutant les touches",
        "stdin": "q:3",
        "expected": "Background||Background()||background"
      },
      {
        "label": "Question 4 — Extension spéciale déclenchée sans aucune touche",
        "stdin": "q:4",
        "expected": "t||l'extension t"
      },
      {
        "label": "Question 5 — Devenir de l'appel si le poste 301 ne répond pas",
        "stdin": "q:5",
        "expected": "il part sur la boîte vocale 301||il est renvoyé vers la boîte vocale 301||vers la boîte vocale 301||la boîte vocale 301||il bascule sur la messagerie vocale 301"
      }
    ],
    "solution": "[Question 1 — Extension spéciale de point d'entrée]\ns\n\n[Question 2 — Rôle de l'application Answer()]\nelle décroche la ligne\n\n[Question 3 — Application qui joue le menu en écoutant les touches]\nBackground\n\n[Question 4 — Extension spéciale déclenchée sans aucune touche]\nt\n\n[Question 5 — Devenir de l'appel si le poste 301 ne répond pas]\nil part sur la boîte vocale 301",
    "takeaway": "1) L'appel entrant, sans numéro composé, démarre sur l'extension spéciale s (start).\n2) Answer() décroche la ligne : l'IPBX répond à l'appelant dès la priorité 1.\n3) C'est Background(bienvenue-urgencefuite) qui diffuse le message tout en collectant les touches DTMF.\n4) Sans aucune touche pendant les 6 secondes de WaitExten(6), l'extension t (timeout) est déclenchée : message de remerciement puis Hangup().\n5) Dial(SIP/301,15) sonne 15 secondes ; sans décrochage, l'exécution passe à la priorité suivante : VoiceMail(301@urgence), l'appel est renvoyé sur la boîte vocale du poste 301.\nContrôle : la touche 2 mène à la file astreinte (Queue) puis à un Hangup propre : chaque branche du menu se termine par une issue explicite."
  },
  {
    "id": "vo3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Les masques de numérotation de la mutuelle Solidia",
    "exampleTitle": "Exemple résolu — le plan du centre de formation Confluences",
    "goal": "Faire correspondre des numéros composés aux motifs Asterisk _X, _Z, _N et extraire ${EXTEN}.",
    "brief": "<p><strong>Énoncé.</strong> La mutuelle Solidia regroupe 300 salariés derrière un IPBX Asterisk. Le Dialplan du contexte [work] ne contient que ces trois règles à motifs :</p><table><tr><th>Règle</th><th>Motif</th><th>Action</th></tr><tr><th>A</th><td>_4XXX</td><td>Dial(SIP/${EXTEN},15) — postes internes</td></tr><tr><th>B</th><td>_0Z.</td><td>Dial(SIP/trunk-solidia/${EXTEN},30) — réseau public</td></tr><tr><th>C</th><td>_99N</td><td>Queue(conseillers) — numéros courts du service conseil</td></tr></table><p>Rappel du cours : X correspond à un chiffre de 0 à 9 ; Z à un chiffre de 1 à 9 ; N à un chiffre de 2 à 9 ; le point correspond à un ou plusieurs caractères quelconques ; ${EXTEN} contient le numéro composé. La variable ${EXTEN} vaut exactement la chaîne composée.</p><ol><li>Un salarié compose 4271 : quelle règle (A, B ou C) s'applique ?</li><li>Un salarié compose 0698765432 : quelle règle s'applique ?</li><li>Dans le motif _4XXX, que représente le symbole X ?</li><li>Quelle est la plus grande extension interne interceptée par la règle A ?</li><li>Quelle est la plus petite extension interne interceptée par la règle A ?</li><li>Quel symbole de motif correspond uniquement aux chiffres de 2 à 9 ?</li></ol><p>Répondez par la lettre de la règle, le nombre ou le symbole attendus.</p>",
    "starter": "# Exercice — Les masques de numérotation de la mutuelle Solidia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par la lettre de la règle, le nombre ou le symbole attendus.\n\n[Question 1 — Règle appliquée au numéro 4271]\nA_COMPLETER\n\n[Question 2 — Règle appliquée au numéro 0698765432]\nA_COMPLETER\n\n[Question 3 — Signification du symbole X]\nA_COMPLETER\n\n[Question 4 — Plus grande extension interne de la règle A]\nA_COMPLETER\n\n[Question 5 — Plus petite extension interne de la règle A]\nA_COMPLETER\n\n[Question 6 — Symbole des chiffres de 2 à 9]\nA_COMPLETER\n",
    "hints": [
      "Un motif Asterisk commence par le souligné : chaque caractère du motif (X, Z, N, chiffre littéral, point) doit correspondre au numéro composé, chiffre par chiffre.",
      "La règle A _4XXX capture exactement quatre chiffres commençant par 4 ; la règle B _0Z. commence par 0 puis un chiffre non nul, suivi d'au moins un caractère.",
      "1. 4271 : quatre chiffres commençant par 4. 2. 0698765432 : 0 puis 6 (non nul) puis huit chiffres. 3. X couvre 0 à 9. 4. et 5. Balayez 4000 à 4999. 6. Le symbole réservé aux chiffres 2 à 9 est N."
    ],
    "examples": [
      {
        "stdin": "Le centre de formation Confluences utilise deux motifs :\n_3XXX pour les postes internes (Dial SIP) et _0[1-5]. pour le réseau public via le trunk.\n\n1) 3112 composé : quatre chiffres commençant par 3 : règle des postes internes (_3XXX).\n2) 0219876543 composé : 0 puis 2 (dans la liste 1 à 5) puis d'autres chiffres : règle du trunk (_0[1-5].).\n3) X représente un chiffre de 0 à 9.\n4) La plus grande extension interne interceptée : 3999.\n5) Le symbole [1-5] : un chiffre parmi 1, 2, 3, 4 ou 5.",
        "expected": "3112 → postes internes — 0219876543 → trunk — X : 0 à 9 — 3999 — [1-5] : un chiffre de 1 à 5",
        "note": "Les crochets énumèrent les chiffres admis : [1-5] accepte 1, 2, 3, 4 et 5, rien d'autre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Règle appliquée au numéro 4271",
        "stdin": "q:1",
        "expected": "A||la règle A||règle A"
      },
      {
        "label": "Question 2 — Règle appliquée au numéro 0698765432",
        "stdin": "q:2",
        "expected": "B||la règle B||règle B"
      },
      {
        "label": "Question 3 — Signification du symbole X",
        "stdin": "q:3",
        "expected": "un chiffre de 0 à 9||n'importe quel chiffre de 0 à 9||un chiffre entre 0 et 9||un chiffre compris entre 0 et 9||un chiffre de 0 a 9"
      },
      {
        "label": "Question 4 — Plus grande extension interne de la règle A",
        "stdin": "q:4",
        "expected": "4999||la 4999"
      },
      {
        "label": "Question 5 — Plus petite extension interne de la règle A",
        "stdin": "q:5",
        "expected": "4000||la 4000"
      },
      {
        "label": "Question 6 — Symbole des chiffres de 2 à 9",
        "stdin": "q:6",
        "expected": "N||le symbole N"
      }
    ],
    "solution": "[Question 1 — Règle appliquée au numéro 4271]\nA\n\n[Question 2 — Règle appliquée au numéro 0698765432]\nB\n\n[Question 3 — Signification du symbole X]\nun chiffre de 0 à 9\n\n[Question 4 — Plus grande extension interne de la règle A]\n4999\n\n[Question 5 — Plus petite extension interne de la règle A]\n4000\n\n[Question 6 — Symbole des chiffres de 2 à 9]\nN",
    "takeaway": "1) 4271 : le 4 littéral suivi de trois chiffres quelconques (271) : c'est la règle A (_4XXX), l'appel sonne au poste SIP/4271 pendant 15 secondes.\n2) 0698765432 : le 0 littéral, puis 6 (chiffre non nul, donc Z), puis huit caractères (le point) : règle B (_0Z.), l'appel sort par le trunk vers le réseau public.\n3) X représente n'importe quel chiffre de 0 à 9.\n4) La règle A capture les numéros de 4000 à 4999 : la plus grande extension est 4999.\n5) La plus petite est 4000.\n6) C'est le symbole N qui correspond uniquement aux chiffres de 2 à 9 (Z couvre 1 à 9, X couvre 0 à 9).\nContrôle : la règle C _99N intercepte les numéros courts 992 à 999 (trois chiffres, le dernier entre 2 et 9), tous dirigés vers la file conseillers."
  },
  {
    "id": "vo3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "La navigation dans le SVI d'AssurPharma",
    "exampleTitle": "Exemple résolu — le serveur vocal du théâtre du Quartz",
    "goal": "Suivre un appelant dans un SVI : extensions i et t, Goto, files d'attente et durées d'attente.",
    "brief": "<p><strong>Énoncé.</strong> La mutuelle AssurPharma accueille ses adhérents par un serveur vocal interactif. Le Dialplan du contexte [menu] est le suivant :</p><pre>exten => s,1,Answer()\nexten => s,n,Background(menu-assurpharma)\nexten => s,n,WaitExten(8)\nexten => 1,1,Queue(ventes,rtt,,,60)\nexten => 1,n,Playback(repondeur-ventes)\nexten => 2,1,Queue(support,rtt,,,60)\nexten => 2,n,Playback(repondeur-support)\nexten => 3,1,Playback(horaires-agences)\nexten => 3,n,Goto(s,2)\nexten => t,1,Playback(merci-au-revoir)\nexten => t,n,Hangup()\nexten => i,1,Playback(touche-invalide)\nexten => i,n,Goto(s,2)</pre><p>Le menu diffusé annonce : « Tapez 1 pour les ventes, 2 pour le support, 3 pour les horaires des agences. »</p><p>Mme Costa appelle à 14:00. Elle écoute le menu, presse la touche 5 : un message lui signale que la touche est inconnue, puis le menu est rejoué. Elle presse alors la touche 2 à 14:02 et un conseiller du support décroche à 14:04.</p><ol><li>Quelle extension spéciale a intercepté la touche 5 ?</li><li>Quelle application rejoue le menu après le message « touche invalide » ?</li><li>Dans quelle file d'attente Mme Costa entre-t-elle en pressant la touche 2 ?</li><li>Quelle extension spéciale aurait été déclenchée si Mme Costa n'avait rien pressé pendant les 8 secondes ?</li><li>Combien de secondes Mme Costa a-t-elle attendu un conseiller, entre la pression sur la touche 2 et le décrochage ?</li><li>Que fait l'application Goto(s,2) ?</li></ol><p>Répondez de façon courte (une lettre, une application, un nom de file, un nombre, une phrase brève).</p>",
    "starter": "# Exercice — La navigation dans le SVI d'AssurPharma\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez de façon courte : une lettre, une application, un nom de file, un nombre.\n\n[Question 1 — Extension spéciale qui intercepte la touche 5]\nA_COMPLETER\n\n[Question 2 — Application qui rejoue le menu]\nA_COMPLETER\n\n[Question 3 — File d'attente choisie par la touche 2]\nA_COMPLETER\n\n[Question 4 — Extension spéciale déclenchée sans aucune touche]\nA_COMPLETER\n\n[Question 5 — Attente du conseiller (en secondes)]\nA_COMPLETER\n\n[Question 6 — Rôle de l'application Goto(s,2)]\nA_COMPLETER\n",
    "hints": [
      "Les deux extensions spéciales du SVI : i (invalid) pour une touche inconnue, t (timeout) pour l'absence de touche.",
      "Goto(s,2) ramène l'exécution à la priorité 2 de l'extension s : regardez ce que fait cette priorité.",
      "1. La touche 5 n'existe pas dans le contexte : extension i. 2. La priorité 2 de s diffuse le menu. 3. La touche 2 mène à Queue(support). 4. Sans touche pendant 8 s : extension t. 5. De 14:02 à 14:04. 6. Goto(s,2) renvoie au début du menu."
    ],
    "examples": [
      {
        "stdin": "Le théâtre du Quartz diffuse : [menu]\nexten => s,1,Answer()\nexten => s,n,Background(menu-quartz)\nexten => s,n,WaitExten(5)\nexten => 1,1,Queue(billetterie)\nexten => 2,1,Playback(programmation)\nexten => 2,n,Goto(s,2)\nexten => t,1,Playback(au-revoir)\nexten => t,n,Hangup()\nexten => i,1,Playback(touche-invalide)\nexten => i,n,Goto(s,2)\n\nM. Farid appelle à 18:00, presse 7 (message « touche invalide », menu rejoué),\npuis presse 2 à 18:01 : il entend la programmation puis le menu revient.\n\n1) La touche 7 est interceptée par l'extension i.\n2) Le menu est rejoué par Background (Goto(s,2) ramène à la priorité 2 de s).\n3) S'il n'avait rien pressé pendant 5 s : extension t (au-revoir puis Hangup).\n4) Goto(s,2) renvoie l'exécution au début du menu.",
        "expected": "touche 7 → extension i — menu rejoué par Background — aucune touche → t — Goto(s,2) renvoie au menu",
        "note": "Les extensions t (timeout) et i (invalid) sont les garde-fous d'un SVI : sans elles, un appelant perdu resterait bloqué."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Extension spéciale qui intercepte la touche 5",
        "stdin": "q:1",
        "expected": "i||l'extension i"
      },
      {
        "label": "Question 2 — Application qui rejoue le menu",
        "stdin": "q:2",
        "expected": "Background||Background()||background"
      },
      {
        "label": "Question 3 — File d'attente choisie par la touche 2",
        "stdin": "q:3",
        "expected": "support||la file support||la file d'attente support"
      },
      {
        "label": "Question 4 — Extension spéciale déclenchée sans aucune touche",
        "stdin": "q:4",
        "expected": "t||l'extension t"
      },
      {
        "label": "Question 5 — Attente du conseiller (en secondes)",
        "stdin": "q:5",
        "expected": "120||120 secondes||120 s"
      },
      {
        "label": "Question 6 — Rôle de l'application Goto(s,2)",
        "stdin": "q:6",
        "expected": "elle rejoue le menu||elle renvoie au menu||renvoie au menu||elle retourne au menu||revient au menu||elle ramène l'exécution au menu"
      }
    ],
    "solution": "[Question 1 — Extension spéciale qui intercepte la touche 5]\ni\n\n[Question 2 — Application qui rejoue le menu]\nBackground\n\n[Question 3 — File d'attente choisie par la touche 2]\nsupport\n\n[Question 4 — Extension spéciale déclenchée sans aucune touche]\nt\n\n[Question 5 — Attente du conseiller (en secondes)]\n120\n\n[Question 6 — Rôle de l'application Goto(s,2)]\nelle rejoue le menu",
    "takeaway": "1) La touche 5 n'est déclarée nulle part dans le contexte : c'est l'extension i (invalid) qui l'intercepte.\n2) Après le message « touche invalide », Goto(s,2) ramène l'exécution à la priorité 2 de s, qui est Background(menu-assurpharma) : le menu est rejoué.\n3) La touche 2 déclenche Queue(support) : Mme Costa entre dans la file support.\n4) Sans aucune touche pendant les 8 secondes de WaitExten(8), l'extension t aurait diffusé le message de remerciement puis raccroché.\n5) De 14:02 (pression sur 2) à 14:04 (décrochage) : 120 secondes d'attente, dans la limite des 60 secondes imparties au Queue avant le répondeur.\n6) Goto(s,2) renvoie l'exécution à la priorité 2 de l'extension s, c'est-à-dire au début du menu.\nContrôle : la touche 3 aurait joué les horaires puis, par le même Goto(s,2), ramené Mme Costa au menu : chaque branche du SVI se referme sur une issue connue."
  },
  {
    "id": "vo3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Le dimensionnement du standard de la clinique Saint-Roch",
    "exampleTitle": "Exemple résolu — le standard du garage AutoMillau",
    "goal": "Calculer un trafic en Erlangs et lire une table d'Erlang B pour dimensionner un trunk téléphonique.",
    "brief": "<p><strong>Énoncé.</strong> La clinique Saint-Roch veut souscrire un trunk SIP pour son standard. À l'heure de pointe, le standard reçoit <strong>90 appels</strong>, d'une durée moyenne de <strong>2 minutes</strong>. Le trafic s'écrit A = (nombre d'appels à l'heure × durée moyenne en secondes) / 3600. La direction exige un taux de blocage (GoS) d'au plus 1 %. Le tableau d'Erlang B pour le trafic de la pointe est le suivant :</p><table><tr><th>Canaux N</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr><tr><th>Blocage B(N, A)</th><td>11,0 %</td><td>5,2 %</td><td>2,2 %</td><td>0,8 %</td><td>0,3 %</td></tr></table><p>Rappel du cours : en régime Erlang B, tout appel qui arrive alors que les N canaux sont occupés est immédiatement rejeté, sans file d'attente.</p><ol><li>Quel est le trafic de l'heure de pointe, en Erlangs ?</li><li>Que représente exactement un trafic de 1 Erlang ?</li><li>Combien de canaux la clinique doit-elle au minimum souscrire pour respecter le GoS de 1 % ?</li><li>Si la clinique ne souscrivait que 6 canaux, quel pourcentage d'appels serait refusé à l'heure de pointe ?</li><li>Dans le modèle d'Erlang B, que devient un appel qui arrive quand tous les canaux sont occupés ?</li></ol><p>Répondez par le nombre ou la phrase brève attendus.</p>",
    "starter": "# Exercice — Le dimensionnement du standard de la clinique Saint-Roch\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre ou la phrase brève attendus.\n\n[Question 1 — Trafic de l'heure de pointe (en Erlangs)]\nA_COMPLETER\n\n[Question 2 — Signification d'un trafic de 1 Erlang]\nA_COMPLETER\n\n[Question 3 — Nombre minimal de canaux pour un GoS de 1 %]\nA_COMPLETER\n\n[Question 4 — Pourcentage d'appels refusés avec 6 canaux]\nA_COMPLETER\n\n[Question 5 — Devenir d'un appel quand tous les canaux sont occupés]\nA_COMPLETER\n",
    "hints": [
      "Convertissez tout en secondes : 90 appels de 120 secondes, divisés par 3600, donnent le trafic en Erlangs.",
      "Dans la table, cherchez la première colonne où le blocage tombe à 1 % ou moins : c'est le nombre de canaux minimal.",
      "1. A = 90 × 120 / 3600. 2. Un Erlang, c'est un canal occupé sans interruption pendant une heure. 3. Parcourez la table jusqu'à un blocage inférieur ou égal à 1 %. 4. Lisez la colonne N = 6. 5. Erlang B ne met personne en attente : l'appel excédentaire est perdu."
    ],
    "examples": [
      {
        "stdin": "Le garage AutoMillau reçoit 60 appels à l'heure de pointe, d'une durée moyenne de 2 minutes.\nTrafic : A = 60 × 120 / 3600 = 2 Erlangs. Table d'Erlang B pour A = 2 :\nN = 4 : 9,5 % — N = 5 : 3,7 % — N = 6 : 1,2 % — N = 7 : 0,34 %.\nGoS visé : 1 %.\n\n1) Trafic : 2 Erlangs.\n2) 1 Erlang : un canal occupé à 100 % pendant une heure.\n3) 6 canaux donnent 1,2 % (trop) ; il faut 7 canaux (0,34 % ≤ 1 %).\n4) Avec 5 canaux : 3,7 % des appels refusés.",
        "expected": "2 Erlangs — 7 canaux nécessaires — 1 Erlang : un canal occupé une heure — avec 5 canaux : 3,7 % de refus",
        "note": "Erlang B suppose qu'aucun appel n'attend : chaque appel refusé est perdu, d'où le choix d'un GoS très faible."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Trafic de l'heure de pointe (en Erlangs)",
        "stdin": "q:1",
        "expected": "3||3 Erlangs"
      },
      {
        "label": "Question 2 — Signification d'un trafic de 1 Erlang",
        "stdin": "q:2",
        "expected": "un canal occupé à 100 % pendant une heure||un canal occupé à 100% pendant une heure||un canal occupé en continu pendant une heure||un canal occupé sans interruption pendant une heure"
      },
      {
        "label": "Question 3 — Nombre minimal de canaux pour un GoS de 1 %",
        "stdin": "q:3",
        "expected": "8||8 canaux"
      },
      {
        "label": "Question 4 — Pourcentage d'appels refusés avec 6 canaux",
        "stdin": "q:4",
        "expected": "5,2||5.2||5,2 %||5.2%"
      },
      {
        "label": "Question 5 — Devenir d'un appel quand tous les canaux sont occupés",
        "stdin": "q:5",
        "expected": "il est rejeté||il est refusé||rejeté||il est perdu||il entend la tonalité occupé"
      }
    ],
    "solution": "[Question 1 — Trafic de l'heure de pointe (en Erlangs)]\n3\n\n[Question 2 — Signification d'un trafic de 1 Erlang]\nun canal occupé à 100 % pendant une heure\n\n[Question 3 — Nombre minimal de canaux pour un GoS de 1 %]\n8\n\n[Question 4 — Pourcentage d'appels refusés avec 6 canaux]\n5,2\n\n[Question 5 — Devenir d'un appel quand tous les canaux sont occupés]\nil est rejeté",
    "takeaway": "1) Trafic : A = 90 × 120 / 3600 = 10 800 / 3600 = 3 Erlangs.\n2) Un Erlang représente un canal téléphonique occupé à 100 % pendant une heure entière (par exemple deux canaux occupés chacun 30 minutes).\n3) Dans la table : B(7, 3) = 2,2 % (supérieur à 1 %) et B(8, 3) = 0,8 % (inférieur ou égal à 1 %) : il faut souscrire au minimum 8 canaux.\n4) Avec 6 canaux, la table donne B(6, 3) = 5,2 % : environ un appel sur vingt serait refusé à l'heure de pointe.\n5) En régime Erlang B, sans file d'attente, l'appel arrivé quand tous les canaux sont occupés est immédiatement rejeté (tonalité occupé).\nContrôle : entre 7 et 8 canaux, le blocage passe de 2,2 % à 0,8 % : le canal supplémentaire divise presque par trois le taux de refus, c'est lui qui satisfait le GoS."
  },
  {
    "id": "vo3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit QoS du lycée technique Vercors",
    "exampleTitle": "Exemple résolu — l'audit du groupe hôtelier Les Pins",
    "goal": "Vérifier le marquage QoS d'un réseau ToIP (DSCP EF, CS3, CoS, Voice VLAN) et confronter les mesures aux seuils G.114.",
    "brief": "<p><strong>Énoncé.</strong> Le lycée technique Vercors bascule sa téléphonie sur IP. Le professeur réseau relève la configuration en production :</p><table><tr><th>Flux ou équipement</th><th>Configuration observée</th></tr><tr><th>Flux voix RTP</th><td>DSCP EF, valeur décimale 46</td></tr><tr><th>Signalisation SIP</th><td>DSCP CS3, valeur décimale 24</td></tr><tr><th>Trafic web et messagerie</th><td>DSCP 0 (best effort)</td></tr><tr><th>Ports des postes IP</th><td>Voice VLAN 20, CoS 802.1p = 5</td></tr><tr><th>Mesures sur la liaison</th><td>délai unidirectionnel 40 ms, gigue 9 ms, pertes 0,1 %</td></tr></table><p>Rappels du cours : la voix supporte au plus 150 ms de délai unidirectionnel, 30 ms de gigue et 1 % de pertes (ITU-T G.114) ; le champ ToS de l'en-tête IPv4 est réinterprété par DiffServ.</p><ol><li>Quel PHB DiffServ marque le flux voix RTP ?</li><li>Quelle valeur décimale du champ DSCP correspond à EF ?</li><li>Quel marquage DiffServ protège la signalisation SIP ?</li><li>Quelle valeur de CoS 802.1p les postes voix portent-ils dans le Voice VLAN ?</li><li>Quel est le seuil de délai unidirectionnel recommandé par la G.114, en ms ?</li><li>Les mesures de la liaison respectent-elles les trois seuils de la G.114 (oui ou non) ?</li></ol><p>Répondez par le nom, le nombre ou oui/non.</p>",
    "starter": "# Exercice — L'audit QoS du lycée technique Vercors\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nom, le nombre ou oui/non.\n\n[Question 1 — PHB DiffServ du flux voix RTP]\nA_COMPLETER\n\n[Question 2 — Valeur décimale DSCP de EF]\nA_COMPLETER\n\n[Question 3 — Marquage DiffServ de la signalisation SIP]\nA_COMPLETER\n\n[Question 4 — Valeur de CoS 802.1p des postes voix]\nA_COMPLETER\n\n[Question 5 — Seuil de délai unidirectionnel G.114 (en ms)]\nA_COMPLETER\n\n[Question 6 — Les mesures respectent-elles les trois seuils]\nA_COMPLETER\n",
    "hints": [
      "Relisez le tableau : le flux RTP porte le marquage réservé à la priorité stricte, la signalisation un marquage de classe CS.",
      "Les seuils G.114 : 150 ms de délai unidirectionnel, 30 ms de gigue, 1 % de pertes.",
      "1. Le PHB de la voix est EF (Expedited Forwarding). 2. Sa valeur décimale figure dans le tableau. 3. La signalisation est marquée CS3. 4. La CoS voix vaut 5. 5. Le seuil de délai est 150 ms. 6. Comparez 40 ms, 9 ms et 0,1 % aux trois seuils."
    ],
    "examples": [
      {
        "stdin": "Le groupe hôtelier Les Pins audite son réseau ToIP.\nFlux RTP : DSCP EF 46 ; signalisation : AF31 26 ; bureautique : DSCP 0 ; Voice VLAN 60, CoS 5.\nMesures : délai unidirectionnel 190 ms, gigue 12 ms, pertes 0,2 %.\n\n1) Le PHB de la voix : EF.\n2) Valeur décimale : 46.\n3) La signalisation est marquée AF31 (26).\n4) CoS voix : 5.\n5) Seuil G.114 : 150 ms ; les 190 ms mesurés le dépassent : la voix est coupée malgré une gigue et des pertes conformes.",
        "expected": "PHB EF — 46 — AF31 pour le SIP — CoS 5 — seuil 150 ms, dépassé par les 190 ms mesurés",
        "note": "Le marquage n'accélère rien sans file de priorité : EF n'a d'effet que si le routeur applique une file prioritaire (LLQ) aux paquets marqués."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — PHB DiffServ du flux voix RTP",
        "stdin": "q:1",
        "expected": "EF||ef||expedited forwarding||le PHB EF"
      },
      {
        "label": "Question 2 — Valeur décimale DSCP de EF",
        "stdin": "q:2",
        "expected": "46||la valeur 46"
      },
      {
        "label": "Question 3 — Marquage DiffServ de la signalisation SIP",
        "stdin": "q:3",
        "expected": "CS3||cs3||le CS3||dscp cs3"
      },
      {
        "label": "Question 4 — Valeur de CoS 802.1p des postes voix",
        "stdin": "q:4",
        "expected": "5||la CoS 5"
      },
      {
        "label": "Question 5 — Seuil de délai unidirectionnel G.114 (en ms)",
        "stdin": "q:5",
        "expected": "150||150 ms"
      },
      {
        "label": "Question 6 — Les mesures respectent-elles les trois seuils",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — PHB DiffServ du flux voix RTP]\nEF\n\n[Question 2 — Valeur décimale DSCP de EF]\n46\n\n[Question 3 — Marquage DiffServ de la signalisation SIP]\nCS3\n\n[Question 4 — Valeur de CoS 802.1p des postes voix]\n5\n\n[Question 5 — Seuil de délai unidirectionnel G.114 (en ms)]\n150\n\n[Question 6 — Les mesures respectent-elles les trois seuils]\noui",
    "takeaway": "1) Le flux voix RTP porte le PHB EF (Expedited Forwarding), celui de la file de priorité stricte.\n2) EF correspond à la valeur décimale 46 du champ DSCP (soit 0xB8 dans le champ ToS d'origine).\n3) La signalisation SIP est marquée CS3 (24) — le cours admet aussi AF31 (26) selon les plateformes.\n4) Dans le Voice VLAN 20, les postes voix portent une CoS 802.1p de 5, la valeur réservée à la voix.\n5) La G.114 recommande au plus 150 ms de délai unidirectionnel.\n6) Oui : 40 ms de délai (≤ 150), 9 ms de gigue (≤ 30) et 0,1 % de pertes (≤ 1 %) : les trois seuils sont respectés.\nContrôle : le trafic web, lui, reste en best effort (DSCP 0) : sans ces marquages distincts, un transfert de fichier massif pourrait retarder les paquets voix et faire exploser la gigue."
  },
  {
    "id": "vo3-c5-e3",
    "chapter": 5,
    "title": "Observer les mappages STUN avant les vérifications ICE",
    "level": "n3",
    "language": "analyse",
    "goal": "Comparer deux mappages observés sans confondre cette observation avec une preuve de connectivité.",
    "brief": "<p>Deux serveurs STUN (RFC 8489) observent l'adresse et le port d'un même socket local. Comparez les deux couples observés : s'ils sont égaux, indiquez <code>MAPPAGES_IDENTIQUES</code>, sinon <code>MAPPAGES_DIFFERENTS</code>. Comparer ces deux observations ne permet pas de déterminer le filtrage ni de garantir qu'un pair sera joignable, même si les valeurs sont identiques à l'adresse locale.</p>\n<p>La suite est de procéder à des vérifications de connectivité ICE (RFC 8445), avec un relais TURN éventuel selon les résultats et la configuration. Cette grille n'établit ni le type exact de NAT ni le chemin choisi.</p>\n<p>Chaque ligne contient <code>CLIENT_LOCAL=&lt;adresse:port&gt; STUN1_MAPPED=&lt;adresse:port&gt; STUN2_MAPPED=&lt;adresse:port&gt;</code>. Recopiez les trois valeurs et indiquez l'observation selon ce format :</p>\n<p><code>LOCAL:&lt;local&gt; | MAPPED_S1:&lt;s1&gt; | MAPPED_S2:&lt;s2&gt; | OBSERVATION:&lt;MAPPAGES_IDENTIQUES ou MAPPAGES_DIFFERENTS&gt; | SUITE:VERIFIER_ICE</code></p>",
    "starter": "# Grille d'analyse (vo3-c5-e3) — Observer les mappages STUN avant les vérifications ICE\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : CLIENT_LOCAL=10.0.0.2:16384 STUN1_MAPPED=82.65.1.20:45000 STUN2_MAPPED=82.65.1.20:45000\n# Données : CLIENT_LOCAL=10.0.0.2:16384 STUN1_MAPPED=82.65.1.20:45000 STUN2_MAPPED=82.65.1.20:45002\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : CLIENT_LOCAL=195.154.10.2:5060 STUN1_MAPPED=195.154.10.2:5060 STUN2_MAPPED=195.154.10.2:5060\nA_COMPLETER\n",
    "hints": [
      "Comparez les deux couples adresse et port observés par les serveurs.",
      "Les observations seules ne démontrent pas que le trafic entre les pairs est autorisé.",
      "Comparez l adresse IP et le port renvoyés par les deux serveurs STUN : un port différent trahit un NAT symétrique, sans prouver l établisssement de flux média."
    ],
    "examples": [
      {
        "stdin": "CLIENT_LOCAL=192.168.1.15:5060 STUN1_MAPPED=198.51.100.42:10500 STUN2_MAPPED=198.51.100.42:10500\nCLIENT_LOCAL=192.168.1.15:5060 STUN1_MAPPED=198.51.100.42:10500 STUN2_MAPPED=198.51.100.42:10501\nCLIENT_LOCAL=203.0.113.10:5060 STUN1_MAPPED=203.0.113.10:5060 STUN2_MAPPED=203.0.113.10:5060",
        "expected": "LOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10500 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10501 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\nLOCAL:203.0.113.10:5060 | MAPPED_S1:203.0.113.10:5060 | MAPPED_S2:203.0.113.10:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "LOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45000 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45002 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "LOCAL:195.154.10.2:5060 | MAPPED_S1:195.154.10.2:5060 | MAPPED_S2:195.154.10.2:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\n"
      }
    ],
    "solution": "[Exemple]\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10500 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10501 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\nLOCAL:203.0.113.10:5060 | MAPPED_S1:203.0.113.10:5060 | MAPPED_S2:203.0.113.10:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\n\n[Cas 1 — Cas de test 1]\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45000 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45002 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\n\n[Cas 2 — Cas de test 2]\nLOCAL:195.154.10.2:5060 | MAPPED_S1:195.154.10.2:5060 | MAPPED_S2:195.154.10.2:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE",
    "takeaway": "À retenir : Comparer deux mappages observés sans confondre cette observation avec une preuve de connectivité.\nRepère : Cas d'usage nominal."
  },
  {
    "id": "vo3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "La file d'attente du support d'Informatique Plus",
    "exampleTitle": "Exemple résolu — la file comptabilité du groupe Soluris",
    "goal": "Appliquer les stratégies de distribution ACD d'Asterisk (leastrecent, ringall, roundrobin) à un appel entrant.",
    "brief": "<p><strong>Énoncé.</strong> La société de services Informatique Plus reçoit ses appels de support dans une file d'attente ACD configurée ainsi dans /etc/asterisk/queues.conf :</p><pre>[support]\nstrategy=leastrecent\ntimeout=15\nretry=2\nwrapuptime=10\nmaxlen=20\nmember => SIP/301\nmember => SIP/302\nmember => SIP/303\nmember => SIP/304</pre><p>Le supervisor relève l'heure de fin du dernier appel traité par chaque agent :</p><table><tr><th>Agent</th><th>301</th><th>302</th><th>303</th><th>304</th></tr><tr><th>Dernier appel terminé</th><td>09:00</td><td>09:20</td><td>09:40</td><td>09:10</td></tr></table><p>À <strong>09:50</strong>, un client appelle : les quatre agents sont disponibles.</p><ol><li>Quelle stratégie de distribution la file utilise-t-elle ?</li><li>Quel agent reçoit l'appel de 09:50 ?</li><li>Quelle stratégie ferait sonner les quatre postes en même temps ?</li><li>Quelle stratégie distribue les appels à tour de rôle, dans l'ordre des membres déclarés ?</li><li>Dans quel fichier cette file d'attente est-elle déclarée ?</li></ol><p>Répondez de façon courte (le nom d'une stratégie, un numéro de poste, un nom de fichier).</p>",
    "starter": "# Exercice — La file d'attente du support d'Informatique Plus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez de façon courte : une stratégie, un numéro de poste, un fichier.\n\n[Question 1 — Stratégie de distribution configurée]\nA_COMPLETER\n\n[Question 2 — Agent qui reçoit l'appel de 09:50]\nA_COMPLETER\n\n[Question 3 — Stratégie qui fait sonner tous les postes]\nA_COMPLETER\n\n[Question 4 — Stratégie de distribution à tour de rôle]\nA_COMPLETER\n\n[Question 5 — Fichier de déclaration de la file]\nA_COMPLETER\n",
    "hints": [
      "Relisez la directive strategy de la configuration : c'est elle qui fixe la règle de distribution.",
      "La stratégie configurée favorise l'agent dont le dernier appel terminé remonte au plus longtemps.",
      "1. Lisez la ligne strategy=. 2. Comparez les heures de fin d'appel : 09:00 est la plus ancienne. 3. La sonnerie générale s'appelle ringall. 4. Le tour de rôle séquentiel s'appelle roundrobin. 5. Les files vivent dans queues.conf."
    ],
    "examples": [
      {
        "stdin": "La file comptabilité du groupe Soluris : [compta] strategy=leastrecent,\nmembres 501, 502, 503. Derniers appels terminés : 501 à 10:00, 502 à 10:15, 503 à 10:30.\nUn appel arrive à 10:45, tous disponibles.\n\n1) Stratégie : leastrecent.\n2) L'agent 501 reçoit l'appel : son dernier appel (10:00) remonte au plus longtemps.\n3) Pour tout faire sonner : ringall.\n4) Pour le tour de rôle : roundrobin.\n5) Fichier : queues.conf.",
        "expected": "leastrecent — agent 501 — ringall pour tout sonner — roundrobin pour le tour de rôle — queues.conf",
        "note": "leastrecent équilibre la charge : l'agent qui n'a pas été sollicité depuis le plus longtemps est servi en premier."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Stratégie de distribution configurée",
        "stdin": "q:1",
        "expected": "leastrecent||la stratégie leastrecent"
      },
      {
        "label": "Question 2 — Agent qui reçoit l'appel de 09:50",
        "stdin": "q:2",
        "expected": "301||l'agent 301||agent 301||SIP/301"
      },
      {
        "label": "Question 3 — Stratégie qui fait sonner tous les postes",
        "stdin": "q:3",
        "expected": "ringall||la stratégie ringall"
      },
      {
        "label": "Question 4 — Stratégie de distribution à tour de rôle",
        "stdin": "q:4",
        "expected": "roundrobin||la stratégie roundrobin"
      },
      {
        "label": "Question 5 — Fichier de déclaration de la file",
        "stdin": "q:5",
        "expected": "queues.conf||le fichier queues.conf"
      }
    ],
    "solution": "[Question 1 — Stratégie de distribution configurée]\nleastrecent\n\n[Question 2 — Agent qui reçoit l'appel de 09:50]\n301\n\n[Question 3 — Stratégie qui fait sonner tous les postes]\nringall\n\n[Question 4 — Stratégie de distribution à tour de rôle]\nroundrobin\n\n[Question 5 — Fichier de déclaration de la file]\nqueues.conf",
    "takeaway": "1) La directive strategy=leastrecent fixe la distribution : l'appel part vers l'agent disponible dont le dernier appel terminé remonte au plus longtemps.\n2) À 09:50, l'agent 301 a terminé son dernier appel à 09:00, la période de repos la plus ancienne : c'est lui qui reçoit l'appel (301 est d'ailleurs le premier membre déclaré, mais c'est bien l'ancienneté qui décide).\n3) ringall fait sonner simultanément tous les postes des agents disponibles, le premier décroché gagne l'appel.\n4) roundrobin distribue les appels à tour de rôle dans l'ordre des membres déclarés.\n5) La file est déclarée dans /etc/asterisk/queues.conf.\nContrôle : l'ordre d'ancienneté à 09:50 est 301 (09:00), 304 (09:10), 302 (09:20), 303 (09:40) : le prochain appel échoirait à l'agent 304, la charge reste équitable."
  },
  {
    "id": "vo3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le choix du trunk SIP pour le traiteur Delicealim",
    "exampleTitle": "Exemple résolu — la ligne du cabinet d'avocats Lorelle & Fils",
    "goal": "Comparer le coût mensuel chiffré d'un trunk SIP et de lignes analogiques, puis citer le routage au moindre coût.",
    "brief": "<p><strong>Énoncé.</strong> Delicealim, traiteur industriel à Rennes, consomme <strong>6 000 minutes par mois</strong> d'appels vers les fixes. L'opérateur propose deux offres :</p><table><tr><th></th><th>Offre A : trunk SIP</th><th>Offre B : deux lignes analogiques</th></tr><tr><th>Abonnement mensuel</th><td>45 € (4 canaux simultanés inclus)</td><td>24 € par ligne, soit 2 × 24 €</td></tr><tr><th>Tarif vers les fixes</th><td>0,009 € par minute</td><td>0,014 € par minute</td></tr></table><p>Le coût mensuel total = abonnement(s) + (minutes × tarif par minute). Delicealim arbitre aussi sur le principe du LCR vu en cours : l'IPBX analyse le préfixe du numéro composé pour choisir l'opérateur le moins cher.</p><ol><li>Quel est le coût mensuel total de l'offre A (trunk SIP), en euros ?</li><li>Quel est le coût mensuel total de l'offre B (lignes analogiques), en euros ?</li><li>Quelle économie mensuelle, en euros, Delicealim réalise-t-elle en choisissant l'offre A ?</li><li>Cette économie représente quel pourcentage du coût de l'offre B ?</li><li>Quel mécanisme de l'IPBX choisit automatiquement l'opérateur le moins cher selon le préfixe composé ?</li></ol><p>Répondez par le nombre ou le libellé attendus.</p>",
    "starter": "# Exercice — Le choix du trunk SIP pour le traiteur Delicealim\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Question 5 : le libellé du mécanisme.\n\n[Question 1 — Coût mensuel de l'offre A (en euros)]\nA_COMPLETER\n\n[Question 2 — Coût mensuel de l'offre B (en euros)]\nA_COMPLETER\n\n[Question 3 — Économie mensuelle en choisissant l'offre A (en euros)]\nA_COMPLETER\n\n[Question 4 — Économie en pourcentage du coût de l'offre B]\nA_COMPLETER\n\n[Question 5 — Mécanisme de choix automatique de l'opérateur]\nA_COMPLETER\n",
    "hints": [
      "Le coût mensuel total additionne l'abonnement et la consommation : minutes × tarif à la minute.",
      "Pour l'offre B, n'oubliez pas les deux abonnements de ligne avant d'ajouter la consommation.",
      "1. Offre A : 45 + 6 000 × 0,009. 2. Offre B : 2 × 24 + 6 000 × 0,014. 3. Économie = coût B − coût A. 4. Économie / coût B × 100. 5. Le sigle du routage au moindre coût est LCR."
    ],
    "examples": [
      {
        "stdin": "Le cabinet d'avocats Lorelle & Fils consomme 4 000 minutes par mois vers les fixes.\nTrunk SIP : 60 € d'abonnement + 0,008 €/min. Offre RNIS : 30 € d'abonnement + 0,012 €/min.\n\n1) Trunk SIP : 60 + 4 000 × 0,008 = 60 + 32 = 92 €.\n2) RNIS : 30 + 4 000 × 0,012 = 30 + 48 = 78 €.\n3) Ici le RNIS est moins cher : économie de 92 − 78 = 14 € par mois.\n4) En pourcentage du trunk : 14 / 92 ≈ 15 %.\n5) Le LCR choisit l'opérateur selon le préfixe composé.",
        "expected": "trunk 92 € — RNIS 78 € — économie 14 € pour le RNIS — environ 15 % — LCR selon le préfixe",
        "note": "Le trunk SIP n'est pas toujours gagnant : tout dépend du volume de minutes et du prix de l'abonnement, d'où l'intérêt du calcul complet."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Coût mensuel de l'offre A (en euros)",
        "stdin": "q:1",
        "expected": "99||99 €||99 euros"
      },
      {
        "label": "Question 2 — Coût mensuel de l'offre B (en euros)",
        "stdin": "q:2",
        "expected": "132||132 €||132 euros"
      },
      {
        "label": "Question 3 — Économie mensuelle en choisissant l'offre A (en euros)",
        "stdin": "q:3",
        "expected": "33||33 €||33 euros"
      },
      {
        "label": "Question 4 — Économie en pourcentage du coût de l'offre B",
        "stdin": "q:4",
        "expected": "25||25 %||25%"
      },
      {
        "label": "Question 5 — Mécanisme de choix automatique de l'opérateur",
        "stdin": "q:5",
        "expected": "LCR||le LCR||least cost routing||routage au moindre coût||le routage au moindre coût"
      }
    ],
    "solution": "[Question 1 — Coût mensuel de l'offre A (en euros)]\n99\n\n[Question 2 — Coût mensuel de l'offre B (en euros)]\n132\n\n[Question 3 — Économie mensuelle en choisissant l'offre A (en euros)]\n33\n\n[Question 4 — Économie en pourcentage du coût de l'offre B]\n25\n\n[Question 5 — Mécanisme de choix automatique de l'opérateur]\nLCR",
    "takeaway": "1) Offre A : 6 000 × 0,009 = 54 € de consommation + 45 € d'abonnement = 99 € par mois.\n2) Offre B : 2 × 24 = 48 € d'abonnements + 6 000 × 0,014 = 84 € de consommation = 132 € par mois.\n3) Économie mensuelle : 132 − 99 = 33 €.\n4) Économie relative : 33 / 132 × 100 = 25 % du coût de l'offre B.\n5) C'est le routage au moindre coût (LCR, Least Cost Routing) : l'IPBX analyse le préfixe du numéro composé et sélectionne l'opérateur au tarif optimal.\nContrôle : l'écart de consommation seule vaut 6 000 × (0,014 − 0,009) = 30 € ; l'abonnement du trunk, moins cher que les deux lignes (45 € contre 48 €), ajoute 3 € d'économie : 30 + 3 = 33 €."
  },
  {
    "id": "vo3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "L'attaque brute-force sur l'IPBX de Delicealim",
    "exampleTitle": "Exemple résolu — le scan de l'IPBX du musée du Bord de Mer",
    "goal": "Analyser un journal d'authentification Asterisk, comprendre le déclenchement de fail2ban et connaître TLS et SRTP.",
    "brief": "<p><strong>Énoncé.</strong> Le serveur Asterisk du traiteur Delicealim est exposé sur Internet. Un matin, le journal /var/log/asterisk/messages contient :</p><pre>NOTICE[3124] chan_sip.c: Registration from 'sip:201@ipbx.delicealim.fr' failed for '203.0.113.66' - Wrong password\nNOTICE[3125] chan_sip.c: Registration from 'sip:202@ipbx.delicealim.fr' failed for '203.0.113.66' - Wrong password\nNOTICE[3126] chan_sip.c: Registration from 'sip:203@ipbx.delicealim.fr' failed for '203.0.113.66' - Wrong password\nNOTICE[3127] chan_sip.c: Registration from 'sip:admin@ipbx.delicealim.fr' failed for '203.0.113.66' - Wrong password</pre><p>Le service fail2ban surveille ce journal avec les paramètres <strong>maxretry = 3</strong> et <strong>bantime = 3600 s</strong> : dès qu'une adresse IP cumule le seuil d'échecs, une règle pare-feu iptables bloque le port SIP pour cette adresse.</p><ol><li>Quelle adresse IP mène l'attaque ?</li><li>Combien d'échecs d'enregistrement cette adresse a-t-elle cumulés dans le journal ?</li><li>Au bout de combien d'échecs fail2ban déclenche-t-il le blocage (maxretry) ?</li><li>Comment nomme-t-on ce type d'attaque qui essaie les identifiants un à un ?</li><li>Quel port UDP, cible par défaut de ces requêtes SIP, fail2ban doit-il filtrer ?</li><li>Quel protocole du cours chiffre le flux audio RTP ?</li></ol><p>Répondez par l'adresse, le nombre ou le mot attendus.</p>",
    "starter": "# Exercice — L'attaque brute-force sur l'IPBX de Delicealim\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par l'adresse, le nombre ou le mot attendus.\n\n[Question 1 — Adresse IP de l'attaquant]\nA_COMPLETER\n\n[Question 2 — Nombre d'échecs cumulés dans le journal]\nA_COMPLETER\n\n[Question 3 — Seuil d'échecs déclenchant le blocage]\nA_COMPLETER\n\n[Question 4 — Nom du type d'attaque]\nA_COMPLETER\n\n[Question 5 — Port UDP ciblé par les requêtes SIP]\nA_COMPLETER\n\n[Question 6 — Protocole qui chiffre le flux audio RTP]\nA_COMPLETER\n",
    "hints": [
      "Le champ « failed for » du journal donne l'adresse source de chaque tentative.",
      "Comparez le nombre d'échecs cumulés au paramètre maxretry : le blocage part du seuil, pas du total du journal.",
      "1. L'adresse revient sur les quatre lignes. 2. Comptez les lignes NOTICE. 3. maxretry = 3. 4. Essayer mot après mot s'appelle une attaque par force brute. 5. Le SIP écoute par défaut sur 5060/UDP. 6. Le chiffrement du média passe par SRTP."
    ],
    "examples": [
      {
        "stdin": "Le musée du Bord de Mer détecte sur son IPBX cinq échecs consécutifs depuis 198.51.100.7\n(extensions 300, 301, 302, 303 et 304 tentées). fail2ban : maxretry = 4, bantime = 1800 s.\n\n1) Adresse attaquante : 198.51.100.7.\n2) 5 échecs cumulés.\n3) Blocage au 4e échec (maxretry = 4).\n4) Attaque par force brute.\n5) Port ciblé : 5060/UDP.\n6) Le média se chiffre avec SRTP.",
        "expected": "IP 198.51.100.7 — 5 échecs — bannissement au 4e échec — force brute — port 5060 — SRTP",
        "note": "Les adresses 203.0.113.0/24 et 198.51.100.0/24 sont réservées à la documentation (RFC 5737) : aucun vrai réseau n'est visé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Adresse IP de l'attaquant",
        "stdin": "q:1",
        "expected": "203.0.113.66||l'adresse 203.0.113.66"
      },
      {
        "label": "Question 2 — Nombre d'échecs cumulés dans le journal",
        "stdin": "q:2",
        "expected": "4||quatre"
      },
      {
        "label": "Question 3 — Seuil d'échecs déclenchant le blocage",
        "stdin": "q:3",
        "expected": "3||au bout de 3||3 échecs||trois"
      },
      {
        "label": "Question 4 — Nom du type d'attaque",
        "stdin": "q:4",
        "expected": "brute-force||brute force||force brute||attaque par force brute||l'attaque par force brute"
      },
      {
        "label": "Question 5 — Port UDP ciblé par les requêtes SIP",
        "stdin": "q:5",
        "expected": "5060||le port 5060||5060/UDP"
      },
      {
        "label": "Question 6 — Protocole qui chiffre le flux audio RTP",
        "stdin": "q:6",
        "expected": "SRTP||srtp||le protocole SRTP"
      }
    ],
    "solution": "[Question 1 — Adresse IP de l'attaquant]\n203.0.113.66\n\n[Question 2 — Nombre d'échecs cumulés dans le journal]\n4\n\n[Question 3 — Seuil d'échecs déclenchant le blocage]\n3\n\n[Question 4 — Nom du type d'attaque]\nbrute-force\n\n[Question 5 — Port UDP ciblé par les requêtes SIP]\n5060\n\n[Question 6 — Protocole qui chiffre le flux audio RTP]\nSRTP",
    "takeaway": "1) L'adresse 203.0.113.66 apparaît comme source des quatre tentatives : c'est elle qui mène l'attaque.\n2) Le journal cumule 4 échecs d'enregistrement (201, 202, 203, puis le compte admin).\n3) maxretry = 3 : le blocage iptables est déclenché au troisième échec, le quatrième n'arrive même pas à l'IPBX.\n4) C'est une attaque par force brute (brute-force) : les mots de passe sont essayés un à un.\n5) Les requêtes SIP ciblent par défaut le port 5060/UDP : c'est ce port que fail2ban filtre.\n6) Le flux audio RTP se chiffre avec SRTP (RFC 3711, AES) ; côté signalisation, SIP TLS (port 5061/TCP) protège les identifiants.\nContrôle : bantime = 3600 s signifie que l'adresse 203.0.113.66 reste bloquée une heure complète : le temps de réagir et d'en informer l'opérateur."
  }
];
