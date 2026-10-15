/**
 * Pages transverses du cours « Administration Linux » B2.
 *
 * Elles ne dépendent que du kit de gabarit : accueil, sommaire, atelier,
 * cartes, mémo, examens blancs, exercices. Les chapitres sont composés par
 * `kit.chapter` à partir des données de `chapitres-1-3.js` / `4-6.js`.
 */
'use strict';

const { ic, box, qcm, cards, bands, crumb } = require('../../../scripts/course-kit');

function chnav(back, forward) {
  const links = ['  <div class="chnav">'];
  if (back) links.push('    <a class="btn" href="' + back.href + '">' + ic('arrow-left') + ' ' + back.label + '</a>');
  if (forward) links.push('    <a class="btn btn--primary" href="' + forward.href + '">' + forward.label + ' ' + ic('arrow-right') + '</a>');
  links.push('  </div>');
  return links.join('\n');
}

function disclaimer(course, extra) {
  return '  <p class="disclaimer">Objectif de maîtrise 19/20 — ta note réelle dépend aussi de ton travail.\n  ' +
    (extra || '') + 'Sources : ' + course.sources + '.</p>';
}

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const toc = chapterList.map(chapitre =>
    '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
    '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span></span></a>'
  ).join('\n');

  const body = [
    crumb(course, [{ href: '/index.html', label: 'Portail des cours' }, { label: course.brand }]),
    '  <div class="chapmeta">',
    '    <span class="tag">Licence 2 · B2</span>',
    '    <span class="tag tag--time">Administration système</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>te déplacer dans l’arborescence FHS et bâtir des chemins absolus ou relatifs ;</li>',
      '      <li>manipuler fichiers et liens, et retrouver une information avec find et grep ;</li>',
      '      <li>lire, calculer et poser des droits justes (chmod, chown, chgrp) ;</li>',
      '      <li>gérer les comptes et groupes en lisant /etc/passwd, /etc/shadow, /etc/group ;</li>',
      '      <li>valider une adresse IPv4, la classer, et décoder une cible SSH ;</li>',
      '      <li>écrire des scripts Bash qui lisent, décident et rapportent ;</li>',
      '      <li>piloter un service systemd, repérer un zombie et planifier une tâche cron.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Le cours historique d’administration Linux couvre le terminal, les fichiers, les droits, le ' +
      'réseau, les scripts et les services. Ce cours en garde le plan et fait manipuler chaque mécanisme ' +
      '<strong>en Bash</strong> : le même langage que le terminal d’administration, exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique écrite ' +
      'ici se rejoue telle quelle sur un serveur.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo de l’administrateur</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Administration Linux B2 — fichiers, droits, réseau et services | Cours Interactif',
      description: course.description,
      active: null,
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const toc = chapterList.map(chapitre => {
    const lock = chapitre.free
      ? '<br><span class="locknote">Accès libre</span>'
      : '<br><span class="locknote">' + ic('lock') + ' B2 et plus</span>';
    return '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
      '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span>' +
      lock + '</span></a>';
  }).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire du cours</h1>',
    '  <p class="lead">' + chapterList.length + ' chapitres, du terminal jusqu’à la supervision des services. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B2 ou supérieur (et un ' +
    'abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Bash</strong> à écrire et à exécuter ' +
    'dans la page : ton script est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L’<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo de l’administrateur</span><br><span class="toc__d">Arborescence, commandes, droits, réseau, services et squelettes de scripts sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final d’administration d’un serveur.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’examen, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours d’administration Linux B2 : ' + chapterList.length +
        ' chapitres, exercices Bash exécutables, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier de scripts</h1>',
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur Bash derrière. Écris un script, ' +
    'exécute-le et lis ce qu’il affiche : c’est ici qu’une règle d’administration devient un contrôle automatisé.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre script Bash tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>read</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l’éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="shell"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="">',
      '  <script type="text/plain" data-lab-starter>#!/bin/bash',
      '# Zone libre : simulez, cassez, recommencez.',
      '# Rien de ce que vous écrirez ici n’est noté.',
      '#',
      '# Exemple proposé : contrôleur d’un parc de serveurs.',
      '# Le script lit n, puis n lignes « service etat » (active, inactive, failed).',
      '# Il décide de l’action et compte les alertes.',
      '',
      'read -r n',
      'alertes=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r service etat',
      '  case "$etat" in',
      '    active) echo "$service : rien a faire" ;;',
      '    inactive) echo "$service : demarrer"; alertes=$((alertes + 1)) ;;',
      '    failed) echo "$service : redemarrer"; alertes=$((alertes + 1)) ;;',
      '  esac',
      'done',
      'echo "alertes : $alertes"',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — contrôleur de parc de serveurs</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Bash</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un mécanisme ' +
      'd’administration (conversion octal, validation IPv4, filtre de journal, état de service), programme-le ' +
      'et teste-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé lit l’état d’une liste de services et décide de l’action. Modifie la règle, ' +
      'ajoute un décompte par état, ou remplace tout le script par le mécanisme que tu veux vérifier — un audit ' +
      'de droits, un classement de tâches cron, une validation d’adresse.</p>',
      '      <p>Dans un vrai terminal, ce sera <code>systemctl</code>, <code>ps</code>, <code>cron</code> : ' +
      'la structure du script — lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>3',
      'ssh active',
      'nginx failed',
      'mysql inactive</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>ssh : rien a faire',
      'nginx : redemarrer',
      'mysql : demarrer',
      'alertes : 2</pre></div>',
      '    </div>',
      '    <p class="lab__note">Sept lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai serveur</h2>',
    '  <p>La simulation a une limite assumée : rien n’est vraiment écrit sur disque. Elle a une force : ' +
    '<strong>toute la logique se vérifie sans machine</strong>. Quand le script affiche les bons rapports ' +
    'sur tes cas limites, le portage vers un serveur est mécanique : <code>read</code> lit la même entrée, ' +
    '<code>case</code> décide du même arbre, et le bilan s’affiche pareil.</p>',
    box('pitfall', 'Les trois erreurs que l’atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Ordre des lectures inversé</strong> : le script lit un nom avant n, ou le seuil après les valeurs.</li>',
      '      <li><strong>Dernière ligne non lue</strong> : sans retour à la ligne final sur l’entrée, le dernier read renvoie un échec.</li>',
      '      <li><strong>Bilan dans la boucle</strong> : le total s’affiche à chaque passage au lieu d’une seule fois, après.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Ce que fait l’atelier, côté technique', 'terminal', [
      '    <ul>',
      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service d’exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n’est possible.</li>',
      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',
      '      <li>Le nombre d’exécutions est limité par jour, pour tout le monde. L’atelier n’exécute donc que sur un clic.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Bash corrigés ' +
    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le mécanisme est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Terminal et arborescence' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — administrer en Bash | ' + course.brand,
      description: 'Atelier de scripts du cours d’administration Linux B2 : éditeur dans le navigateur, ' +
        'exécution réelle du script Bash, entrée standard, console de sortie et tuteur qui explique les erreurs.',
      active: 'atelier',
      body
    }
  };
}

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Clique une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Reviens à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo de l’administrateur' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours d’administration Linux B2 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo de l’administrateur</h1>',
    '  <p class="lead">Arborescence, commandes, droits, réseau, services et squelettes de scripts du cours ' +
    'sur une page. À garder ouvert pendant les exercices et l’atelier.</p>',

    bloc('L’arborescence en une image', [
      '<pre><code>/          racine : origine de tout\n',
      'etc        configuration (à sauvegarder)      home   répertoires des utilisateurs\n',
      'tmp        temporaires, vidés au reboot        var    journaux, spools, bases\n',
      'root       maison du super-utilisateur         dev    fichiers des périphériques\n',
      'usr        programmes et bibliothèques         bin/sbin  binaires essentiels\n',
      'boot       noyau et démarrage                  proc   arborescence virtuelle du noyau</code></pre>',
      '<p>Tout chemin absolu commence par / ; /root n’est pas /.</p>'
    ].join('\n')),

    bloc('Commandes de base', [
      '<pre><code>où suis-je        pwd            changer      cd chemin\n',
      'lister            ls [-a -l]      créer rep    mkdir -p\n',
      'créer fichier     touch          copier      cp [-r] source cible\n',
      'renommer/déplacer mv             supprimer   rm [-r] (danger : -f)\n',
      'afficher          cat, head, tail            manuel      man cmd\n',
      'écrire            echo "x" &gt; f (écrase) ; echo "x" &gt;&gt; f (ajoute)</code></pre>',
      '<p>Syntaxe immuable : COMMANDE OPTIONS ARGUMENTS — ls -l /home.</p>'
    ].join('\n')),

    bloc('Chercher : find et grep', [
      '<pre><code>find /tmp -name "fich*"     -type f|d    -size +10M   -user root\n',
      'find / -perm -4000 -type f  # audit setuid\n',
      'grep "ERROR" /var/log/syslog   -c (compte)   -i (casse)   -v (inverse)\n',
      'journalctl -u service   -p err -b   tail -f /var/log/syslog</code></pre>',
      '<p>Toujours des guillemets autour du motif de find, sinon le shell le développe.</p>'
    ].join('\n')),

    bloc('Droits d’accès', [
      '<pre><code>-rwxr-x---     type(-,d,l) + u:rwx  g:r-x  o:---\n',
      'poids          r=4  w=2  x=1  →  rwx=7  r-x=5  rw-=6  ---=0\n',
      'octal          rwxr-x--- = 750 ; rw-r--r-- = 644 ; rw-r----- = 640\n',
      'chmod          symbolique (u/g/o/a + - = lettres) ou octal ; -R récursif\n',
      'chown          propriétaire (utilisateur:groupe) ; chgrp groupe\n',
      'vérifier       ls -l, id utilisateur</code></pre>',
      '<p>+ ajoute, - retire, = fixe exactement : ug=rwx efface ce qui dépassait rwx.</p>'
    ].join('\n')),

    bloc('Comptes et groupes', [
      '<pre><code>/etc/passwd  login:mot-de-passe:UID:GID:info:maison:shell\n',
      '             x ou ! = mot de passe dans shadow ; * interdit ; !! désactive\n',
      '/etc/shadow  mots de passe chiffrés (root seul)\n',
      '/etc/group   groupe:*:GID:utilisateurs\n',
      'commandes    useradd, usermod, userdel -r, passwd, groupadd, groupdel\n',
      'UID          root = 0 ; &lt; 1000 = système ; ≥ 1000 = humains</code></pre>',
      '<p>id utilisateur affiche UID, GID et groupes secondaires.</p>'
    ].join('\n')),

    bloc('Réseau et SSH', [
      '<pre><code>ip a ; ip route          adresses et passerelle (default via)\n',
      'privées  10.0.0.0/8 ; 172.16–172.31 ; 192.168.0.0/16\n',
      'statique /etc/network/interfaces : address / gateway / dns-nameservers\n',
      'ssh user@hote:port       port 22 par défaut\n',
      'ssh-keygen -t ed25519 ; ssh-copy-id user@hote ; scp f user@hote:/tmp/</code></pre>',
      '<p>Adresse IPv4 valide : exactement quatre octets de 0 à 255.</p>'
    ].join('\n')),

    bloc('Services, processus, planification', [
      '<pre><code>systemctl status|start|restart|enable service\n',
      'active → rien ; inactive → start ; failed → restart\n',
      'ps aux ; top ; kill PID (propre) ; kill -9 PID (dernier recours)\n',
      'cron : minute heure jour mois jour-semaine  commande\n',
      'journalctl -u service   journalctl -p err -b</code></pre>',
      '<p>Un zombie est un processus terminé non récupéré par son parent.</p>'
    ].join('\n')),

    bloc('Squelette d’un script Bash', [
      '<pre><code>#!/bin/bash\n',
      'read -r n                    # premier : le compteur d’entrées\n',
      'compteur=0                   # initialisation AVANT la boucle\n',
      'for ((i=0; i&lt;n; i++)); do\n',
      '  read -r valeur             # une lecture par ligne d’entrée\n',
      '  case "$valeur" in OK) compteur=$((compteur + 1)) ;; esac\n',
      'done\n',
      'echo "compteur : $compteur"  # bilan APRÈS la boucle</code></pre>',
      '<p>Comparer des nombres : -eq -ne -lt -le -gt -ge. Toujours entre guillemets dans [ ].</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre / (racine) et /root (maison de root).</li>',
      '    <li>Écrire les journaux dans /etc au lieu de /var.</li>',
      '    <li>Un seul chevron &gt; qui écrase un fichier de configuration.</li>',
      '    <li>Ouvrir un fichier en 777 au lieu d’accorder le droit à la bonne classe.</li>',
      '    <li>Redémarrer un service sans lire son status ni son journal.</li>',
      '    <li>Lire le seuil après n, ou oublier le retour à la ligne final du dernier read.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo de l’administrateur — ' + course.brand,
      description: 'Mémo du cours d’administration Linux B2 : arborescence, commandes, find et grep, droits, ' +
        'comptes, réseau, services et squelette de script Bash sur une page.',
      active: 'formules',
      body
    }
  };
}

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 — administration du système',
      intro: 'Sujet type examen — fichiers, droits et comptes.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Arborescence',
          text: 'Où stocke-t-on les configurations système, les journaux des services, les répertoires personnels et les fichiers temporaires ? Justifier pourquoi /etc est le répertoire à sauvegarder, et dire ce que devient /tmp au redémarrage.',
          sol: 'Configurations : <code>/etc</code>. Journaux et spools : <code>/var</code>. Répertoires personnels : <code>/home</code> (celui de root est <code>/root</code>). Temporaires : <code>/tmp</code>, <strong>effacé à chaque redémarrage</strong>.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — /etc/passwd',
          text: 'Décomposer la ligne caroline:x:1002:1000:Caroline TP:/home/caroline:/bin/bash champ par champ. Que signifie le champ x ? Cette utilisatrice est-elle humaine ou système ?',
          sol: 'login=caroline ; mot-de-passe=x (empreinte dans <code>/etc/shadow</code>) ; UID=1002 ; GID=1000 ; info=Caroline TP ; maison=/home/caroline ; shell=/bin/bash.<br><code>x</code> ou <code>!</code> renvoient au shadow ; UID 1002 ≥ 1000 : <strong>compte humain</strong>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Droits',
          text: 'Un fichier porte les droits rw-r-----. Donner sa notation octale, puis les commandes qui (a) retirent la lecture aux autres, (b) fixent exactement rwx au propriétaire, (c) lui donnent les droits 770. Que fait chacune ?',
          sol: 'rw- = 6, r-- = 4, --- = 0 → <code>640</code>.<br>(a) <code>chmod o-r f</code> ; (b) <code>chmod u=rwx f</code> — le = fixe la classe exactement ; (c) <code>chmod 770 f</code> → rwxrwx--- : tout pour u et g, rien aux autres.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Script',
          text: 'Écrire le script qui lit n puis n lignes « nom taille » et compte les fichiers d’au moins 1024 octets. Que se passe-t-il si l’entrée ne finit pas par un retour à la ligne ?',
          sol: 'Boucle <code>for ((i=0; i&lt;n; i++))</code> avec <code>read -r nom taille</code>, compteur initialisé avant, bilan affiché après. Sans retour à la ligne final, le <strong>dernier read touche l’EOF et échoue</strong> : toujours finir l’entrée par un saut de ligne.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — réseau et services',
      intro: 'Sujet orienté réseau statique, SSH, scripts et supervision.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Adressage',
          text: 'Pour les adresses 192.168.1.10, 10.0.0.5, 172.16.3.4, 172.32.1.1 et 8.8.8.8 : dire lesquelles sont privées, et pourquoi. Donner les trois plages privées de la RFC 1918.',
          sol: 'Privées : <code>192.168.1.10</code>, <code>10.0.0.5</code>, <code>172.16.3.4</code>. <code>172.32.1.1</code> et <code>8.8.8.8</code> sont <strong>publiques</strong>.<br>Plages : 10.0.0.0/8, 172.16.0.0/12 (16 à 31), 192.168.0.0/16.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — SSH',
          text: 'Décoder la cible sam@serveur:2222 (utilisateur, hôte, port). Citer deux bonnes pratiques qui renforcent une connexion SSH.',
          sol: 'utilisateur = sam ; hôte = serveur ; port = 2222.<br>Bonnes pratiques : authentification par <strong>clé</strong> plutôt que mot de passe ; changer le port par défaut et/ou restreindre les comptes autorisés.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Services',
          text: 'Un service nginx est en état failed. Donner la commande pour constater, celle pour lire son journal, puis l’action à mener. Que fait systemctl enable ?',
          sol: '<code>systemctl status nginx</code> pour constater ; <code>journalctl -u nginx</code> pour lire ; action : <code>systemctl restart nginx</code> (état failed). <code>enable</code> active le service au démarrage de la machine.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Planification',
          text: 'Écrire une entrée crontab qui lance /root/backup.sh chaque jour à 6 h, puis expliquer chaque champ. Que lance 0 6 * * 1 ?',
          sol: '<code>0 6 * * * /root/backup.sh</code> : minute 0, heure 6, tous les jours du mois, tous les mois, tous les jours de la semaine.<br><code>0 6 * * 1</code> : tous les <strong>lundis</strong> à 6 h.'
        }
      ]
    }
  ];

  const itemHtml = (item) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="item__num">' + item.num + '</span><span class="badge">' + item.badge + '</span></div>',
    '    <p>' + item.text + '</p>',
    '    <details><summary>Corrigé</summary><div class="sol">' + item.sol + '</div></details>',
    '  </div>'
  ].join('\n');

  const mastery = [
    { stem: 'Que contient /var ?', opts: ['Les configurations', 'Les journaux et spools', 'Les binaires essentiels'], correct: 1, exp: '/var : données variables — journaux, spools de mail, d’impression et de cron.' },
    { stem: 'root possède quel UID ?', opts: ['0', '1', '1000'], correct: 0, exp: 'root = UID 0 ; les comptes système sont en dessous de 1000.' },
    { stem: 'rwxr-x--- en octal ?', opts: ['754', '750', '705'], correct: 1, exp: 'rwx=7, r-x=5, ---=0 : 750, triplet par triplet.' },
    { stem: 'Quelle adresse est privée ?', opts: ['172.32.1.1', '172.20.0.1', '203.0.113.7'], correct: 1, exp: 'Seules les plages 172.16 à 172.31 sont privées ; 172.32 est publique.' },
    { stem: 'Format d’une cible SSH ?', opts: ['hote@user:port', 'user@hote:port', 'user:hote@port'], correct: 1, exp: 'utilisateur@hote:port ; port 22 par défaut.' },
    { stem: 'chmod u+w f…', opts: ['ajoute l’écriture au propriétaire', 'retire l’écriture au groupe', 'fixe tout à rwx'], correct: 0, exp: 'u désigne le propriétaire, + ajoute le droit.' },
    { stem: 'Un service en état inactive, quelle action ?', opts: ['restart', 'start', 'rien'], correct: 1, exp: 'inactive → start ; failed → restart ; active → rien.' },
    { stem: 'Que fait kill -9 ?', opts: ['arrête proprement', 'force l’arrêt immédiat', 'redémarre'], correct: 1, exp: '-9 envoie SIGKILL : arrêt forcé, sans nettoyage, en dernier recours.' },
    { stem: 'Première ligne d’un script Bash ?', opts: ['# commentaire', '#!/bin/bash', 'read'], correct: 1, exp: 'Le shebang désigne l’interpréteur.' },
    { stem: 'Que fait usermod -aG projet sam ?', opts: ['crée le groupe', 'ajoute sam au groupe projet', 'supprime sam du groupe'], correct: 1, exp: '-aG ajoute l’utilisateur aux groupes secondaires sans écraser les autres.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’examen (durée 2 h, /20). ' +
    'Fais-les <strong>sans regarder</strong> les corrigés, puis corrige-toi sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lance le chrono quand tu commences un sujet. Ne consulte le corrigé qu’à la fin. ' +
      '<strong>Réserve 15 min de relecture</strong> : champs de passwd, triplets de droits, octets d’une adresse, ' +
      'ordre des lectures du script.</p>',
      '    <p><button class="btn btn--primary" data-start>' + ic('play') + ' Démarrer le chrono</button>',
      '       <span data-clock style="font-weight:800;font-size:1.1rem;margin-left:12px">120:00</span></p>',
      '  </div>'
    ].join('\n'),
    sujets.map(sujet => '  <h2>' + sujet.title + '</h2>\n\n  <p class="lead">' + sujet.intro + '</p>\n\n' +
      sujet.items.map(itemHtml).join('\n\n')).join('\n\n'),
    '  <h2>QCM final — toutes notions</h2>',
    '  ' + qcm(mastery, { mastery: true }),
    box('method', 'Barème de maîtrise', 'compass', '    ' + bands([
      { cls: 'low', text: '&lt; 50 % — reprends les chapitres concernés avant un nouveau sujet.' },
      { cls: 'mid', text: '50–69 % — refais les exercices des chapitres faibles.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible la conversion octale et la classification d’adresses.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’examen.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits dans l’esprit du cours. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours d’administration Linux B2 : sujets chronométrés sur les fichiers, ' +
        'les droits, les comptes, le réseau et les services, avec corrigés détaillés.',
      active: 'examen',
      body
    }
  };
}

/* ======================== Exercices & projet ======================== */

function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\n'),
    '    </ol>',
    '    <details><summary>Corrections</summary><div class="sol"><pre><code>' + solutions + '</code></pre></div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; projet intégrateur</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un projet final qui ' +
    'administre un serveur complet. Les scripts sont en Bash, comme à l’atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Affiche « Administration Linux » puis la valeur lue sur l’entrée.',
      'Lit n et affiche n fois « service ok » avec le numéro de chaque ligne.',
      'Lit n puis n mots et compte ceux qui commencent par un slash (chemins absolus).',
      'Lit deux entiers et affiche leur somme et leur produit.'
    ], [
      'read -r nom',
      'echo "Administration Linux"',
      'echo "Salut, $nom"',
      '',
      'read -r n',
      'for ((i=1; i&lt;=n; i++)); do',
      '  echo "service $i ok"',
      'done',
      '',
      'read -r n',
      'compte=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r chemin',
      '  case "$chemin" in /*) compte=$((compte + 1)) ;; esac',
      'done',
      'echo "absolus : $compte"',
      '',
      'read -r a',
      'read -r b',
      'echo "somme : $((a + b))"',
      'echo "produit : $((a * b))"'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Convertit une chaîne de neuf droits (sans le type) en notation octale.',
      'Lit n lignes « login uid » et affiche les logins dont l’UID est supérieur ou égal à 1000.',
      'Lit un seuil en octets, puis n lignes « nom taille », et liste les fichiers au-dessus du seuil.',
      'Valide des adresses IPv4 : quatre octets de 0 à 255, sinon « invalide ».'
    ], [
      'read -r n',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r droits',
      '  octal=""',
      '  for debut in 0 3 6; do',
      '    v=0',
      '    [ "${droits:$debut:1}" = "r" ] && v=$((v + 4))',
      '    [ "${droits:$((debut + 1)):1}" = "w" ] && v=$((v + 2))',
      '    [ "${droits:$((debut + 2)):1}" = "x" ] && v=$((v + 1))',
      '    octal="$octal$v"',
      '  done',
      '  echo "$octal"',
      'done',
      '',
      'read -r n',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r login uid',
      '  [ "$uid" -ge 1000 ] && echo "$login"',
      'done',
      '',
      'read -r seuil',
      'read -r n',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r nom taille',
      '  [ "$taille" -gt "$seuil" ] && echo "$nom $taille"',
      'done',
      '',
      'read -r n',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r ip',
      '  ok=$(printf "%s" "$ip" | awk -F. \'{ if (NF != 4) { print "invalide"; exit } for (i = 1; i &lt;= 4; i++) { if ($i == "" || $i !~ /^[0-9]+$/ || $i + 0 > 255) { print "invalide"; exit } } print "valide" }\')',
      '  echo "$ip : $ok"',
      'done'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Suit une chaîne de liens symboliques jusqu’au fichier final et détecte les liens cassés.',
      'Simule /etc/passwd : ajoute des comptes avec UID automatique à partir de 1000, répond aux ls.',
      'Produit un rapport de parc : comptage par type, budget total et article le plus cher.',
      'Convertit une chaîne complète de dix caractères (type + droits) en ligne « nom : -drwxr-x--- ».'
    ], [
      'read -r n',
      'declare -A liens',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r cible source',
      '  liens["$source"]="$cible"',
      'done',
      'read -r depart',
      'courant="$depart"',
      'etapes=0',
      'while [ -n "${liens[$courant]:-}" ] && [ "$etapes" -lt 10 ]; do',
      '  courant="${liens[$courant]}"',
      '  etapes=$((etapes + 1))',
      'done',
      'echo "$courant"',
      '',
      'read -r n',
      'logins=()',
      'uids=()',
      'uid_suivant=1000',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r op login',
      '  if [ "$op" = "useradd" ]; then',
      '    deja=0',
      '    for l in "${logins[@]}"; do [ "$l" = "$login" ] && deja=1; done',
      '    if [ "$deja" = "1" ]; then echo "existe"',
      '    else logins+=("$login"); uids+=("$uid_suivant"); uid_suivant=$((uid_suivant + 1)); fi',
      '  elif [ "$op" = "ls" ]; then',
      '    for idx in "${!logins[@]}"; do',
      '      echo "${logins[$idx]}:x:${uids[$idx]}:${uids[$idx]}:/home/${logins[$idx]}:/bin/bash"',
      '    done',
      '  fi',
      'done',
      '',
      'read -r n',
      'total=0',
      'max_prix=-1',
      'max_nom=""',
      'declare -A effectifs',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r nom type prix',
      '  total=$((total + prix))',
      '  effectifs["$type"]=$(( ${effectifs["$type"]:-0} + 1 ))',
      '  if [ "$prix" -gt "$max_prix" ]; then max_prix="$prix"; max_nom="$nom"; fi',
      'done',
      'for type in "${!effectifs[@]}"; do echo "$type : ${effectifs[$type]}"; done',
      'echo "budget : $total"',
      'echo "max : $max_nom $max_prix"',
      '',
      'read -r n',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r nom droits',
      '  type="${droits:0:1}"',
      '  reste="${droits:1}"',
      '  echo "$nom : $type$reste"',
      'done'
    ].join('\n')),

    '  <h2>Projet intégrateur — « administration d’un serveur »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>On te confie l’inventaire d’un serveur. Le script lit <code>n</code>, puis <code>n</code> lignes au ' +
      'format <code>type nom droits</code> — type vaut <code>fichier</code> ou <code>repertoire</code>, ' +
      'droits sont neuf caractères type <code>rwxr-x---</code>. Il produit un rapport : effectifs par type, ' +
      'liste des répertoires, la notation octale de chaque entrée, et une recommandation de sécurité (une ' +
      'entrée dont les autres ont le droit d’écriture est « à risque »).</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les entrées dans l’ordre : n d’abord, puis les lignes, une par une.</li>',
      '      <li><strong>Compter</strong> par type et mémoriser les répertoires dans l’ordre d’entrée.</li>',
      '      <li><strong>Convertir</strong> les droits en octal triplet par triplet (r=4, w=2, x=1).</li>',
      '      <li><strong>Détecter</strong> le risque : le caractère 8 (autres, écriture) vaut w.</li>',
      '      <li><strong>Formater</strong> : libellés exacts, « nom : type octal », une ligne par entrée.</li>',
      '      <li><strong>Gérer</strong> le cas limite n = 0 (rapport vide mais propre).</li>',
      '    </ol>',
      '    <p>Contraintes : pas de tableaux associatifs pour les effectifs (deux variables nommées), noms explicites, bilan après la boucle.</p>'
    ].join('\n')),
    box('method', 'Grille d’auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture ordonnée et gestion de n = 0 <strong>20</strong>' },
        { cls: '', text: 'Effectifs par type corrects <strong>20</strong>' },
        { cls: '', text: 'Conversion octale triplet par triplet <strong>20</strong>' },
        { cls: '', text: 'Détection des entrées à risque <strong>20</strong>' },
        { cls: '', text: 'Lisibilité, noms, formats <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    'read -r n',
    'fichiers=0',
    'repertoires=0',
    'rep_noms=()',
    'a_risque=0',
    'for ((i=0; i&lt;n; i++)); do',
    '  read -r type nom droits',
    '  if [ "$type" = "fichier" ]; then',
    '    fichiers=$((fichiers + 1))',
    '  else',
    '    repertoires=$((repertoires + 1))',
    '    rep_noms+=("$nom")',
    '  fi',
    '  octal=""',
    '  for debut in 0 3 6; do',
    '    v=0',
    '    [ "${droits:$debut:1}" = "r" ] && v=$((v + 4))',
    '    [ "${droits:$((debut + 1)):1}" = "w" ] && v=$((v + 2))',
    '    [ "${droits:$((debut + 2)):1}" = "x" ] && v=$((v + 1))',
    '    octal="$octal$v"',
    '  done',
    '  echo "$nom : $type $octal"',
    '  if [ "${droits:8:1}" = "w" ]; then',
    '    a_risque=$((a_risque + 1))',
    '    echo "  a risque : ecriture possible pour les autres"',
    '  fi',
    'done',
    'echo "fichiers : $fichiers"',
    'echo "repertoires : $repertoires"',
    'for nom in "${rep_noms[@]}"; do echo "repertoire : $nom"; done',
    'echo "a risque : $a_risque"'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine lecture ordonnée, comptage par variables nommées, conversion octale, ' +
    'mémorisation ordonnée et détection de risque — l’essentiel des six modules en un seul rapport.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du cours historique d’administration Linux. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours d’administration Linux B2 : ' +
        'scripts Bash gradués et administration complète d’un serveur.',
      active: 'exercices',
      body
    }
  };
}

/* ======================== Assemblage ======================== */

function render(kit, course, chapterList) {
  const pages = {};
  const chaptersWithNav = chapterList.map((chapitre, index) => {
    const next = chapterList[index + 1];
    return Object.assign({}, chapitre, {
      next: next
        ? { href: 'chapitre' + next.n + '.html', label: 'Chapitre ' + next.n + ' — ' + next.title }
        : { href: '../atelier.html', label: 'Atelier de scripts' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du cours d’administration Linux B2 : ' + chapitre.toc +
        ' Théorie, exemples détaillés, exercices Bash exécutables, QCM corrigés.',
      active: 'ch' + chapitre.n,
      dataChapter: chapitre.n,
      body
    };
  }

  Object.assign(pages, index(course, chapterList));
  Object.assign(pages, sommaire(course, chapterList));
  Object.assign(pages, atelier(course));
  Object.assign(pages, cartes(course, chapterList));
  Object.assign(pages, formules(course));
  Object.assign(pages, examens(course));
  Object.assign(pages, exercices(course));

  return pages;
}

module.exports = { render };
