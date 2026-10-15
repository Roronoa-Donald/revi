/**
 * server/exercises/b3-hacking/chapitre2.js — Exercices du Chapitre 2
 * Chapitre 2 : Reconnaissance Passive & Active (OSINT, Cartographie & DNS)
 */

module.exports = [
  {
    id: 'hk3-c2-e1',
    chapter: 2,
    title: 'Analyseur d\'En-têtes HTTP de Sécurité et Détection de Fuite d\'Information',
    level: 'n1',
    language: 'python',
    goal: 'Auditer les en-têtes HTTP de sécurité d\'un serveur et détecter la divulgation de bannières technologiques.',
    brief: `<p>La reconnaissance passive d'une cible web commence par l'analyse des en-têtes HTTP renvoyés.<br><br>
Règles d'évaluation (Score initial = 100) :<br>
- <code>Strict-Transport-Security</code> (HSTS) : requis. Si absent : -30 points et problème <code>MISSING_HSTS</code>.<br>
- <code>Content-Security-Policy</code> (CSP) : requis. Si absent : -35 points et problème <code>MISSING_CSP</code>.<br>
- <code>X-Frame-Options</code> : requis (valeur <code>DENY</code> ou <code>SAMEORIGIN</code>). Si absent ou valeur incorrecte : -20 points et problème <code>MISSING_X_FRAME_OPTIONS</code>.<br>
- <code>Server</code> ou <code>X-Powered-By</code> : divulguent la pile technologique. Si au moins l'un est présent : -15 points et problème <code>INFO_DISCLOSURE</code>.<br><br>
Attribution du grade :<br>
- Score 100 : Grade <code>A</code><br>
- Score 70 à 99 : Grade <code>B</code><br>
- Score 50 à 69 : Grade <code>C</code><br>
- Score &lt; 50 : Grade <code>F</code><br><br>
Entrée STDIN : <code>AUDIT_HEADERS headers=&lt;H1:V1;H2:V2;...&gt;</code>.<br>
Sortie : <code>HTTP_AUDIT: score=&lt;score&gt;/100 grade=&lt;grade&gt; issues=&lt;issue1,issue2,...|NONE&gt;</code> (problèmes séparés par des virgules dans l'ordre HSTS, CSP, XFO, INFO).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer les en-têtes HTTP de sécurité
`,
    hints: [
      'Normalisez les noms d\'en-têtes en minuscules pour faciliter les comparaisons insensibles à la casse.',
      'Vérifiez la présence de strict-transport-security, content-security-policy et x-frame-options.',
      'Si server ou x-powered-by est dans les en-têtes, ajoutez INFO_DISCLOSURE.'
    ],
    examples: [
      {
        stdin: 'AUDIT_HEADERS headers=Strict-Transport-Security:max-age=31536000;Content-Security-Policy:default-src https:;X-Frame-Options:DENY',
        expected: 'HTTP_AUDIT: score=100/100 grade=A issues=NONE',
        note: 'Tous les en-têtes de sécurité recommandés sont présents sans fuite de version.'
      }
    ],
    tests: [
      {
        label: 'Serveur exposant sa version Apache sans CSP ni HSTS',
        stdin: 'AUDIT_HEADERS headers=Server:Apache/2.4.41 (Ubuntu);X-Frame-Options:SAMEORIGIN',
        expected: 'HTTP_AUDIT: score=20/100 grade=F issues=MISSING_HSTS,MISSING_CSP,INFO_DISCLOSURE'
      },
      {
        label: 'Serveur moderne sécurisé avec fuite d\'en-tête PHP X-Powered-By',
        stdin: 'AUDIT_HEADERS headers=Strict-Transport-Security:max-age=63072000;Content-Security-Policy:default-src self;X-Frame-Options:DENY;X-Powered-By:PHP/8.2.1',
        expected: 'HTTP_AUDIT: score=85/100 grade=B issues=INFO_DISCLOSURE'
      },
      {
        label: 'En-têtes quasi vides révélant vulnérabilité au Clickjacking',
        stdin: 'AUDIT_HEADERS headers=Content-Type:text/html',
        expected: 'HTTP_AUDIT: score=15/100 grade=F issues=MISSING_HSTS,MISSING_CSP,MISSING_X_FRAME_OPTIONS'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    if 'headers=' in line:
        _, raw_h = line.split('headers=', 1)
    else:
        raw_h = ''
        
    headers = {}
    for h_entry in raw_h.split(';'):
        if ':' in h_entry:
            k, v = h_entry.split(':', 1)
            headers[k.strip().lower()] = v.strip()
            
    score = 100
    issues = []
    
    if 'strict-transport-security' not in headers:
        score -= 30
        issues.append('MISSING_HSTS')
        
    if 'content-security-policy' not in headers:
        score -= 35
        issues.append('MISSING_CSP')
        
    xfo = headers.get('x-frame-options', '').upper()
    if xfo not in ('DENY', 'SAMEORIGIN'):
        score -= 20
        issues.append('MISSING_X_FRAME_OPTIONS')
        
    if 'server' in headers or 'x-powered-by' in headers:
        score -= 15
        issues.append('INFO_DISCLOSURE')
        
    score = max(0, score)
    
    if score == 100:
        grade = 'A'
    elif score >= 70:
        grade = 'B'
    elif score >= 50:
        grade = 'C'
    else:
        grade = 'F'
        
    iss_str = ','.join(issues) if issues else 'NONE'
    print(f"HTTP_AUDIT: score={score}/100 grade={grade} issues={iss_str}")
`
  },
  {
    id: 'hk3-c2-e2',
    chapter: 2,
    title: 'Extracteur et Filtre d\'Empreintes DNS (SPF, DMARC & AXFR)',
    level: 'n2',
    language: 'python',
    goal: 'Analyser les enregistrements DNS d\'un domaine pour détecter les risques d\'usurpation d\'email et de fuite par transfert de zone.',
    brief: `<p>L'énumération DNS révèle les mécanismes de protection contre l'usurpation (Spoofing) et les mauvaises configurations de serveurs de noms.<br><br>
Règles d'audit :<br>
1. <code>AXFR (Zone Transfer)</code> :<br>
   - Si <code>axfr_status == ALLOWED</code> : <code>axfr=VULNERABLE_LEAK</code>, risque immédiat <code>CRITICAL</code>.<br>
   - Si <code>axfr_status == REFUSED</code> : <code>axfr=SECURE</code>.<br>
2. <code>SPF (Sender Policy Framework)</code> :<br>
   - Chercher un enregistrement TXT débutant par <code>v=spf1</code>.<br>
   - Si absent : <code>spf=MISSING</code>.<br>
   - Si se termine par <code>+all</code> ou <code>?all</code> : <code>spf=PERMISSIVE</code>.<br>
   - Si se termine par <code>~all</code> : <code>spf=SOFTFAIL</code>.<br>
   - Si se termine par <code>-all</code> : <code>spf=HARDFAIL_SECURE</code>.<br>
3. <code>DMARC</code> :<br>
   - Chercher un enregistrement TXT débutant par <code>v=DMARC1</code>.<br>
   - Si absent : <code>dmarc=MISSING</code>.<br>
   - Si contient <code>p=none</code> : <code>dmarc=POLICY_NONE</code>.<br>
   - Si contient <code>p=quarantine</code> ou <code>p=reject</code> : <code>dmarc=ENFORCED_SECURE</code>.<br><br>
Évaluation du niveau de risque global :<br>
- <code>CRITICAL</code> : si <code>axfr == VULNERABLE_LEAK</code>.<br>
- <code>HIGH</code> : sinon, si <code>spf in ('MISSING', 'PERMISSIVE')</code> et <code>dmarc in ('MISSING', 'POLICY_NONE')</code>.<br>
- <code>MEDIUM</code> : sinon, si <code>spf == 'SOFTFAIL'</code> ou <code>dmarc in ('MISSING', 'POLICY_NONE')</code>.<br>
- <code>LOW</code> : sinon (SPF HARDFAIL_SECURE et DMARC ENFORCED_SECURE avec AXFR SECURE).<br><br>
Entrée STDIN : <code>DNS_AUDIT domain=&lt;dom&gt; axfr=&lt;ALLOWED|REFUSED&gt; records=&lt;r1;r2;...&gt;</code>.<br>
Sortie : <code>DNS_REPORT: domain=&lt;dom&gt; spf=&lt;s&gt; dmarc=&lt;d&gt; axfr=&lt;a&gt; risk=&lt;r&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la configuration DNS
`,
    hints: [
      'Isolez les enregistrements contenant v=spf1 et v=DMARC1.',
      'Vérifiez la terminaison du SPF (+all, ?all, ~all, -all).',
      'Appliquez la hiérarchie de risque CRITICAL -> HIGH -> MEDIUM -> LOW.'
    ],
    examples: [
      {
        stdin: 'DNS_AUDIT domain=target-corp.fr axfr=REFUSED records=v=spf1 mx ip4:192.168.1.1 -all;v=DMARC1; p=reject; rua=mailto:dmarc@target-corp.fr',
        expected: 'DNS_REPORT: domain=target-corp.fr spf=HARDFAIL_SECURE dmarc=ENFORCED_SECURE axfr=SECURE risk=LOW',
        note: 'Domaine parfaitement protégé contre l\'usurpation et le transfert de zone.'
      }
    ],
    tests: [
      {
        label: 'Fuite critique de l\'ensemble de la zone DNS via AXFR autorisé',
        stdin: 'DNS_AUDIT domain=vuln-bank.com axfr=ALLOWED records=v=spf1 -all;v=DMARC1; p=reject',
        expected: 'DNS_REPORT: domain=vuln-bank.com spf=HARDFAIL_SECURE dmarc=ENFORCED_SECURE axfr=VULNERABLE_LEAK risk=CRITICAL'
      },
      {
        label: 'Risque élevé d\'usurpation avec absence totale de SPF et DMARC',
        stdin: 'DNS_AUDIT domain=legacy-shop.org axfr=REFUSED records=google-site-verification=xyz',
        expected: 'DNS_REPORT: domain=legacy-shop.org spf=MISSING dmarc=MISSING axfr=SECURE risk=HIGH'
      },
      {
        label: 'Risque moyen avec politique DMARC en simple surveillance (p=none)',
        stdin: 'DNS_AUDIT domain=startup.io axfr=REFUSED records=v=spf1 include:_spf.google.com ~all;v=DMARC1; p=none; rua=mailto:reports@startup.io',
        expected: 'DNS_REPORT: domain=startup.io spf=SOFTFAIL dmarc=POLICY_NONE axfr=SECURE risk=MEDIUM'
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
            
    domain = params.get('domain', '')
    axfr_input = params.get('axfr', 'REFUSED')
    
    if 'records=' in line:
        _, raw_rec = line.split('records=', 1)
    else:
        raw_rec = ''
        
    records = [r.strip() for r in raw_rec.split(';') if r.strip()]
    
    # 1. AXFR
    if axfr_input == 'ALLOWED':
        axfr_res = 'VULNERABLE_LEAK'
    else:
        axfr_res = 'SECURE'
        
    # 2. SPF
    spf_res = 'MISSING'
    for r in records:
        if r.startswith('v=spf1'):
            if '+all' in r or '?all' in r:
                spf_res = 'PERMISSIVE'
            elif '-all' in r:
                spf_res = 'HARDFAIL_SECURE'
            elif '~all' in r:
                spf_res = 'SOFTFAIL'
            else:
                spf_res = 'PERMISSIVE'
            break
            
    # 3. DMARC
    if 'v=DMARC1' in raw_rec:
        if 'p=reject' in raw_rec or 'p=quarantine' in raw_rec:
            dmarc_res = 'ENFORCED_SECURE'
        elif 'p=none' in raw_rec:
            dmarc_res = 'POLICY_NONE'
        else:
            dmarc_res = 'POLICY_NONE'
    else:
        dmarc_res = 'MISSING'
            
    # 4. Risk
    if axfr_res == 'VULNERABLE_LEAK':
        risk = 'CRITICAL'
    elif spf_res in ('MISSING', 'PERMISSIVE') and dmarc_res in ('MISSING', 'POLICY_NONE'):
        risk = 'HIGH'
    elif spf_res == 'SOFTFAIL' or dmarc_res in ('MISSING', 'POLICY_NONE'):
        risk = 'MEDIUM'
    else:
        risk = 'LOW'
        
    print(f"DNS_REPORT: domain={domain} spf={spf_res} dmarc={dmarc_res} axfr={axfr_res} risk={risk}")
`
  },
  {
    id: 'hk3-c2-e3',
    chapter: 2,
    title: 'Moteur de Découverte de Sous-Domaines par Fuzzing et Filtrage Wildcard',
    level: 'n3',
    language: 'python',
    goal: 'Identifier les sous-domaines légitimes actifs en éliminant les faux positifs causés par les DNS wildcards.',
    brief: `<p>Lors de l'énumération par dictionnaire (subdomain brute-forcing), une réponse wildcard DNS redirige tous les sous-domaines inexistants vers une IP par défaut, générant des milliers de faux positifs.<br><br>
Algorithme de filtrage :<br>
1. Si <code>wildcard_ip != 'NONE'</code>, toute entrée dont l'IP correspond à <code>wildcard_ip</code> est classée comme faux positif wildcard.<br>
2. Les entrées dont l'IP diffère de <code>wildcard_ip</code> sont des sous-domaines actifs validés.<br>
3. Les sous-domaines valides sont ordonnés alphabétiquement sous la forme <code>&lt;sub&gt;.&lt;domain&gt;</code>.<br><br>
Entrée STDIN : <code>SUBDOMAIN_FUZZ domain=&lt;dom&gt; wildcard_ip=&lt;ip|NONE&gt; responses=&lt;sub1:ip1,sub2:ip2,...&gt;</code>.<br>
Sortie :<br>
<code>SUBDOMAINS: domain=&lt;dom&gt; total_scanned=&lt;N&gt; wildcards_filtered=&lt;W&gt; valid_found=&lt;V&gt; active=&lt;s1.dom,s2.dom|NONE&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : filtrer les faux positifs wildcard DNS
`,
    hints: [
      'Parcourez chaque couple sub:ip dans responses.',
      'Si wildcard_ip != "NONE" et ip == wildcard_ip, incrémentez wildcards_filtered.',
      'Triez la liste des sous-domaines valides alphabétiquement avant l\'affichage.'
    ],
    examples: [
      {
        stdin: 'SUBDOMAIN_FUZZ domain=example.com wildcard_ip=192.168.1.100 responses=admin:192.168.1.5,fake99:192.168.1.100,mail:192.168.1.6,testabc:192.168.1.100',
        expected: 'SUBDOMAINS: domain=example.com total_scanned=4 wildcards_filtered=2 valid_found=2 active=admin.example.com,mail.example.com',
        note: 'Les deux sous-domaines aléatoires pointant vers l\'IP wildcard sont éliminés.'
      }
    ],
    tests: [
      {
        label: 'Aucun wildcard configuré sur le domaine cible',
        stdin: 'SUBDOMAIN_FUZZ domain=corp.org wildcard_ip=NONE responses=vpn:10.0.0.1,api:10.0.0.2',
        expected: 'SUBDOMAINS: domain=corp.org total_scanned=2 wildcards_filtered=0 valid_found=2 active=api.corp.org,vpn.corp.org'
      },
      {
        label: 'Toutes les réponses sont des faux positifs vers le wildcard',
        stdin: 'SUBDOMAIN_FUZZ domain=wildcard-all.net wildcard_ip=172.16.0.50 responses=a:172.16.0.50,b:172.16.0.50,c:172.16.0.50',
        expected: 'SUBDOMAINS: domain=wildcard-all.net total_scanned=3 wildcards_filtered=3 valid_found=0 active=NONE'
      },
      {
        label: 'Multiples sous-domaines valides ordonnés alphabétiquement',
        stdin: 'SUBDOMAIN_FUZZ domain=cloud.dev wildcard_ip=1.1.1.1 responses=gitlab:10.1.1.5,bogus:1.1.1.1,auth:10.1.1.2,monitor:10.1.1.9',
        expected: 'SUBDOMAINS: domain=cloud.dev total_scanned=4 wildcards_filtered=1 valid_found=3 active=auth.cloud.dev,gitlab.cloud.dev,monitor.cloud.dev'
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
            
    domain = params.get('domain', '')
    wildcard_ip = params.get('wildcard_ip', 'NONE')
    raw_resp = params.get('responses', '')
    
    entries = [r.strip() for r in raw_resp.split(',') if r.strip()]
    
    filtered_count = 0
    valid_subs = []
    
    for entry in entries:
        if ':' in entry:
            sub, ip = entry.split(':', 1)
            if wildcard_ip != 'NONE' and ip.strip() == wildcard_ip:
                filtered_count += 1
            else:
                valid_subs.append(f"{sub.strip()}.{domain}")
                
    valid_subs.sort()
    active_str = ','.join(valid_subs) if valid_subs else 'NONE'
    
    print(f"SUBDOMAINS: domain={domain} total_scanned={len(entries)} wildcards_filtered={filtered_count} valid_found={len(valid_subs)} active={active_str}")
`
  }
];
