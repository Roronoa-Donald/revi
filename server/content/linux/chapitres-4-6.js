/**
 * Chapitres 4 à 6 du cours « Administration Linux » B2 : réseau statique et
 * SSH, scripts Bash, puis services, processus et planification.
 *
 * Même contrat que les chapitres 1-3 : la matière seulement, la mise en page est
 * faite par `kit.chapter` et les ateliers injectés par le générateur.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Réseau statique et SSH',
    short: 'Réseau et SSH',
    toc: 'Configuration IP d’un serveur, adresses privées et publiques, connexion distante SSH.',
    time: '≈ 2 h de travail',
    lockLabel: 'Réservé B2 et plus',

    situation:
      'Un serveur qui n’est joignable que par sa console locale n’est pas un serveur. Il lui faut une ' +
      'adresse fixe, une passerelle, un nom résolu, et une porte d’entrée sûre : SSH. Ce chapitre relie ' +
      'l’adressage IP à la connexion distante.',

    objectives: [
      'valider et classer une adresse IPv4 (privée ou publique) ;',
      'lire et décrire une configuration réseau statique ;',
      'décoder une cible SSH utilisateur@hôte:port ;',
      'expliquer le rôle des clés SSH face au mot de passe.'
    ],

    sections: [
      {
        title: 'Adresser un serveur',
        html: [
          '<p>Une configuration IPv4 réunit quatre éléments : l’<strong>adresse</strong>, le <strong>masque</strong> ' +
          '(qui délimite le réseau local), la <strong>passerelle</strong> (la sortie vers Internet) et le ' +
          '<strong>DNS</strong> (qui traduit les noms en adresses).</p>',
          '<pre><code>ip a                       # afficher adresses et interfaces\n' +
          'ip route                   # afficher la passerelle (default via …)\n' +
          '/etc/network/interfaces :  # configuration statique (Debian)\n' +
          '  iface eth0 inet static\n' +
          '  address 192.168.1.10/24\n' +
          '  gateway 192.168.1.1\n' +
          '  dns-nameservers 9.9.9.9</code></pre>',
          box('tech', 'Statique ou DHCP ?', 'compass',
            '    <p>Un poste de travail peut recevoir son adresse automatiquement (DHCP) ; un <strong>serveur</strong> ' +
            'doit garder une adresse fixe, sinon les clients le perdent. On le documente ensuite dans ' +
            '<code>/etc/hosts</code> ou auprès du DNS.</p>')
        ].join('\n')
      },
      {
        title: 'Privée ou publique',
        html: [
          '<p>La RFC 1918 réserve trois plages d’adresses <strong>privées</strong>, non routables sur Internet : ' +
          '<code>10.0.0.0/8</code>, <code>172.16.0.0/12</code> (soit 172.16 à 172.31) et ' +
          '<code>192.168.0.0/16</code>. Toutes les autres sont publiques.</p>',
          '<pre><code>10.0.0.0    – 10.255.255.255      privée (classe A)\n' +
          '172.16.0.0  – 172.31.255.255      privée (classe B)\n' +
          '192.168.0.0 – 192.168.255.255     privée (classe C)\n' +
          '203.0.113.7, 8.8.8.8              publiques</code></pre>',
          box('mnemo', 'Reconnaître au premier octet', 'pin',
            '    <p>10.x et 192.168.x sont immédiatement privées. Le seul piège est 172 : seules les plages ' +
            '<strong>16 à 31</strong> sont privées ; 172.15 et 172.32 sont publiques.</p>')
        ].join('\n')
      },
      {
        title: 'Se connecter en SSH',
        html: [
          '<p>SSH chiffre la session d’administration. Une cible se lit ' +
          '<code>utilisateur@hote:port</code> ; le port par défaut est 22, souvent changé pour limiter les ' +
          'scans automatisés.</p>',
          '<pre><code>ssh rd@192.168.1.10              # port 22 par défaut\n' +
          'ssh sam@serveur:2222             # port personnalisé\n' +
          'ssh-keygen -t ed25519            # générer une paire de clés\n' +
          'ssh-copy-id rd@192.168.1.10      # installer la clé publique\n' +
          'scp fichier rd@serveur:/tmp/     # copier via SSH</code></pre>',
          box('intuition', 'Pourquoi une clé plutôt qu’un mot de passe ?', 'compass',
            '    <p>Une clé SSH résiste aux attaques par force brute, ne circule jamais sur le réseau et permet ' +
            'd’automatiser des tâches. On garde la <strong>clé privée</strong> secrète ; seule la ' +
            '<strong>publique</strong> est déposée sur le serveur.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Combien d’octets dans une adresse IPv4 valide ?', opts: ['2', '4', '6'], correct: 1, exp: 'IPv4 s’écrit en quatre octets séparés par des points, chacun de 0 à 255.' },
      { stem: 'Quelle adresse est privée ?', opts: ['192.168.10.20', '203.0.113.7', '8.8.8.8'], correct: 0, exp: '192.168.0.0/16 est une plage privée réservée aux réseaux internes.' },
      { stem: '172.32.1.1 est-elle privée ?', opts: ['oui', 'non', 'seulement en IPv6'], correct: 1, exp: 'Seules les plages 172.16 à 172.31 sont privées ; 172.32 est publique.' },
      { stem: 'À quoi sert la passerelle ?', opts: ['à traduire les noms', 'à sortir du réseau local', 'à chiffrer'], correct: 1, exp: 'La passerelle (default via) est la sortie vers les réseaux extérieurs.' },
      { stem: 'Port SSH par défaut ?', opts: ['21', '22', '443'], correct: 1, exp: 'SSH écoute sur le port 22 par défaut ; 21 est FTP et 443 HTTPS.' },
      { stem: 'Que lit ssh sam@serveur:2222 ?', opts: ['utilisateur sam, serveur serveur, port 2222', 'serveur sam sur le port 2222', 'un fichier'], correct: 0, exp: 'Le format est utilisateur@hote:port.' },
      { stem: 'Que fait ssh-copy-id ?', opts: ['copie un fichier', 'installe la clé publique sur le serveur', 'génère une clé'], correct: 1, exp: 'Il dépose la clé publique dans le fichier authorized_keys du serveur.' },
      { stem: 'Pourquoi un serveur en IP fixe ?', opts: ['pour économiser', 'pour rester joignable à la même adresse', 'c’est obligatoire'], correct: 1, exp: 'Les clients doivent retrouver le serveur à une adresse stable.' }
    ],

    pitfalls: [
      'Oublier qu’une adresse compte exactement quatre octets de 0 à 255.',
      'Croire que toute adresse commençant par 172 est privée.',
      'Confondre passerelle (sortie du réseau) et DNS (traduction des noms).',
      'Laisser le port SSH par défaut et subir des tentatives automatisées.',
      'Déposer sa clé privée sur un serveur au lieu de la clé publique.'
    ],

    methodTitle: 'Rendre un serveur joignable',
    method: [
      '<strong>Valider</strong> l’adresse : quatre octets, chacun entre 0 et 255.',
      '<strong>Classer</strong> : privée ou publique, selon le premier octet.',
      '<strong>Configurer</strong> : adresse, masque, passerelle, DNS.',
      '<strong>Tester</strong> : <code>ip a</code>, <code>ip route</code>, <code>ping</code>.',
      '<strong>Sécuriser l’accès</strong> : clé SSH, port dédié si besoin.'
    ],

    summary: [
      'IPv4 = quatre octets de 0 à 255 ; une adresse doit être validée avant d’être posée.',
      'Plages privées : 10.0.0.0/8, 172.16–172.31, 192.168.0.0/16 ; le reste est public.',
      'La configuration statique réunit adresse, masque, passerelle et DNS.',
      'SSH se lit utilisateur@hote:port ; le port par défaut est 22.',
      'La clé privée reste secrète, la clé publique est déposée sur le serveur.'
    ],

    checklist: [
      'Je valide une adresse IPv4 octet par octet.',
      'Je classe une adresse en privée ou publique, même dans la plage 172.',
      'Je décode une cible SSH utilisateur@hote:port.',
      'J’explique la différence entre clé publique et clé privée.'
    ],

    notions: ['adresse IPv4', 'masque', 'passerelle', 'DNS', 'plage privée', 'adresse publique', 'SSH', 'port 22', 'clé publique', 'clé privée'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Revois la validation octet par octet d’une adresse.' },
      { cls: 'mid', text: '50–69 % — Mémorisez les trois plages privées et le piège du 172.' },
      { cls: 'good', text: '70–94 % — Solide : décode cinq cibles SSH d’affilée.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 5, scripts Bash.' }
    ],

    flashcards: [
      { q: 'Les trois plages privées IPv4 ?', a: '10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.' },
      { q: 'Rôle de la passerelle ?', a: 'La sortie du réseau local vers les réseaux extérieurs (default via).' },
      { q: 'Format d’une cible SSH ?', a: 'utilisateur@hote:port — port 22 par défaut.' },
      { q: 'Différence clé publique / privée ?', a: 'La publique se dépose sur le serveur, la privée reste secrète.' },
      { q: 'Commande pour voir la passerelle ?', a: 'ip route, ligne « default via … ».' },
      { q: 'Pourquoi changer le port SSH ?', a: 'Pour limiter les tentatives automatisées de connexion.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Scripts Bash : lire, décider, rapporter',
    short: 'Scripts Bash',
    toc: 'Variables, paramètres, read, tests, boucles, case, fonctions et code de retour.',
    time: '≈ 2 h 30 de travail',
    lockLabel: 'Réservé B2 et plus',

    situation:
      'Répéter à la main une suite de commandes est une source d’erreur. L’administrateur automatise : un ' +
      'script lit les données, décide selon la règle métier et produit un rapport. C’est le squelette ' +
      'lire → décider → rapporter que l’on retrouve dans tous les exercices.',

    objectives: [
      'déclarer et utiliser des variables, y compris les paramètres positionnels ;',
      'lire l’entrée standard avec read dans une boucle ;',
      'décider avec if, test et case ;',
      'écrire une fonction et interpréter son code de retour.'
    ],

    sections: [
      {
        title: 'Variables et paramètres',
        html: [
          '<p>Une variable s’assigne sans espace autour du <code>=</code> et s’utilise avec un <code>$</code>. ' +
          'Les paramètres positionnels arrivent automatiquement : <code>$0</code> est le nom du script, ' +
          '<code>$1</code>, <code>$2</code>… les arguments, <code>$#</code> leur nombre, <code>$@</code> la ' +
          'liste complète.</p>',
          '<pre><code>#!/bin/bash\n' +
          'compteur=0            # PAS de$compteur=0 (espace interdit)\n' +
          'echo "arguments : $#"\n' +
          'for argument in "$@"; do echo "$argument"; done\n' +
          'total=$((a + b))       # arithmétique entière</code></pre>',
          box('tech', 'Le shebang', 'terminal',
            '    <p>La première ligne <code>#!/bin/bash</code> désigne l’interpréteur. Sans elle, le script ' +
            'est exécuté par le shell courant, dont les extensions (boucles C, tableaux) peuvent manquer.</p>')
        ].join('\n')
      },
      {
        title: 'Lire l’entrée : read',
        html: [
          '<p><code>read</code> lit une ligne de l’entrée standard et la range dans une ou plusieurs variables. ' +
          'Le grand classique est le compteur <code>n</code> lu en premier, puis une boucle qui lit les lignes.</p>',
          '<pre><code>read -r n                 # premier : le nombre de lignes\n' +
          'for ((i=0; i&lt;n; i++)); do\n' +
          '  read -r nom type         # une lecture par ligne\n' +
          '  # … traiter\n' +
          'done</code></pre>',
          box('pitfall', 'Piège — la dernière ligne sans retour à la ligne', 'warning',
            '    <p>Si l’entrée ne se termine pas par un retour à la ligne, le dernier <code>read</code> ' +
            'touche la fin de fichier et échoue : la dernière donnée est perdue. Toujours terminer l’entrée ' +
            'par une ligne vide finale.</p>')
        ].join('\n')
      },
      {
        title: 'Décider : if et case',
        html: [
          '<p><code>if</code> compare avec <code>test</code> ; <code>case</code> aiguille selon un motif — ' +
          'idéal pour classer des chaînes (un type, une extension, une classe de droits).</p>',
          '<pre><code>if [ "$taille" -ge 1024 ]; then echo "gros"; else echo "petit"; fi\n' +
          'case "$fichier" in\n' +
          '  *.sh) echo "script" ;;\n' +
          '  *.log) echo "journal" ;;\n' +
          '  *) echo "autre" ;;\n' +
          'esac</code></pre>',
          box('mnemo', 'Comparer proprement', 'pin',
            '    <p>Nombres : <code>-eq -ne -lt -le -gt -ge</code>. Chaînes : <code>=</code> et ' +
            '<code>!=</code>. Toujours entre guillemets : <code>[ "$v" = "OK" ]</code>, sinon une variable ' +
            'vide casse le test.</p>')
        ].join('\n')
      },
      {
        title: 'Fonctions et code de retour',
        html: [
          '<p>Une fonction regroupe du code réutilisable et renvoie un <strong>code de retour</strong> : 0 ' +
          'signifie succès, toute valeur non nulle un échec. C’est ce code qu’utilisent <code>if</code> et ' +
          'les enchaînements <code>&amp;&amp;</code> / <code>||</code>.</p>',
          '<pre><code>est_gros() {\n' +
          '  [ "$1" -ge 1024 ]\n' +
          '}\n' +
          'if est_gros 2048; then echo "gros"; fi\n' +
          'commande &amp;&amp; echo "reussi" || echo "echoue"</code></pre>',
          box('tech', 'Le squelette du cours', 'compass',
            '    <p>Tout exercice suit le même plan : lire les données, décider selon la règle, puis ' +
            '<strong>rapporter</strong> une seule fois après la boucle. Séparer le traitement du bilan évite ' +
            'le bug classique du compteur affiché à chaque passage.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que vaut $# dans un script ?', opts: ['le nom du script', 'le nombre d’arguments', 'le premier argument'], correct: 1, exp: '$# contient le nombre de paramètres positionnels ; $0 est le nom du script.' },
      { stem: 'Quel paramètre est le premier argument ?', opts: ['$0', '$1', '$#'], correct: 1, exp: '$1 est le premier argument ; $0 est le nom du script.' },
      { stem: 'Une boucle for ((i=0; i<n; i++)) est de…', opts: ['style C', 'style shell simple', 'non valide'], correct: 0, exp: 'bash supporte la syntaxe arithmétique dite « style C ».' },
      { stem: 'Comparaison numérique pour « supérieur ou égal » ?', opts: ['-gt', '-ge', '-eq'], correct: 1, exp: '-ge = greater or equal ; -gt = strictement supérieur.' },
      { stem: 'Que signifie un code de retour 0 ?', opts: ['échec', 'succès', 'avertissement'], correct: 1, exp: 'En shell, 0 = succès, toute autre valeur = échec.' },
      { stem: 'Que fait read -r n ?', opts: ['lit une ligne dans n', 'écrit n', 'supprime n'], correct: 0, exp: '-r empêche l’interprétation des barres obliques inverses ; la ligne est rangée dans n.' },
      { stem: 'Le bilan d’un compteur s’affiche…', opts: ['dans la boucle', 'après la boucle', 'avant la lecture'], correct: 1, exp: 'Affiché après la boucle, il sort une seule fois, avec le total final.' },
      { stem: 'Que vaut $@ ?', opts: ['la liste des arguments', 'l’adresse IP', 'le nom du shell'], correct: 0, exp: '$@ déroule tous les paramètres positionnels.' }
    ],

    pitfalls: [
      'Mettre des espaces autour du <code>=</code> lors d’une affectation.',
      'Oublier les guillemets dans un test : <code>[ $v = OK ]</code> casse si v est vide.',
      'Afficher le bilan dans la boucle au lieu d’après.',
      'Terminer l’entrée sans retour à la ligne et perdre la dernière donnée.',
      'Confondre <code>&gt;</code> (strict) et <code>&gt;=</code> (-ge) dans une comparaison.'
    ],

    methodTitle: 'Écrire un script robuste',
    method: [
      '<strong>Lire</strong> d’abord le compteur, puis chaque ligne dans la boucle.',
      '<strong>Initialiser</strong> les compteurs et le maximum avant la boucle.',
      '<strong>Décider</strong> avec <code>if</code> ou <code>case</code> selon la nature de la donnée.',
      '<strong>Rapporter</strong> une seule fois, après la boucle.',
      '<strong>Tester</strong> sur trois jeux : cas courant, cas limite, cas vide (n = 0).'
    ],

    summary: [
      'Variables sans espaces autour du = ; $1… les arguments, $# leur nombre, $@ la liste.',
      'read lit une ligne ; le compteur n se lit avant la boucle.',
      'if/test compare, case aiguille selon un motif (*.sh, type…).',
      'Une fonction renvoie un code : 0 succès, non nul échec.',
      'Le squelette lire → décider → rapporter structure tous les scripts du cours.'
    ],

    checklist: [
      'J’écris une boucle qui lit n puis n lignes.',
      'J’utilise les bons opérateurs de comparaison.',
      'J’écris un case pour classer des chaînes.',
      'J’affiche le bilan après la boucle, une seule fois.'
    ],

    notions: ['shebang', 'variable', '$1', '$#', '$@', 'read', 'if', 'test', 'case', 'for', 'fonction', 'code de retour'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Réécris la boucle de lecture de n lignes, dix fois.' },
      { cls: 'mid', text: '50–69 % — Entraîne les opérateurs -ge -lt et les tests entre guillemets.' },
      { cls: 'good', text: '70–94 % — Solide : écris un case qui classe par extension.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 6, services et planification.' }
    ],

    flashcards: [
      { q: 'Que vaut $# ?', a: 'Le nombre d’arguments passés au script.' },
      { q: 'Comment s’écrit une affectation ?', a: 'sans espace autour du = : compteur=0.' },
      { q: 'Opérateurs numériques de test ?', a: '-eq -ne -lt -le -gt -ge.' },
      { q: 'À quoi sert case ?', a: 'À aiguiller selon un motif : *.sh, *.log, type de fichier…' },
      { q: 'Que signifie un code de retour non nul ?', a: 'Un échec : la commande ou la fonction a échoué.' },
      { q: 'Où afficher le bilan d’un compteur ?', a: 'Après la boucle, une seule fois.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Services, processus et planification',
    short: 'Services et processus',
    toc: 'systemctl, lecture des états, processus et zombies, kill, cron et journaux.',
    time: '≈ 2 h 30 de travail',
    lockLabel: 'Réservé B2 et plus',

    situation:
      'Un serveur passe sa vie à exécuter des services. L’administrateur doit savoir lequel tourne, lequel ' +
      'est tombé, quel processus consomme tout, et programmer les tâches récurrentes — sans oublier de ' +
      'surveiller ce qui se passe dans les journaux.',

    objectives: [
      'lire et changer l’état d’un service systemd ;',
      'interpréter les états d’un processus et repérer un zombie ;',
      'programmer une tâche récurrente avec cron ;',
      'consulter les journaux pour diagnostiquer.'
    ],

    sections: [
      {
        title: 'systemctl : piloter un service',
        html: [
          '<p>Sous Debian moderne, les services sont gérés par <strong>systemd</strong> via <code>systemctl</code>. ' +
          'Un service est <code>active</code>, <code>inactive</code> ou <code>failed</code>. Selon l’état, ' +
          'l’action diffère : démarrer, redémarrer ou ne rien faire.</p>',
          '<pre><code>systemctl status nginx        # état détaillé\n' +
          'systemctl start nginx         # démarrer (inactive)\n' +
          'systemctl restart nginx       # redémarrer (failed)\n' +
          'systemctl enable nginx        # activer au démarrage</code></pre>',
          box('mnemo', 'État vers action', 'pin',
            '    <p>active → rien à faire ; inactive → <code>start</code> ; failed → <code>restart</code>. ' +
            'Le choix de l’action selon l’état est exactement ce que code l’exercice 1 de ce chapitre.</p>')
        ].join('\n')
      },
      {
        title: 'Processus et zombies',
        html: [
          '<p><code>ps</code> et <code>top</code> listent les processus. Un processus <code>running</code> ' +
          's’exécute, <code>sleeping</code> attend, <code>zombie</code> est terminé mais non récupéré par son ' +
          'parent : il ne consomme plus de ressources mais occupe une entrée de la table des processus.</p>',
          '<pre><code>ps aux            # tous les processus\n' +
          'top               # tri par consommation, en direct\n' +
          'kill PID          # demander l’arrêt d’un processus\n' +
          'kill -9 PID       # forcer (dernier recours)</code></pre>',
          box('pitfall', 'Piège — kill -9 en premier recours', 'warning',
            '    <p><code>kill</code> envoie un signal d’arrêt propre ; <code>kill -9</code> ne laisse aucune ' +
            'chance au processus de fermer ses fichiers. On le réserve au processus réellement bloqué.</p>')
        ].join('\n')
      },
      {
        title: 'Planifier avec cron',
        html: [
          '<p><code>cron</code> exécute des commandes à heure fixe. Une entrée <code>crontab</code> a cinq ' +
          'champs — minute, heure, jour du mois, mois, jour de la semaine — suivis de la commande.</p>',
          '<pre><code>crontab -e                     # éditer ses tâches\n' +
          '# minute heure jour mois jour-semaine  commande\n' +
          '  0      6     *    *    *             /root/backup.sh\n' +
          ' 30     23     *    *    *             /root/nettoyage.sh</code></pre>',
          box('tech', 'Classer une tâche', 'compass',
            '    <p>On distingue les tâches du <strong>matin</strong> (heure &lt; 12) de celles de ' +
            'l’<strong>après-midi</strong>. Cette règle simple structure l’exercice 3 : lire heure, minute et ' +
            'nom de tâche, classer, puis compter.</p>')
        ].join('\n')
      },
      {
        title: 'Lire les journaux',
        html: [
          '<p>Tout service écrit dans le journal de systemd, consultable avec <code>journalctl</code>. ' +
          'On filtre par service, par priorité ou par heure.</p>',
          '<pre><code>journalctl -u nginx        # journal d’un service\n' +
          'journalctl -p err -b       # erreurs depuis le dernier démarrage\n' +
          'tail -f /var/log/syslog    # suivre un fichier en direct</code></pre>',
          box('intuition', 'Diagnostiquer dans l’ordre', 'compass',
            '    <p>Un service ne répond plus ? 1) <code>systemctl status</code> ; 2) <code>journalctl -u</code> ; ' +
            '3) <code>ps</code> pour vérifier le processus ; 4) décider de l’action. Le réflexe d’ordre évite ' +
            'de redémarrer à l’aveugle.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que fait systemctl restart nginx ?', opts: ['arrête le service', 'redémarre le service', 'désactive le service'], correct: 1, exp: 'restart relance le service, utile quand son état est failed.' },
      { stem: 'État d’un service arrêté mais installé ?', opts: ['active', 'inactive', 'failed'], correct: 1, exp: 'inactive signifie arrêté ; failed signifie en échec après une tentative.' },
      { stem: 'Un processus zombie…', opts: ['consomme le processeur', 'est terminé mais non récupéré', 'est un virus'], correct: 1, exp: 'Il est fini mais son parent n’a pas récupéré son code de retour.' },
      { stem: 'Que fait kill -9 ?', opts: ['arrête proprement', 'force l’arrêt immédiat', 'redémarre'], correct: 1, exp: '-9 envoie SIGKILL : arrêt forcé, sans nettoyage, en dernier recours.' },
      { stem: 'Combien de champs dans une entrée crontab ?', opts: ['3', '5', '7'], correct: 1, exp: 'Cinq champs de temps, puis la commande.' },
      { stem: '0 6 * * * s’exécute…', opts: ['tous les jours à 6 h', 'à 6 h le 1er', 'chaque minute'], correct: 0, exp: 'minute 0, heure 6, tous les jours : chaque matin à 6 h.' },
      { stem: 'Quelle commande lit le journal d’un service ?', opts: ['journalctl -u nginx', 'ls -l', 'crontab -e'], correct: 0, exp: 'journalctl -u filtre le journal par unité de service.' },
      { stem: 'Quelle action pour un service failed ?', opts: ['rien', 'start', 'restart'], correct: 2, exp: 'Un service en échec se redémarre (restart) ; inactive se démarre (start).' }
    ],

    pitfalls: [
      'Redémarrer un service « à l’aveugle » sans avoir lu son <code>status</code> ni son journal.',
      'Utiliser <code>kill -9</code> en premier recours au lieu de <code>kill</code>.',
      'Confondre <code>start</code> (inactive) et <code>restart</code> (failed).',
      'Écrire une entrée crontab avec le mauvais nombre de champs.',
      'Oublier d’activer le service au démarrage (<code>enable</code>).'
    ],

    methodTitle: 'Diagnostiquer puis agir',
    method: [
      '<strong>Constater</strong> l’état avec <code>systemctl status</code>.',
      '<strong>Lire</strong> le journal du service avant toute action.',
      '<strong>Choisir</strong> l’action : rien, start ou restart, selon l’état.',
      '<strong>Vérifier</strong> les processus avec <code>ps</code> et repérer les zombies.',
      '<strong>Automatiser</strong> le contrôle récurrent avec une tâche cron.'
    ],

    summary: [
      'systemd gère les services : active, inactive, failed → rien, start, restart.',
      'ps et top listent les processus ; un zombie est terminé mais non récupéré.',
      'kill demande un arrêt propre ; kill -9 force, en dernier recours.',
      'cron planifie : cinq champs de temps puis la commande.',
      'journalctl -u lit le journal d’un service, journalctl -p err les erreurs.'
    ],

    checklist: [
      'Je lis l’état d’un service et en déduis l’action.',
      'Je repère un processus zombie dans une liste.',
      'J’écris une entrée crontab correcte.',
      'Je consulte le journal d’un service avant d’agir.'
    ],

    notions: ['systemd', 'systemctl', 'service', 'active/inactive/failed', 'ps', 'top', 'zombie', 'kill', 'cron', 'crontab', 'journalctl'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Revois les trois états d’un service et l’action associée.' },
      { cls: 'mid', text: '50–69 % — Entraînez-vous à lire ps aux et à repérer les zombies.' },
      { cls: 'good', text: '70–94 % — Solide : écris trois entrées crontab correctes.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : le cours est acquis, place au projet intégrateur.' }
    ],

    flashcards: [
      { q: 'Trois états d’un service ?', a: 'active (rien), inactive (start), failed (restart).' },
      { q: 'Qu’est-ce qu’un zombie ?', a: 'Un processus terminé dont le parent n’a pas récupéré le code de retour.' },
      { q: 'Différence kill et kill -9 ?', a: 'kill demande un arrêt propre ; kill -9 force immédiatement.' },
      { q: 'Structure d’une crontab ?', a: 'minute heure jour mois jour-semaine, puis la commande.' },
      { q: 'Comment lire le journal d’un service ?', a: 'journalctl -u nom-du-service.' },
      { q: 'Que fait systemctl enable ?', a: 'Il active le service au démarrage de la machine.' }
    ]
  }
];
