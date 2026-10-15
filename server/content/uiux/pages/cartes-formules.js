/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « UI/UX Design B2 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active UI/UX Design</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les principes indispensables : CCU, Double Diamant, Personas, lois de Fitts/Hick/Miller, Atomic Design, ergonomie tactile et accessibilité WCAG 2.1.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento Ergonomie' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours UI/UX Design B2 : notions clés des ' + chapterList.length + ' chapitres.',
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
    '  <h1>Mémento des Lois Ergonomiques, Méthodes &amp; Standards WCAG</h1>',
    '  <p class="lead">Guide de référence rapide : modélisations mathématiques de Fitts et Hick, 10 heuristiques de Nielsen, architecture Atomic Design, grille 8pt et critères d’accessibilité WCAG 2.1.</p>',
    '',
    '  <h2>1. Comparatif Fondamental UI vs UX</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th>Dimension</th>',
    '        <th>User Experience (UX)</th>',
    '        <th>User Interface (UI)</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>Focalisation</strong></td>',
    '        <td>Le parcours global, la facilité d’usage, les émotions et la résolution du besoin.</td>',
    '        <td>Le rendu visuel, la charte graphique, les interactions et le guidage perceptif.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Méthodes clés</strong></td>',
    '        <td>Entretiens, Personas, Customer Journey Map, Tri de cartes, Tests utilisateurs.</td>',
    '        <td>Design System, Palette de couleurs, Typographie, Grilles, Micro-animations.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Livrables</strong></td>',
    '        <td>Rapports de recherche, architectures de l’information, wireframes Lo-Fi.</td>',
    '        <td>Maquettes graphiques Hi-Fi (Figma), kits UI, prototypes animés.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Modèle du Double Diamant (Design Council)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th>Diamant</th>',
    '        <th>Phase</th>',
    '        <th>Mode cognitif</th>',
    '        <th>Activités majeures</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td rowspan="2"><strong>Diamant 1 : Le Problème</strong></td>',
    '        <td><strong>1. Découvrir</strong></td>',
    '        <td>Divergent (Explorer large)</td>',
    '        <td>Recherche terrain, entretiens exploratoires, benchmarking concurrentiel, immersion.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>2. Définir</strong></td>',
    '        <td>Convergent (Cadrer strict)</td>',
    '        <td>Synthèse des Personas, identification des Pain Points, cadrage du problème (How Might We).</td>',
    '      </tr>',
    '      <tr>',
    '        <td rowspan="2"><strong>Diamant 2 : La Solution</strong></td>',
    '        <td><strong>3. Développer</strong></td>',
    '        <td>Divergent (Multiplier les pistes)</td>',
    '        <td>Idéation, esquisses rapides, wireframing exploratoire, prototypage interactif.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>4. Livrer</strong></td>',
    '        <td>Convergent (Affiner et valider)</td>',
    '        <td>Tests d’utilisabilité finaux, spécifications pour développeurs, validation analytics.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Lois Mathématiques de l’Ergonomie Cognitive</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th>Loi</th>',
    '        <th>Formule mathématique</th>',
    '        <th>Implication ergonomique majeure</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>Loi de Fitts</strong></td>',
    '        <td><code>ID = log2(D / W + 1)</code><br><code>MT = a + b * ID</code></td>',
    '        <td>Le temps d’atteinte d’une cible dépend de la distance <code>D</code> et de sa largeur <code>W</code>. Les boutons critiques doivent être grands et proches. Les coins et bords d’écran ont une taille infinie sur desktop.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Loi de Hick-Hyman</strong></td>',
    '        <td><code>T = b * log2(n + 1)</code></td>',
    '        <td>Le temps de décision augmente logarithmiquement avec le nombre <code>n</code> d’alternatives. Découper les menus complexes en catégories hiérarchiques.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Loi de Miller</strong></td>',
    '        <td>Capacité : <code>7 &plusmn; 2 items</code></td>',
    '        <td>La mémoire de travail à court terme ne peut retenir simultanément que 5 à 9 informations. Structurer par blocs d’information (chunking).</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Loi de Jakob</strong></td>',
    '        <td>Principe de familiarité</td>',
    '        <td>Les utilisateurs passent la majeure partie de leur temps sur d’autres sites : respecter les conventions établies (panier, recherche, logo).</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Ratios de Contraste et Règles WCAG 2.1 (W3C)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th>Niveau de conformité</th>',
    '        <th>Texte standard (&lt; 24px)</th>',
    '        <th>Grand texte (&ge; 24px ou &ge; 18.5px gras)</th>',
    '        <th>Composants &amp; Icônes</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>Niveau AA (Obligation légale)</strong></td>',
    '        <td><strong>4.5 : 1</strong> minimum</td>',
    '        <td><strong>3.0 : 1</strong> minimum</td>',
    '        <td><strong>3.0 : 1</strong> minimum</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Niveau AAA (Excellence)</strong></td>',
    '        <td><strong>7.0 : 1</strong> minimum</td>',
    '        <td><strong>4.5 : 1</strong> minimum</td>',
    '        <td>Non spécifié</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'simulateur-examen.html', label: 'Passer les examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento Lois Ergonomiques &amp; WCAG — ' + course.brand,
      description: 'Formules de Fitts et Hick, Double Diamant, 10 heuristiques de Nielsen, grilles 8pt et ratios de contraste WCAG 2.1.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
