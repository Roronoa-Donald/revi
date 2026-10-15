/**
 * Chapitre 5 du cours « C# » B2 — LINQ, Délégués & Événements.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'LINQ, Délégués &amp; Système Événementiel',
  short: 'LINQ &amp; Événements',
  toc: 'Délégués Func, Action et Predicate, expressions lambdas, Fluent API LINQ (Where, Select, OrderBy, GroupBy), exécution différée vs immédiate, et modèle observateur événementiel avec events multicast (+= et -=).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une application de gestion logistique traite des flux volumineux de bordereaux de livraison avec des boucles imbriquées manuelles (for et foreach). ' +
    'Le code est illisible, sujet à des erreurs de bornes et recalcule les mêmes filtres à chaque itération. ' +
    'De plus, les notifications d’état de livraison sont couplées de façon rigide aux composants d’interface utilisateur. ' +
    'L’équipe doit moderniser son socle : ' +
    'exploiter la programmation fonctionnelle en C# grâce aux délégués (Func, Action) et lambdas, ' +
    'migrer le filtrage et l’agrégation de collections vers la puissance déclarative de LINQ tout en comprenant l’exécution différée, ' +
    'et découpler l’architecture logicielle grâce aux événements multicast C# (events avec += et -=). ' +
    'Ce module transforme la manipulation des collections en un modèle élégant, expressif et découplé.',

  objectives: [
    'maîtriser les types délégués prédéfinis du framework : Action (sans retour), Func (avec retour) et Predicate (booléen) ;',
    'écrire des expressions lambdas concises et comprendre la capture de variables locales (fermetures ou closures) ;',
    'chaîner les opérateurs LINQ Fluent API (Where, Select, OrderByDescending, GroupBy, Sum, Average) ;',
    'distinguer l’évaluation différée (Deferred Execution) de l’évaluation terminale immédiate (ToList, ToArray, Count) ;',
    'implémenter le patron Observateur via le mot-clé event avec inscription (+=) et désinscription (-=).'
  ],

  sections: [
    {
      title: 'Délégués Prédéfinis &amp; Expressions Lambdas',
      html: [
        '<p>Un <strong>délégué</strong> (<em>delegate</em>) en C# est un pointeur de fonction managé, sécurisé et typé. Plutôt que de déclarer des types délégués personnalisés, le framework .NET fournit trois familles génériques universelles :</p>',

        '<table class="table">',
        '  <thead><tr><th>Délégué</th><th>Signature</th><th>Type de retour</th><th>Usage typique</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><code>Action&lt;T1, T2, ...&gt;</code></td><td>Prend de 0 à 16 paramètres</td><td><code>void</code> (aucun retour)</td><td>Journalisation, notifications, effets de bord</td></tr>',
        '    <tr><td><code>Func&lt;T1, ..., TResult&gt;</code></td><td>Prend de 0 à 16 paramètres</td><td><code>TResult</code> (dernier type spécifié)</td><td>Transformations, projections de données, calculs</td></tr>',
        '    <tr><td><code>Predicate&lt;T&gt;</code></td><td>Prend exactement 1 paramètre de type T</td><td><code>bool</code></td><td>Conditions de filtrage et critères de sélection</td></tr>',
        '  </tbody>',
        '</table>',

        '<p>Les <strong>expressions lambdas</strong> fournissent une syntaxe concise pour instancier ces délégués :</p>',
        '<pre><code class="language-csharp">// Délégué Func prenant un entier et renvoyant son carré\n' +
        'Func&lt;int, int&gt; carre = x =&gt; x * x;\n\n' +
        '// Délégué Action affichant un message formaté\n' +
        'Action&lt;string, decimal&gt; afficherPrix = (produit, prix) =&gt; Console.WriteLine($"{produit} : {prix:F2} €");\n\n' +
        '// Predicate testant si un nombre est pair\n' +
        'Predicate&lt;int&gt; estPair = n =&gt; n % 2 == 0;</code></pre>'
      ].join('\n')
    },
    {
      title: 'LINQ Fluent API &amp; Le Principe d’Exécution Différée',
      html: [
        '<p><strong>LINQ</strong> (<em>Language Integrated Query</em>) unifie les requêtes sur les collections en mémoire (LINQ to Objects), les bases de données (LINQ to Entities) et les flux XML/JSON. Il s’appuie sur des <em>méthodes d’extension</em> opérant sur <code>IEnumerable&lt;T&gt;</code> :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Opérateurs d’évaluation différée (Lazy)</h4>',
        '    <p>Ne calculent <strong>rien</strong> lors de la déclaration ! La requête est simplement une recette d’exécution qui ne s’évalue qu’à l’itération (ex: <code>foreach</code>) :</p>',
        '    <ul>',
        '      <li><code>.Where(p =&gt; p.Actif)</code> : filtre les éléments</li>',
        '      <li><code>.Select(p =&gt; p.Nom)</code> : projette et transforme</li>',
        '      <li><code>.OrderByDescending(p =&gt; p.Prix)</code> : trie</li>',
        '      <li><code>.GroupBy(p =&gt; p.Categorie)</code> : regroupe</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Opérateurs terminaux (Immédiats)</h4>',
        '    <p>Provoquent immédiatement l’exécution complète de la requête et matérialisent le résultat en mémoire :</p>',
        '    <ul>',
        '      <li><code>.ToList()</code> / <code>.ToArray()</code> : produit une collection</li>',
        '      <li><code>.First()</code> / <code>.FirstOrDefault()</code> : extrait un élément</li>',
        '      <li><code>.Count()</code>, <code>.Sum()</code>, <code>.Average()</code> : agrège</li>',
        '      <li><code>.Any()</code> / <code>.All()</code> : quantificateurs booléens</li>',
        '    </ul>',
        '  </div>',
        '</div>',

        box('warning', 'Le piège de la multiple énumération', [
          '<p>Si vous itérez deux fois sur une requête LINQ différée sans avoir appelé <code>ToList()</code>, l’intégralité de la chaîne d’opérations ' +
          '(et potentiellement la requête SQL en base de données) est exécutée deux fois ! ' +
          'Matérialisez toujours avec <code>ToList()</code> si le résultat doit être consommé plusieurs fois.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Système Événementiel C# : Le Mot-clé event &amp; Délégués Multicast',
      html: [
        '<p>Le mot-clé <code>event</code> encapsule un délégué en appliquant le patron de conception <strong>Observateur</strong>. Il garantit que les consommateurs extérieurs peuvent uniquement <strong>s’abonner</strong> (<code>+=</code>) ou <strong>se désabonner</strong> (<code>-=</code>), sans jamais pouvoir écraser la liste des abonnés ni déclencher l’événement à la place de l’émetteur :</p>',

        '<pre><code class="language-csharp">public class MoniteurServeur {\n' +
        '    // Déclaration de l\'événement basé sur Action\n' +
        '    public event Action&lt;string&gt;? AlerteDeclenchee;\n\n' +
        '    public void EmettreAlerte(string message) {\n' +
        '        // Invocation sécurisée avec l\'opérateur null-conditionnel (?.)\n' +
        '        AlerteDeclenchee?.Invoke(message);\n' +
        '    }\n' +
        '}\n\n' +
        'var moniteur = new MoniteurServeur();\n' +
        '// Abonnement via +=\n' +
        'moniteur.AlerteDeclenchee += msg =&gt; Console.WriteLine($"[Audit] {msg}");\n' +
        'moniteur.AlerteDeclenchee += msg =&gt; Console.WriteLine($"[SMS] Notification {msg}");\n\n' +
        'moniteur.EmettreAlerte("Surchauffe processeur 85°C");\n' +
        '// Les deux abonnés sont appelés successivement dans l\'ordre d\'inscription.</code></pre>'
      ].join('\n')
    }
  ],

  pitfalls: [
    'Confondre Func<int, string> (prend un int et renvoie une string) avec Action<int, string> (prend un int et une string sans rien renvoyer).',
    'Réévaluer involontairement une requête LINQ lourde plusieurs fois en oubliant de la matérialiser avec ToList().',
    'Déclencher un événement sans vérifier s’il possède des abonnés, provoquant une NullReferenceException (utiliser systématiquement monEvent?.Invoke(...)).',
    'Oublier de se désabonner d’un événement avec -= lors de la destruction d’un composant, provoquant des fuites mémoire car l’émetteur conserve une référence forte vers l’abonné.'
  ],

  questions: [
    {
      stem: 'Quelle est la signature du délégué Func<string, int, bool> ?',
      opts: [
        'Une méthode prenant un booléen et renvoyant une chaîne et un entier.',
        'Une méthode prenant une string et un int en arguments et renvoyant un booléen.',
        'Une méthode ne renvoyant rien (void) et prenant trois arguments.',
        'Une expression de requête SQL différée.'
      ],
      correct: 1,
      exp: 'Dans un délégué Func, le dernier argument de type spécifié correspond toujours au type de retour. Ainsi, Func<string, int, bool> prend une string et un int et renvoie un booléen.'
    },
    {
      stem: 'Que signifie le concept d’exécution différée (Deferred Execution) dans une requête LINQ ?',
      opts: [
        'La requête est exécutée en arrière-plan sur un thread séparé.',
        'Les éléments ne sont pas filtrés ni calculés lors de la définition de la requête, mais uniquement lors de son énumération effective.',
        'La requête est mise en pause pendant un délai de temps configurable.',
        'Le compilateur convertit immédiatement la requête en code assembleur.'
      ],
      correct: 1,
      exp: 'En LINQ, les opérateurs de transformation comme Where et Select construisent un itérateur différé : aucun traitement n’a lieu tant qu’un consommateur n’itère pas sur la séquence (via foreach, ToList, etc.).'
    },
    {
      stem: 'Quelle méthode LINQ force la matérialisation immédiate en mémoire d’une séquence différée ?',
      opts: [
        '.Where()',
        '.Select()',
        '.OrderBy()',
        '.ToList()'
      ],
      correct: 3,
      exp: '.ToList() est un opérateur terminal qui parcourt immédiatement l’intégralité de la séquence et stocke tous les éléments dans une nouvelle instance de List<T> en mémoire.'
    },
    {
      stem: 'Pourquoi le mot-clé event est-il préférable à un délégué public simple pour notifier des abonnés ?',
      opts: [
        'Parce qu’il empêche le Garbage Collector de supprimer les objets abonnés.',
        'Parce qu’il interdit aux tiers d’écraser la liste des abonnés avec un simple = ou de déclencher l’événement arbitrairement.',
        'Parce qu’il force l’exécution séquentielle sur un thread dédié.',
        'Parce qu’il autorise uniquement un seul abonné à la fois.'
      ],
      correct: 1,
      exp: 'Le mot-clé event restreint l’accès extérieur aux seuls opérateurs d’abonnement (+=) et désabonnement (-=). Seule la classe déclarante a le droit d’invoquer ou de réassigner le délégué sous-jacent.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre Func et Action en C# ?',
      a: 'Func renvoie obligatoirement une valeur (son dernier type générique correspond au type de retour), tandis qu’Action a toujours un type de retour void.'
    },
    {
      q: 'Pourquoi l’opérateur ToList() est-il qualifié d’opérateur terminal en LINQ ?',
      a: 'Parce qu’il déclenche l’exécution immédiate de la requête différée et rassemble tous les résultats dans une collection List<T> concrète en mémoire.'
    },
    {
      q: 'Comment invoquer un événement en toute sécurité en évitant une NullReferenceException s’il n’y a aucun abonné ?',
      a: 'En utilisant l’opérateur null-conditionnel : MonEvent?.Invoke(arguments);'
    },
    {
      q: 'Pourquoi faut-il se désabonner d’un événement avec -= lorsque l’abonné n’est plus utilisé ?',
      a: 'Parce que l’émetteur maintient une référence forte vers l’abonné via sa liste d’invocation, ce qui empêche le Garbage Collector de libérer l’abonné (fuite mémoire d’événement).'
    }
  ],

  methodTitle: 'Protocole en 4 étapes pour manipuler les données avec LINQ et les événements',
  method: [
    'Définir le flux avec les délégués standard : Func pour transformer, Predicate pour filtrer, Action pour notifier.',
    'Chaîner les méthodes d’extension LINQ de façon déclarative (Where, Select, OrderBy, GroupBy).',
    'Identifier précisément le point de matérialisation terminale avec ToList() pour éviter les ré-énumérations multiples.',
    'Encapsuler les notifications dans un mot-clé event et invoquer avec l’opérateur null-conditionnel (?.).'
  ],

  summary: [
    'Action (void) et Func (retour typé) éliminent le besoin de déclarer des délégués personnalisés.',
    'LINQ s’appuie sur des méthodes d’extension appliquées sur IEnumerable<T>.',
    'L’exécution différée (Deferred Execution) retarde le calcul jusqu’à l’itération effective.',
    'Les opérateurs terminaux (ToList, ToArray, Count) forcent l’évaluation immédiate en mémoire.',
    'Le mot-clé event protège le délégué contre les écrasements et applique le pattern Observateur avec += et -=.'
  ],

  checklist: [
    'Je sais choisir entre Action et Func pour typer un délégué.',
    'Je sais écrire des requêtes LINQ avec Where, Select, OrderBy et GroupBy.',
    'Je comprends quand une requête LINQ est évaluée de façon différée ou immédiate.',
    'Je sais déclarer et invoquer un événement de façon sécurisée avec ?..',
    'Je me désabonne systématiquement des événements avec -= pour éviter les fuites mémoire.'
  ],

  notions: [
    'Délégués génériques Action, Func et Predicate',
    'Expressions lambdas et fermetures de variables (closures)',
    'LINQ Fluent API et méthodes d’extension sur IEnumerable<T>',
    'Opérateurs de transformation Where, Select et OrderBy',
    'Opérateur de regroupement GroupBy et agrégations',
    'Principe d’Exécution Différée (Deferred Execution)',
    'Opérateurs de matérialisation terminale (ToList, ToArray)',
    'Système événementiel C# avec mot-clé event et multicast (+=, -=)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les délégués Func/Action et les opérateurs de base Where/Select.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur l’exécution différée et les abonnements d’événements.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises LINQ GroupBy et les événements multicast.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe à la programmation asynchrone TAP et à IDisposable au module 6.' }
  ]
};
