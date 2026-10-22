/**
 * Chapitre 5 du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

module.exports = {
  "n": 5,
  "title": "Exploitation Système, Escalade de Privilèges & Pivoting (Gaining Access)",
  "short": "Exploitation Système &amp; Escalade de Privilèges",
  "toc": "Mécanismes d'exploitation bas niveau et corruption de mémoire (architecture de pile, dépassement de tampon Buffer Overflow x86/x64, détournement d'EIP/RIP, NOP sled et protections ASLR/DEP/Canaries), utilisation professionnelle de Metasploit Framework et payloads Meterpreter, vecteurs d'élévation de privilèges sous Linux (binaires SUID GTFOBins, configurations sudoers NOPASSWD, crontabs modifiables), élévation de privilèges Windows (Unquoted Service Paths, SeImpersonatePrivilege et PrintSpoofer), et techniques de mouvement latéral et pivoting réseau (tunnels SSH, proxies SOCKS et Chisel).",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "situation": "L'obtention d'un shell initial non privilégié (par exemple sous l'identité www-data sur un serveur web) ne constitue qu'une étape intermédiaire dans un test d'intrusion. L'auditeur doit élever ses privilèges pour atteindre les droits suprêmes (root sous Linux, SYSTEM sous Windows) afin de démontrer l'accès aux données sensibles et pivoter vers les réseaux internes isolés non routables directement depuis Internet. En tant que pentesteur B3, vous devez maîtriser les techniques d'audit des configurations locales, exploiter méthodiquement les faiblesses d'assignation de droits et établir des passerelles de rebond sécurisées.",
  "objectives": [
    "comprendre la structure mémoire d'un processus et la mécanique d'un Stack Buffer Overflow (x86/x64) ;",
    "identifier et contourner les mécanismes de protection mémoire fondamentaux (ASLR, DEP/NX, Stack Canaries) ;",
    "exploiter Metasploit Framework, manipuler des payloads stagés vs inline et opérer une session Meterpreter ;",
    "auditer et exploiter les vecteurs d'escalade de privilèges Linux : binaires SUID (GTFOBins) et règles sudoers ;",
    "maîtriser l'élévation de privilèges Windows : chemins de services non quotés et abus de jetons (SeImpersonate) ;",
    "mettre en œuvre des tunnels de pivoting réseau (SSH port forwarding local/distant/dynamique SOCKS et Chisel)."
  ],
  "sections": [
    {
      "title": "Architecture Mémoire &amp; Dépassement de Tampon (Stack Buffer Overflow)",
      "html": "<p>Dans les programmes compilés en C ou C++ sans vérification stricte des limites de tableaux (fonctions dangereuses comme <code>strcpy</code>, <code>gets</code>, <code>sprintf</code>), un Buffer Overflow permet de détourner le flux d'exécution :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Organisation de la Pile (Stack)</h4>\n    <p>La pile croît des adresses hautes vers les adresses basses. Lors d'un appel de fonction :</p>\n    <ol>\n      <li>Empilement des arguments de fonction.</li>\n      <li>Empilement de l'adresse de retour (<strong>Saved Return Pointer</strong> : EIP en x86, RIP en x64).</li>\n      <li>Sauvegarde du Frame Pointer (EBP/RBP).</li>\n      <li>Allocation des variables locales dans le tampon mémoire (Buffer).</li>\n    </ol>\n  </div>\n  <div class=\"card\">\n    <h4>Mécanique de l'Exploit</h4>\n    <p>En injectant plus de données que la taille allouée du tampon :</p>\n    <ul>\n      <li>Les données débordent et écrasent EBP puis le pointeur de retour (EIP/RIP).</li>\n      <li>L'attaquant remplace l'adresse de retour par l'adresse de son code malveillant injecté (<strong>Shellcode</strong>).</li>\n      <li>Un <strong>NOP Sled</strong> (suite d'instructions <code>\\x90</code> No Operation) précède le shellcode pour sécuriser l'atterrissage de l'exécution.</li>\n    </ul>\n  </div>\n</div>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Les Mécanismes de Protection Moderne de la Mémoire</div>\n<p>Les systèmes d'exploitation contemporains intègrent des défenses matérielles et logicielles :</p>,<ul>,  <li><strong>DEP / NX (Data Execution Prevention / No-Execute) :</strong> marque les zones de données (pile et tas) comme non exécutables. Tout saut direct vers du shellcode sur la pile déclenche un crash (contourné par la technique Return-Oriented Programming - ROP).</li>,  <li><strong>ASLR (Address Space Layout Randomization) :</strong> aléatorise les adresses mémoire de la pile, du tas et des bibliothèques à chaque exécution du programme.</li>,  <li><strong>Stack Canaries :</strong> valeur aléatoire secrète placée sur la pile juste avant l'adresse de retour. Si la valeur est modifiée lors du retour de fonction, le programme s'arrête immédiatement (Stack Smashing Detected).</li>,</ul>\n  </div>"
    },
    {
      "title": "Exploitation avec Metasploit Framework &amp; Sessions Meterpreter",
      "html": "<p>Metasploit Framework (MSF) est la plateforme modulaire d'automatisation d'exploits la plus répandue :</p>\n<table class=\"table\">\n  <thead><tr><th>Composant</th><th>Rôle dans le Framework</th><th>Exemple d'Utilisation</th></tr></thead>\n  <tbody>\n    <tr><td><strong>Exploit</strong></td><td>Module exploitant une vulnérabilité logicielle pour injecter la charge</td><td><code>use exploit/windows/smb/ms17_010_eternalblue</code></td></tr>\n    <tr><td><strong>Payload (Charge Utile)</strong></td><td>Code exécuté sur la cible une fois l'accès obtenu (Reverse Shell, Meterpreter)</td><td><code>set PAYLOAD windows/x64/meterpreter/reverse_tcp</code></td></tr>\n    <tr><td><strong>Auxiliary</strong></td><td>Modules de scan, d'énumération ou de déni de service sans charge utile</td><td><code>use auxiliary/scanner/smb/smb_version</code></td></tr>\n    <tr><td><strong>Post</strong></td><td>Modules d'énumération locale, extraction de hashes ou escalade après compromission</td><td><code>use post/windows/gather/smart_hashdump</code></td></tr>\n  </tbody>\n</table>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Différence entre Payloads Stagés et Non-Stagés (Inline)</div>\n<p>Dans Metasploit, la convention de nommage distingue deux types d'architectures de charge utile :</p>,<ul>,  <li><strong>Payload Stagé (avec un slash intermédiaire, ex: <code>meterpreter/reverse_tcp</code>) :</strong> un premier petit code injecté (Stager) se connecte au serveur de l'attaquant pour télécharger en mémoire la charge utile complète plus volumineuse. Indispensable lorsque l'espace mémoire pour l'exploit initial est restreint.</li>,  <li><strong>Payload Inline / Non-stagé (avec un tiret du bas, ex: <code>meterpreter_reverse_tcp</code>) :</strong> la charge utile entière est envoyée d'un seul bloc dans l'exploit. Plus stable face aux coupures réseau ou aux inspections proxies.</li>,</ul>\n  </div>"
    },
    {
      "title": "Élévation de Privilèges Linux : SUID, GTFOBins &amp; Sudoers",
      "html": "<p>Sous Linux, l'élévation de privilèges vers le compte <code>root</code> repose majoritairement sur les mauvaises configurations d'administration :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Binaires SUID &amp; GTFOBins</h4>\n    <p>La recherche de fichiers avec le bit SUID (<code>chmod u+s</code>) appartenant à root est systématique :</p>\n    <pre><code>$ find / -perm -4000 -type f 2&gt;/dev/null</code></pre>\n    <p>Le projet <strong>GTFOBins</strong> répertorie les binaires légitimes qui permettent d'obtenir un shell administrateur :</p>\n    <ul>\n      <li><code>/usr/bin/find</code> : <code>find . -exec /bin/sh -p \\; -quit</code></li>\n      <li><code>/usr/bin/vim</code> : <code>vim -c ':!/bin/sh'</code></li>\n      <li><code>/usr/bin/awk</code> : <code>awk 'BEGIN {system(\"/bin/sh\")}'</code></li>\n    </ul>\n  </div>\n  <div class=\"card\">\n    <h4>Droits Sudoers Permissifs (sudo -l)</h4>\n    <p>La commande <code>sudo -l</code> liste les commandes autorisées pour l'utilisateur courant :</p>\n    <p>Si la directive <code>NOPASSWD:</code> est attribuée sur un binaire permettant l'échappement (ex: <code>(ALL) NOPASSWD: /usr/bin/less /var/log/syslog</code>), l'attaquant lance la commande et tape <code>!/bin/sh</code> dans l'interface pour obtenir un shell root instantané.</p>\n  </div>\n</div>"
    },
    {
      "title": "Élévation de Privilèges Windows : Unquoted Service Paths &amp; SeImpersonate",
      "html": "<p>Sous Windows, l'élévation vers le compte <code>NT AUTHORITY\\SYSTEM</code> exploite deux grandes familles de failles :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Chemins de Services Non Quotés (Unquoted Service Paths)</h4>\n    <p>Si le chemin d'un service Windows contient des espaces et n'est pas entouré de guillemets doubles (ex: <code>C:\\Program Files\\Mon Service\\service.exe</code>) :</p>\n    <p>Le gestionnaire de services tente d'exécuter séquentiellement :</p>\n    <ol>\n      <li><code>C:\\Program.exe</code></li>\n      <li><code>C:\\Program Files\\Mon.exe</code></li>\n      <li><code>C:\\Program Files\\Mon Service\\service.exe</code></li>\n    </ol>\n    <p>Si un utilisateur sans privilège a le droit d'écriture dans <code>C:\\</code>, il y dépose un binaire malveillant <code>Program.exe</code> qui sera exécuté avec les droits SYSTEM au redémarrage du service.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Abus de Privilèges de Jetons (SeImpersonatePrivilege)</h4>\n    <p>Les comptes de services Windows (comme <code>LOCAL SERVICE</code> ou <code>NETWORK SERVICE</code> sous IIS) possèdent le privilège <code>SeImpersonatePrivilege</code> (visible via <code>whoami /priv</code>).</p>\n    <p>Ce droit autorise un processus à usurper le jeton de sécurité de n'importe quel client qui se connecte à lui via un tube nommé (Named Pipe).</p>\n    <p>Des exploits automatisés (<strong>PrintSpoofer</strong>, <strong>SweetPotato</strong>) forcent le service Spooler local (SYSTEM) à s'authentifier sur un tube contrôlé pour dupliquer son jeton et spawner un shell SYSTEM.</p>\n  </div>\n</div>"
    },
    {
      "title": "Mouvement Latéral et Pivoting Réseau (SSH &amp; Chisel)",
      "html": "<p>Le pivoting consiste à utiliser une machine compromise comme passerelle de rebond pour attaquer des réseaux internes isolés :</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>Tunnel SSH Local (-L)</h4>\n    <p>Redirige un port de la machine de l'auditeur vers un service interne accessible par la machine pivot :</p>\n    <pre><code>ssh -L 8080:10.0.0.5:80 user@pivot</code></pre>\n    <p>Accès à l'intranet interne sur <code>http://localhost:8080</code>.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Tunnel Dynamique SOCKS (-D)</h4>\n    <p>Transforme la connexion SSH en proxy SOCKS complet :</p>\n    <pre><code>ssh -D 1080 user@pivot</code></pre>\n    <p>Combiné avec <code>proxychains</code>, toutes les commandes Nmap, curl ou navigateurs transitent par le pivot.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Tunneling HTTP Chisel</h4>\n    <p>Outil écrit en Go encapsulant un proxy SOCKS chiffré au travers d'une connexion HTTP/Websocket standard :</p>\n    <p>Idéal pour traverser les pare-feux stricts n'autorisant que les flux web sortants (port 80/443).</p>\n  </div>\n</div>"
    }
  ],
  "method": [
    "Énumérer l'environnement local après premier accès : OS, kernel, utilisateurs, groupes et privilèges (whoami, id).",
    "Rechercher les binaires SUID mal configurés sous Linux et croiser avec GTFOBins.",
    "Auditer les autorisations accordées par le fichier sudoers (sudo -l).",
    "Sous Windows, inspecter les privilèges de jetons (whoami /priv) et les services non quotés.",
    "Mettre en place un tunnel de pivoting (SSH -D ou Chisel) pour router les attaques vers le réseau interne."
  ],
  "summary": [
    "L'exploitation de buffer overflows détourne EIP/RIP mais se heurte aux protections modernes ASLR, DEP/NX et Canaries.",
    "Metasploit structure l'attaque en exploits, payloads, modules auxiliaires et sessions de post-exploitation Meterpreter.",
    "Sous Linux, les binaires SUID non nécessaires et les règles sudoers NOPASSWD sont les vecteurs d'escalade les plus courants.",
    "Sous Windows, les privilèges de jetons applicatifs (SeImpersonate) permettent d'obtenir les droits SYSTEM via PrintSpoofer.",
    "Le pivoting réseau étend la portée de l'intrusion en transformant une machine compromise en passerelle de rebond."
  ],
  "checklist": [
    "Je comprends la structure d'un payload Buffer Overflow avec offset, adresse de retour, NOP sled et shellcode.",
    "Je sais identifier et exploiter les binaires SUID répertoriés dans GTFOBins.",
    "Je maîtrise l'analyse des failles sudoers NOPASSWD et l'échappement de shell.",
    "Je sais monter un tunnel de rebond SSH ou Chisel pour pivoter vers un segment interne."
  ],
  "notions": [
    {
      "term": "Stack Buffer Overflow",
      "def": "Écrasement de la mémoire de pile permettant de remplacer le pointeur d'instruction EIP/RIP par l'adresse d'un shellcode."
    },
    {
      "term": "GTFOBins",
      "def": "Catalogue de référence des binaires Unix légitimes détournables pour échapper à un shell restreint ou élever ses privilèges."
    },
    {
      "term": "NOP Sled",
      "def": "Suite d'octets 0x90 créant une zone tampon d'atterrissage sécurisée précédant le shellcode lors d'un buffer overflow."
    },
    {
      "term": "Unquoted Service Path",
      "def": "Chemin d'exécutable de service Windows contenant des espaces sans guillemets permettant l'injection de binaire."
    },
    {
      "term": "SeImpersonatePrivilege",
      "def": "Privilège Windows autorisant l'usurpation de jetons de sécurité clients pour obtenir les droits NT AUTHORITY\\SYSTEM."
    }
  ],
  "pitfalls": [
    "Oublier d'ajouter le drapeau -p lors de l'exécution d'un shell via un binaire SUID (l'OS rétrograde sinon l'euid au compte réel).",
    "Confondre un payload Metasploit stagé (avec slash) et non-stagé inline (avec tiret bas).",
    "Modifier directement des fichiers système critiques sans vérifier les sauvegardes lors d'une élévation de privilèges.",
    "Négliger les règles sudoers comportant la directive NOPASSWD: sur des binaires d'édition comme vim ou less."
  ],
  "questions": [
    {
      "stem": "Dans une attaque par dépassement de tampon sur la pile (Stack Buffer Overflow x86), quel registre de processeur l'attaquant cherche-t-il à écraser pour contrôler le flux d'exécution ?",
      "opts": [
        "Le registre EIP (Extended Instruction Pointer)",
        "Le registre EAX (Accumulateur)",
        "Le registre ECX (Compteur)",
        "Le registre ESP (Stack Pointer)"
      ],
      "correct": 0,
      "exp": "EIP contient l'adresse de la prochaine instruction processeur à exécuter. En écrasant l'adresse de retour sauvegardée sur la pile, EIP est forcé de pointer vers le shellcode de l'attaquant."
    },
    {
      "stem": "Quel est le rôle d'un \"NOP Sled\" (suite d'instructions 0x90) placé avant le shellcode dans un exploit Buffer Overflow ?",
      "opts": [
        "Créer une zone d'atterrissage tolérante : si le saut processeur tombe n'importe où dans les NOP, l'exécution glisse sans erreur jusqu'au shellcode",
        "Chiffrer le shellcode pour le rendre indétectable par l'antivirus",
        "Augmenter les privilèges de l'utilisateur au niveau root avant l'exécution",
        "Supprimer les journaux d'événements du système d'exploitation"
      ],
      "correct": 0,
      "exp": "Le NOP sled (No Operation) permet de compenser les légères imprécisions d'adressage mémoire : le processeur exécute les NOP séquentiellement jusqu'à atteindre le début du shellcode."
    },
    {
      "stem": "Quel mécanisme de sécurité de l'OS empêche l'exécution de code injecté directement dans la mémoire de la pile (Stack) ?",
      "opts": [
        "DEP / NX (Data Execution Prevention / No-Execute)",
        "ASLR (Address Space Layout Randomization)",
        "DHCP Snooping",
        "RAID 5"
      ],
      "correct": 0,
      "exp": "DEP/NX marque les pages de pile et de tas comme non exécutables : toute tentative du processeur d'exécuter des instructions situées sur la pile déclenche une exception matérielle immédiate."
    },
    {
      "stem": "Dans Metasploit, quelle est la particularité d'un payload de type \"Stagé\" (ex: windows/x64/meterpreter/reverse_tcp) ?",
      "opts": [
        "Il est scindé en deux parties : un petit chargeur initial (Stager) qui se connecte pour télécharger ensuite le corps complet de la charge utile en mémoire",
        "Il s'exécute exclusivement depuis une clé USB physique",
        "Il ne fonctionne que si la cible dispose de privilèges root préalables",
        "Il est entièrement compilé en assembleur 16-bit"
      ],
      "correct": 0,
      "exp": "Les payloads stagés résolvent le problème des petits tampons mémoire : le stager est minuscule, établit la connexion réseau, puis télécharge en RAM le reste du binaire Meterpreter volumineux."
    },
    {
      "stem": "Sur un système Linux, pourquoi le binaire /usr/bin/find avec le bit SUID root (mode 4755) représente-t-il une élévation de privilèges immédiate (GTFOBins) ?",
      "opts": [
        "Parce qu'il permet d'exécuter un shell arbitraire via la commande : find . -exec /bin/sh -p \\; en conservant les privilèges du propriétaire root",
        "Parce qu'il efface automatiquement le mot de passe root dans le fichier /etc/shadow",
        "Parce qu'il désactive le pare-feu iptables lors de chaque recherche",
        "Parce qu'il redémarre la machine en mode secours mono-utilisateur"
      ],
      "correct": 0,
      "exp": "L'option -exec de find lance une commande sous l'identité effective du propriétaire du binaire (root grâce au bit SUID), ce qui permet d'obtenir un shell root avec le drapeau -p."
    },
    {
      "stem": "Quelle mauvaise configuration dans Windows permet l'attaque par \"Unquoted Service Path\" ?",
      "opts": [
        "Le chemin vers l'exécutable du service comporte des espaces et n'est pas entouré de guillemets doubles dans le registre",
        "Le pare-feu Windows est désactivé sur le profil domaine",
        "Le mot de passe administrateur comporte moins de 8 caractères",
        "Le service utilise le protocole UDP au lieu de TCP"
      ],
      "correct": 0,
      "exp": "Sous Windows, un chemin avec espaces sans guillemets force le gestionnaire de services à tenter d'exécuter chaque mot précédant un espace (ex: C:\\Program.exe avant C:\\Program Files\\...)."
    },
    {
      "stem": "Quel privilège Windows, souvent détenu par les comptes de services applicatifs (IIS/SQL), permet d'usurper l'identité de jetons locaux et d'obtenir les droits SYSTEM via l'exploit PrintSpoofer ?",
      "opts": [
        "SeImpersonatePrivilege",
        "SeShutdownPrivilege",
        "SeTimeZonePrivilege",
        "SeUndockPrivilege"
      ],
      "correct": 0,
      "exp": "SeImpersonatePrivilege autorise un compte de service à usurper le jeton de sécurité de n'importe quel client local se connectant à lui, permettant des attaques comme RottenPotato ou PrintSpoofer."
    },
    {
      "stem": "Quelle commande SSH permet de créer un tunnel proxy dynamique SOCKS sur le port local 1080 au travers d'une machine pivot ?",
      "opts": [
        "ssh -D 1080 user@pivot",
        "ssh -L 1080:remote:80 user@pivot",
        "ssh -R 1080:localhost:80 user@pivot",
        "ssh -p 1080 user@pivot"
      ],
      "correct": 0,
      "exp": "L'option \"-D\" de SSH ouvre un proxy SOCKS dynamique local qui route le trafic de n'importe quel outil (via proxychains ou navigateur) à travers la machine pivot distante."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "&lt; 50 % — Reprenez les sections théoriques et revois les définitions clés."
    },
    {
      "cls": "mid",
      "text": "50–69 % — Pratique les exercices N1 de l'atelier avant de retenter le test."
    },
    {
      "cls": "good",
      "text": "70–94 % — Bon niveau opérationnel : affine les cas limites et les options d'outils."
    },
    {
      "cls": "top",
      "text": "≥ 95 % — Maîtrise d'ingénierie validée : passe au module suivant."
    }
  ],
  "flashcards": [
    { "q": 'Qu’est-ce que « GTFOBins » ?', "a": 'GTFOBins : Catalogue de référence des binaires Unix légitimes détournables pour échapper à un shell restreint ou élever ses privilèges.' },
    { "q": 'Qu’est-ce que « NOP Sled » ?', "a": "NOP Sled : Suite d'octets 0x90 créant une zone tampon d'atterrissage sécurisée précédant le shellcode lors d'un buffer overflow." },
    { "q": 'Qu’est-ce que « Unquoted Service Path » ?', "a": "Unquoted Service Path : Chemin d'exécutable de service Windows contenant des espaces sans guillemets permettant l'injection de binaire." },
    { "q": 'Qu’est-ce que « SeImpersonatePrivilege » ?', "a": "SeImpersonatePrivilege : Privilège Windows autorisant l'usurpation de jetons de sécurité clients pour obtenir les droits NT AUTHORITY\\SYSTEM." },
    { "q": "Qu’est-ce que « L'exploitation de buffer overflows détourne EIP/RIP mais se heurte aux protections modernes ASLR, DEP/NX et Canaries. » ?", "a": "L'exploitation de buffer overflows détourne EIP/RIP mais se heurte aux protections modernes ASLR, DEP/NX et Canaries." },
    { "q": "Qu’est-ce que « Metasploit structure l'attaque en exploits, payloads, modules auxiliaires et sessions de post-exploitation Meterpreter. » ?", "a": "Metasploit structure l'attaque en exploits, payloads, modules auxiliaires et sessions de post-exploitation Meterpreter." },
    { "q": "Qu’est-ce que « Sous Linux, les binaires SUID non nécessaires et les règles sudoers NOPASSWD sont les vecteurs d'escalade les plus courants. » ?", "a": "Sous Linux, les binaires SUID non nécessaires et les règles sudoers NOPASSWD sont les vecteurs d'escalade les plus courants." },
    {
      "q": "Quel est le rôle du registre EIP (x86) / RIP (x64) dans un binaire en cours d'exécution ?",
      "a": "Il stocke l'adresse mémoire de la prochaine instruction machine à exécuter. Son détournement permet de contrôler le flux d'exécution."
    },
    {
      "q": "Quelles sont les 3 protections mémoire majeures contre les buffer overflows modernes ?",
      "a": "1. DEP / NX (mémoire non exécutable), 2. ASLR (adresses aléatoires), 3. Stack Canaries (sentinelles anti-écrasement de pile)."
    },
    {
      "q": "Quelle commande find Linux permet d'énumérer tous les binaires dotés du bit SUID ?",
      "a": "find / -perm -4000 -type f 2>/dev/null (identifie les binaires exécutés avec les droits du propriétaire, souvent root)."
    },
    {
      "q": "Comment exploite-t-on la directive « (ALL) NOPASSWD: /usr/bin/find » dans sudoers ?",
      "a": "En lançant : sudo find . -exec /bin/sh \\; ce qui ouvre immédiatement un shell root interactif sans mot de passe."
    },
    {
      "q": "Quel est le principe d'une attaque par chemin de service non quoté sous Windows ?",
      "a": "Si le chemin comporte des espaces sans guillemets, l'attaquant dépose un binaire malveillant au nom tronqué (ex: Program.exe) dans un dossier parent inscriptible."
    },
    {
      "q": "À quoi sert la technique de pivoting dans un test d'intrusion d'infrastructure ?",
      "a": "À utiliser une machine compromise comme passerelle de rebond pour router des attaques vers un sous-réseau interne inaccessible depuis Internet."
    }
  ]
};
