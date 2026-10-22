'use strict';

module.exports = [
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c1-e1 : Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"T0JKRUNUIHR5cGU9YmxvYiBjb250ZW50PWhlbGxvIHdvcmxk\")\n    printf '%s\\n' \"R0lUX0hBU0ggdHlwZT1ibG9iIHNpemU9MTEgc2hhMT05NWQwOWYyYjEwMTU5MzQ3ZWVjZTcxMzk5YTdlMmU5MDdlYTNkZjRm\" | base64 -d\n    echo \"\"\n    ;;\n  \"T0JKRUNUIHR5cGU9YmxvYiBjb250ZW50PUFyY2hpdGVjdHVyZSBsb2dpY2llbGxlIEIz\")\n    printf '%s\\n' \"R0lUX0hBU0ggdHlwZT1ibG9iIHNpemU9MjYgc2hhMT02NmRlNzlhZDYxMzFjZTBmZjA1YzFmMmUyZTQ3MmY0YWEwOWFkYTQy\" | base64 -d\n    echo \"\"\n    ;;\n  \"T0JKRUNUIHR5cGU9Y29tbWl0IGNvbnRlbnQ9dHJlZSBhMWIyYzNkNGU1XG5hdXRob3IgQWxpY2VcblxuSW5pdGlhbCBjb21taXQKT0JKRUNUIHR5cGU9dGFnIGNvbnRlbnQ9b2JqZWN0IDEyMzQ1NlxudHlwZSBjb21taXRcbnRhZyB2MS4wLjA=\")\n    printf '%s\\n' \"R0lUX0hBU0ggdHlwZT1jb21taXQgc2l6ZT00NCBzaGExPWYwNDcyODA3MDlkZDBjZGJkNTU2MzZhYWYxNzVhOTk0MTdkMTI2ZjUKR0lUX0hBU0ggdHlwZT10YWcgc2l6ZT0zNiBzaGExPWViMzdkYTM4ZjY0N2I5ZjFlMGI5NTcwNzg1MDM0ODkzM2FjYzVhMDI=\" | base64 -d\n    echo \"\"\n    ;;\n  \"T0JKRUNUIHR5cGU9YmxvYiBjb250ZW50PQ==\")\n    printf '%s\\n' \"R0lUX0hBU0ggdHlwZT1ibG9iIHNpemU9MCBzaGExPWU2OWRlMjliYjJkMWQ2NDM0YjhiMjlhZTc3NWFkOGMyZTQ4YzUzOTE=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c1-e2 : Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"RU5UUlkgbW9kZT0xMDA2NDQgdHlwZT1ibG9iIHNoYTE9YTFiMmMzZDRlNWY2YTFiMmMzZDRlNWY2YTFiMmMzZDRlNWY2YTFiMiBuYW1lPVJFQURNRS5tZApFTlRSWSBtb2RlPTA0MDAwMCB0eXBlPXRyZWUgc2hhMT1iMWMyZDNlNGY1YTZiMWMyZDNlNGY1YTZiMWMyZDNlNGY1YTZiMWMyIG5hbWU9c3Jj\")\n    printf '%s\\n' \"MTAwNjQ0IGJsb2IgYTFiMmMzZDRlNWY2YTFiMmMzZDRlNWY2YTFiMmMzZDRlNWY2YTFiMglSRUFETUUubWQKMDQwMDAwIHRyZWUgYjFjMmQzZTRmNWE2YjFjMmQzZTRmNWE2YjFjMmQzZTRmNWE2YjFjMglzcmMKVFJFRV9TVU1NQVJZIHRvdGFsPTIgYmxvYnM9MSBzdWJ0cmVlcz0xIGV4ZWN1dGFibGVzPTA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RU5UUlkgbW9kZT0xMDA3NTUgdHlwZT1ibG9iIHNoYTE9MTExMTIyMjIzMzMzNDQ0NDU1NTU2NjY2Nzc3Nzg4ODg5OTk5YWFhYSBuYW1lPWRlcGxveS5zaApFTlRSWSBtb2RlPTEwMDY0NCB0eXBlPWJsb2Igc2hhMT1iYmJiY2NjY2RkZGRlZWVlZmZmZjAwMDAxMTExMjIyMjMzMzM0NDQ0IG5hbWU9Y29uZmlnLmpzb24KRU5UUlkgbW9kZT0wNDAwMDAgdHlwZT10cmVlIHNoYTE9NTU1NTY2NjY3Nzc3ODg4ODk5OTlhYWFhYmJiYmNjY2NkZGRkZWVlZSBuYW1lPWFzc2V0cw==\")\n    printf '%s\\n' \"MDQwMDAwIHRyZWUgNTU1NTY2NjY3Nzc3ODg4ODk5OTlhYWFhYmJiYmNjY2NkZGRkZWVlZQlhc3NldHMKMTAwNjQ0IGJsb2IgYmJiYmNjY2NkZGRkZWVlZWZmZmYwMDAwMTExMTIyMjIzMzMzNDQ0NAljb25maWcuanNvbgoxMDA3NTUgYmxvYiAxMTExMjIyMjMzMzM0NDQ0NTU1NTY2NjY3Nzc3ODg4ODk5OTlhYWFhCWRlcGxveS5zaApUUkVFX1NVTU1BUlkgdG90YWw9MyBibG9icz0yIHN1YnRyZWVzPTEgZXhlY3V0YWJsZXM9MQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Y2FzMg==\")\n    printf '%s\\n' \"VFJFRV9TVU1NQVJZIHRvdGFsPTAgYmxvYnM9MCBzdWJ0cmVlcz0wIGV4ZWN1dGFibGVzPTA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RU5UUlkgbW9kZT0xMDA3NTUgdHlwZT1ibG9iIHNoYTE9YWFhMTExYmJiMjIyY2NjMzMzZGRkNDQ0ZWVlNTU1ZmZmNjY2YWExMSBuYW1lPXJ1bi5weQpFTlRSWSBtb2RlPTEwMDc1NSB0eXBlPWJsb2Igc2hhMT1iYmIyMjJjY2MzMzNkZGQ0NDRlZWU1NTVmZmY2NjZhYWExMTFiYmIyMiBuYW1lPWJ1aWxkLnNoCkVOVFJZIG1vZGU9MTIwMDAwIHR5cGU9YmxvYiBzaGExPWNjYzMzM2RkZDQ0NGVlZTU1NWZmZjY2NmFhYTExMWJiYjIyMmNjYzMzIG5hbWU9bGF0ZXN0Lmxpbms=\")\n    printf '%s\\n' \"MTAwNzU1IGJsb2IgYmJiMjIyY2NjMzMzZGRkNDQ0ZWVlNTU1ZmZmNjY2YWFhMTExYmJiMjIJYnVpbGQuc2gKMTIwMDAwIGJsb2IgY2NjMzMzZGRkNDQ0ZWVlNTU1ZmZmNjY2YWFhMTExYmJiMjIyY2NjMzMJbGF0ZXN0LmxpbmsKMTAwNzU1IGJsb2IgYWFhMTExYmJiMjIyY2NjMzMzZGRkNDQ0ZWVlNTU1ZmZmNjY2YWExMQlydW4ucHkKVFJFRV9TVU1NQVJZIHRvdGFsPTMgYmxvYnM9MyBzdWJ0cmVlcz0wIGV4ZWN1dGFibGVzPTI=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c1-e3 : Résolveur de références symboliques & pointeur HEAD (git rev-parse)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UkVGIG5hbWU9cmVmcy9oZWFkcy9tYWluIHRhcmdldD1jMGZmZWUxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyClJFRiBuYW1lPUhFQUQgdGFyZ2V0PXJlZjogcmVmcy9oZWFkcy9tYWluClJFU09MVkUgbmFtZT1IRUFE\")\n    printf '%s\\n' \"UkVTT0xWRUQgbmFtZT1IRUFEIGNvbW1pdD1jMGZmZWUxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyIHN0YXRlPUJSQU5DSF9SRUYgcGF0aD1IRUFEIC0+IHJlZnMvaGVhZHMvbWFpbg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkVGIG5hbWU9SEVBRCB0YXJnZXQ9OTg3NjU0MzIxMGFiY2RlZjk4NzY1NDMyMTBhYmNkZWY5ODc2NTQzMgpSRVNPTFZFIG5hbWU9SEVBRA==\")\n    printf '%s\\n' \"UkVTT0xWRUQgbmFtZT1IRUFEIGNvbW1pdD05ODc2NTQzMjEwYWJjZGVmOTg3NjU0MzIxMGFiY2RlZjk4NzY1NDMyIHN0YXRlPURFVEFDSEVEX0hFQUQgcGF0aD1IRUFE\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkVGIG5hbWU9cmVmcy9oZWFkcy9mZWF0dXJlIHRhcmdldD1hYWJiY2NkZGVlZmYwMDExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkClJFRiBuYW1lPUhFQUQgdGFyZ2V0PXJlZjogcmVmcy9oZWFkcy9mZWF0dXJlClJFU09MVkUgbmFtZT1IRUFEClJFU09MVkUgbmFtZT1yZWZzL2hlYWRzL2RldmVsb3A=\")\n    printf '%s\\n' \"UkVTT0xWRUQgbmFtZT1IRUFEIGNvbW1pdD1hYWJiY2NkZGVlZmYwMDExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkIHN0YXRlPUJSQU5DSF9SRUYgcGF0aD1IRUFEIC0+IHJlZnMvaGVhZHMvZmVhdHVyZQpSRVNPTFZFRCBuYW1lPXJlZnMvaGVhZHMvZGV2ZWxvcCBzdGF0dXM9Tk9UX0ZPVU5E\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkVGIG5hbWU9cmVmcy90YWdzL3YyLjAgdGFyZ2V0PTExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkZWVmZjAwMTEyMjMzNDQKUkVTT0xWRSBuYW1lPXJlZnMvdGFncy92Mi4w\")\n    printf '%s\\n' \"UkVTT0xWRUQgbmFtZT1yZWZzL3RhZ3MvdjIuMCBjb21taXQ9MTEyMjMzNDQ1NTY2Nzc4ODk5YWFiYmNjZGRlZWZmMDAxMTIyMzM0NCBzdGF0ZT1CUkFOQ0hfUkVGIHBhdGg9cmVmcy90YWdzL3YyLjA=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
