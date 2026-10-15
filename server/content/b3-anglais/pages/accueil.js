/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Anglais B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('book') + ' Niveau B3 • Anglais Professionnel &amp; Technique, Documentation, Agile, Support &amp; Pitching</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Laboratoire Linguistique Interactif</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules professionnels</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs d’anglais IT</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>L’Anglais Technique en Ingénierie : Clé de Voûte des Équipes Internationales</h2>',
    box('standard', 'De la Précision Terminologique aux Négociations et Présentations à Haut Impact', [
      '<p>En troisième année de Bachelor en Ingénierie Réseaux et Systèmes d’Information, la maîtrise de l’anglais technique ne se résume pas à traduire mot à mot des consignes ou à comprendre des termes familiers. Dans une industrie mondialisée régie par les standards de l’IETF, les architectures Cloud d’envergure et les équipes d’ingénierie distribuées sur plusieurs fuseaux horaires, l’anglais est la véritable <em>API universelle</em> de la collaboration technique.</p>',
      '<p>Ce cours approfondit l’intégralité des compétences requises en milieu professionnel international : ' +
      'la précision terminologique sans compromis (distinction entre glitch, bug, vulnérabilité et exploit ; latence, bande passante et débit ; modèle de responsabilité partagée Cloud IaaS, PaaS, SaaS), ' +
      'la maîtrise absolue des documentations techniques (décryptage des spécifications d’API REST/OpenAPI, audit des clauses normatives de la norme RFC 2119 avec MUST, SHOULD et MAY, et structuration de fichiers README clairs et reproductibles), ' +
      'la communication écrite formelle (diagnostic de la clinique des mauvais emails, rédaction de rapports de bugs exploitables dès la première lecture, et publication de communiqués d’escalade d’incidents critiques SEV-1 pour la direction), ' +
      'l’anglais parlé en contexte Agile (conduite fluide des daily standups avec Yesterday/Today/Blockers, animations de rétrospectives et calcul rigoureux de la conformité aux SLAs contractuels de disponibilité), ' +
      'la gestion du support utilisateur et des incidents (traduction empathique des erreurs techniques cryptiques pour des usagers non avertis, matrice ITIL de sévérité et post-mortems <em>blameless</em> fondés sur la méthode des 5 Pourquoi), ' +
      'et enfin la préparation aux soutenances techniques et entretiens internationaux (structure en 1 minute à 10 minutes avec accroche, développement et balisage verbal <em>Signposting</em>, méthode STAR pour les entretiens d’embauche et optimisation des CV pour les robots de tri ATS).</p>'
    ]),
    '',
    '  <h2>Ressources transversales</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h3>Cartes Mémos &amp; Flashcards</h3>',
    '      <p>36 fiches de mémorisation active couvrant l’ensemble des notions clés : acronymes IT, RFC 2119, modèle STAR, signposts de présentation et clauses de SLA.</p>',
    '      <a class="btn btn--sm" href="chapitres/cartes.html">Consulter les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Formules, Vocabulaire &amp; Templates</h3>',
    '      <p>Synthèse de référence : glossaire technique bilingue, patrons d’emails professionnels, formules de disponibilité SLA et locutions de signposting.</p>',
    '      <a class="btn btn--sm" href="chapitres/formules.html">Ouvrir le mémento</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Examens Blancs d’Anglais Technique</h3>',
    '      <p>Deux épreuves complètes corrigées (Contrôle Continu et Examen Terminal) conçues selon les exigences académiques et professionnelles de B3 IT.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Passer les examens</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Catalogue des 18 Exercices de Code</h3>',
    '      <p>Inventaire détaillé des 18 exercices de code Python 3 automatisés permettant de valider vos algorithmes d’analyse de texte et de calcul technique.</p>',
    '      <a class="btn btn--sm" href="chapitres/exercices.html">Explorer le catalogue</a>',
    '    </div>',
    '  </div>',
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Cours Interactif &amp; Pratique B3',
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

  const itemsHtml = chapterList.map(ch => [
    '  <li class="summary-item">',
    '    <div class="summary-item__head">',
    '      <span class="summary-item__num">Module ' + ch.n + '</span>',
    '      <span class="badge">' + (ch.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '      <span class="summary-item__time">' + ic('clock') + ' ' + (ch.time || '≈ 2 h 45') + '</span>',
    '    </div>',
    '    <h3 class="summary-item__title"><a href="chapitres/chapitre' + ch.n + '.html">' + ch.title + '</a></h3>',
    '    <p class="summary-item__desc">' + ch.toc + '</p>',
    '  </li>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Sommaire Général — ' + course.brand + '</h1>',
    '  <p class="lead">Programme d’excellence en 6 modules pour maîtriser l’anglais technique et professionnel : de la documentation d’API aux daily standups, du support client aux présentations techniques et entretiens internationaux.</p>',
    '',
    '  <ol class="summary-list">' + itemsHtml + '</ol>',
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan complet des 6 modules de formation à l’Anglais Professionnel et Technique B3.',
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
    { label: 'Laboratoire Linguistique libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Laboratoire Interactif &amp; Bac à Sable Anglais Technique B3</h1>',
    '  <p class="lead">Expérimentez et validez vos scripts d’analyse linguistique et d’automatisation en Python 3 : détection d’acronymes, linter RFC 2119, calculs de SLA, analyseur STAR et balisage de présentations.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="CHECK_VOCAB The website is broken and the database is slow\nCHECK_VOCAB We patched the codebase yesterday">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez vos analyseurs de documentation et algorithmes linguistiques en Python 3\nimport sys\n\ndef simuler_analyse_technique_anglais(commandes):\n    """Simule l\'audit et la vérification de conformité de communications techniques."""\n    resultats = []\n    for cmd in commandes:\n        resultats.append(f"ANALYSIS_OK: {cmd}")\n    return resultats\n\nif __name__ == "__main__":\n    cmds = [l.strip() for l in sys.stdin if l.strip()]\n    for r in simuler_analyse_technique_anglais(cmds):\n        print(r)\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Linter de Spécifications RFC 2119</h4>',
    '      <p>Testez des clauses techniques et classez-les instantanément selon leur niveau de priorité (MUST, SHOULD, MAY).</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Calculateur de Disponibilité SLA</h4>',
    '      <p>Mesurez l’indisponibilité mensuelle maximale autorisée pour des contrats à trois ou quatre 9 (99.9% vs 99.99%) et calculez les pénalités.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Laboratoire Linguistique libre — ' + course.brand,
      description: 'Bac à sable interactif en Python pour tester vos scripts d’audit linguistique et calculs de SLA.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
