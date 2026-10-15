/**
 * Exercices Chapitre 2 — pfSense & Routage B3.
 * Filtrage Avancé, États & Gestion des Règles de Pare-feu.
 */
'use strict';

module.exports = [
  {
    id: 'pf3-c2-e1',
    chapter: 2,
    title: 'Résolveur d’alias d’adresses et de ports pfSense (Firewall Aliases)',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier si un paquet correspond aux critères d’un Alias d’adresses IP ou de ports dans pfSense.',
    brief: `<p>Les <strong>Alias</strong> dans pfSense simplifient la maintenance des règles de filtrage en regroupant des adresses IP, des réseaux ou des ports sous un nom unique (ex: <code>WEB_PORTS</code> pour <code>80,443</code>).<br><br>
Le script lit sur l'entrée standard d'abord la définition d'un alias :<br>
<code>ALIAS_DEF name=&lt;nom&gt; values=&lt;val1,val2,...&gt;</code>.<br>
Puis une série de vérifications :<br>
<code>CHECK_ALIAS alias=&lt;nom&gt; target=&lt;valeur&gt;</code>.<br><br>
Pour chaque vérification, afficher :<br>
<code>ALIAS_RESULT alias={alias} target={target} match={YES|NO}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : stocker les alias et tester la correspondance
`,
    hints: [
      'Stocker les valeurs de l’alias dans un ensemble set().',
      'Tester si target est présent dans l’ensemble pour répondre YES ou NO.'
    ],
    examples: [
      {
        stdin: 'ALIAS_DEF name=WEB_PORTS values=80,443,8080\nCHECK_ALIAS alias=WEB_PORTS target=443\nCHECK_ALIAS alias=WEB_PORTS target=22',
        expected: 'ALIAS_RESULT alias=WEB_PORTS target=443 match=YES\nALIAS_RESULT alias=WEB_PORTS target=22 match=NO',
        note: 'Le port 443 est dans l’alias, le port 22 n’y est pas.'
      }
    ],
    tests: [
      {
        label: 'Alias d’adresses IP de serveurs DNS',
        stdin: 'ALIAS_DEF name=DNS_SERVERS values=1.1.1.1,8.8.8.8,9.9.9.9\nCHECK_ALIAS alias=DNS_SERVERS target=8.8.8.8\nCHECK_ALIAS alias=DNS_SERVERS target=192.168.1.1',
        expected: 'ALIAS_RESULT alias=DNS_SERVERS target=8.8.8.8 match=YES\nALIAS_RESULT alias=DNS_SERVERS target=192.168.1.1 match=NO'
      },
      {
        label: 'Alias contenant un seul élément',
        stdin: 'ALIAS_DEF name=BASTION values=10.0.0.100\nCHECK_ALIAS alias=BASTION target=10.0.0.100\nCHECK_ALIAS alias=BASTION target=10.0.0.101',
        expected: 'ALIAS_RESULT alias=BASTION target=10.0.0.100 match=YES\nALIAS_RESULT alias=BASTION target=10.0.0.101 match=NO'
      },
      {
        label: 'Plusieurs vérifications consécutives',
        stdin: 'ALIAS_DEF name=ADMIN_PORTS values=22,3389,8443\nCHECK_ALIAS alias=ADMIN_PORTS target=22\nCHECK_ALIAS alias=ADMIN_PORTS target=80\nCHECK_ALIAS alias=ADMIN_PORTS target=3389',
        expected: 'ALIAS_RESULT alias=ADMIN_PORTS target=22 match=YES\nALIAS_RESULT alias=ADMIN_PORTS target=80 match=NO\nALIAS_RESULT alias=ADMIN_PORTS target=3389 match=YES'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

aliases = {}

for lig in lignes:
    if lig.startswith('ALIAS_DEF'):
        tokens = lig.split()
        name = ''
        vals = set()
        for tok in tokens[1:]:
            if tok.startswith('name='):
                name = tok.split('=', 1)[1]
            elif tok.startswith('values='):
                raw = tok.split('=', 1)[1]
                vals = set(x.strip() for x in raw.split(',') if x.strip())
        aliases[name] = vals
        continue
        
    if not lig.startswith('CHECK_ALIAS'):
        continue
        
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    a_name = params.get('alias', '')
    tgt = params.get('target', '')
    
    vals = aliases.get(a_name, set())
    match_str = 'YES' if tgt in vals else 'NO'
    print(f"ALIAS_RESULT alias={a_name} target={tgt} match={match_str}")
`
  },
  {
    id: 'pf3-c2-e2',
    chapter: 2,
    title: 'Moteur d’évaluation séquentielle de règles de filtrage (First-Match Wins)',
    level: 'n2',
    language: 'python',
    goal: 'Simuler l’évaluation ordonnée des règles dans pfSense : la première règle correspondante s’applique immédiatement.',
    brief: `<p>Contrairement au moteur PF brut sous OpenBSD (où la dernière règle gagne sauf directive <code>quick</code>), <strong>pfSense applique par défaut le comportement First-Match</strong> (toutes les règles graphiques portent implicitement l'option <code>quick</code>).<br><br>
Le script lit sur l'entrée standard d'abord les règles dans l'ordre de priorité :<br>
<code>RULE id=&lt;id&gt; action=&lt;PASS|BLOCK&gt; src=&lt;ip|any&gt; port=&lt;int|any&gt;</code>.<br>
Puis des paquets à évaluer :<br>
<code>EVAL_PKT pkt_id=&lt;id&gt; src=&lt;ip&gt; port=&lt;int&gt;</code>.<br><br>
Règles :<br>
- Parcourir les règles dans l'ordre de déclaration.<br>
- La première règle qui correspond (src match et port match) s'applique :<br>
  <code>decision={PASS|BLOCK} matched_rule={rule_id}</code>.<br>
- Si aucune règle ne correspond, la règle implicite de fin de chaîne s'applique (Deny All) :<br>
  <code>decision=BLOCK matched_rule=DEFAULT_DENY</code>.<br><br>
Pour chaque paquet, afficher :<br>
<code>PKT_DECISION pkt_id={pkt_id} decision={decision} rule={matched_rule}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer les paquets selon le principe First-Match de pfSense
`,
    hints: [
      'Stocker les règles dans une liste ordonnée.',
      'Pour chaque paquet, boucler sur les règles et s’arrêter dès la première correspondance.'
    ],
    examples: [
      {
        stdin: 'RULE id=R1 action=PASS src=192.168.1.10 port=443\nRULE id=R2 action=BLOCK src=192.168.1.10 port=any\nEVAL_PKT pkt_id=P1 src=192.168.1.10 port=443\nEVAL_PKT pkt_id=P2 src=192.168.1.10 port=80',
        expected: 'PKT_DECISION pkt_id=P1 decision=PASS rule=R1\nPKT_DECISION pkt_id=P2 decision=BLOCK rule=R2',
        note: 'P1 correspond à R1 (port 443). P2 ne correspond pas à R1, mais correspond à R2 (port any).'
      }
    ],
    tests: [
      {
        label: 'Paquet ne correspondant à aucune règle (Default Deny)',
        stdin: 'RULE id=R1 action=PASS src=10.0.0.1 port=22\nEVAL_PKT pkt_id=EXT src=192.168.1.50 port=80',
        expected: 'PKT_DECISION pkt_id=EXT decision=BLOCK rule=DEFAULT_DENY'
      },
      {
        label: 'Règle générique masquant une règle ultérieure (Shadowing)',
        stdin: 'RULE id=R_ALLOW_ALL action=PASS src=any port=any\nRULE id=R_BLOCK_SSH action=BLOCK src=any port=22\nEVAL_PKT pkt_id=P_SSH src=172.16.0.4 port=22',
        expected: 'PKT_DECISION pkt_id=P_SSH decision=PASS rule=R_ALLOW_ALL'
      },
      {
        label: 'Série de règles avec filtrage strict par port',
        stdin: 'RULE id=R1 action=PASS src=any port=53\nRULE id=R2 action=PASS src=any port=80\nRULE id=R3 action=BLOCK src=any port=any\nEVAL_PKT pkt_id=PKT_DNS src=1.2.3.4 port=53\nEVAL_PKT pkt_id=PKT_HTTP src=1.2.3.4 port=80\nEVAL_PKT pkt_id=PKT_TELNET src=1.2.3.4 port=23',
        expected: 'PKT_DECISION pkt_id=PKT_DNS decision=PASS rule=R1\nPKT_DECISION pkt_id=PKT_HTTP decision=PASS rule=R2\nPKT_DECISION pkt_id=PKT_TELNET decision=BLOCK rule=R3'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

rules = []

for lig in lignes:
    if lig.startswith('RULE'):
        tokens = lig.split()
        params = {}
        for tok in tokens[1:]:
            if '=' in tok:
                k, v = tok.split('=', 1)
                params[k] = v
        rules.append(params)
        continue
        
    if not lig.startswith('EVAL_PKT'):
        continue
        
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pkt_id = params.get('pkt_id', 'P')
    p_src = params.get('src', '')
    p_port = params.get('port', '')
    
    matched_rule = 'DEFAULT_DENY'
    decision = 'BLOCK'
    
    for r in rules:
        r_src = r.get('src', 'any')
        r_port = r.get('port', 'any')
        
        src_ok = (r_src == 'any' or r_src == p_src)
        port_ok = (r_port == 'any' or r_port == p_port)
        
        if src_ok and port_ok:
            matched_rule = r.get('id', 'R')
            decision = r.get('action', 'BLOCK')
            break
            
    print(f"PKT_DECISION pkt_id={pkt_id} decision={decision} rule={matched_rule}")
`
  },
  {
    id: 'pf3-c2-e3',
    chapter: 2,
    title: 'Parseur de table d’états PF et détection de connexions semi-ouvertes',
    level: 'n3',
    language: 'python',
    goal: 'Analyser la table d’états du pare-feu (pfctl -ss) et détecter les attaques par saturation SYN Flood (états SYN_SENT semi-ouverts).',
    brief: `<p>pfSense est un pare-feu à inspection d'états (Stateful Inspection). Lorsqu'un paquet traverse le filtre avec succès, une entrée est enregistrée dans la table d'états (State Table).<br><br>
Le script lit sur l'entrée standard des enregistrements d'états au format :<br>
<code>STATE_ENTRY id=&lt;id&gt; proto=&lt;tcp|udp&gt; src=&lt;ip:port&gt; dst=&lt;ip:port&gt; state=&lt;ESTABLISHED|SYN_SENT|FIN_WAIT|TIME_WAIT&gt; age_sec=&lt;int&gt;</code>.<br><br>
Règles de diagnostic :<br>
1. Une connexion TCP à l'état <code>SYN_SENT</code> durant depuis plus de 30 secondes (<code>age_sec &gt; 30</code>) traduit un serveur cible injoignable ou une attaque SYN Flood :<br>
   <code>alert=HALF_OPEN_ATTACK_SUSPECT</code>.<br>
2. Si <code>state == 'ESTABLISHED'</code> : <code>alert=HEALTHY_SESSION</code>.<br>
3. Si <code>state in ['FIN_WAIT', 'TIME_WAIT']</code> : <code>alert=CLOSING_SESSION</code>.<br>
4. Pour UDP (sans état natif) : <code>alert=STATELESS_UDP</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>STATE_DIAG id={id} proto={proto} state={state} alert={alert}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : parser la table d'états et classifier les sessions
`,
    hints: [
      'Tester d’abord si proto == "tcp" et state == "SYN_SENT" avec age_sec > 30.',
      'Classifier les autres états selon les règles.'
    ],
    examples: [
      {
        stdin: 'STATE_ENTRY id=10 proto=tcp src=192.168.1.10:49152 dst=93.184.216.34:443 state=SYN_SENT age_sec=45',
        expected: 'STATE_DIAG id=10 proto=tcp state=SYN_SENT alert=HALF_OPEN_ATTACK_SUSPECT',
        note: 'État SYN_SENT bloqué depuis 45s : suspicion d’attaque ou panne cible.'
      }
    ],
    tests: [
      {
        label: 'Session TCP normale établie',
        stdin: 'STATE_ENTRY id=20 proto=tcp src=10.0.0.5:52000 dst=1.1.1.1:443 state=ESTABLISHED age_sec=120',
        expected: 'STATE_DIAG id=20 proto=tcp state=ESTABLISHED alert=HEALTHY_SESSION'
      },
      {
        label: 'Trafic UDP et session en fermeture',
        stdin: 'STATE_ENTRY id=30 proto=udp src=10.0.0.5:53000 dst=8.8.8.8:53 state=SINGLE age_sec=5\nSTATE_ENTRY id=31 proto=tcp src=10.0.0.5:54000 dst=8.8.8.8:80 state=TIME_WAIT age_sec=15',
        expected: 'STATE_DIAG id=30 proto=udp state=SINGLE alert=STATELESS_UDP\nSTATE_DIAG id=31 proto=tcp state=TIME_WAIT alert=CLOSING_SESSION'
      },
      {
        label: 'SYN_SENT récent sous le seuil d’alerte',
        stdin: 'STATE_ENTRY id=40 proto=tcp src=192.168.1.15:4400 dst=10.0.0.1:80 state=SYN_SENT age_sec=5',
        expected: 'STATE_DIAG id=40 proto=tcp state=SYN_SENT alert=HEALTHY_SESSION'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('STATE_ENTRY'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    sid = params.get('id', '1')
    proto = params.get('proto', 'tcp')
    state = params.get('state', 'ESTABLISHED')
    age = int(params.get('age_sec', 0))
    
    if proto == 'tcp' and state == 'SYN_SENT' and age > 30:
        alert = 'HALF_OPEN_ATTACK_SUSPECT'
    elif proto == 'udp':
        alert = 'STATELESS_UDP'
    elif state in ['FIN_WAIT', 'TIME_WAIT']:
        alert = 'CLOSING_SESSION'
    else:
        alert = 'HEALTHY_SESSION'
        
    print(f"STATE_DIAG id={sid} proto={proto} state={state} alert={alert}")
`
  }
];
