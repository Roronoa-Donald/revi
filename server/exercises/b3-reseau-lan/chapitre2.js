'use strict';

module.exports = [
  {
    "id": "lan3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La négociation des cinq agrégats du Crédit du Val",
    "exampleTitle": "Exemple résolu — les agrégats du lycée technique de Vimeux",
    "goal": "Prédire la formation d'un port-channel selon les modes de négociation LACP (active/passive), PAgP (desirable/auto) et le mode statique on.",
    "brief": "<p><strong>Énoncé.</strong> Le Crédit du Val, banque régionale de 40 agences, relie ses étages et son bloc serveurs au commutateur central de la salle machine. Pour chaque liaison candidate, le technicien note le mode d'agrégation configuré sur chaque extrémité :</p><table><tr><th>Agrégat</th><th>Extrémité A</th><th>Extrémité B</th></tr><tr><th>Po-A (vers le bloc serveurs)</th><td>active</td><td>passive</td></tr><tr><th>Po-B (vers l'étage 2)</th><td>active</td><td>on</td></tr><tr><th>Po-C (vers l'étage 3)</th><td>desirable</td><td>auto</td></tr><tr><th>Po-D (vers la salle des archives)</th><td>passive</td><td>passive</td></tr><tr><th>Po-E (vers le coffre-fort numérique)</th><td>on</td><td>on</td></tr></table><p>Rappel du cours : LACP (norme 802.3ad) négocie entre les modes active et passive ; PAgP (propriétaire Cisco) négocie entre les modes desirable et auto ; le mode on force l'agrégation sans aucune négociation. Un canal se forme entre deux ports LACP si au moins une extrémité est active, entre deux ports PAgP si au moins une extrémité est desirable, et entre deux ports on ; aucune combinaison mixte (LACP contre PAgP, ou négociation contre on) ne forme de canal.</p><p>La question 1 appelle le nom du protocole ; les questions 2 à 6 appellent « oui » ou « non ».</p><ol><li>À quel protocole de négociation appartiennent les modes « active » et « passive » ?</li><li>L'agrégat Po-A (active + passive) forme-t-il un canal ?</li><li>L'agrégat Po-B (active + on) forme-t-il un canal ?</li><li>L'agrégat Po-C (desirable + auto) forme-t-il un canal ?</li><li>L'agrégat Po-D (passive + passive) forme-t-il un canal ?</li><li>L'agrégat Po-E (on + on) forme-t-il un canal ?</li></ol>",
    "starter": "# Exercice — La négociation des cinq agrégats du Crédit du Val\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le nom du protocole. Questions 2 à 6 : oui ou non.\n\n[Question 1 — Protocole des modes active et passive]\nA_COMPLETER\n\n[Question 2 — Po-A (active + passive) : canal formé ?]\nA_COMPLETER\n\n[Question 3 — Po-B (active + on) : canal formé ?]\nA_COMPLETER\n\n[Question 4 — Po-C (desirable + auto) : canal formé ?]\nA_COMPLETER\n\n[Question 5 — Po-D (passive + passive) : canal formé ?]\nA_COMPLETER\n\n[Question 6 — Po-E (on + on) : canal formé ?]\nA_COMPLETER\n",
    "hints": [
      "Identifiez d'abord la famille de chaque mode : active/passive appartiennent à LACP, desirable/auto à PAgP, on n'appartient à aucun protocole de négociation.",
      "Un canal LACP exige au moins un côté active ; un canal PAgP exige au moins un côté desirable ; le mode on doit faire face à un autre mode on.",
      "1. Po-A : LACP avec un côté actif. 2. Po-B : LACP contre on, aucune négociation commune. 3. Po-C : PAgP avec un côté desirable. 4. Po-D : aucun côté ne prend l'initiative. 5. Po-E : deux modes on se répondent."
    ],
    "examples": [
      {
        "stdin": "Le lycée technique de Vimeux teste quatre agrégats entre sa salle machine et ses deux bâtiments.\nPo-1 : active + active. Po-2 : desirable + desirable.\nPo-3 : auto + auto. Po-4 : passive + desirable.\n\n1) Po-1 : LACP avec deux extrémités actives : canal formé.\n2) Po-2 : PAgP avec deux extrémités desirable : canal formé.\n3) Po-3 : PAgP auto + auto, aucun côté ne négocie : pas de canal.\n4) Po-4 : LACP passif face à PAgP desirable, protocoles incompatibles : pas de canal.",
        "expected": "Po-1 : canal formé — Po-2 : canal formé — Po-3 : pas de canal — Po-4 : pas de canal (protocoles différents)",
        "note": "Passive + passive et auto + auto échouent pour la même raison : aucune des deux extrémités ne prend l'initiative de la négociation."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Protocole des modes active et passive",
        "stdin": "q:1",
        "expected": "LACP||le LACP||lacp 802.3ad||802.3ad"
      },
      {
        "label": "Question 2 — Po-A (active + passive) : canal formé ?",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — Po-B (active + on) : canal formé ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Po-C (desirable + auto) : canal formé ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Po-D (passive + passive) : canal formé ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Po-E (on + on) : canal formé ?",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Protocole des modes active et passive]\nLACP\n\n[Question 2 — Po-A (active + passive) : canal formé ?]\noui\n\n[Question 3 — Po-B (active + on) : canal formé ?]\nnon\n\n[Question 4 — Po-C (desirable + auto) : canal formé ?]\noui\n\n[Question 5 — Po-D (passive + passive) : canal formé ?]\nnon\n\n[Question 6 — Po-E (on + on) : canal formé ?]\noui",
    "takeaway": "1) Les modes active et passive appartiennent à LACP (norme 802.3ad).\n2) Po-A : une extrémité active suffit pour lancer la négociation LACP, le canal se forme.\n3) Po-B : le mode on force l'agrégation sans négocier ; face à un port LACP active, aucune entente n'est possible : pas de canal.\n4) Po-C : desirable et auto sont deux modes PAgP, et une extrémité desirable suffit : le canal se forme.\n5) Po-D : deux extrémités passives n'émettent aucune trame de négociation LACP : pas de canal.\n6) Po-E : deux modes on forcent l'agrégation des deux côtés : le canal se forme, sans négociation ni détection de panne de protocole.\nContrôle : trois canaux se forment (Po-A, Po-C, Po-E) ; les échecs concernent soit l'absence d'initiateur (Po-D), soit des modes incompatibles (Po-B)."
  },
  {
    "id": "lan3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le dimensionnement du port-channel Po1 de Pharmalys",
    "exampleTitle": "Exemple résolu — le port-channel du studio Vidéralp",
    "goal": "Dimensionner un lien trunk agrégé (bande passante totale, débit d'un flux unique, panne d'un membre) et prédire le lien utilisé par hachage.",
    "brief": "<p><strong>Énoncé.</strong> Pharmalys, laboratoire pharmaceutique de 900 salariés, sature son unique liaison 1 Gbit/s entre le commutateur d'étage SW-ET4 et le cœur de réseau. L'administrateur agrège quatre liaisons cuivre 1 Gbit/s dans le port-channel Po1 (membres Gi2/0/1 à Gi2/0/4). La répartition de charge s'appuie sur un hachage des adresses IP source et destination ; pour simplifier, le lien utilisé par un flux est déterminé par le dernier octet des deux adresses : numéro de lien = (octet_source XOR octet_destination) mod 4, les liens étant numérotés de 0 à 3.</p><p>Rappels du cours : la bande passante d'un port-channel est la somme des débits de ses membres actifs ; un flux unique (un couple d'adresses IP, une « conversation ») emprunte toujours un seul lien du canal.</p><p>Répondez par le nombre seul (débit en Gbit/s, ou numéro de lien).</p><ol><li>Quelle est la bande passante théorique du port-channel Po1, en Gbit/s ?</li><li>Un transfert unique relie le serveur de paie (192.168.10.10) à l'imprimante badgeuse (192.168.10.100) : quelle bande passante maximale, en Gbit/s, ce flux peut-il atteindre ?</li><li>Quel lien (numéro 0 à 3) emprunte le flux de la question 2 ?</li><li>Le flux du serveur d'archivage (192.168.10.50) vers la baie de sauvegarde (192.168.10.62) emprunte quel lien ?</li><li>La liaison Gi2/0/3 tombe en panne : quelle est la nouvelle capacité du canal, en Gbit/s ?</li></ol>",
    "starter": "# Exercice — Le dimensionnement du port-channel Po1 de Pharmalys\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses sont des nombres (Gbit/s ou numéro de lien).\n\n[Question 1 — Bande passante théorique du canal (en Gbit/s)]\nA_COMPLETER\n\n[Question 2 — Débit maximal d'un flux unique (en Gbit/s)]\nA_COMPLETER\n\n[Question 3 — Lien du flux serveur de paie vers badgeuse]\nA_COMPLETER\n\n[Question 4 — Lien du flux archivage vers sauvegarde]\nA_COMPLETER\n\n[Question 5 — Capacité du canal après panne d'un membre (en Gbit/s)]\nA_COMPLETER\n",
    "hints": [
      "La capacité d'un canal est additive : quatre membres de 1 Gbit/s offrent 4 Gbit/s cumulés, mais un seul membre à la fois pour chaque conversation.",
      "Le hachage se calcule sur les derniers octets : 10 XOR 100, puis le reste de la division par 4 donne le numéro de lien.",
      "1. 4 × 1 Gbit/s. 2. Un flux unique ne traverse qu'un lien. 3. 10 XOR 100 = 110, puis 110 mod 4. 4. 50 XOR 62 = 12, puis 12 mod 4. 5. Un membre en moins retire 1 Gbit/s."
    ],
    "examples": [
      {
        "stdin": "Le studio Vidéralp agrège deux liaisons 10 Gbit/s dans Po5 (liens numérotés 0 et 1).\nUn flux relie la station de montage 172.16.4.20 au serveur de rendu 172.16.4.35\n(hachage : lien = (octet_source XOR octet_destination) mod 2).\n\n1) Capacité du canal : 2 × 10 = 20 Gbit/s.\n2) Un flux unique traverse un seul lien : 10 Gbit/s au maximum.\n3) 20 XOR 35 = 55 ; 55 mod 2 = 1 → lien 1.\n4) Une liaison tombe : capacité restante 10 Gbit/s, le flux continue via l'autre lien.",
        "expected": "capacité : 20 Gbit/s — un flux unique : 10 Gbit/s au plus — lien 1 — après panne : 10 Gbit/s",
        "note": "Le hachage répartit les flux entre les liens, jamais les paquets d'un même flux : la bande passante d'une conversation reste celle d'un seul membre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Bande passante théorique du canal (en Gbit/s)",
        "stdin": "q:1",
        "expected": "4||4 Gbit/s"
      },
      {
        "label": "Question 2 — Débit maximal d'un flux unique (en Gbit/s)",
        "stdin": "q:2",
        "expected": "1||1 Gbit/s"
      },
      {
        "label": "Question 3 — Lien du flux serveur de paie vers badgeuse",
        "stdin": "q:3",
        "expected": "2||lien 2||le lien 2"
      },
      {
        "label": "Question 4 — Lien du flux archivage vers sauvegarde",
        "stdin": "q:4",
        "expected": "0||lien 0||le lien 0"
      },
      {
        "label": "Question 5 — Capacité du canal après panne d'un membre (en Gbit/s)",
        "stdin": "q:5",
        "expected": "3||3 Gbit/s"
      }
    ],
    "solution": "[Question 1 — Bande passante théorique du canal (en Gbit/s)]\n4\n\n[Question 2 — Débit maximal d'un flux unique (en Gbit/s)]\n1\n\n[Question 3 — Lien du flux serveur de paie vers badgeuse]\n2\n\n[Question 4 — Lien du flux archivage vers sauvegarde]\n0\n\n[Question 5 — Capacité du canal après panne d'un membre (en Gbit/s)]\n3",
    "takeaway": "1) Le canal agrège quatre membres de 1 Gbit/s : 4 × 1 = 4 Gbit/s.\n2) Un flux unique (serveur de paie vers imprimante badgeuse) emprunte un seul lien : 1 Gbit/s au maximum.\n3) Derniers octets : 10 XOR 100 = 110 (soit 0b0001010 XOR 0b1100100 = 0b1101110) ; 110 mod 4 = 2 : le flux emprunte le lien 2.\n4) 50 XOR 62 = 12 (0b0110010 XOR 0b0111110 = 0b0001100) ; 12 mod 4 = 0 : le flux emprunte le lien 0.\n5) Après la panne de Gi2/0/3, il reste trois membres actifs : 3 × 1 = 3 Gbit/s.\nContrôle : les deux flux calculés (liens 2 et 0) tombent sur des liens distincts ; la panne d'un membre ne coupe aucun flux, elle réduit seulement la capacité."
  },
  {
    "id": "lan3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Le diagnostic des membres du port-channel de la DMZ de Solidia",
    "exampleTitle": "Exemple résolu — le port-channel du plateau technique d'Aerolis",
    "goal": "Contrôler la cohérence des membres d'un EtherChannel (vitesse, duplex, mode, VLANs autorisés) et déduire les membres actifs et la capacité restante.",
    "brief": "<p><strong>Énoncé.</strong> La mutuelle Solidia publie son portail de gestion des remboursements depuis une DMZ. Le port-channel Po20 relie le pare-feu au commutateur d'agrégation SW-DMZ ; il a été assemblé à partir de quatre ports. À la suite de chutes de débit, l'administrateur relève l'état des quatre membres :</p><table><tr><th>Port</th><th>Vitesse</th><th>Duplex</th><th>Mode</th><th>VLANs autorisés</th></tr><tr><th>Gi1/0/1</th><td>1 Gbit/s</td><td>full</td><td>trunk</td><td>10, 20, 30</td></tr><tr><th>Gi1/0/2</th><td>1 Gbit/s</td><td>full</td><td>trunk</td><td>10, 20, 30</td></tr><tr><th>Gi1/0/3</th><td>1 Gbit/s</td><td>full</td><td>trunk</td><td>10, 20</td></tr><tr><th>Gi1/0/4</th><td>100 Mbit/s</td><td>full</td><td>trunk</td><td>10, 20, 30</td></tr></table><p>Rappel du cours : un port ne rejoint le canal que si sa configuration est strictement identique à celle du groupe : même vitesse, même duplex, même mode (accès ou trunk) et mêmes VLANs autorisés. Tout port incohérent est écarté (suspendu) et le canal se reforme avec les seuls membres compatibles ; la bande passante du canal est la somme des débits de ses membres actifs.</p><p>Répondez par le nombre seul (questions 1, 4 et 5) ou par un court libellé (questions 2 et 3).</p><ol><li>Combien de ports forment le canal Po20 après contrôle de cohérence ?</li><li>Quel critère écarte Gi1/0/3 du canal ?</li><li>Quel critère écarte Gi1/0/4 du canal ?</li><li>Quelle est la capacité du canal après le contrôle, en Gbit/s ?</li><li>L'administrateur corrige la vitesse de Gi1/0/4 (1 Gbit/s) mais laisse Gi1/0/3 inchangé : combien de membres actifs compte alors Po20 ?</li></ol>",
    "starter": "# Exercice — Le diagnostic des membres du port-channel de la DMZ de Solidia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 4 et 5 : le nombre seul. Questions 2 et 3 : un court libellé.\n\n[Question 1 — Nombre de membres actifs du canal]\nA_COMPLETER\n\n[Question 2 — Critère écartant Gi1/0/3]\nA_COMPLETER\n\n[Question 3 — Critère écartant Gi1/0/4]\nA_COMPLETER\n\n[Question 4 — Capacité du canal (en Gbit/s)]\nA_COMPLETER\n\n[Question 5 — Membres actifs après correction de Gi1/0/4]\nA_COMPLETER\n",
    "hints": [
      "Comparez chaque ligne du tableau à la configuration majoritaire du groupe : un seul attribut divergent suffit à suspendre un membre.",
      "Gi1/0/3 diffère par la liste des VLANs ; Gi1/0/4 diffère par le débit de sa liaison.",
      "1. Ne conservent le canal que les ports strictement identiques. 2. Deux ports restent. 3. La capacité suit le nombre de membres actifs. 4. Corriger la vitesse de Gi1/0/4 ne règle pas l'écart de VLANs de Gi1/0/3."
    ],
    "examples": [
      {
        "stdin": "Le plateau technique d'Aerolis agrège quatre ports dans Po30.\nTe1/1/1 : 10 Gbit/s, full, trunk, VLANs 100, 200.\nTe1/1/2 : 10 Gbit/s, full, trunk, VLANs 100, 200.\nTe1/1/3 : 10 Gbit/s, half, trunk, VLANs 100, 200.\nTe1/1/4 : 10 Gbit/s, full, accès, VLAN 100.\n\n1) Seuls Te1/1/1 et Te1/1/2 sont cohérents : 2 membres actifs.\n2) Te1/1/3 est écarté : duplex half au lieu de full.\n3) Te1/1/4 est écarté : port d'accès au lieu de trunk.\n4) Capacité restante : 2 × 10 = 20 Gbit/s.",
        "expected": "2 membres actifs — Te1/1/3 écarté pour le duplex — Te1/1/4 écarté pour le mode — capacité 20 Gbit/s",
        "note": "Le contrôle de cohérence est strict : un seul attribut divergent (un VLAN manquant, un duplex différent) suffit à suspendre le membre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de membres actifs du canal",
        "stdin": "q:1",
        "expected": "2"
      },
      {
        "label": "Question 2 — Critère écartant Gi1/0/3",
        "stdin": "q:2",
        "expected": "les VLANs autorisés||les VLAN autorisés||la liste des VLANs||VLAN différents||les VLANs||les VLANs différents"
      },
      {
        "label": "Question 3 — Critère écartant Gi1/0/4",
        "stdin": "q:3",
        "expected": "la vitesse||vitesse||le débit||débit"
      },
      {
        "label": "Question 4 — Capacité du canal (en Gbit/s)",
        "stdin": "q:4",
        "expected": "2||2 Gbit/s"
      },
      {
        "label": "Question 5 — Membres actifs après correction de Gi1/0/4",
        "stdin": "q:5",
        "expected": "3"
      }
    ],
    "solution": "[Question 1 — Nombre de membres actifs du canal]\n2\n\n[Question 2 — Critère écartant Gi1/0/3]\nles VLANs autorisés\n\n[Question 3 — Critère écartant Gi1/0/4]\nla vitesse\n\n[Question 4 — Capacité du canal (en Gbit/s)]\n2\n\n[Question 5 — Membres actifs après correction de Gi1/0/4]\n3",
    "takeaway": "1) Seuls Gi1/0/1 et Gi1/0/2 sont strictement identiques (1 Gbit/s, full, trunk, VLANs 10, 20, 30) : le canal compte 2 membres actifs.\n2) Gi1/0/3 est écarté car sa liste de VLANs autorisés (10, 20) diffère de celle du groupe (10, 20, 30).\n3) Gi1/0/4 est écarté car sa vitesse (100 Mbit/s) diffère du 1 Gbit/s du groupe.\n4) Le canal actif regroupe deux liens de 1 Gbit/s : 2 Gbit/s.\n5) Une fois la vitesse de Gi1/0/4 corrigée, il rejoint le canal (3 membres), mais Gi1/0/3 reste suspendu tant que ses VLANs ne sont pas alignés : 3 membres actifs.\nContrôle : 2 membres actifs avant correction, 3 après ; le port suspendu reste physiquement actif mais hors canal."
  }
];
