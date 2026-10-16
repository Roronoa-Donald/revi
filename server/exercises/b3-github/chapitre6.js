'use strict';

module.exports = [
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
