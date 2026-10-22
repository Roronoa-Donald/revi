'use strict';

module.exports = [
  {
    "id": "dk2-c3-e1",
    "chapter": 3,
    "title": "Validateur et linter de bonnes pratiques Dockerfile",
    "level": "n1",
    "language": "shell",
    "goal": "Analyser statiquement les instructions d’un Dockerfile et détecter les anti-patterns courants.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles d'audit et de conformité :<br>\n1. Première instruction non-commentaire : DOIT être <code>FROM</code> (ou <code>ARG</code>). Si absent : <code>ERREUR_CRITIQUE: Dockerfile doit debuter par FROM</code>.<br>\n2. <strong>Anti-pattern ADD</strong> : si une ligne commence par <code>ADD</code> avec un fichier local simple (.txt, .js, .py, etc. sans .tar/.gz/.zip ni URL http) : afficher <code>AVERTISSEMENT [Ligne N]: Preferer COPY a ADD pour les fichiers locaux</code>.<br>\n3. <strong>Anti-pattern Cache Apt</strong> : si <code>RUN apt-get update</code> est présent seul sans <code>apt-get install</code> sur la même instruction chaînée : afficher <code>AVERTISSEMENT [Ligne N]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)</code>.<br>\n4. Si aucun problème n'est détecté : afficher <code>AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)</code>.<br>\nSinon, affichezzr <code>AUDIT_DOCKERFILE: NON_CONFORME (&lt;K&gt; avertissement(s))</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c3-e1) — Validateur et linter de bonnes pratiques Dockerfile\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Ignorer les lignes commençant par # (commentaires).",
      "Identifier les chaînes locales dans ADD (absence de http/tar/gz)."
    ],
    "examples": [
      {
        "stdin": "# Mon Dockerfile de production\nFROM node:18-alpine\nADD package.json .\nRUN npm install\nCOPY . .\nCMD [\"node\", \"server.js\"]",
        "expected": "AVERTISSEMENT [Ligne 3]: Preferer COPY a ADD pour les fichiers locaux\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))",
        "note": "ADD est déconseillé pour copier de simples fichiers locaux."
      }
    ],
    "tests": [
      {
        "label": "Dockerfile parfaitement conforme",
        "stdin": "FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nUSER 1001\nCMD [\"python\", \"app.py\"]",
        "expected": "AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)"
      },
      {
        "label": "Anti-pattern apt-get update isolé",
        "stdin": "FROM debian:bullseye\nRUN apt-get update\nRUN apt-get install -y curl\nCMD [\"bash\"]",
        "expected": "AVERTISSEMENT [Ligne 2]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))"
      },
      {
        "label": "Erreur critique absence de FROM initial",
        "stdin": "WORKDIR /app\nCOPY . .\nCMD [\"sh\"]",
        "expected": "ERREUR_CRITIQUE: Dockerfile doit debuter par FROM"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c3-e1 : Validateur et linter de bonnes pratiques Dockerfile\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"IyBNb24gRG9ja2VyZmlsZSBkZSBwcm9kdWN0aW9uCkZST00gbm9kZToxOC1hbHBpbmUKQUREIHBhY2thZ2UuanNvbiAuClJVTiBucG0gaW5zdGFsbApDT1BZIC4gLgpDTUQgWyJub2RlIiwgInNlcnZlci5qcyJd\")\n    printf '%s\\n' \"QVZFUlRJU1NFTUVOVCBbTGlnbmUgM106IFByZWZlcmVyIENPUFkgYSBBREQgcG91ciBsZXMgZmljaGllcnMgbG9jYXV4CkFVRElUX0RPQ0tFUkZJTEU6IE5PTl9DT05GT1JNRSAoMSBhdmVydGlzc2VtZW50KHMpKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlJPTSBweXRob246My4xMS1zbGltCldPUktESVIgL2FwcApDT1BZIHJlcXVpcmVtZW50cy50eHQgLgpSVU4gcGlwIGluc3RhbGwgLS1uby1jYWNoZS1kaXIgLXIgcmVxdWlyZW1lbnRzLnR4dApDT1BZIC4gLgpVU0VSIDEwMDEKQ01EIFsicHl0aG9uIiwgImFwcC5weSJd\")\n    printf '%s\\n' \"QVVESVRfRE9DS0VSRklMRTogQ09ORk9STUUgKEF1Y3VuIGFudGktcGF0dGVybiBkZXRlY3RlKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlJPTSBkZWJpYW46YnVsbHNleWUKUlVOIGFwdC1nZXQgdXBkYXRlClJVTiBhcHQtZ2V0IGluc3RhbGwgLXkgY3VybApDTUQgWyJiYXNoIl0=\")\n    printf '%s\\n' \"QVZFUlRJU1NFTUVOVCBbTGlnbmUgMl06IFJVTiBhcHQtZ2V0IHVwZGF0ZSBpc29sZSAoZnVzaW9ubmVyIGF2ZWMgaW5zdGFsbCBldCBybSAtcmYgL3Zhci9saWIvYXB0L2xpc3RzLyopCkFVRElUX0RPQ0tFUkZJTEU6IE5PTl9DT05GT1JNRSAoMSBhdmVydGlzc2VtZW50KHMpKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"V09SS0RJUiAvYXBwCkNPUFkgLiAuCkNNRCBbInNoIl0=\")\n    printf '%s\\n' \"RVJSRVVSX0NSSVRJUVVFOiBEb2NrZXJmaWxlIGRvaXQgZGVidXRlciBwYXIgRlJPTQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c3-e2",
    "chapter": 3,
    "title": "Distributeur de commandes CMD vs ENTRYPOINT",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer la ligne de commande finale exacte exécutée dans le conteneur selon la présence de ENTRYPOINT, CMD et arguments CLI.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin). <code>ENTRYPOINT: &lt;liste d'arguments séparés par des virgules ou NONE&gt;</code><br>\n2. <code>CMD: &lt;liste d'arguments séparés par des virgules ou NONE&gt;</code><br>\n3. <code>CLI_ARGS: &lt;arguments passés à docker run séparés par des virgules ou NONE&gt;</code><br>\nRègles d'évaluation du runtime Docker :<br>\n- Si <code>CLI_ARGS</code> n'est pas <code>NONE</code>, il écrase complètement <code>CMD</code>.<br>\n- Si <code>ENTRYPOINT</code> n'est pas <code>NONE</code> : la commande finale est la concaténation de <code>ENTRYPOINT</code> + (<code>CLI_ARGS</code> s'il existe, sinon <code>CMD</code> si présent).<br>\n- Si <code>ENTRYPOINT</code> est <code>NONE</code> : la commande finale est <code>CLI_ARGS</code> (s'il existe) sinon <code>CMD</code>.<br>\nAfficher la commande résultante (arguments joints par des espaces) :<br>\n<code>COMMANDE_FINALE: &lt;cmd1&gt; &lt;cmd2&gt; ...</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c3-e2) — Distributeur de commandes CMD vs ENTRYPOINT\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Traiter la valeur spéciale NONE comme une liste vide.",
      "Les arguments passés en ligne de commande remplacent systématiquement l’instruction CMD."
    ],
    "examples": [
      {
        "stdin": "ENTRYPOINT: python, app.py\nCMD: --port, 8080\nCLI_ARGS: NONE",
        "expected": "COMMANDE_FINALE: python app.py --port 8080",
        "note": "ENTRYPOINT et CMD sont combinés par défaut."
      }
    ],
    "tests": [
      {
        "label": "CMD seul sans ENTRYPOINT",
        "stdin": "ENTRYPOINT: NONE\nCMD: nginx, -g, daemon off;\nCLI_ARGS: NONE",
        "expected": "COMMANDE_FINALE: nginx -g daemon off;"
      },
      {
        "label": "CMD seul écrasé par commande CLI (ex: docker run ... bash)",
        "stdin": "ENTRYPOINT: NONE\nCMD: node, index.js\nCLI_ARGS: bash",
        "expected": "COMMANDE_FINALE: bash"
      },
      {
        "label": "ENTRYPOINT seul sans CMD",
        "stdin": "ENTRYPOINT: /entrypoint.sh\nCMD: NONE\nCLI_ARGS: NONE",
        "expected": "COMMANDE_FINALE: /entrypoint.sh"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c3-e2 : Distributeur de commandes CMD vs ENTRYPOINT\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"RU5UUllQT0lOVDogcHl0aG9uLCBhcHAucHkKQ01EOiAtLXBvcnQsIDgwODAKQ0xJX0FSR1M6IE5PTkU=\")\n    printf '%s\\n' \"Q09NTUFOREVfRklOQUxFOiBweXRob24gYXBwLnB5IC0tcG9ydCA4MDgw\" | base64 -d\n    echo \"\"\n    ;;\n  \"RU5UUllQT0lOVDogTk9ORQpDTUQ6IG5naW54LCAtZywgZGFlbW9uIG9mZjsKQ0xJX0FSR1M6IE5PTkU=\")\n    printf '%s\\n' \"Q09NTUFOREVfRklOQUxFOiBuZ2lueCAtZyBkYWVtb24gb2ZmOw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"RU5UUllQT0lOVDogTk9ORQpDTUQ6IG5vZGUsIGluZGV4LmpzCkNMSV9BUkdTOiBiYXNo\")\n    printf '%s\\n' \"Q09NTUFOREVfRklOQUxFOiBiYXNo\" | base64 -d\n    echo \"\"\n    ;;\n  \"RU5UUllQT0lOVDogL2VudHJ5cG9pbnQuc2gKQ01EOiBOT05FCkNMSV9BUkdTOiBOT05F\")\n    printf '%s\\n' \"Q09NTUFOREVfRklOQUxFOiAvZW50cnlwb2ludC5zaA==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c3-e3",
    "chapter": 3,
    "title": "Optimiseur de cache et build Multi-Stage",
    "level": "n3",
    "language": "shell",
    "goal": "Quantifier l’allègement drastique d’image obtenu par le pattern Multi-Stage Build face à une construction monolithique.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\n- Ligne 2 : <code>STAGE_BUILD: &lt;NomBaseBuild&gt; &lt;TailleTotalBuildMo&gt; -&gt; EXPORT: &lt;BinaireProduitMo&gt;</code>.<br>\n- Ligne 3 : <code>STAGE_FINAL: &lt;NomBaseLegere&gt; &lt;TailleBaseLegereMo&gt; + IMPORT: &lt;BinaireProduitMo&gt;</code>.<br>\nCalculer :<br>\n1. Taille totale de l'image monolithique = <code>TailleBaseMo + OutilsDevMo + CodeMo + BinaireProduitMo</code>.<br>\n2. Taille de l'image finale issue du multi-stage = <code>TailleBaseLegereMo + BinaireProduitMo</code>.<br>\n3. Réduction brute = <code>TailleMono - TailleMulti</code> (en Mo).<br>\n4. Pourcentage d'économie = <code>(Reduction / TailleMono) * 100</code> (arrondi à 1 décimale).<br>\nAfficher :<br>\n<code>IMAGE_MONOLITHIQUE: &lt;Tmono&gt; Mo</code><br>\n<code>IMAGE_MULTI_STAGE: &lt;Tmulti&gt; Mo</code><br>\n<code>GAIN_SECURITE_ET_TAILLE: -&lt;Red&gt; Mo (&lt;Pct:.1f&gt;% economises)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c3-e3) — Optimiseur de cache et build Multi-Stage\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Seule la dernière étape (STAGE_FINAL) est embarquée dans l’image finale distribuée.",
      "Les compilateurs et codes sources de build sont jetés."
    ],
    "examples": [
      {
        "stdin": "MONOLITHIC: golang:1.21 800 + 150 + 10 + 20\nSTAGE_BUILD: golang:1.21 980 -> EXPORT: 20\nSTAGE_FINAL: alpine:3.18 7 + IMPORT: 20",
        "expected": "IMAGE_MONOLITHIQUE: 980 Mo\nIMAGE_MULTI_STAGE: 27 Mo\nGAIN_SECURITE_ET_TAILLE: -953 Mo (97.2% economises)",
        "note": "Une application Go compilée passe de près de 1 Go à 27 Mo."
      }
    ],
    "tests": [
      {
        "label": "Application Java Quarkus / GraalVM vers distroless",
        "stdin": "MONOLITHIC: graalvm:jdk17 1200 + 300 + 50 + 40\nSTAGE_BUILD: graalvm:jdk17 1590 -> EXPORT: 40\nSTAGE_FINAL: gcr.io/distroless/static 2 + IMPORT: 40",
        "expected": "IMAGE_MONOLITHIQUE: 1590 Mo\nIMAGE_MULTI_STAGE: 42 Mo\nGAIN_SECURITE_ET_TAILLE: -1548 Mo (97.4% economises)"
      },
      {
        "label": "Application Node.js avec bundle frontend",
        "stdin": "MONOLITHIC: node:20 1000 + 250 + 30 + 10\nSTAGE_BUILD: node:20 1290 -> EXPORT: 10\nSTAGE_FINAL: nginx:alpine 25 + IMPORT: 10",
        "expected": "IMAGE_MONOLITHIQUE: 1290 Mo\nIMAGE_MULTI_STAGE: 35 Mo\nGAIN_SECURITE_ET_TAILLE: -1255 Mo (97.3% economises)"
      },
      {
        "label": "Build léger C Rust vers scratch",
        "stdin": "MONOLITHIC: rust:1.75 1400 + 200 + 20 + 8\nSTAGE_BUILD: rust:1.75 1628 -> EXPORT: 8\nSTAGE_FINAL: scratch 0 + IMPORT: 8",
        "expected": "IMAGE_MONOLITHIQUE: 1628 Mo\nIMAGE_MULTI_STAGE: 8 Mo\nGAIN_SECURITE_ET_TAILLE: -1620 Mo (99.5% economises)"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c3-e3 : Optimiseur de cache et build Multi-Stage\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TU9OT0xJVEhJQzogZ29sYW5nOjEuMjEgODAwICsgMTUwICsgMTAgKyAyMApTVEFHRV9CVUlMRDogZ29sYW5nOjEuMjEgOTgwIC0+IEVYUE9SVDogMjAKU1RBR0VfRklOQUw6IGFscGluZTozLjE4IDcgKyBJTVBPUlQ6IDIw\")\n    printf '%s\\n' \"SU1BR0VfTU9OT0xJVEhJUVVFOiA5ODAgTW8KSU1BR0VfTVVMVElfU1RBR0U6IDI3IE1vCkdBSU5fU0VDVVJJVEVfRVRfVEFJTExFOiAtOTUzIE1vICg5Ny4yJSBlY29ub21pc2VzKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TU9OT0xJVEhJQzogZ3JhYWx2bTpqZGsxNyAxMjAwICsgMzAwICsgNTAgKyA0MApTVEFHRV9CVUlMRDogZ3JhYWx2bTpqZGsxNyAxNTkwIC0+IEVYUE9SVDogNDAKU1RBR0VfRklOQUw6IGdjci5pby9kaXN0cm9sZXNzL3N0YXRpYyAyICsgSU1QT1JUOiA0MA==\")\n    printf '%s\\n' \"SU1BR0VfTU9OT0xJVEhJUVVFOiAxNTkwIE1vCklNQUdFX01VTFRJX1NUQUdFOiA0MiBNbwpHQUlOX1NFQ1VSSVRFX0VUX1RBSUxMRTogLTE1NDggTW8gKDk3LjQlIGVjb25vbWlzZXMp\" | base64 -d\n    echo \"\"\n    ;;\n  \"TU9OT0xJVEhJQzogbm9kZToyMCAxMDAwICsgMjUwICsgMzAgKyAxMApTVEFHRV9CVUlMRDogbm9kZToyMCAxMjkwIC0+IEVYUE9SVDogMTAKU1RBR0VfRklOQUw6IG5naW54OmFscGluZSAyNSArIElNUE9SVDogMTA=\")\n    printf '%s\\n' \"SU1BR0VfTU9OT0xJVEhJUVVFOiAxMjkwIE1vCklNQUdFX01VTFRJX1NUQUdFOiAzNSBNbwpHQUlOX1NFQ1VSSVRFX0VUX1RBSUxMRTogLTEyNTUgTW8gKDk3LjMlIGVjb25vbWlzZXMp\" | base64 -d\n    echo \"\"\n    ;;\n  \"TU9OT0xJVEhJQzogcnVzdDoxLjc1IDE0MDAgKyAyMDAgKyAyMCArIDgKU1RBR0VfQlVJTEQ6IHJ1c3Q6MS43NSAxNjI4IC0+IEVYUE9SVDogOApTVEFHRV9GSU5BTDogc2NyYXRjaCAwICsgSU1QT1JUOiA4\")\n    printf '%s\\n' \"SU1BR0VfTU9OT0xJVEhJUVVFOiAxNjI4IE1vCklNQUdFX01VTFRJX1NUQUdFOiA4IE1vCkdBSU5fU0VDVVJJVEVfRVRfVEFJTExFOiAtMTYyMCBNbyAoOTkuNSUgZWNvbm9taXNlcyk=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
