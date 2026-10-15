/**
 * Pages accueil, sommaire et atelier du cours « Windows Server » B2.
 */
'use strict';

const { ic, box, crumb } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

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
    '    <span class="tag tag--time">Administration serveur</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>choisir et vérifier une stratégie de sauvegarde (complète, incrémentielle, différentielle) ;</li>',
      '      <li>concevoir un service hautement disponible (redondance, failover, supervision) ;</li>',
      '      <li>distinguer les cinq types de clusters et leur usage ;</li>',
      '      <li>organiser la maintenance préventive, corrective et évolutive d’un serveur ;</li>',
      '      <li>administrer des VM : hyperviseur, réseaux virtuels, images disque, vCPU ;</li>',
      '      <li>protéger et déployer des VM avec snapshots, clones, templates, vMotion et Veeam.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Les cinq modules historiques du cours RD WinServer sont répartis en six chapitres, du plus ' +
      'concret (la sauvegarde) au plus technique (la gestion des VM).</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> en ' +
      '<strong>PowerShell</strong> : tu écris un vrai script d’administration qui lit l’entrée standard ' +
      'et produit un résultat, puis tu le valides. L’atelier de code permet de manipuler librement.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo WinServer</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de code</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Windows Server B2 — sauvegarde, haute disponibilité et virtualisation | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, de la sauvegarde à la gestion des VM. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B2 ou supérieur (et un ' +
    'abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en PowerShell</strong> à écrire et à ' +
    'valider dans la page : ton script est corrigé par des tests que tu ne vois pas. ' +
    'L’<a href="atelier.html">atelier de code</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo WinServer</span><br><span class="toc__d">Sauvegarde, HA, clusters, maintenance, virtualisation et VM sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final d’infrastructure.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de code</span><br><span class="toc__d">Écrire et exécuter du PowerShell directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’examen, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours Windows Server B2 : ' + chapterList.length +
        ' chapitres, exercices PowerShell, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier de code</h1>',
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur PowerShell derrière. Écris un script ' +
    'd’administration, exécute-le et lis ce qu’il affiche : c’est ici qu’une règle du cours devient un ' +
    'script qui tourne.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre script PowerShell tel quel, et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que lira <code>[Console]::In.ReadLine()</code>, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l’éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="powershell"',
      '     data-height="380"',
      '     data-languages="1"',
      '     data-stdin="3&#10;10&#10;20&#10;30">',
      '  <script type="text/plain" data-lab-starter># Zone libre : explorez PowerShell, cassez, recommencez.',
      '# Rien de ce que vous écrirez ici n’est noté.',
      '#',
      '# Exemple proposé : la taille totale de plusieurs sauvegardes.',
      '$n = [int][Console]::In.ReadLine()',
      '$total = 0',
      'for ($i = 0; $i -lt $n; $i++) {',
      '    $total += [int][Console]::In.ReadLine()',
      '}',
      'Write-Output ("total : " + $total + " Go")',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — script libre</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' PowerShell</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Reprends un ' +
      'mécanisme du cours (condition, boucle, switch) et programme-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé totalise des tailles de sauvegarde lues en entrée. Modifie-le, ajoute ' +
      'une condition, un switch, remplace tout le script par le mécanisme que tu veux vérifier — un test ' +
      'de quorum, un seuil de température, un mode réseau.</p>',
      '      <p>Dans un vrai serveur, ce sera un script d’administration planifié : la structure — lire, ' +
      'traiter, afficher — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>3\n10\n20\n30</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>total : 60 Go</pre></div>',
      '    </div>',
      '    <p class="lab__note">Déplie « Entrée du programme » et saisis des valeurs avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai serveur</h2>',
    '  <p>La simulation a une limite assumée : rien n’est envoyé ni stocké durablement. Elle a une force : ' +
    '<strong>toute la logique se vérifie sans machine Windows</strong>. Quand le script affiche les bons ' +
    'résultats sur tes cas limites, le portage est mécanique : les mêmes variables, la même boucle, le ' +
    'même test.</p>',
    box('pitfall', 'Les trois erreurs que l’atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Comparaison avec ==</strong> : PowerShell compare les chaînes avec <code>-eq</code>, pas <code>==</code>.</li>',
      '      <li><strong>Boucle infinie</strong> : un <code>$i</code> jamais incrémenté fait tourner le script sans fin.</li>',
      '      <li><strong>Type d’entrée</strong> : sans <code>[int]</code>, une valeur lue reste du texte.</li>',
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
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices corrigés ' +
    'dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le mécanisme est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Sauvegarde' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables. ')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code — administrer en PowerShell | ' + course.brand,
      description: 'Atelier de code du cours Windows Server B2 : éditeur dans le navigateur, scripts ' +
        'PowerShell, entrée standard, console de sortie et tuteur qui explique les erreurs.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
