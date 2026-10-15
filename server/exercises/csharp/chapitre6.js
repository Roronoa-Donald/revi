/**
 * Exercices du chapitre 6 — C# B2.
 * Asynchronisme & Gestion des Ressources.
 */
'use strict';

module.exports = [
  {
    id: 'csb2-c6-e1',
    chapter: 6,
    title: 'Simulateur de Machine à États Async/Await (TAP Pattern)',
    level: 'n1',
    language: 'python',
    goal: 'Tracer l\'exécution d\'un workflow asynchrone C# modélisé par la machine à états de Roslyn.',
    brief: '<p>En C#, les méthodes asynchrones (<code>async Task</code>) sont compilées en machines à états qui libèrent le thread appelant lors d\'un <code>await</code> et reprennent leur exécution au signal de fin de tâche I/O.<br>\nLe script lit sur l\'entrée standard une série de tâches asynchrones séquentielles : <code>TASK &lt;Nom&gt; Duree=&lt;N&gt;ms</code>.<br>\nIl doit simuler la progression temporelle à partir de <code>T=0ms</code>, tracer chaque démarrage avec suspension (<code>Await</code>), chaque reprise de contexte (<code>Reprise contexte</code>), et afficher la durée totale cumulée.</p>\n<p>Format de sortie :<br><code>[T=&lt;T&gt;ms] Demarrage &lt;Nom&gt; -&gt; Await (suspension thread)</code><br><code>[T=&lt;T&gt;ms] Reprise contexte -&gt; Demarrage &lt;NomSuivant&gt; -&gt; Await</code><br>...<br><code>[T=&lt;Total&gt;ms] Tache completee avec succes. Duree totale=&lt;Total&gt;ms</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler la machine à états async/await
`,
    hints: [
      'La première tâche démarre à T=0ms.',
      'Chaque reprise de contexte se produit au temps T cumulé des tâches précédentes.',
      'La durée totale est la somme exacte des durées de chaque étape.'
    ],
    examples: [
      {
        stdin: `TASK TelechargerFichier Duree=30ms
TASK TraiterDonnees Duree=20ms
TASK SauvegarderBD Duree=15ms`,
        expected: `[T=0ms] Demarrage TelechargerFichier -> Await (suspension thread)
[T=30ms] Reprise contexte -> Demarrage TraiterDonnees -> Await
[T=50ms] Reprise contexte -> Demarrage SauvegarderBD -> Await
[T=65ms] Tache completee avec succes. Duree totale=65ms`,
        note: 'Tracé temporel précis des suspensions et reprises de la machine à états C#.'
      }
    ],
    tests: [
      {
        label: 'Tâche asynchrone unique',
        stdin: 'TASK PingServeur Duree=10ms',
        expected: `[T=0ms] Demarrage PingServeur -> Await (suspension thread)
[T=10ms] Tache completee avec succes. Duree totale=10ms`
      },
      {
        label: 'Deux tâches avec durées courtes',
        stdin: `TASK Authentification Duree=5ms
TASK RecuperationProfil Duree=12ms`,
        expected: `[T=0ms] Demarrage Authentification -> Await (suspension thread)
[T=5ms] Reprise contexte -> Demarrage RecuperationProfil -> Await
[T=17ms] Tache completee avec succes. Duree totale=17ms`
      },
      {
        label: 'Chaîne de 4 tâches longues',
        stdin: `TASK LireDisque Duree=40ms
TASK Decompresser Duree=25ms
TASK Indexer Duree=35ms
TASK EnvoyerEmail Duree=10ms`,
        expected: `[T=0ms] Demarrage LireDisque -> Await (suspension thread)
[T=40ms] Reprise contexte -> Demarrage Decompresser -> Await
[T=65ms] Reprise contexte -> Demarrage Indexer -> Await
[T=100ms] Reprise contexte -> Demarrage EnvoyerEmail -> Await
[T=110ms] Tache completee avec succes. Duree totale=110ms`
      },
      {
        label: 'Tâche avec durée nulle instantanée',
        stdin: `TASK CacheHit Duree=0ms
TASK TraitementLocal Duree=5ms`,
        expected: `[T=0ms] Demarrage CacheHit -> Await (suspension thread)
[T=0ms] Reprise contexte -> Demarrage TraitementLocal -> Await
[T=5ms] Tache completee avec succes. Duree totale=5ms`
      }
    ],
    solution: `import sys, re

lines = [l.strip() for l in sys.stdin if l.strip()]
if not lines:
    sys.exit(0)

tasks = []
for line in lines:
    m = re.match(r'TASK\\s+([a-zA-Z0-9_]+)\\s+Duree=([0-9]+)ms', line)
    if m:
        tasks.append((m.group(1), int(m.group(2))))

t_cur = 0
for i, (name, dur) in enumerate(tasks):
    if i == 0:
        print(f"[T={t_cur}ms] Demarrage {name} -> Await (suspension thread)")
    else:
        print(f"[T={t_cur}ms] Reprise contexte -> Demarrage {name} -> Await")
    t_cur += dur

print(f"[T={t_cur}ms] Tache completee avec succes. Duree totale={t_cur}ms")
`
  },
  {
    id: 'csb2-c6-e2',
    chapter: 6,
    title: 'Orchestrateur concurrent avec Task.WhenAll et AggregateException',
    level: 'n2',
    language: 'python',
    goal: 'Simuler la synchronisation de tâches concurrentes via Task.WhenAll et la capture d\'erreurs groupées.',
    brief: '<p>En C#, <code>await Task.WhenAll(t1, t2, ...)</code> attend l\'achèvement simultané de plusieurs tâches.<br>\nSi au moins une tâche échoue avec une exception, le runtime regroupe toutes les exceptions survenues dans une <code>AggregateException</code> (contrairement au premier échec qui masquerait les autres).<br>\nLe script lit une liste de tâches :<br>\n- <code>TASK &lt;Nom&gt; Status=OK</code> : tâche réussie ;<br>\n- <code>TASK &lt;Nom&gt; Status=FAIL Error="&lt;Message&gt;"</code> : tâche en échec.<br>\nIl doit compter les succès et échecs, puis formater l\'éventuelle <code>AggregateException</code> avec la liste ordonnée des erreurs.</p>\n<p>Format de sortie :<br><code>WHENALL: &lt;NbreSucces&gt; succes, &lt;NbreEchecs&gt; echecs</code><br>Si échecs &gt; 0 :<br><code>AggregateException levee (&lt;N&gt; erreurs):</code><br><code>- Erreur 1: &lt;Message&gt;</code><br>...<br>Sinon :<br><code>Execution terminee sans exception</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler Task.WhenAll et le regroupement d'exceptions AggregateException
`,
    hints: [
      'Compte les statuts OK et extrait les messages d\'erreur des statuts FAIL.',
      'Si le nombre d\'échecs est supérieur à zéro, affiche le bloc AggregateException.',
      'Numérote les erreurs de 1 à N dans l\'ordre de lecture.'
    ],
    examples: [
      {
        stdin: `TASK T1 Status=OK
TASK T2 Status=FAIL Error="SocketException: Connexion refusee"
TASK T3 Status=OK
TASK T4 Status=FAIL Error="SqlException: Timeout expire"`,
        expected: `WHENALL: 2 succes, 2 echecs
AggregateException levee (2 erreurs):
- Erreur 1: SocketException: Connexion refusee
- Erreur 2: SqlException: Timeout expire`,
        note: 'Task.WhenAll agrège les deux exceptions sans perdre la seconde.'
      }
    ],
    tests: [
      {
        label: 'Toutes les tâches réussies',
        stdin: `TASK T1 Status=OK
TASK T2 Status=OK
TASK T3 Status=OK`,
        expected: `WHENALL: 3 succes, 0 echecs
Execution terminee sans exception`
      },
      {
        label: 'Un seul échec isolé',
        stdin: `TASK T1 Status=OK
TASK T2 Status=FAIL Error="HttpRequestException: 404 Not Found"`,
        expected: `WHENALL: 1 succes, 1 echecs
AggregateException levee (1 erreurs):
- Erreur 1: HttpRequestException: 404 Not Found`
      },
      {
        label: 'Tous les appels en échec',
        stdin: `TASK A Status=FAIL Error="IOException: Disque plein"
TASK B Status=FAIL Error="UnauthorizedAccessException: Droit refuse"`,
        expected: `WHENALL: 0 succes, 2 echecs
AggregateException levee (2 erreurs):
- Erreur 1: IOException: Disque plein
- Erreur 2: UnauthorizedAccessException: Droit refuse`
      },
      {
        label: 'Cinq tâches avec triple échec',
        stdin: `TASK Auth Status=OK
TASK Cache Status=FAIL Error="RedisConnectionException: Serveur indisponible"
TASK Bdd Status=OK
TASK Api Status=FAIL Error="TaskCanceledException: Annulation demandee"
TASK File Status=FAIL Error="InvalidOperationException: File pleine"`,
        expected: `WHENALL: 2 succes, 3 echecs
AggregateException levee (3 erreurs):
- Erreur 1: RedisConnectionException: Serveur indisponible
- Erreur 2: TaskCanceledException: Annulation demandee
- Erreur 3: InvalidOperationException: File pleine`
      }
    ],
    solution: `import sys, re

lines = [l.strip() for l in sys.stdin if l.strip()]
succes = 0
echecs = []

for line in lines:
    if "Status=OK" in line:
        succes += 1
    elif "Status=FAIL" in line:
        m = re.search(r'Error="([^"]+)"', line)
        if m:
            echecs.append(m.group(1))

print(f"WHENALL: {succes} succes, {len(echecs)} echecs")
if echecs:
    print(f"AggregateException levee ({len(echecs)} erreurs):")
    for i, err in enumerate(echecs, 1):
        print(f"- Erreur {i}: {err}")
else:
    print("Execution terminee sans exception")
`
  },
  {
    id: 'csb2-c6-e3',
    chapter: 6,
    title: 'Gestion déterministe des ressources non managées (IDisposable et using)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le pattern IDisposable et l\'instruction using C# garantissant la libération des ressources en toutes circonstances.',
    brief: '<p>En C#, l\'instruction <code>using (var res = new Ressource()) { ... }</code> se traduit par un bloc <code>try / finally</code> où <code>res.Dispose()</code> est obligatoirement exécuté pour libérer les handles natifs (fichiers, sockets, curseurs BD), même en cas de crash non géré.<br>\nLe script lit une suite d\'actions :<br>\n- <code>RESOURCE &lt;Nom&gt; ALLOCATE=&lt;Handle&gt;</code> : instanciation de la ressource non managée ;<br>\n- <code>OP &lt;NomOp&gt; &lt;Params&gt;</code> : exécution d\'une opération métier au sein du scope <code>using</code> ;<br>\n- <code>THROW &lt;TypeException&gt;</code> : survenue d\'une exception non capturée à l\'intérieur du scope ;<br>\n- <code>EXIT</code> : sortie normale du bloc <code>using</code>.<br>\nLe script doit tracer les étapes et garantir l\'appel inconditionnel de <code>[DISPOSE]</code> à la fin.</p>\n<p>Format de sortie :<br><code>[ALLOC] &lt;Nom&gt; alloue (Handle=&lt;Handle&gt;)</code><br><code>[EXEC] Op &lt;NomOp&gt; &lt;Params&gt;</code><br><code>[CRASH] Exception &lt;Type&gt; interceptee</code> (si applicable)<br><code>[DISPOSE] &lt;Nom&gt; libere via IDisposable</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler le cycle de vie IDisposable avec instruction using
`,
    hints: [
      'Garde une référence vers la ressource allouée au début.',
      'Affiche chaque opération OP exécutée.',
      'Si une exception THROW survient, intercepte-la et appelle quand même le bloc finally [DISPOSE].'
    ],
    examples: [
      {
        stdin: `RESOURCE FichierLogs ALLOCATE=Handle0x10A
OP EcritureLigne "Demarrage"
THROW DiskFullException`,
        expected: `[ALLOC] FichierLogs alloue (Handle=Handle0x10A)
[EXEC] Op EcritureLigne "Demarrage"
[CRASH] Exception DiskFullException intercepte
[DISPOSE] FichierLogs libere via IDisposable`,
        note: 'Malgré le crash DiskFullException, la ressource est immédiatement libérée via le finally de using.'
      }
    ],
    tests: [
      {
        label: 'Sortie normale sans exception',
        stdin: `RESOURCE BddConnection ALLOCATE=Sock0x99
OP Requete "SELECT * FROM Users"
EXIT`,
        expected: `[ALLOC] BddConnection alloue (Handle=Sock0x99)
[EXEC] Op Requete "SELECT * FROM Users"
[DISPOSE] BddConnection libere via IDisposable`
      },
      {
        label: 'Plusieurs opérations avant crash',
        stdin: `RESOURCE ImageRenderer ALLOCATE=Gpu0xAA
OP ChargerTexture "background.png"
OP AppliquerFiltre "Blur"
THROW OutOfMemoryException`,
        expected: `[ALLOC] ImageRenderer alloue (Handle=Gpu0xAA)
[EXEC] Op ChargerTexture "background.png"
[EXEC] Op AppliquerFiltre "Blur"
[CRASH] Exception OutOfMemoryException intercepte
[DISPOSE] ImageRenderer libere via IDisposable`
      },
      {
        label: 'Crash immédiat juste après allocation',
        stdin: `RESOURCE PortSerie ALLOCATE=COM3
THROW TimeoutException`,
        expected: `[ALLOC] PortSerie alloue (Handle=COM3)
[CRASH] Exception TimeoutException intercepte
[DISPOSE] PortSerie libere via IDisposable`
      },
      {
        label: 'Enchaînement de lectures standard',
        stdin: `RESOURCE FileStream ALLOCATE=FD12
OP Read 1024
OP Read 2048
EXIT`,
        expected: `[ALLOC] FileStream alloue (Handle=FD12)
[EXEC] Op Read 1024
[EXEC] Op Read 2048
[DISPOSE] FileStream libere via IDisposable`
      }
    ],
    solution: `import sys, re

lines = [l.strip() for l in sys.stdin if l.strip()]
res_name = "Ressource"
res_handle = "0x0"

for line in lines:
    parts = line.split(maxsplit=2)
    if not parts:
        continue
    cmd = parts[0]
    
    if cmd == "RESOURCE":
        res_name = parts[1]
        m = re.search(r'ALLOCATE=([a-zA-Z0-9_]+)', line)
        res_handle = m.group(1) if m else "0x0"
        print(f"[ALLOC] {res_name} alloue (Handle={res_handle})")
    elif cmd == "OP":
        rest = line[len("OP "):].strip()
        print(f"[EXEC] Op {rest}")
    elif cmd == "THROW":
        etype = parts[1]
        print(f"[CRASH] Exception {etype} intercepte")
        break
    elif cmd == "EXIT":
        break

print(f"[DISPOSE] {res_name} libere via IDisposable")
`
  }
];
