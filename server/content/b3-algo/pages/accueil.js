/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Algorithmique B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const cardsHtml = chapterList.map(chapitre => [
    '    <article class="card">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('code') + ' Niveau B3 • Algorithmique Avancée &amp; Optimisation</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Algorithmes</a>',
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
    box('standard', 'Maîtriser l’Algorithmique Avancée en Troisième Année', [
      '<p>Le cours d’Algorithmique de Bachelor 3 (Licence 3) constitue la clé de voûte de l’ingénierie logicielle ' +
      'et de la science informatique appliquée. Il franchit l’étape décisive séparant le simple codage ' +
      'de la conception formelle d’architectures logicielles scalables et hautement performantes. ' +
      'À travers 6 modules rigoureux, vous explorerez : l’analyse asymptotique avancée et le théorème maître, ' +
      'les arbres binaires de recherche (ABR) et leur rééquilibrage, les files de priorité et le tri par tas (Heapsort), ' +
      'la théorie des graphes et les algorithmes gloutons (Kruskal, Prim), les plus courts chemins (Dijkstra, Bellman-Ford) ' +
      'et la programmation dynamique matricielle (sac à dos 0/1, LCS). ' +
      'Chaque chapitre intègre 3 ateliers de programmation Python exécutables directement dans l’éditeur Monaco, ' +
      'un QCM de validation de 8 questions et des fiches de mémorisation active.</p>'
    ].join('\n')),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer par le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Cours interactif et exercices corrigés',
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Sommaire général' }
  ]);

  const listHtml = chapterList.map(chapitre => [
    '    <li class="timeline__item">',
    '      <div class="timeline__badge">' + chapitre.n + '</div>',
    '      <div class="timeline__content">',
    '        <div class="timeline__head">',
    '          <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '          <span class="timeline__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        </div>',
    '        <h3 class="timeline__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p class="timeline__desc">' + chapitre.toc + '</p>',
    '        <div class="timeline__meta">',
    '          <span>' + ic('code') + ' 3 exercices de code</span>',
    '          <span>' + ic('check') + ' 8 questions QCM</span>',
    '          <span>' + ic('book') + ' 6 cartes flashcards</span>',
    '        </div>',
    '      </div>',
    '    </li>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Sommaire Détaillé du Cours d’Algorithmique B3</h1>',
    '  <p class="lead">Consultez la progression pédagogique complète : 6 modules articulés pour vous amener du calcul de complexité théorique à la programmation dynamique de pointe.</p>',
    '',
    '  <ol class="timeline">' + listHtml + '</ol>',
    '',
    '  <h2>Ressources transversales &amp; Outils d’entraînement</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h4 class="card__title"><a href="chapitres/cartes.html">' + ic('book') + ' Cartes de Révision</a></h4>',
    '      <p class="card__desc">36 flashcards interactives pour mémoriser les formules, théorèmes et invariants d’algorithmes.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4 class="card__title"><a href="chapitres/formules.html">' + ic('layers') + ' Mémento &amp; Notations</a></h4>',
    '      <p class="card__desc">Tableaux synthétiques des ordres de grandeur, relations de récurrence et complexités spatiales/temporelles.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4 class="card__title"><a href="chapitres/examens.html">' + ic('award') + ' Examens Blancs</a></h4>',
    '      <p class="card__desc">2 sujets complets d’épreuve (Contrôle Continu et Examen Final) avec corrigés détaillés et barèmes académiques.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'index.html', label: 'Retour à l’accueil' }, { href: 'chapitres/chapitre1.html', label: 'Ouvrir le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire général — ' + course.brand,
      description: 'Sommaire des 6 modules du cours d’Algorithmique B3 : progression, ateliers interactifs et examens.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier Bac à Sable ======================== */

function atelier(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Sommaire', href: 'sommaire.html' },
    { label: 'Atelier de code libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Atelier de Code &amp; Bac à Sable Algorithmique</h1>',
    '  <p class="lead">Expérimentez librement vos algorithmes en Python 3 : simulation de graphes, arbres de recherche, mesures de temps d’exécution et traceurs de récursion.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="1000\n16">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez et benchmarkez vos structures de données et algorithmes\nimport time\nimport heapq\n\ndef benchmark():\n    print("Zone libre Algorithmique B3 : pret a executer.")\n\nif __name__ == \'__main__\':\n    benchmark()\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Génération et parcours de graphes</h4>',
    '      <p>Implémentez un générateur de graphes aléatoires selon le modèle d’Erdős-Rényi $G(n, p)$ et mesurez le seuil de connectivité par BFS.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Benchmark de tri : Quicksort vs Heapsort</h4>',
    '      <p>Comparez le nombre de comparaisons et le temps CPU réel entre le tri par tas in-place et le tri rapide sur tableaux quasi triés ou inversés.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Lancer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code libre — ' + course.brand,
      description: 'Bac à sable interactif en Python pour tester, prototyper et chronométrer vos algorithmes et structures de données.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
