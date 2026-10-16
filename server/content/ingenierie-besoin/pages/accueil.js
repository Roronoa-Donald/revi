/**
 * Pages accueil, sommaire et atelier du cours « Ingénierie du besoin » B2.
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
    '    <span class="tag tag--time">Ingénierie des Exigences &amp; Analyse Métier</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>distinguer sans équivoque un besoin métier (espace problème) d’un choix technique prématuré (espace solution) ;</li>',
      '      <li>classifier les exigences selon FURPS+ et les formuler selon les critères normatifs ISO/IEC/IEEE 29148 ;</li>',
      '      <li>mener des campagnes d’élicitation rigoureuses (entretiens, observation terrain/shadowing, questionnaires et personas) ;</li>',
      '      <li>rédiger des User Stories agiles Connextra et arbitrer un backlog par les méthodes MoSCoW et WSJF ;</li>',
      '      <li>structurer un cahier des charges SRS normé, construire une matrice de traçabilité RTM et rédiger des scénarios Gherkin BDD ;</li>',
      '      <li>auditer les exigences selon la grille INVEST, mener des inspections Fagan et piloter les Change Requests via le comité CCB.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Ce cours structure l’ingénierie des exigences logicielles et systèmes en six chapitres progressifs : ' +
      'du recueil des attentes initiales et de la cartographie des parties prenantes jusqu’au contrôle qualité formel ' +
      'et à la gestion du changement. Le chapitre 1 est en accès libre.</p>',
      '    <p>Chaque chapitre propose <strong>trois exercices interactifs en Python</strong> simulant l’outillage ' +
      'd’un ingénieur des exigences (classification FURPS+, détecteur de mots vagues, calcul d’échantillon statistique, ' +
      'parseur Connextra, arbitrage MoSCoW, algorithme WSJF, matrice RTM, validateurs Gherkin et grilles INVEST), ' +
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
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo Ingénierie du besoin</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier pratique</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; Projet SRS</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Ingénierie du besoin B2 — Spécification d’Exigences, ISO 29148, Traçabilité RTM et BDD | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres pour maîtriser l’ingénierie des exigences logicielles et l’analyse métier, ' +
    'de la formulation du besoin initial jusqu’à la gestion du changement et l’audit qualité. Le chapitre 1 est en accès libre ; ' +
    'les suivants requièrent un compte de niveau B2 ou supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Python</strong> automatisant le contrôle et la modélisation des exigences. ' +
    'L’<a href="atelier.html">atelier de code</a> permet de tester et prototyper librement vos scripts d’analyse.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres à mémoriser.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo Ingénierie du besoin</span><br><span class="toc__d">Critères ISO 29148, taxonomie FURPS+, canevas Connextra, équation WSJF et inspection Fagan sur une seule page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet fil conducteur</span><br><span class="toc__d">18 exercices guidés et le dossier de spécification SRS complet pour la plateforme MediConnect.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier pratique</span><br><span class="toc__d">Écrire et exécuter du code Python directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets corrigés pour préparer les épreuves écrites et les études de cas d’ingénierie des exigences.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours Ingénierie du besoin B2 : ' + chapterList.length +
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
    '  <h1>Atelier pratique Python / Analyse d’Exigences</h1>',
    '  <p class="lead">Un éditeur Monaco intégré à la page, relié au moteur d’exécution Python. Écris ton script, ' +
    'exécute-le et observe immédiatement la sortie : l’outil idéal pour prototyper la validation automatisée de tes exigences.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre code Python 3 et affiche sa sortie standard et ses éventuelles erreurs.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>sys.stdin</code> recevra en entrée standard.</li>',
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
      '     data-stdin="BNK-AUTH-FR-001;Connexion biométrique;Le système doit authentifier l’utilisateur via empreinte digitale en moins de 500 ms;Must;8;3;5;2">',
      '  <script type="text/plain" data-lab-starter>import json, sys',
      '',
      '# Zone libre : simulez, prototypez des validateurs d’exigences (FURPS+, WSJF, RTM).',
      '# Rien de ce que vous écrirez ici n’est noté.',
      '#',
      '# Exemple proposé : auditeur d’exigence logicielle et calculateur de score WSJF',
      'ligne = sys.stdin.readline().strip()',
      'parts = ligne.split(";") if ";" in ligne else ("REQ-001", "Titre", "Le système doit répondre en moins de 1 s", "Must", "5", "3", "2", "2")',
      '',
      'code, titre, enonce, moscow, user_val, time_crit, risk_red, job_duration = parts',
      'user_val = float(user_val)',
      'time_crit = float(time_crit)',
      'risk_red = float(risk_red)',
      'job_duration = float(job_duration)',
      '',
      'cost_of_delay = user_val + time_crit + risk_red',
      'wsjf = round(cost_of_delay / job_duration, 2) if job_duration > 0 else 0.0',
      '',
      '# Vérification de conformité basique',
      'mots_vagues = ["rapide", "intuitif", "facile", "robuste", "convivial", "si possible"]',
      'termes_detectes = [m for m in mots_vagues if m in enonce.lower()]',
      'est_conforme = ("doit" in enonce.lower() or "shall" in enonce.lower()) and len(termes_detectes) == 0',
      '',
      'rapport = {',
      '    "identifiant": code,',
      '    "titre": titre,',
      '    "priorite_moscow": moscow,',
      '    "cost_of_delay": cost_of_delay,',
      '    "job_duration": job_duration,',
      '    "wsjf_score": wsjf,',
      '    "statut_qualite": "CONFORME" if est_conforme else "A_REFORMULER",',
      '    "mots_vagues_trouves": termes_detectes',
      '}',
      'print(json.dumps(rapport, indent=2, ensure_ascii=False))',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre : auditeur d’exigence et calculateur économique WSJF</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Python 3</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans contrainte. Écris un parseur d’exigence, ' +
      'teste des expressions régulières pour valider les codes IEEE ou calcule la matrice de couverture de test.</p>',
      '    <div class="lab__brief">',
      '      <p>Le code d’exemple évalue la conformité syntaxique d’une exigence et calcule son score de priorité économique WSJF. ' +
      'Modifie l’entrée standard ci-dessous et clique sur <strong>Exécuter</strong> pour observer le rapport JSON généré.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>BNK-AUTH-FR-001;Connexion biométrique;Le système doit authentifier l’utilisateur via empreinte digitale en moins de 500 ms;Must;8;3;5;2</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>{\n  "identifiant": "BNK-AUTH-FR-001",\n  "titre": "Connexion biométrique",\n  "priorite_moscow": "Must",\n  "cost_of_delay": 16.0,\n  "job_duration": 2.0,\n  "wsjf_score": 8.0,\n  "statut_qualite": "CONFORME",\n  "mots_vagues_trouves": []\n}</pre></div>',
      '    </div>',
      '    <p class="lab__note">Déplie « Entrée du programme » et modifie les valeurs de test à volonté.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la théorie aux outils automatisés d’audit d’exigences</h2>',
    '  <p>L’ingénierie moderne des exigences s’automatise : parseurs de User Stories, calculs de matrices de traçabilité, ' +
    'détecteurs de régression dans les critères d’acceptation Gherkin. L’atelier vous permet de concevoir et tester ces mécanismes pas à pas.</p>',
    box('pitfall', 'Les erreurs fréquentes dans la validation des exigences', 'warning', [
      '    <ul>',
      '      <li><strong>Adverbes non mesurables</strong> : bannir tout adjectif subjectif non adossé à un seuil chiffré (ms, %, requêtes/sec).</li>',
      '      <li><strong>Oubli des préconditions</strong> : un scénario de test d’acceptation n’a de valeur que si son état de départ (Given) est strictement reproductible.</li>',
      '      <li><strong>Déréférencement des identifiants</strong> : un code d’exigence modifié sans mise à jour de la RTM crée immédiatement des exigences orphelines.</li>',
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
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 : Besoin vs Exigence &amp; Parties Prenantes' }),
    disclaimer(course, 'L’exécution repose sur le service d’exécution sécurisé de l’académie. ')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier pratique : outillage Python pour l’ingénierie du besoin | ' + course.brand,
      description: 'Atelier pratique du cours Ingénierie du besoin B2 : éditeur Monaco, exécution Python en temps réel, entrée standard et console.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
