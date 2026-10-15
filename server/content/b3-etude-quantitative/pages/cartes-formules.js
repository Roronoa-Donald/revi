/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Étude Quantitative & Qualitative B3 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active en Méthodologie de Recherche</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts clés : Paradigmes Positiviste vs Interprétativiste, Échantillonnage de Cochran, Conception de Questionnaires, Entretiens &amp; Focus Groups, Tests du Chi-deux &amp; Pearson, et Rédaction de Mémoire.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento des formules' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours d’Étude Quantitative & Qualitative B3 : notions clés et définitions des ' + chapterList.length + ' chapitres.',
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
    '  <h1>Mémento des Formules Statistiques &amp; Méthodologiques de Recherche</h1>',
    '  <p class="lead">Guide mathématique et méthodologique de référence : formule de Cochran, échantillonnage stratifié, métriques de Likert, test du Chi-deux d’indépendance, corrélation de Pearson et indice de Jaccard.</p>',
    '',
    '  <h2>1. Formules d’Échantillonnage Probabiliste (Cochran)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:25%">Concept / Équation</th>',
    '        <th style="width:35%">Formule Mathématique</th>',
    '        <th style="width:40%">Usage &amp; Paramètres</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>Taille d’échantillon (Pop. Infinie)</strong></td>',
    '        <td><code>n₀ = (z² · p · (1 - p)) / e²</code></td>',
    '        <td>z = score standardisé (1.96 à 95%), p = proportion attendue (0.5 par défaut), e = marge d’erreur souhaitée (ex. 0.05).</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Correction Population Finie</strong></td>',
    '        <td><code>n = n₀ / [1 + (n₀ - 1) / N]</code></td>',
    '        <td>Appliquée lorsque la taille de la population mère N est connue et restreinte (évite le surdimensionnement inutile).</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Scores Z usuels</strong></td>',
    '        <td>90% : z = 1.645 | 95% : z = 1.960 | 99% : z = 2.576</td>',
    '        <td>Plus le niveau de confiance est élevé, plus l’échantillon nécessaire augmente drastiquement.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Échantillonnage Stratifié Proportionnel</strong></td>',
    '        <td><code>Wₕ = Nₕ / N<br>nₕ = n · Wₕ</code></td>',
    '        <td>Chaque sous-groupe h est sondé proportionnellement à son poids démographique réel dans la population totale N.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Échelles de Mesure &amp; Statistique Descriptive</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:25%">Métrique</th>',
    '        <th style="width:35%">Formule Mathématique</th>',
    '        <th style="width:40%">Interprétation Opérationnelle</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>Moyenne Pondérée Likert</strong></td>',
    '        <td><code>μ = (1 / N) · ∑ (k · Nₖ)</code></td>',
    '        <td>Mesure la tendance centrale sur une échelle ordinale de 1 à 5 points (Nₖ = nombre de répondants pour la modalité k).</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Variance &amp; Écart-Type</strong></td>',
    '        <td><code>σ² = (1 / N) · ∑ Nₖ · (k - μ)²<br>σ = √(σ²)</code></td>',
    '        <td>Mesure la dispersion et le dissensus : un écart-type faible (&lt; 0.8) traduit un consensus fort entre répondants.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Taux d’Abandon (Drop-off)</strong></td>',
    '        <td><code>TA = ((Initiés - Complétés) / Initiés) · 100</code></td>',
    '        <td>Indicateur de fatigue : un taux &gt; 30% signale un questionnaire trop long, ambigu ou mal conçu.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Tests d’Hypothèses &amp; Analyse Bivariée</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:25%">Test Statistique</th>',
    '        <th style="width:35%">Formule</th>',
    '        <th style="width:40%">Règle de Décision</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>Test du Chi-deux (χ²) d’Indépendance</strong></td>',
    '        <td><code>χ² = ∑ [(Oᵢⱼ - Eᵢⱼ)² / Eᵢⱼ]<br>Eᵢⱼ = (Ligneᵢ · Colonneⱼ) / N</code></td>',
    '        <td>Pour 1 ddl à α = 0.05, seuil critique = 3.84. Si χ² &gt; 3.84, rejet de l’hypothèse nulle H₀ : liaison significative entre variables.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Corrélation Linéaire de Pearson (r)</strong></td>',
    '        <td><code>r = Cov(X,Y) / (σₓ · σᵧ)</code></td>',
    '        <td>Compris entre -1 et +1. |r| ≥ 0.70 : relation linéaire forte ; 0.30 ≤ |r| &lt; 0.70 : relation modérée ; |r| &lt; 0.30 : relation négligeable.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Indice de Similarité de Jaccard</strong></td>',
    '        <td><code>J = |A ∩ B| / |A ∪ B| = N_AB / (N_A + N_B - N_AB)</code></td>',
    '        <td>Mesure la proximité thématique et la co-occurrence de deux concepts qualitatifs dans un corpus textuel.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Accord Inter-Observateurs</strong></td>',
    '        <td><code>P₀ = (Accords / Total) · 100</code></td>',
    '        <td>Seuil de Miles &amp; Huberman : P₀ ≥ 85% garantit une grille d’observation exempte d’ambiguïtés sémantiques.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'examens.html', label: 'Passer aux examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento des formules — ' + course.brand,
      description: 'Formules et canevas méthodologiques du cours d’Étude Quantitative & Qualitative B3 : Cochran, Likert, Chi-deux, Pearson et Jaccard.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
