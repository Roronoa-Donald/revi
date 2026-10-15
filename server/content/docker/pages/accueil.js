/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Docker B2 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('blocks') + ' Niveau B2 • Conteneurisation Linux, Dockerfile, Réseaux &amp; Compose</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Conteneurs</a>',
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
    box('standard', 'Maîtriser la Conteneurisation Linux et l’Écosystème Docker', [
      '<p>La conteneurisation est le socle de l’ingénierie logicielle moderne et des architectures Cloud Native. ' +
      'Ce cours forme les étudiants et futurs administrateurs système / développeurs DevOps de niveau B2 ' +
      'à appréhender Docker sous tous ses angles : de l’isolation noyau bas niveau (Namespaces, Cgroups, Chroot) ' +
      'jusqu’à l’orchestration multi-services avec Docker Compose. ' +
      'Vous apprendrez à concevoir des images légères et sécurisées grâce aux builds multi-étapes (Multi-Stage Builds), ' +
      'à orchestrer des réseaux ponts (bridge networks) avec résolution DNS interne, à sécuriser les montages de volumes de données, ' +
      'et à durcir les conteneurs en production selon les recommandations du CIS Benchmark (utilisateur non-root, limites de ressources, politiques de redémarrage). ' +
      'Chaque module combine explications architecturales détaillées, cas réels de production, 3 ateliers de programmation interactive et un QCM d’évaluation.</p>'
    ].join('\n')),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Conteneurisation Linux, Dockerfile, Réseau &amp; Compose',
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
    '  <p class="lead">Consultez les 6 modules du programme, leur durée indicative et leurs objectifs en conteneurisation Docker B2.</p>',
    '  <ol class="sommaire__list">' + items + '</ol>',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire complet | ' + course.brand,
      description: 'Vue d’ensemble des 6 modules du cours de Docker B2.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier de code ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ label: 'Atelier de code' }]),
    '  <h1>Atelier de simulation d’infrastructure &amp; conteneurs Docker</h1>',
    '  <p class="lead">Simulez les primitives noyau, inspectez les couches OverlayFS, validez vos Dockerfiles et testez vos configurations Compose directement dans l’interpréteur Python.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="PID\nNET\nCPU_LIMIT">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez, inspectez des conteneurs, images ou docker-compose.\nprint("Zone libre Docker B2 : pret a executer.")\n</script>',
    '  </div>',
    '',
    '  <h2>Règles d’or de la conteneurisation et de l’ingénierie Docker</h2>',
    box('standard', 'Principes directeurs pour des conteneurs légers, fiables et sécurisés', [
      '<ul>',
      '  <li><strong>Un seul processus principal par conteneur :</strong> Respectez le principe de responsabilité unique (Single Concern). Séparez l’application web, la base de données et le cache Redis dans des conteneurs indépendants.</li>',
      '  <li><strong>Minimisez la taille des images :</strong> Utilisez des images de base légères (Alpine, Slim, Distroless) et bannissez les paquets inutiles (compilateurs, outils de débogage) dans l’image finale via le Multi-Stage Build.</li>',
      '  <li><strong>Traitez les conteneurs comme éphémères (Stateless) :</strong> Toute donnée persistante doit résider dans un volume nommé ou une base de données managée externe, jamais dans la couche Writable du conteneur.</li>',
      '  <li><strong>Ne tournez JAMAIS en root en production :</strong> Déclarez un utilisateur non-privilégié (directive USER) et attribuez-lui les droits stricts nécessaires pour mitiger les risques d’évasion de conteneur.</li>',
      '</ul>'
    ].join('\n')),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code interactif | ' + course.brand,
      description: 'Espace d’expérimentation et bac à sable de simulation d’infrastructure Docker interactif.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
