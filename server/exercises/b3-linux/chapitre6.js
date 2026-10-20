'use strict';

module.exports = [
  {
    "id": "lx3-c6-e1",
    "chapter": 6,
    "title": "Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la conformité des paramètres de sécurité du noyau Linux par rapport aux recommandations ANSSI / CIS Benchmark.",
    "brief": "<p>Le fichier <code>/etc/sysctl.conf</code> et l'interface <code>/proc/sys/</code> permettent d'ajuster dynamiquement les options de sécurité du noyau Linux (randomisation ASLR, restriction des pointeurs mémoire, protection des liens durs et protection contre les attaques SYN Flood).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles :<br>\n- Si <code>current == recommended</code> : <code>status=COMPLIANT</code>.<br>\n- Sinon : <code>status=HARDENING_REQUIRED</code>.<br><br>\nPour chaque paramètre, afficher :<br>\n<code>SYSCTL_AUDIT key={key} current={val} target={recommended} status={COMPLIANT|HARDENING_REQUIRED}</code></p>",
    "starter": "# Grille d'analyse (lx3-c6-e1) — Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Paramètres nécessitant un durcissement (non conformes)]\n# Données : SYSCTL_CHECK key=kernel.kptr_restrict current=0 recommended=2\n# Données : SYSCTL_CHECK key=net.ipv4.tcp_syncookies current=0 recommended=1\nA_COMPLETER\n\n[Cas 2 — Protection contre les liens durs et dmesg restreint conformes]\n# Données : SYSCTL_CHECK key=fs.protected_hardlinks current=1 recommended=1\n# Données : SYSCTL_CHECK key=kernel.dmesg_restrict current=1 recommended=1\nA_COMPLETER\n\n[Cas 3 — Vérification de désactivation du routage IP (ip_forward)]\n# Données : SYSCTL_CHECK key=net.ipv4.ip_forward current=1 recommended=0\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "SYSCTL_AUDIT key=kernel.kptr_restrict current=0 target=2 status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=net.ipv4.tcp_syncookies current=0 target=1 status=HARDENING_REQUIRED"
      },
      {
        "label": "Protection contre les liens durs et dmesg restreint conformes",
        "stdin": "cas:2",
        "expected": "SYSCTL_AUDIT key=fs.protected_hardlinks current=1 target=1 status=COMPLIANT\nSYSCTL_AUDIT key=kernel.dmesg_restrict current=1 target=1 status=COMPLIANT"
      },
      {
        "label": "Vérification de désactivation du routage IP (ip_forward)",
        "stdin": "cas:3",
        "expected": "SYSCTL_AUDIT key=net.ipv4.ip_forward current=1 target=0 status=HARDENING_REQUIRED"
      }
    ],
    "solution": "[Exemple]\nSYSCTL_AUDIT key=kernel.randomize_va_space current=2 target=2 status=COMPLIANT\n\n[Cas 1 — Paramètres nécessitant un durcissement (non conformes)]\nSYSCTL_AUDIT key=kernel.kptr_restrict current=0 target=2 status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=net.ipv4.tcp_syncookies current=0 target=1 status=HARDENING_REQUIRED\n\n[Cas 2 — Protection contre les liens durs et dmesg restreint conformes]\nSYSCTL_AUDIT key=fs.protected_hardlinks current=1 target=1 status=COMPLIANT\nSYSCTL_AUDIT key=kernel.dmesg_restrict current=1 target=1 status=COMPLIANT\n\n[Cas 3 — Vérification de désactivation du routage IP (ip_forward)]\nSYSCTL_AUDIT key=net.ipv4.ip_forward current=1 target=0 status=HARDENING_REQUIRED"
  },
  {
    "id": "lx3-c6-e2",
    "chapter": 6,
    "title": "Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l’évaluation séquentielle d’une pile de modules PAM selon les drapeaux de contrôle.",
    "brief": "<p>Le système <strong>PAM (Pluggable Authentication Modules)</strong> sous Linux filtre l'accès aux services (login, sshd, sudo) via une chaîne séquentielle de modules.<br><br>\nSémantique des drapeaux de contrôle PAM :<br>\n- <code>required</code> : En cas d'échec (<code>FAIL</code>), l'échec global est mémorisé, mais PAM continue d'évaluer le reste de la pile pour ne pas donner d'indice à un attaquant (<code>action=CONTINUE</code>).<br>\n- <code>requisite</code> : En cas d'échec (<code>FAIL</code>), la chaîne est <strong>interrompue immédiatement</strong> avec un refus définitif (<code>action=ABORT_FAIL</code>).<br>\n- <code>sufficient</code> : En cas de succès (<code>SUCCESS</code>), si aucun échec antérieur n'a été mémorisé, la chaîne s'arrête avec succès immédiat (<code>action=STOP_SUCCESS</code>). En cas d'échec, le résultat est simplement ignoré (<code>action=CONTINUE</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nAfficher pour chaque étape :<br>\n<code>PAM_TRACE module={module} control={control} res={res} action={CONTINUE|ABORT_FAIL|STOP_SUCCESS}</code>.<br><br>\nPuis en fin de script, afficher la décision finale :<br>\n<code>PAM_FINAL decision={GRANTED|DENIED}</code></p>",
    "starter": "# Grille d'analyse (lx3-c6-e2) — Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Échec d’un module requisite avec arrêt immédiat]\n# Données : PAM_STEP module=pam_faillock.so control=requisite res=FAIL\n# Données : PAM_STEP module=pam_unix.so control=required res=SUCCESS\nA_COMPLETER\n\n[Cas 2 — Échec d’un module required avec exécution complète de la suite]\n# Données : PAM_STEP module=pam_tally.so control=required res=FAIL\n# Données : PAM_STEP module=pam_unix.so control=required res=SUCCESS\nA_COMPLETER\n\n[Cas 3 — Succès complet sur tous les modules required]\n# Données : PAM_STEP module=pam_env.so control=required res=SUCCESS\n# Données : PAM_STEP module=pam_unix.so control=required res=SUCCESS\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "PAM_TRACE module=pam_faillock.so control=requisite res=FAIL action=ABORT_FAIL\nPAM_FINAL decision=DENIED"
      },
      {
        "label": "Échec d’un module required avec exécution complète de la suite",
        "stdin": "cas:2",
        "expected": "PAM_TRACE module=pam_tally.so control=required res=FAIL action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=DENIED"
      },
      {
        "label": "Succès complet sur tous les modules required",
        "stdin": "cas:3",
        "expected": "PAM_TRACE module=pam_env.so control=required res=SUCCESS action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=GRANTED"
      }
    ],
    "solution": "[Exemple]\nPAM_TRACE module=pam_unix.so control=sufficient res=SUCCESS action=STOP_SUCCESS\nPAM_FINAL decision=GRANTED\n\n[Cas 1 — Échec d’un module requisite avec arrêt immédiat]\nPAM_TRACE module=pam_faillock.so control=requisite res=FAIL action=ABORT_FAIL\nPAM_FINAL decision=DENIED\n\n[Cas 2 — Échec d’un module required avec exécution complète de la suite]\nPAM_TRACE module=pam_tally.so control=required res=FAIL action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=DENIED\n\n[Cas 3 — Succès complet sur tous les modules required]\nPAM_TRACE module=pam_env.so control=required res=SUCCESS action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=GRANTED"
  },
  {
    "id": "lx3-c6-e3",
    "chapter": 6,
    "title": "Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser les enregistrements auditd (RFC 5424) pour détecter les élévations de privilèges (EUID=0) suspectes.",
    "brief": "<p>Le sous-système de sécurité <strong>auditd</strong> trace les activités au cœur du noyau Linux (appels système, exécutions de binaires privilégiés setuid, commandes sudo).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles de détection :<br>\n1. Une tentative d'élévation survient lorsque l'utilisateur réel n'est pas root (<code>uid != 0</code>) mais que l'UID effectif devient root (<code>euid == 0</code>).<br>\n2. Si <code>uid != 0 and euid == 0</code> :<br>\n- Si <code>res == 'success'</code> : <code>alert=CRITICAL_ROOT_ELEVATION</code>.<br>\n- Si <code>res == 'failed'</code> : <code>alert=BLOCKED_PRIVILEGE_ATTEMPT</code>.<br>\n3. Si <code>uid == 0 and euid == 0</code> : <code>alert=ROOT_NATIVE</code>.<br>\n4. Sinon (utilisateur non root standard) : <code>alert=STANDARD_USER</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>AUDIT_REPORT id={id} exe={exe} uid={uid} euid={euid} alert={alert}</code></p>",
    "starter": "# Grille d'analyse (lx3-c6-e3) — Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tentative d’élévation bloquée (res=failed)]\n# Données : AUDIT_LOG id=202 uid=1001 euid=0 exe=/usr/bin/su res=failed\nA_COMPLETER\n\n[Cas 2 — Activité native de root et activité utilisateur normale]\n# Données : AUDIT_LOG id=303 uid=0 euid=0 exe=/usr/sbin/cron res=success\n# Données : AUDIT_LOG id=304 uid=1000 euid=1000 exe=/usr/bin/ls res=success\nA_COMPLETER\n\n[Cas 3 — Binaire setuid non standard exécuté avec succès]\n# Données : AUDIT_LOG id=404 uid=1005 euid=0 exe=/tmp/exploit res=success\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "AUDIT_REPORT id=202 exe=/usr/bin/su uid=1001 euid=0 alert=BLOCKED_PRIVILEGE_ATTEMPT"
      },
      {
        "label": "Activité native de root et activité utilisateur normale",
        "stdin": "cas:2",
        "expected": "AUDIT_REPORT id=303 exe=/usr/sbin/cron uid=0 euid=0 alert=ROOT_NATIVE\nAUDIT_REPORT id=304 exe=/usr/bin/ls uid=1000 euid=1000 alert=STANDARD_USER"
      },
      {
        "label": "Binaire setuid non standard exécuté avec succès",
        "stdin": "cas:3",
        "expected": "AUDIT_REPORT id=404 exe=/tmp/exploit uid=1005 euid=0 alert=CRITICAL_ROOT_ELEVATION"
      }
    ],
    "solution": "[Exemple]\nAUDIT_REPORT id=101 exe=/usr/bin/sudo uid=1000 euid=0 alert=CRITICAL_ROOT_ELEVATION\n\n[Cas 1 — Tentative d’élévation bloquée (res=failed)]\nAUDIT_REPORT id=202 exe=/usr/bin/su uid=1001 euid=0 alert=BLOCKED_PRIVILEGE_ATTEMPT\n\n[Cas 2 — Activité native de root et activité utilisateur normale]\nAUDIT_REPORT id=303 exe=/usr/sbin/cron uid=0 euid=0 alert=ROOT_NATIVE\nAUDIT_REPORT id=304 exe=/usr/bin/ls uid=1000 euid=1000 alert=STANDARD_USER\n\n[Cas 3 — Binaire setuid non standard exécuté avec succès]\nAUDIT_REPORT id=404 exe=/tmp/exploit uid=1005 euid=0 alert=CRITICAL_ROOT_ELEVATION"
  }
];
