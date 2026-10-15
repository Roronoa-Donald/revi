/**
 * Exercices Chapitre 2 — Firewall & Sécurité Réseau B3.
 * Filtrage dynamique, suivi d'état TCP & table conntrack.
 */
'use strict';

module.exports = [
  {
    id: 'fw3-c2-e1',
    chapter: 2,
    title: 'Machine à états TCP conntrack (NEW, ESTABLISHED, INVALID)',
    level: 'n1',
    language: 'python',
    goal: 'Simuler le moteur conntrack de suivi de sessions TCP selon la RFC 793 et classifier les paquets reçus.',
    brief: `<p>Le script lit sur l'entrée standard des événements réseau décrivant des paquets TCP au format :<br>
<code>PACKET id=&lt;id&gt; src=&lt;ip&gt; dst=&lt;ip&gt; sport=&lt;p&gt; dport=&lt;p&gt; flags=&lt;SYN|SYN_ACK|ACK|FIN|RST|DATA&gt;</code>.<br><br>
Règles de transition d'état conntrack par session identifiée par son quadruplet bidirectionnel <code>{min(ip1:p1, ip2:p2) &lt;-&gt; max(ip1:p1, ip2:p2)}</code> :<br>
1. Un premier paquet avec <code>flags=SYN</code> initie une session : état = <code>NEW</code> (phase de négociation).<br>
2. La réponse avec <code>flags=SYN_ACK</code> dans le sens inverse : état = <code>NEW</code> (attente du handshake 3-voies).<br>
3. Le paquet de confirmation avec <code>flags=ACK</code> clôture le handshake : la session devient <code>ESTABLISHED</code>.<br>
4. Tout paquet ultérieur (<code>DATA</code>, <code>ACK</code>) sur une session connue en <code>ESTABLISHED</code> : état = <code>ESTABLISHED</code>.<br>
5. Un paquet <code>FIN</code> ou <code>RST</code> sur une session <code>ESTABLISHED</code> est classifié <code>ESTABLISHED</code> et ferme la session (supprimée de la table après traitement).<br>
6. Tout paquet (<code>ACK</code>, <code>DATA</code>, <code>FIN</code>, <code>RST</code>, <code>SYN_ACK</code>) reçu hors d'une session active ou sans handshake préalable est classifié <code>INVALID</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>CONNTRACK id={id} state={NEW|ESTABLISHED|INVALID}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : suivre les sessions TCP et classifier l'état conntrack
`,
    hints: [
      'Normaliser la clé de session pour identifier la connexion dans les deux sens.',
      'Suivre les étapes du handshake : SYN -> SYN_ACK -> ACK avant de passer en ESTABLISHED.'
    ],
    examples: [
      {
        stdin: 'PACKET id=1 src=10.0.0.2 dst=192.168.1.10 sport=54321 dport=80 flags=SYN\nPACKET id=2 src=192.168.1.10 dst=10.0.0.2 sport=80 dport=54321 flags=SYN_ACK\nPACKET id=3 src=10.0.0.2 dst=192.168.1.10 sport=54321 dport=80 flags=ACK',
        expected: 'CONNTRACK id=1 state=NEW\nCONNTRACK id=2 state=NEW\nCONNTRACK id=3 state=ESTABLISHED',
        note: 'Handshake complet à 3 voies TCP.'
      }
    ],
    tests: [
      {
        label: 'Paquet DATA légitime après handshake puis fermeture FIN',
        stdin: 'PACKET id=1 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=SYN\nPACKET id=2 src=203.0.113.1 dst=10.0.0.5 sport=443 dport=4000 flags=SYN_ACK\nPACKET id=3 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=ACK\nPACKET id=4 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=DATA\nPACKET id=5 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=FIN\nPACKET id=6 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=DATA',
        expected: 'CONNTRACK id=1 state=NEW\nCONNTRACK id=2 state=NEW\nCONNTRACK id=3 state=ESTABLISHED\nCONNTRACK id=4 state=ESTABLISHED\nCONNTRACK id=5 state=ESTABLISHED\nCONNTRACK id=6 state=INVALID'
      },
      {
        label: 'Attaque par paquets orphelins ACK et RST sans handshake',
        stdin: 'PACKET id=10 src=198.51.100.22 dst=10.0.0.1 sport=60000 dport=22 flags=ACK\nPACKET id=11 src=198.51.100.22 dst=10.0.0.1 sport=60000 dport=22 flags=RST',
        expected: 'CONNTRACK id=10 state=INVALID\nCONNTRACK id=11 state=INVALID'
      },
      {
        label: 'Multiples sessions concurrentes avec rejet hors session',
        stdin: 'PACKET id=A1 src=10.1.1.1 dst=8.8.8.8 sport=1000 dport=53 flags=SYN\nPACKET id=B1 src=10.2.2.2 dst=1.1.1.1 sport=2000 dport=80 flags=SYN\nPACKET id=A2 src=8.8.8.8 dst=10.1.1.1 sport=53 dport=1000 flags=SYN_ACK\nPACKET id=A3 src=10.1.1.1 dst=8.8.8.8 sport=1000 dport=53 flags=ACK\nPACKET id=C1 src=172.16.0.4 dst=10.1.1.1 sport=3000 dport=22 flags=DATA',
        expected: 'CONNTRACK id=A1 state=NEW\nCONNTRACK id=B1 state=NEW\nCONNTRACK id=A2 state=NEW\nCONNTRACK id=A3 state=ESTABLISHED\nCONNTRACK id=C1 state=INVALID'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# Clé de session canonique : tuple trié des deux extrémités
def session_key(src, sport, dst, dport):
    ep1 = (src, int(sport))
    ep2 = (dst, int(dport))
    if ep1 < ep2:
        return (ep1, ep2)
    return (ep2, ep1)

# Table des sessions actives : key -> {'stage': 'SYN_SENT'|'SYN_RCVD'|'ESTABLISHED', 'initiator': (src, sport)}
sessions = {}

for lig in lignes:
    m = re.search(r'id=([^\\s]+)\\s+src=([^\\s]+)\\s+dst=([^\\s]+)\\s+sport=([^\\s]+)\\s+dport=([^\\s]+)\\s+flags=([^\\s]+)', lig)
    if not m:
        continue
    pid, src, dst, sport, dport, flags = m.groups()
    key = session_key(src, sport, dst, dport)
    curr_ep = (src, int(sport))
    
    classification = 'INVALID'
    
    if flags == 'SYN':
        sessions[key] = {'stage': 'SYN_SENT', 'initiator': curr_ep}
        classification = 'NEW'
    elif flags == 'SYN_ACK':
        if key in sessions and sessions[key]['stage'] == 'SYN_SENT' and sessions[key]['initiator'] != curr_ep:
            sessions[key]['stage'] = 'SYN_RCVD'
            classification = 'NEW'
        else:
            classification = 'INVALID'
    elif flags == 'ACK':
        if key in sessions and sessions[key]['stage'] == 'SYN_RCVD':
            sessions[key]['stage'] = 'ESTABLISHED'
            classification = 'ESTABLISHED'
        elif key in sessions and sessions[key]['stage'] == 'ESTABLISHED':
            classification = 'ESTABLISHED'
        else:
            classification = 'INVALID'
    elif flags == 'DATA':
        if key in sessions and sessions[key]['stage'] == 'ESTABLISHED':
            classification = 'ESTABLISHED'
        else:
            classification = 'INVALID'
    elif flags in ('FIN', 'RST'):
        if key in sessions and sessions[key]['stage'] == 'ESTABLISHED':
            classification = 'ESTABLISHED'
            del sessions[key]
        else:
            classification = 'INVALID'
    else:
        classification = 'INVALID'
        
    print(f"CONNTRACK id={pid} state={classification}")
`
  },
  {
    id: 'fw3-c2-e2',
    chapter: 2,
    title: 'Purge et gestion des délais d’expiration (Timeouts) conntrack',
    level: 'n2',
    language: 'python',
    goal: 'Gérer la durée de vie des entrées conntrack selon le protocole et leur dernier timestamp d’activité.',
    brief: `<p>Un pare-feu stateful alloue de la mémoire pour chaque session. Pour prévenir l'épuisement de la RAM, les entrées inactives doivent expirer selon des délais stricts (RFC et bonnes pratiques Linux netfilter) :<br>
- <code>TCP:ESTABLISHED</code> : timeout = <code>3600</code> secondes.<br>
- <code>TCP:SYN_SENT</code> : timeout = <code>60</code> secondes.<br>
- <code>UDP:GENERIC</code> : timeout = <code>30</code> secondes.<br>
- <code>ICMP:ECHO</code> : timeout = <code>10</code> secondes.<br><br>
Le script lit sur l'entrée standard :<br>
1. Des entrées de session : <code>SESSION id=&lt;id&gt; proto=&lt;TCP|UDP|ICMP&gt; state=&lt;state&gt; last_seen=&lt;secondes&gt;</code>.<br>
2. Une commande finale : <code>PURGE now=&lt;secondes&gt;</code>.<br><br>
Une session expire si <code>(now - last_seen) &gt; timeout</code>.<br>
Le script doit afficher la liste des sessions purgées dans l'ordre de leur déclaration, puis le nombre restant :<br>
<code>PURGED: {id1}, {id2}, ...</code> (ou <code>PURGED: NONE</code> si aucune)<br>
<code>REMAINING: {nb_restantes} sessions actives</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : purger les sessions expirées selon leur protocole et délai
`,
    hints: [
      'Associer chaque couple (proto, state) à sa durée limite.',
      'Calculer l’inactivité : now - last_seen.'
    ],
    examples: [
      {
        stdin: 'SESSION id=S1 proto=TCP state=ESTABLISHED last_seen=1000\nSESSION id=S2 proto=UDP state=GENERIC last_seen=4800\nPURGE now=5000',
        expected: 'PURGED: S1, S2\nREMAINING: 0 sessions actives',
        note: 'S1 inactive depuis 4000s (> 3600s) et S2 inactive depuis 200s (> 30s) : toutes purgées.'
      }
    ],
    tests: [
      {
        label: 'Sessions mixtes avec conservation ICMP active et TCP expirés',
        stdin: 'SESSION id=S10 proto=TCP state=ESTABLISHED last_seen=3000\nSESSION id=S11 proto=ICMP state=ECHO last_seen=7195\nSESSION id=S12 proto=TCP state=SYN_SENT last_seen=7100\nPURGE now=7200',
        expected: 'PURGED: S10, S12\nREMAINING: 1 sessions actives'
      },
      {
        label: 'Aucune session expirée',
        stdin: 'SESSION id=A1 proto=TCP state=ESTABLISHED last_seen=1000\nSESSION id=A2 proto=UDP state=GENERIC last_seen=1020\nPURGE now=1030',
        expected: 'PURGED: NONE\nREMAINING: 2 sessions actives'
      },
      {
        label: 'Toutes les sessions conservées et expirées en chaîne',
        stdin: 'SESSION id=U1 proto=UDP state=GENERIC last_seen=100\nSESSION id=T1 proto=TCP state=SYN_SENT last_seen=100\nSESSION id=I1 proto=ICMP state=ECHO last_seen=100\nPURGE now=200',
        expected: 'PURGED: U1, T1, I1\nREMAINING: 0 sessions actives'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

TIMEOUTS = {
    ('TCP', 'ESTABLISHED'): 3600,
    ('TCP', 'SYN_SENT'): 60,
    ('UDP', 'GENERIC'): 30,
    ('ICMP', 'ECHO'): 10
}

sessions = []
now_ts = 0

for lig in lignes:
    if lig.startswith('SESSION'):
        m = re.search(r'id=([^\\s]+)\\s+proto=([^\\s]+)\\s+state=([^\\s]+)\\s+last_seen=([^\\s]+)', lig)
        if m:
            sid, proto, st, ls = m.groups()
            sessions.append({
                'id': sid,
                'proto': proto,
                'state': st,
                'last_seen': int(ls)
            })
    elif lig.startswith('PURGE'):
        m = re.search(r'now=([^\\s]+)', lig)
        if m:
            now_ts = int(m.group(1))

purged = []
active = []

for s in sessions:
    key = (s['proto'], s['state'])
    timeout = TIMEOUTS.get(key, 60)
    inactivity = now_ts - s['last_seen']
    if inactivity > timeout:
        purged.append(s['id'])
    else:
        active.append(s['id'])

if purged:
    print(f"PURGED: {', '.join(purged)}")
else:
    print("PURGED: NONE")
print(f"REMAINING: {len(active)} sessions actives")
`
  },
  {
    id: 'fw3-c2-e3',
    chapter: 2,
    title: 'Détecteur de balayages furtifs (Scans Xmas, Null, FIN & Syn-Fin)',
    level: 'n3',
    language: 'python',
    goal: 'Détecter les combinaisons illégales de flags TCP caractéristiques des outils de reconnaissance furtive.',
    brief: `<p>Les attaquants exploitent les spécifications de la RFC 793 pour contourner les pare-feux stateless et cartographier les ports ouverts via des combinaisons atypiques de flags TCP.<br>
Le script lit sur l'entrée standard des paquets suspects :<br>
<code>PROBE src=&lt;ip&gt; dst=&lt;ip&gt; dport=&lt;port&gt; flags=&lt;liste_flags_separes_par_virgule&gt;</code>.<br><br>
Règles d'analyse et de classification :<br>
1. <code>SYN,FIN</code> : Paquet contradictoire demandant l'ouverture et la fermeture simultanées -> <code>SYN_FIN_ANOMALY</code> (Danger élevé).<br>
2. <code>FIN,PSH,URG</code> (dans n'importe quel ordre) : Arbre de Noël allumé -> <code>XMAS_TREE_SCAN</code> (Sonde Nmap -sX).<br>
3. <code>NONE</code> (aucun flag activé) : Paquet fantôme -> <code>NULL_SCAN</code> (Sonde Nmap -sN).<br>
4. Uniquement <code>FIN</code> : Paquet de fin isolé sans handshake -> <code>FIN_SCAN</code> (Sonde Nmap -sF).<br>
5. Toute autre combinaison standard (ex: <code>SYN</code> seul, <code>ACK</code> seul, <code>SYN,ACK</code>) -> <code>TRAFIC_STANDARD</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>SCAN_ALERT: {src} -> {dst}:{dport} [{flags}] => {CLASSIFICATION}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les flags TCP et classifier l'attaque ou scan
`,
    hints: [
      'Découper la chaîne flags par virgule et manipuler un set de flags.',
      'Comparer les ensembles pour gérer l’ordre des flags dans Xmas Scan.'
    ],
    examples: [
      {
        stdin: 'PROBE src=192.168.1.100 dst=10.0.0.1 dport=22 flags=FIN,PSH,URG',
        expected: 'SCAN_ALERT: 192.168.1.100 -> 10.0.0.1:22 [FIN,PSH,URG] => XMAS_TREE_SCAN',
        note: 'Sonde de type Xmas Scan avec FIN, PSH et URG actifs.'
      }
    ],
    tests: [
      {
        label: 'Détection Null scan et Syn-Fin anomaly',
        stdin: 'PROBE src=198.51.100.5 dst=10.0.0.10 dport=80 flags=NONE\nPROBE src=198.51.100.6 dst=10.0.0.10 dport=443 flags=SYN,FIN',
        expected: 'SCAN_ALERT: 198.51.100.5 -> 10.0.0.10:80 [NONE] => NULL_SCAN\nSCAN_ALERT: 198.51.100.6 -> 10.0.0.10:443 [SYN,FIN] => SYN_FIN_ANOMALY'
      },
      {
        label: 'Détection FIN scan isolé et trafic standard',
        stdin: 'PROBE src=203.0.113.8 dst=10.0.0.2 dport=3306 flags=FIN\nPROBE src=10.0.0.20 dst=172.16.0.5 dport=80 flags=SYN',
        expected: 'SCAN_ALERT: 203.0.113.8 -> 10.0.0.2:3306 [FIN] => FIN_SCAN\nSCAN_ALERT: 10.0.0.20 -> 172.16.0.5:80 [SYN] => TRAFIC_STANDARD'
      },
      {
        label: 'Variante Xmas scan avec ordre désordonné des flags',
        stdin: 'PROBE src=192.0.2.1 dst=192.168.1.1 dport=8080 flags=URG,FIN,PSH',
        expected: 'SCAN_ALERT: 192.0.2.1 -> 192.168.1.1:8080 [URG,FIN,PSH] => XMAS_TREE_SCAN'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'src=([^\\s]+)\\s+dst=([^\\s]+)\\s+dport=([^\\s]+)\\s+flags=([^\\s]+)', lig)
    if not m:
        continue
    src, dst, dport, raw_flags = m.groups()
    flag_set = set(raw_flags.split(','))
    
    if flag_set == {'SYN', 'FIN'}:
        res = 'SYN_FIN_ANOMALY'
    elif flag_set == {'FIN', 'PSH', 'URG'}:
        res = 'XMAS_TREE_SCAN'
    elif raw_flags == 'NONE' or flag_set == {'NONE'}:
        res = 'NULL_SCAN'
    elif flag_set == {'FIN'}:
        res = 'FIN_SCAN'
    else:
        res = 'TRAFIC_STANDARD'
        
    print(f"SCAN_ALERT: {src} -> {dst}:{dport} [{raw_flags}] => {res}")
`
  }
];
