/**
 * Exercices du chapitre 6 — CCNA Réseau B2.
 * VLANs, Trunking 802.1Q et Routage Inter-VLAN (ROAS).
 */
'use strict';

module.exports = [
  {
    id: 'na2-c6-e1',
    chapter: 6,
    title: "Décodeur de balise Ethernet IEEE 802.1Q (VLAN Tagging)",
    level: 'n1',
    language: 'python',
    goal: "Décoder la balise 802.1Q de 4 octets insérée dans la trame Ethernet (TPID, PCP, DEI, VID).",
    brief: '<p>Une balise 802.1Q fait 4 octets (32 bits) :<br>\n- <code>TPID</code> (16 bits) : Tag Protocol Identifier, doit valoir <code>0x8100</code> pour 802.1Q standard.<br>\n- <code>TCI</code> (16 bits) : Tag Control Information, décomposé en :<br>\n  * <code>PCP</code> (3 bits, 0-7) : Priority Code Point (classe de service CoS).<br>\n  * <code>DEI</code> (1 bit, 0 ou 1) : Drop Eligible Indicator (éligible au rejet en cas de congestion).<br>\n  * <code>VID</code> (12 bits, 1-4094) : VLAN ID.<br>\nLe script lit sur l\'entrée standard une balise en hexadécimal sur 8 caractères (ex: <code>8100a00a</code> ou <code>81000014</code>).<br>\nIl décode et affiche :<br>\n- <code>TPID: 0x&lt;HEX&gt; (&lt;VALIDE|INVALIDE&gt;)</code><br>\n- <code>VLAN ID: &lt;VID&gt; (&lt;STANDARD|ETENDU|RESERVE&gt;)</code> (1-1005: STANDARD, 1006-4094: ETENDU, 0 ou 4095: RESERVE)<br>\n- <code>Priorite CoS (PCP): &lt;PCP&gt; (&lt;QOS_DESCRIPTION&gt;)</code> (0: Best Effort, 1: Background, 2: Spare, 3: Critical, 4: Video, 5: Voice, 6: Internetwork Control, 7: Network Control)<br>\n- <code>Drop Eligible (DEI): &lt;OUI|NON&gt;</code></p>',
    starter: `import sys

tag_hex = sys.stdin.read().strip()

# À compléter : décoder la balise IEEE 802.1Q
`,
    hints: [
      'Les deux premiers octets (4 caractères hex) correspondent au TPID.',
      'Les 4 caractères suivants correspondent au TCI sur 16 bits : PCP = (TCI >> 13) & 7, DEI = (TCI >> 12) & 1, VID = TCI & 0x0FFF.'
    ],
    examples: [
      {
        stdin: '8100a00a',
        expected: 'TPID: 0x8100 (VALIDE)\nVLAN ID: 10 (STANDARD)\nPriorite CoS (PCP): 5 (Voice)\nDrop Eligible (DEI): NON',
        note: 'VLAN 10 avec priorité voix (PCP 5) et TPID standard.'
      }
    ],
    tests: [
      {
        label: 'VLAN étendu avec vidéo et drop eligible',
        stdin: '81009800',
        expected: 'TPID: 0x8100 (VALIDE)\nVLAN ID: 2048 (ETENDU)\nPriorite CoS (PCP): 4 (Video)\nDrop Eligible (DEI): OUI'
      },
      {
        label: 'VLAN 1 par défaut sans priorité',
        stdin: '81000001',
        expected: 'TPID: 0x8100 (VALIDE)\nVLAN ID: 1 (STANDARD)\nPriorite CoS (PCP): 0 (Best Effort)\nDrop Eligible (DEI): NON'
      },
      {
        label: 'TPID invalide avec protocole non-standard',
        stdin: '88a8201e',
        expected: 'TPID: 0x88a8 (INVALIDE)\nVLAN ID: 30 (STANDARD)\nPriorite CoS (PCP): 1 (Background)\nDrop Eligible (DEI): NON'
      },
      {
        label: 'Contrôle réseau haute priorité PCP 7',
        stdin: '8100e064',
        expected: 'TPID: 0x8100 (VALIDE)\nVLAN ID: 100 (STANDARD)\nPriorite CoS (PCP): 7 (Network Control)\nDrop Eligible (DEI): NON'
      }
    ],
    solution: `import sys

def main():
    s = sys.stdin.read().strip().lower()
    if not s:
        return
    tpid_hex = s[:4]
    tci_hex = s[4:8]
    
    tpid_valide = "VALIDE" if tpid_hex == "8100" else "INVALIDE"
    
    tci = int(tci_hex, 16)
    pcp = (tci >> 13) & 7
    dei = (tci >> 12) & 1
    vid = tci & 0x0fff
    
    # Classification VID
    if vid == 0 or vid == 4095:
        vid_type = "RESERVE"
    elif 1 <= vid <= 1005:
        vid_type = "STANDARD"
    else:
        vid_type = "ETENDU"
        
    qos_noms = {
        0: "Best Effort",
        1: "Background",
        2: "Spare",
        3: "Critical",
        4: "Video",
        5: "Voice",
        6: "Internetwork Control",
        7: "Network Control"
    }
    
    print(f"TPID: 0x{tpid_hex} ({tpid_valide})")
    print(f"VLAN ID: {vid} ({vid_type})")
    print(f"Priorite CoS (PCP): {pcp} ({qos_noms.get(pcp, 'Autre')})")
    print(f"Drop Eligible (DEI): {'OUI' if dei == 1 else 'NON'}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'na2-c6-e2',
    chapter: 6,
    title: "Simulateur de Router-on-a-Stick (ROAS) et sous-interfaces",
    level: 'n2',
    language: 'python',
    goal: "Modéliser le routage inter-VLAN par sous-interfaces dot1Q sur un lien trunk unique.",
    brief: '<p>Le script configure d\'abord les sous-interfaces d\'un routeur à partir de l\'entrée standard :<br>\n<code>SUBIF &lt;INTERFACE&gt; &lt;VLAN_ID&gt; &lt;IP_PASSERELLE&gt;/&lt;CIDR&gt; &lt;MAC_ROUTEUR&gt;</code><br>\n(ex: <code>SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01</code>).<br>\nPuis il traite des paquets de données transmis sur le lien Trunk au format :<br>\n<code>PACKET &lt;SRC_IP&gt; &lt;DST_IP&gt; &lt;VLAN_IN&gt; &lt;TTL&gt; &lt;DATA&gt;</code>.<br>\nPour chaque paquet :<br>\n1. Vérifier si <code>SRC_IP</code> appartient bien au sous-réseau associé à <code>VLAN_IN</code>. Si non : <code>REJET: IP source incoherente avec VLAN &lt;VLAN_IN&gt;</code>.<br>\n2. Vérifier si <code>TTL &lt;= 1</code> : <code>REJET: TTL expire en transit</code>.<br>\n3. Trouver la sous-interface de destination dont le sous-réseau englobe <code>DST_IP</code>. Si aucune : <code>REJET: Pas de route vers &lt;DST_IP&gt;</code>.<br>\n4. Si la sous-interface trouvée a <code>VLAN_OUT == VLAN_IN</code> : <code>REJET: Destination sur le meme VLAN (commutation locale requise)</code>.<br>\n5. Si routage réussi : afficher :<br>\n<code>ROUTAGE ROAS: [VLAN &lt;VLAN_IN&gt; -&gt; VLAN &lt;VLAN_OUT&gt; via &lt;SUBIF_OUT&gt;] TTL: &lt;TTL-1&gt; | Data: &lt;DATA&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler le routage inter-VLAN par sous-interfaces
`,
    hints: [
      'Chaque sous-interface dot1q correspond à un VLAN ID et à une passerelle par défaut.',
      'Le routeur décrémente le TTL de 1 et remplace la balise VLAN d\'entrée par la balise du VLAN cible.'
    ],
    examples: [
      {
        stdin: "SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01\nSUBIF g0/0.20 20 192.168.20.254/24 00:00:0c:07:ac:01\nPACKET 192.168.10.5 192.168.20.15 10 64 SALUT",
        expected: "ROUTAGE ROAS: [VLAN 10 -> VLAN 20 via g0/0.20] TTL: 63 | Data: SALUT",
        note: 'Routage inter-VLAN classique entre le VLAN 10 et le VLAN 20.'
      }
    ],
    tests: [
      {
        label: 'TTL expiré à 1',
        stdin: "SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01\nSUBIF g0/0.20 20 192.168.20.254/24 00:00:0c:07:ac:01\nPACKET 192.168.10.2 192.168.20.2 10 1 PING",
        expected: "REJET: TTL expire en transit"
      },
      {
        label: 'IP source non conforme au VLAN annoncé',
        stdin: "SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01\nSUBIF g0/0.20 20 192.168.20.254/24 00:00:0c:07:ac:01\nPACKET 10.0.0.1 192.168.20.2 10 64 SPOOF",
        expected: "REJET: IP source incoherente avec VLAN 10"
      },
      {
        label: 'Destination sur le même VLAN sans besoin de routage L3',
        stdin: "SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01\nPACKET 192.168.10.1 192.168.10.2 10 64 LOCAL_MSG",
        expected: "REJET: Destination sur le meme VLAN (commutation locale requise)"
      },
      {
        label: 'Destination inconnue dans les sous-interfaces',
        stdin: "SUBIF g0/0.10 10 192.168.10.254/24 00:00:0c:07:ac:01\nPACKET 192.168.10.1 8.8.8.8 10 64 DNS_QUERY",
        expected: "REJET: Pas de route vers 8.8.8.8"
      }
    ],
    solution: `import sys

def ip_to_int(ip_str):
    octets = [int(p) for p in ip_str.split(".")]
    return (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]

def match(ip_int, net_int, cidr):
    mask = 0 if cidr == 0 else (((1 << 32) - 1) ^ ((1 << (32 - cidr)) - 1))
    return (ip_int & mask) == (net_int & mask)

def main():
    subifs = {} # vlan -> dict(name, net_int, cidr)
    subifs_list = []
    
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        if parts[0] == "SUBIF":
            nom = parts[1]
            vid = int(parts[2])
            ip_str, cidr_str = parts[3].split("/")
            cidr = int(cidr_str)
            ip_int = ip_to_int(ip_str)
            info = {"nom": nom, "vid": vid, "net_int": ip_int, "cidr": cidr}
            subifs[vid] = info
            subifs_list.append(info)
            
        elif parts[0] == "PACKET":
            src_ip_str = parts[1]
            dst_ip_str = parts[2]
            vlan_in = int(parts[3])
            ttl = int(parts[4])
            data = parts[5]
            
            src_int = ip_to_int(src_ip_str)
            dst_int = ip_to_int(dst_ip_str)
            
            # 1. Vérifier src_ip dans vlan_in
            if vlan_in not in subifs or not match(src_int, subifs[vlan_in]["net_int"], subifs[vlan_in]["cidr"]):
                print(f"REJET: IP source incoherente avec VLAN {vlan_in}")
                continue
                
            # 2. TTL
            if ttl <= 1:
                print("REJET: TTL expire en transit")
                continue
                
            # 3. Trouver sous-interface destination
            dest_subif = None
            for s in subifs_list:
                if match(dst_int, s["net_int"], s["cidr"]):
                    dest_subif = s
                    break
                    
            if not dest_subif:
                print(f"REJET: Pas de route vers {dst_ip_str}")
                continue
                
            # 4. Même VLAN
            if dest_subif["vid"] == vlan_in:
                print("REJET: Destination sur le meme VLAN (commutation locale requise)")
                continue
                
            # 5. Succès
            print(f"ROUTAGE ROAS: [VLAN {vlan_in} -> VLAN {dest_subif['vid']} via {dest_subif['nom']}] TTL: {ttl - 1} | Data: {data}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'na2-c6-e3',
    chapter: 6,
    title: "Validateur et détecteur d'anomalies de Trunk 802.1Q",
    level: 'n3',
    language: 'python',
    goal: "Vérifier la cohérence de configuration entre les deux extrémités d'un lien Trunk (mode, VLAN natif, VLANs autorisés).",
    brief: '<p>Le script lit sur l\'entrée standard la configuration de deux ports reliant deux switches (Switch A et Switch B) :<br>\nLigne 1 : <code>SWITCH_A &lt;MODE&gt; NATIVE=&lt;VLAN&gt; ALLOWED=&lt;LISTE_OU_ALL&gt;</code><br>\nLigne 2 : <code>SWITCH_B &lt;MODE&gt; NATIVE=&lt;VLAN&gt; ALLOWED=&lt;LISTE_OU_ALL&gt;</code><br>\n(ex: <code>SWITCH_A trunk NATIVE=1 ALLOWED=10,20,30</code> et <code>SWITCH_B trunk NATIVE=1 ALLOWED=10,20,40</code>).<br>\nRègles de validation :<br>\n1. <strong>Mode de port</strong> : Les deux ports doivent être en mode <code>trunk</code>. Si l\'un est <code>access</code> : <code>ANOMALIE: Mode mismatch (A=&lt;modeA&gt;, B=&lt;modeB&gt;) -&gt; LIEN BLOQUE</code>.<br>\n2. <strong>VLAN Natif</strong> : Les deux extrémités doivent avoir le même VLAN natif (Native VLAN Mismatch). Si différent : <code>ANOMALIE: Native VLAN Mismatch (A=&lt;natA&gt;, B=&lt;natB&gt;) -&gt; RISQUE FUITE TRAFIC</code>.<br>\n3. <strong>VLANs autorisés</strong> : Calculer l\'intersection des VLANs autorisés qui circuleront réellement sur le trunk. Si disjoint : <code>AVERTISSEMENT: Aucun VLAN commun autorise</code>.<br>\nSi aucune anomalie critique :<br>\n<code>TRUNK OPERATIONNEL: Native VLAN=&lt;nat&gt; | VLANs actifs communs: &lt;LISTE_TRIEE&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : analyser la négociation et cohérence du lien Trunk
`,
    hints: [
      'Si un côté autorise "ALL", tous les VLANs de 1 à 4094 sont acceptés.',
      'Le Native VLAN Mismatch génère des messages CDP d\'erreur et des boucles de trafic dans les environnements Spanning Tree PVST+.'
    ],
    examples: [
      {
        stdin: "SWITCH_A trunk NATIVE=1 ALLOWED=10,20,30\nSWITCH_B trunk NATIVE=1 ALLOWED=10,20,40",
        expected: "TRUNK OPERATIONNEL: Native VLAN=1 | VLANs actifs communs: 10,20",
        note: 'Trunk valide avec passage des VLANs 10 et 20 communs.'
      }
    ],
    tests: [
      {
        label: 'Incompatibilité de VLAN natif',
        stdin: "SWITCH_A trunk NATIVE=10 ALLOWED=10,20\nSWITCH_B trunk NATIVE=20 ALLOWED=10,20",
        expected: "ANOMALIE: Native VLAN Mismatch (A=10, B=20) -> RISQUE FUITE TRAFIC"
      },
      {
        label: 'Incompatibilité de mode trunk contre access',
        stdin: "SWITCH_A trunk NATIVE=1 ALLOWED=ALL\nSWITCH_B access NATIVE=1 ALLOWED=1",
        expected: "ANOMALIE: Mode mismatch (A=trunk, B=access) -> LIEN BLOQUE"
      },
      {
        label: 'Aucun VLAN commun autorisé',
        stdin: "SWITCH_A trunk NATIVE=1 ALLOWED=10,20\nSWITCH_B trunk NATIVE=1 ALLOWED=30,40",
        expected: "AVERTISSEMENT: Aucun VLAN commun autorise"
      },
      {
        label: 'Trunk avec mot clé ALL d un côté',
        stdin: "SWITCH_A trunk NATIVE=99 ALLOWED=ALL\nSWITCH_B trunk NATIVE=99 ALLOWED=10,99,200",
        expected: "TRUNK OPERATIONNEL: Native VLAN=99 | VLANs actifs communs: 10,99,200"
      }
    ],
    solution: `import sys

def parse_switch(line):
    parts = line.split()
    nom = parts[0]
    mode = parts[1].lower()
    native = None
    allowed = set()
    for p in parts[2:]:
        if p.startswith("NATIVE="):
            native = int(p.split("=")[1])
        elif p.startswith("ALLOWED="):
            val = p.split("=")[1]
            if val.upper() == "ALL":
                allowed = "ALL"
            else:
                allowed = set(int(v) for v in val.split(","))
    return {"nom": nom, "mode": mode, "native": native, "allowed": allowed}

def main():
    lignes = [l.strip() for l in sys.stdin if l.strip()]
    if len(lignes) < 2:
        return
        
    sw_a = parse_switch(lignes[0])
    sw_b = parse_switch(lignes[1])
    
    # 1. Mode mismatch
    if sw_a["mode"] != "trunk" or sw_b["mode"] != "trunk":
        print(f"ANOMALIE: Mode mismatch (A={sw_a['mode']}, B={sw_b['mode']}) -> LIEN BLOQUE")
        return
        
    # 2. Native mismatch
    if sw_a["native"] != sw_b["native"]:
        print(f"ANOMALIE: Native VLAN Mismatch (A={sw_a['native']}, B={sw_b['native']}) -> RISQUE FUITE TRAFIC")
        return
        
    # 3. VLANs autorisés communs
    if sw_a["allowed"] == "ALL" and sw_b["allowed"] == "ALL":
        communs = "ALL"
    elif sw_a["allowed"] == "ALL":
        communs = sw_b["allowed"]
    elif sw_b["allowed"] == "ALL":
        communs = sw_a["allowed"]
    else:
        communs = sw_a["allowed"].intersection(sw_b["allowed"])
        
    if communs != "ALL" and len(communs) == 0:
        print("AVERTISSEMENT: Aucun VLAN commun autorise")
        return
        
    if communs == "ALL":
        liste_str = "1-4094"
    else:
        liste_str = ",".join(str(v) for v in sorted(communs))
        
    print(f"TRUNK OPERATIONNEL: Native VLAN={sw_a['native']} | VLANs actifs communs: {liste_str}")

if __name__ == "__main__":
    main()
`
  }
];
