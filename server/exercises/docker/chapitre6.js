'use strict';

module.exports = [
  {
    "id": "dk2-c6-e1",
    "chapter": 6,
    "title": "Auditeur de privilèges root et directive USER",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité de sécurité d’une image Docker en s’assurant qu’elle ne s’exécute pas sous le superutilisateur root.",
    "brief": "<p>Le script Bash lit un Dockerfile mono-étape sur l’entrée standard (stdin). Le modèle suppose une image de base dont l'utilisateur est root et vérifie seulement le nom ou l'UID indiqué par <code>USER</code>. Il ne résout pas les noms en UID et ne vérifie pas une option <code>--user</code> au lancement : <code>CONFORME</code> ne signifie pas que toute la sécurité du conteneur a été auditée.<br>\nRègles de ce contrôle :<br>\n- Par défaut dans Docker, l'utilisateur actif est <code>root</code> (UID 0).<br>\n- Si une instruction <code>USER &lt;nom_ou_uid&gt;[:groupe]</code> est rencontrée, elle modifie l'utilisateur actif pour les étapes suivantes et le runtime final.<br>\n- À la fin du fichier :<br>\n  * Si la partie utilisateur de la dernière directive est <code>root</code> ou <code>0</code> ou si aucune directive USER n'a été définie :<br>\n    afficher <code>AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)</code><br>\n  * Si le dernier utilisateur actif est non-root (ex: <code>node</code>, <code>appuser</code>, <code>1001</code>) :<br>\n    afficher <code>AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: &lt;USER&gt;)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c6-e1) — Auditeur de privilèges root et directive USER\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Parcourir le fichier et mettre à jour la variable utilisateur_courant à chaque instruction USER.",
      "Ignorer les commentaires débutant par #.",
      "Parcourir le fichier ligne à ligne en mémorisant le dernier USER rencontré ; à la fin, confronter cet utilisateur à root ou 0 pour trancher entre CRITIQUE et CONFORME."
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
        "label": "Absence de USER hors commentaires",
        "stdin": "FROM alpine\n# USER worker\nRUN echo USER worker",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      },
      {
        "label": "Dernier utilisateur et groupe explicites",
        "stdin": "FROM alpine\nUSER root:123\nUSER 2001:100",
        "expected": "AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: 2001:100)"
      },
      {
        "label": "UID 0 explicite",
        "stdin": "FROM debian\nUSER 0",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      },
      {
        "label": "Retour explicite à root en fin de fichier",
        "stdin": "FROM node:18\nUSER node\nRUN npm install\nUSER root\nCMD [\"node\", \"app.js\"]",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      },
      {
        "label": "Création puis passage à un UID numérique",
        "stdin": "FROM alpine:3.18\nRUN adduser -D -u 10001 customuser\nUSER 10001\nCMD [\"sh\"]",
        "expected": "AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: 10001)"
      },
      {
        "label": "UID zéro avec groupe",
        "stdin": "FROM alpine\nuser 0:27",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nBEGIN { user = \"root\" }\n{\n  line = $0\n  sub(/^[[:space:]]+/, \"\", line)\n  if (line ~ /^#/ || line == \"\") next\n  count = split(line, fields, /[[:space:]]+/)\n  if (toupper(fields[1]) == \"USER\" && count >= 2) user = fields[2]\n}\nEND {\n  split(user, parts, \":\")\n  if (parts[1] == \"root\" || (parts[1] ~ /^[0-9]+$/ && parts[1] + 0 == 0))\n    print \"AUDIT_SECURITE: CRITIQUE (Le conteneur s\\047execute avec les privileges root - UID 0)\"\n  else printf \"AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: %s)\\n\", user\n}\n'\n",
    "takeaway": "Exécuter un processus conteneurisé sous un UID non-root (directive USER) limite fortement l impact d une évasion applicative."
  },
  {
    "id": "dk2-c6-e2",
    "chapter": 6,
    "title": "Calculateur de quotas cgroups (CPU & Mémoire)",
    "level": "n2",
    "language": "shell",
    "goal": "Convertir les paramètres de contrainte de ressources Docker en métriques de contrôle noyau cgroups.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nChaque ligne contient <code>MEM=&lt;taille&gt; SWAP=&lt;taille&gt; CPUS=&lt;nombre&gt;</code>, par exemple <code>MEM=512m SWAP=1g CPUS=1.5</code>. Les tailles sont des entiers positifs ou nuls et le nombre de cœurs est un décimal positif ou nul.<br>\nCe modèle arithmétique n'est pas un validateur des options Docker : notamment les valeurs zéro et un total SWAP inférieur à MEM peuvent avoir une autre signification ou être refusés par Docker.<br>\nUnités mémoire : <code>m</code> (Mo = 1024 Ko) ou <code>g</code> (Go = 1024 Mo).<br>\nRègles cgroups v2 :<br>\n- <code>RAM_MAX_MO</code> : valeur convertie en Mo entiers.<br>\n- Dans Docker, l'option <code>--memory-swap</code> représente la mémoire totale (RAM + SWAP cumulés).<br>\n  Le swap additionnel effectif est donc : <code>SWAP_EFFECTIF_MO = max(0, SWAP_TOTAL_MO - RAM_MAX_MO)</code>.<br>\n- Période CPU CFS standard = <code>100000</code> microsecondes.<br>\n  Le quota alloué par période est : <code>CPU_QUOTA_US = int(CPUS * 100000)</code>.<br>\nAfficher :<br>\n<code>CGROUPS: RAM: &lt;RAM_MAX_MO&gt; Mo | SWAP_ADDITIONNEL: &lt;SWAP_EFFECTIF_MO&gt; Mo | CPU_QUOTA: &lt;CPU_QUOTA_US&gt; us / 100000 us (&lt;CPUS&gt; cœurs)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c6-e2) — Calculateur de quotas cgroups (CPU & Mémoire)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Convertir 1g en 1024 Mo.",
      "Se rappeler que l’argument swap de Docker est la somme de la RAM et du swap.",
      "Pour chaque ligne : convertir MEM et SWAP en Mo, calculer le swap effectif par max de zéro et du total moins la RAM, puis le quota CPU par la période CFS."
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
        "label": "Différence négative ramenée à zéro dans le modèle",
        "stdin": "MEM=32m SWAP=31m CPUS=0.5",
        "expected": "CGROUPS: RAM: 32 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 50000 us / 100000 us (0.5 cœurs)"
      },
      {
        "label": "Unité minimale et troncature décimale",
        "stdin": "MEM=1m SWAP=2m CPUS=0.100009",
        "expected": "CGROUPS: RAM: 1 Mo | SWAP_ADDITIONNEL: 1 Mo | CPU_QUOTA: 10000 us / 100000 us (0.100009 cœurs)"
      },
      {
        "label": "Conteneur CPU pur sans swap",
        "stdin": "MEM=1g SWAP=1g CPUS=2.0",
        "expected": "CGROUPS: RAM: 1024 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 200000 us / 100000 us (2.0 cœurs)"
      },
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
        "label": "Valeurs nulles dans le modèle",
        "stdin": "MEM=0m SWAP=0m CPUS=0",
        "expected": "CGROUPS: RAM: 0 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 0 us / 100000 us (0 cœurs)"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nfunction memory_megabytes(value,    unit, amount) {\n  unit = substr(value, length(value), 1)\n  amount = substr(value, 1, length(value) - 1) + 0\n  return unit == \"g\" ? amount * 1024 : amount\n}\nfunction cpu_quota(value,    parts, whole, fraction) {\n  split(value, parts, \".\")\n  whole = parts[1] + 0\n  fraction = substr(parts[2] \"00000\", 1, 5) + 0\n  return whole * 100000 + fraction\n}\nNF {\n  delete values\n  for (index_field = 1; index_field <= NF; index_field++) {\n    equals = index($index_field, \"=\")\n    if (equals) values[substr($index_field, 1, equals - 1)] = substr($index_field, equals + 1)\n  }\n  ram = memory_megabytes(values[\"MEM\"])\n  swap = memory_megabytes(values[\"SWAP\"]) - ram\n  if (swap < 0) swap = 0\n  cpu = values[\"CPUS\"]\n  printf \"CGROUPS: RAM: %.0f Mo | SWAP_ADDITIONNEL: %.0f Mo | CPU_QUOTA: %.0f us / 100000 us (%s cœurs)\\n\", ram, swap, cpu_quota(cpu), cpu\n}\n'\n",
    "takeaway": "Les options --memory et --cpus se traduisent directement en plafonds mémoire et quotas temps CPU dans le contrôleur Cgroups."
  },
  {
    "id": "dk2-c6-e3",
    "chapter": 6,
    "title": "Simulateur de politique de redémarrage (Restart Policy)",
    "level": "n3",
    "language": "shell",
    "goal": "Déterminer si le démon Docker redémarre ou non un conteneur arrêté selon sa politique et son code de sortie.",
    "brief": "<p>Le script Bash lit un événement par ligne sur l’entrée standard (stdin), au format <code>POLITIQUE=... EXIT_CODE=... MANUEL=OUI|NON</code>. Le code de sortie est un entier positif ou nul.<br>\nLe modèle calcule uniquement la décision immédiate après cet arrêt. Il ne simule ni le redémarrage du daemon ni la durée préalable d'exécution ; <code>ARRET_DEFINITIF</code> est le libellé du modèle, pas une garantie pour tous les événements futurs.<br>\nRègles du modèle :<br>\n1. Si <code>MANUEL=OUI</code> (ex: <code>docker stop</code> déclenché par l'admin) :<br>\n   - <code>DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)</code><br>\n2. Sinon :<br>\n   - <code>POLITIQUE=no</code> : <code>DECISION: ARRET_DEFINITIF (Politique \"no\")</code><br>\n   - <code>POLITIQUE=always</code> ou <code>POLITIQUE=unless-stopped</code> :<br>\n     <code>DECISION: REDEMARRER (Relance automatique du conteneur)</code><br>\n   - <code>POLITIQUE=on-failure</code> :<br>\n     * Si <code>EXIT_CODE == 0</code> : <code>DECISION: ARRET_DEFINITIF (Code sortie normal 0)</code><br>\n     * Si <code>EXIT_CODE != 0</code> : <code>DECISION: REDEMARRER (Echec detecte: code &lt;code&gt;)</code><br>\nAfficher :<br>\n<code>EVENEMENT: &lt;entree&gt; -&gt; &lt;DECISION&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c6-e3) — Simulateur de politique de redémarrage (Restart Policy)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Dans ce modèle, un arrêt manuel empêche la relance immédiate ; le redémarrage du daemon n'est pas simulé.",
      "on-failure ne relance le conteneur que si le code de sortie est non nul.",
      "Pour chaque événement : si MANUEL vaut OUI conclure à l arrêt définitif ; sinon appliquer la politique : no arrête, always et unless-stopped relancent, on-failure dépend du code."
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
        "label": "Arrêt manuel prioritaire et échec non nul",
        "stdin": "POLITIQUE=no EXIT_CODE=42 MANUEL=OUI\nPOLITIQUE=on-failure EXIT_CODE=42 MANUEL=NON",
        "expected": "EVENEMENT: POLITIQUE=no EXIT_CODE=42 MANUEL=OUI -> DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)\nEVENEMENT: POLITIQUE=on-failure EXIT_CODE=42 MANUEL=NON -> DECISION: REDEMARRER (Echec detecte: code 42)"
      },
      {
        "label": "Code zéro et un selon la politique",
        "stdin": "POLITIQUE=always EXIT_CODE=0 MANUEL=NON\nPOLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=NON\nPOLITIQUE=on-failure EXIT_CODE=1 MANUEL=NON",
        "expected": "EVENEMENT: POLITIQUE=always EXIT_CODE=0 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=on-failure EXIT_CODE=1 MANUEL=NON -> DECISION: REDEMARRER (Echec detecte: code 1)"
      },
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
    "solution": "#!/usr/bin/env bash\nawk '\nNF {\n  delete values\n  for (index_field = 1; index_field <= NF; index_field++) {\n    equals = index($index_field, \"=\")\n    if (equals) values[substr($index_field, 1, equals - 1)] = substr($index_field, equals + 1)\n  }\n  policy = values[\"POLITIQUE\"]\n  code = values[\"EXIT_CODE\"]\n  if (values[\"MANUEL\"] == \"OUI\") decision = \"ARRET_DEFINITIF (Arret volontaire par l\\047administrateur)\"\n  else if (policy == \"no\") decision = \"ARRET_DEFINITIF (Politique \\\"no\\\")\"\n  else if (policy == \"always\" || policy == \"unless-stopped\") decision = \"REDEMARRER (Relance automatique du conteneur)\"\n  else if (policy == \"on-failure\" && code + 0 == 0) decision = \"ARRET_DEFINITIF (Code sortie normal 0)\"\n  else if (policy == \"on-failure\") decision = \"REDEMARRER (Echec detecte: code \" code \")\"\n  else next\n  printf \"EVENEMENT: %s -> DECISION: %s\\n\", $0, decision\n}\n'\n",
    "takeaway": "La politique on-failure redémarre uniquement après un code de sortie non nul tandis qu unless-stopped préserve l arrêt manuel."
  }
];
