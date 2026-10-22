'use strict';

module.exports = [
  {
    "id": "na2-c6-e1",
    "chapter": 6,
    "title": "Décodeur de balise Ethernet IEEE 802.1Q (VLAN Tagging)",
    "level": "n1",
    "language": "analyse",
    "goal": "Décoder la balise 802.1Q de 4 octets insérée dans la trame Ethernet (TPID, PCP, DEI, VID).",
    "brief": "<p>Une balise 802.1Q fait 4 octets (32 bits) :<br>\n- <code>TPID</code> (16 bits) : Tag Protocol Identifier, doit valoir <code>0x8100</code> pour 802.1Q standard.<br>\n- <code>TCI</code> (16 bits) : Tag Control Information, décomposé en :<br>\n  * <code>PCP</code> (3 bits, 0-7) : Priority Code Point (classe de service CoS).<br>\n  * <code>DEI</code> (1 bit, 0 ou 1) : Drop Eligible Indicator (éligible au rejet en cas de congestion).<br>\n  * <code>VID</code> (12 bits, 1-4094) : VLAN ID.<br>\nAnalysez les paramètres du problème pour chaque cas.<br>\nIl décode et Indiquez :<br>\n- <code>TPID: 0x&lt;HEX&gt; (&lt;VALIDE|INVALIDE&gt;)</code><br>\n- <code>VLAN ID: &lt;VID&gt; (&lt;STANDARD|ETENDU|RESERVE&gt;)</code> (1-1005: STANDARD, 1006-4094: ETENDU, 0 ou 4095: RESERVE)<br>\n- <code>Priorite CoS (PCP): &lt;PCP&gt; (&lt;QOS_DESCRIPTION&gt;)</code> (0: Best Effort, 1: Background, 2: Spare, 3: Critical, 4: Video, 5: Voice, 6: Internetwork Control, 7: Network Control)<br>\n- <code>Drop Eligible (DEI): &lt;OUI|NON&gt;</code></p>",
    "starter": "# Grille d'analyse (na2-c6-e1) — Décodeur de balise Ethernet IEEE 802.1Q (VLAN Tagging)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VLAN étendu avec vidéo et drop eligible]\n# Données : 81009800\nA_COMPLETER\n\n[Cas 2 — VLAN 1 par défaut sans priorité]\n# Données : 81000001\nA_COMPLETER\n\n[Cas 3 — TPID invalide avec protocole non-standard]\n# Données : 88a8201e\nA_COMPLETER\n\n[Cas 4 — Contrôle réseau haute priorité PCP 7]\n# Données : 8100e064\nA_COMPLETER\n",
    "hints": [
      "Les deux premiers octets (4 caractères hex) correspondent au TPID.",
      "Les 4 caractères suivants correspondent au TCI sur 16 bits : PCP = (TCI >> 13) & 7, DEI = (TCI >> 12) & 1, VID = TCI & 0x0FFF."
    ],
    "examples": [
      {
        "stdin": "8100a00a",
        "expected": "TPID: 0x8100 (VALIDE)\nVLAN ID: 10 (STANDARD)\nPriorite CoS (PCP): 5 (Voice)\nDrop Eligible (DEI): NON",
        "note": "VLAN 10 avec priorité voix (PCP 5) et TPID standard."
      }
    ],
    "tests": [
      {
        "label": "VLAN étendu avec vidéo et drop eligible",
        "stdin": "cas:1",
        "expected": "TPID: 0x8100 (VALIDE)\nVLAN ID: 2048 (ETENDU)\nPriorite CoS (PCP): 4 (Video)\nDrop Eligible (DEI): OUI"
      },
      {
        "label": "VLAN 1 par défaut sans priorité",
        "stdin": "cas:2",
        "expected": "TPID: 0x8100 (VALIDE)\nVLAN ID: 1 (STANDARD)\nPriorite CoS (PCP): 0 (Best Effort)\nDrop Eligible (DEI): NON"
      },
      {
        "label": "TPID invalide avec protocole non-standard",
        "stdin": "cas:3",
        "expected": "TPID: 0x88a8 (INVALIDE)\nVLAN ID: 30 (STANDARD)\nPriorite CoS (PCP): 1 (Background)\nDrop Eligible (DEI): NON"
      },
      {
        "label": "Contrôle réseau haute priorité PCP 7",
        "stdin": "cas:4",
        "expected": "TPID: 0x8100 (VALIDE)\nVLAN ID: 100 (STANDARD)\nPriorite CoS (PCP): 7 (Network Control)\nDrop Eligible (DEI): NON"
      }
    ],
    "solution": "[Exemple]\nTPID: 0x8100 (VALIDE)\nVLAN ID: 10 (STANDARD)\nPriorite CoS (PCP): 5 (Voice)\nDrop Eligible (DEI): NON\n\n[Cas 1 — VLAN étendu avec vidéo et drop eligible]\nTPID: 0x8100 (VALIDE)\nVLAN ID: 2048 (ETENDU)\nPriorite CoS (PCP): 4 (Video)\nDrop Eligible (DEI): OUI\n\n[Cas 2 — VLAN 1 par défaut sans priorité]\nTPID: 0x8100 (VALIDE)\nVLAN ID: 1 (STANDARD)\nPriorite CoS (PCP): 0 (Best Effort)\nDrop Eligible (DEI): NON\n\n[Cas 3 — TPID invalide avec protocole non-standard]\nTPID: 0x88a8 (INVALIDE)\nVLAN ID: 30 (STANDARD)\nPriorite CoS (PCP): 1 (Background)\nDrop Eligible (DEI): NON\n\n[Cas 4 — Contrôle réseau haute priorité PCP 7]\nTPID: 0x8100 (VALIDE)\nVLAN ID: 100 (STANDARD)\nPriorite CoS (PCP): 7 (Network Control)\nDrop Eligible (DEI): NON"
  },
  {
    "id": "na2-c6-e2",
    "chapter": 6,
    "title": "Simulateur de Router-on-a-Stick (ROAS) et sous-interfaces",
    "level": "n2",
    "language": "analyse",
    "goal": "Modéliser le routage inter-VLAN par sous-interfaces dot1Q sur un lien trunk unique.",
    "brief": "<p>Le script configure d'abord les sous-interfaces d'un routeur à partir des données du scénario :<br>\n<code>SUBIF &lt;INTERFACE&gt; &lt;VLAN_ID&gt; &lt;IP_PASSERELLE&gt;/&lt;CIDR&gt; &lt;MAC_ROUTEUR&gt;</code><br>\n(ex: <code>SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01</code>).<br>\nPuis il traite des paquets de données transmis sur le lien Trunk au format :<br>\n<code>PACKET &lt;SRC_IP&gt; &lt;DST_IP&gt; &lt;VLAN_IN&gt; &lt;TTL&gt; &lt;DATA&gt;</code>.<br>\nPour chaque paquet :<br>\n1. Vérifier si <code>SRC_IP</code> appartient bien au sous-réseau associé à <code>VLAN_IN</code>. Si non : <code>REJET: IP source incoherente avec VLAN &lt;VLAN_IN&gt;</code>.<br>\n2. Vérifier si <code>TTL &lt;= 1</code> : <code>REJET: TTL expire en transit</code>.<br>\n3. Trouver la sous-interface de destination dont le sous-réseau englobe <code>DST_IP</code>. Si aucune : <code>REJET: Pas de route vers &lt;DST_IP&gt;</code>.<br>\n4. Si la sous-interface trouvée a <code>VLAN_OUT == VLAN_IN</code> : <code>REJET: Destination sur le meme VLAN (commutation locale requise)</code>.<br>\n5. Si routage réussi : afficher :<br>\n<code>ROUTAGE ROAS: [VLAN &lt;VLAN_IN&gt; -&gt; VLAN &lt;VLAN_OUT&gt; via &lt;SUBIF_OUT&gt;] TTL: &lt;TTL-1&gt; | Data: &lt;DATA&gt;</code></p>",
    "starter": "# Grille d'analyse (na2-c6-e2) — Simulateur de Router-on-a-Stick (ROAS) et sous-interfaces\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — TTL expiré à 1]\n# Données : SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01\n# Données : SUBIF g0/0.20 20 192.168.20.254/24 00:00:0c:07:ac:01\n# Données : PACKET 192.168.10.2 192.168.20.2 10 1 PING\nA_COMPLETER\n\n[Cas 2 — IP source non conforme au VLAN annoncé]\n# Données : SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01\n# Données : SUBIF g0/0.20 20 192.168.20.254/24 00:00:0c:07:ac:01\n# Données : PACKET 10.0.0.1 192.168.20.2 10 64 SPOOF\nA_COMPLETER\n\n[Cas 3 — Destination sur le même VLAN sans besoin de routage L3]\n# Données : SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01\n# Données : PACKET 192.168.10.1 192.168.10.2 10 64 LOCAL_MSG\nA_COMPLETER\n\n[Cas 4 — Destination inconnue dans les sous-interfaces]\n# Données : SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01\n# Données : PACKET 192.168.10.1 8.8.8.8 10 64 DNS_QUERY\nA_COMPLETER\n",
    "hints": [
      "Chaque sous-interface dot1q correspond à un VLAN ID et à une passerelle par défaut.",
      "Le routeur décrémente le TTL de 1 et remplace la balise VLAN d'entrée par la balise du VLAN cible."
    ],
    "examples": [
      {
        "stdin": "SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01\nSUBIF g0/0.20 20 192.168.20.254/24 00:00:0c:07:ac:01\nPACKET 192.168.10.5 192.168.20.15 10 64 SALUT",
        "expected": "ROUTAGE ROAS: [VLAN 10 -> VLAN 20 via g0/0.20] TTL: 63 | Data: SALUT",
        "note": "Routage inter-VLAN classique entre le VLAN 10 et le VLAN 20."
      }
    ],
    "tests": [
      {
        "label": "TTL expiré à 1",
        "stdin": "cas:1",
        "expected": "REJET: TTL expire en transit"
      },
      {
        "label": "IP source non conforme au VLAN annoncé",
        "stdin": "cas:2",
        "expected": "REJET: IP source incoherente avec VLAN 10"
      },
      {
        "label": "Destination sur le même VLAN sans besoin de routage L3",
        "stdin": "cas:3",
        "expected": "REJET: Destination sur le meme VLAN (commutation locale requise)"
      },
      {
        "label": "Destination inconnue dans les sous-interfaces",
        "stdin": "cas:4",
        "expected": "REJET: Pas de route vers 8.8.8.8"
      }
    ],
    "solution": "[Exemple]\nROUTAGE ROAS: [VLAN 10 -> VLAN 20 via g0/0.20] TTL: 63 | Data: SALUT\n\n[Cas 1 — TTL expiré à 1]\nREJET: TTL expire en transit\n\n[Cas 2 — IP source non conforme au VLAN annoncé]\nREJET: IP source incoherente avec VLAN 10\n\n[Cas 3 — Destination sur le même VLAN sans besoin de routage L3]\nREJET: Destination sur le meme VLAN (commutation locale requise)\n\n[Cas 4 — Destination inconnue dans les sous-interfaces]\nREJET: Pas de route vers 8.8.8.8"
  },
  {
    "id": "na2-c6-e3",
    "chapter": 6,
    "title": "Validateur et détecteur d'anomalies de Trunk 802.1Q",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la cohérence de configuration entre les deux extrémités d'un lien Trunk (mode, VLAN natif, VLANs autorisés).",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nRègles de validation :<br>\n1. <strong>Mode de port</strong> : Les deux ports doivent être en mode <code>trunk</code>. Si l'un est <code>access</code> : <code>ANOMALIE: Mode mismatch (A=&lt;modeA&gt;, B=&lt;modeB&gt;) -&gt; LIEN BLOQUE</code>.<br>\n2. <strong>VLAN Natif</strong> : Les deux extrémités doivent avoir le même VLAN natif (Native VLAN Mismatch). Si différent : <code>ANOMALIE: Native VLAN Mismatch (A=&lt;natA&gt;, B=&lt;natB&gt;) -&gt; RISQUE FUITE TRAFIC</code>.<br>\n3. <strong>VLANs autorisés</strong> : Calculer l'intersection des VLANs autorisés qui circuleront réellement sur le trunk. Si disjoint : <code>AVERTISSEMENT: Aucun VLAN commun autorise</code>.<br>\nSi aucune anomalie critique :<br>\n<code>TRUNK OPERATIONNEL: Native VLAN=&lt;nat&gt; | VLANs actifs communs: &lt;LISTE_TRIEE&gt;</code></p>",
    "starter": "# Grille d'analyse (na2-c6-e3) — Validateur et détecteur d'anomalies de Trunk 802.1Q\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Incompatibilité de VLAN natif]\n# Données : SWITCH_A trunk NATIVE=10 ALLOWED=10,20\n# Données : SWITCH_B trunk NATIVE=20 ALLOWED=10,20\nA_COMPLETER\n\n[Cas 2 — Incompatibilité de mode trunk contre access]\n# Données : SWITCH_A trunk NATIVE=1 ALLOWED=ALL\n# Données : SWITCH_B access NATIVE=1 ALLOWED=1\nA_COMPLETER\n\n[Cas 3 — Aucun VLAN commun autorisé]\n# Données : SWITCH_A trunk NATIVE=1 ALLOWED=10,20\n# Données : SWITCH_B trunk NATIVE=1 ALLOWED=30,40\nA_COMPLETER\n\n[Cas 4 — Trunk avec mot clé ALL d un côté]\n# Données : SWITCH_A trunk NATIVE=99 ALLOWED=ALL\n# Données : SWITCH_B trunk NATIVE=99 ALLOWED=10,99,200\nA_COMPLETER\n",
    "hints": [
      "Si un côté autorise \"ALL\", tous les VLANs de 1 à 4094 sont acceptés.",
      "Le Native VLAN Mismatch génère des messages CDP d'erreur et des boucles de trafic dans les environnements Spanning Tree PVST+."
    ],
    "examples": [
      {
        "stdin": "SWITCH_A trunk NATIVE=1 ALLOWED=10,20,30\nSWITCH_B trunk NATIVE=1 ALLOWED=10,20,40",
        "expected": "TRUNK OPERATIONNEL: Native VLAN=1 | VLANs actifs communs: 10,20",
        "note": "Trunk valide avec passage des VLANs 10 et 20 communs."
      }
    ],
    "tests": [
      {
        "label": "Incompatibilité de VLAN natif",
        "stdin": "cas:1",
        "expected": "ANOMALIE: Native VLAN Mismatch (A=10, B=20) -> RISQUE FUITE TRAFIC"
      },
      {
        "label": "Incompatibilité de mode trunk contre access",
        "stdin": "cas:2",
        "expected": "ANOMALIE: Mode mismatch (A=trunk, B=access) -> LIEN BLOQUE"
      },
      {
        "label": "Aucun VLAN commun autorisé",
        "stdin": "cas:3",
        "expected": "AVERTISSEMENT: Aucun VLAN commun autorise"
      },
      {
        "label": "Trunk avec mot clé ALL d un côté",
        "stdin": "cas:4",
        "expected": "TRUNK OPERATIONNEL: Native VLAN=99 | VLANs actifs communs: 10,99,200"
      }
    ],
    "solution": "[Exemple]\nTRUNK OPERATIONNEL: Native VLAN=1 | VLANs actifs communs: 10,20\n\n[Cas 1 — Incompatibilité de VLAN natif]\nANOMALIE: Native VLAN Mismatch (A=10, B=20) -> RISQUE FUITE TRAFIC\n\n[Cas 2 — Incompatibilité de mode trunk contre access]\nANOMALIE: Mode mismatch (A=trunk, B=access) -> LIEN BLOQUE\n\n[Cas 3 — Aucun VLAN commun autorisé]\nAVERTISSEMENT: Aucun VLAN commun autorise\n\n[Cas 4 — Trunk avec mot clé ALL d un côté]\nTRUNK OPERATIONNEL: Native VLAN=99 | VLANs actifs communs: 10,99,200"
  }
];
