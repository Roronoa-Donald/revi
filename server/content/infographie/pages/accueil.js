/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Infographie B2 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('blocks') + ' Niveau B2 • Colorimétrie, Vectoriel, Texturing, Modélisation 3D, Shaders &amp; Optimisation</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Infographie</a>',
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
    box('standard', 'Maîtriser les Fondations Mathématiques et Techniques de l’Infographie 2D et 3D', [
      '<p>L’infographie numérique moderne combine arts visuels, traitement du signal, géométrie vectorielle et calcul GPU temps réel. ' +
      'Ce cours forme les étudiants en informatique et multimédia de niveau B2 à appréhender toute la chaîne de production visuelle : ' +
      'de la colorimétrie physique (synthèses additive RVB et soustractive CMJN, résolution DPI/PPI) jusqu’au pipeline graphique 3D programmable (shaders, illumination PBR). ' +
      'Vous apprendrez à manipuler les formats vectoriels et les courbes de Bézier, à concevoir des atlas de textures et des Normal Maps en espace tangent, ' +
      'à transformer et éclairer des maillages polygonaux 3D (loi de Lambert, spéculaire de Phong, conservation d’énergie), ' +
      'et à optimiser les performances sur GPU (compression ASTC/BC, static batching, réduction des Draw Calls et chaînes de Mipmaps). ' +
      'Chaque module combine concepts rigoureux, cas d’application professionnels, 3 ateliers de programmation interactive et un QCM complet d’évaluation.</p>'
    ].join('\n')),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Colorimétrie, Vectoriel, Texturing, Modélisation 3D &amp; Rendu temps réel',
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
    '  <p class="lead">Consultez les 6 modules du programme, leur durée indicative et leurs objectifs en infographie 2D et 3D de niveau B2.</p>',
    '  <ol class="sommaire__list">' + items + '</ol>',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire complet | ' + course.brand,
      description: 'Vue d’ensemble des 6 modules du cours d’Infographie B2.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier de code ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ label: 'Atelier de code' }]),
    '  <h1>Atelier de simulation graphique &amp; algorithmes visuels 2D/3D</h1>',
    '  <p class="lead">Simulez les conversions colorimétriques, évaluez des courbes de Bézier, calculez des normales de maillages et testez les pipelines de shaders directement dans l’interpréteur Python.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="analyse"',
    '       data-height="420"',
    '       data-stdin="P0=(0,0) P1=(50,100) P2=(100,50) P3=(100,0) t=0.5">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez, calculez des transformations 3D, des modes de fusion ou des textures.\nprint("Zone libre Infographie B2 : pret a executer.")\n</script>',
    '  </div>',
    '',
    '  <h2>Règles d’or de l’infographie numérique et du rendu temps réel</h2>',
    box('standard', 'Principes directeurs pour des assets graphiques optimisés et fidèles', [
      '<ul>',
      '  <li><strong>Respectez les espaces colorimétriques :</strong> Travaillez en RVB linéaire pour tous les calculs d’éclairage et de shaders physiques (PBR), et n’appliquez la courbe gamma sRVB qu’au moment du transfert vers l’écran.</li>',
      '  <li><strong>Vectoriel vs Raster :</strong> Privilégiez le tracé vectoriel (SVG, Bézier) pour les icônes, typographies et interfaces redimensionnables sans perte, et réservez le raster aux photographies et textures complexes.</li>',
      '  <li><strong>Textures en puissances de deux (POT) :</strong> Garantissez des dimensions 256, 512, 1024 ou 2048 pour que le GPU puisse générer automatiquement la chaîne complète de mipmaps sans rééchantillonnage pénalisant.</li>',
      '  <li><strong>Minimisez les ruptures de batch :</strong> Regroupez les textures dans des atlas et partagez les mêmes matériaux entre objets statiques pour fusionner les maillages et drastiquement réduire les Draw Calls.</li>',
      '</ul>'
    ].join('\n')),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code interactif | ' + course.brand,
      description: 'Espace d’expérimentation et bac à sable de calculs et simulations graphiques 2D/3D interactif.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
