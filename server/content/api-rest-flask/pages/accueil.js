/**
 * Pages accueil, sommaire et atelier du cours « API REST avec Flask » B2.
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
    '    <span class="tag tag--time">Backend &amp; API Web</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>maîtriser le protocole HTTP et le cycle requête/réponse client-serveur ;</li>',
      '      <li>concevoir des architectures d’API RESTful propres avec URI canoniques et verbes adaptés ;</li>',
      '      <li>développer des micro-services performants avec le micro-framework Python Flask ;</li>',
      '      <li>manipuler avec précision les codes d’état HTTP (200, 201, 204, 400, 404, 409, 500) ;</li>',
      '      <li>valider défensivement les corps de requête JSON et prévenir le Mass Assignment ;</li>',
      '      <li>assembler un CRUD complet, découper en Blueprints et préparer le déploiement de production.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Ce cours aborde les API REST de manière progressive en six chapitres : des fondations HTTP ' +
      'jusqu’à l’architecture modulaire d’un CRUD complet en production. Le chapitre 1 est en accès libre.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code interactifs</strong> en ' +
      '<strong>Python</strong> : tu écris la logique de traitement, de validation et de sérialisation, ' +
      'exécutée directement dans la page et validée par une batterie de tests réels.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo REST &amp; Flask</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de code</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; CRUD</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'API REST avec Flask B2 — Architecture REST, Routage, CRUD et Sécurité | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres pour maîtriser la conception d’API REST avec Flask, ' +
    'des protocoles réseaux jusqu’à l’architecture modulaire de production. Le chapitre 1 est en accès libre ; ' +
    'les suivants requièrent un compte de niveau B2 ou supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Python</strong> à écrire et à exécuter ' +
    'dans la page. L’<a href="atelier.html">atelier de code</a> permet de tester et prototyper librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres à mémoriser.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo syntaxe Flask &amp; REST</span><br><span class="toc__d">Verbes HTTP, convertisseurs de route, codes d’état et jsonify sur une seule page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet CRUD</span><br><span class="toc__d">18 exercices guidés et le fil conducteur d’une API complète.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de code</span><br><span class="toc__d">Écrire et exécuter du code Python directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés pour préparer les épreuves écrites et pratiques.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours d’API REST avec Flask B2 : ' + chapterList.length +
        ' chapitres, exercices Python exécutables, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier de code Python / API REST</h1>',
    '  <p class="lead">Un éditeur Monaco intégré à la page, relié au moteur d’exécution Python. Écris ton script, ' +
    'exécute-le et observe immédiatement la sortie : l’outil idéal pour prototyper la logique de tes endpoints.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre code Python 3 et affiche sa sortie standard et ses éventuelles erreurs.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>sys.stdin</code> recevra en entrée standard.</li>',
      '      <li><strong>Expliquer mon erreur</strong> sollicite le tuteur IA pour comprendre l’origine d’un bug sans dévoiler la solution.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script directement depuis l’éditeur.</li>',
      '      <li>Vos modifications sont automatiquement sauvegardées dans votre navigateur.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="python"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="Alice;Développeuse">',
      '  <script type="text/plain" data-lab-starter>import json, sys',
      '',
      '# Zone libre : simulez, testez, prototypez vos algorithmes d\'API.',
      '# Rien de ce que vous écrirez ici n’est noté.',
      '#',
      '# Exemple proposé : simulateur de réponse d\'API JSON',
      'ligne = sys.stdin.readline().strip()',
      'nom, role = ligne.split(";") if ";" in ligne else ("Anonyme", "Visiteur")',
      '',
      'reponse = {',
      '    "statut": "succes",',
      '    "donnees": {',
      '        "nom": nom,',
      '        "role": role',
      '    },',
      '    "code": 200',
      '}',
      'print(json.dumps(reponse, indent=2))',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre : simulateur de réponse JSON</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Python 3</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans contrainte. Écris une fonction de validation, ' +
      'simule une table de routage ou teste un algorithme de sérialisation JSON sur des données personnalisées.</p>',
      '    <div class="lab__brief">',
      '      <p>Le code d’exemple simule l’assemblage d’une réponse d’API formatée en JSON à partir de l’entrée standard. ' +
      'Modifie l’entrée standard ci-dessous et clique sur <strong>Exécuter</strong> pour voir le résultat.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>Alice;Développeuse</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>{\n  "statut": "succes",\n  "donnees": {\n    "nom": "Alice",\n    "role": "Développeuse"\n  },\n  "code": 200\n}</pre></div>',
      '    </div>',
      '    <p class="lab__note">Déplie « Entrée du programme » et modifie les valeurs de test à volonté.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la logique algorithmique aux routes Flask</h2>',
    '  <p>Le moteur d’exécution évalue la logique Python pure de vos endpoints (parsing JSON, ' +
    'validation de schémas, formatage de codes de statut). Cette logique se transpose à l’identique ' +
    'dans vos vues <code>@app.route</code> réelles sur vos serveurs.</p>',
    box('pitfall', 'Les erreurs courantes décelées par l’atelier', 'warning', [
      '    <ul>',
      '      <li><strong>Oubli de gestion des clés absentes</strong> : privilégier <code>dict.get()</code> avec valeur par défaut plutôt que <code>dict[cle]</code> qui lève KeyError.</li>',
      '      <li><strong>Conversions de types non protégées</strong> : encadrer <code>int()</code> ou <code>float()</code> dans un bloc <code>try / except</code>.</li>',
      '      <li><strong>Guillemets JSON non conformes</strong> : se rappeler que JSON exige des guillemets doubles stricts.</li>',
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
    'durablement chaque concept du développement d’API.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 : API Web & HTTP' }),
    disclaimer(course, 'L’exécution repose sur le service d’exécution sécurisé de l’académie. ')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code : prototyper avec Flask & Python | ' + course.brand,
      description: 'Atelier de code du cours d’API REST avec Flask B2 : éditeur Monaco, exécution Python temps réel, entrée standard et console.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
