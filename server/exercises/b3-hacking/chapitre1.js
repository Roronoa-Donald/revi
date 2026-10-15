/**
 * server/exercises/b3-hacking/chapitre1.js — Exercices du Chapitre 1
 * Chapitre 1 : Fondements du Hacking Éthique, Cadre Légal & Méthodologies de Pentest
 */

module.exports = [
  {
    id: 'hk3-c1-e1',
    chapter: 1,
    title: 'Calculateur de Score CVSS v3.1 Base Metrics',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le sous-score d\'exploitabilité, d\'impact et le Base Score CVSS v3.1 d\'une vulnérabilité avec sa sévérité.',
    brief: `<p>Le standard CVSS v3.1 (Common Vulnerability Scoring System) quantifie la sévérité d'une faille de sécurité.<br><br>
Métriques de base (Scope Unchanged 'U') :<br>
- <code>AV</code> (Attack Vector) : Network (N)=0.85, Adjacent (A)=0.62, Local (L)=0.55, Physical (P)=0.20<br>
- <code>AC</code> (Attack Complexity) : Low (L)=0.77, High (H)=0.44<br>
- <code>PR</code> (Privileges Required) : None (N)=0.85, Low (L)=0.62, High (H)=0.27<br>
- <code>UI</code> (User Interaction) : None (N)=0.85, Required (R)=0.62<br>
- <code>C, I, A</code> (Confidentiality, Integrity, Availability) : None (N)=0.0, Low (L)=0.22, High (H)=0.56<br><br>
Formules (Scope Unchanged) :<br>
1. <code>Exploitability = 8.22 * AV * AC * PR * UI</code><br>
2. <code>ISS = 1.0 - ((1.0 - C) * (1.0 - I) * (1.0 - A))</code><br>
3. <code>Impact = 6.42 * ISS</code><br>
4. Si <code>Impact &lt;= 0</code> : <code>BaseScore = 0.0</code><br>
   Sinon : <code>BaseScore = min(10.0, math.ceil(round(Impact + Exploitability, 4) * 10) / 10.0)</code><br><br>
Sévérités CVSS v3.1 :<br>
- <code>0.0</code> : <code>NONE</code><br>
- <code>0.1 à 3.9</code> : <code>LOW</code><br>
- <code>4.0 à 6.9</code> : <code>MEDIUM</code><br>
- <code>7.0 à 8.9</code> : <code>HIGH</code><br>
- <code>9.0 à 10.0</code> : <code>CRITICAL</code><br><br>
Entrée STDIN : <code>CVSS_CALC AV=&lt;N|A|L|P&gt; AC=&lt;L|H&gt; PR=&lt;N|L|H&gt; UI=&lt;N|R&gt; C=&lt;N|L|H&gt; I=&lt;N|L|H&gt; A=&lt;N|L|H&gt;</code>.<br>
Sortie : <code>CVSS: exploitability=&lt;exp:.2f&gt; impact=&lt;imp:.2f&gt; base_score=&lt;score:.1f&gt; severity=&lt;sev&gt;</code>.</p>`,
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le score CVSS v3.1
`,
    hints: [
      'Créez des dictionnaires pour les pondérations numériques de chaque métrique.',
      'Calculez ISS = 1.0 - ((1.0 - C) * (1.0 - I) * (1.0 - A)) puis Impact = 6.42 * ISS.',
      'Arrondissez au dixième supérieur : math.ceil(round(Impact + Exploitability, 4) * 10) / 10.0.'
    ],
    examples: [
      {
        stdin: 'CVSS_CALC AV=N AC=L PR=N UI=N C=H I=H A=H',
        expected: 'CVSS: exploitability=3.89 impact=5.87 base_score=9.8 severity=CRITICAL',
        note: 'RCE non-authentifiée à distance critique maximale (Impact et exploitabilité élevés).'
      }
    ],
    tests: [
      {
        label: 'Vulnérabilité locale avec interaction utilisateur et impact moyen',
        stdin: 'CVSS_CALC AV=L AC=L PR=N UI=R C=L I=L A=N',
        expected: 'CVSS: exploitability=1.83 impact=2.51 base_score=4.4 severity=MEDIUM'
      },
      {
        label: 'Vulnérabilité réseau complexe nécessitant hauts privilèges',
        stdin: 'CVSS_CALC AV=N AC=H PR=H UI=N C=H I=N A=N',
        expected: 'CVSS: exploitability=0.71 impact=3.60 base_score=4.4 severity=MEDIUM'
      },
      {
        label: 'Aucun impact de sécurité (Impact nul -> score 0.0)',
        stdin: 'CVSS_CALC AV=N AC=L PR=N UI=N C=N I=N A=N',
        expected: 'CVSS: exploitability=3.89 impact=0.00 base_score=0.0 severity=NONE'
      }
    ],
    solution: `import sys
import math

av_map = {'N': 0.85, 'A': 0.62, 'L': 0.55, 'P': 0.20}
ac_map = {'L': 0.77, 'H': 0.44}
pr_map = {'N': 0.85, 'L': 0.62, 'H': 0.27}
ui_map = {'N': 0.85, 'R': 0.62}
cia_map = {'N': 0.0, 'L': 0.22, 'H': 0.56}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k.upper()] = v.upper()
            
    av = av_map.get(params.get('AV', 'N'), 0.85)
    ac = ac_map.get(params.get('AC', 'L'), 0.77)
    pr = pr_map.get(params.get('PR', 'N'), 0.85)
    ui = ui_map.get(params.get('UI', 'N'), 0.85)
    
    c = cia_map.get(params.get('C', 'N'), 0.0)
    i = cia_map.get(params.get('I', 'N'), 0.0)
    a = cia_map.get(params.get('A', 'N'), 0.0)
    
    exploitability = 8.22 * av * ac * pr * ui
    iss = 1.0 - ((1.0 - c) * (1.0 - i) * (1.0 - a))
    impact = 6.42 * iss
    
    if impact <= 0.0:
        base_score = 0.0
    else:
        raw_score = impact + exploitability
        base_score = min(10.0, math.ceil(round(raw_score, 4) * 10.0) / 10.0)
        
    if base_score == 0.0:
        sev = 'NONE'
    elif base_score <= 3.9:
        sev = 'LOW'
    elif base_score <= 6.9:
        sev = 'MEDIUM'
    elif base_score <= 8.9:
        sev = 'HIGH'
    else:
        sev = 'CRITICAL'
        
    print(f"CVSS: exploitability={exploitability:.2f} impact={impact:.2f} base_score={base_score:.1f} severity={sev}")
`
  },
  {
    id: 'hk3-c1-e2',
    chapter: 1,
    title: 'Validateur de Règles d\'Engagement (RoE) et Périmètre d\'Audit',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier qu\'une action d\'audit de sécurité respecte le contrat de mandat de pentest (IP, ports, techniques interdites, créneau horaire).',
    brief: `<p>Dans un test d'intrusion éthique, toute action en dehors des Règles d'Engagement (RoE) constitue une faute juridique grave (art. 323-1 du Code Pénal).<br><br>
Commandes lues sur STDIN :<br>
1. <code>ROE_CONFIG target_ips=&lt;ip1,ip2,...&gt; allowed_ports=&lt;p1,p2,...&gt; forbidden_techniques=&lt;t1,t2,...&gt; window=&lt;start_h-end_h&gt;</code> : configure le périmètre.<br>
2. <code>AUDIT_ACTION ip=&lt;ip&gt; port=&lt;p&gt; technique=&lt;tech&gt; hour=&lt;h&gt;</code> : soumet une action à validation.<br><br>
Règles de validation (évaluées dans cet ordre précis) :<br>
1. Si l'IP n'est pas dans <code>target_ips</code> : <code>DENIED: reason=OUT_OF_SCOPE_IP target=&lt;ip&gt;</code><br>
2. Si le port n'est pas dans <code>allowed_ports</code> : <code>DENIED: reason=FORBIDDEN_PORT port=&lt;p&gt;</code><br>
3. Si la technique est dans <code>forbidden_techniques</code> : <code>DENIED: reason=PROHIBITED_TECHNIQUE technique=&lt;tech&gt;</code><br>
4. Si l'heure <code>h</code> est strictement hors créneau <code>start_h &lt;= h &lt;= end_h</code> : <code>DENIED: reason=OUTSIDE_TIME_WINDOW hour=&lt;h&gt;</code><br>
5. Sinon : <code>PERMITTED: target=&lt;ip&gt;:&lt;p&gt; technique=&lt;tech&gt; status=AUTHORIZED</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la validation des règles d'engagement
`,
    hints: [
      'Stockez target_ips, allowed_ports et forbidden_techniques sous forme d\'ensembles (set) pour des tests efficaces.',
      'Découpez window sur le tiret pour obtenir start_h et end_h convertis en int.',
      'Validez les conditions séquentiellement dès qu\'une règle de sécurité est violée.'
    ],
    examples: [
      {
        stdin: `ROE_CONFIG target_ips=192.168.1.10,192.168.1.20 allowed_ports=80,443,22 forbidden_techniques=DOS,SOCIAL_ENG window=08-18
AUDIT_ACTION ip=192.168.1.10 port=443 technique=PORT_SCAN hour=14`,
        expected: 'PERMITTED: target=192.168.1.10:443 technique=PORT_SCAN status=AUTHORIZED',
        note: 'Action autorisée dans le périmètre et pendant le créneau contractuel.'
      }
    ],
    tests: [
      {
        label: 'Rejet IP hors périmètre (Out of scope)',
        stdin: `ROE_CONFIG target_ips=10.0.0.5 allowed_ports=80,443 forbidden_techniques=DOS window=09-17
AUDIT_ACTION ip=10.0.0.99 port=80 technique=DIR_BRUTEFORCE hour=10`,
        expected: 'DENIED: reason=OUT_OF_SCOPE_IP target=10.0.0.99'
      },
      {
        label: 'Rejet technique prohibée par le mandat (Déni de service)',
        stdin: `ROE_CONFIG target_ips=172.16.0.10 allowed_ports=80,443 forbidden_techniques=DOS,EXPLOIT_BRUTEFORCE window=08-20
AUDIT_ACTION ip=172.16.0.10 port=80 technique=DOS hour=11`,
        expected: 'DENIED: reason=PROHIBITED_TECHNIQUE technique=DOS'
      },
      {
        label: 'Rejet action exécutée en dehors de la fenêtre horaire convenue',
        stdin: `ROE_CONFIG target_ips=192.168.10.50 allowed_ports=22,80 forbidden_techniques=EXPLOIT_UNAPPROVED window=20-23
AUDIT_ACTION ip=192.168.10.50 port=22 technique=SSH_AUDIT hour=15`,
        expected: 'DENIED: reason=OUTSIDE_TIME_WINDOW hour=15'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

target_ips = set()
allowed_ports = set()
forbidden_tech = set()
win_start = 0
win_end = 24

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    params = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    if cmd == 'ROE_CONFIG':
        target_ips = set(params.get('target_ips', '').split(','))
        allowed_ports = set(params.get('allowed_ports', '').split(','))
        forbidden_tech = set(params.get('forbidden_techniques', '').split(','))
        win_str = params.get('window', '00-24')
        if '-' in win_str:
            s_str, e_str = win_str.split('-', 1)
            win_start = int(s_str)
            win_end = int(e_str)
            
    elif cmd == 'AUDIT_ACTION':
        ip = params.get('ip', '')
        port = params.get('port', '')
        tech = params.get('technique', '')
        hour = int(params.get('hour', '0'))
        
        if ip not in target_ips:
            print(f"DENIED: reason=OUT_OF_SCOPE_IP target={ip}")
        elif port not in allowed_ports:
            print(f"DENIED: reason=FORBIDDEN_PORT port={port}")
        elif tech in forbidden_tech:
            print(f"DENIED: reason=PROHIBITED_TECHNIQUE technique={tech}")
        elif not (win_start <= hour <= win_end):
            print(f"DENIED: reason=OUTSIDE_TIME_WINDOW hour={hour}")
        else:
            print(f"PERMITTED: target={ip}:{port} technique={tech} status=AUTHORIZED")
`
  },
  {
    id: 'hk3-c1-e3',
    chapter: 1,
    title: 'Moteur de Corrélation Cyber Kill Chain & Détection d\'Attaque',
    level: 'n3',
    language: 'python',
    goal: 'Analyser une séquence d\'événements de sécurité, reconstituer les phases de la Cyber Kill Chain et évaluer la complétude de l\'intrusion.',
    brief: `<p>Le modèle Cyber Kill Chain (Lockheed Martin) formalise les étapes successives d'une cyberattaque ciblée (APT) :<br>
1. <code>RECON</code> (Reconnaissance)<br>
2. <code>WEAPON</code> (Weaponization)<br>
3. <code>DELIVERY</code> (Delivery)<br>
4. <code>EXPLOIT</code> (Exploitation)<br>
5. <code>INSTALL</code> (Installation / Persistance)<br>
6. <code>C2</code> (Command & Control)<br>
7. <code>ACTIONS</code> (Actions on Objectives / Exfiltration)<br><br>
Entrée STDIN : <code>KILLCHAIN_EVAL events=&lt;e1:p1,e2:p2,...&gt;</code>.<br>
Sortie :<br>
<code>KILLCHAIN: total_events=&lt;N&gt; phases_identified=&lt;count&gt;/7 highest_phase=&lt;phase&gt; coverage_pct=&lt;pct&gt;% status=&lt;COMPLETE_KILL_CHAIN|PARTIAL_ATTACK&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la Cyber Kill Chain
`,
    hints: [
      'Définissez les 7 phases ordonnées dans une liste et calculez l\'indice maximum atteint.',
      'Identifiez les phases uniques observées pour calculer coverage_pct = int((len(unique_phases) / 7.0) * 100).',
      'Si len(unique_phases) == 7 : status = COMPLETE_KILL_CHAIN sinon PARTIAL_ATTACK.'
    ],
    examples: [
      {
        stdin: 'KILLCHAIN_EVAL events=dns_whois:RECON,craft_doc:WEAPON,phish_mail:DELIVERY,macro_run:EXPLOIT,reg_persist:INSTALL,beacon_http:C2,db_dump:ACTIONS',
        expected: 'KILLCHAIN: total_events=7 phases_identified=7/7 highest_phase=ACTIONS coverage_pct=100% status=COMPLETE_KILL_CHAIN',
        note: 'Attaque complète ayant franchi les 7 étapes jusqu\'à l\'exfiltration.'
      }
    ],
    tests: [
      {
        label: 'Attaque stoppée à la phase d\'exploitation',
        stdin: 'KILLCHAIN_EVAL events=osint_scan:RECON,spear_phish:DELIVERY,buffer_overflow:EXPLOIT',
        expected: 'KILLCHAIN: total_events=3 phases_identified=3/7 highest_phase=EXPLOIT coverage_pct=42% status=PARTIAL_ATTACK'
      },
      {
        label: 'Événements répétés sur phases initiales de reconnaissance',
        stdin: 'KILLCHAIN_EVAL events=shodan_query:RECON,subdomain_fuzz:RECON,port_scan:RECON',
        expected: 'KILLCHAIN: total_events=3 phases_identified=1/7 highest_phase=RECON coverage_pct=14% status=PARTIAL_ATTACK'
      },
      {
        label: 'Attaque atteignant le canal de commande et contrôle C2',
        stdin: 'KILLCHAIN_EVAL events=nmap_scan:RECON,malicious_pdf:DELIVERY,cve_exploit:EXPLOIT,reverse_shell:C2',
        expected: 'KILLCHAIN: total_events=4 phases_identified=4/7 highest_phase=C2 coverage_pct=57% status=PARTIAL_ATTACK'
      }
    ],
    solution: `import sys

phases_order = ['RECON', 'WEAPON', 'DELIVERY', 'EXPLOIT', 'INSTALL', 'C2', 'ACTIONS']

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    raw_evts = params.get('events', '')
    events = [e.strip() for e in raw_evts.split(',') if e.strip()]
    
    seen_phases = set()
    highest_idx = -1
    
    for item in events:
        if ':' in item:
            _, phase = item.split(':', 1)
            p_up = phase.strip().upper()
            if p_up in phases_order:
                seen_phases.add(p_up)
                idx = phases_order.index(p_up)
                if idx > highest_idx:
                    highest_idx = idx
                    
    count_seen = len(seen_phases)
    highest_phase = phases_order[highest_idx] if highest_idx >= 0 else 'NONE'
    pct = int((count_seen / 7.0) * 100)
    status = 'COMPLETE_KILL_CHAIN' if count_seen == 7 else 'PARTIAL_ATTACK'
    
    print(f"KILLCHAIN: total_events={len(events)} phases_identified={count_seen}/7 highest_phase={highest_phase} coverage_pct={pct}% status={status}")
`
  }
];
