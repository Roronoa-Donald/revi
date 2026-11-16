'use strict';

module.exports = [
  {
    "id": "hk3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le scan Nmap autorisé du serveur de la scierie Dumoulin",
    "exampleTitle": "Exemple résolu — le scan du serveur de la boulangerie Lemieux",
    "goal": "Lire un résultat Nmap : compter les ports ouverts, identifier les services et distinguer filtré et fermé.",
    "brief": "<p><strong>Énoncé.</strong> La scierie Dumoulin confie à l'ESN Cortège le test d'intrusion de son serveur d'hébergement interne, <code>10.20.30.5</code>, depuis le réseau de test prévu au contrat. L'auditeur lance <code>nmap -sV 10.20.30.5</code> et obtient l'extrait suivant :</p><table><tr><th>Port</th><th>État</th><th>Service et version</th></tr><tr><th>22/tcp</th><td>open</td><td>ssh — OpenSSH 8.9p1</td></tr><tr><th>80/tcp</th><td>open</td><td>http — Apache httpd 2.4.54</td></tr><tr><th>443/tcp</th><td>open</td><td>https — Apache httpd 2.4.54</td></tr><tr><th>3306/tcp</th><td>filtered</td><td>mysql — filtré par le pare-feu</td></tr><tr><th>8080/tcp</th><td>closed</td><td>http-proxy — aucun service</td></tr></table><ol><li>Combien de ports sont à l'état « open » ?</li><li>Quel service écoute sur le port 22 ?</li><li>Quel est l'état du port 3306 ?</li><li>Combien de ports ne sont pas ouverts (fermés ou filtrés) ?</li><li>Quelle version d'Apache le scan révèle-t-il ?</li><li>Comment se nomme le type de scan Nmap qui établit une connexion TCP complète, utilisable sans privilèges root mais peu furtif ?</li></ol>",
    "starter": "# Exercice — Le scan Nmap autorisé du serveur de la scierie Dumoulin\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : un nombre, un mot ou une version. Question 6 : le nom d'un scan.\n\n[Question 1 — Ports à l'état open]\nA_COMPLETER\n\n[Question 2 — Service écoutant sur le port 22]\nA_COMPLETER\n\n[Question 3 — État du port 3306]\nA_COMPLETER\n\n[Question 4 — Ports non ouverts (fermés ou filtrés)]\nA_COMPLETER\n\n[Question 5 — Version d'Apache révélée]\nA_COMPLETER\n\n[Question 6 — Scan Nmap établissant une connexion TCP complète]\nA_COMPLETER\n",
    "hints": [
      "Parcourez la colonne « État » : open, filtered et closed ne racontent pas la même histoire (service joignable, pare-feu silencieux, port vide).",
      "Un port filtré ne répond pas franchement au scanner : c'est souvent un pare-feu qui laisse la requête sans réponse.",
      "Le scan furtif de référence (-sS) n'achève pas la poignée de main TCP ; celui qui l'achève s'appelle tout simplement « connect »."
    ],
    "examples": [
      {
        "stdin": "La boulangerie Lemieux fait auditer son serveur 10.0.5.21. Extrait de nmap -sV :\n21/tcp open ftp vsftpd 3.0.5 ; 22/tcp open ssh OpenSSH 9.2 ; 80/tcp open http nginx 1.25 ;\n443/tcp filtered https ; 3306/tcp closed mysql.\n\n1) 3 ports ouverts. 2) Le service du port 21 est ftp. 3) Le port 443 est filtré.\n4) 2 ports non ouverts. 5) nginx 1.25. 6) Le scan complet s'appelle le scan connect.",
        "expected": "3 ports ouverts — ftp sur 21 — filtré — 2 non ouverts — nginx 1.25 — scan connect",
        "note": "Le port 3306 fermé chez Dumoulin et filtré chez Lemieux traduisent deux réalités différentes : absence de service devant un refus franc, ou pare-feu muet."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ports à l'état open",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Service du port 22",
        "stdin": "q:2",
        "expected": "ssh||le ssh||SSH"
      },
      {
        "label": "Question 3 — État du port 3306",
        "stdin": "q:3",
        "expected": "filtré||filtered||filtre"
      },
      {
        "label": "Question 4 — Ports non ouverts",
        "stdin": "q:4",
        "expected": "2||deux"
      },
      {
        "label": "Question 5 — Version d'Apache",
        "stdin": "q:5",
        "expected": "2.4.54||2,4,54||apache 2.4.54"
      },
      {
        "label": "Question 6 — Scan TCP complet",
        "stdin": "q:6",
        "expected": "connect||le scan connect||scan connect||sT||-sT"
      }
    ],
    "solution": "[Question 1 — Ports à l'état open]\n3\n\n[Question 2 — Service écoutant sur le port 22]\nssh\n\n[Question 3 — État du port 3306]\nfiltré\n\n[Question 4 — Ports non ouverts (fermés ou filtrés)]\n2\n\n[Question 5 — Version d'Apache révélée]\n2.4.54\n\n[Question 6 — Scan Nmap établissant une connexion TCP complète]\nconnect",
    "takeaway": "1) Trois ports sont ouverts : 22, 80 et 443.\n2) Le port 22 fait écouter le service ssh (OpenSSH 8.9p1).\n3) Le port 3306 est filtré : un pare-feu laisse la requête sans réponse franche.\n4) Deux ports ne sont pas ouverts : 3306 (filtré) et 8080 (fermé).\n5) Le scan révèle Apache httpd 2.4.54, une version à confronter aux bases de vulnérabilités.\n6) Le scan connect (-sT) établit une connexion TCP complète ; il ne demande pas de privilèges root mais se voit facilement dans les journaux.\nContrôle : 3 ports ouverts + 2 ports non ouverts = 5 lignes du tableau, l'inventaire est complet."
  },
  {
    "id": "hk3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les bannières obsolètes du serveur de recette de DevFan",
    "exampleTitle": "Exemple résolu — les bannières du serveur de la mairie de Fressin",
    "goal": "Comparer les bannières de services aux versions stables pour chiffrer l'exposition aux failles connues.",
    "brief": "<p><strong>Énoncé.</strong> L'agence DevFan fait auditer son serveur de recette, isolé de la production, dans le cadre d'un test d'intrusion contracté. L'auditeur collecte les bannières des services et les compare aux dernières versions stables :</p><table><tr><th>Service</th><th>Bannière relevée</th><th>Version stable</th><th>Faille connue sur la version</th></tr><tr><th>SSH</th><td>OpenSSH 7.4p1</td><td>9.6p1</td><td>Énumération d'utilisateurs</td></tr><tr><th>FTP</th><td>vsftpd 2.3.4</td><td>3.0.5</td><td>Porte dérobée menant à une exécution de code</td></tr><tr><th>SMB</th><td>Samba 3.0.20</td><td>4.19.0</td><td>Exécution de commande à distance</td></tr><tr><th>HTTP</th><td>nginx 1.25.3</td><td>1.25.3</td><td>Aucune connue</td></tr></table><ol><li>Combien de services tournent sur une version obsolète ?</li><li>Quel service est à jour ?</li><li>Combien de services obsolètes exposent une exécution de code à distance ?</li><li>Quelle version de Samba est en service ?</li><li>Quel protocole de partage de fichiers, historiquement lié à Windows, est concerné ?</li><li>Quelle option de Nmap exécute les scripts NSE de détection de vulnérabilités ?</li></ol>",
    "starter": "# Exercice — Les bannières obsolètes du serveur de recette de DevFan\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 : un nombre. Question 2, 5 : un service. Question 4 : une version. Question 6 : une option.\n\n[Question 1 — Services en version obsolète]\nA_COMPLETER\n\n[Question 2 — Service à jour]\nA_COMPLETER\n\n[Question 3 — Services obsolètes avec exécution de code]\nA_COMPLETER\n\n[Question 4 — Version de Samba en service]\nA_COMPLETER\n\n[Question 5 — Protocole de partage de fichiers concerné]\nA_COMPLETER\n\n[Question 6 — Option Nmap des scripts de vulnérabilités]\nA_COMPLETER\n",
    "hints": [
      "Comparez colonne « Bannière relevée » et colonne « Version stable » : un service est à jour quand les deux coïncident.",
      "Ne comptez que les failles qui mènent à une exécution de code : l'énumération d'utilisateurs est gênante mais n'exécute rien.",
      "Le protocole de partage de fichiers de l'écosystème Windows porte un sigle de trois lettres ; les scripts NSE de vulnérabilités se lancent avec l'option --script vuln."
    ],
    "examples": [
      {
        "stdin": "La mairie de Fressin audite son serveur. Bannières relevées :\nSSH OpenSSH 8.2 (stable 9.6 — énumération d'utilisateurs) ;\nFTP vsftpd 3.0.5 (stable 3.0.5 — aucune) ;\nSMB Samba 4.17 (stable 4.19 — exécution de commande à distance) ;\nHTTP Apache 2.4.49 (stable 2.4.58 — traversée de chemin).\n\n1) 3 services obsolètes. 2) Le FTP est à jour. 3) 1 seul service expose une exécution de commande (Samba).\n4) Samba 4.17. 5) SMB. 6) --script vuln.",
        "expected": "3 obsolètes — FTP à jour — 1 exécution de commande — Samba 4.17 — SMB — --script vuln",
        "note": "La traversée de chemin d'Apache n'est pas une exécution de code : le compte des risques critiques doit rester strict."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Services obsolètes",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Service à jour",
        "stdin": "q:2",
        "expected": "nginx||http||le service http||le http"
      },
      {
        "label": "Question 3 — Services avec exécution de code à distance",
        "stdin": "q:3",
        "expected": "2||deux"
      },
      {
        "label": "Question 4 — Version de Samba",
        "stdin": "q:4",
        "expected": "3.0.20||3,0,20||samba 3.0.20"
      },
      {
        "label": "Question 5 — Protocole de partage de fichiers",
        "stdin": "q:5",
        "expected": "smb||SMB||le smb"
      },
      {
        "label": "Question 6 — Option Nmap des scripts de vulnérabilités",
        "stdin": "q:6",
        "expected": "--script vuln||script vuln||vuln||l'option vuln"
      }
    ],
    "solution": "[Question 1 — Services en version obsolète]\n3\n\n[Question 2 — Service à jour]\nnginx\n\n[Question 3 — Services obsolètes avec exécution de code]\n2\n\n[Question 4 — Version de Samba en service]\n3.0.20\n\n[Question 5 — Protocole de partage de fichiers concerné]\nsmb\n\n[Question 6 — Option Nmap des scripts de vulnérabilités]\n--script vuln",
    "takeaway": "1) Trois services sont obsolètes : OpenSSH 7.4p1 (stable 9.6p1), vsftpd 2.3.4 (stable 3.0.5) et Samba 3.0.20 (stable 4.19.0).\n2) nginx 1.25.3 coïncide avec la version stable : c'est le seul service à jour.\n3) Deux services obsolètes exposent une exécution de code à distance : vsftpd 2.3.4 (porte dérobée) et Samba 3.0.20.\n4) La version de Samba en service est 3.0.20.\n5) Samba implémente SMB, le protocole de partage de fichiers historiquement lié à Windows.\n6) L'option --script vuln exécute les scripts NSE de détection de vulnérabilités.\nContrôle : 4 services audités − 1 à jour = 3 obsolètes, dont 2 avec exécution de code et 1 avec énumération d'utilisateurs : le compte est cohérent."
  },
  {
    "id": "hk3-c3-e3",
    "chapter": 3,
    "title": "Recherche simulée dans une liste de communautés SNMP",
    "level": "n3",
    "language": "analyse",
    "goal": "Comparer des chaînes fictives sans conclure au niveau de sécurité d’un service.",
    "brief": "<p>Dans cette simulation, comparer successivement les chaînes de <code>wordlist</code> à <code>target_community</code> et arrêter à la première correspondance. Le résultat ne prouve pas qu’un service réel est sûr, compromis ou qu’un niveau de risque particulier s’applique ; d’autres configurations et contrôles doivent être examinés. Toute vérification réelle exige une autorisation.</p><p>Données : <code>SNMP_TEST target=&lt;ip&gt; wordlist=&lt;liste&gt; target_community=&lt;chaine&gt; target_perm=&lt;RO|RW&gt; sys_descr=&lt;description&gt;</code>.<br>Si trouvée : <code>SNMP_AUDIT: target=&lt;ip&gt; status=TROUVEE matched_community=&lt;chaine&gt; perm=&lt;RO|RW&gt; attempts=&lt;n&gt; risk=NON_EVALUE sys_descr=&lt;description&gt;</code>.<br>Sinon : <code>SNMP_AUDIT: target=&lt;ip&gt; status=NON_TROUVEE attempts=&lt;n&gt; risk=NON_EVALUE</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c3-e3) — Recherche simulée dans une liste de communautés SNMP\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Correspondance au troisième essai]\n# Données : SNMP_TEST target=10.0.0.254 wordlist=public,cisco,private,switch target_community=private target_perm=RW sys_descr=Juniper_EX4300\nA_COMPLETER\n\n[Cas 2 — Aucune correspondance dans la liste]\n# Données : SNMP_TEST target=172.16.1.1 wordlist=public,private,secret target_community=complex_snmp_9821 target_perm=RO sys_descr=Linux_Router\nA_COMPLETER\n\n[Cas 3 — Correspondance au deuxième essai]\n# Données : SNMP_TEST target=192.168.100.10 wordlist=manager,monitor,operator target_community=monitor target_perm=RO sys_descr=HP_ProCurve\nA_COMPLETER\n",
    "hints": [
      "Compter les essais jusqu’à la première correspondance, ou toute la liste si aucune chaîne ne correspond.",
      "Ne déduire aucun risque global du seul résultat.",
      "Balayez la liste fournie et signalez uniquement les chaînes de communauté présentes ; l absence ou présence dans cette liste fictive ne suffit pas à auditer un hôte."
    ],
    "examples": [
      {
        "stdin": "SNMP_TEST target=192.168.1.1 wordlist=public,private,cisco,admin target_community=public target_perm=RO sys_descr=Cisco_IOS_Software_C2960",
        "expected": "SNMP_AUDIT: target=192.168.1.1 status=TROUVEE matched_community=public perm=RO attempts=1 risk=NON_EVALUE sys_descr=Cisco_IOS_Software_C2960",
        "note": "La première chaîne correspond dans ce scénario fictif ; les droits réels ne sont pas évalués."
      }
    ],
    "tests": [
      {
        "label": "Correspondance au troisième essai",
        "stdin": "cas:1",
        "expected": "SNMP_AUDIT: target=10.0.0.254 status=TROUVEE matched_community=private perm=RW attempts=3 risk=NON_EVALUE sys_descr=Juniper_EX4300"
      },
      {
        "label": "Aucune correspondance dans la liste",
        "stdin": "cas:2",
        "expected": "SNMP_AUDIT: target=172.16.1.1 status=NON_TROUVEE attempts=3 risk=NON_EVALUE"
      },
      {
        "label": "Correspondance au deuxième essai",
        "stdin": "cas:3",
        "expected": "SNMP_AUDIT: target=192.168.100.10 status=TROUVEE matched_community=monitor perm=RO attempts=2 risk=NON_EVALUE sys_descr=HP_ProCurve"
      }
    ],
    "solution": "[Exemple]\nSNMP_AUDIT: target=192.168.1.1 status=TROUVEE matched_community=public perm=RO attempts=1 risk=NON_EVALUE sys_descr=Cisco_IOS_Software_C2960\n\n[Cas 1 — Correspondance au troisième essai]\nSNMP_AUDIT: target=10.0.0.254 status=TROUVEE matched_community=private perm=RW attempts=3 risk=NON_EVALUE sys_descr=Juniper_EX4300\n\n[Cas 2 — Aucune correspondance dans la liste]\nSNMP_AUDIT: target=172.16.1.1 status=NON_TROUVEE attempts=3 risk=NON_EVALUE\n\n[Cas 3 — Correspondance au deuxième essai]\nSNMP_AUDIT: target=192.168.100.10 status=TROUVEE matched_community=monitor perm=RO attempts=2 risk=NON_EVALUE sys_descr=HP_ProCurve\n",
    "takeaway": "À retenir : Comparer des chaînes fictives sans conclure au niveau de sécurité d’un service.\nRepère : La première chaîne correspond dans ce scénario fictif ; les droits réels ne sont pas évalués."
  }
];
