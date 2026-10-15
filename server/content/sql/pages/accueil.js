/**
 * Pages « accueil », « sommaire » et « atelier » du cours « SQL B2 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('database') + ' Niveau B2 • Modélisation, Transactions ACID &amp; Optimisation SQL</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable SQL</a>',
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
    box('standard', 'Maîtriser les bases de données relationnelles professionnelles', [
      '<p>En entreprise, écrire une requête qui « marche » ne suffit pas. ' +
      'Les ingénieurs logiciels doivent concevoir des schémas relationnels normalisés sans redondance (DDL), ' +
      'maîtriser la subtilité des jointures et fonctions d’agrégation analytiques (Window Functions), ' +
      'garantir l’intégrité transactionnelle face aux accès concurrents (ACID, verrous, niveaux d’isolation), ' +
      'et optimiser les performances d’exécution grâce aux index et à l’analyse EXPLAIN. ' +
      'Chaque chapitre intègre 3 ateliers interactifs de code pour transformer la théorie en réflexes durables.</p>'
    ].join('\n')),
    '',
    disclaimer('Ce cours couvre l’intégralité du programme officiel de Systèmes de Gestion de Bases de Données (SGBD) et SQL niveau B2.')
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
  const crumbs = crumb(course, [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Sommaire général' }
  ]);

  const rows = chapterList.map(chapitre => [
    '    <div class="timeline__item">',
    '      <div class="timeline__badge">' + chapitre.n + '</div>',
    '      <div class="timeline__content card">',
    '        <div class="card__head">',
    '          <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B2 et plus') + '</span>',
    '          <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        </div>',
    '        <h3 class="card__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p class="card__desc">' + chapitre.toc + '</p>',
    '        <div class="card__actions">',
    '          <a class="btn btn--sm" href="chapitres/chapitre' + chapitre.n + '.html">' + ic('play') + ' Ouvrir le chapitre</a>',
    '        </div>',
    '      </div>',
    '    </div>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Sommaire Général du Cours SQL B2</h1>',
    '  <p class="lead">Curriculum complet structuré en 6 modules : de la modélisation formelle DDL aux fonctions analytiques et à l’optimisation de plans d’exécution.</p>',
    '',
    '  <div class="timeline">',
    rows,
    '  </div>',
    '',
    '  <h2>Ressources &amp; Révisions transversales</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Pratique</span>' + ic('terminal') + '</div>',
    '      <h4 class="card__title"><a href="atelier.html">Atelier &amp; Bac à sable</a></h4>',
    '      <p class="card__desc">Zone libre pour exécuter des requêtes SQLite, tester des scripts DDL et manipuler des transactions.</p>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Mémorisation</span>' + ic('layers') + '</div>',
    '      <h4 class="card__title"><a href="chapitres/cartes.html">Cartes de révision</a></h4>',
    '      <p class="card__desc">36 flashcards couvrant l’ensemble des définitions, opérateurs et concepts clés du cours.</p>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Synthèse</span>' + ic('file') + '</div>',
    '      <h4 class="card__title"><a href="chapitres/formules.html">Mémento &amp; Syntaxe</a></h4>',
    '      <p class="card__desc">Fiche de référence synthétisant la syntaxe SQL ANSI, les propriétés ACID et les opérateurs de fenêtrage.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire général — ' + course.brand,
      description: 'Table des matières et parcours d’apprentissage du cours SQL B2.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier (Bac à sable) ======================== */

function atelier(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Atelier SQL' }
  ]);

  const body = [
    crumbs,
    '  <h1>Atelier SQL &amp; Bac à Sable Relationnel</h1>',
    '  <p class="lead">Zone libre d’expérimentation : créez des tables temporaires en mémoire, exécutez des requêtes d’agrégation, testez des jointures et simulez des transactions sans contrainte.</p>',
    '',
    box('standard', 'Environnement interactif de code', [
      '<p>Utilisez cet éditeur pour tester du code Python manipulant des bases relationnelles SQLite en mémoire (<code>:memory:</code>), ' +
      'ou implémenter des algorithmes de filtrage et d’analyse relationnelle. ' +
      'Les sorties s’affichent directement dans la console inférieure.</p>'
    ].join('\n')),
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="PARIS,LYON,MARSEILLE">',
    '    <script type="text/plain" data-lab-starter>import sys, sqlite3\n\n# Zone libre : simulez, exécutez des requêtes SQL, testez des jointures ou manipulez des transactions.\ncon = sqlite3.connect(":memory:")\ncur = con.cursor()\ncur.execute("CREATE TABLE clients (id INT PRIMARY KEY, nom TEXT, ville TEXT, solde INT)")\ncur.execute("INSERT INTO clients VALUES (1, \'Alice\', \'PARIS\', 1200), (2, \'Bob\', \'LYON\', 850), (3, \'Claire\', \'PARIS\', 2100)")\ncon.commit()\n\nfor row in cur.execute("SELECT nom, solde FROM clients WHERE ville = \'PARIS\' ORDER BY solde DESC"):\n    print(f"Client: {row[0]} | Solde: {row[1]}€")\n</script>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Retour au sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Accéder au chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code & Bac à sable — ' + course.brand,
      description: 'Atelier interactif de programmation et expérimentation SQL B2.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
