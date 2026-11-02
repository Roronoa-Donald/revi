/**
 * Pages « accueil », « sommaire » et « atelier » du cours « SQL Avancé B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('database') + ' Niveau B3 • Ingénierie Base de Données, Transactions ACID, Indexation B-Tree, CBO &amp; Haute Disponibilité</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Laboratoire SQL Interactif</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules approfondis</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices SQL</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs d\'ingénierie</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>Ingénierie des Bases de Données &amp; Performance SQL en Troisième Année</h2>',
    box('standard', 'Du Simple CRUD aux Moteurs Relationnels Haute Scalabilité &amp; ACID', [
      '<p>En troisième année de Bachelor en Ingénierie des Données et Systèmes d\'Information, la maîtrise du SQL ne se résume pas à écrire des requêtes <code>SELECT</code> et <code>JOIN</code> élémentaires. Ce cours présente notamment le contrôle de concurrence multiversion (MVCC), les verrous et les graphes d\'attente pour analyser les interblocages. Il aborde aussi les structures d\'indexation et la lecture des plans d\'exécution via <code>EXPLAIN (ANALYZE, BUFFERS)</code> pour rechercher les causes de lenteur.</p>',
      '<p>Ce cours présente des notions de SQL et des fonctionnalités de PostgreSQL : ' +
      'les transactions ACID, les niveaux d\'isolation et les anomalies de concurrence (Dirty Read, Non-Repeatable Read, Phantom Read), avec les particularités de PostgreSQL, ' +
      'les structures d\'index physiques et leur dimensionnement mémoire (Fill Factor, fragmentation, index partiels et sélecteurs d\'index Index Advisor), ' +
      'l\'optimisation par les coûts (CBO) et le diagnostic des nœuds de plan (Seq Scan vs Index Scan, jointures Nested Loop, Hash Join, Merge Join et dérives de cardinalité statistiques), ' +
      'la puissance analytique des fonctions de fenêtrage (ROW_NUMBER, RANK, DENSE_RANK, fenêtres glissantes) et des expressions de table communes récursives (WITH RECURSIVE), ' +
      'le développement procédural PL/pgSQL durci (déclencheurs d\'audit, Row-Level Security RLS pour le SaaS multi-tenant et assainissement contre les injections SQL), ' +
      'et enfin le partitionnement horizontal déclaratif (Range, List, Hash) couplé à la réplication physique WAL Streaming et aux stratégies de basculement haute disponibilité.</p>'
    ]),
    '',
    '  <h2>Outils et Méthodes de Travail</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Laboratoire Code Lab</span></div>',
    '      <h3>18 exercices SQL</h3>',
    '      <p>Les exercices proposent des données et des modèles pédagogiques. Leur correction automatique est temporairement suspendue.</p>',
    '      <a class="btn btn--sm" href="chapitres/exercices.html">Voir les exercices</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Certification &amp; Évaluation</span></div>',
    '      <h3>QCM &amp; Examens d’Ingénierie</h3>',
    '      <p>48 questions de synthèse couvrant les internes du moteur PostgreSQL, les RFCs, le partitionnement et le dépannage de requêtes sous haute concurrence.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Consulter les examens</a>',
    '    </div>',
    '  </div>',
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Accueil',
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const listHtml = chapterList.map(ch => [
    '    <div class="sommaire-item">',
    '      <div class="sommaire-item__num">' + ch.n + '</div>',
    '      <div class="sommaire-item__content">',
    '        <h3><a href="chapitres/chapitre' + ch.n + '.html">' + ch.title + '</a></h3>',
    '        <p>' + ch.toc + '</p>',
    '      </div>',
    '    </div>'
  ].join('\n')).join('\n');

  const body = [
    '  <h1>Sommaire Général — ' + course.brand + '</h1>',
    '  <p class="lead">Parcours d\'ingénierie des bases de données relationnelles avancées et performance SQL découpé en six modules d\'apprentissage.</p>',
    '',
    '  <div class="sommaire-list">' + listHtml + '</div>',
    '',
    '  <h2>Ressources et Ateliers Complémentaires</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h3>Atelier Pratique</h3>',
    '      <p>Console interactive pour tester et automatiser des algorithmes de gestion de bases de données et d\'optimisation de requêtes.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Accéder à l\'atelier</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Formules &amp; Commandes</h3>',
    '      <p>Synthèse des commandes PostgreSQL (EXPLAIN, VACUUM, REINDEX), syntaxe ANSI, métriques de coût CBO et matrices d\'isolation.</p>',
    '      <a class="btn btn--sm" href="chapitres/formules.html">Consulter l\'aide-mémoire</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Examens Blancs</h3>',
    '      <p>Deux sujets d\'examen complets corrigés avec barème pour certifier vos compétences d\'administrateur de bases de données.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Passer les examens</a>',
    '    </div>',
    '  </div>',
    '',
    chnav(
      { label: 'Accueil du cours', href: 'index.html' },
      { label: 'Module 1 : Transactions ACID, Verrous & Niveaux d\'Isolation', href: 'chapitres/chapitre1.html' }
    ),
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan complet des 6 modules de formation au SQL Avancé B3.',
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
    { label: 'Laboratoire SQL libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Éditeur SQL libre</h1>',
    '  <p class="lead">Rédigez une requête SQL. Le bouton Exécuter utilise un service externe, s\'il est configuré ; sa disponibilité et son dialecte dépendent du service. Cet éditeur ne fournit pas une base PostgreSQL de production. La correction automatique des exercices du cours est temporairement suspendue.</p>',
    '  <p>La requête initiale est un exemple autonome compatible avec SQLite. Utilisez une base de test adaptée pour les commandes propres à PostgreSQL.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="sql"',
    '       data-height="420"',
    '       data-stdin="">',
    '    <script type="text/plain" data-lab-starter>-- Exemple autonome compatible SQLite\nSELECT 1 AS exemple;\n</script>',
    '  </div>',
    '',
    '  <h2>Pistes de travail sur une base de test adaptée</h2>',
    '  <p>Ces pistes nécessitent vos propres données et outils ; aucun simulateur spécialisé n’est fourni dans cet éditeur.</p>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Index B-Tree</h4>',
    '      <p>Étudiez les divisions de pages lors d\'insertions et l\'effet du paramètre Fill Factor sur une base de test.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Plans d\'exécution</h4>',
    '      <p>Sur PostgreSQL, comparez les coûts estimés de plans selon les données et la sélectivité.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Laboratoire SQL libre — ' + course.brand,
      description: 'Éditeur SQL libre : exécution selon le service configuré, correction des exercices suspendue.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
