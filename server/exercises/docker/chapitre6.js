'use strict';

module.exports = [
  {
    "id": "dk2-c6-e1",
    "chapter": 6,
    "title": "Auditeur de privilèges root et directive USER",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la conformité de sécurité d’une image Docker en s’assurant qu’elle ne s’exécute pas sous le superutilisateur root.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nRègles de sécurité CIS Docker Benchmark :<br>\n- Par défaut dans Docker, l'utilisateur actif est <code>root</code> (UID 0).<br>\n- Si une instruction <code>USER &lt;nom_ou_uid&gt;</code> est rencontrée, elle modifie l'utilisateur actif pour les étapes suivantes et le runtime final.<br>\n- À la fin du fichier :<br>\n  * Si le dernier utilisateur actif est <code>root</code> ou <code>0</code> ou si aucune directive USER n'a été définie :<br>\n    afficher <code>AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)</code><br>\n  * Si le dernier utilisateur actif est non-root (ex: <code>node</code>, <code>appuser</code>, <code>1001</code>) :<br>\n    afficher <code>AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: &lt;USER&gt;)</code></p>",
    "starter": "# Grille d'analyse (dk2-c6-e1) — Auditeur de privilèges root et directive USER\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Création puis passage à un UID numérique]\n# Données : FROM alpine:3.18\n# Données : RUN adduser -D -u 10001 customuser\n# Données : USER 10001\n# Données : CMD [\"sh\"]\nA_COMPLETER\n\n[Cas 2 — Retour explicite à root en fin de fichier]\n# Données : FROM node:18\n# Données : USER node\n# Données : RUN npm install\n# Données : USER root\n# Données : CMD [\"node\", \"app.js\"]\nA_COMPLETER\n\n[Cas 3 — UID 0 explicite]\n# Données : FROM debian\n# Données : USER 0\nA_COMPLETER\n",
    "hints": [
      "Parcourir le fichier et mettre à jour la variable utilisateur_courant à chaque instruction USER.",
      "Ignorer les commentaires débutant par #."
    ],
    "examples": [
      {
        "stdin": "FROM python:3.11-slim\nWORKDIR /app\nCOPY . .\nUSER appuser\nCMD [\"python\", \"main.py\"]",
        "expected": "AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: appuser)",
        "note": "Image conforme exécutée sous utilisateur non-privilégié."
      },
      {
        "stdin": "FROM ubuntu:22.04\nRUN apt-get update && apt-get install -y nginx\nCMD [\"nginx\", \"-g\", \"daemon off;\"]",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)",
        "note": "Absence de USER : le conteneur démarre en root par défaut."
      }
    ],
    "tests": [
      {
        "label": "Création puis passage à un UID numérique",
        "stdin": "cas:1",
        "expected": "AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: 10001)"
      },
      {
        "label": "Retour explicite à root en fin de fichier",
        "stdin": "cas:2",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      },
      {
        "label": "UID 0 explicite",
        "stdin": "cas:3",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      }
    ],
    "solution": "[Exemple]\nAUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: appuser)\n\n[Cas 1 — Création puis passage à un UID numérique]\nAUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: 10001)\n\n[Cas 2 — Retour explicite à root en fin de fichier]\nAUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)\n\n[Cas 3 — UID 0 explicite]\nAUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
  },
  {
    "id": "dk2-c6-e2",
    "chapter": 6,
    "title": "Calculateur de quotas cgroups (CPU & Mémoire)",
    "level": "n2",
    "language": "analyse",
    "goal": "Convertir les paramètres de contrainte de ressources Docker en métriques de contrôle noyau cgroups.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nExemple : <code>MEM=512m SWAP=1g CPUS=1.5</code>.<br>\nUnités mémoire : <code>m</code> (Mo = 1024 Ko) ou <code>g</code> (Go = 1024 Mo).<br>\nRègles cgroups v2 :<br>\n- <code>RAM_MAX_MO</code> : valeur convertie en Mo entiers.<br>\n- Dans Docker, l'option <code>--memory-swap</code> représente la mémoire totale (RAM + SWAP cumulés).<br>\n  Le swap additionnel effectif est donc : <code>SWAP_EFFECTIF_MO = max(0, SWAP_TOTAL_MO - RAM_MAX_MO)</code>.<br>\n- Période CPU CFS standard = <code>100000</code> microsecondes.<br>\n  Le quota alloué par période est : <code>CPU_QUOTA_US = int(CPUS * 100000)</code>.<br>\nAfficher :<br>\n<code>CGROUPS: RAM: &lt;RAM_MAX_MO&gt; Mo | SWAP_ADDITIONNEL: &lt;SWAP_EFFECTIF_MO&gt; Mo | CPU_QUOTA: &lt;CPU_QUOTA_US&gt; us / 100000 us (&lt;CPUS&gt; cœurs)</code></p>",
    "starter": "# Grille d'analyse (dk2-c6-e2) — Calculateur de quotas cgroups (CPU & Mémoire)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Gros conteneur de base de données]\n# Données : MEM=4g SWAP=8g CPUS=4.0\nA_COMPLETER\n\n[Cas 2 — Micro conteneur d’arrière-plan]\n# Données : MEM=128m SWAP=256m CPUS=0.25\nA_COMPLETER\n\n[Cas 3 — Conteneur CPU pur sans swap]\n# Données : MEM=1g SWAP=1g CPUS=2.0\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "CGROUPS: RAM: 4096 Mo | SWAP_ADDITIONNEL: 4096 Mo | CPU_QUOTA: 400000 us / 100000 us (4.0 cœurs)"
      },
      {
        "label": "Micro conteneur d’arrière-plan",
        "stdin": "cas:2",
        "expected": "CGROUPS: RAM: 128 Mo | SWAP_ADDITIONNEL: 128 Mo | CPU_QUOTA: 25000 us / 100000 us (0.25 cœurs)"
      },
      {
        "label": "Conteneur CPU pur sans swap",
        "stdin": "cas:3",
        "expected": "CGROUPS: RAM: 1024 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 200000 us / 100000 us (2.0 cœurs)"
      }
    ],
    "solution": "[Exemple]\nCGROUPS: RAM: 512 Mo | SWAP_ADDITIONNEL: 512 Mo | CPU_QUOTA: 150000 us / 100000 us (1.5 cœurs)\nCGROUPS: RAM: 256 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 50000 us / 100000 us (0.5 cœurs)\n\n[Cas 1 — Gros conteneur de base de données]\nCGROUPS: RAM: 4096 Mo | SWAP_ADDITIONNEL: 4096 Mo | CPU_QUOTA: 400000 us / 100000 us (4.0 cœurs)\n\n[Cas 2 — Micro conteneur d’arrière-plan]\nCGROUPS: RAM: 128 Mo | SWAP_ADDITIONNEL: 128 Mo | CPU_QUOTA: 25000 us / 100000 us (0.25 cœurs)\n\n[Cas 3 — Conteneur CPU pur sans swap]\nCGROUPS: RAM: 1024 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 200000 us / 100000 us (2.0 cœurs)"
  },
  {
    "id": "dk2-c6-e3",
    "chapter": 6,
    "title": "Simulateur de politique de redémarrage (Restart Policy)",
    "level": "n3",
    "language": "analyse",
    "goal": "Déterminer si le démon Docker redémarre ou non un conteneur arrêté selon sa politique et son code de sortie.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nRègles du démon Docker :<br>\n1. Si <code>MANUEL=OUI</code> (ex: <code>docker stop</code> déclenché par l'admin) :<br>\n   - <code>DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)</code><br>\n2. Sinon :<br>\n   - <code>POLITIQUE=no</code> : <code>DECISION: ARRET_DEFINITIF (Politique \"no\")</code><br>\n   - <code>POLITIQUE=always</code> ou <code>POLITIQUE=unless-stopped</code> :<br>\n     <code>DECISION: REDEMARRER (Relance automatique du conteneur)</code><br>\n   - <code>POLITIQUE=on-failure</code> :<br>\n     * Si <code>EXIT_CODE == 0</code> : <code>DECISION: ARRET_DEFINITIF (Code sortie normal 0)</code><br>\n     * Si <code>EXIT_CODE != 0</code> : <code>DECISION: REDEMARRER (Echec detecte: code &lt;code&gt;)</code><br>\nAfficher :<br>\n<code>EVENEMENT: &lt;entree&gt; -&gt; &lt;DECISION&gt;</code></p>",
    "starter": "# Grille d'analyse (dk2-c6-e3) — Simulateur de politique de redémarrage (Restart Policy)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Politique no par défaut]\n# Données : POLITIQUE=no EXIT_CODE=1 MANUEL=NON\n# Données : POLITIQUE=no EXIT_CODE=0 MANUEL=NON\nA_COMPLETER\n\n[Cas 2 — Politique unless-stopped]\n# Données : POLITIQUE=unless-stopped EXIT_CODE=1 MANUEL=NON\n# Données : POLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=OUI\nA_COMPLETER\n\n[Cas 3 — Crash critique OOM-Killed (code 137)]\n# Données : POLITIQUE=always EXIT_CODE=137 MANUEL=NON\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "EVENEMENT: POLITIQUE=no EXIT_CODE=1 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Politique \"no\")\nEVENEMENT: POLITIQUE=no EXIT_CODE=0 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Politique \"no\")"
      },
      {
        "label": "Politique unless-stopped",
        "stdin": "cas:2",
        "expected": "EVENEMENT: POLITIQUE=unless-stopped EXIT_CODE=1 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=OUI -> DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)"
      },
      {
        "label": "Crash critique OOM-Killed (code 137)",
        "stdin": "cas:3",
        "expected": "EVENEMENT: POLITIQUE=always EXIT_CODE=137 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)"
      }
    ],
    "solution": "[Exemple]\nEVENEMENT: POLITIQUE=always EXIT_CODE=1 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=always EXIT_CODE=0 MANUEL=OUI -> DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)\nEVENEMENT: POLITIQUE=on-failure EXIT_CODE=0 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Code sortie normal 0)\nEVENEMENT: POLITIQUE=on-failure EXIT_CODE=137 MANUEL=NON -> DECISION: REDEMARRER (Echec detecte: code 137)\n\n[Cas 1 — Politique no par défaut]\nEVENEMENT: POLITIQUE=no EXIT_CODE=1 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Politique \"no\")\nEVENEMENT: POLITIQUE=no EXIT_CODE=0 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Politique \"no\")\n\n[Cas 2 — Politique unless-stopped]\nEVENEMENT: POLITIQUE=unless-stopped EXIT_CODE=1 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=OUI -> DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)\n\n[Cas 3 — Crash critique OOM-Killed (code 137)]\nEVENEMENT: POLITIQUE=always EXIT_CODE=137 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)"
  }
];
