/**
 * Exercices du chapitre 5 — CCNA Réseau B2.
 * Routage IPv4, Tables de Routage et Routes Statiques.
 */
'use strict';

module.exports = [
  {
    id: 'na2-c5-e1',
    chapter: 5,
    title: "Parseur de table de routage Cisco (show ip route)",
    level: 'n1',
    language: 'python',
    goal: "Analyser les entrées d'une table de routage Cisco IOS pour identifier la source (code), le préfixe, la distance administrative et le next-hop.",
    brief: '<p>Le script lit sur l\'entrée standard des lignes typiques de <code>show ip route</code> :<br>\n- <code>C 192.168.1.0/24 is directly connected, GigabitEthernet0/0</code><br>\n- <code>L 192.168.1.1/32 is directly connected, GigabitEthernet0/0</code><br>\n- <code>S 10.0.0.0/8 [1/0] via 192.168.1.254</code><br>\n- <code>O 172.16.0.0/16 [110/20] via 10.1.1.2, GigabitEthernet0/1</code><br>\n- <code>S* 0.0.0.0/0 [1/0] via 192.168.1.254</code><br>\nPour chaque route, il affiche :<br>\n<code>[&lt;PROTO&gt;] &lt;RESEAU&gt; | AD=&lt;AD&gt; | Metrique=&lt;MET&gt; | Sortie=&lt;VIA_OU_INTERFACE&gt;</code><br>\navec les correspondances de protocoles :<br>\n<code>C</code> -&gt; Directement Connecte (AD=0, Metrique=0)<br>\n<code>L</code> -&gt; Hote Local (AD=0, Metrique=0)<br>\n<code>S</code> ou <code>S*</code> -&gt; Statique (AD et métrique extraits de <code>[AD/Metrique]</code>, par défaut AD=1, Met=0 si non précisé)<br>\n<code>O</code> -&gt; OSPF (AD=110)<br>\n<code>D</code> -&gt; EIGRP (AD=90)<br>\n<code>B</code> -&gt; BGP (AD=20 si eBGP, 200 si iBGP)</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : parser les lignes show ip route
`,
    hints: [
      'Le premier token indique le code protocole (C, L, S, S*, O, D, B).',
      'Le bloc entre crochets [AD/Metrique] fournit la Distance Administrative et le coût.'
    ],
    examples: [
      {
        stdin: "C 192.168.1.0/24 is directly connected, GigabitEthernet0/0\nS 10.0.0.0/8 [1/0] via 192.168.1.254",
        expected: "[Directement Connecte] 192.168.1.0/24 | AD=0 | Metrique=0 | Sortie=GigabitEthernet0/0\n[Statique] 10.0.0.0/8 | AD=1 | Metrique=0 | Sortie=via 192.168.1.254",
        note: 'Extraction de route connectée et route statique standard.'
      }
    ],
    tests: [
      {
        label: 'Route par défaut et route locale',
        stdin: "L 192.168.1.254/32 is directly connected, GigabitEthernet0/0\nS* 0.0.0.0/0 [1/0] via 192.168.1.1",
        expected: "[Hote Local] 192.168.1.254/32 | AD=0 | Metrique=0 | Sortie=GigabitEthernet0/0\n[Statique] 0.0.0.0/0 | AD=1 | Metrique=0 | Sortie=via 192.168.1.1"
      },
      {
        label: 'Route dynamique OSPF avec métrique',
        stdin: "O 172.16.0.0/16 [110/35] via 10.0.0.2, Serial0/0/0",
        expected: "[OSPF] 172.16.0.0/16 | AD=110 | Metrique=35 | Sortie=via 10.0.0.2"
      },
      {
        label: 'Route EIGRP interne',
        stdin: "D 10.50.0.0/20 [90/30720] via 10.1.1.2",
        expected: "[EIGRP] 10.50.0.0/20 | AD=90 | Metrique=30720 | Sortie=via 10.1.1.2"
      },
      {
        label: 'Route statique flottante de secours',
        stdin: "S 10.0.0.0/8 [120/0] via 192.168.2.1",
        expected: "[Statique] 10.0.0.0/8 | AD=120 | Metrique=0 | Sortie=via 192.168.2.1"
      }
    ],
    solution: `import sys, re

def analyser_route(line):
    parts = line.split()
    code = parts[0]
    reseau = parts[1]
    
    noms = {
        "C": "Directement Connecte",
        "L": "Hote Local",
        "S": "Statique",
        "S*": "Statique",
        "O": "OSPF",
        "D": "EIGRP",
        "B": "BGP"
    }
    proto = noms.get(code, f"Proto-{code}")
    
    ad = 0
    met = 0
    
    # Chercher [AD/MET]
    m_bracket = re.search(r"\\[(\\d+)/(\\d+)\\]", line)
    if m_bracket:
        ad = int(m_bracket.group(1))
        met = int(m_bracket.group(2))
    elif code in ("C", "L"):
        ad = 0
        met = 0
        
    # Sortie
    if "is directly connected," in line:
        sortie = line.split("is directly connected,")[1].strip()
    elif "via " in line:
        via_part = line.split("via ")[1].split(",")[0].strip()
        sortie = f"via {via_part}"
    else:
        sortie = parts[-1]
        
    print(f"[{proto}] {reseau} | AD={ad} | Metrique={met} | Sortie={sortie}")

def main():
    for line in sys.stdin:
        line = line.strip()
        if not line or line.startswith("Gateway") or line.startswith("Codes:"):
            continue
        analyser_route(line)

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'na2-c5-e2',
    chapter: 5,
    title: "Moteur de décision Longest Prefix Match (LPM)",
    level: 'n2',
    language: 'python',
    goal: "Déterminer la route exacte empruntée par un paquet IP en appliquant la règle CCNA du préfixe le plus spécifique.",
    brief: '<p>Le script lit sur la première ligne l\'adresse IP de destination à router (ex: <code>PAQUET: 192.168.1.135</code>).<br>\nLes lignes suivantes décrivent les routes candidates dans la table de routage au format :<br>\n<code>ROUTE &lt;PREFIXE/CIDR&gt; &lt;NEXT_HOP&gt; &lt;AD&gt;</code> (ex: <code>ROUTE 192.168.1.128/28 10.0.0.1 110</code>).<br>\nRègles d\'arbitrage Cisco :<br>\n1. Filtrer les routes qui englobent l\'IP de destination (l\'IP doit appartenir au sous-réseau).<br>\n2. Choisir la route ayant le <strong>masque le plus long (CIDR le plus élevé)</strong> : Longest Prefix Match.<br>\n3. En cas d\'égalité parfaite de longueur de préfixe, départager par la <strong>plus petite Distance Administrative (AD)</strong>.<br>\nAfficher :<br>\n<code>ROUTE RETENUE: &lt;PREFIXE/CIDR&gt; via &lt;NEXT_HOP&gt; (Masque /&lt;n&gt;, AD=&lt;ad&gt;)</code><br>\nSi aucune route ne correspond, afficher <code>PAQUET REJETE: Pas de route par defaut</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : implémenter le mécanisme Longest Prefix Match
`,
    hints: [
      'Vérifier l\'appartenance à un sous-réseau : (ip & mask) == network.',
      'Le tri principal est sur le CIDR décroissant, le tri secondaire sur l\'AD croissante.'
    ],
    examples: [
      {
        stdin: "PAQUET: 192.168.1.135\nROUTE 192.168.0.0/16 10.1.1.1 1\nROUTE 192.168.1.0/24 10.2.2.1 110\nROUTE 192.168.1.128/28 10.3.3.1 110\nROUTE 0.0.0.0/0 10.0.0.254 1",
        expected: "ROUTE RETENUE: 192.168.1.128/28 via 10.3.3.1 (Masque /28, AD=110)",
        note: 'Le préfixe /28 est le plus spécifique bien que son AD (110) soit plus forte que /16 (AD 1).'
      }
    ],
    tests: [
      {
        label: 'Arbitrage par Distance Administrative sur même masque',
        stdin: "PAQUET: 10.5.5.5\nROUTE 10.5.5.0/24 192.168.1.1 110\nROUTE 10.5.5.0/24 192.168.2.1 90",
        expected: "ROUTE RETENUE: 10.5.5.0/24 via 192.168.2.1 (Masque /24, AD=90)"
      },
      {
        label: 'Recours à la route par défaut /0',
        stdin: "PAQUET: 8.8.8.8\nROUTE 192.168.0.0/16 10.0.0.1 1\nROUTE 172.16.0.0/12 10.0.0.2 1\nROUTE 0.0.0.0/0 10.0.0.254 1",
        expected: "ROUTE RETENUE: 0.0.0.0/0 via 10.0.0.254 (Masque /0, AD=1)"
      },
      {
        label: 'Rejet en l absence de route correspondante',
        stdin: "PAQUET: 203.0.113.5\nROUTE 10.0.0.0/8 1.1.1.1 1\nROUTE 192.168.1.0/24 2.2.2.2 1",
        expected: "PAQUET REJETE: Pas de route par defaut"
      },
      {
        label: 'Route hôte /32 prioritaire sur tout',
        stdin: "PAQUET: 172.16.1.100\nROUTE 172.16.1.0/24 10.1.1.1 1\nROUTE 172.16.1.100/32 10.99.99.1 110",
        expected: "ROUTE RETENUE: 172.16.1.100/32 via 10.99.99.1 (Masque /32, AD=110)"
      }
    ],
    solution: `import sys

def ip_to_int(ip_str):
    octets = [int(p) for p in ip_str.split(".")]
    return (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]

def match(ip_int, net_str, cidr):
    net_int = ip_to_int(net_str)
    mask = 0 if cidr == 0 else (((1 << 32) - 1) ^ ((1 << (32 - cidr)) - 1))
    return (ip_int & mask) == (net_int & mask)

def main():
    lignes = [l.strip() for l in sys.stdin if l.strip()]
    if not lignes:
        return
        
    paquet_ip_str = lignes[0].replace("PAQUET:", "").strip()
    paquet_int = ip_to_int(paquet_ip_str)
    
    candidates = []
    for l in lignes[1:]:
        parts = l.split()
        if parts[0] != "ROUTE":
            continue
        pref, nexthop, ad_str = parts[1], parts[2], parts[3]
        net, cidr_str = pref.split("/")
        cidr = int(cidr_str)
        ad = int(ad_str)
        
        if match(paquet_int, net, cidr):
            candidates.append({"pref": pref, "cidr": cidr, "nexthop": nexthop, "ad": ad})
            
    if not candidates:
        print("PAQUET REJETE: Pas de route par defaut")
    else:
        # Tri : cidr décroissant, puis AD croissante
        candidates.sort(key=lambda c: (-c["cidr"], c["ad"]))
        elu = candidates[0]
        print(f"ROUTE RETENUE: {elu['pref']} via {elu['nexthop']} (Masque /{elu['cidr']}, AD={elu['ad']})")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'na2-c5-e3',
    chapter: 5,
    title: "Calculateur de résumé de routes (Supernetting CIDR)",
    level: 'n3',
    language: 'python',
    goal: "Agréger un ensemble de sous-réseaux IPv4 contigus en un unique préfixe résumé optimal pour optimiser la table de routage.",
    brief: '<p>Le script lit sur l\'entrée standard une liste de sous-réseaux IPv4 avec leur préfixe (ex: <code>192.168.0.0/24</code>, <code>192.168.1.0/24</code>, <code>192.168.2.0/24</code>, <code>192.168.3.0/24</code>).<br>\nL\'objectif est de déterminer le <strong>plus petit préfixe englobant</strong> (Supernet) qui couvre l\'ensemble des réseaux donnés :<br>\n1. Convertir chaque réseau en binaire 32 bits.<br>\n2. Trouver le nombre de bits communs de poids fort partagés par TOUS les réseaux.<br>\n3. Calculer l\'adresse réseau résultante avec ce nouveau CIDR.<br>\nAfficher :<br>\n<code>RESUME OPTIMAL: &lt;RESEAU_RESUME&gt;/&lt;CIDR_COMMUN&gt;</code><br>\n<code>Masque: &lt;MASQUE_DECIMAL&gt;</code><br>\n<code>Sous-reseaux englobes: &lt;N&gt;</code></p>',
    starter: `import sys

reseaux = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : calculer l'adresse résumée supernetting
`,
    hints: [
      'Comparer les représentations binaires des adresses réseau minimale et maximale du lot.',
      'Le premier bit divergent détermine la fin du préfixe commun.'
    ],
    examples: [
      {
        stdin: "192.168.0.0/24\n192.168.1.0/24\n192.168.2.0/24\n192.168.3.0/24",
        expected: "RESUME OPTIMAL: 192.168.0.0/22\nMasque: 255.255.252.0\nSous-reseaux englobes: 4",
        note: '4 blocs /24 contigus résumés en 1 bloc /22.'
      }
    ],
    tests: [
      {
        label: 'Deux réseaux /24 agrégés en /23',
        stdin: "172.16.10.0/24\n172.16.11.0/24",
        expected: "RESUME OPTIMAL: 172.16.10.0/23\nMasque: 255.255.254.0\nSous-reseaux englobes: 2"
      },
      {
        label: 'Huit sous-réseaux de succursales',
        stdin: "10.10.0.0/24\n10.10.1.0/24\n10.10.2.0/24\n10.10.3.0/24\n10.10.4.0/24\n10.10.5.0/24\n10.10.6.0/24\n10.10.7.0/24",
        expected: "RESUME OPTIMAL: 10.10.0.0/21\nMasque: 255.255.248.0\nSous-reseaux englobes: 8"
      },
      {
        label: 'Sous-réseaux /28 de datacenters',
        stdin: "192.168.1.16/28\n192.168.1.32/28",
        expected: "RESUME OPTIMAL: 192.168.1.0/26\nMasque: 255.255.255.192\nSous-reseaux englobes: 2"
      },
      {
        label: 'Réseau unique sans agrégation',
        stdin: "192.168.1.0/24",
        expected: "RESUME OPTIMAL: 192.168.1.0/24\nMasque: 255.255.255.0\nSous-reseaux englobes: 1"
      }
    ],
    solution: `import sys

def ip_to_int(ip_str):
    octets = [int(p) for p in ip_str.split(".")]
    return (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]

def int_to_ip(n):
    return f"{(n >> 24) & 255}.{(n >> 16) & 255}.{(n >> 8) & 255}.{n & 255}"

def main():
    lignes = [l.strip() for l in sys.stdin if l.strip()]
    if not lignes:
        return
        
    ips_int = []
    cidrs = []
    for l in lignes:
        ip_str, cidr_str = l.split("/")
        ips_int.append(ip_to_int(ip_str))
        cidrs.append(int(cidr_str))
        
    min_ip = min(ips_int)
    max_ip = max(ips_int)
    
    # Trouver le nombre de bits communs
    xor_diff = min_ip ^ max_ip
    diff_bits = 32
    while xor_diff > 0:
        diff_bits -= 1
        xor_diff >>= 1
        
    common_bits = min(min(cidrs), diff_bits)
    mask_int = 0 if common_bits == 0 else (((1 << 32) - 1) ^ ((1 << (32 - common_bits)) - 1))
    summary_net = min_ip & mask_int
    
    print(f"RESUME OPTIMAL: {int_to_ip(summary_net)}/{common_bits}")
    print(f"Masque: {int_to_ip(mask_int)}")
    print(f"Sous-reseaux englobes: {len(lignes)}")

if __name__ == "__main__":
    main()
`
  }
];
