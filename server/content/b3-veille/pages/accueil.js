/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Veille Technologique & Innovation B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('search') + ' Niveau B3 • Intelligence Stratégique, Sourcing Documentaire, Signaux Faibles &amp; Radar d’Innovation</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Laboratoire de Veille Interactif</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules approfondis</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs d\'ingénierie</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>L’Intelligence Technologique au Service de l’Ingénierie &amp; de l’Entreprise</h2>',
    box('standard', 'De la Simple Navigation Web au Dispositif Opérationnel de Renseignement Technologique', [
      '<p>En troisième année de Bachelor en Informatique et Systèmes d\'Information, la veille technologique ne consiste plus à consulter passivement quelques flux d\'actualités ou réseaux sociaux. L\'ingénieur et futur architecte de solutions doit concevoir, orchestrer et pérenniser un véritable <strong>dispositif d\'intelligence technologique</strong> capable d\'anticiper les ruptures de marché, de prémunir l\'organisation contre l\'obsolescence prématurée de son stack technique et de sécuriser les arbitrages stratégiques face aux risques concurrentiels et réglementaires.</p>',
      '<p>Ce cours approfondit l\'intégralité des méthodologies et outillages industriels de la veille : ' +
      'la typologie sectorielle (technologique, concurrentielle, juridique/RGPD, commerciale, sociétale) et la posture d\'anticipation proactive conforme à la norme AFNOR XP X50-053, ' +
      'le cycle complet du renseignement (cadrage des besoins stratégiques, cartographie rigoureuse des sources primaires et détection mathématique des signaux faibles par analyse de dérivée d\'accélération lexicale), ' +
      'les protocoles d\'acquisition automatisés (mécanismes Push vs Pull, requêtes booléennes dorking, parsing XML de flux RSS 2.0 / Atom, déduplication canonique et régulation de débit Rate Limiter), ' +
      'le traitement et le filtrage algorithmique (normalisation NLP, suppression de stopwords, scoring de pertinence TF-IDF et classification bayésienne naïve anti-bruit), ' +
      'l\'analyse prospective d\'impact (niveaux de maturité TRL 1 à 9, positionnement sur le Gartner Hype Cycle et matrices croisées SWOT / PESTEL), ' +
      'et enfin la restitution stratégique (bulletins de veille hiérarchisés par criticité, projection cartographique en Tech Radar selon les anneaux ThoughtWorks et gouvernance d\'équipe agile Kanban).</p>'
    ]),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer le Module 1' }),
    '',
    disclaimer()
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

  const itemsHtml = chapterList.map(chapitre => [
    '    <li class="summary-item">',
    '      <div class="summary-item__num">' + ic('book') + ' Module ' + chapitre.n + '</div>',
    '      <div class="summary-item__content">',
    '        <h3 class="summary-item__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p class="summary-item__desc">' + chapitre.toc + '</p>',
    '        <div class="summary-item__meta">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + ' • 3 ateliers de code Python 3 • 8 questions d\'évaluation QCM</div>',
    '      </div>',
    '    </li>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Sommaire Détaillé du Cours — ' + course.brand + '</h1>',
    '  <p class="lead">Programme complet en six modules théoriques et pratiques d\'intelligence technologique, de collecte de données automatisée et d\'analyse prospective.</p>',
    '',
    '  <ul class="summary-list">' + itemsHtml + '</ul>',
    '',
    '  <h2>Ressources &amp; Outils Transverses</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h4>' + ic('terminal') + ' Laboratoire de Code</h4>',
    '      <p>Expérimentez librement vos scripts de parsing RSS, calcul de TF-IDF et modélisation TRL dans le bac à sable Python 3.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Ouvrir l\'atelier ' + ic('arrow-right') + '</a>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('layers') + ' Mémento Méthodologique</h4>',
    '      <p>Consultez les formules analytiques (TF-IDF, Jaccard, TRL, Hype Cycle, SWOT) et les grilles d\'évaluation de fiabilité.</p>',
    '      <a class="btn btn--sm" href="chapitres/formules.html">Consulter le mémento ' + ic('arrow-right') + '</a>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('file') + ' Examens Blancs</h4>',
    '      <p>Testez vos compétences sur 2 épreuves écrites d\'examen d\'ingénierie intégrale avec barèmes et corrigés détaillés.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Passer les examens ' + ic('arrow-right') + '</a>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'index.html', label: 'Revenir à l\'accueil' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire du cours — ' + course.brand,
      description: 'Plan complet des 6 modules de formation en veille technologique, intelligence économique et analyse prospective.',
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
    { label: 'Laboratoire de veille libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Laboratoire Interactif &amp; Bac à Sable de Veille Technologique</h1>',
    '  <p class="lead">Expérimentez et validez vos scripts d\'ingénierie documentaire en Python 3 : parsing de flux RSS/Atom, déduplication par similarité de Jaccard, indexation TF-IDF et modélisation de tendances.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="SIGNAL id=1 text=La CNIL publie un nouveau décret de conformité RGPD\nSIGNAL id=2 text=Un concurrent annonce une levée de fonds pour anticiper le marché">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez vos algorithmes de veille et d\'analyse d\'information en Python 3\nimport sys\n\ndef simuler_veille_strategique(signaux):\n    """Simule la classification préliminaire d’un flux de signaux."""\n    resultats = []\n    for sig in signaux:\n        resultats.append(f"SIGNAL_TRAITÉ: {sig}")\n    return resultats\n\nif __name__ == "__main__":\n    inputs = [l.strip() for l in sys.stdin if l.strip()]\n    for r in simuler_veille_strategique(inputs):\n        print(r)\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Parseur de Flux RSS &amp; Déduplication</h4>',
    '      <p>Implémentez un robot de collecte qui extrait les balises XML &lt;item&gt; et élimine les doublons via l\'indice de Jaccard.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Moteur TF-IDF &amp; Détection de Signaux Faibles</h4>',
    '      <p>Calculez l\'importance relative de mots-clés émergents dans un corpus pour repérer les technologies de rupture avant leur vulgarisation.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Laboratoire de veille libre — ' + course.brand,
      description: 'Bac à sable interactif en Python pour tester vos algorithmes de veille technologique, parsing RSS et analyse de signaux.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
