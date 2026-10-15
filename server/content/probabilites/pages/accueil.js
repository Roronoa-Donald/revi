/**
 * Pages accueil, sommaire et atelier du cours « Probabilités » B2.
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
    '    <span class="tag tag--time">Mathématiques appliquées</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>poser un univers, des événements et calculer une probabilité ;</li>',
      '      <li>conditionner par une information et reconnaître l’indépendance ;</li>',
      '      <li>compter par dénombrement (arrangements, combinaisons, anagrammes) ;</li>',
      '      <li>décrire une variable aléatoire par sa loi, son espérance et sa variance ;</li>',
      '      <li>reconnaître les lois usuelles : Bernoulli, binomiale, Poisson ;</li>',
      '      <li>passer au continu : uniforme, exponentielle, normale ;</li>',
      '      <li>majorer une probabilité et appliquer le théorème central limite.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Le cours historique de probabilités couvre les fondements, le dénombrement, les variables ' +
      'aléatoires discrètes et continues. Ce cours en garde le plan et y ajoute les théorèmes limites : ' +
      'chaque formule est <strong>calculée en Python</strong>, comme avec une calculatrice vérifiable.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'programme, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La formule ' +
      'appliquée ici se rejoue telle quelle dans une feuille de calcul ou un script d’analyse.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Formulaire</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de code</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; annales</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Probabilités B2 — variables aléatoires, lois et théorèmes limites | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, des axiomes de Kolmogorov au théorème central limite. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B2 ou supérieur (et un ' +
    'abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Python</strong> à écrire et à exécuter ' +
    'dans la page : ton programme est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L’<a href="atelier.html">atelier de code</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Formulaire</span><br><span class="toc__d">Toutes les formules du cours sur une page, à garder ouvert.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; annales</span><br><span class="toc__d">Exercices gradués et sujets d’examen corrigés.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de code</span><br><span class="toc__d">Écrire et exécuter du Python directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’examen, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de probabilités B2 : ' + chapterList.length +
        ' chapitres, exercices Python exécutables, flashcards, formulaire et examens blancs.',
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
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur Python derrière. Écris un calcul, exécute-le ' +
    'et lis ce qu’il affiche : c’est ici qu’une formule devient un résultat vérifié.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre programme Python tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>input()</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le programme sans quitter l’éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="python"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="8">',
      '  <script type="text/plain" data-lab-starter>from math import gcd',
      '',
      '# Zone libre : simulez, cassez, recommencez.',
      '# Rien de ce que vous écrirez ici n’est noté.',
      '#',
      '# Exemple proposé : la probabilité d’un événement sur un univers',
      '# équiprobable, affichée en fraction réduite.',
      'n = int(input())   # nombre d’issues',
      'k = 3              # cas favorables (à modifier librement)',
      '',
      'g = gcd(k, n)',
      'print(f"{k // g}/{n // g}")',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — probabilité élémentaire</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('code') + ' Python</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends une formule ' +
      'du cours (probabilité, espérance, variance, loi binomiale, Φ) et calcule-la sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le programme proposé calcule une probabilité à partir d’un entier lu en entrée. Modifie la ' +
      'formule, change le nombre de cas favorables, ajoute une boucle de simulation, ou remplace tout le ' +
      'programme par la formule que tu veux vérifier — une espérance, une variance, une loi binomiale.</p>',
      '      <p>Dans une vraie analyse, ce sera un tableur ou un script statistique : la structure — lire, ' +
      'calculer, afficher — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>8</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>3/8</pre></div>',
      '    </div>',
      '    <p class="lab__note">Déplie « Entrée du programme » et saisis la taille de l’univers avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page à la vraie analyse</h2>',
    '  <p>La simulation a une limite assumée : rien n’est envoyé ni stocké durablement. Elle a une force : ' +
    '<strong>toute la formule se vérifie sans serveur</strong>. Quand le programme calcule les bons résultats ' +
    'sur tes cas limites, le portage est mécanique : la même formule, le même arrondi.</p>',
    box('pitfall', 'Les trois erreurs que l’atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Division entière</strong> : <code>ir/2.0</code> renvoie un décimal, pas une fraction affichée.</li>',
      '      <li><strong>Entrée mal lue</strong> : comparer une chaîne issue de <code>input()</code> avec un nombre sans convertir.</li>',
      '      <li><strong>Arrondi implicite</strong> : afficher un flottant brut au lieu de le formater (<code>f"{x:.4f}"</code>).</li>',
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
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Python corrigés ' +
    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que la formule est vraiment acquise.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Fondements' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code — calculer des probabilités | ' + course.brand,
      description: 'Atelier de code du cours de probabilités B2 : éditeur dans le navigateur, ' +
        'exécution réelle du programme Python, entrée standard, console de sortie et tuteur qui explique les erreurs.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
