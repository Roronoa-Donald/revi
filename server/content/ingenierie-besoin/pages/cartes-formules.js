/**
 * Pages « cartes de révision » et « mémo » du cours « Ingénierie du besoin » B2.
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
    '  <p class="lead">Clique sur une carte pour révéler la réponse. Objectif : répondre sans hésiter dans ' +
    'les deux sens pour ancrer durablement les concepts clés de l’ingénierie des exigences et de l’analyse métier.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo Ingénierie du besoin' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Ingénierie du besoin B2 : notions clés des ' +
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
    '  <h1>Mémo synthétique Ingénierie du besoin</h1>',
    '  <p class="lead">Toutes les normes, formules d’échantillonnage, canevas de User Stories, équations WSJF et ' +
    'critères de contrôle qualité réunis sur une seule page de référence.</p>',

    bloc('1. Normes &amp; Cycle de vie RE (ISO/IEC/IEEE 29148)', [
      '<pre><code>// Les 4 macro-activités itératives de l’ingénierie des exigences\n' +
      '1. Élicitation (Recueil)   : entretiens, observation terrain (shadowing), ateliers JAD, sondages\n' +
      '2. Analyse &amp; Négociation   : arbitrage des conflits, détection d’ambiguïtés, priorisation\n' +
      '3. Spécification           : rédaction SRS normée, codification immuable, User Stories\n' +
      '4. Validation &amp; Gestion    : revues formelles Fagan, matrice RTM, Change Requests (CR), Baselines\n\n' +
      '// Matrice Pouvoir / Intérêt de Mendelow\n' +
      'Pouvoir Fort  + Intérêt Fort   -&gt; Gérer de près (Manage Closely)\n' +
      'Pouvoir Fort  + Intérêt Faible -&gt; Garder satisfait (Keep Satisfied)\n' +
      'Pouvoir Faible + Intérêt Fort  -&gt; Garder informé (Keep Informed)\n' +
      'Pouvoir Faible + Intérêt Faible-&gt; Surveiller avec effort minimal (Monitor)</code></pre>'
    ].join('\n')),

    bloc('2. Classification FURPS+ &amp; Qualité ISO 29148', [
      '<pre><code>// Taxonomie FURPS+\n' +
      'F (Functionality) : services métier, fonctionnalités, sécurité, calculs\n' +
      'U (Usability)     : ergonomie, accessibilité, temps d’apprentissage (&lt; 3 clics)\n' +
      'R (Reliability)   : disponibilité (ex. 99,9 %), MTBF, tolérance aux pannes\n' +
      'P (Performance)   : latence (&lt; 500 ms à 95 %), débit (transactions/s)\n' +
      'S (Supportability): maintenabilité, modularité, couverture de tests, portabilité\n' +
      '+ (Contraintes)   : contraintes techniques d’environnement, d’interface et légales (RGPD)\n\n' +
      '// Règle d’or de rédaction\n' +
      'Bannir les termes subjectifs : « rapide », « intuitif », « facile », « moderne », « si possible ».\n' +
      'Utiliser le verbe normatif obligatoire : « Le système doit... » (Shall).</code></pre>'
    ].join('\n')),

    bloc('3. Dimensionnement d’échantillon d’enquête (Taro Yamane)', [
      '<pre><code>// Formule de Taro Yamane pour population finie N et marge d’erreur e\n' +
      'n = N / (1 + N * e^2)\n\n' +
      '// Exemples types (avec e = 0,05 soit 5 % d’erreur tolérée) :\n' +
      'Pour N = 500   -&gt; n = 500   / (1 + 500   * 0,0025) = 500   / 2,25 &asymp; 222 répondants\n' +
      'Pour N = 2 000 -&gt; n = 2 000 / (1 + 2 000 * 0,0025) = 2 000 / 6,00 &asymp; 334 répondants\n' +
      'Pour N = 10 000-&gt; n = 10 000/ (1 + 10 000* 0,0025) = 10 000/ 26,0 &asymp; 385 répondants</code></pre>'
    ].join('\n')),

    bloc('4. Modélisation Agile &amp; Arbitrage MoSCoW', [
      '<pre><code>// Canevas Connextra\n' +
      'En tant que &lt;rôle / persona&gt;,\n' +
      'Je veux &lt;action ou capacité souhaitée&gt;,\n' +
      'Afin de &lt;bénéfice métier mesurable / valeur ajoutée&gt;.\n\n' +
      '// Règle budgétaire MoSCoW 60 / 20 / 20\n' +
      'Must have   : &le; 60 % de l’effort total (vital, non négociable)\n' +
      'Should have : &asymp; 20 % de l’effort total (important, contournement possible)\n' +
      'Could have  : &asymp; 20 % de l’effort total (confort, variable d’ajustement)\n' +
      'Won’t have  : exclu de l’itération courante (gardé en backlog pour plus tard)</code></pre>'
    ].join('\n')),

    bloc('5. Priorisation économique WSJF (SAFe)', [
      '<pre><code>// Algorithme Weighted Shortest Job First\n' +
      'WSJF = Cost_of_Delay / Job_Duration\n\n' +
      '// Composantes du Coût du Retard (Cost of Delay)\n' +
      'Cost_of_Delay = User_Business_Value + Time_Criticality + Risk_Reduction_Opportunity_Enablement\n\n' +
      '// Règle d’ordonnancement\n' +
      'L’élément avec le score WSJF le plus élevé est traité en priorité absolue (High Value / Short Duration).</code></pre>'
    ].join('\n')),

    bloc('6. Traçabilité RTM, BDD &amp; Grille INVEST', [
      '<pre><code>// Codification formelle ISO\n' +
      '[PROJET]-[MODULE]-[TYPE]-[NUMÉRO]  -&gt; Ex. MEDI-RDV-FR-001\n\n' +
      '// Matrice de Traçabilité RTM\n' +
      'Traçabilité Amont (Forward)  : Besoin Client -&gt; Exigence SRS -&gt; Code -&gt; Test (Évite les oublis)\n' +
      'Traçabilité Aval (Backward)  : Test / Code -&gt; Exigence SRS -&gt; Besoin Client (Évite le Gold Plating)\n\n' +
      '// Syntaxe Gherkin BDD\n' +
      'Étant donné que (Given) [contexte initial]\n' +
      'Quand (When)            [action déclenchante]\n' +
      'Alors (Then)            [résultat observable attendu]\n\n' +
      '// Grille INVEST pour User Stories\n' +
      'I = Independent  | N = Negotiable | V = Valuable\n' +
      'E = Estimable    | S = Small      | T = Testable</code></pre>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'exercices/exercices.html', label: 'Exercices &amp; Projet SRS' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo Ingénierie du besoin — ' + course.brand,
      description: 'Fiche mémo synthétique du cours Ingénierie du besoin B2 : ISO 29148, FURPS+, formule Yamane, Connextra, MoSCoW, WSJF, RTM et grille INVEST.',
      active: 'memo',
      body
    }
  };
}

module.exports = { cartes, formules };
