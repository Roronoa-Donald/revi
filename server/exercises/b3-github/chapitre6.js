/**
 * Exercices Chapitre 6 — Git & GitHub B3.
 * Dépôts Complexes, Git LFS, Hooks & Audit de Sécurité.
 */
'use strict';

module.exports = [
  {
    id: 'gh3-c6-e1',
    chapter: 6,
    title: 'Simulateur de Git LFS (Large File Storage) et génération de pointeurs',
    level: 'n1',
    language: 'python',
    goal: 'Déterminer si un fichier doit être géré par Git LFS et générer le pointeur texte officiel.',
    brief: `<p>Git n'est pas conçu pour stocker de volumineux fichiers binaires : chaque modification duplique l'intégralité du fichier dans <code>.git/objects/</code>, gonflant démesurément la taille du clone.<br><br>
<strong>Git LFS (Large File Storage)</strong> remplace le fichier lourd dans le commit par un minuscule fichier texte de 130 octets appelé <strong>pointeur LFS</strong>, tandis que le contenu réel est stocké sur un serveur d'objets distant (S3/Azure Blob).<br><br>
Spécification officielle du pointeur LFS (v1) :<br>
<code>version https://git-lfs.github.com/spec/v1\\noid sha256:{sha256_du_binaire}\\nsize {taille_octets}</code><br><br>
Critères d'éligibilité LFS :<br>
- Si l'extension figure dans les extensions surveillées (ex: <code>.iso</code>, <code>.psd</code>, <code>.zip</code>, <code>.tar.gz</code>, <code>.mp4</code>) OU si <code>size_bytes &gt;= 104857600</code> (100 Mo) :<br>
  Le fichier doit être géré par LFS (<code>MODE=LFS_POINTER</code>).<br>
- Sinon : le fichier est stocké sous forme de blob Git standard (<code>MODE=GIT_BLOB</code>).<br><br>
Le script lit sur l'entrée standard :<br>
<code>FILE path=&lt;chemin&gt; size_bytes=&lt;taille&gt; sha256=&lt;hash_sha256&gt;</code>.<br><br>
Pour chaque fichier, afficher :<br>
- Si LFS :<br>
  <code>LFS_DECISION file="{path}" mode=LFS_POINTER oid="{sha256}" size={size_bytes}</code><br>
- Si Git standard :<br>
  <code>LFS_DECISION file="{path}" mode=GIT_BLOB</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les fichiers LFS et formater la décision
`,
    hints: [
      'Vérifier les extensions éligibles : .iso, .psd, .zip, .tar.gz, .mp4.',
      'Vérifier le seuil de 100 Mo (104857600 octets).'
    ],
    examples: [
      {
        stdin: 'FILE path=videos/intro.mp4 size_bytes=52428800 sha256=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890\nFILE path=src/main.py size_bytes=2048 sha256=00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff',
        expected: 'LFS_DECISION file="videos/intro.mp4" mode=LFS_POINTER oid="abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890" size=52428800\nLFS_DECISION file="src/main.py" mode=GIT_BLOB',
        note: 'Le fichier MP4 est intercepté par LFS, le script Python reste un blob Git standard.'
      }
    ],
    tests: [
      {
        label: 'Fichier non LFS dépassant 100 Mo',
        stdin: 'FILE path=data/raw_dataset.bin size_bytes=150000000 sha256=112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00',
        expected: 'LFS_DECISION file="data/raw_dataset.bin" mode=LFS_POINTER oid="112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00" size=150000000'
      },
      {
        label: 'Fichiers graphiques et archives éligibles',
        stdin: 'FILE path=design/mockup.psd size_bytes=15000000 sha256=aaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999\nFILE path=backups/site.tar.gz size_bytes=20000000 sha256=bbbbccccddddeeeeffff0000111122223333444455556666777788889999aaaa',
        expected: 'LFS_DECISION file="design/mockup.psd" mode=LFS_POINTER oid="aaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999" size=15000000\nLFS_DECISION file="backups/site.tar.gz" mode=LFS_POINTER oid="bbbbccccddddeeeeffff0000111122223333444455556666777788889999aaaa" size=20000000'
      },
      {
        label: 'Fichier léger sans extension spéciale',
        stdin: 'FILE path=README.md size_bytes=1200 sha256=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        expected: 'LFS_DECISION file="README.md" mode=GIT_BLOB'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

LFS_EXTENSIONS = ('.iso', '.psd', '.zip', '.tar.gz', '.mp4')
THRESHOLD_100MB = 104857600

for lig in lignes:
    m = re.search(r'path=([^\\s]+)\\s+size_bytes=([^\\s]+)\\s+sha256=([^\\s]+)', lig)
    if not m:
        continue
    fpath, sbytes_str, sha256 = m.groups()
    sbytes = int(sbytes_str)
    
    is_lfs = any(fpath.endswith(ext) for ext in LFS_EXTENSIONS) or (sbytes >= THRESHOLD_100MB)
    
    if is_lfs:
        print(f'LFS_DECISION file="{fpath}" mode=LFS_POINTER oid="{sha256}" size={sbytes}')
    else:
        print(f'LFS_DECISION file="{fpath}" mode=GIT_BLOB')
`
  },
  {
    id: 'gh3-c6-e2',
    chapter: 6,
    title: 'Validateur de Hook Git pre-commit (Détection de secrets & conflits)',
    level: 'n2',
    language: 'python',
    goal: 'Intercepter avant l’enregistrement du commit les clés de sécurité codées en dur et les résidus de conflits.',
    brief: `<p>Le hook côté client <code>.git/hooks/pre-commit</code> s'exécute localement avant la validation d'un commit. S'il renvoie un code de sortie différent de 0, le commit est avorté.<br><br>
Règles de sécurité inspectées dans le contenu des fichiers indexés (Staged) :<br>
1. <strong>Résidus de conflit de fusion</strong> : présence de <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> ou <code>=======</code> ou <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>.<br>
   -> <code>COMMIT_REJECTED reason=MERGE_CONFLICT_MARKERS</code>.<br>
2. <strong>Clé d'API AWS codée en dur</strong> : motif commençant par <code>AKIA</code> suivi d'au moins 16 caractères alphanumériques majuscules.<br>
   -> <code>COMMIT_REJECTED reason=HARDCODED_AWS_KEY</code>.<br>
3. <strong>Jeton d'accès GitHub personnel</strong> : motif commençant par <code>ghp_</code> suivi d'au moins 20 caractères alphanumériques.<br>
   -> <code>COMMIT_REJECTED reason=HARDCODED_GITHUB_TOKEN</code>.<br>
4. Sinon : fichier sain.<br>
   -> <code>COMMIT_ACCEPTED reason=CLEAN</code>.<br><br>
Le script lit sur l'entrée standard :<br>
<code>INSPECT_FILE file=&lt;nom&gt; content=&lt;contenu_du_fichier&gt;</code>.<br><br>
Pour chaque fichier, afficher :<br>
<code>HOOK_RESULT file="{file}" verdict={COMMIT_ACCEPTED|COMMIT_REJECTED} reason={reason}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler le filtrage pre-commit
`,
    hints: [
      'Tester dans l’ordre : marqueurs de conflits, clés AWS, jetons GitHub.',
      'Utiliser re.search() pour détecter les motifs réguliers.'
    ],
    examples: [
      {
        stdin: 'INSPECT_FILE file=app.py content=AWS_KEY = "AKIAIOSFODNN7EXAMPLE123"\nINSPECT_FILE file=main.py content=print("Hello World")',
        expected: 'HOOK_RESULT file="app.py" verdict=COMMIT_REJECTED reason=HARDCODED_AWS_KEY\nHOOK_RESULT file="main.py" verdict=COMMIT_ACCEPTED reason=CLEAN',
        note: 'La clé AWS bloque le commit, le code sain est accepté.'
      }
    ],
    tests: [
      {
        label: 'Marqueurs de conflit non résolus',
        stdin: 'INSPECT_FILE file=routes.js content=<<<<<<< HEAD\\nconst v = 1;\\n=======',
        expected: 'HOOK_RESULT file="routes.js" verdict=COMMIT_REJECTED reason=MERGE_CONFLICT_MARKERS'
      },
      {
        label: 'Jeton GitHub personnel détecté',
        stdin: 'INSPECT_FILE file=.env content=GITHUB_PAT=ghp_1234567890abcdefghijklmnopqrstuvwxyz',
        expected: 'HOOK_RESULT file=".env" verdict=COMMIT_REJECTED reason=HARDCODED_GITHUB_TOKEN'
      },
      {
        label: 'Code complexe propre et commenté',
        stdin: 'INSPECT_FILE file=service.py content=def process():\\n    # Standard process without secrets\\n    return True',
        expected: 'HOOK_RESULT file="service.py" verdict=COMMIT_ACCEPTED reason=CLEAN'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'file=([^\\s]+)\\s+content=(.*)', lig)
    if not m:
        continue
    fpath, content = m.groups()
    
    if any(mkr in content for mkr in ('<<<<<<<', '=======', '>>>>>>>')):
        verdict = 'COMMIT_REJECTED'
        reason = 'MERGE_CONFLICT_MARKERS'
    elif re.search(r'AKIA[0-9A-Z]{16,}', content):
        verdict = 'COMMIT_REJECTED'
        reason = 'HARDCODED_AWS_KEY'
    elif re.search(r'ghp_[a-zA-Z0-9]{20,}', content):
        verdict = 'COMMIT_REJECTED'
        reason = 'HARDCODED_GITHUB_TOKEN'
    else:
        verdict = 'COMMIT_ACCEPTED'
        reason = 'CLEAN'
        
    print(f'HOOK_RESULT file="{fpath}" verdict={verdict} reason={reason}')
`
  },
  {
    id: 'gh3-c6-e3',
    chapter: 6,
    title: 'Purge médico-légale de secrets dans l’historique (git-filter-repo)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler la réécriture d’un historique Git pour expurger un fichier confidentiel commité par erreur.',
    brief: `<p>Supprimer un fichier sensible dans un commit récent ne suffit pas : le secret reste accessible dans les commits antérieurs de l’historique. L’outil officiel <strong>git-filter-repo</strong> permet de purger le fichier de tous les commits passés et recalcule les nouveaux hachages SHA-1 en cascade.<br><br>
Spécification :<br>
Le script lit la liste des commits chronologiques :<br>
<code>COMMIT id=&lt;hash&gt; files=&lt;f1,f2...&gt; parents=&lt;p|NONE&gt;</code><br>
Puis la commande d'expurgation :<br>
<code>PURGE_FILE target=&lt;nom_du_fichier_a_supprimer&gt;</code>.<br><br>
Règles :<br>
1. Chaque commit contenant le fichier cible est <strong>impacté</strong> : le fichier est retiré de sa liste.<br>
2. Tout commit impacté ou dont l'un des parents a été réécrit voit son hash modifié : <code>new_hash = f"r_{ancien_hash}"</code>.<br>
3. Les commits non impactés et dont les parents sont inchangés conservent leur hash d'origine.<br><br>
Sortie attendue :<br>
<code>PURGE_RESULT target="{fichier}" impacted_count={n} new_tip_hash="{nouveau_hash_de_tete}"</code><br>
Puis pour chaque commit réécrit :<br>
<code>REWRITTEN_COMMIT old="{old_hash}" new="{new_hash}" remaining_files=[{liste_fichiers}]</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la réécriture de l'historique git-filter-repo
`,
    hints: [
      'Parcourir les commits dans l’ordre chronologique.',
      'Si un commit contient target_file ou si son parent a changé, générer un nouveau hash r_{old}.'
    ],
    examples: [
      {
        stdin: 'COMMIT id=C1 files=main.py,.env parents=NONE\nCOMMIT id=C2 files=main.py parents=C1\nPURGE_FILE target=.env',
        expected: 'PURGE_RESULT target=".env" impacted_count=2 new_tip_hash="r_C2"\nREWRITTEN_COMMIT old="C1" new="r_C1" remaining_files=[main.py]\nREWRITTEN_COMMIT old="C2" new="r_C2" remaining_files=[main.py]',
        note: 'C1 contenait .env donc il est réécrit en r_C1, et C2 ayant r_C1 pour parent est réécrit en r_C2.'
      }
    ],
    tests: [
      {
        label: 'Fichier cible non présent dans l’historique',
        stdin: 'COMMIT id=A1 files=index.html parents=NONE\nCOMMIT id=A2 files=styles.css parents=A1\nPURGE_FILE target=secrets.json',
        expected: 'PURGE_RESULT target="secrets.json" impacted_count=0 new_tip_hash="A2"'
      },
      {
        label: 'Fichier sensible introduit dans le dernier commit uniquement',
        stdin: 'COMMIT id=10 files=README.md parents=NONE\nCOMMIT id=20 files=app.py,id_rsa parents=10\nPURGE_FILE target=id_rsa',
        expected: 'PURGE_RESULT target="id_rsa" impacted_count=1 new_tip_hash="r_20"\nREWRITTEN_COMMIT old="20" new="r_20" remaining_files=[app.py]'
      },
      {
        label: 'Trois commits avec propagation complète',
        stdin: 'COMMIT id=X1 files=a.txt,leak.key parents=NONE\nCOMMIT id=X2 files=b.txt parents=X1\nCOMMIT id=X3 files=c.txt parents=X2\nPURGE_FILE target=leak.key',
        expected: 'PURGE_RESULT target="leak.key" impacted_count=3 new_tip_hash="r_X3"\nREWRITTEN_COMMIT old="X1" new="r_X1" remaining_files=[a.txt]\nREWRITTEN_COMMIT old="X2" new="r_X2" remaining_files=[b.txt]\nREWRITTEN_COMMIT old="X3" new="r_X3" remaining_files=[c.txt]'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

commits = []
target_file = ''

for lig in lignes:
    if lig.startswith('COMMIT'):
        m = re.search(r'id=([^\\s]+)\\s+files=([^\\s]+)\\s+parents=([^\\s]+)', lig)
        if m:
            cid, fstr, pstr = m.groups()
            flist = [f.strip() for f in fstr.split(',') if f.strip()]
            plist = [] if pstr == 'NONE' else [p.strip() for p in pstr.split(',') if p.strip()]
            commits.append({
                'id': cid,
                'files': flist,
                'parents': plist
            })
    elif lig.startswith('PURGE_FILE'):
        m = re.search(r'target=([^\\s]+)', lig)
        if m:
            target_file = m.group(1).strip()

hash_map = {} # old_id -> new_id
rewritten_list = []

for c in commits:
    old_id = c['id']
    has_target = target_file in c['files']
    parents_rewritten = any(p in hash_map and hash_map[p] != p for p in c['parents'])
    
    if has_target or parents_rewritten:
        new_id = f"r_{old_id}"
        hash_map[old_id] = new_id
        rem_files = [f for f in c['files'] if f != target_file]
        rewritten_list.append({
            'old': old_id,
            'new': new_id,
            'files': rem_files
        })
    else:
        hash_map[old_id] = old_id

tip_hash = hash_map[commits[-1]['id']] if commits else 'NONE'

print(f'PURGE_RESULT target="{target_file}" impacted_count={len(rewritten_list)} new_tip_hash="{tip_hash}"')
for r in rewritten_list:
    files_str = ','.join(r['files'])
    print(f'REWRITTEN_COMMIT old="{r["old"]}" new="{r["new"]}" remaining_files=[{files_str}]')
`
  }
];
