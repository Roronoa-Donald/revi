/**
 * Exercices du chapitre 1 — Docker B2.
 * Fondements des Conteneurs, Isolation Linux & Architecture Docker.
 */
'use strict';

module.exports = [
  {
    id: 'dk2-c1-e1',
    chapter: 1,
    title: 'Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)',
    level: 'n1',
    language: 'python',
    goal: 'Distinguer les primitives du noyau Linux sous-jacentes à Docker : Namespaces (vue isolée) et Cgroups (limitation des ressources).',
    brief: '<p>Le script lit sur l\'entrée standard des noms de mécanismes d\'isolation du noyau Linux (un par ligne).<br>\nSelon les fondements de la conteneurisation :<br>\n- <strong>Namespaces (Isolation de l\'espace de visibilité)</strong> :<br>\n  * <code>PID</code> -&gt; <code>Arborescence des processus isolée (le conteneur voit son propre PID 1)</code><br>\n  * <code>NET</code> -&gt; <code>Interfaces reseau, tables de routage et ports isoles</code><br>\n  * <code>MNT</code> -&gt; <code>Points de montage de systeme de fichiers et arborescence racine</code><br>\n  * <code>IPC</code> -&gt; <code>Communications inter-processus (memoire partagee, files de messages)</code><br>\n  * <code>UTS</code> -&gt; <code>Nom d\'hote (hostname) et nom de domaine NIS</code><br>\n  * <code>USER</code> -&gt; <code>Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l\'hote)</code><br>\n- <strong>Cgroups (Contrôle et limitation des ressources)</strong> :<br>\n  * <code>CPU_LIMIT</code> -&gt; <code>Plafond de temps de calcul CPU (quotas CFS)</code><br>\n  * <code>MEM_LIMIT</code> -&gt; <code>Plafond de memoire vive RAM et gestion de l\'OOM-Killer</code><br>\n  * <code>IO_THROTTLE</code> -&gt; <code>Debit maximal en lecture et ecriture sur les disques blocs</code><br>\nPour chaque entrée, afficher :<br>\n<code>&lt;MECANISME&gt; -&gt; PRIMITIVE: &lt;NAMESPACE|CGROUP&gt; | &lt;DESCRIPTION&gt;</code><br>\nSi le mécanisme n\'est pas reconnu :<br>\n<code>&lt;MECANISME&gt; -&gt; INCONNU</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier chaque mécanisme en Namespace ou Cgroup
`,
    hints: [
      'Utiliser un dictionnaire associant chaque code à son type et sa description.',
      'Gérer la casse pour accepter les noms en majuscules.'
    ],
    examples: [
      {
        stdin: 'PID\nNET\nMEM_LIMIT\nINCONNU_TEST',
        expected: 'PID -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)\nNET -> PRIMITIVE: NAMESPACE | Interfaces reseau, tables de routage et ports isoles\nMEM_LIMIT -> PRIMITIVE: CGROUP | Plafond de memoire vive RAM et gestion de l\'OOM-Killer\nINCONNU_TEST -> INCONNU',
        note: 'PID et NET sont des Namespaces Linux, MEM_LIMIT est un cgroup de gestion de mémoire.'
      }
    ],
    tests: [
      {
        label: 'Tous les namespaces majeurs',
        stdin: 'MNT\nIPC\nUTS\nUSER',
        expected: 'MNT -> PRIMITIVE: NAMESPACE | Points de montage de systeme de fichiers et arborescence racine\nIPC -> PRIMITIVE: NAMESPACE | Communications inter-processus (memoire partagee, files de messages)\nUTS -> PRIMITIVE: NAMESPACE | Nom d\'hote (hostname) et nom de domaine NIS\nUSER -> PRIMITIVE: NAMESPACE | Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l\'hote)'
      },
      {
        label: 'Tous les cgroups essentiels',
        stdin: 'CPU_LIMIT\nMEM_LIMIT\nIO_THROTTLE',
        expected: 'CPU_LIMIT -> PRIMITIVE: CGROUP | Plafond de temps de calcul CPU (quotas CFS)\nMEM_LIMIT -> PRIMITIVE: CGROUP | Plafond de memoire vive RAM et gestion de l\'OOM-Killer\nIO_THROTTLE -> PRIMITIVE: CGROUP | Debit maximal en lecture et ecriture sur les disques blocs'
      },
      {
        label: 'Mélange avec éléments inconnus',
        stdin: 'PID\nCPU_LIMIT\nRAM_SWAP\nUTS',
        expected: 'PID -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)\nCPU_LIMIT -> PRIMITIVE: CGROUP | Plafond de temps de calcul CPU (quotas CFS)\nRAM_SWAP -> INCONNU\nUTS -> PRIMITIVE: NAMESPACE | Nom d\'hote (hostname) et nom de domaine NIS'
      }
    ],
    solution: `import sys

BASE = {
    'PID': ('NAMESPACE', 'Arborescence des processus isolée (le conteneur voit son propre PID 1)'),
    'NET': ('NAMESPACE', 'Interfaces reseau, tables de routage et ports isoles'),
    'MNT': ('NAMESPACE', 'Points de montage de systeme de fichiers et arborescence racine'),
    'IPC': ('NAMESPACE', "Communications inter-processus (memoire partagee, files de messages)"),
    'UTS': ('NAMESPACE', "Nom d'hote (hostname) et nom de domaine NIS"),
    'USER': ('NAMESPACE', "Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l'hote)"),
    'CPU_LIMIT': ('CGROUP', "Plafond de temps de calcul CPU (quotas CFS)"),
    'MEM_LIMIT': ('CGROUP', "Plafond de memoire vive RAM et gestion de l'OOM-Killer"),
    'IO_THROTTLE': ('CGROUP', 'Debit maximal en lecture et ecriture sur les disques blocs')
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for m in lignes:
    cle = m.upper()
    if cle in BASE:
        prim, desc = BASE[cle]
        print(f"{m} -> PRIMITIVE: {prim} | {desc}")
    else:
        print(f"{m} -> INCONNU")
`
  },
  {
    id: 'dk2-c1-e2',
    chapter: 1,
    title: 'Comparateur d’empreinte mémoire et stockage : VM vs Conteneur',
    level: 'n2',
    language: 'python',
    goal: 'Quantifier l’overhead de virtualisation lourde (Hyperviseur + Guest OS complet) face à la conteneurisation légère.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- Première ligne : <code>&lt;NbInstances&gt; &lt;TailleAppMo&gt; &lt;RamAppMo&gt;</code> (ressources nécessaires à l\'application seule).<br>\n- Deuxième ligne : <code>&lt;TailleGuestOsMo&gt; &lt;RamGuestOsMo&gt;</code> (ressources consommées par l\'OS invité dans une machine virtuelle).<br>\nDans une architecture de conteneurs Docker, le kernel de l\'hôte est partagé (0 Mo d\'overhead Guest OS par conteneur).<br>\nCalculer :<br>\n1. <strong>VM</strong> :<br>\n   - Disque total VM = <code>NbInstances * (TailleAppMo + TailleGuestOsMo)</code><br>\n   - RAM totale VM = <code>NbInstances * (RamAppMo + RamGuestOsMo)</code><br>\n2. <strong>DOCKER</strong> :<br>\n   - Disque total Docker = <code>NbInstances * TailleAppMo</code><br>\n   - RAM totale Docker = <code>NbInstances * RamAppMo</code><br>\n3. <strong>GAINS</strong> :<br>\n   - Gain disque = <code>Disque VM - Disque Docker</code><br>\n   - Gain RAM = <code>RAM VM - RAM Docker</code><br>\nAfficher :<br>\n<code>ARCHITECTURE VM: Disque &lt;Dvm&gt; Mo | RAM &lt;Rvm&gt; Mo</code><br>\n<code>ARCHITECTURE DOCKER: Disque &lt;Ddoc&gt; Mo | RAM &lt;Rdoc&gt; Mo</code><br>\n<code>ECONOMIE DOCKER: Disque -&lt;GainD&gt; Mo | RAM -&lt;GainR&gt; Mo</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer l'empreinte VM vs Docker et les gains
`,
    hints: [
      'Chaque VM duplique un système d’exploitation complet (Guest OS), tandis que Docker partage le noyau hôte.',
      'Suivre rigoureusement le gabarit textuel d’affichage.'
    ],
    examples: [
      {
        stdin: '5 50 128\n4000 1024',
        expected: 'ARCHITECTURE VM: Disque 20250 Mo | RAM 5760 Mo\nARCHITECTURE DOCKER: Disque 250 Mo | RAM 640 Mo\nECONOMIE DOCKER: Disque -20000 Mo | RAM -5120 Mo',
        note: '5 instances : 20 Go et 5 Go de RAM économisés grâce à Docker.'
      }
    ],
    tests: [
      {
        label: '10 microservices légers',
        stdin: '10 20 64\n3500 512',
        expected: 'ARCHITECTURE VM: Disque 35200 Mo | RAM 5760 Mo\nARCHITECTURE DOCKER: Disque 200 Mo | RAM 640 Mo\nECONOMIE DOCKER: Disque -35000 Mo | RAM -5120 Mo'
      },
      {
        label: 'Instance unique de test',
        stdin: '1 100 256\n5000 2048',
        expected: 'ARCHITECTURE VM: Disque 5100 Mo | RAM 2304 Mo\nARCHITECTURE DOCKER: Disque 100 Mo | RAM 256 Mo\nECONOMIE DOCKER: Disque -5000 Mo | RAM -2048 Mo'
      },
      {
        label: 'Forte charge 50 instances',
        stdin: '50 30 100\n2000 800',
        expected: 'ARCHITECTURE VM: Disque 101500 Mo | RAM 45000 Mo\nARCHITECTURE DOCKER: Disque 1500 Mo | RAM 5000 Mo\nECONOMIE DOCKER: Disque -100000 Mo | RAM -40000 Mo'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if len(lignes) >= 2:
    nb_inst, app_disk, app_ram = map(int, lignes[0].split())
    os_disk, os_ram = map(int, lignes[1].split())

    vm_disk = nb_inst * (app_disk + os_disk)
    vm_ram = nb_inst * (app_ram + os_ram)

    doc_disk = nb_inst * app_disk
    doc_ram = nb_inst * app_ram

    gain_disk = vm_disk - doc_disk
    gain_ram = vm_ram - doc_ram

    print(f"ARCHITECTURE VM: Disque {vm_disk} Mo | RAM {vm_ram} Mo")
    print(f"ARCHITECTURE DOCKER: Disque {doc_disk} Mo | RAM {doc_ram} Mo")
    print(f"ECONOMIE DOCKER: Disque -{gain_disk} Mo | RAM -{gain_ram} Mo")
`
  },
  {
    id: 'dk2-c1-e3',
    chapter: 1,
    title: 'Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)',
    level: 'n3',
    language: 'python',
    goal: 'Identifier le rôle de chaque brique logicielle composant la stack Docker moderne conforme OCI.',
    brief: '<p>Le script lit sur l\'entrée standard des identifiants d\'opérations système (un par ligne).<br>\nSelon l\'architecture interne de Docker :<br>\n- <code>CLI</code> : <code>docker (client) -&gt; Interprete les commandes utilisateur et communique via l\'API REST (socket UNIX)</code><br>\n- <code>DOCKERD</code> : <code>dockerd (daemon) -&gt; Gestionnaire haut niveau des images, volumes, reseaux et authentification</code><br>\n- <code>CONTAINERD</code> : <code>containerd -&gt; Superviseur de conteneurs (cycle de vie, distribution d\'images et snapshots)</code><br>\n- <code>SHIM</code> : <code>containerd-shim -&gt; Processus leger maintenant les E/S et l\'etat sans dependre du daemon</code><br>\n- <code>RUNC</code> : <code>runc (OCI runtime) -&gt; Cree les namespaces et cgroups, puis execute le binaire conteneurise</code><br>\nPour chaque opération, afficher :<br>\n<code>&lt;ID&gt; -&gt; &lt;COMPOSANT&gt; | &lt;ROLE&gt;</code><br>\nSi l\'opération n\'est pas listée :<br>\n<code>&lt;ID&gt; -&gt; INCONNU</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier chaque brique logicielle de l'architecture Docker
`,
    hints: [
      'dockerd délègue à containerd, qui invoque runc pour démarrer le processus puis laisse containerd-shim.',
      'Respecter strictement le format de sortie.'
    ],
    examples: [
      {
        stdin: 'CLI\nDOCKERD\nRUNC',
        expected: 'CLI -> docker (client) | Interprete les commandes utilisateur et communique via l\'API REST (socket UNIX)\nDOCKERD -> dockerd (daemon) | Gestionnaire haut niveau des images, volumes, reseaux et authentification\nRUNC -> runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise',
        note: 'De l’interface de commande au runtime bas niveau conforme OCI.'
      }
    ],
    tests: [
      {
        label: 'Toutes les 5 briques de la pile Docker',
        stdin: 'CLI\nDOCKERD\nCONTAINERD\nSHIM\nRUNC',
        expected: 'CLI -> docker (client) | Interprete les commandes utilisateur et communique via l\'API REST (socket UNIX)\nDOCKERD -> dockerd (daemon) | Gestionnaire haut niveau des images, volumes, reseaux et authentification\nCONTAINERD -> containerd | Superviseur de conteneurs (cycle de vie, distribution d\'images et snapshots)\nSHIM -> containerd-shim | Processus leger maintenant les E/S et l\'etat sans dependre du daemon\nRUNC -> runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise'
      },
      {
        label: 'Composants inconnus ou fautifs',
        stdin: 'KUBERNETES\nSHIM\nVIRTUALBOX',
        expected: 'KUBERNETES -> INCONNU\nSHIM -> containerd-shim | Processus leger maintenant les E/S et l\'etat sans dependre du daemon\nVIRTUALBOX -> INCONNU'
      },
      {
        label: 'Superviseur containerd seul',
        stdin: 'CONTAINERD',
        expected: 'CONTAINERD -> containerd | Superviseur de conteneurs (cycle de vie, distribution d\'images et snapshots)'
      }
    ],
    solution: `import sys

STACK = {
    'CLI': ('docker (client)', "Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)"),
    'DOCKERD': ('dockerd (daemon)', "Gestionnaire haut niveau des images, volumes, reseaux et authentification"),
    'CONTAINERD': ('containerd', "Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)"),
    'SHIM': ('containerd-shim', "Processus leger maintenant les E/S et l'etat sans dependre du daemon"),
    'RUNC': ('runc (OCI runtime)', "Cree les namespaces et cgroups, puis execute le binaire conteneurise")
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for op in lignes:
    cle = op.upper()
    if cle in STACK:
        comp, role = STACK[cle]
        print(f"{op} -> {comp} | {role}")
    else:
        print(f"{op} -> INCONNU")
`
  }
];
