/**
 * Pages accueil, sommaire et atelier du cours « Java » B2.
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
    '    <span class="tag tag--time">Programmation objet</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>écrire un programme Java complet (classe, main, types, Scanner) ;</li>',
      '      <li>contrôler le flux avec conditions, switch et boucles ;</li>',
      '      <li>stocker et parcourir des tableaux et des ArrayList ;</li>',
      '      <li>modéliser avec des classes, l’encapsulation et toString ;</li>',
      '      <li>utiliser List, Set et Map, ainsi que l’héritage et le polymorphisme ;</li>',
      '      <li>rendre un programme robuste avec les exceptions.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Le cours historique de Java couvre douze modules, de la syntaxe aux exceptions. Ce cours les ' +
      'condense en six chapitres et fait manipuler chaque mécanisme <strong>en Java</strong> : un ' +
      '<code>public class Main</code> compilé et exécuté, comme sur une machine réelle.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'programme, il est réellement compilé et exécuté, puis corrigé par des tests que tu ne vois pas. ' +
      'L’exercice peut se rejouer tel quel dans un projet Java.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo Java</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de code</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Java B2 — du langage aux objets, collections et exceptions | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, de la syntaxe aux exceptions. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B2 ou supérieur (et un ' +
    'abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Java</strong> à écrire et à exécuter ' +
    'dans la page : ton programme est réellement compilé, lancé, puis corrigé par des tests que tu ne vois ' +
    'pas. L’<a href="atelier.html">atelier de code</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo Java</span><br><span class="toc__d">Syntaxe, classes, collections et exceptions sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Programmes gradués et projet final de gestion d’étudiants.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de code</span><br><span class="toc__d">Écrire et exécuter du Java directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’examen, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de Java B2 : ' + chapterList.length +
        ' chapitres, exercices Java exécutables, flashcards, mémo et examens blancs.',
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
    '  <p class="lead">Un éditeur dans la page, un vrai compilateur Java derrière. Écris une classe, exécute-la ' +
    'et lis ce qu’elle affiche : c’est ici qu’une règle du langage devient un programme qui tourne.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait compiler et tourner votre programme Java tel quel, et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>Scanner</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le programme sans quitter l’éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="java"',
      '     data-height="380"',
      '     data-languages="1"',
      '     data-stdin="6">',
      '  <script type="text/plain" data-lab-starter>import java.util.Scanner;',
      '',
      '// Zone libre : compilez, cassez, recommencez.',
      '// Rien de ce que vous écrirez ici n’est noté.',
      '//',
      '// Exemple proposé : le carré d’un entier lu en entrée.',
      'public class Main {',
      '    public static void main(String[] args) {',
      '        Scanner sc = new Scanner(System.in);',
      '        int n = sc.nextInt();',
      '        System.out.println(n * n);',
      '    }',
      '}',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — calcul libre</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('code') + ' Java</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Reprends un ' +
      'mécanisme du cours (boucle, tableau, classe, exception) et programme-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le programme proposé calcule le carré d’un entier lu en entrée. Modifie-le, ajoute une boucle, ' +
      'une méthode, une classe personnalisée, ou remplace tout le programme par le mécanisme que tu veux ' +
      'vérifier — une ArrayList triée, un héritage, un try/catch.</p>',
      '      <p>Dans un vrai projet, ce sera une classe métier, un service, un point d’entrée : la structure ' +
      'du programme — lire, traiter, afficher — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>6</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>36</pre></div>',
      '    </div>',
      '    <p class="lab__note">Déplie « Entrée du programme » et saisis un entier avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai projet</h2>',
    '  <p>La simulation a une limite assumée : rien n’est envoyé ni stocké durablement. Elle a une force : ' +
    '<strong>toute la logique se vérifie sans projet local</strong>. Quand le programme affiche les bons ' +
    'résultats sur tes cas limites, le portage est mécanique : la même classe, la même boucle, la même ' +
    'exception.</p>',
    box('pitfall', 'Les trois erreurs que l’atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Point-virgule oublié</strong> : la compilation s’arrête avant même l’exécution.</li>',
      '      <li><strong>Division entière</strong> : <code>7 / 2</code> donne 3, pas 3.5.</li>',
      '      <li><strong>Exception non attrapée</strong> : le programme s’arrête net sur une trace.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Ce que fait l’atelier, côté technique', 'terminal', [
      '    <ul>',
      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service de compilation et d’exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n’est possible.</li>',
      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',
      '      <li>Le nombre d’exécutions est limité par jour, pour tout le monde. L’atelier n’exécute donc que sur un clic.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Java corrigés ' +
    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le mécanisme est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Bases du langage' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code — programmer en Java | ' + course.brand,
      description: 'Atelier de code du cours de Java B2 : éditeur dans le navigateur, compilation et ' +
        'exécution réelles du programme Java, entrée standard, console de sortie et tuteur qui explique les erreurs.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
