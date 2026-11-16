'use strict';

module.exports = [
  {
    "id": "cc-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "L'installation du nouveau plateau de bureaux",
    "exampleTitle": "Exemple résolu — le réseau du magasin de quartier",
    "goal": "Identifier le rôle de chaque composante d'un réseau (terminal, routeur, commutateurs L2/L3, concentrateur, pare-feu, IDS, IPS) dans une installation réelle.",
    "brief": "<p><strong>Énoncé.</strong> Nadia est technicienne réseau dans une PME. Elle installe aujourd'hui le réseau du nouveau plateau de bureaux : 12 postes, 2 imprimantes, un serveur de fichiers et la sortie vers Internet. Le carton livré ce matin contient l'inventaire suivant :</p><table><tr><th>Équipement</th><th>Repère</th><th>Quantité</th></tr><tr><td>Postes de travail et imprimantes</td><td>P1 à P14</td><td>14</td></tr><tr><td>Serveur de fichiers</td><td>SRV1</td><td>1</td></tr><tr><td>Routeur</td><td>R1</td><td>1</td></tr><tr><td>Commutateur de couche 2 (Catalyst 2960)</td><td>SW1</td><td>1</td></tr><tr><td>Commutateur de couche 3</td><td>SW3</td><td>1</td></tr><tr><td>Concentrateur (hub) de récupération</td><td>HUB1</td><td>1</td></tr><tr><td>Pare-feu</td><td>FW1</td><td>1</td></tr><tr><td>Sonde de détection d'intrusion</td><td>IDS1</td><td>1</td></tr></table><p>Répondez par un mot ou une expression très courte.</p><ol><li>Quel équipement relie des réseaux distincts et choisit les chemins ?</li><li>Quel équipement commute les trames dans un même LAN ? (un seul mot, français ou anglais)</li><li>Pour faire communiquer deux VLAN sans acheter de routeur, quel type de commutateur du carton faut-il : L2 ou L3 ?</li><li>Que fait un concentrateur (hub) des bits qu'il reçoit ? (un seul verbe)</li><li>Quel équipement filtre le trafic selon des règles ?</li><li>La sonde détecte un comportement malicieux mais ne réagit pas : quel équipement, en plus de l'IDS, aurait pu bloquer l'intrusion ?</li></ol>",
    "starter": "# Exercice — L'installation du nouveau plateau de bureaux\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un mot ou une expression très courte.\n\n[Question 1 — Équipement qui relie des réseaux distincts]\nA_COMPLETER\n\n[Question 2 — Équipement qui commute dans un même LAN]\nA_COMPLETER\n\n[Question 3 — Type de commutateur pour router entre VLAN]\nA_COMPLETER\n\n[Question 4 — Ce que le hub fait des bits]\nA_COMPLETER\n\n[Question 5 — Équipement qui filtre le trafic]\nA_COMPLETER\n\n[Question 6 — Équipement capable de bloquer l'intrusion]\nA_COMPLETER\n",
    "hints": [
      "La fiche des composantes donne à chaque boîte une phrase-clé : celle qui échange des données, celle qui relie des réseaux, celle qui commute dans un LAN, celle qui répète, celle qui filtre, celle qui alerte, celle qui bloque.",
      "Classez les équipements par degré d'intelligence : répéter sans comprendre, commuter selon la MAC, router entre réseaux, filtrer selon des règles, détecter, prévenir.",
      "Pour la question 3, un seul des deux commutateurs sait router entre VLAN ; pour la question 6, cherchez l'équipement dont l'action est de bloquer la menace."
    ],
    "examples": [
      {
        "stdin": "Un magasin de quartier reçoit sa livraison : 2 caisses (terminaux), un routeur box, un commutateur, un vieux hub et un pare-feu.\n1) Le routeur box relie le réseau du magasin à Internet : c'est lui qui choisit les chemins.\n2) Le commutateur commute les trames entre les caisses, dans le même LAN.\n3) Le hub, lui, répète chaque bit vers tous les ports, sans cibler personne.\n4) Le pare-feu filtre les échanges selon ses règles.\n5) Seul un IPS bloquerait une intrusion : l'IDS se contente d'alerter.",
        "expected": "routeur : relie — switch : commute — hub : répète — pare-feu : filtre — IPS : bloque",
        "note": "Le hub répète, le switch comprend, le routeur décide, l'IPS bloque : quatre degrés d'intelligence dans une phrase."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Équipement qui relie des réseaux distincts",
        "stdin": "q:1",
        "expected": "routeur||le routeur||un routeur"
      },
      {
        "label": "Question 2 — Équipement qui commute dans un même LAN",
        "stdin": "q:2",
        "expected": "switch||commutateur||le switch||le commutateur||switch l2||commutateur l2"
      },
      {
        "label": "Question 3 — Type de commutateur pour router entre VLAN",
        "stdin": "q:3",
        "expected": "l3||le l3||commutateur l3||le commutateur l3||switch l3||le switch l3"
      },
      {
        "label": "Question 4 — Ce que le hub fait des bits",
        "stdin": "q:4",
        "expected": "répète||il répète||répète tout||il répète tout"
      },
      {
        "label": "Question 5 — Équipement qui filtre le trafic",
        "stdin": "q:5",
        "expected": "pare-feu||le pare-feu||parefeu||firewall"
      },
      {
        "label": "Question 6 — Équipement capable de bloquer l'intrusion",
        "stdin": "q:6",
        "expected": "ips||l'ips||un ips||le ips"
      }
    ],
    "solution": "[Question 1 — Équipement qui relie des réseaux distincts]\nrouteur\n\n[Question 2 — Équipement qui commute dans un même LAN]\nswitch\n\n[Question 3 — Type de commutateur pour router entre VLAN]\nl3\n\n[Question 4 — Ce que le hub fait des bits]\nrépète\n\n[Question 5 — Équipement qui filtre le trafic]\npare-feu\n\n[Question 6 — Équipement capable de bloquer l'intrusion]\nips",
    "takeaway": "1) Le routeur (R1) relie des réseaux distincts et choisit les chemins : c'est la couche réseau.\n2) Le commutateur de couche 2 (SW1) commute les trames dans un même LAN — le mot anglais « switch » est accepté.\n3) Le commutateur de couche 3 (SW3) ajoute le routage entre VLAN : commutation plus routage. Le switch L2 commute, il ne route pas.\n4) Le hub répète les bits vers tous les ports, sans les comprendre ni cibler : couche 1.\n5) Le pare-feu (FW1) filtre le trafic selon des règles.\n6) L'IDS détecte et alerte ; l'IPS va plus loin et bloque le comportement malicieux. Sans IPS dans le carton, la sonde IDS1 peut seulement alerter.\nContrôle : hiérarchie du cours — le hub répète (couche 1), le switch L2 commute (couche 2), le switch L3 route entre VLAN, le routeur relie les réseaux, le pare-feu filtre, l'IDS alerte, l'IPS bloque."
  },
  {
    "id": "cc-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Câble droit ou câble croisé",
    "goal": "Choisir un brochage droit ou croisé selon les interfaces MDI et MDI-X, sans Auto-MDIX.",
    "brief": "<p>Analysez chaque ligne « liaisontype typeannonce ». Dans cette simulation 10/100 sans Auto-MDIX, les interfaces du PC et du routeur sont MDI, celles du commutateur MDI-X. Les codes sont <code>pc-switch</code>, <code>pc-pc</code>, <code>switch-switch</code>, <code>pc-routeur</code>, <code>routeur-routeur</code> et leurs variantes <code>sw1-sw2</code> et <code>r1-r2</code>. Le type annoncé vaut <code>droit</code> ou <code>croise</code>. Pour chaque ligne, indiquez <code>liaison : conforme</code> ou <code>liaison : a revoir</code>, puis comptez <code>conformes : X/n</code>. Avec Auto-MDIX compatible et activé, le port peut adapter le brochage.</p>",
    "starter": "# Grille d'analyse (cc-c1-e2) — Câble droit ou câble croisé\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les cinq liaisons]\n# Données : 5\n# Données : pc-switch droit\n# Données : pc-routeur droit\n# Données : pc-pc croise\n# Données : switch-switch croise\n# Données : routeur-routeur croise\nA_COMPLETER\n\n[Cas 2 — Inversions]\n# Données : 2\n# Données : pc-switch croise\n# Données : pc-pc droit\nA_COMPLETER\n\n[Cas 3 — Baie de brassage]\n# Données : 4\n# Données : pc-switch droit\n# Données : sw1-sw2 croise\n# Données : pc-routeur droit\n# Données : r1-r2 croise\nA_COMPLETER\n",
    "hints": [
      "Identifiez le type MDI ou MDI-X de chaque interface avant de comparer les extrémités.",
      "Appliquez la règle vue au cours uniquement dans le cas sans Auto-MDIX.",
      "Reliez MDI à MDI (PC-PC, switch-switch) par un câble croisé, et MDI à MDI-X (PC-switch, routeur-switch) par un câble droit (hors Auto-MDIX)."
    ],
    "examples": [
      {
        "stdin": "3\npc-switch droit\nswitch-switch droit\npc-pc croise\n",
        "expected": "pc-switch : conforme\nswitch-switch : a revoir\npc-pc : conforme\nconformes : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Les cinq liaisons",
        "stdin": "cas:1",
        "expected": "pc-switch : conforme\npc-routeur : a revoir\npc-pc : conforme\nswitch-switch : conforme\nrouteur-routeur : conforme\nconformes : 4/5"
      },
      {
        "label": "Inversions",
        "stdin": "cas:2",
        "expected": "pc-switch : a revoir\npc-pc : a revoir\nconformes : 0/2"
      },
      {
        "label": "Baie de brassage",
        "stdin": "cas:3",
        "expected": "pc-switch : conforme\nsw1-sw2 : conforme\npc-routeur : a revoir\nr1-r2 : conforme\nconformes : 3/4"
      }
    ],
    "solution": "[Exemple]\npc-switch : conforme\nswitch-switch : a revoir\npc-pc : conforme\nconformes : 2/3\n\n[Cas 1 — Les cinq liaisons]\npc-switch : conforme\npc-routeur : a revoir\npc-pc : conforme\nswitch-switch : conforme\nrouteur-routeur : conforme\nconformes : 4/5\n\n[Cas 2 — Inversions]\npc-switch : a revoir\npc-pc : a revoir\nconformes : 0/2\n\n[Cas 3 — Baie de brassage]\npc-switch : conforme\nsw1-sw2 : conforme\npc-routeur : a revoir\nr1-r2 : conforme\nconformes : 3/4",
    "takeaway": "À retenir : Choisir un brochage droit ou croisé selon les interfaces MDI et MDI-X, sans Auto-MDIX."
  },
  {
    "id": "cc-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Choisir la catégorie du câble",
    "goal": "Conseiller la catégorie de paires torsadées selon le débit visé.",
    "brief": "<p>Dans cette simulation, chaque canal mesure au plus 100 m : <code>100m</code> désigne le débit 100 Mbit/s en 100BASE-TX, <code>1g</code> le gigabit et <code>10g</code> le 10GBASE-T. Appliquez la convention de la grille : <code>100m : cat5</code>, <code>1g : cat5e</code> et <code>10g : cat6a</code>. Les catégories supérieures peuvent aussi convenir en pratique ; ces choix ne sont donc pas les seules solutions possibles. Le 100BASE-T4 historique peut utiliser la catégorie 3, mais ce n'est pas le protocole 100BASE-TX de cette grille. Une catégorie 6 UTP peut aussi convenir à 10GBASE-T sur une portée plus courte selon les équipements. Pour chaque site, indiquez <code>site : cat5</code>, <code>site : cat5e</code> ou <code>site : cat6a</code> selon cette convention, puis <code>cat6a posees : X</code>.</p>",
    "starter": "# Grille d'analyse (cc-c1-e3) — Choisir la catégorie du câble\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Que du gigabit]\n# Données : 2\n# Données : labo 1g\n# Données : bureau 1g\nA_COMPLETER\n\n[Cas 2 — Datacenter]\n# Données : 2\n# Données : rack1 10g\n# Données : rack2 10g\nA_COMPLETER\n\n[Cas 3 — Étage mixte]\n# Données : 4\n# Données : compta 1g\n# Données : cafe 100m\n# Données : reunion 10g\n# Données : accueil 100m\nA_COMPLETER\n",
    "hints": [
      "Distinguez le code de débit 100m de la longueur du canal, limitée à 100 mètres dans ce modèle.",
      "Comptez les cat6a posées pour le bilan.",
      "Choisissez Cat5e jusqu à 1 Gbit/s sur 100 m et passez en Cat6a dès qu un tronçon vise le 10 Gbit/s ; signalez toute demande hors standard."
    ],
    "examples": [
      {
        "stdin": "3\nbureau 1g\nsalle 10g\nreception 100m\n",
        "expected": "bureau : cat5e\nsalle : cat6a\nreception : cat5\ncat6a posees : 1"
      }
    ],
    "tests": [
      {
        "label": "Que du gigabit",
        "stdin": "cas:1",
        "expected": "labo : cat5e\nbureau : cat5e\ncat6a posees : 0"
      },
      {
        "label": "Datacenter",
        "stdin": "cas:2",
        "expected": "rack1 : cat6a\nrack2 : cat6a\ncat6a posees : 2"
      },
      {
        "label": "Étage mixte",
        "stdin": "cas:3",
        "expected": "compta : cat5e\ncafe : cat5\nreunion : cat6a\naccueil : cat5\ncat6a posees : 1"
      }
    ],
    "solution": "[Exemple]\nbureau : cat5e\nsalle : cat6a\nreception : cat5\ncat6a posees : 1\n\n[Cas 1 — Que du gigabit]\nlabo : cat5e\nbureau : cat5e\ncat6a posees : 0\n\n[Cas 2 — Datacenter]\nrack1 : cat6a\nrack2 : cat6a\ncat6a posees : 2\n\n[Cas 3 — Étage mixte]\ncompta : cat5e\ncafe : cat5\nreunion : cat6a\naccueil : cat5\ncat6a posees : 1",
    "takeaway": "À retenir : Conseiller la catégorie de paires torsadées selon le débit visé."
  },
  {
    "id": "cc-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le schéma TCP/IP de la stagiaire",
    "exampleTitle": "Exemple résolu — légender le schéma Wi-Fi du café",
    "goal": "Ranger les couches des modèles TCP/IP à 4 et à 5 couches et repérer ce qui les distingue.",
    "brief": "<p><strong>Énoncé.</strong> Léa, stagiaire chez Nadia, doit légender le schéma du réseau de la PME avec le modèle TCP/IP. Le cours distingue le modèle à 4 couches (accès réseau, internet, transport, application) du modèle à 5 couches, dit « modèle d'actualité », qui sépare la couche physique de la couche accès réseau. Le réseau du modèle à 5 couches devient « internet », la couche réseau d'OSI, et les couches hautes d'OSI se fondent dans l'application.</p><ol><li>Combien de couches compte le modèle TCP/IP d'actualité ?</li><li>Citez les quatre couches du modèle TCP/IP à 4 couches, de bas en haut, séparées par des espaces.</li><li>Quelle couche apparaît dans le modèle à 5 couches, détachée de l'accès réseau ?</li><li>Dans le modèle TCP/IP, comment s'appelle la couche qui porte IP et le routage (l'équivalent de la couche réseau d'OSI) ?</li><li>Les couches session et présentation d'OSI n'existent pas telles quelles en TCP/IP : dans quelle couche TCP/IP leurs fonctions sont-elles regroupées ?</li></ol>",
    "starter": "# Exercice — Le schéma TCP/IP de la stagiaire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un mot ou une expression très courte.\n\n[Question 1 — Nombre de couches du modèle d'actualité]\nA_COMPLETER\n\n[Question 2 — Les quatre couches du modèle à 4 couches]\nA_COMPLETER\n\n[Question 3 — Couche détachée de l'accès réseau]\nA_COMPLETER\n\n[Question 4 — Couche qui porte IP et le routage]\nA_COMPLETER\n\n[Question 5 — Couche qui regroupe session et présentation]\nA_COMPLETER\n",
    "hints": [
      "Répétez le modèle à 4 couches de bas en haut avec le moyen mnémotechnique du cours : AITA.",
      "Le modèle d'actualité détache du bas ce que le modèle à 4 couches groupe dans son premier étage.",
      "IP et le routage donnent leur nom à l'étage du milieu ; les fonctions hautes d'OSI se fondent dans l'étage du haut."
    ],
    "examples": [
      {
        "stdin": "Un apprenti légende le schéma Wi-Fi d'un café.\n1) Le modèle TCP/IP d'actualité compte 5 couches.\n2) Le modèle à 4 couches, de bas en haut : accès réseau, internet, transport, application.\n3) La couche physique est la grande absente du modèle à 4 couches.\n4) IP et le routage : couche internet.\n5) Une page web demandée en HTTP : couche application.",
        "expected": "5 couches — accès réseau, internet, transport, application — physique absente — internet — application",
        "note": "Mnémotechnique du cours : TCP/IP 4 = AITA (Accès, Internet, Transport, Application) ; OSI 7 = PLR-TSPA."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de couches du modèle d'actualité",
        "stdin": "q:1",
        "expected": "5||cinq||5 couches"
      },
      {
        "label": "Question 2 — Les quatre couches du modèle à 4 couches",
        "stdin": "q:2",
        "expected": "accès réseau internet transport application||accès réseau, internet, transport, application||accès réseau internet transport et application"
      },
      {
        "label": "Question 3 — Couche détachée de l'accès réseau",
        "stdin": "q:3",
        "expected": "physique||la physique||couche physique||la couche physique"
      },
      {
        "label": "Question 4 — Couche qui porte IP et le routage",
        "stdin": "q:4",
        "expected": "internet||la couche internet||couche internet"
      },
      {
        "label": "Question 5 — Couche qui regroupe session et présentation",
        "stdin": "q:5",
        "expected": "application||la couche application||couche application"
      }
    ],
    "solution": "[Question 1 — Nombre de couches du modèle d'actualité]\n5\n\n[Question 2 — Les quatre couches du modèle à 4 couches]\naccès réseau internet transport application\n\n[Question 3 — Couche détachée de l'accès réseau]\nphysique\n\n[Question 4 — Couche qui porte IP et le routage]\ninternet\n\n[Question 5 — Couche qui regroupe session et présentation]\napplication",
    "takeaway": "1) Le modèle d'actualité est le TCP/IP à 5 couches : 5 couches.\n2) De bas en haut : accès réseau, internet, transport, application (AITA).\n3) Le modèle à 5 couches sépare la couche physique de la couche accès réseau : physique, liaison de données, réseau, transport, application.\n4) IP et le routage vivent dans la couche internet — héritage du nom du protocole vedette.\n5) Les fonctions de session et de présentation d'OSI sont regroupées dans la couche application de TCP/IP.\nContrôle : le modèle à 4 couches ne contient pas la couche physique — c'est la confusion d'examen la plus fréquente."
  },
  {
    "id": "cc-c2-e2",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Sept étages pour un message",
    "exampleTitle": "Exemple résolu — le tableau d'un autre groupe",
    "goal": "Associer chaque équipement à sa couche OSI et chaque couche à son unité de données.",
    "brief": "<p><strong>Énoncé.</strong> Pour expliquer OSI, le formateur de la PME compare le modèle à un immeuble de sept étages : chaque étage a un rôle et une unité de données. Léa doit compléter le tableau des correspondances :</p><table><tr><th>Étage OSI</th><th>Couche</th><th>Unité échangée</th></tr><tr><td>7</td><td>Application</td><td>données applicatives</td></tr><tr><td>6</td><td>Présentation</td><td>données codées (ASCII, Unicode)</td></tr><tr><td>5</td><td>Session</td><td>données de session (RPC, NetBIOS)</td></tr><tr><td>4</td><td>Transport</td><td>?</td></tr><tr><td>3</td><td>Réseau</td><td>?</td></tr><tr><td>2</td><td>Liaison de données</td><td>?</td></tr><tr><td>1</td><td>Physique</td><td>bits</td></tr></table><ol><li>À quelle couche OSI travaille un commutateur (switch) ? Répondez par son numéro.</li><li>À quelle couche OSI travaille un routeur ?</li><li>À quelle couche OSI travaille un concentrateur (hub) ?</li><li>Quelle unité complète la ligne de la couche transport ?</li><li>Quelle unité complète la ligne de la couche réseau ?</li><li>Quelle unité complète la ligne de la couche liaison de données ?</li></ol>",
    "starter": "# Exercice — Sept étages pour un message\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un numéro, un mot ou une expression très courte.\n\n[Question 1 — Couche OSI du commutateur]\nA_COMPLETER\n\n[Question 2 — Couche OSI du routeur]\nA_COMPLETER\n\n[Question 3 — Couche OSI du hub]\nA_COMPLETER\n\n[Question 4 — Unité de la couche transport]\nA_COMPLETER\n\n[Question 5 — Unité de la couche réseau]\nA_COMPLETER\n\n[Question 6 — Unité de la couche liaison de données]\nA_COMPLETER\n",
    "hints": [
      "Chaque équipement lit une unité différente : celui qui ne lit que les bits est tout en bas, celui qui commute les trames au milieu, celui qui route les paquets au-dessus.",
      "Le tableau de l'énoncé donne deux unités déjà placées (données applicatives, bits) : les trois cases restantes se remplissent avec les unités des couches 2, 3 et 4.",
      "Contrôle : en descendant l'immeuble, chaque couche emballe l'unité de la couche supérieure — les trois unités à trouver se suivent dans cet ordre."
    ],
    "examples": [
      {
        "stdin": "Un autre groupe complète le tableau pour d'autres équipements.\n1) Le pont, ancêtre du commutateur, travaille en couche 2.\n2) Le commutateur de couche 3 monte d'un étage au-dessus du commutateur de couche 2.\n3) L'unité de la couche 4 est le segment ; celle de la couche 1 est le bit.\n4) Tout équipement qui ne lit que les bits reste en couche 1.",
        "expected": "pont : couche 2 — switch L3 : couche 3 — couche 4 : segment — couche 1 : bits",
        "note": "L'unité trahit la couche : bits (1), trame (2), paquet (3), segment (4) — l'examen la demande dans les deux sens."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Couche OSI du commutateur",
        "stdin": "q:1",
        "expected": "2||couche 2||la couche 2"
      },
      {
        "label": "Question 2 — Couche OSI du routeur",
        "stdin": "q:2",
        "expected": "3||couche 3||la couche 3"
      },
      {
        "label": "Question 3 — Couche OSI du hub",
        "stdin": "q:3",
        "expected": "1||couche 1||la couche 1"
      },
      {
        "label": "Question 4 — Unité de la couche transport",
        "stdin": "q:4",
        "expected": "segment||le segment||des segments||segments"
      },
      {
        "label": "Question 5 — Unité de la couche réseau",
        "stdin": "q:5",
        "expected": "paquet||le paquet||des paquets||paquets"
      },
      {
        "label": "Question 6 — Unité de la couche liaison de données",
        "stdin": "q:6",
        "expected": "trame||la trame||des trames||trames"
      }
    ],
    "solution": "[Question 1 — Couche OSI du commutateur]\n2\n\n[Question 2 — Couche OSI du routeur]\n3\n\n[Question 3 — Couche OSI du hub]\n1\n\n[Question 4 — Unité de la couche transport]\nsegment\n\n[Question 5 — Unité de la couche réseau]\npaquet\n\n[Question 6 — Unité de la couche liaison de données]\ntrame",
    "takeaway": "1) Le commutateur commute les trames dans un même LAN : couche 2, liaison de données.\n2) Le routeur relie des réseaux et achemine les paquets : couche 3, réseau.\n3) Le hub ne lit ni MAC ni IP : il répète les bits — couche 1, physique.\n4) La couche transport découpe les données en segments (avec les ports TCP/UDP).\n5) La couche réseau encapsule chaque segment dans un paquet, avec l'adressage IP.\n6) La couche liaison de données encapsule chaque paquet dans une trame (en-tête + queue).\nContrôle : bits (1), trame (2), paquet (3), segment (4) — l'unité nomme toujours la couche, dans les deux sens."
  },
  {
    "id": "cc-c2-e3",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Qui fait quoi entre OSI et TCP/IP",
    "goal": "Associer chaque tâche à sa couche dans les modèles OSI et TCP/IP.",
    "brief": "<p>Analysez chaque ligne <code>tache modele couche</code>. Les tâches sont <code>codage</code>, <code>session</code>, <code>routage</code>, <code>ports</code> et <code>cables</code> ; les modèles sont <code>osi</code> et <code>tcp5</code>. Pour OSI, associez respectivement ces tâches aux couches <code>presentation</code>, <code>session</code>, <code>reseau</code>, <code>transport</code> et <code>physique</code>. Dans la variante pédagogique TCP/IP à cinq couches, les fonctions de présentation et de session sont regroupées dans <code>application</code> ; le routage relève de <code>internet</code>, les ports de <code>transport</code> et les câbles de <code>physique</code>. Cette variante sépare les couches liaison et physique que d'autres représentations regroupent en accès réseau.</p><p>Pour chaque ligne, indiquez <code>tache : conforme</code> si la couche proposée correspond au modèle, sinon <code>tache : a revoir</code>. Terminez par <code>conformes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c2-e3) — Qui fait quoi entre OSI et TCP/IP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les couches OSI]\n# Données : 5\n# Données : codage osi presentation\n# Données : session osi session\n# Données : routage osi reseau\n# Données : ports osi transport\n# Données : cables osi physique\nA_COMPLETER\n\n[Cas 2 — Les couches TCP/IP]\n# Données : 5\n# Données : codage tcp5 application\n# Données : session tcp5 application\n# Données : routage tcp5 internet\n# Données : ports tcp5 transport\n# Données : cables tcp5 physique\nA_COMPLETER\n\n[Cas 3 — Couches interverties]\n# Données : 5\n# Données : codage osi application\n# Données : session tcp5 session\n# Données : routage osi internet\n# Données : ports tcp5 reseau\n# Données : cables osi transport\nA_COMPLETER\n\n[Cas 4 — Comparaison mixte]\n# Données : 4\n# Données : routage osi reseau\n# Données : ports osi transport\n# Données : session tcp5 application\n# Données : codage tcp5 presentation\nA_COMPLETER\n",
    "hints": [
      "Le routage existe dans les deux modèles : réseau en OSI, internet en TCP/IP.",
      "Le codage et la session sont regroupés dans application dans la représentation TCP/IP choisie.",
      "En TCP/IP 5 couches, codage et session remontent dans « application » tandis que routage passe en « internet » ; vérifiez chaque couple tâche/modèle."
    ],
    "examples": [
      {
        "stdin": "3\ncodage osi presentation\nroutage osi reseau\nroutage tcp5 reseau\n",
        "expected": "codage : conforme\nroutage : conforme\nroutage : a revoir\nconformes : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Les couches OSI",
        "stdin": "cas:1",
        "expected": "codage : conforme\nsession : conforme\nroutage : conforme\nports : conforme\ncables : conforme\nconformes : 5/5"
      },
      {
        "label": "Les couches TCP/IP",
        "stdin": "cas:2",
        "expected": "codage : conforme\nsession : conforme\nroutage : conforme\nports : conforme\ncables : conforme\nconformes : 5/5"
      },
      {
        "label": "Couches interverties",
        "stdin": "cas:3",
        "expected": "codage : a revoir\nsession : a revoir\nroutage : a revoir\nports : a revoir\ncables : a revoir\nconformes : 0/5"
      },
      {
        "label": "Comparaison mixte",
        "stdin": "cas:4",
        "expected": "routage : conforme\nports : conforme\nsession : conforme\ncodage : a revoir\nconformes : 3/4"
      }
    ],
    "solution": "[Exemple]\ncodage : conforme\nroutage : conforme\nroutage : a revoir\nconformes : 2/3\n\n[Cas 1 — Les couches OSI]\ncodage : conforme\nsession : conforme\nroutage : conforme\nports : conforme\ncables : conforme\nconformes : 5/5\n\n[Cas 2 — Les couches TCP/IP]\ncodage : conforme\nsession : conforme\nroutage : conforme\nports : conforme\ncables : conforme\nconformes : 5/5\n\n[Cas 3 — Couches interverties]\ncodage : a revoir\nsession : a revoir\nroutage : a revoir\nports : a revoir\ncables : a revoir\nconformes : 0/5\n\n[Cas 4 — Comparaison mixte]\nroutage : conforme\nports : conforme\nsession : conforme\ncodage : a revoir\nconformes : 3/4",
    "takeaway": "À retenir : Associer chaque tâche à sa couche dans les modèles OSI et TCP/IP."
  },
  {
    "id": "cc-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "SOHO ou entreprise : deux réseaux à comparer",
    "exampleTitle": "Exemple résolu — le studio et l'open-space",
    "goal": "Distinguer un LAN SOHO d'un LAN d'entreprise, citer les familles de normes IEEE et le nombre de paires du gigabit.",
    "brief": "<p><strong>Énoncé.</strong> Le gérant du cybercafé « Le Port » veut équiper son domicile et demande à Nadia la différence avec le réseau d'un immeuble de bureaux. Le cours oppose le LAN SOHO (Small Office Home Office) — où, dans la réalité, un seul appareil « routeur sans fil » remplit les trois rôles — au LAN d'entreprise, qui reproduit le même schéma à plus grande échelle : un commutateur et un point d'accès par étage, dans la salle technique. Les normes Ethernet filaires forment la famille IEEE 802.3 (de 10 Mbit/s à 400 Gbit/s) ; les normes sans fil commencent par IEEE 802.11. Le 1000BASE-T mobilise quatre paires du câble.</p><ol><li>Au domicile du gérant, quel appareil unique remplit à la fois les rôles de routeur, de commutateur et de point d'accès ?</li><li>Dans l'immeuble de bureaux, combien de commutateurs le cours installe-t-il par étage ?</li><li>Quelle famille de normes IEEE régit l'Ethernet filaire ?</li><li>Quelle famille de normes IEEE régit les réseaux sans fil ?</li><li>Combien de paires le 1000BASE-T utilise-t-il ?</li></ol>",
    "starter": "# Exercice — SOHO ou entreprise : deux réseaux à comparer\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un mot, un nombre ou une expression très courte.\n\n[Question 1 — L'appareil unique du logement]\nA_COMPLETER\n\n[Question 2 — Commutateurs par étage dans l'entreprise]\nA_COMPLETER\n\n[Question 3 — Famille de normes de l'Ethernet filaire]\nA_COMPLETER\n\n[Question 4 — Famille de normes du sans fil]\nA_COMPLETER\n\n[Question 5 — Paires utilisées par le 1000BASE-T]\nA_COMPLETER\n",
    "hints": [
      "Le LAN SOHO tient dans un seul appareil qui cumule les rôles ; le LAN d'entreprise répète le même schéma à chaque étage, dans la salle technique.",
      "Les deux familles de normes IEEE du cours se distinguent par leur numéro : filaire d'un côté, sans fil de l'autre.",
      "Comptez les paires : les normes 10 Mbit/s et 100 Mbit/s classiques en utilisent deux ; le gigabit en mobilise quatre."
    ],
    "examples": [
      {
        "stdin": "Le voisin du gérant compare son studio et l'open-space de son entreprise.\n1) Au studio, une box unique route, commute et diffuse le Wi-Fi : c'est du SOHO.\n2) Dans l'open-space, chaque étage a son commutateur et son point d'accès, dans la salle technique.\n3) L'Ethernet filaire vit sous 802.3 ; le sans-fil sous 802.11.\n4) Le 100BASE-TX, lui, n'utilise que 2 paires.",
        "expected": "SOHO : une box — entreprise : un switch par étage — filaire : 802.3 — sans fil : 802.11 — 100BASE-TX : 2 paires",
        "note": "SOHO : un appareil fait tout ; entreprise : un commutateur et un point d'accès par étage."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — L'appareil unique du logement",
        "stdin": "q:1",
        "expected": "routeur sans fil||un routeur sans fil||box||une box||la box||box internet||routeur wifi||routeur wi-fi"
      },
      {
        "label": "Question 2 — Commutateurs par étage dans l'entreprise",
        "stdin": "q:2",
        "expected": "1||un||1 par étage||un par étage"
      },
      {
        "label": "Question 3 — Famille de normes de l'Ethernet filaire",
        "stdin": "q:3",
        "expected": "802.3||ieee 802.3"
      },
      {
        "label": "Question 4 — Famille de normes du sans fil",
        "stdin": "q:4",
        "expected": "802.11||ieee 802.11"
      },
      {
        "label": "Question 5 — Paires utilisées par le 1000BASE-T",
        "stdin": "q:5",
        "expected": "4||quatre||4 paires"
      }
    ],
    "solution": "[Question 1 — L'appareil unique du logement]\nrouteur sans fil\n\n[Question 2 — Commutateurs par étage dans l'entreprise]\n1\n\n[Question 3 — Famille de normes de l'Ethernet filaire]\n802.3\n\n[Question 4 — Famille de normes du sans fil]\n802.11\n\n[Question 5 — Paires utilisées par le 1000BASE-T]\n4",
    "takeaway": "1) Au domicile (LAN SOHO), un seul « routeur sans fil » remplit les trois rôles : routeur, commutateur et point d'accès.\n2) Dans le LAN d'entreprise : un commutateur et un point d'accès par étage, installés dans la salle technique.\n3) L'Ethernet filaire appartient à la famille IEEE 802.3 (de 10 Mbit/s à 400 Gbit/s).\n4) Les réseaux sans fil (Wi-Fi) commencent par IEEE 802.11.\n5) Le 1000BASE-T utilise quatre paires — contre deux pour 10BASE-T et 100BASE-TX.\nContrôle : 802.3 = filaire, 802.11 = sans fil ; confondre les deux familles est l'erreur classique."
  },
  {
    "id": "cc-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "La baie de brassage du cybercafé",
    "exampleTitle": "Exemple résolu — l'atelier sans Auto-MDIX",
    "goal": "Choisir un câble droit ou croisé selon les interfaces MDI et MDI-X, sans Auto-MDIX.",
    "brief": "<p><strong>Énoncé.</strong> Nadia équipe le cybercafé « Le Port » : 40 postes, un commutateur Cisco 2960 et un routeur d'accès Internet. Pour l'exercice, l'Auto-MDIX est désactivé sur tous les équipements : chaque cordon se choisit à la main. Repères du cours : les interfaces du PC et du routeur sont MDI (émission sur les broches 1-2, réception sur 3-6) ; les interfaces du commutateur sont MDI-X (fonctions inversées). Sans Auto-MDIX : MDI vers MDI-X = câble droit ; deux interfaces de même type = câble croisé.</p><ol><li>Pour relier un poste client au commutateur, quel type de câble : droit ou croisé ?</li><li>Pour relier deux postes entre eux (test de réparation), quel type de câble ?</li><li>Pour relier le commutateur du cybercafé à un second commutateur de la terrasse, quel type de câble ?</li><li>Attention au piège du cours : pour relier un poste au routeur (deux interfaces MDI classiques), quel type de câble ?</li><li>Sur quelles broches une interface MDI classique émet-elle ?</li><li>Par rapport à une interface MDI, que fait une interface MDI-X ? Répondez par un seul verbe.</li></ol>",
    "starter": "# Exercice — La baie de brassage du cybercafé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour les questions 1 à 4, répondez par « droit » ou « croisé ».\n\n[Question 1 — Câble poste vers commutateur]\nA_COMPLETER\n\n[Question 2 — Câble poste vers poste]\nA_COMPLETER\n\n[Question 3 — Câble commutateur vers commutateur]\nA_COMPLETER\n\n[Question 4 — Câble poste vers routeur]\nA_COMPLETER\n\n[Question 5 — Broches d'émission d'une interface MDI]\nA_COMPLETER\n\n[Question 6 — Ce que fait une interface MDI-X]\nA_COMPLETER\n",
    "hints": [
      "Identifiez le type de chaque extrémité avant de choisir le câble : les interfaces des PC et des routeurs d'un côté, celles des commutateurs de l'autre.",
      "La règle sans Auto-MDIX : extrémités de types différents = un brochage ; extrémités de même type = l'autre brochage.",
      "La question 4 est le piège du cours : deux appareils au nom différent peuvent porter des interfaces de même type — mêmes types, mêmes conséquences."
    ],
    "examples": [
      {
        "stdin": "Dans un petit atelier, on relie les équipements sans Auto-MDIX.\n1) PC vers switch : interfaces de types différents (MDI vers MDI-X) → câble droit.\n2) Switch vers switch : deux interfaces MDI-X → câble croisé.\n3) Routeur vers switch : MDI vers MDI-X → câble droit.\n4) L'interface MDI émet sur les broches 1-2 ; l'interface MDI-X inverse ces fonctions : elle émet sur 3-6.",
        "expected": "PC-switch : droit — switch-switch : croisé — routeur-switch : droit — MDI émet sur 1-2, MDI-X inverse",
        "note": "Sans Auto-MDIX, on compare les types d'interfaces (MDI/MDI-X), pas les noms des appareils."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Câble poste vers commutateur",
        "stdin": "q:1",
        "expected": "droit||un câble droit||câble droit"
      },
      {
        "label": "Question 2 — Câble poste vers poste",
        "stdin": "q:2",
        "expected": "croisé||un câble croisé||câble croisé"
      },
      {
        "label": "Question 3 — Câble commutateur vers commutateur",
        "stdin": "q:3",
        "expected": "croisé||un câble croisé||câble croisé"
      },
      {
        "label": "Question 4 — Câble poste vers routeur",
        "stdin": "q:4",
        "expected": "croisé||un câble croisé||câble croisé"
      },
      {
        "label": "Question 5 — Broches d'émission d'une interface MDI",
        "stdin": "q:5",
        "expected": "1-2||1 et 2||broches 1 et 2||les broches 1 et 2||broches 1-2||les broches 1-2||1 2"
      },
      {
        "label": "Question 6 — Ce que fait une interface MDI-X",
        "stdin": "q:6",
        "expected": "inverse||elle inverse||inverser||inverse les fonctions||elle inverse les fonctions"
      }
    ],
    "solution": "[Question 1 — Câble poste vers commutateur]\ndroit\n\n[Question 2 — Câble poste vers poste]\ncroisé\n\n[Question 3 — Câble commutateur vers commutateur]\ncroisé\n\n[Question 4 — Câble poste vers routeur]\ncroisé\n\n[Question 5 — Broches d'émission d'une interface MDI]\n1-2\n\n[Question 6 — Ce que fait une interface MDI-X]\ninverse",
    "takeaway": "1) Poste (MDI) vers commutateur (MDI-X) : types différents → câble droit.\n2) Poste vers poste : deux interfaces MDI → câble croisé.\n3) Commutateur vers commutateur : deux interfaces MDI-X → câble croisé.\n4) Poste vers routeur : PC et routeur portent des interfaces MDI classiques — mêmes types malgré les noms différents → câble croisé. C'est le piège du cours.\n5) Une interface MDI 10/100 classique émet sur les broches 1-2 (et reçoit sur 3-6).\n6) Une interface MDI-X inverse ces fonctions : elle émet sur 3-6 et reçoit sur 1-2.\nContrôle : MDI ↔ MDI-X = droit ; MDI ↔ MDI ou MDI-X ↔ MDI-X = croisé. Avec l'Auto-MDIX compatible et activée, le port peut s'adapter au câble — mais l'exercice la désactive."
  },
  {
    "id": "cc-c3-e3",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Trame captée et table MAC du 2960",
    "exampleTitle": "Exemple résolu — la table d'un autre commutateur",
    "goal": "Lire la trame 802.3 champ par champ et exploiter la table d'adresses MAC d'un Catalyst 2960.",
    "brief": "<p><strong>Énoncé.</strong> Après la mise en service du cybercafé, Nadia capture une trame Ethernet 802.3 et relève la table d'adresses MAC du Catalyst 2960. La trame 802.3 du cours : préambule (7 octets), SFD (1), MAC destination (6), MAC source (6), type (2), données et pad (46 à 1500), FCS (4). Voici la sortie console :</p><pre>Switch# show mac address-table\n          Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n   1    00d0.d3a4.7a0f    DYNAMIC     Fa0/3\n   1    0019.e843.55b1    DYNAMIC     Fa0/5\n   1    000a.f7b2.c9e0    DYNAMIC     Fa0/8\n   1    0050.56b3.e217    DYNAMIC     G0/1</pre><p>Au fond de la salle, un vieux hub 8 ports relie encore 8 postes.</p><ol><li>Combien d'octets occupe le préambule ?</li><li>Combien d'octets occupe l'adresse MAC de destination ?</li><li>Combien d'octets occupe le champ FCS ?</li><li>Quelle est la taille minimale du champ données, pad compris ?</li><li>Combien d'adresses apprises dynamiquement compte la table ?</li><li>Sur quel port le commutateur enverra-t-il une trame destinée à 0019.e843.55b1 ?</li><li>Le hub 8 ports est remplacé par un commutateur 8 ports : combien de domaines de collision y aura-t-il alors ?</li></ol>",
    "starter": "# Exercice — Trame captée et table MAC du 2960\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un nombre ou une expression très courte.\n\n[Question 1 — Taille du préambule]\nA_COMPLETER\n\n[Question 2 — Taille de l'adresse MAC de destination]\nA_COMPLETER\n\n[Question 3 — Taille du champ FCS]\nA_COMPLETER\n\n[Question 4 — Taille minimale du champ données]\nA_COMPLETER\n\n[Question 5 — Adresses dynamiques dans la table]\nA_COMPLETER\n\n[Question 6 — Port de sortie pour 0019.e843.55b1]\nA_COMPLETER\n\n[Question 7 — Domaines de collision après remplacement]\nA_COMPLETER\n",
    "hints": [
      "Récitez la trame 802.3 champ par champ avec les tailles du cours : synchronisation, adresses, type, données, contrôle d'erreurs.",
      "Dans la table MAC, chaque ligne apprise porte le port de sortie ; les lignes DYNAMIQUES se comptent d'un coup d'œil.",
      "Pour les domaines de collision : le concentrateur n'en forme qu'un seul pour tous ses ports ; en duplex intégral, chaque port de commutateur est isolé."
    ],
    "examples": [
      {
        "stdin": "Sur un autre commutateur, la table affiche 2 adresses DYNAMIQUES :\n00d0.ba21.3c44 sur Fa0/2 et 00c0.9f11.ab07 sur G0/1.\n1) Préambule : 7 octets ; SFD : 1 octet.\n2) MAC destination et source : 6 octets chacune ; type : 2 ; FCS : 4.\n3) Données : de 46 à 1500 octets.\n4) Une trame destinée à 00d0.ba21.3c44 sort par Fa0/2.\n5) Un hub 4 ports ne forme qu'un seul domaine de collision.",
        "expected": "préambule 7 — MAC 6 — type 2 — FCS 4 — données 46 à 1500 — Fa0/2 — hub : 1 domaine",
        "note": "À chaque port de commutateur son domaine de collision ; le hub, lui, n'en offre qu'un seul pour tous."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taille du préambule",
        "stdin": "q:1",
        "expected": "7||7 octets"
      },
      {
        "label": "Question 2 — Taille de l'adresse MAC de destination",
        "stdin": "q:2",
        "expected": "6||6 octets"
      },
      {
        "label": "Question 3 — Taille du champ FCS",
        "stdin": "q:3",
        "expected": "4||4 octets"
      },
      {
        "label": "Question 4 — Taille minimale du champ données",
        "stdin": "q:4",
        "expected": "46||46 octets"
      },
      {
        "label": "Question 5 — Adresses dynamiques dans la table",
        "stdin": "q:5",
        "expected": "4||quatre"
      },
      {
        "label": "Question 6 — Port de sortie pour 0019.e843.55b1",
        "stdin": "q:6",
        "expected": "fa0/5||fastethernet0/5||fastethernet 0/5||f0/5"
      },
      {
        "label": "Question 7 — Domaines de collision après remplacement",
        "stdin": "q:7",
        "expected": "8||huit"
      }
    ],
    "solution": "[Question 1 — Taille du préambule]\n7\n\n[Question 2 — Taille de l'adresse MAC de destination]\n6\n\n[Question 3 — Taille du champ FCS]\n4\n\n[Question 4 — Taille minimale du champ données]\n46\n\n[Question 5 — Adresses dynamiques dans la table]\n4\n\n[Question 6 — Port de sortie pour 0019.e843.55b1]\nfa0/5\n\n[Question 7 — Domaines de collision après remplacement]\n8",
    "takeaway": "1) Le préambule occupe 7 octets (synchronisation), suivis du SFD (1 octet).\n2) L'adresse MAC de destination occupe 6 octets — comme l'adresse MAC source.\n3) Le FCS occupe 4 octets : détection d'erreurs vérifiée par la carte réceptrice.\n4) Le champ données va de 46 octets (bourrage par le pad si la charge est plus courte) à 1500 octets.\n5) La table compte 4 lignes DYNAMIC : quatre adresses apprises dynamiquement.\n6) La ligne de 0019.e843.55b1 indique Fa0/5 : le commutateur enverra la trame sur ce port.\n7) Un hub 8 ports forme un seul domaine de collision ; un commutateur 8 ports en duplex intégral en offre un par port : 8 domaines.\nContrôle : préambule 7 + SFD 1 + MAC 6 + 6 + type 2 + FCS 4 = 26 octets d'en-tête et de queue, hors données — et le pad garantit le minimum de 46 octets de données."
  },
  {
    "id": "cc-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Comparer des sous-réseaux IPv4",
    "goal": "Comparer les préfixes calculés à partir de deux adresses et d'un masque commun.",
    "brief": "<p>Pour chaque ligne « nom adresse1 adresse2 /p », les deux adresses utilisent le même préfixe /p. Calculez leur adresse réseau respective ; un segment physique commun ne suffit pas à décider. Indiquez <code>nom : meme reseau</code> si les préfixes sont identiques ou <code>nom : reseaux differents</code> sinon. Terminez par <code>identiques : X/n</code>. Les adresses /31 du dernier cas représentent les deux extrémités d'une liaison point-à-point compatible.</p>",
    "starter": "# Grille d'analyse (cc-c4-e1) — Comparer des sous-réseaux IPv4\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un segment, deux préfixes possibles]\n# Données : 2\n# Données : voisin 192.0.2.1 192.0.2.200 /24\n# Données : autre 192.0.2.1 192.0.3.1 /24\nA_COMPLETER\n\n[Cas 2 — Frontière /25]\n# Données : 2\n# Données : limite 192.0.2.127 192.0.2.128 /25\n# Données : interieur 192.0.2.1 192.0.2.126 /25\nA_COMPLETER\n\n[Cas 3 — Préfixes précis]\n# Données : 3\n# Données : vaste 198.51.100.1 198.51.101.1 /24\n# Données : lien 192.0.2.0 192.0.2.1 /31\n# Données : hote 203.0.113.0 203.0.113.1 /32\nA_COMPLETER\n",
    "hints": [
      "Appliquez le masque à chaque adresse pour obtenir son préfixe réseau.",
      "Comparez les deux préfixes calculés avant de compter les cas identiques.",
      "Appliquez le ET logique bit à bit entre chaque IP et le masque (/24 ou autre) : deux hôtes communiquent directement s ils partagent la même adresse réseau."
    ],
    "examples": [
      {
        "stdin": "2\nmeme 192.0.2.1 192.0.2.2 /24\nautre 192.0.2.1 192.0.3.1 /24\n",
        "expected": "meme : meme reseau\nautre : reseaux differents\nidentiques : 1/2"
      }
    ],
    "tests": [
      {
        "label": "Un segment, deux préfixes possibles",
        "stdin": "cas:1",
        "expected": "voisin : meme reseau\nautre : reseaux differents\nidentiques : 1/2"
      },
      {
        "label": "Frontière /25",
        "stdin": "cas:2",
        "expected": "limite : reseaux differents\ninterieur : meme reseau\nidentiques : 1/2"
      },
      {
        "label": "Préfixes précis",
        "stdin": "cas:3",
        "expected": "vaste : reseaux differents\nlien : meme reseau\nhote : reseaux differents\nidentiques : 1/3"
      }
    ],
    "solution": "[Exemple]\nmeme : meme reseau\nautre : reseaux differents\nidentiques : 1/2\n\n[Cas 1 — Un segment, deux préfixes possibles]\nvoisin : meme reseau\nautre : reseaux differents\nidentiques : 1/2\n\n[Cas 2 — Frontière /25]\nlimite : reseaux differents\ninterieur : meme reseau\nidentiques : 1/2\n\n[Cas 3 — Préfixes précis]\nvaste : reseaux differents\nlien : meme reseau\nhote : reseaux differents\nidentiques : 1/3",
    "takeaway": "À retenir : Comparer les préfixes calculés à partir de deux adresses et d'un masque commun."
  },
  {
    "id": "cc-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Un paquet dans le routeur",
    "exampleTitle": "Exemple résolu — l'imprimante réseau vers le site distant",
    "goal": "Dérouler les quatre étapes du routage interne d'un routeur et la logique de transfert de l'hôte.",
    "brief": "<p><strong>Énoncé.</strong> Un client du cybercafé charge une page chez son fournisseur de jeux : le paquet traverse le routeur R1 de l'établissement. Le cours déroule la logique de routage interne d'un routeur en quatre étapes : <strong>1.</strong> vérifier le FCS de la trame arrivée (erreur → jeter) ; <strong>2.</strong> supprimer l'ancien en-tête et la fin de liaison de données ; <strong>3.</strong> chercher la meilleure route pour l'IP de destination dans la table ; <strong>4.</strong> encapsuler le paquet dans un nouvel en-tête de liaison et transmettre. Lors du transfert IPv4, le TTL diminue et la somme de contrôle de l'en-tête est actualisée.</p><ol><li>Quelle est la toute première vérification du routeur à l'arrivée d'une trame ? (un sigle de trois lettres)</li><li>Que fait le routeur d'une trame dont le FCS révèle une erreur ? Répondez par un seul verbe.</li><li>À l'étape 2, le routeur supprime l'en-tête de quelle couche ?</li><li>Dans quelle table le routeur cherche-t-il la meilleure route ?</li><li>Quel champ de l'en-tête IPv4 diminue à chaque saut ?</li><li>Un hôte du cybercafé envoie un paquet hors de son sous-réseau : à quel équipement le remet-il en premier ?</li></ol>",
    "starter": "# Exercice — Un paquet dans le routeur\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un mot ou une expression très courte.\n\n[Question 1 — Première vérification à l'arrivée d'une trame]\nA_COMPLETER\n\n[Question 2 — Sort d'une trame au FCS erroné]\nA_COMPLETER\n\n[Question 3 — Couche dont l'en-tête est supprimé]\nA_COMPLETER\n\n[Question 4 — Table consultée pour la meilleure route]\nA_COMPLETER\n\n[Question 5 — Champ IPv4 qui diminue à chaque saut]\nA_COMPLETER\n\n[Question 6 — Première destination d'un paquet hors du sous-réseau]\nA_COMPLETER\n",
    "hints": [
      "L'ordre du cours est immuable : contrôle d'intégrité, retrait de l'ancien habillage de liaison, recherche de route, nouvel habillage.",
      "Une trame dont le contrôle échoue ne va pas plus loin ; à chaque saut, un champ de l'en-tête IPv4 décrémente et la somme de contrôle est recalculée.",
      "Pour la dernière question, rappelez-vous la logique de transfert de l'hôte : tout paquet destiné à un autre sous-réseau part vers l'équipement qui mène ailleurs."
    ],
    "examples": [
      {
        "stdin": "Une imprimante réseau envoie un document vers un site distant.\n1) Le routeur vérifie d'abord le FCS : si la trame est fautive, il la jette — le routage ne commence même pas.\n2) Il désencapsule : l'en-tête de liaison part, le paquet IP reste.\n3) Il consulte sa table de routage : meilleure route, interface sortante, saut suivant.\n4) Il réencapsule le paquet dans une trame adaptée à la liaison sortante ; le TTL a baissé d'une unité.",
        "expected": "FCS d'abord, trame fautive jetée — désencapsulation — table de routage — réencapsulation, TTL en moins",
        "note": "FCS avant tout : une trame erronée est jetée avant la moindre recherche de route."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Première vérification à l'arrivée d'une trame",
        "stdin": "q:1",
        "expected": "fcs||le fcs"
      },
      {
        "label": "Question 2 — Sort d'une trame au FCS erroné",
        "stdin": "q:2",
        "expected": "jette||il jette||jeter"
      },
      {
        "label": "Question 3 — Couche dont l'en-tête est supprimé",
        "stdin": "q:3",
        "expected": "liaison de données||la liaison de données||liaison||couche 2||la couche 2||2||la couche liaison de données"
      },
      {
        "label": "Question 4 — Table consultée pour la meilleure route",
        "stdin": "q:4",
        "expected": "table de routage||la table de routage||routage||sa table de routage"
      },
      {
        "label": "Question 5 — Champ IPv4 qui diminue à chaque saut",
        "stdin": "q:5",
        "expected": "ttl||le ttl"
      },
      {
        "label": "Question 6 — Première destination d'un paquet hors du sous-réseau",
        "stdin": "q:6",
        "expected": "routeur par défaut||son routeur par défaut||le routeur par défaut||passerelle||sa passerelle||la passerelle||gateway"
      }
    ],
    "solution": "[Question 1 — Première vérification à l'arrivée d'une trame]\nfcs\n\n[Question 2 — Sort d'une trame au FCS erroné]\njette\n\n[Question 3 — Couche dont l'en-tête est supprimé]\nliaison de données\n\n[Question 4 — Table consultée pour la meilleure route]\ntable de routage\n\n[Question 5 — Champ IPv4 qui diminue à chaque saut]\nttl\n\n[Question 6 — Première destination d'un paquet hors du sous-réseau]\nrouteur par défaut",
    "takeaway": "1) Le routeur vérifie d'abord le FCS de la trame arrivée : trame erronée = trame jetée.\n2) Il jette la trame : aucune désencapsulation, aucune recherche de route.\n3) À l'étape 2, il supprime l'ancien en-tête et la fin de liaison de données (couche 2) : seul le paquet IP reste.\n4) Il cherche la meilleure route dans sa table de routage, qui donne l'interface sortante et le saut suivant.\n5) Le TTL diminue d'au moins une unité à chaque saut — et la somme de contrôle de l'en-tête est recalculée.\n6) L'hôte remet le paquet à son routeur par défaut : la destination de tout paquet hors du sous-réseau local.\nContrôle : FCS → désencapsulation → table → réencapsulation ; sans NAT ni tunnel, les adresses IP restent généralement les mêmes de bout en bout."
  },
  {
    "id": "cc-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Trois agences sur un WAN",
    "exampleTitle": "Exemple résolu — deux sites sur ligne louée",
    "goal": "Décrire les deux WAN du cours, la taille de l'en-tête IPv4 et l'apprentissage des routes par protocole de routage.",
    "brief": "<p><strong>Énoncé.</strong> La PME de Nadia interconnecte ses trois agences. La première version du WAN relie les routeurs par des lignes louées ; la direction migre ensuite vers l'Ethernet WAN. Sur chaque routeur, un protocole de routage est activé : chaque routeur ajoute d'abord ses routes connectées, reçoit ensuite les annonces de ses voisins (mises à jour de routage), puis installe la meilleure route selon sa métrique. L'en-tête IPv4 mesure 20 octets au minimum, jusqu'à 60 octets avec les options ; les adresses source et destination occupent chacune 32 bits.</p><ol><li>Quel protocole de liaison de données le cours associe-t-il aux lignes louées ?</li><li>Comment s'appelle l'Ethernet WAN du cours, « plus d'actualité » ? (un sigle)</li><li>Quelle est la taille minimale de l'en-tête IPv4, en octets ?</li><li>Quelle est sa taille maximale, options comprises, en octets ?</li><li>Comment s'appellent les routes que chaque routeur ajoute sans protocole de routage, dès la configuration de ses interfaces ?</li><li>Quand plusieurs routes vers le même réseau sont apprises, quel critère départage la meilleure ?</li></ol>",
    "starter": "# Exercice — Trois agences sur un WAN\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un mot, un sigle ou un nombre.\n\n[Question 1 — Protocole de liaison des lignes louées]\nA_COMPLETER\n\n[Question 2 — L'Ethernet WAN, plus d'actualité]\nA_COMPLETER\n\n[Question 3 — Taille minimale de l'en-tête IPv4]\nA_COMPLETER\n\n[Question 4 — Taille maximale de l'en-tête IPv4]\nA_COMPLETER\n\n[Question 5 — Routes ajoutées sans protocole de routage]\nA_COMPLETER\n\n[Question 6 — Critère de choix de la meilleure route]\nA_COMPLETER\n",
    "hints": [
      "Deux manières de bâtir le WAN : la liaison louée avec son protocole de liaison, et l'Ethernet WAN cité comme plus d'actualité.",
      "L'en-tête IPv4 a une taille de base et un plafond avec les options ; TTL et somme de contrôle s'ajustent à chaque transfert.",
      "L'apprentissage d'un protocole de routage suit trois temps : ce qui est directement raccordé, ce que les voisins annoncent, puis le critère de choix."
    ],
    "examples": [
      {
        "stdin": "Une société relie deux sites par une ligne louée, puis la migre.\n1) Sur la ligne louée, le routeur encapsule le paquet IP dans une trame HDLC.\n2) L'Ethernet WAN (EoMPLS) se comporte comme un gigantesque commutateur entre les sites.\n3) L'en-tête IPv4 : 20 octets sans options, 60 au maximum.\n4) Sans NAT ni tunnel, les adresses IP restent généralement les mêmes de bout en bout.",
        "expected": "HDLC sur la ligne louée — EoMPLS : un grand commutateur — en-tête 20 à 60 octets — IP inchangées sans NAT",
        "note": "À chaque saut la trame change ; l'en-tête IPv4, lui, ne fait que s'ajuster (TTL, somme de contrôle)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Protocole de liaison des lignes louées",
        "stdin": "q:1",
        "expected": "hdlc||ppp||hdlc ou ppp"
      },
      {
        "label": "Question 2 — L'Ethernet WAN, plus d'actualité",
        "stdin": "q:2",
        "expected": "eompls"
      },
      {
        "label": "Question 3 — Taille minimale de l'en-tête IPv4",
        "stdin": "q:3",
        "expected": "20||20 octets"
      },
      {
        "label": "Question 4 — Taille maximale de l'en-tête IPv4",
        "stdin": "q:4",
        "expected": "60||60 octets"
      },
      {
        "label": "Question 5 — Routes ajoutées sans protocole de routage",
        "stdin": "q:5",
        "expected": "connectées||routes connectées||connectée||route connectée||les routes connectées"
      },
      {
        "label": "Question 6 — Critère de choix de la meilleure route",
        "stdin": "q:6",
        "expected": "métrique||la métrique||metrique||la metrique"
      }
    ],
    "solution": "[Question 1 — Protocole de liaison des lignes louées]\nhdlc\n\n[Question 2 — L'Ethernet WAN, plus d'actualité]\neompls\n\n[Question 3 — Taille minimale de l'en-tête IPv4]\n20\n\n[Question 4 — Taille maximale de l'en-tête IPv4]\n60\n\n[Question 5 — Routes ajoutées sans protocole de routage]\nconnectées\n\n[Question 6 — Critère de choix de la meilleure route]\nmétrique",
    "takeaway": "1) Les lignes louées utilisent HDLC (ou PPP) comme protocole de liaison : le routeur y encapsule le paquet IP dans une trame HDLC.\n2) L'Ethernet WAN « plus d'actualité » est l'EoMPLS (Ethernet over MPLS) : le WAN se comporte comme un gigantesque commutateur Ethernet entre les sites.\n3) L'en-tête IPv4 mesure 20 octets au minimum.\n4) Avec les options, il monte jusqu'à 60 octets.\n5) Les routes connectées : ajoutées sans protocole de routage, dès la configuration des interfaces du routeur.\n6) La métrique départage les routes apprises : la meilleure route entre dans la table.\nContrôle : routes connectées → annonces des voisins → meilleure route selon la métrique : les trois temps de l'apprentissage, dans l'ordre."
  },
  {
    "id": "cc-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les trois modes de la CLI",
    "goal": "Distinguer les commandes disponibles dans les modes utilisateur, privilégié et configuration globale d'une CLI Cisco.",
    "brief": "<p>Dans ce modèle pédagogique simplifié, chaque ligne indépendante <code>commande mode</code> indique le mode courant avant la commande : <code>user</code> pour EXEC utilisateur, <code>enable</code> pour EXEC privilégié et <code>config</code> pour la configuration globale. Les codes de commandes sont <code>enable</code>, <code>configure</code> (pour <code>configure terminal</code>), <code>exit</code>, <code>showversion</code> (pour <code>show version</code>) et <code>reload</code>.</p><p>Dans les cas proposés, <code>enable</code> ouvre le mode privilégié depuis <code>user</code> ; <code>configure</code> ouvre la configuration globale depuis <code>enable</code> ; <code>exit</code> quitte le mode courant (en <code>user</code>, il ferme la session). <code>showversion</code> est directement disponible en <code>user</code> comme en <code>enable</code>, sans changer de mode. <code>reload</code> est proposé en mode <code>enable</code>, sous réserve des droits nécessaires. Les éventuelles variantes telles que <code>do show version</code> en configuration et les commandes <code>enable</code> redondantes ne sont pas évaluées ici.</p><p>Pour chaque ligne, indiquez <code>commande : OK</code> si la commande directe est disponible dans le mode indiqué, sinon <code>commande : REFUSE</code>, puis <code>valides : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c5-e1) — Les trois modes de la CLI\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Escalade complète]\n# Données : 3\n# Données : enable user\n# Données : configure enable\n# Données : exit config\nA_COMPLETER\n\n[Cas 2 — Commandes interdites]\n# Données : 3\n# Données : reload user\n# Données : configure user\n# Données : showversion config\nA_COMPLETER\n\n[Cas 3 — Série mixte]\n# Données : 4\n# Données : showversion user\n# Données : configure config\n# Données : exit enable\n# Données : reload enable\nA_COMPLETER\n\n[Cas 4 — Modes et sortie]\n# Données : 4\n# Données : showversion enable\n# Données : showversion config\n# Données : reload enable\n# Données : exit user\nA_COMPLETER\n",
    "hints": [
      "show version est accessible dans les deux modes EXEC : user et enable.",
      "Le mode indiqué est celui avant la commande ; exit quitte le mode courant.",
      "N acceptez « enable » ou « showversion » qu aux niveaux autorisés (user pour enable, user/enable pour showversion, enable pour configure/reload) et « exit » partout."
    ],
    "examples": [
      {
        "stdin": "3\nenable user\nconfigure enable\nshowversion enable\n",
        "expected": "enable : OK\nconfigure : OK\nshowversion : OK\nvalides : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Escalade complète",
        "stdin": "cas:1",
        "expected": "enable : OK\nconfigure : OK\nexit : OK\nvalides : 3/3"
      },
      {
        "label": "Commandes interdites",
        "stdin": "cas:2",
        "expected": "reload : REFUSE\nconfigure : REFUSE\nshowversion : REFUSE\nvalides : 0/3"
      },
      {
        "label": "Série mixte",
        "stdin": "cas:3",
        "expected": "showversion : OK\nconfigure : REFUSE\nexit : OK\nreload : OK\nvalides : 3/4"
      },
      {
        "label": "Modes et sortie",
        "stdin": "cas:4",
        "expected": "showversion : OK\nshowversion : REFUSE\nreload : OK\nexit : OK\nvalides : 3/4"
      }
    ],
    "solution": "[Exemple]\nenable : OK\nconfigure : OK\nshowversion : OK\nvalides : 3/3\n\n[Cas 1 — Escalade complète]\nenable : OK\nconfigure : OK\nexit : OK\nvalides : 3/3\n\n[Cas 2 — Commandes interdites]\nreload : REFUSE\nconfigure : REFUSE\nshowversion : REFUSE\nvalides : 0/3\n\n[Cas 3 — Série mixte]\nshowversion : OK\nconfigure : REFUSE\nexit : OK\nreload : OK\nvalides : 3/4\n\n[Cas 4 — Modes et sortie]\nshowversion : OK\nshowversion : REFUSE\nreload : OK\nexit : OK\nvalides : 3/4",
    "takeaway": "À retenir : Distinguer les commandes disponibles dans les modes utilisateur, privilégié et configuration globale d'une CLI Cisco."
  },
  {
    "id": "cc-c5-e2",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Le diagnostic de l'accès distant",
    "exampleTitle": "Exemple résolu — le diagnostic d'un autre commutateur",
    "goal": "Choisir l'accès à la CLI (console, Telnet, SSH) et mobiliser les commandes show de diagnostic.",
    "brief": "<p><strong>Énoncé.</strong> Depuis la mise en route du cybercafé, le gérant administre le 2960 depuis son bureau. Ce matin, plus rien : la connexion distante échoue. Nadia mène le diagnostic. Le cours classe les trois accès : la console (port physique dédié RJ-45 ou USB mini-B, avec un émulateur comme Putty), Telnet (client qui traverse le réseau IP mais transmet tout en clair, mots de passe compris : bien en laboratoire, dangereux en production) et SSH (chiffre tout : l'option sérieuse). Pour inspecter l'équipement, elle utilise aussi les commandes show : show running-config (configuration active, en RAM), show startup-config (configuration de démarrage, en NVRAM) et show version (version d'IOS).</p><ol><li>Quel accès à la CLI exige une connexion physique au port dédié ?</li><li>Quel accès distant transmet tout en clair, mots de passe compris ?</li><li>Quel accès distant chiffre toutes les données ?</li><li>Quelle commande affiche la configuration courante ?</li><li>Quelle commande affiche la configuration de démarrage ?</li><li>Quelle commande affiche la version d'IOS ?</li></ol>",
    "starter": "# Exercice — Le diagnostic de l'accès distant\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nom exact de l'accès ou de la commande, sans invite.\n\n[Question 1 — Accès qui exige une connexion physique]\nA_COMPLETER\n\n[Question 2 — Accès distant qui transmet en clair]\nA_COMPLETER\n\n[Question 3 — Accès distant qui chiffre tout]\nA_COMPLETER\n\n[Question 4 — Commande qui affiche la configuration courante]\nA_COMPLETER\n\n[Question 5 — Commande qui affiche la configuration de démarrage]\nA_COMPLETER\n\n[Question 6 — Commande qui affiche la version d'IOS]\nA_COMPLETER\n",
    "hints": [
      "Trois accès, trois contraintes : l'un exige d'être physiquement devant l'équipement, l'autre expose tout sur le réseau, le troisième protège tout.",
      "Les commandes d'inspection portent le nom de ce qu'elles montrent : la configuration active, la configuration de démarrage, la version du système.",
      "Répondez par le nom exact de l'accès ou de la commande IOS — la configuration active est celle de la RAM, la configuration de démarrage celle de la NVRAM."
    ],
    "examples": [
      {
        "stdin": "Le même diagnostic sur un autre commutateur.\n1) Le câble console (RJ-45 ou USB mini-B) exige d'être physiquement devant l'équipement.\n2) Telnet reste un outil de laboratoire : tout passe en clair.\n3) SSH est l'option de production : tout est chiffré, mots de passe compris.\n4) Pour comparer l'actif et le démarrage : show running-config, puis show startup-config.",
        "expected": "console : physique — Telnet : clair — SSH : chiffré — show running-config et show startup-config",
        "note": "Console (physique), Telnet (clair), SSH (chiffré) : la question tombe à chaque examen."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Accès qui exige une connexion physique",
        "stdin": "q:1",
        "expected": "console||la console"
      },
      {
        "label": "Question 2 — Accès distant qui transmet en clair",
        "stdin": "q:2",
        "expected": "telnet"
      },
      {
        "label": "Question 3 — Accès distant qui chiffre tout",
        "stdin": "q:3",
        "expected": "ssh"
      },
      {
        "label": "Question 4 — Commande qui affiche la configuration courante",
        "stdin": "q:4",
        "expected": "show running-config||show run||show running config"
      },
      {
        "label": "Question 5 — Commande qui affiche la configuration de démarrage",
        "stdin": "q:5",
        "expected": "show startup-config||show start||show startup config"
      },
      {
        "label": "Question 6 — Commande qui affiche la version d'IOS",
        "stdin": "q:6",
        "expected": "show version"
      }
    ],
    "solution": "[Question 1 — Accès qui exige une connexion physique]\nconsole\n\n[Question 2 — Accès distant qui transmet en clair]\ntelnet\n\n[Question 3 — Accès distant qui chiffre tout]\nssh\n\n[Question 4 — Commande qui affiche la configuration courante]\nshow running-config\n\n[Question 5 — Commande qui affiche la configuration de démarrage]\nshow startup-config\n\n[Question 6 — Commande qui affiche la version d'IOS]\nshow version",
    "takeaway": "1) La console exige une connexion physique au port dédié (RJ-45 bleu ou USB mini-B), avec un émulateur de terminal.\n2) Telnet transmet tout en clair, mots de passe compris : à réserver au laboratoire.\n3) SSH chiffre toutes les données, mots de passe compris : l'option sérieuse pour la production.\n4) show running-config affiche la configuration courante (active), celle qui vit en RAM.\n5) show startup-config affiche la configuration de démarrage, celle que la NVRAM conserve.\n6) show version affiche la version d'IOS.\nContrôle : le diagnostic de Nadia conclut au même scénario dans tous les cas : la console reste le recours quand l'accès distant échoue."
  },
  {
    "id": "cc-c5-e3",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Sauvegarder avant l'orage",
    "exampleTitle": "Exemple résolu — le routeur du stagiaire",
    "goal": "Placer les fichiers du commutateur dans les quatre mémoires et sauvegarder la configuration avant une coupure.",
    "brief": "<p><strong>Énoncé.</strong> Un orage est annoncé sur le port : l'alimentation du cybercafé risque de sauter. Nadia vient de terminer la configuration du 2960 ; si le commutateur s'éteint maintenant, la configuration active — la running-config, en RAM — sera perdue. Le cours place quatre mémoires dans le commutateur : la RAM (stockage de travail, perdu à l'extinction), la flash (stocke les images IOS), la ROM (programme d'amorçage) et la NVRAM (RAM non volatile qui conserve la configuration de démarrage). Deux fichiers, deux vies : la running-config (active, modifiée en direct) et la startup-config (initiale, utilisée à chaque recharge).</p><ol><li>Dans quelle mémoire vit la running-config ?</li><li>Dans quelle mémoire vit la startup-config ?</li><li>Dans quelle mémoire est stockée l'image IOS ?</li><li>Quel programme d'amorçage, logé en ROM, trouve et charge l'IOS au démarrage ?</li><li>Quelle commande sauvegarde la configuration active vers la configuration de démarrage ?</li><li>Si l'orage coupe l'alimentation avant la sauvegarde, que perd le commutateur ?</li></ol>",
    "starter": "# Exercice — Sauvegarder avant l'orage\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par un mot ou la commande exacte.\n\n[Question 1 — Mémoire de la running-config]\nA_COMPLETER\n\n[Question 2 — Mémoire de la startup-config]\nA_COMPLETER\n\n[Question 3 — Mémoire de l'image IOS]\nA_COMPLETER\n\n[Question 4 — Programme d'amorçage de la ROM]\nA_COMPLETER\n\n[Question 5 — Commande de sauvegarde de la configuration]\nA_COMPLETER\n\n[Question 6 — Ce que la coupure fait perdre]\nA_COMPLETER\n",
    "hints": [
      "Quatre mémoires : le stockage de travail volatile, la mémoire des images du système, la mémoire morte du démarrage, et la mémoire non volatile.",
      "La configuration active se modifie en direct mais ne survit pas à une coupure ; sa jumelle de démarrage, elle, est conservée.",
      "Le réflexe du cours est une commande copy qui duplique l'active vers la démarrage ; le programme de démarrage en ROM porte un nom anglais."
    ],
    "examples": [
      {
        "stdin": "Un stagiaire prépare un routeur de laboratoire avant une coupure.\n1) La running-config vit en RAM, modifiée en direct.\n2) La startup-config vit en NVRAM : c'est elle qui est chargée au démarrage.\n3) L'image IOS vient de la flash ; le bootstrap vient de la ROM.\n4) Pour repartir de zéro : erase startup-config, puis reload.",
        "expected": "running-config : RAM — startup-config : NVRAM — IOS : flash — bootstrap : ROM — erase startup-config puis reload",
        "note": "copy running-config startup-config est le réflexe avant toute coupure : la RAM ne survit pas à l'extinction."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Mémoire de la running-config",
        "stdin": "q:1",
        "expected": "ram||la ram"
      },
      {
        "label": "Question 2 — Mémoire de la startup-config",
        "stdin": "q:2",
        "expected": "nvram||la nvram"
      },
      {
        "label": "Question 3 — Mémoire de l'image IOS",
        "stdin": "q:3",
        "expected": "flash||la flash"
      },
      {
        "label": "Question 4 — Programme d'amorçage de la ROM",
        "stdin": "q:4",
        "expected": "bootstrap||le bootstrap"
      },
      {
        "label": "Question 5 — Commande de sauvegarde de la configuration",
        "stdin": "q:5",
        "expected": "copy running-config startup-config||copy run start||write memory||wr||copy running-config startup config"
      },
      {
        "label": "Question 6 — Ce que la coupure fait perdre",
        "stdin": "q:6",
        "expected": "la running-config||running-config||la configuration active||configuration active||sa configuration active"
      }
    ],
    "solution": "[Question 1 — Mémoire de la running-config]\nram\n\n[Question 2 — Mémoire de la startup-config]\nnvram\n\n[Question 3 — Mémoire de l'image IOS]\nflash\n\n[Question 4 — Programme d'amorçage de la ROM]\nbootstrap\n\n[Question 5 — Commande de sauvegarde de la configuration]\ncopy running-config startup-config\n\n[Question 6 — Ce que la coupure fait perdre]\nla running-config",
    "takeaway": "1) La running-config vit en RAM : stockage de travail, perdu à l'extinction.\n2) La startup-config vit en NVRAM : RAM non volatile, conservée.\n3) L'image IOS est stockée en flash (emplacement par défaut du démarrage).\n4) Le bootstrap, programme d'amorçage logé en ROM, trouve et charge l'IOS.\n5) copy running-config startup-config sauvegarde la configuration active vers la configuration de démarrage.\n6) Sans sauvegarde, la coupure perd la running-config — la configuration active, non copiée en NVRAM.\nContrôle : RAM → running-config ; NVRAM → startup-config ; flash → IOS ; ROM → bootstrap. IOS n'a pas de commande qui efface la running-config : on efface la startup (erase startup-config) puis on recharge."
  },
  {
    "id": "cc-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Sécuriser les accès",
    "goal": "Associer chaque protection de la CLI à sa commande de configuration.",
    "brief": "<p>Analysez chaque ligne proposée « protection commande » : commande est un code parmi <code>passwordlogin</code> (mot de passe simple + login), <code>loginlocal</code> (noms d'utilisateurs locaux), <code>enablesecret</code> ou <code>transportinput</code>. Protections du support : <code>passwordlogin</code> protège console et vty avec un mot de passe partagé ; <code>loginlocal</code> exige un couple utilisateur/mot de passe local ; <code>enablesecret</code> protège le mode enable ; <code>transportinput</code> choisit les protocoles vty (ssh, telnet, all). Pour chaque ligne, indiquez <code>protection : OK</code> ou <code>protection : ERREUR</code>, puis <code>conformes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c6-e1) — Sécuriser les accès\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre]\n# Données : 4\n# Données : passwordlogin passwordlogin\n# Données : loginlocal loginlocal\n# Données : enablesecret enablesecret\n# Données : transportinput transportinput\nA_COMPLETER\n\n[Cas 2 — Deux erreurs]\n# Données : 2\n# Données : loginlocal passwordlogin\n# Données : enablesecret transportinput\nA_COMPLETER\n\n[Cas 3 — Série mixte]\n# Données : 3\n# Données : enablesecret enablesecret\n# Données : passwordlogin transportinput\n# Données : transportinput transportinput\nA_COMPLETER\n",
    "hints": [
      "passwordlogin → password + login ; loginlocal → login local ; enablesecret → enable secret ; transportinput → transport input.",
      "Le bilan sort après la boucle.",
      "Comparez mot à mot la commande relevée et la règle de sécurisation attendue (« passwordlogin », « loginlocal », « transportinputssh ») avant le total."
    ],
    "examples": [
      {
        "stdin": "2\npasswordlogin passwordlogin\ntransportinput enablesecret\n",
        "expected": "passwordlogin : OK\ntransportinput : ERREUR\nconformes : 1/2"
      }
    ],
    "tests": [
      {
        "label": "Les quatre",
        "stdin": "cas:1",
        "expected": "passwordlogin : OK\nloginlocal : OK\nenablesecret : OK\ntransportinput : OK\nconformes : 4/4"
      },
      {
        "label": "Deux erreurs",
        "stdin": "cas:2",
        "expected": "loginlocal : ERREUR\nenablesecret : ERREUR\nconformes : 0/2"
      },
      {
        "label": "Série mixte",
        "stdin": "cas:3",
        "expected": "enablesecret : OK\npasswordlogin : ERREUR\ntransportinput : OK\nconformes : 2/3"
      }
    ],
    "solution": "[Exemple]\npasswordlogin : OK\ntransportinput : ERREUR\nconformes : 1/2\n\n[Cas 1 — Les quatre]\npasswordlogin : OK\nloginlocal : OK\nenablesecret : OK\ntransportinput : OK\nconformes : 4/4\n\n[Cas 2 — Deux erreurs]\nloginlocal : ERREUR\nenablesecret : ERREUR\nconformes : 0/2\n\n[Cas 3 — Série mixte]\nenablesecret : OK\npasswordlogin : ERREUR\ntransportinput : OK\nconformes : 2/3",
    "takeaway": "À retenir : Associer chaque protection de la CLI à sa commande de configuration."
  },
  {
    "id": "cc-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "IPv4 sur le commutateur",
    "goal": "Dérouler la configuration IPv4 de gestion : SVI, adresse/masque, no shutdown, passerelle.",
    "brief": "<p>Analysez chaque ligne proposée « etape commande » : etape est un numéro de 1 à 5 et commande un code parmi <code>svi</code>, <code>ipaddress</code>, <code>noshutdown</code>, <code>gateway</code> ou <code>nameserver</code>. Étapes du support : 1 <code>interface vlan 1</code> (la SVI), 2 <code>ip address</code> (adresse + masque), 3 <code>no shutdown</code>, 4 <code>ip default-gateway</code> (obligatoire pour parler hors du sous-réseau), 5 <code>ip name-server</code> (facultatif, DNS). Pour chaque ligne, indiquez <code>etape N : OK</code> ou <code>etape N : NON</code>, puis <code>justes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c6-e2) — IPv4 sur le commutateur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Ordre parfait]\n# Données : 5\n# Données : 1 svi\n# Données : 2 ipaddress\n# Données : 3 noshutdown\n# Données : 4 gateway\n# Données : 5 nameserver\nA_COMPLETER\n\n[Cas 2 — Deux inversions]\n# Données : 3\n# Données : 1 svi\n# Données : 2 gateway\n# Données : 3 ipaddress\nA_COMPLETER\n\n[Cas 3 — Cœur de config]\n# Données : 3\n# Données : 2 ipaddress\n# Données : 3 noshutdown\n# Données : 4 gateway\nA_COMPLETER\n",
    "hints": [
      "1-svi, 2-ipaddress, 3-noshutdown, 4-gateway, 5-nameserver : l'ordre du support.",
      "L'étape 5 est facultative mais garde sa place dans l'ordre.",
      "Respectez l ordre canonique Cisco SVI : interface vlan, ip address + masque, no shutdown, ip default-gateway, puis ip name-server."
    ],
    "examples": [
      {
        "stdin": "3\n1 svi\n2 ipaddress\n4 gateway\n",
        "expected": "etape 1 : OK\netape 2 : OK\netape 4 : OK\njustes : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Ordre parfait",
        "stdin": "cas:1",
        "expected": "etape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netape 5 : OK\njustes : 5/5"
      },
      {
        "label": "Deux inversions",
        "stdin": "cas:2",
        "expected": "etape 1 : OK\netape 2 : NON\netape 3 : NON\njustes : 1/3"
      },
      {
        "label": "Cœur de config",
        "stdin": "cas:3",
        "expected": "etape 2 : OK\netape 3 : OK\netape 4 : OK\njustes : 3/3"
      }
    ],
    "solution": "[Exemple]\netape 1 : OK\netape 2 : OK\netape 4 : OK\njustes : 3/3\n\n[Cas 1 — Ordre parfait]\netape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netape 5 : OK\njustes : 5/5\n\n[Cas 2 — Deux inversions]\netape 1 : OK\netape 2 : NON\netape 3 : NON\njustes : 1/3\n\n[Cas 3 — Cœur de config]\netape 2 : OK\netape 3 : OK\netape 4 : OK\njustes : 3/3",
    "takeaway": "À retenir : Dérouler la configuration IPv4 de gestion : SVI, adresse/masque, no shutdown, passerelle."
  },
  {
    "id": "cc-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le confort du laboratoire",
    "goal": "Simuler les trois commandes de confort : logging synchronous, exec-timeout, no ip domain-lookup.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Dans ce modèle fictif : sans <code>s</code>, les messages syslog perturbent la saisie ; sans <code>t</code>, la session inactive expire après 10 minutes ; sans <code>d</code>, une commande mal tapée entraîne une minute d'attente DNS. Ces durées sont des hypothèses : elles dépendent de la configuration et de la plateforme, et la grille ne simule pas un commutateur réel. Pour chaque session, indiquez <code>session : fluide</code> si les trois réglages sont présents, sinon <code>session : gene (motif X)</code> où X vaut <code>syslog</code>, <code>timeout</code> ou <code>dns</code> (premier motif manquant dans l'ordre s, t, d). Terminez par <code>sessions fluides : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c6-e3) — Le confort du laboratoire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Parfaites]\n# Données : 2\n# Données : lab1 std\n# Données : lab2 std\nA_COMPLETER\n\n[Cas 2 — Sans timeout]\n# Données : 2\n# Données : lab1 sd\n# Données : lab2 std\nA_COMPLETER\n\n[Cas 3 — Aucun réglage]\n# Données : 3\n# Données : lab1 -\n# Données : lab2 d\n# Données : lab3 t\nA_COMPLETER\n",
    "hints": [
      "Parcourez la suite caractère par caractère : s, t, d dans cet ordre.",
      "Signale le PREMIER réglage manquant ; le tiret vaut absence de tout réglage.",
      "Reliez chaque réglage de confort à son effet (no ip domain-lookup évite le blocage DNS, logging synchronous évite l entrelacement, exec-timeout règle l inactivité)."
    ],
    "examples": [
      {
        "stdin": "3\ns1 std\ns2 st\ns3 -\n",
        "expected": "s1 : fluide\ns2 : gene (motif dns)\ns3 : gene (motif syslog)\nsessions fluides : 1/3"
      }
    ],
    "tests": [
      {
        "label": "Parfaites",
        "stdin": "cas:1",
        "expected": "lab1 : fluide\nlab2 : fluide\nsessions fluides : 2/2"
      },
      {
        "label": "Sans timeout",
        "stdin": "cas:2",
        "expected": "lab1 : gene (motif timeout)\nlab2 : fluide\nsessions fluides : 1/2"
      },
      {
        "label": "Aucun réglage",
        "stdin": "cas:3",
        "expected": "lab1 : gene (motif syslog)\nlab2 : gene (motif syslog)\nlab3 : gene (motif syslog)\nsessions fluides : 0/3"
      }
    ],
    "solution": "[Exemple]\ns1 : fluide\ns2 : gene (motif dns)\ns3 : gene (motif syslog)\nsessions fluides : 1/3\n\n[Cas 1 — Parfaites]\nlab1 : fluide\nlab2 : fluide\nsessions fluides : 2/2\n\n[Cas 2 — Sans timeout]\nlab1 : gene (motif timeout)\nlab2 : fluide\nsessions fluides : 1/2\n\n[Cas 3 — Aucun réglage]\nlab1 : gene (motif syslog)\nlab2 : gene (motif syslog)\nlab3 : gene (motif syslog)\nsessions fluides : 0/3",
    "takeaway": "À retenir : Simuler les trois commandes de confort : logging synchronous, exec-timeout, no ip domain-lookup."
  }
];
