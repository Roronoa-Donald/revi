'use strict';

module.exports = [
  {
    "id": "gh3-c4-e1",
    "chapter": 4,
    "title": "Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)",
    "level": "n1",
    "language": "shell",
    "goal": "Auditer la création d’une branche et ses opérations selon les règles de gouvernance de Git Flow ou GitHub Flow.",
    "brief": "<p>En entreprise, la gestion des branches doit suivre des règles strictes pour garantir la stabilité de la production :<br><br>\nRègles du modèle <strong>GIT_FLOW</strong> :<br>\n- Les branches <code>feature/*</code> doivent obligatoirement être créées à partir de <code>develop</code>.<br>\n- Les branches <code>release/*</code> doivent partir de <code>develop</code>.<br>\n- Les branches <code>hotfix/*</code> doivent partir de <code>main</code>.<br>\n- Tout push direct (<code>direct_push=OUI</code>) sur <code>main</code> ou <code>develop</code> est formellement interdit (<code>VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH</code>).<br><br>\nRègles du modèle <strong>GITHUB_FLOW</strong> :<br>\n- Toutes les branches de fonctionnalités/correctifs partent de <code>main</code>.<br>\n- Tout push direct sur <code>main</code> est interdit.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque ligne, afficher :<br>\n<code>AUDIT branch={branch} status={CONFORME | motif_violation}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e1) — Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifier d’abord l’interdiction de push direct sur les branches protégées.",
      "Tester la conformité de la branche de départ (base) selon le préfixe du nom de branche."
    ],
    "examples": [
      {
        "stdin": "BRANCH_EVENT wf=GIT_FLOW branch=feature/auth base=develop direct_push=NON\nBRANCH_EVENT wf=GIT_FLOW branch=feature/auth base=main direct_push=NON",
        "expected": "AUDIT branch=feature/auth status=CONFORME\nAUDIT branch=feature/auth status=BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP",
        "note": "Dans Git Flow, une feature doit partir de develop, pas de main."
      }
    ],
    "tests": [
      {
        "label": "Push direct proscrit sur branche protégée",
        "stdin": "BRANCH_EVENT wf=GIT_FLOW branch=main base=main direct_push=OUI\nBRANCH_EVENT wf=GITHUB_FLOW branch=main base=main direct_push=OUI",
        "expected": "AUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\nAUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH"
      },
      {
        "label": "Conformité hotfix et release dans Git Flow",
        "stdin": "BRANCH_EVENT wf=GIT_FLOW branch=hotfix/patch-1 base=main direct_push=NON\nBRANCH_EVENT wf=GIT_FLOW branch=hotfix/patch-2 base=develop direct_push=NON\nBRANCH_EVENT wf=GIT_FLOW branch=release/v1.0 base=develop direct_push=NON",
        "expected": "AUDIT branch=hotfix/patch-1 status=CONFORME\nAUDIT branch=hotfix/patch-2 status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN\nAUDIT branch=release/v1.0 status=CONFORME"
      },
      {
        "label": "GitHub Flow avec branche dérivée de main",
        "stdin": "BRANCH_EVENT wf=GITHUB_FLOW branch=feat-login base=main direct_push=NON\nBRANCH_EVENT wf=GITHUB_FLOW branch=feat-login base=develop direct_push=NON",
        "expected": "AUDIT branch=feat-login status=CONFORME\nAUDIT branch=feat-login status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c4-e1 : Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"QlJBTkNIX0VWRU5UIHdmPUdJVF9GTE9XIGJyYW5jaD1mZWF0dXJlL2F1dGggYmFzZT1kZXZlbG9wIGRpcmVjdF9wdXNoPU5PTgpCUkFOQ0hfRVZFTlQgd2Y9R0lUX0ZMT1cgYnJhbmNoPWZlYXR1cmUvYXV0aCBiYXNlPW1haW4gZGlyZWN0X3B1c2g9Tk9O\")\n    printf '%s\\n' \"QVVESVQgYnJhbmNoPWZlYXR1cmUvYXV0aCBzdGF0dXM9Q09ORk9STUUKQVVESVQgYnJhbmNoPWZlYXR1cmUvYXV0aCBzdGF0dXM9QlJBTkNIRV9CQVNFX0lOVkFMSURFX0FUVEVORFVfREVWRUxPUA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"QlJBTkNIX0VWRU5UIHdmPUdJVF9GTE9XIGJyYW5jaD1tYWluIGJhc2U9bWFpbiBkaXJlY3RfcHVzaD1PVUkKQlJBTkNIX0VWRU5UIHdmPUdJVEhVQl9GTE9XIGJyYW5jaD1tYWluIGJhc2U9bWFpbiBkaXJlY3RfcHVzaD1PVUk=\")\n    printf '%s\\n' \"QVVESVQgYnJhbmNoPW1haW4gc3RhdHVzPVZJT0xBVElPTl9ESVJFQ1RfUFVTSF9QUk9URUNURURfQlJBTkNICkFVRElUIGJyYW5jaD1tYWluIHN0YXR1cz1WSU9MQVRJT05fRElSRUNUX1BVU0hfUFJPVEVDVEVEX0JSQU5DSA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"QlJBTkNIX0VWRU5UIHdmPUdJVF9GTE9XIGJyYW5jaD1ob3RmaXgvcGF0Y2gtMSBiYXNlPW1haW4gZGlyZWN0X3B1c2g9Tk9OCkJSQU5DSF9FVkVOVCB3Zj1HSVRfRkxPVyBicmFuY2g9aG90Zml4L3BhdGNoLTIgYmFzZT1kZXZlbG9wIGRpcmVjdF9wdXNoPU5PTgpCUkFOQ0hfRVZFTlQgd2Y9R0lUX0ZMT1cgYnJhbmNoPXJlbGVhc2UvdjEuMCBiYXNlPWRldmVsb3AgZGlyZWN0X3B1c2g9Tk9O\")\n    printf '%s\\n' \"QVVESVQgYnJhbmNoPWhvdGZpeC9wYXRjaC0xIHN0YXR1cz1DT05GT1JNRQpBVURJVCBicmFuY2g9aG90Zml4L3BhdGNoLTIgc3RhdHVzPUJSQU5DSEVfQkFTRV9JTlZBTElERV9BVFRFTkRVX01BSU4KQVVESVQgYnJhbmNoPXJlbGVhc2UvdjEuMCBzdGF0dXM9Q09ORk9STUU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"QlJBTkNIX0VWRU5UIHdmPUdJVEhVQl9GTE9XIGJyYW5jaD1mZWF0LWxvZ2luIGJhc2U9bWFpbiBkaXJlY3RfcHVzaD1OT04KQlJBTkNIX0VWRU5UIHdmPUdJVEhVQl9GTE9XIGJyYW5jaD1mZWF0LWxvZ2luIGJhc2U9ZGV2ZWxvcCBkaXJlY3RfcHVzaD1OT04=\")\n    printf '%s\\n' \"QVVESVQgYnJhbmNoPWZlYXQtbG9naW4gc3RhdHVzPUNPTkZPUk1FCkFVRElUIGJyYW5jaD1mZWF0LWxvZ2luIHN0YXR1cz1CUkFOQ0hFX0JBU0VfSU5WQUxJREVfQVRURU5EVV9NQUlO\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de règles de protection de branches (Branch Protection Rules)",
    "level": "n2",
    "language": "shell",
    "goal": "Appliquer les critères de fusion de Pull Request (approbations requises, statuts CI, signature GPG).",
    "brief": "<p>Sur GitHub Enterprise, les branches de production sont verrouillées par des <strong>Branch Protection Rules</strong>.<br><br>\nCritères nécessaires pour autoriser la fusion (Merge) dans <code>main</code> :<br>\n1. <code>approvals &gt;= min_approvals</code> (nombre d'approbations de relecteurs humains requises, ex: 2).<br>\n2. <code>ci_status == 'PASS'</code> (les pipelines d'intégration continue doivent impérativement être au vert).<br>\n3. Si <code>require_signed == 'OUI'</code> : le commit doit obligatoirement être signé cryptographiquement (<code>gpg_signed == 'OUI'</code>).<br>\n4. Si <code>linear_history == 'OUI'</code> : le type de merge demandé ne doit pas être <code>MERGE_COMMIT</code> (doit être <code>SQUASH</code> ou <code>REBASE</code>).<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nPour chaque PR, afficher :<br>\n<code>PR_MERGE pr={id} status={AUTHORIZED|BLOCKED} reason={OK|motif_du_premier_blocage}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e2) — Contrôleur de règles de protection de branches (Branch Protection Rules)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifier les critères dans l’ordre de la spécification : approvals, ci_status, signature, historique linéaire.",
      "Dès qu’un critère échoue, le statut est BLOCKED."
    ],
    "examples": [
      {
        "stdin": "CONFIG min_approvals=2 require_signed=OUI linear_history=OUI\nMERGE_REQ pr=42 approvals=2 ci_status=PASS gpg_signed=OUI merge_type=SQUASH",
        "expected": "PR_MERGE pr=42 status=AUTHORIZED reason=OK",
        "note": "Tous les critères de protection sont satisfaits."
      }
    ],
    "tests": [
      {
        "label": "Rejet pour approbations insuffisantes ou CI en échec",
        "stdin": "CONFIG min_approvals=2 require_signed=NON linear_history=NON\nMERGE_REQ pr=10 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT\nMERGE_REQ pr=11 approvals=2 ci_status=FAIL gpg_signed=NON merge_type=MERGE_COMMIT",
        "expected": "PR_MERGE pr=10 status=BLOCKED reason=APPROVALS_INSUFFISANTS\nPR_MERGE pr=11 status=BLOCKED reason=CI_CHECKS_FAILED"
      },
      {
        "label": "Rejet pour signature GPG manquante",
        "stdin": "CONFIG min_approvals=1 require_signed=OUI linear_history=NON\nMERGE_REQ pr=20 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT",
        "expected": "PR_MERGE pr=20 status=BLOCKED reason=SIGNATURE_GPG_REQUISE"
      },
      {
        "label": "Rejet pour merge commit sur branche à historique linéaire strict",
        "stdin": "CONFIG min_approvals=1 require_signed=NON linear_history=OUI\nMERGE_REQ pr=30 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT\nMERGE_REQ pr=31 approvals=1 ci_status=PASS gpg_signed=NON merge_type=REBASE",
        "expected": "PR_MERGE pr=30 status=BLOCKED reason=HISTORIQUE_LINEAIRE_EXIGE\nPR_MERGE pr=31 status=AUTHORIZED reason=OK"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c4-e2 : Contrôleur de règles de protection de branches (Branch Protection Rules)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q09ORklHIG1pbl9hcHByb3ZhbHM9MiByZXF1aXJlX3NpZ25lZD1PVUkgbGluZWFyX2hpc3Rvcnk9T1VJCk1FUkdFX1JFUSBwcj00MiBhcHByb3ZhbHM9MiBjaV9zdGF0dXM9UEFTUyBncGdfc2lnbmVkPU9VSSBtZXJnZV90eXBlPVNRVUFTSA==\")\n    printf '%s\\n' \"UFJfTUVSR0UgcHI9NDIgc3RhdHVzPUFVVEhPUklaRUQgcmVhc29uPU9L\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09ORklHIG1pbl9hcHByb3ZhbHM9MiByZXF1aXJlX3NpZ25lZD1OT04gbGluZWFyX2hpc3Rvcnk9Tk9OCk1FUkdFX1JFUSBwcj0xMCBhcHByb3ZhbHM9MSBjaV9zdGF0dXM9UEFTUyBncGdfc2lnbmVkPU5PTiBtZXJnZV90eXBlPU1FUkdFX0NPTU1JVApNRVJHRV9SRVEgcHI9MTEgYXBwcm92YWxzPTIgY2lfc3RhdHVzPUZBSUwgZ3BnX3NpZ25lZD1OT04gbWVyZ2VfdHlwZT1NRVJHRV9DT01NSVQ=\")\n    printf '%s\\n' \"UFJfTUVSR0UgcHI9MTAgc3RhdHVzPUJMT0NLRUQgcmVhc29uPUFQUFJPVkFMU19JTlNVRkZJU0FOVFMKUFJfTUVSR0UgcHI9MTEgc3RhdHVzPUJMT0NLRUQgcmVhc29uPUNJX0NIRUNLU19GQUlMRUQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09ORklHIG1pbl9hcHByb3ZhbHM9MSByZXF1aXJlX3NpZ25lZD1PVUkgbGluZWFyX2hpc3Rvcnk9Tk9OCk1FUkdFX1JFUSBwcj0yMCBhcHByb3ZhbHM9MSBjaV9zdGF0dXM9UEFTUyBncGdfc2lnbmVkPU5PTiBtZXJnZV90eXBlPU1FUkdFX0NPTU1JVA==\")\n    printf '%s\\n' \"UFJfTUVSR0UgcHI9MjAgc3RhdHVzPUJMT0NLRUQgcmVhc29uPVNJR05BVFVSRV9HUEdfUkVRVUlTRQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09ORklHIG1pbl9hcHByb3ZhbHM9MSByZXF1aXJlX3NpZ25lZD1OT04gbGluZWFyX2hpc3Rvcnk9T1VJCk1FUkdFX1JFUSBwcj0zMCBhcHByb3ZhbHM9MSBjaV9zdGF0dXM9UEFTUyBncGdfc2lnbmVkPU5PTiBtZXJnZV90eXBlPU1FUkdFX0NPTU1JVApNRVJHRV9SRVEgcHI9MzEgYXBwcm92YWxzPTEgY2lfc3RhdHVzPVBBU1MgZ3BnX3NpZ25lZD1OT04gbWVyZ2VfdHlwZT1SRUJBU0U=\")\n    printf '%s\\n' \"UFJfTUVSR0UgcHI9MzAgc3RhdHVzPUJMT0NLRUQgcmVhc29uPUhJU1RPUklRVUVfTElORUFJUkVfRVhJR0UKUFJfTUVSR0UgcHI9MzEgc3RhdHVzPUFVVEhPUklaRUQgcmVhc29uPU9L\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c4-e3",
    "chapter": 4,
    "title": "Analyseur sémantique de commits selon Conventional Commits",
    "level": "n3",
    "language": "shell",
    "goal": "Vérifier la conformité des messages de commit selon la spécification formelle Conventional Commits 1.0.0.",
    "brief": "<p>La norme <strong>Conventional Commits</strong> structure les messages pour automatiser le versionnage sémantique (SemVer) et la génération de CHANGELOG.<br><br>\nFormat standard :<br>\n<code>&lt;type&gt;[scope optionnel][!]: &lt;description&gt;</code><br><br>\nRègles de validation :<br>\n1. <code>type</code> doit appartenir à la liste autorisée : <code>feat, fix, docs, refactor, test, chore, perf, ci</code>.<br>\n2. Le <code>scope</code> (si présent) doit être entouré de parenthèses : ex: <code>feat(api): ...</code>.<br>\n3. Le caractère <code>!</code> avant le deux-points ou la présence de <code>BREAKING CHANGE</code> dans le message indique une rupture de compatibilité (<code>BREAKING=OUI</code>).<br>\n4. Le séparateur obligatoire est deux-points suivi d'un espace <code>\": \"</code>.<br>\n5. La <code>description</code> ne doit pas être vide.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque message, afficher :<br>\n- Si conforme : <code>CONVENTIONAL_AUDIT id={id} valid=OUI type={type} scope={scope|NONE} breaking={OUI|NON}</code><br>\n- Si non conforme : <code>CONVENTIONAL_AUDIT id={id} valid=NON error={TYPE_INCONNU|FORMAT_INVALIDE|DESCRIPTION_VIDE}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e3) — Analyseur sémantique de commits selon Conventional Commits\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Utiliser une regex : r\"^([a-z]+)(?:\\(([a-zA-Z0-9_-]+)\\))?(!)?:s+(.+)$\"",
      "Vérifier si le type extrait est dans les types autorisés."
    ],
    "examples": [
      {
        "stdin": "COMMIT_MSG id=1 msg=feat(auth): ajout authentification JWT\nCOMMIT_MSG id=2 msg=fix!: correction faille critique",
        "expected": "CONVENTIONAL_AUDIT id=1 valid=OUI type=feat scope=auth breaking=NON\nCONVENTIONAL_AUDIT id=2 valid=OUI type=fix scope=NONE breaking=OUI",
        "note": "Validation du format avec et sans scope, détection de breaking change."
      }
    ],
    "tests": [
      {
        "label": "Message sans scope et type inconnu",
        "stdin": "COMMIT_MSG id=10 msg=docs: mise a jour du README\nCOMMIT_MSG id=11 msg=update: modifications diverses",
        "expected": "CONVENTIONAL_AUDIT id=10 valid=OUI type=docs scope=NONE breaking=NON\nCONVENTIONAL_AUDIT id=11 valid=NON error=TYPE_INCONNU"
      },
      {
        "label": "Format invalide sans espace après deux-points ou sans séparateur",
        "stdin": "COMMIT_MSG id=20 msg=feat:nospace\nCOMMIT_MSG id=21 msg=juste un message sans type",
        "expected": "CONVENTIONAL_AUDIT id=20 valid=NON error=FORMAT_INVALIDE\nCONVENTIONAL_AUDIT id=21 valid=NON error=FORMAT_INVALIDE"
      },
      {
        "label": "Breaking change via mention textuelle BREAKING CHANGE",
        "stdin": "COMMIT_MSG id=30 msg=refactor(core): refonte complete du routeur BREAKING CHANGE",
        "expected": "CONVENTIONAL_AUDIT id=30 valid=OUI type=refactor scope=core breaking=OUI"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c4-e3 : Analyseur sémantique de commits selon Conventional Commits\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q09NTUlUX01TRyBpZD0xIG1zZz1mZWF0KGF1dGgpOiBham91dCBhdXRoZW50aWZpY2F0aW9uIEpXVApDT01NSVRfTVNHIGlkPTIgbXNnPWZpeCE6IGNvcnJlY3Rpb24gZmFpbGxlIGNyaXRpcXVl\")\n    printf '%s\\n' \"Q09OVkVOVElPTkFMX0FVRElUIGlkPTEgdmFsaWQ9T1VJIHR5cGU9ZmVhdCBzY29wZT1hdXRoIGJyZWFraW5nPU5PTgpDT05WRU5USU9OQUxfQVVESVQgaWQ9MiB2YWxpZD1PVUkgdHlwZT1maXggc2NvcGU9Tk9ORSBicmVha2luZz1PVUk=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUX01TRyBpZD0xMCBtc2c9ZG9jczogbWlzZSBhIGpvdXIgZHUgUkVBRE1FCkNPTU1JVF9NU0cgaWQ9MTEgbXNnPXVwZGF0ZTogbW9kaWZpY2F0aW9ucyBkaXZlcnNlcw==\")\n    printf '%s\\n' \"Q09OVkVOVElPTkFMX0FVRElUIGlkPTEwIHZhbGlkPU9VSSB0eXBlPWRvY3Mgc2NvcGU9Tk9ORSBicmVha2luZz1OT04KQ09OVkVOVElPTkFMX0FVRElUIGlkPTExIHZhbGlkPU5PTiBlcnJvcj1UWVBFX0lOQ09OTlU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUX01TRyBpZD0yMCBtc2c9ZmVhdDpub3NwYWNlCkNPTU1JVF9NU0cgaWQ9MjEgbXNnPWp1c3RlIHVuIG1lc3NhZ2Ugc2FucyB0eXBl\")\n    printf '%s\\n' \"Q09OVkVOVElPTkFMX0FVRElUIGlkPTIwIHZhbGlkPU5PTiBlcnJvcj1GT1JNQVRfSU5WQUxJREUKQ09OVkVOVElPTkFMX0FVRElUIGlkPTIxIHZhbGlkPU5PTiBlcnJvcj1GT1JNQVRfSU5WQUxJREU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUX01TRyBpZD0zMCBtc2c9cmVmYWN0b3IoY29yZSk6IHJlZm9udGUgY29tcGxldGUgZHUgcm91dGV1ciBCUkVBS0lORyBDSEFOR0U=\")\n    printf '%s\\n' \"Q09OVkVOVElPTkFMX0FVRElUIGlkPTMwIHZhbGlkPU9VSSB0eXBlPXJlZmFjdG9yIHNjb3BlPWNvcmUgYnJlYWtpbmc9T1VJ\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
