'use strict';

module.exports = [
  {
    "id": "gh3-c5-e1",
    "chapter": 5,
    "title": "Validateur de structure de workflow GitHub Actions",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser la spécification d’un pipeline GitHub Actions et valider la présence des blocs obligatoires.",
    "brief": "<p>Un workflow GitHub Actions (fichier <code>.github/workflows/*.yml</code>) doit respecter une arborescence minimale :<br><br>\nCritères de conformité :<br>\n1. <code>name</code> : doit être renseigné (chaîne non vide).<br>\n2. Déclencheurs <code>on:</code> : au moins un événement déclencheur parmi <code>push</code>, <code>pull_request</code>, <code>workflow_dispatch</code>, <code>schedule</code>.<br>\n3. <code>jobs</code> : au moins un job déclaré. Chaque job doit obligatoirement comporter :<br>\n   - Une cible d'exécution <code>runs-on</code> (ex: <code>ubuntu-latest</code>, <code>windows-latest</code>).<br>\n   - Au moins une étape <code>step</code> déclarée.<br><br>\nAnalysez les données fournies pour chaque cas...&gt;</code><br>\n<code>JOB id=&lt;id&gt; runs_on=&lt;runner|NONE&gt; steps_count=&lt;n&gt;</code>.<br><br>\nPour le workflow, afficher :<br>\n<code>WORKFLOW_AUDIT name=\"{nom}\" status={VALID | ERREUR} triggers_count={n} jobs_count={m}</code><br>\nErreurs possibles : <code>MISSING_NAME</code>, <code>MISSING_TRIGGERS</code>, <code>NO_JOBS</code>, <code>JOB_MISSING_RUNS_ON</code>, <code>JOB_ZERO_STEPS</code>.</p>",
    "starter": "# Grille d'analyse (gh3-c5-e1) — Validateur de structure de workflow GitHub Actions\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Job sans runner runs_on spécifié]\n# Données : NAME=Test-Suite\n# Données : TRIGGERS=push\n# Données : JOB id=unit-tests runs_on=NONE steps_count=2\nA_COMPLETER\n\n[Cas 2 — Déclencheurs absents]\n# Données : NAME=Nightly-Release\n# Données : TRIGGERS=\n# Données : JOB id=release runs_on=ubuntu-latest steps_count=1\nA_COMPLETER\n\n[Cas 3 — Workflow avec plusieurs jobs valides et job sans steps]\n# Données : NAME=Deploy-Prod\n# Données : TRIGGERS=workflow_dispatch\n# Données : JOB id=lint runs_on=ubuntu-latest steps_count=2\n# Données : JOB id=deploy runs_on=ubuntu-latest steps_count=0\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "WORKFLOW_AUDIT name=\"Test-Suite\" status=JOB_MISSING_RUNS_ON triggers_count=1 jobs_count=1"
      },
      {
        "label": "Déclencheurs absents",
        "stdin": "cas:2",
        "expected": "WORKFLOW_AUDIT name=\"Nightly-Release\" status=MISSING_TRIGGERS triggers_count=0 jobs_count=1"
      },
      {
        "label": "Workflow avec plusieurs jobs valides et job sans steps",
        "stdin": "cas:3",
        "expected": "WORKFLOW_AUDIT name=\"Deploy-Prod\" status=JOB_ZERO_STEPS triggers_count=1 jobs_count=2"
      }
    ],
    "solution": "[Exemple]\nWORKFLOW_AUDIT name=\"CI-Pipeline\" status=VALID triggers_count=2 jobs_count=1\n\n[Cas 1 — Job sans runner runs_on spécifié]\nWORKFLOW_AUDIT name=\"Test-Suite\" status=JOB_MISSING_RUNS_ON triggers_count=1 jobs_count=1\n\n[Cas 2 — Déclencheurs absents]\nWORKFLOW_AUDIT name=\"Nightly-Release\" status=MISSING_TRIGGERS triggers_count=0 jobs_count=1\n\n[Cas 3 — Workflow avec plusieurs jobs valides et job sans steps]\nWORKFLOW_AUDIT name=\"Deploy-Prod\" status=JOB_ZERO_STEPS triggers_count=1 jobs_count=2"
  },
  {
    "id": "gh3-c5-e2",
    "chapter": 5,
    "title": "Générateur et évaluateur de matrice de build (strategy: matrix)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer le produit cartésien des axes d’une matrice de test GitHub Actions et gérer les exclusions.",
    "brief": "<p>La directive <code>strategy: matrix</code> permet d'exécuter un job en parallèle sur de multiples combinaisons d'environnements (OS x Version de langage).<br><br>\nSpécification :<br>\n- Liste d'OS : <code>os=&lt;os1,os2...&gt;</code>.<br>\n- Liste de versions de runtime : <code>version=&lt;v1,v2...&gt;</code>.<br>\n- Exclusions optionnelles (<code>EXCLUDE os=&lt;os&gt; version=&lt;v&gt;</code>).<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nLe script doit calculer la liste des combinaisons valides (produit cartésien moins exclusions), triée par OS puis par version, et afficher :<br>\nChaque combinaison :<br>\n<code>JOB_INSTANCE os={os} version={v} tag=\"{os}-{v}\"</code><br>\nEt la ligne récapitulative :<br>\n<code>MATRIX_TOTAL instances={n} excluded={nb_exclus}</code></p>",
    "starter": "# Grille d'analyse (gh3-c5-e2) — Générateur et évaluateur de matrice de build (strategy: matrix)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice 3x2 complète sans aucune exclusion]\n# Données : MATRIX_DEF os=ubuntu,windows,macos version=18,20\nA_COMPLETER\n\n[Cas 2 — Multiples exclusions croisées]\n# Données : MATRIX_DEF os=ubuntu,windows version=10,11,12\n# Données : EXCLUDE os=windows version=10\n# Données : EXCLUDE os=windows version=11\nA_COMPLETER\n\n[Cas 3 — Toutes les combinaisons d’un OS exclues]\n# Données : MATRIX_DEF os=linux,bsd version=1.0\n# Données : EXCLUDE os=bsd version=1.0\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "JOB_INSTANCE os=ubuntu version=18 tag=\"ubuntu-18\"\nJOB_INSTANCE os=ubuntu version=20 tag=\"ubuntu-20\"\nJOB_INSTANCE os=windows version=18 tag=\"windows-18\"\nJOB_INSTANCE os=windows version=20 tag=\"windows-20\"\nJOB_INSTANCE os=macos version=18 tag=\"macos-18\"\nJOB_INSTANCE os=macos version=20 tag=\"macos-20\"\nMATRIX_TOTAL instances=6 excluded=0"
      },
      {
        "label": "Multiples exclusions croisées",
        "stdin": "cas:2",
        "expected": "JOB_INSTANCE os=ubuntu version=10 tag=\"ubuntu-10\"\nJOB_INSTANCE os=ubuntu version=11 tag=\"ubuntu-11\"\nJOB_INSTANCE os=ubuntu version=12 tag=\"ubuntu-12\"\nJOB_INSTANCE os=windows version=12 tag=\"windows-12\"\nMATRIX_TOTAL instances=4 excluded=2"
      },
      {
        "label": "Toutes les combinaisons d’un OS exclues",
        "stdin": "cas:3",
        "expected": "JOB_INSTANCE os=linux version=1.0 tag=\"linux-1.0\"\nMATRIX_TOTAL instances=1 excluded=1"
      }
    ],
    "solution": "[Exemple]\nJOB_INSTANCE os=ubuntu version=3.11 tag=\"ubuntu-3.11\"\nJOB_INSTANCE os=ubuntu version=3.12 tag=\"ubuntu-3.12\"\nJOB_INSTANCE os=macos version=3.12 tag=\"macos-3.12\"\nMATRIX_TOTAL instances=3 excluded=1\n\n[Cas 1 — Matrice 3x2 complète sans aucune exclusion]\nJOB_INSTANCE os=ubuntu version=18 tag=\"ubuntu-18\"\nJOB_INSTANCE os=ubuntu version=20 tag=\"ubuntu-20\"\nJOB_INSTANCE os=windows version=18 tag=\"windows-18\"\nJOB_INSTANCE os=windows version=20 tag=\"windows-20\"\nJOB_INSTANCE os=macos version=18 tag=\"macos-18\"\nJOB_INSTANCE os=macos version=20 tag=\"macos-20\"\nMATRIX_TOTAL instances=6 excluded=0\n\n[Cas 2 — Multiples exclusions croisées]\nJOB_INSTANCE os=ubuntu version=10 tag=\"ubuntu-10\"\nJOB_INSTANCE os=ubuntu version=11 tag=\"ubuntu-11\"\nJOB_INSTANCE os=ubuntu version=12 tag=\"ubuntu-12\"\nJOB_INSTANCE os=windows version=12 tag=\"windows-12\"\nMATRIX_TOTAL instances=4 excluded=2\n\n[Cas 3 — Toutes les combinaisons d’un OS exclues]\nJOB_INSTANCE os=linux version=1.0 tag=\"linux-1.0\"\nMATRIX_TOTAL instances=1 excluded=1"
  },
  {
    "id": "gh3-c5-e3",
    "chapter": 5,
    "title": "Détecteur d’injections de commandes et fuites de secrets dans les Actions",
    "level": "n3",
    "language": "analyse",
    "goal": "Auditer les étapes de scripts GitHub Actions pour détecter les failles d’injection de commande et divulgation de secrets.",
    "brief": "<p>Dans GitHub Actions, l’utilisation imprudente d’expressions de contexte dans la directive <code>run:</code> expose le runner à une exécution de code arbitraire (RCE) ou à l'exfiltration de jetons secrets.<br><br>\nVulnérabilités à détecter :<br>\n1. <strong>Fuite de secret (Secret Leak)</strong> : présence de <code>secrets.</code> ou <code>GITHUB_TOKEN</code> à l'intérieur d'une commande <code>echo</code> ou <code>print</code>.<br>\n   -> Verdict : <code>VULN_EXPOSED_SECRET</code>.<br>\n2. <strong>Injection de commande shell</strong> : concaténation directe d'entrées utilisateur non fiables au sein de la ligne de commande <code>run:</code>, telles que <code>${{ github.event.issue.title }}</code>, <code>${{ github.event.issue.body }}</code>, <code>${{ github.event.comment.body }}</code>, <code>${{ github.head_ref }}</code>.<br>\n   (La bonne pratique est de passer par des variables d'environnement <code>env:</code>).<br>\n   -> Verdict : <code>VULN_COMMAND_INJECTION</code>.<br>\n3. Sinon : étape conforme (<code>SECURE</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque étape, afficher :<br>\n<code>ACTION_AUDIT step={id} status={SECURE|VULN_EXPOSED_SECRET|VULN_COMMAND_INJECTION}</code></p>",
    "starter": "# Grille d'analyse (gh3-c5-e3) — Détecteur d’injections de commandes et fuites de secrets dans les Actions\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Commande saine avec variable d’environnement sécurisée]\n# Données : STEP_INSPECT id=OK1 cmd=pytest tests/\n# Données : STEP_INSPECT id=OK2 cmd=echo \"Build version $BUILD_NUM\"\nA_COMPLETER\n\n[Cas 2 — Injection via corps de commentaire ou head_ref]\n# Données : STEP_INSPECT id=INJ1 cmd=git checkout ${{ github.head_ref }}\n# Données : STEP_INSPECT id=INJ2 cmd=python process.py \"${{ github.event.comment.body }}\"\nA_COMPLETER\n\n[Cas 3 — Fuite du jeton GITHUB_TOKEN]\n# Données : STEP_INSPECT id=L1 cmd=echo \"Token is ${{ secrets.GITHUB_TOKEN }}\"\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "ACTION_AUDIT step=OK1 status=SECURE\nACTION_AUDIT step=OK2 status=SECURE"
      },
      {
        "label": "Injection via corps de commentaire ou head_ref",
        "stdin": "cas:2",
        "expected": "ACTION_AUDIT step=INJ1 status=VULN_COMMAND_INJECTION\nACTION_AUDIT step=INJ2 status=VULN_COMMAND_INJECTION"
      },
      {
        "label": "Fuite du jeton GITHUB_TOKEN",
        "stdin": "cas:3",
        "expected": "ACTION_AUDIT step=L1 status=VULN_EXPOSED_SECRET"
      }
    ],
    "solution": "[Exemple]\nACTION_AUDIT step=1 status=VULN_COMMAND_INJECTION\nACTION_AUDIT step=2 status=VULN_EXPOSED_SECRET\n\n[Cas 1 — Commande saine avec variable d’environnement sécurisée]\nACTION_AUDIT step=OK1 status=SECURE\nACTION_AUDIT step=OK2 status=SECURE\n\n[Cas 2 — Injection via corps de commentaire ou head_ref]\nACTION_AUDIT step=INJ1 status=VULN_COMMAND_INJECTION\nACTION_AUDIT step=INJ2 status=VULN_COMMAND_INJECTION\n\n[Cas 3 — Fuite du jeton GITHUB_TOKEN]\nACTION_AUDIT step=L1 status=VULN_EXPOSED_SECRET"
  }
];
