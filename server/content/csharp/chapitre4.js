/**
 * Chapitre 4 du cours « C# » B2 — Collections Génériques & Gestion des Exceptions.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Collections Génériques &amp; Gestion Avancée des Exceptions',
  short: 'Collections &amp; Exceptions',
  toc: 'System.Collections.Generic, List&lt;T&gt;, Dictionary&lt;TKey, TValue&gt;, HashSet&lt;T&gt;, recherche TryGetValue, gestion robuste des erreurs, filtres catch when et contraintes de généricité where T.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un service de microservices bancaires rencontre de multiples incidents d’interruption de service en production : ' +
    'des exceptions non interceptées provoquent l’effondrement de processus entiers suite à des recherches sur des clés absentes dans des tables de hachage, ' +
    'des ressources mémoire restent verrouillées à cause de blocs finally manquants, ' +
    'et des conteneurs non typés obligent à des conversions de types hasardeuses sources de plantages au runtime. ' +
    'L’équipe doit standardiser l’usage des collections génériques de haute performance (List&lt;T&gt;, Dictionary&lt;TKey, TValue&gt;, HashSet&lt;T&gt;), ' +
    'sécuriser les accès aux dictionnaires via TryGetValue, ' +
    'structurer un pipeline de traitement d’exceptions infaillible avec filtres conditionnels when et bloc finally, ' +
    'et verrouiller les types avec des contraintes génériques strictes (where T). ' +
    'Ce chapitre dote les développeurs d’outils fondamentaux de résilience logicielle.',

  objectives: [
    'choisir la collection générique optimale (List, Dictionary, HashSet) selon les complexités algorithmiques O(1) vs O(n) ;',
    'sécuriser les accès aux dictionnaires via la méthode TryGetValue pour éliminer les KeyNotFoundException ;',
    'structurer des blocs try/catch/finally garantissant la libération des ressources critiques ;',
    'filtrer sélectivement les exceptions à la volée grâce aux clauses catch when ;',
    'déclarer des classes et méthodes génériques contraintes par la clause where T (class, struct, new(), interfaces).'
  ],

  sections: [
    {
      title: 'Collections Génériques : List&lt;T&gt;, Dictionary&lt;TKey, TValue&gt; &amp; HashSet&lt;T&gt;',
      html: [
        '<p>L’introduction des génériques dans le framework .NET a révolutionné la manipulation de données en apportant un <strong>typage strict à la compilation</strong>, éliminant tout coût de boxing pour les types valeur et prévenant les erreurs de cast au runtime :</p>',

        '<table class="table">',
        '  <thead><tr><th>Collection</th><th>Structure sous-jacente</th><th>Recherche par clé/valeur</th><th>Usage recommandé</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>List&lt;T&gt;</strong></td><td>Tableau dynamique indexé</td><td>O(1) par index, O(n) par valeur</td><td>Listes séquentielles ordonnées avec accès par position</td></tr>',
        '    <tr><td><strong>Dictionary&lt;TKey, TValue&gt;</strong></td><td>Table de hachage associative</td><td>O(1) en moyenne par clé</td><td>Associations clé-valeur avec recherche ultra-rapide</td></tr>',
        '    <tr><td><strong>HashSet&lt;T&gt;</strong></td><td>Table de hachage d’éléments uniques</td><td>O(1) en moyenne (Contains)</td><td>Ensembles mathématiques, déduplication et tests d’appartenance</td></tr>',
        '  </tbody>',
        '</table>',

        box('standard', 'Sécurisation des accès aux dictionnaires : TryGetValue', [
          '<p>L’accès direct par indexeur <code>dict[cle]</code> est une cause majeure de plantage d’application : si la clé est absente, la CLR lève immédiatement une <code>KeyNotFoundException</code>.<br>' +
          'La méthode <code>TryGetValue(cle, out var valeur)</code> teste l’existence et extrait la valeur en une seule opération de hachage sans jamais lever d’exception :</p>' +
          '<pre><code class="language-csharp">if (dictionnaire.TryGetValue("ServeurBD", out int port)) {\n' +
          '    Console.WriteLine($"Port trouvé : {port}");\n' +
          '} else {\n' +
          '    Console.WriteLine("Clé absente : valeur par défaut 0 assignée sans crash.");\n' +
          '}</code></pre>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Gestion Robuste des Exceptions &amp; Filtres catch ... when',
      html: [
        '<p>La gestion des erreurs en C# repose sur la hiérarchie <code>System.Exception</code>. Depuis C# 6, les blocs <code>catch</code> peuvent être filtrés avec une clause conditionnelle <code>when</code> :</p>',

        '<pre><code class="language-csharp">try {\n' +
        '    EffectuerRequeteReseau();\n' +
        '} catch (HttpException ex) when (ex.StatusCode == 404) {\n' +
        '    // Ne capture QUE les erreurs HTTP 404 (Ressource introuvable)\n' +
        '    JournaliserAlerte("Ressource manquante", ex);\n' +
        '} catch (HttpException ex) when (ex.StatusCode &gt;= 500) {\n' +
        '    // Capture sélectivement les pannes d’infrastructure serveur\n' +
        '    DeclencherBasculementSecours();\n' +
        '} catch (Exception ex) {\n' +
        '    // Filet de capture générique final\n' +
        '    JournaliserCrashInattendu(ex);\n' +
        '} finally {\n' +
        '    // Exécuté dans TOUS les cas (succès ou échec)\n' +
        '    FermerConnexionsActives();\n' +
        '}</code></pre>',

        '<p>Avantage déterminant de la clause <code>when</code> : contrairement à un <code>if</code> placé à l’intérieur du bloc catch, la clause <code>when</code> évalue la condition <em>sans dépiler la pile d’appels</em> (Stack Unwinding). Les informations de débogage restent intactes si l’exception est propagée plus haut.</p>'
      ].join('\n')
    },
    {
      title: 'Contraintes de Généricité : La Clause where T',
      html: [
        '<p>Par défaut, un paramètre de type générique <code>T</code> est totalement libre (équivalent à <code>object</code>). Les contraintes de généricité permettent de restreindre les capacités de <code>T</code> pour lui appliquer des règles spécifiques :</p>',

        '<table class="table">',
        '  <thead><tr><th>Contrainte</th><th>Signification</th><th>Exemple d’utilisation</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><code>where T : class</code></td><td>T doit obligatoirement être un <strong>type référence</strong></td><td>Gestionnaires d’entités, caches d’objets</td></tr>',
        '    <tr><td><code>where T : struct</code></td><td>T doit obligatoirement être un <strong>type valeur</strong></td><td>Calculateurs mathématiques sans allocation tas</td></tr>',
        '    <tr><td><code>where T : new()</code></td><td>T doit posséder un <strong>constructeur public sans argument</strong></td><td>Fabriques d’objets génériques (<code>new T()</code>)</td></tr>',
        '    <tr><td><code>where T : IComparable&lt;T&gt;</code></td><td>T doit implémenter l’interface de comparaison</td><td>Algorithmes de tri et arbres binaires</td></tr>',
        '    <tr><td><code>where T : BaseClass</code></td><td>T doit dériver obligatoirement de la classe spécifiée</td><td>Référentiels d’accès aux données d’entités</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],

  pitfalls: [
    'Utiliser l’indexeur direct dict[cle] sans certitude préalable de l’existence de la clé, provoquant des KeyNotFoundException intempestives.',
    'Capturer System.Exception sans la relancer (catch vide) et étouffer silencieusement des erreurs critiques d’exécution.',
    'Faire "throw ex;" au lieu de "throw;" dans un bloc catch, ce qui détruit la trace de pile d’origine (stack trace) et complique le diagnostic.',
    'Omettre le bloc finally ou l’instruction using sur des flux ouverts, provoquant des fuites de descripteurs de fichiers sous charge.'
  ],

  questions: [
    {
      stem: 'Pourquoi la méthode dict.TryGetValue(cle, out var val) est-elle préférée à l’indexeur direct dict[cle] ?',
      opts: [
        'Parce qu’elle alloue moins de mémoire sur la pile d’exécution.',
        'Parce qu’elle évite de lever une KeyNotFoundException si la clé est absente et n’effectue qu’une seule recherche de hachage.',
        'Parce qu’elle trie automatiquement le dictionnaire par ordre croissant.',
        'Parce qu’elle crypte la clé lors de la recherche.'
      ],
      correct: 1,
      exp: 'TryGetValue évite le coût élevé de la levée d’exception KeyNotFoundException sur les clés absentes et évite le double hachage qu’imposerait un if (dict.ContainsKey(k)) { v = dict[k]; }.'
    },
    {
      stem: 'Quel est l’intérêt de la clause catch (Exception ex) when (condition) introduite en C# 6 ?',
      opts: [
        'Elle filtre la capture selon une expression booléenne sans dépiler la pile d’appels si la condition est fausse.',
        'Elle accélère l’exécution du ramasse-miettes pendant l’interception.',
        'Elle remplace obligatoirement le bloc finally.',
        'Elle force l’exécution asynchrone du bloc catch.'
      ],
      correct: 0,
      exp: 'La clause when permet de n’intercepter l’exception que si la condition est vérifiée, préservant la stack trace intacte si l’exception doit être traitée par un bloc englobant supérieur.'
    },
    {
      stem: 'Que garantit la contrainte générique "where T : new()" sur une classe Repository<T> ?',
      opts: [
        'Que T est obligatoirement un type référence immuable.',
        'Que T possède un constructeur public sans paramètre, autorisant l’instruction "new T()".',
        'Que T ne peut être instancié qu’une seule fois (Singleton).',
        'Que T implémente l’interface IDisposable.'
      ],
      correct: 1,
      exp: 'La contrainte new() indique au compilateur que le type T dispose d’un constructeur public par défaut sans argument, autorisant le code interne à créer des instances avec new T().'
    },
    {
      stem: 'Dans un bloc try/catch/finally, quand le bloc finally est-il exécuté ?',
      opts: [
        'Uniquement si aucune exception n’a été levée.',
        'Uniquement si une exception a été interceptée par un bloc catch.',
        'Dans tous les cas, que le bloc try se termine avec succès ou qu’une exception soit survenue.',
        'Seulement si le mot-clé return n’est pas rencontré dans le bloc try.'
      ],
      correct: 2,
      exp: 'Le bloc finally est garanti d’être exécuté systématiquement, qu’une exception ait été levée, interceptée, propagée, ou qu’un return anticipe la fin de la méthode.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la complexité moyenne de recherche par clé dans un Dictionary<TKey, TValue> ?',
      a: 'La recherche par clé s’effectue en O(1) (temps constant) en moyenne grâce à la table de hachage interne.'
    },
    {
      q: 'Que produit dict["CleAbsente"] sur un Dictionary en C# ?',
      a: 'L’opération lève immédiatement une exception System.Collections.Generic.KeyNotFoundException.'
    },
    {
      q: 'Quelle est la différence entre "throw;" et "throw ex;" dans un bloc catch ?',
      a: '"throw;" relance l’exception en conservant l’intégralité de la stack trace d’origine. "throw ex;" réinitialise la stack trace au point d’interception, masquant le lieu réel du bug.'
    },
    {
      q: 'À quoi sert la contrainte générique "where T : class" ?',
      a: 'Elle impose que l’argument de type générique soit obligatoirement un type référence (classes, interfaces, records, delegates) et interdit les types valeur (structs, int, etc.).'
    }
  ],

  methodTitle: 'Protocole en 4 étapes pour sécuriser les collections et le flux d’exceptions',
  method: [
    'Choisir la collection générique adaptée à la complexité visée : Dictionary pour O(1) par clé, List pour la séquence, HashSet pour l’unicité.',
    'Remplacer systématiquement les indexeurs directs à risque par dict.TryGetValue(cle, out var val).',
    'Capturer sélectivement les exceptions applicatives avec des clauses catch when filtrant sur l’état interne de l’erreur.',
    'Sécuriser systématiquement la fermeture des fichiers et connexions dans un bloc finally inconditionnel.'
  ],

  summary: [
    'Les collections génériques System.Collections.Generic garantissent le typage fort sans boxing.',
    'TryGetValue est la méthode idiomatique pour interroger un Dictionary sans risque de KeyNotFoundException.',
    'La clause catch when (C# 6+) filtre l’interception sans dépiler la pile d’appels si la condition échoue.',
    'throw; préserve la trace de pile intégrale, alors que throw ex; détruit le contexte d’origine du bug.',
    'La clause where T restreint les types génériques (class, struct, new(), IComparable, etc.).'
  ],

  checklist: [
    'Je sais choisir entre List, Dictionary et HashSet selon la complexité algorithmique.',
    'Je sécurise tous mes accès aux dictionnaires via TryGetValue.',
    'Je sais filtrer mes exceptions avec des clauses catch when.',
    'Je ne fais jamais throw ex; dans un bloc catch.',
    'Je sais poser des contraintes de généricité where T sur une classe ou méthode.'
  ],

  notions: [
    'Espace de noms System.Collections.Generic',
    'Table de hachage Dictionary<TKey, TValue> en O(1)',
    'Accès sécurisé sans crash avec TryGetValue',
    'Ensemble unique HashSet<T> et déduplication',
    'Hiérarchie System.Exception et blocs try/catch/finally',
    'Filtres conditionnels d’exceptions catch ... when',
    'Préservation de la stack trace avec throw vs throw ex',
    'Contraintes de généricité : clause where T (class, struct, new)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les collections génériques et l’accès sécurisé TryGetValue.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les filtres catch when et les contraintes where T.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises la résilience logicielle et les collections O(1).' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe à LINQ et au système événementiel au module 5.' }
  ]
};
