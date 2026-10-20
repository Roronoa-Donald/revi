'use strict';

module.exports = [
  {
    "id": "dk2-c3-e1",
    "chapter": 3,
    "title": "Validateur et linter de bonnes pratiques Dockerfile",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser statiquement les instructions d’un Dockerfile et détecter les anti-patterns courants.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nRègles d'audit et de conformité :<br>\n1. Première instruction non-commentaire : DOIT être <code>FROM</code> (ou <code>ARG</code>). Si absent : <code>ERREUR_CRITIQUE: Dockerfile doit debuter par FROM</code>.<br>\n2. <strong>Anti-pattern ADD</strong> : si une ligne commence par <code>ADD</code> avec un fichier local simple (.txt, .js, .py, etc. sans .tar/.gz/.zip ni URL http) : afficher <code>AVERTISSEMENT [Ligne N]: Preferer COPY a ADD pour les fichiers locaux</code>.<br>\n3. <strong>Anti-pattern Cache Apt</strong> : si <code>RUN apt-get update</code> est présent seul sans <code>apt-get install</code> sur la même instruction chaînée : afficher <code>AVERTISSEMENT [Ligne N]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)</code>.<br>\n4. Si aucun problème n'est détecté : afficher <code>AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)</code>.<br>\nSinon, afficher <code>AUDIT_DOCKERFILE: NON_CONFORME (&lt;K&gt; avertissement(s))</code>.</p>",
    "starter": "# Grille d'analyse (dk2-c3-e1) — Validateur et linter de bonnes pratiques Dockerfile\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Dockerfile parfaitement conforme]\n# Données : FROM python:3.11-slim\n# Données : WORKDIR /app\n# Données : COPY requirements.txt .\n# Données : RUN pip install --no-cache-dir -r requirements.txt\n# Données : COPY . .\n# Données : USER 1001\n# Données : CMD [\"python\", \"app.py\"]\nA_COMPLETER\n\n[Cas 2 — Anti-pattern apt-get update isolé]\n# Données : FROM debian:bullseye\n# Données : RUN apt-get update\n# Données : RUN apt-get install -y curl\n# Données : CMD [\"bash\"]\nA_COMPLETER\n\n[Cas 3 — Erreur critique absence de FROM initial]\n# Données : WORKDIR /app\n# Données : COPY . .\n# Données : CMD [\"sh\"]\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)"
      },
      {
        "label": "Anti-pattern apt-get update isolé",
        "stdin": "cas:2",
        "expected": "AVERTISSEMENT [Ligne 2]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))"
      },
      {
        "label": "Erreur critique absence de FROM initial",
        "stdin": "cas:3",
        "expected": "ERREUR_CRITIQUE: Dockerfile doit debuter par FROM"
      }
    ],
    "solution": "[Exemple]\nAVERTISSEMENT [Ligne 3]: Preferer COPY a ADD pour les fichiers locaux\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))\n\n[Cas 1 — Dockerfile parfaitement conforme]\nAUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)\n\n[Cas 2 — Anti-pattern apt-get update isolé]\nAVERTISSEMENT [Ligne 2]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))\n\n[Cas 3 — Erreur critique absence de FROM initial]\nERREUR_CRITIQUE: Dockerfile doit debuter par FROM"
  },
  {
    "id": "dk2-c3-e2",
    "chapter": 3,
    "title": "Distributeur de commandes CMD vs ENTRYPOINT",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la ligne de commande finale exacte exécutée dans le conteneur selon la présence de ENTRYPOINT, CMD et arguments CLI.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas. <code>ENTRYPOINT: &lt;liste d'arguments séparés par des virgules ou NONE&gt;</code><br>\n2. <code>CMD: &lt;liste d'arguments séparés par des virgules ou NONE&gt;</code><br>\n3. <code>CLI_ARGS: &lt;arguments passés à docker run séparés par des virgules ou NONE&gt;</code><br>\nRègles d'évaluation du runtime Docker :<br>\n- Si <code>CLI_ARGS</code> n'est pas <code>NONE</code>, il écrase complètement <code>CMD</code>.<br>\n- Si <code>ENTRYPOINT</code> n'est pas <code>NONE</code> : la commande finale est la concaténation de <code>ENTRYPOINT</code> + (<code>CLI_ARGS</code> s'il existe, sinon <code>CMD</code> si présent).<br>\n- Si <code>ENTRYPOINT</code> est <code>NONE</code> : la commande finale est <code>CLI_ARGS</code> (s'il existe) sinon <code>CMD</code>.<br>\nAfficher la commande résultante (arguments joints par des espaces) :<br>\n<code>COMMANDE_FINALE: &lt;cmd1&gt; &lt;cmd2&gt; ...</code></p>",
    "starter": "# Grille d'analyse (dk2-c3-e2) — Distributeur de commandes CMD vs ENTRYPOINT\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — CMD seul sans ENTRYPOINT]\n# Données : ENTRYPOINT: NONE\n# Données : CMD: nginx, -g, daemon off;\n# Données : CLI_ARGS: NONE\nA_COMPLETER\n\n[Cas 2 — CMD seul écrasé par commande CLI (ex: docker run ... bash)]\n# Données : ENTRYPOINT: NONE\n# Données : CMD: node, index.js\n# Données : CLI_ARGS: bash\nA_COMPLETER\n\n[Cas 3 — ENTRYPOINT seul sans CMD]\n# Données : ENTRYPOINT: /entrypoint.sh\n# Données : CMD: NONE\n# Données : CLI_ARGS: NONE\nA_COMPLETER\n",
    "hints": [
      "Traiter la valeur spéciale NONE comme une liste vide.",
      "Les arguments passés en ligne de commande remplacent systématiquement l’instruction CMD."
    ],
    "examples": [
      {
        "stdin": "ENTRYPOINT: python, app.py\nCMD: --port, 8080\nCLI_ARGS: NONE",
        "expected": "COMMANDE_FINALE: python app.py --port 8080",
        "note": "ENTRYPOINT et CMD sont combinés par défaut."
      },
      {
        "stdin": "ENTRYPOINT: python, app.py\nCMD: --port, 8080\nCLI_ARGS: --debug, --port, 9000",
        "expected": "COMMANDE_FINALE: python app.py --debug --port 9000",
        "note": "Les arguments CLI écrasent le CMD par défaut."
      }
    ],
    "tests": [
      {
        "label": "CMD seul sans ENTRYPOINT",
        "stdin": "cas:1",
        "expected": "COMMANDE_FINALE: nginx -g daemon off;"
      },
      {
        "label": "CMD seul écrasé par commande CLI (ex: docker run ... bash)",
        "stdin": "cas:2",
        "expected": "COMMANDE_FINALE: bash"
      },
      {
        "label": "ENTRYPOINT seul sans CMD",
        "stdin": "cas:3",
        "expected": "COMMANDE_FINALE: /entrypoint.sh"
      }
    ],
    "solution": "[Exemple]\nCOMMANDE_FINALE: python app.py --port 8080\n\n[Cas 1 — CMD seul sans ENTRYPOINT]\nCOMMANDE_FINALE: nginx -g daemon off;\n\n[Cas 2 — CMD seul écrasé par commande CLI (ex: docker run ... bash)]\nCOMMANDE_FINALE: bash\n\n[Cas 3 — ENTRYPOINT seul sans CMD]\nCOMMANDE_FINALE: /entrypoint.sh"
  },
  {
    "id": "dk2-c3-e3",
    "chapter": 3,
    "title": "Optimiseur de cache et build Multi-Stage",
    "level": "n3",
    "language": "analyse",
    "goal": "Quantifier l’allègement drastique d’image obtenu par le pattern Multi-Stage Build face à une construction monolithique.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\n- Ligne 2 : <code>STAGE_BUILD: &lt;NomBaseBuild&gt; &lt;TailleTotalBuildMo&gt; -&gt; EXPORT: &lt;BinaireProduitMo&gt;</code>.<br>\n- Ligne 3 : <code>STAGE_FINAL: &lt;NomBaseLegere&gt; &lt;TailleBaseLegereMo&gt; + IMPORT: &lt;BinaireProduitMo&gt;</code>.<br>\nCalculer :<br>\n1. Taille totale de l'image monolithique = <code>TailleBaseMo + OutilsDevMo + CodeMo + BinaireProduitMo</code>.<br>\n2. Taille de l'image finale issue du multi-stage = <code>TailleBaseLegereMo + BinaireProduitMo</code>.<br>\n3. Réduction brute = <code>TailleMono - TailleMulti</code> (en Mo).<br>\n4. Pourcentage d'économie = <code>(Reduction / TailleMono) * 100</code> (arrondi à 1 décimale).<br>\nAfficher :<br>\n<code>IMAGE_MONOLITHIQUE: &lt;Tmono&gt; Mo</code><br>\n<code>IMAGE_MULTI_STAGE: &lt;Tmulti&gt; Mo</code><br>\n<code>GAIN_SECURITE_ET_TAILLE: -&lt;Red&gt; Mo (&lt;Pct:.1f&gt;% economises)</code></p>",
    "starter": "# Grille d'analyse (dk2-c3-e3) — Optimiseur de cache et build Multi-Stage\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Application Java Quarkus / GraalVM vers distroless]\n# Données : MONOLITHIC: graalvm:jdk17 1200 + 300 + 50 + 40\n# Données : STAGE_BUILD: graalvm:jdk17 1590 -> EXPORT: 40\n# Données : STAGE_FINAL: gcr.io/distroless/static 2 + IMPORT: 40\nA_COMPLETER\n\n[Cas 2 — Application Node.js avec bundle frontend]\n# Données : MONOLITHIC: node:20 1000 + 250 + 30 + 10\n# Données : STAGE_BUILD: node:20 1290 -> EXPORT: 10\n# Données : STAGE_FINAL: nginx:alpine 25 + IMPORT: 10\nA_COMPLETER\n\n[Cas 3 — Build léger C Rust vers scratch]\n# Données : MONOLITHIC: rust:1.75 1400 + 200 + 20 + 8\n# Données : STAGE_BUILD: rust:1.75 1628 -> EXPORT: 8\n# Données : STAGE_FINAL: scratch 0 + IMPORT: 8\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "IMAGE_MONOLITHIQUE: 1590 Mo\nIMAGE_MULTI_STAGE: 42 Mo\nGAIN_SECURITE_ET_TAILLE: -1548 Mo (97.4% economises)"
      },
      {
        "label": "Application Node.js avec bundle frontend",
        "stdin": "cas:2",
        "expected": "IMAGE_MONOLITHIQUE: 1290 Mo\nIMAGE_MULTI_STAGE: 35 Mo\nGAIN_SECURITE_ET_TAILLE: -1255 Mo (97.3% economises)"
      },
      {
        "label": "Build léger C Rust vers scratch",
        "stdin": "cas:3",
        "expected": "IMAGE_MONOLITHIQUE: 1628 Mo\nIMAGE_MULTI_STAGE: 8 Mo\nGAIN_SECURITE_ET_TAILLE: -1620 Mo (99.5% economises)"
      }
    ],
    "solution": "[Exemple]\nIMAGE_MONOLITHIQUE: 980 Mo\nIMAGE_MULTI_STAGE: 27 Mo\nGAIN_SECURITE_ET_TAILLE: -953 Mo (97.2% economises)\n\n[Cas 1 — Application Java Quarkus / GraalVM vers distroless]\nIMAGE_MONOLITHIQUE: 1590 Mo\nIMAGE_MULTI_STAGE: 42 Mo\nGAIN_SECURITE_ET_TAILLE: -1548 Mo (97.4% economises)\n\n[Cas 2 — Application Node.js avec bundle frontend]\nIMAGE_MONOLITHIQUE: 1290 Mo\nIMAGE_MULTI_STAGE: 35 Mo\nGAIN_SECURITE_ET_TAILLE: -1255 Mo (97.3% economises)\n\n[Cas 3 — Build léger C Rust vers scratch]\nIMAGE_MONOLITHIQUE: 1628 Mo\nIMAGE_MULTI_STAGE: 8 Mo\nGAIN_SECURITE_ET_TAILLE: -1620 Mo (99.5% economises)"
  }
];
