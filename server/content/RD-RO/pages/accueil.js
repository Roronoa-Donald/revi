/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Recherche Opérationnelle » B2.
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('chart') + ' Niveau B2 • Algorithmes d’Optimisation &amp; Décision</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Python</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules de référence</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs complets</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>Méthodologie pédagogique</h2>',
    box('standard', 'L’excellence mathématique adossée à l’algorithmique moderne', [
      '<p>La Recherche Opérationnelle ne s’apprend pas par cœur : elle se pratique. ' +
      'Ce cours complet niveau B2 conjugue rigueur formelle (démonstrations, dualité, conditions KKT) ' +
      'et maîtrise opérationnelle des algorithmes numériques. ' +
      'Chaque chapitre intègre 3 ateliers de code Python interactifs directement testés et corrigés dans votre navigateur.</p>'
    ].join('\n')),
    '',
    disclaimer('Ce cours couvre le programme officiel de Recherche Opérationnelle de deuxième année de cycle ingénieur.')
  ].join('\n\n');

  return {
    'index.html': {
      title: course.title,
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const rows = chapterList.map(chapitre => [
    '    <li class="summary-item">',
    '      <div class="summary-item__num">' + chapitre.n + '</div>',
    '      <div class="summary-item__content">',
    '        <h3><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p>' + chapitre.toc + '</p>',
    '      </div>',
    '      <div class="summary-item__meta">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B2') + '</span>',
    '        <span class="tag tag--time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '      </div>',
    '    </li>'
  ].join('\n')).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire complet du cours</h1>',
    '  <p class="lead">Six modules d’enseignement approfondis pour maîtriser la programmation linéaire, l’algorithme du simplexe, la dualité, les matrices de transport et l’ordonnancement de projet.</p>',
    '  <ul class="summary-list">\n' + rows + '\n  </ul>',
    '',
    '  <h2>Ressources transversales</h2>',
    '  <div class="grid">',
    '    <div class="card">',
    '      <h3><a href="chapitres/cartes.html">' + ic('cards') + ' Cartes de révision</a></h3>',
    '      <p>Flashcards interactives pour mémoriser les définitions formelles, théorèmes et règles de pivotage.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h3><a href="chapitres/formules.html">' + ic('file') + ' Mémo des formules de RO</a></h3>',
    '      <p>Synthèse condensée de toutes les équations, formes canoniques/standards et règles du ratio minimum.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h3><a href="chapitres/examens.html">' + ic('target') + ' Examens blancs</a></h3>',
    '      <p>Deux sujets d’examen de 20 points avec barème détaillé et corrigés pas à pas.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h3><a href="chapitres/exercices.html">' + ic('clipboard') + ' Exercices &amp; Projet</a></h3>',
    '      <p>Ateliers d’application approfondis et grand projet de programmation d’un solveur Simplexe complet.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer le module 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire détaillé des six chapitres de Recherche Opérationnelle B2 : modélisation, simplexe, dualité, transport et PERT.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier de code ======================== */

function atelier(course) {
  const starter = [
    'import sys',
    '',
    '# Zone libre : résolvez, prototypez des algorithmes d’optimisation (Simplexe, Transport, PERT).',
    '# Rien de ce que vous écrirez ici n’est noté.',
    '#',
    '# Exemple proposé : évaluation de sommets pour un problème MAX Z = 3*x1 + 5*x2',
    'ligne = sys.stdin.readline().strip()',
    'c1, c2 = (3.0, 5.0)',
    'sommets = [(0, 0), (8, 0), (0, 5.5), (7, 2), (9, 1)]',
    '',
    '# Contraintes : 2*x1 + 1*x2 <= 16 et 1*x1 + 2*x2 <= 11',
    'optimum = None',
    'max_z = -float("inf")',
    '',
    'for x1, x2 in sommets:',
    '    if (2*x1 + 1*x2 <= 16.0001) and (1*x1 + 2*x2 <= 11.0001):',
    '        z = c1 * x1 + c2 * x2',
    '        if z > max_z:',
    '            max_z = z',
    '            optimum = (x1, x2)',
    '',
    'print(f"SOMMET_OPTIMAL: {optimum} PROFIT_MAX={max_z:.1f}")'
  ].join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Atelier de code' }]),
    '  <h1>Atelier interactif de Recherche Opérationnelle</h1>',
    '  <p class="lead">Expérimentez librement vos algorithmes d’optimisation en Python. ' +
    'Testez un solveur Simplexe, calculez des potentiels de transport ou simulez le chemin critique d’un projet PERT.</p>',

    box('info', 'Console de calcul Python 3', [
      '<p>Cet atelier exécute votre code Python dans un environnement sandbox sécurisé. ' +
      'Vous pouvez injecter des données sur l’entrée standard (stdin) et inspecter la sortie standard et les erreurs d’exécution.</p>'
    ].join('\n')),

    '  <h2>Zone libre</h2>',
    '  <div class="lab" data-lab data-language="python" data-height="360" data-languages="1" data-stdin="TEST-LIBRE">',
    '    <script type="text/plain" data-lab-starter>' + starter + '</script>',
    '    <div class="lab__head">',
    '      <h3 class="lab__title">Zone libre : solveur &amp; simulateur d’optimisation</h3>',
    '      <div class="lab__meta"><span class="lab__lang">' + ic('terminal') + ' Python 3</span></div>',
    '    </div>',
    '    <div class="lab__body">',
    '      <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans contrainte sur des modèles de programmation linéaire.</p>',
    '      <div class="lab__brief"><p>Le code d’exemple teste la faisabilité des sommets d’un polyèdre et calcule le sommet maximisant la fonction objectif. Cliquez sur <strong>Exécuter</strong> pour lancer l’algorithme.</p></div>',
    '      <div class="lab__sample">',
    '        <div class="lab__sample-part"><b>Entrée du programme</b><pre>TEST-LIBRE</pre></div>',
    '        <div class="lab__sample-part"><b>Sortie attendue</b><pre>SOMMET_OPTIMAL: (7, 2) PROFIT_MAX=31.0</pre></div>',
    '      </div>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Module 1 — Fondements & Modélisation' })
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code — ' + course.brand,
      description: 'Bac à sable Python pour programmer et tester les algorithmes de Recherche Opérationnelle : simplexe, dualité, transport et PERT.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
