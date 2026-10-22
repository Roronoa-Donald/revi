/**
 * Pages accueil, sommaire et atelier du cours « ERP & SI » B2.
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
    '    <span class="tag tag--time">Systèmes d’Information &amp; ERP</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>comprendre l’architecture globale et le rôle névralgique d’un ERP au sein du système d’information ;</li>',
      '      <li>modéliser avec rigueur des processus métiers complexes selon le standard international BPMN 2.0 ;</li>',
      '      <li>concevoir des architectures d’intégration applicative (ESB, ETL/ELT, formats pivots EDIFACT/XML/JSON) ;</li>',
      '      <li>maîtriser les grands cycles d’entreprise (Procure-to-Pay, Order-to-Cash, Three-Way Matching, calcul MRP) ;</li>',
      '      <li>analyser les modules clés de l’ERP (Finance en partie double, valorisation CMUP/FIFO des stocks, CRM, SIRH) ;</li>',
      '      <li>piloter la conduite d’un projet ERP, évaluer sa matrice des risques et projeter l’urbanisation du SI.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Ce cours structure l’apprentissage des Progiciels de Gestion Intégrés en six chapitres progressifs : ' +
      'des principes fondateurs et de la modélisation des processus jusqu’à l’intégration technique et au déploiement en production. ' +
      'Le chapitre 1 est en accès libre.</p>',
      '    <p>Chaque chapitre propose <strong>trois exercices interactifs de manière méthodique</strong> simulant des algorithmes réels ' +
      'de gestion (contrôles d’intégrité, calculs de TVA, rapprochement de factures, planification MRP, valorisation des stocks, ' +
      'analyses de criticité des risques), exécutés directement dans votre navigateur et validés par des tests automatisés.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo ERP &amp; SI</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier pratique</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; Projet ERP</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'ERP & Systèmes d’Information B2 — Architecture SI, Processus Métiers, Intégration et Déploiement | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres pour maîtriser les progiciels de gestion intégrés et l’architecture des systèmes d’information, ' +
    'de l’analyse organisationnelle jusqu’au pilotage de projets complexes. Le chapitre 1 est en accès libre ; ' +
    'les suivants requièrent un compte de niveau B2 ou supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices de manière méthodique</strong> simulant des processus réels d’ERP. ' +
    'L’<a href="atelier.html">atelier de code</a> permet de tester et prototyper librement vos scripts de gestion.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres à mémoriser.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo ERP &amp; SI</span><br><span class="toc__d">Formules de gestion, flux comptables, syntaxe BPMN et équations MRP sur une seule page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet fil conducteur</span><br><span class="toc__d">18 exercices guidés et le déploiement simulé d’un ERP complet pour une PME.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier pratique</span><br><span class="toc__d">Écrire et exécuter du code Python directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets corrigés pour préparer les épreuves écrites et les cas pratiques d’examen.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours ERP & Systèmes d’Information B2 : ' + chapterList.length +
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
    '  <h1>Atelier pratique Python / Simulation ERP &amp; SI</h1>',
    '  <p class="lead">Un éditeur Monaco intégré à la page, relié au moteur d’exécution Python. Écrivez votre script, ' +
    'exécutez-le et observez immédiatement la sortie : l’outil idéal pour prototyper la logique de vos flux ERP.</p>',
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
      '     data-stdin="ART-501;Clavier Ergonomique;10;45.0;20.0">',
      '  <script type="text/plain" data-lab-starter># Grille d’analyse libre — erp-si\n# Zone d’étude et d’application méthodologique\n\n[Cas 1 — Étude préliminaire]\nANALYSE: CONFORME\nNOTE: Validation des prérequis et des critères méthodologiques.\n</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre : simulateur de valorisation d’une ligne de commande ERP</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Grille d’analyse</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans contrainte. Écrivez un calcul de réapprovisionnement Wilson, ' +
      'simule une règle de décrémentation de stock ou teste un parseur de message pivot JSON/XML.</p>',
      '    <div class="lab__brief">',
      '      <p>Le code d’exemple simule le calcul d’une ligne de commande commerciale (HT, TVA et TTC) à partir des données fournies dans le cas. ' +
      'Modifiez les données du cas ci-dessous et cliquez sur <strong>Exécuter</strong> pour observer la réponse JSON générée.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>ART-501;Clavier Ergonomique;10;45.0;20.0</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>{\n  "reference": "ART-501",\n  "designation": "Clavier Ergonomique",\n  "quantite": 10,\n  "prix_unitaire_ht": 45.0,\n  "total_ht": 450.0,\n  "taux_tva": 20.0,\n  "montant_tva": 90.0,\n  "total_ttc": 540.0\n}</pre></div>',
      '    </div>',
      '    <p class="lab__note">Déplie « Entrée du programme » et modifie les valeurs de test à volonté.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De l’algorithme aux modules de gestion intégrés</h2>',
    '  <p>L’automatisation des règles de gestion dans un ERP repose sur des briques algorithmiques précises : ' +
    'formules de valorisation d’inventaires, vérification de plafonds de crédit, génération automatique des écritures comptables ' +
    'et ordonnancement de production. L’atelier vous permet de concevoir et tester ces mécanismes pas à pas.</p>',
    box('pitfall', 'Les erreurs fréquentes dans les calculs de gestion', 'warning', [
      '    <ul>',
      '      <li><strong>Arrondis financiers prématurés</strong> : toujours réaliser les calculs intermédiaires en pleine précision et n’arrondir à 2 décimales qu’à l’étape finale de présentation.</li>',
      '      <li><strong>Confusion entre Hors Taxes et Toutes Taxes Comprises</strong> : veiller à calculer la TVA à partir du HT : <code>TTC = HT * (1 + Taux / 100)</code>.</li>',
      '      <li><strong>Gestion des valeurs nulles ou négatives</strong> : contrôler systématiquement que les quantités et prix sont strictement positifs lors de la saisie.</li>',
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
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 : Systèmes d’Information &amp; ERP' }),
    disclaimer(course, 'L’exécution repose sur le service d’exécution sécurisé de l’académie. ')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier pratique : simuler les flux ERP & SI avec Python | ' + course.brand,
      description: 'Atelier pratique du cours ERP & Systèmes d’Information B2 : éditeur Monaco, exécution Python en temps réel, entrée standard et console.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
