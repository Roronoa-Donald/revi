// server/exercises/b3-windows-server/chapitre1.js
// Exercices du Module 1 : Architecture Système & Services d'Infrastructure Réseau (idPrefix: ws3)

module.exports = [
  {
    id: 'ws3-c1-e1',
    chapter: 1,
    title: 'Validateur d’étendue DHCP, exclusions et conflits de réservation MAC',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la liste des adresses IP distribuables d’une étendue DHCP après déduction des exclusions et détecter les conflits de réservation.',
    brief:
      'Dans l’administration d’un serveur DHCP Windows Server, une étendue (Scope) distribue dynamiquement des adresses IP IPv4 :\n' +
      '- `SCOPE net=<PREFIX> start=<N_START> end=<N_END>` : définit la plage complète d’adresses `PREFIX.N` (ex: net=192.168.1. start=10 end=30).\n' +
      '- `EXCLUDE start=<N1> end=<N2>` : plage d’hôtes exclus de la distribution dynamique (inclusifs).\n' +
      '- `RESERVATION mac=<MAC> ip=<PREFIX.N>` : association statique MAC / IP.\n\n' +
      'Règles de validation :\n' +
      '- Une réservation est en conflit (`CONFLIT`) si l’IP est hors de la plage `[start, end]`, ou si deux réservations ont la même IP avec des MAC différentes, ou si la même MAC a plusieurs IP différentes. Sinon elle est `VALIDE`.\n' +
      '- Une adresse IP est distribuable dynamiquement si son numéro d’hôte est dans `[start, end]`, n’est couvert par aucune plage d’exclusion `EXCLUDE`, et n’est assigné à aucune réservation valide.\n\n' +
      'Entrée :\n' +
      '`SCOPE net=<PREFIX> start=<N1> end=<N2>`\n' +
      '`EXCLUDE start=<N1> end=<N2>` (0 ou plusieurs)\n' +
      '`RESERVATION mac=<MAC> ip=<IP>` (0 ou plusieurs)\n\n' +
      'Sortie :\n' +
      '- Ligne de statut des réservations :\n' +
      '  `RESERVATIONS valides=<V> conflits=<C>`\n' +
      '- Ligne du pool d’adresses dynamiques :\n' +
      '  `POOL_DYNAMIC total_disponibles=<D> first_ip=<IP_MIN> last_ip=<IP_MAX>` (si total > 0, sinon `POOL_DYNAMIC total_disponibles=0 first_ip=NONE last_ip=NONE`)\n' +
      '- Bilan :\n' +
      '  `SUMMARY statut=<OK|AVERTISSEMENT> pool_pct=<PCT>%` (où pool_pct = round((total_disponibles / total_scope) * 100, 1) ; statut=OK si conflits=0, sinon AVERTISSEMENT)',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser l'étendue DHCP et vérifier les réservations
`,
    hints: [
      'Stocker les entiers d’hôtes exclus dans un ensemble (set).',
      'Vérifier les doublons de MAC et d’IP pour les réservations avec des dictionnaires.',
      'Calculer les adresses disponibles en soustrayant exclusions et réservations valides.'
    ],
    examples: [
      {
        stdin:
          'SCOPE net=192.168.1. start=10 end=20\n' +
          'EXCLUDE start=12 end=14\n' +
          'RESERVATION mac=00:11:22:33:44:01 ip=192.168.1.15\n' +
          'RESERVATION mac=00:11:22:33:44:02 ip=192.168.1.18',
        expected:
          'RESERVATIONS valides=2 conflits=0\n' +
          'POOL_DYNAMIC total_disponibles=6 first_ip=192.168.1.10 last_ip=192.168.1.20\n' +
          'SUMMARY statut=OK pool_pct=54.5%',
        note: 'Étendue de 11 adresses (10 à 20). 3 exclues (12, 13, 14), 2 réservées (15, 18). Reste : 10, 11, 16, 17, 19, 20 (6 adresses, 6/11 = 54.5%).'
      }
    ],
    tests: [
      {
        label: 'Conflit de réservation sur même adresse IP',
        stdin:
          'SCOPE net=10.0.0. start=100 end=110\n' +
          'RESERVATION mac=AA:BB:CC:01 ip=10.0.0.105\n' +
          'RESERVATION mac=AA:BB:CC:02 ip=10.0.0.105',
        expected:
          'RESERVATIONS valides=0 conflits=2\n' +
          'POOL_DYNAMIC total_disponibles=11 first_ip=10.0.0.100 last_ip=10.0.0.110\n' +
          'SUMMARY statut=AVERTISSEMENT pool_pct=100.0%'
      },
      {
        label: 'Réservation hors de la plage du scope',
        stdin:
          'SCOPE net=172.16.0. start=50 end=60\n' +
          'EXCLUDE start=55 end=60\n' +
          'RESERVATION mac=11:22:33:44 ip=172.16.0.99',
        expected:
          'RESERVATIONS valides=0 conflits=1\n' +
          'POOL_DYNAMIC total_disponibles=5 first_ip=172.16.0.50 last_ip=172.16.0.54\n' +
          'SUMMARY statut=AVERTISSEMENT pool_pct=45.5%'
      },
      {
        label: 'Toutes les adresses exclues ou réservées',
        stdin:
          'SCOPE net=192.168.10. start=1 end=3\n' +
          'EXCLUDE start=1 end=2\n' +
          'RESERVATION mac=AA:11 ip=192.168.10.3',
        expected:
          'RESERVATIONS valides=1 conflits=0\n' +
          'POOL_DYNAMIC total_disponibles=0 first_ip=NONE last_ip=NONE\n' +
          'SUMMARY statut=OK pool_pct=0.0%'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

net_prefix = ""
start_host = 0
end_host = 0
exclusions = set()
raw_reservations = []

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'SCOPE':
        net_prefix = pdict.get('net', '')
        start_host = int(pdict.get('start', 0))
        end_host = int(pdict.get('end', 0))
    elif cmd == 'EXCLUDE':
        e_s = int(pdict.get('start', 0))
        e_e = int(pdict.get('end', 0))
        for h in range(e_s, e_e + 1):
            exclusions.add(h)
    elif cmd == 'RESERVATION':
        mac = pdict.get('mac', '')
        ip = pdict.get('ip', '')
        raw_reservations.append((mac, ip))

mac_to_ips = {}
ip_to_macs = {}
for mac, ip in raw_reservations:
    mac_to_ips.setdefault(mac, set()).add(ip)
    ip_to_macs.setdefault(ip, set()).add(mac)

valides = []
conflits = []

for mac, ip in raw_reservations:
    host_num = -1
    if ip.startswith(net_prefix):
        try:
            host_num = int(ip[len(net_prefix):])
        except ValueError:
            pass
            
    in_range = (start_host <= host_num <= end_host)
    has_mac_conflict = len(mac_to_ips[mac]) > 1
    has_ip_conflict = len(ip_to_macs[ip]) > 1
    
    if (not in_range) or has_mac_conflict or has_ip_conflict:
        conflits.append((mac, ip))
    else:
        valides.append((mac, ip, host_num))

valide_hosts = {h for _, _, h in valides}

available_hosts = []
for h in range(start_host, end_host + 1):
    if h not in exclusions and h not in valide_hosts:
        available_hosts.append(h)

c_val = len(valides)
c_conf = len(conflits)
print(f"RESERVATIONS valides={c_val} conflits={c_conf}")

tot_avail = len(available_hosts)
if tot_avail > 0:
    first_ip = f"{net_prefix}{available_hosts[0]}"
    last_ip = f"{net_prefix}{available_hosts[-1]}"
    print(f"POOL_DYNAMIC total_disponibles={tot_avail} first_ip={first_ip} last_ip={last_ip}")
else:
    print(f"POOL_DYNAMIC total_disponibles=0 first_ip=NONE last_ip=NONE")

total_scope = (end_host - start_host + 1) if (end_host >= start_host) else 1
pct = round((tot_avail / total_scope) * 100.0, 1)
statut = "OK" if c_conf == 0 else "AVERTISSEMENT"
print(f"SUMMARY statut={statut} pool_pct={pct:.1f}%")
`
  },
  {
    id: 'ws3-c1-e2',
    chapter: 1,
    title: 'Validateur de cohérence de zone DNS d’infrastructure (A, PTR, SRV)',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la réciprocité des enregistrements A et PTR et la présence des enregistrements de service SRV indispensables à Active Directory.',
    brief:
      'Dans une infrastructure Windows Server avec Active Directory, le DNS assure la résolution de noms et la découverte des contrôleurs de domaine (DC) :\n' +
      '- `RECORD_A fqdn=<NOM> ip=<IP>` : résolution directe.\n' +
      '- `RECORD_PTR ip=<IP> fqdn=<NOM>` : résolution inverse (Reverse Lookup).\n' +
      '- `RECORD_SRV service=<SVC> proto=<PROTO> port=<PORT> target=<DC_FQDN>` : localisation de services AD (ex: _ldap, _kerberos).\n\n' +
      'Règles d’audit de zone :\n' +
      '1. Réciprocité A / PTR : chaque `RECORD_A` doit avoir son `RECORD_PTR` exact (même IP et même FQDN). Si le PTR manque ou pointe vers un autre nom, émettre `ANOMALIE_PTR fqdn=<NOM> ip=<IP>`.\n' +
      '2. Résolution de cible SRV : la cible `target` d’un `RECORD_SRV` doit impérativement posséder un enregistrement direct `RECORD_A`. Si absent, émettre `ANOMALIE_SRV target=<DC_FQDN> service=<SVC>`.\n\n' +
      'Sortie :\n' +
      '- Anomalies triées par FQDN / target alphabétique croissant :\n' +
      '  `ANOMALIE_PTR fqdn=<NOM> ip=<IP>` ou `ANOMALIE_SRV target=<DC_FQDN> service=<SVC>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_records=<N> anomalies=<C> statut=<CONFORME|NON_CONFORME>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier la cohérence des zones DNS et des enregistrements SRV
`,
    hints: [
      'Indexer les enregistrements A sous forme {fqdn: ip} et l’inverse {ip: fqdn}.',
      'Comparer les enregistrements PTR à l’index des A.',
      'Vérifier que chaque target de SRV existe dans les clés de l’index A.'
    ],
    examples: [
      {
        stdin:
          'RECORD_A fqdn=dc01.corp.lan ip=192.168.1.10\n' +
          'RECORD_PTR ip=192.168.1.10 fqdn=dc01.corp.lan\n' +
          'RECORD_SRV service=_ldap proto=_tcp port=389 target=dc01.corp.lan',
        expected: 'SUMMARY total_records=3 anomalies=0 statut=CONFORME',
        note: 'Enregistrement direct et inverse synchronisés, cible SRV résolue.'
      }
    ],
    tests: [
      {
        label: 'Enregistrement PTR manquant et cible SRV inconnue',
        stdin:
          'RECORD_A fqdn=srv01.corp.lan ip=10.0.0.5\n' +
          'RECORD_SRV service=_kerberos proto=_tcp port=88 target=dc02.corp.lan',
        expected:
          'ANOMALIE_PTR fqdn=srv01.corp.lan ip=10.0.0.5\n' +
          'ANOMALIE_SRV target=dc02.corp.lan service=_kerberos\n' +
          'SUMMARY total_records=2 anomalies=2 statut=NON_CONFORME'
      },
      {
        label: 'Désynchronisation entre A et PTR sur l’IP',
        stdin:
          'RECORD_A fqdn=mail.corp.lan ip=192.168.1.25\n' +
          'RECORD_PTR ip=192.168.1.25 fqdn=ancien-mail.corp.lan\n' +
          'RECORD_A fqdn=dc.corp.lan ip=192.168.1.1\n' +
          'RECORD_PTR ip=192.168.1.1 fqdn=dc.corp.lan',
        expected:
          'ANOMALIE_PTR fqdn=mail.corp.lan ip=192.168.1.25\n' +
          'SUMMARY total_records=4 anomalies=1 statut=NON_CONFORME'
      },
      {
        label: 'Multiples SRV sur le même DC valide',
        stdin:
          'RECORD_A fqdn=dc.dom.local ip=172.16.1.1\n' +
          'RECORD_PTR ip=172.16.1.1 fqdn=dc.dom.local\n' +
          'RECORD_SRV service=_ldap proto=_tcp port=389 target=dc.dom.local\n' +
          'RECORD_SRV service=_kerberos proto=_tcp port=88 target=dc.dom.local\n' +
          'RECORD_SRV service=_kpasswd proto=_tcp port=464 target=dc.dom.local',
        expected: 'SUMMARY total_records=5 anomalies=0 statut=CONFORME'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

records_a = []
records_ptr = {}
records_srv = []

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'RECORD_A':
        fqdn = pdict.get('fqdn', '')
        ip = pdict.get('ip', '')
        records_a.append((fqdn, ip))
    elif cmd == 'RECORD_PTR':
        ip = pdict.get('ip', '')
        fqdn = pdict.get('fqdn', '')
        records_ptr[ip] = fqdn
    elif cmd == 'RECORD_SRV':
        svc = pdict.get('service', '')
        target = pdict.get('target', '')
        records_srv.append((svc, target))

total_records = len(records_a) + len(records_ptr) + len(records_srv)
anomalies = []

a_names = {fqdn for fqdn, ip in records_a}

for fqdn, ip in records_a:
    ptr_target = records_ptr.get(ip)
    if ptr_target != fqdn:
        anomalies.append(('PTR', fqdn, f"ANOMALIE_PTR fqdn={fqdn} ip={ip}"))

for svc, target in records_srv:
    if target not in a_names:
        anomalies.append(('SRV', target, f"ANOMALIE_SRV target={target} service={svc}"))

anomalies.sort(key=lambda x: (x[0], x[1]))

for _, _, msg in anomalies:
    print(msg)

c_ano = len(anomalies)
statut = "CONFORME" if c_ano == 0 else "NON_CONFORME"
print(f"SUMMARY total_records={total_records} anomalies={c_ano} statut={statut}")
`
  },
  {
    id: 'ws3-c1-e3',
    chapter: 1,
    title: 'Simulateur de dimensionnement de licences Windows Server (Cœurs physiques vs VMs)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer le nombre de packs de licences cœurs requis et déterminer l’édition financièrement optimale (Standard vs Datacenter).',
    brief:
      'Les règles officielles de licences par cœur Microsoft Windows Server imposent :\n' +
      '- Règle 1 : minimum 8 cœurs physiques par socket CPU (si < 8, compter 8).\n' +
      '- Règle 2 : minimum 16 cœurs physiques par serveur physique au total.\n' +
      '- Licences vendues par packs de 2 cœurs : `packs_base = ceil(total_coeurs / 2)`.\n\n' +
      'Règles de virtualisation Windows Server :\n' +
      '- `Édition Standard` (120 € / pack 2 cœurs) : chaque licence complète de l’hôte accorde 2 VMs. Pour $V$ machines virtuelles, multiplier les packs de base par `max(1, ceil(V / 2))`.\n' +
      '- `Édition Datacenter` (750 € / pack 2 cœurs) : une seule licence complète de l’hôte accorde un nombre illimité de VMs (`packs_base` invariants).\n\n' +
      'Entrée :\n' +
      '`SERVER nom=<NOM> sockets=<S> cores_per_socket=<C> vms=<V>`\n\n' +
      'Sortie :\n' +
      '- Profil hôte :\n' +
      '  `SERVER_PROFILE nom=<NOM> base_cores=<COEURS> packs_base=<PACKS>`\n' +
      '- Coûts par édition :\n' +
      '  `EDITION_STANDARD packs=<PACKS_STD> cout=<COUT_STD>EUR`\n' +
      '  `EDITION_DATACENTER packs=<PACKS_DC> cout=<COUT_DC>EUR`\n' +
      '- Recommandation finale (Standard si cout_std <= cout_dc, sinon Datacenter) :\n' +
      '  `RECOMMENDATION nom=<NOM> edition_recommandee=<STANDARD|DATACENTER> economie=<DIFF>EUR`',
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : appliquer les règles de licences Microsoft Windows Server
`,
    hints: [
      'Appliquer max(8, cores) par socket, puis max(16, total).',
      'Calculer les packs Standard en multipliant packs_base par math.ceil(vms / 2) si vms > 0.',
      'Comparer les coûts totaux (120€ vs 750€ par pack).'
    ],
    examples: [
      {
        stdin: 'SERVER nom=HOTE-PROD-01 sockets=2 cores_per_socket=8 vms=4',
        expected:
          'SERVER_PROFILE nom=HOTE-PROD-01 base_cores=16 packs_base=8\n' +
          'EDITION_STANDARD packs=16 cout=1920EUR\n' +
          'EDITION_DATACENTER packs=8 cout=6000EUR\n' +
          'RECOMMENDATION nom=HOTE-PROD-01 edition_recommandee=STANDARD economie=4080EUR',
        note: '16 cœurs = 8 packs. 4 VMs = 2 passages de licence Standard (16 packs = 1920€). Datacenter = 8 packs (6000€). Standard est plus économique de 4080€.'
      }
    ],
    tests: [
      {
        label: 'Forte densité de virtualisation justifiant l’édition Datacenter',
        stdin: 'SERVER nom=CLUSTER-NODE-A sockets=2 cores_per_socket=16 vms=18',
        expected:
          'SERVER_PROFILE nom=CLUSTER-NODE-A base_cores=32 packs_base=16\n' +
          'EDITION_STANDARD packs=144 cout=17280EUR\n' +
          'EDITION_DATACENTER packs=16 cout=12000EUR\n' +
          'RECOMMENDATION nom=CLUSTER-NODE-A edition_recommandee=DATACENTER economie=5280EUR'
      },
      {
        label: 'Mono-socket avec minimums 8 et 16 cœurs appliqués',
        stdin: 'SERVER nom=EDGE-SERVER sockets=1 cores_per_socket=4 vms=2',
        expected:
          'SERVER_PROFILE nom=EDGE-SERVER base_cores=16 packs_base=8\n' +
          'EDITION_STANDARD packs=8 cout=960EUR\n' +
          'EDITION_DATACENTER packs=8 cout=6000EUR\n' +
          'RECOMMENDATION nom=EDGE-SERVER edition_recommandee=STANDARD economie=5040EUR'
      },
      {
        label: 'Aucune machine virtuelle (serveur physique bare-metal)',
        stdin: 'SERVER nom=BARE-METAL sockets=2 cores_per_socket=10 vms=0',
        expected:
          'SERVER_PROFILE nom=BARE-METAL base_cores=20 packs_base=10\n' +
          'EDITION_STANDARD packs=10 cout=1200EUR\n' +
          'EDITION_DATACENTER packs=10 cout=7500EUR\n' +
          'RECOMMENDATION nom=BARE-METAL edition_recommandee=STANDARD economie=6300EUR'
      }
    ],
    solution: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith('SERVER '):
        continue
    params = {}
    for tok in ligne[len('SERVER '):].split(' '):
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    nom = params.get('nom', 'Hote')
    sockets = int(params.get('sockets', 1))
    cores_raw = int(params.get('cores_per_socket', 8))
    vms = int(params.get('vms', 0))
    
    cores_socket = max(8, cores_raw)
    total_cores = max(16, sockets * cores_socket)
    packs_base = math.ceil(total_cores / 2)
    
    mult_std = max(1, math.ceil(vms / 2)) if vms > 0 else 1
    packs_std = packs_base * mult_std
    cout_std = packs_std * 120
    
    packs_dc = packs_base
    cout_dc = packs_dc * 750
    
    print(f"SERVER_PROFILE nom={nom} base_cores={total_cores} packs_base={packs_base}")
    print(f"EDITION_STANDARD packs={packs_std} cout={cout_std}EUR")
    print(f"EDITION_DATACENTER packs={packs_dc} cout={cout_dc}EUR")
    
    if cout_std <= cout_dc:
        recom = "STANDARD"
        diff = cout_dc - cout_std
    else:
        recom = "DATACENTER"
        diff = cout_std - cout_dc
        
    print(f"RECOMMENDATION nom={nom} edition_recommandee={recom} economie={diff}EUR")
`
  }
];
