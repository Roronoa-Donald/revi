'use strict';

module.exports = [
  {
    "id": "gh3-c5-e1",
    "chapter": 5,
    "title": "Validateur de structure de workflow GitHub Actions",
    "level": "n1",
    "language": "shell",
    "goal": "Analyser la spécification d’un pipeline GitHub Actions et valider la présence des blocs obligatoires.",
    "brief": "<p>Un workflow GitHub Actions (fichier <code>.github/workflows/*.yml</code>) doit respecter une arborescence minimale :<br><br>\nCritères de conformité :<br>\n1. <code>name</code> : doit être renseigné (chaîne non vide).<br>\n2. Déclencheurs <code>on:</code> : au moins un événement déclencheur parmi <code>push</code>, <code>pull_request</code>, <code>workflow_dispatch</code>, <code>schedule</code>.<br>\n3. <code>jobs</code> : au moins un job déclaré. Chaque job doit obligatoirement comporter :<br>\n   - Une cible d'exécution <code>runs-on</code> (ex: <code>ubuntu-latest</code>, <code>windows-latest</code>).<br>\n   - Au moins une étape <code>step</code> déclarée.<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin)...&gt;</code><br>\n<code>JOB id=&lt;id&gt; runs_on=&lt;runner|NONE&gt; steps_count=&lt;n&gt;</code>.<br><br>\nPour le workflow, afficher :<br>\n<code>WORKFLOW_AUDIT name=\"{nom}\" status={VALID | ERREUR} triggers_count={n} jobs_count={m}</code><br>\nErreurs possibles : <code>MISSING_NAME</code>, <code>MISSING_TRIGGERS</code>, <code>NO_JOBS</code>, <code>JOB_MISSING_RUNS_ON</code>, <code>JOB_ZERO_STEPS</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e1) — Validateur de structure de workflow GitHub Actions\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Valider les prérequis dans l’ordre : name, triggers, jobs, puis les contraintes par job.",
      "S’arrêter au premier défaut identifié."
    ],
    "examples": [
      {
        "stdin": "NAME=CI-Pipeline\nTRIGGERS=push,pull_request\nJOB id=build runs_on=ubuntu-latest steps_count=3",
        "expected": "WORKFLOW_AUDIT name=\"CI-Pipeline\" status=VALID triggers_count=2 jobs_count=1",
        "note": "Workflow complet et bien formé."
      }
    ],
    "tests": [
      {
        "label": "Job sans runner runs_on spécifié",
        "stdin": "NAME=Test-Suite\nTRIGGERS=push\nJOB id=unit-tests runs_on=NONE steps_count=2",
        "expected": "WORKFLOW_AUDIT name=\"Test-Suite\" status=JOB_MISSING_RUNS_ON triggers_count=1 jobs_count=1"
      },
      {
        "label": "Déclencheurs absents",
        "stdin": "NAME=Nightly-Release\nTRIGGERS=\nJOB id=release runs_on=ubuntu-latest steps_count=1",
        "expected": "WORKFLOW_AUDIT name=\"Nightly-Release\" status=MISSING_TRIGGERS triggers_count=0 jobs_count=1"
      },
      {
        "label": "Workflow avec plusieurs jobs valides et job sans steps",
        "stdin": "NAME=Deploy-Prod\nTRIGGERS=workflow_dispatch\nJOB id=lint runs_on=ubuntu-latest steps_count=2\nJOB id=deploy runs_on=ubuntu-latest steps_count=0",
        "expected": "WORKFLOW_AUDIT name=\"Deploy-Prod\" status=JOB_ZERO_STEPS triggers_count=1 jobs_count=2"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c5-e1 : Validateur de structure de workflow GitHub Actions\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TkFNRT1DSS1QaXBlbGluZQpUUklHR0VSUz1wdXNoLHB1bGxfcmVxdWVzdApKT0IgaWQ9YnVpbGQgcnVuc19vbj11YnVudHUtbGF0ZXN0IHN0ZXBzX2NvdW50PTM=\")\n    printf '%s\\n' \"V09SS0ZMT1dfQVVESVQgbmFtZT0iQ0ktUGlwZWxpbmUiIHN0YXR1cz1WQUxJRCB0cmlnZ2Vyc19jb3VudD0yIGpvYnNfY291bnQ9MQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TkFNRT1UZXN0LVN1aXRlClRSSUdHRVJTPXB1c2gKSk9CIGlkPXVuaXQtdGVzdHMgcnVuc19vbj1OT05FIHN0ZXBzX2NvdW50PTI=\")\n    printf '%s\\n' \"V09SS0ZMT1dfQVVESVQgbmFtZT0iVGVzdC1TdWl0ZSIgc3RhdHVzPUpPQl9NSVNTSU5HX1JVTlNfT04gdHJpZ2dlcnNfY291bnQ9MSBqb2JzX2NvdW50PTE=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TkFNRT1OaWdodGx5LVJlbGVhc2UKVFJJR0dFUlM9CkpPQiBpZD1yZWxlYXNlIHJ1bnNfb249dWJ1bnR1LWxhdGVzdCBzdGVwc19jb3VudD0x\")\n    printf '%s\\n' \"V09SS0ZMT1dfQVVESVQgbmFtZT0iTmlnaHRseS1SZWxlYXNlIiBzdGF0dXM9TUlTU0lOR19UUklHR0VSUyB0cmlnZ2Vyc19jb3VudD0wIGpvYnNfY291bnQ9MQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TkFNRT1EZXBsb3ktUHJvZApUUklHR0VSUz13b3JrZmxvd19kaXNwYXRjaApKT0IgaWQ9bGludCBydW5zX29uPXVidW50dS1sYXRlc3Qgc3RlcHNfY291bnQ9MgpKT0IgaWQ9ZGVwbG95IHJ1bnNfb249dWJ1bnR1LWxhdGVzdCBzdGVwc19jb3VudD0w\")\n    printf '%s\\n' \"V09SS0ZMT1dfQVVESVQgbmFtZT0iRGVwbG95LVByb2QiIHN0YXR1cz1KT0JfWkVST19TVEVQUyB0cmlnZ2Vyc19jb3VudD0xIGpvYnNfY291bnQ9Mg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c5-e2",
    "chapter": 5,
    "title": "Générateur et évaluateur de matrice de build (strategy: matrix)",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer le produit cartésien des axes d’une matrice de test GitHub Actions et gérer les exclusions.",
    "brief": "<p>La directive <code>strategy: matrix</code> permet d'exécuter un job en parallèle sur de multiples combinaisons d'environnements (OS x Version de langage).<br><br>\nSpécification :<br>\n- Liste d'OS : <code>os=&lt;os1,os2...&gt;</code>.<br>\n- Liste de versions de runtime : <code>version=&lt;v1,v2...&gt;</code>.<br>\n- Exclusions optionnelles (<code>EXCLUDE os=&lt;os&gt; version=&lt;v&gt;</code>).<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nLe script doit calculer la liste des combinaisons valides (produit cartésien moins exclusions), triée par OS puis par version, et afficher :<br>\nChaque combinaison :<br>\n<code>JOB_INSTANCE os={os} version={v} tag=\"{os}-{v}\"</code><br>\nEt la ligne récapitulative :<br>\n<code>MATRIX_TOTAL instances={n} excluded={nb_exclus}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e2) — Générateur et évaluateur de matrice de build (strategy: matrix)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Générer toutes les paires (o, v) via deux boucles imbriquées.",
      "Filtrer les paires présentes dans l’ensemble des exclusions."
    ],
    "examples": [
      {
        "stdin": "MATRIX_DEF os=ubuntu,macos version=3.11,3.12\nEXCLUDE os=macos version=3.11",
        "expected": "JOB_INSTANCE os=ubuntu version=3.11 tag=\"ubuntu-3.11\"\nJOB_INSTANCE os=ubuntu version=3.12 tag=\"ubuntu-3.12\"\nJOB_INSTANCE os=macos version=3.12 tag=\"macos-3.12\"\nMATRIX_TOTAL instances=3 excluded=1",
        "note": "4 combinaisons initiales moins 1 exclusion = 3 instances exécutées."
      }
    ],
    "tests": [
      {
        "label": "Matrice 3x2 complète sans aucune exclusion",
        "stdin": "MATRIX_DEF os=ubuntu,windows,macos version=18,20",
        "expected": "JOB_INSTANCE os=ubuntu version=18 tag=\"ubuntu-18\"\nJOB_INSTANCE os=ubuntu version=20 tag=\"ubuntu-20\"\nJOB_INSTANCE os=windows version=18 tag=\"windows-18\"\nJOB_INSTANCE os=windows version=20 tag=\"windows-20\"\nJOB_INSTANCE os=macos version=18 tag=\"macos-18\"\nJOB_INSTANCE os=macos version=20 tag=\"macos-20\"\nMATRIX_TOTAL instances=6 excluded=0"
      },
      {
        "label": "Multiples exclusions croisées",
        "stdin": "MATRIX_DEF os=ubuntu,windows version=10,11,12\nEXCLUDE os=windows version=10\nEXCLUDE os=windows version=11",
        "expected": "JOB_INSTANCE os=ubuntu version=10 tag=\"ubuntu-10\"\nJOB_INSTANCE os=ubuntu version=11 tag=\"ubuntu-11\"\nJOB_INSTANCE os=ubuntu version=12 tag=\"ubuntu-12\"\nJOB_INSTANCE os=windows version=12 tag=\"windows-12\"\nMATRIX_TOTAL instances=4 excluded=2"
      },
      {
        "label": "Toutes les combinaisons d’un OS exclues",
        "stdin": "MATRIX_DEF os=linux,bsd version=1.0\nEXCLUDE os=bsd version=1.0",
        "expected": "JOB_INSTANCE os=linux version=1.0 tag=\"linux-1.0\"\nMATRIX_TOTAL instances=1 excluded=1"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c5-e2 : Générateur et évaluateur de matrice de build (strategy: matrix)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TUFUUklYX0RFRiBvcz11YnVudHUsbWFjb3MgdmVyc2lvbj0zLjExLDMuMTIKRVhDTFVERSBvcz1tYWNvcyB2ZXJzaW9uPTMuMTE=\")\n    printf '%s\\n' \"Sk9CX0lOU1RBTkNFIG9zPXVidW50dSB2ZXJzaW9uPTMuMTEgdGFnPSJ1YnVudHUtMy4xMSIKSk9CX0lOU1RBTkNFIG9zPXVidW50dSB2ZXJzaW9uPTMuMTIgdGFnPSJ1YnVudHUtMy4xMiIKSk9CX0lOU1RBTkNFIG9zPW1hY29zIHZlcnNpb249My4xMiB0YWc9Im1hY29zLTMuMTIiCk1BVFJJWF9UT1RBTCBpbnN0YW5jZXM9MyBleGNsdWRlZD0x\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUFUUklYX0RFRiBvcz11YnVudHUsd2luZG93cyxtYWNvcyB2ZXJzaW9uPTE4LDIw\")\n    printf '%s\\n' \"Sk9CX0lOU1RBTkNFIG9zPXVidW50dSB2ZXJzaW9uPTE4IHRhZz0idWJ1bnR1LTE4IgpKT0JfSU5TVEFOQ0Ugb3M9dWJ1bnR1IHZlcnNpb249MjAgdGFnPSJ1YnVudHUtMjAiCkpPQl9JTlNUQU5DRSBvcz13aW5kb3dzIHZlcnNpb249MTggdGFnPSJ3aW5kb3dzLTE4IgpKT0JfSU5TVEFOQ0Ugb3M9d2luZG93cyB2ZXJzaW9uPTIwIHRhZz0id2luZG93cy0yMCIKSk9CX0lOU1RBTkNFIG9zPW1hY29zIHZlcnNpb249MTggdGFnPSJtYWNvcy0xOCIKSk9CX0lOU1RBTkNFIG9zPW1hY29zIHZlcnNpb249MjAgdGFnPSJtYWNvcy0yMCIKTUFUUklYX1RPVEFMIGluc3RhbmNlcz02IGV4Y2x1ZGVkPTA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUFUUklYX0RFRiBvcz11YnVudHUsd2luZG93cyB2ZXJzaW9uPTEwLDExLDEyCkVYQ0xVREUgb3M9d2luZG93cyB2ZXJzaW9uPTEwCkVYQ0xVREUgb3M9d2luZG93cyB2ZXJzaW9uPTEx\")\n    printf '%s\\n' \"Sk9CX0lOU1RBTkNFIG9zPXVidW50dSB2ZXJzaW9uPTEwIHRhZz0idWJ1bnR1LTEwIgpKT0JfSU5TVEFOQ0Ugb3M9dWJ1bnR1IHZlcnNpb249MTEgdGFnPSJ1YnVudHUtMTEiCkpPQl9JTlNUQU5DRSBvcz11YnVudHUgdmVyc2lvbj0xMiB0YWc9InVidW50dS0xMiIKSk9CX0lOU1RBTkNFIG9zPXdpbmRvd3MgdmVyc2lvbj0xMiB0YWc9IndpbmRvd3MtMTIiCk1BVFJJWF9UT1RBTCBpbnN0YW5jZXM9NCBleGNsdWRlZD0y\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUFUUklYX0RFRiBvcz1saW51eCxic2QgdmVyc2lvbj0xLjAKRVhDTFVERSBvcz1ic2QgdmVyc2lvbj0xLjA=\")\n    printf '%s\\n' \"Sk9CX0lOU1RBTkNFIG9zPWxpbnV4IHZlcnNpb249MS4wIHRhZz0ibGludXgtMS4wIgpNQVRSSVhfVE9UQUwgaW5zdGFuY2VzPTEgZXhjbHVkZWQ9MQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c5-e3",
    "chapter": 5,
    "title": "Détecteur d’injections de commandes et fuites de secrets dans les Actions",
    "level": "n3",
    "language": "shell",
    "goal": "Auditer les étapes de scripts GitHub Actions pour détecter les failles d’injection de commande et divulgation de secrets.",
    "brief": "<p>Dans GitHub Actions, l’utilisation imprudente d’expressions de contexte dans la directive <code>run:</code> expose le runner à une exécution de code arbitraire (RCE) ou à l'exfiltration de jetons secrets.<br><br>\nVulnérabilités à détecter :<br>\n1. <strong>Fuite de secret (Secret Leak)</strong> : présence de <code>secrets.</code> ou <code>GITHUB_TOKEN</code> à l'intérieur d'une commande <code>echo</code> ou <code>print</code>.<br>\n   -> Verdict : <code>VULN_EXPOSED_SECRET</code>.<br>\n2. <strong>Injection de commande shell</strong> : concaténation directe d'entrées utilisateur non fiables au sein de la ligne de commande <code>run:</code>, telles que <code>${{ github.event.issue.title }}</code>, <code>${{ github.event.issue.body }}</code>, <code>${{ github.event.comment.body }}</code>, <code>${{ github.head_ref }}</code>.<br>\n   (La bonne pratique est de passer par des variables d'environnement <code>env:</code>).<br>\n   -> Verdict : <code>VULN_COMMAND_INJECTION</code>.<br>\n3. Sinon : étape conforme (<code>SECURE</code>).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque étape, afficher :<br>\n<code>ACTION_AUDIT step={id} status={SECURE|VULN_EXPOSED_SECRET|VULN_COMMAND_INJECTION}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e3) — Détecteur d’injections de commandes et fuites de secrets dans les Actions\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifier d’abord si echo affiche un secret.",
      "Vérifier la présence d’expressions de contexte non assainies dans la commande."
    ],
    "examples": [
      {
        "stdin": "STEP_INSPECT id=1 cmd=echo \"Le titre est ${{ github.event.issue.title }}\"\nSTEP_INSPECT id=2 cmd=echo ${{ secrets.AWS_KEY }}",
        "expected": "ACTION_AUDIT step=1 status=VULN_COMMAND_INJECTION\nACTION_AUDIT step=2 status=VULN_EXPOSED_SECRET",
        "note": "Le step 1 permet l’injection via un titre malveillant, le step 2 fait fuiter la clé AWS."
      }
    ],
    "tests": [
      {
        "label": "Commande saine avec variable d’environnement sécurisée",
        "stdin": "STEP_INSPECT id=OK1 cmd=pytest tests/\nSTEP_INSPECT id=OK2 cmd=echo \"Build version $BUILD_NUM\"",
        "expected": "ACTION_AUDIT step=OK1 status=SECURE\nACTION_AUDIT step=OK2 status=SECURE"
      },
      {
        "label": "Injection via corps de commentaire ou head_ref",
        "stdin": "STEP_INSPECT id=INJ1 cmd=git checkout ${{ github.head_ref }}\nSTEP_INSPECT id=INJ2 cmd=python process.py \"${{ github.event.comment.body }}\"",
        "expected": "ACTION_AUDIT step=INJ1 status=VULN_COMMAND_INJECTION\nACTION_AUDIT step=INJ2 status=VULN_COMMAND_INJECTION"
      },
      {
        "label": "Fuite du jeton GITHUB_TOKEN",
        "stdin": "STEP_INSPECT id=L1 cmd=echo \"Token is ${{ secrets.GITHUB_TOKEN }}\"",
        "expected": "ACTION_AUDIT step=L1 status=VULN_EXPOSED_SECRET"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c5-e3 : Détecteur d’injections de commandes et fuites de secrets dans les Actions\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"U1RFUF9JTlNQRUNUIGlkPTEgY21kPWVjaG8gIkxlIHRpdHJlIGVzdCAke3sgZ2l0aHViLmV2ZW50Lmlzc3VlLnRpdGxlIH19IgpTVEVQX0lOU1BFQ1QgaWQ9MiBjbWQ9ZWNobyAke3sgc2VjcmV0cy5BV1NfS0VZIH19\")\n    printf '%s\\n' \"QUNUSU9OX0FVRElUIHN0ZXA9MSBzdGF0dXM9VlVMTl9DT01NQU5EX0lOSkVDVElPTgpBQ1RJT05fQVVESVQgc3RlcD0yIHN0YXR1cz1WVUxOX0VYUE9TRURfU0VDUkVU\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RFUF9JTlNQRUNUIGlkPU9LMSBjbWQ9cHl0ZXN0IHRlc3RzLwpTVEVQX0lOU1BFQ1QgaWQ9T0syIGNtZD1lY2hvICJCdWlsZCB2ZXJzaW9uICRCVUlMRF9OVU0i\")\n    printf '%s\\n' \"QUNUSU9OX0FVRElUIHN0ZXA9T0sxIHN0YXR1cz1TRUNVUkUKQUNUSU9OX0FVRElUIHN0ZXA9T0syIHN0YXR1cz1TRUNVUkU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RFUF9JTlNQRUNUIGlkPUlOSjEgY21kPWdpdCBjaGVja291dCAke3sgZ2l0aHViLmhlYWRfcmVmIH19ClNURVBfSU5TUEVDVCBpZD1JTkoyIGNtZD1weXRob24gcHJvY2Vzcy5weSAiJHt7IGdpdGh1Yi5ldmVudC5jb21tZW50LmJvZHkgfX0i\")\n    printf '%s\\n' \"QUNUSU9OX0FVRElUIHN0ZXA9SU5KMSBzdGF0dXM9VlVMTl9DT01NQU5EX0lOSkVDVElPTgpBQ1RJT05fQVVESVQgc3RlcD1JTkoyIHN0YXR1cz1WVUxOX0NPTU1BTkRfSU5KRUNUSU9O\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RFUF9JTlNQRUNUIGlkPUwxIGNtZD1lY2hvICJUb2tlbiBpcyAke3sgc2VjcmV0cy5HSVRIVUJfVE9LRU4gfX0i\")\n    printf '%s\\n' \"QUNUSU9OX0FVRElUIHN0ZXA9TDEgc3RhdHVzPVZVTE5fRVhQT1NFRF9TRUNSRVQ=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
