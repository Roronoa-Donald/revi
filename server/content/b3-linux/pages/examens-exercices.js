/**
 * Pages « examens » et « exercices » du cours « Linux Avancé B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Linux Avancé B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences professionnelles et académiques de niveau Bachelor 3 en ingénierie système Linux, orchestration et sécurité noyau.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Noyau Linux, /proc, Systemd &amp; Stockage LVM/RAID', [
      '<h4>Partie 1 : Noyau Linux, Pseudo-FS &amp; Appels Système (6 points)</h4>',
      '<ol>',
      '  <li>Expliquez le rôle du Virtual File System (VFS) et la nature purement virtuelle des répertoires <code>/proc</code> et <code>/sys</code>. Pourquoi n’occupent-ils aucun octet sur le disque dur physique ? (3 pts)</li>',
      '  <li>Analysez les états d’un processus décrits dans <code>/proc/[pid]/stat</code>. Pourquoi un processus à l’état <code>D</code> (Uninterruptible Sleep) ne peut-il pas être interrompu, même par un signal <code>kill -9</code> ? Qu’est-ce qu’un processus zombie <code>Z</code> et quelle est la seule méthode pour le faire disparaître ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Architecture Systemd &amp; Gestion des Services (7 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément le rôle des directives <code>Requires=</code>, <code>Wants=</code> et <code>After=</code> dans la section <code>[Unit]</code> d’un service Systemd. Pourquoi <code>After=</code> n’induit-il aucune dépendance d’activation ? (3 pts)</li>',
      '  <li>Pourquoi la directive <code>ExecStart=</code> impose-t-elle rigoureusement un chemin absolu ? Expliquez le fonctionnement et l’intérêt de l’activation par socket (Socket Activation via <code>.socket</code>) pour optimiser les performances de démarrage du système. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Stockage Avancé : LVM &amp; RAID Logiciel mdadm (7 points)</h4>',
      '<ol>',
      '  <li>Détaillez la hiérarchie LVM (PV, VG, LV) et le rôle des Physical Extents (PE). Comment fonctionne un snapshot LVM Copy-on-Write (COW) lors d’une opération de sauvegarde à chaud ? (3 pts)</li>',
      '  <li>Comparez les grappes RAID 1, RAID 5 et RAID 6 sous Linux <code>mdadm</code> en termes de tolérance aux pannes et de pénalité en écriture (Write Penalty). Que se passe-t-il si un second disque tombe en panne sur un RAID 5 pendant la reconstruction d’un premier disque défaillant ? (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>VFS &amp; pseudo-systèmes de fichiers (3 pts) :</strong> Le VFS est la couche d’abstraction du noyau unifiant l’accès aux systèmes de fichiers. <code>/proc</code> et <code>/sys</code> sont des pseudo-systèmes de fichiers résidant exclusivement en mémoire RAM : ils ne pointent vers aucun bloc disque mais génèrent dynamiquement leur contenu au vol lorsque les fichiers sont lus par l’utilisateur, exposant les structures internes du noyau (PID, tables de mémoire, périphériques).</li>',
      '  <li><strong>États D et Z (3 pts) :</strong><br>' +
      '    - État <code>D</code> : Le processus est bloqué en attente d’un retour matériel de périphérique (généralement une I/O disque ou un montage NFS suspendu). Pour garantir la cohérence des pilotes de périphériques noyau, le thread est placé dans un état ininterruptible qui ignore tous les signaux Unix, y compris <code>SIGKILL</code> (kill -9). Seule la fin de l’I/O (ou un redémarrage) peut libérer le processus.<br>' +
      '    - État <code>Z</code> (Zombie) : Le processus a terminé son exécution (via exit()) et a libéré sa mémoire, mais conserve une entrée dans la table des processus tant que son processus père n’a pas appelé la fonction <code>wait()</code> pour lire son code de sortie. On ne peut pas tuer un zombie (il est déjà mort) ; pour le faire disparaître, il faut soit envoyer SIGCHLD au père, soit tuer le père pour que le zombie soit adopté par <code>systemd</code> (PID 1) qui appellera immédiatement <code>wait()</code> pour le purger.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Directives Systemd (3 pts) :</strong><br>' +
      '    - <code>Requires=</code> : Dépendance forte. Si l’unité requise échoue à démarrer ou s’arrête, l’unité courante est immédiatement arrêtée.<br>' +
      '    - <code>Wants=</code> : Dépendance faible (recommandée). Déclenche le démarrage de l’unité liée, mais si cette dernière échoue, l’unité courante continue de démarrer normalement.<br>' +
      '    - <code>After=</code> : Directive purement d’ordonnancement temporel. Elle spécifie que l’unité courante doit démarrer <em>après</em> que l’autre a terminé son initialisation, mais elle ne déclenche pas son démarrage par elle-même.</li>',
      '  <li><strong>Chemin absolu &amp; Socket Activation (4 pts) :</strong><br>' +
      '    - Chemin absolu : Systemd s’exécute avec un environnement d’exécution minimal épuré et ne se fie pas à la variable <code>$PATH</code> des utilisateurs pour des raisons évidentes de déterminisme et de sécurité contre les binaires falsifiés.<br>' +
      '    - Socket Activation : Systemd crée le socket réseau ou Unix (ex: port 80 ou /run/docker.sock) dès le démarrage et écoute à la place du démon. Le démon applicatif lourd n’est démarré en mémoire que lorsqu’un premier paquet client arrive sur le socket. Les requêtes sont mises en mémoire tampon pendant le démarrage du service, éliminant la consommation de ressources à froid et supprimant les dépendances complexes d’ordre de démarrage.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>LVM &amp; Snapshots Copy-on-Write (3 pts) :</strong> LVM initialise des disques ou partitions en Physical Volumes (PV), les agrège en un pool de stockage unique appelé Volume Group (VG) découpé en extents de taille fixe (PE, ex: 4 Mo). Les Logical Volumes (LV) allouent des extents à la demande. Lors de la création d’un snapshot, aucun bloc n’est copié au départ (snapshot instantané). Dès qu’une écriture modifie un bloc sur le volume d’origine, l’ancien bloc intact est copié d’abord sur l’espace réservé du snapshot (Copy-on-Write), permettant à l’outil de sauvegarde de lire une image figée et cohérente du système.</li>',
      '  <li><strong>Tolérance aux pannes RAID mdadm (4 pts) :</strong><br>' +
      '    - RAID 1 : miroir tolérant $N-1$ pannes.<br>' +
      '    - RAID 5 : parité distribuée tolérant 1 seule panne de disque. Pénalité en écriture (Write Penalty) de 4 I/O par écriture (lecture donnée, lecture parité, écriture nouvelle donnée, écriture nouvelle parité).<br>' +
      '    - RAID 6 : double parité tolérant 2 pannes simultanées. Pénalité de 6 I/O par écriture.<br>' +
      '    - Si un second disque tombe en panne sur un RAID 5 pendant la reconstruction, la parité restante ne suffit plus pour reconstituer les blocs manquants : la grappe bascule immédiatement à l’état <code>FAILED</code> et <strong>l’ensemble des données du volume est définitivement perdu</strong> (d’où la recommandation d’utiliser RAID 6 sur les disques modernes de grande capacité).</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Namespaces, Cgroups v2, PBR &amp; Sécurité PAM/Auditd', [
      '<h4>Partie 1 : Conteneurisation Noyau : Namespaces &amp; Cgroups v2 (7 points)</h4>',
      '<ol>',
      '  <li>Énumérez les huit namespaces du noyau Linux et détaillez la ressource isolée par chacun (PID, NET, MNT, IPC, UTS, USER, CGROUP, TIME). (3 pts)</li>',
      '  <li>Comparez l’architecture de Cgroups v1 et Cgroups v2. Expliquez comment la directive <code>cpu.max</code> limite la bande passante processeur sous forme de quota et de période. (2 pts)</li>',
      '  <li>Décrivez la mécanique de l’Out Of Memory (OOM) Killer. Expliquez le rôle du fichier <code>/proc/[pid]/oom_score_adj</code> et justifiez pourquoi une valeur de <code>-1000</code> est indispensable pour certains démons de production. (2 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Réseau Virtuel Linux &amp; Policy-Based Routing (6 points)</h4>',
      '<ol>',
      '  <li>Comment une paire d’interfaces virtuelles (veth pair) et un pont Linux (bridge) permettent-ils d’interconnecter deux conteneurs situés dans des namespaces réseau distincts sur un même serveur ? (3 pts)</li>',
      '  <li>Expliquez le principe du routage basé sur les politiques (Policy-Based Routing - PBR) sous Linux. Écrivez la commande <code>ip rule</code> permettant d’aiguiller l’ensemble du trafic émis par l’adresse IP source 192.168.1.50 vers une table de routage personnalisée <code>table 100</code>. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Durcissement du Noyau, PAM &amp; Surveillance auditd (7 points)</h4>',
      '<ol>',
      '  <li>Présentez l’intérêt sécuritaire des paramètres <code>sysctl</code> suivants :<br>' +
      '      a) <code>kernel.randomize_va_space = 2</code><br>' +
      '      b) <code>kernel.kptr_restrict = 2</code><br>' +
      '      c) <code>net.ipv4.tcp_syncookies = 1</code>. (3 pts)</li>',
      '  <li>Détaillez le fonctionnement des drapeaux de contrôle PAM (Pluggable Authentication Modules) : <code>required</code>, <code>requisite</code> et <code>sufficient</code>. Pourquoi un module <code>required</code> continue-t-il la chaîne en silence après un échec ? (2 pts)</li>',
      '  <li>Expliquez comment le démon <code>auditd</code> permet de détecter une tentative d’élévation de privilèges malveillante en surveillant les identifiants d’utilisateurs réel et effectif (UID vs EUID). (2 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Partie 1 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Les 8 Namespaces Linux (3 pts) :</strong><br>' +
      '    1. <code>PID</code> : isole l’arbre des identifiants de processus (le conteneur a son propre PID 1).<br>' +
      '    2. <code>NET</code> : isole la pile réseau (interfaces, tables de routage, règles de filtrage, ports TCP/UDP).<br>' +
      '    3. <code>MNT</code> : isole les points de montage du système de fichiers.<br>' +
      '    4. <code>IPC</code> : isole la mémoire partagée et les files de messages inter-processus System V / POSIX.<br>' +
      '    5. <code>UTS</code> : isole le nom d’hôte (hostname) et le nom de domaine NIS.<br>' +
      '    6. <code>USER</code> : mappe les identifiants d’utilisateurs et groupes (root dans le conteneur = UID non privilégié sur l’hôte).<br>' +
      '    7. <code>CGROUP</code> : isole la vue de la hiérarchie des groupes de contrôle.<br>' +
      '    8. <code>TIME</code> : isole les horloges monotones et de démarrage (boot time).</li>',
      '  <li><strong>Cgroups v1 vs Cgroups v2 &amp; cpu.max (2 pts) :</strong> Cgroups v1 utilisait des hiérarchies orthogonales séparées par ressource, créant des conflits insolubles d’attribution entre mémoire et I/O. Cgroups v2 impose un arbre unifié unique avec un seul modèle de contrôle. <code>cpu.max</code> prend deux valeurs : quota et période en microsecondes (ex: <code>cpu.max = 200000 100000</code>). Pendant chaque tranche de 100 000 µs (100 ms), le groupe de processus a le droit de consommer au maximum 200 000 µs de temps CPU cumulé sur tous les cœurs, soit l’équivalent exact de 2 cœurs complets. Tout dépassement provoque un étranglement (throttling) temporaire sans planter le processus.</li>',
      '  <li><strong>OOM Killer &amp; oom_score_adj (2 pts) :</strong> Lorsque la mémoire physique et le swap sont saturés, le noyau calcule un score pour chaque processus (proportionnel au volume de RAM consommé) et tue par SIGKILL le processus au score le plus élevé pour préserver le système. <code>/proc/[pid]/oom_score_adj</code> permet de moduler ce score de -1000 à +1000. Une valeur de <code>-1000</code> garantit une <strong>immunité totale</strong> : le noyau ne sélectionnera jamais ce processus comme cible de sacrifice, ce qui est impératif pour l’agent SSH, systemd ou les processus de réplication de base de données critiques.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Interconnexion veth et bridge (3 pts) :</strong> Une paire veth fonctionne comme un câble réseau virtuel croisé : ce qui entre par une extrémité ressort instantanément par l’autre. Pour interconnecter deux conteneurs, on crée un pont logiciel sur l’hôte (<code>br0</code>). Pour chaque conteneur, une paire veth est créée : une extrémité est déplacée dans le namespace réseau du conteneur (renommée en <code>eth0</code> avec son IP) et l’autre extrémité est attachée comme port esclave sur le pont <code>br0</code>. Le pont commute les trames Ethernet de niveau 2 entre les conteneurs et peut router le trafic vers Internet via NAT.</li>',
      '  <li><strong>Policy-Based Routing (3 pts) :</strong> Le routage standard ne regarde que l’IP destination. PBR permet d’aiguiller les paquets selon des critères variés (IP source, interface d’entrée, port L4). Pour router le trafic provenant de 192.168.1.50 vers la table 100 :<br>' +
      '  <pre><code>ip rule add from 192.168.1.50 table 100 priority 100</code></pre><br>' +
      '  Systemd/Linux consulte les règles par ordre de priorité croissante et utilise la table 100 pour déterminer la passerelle de ce paquet.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Durcissement sysctl (3 pts) :</strong><br>' +
      '    a) <code>randomize_va_space = 2</code> : active l’ASLR (Address Space Layout Randomization) complet pour la pile, le tas, les bibliothèques partagées et les binaires compilés en PIE, rendant imprévisibles les adresses mémoire pour contrer les exploits buffer overflow et ROP.<br>' +
      '    b) <code>kptr_restrict = 2</code> : masque les adresses des pointeurs du noyau dans <code>/proc/kallsyms</code> pour tous les utilisateurs (y compris root), empêchant un attaquant d’obtenir la cartographie mémoire du noyau.<br>' +
      '    c) <code>tcp_syncookies = 1</code> : utilise des cookies cryptographiques lors de la phase SYN-ACK en cas de saturation de la file de demi-connexions pour contrer les dénis de service SYN Flood.</li>',
      '  <li><strong>Drapeaux de contrôle PAM (2 pts) :</strong><br>' +
      '    - <code>required</code> : le module doit réussir. S’il échoue, l’échec est mémorisé, mais PAM continue d’exécuter tous les modules suivants. Cette stratégie empêche un attaquant observant les temps de réponse de deviner quel facteur d’authentification précis a échoué (protection contre l’analyse temporelle).<br>' +
      '    - <code>requisite</code> : le module doit réussir. S’il échoue, l’exécution est immédiatement avortée avec refus.<br>' +
      '    - <code>sufficient</code> : si le module réussit et qu’aucun échec <code>required</code> n’a été noté avant, l’accès est accordé immédiatement sans exécuter le reste de la chaîne.</li>',
      '  <li><strong>Détection auditd d’élévation de privilèges (2 pts) :</strong> Normalement, un utilisateur non privilégié a un UID et un EUID identiques (ex: 1000). Lorsqu’un programme setuid (ex: /usr/bin/sudo ou un exploit binaire) s’exécute, son <code>euid</code> bascule à 0 (root). <code>auditd</code> intercepte l’appel système <code>execve</code> au niveau noyau et consigne <code>uid=1000 euid=0 exe=/path/to/binary</code>. Toute transition vers EUID=0 sur un binaire inconnu ou non autorisé constitue une alerte critique d’élévation de privilèges nécessitant une réaction immédiate du SOC/SIEM.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento des formules' }, { href: 'exercices.html', label: 'Accéder aux exercices pratiques' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs corrigés et barème détaillé du cours Linux Avancé B3 : Contrôle Continu et Examen Terminal.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Catalogue des Exercices ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices de programmation' }
  ]);

  const exercises = [
    { id: 'lx3-c1-e1', ch: 1, title: 'Parseur et auditeur de métriques de processus (/proc/[pid]/stat)', level: 'n1', lang: 'Bash', desc: 'Extraire et analyser les états de processus (R, S, D, Z, T), ticks CPU et consommation mémoire résidente.' },
    { id: 'lx3-c1-e2', ch: 1, title: 'Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)', level: 'n2', lang: 'Bash', desc: 'Analyser les plages mémoire de processus et détecter les violations du principe de sécurité W^X (Write XOR Execute).' },
    { id: 'lx3-c1-e3', ch: 1, title: 'Décodeur et profileur d’appels système (strace tracer)', level: 'n3', lang: 'Bash', desc: 'Analyser les traces d’appels système (syscalls) pour isoler les erreurs d’I/O et profiler la latence noyau.' },

    { id: 'lx3-c2-e1', ch: 2, title: 'Validateur d’unité de service Systemd ([Unit], [Service], [Install])', level: 'n1', lang: 'Bash', desc: 'Vérifier la conformité syntaxique et la validité des directives d’un fichier de service Systemd.' },
    { id: 'lx3-c2-e2', ch: 2, title: 'Résolveur de dépendances et détection de cycles Systemd', level: 'n2', lang: 'Bash', desc: 'Analyser le graphe de dépendances d’unités et détecter les dépendances circulaires bloquantes (deadlocks).' },
    { id: 'lx3-c2-e3', ch: 2, title: 'Parseur et filtreur d’événements Systemd Journald', level: 'n3', lang: 'Bash', desc: 'Classer les journaux binaires Systemd Journald selon les priorités Syslog RFC 5424 et isoler les incidents critiques.' },

    { id: 'lx3-c3-e1', ch: 3, title: 'Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG', level: 'n1', lang: 'Bash', desc: 'Calculer l’allocation exacte d’extents physiques (PE) dans un groupe de volumes LVM.' },
    { id: 'lx3-c3-e2', ch: 3, title: 'Simulateur d’état et de résilience de grappe RAID mdadm', level: 'n2', lang: 'Bash', desc: 'Diagnostiquer la santé d’un volume RAID logiciel Linux et déclencher la reconstruction automatique avec disque spare.' },
    { id: 'lx3-c3-e3', ch: 3, title: 'Analyseur de table d’inodes et détection de saturation de système de fichiers', level: 'n3', lang: 'Bash', desc: 'Diagnostiquer la saturation de disques Linux en distinguant la pénurie d’espace bloc de l’épuisement d’inodes.' },

    { id: 'lx3-c4-e1', ch: 4, title: 'Classificateur et auditeur de namespaces Linux par processus', level: 'n1', lang: 'Bash', desc: 'Comparer les identifiants d’inodes de namespaces d’un processus par rapport à l’espace hôte.' },
    { id: 'lx3-c4-e2', ch: 4, title: 'Contrôleur de quotas et limites de ressources Cgroups v2 (cpu.max & memory.max)', level: 'n2', lang: 'Bash', desc: 'Calculer la bande passante processeur autorisée et vérifier le plafonnement mémoire dans la hiérarchie Cgroups v2.' },
    { id: 'lx3-c4-e3', ch: 4, title: 'Détecteur de sacrifice OOM Killer et pondération oom_score_adj', level: 'n3', lang: 'Bash', desc: 'Calculer le score de sacrifice du mécanisme Out Of Memory (OOM Killer) du noyau Linux.' },

    { id: 'lx3-c5-e1', ch: 5, title: 'Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge)', level: 'n1', lang: 'Bash', desc: 'Vérifier la cohérence de configuration des interfaces réseau virtuelles (veth) et des ponts sous Linux.' },
    { id: 'lx3-c5-e2', ch: 5, title: 'Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables)', level: 'n2', lang: 'Bash', desc: 'Aiguiller les paquets réseau vers la bonne table de routage selon les règles de politique PBR.' },
    { id: 'lx3-c5-e3', ch: 5, title: 'Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf)', level: 'n3', lang: 'Bash', desc: 'Simuler la séquence de résolution de noms d’hôtes selon la politique déclarative de nsswitch.conf.' },

    { id: 'lx3-c6-e1', ch: 6, title: 'Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)', level: 'n1', lang: 'Bash', desc: 'Vérifier la conformité des paramètres de sécurité du noyau Linux par rapport aux recommandations ANSSI / CIS Benchmark.' },
    { id: 'lx3-c6-e2', ch: 6, title: 'Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)', level: 'n2', lang: 'Bash', desc: 'Simuler l’évaluation séquentielle d’une pile de modules PAM selon les drapeaux de contrôle.' },
    { id: 'lx3-c6-e3', ch: 6, title: 'Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges', level: 'n3', lang: 'Bash', desc: 'Analyser les enregistrements auditd (RFC 5424) pour détecter les élévations de privilèges (EUID=0) suspectes.' }
  ];

  const cardsHtml = exercises.map(ex => [
    '    <article class="card card--exercise">',
    '      <div class="card__head">',
    '        <span class="badge badge--' + ex.level + '">' + (ex.level === 'n1' ? 'Fondamental' : ex.level === 'n2' ? 'Intermédiaire' : 'Avancé') + '</span>',
    '        <span class="card__num">Module ' + ex.ch + ' • ' + ex.id + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">' + ex.title + '</a></h3>',
    '      <p class="card__desc">' + ex.desc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('terminal') + ' Langage : ' + ex.lang + '</span>',
    '        <a class="btn btn--sm" href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">Résoudre dans le module ' + ic('arrow-right') + '</a>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers Pratiques de Code Lab — Linux Avancé B3</h1>',
    '  <p class="lead">18 ateliers de pratique interactive (Bash) intégrés directement dans les modules de cours, corrigés avec tests d’évaluation automatisés.</p>',
    '',
    '  <div class="grid grid--2">' + cardsHtml + '</div>',
    '',
    chnav({ href: 'examens.html', label: 'Revenir aux épreuves d’examen' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Répertoire complet des 18 exercices de programmation en Python 3 du cours Linux Avancé B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
