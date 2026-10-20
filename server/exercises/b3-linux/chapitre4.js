'use strict';

module.exports = [
  {
    "id": "lx3-c4-e1",
    "chapter": 4,
    "title": "Classificateur et auditeur de namespaces Linux par processus",
    "level": "n1",
    "language": "analyse",
    "goal": "Comparer les identifiants d’inodes de namespaces d’un processus par rapport à l’espace hôte.",
    "brief": "<p>Les <strong>namespaces</strong> Linux fournissent l'isolation nécessaire aux conteneurs (Docker, containerd, LXC) en partitionnant les ressources globales du système (PID, NET, MNT, IPC, UTS, USER). Chaque namespace est identifié dans <code>/proc/[pid]/ns/</code> par un numéro d'inode unique.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles :<br>\n1. Comparer chaque namespace (PID, NET, MNT) à sa contrepartie hôte.<br>\n2. Compter le nombre de namespaces isolés (différents de l'hôte) : <code>diff_count</code>.<br>\n3. Si <code>diff_count &gt; 0</code> : <code>isolated=OUI</code>, sinon <code>isolated=NON</code>.<br><br>\nPour chaque processus, afficher :<br>\n<code>NS_STATUS pid={pid} isolated={OUI|NON} isolated_count={diff_count}</code></p>",
    "starter": "# Grille d'analyse (lx3-c4-e1) — Classificateur et auditeur de namespaces Linux par processus\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Processus en conteneur complet avec isolation totale (3/3)]\n# Données : NS_CHECK pid=5000 ns_pid=4026532500 ns_net=4026532501 ns_mnt=4026532502 host_pid=4026531836 host_net=4026531992 host_mnt=4026532000\nA_COMPLETER\n\n[Cas 2 — Processus avec isolation réseau uniquement (ex: conteneur host network)]\n# Données : NS_CHECK pid=6000 ns_pid=4026531836 ns_net=4026533000 ns_mnt=4026531836 host_pid=4026531836 host_net=4026531992 host_mnt=4026531836\nA_COMPLETER\n\n[Cas 3 — Processus système hôte standard]\n# Données : NS_CHECK pid=1 ns_pid=1000 ns_net=2000 ns_mnt=3000 host_pid=1000 host_net=2000 host_mnt=3000\nA_COMPLETER\n",
    "hints": [
      "Comparer ns_pid != host_pid, ns_net != host_net, ns_mnt != host_mnt.",
      "Incrémenter un compteur pour chaque divergence constatée."
    ],
    "examples": [
      {
        "stdin": "NS_CHECK pid=101 ns_pid=4026531836 ns_net=4026531992 ns_mnt=4026532000 host_pid=4026531836 host_net=4026531992 host_mnt=4026532000",
        "expected": "NS_STATUS pid=101 isolated=NON isolated_count=0",
        "note": "Le processus partage tous les namespaces de l’hôte : il n’est pas conteneurisé."
      }
    ],
    "tests": [
      {
        "label": "Processus en conteneur complet avec isolation totale (3/3)",
        "stdin": "cas:1",
        "expected": "NS_STATUS pid=5000 isolated=OUI isolated_count=3"
      },
      {
        "label": "Processus avec isolation réseau uniquement (ex: conteneur host network)",
        "stdin": "cas:2",
        "expected": "NS_STATUS pid=6000 isolated=OUI isolated_count=1"
      },
      {
        "label": "Processus système hôte standard",
        "stdin": "cas:3",
        "expected": "NS_STATUS pid=1 isolated=NON isolated_count=0"
      }
    ],
    "solution": "[Exemple]\nNS_STATUS pid=101 isolated=NON isolated_count=0\n\n[Cas 1 — Processus en conteneur complet avec isolation totale (3/3)]\nNS_STATUS pid=5000 isolated=OUI isolated_count=3\n\n[Cas 2 — Processus avec isolation réseau uniquement (ex: conteneur host network)]\nNS_STATUS pid=6000 isolated=OUI isolated_count=1\n\n[Cas 3 — Processus système hôte standard]\nNS_STATUS pid=1 isolated=NON isolated_count=0"
  },
  {
    "id": "lx3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de quotas et limites de ressources Cgroups v2 (cpu.max & memory.max)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la bande passante processeur autorisée et vérifier le plafonnement mémoire dans la hiérarchie Cgroups v2.",
    "brief": "<p><strong>Cgroups v2 (Control Groups)</strong> sous Linux unifie la gestion des ressources système dans <code>/sys/fs/cgroup/</code>.<br><br>\nDirectives Cgroups v2 :<br>\n- <code>cpu.max = &lt;quota&gt; &lt;period&gt;</code> : Si quota vaut <code>max</code>, la limite CPU est <code>UNLIMITED</code>. Sinon, le nombre de cœurs alloués équivalent vaut <code>quota / period</code> (ex: 200000 100000 &rarr; 2.0 cœurs).<br>\n- <code>memory.max = &lt;limite_Mo&gt;</code> : Si la mémoire actuelle dépasse ou égale la limite, le groupe subit un étranglement ou risque l'OOM (<code>mem_status=SATURATED</code>), sinon <code>mem_status=OK</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque groupe, afficher :<br>\n<code>CGROUP_AUDIT group={group} cpu_cores={val|UNLIMITED} mem_status={OK|SATURATED}</code></p>",
    "starter": "# Grille d'analyse (lx3-c4-e2) — Contrôleur de quotas et limites de ressources Cgroups v2 (cpu.max & memory.max)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Groupe sans limite CPU (max) et mémoire saturée]\n# Données : CGROUP group=batch_proc cpu_quota=max cpu_period=100000 mem_curr_mb=1024 mem_max_mb=1024\nA_COMPLETER\n\n[Cas 2 — Demi-cœur alloué (0.5) et statut mémoire sain]\n# Données : CGROUP group=micro_api cpu_quota=50000 cpu_period=100000 mem_curr_mb=64 mem_max_mb=128\nA_COMPLETER\n\n[Cas 3 — Quatre cœurs alloués et dépassement mémoire]\n# Données : CGROUP group=db_container cpu_quota=400000 cpu_period=100000 mem_curr_mb=4096 mem_max_mb=2048\nA_COMPLETER\n",
    "hints": [
      "Si cpu_quota == \"max\", la valeur de cpu_cores est la chaîne \"UNLIMITED\".",
      "Sinon, calculer int(cpu_quota) / int(cpu_period) et formater avec un chiffre après la virgule (ex: 1.5, 2.0).",
      "Comparer mem_curr_mb >= mem_max_mb pour le statut mémoire."
    ],
    "examples": [
      {
        "stdin": "CGROUP group=web_tier cpu_quota=200000 cpu_period=100000 mem_curr_mb=256 mem_max_mb=512",
        "expected": "CGROUP_AUDIT group=web_tier cpu_cores=2.0 mem_status=OK",
        "note": "200000 / 100000 = 2.0 cœurs. Mémoire 256 < 512 Mo : statut OK."
      }
    ],
    "tests": [
      {
        "label": "Groupe sans limite CPU (max) et mémoire saturée",
        "stdin": "cas:1",
        "expected": "CGROUP_AUDIT group=batch_proc cpu_cores=UNLIMITED mem_status=SATURATED"
      },
      {
        "label": "Demi-cœur alloué (0.5) et statut mémoire sain",
        "stdin": "cas:2",
        "expected": "CGROUP_AUDIT group=micro_api cpu_cores=0.5 mem_status=OK"
      },
      {
        "label": "Quatre cœurs alloués et dépassement mémoire",
        "stdin": "cas:3",
        "expected": "CGROUP_AUDIT group=db_container cpu_cores=4.0 mem_status=SATURATED"
      }
    ],
    "solution": "[Exemple]\nCGROUP_AUDIT group=web_tier cpu_cores=2.0 mem_status=OK\n\n[Cas 1 — Groupe sans limite CPU (max) et mémoire saturée]\nCGROUP_AUDIT group=batch_proc cpu_cores=UNLIMITED mem_status=SATURATED\n\n[Cas 2 — Demi-cœur alloué (0.5) et statut mémoire sain]\nCGROUP_AUDIT group=micro_api cpu_cores=0.5 mem_status=OK\n\n[Cas 3 — Quatre cœurs alloués et dépassement mémoire]\nCGROUP_AUDIT group=db_container cpu_cores=4.0 mem_status=SATURATED"
  },
  {
    "id": "lx3-c4-e3",
    "chapter": 4,
    "title": "Détecteur de sacrifice OOM Killer et pondération oom_score_adj",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer le score de sacrifice du mécanisme Out Of Memory (OOM Killer) du noyau Linux.",
    "brief": "<p>Lorsque la RAM physique et le swap sont intégralement épuisés, le noyau Linux invoque l'<strong>OOM Killer</strong> pour terminer un processus et libérer d'urgence de la mémoire.<br><br>\nChaque processus dispose d'un score d'ajustement configurable dans <code>/proc/[pid]/oom_score_adj</code> allant de <code>-1000</code> à <code>+1000</code> :<br>\n- Si <code>oom_score_adj == -1000</code> : le processus est <strong>totalement immunisé</strong> contre l'OOM Killer (ex: SSH, base de données critique). Son score final est <code>IMMUNE</code> et son risque est <code>NONE</code>.<br>\n- Sinon : <code>score = int(mem_mb) + int(oom_score_adj)</code>.<br>\nÉvaluation du risque :<br>\n- Si <code>score &gt; 1000</code> : <code>risk=HIGH</code> (première cible de sacrifice).<br>\n- Sinon : <code>risk=LOW</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque processus, afficher :<br>\n<code>OOM_TARGET pid={pid} comm={comm} score={score|IMMUNE} risk={HIGH|LOW|NONE}</code></p>",
    "starter": "# Grille d'analyse (lx3-c4-e3) — Détecteur de sacrifice OOM Killer et pondération oom_score_adj\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Processus consommateur à haut risque de sacrifice]\n# Données : OOM_PROC pid=3420 comm=mem_leak mem_mb=1200 oom_score_adj=200\nA_COMPLETER\n\n[Cas 2 — Processus protégé avec score négatif sans être immunisé]\n# Données : OOM_PROC pid=880 comm=sshd mem_mb=50 oom_score_adj=-500\nA_COMPLETER\n\n[Cas 3 — Processus standard modéré]\n# Données : OOM_PROC pid=2100 comm=worker mem_mb=600 oom_score_adj=0\nA_COMPLETER\n",
    "hints": [
      "Traiter en priorité le cas oom_score_adj == -1000 qui confère l’immunité absolue.",
      "Pour les autres processus, additionner mem_mb et oom_score_adj puis comparer à 1000."
    ],
    "examples": [
      {
        "stdin": "OOM_PROC pid=1 comm=systemd mem_mb=25 oom_score_adj=-1000",
        "expected": "OOM_TARGET pid=1 comm=systemd score=IMMUNE risk=NONE",
        "note": "PID 1 (systemd) a un ajustement de -1000 : il ne sera jamais ciblé par l’OOM Killer."
      }
    ],
    "tests": [
      {
        "label": "Processus consommateur à haut risque de sacrifice",
        "stdin": "cas:1",
        "expected": "OOM_TARGET pid=3420 comm=mem_leak score=1400 risk=HIGH"
      },
      {
        "label": "Processus protégé avec score négatif sans être immunisé",
        "stdin": "cas:2",
        "expected": "OOM_TARGET pid=880 comm=sshd score=-450 risk=LOW"
      },
      {
        "label": "Processus standard modéré",
        "stdin": "cas:3",
        "expected": "OOM_TARGET pid=2100 comm=worker score=600 risk=LOW"
      }
    ],
    "solution": "[Exemple]\nOOM_TARGET pid=1 comm=systemd score=IMMUNE risk=NONE\n\n[Cas 1 — Processus consommateur à haut risque de sacrifice]\nOOM_TARGET pid=3420 comm=mem_leak score=1400 risk=HIGH\n\n[Cas 2 — Processus protégé avec score négatif sans être immunisé]\nOOM_TARGET pid=880 comm=sshd score=-450 risk=LOW\n\n[Cas 3 — Processus standard modéré]\nOOM_TARGET pid=2100 comm=worker score=600 risk=LOW"
  }
];
