'use strict';

module.exports = [
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
  }
];
