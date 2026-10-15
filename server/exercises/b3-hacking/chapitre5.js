/**
 * server/exercises/b3-hacking/chapitre5.js — Exercices du Chapitre 5
 * Chapitre 5 : Exploitation Système, Escalade de Privilèges & Pivoting (Gaining Access)
 */

module.exports = [
  {
    id: 'hk3-c5-e1',
    chapter: 5,
    title: 'Auditeur de Permissions Linux et Détection de Binaires SUID Anormaux',
    level: 'n1',
    language: 'python',
    goal: 'Analyser les permissions octales de fichiers système pour détecter les binaires SUID exploitables (GTFOBins).',
    brief: `<p>Le bit SUID (Set User ID) permet d'exécuter un binaire avec les privilèges de son propriétaire (généralement root).<br><br>
Binaires connus du catalogue GTFOBins permettant une évasion directe vers un shell root :<br>
<code>bash</code>, <code>find</code>, <code>vim</code>, <code>nano</code>, <code>cp</code>, <code>awk</code>, <code>python</code>, <code>nmap</code>, <code>pkexec</code>.<br><br>
Règles d'évaluation :<br>
1. Vérifier si le mode octal comporte le bit SUID (chiffre des milliers &gt;= 4, ex: <code>4755</code>, <code>4750</code>) :<br>
   - Si le bit SUID est absent : <code>exploit=NO_SUID_BIT</code>, <code>risk=NONE</code>.<br>
2. Si le bit SUID est présent et <code>owner == 'root'</code> :<br>
   - Si le nom du binaire est dans GTFOBins : <code>exploit=GTFOBINS_PRIVILEGE_ESCALATION</code>, <code>risk=CRITICAL</code>.<br>
   - Sinon (binaire standard comme <code>passwd</code>, <code>ping</code>) : <code>exploit=STANDARD_SYSTEM_BINARY</code>, <code>risk=LOW</code>.<br>
3. Si le bit SUID est présent mais <code>owner != 'root'</code> :<br>
   - <code>exploit=NON_ROOT_SUID</code>, <code>risk=MEDIUM</code>.<br><br>
Entrée STDIN : <code>SUID_CHECK path=&lt;chemin&gt; owner=&lt;user&gt; mode=&lt;octal&gt;</code>.<br>
Sortie : <code>SUID_AUDIT: binary=&lt;nom&gt; owner=&lt;user&gt; mode=&lt;octal&gt; exploit=&lt;exploit&gt; risk=&lt;risk&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer les binaires SUID
`,
    hints: [
      'Extrayez le nom de base du fichier (ex: /usr/bin/find -> find).',
      'Vérifiez si le premier chiffre du mode octal (mode >= 4000) active le bit SUID.',
      'Comparez avec la liste GTFOBins si owner == root.'
    ],
    examples: [
      {
        stdin: 'SUID_CHECK path=/usr/bin/find owner=root mode=4755',
        expected: 'SUID_AUDIT: binary=find owner=root mode=4755 exploit=GTFOBINS_PRIVILEGE_ESCALATION risk=CRITICAL',
        note: 'Binaire find SUID root exploitable directement via la commande find . -exec /bin/sh -p ;'
      }
    ],
    tests: [
      {
        label: 'Binaire système passwd avec SUID légitime et restreint',
        stdin: 'SUID_CHECK path=/usr/bin/passwd owner=root mode=4755',
        expected: 'SUID_AUDIT: binary=passwd owner=root mode=4755 exploit=STANDARD_SYSTEM_BINARY risk=LOW'
      },
      {
        label: 'Éditeur vim mis en SUID par erreur d\'administration',
        stdin: 'SUID_CHECK path=/bin/vim owner=root mode=4750',
        expected: 'SUID_AUDIT: binary=vim owner=root mode=4750 exploit=GTFOBINS_PRIVILEGE_ESCALATION risk=CRITICAL'
      },
      {
        label: 'Binaire normal sans aucun bit SUID',
        stdin: 'SUID_CHECK path=/usr/bin/ls owner=root mode=0755',
        expected: 'SUID_AUDIT: binary=ls owner=root mode=0755 exploit=NO_SUID_BIT risk=NONE'
      },
      {
        label: 'Binaire SUID appartenant à un utilisateur non root',
        stdin: 'SUID_CHECK path=/opt/app/worker owner=deploy mode=4755',
        expected: 'SUID_AUDIT: binary=worker owner=deploy mode=4755 exploit=NON_ROOT_SUID risk=MEDIUM'
      }
    ],
    solution: `import sys
import os

gtfobins = {'bash', 'find', 'vim', 'nano', 'cp', 'awk', 'python', 'nmap', 'pkexec'}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    path = params.get('path', '')
    owner = params.get('owner', '')
    mode_str = params.get('mode', '0755')
    
    b_name = os.path.basename(path)
    mode_val = int(mode_str, 8)
    has_suid = bool(mode_val & 0o4000)
    
    if not has_suid:
        exploit = 'NO_SUID_BIT'
        risk = 'NONE'
    elif owner == 'root':
        if b_name in gtfobins:
            exploit = 'GTFOBINS_PRIVILEGE_ESCALATION'
            risk = 'CRITICAL'
        else:
            exploit = 'STANDARD_SYSTEM_BINARY'
            risk = 'LOW'
    else:
        exploit = 'NON_ROOT_SUID'
        risk = 'MEDIUM'
        
    print(f"SUID_AUDIT: binary={b_name} owner={owner} mode={mode_str} exploit={exploit} risk={risk}")
`
  },
  {
    id: 'hk3-c5-e2',
    chapter: 5,
    title: 'Analyseur de Fichier Sudoers et Détection de Droits Dangereux (NOPASSWD)',
    level: 'n2',
    language: 'python',
    goal: 'Analyser une directive sudoers pour détecter des privilèges excessifs permettant l\'élévation directe vers root.',
    brief: `<p>Une mauvaise configuration dans <code>/etc/sudoers</code> constitue le vecteur d'élévation de privilèges le plus fréquent en environnement Linux.<br><br>
Commandes dangereuses permettant l'échappement vers un shell (Shell Escape) :<br>
<code>ALL</code>, <code>find</code>, <code>vim</code>, <code>vi</code>, <code>less</code>, <code>more</code>, <code>bash</code>, <code>sh</code>, <code>python</code>, <code>perl</code>, <code>awk</code>.<br><br>
Règles d'analyse :<br>
1. Déterminer si <code>NOPASSWD:</code> est présent dans la règle :<br>
   - Si absent : <code>nopasswd=FALSE</code>, <code>vector=PASSWORD_PROTECTED</code>, <code>risk=LOW</code>.<br>
2. Si <code>NOPASSWD:</code> est présent (<code>nopasswd=TRUE</code>) :<br>
   - Extraire la commande autorisée située après <code>NOPASSWD:</code> (ex: <code>/usr/bin/find</code>).<br>
   - Extraire le nom du binaire de base.<br>
   - Si le binaire est <code>ALL</code> ou appartient à la liste de shell escape :<br>
     <code>vector=INSTANT_ROOT_SHELL</code>, <code>risk=CRITICAL</code>.<br>
   - Sinon (binaire d'administration restreint, ex: <code>systemctl restart nginx</code>) :<br>
     <code>vector=RESTRICTED_SUDO_EXECUTION</code>, <code>risk=MEDIUM</code>.<br><br>
Entrée STDIN : <code>SUDO_PARSE rule=&lt;texte_complet_de_la_regle_sudoers&gt;</code>.<br>
Sortie : <code>SUDO_AUDIT: user=&lt;user&gt; nopasswd=&lt;TRUE|FALSE&gt; command=&lt;cmd_name&gt; vector=&lt;vector&gt; risk=&lt;risk&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la règle sudoers
`,
    hints: [
      'Isolez le texte de la règle avec line.split("rule=", 1)[1].',
      'Le premier mot de la règle correspond à l\'utilisateur ou au groupe.',
      'Vérifiez la présence de NOPASSWD: et extrayez la commande qui suit.'
    ],
    examples: [
      {
        stdin: 'SUDO_PARSE rule=developer ALL=(ALL) NOPASSWD: /usr/bin/find',
        expected: 'SUDO_AUDIT: user=developer nopasswd=TRUE command=find vector=INSTANT_ROOT_SHELL risk=CRITICAL',
        note: 'find exécutable sans mot de passe permettant l\'échappement shell immédiat.'
      }
    ],
    tests: [
      {
        label: 'Règle accordant tous les privilèges sans mot de passe (ALL)',
        stdin: 'SUDO_PARSE rule=john ALL=(ALL:ALL) NOPASSWD: ALL',
        expected: 'SUDO_AUDIT: user=john nopasswd=TRUE command=ALL vector=INSTANT_ROOT_SHELL risk=CRITICAL'
      },
      {
        label: 'Commande restreinte d\'administration sans échappement de shell',
        stdin: 'SUDO_PARSE rule=backup_svc ALL=(root) NOPASSWD: /usr/bin/rsync',
        expected: 'SUDO_AUDIT: user=backup_svc nopasswd=TRUE command=rsync vector=RESTRICTED_SUDO_EXECUTION risk=MEDIUM'
      },
      {
        label: 'Règle classique exigeant l\'authentification par mot de passe',
        stdin: 'SUDO_PARSE rule=alice ALL=(ALL) /bin/bash',
        expected: 'SUDO_AUDIT: user=alice nopasswd=FALSE command=bash vector=PASSWORD_PROTECTED risk=LOW'
      }
    ],
    solution: `import sys
import os

dangerous_cmds = {'ALL', 'find', 'vim', 'vi', 'less', 'more', 'bash', 'sh', 'python', 'perl', 'awk'}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    if 'rule=' in line:
        _, raw_rule = line.split('rule=', 1)
    else:
        raw_rule = ''
        
    rule_parts = raw_rule.strip().split()
    user = rule_parts[0] if rule_parts else 'UNKNOWN'
    
    has_nopasswd = 'NOPASSWD:' in raw_rule
    
    if has_nopasswd:
        _, after_no = raw_rule.split('NOPASSWD:', 1)
        cmd_full = after_no.strip().split()[0]
        cmd_name = os.path.basename(cmd_full)
        
        if cmd_name in dangerous_cmds or cmd_full == 'ALL':
            vector = 'INSTANT_ROOT_SHELL'
            risk = 'CRITICAL'
        else:
            vector = 'RESTRICTED_SUDO_EXECUTION'
            risk = 'MEDIUM'
    else:
        # Dernier élément de la ligne
        cmd_full = rule_parts[-1] if rule_parts else 'NONE'
        cmd_name = os.path.basename(cmd_full)
        vector = 'PASSWORD_PROTECTED'
        risk = 'LOW'
        
    print(f"SUDO_AUDIT: user={user} nopasswd={str(has_nopasswd).upper()} command={cmd_name} vector={vector} risk={risk}")
`
  },
  {
    id: 'hk3-c5-e3',
    chapter: 5,
    title: 'Calculateur d\'Offset de Buffer Overflow et Agencement de Payload',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la structure et la taille globale d\'un exploit de dépassement de tampon de pile (Stack Buffer Overflow).',
    brief: `<p>Dans l'exploitation de binaires compilés (x86/x64 sans canary), un dépassement de tampon permet de réécrire le pointeur d'instruction de retour (EIP/RIP).<br><br>
Structure du payload dans la pile :<br>
1. <code>PADDING</code> : <code>offset</code> octets (remplissage jusqu'au pointeur de retour).<br>
2. <code>RET_ADDR</code> : taille de l'adresse de retour (4 octets en <code>x86</code>, 8 octets en <code>x64</code>).<br>
3. <code>NOP_SLED</code> : <code>sled_len</code> octets de NOP (<code>\\x90</code>).<br>
4. <code>SHELLCODE</code> : <code>shellcode_len</code> octets du code exécutable injecté.<br><br>
Calcul de la taille totale du payload :<br>
<code>total_size = offset + ret_bytes + sled_len + shellcode_len</code>.<br><br>
Entrée STDIN : <code>BOF_LAYOUT arch=&lt;x86|x64&gt; offset=&lt;N&gt; sled_len=&lt;S&gt; shellcode_len=&lt;L&gt;</code>.<br>
Sortie : <code>PAYLOAD_LAYOUT: arch=&lt;arch&gt; offset=&lt;N&gt; ret_bytes=&lt;4|8&gt; sled=&lt;S&gt; shellcode=&lt;L&gt; total_size=&lt;total&gt; status=READY_FOR_INJECTION</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : agencer le payload de Buffer Overflow
`,
    hints: [
      'Identifiez ret_bytes : 4 octets pour x86 et 8 octets pour x64.',
      'Sommez offset + ret_bytes + sled_len + shellcode_len.',
      'Affichez la disposition du payload selon le format demandé.'
    ],
    examples: [
      {
        stdin: 'BOF_LAYOUT arch=x86 offset=112 sled_len=32 shellcode_len=44',
        expected: 'PAYLOAD_LAYOUT: arch=x86 offset=112 ret_bytes=4 sled=32 shellcode=44 total_size=192 status=READY_FOR_INJECTION',
        note: 'Payload x86 standard avec 112 octets de padding et 32 octets de NOP sled.'
      }
    ],
    tests: [
      {
        label: 'Payload 64-bit avec pointeur d\'instruction RIP sur 8 octets',
        stdin: 'BOF_LAYOUT arch=x64 offset=264 sled_len=64 shellcode_len=85',
        expected: 'PAYLOAD_LAYOUT: arch=x64 offset=264 ret_bytes=8 sled=64 shellcode=85 total_size=421 status=READY_FOR_INJECTION'
      },
      {
        label: 'Petit offset sans NOP sled (saut direct au début du shellcode)',
        stdin: 'BOF_LAYOUT arch=x86 offset=40 sled_len=0 shellcode_len=28',
        expected: 'PAYLOAD_LAYOUT: arch=x86 offset=40 ret_bytes=4 sled=0 shellcode=28 total_size=72 status=READY_FOR_INJECTION'
      },
      {
        label: 'Tampon volumineux sous architecture x64',
        stdin: 'BOF_LAYOUT arch=x64 offset=1024 sled_len=128 shellcode_len=120',
        expected: 'PAYLOAD_LAYOUT: arch=x64 offset=1024 ret_bytes=8 sled=128 shellcode=120 total_size=1280 status=READY_FOR_INJECTION'
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
            
    arch = params.get('arch', 'x86').lower()
    offset = int(params.get('offset', '0'))
    sled = int(params.get('sled_len', '0'))
    sc_len = int(params.get('shellcode_len', '0'))
    
    ret_bytes = 8 if arch == 'x64' else 4
    total = offset + ret_bytes + sled + sc_len
    
    print(f"PAYLOAD_LAYOUT: arch={arch} offset={offset} ret_bytes={ret_bytes} sled={sled} shellcode={sc_len} total_size={total} status=READY_FOR_INJECTION")
`
  }
];
