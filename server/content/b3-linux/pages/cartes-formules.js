/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Linux Avancé B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Linux Avancé B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux : Noyau &amp; /proc, Architecture Systemd &amp; Journald, LVM &amp; RAID mdadm, Namespaces &amp; Cgroups v2, Réseau &amp; PBR, Durcissement sysctl, PAM &amp; Auditd.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Linux Avancé B3 : définitions, commandes et architectures clés des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento Technique &amp; Aide-Mémoire — Linux Avancé</h1>',
    '  <p class="lead">Guide de référence opérationnelle pour ingénieurs système, SRE et DevOps : structures /proc, unités Systemd, allocation LVM, Cgroups v2, routage par règles et durcissement PAM/sysctl.</p>',
    '',
    '  <h2>1. Noyau Linux, États de Processus &amp; Pseudo-FS /proc</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Code État /proc</th><th>Désignation Complète</th><th>Signification &amp; Comportement Noyau</th><th>Conséquence Système</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>R</code></td><td>Running / Runnable</td><td>En cours d’exécution sur un cœur CPU ou prêt dans la runqueue.</td><td>Consomme du temps processeur actif.</td></tr>',
    '      <tr><td><code>S</code></td><td>Interruptible Sleep</td><td>En attente d’un événement, signal ou I/O (réseau, timer).</td><td>Peut être réveillé par n’importe quel signal Unix.</td></tr>',
    '      <tr><td><code>D</code></td><td>Uninterruptible Disk Sleep</td><td>En attente bloquante d’une I/O matérielle disque directe.</td><td><strong>Immunisé aux signaux (même kill -9)</strong> jusqu’à la fin de l’I/O.</td></tr>',
    '      <tr><td><code>Z</code></td><td>Zombie (defunct)</td><td>Processus terminé dont le père n’a pas encore lu le code via <code>wait()</code>.</td><td>Ne consomme pas de RAM, mais occupe une entrée dans la table des PID.</td></tr>',
    '      <tr><td><code>T</code></td><td>Stopped</td><td>Mis en pause par un signal de contrôle (SIGSTOP ou SIGTSTP).</td><td>Relançable via le signal SIGCONT.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Architecture des Fichiers d’Unités Systemd (.service)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Section &amp; Directive</th><th>Rôle &amp; Format</th><th>Exemple Typique</th><th>Règle Impérative</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>[Unit] Description=</code></td><td>Libellé lisible affiché dans systemctl status.</td><td><code>Description=API Gateway</code></td><td>Obligatoire pour l’observabilité.</td></tr>',
    '      <tr><td><code>[Unit] After= / Before=</code></td><td>Définit uniquement l’<strong>ordre</strong> de démarrage.</td><td><code>After=network.target</code></td><td>N’impose pas de dépendance de démarrage.</td></tr>',
    '      <tr><td><code>[Unit] Requires=</code></td><td>Dépendance stricte (si la cible échoue, l’unité échoue).</td><td><code>Requires=postgresql.service</code></td><td>Attention aux cycles bloquants.</td></tr>',
    '      <tr><td><code>[Service] ExecStart=</code></td><td>Commande principale exécutée par le démon.</td><td><code>ExecStart=/usr/bin/node /app/index.js</code></td><td><strong>Chemin absolu obligatoire</strong> (commençant par <code>/</code>).</td></tr>',
    '      <tr><td><code>[Install] WantedBy=</code></td><td>Cible de rattachement lors du <code>systemctl enable</code>.</td><td><code>WantedBy=multi-user.target</code></td><td>Indispensable pour démarrer au boot.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Stockage LVM &amp; Tolérance aux Pannes RAID mdadm</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Technologie &amp; Niveau</th><th>Mécanique de Stockage</th><th>Tolérance aux Pannes Disque</th><th>Capacité Utile Réelle</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>LVM (PV &rarr; VG &rarr; LV)</code></td><td>Agrégation de disques physiques en extents (PE de 4 Mo).</td><td>Gérée par la couche inférieure (ex: PV sur RAID).</td><td>Somme de tous les Physical Volumes (PV).</td></tr>',
    '      <tr><td><code>RAID 1 (Miroir)</code></td><td>Duplication miroir identique sur N disques.</td><td>Tolère <code>N - 1</code> pannes de disques.</td><td>Capacité d’un seul disque ($1 \\times C$).</td></tr>',
    '      <tr><td><code>RAID 5 (Parité simple)</code></td><td>Données et parités distribuées sur au moins 3 disques.</td><td>Tolère <strong>1 seule panne de disque</strong>.</td><td>$(N - 1) \\times C$</td></tr>',
    '      <tr><td><code>RAID 6 (Double parité)</code></td><td>Double parité Reed-Solomon sur au moins 4 disques.</td><td>Tolère <strong>jusqu’à 2 pannes simultanées</strong>.</td><td>$(N - 2) \\times C$</td></tr>',
    '      <tr><td><code>Inodes Ext4/XFS</code></td><td>Table fixe ou dynamique de métadonnées de fichiers.</td><td>Indépendante de la taille en octets.</td><td>Saturation possible avec 100% inodes et 10% blocs !</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Cgroups v2 &amp; Pondération OOM Killer</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Contrôleur Cgroup v2</th><th>Fichier de Configuration</th><th>Signification &amp; Exemple</th><th>Comportement en Cas de Dépassement</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>Processeur (CPU)</td><td><code>cpu.max</code></td><td><code>&lt;quota&gt; &lt;periode&gt;</code> (ex: <code>200000 100000</code> = 2 cœurs)</td><td>Étranglement (CPU throttling) sans terminaison.</td></tr>',
    '      <tr><td>Mémoire vive</td><td><code>memory.max</code></td><td>Plafond maximal en octets (ex: <code>536870912</code> = 512 Mo)</td><td>Déclenchement du mécanisme OOM Killer local.</td></tr>',
    '      <tr><td>OOM Killer Adjust</td><td><code>/proc/[pid]/oom_score_adj</code></td><td>Ajustement du sacrifice de -1000 à +1000</td><td><strong>-1000 = immunité totale garantie</strong>.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Réseau Avancé &amp; Policy-Based Routing (ip rule)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Commande iproute2</th><th>Rôle Technique</th><th>Syntaxe Opérationnelle</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>Création pont logiciel</td><td>Relie des interfaces virtuelles veth au niveau 2.</td><td><code>ip link add name br0 type bridge &amp;&amp; ip link set br0 up</code></td></tr>',
    '      <tr><td>Paire de câbles veth</td><td>Connecte un conteneur au réseau de l’hôte.</td><td><code>ip link add veth_host type veth peer name veth_cnt</code></td></tr>',
    '      <tr><td>Règle de routage PBR</td><td>Aiguille selon l’adresse IP source ou le port.</td><td><code>ip rule add from 192.168.1.50 table 100 priority 100</code></td></tr>',
    '      <tr><td>Route dans table dédiée</td><td>Définit la passerelle pour une table spécifique.</td><td><code>ip route add default via 10.0.0.1 dev tun0 table 100</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>6. Sécurité du Noyau, PAM &amp; Traçabilité auditd</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Composant de Sécurité</th><th>Drapeau / Paramètre</th><th>Comportement &amp; Règle de Décision</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>Durcissement sysctl</td><td><code>kernel.randomize_va_space = 2</code></td><td>Active l’ASLR complet (pile, tas, bibliothèques et exécutables PIE).</td></tr>',
    '      <tr><td>Durcissement sysctl</td><td><code>net.ipv4.tcp_syncookies = 1</code></td><td>Protège la pile réseau contre les attaques par inondation SYN Flood.</td></tr>',
    '      <tr><td>Drapeau PAM <code>required</code></td><td>Échec mémorisé en secret</td><td>Continue la chaîne jusqu’au bout ; refus final inévitable.</td></tr>',
    '      <tr><td>Drapeau PAM <code>requisite</code></td><td>Échec bloquant immédiat</td><td>Interrompt instantanément l’authentification dès le premier échec.</td></tr>',
    '      <tr><td>Drapeau PAM <code>sufficient</code></td><td>Succès suffisant</td><td>Accorde l’accès immédiatement si aucun échec antérieur n’est survenu.</td></tr>',
    '      <tr><td>Surveillance auditd</td><td><code>uid != 0 &amp;&amp; euid == 0</code></td><td>Détecte toute élévation vers les privilèges root (sudo, setuid, failles).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Revenir aux cartes de révision' }, { href: 'examens.html', label: 'Passer aux épreuves d’examen' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento technique — ' + course.brand,
      description: 'Mémento et fiches mémo des commandes Linux avancé, /proc, Systemd, LVM, Cgroups v2, PBR et PAM.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
