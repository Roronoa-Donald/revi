/**
 * Exercices Chapitre 3 — Firewall & Sécurité Réseau B3.
 * Politiques de filtrage, listes de contrôle d'accès (ACL) & NAT.
 */
'use strict';

module.exports = [
  {
    id: 'fw3-c3-e1',
    chapter: 3,
    title: 'Moteur d’évaluation d’ACL First-Match-Wins avec Default DROP',
    level: 'n1',
    language: 'python',
    goal: 'Implémenter le moteur séquentiel d’évaluation des règles de filtrage avec politique de refus par défaut.',
    brief: `<p>Dans un pare-feu réseau, les listes de contrôle d'accès (ACL) sont lues séquentiellement de haut en bas : la <strong>première règle qui correspond</strong> au paquet détermine son sort (<code>First-Match-Wins</code>). Si aucune règle ne correspond, la politique de sécurité implicite applique un refus (<code>DEFAULT_DROP</code>).<br><br>
Le script lit sur l'entrée standard :<br>
1. Des règles ordonnées :<br>
<code>RULE id=&lt;id&gt; action=&lt;PERMIT|DENY&gt; proto=&lt;TCP|UDP|ICMP|ANY&gt; src=&lt;ip|ANY&gt; dst=&lt;ip|ANY&gt; dport=&lt;port|ANY&gt;</code>.<br>
2. Des paquets à évaluer :<br>
<code>PACKET id=&lt;pid&gt; proto=&lt;proto&gt; src=&lt;ip&gt; dst=&lt;ip&gt; dport=&lt;port&gt;</code>.<br><br>
Pour chaque paquet, afficher :<br>
<code>EVAL packet={pid} action={PERMIT|DENY} matched={rule_id|DEFAULT_DROP}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : parser les règles ACL et évaluer chaque paquet
`,
    hints: [
      'Stocker les règles dans une liste ordonnée.',
      'Pour chaque critère, une valeur ANY correspond toujours à toute valeur du paquet.',
      'S’arrêter dès la première règle correspondante.'
    ],
    examples: [
      {
        stdin: 'RULE id=R1 action=PERMIT proto=TCP src=ANY dst=10.0.0.10 dport=443\nRULE id=R2 action=DENY proto=ANY src=ANY dst=10.0.0.10 dport=ANY\nPACKET id=P1 proto=TCP src=192.168.1.50 dst=10.0.0.10 dport=443\nPACKET id=P2 proto=TCP src=192.168.1.50 dst=10.0.0.10 dport=22',
        expected: 'EVAL packet=P1 action=PERMIT matched=R1\nEVAL packet=P2 action=DENY matched=R2',
        note: 'P1 matche R1 en premier (PERMIT), P2 ne matche pas R1 mais matche R2 (DENY).'
      }
    ],
    tests: [
      {
        label: 'Paquet ne correspondant à aucune règle menant au DEFAULT_DROP',
        stdin: 'RULE id=R10 action=PERMIT proto=UDP src=10.0.0.1 dst=8.8.8.8 dport=53\nPACKET id=P3 proto=TCP src=10.0.0.1 dst=8.8.8.8 dport=53',
        expected: 'EVAL packet=P3 action=DENY matched=DEFAULT_DROP'
      },
      {
        label: 'Filtrage par adresses IP spécifiques et ANY sur le port',
        stdin: 'RULE id=ADM1 action=PERMIT proto=TCP src=192.168.1.100 dst=10.0.0.1 dport=22\nRULE id=BLOCK_ADM action=DENY proto=TCP src=ANY dst=10.0.0.1 dport=22\nRULE id=WEB action=PERMIT proto=TCP src=ANY dst=ANY dport=80\nPACKET id=T1 proto=TCP src=192.168.1.100 dst=10.0.0.1 dport=22\nPACKET id=T2 proto=TCP src=192.168.1.105 dst=10.0.0.1 dport=22\nPACKET id=T3 proto=TCP src=192.168.1.105 dst=172.16.0.2 dport=80',
        expected: 'EVAL packet=T1 action=PERMIT matched=ADM1\nEVAL packet=T2 action=DENY matched=BLOCK_ADM\nEVAL packet=T3 action=PERMIT matched=WEB'
      },
      {
        label: 'Protocole ICMP sans numéro de port',
        stdin: 'RULE id=PING action=PERMIT proto=ICMP src=ANY dst=10.0.0.1 dport=ANY\nPACKET id=IC1 proto=ICMP src=192.168.1.20 dst=10.0.0.1 dport=0\nPACKET id=IC2 proto=ICMP src=192.168.1.20 dst=10.0.0.2 dport=0',
        expected: 'EVAL packet=IC1 action=PERMIT matched=PING\nEVAL packet=IC2 action=DENY matched=DEFAULT_DROP'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

rules = []
packets = []

for lig in lignes:
    if lig.startswith('RULE'):
        m = re.search(r'id=([^\\s]+)\\s+action=([^\\s]+)\\s+proto=([^\\s]+)\\s+src=([^\\s]+)\\s+dst=([^\\s]+)\\s+dport=([^\\s]+)', lig)
        if m:
            rid, act, proto, src, dst, dport = m.groups()
            rules.append({
                'id': rid,
                'action': act,
                'proto': proto,
                'src': src,
                'dst': dst,
                'dport': dport
            })
    elif lig.startswith('PACKET'):
        m = re.search(r'id=([^\\s]+)\\s+proto=([^\\s]+)\\s+src=([^\\s]+)\\s+dst=([^\\s]+)\\s+dport=([^\\s]+)', lig)
        if m:
            pid, proto, src, dst, dport = m.groups()
            packets.append({
                'id': pid,
                'proto': proto,
                'src': src,
                'dst': dst,
                'dport': dport
            })

for pkt in packets:
    matched = None
    action = 'DENY'
    for r in rules:
        if r['proto'] != 'ANY' and r['proto'] != pkt['proto']:
            continue
        if r['src'] != 'ANY' and r['src'] != pkt['src']:
            continue
        if r['dst'] != 'ANY' and r['dst'] != pkt['dst']:
            continue
        if r['dport'] != 'ANY' and r['dport'] != pkt['dport']:
            continue
        matched = r['id']
        action = r['action']
        break
        
    if matched:
        print(f"EVAL packet={pkt['id']} action={action} matched={matched}")
    else:
        print(f"EVAL packet={pkt['id']} action=DENY matched=DEFAULT_DROP")
`
  },
  {
    id: 'fw3-c3-e2',
    chapter: 3,
    title: 'Détecteur d’anomalies et masquage de règles (Rule Shadowing)',
    level: 'n2',
    language: 'python',
    goal: 'Analyser une politique de sécurité pour détecter les règles masquées (shadowed) ou redondantes.',
    brief: `<p>Une anomalie fréquente dans les jeux de règles de pare-feu est le <strong>masquage de règle</strong> (<em>Shadowing</em>) : une règle antérieure <code>R1</code> est plus générale ou identique à une règle suivante <code>R2</code>, rendant <code>R2</code> totalement inaccessible.<br><br>
Critères simplifiés pour que R1 masque R2 (R1 placée avant R2) :<br>
- Protocole : <code>R1.proto == R2.proto</code> ou <code>R1.proto == 'ANY'</code>.<br>
- Source : <code>R1.src == R2.src</code> ou <code>R1.src == 'ANY'</code>.<br>
- Destination : <code>R1.dst == R2.dst</code> ou <code>R1.dst == 'ANY'</code>.<br>
- Port destination : <code>R1.dport == R2.dport</code> ou <code>R1.dport == 'ANY'</code>.<br><br>
Si ces 4 conditions d'inclusion sont réunies pour au moins une règle antérieure R1 :<br>
- Si <code>R1.action != R2.action</code> : R2 est masquée et son action ne s'appliquera jamais -> <code>SHADOWED by {R1.id}</code>.<br>
- Si <code>R1.action == R2.action</code> : R2 est redondante et inutile -> <code>REDUNDANT with {R1.id}</code>.<br>
- Sinon : la règle est active et valide -> <code>OK</code>.<br><br>
Le script lit les règles ordonnées au format :<br>
<code>RULE id=&lt;id&gt; action=&lt;PERMIT|DENY&gt; proto=&lt;TCP|UDP|ANY&gt; src=&lt;ip|ANY&gt; dst=&lt;ip|ANY&gt; dport=&lt;port|ANY&gt;</code>.<br><br>
Pour chaque règle déclarée, afficher :<br>
<code>ANALYZE rule={id} status={OK | SHADOWED by {r1} | REDUNDANT with {r1}}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : détecter le masquage et la redondance entre règles successives
`,
    hints: [
      'Parcourir chaque règle i et vérifier si une règle j antérieure (j < i) englobe tous ses critères.',
      'S’arrêter au premier antécédent j qui englobe la règle i.'
    ],
    examples: [
      {
        stdin: 'RULE id=R1 action=DENY proto=ANY src=ANY dst=ANY dport=ANY\nRULE id=R2 action=PERMIT proto=TCP src=10.0.0.1 dst=10.0.0.2 dport=80',
        expected: 'ANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=SHADOWED by R1',
        note: 'R1 bloque tout le trafic, donc R2 située après ne sera jamais atteinte.'
      }
    ],
    tests: [
      {
        label: 'Détection d’une redondance parfaite entre deux règles',
        stdin: 'RULE id=R1 action=PERMIT proto=TCP src=ANY dst=10.0.0.5 dport=443\nRULE id=R2 action=PERMIT proto=TCP src=192.168.1.1 dst=10.0.0.5 dport=443\nRULE id=R3 action=PERMIT proto=TCP src=ANY dst=10.0.0.5 dport=80',
        expected: 'ANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=REDUNDANT with R1\nANALYZE rule=R3 status=OK'
      },
      {
        label: 'Règles spécifiques d’abord puis règle générale : politique saine',
        stdin: 'RULE id=R1 action=PERMIT proto=TCP src=10.0.0.50 dst=10.0.0.1 dport=22\nRULE id=R2 action=DENY proto=TCP src=ANY dst=10.0.0.1 dport=22\nRULE id=R3 action=PERMIT proto=TCP src=ANY dst=ANY dport=80',
        expected: 'ANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=OK\nANALYZE rule=R3 status=OK'
      },
      {
        label: 'Multiples masquages en cascade',
        stdin: 'RULE id=A1 action=DENY proto=TCP src=ANY dst=ANY dport=22\nRULE id=A2 action=PERMIT proto=TCP src=192.168.1.1 dst=ANY dport=22\nRULE id=A3 action=DENY proto=TCP src=192.168.1.2 dst=ANY dport=22',
        expected: 'ANALYZE rule=A1 status=OK\nANALYZE rule=A2 status=SHADOWED by A1\nANALYZE rule=A3 status=REDUNDANT with A1'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

rules = []
for lig in lignes:
    m = re.search(r'id=([^\\s]+)\\s+action=([^\\s]+)\\s+proto=([^\\s]+)\\s+src=([^\\s]+)\\s+dst=([^\\s]+)\\s+dport=([^\\s]+)', lig)
    if m:
        rid, act, proto, src, dst, dport = m.groups()
        rules.append({
            'id': rid,
            'action': act,
            'proto': proto,
            'src': src,
            'dst': dst,
            'dport': dport
        })

def covers(r1, r2):
    # r1 englobe r2
    if r1['proto'] != 'ANY' and r1['proto'] != r2['proto']:
        return False
    if r1['src'] != 'ANY' and r1['src'] != r2['src']:
        return False
    if r1['dst'] != 'ANY' and r1['dst'] != r2['dst']:
        return False
    if r1['dport'] != 'ANY' and r1['dport'] != r2['dport']:
        return False
    return True

for i, r in enumerate(rules):
    conflict = None
    for j in range(i):
        prev = rules[j]
        if covers(prev, r):
            conflict = prev
            break
            
    if conflict is None:
        print(f"ANALYZE rule={r['id']} status=OK")
    elif conflict['action'] != r['action']:
        print(f"ANALYZE rule={r['id']} status=SHADOWED by {conflict['id']}")
    else:
        print(f"ANALYZE rule={r['id']} status=REDUNDANT with {conflict['id']}")
`
  },
  {
    id: 'fw3-c3-e3',
    chapter: 3,
    title: 'Simulateur de translation d’adresses NAT (SNAT Masquerade & DNAT)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler les translations SNAT pour le trafic sortant et DNAT (Port Forwarding) pour le trafic entrant.',
    brief: `<p>Le mécanisme NAT (Network Address Translation) permet de masquer le plan d'adressage privé ou d'exposer des services internes.<br><br>
Le script lit la configuration puis une série de paquets à translater :<br>
1. Configuration SNAT :<br>
<code>CONFIG_SNAT public_ip=&lt;ip&gt; start_port=&lt;p&gt;</code> (alloue les ports sortants séquentiellement : start_port, start_port+1, ...).<br>
2. Règles DNAT :<br>
<code>CONFIG_DNAT ext_ip=&lt;ip&gt; ext_port=&lt;p&gt; int_ip=&lt;ip&gt; int_port=&lt;p&gt;</code>.<br>
3. Paquets réseau :<br>
<code>PACKET dir=&lt;OUTBOUND|INBOUND&gt; src=&lt;ip:port&gt; dst=&lt;ip:port&gt;</code>.<br><br>
Règles de translation :<br>
- <code>OUTBOUND</code> (LAN vers Internet) : applique le SNAT.<br>
  L'IP et le port source privés <code>src</code> sont remplacés par <code>public_ip:alloué</code>. La destination <code>dst</code> reste inchangée. L'association inverse est mémorisée dans la table d'état.<br>
- <code>INBOUND</code> (Internet vers LAN) :<br>
  a) Si <code>dst</code> correspond à une règle <code>CONFIG_DNAT</code> : la destination <code>dst</code> est réécrite vers <code>int_ip:int_port</code>.<br>
  b) Sinon si <code>dst</code> correspond au port alloué d'une session SNAT existante : la destination <code>dst</code> est restaurée vers l'IP:port interne de l'hôte LAN.<br>
  c) Sinon : le paquet n'est pas translaté (<code>DROP_NO_ROUTE</code>).<br><br>
Pour chaque paquet, afficher :<br>
<code>NAT dir={dir} in={src_in}->{dst_in} out={src_out}->{dst_out}</code><br>
(ou <code>NAT dir={dir} in={src_in}->{dst_in} out=DROP_NO_ROUTE</code> si rejet)</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la translation SNAT et DNAT
`,
    hints: [
      'Gérer un compteur incrémental pour les ports SNAT dynamiques.',
      'Mémoriser les sessions SNAT : port_alloué -> (src_interne_ip, src_interne_port).'
    ],
    examples: [
      {
        stdin: 'CONFIG_SNAT public_ip=198.51.100.1 start_port=40000\nPACKET dir=OUTBOUND src=192.168.1.50:52001 dst=93.184.216.34:80',
        expected: 'NAT dir=OUTBOUND in=192.168.1.50:52001->93.184.216.34:80 out=198.51.100.1:40000->93.184.216.34:80',
        note: 'Translation SNAT avec réécriture de la source vers l’IP publique et premier port alloué 40000.'
      }
    ],
    tests: [
      {
        label: 'DNAT Port Forwarding entrant vers serveur web DMZ',
        stdin: 'CONFIG_DNAT ext_ip=198.51.100.1 ext_port=80 int_ip=10.0.0.10 int_port=8080\nPACKET dir=INBOUND src=203.0.113.5:12345 dst=198.51.100.1:80',
        expected: 'NAT dir=INBOUND in=203.0.113.5:12345->198.51.100.1:80 out=203.0.113.5:12345->10.0.0.10:8080'
      },
      {
        label: 'Aller-retour complet : SNAT sortant puis réponse retour',
        stdin: 'CONFIG_SNAT public_ip=198.51.100.1 start_port=50000\nPACKET dir=OUTBOUND src=192.168.1.10:4500 dst=8.8.8.8:53\nPACKET dir=INBOUND src=8.8.8.8:53 dst=198.51.100.1:50000',
        expected: 'NAT dir=OUTBOUND in=192.168.1.10:4500->8.8.8.8:53 out=198.51.100.1:50000->8.8.8.8:53\nNAT dir=INBOUND in=8.8.8.8:53->198.51.100.1:50000 out=8.8.8.8:53->192.168.1.10:4500'
      },
      {
        label: 'Paquet entrant sans DNAT ni session SNAT correspondante',
        stdin: 'CONFIG_SNAT public_ip=198.51.100.1 start_port=40000\nPACKET dir=INBOUND src=1.2.3.4:9999 dst=198.51.100.1:22',
        expected: 'NAT dir=INBOUND in=1.2.3.4:9999->198.51.100.1:22 out=DROP_NO_ROUTE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

snat_pub_ip = None
snat_next_port = 40000

dnat_rules = {} # (ext_ip, ext_port) -> (int_ip, int_port)
snat_sessions = {} # allocated_port -> orig_src_str

for lig in lignes:
    if lig.startswith('CONFIG_SNAT'):
        m = re.search(r'public_ip=([^\\s]+)\\s+start_port=([^\\s]+)', lig)
        if m:
            snat_pub_ip = m.group(1)
            snat_next_port = int(m.group(2))
    elif lig.startswith('CONFIG_DNAT'):
        m = re.search(r'ext_ip=([^\\s]+)\\s+ext_port=([^\\s]+)\\s+int_ip=([^\\s]+)\\s+int_port=([^\\s]+)', lig)
        if m:
            eip, eport, iip, iport = m.groups()
            dnat_rules[(eip, int(eport))] = (iip, int(iport))
    elif lig.startswith('PACKET'):
        m = re.search(r'dir=([^\\s]+)\\s+src=([^\\s]+)\\s+dst=([^\\s]+)', lig)
        if not m:
            continue
        pdir, src, dst = m.groups()
        
        if pdir == 'OUTBOUND':
            alloc_port = snat_next_port
            snat_next_port += 1
            snat_sessions[alloc_port] = src
            out_src = f"{snat_pub_ip}:{alloc_port}"
            out_dst = dst
            print(f"NAT dir=OUTBOUND in={src}->{dst} out={out_src}->{out_dst}")
        elif pdir == 'INBOUND':
            dst_ip, dst_port = dst.split(':')
            dst_port = int(dst_port)
            
            if (dst_ip, dst_port) in dnat_rules:
                iip, iport = dnat_rules[(dst_ip, dst_port)]
                out_src = src
                out_dst = f"{iip}:{iport}"
                print(f"NAT dir=INBOUND in={src}->{dst} out={out_src}->{out_dst}")
            elif dst_port in snat_sessions:
                orig_client = snat_sessions[dst_port]
                out_src = src
                out_dst = orig_client
                print(f"NAT dir=INBOUND in={src}->{dst} out={out_src}->{out_dst}")
            else:
                print(f"NAT dir=INBOUND in={src}->{dst} out=DROP_NO_ROUTE")
`
  }
];
