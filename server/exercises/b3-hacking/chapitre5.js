'use strict';

module.exports = [
  {
    "id": "hk3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "L'audit des binaires SUID du serveur de la coopérative Solvigne",
    "exampleTitle": "Exemple résolu — les binaires SUID de l'école de musique Harmonia",
    "goal": "Interpréter la sortie d'une recherche de binaires SUID et repérer ceux qui ouvrent un shell root.",
    "brief": "<p><strong>Énoncé.</strong> La coopérative agricole Solvigne mandate un test d'intrusion de son serveur web. Après avoir obtenu un accès limité au compte <code>www-data</code>, l'auditeur recherche des chemins d'élévation de privilèges et lance <code>find / -perm -4000 -type f 2&gt;/dev/null</code>. Le serveur renvoie :</p><table><tr><th>Binaire</th><th>Permissions</th></tr><tr><th>/usr/bin/passwd</th><td>-rwsr-xr-x root root</td></tr><tr><th>/usr/bin/find</th><td>-rwsr-xr-x root root</td></tr><tr><th>/usr/bin/vim</th><td>-rwsr-xr-x root root</td></tr><tr><th>/usr/bin/less</th><td>-rwsr-xr-x root root</td></tr><tr><th>/bin/mount</th><td>-rwsr-xr-x root root</td></tr><tr><th>/usr/bin/chsh</th><td>-rwsr-xr-x root root</td></tr></table><p>Au passage, la base GTFOBins indique que <code>find</code>, <code>vim</code> et <code>less</code> permettent d'ouvrir un shell lorsque leur bit SUID est positionné.</p><ol><li>Combien de binaires SUID l'audit a-t-il listés ?</li><li>Quelle lettre minuscule, à la place du « x » du propriétaire dans la chaîne de permissions, signale le bit SUID ?</li><li>Combien de ces binaires GTFOBins considère-t-elle comme permettant un shell root ?</li><li>Quel binaire est légitimement SUID sur tout système Linux car il modifie les mots de passe ?</li><li>Quelle valeur octale, présente dans l'option -perm de la commande, correspond au bit SUID ?</li><li>Sous quelle identité ces binaires s'exécutent-ils grâce au bit SUID ?</li></ol>",
    "starter": "# Exercice — L'audit des binaires SUID du serveur de la coopérative Solvigne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 et 5 : un nombre. Question 2 : une lettre. Questions 4 et 6 : un nom.\n\n[Question 1 — Binaires SUID listés]\nA_COMPLETER\n\n[Question 2 — Lettre signalant le bit SUID]\nA_COMPLETER\n\n[Question 3 — Binaires ouvrant un shell selon GTFOBins]\nA_COMPLETER\n\n[Question 4 — Binaire SUID légitime]\nA_COMPLETER\n\n[Question 5 — Valeur octale du bit SUID]\nA_COMPLETER\n\n[Question 6 — Identité d'exécution des binaires SUID]\nA_COMPLETER\n",
    "hints": [
      "Comptez les lignes du tableau : chaque binaire listé porte le bit SUID dans ses permissions.",
      "Dans -rwsr-xr-x, le « s » remplace le « x » du propriétaire : c'est lui qui indique le SUID ; la commande le cherche avec -perm -4000.",
      "GTFOBins classe find, vim et less comme permettant un shell ; passwd est SUID par conception, pour que tout utilisateur change son mot de passe."
    ],
    "examples": [
      {
        "stdin": "Le serveur de l'école de musique Harmonia renvoie quatre binaires SUID :\npasswd (légitime), nano, awk, env.\nGTFOBins classe nano, awk et env comme permettant d'ouvrir un shell.\n\n1) 4 binaires listés. 2) Le bit SUID se lit « s » à la place du x du propriétaire.\n3) 3 binaires exploitables. 4) passwd est le SUID légitime. 5) Valeur octale : 4000. 6) Les binaires s'exécutent en root.",
        "expected": "4 binaires — s — 3 exploitables — passwd — 4000 — root",
        "note": "Un SUID légitime comme passwd ne doit jamais être supprimé : l'audit ne retient que les SUID injustifiés."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Binaires SUID listés",
        "stdin": "q:1",
        "expected": "6||six"
      },
      {
        "label": "Question 2 — Lettre du bit SUID",
        "stdin": "q:2",
        "expected": "s||la lettre s"
      },
      {
        "label": "Question 3 — Binaires ouvrant un shell",
        "stdin": "q:3",
        "expected": "3||trois"
      },
      {
        "label": "Question 4 — Binaire SUID légitime",
        "stdin": "q:4",
        "expected": "passwd||le passwd||/usr/bin/passwd"
      },
      {
        "label": "Question 5 — Valeur octale du SUID",
        "stdin": "q:5",
        "expected": "4000"
      },
      {
        "label": "Question 6 — Identité d'exécution",
        "stdin": "q:6",
        "expected": "root||le root||l'utilisateur root"
      }
    ],
    "solution": "[Question 1 — Binaires SUID listés]\n6\n\n[Question 2 — Lettre signalant le bit SUID]\ns\n\n[Question 3 — Binaires ouvrant un shell selon GTFOBins]\n3\n\n[Question 4 — Binaire SUID légitime]\npasswd\n\n[Question 5 — Valeur octale du bit SUID]\n4000\n\n[Question 6 — Identité d'exécution des binaires SUID]\nroot",
    "takeaway": "1) La commande a listé 6 binaires SUID : passwd, find, vim, less, mount et chsh.\n2) La lettre « s » remplace le « x » du propriétaire dans -rwsr-xr-x : c'est le signe du bit SUID.\n3) GTFOBins classe 3 de ces binaires comme permettant un shell root : find, vim et less.\n4) passwd est légitimement SUID sur tout système Linux : il doit modifier les mots de passe pour tous les utilisateurs.\n5) Le bit SUID correspond à la valeur octale 4000, d'où l'option -perm -4000 de la commande.\n6) Grâce au bit SUID, ces binaires s'exécutent sous l'identité de root, quel que soit l'utilisateur qui les lance.\nContrôle : 6 binaires listés − 3 exploitables (find, vim, less) − 2 légitimes (passwd, chsh) = 1 binaire à instruire (mount), le tri de l'auditeur est complet."
  },
  {
    "id": "hk3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le fichier sudoers du serveur de l'agence Weblane",
    "exampleTitle": "Exemple résolu — le sudoers de la clinique Bonne-Fontaine",
    "goal": "Auditer un extrait de fichier sudoers et compter les règles qui mènent à un shell root.",
    "brief": "<p><strong>Énoncé.</strong> L'agence web Weblane fait tester son serveur de préproduction. Disposant du compte <code>dev</code>, l'auditeur lance <code>sudo -l</code> et obtient l'extrait de configuration suivant :</p><table><tr><th>Ligne du fichier sudoers</th><th>Portée</th></tr><tr><th>webmaster ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart apache2</th><td>Redémarrer le service web</td></tr><tr><th>dev ALL=(ALL:ALL) NOPASSWD: /usr/bin/vim /etc/apache2/apache2.conf</td><td>Éditer la configuration Apache</td></tr><tr><th>stagiaire ALL=(ALL) NOPASSWD: /usr/bin/less /var/log/syslog</td><td>Consulter le journal système</td></tr><tr><th>admin ALL=(ALL:ALL) ALL</th><td>Toutes les commandes, avec mot de passe</td></tr></table><p>La base GTFOBins rappelle que <code>vim</code> et <code>less</code> savent lancer un shell.</p><ol><li>Combien d'utilisateurs ces quatre lignes concernent-elles ?</li><li>Combien de lignes autorisent des commandes sans mot de passe (NOPASSWD) ?</li><li>Quel utilisateur peut sortir de vim avec un shell root ?</li><li>Quel pagineur du stagiaire exécute une commande via le séquenceur « !sh » ?</li><li>Combien de règles mènent à un shell root ?</li><li>Quel utilisateur garde le droit le plus large tout en restant protégé par la demande de mot de passe ?</li></ol>",
    "starter": "# Exercice — Le fichier sudoers du serveur de l'agence Weblane\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 5 : un nombre. Questions 3, 4 et 6 : un nom d'utilisateur ou de binaire.\n\n[Question 1 — Utilisateurs concernés]\nA_COMPLETER\n\n[Question 2 — Lignes NOPASSWD]\nA_COMPLETER\n\n[Question 3 — Utilisateur pouvant sortir de vim en shell root]\nA_COMPLETER\n\n[Question 4 — Pagineur du stagiaire exécutant !sh]\nA_COMPLETER\n\n[Question 5 — Règles menant à un shell root]\nA_COMPLETER\n\n[Question 6 — Utilisateur au droit large protégé par mot de passe]\nA_COMPLETER\n",
    "hints": [
      "Listez les utilisateurs en tête de chaque ligne : chaque ligne du tableau en concerne un ; NOPASSWD se compte ensuite dans les trois premières.",
      "GTFOBins signale vim et less : identifiez qui a le droit de lancer chacun d'eux via sudo.",
      "La dernière ligne donne tous les droits mais exige le mot de passe : c'est le seul garde-fou qui reste."
    ],
    "examples": [
      {
        "stdin": "Le serveur de la clinique Bonne-Fontaine expose via sudo -l :\ndeploy NOPASSWD: /usr/bin/systemctl restart app ;\nchef NOPASSWD: /usr/bin/awk /etc/app.conf ;\nop NOPASSWD: /usr/bin/man ;\nbackup ALL=(ALL:ALL) ALL.\nGTFOBins : awk et man savent lancer un shell.\n\n1) 4 utilisateurs. 2) 3 lignes NOPASSWD. 3) L'utilisateur chef obtient un shell via awk.\n4) Le pagineur man sert à op. 5) 2 règles mènent à un shell. 6) L'utilisateur backup garde le droit le plus large protégé par mot de passe.",
        "expected": "4 utilisateurs — 3 NOPASSWD — chef via awk — man pour op — 2 règles — backup",
        "note": "Même un outil d'administration anodin (man, less) devient une porte dérobée dès qu'il s'exécute via sudo."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Utilisateurs concernés",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Lignes NOPASSWD",
        "stdin": "q:2",
        "expected": "3||trois"
      },
      {
        "label": "Question 3 — Utilisateur du vim",
        "stdin": "q:3",
        "expected": "dev||l'utilisateur dev||le compte dev"
      },
      {
        "label": "Question 4 — Pagineur du stagiaire",
        "stdin": "q:4",
        "expected": "less||le less"
      },
      {
        "label": "Question 5 — Règles menant à un shell root",
        "stdin": "q:5",
        "expected": "2||deux"
      },
      {
        "label": "Question 6 — Utilisateur protégé par mot de passe",
        "stdin": "q:6",
        "expected": "admin||l'utilisateur admin||le compte admin"
      }
    ],
    "solution": "[Question 1 — Utilisateurs concernés]\n4\n\n[Question 2 — Lignes NOPASSWD]\n3\n\n[Question 3 — Utilisateur pouvant sortir de vim en shell root]\ndev\n\n[Question 4 — Pagineur du stagiaire exécutant !sh]\nless\n\n[Question 5 — Règles menant à un shell root]\n2\n\n[Question 6 — Utilisateur au droit large protégé par mot de passe]\nadmin",
    "takeaway": "1) Les quatre lignes concernent 4 utilisateurs : webmaster, dev, stagiaire et admin.\n2) Trois lignes portent NOPASSWD : celles de webmaster, dev et stagiaire.\n3) L'utilisateur dev peut lancer vim via sudo, et vim sait ouvrir un shell root (:!sh).\n4) Le stagiaire a le droit de lancer less, qui exécute une commande via le séquenceur « !sh ».\n5) Deux règles mènent à un shell root : celle de dev (vim) et celle du stagiaire (less).\n6) L'utilisateur admin conserve toutes les commandes mais avec demande de mot de passe : c'est le seul droit large encore protégé.\nContrôle : 4 utilisateurs, 3 sans mot de passe, dont 2 via des outils shell-capables selon GTFOBins : la configuration cumule les facteurs de risque."
  },
  {
    "id": "hk3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "L'écrasement de l'adresse de retour du service borne de Navik",
    "exampleTitle": "Exemple résolu — l'offset du service chat_v1",
    "goal": "Calculer les offsets d'un dépassement de tampon sur pile : tampon, EBP, adresse de retour et place restante.",
    "brief": "<p><strong>Énoncé.</strong> Au CTF inter-écoles de Navik, l'épreuve « borne » fournit le binaire d'un service qui lit une chaîne saisie au clavier. L'analyse du code désassemblé montre un tampon de <strong>250 octets</strong>, suivi de l'adresse de retour de la fonction : les 4 octets de l'EBP sauvegardé précèdent immédiatement cette adresse. L'équipe étudiante prépare son exploit :</p><ol><li>Quelle est la taille du tampon vulnérable, en octets ?</li><li>À quel offset, compté depuis le début du tampon, l'adresse de retour commence-t-elle à être écrasée ?</li><li>Combien d'octets séparent la fin du tampon du début de l'adresse de retour ?</li><li>L'équipe envoie une entrée de 400 octets : combien d'octets restent après l'adresse de retour ?</li><li>Quel registre 32 bits, contenant l'adresse de la prochaine instruction à exécuter, l'écrasement détourne-t-il ?</li><li>Quelle protection du compilateur insère une valeur secrète entre le tampon et l'adresse de retour pour détecter l'écrasement ?</li></ol>",
    "starter": "# Exercice — L'écrasement de l'adresse de retour du service borne de Navik\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : un nombre d'octets ou un offset. Question 5 : un registre. Question 6 : une protection.\n\n[Question 1 — Taille du tampon vulnérable]\nA_COMPLETER\n\n[Question 2 — Offset d'écrasement de l'adresse de retour]\nA_COMPLETER\n\n[Question 3 — Octets entre le tampon et l'adresse de retour]\nA_COMPLETER\n\n[Question 4 — Octets restants après l'adresse de retour]\nA_COMPLETER\n\n[Question 5 — Registre 32 bits détourné]\nA_COMPLETER\n\n[Question 6 — Protection par valeur secrète]\nA_COMPLETER\n",
    "hints": [
      "Sur la pile, l'ordre est : tampon, puis EBP sauvegardé (4 octets), puis l'adresse de retour ; l'offset de l'adresse de retour est donc la taille du tampon plus 4.",
      "Pour la place restante, retirez de l'entrée totale l'offset de l'adresse de retour puis ses 4 octets.",
      "Le registre qui porte l'adresse de la prochaine instruction s'appelle EIP en architecture 32 bits ; la protection qui insère une valeur secrète s'appelle le canari de pile (stack canary)."
    ],
    "examples": [
      {
        "stdin": "L'épreuve chat_v1 du même CTF expose un tampon de 120 octets,\nsuivi de l'EBP sauvegardé (4 octets) puis de l'adresse de retour.\n\n1) Tampon : 120 octets. 2) L'adresse de retour est écrasée à l'offset 120 + 4 = 124.\n3) 4 octets (l'EBP) séparent le tampon de l'adresse de retour.\n4) Sur une entrée de 200 octets, il reste 200 − 124 − 4 = 72 octets après l'adresse de retour.\n5) Le registre détourné est EIP. 6) La protection s'appelle le canari de pile (stack canary).",
        "expected": "tampon 120 — offset 124 — 4 octets — 72 octets après EIP — EIP — le canari",
        "note": "L'offset 124 = 120 + 4 : les 4 octets de l'EBP sauvegardé se placent toujours entre le tampon et l'adresse de retour."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taille du tampon",
        "stdin": "q:1",
        "expected": "250"
      },
      {
        "label": "Question 2 — Offset de l'adresse de retour",
        "stdin": "q:2",
        "expected": "254"
      },
      {
        "label": "Question 3 — Octets entre tampon et adresse",
        "stdin": "q:3",
        "expected": "4||quatre"
      },
      {
        "label": "Question 4 — Octets restants après l'adresse",
        "stdin": "q:4",
        "expected": "142"
      },
      {
        "label": "Question 5 — Registre détourné",
        "stdin": "q:5",
        "expected": "eip||le registre eip||EIP"
      },
      {
        "label": "Question 6 — Protection par valeur secrète",
        "stdin": "q:6",
        "expected": "le canari||canari||canary||stack canary||la protection canary||stack protector||ssp"
      }
    ],
    "solution": "[Question 1 — Taille du tampon vulnérable]\n250\n\n[Question 2 — Offset d'écrasement de l'adresse de retour]\n254\n\n[Question 3 — Octets entre le tampon et l'adresse de retour]\n4\n\n[Question 4 — Octets restants après l'adresse de retour]\n142\n\n[Question 5 — Registre 32 bits détourné]\neip\n\n[Question 6 — Protection par valeur secrète]\nle canari",
    "takeaway": "1) Le tampon vulnérable fait 250 octets.\n2) L'adresse de retour commence à l'offset 250 + 4 = 254 depuis le début du tampon.\n3) Les 4 octets de l'EBP sauvegardé séparent la fin du tampon du début de l'adresse de retour.\n4) Sur une entrée de 400 octets : 400 − 254 − 4 = 142 octets restent après l'adresse de retour.\n5) L'écrasement détourne EIP, le registre qui pointe vers la prochaine instruction à exécuter.\n6) La protection s'appelle le canari de pile (stack canary) : une valeur secrète insérée entre le tampon et l'adresse de retour, vérifiée avant le retour de fonction.\nContrôle : 250 (tampon) + 4 (EBP) + 4 (adresse de retour) + 142 (reste) = 400 octets envoyés, la comptabilité de l'exploit est exacte."
  }
];
