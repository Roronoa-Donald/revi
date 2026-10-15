/**
 * Exercices Chapitre 6 — Linux Avancé B3.
 * Sécurité Avancée, Durcissement du Noyau, PAM & Auditing (auditd).
 */
'use strict';

module.exports = [
  {
    id: 'lx3-c6-e1',
    chapter: 6,
    title: 'Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la conformité des paramètres de sécurité du noyau Linux par rapport aux recommandations ANSSI / CIS Benchmark.',
    brief: `<p>Le fichier <code>/etc/sysctl.conf</code> et l'interface <code>/proc/sys/</code> permettent d'ajuster dynamiquement les options de sécurité du noyau Linux (randomisation ASLR, restriction des pointeurs mémoire, protection des liens durs et protection contre les attaques SYN Flood).<br><br>
Le script lit sur l'entrée standard des vérifications au format :<br>
<code>SYSCTL_CHECK key=&lt;cle_noyau&gt; current=&lt;valeur&gt; recommended=&lt;cible&gt;</code>.<br><br>
Règles :<br>
- Si <code>current == recommended</code> : <code>status=COMPLIANT</code>.<br>
- Sinon : <code>status=HARDENING_REQUIRED</code>.<br><br>
Pour chaque paramètre, afficher :<br>
<code>SYSCTL_AUDIT key={key} current={val} target={recommended} status={COMPLIANT|HARDENING_REQUIRED}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : comparer les paramètres sysctl avec les cibles recommandées
`,
    hints: [
      'Comparer les chaînes current et recommended.',
      'Afficher COMPLIANT si égalité stricte, sinon HARDENING_REQUIRED.'
    ],
    examples: [
      {
        stdin: 'SYSCTL_CHECK key=kernel.randomize_va_space current=2 recommended=2',
        expected: 'SYSCTL_AUDIT key=kernel.randomize_va_space current=2 target=2 status=COMPLIANT',
        note: 'ASLR activé au niveau maximal 2 : conforme.'
      }
    ],
    tests: [
      {
        label: 'Paramètres nécessitant un durcissement (non conformes)',
        stdin: 'SYSCTL_CHECK key=kernel.kptr_restrict current=0 recommended=2\nSYSCTL_CHECK key=net.ipv4.tcp_syncookies current=0 recommended=1',
        expected: 'SYSCTL_AUDIT key=kernel.kptr_restrict current=0 target=2 status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=net.ipv4.tcp_syncookies current=0 target=1 status=HARDENING_REQUIRED'
      },
      {
        label: 'Protection contre les liens durs et dmesg restreint conformes',
        stdin: 'SYSCTL_CHECK key=fs.protected_hardlinks current=1 recommended=1\nSYSCTL_CHECK key=kernel.dmesg_restrict current=1 recommended=1',
        expected: 'SYSCTL_AUDIT key=fs.protected_hardlinks current=1 target=1 status=COMPLIANT\nSYSCTL_AUDIT key=kernel.dmesg_restrict current=1 target=1 status=COMPLIANT'
      },
      {
        label: 'Vérification de désactivation du routage IP (ip_forward)',
        stdin: 'SYSCTL_CHECK key=net.ipv4.ip_forward current=1 recommended=0',
        expected: 'SYSCTL_AUDIT key=net.ipv4.ip_forward current=1 target=0 status=HARDENING_REQUIRED'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('SYSCTL_CHECK'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    key = params.get('key', '')
    cur = params.get('current', '')
    rec = params.get('recommended', '')
    
    status = 'COMPLIANT' if cur == rec else 'HARDENING_REQUIRED'
    print(f"SYSCTL_AUDIT key={key} current={cur} target={rec} status={status}")
`
  },
  {
    id: 'lx3-c6-e2',
    chapter: 6,
    title: 'Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)',
    level: 'n2',
    language: 'python',
    goal: 'Simuler l’évaluation séquentielle d’une pile de modules PAM selon les drapeaux de contrôle.',
    brief: `<p>Le système <strong>PAM (Pluggable Authentication Modules)</strong> sous Linux filtre l'accès aux services (login, sshd, sudo) via une chaîne séquentielle de modules.<br><br>
Sémantique des drapeaux de contrôle PAM :<br>
- <code>required</code> : En cas d'échec (<code>FAIL</code>), l'échec global est mémorisé, mais PAM continue d'évaluer le reste de la pile pour ne pas donner d'indice à un attaquant (<code>action=CONTINUE</code>).<br>
- <code>requisite</code> : En cas d'échec (<code>FAIL</code>), la chaîne est <strong>interrompue immédiatement</strong> avec un refus définitif (<code>action=ABORT_FAIL</code>).<br>
- <code>sufficient</code> : En cas de succès (<code>SUCCESS</code>), si aucun échec antérieur n'a été mémorisé, la chaîne s'arrête avec succès immédiat (<code>action=STOP_SUCCESS</code>). En cas d'échec, le résultat est simplement ignoré (<code>action=CONTINUE</code>).<br><br>
Le script lit sur l'entrée standard une suite d'étapes au format :<br>
<code>PAM_STEP module=&lt;nom&gt; control=&lt;required|requisite|sufficient&gt; res=&lt;SUCCESS|FAIL&gt;</code>.<br><br>
Afficher pour chaque étape :<br>
<code>PAM_TRACE module={module} control={control} res={res} action={CONTINUE|ABORT_FAIL|STOP_SUCCESS}</code>.<br><br>
Puis en fin de script, afficher la décision finale :<br>
<code>PAM_FINAL decision={GRANTED|DENIED}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la machine d'évaluation PAM
`,
    hints: [
      'Gérer deux variables d’état : has_failed (booléen) et final_granted (booléen).',
      'Si control == "requisite" et res == "FAIL", arrêter immédiatement la boucle avec DENIED.'
    ],
    examples: [
      {
        stdin: 'PAM_STEP module=pam_unix.so control=sufficient res=SUCCESS',
        expected: 'PAM_TRACE module=pam_unix.so control=sufficient res=SUCCESS action=STOP_SUCCESS\nPAM_FINAL decision=GRANTED',
        note: 'Module suffisant réussi : accès accordé immédiatement.'
      }
    ],
    tests: [
      {
        label: 'Échec d’un module requisite avec arrêt immédiat',
        stdin: 'PAM_STEP module=pam_faillock.so control=requisite res=FAIL\nPAM_STEP module=pam_unix.so control=required res=SUCCESS',
        expected: 'PAM_TRACE module=pam_faillock.so control=requisite res=FAIL action=ABORT_FAIL\nPAM_FINAL decision=DENIED'
      },
      {
        label: 'Échec d’un module required avec exécution complète de la suite',
        stdin: 'PAM_STEP module=pam_tally.so control=required res=FAIL\nPAM_STEP module=pam_unix.so control=required res=SUCCESS',
        expected: 'PAM_TRACE module=pam_tally.so control=required res=FAIL action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=DENIED'
      },
      {
        label: 'Succès complet sur tous les modules required',
        stdin: 'PAM_STEP module=pam_env.so control=required res=SUCCESS\nPAM_STEP module=pam_unix.so control=required res=SUCCESS',
        expected: 'PAM_TRACE module=pam_env.so control=required res=SUCCESS action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=GRANTED'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

has_failed = False
is_granted = True
aborted = False

for lig in lignes:
    if not lig.startswith('PAM_STEP'):
        continue
    if aborted:
        break
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    mod = params.get('module', 'pam_mod')
    ctrl = params.get('control', 'required')
    res = params.get('res', 'SUCCESS')
    
    action = 'CONTINUE'
    if ctrl == 'requisite':
        if res == 'FAIL':
            action = 'ABORT_FAIL'
            has_failed = True
            is_granted = False
            aborted = True
        else:
            action = 'CONTINUE'
    elif ctrl == 'required':
        if res == 'FAIL':
            has_failed = True
            is_granted = False
        action = 'CONTINUE'
    elif ctrl == 'sufficient':
        if res == 'SUCCESS' and not has_failed:
            action = 'STOP_SUCCESS'
            is_granted = True
            aborted = True
        else:
            action = 'CONTINUE'
            
    print(f"PAM_TRACE module={mod} control={ctrl} res={res} action={action}")

final_decision = 'GRANTED' if (is_granted and not has_failed) else 'DENIED'
print(f"PAM_FINAL decision={final_decision}")
`
  },
  {
    id: 'lx3-c6-e3',
    chapter: 6,
    title: 'Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges',
    level: 'n3',
    language: 'python',
    goal: 'Analyser les enregistrements auditd (RFC 5424) pour détecter les élévations de privilèges (EUID=0) suspectes.',
    brief: `<p>Le sous-système de sécurité <strong>auditd</strong> trace les activités au cœur du noyau Linux (appels système, exécutions de binaires privilégiés setuid, commandes sudo).<br><br>
Le script lit sur l'entrée standard des événements d'audit au format :<br>
<code>AUDIT_LOG id=&lt;id&gt; uid=&lt;uid_reel&gt; euid=&lt;uid_effectif&gt; exe=&lt;binaire&gt; res=&lt;success|failed&gt;</code>.<br><br>
Règles de détection :<br>
1. Une tentative d'élévation survient lorsque l'utilisateur réel n'est pas root (<code>uid != 0</code>) mais que l'UID effectif devient root (<code>euid == 0</code>).<br>
2. Si <code>uid != 0 and euid == 0</code> :<br>
- Si <code>res == 'success'</code> : <code>alert=CRITICAL_ROOT_ELEVATION</code>.<br>
- Si <code>res == 'failed'</code> : <code>alert=BLOCKED_PRIVILEGE_ATTEMPT</code>.<br>
3. Si <code>uid == 0 and euid == 0</code> : <code>alert=ROOT_NATIVE</code>.<br>
4. Sinon (utilisateur non root standard) : <code>alert=STANDARD_USER</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>AUDIT_REPORT id={id} exe={exe} uid={uid} euid={euid} alert={alert}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : parser les journaux auditd et classifier les élévations
`,
    hints: [
      'Comparer les entiers uid et euid.',
      'Tester la condition uid != 0 et euid == 0 pour repérer l’élévation de privilèges.'
    ],
    examples: [
      {
        stdin: 'AUDIT_LOG id=101 uid=1000 euid=0 exe=/usr/bin/sudo res=success',
        expected: 'AUDIT_REPORT id=101 exe=/usr/bin/sudo uid=1000 euid=0 alert=CRITICAL_ROOT_ELEVATION',
        note: 'Utilisateur 1000 devenant root via sudo : élévation critique réussie.'
      }
    ],
    tests: [
      {
        label: 'Tentative d’élévation bloquée (res=failed)',
        stdin: 'AUDIT_LOG id=202 uid=1001 euid=0 exe=/usr/bin/su res=failed',
        expected: 'AUDIT_REPORT id=202 exe=/usr/bin/su uid=1001 euid=0 alert=BLOCKED_PRIVILEGE_ATTEMPT'
      },
      {
        label: 'Activité native de root et activité utilisateur normale',
        stdin: 'AUDIT_LOG id=303 uid=0 euid=0 exe=/usr/sbin/cron res=success\nAUDIT_LOG id=304 uid=1000 euid=1000 exe=/usr/bin/ls res=success',
        expected: 'AUDIT_REPORT id=303 exe=/usr/sbin/cron uid=0 euid=0 alert=ROOT_NATIVE\nAUDIT_REPORT id=304 exe=/usr/bin/ls uid=1000 euid=1000 alert=STANDARD_USER'
      },
      {
        label: 'Binaire setuid non standard exécuté avec succès',
        stdin: 'AUDIT_LOG id=404 uid=1005 euid=0 exe=/tmp/exploit res=success',
        expected: 'AUDIT_REPORT id=404 exe=/tmp/exploit uid=1005 euid=0 alert=CRITICAL_ROOT_ELEVATION'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('AUDIT_LOG'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    aid = params.get('id', '0')
    uid = int(params.get('uid', 1000))
    euid = int(params.get('euid', 1000))
    exe = params.get('exe', '/bin/sh')
    res = params.get('res', 'success')
    
    if uid != 0 and euid == 0:
        alert = 'CRITICAL_ROOT_ELEVATION' if res == 'success' else 'BLOCKED_PRIVILEGE_ATTEMPT'
    elif uid == 0 and euid == 0:
        alert = 'ROOT_NATIVE'
    else:
        alert = 'STANDARD_USER'
        
    print(f"AUDIT_REPORT id={aid} exe={exe} uid={uid} euid={euid} alert={alert}")
`
  }
];
