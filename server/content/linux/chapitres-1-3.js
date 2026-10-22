/**
 * Chapitres 1 à 3 du cours « Administration Linux » B2, construits à partir du
 * cours historique d'administration Linux Debian : terminal et arborescence,
 * manipulation de fichiers et recherche, droits et comptes.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu, et les trois exercices de
 * code sont injectés avant le QCM par `scripts/generate-code-labs.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Commandes de base et arborescence',
    short: 'Terminal et arborescence',
    toc: 'La ligne de commande, l’arborescence FHS, chemins absolus et relatifs, création et navigation.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Un serveur n’a ni souris ni fenêtres : tout passe par un terminal et une ligne de commande. Avant ' +
      'd’administrer quoi que ce soit, il faut savoir se déplacer dans l’arborescence, reconnaître un chemin ' +
      'absolu d’un chemin relatif et créer les fichiers et dossiers dont on a besoin.',

    objectives: [
      'distinguer une commande, ses options et ses arguments ;',
      'parcourir l’arborescence FHS et nommer le rôle de chaque répertoire ;',
      'reconnaître un chemin absolu et un chemin relatif ;',
      'créer, copier, déplacer et supprimer fichiers et dossiers sans erreur.'
    ],

    sections: [
      {
        title: 'La ligne de commande',
        html: [
          '<p>Une commande se lit toujours <strong>COMMANDE OPTIONS ARGUMENTS</strong>. Les options commencent ' +
          'par un tiret (<code>ls -l</code>) et les arguments désignent sur quoi elle agit (<code>ls -l /home</code>). ' +
          'Le shell (<code>bash</code>) lit la ligne, la découpe puis demande au noyau d’exécuter le programme.</p>',
          '<p>Trois commandes suffisent à s’orienter : <code>pwd</code> affiche le répertoire courant, ' +
          '<code>ls</code> liste son contenu, <code>cd</code> change de répertoire. <code>cd</code> sans argument ' +
          'ramène dans la maison de l’utilisateur ; <code>cd ..</code> remonte d’un niveau ; <code>cd /</code> ' +
          'va à la racine.</p>',
          '<pre><code>pwd                 # où suis-je ?\n' +
          'ls -a               # tout, y compris les fichiers cachés (commençant par un point)\n' +
          'ls -l               # format long : droits, propriétaire, taille, date\n' +
          'cd /var/log         # chemin absolu\n' +
          'cd ../etc           # chemin relatif</code></pre>',
          box('tech', 'Le prompt vous parle', 'terminal',
            '    <p>Le prompt <code>utilisateur@machine:dossier$</code> résume la situation : qui vous êtes, sur ' +
            'quelle machine, dans quel dossier. Le <code>$</code> final signifie utilisateur normal ; un ' +
            '<code>#</code> signifie que vous êtes <strong>root</strong> — chaque commande est alors irréversible ' +
            'et dangereuse.</p>')
        ].join('\n')
      },
      {
        title: 'L’arborescence FHS',
        html: [
          '<p>Sur Linux, <strong>tout part de la racine <code>/</code></strong> : il n’y a ni lettre de lecteur ' +
          'ni séparateur en forme de barre oblique inversée. La norme FHS (Filesystem Hierarchy Standard) fixe ' +
          'le rôle de chaque répertoire :</p>',
          '<pre><code>/        racine, origine de tout chemin absolu\n' +
          '/etc     configuration du système (à sauvegarder en priorité)\n' +
          '/var     données variables : journaux, spools, bases\n' +
          '/home    répertoires personnels des utilisateurs\n' +
          '/root    maison du super-utilisateur (différent de /)\n' +
          '/tmp     temporaires, effacés à chaque redémarrage\n' +
          '/usr     programmes et bibliothèques partagés\n' +
          '/bin /sbin  binaires essentiels (sbin : réservés à root)\n' +
          '/dev     fichiers de périphériques ; /proc : arborescence virtuelle du noyau</code></pre>',
          box('mnemo', 'Rien ne se perd, tout est fichier', 'pin',
            '    <p>Sous Linux, « tout est fichier » : un disque, un terminal, une socket réseau apparaissent ' +
            'comme des fichiers dans <code>/dev</code>. Retenir trois pièges : <code>/</code> n’est pas ' +
            '<code>/root</code>, les configurations vont dans <code>/etc</code> et non dans le répertoire du ' +
            'programme, et les journaux vont dans <code>/var</code>.</p>')
        ].join('\n')
      },
      {
        title: 'Chemins absolus et relatifs',
        html: [
          '<p>Un chemin <strong>absolu</strong> commence par <code>/</code> et décrit la position depuis la ' +
          'racine : <code>/etc/hosts</code>. Un chemin <strong>relatif</strong> part du répertoire courant : ' +
          '<code>hosts</code>, <code>./hosts</code>, <code>../etc/hosts</code>. Les symboles spéciaux sont ' +
          '<code>.</code> (répertoire courant) et <code>..</code> (répertoire parent).</p>',
          '<p>Un chemin se construit en joignant un répertoire et un nom. Le piège classique est le double ' +
          'séparateur : <code>/var/</code> plus <code>log</code> donne <code>/var/log</code>, pas ' +
          '<code>/var//log</code>. C’est exactement la logique que code l’exercice 3 de ce chapitre.</p>',
          box('pitfall', 'Piège — le chemin relatif dépend d’où l’on est', 'warning',
            '    <p>La même commande <code>cat notes.txt</code> réussit ou échoue selon le répertoire ' +
            'courant. Dans un script lancé par une tâche planifiée, le répertoire courant n’est pas celui de ' +
            'l’utilisateur : <strong>préférez toujours les chemins absolus</strong> dans les scripts.</p>')
        ].join('\n')
      },
      {
        title: 'Créer, copier, déplacer, supprimer',
        html: [
          '<pre><code>touch rapport.txt          # créer un fichier vide\n' +
          'mkdir -p /srv/site/html   # créer un dossier et ses parents\n' +
          'cp source cible           # copier (-r pour un dossier)\n' +
          'mv source cible           # déplacer ou renommer\n' +
          'rm fichier                # supprimer (-r pour un dossier)\n' +
          'echo "texte" &gt; f          # écrire (écrase)\n' +
          'echo "texte" &gt;&gt; f         # ajouter (conserve)</code></pre>',
          '<p><code>cp</code> duplique, <code>mv</code> déplace <strong>ou renomme</strong> : renommer n’est ' +
          'qu’un déplacement dans le même dossier. <code>rm</code> est définitif — il n’y a pas de corbeille ' +
          'pour root — et <code>rm -rf</code> est la commande la plus dangereuse du système.</p>',
          box('pitfall', 'Piège — un seul chevron écrase', 'warning',
            '    <p><code>&gt;</code> écrase le contenu existant, <code>&gt;&gt;</code> l’ajoute à la fin. ' +
            'Confondre les deux sur un fichier de configuration revient à détruire la configuration du ' +
            'service.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quelle commande affiche le répertoire courant ?', opts: ['cd', 'pwd', 'ls'], correct: 1, exp: 'pwd (print working directory) affiche le chemin absolu du répertoire courant.' },
      { stem: 'Un chemin qui commence par / est…', opts: ['relatif', 'absolu', 'un lien'], correct: 1, exp: 'Tout chemin partant de la racine est absolu ; sinon il est relatif au répertoire courant.' },
      { stem: 'Où se trouvent les fichiers de configuration ?', opts: ['/var', '/etc', '/usr'], correct: 1, exp: '/etc contient la configuration du système : le sauvegarder, c’est sauvegarder la machine.' },
      { stem: 'Que devient /tmp au redémarrage ?', opts: ['Il est effacé', 'Il est archivé', 'Il est conservé'], correct: 0, exp: '/tmp ne survit pas au reboot : il ne contient que des fichiers temporaires.' },
      { stem: 'Différence entre / et /root ?', opts: ['Aucune', '/ est la racine, /root la maison de root', '/root est un alias de /'], correct: 1, exp: '/ est l’origine de l’arborescence ; /root est le répertoire personnel du super-utilisateur.' },
      { stem: 'Que fait echo \"x\" >> f ?', opts: ['Écrase f', 'Ajoutez x à la fin de f', 'Supprimez f'], correct: 1, exp: 'Deux chevrons ajoutent à la fin ; un seul chevron écrase tout le fichier.' },
      { stem: 'mkdir -p a/b/c sert à…', opts: ['créer les parents manquants', 'copier un dossier', 'protéger un dossier'], correct: 0, exp: 'L’option -p crée toute la chaîne de répertoires intermédiaires.' },
      { stem: 'Quelle commande renomme un fichier ?', opts: ['cp', 'mv', 'rm'], correct: 1, exp: 'mv déplace et, dans le même dossier, renomme : mv ancien nouveau.' }
    ],

    pitfalls: [
      'Confondre <code>/</code> (racine) et <code>/root</code> (maison du super-utilisateur).',
      'Écrire des journaux ou des données variables dans <code>/etc</code> au lieu de <code>/var</code>.',
      'Utiliser <code>&gt;</code> au lieu de <code>&gt;&gt;</code> et écraser un fichier de configuration.',
      'Oublier que <code>rm</code> est définitif pour root — aucune corbeille.',
      'Lancer un script avec des chemins relatifs dont le répertoire courant n’est pas celui attendu.'
    ],

    methodTitle: 'Explorer un système inconnu',
    method: [
      '<strong>Se repérer</strong> : <code>pwd</code> puis <code>ls -a</code> avant toute action.',
      '<strong>Nommer les répertoires</strong> : parcourir /etc, /var, /home et énoncer le rôle de chacun.',
      '<strong>Qualifier les chemins</strong> : absolu ou relatif, avant d’écrire une commande.',
      '<strong>Créer proprement</strong> : <code>mkdir -p</code>, <code>touch</code>, puis vérifier avec <code>ls -l</code>.',
      '<strong>Relire les redirections</strong> : un chevron ou deux ? écrase ou ajoute ?'
    ],

    summary: [
      'Une commande se lit COMMANDE OPTIONS ARGUMENTS ; bash interprète la ligne et dialogue avec le noyau.',
      'Tout part de <code>/</code> ; la norme FHS fixe le rôle de /etc, /var, /home, /tmp, /usr, /dev.',
      'Absolu = commence par / ; relatif = part du répertoire courant (. et ..).',
      'mv déplace ou renomme, cp duplique, rm supprime définitivement.',
      '&gt; écrase, &gt;&gt; ajoute : un chevron de trop détruit un fichier.'
    ],

    checklist: [
      'Je me repère avec pwd, ls et cd sans hésiter.',
      'Je nomme le rôle de /etc, /var, /home, /tmp, /root.',
      'Je reconnais un chemin absolu et un chemin relatif.',
      'Je crée, copie, déplace et supprime sans confondre > et >>.'
    ],

    notions: ['terminal', 'prompt', 'pwd', 'ls', 'cd', 'racine', 'FHS', '/etc', '/var', 'chemin absolu', 'chemin relatif', 'redirection'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refaites le tour des répertoires FHS avec pwd, ls et cd.' },
      { cls: 'mid', text: '50–69 % — Réécris de mémoire les commandes touch, mkdir, cp, mv, rm.' },
      { cls: 'good', text: '70–94 % — Solide : distingue sans faute chemins absolus et relatifs.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 2, manipulation de fichiers et recherche.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « terminal » ?', a: 'Un serveur n’a ni souris ni fenêtres : tout passe par un terminal et une ligne de commande. Avant d’administrer quoi que ce soit, il faut savoir se déplacer dans l’arborescence, reconnaître un chemin absolu d’un chemin relatif et créer les fichiers et dossiers dont on a besoin.' },
      { q: 'Qu’est-ce que « prompt » ?', a: 'Le prompt utilisateur@machine:dossier$ résume la situation : qui vous êtes, sur quelle machine, dans quel dossier. Le $ final signifie utilisateur normal ; un # signifie que vous êtes root — chaque commande est alors irréversible et dangereuse.' },
      { q: 'Qu’est-ce que « pwd » ?', a: 'Trois commandes suffisent à s’orienter : pwd affiche le répertoire courant, ls liste son contenu, cd change de répertoire. cd sans argument ramène dans la maison de l’utilisateur ; cd .. remonte d’un niveau ; cd / va à la racine.' },
      { q: 'Qu’est-ce que « FHS » ?', a: 'parcourir l’arborescence FHS et nommer le rôle de chaque répertoire ;' },
      { q: 'Qu’est-ce que « permissions » ?', a: 'permissions : Administration Linux B2 › Sommaire › Chapitre 3' },
      { q: 'Qu’est-ce que « trios u/g/o » ?', a: 'trios u/g/o : ls -l affiche une chaîne de dix caractères. Le premier est le type ( - fichier, d dossier, l lien) ; les neuf suivants sont trois trios : u (propriétaire), g (groupe), o (autres). Dans chaque trio, r lit, w écrit, x exécute.' },
      { q: 'Qu’est-ce que « notation octale » ?', a: 'Objectif : Convertir une permission symbolique en notation octale.' },
      { q: 'Qu’est-ce que « chgrp » ?', a: 'chown change le propriétaire , chgrp le groupe . chown sait faire les deux d’un coup avec utilisateur:groupe , et l’option -R rend le changement récursif.' },
      { q: 'Qu’est-ce que « adresse IPv4 » ?', a: 'valider et classer une adresse IPv4 (privée ou publique) ;' },
      { q: 'Qu’est-ce que « masque » ?', a: 'Une configuration IPv4 réunit quatre éléments : l’ adresse , le masque (qui délimite le réseau local), la passerelle (la sortie vers Internet) et le DNS (qui traduit les noms en adresses).' },
      { q: 'Qu’est-ce que « shebang » ?', a: 'shebang : Administration Linux B2 › Sommaire › Chapitre 5' },
      { q: 'Qu’est-ce que « $@ » ?', a: '$@ : Administration Linux B2 › Sommaire › Chapitre 5' },
      { q: 'Qu’est-ce que « read » ?', a: 'lire l’entrée standard avec read dans une boucle ;' },
      { q: 'Qu’est-ce que « systemd » ?', a: 'lire et changer l’état d’un service systemd ;' },
      { q: 'Qu’est-ce que « top » ?', a: 'ps et top listent les processus. Un processus running s’exécute, sleeping attend, zombie est terminé mais non récupéré par son parent : il ne consomme plus de ressources mais occupe une entrée de la table des processus.' },
      { q: 'Syntaxe générale d’une commande ?', a: 'COMMANDE OPTIONS ARGUMENTS, par exemple ls -l /home.' },
      { q: 'Rôle de /etc ?', a: 'La configuration du système ; c’est le répertoire à sauvegarder en priorité.' },
      { q: 'Rôle de /var ?', a: 'Les données variables : journaux, spools, bases de données.' },
      { q: 'Qu’est-ce qu’un chemin absolu ?', a: 'Un chemin qui commence par / et décrit la position depuis la racine.' },
      { q: 'Différence entre > et >> ?', a: '> écrase le fichier, >> ajoute à la fin.' },
      { q: 'Que fait mv dans le même dossier ?', a: 'Il renomme le fichier : mv ancien nouveau.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Manipulation de fichiers et recherche',
    short: 'Fichiers et recherche',
    toc: 'Copier, déplacer, supprimer, liens symboliques, find par nom/type/taille, grep dans les journaux.',
    time: '≈ 2 h de travail',
    lockLabel: 'Réservé B2 et plus',

    situation:
      'Un serveur en production produit des gigaoctets de fichiers et de journaux. L’administrateur doit ' +
      'retrouver un fichier précis, repérer les liens cassés, et extraire d’un journal la seule ligne qui ' +
      'explique la panne.',

    objectives: [
      'copier, déplacer et supprimer sans perdre de données ;',
      'distinguer un lien symbolique d’un lien dur ;',
      'chercher par nom, type et taille avec find ;',
      'filtres un journal avec grep pour y compter les erreurs.'
    ],

    sections: [
      {
        title: 'Copier, déplacer, supprimer proprement',
        html: [
          '<p><code>cp</code> et <code>mv</code> acceptent l’option <code>-i</code> (demander confirmation avant ' +
          'd’écraser) et <code>-r</code> (récursif, pour un dossier). Le réflexe d’administration est de ' +
          'prévisualiser une suppression avec <code>ls</code> avant de lancer <code>rm</code>.</p>',
          '<pre><code>cp -r /etc/nginx /root/nginx.bak   # sauvegarder un dossier\n' +
          'mv rapport.txt /var/backups/       # déplacer\n' +
          'rm -i ancien.log                   # demander confirmation\n' +
          'find /tmp -type f -delete          # supprimer les fichiers (pas les dossiers)</code></pre>',
          box('intuition', 'Sauvegarder avant de modifier', 'compass',
            '    <p>La règle d’or : avant de modifier un fichier de configuration, on en fait une copie ' +
            'horodatée. En cas d’erreur, restaurer la copie prend deux secondes ; sans elle, la machine peut ' +
            'être inaccessible.</p>')
        ].join('\n')
      },
      {
        title: 'Liens durs et liens symboliques',
        html: [
          '<p>Un <strong>lien dur</strong> (<code>ln source lien</code>) est un second nom pour le <em>même</em> ' +
          'fichier : les deux noms partagent les mêmes données et le même numéro d’inode. Un <strong>lien ' +
          'symbolique</strong> (<code>ln -s source lien</code>) est un simple raccourci : il pointe vers un ' +
          'chemin, et si la cible disparaît, le lien devient cassé.</p>',
          '<pre><code>ln fichier second_nom       # lien dur : même contenu, même inode\n' +
          'ln -s /etc/hosts raccourci  # lien symbolique : un raccourci vers un chemin\n' +
          'ls -l raccourci             # l -&gt; indique la cible du lien symbolique</code></pre>',
          box('pitfall', 'Piège — le lien dur ne traverse pas les systèmes de fichiers', 'warning',
            '    <p>Un lien dur ne peut pas franchir les frontières d’un système de fichiers ni pointer vers un ' +
            'dossier. Le lien symbolique, lui, accepte tout — y compris une cible absente, ce qui produit un ' +
            '<strong>lien cassé</strong> que <code>find</code> signale.</p>')
        ].join('\n')
      },
      {
        title: 'find : chercher par critère',
        html: [
          '<p><code>find</code> parcourt une arborescence et applique des critères. Il se lit ' +
          '<code>find répertoire critères</code> :</p>',
          '<pre><code>find /tmp -name "fich*"      # par motif de nom\n' +
          'find /tmp -type f            # fichier (f) ou dossier (d)\n' +
          'find /var -size +10M         # plus de 10 mégaoctets\n' +
          'find /etc -user root         # appartenant à root\n' +
          'find / -perm -4000 -type f   # fichiers setuid (audit de sécurité)</code></pre>',
          box('tech', 'find est le couteau suisse', 'wrench',
            '    <p>On combine les critères sans limite : <code>find /home -type f -name "*.ssh*"</code> ' +
            'retrouve les clés, <code>find /var/log -mtime +7</code> les journaux vieux de plus de sept jours. ' +
            'Le motif de nom doit être entre guillemets, sinon le shell l’interprète avant find.</p>')
        ].join('\n')
      },
      {
        title: 'grep et les journaux',
        html: [
          '<p>Les journaux de <code>/var/log</code> sont des fichiers texte : on les filtre avec ' +
          '<code>grep</code>. <code>grep -c</code> compte les lignes, <code>grep -i</code> ignore la casse, ' +
          '<code>grep -v</code> inverse la sélection.</p>',
          '<pre><code>grep "ERROR" /var/log/syslog      # lignes contenant ERROR\n' +
          'grep -c "ERROR" /var/log/syslog   # combien de lignes\n' +
          'grep -i "failed" /var/log/auth.log\n' +
          'jourctl -p err -b                 # même idée avec journalctl (systemd)</code></pre>',
          box('mnemo', 'Lire un journal en trois temps', 'pin',
            '    <p>1) repérer le fichier concerné (<code>/var/log/syslog</code>, <code>auth.log</code>) ; ' +
            '2) <strong>filtrer</strong> par niveau (<code>ERROR</code>) ; 3) <strong>compter</strong> avec ' +
            '<code>grep -c</code> pour décider si l’incident est isolé ou répété.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quelle option de cp copie un dossier entier ?', opts: ['-r', '-l', '-a'], correct: 0, exp: '-r rend la copie récursive : dossier, sous-dossiers et fichiers.' },
      { stem: 'Un lien dur partage…', opts: ['le même chemin', 'le même inode et les mêmes données', 'le même propriétaire seulement'], correct: 1, exp: 'Le lien dur est un second nom pour le même fichier (même inode).' },
      { stem: 'Que crée ln -s source lien ?', opts: ['un lien dur', 'un lien symbolique', 'une copie'], correct: 1, exp: '-s crée un lien symbolique, un simple raccourci de chemin.' },
      { stem: 'Un lien symbolique vers une cible supprimée devient…', opts: ['un lien dur', 'un lien cassé', 'inoffensif'], correct: 1, exp: 'Le symbole pointe vers un chemin absent : le lien est cassé.' },
      { stem: 'find /var -size +10M cherche…', opts: ['les fichiers de moins de 10 Mo', 'les fichiers de plus de 10 Mo', 'les dossiers de 10 fichiers'], correct: 1, exp: 'Le signe + signifie « supérieur à » ; -10M serait « inférieur ».' },
      { stem: 'grep -c compte…', opts: ['les mots', 'les lignes correspondantes', 'les fichiers'], correct: 1, exp: '-c affiche le nombre de lignes qui correspondent au motif.' },
      { stem: 'Où lire les traces d’une connexion en échec ?', opts: ['/var/log/auth.log', '/etc/passwd', '/tmp'], correct: 0, exp: 'Les authentifications et échecs de connexion sont journalisés dans auth.log.' },
      { stem: 'Pourquoi entourer le motif de find de guillemets ?', opts: ['pour la couleur', 'pour empêcher le shell de l’interpréter', 'c’est obligatoire'], correct: 1, exp: 'Sans guillemets, le shell développe le motif (fich*) avant de lancer find.' }
    ],

    pitfalls: [
      'Confondre lien dur (même inode) et lien symbolique (raccourci de chemin).',
      'Oublier <code>-r</code> et croire qu’un dossier a été copié alors que cp a échoué.',
      'Négliger les motifs de <code>find</code> sans guillemets, développés par le shell.',
      'Chercher un mot sans <code>-i</code> et manquer les lignes en casse mixte.',
      'Modifier un fichier de configuration sans en avoir fait une copie de sauvegarde.'
    ],

    methodTitle: 'Retrouver une information dans un parc',
    method: [
      '<strong>Préciser la cible</strong> : nom exact, motif, extension ou taille ?',
      '<strong>Choisir l’outil</strong> : <code>find</code> pour les fichiers, <code>grep</code> pour les contenus.',
      '<strong>Restreindre la portée</strong> : partir d’un répertoire précis plutôt que de la racine.',
      '<strong>Vérifier le motif</strong> : guillemets autour de <code>"fich*"</code>.',
      '<strong>Rapporter</strong> : compter avec <code>grep -c</code> ou <code>find | wc -l</code>.'
    ],

    summary: [
      'cp duplique (-r pour un dossier), mv déplace ou renomme, rm supprime définitivement.',
      'Lien dur = même inode ; lien symbolique = raccourci de chemin, cassable.',
      'find cherche par nom (-name), type (-type), taille (-size), propriétaire (-user).',
      'grep filtre les journaux : -c compte, -i ignore la casse, -v inverse.',
      'Les journaux vivent dans /var/log ; auth.log trace les connexions.'
    ],

    checklist: [
      'Je sauvegarde avant de modifier un fichier de configuration.',
      'Je distingue un lien dur d’un lien symbolique.',
      'J’écris une commande find avec un motif entre guillemets.',
      'Je compte les erreurs d’un journal avec grep -c.'
    ],

    notions: ['cp', 'mv', 'rm', 'lien dur', 'inode', 'lien symbolique', 'find', 'grep', 'journal', '/var/log'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Revois cp/mv/rm et enchaîne trois copies de sauvegarde.' },
      { cls: 'mid', text: '50–69 % — Trace à la main un lien dur et un lien symbolique.' },
      { cls: 'good', text: '70–94 % — Solide : écris de mémoire quatre critères de find.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 3, droits et comptes.' }
    ],

    flashcards: [
      { q: 'Quelle option copie un dossier en entier ?', a: 'cp -r (récursif).' },
      { q: 'Différence lien dur / lien symbolique ?', a: 'Le lien dur partage l’inode du fichier ; le symbolique est un raccourci de chemin, cassable.' },
      { q: 'Trois critères de find ?', a: '-name (nom), -type (f ou d), -size (taille).' },
      { q: 'Que fait grep -i ?', a: 'Il ignore la casse (majuscules/minuscules).' },
      { q: 'Où sont les journaux ?', a: 'Dans /var/log (syslog, auth.log…).' },
      { q: 'Pourquoi utiliser find -delete ?', a: 'Pour supprimer précisément les fichiers qui correspondent aux critères, sans toucher aux dossiers.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Droits, permissions, utilisateurs et groupes',
    short: 'Droits et comptes',
    toc: 'Lire les permissions, chmod symbolique et octal, chown/chgrp, /etc/passwd, users et groupes.',
    time: '≈ 2 h 30 de travail',
    lockLabel: 'Réservé B2 et plus',

    situation:
      'Sur un serveur partagé, chacun doit pouvoir travailler sans marcher sur le travail des autres. Les ' +
      'droits Unix décident qui peut lire, écrire et exécuter ; les comptes et les groupes décident qui est ' +
      'qui. Un droit mal posé ouvre une faille, un compte mal géré laisse une porte ouverte.',

    objectives: [
      'lire une ligne de droits et la traduire en octal ;',
      'modifier les droits en notation symbolique et octale ;',
      'changer propriétaire et groupe d’un fichier ;',
      'lire /etc/passwd, /etc/shadow et /etc/group ;',
      'créer, modifier et supprimer comptes et groupes.'
    ],

    sections: [
      {
        title: 'Lire les permissions',
        html: [
          '<p><code>ls -l</code> affiche une chaîne de dix caractères. Le premier est le <strong>type</strong> ' +
          '(<code>-</code> fichier, <code>d</code> dossier, <code>l</code> lien) ; les neuf suivants sont trois ' +
          'trios : <strong>u</strong> (propriétaire), <strong>g</strong> (groupe), <strong>o</strong> (autres). ' +
          'Dans chaque trio, <code>r</code> lit, <code>w</code> écrit, <code>x</code> exécute.</p>',
          '<pre><code>-rwxr-x--- 1 rd it 4096 mai 12 10:00 script.sh\n' +
          ' ^^^       ^^ ^^\n' +
          ' u g o     own grp\n' +
          'u=rwx  g=r-x  o=---</code></pre>',
          box('mnemo', 'La valeur des lettres', 'pin',
            '    <p>r = 4, w = 2, x = 1. Un trio se lit donc <code>rwx=7</code>, <code>r-x=5</code>, ' +
            '<code>rw-=6</code>, <code>r--=4</code>, <code>---=0</code>. On additionne dans chaque trio, ' +
            'jamais entre les trios : <code>rwxr-x---</code> = 750, pas 12.</p>')
        ].join('\n')
      },
      {
        title: 'chmod : modifier les droits',
        html: [
          '<p>Deux notations équivalentes. <strong>Octale</strong> : trois chiffres, un par trio. ' +
          '<strong>Symbolique</strong> : on nomme la classe (u, g, o, a = tous) et l’opération ' +
          '(<code>+</code> ajoute, <code>-</code> retire, <code>=</code> fixe exactement).</p>',
          '<pre><code>chmod 755 script.sh        # rwxr-xr-x\n' +
          'chmod 640 secret.conf      # rw-r-----\n' +
          'chmod u+x script.sh        # ajoute l’exécution au propriétaire\n' +
          'chmod o-rw secret.conf     # retire lecture et écriture aux autres\n' +
          'chmod ug=rwx dossier       # fixe u et g exactement, o inchangé\n' +
          'chmod -R 750 /srv/site     # récursif sur tout le dossier</code></pre>',
          box('pitfall', 'Piège — 777 n’est jamais une solution', 'warning',
            '    <p>Donner <code>777</code> « pour que ça marche » ouvre le fichier au monde entier. ' +
            'Le bon réflexe est de chercher la <em>classe</em> qui manque (souvent le groupe) et de lui ' +
            'accorder le droit nécessaire, pas de tout ouvrir.</p>')
        ].join('\n')
      },
      {
        title: 'chown et chgrp',
        html: [
          '<p><code>chown</code> change le <strong>propriétaire</strong>, <code>chgrp</code> le ' +
          '<strong>groupe</strong>. <code>chown</code> sait faire les deux d’un coup avec ' +
          '<code>utilisateur:groupe</code>, et l’option <code>-R</code> rend le changement récursif.</p>',
          '<pre><code>chown rd rapport.txt            # propriétaire = rd\n' +
          'chgrp it rapport.txt            # groupe = it\n' +
          'chown rd:it rapport.txt         # les deux à la fois\n' +
          'chown -R www-data:www-data /var/www  # rendre un site au serveur web</code></pre>',
          box('tech', 'Après un déploiement', 'wrench',
            '    <p>Copier des fichiers avec <code>cp</code> en root n’est pas suffisant : les nouveaux ' +
            'fichiers appartiennent à root. Un site web servi par <code>www-data</code> doit lui être ' +
            'restitué, sinon le serveur ne lira pas ses propres fichiers.</p>')
        ].join('\n')
      },
      {
        title: 'Comptes et groupes',
        html: [
          '<p>Trois fichiers font foi. <code>/etc/passwd</code> décrit les comptes (lisible par tous), ' +
          '<code>/etc/shadow</code> contient les mots de passe chiffrés (root seul), <code>/etc/group</code> ' +
          'les groupes.</p>',
          '<pre><code>caroline:x:1002:1000:Caroline TP:/home/caroline:/bin/bash\n' +
          '  ^      ^  ^    ^     ^             ^            ^\n' +
          ' login mdp UID GID  info          maison       shell\n' +
          '/etc/shadow : login:empreinte:dates… (root uniquement)\n' +
          '/etc/group  : groupe:*:GID:utilisateurs</code></pre>',
          '<p>root a l’UID 0 ; les comptes système sont sous 1000 ; les comptes humains commencent à 1000. ' +
          'Dans <code>/etc/passwd</code>, <code>x</code> ou <code>!</code> renvoient au shadow ; ' +
          '<code>*</code> interdit l’authentification ; <code>!!</code> désactive le compte.</p>',
          box('mnemo', 'Menus de gestion des comptes', 'pin',
            '    <p><code>useradd</code> crée, <code>usermod</code> modifie, <code>userdel -r</code> supprime ' +
            '(avec la maison), <code>groupadd</code>/<code>groupdel</code> gèrent les groupes, ' +
            '<code>passwd</code> change le mot de passe, <code>id</code> affiche les appartenances.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'rwxr-x--- vaut en octal…', opts: ['754', '750', '705'], correct: 1, exp: 'rwx=7, r-x=5, ---=0 : 750, trio par trio.' },
      { stem: 'Que fait chmod o-r secret ?', opts: ['retire la lecture aux autres', 'retire la lecture au propriétaire', 'ajoute la lecture'], correct: 0, exp: 'o désigne les autres, - retire : la lecture leur est enlevée.' },
      { stem: 'Ug=rwx…', opts: ['ajoute rwx', 'fixe u et g exactement à rwx, o inchangé', 'supprime o'], correct: 1, exp: '= fixe exactement les classes visées ; les autres ne bougent pas.' },
      { stem: 'Quel fichier contient les mots de passe chiffrés ?', opts: ['/etc/passwd', '/etc/shadow', '/etc/group'], correct: 1, exp: '/etc/shadow, lisible par root uniquement, contient les empreintes.' },
      { stem: 'Un UID ≥ 1000 correspond à…', opts: ['un compte système', 'un compte humain', 'root'], correct: 1, exp: 'Les comptes humains commencent à 1000 ; en dessous, ce sont des comptes système.' },
      { stem: 'Que fait userdel -r ?', opts: ['supprime le compte seul', 'supprime le compte et sa maison', 'désactive le compte'], correct: 1, exp: '-r retire aussi le répertoire personnel et la boîte aux lettres.' },
      { stem: 'chgrp agit sur…', opts: ['le propriétaire', 'le groupe', 'les droits'], correct: 1, exp: 'chgrp change le groupe propriétaire ; chown le propriétaire.' },
      { stem: 'groupdel échoue quand le groupe…', opts: ['est vide', 'sert de groupe principal à un utilisateur', 'a des fichiers'], correct: 1, exp: 'On ne supprime pas un groupe qui est le groupe principal d’un compte.' }
    ],

    pitfalls: [
      'Confondre <code>/</code> et <code>/root</code> dans un contexte de droits.',
      'Additionner les trios entre eux (750, pas 12).',
      'Ouvrir en <code>777</code> au lieu d’accorder le droit à la bonne classe.',
      'Oublier <code>-R</code> sur <code>chown</code> après un déploiement.',
      'Confondre <code>chown</code> (propriétaire) et <code>chgrp</code> (groupe).'
    ],

    methodTitle: 'Poser des droits justes',
    method: [
      '<strong>Lire</strong> la ligne de droits et la découper en trois trios.',
      '<strong>Convertir</strong> chaque trio en chiffre (r=4, w=2, x=1).',
      '<strong>Décider</strong> de la classe qui a besoin du droit : u, g ou o.',
      '<strong>Appliquer</strong> avec la notation la plus lisible (773 ou ug=rx).',
      '<strong>Vérifier</strong> avec <code>ls -l</code> et <code>id utilisateur</code>.'
    ],

    summary: [
      'Dix caractères : type + u + g + o ; r=4, w=2, x=1 par trio.',
      'chmod en octal (755) ou symbolique (u+x, o-rw, ug=rwx) ; -R pour récursif.',
      'chown change le propriétaire (ou utilisateur:groupe) ; chgrp le groupe.',
      '/etc/passwd décrit les comptes, /etc/shadow les mots de passe, /etc/group les groupes.',
      'UID 0 = root, < 1000 = système, ≥ 1000 = humain ; useradd, usermod, userdel -r.'
    ],

    checklist: [
      'Je convertis une ligne de droits en octal sans erreur.',
      'Je choisis entre notation octale et symbolique selon le besoin.',
      'Je restitue un dossier au bon propriétaire et groupe après déploiement.',
      'Je lis une ligne de /etc/passwd champ par champ.'
    ],

    notions: ['permissions', 'trios u/g/o', 'r-w-x', 'chmod', 'notation octale', 'chown', 'chgrp', '/etc/passwd', '/etc/shadow', '/etc/group', 'useradd', 'usermod'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Réentraîne la conversion octal sur dix lignes de ls -l.' },
      { cls: 'mid', text: '50–69 % — Rejoue chmod symbolique et octal sur un dossier de test.' },
      { cls: 'good', text: '70–94 % — Solide : décompose une ligne de /etc/passwd de mémoire.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 4, réseau statique et SSH.' }
    ],

    flashcards: [
      { q: 'Valeur de r, w, x ?', a: 'r = 4, w = 2, x = 1, additionnés dans chaque trio.' },
      { q: 'Que vaut rwxr-x--- en octal ?', a: '750 : rwx = 7, r-x = 5, --- = 0.' },
      { q: 'Différence entre + et = dans chmod ?', a: '+ ajoute un droit, = fixe la classe exactement.' },
      { q: 'Que fait chown user:group f ?', a: 'Il change à la fois le propriétaire et le groupe de f.' },
      { q: 'Champs de /etc/passwd ?', a: 'login:mot-de-passe:UID:GID:info:maison:shell.' },
      { q: 'Que fait userdel -r ?', a: 'Supprimez le compte et son répertoire personnel.' }
    ]
  }
];
