/**
 * Chapitre 1 du cours « Linux Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Noyau Linux, Pseudo-FS (/proc, /sys) &amp; Appels Système',
  short: 'Noyau Linux, /proc &amp; Syscalls',
  toc: 'Architecture noyau (espace noyau vs espace utilisateur, VFS), inspection de /proc et /sys, mémoire virtuelle (W^X), et traçage des appels système avec strace.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Lorsqu’un serveur de production Linux subit un pic d’utilisation anormal, des temps de réponse dégradés ou un processus figé qui refuse de s’arrêter, les outils de base (top, ps) ne suffisent plus. En Bachelor 3, l’ingénieur système ou SRE doit plonger sous la surface et observer l’activité réelle du noyau (kernel space). Linux expose l’état dynamique de ses structures de données internes (ordonnanceur, gestionnaire de mémoire virtuelle, descripteurs de fichiers) à travers deux pseudo-systèmes de fichiers purement virtuels : /proc et /sys. De plus, la compréhension de la frontière entre l’espace utilisateur (Ring 3) et l’espace noyau (Ring 0) via les appels système (syscalls) et leur traçage avec strace est indispensable pour diagnostiquer les goulets d’étranglement d’I/O et les failles de sécurité.',
  objectives: [
    'comprendre l’architecture du noyau Linux monolithique modulaire et la séparation matériel/logiciel (Ring 0 vs Ring 3) ;',
    'analyser le rôle du Virtual File System (VFS) et le fonctionnement en mémoire des pseudo-systèmes de fichiers /proc et /sys ;',
    'décoder les métriques d’ordonnancement, de mémoire résidente (RSS) et d’états de processus dans /proc/[pid]/stat ;',
    'inspecter l’espace d’adressage virtuel dans /proc/[pid]/maps et vérifier le principe de sécurité W^X (Write XOR Execute) ;',
    'intercepter et profiler les appels système (syscalls) avec strace via l’API ptrace(2) pour isoler les erreurs d’I/O ;',
    'développer en Python 3 des parseurs de structures /proc, des auditeurs de mémoire virtuelle et des analyseurs de traces noyau.'
  ],
  sections: [
    {
      title: 'Architecture du Noyau Linux, Anneaux de Privilèges &amp; VFS',
      html: [
        '<p>Le système d’exploitation GNU/Linux repose sur un <strong>noyau monolithique modulaire</strong>. Le processeur physique applique une séparation matérielle stricte des privilèges :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Anneaux de Privilèges CPU (Rings)</h4>',
        '    <ul>',
        '      <li><strong>Ring 0 (Kernel Space / Mode Superviseur) :</strong> Le code du noyau s’exécute avec un accès direct et illimité au matériel, aux registres du processeur et à la mémoire physique globale.</li>',
        '      <li><strong>Ring 3 (User Space / Mode Utilisateur) :</strong> Les applications, serveurs web et commandes utilisateur s’exécutent dans un espace protégé et restreint. Tout accès au disque, au réseau ou à la mémoire passe obligatoirement par un <strong>appel système (syscall)</strong> qui commute le processeur en Ring 0.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le Virtual File System (VFS)</h4>',
        '    <p>Le VFS est la couche d’abstraction logicielle universelle du noyau qui unifie tous les systèmes de fichiers sous une même arborescence hiérarchique avec la philosophie Unix : <em>« Tout est fichier »</em>.</p>',
        '    <p>Qu’il s’agisse d’un disque SSD local (ext4/XFS), d’un partage réseau distant (NFS), d’un pseudo-périphérique matériel (<code>/dev/null</code>) ou d’une structure de données en mémoire vive (<code>/proc</code>), les programmes utilisent la même API standard : <code>open()</code>, <code>read()</code>, <code>write()</code>, <code>close()</code>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Le Pseudo-Système de Fichiers /proc : Fenêtre sur la task_struct',
      html: [
        '<p>Le répertoire <code>/proc</code> ne consomme <strong>aucun octet sur le disque dur</strong>. Il est monté avec le type de système de fichiers virtuel <code>procfs</code> : chaque lecture génère les données au vol à partir de la mémoire vive du noyau.</p>',
        '<p>Pour chaque processus actif identifié par son PID, le sous-dossier <code>/proc/[pid]/</code> expose la structure de données interne <code>task_struct</code> du noyau :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Fichier /proc/[pid]/</th><th>Informations Exposées</th><th>Usage Opérationnel</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>cmdline</code></td><td>Ligne de commande complète ayant lancé le processus avec ses arguments séparés par <code>\\0</code>.</td><td>Identification précise de la commande en cours.</td></tr>',
        '    <tr><td><code>stat</code></td><td>Ligne condensée contenant l’état du processus, son père (PPID), les temps CPU (utime, stime) et les pages mémoire (RSS).</td><td>Surveillance d’ordonnancement et calcul d’utilisation CPU.</td></tr>',
        '    <tr><td><code>status</code></td><td>Version textuelle lisible de <code>stat</code> (UID/GID réels et effectifs, masques de signaux, threads).</td><td>Audit de sécurité des privilèges de processus.</td></tr>',
        '    <tr><td><code>fd/</code></td><td>Répertoire de liens symboliques listant tous les descripteurs de fichiers ouverts (sockets, fichiers, pipes).</td><td>Diagnostic de fuites de descripteurs (Too many open files).</td></tr>',
        '    <tr><td><code>maps</code></td><td>Cartographie complète des plages de mémoire virtuelle allouées au processus.</td><td>Détection de corruption mémoire et attaques buffer overflow.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Espace d’Adressage Virtuel, Segments Mémoire &amp; Protection W^X',
      html: [
        '<p>Chaque processus sous Linux bénéficie d’un espace d’adressage virtuel isolé géré par la MMU (Memory Management Unit) du processeur et la table des pages du noyau. Le fichier <code>/proc/[pid]/maps</code> détaille ces segments :</p>',
        '<pre><code>00400000-00452000 r-xp 00000000 08:01 1234567    /usr/bin/mon_app\n00651000-00652000 rw-p 00051000 08:01 1234567    /usr/bin/mon_app\n01234000-01256000 rw-p 00000000 00:00 0          [heap]\n7ffd1234-7ffd5678 rw-p 00000000 00:00 0          [stack]</code></pre>',
        box('danger', 'Le Principe Fondamental de Sécurité W^X (Write XOR Execute)', [
          '<p>Les permissions de mémoire (<code>rwxp</code> : Read, Write, Execute, Private) sont cruciales pour la sécurité du système :</p>',
          '<ul>',
          '  <li><strong>Segment de code (texte) :</strong> doit être lisible et exécutable, mais <strong>jamais inscriptible</strong> (<code>r-xp</code>) pour empêcher la modification du binaire en mémoire.</li>',
          '  <li><strong>Tas (heap) et Pile (stack) :</strong> doivent être inscriptibles pour manipuler les données, mais <strong>jamais exécutables</strong> (<code>rw-p</code>).</li>',
          '  <li><strong>Violation W^X :</strong> Si une page mémoire est à la fois inscriptible et exécutable (<code>rwxp</code>), un attaquant injectant du shellcode dans une variable peut immédiatement forcer le processeur à exécuter ses instructions arbitraires.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Interception et Profilage des Appels Système avec strace',
      html: [
        '<p>Un appel système (System Call ou <em>syscall</em>) est le point de passage obligatoire entre le code applicatif et le noyau Linux. Sous architecture x86_64, l’instruction assembleur <code>syscall</code> commute le CPU en Ring 0 avec le numéro d’appel dans le registre <code>RAX</code>.</p>',
        '<p>L’outil <strong><code>strace</code></strong> s’appuie sur l’appel système de débogage <code>ptrace(2)</code> pour intercepter chaque transition noyau :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Commandes strace Fréquentes</h4>',
        '    <ul>',
        '      <li><code>strace -p &lt;PID&gt;</code> : S’attache en direct à un processus en cours d’exécution.</li>',
        '      <li><code>strace -c ./binaire</code> : Produit un tableau statistique récapitulant le temps passé dans chaque syscall et le nombre d’erreurs.</li>',
        '      <li><code>strace -e trace=openat,read,write</code> : Filtre uniquement les appels d’I/O spécifiques.</li>',
        '      <li><code>strace -T -o trace.log ./app</code> : Enregistre le temps passé dans chaque appel (latence noyau).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Principales Erreurs Syscalls (errno)</h4>',
        '    <ul>',
        '      <li><code>ENOENT</code> (No such file or directory) : Chemin de fichier ou bibliothèque introuvable.</li>',
        '      <li><code>EACCES</code> (Permission denied) : Droits insuffisants selon les permissions Unix.</li>',
        '      <li><code>EAGAIN / EWOULDBLOCK</code> : I/O non bloquante sans donnée disponible immédiatement.</li>',
        '      <li><code>ENOMEM</code> (Out of memory) : Allocation de mémoire impossible par le noyau.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Diagnostic Approfondi d’un Processus Faux-Figeant',
  method: [
    'Étape 1 : Identifier le PID du processus suspect avec ps aux ou pgrep.',
    'Étape 2 : Inspecter /proc/[pid]/stat pour identifier son état (R pour CPU loop, D pour I/O bloquée, Z pour zombie).',
    'Étape 3 : Examiner /proc/[pid]/fd/ via ls -l pour repérer les descripteurs ouverts vers des fichiers verrouillés ou sockets réseau.',
    'Étape 4 : S’attacher avec strace -p <PID> -T pour observer en direct les appels système bloquants et leur temps d’attente.',
    'Étape 5 : Consulter /proc/[pid]/wchan pour afficher le nom exact de la fonction noyau dans laquelle le thread dort.',
    'Étape 6 : Si le processus est à l’état D, diagnostiquer le contrôleur matériel ou le serveur de stockage NFS distant responsable.'
  ],
  summary: [
    'Linux applique une séparation matérielle stricte entre Ring 0 (Kernel Space) et Ring 3 (User Space).',
    'Le VFS offre une interface universelle de système de fichiers : « tout est fichier » sous Unix.',
    '/proc et /sys sont des pseudo-systèmes de fichiers en mémoire vive exposant l’état interne du noyau.',
    'L’état D (Uninterruptible Sleep) est bloqué en I/O matérielle et ne répond à aucun signal (même kill -9).',
    'Un zombie (Z) a terminé son exécution mais attend que son père appelle wait() pour purger son entrée.',
    'La politique de sécurité W^X (Write XOR Execute) interdit formellement les segments mémoire simultanément inscriptibles et exécutables.',
    'strace intercepte les appels système via ptrace(2) pour profiler la latence et détecter les erreurs errno.'
  ],
  checklist: [
    'Je sais expliquer la différence entre le mode utilisateur (Ring 3) et le mode noyau (Ring 0).',
    'Je comprends pourquoi les pseudo-fichiers de /proc et /sys n’occupent aucun bloc sur le disque dur.',
    'Je sais identifier et interpréter les états de processus R, S, D, Z et T.',
    'Je sais expliquer pourquoi un processus à l’état D ne peut pas être tué par SIGKILL.',
    'Je maîtrise le principe de sécurité mémoire W^X (Write XOR Execute).',
    'Je sais utiliser strace pour intercepter les appels système et lire les codes d’erreur errno.'
  ],
  notions: [
    'Espace Noyau vs Espace Utilisateur (Ring 0 / Ring 3)',
    'Virtual File System (VFS)',
    'Pseudo-systèmes de fichiers /proc & /sys',
    'Structure interne task_struct',
    'États de processus (R, S, D, Z, T)',
    'Mémoire virtuelle et principe W^X',
    'Appels système (Syscalls & transition)',
    'Traçage avec strace et API ptrace(2)'
  ],
  pitfalls: [
    'Tenter d’exécuter kill -9 sur un processus bloqué à l’état D (il ne recevra jamais le signal tant que l’I/O n’est pas terminée).',
    'Croire que les zombies consomment de la mémoire vive (ils ne conservent qu’une entrée de PID dans la table des processus).',
    'Laisser des segments de mémoire virtuelle en RWX (porte ouverte aux injections de code shellcode exploitables).',
    'Exécuter strace en production sans filtre sur des processus à très fort trafic (surcharge CPU importante induite par ptrace).'
  ],
  questions: [
    {
      stem: 'Pourquoi le pseudo-système de fichiers « /proc » ne consomme-t-il aucun octet sur le disque dur physique ?',
      opts: [
        'Parce qu’il est compressé en continu avec l’algorithme gzip',
        'Parce qu’il réside exclusivement en mémoire vive et est généré dynamiquement par le noyau à la lecture',
        'Parce qu’il est hébergé sur un serveur distant de télémétrie',
        'Parce qu’il est effacé automatiquement chaque seconde'
      ],
      correct: 1,
      exp: '/proc est un pseudo-système de fichiers géré par procfs : il n’a aucune existence physique sur le disque. Le noyau génère les données au vol en mémoire vive lors des appels de lecture.'
    },
    {
      stem: 'Pourquoi un processus à l’état « D » (Uninterruptible Sleep) ne réagit-il pas à la commande « kill -9 » ?',
      opts: [
        'Parce que le signal SIGKILL n’existe pas sous Linux',
        'Parce que le processus attend une réponse matérielle directe (I/O disque) et le noyau bloque tout signal pour préserver la cohérence des pilotes',
        'Parce que le processus a des privilèges root supérieurs à systemd',
        'Parce que son fichier /proc/[pid]/status est verrouillé en écriture'
      ],
      correct: 1,
      exp: 'L’état D est réservé aux attentes d’I/O matérielles critiques. Pour éviter de corrompre les structures de données des pilotes de périphériques, le noyau n’applique aucun signal tant que l’I/O n’est pas acquittée.'
    },
    {
      stem: 'Qu’est-ce qu’un processus « Zombie » (état Z) sous Linux ?',
      opts: [
        'Un processus malveillant injecté par un rootkit',
        'Un processus qui s’exécute sans fin en consommant 100% du CPU',
        'Un processus terminé dont la mémoire a été libérée, mais dont le père n’a pas encore lu le code de retour via wait()',
        'Un conteneur Docker arrêté de force'
      ],
      correct: 2,
      exp: 'Un zombie a terminé son exécution mais conserve son entrée dans la table des processus tant que son parent n’a pas appelé wait(). Il ne consomme pas de mémoire mais occupe un PID.'
    },
    {
      stem: 'Que prescrit le principe de sécurité mémoire W^X (Write XOR Execute) ?',
      opts: [
        'Un fichier doit obligatoirement avoir les droits 777 pour être exécuté',
        'Une plage de mémoire virtuelle ne doit jamais être simultanément inscriptible et exécutable',
        'Le swap doit être chiffré avec une clé asymétrique',
        'Toutes les commandes doivent être exécutées dans un terminal X11'
      ],
      correct: 1,
      exp: 'W^X (Write XOR Execute) garantit qu’une page mémoire peut être inscriptible (données) ou exécutable (code), mais jamais les deux en même temps, neutralisant ainsi l’exécution directe de code injecté.'
    },
    {
      stem: 'Quel appel système de débogage l’utilitaire « strace » exploite-t-il pour intercepter les transitions noyau d’un processus ?',
      opts: [
        'clone(2)',
        'ptrace(2)',
        'fork(2)',
        'mmap(2)'
      ],
      correct: 1,
      exp: 'strace s’appuie sur ptrace(2) (Process Trace), qui permet à un processus parent de contrôler et surveiller l’exécution d’un autre processus, d’inspecter ses registres et d’intercepter ses syscalls.'
    },
    {
      stem: 'Que signifie le code d’erreur système « ENOENT » retourné par un appel système comme openat() ?',
      opts: [
        'Permission non accordée (Permission denied)',
        'Fichier ou répertoire introuvable (No such file or directory)',
        'Espace disque saturé (No space left on device)',
        'Opération interrompue par un signal (Interrupted system call)'
      ],
      correct: 1,
      exp: 'ENOENT (Error No Entry) est la constante POSIX retournée lorsqu’un chemin de fichier ou répertoire spécifié n’existe pas.'
    },
    {
      stem: 'Dans quelle structure de données interne du noyau Linux les informations sur chaque processus sont-elles stockées ?',
      opts: [
        'struct file_system',
        'struct task_struct',
        'struct cgroup_root',
        'struct mm_struct'
      ],
      correct: 1,
      exp: 'Chaque thread ou processus est représenté dans le noyau Linux par une structure en C appelée task_struct (définie dans include/linux/sched.h).'
    },
    {
      stem: 'Quelle option de « strace » permet de produire un résumé statistique du temps passé dans chaque appel système ?',
      opts: [
        'strace -c',
        'strace -f',
        'strace -v',
        'strace -x'
      ],
      correct: 0,
      exp: 'L’option -c compte le temps, les appels et les erreurs pour chaque appel système et affiche un tableau récapitulatif à la fin de l’exécution.'
    }
  ],
  flashcards: [
      { q: 'Qu’est-ce que « Espace Noyau vs Espace Utilisateur (Ring 0 / Ring 3) » ?', a: 'Espace Noyau vs Espace Utilisateur (Ring 0 / Ring 3)' },
      { q: 'Qu’est-ce que « Virtual File System (VFS) » ?', a: 'analyser le rôle du Virtual File System (VFS) et le fonctionnement en mémoire des pseudo-systèmes de fichiers /proc et /sys ;' },
      { q: 'Qu’est-ce que « Structure interne task_struct » ?', a: 'Structure interne task_struct' },
      { q: 'Qu’est-ce que « États de processus (R, S, D, Z, T) » ?', a: 'États de processus (R, S, D, Z, T)' },
      { q: 'Qu’est-ce que « Mémoire virtuelle et principe W^X » ?', a: 'Mémoire virtuelle et principe W^X' },
      { q: 'Qu’est-ce que « Traçage avec strace et API ptrace(2) » ?', a: 'Traçage avec strace et API ptrace(2)' },
      { q: 'Qu’est-ce que « Séquence d’amorçage (UEFI, GRUB2, initramfs) » ?', a: 'Séquence d’amorçage (UEFI, GRUB2, initramfs)' },
      { q: 'Qu’est-ce que « Processus d’initialisation PID 1 (Systemd) » ?', a: 'Processus d’initialisation PID 1 (Systemd)' },
      { q: 'Qu’est-ce que « Fichiers d’unités déclaratifs (.service, .socket, .target) » ?', a: 'Fichiers d’unités déclaratifs (.service, .socket, .target)' },
      { q: 'Qu’est-ce que « Dépendances d’activation (Requires, Wants) » ?', a: 'Dépendances d’activation (Requires, Wants)' },
      { q: 'Qu’est-ce que « Ordonnancement temporel (After, Before) » ?', a: 'Ordonnancement temporel (After, Before)' },
      { q: 'Qu’est-ce que « Activation par socket (Socket Activation) » ?', a: 'exploiter l’activation par socket (Socket Activation) pour éliminer les dépendances d’ordre et démarrer les démons à la demande ;' },
      { q: 'Qu’est-ce que « Drapeaux de redémarrage (Restart=on-failure) » ?', a: 'Drapeaux de redémarrage (Restart=on-failure)' },
      { q: 'Qu’est-ce que « Journalisation binaire structurée (systemd-journald) » ?', a: 'Journalisation binaire structurée (systemd-journald)' },
      { q: 'Qu’est-ce que « Architecture LVM (PV, VG, LV) » ?', a: 'Architecture LVM (PV, VG, LV)' },
      { q: 'Qu’est-ce que « Physical Extents (PE) & Logical Extents (LE) » ?', a: 'Physical Extents (PE) & Logical Extents (LE)' },
      { q: 'Qu’est-ce que « Snapshots Copy-on-Write (COW) » ?', a: 'Snapshots Copy-on-Write (COW)' },
      { q: 'Qu’est-ce que « Redimensionnement à chaud (lvextend, resize2fs, xfs_growfs) » ?', a: 'Redimensionnement à chaud (lvextend, resize2fs, xfs_growfs)' },
      { q: 'Qu’est-ce que « RAID logiciel Linux (mdadm) » ?', a: 'Objectif : Diagnostiquer la santé d’un volume RAID logiciel Linux (mdadm) et déclencher la reconstruction automatique avec disque spare.' },
      { q: 'Qu’est-ce que « Disques de réserve (Hot Spares & Rebuild) » ?', a: 'Disques de réserve (Hot Spares & Rebuild)' },
      { q: 'Qu’est-ce que « Structure interne des Inodes » ?', a: 'Structure interne des Inodes' },
      { q: 'Qu’est-ce que « Saturation asymétrique Inodes vs Blocs (df -i) » ?', a: 'Saturation asymétrique Inodes vs Blocs (df -i)' },
      { q: 'Qu’est-ce que « Commandes d’isolation (unshare, nsenter) » ?', a: 'Commandes d’isolation (unshare, nsenter)' },
      { q: 'Qu’est-ce que « Appel système clone(2) & drapeaux CLONE_NEW* » ?', a: 'Appel système clone(2) & drapeaux CLONE_NEW*' },
      { q: 'Qu’est-ce que « Hiérarchie unifiée Cgroups v2 » ?', a: 'Hiérarchie unifiée Cgroups v2' },
      { q: 'Qu’est-ce que « Contrôleur CPU (cpu.max quota/période) » ?', a: 'Contrôleur CPU (cpu.max quota/période)' },
      { q: 'Qu’est-ce que « Plafond mémoire (memory.max) » ?', a: 'Plafond mémoire (memory.max)' },
      { q: 'Qu’est-ce que « Ajustement de sacrifice (oom_score_adj) » ?', a: 'Ajustement de sacrifice (oom_score_adj)' },
      { q: 'Qu’est-ce que « Interfaces virtuelles veth pairs » ?', a: "Sous Linux, la communication inter-conteneurs repose sur des paires d'interfaces virtuelles ( veth pairs , sorte de câble réseau virtuel) connectées à un pont logiciel ( Linux Bridge ). Règles de validation : 1. Un pont ( type=bridge ) ne peut pas être lui-même esclave d'un autre" },
      { q: 'Qu’est-ce que « Suite réseau iproute2 & sockets Netlink » ?', a: 'Suite réseau iproute2 & sockets Netlink' },
      { q: 'Qu’est-ce que « Routing Policy Database (RPDB & ip rule) » ?', a: 'Routing Policy Database (RPDB & ip rule)' },
      { q: 'Qu’est-ce que « Tables de routage alternatives multiples » ?', a: 'comprendre le routage par politiques (Policy-Based Routing) et la gestion de tables de routage alternatives multiples ;' },
      { q: 'Qu’est-ce que « Name Service Switch (NSSwitch /etc/nsswitch.conf) » ?', a: 'Name Service Switch (NSSwitch /etc/nsswitch.conf)' },
      { q: 'Qu’est-ce que « Interconnexion inter-namespaces réseau » ?', a: 'Interconnexion inter-namespaces réseau' },
      { q: 'Qu’est-ce que « Durcissement du noyau (/etc/sysctl.conf) » ?', a: 'Durcissement du noyau (/etc/sysctl.conf)' },
      { q: 'Qu’est-ce que « Randomisation ASLR (randomize_va_space) » ?', a: 'Randomisation ASLR (randomize_va_space)' },
      { q: 'Qu’est-ce que « Restriction des pointeurs mémoire (kptr_restrict) » ?', a: 'Restriction des pointeurs mémoire (kptr_restrict)' },
      { q: 'Qu’est-ce que « Pluggable Authentication Modules (PAM) » ?', a: 'Pluggable Authentication Modules (PAM)' },
      { q: 'Qu’est-ce que « Drapeaux de contrôle PAM (required, requisite, sufficient) » ?', a: 'distinguer avec rigueur la sémantique des drapeaux de contrôle PAM (required, requisite, sufficient, optional) ;' },
      { q: 'Qu’est-ce que « Sous-système d’audit du noyau (auditd / auditctl) » ?', a: 'Sous-système d’audit du noyau (auditd / auditctl)' },
      { q: 'Qu’est-ce que « Traçabilité des appels système (Syscall auditing) » ?', a: 'Traçabilité des appels système (Syscall auditing)' },
    {
      q: 'Quelle est la différence fondamentale entre Ring 0 et Ring 3 ?',
      a: 'Ring 0 (mode noyau) a un accès matériel total et sans restriction ; Ring 3 (mode utilisateur) est un environnement sécurisé restreint où tout accès matériel exige un appel système.'
    },
    {
      q: 'Pourquoi les pseudo-fichiers de /proc et /sys sont-ils qualifiés de virtuels ?',
      a: 'Parce qu’ils n’existent pas sur le disque dur : ils sont synthétisés à la volée en mémoire vive par le noyau lors de leur lecture.'
    },
    {
      q: 'Pourquoi un processus à l’état D ne peut-il pas être tué par SIGKILL (kill -9) ?',
      a: 'Parce qu’il est bloqué en attente d’une I/O matérielle et le noyau suspend la délivrance de tous les signaux pour ne pas corrompre les pilotes.'
    },
    {
      q: 'Comment éliminer un processus zombie (état Z) ?',
      a: 'En forçant le processus père à appeler wait(), ou en tuant le père pour que le zombie soit adopté par systemd (PID 1) qui appellera wait() immédiatement.'
    },
    {
      q: 'Qu’est-ce que la protection W^X en mémoire virtuelle ?',
      a: 'Une règle interdisant qu’une page mémoire soit simultanément inscriptible (W) et exécutable (X), neutralisant les attaques par injection de shellcode.'
    },
    {
      q: 'À quoi sert la commande strace sous Linux ?',
      a: 'À intercepter, profiler et afficher en temps réel tous les appels système (syscalls) effectués par un processus et les signaux reçus.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à comprendre la différence entre Ring 0 et Ring 3 ou ignorance de la nature virtuelle de /proc.'
    },
    {
      cls: 'medium',
      text: 'Bonne analyse des états de processus (D, Z), compréhension de la mémoire virtuelle W^X et utilisation régulière de strace.'
    },
    {
      cls: 'high',
      text: 'Maîtrise approfondie des structures internes du noyau (task_struct, VFS), décodage expert des appels système et diagnostic avancé des blocages noyau.'
    }
  ]
};
