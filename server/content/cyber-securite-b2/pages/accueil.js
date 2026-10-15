/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Cybersécurité » B2.
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('shield') + ' Niveau B2 • Cybersécurité, Cryptographie &amp; Défense Opérationnelle</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Sécurité</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules fondamentaux</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices d’audit de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs complets</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>Méthodologie pédagogique</h2>',
    box('standard', 'Maîtriser la défense en profondeur et la riposte aux cyberattaques', [
      '<p>La sécurité informatique ne se résume pas à l’application aveugle de correctifs. ' +
      'Elle repose sur une compréhension intime des vecteurs d’attaque (injections, failles logiques, élévation de privilèges), ' +
      'la rigueur des primitives cryptographiques modernes (AES, SHA-256, RSA), et le déploiement de contre-mesures opérationnelles ' +
      '(filtrage de paquets, NIDS Snort, corrélation SIEM, gestion d’incidents). ' +
      'Chaque chapitre intègre 3 ateliers interactifs de code pour forger vos compétences d’analyste en cybersécurité.</p>'
    ].join('\n')),
    '',
    disclaimer('Ce cours couvre le programme officiel de Cybersécurité B2 de licence informatique et prépare aux exigences des centres opérationnels de sécurité (SOC).')
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
    '  <h1>Sommaire général du cours</h1>',
    '  <p class="lead">L’ensemble du programme officiel de Cybersécurité B2 découpé en six modules progressifs et opérationnels.</p>',
    '',
    '  <div class="timeline">' + rows + '</div>',
    '',
    '  <h2>Outils &amp; Ressources transversales</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h4 class="card__title"><a href="atelier.html">' + ic('terminal') + ' Bac à sable Sécurité</a></h4>',
    '      <p class="card__desc">Zone d’expérimentation libre avec le bac à sable d’audit et de simulation cryptographique.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4 class="card__title"><a href="chapitres/cartes.html">' + ic('layers') + ' Cartes mémoire (Flashcards)</a></h4>',
    '      <p class="card__desc">36 fiches de mémorisation active pour réviser les concepts clés, acronymes et protocoles.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4 class="card__title"><a href="chapitres/examens.html">' + ic('award') + ' Examens blancs &amp; Épreuves</a></h4>',
    '      <p class="card__desc">Sujets types d’examen B2 avec corrigés complets et barèmes détaillés.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer par le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire général — ' + course.brand,
      description: 'Sommaire complet du cours Cybersécurité B2 : 6 modules fondamentaux, 18 exercices pratiques et 2 examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier (Bac à sable) ======================== */

function atelier(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Atelier de sécurité' }
  ]);

  const body = [
    crumbs,
    '  <h1>Atelier de Cybersécurité &amp; Bac à Sable d’Audit</h1>',
    '  <p class="lead">Zone libre d’expérimentation : testez des calculs d’entropie, analysez des expressions régulières de détection d’intrusions, simulez des flux cryptographiques et manipulez des signatures sans contrainte.</p>',
    '',
    box('info', 'Environnement d’exécution sécurisé', [
      '<p>Cet atelier intègre un interpréteur interactif pour expérimenter avec les algorithmes d’audit, ' +
      'les règles de pare-feu et les vérifications cryptographiques présentés tout au long du cours. ' +
      'Rédigez votre script, renseignez vos données de test sur l’entrée standard, et observez la réaction immédiate.</p>'
    ].join('\n')),
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="Secr3t_P@ssw0rd2026">',
    '    <script type="text/plain" data-lab-starter>' +
    'import sys, hashlib, re\n\n' +
    '# Zone libre : simulez, analysez des logs, testez des règles de filtrage ou calculez des empreintes SHA-256.\n' +
    'donnee = sys.stdin.read().strip()\n' +
    'if donnee:\n' +
    '    empreinte = hashlib.sha256(donnee.encode("utf-8")).hexdigest()\n' +
    '    print(f"Entree: {donnee}")\n' +
    '    print(f"Longueur: {len(donnee)} caracteres")\n' +
    '    print(f"Empreinte SHA-256: {empreinte}")\n' +
    '    print("Audit: execution reussie dans le bac a sable.")\n' +
    '    </script>',
    '  </div>',
    '',
    chnav({ href: 'index.html', label: 'Retour à l’accueil' }, { href: 'chapitres/chapitre1.html', label: 'Accéder au Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de Sécurité &amp; Bac à Sable — ' + course.brand,
      description: 'Atelier interactif de programmation et d’audit pour la sécurité des réseaux et systèmes informatiques.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
