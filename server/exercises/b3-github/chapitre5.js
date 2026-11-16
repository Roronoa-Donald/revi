'use strict';

module.exports = [
  {
    "id": "gh3-c5-e1",
    "chapter": 5,
    "title": "Validateur de structure de workflow GitHub Actions",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier un profil pédagogique simplifié de workflow GitHub Actions représenté sous forme de lignes.",
    "brief": "<p>Vérifiez un <strong>profil simplifié</strong> de workflow, et non un fichier YAML réel. Dans ce profil, le nom doit être non vide, au moins un déclencheur reconnu doit être présent et chaque job doit avoir un runner et au moins une étape. Ce ne sont pas des obligations universelles de GitHub Actions : le nom du workflow est facultatif, et un job peut appeler un workflow réutilisable avec une structure différente.<br><br>L'entrée contient <code>NAME=&lt;nom&gt;</code>, <code>TRIGGERS=&lt;événements séparés par des virgules&gt;</code> et zéro ou plusieurs lignes <code>JOB id=&lt;id&gt; runs_on=&lt;runner|NONE&gt; steps_count=&lt;n&gt;</code>. Les événements sont distincts et sans espaces ; seuls <code>push</code>, <code>pull_request</code>, <code>workflow_dispatch</code> et <code>schedule</code> sont reconnus par ce profil. Le nom peut contenir des espaces, mais pas de guillemet double ; les autres champs ne contiennent pas d'espaces. Les nombres sont des entiers de 0 à 2 147 483 647.<br><br>Vérifiez dans l'ordre le nom, les déclencheurs, l'existence de jobs, puis chaque job dans l'ordre d'entrée (runner avant étapes). Affichez <code>WORKFLOW_AUDIT name=\"{nom}\" status={VALID|MISSING_NAME|MISSING_TRIGGERS|NO_JOBS|JOB_MISSING_RUNS_ON|JOB_ZERO_STEPS} triggers_count={n} jobs_count={m}</code>. Comptez uniquement les déclencheurs reconnus et tous les jobs déclarés.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e1) — Validateur de structure de workflow GitHub Actions\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Vérifiez d’abord les conditions globales, puis les jobs dans l’ordre de déclaration.",
      "Retournez uniquement le premier motif d’échec tout en comptant tous les jobs.",
      "1. Compter les déclencheurs reconnus. 2. Compter les jobs et noter la première anomalie (runner NONE ou zéro étape). 3. Statut : nom manquant, puis déclencheurs, puis jobs, puis anomalie ; sinon VALID."
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
        "label": "Nom vide prioritaire sur les autres erreurs",
        "stdin": "NAME=\nTRIGGERS=\nJOB id=test runs_on=NONE steps_count=0",
        "expected": "WORKFLOW_AUDIT name=\"\" status=MISSING_NAME triggers_count=0 jobs_count=1"
      },
      {
        "label": "Aucun job avec un événement reconnu",
        "stdin": "NAME=Minimum\nTRIGGERS=push",
        "expected": "WORKFLOW_AUDIT name=\"Minimum\" status=NO_JOBS triggers_count=1 jobs_count=0"
      },
      {
        "label": "Premier job sans étape avant un second sans runner",
        "stdin": "NAME=Priorité\nTRIGGERS=push\nJOB id=a runs_on=linux steps_count=0\nJOB id=b runs_on=NONE steps_count=1",
        "expected": "WORKFLOW_AUDIT name=\"Priorité\" status=JOB_ZERO_STEPS triggers_count=1 jobs_count=2"
      },
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
    "solution": "#!/usr/bin/env bash\nname=\ntriggers_count=0\njobs_count=0\njob_error=\njob_pattern='^JOB id=([^[:space:]]+) runs_on=([^[:space:]]+) steps_count=([0-9]+)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  case $line in\n    NAME=*) name=${line#NAME=} ;;\n    TRIGGERS=*)\n      IFS=, read -r -a triggers <<< \"${line#TRIGGERS=}\"\n      triggers_count=0\n      for trigger in \"${triggers[@]}\"; do\n        case $trigger in\n          push|pull_request|workflow_dispatch|schedule) ((triggers_count += 1)) ;;\n        esac\n      done\n      ;;\n    JOB\\ *)\n      if [[ $line =~ $job_pattern ]]; then\n        runner=${BASH_REMATCH[2]}\n        steps=${BASH_REMATCH[3]}\n        ((jobs_count += 1))\n        if [[ -z $job_error ]]; then\n          if [[ $runner == NONE ]]; then\n            job_error=JOB_MISSING_RUNS_ON\n          elif ((10#$steps == 0)); then\n            job_error=JOB_ZERO_STEPS\n          fi\n        fi\n      fi\n      ;;\n  esac\ndone\nif [[ ! $name =~ [^[:space:]] ]]; then\n  status=MISSING_NAME\nelif ((triggers_count == 0)); then\n  status=MISSING_TRIGGERS\nelif ((jobs_count == 0)); then\n  status=NO_JOBS\nelif [[ -n $job_error ]]; then\n  status=$job_error\nelse\n  status=VALID\nfi\nprintf 'WORKFLOW_AUDIT name=\"%s\" status=%s triggers_count=%s jobs_count=%s\\n' \"$name\" \"$status\" \"$triggers_count\" \"$jobs_count\"\n",
    "takeaway": "Un workflow GitHub Actions fiable déclare déclencheurs explicites, permissions minimales et enchaînement clair des jobs et étapes."
  },
  {
    "id": "gh3-c5-e2",
    "chapter": 5,
    "title": "Générateur et évaluateur de matrice de build (strategy: matrix)",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer le produit cartésien des axes d’une matrice de test GitHub Actions et gérer les exclusions.",
    "brief": "<p>Simulez une matrice GitHub Actions avec deux axes. L'entrée commence par <code>MATRIX_DEF os=&lt;os1,os2,...&gt; version=&lt;v1,v2,...&gt;</code>, suivie de zéro ou plusieurs exclusions <code>EXCLUDE os=&lt;os&gt; version=&lt;v&gt;</code>. Chaque valeur d'axe est distincte, non vide et composée de lettres, chiffres, points, tirets ou soulignés ; un axe peut être entièrement vide.<br><br>Parcourez les OS dans leur ordre de déclaration et, pour chacun, les versions dans leur ordre de déclaration ; ce n'est pas un tri alphabétique. Retirez chaque paire exclue, sans compter plusieurs fois une exclusion répétée et sans compter les exclusions hors matrice. Pour chaque paire restante, affichez <code>JOB_INSTANCE os={os} version={v} tag=\"{os}-{v}\"</code>, puis <code>MATRIX_TOTAL instances={n} excluded={nb_paires_retirées}</code>. Cet ordre de génération ne garantit pas l'ordre réel d'exécution des jobs parallèles.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e2) — Générateur et évaluateur de matrice de build (strategy: matrix)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Parcourez les valeurs des deux axes avec deux boucles imbriquées, dans leur ordre d’entrée.",
      "Stockez les exclusions comme ensemble de paires ; comptez uniquement les paires effectivement retirées.",
      "1. Mémoriser les deux axes et les exclusions en paires. 2. Double boucle dans l’ordre de déclaration. 3. Paire exclue : compter l’exclusion ; sinon émettre une instance avec son tag. 4. Afficher instances et excluded."
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
        "label": "Axe vide",
        "stdin": "MATRIX_DEF os= version=1,2",
        "expected": "MATRIX_TOTAL instances=0 excluded=0"
      },
      {
        "label": "Ordre déclaré et exclusions répétées ou hors matrice",
        "stdin": "MATRIX_DEF os=z,a version=2,1\nEXCLUDE os=z version=2\nEXCLUDE os=z version=2\nEXCLUDE os=autre version=7",
        "expected": "JOB_INSTANCE os=z version=1 tag=\"z-1\"\nJOB_INSTANCE os=a version=2 tag=\"a-2\"\nJOB_INSTANCE os=a version=1 tag=\"a-1\"\nMATRIX_TOTAL instances=3 excluded=1"
      },
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
    "solution": "#!/usr/bin/env bash\ndeclare -A excluded_pairs=()\noperating_systems=()\nversions=()\ndefinition_pattern='^MATRIX_DEF os=([^[:space:]]*) version=([^[:space:]]*)$'\nexclude_pattern='^EXCLUDE os=([^[:space:]]+) version=([^[:space:]]+)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $definition_pattern ]]; then\n    IFS=, read -r -a operating_systems <<< \"${BASH_REMATCH[1]}\"\n    IFS=, read -r -a versions <<< \"${BASH_REMATCH[2]}\"\n  elif [[ $line =~ $exclude_pattern ]]; then\n    excluded_pairs[${BASH_REMATCH[1]}/${BASH_REMATCH[2]}]=1\n  fi\ndone\ninstances=0\nexcluded=0\nfor operating_system in \"${operating_systems[@]}\"; do\n  for version in \"${versions[@]}\"; do\n    key=$operating_system/$version\n    if [[ ${excluded_pairs[$key]+present} ]]; then\n      ((excluded += 1))\n    else\n      printf 'JOB_INSTANCE os=%s version=%s tag=\"%s-%s\"\\n' \"$operating_system\" \"$version\" \"$operating_system\" \"$version\"\n      ((instances += 1))\n    fi\n  done\ndone\nprintf 'MATRIX_TOTAL instances=%s excluded=%s\\n' \"$instances\" \"$excluded\"\n",
    "takeaway": "La stratégie matrix exécute un même job en parallèle sur plusieurs combinaisons OS/runtime sans dupliquer la configuration YAML."
  },
  {
    "id": "gh3-c5-e3",
    "chapter": 5,
    "title": "Détecteur d’injections de commandes et fuites de secrets dans les Actions",
    "level": "n3",
    "language": "shell",
    "goal": "Repérer quelques motifs explicites de divulgation et d’injection dans des commandes GitHub Actions.",
    "brief": "<p>Analysez chaque ligne <code>STEP_INSPECT id=&lt;id&gt; cmd=&lt;commande&gt;</code> avec les règles lexicales suivantes, dans cet ordre :<br>1. Si la commande contient le mot <code>echo</code> ou <code>print</code> et contient aussi <code>secrets.</code> ou <code>GITHUB_TOKEN</code>, affichez <code>VULN_EXPOSED_SECRET</code>.<br>2. Sinon, si elle contient une interpolation directe <code>${{ github.event.issue.title }}</code>, <code>${{ github.event.issue.body }}</code>, <code>${{ github.event.comment.body }}</code> ou <code>${{ github.head_ref }}</code>, affichez <code>VULN_COMMAND_INJECTION</code>. Les espaces autour du nom dans <code>${{ ... }}</code> sont facultatifs.<br>3. Sinon, affichez <code>SECURE</code>.<br><br>La sortie est <code>ACTION_AUDIT step={id} status={statut}</code>. Les identifiants sont sans espaces ; la commande peut en contenir. Ce détecteur est une heuristique limitée : <code>SECURE</code> signifie seulement qu'aucun des motifs indiqués n'a été trouvé, pas que la commande est sûre. Transmettre une valeur non fiable par une variable d'environnement évite son interpolation directe dans le script, mais il faut encore la citer et la valider selon son usage.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e3) — Détecteur d’injections de commandes et fuites de secrets dans les Actions\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Cherchez d’abord les mots echo ou print associés à un marqueur de secret.",
      "Cherchez ensuite les quatre interpolations explicites ; l’absence de ces motifs ne prouve pas la sécurité.",
      "1. echo ou print combiné à un secret : VULN_EXPOSED_SECRET. 2. Sinon, interpolation github.issue, github.comment ou github.head_ref : VULN_COMMAND_INJECTION. 3. Sinon : SECURE."
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
        "label": "Priorité du secret et mot distinct de echo",
        "stdin": "STEP_INSPECT id=both cmd=echo \"${{ github.event.issue.title }} ${{ secrets.TEST }}\"\nSTEP_INSPECT id=word cmd=echoer secrets.TEST",
        "expected": "ACTION_AUDIT step=both status=VULN_EXPOSED_SECRET\nACTION_AUDIT step=word status=SECURE"
      },
      {
        "label": "Interpolations avec et sans espaces",
        "stdin": "STEP_INSPECT id=a cmd=run ${{github.head_ref}}\nSTEP_INSPECT id=b cmd=run ${{  github.event.issue.body  }}\nSTEP_INSPECT id=c cmd=printf \"%s\" \"$TITLE\"",
        "expected": "ACTION_AUDIT step=a status=VULN_COMMAND_INJECTION\nACTION_AUDIT step=b status=VULN_COMMAND_INJECTION\nACTION_AUDIT step=c status=SECURE"
      },
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
    "solution": "#!/usr/bin/env bash\nline_pattern='^STEP_INSPECT id=([^[:space:]]+) cmd=(.*)$'\noutput_pattern='(^|[^[:alnum:]_])(echo|print)([^[:alnum:]_]|$)'\ninjection_pattern='\\$\\{\\{[[:space:]]*github\\.(event\\.issue\\.(title|body)|event\\.comment\\.body|head_ref)[[:space:]]*\\}\\}'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $line_pattern ]] || continue\n  id=${BASH_REMATCH[1]}\n  command=${BASH_REMATCH[2]}\n  if [[ $command =~ $output_pattern ]] && [[ $command == *secrets.* || $command == *GITHUB_TOKEN* ]]; then\n    status=VULN_EXPOSED_SECRET\n  elif [[ $command =~ $injection_pattern ]]; then\n    status=VULN_COMMAND_INJECTION\n  else\n    status=SECURE\n  fi\n  printf 'ACTION_AUDIT step=%s status=%s\\n' \"$id\" \"$status\"\ndone\n",
    "takeaway": "Interpoler directement des titres de PR ou entrées non fiables dans un bloc run: crée une faille d’injection de commandes shell en CI."
  }
];
