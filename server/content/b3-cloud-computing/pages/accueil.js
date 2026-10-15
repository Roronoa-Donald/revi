/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Cloud Computing B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('cloud') + ' Niveau B3 • Architecture Cloud &amp; Infrastructures Scalables</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Cloud</a>',
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
    box('standard', 'Maîtriser les Architectures Cloud en Troisième Année', [
      '<p>Le cours de Cloud Computing de Bachelor 3 forme les futurs architectes système, ingénieurs cloud et administrateurs d’infrastructures hybrides. ' +
      'Au-delà de la simple utilisation d’une console web, ce cursus approfondit les fondements conceptuels, techniques, écologiques et financiers ' +
      'qui régissent les infrastructures modernes à grande échelle. ' +
      'À travers 6 modules rigoureux, vous explorerez : la définition canonique du NIST (SP 800-145) et la matrice IaaS/PaaS/SaaS, ' +
      'la cartographie comparative des hyperscalers (AWS, Azure, GCP) et le calcul formel de SLA composé, ' +
      'l’ingénierie de la virtualisation (hyperviseurs Bare-Metal vs Hosted, HVM, sur-allocation et dimensionnement crête), ' +
      'l’efficience environnementale Green IT (calcul du PUE, DCiE, empreinte carbone et automatisation FinOps), ' +
      'le modèle de responsabilité partagée, la sécurité du stockage et la souveraineté des données (RGPD, CLOUD Act, SecNumCloud), ' +
      'et les méthodologies de migration d’entreprise (les 6 R du Gartner, calcul de TCO sur 3 ans et arbitrage tarifaire On-Demand, Réservé, Spot). ' +
      'Chaque module comprend 3 exercices de programmation Python 3 exécutables directement dans l’atelier, un QCM de 8 questions et des flashcards.</p>'
    ].join('\n')),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer par le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Cours interactif et architectures cloud',
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
    '  <h1>Sommaire Général — ' + course.brand + '</h1>',
    '  <p class="lead">Programme complet en 6 modules : des principes fondateurs du NIST aux stratégies FinOps et à la souveraineté des données.</p>',
    '',
    '  <ol class="timeline">' + listHtml + '</ol>',
    '',
    chnav({ href: 'index.html', label: 'Retour à l’accueil' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le cours' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire du cours — ' + course.brand,
      description: 'Vue d’ensemble des 6 chapitres de Cloud Computing B3 : plan de cours, objectifs pédagogiques et navigation rapide.',
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
    '  <h1>Atelier de Code &amp; Bac à Sable Cloud Computing</h1>',
    '  <p class="lead">Simulez et évaluez vos métriques cloud en Python 3 : calculs de SLA composé, dimensionnement d’instances, audit énergétique PUE et arbitrages FinOps.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="99.9\n99.95">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez vos architectures, calculs de disponibilite et dimensionnements Cloud\nimport math\n\ndef simuler_sla_cloud():\n    print("Zone libre Cloud Computing B3 : pret a executer.")\n\nif __name__ == \'__main__\':\n    simuler_sla_cloud()\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulation de Haute Disponibilité Multi-Régions</h4>',
    '      <p>Modélisez une architecture distribuée combinant équilibreurs de charge, bases répliquées et calculez l’indisponibilité annuelle prévisionnelle en minutes.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Arbitrage Économique FinOps &amp; TCO</h4>',
    '      <p>Implémentez un simulateur de bascule de charge entre instances On-Demand et Spot pour minimiser le coût d’un cluster d’encodage vidéo ou de calcul IA.</p>',
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
      description: 'Bac à sable interactif en Python pour modéliser, tester et automatiser des scénarios d’architecture cloud et calculs FinOps.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
