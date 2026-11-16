'use strict';

module.exports = [
  {
    "id": "lan3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le marquage CoS et DSCP de la voix sur le réseau d'Helvétia",
    "exampleTitle": "Exemple résolu — le marquage du campus de Rivalta",
    "goal": "Mettre en correspondance les marquages de niveau 2 (CoS 802.1p) et de niveau 3 (DSCP) du plan de QoS d'une entreprise.",
    "brief": "<p><strong>Énoncé.</strong> Helvétia, assurance de 500 collaborateurs, déploie la téléphonie sur IP sur son réseau unique. Le plan de QoS marque les flux au niveau 2 par la valeur CoS (champ de 3 bits de l'en-tête 802.1Q) et au niveau 3 par le DSCP (6 bits du champ ToS de l'en-tête IP). Le plan de classification validé par la DSI est :</p><table><tr><th>Flux</th><th>CoS 802.1p</th><th>DSCP cible</th></tr><tr><th>Voix (RTP)</th><td>5</td><td>EF (46)</td></tr><tr><th>Signalisation d'appel</th><td>3</td><td>AF31 (26)</td></tr><tr><th>Visioconférence</th><td>4</td><td>AF41 (34)</td></tr><tr><th>Données métier</th><td>2</td><td>AF21 (18)</td></tr><tr><th>Navigation web</th><td>0</td><td>0</td></tr></table><p>Rappels du cours : la valeur CoS voyage dans le tag 802.1Q de la trame ; le DSCP est codé dans l'en-tête IP. Les classes CS valent 8 × n (CS0 = 0, CS1 = 8, etc.), la classe EF vaut 46, et une classe AFxy vaut 8 × x + 2 × y.</p><p>Répondez par le nom et la valeur, ou le nombre seul.</p><ol><li>Dans quel élément de la trame Ethernet la valeur CoS est-elle transportée ?</li><li>Quel DSCP (nom et valeur) correspond au flux voix ?</li><li>Quelle est la valeur numérique du DSCP AF41 ?</li><li>La signalisation d'appel est marquée AF31 : quelle est sa valeur numérique ?</li><li>Quel DSCP (valeur numérique) reçoit le trafic best effort (CoS 0) ?</li></ol>",
    "starter": "# Exercice — Le marquage CoS et DSCP de la voix sur le réseau d'Helvétia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : un court libellé. Question 2 : le nom du DSCP et sa valeur.\n# Questions 3 à 5 : le nombre seul.\n\n[Question 1 — Transport de la valeur CoS dans la trame]\nA_COMPLETER\n\n[Question 2 — DSCP du flux voix]\nA_COMPLETER\n\n[Question 3 — Valeur numérique du DSCP AF41]\nA_COMPLETER\n\n[Question 4 — Valeur numérique du DSCP AF31]\nA_COMPLETER\n\n[Question 5 — DSCP du trafic best effort]\nA_COMPLETER\n",
    "hints": [
      "La CoS est un marquage de niveau 2 : elle vit dans la trame, pas dans le paquet IP.",
      "Une classe AFxy se calcule : 8 × x + 2 × y ; par exemple AF41 = 8 × 4 + 2 × 1.",
      "1. Le champ de 3 bits se trouve dans le tag ajouté aux trames VLAN. 2. La voix utilise la classe réservée EF. 3. AF41 : appliquez la formule. 4. AF31 : même formule. 5. Le trafic sans exigence reçoit la valeur nulle."
    ],
    "examples": [
      {
        "stdin": "Le campus de Rivalta applique le marquage suivant.\nVisioconférence : CoS 4 → AF41 = 8 × 4 + 2 × 1 = 34.\nDonnées de gestion : CoS 1 → AF11 = 8 × 1 + 2 × 1 = 10.\nSignalisation : CoS 3 → AF31 = 8 × 3 + 2 × 1 = 26.\nVoix : CoS 5 → EF = 46.\n\n1) AF41 vaut 34, AF11 vaut 10.\n2) La CoS voyage dans le tag 802.1Q de la trame.\n3) Le best effort (CoS 0) reçoit le DSCP 0 (CS0).",
        "expected": "AF41 : 34 — AF11 : 10 — CoS portée par le tag 802.1Q — best effort : DSCP 0",
        "note": "Un flux conserve son marquage de bout en bout : la CoS sert au niveau 2 (commutation), le DSCP au niveau 3 (routage)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Transport de la valeur CoS dans la trame",
        "stdin": "q:1",
        "expected": "le tag 802.1Q||l'en-tête 802.1Q||l'entete 802.1Q||le champ CoS du tag 802.1Q||dans le tag 802.1Q||802.1Q"
      },
      {
        "label": "Question 2 — DSCP du flux voix",
        "stdin": "q:2",
        "expected": "EF (46)||EF||46||EF 46||Expedited Forwarding"
      },
      {
        "label": "Question 3 — Valeur numérique du DSCP AF41",
        "stdin": "q:3",
        "expected": "34"
      },
      {
        "label": "Question 4 — Valeur numérique du DSCP AF31",
        "stdin": "q:4",
        "expected": "26"
      },
      {
        "label": "Question 5 — DSCP du trafic best effort",
        "stdin": "q:5",
        "expected": "0||CS0||0 (CS0)||BE"
      }
    ],
    "solution": "[Question 1 — Transport de la valeur CoS dans la trame]\nle tag 802.1Q\n\n[Question 2 — DSCP du flux voix]\nEF (46)\n\n[Question 3 — Valeur numérique du DSCP AF41]\n34\n\n[Question 4 — Valeur numérique du DSCP AF31]\n26\n\n[Question 5 — DSCP du trafic best effort]\n0",
    "takeaway": "1) La valeur CoS (3 bits) est transportée dans le tag 802.1Q ajouté à la trame Ethernet sur les liens VLAN.\n2) Le flux voix est marqué EF (Expedited Forwarding), valeur DSCP 46.\n3) AF41 = 8 × 4 + 2 × 1 = 34.\n4) AF31 = 8 × 3 + 2 × 1 = 26.\n5) Le trafic best effort (CoS 0) reçoit le DSCP 0 (CS0).\nContrôle : les valeurs AF suivent toutes la formule 8x + 2y (34, 26, 18) ; la voix sort du schéma AF avec EF = 46."
  },
  {
    "id": "lan3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "L'ordonnancement des files du commutateur d'étage de Norpareil",
    "exampleTitle": "Exemple résolu — l'ordonnancement du stade d'Aquarum",
    "goal": "Comparer les ordonnanceurs de files (priorité stricte, round robin pondéré) et calculer les parts de débit et le risque d'affamement.",
    "brief": "<p><strong>Énoncé.</strong> Norpareil, logisticien de 700 salariés, fait transiter voix et données par le même commutateur d'étage SW-ET7. Sa sortie vers le cœur de réseau est gérée par quatre files d'attente :</p><table><tr><th>File</th><th>Flux transportés</th><th>Ordonnanceur</th><th>Poids</th></tr><tr><th>File 4</th><td>Voix (DSCP EF)</td><td>priorité stricte</td><td>—</td></tr><tr><th>File 1</th><td>Données métier</td><td>WRR</td><td>5</td></tr><tr><th>File 2</th><td>Flux transactionnels</td><td>WRR</td><td>3</td></tr><tr><th>File 3</th><td>Navigation web</td><td>WRR</td><td>2</td></tr></table><p>Rappel du cours : la priorité stricte sert la file prioritaire dès qu'elle contient des paquets, avant toutes les autres ; le round robin pondéré (WRR) sert à tour de rôle chaque file, un cycle complet servant la somme des poids. La part de débit d'une file WRR vaut son poids divisé par la somme des poids actifs.</p><p>Répondez par un court libellé (questions 1 et 5) ou le nombre seul (questions 2 à 4, parts en pourcentage).</p><ol><li>Quel type d'ordonnanceur sert la file 4 ?</li><li>Lors d'un cycle WRR complet, combien de paquets sont servis au total sur les files 1 à 3 ?</li><li>Quelle part du débit disponible (en %) la file 1 reçoit-elle ?</li><li>Quelle part du débit (en %) la file 3 reçoit-elle ?</li><li>Quel risque court le trafic des files 1 à 3 si le flux voix sature la liaison ?</li></ol>",
    "starter": "# Exercice — L'ordonnancement des files du commutateur d'étage de Norpareil\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 5 : un court libellé. Questions 2 à 4 : le nombre seul.\n\n[Question 1 — Ordonnanceur de la file 4]\nA_COMPLETER\n\n[Question 2 — Paquets servis par cycle WRR complet]\nA_COMPLETER\n\n[Question 3 — Part de débit de la file 1 (en %)]\nA_COMPLETER\n\n[Question 4 — Part de débit de la file 3 (en %)]\nA_COMPLETER\n\n[Question 5 — Risque pour les files 1 à 3 si la voix sature le lien]\nA_COMPLETER\n",
    "hints": [
      "Deux mécanismes cohabitent : un service immédiat pour la voix, un partage pondéré pour le reste.",
      "Un cycle WRR sert 5 paquets de la file 1, 3 de la file 2 et 2 de la file 3 : comptez le total.",
      "1. La voix est servie avant tout le monde. 2. Additionnez les poids. 3. 5 sur le total des poids. 4. 2 sur le total des poids. 5. Si une file prioritaire ne vide jamais, que restent-ils aux autres ?"
    ],
    "examples": [
      {
        "stdin": "Le stade d'Aquarum gère sa sortie réseau par quatre files.\nFile 4 (billetterie temps réel) : priorité stricte.\nFiles 1 à 3 (WRR) : poids 4, 4 et 2.\n\n1) La file 4 est servie par priorité stricte.\n2) Un cycle WRR complet sert 4 + 4 + 2 = 10 paquets.\n3) Parts : file 1 = 40 %, file 2 = 40 %, file 3 = 20 %.\n4) Si la billetterie sature la liaison, les files WRR s'affament.",
        "expected": "priorité stricte — cycle : 10 paquets — parts : 40 / 40 / 20 % — risque : affamement",
        "note": "Le WRR garantit une part minimale à chaque file, contrairement à la priorité stricte qui peut affamer les autres."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ordonnanceur de la file 4",
        "stdin": "q:1",
        "expected": "priorité stricte||priorite stricte||strict priority||la priorité stricte||SP"
      },
      {
        "label": "Question 2 — Paquets servis par cycle WRR complet",
        "stdin": "q:2",
        "expected": "10"
      },
      {
        "label": "Question 3 — Part de débit de la file 1 (en %)",
        "stdin": "q:3",
        "expected": "50||50 %||50%"
      },
      {
        "label": "Question 4 — Part de débit de la file 3 (en %)",
        "stdin": "q:4",
        "expected": "20||20 %||20%"
      },
      {
        "label": "Question 5 — Risque pour les files 1 à 3 si la voix sature le lien",
        "stdin": "q:5",
        "expected": "l'affamement||affamement||la famine||starvation||l'affamement des autres files"
      }
    ],
    "solution": "[Question 1 — Ordonnanceur de la file 4]\npriorité stricte\n\n[Question 2 — Paquets servis par cycle WRR complet]\n10\n\n[Question 3 — Part de débit de la file 1 (en %)]\n50\n\n[Question 4 — Part de débit de la file 3 (en %)]\n20\n\n[Question 5 — Risque pour les files 1 à 3 si la voix sature le lien]\nl'affamement",
    "takeaway": "1) La file 4 (voix) est servie par priorité stricte : elle passe avant toutes les autres dès qu'elle contient des paquets.\n2) Un cycle WRR complet sert 5 + 3 + 2 = 10 paquets.\n3) Part de la file 1 : 5/10 = 50 % du débit alloué aux files WRR.\n4) Part de la file 3 : 2/10 = 20 %.\n5) Si le flux voix sature la liaison, les files 1 à 3 risquent l'affamement (starvation) : la priorité stricte ne leur laisse aucun créneau garanti.\nContrôle : 50 % + 30 % + 20 % = 100 % du débit restant après service de la voix."
  },
  {
    "id": "lan3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La cartographie LLDP du plateau technique de Datagora",
    "exampleTitle": "Exemple résolu — l'inventaire LLDP de l'hôpital de Sanzel",
    "goal": "Exploiter les informations publiées par LLDP (norme 802.1AB, TLV système, port, capacités, adresse de gestion) pour documenter un réseau réel.",
    "brief": "<p><strong>Énoncé.</strong> Datagora héberge un plateau technique mutualisé entre plusieurs clients. Le technicien d'exploitation collecte la table des voisins LLDP du commutateur SW-TECH, qui annonce ses trames toutes les 30 secondes et conserve une entrée quatre fois plus longtemps. La table affiche :</p><table><tr><th>Port local</th><th>Voisin annoncé</th><th>Port distant</th><th>Capacités annoncées</th><th>Adresse de gestion</th></tr><tr><th>Gi1/0/1</th><td>SW-COEUR</td><td>Te0/1</td><td>bridge</td><td>10.0.0.11</td></tr><tr><th>Gi1/0/2</th><td>SW-ACC4</td><td>Gi0/24</td><td>bridge</td><td>10.0.0.14</td></tr><tr><th>Gi1/0/13</th><td>R-BAORD</td><td>Gi0/2</td><td>router</td><td>10.0.0.21</td></tr></table><p>Rappel du cours : LLDP (norme IEEE 802.1AB) publie des informations sous forme de TLV : nom du système, description du port, capacités (bridge, router, etc.) et adresse de gestion. La table des voisins documente le raccordement exact (« qui est branché sur quel port ») sans transporter aucun trafic utilisateur ; une entrée est purgée si aucune trame n'est reçue pendant le temps de conservation.</p><p>Répondez par la norme, le nombre seul, le nom du port ou l'adresse IP.</p><ol><li>Quelle norme IEEE décrit LLDP ?</li><li>Combien de voisins LLDP SW-TECH a-t-il découverts ?</li><li>Par quel port local SW-TECH est-il raccordé au routeur R-BAORD ?</li><li>Quelle adresse de gestion le voisin SW-COEUR annonce-t-il ?</li><li>Après combien de secondes, sans nouvelle trame, une entrée de voisin est-elle purgée (intervalle 30 s, multiplicateur 4) ?</li></ol>",
    "starter": "# Exercice — La cartographie LLDP du plateau technique de Datagora\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 et 4 : la norme, le port ou l'adresse. Questions 2 et 5 : le nombre seul.\n\n[Question 1 — Norme IEEE décrivant LLDP]\nA_COMPLETER\n\n[Question 2 — Nombre de voisins découverts]\nA_COMPLETER\n\n[Question 3 — Port local raccordé à R-BAORD]\nA_COMPLETER\n\n[Question 4 — Adresse de gestion annoncée par SW-COEUR]\nA_COMPLETER\n\n[Question 5 — Temps de purge d'une entrée (en secondes)]\nA_COMPLETER\n",
    "hints": [
      "LLDP est normalisé par l'IEEE sous un numéro de norme dédié, souvent confondu avec 802.1Q.",
      "Chaque ligne de la table correspond à un voisin découvert sur un port local précis.",
      "1. La norme porte la référence 802.1AB. 2. Comptez les lignes. 3. Cherchez la ligne du routeur. 4. La TLV de gestion porte une IP. 5. Temps de conservation = intervalle × multiplicateur."
    ],
    "examples": [
      {
        "stdin": "L'hôpital de Sanzel collecte la table LLDP de SW-BLOC-B.\nGi0/1 : voisin SW-NET-CORE, port distant Gi1/0/9, bridge, gestion 10.5.0.9.\nGi0/2 : voisin SW-ONCO, port distant Gi0/49, bridge, gestion 10.5.0.30.\nGi0/24 : voisin R-PACS (routeur), port distant Gi0/1, router, gestion 10.5.0.50.\n\n1) Trois voisins découverts.\n2) Le voisin raccordé sur Gi0/24 est R-PACS.\n3) SW-NET-CORE annonce la gestion 10.5.0.9.\n4) Hold time = 30 × 4 = 120 s.",
        "expected": "3 voisins — R-PACS sur Gi0/24 — gestion de SW-NET-CORE : 10.5.0.9 — hold time 120 s",
        "note": "LLDP se contente de publier l'identité et le point de raccordement des voisins : il ne route et ne commute aucun trafic utilisateur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Norme IEEE décrivant LLDP",
        "stdin": "q:1",
        "expected": "802.1AB||IEEE 802.1AB||la norme 802.1AB"
      },
      {
        "label": "Question 2 — Nombre de voisins découverts",
        "stdin": "q:2",
        "expected": "3"
      },
      {
        "label": "Question 3 — Port local raccordé à R-BAORD",
        "stdin": "q:3",
        "expected": "Gi1/0/13||gi1/0/13||le port Gi1/0/13"
      },
      {
        "label": "Question 4 — Adresse de gestion annoncée par SW-COEUR",
        "stdin": "q:4",
        "expected": "10.0.0.11"
      },
      {
        "label": "Question 5 — Temps de purge d'une entrée (en secondes)",
        "stdin": "q:5",
        "expected": "120||120 s||120 secondes"
      }
    ],
    "solution": "[Question 1 — Norme IEEE décrivant LLDP]\n802.1AB\n\n[Question 2 — Nombre de voisins découverts]\n3\n\n[Question 3 — Port local raccordé à R-BAORD]\nGi1/0/13\n\n[Question 4 — Adresse de gestion annoncée par SW-COEUR]\n10.0.0.11\n\n[Question 5 — Temps de purge d'une entrée (en secondes)]\n120",
    "takeaway": "1) LLDP est décrit par la norme IEEE 802.1AB.\n2) La table liste trois voisins : SW-COEUR, SW-ACC4 et R-BAORD.\n3) Le routeur R-BAORD est raccordé au port local Gi1/0/13 (port distant Gi0/2).\n4) SW-COEUR annonce l'adresse de gestion 10.0.0.11 dans sa TLV dédiée.\n5) Temps de conservation = intervalle × multiplicateur = 30 × 4 = 120 secondes sans nouvelle trame avant purge.\nContrôle : trois lignes, trois voisins distincts ; les adresses de gestion annoncées (10.0.0.11, 10.0.0.14, 10.0.0.21) sont toutes joignables pour l'exploitation."
  }
];
