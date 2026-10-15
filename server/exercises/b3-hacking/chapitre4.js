/**
 * server/exercises/b3-hacking/chapitre4.js — Exercices du Chapitre 4
 * Chapitre 4 : Exploitation des Vulnérabilités Web (OWASP Top 10 & Injection)
 */

module.exports = [
  {
    id: 'hk3-c4-e1',
    chapter: 4,
    title: 'Détecteur de Vecteurs d\'Injection SQL (SQLi Pattern Analyzer)',
    level: 'n1',
    language: 'python',
    goal: 'Analyser une chaîne de paramètres HTTP pour détecter et classifier les signatures d\'injection SQL.',
    brief: `<p>L'injection SQL (A03:2021-Injection dans l'OWASP Top 10) survient lorsqu'une entrée utilisateur non nettoyée est concaténée dans une commande SQL.<br><br>
Types de motifs surveillés (insensibles à la casse) :<br>
1. <code>SQLI_UNION</code> : contient <code>UNION SELECT</code> ou <code>UNION ALL SELECT</code>.<br>
2. <code>SQLI_TAUTOLOGY</code> : contient <code>OR 1=1</code>, <code>OR '1'='1'</code>, <code>OR "1"="1"</code> ou <code>OR ""=""</code>.<br>
3. <code>SQLI_STACKED</code> : contient <code>; DROP</code>, <code>; INSERT</code>, <code>; UPDATE</code>, <code>; DELETE</code> ou <code>; WAITFOR</code>.<br>
4. <code>SQLI_COMMENT</code> : contient <code>--</code>, <code>/*</code> ou <code>#</code> en fin ou milieu de chaîne suspecte.<br><br>
Priorité d'attribution : <code>SQLI_UNION</code> &gt; <code>SQLI_TAUTOLOGY</code> &gt; <code>SQLI_STACKED</code> &gt; <code>SQLI_COMMENT</code>.<br><br>
Entrée STDIN : <code>SQLI_CHECK param=&lt;valeur&gt;</code>.<br>
Sortie :<br>
- Si injection : <code>SQLI_ALERT: pattern=&lt;TYPE&gt; severity=CRITICAL status=INJECTION_DETECTED</code><br>
- Si sain : <code>SQLI_ALERT: pattern=NONE severity=NONE status=CLEAN_PARAM</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : détecter les motifs d'injection SQL
`,
    hints: [
      'Extrayez la valeur du paramètre avec line.split("param=", 1)[1] pour préserver les espaces.',
      'Convertissez la valeur en majuscules pour tester les mots-clés UNION SELECT, OR 1=1, etc.',
      'Vérifiez les motifs dans l\'ordre de priorité spécifié.'
    ],
    examples: [
      {
        stdin: "SQLI_CHECK param=admin' OR '1'='1' --",
        expected: 'SQLI_ALERT: pattern=SQLI_TAUTOLOGY severity=CRITICAL status=INJECTION_DETECTED',
        note: 'Tautologie booléenne classique permettant le contournement d\'authentification.'
      }
    ],
    tests: [
      {
        label: 'Injection UNION pour extraction de données d\'autres tables',
        stdin: 'SQLI_CHECK param=1 UNION SELECT null, username, password FROM users--',
        expected: 'SQLI_ALERT: pattern=SQLI_UNION severity=CRITICAL status=INJECTION_DETECTED'
      },
      {
        label: 'Requêtes empilées (Stacked Queries) avec tentative de suppression de table',
        stdin: 'SQLI_CHECK param=10; DROP TABLE clients;',
        expected: 'SQLI_ALERT: pattern=SQLI_STACKED severity=CRITICAL status=INJECTION_DETECTED'
      },
      {
        label: 'Troncature de requête par commentaire seul',
        stdin: 'SQLI_CHECK param=admin/*comment*/',
        expected: 'SQLI_ALERT: pattern=SQLI_COMMENT severity=CRITICAL status=INJECTION_DETECTED'
      },
      {
        label: 'Paramètre alphanumérique légitime',
        stdin: 'SQLI_CHECK param=alice_dupont_2026',
        expected: 'SQLI_ALERT: pattern=NONE severity=NONE status=CLEAN_PARAM'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    if 'param=' in line:
        _, val = line.split('param=', 1)
    else:
        val = ''
        
    val_upper = val.upper()
    
    pattern = 'NONE'
    
    if 'UNION SELECT' in val_upper or 'UNION ALL SELECT' in val_upper:
        pattern = 'SQLI_UNION'
    elif ("OR 1=1" in val_upper or "OR '1'='1'" in val_upper or 
          'OR "1"="1"' in val_upper or 'OR ""=""' in val_upper):
        pattern = 'SQLI_TAUTOLOGY'
    elif any(kw in val_upper for kw in ('; DROP', '; INSERT', '; UPDATE', '; DELETE', '; WAITFOR')):
        pattern = 'SQLI_STACKED'
    elif '--' in val_upper or '/*' in val_upper or '#' in val:
        pattern = 'SQLI_COMMENT'
        
    if pattern != 'NONE':
        print(f"SQLI_ALERT: pattern={pattern} severity=CRITICAL status=INJECTION_DETECTED")
    else:
        print("SQLI_ALERT: pattern=NONE severity=NONE status=CLEAN_PARAM")
`
  },
  {
    id: 'hk3-c4-e2',
    chapter: 4,
    title: 'Simulateur d\'Attaque par Injection SQL Aveugle Basée sur le Temps',
    level: 'n2',
    language: 'python',
    goal: 'Simuler l\'inférence de données caractère par caractère via des sondes temporelles (Time-Based Blind SQLi).',
    brief: `<p>Quand une application web ne renvoie aucune erreur ni donnée dans ses pages, l'attaquant exploite une commande de temporisation (ex: <code>IF(SUBSTRING(secret,1,1)='A', SLEEP(5), 0)</code>).<br><br>
Règles de simulation :<br>
- Un secret est stocké sur la cible : <code>actual_secret</code>.<br>
- Chaque sonde teste un couple <code>pos:char</code> (position 1-indexée).<br>
- Si <code>1 &lt;= pos &lt;= len(actual_secret)</code> et <code>actual_secret[pos - 1] == char</code> :<br>
  - La condition est <code>TRUE</code>, le délai simulé vaut <code>5.0s</code>, caractère confirmé.<br>
- Sinon :<br>
  - La condition est <code>FALSE</code>, le délai vaut <code>0.0s</code>, caractère réfuté.<br><br>
Entrée STDIN : <code>TIME_INFER actual_secret=&lt;secret&gt; probes=&lt;pos1:c1,pos2:c2,...&gt;</code>.<br>
Sorties :<br>
- Pour chaque sonde : <code>PROBE: pos=&lt;p&gt; char=&lt;c&gt; match=&lt;TRUE|FALSE&gt; delay=&lt;5.0|0.0&gt;s</code><br>
- Ligne récapitulative finale : <code>EXTRACTED: confirmed_chars=&lt;caractères_trouvés_dans_l_ordre|NONE&gt;</code> (chaîne des caractères validés concaténés dans l'ordre croissant de leur position unique).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler l'injection temporelle
`,
    hints: [
      'Parcourez probes en découpant pos:char.',
      'Comparez char avec secret[pos - 1] si pos est dans les bornes.',
      'Conservez un dictionnaire {pos: char} des caractères validés pour reconstituer la chaîne finale.'
    ],
    examples: [
      {
        stdin: 'TIME_INFER actual_secret=FLAG probes=1:F,1:B,2:L,3:A,4:G',
        expected: `PROBE: pos=1 char=F match=TRUE delay=5.0s
PROBE: pos=1 char=B match=FALSE delay=0.0s
PROBE: pos=2 char=L match=TRUE delay=5.0s
PROBE: pos=3 char=A match=TRUE delay=5.0s
PROBE: pos=4 char=G match=TRUE delay=5.0s
EXTRACTED: confirmed_chars=FLAG`,
        note: 'Extraction complète des 4 caractères du secret grâce au délai de 5 secondes.'
      }
    ],
    tests: [
      {
        label: 'Recherche de mot de passe administrateur avec échecs et succès',
        stdin: 'TIME_INFER actual_secret=ROOT probes=1:A,1:R,2:O,3:O,4:T',
        expected: `PROBE: pos=1 char=A match=FALSE delay=0.0s
PROBE: pos=1 char=R match=TRUE delay=5.0s
PROBE: pos=2 char=O match=TRUE delay=5.0s
PROBE: pos=3 char=O match=TRUE delay=5.0s
PROBE: pos=4 char=T match=TRUE delay=5.0s
EXTRACTED: confirmed_chars=ROOT`
      },
      {
        label: 'Aucune sonde ne devine le bon caractère',
        stdin: 'TIME_INFER actual_secret=SECRET probes=1:X,2:Y,3:Z',
        expected: `PROBE: pos=1 char=X match=FALSE delay=0.0s
PROBE: pos=2 char=Y match=FALSE delay=0.0s
PROBE: pos=3 char=Z match=FALSE delay=0.0s
EXTRACTED: confirmed_chars=NONE`
      },
      {
        label: 'Extraction partielle de jeton d\'API',
        stdin: 'TIME_INFER actual_secret=TOK123 probes=1:T,2:O,5:2',
        expected: `PROBE: pos=1 char=T match=TRUE delay=5.0s
PROBE: pos=2 char=O match=TRUE delay=5.0s
PROBE: pos=5 char=2 match=TRUE delay=5.0s
EXTRACTED: confirmed_chars=TO2`
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
            
    secret = params.get('actual_secret', '')
    raw_probes = params.get('probes', '')
    probes = [pr.strip() for pr in raw_probes.split(',') if pr.strip()]
    
    confirmed = {}
    
    for pr in probes:
        if ':' in pr:
            p_str, char = pr.split(':', 1)
            pos = int(p_str)
            
            if 1 <= pos <= len(secret) and secret[pos - 1] == char:
                match = True
                delay = '5.0'
                confirmed[pos] = char
            else:
                match = False
                delay = '0.0'
                
            print(f"PROBE: pos={pos} char={char} match={str(match).upper()} delay={delay}s")
            
    if confirmed:
        sorted_pos = sorted(confirmed.keys())
        extracted_str = ''.join(confirmed[p] for p in sorted_pos)
    else:
        extracted_str = 'NONE'
        
    print(f"EXTRACTED: confirmed_chars={extracted_str}")
`
  },
  {
    id: 'hk3-c4-e3',
    chapter: 4,
    title: 'Analyseur de Traversée de Répertoire et Inclusion de Fichiers (Path Traversal / LFI)',
    level: 'n3',
    language: 'python',
    goal: 'Détecter les tentatives de traversée de répertoire (Directory Traversal) et normaliser les chemins d\'accès URI.',
    brief: `<p>L'attaque par traversée de répertoire vise à accéder à des fichiers situés hors du dossier racine autorisé (ex: <code>/etc/passwd</code>, <code>win.ini</code>).<br><br>
Algorithme de normalisation et détection :<br>
1. Décodage d'URL : remplacer <code>%2e%2e%2f</code> et <code>%2e%2e/</code> par <code>../</code>, <code>%2e%2e%5c</code> par <code>..\\</code>.<br>
2. Remplacer les séparateurs Windows <code>\\</code> par <code>/</code>.<br>
3. Tronquer la chaîne si un octet nul (<code>%00</code> ou <code>\\0</code>) est injecté.<br>
4. Résolution de chemin virtuel :<br>
   - Partir d'une liste vide de segments.<br>
   - Pour chaque segment entre les slashes <code>/</code> :<br>
     - Si <code>.</code> ou vide : ignorer.<br>
     - Si <code>..</code> : dépiler le dernier segment s'il existe. Si la pile est déjà vide, marquer <code>ESCAPED_ROOT = True</code>.<br>
     - Sinon : empiler le segment.<br>
5. Décision de sécurité :<br>
   - Si <code>ESCAPED_ROOT</code> est Vrai ou si le chemin résolu cible un fichier système sensible (<code>passwd</code>, <code>shadow</code>, <code>hosts</code>, <code>win.ini</code>) :<br>
     <code>status=BLOCKED_TRAVERSAL</code>, <code>risk=CRITICAL</code>.<br>
   - Sinon : <code>status=SAFE_ACCESS</code>, <code>risk=LOW</code>.<br><br>
Entrée STDIN : <code>LFI_CHECK path=&lt;chemin_brut&gt;</code>.<br>
Sortie : <code>LFI_AUDIT: input=&lt;path&gt; resolved=&lt;/seg1/seg2|ROOT&gt; status=&lt;BLOCKED_TRAVERSAL|SAFE_ACCESS&gt; risk=&lt;CRITICAL|LOW&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la traversée de répertoire
`,
    hints: [
      'Normalisez les encodages URL (%2e%2e%2f -> ../).',
      'Tronquez à %00 si présent.',
      'Gérez la pile de segments et détectez si une tentative de sortie de racine survient.'
    ],
    examples: [
      {
        stdin: 'LFI_CHECK path=../../../../etc/passwd',
        expected: 'LFI_AUDIT: input=../../../../etc/passwd resolved=/etc/passwd status=BLOCKED_TRAVERSAL risk=CRITICAL',
        note: 'Tentative d\'évasion de racine pour lire le fichier système des comptes Linux.'
      }
    ],
    tests: [
      {
        label: 'Tentative d\'évasion avec encodage URL pour contourner les filtres basiques',
        stdin: 'LFI_CHECK path=%2e%2e%2f%2e%2e%2fetc/shadow',
        expected: 'LFI_AUDIT: input=%2e%2e%2f%2e%2e%2fetc/shadow resolved=/etc/shadow status=BLOCKED_TRAVERSAL risk=CRITICAL'
      },
      {
        label: 'Chemin légitime restant confiné dans le sous-dossier autorisé',
        stdin: 'LFI_CHECK path=documents/2026/rapport.pdf',
        expected: 'LFI_AUDIT: input=documents/2026/rapport.pdf resolved=/documents/2026/rapport.pdf status=SAFE_ACCESS risk=LOW'
      },
      {
        label: 'Chemin avec retour relatif interne autorisé ne sortant pas de la racine',
        stdin: 'LFI_CHECK path=images/sub/../logo.png',
        expected: 'LFI_AUDIT: input=images/sub/../logo.png resolved=/images/logo.png status=SAFE_ACCESS risk=LOW'
      }
    ],
    solution: `import sys

sensitive_files = {'passwd', 'shadow', 'hosts', 'win.ini'}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    if 'path=' in line:
        _, raw_path = line.split('path=', 1)
    else:
        raw_path = ''
        
    p_norm = raw_path
    if '%00' in p_norm:
        p_norm = p_norm.split('%00', 1)[0]
    if chr(0) in p_norm:
        p_norm = p_norm.split(chr(0), 1)[0]
        
    p_norm = p_norm.replace('%2e%2e%2f', '../').replace('%2E%2E%2F', '../')
    p_norm = p_norm.replace('%2e%2e/', '../').replace('%2E%2E/', '../')
    p_norm = p_norm.replace('%2e%2e%5c', '../').replace('%2E%2E%5C', '../')
    p_norm = p_norm.replace(chr(92), '/')
    
    segments = p_norm.split('/')
    stack = []
    escaped_root = False
    
    for seg in segments:
        s = seg.strip()
        if not s or s == '.':
            continue
        elif s == '..':
            if stack:
                stack.pop()
            else:
                escaped_root = True
        else:
            stack.append(s)
            
    resolved = '/' + '/'.join(stack) if stack else 'ROOT'
    target_name = stack[-1] if stack else ''
    
    if escaped_root or target_name in sensitive_files:
        status = 'BLOCKED_TRAVERSAL'
        risk = 'CRITICAL'
    else:
        status = 'SAFE_ACCESS'
        risk = 'LOW'
        
    print(f"LFI_AUDIT: input={raw_path} resolved={resolved} status={status} risk={risk}")
`
  }
];
