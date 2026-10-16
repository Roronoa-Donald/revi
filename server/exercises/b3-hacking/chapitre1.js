'use strict';

module.exports = [
  {
    "id": "hk3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de Score CVSS v3.1 Base Metrics",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le sous-score d'exploitabilité, d'impact et le Base Score CVSS v3.1 d'une vulnérabilité avec sa sévérité.",
    "brief": "<p>Le standard CVSS v3.1 (Common Vulnerability Scoring System) quantifie la sévérité d'une faille de sécurité.<br><br>\nMétriques de base (Scope Unchanged 'U') :<br>\n- <code>AV</code> (Attack Vector) : Network (N)=0.85, Adjacent (A)=0.62, Local (L)=0.55, Physical (P)=0.20<br>\n- <code>AC</code> (Attack Complexity) : Low (L)=0.77, High (H)=0.44<br>\n- <code>PR</code> (Privileges Required) : None (N)=0.85, Low (L)=0.62, High (H)=0.27<br>\n- <code>UI</code> (User Interaction) : None (N)=0.85, Required (R)=0.62<br>\n- <code>C, I, A</code> (Confidentiality, Integrity, Availability) : None (N)=0.0, Low (L)=0.22, High (H)=0.56<br><br>\nFormules (Scope Unchanged) :<br>\n1. <code>Exploitability = 8.22 * AV * AC * PR * UI</code><br>\n2. <code>ISS = 1.0 - ((1.0 - C) * (1.0 - I) * (1.0 - A))</code><br>\n3. <code>Impact = 6.42 * ISS</code><br>\n4. Si <code>Impact &lt;= 0</code> : <code>BaseScore = 0.0</code><br>\n   Sinon : <code>BaseScore = min(10.0, math.ceil(round(Impact + Exploitability, 4) * 10) / 10.0)</code><br><br>\nSévérités CVSS v3.1 :<br>\n- <code>0.0</code> : <code>NONE</code><br>\n- <code>0.1 à 3.9</code> : <code>LOW</code><br>\n- <code>4.0 à 6.9</code> : <code>MEDIUM</code><br>\n- <code>7.0 à 8.9</code> : <code>HIGH</code><br>\n- <code>9.0 à 10.0</code> : <code>CRITICAL</code><br><br>\nEntrée STDIN : <code>CVSS_CALC AV=&lt;N|A|L|P&gt; AC=&lt;L|H&gt; PR=&lt;N|L|H&gt; UI=&lt;N|R&gt; C=&lt;N|L|H&gt; I=&lt;N|L|H&gt; A=&lt;N|L|H&gt;</code>.<br>\nSortie : <code>CVSS: exploitability=&lt;exp:.2f&gt; impact=&lt;imp:.2f&gt; base_score=&lt;score:.1f&gt; severity=&lt;sev&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c1-e1) — Calculateur de Score CVSS v3.1 Base Metrics\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vulnérabilité locale avec interaction utilisateur et impact moyen]\n# Données : CVSS_CALC AV=L AC=L PR=N UI=R C=L I=L A=N\nA_COMPLETER\n\n[Cas 2 — Vulnérabilité réseau complexe nécessitant hauts privilèges]\n# Données : CVSS_CALC AV=N AC=H PR=H UI=N C=H I=N A=N\nA_COMPLETER\n\n[Cas 3 — Aucun impact de sécurité (Impact nul -> score 0.0)]\n# Données : CVSS_CALC AV=N AC=L PR=N UI=N C=N I=N A=N\nA_COMPLETER\n",
    "hints": [
      "Créez des dictionnaires pour les pondérations numériques de chaque métrique.",
      "Calculez ISS = 1.0 - ((1.0 - C) * (1.0 - I) * (1.0 - A)) puis Impact = 6.42 * ISS.",
      "Arrondissez au dixième supérieur : math.ceil(round(Impact + Exploitability, 4) * 10) / 10.0."
    ],
    "examples": [
      {
        "stdin": "CVSS_CALC AV=N AC=L PR=N UI=N C=H I=H A=H",
        "expected": "CVSS: exploitability=3.89 impact=5.87 base_score=9.8 severity=CRITICAL",
        "note": "RCE non-authentifiée à distance critique maximale (Impact et exploitabilité élevés)."
      }
    ],
    "tests": [
      {
        "label": "Vulnérabilité locale avec interaction utilisateur et impact moyen",
        "stdin": "cas:1",
        "expected": "CVSS: exploitability=1.83 impact=2.51 base_score=4.4 severity=MEDIUM"
      },
      {
        "label": "Vulnérabilité réseau complexe nécessitant hauts privilèges",
        "stdin": "cas:2",
        "expected": "CVSS: exploitability=0.71 impact=3.60 base_score=4.4 severity=MEDIUM"
      },
      {
        "label": "Aucun impact de sécurité (Impact nul -> score 0.0)",
        "stdin": "cas:3",
        "expected": "CVSS: exploitability=3.89 impact=0.00 base_score=0.0 severity=NONE"
      }
    ],
    "solution": "[Exemple]\nCVSS: exploitability=3.89 impact=5.87 base_score=9.8 severity=CRITICAL\n\n[Cas 1 — Vulnérabilité locale avec interaction utilisateur et impact moyen]\nCVSS: exploitability=1.83 impact=2.51 base_score=4.4 severity=MEDIUM\n\n[Cas 2 — Vulnérabilité réseau complexe nécessitant hauts privilèges]\nCVSS: exploitability=0.71 impact=3.60 base_score=4.4 severity=MEDIUM\n\n[Cas 3 — Aucun impact de sécurité (Impact nul -> score 0.0)]\nCVSS: exploitability=3.89 impact=0.00 base_score=0.0 severity=NONE"
  },
  {
    "id": "hk3-c1-e2",
    "chapter": 1,
    "title": "Validateur de Règles d'Engagement (RoE) et Périmètre d'Audit",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier qu'une action d'audit de sécurité respecte le contrat de mandat de pentest (IP, ports, techniques interdites, créneau horaire).",
    "brief": "<p>Dans un test d'intrusion éthique, toute action en dehors des Règles d'Engagement (RoE) constitue une faute juridique grave (art. 323-1 du Code Pénal).<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>ROE_CONFIG target_ips=&lt;ip1,ip2,...&gt; allowed_ports=&lt;p1,p2,...&gt; forbidden_techniques=&lt;t1,t2,...&gt; window=&lt;start_h-end_h&gt;</code> : configure le périmètre.<br>\n2. <code>AUDIT_ACTION ip=&lt;ip&gt; port=&lt;p&gt; technique=&lt;tech&gt; hour=&lt;h&gt;</code> : soumet une action à validation.<br><br>\nRègles de validation (évaluées dans cet ordre précis) :<br>\n1. Si l'IP n'est pas dans <code>target_ips</code> : <code>DENIED: reason=OUT_OF_SCOPE_IP target=&lt;ip&gt;</code><br>\n2. Si le port n'est pas dans <code>allowed_ports</code> : <code>DENIED: reason=FORBIDDEN_PORT port=&lt;p&gt;</code><br>\n3. Si la technique est dans <code>forbidden_techniques</code> : <code>DENIED: reason=PROHIBITED_TECHNIQUE technique=&lt;tech&gt;</code><br>\n4. Si l'heure <code>h</code> est strictement hors créneau <code>start_h &lt;= h &lt;= end_h</code> : <code>DENIED: reason=OUTSIDE_TIME_WINDOW hour=&lt;h&gt;</code><br>\n5. Sinon : <code>PERMITTED: target=&lt;ip&gt;:&lt;p&gt; technique=&lt;tech&gt; status=AUTHORIZED</code></p>",
    "starter": "# Grille d'analyse (hk3-c1-e2) — Validateur de Règles d'Engagement (RoE) et Périmètre d'Audit\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet IP hors périmètre (Out of scope)]\n# Données : ROE_CONFIG target_ips=10.0.0.5 allowed_ports=80,443 forbidden_techniques=DOS window=09-17\n# Données : AUDIT_ACTION ip=10.0.0.99 port=80 technique=DIR_BRUTEFORCE hour=10\nA_COMPLETER\n\n[Cas 2 — Rejet technique prohibée par le mandat (Déni de service)]\n# Données : ROE_CONFIG target_ips=172.16.0.10 allowed_ports=80,443 forbidden_techniques=DOS,EXPLOIT_BRUTEFORCE window=08-20\n# Données : AUDIT_ACTION ip=172.16.0.10 port=80 technique=DOS hour=11\nA_COMPLETER\n\n[Cas 3 — Rejet action exécutée en dehors de la fenêtre horaire convenue]\n# Données : ROE_CONFIG target_ips=192.168.10.50 allowed_ports=22,80 forbidden_techniques=EXPLOIT_UNAPPROVED window=20-23\n# Données : AUDIT_ACTION ip=192.168.10.50 port=22 technique=SSH_AUDIT hour=15\nA_COMPLETER\n",
    "hints": [
      "Stockez target_ips, allowed_ports et forbidden_techniques sous forme d'ensembles (set) pour des tests efficaces.",
      "Découpez window sur le tiret pour obtenir start_h et end_h convertis en int.",
      "Validez les conditions séquentiellement dès qu'une règle de sécurité est violée."
    ],
    "examples": [
      {
        "stdin": "ROE_CONFIG target_ips=192.168.1.10,192.168.1.20 allowed_ports=80,443,22 forbidden_techniques=DOS,SOCIAL_ENG window=08-18\nAUDIT_ACTION ip=192.168.1.10 port=443 technique=PORT_SCAN hour=14",
        "expected": "PERMITTED: target=192.168.1.10:443 technique=PORT_SCAN status=AUTHORIZED",
        "note": "Action autorisée dans le périmètre et pendant le créneau contractuel."
      }
    ],
    "tests": [
      {
        "label": "Rejet IP hors périmètre (Out of scope)",
        "stdin": "cas:1",
        "expected": "DENIED: reason=OUT_OF_SCOPE_IP target=10.0.0.99"
      },
      {
        "label": "Rejet technique prohibée par le mandat (Déni de service)",
        "stdin": "cas:2",
        "expected": "DENIED: reason=PROHIBITED_TECHNIQUE technique=DOS"
      },
      {
        "label": "Rejet action exécutée en dehors de la fenêtre horaire convenue",
        "stdin": "cas:3",
        "expected": "DENIED: reason=OUTSIDE_TIME_WINDOW hour=15"
      }
    ],
    "solution": "[Exemple]\nPERMITTED: target=192.168.1.10:443 technique=PORT_SCAN status=AUTHORIZED\n\n[Cas 1 — Rejet IP hors périmètre (Out of scope)]\nDENIED: reason=OUT_OF_SCOPE_IP target=10.0.0.99\n\n[Cas 2 — Rejet technique prohibée par le mandat (Déni de service)]\nDENIED: reason=PROHIBITED_TECHNIQUE technique=DOS\n\n[Cas 3 — Rejet action exécutée en dehors de la fenêtre horaire convenue]\nDENIED: reason=OUTSIDE_TIME_WINDOW hour=15"
  },
  {
    "id": "hk3-c1-e3",
    "chapter": 1,
    "title": "Moteur de Corrélation Cyber Kill Chain & Détection d'Attaque",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser une séquence d'événements de sécurité, reconstituer les phases de la Cyber Kill Chain et évaluer la complétude de l'intrusion.",
    "brief": "<p>Le modèle Cyber Kill Chain (Lockheed Martin) formalise les étapes successives d'une cyberattaque ciblée (APT) :<br>\n1. <code>RECON</code> (Reconnaissance)<br>\n2. <code>WEAPON</code> (Weaponization)<br>\n3. <code>DELIVERY</code> (Delivery)<br>\n4. <code>EXPLOIT</code> (Exploitation)<br>\n5. <code>INSTALL</code> (Installation / Persistance)<br>\n6. <code>C2</code> (Command & Control)<br>\n7. <code>ACTIONS</code> (Actions on Objectives / Exfiltration)<br><br>\nEntrée STDIN : <code>KILLCHAIN_EVAL events=&lt;e1:p1,e2:p2,...&gt;</code>.<br>\nSortie :<br>\n<code>KILLCHAIN: total_events=&lt;N&gt; phases_identified=&lt;count&gt;/7 highest_phase=&lt;phase&gt; coverage_pct=&lt;pct&gt;% status=&lt;COMPLETE_KILL_CHAIN|PARTIAL_ATTACK&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c1-e3) — Moteur de Corrélation Cyber Kill Chain & Détection d'Attaque\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Attaque stoppée à la phase d'exploitation]\n# Données : KILLCHAIN_EVAL events=osint_scan:RECON,spear_phish:DELIVERY,buffer_overflow:EXPLOIT\nA_COMPLETER\n\n[Cas 2 — Événements répétés sur phases initiales de reconnaissance]\n# Données : KILLCHAIN_EVAL events=shodan_query:RECON,subdomain_fuzz:RECON,port_scan:RECON\nA_COMPLETER\n\n[Cas 3 — Attaque atteignant le canal de commande et contrôle C2]\n# Données : KILLCHAIN_EVAL events=nmap_scan:RECON,malicious_pdf:DELIVERY,cve_exploit:EXPLOIT,reverse_shell:C2\nA_COMPLETER\n",
    "hints": [
      "Définissez les 7 phases ordonnées dans une liste et calculez l'indice maximum atteint.",
      "Identifiez les phases uniques observées pour calculer coverage_pct = int((len(unique_phases) / 7.0) * 100).",
      "Si len(unique_phases) == 7 : status = COMPLETE_KILL_CHAIN sinon PARTIAL_ATTACK."
    ],
    "examples": [
      {
        "stdin": "KILLCHAIN_EVAL events=dns_whois:RECON,craft_doc:WEAPON,phish_mail:DELIVERY,macro_run:EXPLOIT,reg_persist:INSTALL,beacon_http:C2,db_dump:ACTIONS",
        "expected": "KILLCHAIN: total_events=7 phases_identified=7/7 highest_phase=ACTIONS coverage_pct=100% status=COMPLETE_KILL_CHAIN",
        "note": "Attaque complète ayant franchi les 7 étapes jusqu'à l'exfiltration."
      }
    ],
    "tests": [
      {
        "label": "Attaque stoppée à la phase d'exploitation",
        "stdin": "cas:1",
        "expected": "KILLCHAIN: total_events=3 phases_identified=3/7 highest_phase=EXPLOIT coverage_pct=42% status=PARTIAL_ATTACK"
      },
      {
        "label": "Événements répétés sur phases initiales de reconnaissance",
        "stdin": "cas:2",
        "expected": "KILLCHAIN: total_events=3 phases_identified=1/7 highest_phase=RECON coverage_pct=14% status=PARTIAL_ATTACK"
      },
      {
        "label": "Attaque atteignant le canal de commande et contrôle C2",
        "stdin": "cas:3",
        "expected": "KILLCHAIN: total_events=4 phases_identified=4/7 highest_phase=C2 coverage_pct=57% status=PARTIAL_ATTACK"
      }
    ],
    "solution": "[Exemple]\nKILLCHAIN: total_events=7 phases_identified=7/7 highest_phase=ACTIONS coverage_pct=100% status=COMPLETE_KILL_CHAIN\n\n[Cas 1 — Attaque stoppée à la phase d'exploitation]\nKILLCHAIN: total_events=3 phases_identified=3/7 highest_phase=EXPLOIT coverage_pct=42% status=PARTIAL_ATTACK\n\n[Cas 2 — Événements répétés sur phases initiales de reconnaissance]\nKILLCHAIN: total_events=3 phases_identified=1/7 highest_phase=RECON coverage_pct=14% status=PARTIAL_ATTACK\n\n[Cas 3 — Attaque atteignant le canal de commande et contrôle C2]\nKILLCHAIN: total_events=4 phases_identified=4/7 highest_phase=C2 coverage_pct=57% status=PARTIAL_ATTACK"
  }
];
