/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Étude Quantitative & Qualitative B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('chart') + ' Niveau B3 • Méthodologie de Recherche &amp; Analyse des Données IT</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Statistiques &amp; Enquêtes</a>',
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
    box('standard', 'L’Art et la Rigueur de la Démarche Scientifique en Troisième Année', [
      '<p>En ingénierie des technologies de l’information de niveau Bachelor 3, toute prise de décision stratégique, ' +
      'audit de maturité numérique ou mémoire professionnel exige une démonstration factuelle irréfutable. ' +
      'S’appuyer sur de simples intuitions ou des retours anecdotiques est la première source d’échec des projets de transformation IT. ' +
      'Ce cours approfondit l’intégralité de la méthodologie de recherche mixte (Mixed Methods) : ' +
      'la distinction épistémologique entre paradigme positiviste (quantitatif, déductif, confirmation d’hypothèses) et interprétativiste (qualitatif, inductif, exploration du sens), ' +
      'la théorie de l’échantillonnage probabiliste (formule de Cochran, stratification, correction pour population finie) et empirique (quotas), ' +
      'la conception scientifique de questionnaires (échelles de Likert, détection et éradication des biais de formulation), ' +
      'la conduite rigoureuse d’entretiens semi-directifs, focus groups et observations in situ, ' +
      'l’analyse statistique univariée et bivariée (Chi-deux d’indépendance, corrélation linéaire de Pearson), ' +
      'l’analyse qualitative de contenu thématique et la structuration académique du mémoire professionnel selon le guide officiel CDP Sup. ' +
      'Chaque module comprend 3 ateliers de programmation interactive en Python 3 exécutables directement dans le navigateur, ' +
      'un QCM de 8 questions rigoureusement argumentées et des flashcards de mémorisation active.</p>'
    ].join('\n')),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer par le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Méthodologie de Recherche, Échantillonnage, Statistiques &amp; Mémoire',
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
    '  <p class="lead">Programme détaillé des 6 modules fondamentaux en méthodologie de recherche quantitative et qualitative, échantillonnage scientifique, analyse de données et rédaction académique.</p>',
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
    '      <h4>' + ic('terminal') + ' Bac à sable Statistiques</h4>',
    '      <p>Simulateur Python 3 pour exécuter vos calculs de Cochran, tests du Chi-deux, corrélations de Pearson et analyses de contenu.</p>',
    '      <a class="btn" href="atelier.html">Ouvrir le bac à sable</a>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('book') + ' Cartes de révision</h4>',
    '      <p>36 flashcards de mémorisation active couvrant les paradigmes, les formules de sondage, les biais de mesure et les tests d’hypothèses.</p>',
    '      <a class="btn" href="chapitres/cartes.html">Réviser avec les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('chart') + ' Formules &amp; Mémento</h4>',
    '      <p>Toutes les équations statistiques indispensables : Cochran, stratification, Chi-deux, Pearson, Likert et accord de Miles &amp; Huberman.</p>',
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
      description: 'Vue d’ensemble des 6 chapitres d’Étude Quantitative & Qualitative B3 : plan de cours, objectifs et navigation rapide.',
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
    '  <h1>Atelier de Code &amp; Bac à Sable Statistiques &amp; Enquêtes</h1>',
    '  <p class="lead">Expérimentez et automatisez vos analyses méthodologiques en Python 3 : dimensionnement d’échantillons probabilistes de Cochran, dépouillement d’échelles de Likert, tests du Chi-deux et codage thématique.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="STATS_ENQUETE\nechantillon=385\nconfiance=95\nerreur=5.0">',
    '    <script type="text/plain" data-lab-starter># Zone libre : expérimentez vos calculs statistiques, dimensionnements d\'échantillons et analyses qualitatives\nimport math\n\ndef dimensionner_etude():\n    print("Zone libre Etude Quantitative & Qualitative B3 : pret a executer.")\n\nif __name__ == \'__main__\':\n    dimensionner_etude()\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulateur d’Échantillonnage Stratifié</h4>',
    '      <p>Modélisez un algorithme de tirage au sort stratifié proportionnel calculant la taille requise par catégorie d’utilisateurs avec arrondi intelligent.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Moteur de Test d’Indépendance du Chi-deux</h4>',
    '      <p>Implémentez le calcul complet d’un tableau de contingence avec effectifs théoriques et comparaison au seuil critique de 3.84.</p>',
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
      description: 'Bac à sable interactif en Python pour tester vos calculs d’échantillonnage, tests statistiques et analyses qualitatives.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
