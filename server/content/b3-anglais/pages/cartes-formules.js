/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Anglais B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Anglais B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer le vocabulaire et les compétences opérationnelles : Acronymes IT, RFC 2119, Endpoints REST, Rédaction de Bug Reports, Daily Standups, Rétrospectives, SLAs, Support Client, Post-Mortems 5-Whys, Méthode STAR et Signposting.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Anglais B3 : Acronymes IT, RFC 2119, Agile, Support et Présentations des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento Technique &amp; Guide Opérationnel — Anglais B3</h1>',
    '  <p class="lead">Guide de référence des acronymes fondamentaux, clauses normatives RFC 2119, locutions de standup, formules de disponibilité SLA, matrice de sévérité ITIL, grille STAR et balises de présentation.</p>',
    '',
    '  <h2>1. Mots-clés Normatifs de la Spécification Technique (RFC 2119)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Mot-clé RFC 2119</th><th>Signification &amp; Exigence</th><th>Niveau de Priorité</th><th>Exemple d’application</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>MUST / REQUIRED / SHALL</strong></td><td>Exigence absolue et incontournable</td><td>P1 — Critique</td><td><code>The client MUST validate TLS certificates.</code></td></tr>',
    '      <tr><td><strong>MUST NOT / SHALL NOT</strong></td><td>Interdiction absolue</td><td>P1 — Critique</td><td><code>The proxy MUST NOT store decrypted tokens.</code></td></tr>',
    '      <tr><td><strong>SHOULD / RECOMMENDED</strong></td><td>Bonne pratique fortement conseillée</td><td>P2 — Recommandé</td><td><code>Endpoints SHOULD return standard JSON error schemas.</code></td></tr>',
    '      <tr><td><strong>SHOULD NOT / NOT RECOMMENDED</strong></td><td>Pratique déconseillée sauf justification</td><td>P2 — Recommandé</td><td><code>Applications SHOULD NOT expose stack traces in production.</code></td></tr>',
    '      <tr><td><strong>MAY / OPTIONAL</strong></td><td>Fonctionnalité optionnelle autorisée</td><td>P3 — Optionnel</td><td><code>The server MAY compress payloads using Gzip.</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Formules et Métriques de Disponibilité SLA (Uptime &amp; Downtime)</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Calcul du Temps de Panne Toléré</h4>',
    '      <p>Pour un mois de $D$ jours et un objectif de disponibilité de $T$ % :</p>',
    '      <p>$$\\text{Minutes Totales} = D \\times 24 \\times 60$$</p>',
    '      <p>$$\\text{Downtime Autorisé (min)} = \\text{Minutes Totales} \\times \\frac{100 - T}{100}$$</p>',
    '      <p>$$\\text{Heures Pénalisables} = \\left\\lceil \\frac{\\text{Downtime Réel} - \\text{Downtime Autorisé}}{60} \\right\\rceil$$</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Tableau de Référence Mensuel (Mois de 30 jours = 43 200 min)</h4>',
    '      <table class="table">',
    '        <thead><tr><th>Taux SLA</th><th>Dénomination</th><th>Downtime mensuel max</th></tr></thead>',
    '        <tbody>',
    '          <tr><td>99.0 %</td><td>Two nines</td><td>432 minutes (~7 h 12 min)</td></tr>',
    '          <tr><td>99.9 %</td><td>Three nines</td><td>43.2 minutes (~43 min)</td></tr>',
    '          <tr><td>99.95 %</td><td>High availability</td><td>21.6 minutes (~21 min)</td></tr>',
    '          <tr><td>99.99 %</td><td>Four nines</td><td>4.32 minutes (~4 min 19 s)</td></tr>',
    '          <tr><td>99.999 %</td><td>Five nines (Mission Critical)</td><td>25.9 secondes</td></tr>',
    '        </tbody>',
    '      </table>',
    '    </div>',
    '  </div>',
    '',
    '  <h2>3. Matrice de Sévérité des Incidents (ITIL Severity Matrix)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Sévérité</th><th>Désignation</th><th>Impact &amp; Urgence</th><th>SLA Réponse</th><th>SLA Résolution</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>SEV-1</strong></td><td>Critical Outage</td><td>Impact Critique + Urgence Immédiate</td><td>15 minutes</td><td>4 heures</td></tr>',
    '      <tr><td><strong>SEV-2</strong></td><td>Major Incident</td><td>Impact Majeur + Urgence Haute/Immédiate</td><td>30 minutes</td><td>8 heures</td></tr>',
    '      <tr><td><strong>SEV-3</strong></td><td>Minor Incident</td><td>Impact Modéré + Urgence Normale</td><td>2 heures</td><td>24 heures</td></tr>',
    '      <tr><td><strong>SEV-4</strong></td><td>Cosmetic / Low</td><td>Impact Faible + Urgence Basse</td><td>8 heures</td><td>72 heures</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Boîte à Outils des Daily Standups &amp; Rétrospectives Agiles</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Daily Standup Meeting Toolkit</h4>',
    '      <ul>',
    '        <li><strong>Yesterday :</strong> <i>"Yesterday, I wrapped up the auth refactoring..."</i>, <i>"I pushed the PR for database indexing..."</i></li>',
    '        <li><strong>Today :</strong> <i>"Today, I will focus on writing unit tests..."</i>, <i>"I am pairing with Alex on the Redis cache..."</i></li>',
    '        <li><strong>Blockers :</strong> <i>"I am currently blocked by missing AWS IAM permissions..."</i>, <i>"No blockers on my side, all good."</i></li>',
    '        <li><strong>Interruption polie :</strong> <i>"Could I just jump in for a second?"</i>, <i>"If I could add to that..."</i></li>',
    '      </ul>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Présentations &amp; Balisage Verbal (Signposting)</h4>',
    '      <ul>',
    '        <li><strong>Starting :</strong> <i>"Today, I’d like to talk about..."</i>, <i>"The purpose of this talk is to..."</i></li>',
    '        <li><strong>Outlining :</strong> <i>"I have divided my presentation into three main parts..."</i></li>',
    '        <li><strong>Transitions :</strong> <i>"Moving on to our architecture..."</i>, <i>"Turning now to the performance benchmarks..."</i></li>',
    '        <li><strong>Concluding :</strong> <i>"To sum up, our solution cut latency by 40%..."</i>, <i>"I’d be happy to take questions."</i></li>',
    '      </ul>',
    '    </div>',
    '  </div>',
    '',
    '  <h2>5. Méthode STAR pour les Entretiens d’Embauche Internationaux</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Étape</th><th>Signification</th><th>Question Clé</th><th>Formulation Recommandée</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>S — Situation</strong></td><td>Contexte &amp; cadre initial</td><td>Où et quand l’événement s’est-il déroulé ?</td><td><i>"During the migration of our monolith to microservices..."</i></td></tr>',
    '      <tr><td><strong>T — Task</strong></td><td>Mission &amp; défi technique</td><td>Quel était votre objectif précis ?</td><td><i>"My task was to eliminate memory leaks causing daily worker crashes..."</i></td></tr>',
    '      <tr><td><strong>A — Action</strong></td><td>Actions personnelles menées</td><td>Quelles décisions et implémentations avez-vous portées ?</td><td><i>"I profiled heap allocations, identified unclosed sockets, and refactored..."</i></td></tr>',
    '      <tr><td><strong>R — Result</strong></td><td>Impact quantifié &amp; mesurable</td><td>Quel est le résultat chiffré obtenu ?</td><td><i>"We reduced memory usage by 65% and achieved 99.99% worker uptime."</i></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'examens.html', label: 'Accéder aux examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Formules, Vocabulaire &amp; Mémento — ' + course.brand,
      description: 'Mémento d’anglais technique B3 : RFC 2119, formules de disponibilité SLA, méthode STAR et signposting.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
