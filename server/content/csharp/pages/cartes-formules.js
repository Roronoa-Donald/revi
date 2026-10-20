/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « C# B2 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active</h1>',
    '  <p class="lead">36 fiches synthétiques pour consolider les concepts fondamentaux de C# : CLR, boxing, records, polymorphisme, LINQ, async/await et gestion IDisposable.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento C#' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours C# B2 : notions clés des ' + chapterList.length + ' chapitres.',
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
    '  <h1>Mémento C# Moderne &amp; Syntaxe de Référence .NET</h1>',
    '  <p class="lead">Guide opérationnel de synthèse : types CLR, modificateurs de passage, syntaxe LINQ, async/await et motifs POO avancés.</p>',
    '',
    '  <h2>1. Système de Types CLR &amp; Allocation Mémoire</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Catégorie</th><th>Types C#</th><th>Emplacement</th><th>Comportement lors de la copie</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Types Valeur (struct)</strong></td><td><code>int, double, bool, char, struct</code></td><td>Pile (Stack)</td><td>Copie intégrale bit à bit de la valeur</td></tr>',
    '      <tr><td><strong>Types Référence (class)</strong></td><td><code>string, object, class, record, List&lt;T&gt;</code></td><td>Tas managé (Heap)</td><td>Copie du pointeur de référence (adresse)</td></tr>',
    '      <tr><td><strong>Boxing</strong></td><td>Type valeur assigné à <code>object</code></td><td>Stack -&gt; Heap</td><td>Allocation d’un objet wrapper sur le tas</td></tr>',
    '      <tr><td><strong>Unboxing</strong></td><td>Cast explicite <code>(int)obj</code></td><td>Heap -&gt; Stack</td><td>Extraction de la valeur primitive vers la pile</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Modificateurs de Paramètres de Méthode</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Modificateur</th><th>Initialisation appelant</th><th>Obligation méthode appelée</th><th>Effet sur l’appelant</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Par valeur (défaut)</strong></td><td>Requise</td><td>Optionnelle</td><td>Aucun effet (copie locale isolée)</td></tr>',
    '      <tr><td><strong>ref</strong></td><td>Requise avant l’appel</td><td>Optionnelle</td><td>Modifie directement la variable de l’appelant</td></tr>',
    '      <tr><td><strong>out</strong></td><td>Non requise</td><td><strong>Obligatoire</strong> avant tout retour</td><td>Renvoie une valeur calculée à l’appelant</td></tr>',
    '      <tr><td><strong>in</strong></td><td>Requise</td><td>Interdiction de réassigner (lecture seule)</td><td>Passage par référence sans risque de mutation</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. POO Moderne : Classes, Records &amp; Polymorphisme</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Concept</th><th>Mot-clé / Syntaxe</th><th>Particularité clé</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Propriété Auto-implémentée</strong></td><td><code>public int Age { get; set; }</code></td><td>Génère un backing field privé automatique</td></tr>',
    '      <tr><td><strong>Record Immuable</strong></td><td><code>record Personne(string Nom, int Age);</code></td><td>Égalité structurelle par valeur native</td></tr>',
    '      <tr><td><strong>Clonage non destructif</strong></td><td><code>var p2 = p1 with { Age = 30 };</code></td><td>Crée une copie modifiée sans altérer p1</td></tr>',
    '      <tr><td><strong>Polymorphisme dynamique</strong></td><td><code>virtual</code> dans Base, <code>override</code> dans Dérivée</td><td>Résolution via la vtable au runtime</td></tr>',
    '      <tr><td><strong>Masquage de membre</strong></td><td><code>new</code> dans Dérivée</td><td>Liaison statique selon le type de la référence</td></tr>',
    '      <tr><td><strong>Interface explicite</strong></td><td><code>void ILogger.Log()</code></td><td>Accessible uniquement par cast vers l’interface</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Opérateurs LINQ Essentiels (Fluent API)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Méthode LINQ</th><th>Rôle principal</th><th>Type d’évaluation</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>.Where(predicate)</code></td><td>Filtrage conditionnel des éléments</td><td>Différée (Deferred Execution)</td></tr>',
    '      <tr><td><code>.Select(selector)</code></td><td>Projection et transformation de chaque élément</td><td>Différée (Deferred Execution)</td></tr>',
    '      <tr><td><code>.OrderBy / OrderByDescending</code></td><td>Tri croissant ou décroissant</td><td>Différée (Deferred Execution)</td></tr>',
    '      <tr><td><code>.GroupBy(keySelector)</code></td><td>Partitionnement en groupes clés-valeurs</td><td>Différée (Deferred Execution)</td></tr>',
    '      <tr><td><code>.ToList() / .ToArray()</code></td><td>Matérialisation en collection mémoire</td><td><strong>Immédiate (Terminal Operator)</strong></td></tr>',
    '      <tr><td><code>.Count() / .Sum() / .Average()</code></td><td>Calculs d’agrégation numérique</td><td><strong>Immédiate (Terminal Operator)</strong></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Programmation Asynchrone (TAP) &amp; IDisposable</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Construction</th><th>Signature</th><th>Comportement opérationnel</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>async Task&lt;T&gt;</code></td><td>Méthode asynchrone renvoyant T</td><td>Transformée par Roslyn en machine à états non bloquante</td></tr>',
    '      <tr><td><code>await</code></td><td>Opérateur d’attente non bloquante</td><td>Suspend la méthode et libère le thread appelant</td></tr>',
    '      <tr><td><code>Task.WhenAll(tasks)</code></td><td>Attente concurrente de N tâches</td><td>Agrège les échecs dans une <code>AggregateException</code></td></tr>',
    '      <tr><td><code>using (var res = ...)</code></td><td>Bloc de portée déterministe</td><td>Garantit l’appel de <code>Dispose()</code> dans un bloc finally</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'simulateur-examen.html', label: 'Simulateur d’examen B2' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento &amp; Syntaxe C# — ' + course.brand,
      description: 'Mémento des concepts clés de C# B2 : syntaxe, types, LINQ et asynchronisme.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
