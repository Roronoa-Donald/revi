/**
 * Pages « accueil », « sommaire » et « atelier » du cours « DevOps B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('layers') + ' Niveau B3 • Ingénierie DevOps &amp; Automatisation CI/CD</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable DevOps</a>',
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
    box('standard', 'L’Excellence de l’Ingénierie DevOps en Troisième Année', [
      '<p>Le mouvement DevOps transcende la simple maîtrise d’outils technologiques : il constitue une refonte systémique de la collaboration, ' +
      'de l’automatisation, de l’architecture logicielle et de la gestion de la fiabilité opérationnelle. ' +
      'Ce cursus de niveau Bachelor 3 aborde l’intégralité du cycle de vie des applications d’entreprise, ' +
      'depuis les racines du Lean Manufacturing et les silos organisationnels jusqu’aux pratiques d’avant-garde de Site Reliability Engineering (SRE). ' +
      'À travers 6 modules rigoureux, vous explorerez : la rupture du mur de la confusion Dev/Ops et le modèle CALMS, ' +
      'l’industrialisation de l’Intégration Continue (CI) et la détection des tests instables (Flaky Tests), ' +
      'l’ingénierie des conteneurs Docker (optimisation des couches de cache, builds multi-étapes) et l’Infrastructure as Code (IaC) idempotente, ' +
      'les stratégies de Déploiement Continu (Blue/Green, Canary, Feature Flags), ' +
      'le pilotage par les 4 métriques DORA et la modélisation du rayon d’impact (Blast Radius), ' +
      'ainsi que la gouvernance SRE par les SLI/SLO, les budgets d’erreur (Error Budgets) et l’amortissement des tempêtes d’alertes Prometheus. ' +
      'Chaque module comprend 3 exercices interactifs d’études de cas exécutables directement dans l’atelier, un QCM de 8 questions et des flashcards.</p>'
    ].join('\n')),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer par le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Ingénierie DevOps, CI/CD, Docker &amp; SRE',
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const rows = chapterList.map(ch => [
    '    <tr>',
    '      <td><strong>Module ' + ch.n + '</strong></td>',
    '      <td><a href="chapitres/chapitre' + ch.n + '.html"><strong>' + ch.title + '</strong></a></td>',
    '      <td>' + ch.toc + '</td>',
    '      <td><span class="badge">' + (ch.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span></td>',
    '    </tr>'
  ].join('\n')).join('\n');

  const body = [
    '  <h1>Sommaire &amp; Plan d’Études — ' + course.brand + '</h1>',
    '  <p class="lead">Programme détaillé des 6 modules de spécialisation en ingénierie DevOps, pipelines CI/CD, conteneurs Docker, métriques DORA et pratiques SRE.</p>',
    '',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:12%">Module</th>',
    '        <th style="width:30%">Titre du cours</th>',
    '        <th style="width:43%">Programme &amp; Notions clés</th>',
    '        <th style="width:15%">Statut</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    rows,
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>Ressources transverses d’accompagnement</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h4>' + ic('terminal') + ' Bac à sable DevOps</h4>',
    '      <p>Atelier d’analyse interactif pour valider vos algorithmes de calculs DORA, Error Budgets et déploiements Canary.</p>',
    '      <a class="btn" href="atelier.html">Ouvrir le bac à sable</a>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('book') + ' Cartes de révision</h4>',
    '      <p>36 flashcards de mémorisation active couvrant les concepts Lean, pipelines CI/CD, Docker et SRE.</p>',
    '      <a class="btn" href="chapitres/cartes.html">Réviser avec les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('file') + ' Formules &amp; Mémento</h4>',
    '      <p>Toutes les formules canoniques : Lead Time, Efficience de Flux, DORA, MTTR, Burn Rate et SLA.</p>',
    '      <a class="btn" href="chapitres/formules.html">Consulter le mémento</a>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'index.html', label: 'Retour à l’accueil' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire du cours — ' + course.brand,
      description: 'Vue d’ensemble des 6 chapitres de DevOps B3 : plan de cours, objectifs pédagogiques et navigation rapide.',
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
    { label: 'Atelier d’analyse libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Atelier d’analyse &amp; Études de cas DevOps</h1>',
    '  <p class="lead">Simulez et automatisez vos métriques d’ingénierie DevOps selon les grilles d’analyse : calculs d’efficience de flux, matrices de tests, optimisation Dockerfile, déploiements Canary et gouvernance SRE.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="analyse"',
    '       data-height="420"',
    '       data-stdin="METRIQUES_DORA\ndeploiements_an=520 echecs=26 lead_time_h=12 mttr_h=1.5">',
    '    <script type="text/plain" data-lab-starter># Zone libre : rédigez vos grilles d\'analyse et cas d\'application.\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulation de Déploiement Canary avec Circuit Breaker</h4>',
    '      <p>Modélisez un algorithme de bascule progressive du trafic (10%, 25%, 50%, 100%) intégrant un retour arrière automatique (Rollback) si le taux d’erreur HTTP 5xx dépasse 1.5%.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Calculateur de Burn Rate &amp; Consommation d’Error Budget</h4>',
    '      <p>Implémentez la logique SRE pour déclencher des alertes critiques par paliers (2%, 5%, 80%) de consommation du budget d’indisponibilité sur une fenêtre glissante de 30 jours.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Lancer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier d’analyse libre — ' + course.brand,
      description: 'Bac à sable interactif par cas d’application pour modéliser, tester et automatiser des scénarios d’ingénierie DevOps, pipelines CI/CD et métriques SRE.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
