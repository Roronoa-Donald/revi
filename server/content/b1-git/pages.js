/**
 * Pages transverses du cours de Git B1.
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
    '    <span class="tag tag--time">Git &amp; GitHub</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>créer un dépôt, configurer ton identité et lire git status ;</li>',
      '      <li>sélectionner tes commits : add, .gitignore, reset HEAD, messages nets ;</li>',
      '      <li>annuler proprement : reset soft/mixed/hard, revert, git diff ;</li>',
      '      <li>travailler en branches et fusionner (fast-forward, --no-ff, conflits) ;</li>',
      '      <li>synchroniser avec un distant : clone, push, pull, fetch, rejets ;</li>',
      '      <li>remiser avec stash, livrer une archive et publier avec GitHub Pages.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Les supports du cours déroulent les commandes au quotidien (aide-mémoire GitHub, vade-mecum ' +
      '« Travailler avec Git au quotidien ») et cinq TP : premier dépôt, binôme sur GitHub, branches, ' +
      'publication, conflit guidé. Ce cours en garde le plan et fait manipuler chaque mécanisme ' +
      '<strong>en Bash</strong> : un script qui reproduit l\'effet exact des commandes Git, exécuté dans la page.</p>',
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
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo Git</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Git B1 — versionner, brancher, collaborer | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du premier git init jusqu\'à la publication ' +
    'GitHub Pages. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou ' +
    'supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Bash</strong> à écrire et à exécuter ' +
    'dans la page : ton script est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo Git</span><br><span class="toc__d">Les commandes du quotidien : index, annulations, branches, distant, stash.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : la gestion d\'un projet versionné en binôme.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches des TP notés, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de Git B1 : ' + chapterList.length +
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
    'exécute-le et lis ce qu\'il affiche : c\'est ici qu\'une commande Git devient un programme.</p>',
    box('objectifs', 'Comment fonctionne l\'atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre script Bash tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>read</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n\'écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l\'éditeur.</li>',
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
      '# Exemple proposé : journal de commits d’une branche.',
      '# Le script lit n, puis n lignes « operation message ».',
      '',
      'read -r n',
      'numero=0',
      'for ((i=0; i<n; i++)); do',
      '  read -r operation message',
      '  if [ "$operation" = "commit" ]; then',
      '    numero=$((numero + 1))',
      '    printf "[main %04d] %s\\n" "$numero" "$message"',
      '  elif [ "$operation" = "revert" ]; then',
      '    echo "Revert: $message"',
      '  fi',
      'done',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — journal de commits</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Bash</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un mécanisme de Git ' +
      '(index, branches, push refusé, stash), programme-le et teste-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé numérote des commits et sait annuler. Ajoute des branches, un compteur ' +
      'de push refusés, ou remplace tout le script par le mécanisme que tu veux vérifier.</p>',
      '      <p>Dans un vrai terminal, ce sera <code>git log --oneline</code> et <code>git revert</code> : ' +
      'la structure du script — lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>4',
      'commit Initialisation du projet',
      'commit Ajout du point d entrée',
      'revert Ajout du point d entrée',
      'commit Correction du message</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>[main 0001] Initialisation du projet',
      '[main 0002] Ajout du point d entrée',
      'Revert: Ajout du point d entrée',
      '[main 0003] Correction du message</pre></div>',
      '    </div>',
      '    <p class="lab__note">Cinq lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai terminal</h2>',
    '  <p>La simulation a une limite assumée : aucun dépôt réel n\'est écrit sur disque. Elle a une ' +
    'force : <strong>toute la logique se vérifie sans risque</strong> — on peut casser un dépôt simulé ' +
    'autant de fois que nécessaire. Quand le script reproduit les bons trajets entre copie, index, ' +
    'dépôt et distant, le passage aux vraies commandes est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Ordre des lectures inversé</strong> : le script lit un argument avant n, ou déstructure mal « operation message ».</li>',
      '      <li><strong>Compteur réinitialisé dans la boucle</strong> : le numéro de commit repart à 1 à chaque ligne.</li>',
      '      <li><strong>Bilan dans la boucle</strong> : l\'état des trois espaces s\'affiche à chaque opération au lieu d\'une seule fois, après.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Ce que fait l\'atelier, côté technique', 'terminal', [
      '    <ul>',
      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service d\'exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n\'est possible.</li>',
      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',
      '      <li>Le nombre d\'exécutions est limité par jour, pour tout le monde. L\'atelier n\'exécute donc que sur un clic.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Bash corrigés ' +
    'automatiquement dans la page. Une fois l\'atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le mécanisme Git est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Premier dépôt' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler Git | ' + course.brand,
      description: 'Atelier de scripts du cours de Git B1 : éditeur dans le navigateur, exécution ' +
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo Git' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Git B1 : notions clés des ' +
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
    '  <h1>Mémo Git</h1>',
    '  <p class="lead">Les commandes du cours sur une page, dans l\'ordre des trajets. À garder ouvert ' +
    'pendant les exercices et l\'atelier.</p>',

    bloc('Les trois espaces', [
      '<pre><code>copie de travail   fichiers du développeur\n',
      'index              zone de transit (ce qui partira au commit)\n',
      'dépôt local (HEAD) historique des versions\n',
      '\n',
      'copie ──add──→ index ──commit──→ dépôt\n',
      'copie ←──reset HEAD── index ←──checkout── dépôt</code></pre>',
      '<p>status observe sans rien déplacer ; diff compare deux espaces.</p>'
    ].join('\n')),

    bloc('Créer et configurer', [
      '<pre><code>git init [projet]        crée .git (le dépôt local)\n',
      'git clone url            télécharge projet + historique + origin\n',
      'git config --global user.name "Nom"\n',
      'git config --global user.email "mail"   (ou sans --global : par projet)\n',
      'git config --list        vérifier</code></pre>',
      '<p>Sans identité, le commit est refusé ou signé faux : configurer avant tout.</p>'
    ].join('\n')),

    bloc('Index et commits', [
      '<pre><code>git add fichier | dossier | .    dépose dans l\'index\n',
      'git add -A    nouveaux + modifiés + détruits\n',
      'git add -u    modifiés + détruits des fichiers suivis seulement\n',
      'git reset HEAD fichier    sort de l\'index (reste suivi)\n',
      'git rm fichier            copie + index | --cached : index seul\n',
      'git commit -m "Message"   archive l\'index (SHA-1)\n',
      'git commit --amend -m     réécrit le dernier commit (avant push)</code></pre>',
      '<p>Le commit archive l\'état de l\'index au moment du add : modifier après = re-add.</p>'
    ].join('\n')),

    bloc('.gitignore', [
      '<pre><code>fichier      un nom exact\n',
      'dossier/     un dossier entier\n',
      '*.pyc        un suffixe (* = tout ce qui finit par)\n',
      '\n',
      '__pycache__/   *.pyc   venv/          (projet Python du TP1)\n',
      '\n',
      'git ls-files --other --ignored --exclude-standard   auditer les exclus\n',
      'git rm --cached fichier    dé-suivre un fichier déjà commité</code></pre>',
      '<p>Le .gitignore ne s\'applique qu\'aux fichiers pas encore suivis.</p>'
    ].join('\n')),

    bloc('Historique et annulations', [
      '<pre><code>git log --oneline [--graph --all]      l\'historique lisible\n',
      'git show SHA                le contenu d\'un commit\n',
      'git diff [--cached | --staged]        copie↔index | index↔dépôt\n',
      'git diff brancheA..brancheB           deux branches\n',
      '\n',
      'git reset --soft HEAD~n    commits remontés dans l\'index\n',
      'git reset --mixed HEAD~n   (défaut) index vidé, copie gardée\n',
      'git reset --hard HEAD~n    tout effacé après le commit cible\n',
      'git revert HEAD^           annule EN AJOUTANT un commit (partagé)</code></pre>',
      '<p>reset réécrit le passé (local) ; revert écrit l\'inverse (partagé).</p>'
    ].join('\n')),

    bloc('Branches et fusion', [
      '<pre><code>git branch nom             crée | -v : locales | -r : distantes | -d : supprime\n',
      'git checkout nom           bascule | -b nom : crée + bascule | -f : force (perd)\n',
      'git checkout main &amp;&amp; git merge feature    fusionne dans main\n',
      'git merge --abort          annule un merge en cours\n',
      'fast-forward               avance le pointeur, plus de trace de la branche\n',
      '--no-ff                    crée un commit de fusion (branche visible)\n',
      '&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD ... ======= ... &gt;&gt;&gt;&gt;&gt;&gt;&gt; branche    marqueurs de conflit</code></pre>',
      '<p>Conflit = même zone, deux versions : lire, décider, add, commit.</p>'
    ].join('\n')),

    bloc('Distant, stash, archive', [
      '<pre><code>git remote add origin url    lie le distant | -v : vérifie\n',
      'git push [-u origin main]    envoie | rejeté = pull d\'abord\n',
      'git fetch origin             actualise les références, sans fusionner\n',
      'git pull                     fetch + merge\n',
      '\n',
      'git stash | pop | list | drop    remise / reprise / pile / destruction\n',
      '\n',
      'git archive --format=tar --prefix=d/ HEAD | gzip &gt; v1.tar.gz\n',
      'GitHub Pages : Settings → Pages → branch main, /root</code></pre>',
      '<p>Rejet et conflit sont des protections : on les résout, jamais on ne les contourne.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Committer sans user.name/user.email configurés.</li>',
      '    <li>Croire que .gitignore dé-suivra un fichier déjà commité.</li>',
      '    <li>reset --hard sur un dépôt partagé (ou sans stash au préalable).</li>',
      '    <li>Amend après push : le SHA change pour tout le monde.</li>',
      '    <li>Forcer un push au lieu de pull et résoudre.</li>',
      '    <li>Committer des marqueurs de conflit &lt;&lt;&lt;&lt;&lt;&lt;&lt; par add aveugle.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo Git — ' + course.brand,
      description: 'Mémo du cours de Git B1 : les trois espaces, création, index et commits, gitignore, ' +
        'annulations, branches, distant, stash et archive sur une page.',
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
      intro: 'Sujet type TP noté — premier dépôt, index, historique.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Premier dépôt',
          text: 'Écrire la séquence complète du TP1 : créer le projet gestion_taches, initialiser le dépôt, configurer l\'identité globalement, vérifier, ajouter les fichiers et réaliser le premier commit. Que se passe-t-il si l\'identité n\'est pas posée ?',
          sol: 'mkdir gestion_taches ; cd gestion_taches ; touch main.py taches.py utils.py README.md ; git init ; git config --global user.name "Nom" ; git config --global user.email "mail" ; git config --list ; git status ; git add . ; git commit -m "Initialisation du projet gestion_taches".<br>Sans identité : le commit peut être <strong>refusé</strong> ou signé d\'une identité incorrecte.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Index',
          text: 'Vous avez modifié main.py et créé debug.log, venv/ et __pycache__. Écrire le .gitignore adapté et la séquence qui n\'indexe que les modifications de fichiers suivis. Quelle option de git add fait cela ?',
          sol: '.gitignore : <code>__pycache__/</code>, <code>*.pyc</code>, <code>venv/</code> (debug.log peut s\'ajouter : <code>*.log</code>).<br>Sélection des suivis seuls : <code>git add -u</code> — il indexe modifications et destructions des fichiers déjà suivis, sans ramasser les nouveaux.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Annulations',
          text: 'Trois commits ont été faits localement (a1, a2, a3). Décrire l\'état des trois espaces après git reset --soft HEAD~1, puis --mixed, puis --hard. Quel choix si les commits ont été poussés ?',
          sol: '--soft : HEAD sur a2, index contient les modifications de a3, copie intacte. --mixed (défaut) : HEAD sur a2, index vidé, les modifications restent dans la copie. --hard : HEAD sur a2, index vide, copie effacée.<br>Commits poussés → <code>git revert</code> : il ajoute un commit d\'annulation sans réécrire l\'historique partagé.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Lecture',
          text: 'Expliquer la différence entre git diff, git diff --cached et git status. Que ne montre jamais git diff ?',
          sol: '<code>git diff</code> : copie de travail ↔ index. <code>--cached</code> : index ↔ dépôt local (ce qui partira au prochain commit). <code>status</code> : l\'état des lieux, catégories comprises.<br>diff ne montre jamais les fichiers <strong>non suivis</strong> — ils restent dans status.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté branches, collaboration et publication.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Branches',
          text: 'Dérouler le workflow du TP3 : créer feature-ajout-tache depuis main, deux commits atomiques, fusion, envoi, analyse, suppression de la branche. Que constate-t-on sur git log --graph si la fusion est fast-forward ?',
          sol: 'git checkout main ; git checkout -b feature-ajout-tache ; deux couples add+commit ; git checkout main ; git merge feature-ajout-tache ; git push origin main ; git log --oneline --graph --all ; git branch -d feature-ajout-tache.<br>En fast-forward, l\'historique reste droit : <strong>plus aucune trace de la branche</strong> (contre un commit de fusion avec --no-ff).'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Conflit',
          text: 'Deux branches modifient la même ligne de main.py. Décrire les marqueurs de conflit, identifier chaque section, et donner la séquence de validation après résolution.',
          sol: '« &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD » ouvre la version de la branche courante, « ======= » sépare, « &gt;&gt;&gt;&gt;&gt;&gt;&gt; branche » ferme la version fusionnée.<br>Résolution : éditer (garder/combiner), plus aucun marqueur, puis <code>git add main.py</code> et <code>git commit -m "Résolution du conflit"</code>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Distant',
          text: 'Rejouer le TP2 : l\'étudiant A pousse, B committe puis push. Que se passe-t-il et pourquoi ? Quelle séquence débloque la situation ? Que vaut un push --force ici ?',
          sol: 'Le push de B est <strong>rejeté</strong> : le distant contient des commits (de A) que B n\'a pas. Déblocage : <code>git pull origin main</code> (fetch + merge, conflit possible), résolution, puis push.<br>--force écraserait le travail de A : à proscrire sur un dépôt partagé.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Publication',
          text: 'Décrire les étapes du TP4 pour publier le projet : lien distant, README structuré, page d\'accueil, activation GitHub Pages. Où s\'active la page et quelle URL en résulte ?',
          sol: 'remote add origin + push -u origin main ; README au plan # Titre / ## Description / ## Fonctionnalités / ## Installation / auteur ; index.html minimal ; <code>Settings → Pages → Source : main, /root</code>.<br>URL : <code>https://&lt;user&gt;.github.io/gestion_taches/</code>.'
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
    { stem: 'git init crée…', opts: ['un dépôt distant', 'le sous-dossier .git', 'un README'], correct: 1, exp: 'Tout le dépôt local vit dans .git.' },
    { stem: 'git add -u sélectionne…', opts: ['les nouveaux fichiers', 'les modifiés/détruits des suivis', 'tout le dossier'], correct: 1, exp: '-u ignore les nouveaux : uniquement modifications et destructions des fichiers suivis.' },
    { stem: 'Un fichier suivi ajouté au .gitignore…', opts: ['sort du suivi', 'reste suivi', 'est supprimé'], correct: 1, exp: 'Il faut git rm --cached pour dé-suivre.' },
    { stem: 'reset --hard fait quoi de la copie ?', opts: ['La garde', 'L\'efface jusqu\'au commit cible', 'La remise'], correct: 1, exp: 'hard aligne les trois espaces : modifications locales perdues.' },
    { stem: 'Sur un dépôt partagé, annuler avec…', opts: ['reset --hard', 'revert', 'rm --cached'], correct: 1, exp: 'revert ajoute un commit d\'annulation : l\'historique partagé reste cohérent.' },
    { stem: 'En fast-forward, la branche fusionnée…', opts: ['reste visible', 'n\'a plus de trace', 'devient une étiquette'], correct: 1, exp: 'Les commits s\'enchaînent comme sur main ; --no-ff grave un commit de fusion.' },
    { stem: 'Un push rejeté signifie…', opts: ['réseau coupé', 'le distant a des commits inconnus du local', 'message trop long'], correct: 1, exp: 'Pull (fetch + merge) d\'abord, puis repousser.' },
    { stem: 'git fetch…', opts: ['fusionne le distant', 'actualise les références sans fusionner', 'pousse'], correct: 1, exp: 'fetch écoute ; pull = fetch + merge.' },
    { stem: 'git stash puis git stash pop : la copie…', opts: ['perd tout', 'retrouve ses modifications', 'devient commitée'], correct: 1, exp: 'stash empile, pop dépile : rien ne se perd.' },
    { stem: 'GitHub Pages s\'active dans…', opts: ['le README', 'Settings → Pages', '.gitignore'], correct: 1, exp: 'Source : branch main, dossier /root → URL user.github.io/depot.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d\'examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l\'esprit des TP notés (durée 2 h, /20). ' +
    'Fais-les <strong>sans regarder</strong> les corrigés, puis corrige-toi sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d\'examen — 2 h</div>',
      '    <p>Lance le chrono quand tu commences un sujet. Ne consulte le corrigé qu\'à la fin. ' +
      '<strong>Réserve 15 min de relecture</strong> : trajets entre les trois espaces, ordre des commandes, messages de commit.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible reset/revert et fast-forward.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant le TP noté.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après l\'aide-mémoire GitHub et les TP du module. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de Git B1 : sujets chronométrés sur le dépôt, l\'index, ' +
        'l\'historique, les branches et la collaboration, avec corrigés détaillés.',
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
    'gère la collaboration complète d\'un dépôt versionné. Les scripts sont en Bash, comme à l\'atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lit n puis n commandes « commande » et affiche ok pour chaque commande connue (init, add, commit, push, pull).',
      'Lit n commits et affiche le nombre total, la tête HEAD (dernier numéro) et le premier numéro.',
      'Lit n opérations add/commit et affiche combien de fichiers sont restés en index à la fin.',
      'Lit un SHA abrégé (comme a1b2) et affiche sa longueur et son premier caractère.'
    ], [
      'read -r n',
      'connues="init add commit push pull"',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r commande',
      '  case "$connues" in',
      '    *"$commande"*) echo "ok" ;;',
      '    *) echo "inconnue" ;;',
      '  esac',
      'done',
      '',
      'read -r n',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r mot',
      'done',
      'echo "commits : $n"',
      'echo "HEAD : a$n"',
      'echo "premier : a1"',
      '',
      'read -r n',
      'index=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r op',
      '  if [ "$op" = "add" ]; then index=$((index + 1)); fi',
      '  if [ "$op" = "commit" ]; then index=0; fi',
      'done',
      'echo "en index : $index"',
      '',
      'read -r sha',
      'echo "longueur : ${#sha}"',
      'echo "premier : ${sha:0:1}"'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Simule git stash : lit n opérations modifie/stash/pop et affiche l\'état final (copie, remises).',
      'Valide des messages de commit : majuscule, 50 caractères max, sans point final.',
      'Lit n fichiers « nom taille » et affiche les trois plus gros dans l\'ordre (tri simple).',
      'Simule un .gitignore à un motif (*.ext) : refuse les adds filtrés, liste l\'index.'
    ], [
      'read -r n',
      'copie=0',
      'remises=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r op',
      '  if [ "$op" = "modifie" ]; then copie=$((copie + 1)); fi',
      '  if [ "$op" = "stash" ]; then remises=$((remises + 1)); copie=0; fi',
      '  if [ "$op" = "pop" ] &amp;&amp; [ "$remises" -gt 0 ]; then remises=$((remises - 1)); fi',
      'done',
      'echo "copie : $copie"',
      'echo "remises : $remises"',
      '',
      'read -r n',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r message',
      '  premiere="${message:0:1}"',
      '  if [ "$premiere" != "${premiere^^}" ]; then echo "majuscule"',
      '  elif [ "${#message}" -gt 50 ]; then echo "longueur"',
      '  elif [ "${message: -1}" = "." ]; then echo "point final"',
      '  else echo "ok"; fi',
      'done',
      '',
      'read -r n',
      'noms=()',
      'tailles=()',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r nom taille',
      '  noms+=("$nom")',
      '  tailles+=("$taille")',
      'done',
      'for ((i=0; i&lt;3 &amp;&amp; i&lt;n; i++)); do',
      '  max=-1',
      '  idx=-1',
      '  for k in "${!tailles[@]}"; do',
      '    [ "${tailles[$k]}" -gt "$max" ] &amp;&amp; { max="${tailles[$k]}"; idx=$k; }',
      '  done',
      '  echo "${noms[$idx]} ${tailles[$idx]}"',
      '  unset "noms[$idx]"',
      '  unset "tailles[$idx]"',
      '  noms=("${noms[@]}")',
      '  tailles=("${tailles[@]}")',
      'done',
      '',
      'read -r motif',
      'read -r n',
      'suffixe="${motif:1}"',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r op fichier',
      '  if [ "$op" = "add" ]; then',
      '    if [ "${fichier: -${#suffixe}}" = "$suffixe" ]; then echo "ignoré"',
      '    else index+=("$fichier"); fi',
      '  else for f in "${index[@]}"; do echo "$f"; done; fi',
      'done'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Simule deux branches avec commits parallèles puis une fusion : affiche l\'historique combiné.',
      'Décompose pull : lit les opérations tierce/fetch/merge et affiche local, origin/main et copie.',
      'Décode un conflit : lit un fichier avec marqueurs et affiche les deux versions côte à côte.',
      'Compte les trajets : pour n opérations, affiche combien de fichiers ont traversé copie→index→dépôt.'
    ], [
      'read -r n',
      'main=()',
      'feature=()',
      'num_main=0',
      'num_feature=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r branche message',
      '  if [ "$branche" = "main" ]; then num_main=$((num_main + 1)); main+=("m$num_main $message")',
      '  else num_feature=$((num_feature + 1)); feature+=("f$num_feature $message"); fi',
      'done',
      'echo "--- main ---"',
      'for ligne in "${main[@]}"; do echo "$ligne"; done',
      'echo "--- feature ---"',
      'for ligne in "${feature[@]}"; do echo "$ligne"; done',
      '',
      'read -r n',
      'local=0',
      'origin=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r op',
      '  if [ "$op" = "commit" ]; then local=$((local + 1)); fi',
      '  if [ "$op" = "tierce" ]; then origin=$((origin + 1)); fi',
      '  if [ "$op" = "fetch" ]; then echo "fetch : origin/main = $origin (copie inchangée)"; fi',
      '  if [ "$op" = "merge" ] &amp;&amp; [ "$origin" -gt "$local" ]; then local=$origin; echo "merge : avance à $local"; fi',
      'done',
      'echo "local : $local"',
      'echo "origin/main : $origin"',
      '',
      'read -r n',
      'dans_conflit=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r ligne',
      '  case "$ligne" in',
      '    "&lt;&lt;&lt;&lt;&lt;&lt;&lt;"*) dans_conflit=1 ;;',
      '    "=======") echo "-- vs --" ;;',
      '    "&gt;&gt;&gt;&gt;&gt;&gt;&gt;"*) dans_conflit=0 ;;',
      '    *) [ "$dans_conflit" = "1" ] &amp;&amp; echo "$ligne" ;;',
      '  esac',
      'done',
      '',
      'read -r n',
      'trajet_complet=0',
      'etape=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r op',
      '  if [ "$op" = "add" ]; then etape=1; fi',
      '  if [ "$op" = "commit" ] &amp;&amp; [ "$etape" = "1" ]; then trajet_complet=$((trajet_complet + 1)); etape=0; fi',
      'done',
      'echo "copie→index→dépôt : $trajet_complet"'
    ].join('\n')),

    '  <h2>Projet intégrateur — « dépôt de binôme »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>Deux développeurs travaillent sur le projet gestion_taches. Le script lit <code>n</code> ' +
      'opérations au format <code>acteur operation [argument]</code> — acteur vaut A ou B, operation ' +
      'parmi <code>commit</code> (message), <code>push</code>, <code>pull</code>. Le dépôt distant rejette ' +
      'un push si l\'autre acteur a poussé depuis le dernier pull de cet acteur. Le rapport final affiche ' +
      'le nombre de push réussis, refusés, les conflits détectés (push refusé suivi direct d\'un push ' +
      'sans pull entre les deux) et l\'état final des deux copies.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les opérations dans l\'ordre, acteur par acteur, sans mélanger.</li>',
      '      <li><strong>Suivre</strong> par acteur : commits locaux en attente et fraîcheur (pull vu).</li>',
      '      <li><strong>Arbitrer</strong> : le distant avance à chaque push réussi.</li>',
      '      <li><strong>Compter</strong> : pushs réussis, rejetés, pulls effectués.</li>',
      '      <li><strong>Recommander</strong> : « pull recommandé pour X » si X tente un push avec un distant en avance.</li>',
      '      <li><strong>Formater</strong> : libellés exacts, un compte par ligne.</li>',
      '    </ol>',
      '    <p>Contraintes : deux structures parallèles (une par acteur), pas de variable globale de copie, bilan après la boucle.</p>'
    ].join('\n')),
    box('method', 'Grille d\'auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture et séparation par acteur <strong>20</strong>' },
        { cls: '', text: 'Suivi des états par acteur correct <strong>20</strong>' },
        { cls: '', text: 'Arbitrage du distant conforme <strong>20</strong>' },
        { cls: '', text: 'Comptes et recommandations exacts <strong>20</strong>' },
        { cls: '', text: 'Lisibilité, noms, formats <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    'read -r n',
    'commits_a=0 ; commits_b=0',
    'frais_a=1 ; frais_b=1',
    'distant=0',
    'ok_push=0 ; ko_push=0 ; pulls=0',
    'for ((i=0; i&lt;n; i++)); do',
    '  read -r acteur operation reste',
    '  if [ "$operation" = "commit" ]; then',
    '    if [ "$acteur" = "A" ]; then commits_a=$((commits_a + 1)); else commits_b=$((commits_b + 1)); fi',
    '  elif [ "$operation" = "pull" ]; then',
    '    if [ "$acteur" = "A" ]; then frais_a=1 ; [ "$distant" -gt "$commits_a" ] &amp;&amp; commits_a=$distant',
    '    else frais_b=1 ; [ "$distant" -gt "$commits_b" ] &amp;&amp; commits_b=$distant; fi',
    '    pulls=$((pulls + 1))',
    '  elif [ "$operation" = "push" ]; then',
    '    if [ "$acteur" = "A" ]; then locaux=$commits_a ; frais=$frais_a',
    '    else locaux=$commits_b ; frais=$frais_b; fi',
    '    if [ "$locaux" -gt "$distant" ] &amp;&amp; [ "$frais" = "1" ]; then',
    '      distant=$locaux',
    '      if [ "$acteur" = "A" ]; then frais_b=0; else frais_a=0; fi',
    '      ok_push=$((ok_push + 1))',
    '    else',
    '      ko_push=$((ko_push + 1))',
    '      echo "pull recommandé pour $acteur"',
    '    fi',
    '  fi',
    'done',
    'echo "push réussis : $ok_push"',
    'echo "push refusés : $ko_push"',
    'echo "pulls : $pulls"',
    'echo "commits A : $commits_a"',
    'echo "commits B : $commits_b"',
    'echo "distant : $distant"'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine lecture par acteur, suivi d\'états parallèles, arbitrage du distant et ' +
    'rapport final — les chapitres 1, 2 et 5 en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits d\'après l\'aide-mémoire GitHub, le vade-mecum ENSICAEN et les TP du module. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours de Git B1 : scripts Bash ' +
        'gradués et gestion complète d\'un dépôt de binôme.',
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
      description: 'Chapitre ' + chapitre.n + ' du cours de Git B1 : ' + chapitre.toc +
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
