/**
 * Exercices Chapitre 4 — Linux Avancé B3.
 * Isolation & Conteneurisation Noyau : Namespaces & Cgroups v2.
 */
'use strict';

module.exports = [
  {
    id: 'lx3-c4-e1',
    chapter: 4,
    title: 'Classificateur et auditeur de namespaces Linux par processus',
    level: 'n1',
    language: 'python',
    goal: 'Comparer les identifiants d’inodes de namespaces d’un processus par rapport à l’espace hôte.',
    brief: `<p>Les <strong>namespaces</strong> Linux fournissent l'isolation nécessaire aux conteneurs (Docker, containerd, LXC) en partitionnant les ressources globales du système (PID, NET, MNT, IPC, UTS, USER). Chaque namespace est identifié dans <code>/proc/[pid]/ns/</code> par un numéro d'inode unique.<br><br>
Le script lit sur l'entrée standard des comparaisons au format :<br>
<code>NS_CHECK pid=&lt;id&gt; ns_pid=&lt;inode&gt; ns_net=&lt;inode&gt; ns_mnt=&lt;inode&gt; host_pid=&lt;hinode&gt; host_net=&lt;hinode&gt; host_mnt=&lt;hinode&gt;</code>.<br><br>
Règles :<br>
1. Comparer chaque namespace (PID, NET, MNT) à sa contrepartie hôte.<br>
2. Compter le nombre de namespaces isolés (différents de l'hôte) : <code>diff_count</code>.<br>
3. Si <code>diff_count &gt; 0</code> : <code>isolated=OUI</code>, sinon <code>isolated=NON</code>.<br><br>
Pour chaque processus, afficher :<br>
<code>NS_STATUS pid={pid} isolated={OUI|NON} isolated_count={diff_count}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : comparer les namespaces avec ceux de l'hôte
`,
    hints: [
      'Comparer ns_pid != host_pid, ns_net != host_net, ns_mnt != host_mnt.',
      'Incrémenter un compteur pour chaque divergence constatée.'
    ],
    examples: [
      {
        stdin: 'NS_CHECK pid=101 ns_pid=4026531836 ns_net=4026531992 ns_mnt=4026532000 host_pid=4026531836 host_net=4026531992 host_mnt=4026532000',
        expected: 'NS_STATUS pid=101 isolated=NON isolated_count=0',
        note: 'Le processus partage tous les namespaces de l’hôte : il n’est pas conteneurisé.'
      }
    ],
    tests: [
      {
        label: 'Processus en conteneur complet avec isolation totale (3/3)',
        stdin: 'NS_CHECK pid=5000 ns_pid=4026532500 ns_net=4026532501 ns_mnt=4026532502 host_pid=4026531836 host_net=4026531992 host_mnt=4026532000',
        expected: 'NS_STATUS pid=5000 isolated=OUI isolated_count=3'
      },
      {
        label: 'Processus avec isolation réseau uniquement (ex: conteneur host network)',
        stdin: 'NS_CHECK pid=6000 ns_pid=4026531836 ns_net=4026533000 ns_mnt=4026531836 host_pid=4026531836 host_net=4026531992 host_mnt=4026531836',
        expected: 'NS_STATUS pid=6000 isolated=OUI isolated_count=1'
      },
      {
        label: 'Processus système hôte standard',
        stdin: 'NS_CHECK pid=1 ns_pid=1000 ns_net=2000 ns_mnt=3000 host_pid=1000 host_net=2000 host_mnt=3000',
        expected: 'NS_STATUS pid=1 isolated=NON isolated_count=0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('NS_CHECK'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pid = params.get('pid', '0')
    diff_count = 0
    if params.get('ns_pid') != params.get('host_pid'):
        diff_count += 1
    if params.get('ns_net') != params.get('host_net'):
        diff_count += 1
    if params.get('ns_mnt') != params.get('host_mnt'):
        diff_count += 1
        
    isolated = 'OUI' if diff_count > 0 else 'NON'
    print(f"NS_STATUS pid={pid} isolated={isolated} isolated_count={diff_count}")
`
  },
  {
    id: 'lx3-c4-e2',
    chapter: 4,
    title: 'Contrôleur de quotas et limites de ressources Cgroups v2 (cpu.max & memory.max)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la bande passante processeur autorisée et vérifier le plafonnement mémoire dans la hiérarchie Cgroups v2.',
    brief: `<p><strong>Cgroups v2 (Control Groups)</strong> sous Linux unifie la gestion des ressources système dans <code>/sys/fs/cgroup/</code>.<br><br>
Directives Cgroups v2 :<br>
- <code>cpu.max = &lt;quota&gt; &lt;period&gt;</code> : Si quota vaut <code>max</code>, la limite CPU est <code>UNLIMITED</code>. Sinon, le nombre de cœurs alloués équivalent vaut <code>quota / period</code> (ex: 200000 100000 &rarr; 2.0 cœurs).<br>
- <code>memory.max = &lt;limite_Mo&gt;</code> : Si la mémoire actuelle dépasse ou égale la limite, le groupe subit un étranglement ou risque l'OOM (<code>mem_status=SATURATED</code>), sinon <code>mem_status=OK</code>.<br><br>
Le script lit sur l'entrée standard des paramètres au format :<br>
<code>CGROUP group=&lt;nom&gt; cpu_quota=&lt;q|max&gt; cpu_period=&lt;p&gt; mem_curr_mb=&lt;cur&gt; mem_max_mb=&lt;max&gt;</code>.<br><br>
Pour chaque groupe, afficher :<br>
<code>CGROUP_AUDIT group={group} cpu_cores={val|UNLIMITED} mem_status={OK|SATURATED}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le quota CPU et vérifier la saturation mémoire Cgroups v2
`,
    hints: [
      'Si cpu_quota == "max", la valeur de cpu_cores est la chaîne "UNLIMITED".',
      'Sinon, calculer int(cpu_quota) / int(cpu_period) et formater avec un chiffre après la virgule (ex: 1.5, 2.0).',
      'Comparer mem_curr_mb >= mem_max_mb pour le statut mémoire.'
    ],
    examples: [
      {
        stdin: 'CGROUP group=web_tier cpu_quota=200000 cpu_period=100000 mem_curr_mb=256 mem_max_mb=512',
        expected: 'CGROUP_AUDIT group=web_tier cpu_cores=2.0 mem_status=OK',
        note: '200000 / 100000 = 2.0 cœurs. Mémoire 256 < 512 Mo : statut OK.'
      }
    ],
    tests: [
      {
        label: 'Groupe sans limite CPU (max) et mémoire saturée',
        stdin: 'CGROUP group=batch_proc cpu_quota=max cpu_period=100000 mem_curr_mb=1024 mem_max_mb=1024',
        expected: 'CGROUP_AUDIT group=batch_proc cpu_cores=UNLIMITED mem_status=SATURATED'
      },
      {
        label: 'Demi-cœur alloué (0.5) et statut mémoire sain',
        stdin: 'CGROUP group=micro_api cpu_quota=50000 cpu_period=100000 mem_curr_mb=64 mem_max_mb=128',
        expected: 'CGROUP_AUDIT group=micro_api cpu_cores=0.5 mem_status=OK'
      },
      {
        label: 'Quatre cœurs alloués et dépassement mémoire',
        stdin: 'CGROUP group=db_container cpu_quota=400000 cpu_period=100000 mem_curr_mb=4096 mem_max_mb=2048',
        expected: 'CGROUP_AUDIT group=db_container cpu_cores=4.0 mem_status=SATURATED'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('CGROUP'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    group = params.get('group', 'cg')
    q = params.get('cpu_quota', 'max')
    p = int(params.get('cpu_period', 100000))
    cur_m = int(params.get('mem_curr_mb', 0))
    max_m = int(params.get('mem_max_mb', 1024))
    
    if q == 'max':
        cpu_cores = 'UNLIMITED'
    else:
        cores_val = int(q) / p
        cpu_cores = f"{cores_val:.1f}"
        
    mem_status = 'SATURATED' if cur_m >= max_m else 'OK'
    print(f"CGROUP_AUDIT group={group} cpu_cores={cpu_cores} mem_status={mem_status}")
`
  },
  {
    id: 'lx3-c4-e3',
    chapter: 4,
    title: 'Détecteur de sacrifice OOM Killer et pondération oom_score_adj',
    level: 'n3',
    language: 'python',
    goal: 'Calculer le score de sacrifice du mécanisme Out Of Memory (OOM Killer) du noyau Linux.',
    brief: `<p>Lorsque la RAM physique et le swap sont intégralement épuisés, le noyau Linux invoque l'<strong>OOM Killer</strong> pour terminer un processus et libérer d'urgence de la mémoire.<br><br>
Chaque processus dispose d'un score d'ajustement configurable dans <code>/proc/[pid]/oom_score_adj</code> allant de <code>-1000</code> à <code>+1000</code> :<br>
- Si <code>oom_score_adj == -1000</code> : le processus est <strong>totalement immunisé</strong> contre l'OOM Killer (ex: SSH, base de données critique). Son score final est <code>IMMUNE</code> et son risque est <code>NONE</code>.<br>
- Sinon : <code>score = int(mem_mb) + int(oom_score_adj)</code>.<br>
Évaluation du risque :<br>
- Si <code>score &gt; 1000</code> : <code>risk=HIGH</code> (première cible de sacrifice).<br>
- Sinon : <code>risk=LOW</code>.<br><br>
Le script lit sur l'entrée standard des candidats au format :<br>
<code>OOM_PROC pid=&lt;id&gt; comm=&lt;nom&gt; mem_mb=&lt;m&gt; oom_score_adj=&lt;score&gt;</code>.<br><br>
Pour chaque processus, afficher :<br>
<code>OOM_TARGET pid={pid} comm={comm} score={score|IMMUNE} risk={HIGH|LOW|NONE}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le score OOM et déterminer le risque de sacrifice
`,
    hints: [
      'Traiter en priorité le cas oom_score_adj == -1000 qui confère l’immunité absolue.',
      'Pour les autres processus, additionner mem_mb et oom_score_adj puis comparer à 1000.'
    ],
    examples: [
      {
        stdin: 'OOM_PROC pid=1 comm=systemd mem_mb=25 oom_score_adj=-1000',
        expected: 'OOM_TARGET pid=1 comm=systemd score=IMMUNE risk=NONE',
        note: 'PID 1 (systemd) a un ajustement de -1000 : il ne sera jamais ciblé par l’OOM Killer.'
      }
    ],
    tests: [
      {
        label: 'Processus consommateur à haut risque de sacrifice',
        stdin: 'OOM_PROC pid=3420 comm=mem_leak mem_mb=1200 oom_score_adj=200',
        expected: 'OOM_TARGET pid=3420 comm=mem_leak score=1400 risk=HIGH'
      },
      {
        label: 'Processus protégé avec score négatif sans être immunisé',
        stdin: 'OOM_PROC pid=880 comm=sshd mem_mb=50 oom_score_adj=-500',
        expected: 'OOM_TARGET pid=880 comm=sshd score=-450 risk=LOW'
      },
      {
        label: 'Processus standard modéré',
        stdin: 'OOM_PROC pid=2100 comm=worker mem_mb=600 oom_score_adj=0',
        expected: 'OOM_TARGET pid=2100 comm=worker score=600 risk=LOW'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('OOM_PROC'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pid = params.get('pid', '0')
    comm = params.get('comm', 'app')
    mem_mb = int(params.get('mem_mb', 0))
    adj = int(params.get('oom_score_adj', 0))
    
    if adj == -1000:
        score_str = 'IMMUNE'
        risk = 'NONE'
    else:
        score_val = mem_mb + adj
        score_str = str(score_val)
        risk = 'HIGH' if score_val > 1000 else 'LOW'
        
    print(f"OOM_TARGET pid={pid} comm={comm} score={score_str} risk={risk}")
`
  }
];
