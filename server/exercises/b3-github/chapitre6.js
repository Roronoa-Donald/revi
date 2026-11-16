'use strict';

module.exports = [
  {
    "id": "gh3-c6-e1",
    "chapter": 6,
    "title": "Simulateur de Git LFS (Large File Storage) et génération de pointeurs",
    "level": "n1",
    "language": "shell",
    "goal": "Déterminer si un fichier doit être géré par Git LFS et générer le pointeur texte officiel.",
    "brief": "<p>Git LFS remplace, dans le dépôt, le contenu d'un fichier suivi par un petit pointeur texte ; le contenu réel est stocké séparément. La configuration effective de suivi dépend notamment des motifs configurés. Pour cet exercice seulement, utilisez la politique suivante : un chemin terminé, avec respect de la casse, par <code>.iso</code>, <code>.psd</code>, <code>.zip</code>, <code>.tar.gz</code> ou <code>.mp4</code>, ou une taille <code>size_bytes &gt;= 104857600</code> octets, impose LFS. Ce seuil n'est pas une règle automatique universelle de Git LFS.<br><br>Chaque ligne est <code>FILE path=&lt;chemin&gt; size_bytes=&lt;taille&gt; sha256=&lt;64 chiffres hexadécimaux minuscules&gt;</code>. La taille est un entier décimal de 0 à 9 223 372 036 854 775 807, sans zéro initial sauf pour 0. Le chemin peut contenir des espaces mais ni guillemet double ni le délimiteur <code> size_bytes=</code>. Le SHA-256 est fourni : le contenu du fichier n'est pas disponible pour le recalculer.<br><br>Pour un fichier ordinaire, affichez <code>LFS_DECISION file=\"{path}\" mode=GIT_BLOB</code>. Pour LFS, affichez <code>LFS_DECISION file=\"{path}\" mode=LFS_POINTER oid=\"{sha256}\" size={size_bytes}</code>, puis les trois lignes du pointeur v1 :<br><code>version https://git-lfs.github.com/spec/v1</code><br><code>oid sha256:{sha256}</code><br><code>size {size_bytes}</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c6-e1) — Simulateur de Git LFS (Large File Storage) et génération de pointeurs\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Appliquez la politique du modèle : extension surveillée ou taille supérieure ou égale à 104857600.",
      "Reprenez le SHA-256 fourni et écrivez les trois lignes du pointeur v1 dans l’ordre.",
      "1. LFS si extension surveillée (iso, psd, zip, tar.gz, mp4) ou taille au moins 104857600 octets. 2. Émettre la décision puis les trois lignes du pointeur (version, oid, size). 3. Sinon : GIT_BLOB."
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
    "solution": "#!/usr/bin/env bash\npattern='^FILE path=(.*) size_bytes=([0-9]+) sha256=([0-9a-f]{64})$'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $pattern ]] || continue\n  path=${BASH_REMATCH[1]}\n  size=${BASH_REMATCH[2]}\n  sha256=${BASH_REMATCH[3]}\n  if [[ $path == *.iso || $path == *.psd || $path == *.zip || $path == *.tar.gz || $path == *.mp4 ]] || ((10#$size >= 104857600)); then\n    printf 'LFS_DECISION file=\"%s\" mode=LFS_POINTER oid=\"%s\" size=%s\\n' \"$path\" \"$sha256\" \"$size\"\n    printf 'version https://git-lfs.github.com/spec/v1\\noid sha256:%s\\nsize %s\\n' \"$sha256\" \"$size\"\n  else\n    printf 'LFS_DECISION file=\"%s\" mode=GIT_BLOB\\n' \"$path\"\n  fi\ndone\n",
    "takeaway": "Git LFS remplace les binaires volumineux par de légers fichiers pointeurs texte afin de garder l’historique Git rapide et compact."
  },
  {
    "id": "gh3-c6-e2",
    "chapter": 6,
    "title": "Validateur de Hook Git pre-commit (Détection de secrets & conflits)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler les contrôles d’un hook pre-commit sur quelques motifs de conflit et de secrets.",
    "brief": "<p>Un hook Git <code>pre-commit</code> peut interrompre un commit en renvoyant un code non nul ; il peut aussi être contourné avec <code>git commit --no-verify</code>. Ici, vous ne créez pas de vrai hook : simulez uniquement ses décisions sur les lignes <code>INSPECT_FILE file=&lt;chemin&gt; content=&lt;contenu&gt;</code>. Les chemins peuvent contenir des espaces mais ni guillemet double ni le délimiteur <code> content=</code> ; le contenu tient sur une ligne et peut représenter des retours à la ligne par <code>\\n</code>.<br><br>Vérifiez ces motifs dans l'ordre : les chaînes <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code> ou <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> donnent <code>MERGE_CONFLICT_MARKERS</code> ; <code>AKIA</code> suivi d'au moins 16 lettres majuscules ASCII ou chiffres donne <code>HARDCODED_AWS_KEY</code> ; <code>ghp_</code> suivi d'au moins 20 lettres ASCII ou chiffres donne <code>HARDCODED_GITHUB_TOKEN</code> ; sinon le résultat est <code>CLEAN</code>.<br><br>Affichez <code>HOOK_RESULT file=\"{file}\" verdict={COMMIT_ACCEPTED|COMMIT_REJECTED} reason={reason}</code>. Ces motifs sont pédagogiques : une correspondance ne prouve pas qu'un identifiant soit actif, et leur absence ne garantit pas l'absence de secret.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c6-e2) — Validateur de Hook Git pre-commit (Détection de secrets & conflits)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Vérifiez les marqueurs de conflit avant les motifs d’identifiants.",
      "Utilisez les expressions régulières de Bash et testez les longueurs immédiatement inférieure et égale aux bornes.",
      "1. Marqueurs de conflit présents : MERGE_CONFLICT_MARKERS. 2. AKIA suivi de 16 caractères : HARDCODED_AWS_KEY. 3. ghp_ suivi de 20 : HARDCODED_GITHUB_TOKEN. 4. Sinon : COMMIT_ACCEPTED."
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
    "solution": "#!/usr/bin/env bash\nline_pattern='^INSPECT_FILE file=(.*) content=(.*)$'\naws_pattern='AKIA[0-9A-Z]{16,}'\ngithub_pattern='ghp_[0-9A-Za-z]{20,}'\nwhile IFS= read -r line || [[ -n $line ]]; do\n  [[ $line =~ $line_pattern ]] || continue\n  file=${BASH_REMATCH[1]}\n  content=${BASH_REMATCH[2]}\n  verdict=COMMIT_REJECTED\n  if [[ $content == *'<<<<<<<'* || $content == *'======='* || $content == *'>>>>>>>'* ]]; then\n    reason=MERGE_CONFLICT_MARKERS\n  elif [[ $content =~ $aws_pattern ]]; then\n    reason=HARDCODED_AWS_KEY\n  elif [[ $content =~ $github_pattern ]]; then\n    reason=HARDCODED_GITHUB_TOKEN\n  else\n    verdict=COMMIT_ACCEPTED\n    reason=CLEAN\n  fi\n  printf 'HOOK_RESULT file=\"%s\" verdict=%s reason=%s\\n' \"$file\" \"$verdict\" \"$reason\"\ndone\n",
    "takeaway": "Un hook pre-commit vérifie marqueurs de conflits et fuites de secrets localement avant que le commit n’entre dans l’historique."
  },
  {
    "id": "gh3-c6-e3",
    "chapter": 6,
    "title": "Purge médico-légale de secrets dans l’historique (git-filter-repo)",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler la réécriture d’un historique Git pour expurger un fichier confidentiel commité par erreur.",
    "brief": "<p>Retirer un fichier sensible d'un commit récent ne l'efface pas des anciens commits. GitHub recommande notamment <code>git-filter-repo</code> pour réécrire l'historique ; un secret compromis doit aussi être révoqué ou renouvelé. Cet exercice est une simulation : les identifiants <code>r_{id}</code> ne sont pas de vrais hachages et aucun dépôt n'est modifié.<br><br>Déclarez zéro ou plusieurs lignes <code>COMMIT id=&lt;id&gt; files=&lt;f1,f2,...&gt; parents=&lt;p1,p2,...|NONE&gt;</code>, puis <code>PURGE_FILE target=&lt;fichier&gt;</code>. Une liste de fichiers vide s'écrit <code>files=</code>. Les noms sont distincts au sein de chaque liste et, comme les identifiants, ne contiennent ni espaces ni virgule. Les commits sont distincts, acycliques et déclarés après tous leurs parents.<br><br>Retirez le fichier cible de chaque instantané. Un commit est réécrit s'il contenait le fichier ou si au moins un de ses parents a été réécrit ; son nouvel identifiant est <code>r_{id}</code>. Les autres restent inchangés. La tête simulée est le dernier commit déclaré, ou <code>NONE</code> si l'historique est vide.<br><br>Affichez <code>PURGE_RESULT target=\"{fichier}\" impacted_count={nombre_de_commits_réécrits} new_tip_hash=\"{id_de_tête}\"</code>, puis pour chaque commit réécrit dans l'ordre d'entrée <code>REWRITTEN_COMMIT old=\"{id}\" new=\"r_{id}\" remaining_files=[{fichiers}]</code>. Conservez l'ordre des fichiers restants.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c6-e3) — Purge médico-légale de secrets dans l’historique (git-filter-repo)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Parcourez les commits dans l’ordre où tous leurs parents sont déjà connus.",
      "Réécrivez un commit si le fichier est présent ou si au moins un parent a été réécrit.",
      "1. Parcourir les commits dans l’ordre. 2. Réécrire si le fichier visé est présent ou si un parent a été réécrit. 3. Nouvel identifiant : r_ + ancien. 4. Afficher le total, la nouvelle tête puis chaque commit réécrit."
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
    "solution": "#!/usr/bin/env bash\ndeclare -A files_by_id=() parents_by_id=() rewritten=()\ncommits=()\nrewritten_ids=()\nrewritten_files=()\ncommit_pattern='^COMMIT id=([^[:space:]]+) files=([^[:space:]]*) parents=([^[:space:]]+)$'\ntarget_pattern='^PURGE_FILE target=([^[:space:]]+)$'\ntarget=\nwhile IFS= read -r line || [[ -n $line ]]; do\n  if [[ $line =~ $commit_pattern ]]; then\n    id=${BASH_REMATCH[1]}\n    commits+=(\"$id\")\n    files_by_id[$id]=${BASH_REMATCH[2]}\n    parents_by_id[$id]=${BASH_REMATCH[3]}\n  elif [[ $line =~ $target_pattern ]]; then\n    target=${BASH_REMATCH[1]}\n  fi\ndone\nfor id in \"${commits[@]}\"; do\n  changed=0\n  remaining=()\n  IFS=, read -r -a files <<< \"${files_by_id[$id]}\"\n  for file in \"${files[@]}\"; do\n    if [[ $file == \"$target\" ]]; then changed=1; else remaining+=(\"$file\"); fi\n  done\n  if [[ ${parents_by_id[$id]} != NONE ]]; then\n    IFS=, read -r -a parents <<< \"${parents_by_id[$id]}\"\n    for parent in \"${parents[@]}\"; do\n      if [[ ${rewritten[$parent]+present} ]]; then changed=1; fi\n    done\n  fi\n  if ((changed)); then\n    rewritten[$id]=r_$id\n    rewritten_ids+=(\"$id\")\n    remaining_list=$(IFS=,; printf '%s' \"${remaining[*]}\")\n    rewritten_files+=(\"$remaining_list\")\n  fi\ndone\nif ((${#commits[@]} == 0)); then\n  tip=NONE\nelse\n  tip=${commits[${#commits[@]}-1]}\n  tip=${rewritten[$tip]:-$tip}\nfi\nprintf 'PURGE_RESULT target=\"%s\" impacted_count=%s new_tip_hash=\"%s\"\\n' \"$target\" \"${#rewritten_ids[@]}\" \"$tip\"\nfor ((index = 0; index < ${#rewritten_ids[@]}; index += 1)); do\n  id=${rewritten_ids[index]}\n  printf 'REWRITTEN_COMMIT old=\"%s\" new=\"%s\" remaining_files=[%s]\\n' \"$id\" \"${rewritten[$id]}\" \"${rewritten_files[index]}\"\ndone\n",
    "takeaway": "Pour éliminer définitivement un secret commité, il faut réécrire tout l’historique avec git-filter-repo puis révoquer le secret exposé."
  }
];
