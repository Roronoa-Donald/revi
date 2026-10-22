'use strict';

module.exports = [
  {
    "id": "hk3-c3-e1",
    "chapter": 3,
    "title": "Interpréteur de Drapeaux TCP et Diagnostic de Sondes de Scan",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les paquets de réponse TCP pour déterminer l'état d'un port selon la RFC 793 et le type de scan Nmap.",
    "brief": "<p>Nmap utilise différents types de sondes TCP pour sonder l'état des ports et cartographier les pare-feux :<br><br>\nRègles de diagnostic selon le scan et la réponse reçue :<br>\n1. <code>SYN</code> (SYN Stealth scan <code>-sS</code>) :<br>\n   - Réponse <code>SYN+ACK</code> : <code>state=OPEN</code><br>\n   - Réponse <code>RST</code> ou <code>RST+ACK</code> : <code>state=CLOSED</code><br>\n   - Réponse <code>TIMEOUT</code> : <code>state=FILTERED</code><br>\n2. <code>FIN</code>, <code>NULL</code>, <code>XMAS</code> (scans furtifs inverses) :<br>\n   - Réponse <code>RST</code> : <code>state=CLOSED</code><br>\n   - Réponse <code>TIMEOUT</code> : <code>state=OPEN|FILTERED</code><br>\n3. <code>ACK</code> (Window/Firewall scan <code>-sA</code>) :<br>\n   - Réponse <code>RST</code> : <code>state=UNFILTERED</code><br>\n   - Réponse <code>TIMEOUT</code> : <code>state=FILTERED</code><br><br>\nDonnées du cas : <code>TCP_PROBE scan_type=&lt;SYN|FIN|NULL|XMAS|ACK&gt; port=&lt;p&gt; reply=&lt;SYN+ACK|RST|TIMEOUT|RST+ACK&gt;</code>.<br>\nRésultat d’analyse attendu : <code>PORT_STATE: port=&lt;p&gt; scan_type=&lt;type&gt; reply=&lt;reply&gt; state=&lt;state&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c3-e1) — Interpréteur de Drapeaux TCP et Diagnostic de Sondes de Scan\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sonde SYN recevant un paquet de réinitialisation RST]\n# Données : TCP_PROBE scan_type=SYN port=21 reply=RST\nA_COMPLETER\n\n[Cas 2 — Sonde furtive XMAS sans réponse face à une pile TCP conforme RFC 793]\n# Données : TCP_PROBE scan_type=XMAS port=80 reply=TIMEOUT\nA_COMPLETER\n\n[Cas 3 — Sonde ACK cartographiant un pare-feu avec paquet RST de retour]\n# Données : TCP_PROBE scan_type=ACK port=8080 reply=RST\nA_COMPLETER\n\n[Cas 4 — Sonde SYN filtrée par pare-feu silencieux (Drop/Timeout)]\n# Données : TCP_PROBE scan_type=SYN port=3389 reply=TIMEOUT\nA_COMPLETER\n",
    "hints": [
      "Gérez les cas selon scan_type (SYN, FIN/NULL/XMAS, ACK).",
      "Pour SYN, SYN+ACK signifie OPEN et RST signifie CLOSED.",
      "Pour FIN/NULL/XMAS, TIMEOUT signifie OPEN|FILTERED et RST signifie CLOSED."
    ],
    "examples": [
      {
        "stdin": "TCP_PROBE scan_type=SYN port=443 reply=SYN+ACK",
        "expected": "PORT_STATE: port=443 scan_type=SYN reply=SYN+ACK state=OPEN",
        "note": "Port HTTPS ouvert renvoyant un paquet SYN+ACK de synchronisation."
      }
    ],
    "tests": [
      {
        "label": "Sonde SYN recevant un paquet de réinitialisation RST",
        "stdin": "cas:1",
        "expected": "PORT_STATE: port=21 scan_type=SYN reply=RST state=CLOSED"
      },
      {
        "label": "Sonde furtive XMAS sans réponse face à une pile TCP conforme RFC 793",
        "stdin": "cas:2",
        "expected": "PORT_STATE: port=80 scan_type=XMAS reply=TIMEOUT state=OPEN|FILTERED"
      },
      {
        "label": "Sonde ACK cartographiant un pare-feu avec paquet RST de retour",
        "stdin": "cas:3",
        "expected": "PORT_STATE: port=8080 scan_type=ACK reply=RST state=UNFILTERED"
      },
      {
        "label": "Sonde SYN filtrée par pare-feu silencieux (Drop/Timeout)",
        "stdin": "cas:4",
        "expected": "PORT_STATE: port=3389 scan_type=SYN reply=TIMEOUT state=FILTERED"
      }
    ],
    "solution": "[Exemple]\nPORT_STATE: port=443 scan_type=SYN reply=SYN+ACK state=OPEN\n\n[Cas 1 — Sonde SYN recevant un paquet de réinitialisation RST]\nPORT_STATE: port=21 scan_type=SYN reply=RST state=CLOSED\n\n[Cas 2 — Sonde furtive XMAS sans réponse face à une pile TCP conforme RFC 793]\nPORT_STATE: port=80 scan_type=XMAS reply=TIMEOUT state=OPEN|FILTERED\n\n[Cas 3 — Sonde ACK cartographiant un pare-feu avec paquet RST de retour]\nPORT_STATE: port=8080 scan_type=ACK reply=RST state=UNFILTERED\n\n[Cas 4 — Sonde SYN filtrée par pare-feu silencieux (Drop/Timeout)]\nPORT_STATE: port=3389 scan_type=SYN reply=TIMEOUT state=FILTERED"
  },
  {
    "id": "hk3-c3-e2",
    "chapter": 3,
    "title": "Analyseur de Bannières de Services Réseau et Détection de Failles Connues",
    "level": "n2",
    "language": "analyse",
    "goal": "Extraire les versions logicielles des bannières de services réseau et identifier les vulnérabilités critiques associées.",
    "brief": "<p>Le banner grabbing permet de repérer des versions logicielles vulnérables avant toute phase d'exploitation.<br><br>\nBase de signatures connues :<br>\n- <code>vsFTPd 2.3.4</code> -> <code>cve=CVE-2011-2523</code>, <code>severity=CRITICAL</code>, <code>desc=Backdoor_Command_Execution</code><br>\n- <code>Apache/2.4.49</code> -> <code>cve=CVE-2021-41773</code>, <code>severity=CRITICAL</code>, <code>desc=Path_Traversal_RCE</code><br>\n- <code>OpenSSH_7.2p2</code> -> <code>cve=CVE-2016-6210</code>, <code>severity=MEDIUM</code>, <code>desc=User_Enumeration</code><br>\n- <code>ProFTPD 1.3.5</code> -> <code>cve=CVE-2015-3306</code>, <code>severity=HIGH</code>, <code>desc=mod_copy_Arbitrary_Copy</code><br>\n- Autre version -> <code>cve=NONE</code>, <code>severity=INFO</code>, <code>desc=UP_TO_DATE_OR_CUSTOM</code><br><br>\nDonnées du cas : <code>BANNER_SCAN port=&lt;p&gt; service=&lt;svc&gt; banner=&lt;texte_banniere&gt;</code>.<br>\nRésultat d’analyse attendu : <code>VULN_MATCH: port=&lt;p&gt; service=&lt;svc&gt; cve=&lt;cve&gt; severity=&lt;sev&gt; desc=&lt;desc&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c3-e2) — Analyseur de Bannières de Services Réseau et Détection de Failles Connues\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Serveur HTTP Apache vulnérable à la traversée de répertoire critique]\n# Données : BANNER_SCAN port=80 service=http banner=Server: Apache/2.4.49 (Unix)\nA_COMPLETER\n\n[Cas 2 — Démon SSH vulnérable à l'énumération de comptes utilisateurs]\n# Données : BANNER_SCAN port=22 service=ssh banner=SSH-2.0-OpenSSH_7.2p2 Ubuntu-4ubuntu2.8\nA_COMPLETER\n\n[Cas 3 — Service FTP ProFTPD avec module mod_copy vulnérable]\n# Données : BANNER_SCAN port=2121 service=ftp banner=220 ProFTPD 1.3.5 Server\nA_COMPLETER\n\n[Cas 4 — Version récente sans vulnérabilité connue répertoriée]\n# Données : BANNER_SCAN port=443 service=https banner=Server: nginx/1.24.0\nA_COMPLETER\n",
    "hints": [
      "Utilisez l’extraction des champs pour préserver les espaces dans le texte de la bannière.",
      "Vérifiez la présence des sous-chaînes de versions critiques dans la bannière.",
      "Générez la sortie standardisée VULN_MATCH."
    ],
    "examples": [
      {
        "stdin": "BANNER_SCAN port=21 service=ftp banner=220 (vsFTPd 2.3.4)",
        "expected": "VULN_MATCH: port=21 service=ftp cve=CVE-2011-2523 severity=CRITICAL desc=Backdoor_Command_Execution",
        "note": "Backdoor historique du serveur FTP vsFTPd 2.3.4 permettant l'exécution root."
      }
    ],
    "tests": [
      {
        "label": "Serveur HTTP Apache vulnérable à la traversée de répertoire critique",
        "stdin": "cas:1",
        "expected": "VULN_MATCH: port=80 service=http cve=CVE-2021-41773 severity=CRITICAL desc=Path_Traversal_RCE"
      },
      {
        "label": "Démon SSH vulnérable à l'énumération de comptes utilisateurs",
        "stdin": "cas:2",
        "expected": "VULN_MATCH: port=22 service=ssh cve=CVE-2016-6210 severity=MEDIUM desc=User_Enumeration"
      },
      {
        "label": "Service FTP ProFTPD avec module mod_copy vulnérable",
        "stdin": "cas:3",
        "expected": "VULN_MATCH: port=2121 service=ftp cve=CVE-2015-3306 severity=HIGH desc=mod_copy_Arbitrary_Copy"
      },
      {
        "label": "Version récente sans vulnérabilité connue répertoriée",
        "stdin": "cas:4",
        "expected": "VULN_MATCH: port=443 service=https cve=NONE severity=INFO desc=UP_TO_DATE_OR_CUSTOM"
      }
    ],
    "solution": "[Exemple]\nVULN_MATCH: port=21 service=ftp cve=CVE-2011-2523 severity=CRITICAL desc=Backdoor_Command_Execution\n\n[Cas 1 — Serveur HTTP Apache vulnérable à la traversée de répertoire critique]\nVULN_MATCH: port=80 service=http cve=CVE-2021-41773 severity=CRITICAL desc=Path_Traversal_RCE\n\n[Cas 2 — Démon SSH vulnérable à l'énumération de comptes utilisateurs]\nVULN_MATCH: port=22 service=ssh cve=CVE-2016-6210 severity=MEDIUM desc=User_Enumeration\n\n[Cas 3 — Service FTP ProFTPD avec module mod_copy vulnérable]\nVULN_MATCH: port=2121 service=ftp cve=CVE-2015-3306 severity=HIGH desc=mod_copy_Arbitrary_Copy\n\n[Cas 4 — Version récente sans vulnérabilité connue répertoriée]\nVULN_MATCH: port=443 service=https cve=NONE severity=INFO desc=UP_TO_DATE_OR_CUSTOM"
  },
  {
    "id": "hk3-c3-e3",
    "chapter": 3,
    "title": "Simulateur d'Audit SNMP et Détection de Communautés Vulnérables",
    "level": "n3",
    "language": "analyse",
    "goal": "Auditer les chaînes de communauté SNMP d'un commutateur ou routeur et classifier le niveau de compromission.",
    "brief": "<p>SNMP v1 et v2c transmettent les chaînes de communauté en clair sans chiffrement.<br><br>\nRègles d'évaluation :<br>\n- On teste successivement chaque chaîne de la liste de dictionnaires <code>wordlist</code> contre la cible.<br>\n- Si une chaîne correspond à <code>target_community</code> :<br>\n  - Si <code>target_perm == 'RW'</code> : <code>status=COMPROMISED</code>, <code>risk=CRITICAL</code> (modification d'équipement possible).<br>\n  - Si <code>target_perm == 'RO'</code> : <code>status=COMPROMISED</code>, <code>risk=HIGH</code> (fuite complète d'arborescence MIB).<br>\n- Si aucune chaîne ne correspond :<br>\n  - <code>status=SECURE</code>, <code>risk=LOW</code>.<br><br>\nDonnées du cas : <code>SNMP_TEST target=&lt;ip&gt; wordlist=&lt;w1,w2,...&gt; target_community=&lt;comm&gt; target_perm=&lt;RO|RW&gt; sys_descr=&lt;descr&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n- Si compromis : <code>SNMP_AUDIT: target=&lt;ip&gt; status=COMPROMISED matched_community=&lt;comm&gt; perm=&lt;perm&gt; attempts=&lt;N&gt; risk=&lt;risk&gt; sys_descr=&lt;descr&gt;</code><br>\n- Si non compromis : <code>SNMP_AUDIT: target=&lt;ip&gt; status=SECURE attempts=&lt;N&gt; risk=LOW reason=COMMUNITY_NOT_FOUND</code></p>",
    "starter": "# Grille d'analyse (hk3-c3-e3) — Simulateur d'Audit SNMP et Détection de Communautés Vulnérables\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chaîne de communauté d'écriture Read-Write découverte au troisième essai]\n# Données : SNMP_TEST target=10.0.0.254 wordlist=public,cisco,private,switch target_community=private target_perm=RW sys_descr=Juniper_EX4300\nA_COMPLETER\n\n[Cas 2 — Cible robuste dont la chaîne n'est pas dans le dictionnaire testé]\n# Données : SNMP_TEST target=172.16.1.1 wordlist=public,private,secret target_community=complex_snmp_9821 target_perm=RO sys_descr=Linux_Router\nA_COMPLETER\n\n[Cas 3 — Dictionnaire volumineux arrêtant la recherche dès la première correspondance]\n# Données : SNMP_TEST target=192.168.100.10 wordlist=manager,monitor,operator target_community=monitor target_perm=RO sys_descr=HP_ProCurve\nA_COMPLETER\n",
    "hints": [
      "Découpez wordlist sur la virgule et itérez dans l'ordre.",
      "Dès qu'un mot correspond à target_community, arrêtez-vous et notez le nombre d'essais effectués.",
      "Si target_perm == RW -> risk=CRITICAL, sinon risk=HIGH."
    ],
    "examples": [
      {
        "stdin": "SNMP_TEST target=192.168.1.1 wordlist=public,private,cisco,admin target_community=public target_perm=RO sys_descr=Cisco_IOS_Software_C2960",
        "expected": "SNMP_AUDIT: target=192.168.1.1 status=COMPROMISED matched_community=public perm=RO attempts=1 risk=HIGH sys_descr=Cisco_IOS_Software_C2960",
        "note": "Chaîne publique par défaut permettant la lecture intégrale des interfaces et tables ARP."
      }
    ],
    "tests": [
      {
        "label": "Chaîne de communauté d'écriture Read-Write découverte au troisième essai",
        "stdin": "cas:1",
        "expected": "SNMP_AUDIT: target=10.0.0.254 status=COMPROMISED matched_community=private perm=RW attempts=3 risk=CRITICAL sys_descr=Juniper_EX4300"
      },
      {
        "label": "Cible robuste dont la chaîne n'est pas dans le dictionnaire testé",
        "stdin": "cas:2",
        "expected": "SNMP_AUDIT: target=172.16.1.1 status=SECURE attempts=3 risk=LOW reason=COMMUNITY_NOT_FOUND"
      },
      {
        "label": "Dictionnaire volumineux arrêtant la recherche dès la première correspondance",
        "stdin": "cas:3",
        "expected": "SNMP_AUDIT: target=192.168.100.10 status=COMPROMISED matched_community=monitor perm=RO attempts=2 risk=HIGH sys_descr=HP_ProCurve"
      }
    ],
    "solution": "[Exemple]\nSNMP_AUDIT: target=192.168.1.1 status=COMPROMISED matched_community=public perm=RO attempts=1 risk=HIGH sys_descr=Cisco_IOS_Software_C2960\n\n[Cas 1 — Chaîne de communauté d'écriture Read-Write découverte au troisième essai]\nSNMP_AUDIT: target=10.0.0.254 status=COMPROMISED matched_community=private perm=RW attempts=3 risk=CRITICAL sys_descr=Juniper_EX4300\n\n[Cas 2 — Cible robuste dont la chaîne n'est pas dans le dictionnaire testé]\nSNMP_AUDIT: target=172.16.1.1 status=SECURE attempts=3 risk=LOW reason=COMMUNITY_NOT_FOUND\n\n[Cas 3 — Dictionnaire volumineux arrêtant la recherche dès la première correspondance]\nSNMP_AUDIT: target=192.168.100.10 status=COMPROMISED matched_community=monitor perm=RO attempts=2 risk=HIGH sys_descr=HP_ProCurve"
  }
];
