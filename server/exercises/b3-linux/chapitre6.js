'use strict';

module.exports = [
  {
    "id": "lx3-c6-e1",
    "chapter": 6,
    "title": "Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité des paramètres de sécurité du noyau Linux par rapport aux recommandations ANSSI / CIS Benchmark.",
    "brief": "<p>Le fichier <code>/etc/sysctl.conf</code> et l'interface <code>/proc/sys/</code> permettent d'ajuster dynamiquement les options de sécurité du noyau Linux (randomisation ASLR, restriction des pointeurs mémoire, protection des liens durs et protection contre les attaques SYN Flood).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles :<br>\n- Comparez <code>current</code> et <code>recommended</code> comme des chaînes, en respectant la casse et les zéros initiaux : <code>01</code> diffère de <code>1</code>.<br>\n- Si les deux chaînes sont identiques : <code>status=COMPLIANT</code>.<br>\n- Sinon : <code>status=HARDENING_REQUIRED</code>.<br><br>\nPour chaque paramètre, afficher :<br>\n<code>SYSCTL_AUDIT key={key} current={val} target={recommended} status={COMPLIANT|HARDENING_REQUIRED}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c6-e1) — Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Comparer les chaînes current et recommended.",
      "Afficher COMPLIANT si égalité stricte, sinon HARDENING_REQUIRED.",
      "1. Lire key, current et recommended. 2. Égalité stricte : status=COMPLIANT. 3. Sinon status=HARDENING_REQUIRED. 4. Afficher la ligne SYSCTL_AUDIT avec la valeur cible."
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
        "stdin": "SYSCTL_CHECK key=kernel.kptr_restrict current=0 recommended=2\nSYSCTL_CHECK key=net.ipv4.tcp_syncookies current=0 recommended=1\nSYSCTL_CHECK key=kernel.leading_zero current=01 recommended=1",
        "expected": "SYSCTL_AUDIT key=kernel.kptr_restrict current=0 target=2 status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=net.ipv4.tcp_syncookies current=0 target=1 status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=kernel.leading_zero current=01 target=1 status=HARDENING_REQUIRED"
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
      },
      {
        "label": "Égalité textuelle stricte et respect de la casse",
        "stdin": "SYSCTL_CHECK key=demo.case current=enabled recommended=ENABLED\nSYSCTL_CHECK key=demo.same current=enabled recommended=enabled\nSYSCTL_CHECK key=demo.zero current=0 recommended=00",
        "expected": "SYSCTL_AUDIT key=demo.case current=enabled target=ENABLED status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=demo.same current=enabled target=enabled status=COMPLIANT\nSYSCTL_AUDIT key=demo.zero current=0 target=00 status=HARDENING_REQUIRED"
      },
      {
        "label": "Comparaison textuelle sensible à la casse",
        "stdin": "SYSCTL_CHECK key=demo.mode current=enabled recommended=ENABLED",
        "expected": "SYSCTL_AUDIT key=demo.mode current=enabled target=ENABLED status=HARDENING_REQUIRED"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"SYSCTL_CHECK\" {\n  read_fields($0, fields)\n  status = (\"value:\" fields[\"current\"] == \"value:\" fields[\"recommended\"]) ? \"COMPLIANT\" : \"HARDENING_REQUIRED\"\n  printf \"SYSCTL_AUDIT key=%s current=%s target=%s status=%s\\n\", fields[\"key\"], fields[\"current\"], fields[\"recommended\"], status\n}\n\n'\n",
    "takeaway": "Durcir /etc/sysctl.conf active ASLR, protections réseau SYN cookies et désactive le routage IP non requis sur un serveur hôte."
  },
  {
    "id": "lx3-c6-e2",
    "chapter": 6,
    "title": "Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler l’évaluation séquentielle d’une pile de modules PAM selon les drapeaux de contrôle.",
    "brief": "<p>Le système <strong>PAM (Pluggable Authentication Modules)</strong> sous Linux filtre l'accès aux services (login, sshd, sudo) via une chaîne séquentielle de modules.<br><br>\nSémantique des drapeaux de contrôle PAM :<br>\n- <code>required</code> : En cas d'échec (<code>FAIL</code>), l'échec global est mémorisé, mais PAM continue d'évaluer le reste de la pile pour ne pas donner d'indice à un attaquant (<code>action=CONTINUE</code>).<br>\n- <code>requisite</code> : En cas d'échec (<code>FAIL</code>), la chaîne est <strong>interrompue immédiatement</strong> avec un refus définitif (<code>action=ABORT_FAIL</code>).<br>\n- <code>sufficient</code> : En cas de succès (<code>SUCCESS</code>), si aucun échec antérieur n'a été mémorisé, la chaîne s'arrête avec succès immédiat (<code>action=STOP_SUCCESS</code>). En cas d'échec, le résultat est simplement ignoré (<code>action=CONTINUE</code>).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nAfficher pour chaque étape :<br>\n<code>PAM_TRACE module={module} control={control} res={res} action={CONTINUE|ABORT_FAIL|STOP_SUCCESS}</code>.<br><br>\nPuis en fin de script, afficher la décision finale :<br>\n<code>PAM_FINAL decision={GRANTED|DENIED}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c6-e2) — Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Gérer deux variables d’état : has_failed (booléen) et final_granted (booléen).",
      "Si control == \"requisite\" et res == \"FAIL\", arrêter immédiatement la boucle avec DENIED.",
      "1. required + FAIL : mémoriser l’échec et continuer. 2. requisite + FAIL : ABORT_FAIL puis décision DENIED. 3. sufficient + SUCCESS sans échec antérieur : STOP_SUCCESS puis GRANTED. 4. Fin de pile sans échec : GRANTED."
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
        "stdin": "PAM_STEP module=pam_tally.so control=required res=FAIL\nPAM_STEP module=pam_unix.so control=required res=SUCCESS\nPAM_STEP module=pam_totp.so control=sufficient res=SUCCESS",
        "expected": "PAM_TRACE module=pam_tally.so control=required res=FAIL action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_TRACE module=pam_totp.so control=sufficient res=SUCCESS action=CONTINUE\nPAM_FINAL decision=DENIED"
      },
      {
        "label": "Succès complet sur tous les modules required",
        "stdin": "PAM_STEP module=pam_env.so control=required res=SUCCESS\nPAM_STEP module=pam_unix.so control=required res=SUCCESS",
        "expected": "PAM_TRACE module=pam_env.so control=required res=SUCCESS action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=GRANTED"
      },
      {
        "label": "Aucun module suffisant ne réussit",
        "stdin": "PAM_STEP module=shadow.so control=sufficient res=FAIL\nPAM_STEP module=token.so control=sufficient res=FAIL",
        "expected": "PAM_TRACE module=shadow.so control=sufficient res=FAIL action=CONTINUE\nPAM_TRACE module=token.so control=sufficient res=FAIL action=CONTINUE\nPAM_FINAL decision=DENIED"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"PAM_STEP\" && !stopped {\n  read_fields($0, fields)\n  control = fields[\"control\"]; result = fields[\"res\"]; action = \"CONTINUE\"\n  if (control == \"required\" && result == \"FAIL\") failed = 1\n  if (control == \"requisite\" && result == \"FAIL\") { failed = 1; stopped = 1; action = \"ABORT_FAIL\" }\n  if (result == \"SUCCESS\") {\n    succeeded = 1\n    if (control == \"sufficient\" && !failed) { stopped = 1; action = \"STOP_SUCCESS\" }\n  }\n  printf \"PAM_TRACE module=%s control=%s res=%s action=%s\\n\", fields[\"module\"], control, result, action\n}\nEND {\n  decision = succeeded && !failed ? \"GRANTED\" : \"DENIED\"\n  printf \"PAM_FINAL decision=%s\\n\", decision\n}\n\n'\n",
    "takeaway": "Dans PAM, l’ordre et les drapeaux de contrôle (required, requisite, sufficient) dictent l’acceptation ou le rejet final de la session."
  },
  {
    "id": "lx3-c6-e3",
    "chapter": 6,
    "title": "Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges",
    "level": "n3",
    "language": "shell",
    "goal": "Analyser les enregistrements auditd (RFC 5424) pour détecter les élévations de privilèges (EUID=0) suspectes.",
    "brief": "<p>Le sous-système de sécurité <strong>auditd</strong> trace les activités au cœur du noyau Linux (appels système, exécutions de binaires privilégiés setuid, commandes sudo).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles de détection :<br>\n1. Une tentative d'élévation survient lorsque l'utilisateur réel n'est pas root (<code>uid != 0</code>) mais que l'UID effectif devient root (<code>euid == 0</code>).<br>\n2. Si <code>uid != 0 and euid == 0</code> :<br>\n- Si <code>res == 'success'</code> : <code>alert=CRITICAL_ROOT_ELEVATION</code>.<br>\n- Si <code>res == 'failed'</code> : <code>alert=BLOCKED_PRIVILEGE_ATTEMPT</code>.<br>\n3. Si <code>uid == 0 and euid == 0</code> : <code>alert=ROOT_NATIVE</code>.<br>\n4. Sinon (utilisateur non root standard) : <code>alert=STANDARD_USER</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>AUDIT_REPORT id={id} exe={exe} uid={uid} euid={euid} alert={alert}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c6-e3) — Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Comparer les entiers uid et euid.",
      "Tester la condition uid != 0 et euid == 0 pour repérer l’élévation de privilèges.",
      "1. uid non nul et euid nul : CRITICAL_ROOT_ELEVATION si success, sinon BLOCKED_PRIVILEGE_ATTEMPT. 2. uid et euid nuls : ROOT_NATIVE. 3. Autre cas : STANDARD_USER. 4. Afficher la ligne AUDIT_REPORT."
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
        "stdin": "AUDIT_LOG id=202 uid=1001 euid=0 exe=/usr/bin/su res=failed\nAUDIT_LOG id=203 uid=0 euid=0 exe=/usr/bin/tool res=failed",
        "expected": "AUDIT_REPORT id=202 exe=/usr/bin/su uid=1001 euid=0 alert=BLOCKED_PRIVILEGE_ATTEMPT\nAUDIT_REPORT id=203 exe=/usr/bin/tool uid=0 euid=0 alert=ROOT_NATIVE"
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
      },
      {
        "label": "Branches du modèle et comparaison des identifiants",
        "stdin": "AUDIT_LOG id=51 uid=1000 euid=0 exe=/usr/bin/sudo res=success\nAUDIT_LOG id=52 uid=1000 euid=0 exe=/usr/bin/su res=failed\nAUDIT_LOG id=53 uid=0 euid=0 exe=/usr/bin/id res=success\nAUDIT_LOG id=54 uid=0 euid=1000 exe=/usr/bin/id res=success",
        "expected": "AUDIT_REPORT id=51 exe=/usr/bin/sudo uid=1000 euid=0 alert=CRITICAL_ROOT_ELEVATION\nAUDIT_REPORT id=52 exe=/usr/bin/su uid=1000 euid=0 alert=BLOCKED_PRIVILEGE_ATTEMPT\nAUDIT_REPORT id=53 exe=/usr/bin/id uid=0 euid=0 alert=ROOT_NATIVE\nAUDIT_REPORT id=54 exe=/usr/bin/id uid=0 euid=1000 alert=STANDARD_USER"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"AUDIT_LOG\" {\n  read_fields($0, fields)\n  uid = fields[\"uid\"] + 0; euid = fields[\"euid\"] + 0\n  if (uid != 0 && euid == 0) alert = fields[\"res\"] == \"success\" ? \"CRITICAL_ROOT_ELEVATION\" : \"BLOCKED_PRIVILEGE_ATTEMPT\"\n  else if (uid == 0 && euid == 0) alert = \"ROOT_NATIVE\"\n  else alert = \"STANDARD_USER\"\n  printf \"AUDIT_REPORT id=%s exe=%s uid=%s euid=%s alert=%s\\n\", fields[\"id\"], fields[\"exe\"], fields[\"uid\"], fields[\"euid\"], alert\n}\n\n'\n",
    "takeaway": "Corréler les événements auditd (SYSCALL, EXECVE, UID/EUID) retrace avec précision toute élévation de privilèges suspecte."
  }
];
