/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Assembleur » B2.
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('cpu') + ' Niveau B2 • Architecture des Ordinateurs &amp; Systèmes Bas Niveau</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Assembleur</a>',
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
    box('standard', 'Comprendre la machine depuis le silicium jusqu’à l’exécutable', [
      '<p>La programmation en assembleur est la clé de voûte de la compréhension des systèmes informatiques. ' +
      'Elle révèle comment le compilateur traduit vos structures de haut niveau en opcodes binaires, ' +
      'comment les registres et le bus mémoire collaborent, et comment la pile d’exécution organise vos appels de fonctions. ' +
      'Chaque chapitre propose 3 ateliers de code interactifs pour manipuler directement les concepts matériels.</p>'
    ].join('\n')),
    '',
    disclaimer('Ce cours couvre le programme officiel d’Architecture &amp; Programmation en Assembleur de deuxième année de licence / cycle ingénieur.')
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
  const rows = chapterList.map(chapitre => [
    '    <li class="summary-item">',
    '      <div class="summary-item__num">' + chapitre.n + '</div>',
    '      <div class="summary-item__content">',
    '        <h3><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p>' + chapitre.toc + '</p>',
    '      </div>',
    '      <div class="summary-item__meta">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B2') + '</span>',
    '        <span class="tag tag--time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '      </div>',
    '    </li>'
  ].join('\n')).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire complet du cours</h1>',
    '  <p class="lead">Six modules d’enseignement approfondis pour maîtriser les registres x86_64, les drapeaux EFLAGS, les modes d’adressage LEA et la pile d’exécution.</p>',
    '',
    '  <h2>Programme des chapitres</h2>',
    '  <ol class="summary-list">' + rows + '  </ol>',
    '',
    '  <h2>Ressources &amp; Révisions</h2>',
    '  <div class="grid grid--2">',
    '    <article class="card">',
    '      <h3 class="card__title"><a href="chapitres/cartes.html">' + ic('layers') + ' Flashcards de révision</a></h3>',
    '      <p class="card__desc">36 cartes interactives pour tester ses réflexes sur les registres, les opcodes et la mémoire.</p>',
    '    </article>',
    '    <article class="card">',
    '      <h3 class="card__title"><a href="chapitres/formules.html">' + ic('clipboard') + ' Mémo des instructions</a></h3>',
    '      <p class="card__desc">Synthèse complète des instructions x86 (MOV, LEA, CMP, Jcc, PUSH, POP) et des drapeaux.</p>',
    '    </article>',
    '    <article class="card">',
    '      <h3 class="card__title"><a href="chapitres/examens.html">' + ic('graduation') + ' Simulateur d’examen</a></h3>',
    '      <p class="card__desc">2 sujets d’examens blancs notés sur 20 avec barèmes détaillés et corrigés pas à pas.</p>',
    '    </article>',
    '    <article class="card">',
    '      <h3 class="card__title"><a href="chapitres/exercices.html">' + ic('terminal') + ' Catalogue d’ateliers</a></h3>',
    '      <p class="card__desc">Accès direct aux 18 exercices de code interactifs testés et corrigés dans le navigateur.</p>',
    '    </article>',
    '  </div>',
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire général — ' + course.brand,
      description: 'Sommaire exhaustif du cours d’Architecture & Programmation en Assembleur B2.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier d’analyse ======================== */

function atelier(course) {
  const starter = [
    '# Grille d\'analyse libre — Assembleur & Architecture',
    '# Zone d’étude : état des registres, drapeaux et pile',
    '#',
    '[Cas 1 — Décomposition registre EAX]',
    '# Registre 32 bits : 0x12345678',
    'EAX: 0x12345678 AX: 0x5678 AH: 0x56 AL: 0x78',
    'CONCLUSION: Décomposition canonique des sous-registres x86 valide.'
  ].join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Atelier d’analyse' }]),
    '  <h1>Atelier d’analyse &amp; Bac à sable Assembleur</h1>',
    '  <p class="lead">Expérimentez librement vos algorithmes d’émulation et de décodage d’instructions x86 et AVR par cas d’application.</p>',

    box('info', 'Console d’expérimentation Assembleur', [
      '<p>Cet atelier permet de formaliser et vérifier vos grilles d\\\'analyse. ' +
      'Vous pouvez structurer vos études de cas d’architecture, manipuler des registres 32 ou 64 bits et analyser la pile d’exécution.</p>'
    ].join('\n')),

    '  <h2>Zone libre</h2>',
    '  <div class="lab" data-lab data-language="analyse" data-height="360" data-languages="1" data-stdin="TEST-ASM">',
    '    <script type="text/plain" data-lab-starter># Grille d’analyse libre — assembleur\n# Zone d’étude et d’application méthodologique\n\n[Cas 1 — Étude préliminaire]\nANALYSE: CONFORME\nNOTE: Validation des prérequis et des critères méthodologiques.\n</script>',
    '    <div class="lab__head">',
    '      <h3 class="lab__title">Zone libre : simulateur d’architecture &amp; registres</h3>',
    '      <div class="lab__meta"><span class="lab__lang">' + ic('book') + ' Étude de cas</span></div>',
    '    </div>',
    '    <div class="lab__body">',
    '      <p class="lab__goal"><strong>Objectif :</strong> manipuler librement les registres x86 et observer leur décomposition binaire.</p>',
    '      <div class="lab__brief"><p>Le code d’exemple extrait les sous-registres AX, AH et AL d’une valeur 32 bits EAX. Cliquez sur <strong>Exécuter</strong> pour tester le simulateur.</p></div>',
    '      <div class="lab__sample">',
    '        <div class="lab__sample-part"><b>Cas d’exemple</b><pre>TEST-ASM</pre></div>',
    '        <div class="lab__sample-part"><b>Résolution attendue</b><pre>EAX=0x12345678 AX=0x5678 AH=0x56 AL=0x78</pre></div>',
    '      </div>',
    '    </div>',
    '  </div>',
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier d’analyse — ' + course.brand,
      description: 'Bac à sable interactif pour simuler et prototyper des mécanismes d’assembleur et d’architecture CPU.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
