/**
 * Exercices Chapitre 1 — Git & GitHub B3.
 * Modèle Interne des Objets & Plomberie Git (Git Internals).
 */
'use strict';

module.exports = [
  {
    id: 'gh3-c1-e1',
    chapter: 1,
    title: 'Calculateur de hachage SHA-1 d’objet Git (Plomberie git hash-object)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le hash SHA-1 exact d’un objet Git selon le formatage canonique interne du stockage objet.',
    brief: `<p>En interne, Git stocke tous les contenus dans sa base de données orientée objets (<code>.git/objects/</code>) adressée par le contenu (Content-Addressable Storage).<br><br>
Pour calculer l'empreinte SHA-1 d'un objet (équivalent de la commande de plomberie <code>git hash-object</code>), Git préfixe le contenu brut avec une chaîne d'en-tête standard suivie d'un octet nul <code>\\0</code> :<br>
<code>en-tete = f"{type_objet} {taille_octets}\\0"</code><br>
Puis il calcule le condensat SHA-1 (40 caractères hexadécimaux en minuscules) de la concaténation de l'en-tête et du contenu.<br><br>
Le script lit sur l'entrée standard des descriptions d'objets au format :<br>
<code>OBJECT type=&lt;blob|commit|tree|tag&gt; content=&lt;texte_du_contenu&gt;</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>GIT_HASH type={type} size={taille} sha1={hash_hex}</code></p>`,
    starter: `import sys
import hashlib

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : formater l'objet avec son en-tête et calculer le hachage SHA-1
`,
    hints: [
      'L’en-tête Git s’écrit f"{obj_type} {len(content_bytes)}\\0".',
      'Encoder l’en-tête et le contenu en UTF-8 avant de passer à hashlib.sha1().'
    ],
    examples: [
      {
        stdin: 'OBJECT type=blob content=hello world\n',
        expected: 'GIT_HASH type=blob size=11 sha1=95d09f2b10159347eece71399a7e2e907ea3df4f',
        note: 'Blob Git contenant "hello world" (11 octets) dont le sha1 canonique avec en-tête est 95d09f2b...'
      }
    ],
    tests: [
      {
        label: 'Blob avec texte standard sans saut de ligne final',
        stdin: 'OBJECT type=blob content=Architecture logicielle B3',
        expected: 'GIT_HASH type=blob size=26 sha1=66de79ad6131ce0ff05c1f2e2e472f4aa09ada42'
      },
      {
        label: 'Commit fictif et tag annoté',
        stdin: 'OBJECT type=commit content=tree a1b2c3d4e5\\nauthor Alice\\n\\nInitial commit\nOBJECT type=tag content=object 123456\\ntype commit\\ntag v1.0.0',
        expected: 'GIT_HASH type=commit size=44 sha1=f047280709dd0cdbd55636aaf175a99417d126f5\nGIT_HASH type=tag size=36 sha1=eb37da38f647b9f1e0b95707850348933acc5a02'
      },
      {
        label: 'Objet avec contenu vide',
        stdin: 'OBJECT type=blob content=',
        expected: 'GIT_HASH type=blob size=0 sha1=e69de29bb2d1d6434b8b29ae775ad8c2e48c5391'
      }
    ],
    solution: `import sys
import re
import hashlib

# Lire les lignes brutes (sans strip() pour préserver les retours chariot dans le contenu)
input_data = sys.stdin.read()
# On itère sur les lignes de commande débutant par OBJECT
lines = input_data.splitlines()

for lig in lines:
    if not lig.strip().startswith('OBJECT'):
        continue
    # Extraire type et content
    m = re.match(r'OBJECT\\s+type=([^\\s]+)\\s+content=(.*)', lig)
    if not m:
        continue
    obj_type = m.group(1)
    # Dé-échapper les \\n éventuels dans le payload
    raw_content = m.group(2).replace('\\\\n', '\\n')
    content_bytes = raw_content.encode('utf-8')
    size = len(content_bytes)
    
    header = f"{obj_type} {size}\\0".encode('utf-8')
    full_data = header + content_bytes
    
    sha1 = hashlib.sha1(full_data).hexdigest()
    print(f"GIT_HASH type={obj_type} size={size} sha1={sha1}")
`
  },
  {
    id: 'gh3-c1-e2',
    chapter: 1,
    title: 'Parseur d’arbre Git et inspection de hiérarchie (git ls-tree)',
    level: 'n2',
    language: 'python',
    goal: 'Analyser les entrées d’un objet Tree Git et afficher l’inventaire des blobs et sous-arbres avec leur mode.',
    brief: `<p>Un objet <strong>Tree</strong> dans Git modélise un répertoire. Il contient une suite ordonnée d'entrées représentant les fichiers (blobs) et les sous-répertoires (trees).<br><br>
Chaque entrée comporte :<br>
- Un mode UNIX à 6 chiffres :<br>
  - <code>100644</code> : fichier texte / données normal (non exécutable)<br>
  - <code>100755</code> : script / binaire exécutable<br>
  - <code>040000</code> : sous-répertoire (Tree)<br>
  - <code>120000</code> : lien symbolique (symlink)<br>
- Le type de l'objet lié (<code>blob</code> pour les fichiers, <code>tree</code> pour les répertoires).<br>
- L'identifiant SHA-1 de l'objet (40 caractères hexadécimaux).<br>
- Le nom du fichier ou dossier.<br><br>
Le script lit sur l'entrée standard des entrées de Tree au format :<br>
<code>ENTRY mode=&lt;mode&gt; type=&lt;blob|tree&gt; sha1=&lt;hash&gt; name=&lt;nom&gt;</code>.<br><br>
Le script doit afficher les entrées triées par ordre alphabétique du nom de fichier au format standard <code>git ls-tree</code> :<br>
<code>{mode} {type} {sha1}\\t{name}</code><br>
Puis un récapitulatif :<br>
<code>TREE_SUMMARY total={n} blobs={nb_blobs} subtrees={nb_trees} executables={nb_exec}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : trier et afficher les entrées de l'objet Tree
`,
    hints: [
      'Extraire chaque champ avec une regex ou découpage de chaîne.',
      'Trier la liste des entrées sur la clé name.',
      'Compter les exécutables dont le mode vaut 100755.'
    ],
    examples: [
      {
        stdin: 'ENTRY mode=100644 type=blob sha1=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2 name=README.md\nENTRY mode=040000 type=tree sha1=b1c2d3e4f5a6b1c2d3e4f5a6b1c2d3e4f5a6b1c2 name=src',
        expected: '100644 blob a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2\tREADME.md\n040000 tree b1c2d3e4f5a6b1c2d3e4f5a6b1c2d3e4f5a6b1c2\tsrc\nTREE_SUMMARY total=2 blobs=1 subtrees=1 executables=0',
        note: 'Un fichier README et un sous-dossier src.'
      }
    ],
    tests: [
      {
        label: 'Tree avec script exécutable et plusieurs fichiers',
        stdin: 'ENTRY mode=100755 type=blob sha1=111122223333444455556666777788889999aaaa name=deploy.sh\nENTRY mode=100644 type=blob sha1=bbbbccccddddeeeeffff00001111222233334444 name=config.json\nENTRY mode=040000 type=tree sha1=55556666777788889999aaaabbbbccccddddeeee name=assets',
        expected: '040000 tree 55556666777788889999aaaabbbbccccddddeeee\tassets\n100644 blob bbbbccccddddeeeeffff00001111222233334444\tconfig.json\n100755 blob 111122223333444455556666777788889999aaaa\tdeploy.sh\nTREE_SUMMARY total=3 blobs=2 subtrees=1 executables=1'
      },
      {
        label: 'Tree vide',
        stdin: '',
        expected: 'TREE_SUMMARY total=0 blobs=0 subtrees=0 executables=0'
      },
      {
        label: 'Multiples exécutables et lien symbolique',
        stdin: 'ENTRY mode=100755 type=blob sha1=aaa111bbb222ccc333ddd444eee555fff666aa11 name=run.py\nENTRY mode=100755 type=blob sha1=bbb222ccc333ddd444eee555fff666aaa111bbb22 name=build.sh\nENTRY mode=120000 type=blob sha1=ccc333ddd444eee555fff666aaa111bbb222ccc33 name=latest.link',
        expected: '100755 blob bbb222ccc333ddd444eee555fff666aaa111bbb22\tbuild.sh\n120000 blob ccc333ddd444eee555fff666aaa111bbb222ccc33\tlatest.link\n100755 blob aaa111bbb222ccc333ddd444eee555fff666aa11\trun.py\nTREE_SUMMARY total=3 blobs=3 subtrees=0 executables=2'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

entries = []
for lig in lignes:
    m = re.search(r'mode=([^\\s]+)\\s+type=([^\\s]+)\\s+sha1=([^\\s]+)\\s+name=([^\\s]+)', lig)
    if m:
        mode, otype, sha1, name = m.groups()
        entries.append({
            'mode': mode,
            'type': otype,
            'sha1': sha1,
            'name': name
        })

# Trier par ordre alphabétique du nom
entries.sort(key=lambda e: e['name'])

nb_blobs = 0
nb_trees = 0
nb_exec = 0

for e in entries:
    if e['type'] == 'blob':
        nb_blobs += 1
    elif e['type'] == 'tree':
        nb_trees += 1
    if e['mode'] == '100755':
        nb_exec += 1
    print(f"{e['mode']} {e['type']} {e['sha1']}\\t{e['name']}")

print(f"TREE_SUMMARY total={len(entries)} blobs={nb_blobs} subtrees={nb_trees} executables={nb_exec}")
`
  },
  {
    id: 'gh3-c1-e3',
    chapter: 1,
    title: 'Résolveur de références symboliques & pointeur HEAD (git rev-parse)',
    level: 'n3',
    language: 'python',
    goal: 'Résoudre la chaîne de pointeurs de références de Git pour déterminer le commit actif pointé par HEAD.',
    brief: `<p>Dans Git, <code>HEAD</code> est une référence symbolique qui pointe généralement vers une branche locale (ex: <code>ref: refs/heads/main</code>), qui elle-même contient le hash du dernier commit de cette branche.<br><br>
Si un développeur effectue un checkout directement sur un commit ou un tag, <code>HEAD</code> contient directement le hash : le dépôt est alors en <strong>HEAD détachée (Detached HEAD)</strong>.<br><br>
Le script lit sur l'entrée standard :<br>
1. Des définitions de références :<br>
   <code>REF name=&lt;nom&gt; target=&lt;hash|ref: autre_ref&gt;</code>.<br>
2. Des requêtes de résolution :<br>
   <code>RESOLVE name=&lt;ref_a_resoudre&gt;</code>.<br><br>
Pour chaque requête, le script suit la chaîne de déréférencement jusqu'au hash SHA-1 final (en détectant si HEAD pointe sur une branche ou est détachée) :<br>
- Si la chaîne aboutit à un commit :<br>
  <code>RESOLVED name={name} commit={hash} state={BRANCH_REF|DETACHED_HEAD} path={chaine_de_refs}</code><br>
- Si la référence n'existe pas :<br>
  <code>RESOLVED name={name} status=NOT_FOUND</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : déréférencer les pointeurs Git
`,
    hints: [
      'Stocker les refs dans un dictionnaire.',
      'Suivre les cibles commençant par "ref: " en boucle jusqu’à obtenir un hash.'
    ],
    examples: [
      {
        stdin: 'REF name=refs/heads/main target=c0ffee1234567890abcdef1234567890abcdef12\nREF name=HEAD target=ref: refs/heads/main\nRESOLVE name=HEAD',
        expected: 'RESOLVED name=HEAD commit=c0ffee1234567890abcdef1234567890abcdef12 state=BRANCH_REF path=HEAD -> refs/heads/main',
        note: 'HEAD pointe sur la branche main qui pointe sur le commit.'
      }
    ],
    tests: [
      {
        label: 'HEAD détachée pointant directement sur un commit',
        stdin: 'REF name=HEAD target=9876543210abcdef9876543210abcdef98765432\nRESOLVE name=HEAD',
        expected: 'RESOLVED name=HEAD commit=9876543210abcdef9876543210abcdef98765432 state=DETACHED_HEAD path=HEAD'
      },
      {
        label: 'Chaîne de références avec branche intermédiaire et ref introuvable',
        stdin: 'REF name=refs/heads/feature target=aabbccddeeff00112233445566778899aabbccdd\nREF name=HEAD target=ref: refs/heads/feature\nRESOLVE name=HEAD\nRESOLVE name=refs/heads/develop',
        expected: 'RESOLVED name=HEAD commit=aabbccddeeff00112233445566778899aabbccdd state=BRANCH_REF path=HEAD -> refs/heads/feature\nRESOLVED name=refs/heads/develop status=NOT_FOUND'
      },
      {
        label: 'Résolution directe d’un tag de version',
        stdin: 'REF name=refs/tags/v2.0 target=112233445566778899aabbccddeeff0011223344\nRESOLVE name=refs/tags/v2.0',
        expected: 'RESOLVED name=refs/tags/v2.0 commit=112233445566778899aabbccddeeff0011223344 state=BRANCH_REF path=refs/tags/v2.0'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

refs = {}
resolves = []

for lig in lignes:
    if lig.startswith('REF'):
        m = re.search(r'name=([^\\s]+)\\s+target=(.*)', lig)
        if m:
            rname, rtarget = m.groups()
            refs[rname] = rtarget.strip()
    elif lig.startswith('RESOLVE'):
        m = re.search(r'name=([^\\s]+)', lig)
        if m:
            resolves.append(m.group(1))

for q in resolves:
    if q not in refs:
        print(f"RESOLVED name={q} status=NOT_FOUND")
        continue
        
    curr = q
    path_nodes = [curr]
    visited = set()
    
    while curr in refs and refs[curr].startswith('ref: '):
        target_ref = refs[curr][5:].strip()
        path_nodes.append(target_ref)
        if target_ref in visited:
            break
        visited.add(target_ref)
        curr = target_ref
        
    if curr in refs:
        final_val = refs[curr]
        if not final_val.startswith('ref: '):
            if q == 'HEAD' and len(path_nodes) == 1:
                state = 'DETACHED_HEAD'
            else:
                state = 'BRANCH_REF'
            path_str = ' -> '.join(path_nodes)
            print(f"RESOLVED name={q} commit={final_val} state={state} path={path_str}")
        else:
            print(f"RESOLVED name={q} status=NOT_FOUND")
    else:
        print(f"RESOLVED name={q} status=NOT_FOUND")
`
  }
];
