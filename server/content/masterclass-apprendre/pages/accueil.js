/**
 * Pages accueil, sommaire et atelier du cours « Masterclass Apprendre à apprendre » B2.
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
    '    <span class="tag tag--time">Sciences Cognitives &amp; Efficacité</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>comprendre le fonctionnement neurobiologique de la mémoire humaine et protéger sa mémoire de travail (Sweller) ;</li>',
      '      <li>déjouer l’illusion de compétence en pratiquant le rappel actif systématique et la méthode Feynman ;</li>',
      '      <li>maîtriser et implémenter les algorithmes de répétition espacée (Leitner, SuperMemo SM-2) pour contrer la courbe d’Ebbinghaus ;</li>',
      '      <li>structurer ses connaissances grâce au double codage de Paivio, aux Mind Maps et à la méthode des Loci (Palais de mémoire) ;</li>',
      '      <li>développer une expertise durable par la pratique délibérée d’Anders Ericsson et l’entrelacement des contextes ;</li>',
      '      <li>optimiser sa métacognition (Flavell), son étalonnage (Brier) et caler ses routines sur ses rythmes ultradiens (Pomodoro).</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Ce cours structure les sciences de l’apprentissage en six chapitres progressifs : ' +
      'des mécanismes synaptiques élémentaires et de l’extraction active jusqu’à la modélisation algorithmique ' +
      'de la répétition espacée et au pilotage métacognitif. Le chapitre 1 est en accès libre.</p>',
      '    <p>Chaque chapitre propose <strong>trois exercices interactifs de manière méthodique</strong> modélisant les calculs ' +
      'des sciences cognitives (charge cognitive de Sweller, chunking de Miller, audit Feynman, courbe d’Ebbinghaus, ' +
      'boîtes de Leitner, facteur SM-2, double codage, méthode des Loci, entrelacement, règle des 85 % et score de Brier), ' +
      'exécutés directement dans votre navigateur et validés par des tests automatisés.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo des Sciences de l’Apprentissage</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier pratique</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; Protocole de Révision</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Masterclass Apprendre à apprendre B2 — Sciences Cognitives, Rappel Actif et Répétition Espacée | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres pour maîtriser les méthodes d’apprentissage fondées sur les preuves, ' +
    'de la neuroplasticité synaptique jusqu’à l’auto-régulation métacognitive. Le chapitre 1 est en accès libre ; ' +
    'les suivants requièrent un compte de niveau B2 ou supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices de manière méthodique</strong> simulant des modèles et algorithmes mnésiques. ' +
    'L’<a href="atelier.html">atelier de code</a> permet de tester et prototyper librement vos scripts cognitifs.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres à mémoriser.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo Apprendre à apprendre</span><br><span class="toc__d">Formule Ebbinghaus, équation SM-2, loi de Sweller, modèle Paivio et score Brier sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; protocole de révision</span><br><span class="toc__d">18 exercices guidés et le plan de mémorisation complet pour réussir ses semestres d’ingénierie.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier pratique</span><br><span class="toc__d">Écrire et exécuter du code Python directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets corrigés pour préparer les épreuves écrites et les cas pratiques de sciences cognitives.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours Masterclass Apprendre à apprendre B2 : ' + chapterList.length +
        ' chapitres, exercices Python interactifs, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier pratique Python / Algorithmes d’Apprentissage</h1>',
    '  <p class="lead">Un éditeur Monaco intégré à la page, relié au moteur d’exécution Python. Écrivez votre script, ' +
    'exécutez-le et observez immédiatement la sortie : l’outil idéal pour programmer des moteurs de révision espacée et de diagnostic mnésique.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> vérifie votre grille d’analyse sur le cas d’exemple et affiche le résultat obtenu.</li>',
      '      <li><strong>Données du cas</strong> présente les paramètres soumis à votre analyse.</li>',
      '      <li><strong>Expliquer mon erreur</strong> sollicite le tuteur IA pour comprendre l’origine d’un dysfonctionnement sans dévoiler la solution.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script directement depuis l’éditeur.</li>',
      '      <li>Vos modifications sont automatiquement sauvegardées dans votre navigateur.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="analyse"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="CARD-777;2.5;4;3;8">',
      '  <script type="text/plain" data-lab-starter># Grille d’analyse libre — masterclass-apprendre\n# Zone d’étude et d’application méthodologique\n\n[Cas 1 — Étude préliminaire]\nANALYSE: CONFORME\nNOTE: Validation des prérequis et des critères méthodologiques.\n</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre : simulateur combiné SM-2 &amp; Rétention d’Ebbinghaus</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Grille d’analyse</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans contrainte. Écrivez un planificateur de révision, ' +
      'simule la décroissance exponentielle de l’oubli ou teste un calculateur de charge cognitive de Sweller.</p>',
      '    <div class="lab__brief">',
      '      <p>Le code d’exemple applique l’algorithme SM-2 de Wozniak et calcule la probabilité de rétention restante selon Ebbinghaus. ' +
      'Modifiez les données du cas ci-dessous et cliquez sur <strong>Exécuter</strong> pour observer la réponse JSON générée.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>CARD-777;2.5;4;3;8</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>{\n  "carte_id": "CARD-777",\n  "ancien_ef": 2.5,\n  "note_q": 4,\n  "nouveau_ef": 2.5,\n  "temps_ecoule_jours": 3.0,\n  "stabilite_jours": 8.0,\n  "retention_estimee_pct": 68.7,\n  "action_recommandee": "EN_MEMOIRE"\n}</pre></div>',
      '    </div>',
      '    <p class="lab__note">Déplie « Entrée du programme » et modifie les valeurs de test à volonté.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la science cognitive aux algorithmes d’apprentissage</h2>',
    '  <p>L’apprentissage d’élite n’est pas une question d’inspiration passagère mais d’architecture systématique : ' +
    'modélisations mathématiques de la trace synaptique, planification par intervalles optimaux et étalonnage métacognitif. ' +
    'L’atelier vous permet de concevoir et tester ces mécanismes pas à pas.</p>',
    box('pitfall', 'Les erreurs fréquentes dans la programmation d’algorithmes mnésiques', 'warning', [
      '    <ul>',
      '      <li><strong>Oubli du plancher SM-2</strong> : veiller à ce que le facteur d’aisance ne descende jamais sous 1.30, sous peine de bloquer la carte dans un cycle infini.</li>',
      '      <li><strong>Division par zéro sur la stabilité</strong> : s’assurer que la stabilité mnésique $S$ est strictement positive avant de calculer l’exponentielle.</li>',
      '      <li><strong>Confiance excessive dans le déclaratif</strong> : un modèle d’espacement doit toujours être recalibré sur les résultats réels des tests d’extraction.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Architecture technique du bac à sable', 'terminal', [
      '    <ul>',
      '      <li>Votre grille d’analyse est exécuté dans un conteneur sécurisé et isolé.</li>',
      '      <li>Toutes les exécutions respectent les quotas de sécurité de la plateforme.</li>',
      '      <li>La console intégrée sous l’éditeur restitue instantanément la sortie standard et les traces d’erreurs.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Chacun des ' + course.chapters.length + ' chapitres propose trois exercices ciblés pour mettre ' +
    'en pratique les concepts théoriques et opérationnels du cours.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 : Neurobiologie &amp; Architecture des Mémoires' }),
    disclaimer(course, 'L’exécution repose sur le service d’exécution sécurisé de l’académie. ')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier pratique : simuler les algorithmes d’apprentissage avec Python | ' + course.brand,
      description: 'Atelier pratique du cours Masterclass Apprendre à apprendre B2 : éditeur Monaco, exécution Python en temps réel, entrée standard et console.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
