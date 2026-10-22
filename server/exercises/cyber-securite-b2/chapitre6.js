'use strict';

module.exports = [
  {
    "id": "cs2-c6-e1",
    "chapter": 6,
    "title": "Moteur de détection de signature NIDS (Format Snort simplifié)",
    "level": "n1",
    "language": "analyse",
    "goal": "Moteur de détection de signature NIDS (Format Snort simplifié)",
    "brief": "<p>Un NIDS (Network Intrusion Detection System) comme Snort analyse les paquets réseau en temps réel pour détecter des motifs d’attaque connus dans les en-têtes et la charge utile (payload).\n\nEntrée :\n- Ligne 1 : Règle Snort simplifiée : <code>alert proto any any -> dest_ip dest_port (msg:\"&lt;msg&gt;\"; content:\"&lt;motif&gt;\"; sid:&lt;sid&gt;;)</code>\n- Ligne 2 : Paquet capturé : <code>proto src_ip src_port dest_ip dest_port payload</code>\n\nTraitement :\nVérifier si le paquet correspond au <code>proto</code>, à la <code>dest_ip</code>, au <code>dest_port</code> ET si le <code>content</code> recherché est présent dans le <code>payload</code>.\n\nRésultat d’analyse attendu :\n- Si alerte déclenchée : <code>[ALERT] [sid:&lt;sid&gt;] &lt;msg&gt; (source: &lt;src_ip&gt;:&lt;src_port&gt; -&gt; dest: &lt;dest_ip&gt;:&lt;dest_port&gt;)</code>\n- Sinon : <code>PAQUET NORMAL (aucun match)</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c6-e1) — Moteur de détection de signature NIDS (Format Snort simplifié)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : alert tcp any any -> 192.168.1.10 80 (msg:\"Tentative acces admin\"; content:\"/admin.php\"; sid:10001;)\n# Données : tcp 10.0.0.5 45892 192.168.1.10 80 GET /index.html HTTP/1.1\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : alert tcp any any -> 10.0.0.1 22 (msg:\"Scan SSH brute\"; content:\"SSH-2.0\"; sid:10002;)\n# Données : tcp 172.16.0.4 55000 10.0.0.1 22 SSH-2.0-OpenSSH_8.9\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : alert udp any any -> 192.168.1.1 53 (msg:\"Attaque DNS malveillante\"; content:\"malware.xyz\"; sid:10003;)\n# Données : udp 192.168.1.50 61234 192.168.1.1 53 query malware.xyz A\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : alert tcp any any -> 10.0.0.1 80 (msg:\"Injection SQL url\"; content:\"UNION\"; sid:10004;)\n# Données : udp 10.0.0.5 12345 10.0.0.1 80 UNION SELECT\nA_COMPLETER\n",
    "hints": [
      "Une signature NIDS inspecte simultanément l’en-tête IP/port et le motif binaire ou textuel du payload.",
      "Déclenchez l’alerte de sécurité dès que tous les prédicats de la règle de détection sont satisfaits."
    ],
    "examples": [
      {
        "stdin": "alert tcp any any -> 192.168.1.10 80 (msg:\"Tentative acces admin\"; content:\"/admin.php\"; sid:10001;)\ntcp 10.0.0.5 45892 192.168.1.10 80 GET /admin.php HTTP/1.1",
        "expected": "[ALERT] [sid:10001] Tentative acces admin (source: 10.0.0.5:45892 -> dest: 192.168.1.10:80)",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "cas:1",
        "expected": "PAQUET NORMAL (aucun match)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "[ALERT] [sid:10002] Scan SSH brute (source: 172.16.0.4:55000 -> dest: 10.0.0.1:22)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "[ALERT] [sid:10003] Attaque DNS malveillante (source: 192.168.1.50:61234 -> dest: 192.168.1.1:53)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "PAQUET NORMAL (aucun match)"
      }
    ],
    "solution": "[Exemple]\n[ALERT] [sid:10001] Tentative acces admin (source: 10.0.0.5:45892 -> dest: 192.168.1.10:80)\n\n[Cas 1 — Test de validation 1]\nPAQUET NORMAL (aucun match)\n\n[Cas 2 — Test de validation 2]\n[ALERT] [sid:10002] Scan SSH brute (source: 172.16.0.4:55000 -> dest: 10.0.0.1:22)\n\n[Cas 3 — Test de validation 3]\n[ALERT] [sid:10003] Attaque DNS malveillante (source: 192.168.1.50:61234 -> dest: 192.168.1.1:53)\n\n[Cas 4 — Test de validation 4]\nPAQUET NORMAL (aucun match)"
  },
  {
    "id": "cs2-c6-e2",
    "chapter": 6,
    "title": "Détection d’attaque par force brute dans les journaux d’événements",
    "level": "n2",
    "language": "analyse",
    "goal": "Détection d’attaque par force brute dans les journaux d’événements",
    "brief": "<p>Les outils de corrélation SIEM scrutent les journaux d’authentification pour détecter les attaques par force brute.\n\nEntrée : Liste d’événements séparés par des barres verticales <code>|</code>.\nFormat de chaque événement : <code>timestamp IP STATUT</code> (ex. <code>100 192.168.1.50 FAIL</code>).\n\nRègle de détection :\nSi une même adresse IP accumule <strong>au moins 5 échecs consécutifs (FAIL)</strong> dans une fenêtre temporelle inférieure ou égale à <strong>60 secondes</strong> (c’est-à-dire $timestamp_{5e} - timestamp_{1er} \\le 60$), une alerte est levée.\n\nRésultat d’analyse attendu :\n- Si détecté : <code>ALERTE BRUTE FORCE: IP &lt;IP&gt; (&lt;count&gt; echecs en &lt;delta&gt;s) -&gt; BANNISSEMENT IP</code> (afficher la première IP qui déclenche l’alerte).\n- Sinon : <code>JOURNAUX NORMAUX (&lt;total_fails&gt; echecs disperses)</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c6-e2) — Détection d’attaque par force brute dans les journaux d’événements\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : 10 10.0.0.1 FAIL|20 10.0.0.2 FAIL|30 10.0.0.1 SUCCESS|40 10.0.0.1 FAIL\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : 10 192.168.1.50 FAIL|80 192.168.1.50 FAIL|150 192.168.1.50 FAIL|220 192.168.1.50 FAIL|290 192.168.1.50 FAIL\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 5 172.16.5.99 FAIL|10 172.16.5.99 FAIL|15 172.16.5.99 FAIL|20 172.16.5.99 FAIL|25 172.16.5.99 FAIL\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : 1 1.1.1.1 SUCCESS|2 2.2.2.2 SUCCESS\nA_COMPLETER\n",
    "hints": [
      "Analysez la fréquence temporelle des échecs d’authentification provenant d’une même source IP.",
      "Dépassement du seuil de tentatives infructueuses = suspicion avérée d’attaque par force brute ou dictionnaire."
    ],
    "examples": [
      {
        "stdin": "100 192.168.1.50 FAIL|110 192.168.1.50 FAIL|120 192.168.1.50 FAIL|130 192.168.1.50 FAIL|140 192.168.1.50 FAIL",
        "expected": "ALERTE BRUTE FORCE: IP 192.168.1.50 (5 echecs en 40s) -> BANNISSEMENT IP",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "cas:1",
        "expected": "JOURNAUX NORMAUX (3 echecs disperses)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "JOURNAUX NORMAUX (5 echecs disperses)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "ALERTE BRUTE FORCE: IP 172.16.5.99 (5 echecs en 20s) -> BANNISSEMENT IP"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "JOURNAUX NORMAUX (0 echecs disperses)"
      }
    ],
    "solution": "[Exemple]\nALERTE BRUTE FORCE: IP 192.168.1.50 (5 echecs en 40s) -> BANNISSEMENT IP\n\n[Cas 1 — Test de validation 1]\nJOURNAUX NORMAUX (3 echecs disperses)\n\n[Cas 2 — Test de validation 2]\nJOURNAUX NORMAUX (5 echecs disperses)\n\n[Cas 3 — Test de validation 3]\nALERTE BRUTE FORCE: IP 172.16.5.99 (5 echecs en 20s) -> BANNISSEMENT IP\n\n[Cas 4 — Test de validation 4]\nJOURNAUX NORMAUX (0 echecs disperses)"
  },
  {
    "id": "cs2-c6-e3",
    "chapter": 6,
    "title": "Analyseur de compromission et corrélation d’IoC (Hashes malveillants)",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyseur de compromission et corrélation d’IoC (Hashes malveillants)",
    "brief": "<p>Les Indicateurs de Compromission (IoC) permettent d’identifier la présence de malwares connus sur un système en comparant les empreintes cryptographiques des fichiers exécutables avec une base de données de renseignement sur les menaces.\n\nEntrée :\n- Ligne 1 : Base IoC de signatures malveillantes : <code>hash:nom,hash:nom...</code>\n- Ligne 2 : Fichiers inspectés sur l’hôte : <code>chemin:hash,chemin:hash...</code>\n\nTraitement :\nPour chaque fichier, comparer son hachage (insensible à la casse) avec la base IoC.\nRésultat d’analyse attendu :\n- Pour chaque menace trouvée (dans l’ordre de la ligne 2) : <code>MENACE DETECTEE: &lt;chemin&gt; correspond a &lt;nom_malware&gt;</code>\n- Si aucun fichier suspect : <code>SYSTEME SAIN (aucun IoC detecte)</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c6-e3) — Analyseur de compromission et corrélation d’IoC (Hashes malveillants)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : aaaa:VirusA,bbbb:WormB\n# Données : /bin/ls:1111,/bin/cat:2222\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : deadbeef:Rootkit.Zero,cafebabe:Keylogger.Spy\n# Données : /var/tmp/svchost.exe:DEADBEEF\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 1234:Backdoor.X\n# Données : /etc/init.d/service:9999,/opt/agent:1234\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : 1111:Threat1\n# Données : /tmp/test:2222\nA_COMPLETER\n",
    "hints": [
      "Un IoC (Indicateur de Compromission) fournit la preuve technique d’une infection ou intrusion sur le système.",
      "Confrontez les empreintes collectées aux signatures connues de menaces pour qualifier la compromission."
    ],
    "examples": [
      {
        "stdin": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855:Trojan.Downloader,ed01ebfbc9eb5bbea545af4d01bf5f1071661840480439c6e5babe8e080e41aa:Ransomware.WannaCry\n/usr/bin/bash:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855,/tmp/updater.exe:ed01ebfbc9eb5bbea545af4d01bf5f1071661840480439c6e5babe8e080e41aa",
        "expected": "MENACE DETECTEE: /usr/bin/bash correspond a Trojan.Downloader\nMENACE DETECTEE: /tmp/updater.exe correspond a Ransomware.WannaCry",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "cas:1",
        "expected": "SYSTEME SAIN (aucun IoC detecte)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "MENACE DETECTEE: /var/tmp/svchost.exe correspond a Rootkit.Zero"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "MENACE DETECTEE: /opt/agent correspond a Backdoor.X"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "SYSTEME SAIN (aucun IoC detecte)"
      }
    ],
    "solution": "[Exemple]\nMENACE DETECTEE: /usr/bin/bash correspond a Trojan.Downloader\nMENACE DETECTEE: /tmp/updater.exe correspond a Ransomware.WannaCry\n\n[Cas 1 — Test de validation 1]\nSYSTEME SAIN (aucun IoC detecte)\n\n[Cas 2 — Test de validation 2]\nMENACE DETECTEE: /var/tmp/svchost.exe correspond a Rootkit.Zero\n\n[Cas 3 — Test de validation 3]\nMENACE DETECTEE: /opt/agent correspond a Backdoor.X\n\n[Cas 4 — Test de validation 4]\nSYSTEME SAIN (aucun IoC detecte)"
  }
];
