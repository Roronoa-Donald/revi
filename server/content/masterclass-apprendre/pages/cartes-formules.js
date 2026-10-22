/**
 * Pages « cartes de révision » et « mémo » du cours « Masterclass Apprendre à apprendre » B2.
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav } = require('./helpers');

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Cliquez sur une carte pour révéler la réponse. Objectif : répondre sans hésiter dans ' +
    'les deux sens pour ancrer durablement les concepts clés des sciences cognitives et des protocoles d’apprentissage efficient.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo des sciences cognitives' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision de la Masterclass Apprendre à apprendre B2 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo synthétique des sciences cognitives</h1>',
    '  <p class="lead">Toutes les lois fondamentales, équations de rétention mnésique, algorithmes de répétition espacée, ' +
    'règles de double codage et formules de calibration métacognitive réunis sur une seule page de référence.</p>',

    bloc('1. Architecture de la Mémoire &amp; Charge Cognitive (Sweller)', [
      '<pre><code>// Modèle modal d’Atkinson &amp; Shiffrin\n' +
      'Entrée sensorielle -&gt; [Mémoire Sensorielle] (&lt; 1 s) -&gt; Attention Sélective\n' +
      '                   -&gt; [Mémoire de Travail] (4 &plusmn; 1 items, 15-30 s sans répétition)\n' +
      '                   -&gt; Encodage / Consolidation synaptique -&gt; [Mémoire à Long Terme]\n\n' +
      '// Équation de la Charge Cognitive (John Sweller)\n' +
      'Charge Totale = Charge Intrinsèque + Charge Extrinsèque + Charge Essentielle (Germane)\n' +
      '- Charge Intrinsèque : complexité inhérente du concept (interactivité des éléments)\n' +
      '- Charge Extrinsèque : bruit pédagogique, mauvaise mise en page, distractions (à minimiser &agrave; 0)\n' +
      '- Charge Essentielle : effort investi dans la création de schémas mentaux pérennes\n' +
      'Règle d’or : Charge Totale &le; Capacité de la Mémoire de Travail (sinon surcharge cognitive)</code></pre>'
    ].join('\n')),

    bloc('2. Rappel Actif &amp; Protocole Feynman', [
      '<pre><code>// Testing Effect (Roediger &amp; Karpicke, 2006)\n' +
      'Rappel actif (effort de récupération libre) &gt;&gt; Relecture passive / Surlignage\n' +
      'Le signal de récupération renforce les voies neurales et prévient l’illusion de compétence.\n\n' +
      '// Les 4 étapes de la Technique Feynman\n' +
      '1. Choisir le concept cible et inscrire son intitulé en haut d’une page vierge.\n' +
      '2. L’expliquer par écrit comme à un enfant de 12 ans (bannir tout jargon ou acronyme).\n' +
      '3. Identifier précisément les blocages, hésitations et imprécisions conceptuelles.\n' +
      '4. Retourner aux sources fondamentales, clarifier et enrichir d’une analogie concrète.</code></pre>'
    ].join('\n')),

    bloc('3. Courbe de l’Oubli &amp; Algorithme SuperMemo SM-2', [
      '<pre><code>// Loi de rétention d’Hermann Ebbinghaus\n' +
      'R = e^(-t / S)\n' +
      'où R = probabilité de rétention (0 à 1), t = temps écoulé, S = force mnésique (stabilité).\n\n' +
      '// Algorithme SuperMemo SM-2 (Wozniak, 1987)\n' +
      'Note q &isin; {0, 1, 2, 3, 4, 5} attribuée par l’apprenant lors du rappel.\n' +
      'Facteur d’aisance révisé :\n' +
      'EF\' = max(1.3, EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))\n\n' +
      'Règle de récurrence des intervalles (en jours) :\n' +
      'Si q &lt; 3 : échec du rappel -&gt; répétition immédiate, I(1) = 1 jour, compteur réinitialisé.\n' +
      'Si q &ge; 3 : succès -&gt;\n' +
      '  - 1ère révision réussie : I(1) = 1 jour\n' +
      '  - 2ème révision réussie : I(2) = 6 jours\n' +
      '  - n-ième révision      : I(n) = round(I(n - 1) * EF)</code></pre>'
    ].join('\n')),

    bloc('4. Double Codage (Paivio) &amp; Palais de la Mémoire (Loci)', [
      '<pre><code>// Théorie du Double Codage d’Allan Paivio\n' +
      'Traces verbales (texte, audio) + Traces visuelles (croquis, cartes) = Récupération 2x plus robuste.\n\n' +
      '// Règles d’or de la Méthode des Loci (Palais Mnésique)\n' +
      '1. Choisir un lieu physique parfaitement connu et stable (appartement, campus, trajet).\n' +
      '2. Fixer un ordre de parcours unidirectionnel strict (ex. sens des aiguilles d’une montre).\n' +
      '3. Ancrer des images mentales grotesques, dynamiques, multisensorielles et disproportionnées.\n' +
      '4. Parcourir mentalement le trajet dans les deux sens pour consolider l’accès associatif.</code></pre>'
    ].join('\n')),

    bloc('5. Pratique Délibérée (Ericsson) &amp; Règle des 85 %', [
      '<pre><code>// Piliers de la Pratique Délibérée (K. Anders Ericsson)\n' +
      '- Sortie délibérée de la zone de confort (Zone Proximale de Développement).\n' +
      '- Objectif micro-spécifique mesurable (découpage atomique d’un geste technique).\n' +
      '- Concentration totale sans distraction (Deep Work en mode focus).\n' +
      '- Boucle de rétroaction (feedback) corrective immédiate.\n\n' +
      '// Règle des 85 % (Wilson et al., Nature Communications, 2019)\n' +
      'Taux d’erreur optimal pour maximiser la vitesse d’apprentissage = 15 % &plusmn; 2 %.\n' +
      'Taux de succès cible = 85 %.\n' +
      '- Taux &gt; 90 % : tâche trop facile, plateau d’apprentissage, temps sous-optimal.\n' +
      '- Taux &lt; 75 % : surcharge cognitive, découragement, bruit d’encodage.</code></pre>'
    ].join('\n')),

    bloc('6. Métacognition, Score de Brier &amp; Chronobiologie', [
      '<pre><code>// Calibration métacognitive &amp; Score de Brier (Glenn Brier, 1950)\n' +
      'B = (1 / N) * &sum; (f_i - o_i)^2\n' +
      'où f_i &isin; [0, 1] est la probabilité subjective estimée et o_i &isin; {0, 1} le résultat réel.\n' +
      'Score idéal = 0.0 (calibration parfaite). Score d’aléa pur (50 % au hasard) = 0.25.\n\n' +
      '// Rythmes Ultradiens &amp; Hygiène Sommeil\n' +
      '- Cycles BRAC : 90 min d’effort cognitif intense suivies de 15-20 min de diffusion reposante.\n' +
      '- Technique Pomodoro : 25 min focus / 5 min pause (pause longue 20 min après 4 cycles).\n' +
      '- Sommeil à Ondes Lentes (SWS) : transfert hippocampo-néocortical des mémoires déclaratives.\n' +
      '- Sommeil Paradoxal (REM) : intégration schématique, créativité et consolidation procédurale.</code></pre>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'exercices.html', label: 'Exercices et projet' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo des sciences cognitives — ' + course.brand,
      description: 'Mémo synthétique de la Masterclass Apprendre à apprendre B2 : lois de la mémoire, formules de rétention, SM-2, pratique délibérée et métacognition.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
