/**
 * Chapitre 1 du cours « C# » B2 — Fondamentaux C# et Écosystème .NET.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondamentaux C# et Écosystème .NET',
  short: 'Fondamentaux &amp; CLR',
  toc: 'Architecture du Common Language Runtime (CLR), compilation JIT, typage fort, types valeur vs types référence, boxing/unboxing, passage par valeur/ref/out et pattern matching moderne.',
  time: '≈ 2 h 45 de travail',
  free: true,

  situation:
    'Une équipe de développement refond le moteur d’un système bancaire haute fréquence sous .NET 8. ' +
    'Dans la version précédente, des millions de conversions implicites entre types primitifs et objets ont saturé le Garbage Collector, ' +
    'provoquant des micro-pauses inacceptables en production. ' +
    'L’équipe doit comprendre l’anatomie exacte de la mémoire CLR, distinguer la pile (Stack) du tas (Heap), ' +
    'éradiquer le boxing/unboxing inutile, maîtriser le passage d’arguments par référence (ref, out, in) ' +
    'et adopter le pattern matching moderne introduit dans les dernières versions du langage C#. ' +
    'Ce premier module pose les bases indispensables de l’ingénierie logicielle C# professionnelle.',

  objectives: [
    'comprendre le cycle de compilation C# (Roslyn, CIL/MSIL, CLR et compilation JIT) ;',
    'distinguer la pile (Stack) du tas managé (Heap) et maîtriser les types valeur (struct) vs types référence (class) ;',
    'identifier et prévenir les opérations coûteuses de boxing et unboxing ;',
    'manipuler les modificateurs de paramètres de méthode : passage par valeur, ref, out et in ;',
    'exploiter le pattern matching moderne dans les expressions switch avec gardes conditionnels when.'
  ],

  sections: [
    {
      title: 'L’Écosystème .NET &amp; Le Common Language Runtime (CLR)',
      html: [
        '<p>Le langage C# est compilé en deux étapes distinctes :</p>',
        '<ol>',
        '  <li><strong>Compilation statique (Roslyn) :</strong> Le code source C# est transformé par le compilateur Roslyn en un langage intermédiaire standardisé appelé <strong>CIL</strong> (<em>Common Intermediate Language</em>, anciennement MSIL), encapsulé dans un assemblage (binaire portable <code>.dll</code> ou <code>.exe</code>) accompagné de métadonnées riches.</li>',
        '  <li><strong>Exécution &amp; Compilation JIT (CLR) :</strong> Lors de l’exécution, le <strong>Common Language Runtime (CLR)</strong> charge l’assemblage. Le compilateur JIT (<em>Just-In-Time</em>) traduit le code CIL à la volée en instructions machine natives adaptées à l’architecture matérielle cible (x86_64, ARM64).</li>',
        '</ol>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Responsabilités de la CLR</h4>',
        '    <ul>',
        '      <li><strong>Gestion de la mémoire :</strong> Allocation automatique et ramasse-miettes (<em>Garbage Collector</em>).</li>',
        '      <li><strong>Sécurité des types :</strong> Vérification stricte des conversions et prévention des dépassements de mémoire tampon.</li>',
        '      <li><strong>Gestion des exceptions :</strong> Routage structuré des erreurs à travers les blocs managés.</li>',
        '      <li><strong>Orchestration des threads :</strong> ThreadPool managé pour la concurrence légère.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Avantages du modèle managé</h4>',
        '    <ul>',
        '      <li><strong>Portabilité multiplateforme :</strong> Le même CIL s’exécute sur Linux, macOS et Windows sans recompilation.</li>',
        '      <li><strong>Optimisations JIT dynamiques :</strong> Profiling en cours d’exécution (Tiered Compilation) et vectorisation SIMD native.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Système de Types : Pile (Stack) vs Tas (Heap)',
      html: [
        '<p>En C#, tout type dérive directement ou indirectement de <code>System.Object</code>. Cependant, la gestion mémoire divise le système de types en deux familles fondamentales :</p>',

        '<table class="table">',
        '  <thead><tr><th>Caractéristique</th><th>Types Valeur (Value Types)</th><th>Types Référence (Reference Types)</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Définition C#</strong></td><td><code>struct</code>, <code>enum</code>, primitifs (<code>int, double, bool, char</code>)</td><td><code>class</code>, <code>interface</code>, <code>delegate</code>, <code>record</code>, <code>string</code>, tableaux</td></tr>',
        '    <tr><td><strong>Emplacement mémoire</strong></td><td>Directement sur la <strong>Pile (Stack)</strong> (ou encapsulé dans un objet hôte)</td><td>Sur le <strong>Tas managé (Heap)</strong> ; seule la référence (adresse) est sur la pile</td></tr>',
        '    <tr><td><strong>Sémantique d’assignation</strong></td><td><strong>Copie par valeur :</strong> la valeur brute est clonée bit à bit</td><td><strong>Copie par référence :</strong> seul le pointeur mémoire est dupliqué vers le même objet</td></tr>',
        '    <tr><td><strong>Cycle de vie</strong></td><td>Détruit immédiatement à la sortie du scope d’exécution (désempilement ultra-rapide)</td><td>Géré par le Garbage Collector (GC) selon les générations d’objets (Gen 0, 1, 2)</td></tr>',
        '    <tr><td><strong>Support de null</strong></td><td>Non nullable par défaut (sauf <code>Nullable&lt;T&gt;</code> ou <code>int?</code>)</td><td>Nullable par défaut (supporte <code>null</code>)</td></tr>',
        '  </tbody>',
        '</table>',

        box('situation', 'Modèle mental intuitif — Le Post-it vs L’étiquette d’entrepôt', [
          '<p>Pour ne plus jamais confondre <strong>Type Valeur</strong> et <strong>Type Référence</strong> :</p>',
          '<ul>',
          '  <li><strong>Type Valeur (sur la Pile) :</strong> comme un message écrit sur un <em>Post-it</em>. Quand vous passez la variable à une méthode ou une autre variable, vous photocopiez le Post-it. Le destinataire a son propre papier : s’il le rature, votre Post-it initial reste intact.</li>',
          '  <li><strong>Type Référence (sur le Tas) :</strong> comme une étiquette portant l’adresse d’un meuble dans un entrepôt. L’objet volumineux vit sur le Tas. Quand vous passez la variable, vous ne déplacez pas les meubles : vous photocopiez seulement l’étiquette d’adresse. Si le destinataire va dans l’entrepôt et repeint le meuble en rouge, vous retrouvez également le meuble repeint.</li>',
          '</ul>'
        ].join('\n')),

        box('warning', 'Le piège de performance du Boxing / Unboxing', [
          '<p>Le <strong>boxing</strong> se produit lorsqu’un type valeur est converti implicitement ou explicitement en un type référence (notamment <code>object</code> ou une interface). ' +
          'La CLR doit allouer un nouvel objet sur le tas, copier la valeur de la pile vers cet objet et renvoyer une référence.<br>' +
          'L’<strong>unboxing</strong> extrait la valeur contenue dans cet objet vers la pile via un cast explicite (ex: <code>(int)obj</code>).<br>' +
          '<strong>Règle d’or :</strong> Bannissez le boxing dans les boucles critiques en exploitant systématiquement les collections génériques typées (<code>List&lt;int&gt;</code> plutôt que <code>ArrayList</code>).</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Passage d’Arguments de Méthode : val, ref, out &amp; in',
      html: [
        '<p>Par défaut, C# passe tous les arguments <strong>par valeur</strong> : une copie de la variable locale est transmise à la méthode. C# propose trois modificateurs avancés :</p>',

        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4 class="card-title">Le mot-clé ref</h4>',
        '    <p>Passez une référence directe vers la variable de l’appelant. La variable <strong>doit être initialisée avant l’appel</strong>. Toute modification au sein de la méthode altère la variable d’origine.</p>',
        '    <pre><code class="language-csharp">void Incrementer(ref int x) {\n    x += 1;\n}</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Le mot-clé out</h4>',
        '    <p>Utilisé pour renvoyer des valeurs calculées. La variable n’a pas besoin d’être initialisée avant l’appel, mais la méthode <strong>a l’obligation absolue d’assigner une valeur</strong> avant de terminer.</p>',
        '    <pre><code class="language-csharp">bool Diviser(int a, int b, out int q) {\n    if (b == 0) { q = 0; return false; }\n    q = a / b;\n    return true;\n}</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Le mot-clé in</h4>',
        '    <p>Passez une référence en <strong>lecture seule</strong>. Idéal pour passer de grosses structures (<code>struct</code> volumineuses) sans le coût de copie, tout en interdisant toute mutation par la méthode.</p>',
        '    <pre><code class="language-csharp">double Distance(in Point3D p1, in Point3D p2) {\n    // p1 et p2 ne peuvent pas être modifiés\n}</code></pre>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Pattern Matching &amp; Switch Expressions Modernes',
      html: [
        '<p>Depuis C# 8, les instructions <code>switch</code> peuvent être exprimées sous forme d’<strong>expressions switch concises</strong> combinées avec un puissant moteur de filtrage par motif (<em>pattern matching</em>) :</p>',

        '<pre><code class="language-csharp">string resultat = forme switch {\n' +
        '    Circle c when c.Radius &gt; 10 =&gt; $"Grand cercle ({c.Radius})",\n' +
        '    Circle c =&gt; $"Petit cercle ({c.Radius})",\n' +
        '    Rectangle r when r.Width == r.Height =&gt; $"Carré de côté {r.Width}",\n' +
        '    Rectangle r =&gt; $"Rectangle {r.Width}x{r.Height}",\n' +
        '    _ =&gt; "Forme inconnue" // Discard par défaut\n' +
        '};</code></pre>',

        '<p>Cette syntaxe garantit :</p>',
        '<ul>',
        '  <li>L’exhaustivité des cas vérifiée par le compilateur (avertissement si une branche est omise) ;</li>',
        '  <li>L’intégration de conditions booléennes arbitraires via la clause <code>when</code> ;</li>',
        '  <li>L’extraction automatique (déconstruction) des variables typées sans cast manuel intermédiaire.</li>',
        '</ul>',

        box('tech', 'Atelier pratique &amp; Outillage professionnel .NET', [
          '<p>Dans le monde professionnel, vos applications C# s’orchestrent avec le SDK .NET officiel : ' +
          '<code>dotnet new console</code>, <code>dotnet build</code> et <code>dotnet run</code>.</p>' +
          '<p>Sur cette plateforme d’apprentissage, les ateliers de code interactifs évaluent votre maîtrise conceptuelle et algorithmique ' +
          '(simulation d’allocation mémoire, analyse des règles de typage et détection de boxing) afin de garantir une rétroaction instantanée dans votre navigateur sans dépendance lourde.</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],

  pitfalls: [
    'Confondre types valeur et types référence lors de l’assignation : copier une struct duplique ses données, copier une classe partage l’instance.',
    'Provoquer du boxing involontaire en passant une variable primitive (int, bool) à une méthode attendant un object ou dans une concaténation non typée.',
    'Oublier d’assigner tous les paramètres marqués out dans tous les chemins de code d’une méthode (erreur de compilation CS0177).',
    'Ordonner incorrectement les branches d’une switch expression en plaçant un motif général avant un motif spécialisé avec clause when (code mort inatteignable).'
  ],

  questions: [
    {
      stem: 'Où est stockée en mémoire une variable déclarée comme "int x = 42;" à l’intérieur d’une méthode locale C# ?',
      opts: [
        'Sur le tas managé (Heap), gérée par le Garbage Collector.',
        'Sur la pile d’exécution (Stack), détruite automatiquement au retour de la méthode.',
        'Dans les métadonnées globales de l’assemblage CIL.',
        'Dans le cache registre L1 du compilateur Roslyn.'
      ],
      correct: 1,
      exp: 'Les types valeur primitifs (comme int) déclarés localement dans une méthode sont alloués directement sur la pile (Stack) et libérés immédiatement au désempilement du frame de la méthode.'
    },
    {
      stem: 'Quelle instruction C# provoque une opération de Boxing ?',
      opts: [
        'int a = 10; int b = a;',
        'string s = "test"; object o = s;',
        'int n = 5; object obj = n;',
        'double d = 3.14; float f = (float)d;'
      ],
      correct: 2,
      exp: 'Le boxing a lieu lorsqu’une variable de type valeur (comme int) est affectée à un type référence comme object ou une interface. Une boîte objet est alors allouée sur le tas.'
    },
    {
      stem: 'Quelle est l’obligation imposée par le compilateur C# pour un paramètre de méthode déclaré avec le mot-clé out ?',
      opts: [
        'La variable doit être initialisée par l’appelant avant le passage de l’argument.',
        'La méthode appelée doit obligatoirement assigner une valeur au paramètre avant tout retour normal.',
        'Le paramètre ne peut pas être modifié au sein de la méthode appelée.',
        'Le paramètre doit impérativement être un type référence alloué sur le tas.'
      ],
      correct: 1,
      exp: 'Avec le modificateur out, l’appelant n’a pas besoin d’initialiser la variable, mais la méthode appelée a l’obligation stricte de lui affecter une valeur avant de retourner (erreur CS0177 sinon).'
    },
    {
      stem: 'Dans une switch expression C#, que représente le symbole de soulignement _ ?',
      opts: [
        'Une référence vers l’objet parent en cours d’évaluation.',
        'Le motif par défaut (discard) capturant toutes les valeurs non appariées par les branches précédentes.',
        'Une directive ordonnant au compilateur de lever une NotImplementedException.',
        'Un alias pour la valeur null.'
      ],
      correct: 1,
      exp: 'Le symbole _ (discard pattern) fait office de branche par défaut dans une switch expression C#, équivalent au bloc default: d’une instruction switch classique.'
    }
  ],

  flashcards: [
      { q: 'Qu’est-ce que « Architecture CLR (Common Language Runtime) » ?', a: 'Architecture CLR (Common Language Runtime)' },
      { q: 'Qu’est-ce que « Compilation JIT (Just-In-Time) et code CIL/MSIL » ?', a: 'Compilation JIT (Just-In-Time) et code CIL/MSIL' },
      { q: 'Qu’est-ce que « Allocation mémoire » ?', a: 'Allocation mémoire : Pile (Stack) vs Tas (Heap)' },
      { q: 'Qu’est-ce que « Mécanisme et coût du Boxing / Unboxing » ?', a: 'Mécanisme et coût du Boxing / Unboxing' },
      { q: 'Qu’est-ce que « Passage de paramètres » ?', a: 'Passage de paramètres : valeur, ref, out et in' },
      { q: 'Qu’est-ce que « Switch Expressions modernes (C# 8+) » ?', a: 'Switch Expressions modernes (C# 8+)' },
      { q: 'Qu’est-ce que « Pattern Matching avec gardes conditionnels when » ?', a: 'Pattern Matching avec gardes conditionnels when' },
      { q: 'Qu’est-ce que « Encapsulation et masquage d’information » ?', a: 'Encapsulation et masquage d’information' },
      { q: 'Qu’est-ce que « Propriétés avec champ de soutien (Backing Field) » ?', a: 'Propriétés avec champ de soutien (Backing Field)' },
      { q: 'Qu’est-ce que « Propriétés auto-implémentées (Auto-Properties) » ?', a: 'Propriétés auto-implémentées (Auto-Properties)' },
      { q: 'Qu’est-ce que « Accesseur d’initialisation init (C# 9+) » ?', a: 'Accesseur d’initialisation init (C# 9+)' },
      { q: 'Qu’est-ce que « Constructeurs primaires (Primary Constructors C# 12) » ?', a: 'Constructeurs primaires (Primary Constructors C# 12)' },
      { q: 'Qu’est-ce que « Records C# et égalité structurelle par valeur » ?', a: 'Records C# et égalité structurelle par valeur' },
      { q: 'Qu’est-ce que « Mutabilité non destructive avec l’expression with » ?', a: 'Mutabilité non destructive avec l’expression with' },
      { q: 'Qu’est-ce que « Polymorphisme dynamique (virtual et override) » ?', a: 'Polymorphisme dynamique (virtual et override)' },
      { q: 'Qu’est-ce que « Table des méthodes virtuelles (vtable dispatch) » ?', a: 'Table des méthodes virtuelles (vtable dispatch) : En C#, une classe Base expose une méthode polymorphique virtual void Afficher() et une méthode non virtuelle void Identifier() . Une classe dérivée Derived surcharge la première avec override void Afficher() et masque la seconde avec new void Identifier() . Votre programme C# lit' },
      { q: 'Qu’est-ce que « Masquage statique de membre avec le mot-clé new » ?', a: 'Masquage statique de membre avec le mot-clé new' },
      { q: 'Qu’est-ce que « Contrats d’interface et Inversion de Dépendance (DIP) » ?', a: 'Contrats d’interface et Inversion de Dépendance (DIP)' },
      { q: 'Qu’est-ce que « Implémentation explicite d’interface » ?', a: 'Implémentation explicite d’interface : Une suite logicielle d’édition graphique souffre de régressions majeures lors de l’ajout de nouveaux formats d’exportation. Des méthodes spécialisées écrasent silencieusement le comportement parent à cause d’une confusion entre "override" et "new", tandis que des conflits de noms' },
      { q: 'Qu’est-ce que « Résolution de collisions d’homonymie entre interfaces » ?', a: 'Résolution de collisions d’homonymie entre interfaces' },
      { q: 'Qu’est-ce que « Espace de noms System.Collections.Generic » ?', a: 'Espace de noms System.Collections.Generic' },
      { q: 'Qu’est-ce que « Accès sécurisé sans crash avec TryGetValue » ?', a: 'Accès sécurisé sans crash avec TryGetValue' },
      { q: 'Qu’est-ce que « Ensemble unique HashSet et déduplication » ?', a: 'Ensemble unique HashSet et déduplication' },
      { q: 'Qu’est-ce que « Hiérarchie System.Exception et blocs try/catch/finally » ?', a: 'Hiérarchie System.Exception et blocs try/catch/finally' },
      { q: 'Qu’est-ce que « Filtres conditionnels d’exceptions catch ... when » ?', a: 'Filtres conditionnels d’exceptions catch ... when' },
      { q: 'Qu’est-ce que « Préservation de la stack trace avec throw vs throw ex » ?', a: 'Préservation de la stack trace avec throw vs throw ex' },
      { q: 'Qu’est-ce que « Contraintes de généricité » ?', a: 'Contraintes de généricité : clause where T (class, struct, new)' },
      { q: 'Qu’est-ce que « Délégués génériques Action, Func et Predicate » ?', a: 'Délégués génériques Action, Func et Predicate' },
      { q: 'Qu’est-ce que « Expressions lambdas et fermetures de variables (closures) » ?', a: 'Expressions lambdas et fermetures de variables (closures)' },
      { q: 'Qu’est-ce que « LINQ Fluent API et méthodes d’extension sur IEnumerable » ?', a: 'LINQ Fluent API et méthodes d’extension sur IEnumerable' },
      { q: 'Qu’est-ce que « Opérateurs de transformation Where, Select et OrderBy » ?', a: 'Opérateurs de transformation Where, Select et OrderBy' },
      { q: 'Qu’est-ce que « Opérateur de regroupement GroupBy et agrégations » ?', a: 'Opérateur de regroupement GroupBy et agrégations' },
      { q: 'Qu’est-ce que « Principe d’Exécution Différée (Deferred Execution) » ?', a: 'Principe d’Exécution Différée (Deferred Execution)' },
      { q: 'Qu’est-ce que « Opérateurs de matérialisation terminale (ToList, ToArray) » ?', a: 'Opérateurs de matérialisation terminale (ToList, ToArray)' },
      { q: 'Qu’est-ce que « Système événementiel C# avec mot-clé event et multicast (+=, -=) » ?', a: 'Système événementiel C# avec mot-clé event et multicast (+=, -=)' },
      { q: 'Qu’est-ce que « Modèle Asynchrone basé sur les Tâches (TAP) » ?', a: 'Modèle Asynchrone basé sur les Tâches (TAP)' },
      { q: 'Qu’est-ce que « Mots-clés async et await et non-blocage de thread » ?', a: 'Mots-clés async et await et non-blocage de thread' },
      { q: 'Qu’est-ce que « Machine à états Roslyn et interface IAsyncStateMachine » ?', a: 'Machine à états Roslyn et interface IAsyncStateMachine' },
      { q: 'Qu’est-ce que « Anti-pattern bloquant .Result/.Wait() et risque de deadlock » ?', a: 'Anti-pattern bloquant .Result/.Wait() et risque de deadlock' },
      { q: 'Qu’est-ce que « Synchronisation concurrente avec Task.WhenAll et Task.WhenAny » ?', a: 'Synchronisation concurrente avec Task.WhenAll et Task.WhenAny' },
      { q: 'Qu’est-ce que « Capture d’erreurs multiples avec AggregateException » ?', a: 'Capture d’erreurs multiples avec AggregateException' },
      { q: 'Qu’est-ce que « Annulation coopérative avec CancellationToken » ?', a: 'Annulation coopérative avec CancellationToken' },
      { q: 'Qu’est-ce que « Patron de libération déterministe IDisposable et instruction using » ?', a: 'Patron de libération déterministe IDisposable et instruction using' },
    {
      q: 'Quel est le rôle du compilateur JIT dans le Common Language Runtime .NET ?',
      a: 'Le compilateur JIT (Just-In-Time) traduit le code intermédiaire CIL (portable) en instructions machine natives adaptées au processeur cible au moment de l’exécution.'
    },
    {
      q: 'Quelle est la différence fondamentale d’assignation entre une struct et une class ?',
      a: 'Une struct (type valeur) est copiée intégralement champ par champ (copie par valeur), tandis qu’une class (type référence) ne copie que l’adresse mémoire pointant vers la même instance sur le tas.'
    },
    {
      q: 'Quelle est la différence entre les modificateurs ref et out ?',
      a: 'ref exige que la variable soit initialisée avant l’appel et permet la lecture/écriture. out n’exige aucune initialisation préalable mais impose à la méthode appelée d’assigner une valeur.'
    },
    {
      q: 'Pourquoi le boxing fréquent dégrade-t-il les performances d’une application ?',
      a: 'Chaque boxing alloue un nouvel objet sur le tas managé, générant de la pression mémoire et forçant le Garbage Collector à intervenir fréquemment, ce qui provoque des pauses d’exécution.'
    }
  ],

  methodTitle: 'Protocole en 4 étapes pour optimiser la mémoire et les flux d’arguments en C#',
  method: [
    'Classifier les types nécessaires : struct sur la pile pour les petits agrégats immuables (<= 16 octets), class pour les entités métier.',
    'Traquer et supprimer le boxing en privilégiant les types génériques et les conversions explicites typées.',
    'Choisir le modificateur de paramètre approprié : par valeur pour isoler, ref pour muter l’appelant, out pour renvoyer des résultats, in pour la lecture seule sans copie.',
    'Structurer la logique conditionnelle complexe avec des switch expressions et du pattern matching exhaustif avec gardes when.'
  ],

  summary: [
    'Le code C# est compilé en CIL (Roslyn) puis exécuté et traduit en code machine natif par le JIT de la CLR.',
    'Les types valeur (struct) résident sur la pile (Stack) ; les types référence (class) résident sur le tas (Heap).',
    'Le boxing encapsule un type valeur dans un objet sur le tas ; l’unboxing extrait la valeur par cast explicite.',
    'Les modificateurs ref et out permettent le passage par référence directe vers la variable de l’appelant.',
    'Les expressions switch C# modernes permettent le filtrage par type, déconstruction et gardes conditionnels when.'
  ],

  checklist: [
    'Je comprends le rôle de la CLR, du CIL et de la compilation JIT.',
    'Je sais distinguer l’allocation sur la pile (Stack) de l’allocation sur le tas (Heap).',
    'Je sais identifier et éliminer les opérations de boxing/unboxing.',
    'Je maîtrise l’usage des modificateurs de paramètres ref, out et in.',
    'Je sais écrire une switch expression exhaustive avec clauses when.'
  ],

  notions: [
    'Architecture CLR (Common Language Runtime)',
    'Compilation JIT (Just-In-Time) et code CIL/MSIL',
    'Allocation mémoire : Pile (Stack) vs Tas (Heap)',
    'Types Valeur (struct) vs Types Référence (class)',
    'Mécanisme et coût du Boxing / Unboxing',
    'Passage de paramètres : valeur, ref, out et in',
    'Switch Expressions modernes (C# 8+)',
    'Pattern Matching avec gardes conditionnels when'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les types valeur vs référence et le mécanisme de boxing/unboxing.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les modificateurs ref et out et la pile d’exécution.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez l’architecture CLR et le pattern matching C#.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe à l’encapsulation moderne et aux records au module 2.' }
  ]
};
