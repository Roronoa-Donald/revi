/* ═══════════════════════════════════════════════════════════════
   RD Linux — exercises.js
   Moteur d'exercices interactifs + données des 8 modules
   5 guidés + 10 quiz + 3 drag&drop par chapitre = 144 exercices
   ═══════════════════════════════════════════════════════════════ */

const exerciseData = {

  /* ──────── MODULE 1 : Commandes de base ──────── */
  chapitre1: {
    guided: [
      { q: "Quelle commande affiche le répertoire courant ?", hints: ["3 lettres", "Print Working Directory", "Commence par 'p'"], answer: "pwd" },
      { q: "Quelle commande liste le contenu d'un dossier avec les détails ?", hints: ["C'est une variante de ls", "Ajoute un flag avec un tiret", "ls suivi de -l"], answer: "ls -l" },
      { q: "Comment aller dans le dossier /etc ?", hints: ["Commande de navigation", "Change Directory", "cd suivi du chemin"], answer: "cd /etc" },
      { q: "Quelle commande affiche les 10 premières lignes d'un fichier ?", hints: ["Pense à la tête d'un document", "C'est l'opposé de tail", "Commence par 'h'"], answer: "head" },
      { q: "Comment afficher le manuel de la commande ls ?", hints: ["Le manuel en anglais", "3 lettres + la commande", "man ..."], answer: "man ls" }
    ],
    quiz: [
      { type: "mcq", q: "Que signifie 'pwd' ?", options: ["Print Working Directory", "Password", "Print Word Document", "Path Working Dir"], correct: 0 },
      { type: "mcq", q: "Quel flag de ls affiche les fichiers cachés ?", options: ["-l", "-h", "-a", "-t"], correct: 2 },
      { type: "qa", q: "Quelle commande permet de revenir au répertoire personnel ?", answer: ["cd ~", "cd", "cd $HOME"] },
      { type: "mcq", q: "Que fait la commande 'cat fichier.txt' ?", options: ["Supprime le fichier", "Affiche le contenu", "Copie le fichier", "Crée le fichier"], correct: 1 },
      { type: "qa", q: "Quelle commande affiche les dernières lignes d'un fichier en temps réel ?", answer: ["tail -f", "tail -f fichier"] },
      { type: "mcq", q: "Quel symbole représente le répertoire parent ?", options: ["~", "..", ".", "/"], correct: 1 },
      { type: "mcq", q: "La commande 'echo $USER' affiche :", options: ["Le mot USER", "Le nom de l'utilisateur courant", "Le répertoire home", "Le hostname"], correct: 1 },
      { type: "qa", q: "Quelle commande efface l'écran du terminal ?", answer: ["clear"] },
      { type: "mcq", q: "Que fait 'history' ?", options: ["Affiche le manuel", "Affiche l'historique des commandes", "Montre les fichiers récents", "Affiche la date"], correct: 1 },
      { type: "qa", q: "Quelle commande affiche le nom de la machine ?", answer: ["hostname"] }
    ],
    dragdrop: [
      { instruction: "Associe chaque commande à sa fonction :", pairs: [["pwd", "Affiche le répertoire courant"], ["ls", "Liste les fichiers"], ["cd", "Change de répertoire"], ["cat", "Affiche le contenu d'un fichier"], ["man", "Affiche le manuel"]] },
      { instruction: "Associe chaque flag de ls à son rôle :", pairs: [["-l", "Affichage détaillé"], ["-a", "Affiche les fichiers cachés"], ["-h", "Tailles lisibles (Ko, Mo)"], ["-t", "Tri par date de modification"]] },
      { instruction: "Associe chaque symbole à sa signification :", pairs: [["~", "Répertoire personnel"], ["..", "Répertoire parent"], [".", "Répertoire courant"], ["/", "Racine du système"]] }
    ]
  },

  /* ──────── MODULE 2 : Manipulation de fichiers ──────── */
  chapitre2: {
    guided: [
      { q: "Quelle commande crée un fichier vide ?", hints: ["Comme 'toucher' un fichier", "5 lettres", "touch"], answer: "touch" },
      { q: "Comment copier un dossier 'projet' dans /tmp ?", hints: ["Utilise cp avec un flag récursif", "Le flag est -r", "cp -r projet /tmp"], answer: "cp -r projet /tmp" },
      { q: "Comment renommer un fichier old.txt en new.txt ?", hints: ["Renommer = déplacer au même endroit", "C'est la commande mv", "mv old.txt new.txt"], answer: "mv old.txt new.txt" },
      { q: "Quelle commande crée un dossier avec ses sous-dossiers ?", hints: ["mkdir avec un flag", "Le flag pour les parents", "mkdir -p"], answer: "mkdir -p" },
      { q: "Comment créer une archive tar.gz du dossier 'projets' ?", hints: ["Commande tar avec des flags", "-czf pour compresser", "tar -czf projets.tar.gz projets"], answer: "tar -czf projets.tar.gz projets" }
    ],
    quiz: [
      { type: "mcq", q: "Que fait 'rm -r dossier' ?", options: ["Renomme le dossier", "Supprime le dossier et son contenu", "Déplace le dossier", "Copie le dossier"], correct: 1 },
      { type: "qa", q: "Quelle commande supprime un dossier VIDE ?", answer: ["rmdir"] },
      { type: "mcq", q: "Que fait le flag -i avec rm ou cp ?", options: ["Mode silencieux", "Mode interactif (demande confirmation)", "Mode récursif", "Mode verbose"], correct: 1 },
      { type: "mcq", q: "La commande 'ln -s' crée :", options: ["Un fichier vide", "Un lien symbolique", "Un dossier", "Une copie"], correct: 1 },
      { type: "qa", q: "Comment décompresser une archive backup.tar.gz ?", answer: ["tar -xzf backup.tar.gz", "tar xzf backup.tar.gz"] },
      { type: "mcq", q: "Quelle commande faut-il installer pour utiliser zip sur Debian ?", options: ["apt install zip", "apt install compress", "apt install tar", "Il est installé par défaut"], correct: 0 },
      { type: "qa", q: "Comment créer le dossier /home/sami/a/b/c même si a et b n'existent pas ?", answer: ["mkdir -p /home/sami/a/b/c"] },
      { type: "mcq", q: "Linux a-t-il une corbeille en ligne de commande ?", options: ["Oui, comme Windows", "Non, rm supprime définitivement", "Oui, dans /tmp/trash", "Oui, avec la commande undo"], correct: 1 },
      { type: "qa", q: "Comment voir le contenu d'une archive tar.gz sans l'extraire ?", answer: ["tar -tzf", "tar tzf"] },
      { type: "mcq", q: "Le flag -v dans cp -rv signifie :", options: ["Version", "Verbose (affiche les détails)", "Vérification", "Virtual"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque commande à son action :", pairs: [["touch", "Crée un fichier vide"], ["mkdir", "Crée un dossier"], ["cp", "Copie fichiers/dossiers"], ["mv", "Déplace ou renomme"], ["rm", "Supprime"]] },
      { instruction: "Associe les flags de tar à leur rôle :", pairs: [["-c", "Créer une archive"], ["-x", "Extraire une archive"], ["-z", "Compresser avec gzip"], ["-f", "Spécifier le nom du fichier"], ["-t", "Lister le contenu"]] },
      { instruction: "Associe chaque commande de suppression à son usage :", pairs: [["rm fichier", "Supprime un fichier"], ["rm -r dossier", "Supprime un dossier et son contenu"], ["rm -i fichier", "Supprime avec confirmation"], ["rmdir dossier", "Supprime un dossier vide"]] }
    ]
  },

  /* ──────── MODULE 3 : Droits & Permissions ──────── */
  chapitre3: {
    guided: [
      { q: "Quelle permission octale donne rwxr-xr-x ?", hints: ["rwx = 4+2+1 = 7", "r-x = 4+0+1 = 5", "Donc 755"], answer: "755" },
      { q: "Quelle commande rend un script exécutable ?", hints: ["Modifie les permissions", "chmod avec un flag", "chmod +x script.sh"], answer: "chmod +x script.sh" },
      { q: "Quelle commande change le propriétaire d'un fichier pour l'utilisateur alice ?", hints: ["Change Owner", "Besoin de sudo", "sudo chown alice fichier"], answer: "sudo chown alice fichier" },
      { q: "Quel umask donne des fichiers en 644 par défaut ?", hints: ["Fichiers : 666 - umask = permissions", "666 - xxx = 644", "xxx = 022"], answer: "0022" },
      { q: "Quelle permission octale donne rw-r--r-- ?", hints: ["rw- = 4+2+0 = 6", "r-- = 4+0+0 = 4", "Donc 644"], answer: "644" }
    ],
    quiz: [
      { type: "mcq", q: "Dans ls -l, que signifie 'drwxr-xr-x' ?", options: ["Fichier avec tous les droits", "Dossier avec rwx propriétaire, r-x groupe et autres", "Lien symbolique", "Fichier exécutable"], correct: 1 },
      { type: "qa", q: "Quelle valeur octale correspond à r (lecture) ?", answer: ["4"] },
      { type: "mcq", q: "La commande 'chmod 700 fichier' donne :", options: ["Tous les droits à tout le monde", "rwx uniquement au propriétaire", "Lecture seule pour tous", "Aucun droit"], correct: 1 },
      { type: "qa", q: "Quelle commande change le groupe propriétaire d'un fichier ?", answer: ["chgrp", "sudo chgrp"] },
      { type: "mcq", q: "Le SUID (chmod 4755) permet :", options: ["D'exécuter le fichier en tant que son propriétaire", "De supprimer le fichier", "De le rendre invisible", "De le partager sur le réseau"], correct: 0 },
      { type: "mcq", q: "Que fait 'chmod u+x fichier' ?", options: ["Ajoute l'exécution pour tous", "Ajoute l'exécution pour le propriétaire", "Retire l'exécution", "Ajoute la lecture"], correct: 1 },
      { type: "qa", q: "Quelle permission octale donne rwx à tous (propriétaire, groupe, autres) ?", answer: ["777"] },
      { type: "mcq", q: "Le sticky bit (chmod 1777) est typiquement utilisé pour :", options: ["/etc", "/tmp", "/home", "/boot"], correct: 1 },
      { type: "qa", q: "Quelle est la commande pour changer le propriétaire ET le groupe ?", answer: ["chown user:group", "sudo chown user:group fichier"] },
      { type: "mcq", q: "Que fait 'chmod -R 755 dossier' ?", options: ["Change les permissions du dossier uniquement", "Change les permissions récursivement", "Retire les permissions", "Affiche les permissions"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque lettre de permission à sa valeur octale :", pairs: [["r (lecture)", "4"], ["w (écriture)", "2"], ["x (exécution)", "1"], ["- (aucune)", "0"]] },
      { instruction: "Associe chaque permission octale à sa représentation :", pairs: [["755", "rwxr-xr-x"], ["644", "rw-r--r--"], ["700", "rwx------"], ["777", "rwxrwxrwx"]] },
      { instruction: "Associe chaque commande à son rôle :", pairs: [["chmod", "Change les permissions"], ["chown", "Change le propriétaire"], ["chgrp", "Change le groupe"], ["umask", "Définit les permissions par défaut"]] }
    ]
  },

  /* ──────── MODULE 4 : Recherche ──────── */
  chapitre4: {
    guided: [
      { q: "Quelle commande trouve tous les fichiers .log dans /var/log ?", hints: ["Commande find", "Avec le flag -name", "find /var/log -name '*.log'"], answer: "find /var/log -name '*.log'" },
      { q: "Comment chercher le mot 'error' récursivement dans un dossier ?", hints: ["Utilise grep", "Le flag -r pour récursif", "grep -r 'error' ."], answer: "grep -r 'error'" },
      { q: "Quelle commande redirige la sortie d'erreur vers /dev/null ?", hints: ["Descripteur de fichier 2", "Redirige avec >", "2>/dev/null"], answer: "2>/dev/null" },
      { q: "Comment compter le nombre de lignes d'un fichier ?", hints: ["Word Count", "Flag -l pour les lignes", "wc -l fichier"], answer: "wc -l" },
      { q: "Quelle commande localise rapidement un fichier par son nom ?", hints: ["Plus rapide que find", "Utilise une base de données", "locate"], answer: "locate" }
    ],
    quiz: [
      { type: "mcq", q: "Le flag -i de grep signifie :", options: ["Inverse la recherche", "Ignore la casse", "Interactif", "Inclut les sous-dossiers"], correct: 1 },
      { type: "qa", q: "Quel symbole permet de chaîner deux commandes (pipe) ?", answer: ["|"] },
      { type: "mcq", q: "Que fait 'find / -type d -name config' ?", options: ["Cherche des fichiers nommés config", "Cherche des dossiers nommés config", "Supprime les dossiers config", "Affiche la config"], correct: 1 },
      { type: "qa", q: "Quelle commande met à jour la base de données de locate ?", answer: ["sudo updatedb", "updatedb"] },
      { type: "mcq", q: "La redirection >> (double chevron) :", options: ["Écrase le fichier", "Ajoute à la fin du fichier", "Redirige les erreurs", "Lit le fichier"], correct: 1 },
      { type: "qa", q: "Quelle commande indique le chemin d'un programme installé ?", answer: ["which"] },
      { type: "mcq", q: "Que fait 'sort -n' ?", options: ["Tri alphabétique", "Tri numérique", "Tri inverse", "Tri par taille"], correct: 1 },
      { type: "mcq", q: "Que fait 'grep -c pattern fichier' ?", options: ["Colorie les résultats", "Compte les lignes correspondantes", "Cherche sans la casse", "Cherche dans le contexte"], correct: 1 },
      { type: "qa", q: "Quel fichier spécial absorbe toute donnée envoyée ?", answer: ["/dev/null"] },
      { type: "mcq", q: "Que fait 'uniq -c' ?", options: ["Supprime les doublons", "Compte les occurrences de chaque ligne", "Trie par unicité", "Affiche les lignes uniques"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque flag de find à son rôle :", pairs: [["-name", "Cherche par nom"], ["-type f", "Fichiers uniquement"], ["-type d", "Dossiers uniquement"], ["-size +10M", "Taille supérieure à 10 Mo"], ["-delete", "Supprime les résultats"]] },
      { instruction: "Associe chaque redirection à son action :", pairs: [[">", "Écrase le fichier avec la sortie"], [">>", "Ajoute la sortie au fichier"], ["2>", "Redirige les erreurs"], ["&>", "Redirige tout (sortie + erreurs)"], ["<", "Lit l'entrée depuis un fichier"]] },
      { instruction: "Associe chaque flag de grep à son rôle :", pairs: [["-i", "Ignorer la casse"], ["-r", "Recherche récursive"], ["-n", "Afficher les numéros de ligne"], ["-v", "Inverser la recherche"], ["-l", "Afficher seulement les noms de fichiers"]] }
    ]
  },

  /* ──────── MODULE 5 : Éditeurs Vi/Vim & Nano ──────── */
  chapitre5: {
    guided: [
      { q: "Dans Nano, quel raccourci sauvegarde le fichier ?", hints: ["Ctrl + une lettre", "O comme Output", "Ctrl+O"], answer: "Ctrl+O" },
      { q: "Dans Vim, comment passer en mode insertion ?", hints: ["Une seule touche", "Insert = i", "Tape la lettre i"], answer: "i" },
      { q: "Dans Vim, comment quitter sans sauvegarder ?", hints: ["Mode commande avec :", "Quitter = q, forcer = !", ":q!"], answer: ":q!" },
      { q: "Dans Nano, quel raccourci permet de quitter ?", hints: ["Ctrl + une lettre", "X comme eXit", "Ctrl+X"], answer: "Ctrl+X" },
      { q: "Dans Vim, comment sauvegarder ET quitter ?", hints: ["Mode commande avec :", "Write + Quit", ":wq"], answer: ":wq" }
    ],
    quiz: [
      { type: "mcq", q: "Quel est le mode par défaut quand on ouvre Vim ?", options: ["Insertion", "Normal", "Commande", "Visuel"], correct: 1 },
      { type: "qa", q: "Dans Vim, quelle touche permet de revenir en mode Normal ?", answer: ["Esc", "Echap", "Escape"] },
      { type: "mcq", q: "Dans Nano, que signifie le ^ dans les raccourcis ?", options: ["Alt", "Shift", "Ctrl", "Super"], correct: 2 },
      { type: "mcq", q: "La commande Vim 'dd' permet de :", options: ["Dupliquer une ligne", "Supprimer une ligne", "Descendre d'une ligne", "Debug"], correct: 1 },
      { type: "qa", q: "Comment chercher le mot 'error' dans Vim ?", answer: ["/error"] },
      { type: "mcq", q: "Quelle commande Vim remplace tous les 'foo' par 'bar' ?", options: [":replace foo bar", ":%s/foo/bar/g", ":change foo bar", "/foo/bar"], correct: 1 },
      { type: "qa", q: "Dans Vim, comment copier (yank) une ligne ?", answer: ["yy"] },
      { type: "mcq", q: "Quel éditeur est le plus simple pour un débutant ?", options: ["Vim", "Vi", "Nano", "Emacs"], correct: 2 },
      { type: "qa", q: "Dans Nano, quel raccourci permet de rechercher du texte ?", answer: ["Ctrl+W"] },
      { type: "mcq", q: "La commande 'update-alternatives --config editor' sert à :", options: ["Installer un éditeur", "Mettre à jour l'éditeur", "Choisir l'éditeur par défaut", "Supprimer un éditeur"], correct: 2 }
    ],
    dragdrop: [
      { instruction: "Associe chaque raccourci Nano à son action :", pairs: [["Ctrl+O", "Sauvegarder"], ["Ctrl+X", "Quitter"], ["Ctrl+K", "Couper la ligne"], ["Ctrl+U", "Coller"], ["Ctrl+W", "Rechercher"]] },
      { instruction: "Associe chaque commande Vim à son action :", pairs: [["i", "Mode insertion"], ["Esc", "Mode normal"], [":wq", "Sauvegarder et quitter"], ["dd", "Supprimer une ligne"], ["u", "Annuler"]] },
      { instruction: "Associe chaque mode Vim à sa description :", pairs: [["Normal", "Navigation et commandes"], ["Insertion", "Saisie de texte"], ["Commande", "Commandes avec :"]] }
    ]
  },

  /* ──────── MODULE 6 : Utilisateurs & Groupes ──────── */
  chapitre6: {
    guided: [
      { q: "Quelle commande crée un utilisateur 'bob' avec son répertoire home ?", hints: ["useradd avec un flag", "Le flag -m crée le home", "sudo useradd -m bob"], answer: "sudo useradd -m bob" },
      { q: "Comment ajouter l'utilisateur alice au groupe sudo ?", hints: ["usermod avec des flags", "-aG pour ajouter au groupe", "sudo usermod -aG sudo alice"], answer: "sudo usermod -aG sudo alice" },
      { q: "Quelle commande affiche l'UID et les groupes d'un utilisateur ?", hints: ["2 lettres", "Comme l'identité", "id"], answer: "id" },
      { q: "Comment définir un mot de passe pour l'utilisateur bob ?", hints: ["Commande pour les mots de passe", "Besoin de sudo", "sudo passwd bob"], answer: "sudo passwd bob" },
      { q: "Quelle commande supprime un utilisateur ET son répertoire home ?", hints: ["userdel avec un flag", "Le flag -r pour remove", "sudo userdel -r bob"], answer: "sudo userdel -r bob" }
    ],
    quiz: [
      { type: "mcq", q: "Le fichier /etc/shadow contient :", options: ["Les noms des groupes", "Les mots de passe chiffrés", "Les permissions des fichiers", "La config réseau"], correct: 1 },
      { type: "qa", q: "Quel est l'UID de root ?", answer: ["0"] },
      { type: "mcq", q: "La commande 'usermod -G sudo alice' (sans -a) :", options: ["Ajoute alice au groupe sudo", "Remplace tous les groupes par sudo", "Retire alice du groupe sudo", "Affiche les groupes d'alice"], correct: 1 },
      { type: "qa", q: "Quelle commande utiliser pour éditer /etc/sudoers en sécurité ?", answer: ["visudo", "sudo visudo"] },
      { type: "mcq", q: "Les UID >= 1000 correspondent à :", options: ["Comptes root", "Comptes système", "Comptes utilisateurs normaux", "Comptes désactivés"], correct: 2 },
      { type: "mcq", q: "La commande 'su -' permet de :", options: ["Supprimer un utilisateur", "Devenir root", "Créer un utilisateur", "Voir qui est connecté"], correct: 1 },
      { type: "qa", q: "Quelle commande liste les utilisateurs actuellement connectés ?", answer: ["who", "w"] },
      { type: "mcq", q: "Le flag -L de usermod sert à :", options: ["Lister les utilisateurs", "Verrouiller un compte", "Créer un lien", "Logger les actions"], correct: 1 },
      { type: "qa", q: "Comment forcer le changement de mot de passe à la prochaine connexion ?", answer: ["sudo passwd -e", "passwd -e"] },
      { type: "mcq", q: "Quelle commande affiche le dernier login de chaque utilisateur ?", options: ["last", "lastlog", "who", "history"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe chaque commande utilisateur à son action :", pairs: [["useradd", "Crée un utilisateur"], ["userdel", "Supprime un utilisateur"], ["usermod", "Modifie un utilisateur"], ["passwd", "Change le mot de passe"]] },
      { instruction: "Associe chaque fichier à son contenu :", pairs: [["/etc/passwd", "Infos utilisateurs (nom, UID, home, shell)"], ["/etc/shadow", "Mots de passe chiffrés"], ["/etc/group", "Infos des groupes"], ["/etc/sudoers", "Configuration des droits sudo"]] },
      { instruction: "Associe chaque flag de useradd à son rôle :", pairs: [["-m", "Créer le répertoire home"], ["-s /bin/bash", "Définir le shell"], ["-G sudo", "Ajouter au groupe sudo"], ["-c 'Nom'", "Ajouter un commentaire"]] }
    ]
  },

  /* ──────── MODULE 7 : Réseau & SSH ──────── */
  chapitre7: {
    guided: [
      { q: "Quelle commande affiche les interfaces réseau et leurs IP ?", hints: ["Commence par ip", "ip suivi de 'addr'", "ip addr"], answer: "ip addr" },
      { q: "Quel fichier contient la configuration réseau statique sur Debian ?", hints: ["Dans le dossier /etc/network/", "C'est le fichier des interfaces", "/etc/network/interfaces"], answer: "/etc/network/interfaces" },
      { q: "Quelle commande installe le serveur SSH ?", hints: ["Utilise apt", "Le paquet s'appelle openssh-server", "sudo apt install openssh-server"], answer: "sudo apt install openssh-server" },
      { q: "Comment se connecter en SSH à l'utilisateur sami sur 192.168.1.100 ?", hints: ["Commande ssh", "user@adresse_ip", "ssh sami@192.168.1.100"], answer: "ssh sami@192.168.1.100" },
      { q: "Quelle commande copie la clé publique SSH sur un serveur ?", hints: ["Copier la clé d'identité", "ssh-copy-id", "ssh-copy-id user@serveur"], answer: "ssh-copy-id" }
    ],
    quiz: [
      { type: "mcq", q: "Pour configurer une IP statique sur Debian, le mot-clé est :", options: ["dhcp", "auto", "static", "manual"], correct: 2 },
      { type: "qa", q: "Quel fichier contient les serveurs DNS ?", answer: ["/etc/resolv.conf"] },
      { type: "mcq", q: "Le port SSH par défaut est :", options: ["21", "22", "80", "443"], correct: 1 },
      { type: "qa", q: "Quelle commande redémarre le service réseau sur Debian ?", answer: ["sudo systemctl restart networking", "systemctl restart networking"] },
      { type: "mcq", q: "La directive 'PermitRootLogin no' dans sshd_config :", options: ["Autorise root à se connecter", "Interdit la connexion SSH en root", "Supprime le compte root", "Active le login automatique"], correct: 1 },
      { type: "qa", q: "Quelle commande génère une paire de clés SSH ?", answer: ["ssh-keygen", "ssh-keygen -t ed25519"] },
      { type: "mcq", q: "La commande 'scp' sert à :", options: ["Se connecter en SSH", "Copier des fichiers via SSH", "Scanner le réseau", "Configurer SSH"], correct: 1 },
      { type: "mcq", q: "Le fichier /etc/hosts permet de :", options: ["Configurer le pare-feu", "Définir des résolutions DNS locales", "Lister les utilisateurs autorisés", "Configurer le DHCP"], correct: 1 },
      { type: "qa", q: "Quelle commande affiche les ports TCP en écoute ?", answer: ["ss -tulnp", "ss -tuln"] },
      { type: "mcq", q: "Après modification de sshd_config, il faut :", options: ["Redémarrer la machine", "Redémarrer le service ssh", "Rien, c'est automatique", "Supprimer le fichier"], correct: 1 }
    ],
    dragdrop: [
      { instruction: "Associe les paramètres de /etc/network/interfaces :", pairs: [["address", "Adresse IP de la machine"], ["netmask", "Masque de sous-réseau"], ["gateway", "Passerelle par défaut"], ["dns-nameservers", "Serveurs DNS"]] },
      { instruction: "Associe les commandes SSH à leur rôle :", pairs: [["ssh user@host", "Se connecter à distance"], ["scp fichier user@host:path", "Copier un fichier vers le serveur"], ["ssh-keygen", "Générer une paire de clés"], ["ssh-copy-id user@host", "Copier la clé publique sur le serveur"]] },
      { instruction: "Associe les directives sshd_config à leur effet :", pairs: [["Port 2222", "Changer le port SSH"], ["PermitRootLogin no", "Interdire la connexion root"], ["PasswordAuthentication no", "Exiger les clés SSH"], ["AllowUsers sami", "Limiter les utilisateurs autorisés"]] }
    ]
  },

  /* ──────── MODULE 8 : Bash Scripting ──────── */
  chapitre8: {
    guided: [
      { q: "Quelle est la première ligne obligatoire d'un script Bash ?", hints: ["Le shebang", "# suivi de !", "#!/bin/bash"], answer: "#!/bin/bash" },
      { q: "Comment rendre un script 'mon_script.sh' exécutable ?", hints: ["Modifie les permissions", "chmod avec +x", "chmod +x mon_script.sh"], answer: "chmod +x mon_script.sh" },
      { q: "Comment stocker le résultat de la commande 'date' dans une variable ?", hints: ["Variable=$(commande)", "Utilise $(...)", "date_actuelle=$(date)"], answer: "date_actuelle=$(date)" },
      { q: "Quelle variable spéciale contient le nombre d'arguments du script ?", hints: ["Commence par $", "Un symbole spécial", "$#"], answer: "$#" },
      { q: "Comment lire une saisie clavier et la stocker dans la variable 'nom' ?", hints: ["Commande read", "read suivi du nom de variable", "read nom"], answer: "read nom" }
    ],
    quiz: [
      { type: "mcq", q: "Le shebang #!/bin/bash sert à :", options: ["Commenter le script", "Indiquer l'interpréteur à utiliser", "Rendre le script exécutable", "Définir une variable"], correct: 1 },
      { type: "qa", q: "Quelle variable contient le premier argument passé au script ?", answer: ["$1"] },
      { type: "mcq", q: "En Bash, 'nom = Sami' (avec espaces) provoque :", options: ["Aucun problème", "Une erreur", "Une variable vide", "Un avertissement"], correct: 1 },
      { type: "mcq", q: "Le mot-clé pour terminer un bloc if est :", options: ["end", "endif", "fi", "done"], correct: 2 },
      { type: "qa", q: "Quel opérateur compare si deux nombres sont égaux dans [[ ]] ?", answer: ["-eq"] },
      { type: "mcq", q: "La boucle 'for i in {1..5}; do echo $i; done' affiche :", options: ["1 seul nombre", "Les nombres de 1 à 5", "Une erreur", "Le mot 'i' 5 fois"], correct: 1 },
      { type: "qa", q: "Quel flag de bash active le mode debug (affiche chaque commande) ?", answer: ["-x", "bash -x"] },
      { type: "mcq", q: "Que fait 'set -e' dans un script ?", options: ["Active l'echo", "Arrête le script à la première erreur", "Active le mode étendu", "Exporte les variables"], correct: 1 },
      { type: "qa", q: "Comment ajouter un job cron ? Quelle commande ouvre l'éditeur crontab ?", answer: ["crontab -e"] },
      { type: "mcq", q: "La variable $? contient :", options: ["Le nom du script", "Le PID du process", "Le code retour de la dernière commande", "Le nombre de fichiers"], correct: 2 }
    ],
    dragdrop: [
      { instruction: "Associe chaque variable spéciale à sa signification :", pairs: [["$0", "Nom du script"], ["$1", "Premier argument"], ["$#", "Nombre d'arguments"], ["$@", "Tous les arguments"], ["$?", "Code retour de la dernière commande"]] },
      { instruction: "Associe chaque structure de contrôle à son mot-clé de fermeture :", pairs: [["if...then", "fi"], ["for...do", "done"], ["while...do", "done"], ["case...in", "esac"]] },
      { instruction: "Associe chaque opérateur de test à sa signification :", pairs: [["-eq", "Égal (nombres)"], ["-gt", "Plus grand que"], ["-f", "Le fichier existe"], ["-d", "Le dossier existe"], ["-z", "Chaîne vide"]] }
    ]
  }
};


/* ═══════════════════════════════════════════════
   MOTEUR DE RENDU DES EXERCICES
   ═══════════════════════════════════════════════ */

const ExerciseEngine = {
  currentChapter: null,
  data: null,

  init() {
    const container = document.getElementById('interactive-exercise');
    if (!container) return;
    const path = window.location.pathname;
    const match = path.match(/chapitre(\d+)/);
    if (!match) return;
    this.currentChapter = 'chapitre' + match[1];
    this.data = exerciseData[this.currentChapter];
    if (!this.data) return;
    this.render(container);
  },

  render(container) {
    container.innerHTML = `
      <h2><i class="fas fa-dumbbell" style="color:var(--accent);margin-right:0.5rem;"></i>Exercices Interactifs</h2>
      <div class="exercise-tabs">
        <button class="ex-tab active" data-tab="guided"><i class="fas fa-hands-helping"></i> Guidés (${this.data.guided.length})</button>
        <button class="ex-tab" data-tab="quiz"><i class="fas fa-question-circle"></i> Quiz (${this.data.quiz.length})</button>
        <button class="ex-tab" data-tab="dragdrop"><i class="fas fa-arrows-alt"></i> Drag & Drop (${this.data.dragdrop.length})</button>
      </div>
      <div id="ex-guided" class="ex-panel active">${this.renderGuided()}</div>
      <div id="ex-quiz" class="ex-panel">${this.renderQuiz()}</div>
      <div id="ex-dragdrop" class="ex-panel">${this.renderDragDrop()}</div>
    `;
    this.bindTabs(container);
    this.bindGuided(container);
    this.bindQuiz(container);
    this.bindDragDrop(container);
  },

  /* ── Onglets ── */
  bindTabs(container) {
    container.querySelectorAll('.ex-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        container.querySelectorAll('.ex-tab').forEach(t => t.classList.remove('active'));
        container.querySelectorAll('.ex-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        container.querySelector('#ex-' + tab.dataset.tab).classList.add('active');
      });
    });
  },

  /* ══════════ GUIDED ══════════ */
  renderGuided() {
    return this.data.guided.map((g, i) => `
      <div class="guided-exercise" data-index="${i}">
        <p class="guided-q"><strong>Q${i + 1}.</strong> ${g.q}</p>
        <div class="guided-hints">
          ${g.hints.map((h, hi) => `<button class="hint-btn" data-hint="${hi}">💡 Indice ${hi + 1}</button><span class="hint-text" id="hint-${i}-${hi}">${h}</span>`).join('')}
        </div>
        <div class="guided-answer-zone">
          <input type="text" class="guided-input" placeholder="Ta réponse..." data-index="${i}">
          <button class="guided-check-btn" data-index="${i}">Vérifier</button>
        </div>
        <div class="guided-feedback" id="gfeedback-${i}"></div>
      </div>
    `).join('');
  },

  bindGuided(container) {
    container.querySelectorAll('.hint-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.closest('.guided-exercise').dataset.index;
        const hintId = btn.dataset.hint;
        const el = document.getElementById(`hint-${idx}-${hintId}`);
        el.classList.toggle('visible');
      });
    });
    container.querySelectorAll('.guided-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        const input = container.querySelector(`.guided-input[data-index="${i}"]`);
        const fb = document.getElementById(`gfeedback-${i}`);
        const userAns = input.value.trim().toLowerCase();
        const correct = this.data.guided[i].answer.toLowerCase();
        if (userAns === correct) {
          fb.innerHTML = '<span class="correct">✅ Correct ! +15 XP</span>';
          fb.className = 'guided-feedback correct';
          if (typeof GameEngine !== 'undefined') GameEngine.addXP(15);
        } else {
          fb.innerHTML = `<span class="incorrect">❌ Pas tout à fait. La réponse est : <code>${this.data.guided[i].answer}</code></span>`;
          fb.className = 'guided-feedback incorrect';
        }
      });
    });
    container.querySelectorAll('.guided-input').forEach(input => {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          container.querySelector(`.guided-check-btn[data-index="${input.dataset.index}"]`).click();
        }
      });
    });
  },

  /* ══════════ QUIZ ══════════ */
  renderQuiz() {
    return this.data.quiz.map((q, i) => {
      if (q.type === 'mcq') {
        return `
          <div class="quiz-question" data-index="${i}" data-type="mcq">
            <p><strong>Q${i + 1}.</strong> ${q.q}</p>
            <div class="mcq-options">
              ${q.options.map((o, oi) => `<button class="mcq-btn" data-qi="${i}" data-oi="${oi}">${o}</button>`).join('')}
            </div>
            <div class="quiz-feedback" id="qfeedback-${i}"></div>
          </div>`;
      } else {
        return `
          <div class="quiz-question" data-index="${i}" data-type="qa">
            <p><strong>Q${i + 1}.</strong> ${q.q}</p>
            <div class="qa-zone">
              <input type="text" class="qa-input" placeholder="Ta réponse..." data-index="${i}">
              <button class="qa-check-btn" data-index="${i}">Vérifier</button>
            </div>
            <div class="quiz-feedback" id="qfeedback-${i}"></div>
          </div>`;
      }
    }).join('');
  },

  bindQuiz(container) {
    container.querySelectorAll('.mcq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = parseInt(btn.dataset.qi);
        const oi = parseInt(btn.dataset.oi);
        const fb = document.getElementById(`qfeedback-${qi}`);
        const btns = container.querySelectorAll(`.mcq-btn[data-qi="${qi}"]`);
        btns.forEach(b => { b.disabled = true; b.classList.remove('correct', 'incorrect'); });
        if (oi === this.data.quiz[qi].correct) {
          btn.classList.add('correct');
          fb.innerHTML = '✅ Bonne réponse ! +10 XP';
          fb.className = 'quiz-feedback correct';
          if (typeof GameEngine !== 'undefined') GameEngine.addXP(10);
        } else {
          btn.classList.add('incorrect');
          btns[this.data.quiz[qi].correct].classList.add('correct');
          fb.innerHTML = '❌ Mauvaise réponse.';
          fb.className = 'quiz-feedback incorrect';
        }
      });
    });
    container.querySelectorAll('.qa-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        const input = container.querySelector(`.qa-input[data-index="${i}"]`);
        const fb = document.getElementById(`qfeedback-${i}`);
        const userAns = input.value.trim().toLowerCase();
        const correct = this.data.quiz[i].answer.map(a => a.toLowerCase());
        if (correct.some(c => userAns.includes(c) || c.includes(userAns))) {
          fb.innerHTML = '✅ Correct ! +10 XP';
          fb.className = 'quiz-feedback correct';
          if (typeof GameEngine !== 'undefined') GameEngine.addXP(10);
        } else {
          fb.innerHTML = `❌ Réponse attendue : <code>${this.data.quiz[i].answer[0]}</code>`;
          fb.className = 'quiz-feedback incorrect';
        }
      });
    });
    container.querySelectorAll('.qa-input').forEach(input => {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') container.querySelector(`.qa-check-btn[data-index="${input.dataset.index}"]`).click();
      });
    });
  },

  /* ══════════ DRAG & DROP ══════════ */
  renderDragDrop() {
    return this.data.dragdrop.map((dd, i) => {
      const shuffledVals = [...dd.pairs.map(p => p[1])].sort(() => Math.random() - 0.5);
      return `
        <div class="dd-exercise" data-index="${i}">
          <p><strong>Exercice ${i + 1}.</strong> ${dd.instruction}</p>
          <div class="dd-targets">
            ${dd.pairs.map((p, pi) => `
              <div class="dd-row" data-pair="${pi}">
                <span class="dd-key">${p[0]}</span>
                <span class="dd-dropzone" data-expected="${p[1]}" data-pi="${pi}">Glisse ici</span>
              </div>
            `).join('')}
          </div>
          <div class="dd-pool" id="dd-pool-${i}">
            ${shuffledVals.map(v => `<span class="dd-item" draggable="true" data-value="${v}">${v}</span>`).join('')}
          </div>
          <button class="dd-check-btn" data-index="${i}">Vérifier</button>
          <div class="dd-feedback" id="ddfeedback-${i}"></div>
        </div>`;
    }).join('');
  },

  bindDragDrop(container) {
    let draggedItem = null;

    container.querySelectorAll('.dd-item').forEach(item => {
      item.addEventListener('dragstart', e => {
        draggedItem = item;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        draggedItem = null;
      });
    });

    container.querySelectorAll('.dd-dropzone').forEach(zone => {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (!draggedItem) return;
        if (zone.querySelector('.dd-item')) {
          const existing = zone.querySelector('.dd-item');
          const pool = draggedItem.closest('.dd-pool') || container.querySelector(`#dd-pool-${zone.closest('.dd-exercise').dataset.index}`);
          pool.appendChild(existing);
        }
        zone.textContent = '';
        zone.appendChild(draggedItem);
      });
    });

    /* Mobile : tap-to-select */
    let selectedItem = null;
    container.querySelectorAll('.dd-item').forEach(item => {
      item.addEventListener('click', () => {
        if (selectedItem) selectedItem.classList.remove('selected');
        selectedItem = item;
        item.classList.add('selected');
      });
    });
    container.querySelectorAll('.dd-dropzone').forEach(zone => {
      zone.addEventListener('click', () => {
        if (!selectedItem) return;
        if (zone.querySelector('.dd-item')) {
          const existing = zone.querySelector('.dd-item');
          const pool = container.querySelector(`#dd-pool-${zone.closest('.dd-exercise').dataset.index}`);
          pool.appendChild(existing);
        }
        zone.textContent = '';
        zone.appendChild(selectedItem);
        selectedItem.classList.remove('selected');
        selectedItem = null;
      });
    });

    container.querySelectorAll('.dd-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        const exercise = container.querySelector(`.dd-exercise[data-index="${i}"]`);
        const zones = exercise.querySelectorAll('.dd-dropzone');
        const fb = document.getElementById(`ddfeedback-${i}`);
        let correct = 0;
        zones.forEach(zone => {
          const placed = zone.querySelector('.dd-item');
          zone.classList.remove('dd-correct', 'dd-incorrect');
          if (placed && placed.dataset.value === zone.dataset.expected) {
            zone.classList.add('dd-correct');
            correct++;
          } else {
            zone.classList.add('dd-incorrect');
          }
        });
        if (correct === zones.length) {
          fb.innerHTML = `✅ Parfait ! ${correct}/${zones.length} — +20 XP`;
          fb.className = 'dd-feedback correct';
          if (typeof GameEngine !== 'undefined') GameEngine.addXP(20);
        } else {
          fb.innerHTML = `❌ ${correct}/${zones.length} correct(s). Réessaie !`;
          fb.className = 'dd-feedback incorrect';
        }
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => ExerciseEngine.init());
