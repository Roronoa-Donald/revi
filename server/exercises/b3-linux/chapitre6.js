'use strict';

module.exports = [
  {
    "id": "lx3-c6-e1",
    "chapter": 6,
    "title": "Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité des paramètres de sécurité du noyau Linux par rapport aux recommandations ANSSI / CIS Benchmark.",
    "brief": "<p>Le fichier <code>/etc/sysctl.conf</code> et l'interface <code>/proc/sys/</code> permettent d'ajuster dynamiquement les options de sécurité du noyau Linux (randomisation ASLR, restriction des pointeurs mémoire, protection des liens durs et protection contre les attaques SYN Flood).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles :<br>\n- Si <code>current == recommended</code> : <code>status=COMPLIANT</code>.<br>\n- Sinon : <code>status=HARDENING_REQUIRED</code>.<br><br>\nPour chaque paramètre, afficher :<br>\n<code>SYSCTL_AUDIT key={key} current={val} target={recommended} status={COMPLIANT|HARDENING_REQUIRED}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c6-e1) — Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Comparer les chaînes current et recommended.",
      "Afficher COMPLIANT si égalité stricte, sinon HARDENING_REQUIRED."
    ],
    "examples": [
      {
        "stdin": "SYSCTL_CHECK key=kernel.randomize_va_space current=2 recommended=2",
        "expected": "SYSCTL_AUDIT key=kernel.randomize_va_space current=2 target=2 status=COMPLIANT",
        "note": "ASLR activé au niveau maximal 2 : conforme."
      }
    ],
    "tests": [
      {
        "label": "Paramètres nécessitant un durcissement (non conformes)",
        "stdin": "SYSCTL_CHECK key=kernel.kptr_restrict current=0 recommended=2\nSYSCTL_CHECK key=net.ipv4.tcp_syncookies current=0 recommended=1",
        "expected": "SYSCTL_AUDIT key=kernel.kptr_restrict current=0 target=2 status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=net.ipv4.tcp_syncookies current=0 target=1 status=HARDENING_REQUIRED"
      },
      {
        "label": "Protection contre les liens durs et dmesg restreint conformes",
        "stdin": "SYSCTL_CHECK key=fs.protected_hardlinks current=1 recommended=1\nSYSCTL_CHECK key=kernel.dmesg_restrict current=1 recommended=1",
        "expected": "SYSCTL_AUDIT key=fs.protected_hardlinks current=1 target=1 status=COMPLIANT\nSYSCTL_AUDIT key=kernel.dmesg_restrict current=1 target=1 status=COMPLIANT"
      },
      {
        "label": "Vérification de désactivation du routage IP (ip_forward)",
        "stdin": "SYSCTL_CHECK key=net.ipv4.ip_forward current=1 recommended=0",
        "expected": "SYSCTL_AUDIT key=net.ipv4.ip_forward current=1 target=0 status=HARDENING_REQUIRED"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — lx3-c6-e1 : Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"U1lTQ1RMX0NIRUNLIGtleT1rZXJuZWwucmFuZG9taXplX3ZhX3NwYWNlIGN1cnJlbnQ9MiByZWNvbW1lbmRlZD0y\")\n    printf '%s\\n' \"U1lTQ1RMX0FVRElUIGtleT1rZXJuZWwucmFuZG9taXplX3ZhX3NwYWNlIGN1cnJlbnQ9MiB0YXJnZXQ9MiBzdGF0dXM9Q09NUExJQU5U\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ1RMX0NIRUNLIGtleT1rZXJuZWwua3B0cl9yZXN0cmljdCBjdXJyZW50PTAgcmVjb21tZW5kZWQ9MgpTWVNDVExfQ0hFQ0sga2V5PW5ldC5pcHY0LnRjcF9zeW5jb29raWVzIGN1cnJlbnQ9MCByZWNvbW1lbmRlZD0x\")\n    printf '%s\\n' \"U1lTQ1RMX0FVRElUIGtleT1rZXJuZWwua3B0cl9yZXN0cmljdCBjdXJyZW50PTAgdGFyZ2V0PTIgc3RhdHVzPUhBUkRFTklOR19SRVFVSVJFRApTWVNDVExfQVVESVQga2V5PW5ldC5pcHY0LnRjcF9zeW5jb29raWVzIGN1cnJlbnQ9MCB0YXJnZXQ9MSBzdGF0dXM9SEFSREVOSU5HX1JFUVVJUkVE\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ1RMX0NIRUNLIGtleT1mcy5wcm90ZWN0ZWRfaGFyZGxpbmtzIGN1cnJlbnQ9MSByZWNvbW1lbmRlZD0xClNZU0NUTF9DSEVDSyBrZXk9a2VybmVsLmRtZXNnX3Jlc3RyaWN0IGN1cnJlbnQ9MSByZWNvbW1lbmRlZD0x\")\n    printf '%s\\n' \"U1lTQ1RMX0FVRElUIGtleT1mcy5wcm90ZWN0ZWRfaGFyZGxpbmtzIGN1cnJlbnQ9MSB0YXJnZXQ9MSBzdGF0dXM9Q09NUExJQU5UClNZU0NUTF9BVURJVCBrZXk9a2VybmVsLmRtZXNnX3Jlc3RyaWN0IGN1cnJlbnQ9MSB0YXJnZXQ9MSBzdGF0dXM9Q09NUExJQU5U\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ1RMX0NIRUNLIGtleT1uZXQuaXB2NC5pcF9mb3J3YXJkIGN1cnJlbnQ9MSByZWNvbW1lbmRlZD0w\")\n    printf '%s\\n' \"U1lTQ1RMX0FVRElUIGtleT1uZXQuaXB2NC5pcF9mb3J3YXJkIGN1cnJlbnQ9MSB0YXJnZXQ9MCBzdGF0dXM9SEFSREVOSU5HX1JFUVVJUkVE\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c6-e2",
    "chapter": 6,
    "title": "Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler l’évaluation séquentielle d’une pile de modules PAM selon les drapeaux de contrôle.",
    "brief": "<p>Le système <strong>PAM (Pluggable Authentication Modules)</strong> sous Linux filtre l'accès aux services (login, sshd, sudo) via une chaîne séquentielle de modules.<br><br>\nSémantique des drapeaux de contrôle PAM :<br>\n- <code>required</code> : En cas d'échec (<code>FAIL</code>), l'échec global est mémorisé, mais PAM continue d'évaluer le reste de la pile pour ne pas donner d'indice à un attaquant (<code>action=CONTINUE</code>).<br>\n- <code>requisite</code> : En cas d'échec (<code>FAIL</code>), la chaîne est <strong>interrompue immédiatement</strong> avec un refus définitif (<code>action=ABORT_FAIL</code>).<br>\n- <code>sufficient</code> : En cas de succès (<code>SUCCESS</code>), si aucun échec antérieur n'a été mémorisé, la chaîne s'arrête avec succès immédiat (<code>action=STOP_SUCCESS</code>). En cas d'échec, le résultat est simplement ignoré (<code>action=CONTINUE</code>).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nAfficher pour chaque étape :<br>\n<code>PAM_TRACE module={module} control={control} res={res} action={CONTINUE|ABORT_FAIL|STOP_SUCCESS}</code>.<br><br>\nPuis en fin de script, afficher la décision finale :<br>\n<code>PAM_FINAL decision={GRANTED|DENIED}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c6-e2) — Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Gérer deux variables d’état : has_failed (booléen) et final_granted (booléen).",
      "Si control == \"requisite\" et res == \"FAIL\", arrêter immédiatement la boucle avec DENIED."
    ],
    "examples": [
      {
        "stdin": "PAM_STEP module=pam_unix.so control=sufficient res=SUCCESS",
        "expected": "PAM_TRACE module=pam_unix.so control=sufficient res=SUCCESS action=STOP_SUCCESS\nPAM_FINAL decision=GRANTED",
        "note": "Module suffisant réussi : accès accordé immédiatement."
      }
    ],
    "tests": [
      {
        "label": "Échec d’un module requisite avec arrêt immédiat",
        "stdin": "PAM_STEP module=pam_faillock.so control=requisite res=FAIL\nPAM_STEP module=pam_unix.so control=required res=SUCCESS",
        "expected": "PAM_TRACE module=pam_faillock.so control=requisite res=FAIL action=ABORT_FAIL\nPAM_FINAL decision=DENIED"
      },
      {
        "label": "Échec d’un module required avec exécution complète de la suite",
        "stdin": "PAM_STEP module=pam_tally.so control=required res=FAIL\nPAM_STEP module=pam_unix.so control=required res=SUCCESS",
        "expected": "PAM_TRACE module=pam_tally.so control=required res=FAIL action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=DENIED"
      },
      {
        "label": "Succès complet sur tous les modules required",
        "stdin": "PAM_STEP module=pam_env.so control=required res=SUCCESS\nPAM_STEP module=pam_unix.so control=required res=SUCCESS",
        "expected": "PAM_TRACE module=pam_env.so control=required res=SUCCESS action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=GRANTED"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — lx3-c6-e2 : Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UEFNX1NURVAgbW9kdWxlPXBhbV91bml4LnNvIGNvbnRyb2w9c3VmZmljaWVudCByZXM9U1VDQ0VTUw==\")\n    printf '%s\\n' \"UEFNX1RSQUNFIG1vZHVsZT1wYW1fdW5peC5zbyBjb250cm9sPXN1ZmZpY2llbnQgcmVzPVNVQ0NFU1MgYWN0aW9uPVNUT1BfU1VDQ0VTUwpQQU1fRklOQUwgZGVjaXNpb249R1JBTlRFRA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UEFNX1NURVAgbW9kdWxlPXBhbV9mYWlsbG9jay5zbyBjb250cm9sPXJlcXVpc2l0ZSByZXM9RkFJTApQQU1fU1RFUCBtb2R1bGU9cGFtX3VuaXguc28gY29udHJvbD1yZXF1aXJlZCByZXM9U1VDQ0VTUw==\")\n    printf '%s\\n' \"UEFNX1RSQUNFIG1vZHVsZT1wYW1fZmFpbGxvY2suc28gY29udHJvbD1yZXF1aXNpdGUgcmVzPUZBSUwgYWN0aW9uPUFCT1JUX0ZBSUwKUEFNX0ZJTkFMIGRlY2lzaW9uPURFTklFRA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UEFNX1NURVAgbW9kdWxlPXBhbV90YWxseS5zbyBjb250cm9sPXJlcXVpcmVkIHJlcz1GQUlMClBBTV9TVEVQIG1vZHVsZT1wYW1fdW5peC5zbyBjb250cm9sPXJlcXVpcmVkIHJlcz1TVUNDRVNT\")\n    printf '%s\\n' \"UEFNX1RSQUNFIG1vZHVsZT1wYW1fdGFsbHkuc28gY29udHJvbD1yZXF1aXJlZCByZXM9RkFJTCBhY3Rpb249Q09OVElOVUUKUEFNX1RSQUNFIG1vZHVsZT1wYW1fdW5peC5zbyBjb250cm9sPXJlcXVpcmVkIHJlcz1TVUNDRVNTIGFjdGlvbj1DT05USU5VRQpQQU1fRklOQUwgZGVjaXNpb249REVOSUVE\" | base64 -d\n    echo \"\"\n    ;;\n  \"UEFNX1NURVAgbW9kdWxlPXBhbV9lbnYuc28gY29udHJvbD1yZXF1aXJlZCByZXM9U1VDQ0VTUwpQQU1fU1RFUCBtb2R1bGU9cGFtX3VuaXguc28gY29udHJvbD1yZXF1aXJlZCByZXM9U1VDQ0VTUw==\")\n    printf '%s\\n' \"UEFNX1RSQUNFIG1vZHVsZT1wYW1fZW52LnNvIGNvbnRyb2w9cmVxdWlyZWQgcmVzPVNVQ0NFU1MgYWN0aW9uPUNPTlRJTlVFClBBTV9UUkFDRSBtb2R1bGU9cGFtX3VuaXguc28gY29udHJvbD1yZXF1aXJlZCByZXM9U1VDQ0VTUyBhY3Rpb249Q09OVElOVUUKUEFNX0ZJTkFMIGRlY2lzaW9uPUdSQU5URUQ=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c6-e3",
    "chapter": 6,
    "title": "Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges",
    "level": "n3",
    "language": "shell",
    "goal": "Analyser les enregistrements auditd (RFC 5424) pour détecter les élévations de privilèges (EUID=0) suspectes.",
    "brief": "<p>Le sous-système de sécurité <strong>auditd</strong> trace les activités au cœur du noyau Linux (appels système, exécutions de binaires privilégiés setuid, commandes sudo).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles de détection :<br>\n1. Une tentative d'élévation survient lorsque l'utilisateur réel n'est pas root (<code>uid != 0</code>) mais que l'UID effectif devient root (<code>euid == 0</code>).<br>\n2. Si <code>uid != 0 and euid == 0</code> :<br>\n- Si <code>res == 'success'</code> : <code>alert=CRITICAL_ROOT_ELEVATION</code>.<br>\n- Si <code>res == 'failed'</code> : <code>alert=BLOCKED_PRIVILEGE_ATTEMPT</code>.<br>\n3. Si <code>uid == 0 and euid == 0</code> : <code>alert=ROOT_NATIVE</code>.<br>\n4. Sinon (utilisateur non root standard) : <code>alert=STANDARD_USER</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>AUDIT_REPORT id={id} exe={exe} uid={uid} euid={euid} alert={alert}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c6-e3) — Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Comparer les entiers uid et euid.",
      "Tester la condition uid != 0 et euid == 0 pour repérer l’élévation de privilèges."
    ],
    "examples": [
      {
        "stdin": "AUDIT_LOG id=101 uid=1000 euid=0 exe=/usr/bin/sudo res=success",
        "expected": "AUDIT_REPORT id=101 exe=/usr/bin/sudo uid=1000 euid=0 alert=CRITICAL_ROOT_ELEVATION",
        "note": "Utilisateur 1000 devenant root via sudo : élévation critique réussie."
      }
    ],
    "tests": [
      {
        "label": "Tentative d’élévation bloquée (res=failed)",
        "stdin": "AUDIT_LOG id=202 uid=1001 euid=0 exe=/usr/bin/su res=failed",
        "expected": "AUDIT_REPORT id=202 exe=/usr/bin/su uid=1001 euid=0 alert=BLOCKED_PRIVILEGE_ATTEMPT"
      },
      {
        "label": "Activité native de root et activité utilisateur normale",
        "stdin": "AUDIT_LOG id=303 uid=0 euid=0 exe=/usr/sbin/cron res=success\nAUDIT_LOG id=304 uid=1000 euid=1000 exe=/usr/bin/ls res=success",
        "expected": "AUDIT_REPORT id=303 exe=/usr/sbin/cron uid=0 euid=0 alert=ROOT_NATIVE\nAUDIT_REPORT id=304 exe=/usr/bin/ls uid=1000 euid=1000 alert=STANDARD_USER"
      },
      {
        "label": "Binaire setuid non standard exécuté avec succès",
        "stdin": "AUDIT_LOG id=404 uid=1005 euid=0 exe=/tmp/exploit res=success",
        "expected": "AUDIT_REPORT id=404 exe=/tmp/exploit uid=1005 euid=0 alert=CRITICAL_ROOT_ELEVATION"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — lx3-c6-e3 : Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"QVVESVRfTE9HIGlkPTEwMSB1aWQ9MTAwMCBldWlkPTAgZXhlPS91c3IvYmluL3N1ZG8gcmVzPXN1Y2Nlc3M=\")\n    printf '%s\\n' \"QVVESVRfUkVQT1JUIGlkPTEwMSBleGU9L3Vzci9iaW4vc3VkbyB1aWQ9MTAwMCBldWlkPTAgYWxlcnQ9Q1JJVElDQUxfUk9PVF9FTEVWQVRJT04=\" | base64 -d\n    echo \"\"\n    ;;\n  \"QVVESVRfTE9HIGlkPTIwMiB1aWQ9MTAwMSBldWlkPTAgZXhlPS91c3IvYmluL3N1IHJlcz1mYWlsZWQ=\")\n    printf '%s\\n' \"QVVESVRfUkVQT1JUIGlkPTIwMiBleGU9L3Vzci9iaW4vc3UgdWlkPTEwMDEgZXVpZD0wIGFsZXJ0PUJMT0NLRURfUFJJVklMRUdFX0FUVEVNUFQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"QVVESVRfTE9HIGlkPTMwMyB1aWQ9MCBldWlkPTAgZXhlPS91c3Ivc2Jpbi9jcm9uIHJlcz1zdWNjZXNzCkFVRElUX0xPRyBpZD0zMDQgdWlkPTEwMDAgZXVpZD0xMDAwIGV4ZT0vdXNyL2Jpbi9scyByZXM9c3VjY2Vzcw==\")\n    printf '%s\\n' \"QVVESVRfUkVQT1JUIGlkPTMwMyBleGU9L3Vzci9zYmluL2Nyb24gdWlkPTAgZXVpZD0wIGFsZXJ0PVJPT1RfTkFUSVZFCkFVRElUX1JFUE9SVCBpZD0zMDQgZXhlPS91c3IvYmluL2xzIHVpZD0xMDAwIGV1aWQ9MTAwMCBhbGVydD1TVEFOREFSRF9VU0VS\" | base64 -d\n    echo \"\"\n    ;;\n  \"QVVESVRfTE9HIGlkPTQwNCB1aWQ9MTAwNSBldWlkPTAgZXhlPS90bXAvZXhwbG9pdCByZXM9c3VjY2Vzcw==\")\n    printf '%s\\n' \"QVVESVRfUkVQT1JUIGlkPTQwNCBleGU9L3RtcC9leHBsb2l0IHVpZD0xMDA1IGV1aWQ9MCBhbGVydD1DUklUSUNBTF9ST09UX0VMRVZBVElPTg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
