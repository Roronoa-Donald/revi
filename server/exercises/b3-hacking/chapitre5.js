'use strict';

module.exports = [
  {
    "id": "hk3-c5-e1",
    "chapter": 5,
    "title": "Auditeur de Permissions Linux et Détection de Binaires SUID Anormaux",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les permissions octales de fichiers système pour détecter les binaires SUID exploitables (GTFOBins).",
    "brief": "<p>Le bit SUID (Set User ID) permet d'exécuter un binaire avec les privilèges de son propriétaire (généralement root).<br><br>\nBinaires connus du catalogue GTFOBins permettant une évasion directe vers un shell root :<br>\n<code>bash</code>, <code>find</code>, <code>vim</code>, <code>nano</code>, <code>cp</code>, <code>awk</code>, <code>python</code>, <code>nmap</code>, <code>pkexec</code>.<br><br>\nRègles d'évaluation :<br>\n1. Vérifier si le mode octal comporte le bit SUID (chiffre des milliers &gt;= 4, ex: <code>4755</code>, <code>4750</code>) :<br>\n   - Si le bit SUID est absent : <code>exploit=NO_SUID_BIT</code>, <code>risk=NONE</code>.<br>\n2. Si le bit SUID est présent et <code>owner == 'root'</code> :<br>\n   - Si le nom du binaire est dans GTFOBins : <code>exploit=GTFOBINS_PRIVILEGE_ESCALATION</code>, <code>risk=CRITICAL</code>.<br>\n   - Sinon (binaire standard comme <code>passwd</code>, <code>ping</code>) : <code>exploit=STANDARD_SYSTEM_BINARY</code>, <code>risk=LOW</code>.<br>\n3. Si le bit SUID est présent mais <code>owner != 'root'</code> :<br>\n   - <code>exploit=NON_ROOT_SUID</code>, <code>risk=MEDIUM</code>.<br><br>\nEntrée STDIN : <code>SUID_CHECK path=&lt;chemin&gt; owner=&lt;user&gt; mode=&lt;octal&gt;</code>.<br>\nSortie : <code>SUID_AUDIT: binary=&lt;nom&gt; owner=&lt;user&gt; mode=&lt;octal&gt; exploit=&lt;exploit&gt; risk=&lt;risk&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c5-e1) — Auditeur de Permissions Linux et Détection de Binaires SUID Anormaux\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Binaire système passwd avec SUID légitime et restreint]\n# Données : SUID_CHECK path=/usr/bin/passwd owner=root mode=4755\nA_COMPLETER\n\n[Cas 2 — Éditeur vim mis en SUID par erreur d'administration]\n# Données : SUID_CHECK path=/bin/vim owner=root mode=4750\nA_COMPLETER\n\n[Cas 3 — Binaire normal sans aucun bit SUID]\n# Données : SUID_CHECK path=/usr/bin/ls owner=root mode=0755\nA_COMPLETER\n\n[Cas 4 — Binaire SUID appartenant à un utilisateur non root]\n# Données : SUID_CHECK path=/opt/app/worker owner=deploy mode=4755\nA_COMPLETER\n",
    "hints": [
      "Extrayez le nom de base du fichier (ex: /usr/bin/find -> find).",
      "Vérifiez si le premier chiffre du mode octal (mode >= 4000) active le bit SUID.",
      "Comparez avec la liste GTFOBins si owner == root."
    ],
    "examples": [
      {
        "stdin": "SUID_CHECK path=/usr/bin/find owner=root mode=4755",
        "expected": "SUID_AUDIT: binary=find owner=root mode=4755 exploit=GTFOBINS_PRIVILEGE_ESCALATION risk=CRITICAL",
        "note": "Binaire find SUID root exploitable directement via la commande find . -exec /bin/sh -p ;"
      }
    ],
    "tests": [
      {
        "label": "Binaire système passwd avec SUID légitime et restreint",
        "stdin": "cas:1",
        "expected": "SUID_AUDIT: binary=passwd owner=root mode=4755 exploit=STANDARD_SYSTEM_BINARY risk=LOW"
      },
      {
        "label": "Éditeur vim mis en SUID par erreur d'administration",
        "stdin": "cas:2",
        "expected": "SUID_AUDIT: binary=vim owner=root mode=4750 exploit=GTFOBINS_PRIVILEGE_ESCALATION risk=CRITICAL"
      },
      {
        "label": "Binaire normal sans aucun bit SUID",
        "stdin": "cas:3",
        "expected": "SUID_AUDIT: binary=ls owner=root mode=0755 exploit=NO_SUID_BIT risk=NONE"
      },
      {
        "label": "Binaire SUID appartenant à un utilisateur non root",
        "stdin": "cas:4",
        "expected": "SUID_AUDIT: binary=worker owner=deploy mode=4755 exploit=NON_ROOT_SUID risk=MEDIUM"
      }
    ],
    "solution": "[Exemple]\nSUID_AUDIT: binary=find owner=root mode=4755 exploit=GTFOBINS_PRIVILEGE_ESCALATION risk=CRITICAL\n\n[Cas 1 — Binaire système passwd avec SUID légitime et restreint]\nSUID_AUDIT: binary=passwd owner=root mode=4755 exploit=STANDARD_SYSTEM_BINARY risk=LOW\n\n[Cas 2 — Éditeur vim mis en SUID par erreur d'administration]\nSUID_AUDIT: binary=vim owner=root mode=4750 exploit=GTFOBINS_PRIVILEGE_ESCALATION risk=CRITICAL\n\n[Cas 3 — Binaire normal sans aucun bit SUID]\nSUID_AUDIT: binary=ls owner=root mode=0755 exploit=NO_SUID_BIT risk=NONE\n\n[Cas 4 — Binaire SUID appartenant à un utilisateur non root]\nSUID_AUDIT: binary=worker owner=deploy mode=4755 exploit=NON_ROOT_SUID risk=MEDIUM"
  },
  {
    "id": "hk3-c5-e2",
    "chapter": 5,
    "title": "Analyseur de Fichier Sudoers et Détection de Droits Dangereux (NOPASSWD)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser une directive sudoers pour détecter des privilèges excessifs permettant l'élévation directe vers root.",
    "brief": "<p>Une mauvaise configuration dans <code>/etc/sudoers</code> constitue le vecteur d'élévation de privilèges le plus fréquent en environnement Linux.<br><br>\nCommandes dangereuses permettant l'échappement vers un shell (Shell Escape) :<br>\n<code>ALL</code>, <code>find</code>, <code>vim</code>, <code>vi</code>, <code>less</code>, <code>more</code>, <code>bash</code>, <code>sh</code>, <code>python</code>, <code>perl</code>, <code>awk</code>.<br><br>\nRègles d'analyse :<br>\n1. Déterminer si <code>NOPASSWD:</code> est présent dans la règle :<br>\n   - Si absent : <code>nopasswd=FALSE</code>, <code>vector=PASSWORD_PROTECTED</code>, <code>risk=LOW</code>.<br>\n2. Si <code>NOPASSWD:</code> est présent (<code>nopasswd=TRUE</code>) :<br>\n   - Extraire la commande autorisée située après <code>NOPASSWD:</code> (ex: <code>/usr/bin/find</code>).<br>\n   - Extraire le nom du binaire de base.<br>\n   - Si le binaire est <code>ALL</code> ou appartient à la liste de shell escape :<br>\n     <code>vector=INSTANT_ROOT_SHELL</code>, <code>risk=CRITICAL</code>.<br>\n   - Sinon (binaire d'administration restreint, ex: <code>systemctl restart nginx</code>) :<br>\n     <code>vector=RESTRICTED_SUDO_EXECUTION</code>, <code>risk=MEDIUM</code>.<br><br>\nEntrée STDIN : <code>SUDO_PARSE rule=&lt;texte_complet_de_la_regle_sudoers&gt;</code>.<br>\nSortie : <code>SUDO_AUDIT: user=&lt;user&gt; nopasswd=&lt;TRUE|FALSE&gt; command=&lt;cmd_name&gt; vector=&lt;vector&gt; risk=&lt;risk&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c5-e2) — Analyseur de Fichier Sudoers et Détection de Droits Dangereux (NOPASSWD)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Règle accordant tous les privilèges sans mot de passe (ALL)]\n# Données : SUDO_PARSE rule=john ALL=(ALL:ALL) NOPASSWD: ALL\nA_COMPLETER\n\n[Cas 2 — Commande restreinte d'administration sans échappement de shell]\n# Données : SUDO_PARSE rule=backup_svc ALL=(root) NOPASSWD: /usr/bin/rsync\nA_COMPLETER\n\n[Cas 3 — Règle classique exigeant l'authentification par mot de passe]\n# Données : SUDO_PARSE rule=alice ALL=(ALL) /bin/bash\nA_COMPLETER\n",
    "hints": [
      "Isolez le texte de la règle avec line.split(\"rule=\", 1)[1].",
      "Le premier mot de la règle correspond à l'utilisateur ou au groupe.",
      "Vérifiez la présence de NOPASSWD: et extrayez la commande qui suit."
    ],
    "examples": [
      {
        "stdin": "SUDO_PARSE rule=developer ALL=(ALL) NOPASSWD: /usr/bin/find",
        "expected": "SUDO_AUDIT: user=developer nopasswd=TRUE command=find vector=INSTANT_ROOT_SHELL risk=CRITICAL",
        "note": "find exécutable sans mot de passe permettant l'échappement shell immédiat."
      }
    ],
    "tests": [
      {
        "label": "Règle accordant tous les privilèges sans mot de passe (ALL)",
        "stdin": "cas:1",
        "expected": "SUDO_AUDIT: user=john nopasswd=TRUE command=ALL vector=INSTANT_ROOT_SHELL risk=CRITICAL"
      },
      {
        "label": "Commande restreinte d'administration sans échappement de shell",
        "stdin": "cas:2",
        "expected": "SUDO_AUDIT: user=backup_svc nopasswd=TRUE command=rsync vector=RESTRICTED_SUDO_EXECUTION risk=MEDIUM"
      },
      {
        "label": "Règle classique exigeant l'authentification par mot de passe",
        "stdin": "cas:3",
        "expected": "SUDO_AUDIT: user=alice nopasswd=FALSE command=bash vector=PASSWORD_PROTECTED risk=LOW"
      }
    ],
    "solution": "[Exemple]\nSUDO_AUDIT: user=developer nopasswd=TRUE command=find vector=INSTANT_ROOT_SHELL risk=CRITICAL\n\n[Cas 1 — Règle accordant tous les privilèges sans mot de passe (ALL)]\nSUDO_AUDIT: user=john nopasswd=TRUE command=ALL vector=INSTANT_ROOT_SHELL risk=CRITICAL\n\n[Cas 2 — Commande restreinte d'administration sans échappement de shell]\nSUDO_AUDIT: user=backup_svc nopasswd=TRUE command=rsync vector=RESTRICTED_SUDO_EXECUTION risk=MEDIUM\n\n[Cas 3 — Règle classique exigeant l'authentification par mot de passe]\nSUDO_AUDIT: user=alice nopasswd=FALSE command=bash vector=PASSWORD_PROTECTED risk=LOW"
  },
  {
    "id": "hk3-c5-e3",
    "chapter": 5,
    "title": "Calculateur d'Offset de Buffer Overflow et Agencement de Payload",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la structure et la taille globale d'un exploit de dépassement de tampon de pile (Stack Buffer Overflow).",
    "brief": "<p>Dans l'exploitation de binaires compilés (x86/x64 sans canary), un dépassement de tampon permet de réécrire le pointeur d'instruction de retour (EIP/RIP).<br><br>\nStructure du payload dans la pile :<br>\n1. <code>PADDING</code> : <code>offset</code> octets (remplissage jusqu'au pointeur de retour).<br>\n2. <code>RET_ADDR</code> : taille de l'adresse de retour (4 octets en <code>x86</code>, 8 octets en <code>x64</code>).<br>\n3. <code>NOP_SLED</code> : <code>sled_len</code> octets de NOP (<code>\\x90</code>).<br>\n4. <code>SHELLCODE</code> : <code>shellcode_len</code> octets du code exécutable injecté.<br><br>\nCalcul de la taille totale du payload :<br>\n<code>total_size = offset + ret_bytes + sled_len + shellcode_len</code>.<br><br>\nEntrée STDIN : <code>BOF_LAYOUT arch=&lt;x86|x64&gt; offset=&lt;N&gt; sled_len=&lt;S&gt; shellcode_len=&lt;L&gt;</code>.<br>\nSortie : <code>PAYLOAD_LAYOUT: arch=&lt;arch&gt; offset=&lt;N&gt; ret_bytes=&lt;4|8&gt; sled=&lt;S&gt; shellcode=&lt;L&gt; total_size=&lt;total&gt; status=READY_FOR_INJECTION</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c5-e3) — Calculateur d'Offset de Buffer Overflow et Agencement de Payload\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Payload 64-bit avec pointeur d'instruction RIP sur 8 octets]\n# Données : BOF_LAYOUT arch=x64 offset=264 sled_len=64 shellcode_len=85\nA_COMPLETER\n\n[Cas 2 — Petit offset sans NOP sled (saut direct au début du shellcode)]\n# Données : BOF_LAYOUT arch=x86 offset=40 sled_len=0 shellcode_len=28\nA_COMPLETER\n\n[Cas 3 — Tampon volumineux sous architecture x64]\n# Données : BOF_LAYOUT arch=x64 offset=1024 sled_len=128 shellcode_len=120\nA_COMPLETER\n",
    "hints": [
      "Identifiez ret_bytes : 4 octets pour x86 et 8 octets pour x64.",
      "Sommez offset + ret_bytes + sled_len + shellcode_len.",
      "Affichez la disposition du payload selon le format demandé."
    ],
    "examples": [
      {
        "stdin": "BOF_LAYOUT arch=x86 offset=112 sled_len=32 shellcode_len=44",
        "expected": "PAYLOAD_LAYOUT: arch=x86 offset=112 ret_bytes=4 sled=32 shellcode=44 total_size=192 status=READY_FOR_INJECTION",
        "note": "Payload x86 standard avec 112 octets de padding et 32 octets de NOP sled."
      }
    ],
    "tests": [
      {
        "label": "Payload 64-bit avec pointeur d'instruction RIP sur 8 octets",
        "stdin": "cas:1",
        "expected": "PAYLOAD_LAYOUT: arch=x64 offset=264 ret_bytes=8 sled=64 shellcode=85 total_size=421 status=READY_FOR_INJECTION"
      },
      {
        "label": "Petit offset sans NOP sled (saut direct au début du shellcode)",
        "stdin": "cas:2",
        "expected": "PAYLOAD_LAYOUT: arch=x86 offset=40 ret_bytes=4 sled=0 shellcode=28 total_size=72 status=READY_FOR_INJECTION"
      },
      {
        "label": "Tampon volumineux sous architecture x64",
        "stdin": "cas:3",
        "expected": "PAYLOAD_LAYOUT: arch=x64 offset=1024 ret_bytes=8 sled=128 shellcode=120 total_size=1280 status=READY_FOR_INJECTION"
      }
    ],
    "solution": "[Exemple]\nPAYLOAD_LAYOUT: arch=x86 offset=112 ret_bytes=4 sled=32 shellcode=44 total_size=192 status=READY_FOR_INJECTION\n\n[Cas 1 — Payload 64-bit avec pointeur d'instruction RIP sur 8 octets]\nPAYLOAD_LAYOUT: arch=x64 offset=264 ret_bytes=8 sled=64 shellcode=85 total_size=421 status=READY_FOR_INJECTION\n\n[Cas 2 — Petit offset sans NOP sled (saut direct au début du shellcode)]\nPAYLOAD_LAYOUT: arch=x86 offset=40 ret_bytes=4 sled=0 shellcode=28 total_size=72 status=READY_FOR_INJECTION\n\n[Cas 3 — Tampon volumineux sous architecture x64]\nPAYLOAD_LAYOUT: arch=x64 offset=1024 ret_bytes=8 sled=128 shellcode=120 total_size=1280 status=READY_FOR_INJECTION"
  }
];
