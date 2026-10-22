/**
 * Pages « accueil », « sommaire » et « atelier » du cours « UML B2 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('layers') + ' Niveau B2 • Modélisation Objet, Diagrammes Structurels &amp; Comportementaux UML 2.5</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable UML</a>',
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
    box('standard', 'Maîtriser la modélisation logicielle avec les standards de l’OMG (UML 2.5)', [
      '<p>La modélisation logicielle est la clé de voûte de la conception de systèmes complexes, fiables et maintenables. ' +
      'UML (Unified Modeling Language) fournit un métamodèle standardisé permettant de capturer les exigences, ' +
      'd’architecturer les composants structurels et de décrire avec précision la dynamique temporelle du système. ' +
      'Ce cursus forme les concepteurs et développeurs B2 à classifier rigoureusement les diagrammes structurels et comportementaux, ' +
      'à formaliser les besoins avec les diagrammes de cas d’utilisation (include, extend, acteurs primaires et secondaires), ' +
      'à bâtir des modèles de domaine expressifs via les diagrammes de classes (visibilités, multiplicités, agrégation faible vs composition forte), ' +
      'à tracer les interactions temporelles par les diagrammes de séquence (lignes de vie, retours, fragments alt/opt/loop), ' +
      'à représenter les flux métier via les diagrammes d’activités (gardes, synchronisations fork/join, swimlanes), ' +
      'et à piloter les cycles de vie et déploiements physiques (machines à états, composants et nœuds matériels). ' +
      'Chaque module combine principes théoriques formels, conventions OMG, 3 exercices de code de manière méthodiqueet un QCM d’évaluation.</p>'
    ].join('\n')),
    '',
    disclaimer('Ce cours couvre le standard officiel UML 2.5 de l’OMG et les bonnes pratiques de génie logiciel.')
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Modélisation Objet, Diagrammes Structurels &amp; Comportementaux',
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
    '  <p class="lead">Consultez les 6 modules du programme, leur durée indicative et leurs objectifs de modélisation logicielle UML 2.5.</p>',
    '  <ol class="sommaire__list">' + items + '</ol>',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire complet | ' + course.brand,
      description: 'Vue d’ensemble des 6 modules du cours de modélisation UML B2.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier de code ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ label: 'Atelier de code' }]),
    '  <h1>Atelier de modélisation interactif UML</h1>',
    '  <p class="lead">Simulez vos diagrammes, vérifiez vos contraintes OCL, validez vos machines à états et analysez vos traces de séquence dans l’environnement Python interactif.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="analyse"',
    '       data-height="420"',
    '       data-stdin="CLASS Utilisateur -id:int +nom:str">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez, modélisez et validez vos architectures UML de manière méthodique.\nprint("Zone libre UML B2 : pret a executer.")\n</script>',
    '  </div>',
    '',
    '  <h2>Règles d’or de la modélisation logicielle UML</h2>',
    box('standard', 'Bonnes pratiques d’ingénierie et réflexes d’architecture', [
      '<ul>',
      '  <li><strong>Ne modélisez pas tout :</strong> Le modèle UML est un vecteur de communication et d’abstraction, non une duplication intégrale du code source. Ciblez les zones à forte valeur métier ou forte complexité architecturale.</li>',
      '  <li><strong>Distinguez strictement composition et agrégation :</strong> Utilisez la composition (losange plein) uniquement si les composants partagent le cycle de vie du composite et cessent d’exister avec lui.</li>',
      '  <li><strong>Évitez l’abus des stéréotypes « extend » et « include » :</strong> Un cas d’utilisation doit apporter une valeur métier observable à son acteur principal ; ne découpez pas vos fonctions en micro-étapes techniques.</li>',
      '  <li><strong>Validez la complétude des machines à états :</strong> Assurez-vous que chaque état possède au moins un chemin de sortie vers un état final ou un retour à l’état nominal pour prévenir les blocages logiques.</li>',
      '</ul>'
    ].join('\n')),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code interactif | ' + course.brand,
      description: 'Espace d’expérimentation et bac à sable de simulation UML interactif.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
