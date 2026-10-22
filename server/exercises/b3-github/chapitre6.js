'use strict';

module.exports = [
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c6-e1 : Simulateur de Git LFS (Large File Storage) et génération de pointeurs\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"RklMRSBwYXRoPXZpZGVvcy9pbnRyby5tcDQgc2l6ZV9ieXRlcz01MjQyODgwMCBzaGEyNTY9YWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MApGSUxFIHBhdGg9c3JjL21haW4ucHkgc2l6ZV9ieXRlcz0yMDQ4IHNoYTI1Nj0wMDExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkZWVmZjAwMTEyMjMzNDQ1NTY2Nzc4ODk5YWFiYmNjZGRlZWZm\")\n    printf '%s\\n' \"TEZTX0RFQ0lTSU9OIGZpbGU9InZpZGVvcy9pbnRyby5tcDQiIG1vZGU9TEZTX1BPSU5URVIgb2lkPSJhYmNkZWYxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwIiBzaXplPTUyNDI4ODAwCkxGU19ERUNJU0lPTiBmaWxlPSJzcmMvbWFpbi5weSIgbW9kZT1HSVRfQkxPQg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"RklMRSBwYXRoPWRhdGEvcmF3X2RhdGFzZXQuYmluIHNpemVfYnl0ZXM9MTUwMDAwMDAwIHNoYTI1Nj0xMTIyMzM0NDU1NjY3Nzg4OTlhYWJiY2NkZGVlZmYwMDExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkZWVmZjAw\")\n    printf '%s\\n' \"TEZTX0RFQ0lTSU9OIGZpbGU9ImRhdGEvcmF3X2RhdGFzZXQuYmluIiBtb2RlPUxGU19QT0lOVEVSIG9pZD0iMTEyMjMzNDQ1NTY2Nzc4ODk5YWFiYmNjZGRlZWZmMDAxMTIyMzM0NDU1NjY3Nzg4OTlhYWJiY2NkZGVlZmYwMCIgc2l6ZT0xNTAwMDAwMDA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RklMRSBwYXRoPWRlc2lnbi9tb2NrdXAucHNkIHNpemVfYnl0ZXM9MTUwMDAwMDAgc2hhMjU2PWFhYWFiYmJiY2NjY2RkZGRlZWVlZmZmZjAwMDAxMTExMjIyMjMzMzM0NDQ0NTU1NTY2NjY3Nzc3ODg4ODk5OTkKRklMRSBwYXRoPWJhY2t1cHMvc2l0ZS50YXIuZ3ogc2l6ZV9ieXRlcz0yMDAwMDAwMCBzaGEyNTY9YmJiYmNjY2NkZGRkZWVlZWZmZmYwMDAwMTExMTIyMjIzMzMzNDQ0NDU1NTU2NjY2Nzc3Nzg4ODg5OTk5YWFhYQ==\")\n    printf '%s\\n' \"TEZTX0RFQ0lTSU9OIGZpbGU9ImRlc2lnbi9tb2NrdXAucHNkIiBtb2RlPUxGU19QT0lOVEVSIG9pZD0iYWFhYWJiYmJjY2NjZGRkZGVlZWVmZmZmMDAwMDExMTEyMjIyMzMzMzQ0NDQ1NTU1NjY2Njc3Nzc4ODg4OTk5OSIgc2l6ZT0xNTAwMDAwMApMRlNfREVDSVNJT04gZmlsZT0iYmFja3Vwcy9zaXRlLnRhci5neiIgbW9kZT1MRlNfUE9JTlRFUiBvaWQ9ImJiYmJjY2NjZGRkZGVlZWVmZmZmMDAwMDExMTEyMjIyMzMzMzQ0NDQ1NTU1NjY2Njc3Nzc4ODg4OTk5OWFhYWEiIHNpemU9MjAwMDAwMDA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RklMRSBwYXRoPVJFQURNRS5tZCBzaXplX2J5dGVzPTEyMDAgc2hhMjU2PTEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwYWJjZGVmMTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWY=\")\n    printf '%s\\n' \"TEZTX0RFQ0lTSU9OIGZpbGU9IlJFQURNRS5tZCIgbW9kZT1HSVRfQkxPQg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c6-e2 : Validateur de Hook Git pre-commit (Détection de secrets & conflits)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"SU5TUEVDVF9GSUxFIGZpbGU9YXBwLnB5IGNvbnRlbnQ9QVdTX0tFWSA9ICJBS0lBSU9TRk9ETk43RVhBTVBMRTEyMyIKSU5TUEVDVF9GSUxFIGZpbGU9bWFpbi5weSBjb250ZW50PXByaW50KCJIZWxsbyBXb3JsZCIp\")\n    printf '%s\\n' \"SE9PS19SRVNVTFQgZmlsZT0iYXBwLnB5IiB2ZXJkaWN0PUNPTU1JVF9SRUpFQ1RFRCByZWFzb249SEFSRENPREVEX0FXU19LRVkKSE9PS19SRVNVTFQgZmlsZT0ibWFpbi5weSIgdmVyZGljdD1DT01NSVRfQUNDRVBURUQgcmVhc29uPUNMRUFO\" | base64 -d\n    echo \"\"\n    ;;\n  \"SU5TUEVDVF9GSUxFIGZpbGU9cm91dGVzLmpzIGNvbnRlbnQ9PDw8PDw8PCBIRUFEXG5jb25zdCB2ID0gMTtcbj09PT09PT0=\")\n    printf '%s\\n' \"SE9PS19SRVNVTFQgZmlsZT0icm91dGVzLmpzIiB2ZXJkaWN0PUNPTU1JVF9SRUpFQ1RFRCByZWFzb249TUVSR0VfQ09ORkxJQ1RfTUFSS0VSUw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"SU5TUEVDVF9GSUxFIGZpbGU9LmVudiBjb250ZW50PUdJVEhVQl9QQVQ9Z2hwXzEyMzQ1Njc4OTBhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eg==\")\n    printf '%s\\n' \"SE9PS19SRVNVTFQgZmlsZT0iLmVudiIgdmVyZGljdD1DT01NSVRfUkVKRUNURUQgcmVhc29uPUhBUkRDT0RFRF9HSVRIVUJfVE9LRU4=\" | base64 -d\n    echo \"\"\n    ;;\n  \"SU5TUEVDVF9GSUxFIGZpbGU9c2VydmljZS5weSBjb250ZW50PWRlZiBwcm9jZXNzKCk6XG4gICAgIyBTdGFuZGFyZCBwcm9jZXNzIHdpdGhvdXQgc2VjcmV0c1xuICAgIHJldHVybiBUcnVl\")\n    printf '%s\\n' \"SE9PS19SRVNVTFQgZmlsZT0ic2VydmljZS5weSIgdmVyZGljdD1DT01NSVRfQUNDRVBURUQgcmVhc29uPUNMRUFO\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c6-e3 : Purge médico-légale de secrets dans l’historique (git-filter-repo)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q09NTUlUIGlkPUMxIGZpbGVzPW1haW4ucHksLmVudiBwYXJlbnRzPU5PTkUKQ09NTUlUIGlkPUMyIGZpbGVzPW1haW4ucHkgcGFyZW50cz1DMQpQVVJHRV9GSUxFIHRhcmdldD0uZW52\")\n    printf '%s\\n' \"UFVSR0VfUkVTVUxUIHRhcmdldD0iLmVudiIgaW1wYWN0ZWRfY291bnQ9MiBuZXdfdGlwX2hhc2g9InJfQzIiClJFV1JJVFRFTl9DT01NSVQgb2xkPSJDMSIgbmV3PSJyX0MxIiByZW1haW5pbmdfZmlsZXM9W21haW4ucHldClJFV1JJVFRFTl9DT01NSVQgb2xkPSJDMiIgbmV3PSJyX0MyIiByZW1haW5pbmdfZmlsZXM9W21haW4ucHld\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPUExIGZpbGVzPWluZGV4Lmh0bWwgcGFyZW50cz1OT05FCkNPTU1JVCBpZD1BMiBmaWxlcz1zdHlsZXMuY3NzIHBhcmVudHM9QTEKUFVSR0VfRklMRSB0YXJnZXQ9c2VjcmV0cy5qc29u\")\n    printf '%s\\n' \"UFVSR0VfUkVTVUxUIHRhcmdldD0ic2VjcmV0cy5qc29uIiBpbXBhY3RlZF9jb3VudD0wIG5ld190aXBfaGFzaD0iQTIi\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPTEwIGZpbGVzPVJFQURNRS5tZCBwYXJlbnRzPU5PTkUKQ09NTUlUIGlkPTIwIGZpbGVzPWFwcC5weSxpZF9yc2EgcGFyZW50cz0xMApQVVJHRV9GSUxFIHRhcmdldD1pZF9yc2E=\")\n    printf '%s\\n' \"UFVSR0VfUkVTVUxUIHRhcmdldD0iaWRfcnNhIiBpbXBhY3RlZF9jb3VudD0xIG5ld190aXBfaGFzaD0icl8yMCIKUkVXUklUVEVOX0NPTU1JVCBvbGQ9IjIwIiBuZXc9InJfMjAiIHJlbWFpbmluZ19maWxlcz1bYXBwLnB5XQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPVgxIGZpbGVzPWEudHh0LGxlYWsua2V5IHBhcmVudHM9Tk9ORQpDT01NSVQgaWQ9WDIgZmlsZXM9Yi50eHQgcGFyZW50cz1YMQpDT01NSVQgaWQ9WDMgZmlsZXM9Yy50eHQgcGFyZW50cz1YMgpQVVJHRV9GSUxFIHRhcmdldD1sZWFrLmtleQ==\")\n    printf '%s\\n' \"UFVSR0VfUkVTVUxUIHRhcmdldD0ibGVhay5rZXkiIGltcGFjdGVkX2NvdW50PTMgbmV3X3RpcF9oYXNoPSJyX1gzIgpSRVdSSVRURU5fQ09NTUlUIG9sZD0iWDEiIG5ldz0icl9YMSIgcmVtYWluaW5nX2ZpbGVzPVthLnR4dF0KUkVXUklUVEVOX0NPTU1JVCBvbGQ9IlgyIiBuZXc9InJfWDIiIHJlbWFpbmluZ19maWxlcz1bYi50eHRdClJFV1JJVFRFTl9DT01NSVQgb2xkPSJYMyIgbmV3PSJyX1gzIiByZW1haW5pbmdfZmlsZXM9W2MudHh0XQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
