'use strict';

module.exports = [
  {
    "id": "dk2-c3-e1",
    "chapter": 3,
    "title": "Validateur et linter de bonnes pratiques Dockerfile",
    "level": "n1",
    "language": "shell",
    "goal": "Analyser statiquement les instructions d’un Dockerfile et détecter les anti-patterns courants.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nL'audit est textuel et limité aux instructions en forme texte ; il ne valide pas toute la syntaxe Dockerfile ou shell. Une instruction peut se poursuivre sur plusieurs lignes avec <code>\\</code> ; son numéro est celui de sa première ligne.<br>\nRègles d'audit et de conformité :<br>\n1. Première instruction non vide et non-commentaire : DOIT être <code>FROM</code> (ou <code>ARG</code>), et une instruction <code>FROM</code> doit être présente. Sinon : <code>ERREUR_CRITIQUE: Dockerfile doit debuter par FROM</code>.<br>\n2. <strong>Anti-pattern ADD</strong> : si une ligne commence par <code>ADD</code> avec un fichier local simple (.txt, .js, .py, etc. sans .tar/.gz/.zip ni URL http) : afficher <code>AVERTISSEMENT [Ligne N]: Preferer COPY a ADD pour les fichiers locaux</code>.<br>\n3. <strong>Anti-pattern Cache Apt</strong> : si <code>RUN apt-get update</code> est présent seul sans <code>apt-get install</code> sur la même instruction chaînée : afficher <code>AVERTISSEMENT [Ligne N]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)</code>.<br>\n4. Si aucun problème n'est détecté : afficher <code>AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)</code>.<br>\nSinon, afficher <code>AUDIT_DOCKERFILE: NON_CONFORME (&lt;K&gt; avertissement(s))</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c3-e1) — Validateur et linter de bonnes pratiques Dockerfile\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Ignorer les lignes commençant par # (commentaires).",
      "Identifier les chaînes locales dans ADD (absence de http/tar/gz).",
      "Pour chaque ligne : numéroter, ignorer les commentaires, vérifier le FROM initial, puis détecter les anti-patterns ADD local, apt-get isolé et root final dans cet ordre."
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
        "label": "ARG initial et commande apt chaînée sur plusieurs lignes",
        "stdin": "# base\nARG VERSION=stable\nFROM debian:bookworm\nRUN apt-get update && \\\n    apt-get install -y curl\nADD bundle.tar.gz /opt/",
        "expected": "AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)"
      },
      {
        "label": "Plusieurs avertissements et archive distante",
        "stdin": "FROM alpine\nADD config.ini /etc/\nRUN apt-get update\nADD https://example.org/a.zip /tmp/\nADD script.py /opt/",
        "expected": "AVERTISSEMENT [Ligne 2]: Preferer COPY a ADD pour les fichiers locaux\nAVERTISSEMENT [Ligne 3]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)\nAVERTISSEMENT [Ligne 5]: Preferer COPY a ADD pour les fichiers locaux\nAUDIT_DOCKERFILE: NON_CONFORME (3 avertissement(s))"
      },
      {
        "label": "Erreur critique absence de FROM initial",
        "stdin": "WORKDIR /app\nCOPY . .\nCMD [\"sh\"]",
        "expected": "ERREUR_CRITIQUE: Dockerfile doit debuter par FROM"
      },
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
        "label": "ARG sans FROM",
        "stdin": "ARG VERSION=1",
        "expected": "ERREUR_CRITIQUE: Dockerfile doit debuter par FROM"
      },
      {
        "label": "ADD local sans commande apt",
        "stdin": "FROM alpine\nADD config.txt /opt/",
        "expected": "AVERTISSEMENT [Ligne 2]: Preferer COPY a ADD pour les fichiers locaux\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nfunction inspect(instruction, number,    fields, count, command, body, index_field, local_file) {\n  instruction = trim(instruction)\n  count = split(instruction, fields, /[[:space:]]+/)\n  command = toupper(fields[1])\n  if (!first_seen) {\n    first_seen = 1\n    if (command != \"FROM\" && command != \"ARG\") invalid = 1\n  }\n  if (command == \"FROM\") from_seen = 1\n  if (command == \"ADD\") {\n    local_file = 0\n    for (index_field = 2; index_field < count; index_field++) {\n      if (fields[index_field] ~ /^--/) continue\n      if (fields[index_field] !~ /^https?:\\/\\// && tolower(fields[index_field]) !~ /\\.(tar|gz|zip)$/) local_file = 1\n    }\n    if (local_file) warnings[++warning_count] = sprintf(\"AVERTISSEMENT [Ligne %d]: Preferer COPY a ADD pour les fichiers locaux\", number)\n  }\n  if (command == \"RUN\") {\n    body = substr(instruction, length(fields[1]) + 1)\n    if (body ~ /apt-get[[:space:]]+update/ && body !~ /apt-get[[:space:]]+install/)\n      warnings[++warning_count] = sprintf(\"AVERTISSEMENT [Ligne %d]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)\", number)\n  }\n}\n{\n  line = trim($0)\n  if (line == \"\" || line ~ /^#/) next\n  if (pending == \"\") start = NR\n  continued = sub(/\\\\[[:space:]]*$/, \"\", line)\n  pending = pending line \" \"\n  if (!continued) { inspect(pending, start); pending = \"\" }\n}\nEND {\n  if (pending != \"\") inspect(pending, start)\n  if (!first_seen || !from_seen || invalid) print \"ERREUR_CRITIQUE: Dockerfile doit debuter par FROM\"\n  else if (!warning_count) print \"AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)\"\n  else {\n    for (index_warning = 1; index_warning <= warning_count; index_warning++) print warnings[index_warning]\n    printf \"AUDIT_DOCKERFILE: NON_CONFORME (%d avertissement(s))\\n\", warning_count\n  }\n}\n'\n",
    "takeaway": "Un Dockerfile optimisé épingle les versions, combine les couches apt et nettoie le cache pour alléger et sécuriser l image."
  },
  {
    "id": "dk2-c3-e2",
    "chapter": 3,
    "title": "Distributeur de commandes CMD vs ENTRYPOINT",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer la ligne de commande finale exacte exécutée dans le conteneur selon la présence de ENTRYPOINT, CMD et arguments CLI.",
    "brief": "<p>Le script Bash lit trois lignes sur l’entrée standard (stdin) :<br>\n1. <code>ENTRYPOINT: &lt;liste d'arguments séparés par des virgules ou NONE&gt;</code><br>\n2. <code>CMD: &lt;liste d'arguments séparés par des virgules ou NONE&gt;</code><br>\n3. <code>CLI_ARGS: &lt;arguments passés à docker run séparés par des virgules ou NONE&gt;</code><br>\nRègles d'évaluation du runtime Docker :<br>\n- Si <code>CLI_ARGS</code> n'est pas <code>NONE</code>, il écrase complètement <code>CMD</code>.<br>\n- Si <code>ENTRYPOINT</code> n'est pas <code>NONE</code> : la commande finale est la concaténation de <code>ENTRYPOINT</code> + (<code>CLI_ARGS</code> s'il existe, sinon <code>CMD</code> si présent).<br>\n- Si <code>ENTRYPOINT</code> est <code>NONE</code> : la commande finale est <code>CLI_ARGS</code> (s'il existe) sinon <code>CMD</code>.<br>\nCe modèle représente les listes de type exec, pas la forme shell de Dockerfile. Si les trois listes valent <code>NONE</code>, afficher <code>COMMANDE_FINALE:</code> sans commande ; ce résultat ne garantit pas qu'un conteneur puisse démarrer.<br>\nAfficher la commande résultante (arguments joints par des espaces) :<br>\n<code>COMMANDE_FINALE: &lt;cmd1&gt; &lt;cmd2&gt; ...</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c3-e2) — Distributeur de commandes CMD vs ENTRYPOINT\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Traiter la valeur spéciale NONE comme une liste vide.",
      "Les arguments passés en ligne de commande remplacent systématiquement l’instruction CMD.",
      "Pour chaque bloc : lire les trois listes, remplacer CMD par CLI_ARGS s il existe, concaténer ENTRYPOINT et le CMD effectif, puis joindre les arguments par des espaces."
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
        "label": "Arguments CLI ajoutés à ENTRYPOINT à la place de CMD",
        "stdin": "ENTRYPOINT: /entry, --verbose\nCMD: default\nCLI_ARGS: --help",
        "expected": "COMMANDE_FINALE: /entry --verbose --help"
      },
      {
        "label": "Trois listes vides",
        "stdin": "ENTRYPOINT: NONE\nCMD: NONE\nCLI_ARGS: NONE",
        "expected": "COMMANDE_FINALE:"
      },
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
    "solution": "#!/usr/bin/env bash\nawk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nfunction arguments(value,    count, parts, index_part, joined) {\n  value = trim(value)\n  if (value == \"NONE\") return \"\"\n  count = split(value, parts, \",\")\n  for (index_part = 1; index_part <= count; index_part++) {\n    if (index_part > 1) joined = joined \" \"\n    joined = joined trim(parts[index_part])\n  }\n  return joined\n}\n{\n  colon = index($0, \":\")\n  if (colon) values[trim(substr($0, 1, colon - 1))] = arguments(substr($0, colon + 1))\n}\nEND {\n  suffix = values[\"CLI_ARGS\"] != \"\" ? values[\"CLI_ARGS\"] : values[\"CMD\"]\n  result = values[\"ENTRYPOINT\"]\n  if (result != \"\" && suffix != \"\") result = result \" \" suffix\n  else if (result == \"\") result = suffix\n  printf \"COMMANDE_FINALE:\"\n  if (result != \"\") printf \" %s\", result\n  printf \"\\n\"\n}\n'\n",
    "takeaway": "ENTRYPOINT fixe l exécutable principal tandis que CMD fournit ses arguments par défaut, facilement surchargeables au docker run."
  },
  {
    "id": "dk2-c3-e3",
    "chapter": 3,
    "title": "Optimiseur de cache et build Multi-Stage",
    "level": "n3",
    "language": "shell",
    "goal": "Quantifier l’allègement drastique d’image obtenu par le pattern Multi-Stage Build face à une construction monolithique.",
    "brief": "<p>Le script Bash lit trois lignes sur l’entrée standard (stdin).<br>\n- Ligne 1 : <code>MONOLITHIC: &lt;NomBase&gt; &lt;TailleBaseMo&gt; + &lt;OutilsDevMo&gt; + &lt;CodeMo&gt; + &lt;BinaireProduitMo&gt;</code>.<br>\n- Ligne 2 : <code>STAGE_BUILD: &lt;NomBaseBuild&gt; &lt;TailleTotalBuildMo&gt; -&gt; EXPORT: &lt;BinaireProduitMo&gt;</code>.<br>\n- Ligne 3 : <code>STAGE_FINAL: &lt;NomBaseLegere&gt; &lt;TailleBaseLegereMo&gt; + IMPORT: &lt;BinaireProduitMo&gt;</code>.<br>\nLes tailles sont des entiers positifs ou nuls ; la taille monolithique est strictement positive et la taille finale ne la dépasse pas. Les tailles d'export et d'import du binaire sont identiques.<br>\nCalculer :<br>\n1. Taille totale de l'image monolithique = <code>TailleBaseMo + OutilsDevMo + CodeMo + BinaireProduitMo</code>.<br>\n2. Taille de l'image finale issue du multi-stage = <code>TailleBaseLegereMo + BinaireProduitMo</code>.<br>\n3. Réduction brute = <code>TailleMono - TailleMulti</code> (en Mo).<br>\n4. Pourcentage d'économie = <code>(Reduction / TailleMono) * 100</code> (arrondi à 1 décimale).<br>\nAfficher :<br>\n<code>IMAGE_MONOLITHIQUE: &lt;Tmono&gt; Mo</code><br>\n<code>IMAGE_MULTI_STAGE: &lt;Tmulti&gt; Mo</code><br>\n<code>GAIN_SECURITE_ET_TAILLE: -&lt;Red&gt; Mo (&lt;Pct:.1f&gt;% economises)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c3-e3) — Optimiseur de cache et build Multi-Stage\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Seule la dernière étape (STAGE_FINAL) est embarquée dans l’image finale distribuée.",
      "Les compilateurs et codes sources de build sont jetés.",
      "Pour chaque cas : sommer les quatre termes de l image monolithique, additionner base légère et binaire pour le multi-stage, soustraire puis calculer le pourcentage d économie."
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
        "label": "Aucune économie",
        "stdin": "MONOLITHIC: base 1 + 0 + 0 + 0\nSTAGE_BUILD: base 1 -> EXPORT: 0\nSTAGE_FINAL: same 1 + IMPORT: 0",
        "expected": "IMAGE_MONOLITHIQUE: 1 Mo\nIMAGE_MULTI_STAGE: 1 Mo\nGAIN_SECURITE_ET_TAILLE: -0 Mo (0.0% economises)"
      },
      {
        "label": "Image finale vide dans le modèle",
        "stdin": "MONOLITHIC: builder 10 + 0 + 0 + 0\nSTAGE_BUILD: builder 10 -> EXPORT: 0\nSTAGE_FINAL: scratch 0 + IMPORT: 0",
        "expected": "IMAGE_MONOLITHIQUE: 10 Mo\nIMAGE_MULTI_STAGE: 0 Mo\nGAIN_SECURITE_ET_TAILLE: -10 Mo (100.0% economises)"
      },
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
      },
      {
        "label": "Image finale égale à la moitié du monolithique",
        "stdin": "MONOLITHIC: base 10 + 4 + 2 + 4\nSTAGE_BUILD: base 20 -> EXPORT: 4\nSTAGE_FINAL: slim 6 + IMPORT: 4",
        "expected": "IMAGE_MONOLITHIQUE: 20 Mo\nIMAGE_MULTI_STAGE: 10 Mo\nGAIN_SECURITE_ET_TAILLE: -10 Mo (50.0% economises)"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nNR == 1 {\n  line = $0\n  sub(/^[^:]*:[[:space:]]*/, \"\", line)\n  count = split(line, fields, /[[:space:]]+/)\n  for (index_field = 2; index_field <= count; index_field++) if (fields[index_field] != \"+\") monolithic += fields[index_field] + 0\n}\nNR == 3 {\n  line = $0\n  sub(/^[^:]*:[[:space:]]*/, \"\", line)\n  split(line, fields, /[[:space:]]+/)\n  final_size = fields[2] + fields[5]\n}\nEND {\n  reduction = monolithic - final_size\n  printf \"IMAGE_MONOLITHIQUE: %.0f Mo\\n\", monolithic\n  printf \"IMAGE_MULTI_STAGE: %.0f Mo\\n\", final_size\n  printf \"GAIN_SECURITE_ET_TAILLE: -%.0f Mo (%.1f%% economises)\\n\", reduction, 100 * reduction / monolithic\n}\n'\n",
    "takeaway": "Le build Multi-Stage compile dans une image outillée puis ne copie que le binaire final dans une image runtime minimale."
  }
];
