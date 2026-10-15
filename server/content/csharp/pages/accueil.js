/**
 * Pages « accueil », « sommaire » et « atelier » du cours « C# B2 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const cardsHtml = chapterList.map(chapitre => [
    '    <article class="card">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B2 et plus') + '</span>',
    '        <span class="card__num">Module ' + chapitre.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '      <p class="card__desc">' + chapitre.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        <span class="card__link">Étudier le module ' + ic('arrow-right') + '</span>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    '  <header class="hero">',
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('code') + ' Niveau B2 • POO Moderne, LINQ &amp; Programmation Asynchrone C#</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable C#</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules fondamentaux</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs complets</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>Méthodologie pédagogique</h2>',
    box('standard', 'Maîtriser le développement C# moderne et l’écosystème .NET', [
      '<p>En entreprise, coder en C# requiert bien plus que de connaître la syntaxe de base. ' +
      'Les ingénieurs logiciels doivent maîtriser le fonctionnement interne de la CLR (Common Language Runtime), ' +
      'la sémantique précise des types valeur et référence (boxing/unboxing), ' +
      'les idiomes de la programmation orientée objet moderne (records immuables, propriétés validées, pattern matching switch), ' +
      'la puissance déclarative de LINQ sur les collections génériques, ' +
      'et l’orchestration fluide des flux asynchrones avec async/await et la gestion déterministe des ressources via IDisposable. ' +
      'Chaque chapitre intègre 3 ateliers interactifs de code pour forger des compétences opérationnelles durables.</p>'
    ].join('\n')),
    '',
    disclaimer('Ce cours couvre l’intégralité du programme officiel de C# et Programmation Orientée Objet niveau B2.')
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — POO Moderne, LINQ &amp; Asynchronisme .NET',
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const items = chapterList.map(chapitre => [
    '    <li class="sommaire__item">',
    '      <div class="sommaire__badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B2 et plus') + '</div>',
    '      <div class="sommaire__num">Module ' + chapitre.n + '</div>',
    '      <div class="sommaire__content">',
    '        <h3 class="sommaire__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p class="sommaire__desc">' + chapitre.toc + '</p>',
    '        <div class="sommaire__meta">',
    '          <span>' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '          <span>' + ic('terminal') + ' 3 exercices de code</span>',
    '          <span>' + ic('check') + ' 8 questions QCM</span>',
    '        </div>',
    '      </div>',
    '    </li>'
  ].join('\n')).join('\n');

  const body = [
    crumb(course, [{ label: 'Sommaire' }]),
    '  <h1>Sommaire complet de la formation</h1>',
    '  <p class="lead">Consultez les 6 modules du programme, leur durée indicative et leurs objectifs d’ingénierie logicielle C# .NET.</p>',
    '  <ol class="sommaire__list">' + items + '</ol>',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire complet | ' + course.brand,
      description: 'Vue d’ensemble des 6 modules du cours de C# B2.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier de code ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ label: 'Atelier de code' }]),
    '  <h1>Atelier de code interactif C#</h1>',
    '  <p class="lead">Expérimentez vos algorithmes C#, validez vos manipulations de types, structures LINQ et simulations POO directement dans l’interpréteur embarqué.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="int a = 10; object o = a;">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez, expérimentez avec C# ou les algorithmes POO.\nprint("Zone libre C# B2 : pret a executer.")\n</script>',
    '  </div>',
    '',
    '  <h2>Conseils pour progresser en C#</h2>',
    box('standard', 'Bonnes pratiques d’ingénierie C# et réflexes de production', [
      '<ul>',
      '  <li><strong>Mesurez l’empreinte mémoire :</strong> Évitez les allocations inutiles sur le tas (Heap) en préférant les types valeur (struct) ou les spans pour les chemins critiques.</li>',
      '  <li><strong>Exploitez la puissance de LINQ avec discernement :</strong> LINQ apporte une lisibilité maximale, mais souvenez-vous de la deferred execution et évitez les multiples énumérations accidentelles.</li>',
      '  <li><strong>Maîtrisez async/await sans bloquer :</strong> Ne faites jamais <code>.Result</code> ou <code>.Wait()</code> sur une tâche asynchrone pour éviter tout risque d’interblocage (deadlock) de contexte de synchronisation.</li>',
      '  <li><strong>Libérez déterministement les ressources :</strong> Utilisez systématiquement le mot-clé <code>using</code> sur les objets implémentant <code>IDisposable</code>.</li>',
      '</ul>'
    ].join('\n')),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code interactif | ' + course.brand,
      description: 'Espace d’expérimentation et bac à sable de code C# interactif.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
