'use strict';

module.exports = [
  {
    "id": "na2-c3-e1",
    "chapter": 3,
    "title": "Simulateur de table CAM de commutateur L2",
    "level": "n1",
    "language": "analyse",
    "goal": "Modéliser l'apprentissage dynamique d'adresses MAC sur les ports d'un switch et la décision de commutation (forwarding vs inondation/flooding).",
    "brief": "<p>Le commutateur possède N ports (ex: Fa0/1 à Fa0/24). La table CAM est initialement vide.<br>\nAnalysez les paramètres du problème pour chaque cas.<br>\nPuis il prend sa décision :<br>\n1. Si <code>MAC_DST == ff:ff:ff:ff:ff:ff</code> ou si <code>MAC_DST</code> n'est pas dans la table : afficher <code>ACTION: FLOOD (ports sauf &lt;PORT_RECU&gt;)</code>.<br>\n2. Si <code>MAC_DST</code> est connue sur le port <code>P_DST</code> : si <code>P_DST == PORT_RECU</code>, afficher <code>ACTION: FILTRE (meme port)</code>, sinon afficher <code>ACTION: FORWARD vers &lt;P_DST&gt;</code>.<br>\n- <code>CAM</code> : Indiquez les entrées apprises triées par adresse MAC au format :<br>\n<code>&lt;MAC&gt; -&gt; &lt;PORT&gt;</code>. Si la table est vide, afficher <code>TABLE CAM VIDE</code>.</p>",
    "starter": "# Grille d'analyse (na2-c3-e1) — Simulateur de table CAM de commutateur L2\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trame de broadcast explicite]\n# Données : FRAME Fa0/3 00:aa:bb:cc:dd:01 ff:ff:ff:ff:ff:ff\nA_COMPLETER\n\n[Cas 2 — Filtrage sur même port]\n# Données : FRAME Fa0/1 00:00:00:00:00:01 ff:ff:ff:ff:ff:ff\n# Données : FRAME Fa0/1 00:00:00:00:00:02 00:00:00:00:00:01\nA_COMPLETER\n\n[Cas 3 — Déplacement d hôte de Fa0/1 vers Fa0/4]\n# Données : FRAME Fa0/1 00:50:56:01:02:03 00:50:56:aa:bb:cc\n# Données : FRAME Fa0/4 00:50:56:01:02:03 00:50:56:aa:bb:cc\n# Données : CAM\nA_COMPLETER\n\n[Cas 4 — Table vide initiale]\n# Données : CAM\nA_COMPLETER\n",
    "hints": [
      "L'apprentissage se fait sur la MAC source.",
      "La décision d'acheminement se fait sur la MAC destination.",
      "Si la destination est sur le même port d'entrée (ex: hub connecté au port), le switch filtre la trame."
    ],
    "examples": [
      {
        "stdin": "FRAME Fa0/1 00:11:22:33:44:01 00:11:22:33:44:02\nFRAME Fa0/2 00:11:22:33:44:02 00:11:22:33:44:01\nCAM",
        "expected": "ACTION: FLOOD (ports sauf Fa0/1)\nACTION: FORWARD vers Fa0/1\n00:11:22:33:44:01 -> Fa0/1\n00:11:22:33:44:02 -> Fa0/2",
        "note": "Première trame inondée car destination inconnue, deuxième commutée directement."
      }
    ],
    "tests": [
      {
        "label": "Trame de broadcast explicite",
        "stdin": "cas:1",
        "expected": "ACTION: FLOOD (ports sauf Fa0/3)"
      },
      {
        "label": "Filtrage sur même port",
        "stdin": "cas:2",
        "expected": "ACTION: FLOOD (ports sauf Fa0/1)\nACTION: FILTRE (meme port)"
      },
      {
        "label": "Déplacement d hôte de Fa0/1 vers Fa0/4",
        "stdin": "cas:3",
        "expected": "ACTION: FLOOD (ports sauf Fa0/1)\nACTION: FLOOD (ports sauf Fa0/4)\n00:50:56:01:02:03 -> Fa0/4"
      },
      {
        "label": "Table vide initiale",
        "stdin": "cas:4",
        "expected": "TABLE CAM VIDE"
      }
    ],
    "solution": "[Exemple]\nACTION: FLOOD (ports sauf Fa0/1)\nACTION: FORWARD vers Fa0/1\n00:11:22:33:44:01 -> Fa0/1\n00:11:22:33:44:02 -> Fa0/2\n\n[Cas 1 — Trame de broadcast explicite]\nACTION: FLOOD (ports sauf Fa0/3)\n\n[Cas 2 — Filtrage sur même port]\nACTION: FLOOD (ports sauf Fa0/1)\nACTION: FILTRE (meme port)\n\n[Cas 3 — Déplacement d hôte de Fa0/1 vers Fa0/4]\nACTION: FLOOD (ports sauf Fa0/1)\nACTION: FLOOD (ports sauf Fa0/4)\n00:50:56:01:02:03 -> Fa0/4\n\n[Cas 4 — Table vide initiale]\nTABLE CAM VIDE"
  },
  {
    "id": "na2-c3-e2",
    "chapter": 3,
    "title": "Émulateur d'élection de Root Bridge STP 802.1D",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l'élection du commutateur racine (Root Bridge) selon les Bridge IDs (Priority + MAC).",
    "brief": "<p>Dans Spanning Tree Protocol (STP 802.1D / RSTP 802.1w), le commutateur racine est celui qui possède le plus petit Bridge ID (BID).<br>\nLe Bridge ID est composé de :<br>\n<code>&lt;Bridge Priority&gt;</code> (entier multiple de 4096 sous Cisco PVST+, défaut 32768) + <code>&lt;MAC de base&gt;</code>.<br>\nAnalysez les paramètres du problème pour chaque cas.<br>\nLe script doit :<br>\n1. Afficher pour chaque switch son Bridge ID calculé sous la forme :<br>\n<code>&lt;NOM&gt;: BID=&lt;PRIORITE&gt;.&lt;MAC&gt;</code><br>\n2. Déterminer et afficher le Root Bridge élu :<br>\n<code>ROOT BRIDGE ELU: &lt;NOM&gt; (Raison: &lt;PLUS_FAIBLE_PRIORITE|DEPARTAGE_MAC&gt;)</code><br>\nSi un switch a une priorité strictement inférieure à tous les autres : <code>PLUS_FAIBLE_PRIORITE</code> ; si la priorité minimale est partagée par 2 switches ou plus et que le choix s'est fait sur la MAC : <code>DEPARTAGE_MAC</code>.</p>",
    "starter": "# Grille d'analyse (na2-c3-e2) — Émulateur d'élection de Root Bridge STP 802.1D\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Départage sur adresse MAC avec priorité par défaut]\n# Données : SW-A 32768 00:11:22:33:44:55\n# Données : SW-B 32768 00:01:02:03:04:05\n# Données : SW-C 32768 00:22:33:44:55:66\nA_COMPLETER\n\n[Cas 2 — Priorité racine primaire 0]\n# Données : Core1 0 00:ff:ee:dd:cc:bb\n# Données : Core2 4096 00:aa:bb:cc:dd:ee\n# Données : Access1 32768 00:01:02:03:04:05\nA_COMPLETER\n\n[Cas 3 — Deux commutateurs avec MAC très proches]\n# Données : Switch-Nord 28672 cc:46:d6:10:00:01\n# Données : Switch-Sud 28672 cc:46:d6:10:00:00\nA_COMPLETER\n\n[Cas 4 — Quatre commutateurs de distribution]\n# Données : D1 16384 00:10:11:22:33:44\n# Données : D2 8192 00:20:22:33:44:55\n# Données : D3 32768 00:05:00:00:00:01\n# Données : D4 8192 00:15:22:33:44:55\nA_COMPLETER\n",
    "hints": [
      "Le BID se compare d'abord sur la priorité numérique, puis alphabétiquement/numériquement sur l'adresse MAC.",
      "La plus petite valeur l'emporte toujours."
    ],
    "examples": [
      {
        "stdin": "SW1 32768 00:0a:00:11:22:33\nSW2 4096 00:0b:00:44:55:66\nSW3 32768 00:0c:00:77:88:99",
        "expected": "SW1: BID=32768.00:0a:00:11:22:33\nSW2: BID=4096.00:0b:00:44:55:66\nSW3: BID=32768.00:0c:00:77:88:99\nROOT BRIDGE ELU: SW2 (Raison: PLUS_FAIBLE_PRIORITE)",
        "note": "SW2 a la plus faible priorité configurée (4096 contre 32768)."
      }
    ],
    "tests": [
      {
        "label": "Départage sur adresse MAC avec priorité par défaut",
        "stdin": "cas:1",
        "expected": "SW-A: BID=32768.00:11:22:33:44:55\nSW-B: BID=32768.00:01:02:03:04:05\nSW-C: BID=32768.00:22:33:44:55:66\nROOT BRIDGE ELU: SW-B (Raison: DEPARTAGE_MAC)"
      },
      {
        "label": "Priorité racine primaire 0",
        "stdin": "cas:2",
        "expected": "Core1: BID=0.00:ff:ee:dd:cc:bb\nCore2: BID=4096.00:aa:bb:cc:dd:ee\nAccess1: BID=32768.00:01:02:03:04:05\nROOT BRIDGE ELU: Core1 (Raison: PLUS_FAIBLE_PRIORITE)"
      },
      {
        "label": "Deux commutateurs avec MAC très proches",
        "stdin": "cas:3",
        "expected": "Switch-Nord: BID=28672.cc:46:d6:10:00:01\nSwitch-Sud: BID=28672.cc:46:d6:10:00:00\nROOT BRIDGE ELU: Switch-Sud (Raison: DEPARTAGE_MAC)"
      },
      {
        "label": "Quatre commutateurs de distribution",
        "stdin": "cas:4",
        "expected": "D1: BID=16384.00:10:11:22:33:44\nD2: BID=8192.00:20:22:33:44:55\nD3: BID=32768.00:05:00:00:00:01\nD4: BID=8192.00:15:22:33:44:55\nROOT BRIDGE ELU: D4 (Raison: DEPARTAGE_MAC)"
      }
    ],
    "solution": "[Exemple]\nSW1: BID=32768.00:0a:00:11:22:33\nSW2: BID=4096.00:0b:00:44:55:66\nSW3: BID=32768.00:0c:00:77:88:99\nROOT BRIDGE ELU: SW2 (Raison: PLUS_FAIBLE_PRIORITE)\n\n[Cas 1 — Départage sur adresse MAC avec priorité par défaut]\nSW-A: BID=32768.00:11:22:33:44:55\nSW-B: BID=32768.00:01:02:03:04:05\nSW-C: BID=32768.00:22:33:44:55:66\nROOT BRIDGE ELU: SW-B (Raison: DEPARTAGE_MAC)\n\n[Cas 2 — Priorité racine primaire 0]\nCore1: BID=0.00:ff:ee:dd:cc:bb\nCore2: BID=4096.00:aa:bb:cc:dd:ee\nAccess1: BID=32768.00:01:02:03:04:05\nROOT BRIDGE ELU: Core1 (Raison: PLUS_FAIBLE_PRIORITE)\n\n[Cas 3 — Deux commutateurs avec MAC très proches]\nSwitch-Nord: BID=28672.cc:46:d6:10:00:01\nSwitch-Sud: BID=28672.cc:46:d6:10:00:00\nROOT BRIDGE ELU: Switch-Sud (Raison: DEPARTAGE_MAC)\n\n[Cas 4 — Quatre commutateurs de distribution]\nD1: BID=16384.00:10:11:22:33:44\nD2: BID=8192.00:20:22:33:44:55\nD3: BID=32768.00:05:00:00:00:01\nD4: BID=8192.00:15:22:33:44:55\nROOT BRIDGE ELU: D4 (Raison: DEPARTAGE_MAC)"
  },
  {
    "id": "na2-c3-e3",
    "chapter": 3,
    "title": "Déterminateur des rôles de ports STP (RP, DP, BLK)",
    "level": "n3",
    "language": "analyse",
    "goal": "Déterminer les rôles et états des ports STP : Root Port (RP), Designated Port (DP) et Alternate/Blocking (BLK).",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nLes lignes suivantes décrivent les liens bidirectionnels du réseau :<br>\n<code>LIEN &lt;SW_A&gt;:&lt;PORT_A&gt; &lt;SW_B&gt;:&lt;PORT_B&gt; &lt;COUT&gt;</code> (ex: <code>LIEN SW1:Fa0/1 SW2:Fa0/1 19</code>).<br>\nRègles Spanning Tree :<br>\n1. Sur le Root Bridge, <strong>tous les ports connectés sont DP</strong> (Designated Port, état Forwarding).<br>\n2. Pour chaque switch non-racine : le port ayant le <strong>plus faible coût cumulé vers la racine (Root Path Cost)</strong> est élu <strong>RP (Root Port)</strong>.<br>\n3. Sur chaque lien entre deux switches non-racines : le switch ayant le plus faible Root Path Cost obtient le <strong>DP</strong> sur son port. L'autre port du lien devient <strong>BLK (Alternate/Blocking)</strong>.<br>\nIndiquez pour chaque commutateur (trié alphabétiquement), puis pour chaque port de ce commutateur (trié) :<br>\n<code>&lt;SWITCH&gt; &lt;PORT&gt; -&gt; &lt;RP|DP|BLK&gt; (Cout-Racine: &lt;C&gt;)</code></p>",
    "starter": "# Grille d'analyse (na2-c3-e3) — Déterminateur des rôles de ports STP (RP, DP, BLK)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Liaison directe simple entre deux switches]\n# Données : ROOT: R1\n# Données : LIEN R1:Gi0/1 S2:Gi0/1 4\nA_COMPLETER\n\n[Cas 2 — Boucle carrée à 4 commutateurs]\n# Données : ROOT: SW1\n# Données : LIEN SW1:Gi0/1 SW2:Gi0/1 4\n# Données : LIEN SW1:Gi0/2 SW4:Gi0/1 4\n# Données : LIEN SW2:Gi0/2 SW3:Gi0/1 4\n# Données : LIEN SW4:Gi0/2 SW3:Gi0/2 4\nA_COMPLETER\n\n[Cas 3 — Coûts hétérogènes FastEthernet vs Gigabit]\n# Données : ROOT: SWA\n# Données : LIEN SWA:Fa0/1 SWB:Fa0/1 19\n# Données : LIEN SWA:Gi0/1 SWC:Gi0/1 4\n# Données : LIEN SWB:Gi0/2 SWC:Gi0/2 4\nA_COMPLETER\n\n[Cas 4 — Ligne bus sans boucle]\n# Données : ROOT: S1\n# Données : LIEN S1:P1 S2:P1 10\n# Données : LIEN S2:P2 S3:P1 10\nA_COMPLETER\n",
    "hints": [
      "Utiliser l'algorithme de Dijkstra ou une exploration en largeur pour trouver le coût minimum vers le Root Bridge pour chaque switch.",
      "Le port qui offre ce chemin minimal est le Root Port (RP).",
      "Sur un segment partagé entre non-racines, le côté le plus proche de la racine est Designated (DP), l'autre est Alternate/Blocking (BLK)."
    ],
    "examples": [
      {
        "stdin": "ROOT: SW1\nLIEN SW1:Fa0/1 SW2:Fa0/1 19\nLIEN SW1:Fa0/2 SW3:Fa0/1 19\nLIEN SW2:Fa0/2 SW3:Fa0/2 19",
        "expected": "SW1 Fa0/1 -> DP (Cout-Racine: 0)\nSW1 Fa0/2 -> DP (Cout-Racine: 0)\nSW2 Fa0/1 -> RP (Cout-Racine: 19)\nSW2 Fa0/2 -> DP (Cout-Racine: 19)\nSW3 Fa0/1 -> RP (Cout-Racine: 19)\nSW3 Fa0/2 -> BLK (Cout-Racine: 19)",
        "note": "Triangle classique : SW3:Fa0/2 est bloqué (départage arbitraire alphabétique SW2 < SW3)."
      }
    ],
    "tests": [
      {
        "label": "Liaison directe simple entre deux switches",
        "stdin": "cas:1",
        "expected": "R1 Gi0/1 -> DP (Cout-Racine: 0)\nS2 Gi0/1 -> RP (Cout-Racine: 4)"
      },
      {
        "label": "Boucle carrée à 4 commutateurs",
        "stdin": "cas:2",
        "expected": "SW1 Gi0/1 -> DP (Cout-Racine: 0)\nSW1 Gi0/2 -> DP (Cout-Racine: 0)\nSW2 Gi0/1 -> RP (Cout-Racine: 4)\nSW2 Gi0/2 -> DP (Cout-Racine: 4)\nSW3 Gi0/1 -> RP (Cout-Racine: 8)\nSW3 Gi0/2 -> BLK (Cout-Racine: 8)\nSW4 Gi0/1 -> RP (Cout-Racine: 4)\nSW4 Gi0/2 -> DP (Cout-Racine: 4)"
      },
      {
        "label": "Coûts hétérogènes FastEthernet vs Gigabit",
        "stdin": "cas:3",
        "expected": "SWA Fa0/1 -> DP (Cout-Racine: 0)\nSWA Gi0/1 -> DP (Cout-Racine: 0)\nSWB Fa0/1 -> BLK (Cout-Racine: 8)\nSWB Gi0/2 -> RP (Cout-Racine: 8)\nSWC Gi0/1 -> RP (Cout-Racine: 4)\nSWC Gi0/2 -> DP (Cout-Racine: 4)"
      },
      {
        "label": "Ligne bus sans boucle",
        "stdin": "cas:4",
        "expected": "S1 P1 -> DP (Cout-Racine: 0)\nS2 P1 -> RP (Cout-Racine: 10)\nS2 P2 -> DP (Cout-Racine: 10)\nS3 P1 -> RP (Cout-Racine: 20)"
      }
    ],
    "solution": "[Exemple]\nSW1 Fa0/1 -> DP (Cout-Racine: 0)\nSW1 Fa0/2 -> DP (Cout-Racine: 0)\nSW2 Fa0/1 -> RP (Cout-Racine: 19)\nSW2 Fa0/2 -> DP (Cout-Racine: 19)\nSW3 Fa0/1 -> RP (Cout-Racine: 19)\nSW3 Fa0/2 -> BLK (Cout-Racine: 19)\n\n[Cas 1 — Liaison directe simple entre deux switches]\nR1 Gi0/1 -> DP (Cout-Racine: 0)\nS2 Gi0/1 -> RP (Cout-Racine: 4)\n\n[Cas 2 — Boucle carrée à 4 commutateurs]\nSW1 Gi0/1 -> DP (Cout-Racine: 0)\nSW1 Gi0/2 -> DP (Cout-Racine: 0)\nSW2 Gi0/1 -> RP (Cout-Racine: 4)\nSW2 Gi0/2 -> DP (Cout-Racine: 4)\nSW3 Gi0/1 -> RP (Cout-Racine: 8)\nSW3 Gi0/2 -> BLK (Cout-Racine: 8)\nSW4 Gi0/1 -> RP (Cout-Racine: 4)\nSW4 Gi0/2 -> DP (Cout-Racine: 4)\n\n[Cas 3 — Coûts hétérogènes FastEthernet vs Gigabit]\nSWA Fa0/1 -> DP (Cout-Racine: 0)\nSWA Gi0/1 -> DP (Cout-Racine: 0)\nSWB Fa0/1 -> BLK (Cout-Racine: 8)\nSWB Gi0/2 -> RP (Cout-Racine: 8)\nSWC Gi0/1 -> RP (Cout-Racine: 4)\nSWC Gi0/2 -> DP (Cout-Racine: 4)\n\n[Cas 4 — Ligne bus sans boucle]\nS1 P1 -> DP (Cout-Racine: 0)\nS2 P1 -> RP (Cout-Racine: 10)\nS2 P2 -> DP (Cout-Racine: 10)\nS3 P1 -> RP (Cout-Racine: 20)"
  }
];
