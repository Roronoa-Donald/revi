'use strict';

const GH3_EXERCISES = [
  {
    "id": "gh3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)",
    "level": "n1",
    "language": "shell",
    "goal": "Calculer le hash SHA-1 exact d’un objet Git selon le formatage canonique interne du stockage objet.",
    "brief": "<p>Dans un dépôt configuré en SHA-1, l'identifiant d'un objet est le condensat SHA-1 de l'en-tête <code>type taille_octets\\0</code> suivi du contenu brut. La taille est comptée en octets, et non en caractères.<br><br>Chaque ligne d'entrée a la forme <code>OBJECT type=&lt;type&gt; content=&lt;texte&gt;</code>. Le texte peut être vide, contenir des espaces ou des caractères UTF-8 ; la suite littérale <code>\\n</code> représente un saut de ligne dans son contenu. Les octets nuls et les contenus binaires arbitraires ne sont pas représentables dans ce format.<br><br>Pour chaque objet, affichez <code>GIT_HASH type={type} size={taille} sha1={hash_hex}</code>, avec 40 chiffres hexadécimaux en minuscules.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c1-e1) — Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "L’en-tête contient le type, un espace, la taille en octets et un octet nul.",
      "Comptez les octets UTF-8 après décodage des sauts de ligne, puis hachez l’en-tête et le contenu ensemble."
    ],
    "examples": [
      {
        "stdin": "OBJECT type=blob content=hello world\n",
        "expected": "GIT_HASH type=blob size=11 sha1=95d09f2b10159347eece71399a7e2e907ea3df4f",
        "note": "Blob Git contenant \"hello world\" (11 octets) dont le sha1 canonique avec en-tête est 95d09f2b..."
      }
    ],
    "tests": [
      {
        "label": "UTF-8 et saut de ligne final encodé",
        "stdin": "OBJECT type=blob content=é\nOBJECT type=blob content=abc\\n",
        "expected": "GIT_HASH type=blob size=2 sha1=4b04fff51468d8ab5201ab02b725dc477bc7cb45\nGIT_HASH type=blob size=4 sha1=8baef1b4abc478178b004d62031cf7fe6db6f903"
      },
      {
        "label": "Contenu vide et contenu d’un octet",
        "stdin": "OBJECT type=blob content=\nOBJECT type=commit content=x",
        "expected": "GIT_HASH type=blob size=0 sha1=e69de29bb2d1d6434b8b29ae775ad8c2e48c5391\nGIT_HASH type=commit size=1 sha1=eaa562e454681104aee02c9809ea2ca6ec4aa5cd"
      },
      {
        "label": "Blob avec texte standard sans saut de ligne final",
        "stdin": "OBJECT type=blob content=Architecture logicielle B3",
        "expected": "GIT_HASH type=blob size=26 sha1=66de79ad6131ce0ff05c1f2e2e472f4aa09ada42"
      },
      {
        "label": "Commit fictif et tag annoté",
        "stdin": "OBJECT type=commit content=tree a1b2c3d4e5\\nauthor Alice\\n\\nInitial commit\nOBJECT type=tag content=object 123456\\ntype commit\\ntag v1.0.0",
        "expected": "GIT_HASH type=commit size=44 sha1=f047280709dd0cdbd55636aaf175a99417d126f5\nGIT_HASH type=tag size=36 sha1=eb37da38f647b9f1e0b95707850348933acc5a02"
      },
      {
        "label": "Objet avec contenu vide",
        "stdin": "OBJECT type=blob content=",
        "expected": "GIT_HASH type=blob size=0 sha1=e69de29bb2d1d6434b8b29ae775ad8c2e48c5391"
      },
      {
        "label": "UTF-8 sans retour de ligne encodé",
        "stdin": "OBJECT type=blob content=café Ω",
        "expected": "GIT_HASH type=blob size=8 sha1=e2d176ed9baa62caadbdcfa657bfe9be0b8beed0"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -o pipefail\nexport LC_ALL=C\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line == \"OBJECT type=\"*\" content=\"* ]] || continue\n  fields=${line#OBJECT type=}\n  object_type=${fields%% content=*}\n  content=${fields#* content=}\n  content=${content//\\\\n/$'\\n'}\n  size=${#content}\n  digest=$(printf '%s %s\\0%s' \"$object_type\" \"$size\" \"$content\" | sha1sum)\n  printf 'GIT_HASH type=%s size=%s sha1=%s\\n' \"$object_type\" \"$size\" \"${digest%% *}\"\ndone\n"
  },
  {
    "id": "gh3-c1-e2",
    "chapter": 1,
    "title": "Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)",
    "level": "n2",
    "language": "shell",
    "goal": "Analyser les entrées d’un objet Tree Git et afficher l’inventaire des blobs et sous-arbres avec leur mode.",
    "brief": "<p>Un objet Tree associe à chaque entrée un mode, un type, un identifiant SHA-1 et un nom. Dans cet exercice, <code>100644</code> désigne un blob ordinaire, <code>100755</code> un blob exécutable, <code>120000</code> un lien symbolique (blob) et <code>040000</code> un sous-arbre.<br><br>Lisez zéro ou plusieurs lignes <code>ENTRY mode=&lt;mode&gt; type=&lt;blob|tree&gt; sha1=&lt;40 chiffres hexadécimaux&gt; name=&lt;nom&gt;</code>. Les noms sont non vides et distincts, peuvent contenir des espaces, mais ni tabulation ni saut de ligne. Une entrée standard vide représente un arbre vide.<br><br>Triez les entrées par nom, selon l'ordre des octets (locale C), puis affichez chacune sous la forme <code>{mode} {type} {sha1}\t{name}</code>, avec une vraie tabulation avant le nom. Terminez par <code>TREE_SUMMARY total={n} blobs={nb_blobs} subtrees={nb_trees} executables={nb_exec}</code>. Chaque ligne affichée, y compris la dernière, se termine par un saut de ligne.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c1-e2) — Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Découpez les champs sans couper les espaces du nom.",
      "Triez selon l’ordre des octets et comptez séparément blobs, sous-arbres et modes 100755."
    ],
    "examples": [
      {
        "stdin": "ENTRY mode=100644 type=blob sha1=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2 name=README.md\nENTRY mode=040000 type=tree sha1=b1c2d3e4f5a6b1c2d3e4f5a6b1c2d3e4f5a6b1c2 name=src",
        "expected": "100644 blob a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2\tREADME.md\n040000 tree b1c2d3e4f5a6b1c2d3e4f5a6b1c2d3e4f5a6b1c2\tsrc\nTREE_SUMMARY total=2 blobs=1 subtrees=1 executables=0",
        "note": "Un fichier README et un sous-dossier src."
      }
    ],
    "tests": [
      {
        "label": "Arbre sans entrée",
        "stdin": "",
        "expected": "TREE_SUMMARY total=0 blobs=0 subtrees=0 executables=0"
      },
      {
        "label": "Tri et lien symbolique avec espace final significatif",
        "stdin": "ENTRY mode=100755 type=blob sha1=9999999999999999999999999999999999999999 name=a script.sh\nENTRY mode=120000 type=blob sha1=8888888888888888888888888888888888888888 name=z.lnk ",
        "expected": "100755 blob 9999999999999999999999999999999999999999\ta script.sh\n120000 blob 8888888888888888888888888888888888888888\tz.lnk \nTREE_SUMMARY total=2 blobs=2 subtrees=0 executables=1\n",
        "mode": "exact"
      },
      {
        "label": "Tree avec script exécutable et plusieurs fichiers",
        "stdin": "ENTRY mode=100755 type=blob sha1=111122223333444455556666777788889999aaaa name=deploy.sh\nENTRY mode=100644 type=blob sha1=bbbbccccddddeeeeffff00001111222233334444 name=config.json\nENTRY mode=040000 type=tree sha1=55556666777788889999aaaabbbbccccddddeeee name=assets",
        "expected": "040000 tree 55556666777788889999aaaabbbbccccddddeeee\tassets\n100644 blob bbbbccccddddeeeeffff00001111222233334444\tconfig.json\n100755 blob 111122223333444455556666777788889999aaaa\tdeploy.sh\nTREE_SUMMARY total=3 blobs=2 subtrees=1 executables=1"
      },
      {
        "label": "Un sous-arbre sans fichier",
        "stdin": "ENTRY mode=040000 type=tree sha1=0123456789abcdef0123456789abcdef01234567 name=lib",
        "expected": "040000 tree 0123456789abcdef0123456789abcdef01234567\tlib\nTREE_SUMMARY total=1 blobs=0 subtrees=1 executables=0"
      },
      {
        "label": "Multiples exécutables et lien symbolique",
        "stdin": "ENTRY mode=100755 type=blob sha1=aaa111bbb222ccc333ddd444eee555fff666aa11 name=run.py\nENTRY mode=100755 type=blob sha1=bbb222ccc333ddd444eee555fff666aaa111bbb2 name=build.sh\nENTRY mode=120000 type=blob sha1=ccc333ddd444eee555fff666aaa111bbb222ccc3 name=latest.link",
        "expected": "100755 blob bbb222ccc333ddd444eee555fff666aaa111bbb2\tbuild.sh\n120000 blob ccc333ddd444eee555fff666aaa111bbb222ccc3\tlatest.link\n100755 blob aaa111bbb222ccc333ddd444eee555fff666aa11\trun.py\nTREE_SUMMARY total=3 blobs=3 subtrees=0 executables=2"
      },
      {
        "label": "Exécutable unique",
        "stdin": "ENTRY mode=100755 type=blob sha1=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa name=only.sh",
        "expected": "100755 blob aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\tonly.sh\nTREE_SUMMARY total=1 blobs=1 subtrees=0 executables=1\n",
        "mode": "exact"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -o pipefail\nexport LC_ALL=C\nrows=()\ntotal=0\nblobs=0\nsubtrees=0\nexecutables=0\npattern='^ENTRY mode=([^[:space:]]+) type=([^[:space:]]+) sha1=([^[:space:]]+) name=(.*)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  mode=${BASH_REMATCH[1]}\n  type=${BASH_REMATCH[2]}\n  sha1=${BASH_REMATCH[3]}\n  name=${BASH_REMATCH[4]}\n  rows+=(\"$name\"$'\\t'\"$mode\"$'\\t'\"$type\"$'\\t'\"$sha1\")\n  ((total += 1))\n  [[ $type == blob ]] && ((blobs += 1))\n  [[ $type == tree ]] && ((subtrees += 1))\n  [[ $mode == 100755 ]] && ((executables += 1))\ndone\nif ((total > 0)); then\n  printf '%s\\n' \"${rows[@]}\" | sort -t $'\\t' -k1,1 | while IFS=$'\\t' read -r name mode type sha1; do\n    printf '%s %s %s\\t%s\\n' \"$mode\" \"$type\" \"$sha1\" \"$name\"\n  done\nfi\nprintf 'TREE_SUMMARY total=%s blobs=%s subtrees=%s executables=%s\\n' \"$total\" \"$blobs\" \"$subtrees\" \"$executables\"\n"
  },
  {
    "id": "gh3-c1-e3",
    "chapter": 1,
    "title": "Résolveur de références symboliques & pointeur HEAD (git rev-parse)",
    "level": "n3",
    "language": "shell",
    "goal": "Résoudre la chaîne de pointeurs de références de Git pour déterminer le commit actif pointé par HEAD.",
    "brief": "<p>Une référence Git peut contenir directement un identifiant de commit ou renvoyer à une autre référence. HEAD pointe généralement vers une branche ; lorsqu'il contient directement un identifiant de commit, il est détaché.<br><br>Déclarez d'abord des lignes <code>REF name=&lt;nom&gt; target=&lt;hash|ref: autre_ref&gt;</code>, puis des requêtes <code>RESOLVE name=&lt;nom&gt;</code>. Les noms ne contiennent pas d'espaces. Suivez les liens symboliques et indiquez le chemin de résolution.<br><br>Pour une chaîne résolue : <code>RESOLVED name={name} commit={hash} state={state} path={chaine_de_refs}</code>. Dans ce modèle, <code>BRANCH_REF</code> signifie que HEAD renvoie directement à <code>refs/heads/...</code>, <code>DETACHED_HEAD</code> que HEAD contient directement le hash, <code>DIRECT_REF</code> qu'une autre référence contient directement le hash et <code>SYMBOLIC_REF</code> qu'une autre chaîne est symbolique. Une référence absente, même intermédiaire, produit <code>RESOLVED name={name} status=NOT_FOUND</code> ; un cycle produit <code>RESOLVED name={name} status=CYCLE</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c1-e3) — Résolveur de références symboliques & pointeur HEAD (git rev-parse)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Stockez les définitions de références puis suivez chaque cible commençant par « ref: ».",
      "Mémorisez les références déjà visitées pour détecter les cycles et distinguez une branche d’un tag direct."
    ],
    "examples": [
      {
        "stdin": "REF name=refs/heads/main target=c0ffee1234567890abcdef1234567890abcdef12\nREF name=HEAD target=ref: refs/heads/main\nRESOLVE name=HEAD",
        "expected": "RESOLVED name=HEAD commit=c0ffee1234567890abcdef1234567890abcdef12 state=BRANCH_REF path=HEAD -> refs/heads/main",
        "note": "HEAD pointe sur la branche main qui pointe sur le commit."
      }
    ],
    "tests": [
      {
        "label": "Référence intermédiaire absente",
        "stdin": "REF name=HEAD target=ref: refs/heads/absente\nRESOLVE name=HEAD",
        "expected": "RESOLVED name=HEAD status=NOT_FOUND"
      },
      {
        "label": "Cycle entre deux références",
        "stdin": "REF name=refs/heads/a target=ref: refs/heads/b\nREF name=refs/heads/b target=ref: refs/heads/a\nRESOLVE name=refs/heads/a",
        "expected": "RESOLVED name=refs/heads/a status=CYCLE"
      },
      {
        "label": "HEAD détachée pointant directement sur un commit",
        "stdin": "REF name=HEAD target=9876543210abcdef9876543210abcdef98765432\nRESOLVE name=HEAD",
        "expected": "RESOLVED name=HEAD commit=9876543210abcdef9876543210abcdef98765432 state=DETACHED_HEAD path=HEAD"
      },
      {
        "label": "Chaîne de références avec branche intermédiaire et ref introuvable",
        "stdin": "REF name=refs/heads/feature target=aabbccddeeff00112233445566778899aabbccdd\nREF name=HEAD target=ref: refs/heads/feature\nRESOLVE name=HEAD\nRESOLVE name=refs/heads/develop",
        "expected": "RESOLVED name=HEAD commit=aabbccddeeff00112233445566778899aabbccdd state=BRANCH_REF path=HEAD -> refs/heads/feature\nRESOLVED name=refs/heads/develop status=NOT_FOUND"
      },
      {
        "label": "Résolution directe d’un tag de version",
        "stdin": "REF name=refs/tags/v2.0 target=112233445566778899aabbccddeeff0011223344\nRESOLVE name=refs/tags/v2.0",
        "expected": "RESOLVED name=refs/tags/v2.0 commit=112233445566778899aabbccddeeff0011223344 state=DIRECT_REF path=refs/tags/v2.0"
      }
    ],
    "solution": "#!/usr/bin/env bash\ndeclare -A refs=()\nref_pattern='^REF name=([^[:space:]]+) target=(.*)$'\nresolve_pattern='^RESOLVE name=([^[:space:]]+)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $ref_pattern ]]; then\n    refs[${BASH_REMATCH[1]}]=${BASH_REMATCH[2]}\n  elif [[ $line =~ $resolve_pattern ]]; then\n    name=${BASH_REMATCH[1]}\n    if [[ ! ${refs[$name]+present} ]]; then\n      printf 'RESOLVED name=%s status=NOT_FOUND\\n' \"$name\"\n      continue\n    fi\n    initial=${refs[$name]}\n    state=DIRECT_REF\n    if [[ $name == HEAD && $initial != 'ref: '* ]]; then\n      state=DETACHED_HEAD\n    elif [[ $name == HEAD && $initial == 'ref: refs/heads/'* ]]; then\n      state=BRANCH_REF\n    elif [[ $initial == 'ref: '* ]]; then\n      state=SYMBOLIC_REF\n    fi\n    current=$name\n    path=$name\n    unset seen\n    declare -A seen=()\n    status=OK\n    while :; do\n      if [[ ${seen[$current]+present} ]]; then\n        status=CYCLE\n        break\n      fi\n      seen[$current]=1\n      if [[ ! ${refs[$current]+present} ]]; then\n        status=NOT_FOUND\n        break\n      fi\n      target=${refs[$current]}\n      if [[ $target != 'ref: '* ]]; then\n        break\n      fi\n      current=${target#ref: }\n      path+=\" -> $current\"\n    done\n    if [[ $status == OK ]]; then\n      printf 'RESOLVED name=%s commit=%s state=%s path=%s\\n' \"$name\" \"$target\" \"$state\" \"$path\"\n    else\n      printf 'RESOLVED name=%s status=%s\\n' \"$name\" \"$status\"\n    fi\n  fi\ndone\n"
  },
  {
    "id": "gh3-c2-e1",
    "chapter": 2,
    "title": "Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge",
    "level": "n1",
    "language": "shell",
    "goal": "Déterminer si une fusion de branches peut s’effectuer en Fast-Forward ou requiert un 3-Way Merge avec commit de fusion.",
    "brief": "<p>Dans ce modèle de graphe Git, une avance rapide est possible lorsque le commit courant est un ancêtre du commit à intégrer. Si le commit à intégrer est déjà un ancêtre du commit courant, rien n'est à fusionner. Deux historiques divergents avec au moins une base commune demandent ici une fusion à trois voies ; Git refuse par défaut la fusion d'historiques sans ancêtre commun.<br><br>Déclarez d'abord les commits par <code>COMMIT id=&lt;id&gt; parents=&lt;p1,p2,...|NONE&gt;</code>, puis les branches par <code>BRANCH name=&lt;nom&gt; commit=&lt;id&gt;</code>, puis une ou plusieurs requêtes <code>MERGE_REQUEST current=&lt;branche&gt; incoming=&lt;branche&gt;</code>. Les identifiants sont distincts et sans espaces ; tous les parents et branches demandées existent, et le graphe est acyclique.<br><br>Pour chaque requête, affichez <code>MERGE_STRATEGY from={incoming} into={current} type={FAST_FORWARD|ALREADY_UP_TO_DATE|THREE_WAY_MERGE|NO_COMMON_ANCESTOR} lca={bases}</code>. <code>lca</code> vaut <code>NONE</code> sans base commune ; sinon, indiquez toutes les meilleures bases communes, triées par ordre des octets et séparées par des virgules. Une meilleure base commune n'est ancêtre d'aucune autre base commune distincte. Les options de fusion particulières ne sont pas modélisées.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e1) — Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Constituez les ensembles d’ancêtres en incluant chaque tête elle-même.",
      "Éliminez les ancêtres communs qui sont eux-mêmes ancêtres d’un autre ancêtre commun ; plusieurs meilleures bases peuvent subsister."
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
    "solution": "#!/usr/bin/env bash\nset -o pipefail\nexport LC_ALL=C\ndeclare -A parents=() branches=()\ncommit_pattern='^COMMIT id=([^[:space:]]+) parents=([^[:space:]]+)$'\nbranch_pattern='^BRANCH name=([^[:space:]]+) commit=([^[:space:]]+)$'\nrequest_pattern='^MERGE_REQUEST current=([^[:space:]]+) incoming=([^[:space:]]+)$'\ncollect_ancestors() {\n  local root=$1\n  local -n result=$2\n  local -a queue=(\"$root\") parent_list=()\n  local offset=0 node parent parent_text\n  result=()\n  while ((offset < ${#queue[@]})); do\n    node=${queue[offset]}\n    ((offset += 1))\n    [[ ${result[$node]+present} ]] && continue\n    result[$node]=1\n    parent_text=${parents[$node]}\n    [[ $parent_text == NONE ]] && continue\n    IFS=, read -r -a parent_list <<< \"$parent_text\"\n    for parent in \"${parent_list[@]}\"; do\n      queue+=(\"$parent\")\n    done\n  done\n}\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $commit_pattern ]]; then\n    parents[${BASH_REMATCH[1]}]=${BASH_REMATCH[2]}\n  elif [[ $line =~ $branch_pattern ]]; then\n    branches[${BASH_REMATCH[1]}]=${BASH_REMATCH[2]}\n  elif [[ $line =~ $request_pattern ]]; then\n    current=${BASH_REMATCH[1]}\n    incoming=${BASH_REMATCH[2]}\n    base=${branches[$current]}\n    target=${branches[$incoming]}\n    declare -A current_ancestors=() incoming_ancestors=() ancestors_other=()\n    collect_ancestors \"$base\" current_ancestors\n    collect_ancestors \"$target\" incoming_ancestors\n    common=()\n    best=()\n    for candidate in \"${!current_ancestors[@]}\"; do\n      [[ ${incoming_ancestors[$candidate]+present} ]] && common+=(\"$candidate\")\n    done\n    for candidate in \"${common[@]}\"; do\n      is_best=1\n      for other in \"${common[@]}\"; do\n        [[ $candidate == \"$other\" ]] && continue\n        collect_ancestors \"$other\" ancestors_other\n        if [[ ${ancestors_other[$candidate]+present} ]]; then\n          is_best=0\n          break\n        fi\n      done\n      ((is_best)) && best+=(\"$candidate\")\n    done\n    if ((${#best[@]} == 0)); then\n      strategy=NO_COMMON_ANCESTOR\n      lca=NONE\n    else\n      lca=$(printf '%s\\n' \"${best[@]}\" | sort | paste -sd, -)\n      if [[ ${current_ancestors[$target]+present} ]]; then\n        strategy=ALREADY_UP_TO_DATE\n      elif [[ ${incoming_ancestors[$base]+present} ]]; then\n        strategy=FAST_FORWARD\n      else\n        strategy=THREE_WAY_MERGE\n      fi\n    fi\n    printf 'MERGE_STRATEGY from=%s into=%s type=%s lca=%s\\n' \"$incoming\" \"$current\" \"$strategy\" \"$lca\"\n  fi\ndone\n"
  },
  {
    "id": "gh3-c2-e2",
    "chapter": 2,
    "title": "Simulateur de Rebase Interactif (git rebase -i)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler l’exécution des instructions de réécriture d’historique git-rebase-todo (pick, squash, reword, drop).",
    "brief": "<p>Le rebase interactif permet de réorganiser une série de commits. Simulez ici les actions <code>pick</code> et <code>reword</code> (ajouter le commit et son message fourni), <code>drop</code> (ignorer le commit) et <code>squash</code> (ajouter le message au dernier commit conservé, avec le séparateur <code> + </code>). Les identifiants sont fictifs et ne sont pas de nouveaux hachages Git.<br><br>Chaque ligne est <code>TODO action=&lt;action&gt; commit=&lt;id&gt; msg=&lt;message&gt;</code> ; <code>msg</code> est omis pour <code>drop</code>. Les messages tiennent sur une ligne et ne contiennent pas de guillemet double. Une entrée vide produit un historique vide. Si <code>squash</code> n'a aucun commit précédent, affichez uniquement <code>REBASE_ERROR reason=SQUASH_WITHOUT_PREVIOUS</code>.<br><br>Sinon, affichez chaque commit conservé dans l'ordre : <code>REBASED_COMMIT id={id} msg=\"{message}\"</code>, puis <code>REBASE_SUMMARY total_commits={n}</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e2) — Simulateur de Rebase Interactif (git rebase -i)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Conservez deux listes parallèles pour les identifiants et les messages.",
      "Un squash modifie seulement le dernier message conservé ; drop ne crée aucune entrée."
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
    "solution": "#!/usr/bin/env bash\nids=()\nmessages=()\npattern='^TODO action=([^[:space:]]+) commit=([^[:space:]]+)( msg=(.*))?$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  action=${BASH_REMATCH[1]}\n  commit=${BASH_REMATCH[2]}\n  message=${BASH_REMATCH[4]}\n  case $action in\n    pick|reword)\n      ids+=(\"$commit\")\n      messages+=(\"$message\")\n      ;;\n    squash)\n      if ((${#ids[@]} == 0)); then\n        printf 'REBASE_ERROR reason=SQUASH_WITHOUT_PREVIOUS\\n'\n        exit 0\n      fi\n      last=$((${#ids[@]} - 1))\n      messages[last]+=\" + $message\"\n      ;;\n    drop) ;;\n  esac\ndone\nfor ((index = 0; index < ${#ids[@]}; index += 1)); do\n  printf 'REBASED_COMMIT id=%s msg=\"%s\"\\n' \"${ids[index]}\" \"${messages[index]}\"\ndone\nprintf 'REBASE_SUMMARY total_commits=%s\\n' \"${#ids[@]}\"\n"
  },
  {
    "id": "gh3-c2-e3",
    "chapter": 2,
    "title": "Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)",
    "level": "n3",
    "language": "shell",
    "goal": "Appliquer l’algorithme de fusion à 3 voies ligne à ligne pour détecter les modifications unilatérales et les conflits.",
    "brief": "<p>Simulez une fusion à trois voies sur des valeurs fournies ligne par ligne. Pour chaque ligne <code>LINE idx=&lt;id&gt; base=&lt;valeur&gt; ours=&lt;valeur&gt; theirs=&lt;valeur&gt;</code>, les valeurs peuvent être vides ou contenir des espaces, mais pas de guillemet double ni les délimiteurs littéraux <code> ours=</code> et <code> theirs=</code>.<br><br>Si les trois valeurs sont égales, conservez la base (<code>CLEAN</code>). Si seul <code>ours</code> diffère, conservez-le (<code>RESOLVED_OURS</code>) ; si seul <code>theirs</code> diffère, conservez-le (<code>RESOLVED_THEIRS</code>). Si les deux valeurs modifiées sont égales, conservez-les (<code>RESOLVED_SAME</code>). Sinon, il y a <code>CONFLICT</code>.<br><br>Sans conflit, affichez <code>MERGE idx={id} status={statut} val=\"{valeur}\"</code>. En cas de conflit, affichez <code>MERGE idx={id} status=CONFLICT ours=\"{ours}\" theirs=\"{theirs}\"</code>. Ce modèle ligne à ligne ne reproduit pas tous les comportements du moteur de fusion Git.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e3) — Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Comparez d’abord les deux versions à la base.",
      "Un conflit exige deux modifications différentes ; deux changements identiques se résolvent ensemble."
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
    "solution": "#!/usr/bin/env bash\npattern='^LINE idx=([^[:space:]]+) base=(.*) ours=(.*) theirs=(.*)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  index=${BASH_REMATCH[1]}\n  base=${BASH_REMATCH[2]}\n  ours=${BASH_REMATCH[3]}\n  theirs=${BASH_REMATCH[4]}\n  if [[ $ours == \"$base\" && $theirs == \"$base\" ]]; then\n    status=CLEAN\n    value=$base\n  elif [[ $theirs == \"$base\" ]]; then\n    status=RESOLVED_OURS\n    value=$ours\n  elif [[ $ours == \"$base\" ]]; then\n    status=RESOLVED_THEIRS\n    value=$theirs\n  elif [[ $ours == \"$theirs\" ]]; then\n    status=RESOLVED_SAME\n    value=$ours\n  else\n    printf 'MERGE idx=%s status=CONFLICT ours=\"%s\" theirs=\"%s\"\\n' \"$index\" \"$ours\" \"$theirs\"\n    continue\n  fi\n  printf 'MERGE idx=%s status=%s val=\"%s\"\\n' \"$index\" \"$status\" \"$value\"\ndone\n"
  },
  {
    "id": "gh3-c3-e1",
    "chapter": 3,
    "title": "Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)",
    "level": "n1",
    "language": "shell",
    "goal": "Identifier dans un reflog les candidats à récupérer qui ne sont accessibles par aucune des branches fournies.",
    "brief": "<p>Le reflog enregistre localement des déplacements de références et peut aider à retrouver un ancien commit après un reset. Il possède ses propres règles d'expiration ; la collecte des objets n'est pas immédiate ni garantie pour une date précise.<br><br>Déclarez d'abord les branches <code>ACTIVE_BRANCH name=&lt;nom&gt; tip=&lt;id&gt; ancestors=&lt;id1,id2,...|NONE&gt;</code>, puis les entrées de reflog, de la plus récente à la plus ancienne : <code>REFLOG_ENTRY id=&lt;entrée&gt; commit=&lt;id&gt; action=&lt;action&gt; desc=&lt;message&gt;</code>. Les identifiants et actions ne contiennent pas d'espaces ; le message peut contenir des espaces mais pas de guillemet double.<br><br>Pour chaque entrée dont le commit ne figure ni parmi les têtes ni parmi les ancêtres des branches déclarées, affichez <code>RESCUE_CANDIDATE reflog={id} commit={hash} action=\"{action}\" desc=\"{desc}\" status=DANGLING</code>. Traitez chaque entrée, même si un commit est répété. Si aucune ne correspond, affichez <code>RESCUE_SUMMARY: ALL_COMMITS_REFERENCED</code>.<br><br>Attention : <code>DANGLING</code> est ici une étiquette du modèle, pas une preuve que <code>git fsck</code> qualifierait cet objet de dangling. D'autres références et le reflog lui-même peuvent le rendre accessible ; le script ne restaure aucun objet.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e1) — Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Rassemblez les têtes et les ancêtres des branches dans un ensemble.",
      "Parcourez ensuite chaque entrée du reflog dans son ordre initial."
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
    "solution": "#!/usr/bin/env bash\ndeclare -A reachable=()\nbranch_pattern='^ACTIVE_BRANCH name=[^[:space:]]+ tip=([^[:space:]]+) ancestors=([^[:space:]]+)$'\nreflog_pattern='^REFLOG_ENTRY id=([^[:space:]]+) commit=([^[:space:]]+) action=([^[:space:]]+) desc=(.*)$'\nfound=0\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $branch_pattern ]]; then\n    tip=${BASH_REMATCH[1]}\n    ancestors=${BASH_REMATCH[2]}\n    reachable[$tip]=1\n    if [[ $ancestors != NONE ]]; then\n      IFS=, read -r -a ancestors_list <<< \"$ancestors\"\n      for ancestor in \"${ancestors_list[@]}\"; do\n        reachable[$ancestor]=1\n      done\n    fi\n  elif [[ $line =~ $reflog_pattern ]]; then\n    reflog=${BASH_REMATCH[1]}\n    commit=${BASH_REMATCH[2]}\n    action=${BASH_REMATCH[3]}\n    description=${BASH_REMATCH[4]}\n    if [[ ! ${reachable[$commit]+present} ]]; then\n      printf 'RESCUE_CANDIDATE reflog=%s commit=%s action=\"%s\" desc=\"%s\" status=DANGLING\\n' \"$reflog\" \"$commit\" \"$action\" \"$description\"\n      ((found += 1))\n    fi\n  fi\ndone\nif ((found == 0)); then\n  printf 'RESCUE_SUMMARY: ALL_COMMITS_REFERENCED\\n'\nfi\n"
  },
  {
    "id": "gh3-c3-e2",
    "chapter": 3,
    "title": "Détecteur de régression dichotomique automatique (git bisect)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler la recherche dichotomique de Git Bisect pour identifier le premier commit ayant introduit un bogue.",
    "brief": "<p>Simulez une recherche dichotomique sur un historique <strong>linéaire</strong>. L'entrée contient <code>HISTORY commits=&lt;c0,c1,...&gt;</code> puis <code>STATUSES &lt;c0&gt;=GOOD &lt;c1&gt;=BAD ...</code>. Les identifiants sont distincts, sans espaces, virgule ni signe égal. Il faut au moins deux commits, le premier <code>GOOD</code>, le dernier <code>BAD</code> et une seule transition de GOOD vers BAD.<br><br>Initialisez <code>low=0</code> et <code>high=N-1</code>. Tant que <code>low &lt; high</code>, calculez <code>mid=(low+high)//2</code> ; si le commit médian est BAD, posez <code>high=mid</code>, sinon <code>low=mid+1</code>. Après chaque étape, affichez <code>BISECT_STEP step={k} testing={id} verdict={GOOD|BAD} remaining={high-low+1}</code>. Enfin, affichez <code>FIRST_BAD_COMMIT id={id}</code>.<br><br>Une liste de moins de deux commits produit <code>BISECT_ERROR reason=INVALID_HISTORY</code>. Un statut manquant, une borne incohérente ou une transition non monotone produit <code>BISECT_ERROR reason=INVALID_STATUSES</code>. Cette simulation n'est pas l'algorithme complet de <code>git bisect</code> sur un graphe de fusions.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e2) — Détecteur de régression dichotomique automatique (git bisect)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifiez d’abord les bornes et la monotonie des statuts.",
      "Conservez l’intervalle inclusif low–high, puis réduisez-le après chaque verdict."
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
    "solution": "#!/usr/bin/env bash\ndeclare -A statuses=()\ncommits=()\nwhile IFS= read -r line || [[ -n $line ]]; do\n  case $line in\n    'HISTORY commits='*)\n      IFS=, read -r -a commits <<< \"${line#HISTORY commits=}\"\n      ;;\n    'STATUSES '*)\n      read -r -a pairs <<< \"${line#STATUSES }\"\n      for pair in \"${pairs[@]}\"; do\n        statuses[${pair%%=*}]=${pair#*=}\n      done\n      ;;\n  esac\ndone\nif ((${#commits[@]} < 2)); then\n  printf 'BISECT_ERROR reason=INVALID_HISTORY\\n'\n  exit 0\nfi\nseen_bad=0\ninvalid=0\nfor commit in \"${commits[@]}\"; do\n  case ${statuses[$commit]-} in\n    GOOD) ((seen_bad)) && invalid=1 ;;\n    BAD) seen_bad=1 ;;\n    *) invalid=1 ;;\n  esac\ndone\nlast=$((${#commits[@]} - 1))\nif [[ ${statuses[${commits[0]}]-} != GOOD || ${statuses[${commits[last]}]-} != BAD ]] || ((invalid)); then\n  printf 'BISECT_ERROR reason=INVALID_STATUSES\\n'\n  exit 0\nfi\nlow=0\nhigh=$last\nstep=0\nwhile ((low < high)); do\n  middle=$(((low + high) / 2))\n  commit=${commits[middle]}\n  verdict=${statuses[$commit]}\n  if [[ $verdict == BAD ]]; then\n    high=$middle\n  else\n    low=$((middle + 1))\n  fi\n  ((step += 1))\n  printf 'BISECT_STEP step=%s testing=%s verdict=%s remaining=%s\\n' \"$step\" \"$commit\" \"$verdict\" \"$((high - low + 1))\"\ndone\nprintf 'FIRST_BAD_COMMIT id=%s\\n' \"${commits[low]}\"\n"
  },
  {
    "id": "gh3-c3-e3",
    "chapter": 3,
    "title": "Gestionnaire de pile de remisage (git stash LIFO stack)",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler le comportement en pile LIFO (Last-In, First-Out) des commandes git stash.",
    "brief": "<p><code>git stash</code> met de côté des modifications dans des objets de commit accessibles par une liste de remises. Simulez cette liste, dont l'entrée la plus récente porte l'indice 0.<br><br>Chaque ligne est <code>STASH_CMD action=&lt;push|pop|apply|drop&gt;</code>. Pour <code>push</code>, ajoutez <code> arg=&lt;message&gt;</code> ; le message peut être vide ou contenir des espaces mais pas de guillemet double. Pour <code>apply</code> et <code>drop</code>, ajoutez <code> arg=&lt;indice décimal non négatif&gt;</code>. <code>push</code> insère au sommet, <code>pop</code> retire le sommet, <code>apply</code> laisse la liste inchangée et <code>drop</code> retire l'entrée indiquée et renumérote les suivantes.<br><br>Pour chaque action, affichez <code>STASH_OP action={action} result={OK|STACK_EMPTY|INDEX_OUT_OF_BOUNDS} current_size={taille} top=\"{message|EMPTY}\"</code>. Sur une liste vide, pop, apply et drop renvoient <code>STACK_EMPTY</code>. Sur une liste non vide, un indice invalide ou hors limites renvoie <code>INDEX_OUT_OF_BOUNDS</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e3) — Gestionnaire de pile de remisage (git stash LIFO stack)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Utilisez un tableau Bash dont l’indice 0 représente l’entrée la plus récente.",
      "Après une suppression, reconstituez un tableau sans trous et ne modifiez pas la pile lors d’un apply."
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
    "solution": "#!/usr/bin/env bash\nstack=()\npattern='^STASH_CMD action=([^[:space:]]+)( arg=(.*))?$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  action=${BASH_REMATCH[1]}\n  argument=${BASH_REMATCH[3]}\n  result=OK\n  case $action in\n    push)\n      stack=(\"$argument\" \"${stack[@]}\")\n      ;;\n    pop)\n      if ((${#stack[@]} == 0)); then\n        result=STACK_EMPTY\n      else\n        stack=(\"${stack[@]:1}\")\n      fi\n      ;;\n    apply|drop)\n      if ((${#stack[@]} == 0)); then\n        result=STACK_EMPTY\n      elif [[ ! $argument =~ ^[0-9]+$ ]]; then\n        result=INDEX_OUT_OF_BOUNDS\n      else\n        index=$argument\n        while ((${#index} > 1)) && [[ $index == 0* ]]; do index=${index#0}; done\n        count=${#stack[@]}\n        if ((${#index} > ${#count})) || ((10#$index >= count)); then\n          result=INDEX_OUT_OF_BOUNDS\n        elif [[ $action == drop ]]; then\n          index=$((10#$index))\n          unset 'stack[index]'\n          stack=(\"${stack[@]}\")\n        fi\n      fi\n      ;;\n  esac\n  if ((${#stack[@]} == 0)); then top=EMPTY; else top=${stack[0]}; fi\n  printf 'STASH_OP action=%s result=%s current_size=%s top=\"%s\"\\n' \"$action\" \"$result\" \"${#stack[@]}\" \"$top\"\ndone\n"
  },
  {
    "id": "gh3-c4-e1",
    "chapter": 4,
    "title": "Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)",
    "level": "n1",
    "language": "shell",
    "goal": "Auditer la création d’une branche et ses opérations selon les règles de gouvernance de Git Flow ou GitHub Flow.",
    "brief": "<p>Auditez les règles <strong>choisies pour cette simulation</strong> ; elles ne décrivent pas toutes les variantes possibles de Git Flow ou GitHub Flow.<br><br>Pour <code>GIT_FLOW</code>, les branches <code>feature/*</code> et <code>release/*</code> partent de <code>develop</code>, les branches <code>hotfix/*</code> partent de <code>main</code> et un push direct sur <code>main</code> ou <code>develop</code> est interdit. Pour <code>GITHUB_FLOW</code>, les branches de travail partent de <code>main</code> et le push direct sur <code>main</code> est interdit. Le contrôle du push protégé est prioritaire ; les branches principales elles-mêmes ne sont pas soumises au contrôle de base.<br><br>Chaque ligne est <code>BRANCH_EVENT wf=&lt;GIT_FLOW|GITHUB_FLOW&gt; branch=&lt;nom&gt; base=&lt;nom&gt; direct_push=&lt;OUI|NON&gt;</code>. Les noms sont valides et sans espaces. Affichez <code>AUDIT branch={branch} status={CONFORME|VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH|BRANCHE_BASE_INVALIDE_ATTENDU_MAIN|BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP|REGLE_NON_DEFINIE}</code>. Pour une branche Git Flow qui ne correspond à aucun des cas énumérés, la règle est non définie.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e1) — Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifiez d’abord le push direct vers une branche protégée.",
      "Pour une branche de travail connue, comparez sa base à celle imposée par le modèle choisi."
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
    "solution": "#!/usr/bin/env bash\npattern='^BRANCH_EVENT wf=([^[:space:]]+) branch=([^[:space:]]+) base=([^[:space:]]+) direct_push=([^[:space:]]+)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  workflow=${BASH_REMATCH[1]}\n  branch=${BASH_REMATCH[2]}\n  base=${BASH_REMATCH[3]}\n  direct_push=${BASH_REMATCH[4]}\n  status=CONFORME\n  if [[ $direct_push == OUI && ( $branch == main || ( $workflow == GIT_FLOW && $branch == develop ) ) ]]; then\n    status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\n  elif [[ $workflow == GITHUB_FLOW ]]; then\n    if [[ $branch != main && $base != main ]]; then status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN; fi\n  elif [[ $workflow == GIT_FLOW ]]; then\n    case $branch in\n      main|develop) ;;\n      feature/*|release/*)\n        if [[ $base != develop ]]; then status=BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP; fi\n        ;;\n      hotfix/*)\n        if [[ $base != main ]]; then status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN; fi\n        ;;\n      *) status=REGLE_NON_DEFINIE ;;\n    esac\n  else\n    status=REGLE_NON_DEFINIE\n  fi\n  printf 'AUDIT branch=%s status=%s\\n' \"$branch\" \"$status\"\ndone\n"
  },
  {
    "id": "gh3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de règles de protection de branches (Branch Protection Rules)",
    "level": "n2",
    "language": "shell",
    "goal": "Appliquer les critères de fusion de Pull Request (approbations requises, statuts CI, signature GPG).",
    "brief": "<p>Simulez une politique de protection de branche choisie pour cet exercice. Les règles GitHub sont configurables ; les signatures vérifiées ne se limitent pas nécessairement à GPG.<br><br>Une ligne <code>CONFIG min_approvals=&lt;n&gt; require_signed=&lt;OUI|NON&gt; linear_history=&lt;OUI|NON&gt;</code> précède les requêtes <code>MERGE_REQ pr=&lt;id&gt; approvals=&lt;n&gt; ci_status=&lt;PASS|FAIL|PENDING&gt; gpg_signed=&lt;OUI|NON&gt; merge_type=&lt;MERGE_COMMIT|SQUASH|REBASE&gt;</code>. Les nombres sont des entiers décimaux de 0 à 2 147 483 647.<br><br>Vérifiez dans l'ordre : le nombre d'approbations est au moins le minimum, la CI vaut PASS, une signature GPG est présente si elle est demandée et un merge commit est interdit si l'historique linéaire est demandé. Affichez le premier motif d'échec : <code>PR_MERGE pr={id} status={AUTHORIZED|BLOCKED} reason={OK|APPROVALS_INSUFFISANTS|CI_CHECKS_FAILED|SIGNATURE_GPG_REQUISE|HISTORIQUE_LINEAIRE_EXIGE}</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e2) — Contrôleur de règles de protection de branches (Branch Protection Rules)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Appliquez les quatre contrôles dans l’ordre indiqué.",
      "La borne d’approbations est inclusive : une égalité satisfait la règle."
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
    "solution": "#!/usr/bin/env bash\nconfig_pattern='^CONFIG min_approvals=([0-9]+) require_signed=(OUI|NON) linear_history=(OUI|NON)$'\nrequest_pattern='^MERGE_REQ pr=([^[:space:]]+) approvals=([0-9]+) ci_status=([^[:space:]]+) gpg_signed=(OUI|NON) merge_type=([^[:space:]]+)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $config_pattern ]]; then\n    minimum=${BASH_REMATCH[1]}\n    require_signed=${BASH_REMATCH[2]}\n    linear_history=${BASH_REMATCH[3]}\n  elif [[ $line =~ $request_pattern ]]; then\n    pr=${BASH_REMATCH[1]}\n    approvals=${BASH_REMATCH[2]}\n    ci_status=${BASH_REMATCH[3]}\n    signed=${BASH_REMATCH[4]}\n    merge_type=${BASH_REMATCH[5]}\n    status=BLOCKED\n    if ((10#$approvals < 10#$minimum)); then\n      reason=APPROVALS_INSUFFISANTS\n    elif [[ $ci_status != PASS ]]; then\n      reason=CI_CHECKS_FAILED\n    elif [[ $require_signed == OUI && $signed != OUI ]]; then\n      reason=SIGNATURE_GPG_REQUISE\n    elif [[ $linear_history == OUI && $merge_type == MERGE_COMMIT ]]; then\n      reason=HISTORIQUE_LINEAIRE_EXIGE\n    else\n      status=AUTHORIZED\n      reason=OK\n    fi\n    printf 'PR_MERGE pr=%s status=%s reason=%s\\n' \"$pr\" \"$status\" \"$reason\"\n  fi\ndone\n"
  },
  {
    "id": "gh3-c4-e3",
    "chapter": 4,
    "title": "Analyseur sémantique de commits selon Conventional Commits",
    "level": "n3",
    "language": "shell",
    "goal": "Analyser des messages de commit selon un sous-ensemble explicite de Conventional Commits.",
    "brief": "<p>Les Conventional Commits structurent les messages ; cet exercice applique un <strong>sous-ensemble</strong> et des règles supplémentaires, pas une validation complète de la spécification.<br><br>Chaque ligne est <code>COMMIT_MSG id=&lt;id&gt; msg=&lt;message&gt;</code>. Le message tient sur une ligne et suit le format <code>&lt;type&gt;[(&lt;scope&gt;)][!]: &lt;description&gt;</code>. Le type doit être en minuscules et appartenir à <code>feat, fix, docs, refactor, test, chore, perf, ci</code> ; la spécification générale accepte aussi d'autres types. Le scope optionnel est non vide et composé de lettres ASCII, chiffres, tirets ou soulignés. Un espace suit obligatoirement les deux-points et la description contient au moins un caractère non blanc.<br><br>Pour ce modèle, un <code>!</code> ou la chaîne <code>BREAKING CHANGE</code> dans le message donne <code>breaking=OUI</code>. La spécification complète prévoit notamment un pied de message <code>BREAKING CHANGE: ...</code> ; une simple mention dans la description ne suffit pas nécessairement dans un vrai commit.<br><br>Affichez <code>CONVENTIONAL_AUDIT id={id} valid=OUI type={type} scope={scope|NONE} breaking={OUI|NON}</code> ou <code>CONVENTIONAL_AUDIT id={id} valid=NON error={FORMAT_INVALIDE|TYPE_INCONNU|DESCRIPTION_VIDE}</code>. Vérifiez d'abord le format, puis le type, puis la description.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e3) — Analyseur sémantique de commits selon Conventional Commits\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Repérez le type, le scope optionnel, le marqueur ! et la description avant de vérifier la liste des types.",
      "Distinguez un séparateur mal formé d’une description vide, puis recherchez le marqueur de rupture demandé par le modèle."
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
    "solution": "#!/usr/bin/env bash\nexport LC_ALL=C\nline_pattern='^COMMIT_MSG id=([^[:space:]]+) msg=(.*)$'\nmessage_pattern='^([a-z]+)(\\(([[:alnum:]_-]+)\\))?(!)?: (.*)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $line_pattern ]] || continue\n  id=${BASH_REMATCH[1]}\n  message=${BASH_REMATCH[2]}\n  if [[ ! $message =~ $message_pattern ]]; then\n    printf 'CONVENTIONAL_AUDIT id=%s valid=NON error=FORMAT_INVALIDE\\n' \"$id\"\n    continue\n  fi\n  type=${BASH_REMATCH[1]}\n  scope=${BASH_REMATCH[3]:-NONE}\n  marker=${BASH_REMATCH[4]}\n  description=${BASH_REMATCH[5]}\n  case $type in\n    feat|fix|docs|refactor|test|chore|perf|ci) ;;\n    *) printf 'CONVENTIONAL_AUDIT id=%s valid=NON error=TYPE_INCONNU\\n' \"$id\"; continue ;;\n  esac\n  if [[ ! $description =~ [^[:space:]] ]]; then\n    printf 'CONVENTIONAL_AUDIT id=%s valid=NON error=DESCRIPTION_VIDE\\n' \"$id\"\n    continue\n  fi\n  breaking=NON\n  if [[ $marker == '!' || $message == *'BREAKING CHANGE'* ]]; then breaking=OUI; fi\n  printf 'CONVENTIONAL_AUDIT id=%s valid=OUI type=%s scope=%s breaking=%s\\n' \"$id\" \"$type\" \"$scope\" \"$breaking\"\ndone\n"
  },
  {
    "id": "gh3-c5-e1",
    "chapter": 5,
    "title": "Validateur de structure de workflow GitHub Actions",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier un profil pédagogique simplifié de workflow GitHub Actions représenté sous forme de lignes.",
    "brief": "<p>Vérifiez un <strong>profil simplifié</strong> de workflow, et non un fichier YAML réel. Dans ce profil, le nom doit être non vide, au moins un déclencheur reconnu doit être présent et chaque job doit avoir un runner et au moins une étape. Ce ne sont pas des obligations universelles de GitHub Actions : le nom du workflow est facultatif, et un job peut appeler un workflow réutilisable avec une structure différente.<br><br>L'entrée contient <code>NAME=&lt;nom&gt;</code>, <code>TRIGGERS=&lt;événements séparés par des virgules&gt;</code> et zéro ou plusieurs lignes <code>JOB id=&lt;id&gt; runs_on=&lt;runner|NONE&gt; steps_count=&lt;n&gt;</code>. Les événements sont distincts et sans espaces ; seuls <code>push</code>, <code>pull_request</code>, <code>workflow_dispatch</code> et <code>schedule</code> sont reconnus par ce profil. Le nom peut contenir des espaces, mais pas de guillemet double ; les autres champs ne contiennent pas d'espaces. Les nombres sont des entiers de 0 à 2 147 483 647.<br><br>Vérifiez dans l'ordre le nom, les déclencheurs, l'existence de jobs, puis chaque job dans l'ordre d'entrée (runner avant étapes). Affichez <code>WORKFLOW_AUDIT name=\"{nom}\" status={VALID|MISSING_NAME|MISSING_TRIGGERS|NO_JOBS|JOB_MISSING_RUNS_ON|JOB_ZERO_STEPS} triggers_count={n} jobs_count={m}</code>. Comptez uniquement les déclencheurs reconnus et tous les jobs déclarés.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e1) — Validateur de structure de workflow GitHub Actions\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifiez d’abord les conditions globales, puis les jobs dans l’ordre de déclaration.",
      "Retournez uniquement le premier motif d’échec tout en comptant tous les jobs."
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
    "solution": "#!/usr/bin/env bash\nname=\ntriggers_count=0\njobs_count=0\njob_error=\njob_pattern='^JOB id=([^[:space:]]+) runs_on=([^[:space:]]+) steps_count=([0-9]+)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  case $line in\n    NAME=*) name=${line#NAME=} ;;\n    TRIGGERS=*)\n      IFS=, read -r -a triggers <<< \"${line#TRIGGERS=}\"\n      triggers_count=0\n      for trigger in \"${triggers[@]}\"; do\n        case $trigger in\n          push|pull_request|workflow_dispatch|schedule) ((triggers_count += 1)) ;;\n        esac\n      done\n      ;;\n    JOB\\ *)\n      if [[ $line =~ $job_pattern ]]; then\n        runner=${BASH_REMATCH[2]}\n        steps=${BASH_REMATCH[3]}\n        ((jobs_count += 1))\n        if [[ -z $job_error ]]; then\n          if [[ $runner == NONE ]]; then\n            job_error=JOB_MISSING_RUNS_ON\n          elif ((10#$steps == 0)); then\n            job_error=JOB_ZERO_STEPS\n          fi\n        fi\n      fi\n      ;;\n  esac\ndone\nif [[ ! $name =~ [^[:space:]] ]]; then\n  status=MISSING_NAME\nelif ((triggers_count == 0)); then\n  status=MISSING_TRIGGERS\nelif ((jobs_count == 0)); then\n  status=NO_JOBS\nelif [[ -n $job_error ]]; then\n  status=$job_error\nelse\n  status=VALID\nfi\nprintf 'WORKFLOW_AUDIT name=\"%s\" status=%s triggers_count=%s jobs_count=%s\\n' \"$name\" \"$status\" \"$triggers_count\" \"$jobs_count\"\n"
  },
  {
    "id": "gh3-c5-e2",
    "chapter": 5,
    "title": "Générateur et évaluateur de matrice de build (strategy: matrix)",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer le produit cartésien des axes d’une matrice de test GitHub Actions et gérer les exclusions.",
    "brief": "<p>Simulez une matrice GitHub Actions avec deux axes. L'entrée commence par <code>MATRIX_DEF os=&lt;os1,os2,...&gt; version=&lt;v1,v2,...&gt;</code>, suivie de zéro ou plusieurs exclusions <code>EXCLUDE os=&lt;os&gt; version=&lt;v&gt;</code>. Chaque valeur d'axe est distincte, non vide et composée de lettres, chiffres, points, tirets ou soulignés ; un axe peut être entièrement vide.<br><br>Parcourez les OS dans leur ordre de déclaration et, pour chacun, les versions dans leur ordre de déclaration ; ce n'est pas un tri alphabétique. Retirez chaque paire exclue, sans compter plusieurs fois une exclusion répétée et sans compter les exclusions hors matrice. Pour chaque paire restante, affichez <code>JOB_INSTANCE os={os} version={v} tag=\"{os}-{v}\"</code>, puis <code>MATRIX_TOTAL instances={n} excluded={nb_paires_retirées}</code>. Cet ordre de génération ne garantit pas l'ordre réel d'exécution des jobs parallèles.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e2) — Générateur et évaluateur de matrice de build (strategy: matrix)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Parcourez les valeurs des deux axes avec deux boucles imbriquées, dans leur ordre d’entrée.",
      "Stockez les exclusions comme ensemble de paires ; comptez uniquement les paires effectivement retirées."
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
    "solution": "#!/usr/bin/env bash\ndeclare -A excluded_pairs=()\noperating_systems=()\nversions=()\ndefinition_pattern='^MATRIX_DEF os=([^[:space:]]*) version=([^[:space:]]*)$'\nexclude_pattern='^EXCLUDE os=([^[:space:]]+) version=([^[:space:]]+)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $definition_pattern ]]; then\n    IFS=, read -r -a operating_systems <<< \"${BASH_REMATCH[1]}\"\n    IFS=, read -r -a versions <<< \"${BASH_REMATCH[2]}\"\n  elif [[ $line =~ $exclude_pattern ]]; then\n    excluded_pairs[${BASH_REMATCH[1]}/${BASH_REMATCH[2]}]=1\n  fi\ndone\ninstances=0\nexcluded=0\nfor operating_system in \"${operating_systems[@]}\"; do\n  for version in \"${versions[@]}\"; do\n    key=$operating_system/$version\n    if [[ ${excluded_pairs[$key]+present} ]]; then\n      ((excluded += 1))\n    else\n      printf 'JOB_INSTANCE os=%s version=%s tag=\"%s-%s\"\\n' \"$operating_system\" \"$version\" \"$operating_system\" \"$version\"\n      ((instances += 1))\n    fi\n  done\ndone\nprintf 'MATRIX_TOTAL instances=%s excluded=%s\\n' \"$instances\" \"$excluded\"\n"
  },
  {
    "id": "gh3-c5-e3",
    "chapter": 5,
    "title": "Détecteur d’injections de commandes et fuites de secrets dans les Actions",
    "level": "n3",
    "language": "shell",
    "goal": "Repérer quelques motifs explicites de divulgation et d’injection dans des commandes GitHub Actions.",
    "brief": "<p>Analysez chaque ligne <code>STEP_INSPECT id=&lt;id&gt; cmd=&lt;commande&gt;</code> avec les règles lexicales suivantes, dans cet ordre :<br>1. Si la commande contient le mot <code>echo</code> ou <code>print</code> et contient aussi <code>secrets.</code> ou <code>GITHUB_TOKEN</code>, affichez <code>VULN_EXPOSED_SECRET</code>.<br>2. Sinon, si elle contient une interpolation directe <code>${{ github.event.issue.title }}</code>, <code>${{ github.event.issue.body }}</code>, <code>${{ github.event.comment.body }}</code> ou <code>${{ github.head_ref }}</code>, affichez <code>VULN_COMMAND_INJECTION</code>. Les espaces autour du nom dans <code>${{ ... }}</code> sont facultatifs.<br>3. Sinon, affichez <code>SECURE</code>.<br><br>La sortie est <code>ACTION_AUDIT step={id} status={statut}</code>. Les identifiants sont sans espaces ; la commande peut en contenir. Ce détecteur est une heuristique limitée : <code>SECURE</code> signifie seulement qu'aucun des motifs indiqués n'a été trouvé, pas que la commande est sûre. Transmettre une valeur non fiable par une variable d'environnement évite son interpolation directe dans le script, mais il faut encore la citer et la valider selon son usage.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e3) — Détecteur d’injections de commandes et fuites de secrets dans les Actions\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Cherchez d’abord les mots echo ou print associés à un marqueur de secret.",
      "Cherchez ensuite les quatre interpolations explicites ; l’absence de ces motifs ne prouve pas la sécurité."
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
    "solution": "#!/usr/bin/env bash\nline_pattern='^STEP_INSPECT id=([^[:space:]]+) cmd=(.*)$'\noutput_pattern='(^|[^[:alnum:]_])(echo|print)([^[:alnum:]_]|$)'\ninjection_pattern='\\$\\{\\{[[:space:]]*github\\.(event\\.issue\\.(title|body)|event\\.comment\\.body|head_ref)[[:space:]]*\\}\\}'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $line_pattern ]] || continue\n  id=${BASH_REMATCH[1]}\n  command=${BASH_REMATCH[2]}\n  if [[ $command =~ $output_pattern ]] && [[ $command == *secrets.* || $command == *GITHUB_TOKEN* ]]; then\n    status=VULN_EXPOSED_SECRET\n  elif [[ $command =~ $injection_pattern ]]; then\n    status=VULN_COMMAND_INJECTION\n  else\n    status=SECURE\n  fi\n  printf 'ACTION_AUDIT step=%s status=%s\\n' \"$id\" \"$status\"\ndone\n"
  },
  {
    "id": "gh3-c6-e1",
    "chapter": 6,
    "title": "Simulateur de Git LFS (Large File Storage) et génération de pointeurs",
    "level": "n1",
    "language": "shell",
    "goal": "Déterminer si un fichier doit être géré par Git LFS et générer le pointeur texte officiel.",
    "brief": "<p>Git LFS remplace, dans le dépôt, le contenu d'un fichier suivi par un petit pointeur texte ; le contenu réel est stocké séparément. La configuration effective de suivi dépend notamment des motifs configurés. Pour cet exercice seulement, utilisez la politique suivante : un chemin terminé, avec respect de la casse, par <code>.iso</code>, <code>.psd</code>, <code>.zip</code>, <code>.tar.gz</code> ou <code>.mp4</code>, ou une taille <code>size_bytes &gt;= 104857600</code> octets, impose LFS. Ce seuil n'est pas une règle automatique universelle de Git LFS.<br><br>Chaque ligne est <code>FILE path=&lt;chemin&gt; size_bytes=&lt;taille&gt; sha256=&lt;64 chiffres hexadécimaux minuscules&gt;</code>. La taille est un entier décimal de 0 à 9 223 372 036 854 775 807, sans zéro initial sauf pour 0. Le chemin peut contenir des espaces mais ni guillemet double ni le délimiteur <code> size_bytes=</code>. Le SHA-256 est fourni : le contenu du fichier n'est pas disponible pour le recalculer.<br><br>Pour un fichier ordinaire, affichez <code>LFS_DECISION file=\"{path}\" mode=GIT_BLOB</code>. Pour LFS, affichez <code>LFS_DECISION file=\"{path}\" mode=LFS_POINTER oid=\"{sha256}\" size={size_bytes}</code>, puis les trois lignes du pointeur v1 :<br><code>version https://git-lfs.github.com/spec/v1</code><br><code>oid sha256:{sha256}</code><br><code>size {size_bytes}</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c6-e1) — Simulateur de Git LFS (Large File Storage) et génération de pointeurs\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Appliquez la politique du modèle : extension surveillée ou taille supérieure ou égale à 104857600.",
      "Reprenez le SHA-256 fourni et écrivez les trois lignes du pointeur v1 dans l’ordre."
    ],
    "examples": [
      {
        "stdin": "FILE path=videos/intro.mp4 size_bytes=52428800 sha256=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890\nFILE path=src/main.py size_bytes=2048 sha256=00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff",
        "expected": "LFS_DECISION file=\"videos/intro.mp4\" mode=LFS_POINTER oid=\"abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890\" size=52428800\nversion https://git-lfs.github.com/spec/v1\noid sha256:abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890\nsize 52428800\nLFS_DECISION file=\"src/main.py\" mode=GIT_BLOB",
        "note": "Le fichier MP4 est suivi et son pointeur est produit ; le script Python reste un blob Git."
      }
    ],
    "tests": [
      {
        "label": "Seuil LFS et valeurs voisines",
        "stdin": "FILE path=before.bin size_bytes=104857599 sha256=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\nFILE path=equal.bin size_bytes=104857600 sha256=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\nFILE path=after.bin size_bytes=104857601 sha256=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        "expected": "LFS_DECISION file=\"before.bin\" mode=GIT_BLOB\nLFS_DECISION file=\"equal.bin\" mode=LFS_POINTER oid=\"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\" size=104857600\nversion https://git-lfs.github.com/spec/v1\noid sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\nsize 104857600\nLFS_DECISION file=\"after.bin\" mode=LFS_POINTER oid=\"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\" size=104857601\nversion https://git-lfs.github.com/spec/v1\noid sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\nsize 104857601"
      },
      {
        "label": "Extension suivie à zéro octet et casse distincte",
        "stdin": "FILE path=vide.iso size_bytes=0 sha256=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\nFILE path=photo.ISO size_bytes=0 sha256=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        "expected": "LFS_DECISION file=\"vide.iso\" mode=LFS_POINTER oid=\"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\" size=0\nversion https://git-lfs.github.com/spec/v1\noid sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\nsize 0\nLFS_DECISION file=\"photo.ISO\" mode=GIT_BLOB"
      },
      {
        "label": "Fichier non LFS dépassant 100 Mo",
        "stdin": "FILE path=data/raw_dataset.bin size_bytes=150000000 sha256=112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00",
        "expected": "LFS_DECISION file=\"data/raw_dataset.bin\" mode=LFS_POINTER oid=\"112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00\" size=150000000\nversion https://git-lfs.github.com/spec/v1\noid sha256:112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00\nsize 150000000"
      },
      {
        "label": "Fichiers graphiques et archives éligibles",
        "stdin": "FILE path=design/mockup.psd size_bytes=15000000 sha256=aaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999\nFILE path=backups/site.tar.gz size_bytes=20000000 sha256=bbbbccccddddeeeeffff0000111122223333444455556666777788889999aaaa",
        "expected": "LFS_DECISION file=\"design/mockup.psd\" mode=LFS_POINTER oid=\"aaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999\" size=15000000\nversion https://git-lfs.github.com/spec/v1\noid sha256:aaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999\nsize 15000000\nLFS_DECISION file=\"backups/site.tar.gz\" mode=LFS_POINTER oid=\"bbbbccccddddeeeeffff0000111122223333444455556666777788889999aaaa\" size=20000000\nversion https://git-lfs.github.com/spec/v1\noid sha256:bbbbccccddddeeeeffff0000111122223333444455556666777788889999aaaa\nsize 20000000"
      },
      {
        "label": "Fichier léger sans extension spéciale",
        "stdin": "FILE path=README.md size_bytes=1200 sha256=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        "expected": "LFS_DECISION file=\"README.md\" mode=GIT_BLOB"
      }
    ],
    "solution": "#!/usr/bin/env bash\npattern='^FILE path=(.*) size_bytes=([0-9]+) sha256=([0-9a-f]{64})$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  path=${BASH_REMATCH[1]}\n  size=${BASH_REMATCH[2]}\n  sha256=${BASH_REMATCH[3]}\n  if [[ $path == *.iso || $path == *.psd || $path == *.zip || $path == *.tar.gz || $path == *.mp4 ]] || ((10#$size >= 104857600)); then\n    printf 'LFS_DECISION file=\"%s\" mode=LFS_POINTER oid=\"%s\" size=%s\\n' \"$path\" \"$sha256\" \"$size\"\n    printf 'version https://git-lfs.github.com/spec/v1\\noid sha256:%s\\nsize %s\\n' \"$sha256\" \"$size\"\n  else\n    printf 'LFS_DECISION file=\"%s\" mode=GIT_BLOB\\n' \"$path\"\n  fi\ndone\n"
  },
  {
    "id": "gh3-c6-e2",
    "chapter": 6,
    "title": "Validateur de Hook Git pre-commit (Détection de secrets & conflits)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler les contrôles d’un hook pre-commit sur quelques motifs de conflit et de secrets.",
    "brief": "<p>Un hook Git <code>pre-commit</code> peut interrompre un commit en renvoyant un code non nul ; il peut aussi être contourné avec <code>git commit --no-verify</code>. Ici, vous ne créez pas de vrai hook : simulez uniquement ses décisions sur les lignes <code>INSPECT_FILE file=&lt;chemin&gt; content=&lt;contenu&gt;</code>. Les chemins peuvent contenir des espaces mais ni guillemet double ni le délimiteur <code> content=</code> ; le contenu tient sur une ligne et peut représenter des retours à la ligne par <code>\\n</code>.<br><br>Vérifiez ces motifs dans l'ordre : les chaînes <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code> ou <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> donnent <code>MERGE_CONFLICT_MARKERS</code> ; <code>AKIA</code> suivi d'au moins 16 lettres majuscules ASCII ou chiffres donne <code>HARDCODED_AWS_KEY</code> ; <code>ghp_</code> suivi d'au moins 20 lettres ASCII ou chiffres donne <code>HARDCODED_GITHUB_TOKEN</code> ; sinon le résultat est <code>CLEAN</code>.<br><br>Affichez <code>HOOK_RESULT file=\"{file}\" verdict={COMMIT_ACCEPTED|COMMIT_REJECTED} reason={reason}</code>. Ces motifs sont pédagogiques : une correspondance ne prouve pas qu'un identifiant soit actif, et leur absence ne garantit pas l'absence de secret.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c6-e2) — Validateur de Hook Git pre-commit (Détection de secrets & conflits)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifiez les marqueurs de conflit avant les motifs d’identifiants.",
      "Utilisez les expressions régulières de Bash et testez les longueurs immédiatement inférieure et égale aux bornes."
    ],
    "examples": [
      {
        "stdin": "INSPECT_FILE file=app.py content=AWS_KEY = \"AKIAIOSFODNN7EXAMPLE123\"\nINSPECT_FILE file=main.py content=print(\"Hello World\")",
        "expected": "HOOK_RESULT file=\"app.py\" verdict=COMMIT_REJECTED reason=HARDCODED_AWS_KEY\nHOOK_RESULT file=\"main.py\" verdict=COMMIT_ACCEPTED reason=CLEAN",
        "note": "La clé AWS bloque le commit, le code sain est accepté."
      }
    ],
    "tests": [
      {
        "label": "Priorité des conflits et contenu vide",
        "stdin": "INSPECT_FILE file=priorite content=<<<<<<< AKIABBBBBBBBBBBBBBBB ghp_ZZZZZZZZZZZZZZZZZZZZ\nINSPECT_FILE file=vide content=",
        "expected": "HOOK_RESULT file=\"priorite\" verdict=COMMIT_REJECTED reason=MERGE_CONFLICT_MARKERS\nHOOK_RESULT file=\"vide\" verdict=COMMIT_ACCEPTED reason=CLEAN"
      },
      {
        "label": "Bornes de longueur AWS et GitHub",
        "stdin": "INSPECT_FILE file=a15 content=AKIABBBBBBBBBBBBBBB\nINSPECT_FILE file=a16 content=AKIABBBBBBBBBBBBBBBB\nINSPECT_FILE file=g19 content=ghp_ZZZZZZZZZZZZZZZZZZZ\nINSPECT_FILE file=g20 content=ghp_ZZZZZZZZZZZZZZZZZZZZ",
        "expected": "HOOK_RESULT file=\"a15\" verdict=COMMIT_ACCEPTED reason=CLEAN\nHOOK_RESULT file=\"a16\" verdict=COMMIT_REJECTED reason=HARDCODED_AWS_KEY\nHOOK_RESULT file=\"g19\" verdict=COMMIT_ACCEPTED reason=CLEAN\nHOOK_RESULT file=\"g20\" verdict=COMMIT_REJECTED reason=HARDCODED_GITHUB_TOKEN"
      },
      {
        "label": "Marqueurs de conflit non résolus",
        "stdin": "INSPECT_FILE file=routes.js content=<<<<<<< HEAD\\nconst v = 1;\\n=======",
        "expected": "HOOK_RESULT file=\"routes.js\" verdict=COMMIT_REJECTED reason=MERGE_CONFLICT_MARKERS"
      },
      {
        "label": "Jeton GitHub personnel détecté",
        "stdin": "INSPECT_FILE file=.env content=GITHUB_PAT=ghp_1234567890abcdefghijklmnopqrstuvwxyz",
        "expected": "HOOK_RESULT file=\".env\" verdict=COMMIT_REJECTED reason=HARDCODED_GITHUB_TOKEN"
      },
      {
        "label": "Code complexe propre et commenté",
        "stdin": "INSPECT_FILE file=service.py content=def process():\\n    # Standard process without secrets\\n    return True",
        "expected": "HOOK_RESULT file=\"service.py\" verdict=COMMIT_ACCEPTED reason=CLEAN"
      },
      {
        "label": "Longueur AWS minimale",
        "stdin": "INSPECT_FILE file=aws.txt content=AKIAAAAAAAAAAAAAAAAA",
        "expected": "HOOK_RESULT file=\"aws.txt\" verdict=COMMIT_REJECTED reason=HARDCODED_AWS_KEY"
      },
      {
        "label": "Longueur GitHub minimale",
        "stdin": "INSPECT_FILE file=github.txt content=ghp_aaaaaaaaaaaaaaaaaaaa",
        "expected": "HOOK_RESULT file=\"github.txt\" verdict=COMMIT_REJECTED reason=HARDCODED_GITHUB_TOKEN"
      }
    ],
    "solution": "#!/usr/bin/env bash\nline_pattern='^INSPECT_FILE file=(.*) content=(.*)$'\naws_pattern='AKIA[0-9A-Z]{16,}'\ngithub_pattern='ghp_[0-9A-Za-z]{20,}'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $line_pattern ]] || continue\n  file=${BASH_REMATCH[1]}\n  content=${BASH_REMATCH[2]}\n  verdict=COMMIT_REJECTED\n  if [[ $content == *'<<<<<<<'* || $content == *'======='* || $content == *'>>>>>>>'* ]]; then\n    reason=MERGE_CONFLICT_MARKERS\n  elif [[ $content =~ $aws_pattern ]]; then\n    reason=HARDCODED_AWS_KEY\n  elif [[ $content =~ $github_pattern ]]; then\n    reason=HARDCODED_GITHUB_TOKEN\n  else\n    verdict=COMMIT_ACCEPTED\n    reason=CLEAN\n  fi\n  printf 'HOOK_RESULT file=\"%s\" verdict=%s reason=%s\\n' \"$file\" \"$verdict\" \"$reason\"\ndone\n"
  },
  {
    "id": "gh3-c6-e3",
    "chapter": 6,
    "title": "Purge médico-légale de secrets dans l’historique (git-filter-repo)",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler la réécriture d’un historique Git pour expurger un fichier confidentiel commité par erreur.",
    "brief": "<p>Retirer un fichier sensible d'un commit récent ne l'efface pas des anciens commits. GitHub recommande notamment <code>git-filter-repo</code> pour réécrire l'historique ; un secret compromis doit aussi être révoqué ou renouvelé. Cet exercice est une simulation : les identifiants <code>r_{id}</code> ne sont pas de vrais hachages et aucun dépôt n'est modifié.<br><br>Déclarez zéro ou plusieurs lignes <code>COMMIT id=&lt;id&gt; files=&lt;f1,f2,...&gt; parents=&lt;p1,p2,...|NONE&gt;</code>, puis <code>PURGE_FILE target=&lt;fichier&gt;</code>. Une liste de fichiers vide s'écrit <code>files=</code>. Les noms sont distincts au sein de chaque liste et, comme les identifiants, ne contiennent ni espaces ni virgule. Les commits sont distincts, acycliques et déclarés après tous leurs parents.<br><br>Retirez le fichier cible de chaque instantané. Un commit est réécrit s'il contenait le fichier ou si au moins un de ses parents a été réécrit ; son nouvel identifiant est <code>r_{id}</code>. Les autres restent inchangés. La tête simulée est le dernier commit déclaré, ou <code>NONE</code> si l'historique est vide.<br><br>Affichez <code>PURGE_RESULT target=\"{fichier}\" impacted_count={nombre_de_commits_réécrits} new_tip_hash=\"{id_de_tête}\"</code>, puis pour chaque commit réécrit dans l'ordre d'entrée <code>REWRITTEN_COMMIT old=\"{id}\" new=\"r_{id}\" remaining_files=[{fichiers}]</code>. Conservez l'ordre des fichiers restants.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c6-e3) — Purge médico-légale de secrets dans l’historique (git-filter-repo)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Parcourez les commits dans l’ordre où tous leurs parents sont déjà connus.",
      "Réécrivez un commit si le fichier est présent ou si au moins un parent a été réécrit."
    ],
    "examples": [
      {
        "stdin": "COMMIT id=C1 files=main.py,.env parents=NONE\nCOMMIT id=C2 files=main.py parents=C1\nPURGE_FILE target=.env",
        "expected": "PURGE_RESULT target=\".env\" impacted_count=2 new_tip_hash=\"r_C2\"\nREWRITTEN_COMMIT old=\"C1\" new=\"r_C1\" remaining_files=[main.py]\nREWRITTEN_COMMIT old=\"C2\" new=\"r_C2\" remaining_files=[main.py]",
        "note": "C1 contenait .env donc il est réécrit en r_C1, et C2 ayant r_C1 pour parent est réécrit en r_C2."
      }
    ],
    "tests": [
      {
        "label": "Historique sans commit",
        "stdin": "PURGE_FILE target=cle.txt",
        "expected": "PURGE_RESULT target=\"cle.txt\" impacted_count=0 new_tip_hash=\"NONE\""
      },
      {
        "label": "Suppression du seul fichier et propagation depuis un second parent",
        "stdin": "COMMIT id=left files=guide parents=NONE\nCOMMIT id=right files=cle.txt parents=NONE\nCOMMIT id=merge files=guide parents=left,right\nPURGE_FILE target=cle.txt",
        "expected": "PURGE_RESULT target=\"cle.txt\" impacted_count=2 new_tip_hash=\"r_merge\"\nREWRITTEN_COMMIT old=\"right\" new=\"r_right\" remaining_files=[]\nREWRITTEN_COMMIT old=\"merge\" new=\"r_merge\" remaining_files=[guide]"
      },
      {
        "label": "Fichier cible non présent dans l’historique",
        "stdin": "COMMIT id=A1 files=index.html parents=NONE\nCOMMIT id=A2 files=styles.css parents=A1\nPURGE_FILE target=secrets.json",
        "expected": "PURGE_RESULT target=\"secrets.json\" impacted_count=0 new_tip_hash=\"A2\""
      },
      {
        "label": "Fichier sensible introduit dans le dernier commit uniquement",
        "stdin": "COMMIT id=10 files=README.md parents=NONE\nCOMMIT id=20 files=app.py,id_rsa parents=10\nPURGE_FILE target=id_rsa",
        "expected": "PURGE_RESULT target=\"id_rsa\" impacted_count=1 new_tip_hash=\"r_20\"\nREWRITTEN_COMMIT old=\"20\" new=\"r_20\" remaining_files=[app.py]"
      },
      {
        "label": "Trois commits avec propagation complète",
        "stdin": "COMMIT id=X1 files=a.txt,leak.key parents=NONE\nCOMMIT id=X2 files=b.txt parents=X1\nCOMMIT id=X3 files=c.txt parents=X2\nPURGE_FILE target=leak.key",
        "expected": "PURGE_RESULT target=\"leak.key\" impacted_count=3 new_tip_hash=\"r_X3\"\nREWRITTEN_COMMIT old=\"X1\" new=\"r_X1\" remaining_files=[a.txt]\nREWRITTEN_COMMIT old=\"X2\" new=\"r_X2\" remaining_files=[b.txt]\nREWRITTEN_COMMIT old=\"X3\" new=\"r_X3\" remaining_files=[c.txt]"
      }
    ],
    "solution": "#!/usr/bin/env bash\ndeclare -A files_by_id=() parents_by_id=() rewritten=()\ncommits=()\nrewritten_ids=()\nrewritten_files=()\ncommit_pattern='^COMMIT id=([^[:space:]]+) files=([^[:space:]]*) parents=([^[:space:]]+)$'\ntarget_pattern='^PURGE_FILE target=([^[:space:]]+)$'\ntarget=\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $commit_pattern ]]; then\n    id=${BASH_REMATCH[1]}\n    commits+=(\"$id\")\n    files_by_id[$id]=${BASH_REMATCH[2]}\n    parents_by_id[$id]=${BASH_REMATCH[3]}\n  elif [[ $line =~ $target_pattern ]]; then\n    target=${BASH_REMATCH[1]}\n  fi\ndone\nfor id in \"${commits[@]}\"; do\n  changed=0\n  remaining=()\n  IFS=, read -r -a files <<< \"${files_by_id[$id]}\"\n  for file in \"${files[@]}\"; do\n    if [[ $file == \"$target\" ]]; then changed=1; else remaining+=(\"$file\"); fi\n  done\n  if [[ ${parents_by_id[$id]} != NONE ]]; then\n    IFS=, read -r -a parents <<< \"${parents_by_id[$id]}\"\n    for parent in \"${parents[@]}\"; do\n      if [[ ${rewritten[$parent]+present} ]]; then changed=1; fi\n    done\n  fi\n  if ((changed)); then\n    rewritten[$id]=r_$id\n    rewritten_ids+=(\"$id\")\n    remaining_list=$(IFS=,; printf '%s' \"${remaining[*]}\")\n    rewritten_files+=(\"$remaining_list\")\n  fi\ndone\nif ((${#commits[@]} == 0)); then\n  tip=NONE\nelse\n  tip=${commits[${#commits[@]}-1]}\n  tip=${rewritten[$tip]:-$tip}\nfi\nprintf 'PURGE_RESULT target=\"%s\" impacted_count=%s new_tip_hash=\"%s\"\\n' \"$target\" \"${#rewritten_ids[@]}\" \"$tip\"\nfor ((index = 0; index < ${#rewritten_ids[@]}; index += 1)); do\n  id=${rewritten_ids[index]}\n  printf 'REWRITTEN_COMMIT old=\"%s\" new=\"%s\" remaining_files=[%s]\\n' \"$id\" \"${rewritten[$id]}\" \"${rewritten_files[index]}\"\ndone\n"
  }
];

module.exports = GH3_EXERCISES;
