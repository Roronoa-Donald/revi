/**
 * Exercices du Chapitre 4 : Réseau Virtuel VPC, Routage, Sécurité & Répartiteurs de Charge.
 * Préfixe : gcp3-c4-e
 */
'use strict';

module.exports = [
  {
    id: 'gcp3-c4-e1',
    chapter: 4,
    title: 'Calculateur de Sous-réseaux VPC et Adresses IP Réservées GCP',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le nombre d\'adresses IP totales et utilisables dans un sous-réseau VPC Google Cloud en tenant compte des 4 adresses réservées.',
    brief: `<p>Dans un sous-réseau Google Cloud VPC, 4 adresses IP sont systématiquement réservées par l'infrastructure :<br>
- <code>première (.0)</code> : Adresse réseau (Network)<br>
- <code>seconde (.1)</code> : Passerelle par défaut du sous-réseau (Default Gateway)<br>
- <code>troisième (.2)</code> : Réservée par Google (DNS interne)<br>
- <code>dernière (.255 pour /24)</code> : Réservée par Google (Diffusion/Broadcast)<br><br>
Adresses utilisables pour les instances = <code>2^(32 - prefix) - 4</code>.<br><br>
Commande STDIN :<br>
<code>SUBNET_CALC cidr=&lt;IP/prefix&gt;</code>.<br>
Sortie :<br>
<code>SUBNET: cidr=&lt;cidr&gt; total_ips=&lt;T&gt; usable_ips=&lt;U&gt; gateway=&lt;gw_ip&gt;</code>.</p>`,
    starter: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le calcul de sous-réseau VPC GCP
`,
    hints: [
      'Utilisez le module standard ipaddress.ip_network(cidr, strict=False).',
      'Le total d adresses vaut 2**(32 - net.prefixlen).',
      'L adresse de passerelle gateway est net[1].'
    ],
    examples: [
      {
        stdin: 'SUBNET_CALC cidr=10.10.0.0/24',
        expected: 'SUBNET: cidr=10.10.0.0/24 total_ips=256 usable_ips=252 gateway=10.10.0.1',
        note: 'Sous-réseau /24 standard avec 252 IP assignables à des instances.'
      }
    ],
    tests: [
      {
        label: 'Sous-réseau de production plus large /20',
        stdin: 'SUBNET_CALC cidr=172.16.0.0/20',
        expected: 'SUBNET: cidr=172.16.0.0/20 total_ips=4096 usable_ips=4092 gateway=172.16.0.1'
      },
      {
        label: 'Sous-réseau compact /28',
        stdin: 'SUBNET_CALC cidr=192.168.1.32/28',
        expected: 'SUBNET: cidr=192.168.1.32/28 total_ips=16 usable_ips=12 gateway=192.168.1.33'
      }
    ],
    solution: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    cidr = params.get('cidr', '')
    net = ipaddress.ip_network(cidr, strict=False)
    total = 2 ** (32 - net.prefixlen)
    usable = total - 4
    gw = str(net[1])
    print(f"SUBNET: cidr={cidr} total_ips={total} usable_ips={usable} gateway={gw}")
`
  },
  {
    id: 'gcp3-c4-e2',
    chapter: 4,
    title: 'Évaluateur et Linter de Règles de Pare-feu VPC (VPC Firewall Rules)',
    level: 'n2',
    language: 'python',
    goal: 'Évaluer le filtrage de flux réseau face à une liste ordonnée de règles de pare-feu VPC Google Cloud.',
    brief: `<p>Les règles de pare-feu VPC appliquent un filtrage avec état (stateful) ordonné par priorité (0 à 65535, la priorité la plus petite s'appliquant en premier) :<br>
Chaque règle est définie par :<br>
<code>RULE priority=&lt;p&gt; action=&lt;ALLOW|DENY&gt; proto=&lt;tcp|udp|icmp&gt; port=&lt;port&gt;</code>.<br>
(port peut valoir un entier ou 'all').<br><br>
Commande de test :<br>
<code>TEST_PACKET proto=&lt;proto&gt; port=&lt;port&gt;</code>.<br>
Parcourt les règles chargées dans l'ordre de priorité croissante :<br>
- La première règle correspondante décide : <code>PACKET: proto=&lt;proto&gt; port=&lt;port&gt; action=&lt;ALLOW|DENY&gt; matched_priority=&lt;p&gt;</code>.<br>
- Si aucune règle ne correspond, la règle implicite s'applique : <code>PACKET: proto=&lt;proto&gt; port=&lt;port&gt; action=DENY matched_priority=65535 (implicit_deny)</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'évaluateur de pare-feu VPC
`,
    hints: [
      'Stockez les règles et triez-les par priorité croissante.',
      'Une règle correspond si rule_proto == test_proto et (rule_port == "all" ou int(rule_port) == int(test_port)).'
    ],
    examples: [
      {
        stdin: `RULE priority=1000 action=ALLOW proto=tcp port=443
RULE priority=1000 action=ALLOW proto=tcp port=80
RULE priority=2000 action=DENY proto=tcp port=all
TEST_PACKET proto=tcp port=443
TEST_PACKET proto=tcp port=22`,
        expected: `PACKET: proto=tcp port=443 action=ALLOW matched_priority=1000
PACKET: proto=tcp port=22 action=DENY matched_priority=2000`,
        note: 'Le port 443 est autorisé à priorité 1000, le port 22 est bloqué à priorité 2000.'
      }
    ],
    tests: [
      {
        label: 'Application de la règle de refus implicite 65535',
        stdin: `RULE priority=500 action=ALLOW proto=udp port=53
TEST_PACKET proto=tcp port=8080`,
        expected: 'PACKET: proto=tcp port=8080 action=DENY matched_priority=65535 (implicit_deny)'
      },
      {
        label: 'Règle de blocage prioritaire écrasant une règle permissive de priorité plus basse',
        stdin: `RULE priority=100 action=DENY proto=tcp port=22
RULE priority=1000 action=ALLOW proto=tcp port=all
TEST_PACKET proto=tcp port=22
TEST_PACKET proto=tcp port=80`,
        expected: `PACKET: proto=tcp port=22 action=DENY matched_priority=100
PACKET: proto=tcp port=80 action=ALLOW matched_priority=1000`
      }
    ],
    solution: `import sys

rules = []
lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    params = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    if cmd == 'RULE':
        prio = int(params['priority'])
        act = params['action'].upper()
        proto = params['proto'].lower()
        port = params['port'].lower()
        rules.append((prio, act, proto, port))
        
    elif cmd == 'TEST_PACKET':
        p_proto = params['proto'].lower()
        p_port = params['port'].lower()
        
        sorted_rules = sorted(rules, key=lambda r: r[0])
        matched = False
        
        for prio, act, r_proto, r_port in sorted_rules:
            if r_proto == p_proto:
                if r_port == 'all' or r_port == p_port:
                    print(f"PACKET: proto={p_proto} port={p_port} action={act} matched_priority={prio}")
                    matched = True
                    break
                    
        if not matched:
            print(f"PACKET: proto={p_proto} port={p_port} action=DENY matched_priority=65535 (implicit_deny)")
`
  },
  {
    id: 'gcp3-c4-e3',
    chapter: 4,
    title: 'Simulateur de Répartiteur de Charge Global HTTP(S) et URL Maps',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le routage de requêtes Anycast d\'un Global External HTTP(S) Load Balancer selon les règles d\'URL Map.',
    brief: `<p>Un répartiteur de charge mondial Cloud Load Balancing utilise une URL Map pour acheminer le trafic :<br>
Règles de routage chargées :<br>
<code>ROUTE_MAP host=&lt;host&gt; path_prefix=&lt;prefix&gt; backend=&lt;service&gt; protocol=&lt;HTTP|HTTPS&gt;</code>.<br>
(host peut être un domaine exact ou wildcard <code>*</code>).<br><br>
Commande de requête :<br>
<code>DISPATCH_REQUEST host=&lt;host&gt; path=&lt;path&gt;</code>.<br>
Recherche de la correspondance la plus spécifique (préfixe de chemin le plus long correspondant) :<br>
- Si trouvé : <code>DISPATCH: host=&lt;host&gt; path=&lt;path&gt; backend=&lt;service&gt; protocol=&lt;proto&gt; status=FORWARDED</code><br>
- Si aucun backend ne correspond : <code>DISPATCH: host=&lt;host&gt; path=&lt;path&gt; status=404_NOT_FOUND</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le routage URL Map Cloud Load Balancing
`,
    hints: [
      'Stockez les règles et filtrez d abord par correspondance d hôte (exact ou "*").',
      'Sélectionnez la règle dont path_prefix correspond au début de path avec la longueur maximale.'
    ],
    examples: [
      {
        stdin: `ROUTE_MAP host=api.cloud.corp path_prefix=/v1/users backend=user-service-backend protocol=HTTPS
ROUTE_MAP host=api.cloud.corp path_prefix=/ backend=default-api-backend protocol=HTTPS
DISPATCH_REQUEST host=api.cloud.corp path=/v1/users/list
DISPATCH_REQUEST host=api.cloud.corp path=/health`,
        expected: `DISPATCH: host=api.cloud.corp path=/v1/users/list backend=user-service-backend protocol=HTTPS status=FORWARDED
DISPATCH: host=api.cloud.corp path=/health backend=default-api-backend protocol=HTTPS status=FORWARDED`,
        note: 'Le préfixe le plus spécifique /v1/users l emporte sur la racine /.'
      }
    ],
    tests: [
      {
        label: 'Routage générique avec hôte wildcard',
        stdin: `ROUTE_MAP host=* path_prefix=/static backend=cdn-static-backend protocol=HTTPS
DISPATCH_REQUEST host=web.store.com path=/static/logo.svg`,
        expected: 'DISPATCH: host=web.store.com path=/static/logo.svg backend=cdn-static-backend protocol=HTTPS status=FORWARDED'
      },
      {
        label: 'Rejet requête sans backend configuré 404',
        stdin: `ROUTE_MAP host=secure.bank.corp path_prefix=/api backend=banking-backend protocol=HTTPS
DISPATCH_REQUEST host=other.site.org path=/index.html`,
        expected: 'DISPATCH: host=other.site.org path=/index.html status=404_NOT_FOUND'
      }
    ],
    solution: `import sys

routes = []
lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    params = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    if cmd == 'ROUTE_MAP':
        h = params['host']
        p_prefix = params['path_prefix']
        backend = params['backend']
        proto = params.get('protocol', 'HTTPS').upper()
        routes.append((h, p_prefix, backend, proto))
        
    elif cmd == 'DISPATCH_REQUEST':
        req_h = params['host']
        req_p = params['path']
        
        best_match = None
        best_len = -1
        
        for h, p_prefix, backend, proto in routes:
            if h == '*' or h == req_h:
                if req_p.startswith(p_prefix):
                    if len(p_prefix) > best_len:
                        best_len = len(p_prefix)
                        best_match = (backend, proto)
                        
        if best_match:
            b_name, b_proto = best_match
            print(f"DISPATCH: host={req_h} path={req_p} backend={b_name} protocol={b_proto} status=FORWARDED")
        else:
            print(f"DISPATCH: host={req_h} path={req_p} status=404_NOT_FOUND")
`
  }
];
