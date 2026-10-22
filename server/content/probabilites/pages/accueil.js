/**
 * Pages accueil, sommaire et atelier du cours « Probabilités » B2.
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
    '    <span class="tag tag--time">Mathématiques appliquées</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>poser un univers, des événements et calculer une probabilité ;</li>',
      '      <li>conditionner par une information et reconnaître l’indépendance ;</li>',
      '      <li>compter par dénombrement (arrangements, combinaisons, anagrammes) ;</li>',
      '      <li>décrire une variable aléatoire par sa loi, son espérance et sa variance ;</li>',
      '      <li>reconnaître les lois usuelles : Bernoulli, binomiale, Poisson ;</li>',
      '      <li>passer au continu : uniforme, exponentielle, normale ;</li>',
      '      <li>majorer une probabilité et appliquer le théorème central limite.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Le cours de probabilités couvre les fondements axiomatiques, le dénombrement, les variables aléatoires discrètes et continues ainsi que les grands théorèmes limites. Chaque notion est articulée avec rigueur pour assurer une compréhension intuitive et formelle.</p>',
    '    <p>Chaque chapitre se termine par <strong>trois études de cas mathématiques</strong> à compléter directement dans la page : vos calculs et raisonnements sont validés pas à pas à travers des grilles méthodologiques de conformité.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Formulaire</a>',
      '      <a class="btn" href="atelier.html">' + ic('book') + ' Atelier d’analyse</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; annales</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Probabilités B2 — variables aléatoires, lois et théorèmes limites | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, des axiomes de Kolmogorov au théorème central limite. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B2 ou supérieur (et un ' +
    'abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois études de cas et grilles de calcul mathématique</strong> à compléter ' +
    'directement dans la page : vos résultats sont vérifiés critère par critère par des tests méthodologiques. ' +
    'L’<a href="atelier.html">atelier d’analyse</a> permet de vous entraîner librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Formulaire</span><br><span class="toc__d">Toutes les formules du cours sur une page, à garder ouvert.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; annales</span><br><span class="toc__d">Exercices gradués et sujets d’examen corrigés.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier d’analyse</span><br><span class="toc__d">Résoudre et vérifier des calculs mathématiques dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’examen, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de probabilités B2 : ' + chapterList.length +
        ' chapitres, études de cas mathématiques, flashcards, formulaire et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier d’analyse mathématique</h1>',
    '  <p class="lead">Un espace de travail interactif pour poser vos calculs probabilistes et vérifier vos résolutions pas à pas.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Valider</strong> évalue votre résolution mathématique et vérifie la conformité de vos résultats.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand un résultat diverge, pourquoi le calcul échoue et quelle formule appliquer. Il explique en mots : il ne donne jamais la réponse brute à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> valide la grille sans quitter l’éditeur.</li>',
      '      <li>Vos réponses sont conservées dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="analyse"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="cas:1">',
      '  <script type="text/plain" data-lab-starter># Grille d\'analyse libre — Probabilités',
      '# Zone libre : posez vos raisonnements et calculez vos probabilités.',
      '# Rien de ce que vous écrirez ici n’est noté.',
      '#',
      '[Cas 1 — Exemple de calcul]',
      '# Données : univers équiprobable à 8 issues, 3 cas favorables',
      '3/8',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — calcul probabiliste</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('book') + ' Grille d’analyse</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> manipuler et valider des calculs sans conséquence. Prenez une formule ' +
      'du cours (probabilité, espérance, variance, loi binomiale, loi normale) et vérifiez-la sur des cas concrets.</p>',
      '    <div class="lab__brief">',
      '      <p>Complétez la réponse attendue sous la section correspondante et lancez la validation pour vous auto-évaluer.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Cas d’exemple</b><pre>8 issues, 3 favorables</pre></div>',
      '      <div class="lab__sample-part"><b>Résolution attendue</b><pre>3/8</pre></div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la théorie à la pratique</h2>',
    '  <p>La validation pas à pas permet d’ancrer les formules mathématiques en associant chaque problème à son schéma probabiliste exact.</p>',
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois études de cas mathématiques validées ' +
    'directement dans la page pour ancrer durablement la théorie.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Fondements' }),
    disclaimer(course, 'La validation repose sur des tests de conformité critère par critère pour chaque cas d’étude.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier d’analyse — calculs probabilistes | ' + course.brand,
      description: 'Atelier d’analyse du cours de probabilités B2 : espace d’application mathématique, étude de cas probabilistes et validation pas à pas.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
