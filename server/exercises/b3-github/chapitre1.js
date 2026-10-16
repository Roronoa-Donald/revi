'use strict';

module.exports = [
  {
    "id": "gh3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le hash SHA-1 exact d’un objet Git selon le formatage canonique interne du stockage objet.",
    "brief": "<p>En interne, Git stocke tous les contenus dans sa base de données orientée objets (<code>.git/objects/</code>) adressée par le contenu (Content-Addressable Storage).<br><br>\nPour calculer l'empreinte SHA-1 d'un objet (équivalent de la commande de plomberie <code>git hash-object</code>), Git préfixe le contenu brut avec une chaîne d'en-tête standard suivie d'un octet nul <code>\\0</code> :<br>\n<code>en-tete = f\"{type_objet} {taille_octets}\\0\"</code><br>\nPuis il calcule le condensat SHA-1 (40 caractères hexadécimaux en minuscules) de la concaténation de l'en-tête et du contenu.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque ligne, afficher :<br>\n<code>GIT_HASH type={type} size={taille} sha1={hash_hex}</code></p>",
    "starter": "# Grille d'analyse (gh3-c1-e1) — Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Blob avec texte standard sans saut de ligne final]\n# Données : OBJECT type=blob content=Architecture logicielle B3\nA_COMPLETER\n\n[Cas 2 — Commit fictif et tag annoté]\n# Données : OBJECT type=commit content=tree a1b2c3d4e5\\nauthor Alice\\n\\nInitial commit\n# Données : OBJECT type=tag content=object 123456\\ntype commit\\ntag v1.0.0\nA_COMPLETER\n\n[Cas 3 — Objet avec contenu vide]\n# Données : OBJECT type=blob content=\nA_COMPLETER\n",
    "hints": [
      "L’en-tête Git s’écrit f\"{obj_type} {len(content_bytes)}\\0\".",
      "Encoder l’en-tête et le contenu en UTF-8 avant de passer à hashlib.sha1()."
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
        "stdin": "cas:1",
        "expected": "GIT_HASH type=blob size=26 sha1=66de79ad6131ce0ff05c1f2e2e472f4aa09ada42"
      },
      {
        "label": "Commit fictif et tag annoté",
        "stdin": "cas:2",
        "expected": "GIT_HASH type=commit size=44 sha1=f047280709dd0cdbd55636aaf175a99417d126f5\nGIT_HASH type=tag size=36 sha1=eb37da38f647b9f1e0b95707850348933acc5a02"
      },
      {
        "label": "Objet avec contenu vide",
        "stdin": "cas:3",
        "expected": "GIT_HASH type=blob size=0 sha1=e69de29bb2d1d6434b8b29ae775ad8c2e48c5391"
      }
    ],
    "solution": "[Exemple]\nGIT_HASH type=blob size=11 sha1=95d09f2b10159347eece71399a7e2e907ea3df4f\n\n[Cas 1 — Blob avec texte standard sans saut de ligne final]\nGIT_HASH type=blob size=26 sha1=66de79ad6131ce0ff05c1f2e2e472f4aa09ada42\n\n[Cas 2 — Commit fictif et tag annoté]\nGIT_HASH type=commit size=44 sha1=f047280709dd0cdbd55636aaf175a99417d126f5\nGIT_HASH type=tag size=36 sha1=eb37da38f647b9f1e0b95707850348933acc5a02\n\n[Cas 3 — Objet avec contenu vide]\nGIT_HASH type=blob size=0 sha1=e69de29bb2d1d6434b8b29ae775ad8c2e48c5391"
  },
  {
    "id": "gh3-c1-e2",
    "chapter": 1,
    "title": "Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser les entrées d’un objet Tree Git et afficher l’inventaire des blobs et sous-arbres avec leur mode.",
    "brief": "<p>Un objet <strong>Tree</strong> dans Git modélise un répertoire. Il contient une suite ordonnée d'entrées représentant les fichiers (blobs) et les sous-répertoires (trees).<br><br>\nChaque entrée comporte :<br>\n- Un mode UNIX à 6 chiffres :<br>\n  - <code>100644</code> : fichier texte / données normal (non exécutable)<br>\n  - <code>100755</code> : script / binaire exécutable<br>\n  - <code>040000</code> : sous-répertoire (Tree)<br>\n  - <code>120000</code> : lien symbolique (symlink)<br>\n- Le type de l'objet lié (<code>blob</code> pour les fichiers, <code>tree</code> pour les répertoires).<br>\n- L'identifiant SHA-1 de l'objet (40 caractères hexadécimaux).<br>\n- Le nom du fichier ou dossier.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nIndiquez pour chaque cas les entrées triées par ordre alphabétique du nom de fichier au format standard <code>git ls-tree</code> :<br>\n<code>{mode} {type} {sha1}\\t{name}</code><br>\nPuis un récapitulatif :<br>\n<code>TREE_SUMMARY total={n} blobs={nb_blobs} subtrees={nb_trees} executables={nb_exec}</code></p>",
    "starter": "# Grille d'analyse (gh3-c1-e2) — Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tree avec script exécutable et plusieurs fichiers]\n# Données : ENTRY mode=100755 type=blob sha1=111122223333444455556666777788889999aaaa name=deploy.sh\n# Données : ENTRY mode=100644 type=blob sha1=bbbbccccddddeeeeffff00001111222233334444 name=config.json\n# Données : ENTRY mode=040000 type=tree sha1=55556666777788889999aaaabbbbccccddddeeee name=assets\nA_COMPLETER\n\n[Cas 2 — Tree vide]\n# (Aucune donnée spécifique)\nA_COMPLETER\n\n[Cas 3 — Multiples exécutables et lien symbolique]\n# Données : ENTRY mode=100755 type=blob sha1=aaa111bbb222ccc333ddd444eee555fff666aa11 name=run.py\n# Données : ENTRY mode=100755 type=blob sha1=bbb222ccc333ddd444eee555fff666aaa111bbb22 name=build.sh\n# Données : ENTRY mode=120000 type=blob sha1=ccc333ddd444eee555fff666aaa111bbb222ccc33 name=latest.link\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "040000 tree 55556666777788889999aaaabbbbccccddddeeee\tassets\n100644 blob bbbbccccddddeeeeffff00001111222233334444\tconfig.json\n100755 blob 111122223333444455556666777788889999aaaa\tdeploy.sh\nTREE_SUMMARY total=3 blobs=2 subtrees=1 executables=1"
      },
      {
        "label": "Tree vide",
        "stdin": "cas:2",
        "expected": "TREE_SUMMARY total=0 blobs=0 subtrees=0 executables=0"
      },
      {
        "label": "Multiples exécutables et lien symbolique",
        "stdin": "cas:3",
        "expected": "100755 blob bbb222ccc333ddd444eee555fff666aaa111bbb22\tbuild.sh\n120000 blob ccc333ddd444eee555fff666aaa111bbb222ccc33\tlatest.link\n100755 blob aaa111bbb222ccc333ddd444eee555fff666aa11\trun.py\nTREE_SUMMARY total=3 blobs=3 subtrees=0 executables=2"
      }
    ],
    "solution": "[Exemple]\n100644 blob a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2\tREADME.md\n040000 tree b1c2d3e4f5a6b1c2d3e4f5a6b1c2d3e4f5a6b1c2\tsrc\nTREE_SUMMARY total=2 blobs=1 subtrees=1 executables=0\n\n[Cas 1 — Tree avec script exécutable et plusieurs fichiers]\n040000 tree 55556666777788889999aaaabbbbccccddddeeee\tassets\n100644 blob bbbbccccddddeeeeffff00001111222233334444\tconfig.json\n100755 blob 111122223333444455556666777788889999aaaa\tdeploy.sh\nTREE_SUMMARY total=3 blobs=2 subtrees=1 executables=1\n\n[Cas 2 — Tree vide]\nTREE_SUMMARY total=0 blobs=0 subtrees=0 executables=0\n\n[Cas 3 — Multiples exécutables et lien symbolique]\n100755 blob bbb222ccc333ddd444eee555fff666aaa111bbb22\tbuild.sh\n120000 blob ccc333ddd444eee555fff666aaa111bbb222ccc33\tlatest.link\n100755 blob aaa111bbb222ccc333ddd444eee555fff666aa11\trun.py\nTREE_SUMMARY total=3 blobs=3 subtrees=0 executables=2"
  },
  {
    "id": "gh3-c1-e3",
    "chapter": 1,
    "title": "Résolveur de références symboliques & pointeur HEAD (git rev-parse)",
    "level": "n3",
    "language": "analyse",
    "goal": "Résoudre la chaîne de pointeurs de références de Git pour déterminer le commit actif pointé par HEAD.",
    "brief": "<p>Dans Git, <code>HEAD</code> est une référence symbolique qui pointe généralement vers une branche locale (ex: <code>ref: refs/heads/main</code>), qui elle-même contient le hash du dernier commit de cette branche.<br><br>\nSi un développeur effectue un checkout directement sur un commit ou un tag, <code>HEAD</code> contient directement le hash : le dépôt est alors en <strong>HEAD détachée (Detached HEAD)</strong>.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Des définitions de références :<br>\n   <code>REF name=&lt;nom&gt; target=&lt;hash|ref: autre_ref&gt;</code>.<br>\n2. Des requêtes de résolution :<br>\n   <code>RESOLVE name=&lt;ref_a_resoudre&gt;</code>.<br><br>\nPour chaque requête, le script suit la chaîne de déréférencement jusqu'au hash SHA-1 final (en détectant si HEAD pointe sur une branche ou est détachée) :<br>\n- Si la chaîne aboutit à un commit :<br>\n  <code>RESOLVED name={name} commit={hash} state={BRANCH_REF|DETACHED_HEAD} path={chaine_de_refs}</code><br>\n- Si la référence n'existe pas :<br>\n  <code>RESOLVED name={name} status=NOT_FOUND</code></p>",
    "starter": "# Grille d'analyse (gh3-c1-e3) — Résolveur de références symboliques & pointeur HEAD (git rev-parse)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — HEAD détachée pointant directement sur un commit]\n# Données : REF name=HEAD target=9876543210abcdef9876543210abcdef98765432\n# Données : RESOLVE name=HEAD\nA_COMPLETER\n\n[Cas 2 — Chaîne de références avec branche intermédiaire et ref introuvable]\n# Données : REF name=refs/heads/feature target=aabbccddeeff00112233445566778899aabbccdd\n# Données : REF name=HEAD target=ref: refs/heads/feature\n# Données : RESOLVE name=HEAD\n# Données : RESOLVE name=refs/heads/develop\nA_COMPLETER\n\n[Cas 3 — Résolution directe d’un tag de version]\n# Données : REF name=refs/tags/v2.0 target=112233445566778899aabbccddeeff0011223344\n# Données : RESOLVE name=refs/tags/v2.0\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "RESOLVED name=HEAD commit=9876543210abcdef9876543210abcdef98765432 state=DETACHED_HEAD path=HEAD"
      },
      {
        "label": "Chaîne de références avec branche intermédiaire et ref introuvable",
        "stdin": "cas:2",
        "expected": "RESOLVED name=HEAD commit=aabbccddeeff00112233445566778899aabbccdd state=BRANCH_REF path=HEAD -> refs/heads/feature\nRESOLVED name=refs/heads/develop status=NOT_FOUND"
      },
      {
        "label": "Résolution directe d’un tag de version",
        "stdin": "cas:3",
        "expected": "RESOLVED name=refs/tags/v2.0 commit=112233445566778899aabbccddeeff0011223344 state=BRANCH_REF path=refs/tags/v2.0"
      }
    ],
    "solution": "[Exemple]\nRESOLVED name=HEAD commit=c0ffee1234567890abcdef1234567890abcdef12 state=BRANCH_REF path=HEAD -> refs/heads/main\n\n[Cas 1 — HEAD détachée pointant directement sur un commit]\nRESOLVED name=HEAD commit=9876543210abcdef9876543210abcdef98765432 state=DETACHED_HEAD path=HEAD\n\n[Cas 2 — Chaîne de références avec branche intermédiaire et ref introuvable]\nRESOLVED name=HEAD commit=aabbccddeeff00112233445566778899aabbccdd state=BRANCH_REF path=HEAD -> refs/heads/feature\nRESOLVED name=refs/heads/develop status=NOT_FOUND\n\n[Cas 3 — Résolution directe d’un tag de version]\nRESOLVED name=refs/tags/v2.0 commit=112233445566778899aabbccddeeff0011223344 state=BRANCH_REF path=refs/tags/v2.0"
  }
];
