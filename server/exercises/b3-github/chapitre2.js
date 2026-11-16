'use strict';

module.exports = [
  {
    "id": "gh3-c2-e1",
    "chapter": 2,
    "title": "Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge",
    "level": "n1",
    "language": "shell",
    "goal": "Déterminer si une fusion de branches peut s’effectuer en Fast-Forward ou requiert un 3-Way Merge avec commit de fusion.",
    "brief": "<p>Dans ce modèle de graphe Git, une avance rapide est possible lorsque le commit courant est un ancêtre du commit à intégrer. Si le commit à intégrer est déjà un ancêtre du commit courant, rien n'est à fusionner. Deux historiques divergents avec au moins une base commune demandent ici une fusion à trois voies ; Git refuse par défaut la fusion d'historiques sans ancêtre commun.<br><br>Déclarez d'abord les commits par <code>COMMIT id=&lt;id&gt; parents=&lt;p1,p2,...|NONE&gt;</code>, puis les branches par <code>BRANCH name=&lt;nom&gt; commit=&lt;id&gt;</code>, puis une ou plusieurs requêtes <code>MERGE_REQUEST current=&lt;branche&gt; incoming=&lt;branche&gt;</code>. Les identifiants sont distincts et sans espaces ; tous les parents et branches demandées existent, et le graphe est acyclique.<br><br>Pour chaque requête, affichez <code>MERGE_STRATEGY from={incoming} into={current} type={FAST_FORWARD|ALREADY_UP_TO_DATE|THREE_WAY_MERGE|NO_COMMON_ANCESTOR} lca={bases}</code>. <code>lca</code> vaut <code>NONE</code> sans base commune ; sinon, indiquez toutes les meilleures bases communes, triées par ordre des octets et séparées par des virgules. Une meilleure base commune n'est ancêtre d'aucune autre base commune distincte. Les options de fusion particulières ne sont pas modélisées.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e1) — Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Constituez les ensembles d’ancêtres en incluant chaque tête elle-même.",
      "Éliminez les ancêtres communs qui sont eux-mêmes ancêtres d’un autre ancêtre commun ; plusieurs meilleures bases peuvent subsister.",
      "1. Ancêtres de chaque tête, tête incluse. 2. Intersection ; écarter un commun ancêtre d’un autre commun. 3. Base ancêtre de la cible : FAST_FORWARD, sinon 3-WAY ou déjà à jour. 4. Bases finales triées."
    ],
    "examples": [
      {
        "stdin": "COMMIT id=C1 parents=NONE\nCOMMIT id=C2 parents=C1\nCOMMIT id=C3 parents=C2\nBRANCH name=main commit=C1\nBRANCH name=feature commit=C3\nMERGE_REQUEST current=main incoming=feature",
        "expected": "MERGE_STRATEGY from=feature into=main type=FAST_FORWARD lca=C1",
        "note": "C1 est un ancêtre de C3 : le pointeur peut avancer rapidement."
      }
    ],
    "tests": [
      {
        "label": "Branches identiques ou déjà intégrées",
        "stdin": "COMMIT id=A parents=NONE\nCOMMIT id=B parents=A\nBRANCH name=main commit=B\nBRANCH name=same commit=B\nBRANCH name=old commit=A\nMERGE_REQUEST current=main incoming=same\nMERGE_REQUEST current=main incoming=old",
        "expected": "MERGE_STRATEGY from=same into=main type=ALREADY_UP_TO_DATE lca=B\nMERGE_STRATEGY from=old into=main type=ALREADY_UP_TO_DATE lca=A"
      },
      {
        "label": "Deux meilleures bases et historique sans parent commun",
        "stdin": "COMMIT id=R parents=NONE\nCOMMIT id=A parents=R\nCOMMIT id=B parents=R\nCOMMIT id=M1 parents=A,B\nCOMMIT id=M2 parents=B,A\nCOMMIT id=U parents=NONE\nBRANCH name=main commit=M1\nBRANCH name=other commit=M2\nBRANCH name=unrelated commit=U\nMERGE_REQUEST current=main incoming=other\nMERGE_REQUEST current=main incoming=unrelated",
        "expected": "MERGE_STRATEGY from=other into=main type=THREE_WAY_MERGE lca=A,B\nMERGE_STRATEGY from=unrelated into=main type=NO_COMMON_ANCESTOR lca=NONE"
      },
      {
        "label": "Branches divergentes nécessitant un Three-Way Merge",
        "stdin": "COMMIT id=C1 parents=NONE\nCOMMIT id=C2 parents=C1\nCOMMIT id=C3 parents=C1\nBRANCH name=main commit=C2\nBRANCH name=feature commit=C3\nMERGE_REQUEST current=main incoming=feature",
        "expected": "MERGE_STRATEGY from=feature into=main type=THREE_WAY_MERGE lca=C1"
      },
      {
        "label": "Arborescence plus profonde avec Fast-Forward valide",
        "stdin": "COMMIT id=A parents=NONE\nCOMMIT id=B parents=A\nCOMMIT id=C parents=B\nCOMMIT id=D parents=C\nBRANCH name=prod commit=B\nBRANCH name=release commit=D\nMERGE_REQUEST current=prod incoming=release",
        "expected": "MERGE_STRATEGY from=release into=prod type=FAST_FORWARD lca=B"
      },
      {
        "label": "Divergence après plusieurs commits communs",
        "stdin": "COMMIT id=R1 parents=NONE\nCOMMIT id=R2 parents=R1\nCOMMIT id=M1 parents=R2\nCOMMIT id=M2 parents=M1\nCOMMIT id=F1 parents=R2\nBRANCH name=main commit=M2\nBRANCH name=hotfix commit=F1\nMERGE_REQUEST current=main incoming=hotfix",
        "expected": "MERGE_STRATEGY from=hotfix into=main type=THREE_WAY_MERGE lca=R2"
      },
      {
        "label": "Deux branches sur la même racine",
        "stdin": "COMMIT id=A parents=NONE\nBRANCH name=main commit=A\nBRANCH name=feature commit=A\nMERGE_REQUEST current=main incoming=feature",
        "expected": "MERGE_STRATEGY from=feature into=main type=ALREADY_UP_TO_DATE lca=A"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -o pipefail\nexport LC_ALL=C\ndeclare -A parents=() branches=()\ncommit_pattern='^COMMIT id=([^[:space:]]+) parents=([^[:space:]]+)$'\nbranch_pattern='^BRANCH name=([^[:space:]]+) commit=([^[:space:]]+)$'\nrequest_pattern='^MERGE_REQUEST current=([^[:space:]]+) incoming=([^[:space:]]+)$'\ncollect_ancestors() {\n  local root=$1\n  local -n result=$2\n  local -a queue=(\"$root\") parent_list=()\n  local offset=0 node parent parent_text\n  result=()\n  while ((offset < ${#queue[@]})); do\n    node=${queue[offset]}\n    ((offset += 1))\n    [[ ${result[$node]+present} ]] && continue\n    result[$node]=1\n    parent_text=${parents[$node]}\n    [[ $parent_text == NONE ]] && continue\n    IFS=, read -r -a parent_list <<< \"$parent_text\"\n    for parent in \"${parent_list[@]}\"; do\n      queue+=(\"$parent\")\n    done\n  done\n}\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $commit_pattern ]]; then\n    parents[${BASH_REMATCH[1]}]=${BASH_REMATCH[2]}\n  elif [[ $line =~ $branch_pattern ]]; then\n    branches[${BASH_REMATCH[1]}]=${BASH_REMATCH[2]}\n  elif [[ $line =~ $request_pattern ]]; then\n    current=${BASH_REMATCH[1]}\n    incoming=${BASH_REMATCH[2]}\n    base=${branches[$current]}\n    target=${branches[$incoming]}\n    declare -A current_ancestors=() incoming_ancestors=() ancestors_other=()\n    collect_ancestors \"$base\" current_ancestors\n    collect_ancestors \"$target\" incoming_ancestors\n    common=()\n    best=()\n    for candidate in \"${!current_ancestors[@]}\"; do\n      [[ ${incoming_ancestors[$candidate]+present} ]] && common+=(\"$candidate\")\n    done\n    for candidate in \"${common[@]}\"; do\n      is_best=1\n      for other in \"${common[@]}\"; do\n        [[ $candidate == \"$other\" ]] && continue\n        collect_ancestors \"$other\" ancestors_other\n        if [[ ${ancestors_other[$candidate]+present} ]]; then\n          is_best=0\n          break\n        fi\n      done\n      ((is_best)) && best+=(\"$candidate\")\n    done\n    if ((${#best[@]} == 0)); then\n      strategy=NO_COMMON_ANCESTOR\n      lca=NONE\n    else\n      lca=$(printf '%s\\n' \"${best[@]}\" | sort | paste -sd, -)\n      if [[ ${current_ancestors[$target]+present} ]]; then\n        strategy=ALREADY_UP_TO_DATE\n      elif [[ ${incoming_ancestors[$base]+present} ]]; then\n        strategy=FAST_FORWARD\n      else\n        strategy=THREE_WAY_MERGE\n      fi\n    fi\n    printf 'MERGE_STRATEGY from=%s into=%s type=%s lca=%s\\n' \"$incoming\" \"$current\" \"$strategy\" \"$lca\"\n  fi\ndone\n",
    "takeaway": "Fast-Forward avance simplement le pointeur quand l’historique est linéaire, alors qu’un 3-Way Merge crée un commit de fusion à deux parents."
  },
  {
    "id": "gh3-c2-e2",
    "chapter": 2,
    "title": "Simulateur de Rebase Interactif (git rebase -i)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler l’exécution des instructions de réécriture d’historique git-rebase-todo (pick, squash, reword, drop).",
    "brief": "<p>Le rebase interactif permet de réorganiser une série de commits. Simulez ici les actions <code>pick</code> et <code>reword</code> (ajouter le commit et son message fourni), <code>drop</code> (ignorer le commit) et <code>squash</code> (ajouter le message au dernier commit conservé, avec le séparateur <code> + </code>). Les identifiants sont fictifs et ne sont pas de nouveaux hachages Git.<br><br>Chaque ligne est <code>TODO action=&lt;action&gt; commit=&lt;id&gt; msg=&lt;message&gt;</code> ; <code>msg</code> est omis pour <code>drop</code>. Les messages tiennent sur une ligne et ne contiennent pas de guillemet double. Une entrée vide produit un historique vide. Si <code>squash</code> n'a aucun commit précédent, affichez uniquement <code>REBASE_ERROR reason=SQUASH_WITHOUT_PREVIOUS</code>.<br><br>Sinon, affichez chaque commit conservé dans l'ordre : <code>REBASED_COMMIT id={id} msg=\"{message}\"</code>, puis <code>REBASE_SUMMARY total_commits={n}</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e2) — Simulateur de Rebase Interactif (git rebase -i)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Conservez deux listes parallèles pour les identifiants et les messages.",
      "Un squash modifie seulement le dernier message conservé ; drop ne crée aucune entrée.",
      "1. Parcourir les TODO dans l’ordre. 2. pick ou reword : ajouter id et message. 3. squash : concaténer au dernier conservé ; sans précédent : erreur. 4. drop : ignorer. 5. Afficher les commits puis le total."
    ],
    "examples": [
      {
        "stdin": "TODO action=pick commit=C1 msg=feat: ajout login\nTODO action=squash commit=C2 msg=fix: correction typo\nTODO action=reword commit=C3 msg=feat: ajout logout propre",
        "expected": "REBASED_COMMIT id=C1 msg=\"feat: ajout login + fix: correction typo\"\nREBASED_COMMIT id=C3 msg=\"feat: ajout logout propre\"\nREBASE_SUMMARY total_commits=2",
        "note": "C2 a été écrasé (squashed) dans C1, C3 a son message réécrit."
      }
    ],
    "tests": [
      {
        "label": "Historique vide",
        "stdin": "",
        "expected": "REBASE_SUMMARY total_commits=0"
      },
      {
        "label": "Squash sans commit précédent",
        "stdin": "TODO action=squash commit=solo msg=impossible",
        "expected": "REBASE_ERROR reason=SQUASH_WITHOUT_PREVIOUS"
      },
      {
        "label": "Suppression de commit avec drop",
        "stdin": "TODO action=pick commit=A1 msg=Initial skeleton\nTODO action=drop commit=A2\nTODO action=pick commit=A3 msg=Ajout module BDD",
        "expected": "REBASED_COMMIT id=A1 msg=\"Initial skeleton\"\nREBASED_COMMIT id=A3 msg=\"Ajout module BDD\"\nREBASE_SUMMARY total_commits=2"
      },
      {
        "label": "Plusieurs squashs consécutifs",
        "stdin": "TODO action=pick commit=10 msg=Feature base\nTODO action=squash commit=11 msg=WIP test 1\nTODO action=squash commit=12 msg=WIP test 2\nTODO action=pick commit=13 msg=Docs",
        "expected": "REBASED_COMMIT id=10 msg=\"Feature base + WIP test 1 + WIP test 2\"\nREBASED_COMMIT id=13 msg=\"Docs\"\nREBASE_SUMMARY total_commits=2"
      },
      {
        "label": "Tous les commits conservés sans modification",
        "stdin": "TODO action=pick commit=K1 msg=Premier commit\nTODO action=pick commit=K2 msg=Second commit",
        "expected": "REBASED_COMMIT id=K1 msg=\"Premier commit\"\nREBASED_COMMIT id=K2 msg=\"Second commit\"\nREBASE_SUMMARY total_commits=2"
      }
    ],
    "solution": "#!/usr/bin/env bash\nids=()\nmessages=()\npattern='^TODO action=([^[:space:]]+) commit=([^[:space:]]+)( msg=(.*))?$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  action=${BASH_REMATCH[1]}\n  commit=${BASH_REMATCH[2]}\n  message=${BASH_REMATCH[4]}\n  case $action in\n    pick|reword)\n      ids+=(\"$commit\")\n      messages+=(\"$message\")\n      ;;\n    squash)\n      if ((${#ids[@]} == 0)); then\n        printf 'REBASE_ERROR reason=SQUASH_WITHOUT_PREVIOUS\\n'\n        exit 0\n      fi\n      last=$((${#ids[@]} - 1))\n      messages[last]+=\" + $message\"\n      ;;\n    drop) ;;\n  esac\ndone\nfor ((index = 0; index < ${#ids[@]}; index += 1)); do\n  printf 'REBASED_COMMIT id=%s msg=\"%s\"\\n' \"${ids[index]}\" \"${messages[index]}\"\ndone\nprintf 'REBASE_SUMMARY total_commits=%s\\n' \"${#ids[@]}\"\n",
    "takeaway": "git rebase -i réécrit proprement une série de commits locaux (pick, squash, fixup, drop) avant publication, mais reste proscrit sur main."
  },
  {
    "id": "gh3-c2-e3",
    "chapter": 2,
    "title": "Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)",
    "level": "n3",
    "language": "shell",
    "goal": "Appliquer l’algorithme de fusion à 3 voies ligne à ligne pour détecter les modifications unilatérales et les conflits.",
    "brief": "<p>Simulez une fusion à trois voies sur des valeurs fournies ligne par ligne. Pour chaque ligne <code>LINE idx=&lt;id&gt; base=&lt;valeur&gt; ours=&lt;valeur&gt; theirs=&lt;valeur&gt;</code>, les valeurs peuvent être vides ou contenir des espaces, mais pas de guillemet double ni les délimiteurs littéraux <code> ours=</code> et <code> theirs=</code>.<br><br>Si les trois valeurs sont égales, conservez la base (<code>CLEAN</code>). Si seul <code>ours</code> diffère, conservez-le (<code>RESOLVED_OURS</code>) ; si seul <code>theirs</code> diffère, conservez-le (<code>RESOLVED_THEIRS</code>). Si les deux valeurs modifiées sont égales, conservez-les (<code>RESOLVED_SAME</code>). Sinon, il y a <code>CONFLICT</code>.<br><br>Sans conflit, affichez <code>MERGE idx={id} status={statut} val=\"{valeur}\"</code>. En cas de conflit, affichez <code>MERGE idx={id} status=CONFLICT ours=\"{ours}\" theirs=\"{theirs}\"</code>. Ce modèle ligne à ligne ne reproduit pas tous les comportements du moteur de fusion Git.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e3) — Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Comparez d’abord les deux versions à la base.",
      "Un conflit exige deux modifications différentes ; deux changements identiques se résolvent ensemble.",
      "1. Ours et theirs identiques à la base : CLEAN. 2. Seul ours modifié : RESOLVED_OURS ; seul theirs : RESOLVED_THEIRS. 3. Deux versions identiques : RESOLVED_SAME. 4. Sinon : CONFLICT."
    ],
    "examples": [
      {
        "stdin": "LINE idx=1 base=port = 80 ours=port = 443 theirs=port = 80\nLINE idx=2 base=timeout = 30 ours=timeout = 60 theirs=timeout = 120",
        "expected": "MERGE idx=1 status=RESOLVED_OURS val=\"port = 443\"\nMERGE idx=2 status=CONFLICT ours=\"timeout = 60\" theirs=\"timeout = 120\"",
        "note": "Ligne 1 résolue en faveur de ours, ligne 2 en conflit."
      }
    ],
    "tests": [
      {
        "label": "Valeurs vides et modification identique",
        "stdin": "LINE idx=0 base= ours= theirs=\nLINE idx=1 base=old ours=new theirs=new",
        "expected": "MERGE idx=0 status=CLEAN val=\"\"\nMERGE idx=1 status=RESOLVED_SAME val=\"new\""
      },
      {
        "label": "Deux changements unilatéraux et un conflit",
        "stdin": "LINE idx=2 base=X ours=Y theirs=X\nLINE idx=3 base=X ours=X theirs=Z\nLINE idx=4 base=X ours=Y theirs=Z",
        "expected": "MERGE idx=2 status=RESOLVED_OURS val=\"Y\"\nMERGE idx=3 status=RESOLVED_THEIRS val=\"Z\"\nMERGE idx=4 status=CONFLICT ours=\"Y\" theirs=\"Z\""
      },
      {
        "label": "Adoption unilatérale de theirs et ligne inchangée",
        "stdin": "LINE idx=10 base=debug = False ours=debug = False theirs=debug = True\nLINE idx=11 base=host = 0.0.0.0 ours=host = 0.0.0.0 theirs=host = 0.0.0.0",
        "expected": "MERGE idx=10 status=RESOLVED_THEIRS val=\"debug = True\"\nMERGE idx=11 status=CLEAN val=\"host = 0.0.0.0\""
      },
      {
        "label": "Même modification adoptée des deux côtés",
        "stdin": "LINE idx=5 base=v1.0.0 ours=v1.1.0 theirs=v1.1.0",
        "expected": "MERGE idx=5 status=RESOLVED_SAME val=\"v1.1.0\""
      },
      {
        "label": "Série mixte de résolutions et conflits",
        "stdin": "LINE idx=1 base=A ours=A theirs=B\nLINE idx=2 base=X ours=Y theirs=Z\nLINE idx=3 base=M ours=N theirs=M",
        "expected": "MERGE idx=1 status=RESOLVED_THEIRS val=\"B\"\nMERGE idx=2 status=CONFLICT ours=\"Y\" theirs=\"Z\"\nMERGE idx=3 status=RESOLVED_OURS val=\"N\""
      }
    ],
    "solution": "#!/usr/bin/env bash\npattern='^LINE idx=([^[:space:]]+) base=(.*) ours=(.*) theirs=(.*)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  index=${BASH_REMATCH[1]}\n  base=${BASH_REMATCH[2]}\n  ours=${BASH_REMATCH[3]}\n  theirs=${BASH_REMATCH[4]}\n  if [[ $ours == \"$base\" && $theirs == \"$base\" ]]; then\n    status=CLEAN\n    value=$base\n  elif [[ $theirs == \"$base\" ]]; then\n    status=RESOLVED_OURS\n    value=$ours\n  elif [[ $ours == \"$base\" ]]; then\n    status=RESOLVED_THEIRS\n    value=$theirs\n  elif [[ $ours == \"$theirs\" ]]; then\n    status=RESOLVED_SAME\n    value=$ours\n  else\n    printf 'MERGE idx=%s status=CONFLICT ours=\"%s\" theirs=\"%s\"\\n' \"$index\" \"$ours\" \"$theirs\"\n    continue\n  fi\n  printf 'MERGE idx=%s status=%s val=\"%s\"\\n' \"$index\" \"$status\" \"$value\"\ndone\n",
    "takeaway": "La résolution à trois voies confronte Base, Ours et Theirs afin de préserver les intentions convergentes et isoler les vrais conflits."
  }
];
