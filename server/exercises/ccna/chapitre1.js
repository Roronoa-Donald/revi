/**
 * Exercices du chapitre 1 — CCNA Réseau B2.
 * Modèles OSI et TCP/IP, Encapsulation et En-têtes Réseau.
 */
'use strict';

module.exports = [
  {
    id: 'na2-c1-e1',
    chapter: 1,
    title: "Décodeur d'en-tête Ethernet II",
    level: 'n1',
    language: 'python',
    goal: "Analyser les champs d'une trame Ethernet II : adresses MAC source et destination, EtherType et classification du trafic.",
    brief: '<p>Le script lit sur l\'entrée standard une ligne contenant les champs d\'une trame Ethernet II séparés par des espaces :<br>\n<code>&lt;MAC_DEST&gt; &lt;MAC_SRC&gt; &lt;ETHERTYPE_HEX&gt; &lt;PAYLOAD_OCTETS&gt;</code></p>\n<p>Le script doit afficher :<br>\n- <code>DEST: &lt;MAC&gt; (&lt;UNICAST|MULTICAST|BROADCAST&gt;)</code> (Broadcast si <code>ff:ff:ff:ff:ff:ff</code>, Multicast si le bit de poids faible du premier octet est 1 ex. <code>01:00:5e:...</code> ou <code>33:33:...</code>, Unicast sinon)<br>\n- <code>SRC: &lt;MAC&gt;</code><br>\n- <code>TYPE: 0x&lt;HEX&gt; (&lt;IPv4|ARP|IPv6|Inconnu&gt;)</code> (0800=IPv4, 0806=ARP, 86dd=IPv6)<br>\n- <code>TAILLE: &lt;TOTAL&gt; octets</code> (Payload + 14 octets d\'en-tête Ethernet)</p>',
    starter: `import sys

ligne = sys.stdin.read().strip()

# À compléter : décoder l'en-tête Ethernet II et afficher les informations
`,
    hints: [
      'L\'en-tête Ethernet II standard fait 14 octets (6 octets MAC Dest + 6 octets MAC Src + 2 octets EtherType).',
      'Le premier octet d\'une MAC s\'obtient par int(mac.split(":")[0], 16). Le bit 0 indique multicast/broadcast.',
      'La MAC ff:ff:ff:ff:ff:ff est spécifiquement BROADCAST.'
    ],
    examples: [
      {
        stdin: 'ff:ff:ff:ff:ff:ff 00:1a:2b:3c:4d:5e 0806 28',
        expected: 'DEST: ff:ff:ff:ff:ff:ff (BROADCAST)\nSRC: 00:1a:2b:3c:4d:5e\nTYPE: 0x0806 (ARP)\nTAILLE: 42 octets',
        note: 'Trame de requête ARP en diffusion.'
      }
    ],
    tests: [
      {
        label: 'Trame IPv4 unicast',
        stdin: '00:11:22:33:44:55 00:aa:bb:cc:dd:ee 0800 64',
        expected: 'DEST: 00:11:22:33:44:55 (UNICAST)\nSRC: 00:aa:bb:cc:dd:ee\nTYPE: 0x0800 (IPv4)\nTAILLE: 78 octets'
      },
      {
        label: 'Trame IPv6 multicast',
        stdin: '33:33:00:00:00:01 02:42:ac:11:00:02 86dd 120',
        expected: 'DEST: 33:33:00:00:00:01 (MULTICAST)\nSRC: 02:42:ac:11:00:02\nTYPE: 0x86dd (IPv6)\nTAILLE: 134 octets'
      },
      {
        label: 'Trame protocole inconnu',
        stdin: '00:50:56:c0:00:08 00:0c:29:12:34:56 88cc 40',
        expected: 'DEST: 00:50:56:c0:00:08 (UNICAST)\nSRC: 00:0c:29:12:34:56\nTYPE: 0x88cc (Inconnu)\nTAILLE: 54 octets'
      },
      {
        label: 'Trame multicast IPv4 standard',
        stdin: '01:00:5e:00:00:05 00:10:94:ab:cd:ef 0800 80',
        expected: 'DEST: 01:00:5e:00:00:05 (MULTICAST)\nSRC: 00:10:94:ab:cd:ef\nTYPE: 0x0800 (IPv4)\nTAILLE: 94 octets'
      }
    ],
    solution: `import sys

def analyser_trame(ligne):
    parties = ligne.strip().split()
    if len(parties) < 4:
        return
    dst, src, etype, payload_str = parties[0], parties[1], parties[2].lower(), parties[3]
    payload = int(payload_str)
    
    # Classification DEST
    dst_lower = dst.lower()
    if dst_lower == "ff:ff:ff:ff:ff:ff":
        type_dest = "BROADCAST"
    else:
        premier_octet = int(dst_lower.split(":")[0], 16)
        if (premier_octet & 1) == 1:
            type_dest = "MULTICAST"
        else:
            type_dest = "UNICAST"
            
    # Classification EtherType
    norm_etype = etype.zfill(4)
    if norm_etype == "0800":
        nom_proto = "IPv4"
    elif norm_etype == "0806":
        nom_proto = "ARP"
    elif norm_etype == "86dd":
        nom_proto = "IPv6"
    else:
        nom_proto = "Inconnu"
        
    taille_totale = payload + 14
    print(f"DEST: {dst} ({type_dest})")
    print(f"SRC: {src}")
    print(f"TYPE: 0x{norm_etype} ({nom_proto})")
    print(f"TAILLE: {taille_totale} octets")

if __name__ == "__main__":
    ligne = sys.stdin.read().strip()
    if ligne:
        analyser_trame(ligne)
`
  },
  {
    id: 'na2-c1-e2',
    chapter: 1,
    title: "Simulateur d'encapsulation et désencapsulation PDU OSI",
    level: 'n2',
    language: 'python',
    goal: "Modéliser la pile protocolaire OSI/TCP-IP en empilant (encapsulation) ou en retirant (désencapsulation) les en-têtes.",
    brief: '<p>Le script lit une commande sur la première ligne : <code>ENCAPSULER</code> ou <code>DESENCAPSULER</code>.<br>\nPour <code>ENCAPSULER</code>, les 4 lignes suivantes fournissent :<br>\n- Ligne 2 : Donnée applicative (L7 Data)<br>\n- Ligne 3 : <code>&lt;PROTO_L4&gt; &lt;PORT_SRC&gt; &lt;PORT_DST&gt;</code> (ex: <code>TCP 54321 80</code>)<br>\n- Ligne 4 : <code>&lt;IP_SRC&gt; &lt;IP_DST&gt;</code> (ex: <code>192.168.1.10 93.184.216.34</code>)<br>\n- Ligne 5 : <code>&lt;MAC_SRC&gt; &lt;MAC_DST&gt;</code><br>\nLe script affiche chaque étape avec son nom de PDU :<br>\n<code>[L7 Data] &lt;donnee&gt;</code><br>\n<code>[L4 Segment &lt;proto&gt;] Port &lt;src&gt;-&gt;&lt;dst&gt; | Payload: &lt;donnee&gt;</code><br>\n<code>[L3 Paquet IP] &lt;ip_src&gt;-&gt;&lt;ip_dst&gt; | Proto: &lt;proto&gt;</code><br>\n<code>[L2 Trame Eth] &lt;mac_src&gt;-&gt;&lt;mac_dst&gt; | EtherType: 0x0800</code></p>\n<p>Pour <code>DESENCAPSULER</code>, le script lit une trame encapsulée au format :<br>\n<code>ETH[&lt;mac_src&gt;->&lt;mac_dst&gt;]|IP[&lt;ip_src&gt;->&lt;ip_dst&gt;]|&lt;PROTO&gt;[&lt;p_src&gt;->&lt;p_dst&gt;]|DATA[&lt;donnee&gt;]</code><br>\net affiche la désencapsulation étape par couche du bas vers le haut (L2, L3, L4, L7).</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler l'encapsulation ou la désencapsulation des couches réseau
`,
    hints: [
      'En encapsulation, on descend de L7 vers L2 en ajoutant successivement les métadonnées de transport, réseau puis liaison.',
      'En désencapsulation, chaque couche analyse et retire son propre en-tête avant de passer la charge utile à la couche supérieure.'
    ],
    examples: [
      {
        stdin: "ENCAPSULER\nGET /api/status\nTCP 49152 443\n10.0.0.5 10.0.0.1\n00:11:22:33:44:55 aa:bb:cc:dd:ee:ff",
        expected: "[L7 Data] GET /api/status\n[L4 Segment TCP] Port 49152->443 | Payload: GET /api/status\n[L3 Paquet IP] 10.0.0.5->10.0.0.1 | Proto: TCP\n[L2 Trame Eth] 00:11:22:33:44:55->aa:bb:cc:dd:ee:ff | EtherType: 0x0800",
        note: 'Encapsulation complète du message HTTP GET.'
      }
    ],
    tests: [
      {
        label: 'Encapsulation requête UDP DNS',
        stdin: "ENCAPSULER\nquery:example.com\nUDP 53000 53\n192.168.1.50 8.8.8.8\n11:22:33:44:55:66 cc:dd:ee:ff:00:11",
        expected: "[L7 Data] query:example.com\n[L4 Segment UDP] Port 53000->53 | Payload: query:example.com\n[L3 Paquet IP] 192.168.1.50->8.8.8.8 | Proto: UDP\n[L2 Trame Eth] 11:22:33:44:55:66->cc:dd:ee:ff:00:11 | EtherType: 0x0800"
      },
      {
        label: 'Désencapsulation trame Web',
        stdin: "DESENCAPSULER\nETH[aa:11:bb:22:cc:33->dd:44:ee:55:ff:66]|IP[172.16.0.2->172.16.0.1]|TCP[5000->80]|DATA[PING]",
        expected: "L2 Decapsule: dd:44:ee:55:ff:66 -> Passe a L3 (EtherType 0x0800)\nL3 Decapsule: 172.16.0.1 -> Passe a L4 (Proto TCP)\nL4 Decapsule: Port 80 -> Delivre a Application (L7)\nL7 Recu: PING"
      },
      {
        label: 'Désencapsulation paquet Syslog UDP',
        stdin: "DESENCAPSULER\nETH[00:aa:bb:cc:dd:ee->11:22:33:44:55:66]|IP[192.168.0.200->192.168.0.1]|UDP[514->514]|DATA[AUTH_FAIL]",
        expected: "L2 Decapsule: 11:22:33:44:55:66 -> Passe a L3 (EtherType 0x0800)\nL3 Decapsule: 192.168.0.1 -> Passe a L4 (Proto UDP)\nL4 Decapsule: Port 514 -> Delivre a Application (L7)\nL7 Recu: AUTH_FAIL"
      },
      {
        label: 'Encapsulation commande SSH',
        stdin: "ENCAPSULER\nls -la /var/log\nTCP 60100 22\n10.20.30.40 10.20.30.1\nfa:16:3e:01:02:03 fa:16:3e:aa:bb:cc",
        expected: "[L7 Data] ls -la /var/log\n[L4 Segment TCP] Port 60100->22 | Payload: ls -la /var/log\n[L3 Paquet IP] 10.20.30.40->10.20.30.1 | Proto: TCP\n[L2 Trame Eth] fa:16:3e:01:02:03->fa:16:3e:aa:bb:cc | EtherType: 0x0800"
      }
    ],
    solution: `import sys, re

def executer():
    lignes = [l.strip() for l in sys.stdin if l.strip()]
    if not lignes:
        return
    mode = lignes[0]
    
    if mode == "ENCAPSULER":
        data = lignes[1]
        p_l4, port_s, port_d = lignes[2].split()
        ip_s, ip_d = lignes[3].split()
        mac_s, mac_d = lignes[4].split()
        
        print(f"[L7 Data] {data}")
        print(f"[L4 Segment {p_l4}] Port {port_s}->{port_d} | Payload: {data}")
        print(f"[L3 Paquet IP] {ip_s}->{ip_d} | Proto: {p_l4}")
        print(f"[L2 Trame Eth] {mac_s}->{mac_d} | EtherType: 0x0800")
        
    elif mode == "DESENCAPSULER":
        trame = lignes[1]
        # Format ETH[s->d]|IP[s->d]|PROTO[s->d]|DATA[msg]
        m = re.match(r"ETH\\[(.*?)\\->(.*?)\\]\\|IP\\[(.*?)\\->(.*?)\\]\\|(TCP|UDP)\\[(.*?)\\->(.*?)\\]\\|DATA\\[(.*?)\\]", trame)
        if m:
            mac_s, mac_d, ip_s, ip_d, proto, p_s, p_d, data = m.groups()
            print(f"L2 Decapsule: {mac_d} -> Passe a L3 (EtherType 0x0800)")
            print(f"L3 Decapsule: {ip_d} -> Passe a L4 (Proto {proto})")
            print(f"L4 Decapsule: Port {p_d} -> Delivre a Application (L7)")
            print(f"L7 Recu: {data}")

if __name__ == "__main__":
    executer()
`
  },
  {
    id: 'na2-c1-e3',
    chapter: 1,
    title: "Simulateur de table et résolution ARP",
    level: 'n3',
    language: 'python',
    goal: "Implémenter la table de correspondance IP vers MAC (cache ARP) avec gestion de requêtes, apprentissage et expiration TTL.",
    brief: '<p>Le script gère une table ARP initialement vide. Il lit sur l\'entrée standard une suite d\'opérations :<br>\n- <code>REQUEST &lt;IP_DEMANDEE&gt; &lt;IP_EMETTEUR&gt; &lt;MAC_EMETTEUR&gt;</code> : le demandeur diffuse une requête. La table apprend immédiatement la correspondance <code>IP_EMETTEUR -> MAC_EMETTEUR</code> avec un TTL de 300s. Si l\'IP demandée est connue dans le cache, afficher <code>REPLY: &lt;IP_DEMANDEE&gt; est a &lt;MAC_CONNUE&gt;</code>, sinon afficher <code>BROADCAST: Qui a &lt;IP_DEMANDEE&gt; ?</code>.<br>\n- <code>REPLY &lt;IP_CIBLE&gt; &lt;MAC_CIBLE&gt;</code> : réponse ARP reçue, enregistrée avec TTL de 300s.<br>\n- <code>TICK &lt;SECONDES&gt;</code> : fait avancer le temps de N secondes. Les entrées dont le TTL tombe à 0 ou moins sont purgées.<br>\n- <code>SHOW</code> : affiche les entrées du cache triées par IP croissante au format :<br>\n<code>&lt;IP&gt; -> &lt;MAC&gt; (TTL: &lt;ttl&gt;s)</code>. Si vide, affiche <code>CACHE VIDE</code>.</p>',
    starter: `import sys

operations = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : implémenter le simulateur de cache ARP
`,
    hints: [
      'Toute requête ARP permet à la cible d\'apprendre la MAC de l\'émetteur (gratuitous ARP / learning).',
      'Le tri par adresse IP s\'effectue idéalement sur les 4 entiers numériques du tuple pour éviter l\'ordre alphabétique faux (ex: 192.168.1.2 avant 192.168.1.10).'
    ],
    examples: [
      {
        stdin: "REQUEST 192.168.1.1 192.168.1.10 00:11:22:33:44:55\nREPLY 192.168.1.1 aa:bb:cc:dd:ee:01\nREQUEST 192.168.1.1 192.168.1.20 00:22:33:44:55:66\nSHOW",
        expected: "BROADCAST: Qui a 192.168.1.1 ?\nREPLY: 192.168.1.1 est a aa:bb:cc:dd:ee:01\n192.168.1.1 -> aa:bb:cc:dd:ee:01 (TTL: 300s)\n192.168.1.10 -> 00:11:22:33:44:55 (TTL: 300s)\n192.168.1.20 -> 00:22:33:44:55:66 (TTL: 300s)",
        note: 'Apprentissage des émetteurs et réponse au second demandeur.'
      }
    ],
    tests: [
      {
        label: 'Expiration de TTL par TICK',
        stdin: "REPLY 10.0.0.1 00:aa:bb:cc:dd:01\nTICK 250\nSHOW\nTICK 60\nSHOW",
        expected: "10.0.0.1 -> 00:aa:bb:cc:dd:01 (TTL: 50s)\nCACHE VIDE"
      },
      {
        label: 'Rafraîchissement TTL sur nouvelle annonce',
        stdin: "REPLY 172.16.0.5 aa:bb:cc:00:11:22\nTICK 200\nREQUEST 172.16.0.1 172.16.0.5 aa:bb:cc:00:11:22\nSHOW",
        expected: "BROADCAST: Qui a 172.16.0.1 ?\n172.16.0.5 -> aa:bb:cc:00:11:22 (TTL: 300s)"
      },
      {
        label: 'Résolution immédiate sans broadcast',
        stdin: "REPLY 192.168.1.254 00:00:0c:07:ac:01\nREQUEST 192.168.1.254 192.168.1.50 11:11:11:11:11:11",
        expected: "REPLY: 192.168.1.254 est a 00:00:0c:07:ac:01"
      },
      {
        label: 'Tri numérique correct des adresses IP',
        stdin: "REPLY 192.168.1.10 00:00:00:00:00:10\nREPLY 192.168.1.2 00:00:00:00:00:02\nREPLY 192.168.1.100 00:00:00:00:01:00\nSHOW",
        expected: "192.168.1.2 -> 00:00:00:00:00:02 (TTL: 300s)\n192.168.1.10 -> 00:00:00:00:00:10 (TTL: 300s)\n192.168.1.100 -> 00:00:00:00:01:00 (TTL: 300s)"
      }
    ],
    solution: `import sys

def ip_key(ip):
    return tuple(int(p) for p in ip.split("."))

def main():
    cache = {}  # ip -> {"mac": mac, "ttl": 300}
    
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        cmd = parts[0]
        
        if cmd == "REQUEST":
            ip_demande = parts[1]
            ip_emetteur = parts[2]
            mac_emetteur = parts[3]
            # Apprentissage émetteur
            cache[ip_emetteur] = {"mac": mac_emetteur, "ttl": 300}
            if ip_demande in cache:
                print(f"REPLY: {ip_demande} est a {cache[ip_demande]['mac']}")
            else:
                print(f"BROADCAST: Qui a {ip_demande} ?")
                
        elif cmd == "REPLY":
            ip_cible = parts[1]
            mac_cible = parts[2]
            cache[ip_cible] = {"mac": mac_cible, "ttl": 300}
            
        elif cmd == "TICK":
            delta = int(parts[1])
            expires = []
            for ip in cache:
                cache[ip]["ttl"] -= delta
                if cache[ip]["ttl"] <= 0:
                    expires.append(ip)
            for ip in expires:
                del cache[ip]
                
        elif cmd == "SHOW":
            if not cache:
                print("CACHE VIDE")
            else:
                for ip in sorted(cache.keys(), key=ip_key):
                    print(f"{ip} -> {cache[ip]['mac']} (TTL: {cache[ip]['ttl']}s)")

if __name__ == "__main__":
    main()
`
  }
];
