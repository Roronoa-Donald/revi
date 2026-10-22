/**
 * Pages accueil, sommaire et atelier du cours « React » B2.
 */
'use strict';

const { ic, box, crumb } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const toc = chapterList.map(chapitre =>
    '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
    '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span></span></a>'
  ).join('\n');

  const body = [
    crumb(course, [{ href: '/index.html', label: 'Portail des cours' }, { label: course.brand }]),
    '  <div class="chapmeta">',
    '    <span class="tag">Licence 2 · B2</span>',
    '    <span class="tag tag--time">Développement Frontend</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>penser en composants autonomes et maîtriser le modèle mental déclaratif de React ;</li>',
      '      <li>écrire du JSX propre et manipuler les props avec déstructuration et children ;</li>',
      '      <li>gérer des états réactifs complexes et des formulaires contrôlés avec useState ;</li>',
      '      <li>rendre des listes dynamiques performantes grâce à map() et la prop key ;</li>',
      '      <li>synchroniser des composants avec des APIs distantes via useEffect sans fuite mémoire ;</li>',
      '      <li>architecturer une Single Page Application complète avec React Router v6.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Ce cours aborde React de manière progressive en six chapitres : des fondations du JSX ' +
      'jusqu’au routage multipage et aux architectures globales. Le chapitre 1 est en accès libre.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code interactifs</strong> en ' +
      '<strong>JavaScript</strong> : vous écrivez la logique de composants, d’état et d’algorithmes réactifs, ' +
      'exécutée directement dans la page et validée par une batterie de tests cachés.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo syntaxe</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de code</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'React B2 — composants, hooks, state, effets et routage | Cours Interactif',
      description: course.description,
      active: null,
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const toc = chapterList.map(chapitre => {
    const lock = chapitre.free
      ? '<br><span class="locknote">Accès libre</span>'
      : '<br><span class="locknote">' + ic('lock') + ' B2 et plus</span>';
    return '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
      '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span>' +
      lock + '</span></a>';
  }).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire du cours</h1>',
    '  <p class="lead">' + chapterList.length + ' chapitres pour maîtriser React, du composant de base ' +
    'jusqu’à l’architecture SPA d’une application de production. Le chapitre 1 est en accès libre ; ' +
    'les suivants requièrent un compte de niveau B2 ou supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en JavaScript</strong> à écrire et à exécuter ' +
    'dans la page. L’<a href="atelier.html">atelier de code</a> permet de tester et prototyper librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres à mémoriser.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo syntaxe React</span><br><span class="toc__d">JSX, Hooks, gestion d’état et React Router sur une seule page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet Todo App</span><br><span class="toc__d">18 exercices guidés et le fil conducteur d’une application complète.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de code</span><br><span class="toc__d">Écrire et exécuter du code JavaScript directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés pour préparer les épreuves écrites et pratiques.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de React B2 : ' + chapterList.length +
        ' chapitres, exercices JavaScript exécutables, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier de code React</h1>',
    '  <p class="lead">Un éditeur Monaco intégré à la page, relié au moteur d’exécution Node.js. Écrivez votre script, ' +
    'exécutez-le et observez immédiatement la sortie : l’outil idéal pour prototyper la logique de vos composants.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre code JavaScript et affiche sa sortie standard et ses éventuelles erreurs.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>fs.readFileSync(0, \'utf8\')</code> recevra sur stdin.</li>',
      '      <li><strong>Expliquer mon erreur</strong> sollicite le tuteur IA pour comprendre l’origine d’un bug sans dévoiler la solution.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script directement depuis l’éditeur.</li>',
      '      <li>Vos modifications sont automatiquement sauvegardées dans votre navigateur.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="javascript"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="React 19;Equipe Peda">',
      '  <script type="text/plain" data-lab-starter>const fs = require(\'fs\');',
      'const lignes = fs.readFileSync(0, \'utf8\').trim().split(\'\n\');',
      '',
      '// Zone libre : simulez, cassez, recommencez.',
      '// Rien de ce que vous écrirez ici n’est noté.',
      '//',
      '// Exemple proposé : simulateur de rendu d\'un composant Carte',
      'const [titre, auteur] = lignes[0] ? lignes[0].split(\';\') : [\'React B2\', \'Equipe\'];',
      'console.log(`<Card title="${titre}" author="${auteur}">`);',
      'console.log(\'  <p>Bienvenue sur l application React.</p>\');',
      'console.log(\'</Card>\');',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre : simulateur de composant React</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' JavaScript (Node.js)</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans contrainte. Écrivez une fonction pure, ' +
      'simule une transition d’état ou teste une déstructuration de props complexe sur des données réelles.</p>',
      '    <div class="lab__brief">',
      '      <p>Le code d’exemple simule l’assemblage d’un composant conteneur Card avec ses props et son corps. ' +
      'Modifiez l’entrée standard ci-dessous et clique sur <strong>Exécuter</strong> pour voir le résultat.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>React 19;Equipe Peda</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>&lt;Card title="React 19" author="Equipe Peda"&gt;\n  &lt;p&gt;Bienvenue sur l application React.&lt;/p&gt;\n&lt;/Card&gt;</pre></div>',
      '    </div>',
      '    <p class="lab__note">Déplie « Entrée du programme » et modifie les valeurs de test à volonté.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la logique pure au DOM du navigateur</h2>',
    '  <p>Le moteur d’exécution évalue la logique JavaScript pure de vos composants (calculs de réduction, ' +
    'transformations de listes, validation de formulaires). Cette logique se transpose à l’identique ' +
    'dans votre éditeur VSCode et votre navigateur.</p>',
    box('pitfall', 'Les erreurs courantes décelées par l’atelier', 'warning', [
      '    <ul>',
      '      <li><strong>Oubli de gestion des chaînes vides</strong> : penser à tester les cas où la saisie utilisateur est incomplète.</li>',
      '      <li><strong>Mutations directes de tableaux</strong> : privilégier <code>.map()</code> et <code>.filter()</code> plutôt que <code>.push()</code>.</li>',
      '      <li><strong>Parenthèses et accolades en JSX</strong> : veiller à bien entourer les expressions dynamiques avec <code>{...}</code>.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Architecture technique du bac à sable', 'terminal', [
      '    <ul>',
      '      <li>Votre script est envoyé de manière sécurisée au service d’exécution isolé sans dépendance locale.</li>',
      '      <li>Toutes les exécutions respectent les quotas de sécurité de la plateforme.</li>',
      '      <li>Le résultat s’affiche en temps réel dans la console intégrée sous l’éditeur.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Chacun des ' + course.chapters.length + ' chapitres propose trois ateliers ciblés pour ancrer ' +
    'durablement chaque concept de la bibliothèque.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 : Composants & JSX' }),
    disclaimer(course, 'L’exécution repose sur le service d’exécution sécurisé de l’académie. ')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code : prototyper avec React | ' + course.brand,
      description: 'Atelier de code du cours de React B2 : éditeur Monaco, exécution JavaScript temps réel, entrée standard et console.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
