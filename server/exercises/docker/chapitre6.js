'use strict';

module.exports = [
  {
    "id": "dk2-c6-e1",
    "chapter": 6,
    "title": "Auditeur de privilèges root et directive USER",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité de sécurité d’une image Docker en s’assurant qu’elle ne s’exécute pas sous le superutilisateur root.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles de sécurité CIS Docker Benchmark :<br>\n- Par défaut dans Docker, l'utilisateur actif est <code>root</code> (UID 0).<br>\n- Si une instruction <code>USER &lt;nom_ou_uid&gt;</code> est rencontrée, elle modifie l'utilisateur actif pour les étapes suivantes et le runtime final.<br>\n- À la fin du fichier :<br>\n  * Si le dernier utilisateur actif est <code>root</code> ou <code>0</code> ou si aucune directive USER n'a été définie :<br>\n    afficher <code>AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)</code><br>\n  * Si le dernier utilisateur actif est non-root (ex: <code>node</code>, <code>appuser</code>, <code>1001</code>) :<br>\n    afficher <code>AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: &lt;USER&gt;)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c6-e1) — Auditeur de privilèges root et directive USER\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Parcourir le fichier et mettre à jour la variable utilisateur_courant à chaque instruction USER.",
      "Ignorer les commentaires débutant par #."
    ],
    "examples": [
      {
        "stdin": "FROM python:3.11-slim\nWORKDIR /app\nCOPY . .\nUSER appuser\nCMD [\"python\", \"main.py\"]",
        "expected": "AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: appuser)",
        "note": "Image conforme exécutée sous utilisateur non-privilégié."
      }
    ],
    "tests": [
      {
        "label": "Création puis passage à un UID numérique",
        "stdin": "FROM alpine:3.18\nRUN adduser -D -u 10001 customuser\nUSER 10001\nCMD [\"sh\"]",
        "expected": "AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: 10001)"
      },
      {
        "label": "Retour explicite à root en fin de fichier",
        "stdin": "FROM node:18\nUSER node\nRUN npm install\nUSER root\nCMD [\"node\", \"app.js\"]",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      },
      {
        "label": "UID 0 explicite",
        "stdin": "FROM debian\nUSER 0",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c6-e1 : Auditeur de privilèges root et directive USER\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"RlJPTSBweXRob246My4xMS1zbGltCldPUktESVIgL2FwcApDT1BZIC4gLgpVU0VSIGFwcHVzZXIKQ01EIFsicHl0aG9uIiwgIm1haW4ucHkiXQ==\")\n    printf '%s\\n' \"QVVESVRfU0VDVVJJVEU6IENPTkZPUk1FIChFeGVjdXRpb24gc291cyB1dGlsaXNhdGV1ciBub24tcHJpdmlsZWdpZTogYXBwdXNlcik=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlJPTSBhbHBpbmU6My4xOApSVU4gYWRkdXNlciAtRCAtdSAxMDAwMSBjdXN0b211c2VyClVTRVIgMTAwMDEKQ01EIFsic2giXQ==\")\n    printf '%s\\n' \"QVVESVRfU0VDVVJJVEU6IENPTkZPUk1FIChFeGVjdXRpb24gc291cyB1dGlsaXNhdGV1ciBub24tcHJpdmlsZWdpZTogMTAwMDEp\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlJPTSBub2RlOjE4ClVTRVIgbm9kZQpSVU4gbnBtIGluc3RhbGwKVVNFUiByb290CkNNRCBbIm5vZGUiLCAiYXBwLmpzIl0=\")\n    printf '%s\\n' \"QVVESVRfU0VDVVJJVEU6IENSSVRJUVVFIChMZSBjb250ZW5ldXIgcydleGVjdXRlIGF2ZWMgbGVzIHByaXZpbGVnZXMgcm9vdCAtIFVJRCAwKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlJPTSBkZWJpYW4KVVNFUiAw\")\n    printf '%s\\n' \"QVVESVRfU0VDVVJJVEU6IENSSVRJUVVFIChMZSBjb250ZW5ldXIgcydleGVjdXRlIGF2ZWMgbGVzIHByaXZpbGVnZXMgcm9vdCAtIFVJRCAwKQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c6-e2",
    "chapter": 6,
    "title": "Calculateur de quotas cgroups (CPU & Mémoire)",
    "level": "n2",
    "language": "shell",
    "goal": "Convertir les paramètres de contrainte de ressources Docker en métriques de contrôle noyau cgroups.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nExemple : <code>MEM=512m SWAP=1g CPUS=1.5</code>.<br>\nUnités mémoire : <code>m</code> (Mo = 1024 Ko) ou <code>g</code> (Go = 1024 Mo).<br>\nRègles cgroups v2 :<br>\n- <code>RAM_MAX_MO</code> : valeur convertie en Mo entiers.<br>\n- Dans Docker, l'option <code>--memory-swap</code> représente la mémoire totale (RAM + SWAP cumulés).<br>\n  Le swap additionnel effectif est donc : <code>SWAP_EFFECTIF_MO = max(0, SWAP_TOTAL_MO - RAM_MAX_MO)</code>.<br>\n- Période CPU CFS standard = <code>100000</code> microsecondes.<br>\n  Le quota alloué par période est : <code>CPU_QUOTA_US = int(CPUS * 100000)</code>.<br>\nAfficher :<br>\n<code>CGROUPS: RAM: &lt;RAM_MAX_MO&gt; Mo | SWAP_ADDITIONNEL: &lt;SWAP_EFFECTIF_MO&gt; Mo | CPU_QUOTA: &lt;CPU_QUOTA_US&gt; us / 100000 us (&lt;CPUS&gt; cœurs)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c6-e2) — Calculateur de quotas cgroups (CPU & Mémoire)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Convertir 1g en 1024 Mo.",
      "Se rappeler que l’argument swap de Docker est la somme de la RAM et du swap."
    ],
    "examples": [
      {
        "stdin": "MEM=512m SWAP=1g CPUS=1.5\nMEM=256m SWAP=256m CPUS=0.5",
        "expected": "CGROUPS: RAM: 512 Mo | SWAP_ADDITIONNEL: 512 Mo | CPU_QUOTA: 150000 us / 100000 us (1.5 cœurs)\nCGROUPS: RAM: 256 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 50000 us / 100000 us (0.5 cœurs)",
        "note": "Si SWAP == MEM, aucun swap supplémentaire n’est autorisé."
      }
    ],
    "tests": [
      {
        "label": "Gros conteneur de base de données",
        "stdin": "MEM=4g SWAP=8g CPUS=4.0",
        "expected": "CGROUPS: RAM: 4096 Mo | SWAP_ADDITIONNEL: 4096 Mo | CPU_QUOTA: 400000 us / 100000 us (4.0 cœurs)"
      },
      {
        "label": "Micro conteneur d’arrière-plan",
        "stdin": "MEM=128m SWAP=256m CPUS=0.25",
        "expected": "CGROUPS: RAM: 128 Mo | SWAP_ADDITIONNEL: 128 Mo | CPU_QUOTA: 25000 us / 100000 us (0.25 cœurs)"
      },
      {
        "label": "Conteneur CPU pur sans swap",
        "stdin": "MEM=1g SWAP=1g CPUS=2.0",
        "expected": "CGROUPS: RAM: 1024 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 200000 us / 100000 us (2.0 cœurs)"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c6-e2 : Calculateur de quotas cgroups (CPU & Mémoire)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TUVNPTUxMm0gU1dBUD0xZyBDUFVTPTEuNQpNRU09MjU2bSBTV0FQPTI1Nm0gQ1BVUz0wLjU=\")\n    printf '%s\\n' \"Q0dST1VQUzogUkFNOiA1MTIgTW8gfCBTV0FQX0FERElUSU9OTkVMOiA1MTIgTW8gfCBDUFVfUVVPVEE6IDE1MDAwMCB1cyAvIDEwMDAwMCB1cyAoMS41IGPFk3VycykKQ0dST1VQUzogUkFNOiAyNTYgTW8gfCBTV0FQX0FERElUSU9OTkVMOiAwIE1vIHwgQ1BVX1FVT1RBOiA1MDAwMCB1cyAvIDEwMDAwMCB1cyAoMC41IGPFk3Vycyk=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUVNPTRnIFNXQVA9OGcgQ1BVUz00LjA=\")\n    printf '%s\\n' \"Q0dST1VQUzogUkFNOiA0MDk2IE1vIHwgU1dBUF9BRERJVElPTk5FTDogNDA5NiBNbyB8IENQVV9RVU9UQTogNDAwMDAwIHVzIC8gMTAwMDAwIHVzICg0LjAgY8WTdXJzKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUVNPTEyOG0gU1dBUD0yNTZtIENQVVM9MC4yNQ==\")\n    printf '%s\\n' \"Q0dST1VQUzogUkFNOiAxMjggTW8gfCBTV0FQX0FERElUSU9OTkVMOiAxMjggTW8gfCBDUFVfUVVPVEE6IDI1MDAwIHVzIC8gMTAwMDAwIHVzICgwLjI1IGPFk3Vycyk=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUVNPTFnIFNXQVA9MWcgQ1BVUz0yLjA=\")\n    printf '%s\\n' \"Q0dST1VQUzogUkFNOiAxMDI0IE1vIHwgU1dBUF9BRERJVElPTk5FTDogMCBNbyB8IENQVV9RVU9UQTogMjAwMDAwIHVzIC8gMTAwMDAwIHVzICgyLjAgY8WTdXJzKQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c6-e3",
    "chapter": 6,
    "title": "Simulateur de politique de redémarrage (Restart Policy)",
    "level": "n3",
    "language": "shell",
    "goal": "Déterminer si le démon Docker redémarre ou non un conteneur arrêté selon sa politique et son code de sortie.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles du démon Docker :<br>\n1. Si <code>MANUEL=OUI</code> (ex: <code>docker stop</code> déclenché par l'admin) :<br>\n   - <code>DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)</code><br>\n2. Sinon :<br>\n   - <code>POLITIQUE=no</code> : <code>DECISION: ARRET_DEFINITIF (Politique \"no\")</code><br>\n   - <code>POLITIQUE=always</code> ou <code>POLITIQUE=unless-stopped</code> :<br>\n     <code>DECISION: REDEMARRER (Relance automatique du conteneur)</code><br>\n   - <code>POLITIQUE=on-failure</code> :<br>\n     * Si <code>EXIT_CODE == 0</code> : <code>DECISION: ARRET_DEFINITIF (Code sortie normal 0)</code><br>\n     * Si <code>EXIT_CODE != 0</code> : <code>DECISION: REDEMARRER (Echec detecte: code &lt;code&gt;)</code><br>\nAfficher :<br>\n<code>EVENEMENT: &lt;entree&gt; -&gt; &lt;DECISION&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c6-e3) — Simulateur de politique de redémarrage (Restart Policy)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Un arrêt volontaire manuel bloque tout redémarrage automatique.",
      "on-failure ne relance le conteneur que si le code de sortie est non nul."
    ],
    "examples": [
      {
        "stdin": "POLITIQUE=always EXIT_CODE=1 MANUEL=NON\nPOLITIQUE=always EXIT_CODE=0 MANUEL=OUI\nPOLITIQUE=on-failure EXIT_CODE=0 MANUEL=NON\nPOLITIQUE=on-failure EXIT_CODE=137 MANUEL=NON",
        "expected": "EVENEMENT: POLITIQUE=always EXIT_CODE=1 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=always EXIT_CODE=0 MANUEL=OUI -> DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)\nEVENEMENT: POLITIQUE=on-failure EXIT_CODE=0 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Code sortie normal 0)\nEVENEMENT: POLITIQUE=on-failure EXIT_CODE=137 MANUEL=NON -> DECISION: REDEMARRER (Echec detecte: code 137)",
        "note": "Simulation exacte des 4 comportements clés de redémarrage."
      }
    ],
    "tests": [
      {
        "label": "Politique no par défaut",
        "stdin": "POLITIQUE=no EXIT_CODE=1 MANUEL=NON\nPOLITIQUE=no EXIT_CODE=0 MANUEL=NON",
        "expected": "EVENEMENT: POLITIQUE=no EXIT_CODE=1 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Politique \"no\")\nEVENEMENT: POLITIQUE=no EXIT_CODE=0 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Politique \"no\")"
      },
      {
        "label": "Politique unless-stopped",
        "stdin": "POLITIQUE=unless-stopped EXIT_CODE=1 MANUEL=NON\nPOLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=OUI",
        "expected": "EVENEMENT: POLITIQUE=unless-stopped EXIT_CODE=1 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=OUI -> DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)"
      },
      {
        "label": "Crash critique OOM-Killed (code 137)",
        "stdin": "POLITIQUE=always EXIT_CODE=137 MANUEL=NON",
        "expected": "EVENEMENT: POLITIQUE=always EXIT_CODE=137 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c6-e3 : Simulateur de politique de redémarrage (Restart Policy)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UE9MSVRJUVVFPWFsd2F5cyBFWElUX0NPREU9MSBNQU5VRUw9Tk9OClBPTElUSVFVRT1hbHdheXMgRVhJVF9DT0RFPTAgTUFOVUVMPU9VSQpQT0xJVElRVUU9b24tZmFpbHVyZSBFWElUX0NPREU9MCBNQU5VRUw9Tk9OClBPTElUSVFVRT1vbi1mYWlsdXJlIEVYSVRfQ09ERT0xMzcgTUFOVUVMPU5PTg==\")\n    printf '%s\\n' \"RVZFTkVNRU5UOiBQT0xJVElRVUU9YWx3YXlzIEVYSVRfQ09ERT0xIE1BTlVFTD1OT04gLT4gREVDSVNJT046IFJFREVNQVJSRVIgKFJlbGFuY2UgYXV0b21hdGlxdWUgZHUgY29udGVuZXVyKQpFVkVORU1FTlQ6IFBPTElUSVFVRT1hbHdheXMgRVhJVF9DT0RFPTAgTUFOVUVMPU9VSSAtPiBERUNJU0lPTjogQVJSRVRfREVGSU5JVElGIChBcnJldCB2b2xvbnRhaXJlIHBhciBsJ2FkbWluaXN0cmF0ZXVyKQpFVkVORU1FTlQ6IFBPTElUSVFVRT1vbi1mYWlsdXJlIEVYSVRfQ09ERT0wIE1BTlVFTD1OT04gLT4gREVDSVNJT046IEFSUkVUX0RFRklOSVRJRiAoQ29kZSBzb3J0aWUgbm9ybWFsIDApCkVWRU5FTUVOVDogUE9MSVRJUVVFPW9uLWZhaWx1cmUgRVhJVF9DT0RFPTEzNyBNQU5VRUw9Tk9OIC0+IERFQ0lTSU9OOiBSRURFTUFSUkVSIChFY2hlYyBkZXRlY3RlOiBjb2RlIDEzNyk=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UE9MSVRJUVVFPW5vIEVYSVRfQ09ERT0xIE1BTlVFTD1OT04KUE9MSVRJUVVFPW5vIEVYSVRfQ09ERT0wIE1BTlVFTD1OT04=\")\n    printf '%s\\n' \"RVZFTkVNRU5UOiBQT0xJVElRVUU9bm8gRVhJVF9DT0RFPTEgTUFOVUVMPU5PTiAtPiBERUNJU0lPTjogQVJSRVRfREVGSU5JVElGIChQb2xpdGlxdWUgIm5vIikKRVZFTkVNRU5UOiBQT0xJVElRVUU9bm8gRVhJVF9DT0RFPTAgTUFOVUVMPU5PTiAtPiBERUNJU0lPTjogQVJSRVRfREVGSU5JVElGIChQb2xpdGlxdWUgIm5vIik=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UE9MSVRJUVVFPXVubGVzcy1zdG9wcGVkIEVYSVRfQ09ERT0xIE1BTlVFTD1OT04KUE9MSVRJUVVFPXVubGVzcy1zdG9wcGVkIEVYSVRfQ09ERT0wIE1BTlVFTD1PVUk=\")\n    printf '%s\\n' \"RVZFTkVNRU5UOiBQT0xJVElRVUU9dW5sZXNzLXN0b3BwZWQgRVhJVF9DT0RFPTEgTUFOVUVMPU5PTiAtPiBERUNJU0lPTjogUkVERU1BUlJFUiAoUmVsYW5jZSBhdXRvbWF0aXF1ZSBkdSBjb250ZW5ldXIpCkVWRU5FTUVOVDogUE9MSVRJUVVFPXVubGVzcy1zdG9wcGVkIEVYSVRfQ09ERT0wIE1BTlVFTD1PVUkgLT4gREVDSVNJT046IEFSUkVUX0RFRklOSVRJRiAoQXJyZXQgdm9sb250YWlyZSBwYXIgbCdhZG1pbmlzdHJhdGV1cik=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UE9MSVRJUVVFPWFsd2F5cyBFWElUX0NPREU9MTM3IE1BTlVFTD1OT04=\")\n    printf '%s\\n' \"RVZFTkVNRU5UOiBQT0xJVElRVUU9YWx3YXlzIEVYSVRfQ09ERT0xMzcgTUFOVUVMPU5PTiAtPiBERUNJU0lPTjogUkVERU1BUlJFUiAoUmVsYW5jZSBhdXRvbWF0aXF1ZSBkdSBjb250ZW5ldXIp\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
