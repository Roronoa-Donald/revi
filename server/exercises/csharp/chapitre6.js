'use strict';

module.exports = [
  {
    "id": "csb2-c6-e1",
    "chapter": 6,
    "title": "Simulateur de Machine à États Async/Await (TAP Pattern)",
    "level": "n1",
    "language": "analyse",
    "goal": "Tracer l'exécution d'un workflow asynchrone C# modélisé par la machine à états de Roslyn.",
    "brief": "<p>En C#, les méthodes asynchrones (<code>async Task</code>) sont compilées en machines à états qui libèrent le thread appelant lors d'un <code>await</code> et reprennent leur exécution au signal de fin de tâche I/O.<br>\nAnalysez les données fournies pour chaque cas.<br>\nIl doit simuler la progression temporelle à partir de <code>T=0ms</code>, tracer chaque démarrage avec suspension (<code>Await</code>), chaque reprise de contexte (<code>Reprise contexte</code>), et afficher la durée totale cumulée.</p>\n<p>Format de sortie :<br><code>[T=&lt;T&gt;ms] Demarrage &lt;Nom&gt; -&gt; Await (suspension thread)</code><br><code>[T=&lt;T&gt;ms] Reprise contexte -&gt; Demarrage &lt;NomSuivant&gt; -&gt; Await</code><br>...<br><code>[T=&lt;Total&gt;ms] Tache completee avec succes. Duree totale=&lt;Total&gt;ms</code></p>",
    "starter": "# Grille d'analyse (csb2-c6-e1) — Simulateur de Machine à États Async/Await (TAP Pattern)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tâche asynchrone unique]\n# Données : TASK PingServeur Duree=10ms\nA_COMPLETER\n\n[Cas 2 — Deux tâches avec durées courtes]\n# Données : TASK Authentification Duree=5ms\n# Données : TASK RecuperationProfil Duree=12ms\nA_COMPLETER\n\n[Cas 3 — Chaîne de 4 tâches longues]\n# Données : TASK LireDisque Duree=40ms\n# Données : TASK Decompresser Duree=25ms\n# Données : TASK Indexer Duree=35ms\n# Données : TASK EnvoyerEmail Duree=10ms\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "[T=0ms] Demarrage PingServeur -> Await (suspension thread)\n[T=10ms] Tache completee avec succes. Duree totale=10ms"
      },
      {
        "label": "Deux tâches avec durées courtes",
        "stdin": "cas:2",
        "expected": "[T=0ms] Demarrage Authentification -> Await (suspension thread)\n[T=5ms] Reprise contexte -> Demarrage RecuperationProfil -> Await\n[T=17ms] Tache completee avec succes. Duree totale=17ms"
      },
      {
        "label": "Chaîne de 4 tâches longues",
        "stdin": "cas:3",
        "expected": "[T=0ms] Demarrage LireDisque -> Await (suspension thread)\n[T=40ms] Reprise contexte -> Demarrage Decompresser -> Await\n[T=65ms] Reprise contexte -> Demarrage Indexer -> Await\n[T=100ms] Reprise contexte -> Demarrage EnvoyerEmail -> Await\n[T=110ms] Tache completee avec succes. Duree totale=110ms"
      }
    ],
    "solution": "[Exemple]\n[T=0ms] Demarrage TelechargerFichier -> Await (suspension thread)\n[T=30ms] Reprise contexte -> Demarrage TraiterDonnees -> Await\n[T=50ms] Reprise contexte -> Demarrage SauvegarderBD -> Await\n[T=65ms] Tache completee avec succes. Duree totale=65ms\n\n[Cas 1 — Tâche asynchrone unique]\n[T=0ms] Demarrage PingServeur -> Await (suspension thread)\n[T=10ms] Tache completee avec succes. Duree totale=10ms\n\n[Cas 2 — Deux tâches avec durées courtes]\n[T=0ms] Demarrage Authentification -> Await (suspension thread)\n[T=5ms] Reprise contexte -> Demarrage RecuperationProfil -> Await\n[T=17ms] Tache completee avec succes. Duree totale=17ms\n\n[Cas 3 — Chaîne de 4 tâches longues]\n[T=0ms] Demarrage LireDisque -> Await (suspension thread)\n[T=40ms] Reprise contexte -> Demarrage Decompresser -> Await\n[T=65ms] Reprise contexte -> Demarrage Indexer -> Await\n[T=100ms] Reprise contexte -> Demarrage EnvoyerEmail -> Await\n[T=110ms] Tache completee avec succes. Duree totale=110ms"
  },
  {
    "id": "csb2-c6-e2",
    "chapter": 6,
    "title": "Orchestrateur concurrent avec Task.WhenAll et AggregateException",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler la synchronisation de tâches concurrentes via Task.WhenAll et la capture d'erreurs groupées.",
    "brief": "<p>En C#, <code>await Task.WhenAll(t1, t2, ...)</code> attend l'achèvement simultané de plusieurs tâches.<br>\nSi au moins une tâche échoue avec une exception, le runtime regroupe toutes les exceptions survenues dans une <code>AggregateException</code> (contrairement au premier échec qui masquerait les autres).<br>\nAnalysez les données fournies pour chaque cas.<br>\nIl doit compter les succès et échecs, puis formater l'éventuelle <code>AggregateException</code> avec la liste ordonnée des erreurs.</p>\n<p>Format de sortie :<br><code>WHENALL: &lt;NbreSucces&gt; succes, &lt;NbreEchecs&gt; echecs</code><br>Si échecs &gt; 0 :<br><code>AggregateException levee (&lt;N&gt; erreurs):</code><br><code>- Erreur 1: &lt;Message&gt;</code><br>...<br>Sinon :<br><code>Execution terminee sans exception</code></p>",
    "starter": "# Grille d'analyse (csb2-c6-e2) — Orchestrateur concurrent avec Task.WhenAll et AggregateException\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les tâches réussies]\n# Données : TASK T1 Status=OK\n# Données : TASK T2 Status=OK\n# Données : TASK T3 Status=OK\nA_COMPLETER\n\n[Cas 2 — Un seul échec isolé]\n# Données : TASK T1 Status=OK\n# Données : TASK T2 Status=FAIL Error=\"HttpRequestException: 404 Not Found\"\nA_COMPLETER\n\n[Cas 3 — Tous les appels en échec]\n# Données : TASK A Status=FAIL Error=\"IOException: Disque plein\"\n# Données : TASK B Status=FAIL Error=\"UnauthorizedAccessException: Droit refuse\"\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "WHENALL: 3 succes, 0 echecs\nExecution terminee sans exception"
      },
      {
        "label": "Un seul échec isolé",
        "stdin": "cas:2",
        "expected": "WHENALL: 1 succes, 1 echecs\nAggregateException levee (1 erreurs):\n- Erreur 1: HttpRequestException: 404 Not Found"
      },
      {
        "label": "Tous les appels en échec",
        "stdin": "cas:3",
        "expected": "WHENALL: 0 succes, 2 echecs\nAggregateException levee (2 erreurs):\n- Erreur 1: IOException: Disque plein\n- Erreur 2: UnauthorizedAccessException: Droit refuse"
      }
    ],
    "solution": "[Exemple]\nWHENALL: 2 succes, 2 echecs\nAggregateException levee (2 erreurs):\n- Erreur 1: SocketException: Connexion refusee\n- Erreur 2: SqlException: Timeout expire\n\n[Cas 1 — Toutes les tâches réussies]\nWHENALL: 3 succes, 0 echecs\nExecution terminee sans exception\n\n[Cas 2 — Un seul échec isolé]\nWHENALL: 1 succes, 1 echecs\nAggregateException levee (1 erreurs):\n- Erreur 1: HttpRequestException: 404 Not Found\n\n[Cas 3 — Tous les appels en échec]\nWHENALL: 0 succes, 2 echecs\nAggregateException levee (2 erreurs):\n- Erreur 1: IOException: Disque plein\n- Erreur 2: UnauthorizedAccessException: Droit refuse"
  },
  {
    "id": "csb2-c6-e3",
    "chapter": 6,
    "title": "Gestion déterministe des ressources non managées (IDisposable et using)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le pattern IDisposable et l'instruction using C# garantissant la libération des ressources en toutes circonstances.",
    "brief": "<p>En C#, l'instruction <code>using (var res = new Ressource()) { ... }</code> se traduit par un bloc <code>try / finally</code> où <code>res.Dispose()</code> est obligatoirement exécuté pour libérer les handles natifs (fichiers, sockets, curseurs BD), même en cas de crash non géré.<br>\nAnalysez les données fournies pour chaque cas.<br>\nLe script doit tracer les étapes et garantir l'appel inconditionnel de <code>[DISPOSE]</code> à la fin.</p>\n<p>Format de sortie :<br><code>[ALLOC] &lt;Nom&gt; alloue (Handle=&lt;Handle&gt;)</code><br><code>[EXEC] Op &lt;NomOp&gt; &lt;Params&gt;</code><br><code>[CRASH] Exception &lt;Type&gt; interceptee</code> (si applicable)<br><code>[DISPOSE] &lt;Nom&gt; libere via IDisposable</code></p>",
    "starter": "# Grille d'analyse (csb2-c6-e3) — Gestion déterministe des ressources non managées (IDisposable et using)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sortie normale sans exception]\n# Données : RESOURCE BddConnection ALLOCATE=Sock0x99\n# Données : OP Requete \"SELECT * FROM Users\"\n# Données : EXIT\nA_COMPLETER\n\n[Cas 2 — Plusieurs opérations avant crash]\n# Données : RESOURCE ImageRenderer ALLOCATE=Gpu0xAA\n# Données : OP ChargerTexture \"background.png\"\n# Données : OP AppliquerFiltre \"Blur\"\n# Données : THROW OutOfMemoryException\nA_COMPLETER\n\n[Cas 3 — Crash immédiat juste après allocation]\n# Données : RESOURCE PortSerie ALLOCATE=COM3\n# Données : THROW TimeoutException\nA_COMPLETER\n",
    "hints": [
      "Garde une référence vers la ressource allouée au début.",
      "Affiche chaque opération OP exécutée.",
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
        "stdin": "cas:1",
        "expected": "[ALLOC] BddConnection alloue (Handle=Sock0x99)\n[EXEC] Op Requete \"SELECT * FROM Users\"\n[DISPOSE] BddConnection libere via IDisposable"
      },
      {
        "label": "Plusieurs opérations avant crash",
        "stdin": "cas:2",
        "expected": "[ALLOC] ImageRenderer alloue (Handle=Gpu0xAA)\n[EXEC] Op ChargerTexture \"background.png\"\n[EXEC] Op AppliquerFiltre \"Blur\"\n[CRASH] Exception OutOfMemoryException intercepte\n[DISPOSE] ImageRenderer libere via IDisposable"
      },
      {
        "label": "Crash immédiat juste après allocation",
        "stdin": "cas:3",
        "expected": "[ALLOC] PortSerie alloue (Handle=COM3)\n[CRASH] Exception TimeoutException intercepte\n[DISPOSE] PortSerie libere via IDisposable"
      }
    ],
    "solution": "[Exemple]\n[ALLOC] FichierLogs alloue (Handle=Handle0x10A)\n[EXEC] Op EcritureLigne \"Demarrage\"\n[CRASH] Exception DiskFullException intercepte\n[DISPOSE] FichierLogs libere via IDisposable\n\n[Cas 1 — Sortie normale sans exception]\n[ALLOC] BddConnection alloue (Handle=Sock0x99)\n[EXEC] Op Requete \"SELECT * FROM Users\"\n[DISPOSE] BddConnection libere via IDisposable\n\n[Cas 2 — Plusieurs opérations avant crash]\n[ALLOC] ImageRenderer alloue (Handle=Gpu0xAA)\n[EXEC] Op ChargerTexture \"background.png\"\n[EXEC] Op AppliquerFiltre \"Blur\"\n[CRASH] Exception OutOfMemoryException intercepte\n[DISPOSE] ImageRenderer libere via IDisposable\n\n[Cas 3 — Crash immédiat juste après allocation]\n[ALLOC] PortSerie alloue (Handle=COM3)\n[CRASH] Exception TimeoutException intercepte\n[DISPOSE] PortSerie libere via IDisposable"
  }
];
