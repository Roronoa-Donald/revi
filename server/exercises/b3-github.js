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
  },
  {
    "id": "gh3-c2-e1",
    "chapter": 2,
    "title": "Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer si une fusion de branches peut s’effectuer en Fast-Forward ou requiert un 3-Way Merge avec commit de fusion.",
    "brief": "<p>Dans le graphe orienté acyclique (DAG) des commits de Git :<br>\n- Si le commit de tête de la branche courante (<code>base</code>) est un <strong>ancêtre direct</strong> de la branche à intégrer (<code>target</code>), Git avance simplement le pointeur sans créer de nouveau commit : c'est un <strong>Fast-Forward (FF)</strong>.<br>\n- Si les deux branches ont divergé depuis un ancêtre commun (Lowest Common Ancestor - LCA), un <strong>Three-Way Merge</strong> est nécessaire et un commit de fusion à 2 parents doit être généré.<br><br>\nAnalysez les paramètres du problème pour chaque cas. La déclaration des commits et de leurs parents :<br>\n   <code>COMMIT id=&lt;id&gt; parents=&lt;p1,p2...|NONE&gt;</code>.<br>\n2. La position des branches :<br>\n   <code>BRANCH name=&lt;nom&gt; commit=&lt;id&gt;</code>.<br>\n3. Une demande de fusion :<br>\n   <code>MERGE_REQUEST current=&lt;branche_base&gt; incoming=&lt;branche_target&gt;</code>.<br><br>\nAfficher :<br>\n<code>MERGE_STRATEGY from={incoming} into={current} type={FAST_FORWARD|THREE_WAY_MERGE} lca={lca_id}</code></p>",
    "starter": "# Grille d'analyse (gh3-c2-e1) — Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Branches divergentes nécessitant un Three-Way Merge]\n# Données : COMMIT id=C1 parents=NONE\n# Données : COMMIT id=C2 parents=C1\n# Données : COMMIT id=C3 parents=C1\n# Données : BRANCH name=main commit=C2\n# Données : BRANCH name=feature commit=C3\n# Données : MERGE_REQUEST current=main incoming=feature\nA_COMPLETER\n\n[Cas 2 — Arborescence plus profonde avec Fast-Forward valide]\n# Données : COMMIT id=A parents=NONE\n# Données : COMMIT id=B parents=A\n# Données : COMMIT id=C parents=B\n# Données : COMMIT id=D parents=C\n# Données : BRANCH name=prod commit=B\n# Données : BRANCH name=release commit=D\n# Données : MERGE_REQUEST current=prod incoming=release\nA_COMPLETER\n\n[Cas 3 — Divergence après plusieurs commits communs]\n# Données : COMMIT id=R1 parents=NONE\n# Données : COMMIT id=R2 parents=R1\n# Données : COMMIT id=M1 parents=R2\n# Données : COMMIT id=M2 parents=M1\n# Données : COMMIT id=F1 parents=R2\n# Données : BRANCH name=main commit=M2\n# Données : BRANCH name=hotfix commit=F1\n# Données : MERGE_REQUEST current=main incoming=hotfix\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "MERGE_STRATEGY from=feature into=main type=THREE_WAY_MERGE lca=C1"
      },
      {
        "label": "Arborescence plus profonde avec Fast-Forward valide",
        "stdin": "cas:2",
        "expected": "MERGE_STRATEGY from=release into=prod type=FAST_FORWARD lca=B"
      },
      {
        "label": "Divergence après plusieurs commits communs",
        "stdin": "cas:3",
        "expected": "MERGE_STRATEGY from=hotfix into=main type=THREE_WAY_MERGE lca=R2"
      }
    ],
    "solution": "[Exemple]\nMERGE_STRATEGY from=feature into=main type=FAST_FORWARD lca=C1\n\n[Cas 1 — Branches divergentes nécessitant un Three-Way Merge]\nMERGE_STRATEGY from=feature into=main type=THREE_WAY_MERGE lca=C1\n\n[Cas 2 — Arborescence plus profonde avec Fast-Forward valide]\nMERGE_STRATEGY from=release into=prod type=FAST_FORWARD lca=B\n\n[Cas 3 — Divergence après plusieurs commits communs]\nMERGE_STRATEGY from=hotfix into=main type=THREE_WAY_MERGE lca=R2"
  },
  {
    "id": "gh3-c2-e2",
    "chapter": 2,
    "title": "Simulateur de Rebase Interactif (git rebase -i)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l’exécution des instructions de réécriture d’historique git-rebase-todo (pick, squash, reword, drop).",
    "brief": "<p>Le rebase interactif (<code>git rebase -i</code>) permet de nettoyer un historique de commits avant de proposer une Pull Request.<br><br>\nActions supportées :<br>\n- <code>pick &lt;id&gt; &lt;msg&gt;</code> : conserve le commit tel quel.<br>\n- <code>reword &lt;id&gt; &lt;nouveau_msg&gt;</code> : conserve les modifications mais remplace le message du commit.<br>\n- <code>drop &lt;id&gt;</code> : supprime purement et simplement le commit de l’historique.<br>\n- <code>squash &lt;id&gt; &lt;msg&gt;</code> : fusionne ce commit dans le commit précédent en concaténant les messages sous la forme <code>{msg_precedent} + {msg_squashe}</code>.<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nÀ l’issue de la réécriture, afficher le nouvel historique résultant :<br>\nPour chaque commit conservé :<br>\n<code>REBASED_COMMIT id={id} msg=\"{message}\"</code><br>\nEt la ligne finale :<br>\n<code>REBASE_SUMMARY total_commits={n}</code></p>",
    "starter": "# Grille d'analyse (gh3-c2-e2) — Simulateur de Rebase Interactif (git rebase -i)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Suppression de commit avec drop]\n# Données : TODO action=pick commit=A1 msg=Initial skeleton\n# Données : TODO action=drop commit=A2\n# Données : TODO action=pick commit=A3 msg=Ajout module BDD\nA_COMPLETER\n\n[Cas 2 — Plusieurs squashs consécutifs]\n# Données : TODO action=pick commit=10 msg=Feature base\n# Données : TODO action=squash commit=11 msg=WIP test 1\n# Données : TODO action=squash commit=12 msg=WIP test 2\n# Données : TODO action=pick commit=13 msg=Docs\nA_COMPLETER\n\n[Cas 3 — Tous les commits conservés sans modification]\n# Données : TODO action=pick commit=K1 msg=Premier commit\n# Données : TODO action=pick commit=K2 msg=Second commit\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "REBASED_COMMIT id=A1 msg=\"Initial skeleton\"\nREBASED_COMMIT id=A3 msg=\"Ajout module BDD\"\nREBASE_SUMMARY total_commits=2"
      },
      {
        "label": "Plusieurs squashs consécutifs",
        "stdin": "cas:2",
        "expected": "REBASED_COMMIT id=10 msg=\"Feature base + WIP test 1 + WIP test 2\"\nREBASED_COMMIT id=13 msg=\"Docs\"\nREBASE_SUMMARY total_commits=2"
      },
      {
        "label": "Tous les commits conservés sans modification",
        "stdin": "cas:3",
        "expected": "REBASED_COMMIT id=K1 msg=\"Premier commit\"\nREBASED_COMMIT id=K2 msg=\"Second commit\"\nREBASE_SUMMARY total_commits=2"
      }
    ],
    "solution": "[Exemple]\nREBASED_COMMIT id=C1 msg=\"feat: ajout login + fix: correction typo\"\nREBASED_COMMIT id=C3 msg=\"feat: ajout logout propre\"\nREBASE_SUMMARY total_commits=2\n\n[Cas 1 — Suppression de commit avec drop]\nREBASED_COMMIT id=A1 msg=\"Initial skeleton\"\nREBASED_COMMIT id=A3 msg=\"Ajout module BDD\"\nREBASE_SUMMARY total_commits=2\n\n[Cas 2 — Plusieurs squashs consécutifs]\nREBASED_COMMIT id=10 msg=\"Feature base + WIP test 1 + WIP test 2\"\nREBASED_COMMIT id=13 msg=\"Docs\"\nREBASE_SUMMARY total_commits=2\n\n[Cas 3 — Tous les commits conservés sans modification]\nREBASED_COMMIT id=K1 msg=\"Premier commit\"\nREBASED_COMMIT id=K2 msg=\"Second commit\"\nREBASE_SUMMARY total_commits=2"
  },
  {
    "id": "gh3-c2-e3",
    "chapter": 2,
    "title": "Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)",
    "level": "n3",
    "language": "analyse",
    "goal": "Appliquer l’algorithme de fusion à 3 voies ligne à ligne pour détecter les modifications unilatérales et les conflits.",
    "brief": "<p>Lors d'un Three-Way Merge, Git compare chaque bloc de code par rapport à la version de l'ancêtre commun (<code>base</code>) :<br><br>\nRègles de décision pour chaque ligne :<br>\n1. Si <code>ours == base</code> et <code>theirs == base</code> : aucun changement -> conserver <code>base</code> (statut <code>CLEAN</code>).<br>\n2. Si <code>ours != base</code> et <code>theirs == base</code> : modification unilatérale par notre branche -> adopter <code>ours</code> (statut <code>RESOLVED_OURS</code>).<br>\n3. Si <code>ours == base</code> et <code>theirs != base</code> : modification unilatérale par la branche distante -> adopter <code>theirs</code> (statut <code>RESOLVED_THEIRS</code>).<br>\n4. Si <code>ours == theirs</code> : les deux branches ont fait exactement le même changement -> adopter <code>ours</code> (statut <code>RESOLVED_SAME</code>).<br>\n5. Si <code>ours != theirs</code> et les deux diffèrent de <code>base</code> : conflit de fusion réel (statut <code>CONFLICT</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nAfficher :<br>\n- Si pas de conflit : <code>MERGE idx={n} status={CLEAN|RESOLVED_OURS|RESOLVED_THEIRS|RESOLVED_SAME} val=\"{val}\"</code><br>\n- Si conflit : <code>MERGE idx={n} status=CONFLICT ours=\"{ours}\" theirs=\"{theirs}\"</code></p>",
    "starter": "# Grille d'analyse (gh3-c2-e3) — Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Adoption unilatérale de theirs et ligne inchangée]\n# Données : LINE idx=10 base=debug = False ours=debug = False theirs=debug = True\n# Données : LINE idx=11 base=host = 0.0.0.0 ours=host = 0.0.0.0 theirs=host = 0.0.0.0\nA_COMPLETER\n\n[Cas 2 — Même modification adoptée des deux côtés]\n# Données : LINE idx=5 base=v1.0.0 ours=v1.1.0 theirs=v1.1.0\nA_COMPLETER\n\n[Cas 3 — Série mixte de résolutions et conflits]\n# Données : LINE idx=1 base=A ours=A theirs=B\n# Données : LINE idx=2 base=X ours=Y theirs=Z\n# Données : LINE idx=3 base=M ours=N theirs=M\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "MERGE idx=10 status=RESOLVED_THEIRS val=\"debug = True\"\nMERGE idx=11 status=CLEAN val=\"host = 0.0.0.0\""
      },
      {
        "label": "Même modification adoptée des deux côtés",
        "stdin": "cas:2",
        "expected": "MERGE idx=5 status=RESOLVED_SAME val=\"v1.1.0\""
      },
      {
        "label": "Série mixte de résolutions et conflits",
        "stdin": "cas:3",
        "expected": "MERGE idx=1 status=RESOLVED_THEIRS val=\"B\"\nMERGE idx=2 status=CONFLICT ours=\"Y\" theirs=\"Z\"\nMERGE idx=3 status=RESOLVED_OURS val=\"N\""
      }
    ],
    "solution": "[Exemple]\nMERGE idx=1 status=RESOLVED_OURS val=\"port = 443\"\nMERGE idx=2 status=CONFLICT ours=\"timeout = 60\" theirs=\"timeout = 120\"\n\n[Cas 1 — Adoption unilatérale de theirs et ligne inchangée]\nMERGE idx=10 status=RESOLVED_THEIRS val=\"debug = True\"\nMERGE idx=11 status=CLEAN val=\"host = 0.0.0.0\"\n\n[Cas 2 — Même modification adoptée des deux côtés]\nMERGE idx=5 status=RESOLVED_SAME val=\"v1.1.0\"\n\n[Cas 3 — Série mixte de résolutions et conflits]\nMERGE idx=1 status=RESOLVED_THEIRS val=\"B\"\nMERGE idx=2 status=CONFLICT ours=\"Y\" theirs=\"Z\"\nMERGE idx=3 status=RESOLVED_OURS val=\"N\""
  },
  {
    "id": "gh3-c3-e1",
    "chapter": 3,
    "title": "Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser le journal des mouvements de têtes (reflog) pour identifier et sauver un commit devenu orphelin après un reset accidentel.",
    "brief": "<p>Lorsqu'un développeur exécute par erreur <code>git reset --hard HEAD~3</code> ou supprime une branche locale avant d'avoir poussé, les commits semblent perdus.<br>\nEn réalité, Git ne supprime jamais immédiatement les objets : ils restent référencés dans le <strong>Reflog (Reference Log)</strong> jusqu'à la collecte des déchets (Garbage Collection <code>git gc</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas. La liste des commits actuellement accessibles par les branches actives :<br>\n   <code>ACTIVE_BRANCH name=&lt;nom&gt; tip=&lt;hash&gt; ancestors=&lt;h1,h2...|NONE&gt;</code>.<br>\n2. Les entrées chronologiques du reflog de HEAD (du plus récent au plus ancien) :<br>\n   <code>REFLOG_ENTRY id=&lt;HEAD@{n}&gt; commit=&lt;hash&gt; action=&lt;action&gt; desc=&lt;message&gt;</code>.<br><br>\nUn commit est considéré comme <strong>orphelin (Dangling)</strong> s'il figure dans le reflog mais n'apparaît ni comme tête (tip) ni comme ancêtre d'aucune branche active.<br><br>\nPour chaque commit orphelin identifié dans le reflog (dans l'ordre d'apparition), afficher :<br>\n<code>RESCUE_CANDIDATE reflog={id} commit={hash} action=\"{action}\" desc=\"{desc}\" status=DANGLING</code><br>\nSi aucun commit orphelin n'est trouvé :<br>\n<code>RESCUE_SUMMARY: ALL_COMMITS_REFERENCED</code></p>",
    "starter": "# Grille d'analyse (gh3-c3-e1) — Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tous les commits du reflog sont accessibles dans les branches]\n# Données : ACTIVE_BRANCH name=main tip=C2 ancestors=C1\n# Données : REFLOG_ENTRY id=HEAD@{0} commit=C2 action=checkout desc=moving to main\n# Données : REFLOG_ENTRY id=HEAD@{1} commit=C1 action=commit desc=Init\nA_COMPLETER\n\n[Cas 2 — Multiples commits orphelins après rebases multiples]\n# Données : ACTIVE_BRANCH name=main tip=M2 ancestors=M1\n# Données : ACTIVE_BRANCH name=dev tip=D1 ancestors=M1\n# Données : REFLOG_ENTRY id=HEAD@{0} commit=M2 action=checkout desc=to main\n# Données : REFLOG_ENTRY id=HEAD@{1} commit=LOST1 action=commit desc=Secret code\n# Données : REFLOG_ENTRY id=HEAD@{2} commit=LOST2 action=commit desc=Old prototype\nA_COMPLETER\n\n[Cas 3 — Commit orphelin unique après suppression de branche]\n# Données : ACTIVE_BRANCH name=main tip=100 ancestors=NONE\n# Données : REFLOG_ENTRY id=HEAD@{0} commit=999 action=branch_delete desc=Temporary fix\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "RESCUE_SUMMARY: ALL_COMMITS_REFERENCED"
      },
      {
        "label": "Multiples commits orphelins après rebases multiples",
        "stdin": "cas:2",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{1} commit=LOST1 action=\"commit\" desc=\"Secret code\" status=DANGLING\nRESCUE_CANDIDATE reflog=HEAD@{2} commit=LOST2 action=\"commit\" desc=\"Old prototype\" status=DANGLING"
      },
      {
        "label": "Commit orphelin unique après suppression de branche",
        "stdin": "cas:3",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{0} commit=999 action=\"branch_delete\" desc=\"Temporary fix\" status=DANGLING"
      }
    ],
    "solution": "[Exemple]\nRESCUE_CANDIDATE reflog=HEAD@{1} commit=C3 action=\"commit\" desc=\"Feature perdue\" status=DANGLING\n\n[Cas 1 — Tous les commits du reflog sont accessibles dans les branches]\nRESCUE_SUMMARY: ALL_COMMITS_REFERENCED\n\n[Cas 2 — Multiples commits orphelins après rebases multiples]\nRESCUE_CANDIDATE reflog=HEAD@{1} commit=LOST1 action=\"commit\" desc=\"Secret code\" status=DANGLING\nRESCUE_CANDIDATE reflog=HEAD@{2} commit=LOST2 action=\"commit\" desc=\"Old prototype\" status=DANGLING\n\n[Cas 3 — Commit orphelin unique après suppression de branche]\nRESCUE_CANDIDATE reflog=HEAD@{0} commit=999 action=\"branch_delete\" desc=\"Temporary fix\" status=DANGLING"
  },
  {
    "id": "gh3-c3-e2",
    "chapter": 3,
    "title": "Détecteur de régression dichotomique automatique (git bisect)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler la recherche dichotomique de Git Bisect pour identifier le premier commit ayant introduit un bogue.",
    "brief": "<p>L'outil <code>git bisect</code> effectue une recherche binaire (dichotomie) dans l'historique des commits pour trouver la régression en un minimum de tests ($O(\\log N)$).<br><br>\nAlgorithme :<br>\n1. On dispose d'une liste ordonnée chronologiquement de $N$ commits : <code>[c_0, c_1, ..., c_{N-1}]</code>.<br>\n   Le commit initial $c_0$ est certifié <code>GOOD</code> (sain), et le commit final $c_{N-1}$ est <code>BAD</code> (défaillant).<br>\n2. Tant que l'intervalle <code>[low, high]</code> contient plus d'un commit suspect :<br>\n   On choisit le commit médian : <code>mid = (low + high) // 2</code>.<br>\n   On évalue l'état du commit <code>mid</code> (fourni par la table des statuts) :<br>\n   - Si <code>mid == BAD</code> : la régression a eu lieu à <code>mid</code> ou avant -> <code>high = mid</code>.<br>\n   - Si <code>mid == GOOD</code> : la régression a eu lieu après <code>mid</code> -> <code>low = mid + 1</code>.<br>\n   On Indiquez chaque étape : <code>BISECT_STEP step={k} testing={commit_id} verdict={GOOD|BAD} remaining={high - low + 1}</code>.<br>\n3. Dès que <code>low == high</code>, le premier commit défaillant est identifié :<br>\n   <code>FIRST_BAD_COMMIT id={commit_id}</code>.<br><br>\nAnalysez les données fournies pour chaque cas...&gt;</code><br>\n<code>STATUSES &lt;c_id&gt;=&lt;GOOD|BAD&gt; ...</code></p>",
    "starter": "# Grille d'analyse (gh3-c3-e2) — Détecteur de régression dichotomique automatique (git bisect)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Historique de 8 commits avec bogue introduit tardivement]\n# Données : HISTORY commits=v1,v2,v3,v4,v5,v6,v7,v8\n# Données : STATUSES v1=GOOD v2=GOOD v3=GOOD v4=GOOD v5=GOOD v6=GOOD v7=BAD v8=BAD\nA_COMPLETER\n\n[Cas 2 — Bogue introduit dès le deuxième commit]\n# Données : HISTORY commits=A,B,C,D\n# Données : STATUSES A=GOOD B=BAD C=BAD D=BAD\nA_COMPLETER\n\n[Cas 3 — Seulement 3 commits dans l’historique]\n# Données : HISTORY commits=1,2,3\n# Données : STATUSES 1=GOOD 2=GOOD 3=BAD\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "BISECT_STEP step=1 testing=v4 verdict=GOOD remaining=4\nBISECT_STEP step=2 testing=v6 verdict=GOOD remaining=2\nBISECT_STEP step=3 testing=v7 verdict=BAD remaining=1\nFIRST_BAD_COMMIT id=v7"
      },
      {
        "label": "Bogue introduit dès le deuxième commit",
        "stdin": "cas:2",
        "expected": "BISECT_STEP step=1 testing=B verdict=BAD remaining=2\nBISECT_STEP step=2 testing=A verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=B"
      },
      {
        "label": "Seulement 3 commits dans l’historique",
        "stdin": "cas:3",
        "expected": "BISECT_STEP step=1 testing=2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=3"
      }
    ],
    "solution": "[Exemple]\nBISECT_STEP step=1 testing=C3 verdict=BAD remaining=3\nBISECT_STEP step=2 testing=C2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=C3\n\n[Cas 1 — Historique de 8 commits avec bogue introduit tardivement]\nBISECT_STEP step=1 testing=v4 verdict=GOOD remaining=4\nBISECT_STEP step=2 testing=v6 verdict=GOOD remaining=2\nBISECT_STEP step=3 testing=v7 verdict=BAD remaining=1\nFIRST_BAD_COMMIT id=v7\n\n[Cas 2 — Bogue introduit dès le deuxième commit]\nBISECT_STEP step=1 testing=B verdict=BAD remaining=2\nBISECT_STEP step=2 testing=A verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=B\n\n[Cas 3 — Seulement 3 commits dans l’historique]\nBISECT_STEP step=1 testing=2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=3"
  },
  {
    "id": "gh3-c3-e3",
    "chapter": 3,
    "title": "Gestionnaire de pile de remisage (git stash LIFO stack)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le comportement en pile LIFO (Last-In, First-Out) des commandes git stash.",
    "brief": "<p>La commande <code>git stash</code> enregistre temporairement les modifications en cours sur une pile LIFO sans créer de commit formel.<br><br>\nCommandes à exécuter :<br>\n- <code>push &lt;message&gt;</code> : empile une nouvelle entrée au sommet <code>stash@{0}</code>. Les entrées existantes sont décalées : <code>stash@{k} -> stash@{k+1}</code>.<br>\n- <code>pop</code> : extrait et supprime l'entrée la plus récente <code>stash@{0}</code>.<br>\n- <code>apply &lt;idx&gt;</code> : applique l'entrée <code>stash@{idx}</code> sans la supprimer de la pile.<br>\n- <code>drop &lt;idx&gt;</code> : supprime l'entrée <code>stash@{idx}</code> de la pile (les entrées d'indice supérieur sont décrémentées d'une unité).<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nPour chaque action, afficher :<br>\n<code>STASH_OP action={action} result={OK|STACK_EMPTY|INDEX_OUT_OF_BOUNDS} current_size={taille} top=\"{msg_du_sommet|EMPTY}\"</code></p>",
    "starter": "# Grille d'analyse (gh3-c3-e3) — Gestionnaire de pile de remisage (git stash LIFO stack)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Dépilement sur une pile vide]\n# Données : STASH_CMD action=pop\nA_COMPLETER\n\n[Cas 2 — Succession de push, apply et drop spécifique]\n# Données : STASH_CMD action=push arg=Fix CSS\n# Données : STASH_CMD action=push arg=Refactor API\n# Données : STASH_CMD action=apply arg=1\n# Données : STASH_CMD action=drop arg=0\nA_COMPLETER\n\n[Cas 3 — Drop avec index hors limites]\n# Données : STASH_CMD action=push arg=Seul élément\n# Données : STASH_CMD action=drop arg=5\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "STASH_OP action=pop result=STACK_EMPTY current_size=0 top=\"EMPTY\""
      },
      {
        "label": "Succession de push, apply et drop spécifique",
        "stdin": "cas:2",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"Fix CSS\"\nSTASH_OP action=push result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=apply result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=drop result=OK current_size=1 top=\"Fix CSS\""
      },
      {
        "label": "Drop avec index hors limites",
        "stdin": "cas:3",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"Seul élément\"\nSTASH_OP action=drop result=INDEX_OUT_OF_BOUNDS current_size=1 top=\"Seul élément\""
      }
    ],
    "solution": "[Exemple]\nSTASH_OP action=push result=OK current_size=1 top=\"WIP sur formulaire\"\nSTASH_OP action=pop result=OK current_size=0 top=\"EMPTY\"\n\n[Cas 1 — Dépilement sur une pile vide]\nSTASH_OP action=pop result=STACK_EMPTY current_size=0 top=\"EMPTY\"\n\n[Cas 2 — Succession de push, apply et drop spécifique]\nSTASH_OP action=push result=OK current_size=1 top=\"Fix CSS\"\nSTASH_OP action=push result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=apply result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=drop result=OK current_size=1 top=\"Fix CSS\"\n\n[Cas 3 — Drop avec index hors limites]\nSTASH_OP action=push result=OK current_size=1 top=\"Seul élément\"\nSTASH_OP action=drop result=INDEX_OUT_OF_BOUNDS current_size=1 top=\"Seul élément\""
  },
  {
    "id": "gh3-c4-e1",
    "chapter": 4,
    "title": "Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)",
    "level": "n1",
    "language": "analyse",
    "goal": "Auditer la création d’une branche et ses opérations selon les règles de gouvernance de Git Flow ou GitHub Flow.",
    "brief": "<p>En entreprise, la gestion des branches doit suivre des règles strictes pour garantir la stabilité de la production :<br><br>\nRègles du modèle <strong>GIT_FLOW</strong> :<br>\n- Les branches <code>feature/*</code> doivent obligatoirement être créées à partir de <code>develop</code>.<br>\n- Les branches <code>release/*</code> doivent partir de <code>develop</code>.<br>\n- Les branches <code>hotfix/*</code> doivent partir de <code>main</code>.<br>\n- Tout push direct (<code>direct_push=OUI</code>) sur <code>main</code> ou <code>develop</code> est formellement interdit (<code>VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH</code>).<br><br>\nRègles du modèle <strong>GITHUB_FLOW</strong> :<br>\n- Toutes les branches de fonctionnalités/correctifs partent de <code>main</code>.<br>\n- Tout push direct sur <code>main</code> est interdit.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque ligne, afficher :<br>\n<code>AUDIT branch={branch} status={CONFORME | motif_violation}</code></p>",
    "starter": "# Grille d'analyse (gh3-c4-e1) — Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Push direct proscrit sur branche protégée]\n# Données : BRANCH_EVENT wf=GIT_FLOW branch=main base=main direct_push=OUI\n# Données : BRANCH_EVENT wf=GITHUB_FLOW branch=main base=main direct_push=OUI\nA_COMPLETER\n\n[Cas 2 — Conformité hotfix et release dans Git Flow]\n# Données : BRANCH_EVENT wf=GIT_FLOW branch=hotfix/patch-1 base=main direct_push=NON\n# Données : BRANCH_EVENT wf=GIT_FLOW branch=hotfix/patch-2 base=develop direct_push=NON\n# Données : BRANCH_EVENT wf=GIT_FLOW branch=release/v1.0 base=develop direct_push=NON\nA_COMPLETER\n\n[Cas 3 — GitHub Flow avec branche dérivée de main]\n# Données : BRANCH_EVENT wf=GITHUB_FLOW branch=feat-login base=main direct_push=NON\n# Données : BRANCH_EVENT wf=GITHUB_FLOW branch=feat-login base=develop direct_push=NON\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "AUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\nAUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH"
      },
      {
        "label": "Conformité hotfix et release dans Git Flow",
        "stdin": "cas:2",
        "expected": "AUDIT branch=hotfix/patch-1 status=CONFORME\nAUDIT branch=hotfix/patch-2 status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN\nAUDIT branch=release/v1.0 status=CONFORME"
      },
      {
        "label": "GitHub Flow avec branche dérivée de main",
        "stdin": "cas:3",
        "expected": "AUDIT branch=feat-login status=CONFORME\nAUDIT branch=feat-login status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN"
      }
    ],
    "solution": "[Exemple]\nAUDIT branch=feature/auth status=CONFORME\nAUDIT branch=feature/auth status=BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP\n\n[Cas 1 — Push direct proscrit sur branche protégée]\nAUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\nAUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\n\n[Cas 2 — Conformité hotfix et release dans Git Flow]\nAUDIT branch=hotfix/patch-1 status=CONFORME\nAUDIT branch=hotfix/patch-2 status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN\nAUDIT branch=release/v1.0 status=CONFORME\n\n[Cas 3 — GitHub Flow avec branche dérivée de main]\nAUDIT branch=feat-login status=CONFORME\nAUDIT branch=feat-login status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN"
  },
  {
    "id": "gh3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de règles de protection de branches (Branch Protection Rules)",
    "level": "n2",
    "language": "analyse",
    "goal": "Appliquer les critères de fusion de Pull Request (approbations requises, statuts CI, signature GPG).",
    "brief": "<p>Sur GitHub Enterprise, les branches de production sont verrouillées par des <strong>Branch Protection Rules</strong>.<br><br>\nCritères nécessaires pour autoriser la fusion (Merge) dans <code>main</code> :<br>\n1. <code>approvals &gt;= min_approvals</code> (nombre d'approbations de relecteurs humains requises, ex: 2).<br>\n2. <code>ci_status == 'PASS'</code> (les pipelines d'intégration continue doivent impérativement être au vert).<br>\n3. Si <code>require_signed == 'OUI'</code> : le commit doit obligatoirement être signé cryptographiquement (<code>gpg_signed == 'OUI'</code>).<br>\n4. Si <code>linear_history == 'OUI'</code> : le type de merge demandé ne doit pas être <code>MERGE_COMMIT</code> (doit être <code>SQUASH</code> ou <code>REBASE</code>).<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nPour chaque PR, afficher :<br>\n<code>PR_MERGE pr={id} status={AUTHORIZED|BLOCKED} reason={OK|motif_du_premier_blocage}</code></p>",
    "starter": "# Grille d'analyse (gh3-c4-e2) — Contrôleur de règles de protection de branches (Branch Protection Rules)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet pour approbations insuffisantes ou CI en échec]\n# Données : CONFIG min_approvals=2 require_signed=NON linear_history=NON\n# Données : MERGE_REQ pr=10 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT\n# Données : MERGE_REQ pr=11 approvals=2 ci_status=FAIL gpg_signed=NON merge_type=MERGE_COMMIT\nA_COMPLETER\n\n[Cas 2 — Rejet pour signature GPG manquante]\n# Données : CONFIG min_approvals=1 require_signed=OUI linear_history=NON\n# Données : MERGE_REQ pr=20 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT\nA_COMPLETER\n\n[Cas 3 — Rejet pour merge commit sur branche à historique linéaire strict]\n# Données : CONFIG min_approvals=1 require_signed=NON linear_history=OUI\n# Données : MERGE_REQ pr=30 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT\n# Données : MERGE_REQ pr=31 approvals=1 ci_status=PASS gpg_signed=NON merge_type=REBASE\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "PR_MERGE pr=10 status=BLOCKED reason=APPROVALS_INSUFFISANTS\nPR_MERGE pr=11 status=BLOCKED reason=CI_CHECKS_FAILED"
      },
      {
        "label": "Rejet pour signature GPG manquante",
        "stdin": "cas:2",
        "expected": "PR_MERGE pr=20 status=BLOCKED reason=SIGNATURE_GPG_REQUISE"
      },
      {
        "label": "Rejet pour merge commit sur branche à historique linéaire strict",
        "stdin": "cas:3",
        "expected": "PR_MERGE pr=30 status=BLOCKED reason=HISTORIQUE_LINEAIRE_EXIGE\nPR_MERGE pr=31 status=AUTHORIZED reason=OK"
      }
    ],
    "solution": "[Exemple]\nPR_MERGE pr=42 status=AUTHORIZED reason=OK\n\n[Cas 1 — Rejet pour approbations insuffisantes ou CI en échec]\nPR_MERGE pr=10 status=BLOCKED reason=APPROVALS_INSUFFISANTS\nPR_MERGE pr=11 status=BLOCKED reason=CI_CHECKS_FAILED\n\n[Cas 2 — Rejet pour signature GPG manquante]\nPR_MERGE pr=20 status=BLOCKED reason=SIGNATURE_GPG_REQUISE\n\n[Cas 3 — Rejet pour merge commit sur branche à historique linéaire strict]\nPR_MERGE pr=30 status=BLOCKED reason=HISTORIQUE_LINEAIRE_EXIGE\nPR_MERGE pr=31 status=AUTHORIZED reason=OK"
  },
  {
    "id": "gh3-c4-e3",
    "chapter": 4,
    "title": "Analyseur sémantique de commits selon Conventional Commits",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la conformité des messages de commit selon la spécification formelle Conventional Commits 1.0.0.",
    "brief": "<p>La norme <strong>Conventional Commits</strong> structure les messages pour automatiser le versionnage sémantique (SemVer) et la génération de CHANGELOG.<br><br>\nFormat standard :<br>\n<code>&lt;type&gt;[scope optionnel][!]: &lt;description&gt;</code><br><br>\nRègles de validation :<br>\n1. <code>type</code> doit appartenir à la liste autorisée : <code>feat, fix, docs, refactor, test, chore, perf, ci</code>.<br>\n2. Le <code>scope</code> (si présent) doit être entouré de parenthèses : ex: <code>feat(api): ...</code>.<br>\n3. Le caractère <code>!</code> avant le deux-points ou la présence de <code>BREAKING CHANGE</code> dans le message indique une rupture de compatibilité (<code>BREAKING=OUI</code>).<br>\n4. Le séparateur obligatoire est deux-points suivi d'un espace <code>\": \"</code>.<br>\n5. La <code>description</code> ne doit pas être vide.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque message, afficher :<br>\n- Si conforme : <code>CONVENTIONAL_AUDIT id={id} valid=OUI type={type} scope={scope|NONE} breaking={OUI|NON}</code><br>\n- Si non conforme : <code>CONVENTIONAL_AUDIT id={id} valid=NON error={TYPE_INCONNU|FORMAT_INVALIDE|DESCRIPTION_VIDE}</code></p>",
    "starter": "# Grille d'analyse (gh3-c4-e3) — Analyseur sémantique de commits selon Conventional Commits\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Message sans scope et type inconnu]\n# Données : COMMIT_MSG id=10 msg=docs: mise a jour du README\n# Données : COMMIT_MSG id=11 msg=update: modifications diverses\nA_COMPLETER\n\n[Cas 2 — Format invalide sans espace après deux-points ou sans séparateur]\n# Données : COMMIT_MSG id=20 msg=feat:nospace\n# Données : COMMIT_MSG id=21 msg=juste un message sans type\nA_COMPLETER\n\n[Cas 3 — Breaking change via mention textuelle BREAKING CHANGE]\n# Données : COMMIT_MSG id=30 msg=refactor(core): refonte complete du routeur BREAKING CHANGE\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "CONVENTIONAL_AUDIT id=10 valid=OUI type=docs scope=NONE breaking=NON\nCONVENTIONAL_AUDIT id=11 valid=NON error=TYPE_INCONNU"
      },
      {
        "label": "Format invalide sans espace après deux-points ou sans séparateur",
        "stdin": "cas:2",
        "expected": "CONVENTIONAL_AUDIT id=20 valid=NON error=FORMAT_INVALIDE\nCONVENTIONAL_AUDIT id=21 valid=NON error=FORMAT_INVALIDE"
      },
      {
        "label": "Breaking change via mention textuelle BREAKING CHANGE",
        "stdin": "cas:3",
        "expected": "CONVENTIONAL_AUDIT id=30 valid=OUI type=refactor scope=core breaking=OUI"
      }
    ],
    "solution": "[Exemple]\nCONVENTIONAL_AUDIT id=1 valid=OUI type=feat scope=auth breaking=NON\nCONVENTIONAL_AUDIT id=2 valid=OUI type=fix scope=NONE breaking=OUI\n\n[Cas 1 — Message sans scope et type inconnu]\nCONVENTIONAL_AUDIT id=10 valid=OUI type=docs scope=NONE breaking=NON\nCONVENTIONAL_AUDIT id=11 valid=NON error=TYPE_INCONNU\n\n[Cas 2 — Format invalide sans espace après deux-points ou sans séparateur]\nCONVENTIONAL_AUDIT id=20 valid=NON error=FORMAT_INVALIDE\nCONVENTIONAL_AUDIT id=21 valid=NON error=FORMAT_INVALIDE\n\n[Cas 3 — Breaking change via mention textuelle BREAKING CHANGE]\nCONVENTIONAL_AUDIT id=30 valid=OUI type=refactor scope=core breaking=OUI"
  },
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
  },
  {
    "id": "gh3-c6-e1",
    "chapter": 6,
    "title": "Simulateur de Git LFS (Large File Storage) et génération de pointeurs",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer si un fichier doit être géré par Git LFS et générer le pointeur texte officiel.",
    "brief": "<p>Git n'est pas conçu pour stocker de volumineux fichiers binaires : chaque modification duplique l'intégralité du fichier dans <code>.git/objects/</code>, gonflant démesurément la taille du clone.<br><br>\n<strong>Git LFS (Large File Storage)</strong> remplace le fichier lourd dans le commit par un minuscule fichier texte de 130 octets appelé <strong>pointeur LFS</strong>, tandis que le contenu réel est stocké sur un serveur d'objets distant (S3/Azure Blob).<br><br>\nSpécification officielle du pointeur LFS (v1) :<br>\n<code>version https://git-lfs.github.com/spec/v1\\noid sha256:{sha256_du_binaire}\\nsize {taille_octets}</code><br><br>\nCritères d'éligibilité LFS :<br>\n- Si l'extension figure dans les extensions surveillées (ex: <code>.iso</code>, <code>.psd</code>, <code>.zip</code>, <code>.tar.gz</code>, <code>.mp4</code>) OU si <code>size_bytes &gt;= 104857600</code> (100 Mo) :<br>\n  Le fichier doit être géré par LFS (<code>MODE=LFS_POINTER</code>).<br>\n- Sinon : le fichier est stocké sous forme de blob Git standard (<code>MODE=GIT_BLOB</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque fichier, afficher :<br>\n- Si LFS :<br>\n  <code>LFS_DECISION file=\"{path}\" mode=LFS_POINTER oid=\"{sha256}\" size={size_bytes}</code><br>\n- Si Git standard :<br>\n  <code>LFS_DECISION file=\"{path}\" mode=GIT_BLOB</code></p>",
    "starter": "# Grille d'analyse (gh3-c6-e1) — Simulateur de Git LFS (Large File Storage) et génération de pointeurs\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fichier non LFS dépassant 100 Mo]\n# Données : FILE path=data/raw_dataset.bin size_bytes=150000000 sha256=112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00\nA_COMPLETER\n\n[Cas 2 — Fichiers graphiques et archives éligibles]\n# Données : FILE path=design/mockup.psd size_bytes=15000000 sha256=aaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999\n# Données : FILE path=backups/site.tar.gz size_bytes=20000000 sha256=bbbbccccddddeeeeffff0000111122223333444455556666777788889999aaaa\nA_COMPLETER\n\n[Cas 3 — Fichier léger sans extension spéciale]\n# Données : FILE path=README.md size_bytes=1200 sha256=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "LFS_DECISION file=\"data/raw_dataset.bin\" mode=LFS_POINTER oid=\"112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00\" size=150000000"
      },
      {
        "label": "Fichiers graphiques et archives éligibles",
        "stdin": "cas:2",
        "expected": "LFS_DECISION file=\"design/mockup.psd\" mode=LFS_POINTER oid=\"aaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999\" size=15000000\nLFS_DECISION file=\"backups/site.tar.gz\" mode=LFS_POINTER oid=\"bbbbccccddddeeeeffff0000111122223333444455556666777788889999aaaa\" size=20000000"
      },
      {
        "label": "Fichier léger sans extension spéciale",
        "stdin": "cas:3",
        "expected": "LFS_DECISION file=\"README.md\" mode=GIT_BLOB"
      }
    ],
    "solution": "[Exemple]\nLFS_DECISION file=\"videos/intro.mp4\" mode=LFS_POINTER oid=\"abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890\" size=52428800\nLFS_DECISION file=\"src/main.py\" mode=GIT_BLOB\n\n[Cas 1 — Fichier non LFS dépassant 100 Mo]\nLFS_DECISION file=\"data/raw_dataset.bin\" mode=LFS_POINTER oid=\"112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00\" size=150000000\n\n[Cas 2 — Fichiers graphiques et archives éligibles]\nLFS_DECISION file=\"design/mockup.psd\" mode=LFS_POINTER oid=\"aaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999\" size=15000000\nLFS_DECISION file=\"backups/site.tar.gz\" mode=LFS_POINTER oid=\"bbbbccccddddeeeeffff0000111122223333444455556666777788889999aaaa\" size=20000000\n\n[Cas 3 — Fichier léger sans extension spéciale]\nLFS_DECISION file=\"README.md\" mode=GIT_BLOB"
  },
  {
    "id": "gh3-c6-e2",
    "chapter": 6,
    "title": "Validateur de Hook Git pre-commit (Détection de secrets & conflits)",
    "level": "n2",
    "language": "analyse",
    "goal": "Intercepter avant l’enregistrement du commit les clés de sécurité codées en dur et les résidus de conflits.",
    "brief": "<p>Le hook côté client <code>.git/hooks/pre-commit</code> s'exécute localement avant la validation d'un commit. S'il renvoie un code de sortie différent de 0, le commit est avorté.<br><br>\nRègles de sécurité inspectées dans le contenu des fichiers indexés (Staged) :<br>\n1. <strong>Résidus de conflit de fusion</strong> : présence de <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> ou <code>=======</code> ou <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>.<br>\n   -> <code>COMMIT_REJECTED reason=MERGE_CONFLICT_MARKERS</code>.<br>\n2. <strong>Clé d'API AWS codée en dur</strong> : motif commençant par <code>AKIA</code> suivi d'au moins 16 caractères alphanumériques majuscules.<br>\n   -> <code>COMMIT_REJECTED reason=HARDCODED_AWS_KEY</code>.<br>\n3. <strong>Jeton d'accès GitHub personnel</strong> : motif commençant par <code>ghp_</code> suivi d'au moins 20 caractères alphanumériques.<br>\n   -> <code>COMMIT_REJECTED reason=HARDCODED_GITHUB_TOKEN</code>.<br>\n4. Sinon : fichier sain.<br>\n   -> <code>COMMIT_ACCEPTED reason=CLEAN</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque fichier, afficher :<br>\n<code>HOOK_RESULT file=\"{file}\" verdict={COMMIT_ACCEPTED|COMMIT_REJECTED} reason={reason}</code></p>",
    "starter": "# Grille d'analyse (gh3-c6-e2) — Validateur de Hook Git pre-commit (Détection de secrets & conflits)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Marqueurs de conflit non résolus]\n# Données : INSPECT_FILE file=routes.js content=<<<<<<< HEAD\\nconst v = 1;\\n=======\nA_COMPLETER\n\n[Cas 2 — Jeton GitHub personnel détecté]\n# Données : INSPECT_FILE file=.env content=GITHUB_PAT=ghp_1234567890abcdefghijklmnopqrstuvwxyz\nA_COMPLETER\n\n[Cas 3 — Code complexe propre et commenté]\n# Données : INSPECT_FILE file=service.py content=def process():\\n    # Standard process without secrets\\n    return True\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "HOOK_RESULT file=\"routes.js\" verdict=COMMIT_REJECTED reason=MERGE_CONFLICT_MARKERS"
      },
      {
        "label": "Jeton GitHub personnel détecté",
        "stdin": "cas:2",
        "expected": "HOOK_RESULT file=\".env\" verdict=COMMIT_REJECTED reason=HARDCODED_GITHUB_TOKEN"
      },
      {
        "label": "Code complexe propre et commenté",
        "stdin": "cas:3",
        "expected": "HOOK_RESULT file=\"service.py\" verdict=COMMIT_ACCEPTED reason=CLEAN"
      }
    ],
    "solution": "[Exemple]\nHOOK_RESULT file=\"app.py\" verdict=COMMIT_REJECTED reason=HARDCODED_AWS_KEY\nHOOK_RESULT file=\"main.py\" verdict=COMMIT_ACCEPTED reason=CLEAN\n\n[Cas 1 — Marqueurs de conflit non résolus]\nHOOK_RESULT file=\"routes.js\" verdict=COMMIT_REJECTED reason=MERGE_CONFLICT_MARKERS\n\n[Cas 2 — Jeton GitHub personnel détecté]\nHOOK_RESULT file=\".env\" verdict=COMMIT_REJECTED reason=HARDCODED_GITHUB_TOKEN\n\n[Cas 3 — Code complexe propre et commenté]\nHOOK_RESULT file=\"service.py\" verdict=COMMIT_ACCEPTED reason=CLEAN"
  },
  {
    "id": "gh3-c6-e3",
    "chapter": 6,
    "title": "Purge médico-légale de secrets dans l’historique (git-filter-repo)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler la réécriture d’un historique Git pour expurger un fichier confidentiel commité par erreur.",
    "brief": "<p>Supprimer un fichier sensible dans un commit récent ne suffit pas : le secret reste accessible dans les commits antérieurs de l’historique. L’outil officiel <strong>git-filter-repo</strong> permet de purger le fichier de tous les commits passés et recalcule les nouveaux hachages SHA-1 en cascade.<br><br>\nSpécification :<br>\nAnalysez les données fournies pour chaque cas...&gt; parents=&lt;p|NONE&gt;</code><br>\nPuis la commande d'expurgation :<br>\n<code>PURGE_FILE target=&lt;nom_du_fichier_a_supprimer&gt;</code>.<br><br>\nRègles :<br>\n1. Chaque commit contenant le fichier cible est <strong>impacté</strong> : le fichier est retiré de sa liste.<br>\n2. Tout commit impacté ou dont l'un des parents a été réécrit voit son hash modifié : <code>new_hash = f\"r_{ancien_hash}\"</code>.<br>\n3. Les commits non impactés et dont les parents sont inchangés conservent leur hash d'origine.<br><br>\nSortie attendue :<br>\n<code>PURGE_RESULT target=\"{fichier}\" impacted_count={n} new_tip_hash=\"{nouveau_hash_de_tete}\"</code><br>\nPuis pour chaque commit réécrit :<br>\n<code>REWRITTEN_COMMIT old=\"{old_hash}\" new=\"{new_hash}\" remaining_files=[{liste_fichiers}]</code></p>",
    "starter": "# Grille d'analyse (gh3-c6-e3) — Purge médico-légale de secrets dans l’historique (git-filter-repo)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fichier cible non présent dans l’historique]\n# Données : COMMIT id=A1 files=index.html parents=NONE\n# Données : COMMIT id=A2 files=styles.css parents=A1\n# Données : PURGE_FILE target=secrets.json\nA_COMPLETER\n\n[Cas 2 — Fichier sensible introduit dans le dernier commit uniquement]\n# Données : COMMIT id=10 files=README.md parents=NONE\n# Données : COMMIT id=20 files=app.py,id_rsa parents=10\n# Données : PURGE_FILE target=id_rsa\nA_COMPLETER\n\n[Cas 3 — Trois commits avec propagation complète]\n# Données : COMMIT id=X1 files=a.txt,leak.key parents=NONE\n# Données : COMMIT id=X2 files=b.txt parents=X1\n# Données : COMMIT id=X3 files=c.txt parents=X2\n# Données : PURGE_FILE target=leak.key\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "PURGE_RESULT target=\"secrets.json\" impacted_count=0 new_tip_hash=\"A2\""
      },
      {
        "label": "Fichier sensible introduit dans le dernier commit uniquement",
        "stdin": "cas:2",
        "expected": "PURGE_RESULT target=\"id_rsa\" impacted_count=1 new_tip_hash=\"r_20\"\nREWRITTEN_COMMIT old=\"20\" new=\"r_20\" remaining_files=[app.py]"
      },
      {
        "label": "Trois commits avec propagation complète",
        "stdin": "cas:3",
        "expected": "PURGE_RESULT target=\"leak.key\" impacted_count=3 new_tip_hash=\"r_X3\"\nREWRITTEN_COMMIT old=\"X1\" new=\"r_X1\" remaining_files=[a.txt]\nREWRITTEN_COMMIT old=\"X2\" new=\"r_X2\" remaining_files=[b.txt]\nREWRITTEN_COMMIT old=\"X3\" new=\"r_X3\" remaining_files=[c.txt]"
      }
    ],
    "solution": "[Exemple]\nPURGE_RESULT target=\".env\" impacted_count=2 new_tip_hash=\"r_C2\"\nREWRITTEN_COMMIT old=\"C1\" new=\"r_C1\" remaining_files=[main.py]\nREWRITTEN_COMMIT old=\"C2\" new=\"r_C2\" remaining_files=[main.py]\n\n[Cas 1 — Fichier cible non présent dans l’historique]\nPURGE_RESULT target=\"secrets.json\" impacted_count=0 new_tip_hash=\"A2\"\n\n[Cas 2 — Fichier sensible introduit dans le dernier commit uniquement]\nPURGE_RESULT target=\"id_rsa\" impacted_count=1 new_tip_hash=\"r_20\"\nREWRITTEN_COMMIT old=\"20\" new=\"r_20\" remaining_files=[app.py]\n\n[Cas 3 — Trois commits avec propagation complète]\nPURGE_RESULT target=\"leak.key\" impacted_count=3 new_tip_hash=\"r_X3\"\nREWRITTEN_COMMIT old=\"X1\" new=\"r_X1\" remaining_files=[a.txt]\nREWRITTEN_COMMIT old=\"X2\" new=\"r_X2\" remaining_files=[b.txt]\nREWRITTEN_COMMIT old=\"X3\" new=\"r_X3\" remaining_files=[c.txt]"
  }
];
