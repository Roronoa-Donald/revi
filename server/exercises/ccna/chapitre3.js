'use strict';

module.exports = [
  {
    "id": "na2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "La table CAM du commutateur de la mairie de Bonneval",
    "exampleTitle": "Exemple résolu — la table CAM de la médiathèque de Portval",
    "goal": "Décrire l'apprentissage CAM et les décisions de commutation : inondation, commutation directe, diffusion.",
    "brief": "<p><strong>Énoncé.</strong> La mairie de Bonneval, 8 000 habitants, regroupe ses serveurs et ses postes derrière un commutateur Cisco Catalyst 2960 redémarré cette nuit : la table CAM est donc vide à l'ouverture, 8 h 00. Le câblage du bâtiment est le suivant :</p><table><tr><th>Port</th><th>Équipement raccordé</th><th>MAC</th></tr><tr><th>Fa0/1</th><td>PC du secrétariat général</td><td>00:1a:2b:3c:44:01</td></tr><tr><th>Fa0/2</th><td>Serveur de délibérations</td><td>00:1a:2b:3c:44:02</td></tr><tr><th>Fa0/3</th><td>Portable de réunion</td><td>00:1a:2b:3c:44:03</td></tr><tr><th>Fa0/4</th><td>Imprimante réseau</td><td>00:1a:2b:3c:44:04</td></tr></table><p>Entre 8 h 01 et 8 h 04, l'administrateur observe les quatre trames suivantes entrant dans le commutateur :</p><table><tr><th>Ordre</th><th>Port d'entrée</th><th>MAC source</th><th>MAC destination</th></tr><tr><th>1</th><td>Fa0/1</td><td>00:1a:2b:3c:44:01</td><td>00:1a:2b:3c:44:02</td></tr><tr><th>2</th><td>Fa0/2</td><td>00:1a:2b:3c:44:02</td><td>00:1a:2b:3c:44:01</td></tr><tr><th>3</th><td>Fa0/3</td><td>00:1a:2b:3c:44:03</td><td>ff:ff:ff:ff:ff:ff</td></tr><tr><th>4</th><td>Fa0/1</td><td>00:1a:2b:3c:44:01</td><td>00:1a:2b:3c:44:02</td></tr></table><p>Rappel du cours : le commutateur apprend la MAC source sur le port d'entrée, puis traite la MAC destination (unicast connue : commutation directe ; unicast inconnue ou diffusion : inondation de tous les autres ports). Répondez par le mot ou le nombre exact.</p><ol><li>Sur quel port la MAC 00:1a:2b:3c:44:02 est-elle apprise ?</li><li>Quelle décision le commutateur prend-il pour la trame 1, dont la destination est encore inconnue ?</li><li>La trame 2 est-elle inondée ou commutée directement ?</li><li>Vers quels ports la trame 3 est-elle envoyée ?</li><li>Quelle est la durée de vie par défaut d'une entrée CAM, en secondes ?</li></ol>",
    "starter": "# Exercice — La table CAM du commutateur de la mairie de Bonneval\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot ou le nombre exact attendu.\n\n[Question 1 — Port d'apprentissage de la MAC du serveur]\nA_COMPLETER\n\n[Question 2 — Décision pour la trame 1]\nA_COMPLETER\n\n[Question 3 — Traitement de la trame 2]\nA_COMPLETER\n\n[Question 4 — Ports de sortie de la trame 3]\nA_COMPLETER\n\n[Question 5 — Durée de vie par défaut d'une entrée CAM (en secondes)]\nA_COMPLETER\n",
    "hints": [
      "L'apprentissage porte sur la MAC source : la trame 2 arrive par Fa0/2 avec 00:1a:2b:3c:44:02 en source, ce qui crée l'entrée correspondante.",
      "Une MAC destination absente de la table ne peut pas être commutée : le commutateur l'envoie sur tous les ports actifs sauf celui d'arrivée, pour être sûr de la joindre.",
      "La diffusion (ff:ff:ff:ff:ff:ff) sort par définition vers tous les ports ; une entrée CAM non rafraîchie expire au bout de 300 secondes."
    ],
    "examples": [
      {
        "stdin": "La médiathèque de Portval observe son commutateur au démarrage, table CAM vide.\n1) Un poste du hall (Fa0/10) interroge le serveur de catalogue (Fa0/24) : destination inconnue, la trame est inondée ; la MAC du poste est apprise sur Fa0/10.\n2) Le serveur répond depuis Fa0/24 : destination connue, commutation directe vers Fa0/10 ; sa MAC est apprise sur Fa0/24.\n3) Une borne Wi-Fi émet une annonce en diffusion : elle sort vers tous les ports sauf celui de la borne.\n4) Les entrées non rafraîchies expirent après 300 secondes.",
        "expected": "inconnue : inondation — connue : commutation directe — diffusion : tous sauf le port d'arrivée — expiration 300 s",
        "note": "Chaque trame entrante fait d'apprendre la source, puis décider pour la destination : deux opérations distinctes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Port d'apprentissage de la MAC du serveur",
        "stdin": "q:1",
        "expected": "Fa0/2||fa0/2||FastEthernet0/2"
      },
      {
        "label": "Question 2 — Décision pour la trame 1",
        "stdin": "q:2",
        "expected": "inondation||l'inondation||inonder||flooding||l'inondation (flooding)||inonder tous les autres ports"
      },
      {
        "label": "Question 3 — Traitement de la trame 2",
        "stdin": "q:3",
        "expected": "commutée||elle est commutée||commutation directe vers Fa0/1||commutée directement vers Fa0/1"
      },
      {
        "label": "Question 4 — Ports de sortie de la trame 3",
        "stdin": "q:4",
        "expected": "tous les ports sauf Fa0/3||tous sauf Fa0/3||tous les ports actifs sauf le port d'arrivée"
      },
      {
        "label": "Question 5 — Durée de vie par défaut d'une entrée CAM",
        "stdin": "q:5",
        "expected": "300||300 s||300 secondes"
      }
    ],
    "solution": "[Question 1 — Port d'apprentissage de la MAC du serveur]\nFa0/2\n\n[Question 2 — Décision pour la trame 1]\ninondation\n\n[Question 3 — Traitement de la trame 2]\ncommutée\n\n[Question 4 — Ports de sortie de la trame 3]\ntous les ports sauf Fa0/3\n\n[Question 5 — Durée de vie par défaut d'une entrée CAM (en secondes)]\n300",
    "takeaway": "1) La MAC source de la trame 2 (00:1a:2b:3c:44:02) arrive par Fa0/2 : le serveur est appris sur Fa0/2.\n2) La trame 1 arrive avant toute réponse : la destination 44:02 n'est pas dans la table, le commutateur inonde tous les autres ports.\n3) La trame 2 vise 44:01, apprise à la trame 1 sur Fa0/1 : commutation directe vers Fa0/1, pas d'inondation.\n4) La trame 3 est une diffusion (ff:ff:ff:ff:ff:ff) : elle sort vers tous les ports sauf Fa0/3, son port d'arrivée.\n5) Une entrée CAM vit 300 secondes par défaut (aging timer) avant d'être purgée si elle n'est pas rafraîchie.\nContrôle : à l'issue de la trame 4, la table contient 44:01 → Fa0/1 et 44:02 → Fa0/2 : les trames suivantes entre les deux équipements ne quittent plus jamais ces ports."
  },
  {
    "id": "na2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "L'élection du root bridge du lycée Victor-Hugo",
    "exampleTitle": "Exemple résolu — l'élection du groupe scolaire Les-Aubiers",
    "goal": "Prédire une élection STP : plus petit Bridge ID, départage par MAC, rôles de ports et coûts de liens.",
    "brief": "<p><strong>Énoncé.</strong> Le lycée Victor-Hugo regroupe ses trois commutateurs dans un même domaine de diffusion, STP 802.1D activé. Les Bridge ID (BID) annoncés par les trois commutateurs sont :</p><table><tr><th>Commutateur</th><th>Localisation</th><th>Priorité</th><th>MAC de base</th></tr><tr><th>SW-ADMIN</th><td>Bâtiment administratif</td><td>32768</td><td>00:1c:57:aa:10:01</td></tr><tr><th>SW-CDI</th><td>Centre de documentation</td><td>32768</td><td>00:1c:57:aa:20:02</td></tr><tr><th>SW-BCD</th><td>Bâtiment des classes</td><td>4096</td><td>00:1c:57:aa:30:03</td></tr></table><p>Les liaisons entre commutateurs sont toutes des liens GigabitEthernet. Rappel du cours : est élu root bridge le commutateur au plus petit Bridge ID ; à priorité égale, la MAC la plus basse tranche ; tous les ports du root bridge sont designated, chaque commutateur non racine élit exactement un root port. Répondez par le mot ou le nombre exact.</p><ol><li>Quel commutateur est élu root bridge ?</li><li>Si SW-BCD tombait en panne, quel commutateur serait réélu root bridge ?</li><li>Quel critère tranche alors entre SW-ADMIN et SW-CDI ?</li><li>Combien de ports du root bridge sont designated ?</li><li>Combien de root ports chaque commutateur non racine élit-il ?</li><li>Quel est le coût STP 802.1D d'un lien GigabitEthernet ?</li></ol>",
    "starter": "# Exercice — L'élection du root bridge du lycée Victor-Hugo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot ou le nombre exact attendu.\n\n[Question 1 — Root bridge élu]\nA_COMPLETER\n\n[Question 2 — Root bridge si SW-BCD tombe en panne]\nA_COMPLETER\n\n[Question 3 — Critère de départage entre SW-ADMIN et SW-CDI]\nA_COMPLETER\n\n[Question 4 — Ports designated sur le root bridge]\nA_COMPLETER\n\n[Question 5 — Root ports par commutateur non racine]\nA_COMPLETER\n\n[Question 6 — Coût STP d'un lien GigabitEthernet]\nA_COMPLETER\n",
    "hints": [
      "Le Bridge ID se compare comme un nombre : d'abord la priorité (multiple de 4096), puis la MAC en cas d'égalité.",
      "SW-BCD annonce 4096, les deux autres 32768 (valeur par défaut) : le plus petit BID gagne sans départage.",
      "À départage SW-ADMIN / SW-CDI, comparez les MAC octet par octet : aa:10:01 est inférieur à aa:20:02 ; pour les coûts, relisez le tableau du cours (10 Mbps = 100, 100 Mbps = 19, 1 Gbps = 4)."
    ],
    "examples": [
      {
        "stdin": "Le groupe scolaire Les-Aubiers fait écrire son STP : SW-A (priorité 8192, MAC 00:22:bd:11:05:01), SW-B (32768, 00:22:bd:11:02:02) et SW-C (32768, 00:22:bd:11:03:03).\n\n1) SW-A a la priorité la plus basse : il est élu root bridge.\n2) Sans SW-A, SW-B et SW-C restent à 32768 : la MAC la plus basse l'emporte — 11:02:02 contre 11:03:03, SW-B est élu.\n3) Tous les ports de SW-A sont designated.\n4) SW-B et SW-C élisent chacun un root port vers SW-A.\n5) Les liens sont en FastEthernet : coût 19.",
        "expected": "SW-A élu (priorité 8192) — sans SW-A : SW-B par MAC plus basse — tout port du root est designated — un root port par non-racine — coût FE : 19",
        "note": "La priorité est un multiple de 4096 : 8192 se configure pour forcer l'élection d'un cœur de réseau."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Root bridge élu",
        "stdin": "q:1",
        "expected": "SW-BCD||SWBCD||sw-bcd||le commutateur SW-BCD"
      },
      {
        "label": "Question 2 — Root bridge si SW-BCD tombe en panne",
        "stdin": "q:2",
        "expected": "SW-ADMIN||SWADMIN||sw-admin||le commutateur SW-ADMIN"
      },
      {
        "label": "Question 3 — Critère de départage entre SW-ADMIN et SW-CDI",
        "stdin": "q:3",
        "expected": "la MAC la plus basse||l'adresse MAC la plus basse||la plus petite MAC||la MAC la plus basse (à priorité égale)"
      },
      {
        "label": "Question 4 — Ports designated sur le root bridge",
        "stdin": "q:4",
        "expected": "tous||tous les ports||tous, sans exception"
      },
      {
        "label": "Question 5 — Root ports par commutateur non racine",
        "stdin": "q:5",
        "expected": "un||1||un seul||exactement un"
      },
      {
        "label": "Question 6 — Coût STP d'un lien GigabitEthernet",
        "stdin": "q:6",
        "expected": "4||un coût de 4"
      }
    ],
    "solution": "[Question 1 — Root bridge élu]\nSW-BCD\n\n[Question 2 — Root bridge si SW-BCD tombe en panne]\nSW-ADMIN\n\n[Question 3 — Critère de départage entre SW-ADMIN et SW-CDI]\nla MAC la plus basse\n\n[Question 4 — Ports designated sur le root bridge]\ntous\n\n[Question 5 — Root ports par commutateur non racine]\nun\n\n[Question 6 — Coût STP d'un lien GigabitEthernet]\n4",
    "takeaway": "1) SW-BCD annonce la priorité 4096, inférieure à 32768 : plus petit Bridge ID, il est élu root bridge.\n2) Sans SW-BCD, SW-ADMIN et SW-CDI restent à 32768 : le départage se fait sur la MAC. aa:10:01 < aa:20:02, donc SW-ADMIN est réélu.\n3) À priorité égale, c'est la MAC de base la plus basse qui tranche.\n4) Sur le root bridge, tous les ports sont designated (DP) : le root est la source de l'arbre.\n5) Chaque commutateur non racine élit exactement un root port, celui au plus faible coût cumulé vers la racine.\n6) En STP 802.1D, un lien GigabitEthernet coûte 4 (FastEthernet : 19).\nContrôle : 4096 < 32768 règle la question 1 sans départage ; le départage MAC de la question 2 confirme l'ordre aa:10:01 < aa:20:02, lu de gauche à droite."
  },
  {
    "id": "na2-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "La liaison redondante de la radio OndeNord",
    "exampleTitle": "Exemple résolu — le triangle de commutateurs de LogiTrans",
    "goal": "Anticiper l'effet d'un second lien physique : boucle L2, absence de TTL, et blocage STP d'un port.",
    "brief": "<p><strong>Énoncé.</strong> La radio OndeNord diffuse depuis deux salles serveurs reliées par deux commutateurs Cisco, <strong>SW1</strong> (studio, élu root bridge, BID le plus faible) et <strong>SW2</strong> (régie). Jusqu'à présent, un seul câble physique relie les deux commutateurs : <code>Gi0/1</code> côté SW1 vers <code>Gi0/1</code> côté SW2. Jeudi, pour « sécuriser la diffusion en direct », le régisseur ajoute un second câble : <code>Gi0/2</code> côté SW1 vers <code>Gi0/2</code> côté SW2. STP 802.1D est actif sur les deux commutateurs ; le régisseur se souvient de la panne de 2019 sur un site où STP avait été désactivé : le réseau s'était figé en quelques secondes.</p><p>Répondez par le mot ou le nombre exact.</p><ol><li>Avant l'ajout du second câble, combien de chemins physiques reliaient SW1 et SW2 ?</li><li>Si STP était désactivé, quel phénomène le second câble déclencherait-il ?</li><li>L'en-tête Ethernet possède-t-il un champ TTL capable d'épuiser une trame en boucle ?</li><li>Avec STP actif, dans quel état sont placés les ports ni root port ni designated port ?</li><li>Une fois STP stabilisé sur ce double lien, combien de ports restent bloqués ?</li></ol>",
    "starter": "# Exercice — La liaison redondante de la radio OndeNord\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot ou le nombre exact attendu.\n\n[Question 1 — Chemins physiques avant le second câble]\nA_COMPLETER\n\n[Question 2 — Phénomène déclenché si STP est désactivé]\nA_COMPLETER\n\n[Question 3 — Champ TTL dans l'en-tête Ethernet]\nA_COMPLETER\n\n[Question 4 — État des ports ni RP ni DP]\nA_COMPLETER\n\n[Question 5 — Ports bloqués une fois STP stabilisé]\nA_COMPLETER\n",
    "hints": [
      "Un seul câble entre deux commutateurs forme une topologie en arbre : aucune trame ne peut tourner en rond.",
      "Deux câbles créent une boucle physique : sans protocole, une trame de diffusion y circule indéfiniment — et l'en-tête Ethernet, contrairement à l'en-tête IP, n'a aucun compteur de vie.",
      "STP élague l'arbre : les ports ni root port ni designated passent en blocage ; sur un double lien entre deux commutateurs, un seul des deux ports d'extrémité est bloqué."
    ],
    "examples": [
      {
        "stdin": "Le transporteur LogiTrans relie trois commutateurs en triangle : SW-N (root), SW-E et SW-O, chaque paire reliée par un lien direct, STP 802.1D actif.\n\n1) Le triangle offre trois chemins : sans STP, une requête en diffusion tournerait en boucle et saturerait les liens.\n2) STP élit SW-N root ; SW-E et SW-O prennent chacun un root port vers SW-N ; sur le lien SW-E–SW-O, un seul côté est designated.\n3) Le port restant du lien SW-E–SW-O passe en blocage : exactement un port bloqué au total.\n4) En cas de coupure d'un lien actif, ce port se réouvre et rétablit la continuité.",
        "expected": "sans STP : boucle de niveau 2 — un seul port bloqué — réouverture automatique sur panne",
        "note": "STP conserve la redondance physique tout en coupant logiquement les boucles : le port bloqué veille."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Chemins physiques avant le second câble",
        "stdin": "q:1",
        "expected": "1||un||un seul"
      },
      {
        "label": "Question 2 — Phénomène déclenché si STP est désactivé",
        "stdin": "q:2",
        "expected": "une tempête de diffusion||tempête de diffusion||une boucle de niveau 2||boucle de niveau 2||tempête de broadcast"
      },
      {
        "label": "Question 3 — Champ TTL dans l'en-tête Ethernet",
        "stdin": "q:3",
        "expected": "non||non, aucun TTL||aucun champ TTL"
      },
      {
        "label": "Question 4 — État des ports ni RP ni DP",
        "stdin": "q:4",
        "expected": "bloquants||bloquant||l'état bloquant||blocking||en blocage"
      },
      {
        "label": "Question 5 — Ports bloqués une fois STP stabilisé",
        "stdin": "q:5",
        "expected": "1||un||un seul"
      }
    ],
    "solution": "[Question 1 — Chemins physiques avant le second câble]\n1\n\n[Question 2 — Phénomène déclenché si STP est désactivé]\nune tempête de diffusion\n\n[Question 3 — Champ TTL dans l'en-tête Ethernet]\nnon\n\n[Question 4 — État des ports ni RP ni DP]\nbloquants\n\n[Question 5 — Ports bloqués une fois STP stabilisé]\n1",
    "takeaway": "1) Un seul câble relie SW1 et SW2 : un seul chemin physique, donc aucune boucle possible.\n2) Le second câble ferme la boucle : sans STP, une trame de diffusion est copiée sans fin — c'est la tempête de diffusion, aggravée par le MAC flapping sur la table CAM.\n3) Non : l'en-tête Ethernet n'a aucun champ TTL (seul l'en-tête IP en a un) — une trame en boucle circule indéfiniment.\n4) Les ports ni root port ni designated port sont placés en état bloquant (blocking) : ils ne transportent plus de trames de données.\n5) SW1 étant root, tous ses ports sont designated ; sur le double lien, le port du côté SW2 qui n'est pas root port passe en blocage : exactement un port bloqué.\nContrôle : la redondance reste physique — si le lien actif Gi0/1 est coupé, STP réouvre le port bloqué et la diffusion reprend."
  }
];
