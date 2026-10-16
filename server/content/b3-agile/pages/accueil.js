/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Méthodes Agiles B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('layers') + ' Niveau B3 • Gestion de Projet Moderne, Scrum, Kanban, User Stories &amp; Scaling</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Laboratoire Agile Interactif</a>',
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
    '  <h2>Pilotage de Projet &amp; Ingénierie Agile en Troisième Année</h2>',
    box('standard', 'De l’Exécution Linéaire à l’Agilité Empirique et à l’Échelle', [
      '<p>En troisième année de Bachelor en Ingénierie Informatique, les méthodes agiles ne se résument pas à coller des post-it sur un mur ou à animer une réunion quotidienne de 15 minutes. L’ingénieur logiciel, chef de projet technique ou Scrum Master doit maîtriser les fondements théoriques, les métriques quantitatives et les outils d’automatisation du flux de valeur logiciel.</p>',
      '<p>Ce cours approfondit l’intégralité des pratiques agiles industrielles contemporaines : ' +
      'la transition depuis les modèles prédictifs (Waterfall, Cycle en V, PERT et chemin critique) vers le Manifeste Agile de 2001, ' +
      'le cadre Scrum officiel (rôles, artefacts du Product et Sprint Backlogs, Definition of Done et timeboxing des événements), ' +
      'la méthode Kanban et le Lean Management (gestion du flux tiré, limites WIP, Lead Time, Cycle Time, Throughput et Loi de Little), ' +
      'l’ingénierie des exigences agiles (rédaction de User Stories INVEST, critères d’acceptation BDD/Gherkin, Planning Poker et complexité relative en suite de Fibonacci), ' +
      'la planification prévisionnelle de releases (capacité d’équipe, vélocité moyenne, détection de scope creep sur Sprint Burn-down et prévision probabiliste), ' +
      'et enfin le passage à l’échelle (SAFe, PI Planning, dépendances inter-équipes, organisation matricielle Spotify et modèles hybrides).</p>'
    ]),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer par le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Scrum, Kanban, User Stories, Vélocité &amp; Agilité à l’Échelle B3',
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
    '  <p class="lead">Programme détaillé des 6 modules de spécialisation en gestion de projet agile, Scrum, flux Kanban, estimation relative, pilotage de release et scaling en entreprise.</p>',
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
    '  <h2>Ressources transversales &amp; Outils de révision</h2>',
    '  <div class="grid grid--3">',
    '    <div class="card">',
    '      <h3>' + ic('terminal') + ' Laboratoire Interactif</h3>',
    '      <p>Console Python 3 avec éditeur intégré pour simuler le calcul de vélocité, vérifier les limites WIP et auditer les timeboxes Scrum.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Ouvrir le lab</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>' + ic('file') + ' Cartes &amp; Syntaxes</h3>',
    '      <p>Aide-mémoire visuel : Manifeste Agile, événements Scrum, métriques Kanban (Little’s Law), critères INVEST et modèles à l’échelle.</p>',
    '      <a class="btn btn--sm" href="chapitres/cartes.html">Consulter les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>' + ic('award') + ' Examens &amp; Annales</h3>',
    '      <p>Deux sujets d’examen complets corrigés avec barème détaillé pour certifier les compétences de gestionnaire de projet agile de niveau B3.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Passer les examens</a>',
    '    </div>',
    '  </div>',
    '',
    chnav(
      { label: 'Accueil du cours', href: 'index.html' },
      { label: 'Module 1 : Du Cycle Prédictif au Manifeste Agile', href: 'chapitres/chapitre1.html' }
    ),
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan complet des 6 modules de formation aux Méthodes Agiles B3.',
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
    { label: 'Laboratoire Agile libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Laboratoire Interactif &amp; Bac à Sable Méthodes Agiles</h1>',
    '  <p class="lead">Expérimentez et automatisez vos algorithmes de gestion de projet en Python 3 : simulation de capacité de sprint, contrôle de flux Kanban, burn-down charts et matrices de dépendances inter-équipes.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="analyse"',
    '       data-height="420"',
    '       data-stdin="SPRINT_CAP dev=5 days=10 focus=0.8">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez vos calculs de capacité et métriques agiles en Python 3\nimport sys\n\ndef evaluer_capacite_sprint(developpeurs, jours_ouvres, ratio_focus=0.8):\n    heures_brutes = developpeurs * jours_ouvres * 7\n    heures_nettes = round(heures_brutes * ratio_focus, 1)\n    points_estimes = round(heures_nettes / 8.0, 1)\n    return f"DEV={developpeurs} HEURES_NETTES={heures_nettes}h POINTS_ESTIMES={points_estimes}pts"\n\nif __name__ == "__main__":\n    print(evaluer_capacite_sprint(5, 10, 0.8))\n    print(evaluer_capacite_sprint(7, 10, 0.75))\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulateur de Loi de Little</h4>',
    '      <p>Implémentez le calcul du débit Throughput = WIP / Cycle Time et modélisez l’impact de l’ajout de développeurs sur les temps d’attente.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Moteur de Planning Poker</h4>',
    '      <p>Construisez un système de vote à plusieurs participants projetant la moyenne sur la suite de Fibonacci modifiée avec détection d’écarts.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Laboratoire Agile libre — ' + course.brand,
      description: 'Bac à sable interactif en Python pour tester vos algorithmes de gestion de projet agile.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
