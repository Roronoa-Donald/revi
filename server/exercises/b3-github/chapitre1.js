'use strict';

module.exports = [
  {
    "id": "gh3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)",
    "level": "n1",
    "language": "shell",
    "goal": "Calculer le hash SHA-1 exact d’un objet Git selon le formatage canonique interne du stockage objet.",
    "brief": "<p>Dans un dépôt configuré en SHA-1, l'identifiant d'un objet est le condensat SHA-1 de l'en-tête <code>type taille_octets\\0</code> suivi du contenu brut. La taille est comptée en octets, et non en caractères.<br><br>Chaque ligne d'entrée a la forme <code>OBJECT type=&lt;type&gt; content=&lt;texte&gt;</code>. Le texte peut être vide, contenir des espaces ou des caractères UTF-8 ; la suite littérale <code>\\n</code> représente un saut de ligne dans son contenu. Les octets nuls et les contenus binaires arbitraires ne sont pas représentables dans ce format.<br><br>Pour chaque objet, affichez <code>GIT_HASH type={type} size={taille} sha1={hash_hex}</code>, avec 40 chiffres hexadécimaux en minuscules.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c1-e1) — Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "L’en-tête contient le type, un espace, la taille en octets et un octet nul.",
      "Comptez les octets UTF-8 après décodage des sauts de ligne, puis hachez l’en-tête et le contenu ensemble.",
      "1. Extraire type et contenu. 2. Décoder \\n en saut de ligne. 3. Taille = nombre d’octets UTF-8 du contenu. 4. Hacher type + espace + taille + \\0 + contenu. 5. Afficher GIT_HASH avec les trois valeurs."
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
    "solution": "#!/usr/bin/env bash\nset -o pipefail\nexport LC_ALL=C\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line == \"OBJECT type=\"*\" content=\"* ]] || continue\n  fields=${line#OBJECT type=}\n  object_type=${fields%% content=*}\n  content=${fields#* content=}\n  content=${content//\\\\n/$'\\n'}\n  size=${#content}\n  digest=$(printf '%s %s\\0%s' \"$object_type\" \"$size\" \"$content\" | sha1sum)\n  printf 'GIT_HASH type=%s size=%s sha1=%s\\n' \"$object_type\" \"$size\" \"${digest%% *}\"\ndone\n",
    "takeaway": "Git calcule l’empreinte SHA-1 sur l’en-tête type+taille+octet nul suivi du contenu, garantissant l’intégrité immuable de chaque blob."
  },
  {
    "id": "gh3-c1-e2",
    "chapter": 1,
    "title": "Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)",
    "level": "n2",
    "language": "shell",
    "goal": "Analyser les entrées d’un objet Tree Git et afficher l’inventaire des blobs et sous-arbres avec leur mode.",
    "brief": "<p>Un objet Tree associe à chaque entrée un mode, un type, un identifiant SHA-1 et un nom. Dans cet exercice, <code>100644</code> désigne un blob ordinaire, <code>100755</code> un blob exécutable, <code>120000</code> un lien symbolique (blob) et <code>040000</code> un sous-arbre.<br><br>Lisez zéro ou plusieurs lignes <code>ENTRY mode=&lt;mode&gt; type=&lt;blob|tree&gt; sha1=&lt;40 chiffres hexadécimaux&gt; name=&lt;nom&gt;</code>. Les noms sont non vides et distincts, peuvent contenir des espaces, mais ni tabulation ni saut de ligne. Une entrée standard vide représente un arbre vide.<br><br>Triez les entrées par nom, selon l'ordre des octets (locale C), puis affichez chacune sous la forme <code>{mode} {type} {sha1}\t{name}</code>, avec une vraie tabulation avant le nom. Terminez par <code>TREE_SUMMARY total={n} blobs={nb_blobs} subtrees={nb_trees} executables={nb_exec}</code>. Chaque ligne affichée, y compris la dernière, se termine par un saut de ligne.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c1-e2) — Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Découpez les champs sans couper les espaces du nom.",
      "Triez selon l’ordre des octets et comptez séparément blobs, sous-arbres et modes 100755.",
      "1. Extraire mode, type, sha1 et nom. 2. Cumuler total, blobs, sous-arbres et exécutables. 3. Trier les entrées par nom. 4. Afficher chaque entrée puis TREE_SUMMARY."
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
    "solution": "#!/usr/bin/env bash\nset -o pipefail\nexport LC_ALL=C\nrows=()\ntotal=0\nblobs=0\nsubtrees=0\nexecutables=0\npattern='^ENTRY mode=([^[:space:]]+) type=([^[:space:]]+) sha1=([^[:space:]]+) name=(.*)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  mode=${BASH_REMATCH[1]}\n  type=${BASH_REMATCH[2]}\n  sha1=${BASH_REMATCH[3]}\n  name=${BASH_REMATCH[4]}\n  rows+=(\"$name\"$'\\t'\"$mode\"$'\\t'\"$type\"$'\\t'\"$sha1\")\n  ((total += 1))\n  [[ $type == blob ]] && ((blobs += 1))\n  [[ $type == tree ]] && ((subtrees += 1))\n  [[ $mode == 100755 ]] && ((executables += 1))\ndone\nif ((total > 0)); then\n  printf '%s\\n' \"${rows[@]}\" | sort -t $'\\t' -k1,1 | while IFS=$'\\t' read -r name mode type sha1; do\n    printf '%s %s %s\\t%s\\n' \"$mode\" \"$type\" \"$sha1\" \"$name\"\n  done\nfi\nprintf 'TREE_SUMMARY total=%s blobs=%s subtrees=%s executables=%s\\n' \"$total\" \"$blobs\" \"$subtrees\" \"$executables\"\n",
    "takeaway": "Un objet tree associe mode POSIX, type d’objet, hash et nom pour représenter fidèlement chaque instantané de répertoire."
  },
  {
    "id": "gh3-c1-e3",
    "chapter": 1,
    "title": "Résolveur de références symboliques & pointeur HEAD (git rev-parse)",
    "level": "n3",
    "language": "shell",
    "goal": "Résoudre la chaîne de pointeurs de références de Git pour déterminer le commit actif pointé par HEAD.",
    "brief": "<p>Une référence Git peut contenir directement un identifiant de commit ou renvoyer à une autre référence. HEAD pointe généralement vers une branche ; lorsqu'il contient directement un identifiant de commit, il est détaché.<br><br>Déclarez d'abord des lignes <code>REF name=&lt;nom&gt; target=&lt;hash|ref: autre_ref&gt;</code>, puis des requêtes <code>RESOLVE name=&lt;nom&gt;</code>. Les noms ne contiennent pas d'espaces. Suivez les liens symboliques et indiquez le chemin de résolution.<br><br>Pour une chaîne résolue : <code>RESOLVED name={name} commit={hash} state={state} path={chaine_de_refs}</code>. Dans ce modèle, <code>BRANCH_REF</code> signifie que HEAD renvoie directement à <code>refs/heads/...</code>, <code>DETACHED_HEAD</code> que HEAD contient directement le hash, <code>DIRECT_REF</code> qu'une autre référence contient directement le hash et <code>SYMBOLIC_REF</code> qu'une autre chaîne est symbolique. Une référence absente, même intermédiaire, produit <code>RESOLVED name={name} status=NOT_FOUND</code> ; un cycle produit <code>RESOLVED name={name} status=CYCLE</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c1-e3) — Résolveur de références symboliques & pointeur HEAD (git rev-parse)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Stockez les définitions de références puis suivez chaque cible commençant par « ref: ».",
      "Mémorisez les références déjà visitées pour détecter les cycles et distinguez une branche d’un tag direct.",
      "1. Mémoriser chaque REF dans une table. 2. Partir du nom demandé ; absent = NOT_FOUND. 3. Suivre les cibles ref: en marquant les vues ; revisiter = CYCLE. 4. Arrivé sur un hash, afficher commit, état et chemin."
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
    "solution": "#!/usr/bin/env bash\ndeclare -A refs=()\nref_pattern='^REF name=([^[:space:]]+) target=(.*)$'\nresolve_pattern='^RESOLVE name=([^[:space:]]+)$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $ref_pattern ]]; then\n    refs[${BASH_REMATCH[1]}]=${BASH_REMATCH[2]}\n  elif [[ $line =~ $resolve_pattern ]]; then\n    name=${BASH_REMATCH[1]}\n    if [[ ! ${refs[$name]+present} ]]; then\n      printf 'RESOLVED name=%s status=NOT_FOUND\\n' \"$name\"\n      continue\n    fi\n    initial=${refs[$name]}\n    state=DIRECT_REF\n    if [[ $name == HEAD && $initial != 'ref: '* ]]; then\n      state=DETACHED_HEAD\n    elif [[ $name == HEAD && $initial == 'ref: refs/heads/'* ]]; then\n      state=BRANCH_REF\n    elif [[ $initial == 'ref: '* ]]; then\n      state=SYMBOLIC_REF\n    fi\n    current=$name\n    path=$name\n    unset seen\n    declare -A seen=()\n    status=OK\n    while :; do\n      if [[ ${seen[$current]+present} ]]; then\n        status=CYCLE\n        break\n      fi\n      seen[$current]=1\n      if [[ ! ${refs[$current]+present} ]]; then\n        status=NOT_FOUND\n        break\n      fi\n      target=${refs[$current]}\n      if [[ $target != 'ref: '* ]]; then\n        break\n      fi\n      current=${target#ref: }\n      path+=\" -> $current\"\n    done\n    if [[ $status == OK ]]; then\n      printf 'RESOLVED name=%s commit=%s state=%s path=%s\\n' \"$name\" \"$target\" \"$state\" \"$path\"\n    else\n      printf 'RESOLVED name=%s status=%s\\n' \"$name\" \"$status\"\n    fi\n  fi\ndone\n",
    "takeaway": "HEAD pointe normalement vers une référence de branche symbolique, et ne devient détaché qu’en pointant directement sur un SHA de commit."
  }
];
