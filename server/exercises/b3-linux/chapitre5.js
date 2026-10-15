/**
 * Exercices Chapitre 5 — Linux Avancé B3.
 * Réseau Avancé Linux : Namespaces Réseau, Ponts (Bridges), Routage & Politiques.
 */
'use strict';

module.exports = [
  {
    id: 'lx3-c5-e1',
    chapter: 5,
    title: 'Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge)',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la cohérence de configuration des interfaces réseau virtuelles (veth) et des ponts sous Linux.',
    brief: `<p>Sous Linux, la communication inter-conteneurs repose sur des paires d'interfaces virtuelles (<strong>veth pairs</strong>, sorte de câble réseau virtuel) connectées à un pont logiciel (<strong>Linux Bridge</strong>).<br><br>
Règles de validation :<br>
1. Un pont (<code>type=bridge</code>) ne peut pas être lui-même esclave d'un autre équipement (<code>master</code> doit valoir <code>NONE</code>). Sinon, erreur <code>BRIDGE_CANNOT_HAVE_MASTER</code>.<br>
2. Une interface doit avoir son état activé (<code>state=UP</code>). Si <code>state=DOWN</code>, erreur <code>INTERFACE_DOWN</code>.<br>
3. Une interface <code>veth</code> doit soit être rattachée à un pont maître (<code>master != NONE</code>), soit posséder une adresse IP (<code>ip != NONE</code>). Si les deux sont à <code>NONE</code>, erreur <code>VETH_UNATTACHED</code>.<br><br>
Le script lit sur l'entrée standard des définitions au format :<br>
<code>NET_IFACE name=&lt;nom&gt; type=&lt;bridge|veth|physical&gt; master=&lt;nom|NONE&gt; ip=&lt;cidr|NONE&gt; state=&lt;UP|DOWN&gt;</code>.<br><br>
Pour chaque interface, afficher :<br>
<code>NET_AUDIT iface={name} valid={OUI|NON} error={OK|motif}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider la configuration des interfaces réseau
`,
    hints: [
      'Tester les règles dans l’ordre : état UP, bridge sans master, veth avec master ou IP.',
      'Dès qu’une règle échoue, valid=NON avec l’erreur correspondante.'
    ],
    examples: [
      {
        stdin: 'NET_IFACE name=br0 type=bridge master=NONE ip=10.0.0.1/24 state=UP',
        expected: 'NET_AUDIT iface=br0 valid=OUI error=OK',
        note: 'Pont logiciel actif avec IP et sans maître : configuration conforme.'
      }
    ],
    tests: [
      {
        label: 'Rejet d’une interface éteinte (DOWN)',
        stdin: 'NET_IFACE name=veth_app type=veth master=br0 ip=NONE state=DOWN',
        expected: 'NET_AUDIT iface=veth_app valid=NON error=INTERFACE_DOWN'
      },
      {
        label: 'Rejet d’un pont avec master et veth orpheline',
        stdin: 'NET_IFACE name=br1 type=bridge master=br0 ip=NONE state=UP\nNET_IFACE name=veth_orphan type=veth master=NONE ip=NONE state=UP',
        expected: 'NET_AUDIT iface=br1 valid=NON error=BRIDGE_CANNOT_HAVE_MASTER\nNET_AUDIT iface=veth_orphan valid=NON error=VETH_UNATTACHED'
      },
      {
        label: 'Veth autonome avec IP directe (mode point-à-point)',
        stdin: 'NET_IFACE name=veth0 type=veth master=NONE ip=192.168.100.2/30 state=UP',
        expected: 'NET_AUDIT iface=veth0 valid=OUI error=OK'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('NET_IFACE'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    name = params.get('name', 'eth0')
    itype = params.get('type', 'physical')
    master = params.get('master', 'NONE')
    ip = params.get('ip', 'NONE')
    state = params.get('state', 'DOWN')
    
    if state != 'UP':
        print(f"NET_AUDIT iface={name} valid=NON error=INTERFACE_DOWN")
    elif itype == 'bridge' and master != 'NONE':
        print(f"NET_AUDIT iface={name} valid=NON error=BRIDGE_CANNOT_HAVE_MASTER")
    elif itype == 'veth' and master == 'NONE' and ip == 'NONE':
        print(f"NET_AUDIT iface={name} valid=NON error=VETH_UNATTACHED")
    else:
        print(f"NET_AUDIT iface={name} valid=OUI error=OK")
`
  },
  {
    id: 'lx3-c5-e2',
    chapter: 5,
    title: 'Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables)',
    level: 'n2',
    language: 'python',
    goal: 'Aiguiller les paquets réseau vers la bonne table de routage selon les règles de politique PBR (Policy Routing).',
    brief: `<p>Sous Linux, la commande <code>ip rule</code> permet de router le trafic non seulement d'après l'adresse de destination (routage classique), mais également en fonction de l'adresse source ou du port applicatif vers des tables de routage indépendantes (Policy-Based Routing).<br><br>
Le script lit d'abord les règles de politique ordonnées par priorité :<br>
<code>RULE prio=&lt;prio&gt; src=&lt;ip|ANY&gt; dport=&lt;port|ANY&gt; table=&lt;nom_table&gt;</code>.<br><br>
Puis il lit des paquets à router :<br>
<code>PACKET id=&lt;id&gt; src=&lt;ip&gt; dport=&lt;port&gt;</code>.<br><br>
Principe First-Match-Wins : le paquet est évalué séquentiellement contre chaque règle dans l'ordre de priorité croissante. Dès qu'une règle correspond (adresse source identique ou ANY, et port identique ou ANY), le routage s'arrête et la table associée est retournée.<br><br>
Pour chaque paquet, afficher :<br>
<code>ROUTE_MATCH packet={id} matched_prio={prio} table={nom_table}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le moteur d'évaluation Policy Routing
`,
    hints: [
      'Stocker les règles ordonnées par leur priorité numérique (prio).',
      'Tester chaque paquet contre les règles et stopper dès la première correspondance.'
    ],
    examples: [
      {
        stdin: 'RULE prio=100 src=192.168.1.50 dport=ANY table=vpn_tunnel\nRULE prio=32766 src=ANY dport=ANY table=main\nPACKET id=1 src=192.168.1.50 dport=443',
        expected: 'ROUTE_MATCH packet=1 matched_prio=100 table=vpn_tunnel',
        note: 'Le paquet provient de l’IP 192.168.1.50 et correspond à la règle 100 routant vers vpn_tunnel.'
      }
    ],
    tests: [
      {
        label: 'Aiguillage selon le port de destination (trafic web vs standard)',
        stdin: 'RULE prio=200 src=ANY dport=80 table=proxy_table\nRULE prio=300 src=ANY dport=443 table=proxy_table\nRULE prio=32766 src=ANY dport=ANY table=main\nPACKET id=10 src=10.0.0.5 dport=80\nPACKET id=11 src=10.0.0.5 dport=22',
        expected: 'ROUTE_MATCH packet=10 matched_prio=200 table=proxy_table\nROUTE_MATCH packet=11 matched_prio=32766 table=main'
      },
      {
        label: 'Aiguillage par IP source prioritaire sur la table par défaut',
        stdin: 'RULE prio=50 src=172.16.0.10 dport=ANY table=admin_gateway\nRULE prio=32766 src=ANY dport=ANY table=main\nPACKET id=20 src=172.16.0.10 dport=8080\nPACKET id=21 src=172.16.0.99 dport=8080',
        expected: 'ROUTE_MATCH packet=20 matched_prio=50 table=admin_gateway\nROUTE_MATCH packet=21 matched_prio=32766 table=main'
      },
      {
        label: 'Règle par défaut (catch-all) de priorité maximale',
        stdin: 'RULE prio=32766 src=ANY dport=ANY table=default_wan\nPACKET id=99 src=1.2.3.4 dport=53',
        expected: 'ROUTE_MATCH packet=99 matched_prio=32766 table=default_wan'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

rules = []
packets = []

for lig in lignes:
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    if lig.startswith('RULE'):
        rules.append({
            'prio': int(params.get('prio', 99999)),
            'src': params.get('src', 'ANY'),
            'dport': params.get('dport', 'ANY'),
            'table': params.get('table', 'main')
        })
    elif lig.startswith('PACKET'):
        packets.append({
            'id': params.get('id', '0'),
            'src': params.get('src', ''),
            'dport': params.get('dport', '')
        })

rules.sort(key=lambda r: r['prio'])

for p in packets:
    matched_table = 'default'
    matched_prio = 32767
    for r in rules:
        src_match = (r['src'] == 'ANY' or r['src'] == p['src'])
        dport_match = (r['dport'] == 'ANY' or r['dport'] == p['dport'])
        if src_match and dport_match:
            matched_table = r['table']
            matched_prio = r['prio']
            break
            
    print(f"ROUTE_MATCH packet={p['id']} matched_prio={matched_prio} table={matched_table}")
`
  },
  {
    id: 'lx3-c5-e3',
    chapter: 5,
    title: 'Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler la séquence de résolution de noms d’hôtes selon la politique déclarative de nsswitch.conf.',
    brief: `<p>Le fichier <code>/etc/nsswitch.conf</code> (Name Service Switch) régit l'ordre dans lequel la bibliothèque C (glibc) consulte les bases de données système (fichiers locaux <code>files</code> comme <code>/etc/hosts</code>, résolveur DNS <code>dns</code>, mDNS <code>mdns4</code>).<br><br>
Le script lit d'abord la configuration de la base <code>hosts</code> :<br>
<code>CONF_NSSWITCH order=&lt;sources_separees_par_virgule&gt;</code>.<br><br>
Puis il lit des requêtes de résolution :<br>
<code>QUERY_HOST name=&lt;fqdn&gt; in_files=&lt;OUI|NON&gt; in_dns=&lt;OUI|NON&gt; in_mdns=&lt;OUI|NON&gt;</code>.<br><br>
Règles :<br>
- Les sources déclarées dans <code>order</code> sont interrogées successivement de gauche à droite.<br>
- Dès qu'une source répond <code>OUI</code>, la résolution s'arrête immédiatement : <code>resolved_by={source} status=SUCCESS</code>.<br>
- Si aucune source ne répond <code>OUI</code> : <code>resolved_by=NONE status=NOT_FOUND</code>.<br><br>
Pour chaque requête, afficher :<br>
<code>RESOLV_RESULT host={name} resolved_by={source} status={SUCCESS|NOT_FOUND}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la chaîne de résolution NSSwitch
`,
    hints: [
      'Découper la chaîne order avec split(",") pour obtenir la liste ordonnée des sources.',
      'Parcourir les sources dans l’ordre et vérifier si la présence est OUI.'
    ],
    examples: [
      {
        stdin: 'CONF_NSSWITCH order=files,dns\nQUERY_HOST name=localhost in_files=OUI in_dns=NON in_mdns=NON',
        expected: 'RESOLV_RESULT host=localhost resolved_by=files status=SUCCESS',
        note: 'Présent dans /etc/hosts (files) : résolu en priorité par files.'
      }
    ],
    tests: [
      {
        label: 'Résolution par DNS distant lorsque le fichier local échoue',
        stdin: 'CONF_NSSWITCH order=files,dns\nQUERY_HOST name=api.github.com in_files=NON in_dns=OUI in_mdns=NON',
        expected: 'RESOLV_RESULT host=api.github.com resolved_by=dns status=SUCCESS'
      },
      {
        label: 'Hôte introuvable dans toutes les sources déclarées',
        stdin: 'CONF_NSSWITCH order=files,dns,mdns\nQUERY_HOST name=unknown.corp in_files=NON in_dns=NON in_mdns=NON',
        expected: 'RESOLV_RESULT host=unknown.corp resolved_by=NONE status=NOT_FOUND'
      },
      {
        label: 'Priorité inversée (dns avant files)',
        stdin: 'CONF_NSSWITCH order=dns,files\nQUERY_HOST name=internal.test in_files=OUI in_dns=OUI in_mdns=NON',
        expected: 'RESOLV_RESULT host=internal.test resolved_by=dns status=SUCCESS'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

order = ['files', 'dns']

for lig in lignes:
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    if lig.startswith('CONF_NSSWITCH'):
        raw_order = params.get('order', 'files,dns')
        order = [s.strip() for s in raw_order.split(',') if s.strip()]
    elif lig.startswith('QUERY_HOST'):
        name = params.get('name', 'host')
        resolved_by = 'NONE'
        status = 'NOT_FOUND'
        for src in order:
            key = f"in_{src}"
            if params.get(key) == 'OUI':
                resolved_by = src
                status = 'SUCCESS'
                break
        print(f"RESOLV_RESULT host={name} resolved_by={resolved_by} status={status}")
`
  }
];
