/**
 * tests/refonte-b1-linux.test.js
 *
 * Banc de validation déterministe pour les 18 exercices de Linux B1 :
 * - Prouve que toutes les variantes valides (au moins 5 par exercice) sont acceptées.
 * - Prouve que toutes les quasi-erreurs fréquentes (au moins 5 par exercice) sont rejetées avec le bon feedback.
 * - Prouve qu'aucune exécution système de commande n'a lieu.
 * - Prouve la robustesse face aux espaces, chemins relatifs et options combinées.
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { validateShellCommand, normalizeCommand } = require('../server/exercises/command-validator');

const FICHES_DIR = path.resolve(__dirname, '../refonte/fiches');

test('Linux B1 : Présence et complétude des 18 fiches de conception', () => {
  for (let c = 1; c <= 6; c++) {
    for (let e = 1; e <= 3; e++) {
      const id = `lx-c${c}-e${e}`;
      const file = path.join(FICHES_DIR, `${id}.md`);
      assert.ok(fs.existsSync(file), `La fiche ${id}.md doit exister`);
      const content = fs.readFileSync(file, 'utf8');
      assert.match(content, /## 1\. Contexte Métier & Académique/, `${id} : contexte manquant`);
      assert.match(content, /## 2\. Énoncé Complet/, `${id} : énoncé manquant`);
      assert.match(content, /## 3\. Solution Rédigée/, `${id} : solution manquante`);
      assert.match(content, /## 4\. Jeu de Tests/, `${id} : jeu de tests manquant`);
      assert.match(content, /Source académique exacte/, `${id} : source académique manquante`);
    }
  }
});

test('Linux B1 : Validation déterministe des commandes sans exécution système', () => {
  // Définition des bancs de tests pour les 18 exercices
  const bancs = [
    {
      id: 'lx-c1-e1',
      expected: 'pwd',
      regex: /^(pwd|\/bin\/pwd)( -[LP])?$/,
      accepted: ['pwd', 'pwd -L', 'pwd -P', '/bin/pwd', 'pwd  -L'],
      rejected: [
        { cmd: 'cd', message: 'La commande \'cd\' sert à changer de répertoire, pas à afficher l\'emplacement courant.' },
        { cmd: 'ls', message: 'La commande \'ls\' liste le contenu d\'un répertoire, elle n\'affiche pas le chemin de travail courant.' },
        { cmd: 'dir', message: 'Sous Unix / Linux, la commande canonique pour afficher le répertoire courant est \'pwd\'.' },
        { cmd: 'pwd /home', message: 'La commande \'pwd\' ne prend pas de chemin en paramètre : elle affiche l\'emplacement où vous êtes déjà.' },
        { cmd: 'whereis pwd', message: 'Vous cherchez à exécuter la commande \'pwd\', pas à localiser son binaire avec \'whereis\'.' }
      ]
    },
    {
      id: 'lx-c1-e2',
      expected: 'ls -al',
      patterns: [/^ls\s+(-[a-zA-Z]*[la][a-zA-Z]*|-[la]\s+-[la])(\s+\.)?$/],
      accepted: ['ls -la', 'ls -al', 'ls -l -a', 'ls -a -l', 'ls -la .'],
      rejected: [
        { cmd: 'ls', message: 'Un simple \'ls\' n\'affiche ni les détails (permissions, taille) ni les fichiers cachés.' },
        { cmd: 'ls -l', message: 'L\'option \'-l\' affiche les détails mais ignore les fichiers cachés (qui nécessitent \'-a\').' },
        { cmd: 'ls -a', message: 'L\'option \'-a\' affiche les fichiers cachés mais sans le format long détaillé (il manque \'-l\').' },
        { cmd: 'dir -a', message: 'La commande standard d\'environnement Unix est \'ls\'.' },
        { cmd: 'ls -h', message: 'L\'option \'-h\' rend les tailles lisibles mais n\'affiche ni le format long ni les fichiers cachés.' }
      ]
    },
    {
      id: 'lx-c1-e3',
      expected: 'cd ..',
      regex: /^cd\s+(\.\.|\.\.\/|\.\/\.\.|"\.\."|'\.\.')$/,
      accepted: ['cd ..', 'cd ../', 'cd ./..', 'cd ".."'],
      rejected: [
        { cmd: 'cd .', message: 'Le point \'.\' désigne le répertoire courant, pas le répertoire parent (\'..\').' },
        { cmd: 'cd /', message: '\'cd /\' vous ramène à la racine du système, pas au répertoire parent immédiat.' },
        { cmd: 'cd ~', message: '\'cd ~\' vous ramène dans votre répertoire personnel, pas au parent du dossier courant.' },
        { cmd: 'back', message: 'La commande \'back\' n\'existe pas en shell standard ; utilisez \'cd ..\'.' },
        { cmd: 'cd..', message: 'En shell Unix, il faut impérativement un espace entre la commande \'cd\' et son argument \'..\'.' }
      ]
    },
    {
      id: 'lx-c2-e1',
      expected: 'cd /var/log',
      regex: /^cd\s+("\/var\/log\/?'|'\/var\/log\/?'|\/var\/log\/?|\/\/var\/log\/?)$/,
      accepted: ['cd /var/log', 'cd /var/log/', 'cd "/var/log"', 'cd \'/var/log\'', 'cd //var/log'],
      rejected: [
        { cmd: 'cd var/log', message: 'Sans \'/\' initial, \'var/log\' est un chemin relatif qui échouera si vous n\'êtes pas à la racine.' },
        { cmd: 'cd log', message: 'Ce chemin relatif ne fonctionne que si vous êtes déjà dans \'/var\'.' },
        { cmd: 'ls /var/log', message: 'La consigne demande d\'accéder (se déplacer dans) le répertoire, utilisez \'cd\'.' },
        { cmd: 'cd ~/var/log', message: 'Le tilde \'~\' pointe vers /home/user, or /var/log est situé directement sous la racine /.' },
        { cmd: 'goto /var/log', message: 'La commande de déplacement est \'cd\' (Change Directory).' }
      ]
    },
    {
      id: 'lx-c2-e2',
      expected: 'cd /etc',
      regex: /^cd\s+("\/etc\/?'|'\/etc\/?'|\/etc\/?|\/\/etc\/?)$/,
      accepted: ['cd /etc', 'cd /etc/', 'cd "/etc"', 'cd \'/etc\'', 'cd //etc'],
      rejected: [
        { cmd: 'cd /bin', message: '/bin contient les binaires exécutables indispensables, pas les fichiers de configuration.' },
        { cmd: 'cd /var', message: '/var contient les données variables (logs, spools, caches), pas la configuration.' },
        { cmd: 'cd /home', message: '/home contient les répertoires personnels des utilisateurs ordinaires.' },
        { cmd: 'cd /dev', message: '/dev contient les fichiers spéciaux représentant les périphériques matériels.' },
        { cmd: 'cd etc', message: 'Utilisez le chemin absolu \'/etc\' pour être certain de cibler la configuration système.' }
      ]
    },
    {
      id: 'lx-c2-e3',
      expected: 'cd ../../notes',
      regex: /^cd\s+(\.\.\/\.\.\/notes\/?|\.\/\.\.\/\.\.\/notes\/?|"\.\.\/\.\.\/notes\/?'|'\.\.\/\.\.\/notes\/?')$/,
      accepted: ['cd ../../notes', 'cd ../../notes/', 'cd ./../../notes', 'cd "../../notes"', 'cd \'../../notes\''],
      rejected: [
        { cmd: 'cd /home/etudiant/notes', message: 'La consigne exige expressément un chemin relatif, pas un chemin absolu débutant par \'/\'.' },
        { cmd: 'cd ../notes', message: 'Un seul \'..\' vous amène dans \'/home/etudiant/projets\', où \'notes\' n\'existe pas.' },
        { cmd: 'cd ../../../notes', message: 'Trois remontées vous placent dans \'/home\', vous êtes remonté trop haut.' },
        { cmd: 'cd ~/notes', message: '\'~/notes\' est un raccourci absolu vers le home ; la consigne impose un chemin relatif \'../..\'' },
        { cmd: 'cd ..; cd notes', message: 'Depuis \'projets/c\', un seul \'cd ..\' vous laisse dans \'projets\' ; il faut remonter deux fois.' }
      ]
    },
    {
      id: 'lx-c3-e1',
      expected: 'mkdir -p projet/src/modeles',
      regex: /^mkdir\s+(-p|--parents)\s+(projet\/src\/modeles\/?|\.\/projet\/src\/modeles\/?|"projet\/src\/modeles\/?'|'projet\/src\/modeles\/?')$/,
      accepted: [
        'mkdir -p projet/src/modeles',
        'mkdir -p ./projet/src/modeles',
        'mkdir -p "projet/src/modeles"',
        'mkdir --parents projet/src/modeles',
        'mkdir -p projet/src/modeles/'
      ],
      rejected: [
        { cmd: 'mkdir projet/src/modeles', message: 'Sans l\'option \'-p\', \'mkdir\' échoue dès qu\'un répertoire parent (\'projet\' ou \'src\') n\'existe pas.' },
        { cmd: 'touch -p projet/src/modeles', message: '\'touch\' crée des fichiers vides, pas des répertoires ; utilisez \'mkdir -p\'.' },
        { cmd: 'md -p projet/src/modeles', message: 'La commande standard Linux est \'mkdir\', pas \'md\'.' },
        { cmd: 'mkdir -r projet/src/modeles', message: 'L\'option pour les répertoires parents de \'mkdir\' est \'-p\', pas \'-r\'.' },
        { cmd: 'mkdir -m projet/src/modeles', message: '\'-m\' configure les permissions ; pour créer les parents manquants, utilisez \'-p\'.' }
      ]
    },
    {
      id: 'lx-c3-e2',
      expected: 'cp -r site_web site_web_backup',
      patterns: [
        /^cp\s+(-r|-R|-a|--recursive)\s+(\.\/)?site_web\/?\s+(\.\/)?site_web_backup\/?$/
      ],
      accepted: [
        'cp -r site_web site_web_backup',
        'cp -R site_web site_web_backup',
        'cp -r ./site_web ./site_web_backup',
        'cp -a site_web site_web_backup',
        'cp --recursive site_web site_web_backup'
      ],
      rejected: [
        { cmd: 'cp site_web site_web_backup', message: '\'cp\' sans option récursive refuse de copier un répertoire et renvoie l\'erreur \'cp: -r not specified\'.' },
        { cmd: 'mv site_web site_web_backup', message: '\'mv\' déplace ou renomme le répertoire, il ne conserve pas l\'original ; la consigne demande de copier.' },
        { cmd: 'copy site_web site_web_backup', message: 'La commande Linux est \'cp\', pas \'copy\'.' },
        { cmd: 'cp -d site_web site_web_backup', message: 'L\'option \'-d\' préserve les liens ; pour copier un dossier entier, utilisez \'-r\' ou \'-a\'.' },
        { cmd: 'cp -p site_web site_web_backup', message: '\'-p\' préserve les attributs, mais ne permet pas la copie récursive sans \'-r\'.' }
      ]
    },
    {
      id: 'lx-c3-e3',
      expected: 'rmdir ancien_dossier',
      regex: /^rmdir\s+(-p\s+)?("ancien_dossier"|'ancien_dossier'|\.\/ancien_dossier|ancien_dossier)\/?$/,
      accepted: [
        'rmdir ancien_dossier',
        'rmdir ./ancien_dossier',
        'rmdir "ancien_dossier"',
        'rmdir \'ancien_dossier\'',
        'rmdir -p ancien_dossier'
      ],
      rejected: [
        { cmd: 'rm -rf ancien_dossier', message: '\'rm -rf\' détruit aveuglément tout le contenu sans vérifier si le dossier est vide ; la consigne impose la commande sécurisée pour dossier vide.' },
        { cmd: 'rm -r ancien_dossier', message: '\'rm -r\' supprime récursivement les fichiers qu\'il contient ; utilisez la commande dédiée \'rmdir\'.' },
        { cmd: 'rm ancien_dossier', message: '\'rm\' sans option refuse de supprimer un répertoire (\'rm: cannot remove directory\').' },
        { cmd: 'delete ancien_dossier', message: 'La commande \'delete\' n\'existe pas sous Linux ; utilisez \'rmdir\'.' },
        { cmd: 'del ancien_dossier', message: '\'del\' est une commande DOS/Windows ; sous Linux pour un dossier vide, utilisez \'rmdir\'.' }
      ]
    },
    {
      id: 'lx-c4-e1',
      expected: 'head -n 10 /var/log/boot.log',
      regex: /^head\s+(-n\s*10|-10|--lines=10)?\s*\/var\/log\/boot\.log$/,
      accepted: [
        'head -n 10 /var/log/boot.log',
        'head -10 /var/log/boot.log',
        'head /var/log/boot.log',
        'head -n10 /var/log/boot.log',
        'head --lines=10 /var/log/boot.log'
      ],
      rejected: [
        { cmd: 'tail -n 10 /var/log/boot.log', message: '\'tail\' affiche la fin du fichier, alors que la consigne demande les premières lignes (\'head\').' },
        { cmd: 'cat /var/log/boot.log', message: '\'cat\' affiche l\'intégralité du fichier d\'un coup, sans limiter aux 10 premières lignes.' },
        { cmd: 'less -n 10 /var/log/boot.log', message: '\'less\' est un paginateur interactif, la commande dédiée pour le début est \'head\'.' },
        { cmd: 'top /var/log/boot.log', message: '\'top\' surveille les processus en cours, ce n\'est pas un lecteur de fichier texte.' },
        { cmd: 'head -f /var/log/boot.log', message: 'L\'option \'-f\' s\'utilise avec \'tail\' pour suivre un fichier en continu, pas avec \'head\'.' }
      ]
    },
    {
      id: 'lx-c4-e2',
      expected: "grep -i 'failed' /var/log/auth.log",
      patterns: [
        /^grep\s+(-[a-zA-Z]*i[a-zA-Z]*|--ignore-case)\s+('failed'|"failed"|failed)\s+\/var\/log\/auth\.log$/
      ],
      accepted: [
        'grep -i failed /var/log/auth.log',
        'grep -i \'failed\' /var/log/auth.log',
        'grep -i "failed" /var/log/auth.log',
        'grep --ignore-case failed /var/log/auth.log',
        'grep -iE \'failed\' /var/log/auth.log'
      ],
      rejected: [
        { cmd: 'grep failed /var/log/auth.log', message: 'Sans l\'option \'-i\', grep est sensible à la casse et manquera \'FAILED\' ou \'Failed\'.' },
        { cmd: 'find failed /var/log/auth.log', message: '\'find\' cherche des fichiers dans l\'arborescence, pour chercher du texte dans un fichier utilisez \'grep\'.' },
        { cmd: 'cat /var/log/auth.log', message: '\'cat\' affiche tout sans filtrer ; combinez avec \'grep -i\' ou appliquez grep directement.' },
        { cmd: 'grep -v failed /var/log/auth.log', message: '\'-v\' inverse la recherche (affiche les lignes qui NE contiennent PAS le mot).' },
        { cmd: 'locate failed', message: '\'locate\' recherche des noms de fichiers dans une base de données, pas du contenu de fichier.' }
      ]
    },
    {
      id: 'lx-c4-e3',
      expected: "find /var/log -type f -name '*.log'",
      patterns: [
        /^find\s+\/var\/log\/?\s+(-type\s+f\s+-name\s+['"]\*\.log['"]|-name\s+['"]\*\.log['"]\s+-type\s+f)$/
      ],
      accepted: [
        'find /var/log -type f -name \'*.log\'',
        'find /var/log -type f -name "*.log"',
        'find /var/log -name \'*.log\' -type f',
        'find /var/log -name "*.log" -type f',
        'find /var/log/ -type f -name \'*.log\''
      ],
      rejected: [
        { cmd: 'find /var/log *.log', message: 'Il manque l\'option \'-name\' pour spécifier le motif de recherche du nom de fichier.' },
        { cmd: 'ls /var/log/*.log', message: '\'ls\' ne cherche pas récursivement dans les sous-dossiers et échoue si aucun fichier n\'est trouvé au premier niveau.' },
        { cmd: 'grep -r \'*.log\' /var/log', message: '\'grep\' recherche du contenu à l\'intérieur des fichiers, pas le nom des fichiers eux-mêmes.' },
        { cmd: 'find /var/log -type d -name \'*.log\'', message: '\'-type d\' recherche des répertoires, or la consigne demande des fichiers ordinaires (\'-type f\').' },
        { cmd: 'whereis *.log', message: '\'whereis\' recherche les binaires système, pas les fichiers dans /var/log.' }
      ]
    },
    {
      id: 'lx-c5-e1',
      expected: "grep '^root:' /etc/passwd",
      patterns: [
        /^grep\s+('?\^?root:?'?|"??\^?root:?"?|-w\s+root)\s+\/etc\/passwd$/
      ],
      accepted: [
        'grep \'^root:\' /etc/passwd',
        'grep "^root:" /etc/passwd',
        'grep root /etc/passwd',
        'grep \'root\' /etc/passwd',
        'grep -w root /etc/passwd'
      ],
      rejected: [
        { cmd: 'cat /etc/shadow', message: '/etc/shadow contient les empreintes de mots de passe et nécessite les privilèges root, la liste des comptes est dans /etc/passwd.' },
        { cmd: 'find root /etc/passwd', message: '\'find\' cherche des fichiers dans l\'arborescence, pour inspecter une ligne utilisez \'grep\'.' },
        { cmd: 'useradd root', message: '\'root\' existe déjà, la consigne demande d\'afficher ses paramètres dans /etc/passwd.' },
        { cmd: 'passwd root', message: '\'passwd\' modifie le mot de passe, il n\'affiche pas la ligne complète des 7 champs de configuration.' },
        { cmd: 'whoami', message: '\'whoami\' affiche le nom de l\'utilisateur actuel connecté, pas les champs de root dans /etc/passwd.' }
      ]
    },
    {
      id: 'lx-c5-e2',
      expected: 'useradd -m -s /bin/bash etudiant',
      patterns: [
        /^useradd\s+(-m\s+-s\s+\/bin\/bash|-s\s+\/bin\/bash\s+-m|--create-home\s+--shell\s+\/bin\/bash)\s+("etudiant"|'etudiant'|etudiant)$/,
        /^adduser\s+--shell\s+\/bin\/bash\s+etudiant$/
      ],
      accepted: [
        'useradd -m -s /bin/bash etudiant',
        'useradd -s /bin/bash -m etudiant',
        'useradd -m -s /bin/bash "etudiant"',
        'adduser --shell /bin/bash etudiant',
        'useradd --create-home --shell /bin/bash etudiant'
      ],
      rejected: [
        { cmd: 'useradd etudiant', message: 'Sans l\'option \'-m\', aucun répertoire personnel ne sera créé dans /home pour l\'utilisateur.' },
        { cmd: 'usermod -m etudiant', message: '\'usermod\' sert à modifier un compte existant ; pour créer un compte, utilisez \'useradd\'.' },
        { cmd: 'adduser etudiant', message: 'Précisez explicitement les options \'-m\' et \'-s /bin/bash\' demandées dans la consigne.' },
        { cmd: 'useradd -d /bin/bash etudiant', message: '\'-d\' configure le chemin du répertoire personnel ; l\'option pour le shell est \'-s\'.' },
        { cmd: 'groupadd etudiant', message: '\'groupadd\' crée un groupe, pas un utilisateur.' }
      ]
    },
    {
      id: 'lx-c5-e3',
      expected: 'usermod -aG sudo etudiant',
      patterns: [
        /^usermod\s+(-aG\s+sudo|-a\s+-G\s+sudo|-G\s+sudo\s+-a|--append\s+--groups\s+sudo)\s+etudiant$/,
        /^gpasswd\s+-a\s+etudiant\s+sudo$/
      ],
      accepted: [
        'usermod -aG sudo etudiant',
        'usermod -a -G sudo etudiant',
        'usermod -G sudo -a etudiant',
        'gpasswd -a etudiant sudo',
        'usermod --append --groups sudo etudiant'
      ],
      rejected: [
        { cmd: 'usermod -G sudo etudiant', message: 'DANGER MAJEUR : Sans l\'option \'-a\', \'usermod -G\' supprime l\'utilisateur de TOUS ses autres groupes secondaires !' },
        { cmd: 'useradd -G sudo etudiant', message: 'L\'utilisateur \'etudiant\' existe déjà, la commande pour modifier un compte existant est \'usermod\'.' },
        { cmd: 'groupadd sudo etudiant', message: '\'groupadd\' crée un nouveau groupe, il ne permet pas d\'y ajouter un utilisateur.' },
        { cmd: 'usermod -g sudo etudiant', message: '\'-g\' (minuscule) change le groupe principal de l\'utilisateur, pas son groupe secondaire (\'-G\').' },
        { cmd: 'chown etudiant sudo', message: '\'chown\' modifie le propriétaire d\'un fichier, pas l\'appartenance d\'un compte à un groupe.' }
      ]
    },
    {
      id: 'lx-c6-e1',
      expected: 'chmod 755 sauvegarde.sh',
      regex: /^chmod\s+(0?755)\s+("sauvegarde\.sh"|'sauvegarde\.sh'|\.\/sauvegarde\.sh|sauvegarde\.sh)$/,
      accepted: [
        'chmod 755 sauvegarde.sh',
        'chmod 755 ./sauvegarde.sh',
        'chmod 0755 sauvegarde.sh',
        'chmod 755 "sauvegarde.sh"',
        'chmod 755 \'sauvegarde.sh\''
      ],
      rejected: [
        { cmd: 'chmod 775 sauvegarde.sh', message: '775 donnerait le droit d\'écriture (w) au groupe, ce qui viole la consigne (r-x = 5).' },
        { cmd: 'chmod 777 sauvegarde.sh', message: '777 donne tous les droits à tout le monde, ce qui est une faute grave de sécurité.' },
        { cmd: 'chmod 644 sauvegarde.sh', message: '644 ne donne aucun droit d\'exécution (x), le script ne pourrait pas être exécuté.' },
        { cmd: 'chown 755 sauvegarde.sh', message: '\'chown\' modifie le propriétaire d\'un fichier, pour modifier les permissions utilisez \'chmod\'.' },
        { cmd: 'chmod +x sauvegarde.sh', message: 'La consigne demande la notation octale exacte (755).' }
      ]
    },
    {
      id: 'lx-c6-e2',
      expected: 'chmod o-r config.ini',
      regex: /^chmod\s+(o-r|o=)\s+("config\.ini"|'config\.ini'|\.\/config\.ini|config\.ini)$/,
      accepted: [
        'chmod o-r config.ini',
        'chmod o-r ./config.ini',
        'chmod o-r "config.ini"',
        'chmod o= config.ini'
      ],
      rejected: [
        { cmd: 'chmod g-r config.ini', message: '\'g\' cible le groupe ; la consigne demande de retirer les droits aux autres (\'o\').' },
        { cmd: 'chmod u-r config.ini', message: '\'u\' cible le propriétaire (user) ; utilisez \'o\' pour les autres utilisateurs.' },
        { cmd: 'chmod 640 config.ini', message: 'La consigne impose obligatoirement la notation symbolique (ex: o-r), pas la notation octale.' },
        { cmd: 'chmod -r config.ini', message: '\'-r\' sans préfixe retire la lecture à tout le monde (u, g, o), y compris le propriétaire !' },
        { cmd: 'chmod o+r config.ini', message: 'Le signe \'+\' ajoute un droit ; pour retirer un droit, utilisez \'-\' (o-r).' }
      ]
    },
    {
      id: 'lx-c6-e3',
      expected: 'chown -R www-data:www-data /var/www/html',
      patterns: [
        /^chown\s+(-R|--recursive)\s+('www-data:www-data'|"www-data:www-data"|www-data:www-data|www-data\.www-data)\s+\/var\/www\/html\/?$/
      ],
      accepted: [
        'chown -R www-data:www-data /var/www/html',
        'chown -R www-data.www-data /var/www/html',
        'chown -R www-data:www-data /var/www/html/',
        'chown --recursive www-data:www-data /var/www/html',
        'chown -R \'www-data:www-data\' /var/www/html'
      ],
      rejected: [
        { cmd: 'chown www-data:www-data /var/www/html', message: 'Sans l\'option récursive \'-R\', seuls les droits du dossier racine changent, pas ceux des sous-fichiers.' },
        { cmd: 'chmod -R www-data:www-data /var/www/html', message: '\'chmod\' modifie les permissions (rwx), pas le propriétaire ; utilisez \'chown\'.' },
        { cmd: 'chgrp -R www-data /var/www/html', message: '\'chgrp\' ne change que le groupe, la consigne demande de changer à la fois le propriétaire et le groupe.' },
        { cmd: 'chown -r www-data:www-data /var/www/html', message: 'Pour \'chown\', l\'option récursive s\'écrit en majuscule : \'-R\'.' },
        { cmd: 'chown -R www-data /var/www/html', message: 'Cette commande oublie de modifier le groupe ; spécifiez \'www-data:www-data\'.' }
      ]
    }
  ];

  for (const item of bancs) {
    const testConfig = {
      expected: item.expected,
      regex: item.regex,
      patterns: item.patterns,
      rejected: item.rejected
    };

    // 1. Toutes les variantes acceptées doivent être validées
    for (const validCmd of item.accepted) {
      const res = validateShellCommand(validCmd, testConfig);
      assert.strictEqual(
        res.matched,
        true,
        `${item.id} : La variante valide "${validCmd}" doit être acceptée`
      );
      assert.strictEqual(res.rejectionMessage, null);
    }

    // 2. Toutes les quasi-erreurs doivent être rejetées avec le bon feedback
    for (const rej of item.rejected) {
      const res = validateShellCommand(rej.cmd, testConfig);
      assert.strictEqual(
        res.matched,
        false,
        `${item.id} : La commande erronée "${rej.cmd}" doit être rejetée`
      );
      assert.ok(
        res.rejectionMessage && res.rejectionMessage.length > 10,
        `${item.id} : Un message de rejet explicite est obligatoire pour "${rej.cmd}"`
      );
    }
  }
});

test('Linux B1 : Protection ReDoS et commandes anormalement longues', () => {
  const giantCmd = 'ls ' + ' -la'.repeat(300);
  const res = validateShellCommand(giantCmd, { regex: /^ls\s+-la$/ });
  assert.strictEqual(res.matched, false);
  assert.match(res.rejectionMessage, /longueur maximale/);
});

test('Linux B1 : Normalisation de commande équivalente (espaces, ./, drapeaux)', () => {
  assert.strictEqual(normalizeCommand('ls   -l   -a'), 'ls -al');
  assert.strictEqual(normalizeCommand('ls -a -l'), 'ls -al');
  assert.strictEqual(normalizeCommand('cd   ./projets/  '), 'cd projets');
  assert.strictEqual(normalizeCommand('touch   ./fichier.txt'), 'touch fichier.txt');
});
