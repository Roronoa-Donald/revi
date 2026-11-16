'use strict';

module.exports = [
  {
    "id": "gh3-c3-e1",
    "chapter": 3,
    "title": "Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)",
    "level": "n1",
    "language": "shell",
    "goal": "Identifier dans un reflog les candidats à récupérer qui ne sont accessibles par aucune des branches fournies.",
    "brief": "<p>Le reflog enregistre localement des déplacements de références et peut aider à retrouver un ancien commit après un reset. Il possède ses propres règles d'expiration ; la collecte des objets n'est pas immédiate ni garantie pour une date précise.<br><br>Déclarez d'abord les branches <code>ACTIVE_BRANCH name=&lt;nom&gt; tip=&lt;id&gt; ancestors=&lt;id1,id2,...|NONE&gt;</code>, puis les entrées de reflog, de la plus récente à la plus ancienne : <code>REFLOG_ENTRY id=&lt;entrée&gt; commit=&lt;id&gt; action=&lt;action&gt; desc=&lt;message&gt;</code>. Les identifiants et actions ne contiennent pas d'espaces ; le message peut contenir des espaces mais pas de guillemet double.<br><br>Pour chaque entrée dont le commit ne figure ni parmi les têtes ni parmi les ancêtres des branches déclarées, affichez <code>RESCUE_CANDIDATE reflog={id} commit={hash} action=\"{action}\" desc=\"{desc}\" status=DANGLING</code>. Traitez chaque entrée, même si un commit est répété. Si aucune ne correspond, affichez <code>RESCUE_SUMMARY: ALL_COMMITS_REFERENCED</code>.<br><br>Attention : <code>DANGLING</code> est ici une étiquette du modèle, pas une preuve que <code>git fsck</code> qualifierait cet objet de dangling. D'autres références et le reflog lui-même peuvent le rendre accessible ; le script ne restaure aucun objet.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e1) — Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Rassemblez les têtes et les ancêtres des branches dans un ensemble.",
      "Parcourez ensuite chaque entrée du reflog dans son ordre initial.",
      "1. Marquer accessibles toutes les têtes et ancêtres des branches actives. 2. Chaque entrée de reflog dont le commit n’est pas marqué : candidat DANGLING. 3. Aucun candidat : ALL_COMMITS_REFERENCED."
    ],
    "examples": [
      {
        "stdin": "ACTIVE_BRANCH name=main tip=C1 ancestors=NONE\nREFLOG_ENTRY id=HEAD@{0} commit=C1 action=reset desc=moving to C1\nREFLOG_ENTRY id=HEAD@{1} commit=C3 action=commit desc=Feature perdue",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{1} commit=C3 action=\"commit\" desc=\"Feature perdue\" status=DANGLING",
        "note": "C3 a été abandonné par le reset to C1 et n’est plus dans main."
      }
    ],
    "tests": [
      {
        "label": "Reflog sans entrée",
        "stdin": "ACTIVE_BRANCH name=main tip=A ancestors=NONE",
        "expected": "RESCUE_SUMMARY: ALL_COMMITS_REFERENCED"
      },
      {
        "label": "Deux entrées pour un même candidat et branche supplémentaire",
        "stdin": "ACTIVE_BRANCH name=main tip=A ancestors=NONE\nACTIVE_BRANCH name=dev tip=B ancestors=A\nREFLOG_ENTRY id=HEAD@{0} commit=B action=checkout desc=vers dev\nREFLOG_ENTRY id=HEAD@{1} commit=Z action=commit desc=premier\nREFLOG_ENTRY id=HEAD@{2} commit=Z action=reset desc=second",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{1} commit=Z action=\"commit\" desc=\"premier\" status=DANGLING\nRESCUE_CANDIDATE reflog=HEAD@{2} commit=Z action=\"reset\" desc=\"second\" status=DANGLING"
      },
      {
        "label": "Tous les commits du reflog sont accessibles dans les branches",
        "stdin": "ACTIVE_BRANCH name=main tip=C2 ancestors=C1\nREFLOG_ENTRY id=HEAD@{0} commit=C2 action=checkout desc=moving to main\nREFLOG_ENTRY id=HEAD@{1} commit=C1 action=commit desc=Init",
        "expected": "RESCUE_SUMMARY: ALL_COMMITS_REFERENCED"
      },
      {
        "label": "Multiples commits orphelins après rebases multiples",
        "stdin": "ACTIVE_BRANCH name=main tip=M2 ancestors=M1\nACTIVE_BRANCH name=dev tip=D1 ancestors=M1\nREFLOG_ENTRY id=HEAD@{0} commit=M2 action=checkout desc=to main\nREFLOG_ENTRY id=HEAD@{1} commit=LOST1 action=commit desc=Secret code\nREFLOG_ENTRY id=HEAD@{2} commit=LOST2 action=commit desc=Old prototype",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{1} commit=LOST1 action=\"commit\" desc=\"Secret code\" status=DANGLING\nRESCUE_CANDIDATE reflog=HEAD@{2} commit=LOST2 action=\"commit\" desc=\"Old prototype\" status=DANGLING"
      },
      {
        "label": "Commit orphelin unique après suppression de branche",
        "stdin": "ACTIVE_BRANCH name=main tip=100 ancestors=NONE\nREFLOG_ENTRY id=HEAD@{0} commit=999 action=branch_delete desc=Temporary fix",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{0} commit=999 action=\"branch_delete\" desc=\"Temporary fix\" status=DANGLING"
      },
      {
        "label": "Ancêtre accessible sans entrée pour la tête",
        "stdin": "ACTIVE_BRANCH name=main tip=tipA ancestors=baseA\nREFLOG_ENTRY id=H0 commit=baseA action=commit desc=initial",
        "expected": "RESCUE_SUMMARY: ALL_COMMITS_REFERENCED"
      }
    ],
    "solution": "#!/usr/bin/env bash\ndeclare -A reachable=()\nbranch_pattern='^ACTIVE_BRANCH name=[^[:space:]]+ tip=([^[:space:]]+) ancestors=([^[:space:]]+)$'\nreflog_pattern='^REFLOG_ENTRY id=([^[:space:]]+) commit=([^[:space:]]+) action=([^[:space:]]+) desc=(.*)$'\nfound=0\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $branch_pattern ]]; then\n    tip=${BASH_REMATCH[1]}\n    ancestors=${BASH_REMATCH[2]}\n    reachable[$tip]=1\n    if [[ $ancestors != NONE ]]; then\n      IFS=, read -r -a ancestors_list <<< \"$ancestors\"\n      for ancestor in \"${ancestors_list[@]}\"; do\n        reachable[$ancestor]=1\n      done\n    fi\n  elif [[ $line =~ $reflog_pattern ]]; then\n    reflog=${BASH_REMATCH[1]}\n    commit=${BASH_REMATCH[2]}\n    action=${BASH_REMATCH[3]}\n    description=${BASH_REMATCH[4]}\n    if [[ ! ${reachable[$commit]+present} ]]; then\n      printf 'RESCUE_CANDIDATE reflog=%s commit=%s action=\"%s\" desc=\"%s\" status=DANGLING\\n' \"$reflog\" \"$commit\" \"$action\" \"$description\"\n      ((found += 1))\n    fi\n  fi\ndone\nif ((found == 0)); then\n  printf 'RESCUE_SUMMARY: ALL_COMMITS_REFERENCED\\n'\nfi\n",
    "takeaway": "Le reflog local mémorise les déplacements de HEAD pendant plusieurs semaines, permettant de récupérer un commit perdu après un reset brutal."
  },
  {
    "id": "gh3-c3-e2",
    "chapter": 3,
    "title": "Détecteur de régression dichotomique automatique (git bisect)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler la recherche dichotomique de Git Bisect pour identifier le premier commit ayant introduit un bogue.",
    "brief": "<p>Simulez une recherche dichotomique sur un historique <strong>linéaire</strong>. L'entrée contient <code>HISTORY commits=&lt;c0,c1,...&gt;</code> puis <code>STATUSES &lt;c0&gt;=GOOD &lt;c1&gt;=BAD ...</code>. Les identifiants sont distincts, sans espaces, virgule ni signe égal. Il faut au moins deux commits, le premier <code>GOOD</code>, le dernier <code>BAD</code> et une seule transition de GOOD vers BAD.<br><br>Initialisez <code>low=0</code> et <code>high=N-1</code>. Tant que <code>low &lt; high</code>, calculez <code>mid=(low+high)//2</code> ; si le commit médian est BAD, posez <code>high=mid</code>, sinon <code>low=mid+1</code>. Après chaque étape, affichez <code>BISECT_STEP step={k} testing={id} verdict={GOOD|BAD} remaining={high-low+1}</code>. Enfin, affichez <code>FIRST_BAD_COMMIT id={id}</code>.<br><br>Une liste de moins de deux commits produit <code>BISECT_ERROR reason=INVALID_HISTORY</code>. Un statut manquant, une borne incohérente ou une transition non monotone produit <code>BISECT_ERROR reason=INVALID_STATUSES</code>. Cette simulation n'est pas l'algorithme complet de <code>git bisect</code> sur un graphe de fusions.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e2) — Détecteur de régression dichotomique automatique (git bisect)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Vérifiez d’abord les bornes et la monotonie des statuts.",
      "Conservez l’intervalle inclusif low–high, puis réduisez-le après chaque verdict.",
      "1. Valider : au moins 2 commits, bornes GOOD/BAD, statuts monotones. 2. Intervalle inclusif low-high ; tester le milieu. 3. BAD : high = milieu ; GOOD : low = milieu + 1. 4. Afficher chaque étape puis FIRST_BAD_COMMIT."
    ],
    "examples": [
      {
        "stdin": "HISTORY commits=C1,C2,C3,C4,C5\nSTATUSES C1=GOOD C2=GOOD C3=BAD C4=BAD C5=BAD",
        "expected": "BISECT_STEP step=1 testing=C3 verdict=BAD remaining=3\nBISECT_STEP step=2 testing=C2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=C3",
        "note": "C3 est identifié comme le premier commit ayant introduit le bogue en 2 étapes."
      }
    ],
    "tests": [
      {
        "label": "Historique minimal de deux commits",
        "stdin": "HISTORY commits=good,bad\nSTATUSES good=GOOD bad=BAD",
        "expected": "BISECT_STEP step=1 testing=good verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=bad"
      },
      {
        "label": "Statuts non monotones",
        "stdin": "HISTORY commits=A,B,C,D\nSTATUSES A=GOOD B=BAD C=GOOD D=BAD",
        "expected": "BISECT_ERROR reason=INVALID_STATUSES"
      },
      {
        "label": "Historique de 8 commits avec bogue introduit tardivement",
        "stdin": "HISTORY commits=v1,v2,v3,v4,v5,v6,v7,v8\nSTATUSES v1=GOOD v2=GOOD v3=GOOD v4=GOOD v5=GOOD v6=GOOD v7=BAD v8=BAD",
        "expected": "BISECT_STEP step=1 testing=v4 verdict=GOOD remaining=4\nBISECT_STEP step=2 testing=v6 verdict=GOOD remaining=2\nBISECT_STEP step=3 testing=v7 verdict=BAD remaining=1\nFIRST_BAD_COMMIT id=v7"
      },
      {
        "label": "Bogue introduit dès le deuxième commit",
        "stdin": "HISTORY commits=A,B,C,D\nSTATUSES A=GOOD B=BAD C=BAD D=BAD",
        "expected": "BISECT_STEP step=1 testing=B verdict=BAD remaining=2\nBISECT_STEP step=2 testing=A verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=B"
      },
      {
        "label": "Seulement 3 commits dans l’historique",
        "stdin": "HISTORY commits=1,2,3\nSTATUSES 1=GOOD 2=GOOD 3=BAD",
        "expected": "BISECT_STEP step=1 testing=2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=3"
      }
    ],
    "solution": "#!/usr/bin/env bash\ndeclare -A statuses=()\ncommits=()\nwhile IFS= read -r line || [[ -n $line ]]; do\n  case $line in\n    'HISTORY commits='*)\n      IFS=, read -r -a commits <<< \"${line#HISTORY commits=}\"\n      ;;\n    'STATUSES '*)\n      read -r -a pairs <<< \"${line#STATUSES }\"\n      for pair in \"${pairs[@]}\"; do\n        statuses[${pair%%=*}]=${pair#*=}\n      done\n      ;;\n  esac\ndone\nif ((${#commits[@]} < 2)); then\n  printf 'BISECT_ERROR reason=INVALID_HISTORY\\n'\n  exit 0\nfi\nseen_bad=0\ninvalid=0\nfor commit in \"${commits[@]}\"; do\n  case ${statuses[$commit]-} in\n    GOOD) ((seen_bad)) && invalid=1 ;;\n    BAD) seen_bad=1 ;;\n    *) invalid=1 ;;\n  esac\ndone\nlast=$((${#commits[@]} - 1))\nif [[ ${statuses[${commits[0]}]-} != GOOD || ${statuses[${commits[last]}]-} != BAD ]] || ((invalid)); then\n  printf 'BISECT_ERROR reason=INVALID_STATUSES\\n'\n  exit 0\nfi\nlow=0\nhigh=$last\nstep=0\nwhile ((low < high)); do\n  middle=$(((low + high) / 2))\n  commit=${commits[middle]}\n  verdict=${statuses[$commit]}\n  if [[ $verdict == BAD ]]; then\n    high=$middle\n  else\n    low=$((middle + 1))\n  fi\n  ((step += 1))\n  printf 'BISECT_STEP step=%s testing=%s verdict=%s remaining=%s\\n' \"$step\" \"$commit\" \"$verdict\" \"$((high - low + 1))\"\ndone\nprintf 'FIRST_BAD_COMMIT id=%s\\n' \"${commits[low]}\"\n",
    "takeaway": "git bisect applique une recherche dichotomique sur l’historique pour isoler en O(log n) tests le commit exact introduisant une régression."
  },
  {
    "id": "gh3-c3-e3",
    "chapter": 3,
    "title": "Gestionnaire de pile de remisage (git stash LIFO stack)",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler le comportement en pile LIFO (Last-In, First-Out) des commandes git stash.",
    "brief": "<p><code>git stash</code> met de côté des modifications dans des objets de commit accessibles par une liste de remises. Simulez cette liste, dont l'entrée la plus récente porte l'indice 0.<br><br>Chaque ligne est <code>STASH_CMD action=&lt;push|pop|apply|drop&gt;</code>. Pour <code>push</code>, ajoutez <code> arg=&lt;message&gt;</code> ; le message peut être vide ou contenir des espaces mais pas de guillemet double. Pour <code>apply</code> et <code>drop</code>, ajoutez <code> arg=&lt;indice décimal non négatif&gt;</code>. <code>push</code> insère au sommet, <code>pop</code> retire le sommet, <code>apply</code> laisse la liste inchangée et <code>drop</code> retire l'entrée indiquée et renumérote les suivantes.<br><br>Pour chaque action, affichez <code>STASH_OP action={action} result={OK|STACK_EMPTY|INDEX_OUT_OF_BOUNDS} current_size={taille} top=\"{message|EMPTY}\"</code>. Sur une liste vide, pop, apply et drop renvoient <code>STACK_EMPTY</code>. Sur une liste non vide, un indice invalide ou hors limites renvoie <code>INDEX_OUT_OF_BOUNDS</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e3) — Gestionnaire de pile de remisage (git stash LIFO stack)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Utilisez un tableau Bash dont l’indice 0 représente l’entrée la plus récente.",
      "Après une suppression, reconstituez un tableau sans trous et ne modifiez pas la pile lors d’un apply.",
      "1. push : insérer au sommet. 2. pop : dépiler ou STACK_EMPTY. 3. apply/drop : valider l’indice numérique (< taille), purger les zéros de tête. 4. drop retire l’élément, apply le conserve. 5. Afficher taille et sommet."
    ],
    "examples": [
      {
        "stdin": "STASH_CMD action=push arg=WIP sur formulaire\nSTASH_CMD action=pop",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"WIP sur formulaire\"\nSTASH_OP action=pop result=OK current_size=0 top=\"EMPTY\"",
        "note": "Empilement puis dépilement immédiat de la réserve."
      }
    ],
    "tests": [
      {
        "label": "Actions sur une pile vide",
        "stdin": "STASH_CMD action=apply arg=0\nSTASH_CMD action=drop arg=0\nSTASH_CMD action=pop",
        "expected": "STASH_OP action=apply result=STACK_EMPTY current_size=0 top=\"EMPTY\"\nSTASH_OP action=drop result=STACK_EMPTY current_size=0 top=\"EMPTY\"\nSTASH_OP action=pop result=STACK_EMPTY current_size=0 top=\"EMPTY\""
      },
      {
        "label": "Bornes d’indice et suppression du sommet",
        "stdin": "STASH_CMD action=push arg=un\nSTASH_CMD action=push arg=deux\nSTASH_CMD action=apply arg=1\nSTASH_CMD action=drop arg=2\nSTASH_CMD action=drop arg=0",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"un\"\nSTASH_OP action=push result=OK current_size=2 top=\"deux\"\nSTASH_OP action=apply result=OK current_size=2 top=\"deux\"\nSTASH_OP action=drop result=INDEX_OUT_OF_BOUNDS current_size=2 top=\"deux\"\nSTASH_OP action=drop result=OK current_size=1 top=\"un\""
      },
      {
        "label": "Dépilement sur une pile vide",
        "stdin": "STASH_CMD action=pop",
        "expected": "STASH_OP action=pop result=STACK_EMPTY current_size=0 top=\"EMPTY\""
      },
      {
        "label": "Succession de push, apply et drop spécifique",
        "stdin": "STASH_CMD action=push arg=Fix CSS\nSTASH_CMD action=push arg=Refactor API\nSTASH_CMD action=apply arg=1\nSTASH_CMD action=drop arg=0",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"Fix CSS\"\nSTASH_OP action=push result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=apply result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=drop result=OK current_size=1 top=\"Fix CSS\""
      },
      {
        "label": "Drop avec index hors limites",
        "stdin": "STASH_CMD action=push arg=Seul élément\nSTASH_CMD action=drop arg=5",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"Seul élément\"\nSTASH_OP action=drop result=INDEX_OUT_OF_BOUNDS current_size=1 top=\"Seul élément\""
      },
      {
        "label": "Indice égal à la taille",
        "stdin": "STASH_CMD action=push arg=unique\nSTASH_CMD action=drop arg=1",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"unique\"\nSTASH_OP action=drop result=INDEX_OUT_OF_BOUNDS current_size=1 top=\"unique\""
      }
    ],
    "solution": "#!/usr/bin/env bash\nstack=()\npattern='^STASH_CMD action=([^[:space:]]+)( arg=(.*))?$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  action=${BASH_REMATCH[1]}\n  argument=${BASH_REMATCH[3]}\n  result=OK\n  case $action in\n    push)\n      stack=(\"$argument\" \"${stack[@]}\")\n      ;;\n    pop)\n      if ((${#stack[@]} == 0)); then\n        result=STACK_EMPTY\n      else\n        stack=(\"${stack[@]:1}\")\n      fi\n      ;;\n    apply|drop)\n      if ((${#stack[@]} == 0)); then\n        result=STACK_EMPTY\n      elif [[ ! $argument =~ ^[0-9]+$ ]]; then\n        result=INDEX_OUT_OF_BOUNDS\n      else\n        index=$argument\n        while ((${#index} > 1)) && [[ $index == 0* ]]; do index=${index#0}; done\n        count=${#stack[@]}\n        if ((${#index} > ${#count})) || ((10#$index >= count)); then\n          result=INDEX_OUT_OF_BOUNDS\n        elif [[ $action == drop ]]; then\n          index=$((10#$index))\n          unset 'stack[index]'\n          stack=(\"${stack[@]}\")\n        fi\n      fi\n      ;;\n  esac\n  if ((${#stack[@]} == 0)); then top=EMPTY; else top=${stack[0]}; fi\n  printf 'STASH_OP action=%s result=%s current_size=%s top=\"%s\"\\n' \"$action\" \"$result\" \"${#stack[@]}\" \"$top\"\ndone\n",
    "takeaway": "git stash empile les modifications en cours selon une pile LIFO pour libérer rapidement la copie de travail sans créer de commit brouillon."
  }
];
