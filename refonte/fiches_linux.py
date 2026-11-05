# refonte/fiches_linux.py
# -*- coding: utf-8 -*-
"""
Fiches de conception Linux B1 (lx-c1-e1 à lx-c6-e3, 18 fiches)
100% commandes shell validées par regex, 0 exécution shell, 0 script prématuré.
Sources : Dr Abasse KPEGOUNI (Chap. 1, 2, 4, 5 et TP2 Droits).
"""

import os

FICHES_DIR = '/home/rd/Desktop/proba/refonte/fiches'
os.makedirs(FICHES_DIR, exist_ok=True)

fiches_data = [
    # Chapitre 1 : Se situer et explorer
    {
        "id": "lx-c1-e1",
        "title": "Afficher le répertoire courant et se situer",
        "chapter": 1,
        "source": "cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:4",
        "context": "Administration système au quotidien sur un serveur Debian / Ubuntu. Lors d'une connexion SSH, l'administrateur doit vérifier immédiatement dans quel dossier de l'arborescence il se trouve avant d'effectuer toute opération.",
        "type": "Commande interactive shell (validation regex déterministe sans exécution)",
        "component": "Console interactive CodeLab en mode terminal",
        "statement": "Vous venez d'ouvrir une session terminal sur un serveur Linux. Quelle commande tapez-vous pour afficher le chemin absolu complet de votre répertoire de travail actuel ?",
        "solution": "pwd",
        "steps": "1. La commande standard Unix pour 'Print Working Directory' est 'pwd'.\n2. Elle ne requiert aucun argument ni option pour afficher le chemin absolu.",
        "accepted": [
            "pwd",
            "pwd -L",
            "pwd -P",
            "/bin/pwd",
            "echo $PWD"
        ],
        "rejected": [
            {"cmd": "cd", "reason": "La commande 'cd' sert à changer de répertoire, pas à afficher l'emplacement courant."},
            {"cmd": "ls", "reason": "La commande 'ls' liste le contenu d'un répertoire, elle n'affiche pas le chemin de travail courant."},
            {"cmd": "dir", "reason": "Sous Unix / Linux, la commande canonique pour afficher le répertoire courant est 'pwd'."},
            {"cmd": "pwd /home", "reason": "La commande 'pwd' ne prend pas de chemin en paramètre : elle affiche l'emplacement où vous êtes déjà."},
            {"cmd": "whereis pwd", "reason": "Vous cherchez à exécuter la commande 'pwd', pas à localiser son binaire avec 'whereis'."}
        ]
    },
    {
        "id": "lx-c1-e2",
        "title": "Lister tous les fichiers y compris cachés au format long",
        "chapter": 1,
        "source": "cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:5",
        "context": "Audit d'un compte utilisateur suspect ou configuration initiale. L'administrateur doit inspecter tous les fichiers de configuration (.bashrc, .profile...) et vérifier leurs droits et propriétaires.",
        "type": "Commande interactive shell avec options combinées",
        "component": "Console interactive CodeLab",
        "statement": "Dans le répertoire courant, affichez la liste détaillée de tous les fichiers et répertoires, y compris les fichiers cachés (dont le nom commence par un point), avec leurs permissions, nombre de liens, propriétaire, taille et date de modification.",
        "solution": "ls -la",
        "steps": "1. La commande de listage est 'ls'.\n2. L'option pour inclure les fichiers cachés est '-a' (--all).\n3. L'option pour le format long détaillé est '-l'.\n4. Les deux options peuvent être combinées en '-la' ou '-al', ou écrites séparément.",
        "accepted": [
            "ls -la",
            "ls -al",
            "ls -l -a",
            "ls -a -l",
            "ls -la ."
        ],
        "rejected": [
            {"cmd": "ls", "reason": "Un simple 'ls' n'affiche ni les détails (permissions, taille) ni les fichiers cachés."},
            {"cmd": "ls -l", "reason": "L'option '-l' affiche les détails mais ignore les fichiers cachés (qui nécessitent '-a')."},
            {"cmd": "ls -a", "reason": "L'option '-a' affiche les fichiers cachés mais sans le format long détaillé (il manque '-l')."},
            {"cmd": "dir -a", "reason": "La commande standard d'environnement Unix est 'ls'."},
            {"cmd": "ls -h", "reason": "L'option '-h' rend les tailles lisibles mais n'affiche ni le format long ni les fichiers cachés."}
        ]
    },
    {
        "id": "lx-c1-e3",
        "title": "Retour au répertoire parent et répertoire précédent",
        "chapter": 1,
        "source": "cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:5",
        "context": "Navigation arborescente rapide dans une hiérarchie de logs ou de paquets lors d'un dépannage système.",
        "type": "Commande de navigation shell",
        "component": "Console interactive CodeLab",
        "statement": "Quelle commande tapez-vous pour remonter exactement d'un niveau dans la hiérarchie des répertoires (vers le répertoire parent) ?",
        "solution": "cd ..",
        "steps": "1. La commande de changement de répertoire est 'cd'.\n2. Le répertoire parent est désigné universellement par '..'.",
        "accepted": [
            "cd ..",
            "cd ../",
            "cd ./..",
            "cd ..; pwd",
            "cd \"..\""
        ],
        "rejected": [
            {"cmd": "cd .", "reason": "Le point '.' désigne le répertoire courant, pas le répertoire parent ('..')."},
            {"cmd": "cd /", "reason": "'cd /' vous ramène à la racine du système, pas au répertoire parent immédiat."},
            {"cmd": "cd ~", "reason": "'cd ~' vous ramène dans votre répertoire personnel, pas au parent du dossier courant."},
            {"cmd": "back", "reason": "La commande 'back' n'existe pas en shell standard ; utilisez 'cd ..'."},
            {"cmd": "cd..", "reason": "En shell Unix, il faut impérativement un espace entre la commande 'cd' et son argument '..'."}
        ]
    },

    # Chapitre 2 : Chemins absolus et arborescence FHS
    {
        "id": "lx-c2-e1",
        "title": "Distinction et utilisation des chemins absolus",
        "chapter": 2,
        "source": "cours B1 IT/LINUX/Chap.1_Systeme_Linux.pdf:12",
        "context": "Administration de services système : consultation des fichiers journaux situés dans le répertoire standard /var/log indépendamment du dossier où se trouve l'administrateur.",
        "type": "Commande avec chemin absolu FHS",
        "component": "Console interactive CodeLab",
        "statement": "Quelle commande permet d'accéder directement au répertoire des journaux système '/var/log' en utilisant obligatoirement un chemin absolu, peu importe votre position actuelle ?",
        "solution": "cd /var/log",
        "steps": "1. Un chemin absolu commence toujours par le caractère racine '/'.\n2. La commande de navigation est 'cd /var/log'.",
        "accepted": [
            "cd /var/log",
            "cd /var/log/",
            "cd \"/var/log\"",
            "cd '/var/log'",
            "cd //var/log"
        ],
        "rejected": [
            {"cmd": "cd var/log", "reason": "Sans '/' initial, 'var/log' est un chemin relatif qui échouera si vous n'êtes pas à la racine."},
            {"cmd": "cd log", "reason": "Ce chemin relatif ne fonctionne que si vous êtes déjà dans '/var'."},
            {"cmd": "ls /var/log", "reason": "La consigne demande d'accéder (se déplacer dans) le répertoire, utilisez 'cd'."},
            {"cmd": "cd ~/var/log", "reason": "Le tilde '~' pointe vers /home/user, or /var/log est situé directement sous la racine /."},
            {"cmd": "goto /var/log", "reason": "La commande de déplacement est 'cd' (Change Directory)."}
        ]
    },
    {
        "id": "lx-c2-e2",
        "title": "Identification du rôle des répertoires FHS",
        "chapter": 2,
        "source": "cours B1 IT/LINUX/Chap.2_Systeme_Fichier.pdf:8",
        "context": "Modification de la configuration d'un service réseau (ex: SSH, Apache). L'administrateur doit savoir dans quel répertoire se trouvent tous les fichiers de configuration système.",
        "type": "Navigation et repérage FHS",
        "component": "Console interactive CodeLab",
        "statement": "Déplacez-vous dans le répertoire système standard qui héberge les fichiers de configuration de l'ensemble du système d'exploitation et des services installés.",
        "solution": "cd /etc",
        "steps": "1. Selon la norme FHS enseignée au Chapitre 2 (p. 8), /etc contient tous les fichiers de configuration système textuels.\n2. La commande est 'cd /etc'.",
        "accepted": [
            "cd /etc",
            "cd /etc/",
            "cd \"/etc\"",
            "cd '/etc'",
            "cd //etc"
        ],
        "rejected": [
            {"cmd": "cd /bin", "reason": "/bin contient les binaires exécutables indispensables, pas les fichiers de configuration."},
            {"cmd": "cd /var", "reason": "/var contient les données variables (logs, spools, caches), pas la configuration."},
            {"cmd": "cd /home", "reason": "/home contient les répertoires personnels des utilisateurs ordinaires."},
            {"cmd": "cd /dev", "reason": "/dev contient les fichiers spéciaux représentant les périphériques matériels."},
            {"cmd": "cd etc", "reason": "Utilisez le chemin absolu '/etc' pour être certain de cibler la configuration système."}
        ]
    },
    {
        "id": "lx-c2-e3",
        "title": "Résolution de chemin relatif avec double remontée",
        "chapter": 2,
        "source": "cours B1 IT/LINUX/Chap.2_Systeme_Fichier.pdf:11",
        "context": "Vous travaillez dans '/home/etudiant/projets/c'. Vous devez vous déplacer dans le dossier 'notes' situé dans '/home/etudiant/notes' sans utiliser de chemin absolu.",
        "type": "Chemin relatif avec '../..'",
        "component": "Console interactive CodeLab",
        "statement": "Depuis le répertoire courant '/home/etudiant/projets/c', écrivez la commande permettant d'accéder au dossier 'notes' situé dans '/home/etudiant/notes' par un chemin relatif strict (en utilisant la remontée d'arborescence).",
        "solution": "cd ../../notes",
        "steps": "1. Depuis 'projets/c', '..' remonte dans 'projets'.\n2. Le second '..' remonte dans '/home/etudiant'.\n3. On redescend ensuite dans 'notes' : '../../notes'.",
        "accepted": [
            "cd ../../notes",
            "cd ../../notes/",
            "cd ./../../notes",
            "cd \"../../notes\"",
            "cd '../../notes'"
        ],
        "rejected": [
            {"cmd": "cd /home/etudiant/notes", "reason": "La consigne exige expressément un chemin relatif, pas un chemin absolu débutant par '/'."},
            {"cmd": "cd ../notes", "reason": "Un seul '..' vous amène dans '/home/etudiant/projets', où 'notes' n'existe pas."},
            {"cmd": "cd ../../../notes", "reason": "Trois remontées vous placent dans '/home', vous êtes remonté trop haut."},
            {"cmd": "cd ~/notes", "reason": "'~/notes' est un raccourci absolu vers le home ; la consigne impose un chemin relatif '../..'"},
            {"cmd": "cd ..; cd notes", "reason": "Depuis 'projets/c', un seul 'cd ..' vous laisse dans 'projets' ; il faut remonter deux fois."}
        ]
    },

    # Chapitre 3 : Manipuler fichiers et répertoires
    {
        "id": "lx-c3-e1",
        "title": "Créer une arborescence complète avec répertoires parents",
        "chapter": 3,
        "source": "cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:6",
        "context": "Initialisation de la structure d'un nouveau projet de développement logiciel sur un serveur.",
        "type": "Commande de création de répertoires",
        "component": "Console interactive CodeLab",
        "statement": "Créez en une seule commande l'arborescence complète 'projet/src/modeles' dans le répertoire courant, en créant automatiquement tous les répertoires parents intermédiaires manquants s'ils n'existent pas déjà.",
        "solution": "mkdir -p projet/src/modeles",
        "steps": "1. La commande de création de répertoire est 'mkdir'.\n2. L'option pour créer récursivement les répertoires parents manquants sans lever d'erreur est '-p' (--parents).\n3. L'argument est 'projet/src/modeles'.",
        "accepted": [
            "mkdir -p projet/src/modeles",
            "mkdir -p ./projet/src/modeles",
            "mkdir -p \"projet/src/modeles\"",
            "mkdir --parents projet/src/modeles",
            "mkdir -p projet/src/modeles/"
        ],
        "rejected": [
            {"cmd": "mkdir projet/src/modeles", "reason": "Sans l'option '-p', 'mkdir' échoue dès qu'un répertoire parent ('projet' ou 'src') n'existe pas."},
            {"cmd": "touch -p projet/src/modeles", "reason": "'touch' crée des fichiers vides, pas des répertoires ; utilisez 'mkdir -p'."},
            {"cmd": "md -p projet/src/modeles", "reason": "La commande standard Linux est 'mkdir', pas 'md'."},
            {"cmd": "mkdir -r projet/src/modeles", "reason": "L'option pour les répertoires parents de 'mkdir' est '-p', pas '-r'."},
            {"cmd": "mkdir -m projet/src/modeles", "reason": "'-m' configure les permissions ; pour créer les parents manquants, utilisez '-p'."}
        ]
    },
    {
        "id": "lx-c3-e2",
        "title": "Copier récursivement un répertoire entier",
        "chapter": 3,
        "source": "cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:6",
        "context": "Sauvegarde à chaud d'un dossier de code source avant une mise à jour délicate.",
        "type": "Commande de copie de répertoire",
        "component": "Console interactive CodeLab",
        "statement": "Copiez l'intégralité du répertoire 'site_web' ainsi que tout son contenu (fichiers et sous-dossiers) vers un nouveau répertoire nommé 'site_web_backup'.",
        "solution": "cp -r site_web site_web_backup",
        "steps": "1. La commande de copie est 'cp'.\n2. Pour copier récursivement un répertoire, l'option '-r' (ou '-R') est obligatoire.\n3. La syntaxe est 'cp -r source destination'.",
        "accepted": [
            "cp -r site_web site_web_backup",
            "cp -R site_web site_web_backup",
            "cp -r ./site_web ./site_web_backup",
            "cp -a site_web site_web_backup",
            "cp --recursive site_web site_web_backup"
        ],
        "rejected": [
            {"cmd": "cp site_web site_web_backup", "reason": "'cp' sans option récursive refuse de copier un répertoire et renvoie l'erreur 'cp: -r not specified'."},
            {"cmd": "mv site_web site_web_backup", "reason": "'mv' déplace ou renomme le répertoire, il ne conserve pas l'original ; la consigne demande de copier."},
            {"cmd": "copy site_web site_web_backup", "reason": "La commande Linux est 'cp', pas 'copy'."},
            {"cmd": "cp -d site_web site_web_backup", "reason": "L'option '-d' préserve les liens ; pour copier un dossier entier, utilisez '-r' ou '-a'."},
            {"cmd": "cp -p site_web site_web_backup", "reason": "'-p' préserve les attributs, mais ne permet pas la copie récursive sans '-r'."}
        ]
    },
    {
        "id": "lx-c3-e3",
        "title": "Suppression sécurisée de répertoire vide vs fichiers",
        "chapter": 3,
        "source": "cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:6",
        "context": "Nettoyage de répertoires temporaires vides après archivage de données d'étudiants.",
        "type": "Commande de suppression sécurisée",
        "component": "Console interactive CodeLab",
        "statement": "Quelle commande standard Unix permet de supprimer en toute sécurité le répertoire 'ancien_dossier' UNIQUEMENT si celui-ci est parfaitement vide (sans risquer d'effacer des fichiers par inadvertance s'il contient encore des données) ?",
        "solution": "rmdir ancien_dossier",
        "steps": "1. La commande spécialisée 'rmdir' refuse de supprimer un dossier s'il contient des fichiers, garantissant une sécurité totale.\n2. La syntaxe est 'rmdir nom_dossier'.",
        "accepted": [
            "rmdir ancien_dossier",
            "rmdir ./ancien_dossier",
            "rmdir \"ancien_dossier\"",
            "rmdir 'ancien_dossier'",
            "rmdir -p ancien_dossier"
        ],
        "rejected": [
            {"cmd": "rm -rf ancien_dossier", "reason": "'rm -rf' détruit aveuglément tout le contenu sans vérifier si le dossier est vide ; la consigne impose la commande sécurisée pour dossier vide."},
            {"cmd": "rm -r ancien_dossier", "reason": "'rm -r' supprime récursivement les fichiers qu'il contient ; utilisez la commande dédiée 'rmdir'."},
            {"cmd": "rm ancien_dossier", "reason": "'rm' sans option refuse de supprimer un répertoire ('rm: cannot remove directory')."},
            {"cmd": "delete ancien_dossier", "reason": "La commande 'delete' n'existe pas sous Linux ; utilisez 'rmdir'."},
            {"cmd": "del ancien_dossier", "reason": "'del' est une commande DOS/Windows ; sous Linux pour un dossier vide, utilisez 'rmdir'."}
        ]
    },

    # Chapitre 4 : Lire, chercher et filtrer
    {
        "id": "lx-c4-e1",
        "title": "Visualiser les 10 premières lignes d'un fichier journal",
        "chapter": 4,
        "source": "cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:7",
        "context": "Examen de l'en-tête d'un fichier de log serveur volumineux pour vérifier le démarrage du service.",
        "type": "Commande d'affichage partiel de texte",
        "component": "Console interactive CodeLab",
        "statement": "Affichez uniquement les 10 premières lignes du fichier journal '/var/log/boot.log'.",
        "solution": "head -n 10 /var/log/boot.log",
        "steps": "1. La commande pour afficher le début d'un fichier est 'head'.\n2. Par défaut ou avec '-n 10', elle affiche les 10 premières lignes.",
        "accepted": [
            "head -n 10 /var/log/boot.log",
            "head -10 /var/log/boot.log",
            "head /var/log/boot.log",
            "head -n10 /var/log/boot.log",
            "head --lines=10 /var/log/boot.log"
        ],
        "rejected": [
            {"cmd": "tail -n 10 /var/log/boot.log", "reason": "'tail' affiche la fin du fichier, alors que la consigne demande les premières lignes ('head')."},
            {"cmd": "cat /var/log/boot.log", "reason": "'cat' affiche l'intégralité du fichier d'un coup, sans limiter aux 10 premières lignes."},
            {"cmd": "less -n 10 /var/log/boot.log", "reason": "'less' est un paginateur interactif, la commande dédiée pour le début est 'head'."},
            {"cmd": "top /var/log/boot.log", "reason": "'top' surveille les processus en cours, ce n'est pas un lecteur de fichier texte."},
            {"cmd": "head -f /var/log/boot.log", "reason": "L'option '-f' s'utilise avec 'tail' pour suivre un fichier en continu, pas avec 'head'."}
        ]
    },
    {
        "id": "lx-c4-e2",
        "title": "Rechercher une chaîne insensible à la casse avec grep",
        "chapter": 4,
        "source": "cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:8",
        "context": "Analyse d'incidents : repérer toutes les occurrences du mot 'failed' (quelle que soit sa casse : FAILED, Failed, failed) dans le fichier '/var/log/auth.log'.",
        "type": "Commande de filtrage de motifs",
        "component": "Console interactive CodeLab",
        "statement": "Recherchez toutes les lignes contenant le mot 'failed' dans le fichier '/var/log/auth.log' en ignorant la différence entre majuscules et minuscules.",
        "solution": "grep -i 'failed' /var/log/auth.log",
        "steps": "1. La commande de recherche textuelle par motif est 'grep'.\n2. L'option pour l'insensibilité à la casse est '-i' (--ignore-case).\n3. La syntaxe est 'grep -i motif fichier'.",
        "accepted": [
            "grep -i failed /var/log/auth.log",
            "grep -i 'failed' /var/log/auth.log",
            "grep -i \"failed\" /var/log/auth.log",
            "grep --ignore-case failed /var/log/auth.log",
            "grep -iE 'failed' /var/log/auth.log"
        ],
        "rejected": [
            {"cmd": "grep failed /var/log/auth.log", "reason": "Sans l'option '-i', grep est sensible à la casse et manquera 'FAILED' ou 'Failed'."},
            {"cmd": "find failed /var/log/auth.log", "reason": "'find' cherche des fichiers dans l'arborescence, pour chercher du texte dans un fichier utilisez 'grep'."},
            {"cmd": "cat /var/log/auth.log", "reason": "'cat' affiche tout sans filtrer ; combinez avec 'grep -i' ou appliquez grep directement."},
            {"cmd": "grep -v failed /var/log/auth.log", "reason": "'-v' inverse la recherche (affiche les lignes qui NE contiennent PAS le mot)."},
            {"cmd": "locate failed", "reason": "'locate' recherche des noms de fichiers dans une base de données, pas du contenu de fichier."}
        ]
    },
    {
        "id": "lx-c4-e3",
        "title": "Rechercher des fichiers par nom avec find",
        "chapter": 4,
        "source": "cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:9",
        "context": "Maintenance de serveur : localiser tous les fichiers journaux d'extension '.log' dans l'arborescence '/var/log'.",
        "type": "Commande de recherche arborescente",
        "component": "Console interactive CodeLab",
        "statement": "Recherchez tous les fichiers ordinaires (de type fichier) dont le nom se termine par '.log' situés dans le répertoire '/var/log' ou ses sous-répertoires.",
        "solution": "find /var/log -type f -name '*.log'",
        "steps": "1. La commande de recherche dans l'arborescence est 'find'.\n2. Le répertoire de départ est '/var/log'.\n3. L'option pour cibler uniquement les fichiers réguliers est '-type f'.\n4. L'option de correspondance de nom est '-name \"*.log\"'.",
        "accepted": [
            "find /var/log -type f -name '*.log'",
            "find /var/log -type f -name \"*.log\"",
            "find /var/log -name '*.log' -type f",
            "find /var/log -name \"*.log\" -type f",
            "find /var/log/ -type f -name '*.log'"
        ],
        "rejected": [
            {"cmd": "find /var/log *.log", "reason": "Il manque l'option '-name' pour spécifier le motif de recherche du nom de fichier."},
            {"cmd": "ls /var/log/*.log", "reason": "'ls' ne cherche pas récursivement dans les sous-dossiers et échoue si aucun fichier n'est trouvé au premier niveau."},
            {"cmd": "grep -r '*.log' /var/log", "reason": "'grep' recherche du contenu à l'intérieur des fichiers, pas le nom des fichiers eux-mêmes."},
            {"cmd": "find /var/log -type d -name '*.log'", "reason": "'-type d' recherche des répertoires, or la consigne demande des fichiers ordinaires ('-type f')."},
            {"cmd": "whereis *.log", "reason": "'whereis' recherche les binaires système, pas les fichiers dans /var/log."}
        ]
    },

    # Chapitre 5 : Utilisateurs et groupes
    {
        "id": "lx-c5-e1",
        "title": "Analyse des 7 champs du fichier /etc/passwd",
        "chapter": 5,
        "source": "cours B1 IT/LINUX/Chap.5_Gestion_des_Utilisateurs_et_Groupe.pdf:2",
        "context": "Audit de sécurité des comptes : afficher la ligne d'un compte utilisateur pour contrôler son shell et son répertoire personnel.",
        "type": "Filtrage et inspection de compte",
        "component": "Console interactive CodeLab",
        "statement": "Affichez la ligne correspondant à l'utilisateur 'root' dans le fichier officiel des comptes '/etc/passwd' afin de vérifier son UID et son shell.",
        "solution": "grep '^root:' /etc/passwd",
        "steps": "1. Le fichier d'enregistrement des utilisateurs sous Linux est '/etc/passwd'.\n2. Pour cibler le compte 'root' au début de la ligne, on utilise 'grep \"^root:\" /etc/passwd' ou 'grep root /etc/passwd'.",
        "accepted": [
            "grep '^root:' /etc/passwd",
            "grep \"^root:\" /etc/passwd",
            "grep root /etc/passwd",
            "grep 'root' /etc/passwd",
            "grep -w root /etc/passwd"
        ],
        "rejected": [
            {"cmd": "cat /etc/shadow", "reason": "/etc/shadow contient les empreintes de mots de passe et nécessite les privilèges root, la liste des comptes est dans /etc/passwd."},
            {"cmd": "find root /etc/passwd", "reason": "'find' cherche des fichiers dans l'arborescence, pour inspecter une ligne utilisez 'grep'."},
            {"cmd": "useradd root", "reason": "'root' existe déjà, la consigne demande d'afficher ses paramètres dans /etc/passwd."},
            {"cmd": "passwd root", "reason": "'passwd' modifie le mot de passe, il n'affiche pas la ligne complète des 7 champs de configuration."},
            {"cmd": "whoami", "reason": "'whoami' affiche le nom de l'utilisateur actuel connecté, pas les champs de root dans /etc/passwd."}
        ]
    },
    {
        "id": "lx-c5-e2",
        "title": "Créer un utilisateur avec home directory et shell Bash",
        "chapter": 5,
        "source": "cours B1 IT/LINUX/Chap.5_Gestion_des_Utilisateurs_et_Groupe.pdf:4",
        "context": "Arrivée d'un nouvel étudiant en informatique : l'administrateur crée son compte avec son dossier personnel et le shell interactif standard.",
        "type": "Commande d'administration de compte",
        "component": "Console interactive CodeLab",
        "statement": "Quelle commande d'administration permet de créer le nouvel utilisateur 'etudiant' en créant automatiquement son répertoire personnel (/home/etudiant) et en lui assignant '/bin/bash' comme shell de connexion par défaut ?",
        "solution": "useradd -m -s /bin/bash etudiant",
        "steps": "1. La commande système de création est 'useradd'.\n2. L'option pour créer le répertoire personnel est '-m' (--create-home).\n3. L'option pour spécifier le shell est '-s /bin/bash'.\n4. Le nom du compte est 'etudiant'.",
        "accepted": [
            "useradd -m -s /bin/bash etudiant",
            "useradd -s /bin/bash -m etudiant",
            "useradd -m -s /bin/bash \"etudiant\"",
            "adduser --shell /bin/bash etudiant",
            "useradd --create-home --shell /bin/bash etudiant"
        ],
        "rejected": [
            {"cmd": "useradd etudiant", "reason": "Sans l'option '-m', aucun répertoire personnel ne sera créé dans /home pour l'utilisateur."},
            {"cmd": "usermod -m etudiant", "reason": "'usermod' sert à modifier un compte existant ; pour créer un compte, utilisez 'useradd'."},
            {"cmd": "adduser etudiant", "reason": "Précisez explicitement les options '-m' et '-s /bin/bash' demandées dans la consigne."},
            {"cmd": "useradd -d /bin/bash etudiant", "reason": "'-d' configure le chemin du répertoire personnel ; l'option pour le shell est '-s'."},
            {"cmd": "groupadd etudiant", "reason": "'groupadd' crée un groupe, pas un utilisateur."}
        ]
    },
    {
        "id": "lx-c5-e3",
        "title": "Ajouter un utilisateur à un groupe secondaire",
        "chapter": 5,
        "source": "cours B1 IT/LINUX/Chap.5_Gestion_des_Utilisateurs_et_Groupe.pdf:5",
        "context": "Attribution de droits sudo ou docker : un utilisateur doit être rattaché à un groupe existant sans perdre ses autres groupes secondaires.",
        "type": "Modification de compte utilisateur",
        "component": "Console interactive CodeLab",
        "statement": "Quelle commande permet d'ajouter l'utilisateur 'etudiant' au groupe secondaire 'sudo' tout en conservant scrupuleusement tous ses autres groupes secondaires existants ?",
        "solution": "usermod -aG sudo etudiant",
        "steps": "1. La commande de modification de compte est 'usermod'.\n2. L'option pour spécifier les groupes secondaires est '-G'.\n3. L'option d'ajout (append) indispensable pour ne pas écraser les autres groupes est '-a'.\n4. On combine en 'usermod -aG sudo etudiant'.",
        "accepted": [
            "usermod -aG sudo etudiant",
            "usermod -a -G sudo etudiant",
            "usermod -G sudo -a etudiant",
            "gpasswd -a etudiant sudo",
            "usermod --append --groups sudo etudiant"
        ],
        "rejected": [
            {"cmd": "usermod -G sudo etudiant", "reason": "DANGER MAJEUR : Sans l'option '-a', 'usermod -G' supprime l'utilisateur de TOUS ses autres groupes secondaires !"},
            {"cmd": "useradd -G sudo etudiant", "reason": "L'utilisateur 'etudiant' existe déjà, la commande pour modifier un compte existant est 'usermod'."},
            {"cmd": "groupadd sudo etudiant", "reason": "'groupadd' crée un nouveau groupe, il ne permet pas d'y ajouter un utilisateur."},
            {"cmd": "usermod -g sudo etudiant", "reason": "'-g' (minuscule) change le groupe principal de l'utilisateur, pas son groupe secondaire ('-G')."},
            {"cmd": "chown etudiant sudo", "reason": "'chown' modifie le propriétaire d'un fichier, pas l'appartenance d'un compte à un groupe."}
        ]
    },

    # Chapitre 6 : Droits d'accès et permissions
    {
        "id": "lx-c6-e1",
        "title": "Permissions octales standard pour script exécutable",
        "chapter": 6,
        "source": "cours B1 IT/LINUX/TP2_Droit_Acces_Fichier_Unix.pdf:1",
        "context": "Déploiement d'un script système : le propriétaire doit pouvoir lire, modifier et exécuter le script (rwx = 7), tandis que le groupe et les autres utilisateurs ne doivent pouvoir que le lire et l'exécuter (r-x = 5).",
        "type": "Attribution de permissions octales",
        "component": "Console interactive CodeLab",
        "statement": "Quelle commande en notation octale permet d'attribuer au fichier 'sauvegarde.sh' les droits suivants : lecture, écriture et exécution pour le propriétaire (rwx), lecture et exécution pour le groupe (r-x), et lecture et exécution pour les autres (r-x) ?",
        "solution": "chmod 755 sauvegarde.sh",
        "steps": "1. Propriétaire : r=4, w=2, x=1 -> 4+2+1 = 7.\n2. Groupe : r=4, w=0, x=1 -> 4+1 = 5.\n3. Autres : r=4, w=0, x=1 -> 4+1 = 5.\n4. La valeur octale est donc 755 : 'chmod 755 sauvegarde.sh'.",
        "accepted": [
            "chmod 755 sauvegarde.sh",
            "chmod 755 ./sauvegarde.sh",
            "chmod 0755 sauvegarde.sh",
            "chmod 755 \"sauvegarde.sh\"",
            "chmod 755 'sauvegarde.sh'"
        ],
        "rejected": [
            {"cmd": "chmod 775 sauvegarde.sh", "reason": "775 donnerait le droit d'écriture (w) au groupe, ce qui viole la consigne (r-x = 5)."},
            {"cmd": "chmod 777 sauvegarde.sh", "reason": "777 donne tous les droits à tout le monde, ce qui est une faute grave de sécurité."},
            {"cmd": "chmod 644 sauvegarde.sh", "reason": "644 ne donne aucun droit d'exécution (x), le script ne pourrait pas être exécuté."},
            {"cmd": "chown 755 sauvegarde.sh", "reason": "'chown' modifie le propriétaire d'un fichier, pour modifier les permissions utilisez 'chmod'."},
            {"cmd": "chmod +x sauvegarde.sh", "reason": "La consigne demande la notation octale exacte (755)."}
        ]
    },
    {
        "id": "lx-c6-e2",
        "title": "Permissions symboliques pour restreindre l'accès",
        "chapter": 6,
        "source": "cours B1 IT/LINUX/TP2_Droit_Acces_Fichier_Unix.pdf:1",
        "context": "Sécurisation d'un fichier sensible de clés de configuration : retrait immédiat des droits d'accès aux autres utilisateurs (others).",
        "type": "Attribution de permissions symboliques",
        "component": "Console interactive CodeLab",
        "statement": "En utilisant obligatoirement la notation symbolique de chmod, retirez le droit de lecture à la catégorie 'autres' (others) sur le fichier 'config.ini' sans toucher aux droits de l'utilisateur ni du groupe.",
        "solution": "chmod o-r config.ini",
        "steps": "1. La catégorie 'autres' est représentée par 'o' (others).\n2. Retirer un droit se fait avec le signe '-'.\n3. Le droit de lecture est 'r'.\n4. La commande est 'chmod o-r config.ini'.",
        "accepted": [
            "chmod o-r config.ini",
            "chmod o-r ./config.ini",
            "chmod o-r \"config.ini\"",
            "chmod o= config.ini",
            "chmod o-rw config.ini"
        ],
        "rejected": [
            {"cmd": "chmod g-r config.ini", "reason": "'g' cible le groupe ; la consigne demande de retirer les droits aux autres ('o')."},
            {"cmd": "chmod u-r config.ini", "reason": "'u' cible le propriétaire (user) ; utilisez 'o' pour les autres utilisateurs."},
            {"cmd": "chmod 640 config.ini", "reason": "La consigne impose obligatoirement la notation symbolique (ex: o-r), pas la notation octale."},
            {"cmd": "chmod -r config.ini", "reason": "'-r' sans préfixe retire la lecture à tout le monde (u, g, o), y compris le propriétaire !"},
            {"cmd": "chmod o+r config.ini", "reason": "Le signe '+' ajoute un droit ; pour retirer un droit, utilisez '-' (o-r)."}
        ]
    },
    {
        "id": "lx-c6-e3",
        "title": "Changement récursif de propriétaire et de groupe",
        "chapter": 6,
        "source": "cours B1 IT/LINUX/TP2_Droit_Acces_Fichier_Unix.pdf:1",
        "context": "Transfert de maintenance d'une application : affectation de tout le dossier web à l'utilisateur 'www-data' et au groupe 'www-data'.",
        "type": "Commande d'attribution de propriété récursive",
        "component": "Console interactive CodeLab",
        "statement": "Attribuez récursivement la propriété du dossier '/var/www/html' ainsi que de tous ses sous-fichiers et sous-dossiers à l'utilisateur 'www-data' et au groupe 'www-data'.",
        "solution": "chown -R www-data:www-data /var/www/html",
        "steps": "1. La commande de changement de propriétaire est 'chown'.\n2. L'option récursive est '-R'.\n3. La syntaxe combinée utilisateur:groupe est 'www-data:www-data'.\n4. La cible est '/var/www/html'.",
        "accepted": [
            "chown -R www-data:www-data /var/www/html",
            "chown -R www-data.www-data /var/www/html",
            "chown -R www-data:www-data /var/www/html/",
            "chown --recursive www-data:www-data /var/www/html",
            "chown -R 'www-data:www-data' /var/www/html"
        ],
        "rejected": [
            {"cmd": "chown www-data:www-data /var/www/html", "reason": "Sans l'option récursive '-R', seuls les droits du dossier racine changent, pas ceux des sous-fichiers."},
            {"cmd": "chmod -R www-data:www-data /var/www/html", "reason": "'chmod' modifie les permissions (rwx), pas le propriétaire ; utilisez 'chown'."},
            {"cmd": "chgrp -R www-data /var/www/html", "reason": "'chgrp' ne change que le groupe, la consigne demande de changer à la fois le propriétaire et le groupe."},
            {"cmd": "chown -r www-data:www-data /var/www/html", "reason": "Pour 'chown', l'option récursive s'écrit en majuscule : '-R'."},
            {"cmd": "chown -R www-data /var/www/html", "reason": "Cette commande oublie de modifier le groupe ; spécifiez 'www-data:www-data'."}
        ]
    }
]

def generate_fiche(data):
    accepted_lines = "\n".join([f"- `{cmd}`" for cmd in data["accepted"]])
    rejected_lines = "\n".join([f"- `{rej['cmd']}` : {rej['reason']}" for rej in data["rejected"]])
    
    md = f"""# Fiche de Conception — {data['id']} : {data['title']}

- **Identifiant** : `{data['id']}`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : {data['chapter']}
- **Source académique exacte** : `{data['source']}`
- **Type d'exercice** : {data['type']}
- **Composant d'interface** : {data['component']}

## 1. Contexte Métier & Académique
{data['context']}

## 2. Énoncé Complet
{data['statement']}

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
{data['solution']}
```

**Étapes de raisonnement :**
{data['steps']}

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
{accepted_lines}

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
{rejected_lines}
"""
    return md

for d in fiches_data:
    content = generate_fiche(d)
    path = os.path.join(FICHES_DIR, f"{d['id']}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"[ok] Fiche Linux créée : {d['id']}.md")

print(f"Total : {len(fiches_data)} fiches Linux B1 créées avec succès.")
