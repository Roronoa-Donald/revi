/**
 * Chapitre 6 du cours « C# » B2 — Asynchronisme & Gestion des Ressources.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Programmation Asynchrone (TAP) &amp; Gestion des Ressources',
  short: 'Asynchronisme &amp; IDisposable',
  toc: 'Modèle asynchrone basé sur les tâches (TAP), mots-clés async et await, décomposition en machine à états par Roslyn, Task.WhenAll et AggregateException, patron IDisposable, blocs using déterministes et libération mémoire.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un service de traitement de documents dématérialisés subit des ralentissements catastrophiques et des pannes régulières sous forte charge : ' +
    'des appels bloquants .Result et .Wait() sur des tâches asynchrones provoquent des interblocages (deadlocks) massifs de threads, ' +
    'tandis que des descripteurs de fichiers et connexions réseau restent ouverts indéfiniment parce que le Garbage Collector tarde à passer. ' +
    'L’architecte logiciel ordonne une refonte immédiate : ' +
    'bannir tout blocage de thread en adoptant le modèle Task-based Asynchronous Pattern (TAP) avec async et await de bout en bout, ' +
    'orchestrer la concurrence propre avec Task.WhenAll et la capture structurée des AggregateException, ' +
    'et garantir la libération immédiate et déterministe des ressources non managées via l’instruction using et le patron IDisposable. ' +
    'Ce dernier module parachève la formation en bâtissant des applications hautement scalables et exemptes de fuites de ressources.',

  objectives: [
    'comprendre le fonctionnement interne de async/await et la transformation en machine à états générée par Roslyn ;',
    'éliminer les anti-patterns bloquants (.Result, .Wait()) responsables des deadlocks de ThreadPool ;',
    'exécuter des flux concurrents en parallèle avec Task.WhenAll et extraire la totalité des causes d’échec via AggregateException ;',
    'appliquer le modèle d’annulation coopérative grâce à CancellationToken et CancellationTokenSource ;',
    'implémenter rigoureusement le patron de conception IDisposable et maîtriser la syntaxe modernisée de l’instruction using.'
  ],

  sections: [
    {
      title: 'Le Modèle Asynchrone TAP &amp; La Machine à États Roslyn',
      html: [
        '<p>En C#, la programmation asynchrone repose sur le <strong>Task-based Asynchronous Pattern (TAP)</strong> et les types <code>Task</code> et <code>Task&lt;TResult&gt;</code>. Contrairement au multi-threading classique qui bloque un thread lourd du système d’exploitation en attente d’I/O, le mot-clé <code>await</code> <strong>libère le thread courant</strong> pour qu’il traite d’autres requêtes :</p>',

        '<pre><code class="language-csharp">public async Task&lt;DonneesClient&gt; ObtenirProfilAsync(int idClient)\n' +
        '{\n' +
        '    // Le thread appelant est libéré pendant l’attente réseau du SGBD\n' +
        '    string json = await _clientHttp.GetStringAsync($"https://api.interne/clients/{idClient}");\n' +
        '    \n' +
        '    // À la fin de l’I/O, un thread disponible de la ThreadPool reprend l’exécution\n' +
        '    return JsonSerializer.Deserialize&lt;DonneesClient&gt;(json)!;\n' +
        '}</code></pre>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">En coulisses : la Machine à États Roslyn</h4>',
        '    <p>À la compilation, Roslyn transforme la méthode <code>async</code> en une structure implémentant <code>IAsyncStateMachine</code>. Chaque <code>await</code> représente un point de suspension : un continuateur (<em>callback</em>) est enregistré et l’état courant de la méthode est sauvegardé sans bloquer le système.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Règle fondamentale : "Async all the way"</h4>',
        '    <p>L’asynchronisme doit se propager sur l’intégralité de la chaîne d’appels, du contrôleur API jusqu’à l’accès disque ou base de données. Ne convertissez jamais du code asynchrone en synchrone avec <code>.Result</code> ou <code>.Wait()</code> au risque de provoquer un interblocage (<em>deadlock</em>).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Concurrence avec Task.WhenAll &amp; Gestion des AggregateException',
      html: [
        '<p>Pour exécuter plusieurs tâches indépendantes en parallèle sans attendre qu’elles se terminent séquentiellement, C# propose <code>Task.WhenAll</code> :</p>',

        '<pre><code class="language-csharp">Task&lt;RapportVentes&gt; taskVentes = ChargerVentesAsync();\n' +
        'Task&lt;RapportStock&gt; taskStock = ChargerStockAsync();\n' +
        'Task&lt;RapportClients&gt; taskClients = ChargerClientsAsync();\n\n' +
        'try {\n' +
        '    // Attend la complétion simultanée des trois tâches\n' +
        '    await Task.WhenAll(taskVentes, taskStock, taskClients);\n' +
        '} catch (Exception ex) {\n' +
        '    // Attention : await ne propage que la première exception rencontrée !\n' +
        '    // Pour inspecter toutes les erreurs simultanées, examiner task.Exception\n' +
        '}</code></pre>',

        box('warning', 'Le piège de la perte d’erreurs dans Task.WhenAll', [
          '<p>Lorsqu’on utilise <code>await Task.WhenAll(...)</code>, si plusieurs tâches échouent, le mot-clé <code>await</code> ne relance que la première exception survenue.<br>' +
          'Pour capturer <strong>la totalité des erreurs survenues</strong>, il faut stocker la tâche combinée et examiner sa propriété <code>Exception</code> qui contient une instance de <code>AggregateException</code> avec la collection <code>InnerExceptions</code> :</p>' +
          '<pre><code class="language-csharp">Task allTasks = Task.WhenAll(t1, t2, t3);\n' +
          'try {\n' +
          '    await allTasks;\n' +
          '} catch {\n' +
          '    foreach (var err in allTasks.Exception!.InnerExceptions) {\n' +
          '        Console.WriteLine($"Erreur interceptée : {err.Message}");\n' +
          '    }\n' +
          '}</code></pre>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Libération Déterministe des Ressources : IDisposable &amp; using',
      html: [
        '<p>Le Garbage Collector de .NET gère remarquablement la mémoire managée (Gen 0, Gen 1, Gen 2). Cependant, il <strong>ignore quand libérer les ressources non managées du système d’exploitation</strong> : descripteurs de fichiers natifs, connexions TCP, verrous d’OS ou contextes GPU.<br>' +
        'Pour ces ressources, .NET impose l’interface <code>IDisposable</code> et son unique méthode <code>void Dispose()</code>.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Syntaxe de déclaration using moderne (C# 8+)</h4>',
        '    <pre><code class="language-csharp">public void TraiterFichier(string chemin)\n' +
        '{\n' +
        '    // Libération garantie à la sortie du bloc de méthode\n' +
        '    using var stream = new FileStream(chemin, FileMode.Open);\n' +
        '    using var reader = new StreamReader(stream);\n' +
        '    \n' +
        '    string contenu = reader.ReadToEnd();\n' +
        '    Console.WriteLine($"Taille : {contenu.Length}");\n' +
        '} // stream.Dispose() et reader.Dispose() appelés automatiquement ici !</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Code équivalent généré par le compilateur</h4>',
        '    <pre><code class="language-csharp">FileStream stream = new FileStream(chemin, FileMode.Open);\n' +
        'try {\n' +
        '    // Corps du traitement\n' +
        '} finally {\n' +
        '    if (stream != null) {\n' +
        '        ((IDisposable)stream).Dispose();\n' +
        '    }\n' +
        '}</code></pre>',
        '  </div>',
        '</div>',

        box('standard', 'Garantie absolue du bloc finally', [
          '<p>Même si une exception non gérée survient à l’intérieur du bloc d’utilisation (par exemple une rupture de connexion ou une mémoire saturée), la méthode <code>Dispose()</code> est inconditionnellement appelée grâce au bloc <code>finally</code> généré par Roslyn, bannissant tout risque de verrou orphelin sur les fichiers ou sockets.</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],

  pitfalls: [
    'Bloquer un thread avec .Result ou .Wait() au lieu d’utiliser await, créant des risques majeurs d’interblocage (deadlock) de ThreadPool.',
    'Utiliser async void au lieu de async Task pour une méthode asynchrone (les exceptions levées dans async void ne peuvent pas être interceptées et font crasher le processus entier ; exception réservée uniquement aux gestionnaires d’événements d’interface graphique).',
    'Oublier de capturer AggregateException lors d’échecs multiples avec Task.WhenAll, masquant des pannes critiques survenues sur les tâches secondaires.',
    'Ne pas utiliser l’instruction using sur un objet implémentant IDisposable, provoquant l’épuisement des handles de fichiers sous charge soutenue.'
  ],

  questions: [
    {
      stem: 'Quel est l’effet de l’opérateur await sur le thread appelant lors d’une opération d’E/S asynchrone ?',
      opts: [
        'Le thread est bloqué en sommeil actif jusqu’à ce que l’E/S soit achevée.',
        'Le thread est immédiatement libéré et renvoyé à la ThreadPool pour traiter d’autres requêtes en parallèle.',
        'Le thread est détruit définitivement par le Garbage Collector.',
        'Le thread bascule en mode d’exécution synchrone prioritaire.'
      ],
      correct: 1,
      exp: 'L’opérateur await suspend l’exécution logique de la méthode asynchrone et libère immédiatement le thread d’exécution appelant, maximisant le débit et la scalabilité du système sans saturer la ThreadPool.'
    },
    {
      stem: 'Pourquoi la signature "async void" est-elle formellement déconseillée en dehors des gestionnaires d’événements d’interface graphique ?',
      opts: [
        'Parce que le compilateur refuse catégoriquement d’exécuter le code.',
        'Parce que l’appelant ne peut pas attendre (await) la fin de la méthode et que toute exception non interceptée fait crasher le processus entier.',
        'Parce qu’elle alloue trop de mémoire sur la pile d’exécution.',
        'Parce qu’elle empêche l’utilisation de variables locales.'
      ],
      correct: 1,
      exp: 'Une méthode async void est du type "fire-and-forget" : elle ne renvoie aucun objet Task. L’appelant ne peut ni l’attendre ni capturer ses exceptions, lesquelles sont envoyées directement au SynchronizationContext et provoquent l’arrêt brutal du processus applicatif.'
    },
    {
      stem: 'Lorsqu’on attend plusieurs tâches avec Task.WhenAll(t1, t2), si t1 et t2 échouent toutes les deux, où sont conservées les deux exceptions ?',
      opts: [
        'Dans le fichier de logs du système d’exploitation.',
        'Dans l’instance de AggregateException associée à la tâche globale renvoyée par WhenAll (propriété InnerExceptions).',
        'La deuxième exception est définitivement supprimée par le compilateur.',
        'Dans la pile d’appels de la méthode Main.'
      ],
      correct: 1,
      exp: 'Task.WhenAll rassemble toutes les erreurs survenues dans une AggregateException accessible via la propriété Exception de la tâche combinée, garantissant qu’aucune cause de défaillance ne soit perdue.'
    },
    {
      stem: 'Quel code de bas niveau le compilateur Roslyn génère-t-il automatiquement lorsqu’on utilise l’instruction "using var res = new MonObjet();" ?',
      opts: [
        'Une boucle while avec appel du Garbage Collector à chaque tour.',
        'Un bloc try / finally garantissant l’appel inconditionnel de res.Dispose() dans la section finally.',
        'Une allocation de mémoire non managée protégée par un mutex global.',
        'Une sérialisation binaire de l’objet vers le disque.'
      ],
      correct: 1,
      exp: 'L’instruction using est un sucre syntaxique traduisant le code en une structure try / finally où res.Dispose() est invoqué dans le bloc finally, assurant la libération déterministe même en cas de crash dans le try.'
    }
  ],

  flashcards: [
    {
      q: 'Quel est l’avantage de async/await par rapport au blocage de thread traditionnel ?',
      a: 'async/await libère le thread appelant pendant l’attente d’une E/S (disque, réseau), permettant au serveur de traiter d’autres requêtes avec un nombre réduit de threads système.'
    },
    {
      q: 'Pourquoi ne doit-on jamais utiliser .Result ou .Wait() sur une Task asynchrone ?',
      a: 'Parce que ces propriétés bloquent le thread courant en attendant la tâche, créant des risques majeurs d’épuisement de ThreadPool et d’interblocage (deadlock).'
    },
    {
      q: 'À quoi sert la classe CancellationToken en programmation asynchrone C# ?',
      a: 'Elle permet de propager un signal d’annulation coopératif entre threads pour interrompre prématurément et proprement une opération asynchrone en cours (ex: fermeture d’onglet, timeout).'
    },
    {
      q: 'Quel est le contrat de l’interface IDisposable en C# ?',
      a: 'Elle expose une méthode unique void Dispose() destinée à libérer immédiatement et de façon déterministe les ressources non managées (fichiers, sockets) sans attendre le Garbage Collector.'
    }
  ],

  methodTitle: 'Protocole en 4 étapes pour orchestrer l’asynchronisme et la libération mémoire',
  method: [
    'Propager async/await de bout en bout ("async all the way") sans jamais bloquer avec .Result ou .Wait().',
    'Utiliser async Task plutôt que async void pour permettre l’attente et la capture des exceptions.',
    'Orchestrer les traitements parallèles indépendants avec Task.WhenAll et inspecter allTasks.Exception.',
    'Envelopper toute ressource non managée (fichiers, sockets) dans une instruction using ou implémenter IDisposable.'
  ],

  summary: [
    'Le modèle TAP s’appuie sur Task et libère le thread appelant pendant les opérations d’E/S via await.',
    'Roslyn décompose toute méthode async en une machine à états managée (IAsyncStateMachine).',
    'Task.WhenAll exécute des tâches en concurrence et rassemble toutes les erreurs dans une AggregateException.',
    'CancellationToken propage l’annulation coopérative propre à travers les tâches asynchrones.',
    'IDisposable et using garantissent la libération déterministe des ressources natives via un bloc finally sous-jacent.'
  ],

  checklist: [
    'Je ne bloque jamais de thread avec .Result ou .Wait().',
    'Je n’écris jamais async void sauf pour les événements graphiques.',
    'Je sais exécuter plusieurs tâches en parallèle avec Task.WhenAll.',
    'Je sais inspecter toutes les erreurs d’une AggregateException.',
    'Je libère systématiquement mes objets IDisposable avec l’instruction using.'
  ],

  notions: [
    'Modèle Asynchrone basé sur les Tâches (TAP)',
    'Mots-clés async et await et non-blocage de thread',
    'Machine à états Roslyn et interface IAsyncStateMachine',
    'Anti-pattern bloquant .Result/.Wait() et risque de deadlock',
    'Synchronisation concurrente avec Task.WhenAll et Task.WhenAny',
    'Capture d’erreurs multiples avec AggregateException',
    'Annulation coopérative avec CancellationToken',
    'Patron de libération déterministe IDisposable et instruction using'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les bases de async/await et l’interdiction formelle de .Result.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur Task.WhenAll et l’instruction using.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez l’annulation CancellationToken et le pattern IDisposable.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : vous possèdez toutes les compétences d’ingénierie logicielle C# niveau B2.' }
  ]
};
