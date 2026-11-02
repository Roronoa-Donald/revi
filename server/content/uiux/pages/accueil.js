/**
 * Pages « accueil », « sommaire » et « atelier » du cours « UI/UX Design B2 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('palette') + ' Niveau B2 • Ergonomie Cognitive, Méthodologie CCU &amp; Accessibilité WCAG 2.1</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Atelier d’analyse ergonomique</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules fondamentaux</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Études de cas formatives</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs complets</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>Méthodologie pédagogique</h2>',
    box('standard', 'Maîtriser la Conception Centrée Utilisateur (CCU) et l’Ergonomie Numérique', [
      '<p>Concevoir une interface numérique performante ne se résume pas à l’esthétique graphique : ' +
      'c’est une science rigoureuse combinant psychologie cognitive, recherche terrain, ergonomie d’interaction et conformité aux standards universels. ' +
      'Ce cursus forme les designers et ingénieurs logiciels B2 à piloter le modèle du Double Diamant (Design Council), ' +
      'à extraire des insights actionnables par les Personas et la cartographie du parcours (Customer Journey Map), ' +
      'à appliquer les lois fondamentales de la perception (Lois de Fitts, Hick-Hyman, Miller, Jakob), ' +
      'à structurer des interfaces modulaires par l’Atomic Design et les systèmes de grille 8pt, ' +
      'à améliorer l’ergonomie tactile sur mobile (Thumb Zone et dimensionnement des cibles), ' +
      'et à concevoir des produits nativement inclusifs respectant les normes d’accessibilité WCAG 2.1 niveau AA. ' +
      'Chaque module articule principes théoriques, modèles mathématiques, 3 grilles d’analyse et un QCM d’évaluation.</p>'
    ].join('\n')),
    '',
    disclaimer('Ce cours couvre les référentiels professionnels ISO 9241-210, WCAG 2.1 (W3C/WAI) et les heuristiques de Jakob Nielsen.')
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Ergonomie Cognitive, Design System &amp; Accessibilité WCAG',
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
    '  <p class="lead">Consultez les 6 modules du programme, leur durée indicative et leurs objectifs d’ergonomie et de conception UI/UX.</p>',
    '  <ol class="sommaire__list">' + items + '</ol>',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire complet | ' + course.brand,
      description: 'Vue d’ensemble des 6 modules du cours d’UI/UX Design B2.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier de code ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ label: 'Atelier d’analyse' }]),
    '  <h1>Atelier de calcul ergonomique &amp; audit UI/UX</h1>',
    '  <p class="lead">Préparez vos grilles d’analyse pour les lois de Fitts et Hick, les contrastes et les métriques ergonomiques. Ce brouillon n’est ni exécuté ni corrigé ; les études de cas des chapitres proposent séparément une vérification formative.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="analyse"',
    '       data-height="420">',
    '    <script type="text/plain" data-lab-starter># Zone libre : rédigez vos grilles d\\\'analyse et cas d\\\'application.\\n[Cas 1 — Cas d\\\'application libre]\\n# Données :\\nA_COMPLETER\\n</script>',
    '  </div>',
    '',
    '  <h2>Règles d’or de l’ergonomie et du design d’interface</h2>',
    box('standard', 'Principes directeurs pour des interfaces intuitives et accessibles', [
      '<ul>',
      '  <li><strong>Appuyez-vous sur les conventions connues :</strong> elles peuvent faciliter le repérage, mais leurs usages dépendent du public et du contexte ; vérifiez-les avec les utilisateurs.</li>',
      '  <li><strong>Vérifiez le contraste WCAG AA :</strong> le texte courant nécessite en général 4,5:1 avec son arrière-plan ; le grand texte nécessite 3:1 dès 18 pt ou 14 pt en gras (environ 24 px ou 18,7 px CSS). Les exceptions prévues par le critère s’appliquent.</li>',
      '  <li><strong>Alignez vos espacements sur une grille 8pt :</strong> La cohérence visuelle d’un produit repose sur la répétition d’un rythme spatial régulier (8px, 16px, 24px, 32px, 48px).</li>',
      '  <li><strong>Dimensionnez les cibles :</strong> distinguez les critères WCAG en pixels CSS, la recommandation Android de 48 x 48 dp et la recommandation Apple en points ; vérifiez aussi les exceptions et l’espacement.</li>',
      '</ul>'
    ].join('\n')),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier d’analyse | ' + course.brand,
      description: 'Brouillon libre et études de cas en ergonomie UI/UX.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
