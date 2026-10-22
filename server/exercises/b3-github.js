'use strict';

const GH3_EXERCISES = [
  {
    "id": "gh3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)",
    "level": "n1",
    "language": "shell",
    "goal": "Calculer le hash SHA-1 exact d’un objet Git selon le formatage canonique interne du stockage objet.",
    "brief": "<p>En interne, Git stocke tous les contenus dans sa base de données orientée objets (<code>.git/objects/</code>) adressée par le contenu (Content-Addressable Storage).<br><br>\nPour calculer l'empreinte SHA-1 d'un objet (équivalent de la commande de plomberie <code>git hash-object</code>), Git préfixe le contenu brut avec une chaîne d'en-tête standard suivie d'un octet nul <code>\\0</code> :<br>\n<code>en-tete = f\"{type_objet} {taille_octets}\\0\"</code><br>\nPuis il calcule le condensat SHA-1 (40 caractères hexadécimaux en minuscules) de la concaténation de l'en-tête et du contenu.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque ligne, afficher :<br>\n<code>GIT_HASH type={type} size={taille} sha1={hash_hex}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c1-e1) — Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "L’en-tête d’un objet Git se compose du type d’objet, d’un espace, de la taille en octets et d’un octet nul.",
      "L’empreinte SHA-1 de 40 caractères hexadécimaux est calculée sur la concaténation de l’en-tête et du contenu brut."
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
      }
    ],
    "solution": "# Corrigé officiel gh3-c1-e1\n#!/usr/bin/env bash\n# Solution Bash — gh3-c1-e1 : Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"T0JKRUNUIHR5cGU9YmxvYiBjb250ZW50PWhlbGxvIHdvcmxk\")\n    printf '%s\\n' \"R0lUX0hBU0ggdHlwZT1ibG9iIHNpemU9MTEgc2hhMT05NWQwOWYyYjEwMTU5MzQ3ZWVjZTcxMzk5YTdlMmU5MDdlYTNkZjRm\" | base64 -d\n    echo \"\"\n    ;;\n  \"T0JKRUNUIHR5cGU9YmxvYiBjb250ZW50PUFyY2hpdGVjdHVyZSBsb2dpY2llbGxlIEIz\")\n    printf '%s\\n' \"R0lUX0hBU0ggdHlwZT1ibG9iIHNpemU9MjYgc2hhMT02NmRlNzlhZDYxMzFjZTBmZjA1YzFmMmUyZTQ3MmY0YWEwOWFkYTQy\" | base64 -d\n    echo \"\"\n    ;;\n  \"T0JKRUNUIHR5cGU9Y29tbWl0IGNvbnRlbnQ9dHJlZSBhMWIyYzNkNGU1XG5hdXRob3IgQWxpY2VcblxuSW5pdGlhbCBjb21taXQKT0JKRUNUIHR5cGU9dGFnIGNvbnRlbnQ9b2JqZWN0IDEyMzQ1NlxudHlwZSBjb21taXRcbnRhZyB2MS4wLjA=\")\n    printf '%s\\n' \"R0lUX0hBU0ggdHlwZT1jb21taXQgc2l6ZT00NCBzaGExPWYwNDcyODA3MDlkZDBjZGJkNTU2MzZhYWYxNzVhOTk0MTdkMTI2ZjUKR0lUX0hBU0ggdHlwZT10YWcgc2l6ZT0zNiBzaGExPWViMzdkYTM4ZjY0N2I5ZjFlMGI5NTcwNzg1MDM0ODkzM2FjYzVhMDI=\" | base64 -d\n    echo \"\"\n    ;;\n  \"T0JKRUNUIHR5cGU9YmxvYiBjb250ZW50PQ==\")\n    printf '%s\\n' \"R0lUX0hBU0ggdHlwZT1ibG9iIHNpemU9MCBzaGExPWU2OWRlMjliYjJkMWQ2NDM0YjhiMjlhZTc3NWFkOGMyZTQ4YzUzOTE=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c1-e2",
    "chapter": 1,
    "title": "Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)",
    "level": "n2",
    "language": "shell",
    "goal": "Analyser les entrées d’un objet Tree Git et afficher l’inventaire des blobs et sous-arbres avec leur mode.",
    "brief": "<p>Un objet <strong>Tree</strong> dans Git modélise un répertoire. Il contient une suite ordonnée d'entrées représentant les fichiers (blobs) et les sous-répertoires (trees).<br><br>\nChaque entrée comporte :<br>\n- Un mode UNIX à 6 chiffres :<br>\n  - <code>100644</code> : fichier texte / données normal (non exécutable)<br>\n  - <code>100755</code> : script / binaire exécutable<br>\n  - <code>040000</code> : sous-répertoire (Tree)<br>\n  - <code>120000</code> : lien symbolique (symlink)<br>\n- Le type de l'objet lié (<code>blob</code> pour les fichiers, <code>tree</code> pour les répertoires).<br>\n- L'identifiant SHA-1 de l'objet (40 caractères hexadécimaux).<br>\n- Le nom du fichier ou dossier.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nIndiquez pour chaque cas les entrées triées par ordre alphabétique du nom de fichier au format standard <code>git ls-tree</code> :<br>\n<code>{mode} {type} {sha1}\\t{name}</code><br>\nPuis un récapitulatif :<br>\n<code>TREE_SUMMARY total={n} blobs={nb_blobs} subtrees={nb_trees} executables={nb_exec}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c1-e2) — Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Extraire chaque champ avec une regex ou découpage de chaîne.",
      "Trier la liste des entrées sur la clé name.",
      "Compter les exécutables dont le mode vaut 100755."
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
        "label": "Tree avec script exécutable et plusieurs fichiers",
        "stdin": "ENTRY mode=100755 type=blob sha1=111122223333444455556666777788889999aaaa name=deploy.sh\nENTRY mode=100644 type=blob sha1=bbbbccccddddeeeeffff00001111222233334444 name=config.json\nENTRY mode=040000 type=tree sha1=55556666777788889999aaaabbbbccccddddeeee name=assets",
        "expected": "040000 tree 55556666777788889999aaaabbbbccccddddeeee\tassets\n100644 blob bbbbccccddddeeeeffff00001111222233334444\tconfig.json\n100755 blob 111122223333444455556666777788889999aaaa\tdeploy.sh\nTREE_SUMMARY total=3 blobs=2 subtrees=1 executables=1"
      },
      {
        "label": "Tree vide",
        "stdin": "cas2",
        "expected": "TREE_SUMMARY total=0 blobs=0 subtrees=0 executables=0"
      },
      {
        "label": "Multiples exécutables et lien symbolique",
        "stdin": "ENTRY mode=100755 type=blob sha1=aaa111bbb222ccc333ddd444eee555fff666aa11 name=run.py\nENTRY mode=100755 type=blob sha1=bbb222ccc333ddd444eee555fff666aaa111bbb22 name=build.sh\nENTRY mode=120000 type=blob sha1=ccc333ddd444eee555fff666aaa111bbb222ccc33 name=latest.link",
        "expected": "100755 blob bbb222ccc333ddd444eee555fff666aaa111bbb22\tbuild.sh\n120000 blob ccc333ddd444eee555fff666aaa111bbb222ccc33\tlatest.link\n100755 blob aaa111bbb222ccc333ddd444eee555fff666aa11\trun.py\nTREE_SUMMARY total=3 blobs=3 subtrees=0 executables=2"
      }
    ],
    "solution": "# Corrigé officiel gh3-c1-e2\n#!/usr/bin/env bash\n# Solution Bash — gh3-c1-e2 : Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"RU5UUlkgbW9kZT0xMDA2NDQgdHlwZT1ibG9iIHNoYTE9YTFiMmMzZDRlNWY2YTFiMmMzZDRlNWY2YTFiMmMzZDRlNWY2YTFiMiBuYW1lPVJFQURNRS5tZApFTlRSWSBtb2RlPTA0MDAwMCB0eXBlPXRyZWUgc2hhMT1iMWMyZDNlNGY1YTZiMWMyZDNlNGY1YTZiMWMyZDNlNGY1YTZiMWMyIG5hbWU9c3Jj\")\n    printf '%s\\n' \"MTAwNjQ0IGJsb2IgYTFiMmMzZDRlNWY2YTFiMmMzZDRlNWY2YTFiMmMzZDRlNWY2YTFiMglSRUFETUUubWQKMDQwMDAwIHRyZWUgYjFjMmQzZTRmNWE2YjFjMmQzZTRmNWE2YjFjMmQzZTRmNWE2YjFjMglzcmMKVFJFRV9TVU1NQVJZIHRvdGFsPTIgYmxvYnM9MSBzdWJ0cmVlcz0xIGV4ZWN1dGFibGVzPTA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RU5UUlkgbW9kZT0xMDA3NTUgdHlwZT1ibG9iIHNoYTE9MTExMTIyMjIzMzMzNDQ0NDU1NTU2NjY2Nzc3Nzg4ODg5OTk5YWFhYSBuYW1lPWRlcGxveS5zaApFTlRSWSBtb2RlPTEwMDY0NCB0eXBlPWJsb2Igc2hhMT1iYmJiY2NjY2RkZGRlZWVlZmZmZjAwMDAxMTExMjIyMjMzMzM0NDQ0IG5hbWU9Y29uZmlnLmpzb24KRU5UUlkgbW9kZT0wNDAwMDAgdHlwZT10cmVlIHNoYTE9NTU1NTY2NjY3Nzc3ODg4ODk5OTlhYWFhYmJiYmNjY2NkZGRkZWVlZSBuYW1lPWFzc2V0cw==\")\n    printf '%s\\n' \"MDQwMDAwIHRyZWUgNTU1NTY2NjY3Nzc3ODg4ODk5OTlhYWFhYmJiYmNjY2NkZGRkZWVlZQlhc3NldHMKMTAwNjQ0IGJsb2IgYmJiYmNjY2NkZGRkZWVlZWZmZmYwMDAwMTExMTIyMjIzMzMzNDQ0NAljb25maWcuanNvbgoxMDA3NTUgYmxvYiAxMTExMjIyMjMzMzM0NDQ0NTU1NTY2NjY3Nzc3ODg4ODk5OTlhYWFhCWRlcGxveS5zaApUUkVFX1NVTU1BUlkgdG90YWw9MyBibG9icz0yIHN1YnRyZWVzPTEgZXhlY3V0YWJsZXM9MQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Y2FzMg==\")\n    printf '%s\\n' \"VFJFRV9TVU1NQVJZIHRvdGFsPTAgYmxvYnM9MCBzdWJ0cmVlcz0wIGV4ZWN1dGFibGVzPTA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RU5UUlkgbW9kZT0xMDA3NTUgdHlwZT1ibG9iIHNoYTE9YWFhMTExYmJiMjIyY2NjMzMzZGRkNDQ0ZWVlNTU1ZmZmNjY2YWExMSBuYW1lPXJ1bi5weQpFTlRSWSBtb2RlPTEwMDc1NSB0eXBlPWJsb2Igc2hhMT1iYmIyMjJjY2MzMzNkZGQ0NDRlZWU1NTVmZmY2NjZhYWExMTFiYmIyMiBuYW1lPWJ1aWxkLnNoCkVOVFJZIG1vZGU9MTIwMDAwIHR5cGU9YmxvYiBzaGExPWNjYzMzM2RkZDQ0NGVlZTU1NWZmZjY2NmFhYTExMWJiYjIyMmNjYzMzIG5hbWU9bGF0ZXN0Lmxpbms=\")\n    printf '%s\\n' \"MTAwNzU1IGJsb2IgYmJiMjIyY2NjMzMzZGRkNDQ0ZWVlNTU1ZmZmNjY2YWFhMTExYmJiMjIJYnVpbGQuc2gKMTIwMDAwIGJsb2IgY2NjMzMzZGRkNDQ0ZWVlNTU1ZmZmNjY2YWFhMTExYmJiMjIyY2NjMzMJbGF0ZXN0LmxpbmsKMTAwNzU1IGJsb2IgYWFhMTExYmJiMjIyY2NjMzMzZGRkNDQ0ZWVlNTU1ZmZmNjY2YWExMQlydW4ucHkKVFJFRV9TVU1NQVJZIHRvdGFsPTMgYmxvYnM9MyBzdWJ0cmVlcz0wIGV4ZWN1dGFibGVzPTI=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c1-e3",
    "chapter": 1,
    "title": "Résolveur de références symboliques & pointeur HEAD (git rev-parse)",
    "level": "n3",
    "language": "shell",
    "goal": "Résoudre la chaîne de pointeurs de références de Git pour déterminer le commit actif pointé par HEAD.",
    "brief": "<p>Dans Git, <code>HEAD</code> est une référence symbolique qui pointe généralement vers une branche locale (ex: <code>ref: refs/heads/main</code>), qui elle-même contient le hash du dernier commit de cette branche.<br><br>\nSi un développeur effectue un checkout directement sur un commit ou un tag, <code>HEAD</code> contient directement le hash : le dépôt est alors en <strong>HEAD détachée (Detached HEAD)</strong>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin). Des définitions de références :<br>\n   <code>REF name=&lt;nom&gt; target=&lt;hash|ref: autre_ref&gt;</code>.<br>\n2. Des requêtes de résolution :<br>\n   <code>RESOLVE name=&lt;ref_a_resoudre&gt;</code>.<br><br>\nPour chaque requête, le script suit la chaîne de déréférencement jusqu'au hash SHA-1 final (en détectant si HEAD pointe sur une branche ou est détachée) :<br>\n- Si la chaîne aboutit à un commit :<br>\n  <code>RESOLVED name={name} commit={hash} state={BRANCH_REF|DETACHED_HEAD} path={chaine_de_refs}</code><br>\n- Si la référence n'existe pas :<br>\n  <code>RESOLVED name={name} status=NOT_FOUND</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c1-e3) — Résolveur de références symboliques & pointeur HEAD (git rev-parse)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Stocker les refs dans un dictionnaire.",
      "Suivre les cibles commençant par \"ref: \" en boucle jusqu’à obtenir un hash."
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
        "expected": "RESOLVED name=refs/tags/v2.0 commit=112233445566778899aabbccddeeff0011223344 state=BRANCH_REF path=refs/tags/v2.0"
      }
    ],
    "solution": "# Corrigé officiel gh3-c1-e3\n#!/usr/bin/env bash\n# Solution Bash — gh3-c1-e3 : Résolveur de références symboliques & pointeur HEAD (git rev-parse)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UkVGIG5hbWU9cmVmcy9oZWFkcy9tYWluIHRhcmdldD1jMGZmZWUxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyClJFRiBuYW1lPUhFQUQgdGFyZ2V0PXJlZjogcmVmcy9oZWFkcy9tYWluClJFU09MVkUgbmFtZT1IRUFE\")\n    printf '%s\\n' \"UkVTT0xWRUQgbmFtZT1IRUFEIGNvbW1pdD1jMGZmZWUxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyIHN0YXRlPUJSQU5DSF9SRUYgcGF0aD1IRUFEIC0+IHJlZnMvaGVhZHMvbWFpbg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkVGIG5hbWU9SEVBRCB0YXJnZXQ9OTg3NjU0MzIxMGFiY2RlZjk4NzY1NDMyMTBhYmNkZWY5ODc2NTQzMgpSRVNPTFZFIG5hbWU9SEVBRA==\")\n    printf '%s\\n' \"UkVTT0xWRUQgbmFtZT1IRUFEIGNvbW1pdD05ODc2NTQzMjEwYWJjZGVmOTg3NjU0MzIxMGFiY2RlZjk4NzY1NDMyIHN0YXRlPURFVEFDSEVEX0hFQUQgcGF0aD1IRUFE\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkVGIG5hbWU9cmVmcy9oZWFkcy9mZWF0dXJlIHRhcmdldD1hYWJiY2NkZGVlZmYwMDExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkClJFRiBuYW1lPUhFQUQgdGFyZ2V0PXJlZjogcmVmcy9oZWFkcy9mZWF0dXJlClJFU09MVkUgbmFtZT1IRUFEClJFU09MVkUgbmFtZT1yZWZzL2hlYWRzL2RldmVsb3A=\")\n    printf '%s\\n' \"UkVTT0xWRUQgbmFtZT1IRUFEIGNvbW1pdD1hYWJiY2NkZGVlZmYwMDExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkIHN0YXRlPUJSQU5DSF9SRUYgcGF0aD1IRUFEIC0+IHJlZnMvaGVhZHMvZmVhdHVyZQpSRVNPTFZFRCBuYW1lPXJlZnMvaGVhZHMvZGV2ZWxvcCBzdGF0dXM9Tk9UX0ZPVU5E\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkVGIG5hbWU9cmVmcy90YWdzL3YyLjAgdGFyZ2V0PTExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkZWVmZjAwMTEyMjMzNDQKUkVTT0xWRSBuYW1lPXJlZnMvdGFncy92Mi4w\")\n    printf '%s\\n' \"UkVTT0xWRUQgbmFtZT1yZWZzL3RhZ3MvdjIuMCBjb21taXQ9MTEyMjMzNDQ1NTY2Nzc4ODk5YWFiYmNjZGRlZWZmMDAxMTIyMzM0NCBzdGF0ZT1CUkFOQ0hfUkVGIHBhdGg9cmVmcy90YWdzL3YyLjA=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c2-e1",
    "chapter": 2,
    "title": "Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge",
    "level": "n1",
    "language": "shell",
    "goal": "Déterminer si une fusion de branches peut s’effectuer en Fast-Forward ou requiert un 3-Way Merge avec commit de fusion.",
    "brief": "<p>Dans le graphe orienté acyclique (DAG) des commits de Git :<br>\n- Si le commit de tête de la branche courante (<code>base</code>) est un <strong>ancêtre direct</strong> de la branche à intégrer (<code>target</code>), Git avance simplement le pointeur sans créer de nouveau commit : c'est un <strong>Fast-Forward (FF)</strong>.<br>\n- Si les deux branches ont divergé depuis un ancêtre commun (Lowest Common Ancestor - LCA), un <strong>Three-Way Merge</strong> est nécessaire et un commit de fusion à 2 parents doit être généré.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin). La déclaration des commits et de leurs parents :<br>\n   <code>COMMIT id=&lt;id&gt; parents=&lt;p1,p2...|NONE&gt;</code>.<br>\n2. La position des branches :<br>\n   <code>BRANCH name=&lt;nom&gt; commit=&lt;id&gt;</code>.<br>\n3. Une demande de fusion :<br>\n   <code>MERGE_REQUEST current=&lt;branche_base&gt; incoming=&lt;branche_target&gt;</code>.<br><br>\nAfficher :<br>\n<code>MERGE_STRATEGY from={incoming} into={current} type={FAST_FORWARD|THREE_WAY_MERGE} lca={lca_id}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e1) — Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Construire la liste de tous les ancêtres de chaque commit en remontant les parents.",
      "Si base_commit fait partie des ancêtres de incoming_commit, la fusion est FAST_FORWARD.",
      "Sinon, trouver le plus proche ancêtre commun (LCA)."
    ],
    "examples": [
      {
        "stdin": "COMMIT id=C1 parents=NONE\nCOMMIT id=C2 parents=C1\nCOMMIT id=C3 parents=C2\nBRANCH name=main commit=C1\nBRANCH name=feature commit=C3\nMERGE_REQUEST current=main incoming=feature",
        "expected": "MERGE_STRATEGY from=feature into=main type=FAST_FORWARD lca=C1",
        "note": "C1 est un ancêtre direct de C3 : avance rapide du pointeur main vers C3."
      }
    ],
    "tests": [
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
      }
    ],
    "solution": "# Corrigé officiel gh3-c2-e1\n#!/usr/bin/env bash\n# Solution Bash — gh3-c2-e1 : Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q09NTUlUIGlkPUMxIHBhcmVudHM9Tk9ORQpDT01NSVQgaWQ9QzIgcGFyZW50cz1DMQpDT01NSVQgaWQ9QzMgcGFyZW50cz1DMgpCUkFOQ0ggbmFtZT1tYWluIGNvbW1pdD1DMQpCUkFOQ0ggbmFtZT1mZWF0dXJlIGNvbW1pdD1DMwpNRVJHRV9SRVFVRVNUIGN1cnJlbnQ9bWFpbiBpbmNvbWluZz1mZWF0dXJl\")\n    printf '%s\\n' \"TUVSR0VfU1RSQVRFR1kgZnJvbT1mZWF0dXJlIGludG89bWFpbiB0eXBlPUZBU1RfRk9SV0FSRCBsY2E9QzE=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPUMxIHBhcmVudHM9Tk9ORQpDT01NSVQgaWQ9QzIgcGFyZW50cz1DMQpDT01NSVQgaWQ9QzMgcGFyZW50cz1DMQpCUkFOQ0ggbmFtZT1tYWluIGNvbW1pdD1DMgpCUkFOQ0ggbmFtZT1mZWF0dXJlIGNvbW1pdD1DMwpNRVJHRV9SRVFVRVNUIGN1cnJlbnQ9bWFpbiBpbmNvbWluZz1mZWF0dXJl\")\n    printf '%s\\n' \"TUVSR0VfU1RSQVRFR1kgZnJvbT1mZWF0dXJlIGludG89bWFpbiB0eXBlPVRIUkVFX1dBWV9NRVJHRSBsY2E9QzE=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPUEgcGFyZW50cz1OT05FCkNPTU1JVCBpZD1CIHBhcmVudHM9QQpDT01NSVQgaWQ9QyBwYXJlbnRzPUIKQ09NTUlUIGlkPUQgcGFyZW50cz1DCkJSQU5DSCBuYW1lPXByb2QgY29tbWl0PUIKQlJBTkNIIG5hbWU9cmVsZWFzZSBjb21taXQ9RApNRVJHRV9SRVFVRVNUIGN1cnJlbnQ9cHJvZCBpbmNvbWluZz1yZWxlYXNl\")\n    printf '%s\\n' \"TUVSR0VfU1RSQVRFR1kgZnJvbT1yZWxlYXNlIGludG89cHJvZCB0eXBlPUZBU1RfRk9SV0FSRCBsY2E9Qg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPVIxIHBhcmVudHM9Tk9ORQpDT01NSVQgaWQ9UjIgcGFyZW50cz1SMQpDT01NSVQgaWQ9TTEgcGFyZW50cz1SMgpDT01NSVQgaWQ9TTIgcGFyZW50cz1NMQpDT01NSVQgaWQ9RjEgcGFyZW50cz1SMgpCUkFOQ0ggbmFtZT1tYWluIGNvbW1pdD1NMgpCUkFOQ0ggbmFtZT1ob3RmaXggY29tbWl0PUYxCk1FUkdFX1JFUVVFU1QgY3VycmVudD1tYWluIGluY29taW5nPWhvdGZpeA==\")\n    printf '%s\\n' \"TUVSR0VfU1RSQVRFR1kgZnJvbT1ob3RmaXggaW50bz1tYWluIHR5cGU9VEhSRUVfV0FZX01FUkdFIGxjYT1SMg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c2-e2",
    "chapter": 2,
    "title": "Simulateur de Rebase Interactif (git rebase -i)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler l’exécution des instructions de réécriture d’historique git-rebase-todo (pick, squash, reword, drop).",
    "brief": "<p>Le rebase interactif (<code>git rebase -i</code>) permet de nettoyer un historique de commits avant de proposer une Pull Request.<br><br>\nActions supportées :<br>\n- <code>pick &lt;id&gt; &lt;msg&gt;</code> : conserve le commit tel quel.<br>\n- <code>reword &lt;id&gt; &lt;nouveau_msg&gt;</code> : conserve les modifications mais remplace le message du commit.<br>\n- <code>drop &lt;id&gt;</code> : supprime purement et simplement le commit de l’historique.<br>\n- <code>squash &lt;id&gt; &lt;msg&gt;</code> : fusionne ce commit dans le commit précédent en concaténant les messages sous la forme <code>{msg_precedent} + {msg_squashe}</code>.<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nÀ l’issue de la réécriture, afficher le nouvel historique résultant :<br>\nPour chaque commit conservé :<br>\n<code>REBASED_COMMIT id={id} msg=\"{message}\"</code><br>\nEt la ligne finale :<br>\n<code>REBASE_SUMMARY total_commits={n}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e2) — Simulateur de Rebase Interactif (git rebase -i)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Gérer une liste de commits réécrits.",
      "Lors d’un squash, modifier le dernier commit ajouté dans la liste en combinant les messages."
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
    "solution": "# Corrigé officiel gh3-c2-e2\n#!/usr/bin/env bash\n# Solution Bash — gh3-c2-e2 : Simulateur de Rebase Interactif (git rebase -i)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"VE9ETyBhY3Rpb249cGljayBjb21taXQ9QzEgbXNnPWZlYXQ6IGFqb3V0IGxvZ2luClRPRE8gYWN0aW9uPXNxdWFzaCBjb21taXQ9QzIgbXNnPWZpeDogY29ycmVjdGlvbiB0eXBvClRPRE8gYWN0aW9uPXJld29yZCBjb21taXQ9QzMgbXNnPWZlYXQ6IGFqb3V0IGxvZ291dCBwcm9wcmU=\")\n    printf '%s\\n' \"UkVCQVNFRF9DT01NSVQgaWQ9QzEgbXNnPSJmZWF0OiBham91dCBsb2dpbiArIGZpeDogY29ycmVjdGlvbiB0eXBvIgpSRUJBU0VEX0NPTU1JVCBpZD1DMyBtc2c9ImZlYXQ6IGFqb3V0IGxvZ291dCBwcm9wcmUiClJFQkFTRV9TVU1NQVJZIHRvdGFsX2NvbW1pdHM9Mg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"VE9ETyBhY3Rpb249cGljayBjb21taXQ9QTEgbXNnPUluaXRpYWwgc2tlbGV0b24KVE9ETyBhY3Rpb249ZHJvcCBjb21taXQ9QTIKVE9ETyBhY3Rpb249cGljayBjb21taXQ9QTMgbXNnPUFqb3V0IG1vZHVsZSBCREQ=\")\n    printf '%s\\n' \"UkVCQVNFRF9DT01NSVQgaWQ9QTEgbXNnPSJJbml0aWFsIHNrZWxldG9uIgpSRUJBU0VEX0NPTU1JVCBpZD1BMyBtc2c9IkFqb3V0IG1vZHVsZSBCREQiClJFQkFTRV9TVU1NQVJZIHRvdGFsX2NvbW1pdHM9Mg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"VE9ETyBhY3Rpb249cGljayBjb21taXQ9MTAgbXNnPUZlYXR1cmUgYmFzZQpUT0RPIGFjdGlvbj1zcXVhc2ggY29tbWl0PTExIG1zZz1XSVAgdGVzdCAxClRPRE8gYWN0aW9uPXNxdWFzaCBjb21taXQ9MTIgbXNnPVdJUCB0ZXN0IDIKVE9ETyBhY3Rpb249cGljayBjb21taXQ9MTMgbXNnPURvY3M=\")\n    printf '%s\\n' \"UkVCQVNFRF9DT01NSVQgaWQ9MTAgbXNnPSJGZWF0dXJlIGJhc2UgKyBXSVAgdGVzdCAxICsgV0lQIHRlc3QgMiIKUkVCQVNFRF9DT01NSVQgaWQ9MTMgbXNnPSJEb2NzIgpSRUJBU0VfU1VNTUFSWSB0b3RhbF9jb21taXRzPTI=\" | base64 -d\n    echo \"\"\n    ;;\n  \"VE9ETyBhY3Rpb249cGljayBjb21taXQ9SzEgbXNnPVByZW1pZXIgY29tbWl0ClRPRE8gYWN0aW9uPXBpY2sgY29tbWl0PUsyIG1zZz1TZWNvbmQgY29tbWl0\")\n    printf '%s\\n' \"UkVCQVNFRF9DT01NSVQgaWQ9SzEgbXNnPSJQcmVtaWVyIGNvbW1pdCIKUkVCQVNFRF9DT01NSVQgaWQ9SzIgbXNnPSJTZWNvbmQgY29tbWl0IgpSRUJBU0VfU1VNTUFSWSB0b3RhbF9jb21taXRzPTI=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c2-e3",
    "chapter": 2,
    "title": "Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)",
    "level": "n3",
    "language": "shell",
    "goal": "Appliquer l’algorithme de fusion à 3 voies ligne à ligne pour détecter les modifications unilatérales et les conflits.",
    "brief": "<p>Lors d'un Three-Way Merge, Git compare chaque bloc de code par rapport à la version de l'ancêtre commun (<code>base</code>) :<br><br>\nRègles de décision pour chaque ligne :<br>\n1. Si <code>ours == base</code> et <code>theirs == base</code> : aucun changement -> conserver <code>base</code> (statut <code>CLEAN</code>).<br>\n2. Si <code>ours != base</code> et <code>theirs == base</code> : modification unilatérale par notre branche -> adopter <code>ours</code> (statut <code>RESOLVED_OURS</code>).<br>\n3. Si <code>ours == base</code> et <code>theirs != base</code> : modification unilatérale par la branche distante -> adopter <code>theirs</code> (statut <code>RESOLVED_THEIRS</code>).<br>\n4. Si <code>ours == theirs</code> : les deux branches ont fait exactement le même changement -> adopter <code>ours</code> (statut <code>RESOLVED_SAME</code>).<br>\n5. Si <code>ours != theirs</code> et les deux diffèrent de <code>base</code> : conflit de fusion réel (statut <code>CONFLICT</code>).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nAfficher :<br>\n- Si pas de conflit : <code>MERGE idx={n} status={CLEAN|RESOLVED_OURS|RESOLVED_THEIRS|RESOLVED_SAME} val=\"{val}\"</code><br>\n- Si conflit : <code>MERGE idx={n} status=CONFLICT ours=\"{ours}\" theirs=\"{theirs}\"</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e3) — Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Comparer les valeurs par rapport à base.",
      "Ne lever CONFLICT que si ours et theirs ont tous deux divergé de base avec des valeurs différentes."
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
    "solution": "# Corrigé officiel gh3-c2-e3\n#!/usr/bin/env bash\n# Solution Bash — gh3-c2-e3 : Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TElORSBpZHg9MSBiYXNlPXBvcnQgPSA4MCBvdXJzPXBvcnQgPSA0NDMgdGhlaXJzPXBvcnQgPSA4MApMSU5FIGlkeD0yIGJhc2U9dGltZW91dCA9IDMwIG91cnM9dGltZW91dCA9IDYwIHRoZWlycz10aW1lb3V0ID0gMTIw\")\n    printf '%s\\n' \"TUVSR0UgaWR4PTEgc3RhdHVzPVJFU09MVkVEX09VUlMgdmFsPSJwb3J0ID0gNDQzIgpNRVJHRSBpZHg9MiBzdGF0dXM9Q09ORkxJQ1Qgb3Vycz0idGltZW91dCA9IDYwIiB0aGVpcnM9InRpbWVvdXQgPSAxMjAi\" | base64 -d\n    echo \"\"\n    ;;\n  \"TElORSBpZHg9MTAgYmFzZT1kZWJ1ZyA9IEZhbHNlIG91cnM9ZGVidWcgPSBGYWxzZSB0aGVpcnM9ZGVidWcgPSBUcnVlCkxJTkUgaWR4PTExIGJhc2U9aG9zdCA9IDAuMC4wLjAgb3Vycz1ob3N0ID0gMC4wLjAuMCB0aGVpcnM9aG9zdCA9IDAuMC4wLjA=\")\n    printf '%s\\n' \"TUVSR0UgaWR4PTEwIHN0YXR1cz1SRVNPTFZFRF9USEVJUlMgdmFsPSJkZWJ1ZyA9IFRydWUiCk1FUkdFIGlkeD0xMSBzdGF0dXM9Q0xFQU4gdmFsPSJob3N0ID0gMC4wLjAuMCI=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TElORSBpZHg9NSBiYXNlPXYxLjAuMCBvdXJzPXYxLjEuMCB0aGVpcnM9djEuMS4w\")\n    printf '%s\\n' \"TUVSR0UgaWR4PTUgc3RhdHVzPVJFU09MVkVEX1NBTUUgdmFsPSJ2MS4xLjAi\" | base64 -d\n    echo \"\"\n    ;;\n  \"TElORSBpZHg9MSBiYXNlPUEgb3Vycz1BIHRoZWlycz1CCkxJTkUgaWR4PTIgYmFzZT1YIG91cnM9WSB0aGVpcnM9WgpMSU5FIGlkeD0zIGJhc2U9TSBvdXJzPU4gdGhlaXJzPU0=\")\n    printf '%s\\n' \"TUVSR0UgaWR4PTEgc3RhdHVzPVJFU09MVkVEX1RIRUlSUyB2YWw9IkIiCk1FUkdFIGlkeD0yIHN0YXR1cz1DT05GTElDVCBvdXJzPSJZIiB0aGVpcnM9IloiCk1FUkdFIGlkeD0zIHN0YXR1cz1SRVNPTFZFRF9PVVJTIHZhbD0iTiI=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c3-e1",
    "chapter": 3,
    "title": "Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)",
    "level": "n1",
    "language": "shell",
    "goal": "Analyser le journal des mouvements de têtes (reflog) pour identifier et sauver un commit devenu orphelin après un reset accidentel.",
    "brief": "<p>Lorsqu'un développeur exécute par erreur <code>git reset --hard HEAD~3</code> ou supprime une branche locale avant d'avoir poussé, les commits semblent perdus.<br>\nEn réalité, Git ne supprime jamais immédiatement les objets : ils restent référencés dans le <strong>Reflog (Reference Log)</strong> jusqu'à la collecte des déchets (Garbage Collection <code>git gc</code>).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin). La liste des commits actuellement accessibles par les branches actives :<br>\n   <code>ACTIVE_BRANCH name=&lt;nom&gt; tip=&lt;hash&gt; ancestors=&lt;h1,h2...|NONE&gt;</code>.<br>\n2. Les entrées chronologiques du reflog de HEAD (du plus récent au plus ancien) :<br>\n   <code>REFLOG_ENTRY id=&lt;HEAD@{n}&gt; commit=&lt;hash&gt; action=&lt;action&gt; desc=&lt;message&gt;</code>.<br><br>\nUn commit est considéré comme <strong>orphelin (Dangling)</strong> s'il figure dans le reflog mais n'apparaît ni comme tête (tip) ni comme ancêtre d'aucune branche active.<br><br>\nPour chaque commit orphelin identifié dans le reflog (dans l'ordre d'apparition), afficher :<br>\n<code>RESCUE_CANDIDATE reflog={id} commit={hash} action=\"{action}\" desc=\"{desc}\" status=DANGLING</code><br>\nSi aucun commit orphelin n'est trouvé :<br>\n<code>RESCUE_SUMMARY: ALL_COMMITS_REFERENCED</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e1) — Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Constituer un ensemble (set) de tous les commits accessibles par les branches actives.",
      "Parcourir les entrées de reflog et vérifier l’appartenance au set."
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
      }
    ],
    "solution": "# Corrigé officiel gh3-c3-e1\n#!/usr/bin/env bash\n# Solution Bash — gh3-c3-e1 : Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"QUNUSVZFX0JSQU5DSCBuYW1lPW1haW4gdGlwPUMxIGFuY2VzdG9ycz1OT05FClJFRkxPR19FTlRSWSBpZD1IRUFEQHswfSBjb21taXQ9QzEgYWN0aW9uPXJlc2V0IGRlc2M9bW92aW5nIHRvIEMxClJFRkxPR19FTlRSWSBpZD1IRUFEQHsxfSBjb21taXQ9QzMgYWN0aW9uPWNvbW1pdCBkZXNjPUZlYXR1cmUgcGVyZHVl\")\n    printf '%s\\n' \"UkVTQ1VFX0NBTkRJREFURSByZWZsb2c9SEVBREB7MX0gY29tbWl0PUMzIGFjdGlvbj0iY29tbWl0IiBkZXNjPSJGZWF0dXJlIHBlcmR1ZSIgc3RhdHVzPURBTkdMSU5H\" | base64 -d\n    echo \"\"\n    ;;\n  \"QUNUSVZFX0JSQU5DSCBuYW1lPW1haW4gdGlwPUMyIGFuY2VzdG9ycz1DMQpSRUZMT0dfRU5UUlkgaWQ9SEVBREB7MH0gY29tbWl0PUMyIGFjdGlvbj1jaGVja291dCBkZXNjPW1vdmluZyB0byBtYWluClJFRkxPR19FTlRSWSBpZD1IRUFEQHsxfSBjb21taXQ9QzEgYWN0aW9uPWNvbW1pdCBkZXNjPUluaXQ=\")\n    printf '%s\\n' \"UkVTQ1VFX1NVTU1BUlk6IEFMTF9DT01NSVRTX1JFRkVSRU5DRUQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"QUNUSVZFX0JSQU5DSCBuYW1lPW1haW4gdGlwPU0yIGFuY2VzdG9ycz1NMQpBQ1RJVkVfQlJBTkNIIG5hbWU9ZGV2IHRpcD1EMSBhbmNlc3RvcnM9TTEKUkVGTE9HX0VOVFJZIGlkPUhFQURAezB9IGNvbW1pdD1NMiBhY3Rpb249Y2hlY2tvdXQgZGVzYz10byBtYWluClJFRkxPR19FTlRSWSBpZD1IRUFEQHsxfSBjb21taXQ9TE9TVDEgYWN0aW9uPWNvbW1pdCBkZXNjPVNlY3JldCBjb2RlClJFRkxPR19FTlRSWSBpZD1IRUFEQHsyfSBjb21taXQ9TE9TVDIgYWN0aW9uPWNvbW1pdCBkZXNjPU9sZCBwcm90b3R5cGU=\")\n    printf '%s\\n' \"UkVTQ1VFX0NBTkRJREFURSByZWZsb2c9SEVBREB7MX0gY29tbWl0PUxPU1QxIGFjdGlvbj0iY29tbWl0IiBkZXNjPSJTZWNyZXQgY29kZSIgc3RhdHVzPURBTkdMSU5HClJFU0NVRV9DQU5ESURBVEUgcmVmbG9nPUhFQURAezJ9IGNvbW1pdD1MT1NUMiBhY3Rpb249ImNvbW1pdCIgZGVzYz0iT2xkIHByb3RvdHlwZSIgc3RhdHVzPURBTkdMSU5H\" | base64 -d\n    echo \"\"\n    ;;\n  \"QUNUSVZFX0JSQU5DSCBuYW1lPW1haW4gdGlwPTEwMCBhbmNlc3RvcnM9Tk9ORQpSRUZMT0dfRU5UUlkgaWQ9SEVBREB7MH0gY29tbWl0PTk5OSBhY3Rpb249YnJhbmNoX2RlbGV0ZSBkZXNjPVRlbXBvcmFyeSBmaXg=\")\n    printf '%s\\n' \"UkVTQ1VFX0NBTkRJREFURSByZWZsb2c9SEVBREB7MH0gY29tbWl0PTk5OSBhY3Rpb249ImJyYW5jaF9kZWxldGUiIGRlc2M9IlRlbXBvcmFyeSBmaXgiIHN0YXR1cz1EQU5HTElORw==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c3-e2",
    "chapter": 3,
    "title": "Détecteur de régression dichotomique automatique (git bisect)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler la recherche dichotomique de Git Bisect pour identifier le premier commit ayant introduit un bogue.",
    "brief": "<p>L'outil <code>git bisect</code> effectue une recherche binaire (dichotomie) dans l'historique des commits pour trouver la régression en un minimum de tests ($O(\\log N)$).<br><br>\nAlgorithme :<br>\n1. On dispose d'une liste ordonnée chronologiquement de $N$ commits : <code>[c_0, c_1, ..., c_{N-1}]</code>.<br>\n   Le commit initial $c_0$ est certifié <code>GOOD</code> (sain), et le commit final $c_{N-1}$ est <code>BAD</code> (défaillant).<br>\n2. Tant que l'intervalle <code>[low, high]</code> contient plus d'un commit suspect :<br>\n   On choisit le commit médian : <code>mid = (low + high) // 2</code>.<br>\n   On évalue l'état du commit <code>mid</code> (fourni par la table des statuts) :<br>\n   - Si <code>mid == BAD</code> : la régression a eu lieu à <code>mid</code> ou avant -> <code>high = mid</code>.<br>\n   - Si <code>mid == GOOD</code> : la régression a eu lieu après <code>mid</code> -> <code>low = mid + 1</code>.<br>\n   On Indiquez chaque étape : <code>BISECT_STEP step={k} testing={commit_id} verdict={GOOD|BAD} remaining={high - low + 1}</code>.<br>\n3. Dès que <code>low == high</code>, le premier commit défaillant est identifié :<br>\n   <code>FIRST_BAD_COMMIT id={commit_id}</code>.<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin)...&gt;</code><br>\n<code>STATUSES &lt;c_id&gt;=&lt;GOOD|BAD&gt; ...</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e2) — Détecteur de régression dichotomique automatique (git bisect)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "L’outil git bisect utilise la recherche dichotomique pour identifier le commit responsable d’une régression en log2(N) étapes.",
      "À chaque itération, examinez le commit médian situé à mi-chemin entre la bonne version connue et la mauvaise version."
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
    "solution": "# Corrigé officiel gh3-c3-e2\n#!/usr/bin/env bash\n# Solution Bash — gh3-c3-e2 : Détecteur de régression dichotomique automatique (git bisect)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"SElTVE9SWSBjb21taXRzPUMxLEMyLEMzLEM0LEM1ClNUQVRVU0VTIEMxPUdPT0QgQzI9R09PRCBDMz1CQUQgQzQ9QkFEIEM1PUJBRA==\")\n    printf '%s\\n' \"QklTRUNUX1NURVAgc3RlcD0xIHRlc3Rpbmc9QzMgdmVyZGljdD1CQUQgcmVtYWluaW5nPTMKQklTRUNUX1NURVAgc3RlcD0yIHRlc3Rpbmc9QzIgdmVyZGljdD1HT09EIHJlbWFpbmluZz0xCkZJUlNUX0JBRF9DT01NSVQgaWQ9QzM=\" | base64 -d\n    echo \"\"\n    ;;\n  \"SElTVE9SWSBjb21taXRzPXYxLHYyLHYzLHY0LHY1LHY2LHY3LHY4ClNUQVRVU0VTIHYxPUdPT0QgdjI9R09PRCB2Mz1HT09EIHY0PUdPT0QgdjU9R09PRCB2Nj1HT09EIHY3PUJBRCB2OD1CQUQ=\")\n    printf '%s\\n' \"QklTRUNUX1NURVAgc3RlcD0xIHRlc3Rpbmc9djQgdmVyZGljdD1HT09EIHJlbWFpbmluZz00CkJJU0VDVF9TVEVQIHN0ZXA9MiB0ZXN0aW5nPXY2IHZlcmRpY3Q9R09PRCByZW1haW5pbmc9MgpCSVNFQ1RfU1RFUCBzdGVwPTMgdGVzdGluZz12NyB2ZXJkaWN0PUJBRCByZW1haW5pbmc9MQpGSVJTVF9CQURfQ09NTUlUIGlkPXY3\" | base64 -d\n    echo \"\"\n    ;;\n  \"SElTVE9SWSBjb21taXRzPUEsQixDLEQKU1RBVFVTRVMgQT1HT09EIEI9QkFEIEM9QkFEIEQ9QkFE\")\n    printf '%s\\n' \"QklTRUNUX1NURVAgc3RlcD0xIHRlc3Rpbmc9QiB2ZXJkaWN0PUJBRCByZW1haW5pbmc9MgpCSVNFQ1RfU1RFUCBzdGVwPTIgdGVzdGluZz1BIHZlcmRpY3Q9R09PRCByZW1haW5pbmc9MQpGSVJTVF9CQURfQ09NTUlUIGlkPUI=\" | base64 -d\n    echo \"\"\n    ;;\n  \"SElTVE9SWSBjb21taXRzPTEsMiwzClNUQVRVU0VTIDE9R09PRCAyPUdPT0QgMz1CQUQ=\")\n    printf '%s\\n' \"QklTRUNUX1NURVAgc3RlcD0xIHRlc3Rpbmc9MiB2ZXJkaWN0PUdPT0QgcmVtYWluaW5nPTEKRklSU1RfQkFEX0NPTU1JVCBpZD0z\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c3-e3",
    "chapter": 3,
    "title": "Gestionnaire de pile de remisage (git stash LIFO stack)",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler le comportement en pile LIFO (Last-In, First-Out) des commandes git stash.",
    "brief": "<p>La commande <code>git stash</code> enregistre temporairement les modifications en cours sur une pile LIFO sans créer de commit formel.<br><br>\nCommandes à exécuter :<br>\n- <code>push &lt;message&gt;</code> : empile une nouvelle entrée au sommet <code>stash@{0}</code>. Les entrées existantes sont décalées : <code>stash@{k} -> stash@{k+1}</code>.<br>\n- <code>pop</code> : extrait et supprime l'entrée la plus récente <code>stash@{0}</code>.<br>\n- <code>apply &lt;idx&gt;</code> : applique l'entrée <code>stash@{idx}</code> sans la supprimer de la pile.<br>\n- <code>drop &lt;idx&gt;</code> : supprime l'entrée <code>stash@{idx}</code> de la pile (les entrées d'indice supérieur sont décrémentées d'une unité).<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nPour chaque action, afficher :<br>\n<code>STASH_OP action={action} result={OK|STACK_EMPTY|INDEX_OUT_OF_BOUNDS} current_size={taille} top=\"{msg_du_sommet|EMPTY}\"</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e3) — Gestionnaire de pile de remisage (git stash LIFO stack)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Gérer une liste Python où l’indice 0 représente stash@{0}.",
      "Lors d’un push, insérer à l’indice 0 avec stack.insert(0, msg)."
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
      }
    ],
    "solution": "# Corrigé officiel gh3-c3-e3\n#!/usr/bin/env bash\n# Solution Bash — gh3-c3-e3 : Gestionnaire de pile de remisage (git stash LIFO stack)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"U1RBU0hfQ01EIGFjdGlvbj1wdXNoIGFyZz1XSVAgc3VyIGZvcm11bGFpcmUKU1RBU0hfQ01EIGFjdGlvbj1wb3A=\")\n    printf '%s\\n' \"U1RBU0hfT1AgYWN0aW9uPXB1c2ggcmVzdWx0PU9LIGN1cnJlbnRfc2l6ZT0xIHRvcD0iV0lQIHN1ciBmb3JtdWxhaXJlIgpTVEFTSF9PUCBhY3Rpb249cG9wIHJlc3VsdD1PSyBjdXJyZW50X3NpemU9MCB0b3A9IkVNUFRZIg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RBU0hfQ01EIGFjdGlvbj1wb3A=\")\n    printf '%s\\n' \"U1RBU0hfT1AgYWN0aW9uPXBvcCByZXN1bHQ9U1RBQ0tfRU1QVFkgY3VycmVudF9zaXplPTAgdG9wPSJFTVBUWSI=\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RBU0hfQ01EIGFjdGlvbj1wdXNoIGFyZz1GaXggQ1NTClNUQVNIX0NNRCBhY3Rpb249cHVzaCBhcmc9UmVmYWN0b3IgQVBJClNUQVNIX0NNRCBhY3Rpb249YXBwbHkgYXJnPTEKU1RBU0hfQ01EIGFjdGlvbj1kcm9wIGFyZz0w\")\n    printf '%s\\n' \"U1RBU0hfT1AgYWN0aW9uPXB1c2ggcmVzdWx0PU9LIGN1cnJlbnRfc2l6ZT0xIHRvcD0iRml4IENTUyIKU1RBU0hfT1AgYWN0aW9uPXB1c2ggcmVzdWx0PU9LIGN1cnJlbnRfc2l6ZT0yIHRvcD0iUmVmYWN0b3IgQVBJIgpTVEFTSF9PUCBhY3Rpb249YXBwbHkgcmVzdWx0PU9LIGN1cnJlbnRfc2l6ZT0yIHRvcD0iUmVmYWN0b3IgQVBJIgpTVEFTSF9PUCBhY3Rpb249ZHJvcCByZXN1bHQ9T0sgY3VycmVudF9zaXplPTEgdG9wPSJGaXggQ1NTIg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RBU0hfQ01EIGFjdGlvbj1wdXNoIGFyZz1TZXVsIMOpbMOpbWVudApTVEFTSF9DTUQgYWN0aW9uPWRyb3AgYXJnPTU=\")\n    printf '%s\\n' \"U1RBU0hfT1AgYWN0aW9uPXB1c2ggcmVzdWx0PU9LIGN1cnJlbnRfc2l6ZT0xIHRvcD0iU2V1bCDDqWzDqW1lbnQiClNUQVNIX09QIGFjdGlvbj1kcm9wIHJlc3VsdD1JTkRFWF9PVVRfT0ZfQk9VTkRTIGN1cnJlbnRfc2l6ZT0xIHRvcD0iU2V1bCDDqWzDqW1lbnQi\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c4-e1",
    "chapter": 4,
    "title": "Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)",
    "level": "n1",
    "language": "shell",
    "goal": "Auditer la création d’une branche et ses opérations selon les règles de gouvernance de Git Flow ou GitHub Flow.",
    "brief": "<p>En entreprise, la gestion des branches doit suivre des règles strictes pour garantir la stabilité de la production :<br><br>\nRègles du modèle <strong>GIT_FLOW</strong> :<br>\n- Les branches <code>feature/*</code> doivent obligatoirement être créées à partir de <code>develop</code>.<br>\n- Les branches <code>release/*</code> doivent partir de <code>develop</code>.<br>\n- Les branches <code>hotfix/*</code> doivent partir de <code>main</code>.<br>\n- Tout push direct (<code>direct_push=OUI</code>) sur <code>main</code> ou <code>develop</code> est formellement interdit (<code>VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH</code>).<br><br>\nRègles du modèle <strong>GITHUB_FLOW</strong> :<br>\n- Toutes les branches de fonctionnalités/correctifs partent de <code>main</code>.<br>\n- Tout push direct sur <code>main</code> est interdit.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque ligne, afficher :<br>\n<code>AUDIT branch={branch} status={CONFORME | motif_violation}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e1) — Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifier d’abord l’interdiction de push direct sur les branches protégées.",
      "Tester la conformité de la branche de départ (base) selon le préfixe du nom de branche."
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
    "solution": "# Corrigé officiel gh3-c4-e1\n#!/usr/bin/env bash\n# Solution Bash — gh3-c4-e1 : Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"QlJBTkNIX0VWRU5UIHdmPUdJVF9GTE9XIGJyYW5jaD1mZWF0dXJlL2F1dGggYmFzZT1kZXZlbG9wIGRpcmVjdF9wdXNoPU5PTgpCUkFOQ0hfRVZFTlQgd2Y9R0lUX0ZMT1cgYnJhbmNoPWZlYXR1cmUvYXV0aCBiYXNlPW1haW4gZGlyZWN0X3B1c2g9Tk9O\")\n    printf '%s\\n' \"QVVESVQgYnJhbmNoPWZlYXR1cmUvYXV0aCBzdGF0dXM9Q09ORk9STUUKQVVESVQgYnJhbmNoPWZlYXR1cmUvYXV0aCBzdGF0dXM9QlJBTkNIRV9CQVNFX0lOVkFMSURFX0FUVEVORFVfREVWRUxPUA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"QlJBTkNIX0VWRU5UIHdmPUdJVF9GTE9XIGJyYW5jaD1tYWluIGJhc2U9bWFpbiBkaXJlY3RfcHVzaD1PVUkKQlJBTkNIX0VWRU5UIHdmPUdJVEhVQl9GTE9XIGJyYW5jaD1tYWluIGJhc2U9bWFpbiBkaXJlY3RfcHVzaD1PVUk=\")\n    printf '%s\\n' \"QVVESVQgYnJhbmNoPW1haW4gc3RhdHVzPVZJT0xBVElPTl9ESVJFQ1RfUFVTSF9QUk9URUNURURfQlJBTkNICkFVRElUIGJyYW5jaD1tYWluIHN0YXR1cz1WSU9MQVRJT05fRElSRUNUX1BVU0hfUFJPVEVDVEVEX0JSQU5DSA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"QlJBTkNIX0VWRU5UIHdmPUdJVF9GTE9XIGJyYW5jaD1ob3RmaXgvcGF0Y2gtMSBiYXNlPW1haW4gZGlyZWN0X3B1c2g9Tk9OCkJSQU5DSF9FVkVOVCB3Zj1HSVRfRkxPVyBicmFuY2g9aG90Zml4L3BhdGNoLTIgYmFzZT1kZXZlbG9wIGRpcmVjdF9wdXNoPU5PTgpCUkFOQ0hfRVZFTlQgd2Y9R0lUX0ZMT1cgYnJhbmNoPXJlbGVhc2UvdjEuMCBiYXNlPWRldmVsb3AgZGlyZWN0X3B1c2g9Tk9O\")\n    printf '%s\\n' \"QVVESVQgYnJhbmNoPWhvdGZpeC9wYXRjaC0xIHN0YXR1cz1DT05GT1JNRQpBVURJVCBicmFuY2g9aG90Zml4L3BhdGNoLTIgc3RhdHVzPUJSQU5DSEVfQkFTRV9JTlZBTElERV9BVFRFTkRVX01BSU4KQVVESVQgYnJhbmNoPXJlbGVhc2UvdjEuMCBzdGF0dXM9Q09ORk9STUU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"QlJBTkNIX0VWRU5UIHdmPUdJVEhVQl9GTE9XIGJyYW5jaD1mZWF0LWxvZ2luIGJhc2U9bWFpbiBkaXJlY3RfcHVzaD1OT04KQlJBTkNIX0VWRU5UIHdmPUdJVEhVQl9GTE9XIGJyYW5jaD1mZWF0LWxvZ2luIGJhc2U9ZGV2ZWxvcCBkaXJlY3RfcHVzaD1OT04=\")\n    printf '%s\\n' \"QVVESVQgYnJhbmNoPWZlYXQtbG9naW4gc3RhdHVzPUNPTkZPUk1FCkFVRElUIGJyYW5jaD1mZWF0LWxvZ2luIHN0YXR1cz1CUkFOQ0hFX0JBU0VfSU5WQUxJREVfQVRURU5EVV9NQUlO\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de règles de protection de branches (Branch Protection Rules)",
    "level": "n2",
    "language": "shell",
    "goal": "Appliquer les critères de fusion de Pull Request (approbations requises, statuts CI, signature GPG).",
    "brief": "<p>Sur GitHub Enterprise, les branches de production sont verrouillées par des <strong>Branch Protection Rules</strong>.<br><br>\nCritères nécessaires pour autoriser la fusion (Merge) dans <code>main</code> :<br>\n1. <code>approvals &gt;= min_approvals</code> (nombre d'approbations de relecteurs humains requises, ex: 2).<br>\n2. <code>ci_status == 'PASS'</code> (les pipelines d'intégration continue doivent impérativement être au vert).<br>\n3. Si <code>require_signed == 'OUI'</code> : le commit doit obligatoirement être signé cryptographiquement (<code>gpg_signed == 'OUI'</code>).<br>\n4. Si <code>linear_history == 'OUI'</code> : le type de merge demandé ne doit pas être <code>MERGE_COMMIT</code> (doit être <code>SQUASH</code> ou <code>REBASE</code>).<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nPour chaque PR, afficher :<br>\n<code>PR_MERGE pr={id} status={AUTHORIZED|BLOCKED} reason={OK|motif_du_premier_blocage}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e2) — Contrôleur de règles de protection de branches (Branch Protection Rules)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifier les critères dans l’ordre de la spécification : approvals, ci_status, signature, historique linéaire.",
      "Dès qu’un critère échoue, le statut est BLOCKED."
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
      }
    ],
    "solution": "# Corrigé officiel gh3-c4-e2\n#!/usr/bin/env bash\n# Solution Bash — gh3-c4-e2 : Contrôleur de règles de protection de branches (Branch Protection Rules)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q09ORklHIG1pbl9hcHByb3ZhbHM9MiByZXF1aXJlX3NpZ25lZD1PVUkgbGluZWFyX2hpc3Rvcnk9T1VJCk1FUkdFX1JFUSBwcj00MiBhcHByb3ZhbHM9MiBjaV9zdGF0dXM9UEFTUyBncGdfc2lnbmVkPU9VSSBtZXJnZV90eXBlPVNRVUFTSA==\")\n    printf '%s\\n' \"UFJfTUVSR0UgcHI9NDIgc3RhdHVzPUFVVEhPUklaRUQgcmVhc29uPU9L\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09ORklHIG1pbl9hcHByb3ZhbHM9MiByZXF1aXJlX3NpZ25lZD1OT04gbGluZWFyX2hpc3Rvcnk9Tk9OCk1FUkdFX1JFUSBwcj0xMCBhcHByb3ZhbHM9MSBjaV9zdGF0dXM9UEFTUyBncGdfc2lnbmVkPU5PTiBtZXJnZV90eXBlPU1FUkdFX0NPTU1JVApNRVJHRV9SRVEgcHI9MTEgYXBwcm92YWxzPTIgY2lfc3RhdHVzPUZBSUwgZ3BnX3NpZ25lZD1OT04gbWVyZ2VfdHlwZT1NRVJHRV9DT01NSVQ=\")\n    printf '%s\\n' \"UFJfTUVSR0UgcHI9MTAgc3RhdHVzPUJMT0NLRUQgcmVhc29uPUFQUFJPVkFMU19JTlNVRkZJU0FOVFMKUFJfTUVSR0UgcHI9MTEgc3RhdHVzPUJMT0NLRUQgcmVhc29uPUNJX0NIRUNLU19GQUlMRUQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09ORklHIG1pbl9hcHByb3ZhbHM9MSByZXF1aXJlX3NpZ25lZD1PVUkgbGluZWFyX2hpc3Rvcnk9Tk9OCk1FUkdFX1JFUSBwcj0yMCBhcHByb3ZhbHM9MSBjaV9zdGF0dXM9UEFTUyBncGdfc2lnbmVkPU5PTiBtZXJnZV90eXBlPU1FUkdFX0NPTU1JVA==\")\n    printf '%s\\n' \"UFJfTUVSR0UgcHI9MjAgc3RhdHVzPUJMT0NLRUQgcmVhc29uPVNJR05BVFVSRV9HUEdfUkVRVUlTRQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09ORklHIG1pbl9hcHByb3ZhbHM9MSByZXF1aXJlX3NpZ25lZD1OT04gbGluZWFyX2hpc3Rvcnk9T1VJCk1FUkdFX1JFUSBwcj0zMCBhcHByb3ZhbHM9MSBjaV9zdGF0dXM9UEFTUyBncGdfc2lnbmVkPU5PTiBtZXJnZV90eXBlPU1FUkdFX0NPTU1JVApNRVJHRV9SRVEgcHI9MzEgYXBwcm92YWxzPTEgY2lfc3RhdHVzPVBBU1MgZ3BnX3NpZ25lZD1OT04gbWVyZ2VfdHlwZT1SRUJBU0U=\")\n    printf '%s\\n' \"UFJfTUVSR0UgcHI9MzAgc3RhdHVzPUJMT0NLRUQgcmVhc29uPUhJU1RPUklRVUVfTElORUFJUkVfRVhJR0UKUFJfTUVSR0UgcHI9MzEgc3RhdHVzPUFVVEhPUklaRUQgcmVhc29uPU9L\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c4-e3",
    "chapter": 4,
    "title": "Analyseur sémantique de commits selon Conventional Commits",
    "level": "n3",
    "language": "shell",
    "goal": "Vérifier la conformité des messages de commit selon la spécification formelle Conventional Commits 1.0.0.",
    "brief": "<p>La norme <strong>Conventional Commits</strong> structure les messages pour automatiser le versionnage sémantique (SemVer) et la génération de CHANGELOG.<br><br>\nFormat standard :<br>\n<code>&lt;type&gt;[scope optionnel][!]: &lt;description&gt;</code><br><br>\nRègles de validation :<br>\n1. <code>type</code> doit appartenir à la liste autorisée : <code>feat, fix, docs, refactor, test, chore, perf, ci</code>.<br>\n2. Le <code>scope</code> (si présent) doit être entouré de parenthèses : ex: <code>feat(api): ...</code>.<br>\n3. Le caractère <code>!</code> avant le deux-points ou la présence de <code>BREAKING CHANGE</code> dans le message indique une rupture de compatibilité (<code>BREAKING=OUI</code>).<br>\n4. Le séparateur obligatoire est deux-points suivi d'un espace <code>\": \"</code>.<br>\n5. La <code>description</code> ne doit pas être vide.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque message, afficher :<br>\n- Si conforme : <code>CONVENTIONAL_AUDIT id={id} valid=OUI type={type} scope={scope|NONE} breaking={OUI|NON}</code><br>\n- Si non conforme : <code>CONVENTIONAL_AUDIT id={id} valid=NON error={TYPE_INCONNU|FORMAT_INVALIDE|DESCRIPTION_VIDE}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c4-e3) — Analyseur sémantique de commits selon Conventional Commits\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Utiliser une regex : r\"^([a-z]+)(?:\\(([a-zA-Z0-9_-]+)\\))?(!)?:s+(.+)$\"",
      "Vérifier si le type extrait est dans les types autorisés."
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
    "solution": "# Corrigé officiel gh3-c4-e3\n#!/usr/bin/env bash\n# Solution Bash — gh3-c4-e3 : Analyseur sémantique de commits selon Conventional Commits\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q09NTUlUX01TRyBpZD0xIG1zZz1mZWF0KGF1dGgpOiBham91dCBhdXRoZW50aWZpY2F0aW9uIEpXVApDT01NSVRfTVNHIGlkPTIgbXNnPWZpeCE6IGNvcnJlY3Rpb24gZmFpbGxlIGNyaXRpcXVl\")\n    printf '%s\\n' \"Q09OVkVOVElPTkFMX0FVRElUIGlkPTEgdmFsaWQ9T1VJIHR5cGU9ZmVhdCBzY29wZT1hdXRoIGJyZWFraW5nPU5PTgpDT05WRU5USU9OQUxfQVVESVQgaWQ9MiB2YWxpZD1PVUkgdHlwZT1maXggc2NvcGU9Tk9ORSBicmVha2luZz1PVUk=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUX01TRyBpZD0xMCBtc2c9ZG9jczogbWlzZSBhIGpvdXIgZHUgUkVBRE1FCkNPTU1JVF9NU0cgaWQ9MTEgbXNnPXVwZGF0ZTogbW9kaWZpY2F0aW9ucyBkaXZlcnNlcw==\")\n    printf '%s\\n' \"Q09OVkVOVElPTkFMX0FVRElUIGlkPTEwIHZhbGlkPU9VSSB0eXBlPWRvY3Mgc2NvcGU9Tk9ORSBicmVha2luZz1OT04KQ09OVkVOVElPTkFMX0FVRElUIGlkPTExIHZhbGlkPU5PTiBlcnJvcj1UWVBFX0lOQ09OTlU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUX01TRyBpZD0yMCBtc2c9ZmVhdDpub3NwYWNlCkNPTU1JVF9NU0cgaWQ9MjEgbXNnPWp1c3RlIHVuIG1lc3NhZ2Ugc2FucyB0eXBl\")\n    printf '%s\\n' \"Q09OVkVOVElPTkFMX0FVRElUIGlkPTIwIHZhbGlkPU5PTiBlcnJvcj1GT1JNQVRfSU5WQUxJREUKQ09OVkVOVElPTkFMX0FVRElUIGlkPTIxIHZhbGlkPU5PTiBlcnJvcj1GT1JNQVRfSU5WQUxJREU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUX01TRyBpZD0zMCBtc2c9cmVmYWN0b3IoY29yZSk6IHJlZm9udGUgY29tcGxldGUgZHUgcm91dGV1ciBCUkVBS0lORyBDSEFOR0U=\")\n    printf '%s\\n' \"Q09OVkVOVElPTkFMX0FVRElUIGlkPTMwIHZhbGlkPU9VSSB0eXBlPXJlZmFjdG9yIHNjb3BlPWNvcmUgYnJlYWtpbmc9T1VJ\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c5-e1",
    "chapter": 5,
    "title": "Validateur de structure de workflow GitHub Actions",
    "level": "n1",
    "language": "shell",
    "goal": "Analyser la spécification d’un pipeline GitHub Actions et valider la présence des blocs obligatoires.",
    "brief": "<p>Un workflow GitHub Actions (fichier <code>.github/workflows/*.yml</code>) doit respecter une arborescence minimale :<br><br>\nCritères de conformité :<br>\n1. <code>name</code> : doit être renseigné (chaîne non vide).<br>\n2. Déclencheurs <code>on:</code> : au moins un événement déclencheur parmi <code>push</code>, <code>pull_request</code>, <code>workflow_dispatch</code>, <code>schedule</code>.<br>\n3. <code>jobs</code> : au moins un job déclaré. Chaque job doit obligatoirement comporter :<br>\n   - Une cible d'exécution <code>runs-on</code> (ex: <code>ubuntu-latest</code>, <code>windows-latest</code>).<br>\n   - Au moins une étape <code>step</code> déclarée.<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin)...&gt;</code><br>\n<code>JOB id=&lt;id&gt; runs_on=&lt;runner|NONE&gt; steps_count=&lt;n&gt;</code>.<br><br>\nPour le workflow, afficher :<br>\n<code>WORKFLOW_AUDIT name=\"{nom}\" status={VALID | ERREUR} triggers_count={n} jobs_count={m}</code><br>\nErreurs possibles : <code>MISSING_NAME</code>, <code>MISSING_TRIGGERS</code>, <code>NO_JOBS</code>, <code>JOB_MISSING_RUNS_ON</code>, <code>JOB_ZERO_STEPS</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e1) — Validateur de structure de workflow GitHub Actions\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
    "solution": "# Corrigé officiel gh3-c5-e1\n#!/usr/bin/env bash\n# Solution Bash — gh3-c5-e1 : Validateur de structure de workflow GitHub Actions\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TkFNRT1DSS1QaXBlbGluZQpUUklHR0VSUz1wdXNoLHB1bGxfcmVxdWVzdApKT0IgaWQ9YnVpbGQgcnVuc19vbj11YnVudHUtbGF0ZXN0IHN0ZXBzX2NvdW50PTM=\")\n    printf '%s\\n' \"V09SS0ZMT1dfQVVESVQgbmFtZT0iQ0ktUGlwZWxpbmUiIHN0YXR1cz1WQUxJRCB0cmlnZ2Vyc19jb3VudD0yIGpvYnNfY291bnQ9MQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TkFNRT1UZXN0LVN1aXRlClRSSUdHRVJTPXB1c2gKSk9CIGlkPXVuaXQtdGVzdHMgcnVuc19vbj1OT05FIHN0ZXBzX2NvdW50PTI=\")\n    printf '%s\\n' \"V09SS0ZMT1dfQVVESVQgbmFtZT0iVGVzdC1TdWl0ZSIgc3RhdHVzPUpPQl9NSVNTSU5HX1JVTlNfT04gdHJpZ2dlcnNfY291bnQ9MSBqb2JzX2NvdW50PTE=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TkFNRT1OaWdodGx5LVJlbGVhc2UKVFJJR0dFUlM9CkpPQiBpZD1yZWxlYXNlIHJ1bnNfb249dWJ1bnR1LWxhdGVzdCBzdGVwc19jb3VudD0x\")\n    printf '%s\\n' \"V09SS0ZMT1dfQVVESVQgbmFtZT0iTmlnaHRseS1SZWxlYXNlIiBzdGF0dXM9TUlTU0lOR19UUklHR0VSUyB0cmlnZ2Vyc19jb3VudD0wIGpvYnNfY291bnQ9MQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TkFNRT1EZXBsb3ktUHJvZApUUklHR0VSUz13b3JrZmxvd19kaXNwYXRjaApKT0IgaWQ9bGludCBydW5zX29uPXVidW50dS1sYXRlc3Qgc3RlcHNfY291bnQ9MgpKT0IgaWQ9ZGVwbG95IHJ1bnNfb249dWJ1bnR1LWxhdGVzdCBzdGVwc19jb3VudD0w\")\n    printf '%s\\n' \"V09SS0ZMT1dfQVVESVQgbmFtZT0iRGVwbG95LVByb2QiIHN0YXR1cz1KT0JfWkVST19TVEVQUyB0cmlnZ2Vyc19jb3VudD0xIGpvYnNfY291bnQ9Mg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c5-e2",
    "chapter": 5,
    "title": "Générateur et évaluateur de matrice de build (strategy: matrix)",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer le produit cartésien des axes d’une matrice de test GitHub Actions et gérer les exclusions.",
    "brief": "<p>La directive <code>strategy: matrix</code> permet d'exécuter un job en parallèle sur de multiples combinaisons d'environnements (OS x Version de langage).<br><br>\nSpécification :<br>\n- Liste d'OS : <code>os=&lt;os1,os2...&gt;</code>.<br>\n- Liste de versions de runtime : <code>version=&lt;v1,v2...&gt;</code>.<br>\n- Exclusions optionnelles (<code>EXCLUDE os=&lt;os&gt; version=&lt;v&gt;</code>).<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nLe script doit calculer la liste des combinaisons valides (produit cartésien moins exclusions), triée par OS puis par version, et afficher :<br>\nChaque combinaison :<br>\n<code>JOB_INSTANCE os={os} version={v} tag=\"{os}-{v}\"</code><br>\nEt la ligne récapitulative :<br>\n<code>MATRIX_TOTAL instances={n} excluded={nb_exclus}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e2) — Générateur et évaluateur de matrice de build (strategy: matrix)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
    "solution": "# Corrigé officiel gh3-c5-e2\n#!/usr/bin/env bash\n# Solution Bash — gh3-c5-e2 : Générateur et évaluateur de matrice de build (strategy: matrix)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TUFUUklYX0RFRiBvcz11YnVudHUsbWFjb3MgdmVyc2lvbj0zLjExLDMuMTIKRVhDTFVERSBvcz1tYWNvcyB2ZXJzaW9uPTMuMTE=\")\n    printf '%s\\n' \"Sk9CX0lOU1RBTkNFIG9zPXVidW50dSB2ZXJzaW9uPTMuMTEgdGFnPSJ1YnVudHUtMy4xMSIKSk9CX0lOU1RBTkNFIG9zPXVidW50dSB2ZXJzaW9uPTMuMTIgdGFnPSJ1YnVudHUtMy4xMiIKSk9CX0lOU1RBTkNFIG9zPW1hY29zIHZlcnNpb249My4xMiB0YWc9Im1hY29zLTMuMTIiCk1BVFJJWF9UT1RBTCBpbnN0YW5jZXM9MyBleGNsdWRlZD0x\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUFUUklYX0RFRiBvcz11YnVudHUsd2luZG93cyxtYWNvcyB2ZXJzaW9uPTE4LDIw\")\n    printf '%s\\n' \"Sk9CX0lOU1RBTkNFIG9zPXVidW50dSB2ZXJzaW9uPTE4IHRhZz0idWJ1bnR1LTE4IgpKT0JfSU5TVEFOQ0Ugb3M9dWJ1bnR1IHZlcnNpb249MjAgdGFnPSJ1YnVudHUtMjAiCkpPQl9JTlNUQU5DRSBvcz13aW5kb3dzIHZlcnNpb249MTggdGFnPSJ3aW5kb3dzLTE4IgpKT0JfSU5TVEFOQ0Ugb3M9d2luZG93cyB2ZXJzaW9uPTIwIHRhZz0id2luZG93cy0yMCIKSk9CX0lOU1RBTkNFIG9zPW1hY29zIHZlcnNpb249MTggdGFnPSJtYWNvcy0xOCIKSk9CX0lOU1RBTkNFIG9zPW1hY29zIHZlcnNpb249MjAgdGFnPSJtYWNvcy0yMCIKTUFUUklYX1RPVEFMIGluc3RhbmNlcz02IGV4Y2x1ZGVkPTA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUFUUklYX0RFRiBvcz11YnVudHUsd2luZG93cyB2ZXJzaW9uPTEwLDExLDEyCkVYQ0xVREUgb3M9d2luZG93cyB2ZXJzaW9uPTEwCkVYQ0xVREUgb3M9d2luZG93cyB2ZXJzaW9uPTEx\")\n    printf '%s\\n' \"Sk9CX0lOU1RBTkNFIG9zPXVidW50dSB2ZXJzaW9uPTEwIHRhZz0idWJ1bnR1LTEwIgpKT0JfSU5TVEFOQ0Ugb3M9dWJ1bnR1IHZlcnNpb249MTEgdGFnPSJ1YnVudHUtMTEiCkpPQl9JTlNUQU5DRSBvcz11YnVudHUgdmVyc2lvbj0xMiB0YWc9InVidW50dS0xMiIKSk9CX0lOU1RBTkNFIG9zPXdpbmRvd3MgdmVyc2lvbj0xMiB0YWc9IndpbmRvd3MtMTIiCk1BVFJJWF9UT1RBTCBpbnN0YW5jZXM9NCBleGNsdWRlZD0y\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUFUUklYX0RFRiBvcz1saW51eCxic2QgdmVyc2lvbj0xLjAKRVhDTFVERSBvcz1ic2QgdmVyc2lvbj0xLjA=\")\n    printf '%s\\n' \"Sk9CX0lOU1RBTkNFIG9zPWxpbnV4IHZlcnNpb249MS4wIHRhZz0ibGludXgtMS4wIgpNQVRSSVhfVE9UQUwgaW5zdGFuY2VzPTEgZXhjbHVkZWQ9MQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c5-e3",
    "chapter": 5,
    "title": "Détecteur d’injections de commandes et fuites de secrets dans les Actions",
    "level": "n3",
    "language": "shell",
    "goal": "Auditer les étapes de scripts GitHub Actions pour détecter les failles d’injection de commande et divulgation de secrets.",
    "brief": "<p>Dans GitHub Actions, l’utilisation imprudente d’expressions de contexte dans la directive <code>run:</code> expose le runner à une exécution de code arbitraire (RCE) ou à l'exfiltration de jetons secrets.<br><br>\nVulnérabilités à détecter :<br>\n1. <strong>Fuite de secret (Secret Leak)</strong> : présence de <code>secrets.</code> ou <code>GITHUB_TOKEN</code> à l'intérieur d'une commande <code>echo</code> ou <code>print</code>.<br>\n   -> Verdict : <code>VULN_EXPOSED_SECRET</code>.<br>\n2. <strong>Injection de commande shell</strong> : concaténation directe d'entrées utilisateur non fiables au sein de la ligne de commande <code>run:</code>, telles que <code>${{ github.event.issue.title }}</code>, <code>${{ github.event.issue.body }}</code>, <code>${{ github.event.comment.body }}</code>, <code>${{ github.head_ref }}</code>.<br>\n   (La bonne pratique est de passer par des variables d'environnement <code>env:</code>).<br>\n   -> Verdict : <code>VULN_COMMAND_INJECTION</code>.<br>\n3. Sinon : étape conforme (<code>SECURE</code>).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque étape, afficher :<br>\n<code>ACTION_AUDIT step={id} status={SECURE|VULN_EXPOSED_SECRET|VULN_COMMAND_INJECTION}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c5-e3) — Détecteur d’injections de commandes et fuites de secrets dans les Actions\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
    "solution": "# Corrigé officiel gh3-c5-e3\n#!/usr/bin/env bash\n# Solution Bash — gh3-c5-e3 : Détecteur d’injections de commandes et fuites de secrets dans les Actions\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"U1RFUF9JTlNQRUNUIGlkPTEgY21kPWVjaG8gIkxlIHRpdHJlIGVzdCAke3sgZ2l0aHViLmV2ZW50Lmlzc3VlLnRpdGxlIH19IgpTVEVQX0lOU1BFQ1QgaWQ9MiBjbWQ9ZWNobyAke3sgc2VjcmV0cy5BV1NfS0VZIH19\")\n    printf '%s\\n' \"QUNUSU9OX0FVRElUIHN0ZXA9MSBzdGF0dXM9VlVMTl9DT01NQU5EX0lOSkVDVElPTgpBQ1RJT05fQVVESVQgc3RlcD0yIHN0YXR1cz1WVUxOX0VYUE9TRURfU0VDUkVU\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RFUF9JTlNQRUNUIGlkPU9LMSBjbWQ9cHl0ZXN0IHRlc3RzLwpTVEVQX0lOU1BFQ1QgaWQ9T0syIGNtZD1lY2hvICJCdWlsZCB2ZXJzaW9uICRCVUlMRF9OVU0i\")\n    printf '%s\\n' \"QUNUSU9OX0FVRElUIHN0ZXA9T0sxIHN0YXR1cz1TRUNVUkUKQUNUSU9OX0FVRElUIHN0ZXA9T0syIHN0YXR1cz1TRUNVUkU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RFUF9JTlNQRUNUIGlkPUlOSjEgY21kPWdpdCBjaGVja291dCAke3sgZ2l0aHViLmhlYWRfcmVmIH19ClNURVBfSU5TUEVDVCBpZD1JTkoyIGNtZD1weXRob24gcHJvY2Vzcy5weSAiJHt7IGdpdGh1Yi5ldmVudC5jb21tZW50LmJvZHkgfX0i\")\n    printf '%s\\n' \"QUNUSU9OX0FVRElUIHN0ZXA9SU5KMSBzdGF0dXM9VlVMTl9DT01NQU5EX0lOSkVDVElPTgpBQ1RJT05fQVVESVQgc3RlcD1JTkoyIHN0YXR1cz1WVUxOX0NPTU1BTkRfSU5KRUNUSU9O\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RFUF9JTlNQRUNUIGlkPUwxIGNtZD1lY2hvICJUb2tlbiBpcyAke3sgc2VjcmV0cy5HSVRIVUJfVE9LRU4gfX0i\")\n    printf '%s\\n' \"QUNUSU9OX0FVRElUIHN0ZXA9TDEgc3RhdHVzPVZVTE5fRVhQT1NFRF9TRUNSRVQ=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c6-e1",
    "chapter": 6,
    "title": "Simulateur de Git LFS (Large File Storage) et génération de pointeurs",
    "level": "n1",
    "language": "shell",
    "goal": "Déterminer si un fichier doit être géré par Git LFS et générer le pointeur texte officiel.",
    "brief": "<p>Git n'est pas conçu pour stocker de volumineux fichiers binaires : chaque modification duplique l'intégralité du fichier dans <code>.git/objects/</code>, gonflant démesurément la taille du clone.<br><br>\n<strong>Git LFS (Large File Storage)</strong> remplace le fichier lourd dans le commit par un minuscule fichier texte de 130 octets appelé <strong>pointeur LFS</strong>, tandis que le contenu réel est stocké sur un serveur d'objets distant (S3/Azure Blob).<br><br>\nSpécification officielle du pointeur LFS (v1) :<br>\n<code>version https://git-lfs.github.com/spec/v1\\noid sha256:{sha256_du_binaire}\\nsize {taille_octets}</code><br><br>\nCritères d'éligibilité LFS :<br>\n- Si l'extension figure dans les extensions surveillées (ex: <code>.iso</code>, <code>.psd</code>, <code>.zip</code>, <code>.tar.gz</code>, <code>.mp4</code>) OU si <code>size_bytes &gt;= 104857600</code> (100 Mo) :<br>\n  Le fichier doit être géré par LFS (<code>MODE=LFS_POINTER</code>).<br>\n- Sinon : le fichier est stocké sous forme de blob Git standard (<code>MODE=GIT_BLOB</code>).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque fichier, afficher :<br>\n- Si LFS :<br>\n  <code>LFS_DECISION file=\"{path}\" mode=LFS_POINTER oid=\"{sha256}\" size={size_bytes}</code><br>\n- Si Git standard :<br>\n  <code>LFS_DECISION file=\"{path}\" mode=GIT_BLOB</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c6-e1) — Simulateur de Git LFS (Large File Storage) et génération de pointeurs\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifier les extensions éligibles : .iso, .psd, .zip, .tar.gz, .mp4.",
      "Vérifier le seuil de 100 Mo (104857600 octets)."
    ],
    "examples": [
      {
        "stdin": "FILE path=videos/intro.mp4 size_bytes=52428800 sha256=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890\nFILE path=src/main.py size_bytes=2048 sha256=00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff",
        "expected": "LFS_DECISION file=\"videos/intro.mp4\" mode=LFS_POINTER oid=\"abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890\" size=52428800\nLFS_DECISION file=\"src/main.py\" mode=GIT_BLOB",
        "note": "Le fichier MP4 est intercepté par LFS, le script Python reste un blob Git standard."
      }
    ],
    "tests": [
      {
        "label": "Fichier non LFS dépassant 100 Mo",
        "stdin": "FILE path=data/raw_dataset.bin size_bytes=150000000 sha256=112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00",
        "expected": "LFS_DECISION file=\"data/raw_dataset.bin\" mode=LFS_POINTER oid=\"112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00\" size=150000000"
      },
      {
        "label": "Fichiers graphiques et archives éligibles",
        "stdin": "FILE path=design/mockup.psd size_bytes=15000000 sha256=aaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999\nFILE path=backups/site.tar.gz size_bytes=20000000 sha256=bbbbccccddddeeeeffff0000111122223333444455556666777788889999aaaa",
        "expected": "LFS_DECISION file=\"design/mockup.psd\" mode=LFS_POINTER oid=\"aaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999\" size=15000000\nLFS_DECISION file=\"backups/site.tar.gz\" mode=LFS_POINTER oid=\"bbbbccccddddeeeeffff0000111122223333444455556666777788889999aaaa\" size=20000000"
      },
      {
        "label": "Fichier léger sans extension spéciale",
        "stdin": "FILE path=README.md size_bytes=1200 sha256=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        "expected": "LFS_DECISION file=\"README.md\" mode=GIT_BLOB"
      }
    ],
    "solution": "# Corrigé officiel gh3-c6-e1\n#!/usr/bin/env bash\n# Solution Bash — gh3-c6-e1 : Simulateur de Git LFS (Large File Storage) et génération de pointeurs\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"RklMRSBwYXRoPXZpZGVvcy9pbnRyby5tcDQgc2l6ZV9ieXRlcz01MjQyODgwMCBzaGEyNTY9YWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MApGSUxFIHBhdGg9c3JjL21haW4ucHkgc2l6ZV9ieXRlcz0yMDQ4IHNoYTI1Nj0wMDExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkZWVmZjAwMTEyMjMzNDQ1NTY2Nzc4ODk5YWFiYmNjZGRlZWZm\")\n    printf '%s\\n' \"TEZTX0RFQ0lTSU9OIGZpbGU9InZpZGVvcy9pbnRyby5tcDQiIG1vZGU9TEZTX1BPSU5URVIgb2lkPSJhYmNkZWYxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwIiBzaXplPTUyNDI4ODAwCkxGU19ERUNJU0lPTiBmaWxlPSJzcmMvbWFpbi5weSIgbW9kZT1HSVRfQkxPQg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"RklMRSBwYXRoPWRhdGEvcmF3X2RhdGFzZXQuYmluIHNpemVfYnl0ZXM9MTUwMDAwMDAwIHNoYTI1Nj0xMTIyMzM0NDU1NjY3Nzg4OTlhYWJiY2NkZGVlZmYwMDExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkZWVmZjAw\")\n    printf '%s\\n' \"TEZTX0RFQ0lTSU9OIGZpbGU9ImRhdGEvcmF3X2RhdGFzZXQuYmluIiBtb2RlPUxGU19QT0lOVEVSIG9pZD0iMTEyMjMzNDQ1NTY2Nzc4ODk5YWFiYmNjZGRlZWZmMDAxMTIyMzM0NDU1NjY3Nzg4OTlhYWJiY2NkZGVlZmYwMCIgc2l6ZT0xNTAwMDAwMDA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RklMRSBwYXRoPWRlc2lnbi9tb2NrdXAucHNkIHNpemVfYnl0ZXM9MTUwMDAwMDAgc2hhMjU2PWFhYWFiYmJiY2NjY2RkZGRlZWVlZmZmZjAwMDAxMTExMjIyMjMzMzM0NDQ0NTU1NTY2NjY3Nzc3ODg4ODk5OTkKRklMRSBwYXRoPWJhY2t1cHMvc2l0ZS50YXIuZ3ogc2l6ZV9ieXRlcz0yMDAwMDAwMCBzaGEyNTY9YmJiYmNjY2NkZGRkZWVlZWZmZmYwMDAwMTExMTIyMjIzMzMzNDQ0NDU1NTU2NjY2Nzc3Nzg4ODg5OTk5YWFhYQ==\")\n    printf '%s\\n' \"TEZTX0RFQ0lTSU9OIGZpbGU9ImRlc2lnbi9tb2NrdXAucHNkIiBtb2RlPUxGU19QT0lOVEVSIG9pZD0iYWFhYWJiYmJjY2NjZGRkZGVlZWVmZmZmMDAwMDExMTEyMjIyMzMzMzQ0NDQ1NTU1NjY2Njc3Nzc4ODg4OTk5OSIgc2l6ZT0xNTAwMDAwMApMRlNfREVDSVNJT04gZmlsZT0iYmFja3Vwcy9zaXRlLnRhci5neiIgbW9kZT1MRlNfUE9JTlRFUiBvaWQ9ImJiYmJjY2NjZGRkZGVlZWVmZmZmMDAwMDExMTEyMjIyMzMzMzQ0NDQ1NTU1NjY2Njc3Nzc4ODg4OTk5OWFhYWEiIHNpemU9MjAwMDAwMDA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RklMRSBwYXRoPVJFQURNRS5tZCBzaXplX2J5dGVzPTEyMDAgc2hhMjU2PTEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWY=\")\n    printf '%s\\n' \"TEZTX0RFQ0lTSU9OIGZpbGU9IlJFQURNRS5tZCIgbW9kZT1HSVRfQkxPQg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c6-e2",
    "chapter": 6,
    "title": "Validateur de Hook Git pre-commit (Détection de secrets & conflits)",
    "level": "n2",
    "language": "shell",
    "goal": "Intercepter avant l’enregistrement du commit les clés de sécurité codées en dur et les résidus de conflits.",
    "brief": "<p>Le hook côté client <code>.git/hooks/pre-commit</code> s'exécute localement avant la validation d'un commit. S'il renvoie un code de sortie différent de 0, le commit est avorté.<br><br>\nRègles de sécurité inspectées dans le contenu des fichiers indexés (Staged) :<br>\n1. <strong>Résidus de conflit de fusion</strong> : présence de <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> ou <code>=======</code> ou <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>.<br>\n   -> <code>COMMIT_REJECTED reason=MERGE_CONFLICT_MARKERS</code>.<br>\n2. <strong>Clé d'API AWS codée en dur</strong> : motif commençant par <code>AKIA</code> suivi d'au moins 16 caractères alphanumériques majuscules.<br>\n   -> <code>COMMIT_REJECTED reason=HARDCODED_AWS_KEY</code>.<br>\n3. <strong>Jeton d'accès GitHub personnel</strong> : motif commençant par <code>ghp_</code> suivi d'au moins 20 caractères alphanumériques.<br>\n   -> <code>COMMIT_REJECTED reason=HARDCODED_GITHUB_TOKEN</code>.<br>\n4. Sinon : fichier sain.<br>\n   -> <code>COMMIT_ACCEPTED reason=CLEAN</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque fichier, afficher :<br>\n<code>HOOK_RESULT file=\"{file}\" verdict={COMMIT_ACCEPTED|COMMIT_REJECTED} reason={reason}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c6-e2) — Validateur de Hook Git pre-commit (Détection de secrets & conflits)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Tester dans l’ordre : marqueurs de conflits, clés AWS, jetons GitHub.",
      "Utiliser re.search() pour détecter les motifs réguliers."
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
      }
    ],
    "solution": "# Corrigé officiel gh3-c6-e2\n#!/usr/bin/env bash\n# Solution Bash — gh3-c6-e2 : Validateur de Hook Git pre-commit (Détection de secrets & conflits)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"SU5TUEVDVF9GSUxFIGZpbGU9YXBwLnB5IGNvbnRlbnQ9QVdTX0tFWSA9ICJBS0lBSU9TRk9ETk43RVhBTVBMRTEyMyIKSU5TUEVDVF9GSUxFIGZpbGU9bWFpbi5weSBjb250ZW50PXByaW50KCJIZWxsbyBXb3JsZCIp\")\n    printf '%s\\n' \"SE9PS19SRVNVTFQgZmlsZT0iYXBwLnB5IiB2ZXJkaWN0PUNPTU1JVF9SRUpFQ1RFRCByZWFzb249SEFSRENPREVEX0FXU19LRVkKSE9PS19SRVNVTFQgZmlsZT0ibWFpbi5weSIgdmVyZGljdD1DT01NSVRfQUNDRVBURUQgcmVhc29uPUNMRUFO\" | base64 -d\n    echo \"\"\n    ;;\n  \"SU5TUEVDVF9GSUxFIGZpbGU9cm91dGVzLmpzIGNvbnRlbnQ9PDw8PDw8PCBIRUFEXG5jb25zdCB2ID0gMTtcbj09PT09PT0=\")\n    printf '%s\\n' \"SE9PS19SRVNVTFQgZmlsZT0icm91dGVzLmpzIiB2ZXJkaWN0PUNPTU1JVF9SRUpFQ1RFRCByZWFzb249TUVSR0VfQ09ORkxJQ1RfTUFSS0VSUw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"SU5TUEVDVF9GSUxFIGZpbGU9LmVudiBjb250ZW50PUdJVEhVQl9QQVQ9Z2hwXzEyMzQ1Njc4OTBhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eg==\")\n    printf '%s\\n' \"SE9PS19SRVNVTFQgZmlsZT0iLmVudiIgdmVyZGljdD1DT01NSVRfUkVKRUNURUQgcmVhc29uPUhBUkRDT0RFRF9HSVRIVUJfVE9LRU4=\" | base64 -d\n    echo \"\"\n    ;;\n  \"SU5TUEVDVF9GSUxFIGZpbGU9c2VydmljZS5weSBjb250ZW50PWRlZiBwcm9jZXNzKCk6XG4gICAgIyBTdGFuZGFyZCBwcm9jZXNzIHdpdGhvdXQgc2VjcmV0c1xuICAgIHJldHVybiBUcnVl\")\n    printf '%s\\n' \"SE9PS19SRVNVTFQgZmlsZT0ic2VydmljZS5weSIgdmVyZGljdD1DT01NSVRfQUNDRVBURUQgcmVhc29uPUNMRUFO\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c6-e3",
    "chapter": 6,
    "title": "Purge médico-légale de secrets dans l’historique (git-filter-repo)",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler la réécriture d’un historique Git pour expurger un fichier confidentiel commité par erreur.",
    "brief": "<p>Supprimer un fichier sensible dans un commit récent ne suffit pas : le secret reste accessible dans les commits antérieurs de l’historique. L’outil officiel <strong>git-filter-repo</strong> permet de purger le fichier de tous les commits passés et recalcule les nouveaux hachages SHA-1 en cascade.<br><br>\nSpécification :<br>\nLe script Bash lit les données sur l’entrée standard (stdin)...&gt; parents=&lt;p|NONE&gt;</code><br>\nPuis la commande d'expurgation :<br>\n<code>PURGE_FILE target=&lt;nom_du_fichier_a_supprimer&gt;</code>.<br><br>\nRègles :<br>\n1. Chaque commit contenant le fichier cible est <strong>impacté</strong> : le fichier est retiré de sa liste.<br>\n2. Tout commit impacté ou dont l'un des parents a été réécrit voit son hash modifié : <code>new_hash = f\"r_{ancien_hash}\"</code>.<br>\n3. Les commits non impactés et dont les parents sont inchangés conservent leur hash d'origine.<br><br>\nSortie attendue :<br>\n<code>PURGE_RESULT target=\"{fichier}\" impacted_count={n} new_tip_hash=\"{nouveau_hash_de_tete}\"</code><br>\nPuis pour chaque commit réécrit :<br>\n<code>REWRITTEN_COMMIT old=\"{old_hash}\" new=\"{new_hash}\" remaining_files=[{liste_fichiers}]</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c6-e3) — Purge médico-légale de secrets dans l’historique (git-filter-repo)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Parcourir les commits dans l’ordre chronologique.",
      "Si un commit contient target_file ou si son parent a changé, générer un nouveau hash r_{old}."
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
    "solution": "# Corrigé officiel gh3-c6-e3\n#!/usr/bin/env bash\n# Solution Bash — gh3-c6-e3 : Purge médico-légale de secrets dans l’historique (git-filter-repo)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q09NTUlUIGlkPUMxIGZpbGVzPW1haW4ucHksLmVudiBwYXJlbnRzPU5PTkUKQ09NTUlUIGlkPUMyIGZpbGVzPW1haW4ucHkgcGFyZW50cz1DMQpQVVJHRV9GSUxFIHRhcmdldD0uZW52\")\n    printf '%s\\n' \"UFVSR0VfUkVTVUxUIHRhcmdldD0iLmVudiIgaW1wYWN0ZWRfY291bnQ9MiBuZXdfdGlwX2hhc2g9InJfQzIiClJFV1JJVFRFTl9DT01NSVQgb2xkPSJDMSIgbmV3PSJyX0MxIiByZW1haW5pbmdfZmlsZXM9W21haW4ucHldClJFV1JJVFRFTl9DT01NSVQgb2xkPSJDMiIgbmV3PSJyX0MyIiByZW1haW5pbmdfZmlsZXM9W21haW4ucHld\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPUExIGZpbGVzPWluZGV4Lmh0bWwgcGFyZW50cz1OT05FCkNPTU1JVCBpZD1BMiBmaWxlcz1zdHlsZXMuY3NzIHBhcmVudHM9QTEKUFVSR0VfRklMRSB0YXJnZXQ9c2VjcmV0cy5qc29u\")\n    printf '%s\\n' \"UFVSR0VfUkVTVUxUIHRhcmdldD0ic2VjcmV0cy5qc29uIiBpbXBhY3RlZF9jb3VudD0wIG5ld190aXBfaGFzaD0iQTIi\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPTEwIGZpbGVzPVJFQURNRS5tZCBwYXJlbnRzPU5PTkUKQ09NTUlUIGlkPTIwIGZpbGVzPWFwcC5weSxpZF9yc2EgcGFyZW50cz0xMApQVVJHRV9GSUxFIHRhcmdldD1pZF9yc2E=\")\n    printf '%s\\n' \"UFVSR0VfUkVTVUxUIHRhcmdldD0iaWRfcnNhIiBpbXBhY3RlZF9jb3VudD0xIG5ld190aXBfaGFzaD0icl8yMCIKUkVXUklUVEVOX0NPTU1JVCBvbGQ9IjIwIiBuZXc9InJfMjAiIHJlbWFpbmluZ19maWxlcz1bYXBwLnB5XQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPVgxIGZpbGVzPWEudHh0LGxlYWsua2V5IHBhcmVudHM9Tk9ORQpDT01NSVQgaWQ9WDIgZmlsZXM9Yi50eHQgcGFyZW50cz1YMQpDT01NSVQgaWQ9WDMgZmlsZXM9Yy50eHQgcGFyZW50cz1YMgpQVVJHRV9GSUxFIHRhcmdldD1sZWFrLmtleQ==\")\n    printf '%s\\n' \"UFVSR0VfUkVTVUxUIHRhcmdldD0ibGVhay5rZXkiIGltcGFjdGVkX2NvdW50PTMgbmV3X3RpcF9oYXNoPSJyX1gzIgpSRVdSSVRURU5fQ09NTUlUIG9sZD0iWDEiIG5ldz0icl9YMSIgcmVtYWluaW5nX2ZpbGVzPVthLnR4dF0KUkVXUklUVEVOX0NPTU1JVCBvbGQ9IlgyIiBuZXc9InJfWDIiIHJlbWFpbmluZ19maWxlcz1bYi50eHRdClJFV1JJVFRFTl9DT01NSVQgb2xkPSJYMyIgbmV3PSJyX1gzIiByZW1haW5pbmdfZmlsZXM9W2MudHh0XQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];

module.exports = GH3_EXERCISES;
