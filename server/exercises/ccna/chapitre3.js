/**
 * Exercices du chapitre 3 — CCNA Réseau B2.
 * Commutation Ethernet, Commutateurs L2, Tables CAM et STP.
 */
'use strict';

module.exports = [
  {
    id: 'na2-c3-e1',
    chapter: 3,
    title: "Simulateur de table CAM de commutateur L2",
    level: 'n1',
    language: 'python',
    goal: "Modéliser l'apprentissage dynamique d'adresses MAC sur les ports d'un switch et la décision de commutation (forwarding vs inondation/flooding).",
    brief: '<p>Le commutateur possède N ports (ex: Fa0/1 à Fa0/24). La table CAM est initialement vide.<br>\nLe script lit sur l\'entrée standard une suite d\'événements :<br>\n- <code>FRAME &lt;PORT_RECU&gt; &lt;MAC_SRC&gt; &lt;MAC_DST&gt;</code> : le switch enregistre ou met à jour la correspondance <code>MAC_SRC -&gt; PORT_RECU</code> dans sa table CAM.<br>\nPuis il prend sa décision :<br>\n1. Si <code>MAC_DST == ff:ff:ff:ff:ff:ff</code> ou si <code>MAC_DST</code> n\'est pas dans la table : afficher <code>ACTION: FLOOD (ports sauf &lt;PORT_RECU&gt;)</code>.<br>\n2. Si <code>MAC_DST</code> est connue sur le port <code>P_DST</code> : si <code>P_DST == PORT_RECU</code>, afficher <code>ACTION: FILTRE (meme port)</code>, sinon afficher <code>ACTION: FORWARD vers &lt;P_DST&gt;</code>.<br>\n- <code>CAM</code> : affiche les entrées apprises triées par adresse MAC au format :<br>\n<code>&lt;MAC&gt; -&gt; &lt;PORT&gt;</code>. Si la table est vide, afficher <code>TABLE CAM VIDE</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler la table CAM et les actions de commutation
`,
    hints: [
      'L\'apprentissage se fait sur la MAC source.',
      'La décision d\'acheminement se fait sur la MAC destination.',
      'Si la destination est sur le même port d\'entrée (ex: hub connecté au port), le switch filtre la trame.'
    ],
    examples: [
      {
        stdin: "FRAME Fa0/1 00:11:22:33:44:01 00:11:22:33:44:02\nFRAME Fa0/2 00:11:22:33:44:02 00:11:22:33:44:01\nCAM",
        expected: "ACTION: FLOOD (ports sauf Fa0/1)\nACTION: FORWARD vers Fa0/1\n00:11:22:33:44:01 -> Fa0/1\n00:11:22:33:44:02 -> Fa0/2",
        note: 'Première trame inondée car destination inconnue, deuxième commutée directement.'
      }
    ],
    tests: [
      {
        label: 'Trame de broadcast explicite',
        stdin: "FRAME Fa0/3 00:aa:bb:cc:dd:01 ff:ff:ff:ff:ff:ff",
        expected: "ACTION: FLOOD (ports sauf Fa0/3)"
      },
      {
        label: 'Filtrage sur même port',
        stdin: "FRAME Fa0/1 00:00:00:00:00:01 ff:ff:ff:ff:ff:ff\nFRAME Fa0/1 00:00:00:00:00:02 00:00:00:00:00:01",
        expected: "ACTION: FLOOD (ports sauf Fa0/1)\nACTION: FILTRE (meme port)"
      },
      {
        label: 'Déplacement d hôte de Fa0/1 vers Fa0/4',
        stdin: "FRAME Fa0/1 00:50:56:01:02:03 00:50:56:aa:bb:cc\nFRAME Fa0/4 00:50:56:01:02:03 00:50:56:aa:bb:cc\nCAM",
        expected: "ACTION: FLOOD (ports sauf Fa0/1)\nACTION: FLOOD (ports sauf Fa0/4)\n00:50:56:01:02:03 -> Fa0/4"
      },
      {
        label: 'Table vide initiale',
        stdin: "CAM",
        expected: "TABLE CAM VIDE"
      }
    ],
    solution: `import sys

def main():
    cam = {}
    
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        cmd = parts[0]
        
        if cmd == "FRAME":
            port_in = parts[1]
            mac_src = parts[2].lower()
            mac_dst = parts[3].lower()
            
            # Apprentissage sur source
            cam[mac_src] = port_in
            
            # Décision
            if mac_dst == "ff:ff:ff:ff:ff:ff" or mac_dst not in cam:
                print(f"ACTION: FLOOD (ports sauf {port_in})")
            else:
                port_out = cam[mac_dst]
                if port_out == port_in:
                    print("ACTION: FILTRE (meme port)")
                else:
                    print(f"ACTION: FORWARD vers {port_out}")
                    
        elif cmd == "CAM":
            if not cam:
                print("TABLE CAM VIDE")
            else:
                for mac in sorted(cam.keys()):
                    print(f"{mac} -> {cam[mac]}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'na2-c3-e2',
    chapter: 3,
    title: "Émulateur d'élection de Root Bridge STP 802.1D",
    level: 'n2',
    language: 'python',
    goal: "Simuler l'élection du commutateur racine (Root Bridge) selon les Bridge IDs (Priority + MAC).",
    brief: '<p>Dans Spanning Tree Protocol (STP 802.1D / RSTP 802.1w), le commutateur racine est celui qui possède le plus petit Bridge ID (BID).<br>\nLe Bridge ID est composé de :<br>\n<code>&lt;Bridge Priority&gt;</code> (entier multiple de 4096 sous Cisco PVST+, défaut 32768) + <code>&lt;MAC de base&gt;</code>.<br>\nLe script lit sur l\'entrée standard une liste de commutateurs sous la forme :<br>\n<code>&lt;NOM_SWITCH&gt; &lt;PRIORITE&gt; &lt;MAC&gt;</code>.<br>\nLe script doit :<br>\n1. Afficher pour chaque switch son Bridge ID calculé sous la forme :<br>\n<code>&lt;NOM&gt;: BID=&lt;PRIORITE&gt;.&lt;MAC&gt;</code><br>\n2. Déterminer et afficher le Root Bridge élu :<br>\n<code>ROOT BRIDGE ELU: &lt;NOM&gt; (Raison: &lt;PLUS_FAIBLE_PRIORITE|DEPARTAGE_MAC&gt;)</code><br>\nSi un switch a une priorité strictement inférieure à tous les autres : <code>PLUS_FAIBLE_PRIORITE</code> ; si la priorité minimale est partagée par 2 switches ou plus et que le choix s\'est fait sur la MAC : <code>DEPARTAGE_MAC</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : comparer les Bridge IDs et élire le Root Bridge
`,
    hints: [
      'Le BID se compare d\'abord sur la priorité numérique, puis alphabétiquement/numériquement sur l\'adresse MAC.',
      'La plus petite valeur l\'emporte toujours.'
    ],
    examples: [
      {
        stdin: "SW1 32768 00:0a:00:11:22:33\nSW2 4096 00:0b:00:44:55:66\nSW3 32768 00:0c:00:77:88:99",
        expected: "SW1: BID=32768.00:0a:00:11:22:33\nSW2: BID=4096.00:0b:00:44:55:66\nSW3: BID=32768.00:0c:00:77:88:99\nROOT BRIDGE ELU: SW2 (Raison: PLUS_FAIBLE_PRIORITE)",
        note: 'SW2 a la plus faible priorité configurée (4096 contre 32768).'
      }
    ],
    tests: [
      {
        label: 'Départage sur adresse MAC avec priorité par défaut',
        stdin: "SW-A 32768 00:11:22:33:44:55\nSW-B 32768 00:01:02:03:04:05\nSW-C 32768 00:22:33:44:55:66",
        expected: "SW-A: BID=32768.00:11:22:33:44:55\nSW-B: BID=32768.00:01:02:03:04:05\nSW-C: BID=32768.00:22:33:44:55:66\nROOT BRIDGE ELU: SW-B (Raison: DEPARTAGE_MAC)"
      },
      {
        label: 'Priorité racine primaire 0',
        stdin: "Core1 0 00:ff:ee:dd:cc:bb\nCore2 4096 00:aa:bb:cc:dd:ee\nAccess1 32768 00:01:02:03:04:05",
        expected: "Core1: BID=0.00:ff:ee:dd:cc:bb\nCore2: BID=4096.00:aa:bb:cc:dd:ee\nAccess1: BID=32768.00:01:02:03:04:05\nROOT BRIDGE ELU: Core1 (Raison: PLUS_FAIBLE_PRIORITE)"
      },
      {
        label: 'Deux commutateurs avec MAC très proches',
        stdin: "Switch-Nord 28672 cc:46:d6:10:00:01\nSwitch-Sud 28672 cc:46:d6:10:00:00",
        expected: "Switch-Nord: BID=28672.cc:46:d6:10:00:01\nSwitch-Sud: BID=28672.cc:46:d6:10:00:00\nROOT BRIDGE ELU: Switch-Sud (Raison: DEPARTAGE_MAC)"
      },
      {
        label: 'Quatre commutateurs de distribution',
        stdin: "D1 16384 00:10:11:22:33:44\nD2 8192 00:20:22:33:44:55\nD3 32768 00:05:00:00:00:01\nD4 8192 00:15:22:33:44:55",
        expected: "D1: BID=16384.00:10:11:22:33:44\nD2: BID=8192.00:20:22:33:44:55\nD3: BID=32768.00:05:00:00:00:01\nD4: BID=8192.00:15:22:33:44:55\nROOT BRIDGE ELU: D4 (Raison: DEPARTAGE_MAC)"
      }
    ],
    solution: `import sys

def main():
    lignes = [l.strip() for l in sys.stdin if l.strip()]
    if not lignes:
        return
    
    switches = []
    for l in lignes:
        nom, prio_str, mac = l.split()
        prio = int(prio_str)
        switches.append({"nom": nom, "prio": prio, "mac": mac.lower()})
        print(f"{nom}: BID={prio}.{mac.lower()}")
        
    # Tri par (prio, mac)
    switches_tries = sorted(switches, key=lambda s: (s["prio"], s["mac"]))
    vainqueur = switches_tries[0]
    
    # Vérification égalité de priorité
    min_prio = vainqueur["prio"]
    egaux_prio = [s for s in switches if s["prio"] == min_prio]
    
    raison = "PLUS_FAIBLE_PRIORITE" if len(egaux_prio) == 1 else "DEPARTAGE_MAC"
    print(f"ROOT BRIDGE ELU: {vainqueur['nom']} (Raison: {raison})")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'na2-c3-e3',
    chapter: 3,
    title: "Déterminateur des rôles de ports STP (RP, DP, BLK)",
    level: 'n3',
    language: 'python',
    goal: "Déterminer les rôles et états des ports STP : Root Port (RP), Designated Port (DP) et Alternate/Blocking (BLK).",
    brief: '<p>Le script lit sur la première ligne le nom du Root Bridge (ex: <code>ROOT: SW1</code>).<br>\nLes lignes suivantes décrivent les liens bidirectionnels du réseau :<br>\n<code>LIEN &lt;SW_A&gt;:&lt;PORT_A&gt; &lt;SW_B&gt;:&lt;PORT_B&gt; &lt;COUT&gt;</code> (ex: <code>LIEN SW1:Fa0/1 SW2:Fa0/1 19</code>).<br>\nRègles Spanning Tree :<br>\n1. Sur le Root Bridge, <strong>tous les ports connectés sont DP</strong> (Designated Port, état Forwarding).<br>\n2. Pour chaque switch non-racine : le port ayant le <strong>plus faible coût cumulé vers la racine (Root Path Cost)</strong> est élu <strong>RP (Root Port)</strong>.<br>\n3. Sur chaque lien entre deux switches non-racines : le switch ayant le plus faible Root Path Cost obtient le <strong>DP</strong> sur son port. L\'autre port du lien devient <strong>BLK (Alternate/Blocking)</strong>.<br>\nLe script affiche pour chaque commutateur (trié alphabétiquement), puis pour chaque port de ce commutateur (trié) :<br>\n<code>&lt;SWITCH&gt; &lt;PORT&gt; -&gt; &lt;RP|DP|BLK&gt; (Cout-Racine: &lt;C&gt;)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : calculer les plus courts chemins et assigner les rôles de ports STP
`,
    hints: [
      'Utiliser l\'algorithme de Dijkstra ou une exploration en largeur pour trouver le coût minimum vers le Root Bridge pour chaque switch.',
      'Le port qui offre ce chemin minimal est le Root Port (RP).',
      'Sur un segment partagé entre non-racines, le côté le plus proche de la racine est Designated (DP), l\'autre est Alternate/Blocking (BLK).'
    ],
    examples: [
      {
        stdin: "ROOT: SW1\nLIEN SW1:Fa0/1 SW2:Fa0/1 19\nLIEN SW1:Fa0/2 SW3:Fa0/1 19\nLIEN SW2:Fa0/2 SW3:Fa0/2 19",
        expected: "SW1 Fa0/1 -> DP (Cout-Racine: 0)\nSW1 Fa0/2 -> DP (Cout-Racine: 0)\nSW2 Fa0/1 -> RP (Cout-Racine: 19)\nSW2 Fa0/2 -> DP (Cout-Racine: 19)\nSW3 Fa0/1 -> RP (Cout-Racine: 19)\nSW3 Fa0/2 -> BLK (Cout-Racine: 19)",
        note: 'Triangle classique : SW3:Fa0/2 est bloqué (départage arbitraire alphabétique SW2 < SW3).'
      }
    ],
    tests: [
      {
        label: 'Liaison directe simple entre deux switches',
        stdin: "ROOT: R1\nLIEN R1:Gi0/1 S2:Gi0/1 4",
        expected: "R1 Gi0/1 -> DP (Cout-Racine: 0)\nS2 Gi0/1 -> RP (Cout-Racine: 4)"
      },
      {
        label: 'Boucle carrée à 4 commutateurs',
        stdin: "ROOT: SW1\nLIEN SW1:Gi0/1 SW2:Gi0/1 4\nLIEN SW1:Gi0/2 SW4:Gi0/1 4\nLIEN SW2:Gi0/2 SW3:Gi0/1 4\nLIEN SW4:Gi0/2 SW3:Gi0/2 4",
        expected: "SW1 Gi0/1 -> DP (Cout-Racine: 0)\nSW1 Gi0/2 -> DP (Cout-Racine: 0)\nSW2 Gi0/1 -> RP (Cout-Racine: 4)\nSW2 Gi0/2 -> DP (Cout-Racine: 4)\nSW3 Gi0/1 -> RP (Cout-Racine: 8)\nSW3 Gi0/2 -> BLK (Cout-Racine: 8)\nSW4 Gi0/1 -> RP (Cout-Racine: 4)\nSW4 Gi0/2 -> DP (Cout-Racine: 4)"
      },
      {
        label: 'Coûts hétérogènes FastEthernet vs Gigabit',
        stdin: "ROOT: SWA\nLIEN SWA:Fa0/1 SWB:Fa0/1 19\nLIEN SWA:Gi0/1 SWC:Gi0/1 4\nLIEN SWB:Gi0/2 SWC:Gi0/2 4",
        expected: "SWA Fa0/1 -> DP (Cout-Racine: 0)\nSWA Gi0/1 -> DP (Cout-Racine: 0)\nSWB Fa0/1 -> BLK (Cout-Racine: 8)\nSWB Gi0/2 -> RP (Cout-Racine: 8)\nSWC Gi0/1 -> RP (Cout-Racine: 4)\nSWC Gi0/2 -> DP (Cout-Racine: 4)"
      },
      {
        label: 'Ligne bus sans boucle',
        stdin: "ROOT: S1\nLIEN S1:P1 S2:P1 10\nLIEN S2:P2 S3:P1 10",
        expected: "S1 P1 -> DP (Cout-Racine: 0)\nS2 P1 -> RP (Cout-Racine: 10)\nS2 P2 -> DP (Cout-Racine: 10)\nS3 P1 -> RP (Cout-Racine: 20)"
      }
    ],
    solution: `import sys

def main():
    lignes = [l.strip() for l in sys.stdin if l.strip()]
    if not lignes:
        return
    
    root = lignes[0].replace("ROOT:", "").strip()
    
    # Graphe
    # liens: list of dict(sw_a, port_a, sw_b, port_b, cout)
    liens = []
    switches = set()
    ports_by_sw = {} # sw -> list of (port, peer_sw, peer_port, cout, lien_idx)
    
    for idx, l in enumerate(lignes[1:]):
        parts = l.split()
        if parts[0] != "LIEN":
            continue
        swa, porta = parts[1].split(":")
        swb, portb = parts[2].split(":")
        cout = int(parts[3])
        
        switches.add(swa)
        switches.add(swb)
        liens.append({"a": swa, "pa": porta, "b": swb, "pb": portb, "cout": cout, "idx": idx})
        
        ports_by_sw.setdefault(swa, []).append((porta, swb, portb, cout, idx))
        ports_by_sw.setdefault(swb, []).append((portb, swa, porta, cout, idx))
        
    # Calcul des plus courts chemins vers root (Dijkstra)
    dist = {s: float("inf") for s in switches}
    dist[root] = 0
    visited = set()
    
    while len(visited) < len(switches):
        cur = min((s for s in switches if s not in visited), key=lambda s: dist[s], default=None)
        if cur is None or dist[cur] == float("inf"):
            break
        visited.add(cur)
        for port, neighbor, nport, cout, _ in ports_by_sw.get(cur, []):
            if dist[cur] + cout < dist[neighbor]:
                dist[neighbor] = dist[cur] + cout
                
    # Attribution des rôles
    # Pour chaque switch non-racine, trouver son RP
    roles = {} # (sw, port) -> role
    
    for sw in switches:
        if sw == root:
            continue
        # Parmi ses ports, trouver celui qui mène à root avec dist[neighbor] + cout == dist[sw]
        candidats = []
        for port, neighbor, nport, cout, l_idx in ports_by_sw.get(sw, []):
            cost_via = dist[neighbor] + cout
            candidats.append((cost_via, neighbor, port))
        # Le meilleur candidat
        candidats.sort()
        best_port = candidats[0][2]
        roles[(sw, best_port)] = "RP"
        
    # Pour chaque lien, attribuer DP et BLK pour les ports non encore RP
    for lien in liens:
        swa, pa, swb, pb = lien["a"], lien["pa"], lien["b"], lien["pb"]
        ra = roles.get((swa, pa))
        rb = roles.get((swb, pb))
        
        if swa == root and swb == root:
            roles[(swa, pa)] = "DP"
            roles[(swb, pb)] = "DP"
        elif swa == root:
            roles[(swa, pa)] = "DP"
            if not rb:
                roles[(swb, pb)] = "RP" if dist[swa] + lien["cout"] == dist[swb] else "BLK"
        elif swb == root:
            roles[(swb, pb)] = "DP"
            if not ra:
                roles[(swa, pa)] = "RP" if dist[swb] + lien["cout"] == dist[swa] else "BLK"
        else:
            # Lien entre deux non-racines
            if ra == "RP" and rb == "RP":
                # Cas exceptionnel (deux chemins identiques)
                pass
            elif ra == "RP":
                # L'autre est DP
                roles[(swb, pb)] = "DP"
            elif rb == "RP":
                roles[(swa, pa)] = "DP"
            else:
                # Aucun n'est RP : celui qui est le plus proche de la racine est DP, l'autre BLK
                if dist[swa] < dist[swb]:
                    roles[(swa, pa)] = "DP"
                    roles[(swb, pb)] = "BLK"
                elif dist[swb] < dist[swa]:
                    roles[(swb, pb)] = "DP"
                    roles[(swa, pa)] = "BLK"
                else:
                    # Égalité : tie-break sur le nom du switch
                    if swa < swb:
                        roles[(swa, pa)] = "DP"
                        roles[(swb, pb)] = "BLK"
                    else:
                        roles[(swb, pb)] = "DP"
                        roles[(swa, pa)] = "BLK"
                        
    # Affichage trié par switch puis port
    for sw in sorted(switches):
        for port_info in sorted(ports_by_sw.get(sw, []), key=lambda x: x[0]):
            port = port_info[0]
            role = roles.get((sw, port), "DP" if sw == root else "BLK")
            print(f"{sw} {port} -> {role} (Cout-Racine: {int(dist[sw])})")

if __name__ == "__main__":
    main()
`
  }
];
