'use strict';

module.exports = [
  {
    "id": "dk2-c1-e1",
    "chapter": 1,
    "title": "Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)",
    "level": "n1",
    "language": "analyse",
    "goal": "Distinguer les primitives du noyau Linux sous-jacentes à Docker : Namespaces (vue isolée) et Cgroups (limitation des ressources).",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nSelon les fondements de la conteneurisation :<br>\n- <strong>Namespaces (Isolation de l'espace de visibilité)</strong> :<br>\n  * <code>PID</code> -&gt; <code>Arborescence des processus isolée (le conteneur voit son propre PID 1)</code><br>\n  * <code>NET</code> -&gt; <code>Interfaces reseau, tables de routage et ports isoles</code><br>\n  * <code>MNT</code> -&gt; <code>Points de montage de systeme de fichiers et arborescence racine</code><br>\n  * <code>IPC</code> -&gt; <code>Communications inter-processus (memoire partagee, files de messages)</code><br>\n  * <code>UTS</code> -&gt; <code>Nom d'hote (hostname) et nom de domaine NIS</code><br>\n  * <code>USER</code> -&gt; <code>Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l'hote)</code><br>\n- <strong>Cgroups (Contrôle et limitation des ressources)</strong> :<br>\n  * <code>CPU_LIMIT</code> -&gt; <code>Plafond de temps de calcul CPU (quotas CFS)</code><br>\n  * <code>MEM_LIMIT</code> -&gt; <code>Plafond de memoire vive RAM et gestion de l'OOM-Killer</code><br>\n  * <code>IO_THROTTLE</code> -&gt; <code>Debit maximal en lecture et ecriture sur les disques blocs</code><br>\nPour chaque entrée, afficher :<br>\n<code>&lt;MECANISME&gt; -&gt; PRIMITIVE: &lt;NAMESPACE|CGROUP&gt; | &lt;DESCRIPTION&gt;</code><br>\nSi le mécanisme n'est pas reconnu :<br>\n<code>&lt;MECANISME&gt; -&gt; INCONNU</code></p>",
    "starter": "# Grille d'analyse (dk2-c1-e1) — Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tous les namespaces majeurs]\n# Données : MNT\n# Données : IPC\n# Données : UTS\n# Données : USER\nA_COMPLETER\n\n[Cas 2 — Tous les cgroups essentiels]\n# Données : CPU_LIMIT\n# Données : MEM_LIMIT\n# Données : IO_THROTTLE\nA_COMPLETER\n\n[Cas 3 — Mélange avec éléments inconnus]\n# Données : PID\n# Données : CPU_LIMIT\n# Données : RAM_SWAP\n# Données : UTS\nA_COMPLETER\n",
    "hints": [
      "Utiliser un dictionnaire associant chaque code à son type et sa description.",
      "Gérer la casse pour accepter les noms en majuscules."
    ],
    "examples": [
      {
        "stdin": "PID\nNET\nMEM_LIMIT\nINCONNU_TEST",
        "expected": "PID -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)\nNET -> PRIMITIVE: NAMESPACE | Interfaces reseau, tables de routage et ports isoles\nMEM_LIMIT -> PRIMITIVE: CGROUP | Plafond de memoire vive RAM et gestion de l'OOM-Killer\nINCONNU_TEST -> INCONNU",
        "note": "PID et NET sont des Namespaces Linux, MEM_LIMIT est un cgroup de gestion de mémoire."
      }
    ],
    "tests": [
      {
        "label": "Tous les namespaces majeurs",
        "stdin": "cas:1",
        "expected": "MNT -> PRIMITIVE: NAMESPACE | Points de montage de systeme de fichiers et arborescence racine\nIPC -> PRIMITIVE: NAMESPACE | Communications inter-processus (memoire partagee, files de messages)\nUTS -> PRIMITIVE: NAMESPACE | Nom d'hote (hostname) et nom de domaine NIS\nUSER -> PRIMITIVE: NAMESPACE | Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l'hote)"
      },
      {
        "label": "Tous les cgroups essentiels",
        "stdin": "cas:2",
        "expected": "CPU_LIMIT -> PRIMITIVE: CGROUP | Plafond de temps de calcul CPU (quotas CFS)\nMEM_LIMIT -> PRIMITIVE: CGROUP | Plafond de memoire vive RAM et gestion de l'OOM-Killer\nIO_THROTTLE -> PRIMITIVE: CGROUP | Debit maximal en lecture et ecriture sur les disques blocs"
      },
      {
        "label": "Mélange avec éléments inconnus",
        "stdin": "cas:3",
        "expected": "PID -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)\nCPU_LIMIT -> PRIMITIVE: CGROUP | Plafond de temps de calcul CPU (quotas CFS)\nRAM_SWAP -> INCONNU\nUTS -> PRIMITIVE: NAMESPACE | Nom d'hote (hostname) et nom de domaine NIS"
      }
    ],
    "solution": "[Exemple]\nPID -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)\nNET -> PRIMITIVE: NAMESPACE | Interfaces reseau, tables de routage et ports isoles\nMEM_LIMIT -> PRIMITIVE: CGROUP | Plafond de memoire vive RAM et gestion de l'OOM-Killer\nINCONNU_TEST -> INCONNU\n\n[Cas 1 — Tous les namespaces majeurs]\nMNT -> PRIMITIVE: NAMESPACE | Points de montage de systeme de fichiers et arborescence racine\nIPC -> PRIMITIVE: NAMESPACE | Communications inter-processus (memoire partagee, files de messages)\nUTS -> PRIMITIVE: NAMESPACE | Nom d'hote (hostname) et nom de domaine NIS\nUSER -> PRIMITIVE: NAMESPACE | Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l'hote)\n\n[Cas 2 — Tous les cgroups essentiels]\nCPU_LIMIT -> PRIMITIVE: CGROUP | Plafond de temps de calcul CPU (quotas CFS)\nMEM_LIMIT -> PRIMITIVE: CGROUP | Plafond de memoire vive RAM et gestion de l'OOM-Killer\nIO_THROTTLE -> PRIMITIVE: CGROUP | Debit maximal en lecture et ecriture sur les disques blocs\n\n[Cas 3 — Mélange avec éléments inconnus]\nPID -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)\nCPU_LIMIT -> PRIMITIVE: CGROUP | Plafond de temps de calcul CPU (quotas CFS)\nRAM_SWAP -> INCONNU\nUTS -> PRIMITIVE: NAMESPACE | Nom d'hote (hostname) et nom de domaine NIS"
  },
  {
    "id": "dk2-c1-e2",
    "chapter": 1,
    "title": "Comparateur d’empreinte mémoire et stockage : VM vs Conteneur",
    "level": "n2",
    "language": "analyse",
    "goal": "Quantifier l’overhead de virtualisation lourde (Hyperviseur + Guest OS complet) face à la conteneurisation légère.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\n- Deuxième ligne : <code>&lt;TailleGuestOsMo&gt; &lt;RamGuestOsMo&gt;</code> (ressources consommées par l'OS invité dans une machine virtuelle).<br>\nDans une architecture de conteneurs Docker, le kernel de l'hôte est partagé (0 Mo d'overhead Guest OS par conteneur).<br>\nCalculer :<br>\n1. <strong>VM</strong> :<br>\n   - Disque total VM = <code>NbInstances * (TailleAppMo + TailleGuestOsMo)</code><br>\n   - RAM totale VM = <code>NbInstances * (RamAppMo + RamGuestOsMo)</code><br>\n2. <strong>DOCKER</strong> :<br>\n   - Disque total Docker = <code>NbInstances * TailleAppMo</code><br>\n   - RAM totale Docker = <code>NbInstances * RamAppMo</code><br>\n3. <strong>GAINS</strong> :<br>\n   - Gain disque = <code>Disque VM - Disque Docker</code><br>\n   - Gain RAM = <code>RAM VM - RAM Docker</code><br>\nAfficher :<br>\n<code>ARCHITECTURE VM: Disque &lt;Dvm&gt; Mo | RAM &lt;Rvm&gt; Mo</code><br>\n<code>ARCHITECTURE DOCKER: Disque &lt;Ddoc&gt; Mo | RAM &lt;Rdoc&gt; Mo</code><br>\n<code>ECONOMIE DOCKER: Disque -&lt;GainD&gt; Mo | RAM -&lt;GainR&gt; Mo</code></p>",
    "starter": "# Grille d'analyse (dk2-c1-e2) — Comparateur d’empreinte mémoire et stockage : VM vs Conteneur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — 10 microservices légers]\n# Données : 10 20 64\n# Données : 3500 512\nA_COMPLETER\n\n[Cas 2 — Instance unique de test]\n# Données : 1 100 256\n# Données : 5000 2048\nA_COMPLETER\n\n[Cas 3 — Forte charge 50 instances]\n# Données : 50 30 100\n# Données : 2000 800\nA_COMPLETER\n",
    "hints": [
      "Chaque VM duplique un système d’exploitation complet (Guest OS), tandis que Docker partage le noyau hôte.",
      "Suivre rigoureusement le gabarit textuel d’affichage."
    ],
    "examples": [
      {
        "stdin": "5 50 128\n4000 1024",
        "expected": "ARCHITECTURE VM: Disque 20250 Mo | RAM 5760 Mo\nARCHITECTURE DOCKER: Disque 250 Mo | RAM 640 Mo\nECONOMIE DOCKER: Disque -20000 Mo | RAM -5120 Mo",
        "note": "5 instances : 20 Go et 5 Go de RAM économisés grâce à Docker."
      }
    ],
    "tests": [
      {
        "label": "10 microservices légers",
        "stdin": "cas:1",
        "expected": "ARCHITECTURE VM: Disque 35200 Mo | RAM 5760 Mo\nARCHITECTURE DOCKER: Disque 200 Mo | RAM 640 Mo\nECONOMIE DOCKER: Disque -35000 Mo | RAM -5120 Mo"
      },
      {
        "label": "Instance unique de test",
        "stdin": "cas:2",
        "expected": "ARCHITECTURE VM: Disque 5100 Mo | RAM 2304 Mo\nARCHITECTURE DOCKER: Disque 100 Mo | RAM 256 Mo\nECONOMIE DOCKER: Disque -5000 Mo | RAM -2048 Mo"
      },
      {
        "label": "Forte charge 50 instances",
        "stdin": "cas:3",
        "expected": "ARCHITECTURE VM: Disque 101500 Mo | RAM 45000 Mo\nARCHITECTURE DOCKER: Disque 1500 Mo | RAM 5000 Mo\nECONOMIE DOCKER: Disque -100000 Mo | RAM -40000 Mo"
      }
    ],
    "solution": "[Exemple]\nARCHITECTURE VM: Disque 20250 Mo | RAM 5760 Mo\nARCHITECTURE DOCKER: Disque 250 Mo | RAM 640 Mo\nECONOMIE DOCKER: Disque -20000 Mo | RAM -5120 Mo\n\n[Cas 1 — 10 microservices légers]\nARCHITECTURE VM: Disque 35200 Mo | RAM 5760 Mo\nARCHITECTURE DOCKER: Disque 200 Mo | RAM 640 Mo\nECONOMIE DOCKER: Disque -35000 Mo | RAM -5120 Mo\n\n[Cas 2 — Instance unique de test]\nARCHITECTURE VM: Disque 5100 Mo | RAM 2304 Mo\nARCHITECTURE DOCKER: Disque 100 Mo | RAM 256 Mo\nECONOMIE DOCKER: Disque -5000 Mo | RAM -2048 Mo\n\n[Cas 3 — Forte charge 50 instances]\nARCHITECTURE VM: Disque 101500 Mo | RAM 45000 Mo\nARCHITECTURE DOCKER: Disque 1500 Mo | RAM 5000 Mo\nECONOMIE DOCKER: Disque -100000 Mo | RAM -40000 Mo"
  },
  {
    "id": "dk2-c1-e3",
    "chapter": 1,
    "title": "Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)",
    "level": "n3",
    "language": "analyse",
    "goal": "Identifier le rôle de chaque brique logicielle composant la stack Docker moderne conforme OCI.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nSelon l'architecture interne de Docker :<br>\n- <code>CLI</code> : <code>docker (client) -&gt; Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)</code><br>\n- <code>DOCKERD</code> : <code>dockerd (daemon) -&gt; Gestionnaire haut niveau des images, volumes, reseaux et authentification</code><br>\n- <code>CONTAINERD</code> : <code>containerd -&gt; Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)</code><br>\n- <code>SHIM</code> : <code>containerd-shim -&gt; Processus leger maintenant les E/S et l'etat sans dependre du daemon</code><br>\n- <code>RUNC</code> : <code>runc (OCI runtime) -&gt; Cree les namespaces et cgroups, puis execute le binaire conteneurise</code><br>\nPour chaque opération, afficher :<br>\n<code>&lt;ID&gt; -&gt; &lt;COMPOSANT&gt; | &lt;ROLE&gt;</code><br>\nSi l'opération n'est pas listée :<br>\n<code>&lt;ID&gt; -&gt; INCONNU</code></p>",
    "starter": "# Grille d'analyse (dk2-c1-e3) — Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les 5 briques de la pile Docker]\n# Données : CLI\n# Données : DOCKERD\n# Données : CONTAINERD\n# Données : SHIM\n# Données : RUNC\nA_COMPLETER\n\n[Cas 2 — Composants inconnus ou fautifs]\n# Données : KUBERNETES\n# Données : SHIM\n# Données : VIRTUALBOX\nA_COMPLETER\n\n[Cas 3 — Superviseur containerd seul]\n# Données : CONTAINERD\nA_COMPLETER\n",
    "hints": [
      "dockerd délègue à containerd, qui invoque runc pour démarrer le processus puis laisse containerd-shim.",
      "Respecter strictement le format de sortie."
    ],
    "examples": [
      {
        "stdin": "CLI\nDOCKERD\nRUNC",
        "expected": "CLI -> docker (client) | Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)\nDOCKERD -> dockerd (daemon) | Gestionnaire haut niveau des images, volumes, reseaux et authentification\nRUNC -> runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise",
        "note": "De l’interface de commande au runtime bas niveau conforme OCI."
      }
    ],
    "tests": [
      {
        "label": "Toutes les 5 briques de la pile Docker",
        "stdin": "cas:1",
        "expected": "CLI -> docker (client) | Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)\nDOCKERD -> dockerd (daemon) | Gestionnaire haut niveau des images, volumes, reseaux et authentification\nCONTAINERD -> containerd | Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)\nSHIM -> containerd-shim | Processus leger maintenant les E/S et l'etat sans dependre du daemon\nRUNC -> runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise"
      },
      {
        "label": "Composants inconnus ou fautifs",
        "stdin": "cas:2",
        "expected": "KUBERNETES -> INCONNU\nSHIM -> containerd-shim | Processus leger maintenant les E/S et l'etat sans dependre du daemon\nVIRTUALBOX -> INCONNU"
      },
      {
        "label": "Superviseur containerd seul",
        "stdin": "cas:3",
        "expected": "CONTAINERD -> containerd | Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)"
      }
    ],
    "solution": "[Exemple]\nCLI -> docker (client) | Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)\nDOCKERD -> dockerd (daemon) | Gestionnaire haut niveau des images, volumes, reseaux et authentification\nRUNC -> runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise\n\n[Cas 1 — Toutes les 5 briques de la pile Docker]\nCLI -> docker (client) | Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)\nDOCKERD -> dockerd (daemon) | Gestionnaire haut niveau des images, volumes, reseaux et authentification\nCONTAINERD -> containerd | Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)\nSHIM -> containerd-shim | Processus leger maintenant les E/S et l'etat sans dependre du daemon\nRUNC -> runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise\n\n[Cas 2 — Composants inconnus ou fautifs]\nKUBERNETES -> INCONNU\nSHIM -> containerd-shim | Processus leger maintenant les E/S et l'etat sans dependre du daemon\nVIRTUALBOX -> INCONNU\n\n[Cas 3 — Superviseur containerd seul]\nCONTAINERD -> containerd | Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)"
  }
];
