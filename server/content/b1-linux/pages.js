/**
 * Pages transverses du cours de Linux B1.
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
    '    <span class="tag">Licence 1 · B1</span>',
    '    <span class="tag tag--time">Système Linux</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>raconter l’histoire d’UNIX à Linux et réciter les quatre libertés de la GPL ;</li>',
      '      <li>lire l’arborescence, associer chaque répertoire standard à son rôle ;</li>',
      '      <li>installer Debian 12 et justifier un schéma de partitionnement ;</li>',
      '      <li>manipuler le terminal : navigation, liens, recherche avec find ;</li>',
      '      <li>gérer comptes et groupes en lisant /etc/passwd, /etc/shadow, /etc/group ;</li>',
      '      <li>calculer et modifier les droits (chmod, chown, chgrp) et écrire des scripts Bash.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Le support du cours déroule la théorie du système (histoire, arborescence, Debian 12), les ' +
      'commandes de base, la gestion des utilisateurs et le TP de droits d’accès. Ce cours en garde le plan ' +
      'et fait manipuler chaque mécanisme <strong>en Bash</strong> : le même langage que le terminal de la ' +
      'salle TP, exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique écrite ' +
      'ici se rejoue telle quelle dans un vrai terminal.</p>'
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
      title: 'Linux B1 — arborescence, droits, comptes et scripts | Cours Interactif',
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
      : '<br><span class="locknote">' + ic('lock') + ' B1 et plus</span>';
    return '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
      '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span>' +
      lock + '</span></a>';
  }).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire du cours</h1>',
    '  <p class="lead">' + chapterList.length + ' chapitres, de l’histoire du système jusqu’aux scripts de ' +
    'droits. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou ' +
    'supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Bash</strong> à écrire et à exécuter ' +
    'dans la page : ton script est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L’<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo de l’administrateur</span><br><span class="toc__d">Arborescence, commandes, comptes, droits et squelettes de scripts sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final de gestion d’un parc système.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’examen, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de Linux B1 : ' + chapterList.length +
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
    'exécute-le et lis ce qu’il affiche : c’est ici qu’une commande devient un programme.</p>',
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
      '# Exemple proposé : inventaire d’un répertoire simulé.',
      '# Le script lit n, puis n lignes « type nom » (fichier ou repertoire).',
      '',
      'read -r n',
      'fichiers=0',
      'repertoires=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r type nom',
      '  if [ "$type" = "fichier" ]; then',
      '    fichiers=$((fichiers + 1))',
      '  else',
      '    repertoires=$((repertoires + 1))',
      '  fi',
      'done',
      'echo "fichiers : $fichiers"',
      'echo "repertoires : $repertoires"',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — inventaire de répertoire</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Bash</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un mécanisme du système ' +
      '(inventaire, filtre find, droits chmod, comptes passwd), programme-le et teste-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé lit un inventaire et compte par type. Modifie le comptage, ajoute un total, ' +
      'ou remplace tout le script par le mécanisme que tu veux vérifier — un rapport de parc, un audit de ' +
      'comptes, une conversion octal.</p>',
      '      <p>Dans un vrai terminal, ce sera <code>ls -l</code>, <code>find</code> et <code>chmod</code> : ' +
      'la structure du script — lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>5',
      'fichier notes.txt',
      'repertoire cours',
      'fichier b1.txt',
      'repertoire tp',
      'fichier install.sh</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>fichiers : 3',
      'repertoires : 2</pre></div>',
      '    </div>',
      '    <p class="lab__note">Six lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai terminal</h2>',
    '  <p>La simulation a une limite assumée : rien n’est vraiment écrit sur disque. Elle a une force : ' +
    '<strong>toute la logique se vérifie sans machine</strong>. Quand le script affiche les bons rapports ' +
    'sur tes cas limites, le portage vers le terminal de la salle TP est mécanique : <code>read</code> lit ' +
    'la même entrée, <code>case</code> décide du même arbre, et le bilan s’affiche pareil.</p>',
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
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Le système' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — programmer le système | ' + course.brand,
      description: 'Atelier de scripts du cours de Linux B1 : éditeur dans le navigateur, exécution ' +
        'réelle du script Bash, entrée standard, console de sortie et tuteur qui explique les erreurs.',
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
      description: 'Flashcards de révision du cours de Linux B1 : notions clés des ' +
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
    '  <p class="lead">Arborescence, commandes, comptes, droits et squelettes de scripts du cours sur une ' +
    'page. À garder ouvert pendant les exercices et l’atelier.</p>',

    bloc('L’arborescence en une image', [
      '<pre><code>/          racine : origine de tout\n',
      'etc        configuration (à sauvegarder)      home   répertoires des utilisateurs\n',
      'tmp        temporaires, vidés au reboot        var    journaux des démons, spools\n',
      'root       maison du super-utilisateur         dev    fichiers des périphériques\n',
      'usr        applications, manuels, librairies   bin/sbin  binaires essentiels\n',
      'boot       noyau et démarrage                  proc   arborescence virtuelle du noyau</code></pre>',
      '<p>Tout chemin absolu commence par / ; /root n’est pas /.</p>'
    ].join('\n')),

    bloc('Commandes de base', [
      '<pre><code>où suis-je        pwd            changer      cd chemin\n',
      'lister            ls [-a cachés]  créer rep   mkdir\n',
      'créer fichier     touch           copier      cp source cible\n',
      'renommer/déplacer mv              supprimer   rm (danger : -f, -rf)\n',
      'afficher          cat, more, head, tail        manuel      man cmd\n',
      'écrire            echo "x" &gt; f (écrase) ; echo "x" &gt;&gt; f (ajoute)</code></pre>',
      '<p>Syntaxe immuable : COMMANDE OPTIONS ARGUMENTS — ls -a /home.</p>'
    ].join('\n')),

    bloc('find : chercher', [
      '<pre><code>find répertoire critères\n',
      '  -name "motif"      nom (ex. "fich*")     -type f | d   fichier | répertoire\n',
      '  -size +10M         taille                -user login   propriétaire\n',
      '  -ctime, -atime, -mtime                  -group, -perm</code></pre>',
      '<p>Ex. du TP : find /tmp -name "fich*" ; find /tmp -type f.</p>'
    ].join('\n')),

    bloc('Comptes et groupes', [
      '<pre><code>/etc/passwd  login:mot-de-passe:UID:GID:info:maison:shell\n',
      '             * = authentification impossible ; !! = désactivé\n',
      '             x/! = mot de passe dans shadow ; vide = sans mot de passe\n',
      '/etc/shadow  mots de passe chiffrés (root seul)\n',
      '/etc/group   groupe:*:GID:utilisateurs\n',
      'commandes    useradd, userdel [-r], usermod, passwd, groupadd, groupdel\n',
      'qui          whoami (moi) ; who, users, w (connectés)\n',
      'UID          root = 0 ; &lt; 1000 = système ; ≥ 1000 = humains</code></pre>',
      '<p>usermod -d /home/toto -m tutu change la maison et recopie le contenu.</p>'
    ].join('\n')),

    bloc('Droits d’accès', [
      '<pre><code>-rwxr-x---     type(-,d) + u:rwx  g:r-x  o:---\n',
      'poids          r=4  w=2  x=1  →  rwx=7  r-x=5  rw-=6  ---=0\n',
      'octal          rwxr-x--- = 750 ; rw-r--r-- = 644 ; 770 = rwxrwx---\n',
      'chmod          symbolique (u/g/o/a + - = lettres) ou octal ; -R récursif\n',
      'chown          propriétaire (utilisateur:groupe en une fois) ; chgrp groupe\n',
      'vérifier       ls -l, ls -Rl</code></pre>',
      '<p>+ ajoute, - retire, = fixe exactement : ug=rwx efface ce qui dépassait rwx.</p>'
    ].join('\n')),

    bloc('Squelette d’un script Bash', [
      '<pre><code>#!/bin/bash\n',
      'read -r n                    # premier : le compteur d’entrées\n',
      'compteur=0                   # initialisation AVANT la boucle\n',
      'for ((i=0; i&lt;n; i++)); do\n',
      '  read -r valeur             # une lecture par ligne d’entrée\n',
      '  if [ "$valeur" = "OK" ]; then compteur=$((compteur + 1)); fi\n',
      'done\n',
      'echo "compteur : $compteur"  # bilan APRÈS la boucle</code></pre>',
      '<p>Découper par champs : IFS=":" read -r login uid gid shell &lt;&lt;&lt; "$ligne".</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre / (racine) et /root (maison de root).</li>',
      '    <li>Mettre les journaux dans /etc au lieu de /var.</li>',
      '    <li>Un seul chevron &gt; qui écrase un fichier de configuration.</li>',
      '    <li>Additionner les classes au lieu de convertir triplet par triplet (750, pas 12).</li>',
      '    <li>Confondre chown (propriétaire) et chgrp (groupe).</li>',
      '    <li>Lire le seuil après n, ou oublier le \n final sur l’entrée du dernier read.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo de l’administrateur — ' + course.brand,
      description: 'Mémo du cours de Linux B1 : arborescence, commandes de base, find, comptes et groupes, ' +
        'droits d’accès et squelette de script Bash sur une page.',
      active: 'formules',
      body
    }
  };
}

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1',
      intro: 'Sujet type examen — système de fichiers, comptes et droits.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Arborescence',
          text: 'Où stocke-t-on les configurations système, les journaux des démons, les répertoires personnels, les fichiers temporaires ? Justifier pourquoi /etc est le répertoire à sauvegarder, et dire ce que devient /tmp au redémarrage.',
          sol: 'Configurations : <code>/etc</code> — le restaurer, c’est restaurer la configuration d’une machine. Journaux des démons et spools : <code>/var</code>. Répertoires personnels : <code>/home</code> (celui de root est <code>/root</code>). Fichiers temporaires : <code>/tmp</code>, <strong>effacé à chaque redémarrage</strong>.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — /etc/passwd',
          text: 'Décomposer la ligne caroline:x:1002:1000:Caroline TP:/home/caroline:/bin/bash, champ par champ. Que signifie le champ x ? Cette utilisatrice est-elle humaine ou système ?',
          sol: 'login=caroline ; mot-de-passe=x (l’empreinte est dans <code>/etc/shadow</code>) ; UID=1002 ; GID=1000 (groupe principal) ; info=Caroline TP ; maison=/home/caroline ; shell=/bin/bash.<br>x ou ! signifient « mot de passe dans shadow » ; UID 1002 ≥ 1000 : <strong>compte humain</strong>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Droits',
          text: 'Un fichier porte les droits rw-r-----. Donner sa notation octale, puis les commandes qui (a) retirent la lecture aux autres, (b) fixent exactement rwx au propriétaire, (c) lui donnent les droits 770. Que fait chacune ?',
          sol: 'rw- = 6, r-- = 4, --- = 0 → <code>640</code>.<br>(a) déjà aucune lecture aux autres : rien à faire ; sinon <code>chmod o-r f</code>.<br>(b) <code>chmod u=rwx f</code> — le = fixe la classe exactement.<br>(c) <code>chmod 770 f</code> → rwxrwx--- : tout pour u et g, rien aux autres.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Script',
          text: 'Écrire le script qui lit n puis n lignes « type nom », compte fichiers et répertoires, et affiche les deux comptes. Que se passe-t-il si l’entrée ne finit pas par un retour à la ligne ?',
          sol: 'Boucle <code>for ((i=0; i&lt;n; i++))</code> avec <code>read -r type nom</code>, compteurs initialisés avant, bilan affiché après. Sans <code>\n</code> final, le <strong>dernier read touche l’EOF et échoue</strong> : la dernière ligne peut être perdue — toujours finir l’entrée par un retour à la ligne.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté histoire du système, installation Debian et administration.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Histoire',
          text: 'Situer 1969, 1973, 1984, 1991 dans l’histoire d’UNIX et de Linux, avec un nom et un fait par date. Réciter les quatre libertés.',
          sol: '1969 : Thompson et Ritchie créent UNIX aux Bell Labs. 1973 : réécriture en C (version 4, portabilité). 1984 : Stallman lance le projet GNU. 1991 : Torvalds publie le noyau Linux sous GPL.<br>Libertés 0-1-2-3 : utiliser, étudier/adapter, redistribuer, améliorer/diffuser.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Partitionnement',
          text: 'Proposer un schéma de partitionnement pour un TP Debian 12 (disque 80 Go, RAM 4 Go) avec tailles, FS et points de montage. Justifier le swap et la séparation de /home.',
          sol: '/dev/sda1 ≈ 30 Go ext4 sur / ; /dev/sda2 ≈ 8 Go swap (≈ deux fois la RAM) ; /dev/sda3 le reste ext4 sur /home.<br>Le swap déborde la mémoire vive ; /home séparé survit à une réinstallation. Vérification : <code>df -h</code>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Administration',
          text: 'Dérouler le cycle complet : créer tpsysteme et userVoisin, créer le groupe projet2026, y rattacher les deux comptes, renommer tpsysteme en tp2026, puis supprimer userVoisin avec sa maison. Quelles vérifications après chaque étape ?',
          sol: '<code>useradd tpsysteme</code>, <code>useradd userVoisin</code> ; <code>groupadd projet2026</code> ; <code>usermod -aG projet2026 tpsysteme</code> (idem userVoisin) — vérifier dans <code>/etc/group</code>.<br><code>usermod -l tp2026 tpsysteme</code> (utilisateur délogué). <code>userdel -r userVoisin</code> — le -r supprime la maison. Contrôles : <code>/etc/passwd</code>, <code>/etc/group</code>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — find et liens',
          text: 'Dans /tmp on a créé fichier1, fichier2, testfichier1, et un lien symbolique raccourci vers fichier1. Écrire : la commande qui trouve les éléments commençant par « fich », celle qui trouve tous les fichiers, et ce que voit cat raccourci après echo "maj" >> fichier1.',
          sol: '<code>find /tmp -name "fich*"</code> → fichier1, fichier2. <code>find /tmp -type f</code> → les trois fichiers.<br>Le lien symbolique reflète sa source : après l’ajout, <code>cat raccourci</code> affiche le <strong>contenu mis à jour</strong> de fichier1 (le lien n’est pas un fichier stocké).'
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
    { stem: 'Que contient /var ?', opts: ['Les configurations', 'Les journaux des démons et les spools', 'Les binaires essentiels'], correct: 1, exp: '/var : fichiers variables — journaux, spools de mail, d’impression, de cron.' },
    { stem: 'root possède quel UID ?', opts: ['0', '1', '1000'], correct: 0, exp: 'root = UID 0 ; les comptes système sont en dessous de 1000.' },
    { stem: 'Champ !! dans /etc/passwd ?', opts: ['Mot de passe dans shadow', 'Compte désactivé', 'Pas de mot de passe'], correct: 1, exp: '!! désactive le compte ; x/! renvoient à /etc/shadow ; * interdit l’authentification.' },
    { stem: 'Que fait echo "x" >> f ?', opts: ['Écrase f', 'Ajoute x à la fin de f', 'Affiche f'], correct: 1, exp: 'Deux chevrons ajoutent (suffixent) ; un seul écrase.' },
    { stem: 'rwxr-x--- en octal ?', opts: ['754', '750', '705'], correct: 1, exp: 'rwx=7, r-x=5, ---=0 : 750, triplet par triplet.' },
    { stem: 'chmod ug=rwx : effet sur les autres classes ?', opts: ['Rien', 'u et g fixés exactement à rwx, o inchangé', 'o perd tout'], correct: 1, exp: '= fixe exactement les classes visées ; les autres classes ne bougent pas.' },
    { stem: 'Que fait chown -R tpsysteme dossier ?', opts: ['Change le propriétaire du dossier seul', 'Change le propriétaire du dossier et de tout son contenu', 'Crée tpsysteme'], correct: 1, exp: '-R rend le changement récursif : dossier, sous-dossiers, fichiers.' },
    { stem: 'groupdel échoue quand…', opts: ['le groupe a des fichiers', 'le groupe est le groupe principal d’un utilisateur', 'le groupe est vide'], correct: 1, exp: 'Impossible de supprimer un groupe qui sert de groupe principal.' },
    { stem: 'Première ligne d’un script Bash ?', opts: ['# commentaire', '#!/bin/bash', 'read'], correct: 1, exp: 'Le shebang désigne l’interpréteur.' },
    { stem: 'Sans \n final sur l’entrée, que devient le dernier read ?', opts: ['Il lit une ligne vide', 'Il touche l’EOF et échoue', 'Il attend à l’infini'], correct: 1, exp: 'read échoue à l’EOF : la dernière ligne doit finir par un retour à la ligne.' }
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
      '<strong>Réserve 15 min de relecture</strong> : champs de passwd, triplets de droits, ordre des lectures du script.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible la conversion octale et les champs de passwd.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’examen.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits dans l’esprit du support du cours. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de Linux B1 : sujets chronométrés sur le système, les comptes, ' +
        'les droits et les scripts, avec corrigés détaillés.',
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
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un projet final qui gère ' +
    'un parc système complet. Les scripts sont en Bash, comme à l’atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Affiche « Bienvenue sur Linux » puis la valeur lue sur l’entrée.',
      'Lit n et affiche n fois « ligne ok » avec le numéro de chaque ligne.',
      'Lit n puis n mots et compte ceux qui valent « root ».',
      'Lit deux entiers et affiche leur somme et leur produit.'
    ], [
      'read -r nom',
      'echo "Bienvenue sur Linux"',
      'echo "Salut, $nom"',
      '',
      'read -r n',
      'for ((i=1; i&lt;=n; i++)); do',
      '  echo "ligne $i ok"',
      'done',
      '',
      'read -r n',
      'compte=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r mot',
      '  [ "$mot" = "root" ] && compte=$((compte + 1))',
      'done',
      'echo "root : $compte"',
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
      'Simule chmod : lit « droits modif » et applique une action + ou - sur une classe u, g ou o.'
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
      '  read -r droits modif',
      '  classe="${modif:0:1}"',
      '  action="${modif:1:1}"',
      '  lettre="${modif:2:1}"',
      '  case "$classe" in',
      '    u) debut=0 ;;',
      '    g) debut=3 ;;',
      '    o) debut=6 ;;',
      '  esac',
      '  for ((k=debut; k&lt;debut + 3; k++)); do',
      '    [ "${droits:$k:1}" = "$lettre" ] || [ "$action" = "+" ] || continue',
      '    if [ "$action" = "+" ]; then droits="${droits:0:$k}$lettre${droits:$((k + 1))}"',
      '    else droits="${droits:0:$k}-${droits:$((k + 1))}"; fi',
      '  done',
      '  echo "$droits"',
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

    '  <h2>Projet intégrateur — « gestion du parc système »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>On te confie l’inventaire d’un parc. Le script lit <code>n</code>, puis <code>n</code> lignes au ' +
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
      '      <li><strong>Formater</strong> : libellés exacts, « type : K », une ligne par entrée.</li>',
      '      <li><strong>Gérer</strong> le cas limite n = 0 (rapport vide mais propre).</li>',
      '    </ol>',
      '    <p>Contraintes : pas de tableaux associatifs pour les effectifs (quatre variables nommées), noms explicites, bilan après la boucle.</p>'
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
    disclaimer(course, 'Exercices construits à partir du support « Système Linux B1 ITA &amp; ITB ». ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours de Linux B1 : scripts Bash ' +
        'gradués et gestion complète d’un parc système.',
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
      description: 'Chapitre ' + chapitre.n + ' du cours de Linux B1 : ' + chapitre.toc +
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
