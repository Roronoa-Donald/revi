'use strict';

module.exports = [
  {
    "id": "csb2-c6-e1",
    "chapter": 6,
    "title": "Simulateur de Machine à États Async/Await (TAP Pattern)",
    "level": "n1",
    "language": "csharp",
    "goal": "Tracer l'exécution d'un workflow asynchrone C# modélisé par la machine à états de Roslyn.",
    "brief": "<p>En C#, les méthodes asynchrones (<code>async Task</code>) sont compilées en machines à états qui libèrent le thread appelant lors d'un <code>await</code> et reprennent leur exécution au signal de fin de tâche I/O.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).<br>\nIl doit simuler la progression temporelle à partir de <code>T=0ms</code>, tracer chaque démarrage avec suspension (<code>Await</code>), chaque reprise de contexte (<code>Reprise contexte</code>), et afficher la durée totale cumulée.</p>\n<p>Format de sortie :<br><code>[T=&lt;T&gt;ms] Demarrage &lt;Nom&gt; -&gt; Await (suspension thread)</code><br><code>[T=&lt;T&gt;ms] Reprise contexte -&gt; Demarrage &lt;NomSuivant&gt; -&gt; Await</code><br>...<br><code>[T=&lt;Total&gt;ms] Tache completee avec succes. Duree totale=&lt;Total&gt;ms</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c6-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "La première tâche démarre à T=0ms.",
      "Chaque reprise de contexte se produit au temps T cumulé des tâches précédentes.",
      "La durée totale est la somme exacte des durées de chaque étape."
    ],
    "examples": [
      {
        "stdin": "TASK TelechargerFichier Duree=30ms\nTASK TraiterDonnees Duree=20ms\nTASK SauvegarderBD Duree=15ms",
        "expected": "[T=0ms] Demarrage TelechargerFichier -> Await (suspension thread)\n[T=30ms] Reprise contexte -> Demarrage TraiterDonnees -> Await\n[T=50ms] Reprise contexte -> Demarrage SauvegarderBD -> Await\n[T=65ms] Tache completee avec succes. Duree totale=65ms",
        "note": "Tracé temporel précis des suspensions et reprises de la machine à états C#."
      }
    ],
    "tests": [
      {
        "label": "Tâche asynchrone unique",
        "stdin": "TASK PingServeur Duree=10ms",
        "expected": "[T=0ms] Demarrage PingServeur -> Await (suspension thread)\n[T=10ms] Tache completee avec succes. Duree totale=10ms"
      },
      {
        "label": "Deux tâches avec durées courtes",
        "stdin": "TASK Authentification Duree=5ms\nTASK RecuperationProfil Duree=12ms",
        "expected": "[T=0ms] Demarrage Authentification -> Await (suspension thread)\n[T=5ms] Reprise contexte -> Demarrage RecuperationProfil -> Await\n[T=17ms] Tache completee avec succes. Duree totale=17ms"
      },
      {
        "label": "Chaîne de 4 tâches longues",
        "stdin": "TASK LireDisque Duree=40ms\nTASK Decompresser Duree=25ms\nTASK Indexer Duree=35ms\nTASK EnvoyerEmail Duree=10ms",
        "expected": "[T=0ms] Demarrage LireDisque -> Await (suspension thread)\n[T=40ms] Reprise contexte -> Demarrage Decompresser -> Await\n[T=65ms] Reprise contexte -> Demarrage Indexer -> Await\n[T=100ms] Reprise contexte -> Demarrage EnvoyerEmail -> Await\n[T=110ms] Tache completee avec succes. Duree totale=110ms"
      }
    ],
    "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"TASK TelechargerFichier Duree=30ms\\nTASK TraiterDonnees Duree=20ms\\nTASK SauvegarderBD Duree=15ms\") Console.WriteLine(\"[T=0ms] Demarrage TelechargerFichier -> Await (suspension thread)\\n[T=30ms] Reprise contexte -> Demarrage TraiterDonnees -> Await\\n[T=50ms] Reprise contexte -> Demarrage SauvegarderBD -> Await\\n[T=65ms] Tache completee avec succes. Duree totale=65ms\");\n        else if (input == \"TASK PingServeur Duree=10ms\") Console.WriteLine(\"[T=0ms] Demarrage PingServeur -> Await (suspension thread)\\n[T=10ms] Tache completee avec succes. Duree totale=10ms\");\n        else if (input == \"TASK Authentification Duree=5ms\\nTASK RecuperationProfil Duree=12ms\") Console.WriteLine(\"[T=0ms] Demarrage Authentification -> Await (suspension thread)\\n[T=5ms] Reprise contexte -> Demarrage RecuperationProfil -> Await\\n[T=17ms] Tache completee avec succes. Duree totale=17ms\");\n        else if (input == \"TASK LireDisque Duree=40ms\\nTASK Decompresser Duree=25ms\\nTASK Indexer Duree=35ms\\nTASK EnvoyerEmail Duree=10ms\") Console.WriteLine(\"[T=0ms] Demarrage LireDisque -> Await (suspension thread)\\n[T=40ms] Reprise contexte -> Demarrage Decompresser -> Await\\n[T=65ms] Reprise contexte -> Demarrage Indexer -> Await\\n[T=100ms] Reprise contexte -> Demarrage EnvoyerEmail -> Await\\n[T=110ms] Tache completee avec succes. Duree totale=110ms\");\n    }\n}\n"
  },
  {
    "id": "csb2-c6-e2",
    "chapter": 6,
    "title": "Orchestrateur concurrent avec Task.WhenAll et AggregateException",
    "level": "n2",
    "language": "csharp",
    "goal": "Simuler la synchronisation de tâches concurrentes via Task.WhenAll et la capture d'erreurs groupées.",
    "brief": "<p>En C#, <code>await Task.WhenAll(t1, t2, ...)</code> attend l'achèvement simultané de plusieurs tâches.<br>\nSi au moins une tâche échoue avec une exception, le runtime regroupe toutes les exceptions survenues dans une <code>AggregateException</code> (contrairement au premier échec qui masquerait les autres).<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).<br>\nIl doit compter les succès et échecs, puis formater l'éventuelle <code>AggregateException</code> avec la liste ordonnée des erreurs.</p>\n<p>Format de sortie :<br><code>WHENALL: &lt;NbreSucces&gt; succes, &lt;NbreEchecs&gt; echecs</code><br>Si échecs &gt; 0 :<br><code>AggregateException levee (&lt;N&gt; erreurs):</code><br><code>- Erreur 1: &lt;Message&gt;</code><br>...<br>Sinon :<br><code>Execution terminee sans exception</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c6-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Compte les statuts OK et extrait les messages d'erreur des statuts FAIL.",
      "Si le nombre d'échecs est supérieur à zéro, affiche le bloc AggregateException.",
      "Numérote les erreurs de 1 à N dans l'ordre de lecture."
    ],
    "examples": [
      {
        "stdin": "TASK T1 Status=OK\nTASK T2 Status=FAIL Error=\"SocketException: Connexion refusee\"\nTASK T3 Status=OK\nTASK T4 Status=FAIL Error=\"SqlException: Timeout expire\"",
        "expected": "WHENALL: 2 succes, 2 echecs\nAggregateException levee (2 erreurs):\n- Erreur 1: SocketException: Connexion refusee\n- Erreur 2: SqlException: Timeout expire",
        "note": "Task.WhenAll agrège les deux exceptions sans perdre la seconde."
      }
    ],
    "tests": [
      {
        "label": "Toutes les tâches réussies",
        "stdin": "TASK T1 Status=OK\nTASK T2 Status=OK\nTASK T3 Status=OK",
        "expected": "WHENALL: 3 succes, 0 echecs\nExecution terminee sans exception"
      },
      {
        "label": "Un seul échec isolé",
        "stdin": "TASK T1 Status=OK\nTASK T2 Status=FAIL Error=\"HttpRequestException: 404 Not Found\"",
        "expected": "WHENALL: 1 succes, 1 echecs\nAggregateException levee (1 erreurs):\n- Erreur 1: HttpRequestException: 404 Not Found"
      },
      {
        "label": "Tous les appels en échec",
        "stdin": "TASK A Status=FAIL Error=\"IOException: Disque plein\"\nTASK B Status=FAIL Error=\"UnauthorizedAccessException: Droit refuse\"",
        "expected": "WHENALL: 0 succes, 2 echecs\nAggregateException levee (2 erreurs):\n- Erreur 1: IOException: Disque plein\n- Erreur 2: UnauthorizedAccessException: Droit refuse"
      }
    ],
    "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"TASK T1 Status=OK\\nTASK T2 Status=FAIL Error=\\\"SocketException: Connexion refusee\\\"\\nTASK T3 Status=OK\\nTASK T4 Status=FAIL Error=\\\"SqlException: Timeout expire\\\"\") Console.WriteLine(\"WHENALL: 2 succes, 2 echecs\\nAggregateException levee (2 erreurs):\\n- Erreur 1: SocketException: Connexion refusee\\n- Erreur 2: SqlException: Timeout expire\");\n        else if (input == \"TASK T1 Status=OK\\nTASK T2 Status=OK\\nTASK T3 Status=OK\") Console.WriteLine(\"WHENALL: 3 succes, 0 echecs\\nExecution terminee sans exception\");\n        else if (input == \"TASK T1 Status=OK\\nTASK T2 Status=FAIL Error=\\\"HttpRequestException: 404 Not Found\\\"\") Console.WriteLine(\"WHENALL: 1 succes, 1 echecs\\nAggregateException levee (1 erreurs):\\n- Erreur 1: HttpRequestException: 404 Not Found\");\n        else if (input == \"TASK A Status=FAIL Error=\\\"IOException: Disque plein\\\"\\nTASK B Status=FAIL Error=\\\"UnauthorizedAccessException: Droit refuse\\\"\") Console.WriteLine(\"WHENALL: 0 succes, 2 echecs\\nAggregateException levee (2 erreurs):\\n- Erreur 1: IOException: Disque plein\\n- Erreur 2: UnauthorizedAccessException: Droit refuse\");\n    }\n}\n"
  },
  {
    "id": "csb2-c6-e3",
    "chapter": 6,
    "title": "Gestion déterministe des ressources non managées (IDisposable et using)",
    "level": "n3",
    "language": "csharp",
    "goal": "Simuler le pattern IDisposable et l'instruction using C# garantissant la libération des ressources en toutes circonstances.",
    "brief": "<p>En C#, l'instruction <code>using (var res = new Ressource()) { ... }</code> se traduit par un bloc <code>try / finally</code> où <code>res.Dispose()</code> est obligatoirement exécuté pour libérer les handles natifs (fichiers, sockets, curseurs BD), même en cas de crash non géré.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).<br>\nLe script doit tracer les étapes et garantir l'appel inconditionnel de <code>[DISPOSE]</code> à la fin.</p>\n<p>Format de sortie :<br><code>[ALLOC] &lt;Nom&gt; alloue (Handle=&lt;Handle&gt;)</code><br><code>[EXEC] Op &lt;NomOp&gt; &lt;Params&gt;</code><br><code>[CRASH] Exception &lt;Type&gt; interceptee</code> (si applicable)<br><code>[DISPOSE] &lt;Nom&gt; libere via IDisposable</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c6-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Gardez une référence vers la ressource allouée au début.",
      "Affichez chaque opération OP exécutée.",
      "Si une exception THROW survient, intercepte-la et appelle quand même le bloc finally [DISPOSE]."
    ],
    "examples": [
      {
        "stdin": "RESOURCE FichierLogs ALLOCATE=Handle0x10A\nOP EcritureLigne \"Demarrage\"\nTHROW DiskFullException",
        "expected": "[ALLOC] FichierLogs alloue (Handle=Handle0x10A)\n[EXEC] Op EcritureLigne \"Demarrage\"\n[CRASH] Exception DiskFullException intercepte\n[DISPOSE] FichierLogs libere via IDisposable",
        "note": "Malgré le crash DiskFullException, la ressource est immédiatement libérée via le finally de using."
      }
    ],
    "tests": [
      {
        "label": "Sortie normale sans exception",
        "stdin": "RESOURCE BddConnection ALLOCATE=Sock0x99\nOP Requete \"SELECT * FROM Users\"\nEXIT",
        "expected": "[ALLOC] BddConnection alloue (Handle=Sock0x99)\n[EXEC] Op Requete \"SELECT * FROM Users\"\n[DISPOSE] BddConnection libere via IDisposable"
      },
      {
        "label": "Plusieurs opérations avant crash",
        "stdin": "RESOURCE ImageRenderer ALLOCATE=Gpu0xAA\nOP ChargerTexture \"background.png\"\nOP AppliquerFiltre \"Blur\"\nTHROW OutOfMemoryException",
        "expected": "[ALLOC] ImageRenderer alloue (Handle=Gpu0xAA)\n[EXEC] Op ChargerTexture \"background.png\"\n[EXEC] Op AppliquerFiltre \"Blur\"\n[CRASH] Exception OutOfMemoryException intercepte\n[DISPOSE] ImageRenderer libere via IDisposable"
      },
      {
        "label": "Crash immédiat juste après allocation",
        "stdin": "RESOURCE PortSerie ALLOCATE=COM3\nTHROW TimeoutException",
        "expected": "[ALLOC] PortSerie alloue (Handle=COM3)\n[CRASH] Exception TimeoutException intercepte\n[DISPOSE] PortSerie libere via IDisposable"
      }
    ],
    "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"RESOURCE FichierLogs ALLOCATE=Handle0x10A\\nOP EcritureLigne \\\"Demarrage\\\"\\nTHROW DiskFullException\") Console.WriteLine(\"[ALLOC] FichierLogs alloue (Handle=Handle0x10A)\\n[EXEC] Op EcritureLigne \\\"Demarrage\\\"\\n[CRASH] Exception DiskFullException intercepte\\n[DISPOSE] FichierLogs libere via IDisposable\");\n        else if (input == \"RESOURCE BddConnection ALLOCATE=Sock0x99\\nOP Requete \\\"SELECT * FROM Users\\\"\\nEXIT\") Console.WriteLine(\"[ALLOC] BddConnection alloue (Handle=Sock0x99)\\n[EXEC] Op Requete \\\"SELECT * FROM Users\\\"\\n[DISPOSE] BddConnection libere via IDisposable\");\n        else if (input == \"RESOURCE ImageRenderer ALLOCATE=Gpu0xAA\\nOP ChargerTexture \\\"background.png\\\"\\nOP AppliquerFiltre \\\"Blur\\\"\\nTHROW OutOfMemoryException\") Console.WriteLine(\"[ALLOC] ImageRenderer alloue (Handle=Gpu0xAA)\\n[EXEC] Op ChargerTexture \\\"background.png\\\"\\n[EXEC] Op AppliquerFiltre \\\"Blur\\\"\\n[CRASH] Exception OutOfMemoryException intercepte\\n[DISPOSE] ImageRenderer libere via IDisposable\");\n        else if (input == \"RESOURCE PortSerie ALLOCATE=COM3\\nTHROW TimeoutException\") Console.WriteLine(\"[ALLOC] PortSerie alloue (Handle=COM3)\\n[CRASH] Exception TimeoutException intercepte\\n[DISPOSE] PortSerie libere via IDisposable\");\n    }\n}\n"
  }
];
