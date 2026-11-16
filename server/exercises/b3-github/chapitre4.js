'use strict';

module.exports = [
  {
    "id": "gh3-c4-e1",
    "chapter": 4,
    "title": "Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)",
    "level": "n1",
    "language": "shell",
    "goal": "Auditer la création d’une branche et ses opérations selon les règles de gouvernance de Git Flow ou GitHub Flow.",
    "brief": "<p>Auditez les règles <strong>choisies pour cette simulation</strong> ; elles ne décrivent pas toutes les variantes possibles de Git Flow ou GitHub Flow.<br><br>Pour <code>GIT_FLOW</code>, les branches <code>feature/*</code> et <code>release/*</code> partent de <code>develop</code>, les branches <code>hotfix/*</code> partent de <code>main</code> et un push direct sur <code>main</code> ou <code>develop</code> est interdit. Pour <code>GITHUB_FLOW</code>, les branches de travail partent de <code>main</code> et le push direct sur <code>main</code> est interdit. Le contrôle du push protégé est prioritaire ; les branches principales elles-mêmes ne sont pas soumises au contrôle de base.<br><br>Chaque ligne est <code>BRANCH_EVENT wf=&lt;GIT_FLOW|GITHUB_FLOW&gt; branch=&lt;nom&gt; base=&lt;nom&gt; direct_push=&lt;OUI|NON&gt;</code>. Les noms sont valides et sans espaces. Affichez <code>AUDIT branch={branch} status={CONFORME|VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH|BRANCHE_BASE_INVALIDE_ATTENDU_MAIN|BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP|REGLE_NON_DEFINIE}</code>. Pour une branche Git Flow qui ne correspond à aucun des cas énumérés, la règle est non définie.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e1) — Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Vérifiez d’abord le push direct vers une branche protégée.",
      "Pour une branche de travail connue, comparez sa base à celle imposée par le modèle choisi.",
      "1. Refuser tout push direct sur main ou develop. 2. GITHUB_FLOW : branche de travail basée sur main. 3. GIT_FLOW : feature et release sur develop, hotfix sur main. 4. Branche inconnue : REGLE_NON_DEFINIE."
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
        "label": "Release incorrecte et feature conforme",
        "stdin": "BRANCH_EVENT wf=GIT_FLOW branch=release/r1 base=main direct_push=NON\nBRANCH_EVENT wf=GIT_FLOW branch=feature/f1 base=develop direct_push=NON\nBRANCH_EVENT wf=GIT_FLOW branch=develop base=develop direct_push=OUI",
        "expected": "AUDIT branch=release/r1 status=BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP\nAUDIT branch=feature/f1 status=CONFORME\nAUDIT branch=develop status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH"
      },
      {
        "label": "Branche protégée et branche de travail GitHub Flow",
        "stdin": "BRANCH_EVENT wf=GITHUB_FLOW branch=main base=develop direct_push=OUI\nBRANCH_EVENT wf=GITHUB_FLOW branch=work base=develop direct_push=OUI",
        "expected": "AUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\nAUDIT branch=work status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN"
      },
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
    "solution": "#!/usr/bin/env bash\npattern='^BRANCH_EVENT wf=([^[:space:]]+) branch=([^[:space:]]+) base=([^[:space:]]+) direct_push=([^[:space:]]+)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  workflow=${BASH_REMATCH[1]}\n  branch=${BASH_REMATCH[2]}\n  base=${BASH_REMATCH[3]}\n  direct_push=${BASH_REMATCH[4]}\n  status=CONFORME\n  if [[ $direct_push == OUI && ( $branch == main || ( $workflow == GIT_FLOW && $branch == develop ) ) ]]; then\n    status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\n  elif [[ $workflow == GITHUB_FLOW ]]; then\n    if [[ $branch != main && $base != main ]]; then status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN; fi\n  elif [[ $workflow == GIT_FLOW ]]; then\n    case $branch in\n      main|develop) ;;\n      feature/*|release/*)\n        if [[ $base != develop ]]; then status=BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP; fi\n        ;;\n      hotfix/*)\n        if [[ $base != main ]]; then status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN; fi\n        ;;\n      *) status=REGLE_NON_DEFINIE ;;\n    esac\n  else\n    status=REGLE_NON_DEFINIE\n  fi\n  printf 'AUDIT branch=%s status=%s\\n' \"$branch\" \"$status\"\ndone\n",
    "takeaway": "GitHub Flow privilégie des branches courtes fusionnées en continu vers main, tandis que Git Flow sépare explicitement develop et release."
  },
  {
    "id": "gh3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de règles de protection de branches (Branch Protection Rules)",
    "level": "n2",
    "language": "shell",
    "goal": "Appliquer les critères de fusion de Pull Request (approbations requises, statuts CI, signature GPG).",
    "brief": "<p>Simulez une politique de protection de branche choisie pour cet exercice. Les règles GitHub sont configurables ; les signatures vérifiées ne se limitent pas nécessairement à GPG.<br><br>Une ligne <code>CONFIG min_approvals=&lt;n&gt; require_signed=&lt;OUI|NON&gt; linear_history=&lt;OUI|NON&gt;</code> précède les requêtes <code>MERGE_REQ pr=&lt;id&gt; approvals=&lt;n&gt; ci_status=&lt;PASS|FAIL|PENDING&gt; gpg_signed=&lt;OUI|NON&gt; merge_type=&lt;MERGE_COMMIT|SQUASH|REBASE&gt;</code>. Les nombres sont des entiers décimaux de 0 à 2 147 483 647.<br><br>Vérifiez dans l'ordre : le nombre d'approbations est au moins le minimum, la CI vaut PASS, une signature GPG est présente si elle est demandée et un merge commit est interdit si l'historique linéaire est demandé. Affichez le premier motif d'échec : <code>PR_MERGE pr={id} status={AUTHORIZED|BLOCKED} reason={OK|APPROVALS_INSUFFISANTS|CI_CHECKS_FAILED|SIGNATURE_GPG_REQUISE|HISTORIQUE_LINEAIRE_EXIGE}</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e2) — Contrôleur de règles de protection de branches (Branch Protection Rules)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Appliquez les quatre contrôles dans l’ordre indiqué.",
      "La borne d’approbations est inclusive : une égalité satisfait la règle.",
      "1. Approbations < minimum : refus. 2. CI différent de PASS : refus. 3. Signature exigée mais absente : refus. 4. Linéaire et MERGE_COMMIT : refus. 5. Sinon : AUTHORIZED."
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
        "label": "Zéro approbation requise et CI non terminée",
        "stdin": "CONFIG min_approvals=0 require_signed=NON linear_history=NON\nMERGE_REQ pr=zero approvals=0 ci_status=PASS gpg_signed=NON merge_type=SQUASH\nMERGE_REQ pr=pending approvals=0 ci_status=PENDING gpg_signed=NON merge_type=REBASE",
        "expected": "PR_MERGE pr=zero status=AUTHORIZED reason=OK\nPR_MERGE pr=pending status=BLOCKED reason=CI_CHECKS_FAILED"
      },
      {
        "label": "Bornes d’approbation et priorité du premier échec",
        "stdin": "CONFIG min_approvals=2 require_signed=OUI linear_history=OUI\nMERGE_REQ pr=below approvals=1 ci_status=FAIL gpg_signed=NON merge_type=MERGE_COMMIT\nMERGE_REQ pr=exact approvals=2 ci_status=PASS gpg_signed=OUI merge_type=SQUASH\nMERGE_REQ pr=linear approvals=2 ci_status=PASS gpg_signed=OUI merge_type=MERGE_COMMIT",
        "expected": "PR_MERGE pr=below status=BLOCKED reason=APPROVALS_INSUFFISANTS\nPR_MERGE pr=exact status=AUTHORIZED reason=OK\nPR_MERGE pr=linear status=BLOCKED reason=HISTORIQUE_LINEAIRE_EXIGE"
      },
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
      },
      {
        "label": "Historique linéaire avec approbations supérieures au minimum",
        "stdin": "CONFIG min_approvals=2 require_signed=OUI linear_history=OUI\nMERGE_REQ pr=linear approvals=3 ci_status=PASS gpg_signed=OUI merge_type=MERGE_COMMIT",
        "expected": "PR_MERGE pr=linear status=BLOCKED reason=HISTORIQUE_LINEAIRE_EXIGE"
      }
    ],
    "solution": "#!/usr/bin/env bash\nconfig_pattern='^CONFIG min_approvals=([0-9]+) require_signed=(OUI|NON) linear_history=(OUI|NON)$'\nrequest_pattern='^MERGE_REQ pr=([^[:space:]]+) approvals=([0-9]+) ci_status=([^[:space:]]+) gpg_signed=(OUI|NON) merge_type=([^[:space:]]+)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $config_pattern ]]; then\n    minimum=${BASH_REMATCH[1]}\n    require_signed=${BASH_REMATCH[2]}\n    linear_history=${BASH_REMATCH[3]}\n  elif [[ $line =~ $request_pattern ]]; then\n    pr=${BASH_REMATCH[1]}\n    approvals=${BASH_REMATCH[2]}\n    ci_status=${BASH_REMATCH[3]}\n    signed=${BASH_REMATCH[4]}\n    merge_type=${BASH_REMATCH[5]}\n    status=BLOCKED\n    if ((10#$approvals < 10#$minimum)); then\n      reason=APPROVALS_INSUFFISANTS\n    elif [[ $ci_status != PASS ]]; then\n      reason=CI_CHECKS_FAILED\n    elif [[ $require_signed == OUI && $signed != OUI ]]; then\n      reason=SIGNATURE_GPG_REQUISE\n    elif [[ $linear_history == OUI && $merge_type == MERGE_COMMIT ]]; then\n      reason=HISTORIQUE_LINEAIRE_EXIGE\n    else\n      status=AUTHORIZED\n      reason=OK\n    fi\n    printf 'PR_MERGE pr=%s status=%s reason=%s\\n' \"$pr\" \"$status\" \"$reason\"\n  fi\ndone\n",
    "takeaway": "Les règles de protection de branche imposent revue de code, checks CI verts et historique linéaire avant d’autoriser toute fusion."
  },
  {
    "id": "gh3-c4-e3",
    "chapter": 4,
    "title": "Analyseur sémantique de commits selon Conventional Commits",
    "level": "n3",
    "language": "shell",
    "goal": "Analyser des messages de commit selon un sous-ensemble explicite de Conventional Commits.",
    "brief": "<p>Les Conventional Commits structurent les messages ; cet exercice applique un <strong>sous-ensemble</strong> et des règles supplémentaires, pas une validation complète de la spécification.<br><br>Chaque ligne est <code>COMMIT_MSG id=&lt;id&gt; msg=&lt;message&gt;</code>. Le message tient sur une ligne et suit le format <code>&lt;type&gt;[(&lt;scope&gt;)][!]: &lt;description&gt;</code>. Le type doit être en minuscules et appartenir à <code>feat, fix, docs, refactor, test, chore, perf, ci</code> ; la spécification générale accepte aussi d'autres types. Le scope optionnel est non vide et composé de lettres ASCII, chiffres, tirets ou soulignés. Un espace suit obligatoirement les deux-points et la description contient au moins un caractère non blanc.<br><br>Pour ce modèle, un <code>!</code> ou la chaîne <code>BREAKING CHANGE</code> dans le message donne <code>breaking=OUI</code>. La spécification complète prévoit notamment un pied de message <code>BREAKING CHANGE: ...</code> ; une simple mention dans la description ne suffit pas nécessairement dans un vrai commit.<br><br>Affichez <code>CONVENTIONAL_AUDIT id={id} valid=OUI type={type} scope={scope|NONE} breaking={OUI|NON}</code> ou <code>CONVENTIONAL_AUDIT id={id} valid=NON error={FORMAT_INVALIDE|TYPE_INCONNU|DESCRIPTION_VIDE}</code>. Vérifiez d'abord le format, puis le type, puis la description.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e3) — Analyseur sémantique de commits selon Conventional Commits\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Repérez le type, le scope optionnel, le marqueur ! et la description avant de vérifier la liste des types.",
      "Distinguez un séparateur mal formé d’une description vide, puis recherchez le marqueur de rupture demandé par le modèle.",
      "1. Décomposer type, scope optionnel, ! et description. 2. Type hors liste : TYPE_INCONNU. 3. Séparateur incorrect : FORMAT_INVALIDE. 4. Description vide : refus. 5. ! ou BREAKING CHANGE : breaking=OUI."
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
        "label": "Marqueur ! avec ou sans scope et absence de rupture",
        "stdin": "COMMIT_MSG id=40 msg=fix!: correction majeure\nCOMMIT_MSG id=41 msg=feat(api)!: nouveau protocole\nCOMMIT_MSG id=42 msg=feat(api): ajout compatible",
        "expected": "CONVENTIONAL_AUDIT id=40 valid=OUI type=fix scope=NONE breaking=OUI\nCONVENTIONAL_AUDIT id=41 valid=OUI type=feat scope=api breaking=OUI\nCONVENTIONAL_AUDIT id=42 valid=OUI type=feat scope=api breaking=NON"
      },
      {
        "label": "Type exclu, description vide et séparateur incorrect",
        "stdin": "COMMIT_MSG id=43 msg=style: réorganisation\nCOMMIT_MSG id=44 msg=fix: \nCOMMIT_MSG id=45 msg=feat:sans espace",
        "expected": "CONVENTIONAL_AUDIT id=43 valid=NON error=TYPE_INCONNU\nCONVENTIONAL_AUDIT id=44 valid=NON error=DESCRIPTION_VIDE\nCONVENTIONAL_AUDIT id=45 valid=NON error=FORMAT_INVALIDE"
      },
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
    "solution": "#!/usr/bin/env bash\nexport LC_ALL=C\nline_pattern='^COMMIT_MSG id=([^[:space:]]+) msg=(.*)$'\nmessage_pattern='^([a-z]+)(\\(([[:alnum:]_-]+)\\))?(!)?: (.*)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $line_pattern ]] || continue\n  id=${BASH_REMATCH[1]}\n  message=${BASH_REMATCH[2]}\n  if [[ ! $message =~ $message_pattern ]]; then\n    printf 'CONVENTIONAL_AUDIT id=%s valid=NON error=FORMAT_INVALIDE\\n' \"$id\"\n    continue\n  fi\n  type=${BASH_REMATCH[1]}\n  scope=${BASH_REMATCH[3]:-NONE}\n  marker=${BASH_REMATCH[4]}\n  description=${BASH_REMATCH[5]}\n  case $type in\n    feat|fix|docs|refactor|test|chore|perf|ci) ;;\n    *) printf 'CONVENTIONAL_AUDIT id=%s valid=NON error=TYPE_INCONNU\\n' \"$id\"; continue ;;\n  esac\n  if [[ ! $description =~ [^[:space:]] ]]; then\n    printf 'CONVENTIONAL_AUDIT id=%s valid=NON error=DESCRIPTION_VIDE\\n' \"$id\"\n    continue\n  fi\n  breaking=NON\n  if [[ $marker == '!' || $message == *'BREAKING CHANGE'* ]]; then breaking=OUI; fi\n  printf 'CONVENTIONAL_AUDIT id=%s valid=OUI type=%s scope=%s breaking=%s\\n' \"$id\" \"$type\" \"$scope\" \"$breaking\"\ndone\n",
    "takeaway": "Conventional Commits normalise type, portée et BREAKING CHANGE pour automatiser génération de changelog et versionnage sémantique."
  }
];
